// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import type { DodoPayments } from './index';

export abstract class APIResource {
  protected _client: DodoPayments;

  constructor(client: DodoPayments) {
    this._client = client;
  }
}
