// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import type { RequestInit, RequestInfo, BodyInit } from './internal/builtin-types';
import type { HTTPMethod, PromiseOrValue, MergedRequestInit, FinalizedRequestInit } from './internal/types';
import { uuid4 } from './internal/utils/uuid';
import { validatePositiveInteger, isAbsoluteURL, safeJSON } from './internal/utils/values';
import { sleep } from './internal/utils/sleep';
export type { Logger, LogLevel } from './internal/utils/log';
import { castToError, isAbortError } from './internal/errors';
import type { APIResponseProps } from './internal/parse';
import { getPlatformHeaders } from './internal/detect-platform';
import * as Shims from './internal/shims';
import * as Opts from './internal/request-options';
import { VERSION } from './version';
import * as Errors from './core/error';
import * as Pagination from './core/pagination';
import {
  AbstractPage,
  type CursorPagePaginationParams,
  CursorPagePaginationResponse,
  type DefaultPageNumberPaginationParams,
  DefaultPageNumberPaginationResponse,
} from './core/pagination';
import * as Uploads from './core/uploads';
import * as API from './resources/index';
import { APIPromise } from './core/api-promise';
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
  CheckoutSessionCreateParams,
  CheckoutSessionRequest,
  CheckoutSessionResponse,
  CheckoutSessionStatus,
  CheckoutSessions,
} from './resources/checkout-sessions';
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
  LicenseActivateResponse,
  LicenseDeactivateParams,
  LicenseValidateParams,
  LicenseValidateResponse,
  Licenses,
} from './resources/licenses';
import {
  Meter,
  MeterAggregation,
  MeterCreateParams,
  MeterFilter,
  MeterListParams,
  Meters,
  MetersDefaultPageNumberPagination,
} from './resources/meters';
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
  RefundListResponse,
  RefundListResponsesDefaultPageNumberPagination,
  RefundStatus,
  Refunds,
} from './resources/refunds';
import {
  AddonCartResponseItem,
  AttachAddon,
  OnDemandSubscription,
  Subscription,
  SubscriptionChangePlanParams,
  SubscriptionChargeParams,
  SubscriptionChargeResponse,
  SubscriptionCreateParams,
  SubscriptionCreateResponse,
  SubscriptionListParams,
  SubscriptionListResponse,
  SubscriptionListResponsesDefaultPageNumberPagination,
  SubscriptionRetrieveUsageHistoryParams,
  SubscriptionRetrieveUsageHistoryResponse,
  SubscriptionRetrieveUsageHistoryResponsesDefaultPageNumberPagination,
  SubscriptionStatus,
  SubscriptionUpdateParams,
  Subscriptions,
  TimeInterval,
} from './resources/subscriptions';
import {
  Event,
  EventInput,
  EventsDefaultPageNumberPagination,
  UsageEventIngestParams,
  UsageEventIngestResponse,
  UsageEventListParams,
  UsageEvents,
} from './resources/usage-events';
import { WebhookEventType, WebhookEvents, WebhookPayload } from './resources/webhook-events';
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
  AddMeterToPrice,
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
  DisputeAcceptedWebhookEvent,
  DisputeCancelledWebhookEvent,
  DisputeChallengedWebhookEvent,
  DisputeExpiredWebhookEvent,
  DisputeLostWebhookEvent,
  DisputeOpenedWebhookEvent,
  DisputeWonWebhookEvent,
  LicenseKeyCreatedWebhookEvent,
  PaymentCancelledWebhookEvent,
  PaymentFailedWebhookEvent,
  PaymentProcessingWebhookEvent,
  PaymentSucceededWebhookEvent,
  RefundFailedWebhookEvent,
  RefundSucceededWebhookEvent,
  SubscriptionActiveWebhookEvent,
  SubscriptionCancelledWebhookEvent,
  SubscriptionExpiredWebhookEvent,
  SubscriptionFailedWebhookEvent,
  SubscriptionOnHoldWebhookEvent,
  SubscriptionPlanChangedWebhookEvent,
  SubscriptionRenewedWebhookEvent,
  UnsafeUnwrapWebhookEvent,
  UnwrapWebhookEvent,
  WebhookCreateParams,
  WebhookDetails,
  WebhookDetailsCursorPagePagination,
  WebhookListParams,
  WebhookRetrieveSecretResponse,
  WebhookUpdateParams,
  Webhooks,
} from './resources/webhooks/webhooks';
import { type Fetch } from './internal/builtin-types';
import { HeadersLike, NullableHeaders, buildHeaders } from './internal/headers';
import { FinalRequestOptions, RequestOptions } from './internal/request-options';
import { readEnv } from './internal/utils/env';
import {
  type LogLevel,
  type Logger,
  formatRequestDetails,
  loggerFor,
  parseLogLevel,
} from './internal/utils/log';
import { isEmptyObj } from './internal/utils/values';

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
   * Defaults to process.env['DODO_PAYMENTS_WEBHOOK_KEY'].
   */
  webhookKey?: string | null | undefined;

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
   * Additional `RequestInit` options to be passed to `fetch` calls.
   * Properties will be overridden by per-request `fetchOptions`.
   */
  fetchOptions?: MergedRequestInit | undefined;

  /**
   * Specify a custom `fetch` function implementation.
   *
   * If not provided, we expect that `fetch` is defined globally.
   */
  fetch?: Fetch | undefined;

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
   * header to `null` in request options.
   */
  defaultHeaders?: HeadersLike | undefined;

  /**
   * Default query parameters to include with every request to the API.
   *
   * These can be removed in individual requests by explicitly setting the
   * param to `undefined` in request options.
   */
  defaultQuery?: Record<string, string | undefined> | undefined;

  /**
   * Set the log level.
   *
   * Defaults to process.env['DODO_PAYMENTS_LOG'] or 'warn' if it isn't set.
   */
  logLevel?: LogLevel | undefined;

  /**
   * Set the logger.
   *
   * Defaults to globalThis.console.
   */
  logger?: Logger | undefined;
}

