// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { isJqError, maybeFilter } from 'dodopayments-mcp/filtering';
import { Metadata, asErrorResult, asTextContentResult } from 'dodopayments-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import DodoPayments from 'dodopayments';

export const metadata: Metadata = {
  resource: 'subscriptions',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/subscriptions/{subscription_id}/update-payment-method',
  operationId: 'update',
};

export const tool: Tool = {
  name: 'update_payment_method_subscriptions',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\n\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/subscription_update_payment_method_response',\n  $defs: {\n    subscription_update_payment_method_response: {\n      type: 'object',\n      properties: {\n        client_secret: {\n          type: 'string'\n        },\n        expires_on: {\n          type: 'string',\n          format: 'date-time'\n        },\n        payment_id: {\n          type: 'string'\n        },\n        payment_link: {\n          type: 'string'\n        }\n      }\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    anyOf: [
      {
        type: 'object',
        properties: {
          subscription_id: {
            type: 'string',
          },
          type: {
            type: 'string',
            enum: ['new'],
          },
          return_url: {
            type: 'string',
          },
        },
        required: ['subscription_id', 'type'],
      },
      {
        type: 'object',
        properties: {
          subscription_id: {
            type: 'string',
          },
          payment_method_id: {
            type: 'string',
          },
          type: {
            type: 'string',
            enum: ['existing'],
          },
        },
        required: ['subscription_id', 'payment_method_id', 'type'],
      },
    ],
    properties: {
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
  },
  annotations: {},
};

export const handler = async (client: DodoPayments, args: Record<string, unknown> | undefined) => {
  const { subscription_id, jq_filter, ...body } = args as any;
  try {
    return asTextContentResult(
      await maybeFilter(jq_filter, await client.subscriptions.updatePaymentMethod(subscription_id, body)),
    );
  } catch (error) {
    if (error instanceof DodoPayments.APIError || isJqError(error)) {
      return asErrorResult(error.message);
    }
    throw error;
  }
};

export default { metadata, tool, handler };
