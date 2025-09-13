// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as MiscAPI from './misc';
import * as PaymentsAPI from './payments';
import { APIPromise } from '../core/api-promise';
import {
  DefaultPageNumberPagination,
  type DefaultPageNumberPaginationParams,
  PagePromise,
} from '../core/pagination';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Refunds extends APIResource {
  create(body: RefundCreateParams, options?: RequestOptions): APIPromise<Refund> {
    return this._client.post('/refunds', { body, ...options });
  }

  retrieve(refundID: string, options?: RequestOptions): APIPromise<Refund> {
    return this._client.get(path`/refunds/${refundID}`, options);
  }

  list(
    query: RefundListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<RefundListResponsesDefaultPageNumberPagination, RefundListResponse> {
    return this._client.getAPIList('/refunds', DefaultPageNumberPagination<RefundListResponse>, {
      query,
      ...options,
    });
  }
}

export type RefundListResponsesDefaultPageNumberPagination = DefaultPageNumberPagination<RefundListResponse>;

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
   * Details about the customer for this refund (from the associated payment)
   */
  customer: PaymentsAPI.CustomerLimitedDetails;

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

export interface RefundListResponse {
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

export declare namespace Refunds {
  export {
    type Refund as Refund,
    type RefundStatus as RefundStatus,
    type RefundListResponse as RefundListResponse,
    type RefundListResponsesDefaultPageNumberPagination as RefundListResponsesDefaultPageNumberPagination,
    type RefundCreateParams as RefundCreateParams,
    type RefundListParams as RefundListParams,
  };
}
