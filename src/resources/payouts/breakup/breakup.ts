// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as DetailsAPI from './details';
import {
  DetailListParams,
  DetailListResponse,
  DetailListResponsesDefaultPageNumberPagination,
  Details,
} from './details';
import { APIPromise } from '../../../core/api-promise';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

export class Breakup extends APIResource {
  details: DetailsAPI.Details = new DetailsAPI.Details(this._client);

  /**
   * Returns the breakdown of a payout by event type (payments, refunds, disputes,
   * fees, etc.) in the payout's currency. Each amount is proportionally allocated
   * based on USD equivalent values, ensuring the total sums exactly to the payout
   * amount.
   */
  retrieve(payoutID: string, options?: RequestOptions): APIPromise<BreakupRetrieveResponse> {
    return this._client.get(path`/payouts/${payoutID}/breakup`, options);
  }
}

export type BreakupRetrieveResponse = Array<BreakupRetrieveResponse.BreakupRetrieveResponseItem>;

export namespace BreakupRetrieveResponse {
  /**
   * Payout breakup aggregated by event type, with amounts in the payout's currency.
   */
  export interface BreakupRetrieveResponseItem {
    /**
     * The type of balance ledger event (e.g., "payment", "refund", "dispute",
     * "payment_fees").
     */
    event_type: string;

    /**
     * Total amount for this event type in the payout's currency (in smallest currency
     * unit, e.g., cents).
     */
    total: number;
  }
}

Breakup.Details = Details;

export declare namespace Breakup {
  export { type BreakupRetrieveResponse as BreakupRetrieveResponse };

  export {
    Details as Details,
    type DetailListResponse as DetailListResponse,
    type DetailListResponsesDefaultPageNumberPagination as DetailListResponsesDefaultPageNumberPagination,
    type DetailListParams as DetailListParams,
  };
}
