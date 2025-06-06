// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { asTextContentResult } from 'dodopayments-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import DodoPayments from 'dodopayments';

export const metadata: Metadata = {
  resource: 'brands',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/brands',
  operationId: 'create_brand_handler',
};

export const tool: Tool = {
  name: 'create_brands',
  description: '',
  inputSchema: {
    type: 'object',
    properties: {
      description: {
        type: 'string',
      },
      name: {
        type: 'string',
      },
      statement_descriptor: {
        type: 'string',
      },
      support_email: {
        type: 'string',
      },
      url: {
        type: 'string',
      },
    },
  },
};

export const handler = async (client: DodoPayments, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  return asTextContentResult(await client.brands.create(body));
};

export default { metadata, tool, handler };
