# Dodo Payments TypeScript MCP Server

## Installation

### Direct invocation

You can run the MCP Server directly via `npx`:

```sh
export DODO_PAYMENTS_API_KEY="My Bearer Token"
export DODO_PAYMENTS_WEBHOOK_KEY="My Webhook Key"
export DODO_PAYMENTS_ENVIRONMENT="live_mode"
npx -y dodopayments-mcp@latest
```

### Via MCP Client

There is a partial list of existing clients at [modelcontextprotocol.io](https://modelcontextprotocol.io/clients). If you already
have a client, consult their documentation to install the MCP server.

For clients with a configuration JSON, it might look something like this:

```json
{
  "mcpServers": {
    "dodopayments_api": {
      "command": "npx",
      "args": ["-y", "dodopayments-mcp"],
      "env": {
        "DODO_PAYMENTS_API_KEY": "My Bearer Token",
        "DODO_PAYMENTS_WEBHOOK_KEY": "My Webhook Key",
        "DODO_PAYMENTS_ENVIRONMENT": "live_mode"
      }
    }
  }
}
```

### Cursor

If you use Cursor, you can install the MCP server by using the button below. You will need to set your environment variables
in Cursor's `mcp.json`, which can be found in Cursor Settings > Tools & MCP > New MCP Server.

[![Add to Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/en-US/install-mcp?name=dodopayments-mcp&config=eyJjb21tYW5kIjoibnB4IiwiYXJncyI6WyIteSIsImRvZG9wYXltZW50cy1tY3AiXSwiZW52Ijp7IkRPRE9fUEFZTUVOVFNfQVBJX0tFWSI6Ik15IEJlYXJlciBUb2tlbiIsIkRPRE9fUEFZTUVOVFNfV0VCSE9PS19LRVkiOiJNeSBXZWJob29rIEtleSJ9fQ)

### VS Code

If you use MCP, you can install the MCP server by clicking the link below. You will need to set your environment variables
in VS Code's `mcp.json`, which can be found via Command Palette > MCP: Open User Configuration.

[Open VS Code](https://vscode.stainless.com/mcp/%7B%22name%22%3A%22dodopayments-mcp%22%2C%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22dodopayments-mcp%22%5D%2C%22env%22%3A%7B%22DODO_PAYMENTS_API_KEY%22%3A%22My%20Bearer%20Token%22%2C%22DODO_PAYMENTS_WEBHOOK_KEY%22%3A%22My%20Webhook%20Key%22%7D%7D)

### Claude Code

If you use Claude Code, you can install the MCP server by running the command below in your terminal. You will need to set your
environment variables in Claude Code's `.claude.json`, which can be found in your home directory.

```
claude mcp add dodopayments_mcp_api --env DODO_PAYMENTS_API_KEY="My Bearer Token" DODO_PAYMENTS_WEBHOOK_KEY="My Webhook Key" -- npx -y dodopayments-mcp
```

## Code Mode

This MCP server is built on the "Code Mode" tool scheme. In this MCP Server,
your agent will write code against the TypeScript SDK, which will then be executed in an
isolated sandbox. To accomplish this, the server will expose two tools to your agent:

- The first tool is a docs search tool, which can be used to generically query for
  documentation about your API/SDK.

- The second tool is a code tool, where the agent can write code against the TypeScript SDK.
  The code will be executed in a sandbox environment without web or filesystem access. Then,
  anything the code returns or prints will be returned to the agent as the result of the
  tool call.

Using this scheme, agents are capable of performing very complex tasks deterministically
and repeatably.

### Requirements for the code tool

The `execute` tool runs your code in a local [Deno](https://deno.land) sandbox, so Deno must be
available. The server looks for it in this order:

1. A `deno` binary on your `PATH`.
2. A `deno` binary from the [`deno` npm package](https://www.npmjs.com/package/deno), when it is
   installed into the same `node_modules` tree as this package.

If neither is found, the `execute` tool returns an error while every other tool, including
documentation search, keeps working.

> [!NOTE]
> Step 2 does not apply when you launch the server with `npx` or install it globally, because the
> server then resolves from its own cache directory rather than from your project. Since
> `npx -y dodopayments-mcp` is the most common way to run it, installing Deno on your `PATH` is the
> recommended setup.

> [!WARNING]
> Use **Deno 2.8 or earlier** for now. On Deno 2.9+ the sandbox fails to start, because binding the
> worker's Unix socket began requiring `--allow-net` permission for that socket, which the worker
> does not grant. Note that `npm install deno` currently installs an affected version. Tracked in
> [#330](https://github.com/dodopayments/dodopayments-typescript/issues/330).

> [!IMPORTANT]
> Local code execution is supported on **macOS and Linux only**. It does not work on Windows,
> because the sandbox communicates with the Deno subprocess over a Unix domain socket and Deno
> cannot listen on one when running on Windows (see
> [denoland/deno#18236](https://github.com/denoland/deno/issues/18236)). Installing Deno does not
> change this. On Windows, run the server under WSL2, or call the REST API or the `dodopayments`
> SDK directly.

## Running remotely

Launching the client with `--transport=http` launches the server as a remote server using Streamable HTTP transport. The `--port` setting can choose the port it will run on, and the `--socket` setting allows it to run on a Unix socket.

Authorization can be provided via the `Authorization` header using the Bearer scheme.

Additionally, authorization can be provided via the following headers:
| Header | Equivalent client option | Security scheme |
| ------------------------- | ------------------------ | --------------- |
| `x-dodo-payments-api-key` | `bearerToken` | API_KEY |

A configuration JSON for this server might look like this, assuming the server is hosted at `http://localhost:3000`:

```json
{
  "mcpServers": {
    "dodopayments_api": {
      "url": "http://localhost:3000",
      "headers": {
        "Authorization": "Bearer <auth value>"
      }
    }
  }
}
```
