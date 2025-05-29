// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import DodoPayments from 'dodopayments';

export const metadata: Metadata = {
  resource: 'license_keys',
  operation: 'write',
  tags: [],
  httpMethod: 'patch',
  httpPath: '/license_keys/{id}',
  operationId: 'update_license_key',
};

export const tool: Tool = {
  name: 'update_license_keys',
  description: '',
  inputSchema: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
      },
      activations_limit: {
        type: 'integer',
        description:
          'The updated activation limit for the license key.\nUse `null` to remove the limit, or omit this field to leave it unchanged.',
      },
      disabled: {
        type: 'boolean',
        description:
          'Indicates whether the license key should be disabled.\nA value of `true` disables the key, while `false` enables it. Omit this field to leave it unchanged.',
      },
      expires_at: {
        type: 'string',
        description:
          'The updated expiration timestamp for the license key in UTC.\nUse `null` to remove the expiration date, or omit this field to leave it unchanged.',
        format: 'date-time',
      },
    },
  },
};

export const handler = (client: DodoPayments, args: Record<string, unknown> | undefined) => {
  const { id, ...body } = args as any;
  return client.licenseKeys.update(id, body);
};

export default { metadata, tool, handler };
