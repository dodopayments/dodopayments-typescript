# Changelog

## [2.62.0](https://github.com/dodopayments/dodopayments-typescript/compare/v2.61.1...v2.62.0) (2026-11-10)


### Features

* **api:** billing invoices and upcoming invoice; sync spec to prod 1.122.7 ([a32adaa](https://github.com/dodopayments/dodopayments-typescript/commit/a32adaaed3ed017e6e0fc31def5a2c2da7a7ba3d))
* **api:** billing invoices and upcoming invoice; sync spec to prod 1.122.7 ([618fe4d](https://github.com/dodopayments/dodopayments-typescript/commit/618fe4dabce9d710c4892a89421f3e00513a0ac4))
* **api:** regenerate SDK from latest OpenAPI spec ([712e631](https://github.com/dodopayments/dodopayments-typescript/commit/712e631016fde88ef3de9cbf81cd0a64f5759885))
* **api:** regenerate SDK from latest OpenAPI spec ([48647d5](https://github.com/dodopayments/dodopayments-typescript/commit/48647d56457bf70a387b3f0b41da6f251d645503))
* **api:** regenerate SDK from latest OpenAPI spec ([aa9307b](https://github.com/dodopayments/dodopayments-typescript/commit/aa9307bcbb52246d0f7bede4507cc30a0c6a566c))
* **api:** regenerate SDK from latest OpenAPI spec ([b915f4e](https://github.com/dodopayments/dodopayments-typescript/commit/b915f4edd87f3834eefa2b9ceaf0f59fd0ef3d2b))
* **mcp-worker:** docs tools without sign-in, and 401 only for execute ([dc8a224](https://github.com/dodopayments/dodopayments-typescript/commit/dc8a224071a7ffff9bda2cb239e70c7aec3b8dcb))
* **mcp-worker:** docs tools without sign-in, and 401 only for execute ([19f152a](https://github.com/dodopayments/dodopayments-typescript/commit/19f152a5b5373b13831a151eb49a12666c7c3902))
* **mcp:** feedback needs sign-in and is stored in Sentinel ([d82212d](https://github.com/dodopayments/dodopayments-typescript/commit/d82212d15719a7acae686b493d448baa1b4feb3a))
* **mcp:** feedback needs sign-in and is stored in Sentinel ([0b924cf](https://github.com/dodopayments/dodopayments-typescript/commit/0b924cf6aa5b6493e5c2485b83421db287b3a4a2))


### Bug Fixes

* **mcp-worker:** keep read_docs_page on the docs host, redact URL credentials first, and bound the unsigned body ([677d426](https://github.com/dodopayments/dodopayments-typescript/commit/677d4266b5f433390a2a49752938d397390d1786))
* **mcp:** home.md list spacing; prettier ([6afa345](https://github.com/dodopayments/dodopayments-typescript/commit/6afa345fe9042406a67aa5dcecdf4032e82ee439))
* **mcp:** require sign-in at connect again; docs tools without sign-in behind ?auth=optional ([f0caa94](https://github.com/dodopayments/dodopayments-typescript/commit/f0caa94730260f8cfbfc9b93aa71f853eb166472))
* **mcp:** require sign-in at connect again; docs tools without sign-in behind ?auth=optional ([ea6cd11](https://github.com/dodopayments/dodopayments-typescript/commit/ea6cd11adb649bb2dc81d6909cac421734674bd2))


### Chores

* **deps:** bump body-parser from 2.3.0 to 2.4.0 in /packages/mcp-server/cloudflare-worker ([153d389](https://github.com/dodopayments/dodopayments-typescript/commit/153d389377858037cd4d926b80a9f34208b6cf3a))
* **deps:** bump body-parser in /packages/mcp-server/cloudflare-worker ([69122ca](https://github.com/dodopayments/dodopayments-typescript/commit/69122ca90058362f74d9574c35e3a044baa9dba5))
* **deps:** bump fast-uri from 3.1.8 to 3.1.9 in /packages/mcp-server/cloudflare-worker ([d30f3a4](https://github.com/dodopayments/dodopayments-typescript/commit/d30f3a4a065f6d5b76034d2155695f5d4278bf30))
* **deps:** bump fast-uri in /packages/mcp-server/cloudflare-worker ([bae1ea6](https://github.com/dodopayments/dodopayments-typescript/commit/bae1ea6a9693bf5730423f2119c1a171d2f44170))
* **deps:** bump ip-address from 10.7.3 to 10.7.4 in /packages/mcp-server/cloudflare-worker ([898b523](https://github.com/dodopayments/dodopayments-typescript/commit/898b523345a413b4d87b9ad955a48bc6dbb77f11))
* **deps:** bump qs from 6.16.0 to 6.17.1 in /packages/mcp-server/cloudflare-worker ([5192190](https://github.com/dodopayments/dodopayments-typescript/commit/51921900e78394bd2b50f965eb8344cf818224f6))
* **deps:** bump qs in /packages/mcp-server/cloudflare-worker ([60db8d9](https://github.com/dodopayments/dodopayments-typescript/commit/60db8d92c7bf8181136f3e687c80eada63ec1044))
* **deps:** bump undici and wrangler ([c981d0f](https://github.com/dodopayments/dodopayments-typescript/commit/c981d0f3bacfc405781cd0501dcd9fdf84828d4e))
* **deps:** bump undici and wrangler in /packages/mcp-server/cloudflare-worker ([977b261](https://github.com/dodopayments/dodopayments-typescript/commit/977b261642be845e34d021fa5e00051b66fe8ffa))
* **mcp-worker:** bump dodopayments and dodopayments-mcp to 2.61.1 together ([906d7e8](https://github.com/dodopayments/dodopayments-typescript/commit/906d7e853ebbe84b222624af245eec3277876ccf))
* **mcp-worker:** bump dodopayments and dodopayments-mcp to 2.61.1 together ([1db7cf0](https://github.com/dodopayments/dodopayments-typescript/commit/1db7cf021897955b9ad6f89b0f93c4e9764fc774))

## [2.61.1](https://github.com/dodopayments/dodopayments-typescript/compare/v2.61.0...v2.61.1) (2026-11-03)


### Bug Fixes

* **mcp-worker:** link scope errors to Connected apps, and keep the server version current ([634614e](https://github.com/dodopayments/dodopayments-typescript/commit/634614e02b63c28c3d6072ec568b7c97fd0eff8a))
* **mcp-worker:** link scope errors to Connected apps, and keep the server version current ([25e5bf2](https://github.com/dodopayments/dodopayments-typescript/commit/25e5bf21fa1a7f1fd972c63ce6fdb884db6c86a1))

## [2.61.0](https://github.com/dodopayments/dodopayments-typescript/compare/v2.60.1...v2.61.0) (2026-11-02)


### Features

* **mcp-worker:** remove the Worker OAuth server and serve the dodo-auth discovery documents (PR 7) ([0d99629](https://github.com/dodopayments/dodopayments-typescript/commit/0d996294f09d4fe29836ceda6618a6e469aab63f))
* **mcp-worker:** remove the Worker OAuth server and serve the dodo-auth discovery documents (PR 7) ([a64a817](https://github.com/dodopayments/dodopayments-typescript/commit/a64a8176345b1a97693da0fd4786aa8785d3a5c8))
* **mcp-worker:** serve MCP 2026-07-28 statelessly (PR 0) ([de3a250](https://github.com/dodopayments/dodopayments-typescript/commit/de3a2507be634e569af6a5ea7b4b1ac4d2ef20b5))
* **mcp-worker:** stateless transport for MCP 2026-07-28 (PR 0) ([d3b6005](https://github.com/dodopayments/dodopayments-typescript/commit/d3b600588e435eef6bbc034ed29c8c14599906f5))


### Bug Fixes

* **mcp-worker:** scope errors only for dodo sessions with a failed run and a known MCP scope ([da9ac85](https://github.com/dodopayments/dodopayments-typescript/commit/da9ac85d16e39ea2be8f7ac8c3da311884c9649f))

## [2.60.1](https://github.com/dodopayments/dodopayments-typescript/compare/v2.60.0...v2.60.1) (2026-11-01)


### Bug Fixes

* **mcp-worker:** describe the dodo-auth sign-in on the home page ([7b98055](https://github.com/dodopayments/dodopayments-typescript/commit/7b98055265a1e5721fb881ad8e7226aed8ffce65))
* **mcp-worker:** describe the dodo-auth sign-in on the home page ([a72fdbb](https://github.com/dodopayments/dodopayments-typescript/commit/a72fdbbb4648895d28b0d40343bc9983716207a2))

## [2.60.0](https://github.com/dodopayments/dodopayments-typescript/compare/v2.59.0...v2.60.0) (2026-11-01)


### Features

* **mcp-worker:** accept dodo-auth tokens and exchange them for API tokens ([1569b63](https://github.com/dodopayments/dodopayments-typescript/commit/1569b630b62e09d7766ff55d74f1b5f76b36fce2))
* **mcp-worker:** accept dodo-auth tokens and exchange them for API tokens ([8bc60dd](https://github.com/dodopayments/dodopayments-typescript/commit/8bc60dd7112b26172b773521d701c486b6932d71))


### Bug Fixes

* **mcp-worker:** fix the session mode and owner checks, the issuer trim, and the format ([592ef61](https://github.com/dodopayments/dodopayments-typescript/commit/592ef61a07dbe4011ea4af5d82ae7cea4e48556e))

## [2.59.0](https://github.com/dodopayments/dodopayments-typescript/compare/v2.58.0...v2.59.0) (2026-10-28)


### Features

* **api:** regenerate SDK from latest OpenAPI spec ([ac72777](https://github.com/dodopayments/dodopayments-typescript/commit/ac727771b5202d54b236b345821a347c5c0d56a4))
* **api:** regenerate SDK from latest OpenAPI spec ([b8c1bdd](https://github.com/dodopayments/dodopayments-typescript/commit/b8c1bdd262df4d5425149a9b1b15923997154089))


### Bug Fixes

* restore pnpm-lock.yaml from main ([bea97cb](https://github.com/dodopayments/dodopayments-typescript/commit/bea97cbbc5c49b9aabe2aff3c1e84442fc0bd806))

## [2.58.0](https://github.com/dodopayments/dodopayments-typescript/compare/v2.57.0...v2.58.0) (2026-10-28)


### Features

* **api:** regenerate SDK from latest OpenAPI spec ([cc3f552](https://github.com/dodopayments/dodopayments-typescript/commit/cc3f5525634a8eb0233ce1fea6ebf8ba84a3cffb))
* **api:** regenerate SDK from latest OpenAPI spec ([70ac30a](https://github.com/dodopayments/dodopayments-typescript/commit/70ac30a33f78fe011cf455e6c0d3c9a3a958e262))
* **api:** regenerate SDK from latest OpenAPI spec ([04e037c](https://github.com/dodopayments/dodopayments-typescript/commit/04e037c798fe5d627e08151bfd8ed33af2956961))


### Bug Fixes

* restore the pnpm lockfile from main ([34d8eb7](https://github.com/dodopayments/dodopayments-typescript/commit/34d8eb75f687d96e6881ff2982fe471043e527f2))

## [2.57.0](https://github.com/dodopayments/dodopayments-typescript/compare/v2.56.1...v2.57.0) (2026-10-24)


### Features

* **api:** translations and locales, addon delete/unarchive, meter update, 3DS payment details ([6934ef9](https://github.com/dodopayments/dodopayments-typescript/commit/6934ef9679399f3d3b857f0bc6a832db4bdf54e4))
* **api:** translations and locales, addon delete/unarchive, meter update, 3DS payment details ([b7c87ad](https://github.com/dodopayments/dodopayments-typescript/commit/b7c87adf17d98b378fe202094a0bb911d77d9ad6))


### Bug Fixes

* **mcp:** bump Docker runtime image to Deno 2.9.8 ([8850bd2](https://github.com/dodopayments/dodopayments-typescript/commit/8850bd26450eac6acc181d59437b81c7b74887ff)), closes [#330](https://github.com/dodopayments/dodopayments-typescript/issues/330)
* **mcp:** support Deno 2.9+ in the code tool sandbox ([a8ad3cb](https://github.com/dodopayments/dodopayments-typescript/commit/a8ad3cbc09acb2dc6c2f54191c3a3dce568fae89))
* **mcp:** support Deno 2.9+ in the code tool sandbox ([5e1f90d](https://github.com/dodopayments/dodopayments-typescript/commit/5e1f90d4343df9159d7f6849101360993b130f56)), closes [#330](https://github.com/dodopayments/dodopayments-typescript/issues/330)

## [2.56.1](https://github.com/dodopayments/dodopayments-typescript/compare/v2.56.0...v2.56.1) (2026-10-22)


### Bug Fixes

* **deps:** bump remaining vulnerable transitive dependencies in lockfile ([5c6c8ae](https://github.com/dodopayments/dodopayments-typescript/commit/5c6c8aebe920d334446b68bc983f2783f97b1b46))
* **deps:** bump remaining vulnerable transitive dependencies in lockfile ([dad208c](https://github.com/dodopayments/dodopayments-typescript/commit/dad208c85079193f24daeef06cf1be725aab5b15))


### Chores

* **deps:** bump vulnerable transitive dependencies in lockfile ([429d217](https://github.com/dodopayments/dodopayments-typescript/commit/429d217669622791b9f58816787ae12e84db3da7))
* **deps:** bump vulnerable transitive dependencies in lockfile ([a0ce6e6](https://github.com/dodopayments/dodopayments-typescript/commit/a0ce6e6812ad69aaa301f7761f6df4e5dd9e27d7))

## [2.56.0](https://github.com/dodopayments/dodopayments-typescript/compare/v2.55.0...v2.56.0) (2026-10-21)


### Features

* **api:** payment charge type, usage flag and card details, signed invoice link tokens ([1ae755a](https://github.com/dodopayments/dodopayments-typescript/commit/1ae755a2cb52d839b6563d80d0f5d970084d3f61))
* **api:** payment charge type, usage flag and card details, signed invoice link tokens ([883c488](https://github.com/dodopayments/dodopayments-typescript/commit/883c4887923c64eab35bbb3902d753c5094ffae7))

## [2.55.0](https://github.com/dodopayments/dodopayments-typescript/compare/v2.54.2...v2.55.0) (2026-10-14)


### Features

* **api:** payment service periods, retry attempts and subscription renewal payment_id ([93d61b6](https://github.com/dodopayments/dodopayments-typescript/commit/93d61b67767ba33ecd273ae39a4284b7f8249715))
* **api:** payment service periods, retry attempts and subscription renewal payment_id ([16ef1e2](https://github.com/dodopayments/dodopayments-typescript/commit/16ef1e25bdc79329ca105aa1afb264ca22a052f4))

## [2.54.2](https://github.com/dodopayments/dodopayments-typescript/compare/v2.54.1...v2.54.2) (2026-10-09)


### Bug Fixes

* **deps:** upgrade SDK toolchains (pnpm, TypeScript 7, Jest 30, zod 4, yargs 18) and stop cursor pagination on done ([24ba038](https://github.com/dodopayments/dodopayments-typescript/commit/24ba03877825df64a9cca0f2e92b99ba751e1574))
* **deps:** upgrade SDK toolchains (pnpm, TypeScript 7, Jest 30, zod 4, yargs 18) and stop cursor pagination on done ([5b54f93](https://github.com/dodopayments/dodopayments-typescript/commit/5b54f939e76ea84d06402fe0efb1b355ac9c9ba4))

## [2.54.1](https://github.com/dodopayments/dodopayments-typescript/compare/v2.54.0...v2.54.1) (2026-10-09)


### Bug Fixes

* **mcp-worker:** explicit readOnly/destructive/openWorld hints on every tool ([6588112](https://github.com/dodopayments/dodopayments-typescript/commit/658811279f450045a779f0435fe36f2f33404e5f))
* **mcp-worker:** explicit tool annotation hints for the OpenAI plugin directory ([e4e1cfe](https://github.com/dodopayments/dodopayments-typescript/commit/e4e1cfeffaecbac1c2aff57679e2716ae684f6dc))


### Chores

* restore yarn.lock ([9fa896b](https://github.com/dodopayments/dodopayments-typescript/commit/9fa896b9eba7c642b2737cb98e912434bba5a12f))


### Styles

* prettier ([84cfa34](https://github.com/dodopayments/dodopayments-typescript/commit/84cfa3429cb29a6268a9b3aa363b13f4d3dc1f74))

## [2.54.0](https://github.com/dodopayments/dodopayments-typescript/compare/v2.53.0...v2.54.0) (2026-10-06)


### Features

* **api:** change-plan cancel_older_payment_link and return_url ([f5aedc8](https://github.com/dodopayments/dodopayments-typescript/commit/f5aedc8edeaabbb3556062206b7769a8360e6f64))
* **api:** change-plan cancel_older_payment_link and return_url ([bdb6531](https://github.com/dodopayments/dodopayments-typescript/commit/bdb6531a64798d6ca7a36af85192f16c05b3d510))

## [2.53.0](https://github.com/dodopayments/dodopayments-typescript/compare/v2.52.0...v2.53.0) (2026-10-05)


### Features

* **api:** refund network references and subscription cancelled_by ([7d99bdc](https://github.com/dodopayments/dodopayments-typescript/commit/7d99bdc73e6ed6d3ed280bb78c9d21c632c0255b))
* **api:** refund network references and subscription cancelled_by ([fa6cef0](https://github.com/dodopayments/dodopayments-typescript/commit/fa6cef0e45d59f0b5dcba3b8c7c04485a73230c5))

## [2.52.0](https://github.com/dodopayments/dodopayments-typescript/compare/v2.51.0...v2.52.0) (2026-09-25)


### Features

* **api:** add moderation API and multi-subscription payments ([f913327](https://github.com/dodopayments/dodopayments-typescript/commit/f9133278affcfa11fdc1e32afdff20921e4f9436))
* **api:** add moderation API and multi-subscription payments ([76fad4a](https://github.com/dodopayments/dodopayments-typescript/commit/76fad4a1a4f0269c579553a435aa7404b350db3c))

## [2.51.0](https://github.com/dodopayments/dodopayments-typescript/compare/v2.50.0...v2.51.0) (2026-09-18)


### Features

* **api:** tax id checkout flag, ledger event types, email policy fields ([0c8ea44](https://github.com/dodopayments/dodopayments-typescript/commit/0c8ea4402ee53bad82295b61fb6d2268c6a018db))
* **api:** tax id checkout flag, ledger event types, email policy fields ([d2579a7](https://github.com/dodopayments/dodopayments-typescript/commit/d2579a781b0f83e3afc670d0a08ea48e36cc4814))


### Chores

* add Dependabot config for GitHub Actions ([8fa5e00](https://github.com/dodopayments/dodopayments-typescript/commit/8fa5e00d2421806939a299507851749ccf4af148))
* format dependabot.yml with prettier ([6357448](https://github.com/dodopayments/dodopayments-typescript/commit/63574481079e73e5fc35b09a8992e4871f3a4e78))

## [2.50.0](https://github.com/dodopayments/dodopayments-typescript/compare/v2.49.0...v2.50.0) (2026-09-10)


### Features

* **api:** add customer email logs ([47f487a](https://github.com/dodopayments/dodopayments-typescript/commit/47f487a7532135e05b22a60a71725215a975a4e4))
* **api:** add customer email logs ([af6d3fd](https://github.com/dodopayments/dodopayments-typescript/commit/af6d3fdfe7c823d4f4d093c9aa99657b2ebd667b))

## [2.49.0](https://github.com/dodopayments/dodopayments-typescript/compare/v2.48.0...v2.49.0) (2026-09-01)


### Features

* **api:** add customer blocklist and manual payment retry ([e8df789](https://github.com/dodopayments/dodopayments-typescript/commit/e8df7894e6896951abe055d3dd831f43311c1911))
* **api:** add customer blocklist and manual payment retry ([440f04c](https://github.com/dodopayments/dodopayments-typescript/commit/440f04c32550ed8ad53d63cc6e1d7cb480c14e10))

## [2.48.0](https://github.com/dodopayments/dodopayments-typescript/compare/v2.47.1...v2.48.0) (2026-08-24)


### Features

* **api:** return checkout handles from subscription change-plan ([7cca346](https://github.com/dodopayments/dodopayments-typescript/commit/7cca346f9552778014e78e30358c850a6a961136))
* **api:** return checkout handles from subscription change-plan ([4c5fe01](https://github.com/dodopayments/dodopayments-typescript/commit/4c5fe0120af9f2213143fd734457455d1e977997))

## [2.47.1](https://github.com/dodopayments/dodopayments-typescript/compare/v2.47.0...v2.47.1) (2026-08-24)


### Bug Fixes

* **docs:** add Dodo Payments security contact to SECURITY.md ([9394f70](https://github.com/dodopayments/dodopayments-typescript/commit/9394f702281b03479c8687352931340801606a54))

## [2.47.0](https://github.com/dodopayments/dodopayments-typescript/compare/v2.46.0...v2.47.0) (2026-08-17)


### Features

* **api:** add brand archive endpoint ([586f486](https://github.com/dodopayments/dodopayments-typescript/commit/586f486f11098ecaabfd5ed8ab883458bf05e83f))
* **api:** add brand archive endpoint ([45d47f4](https://github.com/dodopayments/dodopayments-typescript/commit/45d47f45c829652bdf48ce6151423ba0eabd8412))

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
