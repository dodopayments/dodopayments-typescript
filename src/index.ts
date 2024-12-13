// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { type Agent } from './_shims/index';
import * as Core from './core';
import * as Errors from './error';
import * as Pagination from './pagination';
import { type PageNumberPageParams, PageNumberPageResponse } from './pagination';
import * as Uploads from './uploads';
import * as API from './resources/index';
import { Customer, CustomerListParams, CustomerListResponse, Customers } from './resources/customers';
import { Dispute, DisputeListParams, DisputeListResponse, Disputes } from './resources/disputes';
import {
  Payment,
  PaymentCreateParams,
  PaymentCreateResponse,
  PaymentListParams,
  PaymentListResponse,
  Payments,
} from './resources/payments';
import { PayoutListParams, PayoutListResponse, Payouts } from './resources/payouts';
import {
  Refund,
  RefundCreateParams,
  RefundListParams,
  RefundListResponse,
  Refunds,
} from './resources/refunds';
import {
  Subscription,
  SubscriptionCreateParams,
  SubscriptionCreateResponse,
  SubscriptionListParams,
  SubscriptionListResponse,
  SubscriptionUpdateParams,
  Subscriptions,
} from './resources/subscriptions';
import {
  WebhookEventListParams,
  WebhookEventListResponse,
  WebhookEventLog,
  WebhookEvents,
} from './resources/webhook-events';
import { Checkout } from './resources/checkout/checkout';
import {
  Product,
  ProductCreateParams,
  ProductCreateResponse,
  ProductListParams,
  ProductListResponse,
  ProductUpdateParams,
  Products,
} from './resources/products/products';

const environments = {
  live_mode: 'https://live.dodopayments.com/',
  test_mode: 'https://test.dodopayments.com/',
};
type Environment = keyof typeof environments;
export interface ClientOptions {
  /**
   * API Key to Access Dodo Payments APIs
   */
  apiKey?: string | undefined;

  /**
   * Specifies the environment to use for the API.
   *
   * Each environment maps to a different base URL:
   * - `live_mode` corresponds to `https://live.dodopayments.com/`
   * - `test_mode` corresponds to `https://test.dodopayments.com/`
   */
  environment?: Environment;

  /**
   * Override the default base URL for the API, e.g., "https://api.example.com/v2/"
   *
   * Defaults to process.env['DODOPAYMENTS_BASE_URL'].
   */
  baseURL?: string | null | undefined;

  /**
   * The maximum amount of time (in milliseconds) that the client should wait for a response
   * from the server before timing out a single request.
   *
   * Note that request timeouts are retried by default, so in a worst-case scenario you may wait
   * much longer than this timeout before the promise succeeds or fails.
   */
  timeout?: number;

  /**
   * An HTTP agent used to manage HTTP(S) connections.
   *
   * If not provided, an agent will be constructed by default in the Node.js environment,
   * otherwise no agent is used.
   */
  httpAgent?: Agent;

  /**
   * Specify a custom `fetch` function implementation.
   *
   * If not provided, we use `node-fetch` on Node.js and otherwise expect that `fetch` is
   * defined globally.
   */
  fetch?: Core.Fetch | undefined;

  /**
   * The maximum number of times that the client will retry a request in case of a
   * temporary failure, like a network error or a 5XX error from the server.
   *
   * @default 2
   */
  maxRetries?: number;

  /**
   * Default headers to include with every request to the API.
   *
   * These can be removed in individual requests by explicitly setting the
   * header to `undefined` or `null` in request options.
   */
  defaultHeaders?: Core.Headers;

  /**
   * Default query parameters to include with every request to the API.
   *
   * These can be removed in individual requests by explicitly setting the
   * param to `undefined` in request options.
   */
  defaultQuery?: Core.DefaultQuery;
}

/**
 * API Client for interfacing with the Dodopayments API.
 */
export class Dodopayments extends Core.APIClient {
  apiKey: string;

  private _options: ClientOptions;

  /**
   * API Client for interfacing with the Dodopayments API.
   *
   * @param {string | undefined} [opts.apiKey=process.env['DODO_PAYMENTS_API_KEY'] ?? undefined]
   * @param {Environment} [opts.environment=live_mode] - Specifies the environment URL to use for the API.
   * @param {string} [opts.baseURL=process.env['DODOPAYMENTS_BASE_URL'] ?? https://live.dodopayments.com/] - Override the default base URL for the API.
   * @param {number} [opts.timeout=1 minute] - The maximum amount of time (in milliseconds) the client will wait for a response before timing out.
   * @param {number} [opts.httpAgent] - An HTTP agent used to manage HTTP(s) connections.
   * @param {Core.Fetch} [opts.fetch] - Specify a custom `fetch` function implementation.
   * @param {number} [opts.maxRetries=2] - The maximum number of times the client will retry a request.
   * @param {Core.Headers} opts.defaultHeaders - Default headers to include with every request to the API.
   * @param {Core.DefaultQuery} opts.defaultQuery - Default query parameters to include with every request to the API.
   */
  constructor({
    baseURL = Core.readEnv('DODOPAYMENTS_BASE_URL'),
    apiKey = Core.readEnv('DODO_PAYMENTS_API_KEY'),
    ...opts
  }: ClientOptions = {}) {
    if (apiKey === undefined) {
      throw new Errors.DodopaymentsError(
        "The DODO_PAYMENTS_API_KEY environment variable is missing or empty; either provide it, or instantiate the Dodopayments client with an apiKey option, like new Dodopayments({ apiKey: 'My API Key' }).",
      );
    }

    const options: ClientOptions = {
      apiKey,
      ...opts,
      baseURL,
      environment: opts.environment ?? 'live_mode',
    };

    if (baseURL && opts.environment) {
      throw new Errors.DodopaymentsError(
        'Ambiguous URL; The `baseURL` option (or DODOPAYMENTS_BASE_URL env var) and the `environment` option are given. If you want to use the environment you must pass baseURL: null',
      );
    }

    super({
      baseURL: options.baseURL || environments[options.environment || 'live_mode'],
      timeout: options.timeout ?? 60000 /* 1 minute */,
      httpAgent: options.httpAgent,
      maxRetries: options.maxRetries,
      fetch: options.fetch,
    });

    this._options = options;

    this.apiKey = apiKey;
  }

