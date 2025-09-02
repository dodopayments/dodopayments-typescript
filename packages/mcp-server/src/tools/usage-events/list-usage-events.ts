// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from 'dodopayments-mcp/filtering';
import { Metadata, asTextContentResult } from 'dodopayments-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import DodoPayments from 'dodopayments';

export const metadata: Metadata = {
  resource: 'usage_events',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/events',
  operationId: 'get_events',
};

export const tool: Tool = {
  name: 'list_usage_events',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nFetch events from your account with powerful filtering capabilities. This endpoint is ideal for:\n- Debugging event ingestion issues\n- Analyzing customer usage patterns\n- Building custom analytics dashboards\n- Auditing billing-related events\n\n## Filtering Options:\n- **Customer filtering**: Filter by specific customer ID\n- **Event name filtering**: Filter by event type/name\n- **Meter-based filtering**: Use a meter ID to apply the meter's event name and filter criteria automatically\n- **Time range filtering**: Filter events within a specific date range\n- **Pagination**: Navigate through large result sets\n\n## Meter Integration:\nWhen using `meter_id`, the endpoint automatically applies:\n- The meter's configured `event_name` filter\n- The meter's custom filter criteria (if any)\n- If you also provide `event_name`, it must match the meter's event name\n\n## Example Queries:\n- Get all events for a customer: `?customer_id=cus_abc123`\n- Get API request events: `?event_name=api_request`\n- Get events from last 24 hours: `?start=2024-01-14T10:30:00Z&end=2024-01-15T10:30:00Z`\n- Get events with meter filtering: `?meter_id=mtr_xyz789`\n- Paginate results: `?page_size=50&page_number=2`\n\n# Response Schema\n```json\n{\n  type: 'object',\n  properties: {\n    items: {\n      type: 'array',\n      items: {\n        $ref: '#/$defs/event'\n      }\n    }\n  },\n  required: [    'items'\n  ],\n  $defs: {\n    event: {\n      type: 'object',\n      properties: {\n        business_id: {\n          type: 'string'\n        },\n        customer_id: {\n          type: 'string'\n        },\n        event_id: {\n          type: 'string'\n        },\n        event_name: {\n          type: 'string'\n        },\n        timestamp: {\n          type: 'string',\n          format: 'date-time'\n        },\n        metadata: {\n          type: 'object',\n          title: 'EventMetadata',\n          description: 'Arbitrary key-value metadata. Values can be string, integer, number, or boolean.',\n          additionalProperties: true\n        }\n      },\n      required: [        'business_id',\n        'customer_id',\n        'event_id',\n        'event_name',\n        'timestamp'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      customer_id: {
        type: 'string',
        description: 'Filter events by customer ID',
      },
      end: {
        type: 'string',
        description: 'Filter events created before this timestamp',
        format: 'date-time',
      },
      event_name: {
        type: 'string',
        description:
          "Filter events by event name. If both event_name and meter_id are provided, they must match the meter's configured event_name",
      },
      meter_id: {
        type: 'string',
        description:
          "Filter events by meter ID. When provided, only events that match the meter's event_name and filter criteria will be returned",
      },
      page_number: {
        type: 'integer',
        description: 'Page number (0-based, default: 0)',
      },
      page_size: {
        type: 'integer',
        description: 'Number of events to return per page (default: 10)',
      },
      start: {
        type: 'string',
        description: 'Filter events created after this timestamp',
        format: 'date-time',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: [],
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (client: DodoPayments, args: Record<string, unknown> | undefined) => {
  const { jq_filter, ...body } = args as any;
  const response = await client.usageEvents.list(body).asResponse();
  return asTextContentResult(await maybeFilter(jq_filter, await response.json()));
};

export default { metadata, tool, handler };
