// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as MiscAPI from '../../misc';
import * as WalletsAPI from './wallets';
import { APIPromise } from '../../../core/api-promise';
import {
  DefaultPageNumberPagination,
  type DefaultPageNumberPaginationParams,
  PagePromise,
} from '../../../core/pagination';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

export class LedgerEntries extends APIResource {
  create(
    customerID: string,
    body: LedgerEntryCreateParams,
    options?: RequestOptions,
  ): APIPromise<WalletsAPI.CustomerWallet> {
    return this._client.post(path`/customers/${customerID}/wallets/ledger-entries`, { body, ...options });
  }

  list(
    customerID: string,
    query: LedgerEntryListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<CustomerWalletTransactionsDefaultPageNumberPagination, CustomerWalletTransaction> {
    return this._client.getAPIList(
      path`/customers/${customerID}/wallets/ledger-entries`,
      DefaultPageNumberPagination<CustomerWalletTransaction>,
      { query, ...options },
    );
  }
}

export type CustomerWalletTransactionsDefaultPageNumberPagination =
  DefaultPageNumberPagination<CustomerWalletTransaction>;

export interface CustomerWalletTransaction {
  id: string;

  after_balance: number;

  amount: number;

  before_balance: number;

  business_id: string;

  created_at: string;

  currency: MiscAPI.Currency;

  customer_id: string;

  event_type:
    | 'payment'
    | 'payment_reversal'
    | 'refund'
    | 'refund_reversal'
    | 'dispute'
    | 'dispute_reversal'
    | 'merchant_adjustment';

  is_credit: boolean;

  reason?: string | null;

  reference_object_id?: string | null;
}

export interface LedgerEntryCreateParams {
  amount: number;

  /**
   * Currency of the wallet to adjust
   */
  currency: MiscAPI.Currency;

  /**
   * Type of ledger entry - credit or debit
   */
  entry_type: 'credit' | 'debit';

  /**
   * Optional idempotency key to prevent duplicate entries
   */
  idempotency_key?: string | null;

  reason?: string | null;
}

export interface LedgerEntryListParams extends DefaultPageNumberPaginationParams {
  /**
   * Optional currency filter
   */
  currency?: MiscAPI.Currency;
}

export declare namespace LedgerEntries {
  export {
    type CustomerWalletTransaction as CustomerWalletTransaction,
    type CustomerWalletTransactionsDefaultPageNumberPagination as CustomerWalletTransactionsDefaultPageNumberPagination,
    type LedgerEntryCreateParams as LedgerEntryCreateParams,
    type LedgerEntryListParams as LedgerEntryListParams,
  };
}
