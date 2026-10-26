import {createContext, type PropsWithChildren, useCallback, useContext, useEffect, useMemo, useRef, useState} from 'react'
import type {GatewayIdentityResult} from '@stellar-enclosure/stellar-enclosure-web-shared'
import {isPermissionSnapshot, snapshotContext, type PermissionSnapshot, type PermissionSnapshotContext} from '@stellar-enclosure/stellar-enclosure-web-shared/permissions'
import type {WorkspaceResource} from './workspaceResource'
import {subscribeAuthorizationFailure, workspaceAuth, workspaceTransport} from './authTransport'

export const gatewayAuth = workspaceAuth.yuheng
export const httpClient = workspaceTransport.yuheng
export interface WorkspaceAuthorization {
  readonly identity: GatewayIdentityResult
  readonly snapshot: PermissionSnapshot
  readonly binding: PermissionSnapshotContext
  readonly user: {readonly id: string; readonly tenantId: string; readonly identitySub: string}
}
type AuthState = {
  workspace: WorkspaceResource
  loading: boolean
  authorization?: WorkspaceAuthorization
  error?: string
  login: () => void
  logout: () => Promise<void>
  refreshAuthorization: () => Promise<void>
}
const AuthContext = createContext<AuthState | undefined>(undefined)

export const AuthProvider = ({children, resource = 'yuheng'}: PropsWithChildren<{resource?: WorkspaceResource}>) => {
  const authClient = workspaceAuth[resource]
  const [loading, setLoading] = useState(true)
  const [authorization, setAuthorization] = useState<WorkspaceAuthorization>()
  const [error, setError] = useState<string>()
  const generation = useRef(0)
  const pending = useRef<AbortController | null>(null)
  const clearAuthorization = useCallback(() => {
    generation.current += 1
    pending.current?.abort()
    setAuthorization(undefined)
    setLoading(false)
    return generation.current
  }, [])
  const refreshAuthorization = useCallback(async () => {
    const serial = clearAuthorization()
    const controller = new AbortController()
    pending.current = controller
    setLoading(true)
    setError(undefined)
    try {
      const identity = await authClient.identity(controller.signal)
      if (serial !== generation.current) return
      const capture = authClient.context.capture(controller.signal)
      const envelope = await workspaceTransport[resource].request<unknown>('/api/v1/authorization/effective-permissions', {signal: capture.signal})
      capture.assertCurrent()
      const snapshot = typeof envelope === 'object' && envelope !== null && 'success' in envelope
        ? (envelope as {success: unknown; data?: unknown}).success === true ? (envelope as {data?: unknown}).data : null : envelope
      if (!isPermissionSnapshot(snapshot) || snapshot.issuer !== identity.issuer || snapshot.subject !== identity.subject
        || snapshot.catalogScope.tenantId !== identity.tenantId || snapshot.catalogScope.businessCode !== 'xingyuan'
        || snapshot.catalogScope.applicationCode !== resource
        || snapshot.catalogScope.namespaceCode !== (import.meta.env.VITE_PERMISSION_NAMESPACE ?? '')
        || snapshot.catalogScope.environment !== (import.meta.env.VITE_PERMISSION_ENVIRONMENT ?? '')
        || Date.parse(snapshot.snapshotExpiresAt) <= Date.now()) throw new Error('当前权限快照与应用身份或部署范围不一致')
      if (serial !== generation.current) return
      setAuthorization({identity, snapshot, binding: snapshotContext(snapshot, capture.epoch),
        user: {id: identity.subject, tenantId: identity.tenantId, identitySub: identity.subject}})
    } catch (failure) {
      if (serial === generation.current) {
        setAuthorization(undefined)
        setError(failure instanceof Error ? failure.message : '权限视图不可用')
      }
      throw failure
    } finally { if (serial === generation.current) setLoading(false) }
  }, [authClient, resource, clearAuthorization])
  const login = useCallback(() => {
    clearAuthorization()
    setLoading(true)
    setError(undefined)
    try { authClient.login() }
    catch (failure) { setLoading(false); setError(failure instanceof Error ? failure.message : '登录失败') }
  }, [authClient, clearAuthorization])
  const logout = useCallback(async () => {
    const serial = clearAuthorization()
    try {
      const result = await authClient.logout()
      if (serial === generation.current) setError(result.remoteState === 'CONFIRMED' ? undefined : '本地已退出，远端令牌撤销待恢复')
    } catch (failure) {
      if (serial === generation.current) setError(failure instanceof Error ? failure.message : '统一身份退出失败')
    }
  }, [authClient, clearAuthorization])
  useEffect(() => {
    const unsubscribe = subscribeAuthorizationFailure(resource, clearAuthorization)
    let active = true
    queueMicrotask(() => { if (active) void refreshAuthorization().catch(() => undefined) })
    return () => { active = false; unsubscribe(); generation.current += 1; pending.current?.abort() }
  }, [resource, refreshAuthorization, clearAuthorization])
  useEffect(() => {
    if (!authorization) return
    const deadline = setTimeout(clearAuthorization, Math.max(1, Math.min(Date.parse(authorization.snapshot.snapshotExpiresAt) - Date.now(), 2_147_483_647)))
    const unsubscribe = authClient.context.subscribe(() => {
      if (authorization.binding.requestEpoch !== authClient.context.epoch) clearAuthorization()
    })
    return () => { clearTimeout(deadline); unsubscribe() }
  }, [authorization, authClient, clearAuthorization])
  const value = useMemo(() => ({workspace: resource, loading, authorization, error, login, logout, refreshAuthorization}),
    [resource, loading, authorization, error, login, logout, refreshAuthorization])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
export const useAuth = (): AuthState => {
  const value = useContext(AuthContext)
  if (!value) throw new Error('AuthProvider is required')
  return value
}
