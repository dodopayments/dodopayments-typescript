// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import DodoPayments from 'dodopayments';

export const metadata: Metadata = {
  resource: 'products',
  operation: 'write',
  tags: [],
};

export const tool: Tool = {
  name: 'delete_products',
  description: '',
  inputSchema: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
      },
    },
  },
};

export const handler = (client: DodoPayments, args: any) => {
  const { id } = args;
  return client.products.delete(id);
};

export default { metadata, tool, handler };
