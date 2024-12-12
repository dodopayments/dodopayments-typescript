// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import { isRequestOptions } from '../core';
import * as Core from '../core';

export class Disputes extends APIResource {
  retrieve(disputeId: string, options?: Core.RequestOptions): Core.APIPromise<Dispute> {
    return this._client.get(`/disputes/${disputeId}`, options);
  }

  list(query?: DisputeListParams, options?: Core.RequestOptions): Core.APIPromise<DisputeListResponse>;
  list(options?: Core.RequestOptions): Core.APIPromise<DisputeListResponse>;
  list(
    query: DisputeListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.APIPromise<DisputeListResponse> {
    if (isRequestOptions(query)) {
      return this.list({}, query);
    }
    return this._client.get('/disputes', { query, ...options });
  }
}

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

export interface DisputeListResponse {
  items: Array<Dispute>;
}

export interface DisputeListParams {
  /**
   * Page number default is 0
   */
  page_number?: number | null;

  /**
   * Page size default is 10 max is 100
   */
  page_size?: number | null;
}

export declare namespace Disputes {
  export {
    type Dispute as Dispute,
    type DisputeListResponse as DisputeListResponse,
    type DisputeListParams as DisputeListParams,
  };
}
