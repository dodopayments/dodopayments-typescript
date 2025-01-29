// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import { isRequestOptions } from '../core';
import * as Core from '../core';
import * as DisputesAPI from './disputes';
import * as RefundsAPI from './refunds';
import * as SupportedCountriesAPI from './misc/supported-countries';
import { DefaultPageNumberPagination, type DefaultPageNumberPaginationParams } from '../pagination';

export class Payments extends APIResource {
  create(body: PaymentCreateParams, options?: Core.RequestOptions): Core.APIPromise<PaymentCreateResponse> {
    return this._client.post('/payments', { body, ...options });
  }

  retrieve(paymentId: string, options?: Core.RequestOptions): Core.APIPromise<Payment> {
    return this._client.get(`/payments/${paymentId}`, options);
  }

  list(
    query?: PaymentListParams,
    options?: Core.RequestOptions,
  ): Core.PagePromise<PaymentListResponsesDefaultPageNumberPagination, PaymentListResponse>;
  list(
    options?: Core.RequestOptions,
  ): Core.PagePromise<PaymentListResponsesDefaultPageNumberPagination, PaymentListResponse>;
  list(
    query: PaymentListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.PagePromise<PaymentListResponsesDefaultPageNumberPagination, PaymentListResponse> {
    if (isRequestOptions(query)) {
      return this.list({}, query);
    }
    return this._client.getAPIList('/payments', PaymentListResponsesDefaultPageNumberPagination, {
      query,
      ...options,
    });
  }
}

export class PaymentListResponsesDefaultPageNumberPagination extends DefaultPageNumberPagination<PaymentListResponse> {}

export interface Payment {
  /**
   * Identifier of the business associated with the payment
   */
  business_id: string;

  /**
   * Timestamp when the payment was created
   */
  created_at: string;

  currency:
    | 'AED'
    | 'ALL'
    | 'AMD'
    | 'ANG'
    | 'AOA'
    | 'ARS'
    | 'AUD'
    | 'AWG'
    | 'AZN'
    | 'BAM'
    | 'BBD'
    | 'BDT'
    | 'BGN'
    | 'BHD'
    | 'BIF'
    | 'BMD'
    | 'BND'
    | 'BOB'
    | 'BRL'
    | 'BSD'
    | 'BWP'
    | 'BYN'
    | 'BZD'
    | 'CAD'
    | 'CHF'
    | 'CLP'
    | 'CNY'
    | 'COP'
    | 'CRC'
    | 'CUP'
    | 'CVE'
    | 'CZK'
    | 'DJF'
    | 'DKK'
    | 'DOP'
    | 'DZD'
    | 'EGP'
    | 'ETB'
    | 'EUR'
    | 'FJD'
    | 'FKP'
    | 'GBP'
    | 'GEL'
    | 'GHS'
    | 'GIP'
    | 'GMD'
    | 'GNF'
    | 'GTQ'
    | 'GYD'
    | 'HKD'
    | 'HNL'
    | 'HRK'
    | 'HTG'
    | 'HUF'
    | 'IDR'
    | 'ILS'
    | 'INR'
    | 'IQD'
    | 'JMD'
    | 'JOD'
    | 'JPY'
    | 'KES'
    | 'KGS'
    | 'KHR'
    | 'KMF'
    | 'KRW'
    | 'KWD'
    | 'KYD'
    | 'KZT'
    | 'LAK'
    | 'LBP'
    | 'LKR'
    | 'LRD'
    | 'LSL'
    | 'LYD'
    | 'MAD'
    | 'MDL'
    | 'MGA'
    | 'MKD'
    | 'MMK'
    | 'MNT'
    | 'MOP'
    | 'MRU'
    | 'MUR'
    | 'MVR'
    | 'MWK'
    | 'MXN'
    | 'MYR'
    | 'MZN'
    | 'NAD'
    | 'NGN'
    | 'NIO'
    | 'NOK'
    | 'NPR'
    | 'NZD'
    | 'OMR'
    | 'PAB'
    | 'PEN'
    | 'PGK'
    | 'PHP'
    | 'PKR'
    | 'PLN'
    | 'PYG'
    | 'QAR'
    | 'RON'
    | 'RSD'
    | 'RUB'
    | 'RWF'
    | 'SAR'
    | 'SBD'
    | 'SCR'
    | 'SEK'
    | 'SGD'
    | 'SHP'
    | 'SLE'
    | 'SLL'
    | 'SOS'
    | 'SRD'
    | 'SSP'
    | 'STN'
    | 'SVC'
    | 'SZL'
    | 'THB'
    | 'TND'
    | 'TOP'
    | 'TRY'
    | 'TTD'
    | 'TWD'
    | 'TZS'
    | 'UAH'
    | 'UGX'
    | 'USD'
    | 'UYU'
    | 'UZS'
    | 'VES'
    | 'VND'
    | 'VUV'
    | 'WST'
    | 'XAF'
    | 'XCD'
    | 'XOF'
    | 'XPF'
    | 'YER'
    | 'ZAR'
    | 'ZMW';

