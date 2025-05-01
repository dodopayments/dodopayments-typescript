// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import { isRequestOptions } from '../core';
import * as Core from '../core';
import * as MiscAPI from './misc';
import { DefaultPageNumberPagination, type DefaultPageNumberPaginationParams } from '../pagination';

export class Payouts extends APIResource {
  list(
    query?: PayoutListParams,
    options?: Core.RequestOptions,
  ): Core.PagePromise<PayoutListResponsesDefaultPageNumberPagination, PayoutListResponse>;
  list(
    options?: Core.RequestOptions,
  ): Core.PagePromise<PayoutListResponsesDefaultPageNumberPagination, PayoutListResponse>;
  list(
    query: PayoutListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.PagePromise<PayoutListResponsesDefaultPageNumberPagination, PayoutListResponse> {
    if (isRequestOptions(query)) {
      return this.list({}, query);
    }
    return this._client.getAPIList('/payouts', PayoutListResponsesDefaultPageNumberPagination, {
      query,
      ...options,
    });
  }
}

export class PayoutListResponsesDefaultPageNumberPagination extends DefaultPageNumberPagination<PayoutListResponse> {}

export interface PayoutListResponse {
  /**
   * The total amount of the payout.
   */
  amount: number;

  /**
   * The unique identifier of the business associated with the payout.
   */
  business_id: string;

  /**
   * The total value of chargebacks associated with the payout.
   */
  chargebacks: number;

  /**
   * The timestamp when the payout was created, in UTC.
   */
  created_at: string;

  currency: MiscAPI.Currency;

  /**
   * The fee charged for processing the payout.
   */
  fee: number;

  /**
   * The payment method used for the payout (e.g., bank transfer, card, etc.).
   */
  payment_method: string;

  /**
   * The unique identifier of the payout.
   */
  payout_id: string;

  /**
   * The total value of refunds associated with the payout.
   */
  refunds: number;

  status: 'not_initiated' | 'in_progress' | 'on_hold' | 'failed' | 'success';

  /**
   * The tax applied to the payout.
   */
  tax: number;

  /**
   * The timestamp when the payout was last updated, in UTC.
   */
  updated_at: string;

  /**
   * The name of the payout recipient or purpose.
   */
  name?: string | null;

  /**
   * The URL of the document associated with the payout.
   */
  payout_document_url?: string | null;

  /**
   * Any additional remarks or notes associated with the payout.
   */
  remarks?: string | null;
}

export interface PayoutListParams extends DefaultPageNumberPaginationParams {}

Payouts.PayoutListResponsesDefaultPageNumberPagination = PayoutListResponsesDefaultPageNumberPagination;

export declare namespace Payouts {
  export {
    type PayoutListResponse as PayoutListResponse,
    PayoutListResponsesDefaultPageNumberPagination as PayoutListResponsesDefaultPageNumberPagination,
    type PayoutListParams as PayoutListParams,
  };
}
