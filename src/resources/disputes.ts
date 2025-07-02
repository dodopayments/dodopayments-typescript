// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import { isRequestOptions } from '../core';
import * as Core from '../core';
import * as PaymentsAPI from './payments';
import { DefaultPageNumberPagination, type DefaultPageNumberPaginationParams } from '../pagination';

export class Disputes extends APIResource {
  retrieve(disputeId: string, options?: Core.RequestOptions): Core.APIPromise<DisputeRetrieveResponse> {
    return this._client.get(`/disputes/${disputeId}`, options);
  }

  list(
    query?: DisputeListParams,
    options?: Core.RequestOptions,
  ): Core.PagePromise<DisputeListResponsesDefaultPageNumberPagination, DisputeListResponse>;
  list(
    options?: Core.RequestOptions,
  ): Core.PagePromise<DisputeListResponsesDefaultPageNumberPagination, DisputeListResponse>;
  list(
    query: DisputeListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.PagePromise<DisputeListResponsesDefaultPageNumberPagination, DisputeListResponse> {
    if (isRequestOptions(query)) {
      return this.list({}, query);
    }
    return this._client.getAPIList('/disputes', DisputeListResponsesDefaultPageNumberPagination, {
      query,
      ...options,
    });
  }
}

export class DisputeListResponsesDefaultPageNumberPagination extends DefaultPageNumberPagination<DisputeListResponse> {}

export interface Dispute {
  /**
   * The amount involved in the dispute, represented as a string to accommodate
   * precision.
   */
  amount: string;

  /**
   * The unique identifier of the business involved in the dispute.
   */
  business_id: string;

  /**
   * The timestamp of when the dispute was created, in UTC.
   */
  created_at: string;

  /**
   * The currency of the disputed amount, represented as an ISO 4217 currency code.
   */
  currency: string;

  /**
   * The unique identifier of the dispute.
   */
  dispute_id: string;

  /**
   * The current stage of the dispute process.
   */
  dispute_stage: DisputeStage;

  /**
   * The current status of the dispute.
   */
  dispute_status: DisputeStatus;

  /**
   * The unique identifier of the payment associated with the dispute.
   */
  payment_id: string;

  /**
   * Remarks
   */
  remarks?: string | null;
}

export type DisputeStage = 'pre_dispute' | 'dispute' | 'pre_arbitration';

export type DisputeStatus =
  | 'dispute_opened'
  | 'dispute_expired'
  | 'dispute_accepted'
  | 'dispute_cancelled'
  | 'dispute_challenged'
  | 'dispute_won'
  | 'dispute_lost';

export interface DisputeRetrieveResponse {
  /**
   * The amount involved in the dispute, represented as a string to accommodate
   * precision.
   */
  amount: string;

  /**
   * The unique identifier of the business involved in the dispute.
   */
  business_id: string;

  /**
   * The timestamp of when the dispute was created, in UTC.
   */
  created_at: string;

  /**
   * The currency of the disputed amount, represented as an ISO 4217 currency code.
   */
  currency: string;

  /**
   * The customer who filed the dispute
   */
  customer: PaymentsAPI.CustomerLimitedDetails;

  /**
   * The unique identifier of the dispute.
   */
  dispute_id: string;

  /**
   * The current stage of the dispute process.
   */
  dispute_stage: DisputeStage;

  /**
   * The current status of the dispute.
   */
  dispute_status: DisputeStatus;

  /**
   * The unique identifier of the payment associated with the dispute.
   */
  payment_id: string;

  /**
   * Reason for the dispute
   */
  reason?: string | null;

  /**
   * Remarks
   */
  remarks?: string | null;
}

export interface DisputeListResponse {
  /**
   * The amount involved in the dispute, represented as a string to accommodate
   * precision.
   */
  amount: string;

  /**
   * The unique identifier of the business involved in the dispute.
   */
  business_id: string;

  /**
   * The timestamp of when the dispute was created, in UTC.
   */
  created_at: string;

  /**
   * The currency of the disputed amount, represented as an ISO 4217 currency code.
   */
  currency: string;

  /**
   * The unique identifier of the dispute.
   */
  dispute_id: string;

  /**
   * The current stage of the dispute process.
   */
  dispute_stage: DisputeStage;

  /**
   * The current status of the dispute.
   */
  dispute_status: DisputeStatus;

  /**
   * The unique identifier of the payment associated with the dispute.
   */
  payment_id: string;
}

export interface DisputeListParams extends DefaultPageNumberPaginationParams {
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
   * Filter by dispute stage
   */
  dispute_stage?: 'pre_dispute' | 'dispute' | 'pre_arbitration';

  /**
   * Filter by dispute status
   */
  dispute_status?:
    | 'dispute_opened'
    | 'dispute_expired'
    | 'dispute_accepted'
    | 'dispute_cancelled'
    | 'dispute_challenged'
    | 'dispute_won'
    | 'dispute_lost';
}

Disputes.DisputeListResponsesDefaultPageNumberPagination = DisputeListResponsesDefaultPageNumberPagination;

export declare namespace Disputes {
  export {
    type Dispute as Dispute,
    type DisputeStage as DisputeStage,
    type DisputeStatus as DisputeStatus,
    type DisputeRetrieveResponse as DisputeRetrieveResponse,
    type DisputeListResponse as DisputeListResponse,
    DisputeListResponsesDefaultPageNumberPagination as DisputeListResponsesDefaultPageNumberPagination,
    type DisputeListParams as DisputeListParams,
  };
}
