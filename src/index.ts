// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { type Agent } from './_shims/index';
import * as Core from './core';
import * as Errors from './error';
import * as Pagination from './pagination';
import {
  type CursorPagePaginationParams,
  CursorPagePaginationResponse,
  type DefaultPageNumberPaginationParams,
  DefaultPageNumberPaginationResponse,
} from './pagination';
import * as Uploads from './uploads';
import * as API from './resources/index';
import {
  AddonCreateParams,
  AddonListParams,
  AddonResponse,
  AddonResponsesDefaultPageNumberPagination,
  AddonUpdateImagesResponse,
  AddonUpdateParams,
  Addons,
} from './resources/addons';
import {
  Brand,
  BrandCreateParams,
  BrandListResponse,
  BrandUpdateImagesResponse,
  BrandUpdateParams,
  Brands,
} from './resources/brands';
import {
  Discount,
  DiscountCreateParams,
  DiscountListParams,
  DiscountType,
  DiscountUpdateParams,
  Discounts,
  DiscountsDefaultPageNumberPagination,
} from './resources/discounts';
import {
  Dispute,
  DisputeListParams,
  DisputeListResponse,
  DisputeListResponsesDefaultPageNumberPagination,
  DisputeStage,
  DisputeStatus,
  Disputes,
  GetDispute,
} from './resources/disputes';
import {
  LicenseKeyInstance,
  LicenseKeyInstanceListParams,
  LicenseKeyInstanceUpdateParams,
  LicenseKeyInstances,
  LicenseKeyInstancesDefaultPageNumberPagination,
} from './resources/license-key-instances';
import {
  LicenseKey,
  LicenseKeyListParams,
  LicenseKeyStatus,
  LicenseKeyUpdateParams,
  LicenseKeys,
  LicenseKeysDefaultPageNumberPagination,
} from './resources/license-keys';
import {
  LicenseActivateParams,
  LicenseDeactivateParams,
  LicenseValidateParams,
  LicenseValidateResponse,
  Licenses,
} from './resources/licenses';
import {
  CountryCode,
  Currency,
  Misc,
  MiscListSupportedCountriesResponse,
  TaxCategory,
} from './resources/misc';
import {
  AttachExistingCustomer,
  BillingAddress,
  CreateNewCustomer,
  CustomerLimitedDetails,
  CustomerRequest,
  IntentStatus,
  NewCustomer,
  OneTimeProductCartItem,
  Payment,
  PaymentCreateParams,
  PaymentCreateResponse,
  PaymentListParams,
  PaymentListResponse,
  PaymentListResponsesDefaultPageNumberPagination,
  PaymentMethodTypes,
  PaymentRetrieveLineItemsResponse,
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
  RefundStatus,
  Refunds,
  RefundsDefaultPageNumberPagination,
} from './resources/refunds';
import {
  AddonCartResponseItem,
  AttachAddon,
  Subscription,
  SubscriptionChangePlanParams,
  SubscriptionChargeParams,
  SubscriptionChargeResponse,
  SubscriptionCreateParams,
  SubscriptionCreateResponse,
  SubscriptionListParams,
  SubscriptionListResponse,
  SubscriptionListResponsesDefaultPageNumberPagination,
  SubscriptionStatus,
  SubscriptionUpdateParams,
  Subscriptions,
  TimeInterval,
} from './resources/subscriptions';
import { WebhookEventType, WebhookEvents, WebhookPayload } from './resources/webhook-events';
import { YourWebhookURL, YourWebhookURLCreateParams } from './resources/your-webhook-url';
import {
  Customer,
  CustomerCreateParams,
  CustomerListParams,
  CustomerPortalSession,
  CustomerUpdateParams,
  Customers,
  CustomersDefaultPageNumberPagination,
} from './resources/customers/customers';
import { Invoices } from './resources/invoices/invoices';
import {
  LicenseKeyDuration,
  Price,
  Product,
  ProductCreateParams,
  ProductListParams,
  ProductListResponse,
  ProductListResponsesDefaultPageNumberPagination,
  ProductUpdateFilesParams,
  ProductUpdateFilesResponse,
  ProductUpdateParams,
  Products,
} from './resources/products/products';
import {
  WebhookCreateParams,
  WebhookCreateResponse,
  WebhookListParams,
  WebhookListResponse,
  WebhookListResponsesCursorPagePagination,
  WebhookRetrieveResponse,
  WebhookRetrieveSecretResponse,
  WebhookUpdateParams,
  WebhookUpdateResponse,
  Webhooks,
} from './resources/webhooks/webhooks';

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
   *
   * @unit milliseconds
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
      baseURLOverridden: baseURL ? baseURL !== environments[options.environment || 'live_mode'] : false,
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
  addons: API.Addons = new API.Addons(this);
  brands: API.Brands = new API.Brands(this);
  webhooks: API.Webhooks = new API.Webhooks(this);
  yourWebhookURL: API.YourWebhookURL = new API.YourWebhookURL(this);

  /**
   * Check whether the base URL is set to its default.
   */
  #baseURLOverridden(): boolean {
    return this.baseURL !== environments[this._options.environment || 'live_mode'];
  }

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
DodoPayments.SubscriptionListResponsesDefaultPageNumberPagination =
  SubscriptionListResponsesDefaultPageNumberPagination;
