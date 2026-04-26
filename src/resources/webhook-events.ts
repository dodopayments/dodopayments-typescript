// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as DisputesAPI from './disputes';
import * as LicenseKeysAPI from './license-keys';
import * as PaymentsAPI from './payments';
import * as RefundsAPI from './refunds';
import * as SubscriptionsAPI from './subscriptions';
import * as BalancesAPI from './credit-entitlements/balances';

export class WebhookEvents extends APIResource {

}

/**
 * Event types for Dodo events
 */
export type WebhookEventType = 'payment.succeeded' | 'payment.failed' | 'payment.processing' | 'payment.cancelled' | 'refund.succeeded' | 'refund.failed' | 'dispute.opened' | 'dispute.expired' | 'dispute.accepted' | 'dispute.cancelled' | 'dispute.challenged' | 'dispute.won' | 'dispute.lost' | 'subscription.active' | 'subscription.renewed' | 'subscription.on_hold' | 'subscription.cancelled' | 'subscription.failed' | 'subscription.expired' | 'subscription.plan_changed' | 'subscription.updated' | 'license_key.created' | 'payout.not_initiated' | 'payout.on_hold' | 'payout.in_progress' | 'payout.failed' | 'payout.success' | 'credit.added' | 'credit.deducted' | 'credit.expired' | 'credit.rolled_over' | 'credit.rollover_forfeited' | 'credit.overage_charged' | 'credit.manual_adjustment' | 'credit.balance_low' | 'abandoned_checkout.detected' | 'abandoned_checkout.recovered' | 'dunning.started' | 'dunning.recovered' | 'acr.email' | 'dunning.email' | 'entitlement_grant.created' | 'entitlement_grant.delivered' | 'entitlement_grant.failed' | 'entitlement_grant.revoked'

export interface WebhookPayload {
  business_id: string;

  /**
   * The latest data at the time of delivery attempt
   */
  data: WebhookPayload.Payment | WebhookPayload.Subscription | WebhookPayload.Refund | WebhookPayload.Dispute | WebhookPayload.LicenseKey | WebhookPayload.CreditLedgerEntry | WebhookPayload.CreditBalanceLow | WebhookPayload.AbandonedCheckout | WebhookPayload.DunningAttempt | WebhookPayload.EntitlementGrant;

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

  /**
   * Response for a ledger entry
   */
  export interface CreditLedgerEntry extends BalancesAPI.CreditLedgerEntry {
    payload_type: 'CreditLedgerEntry';
  }

  export interface CreditBalanceLow {
    available_balance: string;

    credit_entitlement_id: string;

    credit_entitlement_name: string;

    customer_id: string;

    payload_type: 'CreditBalanceLow';

    subscription_credits_amount: string;

    subscription_id: string;

    threshold_amount: string;

    threshold_percent: number;
  }

  export interface AbandonedCheckout {
    abandoned_at: string;

    abandonment_reason: 'payment_failed' | 'checkout_incomplete';

    customer_id: string;

    payload_type: 'AbandonedCheckout';

    payment_id: string;

    status: 'abandoned' | 'recovering' | 'recovered' | 'exhausted' | 'opted_out';

    recovered_payment_id?: string | null;
  }

  export interface DunningAttempt {
    created_at: string;

    customer_id: string;

    payload_type: 'DunningAttempt';

    status: 'recovering' | 'recovered' | 'exhausted';

    subscription_id: string;

    trigger_state: 'on_hold' | 'cancelled';

    payment_id?: string | null;
  }

  export interface EntitlementGrant {
    id: string;

    business_id: string;

    created_at: string;

    customer_id: string;

    entitlement_id: string;

    external_id: string;

    payload_type: 'EntitlementGrant';

    status: 'Pending' | 'Delivered' | 'Failed' | 'Revoked';

    updated_at: string;

    delivered_at?: string | null;

    error_code?: string | null;

    error_message?: string | null;

    license_key?: string | null;

    license_key_activations_limit?: number | null;

    license_key_activations_used?: number | null;

    license_key_expires_at?: string | null;

    license_key_status?: string | null;

    metadata?: unknown;

    oauth_expires_at?: string | null;

    oauth_url?: string | null;

    payment_id?: string | null;

    revocation_reason?: string | null;

    revoked_at?: string | null;

    subscription_id?: string | null;
  }
}

export declare namespace WebhookEvents {
  export {
    type WebhookEventType as WebhookEventType,
    type WebhookPayload as WebhookPayload
  };
}
