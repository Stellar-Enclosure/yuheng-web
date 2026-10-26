import {act, cleanup, fireEvent, render, screen, waitFor} from '@testing-library/react'
import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest'
import {AuthProvider, useAuth} from './AuthContext'
import {workspaceAuth, workspaceTransport} from './authTransport'
import {identityFixture, snapshotFixture} from '../test/permissionFixtures'

const Probe = () => {
  const auth = useAuth()
  return <><p>{auth.workspace}:{auth.authorization?.user.id ?? 'none'}</p>
    <button onClick={() => void auth.logout()}>logout</button>
    <button onClick={() => void auth.refreshAuthorization().catch(() => undefined)}>reload</button></>
}
beforeEach(() => {
  vi.stubEnv('VITE_PERMISSION_NAMESPACE', 'default')
  vi.stubEnv('VITE_PERMISSION_ENVIRONMENT', 'dev')
  for (const resource of ['yuheng', 'yaoguang'] as const) {
    vi.spyOn(workspaceAuth[resource], 'identity').mockResolvedValue(identityFixture(resource))
    vi.spyOn(workspaceTransport[resource], 'request').mockResolvedValue({success: true, data: snapshotFixture(resource)})
    vi.spyOn(workspaceAuth[resource], 'logout').mockResolvedValue({operationId: '11111111-1111-1111-1111-111111111111', status: 'LOCAL_CLOSED', remoteState: 'PENDING', ssoLogoutUri: identityFixture(resource).ssoLogoutUri})
  }
})
afterEach(() => { cleanup(); vi.restoreAllMocks(); vi.unstubAllEnvs() })

describe('current application permission context', () => {
  it('loads identity and the same application snapshot without old bootstrap permission arrays', async () => {
    render(<AuthProvider resource="yaoguang"><Probe /></AuthProvider>)
    await screen.findByText('yaoguang:user-a')
    expect(workspaceAuth.yaoguang.identity).toHaveBeenCalledOnce()
    expect(workspaceAuth.yuheng.identity).not.toHaveBeenCalled()
    expect(workspaceTransport.yaoguang.request).toHaveBeenCalledWith('/api/v1/authorization/effective-permissions', expect.objectContaining({signal: expect.any(AbortSignal)}))
  })
  it.each(['issuer', 'subject', 'tenant', 'application', 'environment'])('rejects a mismatched %s', async field => {
    const valid = snapshotFixture('yaoguang')
    const value = field === 'issuer' ? {...valid, issuer: 'https://other.example/tenants/1'}
      : field === 'subject' ? {...valid, subject: 'other'}
      : {...valid, catalogScope: {...valid.catalogScope, ...(field === 'tenant' ? {tenantId: '2'} : field === 'application' ? {applicationCode: 'yuheng'} : {environment: 'prod'})}}
    vi.mocked(workspaceTransport.yaoguang.request).mockResolvedValue({success: true, data: value})
    render(<AuthProvider resource="yaoguang"><Probe /></AuthProvider>)
    await waitFor(() => expect(workspaceTransport.yaoguang.request).toHaveBeenCalledOnce())
    expect(screen.getByText('yaoguang:none')).toBeTruthy()
  })
  it('ignores a stale snapshot after a workspace switch', async () => {
    let resolveOld: (value: unknown) => void = () => {}
    vi.mocked(workspaceTransport.yuheng.request).mockImplementation(() => new Promise(resolve => { resolveOld = resolve }))
    const view = render(<AuthProvider key="yuheng" resource="yuheng"><Probe /></AuthProvider>)
    await waitFor(() => expect(workspaceTransport.yuheng.request).toHaveBeenCalledOnce())
    view.rerender(<AuthProvider key="yaoguang" resource="yaoguang"><Probe /></AuthProvider>)
    await screen.findByText('yaoguang:user-a')
    await act(async () => resolveOld({success: true, data: snapshotFixture('yuheng')}))
    expect(screen.getByText('yaoguang:user-a')).toBeTruthy()
  })
  it('drops a late snapshot after logout and never restores old grants', async () => {
    let resolveOld: (value: unknown) => void = () => {}
    vi.mocked(workspaceTransport.yaoguang.request).mockImplementation(() => new Promise(resolve => { resolveOld = resolve }))
    render(<AuthProvider resource="yaoguang"><Probe /></AuthProvider>)
    await waitFor(() => expect(workspaceTransport.yaoguang.request).toHaveBeenCalledOnce())
    fireEvent.click(screen.getByText('logout'))
    await waitFor(() => expect(workspaceAuth.yaoguang.logout).toHaveBeenCalledOnce())
    await act(async () => resolveOld({success: true, data: snapshotFixture('yaoguang')}))
    expect(screen.getByText('yaoguang:none')).toBeTruthy()
  })
  it('clears an accepted view when the shared request epoch changes', async () => {
    render(<AuthProvider resource="yaoguang"><Probe /></AuthProvider>)
    await screen.findByText('yaoguang:user-a')
    act(() => workspaceAuth.yaoguang.context.invalidate())
    expect(screen.getByText('yaoguang:none')).toBeTruthy()
  })
})
