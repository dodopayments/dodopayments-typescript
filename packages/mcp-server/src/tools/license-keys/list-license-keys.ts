// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { asTextContentResult } from 'dodopayments-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import DodoPayments from 'dodopayments';

export const metadata: Metadata = {
  resource: 'license_keys',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/license_keys',
  operationId: 'list_license_keys_handler',
};

export const tool: Tool = {
  name: 'list_license_keys',
  description: '',
  inputSchema: {
    type: 'object',
    properties: {
      customer_id: {
        type: 'string',
        description: 'Filter by customer ID',
      },
      page_number: {
        type: 'integer',
        description: 'Page number default is 0',
      },
      page_size: {
        type: 'integer',
        description: 'Page size default is 10 max is 100',
      },
      product_id: {
        type: 'string',
        description: 'Filter by product ID',
      },
      status: {
        $ref: '#/$defs/license_key_status',
      },
    },
    $defs: {
      license_key_status: {
        type: 'string',
        enum: ['active', 'expired', 'disabled'],
      },
    },
  },
};

export const handler = async (client: DodoPayments, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  return asTextContentResult(await client.licenseKeys.list(body));
};

export default { metadata, tool, handler };
