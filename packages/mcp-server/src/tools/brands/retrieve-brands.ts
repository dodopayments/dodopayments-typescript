// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import DodoPayments from 'dodopayments';

export const metadata: Metadata = {
  resource: 'brands',
  operation: 'read',
  tags: [],
};

export const tool: Tool = {
  name: 'retrieve_brands',
  description: 'Thin handler just calls `get_brand` and wraps in `Json(...)`',
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
  return client.brands.retrieve(id);
};

export default { metadata, tool, handler };
