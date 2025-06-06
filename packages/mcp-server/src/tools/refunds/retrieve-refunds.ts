// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { asTextContentResult } from 'dodopayments-mcp/tools/types';

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

export const handler = async (client: DodoPayments, args: Record<string, unknown> | undefined) => {
  const { refund_id, ...body } = args as any;
  return asTextContentResult(await client.refunds.retrieve(refund_id));
};

export default { metadata, tool, handler };
