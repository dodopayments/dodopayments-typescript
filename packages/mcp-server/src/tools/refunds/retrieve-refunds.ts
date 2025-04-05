// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import DodoPayments from 'dodopayments';

export const metadata: Metadata = {
  resource: 'refunds',
  operation: 'read',
  tags: [],
};

export const tool: Tool = {
  name: 'retrieve_refunds',
  description: '',
  inputSchema: {
    type: 'object',
    properties: {
      refund_id: {
        type: 'string',
      },
    },
  },
};

export const handler = (client: DodoPayments, args: any) => {
  const { refund_id } = args;
  return client.refunds.retrieve(refund_id);
};

export default { metadata, tool, handler };