  checkout: API.Checkout = new API.Checkout(this);
  customers: API.Customers = new API.Customers(this);
  disputes: API.Disputes = new API.Disputes(this);
  payments: API.Payments = new API.Payments(this);
  payouts: API.Payouts = new API.Payouts(this);
  products: API.Products = new API.Products(this);
  refunds: API.Refunds = new API.Refunds(this);
  subscriptions: API.Subscriptions = new API.Subscriptions(this);
  webhookEvents: API.WebhookEvents = new API.WebhookEvents(this);

  protected override defaultQuery(): Core.DefaultQuery | undefined {
    return this._options.defaultQuery;
  }

  protected override defaultHeaders(opts: Core.FinalRequestOptions): Core.Headers {
    return {
      ...super.defaultHeaders(opts),
      ...this._options.defaultHeaders,
    };
  }

  protected override authHeaders(opts: Core.FinalRequestOptions): Core.Headers {
    return { Authorization: `Bearer ${this.apiKey}` };
  }

  static Dodopayments = this;
  static DEFAULT_TIMEOUT = 60000; // 1 minute

  static DodopaymentsError = Errors.DodopaymentsError;
  static APIError = Errors.APIError;
  static APIConnectionError = Errors.APIConnectionError;
  static APIConnectionTimeoutError = Errors.APIConnectionTimeoutError;
  static APIUserAbortError = Errors.APIUserAbortError;
  static NotFoundError = Errors.NotFoundError;
  static ConflictError = Errors.ConflictError;
  static RateLimitError = Errors.RateLimitError;
  static BadRequestError = Errors.BadRequestError;
  static AuthenticationError = Errors.AuthenticationError;
  static InternalServerError = Errors.InternalServerError;
  static PermissionDeniedError = Errors.PermissionDeniedError;
  static UnprocessableEntityError = Errors.UnprocessableEntityError;

  static toFile = Uploads.toFile;
  static fileFromPath = Uploads.fileFromPath;
}

Dodopayments.Checkout = Checkout;
Dodopayments.Customers = Customers;
Dodopayments.Disputes = Disputes;
Dodopayments.Payments = Payments;
Dodopayments.Payouts = Payouts;
Dodopayments.Products = Products;
Dodopayments.Refunds = Refunds;
Dodopayments.Subscriptions = Subscriptions;
Dodopayments.WebhookEvents = WebhookEvents;
export declare namespace Dodopayments {
  export type RequestOptions = Core.RequestOptions;

  export import PageNumberPage = Pagination.PageNumberPage;
  export {
    type PageNumberPageParams as PageNumberPageParams,
    type PageNumberPageResponse as PageNumberPageResponse,
  };

  export { Checkout as Checkout };

  export {
    Customers as Customers,
    type Customer as Customer,
    type CustomerListResponse as CustomerListResponse,
    type CustomerListParams as CustomerListParams,
  };

  export {
    Disputes as Disputes,
    type Dispute as Dispute,
    type DisputeListResponse as DisputeListResponse,
    type DisputeListParams as DisputeListParams,
  };

  export {
    Payments as Payments,
    type Payment as Payment,
    type PaymentCreateResponse as PaymentCreateResponse,
    type PaymentListResponse as PaymentListResponse,
    type PaymentCreateParams as PaymentCreateParams,
    type PaymentListParams as PaymentListParams,
  };

  export {
    Payouts as Payouts,
    type PayoutListResponse as PayoutListResponse,
    type PayoutListParams as PayoutListParams,
  };

  export {
    Products as Products,
    type Product as Product,
    type ProductCreateResponse as ProductCreateResponse,
    type ProductListResponse as ProductListResponse,
    type ProductCreateParams as ProductCreateParams,
    type ProductUpdateParams as ProductUpdateParams,
    type ProductListParams as ProductListParams,
  };

  export {
    Refunds as Refunds,
    type Refund as Refund,
    type RefundListResponse as RefundListResponse,
    type RefundCreateParams as RefundCreateParams,
    type RefundListParams as RefundListParams,
  };

  export {
    Subscriptions as Subscriptions,
    type Subscription as Subscription,
    type SubscriptionCreateResponse as SubscriptionCreateResponse,
    type SubscriptionListResponse as SubscriptionListResponse,
    type SubscriptionCreateParams as SubscriptionCreateParams,
    type SubscriptionUpdateParams as SubscriptionUpdateParams,
    type SubscriptionListParams as SubscriptionListParams,
  };

  export {
    WebhookEvents as WebhookEvents,
    type WebhookEventLog as WebhookEventLog,
    type WebhookEventListResponse as WebhookEventListResponse,
    type WebhookEventListParams as WebhookEventListParams,
  };
}

export { toFile, fileFromPath } from './uploads';
export {
  DodopaymentsError,
  APIError,
  APIConnectionError,
  APIConnectionTimeoutError,
  APIUserAbortError,
  NotFoundError,
  ConflictError,
  RateLimitError,
  BadRequestError,
  AuthenticationError,
  InternalServerError,
  PermissionDeniedError,
  UnprocessableEntityError,
} from './error';

export default Dodopayments;
