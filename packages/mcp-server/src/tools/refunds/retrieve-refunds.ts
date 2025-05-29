// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import DodoPayments from 'dodopayments';

export const metadata: Metadata = {
  resource: 'refunds',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/refunds/{refund_id}',
  operationId: 'get_refund_handler',
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

export const handler = (client: DodoPayments, args: Record<string, unknown> | undefined) => {
  const { refund_id, ...body } = args as any;
  return client.refunds.retrieve(refund_id);
};

export default { metadata, tool, handler };
