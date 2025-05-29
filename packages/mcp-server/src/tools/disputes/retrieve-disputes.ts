// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import DodoPayments from 'dodopayments';

export const metadata: Metadata = {
  resource: 'disputes',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/disputes/{dispute_id}',
  operationId: 'get_dispute_handler',
};

export const tool: Tool = {
  name: 'retrieve_disputes',
  description: '',
  inputSchema: {
    type: 'object',
    properties: {
      dispute_id: {
        type: 'string',
      },
    },
  },
};

export const handler = (client: DodoPayments, args: Record<string, unknown> | undefined) => {
  const { dispute_id, ...body } = args as any;
  return client.disputes.retrieve(dispute_id);
};

export default { metadata, tool, handler };
