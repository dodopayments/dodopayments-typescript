// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'dodopayments-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import DodoPayments from 'dodopayments';

export const metadata: Metadata = {
  resource: 'subscriptions',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/subscriptions/{subscription_id}/change-plan',
  operationId: 'update_subscription_plan_handler',
};

export const tool: Tool = {
  name: 'change_plan_subscriptions',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\n\n\n# Response Schema\n```json\n{\n  type: 'object',\n  properties: {}\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      subscription_id: {
        type: 'string',
      },
      product_id: {
        type: 'string',
        description: 'Unique identifier of the product to subscribe to',
      },
      proration_billing_mode: {
        type: 'string',
        description: 'Proration Billing Mode',
        enum: ['prorated_immediately', 'full_immediately'],
      },
      quantity: {
        type: 'integer',
        description: 'Number of units to subscribe for. Must be at least 1.',
      },
      addons: {
        type: 'array',
        description: 'Addons for the new plan.\nNote : Leaving this empty would remove any existing addons',
        items: {
          $ref: '#/$defs/attach_addon',
        },
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['subscription_id', 'product_id', 'proration_billing_mode', 'quantity'],
    $defs: {
      attach_addon: {
        type: 'object',
        properties: {
          addon_id: {
            type: 'string',
          },
          quantity: {
            type: 'integer',
          },
        },
        required: ['addon_id', 'quantity'],
      },
    },
  },
  annotations: {},
};

export const handler = async (client: DodoPayments, args: Record<string, unknown> | undefined) => {
  const { subscription_id, ...body } = args as any;
  const response = await client.subscriptions.changePlan(subscription_id, body).asResponse();
  return asTextContentResult(await response.text());
};

export default { metadata, tool, handler };
