// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import DodoPayments from 'dodopayments';

export const metadata: Metadata = {
  resource: 'webhook_events',
  operation: 'read',
  tags: [],
};

export const tool: Tool = {
  name: 'list_webhook_events',
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
      limit: {
        type: 'integer',
        description: 'Min : 1, Max : 100, default 10',
      },
      object_id: {
        type: 'string',
        description: 'Get events history of a specific object like payment/subscription/refund/dispute',
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

export const handler = (client: DodoPayments, args: any) => {
  const { ...body } = args;
  return client.webhookEvents.list(body);
};

export default { metadata, tool, handler };
