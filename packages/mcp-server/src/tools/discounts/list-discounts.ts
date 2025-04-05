// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import DodoPayments from 'dodopayments';

export const metadata: Metadata = {
  resource: 'discounts',
  operation: 'read',
  tags: [],
};

export const tool: Tool = {
  name: 'list_discounts',
  description: 'GET /discounts',
  inputSchema: {
    type: 'object',
    properties: {
      page_number: {
        type: 'integer',
        description: 'Page number (default = 0).',
      },
      page_size: {
        type: 'integer',
        description: 'Page size (default = 10, max = 100).',
      },
    },
  },
};

export const handler = (client: DodoPayments, args: any) => {
  const { ...body } = args;
  return client.discounts.list(body);
};

export default { metadata, tool, handler };
