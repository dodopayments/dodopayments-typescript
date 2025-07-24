// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from 'dodopayments-mcp/filtering';
import { Metadata, asTextContentResult } from 'dodopayments-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import DodoPayments from 'dodopayments';

export const metadata: Metadata = {
  resource: 'webhook_events',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/webhook_events/{webhook_event_id}',
  operationId: 'get_webhook_event',
};

export const tool: Tool = {
  name: 'retrieve_webhook_events',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\n\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/webhook_event',\n  $defs: {\n    webhook_event: {\n      type: 'object',\n      properties: {\n        business_id: {\n          type: 'string'\n        },\n        created_at: {\n          type: 'string',\n          format: 'date-time'\n        },\n        event_id: {\n          type: 'string'\n        },\n        event_type: {\n          type: 'string'\n        },\n        object_id: {\n          type: 'string'\n        },\n        latest_attempted_at: {\n          type: 'string',\n          format: 'date-time'\n        },\n        request: {\n          type: 'string'\n        },\n        response: {\n          type: 'string'\n        }\n      },\n      required: [        'business_id',\n        'created_at',\n        'event_id',\n        'event_type',\n        'object_id'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      webhook_event_id: {
        type: 'string',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['webhook_event_id'],
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (client: DodoPayments, args: Record<string, unknown> | undefined) => {
  const { webhook_event_id, ...body } = args as any;
  return asTextContentResult(await maybeFilter(args, await client.webhookEvents.retrieve(webhook_event_id)));
};

export default { metadata, tool, handler };
