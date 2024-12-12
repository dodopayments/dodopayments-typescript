// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as SupportedCountriesAPI from './supported-countries';
import { CountryCodeAlpha2, SupportedCountries, SupportedCountryListResponse } from './supported-countries';

export class Checkout extends APIResource {
  supportedCountries: SupportedCountriesAPI.SupportedCountries = new SupportedCountriesAPI.SupportedCountries(
    this._client,
  );
}

Checkout.SupportedCountries = SupportedCountries;

export declare namespace Checkout {
  export {
    SupportedCountries as SupportedCountries,
    type CountryCodeAlpha2 as CountryCodeAlpha2,
    type SupportedCountryListResponse as SupportedCountryListResponse,
  };
}