  customer: Payment.Customer;

  /**
   * List of disputes associated with this payment
   */
  disputes: Array<DisputesAPI.Dispute>;

  metadata: Record<string, string>;

  /**
   * Unique identifier for the payment
   */
  payment_id: string;

  /**
   * List of refunds issued for this payment
   */
  refunds: Array<RefundsAPI.Refund>;

  /**
   * Total amount charged to the customer including tax, in smallest currency unit
   * (e.g. cents)
   */
  total_amount: number;

  /**
   * Checkout URL
   */
  payment_link?: string | null;

  /**
   * Payment method used by customer (e.g. "card", "bank_transfer")
   */
  payment_method?: string | null;

  /**
   * Specific type of payment method (e.g. "visa", "mastercard")
   */
  payment_method_type?: string | null;

  /**
   * List of products purchased in a one-time payment
   */
  product_cart?: Array<Payment.ProductCart> | null;

  status?:
    | 'succeeded'
    | 'failed'
    | 'cancelled'
    | 'processing'
    | 'requires_customer_action'
    | 'requires_merchant_action'
    | 'requires_payment_method'
    | 'requires_confirmation'
    | 'requires_capture'
    | 'partially_captured'
    | 'partially_captured_and_capturable'
    | null;

  /**
   * Identifier of the subscription if payment is part of a subscription
   */
  subscription_id?: string | null;

  /**
   * Amount of tax collected in smallest currency unit (e.g. cents)
   */
  tax?: number | null;

  /**
   * Timestamp when the payment was last updated
   */
  updated_at?: string | null;
}

export namespace Payment {
  export interface Customer {
    /**
     * Unique identifier for the customer
     */
    customer_id: string;

    /**
     * Email address of the customer
     */
    email: string;

    /**
     * Full name of the customer
     */
    name: string;
  }

  export interface ProductCart {
    product_id: string;

    quantity: number;
  }
}

export interface PaymentCreateResponse {
  /**
   * Client secret used to load Dodo checkout SDK NOTE : Dodo checkout SDK will be
   * coming soon
   */
  client_secret: string;

  customer: PaymentCreateResponse.Customer;

  metadata: Record<string, string>;

  /**
   * Unique identifier for the payment
   */
  payment_id: string;

  /**
   * Total amount of the payment in smallest currency unit (e.g. cents)
   */
  total_amount: number;

  /**
   * Optional URL to a hosted payment page
   */
  payment_link?: string | null;

  /**
   * Optional list of products included in the payment
   */
  product_cart?: Array<PaymentCreateResponse.ProductCart> | null;
}

export namespace PaymentCreateResponse {
  export interface Customer {
    /**
     * Unique identifier for the customer
     */
    customer_id: string;

    /**
     * Email address of the customer
     */
    email: string;

    /**
     * Full name of the customer
     */
    name: string;
  }

  export interface ProductCart {
    product_id: string;

    quantity: number;

    /**
     * Amount the customer pays if pay_what_you_want is enabled. If disabled then
     * amount will be ignored
     */
    amount?: number | null;
  }
}

export interface PaymentListResponse {
  created_at: string;

  currency:
    | 'AED'
    | 'ALL'
    | 'AMD'
    | 'ANG'
    | 'AOA'
    | 'ARS'
    | 'AUD'
    | 'AWG'
    | 'AZN'
    | 'BAM'
    | 'BBD'
    | 'BDT'
    | 'BGN'
    | 'BHD'
    | 'BIF'
    | 'BMD'
    | 'BND'
    | 'BOB'
    | 'BRL'
    | 'BSD'
    | 'BWP'
    | 'BYN'
    | 'BZD'
    | 'CAD'
    | 'CHF'
    | 'CLP'
    | 'CNY'
    | 'COP'
    | 'CRC'
    | 'CUP'
    | 'CVE'
    | 'CZK'
    | 'DJF'
    | 'DKK'
    | 'DOP'
    | 'DZD'
    | 'EGP'
    | 'ETB'
    | 'EUR'
    | 'FJD'
    | 'FKP'
    | 'GBP'
    | 'GEL'
    | 'GHS'
    | 'GIP'
    | 'GMD'
    | 'GNF'
    | 'GTQ'
    | 'GYD'
    | 'HKD'
    | 'HNL'
    | 'HRK'
    | 'HTG'
    | 'HUF'
    | 'IDR'
    | 'ILS'
    | 'INR'
    | 'IQD'
    | 'JMD'
    | 'JOD'
    | 'JPY'
    | 'KES'
    | 'KGS'
    | 'KHR'
    | 'KMF'
    | 'KRW'
    | 'KWD'
    | 'KYD'
    | 'KZT'
    | 'LAK'
    | 'LBP'
    | 'LKR'
    | 'LRD'
    | 'LSL'
    | 'LYD'
    | 'MAD'
    | 'MDL'
    | 'MGA'
    | 'MKD'
    | 'MMK'
    | 'MNT'
    | 'MOP'
    | 'MRU'
    | 'MUR'
    | 'MVR'
    | 'MWK'
    | 'MXN'
    | 'MYR'
    | 'MZN'
    | 'NAD'
    | 'NGN'
    | 'NIO'
    | 'NOK'
    | 'NPR'
    | 'NZD'
    | 'OMR'
    | 'PAB'
    | 'PEN'
    | 'PGK'
    | 'PHP'
    | 'PKR'
    | 'PLN'
    | 'PYG'
    | 'QAR'
    | 'RON'
    | 'RSD'
    | 'RUB'
    | 'RWF'
    | 'SAR'
    | 'SBD'
    | 'SCR'
    | 'SEK'
    | 'SGD'
    | 'SHP'
    | 'SLE'
    | 'SLL'
    | 'SOS'
    | 'SRD'
    | 'SSP'
    | 'STN'
    | 'SVC'
    | 'SZL'
    | 'THB'
    | 'TND'
    | 'TOP'
    | 'TRY'
    | 'TTD'
    | 'TWD'
    | 'TZS'
    | 'UAH'
    | 'UGX'
    | 'USD'
    | 'UYU'
    | 'UZS'
    | 'VES'
    | 'VND'
    | 'VUV'
    | 'WST'
    | 'XAF'
    | 'XCD'
    | 'XOF'
    | 'XPF'
    | 'YER'
    | 'ZAR'
    | 'ZMW';

