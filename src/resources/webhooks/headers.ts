// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as Core from '../../core';

export class Headers extends APIResource {
  /**
   * Get a webhook by id
   */
  retrieve(webhookId: string, options?: Core.RequestOptions): Core.APIPromise<HeaderRetrieveResponse> {
    return this._client.get(`/webhooks/${webhookId}/headers`, options);
  }

  /**
   * Patch a webhook by id
   */
  update(webhookId: string, body: HeaderUpdateParams, options?: Core.RequestOptions): Core.APIPromise<void> {
    return this._client.patch(`/webhooks/${webhookId}/headers`, {
      body,
      ...options,
      headers: { Accept: '*/*', ...options?.headers },
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
