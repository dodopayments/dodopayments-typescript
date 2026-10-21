// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Payments extends APIResource {
  /**
   * @example
   * ```ts
   * const payment = await client.invoices.payments.retrieve(
   *   'pay_gr4RizvMOXFJ6xca3y2tU',
   * );
   *
   * const content = await payment.blob();
   * console.log(content);
   * ```
   */
  retrieve(
    paymentID: string,
    query: PaymentRetrieveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<Response> {
    return this._client.get(path`/invoices/payments/${paymentID}`, {
      query,
      ...options,
      headers: buildHeaders([{ Accept: 'application/pdf' }, options?.headers]),
      __binaryResponse: true,
    });
  }

  /**
   * @example
   * ```ts
   * const response =
   *   await client.invoices.payments.retrieveRefund(
   *     'ref_F0gZetLvTxxBrMU2CZcmy',
   *   );
   *
   * const content = await response.blob();
   * console.log(content);
   * ```
   */
  retrieveRefund(
    refundID: string,
    query: PaymentRetrieveRefundParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<Response> {
    return this._client.get(path`/invoices/refunds/${refundID}`, {
      query,
      ...options,
      headers: buildHeaders([{ Accept: 'application/pdf' }, options?.headers]),
      __binaryResponse: true,
    });
  }

  /**
   * @example
   * ```ts
   * const response =
   *   await client.invoices.payments.retrievePayout(
   *     'pyt_zFTrrn4sk3x3y2vjDBW3T',
   *   );
   *
   * const content = await response.blob();
   * console.log(content);
   * ```
   */
  retrievePayout(
    payoutID: string,
    query: PaymentRetrievePayoutParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<Response> {
    return this._client.get(path`/invoices/payouts/${payoutID}`, {
      query,
      ...options,
      headers: buildHeaders([{ Accept: 'application/pdf' }, options?.headers]),
      __binaryResponse: true,
    });
  }
}

export interface PaymentRetrieveParams {
  /**
   * The signed link token. If the business asks for a credential on its invoice
   * links, a valid token for this record replaces the credential.
   */
  token?: string;
}

export interface PaymentRetrieveRefundParams {
  /**
   * The signed link token. If the business asks for a credential on its invoice
   * links, a valid token for this record replaces the credential.
   */
  token?: string;
}

export interface PaymentRetrievePayoutParams {
  /**
   * The signed link token. If the business asks for a credential on its invoice
   * links, a valid token for this record replaces the credential.
   */
  token?: string;
}

export declare namespace Payments {
  export {
    type PaymentRetrieveParams as PaymentRetrieveParams,
    type PaymentRetrieveRefundParams as PaymentRetrieveRefundParams,
    type PaymentRetrievePayoutParams as PaymentRetrievePayoutParams,
  };
}
