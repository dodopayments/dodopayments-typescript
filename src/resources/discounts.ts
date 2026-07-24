// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as MiscAPI from './misc';
import { APIPromise } from '../core/api-promise';
import {
  DefaultPageNumberPagination,
  type DefaultPageNumberPaginationParams,
  PagePromise,
} from '../core/pagination';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Discounts extends APIResource {
  /**
   * GET /discounts
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const discount of client.discounts.list()) {
   *   // ...
   * }
   * ```
   */
  list(
    query: DiscountListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<DiscountsDefaultPageNumberPagination, Discount> {
    return this._client.getAPIList('/discounts', DefaultPageNumberPagination<Discount>, {
      query,
      ...options,
    });
  }

  /**
   * POST /discounts If `code` is omitted or empty, a random 16-char uppercase code
   * is generated.
   *
   * @example
   * ```ts
   * const discount = await client.discounts.create({
   *   amount: 0,
   *   type: 'flat',
   * });
   * ```
   */
  create(body: DiscountCreateParams, options?: RequestOptions): APIPromise<Discount> {
    return this._client.post('/discounts', { body, ...options });
  }

  /**
   * GET /discounts/{discount_id}
   *
   * @example
   * ```ts
   * const discount = await client.discounts.retrieve(
   *   'dsc_qxxEmg5PuM1uNTE0LgkP9',
   * );
   * ```
   */
  retrieve(discountID: string, options?: RequestOptions): APIPromise<Discount> {
    return this._client.get(path`/discounts/${discountID}`, options);
  }

  /**
   * DELETE /discounts/{discount_id}
   *
   * @example
   * ```ts
   * await client.discounts.delete('dsc_qxxEmg5PuM1uNTE0LgkP9');
   * ```
   */
  delete(discountID: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/discounts/${discountID}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * PATCH /discounts/{discount_id}
   *
   * @example
   * ```ts
   * const discount = await client.discounts.update(
   *   'dsc_qxxEmg5PuM1uNTE0LgkP9',
   * );
   * ```
   */
  update(discountID: string, body: DiscountUpdateParams, options?: RequestOptions): APIPromise<Discount> {
    return this._client.patch(path`/discounts/${discountID}`, { body, ...options });
  }

  /**
   * Validate and fetch a discount by its code name (e.g., "SAVE20"). This allows
   * real-time validation directly against the API using the human-readable discount
   * code instead of requiring the internal discount_id.
   *
   * @example
   * ```ts
   * const discount = await client.discounts.retrieveByCode(
   *   'code',
   * );
   * ```
   */
  retrieveByCode(code: string, options?: RequestOptions): APIPromise<Discount> {
    return this._client.get(path`/discounts/code/${code}`, options);
  }
}

export type DiscountsDefaultPageNumberPagination = DefaultPageNumberPagination<Discount>;

export interface Discount {
  /**
   * The discount amount in **basis points** (e.g., 540 => 5.4%).
   */
  amount: number;

  /**
   * The business this discount belongs to.
   */
  business_id: string;

  /**
   * The discount code (up to 16 chars).
   */
  code: string;

  /**
   * Timestamp when the discount is created
   */
  created_at: string;

  /**
   * Who may redeem this discount code.
   */
  customer_eligibility: 'any' | 'first_time' | 'existing' | 'specific';

  /**
   * The unique discount ID
   */
  discount_id: string;

  /**
   * Arbitrary key-value metadata. Values can be string, integer, number, or boolean.
   */
  metadata: MiscAPI.Metadata;

  /**
   * Whether this discount should be preserved when a subscription changes plans.
   * Default: false (discount is removed on plan change)
   */
  preserve_on_plan_change: boolean;

  /**
   * List of product IDs to which this discount is restricted.
   */
  restricted_to: Array<string>;

  /**
   * How many times this discount has been used.
   */
  times_used: number;

  /**
   * The type of discount (`percentage` or `flat`).
   */
  type: DiscountType;

  /**
   * Per-currency options (flat deduction / percentage cap + minimum subtotal). Empty
   * for discounts without any configured currency options.
   */
  currency_options?: Array<Discount.CurrencyOption>;

  /**
   * Optional date/time after which discount is expired.
   */
  expires_at?: string | null;

  /**
   * Name for the Discount
   */
  name?: string | null;

  /**
   * Maximum number of times a single customer may redeem this discount, if any.
   */
  per_customer_usage_limit?: number | null;

  /**
   * Optional date/time before which the discount is not yet active. NULL = active
   * immediately.
   */
  starts_at?: string | null;

  /**
   * Number of subscription billing cycles this discount is valid for. If not
   * provided, the discount will be applied indefinitely to all recurring payments
   * related to the subscription.
   */
  subscription_cycles?: number | null;

  /**
   * Usage limit for this discount, if any.
   */
  usage_limit?: number | null;
}

export namespace Discount {
  /**
   * A per-currency discount option (response shape). `max_amount_possible` mirrors
   * the DB column of the same name.
   */
  export interface CurrencyOption {
    /**
     * The currency this option applies to.
     */
    currency: MiscAPI.Currency;

    /**
     * Whether this is the default row FX conversions pivot from.
     */
    is_default: boolean;

    /**
     * Eligible-cart threshold in this currency's subunits (0 = no minimum).
     */
    minimum_subtotal: number;

    /**
     * The most this code discounts in this currency's subunits (flat deduction or
     * percentage cap).
     */
    max_amount_possible?: number | null;
  }
}

/**
 * Response struct for a discount with its position in a stack and optional
 * cycle-tracking information (for subscriptions).
 */
export interface DiscountDetail {
  /**
   * The discount amount in **basis points** (e.g., 540 => 5.4%).
   */
  amount: number;

  /**
   * The business this discount belongs to
   */
  business_id: string;

  /**
   * The discount code
   */
  code: string;

  /**
   * Timestamp when the discount was created
   */
  created_at: string;

  /**
   * The unique discount ID
   */
  discount_id: string;

  /**
   * Additional metadata
   */
  metadata: MiscAPI.Metadata;

  /**
   * Position of this discount in the stack (0-based)
   */
  position: number;

  /**
   * Whether this discount should be preserved when a subscription changes plans
   */
  preserve_on_plan_change: boolean;

  /**
   * List of product IDs to which this discount is restricted
   */
  restricted_to: Array<string>;

  /**
   * How many times this discount has been used
   */
  times_used: number;

  /**
   * The type of discount
   */
  type: DiscountType;

  /**
   * Remaining billing cycles for this discount on this subscription (None for
   * one-time payments)
   */
  cycles_remaining?: number | null;

  /**
   * Optional date/time after which discount is expired
   */
  expires_at?: string | null;

  /**
   * Name for the Discount
   */
  name?: string | null;

  /**
   * Number of subscription billing cycles this discount is valid for
   */
  subscription_cycles?: number | null;

  /**
   * Usage limit for this discount, if any
   */
  usage_limit?: number | null;
}

export type DiscountType = 'flat' | 'percentage';

export interface DiscountListParams extends DefaultPageNumberPaginationParams {
  /**
   * Filter by active status. `true` = currently redeemable (started, not expired,
   * not usage-exhausted). `false` = not currently redeemable (expired,
   * usage-exhausted, or pending a future `starts_at`).
   */
  active?: boolean;

  /**
   * Filter by discount code (partial match, case-insensitive)
   */
  code?: string;

  /**
   * Filter by discount type
   */
  discount_type?: DiscountType;

  /**
   * Filter by product restriction (only discounts that apply to this product)
   */
  product_id?: string;
}

export interface DiscountCreateParams {
  /**
   * The discount amount in **basis points** (e.g. `540` means `5.4%`, `10000` means
   * `100%`).
   *
   * Must be at least 1.
   */
  amount: number;

  /**
   * The discount type: `percentage` or `flat` (`flat_per_unit` stays blocked).
   */
  type: DiscountType;

  /**
   * Optionally supply a code (will be uppercased).
   *
   * - Must be at least 3 characters if provided.
   * - If omitted, a random 16-character code is generated.
   */
  code?: string | null;

  /**
   * Per-currency options (flat deduction / percentage cap + minimum subtotal).
   * Required for `flat` codes (must include a resolvable default); optional
   * per-currency caps for `percentage` codes. Per-row invariants are checked in
   * `normalize_currency_options`, not via `#[validate(nested)]`.
   */
  currency_options?: Array<DiscountCreateParams.CurrencyOption> | null;

  /**
   * Who may redeem this discount code. Defaults to `any` (unrestricted). `specific`
   * starts with zero attached customers (fails closed) until customers are attached
   * via `POST /discounts/{id}/customers`.
   */
  customer_eligibility?: 'any' | 'first_time' | 'existing' | 'specific' | null;

  /**
   * When the discount expires, if ever.
   */
  expires_at?: string | null;

  /**
   * Additional metadata for the discount
   */
  metadata?: MiscAPI.Metadata;

  name?: string | null;

  /**
   * Maximum number of times a single customer may redeem this discount. Must be
   * `<= usage_limit` when both are set.
   */
  per_customer_usage_limit?: number | null;

  /**
   * Whether this discount should be preserved when a subscription changes plans.
   * Default: false (discount is removed on plan change)
   */
  preserve_on_plan_change?: boolean;

  /**
   * List of product IDs to restrict usage (if any).
   */
  restricted_to?: Array<string> | null;

  /**
   * When the discount becomes active, if scheduled for the future. NULL = active
   * immediately. Must be strictly before `expires_at` when both are set.
   */
  starts_at?: string | null;

  /**
   * Number of subscription billing cycles this discount is valid for. If not
   * provided, the discount will be applied indefinitely to all recurring payments
   * related to the subscription.
   */
  subscription_cycles?: number | null;

  /**
   * How many times this discount can be used (if any). Must be >= 1 if provided.
   */
  usage_limit?: number | null;
}

export namespace DiscountCreateParams {
  /**
   * A per-currency discount option (request shape).
   *
   * `max_amount_possible` is the most this code discounts in this currency — the
   * flat deduction for `flat` codes, or the max-discount cap for `percentage` codes.
   * Maps to the DB column of the same name.
   */
  export interface CurrencyOption {
    /**
     * The currency this option applies to.
     */
    currency: MiscAPI.Currency;

    /**
     * Whether this row is the default to convert from for unconfigured currencies. At
     * most one row per discount may be default.
     */
    is_default?: boolean;

    /**
     * The most this code discounts in this currency's subunits. For `flat` codes this
     * is the deduction; for `percentage` codes it is the max-discount cap. Must be > 0
     * if provided.
     */
    max_amount_possible?: number | null;

    /**
     * Eligible-cart threshold in this currency's subunits (0 = no minimum).
     */
    minimum_subtotal?: number;
  }
}

export interface DiscountUpdateParams {
  /**
   * If present, update the discount amount in **basis points** (e.g., `540` =
   * `5.4%`, `10000` = `100%`).
   *
   * Must be at least 1 if provided.
   */
  amount?: number | null;

  /**
   * If present, update the discount code (uppercase).
   */
  code?: string | null;

  /**
   * If present, fully replaces the discount's currency options (replace-set
   * semantics, like `restricted_to`). Send an empty array to clear them.
   */
  currency_options?: Array<DiscountUpdateParams.CurrencyOption> | null;

  /**
   * If present, update who may redeem this discount. Plain field (not
   * double-option): the DB column is `NOT NULL`, so it can never be cleared back to
   * unset, only changed to another `CustomerEligibility` value.
   */
  customer_eligibility?: 'any' | 'first_time' | 'existing' | 'specific' | null;

  expires_at?: string | null;

  /**
   * Additional metadata for the discount
   */
  metadata?: MiscAPI.Metadata | null;

  name?: string | null;

  /**
   * If present, update the per-customer usage limit (double-option: send `null` to
   * clear it back to unlimited). Must be `<= usage_limit` (the value in effect after
   * this patch) when both are set.
   */
  per_customer_usage_limit?: number | null;

  /**
   * Whether this discount should be preserved when a subscription changes plans. If
   * not provided, the existing value is kept.
   */
  preserve_on_plan_change?: boolean | null;

  /**
   * If present, replaces all restricted product IDs with this new set. To remove all
   * restrictions, send empty array
   */
  restricted_to?: Array<string> | null;

  /**
   * If present, update `starts_at` (double-option: send `null` to clear it).
   */
  starts_at?: string | null;

  /**
   * Number of subscription billing cycles this discount is valid for. If not
   * provided, the discount will be applied indefinitely to all recurring payments
   * related to the subscription.
   */
  subscription_cycles?: number | null;

  /**
   * If present, update the discount type (`percentage` or `flat`).
   */
  type?: DiscountType | null;

  usage_limit?: number | null;
}

export namespace DiscountUpdateParams {
  /**
   * A per-currency discount option (request shape).
   *
   * `max_amount_possible` is the most this code discounts in this currency — the
   * flat deduction for `flat` codes, or the max-discount cap for `percentage` codes.
   * Maps to the DB column of the same name.
   */
  export interface CurrencyOption {
    /**
     * The currency this option applies to.
     */
    currency: MiscAPI.Currency;

    /**
     * Whether this row is the default to convert from for unconfigured currencies. At
     * most one row per discount may be default.
     */
    is_default?: boolean;

    /**
     * The most this code discounts in this currency's subunits. For `flat` codes this
     * is the deduction; for `percentage` codes it is the max-discount cap. Must be > 0
     * if provided.
     */
    max_amount_possible?: number | null;

    /**
     * Eligible-cart threshold in this currency's subunits (0 = no minimum).
     */
    minimum_subtotal?: number;
  }
}

export declare namespace Discounts {
  export {
    type Discount as Discount,
    type DiscountDetail as DiscountDetail,
    type DiscountType as DiscountType,
    type DiscountsDefaultPageNumberPagination as DiscountsDefaultPageNumberPagination,
    type DiscountListParams as DiscountListParams,
    type DiscountCreateParams as DiscountCreateParams,
    type DiscountUpdateParams as DiscountUpdateParams,
  };
}
