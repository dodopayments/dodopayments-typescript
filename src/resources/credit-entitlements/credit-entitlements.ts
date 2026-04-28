// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as MiscAPI from '../misc';
import * as SubscriptionsAPI from '../subscriptions';
import * as BalancesAPI from './balances';
import {
  BalanceCreateLedgerEntryParams,
  BalanceCreateLedgerEntryResponse,
  BalanceListGrantsParams,
  BalanceListGrantsResponse,
  BalanceListGrantsResponsesDefaultPageNumberPagination,
  BalanceListLedgerParams,
  BalanceListParams,
  BalanceRetrieveParams,
  Balances,
  CreditLedgerEntriesDefaultPageNumberPagination,
  CreditLedgerEntry,
  CustomerCreditBalance,
  CustomerCreditBalancesDefaultPageNumberPagination,
  LedgerEntryType,
} from './balances';
import { APIPromise } from '../../core/api-promise';
import {
  DefaultPageNumberPagination,
  type DefaultPageNumberPaginationParams,
  PagePromise,
} from '../../core/pagination';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class CreditEntitlements extends APIResource {
  balances: BalancesAPI.Balances = new BalancesAPI.Balances(this._client);

  /**
   * Credit entitlements define reusable credit templates that can be attached to
   * products. Each entitlement defines how credits behave in terms of expiration,
   * rollover, and overage.
   *
   * # Authentication
   *
   * Requires an API key with `Editor` role.
   *
   * # Request Body
   *
   * - `name` - Human-readable name of the credit entitlement (1-255 characters,
   *   required)
   * - `description` - Optional description (max 1000 characters)
   * - `precision` - Decimal precision for credit amounts (0-10 decimal places)
   * - `unit` - Unit of measurement for the credit (e.g., "API Calls", "Tokens",
   *   "Credits")
   * - `expires_after_days` - Number of days after which credits expire (optional)
   * - `rollover_enabled` - Whether unused credits can rollover to the next period
   * - `rollover_percentage` - Percentage of unused credits that rollover (0-100)
   * - `rollover_timeframe_count` - Count of timeframe periods for rollover limit
   * - `rollover_timeframe_interval` - Interval type (day, week, month, year)
   * - `max_rollover_count` - Maximum number of times credits can be rolled over
   * - `overage_enabled` - Whether overage charges apply when credits run out
   *   (requires price_per_unit)
   * - `overage_limit` - Maximum overage units allowed (optional)
   * - `currency` - Currency for pricing (required if price_per_unit is set)
   * - `price_per_unit` - Price per credit unit (decimal)
   *
   * # Responses
   *
   * - `201 Created` - Credit entitlement created successfully, returns the full
   *   entitlement object
   * - `422 Unprocessable Entity` - Invalid request parameters or validation failure
   * - `500 Internal Server Error` - Database or server error
   *
   * # Business Logic
   *
   * - A unique ID with prefix `cde_` is automatically generated for the entitlement
   * - Created and updated timestamps are automatically set
   * - Currency is required when price_per_unit is set
   * - price_per_unit is required when overage_enabled is true
   * - rollover_timeframe_count and rollover_timeframe_interval must both be set or
   *   both be null
   */
  create(body: CreditEntitlementCreateParams, options?: RequestOptions): APIPromise<CreditEntitlement> {
    return this._client.post('/credit-entitlements', { body, ...options });
  }

  /**
   * Returns the full details of a single credit entitlement including all
   * configuration settings for expiration, rollover, and overage policies.
   *
   * # Authentication
   *
   * Requires an API key with `Viewer` role or higher.
   *
   * # Path Parameters
   *
   * - `id` - The unique identifier of the credit entitlement (format: `cde_...`)
   *
   * # Responses
   *
   * - `200 OK` - Returns the full credit entitlement object
   * - `404 Not Found` - Credit entitlement does not exist or does not belong to the
   *   authenticated business
   * - `500 Internal Server Error` - Database or server error
   *
   * # Business Logic
   *
   * - Only non-deleted credit entitlements can be retrieved through this endpoint
   * - The entitlement must belong to the authenticated business (business_id check)
   * - Deleted entitlements return a 404 error and must be retrieved via the list
   *   endpoint with `deleted=true`
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<CreditEntitlement> {
    return this._client.get(path`/credit-entitlements/${id}`, options);
  }

  /**
   * Allows partial updates to a credit entitlement's configuration. Only the fields
   * provided in the request body will be updated; all other fields remain unchanged.
   * This endpoint supports nullable fields using the double option pattern.
   *
   * # Authentication
   *
   * Requires an API key with `Editor` role.
   *
   * # Path Parameters
   *
   * - `id` - The unique identifier of the credit entitlement to update (format:
   *   `cde_...`)
   *
   * # Request Body (all fields optional)
   *
   * - `name` - Human-readable name of the credit entitlement (1-255 characters)
   * - `description` - Optional description (max 1000 characters)
   * - `unit` - Unit of measurement for the credit (1-50 characters)
   *
   * Note: `precision` cannot be modified after creation as it would invalidate
   * existing grants.
   *
   * - `expires_after_days` - Number of days after which credits expire (use `null`
   *   to remove expiration)
   * - `rollover_enabled` - Whether unused credits can rollover to the next period
   * - `rollover_percentage` - Percentage of unused credits that rollover (0-100,
   *   nullable)
   * - `rollover_timeframe_count` - Count of timeframe periods for rollover limit
   *   (nullable)
   * - `rollover_timeframe_interval` - Interval type (day, week, month, year,
   *   nullable)
   * - `max_rollover_count` - Maximum number of times credits can be rolled over
   *   (nullable)
   * - `overage_enabled` - Whether overage charges apply when credits run out
   * - `overage_limit` - Maximum overage units allowed (nullable)
   * - `currency` - Currency for pricing (nullable)
   * - `price_per_unit` - Price per credit unit (decimal, nullable)
   *
   * # Responses
   *
   * - `200 OK` - Credit entitlement updated successfully
   * - `404 Not Found` - Credit entitlement does not exist or does not belong to the
   *   authenticated business
   * - `422 Unprocessable Entity` - Invalid request parameters or validation failure
   * - `500 Internal Server Error` - Database or server error
   *
   * # Business Logic
   *
   * - Only non-deleted credit entitlements can be updated
   * - Fields set to `null` explicitly will clear the database value (using double
   *   option pattern)
   * - The `updated_at` timestamp is automatically updated on successful modification
   * - Changes take effect immediately but do not retroactively affect existing
   *   credit grants
   * - The merged state is validated: currency required with price, rollover
   *   timeframe fields together, price required for overage
   */
  update(id: string, body: CreditEntitlementUpdateParams, options?: RequestOptions): APIPromise<void> {
    return this._client.patch(path`/credit-entitlements/${id}`, {
      body,
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Returns a paginated list of credit entitlements, allowing filtering of deleted
   * entitlements. By default, only non-deleted entitlements are returned.
   *
   * # Authentication
   *
   * Requires an API key with `Viewer` role or higher.
   *
   * # Query Parameters
   *
   * - `page_size` - Number of items per page (default: 10, max: 100)
   * - `page_number` - Zero-based page number (default: 0)
   * - `deleted` - Boolean flag to list deleted entitlements instead of active ones
   *   (default: false)
   *
   * # Responses
   *
   * - `200 OK` - Returns a list of credit entitlements wrapped in a response object
   * - `422 Unprocessable Entity` - Invalid query parameters (e.g., page_size > 100)
   * - `500 Internal Server Error` - Database or server error
   *
   * # Business Logic
   *
   * - Results are ordered by creation date in descending order (newest first)
   * - Only entitlements belonging to the authenticated business are returned
   * - The `deleted` parameter controls visibility of soft-deleted entitlements
   * - Pagination uses offset-based pagination (offset = page_number \* page_size)
   */
  list(
    query: CreditEntitlementListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<CreditEntitlementsDefaultPageNumberPagination, CreditEntitlement> {
    return this._client.getAPIList('/credit-entitlements', DefaultPageNumberPagination<CreditEntitlement>, {
      query,
      ...options,
    });
  }

  delete(id: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/credit-entitlements/${id}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Undeletes a soft-deleted credit entitlement by clearing `deleted_at`, making it
   * available again through standard list and get endpoints.
   *
   * # Authentication
   *
   * Requires an API key with `Editor` role.
   *
   * # Path Parameters
   *
   * - `id` - The unique identifier of the credit entitlement to restore (format:
   *   `cde_...`)
   *
   * # Responses
   *
   * - `200 OK` - Credit entitlement restored successfully
   * - `500 Internal Server Error` - Database error, entitlement not found, or
   *   entitlement is not deleted
   *
   * # Business Logic
   *
   * - Only deleted credit entitlements can be restored
   * - The query filters for `deleted_at IS NOT NULL`, so non-deleted entitlements
   *   will result in 0 rows affected
   * - If no rows are affected (entitlement doesn't exist, doesn't belong to
   *   business, or is not deleted), returns 500
   * - The `updated_at` timestamp is automatically updated on successful restoration
   * - Once restored, the entitlement becomes immediately available in the standard
   *   list and get endpoints
   * - All configuration settings are preserved during delete/restore operations
   *
   * # Error Handling
   *
   * This endpoint returns 500 Internal Server Error in several cases:
   *
   * - The credit entitlement does not exist
   * - The credit entitlement belongs to a different business
   * - The credit entitlement is not currently deleted (already active)
   *
   * Callers should verify the entitlement exists and is deleted before calling this
   * endpoint.
   */
  undelete(id: string, options?: RequestOptions): APIPromise<void> {
    return this._client.post(path`/credit-entitlements/${id}/undelete`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

export type CreditEntitlementsDefaultPageNumberPagination = DefaultPageNumberPagination<CreditEntitlement>;

/**
 * Controls how overage is handled at the end of a billing cycle.
 *
 * | Preset                     | Charge at billing | Credits reduce overage | Preserve overage at reset |
 * | -------------------------- | :---------------: | :--------------------: | :-----------------------: |
 * | `forgive_at_reset`         |        No         |           No           |            No             |
 * | `invoice_at_billing`       |        Yes        |           No           |            No             |
 * | `carry_deficit`            |        No         |           No           |            Yes            |
 * | `carry_deficit_auto_repay` |        No         |          Yes           |            Yes            |
 */
export type CbbOverageBehavior =
  | 'forgive_at_reset'
  | 'invoice_at_billing'
  | 'carry_deficit'
  | 'carry_deficit_auto_repay';

export interface CreditEntitlement {
  id: string;

  business_id: string;

  created_at: string;

  name: string;

  /**
   * Controls how overage is handled at billing cycle end.
   */
  overage_behavior: CbbOverageBehavior;

  overage_enabled: boolean;

  precision: number;

  rollover_enabled: boolean;

  unit: string;

  updated_at: string;

  currency?: MiscAPI.Currency | null;

  description?: string | null;

  expires_after_days?: number | null;

  max_rollover_count?: number | null;

  overage_limit?: number | null;

  /**
   * Price per credit unit
   */
  price_per_unit?: string | null;

  rollover_percentage?: number | null;

  rollover_timeframe_count?: number | null;

  rollover_timeframe_interval?: SubscriptionsAPI.TimeInterval | null;
}

export interface CreditEntitlementCreateParams {
  /**
   * Name of the credit entitlement
   */
  name: string;

  /**
   * Whether overage charges are enabled when credits run out
   */
  overage_enabled: boolean;

  /**
   * Precision for credit amounts (0-10 decimal places)
   */
  precision: number;

  /**
   * Whether rollover is enabled for unused credits
   */
  rollover_enabled: boolean;

  /**
   * Unit of measurement for the credit (e.g., "API Calls", "Tokens", "Credits")
   */
  unit: string;

  /**
   * Currency for pricing (required if price_per_unit is set)
   */
  currency?: MiscAPI.Currency | null;

  /**
   * Optional description of the credit entitlement
   */
  description?: string | null;

  /**
   * Number of days after which credits expire (optional)
   */
  expires_after_days?: number | null;

  /**
   * Maximum number of times credits can be rolled over
   */
  max_rollover_count?: number | null;

  /**
   * Controls how overage is handled at billing cycle end. Defaults to
   * forgive_at_reset if not specified.
   */
  overage_behavior?: CbbOverageBehavior | null;

  /**
   * Maximum overage units allowed (optional)
   */
  overage_limit?: number | null;

  /**
   * Price per credit unit
   */
  price_per_unit?: string | null;

  /**
   * Percentage of unused credits that can rollover (0-100)
   */
  rollover_percentage?: number | null;

  /**
   * Count of timeframe periods for rollover limit
   */
  rollover_timeframe_count?: number | null;

  /**
   * Interval type for rollover timeframe
   */
  rollover_timeframe_interval?: SubscriptionsAPI.TimeInterval | null;
}

export interface CreditEntitlementUpdateParams {
  /**
   * Currency for pricing
   */
  currency?: MiscAPI.Currency | null;

  /**
   * Optional description of the credit entitlement
   */
  description?: string | null;

  /**
   * Number of days after which credits expire
   */
  expires_after_days?: number | null;

  /**
   * Maximum number of times credits can be rolled over
   */
  max_rollover_count?: number | null;

  /**
   * Name of the credit entitlement
   */
  name?: string | null;

  /**
   * Controls how overage is handled at billing cycle end.
   */
  overage_behavior?: CbbOverageBehavior | null;

  /**
   * Whether overage charges are enabled when credits run out
   */
  overage_enabled?: boolean | null;

  /**
   * Maximum overage units allowed
   */
  overage_limit?: number | null;

  /**
   * Price per credit unit
   */
  price_per_unit?: string | null;

  /**
   * Whether rollover is enabled for unused credits
   */
  rollover_enabled?: boolean | null;

  /**
   * Percentage of unused credits that can rollover (0-100)
   */
  rollover_percentage?: number | null;

  /**
   * Count of timeframe periods for rollover limit
   */
  rollover_timeframe_count?: number | null;

  /**
   * Interval type for rollover timeframe
   */
  rollover_timeframe_interval?: SubscriptionsAPI.TimeInterval | null;

  /**
   * Unit of measurement for the credit (e.g., "API Calls", "Tokens", "Credits")
   */
  unit?: string | null;
}

export interface CreditEntitlementListParams extends DefaultPageNumberPaginationParams {
  /**
   * List deleted credit entitlements
   */
  deleted?: boolean;
}

CreditEntitlements.Balances = Balances;

export declare namespace CreditEntitlements {
  export {
    type CbbOverageBehavior as CbbOverageBehavior,
    type CreditEntitlement as CreditEntitlement,
    type CreditEntitlementsDefaultPageNumberPagination as CreditEntitlementsDefaultPageNumberPagination,
    type CreditEntitlementCreateParams as CreditEntitlementCreateParams,
    type CreditEntitlementUpdateParams as CreditEntitlementUpdateParams,
    type CreditEntitlementListParams as CreditEntitlementListParams,
  };

  export {
    Balances as Balances,
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
