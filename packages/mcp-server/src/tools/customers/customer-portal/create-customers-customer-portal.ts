// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../../';
import DodoPayments from 'dodopayments';

export const metadata: Metadata = {
  resource: 'customers.customer_portal',
  operation: 'write',
  tags: [],
};

export const tool: Tool = {
  name: 'create_customers_customer_portal',
  description: '',
  inputSchema: {
    type: 'object',
    properties: {
      customer_id: {
        type: 'string',
      },
      send_email: {
        type: 'boolean',
        description: 'If true, will send link to user.',
      },
    },
  },
};

export const handler = (client: DodoPayments, args: Record<string, unknown> | undefined) => {
  const { customer_id, ...body } = args as any;
  return client.customers.customerPortal.create(customer_id, body);
};

export default { metadata, tool, handler };
