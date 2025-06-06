// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { asTextContentResult } from 'dodopayments-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../../';
import DodoPayments from 'dodopayments';

export const metadata: Metadata = {
  resource: 'products.images',
  operation: 'write',
  tags: [],
  httpMethod: 'put',
  httpPath: '/products/{id}/images',
  operationId: 'update_product_image',
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

export const handler = async (client: DodoPayments, args: Record<string, unknown> | undefined) => {
  const { id, ...body } = args as any;
  return asTextContentResult(await client.products.images.update(id, body));
};

export default { metadata, tool, handler };
