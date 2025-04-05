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
  name: 'update_subscriptions',
  description: '',
  inputSchema: {
    type: 'object',
    properties: {
      subscription_id: {
        type: 'string',
      },
      metadata: {
        type: 'object',
      },
      status: {
        type: 'string',
        enum: ['pending', 'active', 'on_hold', 'paused', 'cancelled', 'failed', 'expired'],
      },
    },
  },
};

export const handler = (client: DodoPayments, args: any) => {
  const { subscription_id, ...body } = args;
  return client.subscriptions.update(subscription_id, body);
};

export default { metadata, tool, handler };