/**
 * API Client for interfacing with the Dodo Payments API.
 */
export class DodoPayments {
  bearerToken: string;
  webhookKey: string | null;

  baseURL: string;
  maxRetries: number;
  timeout: number;
  logger: Logger | undefined;
  logLevel: LogLevel | undefined;
  fetchOptions: MergedRequestInit | undefined;

  private fetch: Fetch;
  #encoder: Opts.RequestEncoder;
  protected idempotencyHeader?: string;
  private _options: ClientOptions;

  /**
   * API Client for interfacing with the Dodo Payments API.
   *
   * @param {string | undefined} [opts.bearerToken=process.env['DODO_PAYMENTS_API_KEY'] ?? undefined]
   * @param {string | null | undefined} [opts.webhookKey=process.env['DODO_PAYMENTS_WEBHOOK_KEY'] ?? null]
   * @param {Environment} [opts.environment=live_mode] - Specifies the environment URL to use for the API.
   * @param {string} [opts.baseURL=process.env['DODO_PAYMENTS_BASE_URL'] ?? https://live.dodopayments.com] - Override the default base URL for the API.
   * @param {number} [opts.timeout=1 minute] - The maximum amount of time (in milliseconds) the client will wait for a response before timing out.
   * @param {MergedRequestInit} [opts.fetchOptions] - Additional `RequestInit` options to be passed to `fetch` calls.
   * @param {Fetch} [opts.fetch] - Specify a custom `fetch` function implementation.
   * @param {number} [opts.maxRetries=2] - The maximum number of times the client will retry a request.
   * @param {HeadersLike} opts.defaultHeaders - Default headers to include with every request to the API.
   * @param {Record<string, string | undefined>} opts.defaultQuery - Default query parameters to include with every request to the API.
   */
  constructor({
    baseURL = readEnv('DODO_PAYMENTS_BASE_URL'),
    bearerToken = readEnv('DODO_PAYMENTS_API_KEY'),
    webhookKey = readEnv('DODO_PAYMENTS_WEBHOOK_KEY') ?? null,
    ...opts
  }: ClientOptions = {}) {
    if (bearerToken === undefined) {
      throw new Errors.DodoPaymentsError(
        "The DODO_PAYMENTS_API_KEY environment variable is missing or empty; either provide it, or instantiate the DodoPayments client with an bearerToken option, like new DodoPayments({ bearerToken: 'My Bearer Token' }).",
      );
    }

    const options: ClientOptions = {
      bearerToken,
      webhookKey,
      ...opts,
      baseURL,
      environment: opts.environment ?? 'live_mode',
    };

    if (baseURL && opts.environment) {
      throw new Errors.DodoPaymentsError(
        'Ambiguous URL; The `baseURL` option (or DODO_PAYMENTS_BASE_URL env var) and the `environment` option are given. If you want to use the environment you must pass baseURL: null',
      );
    }

    this.baseURL = options.baseURL || environments[options.environment || 'live_mode'];
    this.timeout = options.timeout ?? DodoPayments.DEFAULT_TIMEOUT /* 1 minute */;
    this.logger = options.logger ?? console;
    const defaultLogLevel = 'warn';
    // Set default logLevel early so that we can log a warning in parseLogLevel.
    this.logLevel = defaultLogLevel;
    this.logLevel =
      parseLogLevel(options.logLevel, 'ClientOptions.logLevel', this) ??
      parseLogLevel(readEnv('DODO_PAYMENTS_LOG'), "process.env['DODO_PAYMENTS_LOG']", this) ??
      defaultLogLevel;
    this.fetchOptions = options.fetchOptions;
    this.maxRetries = options.maxRetries ?? 2;
    this.fetch = options.fetch ?? Shims.getDefaultFetch();
    this.#encoder = Opts.FallbackEncoder;

    this._options = options;

    this.bearerToken = bearerToken;
    this.webhookKey = webhookKey;
  }

