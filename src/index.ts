// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { type Agent } from './_shims/index';
import * as Core from './core';
import * as Errors from './error';
import * as Pagination from './pagination';
import { type DefaultPageNumberPaginationParams, DefaultPageNumberPaginationResponse } from './pagination';
import * as Uploads from './uploads';
import * as API from './resources/index';
import {
  Customer,
  CustomerCreateParams,
  CustomerListParams,
  CustomerUpdateParams,
  Customers,
  CustomersDefaultPageNumberPagination,
} from './resources/customers';
import {
  Discount,
  DiscountCreateParams,
  DiscountListParams,
  DiscountUpdateParams,
  Discounts,
  DiscountsDefaultPageNumberPagination,
} from './resources/discounts';
import {
  Dispute,
  DisputeListParams,
  Disputes,
  DisputesDefaultPageNumberPagination,
} from './resources/disputes';
import {
  LicenseKeyInstance,
  LicenseKeyInstanceListParams,
  LicenseKeyInstanceListResponse,
  LicenseKeyInstanceUpdateParams,
  LicenseKeyInstances,
} from './resources/license-key-instances';
import {
  LicenseKey,
  LicenseKeyListParams,
  LicenseKeyListResponse,
  LicenseKeyUpdateParams,
  LicenseKeys,
} from './resources/license-keys';
import {
  LicenseActivateParams,
  LicenseDeactivateParams,
  LicenseValidateParams,
  LicenseValidateResponse,
  Licenses,
} from './resources/licenses';
import {
  Payment,
  PaymentCreateParams,
  PaymentCreateResponse,
  PaymentListParams,
  PaymentListResponse,
  PaymentListResponsesDefaultPageNumberPagination,
  Payments,
} from './resources/payments';
import {
  PayoutListParams,
  PayoutListResponse,
  PayoutListResponsesDefaultPageNumberPagination,
  Payouts,
} from './resources/payouts';
import {
  Refund,
  RefundCreateParams,
  RefundListParams,
  Refunds,
  RefundsDefaultPageNumberPagination,
} from './resources/refunds';
import {
  Subscription,
  SubscriptionCreateParams,
  SubscriptionCreateResponse,
  SubscriptionListParams,
  SubscriptionUpdateParams,
  Subscriptions,
  SubscriptionsDefaultPageNumberPagination,
} from './resources/subscriptions';
import {
  WebhookEvent,
  WebhookEventListParams,
  WebhookEvents,
  WebhookEventsDefaultPageNumberPagination,
} from './resources/webhook-events';
import { Invoices } from './resources/invoices/invoices';
import { Misc } from './resources/misc/misc';
import {
  Product,
  ProductCreateParams,
  ProductListParams,
  ProductListResponse,
  ProductListResponsesDefaultPageNumberPagination,
  ProductUpdateParams,
  Products,
} from './resources/products/products';

const environments = {
  live_mode: 'https://live.dodopayments.com',
  test_mode: 'https://test.dodopayments.com',
};
type Environment = keyof typeof environments;

export interface ClientOptions {
  /**
   * Bearer Token for API authentication
   */
  bearerToken?: string | undefined;

  /**
   * Specifies the environment to use for the API.
   *
   * Each environment maps to a different base URL:
   * - `live_mode` corresponds to `https://live.dodopayments.com`
   * - `test_mode` corresponds to `https://test.dodopayments.com`
   */
  environment?: Environment | undefined;

  /**
   * Override the default base URL for the API, e.g., "https://api.example.com/v2/"
   *
   * Defaults to process.env['DODO_PAYMENTS_BASE_URL'].
   */
  baseURL?: string | null | undefined;

  /**
   * The maximum amount of time (in milliseconds) that the client should wait for a response
   * from the server before timing out a single request.
   *
   * Note that request timeouts are retried by default, so in a worst-case scenario you may wait
   * much longer than this timeout before the promise succeeds or fails.
   */
  timeout?: number | undefined;

  /**
   * An HTTP agent used to manage HTTP(S) connections.
   *
   * If not provided, an agent will be constructed by default in the Node.js environment,
   * otherwise no agent is used.
   */
  httpAgent?: Agent | undefined;

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
  maxRetries?: number | undefined;

  /**
   * Default headers to include with every request to the API.
   *
   * These can be removed in individual requests by explicitly setting the
   * header to `undefined` or `null` in request options.
   */
  defaultHeaders?: Core.Headers | undefined;

  /**
   * Default query parameters to include with every request to the API.
   *
   * These can be removed in individual requests by explicitly setting the
   * param to `undefined` in request options.
   */
  defaultQuery?: Core.DefaultQuery | undefined;
}

/**
 * API Client for interfacing with the Dodo Payments API.
 */
export class DodoPayments extends Core.APIClient {
  bearerToken: string;

