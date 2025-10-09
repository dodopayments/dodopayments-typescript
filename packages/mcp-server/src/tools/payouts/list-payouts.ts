// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from 'dodopayments-mcp/filtering';
import { Metadata, asTextContentResult } from 'dodopayments-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import DodoPayments from 'dodopayments';

export const metadata: Metadata = {
  resource: 'payouts',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/payouts',
  operationId: 'list_payouts',
};

export const tool: Tool = {
  name: 'list_payouts',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\n\n\n# Response Schema\n```json\n{\n  type: 'object',\n  properties: {\n    items: {\n      type: 'array',\n      items: {\n        $ref: '#/$defs/payout_list_response'\n      }\n    }\n  },\n  required: [    'items'\n  ],\n  $defs: {\n    payout_list_response: {\n      type: 'object',\n      properties: {\n        amount: {\n          type: 'integer',\n          description: 'The total amount of the payout.'\n        },\n        business_id: {\n          type: 'string',\n          description: 'The unique identifier of the business associated with the payout.'\n        },\n        chargebacks: {\n          type: 'integer',\n          description: 'The total value of chargebacks associated with the payout.'\n        },\n        created_at: {\n          type: 'string',\n          description: 'The timestamp when the payout was created, in UTC.',\n          format: 'date-time'\n        },\n        currency: {\n          $ref: '#/$defs/currency'\n        },\n        fee: {\n          type: 'integer',\n          description: 'The fee charged for processing the payout.'\n        },\n        payment_method: {\n          type: 'string',\n          description: 'The payment method used for the payout (e.g., bank transfer, card, etc.).'\n        },\n        payout_id: {\n          type: 'string',\n          description: 'The unique identifier of the payout.'\n        },\n        refunds: {\n          type: 'integer',\n          description: 'The total value of refunds associated with the payout.'\n        },\n        status: {\n          type: 'string',\n          description: 'The current status of the payout.',\n          enum: [            'not_initiated',\n            'in_progress',\n            'on_hold',\n            'failed',\n            'success'\n          ]\n        },\n        tax: {\n          type: 'integer',\n          description: 'The tax applied to the payout.'\n        },\n        updated_at: {\n          type: 'string',\n          description: 'The timestamp when the payout was last updated, in UTC.',\n          format: 'date-time'\n        },\n        name: {\n          type: 'string',\n          description: 'The name of the payout recipient or purpose.'\n        },\n        payout_document_url: {\n          type: 'string',\n          description: 'The URL of the document associated with the payout.'\n        },\n        remarks: {\n          type: 'string',\n          description: 'Any additional remarks or notes associated with the payout.'\n        }\n      },\n      required: [        'amount',\n        'business_id',\n        'chargebacks',\n        'created_at',\n        'currency',\n        'fee',\n        'payment_method',\n        'payout_id',\n        'refunds',\n        'status',\n        'tax',\n        'updated_at'\n      ]\n    },\n    currency: {\n      type: 'string',\n      enum: [        'AED',\n        'ALL',\n        'AMD',\n        'ANG',\n        'AOA',\n        'ARS',\n        'AUD',\n        'AWG',\n        'AZN',\n        'BAM',\n        'BBD',\n        'BDT',\n        'BGN',\n        'BHD',\n        'BIF',\n        'BMD',\n        'BND',\n        'BOB',\n        'BRL',\n        'BSD',\n        'BWP',\n        'BYN',\n        'BZD',\n        'CAD',\n        'CHF',\n        'CLP',\n        'CNY',\n        'COP',\n        'CRC',\n        'CUP',\n        'CVE',\n        'CZK',\n        'DJF',\n        'DKK',\n        'DOP',\n        'DZD',\n        'EGP',\n        'ETB',\n        'EUR',\n        'FJD',\n        'FKP',\n        'GBP',\n        'GEL',\n        'GHS',\n        'GIP',\n        'GMD',\n        'GNF',\n        'GTQ',\n        'GYD',\n        'HKD',\n        'HNL',\n        'HRK',\n        'HTG',\n        'HUF',\n        'IDR',\n        'ILS',\n        'INR',\n        'IQD',\n        'JMD',\n        'JOD',\n        'JPY',\n        'KES',\n        'KGS',\n        'KHR',\n        'KMF',\n        'KRW',\n        'KWD',\n        'KYD',\n        'KZT',\n        'LAK',\n        'LBP',\n        'LKR',\n        'LRD',\n        'LSL',\n        'LYD',\n        'MAD',\n        'MDL',\n        'MGA',\n        'MKD',\n        'MMK',\n        'MNT',\n        'MOP',\n        'MRU',\n        'MUR',\n        'MVR',\n        'MWK',\n        'MXN',\n        'MYR',\n        'MZN',\n        'NAD',\n        'NGN',\n        'NIO',\n        'NOK',\n        'NPR',\n        'NZD',\n        'OMR',\n        'PAB',\n        'PEN',\n        'PGK',\n        'PHP',\n        'PKR',\n        'PLN',\n        'PYG',\n        'QAR',\n        'RON',\n        'RSD',\n        'RUB',\n        'RWF',\n        'SAR',\n        'SBD',\n        'SCR',\n        'SEK',\n        'SGD',\n        'SHP',\n        'SLE',\n        'SLL',\n        'SOS',\n        'SRD',\n        'SSP',\n        'STN',\n        'SVC',\n        'SZL',\n        'THB',\n        'TND',\n        'TOP',\n        'TRY',\n        'TTD',\n        'TWD',\n        'TZS',\n        'UAH',\n        'UGX',\n        'USD',\n        'UYU',\n        'UZS',\n        'VES',\n        'VND',\n        'VUV',\n        'WST',\n        'XAF',\n        'XCD',\n        'XOF',\n        'XPF',\n        'YER',\n        'ZAR',\n        'ZMW'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      page_number: {
        type: 'integer',
        description: 'Page number default is 0',
      },
      page_size: {
        type: 'integer',
        description: 'Page size default is 10 max is 100',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: [],
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (client: DodoPayments, args: Record<string, unknown> | undefined) => {
  const { jq_filter, ...body } = args as any;
  const response = await client.payouts.list(body).asResponse();
  return asTextContentResult(await maybeFilter(jq_filter, await response.json()));
};

export default { metadata, tool, handler };
