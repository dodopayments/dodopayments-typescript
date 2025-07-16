// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'dodopayments-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import DodoPayments from 'dodopayments';

export const metadata: Metadata = {
  resource: 'products',
  operation: 'write',
  tags: [],
  httpMethod: 'patch',
  httpPath: '/products/{id}',
  operationId: 'patch_product',
};

export const tool: Tool = {
  name: 'update_products',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\n\n\n# Response Schema\n```json\n{\n  type: 'object',\n  properties: {}\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
      },
      addons: {
        type: 'array',
        description: 'Available Addons for subscription products',
        items: {
          type: 'string',
        },
      },
      brand_id: {
        type: 'string',
      },
      description: {
        type: 'string',
        description: 'Description of the product, optional and must be at most 1000 characters.',
      },
      digital_product_delivery: {
        type: 'object',
        description: 'Choose how you would like you digital product delivered',
        properties: {
          external_url: {
            type: 'string',
            description: 'External URL to digital product',
          },
          files: {
            type: 'array',
            description: 'Uploaded files ids of digital product',
            items: {
              type: 'string',
            },
          },
          instructions: {
            type: 'string',
            description: 'Instructions to download and use the digital product',
          },
        },
        required: [],
      },
      image_id: {
        type: 'string',
        description: 'Product image id after its uploaded to S3',
      },
      license_key_activation_message: {
        type: 'string',
        description:
          'Message sent to the customer upon license key activation.\n\nOnly applicable if `license_key_enabled` is `true`. This message contains instructions for\nactivating the license key.',
      },
      license_key_activations_limit: {
        type: 'integer',
        description:
          'Limit for the number of activations for the license key.\n\nOnly applicable if `license_key_enabled` is `true`. Represents the maximum number of times\nthe license key can be activated.',
      },
      license_key_duration: {
        $ref: '#/$defs/license_key_duration',
      },
      license_key_enabled: {
        type: 'boolean',
        description:
          'Whether the product requires a license key.\n\nIf `true`, additional fields related to license key (duration, activations limit, activation message)\nbecome applicable.',
      },
      name: {
        type: 'string',
        description: 'Name of the product, optional and must be at most 100 characters.',
      },
      price: {
        $ref: '#/$defs/price',
      },
      tax_category: {
        $ref: '#/$defs/tax_category',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    $defs: {
      license_key_duration: {
        type: 'object',
        properties: {
          count: {
            type: 'integer',
          },
          interval: {
            $ref: '#/$defs/time_interval',
          },
        },
        required: ['count', 'interval'],
      },
      time_interval: {
        type: 'string',
        enum: ['Day', 'Week', 'Month', 'Year'],
      },
      price: {
        anyOf: [
          {
            type: 'object',
            title: 'One Time Price',
            description: 'One-time price details.',
            properties: {
              currency: {
                $ref: '#/$defs/currency',
              },
              discount: {
                type: 'number',
                description: 'Discount applied to the price, represented as a percentage (0 to 100).',
              },
              price: {
                type: 'integer',
                description:
                  'The payment amount, in the smallest denomination of the currency (e.g., cents for USD).\nFor example, to charge $1.00, pass `100`.\n\nIf [`pay_what_you_want`](Self::pay_what_you_want) is set to `true`, this field represents\nthe **minimum** amount the customer must pay.',
              },
              purchasing_power_parity: {
                type: 'boolean',
                description:
                  'Indicates if purchasing power parity adjustments are applied to the price.\nPurchasing power parity feature is not available as of now.',
              },
              type: {
                type: 'string',
                enum: ['one_time_price'],
              },
              pay_what_you_want: {
                type: 'boolean',
                description:
                  'Indicates whether the customer can pay any amount they choose.\nIf set to `true`, the [`price`](Self::price) field is the minimum amount.',
              },
              suggested_price: {
                type: 'integer',
                description:
                  'A suggested price for the user to pay. This value is only considered if\n[`pay_what_you_want`](Self::pay_what_you_want) is `true`. Otherwise, it is ignored.',
              },
              tax_inclusive: {
                type: 'boolean',
                description: 'Indicates if the price is tax inclusive.',
              },
            },
            required: ['currency', 'discount', 'price', 'purchasing_power_parity', 'type'],
          },
          {
            type: 'object',
            title: 'Recurring Price',
            description: 'Recurring price details.',
            properties: {
              currency: {
                $ref: '#/$defs/currency',
              },
              discount: {
                type: 'number',
                description: 'Discount applied to the price, represented as a percentage (0 to 100).',
              },
              payment_frequency_count: {
                type: 'integer',
                description:
                  'Number of units for the payment frequency.\nFor example, a value of `1` with a `payment_frequency_interval` of `month` represents monthly payments.',
              },
              payment_frequency_interval: {
                $ref: '#/$defs/time_interval',
              },
              price: {
                type: 'integer',
                description:
                  'The payment amount. Represented in the lowest denomination of the currency (e.g., cents for USD).\nFor example, to charge $1.00, pass `100`.',
              },
              purchasing_power_parity: {
                type: 'boolean',
                description:
                  'Indicates if purchasing power parity adjustments are applied to the price.\nPurchasing power parity feature is not available as of now',
              },
              subscription_period_count: {
                type: 'integer',
                description:
                  'Number of units for the subscription period.\nFor example, a value of `12` with a `subscription_period_interval` of `month` represents a one-year subscription.',
              },
              subscription_period_interval: {
                $ref: '#/$defs/time_interval',
              },
              type: {
                type: 'string',
                enum: ['recurring_price'],
              },
              tax_inclusive: {
                type: 'boolean',
                description: 'Indicates if the price is tax inclusive',
              },
              trial_period_days: {
                type: 'integer',
                description: 'Number of days for the trial period. A value of `0` indicates no trial period.',
              },
            },
            required: [
              'currency',
              'discount',
              'payment_frequency_count',
              'payment_frequency_interval',
              'price',
              'purchasing_power_parity',
              'subscription_period_count',
              'subscription_period_interval',
              'type',
            ],
          },
        ],
        description: 'One-time price details.',
      },
      currency: {
        type: 'string',
        enum: [
          'AED',
          'ALL',
          'AMD',
          'ANG',
          'AOA',
          'ARS',
          'AUD',
          'AWG',
          'AZN',
          'BAM',
          'BBD',
          'BDT',
          'BGN',
          'BHD',
          'BIF',
          'BMD',
          'BND',
          'BOB',
          'BRL',
          'BSD',
          'BWP',
          'BYN',
          'BZD',
          'CAD',
          'CHF',
          'CLP',
          'CNY',
          'COP',
          'CRC',
          'CUP',
          'CVE',
          'CZK',
          'DJF',
          'DKK',
          'DOP',
          'DZD',
          'EGP',
          'ETB',
          'EUR',
          'FJD',
          'FKP',
          'GBP',
          'GEL',
          'GHS',
          'GIP',
          'GMD',
          'GNF',
          'GTQ',
          'GYD',
          'HKD',
          'HNL',
          'HRK',
          'HTG',
          'HUF',
          'IDR',
          'ILS',
          'INR',
          'IQD',
          'JMD',
          'JOD',
          'JPY',
          'KES',
          'KGS',
          'KHR',
          'KMF',
          'KRW',
          'KWD',
          'KYD',
          'KZT',
          'LAK',
          'LBP',
          'LKR',
          'LRD',
          'LSL',
          'LYD',
          'MAD',
          'MDL',
          'MGA',
          'MKD',
          'MMK',
          'MNT',
          'MOP',
          'MRU',
          'MUR',
          'MVR',
          'MWK',
          'MXN',
          'MYR',
          'MZN',
          'NAD',
          'NGN',
          'NIO',
          'NOK',
          'NPR',
          'NZD',
          'OMR',
          'PAB',
          'PEN',
          'PGK',
          'PHP',
          'PKR',
          'PLN',
          'PYG',
          'QAR',
          'RON',
          'RSD',
          'RUB',
          'RWF',
          'SAR',
          'SBD',
          'SCR',
          'SEK',
          'SGD',
          'SHP',
          'SLE',
          'SLL',
          'SOS',
          'SRD',
          'SSP',
          'STN',
          'SVC',
          'SZL',
          'THB',
          'TND',
          'TOP',
          'TRY',
          'TTD',
          'TWD',
          'TZS',
          'UAH',
          'UGX',
          'USD',
          'UYU',
          'UZS',
          'VES',
          'VND',
          'VUV',
          'WST',
          'XAF',
          'XCD',
          'XOF',
          'XPF',
          'YER',
          'ZAR',
          'ZMW',
        ],
      },
      tax_category: {
        type: 'string',
        description:
          'Represents the different categories of taxation applicable to various products and services.',
        enum: ['digital_products', 'saas', 'e_book', 'edtech'],
      },
    },
  },
};

export const handler = async (client: DodoPayments, args: Record<string, unknown> | undefined) => {
  const { id, ...body } = args as any;
  const response = await client.products.update(id, body).asResponse();
  return asTextContentResult(await response.text());
};

export default { metadata, tool, handler };
