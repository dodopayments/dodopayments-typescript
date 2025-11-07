# Dodo Payments TypeScript MCP Server

It is generated with [Stainless](https://www.stainless.com/).

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
      "args": ["-y", "dodopayments-mcp", "--client=claude", "--tools=dynamic"],
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

[![Add to Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/en-US/install-mcp?name=dodopayments-mcp&config=eyJjb21tYW5kIjoibnB4IiwiYXJncyI6WyIteSIsImRvZG9wYXltZW50cy1tY3AiXSwiZW52Ijp7IkRPRE9fUEFZTUVOVFNfQVBJX0tFWSI6IlNldCB5b3VyIERPRE9fUEFZTUVOVFNfQVBJX0tFWSBoZXJlLiIsIkRPRE9fUEFZTUVOVFNfV0VCSE9PS19LRVkiOiJTZXQgeW91ciBET0RPX1BBWU1FTlRTX1dFQkhPT0tfS0VZIGhlcmUuIn19)

### VS Code

If you use MCP, you can install the MCP server by clicking the link below. You will need to set your environment variables
in VS Code's `mcp.json`, which can be found via Command Palette > MCP: Open User Configuration.

[Open VS Code](https://vscode.stainless.com/mcp/%7B%22name%22%3A%22dodopayments-mcp%22%2C%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22dodopayments-mcp%22%5D%2C%22env%22%3A%7B%22DODO_PAYMENTS_API_KEY%22%3A%22Set%20your%20DODO_PAYMENTS_API_KEY%20here.%22%2C%22DODO_PAYMENTS_WEBHOOK_KEY%22%3A%22Set%20your%20DODO_PAYMENTS_WEBHOOK_KEY%20here.%22%7D%7D)

### Claude Code

If you use Claude Code, you can install the MCP server by running the command below in your terminal. You will need to set your
environment variables in Claude Code's `.claude.json`, which can be found in your home directory.

```
claude mcp add --transport stdio dodopayments_api --env DODO_PAYMENTS_API_KEY="Your DODO_PAYMENTS_API_KEY here." DODO_PAYMENTS_WEBHOOK_KEY="Your DODO_PAYMENTS_WEBHOOK_KEY here." -- npx -y dodopayments-mcp
```

## Exposing endpoints to your MCP Client

There are three ways to expose endpoints as tools in the MCP server:

1. Exposing one tool per endpoint, and filtering as necessary
2. Exposing a set of tools to dynamically discover and invoke endpoints from the API
3. Exposing a docs search tool and a code execution tool, allowing the client to write code to be executed against the TypeScript client

### Filtering endpoints and tools

You can run the package on the command line to discover and filter the set of tools that are exposed by the
MCP Server. This can be helpful for large APIs where including all endpoints at once is too much for your AI's
context window.

You can filter by multiple aspects:

- `--tool` includes a specific tool by name
- `--resource` includes all tools under a specific resource, and can have wildcards, e.g. `my.resource*`
- `--operation` includes just read (get/list) or just write operations

### Dynamic tools

If you specify `--tools=dynamic` to the MCP server, instead of exposing one tool per endpoint in the API, it will
expose the following tools:

1. `list_api_endpoints` - Discovers available endpoints, with optional filtering by search query
2. `get_api_endpoint_schema` - Gets detailed schema information for a specific endpoint
3. `invoke_api_endpoint` - Executes any endpoint with the appropriate parameters

This allows you to have the full set of API endpoints available to your MCP Client, while not requiring that all
of their schemas be loaded into context at once. Instead, the LLM will automatically use these tools together to
search for, look up, and invoke endpoints dynamically. However, due to the indirect nature of the schemas, it
can struggle to provide the correct properties a bit more than when tools are imported explicitly. Therefore,
you can opt-in to explicit tools, the dynamic tools, or both.

See more information with `--help`.

All of these command-line options can be repeated, combined together, and have corresponding exclusion versions (e.g. `--no-tool`).

Use `--list` to see the list of available tools, or see below.

### Code execution

If you specify `--tools=code` to the MCP server, it will expose just two tools:

- `search_docs` - Searches the API documentation and returns a list of markdown results
- `execute` - Runs code against the TypeScript client

This allows the LLM to implement more complex logic by chaining together many API calls without loading
intermediary results into its context window.

The code execution itself happens in a Deno sandbox that has network access only to the base URL for the API.

### Specifying the MCP Client

Different clients have varying abilities to handle arbitrary tools and schemas.

You can specify the client you are using with the `--client` argument, and the MCP server will automatically
serve tools and schemas that are more compatible with that client.

- `--client=<type>`: Set all capabilities based on a known MCP client

  - Valid values: `openai-agents`, `claude`, `claude-code`, `cursor`
  - Example: `--client=cursor`

Additionally, if you have a client not on the above list, or the client has gotten better
over time, you can manually enable or disable certain capabilities:

- `--capability=<name>`: Specify individual client capabilities
  - Available capabilities:
    - `top-level-unions`: Enable support for top-level unions in tool schemas
    - `valid-json`: Enable JSON string parsing for arguments
    - `refs`: Enable support for $ref pointers in schemas
    - `unions`: Enable support for union types (anyOf) in schemas
    - `formats`: Enable support for format validations in schemas (e.g. date-time, email)
    - `tool-name-length=N`: Set maximum tool name length to N characters
  - Example: `--capability=top-level-unions --capability=tool-name-length=40`
  - Example: `--capability=top-level-unions,tool-name-length=40`

### Examples

1. Filter for read operations on cards:

```bash
--resource=cards --operation=read
```

2. Exclude specific tools while including others:

```bash
--resource=cards --no-tool=create_cards
```

3. Configure for Cursor client with custom max tool name length:

```bash
--client=cursor --capability=tool-name-length=40
```

4. Complex filtering with multiple criteria:

```bash
--resource=cards,accounts --operation=read --tag=kyc --no-tool=create_cards
```

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

The command-line arguments for filtering tools and specifying clients can also be used as query parameters in the URL.
For example, to exclude specific tools while including others, use the URL:

```
http://localhost:3000?resource=cards&resource=accounts&no_tool=create_cards
```

Or, to configure for the Cursor client, with a custom max tool name length, use the URL:

```
http://localhost:3000?client=cursor&capability=tool-name-length%3D40
```

## Importing the tools and server individually

```js
// Import the server, generated endpoints, or the init function
import { server, endpoints, init } from "dodopayments-mcp/server";

// import a specific tool
import createCheckoutSessions from "dodopayments-mcp/tools/checkout-sessions/create-checkout-sessions";

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
init({ server: myServer, endpoints: [createCheckoutSessions, myCustomEndpoint] });
```

## Available Tools

The following tools are available in this MCP server.

### Resource `checkout_sessions`:

- `create_checkout_sessions` (`write`):
- `retrieve_checkout_sessions` (`read`):

### Resource `payments`:

- `create_payments` (`write`):
- `retrieve_payments` (`read`):
- `list_payments` (`read`):
- `retrieve_line_items_payments` (`read`):

### Resource `subscriptions`:

- `create_subscriptions` (`write`):
- `retrieve_subscriptions` (`read`):
- `update_subscriptions` (`write`):
- `list_subscriptions` (`read`):
- `change_plan_subscriptions` (`write`):
- `charge_subscriptions` (`write`):
- `retrieve_usage_history_subscriptions` (`read`): Get detailed usage history for a subscription that includes usage-based billing (metered components).
  This endpoint provides insights into customer usage patterns and billing calculations over time.

  ## What You'll Get:

  - **Billing periods**: Each item represents a billing cycle with start and end dates
  - **Meter usage**: Detailed breakdown of usage for each meter configured on the subscription
  - **Usage calculations**: Total units consumed, free threshold units, and chargeable units
  - **Historical tracking**: Complete audit trail of usage-based charges

  ## Use Cases:

  - **Customer support**: Investigate billing questions and usage discrepancies
  - **Usage analytics**: Analyze customer consumption patterns over time
  - **Billing transparency**: Provide customers with detailed usage breakdowns
  - **Revenue optimization**: Identify usage trends to optimize pricing strategies

  ## Filtering Options:

  - **Date range filtering**: Get usage history for specific time periods
  - **Meter-specific filtering**: Focus on usage for a particular meter
  - **Pagination**: Navigate through large usage histories efficiently

  ## Important Notes:

  - Only returns data for subscriptions with usage-based (metered) components
  - Usage history is organized by billing periods (subscription cycles)
  - Free threshold units are calculated and displayed separately from chargeable units
  - Historical data is preserved even if meter configurations change

  ## Example Query Patterns:

  - Get last 3 months: `?start_date=2024-01-01T00:00:00Z&end_date=2024-03-31T23:59:59Z`
  - Filter by meter: `?meter_id=mtr_api_requests`
  - Paginate results: `?page_size=20&page_number=1`
  - Recent usage: `?start_date=2024-03-01T00:00:00Z` (from March 1st to now)

### Resource `invoices.payments`:

- `retrieve_invoices_payments` (`read`):
- `retrieve_refund_invoices_payments` (`read`):

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

### Resource `customers.wallets`:

- `list_customers_wallets` (`read`):

### Resource `customers.wallets.ledger_entries`:

- `create_wallets_customers_ledger_entries` (`write`):
- `list_wallets_customers_ledger_entries` (`read`):

### Resource `refunds`:

- `create_refunds` (`write`):
- `retrieve_refunds` (`read`):
- `list_refunds` (`read`):

### Resource `disputes`:

- `retrieve_disputes` (`read`):
- `list_disputes` (`read`):

### Resource `payouts`:

- `list_payouts` (`read`):

### Resource `products`:

- `create_products` (`write`):
- `retrieve_products` (`read`):
- `update_products` (`write`):
- `list_products` (`read`):
- `archive_products` (`write`):
- `unarchive_products` (`write`):
- `update_files_products` (`write`):

### Resource `products.images`:

- `update_products_images` (`write`):

### Resource `misc`:

- `list_supported_countries_misc` (`read`):

### Resource `discounts`:

- `create_discounts` (`write`): POST /discounts
  If `code` is omitted or empty, a random 16-char uppercase code is generated.
- `retrieve_discounts` (`read`): GET /discounts/{discount_id}
- `update_discounts` (`write`): PATCH /discounts/{discount_id}
- `list_discounts` (`read`): GET /discounts
- `delete_discounts` (`write`): DELETE /discounts/{discount_id}

### Resource `addons`:

- `create_addons` (`write`):
- `retrieve_addons` (`read`):
- `update_addons` (`write`):
- `list_addons` (`read`):
- `update_images_addons` (`write`):

### Resource `brands`:

- `create_brands` (`write`):
- `retrieve_brands` (`read`): Thin handler just calls `get_brand` and wraps in `Json(...)`
- `update_brands` (`write`):
- `list_brands` (`read`):
- `update_images_brands` (`write`):

### Resource `webhooks`:

- `create_webhooks` (`write`): Create a new webhook
- `retrieve_webhooks` (`read`): Get a webhook by id
- `update_webhooks` (`write`): Patch a webhook by id
- `list_webhooks` (`read`): List all webhooks
- `delete_webhooks` (`write`): Delete a webhook by id
- `retrieve_secret_webhooks` (`read`): Get webhook secret by id

### Resource `webhooks.headers`:

- `retrieve_webhooks_headers` (`read`): Get a webhook by id
- `update_webhooks_headers` (`write`): Patch a webhook by id

### Resource `usage_events`:

- `retrieve_usage_events` (`read`): Fetch detailed information about a single event using its unique event ID. This endpoint is useful for:

  - Debugging specific event ingestion issues
  - Retrieving event details for customer support
  - Validating that events were processed correctly
  - Getting the complete metadata for an event

  ## Event ID Format:

  The event ID should be the same value that was provided during event ingestion via the `/events/ingest` endpoint.
  Event IDs are case-sensitive and must match exactly.

  ## Response Details:

  The response includes all event data including:

  - Complete metadata key-value pairs
  - Original timestamp (preserved from ingestion)
  - Customer and business association
  - Event name and processing information

  ## Example Usage:

  ```text
  GET /events/api_call_12345
  ```

- `list_usage_events` (`read`): Fetch events from your account with powerful filtering capabilities. This endpoint is ideal for:

  - Debugging event ingestion issues
  - Analyzing customer usage patterns
  - Building custom analytics dashboards
  - Auditing billing-related events

  ## Filtering Options:

  - **Customer filtering**: Filter by specific customer ID
  - **Event name filtering**: Filter by event type/name
  - **Meter-based filtering**: Use a meter ID to apply the meter's event name and filter criteria automatically
  - **Time range filtering**: Filter events within a specific date range
  - **Pagination**: Navigate through large result sets

  ## Meter Integration:

  When using `meter_id`, the endpoint automatically applies:

  - The meter's configured `event_name` filter
  - The meter's custom filter criteria (if any)
  - If you also provide `event_name`, it must match the meter's event name

  ## Example Queries:

  - Get all events for a customer: `?customer_id=cus_abc123`
  - Get API request events: `?event_name=api_request`
  - Get events from last 24 hours: `?start=2024-01-14T10:30:00Z&end=2024-01-15T10:30:00Z`
  - Get events with meter filtering: `?meter_id=mtr_xyz789`
  - Paginate results: `?page_size=50&page_number=2`

- `ingest_usage_events` (`write`): This endpoint allows you to ingest custom events that can be used for:

  - Usage-based billing and metering
  - Analytics and reporting
  - Customer behavior tracking

  ## Important Notes:

  - **Duplicate Prevention**:
    - Duplicate `event_id` values within the same request are rejected (entire request fails)
    - Subsequent requests with existing `event_id` values are ignored (idempotent behavior)
  - **Rate Limiting**: Maximum 1000 events per request
  - **Time Validation**: Events with timestamps older than 1 hour or more than 5 minutes in the future will be rejected
  - **Metadata Limits**: Maximum 50 key-value pairs per event, keys max 100 chars, values max 500 chars

  ## Example Usage:

  ```json
  {
    "events": [
      {
        "event_id": "api_call_12345",
        "customer_id": "cus_abc123",
        "event_name": "api_request",
        "timestamp": "2024-01-15T10:30:00Z",
        "metadata": {
          "endpoint": "/api/v1/users",
          "method": "GET",
          "tokens_used": "150"
        }
      }
    ]
  }
  ```

### Resource `meters`:

- `create_meters` (`write`):
- `retrieve_meters` (`read`):
- `list_meters` (`read`):
- `archive_meters` (`write`):
- `unarchive_meters` (`write`):
