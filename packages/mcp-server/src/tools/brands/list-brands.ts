// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import DodoPayments from 'dodopayments';

export const metadata: Metadata = {
  resource: 'brands',
  operation: 'read',
  tags: [],
};

export const tool: Tool = {
  name: 'list_brands',
  description: '',
  inputSchema: {
    type: 'object',
    properties: {},
  },
};

export const handler = (client: DodoPayments, args: Record<string, unknown> | undefined) => {
  return client.brands.list();
};

export default { metadata, tool, handler };
