// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import DodoPayments from 'dodopayments';

export const metadata: Metadata = {
  resource: 'misc',
  operation: 'read',
  tags: [],
};

export const tool: Tool = {
  name: 'list_supported_countries_misc',
  description: '',
  inputSchema: {
    type: 'object',
    properties: {},
  },
};

export const handler = (client: DodoPayments, args: any) => {
  const {} = args;
  return client.misc.listSupportedCountries();
};

export default { metadata, tool, handler };
