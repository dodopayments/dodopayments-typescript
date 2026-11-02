# Remote MCP Server on Cloudflare with Stainless

Remote MCP servers require OAuth, so this flow implements a local version of the OAuth redirects, but instead accepts the
API token and any other client configuration options that you'd need to instantiate your TypeScript client.

## Code execution (`execute` tool)

The `execute` tool runs caller-supplied TypeScript against a pre-authenticated SDK client. This worker runs that code **itself**, inside a per-request [Cloudflare Worker Loader](https://developers.cloudflare.com/dynamic-workers/) isolate — it does **not** proxy code to any external sandbox service at runtime.

How it works:

- `src/isolate-entry.ts` is bundled with the DodoPayments SDK into a single module (`scripts/build-isolate.mjs` → `src/isolate-bundle.generated.ts`). This is the bootstrap that runs inside each isolate.
- At request time, `src/execute-tool.ts` loads that bootstrap plus the caller's code (as a separate `user-code.js` module) into a fresh isolate via the `LOADER` binding, passing the caller's client options through `env`.
- The isolate builds a `DodoPayments` client, runs the caller's `run(client)`, captures `console.log`/`console.error`, and returns `{ result, log_lines, err_lines }` — the same shape the tool returned previously.

Security model:

- Each execution gets its own V8 isolate with no shared state between calls.
- The isolate runs with the **caller's own** API key (same trust level as a direct API call); no shared or privileged credential is exposed to user code.
- Outbound `fetch` is enabled so the code can reach the DodoPayments API. The isolate cannot read the parent worker's bindings (KV, secrets) — it only receives what is explicitly passed in `env`.

Requirements:

- The `worker_loaders` binding (`LOADER`) must be enabled on the Cloudflare account. Worker Loaders is in open beta; deployment fails if the account is not entitled.
- `npm run build:isolate` runs automatically on `postinstall` and before `dev`/`deploy`; `src/isolate-bundle.generated.ts` is a generated artifact and is git-ignored.

## MCP transport

The Worker serves MCP at `POST /mcp` only, with `@modelcontextprotocol/server` v2 (`createMcpHandler`):

- Clients of the 2026-07-28 revision send `_meta` on each request. Clients that send `initialize` (2025 revisions) get a stateless answer from the same server.
- The Worker keeps no session: no `Mcp-Session-Id`, no Durable Object. `GET /mcp` and `DELETE /mcp` return 405. `/sse` returns 404.
- `tools/list` has `execute` and `search_docs`. The annotations of `execute` follow the scopes of the grant, so the list has `cacheScope: "private"` and `ttlMs: 300000`.
- If the API returns 403 in `execute`, the tool returns an error with the missing scope and `_meta["mcp/www_authenticate"]`.
- The `traceparent` and `tracestate` values of the request `_meta` go to the API calls of `execute`.

### Conformance

```bash
npm run dev:conformance   # local only: serves /mcp on 127.0.0.1:8787 with a fixed read-only grant and no token check
npm run conformance       # the 2026-07-28 and 2025-11-25 requirement sets, with test-support/conformance-expected-failures.yml
```

`test-support/wrangler.conformance.jsonc` builds `test-support/conformance-worker.ts`. The production config (`wrangler.jsonc`) builds `src/index.ts`, which does not import that file.

## Dodo Payments sign-in (dodo-auth)

When these five secrets are set, the MCP resource at `/mcp` uses the Dodo Payments authorization server. If one secret is missing, the Worker uses only its own API-key sign-in.

| Secret                        | Production value                              |
| ----------------------------- | --------------------------------------------- |
| `DODO_AUTH_ISSUER`            | `https://auth.dodopayments.com`               |
| `DODO_AUTH_MCP_RESOURCE`      | `https://mcp.dodopayments.com/mcp`            |
| `DODO_AUTH_API_RESOURCE_TEST` | `https://test.dodopayments.com`               |
| `DODO_AUTH_API_RESOURCE_LIVE` | `https://live.dodopayments.com`               |
| `MCP_WORKER_CLIENT_SECRET`    | `MCP_WORKER_CLIENT_SECRET` of `dodo_auth/prd` |

- The metadata at `/.well-known/oauth-protected-resource/mcp` names `DODO_AUTH_ISSUER`. New clients thus sign in at Dodo Payments.
- The Worker introspects each token. It never sends the MCP token to the API. The `execute` tool exchanges the MCP token (RFC 8693) for an API token of 5 minutes.
- A connection with test mode and live mode must send the `Dodo-Mode: test` or `Dodo-Mode: live` header.
- Each request sends its token. The Worker keeps no MCP session, so each request uses the mode of its own token and header.
- A token of the Worker's own server (the form `user:grant:secret`) works until it expires.

To turn it off, delete `DODO_AUTH_ISSUER`.

## Usage

The recommended way to use this project is to use the below "deploy to cloudflare" button to use this repo as a template for generating a server.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/dodopayments/dodopayments-typescript/tree/main/packages/mcp-server/cloudflare-worker)

