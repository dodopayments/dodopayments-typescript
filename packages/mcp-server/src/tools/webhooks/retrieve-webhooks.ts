// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from 'dodopayments-mcp/filtering';
import { Metadata, asTextContentResult } from 'dodopayments-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import DodoPayments from 'dodopayments';

export const metadata: Metadata = {
  resource: 'webhooks',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/webhooks/{webhook_id}',
  operationId: 'get_webhook',
};

export const tool: Tool = {
  name: 'retrieve_webhooks',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nGet a webhook by id\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/webhook_details',\n  $defs: {\n    webhook_details: {\n      type: 'object',\n      title: 'Webhook Details',\n      properties: {\n        id: {\n          type: 'string',\n          description: 'The webhook\\'s ID.'\n        },\n        created_at: {\n          type: 'string',\n          description: 'Created at timestamp'\n        },\n        description: {\n          type: 'string',\n          description: 'An example webhook name.'\n        },\n        metadata: {\n          type: 'object',\n          description: 'Metadata of the webhook',\n          additionalProperties: true\n        },\n        updated_at: {\n          type: 'string',\n          description: 'Updated at timestamp'\n        },\n        url: {\n          type: 'string',\n          description: 'Url endpoint of the webhook'\n        },\n        disabled: {\n          type: 'boolean',\n          description: 'Status of the webhook.\\n\\nIf true, events are not sent'\n        },\n        filter_types: {\n          type: 'array',\n          description: 'Filter events to the webhook.\\n\\nWebhook event will only be sent for events in the list.',\n          items: {\n            type: 'string'\n          }\n        },\n        rate_limit: {\n          type: 'integer',\n          description: 'Configured rate limit'\n        }\n      },\n      required: [        'id',\n        'created_at',\n        'description',\n        'metadata',\n        'updated_at',\n        'url'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      webhook_id: {
        type: 'string',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['webhook_id'],
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (client: DodoPayments, args: Record<string, unknown> | undefined) => {
  const { webhook_id, jq_filter, ...body } = args as any;
  return asTextContentResult(await maybeFilter(jq_filter, await client.webhooks.retrieve(webhook_id)));
};

export default { metadata, tool, handler };