DodoPayments.Invoices = Invoices;
DodoPayments.Licenses = Licenses;
DodoPayments.LicenseKeys = LicenseKeys;
DodoPayments.LicenseKeysDefaultPageNumberPagination = LicenseKeysDefaultPageNumberPagination;
DodoPayments.LicenseKeyInstances = LicenseKeyInstances;
DodoPayments.LicenseKeyInstancesDefaultPageNumberPagination = LicenseKeyInstancesDefaultPageNumberPagination;
DodoPayments.Customers = Customers;
DodoPayments.CustomersDefaultPageNumberPagination = CustomersDefaultPageNumberPagination;
DodoPayments.Refunds = Refunds;
DodoPayments.RefundsDefaultPageNumberPagination = RefundsDefaultPageNumberPagination;
DodoPayments.Disputes = Disputes;
DodoPayments.DisputeListResponsesDefaultPageNumberPagination =
  DisputeListResponsesDefaultPageNumberPagination;
DodoPayments.Payouts = Payouts;
DodoPayments.PayoutListResponsesDefaultPageNumberPagination = PayoutListResponsesDefaultPageNumberPagination;
DodoPayments.WebhookEvents = WebhookEvents;
DodoPayments.Products = Products;
DodoPayments.ProductListResponsesDefaultPageNumberPagination =
  ProductListResponsesDefaultPageNumberPagination;
DodoPayments.Misc = Misc;
DodoPayments.Discounts = Discounts;
DodoPayments.DiscountsDefaultPageNumberPagination = DiscountsDefaultPageNumberPagination;
DodoPayments.Addons = Addons;
DodoPayments.AddonResponsesDefaultPageNumberPagination = AddonResponsesDefaultPageNumberPagination;
DodoPayments.Brands = Brands;
DodoPayments.Webhooks = Webhooks;
DodoPayments.WebhookListResponsesCursorPagePagination = WebhookListResponsesCursorPagePagination;
DodoPayments.YourWebhookURL = YourWebhookURL;
export declare namespace DodoPayments {
  export type RequestOptions = Core.RequestOptions;

  export import DefaultPageNumberPagination = Pagination.DefaultPageNumberPagination;
  export {
    type DefaultPageNumberPaginationParams as DefaultPageNumberPaginationParams,
    type DefaultPageNumberPaginationResponse as DefaultPageNumberPaginationResponse,
  };

  export import CursorPagePagination = Pagination.CursorPagePagination;
  export {
    type CursorPagePaginationParams as CursorPagePaginationParams,
    type CursorPagePaginationResponse as CursorPagePaginationResponse,
  };

  export {
    Payments as Payments,
    type AttachExistingCustomer as AttachExistingCustomer,
    type BillingAddress as BillingAddress,
    type CreateNewCustomer as CreateNewCustomer,
    type CustomerLimitedDetails as CustomerLimitedDetails,
    type CustomerRequest as CustomerRequest,
    type IntentStatus as IntentStatus,
    type NewCustomer as NewCustomer,
    type OneTimeProductCartItem as OneTimeProductCartItem,
    type Payment as Payment,
    type PaymentMethodTypes as PaymentMethodTypes,
    type PaymentCreateResponse as PaymentCreateResponse,
    type PaymentListResponse as PaymentListResponse,
    type PaymentRetrieveLineItemsResponse as PaymentRetrieveLineItemsResponse,
    PaymentListResponsesDefaultPageNumberPagination as PaymentListResponsesDefaultPageNumberPagination,
    type PaymentCreateParams as PaymentCreateParams,
    type PaymentListParams as PaymentListParams,
  };

  export {
    Subscriptions as Subscriptions,
    type AddonCartResponseItem as AddonCartResponseItem,
    type AttachAddon as AttachAddon,
    type Subscription as Subscription,
    type SubscriptionStatus as SubscriptionStatus,
    type TimeInterval as TimeInterval,
    type SubscriptionCreateResponse as SubscriptionCreateResponse,
    type SubscriptionListResponse as SubscriptionListResponse,
    type SubscriptionChargeResponse as SubscriptionChargeResponse,
    SubscriptionListResponsesDefaultPageNumberPagination as SubscriptionListResponsesDefaultPageNumberPagination,
    type SubscriptionCreateParams as SubscriptionCreateParams,
    type SubscriptionUpdateParams as SubscriptionUpdateParams,
    type SubscriptionListParams as SubscriptionListParams,
    type SubscriptionChangePlanParams as SubscriptionChangePlanParams,
    type SubscriptionChargeParams as SubscriptionChargeParams,
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
    type LicenseKeyStatus as LicenseKeyStatus,
    LicenseKeysDefaultPageNumberPagination as LicenseKeysDefaultPageNumberPagination,
    type LicenseKeyUpdateParams as LicenseKeyUpdateParams,
    type LicenseKeyListParams as LicenseKeyListParams,
  };

