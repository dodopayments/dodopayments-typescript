// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import DodoPayments from 'dodopayments';

export const metadata: Metadata = {
  resource: 'discounts',
  operation: 'read',
  tags: [],
};

export const tool: Tool = {
  name: 'retrieve_discounts',
  description: 'GET /discounts/{discount_id}',
  inputSchema: {
    type: 'object',
    properties: {
      discount_id: {
        type: 'string',
      },
    },
  },
};

export const handler = (client: DodoPayments, args: any) => {
  const { discount_id } = args;
  return client.discounts.retrieve(discount_id);
};

export default { metadata, tool, handler };
