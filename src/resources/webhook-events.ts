// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as DisputesAPI from './disputes';
import * as LicenseKeysAPI from './license-keys';
import * as PaymentsAPI from './payments';
import * as RefundsAPI from './refunds';
import * as SubscriptionsAPI from './subscriptions';

export class WebhookEvents extends APIResource {}

/**
 * Event types for Dodo events
 */
export type WebhookEventType =
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
  | 'subscription.cancelled'
  | 'subscription.failed'
  | 'subscription.expired'
  | 'subscription.plan_changed'
  | 'subscription.updated'
  | 'license_key.created'
  | 'payout.not_initiated'
  | 'payout.on_hold'
  | 'payout.in_progress'
  | 'payout.failed'
  | 'payout.success';

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
  type: WebhookEventType;
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

  export interface Dispute extends DisputesAPI.GetDispute {
    payload_type: 'Dispute';
  }

  export interface LicenseKey extends LicenseKeysAPI.LicenseKey {
    payload_type: 'LicenseKey';
  }
}

export declare namespace WebhookEvents {
  export { type WebhookEventType as WebhookEventType, type WebhookPayload as WebhookPayload };
}
