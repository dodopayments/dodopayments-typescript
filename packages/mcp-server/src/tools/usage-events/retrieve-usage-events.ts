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
  httpPath: '/events/{event_id}',
  operationId: 'get_event_by_id',
};

export const tool: Tool = {
  name: 'retrieve_usage_events',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nFetch detailed information about a single event using its unique event ID. This endpoint is useful for:\n- Debugging specific event ingestion issues\n- Retrieving event details for customer support\n- Validating that events were processed correctly\n- Getting the complete metadata for an event\n\n## Event ID Format:\nThe event ID should be the same value that was provided during event ingestion via the `/events/ingest` endpoint.\nEvent IDs are case-sensitive and must match exactly.\n\n## Response Details:\nThe response includes all event data including:\n- Complete metadata key-value pairs\n- Original timestamp (preserved from ingestion)\n- Customer and business association\n- Event name and processing information\n\n## Example Usage:\n```text\nGET /events/api_call_12345\n```\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/event',\n  $defs: {\n    event: {\n      type: 'object',\n      properties: {\n        business_id: {\n          type: 'string'\n        },\n        customer_id: {\n          type: 'string'\n        },\n        event_id: {\n          type: 'string'\n        },\n        event_name: {\n          type: 'string'\n        },\n        timestamp: {\n          type: 'string',\n          format: 'date-time'\n        },\n        metadata: {\n          type: 'object',\n          title: 'EventMetadata',\n          description: 'Arbitrary key-value metadata. Values can be string, integer, number, or boolean.',\n          additionalProperties: true\n        }\n      },\n      required: [        'business_id',\n        'customer_id',\n        'event_id',\n        'event_name',\n        'timestamp'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      event_id: {
        type: 'string',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['event_id'],
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (client: DodoPayments, args: Record<string, unknown> | undefined) => {
  const { event_id, jq_filter, ...body } = args as any;
  return asTextContentResult(await maybeFilter(jq_filter, await client.usageEvents.retrieve(event_id)));
};

export default { metadata, tool, handler };
