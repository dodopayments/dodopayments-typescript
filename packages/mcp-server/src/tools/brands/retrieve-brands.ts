// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { asTextContentResult } from 'dodopayments-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import DodoPayments from 'dodopayments';

export const metadata: Metadata = {
  resource: 'brands',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/brands/{id}',
  operationId: 'get_brand_handler',
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

export const handler = async (client: DodoPayments, args: Record<string, unknown> | undefined) => {
  const { id, ...body } = args as any;
  return asTextContentResult(await client.brands.retrieve(id));
};

export default { metadata, tool, handler };
