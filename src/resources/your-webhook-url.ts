// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';
import * as DisputesAPI from './disputes';
import * as LicenseKeysAPI from './license-keys';
import * as PaymentsAPI from './payments';
import * as RefundsAPI from './refunds';
import * as SubscriptionsAPI from './subscriptions';
import * as WebhookEventsAPI from './webhook-events';

export class YourWebhookURL extends APIResource {
  create(params: YourWebhookURLCreateParams, options?: Core.RequestOptions): Core.APIPromise<void> {
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

export interface YourWebhookURLCreateParams {
  /**
   * Body param:
   */
  business_id: string;

  /**
   * Body param: The latest data at the time of delivery attempt
   */
  data:
    | YourWebhookURLCreateParams.Payment
    | YourWebhookURLCreateParams.Subscription
    | YourWebhookURLCreateParams.Refund
    | YourWebhookURLCreateParams.Dispute
    | YourWebhookURLCreateParams.LicenseKey;

  /**
   * Body param: The timestamp of when the event occurred (not necessarily the same
   * of when it was delivered)
   */
  timestamp: string;

  /**
   * Body param: Event types for Dodo events
   */
  type: WebhookEventsAPI.WebhookEventType;

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

export namespace YourWebhookURLCreateParams {
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

  export interface Dispute extends DisputesAPI.GetDispute {
    payload_type: 'Dispute';
  }

  export interface LicenseKey extends LicenseKeysAPI.LicenseKey {
    payload_type: 'LicenseKey';
  }
}

export declare namespace YourWebhookURL {
  export { type YourWebhookURLCreateParams as YourWebhookURLCreateParams };
}
