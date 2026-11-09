# Dodo Payments MCP Server

This server connects AI assistants and other MCP clients to the Dodo Payments API. It uses the streamable HTTP transport at this URL:

```
{{origin}}/mcp
```

## Sign in with Dodo Payments

You sign in with your Dodo Payments account through OAuth. You do not need an API key.

When you add the server, your client opens the Dodo Payments sign-in page (`https://auth.dodopayments.com`) in your browser. On the consent page, select:

- The business that the client can use.
- The modes: test mode, live mode, or both.
- The permissions of the client.

Then approve the connection. Start with test mode and read permissions. Approve live mode or write permissions only when you need them.

## Connect your client

### Claude Code

```bash
claude mcp add --transport http dodopayments {{origin}}/mcp
```

Then run `/mcp` in Claude Code and select `dodopayments` to sign in.

### Claude Desktop and Claude.ai

1. Open **Settings → Connectors**.
2. Click **Add custom connector**.
3. Enter the URL `{{origin}}/mcp`.

### Cursor

Add the server to `~/.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "dodopayments": {
      "url": "{{origin}}/mcp"
    }
  }
}
```

### ChatGPT

Open **Settings → Apps & Connectors** and create a connector. Enter `{{origin}}/mcp` as the MCP server URL and select OAuth as the authentication. On some plans, custom connectors need developer mode.

### Other clients

Use the URL `{{origin}}/mcp` in a client that supports remote MCP servers with OAuth. If your client supports only local (stdio) servers, use `mcp-remote` as a bridge:

```json
{
  "mcpServers": {
    "dodopayments": {
      "command": "npx",
      "args": ["-y", "mcp-remote@latest", "{{origin}}/mcp"]
    }
  }
}
```

## Test mode and live mode

A connection with one mode always uses that mode. A connection with both modes must send the `Dodo-Mode: test` or `Dodo-Mode: live` header with each request. If your client cannot send custom headers, select one mode on the consent page.

Each session keeps one mode. To use the other mode, start a new session with the other header value.

Claude Code:

```bash
claude mcp add --transport http dodopayments {{origin}}/mcp --header "Dodo-Mode: test"
```

Cursor:

```json
{
  "mcpServers": {
    "dodopayments": {
      "url": "{{origin}}/mcp",
      "headers": { "Dodo-Mode": "test" }
    }
  }
}
```

## Tools

If your client cannot sign in, use `{{origin}}/mcp?auth=optional`. The tools below then work without sign-in, and `execute` asks you to sign in.

Docs tools:

- `search_docs`: searches the Dodo Payments guides. Call it before you write integration code.
- `read_docs_page`: reads a page of docs.dodopayments.com as markdown.
- `search`: searches the SDK reference for methods, parameters, and examples. Call it before `execute`.
- `feedback`: sends a note about a wrong answer or a missing feature to the Dodo Payments team. Emails, IDs, and keys are removed first.

Account tool:

- `execute`: runs JavaScript code with the Dodo Payments TypeScript SDK. The code defines `async function run(client) { ... }`. The `client` is an SDK client for your business, in the mode of the session. The tool returns the value of `run` and the `console.log` output.

```js
async function run(client) {
  const page = await client.payments.list({ page_size: 10 });
  return page.items.map((payment) => ({ id: payment.payment_id, status: payment.status }));
}
```

Each `execute` call runs in a new, isolated sandbox. The `execute` tool can create, change, refund, and delete data in your business. Approve only the permissions that you need.

## Manage connections

To see or revoke your connections, open the Dodo Payments dashboard and go to **Settings → Connected Apps**. A revoked connection stops working. To use the client again, connect again.

Your client never gets an API key. The server does not send your sign-in token to the Dodo Payments API. To call the API, the `execute` tool exchanges your sign-in token for a short-lived API token in the mode of the session.

## Older connections with an API key

Before the Dodo Payments sign-in, this server asked for an API key. Existing connections that use an API key continue to work. The `{{origin}}/sse` URL still uses the API-key sign-in. For a new connection, use `{{origin}}/mcp` and sign in with your Dodo Payments account.

## Troubleshooting

- **The client asks for an API key.** The client uses the `/sse` URL, or it kept an old sign-in. Remove the server from the client. Then add it again with the URL `{{origin}}/mcp`.
- **"This connection has access to test mode and live mode. Send the Dodo-Mode header with test or live."** Add the `Dodo-Mode` header, or connect again and select one mode.
- **"This connection has access to test mode only."** (or live mode only) The `Dodo-Mode` header names the other mode. Remove the header, or set it to the mode of the connection.
- **"The session belongs to a different connection."** The mode or the connection changed during a session. Start a new session, for example restart the client.
- **"Dodo Payments refused this connection"** The connection was revoked, or MCP access is off for this mode. Connect again.

## Learn more

- [Dodo Payments MCP Server documentation](https://docs.dodopayments.com/developer-resources/mcp-server)
- [Introduction to MCP](https://modelcontextprotocol.io/introduction)
