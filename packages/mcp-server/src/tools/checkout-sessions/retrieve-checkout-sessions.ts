// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { isJqError, maybeFilter } from 'dodopayments-mcp/filtering';
import { Metadata, asErrorResult, asTextContentResult } from 'dodopayments-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import DodoPayments from 'dodopayments';

export const metadata: Metadata = {
  resource: 'checkout_sessions',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/checkouts/{id}',
  operationId: 'get_checkout_sessions_status',
};

export const tool: Tool = {
  name: 'retrieve_checkout_sessions',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\n\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/checkout_session_status',\n  $defs: {\n    checkout_session_status: {\n      type: 'object',\n      properties: {\n        id: {\n          type: 'string',\n          description: 'Id of the checkout session'\n        },\n        created_at: {\n          type: 'string',\n          description: 'Created at timestamp',\n          format: 'date-time'\n        },\n        customer_email: {\n          type: 'string',\n          description: 'Customer email: prefers payment\\'s customer, falls back to session'\n        },\n        customer_name: {\n          type: 'string',\n          description: 'Customer name: prefers payment\\'s customer, falls back to session'\n        },\n        payment_id: {\n          type: 'string',\n          description: 'Id of the payment created by the checkout sessions.\\n\\nNull if checkout sessions is still at the details collection stage.'\n        },\n        payment_status: {\n          $ref: '#/$defs/intent_status'\n        }\n      },\n      required: [        'id',\n        'created_at'\n      ]\n    },\n    intent_status: {\n      type: 'string',\n      enum: [        'succeeded',\n        'failed',\n        'cancelled',\n        'processing',\n        'requires_customer_action',\n        'requires_merchant_action',\n        'requires_payment_method',\n        'requires_confirmation',\n        'requires_capture',\n        'partially_captured',\n        'partially_captured_and_capturable'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['id'],
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (client: DodoPayments, args: Record<string, unknown> | undefined) => {
  const { id, jq_filter, ...body } = args as any;
  try {
    return asTextContentResult(await maybeFilter(jq_filter, await client.checkoutSessions.retrieve(id)));
  } catch (error) {
    if (error instanceof DodoPayments.APIError || isJqError(error)) {
      return asErrorResult(error.message);
    }
    throw error;
  }
};

export default { metadata, tool, handler };