  export {
    LicenseKeyInstances as LicenseKeyInstances,
    type LicenseKeyInstance as LicenseKeyInstance,
    LicenseKeyInstancesDefaultPageNumberPagination as LicenseKeyInstancesDefaultPageNumberPagination,
    type LicenseKeyInstanceUpdateParams as LicenseKeyInstanceUpdateParams,
    type LicenseKeyInstanceListParams as LicenseKeyInstanceListParams,
  };

  export {
    Customers as Customers,
    type Customer as Customer,
    type CustomerPortalSession as CustomerPortalSession,
    CustomersDefaultPageNumberPagination as CustomersDefaultPageNumberPagination,
    type CustomerCreateParams as CustomerCreateParams,
    type CustomerUpdateParams as CustomerUpdateParams,
    type CustomerListParams as CustomerListParams,
  };

  export {
    Refunds as Refunds,
    type Refund as Refund,
    type RefundStatus as RefundStatus,
    RefundsDefaultPageNumberPagination as RefundsDefaultPageNumberPagination,
    type RefundCreateParams as RefundCreateParams,
    type RefundListParams as RefundListParams,
  };

  export {
    Disputes as Disputes,
    type Dispute as Dispute,
    type DisputeStage as DisputeStage,
    type DisputeStatus as DisputeStatus,
    type GetDispute as GetDispute,
    type DisputeListResponse as DisputeListResponse,
    DisputeListResponsesDefaultPageNumberPagination as DisputeListResponsesDefaultPageNumberPagination,
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
    type WebhookEventType as WebhookEventType,
    type WebhookPayload as WebhookPayload,
  };

  export {
    Products as Products,
    type LicenseKeyDuration as LicenseKeyDuration,
    type Price as Price,
    type Product as Product,
    type ProductListResponse as ProductListResponse,
    type ProductUpdateFilesResponse as ProductUpdateFilesResponse,
    ProductListResponsesDefaultPageNumberPagination as ProductListResponsesDefaultPageNumberPagination,
    type ProductCreateParams as ProductCreateParams,
    type ProductUpdateParams as ProductUpdateParams,
    type ProductListParams as ProductListParams,
    type ProductUpdateFilesParams as ProductUpdateFilesParams,
  };

  export {
    Misc as Misc,
    type CountryCode as CountryCode,
    type Currency as Currency,
    type TaxCategory as TaxCategory,
    type MiscListSupportedCountriesResponse as MiscListSupportedCountriesResponse,
  };

  export {
    Discounts as Discounts,
    type Discount as Discount,
    type DiscountType as DiscountType,
    DiscountsDefaultPageNumberPagination as DiscountsDefaultPageNumberPagination,
    type DiscountCreateParams as DiscountCreateParams,
    type DiscountUpdateParams as DiscountUpdateParams,
    type DiscountListParams as DiscountListParams,
  };

  export {
    Addons as Addons,
    type AddonResponse as AddonResponse,
    type AddonUpdateImagesResponse as AddonUpdateImagesResponse,
    AddonResponsesDefaultPageNumberPagination as AddonResponsesDefaultPageNumberPagination,
    type AddonCreateParams as AddonCreateParams,
    type AddonUpdateParams as AddonUpdateParams,
    type AddonListParams as AddonListParams,
  };

  export {
    Brands as Brands,
    type Brand as Brand,
    type BrandListResponse as BrandListResponse,
    type BrandUpdateImagesResponse as BrandUpdateImagesResponse,
    type BrandCreateParams as BrandCreateParams,
    type BrandUpdateParams as BrandUpdateParams,
  };

  export {
    Webhooks as Webhooks,
    type WebhookCreateResponse as WebhookCreateResponse,
    type WebhookRetrieveResponse as WebhookRetrieveResponse,
    type WebhookUpdateResponse as WebhookUpdateResponse,
    type WebhookListResponse as WebhookListResponse,
    type WebhookRetrieveSecretResponse as WebhookRetrieveSecretResponse,
    WebhookListResponsesCursorPagePagination as WebhookListResponsesCursorPagePagination,
    type WebhookCreateParams as WebhookCreateParams,
    type WebhookUpdateParams as WebhookUpdateParams,
    type WebhookListParams as WebhookListParams,
  };

  export { YourWebhookURL as YourWebhookURL, type YourWebhookURLCreateParams as YourWebhookURLCreateParams };
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
