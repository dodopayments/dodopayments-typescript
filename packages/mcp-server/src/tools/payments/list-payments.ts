// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from 'dodopayments-mcp/filtering';
import { Metadata, asTextContentResult } from 'dodopayments-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import DodoPayments from 'dodopayments';

export const metadata: Metadata = {
  resource: 'payments',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/payments',
  operationId: 'list_payments_handler',
};

export const tool: Tool = {
  name: 'list_payments',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\n\n\n# Response Schema\n```json\n{\n  type: 'object',\n  properties: {\n    items: {\n      type: 'array',\n      items: {\n        type: 'object',\n        properties: {\n          brand_id: {\n            type: 'string'\n          },\n          created_at: {\n            type: 'string',\n            format: 'date-time'\n          },\n          currency: {\n            $ref: '#/$defs/currency'\n          },\n          customer: {\n            $ref: '#/$defs/customer_limited_details'\n          },\n          digital_products_delivered: {\n            type: 'boolean'\n          },\n          metadata: {\n            type: 'object'\n          },\n          payment_id: {\n            type: 'string'\n          },\n          total_amount: {\n            type: 'integer'\n          },\n          payment_method: {\n            type: 'string'\n          },\n          payment_method_type: {\n            type: 'string'\n          },\n          status: {\n            $ref: '#/$defs/intent_status'\n          },\n          subscription_id: {\n            type: 'string'\n          }\n        },\n        required: [          'brand_id',\n          'created_at',\n          'currency',\n          'customer',\n          'digital_products_delivered',\n          'metadata',\n          'payment_id',\n          'total_amount'\n        ]\n      }\n    }\n  },\n  required: [    'items'\n  ],\n  $defs: {\n    currency: {\n      type: 'string',\n      enum: [        'AED',\n        'ALL',\n        'AMD',\n        'ANG',\n        'AOA',\n        'ARS',\n        'AUD',\n        'AWG',\n        'AZN',\n        'BAM',\n        'BBD',\n        'BDT',\n        'BGN',\n        'BHD',\n        'BIF',\n        'BMD',\n        'BND',\n        'BOB',\n        'BRL',\n        'BSD',\n        'BWP',\n        'BYN',\n        'BZD',\n        'CAD',\n        'CHF',\n        'CLP',\n        'CNY',\n        'COP',\n        'CRC',\n        'CUP',\n        'CVE',\n        'CZK',\n        'DJF',\n        'DKK',\n        'DOP',\n        'DZD',\n        'EGP',\n        'ETB',\n        'EUR',\n        'FJD',\n        'FKP',\n        'GBP',\n        'GEL',\n        'GHS',\n        'GIP',\n        'GMD',\n        'GNF',\n        'GTQ',\n        'GYD',\n        'HKD',\n        'HNL',\n        'HRK',\n        'HTG',\n        'HUF',\n        'IDR',\n        'ILS',\n        'INR',\n        'IQD',\n        'JMD',\n        'JOD',\n        'JPY',\n        'KES',\n        'KGS',\n        'KHR',\n        'KMF',\n        'KRW',\n        'KWD',\n        'KYD',\n        'KZT',\n        'LAK',\n        'LBP',\n        'LKR',\n        'LRD',\n        'LSL',\n        'LYD',\n        'MAD',\n        'MDL',\n        'MGA',\n        'MKD',\n        'MMK',\n        'MNT',\n        'MOP',\n        'MRU',\n        'MUR',\n        'MVR',\n        'MWK',\n        'MXN',\n        'MYR',\n        'MZN',\n        'NAD',\n        'NGN',\n        'NIO',\n        'NOK',\n        'NPR',\n        'NZD',\n        'OMR',\n        'PAB',\n        'PEN',\n        'PGK',\n        'PHP',\n        'PKR',\n        'PLN',\n        'PYG',\n        'QAR',\n        'RON',\n        'RSD',\n        'RUB',\n        'RWF',\n        'SAR',\n        'SBD',\n        'SCR',\n        'SEK',\n        'SGD',\n        'SHP',\n        'SLE',\n        'SLL',\n        'SOS',\n        'SRD',\n        'SSP',\n        'STN',\n        'SVC',\n        'SZL',\n        'THB',\n        'TND',\n        'TOP',\n        'TRY',\n        'TTD',\n        'TWD',\n        'TZS',\n        'UAH',\n        'UGX',\n        'USD',\n        'UYU',\n        'UZS',\n        'VES',\n        'VND',\n        'VUV',\n        'WST',\n        'XAF',\n        'XCD',\n        'XOF',\n        'XPF',\n        'YER',\n        'ZAR',\n        'ZMW'\n      ]\n    },\n    customer_limited_details: {\n      type: 'object',\n      properties: {\n        customer_id: {\n          type: 'string',\n          description: 'Unique identifier for the customer'\n        },\n        email: {\n          type: 'string',\n          description: 'Email address of the customer'\n        },\n        name: {\n          type: 'string',\n          description: 'Full name of the customer'\n        }\n      },\n      required: [        'customer_id',\n        'email',\n        'name'\n      ]\n    },\n    intent_status: {\n      type: 'string',\n      enum: [        'succeeded',\n        'failed',\n        'cancelled',\n        'processing',\n        'requires_customer_action',\n        'requires_merchant_action',\n        'requires_payment_method',\n        'requires_confirmation',\n        'requires_capture',\n        'partially_captured',\n        'partially_captured_and_capturable'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      brand_id: {
        type: 'string',
        description: 'filter by Brand id',
      },
      created_at_gte: {
        type: 'string',
        description: 'Get events after this created time',
        format: 'date-time',
      },
      created_at_lte: {
        type: 'string',
        description: 'Get events created before this time',
        format: 'date-time',
      },
      customer_id: {
        type: 'string',
        description: 'Filter by customer id',
      },
      page_number: {
        type: 'integer',
        description: 'Page number default is 0',
      },
      page_size: {
        type: 'integer',
        description: 'Page size default is 10 max is 100',
      },
      status: {
        type: 'string',
        description: 'Filter by status',
        enum: [
          'succeeded',
          'failed',
          'cancelled',
          'processing',
          'requires_customer_action',
          'requires_merchant_action',
          'requires_payment_method',
          'requires_confirmation',
          'requires_capture',
          'partially_captured',
          'partially_captured_and_capturable',
        ],
      },
      subscription_id: {
        type: 'string',
        description: 'Filter by subscription id',
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
  const body = args as any;
  const response = await client.payments.list(body).asResponse();
  return asTextContentResult(await maybeFilter(args, await response.json()));
};

export default { metadata, tool, handler };
