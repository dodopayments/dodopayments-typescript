// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../../';
import DodoPayments from 'dodopayments';

export const metadata: Metadata = {
  resource: 'invoices.payments',
  operation: 'read',
  tags: [],
};

export const tool: Tool = {
  name: 'retrieve_invoices_payments',
  description: '',
  inputSchema: {
    type: 'object',
    properties: {
      payment_id: {
        type: 'string',
      },
    },
  },
};

export const handler = (client: DodoPayments, args: any) => {
  const { payment_id } = args;
  return client.invoices.payments.retrieve(payment_id);
};

export default { metadata, tool, handler };
