// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

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
    },
  },
};

export const handler = (client: DodoPayments, args: Record<string, unknown> | undefined) => {
  const { customer_id, ...body } = args as any;
  return client.customers.update(customer_id);
};

export default { metadata, tool, handler };
