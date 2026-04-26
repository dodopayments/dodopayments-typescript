// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as DisputesAPI from '../disputes';
import * as LicenseKeysAPI from '../license-keys';
import * as PaymentsAPI from '../payments';
import * as RefundsAPI from '../refunds';
import * as SubscriptionsAPI from '../subscriptions';
import * as WebhookEventsAPI from '../webhook-events';
import * as BalancesAPI from '../credit-entitlements/balances';
import * as HeadersAPI from './headers';
import { HeaderRetrieveResponse, HeaderUpdateParams, Headers } from './headers';
import { Webhook } from 'standardwebhooks';
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
  list(query: WebhookListParams | null | undefined = {}, options?: RequestOptions): PagePromise<WebhookDetailsCursorPagePagination, WebhookDetails> {
    return this._client.getAPIList('/webhooks', CursorPagePagination<WebhookDetails>, { query, ...options });
  }

  /**
   * Delete a webhook by id
   */
  delete(webhookID: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/webhooks/${webhookID}`, { ...options, headers: buildHeaders([{Accept: '*/*'}, options?.headers]) });
  }

  /**
   * Get webhook secret by id
   */
  retrieveSecret(webhookID: string, options?: RequestOptions): APIPromise<WebhookRetrieveSecretResponse> {
    return this._client.get(path`/webhooks/${webhookID}/secret`, options);
  }

  unsafeUnwrap(body: string): UnsafeUnwrapWebhookEvent {
    return JSON.parse(body) as UnsafeUnwrapWebhookEvent;
  }

  unwrap(body: string, { headers, key }: { headers: Record<string, string>; key?: string }): UnwrapWebhookEvent {
    if (headers !== undefined) {
      const keyStr: string | null = key === undefined ? this._client.webhookKey : key;
      if (keyStr === null) throw new Error('Webhook key must not be null in order to unwrap');
      const wh = new Webhook(keyStr);
      wh.verify(body, headers);
    }
    return JSON.parse(body) as UnwrapWebhookEvent;
  }
}

export type WebhookDetailsCursorPagePagination = CursorPagePagination<WebhookDetails>

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

export interface AbandonedCheckoutDetectedWebhookEvent {
  /**
   * The business identifier
   */
  business_id: string;

  /**
   * Webhook payload for abandoned_checkout.detected and abandoned_checkout.recovered
   * events
   */
  data: AbandonedCheckoutDetectedWebhookEvent.Data;

  /**
   * The timestamp of when the event occurred
   */
  timestamp: string;

  /**
   * The event type
   */
  type: 'abandoned_checkout.detected';
}

export namespace AbandonedCheckoutDetectedWebhookEvent {
  /**
   * Webhook payload for abandoned_checkout.detected and abandoned_checkout.recovered
   * events
   */
  export interface Data {
    abandoned_at: string;

    abandonment_reason: 'payment_failed' | 'checkout_incomplete';

    customer_id: string;

    payment_id: string;

    status: 'abandoned' | 'recovering' | 'recovered' | 'exhausted' | 'opted_out';

    recovered_payment_id?: string | null;
  }
}

export interface AbandonedCheckoutRecoveredWebhookEvent {
  /**
   * The business identifier
   */
  business_id: string;

  /**
   * Webhook payload for abandoned_checkout.detected and abandoned_checkout.recovered
   * events
   */
  data: AbandonedCheckoutRecoveredWebhookEvent.Data;

  /**
   * The timestamp of when the event occurred
   */
  timestamp: string;

  /**
   * The event type
   */
  type: 'abandoned_checkout.recovered';
}

export namespace AbandonedCheckoutRecoveredWebhookEvent {
  /**
   * Webhook payload for abandoned_checkout.detected and abandoned_checkout.recovered
   * events
   */
  export interface Data {
    abandoned_at: string;

    abandonment_reason: 'payment_failed' | 'checkout_incomplete';

    customer_id: string;

    payment_id: string;

    status: 'abandoned' | 'recovering' | 'recovered' | 'exhausted' | 'opted_out';

    recovered_payment_id?: string | null;
  }
}

export interface CreditAddedWebhookEvent {
  /**
   * The business identifier
   */
  business_id: string;

  /**
   * Response for a ledger entry
   */
  data: BalancesAPI.CreditLedgerEntry;

  /**
   * The timestamp of when the event occurred
   */
  timestamp: string;

  /**
   * The event type
   */
  type: 'credit.added';
}

export interface CreditBalanceLowWebhookEvent {
  /**
   * The business identifier
   */
  business_id: string;

  /**
   * Webhook payload for credit.balance_low event
   */
  data: CreditBalanceLowWebhookEvent.Data;

  /**
   * The timestamp of when the event occurred
   */
  timestamp: string;

  /**
   * The event type
   */
  type: 'credit.balance_low';
}

export namespace CreditBalanceLowWebhookEvent {
  /**
   * Webhook payload for credit.balance_low event
   */
  export interface Data {
    available_balance: string;

    credit_entitlement_id: string;

    credit_entitlement_name: string;

    customer_id: string;

    subscription_credits_amount: string;

    subscription_id: string;

    threshold_amount: string;

    threshold_percent: number;
  }
}

export interface CreditDeductedWebhookEvent {
  /**
   * The business identifier
   */
  business_id: string;

  /**
   * Response for a ledger entry
   */
  data: BalancesAPI.CreditLedgerEntry;

  /**
   * The timestamp of when the event occurred
   */
  timestamp: string;

  /**
   * The event type
   */
  type: 'credit.deducted';
}

export interface CreditExpiredWebhookEvent {
  /**
   * The business identifier
   */
  business_id: string;

  /**
   * Response for a ledger entry
   */
  data: BalancesAPI.CreditLedgerEntry;

  /**
   * The timestamp of when the event occurred
   */
  timestamp: string;

  /**
   * The event type
   */
  type: 'credit.expired';
}

export interface CreditManualAdjustmentWebhookEvent {
  /**
   * The business identifier
   */
  business_id: string;

  /**
   * Response for a ledger entry
   */
  data: BalancesAPI.CreditLedgerEntry;

  /**
   * The timestamp of when the event occurred
   */
  timestamp: string;

  /**
   * The event type
   */
  type: 'credit.manual_adjustment';
}

export interface CreditOverageChargedWebhookEvent {
  /**
   * The business identifier
   */
  business_id: string;

  /**
   * Response for a ledger entry
   */
  data: BalancesAPI.CreditLedgerEntry;

  /**
   * The timestamp of when the event occurred
   */
  timestamp: string;

  /**
   * The event type
   */
  type: 'credit.overage_charged';
}

export interface CreditRolledOverWebhookEvent {
  /**
   * The business identifier
   */
  business_id: string;

  /**
   * Response for a ledger entry
   */
  data: BalancesAPI.CreditLedgerEntry;

  /**
   * The timestamp of when the event occurred
   */
  timestamp: string;

  /**
   * The event type
   */
  type: 'credit.rolled_over';
}

export interface CreditRolloverForfeitedWebhookEvent {
  /**
   * The business identifier
   */
  business_id: string;

  /**
   * Response for a ledger entry
   */
  data: BalancesAPI.CreditLedgerEntry;

  /**
   * The timestamp of when the event occurred
   */
  timestamp: string;

  /**
   * The event type
   */
  type: 'credit.rollover_forfeited';
}

export interface DisputeAcceptedWebhookEvent {
  /**
   * The business identifier
   */
  business_id: string;

  data: DisputesAPI.Dispute;

  /**
   * The timestamp of when the event occurred
   */
  timestamp: string;

  /**
   * The event type
   */
  type: 'dispute.accepted';
}

export interface DisputeCancelledWebhookEvent {
  /**
   * The business identifier
   */
  business_id: string;

  data: DisputesAPI.Dispute;

  /**
   * The timestamp of when the event occurred
   */
  timestamp: string;

  /**
   * The event type
   */
  type: 'dispute.cancelled';
}

export interface DisputeChallengedWebhookEvent {
  /**
   * The business identifier
   */
  business_id: string;

  data: DisputesAPI.Dispute;

  /**
   * The timestamp of when the event occurred
   */
  timestamp: string;

  /**
   * The event type
   */
  type: 'dispute.challenged';
}

export interface DisputeExpiredWebhookEvent {
  /**
   * The business identifier
   */
  business_id: string;

  data: DisputesAPI.Dispute;

  /**
   * The timestamp of when the event occurred
   */
  timestamp: string;

  /**
   * The event type
   */
  type: 'dispute.expired';
}

export interface DisputeLostWebhookEvent {
  /**
   * The business identifier
   */
  business_id: string;

  data: DisputesAPI.Dispute;

  /**
   * The timestamp of when the event occurred
   */
  timestamp: string;

  /**
   * The event type
   */
  type: 'dispute.lost';
}

export interface DisputeOpenedWebhookEvent {
  /**
   * The business identifier
   */
  business_id: string;

  data: DisputesAPI.Dispute;

  /**
   * The timestamp of when the event occurred
   */
  timestamp: string;

  /**
   * The event type
   */
  type: 'dispute.opened';
}

export interface DisputeWonWebhookEvent {
  /**
   * The business identifier
   */
  business_id: string;

  data: DisputesAPI.Dispute;

  /**
   * The timestamp of when the event occurred
   */
  timestamp: string;

  /**
   * The event type
   */
  type: 'dispute.won';
}

export interface DunningRecoveredWebhookEvent {
  /**
   * The business identifier
   */
  business_id: string;

  /**
   * Webhook payload for dunning.started and dunning.recovered events
   */
  data: DunningRecoveredWebhookEvent.Data;

  /**
   * The timestamp of when the event occurred
   */
  timestamp: string;

  /**
   * The event type
   */
  type: 'dunning.recovered';
}

export namespace DunningRecoveredWebhookEvent {
  /**
   * Webhook payload for dunning.started and dunning.recovered events
   */
  export interface Data {
    created_at: string;

    customer_id: string;

    status: 'recovering' | 'recovered' | 'exhausted';

    subscription_id: string;

    trigger_state: 'on_hold' | 'cancelled';

    payment_id?: string | null;
  }
}

export interface DunningStartedWebhookEvent {
  /**
   * The business identifier
   */
  business_id: string;

  /**
   * Webhook payload for dunning.started and dunning.recovered events
   */
  data: DunningStartedWebhookEvent.Data;

  /**
   * The timestamp of when the event occurred
   */
  timestamp: string;

  /**
   * The event type
   */
  type: 'dunning.started';
}

export namespace DunningStartedWebhookEvent {
  /**
   * Webhook payload for dunning.started and dunning.recovered events
   */
  export interface Data {
    created_at: string;

    customer_id: string;

    status: 'recovering' | 'recovered' | 'exhausted';

    subscription_id: string;

    trigger_state: 'on_hold' | 'cancelled';

    payment_id?: string | null;
  }
}

export interface LicenseKeyCreatedWebhookEvent {
  /**
   * The business identifier
   */
  business_id: string;

  data: LicenseKeysAPI.LicenseKey;

  /**
   * The timestamp of when the event occurred
   */
  timestamp: string;

  /**
   * The event type
   */
  type: 'license_key.created';
}

export interface PaymentCancelledWebhookEvent {
  /**
   * The business identifier
   */
  business_id: string;

  data: PaymentsAPI.Payment;

  /**
   * The timestamp of when the event occurred
   */
  timestamp: string;

  /**
   * The event type
   */
  type: 'payment.cancelled';
}

export interface PaymentFailedWebhookEvent {
  /**
   * The business identifier
   */
  business_id: string;

  data: PaymentsAPI.Payment;

  /**
   * The timestamp of when the event occurred
   */
  timestamp: string;

  /**
   * The event type
   */
  type: 'payment.failed';
}

export interface PaymentProcessingWebhookEvent {
  /**
   * The business identifier
   */
  business_id: string;

  data: PaymentsAPI.Payment;

  /**
   * The timestamp of when the event occurred
   */
  timestamp: string;

  /**
   * The event type
   */
  type: 'payment.processing';
}

export interface PaymentSucceededWebhookEvent {
  /**
   * The business identifier
   */
  business_id: string;

  data: PaymentsAPI.Payment;

  /**
   * The timestamp of when the event occurred
   */
  timestamp: string;

  /**
   * The event type
   */
  type: 'payment.succeeded';
}

export interface RefundFailedWebhookEvent {
  /**
   * The business identifier
   */
  business_id: string;

  data: RefundsAPI.Refund;

  /**
   * The timestamp of when the event occurred
   */
  timestamp: string;

  /**
   * The event type
   */
  type: 'refund.failed';
}

export interface RefundSucceededWebhookEvent {
  /**
   * The business identifier
   */
  business_id: string;

  data: RefundsAPI.Refund;

  /**
   * The timestamp of when the event occurred
   */
  timestamp: string;

  /**
   * The event type
   */
  type: 'refund.succeeded';
}

export interface SubscriptionActiveWebhookEvent {
  /**
   * The business identifier
   */
  business_id: string;

  /**
   * Response struct representing subscription details
   */
  data: SubscriptionsAPI.Subscription;

  /**
   * The timestamp of when the event occurred
   */
  timestamp: string;

  /**
   * The event type
   */
  type: 'subscription.active';
}

export interface SubscriptionCancelledWebhookEvent {
  /**
   * The business identifier
   */
  business_id: string;

  /**
   * Response struct representing subscription details
   */
  data: SubscriptionsAPI.Subscription;

  /**
   * The timestamp of when the event occurred
   */
  timestamp: string;

  /**
   * The event type
   */
  type: 'subscription.cancelled';
}

export interface SubscriptionExpiredWebhookEvent {
  /**
   * The business identifier
   */
  business_id: string;

  /**
   * Response struct representing subscription details
   */
  data: SubscriptionsAPI.Subscription;

  /**
   * The timestamp of when the event occurred
   */
  timestamp: string;

  /**
   * The event type
   */
  type: 'subscription.expired';
}

export interface SubscriptionFailedWebhookEvent {
  /**
   * The business identifier
   */
  business_id: string;

  /**
   * Response struct representing subscription details
   */
  data: SubscriptionsAPI.Subscription;

  /**
   * The timestamp of when the event occurred
   */
  timestamp: string;

  /**
   * The event type
   */
  type: 'subscription.failed';
}

export interface SubscriptionOnHoldWebhookEvent {
  /**
   * The business identifier
   */
  business_id: string;

  /**
   * Response struct representing subscription details
   */
  data: SubscriptionsAPI.Subscription;

  /**
   * The timestamp of when the event occurred
   */
  timestamp: string;

  /**
   * The event type
   */
  type: 'subscription.on_hold';
}

export interface SubscriptionPlanChangedWebhookEvent {
  /**
   * The business identifier
   */
  business_id: string;

  /**
   * Response struct representing subscription details
   */
  data: SubscriptionsAPI.Subscription;

  /**
   * The timestamp of when the event occurred
   */
  timestamp: string;

  /**
   * The event type
   */
  type: 'subscription.plan_changed';
}

export interface SubscriptionRenewedWebhookEvent {
  /**
   * The business identifier
   */
  business_id: string;

  /**
   * Response struct representing subscription details
   */
  data: SubscriptionsAPI.Subscription;

  /**
   * The timestamp of when the event occurred
   */
  timestamp: string;

  /**
   * The event type
   */
  type: 'subscription.renewed';
}

export interface SubscriptionUpdatedWebhookEvent {
  /**
   * The business identifier
   */
  business_id: string;

  /**
   * Response struct representing subscription details
   */
  data: SubscriptionsAPI.Subscription;

  /**
   * The timestamp of when the event occurred
   */
  timestamp: string;

  /**
   * The event type
   */
  type: 'subscription.updated';
}

export interface AbandonedCheckoutDetectedWebhookEvent {
  /**
   * The business identifier
   */
  business_id: string;

  /**
   * Webhook payload for abandoned_checkout.detected and abandoned_checkout.recovered
   * events
   */
  data: AbandonedCheckoutDetectedWebhookEvent.Data;

  /**
   * The timestamp of when the event occurred
   */
  timestamp: string;

  /**
   * The event type
   */
  type: 'abandoned_checkout.detected';
}

export namespace AbandonedCheckoutDetectedWebhookEvent {
  /**
   * Webhook payload for abandoned_checkout.detected and abandoned_checkout.recovered
   * events
   */
  export interface Data {
    abandoned_at: string;

    abandonment_reason: 'payment_failed' | 'checkout_incomplete';

    customer_id: string;

    payment_id: string;

    status: 'abandoned' | 'recovering' | 'recovered' | 'exhausted' | 'opted_out';

    recovered_payment_id?: string | null;
  }
}

export interface AbandonedCheckoutRecoveredWebhookEvent {
  /**
   * The business identifier
   */
  business_id: string;

  /**
   * Webhook payload for abandoned_checkout.detected and abandoned_checkout.recovered
   * events
   */
  data: AbandonedCheckoutRecoveredWebhookEvent.Data;

  /**
   * The timestamp of when the event occurred
   */
  timestamp: string;

  /**
   * The event type
   */
  type: 'abandoned_checkout.recovered';
}

export namespace AbandonedCheckoutRecoveredWebhookEvent {
  /**
   * Webhook payload for abandoned_checkout.detected and abandoned_checkout.recovered
   * events
   */
  export interface Data {
    abandoned_at: string;

    abandonment_reason: 'payment_failed' | 'checkout_incomplete';

    customer_id: string;

    payment_id: string;

    status: 'abandoned' | 'recovering' | 'recovered' | 'exhausted' | 'opted_out';

    recovered_payment_id?: string | null;
  }
}

export interface CreditAddedWebhookEvent {
  /**
   * The business identifier
   */
  business_id: string;

  /**
   * Response for a ledger entry
   */
  data: BalancesAPI.CreditLedgerEntry;

  /**
   * The timestamp of when the event occurred
   */
  timestamp: string;

  /**
   * The event type
   */
  type: 'credit.added';
}

export interface CreditBalanceLowWebhookEvent {
  /**
   * The business identifier
   */
  business_id: string;

  /**
   * Webhook payload for credit.balance_low event
   */
  data: CreditBalanceLowWebhookEvent.Data;

  /**
   * The timestamp of when the event occurred
   */
  timestamp: string;

  /**
   * The event type
   */
  type: 'credit.balance_low';
}

export namespace CreditBalanceLowWebhookEvent {
  /**
   * Webhook payload for credit.balance_low event
   */
  export interface Data {
    available_balance: string;

    credit_entitlement_id: string;

    credit_entitlement_name: string;

    customer_id: string;

    subscription_credits_amount: string;

    subscription_id: string;

    threshold_amount: string;

    threshold_percent: number;
  }
}

export interface CreditDeductedWebhookEvent {
  /**
   * The business identifier
   */
  business_id: string;

  /**
   * Response for a ledger entry
   */
  data: BalancesAPI.CreditLedgerEntry;

  /**
   * The timestamp of when the event occurred
   */
  timestamp: string;

  /**
   * The event type
   */
  type: 'credit.deducted';
}

export interface CreditExpiredWebhookEvent {
  /**
   * The business identifier
   */
  business_id: string;

  /**
   * Response for a ledger entry
   */
  data: BalancesAPI.CreditLedgerEntry;

  /**
   * The timestamp of when the event occurred
   */
  timestamp: string;

  /**
   * The event type
   */
  type: 'credit.expired';
}

export interface CreditManualAdjustmentWebhookEvent {
  /**
   * The business identifier
   */
  business_id: string;

  /**
   * Response for a ledger entry
   */
  data: BalancesAPI.CreditLedgerEntry;

  /**
   * The timestamp of when the event occurred
   */
  timestamp: string;

  /**
   * The event type
   */
  type: 'credit.manual_adjustment';
}

export interface CreditOverageChargedWebhookEvent {
  /**
   * The business identifier
   */
  business_id: string;

  /**
   * Response for a ledger entry
   */
  data: BalancesAPI.CreditLedgerEntry;

  /**
   * The timestamp of when the event occurred
   */
  timestamp: string;

  /**
   * The event type
   */
  type: 'credit.overage_charged';
}

export interface CreditRolledOverWebhookEvent {
  /**
   * The business identifier
   */
  business_id: string;

  /**
   * Response for a ledger entry
   */
  data: BalancesAPI.CreditLedgerEntry;

  /**
   * The timestamp of when the event occurred
   */
  timestamp: string;

  /**
   * The event type
   */
  type: 'credit.rolled_over';
}

export interface CreditRolloverForfeitedWebhookEvent {
  /**
   * The business identifier
   */
  business_id: string;

  /**
   * Response for a ledger entry
   */
  data: BalancesAPI.CreditLedgerEntry;

  /**
   * The timestamp of when the event occurred
   */
  timestamp: string;

  /**
   * The event type
   */
  type: 'credit.rollover_forfeited';
}

export interface DisputeAcceptedWebhookEvent {
  /**
   * The business identifier
   */
  business_id: string;

  data: DisputesAPI.Dispute;

  /**
   * The timestamp of when the event occurred
   */
  timestamp: string;

  /**
   * The event type
   */
  type: 'dispute.accepted';
}

export interface DisputeCancelledWebhookEvent {
  /**
   * The business identifier
   */
  business_id: string;

  data: DisputesAPI.Dispute;

  /**
   * The timestamp of when the event occurred
   */
  timestamp: string;

  /**
   * The event type
   */
  type: 'dispute.cancelled';
}

export interface DisputeChallengedWebhookEvent {
  /**
   * The business identifier
   */
  business_id: string;

  data: DisputesAPI.Dispute;

  /**
   * The timestamp of when the event occurred
   */
  timestamp: string;

  /**
   * The event type
   */
  type: 'dispute.challenged';
}

export interface DisputeExpiredWebhookEvent {
  /**
   * The business identifier
   */
  business_id: string;

  data: DisputesAPI.Dispute;

  /**
   * The timestamp of when the event occurred
   */
  timestamp: string;

  /**
   * The event type
   */
  type: 'dispute.expired';
}

export interface DisputeLostWebhookEvent {
  /**
   * The business identifier
   */
  business_id: string;

  data: DisputesAPI.Dispute;

  /**
   * The timestamp of when the event occurred
   */
  timestamp: string;

  /**
   * The event type
   */
  type: 'dispute.lost';
}

export interface DisputeOpenedWebhookEvent {
  /**
   * The business identifier
   */
  business_id: string;

  data: DisputesAPI.Dispute;

  /**
   * The timestamp of when the event occurred
   */
  timestamp: string;

  /**
   * The event type
   */
  type: 'dispute.opened';
}

export interface DisputeWonWebhookEvent {
  /**
   * The business identifier
   */
  business_id: string;

  data: DisputesAPI.Dispute;

  /**
   * The timestamp of when the event occurred
   */
  timestamp: string;

  /**
   * The event type
   */
  type: 'dispute.won';
}

export interface DunningRecoveredWebhookEvent {
  /**
   * The business identifier
   */
  business_id: string;

  /**
   * Webhook payload for dunning.started and dunning.recovered events
   */
  data: DunningRecoveredWebhookEvent.Data;

  /**
   * The timestamp of when the event occurred
   */
  timestamp: string;

  /**
   * The event type
   */
  type: 'dunning.recovered';
}

export namespace DunningRecoveredWebhookEvent {
  /**
   * Webhook payload for dunning.started and dunning.recovered events
   */
  export interface Data {
    created_at: string;

    customer_id: string;

    status: 'recovering' | 'recovered' | 'exhausted';

    subscription_id: string;

    trigger_state: 'on_hold' | 'cancelled';

    payment_id?: string | null;
  }
}

export interface DunningStartedWebhookEvent {
  /**
   * The business identifier
   */
  business_id: string;

  /**
   * Webhook payload for dunning.started and dunning.recovered events
   */
  data: DunningStartedWebhookEvent.Data;

  /**
   * The timestamp of when the event occurred
   */
  timestamp: string;

  /**
   * The event type
   */
  type: 'dunning.started';
}

export namespace DunningStartedWebhookEvent {
  /**
   * Webhook payload for dunning.started and dunning.recovered events
   */
  export interface Data {
    created_at: string;

    customer_id: string;

    status: 'recovering' | 'recovered' | 'exhausted';

    subscription_id: string;

    trigger_state: 'on_hold' | 'cancelled';

    payment_id?: string | null;
  }
}

export interface LicenseKeyCreatedWebhookEvent {
  /**
   * The business identifier
   */
  business_id: string;

  data: LicenseKeysAPI.LicenseKey;

  /**
   * The timestamp of when the event occurred
   */
  timestamp: string;

  /**
   * The event type
   */
  type: 'license_key.created';
}

export interface PaymentCancelledWebhookEvent {
  /**
   * The business identifier
   */
  business_id: string;

  data: PaymentsAPI.Payment;

  /**
   * The timestamp of when the event occurred
   */
  timestamp: string;

  /**
   * The event type
   */
  type: 'payment.cancelled';
}

export interface PaymentFailedWebhookEvent {
  /**
   * The business identifier
   */
  business_id: string;

  data: PaymentsAPI.Payment;

  /**
   * The timestamp of when the event occurred
   */
  timestamp: string;

  /**
   * The event type
   */
  type: 'payment.failed';
}

export interface PaymentProcessingWebhookEvent {
  /**
   * The business identifier
   */
  business_id: string;

  data: PaymentsAPI.Payment;

  /**
   * The timestamp of when the event occurred
   */
  timestamp: string;

  /**
   * The event type
   */
  type: 'payment.processing';
}

export interface PaymentSucceededWebhookEvent {
  /**
   * The business identifier
   */
  business_id: string;

  data: PaymentsAPI.Payment;

  /**
   * The timestamp of when the event occurred
   */
  timestamp: string;

  /**
   * The event type
   */
  type: 'payment.succeeded';
}

export interface RefundFailedWebhookEvent {
  /**
   * The business identifier
   */
  business_id: string;

  data: RefundsAPI.Refund;

  /**
   * The timestamp of when the event occurred
   */
  timestamp: string;

  /**
   * The event type
   */
  type: 'refund.failed';
}

export interface RefundSucceededWebhookEvent {
  /**
   * The business identifier
   */
  business_id: string;

  data: RefundsAPI.Refund;

  /**
   * The timestamp of when the event occurred
   */
  timestamp: string;

  /**
   * The event type
   */
  type: 'refund.succeeded';
}

export interface SubscriptionActiveWebhookEvent {
  /**
   * The business identifier
   */
  business_id: string;

  /**
   * Response struct representing subscription details
   */
  data: SubscriptionsAPI.Subscription;

  /**
   * The timestamp of when the event occurred
   */
  timestamp: string;

  /**
   * The event type
   */
  type: 'subscription.active';
}

export interface SubscriptionCancelledWebhookEvent {
  /**
   * The business identifier
   */
  business_id: string;

  /**
   * Response struct representing subscription details
   */
  data: SubscriptionsAPI.Subscription;

  /**
   * The timestamp of when the event occurred
   */
  timestamp: string;

  /**
   * The event type
   */
  type: 'subscription.cancelled';
}

export interface SubscriptionExpiredWebhookEvent {
  /**
   * The business identifier
   */
  business_id: string;

  /**
   * Response struct representing subscription details
   */
  data: SubscriptionsAPI.Subscription;

  /**
   * The timestamp of when the event occurred
   */
  timestamp: string;

  /**
   * The event type
   */
  type: 'subscription.expired';
}

export interface SubscriptionFailedWebhookEvent {
  /**
   * The business identifier
   */
  business_id: string;

  /**
   * Response struct representing subscription details
   */
  data: SubscriptionsAPI.Subscription;

  /**
   * The timestamp of when the event occurred
   */
  timestamp: string;

  /**
   * The event type
   */
  type: 'subscription.failed';
}

export interface SubscriptionOnHoldWebhookEvent {
  /**
   * The business identifier
   */
  business_id: string;

  /**
   * Response struct representing subscription details
   */
  data: SubscriptionsAPI.Subscription;

  /**
   * The timestamp of when the event occurred
   */
  timestamp: string;

  /**
   * The event type
   */
  type: 'subscription.on_hold';
}

export interface SubscriptionPlanChangedWebhookEvent {
  /**
   * The business identifier
   */
  business_id: string;

  /**
   * Response struct representing subscription details
   */
  data: SubscriptionsAPI.Subscription;

  /**
   * The timestamp of when the event occurred
   */
  timestamp: string;

  /**
   * The event type
   */
  type: 'subscription.plan_changed';
}

export interface SubscriptionRenewedWebhookEvent {
  /**
   * The business identifier
   */
  business_id: string;

  /**
   * Response struct representing subscription details
   */
  data: SubscriptionsAPI.Subscription;

  /**
   * The timestamp of when the event occurred
   */
  timestamp: string;

  /**
   * The event type
   */
  type: 'subscription.renewed';
}

export interface SubscriptionUpdatedWebhookEvent {
  /**
   * The business identifier
   */
  business_id: string;

  /**
   * Response struct representing subscription details
   */
  data: SubscriptionsAPI.Subscription;

  /**
   * The timestamp of when the event occurred
   */
  timestamp: string;

  /**
   * The event type
   */
  type: 'subscription.updated';
}

export type UnsafeUnwrapWebhookEvent = AbandonedCheckoutDetectedWebhookEvent | AbandonedCheckoutRecoveredWebhookEvent | CreditAddedWebhookEvent | CreditBalanceLowWebhookEvent | CreditDeductedWebhookEvent | CreditExpiredWebhookEvent | CreditManualAdjustmentWebhookEvent | CreditOverageChargedWebhookEvent | CreditRolledOverWebhookEvent | CreditRolloverForfeitedWebhookEvent | DisputeAcceptedWebhookEvent | DisputeCancelledWebhookEvent | DisputeChallengedWebhookEvent | DisputeExpiredWebhookEvent | DisputeLostWebhookEvent | DisputeOpenedWebhookEvent | DisputeWonWebhookEvent | DunningRecoveredWebhookEvent | DunningStartedWebhookEvent | LicenseKeyCreatedWebhookEvent | PaymentCancelledWebhookEvent | PaymentFailedWebhookEvent | PaymentProcessingWebhookEvent | PaymentSucceededWebhookEvent | RefundFailedWebhookEvent | RefundSucceededWebhookEvent | SubscriptionActiveWebhookEvent | SubscriptionCancelledWebhookEvent | SubscriptionExpiredWebhookEvent | SubscriptionFailedWebhookEvent | SubscriptionOnHoldWebhookEvent | SubscriptionPlanChangedWebhookEvent | SubscriptionRenewedWebhookEvent | SubscriptionUpdatedWebhookEvent

export type UnwrapWebhookEvent = AbandonedCheckoutDetectedWebhookEvent | AbandonedCheckoutRecoveredWebhookEvent | CreditAddedWebhookEvent | CreditBalanceLowWebhookEvent | CreditDeductedWebhookEvent | CreditExpiredWebhookEvent | CreditManualAdjustmentWebhookEvent | CreditOverageChargedWebhookEvent | CreditRolledOverWebhookEvent | CreditRolloverForfeitedWebhookEvent | DisputeAcceptedWebhookEvent | DisputeCancelledWebhookEvent | DisputeChallengedWebhookEvent | DisputeExpiredWebhookEvent | DisputeLostWebhookEvent | DisputeOpenedWebhookEvent | DisputeWonWebhookEvent | DunningRecoveredWebhookEvent | DunningStartedWebhookEvent | LicenseKeyCreatedWebhookEvent | PaymentCancelledWebhookEvent | PaymentFailedWebhookEvent | PaymentProcessingWebhookEvent | PaymentSucceededWebhookEvent | RefundFailedWebhookEvent | RefundSucceededWebhookEvent | SubscriptionActiveWebhookEvent | SubscriptionCancelledWebhookEvent | SubscriptionExpiredWebhookEvent | SubscriptionFailedWebhookEvent | SubscriptionOnHoldWebhookEvent | SubscriptionPlanChangedWebhookEvent | SubscriptionRenewedWebhookEvent | SubscriptionUpdatedWebhookEvent

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

export interface WebhookListParams extends CursorPagePaginationParams {
}

Webhooks.Headers = Headers;

export declare namespace Webhooks {
  export {
    type WebhookDetails as WebhookDetails,
    type WebhookRetrieveSecretResponse as WebhookRetrieveSecretResponse,
    type AbandonedCheckoutDetectedWebhookEvent as AbandonedCheckoutDetectedWebhookEvent,
    type AbandonedCheckoutRecoveredWebhookEvent as AbandonedCheckoutRecoveredWebhookEvent,
    type CreditAddedWebhookEvent as CreditAddedWebhookEvent,
    type CreditBalanceLowWebhookEvent as CreditBalanceLowWebhookEvent,
    type CreditDeductedWebhookEvent as CreditDeductedWebhookEvent,
    type CreditExpiredWebhookEvent as CreditExpiredWebhookEvent,
    type CreditManualAdjustmentWebhookEvent as CreditManualAdjustmentWebhookEvent,
    type CreditOverageChargedWebhookEvent as CreditOverageChargedWebhookEvent,
    type CreditRolledOverWebhookEvent as CreditRolledOverWebhookEvent,
    type CreditRolloverForfeitedWebhookEvent as CreditRolloverForfeitedWebhookEvent,
    type DisputeAcceptedWebhookEvent as DisputeAcceptedWebhookEvent,
    type DisputeCancelledWebhookEvent as DisputeCancelledWebhookEvent,
    type DisputeChallengedWebhookEvent as DisputeChallengedWebhookEvent,
    type DisputeExpiredWebhookEvent as DisputeExpiredWebhookEvent,
    type DisputeLostWebhookEvent as DisputeLostWebhookEvent,
    type DisputeOpenedWebhookEvent as DisputeOpenedWebhookEvent,
    type DisputeWonWebhookEvent as DisputeWonWebhookEvent,
    type DunningRecoveredWebhookEvent as DunningRecoveredWebhookEvent,
    type DunningStartedWebhookEvent as DunningStartedWebhookEvent,
    type LicenseKeyCreatedWebhookEvent as LicenseKeyCreatedWebhookEvent,
    type PaymentCancelledWebhookEvent as PaymentCancelledWebhookEvent,
    type PaymentFailedWebhookEvent as PaymentFailedWebhookEvent,
    type PaymentProcessingWebhookEvent as PaymentProcessingWebhookEvent,
    type PaymentSucceededWebhookEvent as PaymentSucceededWebhookEvent,
    type RefundFailedWebhookEvent as RefundFailedWebhookEvent,
    type RefundSucceededWebhookEvent as RefundSucceededWebhookEvent,
    type SubscriptionActiveWebhookEvent as SubscriptionActiveWebhookEvent,
    type SubscriptionCancelledWebhookEvent as SubscriptionCancelledWebhookEvent,
    type SubscriptionExpiredWebhookEvent as SubscriptionExpiredWebhookEvent,
    type SubscriptionFailedWebhookEvent as SubscriptionFailedWebhookEvent,
    type SubscriptionOnHoldWebhookEvent as SubscriptionOnHoldWebhookEvent,
    type SubscriptionPlanChangedWebhookEvent as SubscriptionPlanChangedWebhookEvent,
    type SubscriptionRenewedWebhookEvent as SubscriptionRenewedWebhookEvent,
    type SubscriptionUpdatedWebhookEvent as SubscriptionUpdatedWebhookEvent,
    type UnsafeUnwrapWebhookEvent as UnsafeUnwrapWebhookEvent,
    type UnwrapWebhookEvent as UnwrapWebhookEvent,
    type WebhookDetailsCursorPagePagination as WebhookDetailsCursorPagePagination,
    type WebhookCreateParams as WebhookCreateParams,
    type WebhookUpdateParams as WebhookUpdateParams,
    type WebhookListParams as WebhookListParams
  };

  export {
    Headers as Headers,
    type HeaderRetrieveResponse as HeaderRetrieveResponse,
    type HeaderUpdateParams as HeaderUpdateParams
  };
}
