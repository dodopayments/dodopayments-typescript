// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import DodoPayments from 'dodopayments';

export const metadata: Metadata = {
  resource: 'customers',
  operation: 'read',
  tags: [],
};

export const tool: Tool = {
  name: 'retrieve_customers',
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
  return client.customers.retrieve(customer_id);
};

export default { metadata, tool, handler };
