// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import { APIPromise } from '../../../core/api-promise';
import {
  DefaultPageNumberPagination,
  type DefaultPageNumberPaginationParams,
  PagePromise,
} from '../../../core/pagination';
import { buildHeaders } from '../../../internal/headers';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

export class Details extends APIResource {
  /**
   * Returns paginated individual balance ledger entries for a payout, with each
   * entry's amount pro-rated into the payout's currency. Supports pagination via
   * `page_size` (default 10, max 100) and `page_number` (default 0) query
   * parameters.
   */
  list(
    payoutID: string,
    query: DetailListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<DetailListResponsesDefaultPageNumberPagination, DetailListResponse> {
    return this._client.getAPIList(
      path`/payouts/${payoutID}/breakup/details`,
      DefaultPageNumberPagination<DetailListResponse>,
      { query, ...options },
    );
  }

  /**
   * Downloads the complete payout breakup as a CSV file. Each row represents a
   * balance ledger entry with columns: Ledger ID, Event Type, Original Amount,
   * Original Currency, Reference Object ID, Description, Created At, USD Equivalent
   * Amount, and Payout Currency Amount.
   */
  downloadCsv(payoutID: string, options?: RequestOptions): APIPromise<void> {
    return this._client.get(path`/payouts/${payoutID}/breakup/details/csv`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

export type DetailListResponsesDefaultPageNumberPagination = DefaultPageNumberPagination<DetailListResponse>;

/**
 * Individual balance ledger entry for a payout, with amounts pro-rated into the
 * payout's currency.
 */
export interface DetailListResponse {
  /**
   * Unique identifier of the balance ledger entry.
   */
  id: string;

  /**
   * Timestamp when this entry was created.
   */
  created_at: string;

  /**
   * The type of balance ledger event (e.g., "payment", "refund", "dispute",
   * "payment_fees").
   */
  event_type: string;

  /**
   * Original amount in the original currency (in smallest currency unit, e.g.,
   * cents).
   */
  original_amount: number;

  /**
   * Original currency as ISO 4217 code (e.g., "USD", "EUR").
   */
  original_currency: string;

  /**
   * Amount in the payout's currency (in smallest currency unit). Uses cumulative
   * rounding to ensure sum matches payout total exactly.
   */
  payout_currency_amount: number;

  /**
   * USD equivalent of the original amount (in cents).
   */
  usd_equivalent_amount: number;

  /**
   * Human-readable description of the transaction.
   */
  description?: string | null;

  /**
   * ID of the related object (e.g., payment ID, refund ID) if applicable.
   */
  reference_object_id?: string | null;
}

export interface DetailListParams extends DefaultPageNumberPaginationParams {}

export declare namespace Details {
  export {
    type DetailListResponse as DetailListResponse,
    type DetailListResponsesDefaultPageNumberPagination as DetailListResponsesDefaultPageNumberPagination,
    type DetailListParams as DetailListParams,
  };
}
