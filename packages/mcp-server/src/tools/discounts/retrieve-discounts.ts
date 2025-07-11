// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from 'dodopayments-mcp/filtering';
import { asTextContentResult } from 'dodopayments-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import DodoPayments from 'dodopayments';

export const metadata: Metadata = {
  resource: 'discounts',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/discounts/{discount_id}',
  operationId: 'get_discount_handler',
};

export const tool: Tool = {
  name: 'retrieve_discounts',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nGET /discounts/{discount_id}\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/discount',\n  $defs: {\n    discount: {\n      type: 'object',\n      properties: {\n        amount: {\n          type: 'integer',\n          description: 'The discount amount.\\n\\n- If `discount_type` is `percentage`, this is in **basis points**\\n  (e.g., 540 => 5.4%).\\n- Otherwise, this is **USD cents** (e.g., 100 => `$1.00`).'\n        },\n        business_id: {\n          type: 'string',\n          description: 'The business this discount belongs to.'\n        },\n        code: {\n          type: 'string',\n          description: 'The discount code (up to 16 chars).'\n        },\n        created_at: {\n          type: 'string',\n          description: 'Timestamp when the discount is created',\n          format: 'date-time'\n        },\n        discount_id: {\n          type: 'string',\n          description: 'The unique discount ID'\n        },\n        restricted_to: {\n          type: 'array',\n          description: 'List of product IDs to which this discount is restricted.',\n          items: {\n            type: 'string'\n          }\n        },\n        times_used: {\n          type: 'integer',\n          description: 'How many times this discount has been used.'\n        },\n        type: {\n          $ref: '#/$defs/discount_type'\n        },\n        expires_at: {\n          type: 'string',\n          description: 'Optional date/time after which discount is expired.',\n          format: 'date-time'\n        },\n        name: {\n          type: 'string',\n          description: 'Name for the Discount'\n        },\n        usage_limit: {\n          type: 'integer',\n          description: 'Usage limit for this discount, if any.'\n        }\n      },\n      required: [        'amount',\n        'business_id',\n        'code',\n        'created_at',\n        'discount_id',\n        'restricted_to',\n        'times_used',\n        'type'\n      ]\n    },\n    discount_type: {\n      type: 'string',\n      enum: [        'percentage'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      discount_id: {
        type: 'string',
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
  const { discount_id, ...body } = args as any;
  return asTextContentResult(await maybeFilter(args, await client.discounts.retrieve(discount_id)));
};

export default { metadata, tool, handler };
