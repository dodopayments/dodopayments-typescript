// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as MiscAPI from './misc';
import {
  DefaultPageNumberPagination,
  type DefaultPageNumberPaginationParams,
  PagePromise,
} from '../core/pagination';
import { RequestOptions } from '../internal/request-options';

export class Payouts extends APIResource {
  list(
    query: PayoutListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<PayoutListResponsesDefaultPageNumberPagination, PayoutListResponse> {
    return this._client.getAPIList('/payouts', DefaultPageNumberPagination<PayoutListResponse>, {
      query,
      ...options,
    });
  }
}

export type PayoutListResponsesDefaultPageNumberPagination = DefaultPageNumberPagination<PayoutListResponse>;

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

  /**
   * The currency of the payout, represented as an ISO 4217 currency code.
   */
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

  /**
   * The current status of the payout.
   */
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

export declare namespace Payouts {
  export {
    type PayoutListResponse as PayoutListResponse,
    type PayoutListResponsesDefaultPageNumberPagination as PayoutListResponsesDefaultPageNumberPagination,
    type PayoutListParams as PayoutListParams,
  };
}
