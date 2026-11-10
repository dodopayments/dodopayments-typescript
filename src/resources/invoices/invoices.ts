// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as MiscAPI from '../misc';
import * as PaymentsAPI from '../payments';
import * as SubscriptionsAPI from '../subscriptions';
import * as InvoicesPaymentsAPI from './payments';
import {
  PaymentRetrieveParams,
  PaymentRetrievePayoutParams,
  PaymentRetrieveRefundParams,
  Payments,
} from './payments';
import { APIPromise } from '../../core/api-promise';
import {
  DefaultPageNumberPagination,
  type DefaultPageNumberPaginationParams,
  PagePromise,
} from '../../core/pagination';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Invoices extends APIResource {
  payments: InvoicesPaymentsAPI.Payments = new InvoicesPaymentsAPI.Payments(this._client);

  /**
   * Lists invoice-led invoices, newest first. The items have no `lines` and no
   * `payments`.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const invoice of client.invoices.list()) {
   *   // ...
   * }
   * ```
   */
  list(
    query: InvoiceListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<InvoicesDefaultPageNumberPagination, Invoice> {
    return this._client.getAPIList('/billing/invoices', DefaultPageNumberPagination<Invoice>, {
      query,
      ...options,
    });
  }

  /**
   * Creates a draft. A repeat with the same `Idempotency-Key` returns the first
   * draft.
   *
   * @example
   * ```ts
   * const invoice = await client.invoices.create({
   *   collection_method: 'auto_charge',
   *   currency: 'AED',
   *   customer_id: 'customer_id',
   *   items: [
   *     {
   *       description: 'description',
   *       kind: 'custom',
   *       tax_category: 'digital_products',
   *       unit_amount: 0,
   *     },
   *   ],
   * });
   * ```
   */
  create(params: InvoiceCreateParams, options?: RequestOptions): APIPromise<Invoice> {
    const { 'Idempotency-Key': idempotencyKey, ...body } = params;
    return this._client.post('/billing/invoices', {
      body,
      ...options,
      headers: buildHeaders([
        { ...(idempotencyKey != null ? { 'Idempotency-Key': idempotencyKey } : undefined) },
        options?.headers,
      ]),
    });
  }

  /**
   * Get an invoice
   *
   * @example
   * ```ts
   * const invoice = await client.invoices.retrieve(
   *   'invoice_id',
   * );
   * ```
   */
  retrieve(invoiceID: string, options?: RequestOptions): APIPromise<Invoice> {
    return this._client.get(path`/billing/invoices/${invoiceID}`, options);
  }

  /**
   * Changes only the sent fields. `null` clears a field that can be empty.
   *
   * @example
   * ```ts
   * const invoice = await client.invoices.update('invoice_id', {
   *   'If-Match': 'If-Match',
   * });
   * ```
   */
  update(invoiceID: string, params: InvoiceUpdateParams, options?: RequestOptions): APIPromise<Invoice> {
    const { 'If-Match': ifMatch, ...body } = params;
    return this._client.patch(path`/billing/invoices/${invoiceID}`, {
      body,
      ...options,
      headers: buildHeaders([{ 'If-Match': ifMatch }, options?.headers]),
    });
  }

  /**
   * Delete a draft invoice
   *
   * @example
   * ```ts
   * await client.invoices.delete('invoice_id', {
   *   'If-Match': 'If-Match',
   * });
   * ```
   */
  delete(invoiceID: string, params: InvoiceDeleteParams, options?: RequestOptions): APIPromise<void> {
    const { 'If-Match': ifMatch } = params;
    return this._client.delete(path`/billing/invoices/${invoiceID}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*', 'If-Match': ifMatch }, options?.headers]),
    });
  }

  /**
   * Prices the body as a draft and returns it. No row is saved.
   *
   * @example
   * ```ts
   * const invoice = await client.invoices.preview({
   *   collection_method: 'auto_charge',
   *   currency: 'AED',
   *   customer_id: 'customer_id',
   *   items: [
   *     {
   *       description: 'description',
   *       kind: 'custom',
   *       tax_category: 'digital_products',
   *       unit_amount: 0,
   *     },
   *   ],
   * });
   * ```
   */
  preview(params: InvoicePreviewParams, options?: RequestOptions): APIPromise<Invoice> {
    const { format, ...body } = params;
    return this._client.post('/billing/invoices/preview', { query: { format }, body, ...options });
  }

  /**
   * Preview a draft invoice
   *
   * @example
   * ```ts
   * const invoice = await client.invoices.previewExisting(
   *   'invoice_id',
   * );
   * ```
   */
  previewExisting(
    invoiceID: string,
    query: InvoicePreviewExistingParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<Invoice> {
    return this._client.get(path`/billing/invoices/${invoiceID}/preview`, { query, ...options });
  }

  /**
   * Issues the draft. With `send: true`, the invoice email goes out after the issue.
   * A failed send keeps the invoice issued. Call `/send` again with the new `ETag`.
   *
   * @example
   * ```ts
   * const invoice = await client.invoices.finalize(
   *   'invoice_id',
   *   { 'If-Match': 'If-Match' },
   * );
   * ```
   */
  finalize(invoiceID: string, params: InvoiceFinalizeParams, options?: RequestOptions): APIPromise<Invoice> {
    const { 'If-Match': ifMatch, ...body } = params;
    return this._client.post(path`/billing/invoices/${invoiceID}/finalize`, {
      body,
      ...options,
      headers: buildHeaders([{ 'If-Match': ifMatch }, options?.headers]),
    });
  }

  /**
   * Emails the invoice to the customer email and the CC emails.
   *
   * @example
   * ```ts
   * const invoice = await client.invoices.send('invoice_id', {
   *   'If-Match': 'If-Match',
   * });
   * ```
   */
  send(invoiceID: string, params: InvoiceSendParams, options?: RequestOptions): APIPromise<Invoice> {
    const { 'If-Match': ifMatch } = params;
    return this._client.post(path`/billing/invoices/${invoiceID}/send`, {
      ...options,
      headers: buildHeaders([{ 'If-Match': ifMatch }, options?.headers]),
    });
  }

  /**
   * Closes an open or past-due invoice. Applied credits go back to the customer
   * wallet.
   *
   * @example
   * ```ts
   * const invoice = await client.invoices.void('invoice_id', {
   *   'If-Match': 'If-Match',
   * });
   * ```
   */
  void(invoiceID: string, params: InvoiceVoidParams, options?: RequestOptions): APIPromise<Invoice> {
    const { 'If-Match': ifMatch } = params;
    return this._client.post(path`/billing/invoices/${invoiceID}/void`, {
      ...options,
      headers: buildHeaders([{ 'If-Match': ifMatch }, options?.headers]),
    });
  }

  /**
   * Charges the saved payment method of the invoice subscription now.
   *
   * @example
   * ```ts
   * const invoice = await client.invoices.retry('invoice_id', {
   *   'If-Match': 'If-Match',
   * });
   * ```
   */
  retry(invoiceID: string, params: InvoiceRetryParams, options?: RequestOptions): APIPromise<Invoice> {
    const { 'If-Match': ifMatch } = params;
    return this._client.post(path`/billing/invoices/${invoiceID}/retry`, {
      ...options,
      headers: buildHeaders([{ 'If-Match': ifMatch }, options?.headers]),
    });
  }

  /**
   * Copies the customer, the product lines, the terms and the recipients into a new
   * draft. Usage lines are not copied.
   *
   * @example
   * ```ts
   * const invoice = await client.invoices.duplicate(
   *   'invoice_id',
   * );
   * ```
   */
  duplicate(invoiceID: string, options?: RequestOptions): APIPromise<Invoice> {
    return this._client.post(path`/billing/invoices/${invoiceID}/duplicate`, options);
  }

  /**
   * Mark an invoice uncollectable
   *
   * @example
   * ```ts
   * const invoice = await client.invoices.markUncollectable(
   *   'invoice_id',
   *   { 'If-Match': 'If-Match' },
   * );
   * ```
   */
  markUncollectable(
    invoiceID: string,
    params: InvoiceMarkUncollectableParams,
    options?: RequestOptions,
  ): APIPromise<Invoice> {
    const { 'If-Match': ifMatch } = params;
    return this._client.post(path`/billing/invoices/${invoiceID}/mark-uncollectable`, {
      ...options,
      headers: buildHeaders([{ 'If-Match': ifMatch }, options?.headers]),
    });
  }

  /**
   * A note changes no field, so it needs no `If-Match`. The note shows in `/events`.
   *
   * @example
   * ```ts
   * const invoice = await client.invoices.addNote(
   *   'invoice_id',
   *   { text: 'text' },
   * );
   * ```
   */
  addNote(invoiceID: string, body: InvoiceAddNoteParams, options?: RequestOptions): APIPromise<Invoice> {
    return this._client.post(path`/billing/invoices/${invoiceID}/notes`, { body, ...options });
  }

  /**
   * Returns the change history of the invoice, oldest first.
   *
   * @example
   * ```ts
   * const response = await client.invoices.listEvents(
   *   'invoice_id',
   * );
   * ```
   */
  listEvents(invoiceID: string, options?: RequestOptions): APIPromise<InvoiceListEventsResponse> {
    return this._client.get(path`/billing/invoices/${invoiceID}/events`, options);
  }

  /**
   * Returns the page where the customer pays. A copied link counts as a send, so the
   * first call sets `sent_at`.
   *
   * @example
   * ```ts
   * const response = await client.invoices.createHostedLink(
   *   'invoice_id',
   * );
   * ```
   */
  createHostedLink(invoiceID: string, options?: RequestOptions): APIPromise<InvoiceCreateHostedLinkResponse> {
    return this._client.post(path`/billing/invoices/${invoiceID}/hosted-link`, options);
  }

  /**
   * Pauses, resumes or moves the reminders of an open or past-due invoice.
   *
   * @example
   * ```ts
   * const invoice = await client.invoices.updateDunning(
   *   'invoice_id',
   *   { action: 'pause', 'If-Match': 'If-Match' },
   * );
   * ```
   */
  updateDunning(
    invoiceID: string,
    params: InvoiceUpdateDunningParams,
    options?: RequestOptions,
  ): APIPromise<Invoice> {
    const { 'If-Match': ifMatch, ...body } = params;
    return this._client.post(path`/billing/invoices/${invoiceID}/dunning`, {
      body,
      ...options,
      headers: buildHeaders([{ 'If-Match': ifMatch }, options?.headers]),
    });
  }
}

export type InvoicesDefaultPageNumberPagination = DefaultPageNumberPagination<Invoice>;

export type CollectionMethod = 'auto_charge' | 'manual';

export type DunningState = 'not_started' | 'active' | 'paused' | 'exhausted';

/**
 * An invoice-led invoice. Every read and every `invoice.*` webhook uses this
 * schema.
 */
export interface Invoice {
  /**
   * The actions that the current status accepts.
   */
  allowed_actions: Array<
    | 'edit'
    | 'finalize'
    | 'delete'
    | 'send'
    | 'retry'
    | 'void'
    | 'mark_uncollectable'
    | 'change_dunning'
    | 'add_note'
    | 'duplicate'
  >;

  /**
   * The amount that the customer must pay. Zero unless the invoice is open or past
   * due.
   */
  amount_due: number;

  /**
   * The sum of the succeeded payments, in the smallest currency unit. A late payment
   * is not included after its late refund.
   */
  amount_paid: number;

  /**
   * The sum of the succeeded refunds, in the currency of each payment. The late
   * refund of a late payment is not included.
   */
  amount_refunded: number;

  billing_mode: 'normal' | 'invoice_led';

  business_id: string;

  created_at: string;

  /**
   * Customer credits applied at finalise, in the smallest currency unit. Zero or
   * less.
   */
  credits: number;

  currency: MiscAPI.Currency;

  customer: Invoice.Customer;

  /**
   * The discount codes of the invoice.
   */
  discount_ids: Array<string>;

  /**
   * The fields that `PATCH` can change in the current status.
   */
  editable_fields: Array<
    | 'customer'
    | 'items'
    | 'discounts'
    | 'currency'
    | 'billing_address'
    | 'tax_id'
    | 'review_required'
    | 'due_at'
    | 'collection_method'
    | 'memo'
    | 'customer_email'
    | 'cc_emails'
    | 'dunning'
    | 'metadata'
  >;

  /**
   * How often the invoice lines bill. `mixed` covers several intervals, or one-time
   * lines next to a plan.
   */
  frequency: Invoice.OneTime | Invoice.Recurring | Invoice.Mixed;

  invoice_id: string;

  metadata: unknown;

  refund_ids: Array<string>;

  /**
   * The number of failed automatic charges.
   */
  retry_count: number;

  /**
   * Goes up by one on each change. Use it to ignore an older webhook delivery.
   */
  row_version: number;

  /**
   * The `message` of each variant is the label of the invoice document.
   */
  status: InvoiceStatus;

  subscription_ids: Array<string>;

  tags: Array<'refunded' | 'partially_refunded' | 'disputed' | 'payment_reversed'>;

  /**
   * Tax in the smallest currency unit.
   */
  tax: number;

  /**
   * Total with tax, before credits, in the smallest currency unit.
   */
  total_amount: number;

  collection_method?: CollectionMethod | null;

  due_at?: string | null;

  /**
   * `null` for an invoice that has no collection: draft, paid, void or
   * uncollectable.
   */
  dunning_state?: DunningState | null;

  finalized_at?: string | null;

  /**
   * The page where the customer pays. `null` until the invoice is sent.
   */
  hosted_url?: string | null;

  /**
   * Only on a single invoice. A list leaves it out.
   */
  lines?: Array<InvoiceLine> | null;

  memo?: string | null;

  /**
   * The time of the next reminder email to the customer, before or after the due
   * date. `null` when no reminder email will go out.
   */
  next_reminder_at?: string | null;

  next_retry_at?: string | null;

  /**
   * Days from finalise to the due date. `null` when the invoice has a custom due
   * date.
   */
  payment_terms_days?: number | null;

  /**
   * Only on a single invoice. A list leaves it out.
   */
  payments?: Array<Invoice.Payment> | null;

  pdf_url?: string | null;

  /**
   * `null` on a draft that keeps all reminder settings of the business.
   */
  reminder_settings?: Invoice.Snapshot | Invoice.Override | null;

  /**
   * The time at which a draft that waits for review finalises.
   */
  review_deadline?: string | null;

  sent_at?: string | null;
}

export namespace Invoice {
  export interface Customer {
    /**
     * A draft can have no country yet. Finalise needs it.
     */
    billing_address: Customer.BillingAddress;

    cc_emails: Array<string>;

    customer_id: string;

    email?: string | null;

    tax_id?: string | null;
  }

  export namespace Customer {
    /**
     * A draft can have no country yet. Finalise needs it.
     */
    export interface BillingAddress {
      city?: string | null;

      /**
       * ISO country code alpha2 variant
       */
      country?: MiscAPI.CountryCode | null;

      state?: string | null;

      street?: string | null;

      zipcode?: string | null;
    }
  }

  export interface OneTime {
    type: 'one_time';
  }

  export interface Recurring {
    count: number;

    /**
     * Unit of a duration count (e.g. license-key validity period).
     */
    interval: SubscriptionsAPI.TimeInterval;

    type: 'recurring';
  }

  export interface Mixed {
    type: 'mixed';
  }

  export interface Payment {
    amount: number;

    created_at: string;

    payment_id: string;

    /**
     * The automatic charge number. `null` for a payment that the customer started.
     */
    retry_attempt?: number | null;

    /**
     * `null` while the processor has not answered.
     */
    status?: PaymentsAPI.IntentStatus | null;
  }

  /**
   * The settings that finalise froze. The reminders run on them.
   */
  export interface Snapshot {
    kind: 'snapshot';

    offsets_minutes: Array<number>;

    paused: boolean;

    reminders_enabled: boolean;
  }

  /**
   * The changes of a draft. A `null` field keeps the business value at finalise.
   */
  export interface Override {
    kind: 'override';

    offsets_minutes?: Array<number> | null;

    paused?: boolean | null;

    reminders_enabled?: boolean | null;
  }
}

export interface InvoiceEvent {
  /**
   * A user ID, `api_key`, `customer` or `system`.
   */
  actor: string;

  created_at: string;

  event_id: string;

  event_type: string;

  payload: unknown;

  row_version: number;

  actor_email?: string | null;
}

/**
 * One frozen line. Amounts are in the smallest currency unit.
 */
export interface InvoiceLine {
  amount: number;

  kind: 'subscription' | 'addon' | 'meter' | 'credit_overage' | 'one_time';

  /**
   * A usage line has a quantity of 1. Its amount is the full usage charge.
   */
  quantity: number;

  tax: number;

  /**
   * `true` when `amount` includes `tax`.
   */
  tax_inclusive: boolean;

  unit_amount: number;

  addon_id?: string | null;

  description?: string | null;

  name?: string | null;

  period_end?: string | null;

  period_start?: string | null;

  product_id?: string | null;

  subscription_id?: string | null;

  /**
   * Tax percent times 100. For example, 1800 is 18%.
   */
  tax_rate?: number | null;
}

/**
 * The `message` of each variant is the label of the invoice document.
 */
export type InvoiceStatus = 'open' | 'paid' | 'void' | 'draft' | 'past_due' | 'uncollectable';

export interface InvoiceCreateHostedLinkResponse {
  expires_at: string;

  hosted_url: string;
}

export interface InvoiceListEventsResponse {
  items: Array<InvoiceEvent>;
}

export interface InvoiceListParams extends DefaultPageNumberPaginationParams {
  collection_method?: 'auto_charge' | 'manual';

  created_at_gte?: string;

  created_at_lte?: string;

  customer_id?: string;

  due_at_gte?: string;

  due_at_lte?: string;

  /**
   * Repeat the key to match more than one status, for example
   * `status=open&status=past_due`.
   */
  status?: Array<'open' | 'paid' | 'void' | 'draft' | 'past_due' | 'uncollectable'>;

  subscription_id?: string;

  /**
   * Repeat the key to match an invoice that has any one of the tags.
   */
  tags?: Array<'refunded' | 'partially_refunded' | 'disputed' | 'payment_reversed'>;

  total_amount_gte?: number;

  total_amount_lte?: number;
}

export interface InvoiceCreateParams {
  /**
   * Body param
   */
  collection_method: CollectionMethod;

  /**
   * Body param
   */
  currency: MiscAPI.Currency;

  /**
   * Body param
   */
  customer_id: string;

  /**
   * Body param: 1 to 50 items.
   */
  items: Array<InvoiceCreateParams.CustomItem | InvoiceCreateParams.ProductItem>;

  /**
   * Body param: The billing address of an invoice request.
   */
  billing_address?: InvoiceCreateParams.BillingAddress | null;

  /**
   * Body param: 10 addresses or fewer.
   */
  cc_emails?: Array<string> | null;

  /**
   * Body param: The customer email is used when this is not set.
   */
  customer_email?: string | null;

  /**
   * Body param: 20 codes or fewer.
   */
  discount_ids?: Array<string> | null;

  /**
   * Body param: A custom due date. Do not send it with `payment_terms`.
   */
  due_at?: string | null;

  /**
   * Body param: The reminder override of one invoice. The business settings fill the
   * other dunning values.
   */
  dunning?: InvoiceCreateParams.Dunning | null;

  /**
   * Body param
   */
  memo?: string | null;

  /**
   * Body param: Arbitrary key-value metadata. Values can be string, integer, number,
   * or boolean.
   */
  metadata?: MiscAPI.Metadata;

  /**
   * Body param: Do not send it with `due_at`.
   */
  payment_terms?: InvoiceCreateParams.DueOnReceipt | InvoiceCreateParams.Net | null;

  /**
   * Body param: `true` keeps a renewal draft for review before it finalises.
   */
  review_required?: boolean;

  /**
   * Body param
   */
  tax_id?: string | null;

  /**
   * Header param: A key of 1 to 255 characters. A repeat with the same key returns
   * the first draft.
   */
  'Idempotency-Key'?: string;
}

export namespace InvoiceCreateParams {
  /**
   * A line that exists only on this invoice.
   */
  export interface CustomItem {
    description: string;

    kind: 'custom';

    /**
     * Represents the different categories of taxation applicable to various products
     * and services.
     */
    tax_category: MiscAPI.TaxCategory;

    /**
     * The price in the smallest currency unit.
     */
    unit_amount: number;

    /**
     * The default is 1.
     */
    quantity?: number | null;
  }

  export interface ProductItem {
    product_id: string;

    quantity: number;

    addons?: Array<SubscriptionsAPI.AttachAddon> | null;
  }

  /**
   * The billing address of an invoice request.
   */
  export interface BillingAddress {
    /**
     * Two-letter ISO country code (ISO 3166-1 alpha-2)
     */
    country: MiscAPI.CountryCode;

    city?: string | null;

    state?: string | null;

    street?: string | null;

    zipcode?: string | null;
  }

  /**
   * The reminder override of one invoice. The business settings fill the other
   * dunning values.
   */
  export interface Dunning {
    reminders_enabled: boolean;

    /**
     * Days from the due date. A negative value sends the reminder before the due date.
     */
    offsets_days?: Array<number> | null;
  }

  export interface DueOnReceipt {
    type: 'due_on_receipt';
  }

  export interface Net {
    days: number;

    type: 'net';
  }
}

export interface InvoiceUpdateParams {
  /**
   * Header param: The row_version of the invoice that the request changes.
   */
  'If-Match': string;

  /**
   * Body param: The billing address of an invoice request.
   */
  billing_address?: InvoiceUpdateParams.BillingAddress | null;

  /**
   * Body param: 10 addresses or fewer.
   */
  cc_emails?: Array<string> | null;

  /**
   * Body param
   */
  collection_method?: CollectionMethod | null;

  /**
   * Body param
   */
  currency?: MiscAPI.Currency | null;

  /**
   * Body param
   */
  customer_email?: string | null;

  /**
   * Body param
   */
  customer_id?: string | null;

  /**
   * Body param: 20 codes or fewer.
   */
  discount_ids?: Array<string> | null;

  /**
   * Body param
   */
  due_at?: string | null;

  /**
   * Body param: The reminder override of one invoice. The business settings fill the
   * other dunning values.
   */
  dunning?: InvoiceUpdateParams.Dunning | null;

  /**
   * Body param: 1 to 50 items.
   */
  items?: Array<InvoiceUpdateParams.CustomItem | InvoiceUpdateParams.ProductItem> | null;

  /**
   * Body param
   */
  memo?: string | null;

  /**
   * Body param: Arbitrary key-value metadata. Values can be string, integer, number,
   * or boolean.
   */
  metadata?: MiscAPI.Metadata | null;

  /**
   * Body param
   */
  payment_terms?: InvoiceUpdateParams.DueOnReceipt | InvoiceUpdateParams.Net | null;

  /**
   * Body param
   */
  review_required?: boolean | null;

  /**
   * Body param
   */
  tax_id?: string | null;
}

export namespace InvoiceUpdateParams {
  /**
   * The billing address of an invoice request.
   */
  export interface BillingAddress {
    /**
     * Two-letter ISO country code (ISO 3166-1 alpha-2)
     */
    country: MiscAPI.CountryCode;

    city?: string | null;

    state?: string | null;

    street?: string | null;

    zipcode?: string | null;
  }

  /**
   * The reminder override of one invoice. The business settings fill the other
   * dunning values.
   */
  export interface Dunning {
    reminders_enabled: boolean;

    /**
     * Days from the due date. A negative value sends the reminder before the due date.
     */
    offsets_days?: Array<number> | null;
  }

  /**
   * A line that exists only on this invoice.
   */
  export interface CustomItem {
    description: string;

    kind: 'custom';

    /**
     * Represents the different categories of taxation applicable to various products
     * and services.
     */
    tax_category: MiscAPI.TaxCategory;

    /**
     * The price in the smallest currency unit.
     */
    unit_amount: number;

    /**
     * The default is 1.
     */
    quantity?: number | null;
  }

  export interface ProductItem {
    product_id: string;

    quantity: number;

    addons?: Array<SubscriptionsAPI.AttachAddon> | null;
  }

  export interface DueOnReceipt {
    type: 'due_on_receipt';
  }

  export interface Net {
    days: number;

    type: 'net';
  }
}

export interface InvoiceDeleteParams {
  /**
   * The row_version of the invoice that the request changes.
   */
  'If-Match': string;
}

export interface InvoicePreviewParams {
  /**
   * Body param
   */
  collection_method: CollectionMethod;

  /**
   * Body param
   */
  currency: MiscAPI.Currency;

  /**
   * Body param
   */
  customer_id: string;

  /**
   * Body param: 1 to 50 items.
   */
  items: Array<InvoicePreviewParams.CustomItem | InvoicePreviewParams.ProductItem>;

  /**
   * Query param: The preview body. `json` returns the invoice JSON. `pdf` returns
   * the PDF with a draft mark. `email` returns the HTML of the invoice email. A
   * preview saves no row.
   */
  format?: 'json' | 'pdf' | 'email';

  /**
   * Body param: The billing address of an invoice request.
   */
  billing_address?: InvoicePreviewParams.BillingAddress | null;

  /**
   * Body param: 10 addresses or fewer.
   */
  cc_emails?: Array<string> | null;

  /**
   * Body param: The customer email is used when this is not set.
   */
  customer_email?: string | null;

  /**
   * Body param: 20 codes or fewer.
   */
  discount_ids?: Array<string> | null;

  /**
   * Body param: A custom due date. Do not send it with `payment_terms`.
   */
  due_at?: string | null;

  /**
   * Body param: The reminder override of one invoice. The business settings fill the
   * other dunning values.
   */
  dunning?: InvoicePreviewParams.Dunning | null;

  /**
   * Body param
   */
  memo?: string | null;

  /**
   * Body param: Arbitrary key-value metadata. Values can be string, integer, number,
   * or boolean.
   */
  metadata?: MiscAPI.Metadata;

  /**
   * Body param: Do not send it with `due_at`.
   */
  payment_terms?: InvoicePreviewParams.DueOnReceipt | InvoicePreviewParams.Net | null;

  /**
   * Body param: `true` keeps a renewal draft for review before it finalises.
   */
  review_required?: boolean;

  /**
   * Body param
   */
  tax_id?: string | null;
}

export namespace InvoicePreviewParams {
  /**
   * A line that exists only on this invoice.
   */
  export interface CustomItem {
    description: string;

    kind: 'custom';

    /**
     * Represents the different categories of taxation applicable to various products
     * and services.
     */
    tax_category: MiscAPI.TaxCategory;

    /**
     * The price in the smallest currency unit.
     */
    unit_amount: number;

    /**
     * The default is 1.
     */
    quantity?: number | null;
  }

  export interface ProductItem {
    product_id: string;

    quantity: number;

    addons?: Array<SubscriptionsAPI.AttachAddon> | null;
  }

  /**
   * The billing address of an invoice request.
   */
  export interface BillingAddress {
    /**
     * Two-letter ISO country code (ISO 3166-1 alpha-2)
     */
    country: MiscAPI.CountryCode;

    city?: string | null;

    state?: string | null;

    street?: string | null;

    zipcode?: string | null;
  }

  /**
   * The reminder override of one invoice. The business settings fill the other
   * dunning values.
   */
  export interface Dunning {
    reminders_enabled: boolean;

    /**
     * Days from the due date. A negative value sends the reminder before the due date.
     */
    offsets_days?: Array<number> | null;
  }

  export interface DueOnReceipt {
    type: 'due_on_receipt';
  }

  export interface Net {
    days: number;

    type: 'net';
  }
}

export interface InvoicePreviewExistingParams {
  /**
   * The preview body. `json` returns the invoice JSON. `pdf` returns the PDF with a
   * draft mark. `email` returns the HTML of the invoice email. A preview saves no
   * row.
   */
  format?: 'json' | 'pdf' | 'email';
}

export interface InvoiceFinalizeParams {
  /**
   * Header param: The row_version of the invoice that the request changes.
   */
  'If-Match': string;

  /**
   * Body param: 10 addresses or fewer.
   */
  cc_emails?: Array<string> | null;

  /**
   * Body param
   */
  customer_email?: string | null;

  /**
   * Body param: `true` sends the invoice email after finalise.
   */
  send?: boolean;
}

export interface InvoiceSendParams {
  /**
   * The row_version of the invoice that the request changes.
   */
  'If-Match': string;
}

export interface InvoiceVoidParams {
  /**
   * The row_version of the invoice that the request changes.
   */
  'If-Match': string;
}

export interface InvoiceRetryParams {
  /**
   * The row_version of the invoice that the request changes.
   */
  'If-Match': string;
}

export interface InvoiceMarkUncollectableParams {
  /**
   * The row_version of the invoice that the request changes.
   */
  'If-Match': string;
}

export interface InvoiceAddNoteParams {
  text: string;
}

export interface InvoiceUpdateDunningParams {
  /**
   * Body param
   */
  action: 'pause' | 'resume' | 'reschedule';

  /**
   * Header param: The row_version of the invoice that the request changes.
   */
  'If-Match': string;

  /**
   * Body param: Needed for `reschedule`. Days from the due date.
   */
  offsets_days?: Array<number> | null;
}

Invoices.Payments = Payments;

export declare namespace Invoices {
  export {
    type CollectionMethod as CollectionMethod,
    type DunningState as DunningState,
    type Invoice as Invoice,
    type InvoiceEvent as InvoiceEvent,
    type InvoiceLine as InvoiceLine,
    type InvoiceStatus as InvoiceStatus,
    type InvoiceCreateHostedLinkResponse as InvoiceCreateHostedLinkResponse,
    type InvoiceListEventsResponse as InvoiceListEventsResponse,
    type InvoicesDefaultPageNumberPagination as InvoicesDefaultPageNumberPagination,
    type InvoiceListParams as InvoiceListParams,
    type InvoiceCreateParams as InvoiceCreateParams,
    type InvoiceUpdateParams as InvoiceUpdateParams,
    type InvoiceDeleteParams as InvoiceDeleteParams,
    type InvoicePreviewParams as InvoicePreviewParams,
    type InvoicePreviewExistingParams as InvoicePreviewExistingParams,
    type InvoiceFinalizeParams as InvoiceFinalizeParams,
    type InvoiceSendParams as InvoiceSendParams,
    type InvoiceVoidParams as InvoiceVoidParams,
    type InvoiceRetryParams as InvoiceRetryParams,
    type InvoiceMarkUncollectableParams as InvoiceMarkUncollectableParams,
    type InvoiceAddNoteParams as InvoiceAddNoteParams,
    type InvoiceUpdateDunningParams as InvoiceUpdateDunningParams,
  };

  export {
    Payments as Payments,
    type PaymentRetrieveParams as PaymentRetrieveParams,
    type PaymentRetrieveRefundParams as PaymentRetrieveRefundParams,
    type PaymentRetrievePayoutParams as PaymentRetrievePayoutParams,
  };
}
