// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as CustomersAPI from './customers';
import * as NotesAPI from './notes';
import { BlockedCustomerNote, NoteCreateParams, NoteRequest, NoteUpdateParams, Notes } from './notes';
import { APIPromise } from '../../../core/api-promise';
import {
  DefaultPageNumberPagination,
  type DefaultPageNumberPaginationParams,
  PagePromise,
} from '../../../core/pagination';
import { buildHeaders } from '../../../internal/headers';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

export class Customers extends APIResource {
  notes: NotesAPI.Notes = new NotesAPI.Notes(this._client);

  list(
    query: CustomerListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<BlockedCustomersDefaultPageNumberPagination, BlockedCustomer> {
    return this._client.getAPIList('/blocklist/customers', DefaultPageNumberPagination<BlockedCustomer>, {
      query,
      ...options,
    });
  }

  create(body: CustomerCreateParams, options?: RequestOptions): APIPromise<BlockedCustomer> {
    return this._client.post('/blocklist/customers', { body, ...options });
  }

  retrieve(entryID: string, options?: RequestOptions): APIPromise<BlockedCustomer> {
    return this._client.get(path`/blocklist/customers/${entryID}`, options);
  }

  delete(entryID: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/blocklist/customers/${entryID}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

export type BlockedCustomersDefaultPageNumberPagination = DefaultPageNumberPagination<BlockedCustomer>;

export interface BlockByCustomerID {
  /**
   * Customer to block. The block still applies to that customer's email.
   */
  customer_id: string;
}

export interface BlockByEmail {
  /**
   * Email to block. It must belong to an existing customer of this business.
   */
  email: string;
}

/**
 * Which customer to block. Untagged, so the caller sends `customer_id` or `email`
 * at the top level, as `CustomerRequest` does on the payment routes. A body that
 * carries both matches the first variant, so `customer_id` wins.
 */
export type BlockIdentifier = BlockByCustomerID | BlockByEmail;

export interface BlockedCustomer {
  id: string;

  created_at: string;

  customer_email: string;

  customer_id: string;

  customer_name: string;

  /**
   * Customer id or email that the merchant supplied.
   */
  identifier: string;

  /**
   * Where a block came from. `Api` marks an API-key caller, which carries no
   * dashboard actor. The other values name the screen the merchant used.
   */
  source: BlockedCustomerSource;

  /**
   * Dashboard user who blocked the customer. `null` for an API-key caller.
   */
  blocked_by_email?: string | null;

  /**
   * Subscriptions this block cancelled. Present on the create response only.
   */
  cancelled_subscription_ids?: Array<string> | null;

  /**
   * Activity log. Present on the detail response only.
   */
  notes?: Array<NotesAPI.BlockedCustomerNote> | null;

  reason?: string | null;

  /**
   * Subscriptions this block left live, because the cancel failed or the inline
   * batch filled up. Repeat the create call to continue; the block itself is already
   * in force.
   */
  remaining_subscription_ids?: Array<string> | null;

  /**
   * False when the block left live subscriptions behind, including the case where
   * the sweep could not list them and `remaining_subscription_ids` is therefore
   * unknown. Repeat the create call until it reads true.
   */
  subscriptions_swept?: boolean | null;

  unblocked_at?: string | null;
}

/**
 * Where a block came from. `Api` marks an API-key caller, which carries no
 * dashboard actor. The other values name the screen the merchant used.
 */
export type BlockedCustomerSource =
  | 'blocklist_page'
  | 'customer_page'
  | 'payment_page'
  | 'dispute_page'
  | 'api';

export type CreateBlockedCustomerRequest =
  | CreateBlockedCustomerRequest.BlocklistCustomersBlockByCustomerID
  | CreateBlockedCustomerRequest.BlocklistCustomersBlockByEmail;

export namespace CreateBlockedCustomerRequest {
  export interface BlocklistCustomersBlockByCustomerID extends CustomersAPI.BlockByCustomerID {
    /**
     * Why the merchant blocked this customer. The entry page shows it.
     */
    reason?: string | null;

    /**
     * Screen the merchant blocked from. Ignored for an API-key caller, whose entry
     * always records `api`. A dashboard caller that omits it records `blocklist_page`.
     */
    source?: CustomersAPI.BlockedCustomerSource | null;
  }

  export interface BlocklistCustomersBlockByEmail extends CustomersAPI.BlockByEmail {
    /**
     * Why the merchant blocked this customer. The entry page shows it.
     */
    reason?: string | null;

    /**
     * Screen the merchant blocked from. Ignored for an API-key caller, whose entry
     * always records `api`. A dashboard caller that omits it records `blocklist_page`.
     */
    source?: CustomersAPI.BlockedCustomerSource | null;
  }
}

export interface CustomerListParams extends DefaultPageNumberPaginationParams {
  /**
   * Filter by the dashboard user who blocked the customer.
   */
  blocked_by_email?: string | null;

  /**
   * Blocked on or after this time.
   */
  created_at_gte?: string | null;

  /**
   * Blocked on or before this time.
   */
  created_at_lte?: string | null;

  /**
   * Partial, case-insensitive match on the email and on the customer id.
   */
  identifier?: string | null;
}

export type CustomerCreateParams =
  | CustomerCreateParams.BlocklistCustomersBlockByCustomerID
  | CustomerCreateParams.BlocklistCustomersBlockByEmail;

export declare namespace CustomerCreateParams {
  export interface BlocklistCustomersBlockByCustomerID {
    /**
     * Customer to block. The block still applies to that customer's email.
     */
    customer_id: string;

    /**
     * Why the merchant blocked this customer. The entry page shows it.
     */
    reason?: string | null;

    /**
     * Screen the merchant blocked from. Ignored for an API-key caller, whose entry
     * always records `api`. A dashboard caller that omits it records `blocklist_page`.
     */
    source?: BlockedCustomerSource | null;
  }

  export interface BlocklistCustomersBlockByEmail {
    /**
     * Email to block. It must belong to an existing customer of this business.
     */
    email: string;

    /**
     * Why the merchant blocked this customer. The entry page shows it.
     */
    reason?: string | null;

    /**
     * Screen the merchant blocked from. Ignored for an API-key caller, whose entry
     * always records `api`. A dashboard caller that omits it records `blocklist_page`.
     */
    source?: BlockedCustomerSource | null;
  }
}

Customers.Notes = Notes;

export declare namespace Customers {
  export {
    type BlockByCustomerID as BlockByCustomerID,
    type BlockByEmail as BlockByEmail,
    type BlockIdentifier as BlockIdentifier,
    type BlockedCustomer as BlockedCustomer,
    type BlockedCustomerSource as BlockedCustomerSource,
    type CreateBlockedCustomerRequest as CreateBlockedCustomerRequest,
    type BlockedCustomersDefaultPageNumberPagination as BlockedCustomersDefaultPageNumberPagination,
    type CustomerListParams as CustomerListParams,
    type CustomerCreateParams as CustomerCreateParams,
  };

  export {
    Notes as Notes,
    type BlockedCustomerNote as BlockedCustomerNote,
    type NoteRequest as NoteRequest,
    type NoteCreateParams as NoteCreateParams,
    type NoteUpdateParams as NoteUpdateParams,
  };
}
