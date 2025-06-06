// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { asTextContentResult } from 'dodopayments-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import DodoPayments from 'dodopayments';

export const metadata: Metadata = {
  resource: 'customers',
  operation: 'write',
  tags: [],
  httpMethod: 'patch',
  httpPath: '/customers/{customer_id}',
  operationId: 'patch_customer',
};

export const tool: Tool = {
  name: 'update_customers',
  description: '',
  inputSchema: {
    type: 'object',
    properties: {
      customer_id: {
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
  const { customer_id, ...body } = args as any;
  return asTextContentResult(await client.customers.update(customer_id, body));
};

export default { metadata, tool, handler };
