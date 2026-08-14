// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as DisputesAPI from '../disputes';
import * as LicenseKeysAPI from '../license-keys';
import * as MiscAPI from '../misc';
import * as PaymentsAPI from '../payments';
import * as RefundsAPI from '../refunds';
import * as SubscriptionsAPI from '../subscriptions';
import * as WebhookEventsAPI from '../webhook-events';
import * as BalancesAPI from '../credit-entitlements/balances';
import * as GrantsAPI from '../entitlements/grants';
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
   * List all webhooks
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const webhookDetails of client.webhooks.list()) {
   *   // ...
   * }
   * ```
   */
  list(
    query: WebhookListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<WebhookDetailsCursorPagePagination, WebhookDetails> {
    return this._client.getAPIList('/webhooks', CursorPagePagination<WebhookDetails>, { query, ...options });
  }

  /**
   * Create a new webhook
   *
   * @example
   * ```ts
   * const webhookDetails = await client.webhooks.create({
   *   url: 'url',
   * });
   * ```
   */
  create(body: WebhookCreateParams, options?: RequestOptions): APIPromise<WebhookDetails> {
    return this._client.post('/webhooks', { body, ...options });
  }

  /**
   * Get a webhook by id
   *
   * @example
   * ```ts
   * const webhookDetails = await client.webhooks.retrieve(
   *   'whk_YdWqVEGKmSYKbsIyDxEab',
   * );
   * ```
   */
  retrieve(webhookID: string, options?: RequestOptions): APIPromise<WebhookDetails> {
    return this._client.get(path`/webhooks/${webhookID}`, options);
  }

  /**
   * Delete a webhook by id
   *
   * @example
   * ```ts
   * await client.webhooks.delete('whk_YdWqVEGKmSYKbsIyDxEab');
   * ```
   */
  delete(webhookID: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/webhooks/${webhookID}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Patch a webhook by id
   *
   * @example
   * ```ts
   * const webhookDetails = await client.webhooks.update(
   *   'whk_YdWqVEGKmSYKbsIyDxEab',
   * );
   * ```
   */
  update(webhookID: string, body: WebhookUpdateParams, options?: RequestOptions): APIPromise<WebhookDetails> {
    return this._client.patch(path`/webhooks/${webhookID}`, { body, ...options });
  }

  /**
   * Get webhook secret by id
   *
   * @example
   * ```ts
   * const response = await client.webhooks.retrieveSecret(
   *   'whk_YdWqVEGKmSYKbsIyDxEab',
   * );
   * ```
   */
  retrieveSecret(webhookID: string, options?: RequestOptions): APIPromise<WebhookRetrieveSecretResponse> {
    return this._client.get(path`/webhooks/${webhookID}/secret`, options);
  }

  unwrap(
    body: string,
    { headers, key }: { headers: Record<string, string>; key?: string },
  ): UnwrapWebhookEvent {
    if (headers !== undefined) {
      const keyStr: string | null = key === undefined ? this._client.webhookKey : key;
      if (keyStr === null) throw new Error('Webhook key must not be null in order to unwrap');
      const wh = new Webhook(keyStr);
      wh.verify(body, headers);
    }
    return JSON.parse(body) as UnwrapWebhookEvent;
  }

  unsafeUnwrap(body: string): UnsafeUnwrapWebhookEvent {
    return JSON.parse(body) as UnsafeUnwrapWebhookEvent;
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

    /**
     * Brand id this abandoned checkout belongs to
     */
    brand_id: string;

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

    /**
     * Brand id this abandoned checkout belongs to
     */
    brand_id: string;

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

    /**
     * Brand id this credit entitlement belongs to
     */
    brand_id: string;

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

export interface CreditOverageResetWebhookEvent {
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
  type: 'credit.overage_reset';
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
    /**
     * Brand id this dunning attempt belongs to
     */
    brand_id: string;

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
    /**
     * Brand id this dunning attempt belongs to
     */
    brand_id: string;

    created_at: string;

    customer_id: string;

    status: 'recovering' | 'recovered' | 'exhausted';

    subscription_id: string;

    trigger_state: 'on_hold' | 'cancelled';

    payment_id?: string | null;
  }
}

export interface EntitlementGrantCreatedWebhookEvent {
  /**
   * The business identifier
   */
  business_id: string;

  /**
   * Detailed view of a single entitlement grant: who it's for, its lifecycle state,
   * and any integration-specific delivery payload.
   */
  data: GrantsAPI.EntitlementGrant;

  /**
   * The timestamp of when the event occurred
   */
  timestamp: string;

  /**
   * The event type
   */
  type: 'entitlement_grant.created';
}

export interface EntitlementGrantDeliveredWebhookEvent {
  /**
   * The business identifier
   */
  business_id: string;

  /**
   * Detailed view of a single entitlement grant: who it's for, its lifecycle state,
   * and any integration-specific delivery payload.
   */
  data: GrantsAPI.EntitlementGrant;

  /**
   * The timestamp of when the event occurred
   */
  timestamp: string;

  /**
   * The event type
   */
  type: 'entitlement_grant.delivered';
}

export interface EntitlementGrantFailedWebhookEvent {
  /**
   * The business identifier
   */
  business_id: string;

  /**
   * Detailed view of a single entitlement grant: who it's for, its lifecycle state,
   * and any integration-specific delivery payload.
   */
  data: GrantsAPI.EntitlementGrant;

  /**
   * The timestamp of when the event occurred
   */
  timestamp: string;

  /**
   * The event type
   */
  type: 'entitlement_grant.failed';
}

export interface EntitlementGrantRevokedWebhookEvent {
  /**
   * The business identifier
   */
  business_id: string;

  /**
   * Detailed view of a single entitlement grant: who it's for, its lifecycle state,
   * and any integration-specific delivery payload.
   */
  data: GrantsAPI.EntitlementGrant;

  /**
   * The timestamp of when the event occurred
   */
  timestamp: string;

  /**
   * The event type
   */
  type: 'entitlement_grant.revoked';
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

export interface PayoutCreatedWebhookEvent {
  /**
   * The business identifier
   */
  business_id: string;

  data: PayoutCreatedWebhookEvent.Data;

  /**
   * The timestamp of when the event occurred
   */
  timestamp: string;

  /**
   * The event type
   */
  type: 'payout.created';
}

export namespace PayoutCreatedWebhookEvent {
  export interface Data {
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
}

export interface PayoutFailedWebhookEvent {
  /**
   * The business identifier
   */
  business_id: string;

  data: PayoutFailedWebhookEvent.Data;

  /**
   * The timestamp of when the event occurred
   */
  timestamp: string;

  /**
   * The event type
   */
  type: 'payout.failed';
}

export namespace PayoutFailedWebhookEvent {
  export interface Data {
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
}

export interface PayoutInProgressWebhookEvent {
  /**
   * The business identifier
   */
  business_id: string;

  data: PayoutInProgressWebhookEvent.Data;

  /**
   * The timestamp of when the event occurred
   */
  timestamp: string;

  /**
   * The event type
   */
  type: 'payout.in_progress';
}

export namespace PayoutInProgressWebhookEvent {
  export interface Data {
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
}

export interface PayoutOnHoldWebhookEvent {
  /**
   * The business identifier
   */
  business_id: string;

  data: PayoutOnHoldWebhookEvent.Data;

  /**
   * The timestamp of when the event occurred
   */
  timestamp: string;

  /**
   * The event type
   */
  type: 'payout.on_hold';
}

export namespace PayoutOnHoldWebhookEvent {
  export interface Data {
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
}

export interface PayoutSuccessWebhookEvent {
  /**
   * The business identifier
   */
  business_id: string;

  data: PayoutSuccessWebhookEvent.Data;

  /**
   * The timestamp of when the event occurred
   */
  timestamp: string;

  /**
   * The event type
   */
  type: 'payout.success';
}

export namespace PayoutSuccessWebhookEvent {
  export interface Data {
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

export interface SubscriptionPausedWebhookEvent {
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
  type: 'subscription.paused';
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

export interface SubscriptionUnpausedWebhookEvent {
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
  type: 'subscription.unpaused';
}

export interface SubscriptionUpdatePaymentMethodWebhookEvent {
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
  type: 'subscription.update_payment_method';
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

    /**
     * Brand id this abandoned checkout belongs to
     */
    brand_id: string;

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

    /**
     * Brand id this abandoned checkout belongs to
     */
    brand_id: string;

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

    /**
     * Brand id this credit entitlement belongs to
     */
    brand_id: string;

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

export interface CreditOverageResetWebhookEvent {
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
  type: 'credit.overage_reset';
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
    /**
     * Brand id this dunning attempt belongs to
     */
    brand_id: string;

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
    /**
     * Brand id this dunning attempt belongs to
     */
    brand_id: string;

    created_at: string;

    customer_id: string;

    status: 'recovering' | 'recovered' | 'exhausted';

    subscription_id: string;

    trigger_state: 'on_hold' | 'cancelled';

    payment_id?: string | null;
  }
}

export interface EntitlementGrantCreatedWebhookEvent {
  /**
   * The business identifier
   */
  business_id: string;

  /**
   * Detailed view of a single entitlement grant: who it's for, its lifecycle state,
   * and any integration-specific delivery payload.
   */
  data: GrantsAPI.EntitlementGrant;

  /**
   * The timestamp of when the event occurred
   */
  timestamp: string;

  /**
   * The event type
   */
  type: 'entitlement_grant.created';
}

export interface EntitlementGrantDeliveredWebhookEvent {
  /**
   * The business identifier
   */
  business_id: string;

  /**
   * Detailed view of a single entitlement grant: who it's for, its lifecycle state,
   * and any integration-specific delivery payload.
   */
  data: GrantsAPI.EntitlementGrant;

  /**
   * The timestamp of when the event occurred
   */
  timestamp: string;

  /**
   * The event type
   */
  type: 'entitlement_grant.delivered';
}

export interface EntitlementGrantFailedWebhookEvent {
  /**
   * The business identifier
   */
  business_id: string;

  /**
   * Detailed view of a single entitlement grant: who it's for, its lifecycle state,
   * and any integration-specific delivery payload.
   */
  data: GrantsAPI.EntitlementGrant;

  /**
   * The timestamp of when the event occurred
   */
  timestamp: string;

  /**
   * The event type
   */
  type: 'entitlement_grant.failed';
}

export interface EntitlementGrantRevokedWebhookEvent {
  /**
   * The business identifier
   */
  business_id: string;

  /**
   * Detailed view of a single entitlement grant: who it's for, its lifecycle state,
   * and any integration-specific delivery payload.
   */
  data: GrantsAPI.EntitlementGrant;

  /**
   * The timestamp of when the event occurred
   */
  timestamp: string;

  /**
   * The event type
   */
  type: 'entitlement_grant.revoked';
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

export interface PayoutCreatedWebhookEvent {
  /**
   * The business identifier
   */
  business_id: string;

  data: PayoutCreatedWebhookEvent.Data;

  /**
   * The timestamp of when the event occurred
   */
  timestamp: string;

  /**
   * The event type
   */
  type: 'payout.created';
}

export namespace PayoutCreatedWebhookEvent {
  export interface Data {
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
}

export interface PayoutFailedWebhookEvent {
  /**
   * The business identifier
   */
  business_id: string;

  data: PayoutFailedWebhookEvent.Data;

  /**
   * The timestamp of when the event occurred
   */
  timestamp: string;

  /**
   * The event type
   */
  type: 'payout.failed';
}

export namespace PayoutFailedWebhookEvent {
  export interface Data {
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
}

export interface PayoutInProgressWebhookEvent {
  /**
   * The business identifier
   */
  business_id: string;

  data: PayoutInProgressWebhookEvent.Data;

  /**
   * The timestamp of when the event occurred
   */
  timestamp: string;

  /**
   * The event type
   */
  type: 'payout.in_progress';
}

export namespace PayoutInProgressWebhookEvent {
  export interface Data {
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
}

export interface PayoutOnHoldWebhookEvent {
  /**
   * The business identifier
   */
  business_id: string;

  data: PayoutOnHoldWebhookEvent.Data;

  /**
   * The timestamp of when the event occurred
   */
  timestamp: string;

  /**
   * The event type
   */
  type: 'payout.on_hold';
}

export namespace PayoutOnHoldWebhookEvent {
  export interface Data {
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
}

export interface PayoutSuccessWebhookEvent {
  /**
   * The business identifier
   */
  business_id: string;

  data: PayoutSuccessWebhookEvent.Data;

  /**
   * The timestamp of when the event occurred
   */
  timestamp: string;

  /**
   * The event type
   */
  type: 'payout.success';
}

export namespace PayoutSuccessWebhookEvent {
  export interface Data {
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

export interface SubscriptionPausedWebhookEvent {
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
  type: 'subscription.paused';
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

export interface SubscriptionUnpausedWebhookEvent {
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
  type: 'subscription.unpaused';
}

export interface SubscriptionUpdatePaymentMethodWebhookEvent {
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
  type: 'subscription.update_payment_method';
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

export type UnsafeUnwrapWebhookEvent =
  | AbandonedCheckoutDetectedWebhookEvent
  | AbandonedCheckoutRecoveredWebhookEvent
  | CreditAddedWebhookEvent
  | CreditBalanceLowWebhookEvent
  | CreditDeductedWebhookEvent
  | CreditExpiredWebhookEvent
  | CreditManualAdjustmentWebhookEvent
  | CreditOverageChargedWebhookEvent
  | CreditOverageResetWebhookEvent
  | CreditRolledOverWebhookEvent
  | CreditRolloverForfeitedWebhookEvent
  | DisputeAcceptedWebhookEvent
  | DisputeCancelledWebhookEvent
  | DisputeChallengedWebhookEvent
  | DisputeExpiredWebhookEvent
  | DisputeLostWebhookEvent
  | DisputeOpenedWebhookEvent
  | DisputeWonWebhookEvent
  | DunningRecoveredWebhookEvent
  | DunningStartedWebhookEvent
  | EntitlementGrantCreatedWebhookEvent
  | EntitlementGrantDeliveredWebhookEvent
  | EntitlementGrantFailedWebhookEvent
  | EntitlementGrantRevokedWebhookEvent
  | LicenseKeyCreatedWebhookEvent
  | PaymentCancelledWebhookEvent
  | PaymentFailedWebhookEvent
  | PaymentProcessingWebhookEvent
  | PaymentSucceededWebhookEvent
  | PayoutCreatedWebhookEvent
  | PayoutFailedWebhookEvent
  | PayoutInProgressWebhookEvent
  | PayoutOnHoldWebhookEvent
  | PayoutSuccessWebhookEvent
  | RefundFailedWebhookEvent
  | RefundSucceededWebhookEvent
  | SubscriptionActiveWebhookEvent
  | SubscriptionCancelledWebhookEvent
  | SubscriptionExpiredWebhookEvent
  | SubscriptionFailedWebhookEvent
  | SubscriptionOnHoldWebhookEvent
  | SubscriptionPausedWebhookEvent
  | SubscriptionPlanChangedWebhookEvent
  | SubscriptionRenewedWebhookEvent
  | SubscriptionUnpausedWebhookEvent
  | SubscriptionUpdatePaymentMethodWebhookEvent
  | SubscriptionUpdatedWebhookEvent;

export type UnwrapWebhookEvent =
  | AbandonedCheckoutDetectedWebhookEvent
  | AbandonedCheckoutRecoveredWebhookEvent
  | CreditAddedWebhookEvent
  | CreditBalanceLowWebhookEvent
  | CreditDeductedWebhookEvent
  | CreditExpiredWebhookEvent
  | CreditManualAdjustmentWebhookEvent
  | CreditOverageChargedWebhookEvent
  | CreditOverageResetWebhookEvent
  | CreditRolledOverWebhookEvent
  | CreditRolloverForfeitedWebhookEvent
  | DisputeAcceptedWebhookEvent
  | DisputeCancelledWebhookEvent
  | DisputeChallengedWebhookEvent
  | DisputeExpiredWebhookEvent
  | DisputeLostWebhookEvent
  | DisputeOpenedWebhookEvent
  | DisputeWonWebhookEvent
  | DunningRecoveredWebhookEvent
  | DunningStartedWebhookEvent
  | EntitlementGrantCreatedWebhookEvent
  | EntitlementGrantDeliveredWebhookEvent
  | EntitlementGrantFailedWebhookEvent
  | EntitlementGrantRevokedWebhookEvent
  | LicenseKeyCreatedWebhookEvent
  | PaymentCancelledWebhookEvent
  | PaymentFailedWebhookEvent
  | PaymentProcessingWebhookEvent
  | PaymentSucceededWebhookEvent
  | PayoutCreatedWebhookEvent
  | PayoutFailedWebhookEvent
  | PayoutInProgressWebhookEvent
  | PayoutOnHoldWebhookEvent
  | PayoutSuccessWebhookEvent
  | RefundFailedWebhookEvent
  | RefundSucceededWebhookEvent
  | SubscriptionActiveWebhookEvent
  | SubscriptionCancelledWebhookEvent
  | SubscriptionExpiredWebhookEvent
  | SubscriptionFailedWebhookEvent
  | SubscriptionOnHoldWebhookEvent
  | SubscriptionPausedWebhookEvent
  | SubscriptionPlanChangedWebhookEvent
  | SubscriptionRenewedWebhookEvent
  | SubscriptionUnpausedWebhookEvent
  | SubscriptionUpdatePaymentMethodWebhookEvent
  | SubscriptionUpdatedWebhookEvent;

export interface WebhookListParams extends CursorPagePaginationParams {}

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
    type CreditOverageResetWebhookEvent as CreditOverageResetWebhookEvent,
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
    type EntitlementGrantCreatedWebhookEvent as EntitlementGrantCreatedWebhookEvent,
    type EntitlementGrantDeliveredWebhookEvent as EntitlementGrantDeliveredWebhookEvent,
    type EntitlementGrantFailedWebhookEvent as EntitlementGrantFailedWebhookEvent,
    type EntitlementGrantRevokedWebhookEvent as EntitlementGrantRevokedWebhookEvent,
    type LicenseKeyCreatedWebhookEvent as LicenseKeyCreatedWebhookEvent,
    type PaymentCancelledWebhookEvent as PaymentCancelledWebhookEvent,
    type PaymentFailedWebhookEvent as PaymentFailedWebhookEvent,
    type PaymentProcessingWebhookEvent as PaymentProcessingWebhookEvent,
    type PaymentSucceededWebhookEvent as PaymentSucceededWebhookEvent,
    type PayoutCreatedWebhookEvent as PayoutCreatedWebhookEvent,
    type PayoutFailedWebhookEvent as PayoutFailedWebhookEvent,
    type PayoutInProgressWebhookEvent as PayoutInProgressWebhookEvent,
    type PayoutOnHoldWebhookEvent as PayoutOnHoldWebhookEvent,
    type PayoutSuccessWebhookEvent as PayoutSuccessWebhookEvent,
    type RefundFailedWebhookEvent as RefundFailedWebhookEvent,
    type RefundSucceededWebhookEvent as RefundSucceededWebhookEvent,
    type SubscriptionActiveWebhookEvent as SubscriptionActiveWebhookEvent,
    type SubscriptionCancelledWebhookEvent as SubscriptionCancelledWebhookEvent,
    type SubscriptionExpiredWebhookEvent as SubscriptionExpiredWebhookEvent,
    type SubscriptionFailedWebhookEvent as SubscriptionFailedWebhookEvent,
    type SubscriptionOnHoldWebhookEvent as SubscriptionOnHoldWebhookEvent,
    type SubscriptionPausedWebhookEvent as SubscriptionPausedWebhookEvent,
    type SubscriptionPlanChangedWebhookEvent as SubscriptionPlanChangedWebhookEvent,
    type SubscriptionRenewedWebhookEvent as SubscriptionRenewedWebhookEvent,
    type SubscriptionUnpausedWebhookEvent as SubscriptionUnpausedWebhookEvent,
    type SubscriptionUpdatePaymentMethodWebhookEvent as SubscriptionUpdatePaymentMethodWebhookEvent,
    type SubscriptionUpdatedWebhookEvent as SubscriptionUpdatedWebhookEvent,
    type UnsafeUnwrapWebhookEvent as UnsafeUnwrapWebhookEvent,
    type UnwrapWebhookEvent as UnwrapWebhookEvent,
    type WebhookDetailsCursorPagePagination as WebhookDetailsCursorPagePagination,
    type WebhookListParams as WebhookListParams,
    type WebhookCreateParams as WebhookCreateParams,
    type WebhookUpdateParams as WebhookUpdateParams,
  };

  export {
    Headers as Headers,
    type HeaderRetrieveResponse as HeaderRetrieveResponse,
    type HeaderUpdateParams as HeaderUpdateParams,
  };
}
