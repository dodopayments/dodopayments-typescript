// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as SupportedCountriesAPI from './supported-countries';
import { CountryCode, SupportedCountries, SupportedCountryListResponse } from './supported-countries';

export class Misc extends APIResource {
  supportedCountries: SupportedCountriesAPI.SupportedCountries = new SupportedCountriesAPI.SupportedCountries(
    this._client,
  );
}

Misc.SupportedCountries = SupportedCountries;

export declare namespace Misc {
  export {
    SupportedCountries as SupportedCountries,
    type CountryCode as CountryCode,
    type SupportedCountryListResponse as SupportedCountryListResponse,
  };
}
