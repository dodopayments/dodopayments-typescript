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
   *
   * @example
   * ```ts
   * const breakups = await client.payouts.breakup.retrieve(
   *   'pyt_zFTrrn4sk3x3y2vjDBW3T',
   * );
   * ```
   */
  retrieve(payoutID: string, options?: RequestOptions): APIPromise<BreakupRetrieveResponse> {
    return this._client.get(path`/payouts/${payoutID}/breakup`, options);
  }
}

export type BreakupRetrieveResponse = Array<BreakupRetrieveResponse.BreakupRetrieveResponseItem>;

export namespace BreakupRetrieveResponse {
  /**
   * Payout breakup aggregated by event type, with amounts in the payout's currency.
   *
   * The rows sum to the payout amount. The last row can be `unattributed`, which is
   * not a ledger event type. It holds the payout amount less the entries that fund
   * it, and it takes either sign:
   *
   * - Positive: the entries come to less than the payout, so the payout drew on the
   *   balance an earlier cycle left over. A cycle of refunds and disputes produces a
   *   large positive value.
   * - Negative: the entries come to more than the payout, and the remainder funds a
   *   later payout. This is the common case, for two reasons. The walk that claims
   *   the entries stops at the first one that reaches its target, so it passes the
   *   target by part of an entry. The target is also the gross debit, which holds
   *   the payout fee, and the fee is not a line here.
   *
   * The row is absent when the two are equal.
   */
  export interface BreakupRetrieveResponseItem {
    /**
     * The type of balance ledger event (e.g., "payment", "refund", "dispute",
     * "payment_fees"), or `unattributed` for the payout amount the entries do not
     * account for.
     */
    event_type: string;

    /**
     * Total amount for this event type in the payout's currency, in that currency's
     * smallest unit (cents for USD, yen for JPY, fils for KWD).
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
