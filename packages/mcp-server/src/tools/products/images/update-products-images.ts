// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../../';
import DodoPayments from 'dodopayments';

export const metadata: Metadata = {
  resource: 'products.images',
  operation: 'write',
  tags: [],
};

export const tool: Tool = {
  name: 'update_products_images',
  description: '',
  inputSchema: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
      },
      force_update: {
        type: 'boolean',
      },
    },
  },
};

export const handler = (client: DodoPayments, args: Record<string, unknown> | undefined) => {
  const { id, ...body } = args as any;
  return client.products.images.update(id, body);
};

export default { metadata, tool, handler };
