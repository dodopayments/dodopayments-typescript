// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import { isRequestOptions } from '../core';
import * as Core from '../core';
import { DefaultPageNumberPagination, type DefaultPageNumberPaginationParams } from '../pagination';

export class Payouts extends APIResource {
  list(
    query?: PayoutListParams,
    options?: Core.RequestOptions,
  ): Core.PagePromise<PayoutListResponsesDefaultPageNumberPagination, PayoutListResponse>;
  list(
    options?: Core.RequestOptions,
  ): Core.PagePromise<PayoutListResponsesDefaultPageNumberPagination, PayoutListResponse>;
  list(
    query: PayoutListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.PagePromise<PayoutListResponsesDefaultPageNumberPagination, PayoutListResponse> {
    if (isRequestOptions(query)) {
      return this.list({}, query);
    }
    return this._client.getAPIList('/payouts', PayoutListResponsesDefaultPageNumberPagination, {
      query,
      ...options,
    });
  }
}

export class PayoutListResponsesDefaultPageNumberPagination extends DefaultPageNumberPagination<PayoutListResponse> {}

export interface PayoutListResponse {
  /**
   * The total amount of the payout.
   */
  amount: number;

  /**
   * The unique identifier of the business associated with the payout.
   */
  business_id: string;

  /**
   * The total value of chargebacks associated with the payout.
   */
  chargebacks: number;

  /**
   * The timestamp when the payout was created, in UTC.
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

  /**
   * The fee charged for processing the payout.
   */
  fee: number;

  /**
   * The payment method used for the payout (e.g., bank transfer, card, etc.).
   */
  payment_method: string;

  /**
   * The unique identifier of the payout.
   */
  payout_id: string;

  /**
   * The total value of refunds associated with the payout.
   */
  refunds: number;

  status: 'in_progress' | 'failed' | 'success';

  /**
   * The tax applied to the payout.
   */
  tax: number;

  /**
   * The timestamp when the payout was last updated, in UTC.
   */
  updated_at: string;

  /**
   * The name of the payout recipient or purpose.
   */
  name?: string | null;

  /**
   * The URL of the document associated with the payout.
   */
  payout_document_url?: string | null;

  /**
   * Any additional remarks or notes associated with the payout.
   */
  remarks?: string | null;
}

export interface PayoutListParams extends DefaultPageNumberPaginationParams {}

Payouts.PayoutListResponsesDefaultPageNumberPagination = PayoutListResponsesDefaultPageNumberPagination;

export declare namespace Payouts {
  export {
    type PayoutListResponse as PayoutListResponse,
    PayoutListResponsesDefaultPageNumberPagination as PayoutListResponsesDefaultPageNumberPagination,
    type PayoutListParams as PayoutListParams,
  };
}
