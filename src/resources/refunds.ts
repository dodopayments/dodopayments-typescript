// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import { isRequestOptions } from '../core';
import * as Core from '../core';
import { DefaultPageNumberPagination, type DefaultPageNumberPaginationParams } from '../pagination';

export class Refunds extends APIResource {
  create(body: RefundCreateParams, options?: Core.RequestOptions): Core.APIPromise<Refund> {
    return this._client.post('/refunds', { body, ...options });
  }

  retrieve(refundId: string, options?: Core.RequestOptions): Core.APIPromise<Refund> {
    return this._client.get(`/refunds/${refundId}`, options);
  }

  list(
    query?: RefundListParams,
    options?: Core.RequestOptions,
  ): Core.PagePromise<RefundsDefaultPageNumberPagination, Refund>;
  list(options?: Core.RequestOptions): Core.PagePromise<RefundsDefaultPageNumberPagination, Refund>;
  list(
    query: RefundListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.PagePromise<RefundsDefaultPageNumberPagination, Refund> {
    if (isRequestOptions(query)) {
      return this.list({}, query);
    }
    return this._client.getAPIList('/refunds', RefundsDefaultPageNumberPagination, { query, ...options });
  }
}

export class RefundsDefaultPageNumberPagination extends DefaultPageNumberPagination<Refund> {}

export interface Refund {
  /**
   * The unique identifier of the business issuing the refund.
   */
  business_id: string;

  /**
   * The timestamp of when the refund was created in UTC.
   */
  created_at: string;

  /**
   * The unique identifier of the payment associated with the refund.
   */
  payment_id: string;

  /**
   * The unique identifier of the refund.
   */
  refund_id: string;

  status: 'succeeded' | 'failed' | 'pending' | 'review';

  /**
   * The refunded amount.
   */
  amount?: number | null;

  currency?:
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
    | 'ZMW'
    | null;

  /**
   * The reason provided for the refund, if any. Optional.
   */
  reason?: string | null;
}

export interface RefundCreateParams {
  /**
   * The unique identifier of the payment to be refunded.
   */
  payment_id: string;

  /**
   * The amount to be refunded. Must be non-negative. Optional. Partial refunds are
   * currently disabled.
   */
  amount?: number | null;

  /**
   * The reason for the refund, if any. Maximum length is 3000 characters. Optional.
   */
  reason?: string | null;
}

export interface RefundListParams extends DefaultPageNumberPaginationParams {}

Refunds.RefundsDefaultPageNumberPagination = RefundsDefaultPageNumberPagination;

export declare namespace Refunds {
  export {
    type Refund as Refund,
    RefundsDefaultPageNumberPagination as RefundsDefaultPageNumberPagination,
    type RefundCreateParams as RefundCreateParams,
    type RefundListParams as RefundListParams,
  };
}
