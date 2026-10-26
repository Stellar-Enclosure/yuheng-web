import {cleanup, renderHook} from '@testing-library/react'
import {afterEach, describe, expect, it, vi} from 'vitest'
import type {PropsWithChildren} from 'react'
import type {BackendFieldCatalog} from '@stellar-enclosure/stellar-enclosure-web-shared/permissions'
import {authorizationFixture} from '../test/permissionFixtures'
import {inputFields} from './fieldReferences'
const state = vi.hoisted(() => ({authorization: undefined as ReturnType<typeof authorizationFixture> | undefined}))
vi.mock('../auth/AuthContext', () => ({useAuth: () => state}))
import {FieldCatalogContext, useWritableFields} from './FieldCatalog'
afterEach(() => {cleanup(); state.authorization = undefined})
const writableCatalog = (): BackendFieldCatalog => {
  const authorization = authorizationFixture('yuheng', ['yuheng:llm:write'])
  return {catalogScope: authorization.snapshot.catalogScope, catalogVersion: authorization.snapshot.catalogVersion,
    fields: Object.fromEntries(inputFields.LlmChannelCommandDTO.map(key => [key, {access: 'PROTECTED', inputBinding: true,
      fieldPolicy: {valueType: 'STRING', write: {mode: 'ALL', codes: ['yuheng:llm:write']}}}]))}
}
const wrapper = (catalog: BackendFieldCatalog | null) => ({children}: PropsWithChildren) => <FieldCatalogContext.Provider value={catalog}>{children}</FieldCatalogContext.Provider>
describe('complete-replacement field experience', () => {
  it('requires current actor permission and a real backend input binding for every submitted field', () => {
    state.authorization = authorizationFixture('yuheng', ['yuheng:llm:write'])
    const catalog = writableCatalog()
    expect(renderHook(() => useWritableFields('LlmChannelCommandDTO'), {wrapper: wrapper(catalog)}).result.current).toBe(true)
    const key = inputFields.LlmChannelCommandDTO[0]
    const readonly = {...catalog, fields: {...catalog.fields, [key]: {...catalog.fields[key], inputBinding: false}}}
    expect(renderHook(() => useWritableFields('LlmChannelCommandDTO'), {wrapper: wrapper(readonly)}).result.current).toBe(false)
  })
  it('keeps the form readonly on missing metadata, changed catalog or missing write permission', () => {
    state.authorization = authorizationFixture('yuheng', ['yuheng:llm:write'])
    expect(renderHook(() => useWritableFields('LlmChannelCommandDTO'), {wrapper: wrapper(null)}).result.current).toBe(false)
    const catalog = writableCatalog()
    expect(renderHook(() => useWritableFields('LlmChannelCommandDTO'), {wrapper: wrapper({...catalog, catalogVersion: '99'})}).result.current).toBe(false)
    state.authorization = authorizationFixture('yuheng', ['yuheng:llm:read'])
    expect(renderHook(() => useWritableFields('LlmChannelCommandDTO'), {wrapper: wrapper(catalog)}).result.current).toBe(false)
  })
})
