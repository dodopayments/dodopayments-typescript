// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import DodoPayments from 'dodopayments';

export const metadata: Metadata = {
  resource: 'customers',
  operation: 'write',
  tags: [],
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

export const handler = (client: DodoPayments, args: any) => {
  const { customer_id, ...body } = args;
  return client.customers.update(customer_id, body);
};

export default { metadata, tool, handler };
