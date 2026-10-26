import {createContext, useContext, type PropsWithChildren} from 'react'
import {useQuery} from '@tanstack/react-query'
import {evaluateFieldAccess, loadFieldCatalog, type BackendFieldCatalog} from '@stellar-enclosure/stellar-enclosure-web-shared/permissions'
import {useAuth} from '../auth/AuthContext'
import {workspaceTransport} from '../auth/authTransport'
import {fieldReferences, inputFields} from './fieldReferences'

export const FieldCatalogContext = createContext<BackendFieldCatalog | null>(null)
export const FieldCatalogProvider = ({children}: PropsWithChildren) => {
  const {authorization, workspace} = useAuth()
  const query = useQuery({queryKey: ['yuheng-field-catalog', authorization?.binding], enabled: Boolean(authorization), retry: false, staleTime: 30_000,
    queryFn: ({signal}) => loadFieldCatalog(fieldReferences.map(reference => reference.key), async query => {
      const result = await workspaceTransport[workspace].request<{success: boolean; data: BackendFieldCatalog}>(`/api/v1/authorization/field-catalog?${query}`, {signal})
      if (result.success !== true || !result.data) throw new Error('字段目录不可用')
      return result.data
    })})
  return <FieldCatalogContext.Provider value={authorization && !query.error ? query.data ?? null : null}>{children}</FieldCatalogContext.Provider>
}

/** Complete replacement forms remain read-only unless every submitted DTO field is a writable input. */
export const useWritableFields = (...dtos: readonly (keyof typeof inputFields)[]): boolean => {
  const catalog = useContext(FieldCatalogContext)
  const {authorization} = useAuth()
  return dtos.length > 0 && dtos.every(dto => inputFields[dto].length > 0 && inputFields[dto].every(key =>
    evaluateFieldAccess(key, catalog, authorization?.snapshot ?? null, authorization?.binding ?? null).writable))
}
