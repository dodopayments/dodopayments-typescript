// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as WebhookEventsAPI from '../webhook-events';
import * as HeadersAPI from './headers';
import { HeaderRetrieveResponse, HeaderUpdateParams, Headers } from './headers';
import { APIPromise } from '../../core/api-promise';
import { CursorPagePagination, type CursorPagePaginationParams, PagePromise } from '../../core/pagination';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Webhooks extends APIResource {
  headers: HeadersAPI.Headers = new HeadersAPI.Headers(this._client);

  /**
   * Create a new webhook
   */
  create(body: WebhookCreateParams, options?: RequestOptions): APIPromise<WebhookDetails> {
    return this._client.post('/webhooks', { body, ...options });
  }

  /**
   * Get a webhook by id
   */
  retrieve(webhookID: string, options?: RequestOptions): APIPromise<WebhookDetails> {
    return this._client.get(path`/webhooks/${webhookID}`, options);
  }

  /**
   * Patch a webhook by id
   */
  update(webhookID: string, body: WebhookUpdateParams, options?: RequestOptions): APIPromise<WebhookDetails> {
    return this._client.patch(path`/webhooks/${webhookID}`, { body, ...options });
  }

  /**
   * List all webhooks
   */
  list(
    query: WebhookListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<WebhookDetailsCursorPagePagination, WebhookDetails> {
    return this._client.getAPIList('/webhooks', CursorPagePagination<WebhookDetails>, { query, ...options });
  }

  /**
   * Delete a webhook by id
   */
  delete(webhookID: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/webhooks/${webhookID}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Get webhook secret by id
   */
  retrieveSecret(webhookID: string, options?: RequestOptions): APIPromise<WebhookRetrieveSecretResponse> {
    return this._client.get(path`/webhooks/${webhookID}/secret`, options);
  }
}

export type WebhookDetailsCursorPagePagination = CursorPagePagination<WebhookDetails>;

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

Webhooks.Headers = Headers;

export declare namespace Webhooks {
  export {
    type WebhookDetails as WebhookDetails,
    type WebhookRetrieveSecretResponse as WebhookRetrieveSecretResponse,
    type WebhookDetailsCursorPagePagination as WebhookDetailsCursorPagePagination,
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
