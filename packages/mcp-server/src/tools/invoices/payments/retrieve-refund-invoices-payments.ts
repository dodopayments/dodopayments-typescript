// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asBinaryContentResult } from 'dodopayments-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import DodoPayments from 'dodopayments';

export const metadata: Metadata = {
  resource: 'invoices.payments',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/invoices/refunds/{refund_id}',
  operationId: 'get_refund_invoice_no_auth',
};

export const tool: Tool = {
  name: 'retrieve_refund_invoices_payments',
  description: '',
  inputSchema: {
    type: 'object',
    properties: {
      refund_id: {
        type: 'string',
      },
    },
    required: ['refund_id'],
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (client: DodoPayments, args: Record<string, unknown> | undefined) => {
  const { refund_id, ...body } = args as any;
  return asBinaryContentResult(await client.invoices.payments.retrieveRefund(refund_id));
};

export default { metadata, tool, handler };
