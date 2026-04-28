// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as MiscAPI from '../../misc';
import * as LedgerEntriesAPI from './ledger-entries';
import {
  CustomerWalletTransaction,
  CustomerWalletTransactionsDefaultPageNumberPagination,
  LedgerEntries,
  LedgerEntryCreateParams,
  LedgerEntryListParams,
} from './ledger-entries';
import { APIPromise } from '../../../core/api-promise';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

export class Wallets extends APIResource {
  ledgerEntries: LedgerEntriesAPI.LedgerEntries = new LedgerEntriesAPI.LedgerEntries(this._client);

  list(customerID: string, options?: RequestOptions): APIPromise<WalletListResponse> {
    return this._client.get(path`/customers/${customerID}/wallets`, options);
  }
}

export interface CustomerWallet {
  balance: number;

  created_at: string;

  currency: MiscAPI.Currency;

  customer_id: string;

  updated_at: string;
}

export interface WalletListResponse {
  items: Array<CustomerWallet>;

  /**
   * Sum of all wallet balances converted to USD (in smallest unit)
   */
  total_balance_usd: number;
}

Wallets.LedgerEntries = LedgerEntries;

export declare namespace Wallets {
  export { type CustomerWallet as CustomerWallet, type WalletListResponse as WalletListResponse };

  export {
    LedgerEntries as LedgerEntries,
    type CustomerWalletTransaction as CustomerWalletTransaction,
    type CustomerWalletTransactionsDefaultPageNumberPagination as CustomerWalletTransactionsDefaultPageNumberPagination,
    type LedgerEntryCreateParams as LedgerEntryCreateParams,
    type LedgerEntryListParams as LedgerEntryListParams,
  };
}
