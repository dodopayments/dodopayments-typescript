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
- Outbound `fetch` is enabled so the code can reach the DodoPayments API. The isolate cannot read the parent worker's bindings (KV, Durable Object, secrets) — it only receives what is explicitly passed in `env`.

Requirements:

- The `worker_loaders` binding (`LOADER`) must be enabled on the Cloudflare account. Worker Loaders is in open beta; deployment fails if the account is not entitled.
- `npm run build:isolate` runs automatically on `postinstall` and before `dev`/`deploy`; `src/isolate-bundle.generated.ts` is a generated artifact and is git-ignored.

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
- [Within the inspector](http://localhost:5173), switch the Transport Type to `SSE` and enter `http://localhost:8787/sse` as the URL of the MCP server to connect to, and click "Connect"
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
      "args": ["mcp-remote", "http://localhost:8787/sse"]
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

Then enter the `workers.dev` URL (ex: `worker-name.account-name.workers.dev/sse`) of your Worker in the inspector as the URL of the MCP server to connect to, and click "Connect".

You've now connected to your MCP server from a remote MCP client.

## Connect Claude Desktop to your remote MCP server

Update the Claude configuration file to point to your `workers.dev` URL (ex: `worker-name.account-name.workers.dev/sse`) and restart Claude

```json
{
  "mcpServers": {
    "dodopayments_api": {
      "command": "npx",
      "args": ["mcp-remote", "https://worker-name.account-name.workers.dev/sse"]
    }
  }
}
```

## Debugging

Should anything go wrong it can be helpful to restart Claude, or to try connecting directly to your
MCP server on the command line with the following command.

```bash
npx mcp-remote http://localhost:8787/sse
```

In some rare cases it may help to clear the files added to `~/.mcp-auth`

```bash
rm -rf ~/.mcp-auth
```
