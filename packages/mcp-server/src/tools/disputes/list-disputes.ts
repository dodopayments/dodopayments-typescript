// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { asTextContentResult } from 'dodopayments-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import DodoPayments from 'dodopayments';

export const metadata: Metadata = {
  resource: 'disputes',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/disputes',
  operationId: 'list_disputes',
};

export const tool: Tool = {
  name: 'list_disputes',
  description: '',
  inputSchema: {
    type: 'object',
    properties: {
      created_at_gte: {
        type: 'string',
        description: 'Get events after this created time',
        format: 'date-time',
      },
      created_at_lte: {
        type: 'string',
        description: 'Get events created before this time',
        format: 'date-time',
      },
      customer_id: {
        type: 'string',
        description: 'Filter by customer_id',
      },
      dispute_stage: {
        type: 'string',
        description: 'Filter by dispute stage',
        enum: ['pre_dispute', 'dispute', 'pre_arbitration'],
      },
      dispute_status: {
        type: 'string',
        description: 'Filter by dispute status',
        enum: [
          'dispute_opened',
          'dispute_expired',
          'dispute_accepted',
          'dispute_cancelled',
          'dispute_challenged',
          'dispute_won',
          'dispute_lost',
        ],
      },
      page_number: {
        type: 'integer',
        description: 'Page number default is 0',
      },
      page_size: {
        type: 'integer',
        description: 'Page size default is 10 max is 100',
      },
    },
  },
};

export const handler = async (client: DodoPayments, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  return asTextContentResult(await client.disputes.list(body));
};

export default { metadata, tool, handler };
