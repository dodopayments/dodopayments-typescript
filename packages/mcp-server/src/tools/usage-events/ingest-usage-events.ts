// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { isJqError, maybeFilter } from 'dodopayments-mcp/filtering';
import { Metadata, asErrorResult, asTextContentResult } from 'dodopayments-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import DodoPayments from 'dodopayments';

export const metadata: Metadata = {
  resource: 'usage_events',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/events/ingest',
  operationId: 'ingest_events',
};

export const tool: Tool = {
  name: 'ingest_usage_events',
  description:
    'When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you\'re sure you don\'t need the data.\n\nThis endpoint allows you to ingest custom events that can be used for:\n- Usage-based billing and metering\n- Analytics and reporting\n- Customer behavior tracking\n\n## Important Notes:\n- **Duplicate Prevention**:\n  - Duplicate `event_id` values within the same request are rejected (entire request fails)\n  - Subsequent requests with existing `event_id` values are ignored (idempotent behavior)\n- **Rate Limiting**: Maximum 1000 events per request\n- **Time Validation**: Events with timestamps older than 1 hour or more than 5 minutes in the future will be rejected\n- **Metadata Limits**: Maximum 50 key-value pairs per event, keys max 100 chars, values max 500 chars\n\n## Example Usage:\n```json\n{\n  "events": [\n    {\n      "event_id": "api_call_12345",\n      "customer_id": "cus_abc123",\n      "event_name": "api_request",\n      "timestamp": "2024-01-15T10:30:00Z",\n      "metadata": {\n        "endpoint": "/api/v1/users",\n        "method": "GET",\n        "tokens_used": "150"\n      }\n    }\n  ]\n}\n```\n\n# Response Schema\n```json\n{\n  $ref: \'#/$defs/usage_event_ingest_response\',\n  $defs: {\n    usage_event_ingest_response: {\n      type: \'object\',\n      properties: {\n        ingested_count: {\n          type: \'integer\'\n        }\n      },\n      required: [        \'ingested_count\'\n      ]\n    }\n  }\n}\n```',
  inputSchema: {
    type: 'object',
    properties: {
      events: {
        type: 'array',
        description: 'List of events to be pushed',
        items: {
          $ref: '#/$defs/event_input',
        },
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['events'],
    $defs: {
      event_input: {
        type: 'object',
        properties: {
          customer_id: {
            type: 'string',
            description: 'customer_id of the customer whose usage needs to be tracked',
          },
          event_id: {
            type: 'string',
            description:
              'Event Id acts as an idempotency key. Any subsequent requests with the same event_id will be ignored',
          },
          event_name: {
            type: 'string',
            description: 'Name of the event',
          },
          metadata: {
            type: 'object',
            title: 'EventMetadata',
            description:
              'Custom metadata. Only key value pairs are accepted, objects or arrays submitted will be rejected.',
            additionalProperties: true,
          },
          timestamp: {
            type: 'string',
            description:
              'Custom Timestamp. Defaults to current timestamp in UTC.\nTimestamps that are older that 1 hour or after 5 mins, from current timestamp, will be rejected.',
            format: 'date-time',
          },
        },
        required: ['customer_id', 'event_id', 'event_name'],
      },
    },
  },
  annotations: {},
};

export const handler = async (client: DodoPayments, args: Record<string, unknown> | undefined) => {
  const { jq_filter, ...body } = args as any;
  try {
    return asTextContentResult(await maybeFilter(jq_filter, await client.usageEvents.ingest(body)));
  } catch (error) {
    if (isJqError(error)) {
      return asErrorResult(error.message);
    }
    throw error;
  }
};

export default { metadata, tool, handler };
