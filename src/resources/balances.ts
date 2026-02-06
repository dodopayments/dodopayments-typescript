// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as MiscAPI from './misc';
import {
  DefaultPageNumberPagination,
  type DefaultPageNumberPaginationParams,
  PagePromise,
} from '../core/pagination';
import { RequestOptions } from '../internal/request-options';

export class Balances extends APIResource {
  retrieveLedger(
    query: BalanceRetrieveLedgerParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<BalanceLedgerEntriesDefaultPageNumberPagination, BalanceLedgerEntry> {
    return this._client.getAPIList('/balances/ledger', DefaultPageNumberPagination<BalanceLedgerEntry>, {
      query,
      ...options,
    });
  }
}

export type BalanceLedgerEntriesDefaultPageNumberPagination = DefaultPageNumberPagination<BalanceLedgerEntry>;

export interface BalanceLedgerEntry {
  id: string;

  amount: number;

  business_id: string;

  created_at: string;

  currency: MiscAPI.Currency;

  event_type:
    | 'payment'
    | 'refund'
    | 'refund_reversal'
    | 'dispute'
    | 'dispute_reversal'
    | 'tax'
    | 'tax_reversal'
    | 'payment_fees'
    | 'refund_fees'
    | 'refund_fees_reversal'
    | 'dispute_fees'
    | 'payout'
    | 'payout_fees'
    | 'payout_reversal'
    | 'payout_fees_reversal'
    | 'dodo_credits'
    | 'adjustment'
    | 'currency_conversion';

  is_credit: boolean;

  usd_equivalent_amount: number;

  after_balance?: number | null;

  before_balance?: number | null;

  description?: string | null;

  reference_object_id?: string | null;
}

export interface BalanceRetrieveLedgerParams extends DefaultPageNumberPaginationParams {
  /**
   * Get events after this created time
   */
  created_at_gte?: string;

  /**
   * Get events created before this time
   */
  created_at_lte?: string;

  /**
   * Filter by currency
   */
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
    | 'ZMW';

  /**
   * Filter by Ledger Event Type
   */
  event_type?:
    | 'payment'
    | 'refund'
    | 'refund_reversal'
    | 'dispute'
    | 'dispute_reversal'
    | 'tax'
    | 'tax_reversal'
    | 'payment_fees'
    | 'refund_fees'
    | 'refund_fees_reversal'
    | 'dispute_fees'
    | 'payout'
    | 'payout_fees'
    | 'payout_reversal'
    | 'payout_fees_reversal'
    | 'dodo_credits'
    | 'adjustment'
    | 'currency_conversion';

  /**
   * Min : 1, Max : 100, default 10
   */
  limit?: number;

  /**
   * Get events history of a specific object like payment/subscription/refund/dispute
   */
  reference_object_id?: string;
}

export declare namespace Balances {
  export {
    type BalanceLedgerEntry as BalanceLedgerEntry,
    type BalanceLedgerEntriesDefaultPageNumberPagination as BalanceLedgerEntriesDefaultPageNumberPagination,
    type BalanceRetrieveLedgerParams as BalanceRetrieveLedgerParams,
  };
}
