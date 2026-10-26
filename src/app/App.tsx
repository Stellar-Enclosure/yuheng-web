import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {ConfigProvider, Result} from 'antd'
import zhCN from 'antd/locale/zh_CN'
import {lazy, Suspense, useEffect, type ReactNode} from 'react'
import {createBrowserRouter, Navigate, Outlet, RouterProvider} from 'react-router-dom'
import {CapabilityProvider, type Capability} from './capabilities'
import {AuthProvider} from '../auth/AuthContext'
import {FieldCatalogProvider} from '../permissions/FieldCatalog'
import {LoginPage} from '../auth/LoginPage'
import {RequireAuth, RequireCapability} from '../auth/RouteGuards'
import {LoadingBlock} from '../components/QueryState'
import {AdminLayout} from '../layouts/AdminLayout'

const configuredBase: string = import.meta.env.VITE_BASE_PATH ?? '/'
if (!configuredBase.startsWith('/') || configuredBase.startsWith('//')
  || /[\\?#%]/.test(configuredBase) || Array.from(configuredBase).some((character) => character.charCodeAt(0) < 32 || character.charCodeAt(0) === 127) || /\/{2,}/.test(configuredBase)
  || configuredBase.split('/').some((segment) => segment === '.' || segment === '..')) {
  throw new Error('Invalid VITE_BASE_PATH')
}
const basePath = configuredBase === '/' ? '/' : configuredBase.replace(/\/?$/, '/')

const DashboardPage = lazy(() =>
  import('../features/dashboard/DashboardPage').then((module) => ({
    default: module.DashboardPage,
  })),
)
const GatewayGroupsPage = lazy(() =>
  import('../features/gateway-groups/GatewayGroupsPage').then((module) => ({
    default: module.GatewayGroupsPage,
  })),
)
const GatewayGroupDetailPage = lazy(() =>
  import('../features/gateway-groups/GatewayGroupDetailPage').then((module) => ({
    default: module.GatewayGroupDetailPage,
  })),
)
const CatalogPage = lazy(() =>
  import('../features/interface-catalog/CatalogPage').then((module) => ({
    default: module.CatalogPage,
  })),
)
const OperationPage = lazy(() =>
  import('../features/interface-catalog/OperationPage').then((module) => ({
    default: module.OperationPage,
  })),
)
const DraftPage = lazy(() =>
  import('../features/draft/DraftPage').then((module) => ({
    default: module.DraftPage,
  })),
)
const ReleasesPage = lazy(() =>
  import('../features/releases/ReleasesPage').then((module) => ({
    default: module.ReleasesPage,
  })),
)
const ReleaseDetailPage = lazy(() =>
  import('../features/releases/ReleaseDetailPage').then((module) => ({
    default: module.ReleaseDetailPage,
  })),
)
const ProvidersPage = lazy(() =>
  import('../features/providers/ProvidersPage').then((module) => ({
    default: module.ProvidersPage,
  })),
)
const TracesPage = lazy(() =>
  import('../features/observability/TracesPage').then((module) => ({
    default: module.TracesPage,
  })),
)
const AuditPage = lazy(() =>
  import('../features/audit/AuditPage').then((module) => ({
    default: module.AuditPage,
  })),
)
const ApplicationsPage = lazy(() =>
  import('../features/applications/ApplicationsPage').then((module) => ({
    default: module.ApplicationsPage,
  })),
)
const OpenApiSyncPage = lazy(() =>
  import('../features/openapi/OpenApiSyncPage').then((module) => ({
    default: module.OpenApiSyncPage,
  })),
)
const McpServersPage = lazy(() =>
  import('../features/mcp/McpServersPage').then((module) => ({
    default: module.McpServersPage,
  })),
)
const McpServerWorkbenchPage = lazy(() =>
  import('../features/mcp/McpServerWorkbenchPage').then((module) => ({
    default: module.McpServerWorkbenchPage,
  })),
)
const McpRemoteProvidersPage = lazy(() =>
  import('../features/mcp/McpRemoteProvidersPage').then((module) => ({
    default: module.McpRemoteProvidersPage,
  })),
)
const LlmConfigurationPage = lazy(() =>
  import('../features/llm/LlmConfigurationPage').then((module) => ({
    default: module.LlmConfigurationPage,
  })),
)

// 员工知识工作区与模型网关：同一 AuthProvider/AdminLayout 下的独立分支，
// 只按各自 read 能力放行，不复用也不放宽旧管理根的 yuheng:read。
const guarded = (capability: Capability, node: ReactNode) => (
  <RequireCapability capability={capability}>{node}</RequireCapability>
)

const WorkspaceAuthBoundary = () => {
  const resource = 'yuheng' as const
  useEffect(() => {
    return () => { queryClient.clear() }
  }, [resource])
  return (
    <AuthProvider key={resource} resource={resource}>
      <FieldCatalogProvider><CapabilityProvider><Outlet /></CapabilityProvider></FieldCatalogProvider>
    </AuthProvider>
  )
}

const router = createBrowserRouter([{element: <WorkspaceAuthBoundary />, children: [
  {path: '/login', element: <LoginPage />},
  {
    path: '/',
    element: <RequireAuth><AdminLayout /></RequireAuth>,
    errorElement: <Result status="error" title="页面加载失败" subTitle="请返回上一页或刷新。" />,
    children: [
      {index: true, element: <Navigate replace to="/dashboard" />},
      {path: 'dashboard', element: guarded('yuheng.page.dashboard', <DashboardPage />)},
      {path: 'yuheng-groups', element: guarded('yuheng.page.yuheng.groups', <GatewayGroupsPage />)},
      {path: 'applications', element: guarded('yuheng.page.applications', <ApplicationsPage />)},
      {path: 'openapi-sync', element: guarded('yuheng.page.openapi.sync', <OpenApiSyncPage />)},
      {path: 'yuheng-groups/:groupId/overview', element: guarded('yuheng.page.yuheng.groups.groupId.overview', <GatewayGroupDetailPage />)},
      {path: 'yuheng-groups/:groupId/draft/routes', element: guarded('yuheng.page.yuheng.groups.groupId.draft.routes', <DraftPage />)},
      {path: 'yuheng-groups/:groupId/draft/policies', element: guarded('yuheng.page.yuheng.groups.groupId.draft.policies', <DraftPage />)},
      {path: 'yuheng-groups/:groupId/releases', element: guarded('yuheng.page.yuheng.groups.groupId.releases', <ReleasesPage />)},
      {path: 'yuheng-groups/:groupId/releases/:releaseId', element: guarded('yuheng.page.yuheng.groups.groupId.releases.releaseId', <ReleaseDetailPage />)},
      {path: 'interface-catalog', element: guarded('yuheng.page.interface.catalog', <CatalogPage />)},
      {path: 'applications/:applicationId/catalog', element: guarded('yuheng.page.applications.applicationId.catalog', <CatalogPage />)},
      {path: 'operations/:operationId', element: guarded('yuheng.page.operations.operationId', <OperationPage />)},
      {path: 'providers', element: guarded('yuheng.page.providers', <ProvidersPage />)},
      {path: 'mcp/servers', element: guarded('yuheng.page.mcp.servers', <McpServersPage />)},
      {path: 'mcp/servers/:serverId', element: guarded('yuheng.page.mcp.servers.serverId', <McpServerWorkbenchPage />)},
      {path: 'mcp/remote-providers', element: guarded('yuheng.page.mcp.remote.providers', <McpRemoteProvidersPage />)},
      {path: 'observability/traces', element: guarded('yuheng.page.observability.traces', <TracesPage />)},
      {path: 'audit', element: guarded('yuheng.page.audit', <AuditPage />)},
      {path: 'llm/configuration', element: guarded('yuheng.page.llm.configuration', <LlmConfigurationPage />)},
      {path: '*', element: <Result status="404" title="404" subTitle="页面不存在" />},
    ],
  },
]}], {basename: basePath})

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        const status = (error as { status?: number }).status
        return failureCount < 2 && (status === 429 || status === undefined || status >= 500)
      },
      staleTime: 5_000,
      refetchOnWindowFocus: false,
    },
    mutations: { retry: false },
  },
})

export const App = () => (
  <ConfigProvider
    locale={zhCN}
    theme={{
      token: {
        colorPrimary: '#3157d5',
        borderRadius: 8,
        colorBgLayout: '#f4f6fa',
      },
    }}
  >
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<LoadingBlock />}>
        <RouterProvider router={router} />
      </Suspense>
    </QueryClientProvider>
  </ConfigProvider>
)