  /**
   * Create a new client instance re-using the same options given to the current client with optional overriding.
   */
  withOptions(options: Partial<ClientOptions>): this {
    const client = new (this.constructor as any as new (props: ClientOptions) => typeof this)({
      ...this._options,
      environment: options.environment ? options.environment : undefined,
      baseURL: options.environment ? undefined : this.baseURL,
      maxRetries: this.maxRetries,
      timeout: this.timeout,
      logger: this.logger,
      logLevel: this.logLevel,
      fetch: this.fetch,
      fetchOptions: this.fetchOptions,
      bearerToken: this.bearerToken,
      webhookKey: this.webhookKey,
      ...options,
    });
    return client;
  }

  /**
   * Check whether the base URL is set to its default.
   */
  #baseURLOverridden(): boolean {
    return this.baseURL !== environments[this._options.environment || 'live_mode'];
  }

  protected defaultQuery(): Record<string, string | undefined> | undefined {
    return this._options.defaultQuery;
  }

  protected validateHeaders({ values, nulls }: NullableHeaders) {
    return;
  }

  protected async authHeaders(opts: FinalRequestOptions): Promise<NullableHeaders | undefined> {
    return buildHeaders([{ Authorization: `Bearer ${this.bearerToken}` }]);
  }

  /**
   * Basic re-implementation of `qs.stringify` for primitive types.
   */
  protected stringifyQuery(query: Record<string, unknown>): string {
    return Object.entries(query)
      .filter(([_, value]) => typeof value !== 'undefined')
      .map(([key, value]) => {
        if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
          return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
        }
        if (value === null) {
          return `${encodeURIComponent(key)}=`;
        }
        throw new Errors.DodoPaymentsError(
          `Cannot stringify type ${typeof value}; Expected string, number, boolean, or null. If you need to pass nested query parameters, you can manually encode them, e.g. { query: { 'foo[key1]': value1, 'foo[key2]': value2 } }, and please open a GitHub issue requesting better support for your use case.`,
        );
      })
      .join('&');
  }

  private getUserAgent(): string {
    return `${this.constructor.name}/JS ${VERSION}`;
  }

  protected defaultIdempotencyKey(): string {
    return `stainless-node-retry-${uuid4()}`;
  }

  protected makeStatusError(
    status: number,
    error: Object,
    message: string | undefined,
    headers: Headers,
  ): Errors.APIError {
    return Errors.APIError.generate(status, error, message, headers);
  }

  buildURL(
    path: string,
    query: Record<string, unknown> | null | undefined,
    defaultBaseURL?: string | undefined,
  ): string {
    const baseURL = (!this.#baseURLOverridden() && defaultBaseURL) || this.baseURL;
    const url =
      isAbsoluteURL(path) ?
        new URL(path)
      : new URL(baseURL + (baseURL.endsWith('/') && path.startsWith('/') ? path.slice(1) : path));

    const defaultQuery = this.defaultQuery();
    if (!isEmptyObj(defaultQuery)) {
      query = { ...defaultQuery, ...query };
    }

    if (typeof query === 'object' && query && !Array.isArray(query)) {
      url.search = this.stringifyQuery(query as Record<string, unknown>);
    }

    return url.toString();
  }

  /**
   * Used as a callback for mutating the given `FinalRequestOptions` object.
   */
  protected async prepareOptions(options: FinalRequestOptions): Promise<void> {}

  /**
   * Used as a callback for mutating the given `RequestInit` object.
   *
   * This is useful for cases where you want to add certain headers based off of
   * the request properties, e.g. `method` or `url`.
   */
  protected async prepareRequest(
    request: RequestInit,
    { url, options }: { url: string; options: FinalRequestOptions },
  ): Promise<void> {}

  get<Rsp>(path: string, opts?: PromiseOrValue<RequestOptions>): APIPromise<Rsp> {
    return this.methodRequest('get', path, opts);
  }

  post<Rsp>(path: string, opts?: PromiseOrValue<RequestOptions>): APIPromise<Rsp> {
    return this.methodRequest('post', path, opts);
  }

  patch<Rsp>(path: string, opts?: PromiseOrValue<RequestOptions>): APIPromise<Rsp> {
    return this.methodRequest('patch', path, opts);
  }

  put<Rsp>(path: string, opts?: PromiseOrValue<RequestOptions>): APIPromise<Rsp> {
    return this.methodRequest('put', path, opts);
  }

  delete<Rsp>(path: string, opts?: PromiseOrValue<RequestOptions>): APIPromise<Rsp> {
    return this.methodRequest('delete', path, opts);
  }

  private methodRequest<Rsp>(
    method: HTTPMethod,
    path: string,
    opts?: PromiseOrValue<RequestOptions>,
  ): APIPromise<Rsp> {
    return this.request(
      Promise.resolve(opts).then((opts) => {
        return { method, path, ...opts };
      }),
    );
  }

  request<Rsp>(
    options: PromiseOrValue<FinalRequestOptions>,
    remainingRetries: number | null = null,
  ): APIPromise<Rsp> {
    return new APIPromise(this, this.makeRequest(options, remainingRetries, undefined));
  }

  private async makeRequest(
    optionsInput: PromiseOrValue<FinalRequestOptions>,
    retriesRemaining: number | null,
    retryOfRequestLogID: string | undefined,
  ): Promise<APIResponseProps> {
    const options = await optionsInput;
    const maxRetries = options.maxRetries ?? this.maxRetries;
    if (retriesRemaining == null) {
      retriesRemaining = maxRetries;
    }

    await this.prepareOptions(options);

    const { req, url, timeout } = await this.buildRequest(options, {
      retryCount: maxRetries - retriesRemaining,
    });

    await this.prepareRequest(req, { url, options });

    /** Not an API request ID, just for correlating local log entries. */
    const requestLogID = 'log_' + ((Math.random() * (1 << 24)) | 0).toString(16).padStart(6, '0');
    const retryLogStr = retryOfRequestLogID === undefined ? '' : `, retryOf: ${retryOfRequestLogID}`;
    const startTime = Date.now();

    loggerFor(this).debug(
      `[${requestLogID}] sending request`,
      formatRequestDetails({
        retryOfRequestLogID,
        method: options.method,
        url,
        options,
        headers: req.headers,
      }),
    );

    if (options.signal?.aborted) {
      throw new Errors.APIUserAbortError();
    }

    const controller = new AbortController();
    const response = await this.fetchWithTimeout(url, req, timeout, controller).catch(castToError);
    const headersTime = Date.now();

    if (response instanceof globalThis.Error) {
      const retryMessage = `retrying, ${retriesRemaining} attempts remaining`;
      if (options.signal?.aborted) {
        throw new Errors.APIUserAbortError();
      }
      // detect native connection timeout errors
      // deno throws "TypeError: error sending request for url (https://example/): client error (Connect): tcp connect error: Operation timed out (os error 60): Operation timed out (os error 60)"
      // undici throws "TypeError: fetch failed" with cause "ConnectTimeoutError: Connect Timeout Error (attempted address: example:443, timeout: 1ms)"
      // others do not provide enough information to distinguish timeouts from other connection errors
      const isTimeout =
        isAbortError(response) ||
        /timed? ?out/i.test(String(response) + ('cause' in response ? String(response.cause) : ''));
      if (retriesRemaining) {
        loggerFor(this).info(
          `[${requestLogID}] connection ${isTimeout ? 'timed out' : 'failed'} - ${retryMessage}`,
        );
        loggerFor(this).debug(
          `[${requestLogID}] connection ${isTimeout ? 'timed out' : 'failed'} (${retryMessage})`,
          formatRequestDetails({
            retryOfRequestLogID,
            url,
            durationMs: headersTime - startTime,
            message: response.message,
          }),
        );
        return this.retryRequest(options, retriesRemaining, retryOfRequestLogID ?? requestLogID);
      }
      loggerFor(this).info(
        `[${requestLogID}] connection ${isTimeout ? 'timed out' : 'failed'} - error; no more retries left`,
      );
      loggerFor(this).debug(
        `[${requestLogID}] connection ${isTimeout ? 'timed out' : 'failed'} (error; no more retries left)`,
        formatRequestDetails({
          retryOfRequestLogID,
          url,
          durationMs: headersTime - startTime,
          message: response.message,
        }),
      );
      if (isTimeout) {
        throw new Errors.APIConnectionTimeoutError();
      }
      throw new Errors.APIConnectionError({ cause: response });
    }

    const responseInfo = `[${requestLogID}${retryLogStr}] ${req.method} ${url} ${
      response.ok ? 'succeeded' : 'failed'
    } with status ${response.status} in ${headersTime - startTime}ms`;

    if (!response.ok) {
      const shouldRetry = await this.shouldRetry(response);
      if (retriesRemaining && shouldRetry) {
        const retryMessage = `retrying, ${retriesRemaining} attempts remaining`;

        // We don't need the body of this response.
        await Shims.CancelReadableStream(response.body);
        loggerFor(this).info(`${responseInfo} - ${retryMessage}`);
        loggerFor(this).debug(
          `[${requestLogID}] response error (${retryMessage})`,
          formatRequestDetails({
            retryOfRequestLogID,
            url: response.url,
            status: response.status,
            headers: response.headers,
            durationMs: headersTime - startTime,
          }),
        );
        return this.retryRequest(
          options,
          retriesRemaining,
          retryOfRequestLogID ?? requestLogID,
          response.headers,
        );
      }

      const retryMessage = shouldRetry ? `error; no more retries left` : `error; not retryable`;

      loggerFor(this).info(`${responseInfo} - ${retryMessage}`);

      const errText = await response.text().catch((err: any) => castToError(err).message);
      const errJSON = safeJSON(errText);
      const errMessage = errJSON ? undefined : errText;

      loggerFor(this).debug(
        `[${requestLogID}] response error (${retryMessage})`,
        formatRequestDetails({
          retryOfRequestLogID,
          url: response.url,
          status: response.status,
          headers: response.headers,
          message: errMessage,
          durationMs: Date.now() - startTime,
        }),
      );

      const err = this.makeStatusError(response.status, errJSON, errMessage, response.headers);
      throw err;
    }

    loggerFor(this).info(responseInfo);
    loggerFor(this).debug(
      `[${requestLogID}] response start`,
      formatRequestDetails({
        retryOfRequestLogID,
        url: response.url,
        status: response.status,
        headers: response.headers,
        durationMs: headersTime - startTime,
      }),
    );

    return { response, options, controller, requestLogID, retryOfRequestLogID, startTime };
  }

  getAPIList<Item, PageClass extends Pagination.AbstractPage<Item> = Pagination.AbstractPage<Item>>(
    path: string,
    Page: new (...args: any[]) => PageClass,
    opts?: RequestOptions,
  ): Pagination.PagePromise<PageClass, Item> {
    return this.requestAPIList(Page, { method: 'get', path, ...opts });
  }

  requestAPIList<
    Item = unknown,
    PageClass extends Pagination.AbstractPage<Item> = Pagination.AbstractPage<Item>,
  >(
    Page: new (...args: ConstructorParameters<typeof Pagination.AbstractPage>) => PageClass,
    options: FinalRequestOptions,
  ): Pagination.PagePromise<PageClass, Item> {
    const request = this.makeRequest(options, null, undefined);
    return new Pagination.PagePromise<PageClass, Item>(this as any as DodoPayments, request, Page);
  }

  async fetchWithTimeout(
    url: RequestInfo,
    init: RequestInit | undefined,
    ms: number,
    controller: AbortController,
  ): Promise<Response> {
    const { signal, method, ...options } = init || {};
    if (signal) signal.addEventListener('abort', () => controller.abort());

    const timeout = setTimeout(() => controller.abort(), ms);

    const isReadableBody =
      ((globalThis as any).ReadableStream && options.body instanceof (globalThis as any).ReadableStream) ||
      (typeof options.body === 'object' && options.body !== null && Symbol.asyncIterator in options.body);

    const fetchOptions: RequestInit = {
      signal: controller.signal as any,
      ...(isReadableBody ? { duplex: 'half' } : {}),
      method: 'GET',
      ...options,
    };
    if (method) {
      // Custom methods like 'patch' need to be uppercased
      // See https://github.com/nodejs/undici/issues/2294
      fetchOptions.method = method.toUpperCase();
    }

    try {
      // use undefined this binding; fetch errors if bound to something else in browser/cloudflare
      return await this.fetch.call(undefined, url, fetchOptions);
    } finally {
      clearTimeout(timeout);
    }
  }

  private async shouldRetry(response: Response): Promise<boolean> {
    // Note this is not a standard header.
    const shouldRetryHeader = response.headers.get('x-should-retry');

    // If the server explicitly says whether or not to retry, obey.
    if (shouldRetryHeader === 'true') return true;
    if (shouldRetryHeader === 'false') return false;

    // Retry on request timeouts.
    if (response.status === 408) return true;

    // Retry on lock timeouts.
    if (response.status === 409) return true;

    // Retry on rate limits.
    if (response.status === 429) return true;

    // Retry internal errors.
    if (response.status >= 500) return true;

    return false;
  }

  private async retryRequest(
    options: FinalRequestOptions,
    retriesRemaining: number,
    requestLogID: string,
    responseHeaders?: Headers | undefined,
  ): Promise<APIResponseProps> {
    let timeoutMillis: number | undefined;

    // Note the `retry-after-ms` header may not be standard, but is a good idea and we'd like proactive support for it.
    const retryAfterMillisHeader = responseHeaders?.get('retry-after-ms');
    if (retryAfterMillisHeader) {
      const timeoutMs = parseFloat(retryAfterMillisHeader);
      if (!Number.isNaN(timeoutMs)) {
        timeoutMillis = timeoutMs;
      }
    }

    // About the Retry-After header: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Retry-After
    const retryAfterHeader = responseHeaders?.get('retry-after');
    if (retryAfterHeader && !timeoutMillis) {
      const timeoutSeconds = parseFloat(retryAfterHeader);
      if (!Number.isNaN(timeoutSeconds)) {
        timeoutMillis = timeoutSeconds * 1000;
      } else {
        timeoutMillis = Date.parse(retryAfterHeader) - Date.now();
      }
    }

    // If the API asks us to wait a certain amount of time (and it's a reasonable amount),
    // just do what it says, but otherwise calculate a default
    if (!(timeoutMillis && 0 <= timeoutMillis && timeoutMillis < 60 * 1000)) {
      const maxRetries = options.maxRetries ?? this.maxRetries;
      timeoutMillis = this.calculateDefaultRetryTimeoutMillis(retriesRemaining, maxRetries);
    }
    await sleep(timeoutMillis);

    return this.makeRequest(options, retriesRemaining - 1, requestLogID);
  }

  private calculateDefaultRetryTimeoutMillis(retriesRemaining: number, maxRetries: number): number {
    const initialRetryDelay = 0.5;
    const maxRetryDelay = 8.0;

    const numRetries = maxRetries - retriesRemaining;

    // Apply exponential backoff, but not more than the max.
    const sleepSeconds = Math.min(initialRetryDelay * Math.pow(2, numRetries), maxRetryDelay);

    // Apply some jitter, take up to at most 25 percent of the retry time.
    const jitter = 1 - Math.random() * 0.25;

    return sleepSeconds * jitter * 1000;
  }

  async buildRequest(
    inputOptions: FinalRequestOptions,
    { retryCount = 0 }: { retryCount?: number } = {},
  ): Promise<{ req: FinalizedRequestInit; url: string; timeout: number }> {
    const options = { ...inputOptions };
    const { method, path, query, defaultBaseURL } = options;

    const url = this.buildURL(path!, query as Record<string, unknown>, defaultBaseURL);
    if ('timeout' in options) validatePositiveInteger('timeout', options.timeout);
    options.timeout = options.timeout ?? this.timeout;
    const { bodyHeaders, body } = this.buildBody({ options });
    const reqHeaders = await this.buildHeaders({ options: inputOptions, method, bodyHeaders, retryCount });

    const req: FinalizedRequestInit = {
      method,
      headers: reqHeaders,
      ...(options.signal && { signal: options.signal }),
      ...((globalThis as any).ReadableStream &&
        body instanceof (globalThis as any).ReadableStream && { duplex: 'half' }),
      ...(body && { body }),
      ...((this.fetchOptions as any) ?? {}),
      ...((options.fetchOptions as any) ?? {}),
    };

    return { req, url, timeout: options.timeout };
  }

  private async buildHeaders({
    options,
    method,
    bodyHeaders,
    retryCount,
  }: {
    options: FinalRequestOptions;
    method: HTTPMethod;
    bodyHeaders: HeadersLike;
    retryCount: number;
  }): Promise<Headers> {
    let idempotencyHeaders: HeadersLike = {};
    if (this.idempotencyHeader && method !== 'get') {
      if (!options.idempotencyKey) options.idempotencyKey = this.defaultIdempotencyKey();
      idempotencyHeaders[this.idempotencyHeader] = options.idempotencyKey;
    }

    const headers = buildHeaders([
      idempotencyHeaders,
      {
        Accept: 'application/json',
        'User-Agent': this.getUserAgent(),
        'X-Stainless-Retry-Count': String(retryCount),
        ...(options.timeout ? { 'X-Stainless-Timeout': String(Math.trunc(options.timeout / 1000)) } : {}),
        ...getPlatformHeaders(),
      },
      await this.authHeaders(options),
      this._options.defaultHeaders,
      bodyHeaders,
      options.headers,
    ]);

    this.validateHeaders(headers);

    return headers.values;
  }

  private buildBody({ options: { body, headers: rawHeaders } }: { options: FinalRequestOptions }): {
    bodyHeaders: HeadersLike;
    body: BodyInit | undefined;
  } {
    if (!body) {
      return { bodyHeaders: undefined, body: undefined };
    }
    const headers = buildHeaders([rawHeaders]);
    if (
      // Pass raw type verbatim
      ArrayBuffer.isView(body) ||
      body instanceof ArrayBuffer ||
      body instanceof DataView ||
      (typeof body === 'string' &&
        // Preserve legacy string encoding behavior for now
        headers.values.has('content-type')) ||
      // `Blob` is superset of `File`
      ((globalThis as any).Blob && body instanceof (globalThis as any).Blob) ||
      // `FormData` -> `multipart/form-data`
      body instanceof FormData ||
      // `URLSearchParams` -> `application/x-www-form-urlencoded`
      body instanceof URLSearchParams ||
      // Send chunked stream (each chunk has own `length`)
      ((globalThis as any).ReadableStream && body instanceof (globalThis as any).ReadableStream)
    ) {
      return { bodyHeaders: undefined, body: body as BodyInit };
    } else if (
      typeof body === 'object' &&
      (Symbol.asyncIterator in body ||
        (Symbol.iterator in body && 'next' in body && typeof body.next === 'function'))
    ) {
      return { bodyHeaders: undefined, body: Shims.ReadableStreamFrom(body as AsyncIterable<Uint8Array>) };
    } else {
      return this.#encoder({ body, headers });
    }
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

  checkoutSessions: API.CheckoutSessions = new API.CheckoutSessions(this);
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
  products: API.Products = new API.Products(this);
  misc: API.Misc = new API.Misc(this);
  discounts: API.Discounts = new API.Discounts(this);
  addons: API.Addons = new API.Addons(this);
  brands: API.Brands = new API.Brands(this);
  webhooks: API.Webhooks = new API.Webhooks(this);
  webhookEvents: API.WebhookEvents = new API.WebhookEvents(this);
  usageEvents: API.UsageEvents = new API.UsageEvents(this);
  meters: API.Meters = new API.Meters(this);
}

DodoPayments.CheckoutSessions = CheckoutSessions;
DodoPayments.Payments = Payments;
DodoPayments.Subscriptions = Subscriptions;
DodoPayments.Invoices = Invoices;
DodoPayments.Licenses = Licenses;
DodoPayments.LicenseKeys = LicenseKeys;
DodoPayments.LicenseKeyInstances = LicenseKeyInstances;
DodoPayments.Customers = Customers;
DodoPayments.Refunds = Refunds;
DodoPayments.Disputes = Disputes;
DodoPayments.Payouts = Payouts;
DodoPayments.Products = Products;
DodoPayments.Misc = Misc;
DodoPayments.Discounts = Discounts;
DodoPayments.Addons = Addons;
DodoPayments.Brands = Brands;
DodoPayments.Webhooks = Webhooks;
DodoPayments.WebhookEvents = WebhookEvents;
DodoPayments.UsageEvents = UsageEvents;
DodoPayments.Meters = Meters;

export declare namespace DodoPayments {
  export type RequestOptions = Opts.RequestOptions;

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
    CheckoutSessions as CheckoutSessions,
    type CheckoutSessionRequest as CheckoutSessionRequest,
    type CheckoutSessionResponse as CheckoutSessionResponse,
    type CheckoutSessionStatus as CheckoutSessionStatus,
    type CheckoutSessionCreateParams as CheckoutSessionCreateParams,
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
    type PaymentListResponsesDefaultPageNumberPagination as PaymentListResponsesDefaultPageNumberPagination,
    type PaymentCreateParams as PaymentCreateParams,
    type PaymentListParams as PaymentListParams,
  };

  export {
    Subscriptions as Subscriptions,
    type AddonCartResponseItem as AddonCartResponseItem,
    type AttachAddon as AttachAddon,
    type OnDemandSubscription as OnDemandSubscription,
    type Subscription as Subscription,
    type SubscriptionStatus as SubscriptionStatus,
    type TimeInterval as TimeInterval,
    type SubscriptionCreateResponse as SubscriptionCreateResponse,
    type SubscriptionListResponse as SubscriptionListResponse,
    type SubscriptionChargeResponse as SubscriptionChargeResponse,
    type SubscriptionRetrieveUsageHistoryResponse as SubscriptionRetrieveUsageHistoryResponse,
    type SubscriptionListResponsesDefaultPageNumberPagination as SubscriptionListResponsesDefaultPageNumberPagination,
    type SubscriptionRetrieveUsageHistoryResponsesDefaultPageNumberPagination as SubscriptionRetrieveUsageHistoryResponsesDefaultPageNumberPagination,
    type SubscriptionCreateParams as SubscriptionCreateParams,
    type SubscriptionUpdateParams as SubscriptionUpdateParams,
    type SubscriptionListParams as SubscriptionListParams,
    type SubscriptionChangePlanParams as SubscriptionChangePlanParams,
    type SubscriptionChargeParams as SubscriptionChargeParams,
    type SubscriptionRetrieveUsageHistoryParams as SubscriptionRetrieveUsageHistoryParams,
  };

  export { Invoices as Invoices };

  export {
    Licenses as Licenses,
    type LicenseActivateResponse as LicenseActivateResponse,
    type LicenseValidateResponse as LicenseValidateResponse,
    type LicenseActivateParams as LicenseActivateParams,
    type LicenseDeactivateParams as LicenseDeactivateParams,
    type LicenseValidateParams as LicenseValidateParams,
  };

  export {
    LicenseKeys as LicenseKeys,
    type LicenseKey as LicenseKey,
    type LicenseKeyStatus as LicenseKeyStatus,
    type LicenseKeysDefaultPageNumberPagination as LicenseKeysDefaultPageNumberPagination,
    type LicenseKeyUpdateParams as LicenseKeyUpdateParams,
    type LicenseKeyListParams as LicenseKeyListParams,
  };

  export {
    LicenseKeyInstances as LicenseKeyInstances,
    type LicenseKeyInstance as LicenseKeyInstance,
    type LicenseKeyInstancesDefaultPageNumberPagination as LicenseKeyInstancesDefaultPageNumberPagination,
    type LicenseKeyInstanceUpdateParams as LicenseKeyInstanceUpdateParams,
    type LicenseKeyInstanceListParams as LicenseKeyInstanceListParams,
  };

  export {
    Customers as Customers,
    type Customer as Customer,
    type CustomerPortalSession as CustomerPortalSession,
    type CustomersDefaultPageNumberPagination as CustomersDefaultPageNumberPagination,
    type CustomerCreateParams as CustomerCreateParams,
    type CustomerUpdateParams as CustomerUpdateParams,
    type CustomerListParams as CustomerListParams,
  };

  export {
    Refunds as Refunds,
    type Refund as Refund,
    type RefundStatus as RefundStatus,
    type RefundListResponse as RefundListResponse,
    type RefundListResponsesDefaultPageNumberPagination as RefundListResponsesDefaultPageNumberPagination,
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
    type DisputeListResponsesDefaultPageNumberPagination as DisputeListResponsesDefaultPageNumberPagination,
    type DisputeListParams as DisputeListParams,
  };

  export {
    Payouts as Payouts,
    type PayoutListResponse as PayoutListResponse,
    type PayoutListResponsesDefaultPageNumberPagination as PayoutListResponsesDefaultPageNumberPagination,
    type PayoutListParams as PayoutListParams,
  };

  export {
    Products as Products,
    type AddMeterToPrice as AddMeterToPrice,
    type LicenseKeyDuration as LicenseKeyDuration,
    type Price as Price,
    type Product as Product,
    type ProductListResponse as ProductListResponse,
    type ProductUpdateFilesResponse as ProductUpdateFilesResponse,
    type ProductListResponsesDefaultPageNumberPagination as ProductListResponsesDefaultPageNumberPagination,
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
    type DiscountsDefaultPageNumberPagination as DiscountsDefaultPageNumberPagination,
    type DiscountCreateParams as DiscountCreateParams,
    type DiscountUpdateParams as DiscountUpdateParams,
    type DiscountListParams as DiscountListParams,
  };

  export {
    Addons as Addons,
    type AddonResponse as AddonResponse,
    type AddonUpdateImagesResponse as AddonUpdateImagesResponse,
    type AddonResponsesDefaultPageNumberPagination as AddonResponsesDefaultPageNumberPagination,
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
    type WebhookDetails as WebhookDetails,
    type WebhookRetrieveSecretResponse as WebhookRetrieveSecretResponse,
    type DisputeAcceptedWebhookEvent as DisputeAcceptedWebhookEvent,
    type DisputeCancelledWebhookEvent as DisputeCancelledWebhookEvent,
    type DisputeChallengedWebhookEvent as DisputeChallengedWebhookEvent,
    type DisputeExpiredWebhookEvent as DisputeExpiredWebhookEvent,
    type DisputeLostWebhookEvent as DisputeLostWebhookEvent,
    type DisputeOpenedWebhookEvent as DisputeOpenedWebhookEvent,
    type DisputeWonWebhookEvent as DisputeWonWebhookEvent,
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
    type UnsafeUnwrapWebhookEvent as UnsafeUnwrapWebhookEvent,
    type UnwrapWebhookEvent as UnwrapWebhookEvent,
    type WebhookDetailsCursorPagePagination as WebhookDetailsCursorPagePagination,
    type WebhookCreateParams as WebhookCreateParams,
    type WebhookUpdateParams as WebhookUpdateParams,
    type WebhookListParams as WebhookListParams,
  };

  export {
    WebhookEvents as WebhookEvents,
    type WebhookEventType as WebhookEventType,
    type WebhookPayload as WebhookPayload,
  };

  export {
    UsageEvents as UsageEvents,
    type Event as Event,
    type EventInput as EventInput,
    type UsageEventIngestResponse as UsageEventIngestResponse,
    type EventsDefaultPageNumberPagination as EventsDefaultPageNumberPagination,
    type UsageEventListParams as UsageEventListParams,
    type UsageEventIngestParams as UsageEventIngestParams,
  };

  export {
    Meters as Meters,
    type Meter as Meter,
    type MeterAggregation as MeterAggregation,
    type MeterFilter as MeterFilter,
    type MetersDefaultPageNumberPagination as MetersDefaultPageNumberPagination,
    type MeterCreateParams as MeterCreateParams,
    type MeterListParams as MeterListParams,
  };
}
