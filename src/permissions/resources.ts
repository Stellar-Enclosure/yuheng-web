import {defineResources, defineMessages} from '@stellar-enclosure/stellar-enclosure-web-shared/permissions'

export const resources = defineResources([
  {
    "key": "yuheng.app.console",
    "type": "APP",
    "target": {
      "applicationCode": "yuheng"
    },
    "requirement": {
      "mode": "ALL",
      "codes": [
        "yuheng:read"
      ]
    },
    "i18n": {
      "pageCode": "yuheng.web.permissions",
      "labelKey": "yuheng.app.console"
    }
  },
  {
    "key": "yuheng.page.login",
    "type": "PAGE",
    "target": {
      "route": "/login"
    },
    "access": "PUBLIC",
    "i18n": {
      "pageCode": "yuheng.web.permissions",
      "labelKey": "yuheng.page.login"
    }
  },
  {
    "key": "yuheng.button.ApplicationsPage.canWrite",
    "type": "BUTTON",
    "target": {
      "component": "src/features/applications/ApplicationsPage.tsx",
      "action": "canWrite"
    },
    "requirement": {
      "mode": "ALL",
      "codes": [
        "yuheng:applications:write"
      ]
    },
    "i18n": {
      "pageCode": "yuheng.web.permissions",
      "labelKey": "yuheng.button.ApplicationsPage.canWrite"
    }
  },
  {
    "key": "yuheng.button.ApplicationsPage.canWriteCredential",
    "type": "BUTTON",
    "target": {
      "component": "src/features/applications/ApplicationsPage.tsx",
      "action": "canWriteCredential"
    },
    "requirement": {
      "mode": "ALL",
      "codes": [
        "yuheng:credentials:write"
      ]
    },
    "i18n": {
      "pageCode": "yuheng.web.permissions",
      "labelKey": "yuheng.button.ApplicationsPage.canWriteCredential"
    }
  },
  {
    "key": "yuheng.button.AuditPage.canRead",
    "type": "BUTTON",
    "target": {
      "component": "src/features/audit/AuditPage.tsx",
      "action": "canRead"
    },
    "requirement": {
      "mode": "ALL",
      "codes": [
        "yuheng:read"
      ]
    },
    "i18n": {
      "pageCode": "yuheng.web.permissions",
      "labelKey": "yuheng.button.AuditPage.canRead"
    }
  },
  {
    "key": "yuheng.button.DraftPage.canWrite",
    "type": "BUTTON",
    "target": {
      "component": "src/features/draft/DraftPage.tsx",
      "action": "canWrite"
    },
    "requirement": {
      "mode": "ALL",
      "codes": [
        "yuheng:drafts:write"
      ]
    },
    "i18n": {
      "pageCode": "yuheng.web.permissions",
      "labelKey": "yuheng.button.DraftPage.canWrite"
    }
  },
  {
    "key": "yuheng.button.GatewayGroupsPage.canWrite",
    "type": "BUTTON",
    "target": {
      "component": "src/features/gateway-groups/GatewayGroupsPage.tsx",
      "action": "canWrite"
    },
    "requirement": {
      "mode": "ALL",
      "codes": [
        "yuheng:groups:write"
      ]
    },
    "i18n": {
      "pageCode": "yuheng.web.permissions",
      "labelKey": "yuheng.button.GatewayGroupsPage.canWrite"
    }
  },
  {
    "key": "yuheng.button.CatalogPage.canWrite",
    "type": "BUTTON",
    "target": {
      "component": "src/features/interface-catalog/CatalogPage.tsx",
      "action": "canWrite"
    },
    "requirement": {
      "mode": "ALL",
      "codes": [
        "yuheng:catalog:write"
      ]
    },
    "i18n": {
      "pageCode": "yuheng.web.permissions",
      "labelKey": "yuheng.button.CatalogPage.canWrite"
    }
  },
  {
    "key": "yuheng.button.OperationPage.canWrite",
    "type": "BUTTON",
    "target": {
      "component": "src/features/interface-catalog/OperationPage.tsx",
      "action": "canWrite"
    },
    "requirement": {
      "mode": "ALL",
      "codes": [
        "yuheng:catalog:write"
      ]
    },
    "i18n": {
      "pageCode": "yuheng.web.permissions",
      "labelKey": "yuheng.button.OperationPage.canWrite"
    }
  },
  {
    "key": "yuheng.button.LlmConfigurationPage.canWrite",
    "type": "BUTTON",
    "target": {
      "component": "src/features/llm/LlmConfigurationPage.tsx",
      "action": "canWrite"
    },
    "requirement": {
      "mode": "ALL",
      "codes": [
        "yuheng:llm:write"
      ]
    },
    "i18n": {
      "pageCode": "yuheng.web.permissions",
      "labelKey": "yuheng.button.LlmConfigurationPage.canWrite"
    }
  },
  {
    "key": "yuheng.button.McpApprovalPanel.canApprove",
    "type": "BUTTON",
    "target": {
      "component": "src/features/mcp/McpApprovalPanel.tsx",
      "action": "canApprove"
    },
    "requirement": {
      "mode": "ALL",
      "codes": [
        "yuheng:mcp:approve"
      ]
    },
    "i18n": {
      "pageCode": "yuheng.web.permissions",
      "labelKey": "yuheng.button.McpApprovalPanel.canApprove"
    }
  },
  {
    "key": "yuheng.button.McpAppsPanel.canWrite",
    "type": "BUTTON",
    "target": {
      "component": "src/features/mcp/McpAppsPanel.tsx",
      "action": "canWrite"
    },
    "requirement": {
      "mode": "ALL",
      "codes": [
        "yuheng:mcp:write"
      ]
    },
    "i18n": {
      "pageCode": "yuheng.web.permissions",
      "labelKey": "yuheng.button.McpAppsPanel.canWrite"
    }
  },
  {
    "key": "yuheng.button.McpCapabilityPreview.canPublish",
    "type": "BUTTON",
    "target": {
      "component": "src/features/mcp/McpCapabilityPreview.tsx",
      "action": "canPublish"
    },
    "requirement": {
      "mode": "ALL",
      "codes": [
        "yuheng:releases:write"
      ]
    },
    "i18n": {
      "pageCode": "yuheng.web.permissions",
      "labelKey": "yuheng.button.McpCapabilityPreview.canPublish"
    }
  },
  {
    "key": "yuheng.button.McpCapabilityValidationButton.canTest",
    "type": "BUTTON",
    "target": {
      "component": "src/features/mcp/McpCapabilityValidationButton.tsx",
      "action": "canTest"
    },
    "requirement": {
      "mode": "ALL",
      "codes": [
        "yuheng:mcp:test"
      ]
    },
    "i18n": {
      "pageCode": "yuheng.web.permissions",
      "labelKey": "yuheng.button.McpCapabilityValidationButton.canTest"
    }
  },
  {
    "key": "yuheng.button.McpPromptsPanel.canWrite",
    "type": "BUTTON",
    "target": {
      "component": "src/features/mcp/McpPromptsPanel.tsx",
      "action": "canWrite"
    },
    "requirement": {
      "mode": "ALL",
      "codes": [
        "yuheng:mcp:write"
      ]
    },
    "i18n": {
      "pageCode": "yuheng.web.permissions",
      "labelKey": "yuheng.button.McpPromptsPanel.canWrite"
    }
  },
  {
    "key": "yuheng.button.McpProtocolInspector.canTest",
    "type": "BUTTON",
    "target": {
      "component": "src/features/mcp/McpProtocolInspector.tsx",
      "action": "canTest"
    },
    "requirement": {
      "mode": "ALL",
      "codes": [
        "yuheng:mcp:test"
      ]
    },
    "i18n": {
      "pageCode": "yuheng.web.permissions",
      "labelKey": "yuheng.button.McpProtocolInspector.canTest"
    }
  },
  {
    "key": "yuheng.button.McpRemoteMountsPanel.canWrite",
    "type": "BUTTON",
    "target": {
      "component": "src/features/mcp/McpRemoteMountsPanel.tsx",
      "action": "canWrite"
    },
    "requirement": {
      "mode": "ALL",
      "codes": [
        "yuheng:mcp:write"
      ]
    },
    "i18n": {
      "pageCode": "yuheng.web.permissions",
      "labelKey": "yuheng.button.McpRemoteMountsPanel.canWrite"
    }
  },
  {
    "key": "yuheng.button.McpRemoteMountsPanel.canTest",
    "type": "BUTTON",
    "target": {
      "component": "src/features/mcp/McpRemoteMountsPanel.tsx",
      "action": "canTest"
    },
    "requirement": {
      "mode": "ALL",
      "codes": [
        "yuheng:mcp:test"
      ]
    },
    "i18n": {
      "pageCode": "yuheng.web.permissions",
      "labelKey": "yuheng.button.McpRemoteMountsPanel.canTest"
    }
  },
  {
    "key": "yuheng.button.McpRemoteProvidersPage.canWrite",
    "type": "BUTTON",
    "target": {
      "component": "src/features/mcp/McpRemoteProvidersPage.tsx",
      "action": "canWrite"
    },
    "requirement": {
      "mode": "ALL",
      "codes": [
        "yuheng:mcp:write"
      ]
    },
    "i18n": {
      "pageCode": "yuheng.web.permissions",
      "labelKey": "yuheng.button.McpRemoteProvidersPage.canWrite"
    }
  },
  {
    "key": "yuheng.button.McpRemoteProvidersPage.canTest",
    "type": "BUTTON",
    "target": {
      "component": "src/features/mcp/McpRemoteProvidersPage.tsx",
      "action": "canTest"
    },
    "requirement": {
      "mode": "ALL",
      "codes": [
        "yuheng:mcp:test"
      ]
    },
    "i18n": {
      "pageCode": "yuheng.web.permissions",
      "labelKey": "yuheng.button.McpRemoteProvidersPage.canTest"
    }
  },
  {
    "key": "yuheng.button.McpRemoteToolsPanel.canWrite",
    "type": "BUTTON",
    "target": {
      "component": "src/features/mcp/McpRemoteToolsPanel.tsx",
      "action": "canWrite"
    },
    "requirement": {
      "mode": "ALL",
      "codes": [
        "yuheng:mcp:write"
      ]
    },
    "i18n": {
      "pageCode": "yuheng.web.permissions",
      "labelKey": "yuheng.button.McpRemoteToolsPanel.canWrite"
    }
  },
  {
    "key": "yuheng.button.McpResourcesPanel.canWrite",
    "type": "BUTTON",
    "target": {
      "component": "src/features/mcp/McpResourcesPanel.tsx",
      "action": "canWrite"
    },
    "requirement": {
      "mode": "ALL",
      "codes": [
        "yuheng:mcp:write"
      ]
    },
    "i18n": {
      "pageCode": "yuheng.web.permissions",
      "labelKey": "yuheng.button.McpResourcesPanel.canWrite"
    }
  },
  {
    "key": "yuheng.button.McpServersPage.canWrite",
    "type": "BUTTON",
    "target": {
      "component": "src/features/mcp/McpServersPage.tsx",
      "action": "canWrite"
    },
    "requirement": {
      "mode": "ALL",
      "codes": [
        "yuheng:mcp:write"
      ]
    },
    "i18n": {
      "pageCode": "yuheng.web.permissions",
      "labelKey": "yuheng.button.McpServersPage.canWrite"
    }
  },
  {
    "key": "yuheng.button.McpTasksPanel.canWrite",
    "type": "BUTTON",
    "target": {
      "component": "src/features/mcp/McpTasksPanel.tsx",
      "action": "canWrite"
    },
    "requirement": {
      "mode": "ALL",
      "codes": [
        "yuheng:mcp:write"
      ]
    },
    "i18n": {
      "pageCode": "yuheng.web.permissions",
      "labelKey": "yuheng.button.McpTasksPanel.canWrite"
    }
  },
  {
    "key": "yuheng.button.McpTasksPanel.canReadRuntime",
    "type": "BUTTON",
    "target": {
      "component": "src/features/mcp/McpTasksPanel.tsx",
      "action": "canReadRuntime"
    },
    "requirement": {
      "mode": "ALL",
      "codes": [
        "yuheng:mcp:runtime:read"
      ]
    },
    "i18n": {
      "pageCode": "yuheng.web.permissions",
      "labelKey": "yuheng.button.McpTasksPanel.canReadRuntime"
    }
  },
  {
    "key": "yuheng.button.McpToolsPanel.canWrite",
    "type": "BUTTON",
    "target": {
      "component": "src/features/mcp/McpToolsPanel.tsx",
      "action": "canWrite"
    },
    "requirement": {
      "mode": "ALL",
      "codes": [
        "yuheng:mcp:write"
      ]
    },
    "i18n": {
      "pageCode": "yuheng.web.permissions",
      "labelKey": "yuheng.button.McpToolsPanel.canWrite"
    }
  },
  {
    "key": "yuheng.button.ReleaseDetailPage.canPublish",
    "type": "BUTTON",
    "target": {
      "component": "src/features/releases/ReleaseDetailPage.tsx",
      "action": "canPublish"
    },
    "requirement": {
      "mode": "ALL",
      "codes": [
        "yuheng:releases:write"
      ]
    },
    "i18n": {
      "pageCode": "yuheng.web.permissions",
      "labelKey": "yuheng.button.ReleaseDetailPage.canPublish"
    }
  },
  {
    "key": "yuheng.button.ReleaseDetailPage.canRollback",
    "type": "BUTTON",
    "target": {
      "component": "src/features/releases/ReleaseDetailPage.tsx",
      "action": "canRollback"
    },
    "requirement": {
      "mode": "ALL",
      "codes": [
        "yuheng:releases:write"
      ]
    },
    "i18n": {
      "pageCode": "yuheng.web.permissions",
      "labelKey": "yuheng.button.ReleaseDetailPage.canRollback"
    }
  },
  {
    "key": "yuheng.button.ReleasesPage.canPublish",
    "type": "BUTTON",
    "target": {
      "component": "src/features/releases/ReleasesPage.tsx",
      "action": "canPublish"
    },
    "requirement": {
      "mode": "ALL",
      "codes": [
        "yuheng:releases:write"
      ]
    },
    "i18n": {
      "pageCode": "yuheng.web.permissions",
      "labelKey": "yuheng.button.ReleasesPage.canPublish"
    }
  },
  {
    "key": "yuheng.menu.dashboard",
    "type": "MENU",
    "target": {
      "route": "/dashboard"
    },
    "requirement": {
      "mode": "ALL",
      "codes": [
        "yuheng:read"
      ]
    },
    "i18n": {
      "pageCode": "yuheng.web.permissions",
      "labelKey": "yuheng.menu.dashboard"
    }
  },
  {
    "key": "yuheng.menu.yuheng.groups",
    "type": "MENU",
    "target": {
      "route": "/yuheng-groups"
    },
    "requirement": {
      "mode": "ALL",
      "codes": [
        "yuheng:read"
      ]
    },
    "i18n": {
      "pageCode": "yuheng.web.permissions",
      "labelKey": "yuheng.menu.yuheng.groups"
    }
  },
  {
    "key": "yuheng.menu.applications",
    "type": "MENU",
    "target": {
      "route": "/applications"
    },
    "requirement": {
      "mode": "ALL",
      "codes": [
        "yuheng:read"
      ]
    },
    "i18n": {
      "pageCode": "yuheng.web.permissions",
      "labelKey": "yuheng.menu.applications"
    }
  },
  {
    "key": "yuheng.menu.openapi.sync",
    "type": "MENU",
    "target": {
      "route": "/openapi-sync"
    },
    "requirement": {
      "mode": "ALL",
      "codes": [
        "yuheng:read"
      ]
    },
    "i18n": {
      "pageCode": "yuheng.web.permissions",
      "labelKey": "yuheng.menu.openapi.sync"
    }
  },
  {
    "key": "yuheng.menu.interface.catalog",
    "type": "MENU",
    "target": {
      "route": "/interface-catalog"
    },
    "requirement": {
      "mode": "ALL",
      "codes": [
        "yuheng:read"
      ]
    },
    "i18n": {
      "pageCode": "yuheng.web.permissions",
      "labelKey": "yuheng.menu.interface.catalog"
    }
  },
  {
    "key": "yuheng.menu.providers",
    "type": "MENU",
    "target": {
      "route": "/providers"
    },
    "requirement": {
      "mode": "ALL",
      "codes": [
        "yuheng:read"
      ]
    },
    "i18n": {
      "pageCode": "yuheng.web.permissions",
      "labelKey": "yuheng.menu.providers"
    }
  },
  {
    "key": "yuheng.menu.mcp.servers",
    "type": "MENU",
    "target": {
      "route": "/mcp/servers"
    },
    "requirement": {
      "mode": "ALL",
      "codes": [
        "yuheng:mcp:read"
      ]
    },
    "i18n": {
      "pageCode": "yuheng.web.permissions",
      "labelKey": "yuheng.menu.mcp.servers"
    }
  },
  {
    "key": "yuheng.menu.mcp.remote.providers",
    "type": "MENU",
    "target": {
      "route": "/mcp/remote-providers"
    },
    "requirement": {
      "mode": "ALL",
      "codes": [
        "yuheng:mcp:read"
      ]
    },
    "i18n": {
      "pageCode": "yuheng.web.permissions",
      "labelKey": "yuheng.menu.mcp.remote.providers"
    }
  },
  {
    "key": "yuheng.menu.llm.configuration",
    "type": "MENU",
    "target": {
      "route": "/llm/configuration"
    },
    "requirement": {
      "mode": "ALL",
      "codes": [
        "yuheng:llm:read"
      ]
    },
    "i18n": {
      "pageCode": "yuheng.web.permissions",
      "labelKey": "yuheng.menu.llm.configuration"
    }
  },
  {
    "key": "yuheng.menu.observability.traces",
    "type": "MENU",
    "target": {
      "route": "/observability/traces"
    },
    "requirement": {
      "mode": "ALL",
      "codes": [
        "yuheng:read"
      ]
    },
    "i18n": {
      "pageCode": "yuheng.web.permissions",
      "labelKey": "yuheng.menu.observability.traces"
    }
  },
  {
    "key": "yuheng.menu.audit",
    "type": "MENU",
    "target": {
      "route": "/audit"
    },
    "requirement": {
      "mode": "ALL",
      "codes": [
        "yuheng:read"
      ]
    },
    "i18n": {
      "pageCode": "yuheng.web.permissions",
      "labelKey": "yuheng.menu.audit"
    }
  },
  {
    "key": "yuheng.page.dashboard",
    "type": "PAGE",
    "target": {
      "route": "/dashboard"
    },
    "requirement": {
      "mode": "ALL",
      "codes": [
        "yuheng:read"
      ]
    },
    "i18n": {
      "pageCode": "yuheng.web.permissions",
      "labelKey": "yuheng.page.dashboard"
    }
  },
  {
    "key": "yuheng.page.yuheng.groups",
    "type": "PAGE",
    "target": {
      "route": "/yuheng-groups"
    },
    "requirement": {
      "mode": "ALL",
      "codes": [
        "yuheng:read"
      ]
    },
    "i18n": {
      "pageCode": "yuheng.web.permissions",
      "labelKey": "yuheng.page.yuheng.groups"
    }
  },
  {
    "key": "yuheng.page.applications",
    "type": "PAGE",
    "target": {
      "route": "/applications"
    },
    "requirement": {
      "mode": "ALL",
      "codes": [
        "yuheng:read"
      ]
    },
    "i18n": {
      "pageCode": "yuheng.web.permissions",
      "labelKey": "yuheng.page.applications"
    }
  },
  {
    "key": "yuheng.page.openapi.sync",
    "type": "PAGE",
    "target": {
      "route": "/openapi-sync"
    },
    "requirement": {
      "mode": "ALL",
      "codes": [
        "yuheng:read"
      ]
    },
    "i18n": {
      "pageCode": "yuheng.web.permissions",
      "labelKey": "yuheng.page.openapi.sync"
    }
  },
  {
    "key": "yuheng.page.yuheng.groups.groupId.overview",
    "type": "PAGE",
    "target": {
      "route": "/yuheng-groups/:groupId/overview"
    },
    "requirement": {
      "mode": "ALL",
      "codes": [
        "yuheng:read"
      ]
    },
    "i18n": {
      "pageCode": "yuheng.web.permissions",
      "labelKey": "yuheng.page.yuheng.groups.groupId.overview"
    }
  },
  {
    "key": "yuheng.page.yuheng.groups.groupId.draft.routes",
    "type": "PAGE",
    "target": {
      "route": "/yuheng-groups/:groupId/draft/routes"
    },
    "requirement": {
      "mode": "ALL",
      "codes": [
        "yuheng:read"
      ]
    },
    "i18n": {
      "pageCode": "yuheng.web.permissions",
      "labelKey": "yuheng.page.yuheng.groups.groupId.draft.routes"
    }
  },
  {
    "key": "yuheng.page.yuheng.groups.groupId.draft.policies",
    "type": "PAGE",
    "target": {
      "route": "/yuheng-groups/:groupId/draft/policies"
    },
    "requirement": {
      "mode": "ALL",
      "codes": [
        "yuheng:read"
      ]
    },
    "i18n": {
      "pageCode": "yuheng.web.permissions",
      "labelKey": "yuheng.page.yuheng.groups.groupId.draft.policies"
    }
  },
  {
    "key": "yuheng.page.yuheng.groups.groupId.releases",
    "type": "PAGE",
    "target": {
      "route": "/yuheng-groups/:groupId/releases"
    },
    "requirement": {
      "mode": "ALL",
      "codes": [
        "yuheng:read"
      ]
    },
    "i18n": {
      "pageCode": "yuheng.web.permissions",
      "labelKey": "yuheng.page.yuheng.groups.groupId.releases"
    }
  },
  {
    "key": "yuheng.page.yuheng.groups.groupId.releases.releaseId",
    "type": "PAGE",
    "target": {
      "route": "/yuheng-groups/:groupId/releases/:releaseId"
    },
    "requirement": {
      "mode": "ALL",
      "codes": [
        "yuheng:read"
      ]
    },
    "i18n": {
      "pageCode": "yuheng.web.permissions",
      "labelKey": "yuheng.page.yuheng.groups.groupId.releases.releaseId"
    }
  },
  {
    "key": "yuheng.page.interface.catalog",
    "type": "PAGE",
    "target": {
      "route": "/interface-catalog"
    },
    "requirement": {
      "mode": "ALL",
      "codes": [
        "yuheng:read"
      ]
    },
    "i18n": {
      "pageCode": "yuheng.web.permissions",
      "labelKey": "yuheng.page.interface.catalog"
    }
  },
  {
    "key": "yuheng.page.applications.applicationId.catalog",
    "type": "PAGE",
    "target": {
      "route": "/applications/:applicationId/catalog"
    },
    "requirement": {
      "mode": "ALL",
      "codes": [
        "yuheng:read"
      ]
    },
    "i18n": {
      "pageCode": "yuheng.web.permissions",
      "labelKey": "yuheng.page.applications.applicationId.catalog"
    }
  },
  {
    "key": "yuheng.page.operations.operationId",
    "type": "PAGE",
    "target": {
      "route": "/operations/:operationId"
    },
    "requirement": {
      "mode": "ALL",
      "codes": [
        "yuheng:read"
      ]
    },
    "i18n": {
      "pageCode": "yuheng.web.permissions",
      "labelKey": "yuheng.page.operations.operationId"
    }
  },
  {
    "key": "yuheng.page.providers",
    "type": "PAGE",
    "target": {
      "route": "/providers"
    },
    "requirement": {
      "mode": "ALL",
      "codes": [
        "yuheng:read"
      ]
    },
    "i18n": {
      "pageCode": "yuheng.web.permissions",
      "labelKey": "yuheng.page.providers"
    }
  },
  {
    "key": "yuheng.page.mcp.servers",
    "type": "PAGE",
    "target": {
      "route": "/mcp/servers"
    },
    "requirement": {
      "mode": "ALL",
      "codes": [
        "yuheng:mcp:read"
      ]
    },
    "i18n": {
      "pageCode": "yuheng.web.permissions",
      "labelKey": "yuheng.page.mcp.servers"
    }
  },
  {
    "key": "yuheng.page.mcp.servers.serverId",
    "type": "PAGE",
    "target": {
      "route": "/mcp/servers/:serverId"
    },
    "requirement": {
      "mode": "ALL",
      "codes": [
        "yuheng:mcp:read"
      ]
    },
    "i18n": {
      "pageCode": "yuheng.web.permissions",
      "labelKey": "yuheng.page.mcp.servers.serverId"
    }
  },
  {
    "key": "yuheng.page.mcp.remote.providers",
    "type": "PAGE",
    "target": {
      "route": "/mcp/remote-providers"
    },
    "requirement": {
      "mode": "ALL",
      "codes": [
        "yuheng:mcp:read"
      ]
    },
    "i18n": {
      "pageCode": "yuheng.web.permissions",
      "labelKey": "yuheng.page.mcp.remote.providers"
    }
  },
  {
    "key": "yuheng.page.observability.traces",
    "type": "PAGE",
    "target": {
      "route": "/observability/traces"
    },
    "requirement": {
      "mode": "ALL",
      "codes": [
        "yuheng:read"
      ]
    },
    "i18n": {
      "pageCode": "yuheng.web.permissions",
      "labelKey": "yuheng.page.observability.traces"
    }
  },
  {
    "key": "yuheng.page.audit",
    "type": "PAGE",
    "target": {
      "route": "/audit"
    },
    "requirement": {
      "mode": "ALL",
      "codes": [
        "yuheng:read"
      ]
    },
    "i18n": {
      "pageCode": "yuheng.web.permissions",
      "labelKey": "yuheng.page.audit"
    }
  },
  {
    "key": "yuheng.page.llm.configuration",
    "type": "PAGE",
    "target": {
      "route": "/llm/configuration"
    },
    "requirement": {
      "mode": "ALL",
      "codes": [
        "yuheng:llm:read"
      ]
    },
    "i18n": {
      "pageCode": "yuheng.web.permissions",
      "labelKey": "yuheng.page.llm.configuration"
    }
  },
  {
    "key": "yuheng.menu.group1",
    "type": "MENU",
    "target": {
      "component": "AdminLayout",
      "group": "1"
    },
    "requirement": {
      "mode": "ALL",
      "codes": [
        "yuheng:read"
      ]
    },
    "i18n": {
      "pageCode": "yuheng.web.permissions",
      "labelKey": "yuheng.menu.group1"
    }
  },
  {
    "key": "yuheng.menu.group2",
    "type": "MENU",
    "target": {
      "component": "AdminLayout",
      "group": "2"
    },
    "requirement": {
      "mode": "ALL",
      "codes": [
        "yuheng:mcp:read"
      ]
    },
    "i18n": {
      "pageCode": "yuheng.web.permissions",
      "labelKey": "yuheng.menu.group2"
    }
  },
  {
    "key": "yuheng.menu.group3",
    "type": "MENU",
    "target": {
      "component": "AdminLayout",
      "group": "3"
    },
    "requirement": {
      "mode": "ALL",
      "codes": [
        "yuheng:llm:read"
      ]
    },
    "i18n": {
      "pageCode": "yuheng.web.permissions",
      "labelKey": "yuheng.menu.group3"
    }
  },
  {
    "key": "yuheng.menu.group4",
    "type": "MENU",
    "target": {
      "component": "AdminLayout",
      "group": "4"
    },
    "requirement": {
      "mode": "ALL",
      "codes": [
        "yuheng:read"
      ]
    },
    "i18n": {
      "pageCode": "yuheng.web.permissions",
      "labelKey": "yuheng.menu.group4"
    }
  }
] as const)

