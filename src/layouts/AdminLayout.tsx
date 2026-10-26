import {usePermission} from '@stellar-enclosure/stellar-enclosure-web-shared/react-permissions'
import {resources} from '../permissions/resources'
import {
    ApiOutlined,
    AppstoreOutlined,
    AuditOutlined,
    DashboardOutlined,
    DeploymentUnitOutlined,
    EyeOutlined,
    KeyOutlined,
    LogoutOutlined,
    RobotOutlined,
    ShareAltOutlined,
    ThunderboltOutlined,
} from '@ant-design/icons'
import {Badge, Space} from 'antd'
import {useQueryClient} from '@tanstack/react-query'
import {
    EnterpriseLayout,
    type EnterpriseLayoutConfig,
    type EnterpriseNavigationItem,
} from '@stellar-enclosure/stellar-enclosure-web-shared'
import {Outlet, useNavigate} from 'react-router-dom'
import {version} from '../../package.json'
import {useAuth} from '../auth/AuthContext'
import {type Capability} from '../app/capabilities'

// 平台自己的导航树，由 capability 递归剪枝后交给 shared 左侧树。
interface GatewayNavItem {
  key: string
  icon: React.ReactNode
  label: string
  capability: Capability
  path?: string
  activePathPrefixes?: readonly string[]
  children?: readonly GatewayNavItem[]
}

interface WujieRuntimeWindow extends Window {
  $wujie?: { props?: { embedded?: boolean } }
}

const navigation: readonly GatewayNavItem[] = [
  { key: '/dashboard', path: '/dashboard', icon: <DashboardOutlined />, label: '总览', capability: 'yuheng.menu.dashboard' },
  {
    key: 'yuheng-governance',
    icon: <DeploymentUnitOutlined />,
    label: '网关治理',
    capability: 'yuheng.menu.group1',
    children: [
      {key: '/yuheng-groups', path: '/yuheng-groups', icon: <DeploymentUnitOutlined />, label: 'Yuheng Group', capability: 'yuheng.menu.yuheng.groups'},
      {key: '/applications', path: '/applications', icon: <KeyOutlined />, label: 'Application / Credential', capability: 'yuheng.menu.applications'},
      {key: '/openapi-sync', path: '/openapi-sync', icon: <ApiOutlined />, label: 'OpenAPI 同步', capability: 'yuheng.menu.openapi.sync'},
      {key: '/interface-catalog', path: '/interface-catalog', activePathPrefixes: ['/operations'], icon: <AppstoreOutlined />, label: '接口目录', capability: 'yuheng.menu.interface.catalog'},
      {key: '/providers', path: '/providers', icon: <ApiOutlined />, label: 'Provider', capability: 'yuheng.menu.providers'},
    ],
  },
  {
    key: 'mcp',
    icon: <RobotOutlined />,
    label: 'MCP',
    capability: 'yuheng.menu.group2',
    children: [
      {key: '/mcp/servers', path: '/mcp/servers', icon: <RobotOutlined />, label: 'MCP Control Plane', capability: 'yuheng.menu.mcp.servers'},
      {key: '/mcp/remote-providers', path: '/mcp/remote-providers', icon: <ShareAltOutlined />, label: 'Remote MCP', capability: 'yuheng.menu.mcp.remote.providers'},
    ],
  },
  {
    key: 'llm',
    icon: <ThunderboltOutlined />,
    label: '模型网关',
    capability: 'yuheng.menu.group3',
    children: [
      {key: '/llm/configuration', path: '/llm/configuration', icon: <ThunderboltOutlined />, label: '模型与渠道', capability: 'yuheng.menu.llm.configuration'},
    ],
  },
  {
    key: 'observability',
    icon: <EyeOutlined />,
    label: '观测与审计',
    capability: 'yuheng.menu.group4',
    children: [
      {key: '/observability/traces', path: '/observability/traces', icon: <EyeOutlined />, label: '调用观测', capability: 'yuheng.menu.observability.traces'},
      {key: '/audit', path: '/audit', icon: <AuditOutlined />, label: '审计日志', capability: 'yuheng.menu.audit'},
    ],
  },
]

export const AdminLayout = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const auth = useAuth()
  const permission = usePermission(auth.authorization?.snapshot ?? null, auth.authorization?.binding ?? null)

  const embedded = (window as WujieRuntimeWindow).$wujie?.props?.embedded === true
  const items: EnterpriseNavigationItem[] = filterNavigation(navigation, Object.fromEntries(resources.map(resource => [resource.key, permission.allows('requirement' in resource ? resource.requirement : {access: resource.access})])))

  const config: EnterpriseLayoutConfig = {
    platformName: 'Yuheng Admin',
    navigation: items,
    actions: (
      <Space size="middle" wrap>
        <Badge status="processing" text="Admin API" />
      </Space>
    ),
      user: auth.authorization
      ? {
              name: auth.authorization.user.identitySub,
          menu: [
            {
              key: 'logout',
              label: '退出登录',
              icon: <LogoutOutlined />,
              onClick: () => {
                void auth.logout()
                queryClient.clear()
                navigate('/login', { replace: true })
              },
            },
          ],
        }
      : undefined,
    footer: { version },
  }
  const layoutConfig: EnterpriseLayoutConfig = embedded
    ? {...config, hideHeader: true, hideFooter: true}
    : config

  return (
    <EnterpriseLayout config={layoutConfig}>
      <Outlet />
    </EnterpriseLayout>
  )
}

const filterNavigation = (
  entries: readonly GatewayNavItem[],
  granted: Partial<Record<Capability, boolean>>,
): EnterpriseNavigationItem[] => entries.flatMap((item): EnterpriseNavigationItem[] => {
  // 未在本页显式订阅的能力一律按“无权限”处理，导航不放宽。
  if (!granted[item.capability]) return []
  const children = item.children ? filterNavigation(item.children, granted) : []
  if (item.children && children.length === 0) return []
  return [{
    key: item.key,
    label: item.label,
    path: item.path,
    icon: item.icon,
    activePathPrefixes: item.activePathPrefixes,
    children: children.length > 0 ? children : undefined,
  }]
})
