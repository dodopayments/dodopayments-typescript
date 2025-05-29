// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import DodoPayments from 'dodopayments';

export const metadata: Metadata = {
  resource: 'products',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/products/{id}/unarchive',
  operationId: 'undelete_product',
};

export const tool: Tool = {
  name: 'unarchive_products',
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

export const handler = (client: DodoPayments, args: Record<string, unknown> | undefined) => {
  const { id, ...body } = args as any;
  return client.products.unarchive(id);
};

export default { metadata, tool, handler };
