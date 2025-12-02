// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { isJqError, maybeFilter } from 'dodopayments-mcp/filtering';
import { Metadata, asErrorResult, asTextContentResult } from 'dodopayments-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import DodoPayments from 'dodopayments';

export const metadata: Metadata = {
  resource: 'customers',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/customers/{customer_id}/payment-methods',
  operationId: 'get_customer_payment_methods',
};

export const tool: Tool = {
  name: 'retrieve_payment_methods_customers',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\n\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/customer_retrieve_payment_methods_response',\n  $defs: {\n    customer_retrieve_payment_methods_response: {\n      type: 'object',\n      properties: {\n        items: {\n          type: 'array',\n          items: {\n            type: 'object',\n            properties: {\n              payment_method: {\n                type: 'string',\n                description: 'PaymentMethod enum from hyperswitch\\n\\nhttps://github.com/juspay/hyperswitch/blob/ecd05d53c99ae701ac94893ec632a3988afe3238/crates/common_enums/src/enums.rs#L2097',\n                enum: [                  'card',\n                  'card_redirect',\n                  'pay_later',\n                  'wallet',\n                  'bank_redirect',\n                  'bank_transfer',\n                  'crypto',\n                  'bank_debit',\n                  'reward',\n                  'real_time_payment',\n                  'upi',\n                  'voucher',\n                  'gift_card',\n                  'open_banking',\n                  'mobile_payment'\n                ]\n              },\n              payment_method_id: {\n                type: 'string'\n              },\n              card: {\n                type: 'object',\n                properties: {\n                  card_issuing_country: {\n                    $ref: '#/$defs/country_code'\n                  },\n                  card_network: {\n                    type: 'string'\n                  },\n                  card_type: {\n                    type: 'string'\n                  },\n                  expiry_month: {\n                    type: 'string'\n                  },\n                  expiry_year: {\n                    type: 'string'\n                  },\n                  last4_digits: {\n                    type: 'string'\n                  }\n                }\n              },\n              last_used_at: {\n                type: 'string',\n                format: 'date-time'\n              },\n              payment_method_type: {\n                $ref: '#/$defs/payment_method_types'\n              },\n              recurring_enabled: {\n                type: 'boolean'\n              }\n            },\n            required: [              'payment_method',\n              'payment_method_id'\n            ]\n          }\n        }\n      },\n      required: [        'items'\n      ]\n    },\n    country_code: {\n      type: 'string',\n      description: 'ISO country code alpha2 variant',\n      enum: [        'AF',\n        'AX',\n        'AL',\n        'DZ',\n        'AS',\n        'AD',\n        'AO',\n        'AI',\n        'AQ',\n        'AG',\n        'AR',\n        'AM',\n        'AW',\n        'AU',\n        'AT',\n        'AZ',\n        'BS',\n        'BH',\n        'BD',\n        'BB',\n        'BY',\n        'BE',\n        'BZ',\n        'BJ',\n        'BM',\n        'BT',\n        'BO',\n        'BQ',\n        'BA',\n        'BW',\n        'BV',\n        'BR',\n        'IO',\n        'BN',\n        'BG',\n        'BF',\n        'BI',\n        'KH',\n        'CM',\n        'CA',\n        'CV',\n        'KY',\n        'CF',\n        'TD',\n        'CL',\n        'CN',\n        'CX',\n        'CC',\n        'CO',\n        'KM',\n        'CG',\n        'CD',\n        'CK',\n        'CR',\n        'CI',\n        'HR',\n        'CU',\n        'CW',\n        'CY',\n        'CZ',\n        'DK',\n        'DJ',\n        'DM',\n        'DO',\n        'EC',\n        'EG',\n        'SV',\n        'GQ',\n        'ER',\n        'EE',\n        'ET',\n        'FK',\n        'FO',\n        'FJ',\n        'FI',\n        'FR',\n        'GF',\n        'PF',\n        'TF',\n        'GA',\n        'GM',\n        'GE',\n        'DE',\n        'GH',\n        'GI',\n        'GR',\n        'GL',\n        'GD',\n        'GP',\n        'GU',\n        'GT',\n        'GG',\n        'GN',\n        'GW',\n        'GY',\n        'HT',\n        'HM',\n        'VA',\n        'HN',\n        'HK',\n        'HU',\n        'IS',\n        'IN',\n        'ID',\n        'IR',\n        'IQ',\n        'IE',\n        'IM',\n        'IL',\n        'IT',\n        'JM',\n        'JP',\n        'JE',\n        'JO',\n        'KZ',\n        'KE',\n        'KI',\n        'KP',\n        'KR',\n        'KW',\n        'KG',\n        'LA',\n        'LV',\n        'LB',\n        'LS',\n        'LR',\n        'LY',\n        'LI',\n        'LT',\n        'LU',\n        'MO',\n        'MK',\n        'MG',\n        'MW',\n        'MY',\n        'MV',\n        'ML',\n        'MT',\n        'MH',\n        'MQ',\n        'MR',\n        'MU',\n        'YT',\n        'MX',\n        'FM',\n        'MD',\n        'MC',\n        'MN',\n        'ME',\n        'MS',\n        'MA',\n        'MZ',\n        'MM',\n        'NA',\n        'NR',\n        'NP',\n        'NL',\n        'NC',\n        'NZ',\n        'NI',\n        'NE',\n        'NG',\n        'NU',\n        'NF',\n        'MP',\n        'NO',\n        'OM',\n        'PK',\n        'PW',\n        'PS',\n        'PA',\n        'PG',\n        'PY',\n        'PE',\n        'PH',\n        'PN',\n        'PL',\n        'PT',\n        'PR',\n        'QA',\n        'RE',\n        'RO',\n        'RU',\n        'RW',\n        'BL',\n        'SH',\n        'KN',\n        'LC',\n        'MF',\n        'PM',\n        'VC',\n        'WS',\n        'SM',\n        'ST',\n        'SA',\n        'SN',\n        'RS',\n        'SC',\n        'SL',\n        'SG',\n        'SX',\n        'SK',\n        'SI',\n        'SB',\n        'SO',\n        'ZA',\n        'GS',\n        'SS',\n        'ES',\n        'LK',\n        'SD',\n        'SR',\n        'SJ',\n        'SZ',\n        'SE',\n        'CH',\n        'SY',\n        'TW',\n        'TJ',\n        'TZ',\n        'TH',\n        'TL',\n        'TG',\n        'TK',\n        'TO',\n        'TT',\n        'TN',\n        'TR',\n        'TM',\n        'TC',\n        'TV',\n        'UG',\n        'UA',\n        'AE',\n        'GB',\n        'UM',\n        'US',\n        'UY',\n        'UZ',\n        'VU',\n        'VE',\n        'VN',\n        'VG',\n        'VI',\n        'WF',\n        'EH',\n        'YE',\n        'ZM',\n        'ZW'\n      ]\n    },\n    payment_method_types: {\n      type: 'string',\n      enum: [        'credit',\n        'debit',\n        'upi_collect',\n        'upi_intent',\n        'apple_pay',\n        'cashapp',\n        'google_pay',\n        'multibanco',\n        'bancontact_card',\n        'eps',\n        'ideal',\n        'przelewy24',\n        'paypal',\n        'affirm',\n        'klarna',\n        'sepa',\n        'ach',\n        'amazon_pay',\n        'afterpay_clearpay'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      customer_id: {
        type: 'string',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['customer_id'],
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (client: DodoPayments, args: Record<string, unknown> | undefined) => {
  const { customer_id, jq_filter, ...body } = args as any;
  try {
    return asTextContentResult(
      await maybeFilter(jq_filter, await client.customers.retrievePaymentMethods(customer_id)),
    );
  } catch (error) {
    if (error instanceof DodoPayments.APIError || isJqError(error)) {
      return asErrorResult(error.message);
    }
    throw error;
  }
};

export default { metadata, tool, handler };
