import type {GatewayIdentityResult} from '@stellar-enclosure/stellar-enclosure-web-shared'
import {snapshotContext, type PermissionSnapshot} from '@stellar-enclosure/stellar-enclosure-web-shared/permissions'
import type {WorkspaceResource} from '../auth/workspaceResource'
export const identityFixture = (resource: WorkspaceResource = 'yuheng'): GatewayIdentityResult => ({
  issuer: 'https://identity.example/tenants/1', tenantId: '1', subject: 'user-a', appAlias: 'edge-' + resource,
  clientId: 'edge-' + resource, authorizationExpiresAt: 2_000_000_000, authenticationExpiresAt: 2_000_000_000,
  securityVersion: {realm: '1', client: '1', subject: '1'}, ssoLogoutUri: 'https://identity.example/tenants/1/logout',
})
export const snapshotFixture = (resource: WorkspaceResource = 'yuheng', permissionCodes: string[] = ['yuheng:read']): PermissionSnapshot => ({
  issuer: identityFixture(resource).issuer, subject: 'user-a', catalogScope: {catalogScopeId: '1', tenantId: '1',
    businessCode: 'xingyuan', applicationCode: resource, namespaceCode: 'default', environment: 'dev'},
  catalogVersion: '1', authVersion: '1', policyVersion: '1', activeRoleContext: {applicationCode: resource, rootRoleIds: ['1'], effectiveRoleIds: ['1']},
  permissionCodes, snapshotExpiresAt: new Date(Date.now() + 60_000).toISOString(),
})
export const authorizationFixture = (resource: WorkspaceResource = 'yuheng', permissionCodes?: string[]) => {
  const snapshot = snapshotFixture(resource, permissionCodes)
  return {identity: identityFixture(resource), snapshot, binding: snapshotContext(snapshot, 0), user: {id: 'user-a', tenantId: '1', identitySub: 'user-a'}}
}
