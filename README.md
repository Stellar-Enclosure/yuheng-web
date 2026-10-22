# yuheng-web

[English](README.md) | [中文](README.zh-CN.md)

React management console for Yuheng gateways, API definitions, releases, MCP and LLM configuration. All first-party modules start at **0.0.1**.

## Pages and capabilities

| Area | Routes and function |
|---|---|
| Overview and providers | `/dashboard`, `/providers`: gateway/runtime summaries and registered provider projections. |
| Gateway groups | `/yuheng-groups` and group detail pages: inspect groups, edit route/policy drafts, validate changes and inspect releases. |
| API governance | `/applications`, `/interface-catalog`, `/operations/:operationId`, `/openapi-sync`: applications/credentials, interface definitions, operation details and synchronization state. |
| Release management | Group release/history/detail routes: compare revisions, inspect publication results, retry and roll back. |
| MCP | `/mcp/servers`, `/mcp/servers/:serverId`, `/mcp/remote-providers`: server workbench, tools/resources/prompts and remote-provider management. |
| LLM | `/llm/configuration`: configure model channels and model policies. |
| Observability | `/observability/traces`, `/audit`: trace queries and management audit. |

See [route definitions](src/app/App.tsx), [feature modules](src/features/) and [typed API clients](src/api/). The console calls [Yuheng Admin](https://github.com/Stellar-Enclosure/yuheng-service), not Provider endpoints or the gateway data plane directly. Knowledge/Wiki pages are owned by [yaoguang-web](https://github.com/Stellar-Enclosure/yaoguang-web).

Authentication uses Edge registration `edge-yuheng`, BFF sessions and `/api/v1/auth/bootstrap`. General management pages require `yuheng:read`; MCP adds its own read capability, while LLM configuration has its independent `yuheng:llm:read` route branch. The current bootstrap endpoint itself still requires `yuheng:read`, so the LLM route guard alone does not grant console access. Backend authorization remains authoritative. The SPA can be mounted by the portal with `VITE_BASE_PATH`; a frontend build does not verify live release propagation or routing.

## Build and test

Requires Node 24 and npm 11. After the SDKs are published:

```bash
npm ci
npm run build
npm test -- --run
```

For the initial release before npm publication, clone `web-sdk` next to this repository:

```bash
node ../web-sdk/scripts/verify-consumers.mjs \
  --workspace "$(cd .. && pwd)" \
  --cache "$HOME/.npm" \
  --output "$(cd ../web-sdk && pwd)/dist/npm-release" \
  --consumer yuheng-web --phase verify --online true
```

The verifier uses actual pack checksums and official registry addresses in the committed lock, then validates offline installation. It never publishes packages.

## Application delivery (no package publication)

This repository is a frontend application, not a library. Its `package.json` remains `private: true`; do not publish it to npm or Maven Central. Publish only the reusable packages owned by [web-sdk](https://github.com/Stellar-Enclosure/web-sdk#publish-to-npmjs).

```bash
npm ci
npm test
npm run build
```

Deploy the resulting `dist/` directory as static application assets. Before the first SDK publication, use the Build section's local consumer verification instead of `npm ci` against the public registry. These commands do not start a server.

## Compatibility and publication

Java packages/classes, Bean names, configuration keys, OAuth/RPC identities, APIs, and database ownership are retained. Existing SQL and DDL history are copied byte for byte. Artifact/build versions and necessary build paths change. A successful build does not imply application startup or live infrastructure acceptance.

Git pushes run validation only. Central and npm publication are separate user actions. CI defaults to initial source bootstrap; after publication set `STELLAR_USE_SOURCE_BOOTSTRAP=false` to consume published artifacts directly. Private organizations may supply the Actions secret `STELLAR_ENCLOSURE_READ_TOKEN` with repository read access.

Original MIT/LGPL licenses and author attribution are preserved.
