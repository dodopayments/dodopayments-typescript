// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from 'dodopayments-mcp/filtering';
import { Metadata, asTextContentResult } from 'dodopayments-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import DodoPayments from 'dodopayments';

export const metadata: Metadata = {
  resource: 'refunds',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/refunds/{refund_id}',
  operationId: 'get_refund_handler',
};

export const tool: Tool = {
  name: 'retrieve_refunds',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\n\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/refund',\n  $defs: {\n    refund: {\n      type: 'object',\n      properties: {\n        business_id: {\n          type: 'string',\n          description: 'The unique identifier of the business issuing the refund.'\n        },\n        created_at: {\n          type: 'string',\n          description: 'The timestamp of when the refund was created in UTC.',\n          format: 'date-time'\n        },\n        customer: {\n          $ref: '#/$defs/customer_limited_details'\n        },\n        is_partial: {\n          type: 'boolean',\n          description: 'If true the refund is a partial refund'\n        },\n        payment_id: {\n          type: 'string',\n          description: 'The unique identifier of the payment associated with the refund.'\n        },\n        refund_id: {\n          type: 'string',\n          description: 'The unique identifier of the refund.'\n        },\n        status: {\n          $ref: '#/$defs/refund_status'\n        },\n        amount: {\n          type: 'integer',\n          description: 'The refunded amount.'\n        },\n        currency: {\n          $ref: '#/$defs/currency'\n        },\n        reason: {\n          type: 'string',\n          description: 'The reason provided for the refund, if any. Optional.'\n        }\n      },\n      required: [        'business_id',\n        'created_at',\n        'customer',\n        'is_partial',\n        'payment_id',\n        'refund_id',\n        'status'\n      ]\n    },\n    customer_limited_details: {\n      type: 'object',\n      properties: {\n        customer_id: {\n          type: 'string',\n          description: 'Unique identifier for the customer'\n        },\n        email: {\n          type: 'string',\n          description: 'Email address of the customer'\n        },\n        name: {\n          type: 'string',\n          description: 'Full name of the customer'\n        },\n        phone_number: {\n          type: 'string',\n          description: 'Phone number of the customer'\n        }\n      },\n      required: [        'customer_id',\n        'email',\n        'name'\n      ]\n    },\n    refund_status: {\n      type: 'string',\n      enum: [        'succeeded',\n        'failed',\n        'pending',\n        'review'\n      ]\n    },\n    currency: {\n      type: 'string',\n      enum: [        'AED',\n        'ALL',\n        'AMD',\n        'ANG',\n        'AOA',\n        'ARS',\n        'AUD',\n        'AWG',\n        'AZN',\n        'BAM',\n        'BBD',\n        'BDT',\n        'BGN',\n        'BHD',\n        'BIF',\n        'BMD',\n        'BND',\n        'BOB',\n        'BRL',\n        'BSD',\n        'BWP',\n        'BYN',\n        'BZD',\n        'CAD',\n        'CHF',\n        'CLP',\n        'CNY',\n        'COP',\n        'CRC',\n        'CUP',\n        'CVE',\n        'CZK',\n        'DJF',\n        'DKK',\n        'DOP',\n        'DZD',\n        'EGP',\n        'ETB',\n        'EUR',\n        'FJD',\n        'FKP',\n        'GBP',\n        'GEL',\n        'GHS',\n        'GIP',\n        'GMD',\n        'GNF',\n        'GTQ',\n        'GYD',\n        'HKD',\n        'HNL',\n        'HRK',\n        'HTG',\n        'HUF',\n        'IDR',\n        'ILS',\n        'INR',\n        'IQD',\n        'JMD',\n        'JOD',\n        'JPY',\n        'KES',\n        'KGS',\n        'KHR',\n        'KMF',\n        'KRW',\n        'KWD',\n        'KYD',\n        'KZT',\n        'LAK',\n        'LBP',\n        'LKR',\n        'LRD',\n        'LSL',\n        'LYD',\n        'MAD',\n        'MDL',\n        'MGA',\n        'MKD',\n        'MMK',\n        'MNT',\n        'MOP',\n        'MRU',\n        'MUR',\n        'MVR',\n        'MWK',\n        'MXN',\n        'MYR',\n        'MZN',\n        'NAD',\n        'NGN',\n        'NIO',\n        'NOK',\n        'NPR',\n        'NZD',\n        'OMR',\n        'PAB',\n        'PEN',\n        'PGK',\n        'PHP',\n        'PKR',\n        'PLN',\n        'PYG',\n        'QAR',\n        'RON',\n        'RSD',\n        'RUB',\n        'RWF',\n        'SAR',\n        'SBD',\n        'SCR',\n        'SEK',\n        'SGD',\n        'SHP',\n        'SLE',\n        'SLL',\n        'SOS',\n        'SRD',\n        'SSP',\n        'STN',\n        'SVC',\n        'SZL',\n        'THB',\n        'TND',\n        'TOP',\n        'TRY',\n        'TTD',\n        'TWD',\n        'TZS',\n        'UAH',\n        'UGX',\n        'USD',\n        'UYU',\n        'UZS',\n        'VES',\n        'VND',\n        'VUV',\n        'WST',\n        'XAF',\n        'XCD',\n        'XOF',\n        'XPF',\n        'YER',\n        'ZAR',\n        'ZMW'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      refund_id: {
        type: 'string',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['refund_id'],
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (client: DodoPayments, args: Record<string, unknown> | undefined) => {
  const { refund_id, jq_filter, ...body } = args as any;
  return asTextContentResult(await maybeFilter(jq_filter, await client.refunds.retrieve(refund_id)));
};

export default { metadata, tool, handler };
