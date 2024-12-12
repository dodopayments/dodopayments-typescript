// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';
import * as DisputesAPI from './disputes';
import * as PaymentsAPI from './payments';
import * as RefundsAPI from './refunds';
import * as SubscriptionsAPI from './subscriptions';

export class OutgoingWebhooks extends APIResource {
  create(params: OutgoingWebhookCreateParams, options?: Core.RequestOptions): Core.APIPromise<void> {
    const {
      'webhook-id': webhookId,
      'webhook-signature': webhookSignature,
      'webhook-timestamp': webhookTimestamp,
      ...body
    } = params;
    return this._client.post('/your-webhook-url', {
      body,
      ...options,
      headers: {
        Accept: '*/*',
        'webhook-id': webhookId,
        'webhook-signature': webhookSignature,
        'webhook-timestamp': webhookTimestamp,
        ...options?.headers,
      },
    });
  }
}

export interface OutgoingWebhookCreateParams {
  /**
   * Body param:
   */
  business_id: string;

  /**
   * Body param:
   */
  data:
    | OutgoingWebhookCreateParams.Payment
    | OutgoingWebhookCreateParams.Subscription
    | OutgoingWebhookCreateParams.Refund
    | OutgoingWebhookCreateParams.Dispute;

  /**
   * Body param: The timestamp of when the event occurred (not necessarily the same
   * of when it was delivered)
   */
  timestamp: string;

  /**
   * Body param: Event types for Dodo events
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
    | 'subscription.on_hold'
    | 'subscription.paused'
    | 'subscription.cancelled'
    | 'subscription.failed'
    | 'subscription.expired';

  /**
   * Header param: Unique identifier for the webhook
   */
  'webhook-id': string;

  /**
   * Header param: Signature of the Webhook
   */
  'webhook-signature': string;

  /**
   * Header param: Unix timestamp when the webhook was sent
   */
  'webhook-timestamp': string;
}

export namespace OutgoingWebhookCreateParams {
  export interface Payment extends PaymentsAPI.Payment {
    payload_type: 'Payment';
  }

  export interface Subscription extends SubscriptionsAPI.Subscription {
    payload_type: 'Subscription';
  }

  export interface Refund extends RefundsAPI.Refund {
    payload_type: 'Refund';
  }

  export interface Dispute extends DisputesAPI.Dispute {
    payload_type: 'Dispute';
  }
}

export declare namespace OutgoingWebhooks {
  export { type OutgoingWebhookCreateParams as OutgoingWebhookCreateParams };
}
