// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import {
  DefaultPageNumberPagination,
  type DefaultPageNumberPaginationParams,
  PagePromise,
} from '../../core/pagination';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Balances extends APIResource {
  /**
   * Returns the credit balance details for a specific customer and credit
   * entitlement.
   *
   * # Authentication
   *
   * Requires an API key with `Viewer` role or higher.
   *
   * # Path Parameters
   *
   * - `credit_entitlement_id` - The unique identifier of the credit entitlement
   * - `customer_id` - The unique identifier of the customer
   *
   * # Responses
   *
   * - `200 OK` - Returns the customer's balance
   * - `404 Not Found` - Credit entitlement or customer balance not found
   * - `500 Internal Server Error` - Database or server error
   */
  retrieve(
    customerID: string,
    params: BalanceRetrieveParams,
    options?: RequestOptions,
  ): APIPromise<CustomerCreditBalance> {
    const { credit_entitlement_id } = params;
    return this._client.get(
      path`/credit-entitlements/${credit_entitlement_id}/balances/${customerID}`,
      options,
    );
  }

  /**
   * Returns a paginated list of customer credit balances for the given credit
   * entitlement.
   *
   * # Authentication
   *
   * Requires an API key with `Viewer` role or higher.
   *
   * # Path Parameters
   *
   * - `credit_entitlement_id` - The unique identifier of the credit entitlement
   *
   * # Query Parameters
   *
   * - `page_size` - Number of items per page (default: 10, max: 100)
   * - `page_number` - Zero-based page number (default: 0)
   * - `customer_id` - Optional filter by specific customer
   *
   * # Responses
   *
   * - `200 OK` - Returns list of customer balances
   * - `404 Not Found` - Credit entitlement not found
   * - `500 Internal Server Error` - Database or server error
   */
  list(
    creditEntitlementID: string,
    query: BalanceListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<CustomerCreditBalancesDefaultPageNumberPagination, CustomerCreditBalance> {
    return this._client.getAPIList(
      path`/credit-entitlements/${creditEntitlementID}/balances`,
      DefaultPageNumberPagination<CustomerCreditBalance>,
      { query, ...options },
    );
  }

  /**
   * For credit entries, a new grant is created. For debit entries, credits are
   * deducted from existing grants using FIFO (oldest first).
   *
   * # Authentication
   *
   * Requires an API key with `Editor` role.
   *
   * # Path Parameters
   *
   * - `credit_entitlement_id` - The unique identifier of the credit entitlement
   * - `customer_id` - The unique identifier of the customer
   *
   * # Request Body
   *
   * - `entry_type` - "credit" or "debit"
   * - `amount` - Amount to credit or debit
   * - `reason` - Optional human-readable reason
   * - `expires_at` - Optional expiration for credited amount (only for credit type)
   * - `idempotency_key` - Optional key to prevent duplicate entries
   *
   * # Responses
   *
   * - `201 Created` - Ledger entry created successfully
   * - `400 Bad Request` - Invalid request (e.g., debit with insufficient balance)
   * - `404 Not Found` - Credit entitlement or customer not found
   * - `409 Conflict` - Idempotency key already exists
   * - `500 Internal Server Error` - Database or server error
   */
  createLedgerEntry(
    customerID: string,
    params: BalanceCreateLedgerEntryParams,
    options?: RequestOptions,
  ): APIPromise<BalanceCreateLedgerEntryResponse> {
    const { credit_entitlement_id, ...body } = params;
    return this._client.post(
      path`/credit-entitlements/${credit_entitlement_id}/balances/${customerID}/ledger-entries`,
      { body, ...options },
    );
  }

  /**
   * Returns a paginated list of credit grants with optional filtering by status.
   *
   * # Authentication
   *
   * Requires an API key with `Viewer` role or higher.
   *
   * # Path Parameters
   *
   * - `credit_entitlement_id` - The unique identifier of the credit entitlement
   * - `customer_id` - The unique identifier of the customer
   *
   * # Query Parameters
   *
   * - `page_size` - Number of items per page (default: 10, max: 100)
   * - `page_number` - Zero-based page number (default: 0)
   * - `status` - Filter by status: active, expired, depleted
   *
   * # Responses
   *
   * - `200 OK` - Returns list of grants
   * - `404 Not Found` - Credit entitlement not found
   * - `500 Internal Server Error` - Database or server error
   */
  listGrants(
    customerID: string,
    params: BalanceListGrantsParams,
    options?: RequestOptions,
  ): PagePromise<BalanceListGrantsResponsesDefaultPageNumberPagination, BalanceListGrantsResponse> {
    const { credit_entitlement_id, ...query } = params;
    return this._client.getAPIList(
      path`/credit-entitlements/${credit_entitlement_id}/balances/${customerID}/grants`,
      DefaultPageNumberPagination<BalanceListGrantsResponse>,
      { query, ...options },
    );
  }

  /**
   * Returns a paginated list of credit transaction history with optional filtering.
   *
   * # Authentication
   *
   * Requires an API key with `Viewer` role or higher.
   *
   * # Path Parameters
   *
   * - `credit_entitlement_id` - The unique identifier of the credit entitlement
   * - `customer_id` - The unique identifier of the customer
   *
   * # Query Parameters
   *
   * - `page_size` - Number of items per page (default: 10, max: 100)
   * - `page_number` - Zero-based page number (default: 0)
   * - `transaction_type` - Filter by transaction type
   * - `start_date` - Filter entries from this date
   * - `end_date` - Filter entries until this date
   *
   * # Responses
   *
   * - `200 OK` - Returns list of ledger entries
   * - `404 Not Found` - Credit entitlement not found
   * - `500 Internal Server Error` - Database or server error
   */
  listLedger(
    customerID: string,
    params: BalanceListLedgerParams,
    options?: RequestOptions,
  ): PagePromise<CreditLedgerEntriesDefaultPageNumberPagination, CreditLedgerEntry> {
    const { credit_entitlement_id, ...query } = params;
    return this._client.getAPIList(
      path`/credit-entitlements/${credit_entitlement_id}/balances/${customerID}/ledger`,
      DefaultPageNumberPagination<CreditLedgerEntry>,
      { query, ...options },
    );
  }
}

export type CustomerCreditBalancesDefaultPageNumberPagination =
  DefaultPageNumberPagination<CustomerCreditBalance>;

export type BalanceListGrantsResponsesDefaultPageNumberPagination =
  DefaultPageNumberPagination<BalanceListGrantsResponse>;

export type CreditLedgerEntriesDefaultPageNumberPagination = DefaultPageNumberPagination<CreditLedgerEntry>;

/**
 * Response for a ledger entry
 */
export interface CreditLedgerEntry {
  id: string;

  amount: string;

  balance_after: string;

  balance_before: string;

  business_id: string;

  created_at: string;

  credit_entitlement_id: string;

  customer_id: string;

  is_credit: boolean;

  overage_after: string;

  overage_before: string;

  transaction_type:
    | 'credit_added'
    | 'credit_deducted'
    | 'credit_expired'
    | 'credit_rolled_over'
    | 'rollover_forfeited'
    | 'overage_charged'
    | 'overage_reset'
    | 'auto_top_up'
    | 'manual_adjustment'
    | 'refund';

  description?: string | null;

  grant_id?: string | null;

  reference_id?: string | null;

  reference_type?: string | null;
}

/**
 * Response for a customer's credit balance
 */
export interface CustomerCreditBalance {
  id: string;

  balance: string;

  created_at: string;

  credit_entitlement_id: string;

  customer_id: string;

  overage: string;

  updated_at: string;

  last_transaction_at?: string | null;
}

export type LedgerEntryType = 'credit' | 'debit';

/**
 * Response for creating a ledger entry
 */
export interface BalanceCreateLedgerEntryResponse {
  id: string;

  amount: string;

  balance_after: string;

  balance_before: string;

  created_at: string;

  credit_entitlement_id: string;

  customer_id: string;

  entry_type: LedgerEntryType;

  is_credit: boolean;

  overage_after: string;

  overage_before: string;

  grant_id?: string | null;

  reason?: string | null;
}

/**
 * Response for a credit grant
 */
export interface BalanceListGrantsResponse {
  id: string;

  created_at: string;

  credit_entitlement_id: string;

  customer_id: string;

  initial_amount: string;

  is_expired: boolean;

  is_rolled_over: boolean;

  remaining_amount: string;

  rollover_count: number;

  source_type: 'subscription' | 'one_time' | 'addon' | 'api' | 'rollover';

  updated_at: string;

  expires_at?: string | null;

  metadata?: { [key: string]: string } | null;

  parent_grant_id?: string | null;

  source_id?: string | null;
}

export interface BalanceRetrieveParams {
  /**
   * Credit Entitlement ID
   */
  credit_entitlement_id: string;
}

export interface BalanceListParams extends DefaultPageNumberPaginationParams {
  /**
   * Filter by specific customer ID
   */
  customer_id?: string;
}

export interface BalanceCreateLedgerEntryParams {
  /**
   * Path param: Credit Entitlement ID
   */
  credit_entitlement_id: string;

  /**
   * Body param: Amount to credit or debit
   */
  amount: string;

  /**
   * Body param: Entry type: credit or debit
   */
  entry_type: LedgerEntryType;

  /**
   * Body param: Expiration for credited amount (only for credit type)
   */
  expires_at?: string | null;

  /**
   * Body param: Idempotency key to prevent duplicate entries
   */
  idempotency_key?: string | null;

  /**
   * Body param: Optional metadata (max 50 key-value pairs, key max 40 chars, value
   * max 500 chars)
   */
  metadata?: { [key: string]: string } | null;

  /**
   * Body param: Human-readable reason for the entry
   */
  reason?: string | null;
}

export interface BalanceListGrantsParams extends DefaultPageNumberPaginationParams {
  /**
   * Path param: Credit Entitlement ID
   */
  credit_entitlement_id: string;

  /**
   * Query param: Filter by grant status: active, expired, depleted
   */
  status?: 'active' | 'expired' | 'depleted';
}

export interface BalanceListLedgerParams extends DefaultPageNumberPaginationParams {
  /**
   * Path param: Credit Entitlement ID
   */
  credit_entitlement_id: string;

  /**
   * Query param: Filter by end date
   */
  end_date?: string;

  /**
   * Query param: Filter by start date
   */
  start_date?: string;

  /**
   * Query param: Filter by transaction type (snake_case: credit_added,
   * credit_deducted, credit_expired, etc.)
   */
  transaction_type?: string;
}

export declare namespace Balances {
  export {
    type CreditLedgerEntry as CreditLedgerEntry,
    type CustomerCreditBalance as CustomerCreditBalance,
    type LedgerEntryType as LedgerEntryType,
    type BalanceCreateLedgerEntryResponse as BalanceCreateLedgerEntryResponse,
    type BalanceListGrantsResponse as BalanceListGrantsResponse,
    type CustomerCreditBalancesDefaultPageNumberPagination as CustomerCreditBalancesDefaultPageNumberPagination,
    type BalanceListGrantsResponsesDefaultPageNumberPagination as BalanceListGrantsResponsesDefaultPageNumberPagination,
    type CreditLedgerEntriesDefaultPageNumberPagination as CreditLedgerEntriesDefaultPageNumberPagination,
    type BalanceRetrieveParams as BalanceRetrieveParams,
    type BalanceListParams as BalanceListParams,
    type BalanceCreateLedgerEntryParams as BalanceCreateLedgerEntryParams,
    type BalanceListGrantsParams as BalanceListGrantsParams,
    type BalanceListLedgerParams as BalanceListLedgerParams,
  };
}
