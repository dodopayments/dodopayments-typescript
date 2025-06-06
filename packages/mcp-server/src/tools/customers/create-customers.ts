// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { asTextContentResult } from 'dodopayments-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import DodoPayments from 'dodopayments';

export const metadata: Metadata = {
  resource: 'customers',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/customers',
  operationId: 'create_customer',
};

export const tool: Tool = {
  name: 'create_customers',
  description: '',
  inputSchema: {
    type: 'object',
    properties: {
      email: {
        type: 'string',
      },
      name: {
        type: 'string',
      },
      phone_number: {
        type: 'string',
      },
    },
  },
};

export const handler = async (client: DodoPayments, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  return asTextContentResult(await client.customers.create(body));
};

export default { metadata, tool, handler };
