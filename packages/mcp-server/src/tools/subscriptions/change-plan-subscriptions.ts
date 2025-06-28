// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { asTextContentResult } from 'dodopayments-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
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
  description: '',
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
  },
};

export const handler = async (client: DodoPayments, args: Record<string, unknown> | undefined) => {
  const { subscription_id, ...body } = args as any;
  const response = await client.subscriptions.changePlan(subscription_id, body).asResponse();
  return asTextContentResult(await response.text());
};

export default { metadata, tool, handler };
