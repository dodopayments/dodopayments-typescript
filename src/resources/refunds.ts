// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import { isRequestOptions } from '../core';
import * as Core from '../core';
import * as MiscAPI from './misc';
import { DefaultPageNumberPagination, type DefaultPageNumberPaginationParams } from '../pagination';

export class Refunds extends APIResource {
  create(body: RefundCreateParams, options?: Core.RequestOptions): Core.APIPromise<Refund> {
    return this._client.post('/refunds', { body, ...options });
  }

  retrieve(refundId: string, options?: Core.RequestOptions): Core.APIPromise<Refund> {
    return this._client.get(`/refunds/${refundId}`, options);
  }

  list(
    query?: RefundListParams,
    options?: Core.RequestOptions,
  ): Core.PagePromise<RefundsDefaultPageNumberPagination, Refund>;
  list(options?: Core.RequestOptions): Core.PagePromise<RefundsDefaultPageNumberPagination, Refund>;
  list(
    query: RefundListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.PagePromise<RefundsDefaultPageNumberPagination, Refund> {
    if (isRequestOptions(query)) {
      return this.list({}, query);
    }
    return this._client.getAPIList('/refunds', RefundsDefaultPageNumberPagination, { query, ...options });
  }
}

export class RefundsDefaultPageNumberPagination extends DefaultPageNumberPagination<Refund> {}

export interface Refund {
  /**
   * The unique identifier of the business issuing the refund.
   */
  business_id: string;

  /**
   * The timestamp of when the refund was created in UTC.
   */
  created_at: string;

  /**
   * If true the refund is a partial refund
   */
  is_partial: boolean;

  /**
   * The unique identifier of the payment associated with the refund.
   */
  payment_id: string;

  /**
   * The unique identifier of the refund.
   */
  refund_id: string;

  /**
   * The current status of the refund.
   */
  status: RefundStatus;

  /**
   * The refunded amount.
   */
  amount?: number | null;

  /**
   * The currency of the refund, represented as an ISO 4217 currency code.
   */
  currency?: MiscAPI.Currency | null;

  /**
   * The reason provided for the refund, if any. Optional.
   */
  reason?: string | null;
}

export type RefundStatus = 'succeeded' | 'failed' | 'pending' | 'review';

export interface RefundCreateParams {
  /**
   * The unique identifier of the payment to be refunded.
   */
  payment_id: string;

  /**
   * Partially Refund an Individual Item
   */
  items?: Array<RefundCreateParams.Item> | null;

  /**
   * The reason for the refund, if any. Maximum length is 3000 characters. Optional.
   */
  reason?: string | null;
}

export namespace RefundCreateParams {
  export interface Item {
    /**
     * The id of the item (i.e. `product_id` or `addon_id`)
     */
    item_id: string;

    /**
     * The amount to refund. if None the whole item is refunded
     */
    amount?: number | null;

    /**
     * Specify if tax is inclusive of the refund. Default true.
     */
    tax_inclusive?: boolean;
  }
}

export interface RefundListParams extends DefaultPageNumberPaginationParams {
  /**
   * Get events after this created time
   */
  created_at_gte?: string;

  /**
   * Get events created before this time
   */
  created_at_lte?: string;

  /**
   * Filter by customer_id
   */
  customer_id?: string;

  /**
   * Filter by status
   */
  status?: 'succeeded' | 'failed' | 'pending' | 'review';
}

Refunds.RefundsDefaultPageNumberPagination = RefundsDefaultPageNumberPagination;

export declare namespace Refunds {
  export {
    type Refund as Refund,
    type RefundStatus as RefundStatus,
    RefundsDefaultPageNumberPagination as RefundsDefaultPageNumberPagination,
    type RefundCreateParams as RefundCreateParams,
    type RefundListParams as RefundListParams,
  };
}
