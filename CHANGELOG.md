# Changelog

## [2.46.0](https://github.com/dodopayments/dodopayments-typescript/compare/v2.45.1...v2.46.0) (2026-08-13)


### Features

* **api:** add subscription pause/unpause ([21a019d](https://github.com/dodopayments/dodopayments-typescript/commit/21a019d413d8b83557bcbfcad69e73e87c9c8e2b))
* **api:** add subscription pause/unpause ([d64bb1f](https://github.com/dodopayments/dodopayments-typescript/commit/d64bb1f4fc38b64a7204b412acfde58f6451d895))

## [2.45.1](https://github.com/dodopayments/dodopayments-typescript/compare/v2.45.0...v2.45.1) (2026-08-07)


### Bug Fixes

* **mcp:** address review feedback on code tool Deno resolution ([12c5429](https://github.com/dodopayments/dodopayments-typescript/commit/12c5429d124508de09f5d8d2b44ea026737276d2))
* **mcp:** make code tool Deno resolution cross-platform and fail honestly on Windows ([c8675d4](https://github.com/dodopayments/dodopayments-typescript/commit/c8675d4afd8d1927bbd438caa232db2da576032b))
* **mcp:** make code tool Deno resolution cross-platform and fail honestly on Windows ([60a087c](https://github.com/dodopayments/dodopayments-typescript/commit/60a087c0371a788cf6ed687e904ca1f80361f33e)), closes [#327](https://github.com/dodopayments/dodopayments-typescript/issues/327)
* **mcp:** probe once under concurrency, and flag the Deno 2.9+ breakage ([d7b9439](https://github.com/dodopayments/dodopayments-typescript/commit/d7b9439f5ea95dbc7c95f67e1b7b653affde7f3a))
* **mcp:** stop a real SDK directory shadowing a symlinked one ([4d3fac6](https://github.com/dodopayments/dodopayments-typescript/commit/4d3fac651804801607bc31dc008a53f449ab53e8))

## [2.45.0](https://github.com/dodopayments/dodopayments-typescript/compare/v2.44.0...v2.45.0) (2026-08-05)


### Features

* **api:** add addon single_quantity_price and live_tutoring tax category ([c8cec33](https://github.com/dodopayments/dodopayments-typescript/commit/c8cec33f7eb475b3f57c63e2dd04dcadf5535c95))
* **api:** add addon single_quantity_price and live_tutoring tax category ([60002db](https://github.com/dodopayments/dodopayments-typescript/commit/60002db65a50c27223ba05b00b68a145d52c7fda))

## [2.44.0](https://github.com/dodopayments/dodopayments-typescript/compare/v2.43.0...v2.44.0) (2026-07-31)


### Features

* **api:** add payout webhook events and remove payment failure_details ([07d37e1](https://github.com/dodopayments/dodopayments-typescript/commit/07d37e170d7b8a5c6219e92f9fc063f800d2f4e6))
* **api:** add payout webhook events and remove payment failure_details ([8c72075](https://github.com/dodopayments/dodopayments-typescript/commit/8c72075e6224e1ea13909b94e4d1303607c05ca0))

## [2.43.0](https://github.com/dodopayments/dodopayments-typescript/compare/v2.42.2...v2.43.0) (2026-07-24)


### Features

* **api:** add discount customers endpoints, trial support, currency options, and failure details ([05a9527](https://github.com/dodopayments/dodopayments-typescript/commit/05a95279e3447dbffbfc0100c55516fd58054a30))
* **api:** add discount customers endpoints, trial support, currency options, and failure details ([5844371](https://github.com/dodopayments/dodopayments-typescript/commit/5844371c07d3e69f276bde28806977c4883e9b79))

## [2.42.2](https://github.com/dodopayments/dodopayments-typescript/compare/v2.42.1...v2.42.2) (2026-07-09)


### Bug Fixes

* **api:** add subscription.update_payment_method webhook and payment-method fields ([5d050d5](https://github.com/dodopayments/dodopayments-typescript/commit/5d050d553eac61a65f027636b0e1ab296b066cd3))
* **api:** add subscription.update_payment_method webhook and payment-method fields ([ef930e2](https://github.com/dodopayments/dodopayments-typescript/commit/ef930e229c2893a7879d19e1e3931de845af9980))

## [2.42.1](https://github.com/dodopayments/dodopayments-typescript/compare/v2.42.0...v2.42.1) (2026-07-07)


### Bug Fixes

* **mcp/cloudflare-worker:** raise access-token TTL to 24h to cut mcp-remote re-auth popups ([4f7f2da](https://github.com/dodopayments/dodopayments-typescript/commit/4f7f2da2b714c3484b7b13085974ae76c7d9ca09))

## [2.42.0](https://github.com/dodopayments/dodopayments-typescript/compare/v2.41.0...v2.42.0) (2026-07-06)


### Features

* **api:** add subscription period override fields to subscription update ([7c58a0e](https://github.com/dodopayments/dodopayments-typescript/commit/7c58a0e55267c1c137f72880705d6d90ad99081f))
* **api:** add subscription period override fields to subscription update ([e9c9889](https://github.com/dodopayments/dodopayments-typescript/commit/e9c9889efe9ef689d3cd2d6722da810de1913045))

## [2.41.0](https://github.com/dodopayments/dodopayments-typescript/compare/v2.40.1...v2.41.0) (2026-07-04)


### Features

* **api:** register Feature/FeatureType models and expose customer entitlement-grants list endpoint ([9e7b275](https://github.com/dodopayments/dodopayments-typescript/commit/9e7b275942aab38421732da4fc65ff031631cd6b))
* **api:** register Feature/FeatureType models and expose customer entitlement-grants list endpoint ([aaee6f0](https://github.com/dodopayments/dodopayments-typescript/commit/aaee6f084c6b4c1fe7dfeea537ff1354b3fce098))

## [2.40.1](https://github.com/dodopayments/dodopayments-typescript/compare/v2.40.0...v2.40.1) (2026-06-27)


### Bug Fixes

* **api:** add allow_editing_addons checkout flag and refine schema descriptions ([013e201](https://github.com/dodopayments/dodopayments-typescript/commit/013e201f34b7d622d0a67133b1ffa8c0596f1c93))
* **api:** add allow_editing_addons checkout flag and refine schema descriptions ([5b126bf](https://github.com/dodopayments/dodopayments-typescript/commit/5b126bf1a1087f17b33eb8a86fda2421f4501ce8))

## [2.40.0](https://github.com/dodopayments/dodopayments-typescript/compare/v2.39.1...v2.40.0) (2026-06-23)


### Features

* **api:** regenerate SDK from latest OpenAPI spec ([6a49056](https://github.com/dodopayments/dodopayments-typescript/commit/6a490567936b2c0d0c185469d519374e42379626))
* **api:** regenerate SDK from latest OpenAPI spec ([11d55dd](https://github.com/dodopayments/dodopayments-typescript/commit/11d55dd3f1e97497b968ba72655f1fd50e235d81))

## [2.39.1](https://github.com/dodopayments/dodopayments-typescript/compare/v2.39.0...v2.39.1) (2026-06-18)


### Bug Fixes

* **pagination:** stop cursor auto-pagination dropping pages ([40b10cf](https://github.com/dodopayments/dodopayments-typescript/commit/40b10cfe0b18f6c9ea258e630c7322689bc3390e))
* **pagination:** stop cursor auto-pagination dropping pages ([ae48566](https://github.com/dodopayments/dodopayments-typescript/commit/ae4856696e6a1ce1d3171aba5237e59ed8206066))


### Chores

* restore release-please-owned files from main ([30f47aa](https://github.com/dodopayments/dodopayments-typescript/commit/30f47aa968ae5b3cff2c33083a335b21735b492f))

## [2.39.0](https://github.com/dodopayments/dodopayments-typescript/compare/v2.38.1...v2.39.0) (2026-06-16)


### Features

* **api:** add tax_id_business_name and tax_id_format_name to CalculateSessionResponse ([149bf70](https://github.com/dodopayments/dodopayments-typescript/commit/149bf7076ac4c8348bc82222e3ed7475d5d7a491))
