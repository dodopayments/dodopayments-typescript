// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as Core from '../../core';

export class Payments extends APIResource {
  retrieve(paymentId: string, options?: Core.RequestOptions): Core.APIPromise<void> {
    return this._client.get(`/invoices/payments/${paymentId}`, {
      ...options,
      headers: { Accept: '*/*', ...options?.headers },
    });
  }
}
