import {renderHook, cleanup} from '@testing-library/react'
import {afterEach, describe, expect, it, vi} from 'vitest'
import {authorizationFixture} from '../test/permissionFixtures'
const current = vi.hoisted(() => ({authorization: undefined as ReturnType<typeof authorizationFixture> | undefined}))
vi.mock('../auth/AuthContext', () => ({useAuth: () => current}))
import {useCapability} from './capabilities'
afterEach(() => {cleanup(); current.authorization = undefined})
describe('resource permission guards', () => {
  it('requires a current matching permission snapshot', () => {
    current.authorization = authorizationFixture('yuheng')
    expect(renderHook(() => useCapability('yuheng.app.console')).result.current).toBe(true)
    current.authorization = {...current.authorization, snapshot: {...current.authorization.snapshot, authVersion: '2'}}
    expect(renderHook(() => useCapability('yuheng.app.console')).result.current).toBe(false)
  })
  it('does not interpret a wildcard as a permission grant', () => {
    const valid = authorizationFixture('yuheng')
    current.authorization = {...valid, snapshot: {...valid.snapshot, permissionCodes: ['*']}}
    expect(renderHook(() => useCapability('yuheng.app.console')).result.current).toBe(false)
  })
  it('denies expired and absent views', () => {
    expect(renderHook(() => useCapability('yuheng.app.console')).result.current).toBe(false)
    const valid = authorizationFixture('yuheng')
    current.authorization = {...valid, snapshot: {...valid.snapshot, snapshotExpiresAt: '2020-01-01T00:00:00Z'}}
    expect(renderHook(() => useCapability('yuheng.app.console')).result.current).toBe(false)
  })
})
