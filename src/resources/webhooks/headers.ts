// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Headers extends APIResource {
  /**
   * Get a webhook by id
   */
  retrieve(webhookID: string, options?: RequestOptions): APIPromise<HeaderRetrieveResponse> {
    return this._client.get(path`/webhooks/${webhookID}/headers`, options);
  }

  /**
   * Patch a webhook by id
   */
  update(webhookID: string, body: HeaderUpdateParams, options?: RequestOptions): APIPromise<void> {
    return this._client.patch(path`/webhooks/${webhookID}/headers`, {
      body,
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

/**
 * The value of the headers is returned in the `headers` field.
 *
 * Sensitive headers that have been redacted are returned in the sensitive field.
 */
export interface HeaderRetrieveResponse {
  /**
   * List of headers configured
   */
  headers: { [key: string]: string };

  /**
   * Sensitive headers without the value
   */
  sensitive: Array<string>;
}

export interface HeaderUpdateParams {
  /**
   * Object of header-value pair to update or add
   */
  headers: { [key: string]: string };
}

export declare namespace Headers {
  export {
    type HeaderRetrieveResponse as HeaderRetrieveResponse,
    type HeaderUpdateParams as HeaderUpdateParams,
  };
}
