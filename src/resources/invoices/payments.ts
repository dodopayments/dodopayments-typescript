// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as Core from '../../core';
import { type Response } from '../../_shims/index';

export class Payments extends APIResource {
  retrieve(paymentId: string, options?: Core.RequestOptions): Core.APIPromise<Response> {
    return this._client.get(`/invoices/payments/${paymentId}`, {
      ...options,
      headers: { Accept: 'application/pdf', ...options?.headers },
      __binaryResponse: true,
    });
  }

  retrieveRefund(refundId: string, options?: Core.RequestOptions): Core.APIPromise<Response> {
    return this._client.get(`/invoices/refunds/${refundId}`, {
      ...options,
      headers: { Accept: 'application/pdf', ...options?.headers },
      __binaryResponse: true,
    });
  }
}
