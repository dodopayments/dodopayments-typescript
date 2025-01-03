// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as PaymentsAPI from './payments';
import { Payments } from './payments';

export class Invoices extends APIResource {
  payments: PaymentsAPI.Payments = new PaymentsAPI.Payments(this._client);
}

Invoices.Payments = Payments;

export declare namespace Invoices {
  export { Payments as Payments };
}
