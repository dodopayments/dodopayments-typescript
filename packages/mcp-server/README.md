# Dodo Payments Node MCP Server

It is generated with [Stainless](https://www.stainless.com/).

## Installation

### Direct invocation

You can run the MCP Server directly via `npx`:

```sh
export DODO_PAYMENTS_API_KEY="My Bearer Token"
npx -y dodopayments-mcp
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
        "DODO_PAYMENTS_API_KEY": "My Bearer Token"
      }
    }
  }
}
```

## Filtering tools

You can run the package on the command line to discover and filter the set of tools that are exposed by the
MCP Server. This can be helpful for large APIs where including all endpoints at once is too much for your AI's
context window.

You can filter by multiple aspects:

- `--tool` includes a specific tool by name
- `--resource` includes all tools under a specific resource, and can have wildcards, e.g. `my.resource*`
- `--operation` includes just read (get/list) or just write operations

See more information with `--help`.

All of these command-line options can be repeated, combined together, and have corresponding exclusion versions (e.g. `--no-tool`).

Use `--list` to see the list of available tools, or see below.

## Importing the tools and server individually

```js
// Import the server, generated endpoints, or the init function
import { server, endpoints, init } from "dodopayments-mcp/server";

// import a specific tool
import createPayments from "dodopayments-mcp/tools/payments/create-payments";

// initialize the server and all endpoints
init({ server, endpoints });

// manually start server
const transport = new StdioServerTransport();
await server.connect(transport);

// or initialize your own server with specific tools
const myServer = new McpServer(...);

// define your own endpoint
const myCustomEndpoint = {
  tool: {
    name: 'my_custom_tool',
    description: 'My custom tool',
    inputSchema: zodToJsonSchema(z.object({ a_property: z.string() })),
  },
  handler: async (client: client, args: any) => {
    return { myResponse: 'Hello world!' };
  })
};

// initialize the server with your custom endpoints
init({ server: myServer, endpoints: [createPayments, myCustomEndpoint] });
```

## Available Tools

The following tools are available in this MCP server.

### Resource `payments`:

- `create_payments` (`write`):
- `retrieve_payments` (`read`):
- `list_payments` (`read`):

### Resource `subscriptions`:

- `create_subscriptions` (`write`):
- `retrieve_subscriptions` (`read`):
- `update_subscriptions` (`write`):
- `list_subscriptions` (`read`):
- `change_plan_subscriptions` (`write`):
- `charge_subscriptions` (`write`):

### Resource `invoices.payments`:

- `retrieve_invoices_payments` (`read`):

### Resource `licenses`:

- `activate_licenses` (`write`):
- `deactivate_licenses` (`write`):
- `validate_licenses` (`write`):

### Resource `license_keys`:

- `retrieve_license_keys` (`read`):
- `update_license_keys` (`write`):
- `list_license_keys` (`read`):

### Resource `license_key_instances`:

- `retrieve_license_key_instances` (`read`):
- `update_license_key_instances` (`write`):
- `list_license_key_instances` (`read`):

### Resource `customers`:

- `create_customers` (`write`):
- `retrieve_customers` (`read`):
- `update_customers` (`write`):
- `list_customers` (`read`):

### Resource `customers.customer_portal`:

- `create_customers_customer_portal` (`write`):

### Resource `refunds`:

- `create_refunds` (`write`):
- `retrieve_refunds` (`read`):
- `list_refunds` (`read`):

### Resource `disputes`:

- `retrieve_disputes` (`read`):
- `list_disputes` (`read`):

### Resource `payouts`:

- `list_payouts` (`read`):

### Resource `webhook_events`:

- `retrieve_webhook_events` (`read`):
- `list_webhook_events` (`read`):

### Resource `products`:

- `create_products` (`write`):
- `retrieve_products` (`read`):
- `update_products` (`write`):
- `list_products` (`read`):
- `delete_products` (`write`):
- `unarchive_products` (`write`):

### Resource `products.images`:

- `update_products_images` (`write`):

### Resource `misc`:

- `list_supported_countries_misc` (`read`):

### Resource `discounts`:

- `create_discounts` (`write`): If `code` is omitted or empty, a random 16-char uppercase code is generated.
- `retrieve_discounts` (`read`): GET /discounts/{discount_id}
- `update_discounts` (`write`): PATCH /discounts/{discount_id}
- `list_discounts` (`read`): GET /discounts
- `delete_discounts` (`write`): DELETE /discounts/{discount_id}