## Develop locally

```bash
# install dependencies
npm install

# run locally
npm run dev
```

You should be able to open [`http://localhost:8787/`](http://localhost:8787/) in your browser

## Connect the MCP inspector to your server

To explore your new MCP api, you can use the [MCP Inspector](https://modelcontextprotocol.io/docs/tools/inspector).

- Start it with `npx @modelcontextprotocol/inspector`
- [Within the inspector](http://localhost:5173), switch the Transport Type to `Streamable HTTP` and enter `http://localhost:8787/mcp` as the URL of the MCP server to connect to, and click "Connect"
- You will navigate to a (mock) user/password login screen. Input any email and pass to login.
- You should be redirected back to the MCP Inspector and you can now list and call any defined tools!

## Connect Claude Desktop to your local MCP server

The MCP inspector is great, but we really want to connect this to Claude! Follow [Anthropic's Quickstart](https://modelcontextprotocol.io/quickstart/user) and within Claude Desktop go to Settings > Developer > Edit Config to find your configuration file.

Open the file in your text editor and replace it with this configuration:

```json
{
  "mcpServers": {
    "dodopayments_api": {
      "command": "npx",
      "args": ["mcp-remote", "http://localhost:8787/mcp"]
    }
  }
}
```

This will run a local proxy and let Claude talk to your MCP server over HTTP

When you open Claude a browser window should open and allow you to login. You should see the tools available in the bottom right. Given the right prompt Claude should ask to call the tool.

## Deploy to Cloudflare

If you want to manually deploy this server (e.g. without the "deploy to cloudflare" button)

1. `npx wrangler@latest kv namespace create remote-mcp-server-oauth-kv`
2. Follow the guidance to add the kv namespace ID to `wrangler.jsonc`
3. Ensure the target Cloudflare account has the Worker Loaders beta enabled (required by the `LOADER` binding for the `execute` tool)
4. `npm run deploy`

## Call your newly deployed remote MCP server from a remote MCP client

Just like you did above in "Develop locally", run the MCP inspector:

`npx @modelcontextprotocol/inspector@latest`

Then enter the `workers.dev` URL (ex: `worker-name.account-name.workers.dev/mcp`) of your Worker in the inspector as the URL of the MCP server to connect to, and click "Connect".

You've now connected to your MCP server from a remote MCP client.

## Connect Claude Desktop to your remote MCP server

Update the Claude configuration file to point to your `workers.dev` URL (ex: `worker-name.account-name.workers.dev/mcp`) and restart Claude

```json
{
  "mcpServers": {
    "dodopayments_api": {
      "command": "npx",
      "args": ["mcp-remote", "https://worker-name.account-name.workers.dev/mcp"]
    }
  }
}
```

## Debugging

Should anything go wrong it can be helpful to restart Claude, or to try connecting directly to your
MCP server on the command line with the following command.

```bash
npx mcp-remote http://localhost:8787/mcp
```

In some rare cases it may help to clear the files added to `~/.mcp-auth`

```bash
rm -rf ~/.mcp-auth
```
