// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import {
  DefaultPageNumberPagination,
  type DefaultPageNumberPaginationParams,
  PagePromise,
} from '../../core/pagination';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Emails extends APIResource {
  /**
   * Returns every transactional email sent to this customer in the last 180 days,
   * newest first, with its delivery outcome. Delivery status comes from the email
   * provider and is as fresh as replication, typically seconds.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const emailLogItem of client.customers.emails.list(
   *   'customer_id',
   * )) {
   *   // ...
   * }
   * ```
   */
  list(
    customerID: string,
    query: EmailListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<EmailLogItemsDefaultPageNumberPagination, EmailLogItem> {
    return this._client.getAPIList(
      path`/customers/${customerID}/emails`,
      DefaultPageNumberPagination<EmailLogItem>,
      { query, ...options },
    );
  }

  /**
   * Returns the email exactly as it was sent, plus the reason it failed when it did.
   * Some emails have no body to show: an authentication email carries a live login
   * token, a blocked email never reached the provider, and the provider clears
   * bodies at 180 days.
   *
   * @example
   * ```ts
   * const emailBody =
   *   await client.customers.emails.retrieveBody(
   *     'email_log_id',
   *     { customer_id: 'customer_id' },
   *   );
   * ```
   */
  retrieveBody(
    emailLogID: string,
    params: EmailRetrieveBodyParams,
    options?: RequestOptions,
  ): APIPromise<EmailBody> {
    const { customer_id } = params;
    return this._client.get(path`/customers/${customer_id}/emails/${emailLogID}/body`, options);
  }
}

export type EmailLogItemsDefaultPageNumberPagination = DefaultPageNumberPagination<EmailLogItem>;

export interface EmailBody {
  /**
   * Whether the merchant wrote this content. It is true for the recovery and dunning
   * emails, which the merchant writes.
   *
   * The content is email HTML. Render it in a sandbox, whatever this value is.
   */
  merchant_authored: boolean;

  /**
   * Why the email did not arrive. It is null unless the email failed.
   */
  failure_code?: EmailFailureCode | null;

  /**
   * A sentence that explains `failure_code`. It is null unless the email failed.
   */
  failure_reason?: string | null;

  /**
   * The stored HTML. It is null on a text-only email.
   */
  html?: string | null;

  /**
   * The stored plain text.
   */
  text?: string | null;
}

/**
 * Why an email did not reach the recipient.
 *
 * The code is stable. `send_failed` is the catch-all: it covers every failure that
 * the other codes do not name.
 */
export type EmailFailureCode =
  | 'mailbox_not_found'
  | 'address_rejected'
  | 'address_suppressed'
  | 'mailbox_full'
  | 'temporary_failure'
  | 'message_too_large'
  | 'marked_as_spam'
  | 'send_failed'
  | 'test_mode_quota_spent';

export interface EmailLogItem {
  /**
   * The group this email belongs to: payments, refunds, subscriptions,
   * dunning_recovery, entitlements or auth.
   */
  category: string;

  /**
   * When this email was sent.
   */
  created_at: string;

  /**
   * Identifies this email. Use it to read the body or to send it again.
   */
  email_log_id: string;

  /**
   * What kind of email this is, for example `payment_successful`.
   */
  email_type: string;

  /**
   * Whether this email has content to show. The content endpoint can still refuse,
   * because the content is removed after 180 days.
   */
  has_preview: boolean;

  /**
   * What you may do with this email.
   */
  policies: EmailPolicies;

  /**
   * Where the email got to: sent, delivered, failed, complained or blocked.
   */
  status: EmailLogStatus;

  /**
   * Why the email did not arrive. It is null unless the email failed.
   */
  failure_code?: EmailFailureCode | null;

  /**
   * A sentence that explains `failure_code`. It is null unless the email failed.
   */
  failure_reason?: string | null;

  /**
   * The address the email was sent from.
   */
  from?: string | null;

  /**
   * The address the email went to. On a failed email this is the address the
   * provider reports as bounced.
   */
  recipient?: string | null;

  /**
   * The subject line as it was sent. Empty until the provider replicates.
   */
  subject?: string | null;
}

/**
 * The delivery status of one email.
 *
 * `sent` also covers an email that is still on its way. A status only becomes
 * `delivered`, `failed` or `complained` when the mail server answers.
 */
export type EmailLogStatus = 'sent' | 'delivered' | 'failed' | 'complained' | 'blocked';

/**
 * What the merchant may do with one row. The server decides; the client never
 * derives eligibility itself.
 */
export interface EmailPolicies {
  /**
   * A permanent failure was recorded, so the same address would be a no-op.
   */
  requires_different_address: boolean;

  /**
   * The row was delivered and may be sent again.
   */
  resend_allowed: boolean;

  /**
   * How many sends are left in this email's chain.
   */
  resends_remaining: number;

  /**
   * The row failed and may be sent again.
   */
  retry_allowed: boolean;

  /**
   * A later send of this email replaced this row, so this row is history. A row that
   * never went out needs a later send that reached the provider. A failed row needs
   * a later send that was delivered.
   */
  superseded: boolean;
}

export interface EmailListParams extends DefaultPageNumberPaginationParams {}

export interface EmailRetrieveBodyParams {
  /**
   * The customer's id
   */
  customer_id: string;
}

export declare namespace Emails {
  export {
    type EmailBody as EmailBody,
    type EmailFailureCode as EmailFailureCode,
    type EmailLogItem as EmailLogItem,
    type EmailLogStatus as EmailLogStatus,
    type EmailPolicies as EmailPolicies,
    type EmailLogItemsDefaultPageNumberPagination as EmailLogItemsDefaultPageNumberPagination,
    type EmailListParams as EmailListParams,
    type EmailRetrieveBodyParams as EmailRetrieveBodyParams,
  };
}
