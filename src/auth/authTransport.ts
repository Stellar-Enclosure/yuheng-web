import {createGatewayAuthClient, createHttpClient} from '@stellar-enclosure/stellar-enclosure-web-shared'
import type {WorkspaceResource} from './workspaceResource'

const gatewayOrigin = import.meta.env.VITE_YUHENG_ORIGIN ?? ''
const fetchCurrent: typeof fetch = (...args) => globalThis.fetch(...args)
export const workspaceAuth = {
  yuheng: createGatewayAuthClient({baseUrl: gatewayOrigin, appAlias: import.meta.env.VITE_OAUTH_APP_ALIAS ?? 'edge-yuheng', fetch: fetchCurrent}),
  yaoguang: createGatewayAuthClient({baseUrl: gatewayOrigin, appAlias: import.meta.env.VITE_YAOGUANG_OAUTH_APP_ALIAS ?? 'edge-yaoguang', fetch: fetchCurrent}),
}
const invalidation = new Map<WorkspaceResource, Set<() => void>>()
export const subscribeAuthorizationFailure = (resource: WorkspaceResource, listener: () => void) => {
  const listeners = invalidation.get(resource) ?? new Set()
  invalidation.set(resource, listeners)
  listeners.add(listener)
  return () => { listeners.delete(listener) }
}
export const createWorkspaceTransport = (resource: WorkspaceResource, fetcher = fetchCurrent) => {
  const auth = workspaceAuth[resource]
  return createHttpClient({baseUrl: auth.applicationBaseUrl, credentials: 'include', context: auth.context,
    getCsrf: auth.csrf, fetch: fetcher, onAuthError: () => invalidation.get(resource)?.forEach(listener => listener())})
}
export const workspaceTransport = {yuheng: createWorkspaceTransport('yuheng'), yaoguang: createWorkspaceTransport('yaoguang')}
