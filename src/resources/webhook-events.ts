// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import { isRequestOptions } from '../core';
import * as Core from '../core';
import * as DisputesAPI from './disputes';
import * as LicenseKeysAPI from './license-keys';
import * as PaymentsAPI from './payments';
import * as RefundsAPI from './refunds';
import * as SubscriptionsAPI from './subscriptions';
import { DefaultPageNumberPagination, type DefaultPageNumberPaginationParams } from '../pagination';

export class WebhookEvents extends APIResource {
  /**
   * @deprecated
   */
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

export interface WebhookPayload {
  business_id: string;

  /**
   * The latest data at the time of delivery attempt
   */
  data:
    | WebhookPayload.Payment
    | WebhookPayload.Subscription
    | WebhookPayload.Refund
    | WebhookPayload.Dispute
    | WebhookPayload.LicenseKey;

  /**
   * The timestamp of when the event occurred (not necessarily the same of when it
   * was delivered)
   */
  timestamp: string;

  /**
   * Event types for Dodo events
   */
  type:
    | 'payment.succeeded'
    | 'payment.failed'
    | 'payment.processing'
    | 'payment.cancelled'
    | 'refund.succeeded'
    | 'refund.failed'
    | 'dispute.opened'
    | 'dispute.expired'
    | 'dispute.accepted'
    | 'dispute.cancelled'
    | 'dispute.challenged'
    | 'dispute.won'
    | 'dispute.lost'
    | 'subscription.active'
    | 'subscription.renewed'
    | 'subscription.on_hold'
    | 'subscription.paused'
    | 'subscription.cancelled'
    | 'subscription.failed'
    | 'subscription.expired'
    | 'subscription.plan_changed'
    | 'license_key.created';
}

export namespace WebhookPayload {
  export interface Payment extends PaymentsAPI.Payment {
    payload_type: 'Payment';
  }

  /**
   * Response struct representing subscription details
   */
  export interface Subscription extends SubscriptionsAPI.Subscription {
    payload_type: 'Subscription';
  }

  export interface Refund extends RefundsAPI.Refund {
    payload_type: 'Refund';
  }

  export interface Dispute {
    /**
     * The amount involved in the dispute, represented as a string to accommodate
     * precision.
     */
    amount: string;

    /**
     * The unique identifier of the business involved in the dispute.
     */
    business_id: string;

    /**
     * The timestamp of when the dispute was created, in UTC.
     */
    created_at: string;

    /**
     * The currency of the disputed amount, represented as an ISO 4217 currency code.
     */
    currency: string;

    /**
     * The customer who filed the dispute
     */
    customer: PaymentsAPI.CustomerLimitedDetails;

    /**
     * The unique identifier of the dispute.
     */
    dispute_id: string;

    /**
     * The current stage of the dispute process.
     */
    dispute_stage: DisputesAPI.DisputeStage;

    /**
     * The current status of the dispute.
     */
    dispute_status: DisputesAPI.DisputeStatus;

    payload_type: 'Dispute';

    /**
     * The unique identifier of the payment associated with the dispute.
     */
    payment_id: string;

    /**
     * Reason for the dispute
     */
    reason?: string | null;

    /**
     * Remarks
     */
    remarks?: string | null;
  }

  export interface LicenseKey extends LicenseKeysAPI.LicenseKey {
    payload_type: 'LicenseKey';
  }
}

export interface WebhookEventListParams extends DefaultPageNumberPaginationParams {
  /**
   * Get events after this created time
   */
  created_at_gte?: string;

  /**
   * Get events created before this time
   */
  created_at_lte?: string;

  /**
   * Min : 1, Max : 100, default 10
   */
  limit?: number;

  /**
   * Get events history of a specific object like payment/subscription/refund/dispute
   */
  object_id?: string;

  /**
   * Filter by webhook event id
   */
  webhook_event_id?: string;

  /**
   * Filter by webhook destination
   */
  webhook_id?: string;
}

WebhookEvents.WebhookEventsDefaultPageNumberPagination = WebhookEventsDefaultPageNumberPagination;

export declare namespace WebhookEvents {
  export {
    type WebhookEvent as WebhookEvent,
    type WebhookPayload as WebhookPayload,
    WebhookEventsDefaultPageNumberPagination as WebhookEventsDefaultPageNumberPagination,
    type WebhookEventListParams as WebhookEventListParams,
  };
}