export const messages = defineMessages([
  {
    "pageCode": "yuheng.web.permissions",
    "key": "yuheng.app.console",
    "defaultLocale": "en-US",
    "defaults": {
      "en-US": "Administration console"
    }
  },
  {
    "pageCode": "yuheng.web.permissions",
    "key": "yuheng.page.login",
    "defaultLocale": "en-US",
    "defaults": {
      "en-US": "Sign in"
    }
  },
  {
    "pageCode": "yuheng.web.permissions",
    "key": "yuheng.button.ApplicationsPage.canWrite",
    "defaultLocale": "en-US",
    "defaults": {
      "en-US": "canWrite"
    }
  },
  {
    "pageCode": "yuheng.web.permissions",
    "key": "yuheng.button.ApplicationsPage.canWriteCredential",
    "defaultLocale": "en-US",
    "defaults": {
      "en-US": "canWriteCredential"
    }
  },
  {
    "pageCode": "yuheng.web.permissions",
    "key": "yuheng.button.AuditPage.canRead",
    "defaultLocale": "en-US",
    "defaults": {
      "en-US": "canRead"
    }
  },
  {
    "pageCode": "yuheng.web.permissions",
    "key": "yuheng.button.DraftPage.canWrite",
    "defaultLocale": "en-US",
    "defaults": {
      "en-US": "canWrite"
    }
  },
  {
    "pageCode": "yuheng.web.permissions",
    "key": "yuheng.button.GatewayGroupsPage.canWrite",
    "defaultLocale": "en-US",
    "defaults": {
      "en-US": "canWrite"
    }
  },
  {
    "pageCode": "yuheng.web.permissions",
    "key": "yuheng.button.CatalogPage.canWrite",
    "defaultLocale": "en-US",
    "defaults": {
      "en-US": "canWrite"
    }
  },
  {
    "pageCode": "yuheng.web.permissions",
    "key": "yuheng.button.OperationPage.canWrite",
    "defaultLocale": "en-US",
    "defaults": {
      "en-US": "canWrite"
    }
  },
  {
    "pageCode": "yuheng.web.permissions",
    "key": "yuheng.button.LlmConfigurationPage.canWrite",
    "defaultLocale": "en-US",
    "defaults": {
      "en-US": "canWrite"
    }
  },
  {
    "pageCode": "yuheng.web.permissions",
    "key": "yuheng.button.McpApprovalPanel.canApprove",
    "defaultLocale": "en-US",
    "defaults": {
      "en-US": "canApprove"
    }
  },
  {
    "pageCode": "yuheng.web.permissions",
    "key": "yuheng.button.McpAppsPanel.canWrite",
    "defaultLocale": "en-US",
    "defaults": {
      "en-US": "canWrite"
    }
  },
  {
    "pageCode": "yuheng.web.permissions",
    "key": "yuheng.button.McpCapabilityPreview.canPublish",
    "defaultLocale": "en-US",
    "defaults": {
      "en-US": "canPublish"
    }
  },
  {
    "pageCode": "yuheng.web.permissions",
    "key": "yuheng.button.McpCapabilityValidationButton.canTest",
    "defaultLocale": "en-US",
    "defaults": {
      "en-US": "canTest"
    }
  },
  {
    "pageCode": "yuheng.web.permissions",
    "key": "yuheng.button.McpPromptsPanel.canWrite",
    "defaultLocale": "en-US",
    "defaults": {
      "en-US": "canWrite"
    }
  },
  {
    "pageCode": "yuheng.web.permissions",
    "key": "yuheng.button.McpProtocolInspector.canTest",
    "defaultLocale": "en-US",
    "defaults": {
      "en-US": "canTest"
    }
  },
  {
    "pageCode": "yuheng.web.permissions",
    "key": "yuheng.button.McpRemoteMountsPanel.canWrite",
    "defaultLocale": "en-US",
    "defaults": {
      "en-US": "canWrite"
    }
  },
  {
    "pageCode": "yuheng.web.permissions",
    "key": "yuheng.button.McpRemoteMountsPanel.canTest",
    "defaultLocale": "en-US",
    "defaults": {
      "en-US": "canTest"
    }
  },
  {
    "pageCode": "yuheng.web.permissions",
    "key": "yuheng.button.McpRemoteProvidersPage.canWrite",
    "defaultLocale": "en-US",
    "defaults": {
      "en-US": "canWrite"
    }
  },
  {
    "pageCode": "yuheng.web.permissions",
    "key": "yuheng.button.McpRemoteProvidersPage.canTest",
    "defaultLocale": "en-US",
    "defaults": {
      "en-US": "canTest"
    }
  },
  {
    "pageCode": "yuheng.web.permissions",
    "key": "yuheng.button.McpRemoteToolsPanel.canWrite",
    "defaultLocale": "en-US",
    "defaults": {
      "en-US": "canWrite"
    }
  },
  {
    "pageCode": "yuheng.web.permissions",
    "key": "yuheng.button.McpResourcesPanel.canWrite",
    "defaultLocale": "en-US",
    "defaults": {
      "en-US": "canWrite"
    }
  },
  {
    "pageCode": "yuheng.web.permissions",
    "key": "yuheng.button.McpServersPage.canWrite",
    "defaultLocale": "en-US",
    "defaults": {
      "en-US": "canWrite"
    }
  },
  {
    "pageCode": "yuheng.web.permissions",
    "key": "yuheng.button.McpTasksPanel.canWrite",
    "defaultLocale": "en-US",
    "defaults": {
      "en-US": "canWrite"
    }
  },
  {
    "pageCode": "yuheng.web.permissions",
    "key": "yuheng.button.McpTasksPanel.canReadRuntime",
    "defaultLocale": "en-US",
    "defaults": {
      "en-US": "canReadRuntime"
    }
  },
  {
    "pageCode": "yuheng.web.permissions",
    "key": "yuheng.button.McpToolsPanel.canWrite",
    "defaultLocale": "en-US",
    "defaults": {
      "en-US": "canWrite"
    }
  },
  {
    "pageCode": "yuheng.web.permissions",
    "key": "yuheng.button.ReleaseDetailPage.canPublish",
    "defaultLocale": "en-US",
    "defaults": {
      "en-US": "canPublish"
    }
  },
  {
    "pageCode": "yuheng.web.permissions",
    "key": "yuheng.button.ReleaseDetailPage.canRollback",
    "defaultLocale": "en-US",
    "defaults": {
      "en-US": "canRollback"
    }
  },
  {
    "pageCode": "yuheng.web.permissions",
    "key": "yuheng.button.ReleasesPage.canPublish",
    "defaultLocale": "en-US",
    "defaults": {
      "en-US": "canPublish"
    }
  },
  {
    "pageCode": "yuheng.web.permissions",
    "key": "yuheng.menu.dashboard",
    "defaultLocale": "en-US",
    "defaults": {
      "en-US": "dashboard"
    }
  },
  {
    "pageCode": "yuheng.web.permissions",
    "key": "yuheng.menu.yuheng.groups",
    "defaultLocale": "en-US",
    "defaults": {
      "en-US": "groups"
    }
  },
  {
    "pageCode": "yuheng.web.permissions",
    "key": "yuheng.menu.applications",
    "defaultLocale": "en-US",
    "defaults": {
      "en-US": "applications"
    }
  },
  {
    "pageCode": "yuheng.web.permissions",
    "key": "yuheng.menu.openapi.sync",
    "defaultLocale": "en-US",
    "defaults": {
      "en-US": "sync"
    }
  },
  {
    "pageCode": "yuheng.web.permissions",
    "key": "yuheng.menu.interface.catalog",
    "defaultLocale": "en-US",
    "defaults": {
      "en-US": "catalog"
    }
  },
  {
    "pageCode": "yuheng.web.permissions",
    "key": "yuheng.menu.providers",
    "defaultLocale": "en-US",
    "defaults": {
      "en-US": "providers"
    }
  },
  {
    "pageCode": "yuheng.web.permissions",
    "key": "yuheng.menu.mcp.servers",
    "defaultLocale": "en-US",
    "defaults": {
      "en-US": "servers"
    }
  },
  {
    "pageCode": "yuheng.web.permissions",
    "key": "yuheng.menu.mcp.remote.providers",
    "defaultLocale": "en-US",
    "defaults": {
      "en-US": "providers"
    }
  },
  {
    "pageCode": "yuheng.web.permissions",
    "key": "yuheng.menu.llm.configuration",
    "defaultLocale": "en-US",
    "defaults": {
      "en-US": "configuration"
    }
  },
  {
    "pageCode": "yuheng.web.permissions",
    "key": "yuheng.menu.observability.traces",
    "defaultLocale": "en-US",
    "defaults": {
      "en-US": "traces"
    }
  },
  {
    "pageCode": "yuheng.web.permissions",
    "key": "yuheng.menu.audit",
    "defaultLocale": "en-US",
    "defaults": {
      "en-US": "audit"
    }
  },
  {
    "pageCode": "yuheng.web.permissions",
    "key": "yuheng.page.dashboard",
    "defaultLocale": "en-US",
    "defaults": {
      "en-US": "DashboardPage"
    }
  },
  {
    "pageCode": "yuheng.web.permissions",
    "key": "yuheng.page.yuheng.groups",
    "defaultLocale": "en-US",
    "defaults": {
      "en-US": "GatewayGroupsPage"
    }
  },
  {
    "pageCode": "yuheng.web.permissions",
    "key": "yuheng.page.applications",
    "defaultLocale": "en-US",
    "defaults": {
      "en-US": "ApplicationsPage"
    }
  },
  {
    "pageCode": "yuheng.web.permissions",
    "key": "yuheng.page.openapi.sync",
    "defaultLocale": "en-US",
    "defaults": {
      "en-US": "OpenApiSyncPage"
    }
  },
  {
    "pageCode": "yuheng.web.permissions",
    "key": "yuheng.page.yuheng.groups.groupId.overview",
    "defaultLocale": "en-US",
    "defaults": {
      "en-US": "GatewayGroupDetailPage"
    }
  },
  {
    "pageCode": "yuheng.web.permissions",
    "key": "yuheng.page.yuheng.groups.groupId.draft.routes",
    "defaultLocale": "en-US",
    "defaults": {
      "en-US": "DraftPage"
    }
  },
  {
    "pageCode": "yuheng.web.permissions",
    "key": "yuheng.page.yuheng.groups.groupId.draft.policies",
    "defaultLocale": "en-US",
    "defaults": {
      "en-US": "DraftPage"
    }
  },
  {
    "pageCode": "yuheng.web.permissions",
    "key": "yuheng.page.yuheng.groups.groupId.releases",
    "defaultLocale": "en-US",
    "defaults": {
      "en-US": "ReleasesPage"
    }
  },
  {
    "pageCode": "yuheng.web.permissions",
    "key": "yuheng.page.yuheng.groups.groupId.releases.releaseId",
    "defaultLocale": "en-US",
    "defaults": {
      "en-US": "ReleaseDetailPage"
    }
  },
  {
    "pageCode": "yuheng.web.permissions",
    "key": "yuheng.page.interface.catalog",
    "defaultLocale": "en-US",
    "defaults": {
      "en-US": "CatalogPage"
    }
  },
  {
    "pageCode": "yuheng.web.permissions",
    "key": "yuheng.page.applications.applicationId.catalog",
    "defaultLocale": "en-US",
    "defaults": {
      "en-US": "CatalogPage"
    }
  },
  {
    "pageCode": "yuheng.web.permissions",
    "key": "yuheng.page.operations.operationId",
    "defaultLocale": "en-US",
    "defaults": {
      "en-US": "OperationPage"
    }
  },
  {
    "pageCode": "yuheng.web.permissions",
    "key": "yuheng.page.providers",
    "defaultLocale": "en-US",
    "defaults": {
      "en-US": "ProvidersPage"
    }
  },
  {
    "pageCode": "yuheng.web.permissions",
    "key": "yuheng.page.mcp.servers",
    "defaultLocale": "en-US",
    "defaults": {
      "en-US": "McpServersPage"
    }
  },
  {
    "pageCode": "yuheng.web.permissions",
    "key": "yuheng.page.mcp.servers.serverId",
    "defaultLocale": "en-US",
    "defaults": {
      "en-US": "McpServerWorkbenchPage"
    }
  },
  {
    "pageCode": "yuheng.web.permissions",
    "key": "yuheng.page.mcp.remote.providers",
    "defaultLocale": "en-US",
    "defaults": {
      "en-US": "McpRemoteProvidersPage"
    }
  },
  {
    "pageCode": "yuheng.web.permissions",
    "key": "yuheng.page.observability.traces",
    "defaultLocale": "en-US",
    "defaults": {
      "en-US": "TracesPage"
    }
  },
  {
    "pageCode": "yuheng.web.permissions",
    "key": "yuheng.page.audit",
    "defaultLocale": "en-US",
    "defaults": {
      "en-US": "AuditPage"
    }
  },
  {
    "pageCode": "yuheng.web.permissions",
    "key": "yuheng.page.llm.configuration",
    "defaultLocale": "en-US",
    "defaults": {
      "en-US": "LlmConfigurationPage"
    }
  },
  {
    "pageCode": "yuheng.web.permissions",
    "key": "yuheng.menu.group1",
    "defaultLocale": "en-US",
    "defaults": {
      "en-US": "Navigation group 1"
    }
  },
  {
    "pageCode": "yuheng.web.permissions",
    "key": "yuheng.menu.group2",
    "defaultLocale": "en-US",
    "defaults": {
      "en-US": "Navigation group 2"
    }
  },
  {
    "pageCode": "yuheng.web.permissions",
    "key": "yuheng.menu.group3",
    "defaultLocale": "en-US",
    "defaults": {
      "en-US": "Navigation group 3"
    }
  },
  {
    "pageCode": "yuheng.web.permissions",
    "key": "yuheng.menu.group4",
    "defaultLocale": "en-US",
    "defaults": {
      "en-US": "Navigation group 4"
    }
  }
] as const)
