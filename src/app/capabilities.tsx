import {type PropsWithChildren} from 'react'
import {usePermission} from '@stellar-enclosure/stellar-enclosure-web-shared/react-permissions'
import type {ResourceKey} from '@stellar-enclosure/stellar-enclosure-web-shared/permissions'
import {useAuth} from '../auth/AuthContext'
import {resources} from '../permissions/resources'

export type Capability = ResourceKey<typeof resources>
export const CapabilityProvider = ({children}: PropsWithChildren) => children

export const useCapability = (resourceKey: Capability): boolean => {
  const {authorization} = useAuth()
  const permission = usePermission(authorization?.snapshot ?? null, authorization?.binding ?? null)
  const resource = resources.find(value => value.key === resourceKey)
  return resource ? permission.allows('requirement' in resource ? resource.requirement : {access: resource.access}) : false
}
