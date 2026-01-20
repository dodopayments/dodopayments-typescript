// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
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
   * POST /discounts If `code` is omitted or empty, a random 16-char uppercase code
   * is generated.
   */
  create(body: DiscountCreateParams, options?: RequestOptions): APIPromise<Discount> {
    return this._client.post('/discounts', { body, ...options });
  }

  /**
   * GET /discounts/{discount_id}
   */
  retrieve(discountID: string, options?: RequestOptions): APIPromise<Discount> {
    return this._client.get(path`/discounts/${discountID}`, options);
  }

  /**
   * PATCH /discounts/{discount_id}
   */
  update(discountID: string, body: DiscountUpdateParams, options?: RequestOptions): APIPromise<Discount> {
    return this._client.patch(path`/discounts/${discountID}`, { body, ...options });
  }

  /**
   * GET /discounts
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
   * DELETE /discounts/{discount_id}
   */
  delete(discountID: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/discounts/${discountID}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Validate and fetch a discount by its code name (e.g., "SAVE20"). This allows
   * real-time validation directly against the API using the human-readable discount
   * code instead of requiring the internal discount_id.
   */
  retrieveByCode(code: string, options?: RequestOptions): APIPromise<Discount> {
    return this._client.get(path`/discounts/code/${code}`, options);
  }
}

export type DiscountsDefaultPageNumberPagination = DefaultPageNumberPagination<Discount>;

export interface Discount {
  /**
   * The discount amount.
   *
   * - If `discount_type` is `percentage`, this is in **basis points** (e.g., 540 =>
   *   5.4%).
   * - Otherwise, this is **USD cents** (e.g., 100 => `$1.00`).
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
   * The unique discount ID
   */
  discount_id: string;

  /**
   * List of product IDs to which this discount is restricted.
   */
  restricted_to: Array<string>;

  /**
   * How many times this discount has been used.
   */
  times_used: number;

  /**
   * The type of discount, e.g. `percentage`, `flat`, or `flat_per_unit`.
   */
  type: DiscountType;

  /**
   * Optional date/time after which discount is expired.
   */
  expires_at?: string | null;

  /**
   * Name for the Discount
   */
  name?: string | null;

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

export type DiscountType = 'percentage';

export interface DiscountCreateParams {
  /**
   * The discount amount.
   *
   * - If `discount_type` is **not** `percentage`, `amount` is in **USD cents**. For
   *   example, `100` means `$1.00`. Only USD is allowed.
   * - If `discount_type` **is** `percentage`, `amount` is in **basis points**. For
   *   example, `540` means `5.4%`.
   *
   * Must be at least 1.
   */
  amount: number;

  /**
   * The discount type (e.g. `percentage`, `flat`, or `flat_per_unit`).
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
   * When the discount expires, if ever.
   */
  expires_at?: string | null;

  name?: string | null;

  /**
   * List of product IDs to restrict usage (if any).
   */
  restricted_to?: Array<string> | null;

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

export interface DiscountUpdateParams {
  /**
   * If present, update the discount amount:
   *
   * - If `discount_type` is `percentage`, this represents **basis points** (e.g.,
   *   `540` = `5.4%`).
   * - Otherwise, this represents **USD cents** (e.g., `100` = `$1.00`).
   *
   * Must be at least 1 if provided.
   */
  amount?: number | null;

  /**
   * If present, update the discount code (uppercase).
   */
  code?: string | null;

  expires_at?: string | null;

  name?: string | null;

  /**
   * If present, replaces all restricted product IDs with this new set. To remove all
   * restrictions, send empty array
   */
  restricted_to?: Array<string> | null;

  /**
   * Number of subscription billing cycles this discount is valid for. If not
   * provided, the discount will be applied indefinitely to all recurring payments
   * related to the subscription.
   */
  subscription_cycles?: number | null;

  /**
   * If present, update the discount type.
   */
  type?: DiscountType | null;

  usage_limit?: number | null;
}

export interface DiscountListParams extends DefaultPageNumberPaginationParams {}

export declare namespace Discounts {
  export {
    type Discount as Discount,
    type DiscountType as DiscountType,
    type DiscountsDefaultPageNumberPagination as DiscountsDefaultPageNumberPagination,
    type DiscountCreateParams as DiscountCreateParams,
    type DiscountUpdateParams as DiscountUpdateParams,
    type DiscountListParams as DiscountListParams,
  };
}
