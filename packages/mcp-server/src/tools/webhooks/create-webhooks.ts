// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from 'dodopayments-mcp/filtering';
import { Metadata, asTextContentResult } from 'dodopayments-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import DodoPayments from 'dodopayments';

export const metadata: Metadata = {
  resource: 'webhooks',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/webhooks',
  operationId: 'create_webhook',
};

export const tool: Tool = {
  name: 'create_webhooks',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nCreate a new webhook\n\n# Response Schema\n```json\n{\n  type: 'object',\n  properties: {\n    id: {\n      type: 'string',\n      description: 'The webhook\\'s ID.'\n    },\n    created_at: {\n      type: 'string',\n      description: 'Created at timestamp'\n    },\n    description: {\n      type: 'string',\n      description: 'An example webhook name.'\n    },\n    metadata: {\n      type: 'object',\n      description: 'Metadata of the webhook'\n    },\n    updated_at: {\n      type: 'string',\n      description: 'Updated at timestamp'\n    },\n    url: {\n      type: 'string',\n      description: 'Url endpoint of the webhook'\n    },\n    disabled: {\n      type: 'boolean',\n      description: 'Status of the webhook.\\n\\nIf true, events are not sent'\n    },\n    filter_types: {\n      type: 'array',\n      description: 'Filter events to the webhook.\\n\\nWebhook event will only be sent for events in the list.',\n      items: {\n        type: 'string'\n      }\n    },\n    rate_limit: {\n      type: 'integer',\n      description: 'Configured rate limit'\n    }\n  },\n  required: [    'id',\n    'created_at',\n    'description',\n    'metadata',\n    'updated_at',\n    'url'\n  ]\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      url: {
        type: 'string',
        description: 'Url of the webhook',
      },
      description: {
        type: 'string',
        description:
          'Filter events to the webhook.\n\nWebhook event will only be sent for events in the list.',
      },
      disabled: {
        type: 'boolean',
        description: 'Create the webhook in a disabled state.\n\nDefault is false',
      },
      filter_types: {
        type: 'array',
        items: {
          $ref: '#/$defs/webhook_event_type',
        },
      },
      headers: {
        type: 'object',
        description: 'Custom headers to be passed',
      },
      idempotency_key: {
        type: 'string',
        description: "The request's idempotency key",
      },
      metadata: {
        type: 'object',
        description: 'Metadata to be passed to the webhook\nDefaut is {}',
      },
      rate_limit: {
        type: 'integer',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['url'],
    $defs: {
      webhook_event_type: {
        type: 'string',
        description: 'Event types for Dodo events',
        enum: [
          'payment.succeeded',
          'payment.failed',
          'payment.processing',
          'payment.cancelled',
          'refund.succeeded',
          'refund.failed',
          'dispute.opened',
          'dispute.expired',
          'dispute.accepted',
          'dispute.cancelled',
          'dispute.challenged',
          'dispute.won',
          'dispute.lost',
          'subscription.active',
          'subscription.renewed',
          'subscription.on_hold',
          'subscription.cancelled',
          'subscription.failed',
          'subscription.expired',
          'subscription.plan_changed',
          'license_key.created',
        ],
      },
    },
  },
  annotations: {},
};

export const handler = async (client: DodoPayments, args: Record<string, unknown> | undefined) => {
  const { jq_filter, ...body } = args as any;
  return asTextContentResult(await maybeFilter(jq_filter, await client.webhooks.create(body)));
};

export default { metadata, tool, handler };
