// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import DodoPayments from 'dodopayments';

export const metadata: Metadata = {
  resource: 'subscriptions',
  operation: 'write',
  tags: [],
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
        enum: ['prorated_immediately'],
      },
      quantity: {
        type: 'integer',
        description: 'Number of units to subscribe for. Must be at least 1.',
      },
    },
  },
};

export const handler = (client: DodoPayments, args: Record<string, unknown> | undefined) => {
  const { subscription_id, ...body } = args as any;
  return client.subscriptions.changePlan(subscription_id, body);
};

export default { metadata, tool, handler };
