// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import { isRequestOptions } from '../core';
import * as Core from '../core';
import { DefaultPageNumberPagination, type DefaultPageNumberPaginationParams } from '../pagination';

export class WebhookEvents extends APIResource {
  retrieve(webhookEventId: string, options?: Core.RequestOptions): Core.APIPromise<WebhookEvent> {
    return this._client.get(`/webhook_events/${webhookEventId}`, options);
  }

  list(
    query?: WebhookEventListParams,
    options?: Core.RequestOptions,
  ): Core.PagePromise<WebhookEventsDefaultPageNumberPagination, WebhookEvent>;
  list(
    options?: Core.RequestOptions,
  ): Core.PagePromise<WebhookEventsDefaultPageNumberPagination, WebhookEvent>;
  list(
    query: WebhookEventListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.PagePromise<WebhookEventsDefaultPageNumberPagination, WebhookEvent> {
    if (isRequestOptions(query)) {
      return this.list({}, query);
    }
    return this._client.getAPIList('/webhook_events', WebhookEventsDefaultPageNumberPagination, {
      query,
      ...options,
    });
  }
}

export class WebhookEventsDefaultPageNumberPagination extends DefaultPageNumberPagination<WebhookEvent> {}

export interface WebhookEvent {
  business_id: string;

  created_at: string;

  event_id: string;

  event_type: string;

  object_id: string;

  latest_attempted_at?: string | null;

  request?: string | null;

  response?: string | null;
}

export interface WebhookEventListParams extends DefaultPageNumberPaginationParams {
  /**
   * Get events after this created time
   */
  created_at_gte?: string | null;

  /**
   * Get events created before this time
   */
  created_at_lte?: string | null;

  /**
   * Min : 1, Max : 100, default 10
   */
  limit?: number | null;

  /**
   * Get events history of a specific object like payment/subscription/refund/dispute
   */
  object_id?: string | null;
}

WebhookEvents.WebhookEventsDefaultPageNumberPagination = WebhookEventsDefaultPageNumberPagination;

export declare namespace WebhookEvents {
  export {
    type WebhookEvent as WebhookEvent,
    WebhookEventsDefaultPageNumberPagination as WebhookEventsDefaultPageNumberPagination,
    type WebhookEventListParams as WebhookEventListParams,
  };
}
