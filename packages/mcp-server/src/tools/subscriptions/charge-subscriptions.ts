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
  name: 'charge_subscriptions',
  description: '',
  inputSchema: {
    type: 'object',
    properties: {
      subscription_id: {
        type: 'string',
      },
      product_price: {
        type: 'integer',
        description:
          'The product price. Represented in the lowest denomination of the currency (e.g., cents for USD).\nFor example, to charge $1.00, pass `100`.',
      },
    },
  },
};

export const handler = (client: DodoPayments, args: any) => {
  const { subscription_id, ...body } = args;
  return client.subscriptions.charge(subscription_id, body);
};

export default { metadata, tool, handler };
