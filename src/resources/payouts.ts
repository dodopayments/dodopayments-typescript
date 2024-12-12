// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import { isRequestOptions } from '../core';
import * as Core from '../core';

export class Payouts extends APIResource {
  list(query?: PayoutListParams, options?: Core.RequestOptions): Core.APIPromise<PayoutListResponse>;
  list(options?: Core.RequestOptions): Core.APIPromise<PayoutListResponse>;
  list(
    query: PayoutListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.APIPromise<PayoutListResponse> {
    if (isRequestOptions(query)) {
      return this.list({}, query);
    }
    return this._client.get('/payouts', { query, ...options });
  }
}

export interface PayoutListResponse {
  items: Array<PayoutListResponse.Item>;
}

export namespace PayoutListResponse {
  export interface Item {
    amount: number;

    business_id: string;

    chargebacks: number;

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

    fee: number;

    payment_method: string;

    payout_id: string;

    refunds: number;

    status: 'in_progress' | 'failed' | 'success';

    tax: number;

    updated_at: string;

    name?: string | null;

    payout_document_url?: string | null;

    remarks?: string | null;
  }
}

export interface PayoutListParams {
  /**
   * Page number default is 0
   */
  page_number?: number | null;

  /**
   * Page size default is 10 max is 100
   */
  page_size?: number | null;
}

export declare namespace Payouts {
  export { type PayoutListResponse as PayoutListResponse, type PayoutListParams as PayoutListParams };
}
