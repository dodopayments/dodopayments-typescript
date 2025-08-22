// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import { isRequestOptions } from '../../core';
import * as Core from '../../core';
import * as WebhookEventsAPI from '../webhook-events';
import * as HeadersAPI from './headers';
import { HeaderRetrieveResponse, HeaderUpdateParams, Headers } from './headers';
import { CursorPagePagination, type CursorPagePaginationParams } from '../../pagination';

export class Webhooks extends APIResource {
  headers: HeadersAPI.Headers = new HeadersAPI.Headers(this._client);

  /**
   * Create a new webhook
   */
  create(body: WebhookCreateParams, options?: Core.RequestOptions): Core.APIPromise<WebhookDetails> {
    return this._client.post('/webhooks', { body, ...options });
  }

  /**
   * Get a webhook by id
   */
  retrieve(webhookId: string, options?: Core.RequestOptions): Core.APIPromise<WebhookDetails> {
    return this._client.get(`/webhooks/${webhookId}`, options);
  }

  /**
   * Patch a webhook by id
   */
  update(
    webhookId: string,
    body: WebhookUpdateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<WebhookDetails> {
    return this._client.patch(`/webhooks/${webhookId}`, { body, ...options });
  }

  /**
   * List all webhooks
   */
  list(
    query?: WebhookListParams,
    options?: Core.RequestOptions,
  ): Core.PagePromise<WebhookDetailsCursorPagePagination, WebhookDetails>;
  list(options?: Core.RequestOptions): Core.PagePromise<WebhookDetailsCursorPagePagination, WebhookDetails>;
  list(
    query: WebhookListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.PagePromise<WebhookDetailsCursorPagePagination, WebhookDetails> {
    if (isRequestOptions(query)) {
      return this.list({}, query);
    }
    return this._client.getAPIList('/webhooks', WebhookDetailsCursorPagePagination, { query, ...options });
  }

  /**
   * Delete a webhook by id
   */
  delete(webhookId: string, options?: Core.RequestOptions): Core.APIPromise<void> {
    return this._client.delete(`/webhooks/${webhookId}`, {
      ...options,
      headers: { Accept: '*/*', ...options?.headers },
    });
  }

  /**
   * Get webhook secret by id
   */
  retrieveSecret(
    webhookId: string,
    options?: Core.RequestOptions,
  ): Core.APIPromise<WebhookRetrieveSecretResponse> {
    return this._client.get(`/webhooks/${webhookId}/secret`, options);
  }
}

export class WebhookDetailsCursorPagePagination extends CursorPagePagination<WebhookDetails> {}

export interface WebhookDetails {
  /**
   * The webhook's ID.
   */
  id: string;

  /**
   * Created at timestamp
   */
  created_at: string;

  /**
   * An example webhook name.
   */
  description: string;

  /**
   * Metadata of the webhook
   */
  metadata: { [key: string]: string };

  /**
   * Updated at timestamp
   */
  updated_at: string;

  /**
   * Url endpoint of the webhook
   */
  url: string;

  /**
   * Status of the webhook.
   *
   * If true, events are not sent
   */
  disabled?: boolean | null;

  /**
   * Filter events to the webhook.
   *
   * Webhook event will only be sent for events in the list.
   */
  filter_types?: Array<string> | null;

  /**
   * Configured rate limit
   */
  rate_limit?: number | null;
}

export interface WebhookRetrieveSecretResponse {
  secret: string;
}

export interface WebhookCreateParams {
  /**
   * Url of the webhook
   */
  url: string;

  description?: string | null;

  /**
   * Create the webhook in a disabled state.
   *
   * Default is false
   */
  disabled?: boolean | null;

  /**
   * Filter events to the webhook.
   *
   * Webhook event will only be sent for events in the list.
   */
  filter_types?: Array<WebhookEventsAPI.WebhookEventType>;

  /**
   * Custom headers to be passed
   */
  headers?: { [key: string]: string } | null;

  /**
   * The request's idempotency key
   */
  idempotency_key?: string | null;

  /**
   * Metadata to be passed to the webhook Defaut is {}
   */
  metadata?: { [key: string]: string } | null;

  rate_limit?: number | null;
}

export interface WebhookUpdateParams {
  /**
   * Description of the webhook
   */
  description?: string | null;

  /**
   * To Disable the endpoint, set it to true.
   */
  disabled?: boolean | null;

  /**
   * Filter events to the endpoint.
   *
   * Webhook event will only be sent for events in the list.
   */
  filter_types?: Array<WebhookEventsAPI.WebhookEventType> | null;

  /**
   * Metadata
   */
  metadata?: { [key: string]: string } | null;

  /**
   * Rate limit
   */
  rate_limit?: number | null;

  /**
   * Url endpoint
   */
  url?: string | null;
}

export interface WebhookListParams extends CursorPagePaginationParams {}

Webhooks.WebhookDetailsCursorPagePagination = WebhookDetailsCursorPagePagination;
Webhooks.Headers = Headers;

export declare namespace Webhooks {
  export {
    type WebhookDetails as WebhookDetails,
    type WebhookRetrieveSecretResponse as WebhookRetrieveSecretResponse,
    WebhookDetailsCursorPagePagination as WebhookDetailsCursorPagePagination,
    type WebhookCreateParams as WebhookCreateParams,
    type WebhookUpdateParams as WebhookUpdateParams,
    type WebhookListParams as WebhookListParams,
  };

  export {
    Headers as Headers,
    type HeaderRetrieveResponse as HeaderRetrieveResponse,
    type HeaderUpdateParams as HeaderUpdateParams,
  };
}
