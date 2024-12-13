// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import { isRequestOptions } from '../core';
import * as Core from '../core';
import * as DisputesAPI from './disputes';
import * as RefundsAPI from './refunds';
import * as SupportedCountriesAPI from './checkout/supported-countries';
import { PageNumberPage, type PageNumberPageParams } from '../pagination';

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
  ): Core.PagePromise<PaymentListResponsesPageNumberPage, PaymentListResponse>;
  list(
    options?: Core.RequestOptions,
  ): Core.PagePromise<PaymentListResponsesPageNumberPage, PaymentListResponse>;
  list(
    query: PaymentListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.PagePromise<PaymentListResponsesPageNumberPage, PaymentListResponse> {
    if (isRequestOptions(query)) {
      return this.list({}, query);
    }
    return this._client.getAPIList('/payments', PaymentListResponsesPageNumberPage, { query, ...options });
  }
}

export class PaymentListResponsesPageNumberPage extends PageNumberPage<PaymentListResponse> {}

export interface Payment {
  business_id: string;

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

  disputes: Array<DisputesAPI.Dispute>;

  payment_id: string;

  refunds: Array<RefundsAPI.Refund>;

  /**
   * Total amount taken from the customer including tax
   */
  total_amount: number;

  payment_link?: string | null;

  payment_method?: string | null;

  payment_method_type?: string | null;

  /**
   * Product Cart of One time payment. In case of subscription/recurring payment
   * product id and quantity are available in Get Subscription Api
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

  subscription_id?: string | null;

  /**
   * Tax collected in this transaction
   */
  tax?: number | null;

  updated_at?: string | null;
}

export namespace Payment {
  export interface Customer {
    customer_id: string;

    email: string;

    name: string;
  }

  export interface ProductCart {
    product_id: string;

    quantity: number;
  }
}

export interface PaymentCreateResponse {
  client_secret: string;

  customer: PaymentCreateResponse.Customer;

  payment_id: string;

  total_amount: number;

  payment_link?: string | null;

  product_cart?: Array<PaymentCreateResponse.ProductCart> | null;
}

export namespace PaymentCreateResponse {
  export interface Customer {
    customer_id: string;

    email: string;

    name: string;
  }

  export interface ProductCart {
    product_id: string;

    quantity: number;
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
    customer_id: string;

    email: string;

    name: string;
  }
}

export interface PaymentCreateParams {
  billing: PaymentCreateParams.Billing;

  customer: PaymentCreateParams.Customer;

  product_cart: Array<PaymentCreateParams.ProductCart>;

  payment_link?: boolean | null;

  return_url?: string | null;
}

export namespace PaymentCreateParams {
  export interface Billing {
    city: string;

    /**
     * ISO country code alpha2 variant
     */
    country: SupportedCountriesAPI.CountryCodeAlpha2;

    state: string;

    street: string;

    zipcode: number;
  }

  export interface Customer {
    email: string;

    name: string;

    phone_number?: string | null;
  }

  export interface ProductCart {
    product_id: string;

    quantity: number;
  }
}

export interface PaymentListParams extends PageNumberPageParams {}

Payments.PaymentListResponsesPageNumberPage = PaymentListResponsesPageNumberPage;

export declare namespace Payments {
  export {
    type Payment as Payment,
    type PaymentCreateResponse as PaymentCreateResponse,
    type PaymentListResponse as PaymentListResponse,
    PaymentListResponsesPageNumberPage as PaymentListResponsesPageNumberPage,
    type PaymentCreateParams as PaymentCreateParams,
    type PaymentListParams as PaymentListParams,
  };
}
