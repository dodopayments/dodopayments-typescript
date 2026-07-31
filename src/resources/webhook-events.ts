// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as DisputesAPI from './disputes';
import * as LicenseKeysAPI from './license-keys';
import * as MiscAPI from './misc';
import * as PaymentsAPI from './payments';
import * as RefundsAPI from './refunds';
import * as SubscriptionsAPI from './subscriptions';
import * as BalancesAPI from './credit-entitlements/balances';
import * as GrantsAPI from './entitlements/grants';

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
  | 'subscription.paused'
  | 'subscription.cancelled'
  | 'subscription.failed'
  | 'subscription.expired'
  | 'subscription.plan_changed'
  | 'subscription.updated'
  | 'subscription.update_payment_method'
  | 'license_key.created'
  | 'payout.created'
  | 'payout.on_hold'
  | 'payout.in_progress'
  | 'payout.failed'
  | 'payout.success'
  | 'credit.added'
  | 'credit.deducted'
  | 'credit.expired'
  | 'credit.rolled_over'
  | 'credit.rollover_forfeited'
  | 'credit.overage_charged'
  | 'credit.overage_reset'
  | 'credit.manual_adjustment'
  | 'credit.balance_low'
  | 'abandoned_checkout.detected'
  | 'abandoned_checkout.recovered'
  | 'dunning.started'
  | 'dunning.recovered'
  | 'entitlement_grant.created'
  | 'entitlement_grant.delivered'
  | 'entitlement_grant.failed'
  | 'entitlement_grant.revoked';

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
    | WebhookPayload.LicenseKey
    | WebhookPayload.Payout
    | WebhookPayload.CreditLedgerEntry
    | WebhookPayload.CreditBalanceLow
    | WebhookPayload.AbandonedCheckout
    | WebhookPayload.DunningAttempt
    | WebhookPayload.EntitlementGrant;

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

  export interface Payout {
    /**
     * The total amount of the payout.
     */
    amount: number;

    /**
     * The unique identifier of the business associated with the payout.
     */
    business_id: string;

    /**
     * @deprecated Use the v3 payout breakup endpoints instead. Will be removed in a
     * future release.
     */
    chargebacks: number;

    /**
     * The timestamp when the payout was created, in UTC.
     */
    created_at: string;

    /**
     * The currency of the payout, represented as an ISO 4217 currency code.
     */
    currency: MiscAPI.Currency;

    /**
     * The fee charged for processing the payout.
     */
    fee: number;

    payload_type: 'Payout';

    /**
     * The payment method used for the payout (e.g., bank transfer, card, etc.).
     */
    payment_method: string;

    /**
     * The unique identifier of the payout.
     */
    payout_id: string;

    /**
     * @deprecated Use the v3 payout breakup endpoints instead. Will be removed in a
     * future release.
     */
    refunds: number;

    /**
     * The current status of the payout.
     */
    status: 'not_initiated' | 'in_progress' | 'on_hold' | 'failed' | 'success';

    /**
     * @deprecated Use the v3 payout breakup endpoints instead. Will be removed in a
     * future release.
     */
    tax: number;

    /**
     * The timestamp when the payout was last updated, in UTC.
     */
    updated_at: string;

    /**
     * The name of the payout recipient or purpose.
     */
    name?: string | null;

    /**
     * The URL of the document associated with the payout.
     */
    payout_document_url?: string | null;

    /**
     * Any additional remarks or notes associated with the payout.
     */
    remarks?: string | null;
  }

  /**
   * Response for a ledger entry
   */
  export interface CreditLedgerEntry extends BalancesAPI.CreditLedgerEntry {
    payload_type: 'CreditLedgerEntry';
  }

  export interface CreditBalanceLow {
    available_balance: string;

    /**
     * Brand id this credit entitlement belongs to
     */
    brand_id: string;

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

    /**
     * Brand id this abandoned checkout belongs to
     */
    brand_id: string;

    customer_id: string;

    payload_type: 'AbandonedCheckout';

    payment_id: string;

    status: 'abandoned' | 'recovering' | 'recovered' | 'exhausted' | 'opted_out';

    recovered_payment_id?: string | null;
  }

  export interface DunningAttempt {
    /**
     * Brand id this dunning attempt belongs to
     */
    brand_id: string;

    created_at: string;

    customer_id: string;

    payload_type: 'DunningAttempt';

    status: 'recovering' | 'recovered' | 'exhausted';

    subscription_id: string;

    trigger_state: 'on_hold' | 'cancelled';

    payment_id?: string | null;
  }

  /**
   * Detailed view of a single entitlement grant: who it's for, its lifecycle state,
   * and any integration-specific delivery payload.
   */
  export interface EntitlementGrant extends GrantsAPI.EntitlementGrant {
    payload_type: 'EntitlementGrant';
  }
}

export declare namespace WebhookEvents {
  export { type WebhookEventType as WebhookEventType, type WebhookPayload as WebhookPayload };
}