  private _options: ClientOptions;

  /**
   * API Client for interfacing with the Dodo Payments API.
   *
   * @param {string | undefined} [opts.bearerToken=process.env['DODO_PAYMENTS_API_KEY'] ?? undefined]
   * @param {Environment} [opts.environment=live_mode] - Specifies the environment URL to use for the API.
   * @param {string} [opts.baseURL=process.env['DODO_PAYMENTS_BASE_URL'] ?? https://live.dodopayments.com] - Override the default base URL for the API.
   * @param {number} [opts.timeout=1 minute] - The maximum amount of time (in milliseconds) the client will wait for a response before timing out.
   * @param {number} [opts.httpAgent] - An HTTP agent used to manage HTTP(s) connections.
   * @param {Core.Fetch} [opts.fetch] - Specify a custom `fetch` function implementation.
   * @param {number} [opts.maxRetries=2] - The maximum number of times the client will retry a request.
   * @param {Core.Headers} opts.defaultHeaders - Default headers to include with every request to the API.
   * @param {Core.DefaultQuery} opts.defaultQuery - Default query parameters to include with every request to the API.
   */
  constructor({
    baseURL = Core.readEnv('DODO_PAYMENTS_BASE_URL'),
    bearerToken = Core.readEnv('DODO_PAYMENTS_API_KEY'),
    ...opts
  }: ClientOptions = {}) {
    if (bearerToken === undefined) {
      throw new Errors.DodoPaymentsError(
        "The DODO_PAYMENTS_API_KEY environment variable is missing or empty; either provide it, or instantiate the DodoPayments client with an bearerToken option, like new DodoPayments({ bearerToken: 'My Bearer Token' }).",
      );
    }

    const options: ClientOptions = {
      bearerToken,
      ...opts,
      baseURL,
      environment: opts.environment ?? 'live_mode',
    };

    if (baseURL && opts.environment) {
      throw new Errors.DodoPaymentsError(
        'Ambiguous URL; The `baseURL` option (or DODO_PAYMENTS_BASE_URL env var) and the `environment` option are given. If you want to use the environment you must pass baseURL: null',
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

    this.bearerToken = bearerToken;
  }

  payments: API.Payments = new API.Payments(this);
  subscriptions: API.Subscriptions = new API.Subscriptions(this);
  invoices: API.Invoices = new API.Invoices(this);
  licenses: API.Licenses = new API.Licenses(this);
  licenseKeys: API.LicenseKeys = new API.LicenseKeys(this);
  licenseKeyInstances: API.LicenseKeyInstances = new API.LicenseKeyInstances(this);
  customers: API.Customers = new API.Customers(this);
  refunds: API.Refunds = new API.Refunds(this);
  disputes: API.Disputes = new API.Disputes(this);
  payouts: API.Payouts = new API.Payouts(this);
  webhookEvents: API.WebhookEvents = new API.WebhookEvents(this);
  products: API.Products = new API.Products(this);
  misc: API.Misc = new API.Misc(this);
  discounts: API.Discounts = new API.Discounts(this);

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
    return { Authorization: `Bearer ${this.bearerToken}` };
  }

  static DodoPayments = this;
  static DEFAULT_TIMEOUT = 60000; // 1 minute

  static DodoPaymentsError = Errors.DodoPaymentsError;
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

DodoPayments.Payments = Payments;
DodoPayments.PaymentListResponsesDefaultPageNumberPagination =
  PaymentListResponsesDefaultPageNumberPagination;
DodoPayments.Subscriptions = Subscriptions;
DodoPayments.SubscriptionsDefaultPageNumberPagination = SubscriptionsDefaultPageNumberPagination;
DodoPayments.Invoices = Invoices;
DodoPayments.Licenses = Licenses;
DodoPayments.LicenseKeys = LicenseKeys;
DodoPayments.LicenseKeyInstances = LicenseKeyInstances;
DodoPayments.Customers = Customers;
DodoPayments.CustomersDefaultPageNumberPagination = CustomersDefaultPageNumberPagination;
DodoPayments.Refunds = Refunds;
DodoPayments.RefundsDefaultPageNumberPagination = RefundsDefaultPageNumberPagination;
DodoPayments.Disputes = Disputes;
DodoPayments.DisputesDefaultPageNumberPagination = DisputesDefaultPageNumberPagination;
DodoPayments.Payouts = Payouts;
DodoPayments.PayoutListResponsesDefaultPageNumberPagination = PayoutListResponsesDefaultPageNumberPagination;
DodoPayments.WebhookEvents = WebhookEvents;
DodoPayments.WebhookEventsDefaultPageNumberPagination = WebhookEventsDefaultPageNumberPagination;
DodoPayments.Products = Products;
DodoPayments.ProductListResponsesDefaultPageNumberPagination =
  ProductListResponsesDefaultPageNumberPagination;
DodoPayments.Misc = Misc;
DodoPayments.Discounts = Discounts;
DodoPayments.DiscountsDefaultPageNumberPagination = DiscountsDefaultPageNumberPagination;
export declare namespace DodoPayments {
  export type RequestOptions = Core.RequestOptions;

  export import DefaultPageNumberPagination = Pagination.DefaultPageNumberPagination;
  export {
    type DefaultPageNumberPaginationParams as DefaultPageNumberPaginationParams,
    type DefaultPageNumberPaginationResponse as DefaultPageNumberPaginationResponse,
  };

  export {
    Payments as Payments,
    type Payment as Payment,
    type PaymentCreateResponse as PaymentCreateResponse,
    type PaymentListResponse as PaymentListResponse,
    PaymentListResponsesDefaultPageNumberPagination as PaymentListResponsesDefaultPageNumberPagination,
    type PaymentCreateParams as PaymentCreateParams,
    type PaymentListParams as PaymentListParams,
  };

  export {
    Subscriptions as Subscriptions,
    type Subscription as Subscription,
    type SubscriptionCreateResponse as SubscriptionCreateResponse,
    SubscriptionsDefaultPageNumberPagination as SubscriptionsDefaultPageNumberPagination,
    type SubscriptionCreateParams as SubscriptionCreateParams,
    type SubscriptionUpdateParams as SubscriptionUpdateParams,
    type SubscriptionListParams as SubscriptionListParams,
  };

  export { Invoices as Invoices };

  export {
    Licenses as Licenses,
    type LicenseValidateResponse as LicenseValidateResponse,
    type LicenseActivateParams as LicenseActivateParams,
    type LicenseDeactivateParams as LicenseDeactivateParams,
    type LicenseValidateParams as LicenseValidateParams,
  };

  export {
    LicenseKeys as LicenseKeys,
    type LicenseKey as LicenseKey,
    type LicenseKeyListResponse as LicenseKeyListResponse,
    type LicenseKeyUpdateParams as LicenseKeyUpdateParams,
    type LicenseKeyListParams as LicenseKeyListParams,
  };

  export {
    LicenseKeyInstances as LicenseKeyInstances,
    type LicenseKeyInstance as LicenseKeyInstance,
    type LicenseKeyInstanceListResponse as LicenseKeyInstanceListResponse,
    type LicenseKeyInstanceUpdateParams as LicenseKeyInstanceUpdateParams,
    type LicenseKeyInstanceListParams as LicenseKeyInstanceListParams,
  };

  export {
    Customers as Customers,
    type Customer as Customer,
    CustomersDefaultPageNumberPagination as CustomersDefaultPageNumberPagination,
    type CustomerCreateParams as CustomerCreateParams,
    type CustomerUpdateParams as CustomerUpdateParams,
    type CustomerListParams as CustomerListParams,
  };

  export {
    Refunds as Refunds,
    type Refund as Refund,
    RefundsDefaultPageNumberPagination as RefundsDefaultPageNumberPagination,
    type RefundCreateParams as RefundCreateParams,
    type RefundListParams as RefundListParams,
  };

  export {
    Disputes as Disputes,
    type Dispute as Dispute,
    DisputesDefaultPageNumberPagination as DisputesDefaultPageNumberPagination,
    type DisputeListParams as DisputeListParams,
  };

  export {
    Payouts as Payouts,
    type PayoutListResponse as PayoutListResponse,
    PayoutListResponsesDefaultPageNumberPagination as PayoutListResponsesDefaultPageNumberPagination,
    type PayoutListParams as PayoutListParams,
  };

  export {
    WebhookEvents as WebhookEvents,
    type WebhookEvent as WebhookEvent,
    WebhookEventsDefaultPageNumberPagination as WebhookEventsDefaultPageNumberPagination,
    type WebhookEventListParams as WebhookEventListParams,
  };

  export {
    Products as Products,
    type Product as Product,
    type ProductListResponse as ProductListResponse,
    ProductListResponsesDefaultPageNumberPagination as ProductListResponsesDefaultPageNumberPagination,
    type ProductCreateParams as ProductCreateParams,
    type ProductUpdateParams as ProductUpdateParams,
    type ProductListParams as ProductListParams,
  };

  export { Misc as Misc };

  export {
    Discounts as Discounts,
    type Discount as Discount,
    DiscountsDefaultPageNumberPagination as DiscountsDefaultPageNumberPagination,
    type DiscountCreateParams as DiscountCreateParams,
    type DiscountUpdateParams as DiscountUpdateParams,
    type DiscountListParams as DiscountListParams,
  };
}

export { toFile, fileFromPath } from './uploads';
export {
  DodoPaymentsError,
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

export default DodoPayments;
