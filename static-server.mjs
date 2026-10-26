import { createReadStream, readFileSync, statSync } from 'node:fs'
import { createServer, request as proxyRequest } from 'node:http'
import { request as secureProxyRequest } from 'node:https'
import { extname, join, normalize } from 'node:path'

const port = Number.parseInt(process.env.PORT ?? '8080', 10)
const apiBase = new URL(
  process.env.YUHENG_EDGE_BASE_URL ?? process.env.YUHENG_ADMIN_API_BASE_URL ?? 'http://edge:18180',
)
const appAliases = [process.env.YUHENG_EDGE_APP_ALIAS ?? 'edge-yuheng', process.env.YAOGUANG_EDGE_APP_ALIAS ?? 'edge-yaoguang']
if (appAliases.some(alias => !/^[a-z][a-z0-9-]{0,63}$/.test(alias))) throw new Error('Invalid Edge application alias')
const applicationPaths = appAliases.map(alias => `/apps/${alias}/`)
const developmentPlaintext =
  process.env.YUHENG_ADMIN_API_DEVELOPMENT_PLAINTEXT === 'true'
const tlsFile = (name) => {
  const path = process.env[name]
  if (!path) {
    throw new Error(`${name} is required for Edge mTLS`)
  }
  return readFileSync(path)
}
if (apiBase.protocol === 'http:' && !developmentPlaintext) {
  throw new Error(
    'Edge plaintext requires explicit development configuration',
  )
}
if (!['http:', 'https:'].includes(apiBase.protocol)) {
  throw new Error('Edge origin must use HTTP or HTTPS')
}
const apiTls = apiBase.protocol === 'https:'
  ? {
      ca: tlsFile('YUHENG_ADMIN_API_TLS_CA_PATH'),
      cert: tlsFile('YUHENG_ADMIN_API_TLS_CERTIFICATE_PATH'),
      key: tlsFile('YUHENG_ADMIN_API_TLS_PRIVATE_KEY_PATH'),
      rejectUnauthorized: true,
      servername: apiBase.hostname,
    }
  : {}
const root = '/app/dist'
const buildEvidence = JSON.parse(readFileSync(join(root, 'permission-build.json'), 'utf8'))
if (buildEvidence.schemaVersion !== 1 || buildEvidence.producerId !== 'yuheng-web'
    || buildEvidence.application?.businessCode !== 'xingyuan' || buildEvidence.application?.applicationCode !== 'yuheng') {
  throw new Error('A verified yuheng-web permission build is required')
}
const contentTypes = new Map([
  ['.css', 'text/css; charset=utf-8'],
  ['.html', 'text/html; charset=utf-8'],
  ['.ico', 'image/x-icon'],
  ['.js', 'text/javascript; charset=utf-8'],
  ['.json', 'application/json; charset=utf-8'],
  ['.png', 'image/png'],
  ['.svg', 'image/svg+xml'],
  ['.woff2', 'font/woff2'],
])

const proxy = (incoming, outgoing) => {
  const request = apiBase.protocol === 'https:'
    ? secureProxyRequest
    : proxyRequest
  const upstream = request(
    new URL(incoming.url, apiBase),
    {
      method: incoming.method,
      headers: { ...incoming.headers, host: apiBase.host },
      ...apiTls,
    },
    (response) => {
      outgoing.writeHead(response.statusCode ?? 502, response.headers)
      response.pipe(outgoing)
    },
  )
  upstream.on('error', () => {
    if (!outgoing.headersSent) {
      outgoing.writeHead(502, { 'Content-Type': 'application/json' })
    }
    outgoing.end('{"code":"YUHENG_ADMIN_WEB_UPSTREAM_UNAVAILABLE"}')
  })
  incoming.pipe(upstream)
}

const serve = (incoming, outgoing) => {
  if (incoming.url === '/healthz') {
    outgoing.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' })
    outgoing.end('ok')
    return
  }
  if (applicationPaths.some(path => incoming.url?.startsWith(path))) {
    proxy(incoming, outgoing)
    return
  }
  const pathname = decodeURIComponent(new URL(incoming.url, 'http://local').pathname)
  const relative = normalize(pathname).replace(/^(\.\.(\/|\\|$))+/, '')
  let candidate = join(root, relative)
  try {
    if (!statSync(candidate).isFile()) {
      candidate = join(root, 'index.html')
    }
  } catch {
    candidate = join(root, 'index.html')
  }
  outgoing.writeHead(200, {
    'Cache-Control': candidate.endsWith('index.html')
      ? 'no-cache'
      : 'public, max-age=31536000, immutable',
    'Content-Type': contentTypes.get(extname(candidate))
      ?? 'application/octet-stream',
  })
  createReadStream(candidate).pipe(outgoing)
}

if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error('PORT must be an integer between 1 and 65535')
}

createServer(serve).listen(port, '0.0.0.0')
