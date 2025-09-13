// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../resource';
import { isRequestOptions } from '../../../core';
import * as Core from '../../../core';
import * as MiscAPI from '../../misc';
import * as WalletsAPI from './wallets';
import { DefaultPageNumberPagination, type DefaultPageNumberPaginationParams } from '../../../pagination';

export class LedgerEntries extends APIResource {
  create(
    customerId: string,
    body: LedgerEntryCreateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<WalletsAPI.CustomerWallet> {
    return this._client.post(`/customers/${customerId}/wallets/ledger-entries`, { body, ...options });
  }

  list(
    customerId: string,
    query?: LedgerEntryListParams,
    options?: Core.RequestOptions,
  ): Core.PagePromise<CustomerWalletTransactionsDefaultPageNumberPagination, CustomerWalletTransaction>;
  list(
    customerId: string,
    options?: Core.RequestOptions,
  ): Core.PagePromise<CustomerWalletTransactionsDefaultPageNumberPagination, CustomerWalletTransaction>;
  list(
    customerId: string,
    query: LedgerEntryListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.PagePromise<CustomerWalletTransactionsDefaultPageNumberPagination, CustomerWalletTransaction> {
    if (isRequestOptions(query)) {
      return this.list(customerId, {}, query);
    }
    return this._client.getAPIList(
      `/customers/${customerId}/wallets/ledger-entries`,
      CustomerWalletTransactionsDefaultPageNumberPagination,
      { query, ...options },
    );
  }
}

export class CustomerWalletTransactionsDefaultPageNumberPagination extends DefaultPageNumberPagination<CustomerWalletTransaction> {}

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

LedgerEntries.CustomerWalletTransactionsDefaultPageNumberPagination =
  CustomerWalletTransactionsDefaultPageNumberPagination;

export declare namespace LedgerEntries {
  export {
    type CustomerWalletTransaction as CustomerWalletTransaction,
    CustomerWalletTransactionsDefaultPageNumberPagination as CustomerWalletTransactionsDefaultPageNumberPagination,
    type LedgerEntryCreateParams as LedgerEntryCreateParams,
    type LedgerEntryListParams as LedgerEntryListParams,
  };
}
