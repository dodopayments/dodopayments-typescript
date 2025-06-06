// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { asTextContentResult } from 'dodopayments-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import DodoPayments from 'dodopayments';

export const metadata: Metadata = {
  resource: 'webhook_events',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/webhook_events/{webhook_event_id}',
  operationId: 'get_webhook_event',
};

export const tool: Tool = {
  name: 'retrieve_webhook_events',
  description: '',
  inputSchema: {
    type: 'object',
    properties: {
      webhook_event_id: {
        type: 'string',
      },
    },
  },
};

export const handler = async (client: DodoPayments, args: Record<string, unknown> | undefined) => {
  const { webhook_event_id, ...body } = args as any;
  return asTextContentResult(await client.webhookEvents.retrieve(webhook_event_id));
};

export default { metadata, tool, handler };
