// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import { isRequestOptions } from '../core';
import * as Core from '../core';
import { DefaultPageNumberPagination, type DefaultPageNumberPaginationParams } from '../pagination';

export class Disputes extends APIResource {
  retrieve(disputeId: string, options?: Core.RequestOptions): Core.APIPromise<Dispute> {
    return this._client.get(`/disputes/${disputeId}`, options);
  }

  list(
    query?: DisputeListParams,
    options?: Core.RequestOptions,
  ): Core.PagePromise<DisputesDefaultPageNumberPagination, Dispute>;
  list(options?: Core.RequestOptions): Core.PagePromise<DisputesDefaultPageNumberPagination, Dispute>;
  list(
    query: DisputeListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.PagePromise<DisputesDefaultPageNumberPagination, Dispute> {
    if (isRequestOptions(query)) {
      return this.list({}, query);
    }
    return this._client.getAPIList('/disputes', DisputesDefaultPageNumberPagination, { query, ...options });
  }
}

export class DisputesDefaultPageNumberPagination extends DefaultPageNumberPagination<Dispute> {}

export interface Dispute {
  amount: string;

  business_id: string;

  created_at: string;

  currency: string;

  dispute_id: string;

  dispute_stage: 'pre_dispute' | 'dispute' | 'pre_arbitration';

  dispute_status:
    | 'dispute_opened'
    | 'dispute_expired'
    | 'dispute_accepted'
    | 'dispute_cancelled'
    | 'dispute_challenged'
    | 'dispute_won'
    | 'dispute_lost';

  payment_id: string;
}

export interface DisputeListParams extends DefaultPageNumberPaginationParams {}

Disputes.DisputesDefaultPageNumberPagination = DisputesDefaultPageNumberPagination;

export declare namespace Disputes {
  export {
    type Dispute as Dispute,
    DisputesDefaultPageNumberPagination as DisputesDefaultPageNumberPagination,
    type DisputeListParams as DisputeListParams,
  };
}
