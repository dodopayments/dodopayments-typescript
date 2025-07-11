// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from 'dodopayments-mcp/filtering';
import { asTextContentResult } from 'dodopayments-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import DodoPayments from 'dodopayments';

export const metadata: Metadata = {
  resource: 'subscriptions',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/subscriptions/{subscription_id}/charge',
  operationId: 'create_subscription_charge',
};

export const tool: Tool = {
  name: 'charge_subscriptions',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\n\n\n# Response Schema\n```json\n{\n  type: 'object',\n  properties: {\n    payment_id: {\n      type: 'string'\n    }\n  },\n  required: [    'payment_id'\n  ]\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      subscription_id: {
        type: 'string',
      },
      product_price: {
        type: 'integer',
        description:
          'The product price. Represented in the lowest denomination of the currency (e.g., cents for USD).\nFor example, to charge $1.00, pass `100`.',
      },
      metadata: {
        type: 'object',
        description:
          'Metadata for the payment. If not passed, the metadata of the subscription will be taken',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
  },
};

export const handler = async (client: DodoPayments, args: Record<string, unknown> | undefined) => {
  const { subscription_id, ...body } = args as any;
  return asTextContentResult(
    await maybeFilter(args, await client.subscriptions.charge(subscription_id, body)),
  );
};

export default { metadata, tool, handler };
