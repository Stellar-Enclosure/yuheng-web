import {definePermissionReferences} from '@stellar-enclosure/stellar-enclosure-web-shared/permissions'

export const permissions = definePermissionReferences([
  "yuheng:applications:write",
  "yuheng:catalog:write",
  "yuheng:credentials:write",
  "yuheng:drafts:write",
  "yuheng:groups:write",
  "yuheng:llm:read",
  "yuheng:llm:write",
  "yuheng:mcp:approve",
  "yuheng:mcp:read",
  "yuheng:mcp:runtime:read",
  "yuheng:mcp:test",
  "yuheng:mcp:write",
  "yuheng:read",
  "yuheng:releases:write"
] as const)