  customer: PaymentListResponse.Customer;

  metadata: Record<string, string>;

  payment_id: string;

  total_amount: number;

  payment_method?: string | null;

  payment_method_type?: string | null;

  status?:
    | 'succeeded'
    | 'failed'
    | 'cancelled'
    | 'processing'
    | 'requires_customer_action'
    | 'requires_merchant_action'
    | 'requires_payment_method'
    | 'requires_confirmation'
    | 'requires_capture'
    | 'partially_captured'
    | 'partially_captured_and_capturable'
    | null;

  subscription_id?: string | null;
}

export namespace PaymentListResponse {
  export interface Customer {
    /**
     * Unique identifier for the customer
     */
    customer_id: string;

    /**
     * Email address of the customer
     */
    email: string;

    /**
     * Full name of the customer
     */
    name: string;
  }
}

export interface PaymentCreateParams {
  billing: PaymentCreateParams.Billing;

  customer: PaymentCreateParams.AttachExistingCustomer | PaymentCreateParams.CreateNewCustomer;

  /**
   * List of products in the cart. Must contain at least 1 and at most 100 items.
   */
  product_cart: Array<PaymentCreateParams.ProductCart>;

  metadata?: Record<string, string>;

  /**
   * Whether to generate a payment link. Defaults to false if not specified.
   */
  payment_link?: boolean | null;

  /**
   * Optional URL to redirect the customer after payment. Must be a valid URL if
   * provided.
   */
  return_url?: string | null;
}

export namespace PaymentCreateParams {
  export interface Billing {
    /**
     * City name
     */
    city: string;

    /**
     * ISO country code alpha2 variant
     */
    country: SupportedCountriesAPI.CountryCode;

    /**
     * State or province name
     */
    state: string;

    /**
     * Street address including house number and unit/apartment if applicable
     */
    street: string;

    /**
     * Postal code or ZIP code
     */
    zipcode: string;
  }

  export interface AttachExistingCustomer {
    customer_id: string;
  }

  export interface CreateNewCustomer {
    email: string;

    name: string;

    /**
     * When false, the most recently created customer object with the given email is
     * used if exists. When true, a new customer object is always created False by
     * default
     */
    create_new_customer?: boolean;

    phone_number?: string | null;
  }

  export interface ProductCart {
    product_id: string;

    quantity: number;

    /**
     * Amount the customer pays if pay_what_you_want is enabled. If disabled then
     * amount will be ignored
     */
    amount?: number | null;
  }
}

export interface PaymentListParams extends DefaultPageNumberPaginationParams {
  /**
   * Get events after this created time
   */
  created_at_gte?: string | null;

  /**
   * Get events created before this time
   */
  created_at_lte?: string | null;

  /**
   * Filter by customer id
   */
  customer_id?: string | null;

  /**
   * Filter by status
   */
  status?:
    | 'succeeded'
    | 'failed'
    | 'cancelled'
    | 'processing'
    | 'requires_customer_action'
    | 'requires_merchant_action'
    | 'requires_payment_method'
    | 'requires_confirmation'
    | 'requires_capture'
    | 'partially_captured'
    | 'partially_captured_and_capturable'
    | null;
}

Payments.PaymentListResponsesDefaultPageNumberPagination = PaymentListResponsesDefaultPageNumberPagination;

export declare namespace Payments {
  export {
    type Payment as Payment,
    type PaymentCreateResponse as PaymentCreateResponse,
    type PaymentListResponse as PaymentListResponse,
    PaymentListResponsesDefaultPageNumberPagination as PaymentListResponsesDefaultPageNumberPagination,
    type PaymentCreateParams as PaymentCreateParams,
    type PaymentListParams as PaymentListParams,
  };
}
