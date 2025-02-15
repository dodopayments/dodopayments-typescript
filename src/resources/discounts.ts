// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import { isRequestOptions } from '../core';
import * as Core from '../core';
import { DefaultPageNumberPagination, type DefaultPageNumberPaginationParams } from '../pagination';

export class Discounts extends APIResource {
  /**
   * If `code` is omitted or empty, a random 16-char uppercase code is generated.
   */
  create(body: DiscountCreateParams, options?: Core.RequestOptions): Core.APIPromise<Discount> {
    return this._client.post('/discounts', { body, ...options });
  }

  /**
   * GET /discounts/{discount_id}
   */
  retrieve(discountId: string, options?: Core.RequestOptions): Core.APIPromise<Discount> {
    return this._client.get(`/discounts/${discountId}`, options);
  }

  /**
   * PATCH /discounts/{discount_id}
   */
  update(
    discountId: string,
    body: DiscountUpdateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<Discount> {
    return this._client.patch(`/discounts/${discountId}`, { body, ...options });
  }

  /**
   * GET /discounts
   */
  list(
    query?: DiscountListParams,
    options?: Core.RequestOptions,
  ): Core.PagePromise<DiscountsDefaultPageNumberPagination, Discount>;
  list(options?: Core.RequestOptions): Core.PagePromise<DiscountsDefaultPageNumberPagination, Discount>;
  list(
    query: DiscountListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.PagePromise<DiscountsDefaultPageNumberPagination, Discount> {
    if (isRequestOptions(query)) {
      return this.list({}, query);
    }
    return this._client.getAPIList('/discounts', DiscountsDefaultPageNumberPagination, { query, ...options });
  }

  /**
   * DELETE /discounts/{discount_id}
   */
  delete(discountId: string, options?: Core.RequestOptions): Core.APIPromise<void> {
    return this._client.delete(`/discounts/${discountId}`, {
      ...options,
      headers: { Accept: '*/*', ...options?.headers },
    });
  }
}

export class DiscountsDefaultPageNumberPagination extends DefaultPageNumberPagination<Discount> {}

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

  type: 'percentage';

  /**
   * Optional date/time after which discount is expired.
   */
  expires_at?: string | null;

  /**
   * Name for the Discount
   */
  name?: string | null;

  /**
   * Usage limit for this discount, if any.
   */
  usage_limit?: number | null;
}

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

  type: 'percentage';

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

  type?: 'percentage' | null;

  usage_limit?: number | null;
}

export interface DiscountListParams extends DefaultPageNumberPaginationParams {}

Discounts.DiscountsDefaultPageNumberPagination = DiscountsDefaultPageNumberPagination;

export declare namespace Discounts {
  export {
    type Discount as Discount,
    DiscountsDefaultPageNumberPagination as DiscountsDefaultPageNumberPagination,
    type DiscountCreateParams as DiscountCreateParams,
    type DiscountUpdateParams as DiscountUpdateParams,
    type DiscountListParams as DiscountListParams,
  };
}
