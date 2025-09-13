// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as PaymentsAPI from './payments';
import { APIPromise } from '../core/api-promise';
import {
  DefaultPageNumberPagination,
  type DefaultPageNumberPaginationParams,
  PagePromise,
} from '../core/pagination';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Disputes extends APIResource {
  retrieve(disputeID: string, options?: RequestOptions): APIPromise<GetDispute> {
    return this._client.get(path`/disputes/${disputeID}`, options);
  }

  list(
    query: DisputeListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<DisputeListResponsesDefaultPageNumberPagination, DisputeListResponse> {
    return this._client.getAPIList('/disputes', DefaultPageNumberPagination<DisputeListResponse>, {
      query,
      ...options,
    });
  }
}

export type DisputeListResponsesDefaultPageNumberPagination =
  DefaultPageNumberPagination<DisputeListResponse>;

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

export interface GetDispute {
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

export declare namespace Disputes {
  export {
    type Dispute as Dispute,
    type DisputeStage as DisputeStage,
    type DisputeStatus as DisputeStatus,
    type GetDispute as GetDispute,
    type DisputeListResponse as DisputeListResponse,
    type DisputeListResponsesDefaultPageNumberPagination as DisputeListResponsesDefaultPageNumberPagination,
    type DisputeListParams as DisputeListParams,
  };
}
