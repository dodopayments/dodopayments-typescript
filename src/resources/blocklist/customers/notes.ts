// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import { APIPromise } from '../../../core/api-promise';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

export class Notes extends APIResource {
  create(entryID: string, body: NoteCreateParams, options?: RequestOptions): APIPromise<BlockedCustomerNote> {
    return this._client.post(path`/blocklist/customers/${entryID}/notes`, { body, ...options });
  }

  update(
    noteID: string,
    params: NoteUpdateParams,
    options?: RequestOptions,
  ): APIPromise<BlockedCustomerNote> {
    const { entry_id, ...body } = params;
    return this._client.patch(path`/blocklist/customers/${entry_id}/notes/${noteID}`, { body, ...options });
  }
}

export interface BlockedCustomerNote {
  id: string;

  created_at: string;

  note: string;

  author_email?: string | null;

  updated_at?: string | null;
}

export interface NoteRequest {
  note: string;
}

export interface NoteCreateParams {
  note: string;
}

export interface NoteUpdateParams {
  /**
   * Path param: Blocklist entry id
   */
  entry_id: string;

  /**
   * Body param
   */
  note: string;
}

export declare namespace Notes {
  export {
    type BlockedCustomerNote as BlockedCustomerNote,
    type NoteRequest as NoteRequest,
    type NoteCreateParams as NoteCreateParams,
    type NoteUpdateParams as NoteUpdateParams,
  };
}
