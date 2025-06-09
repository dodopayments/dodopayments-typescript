# Changelog

## 1.32.0 (2025-06-09)

Full Changelog: [v1.30.2...v1.32.0](https://github.com/dodopayments/dodopayments-node/compare/v1.30.2...v1.32.0)

### Features

* **api:** updated openapi spec to v1.32.0 ([7ceb3e7](https://github.com/dodopayments/dodopayments-node/commit/7ceb3e75b8d859ea2d7f5c8004fe7015dc852842))
* **mcp:** implement support for binary responses ([6c7bfef](https://github.com/dodopayments/dodopayments-node/commit/6c7bfef2203036e20b6b9af7fc2d414c6dacab42))

## 1.30.2 (2025-06-04)

Full Changelog: [v1.30.0...v1.30.2](https://github.com/dodopayments/dodopayments-node/compare/v1.30.0...v1.30.2)

### Features

* **api:** fixed openapi spec ([d4e2550](https://github.com/dodopayments/dodopayments-node/commit/d4e255020586557a8f834af37f2f56c8a7195b43))


### Chores

* **docs:** use top-level-await in example snippets ([cafdee2](https://github.com/dodopayments/dodopayments-node/commit/cafdee2532819b55cd0ebf89a51706507bf4c32f))

## 1.30.0 (2025-06-02)

Full Changelog: [v1.27.0...v1.30.0](https://github.com/dodopayments/dodopayments-node/compare/v1.27.0...v1.30.0)

### Features

* **api:** manual updates ([ef4f720](https://github.com/dodopayments/dodopayments-node/commit/ef4f7204bd534590706de090b9ad5ec71fd16ee8))
* **mcp:** include http information in tools ([afdcea8](https://github.com/dodopayments/dodopayments-node/commit/afdcea8dc743b8dcf8ef21a20689cf890573b936))


### Bug Fixes

* **mcp:** include description in dynamic tool search ([8ba2426](https://github.com/dodopayments/dodopayments-node/commit/8ba24264c8fc0c1e2eb456d1dde147f900da24ec))


### Chores

* improve publish-npm script --latest tag logic ([af7339c](https://github.com/dodopayments/dodopayments-node/commit/af7339c2afe0d7bdd016aa9002505188d0cf772d))
* **mcp:** remove duplicate assignment ([c685b50](https://github.com/dodopayments/dodopayments-node/commit/c685b50f407e976988b6ed0b8a9ed87a666c89d0))


### Documentation

* **pagination:** improve naming ([68f8a19](https://github.com/dodopayments/dodopayments-node/commit/68f8a199effe15d04ea0559916de5ade633afdbb))

## 1.27.0 (2025-05-26)

Full Changelog: [v1.25.0...v1.27.0](https://github.com/dodopayments/dodopayments-node/compare/v1.25.0...v1.27.0)

### Features

* **api:** added brands api in our sdk ([19c4592](https://github.com/dodopayments/dodopayments-node/commit/19c459298c508489d28777ca091a92ae11172f83))
* **api:** updated openapi spec to 1.27.0 ([dd3c5b5](https://github.com/dodopayments/dodopayments-node/commit/dd3c5b533e1724357f234c5cf1abc3a0b8d2a410))
* **mcp:** support initializing the server with an "environment" ([fab9bf1](https://github.com/dodopayments/dodopayments-node/commit/fab9bf17e50c8dbfe05e07a2c345e045a3b8d320))


### Bug Fixes

* **mcp:** fix cursor schema transformation issue with recursive references ([cae8015](https://github.com/dodopayments/dodopayments-node/commit/cae8015ffb291ec60a02fa65eb8a1fced3db70b7))


### Chores

* **docs:** grammar improvements ([cea6387](https://github.com/dodopayments/dodopayments-node/commit/cea6387d2d4ebace9551bd1565d6c9097c50a2a4))

## 1.25.0 (2025-05-17)

Full Changelog: [v1.22.0...v1.25.0](https://github.com/dodopayments/dodopayments-node/compare/v1.22.0...v1.25.0)

### Features

* **api:** updated openapi spec ([cb27d71](https://github.com/dodopayments/dodopayments-node/commit/cb27d718d2faccbe1d5636c73ab98246a21d2c55))
* **mcp:** support dynamically discovering and invoking tools for APIs with many endpoints ([ed124f7](https://github.com/dodopayments/dodopayments-node/commit/ed124f74107ad4352ae2bd88b4c56d9d65d668d2))


### Bug Fixes

* **mcp:** explicitly include zod and zod-to-json-schema in package.json ([487260a](https://github.com/dodopayments/dodopayments-node/commit/487260a023d319d98a7a53fd2f17ccc27a0c8115))


### Chores

* **build:** automatically build subpackages if present ([a324a69](https://github.com/dodopayments/dodopayments-node/commit/a324a693d1c3ceaabacf80970b203315c3db3259))
* **internal:** codegen related update ([50a6899](https://github.com/dodopayments/dodopayments-node/commit/50a6899676806c1ce8b64d17f13b120edf5fbf72))
* **tests:** use node 22 for CI tests ([b7aa91b](https://github.com/dodopayments/dodopayments-node/commit/b7aa91b4aabb0676412c8f38aabb2254712a18e1))

## 1.22.0 (2025-05-09)

Full Changelog: [v1.20.0...v1.22.0](https://github.com/dodopayments/dodopayments-node/compare/v1.20.0...v1.22.0)

### Features

* **api:** fixed api key schema to bearer ([0e6de1a](https://github.com/dodopayments/dodopayments-node/commit/0e6de1aa04dc734b3c9a8c669b2d47265ad4f055))
* **api:** manual updates ([e6ef7d2](https://github.com/dodopayments/dodopayments-node/commit/e6ef7d2ae5dab93c474708a1f5320a306288388a))
* **api:** updated openapi spec ([387911f](https://github.com/dodopayments/dodopayments-node/commit/387911fbb74050c3dd06e953bfcdb85a825ba642))


### Bug Fixes

* **mcp:** remove ajv dependency so MCP servers are more compatible with Cloudflare Workers ([6f88e63](https://github.com/dodopayments/dodopayments-node/commit/6f88e632a6f20955584aed3bb78191017ca75508))


### Chores

* **ci:** bump node version for release workflows ([9939000](https://github.com/dodopayments/dodopayments-node/commit/9939000e1d7e59a0af3cfa0251e5dc25256a5e69))
* **internal:** codegen related update ([89b1aae](https://github.com/dodopayments/dodopayments-node/commit/89b1aaefc7a9ce067de4203822fdf3d890418971))
* **internal:** codegen related update ([b39a15c](https://github.com/dodopayments/dodopayments-node/commit/b39a15cf6cc5c87c4b855eb12e22749dfe6ebdbd))
* **internal:** update dependency ([144c131](https://github.com/dodopayments/dodopayments-node/commit/144c1318c336ac715bd47ec94983803ca7d8dac7))


### Documentation

* add examples to tsdocs ([a134ade](https://github.com/dodopayments/dodopayments-node/commit/a134adef9ba75a6e62ed9da80d06a2935a7a4544))

## 1.20.0 (2025-05-01)

Full Changelog: [v1.19.0...v1.20.0](https://github.com/dodopayments/dodopayments-node/compare/v1.19.0...v1.20.0)

### Features

* **api:** added addons ([1e02684](https://github.com/dodopayments/dodopayments-node/commit/1e02684522d2e02e95995880a99856106977e24e))
* **api:** updated readme example ([eaa2425](https://github.com/dodopayments/dodopayments-node/commit/eaa24252f843775f237441d2371f22c8397057ef))
* **api:** updated readme example ([5e589ad](https://github.com/dodopayments/dodopayments-node/commit/5e589ad233c6724dc29ca56d6a673dae5c7caf4a))


### Documentation

* **readme:** fix typo ([a3357ea](https://github.com/dodopayments/dodopayments-node/commit/a3357ea1d18caf29afef209a287e9b87a9d5da9a))

## 1.19.0 (2025-04-30)

Full Changelog: [v1.18.3...v1.19.0](https://github.com/dodopayments/dodopayments-node/compare/v1.18.3...v1.19.0)

### Features

* **api:** manual updates ([14468c8](https://github.com/dodopayments/dodopayments-node/commit/14468c8512bbbc318608007aabce238a6d1f3a1d))
* more gracefully handle $refs and work around schema limitations ([ad64648](https://github.com/dodopayments/dodopayments-node/commit/ad646482ce60d96ae082d795ba917959a516657a))

## 1.18.3 (2025-04-25)

Full Changelog: [v1.18.1...v1.18.3](https://github.com/dodopayments/dodopayments-node/compare/v1.18.1...v1.18.3)

### Features

* **api:** manual updates ([8d9581f](https://github.com/dodopayments/dodopayments-node/commit/8d9581f9eb8596263bc34ba7871ce7b031761546))

## 1.18.1 (2025-04-24)

Full Changelog: [v1.18.0...v1.18.1](https://github.com/dodopayments/dodopayments-node/compare/v1.18.0...v1.18.1)

### Chores

* **ci:** only use depot for staging repos ([2b8cc0d](https://github.com/dodopayments/dodopayments-node/commit/2b8cc0d5d7b754ed4601dfb9143c10078b2867d6))
* **internal:** codegen related update ([1c3419c](https://github.com/dodopayments/dodopayments-node/commit/1c3419c9280a47c975a2c33426baefe2b6de76c4))

## 1.18.0 (2025-04-23)

Full Changelog: [v1.17.0...v1.18.0](https://github.com/dodopayments/dodopayments-node/compare/v1.17.0...v1.18.0)

### Features

* **api:** added change plan api ([b011a8d](https://github.com/dodopayments/dodopayments-node/commit/b011a8d66ddbb1a4b93a9e756f61de7d532835c7))
* **api:** manual updates ([8169c61](https://github.com/dodopayments/dodopayments-node/commit/8169c612f272b446783dc2403702266da6fedca4))


### Chores

* **ci:** add timeout thresholds for CI jobs ([868b836](https://github.com/dodopayments/dodopayments-node/commit/868b83655a0ef02edf81557ddc9f99fff6215c44))

## 1.17.0 (2025-04-22)

Full Changelog: [v1.16.1...v1.17.0](https://github.com/dodopayments/dodopayments-node/compare/v1.16.1...v1.17.0)

### Features

* **api:** manual updates ([d49b776](https://github.com/dodopayments/dodopayments-node/commit/d49b776209703a70508ddfa8e93440e9503e5a37))

## 1.16.1 (2025-04-18)

Full Changelog: [v1.14.1...v1.16.1](https://github.com/dodopayments/dodopayments-node/compare/v1.14.1...v1.16.1)

### Features

* **api:** manual updates ([ef93478](https://github.com/dodopayments/dodopayments-node/commit/ef934783eb972fa15429c4e2c38a2a9a6e2c09fd))

## 1.14.1 (2025-04-15)

Full Changelog: [v1.14.0...v1.14.1](https://github.com/dodopayments/dodopayments-node/compare/v1.14.0...v1.14.1)

### Chores

* **client:** minor internal fixes ([1455033](https://github.com/dodopayments/dodopayments-node/commit/1455033373190788bcfd6548c267cb5a983c8ecd))

## 1.14.0 (2025-04-11)

Full Changelog: [v1.13.0...v1.14.0](https://github.com/dodopayments/dodopayments-node/compare/v1.13.0...v1.14.0)

### Features

* **api:** fixed license key pagination issues in openapi spec ([1dd780f](https://github.com/dodopayments/dodopayments-node/commit/1dd780f589eb52eb55f030b0c86a504d1b269fe6))
* **api:** updated openapi spec ([b2d8c74](https://github.com/dodopayments/dodopayments-node/commit/b2d8c7434a63f075a2fcd802f6fbe1bf8e3c5187))


### Bug Fixes

* **mcp:** fix readEnv type error ([eea8bb0](https://github.com/dodopayments/dodopayments-node/commit/eea8bb0acf4df25b59f050497a6008ca88d839e2))
* **mcp:** include all necessary env vars in client instantiation ([017dc59](https://github.com/dodopayments/dodopayments-node/commit/017dc5984977620c49fa37412493831fa0932121))
* **mcp:** point homepage and repo for mcp package to the `packages/mcp-server` directory ([#116](https://github.com/dodopayments/dodopayments-node/issues/116)) ([1da6385](https://github.com/dodopayments/dodopayments-node/commit/1da63855b41b62dae90e7433ba382bab5a22412c))


### Chores

* **internal:** reduce CI branch coverage ([fffa272](https://github.com/dodopayments/dodopayments-node/commit/fffa27283218143b69abf7ce80c5b8dffe79837e))
* **internal:** upload builds and expand CI branch coverage ([7191c27](https://github.com/dodopayments/dodopayments-node/commit/7191c2763ac1e7d57620d0d208576e792f144fb8))

## 1.13.0 (2025-04-08)

Full Changelog: [v1.12.0...v1.13.0](https://github.com/dodopayments/dodopayments-node/compare/v1.12.0...v1.13.0)

### Features

* **api:** manual updates ([#113](https://github.com/dodopayments/dodopayments-node/issues/113)) ([e891a1b](https://github.com/dodopayments/dodopayments-node/commit/e891a1bb349845db6da1aefbfd78b16856fe4c56))

## 1.12.0 (2025-04-05)

Full Changelog: [v1.11.0...v1.12.0](https://github.com/dodopayments/dodopayments-node/compare/v1.11.0...v1.12.0)

### Bug Fixes

* **api:** improve type resolution when importing as a package ([#108](https://github.com/dodopayments/dodopayments-node/issues/108)) ([29668dc](https://github.com/dodopayments/dodopayments-node/commit/29668dc2a4c9e3b3cbd06b34119b41c751a0b87a))
* **client:** send `X-Stainless-Timeout` in seconds ([#106](https://github.com/dodopayments/dodopayments-node/issues/106)) ([36ecfdf](https://github.com/dodopayments/dodopayments-node/commit/36ecfdfc9558df804e8771ab36ce5f0ce08c7f1f))
* **mcp:** remove unused tools.ts ([#109](https://github.com/dodopayments/dodopayments-node/issues/109)) ([334197e](https://github.com/dodopayments/dodopayments-node/commit/334197e33b5bde9e2d406465cc3713f9919bc55f))


### Chores

* configure new SDK language ([#110](https://github.com/dodopayments/dodopayments-node/issues/110)) ([5f3e4c2](https://github.com/dodopayments/dodopayments-node/commit/5f3e4c2f683fe6f959064e867a206b46915f2703))
* **internal:** add aliases for Record and Array ([#107](https://github.com/dodopayments/dodopayments-node/issues/107)) ([fc97985](https://github.com/dodopayments/dodopayments-node/commit/fc97985e9ae649f33c6e94ef83b31a7967bc320c))

## 1.11.0 (2025-03-28)

Full Changelog: [v1.10.4...v1.11.0](https://github.com/dodopayments/dodopayments-node/compare/v1.10.4...v1.11.0)

### Features

* **api:** manual updates ([#102](https://github.com/dodopayments/dodopayments-node/issues/102)) ([48eecad](https://github.com/dodopayments/dodopayments-node/commit/48eecadd545df3676fa0ab1beea8b925cd04065a))

## 1.10.4 (2025-03-28)

Full Changelog: [v1.10.3...v1.10.4](https://github.com/dodopayments/dodopayments-node/compare/v1.10.3...v1.10.4)

### Bug Fixes

* **internal:** work around https://github.com/vercel/next.js/issues/76881 ([#99](https://github.com/dodopayments/dodopayments-node/issues/99)) ([4c12505](https://github.com/dodopayments/dodopayments-node/commit/4c12505acb178b79157981d9b23e8c4b48577121))

## 1.10.3 (2025-03-25)

Full Changelog: [v1.10.2...v1.10.3](https://github.com/dodopayments/dodopayments-node/compare/v1.10.2...v1.10.3)

### Features

* **api:** manual updates ([#96](https://github.com/dodopayments/dodopayments-node/issues/96)) ([23c1a4e](https://github.com/dodopayments/dodopayments-node/commit/23c1a4e38ddf68ee12b0f6b06b94781b59296d46))

## 1.10.2 (2025-03-22)

Full Changelog: [v1.10.1...v1.10.2](https://github.com/dodopayments/dodopayments-node/compare/v1.10.1...v1.10.2)

### Bug Fixes

* avoid type error in certain environments ([#93](https://github.com/dodopayments/dodopayments-node/issues/93)) ([64b5554](https://github.com/dodopayments/dodopayments-node/commit/64b55549efa34b6c2229d80339455f96ce4cd7b8))

## 1.10.1 (2025-03-21)

Full Changelog: [v1.7.1...v1.10.1](https://github.com/dodopayments/dodopayments-node/compare/v1.7.1...v1.10.1)

### Features

* **api:** updated openapispec to v1.10.1 ([#90](https://github.com/dodopayments/dodopayments-node/issues/90)) ([ece5da1](https://github.com/dodopayments/dodopayments-node/commit/ece5da1e5ce4911aba8ba80030dd74fb6c7d8388))

## 1.7.1 (2025-03-20)

Full Changelog: [v1.7.0...v1.7.1](https://github.com/dodopayments/dodopayments-node/compare/v1.7.0...v1.7.1)

### Chores

* **exports:** cleaner resource index imports ([#85](https://github.com/dodopayments/dodopayments-node/issues/85)) ([cd192bd](https://github.com/dodopayments/dodopayments-node/commit/cd192bd2a53640b91f57023bb4910dfdffc9a5e8))
* **exports:** stop using path fallbacks ([#87](https://github.com/dodopayments/dodopayments-node/issues/87)) ([0573909](https://github.com/dodopayments/dodopayments-node/commit/0573909b4b60a5e9ac8aca7e337c49577c327984))

## 1.7.0 (2025-03-14)

Full Changelog: [v1.6.3...v1.7.0](https://github.com/dodopayments/dodopayments-node/compare/v1.6.3...v1.7.0)

### Features

* **api:** added jsr publishing ([#80](https://github.com/dodopayments/dodopayments-node/issues/80)) ([b1040ec](https://github.com/dodopayments/dodopayments-node/commit/b1040ec22d840493db2e9fa6d0ca75495b69b4e0))
* **api:** fixed openapi spec issues ([#83](https://github.com/dodopayments/dodopayments-node/issues/83)) ([a05a6ff](https://github.com/dodopayments/dodopayments-node/commit/a05a6ff42da3d036aa7d6c5a8ce8409b432b9811))
* **api:** reverted jsr publishing ([#81](https://github.com/dodopayments/dodopayments-node/issues/81)) ([44cce37](https://github.com/dodopayments/dodopayments-node/commit/44cce37d7d6fa1beb28695693b579fe870f88bcf))

## 1.6.3 (2025-03-14)

Full Changelog: [v1.5.1...v1.6.3](https://github.com/dodopayments/dodopayments-node/compare/v1.5.1...v1.6.3)

### Features

* **api:** openapi spec updated ([#77](https://github.com/dodopayments/dodopayments-node/issues/77)) ([683d65e](https://github.com/dodopayments/dodopayments-node/commit/683d65e3f8bdcad333a4fcca2d6206095ebadaf0))
* **api:** updated stainless config ([#78](https://github.com/dodopayments/dodopayments-node/issues/78)) ([f5c0a0c](https://github.com/dodopayments/dodopayments-node/commit/f5c0a0cba2037616c86bfafd755cc6af992ab5af))


### Bug Fixes

* **exports:** ensure resource imports don't require /index ([#76](https://github.com/dodopayments/dodopayments-node/issues/76)) ([81670db](https://github.com/dodopayments/dodopayments-node/commit/81670db550b5c7c5fc9245e7415a338fa06fc826))


### Chores

* **internal:** remove extra empty newlines ([#74](https://github.com/dodopayments/dodopayments-node/issues/74)) ([74fa335](https://github.com/dodopayments/dodopayments-node/commit/74fa33567318e4c36a44c4ee6fd3910a176249e6))

## 1.5.1 (2025-03-12)

Full Changelog: [v1.5.0...v1.5.1](https://github.com/dodopayments/dodopayments-node/compare/v1.5.0...v1.5.1)

### Chores

* **internal:** codegen related update ([#71](https://github.com/dodopayments/dodopayments-node/issues/71)) ([0161d2c](https://github.com/dodopayments/dodopayments-node/commit/0161d2cbfcd68ba4aa16168278a31b286cba2df2))

## 1.5.0 (2025-03-07)

Full Changelog: [v1.0.0...v1.5.0](https://github.com/dodopayments/dodopayments-node/compare/v1.0.0...v1.5.0)

### Features

* **api:** manual updates ([#69](https://github.com/dodopayments/dodopayments-node/issues/69)) ([34a3570](https://github.com/dodopayments/dodopayments-node/commit/34a35708f68a7927d6f1002914f4635e1eb510ef))


### Documentation

* update URLs from stainlessapi.com to stainless.com ([#66](https://github.com/dodopayments/dodopayments-node/issues/66)) ([04fbf67](https://github.com/dodopayments/dodopayments-node/commit/04fbf678cde877da571244736f59eec72e0ebd15))

## 1.0.0 (2025-02-23)

Full Changelog: [v0.24.0...v1.0.0](https://github.com/dodopayments/dodopayments-node/compare/v0.24.0...v1.0.0)

### Features

* **api:** fixed errors ([#64](https://github.com/dodopayments/dodopayments-node/issues/64)) ([0ee82e8](https://github.com/dodopayments/dodopayments-node/commit/0ee82e8cf82b3127bba42a15a339a98ed000d476))
* **api:** updated config and updated version to v1.0.0 ([#63](https://github.com/dodopayments/dodopayments-node/issues/63)) ([ce72618](https://github.com/dodopayments/dodopayments-node/commit/ce72618ac47231097a13546ab60c2847b4e376e0))


### Chores

* **internal:** fix devcontainers setup ([#61](https://github.com/dodopayments/dodopayments-node/issues/61)) ([f43773f](https://github.com/dodopayments/dodopayments-node/commit/f43773f625c1b6d108c28932583aba723f12cd6f))

## 0.24.0 (2025-02-15)

Full Changelog: [v0.22.1...v0.24.0](https://github.com/dodopayments/dodopayments-node/compare/v0.22.1...v0.24.0)

### Features

* **api:** added discount apis ([#59](https://github.com/dodopayments/dodopayments-node/issues/59)) ([ca80ada](https://github.com/dodopayments/dodopayments-node/commit/ca80adaca0ff61a27dcc3024b7e2e985794e3ee0))
* **api:** openapi spec changes ([#58](https://github.com/dodopayments/dodopayments-node/issues/58)) ([fcbf145](https://github.com/dodopayments/dodopayments-node/commit/fcbf145b5039593e6e2dd357947ea970fa77829a))


### Bug Fixes

* **client:** fix export map for index exports ([#56](https://github.com/dodopayments/dodopayments-node/issues/56)) ([87b98a3](https://github.com/dodopayments/dodopayments-node/commit/87b98a3818629e79eb6f2256335eaa4c04a12bc6))

## 0.22.1 (2025-02-11)

Full Changelog: [v0.22.0...v0.22.1](https://github.com/dodopayments/dodopayments-node/compare/v0.22.0...v0.22.1)

### Features

* **api:** manual updates ([#53](https://github.com/dodopayments/dodopayments-node/issues/53)) ([14fa4a1](https://github.com/dodopayments/dodopayments-node/commit/14fa4a155be4f7a973033aefe43a2fc1b132e16a))

## 0.22.0 (2025-02-06)

Full Changelog: [v0.20.1...v0.22.0](https://github.com/dodopayments/dodopayments-node/compare/v0.20.1...v0.22.0)

### Features

* **api:** updated API changes for v0.22.0 ([#51](https://github.com/dodopayments/dodopayments-node/issues/51)) ([d57dec3](https://github.com/dodopayments/dodopayments-node/commit/d57dec3b32be9e3e3e4642a205cae69fe33268f0))
* **client:** send `X-Stainless-Timeout` header ([#49](https://github.com/dodopayments/dodopayments-node/issues/49)) ([432c959](https://github.com/dodopayments/dodopayments-node/commit/432c959909f8e918c387e34a6d4bcb0b70715699))

## 0.20.1 (2025-01-29)

Full Changelog: [v0.19.0...v0.20.1](https://github.com/dodopayments/dodopayments-node/compare/v0.19.0...v0.20.1)

### Features

* **api:** manual updates ([#45](https://github.com/dodopayments/dodopayments-node/issues/45)) ([47bc3a3](https://github.com/dodopayments/dodopayments-node/commit/47bc3a3fdf3de7486b7b8b3bfb15cd5d27226ab0))

## 0.19.0 (2025-01-23)

Full Changelog: [v0.18.0...v0.19.0](https://github.com/dodopayments/dodopayments-node/compare/v0.18.0...v0.19.0)

### Features

* **api:** added archive product api ([#39](https://github.com/dodopayments/dodopayments-node/issues/39)) ([809b126](https://github.com/dodopayments/dodopayments-node/commit/809b126784c606a9fb53863e86efd2268aecb22b))
* **api:** manual updates ([#42](https://github.com/dodopayments/dodopayments-node/issues/42)) ([ff0ba1c](https://github.com/dodopayments/dodopayments-node/commit/ff0ba1cb350db1ac74cd1fce98e1f1d9362306c2))
* **api:** manual updates ([#43](https://github.com/dodopayments/dodopayments-node/issues/43)) ([414cf72](https://github.com/dodopayments/dodopayments-node/commit/414cf724ea2903ed69d3240ccd942fb5f3606121))


### Chores

* **internal:** add test ([#41](https://github.com/dodopayments/dodopayments-node/issues/41)) ([c34b584](https://github.com/dodopayments/dodopayments-node/commit/c34b584d916f115cfb3e991fe9fb1cc8d5bc59f4))

## 0.18.0 (2025-01-20)

Full Changelog: [v0.17.0...v0.18.0](https://github.com/dodopayments/dodopayments-node/compare/v0.17.0...v0.18.0)

### Features

* **api:** updated openapi sepc ([#38](https://github.com/dodopayments/dodopayments-node/issues/38)) ([9682295](https://github.com/dodopayments/dodopayments-node/commit/96822951e14f7183a3375769cf1ef26877bc7d58))


### Chores

* **internal:** codegen related update ([#36](https://github.com/dodopayments/dodopayments-node/issues/36)) ([b954c61](https://github.com/dodopayments/dodopayments-node/commit/b954c61dfb4795c48fb6a8ff187a60320fe008b7))

## 0.17.0 (2025-01-16)

Full Changelog: [v0.16.1...v0.17.0](https://github.com/dodopayments/dodopayments-node/compare/v0.16.1...v0.17.0)

### Features

* **api:** added filter apis ([#33](https://github.com/dodopayments/dodopayments-node/issues/33)) ([0f7e77a](https://github.com/dodopayments/dodopayments-node/commit/0f7e77aa66dbc79df5718453e07287e264e5c471))

## 0.16.1 (2025-01-11)

Full Changelog: [v0.15.1...v0.16.1](https://github.com/dodopayments/dodopayments-node/compare/v0.15.1...v0.16.1)

### Features

* **api:** updated openapi spec ([#31](https://github.com/dodopayments/dodopayments-node/issues/31)) ([871b563](https://github.com/dodopayments/dodopayments-node/commit/871b5633328c91c510f98eaedf25593d010f30a4))


### Chores

* **internal:** change formatting ([#30](https://github.com/dodopayments/dodopayments-node/issues/30)) ([03737c3](https://github.com/dodopayments/dodopayments-node/commit/03737c3da27ac25c0250abfea2adf2a69a738abf))
* **internal:** codegen related update ([#28](https://github.com/dodopayments/dodopayments-node/issues/28)) ([2d46103](https://github.com/dodopayments/dodopayments-node/commit/2d461037e47846a19e9a48377c3a165140c0b424))

## 0.15.1 (2025-01-03)

Full Changelog: [v0.14.1...v0.15.1](https://github.com/dodopayments/dodopayments-node/compare/v0.14.1...v0.15.1)

### Features

* **api:** added invoice api and update openapi spec ([#26](https://github.com/dodopayments/dodopayments-node/issues/26)) ([1c3ecfa](https://github.com/dodopayments/dodopayments-node/commit/1c3ecfa0e702fe6ec5013f385999aefcb89664d5))


### Chores

* **internal:** codegen related update ([#24](https://github.com/dodopayments/dodopayments-node/issues/24)) ([37ceb8a](https://github.com/dodopayments/dodopayments-node/commit/37ceb8af59343cec5979074f2983f8382e61f19a))

## 0.14.1 (2024-12-29)

Full Changelog: [v0.14.0...v0.14.1](https://github.com/dodopayments/dodopayments-node/compare/v0.14.0...v0.14.1)

### Features

* **api:** manual updates ([#21](https://github.com/dodopayments/dodopayments-node/issues/21)) ([a97c2e1](https://github.com/dodopayments/dodopayments-node/commit/a97c2e1f7660fad78220af356041dead9a03a4f8))

## 0.14.0 (2024-12-25)

Full Changelog: [v0.13.2...v0.14.0](https://github.com/dodopayments/dodopayments-node/compare/v0.13.2...v0.14.0)

### Features

* **api:** updated openapi spec for License Keys ([#18](https://github.com/dodopayments/dodopayments-node/issues/18)) ([cf81c5d](https://github.com/dodopayments/dodopayments-node/commit/cf81c5d12aadb61fcdc933341c4089bbfd04739a))

## 0.13.2 (2024-12-21)

Full Changelog: [v0.12.0...v0.13.2](https://github.com/dodopayments/dodopayments-node/compare/v0.12.0...v0.13.2)

### Bug Fixes

* **client:** normalize method ([#15](https://github.com/dodopayments/dodopayments-node/issues/15)) ([44ff1cd](https://github.com/dodopayments/dodopayments-node/commit/44ff1cd212e3c4cbb920a76cb0471f3490e35d47))


### Chores

* **internal:** codegen related update ([#16](https://github.com/dodopayments/dodopayments-node/issues/16)) ([4cfac0c](https://github.com/dodopayments/dodopayments-node/commit/4cfac0c19d65136f19efcf26d1174d52a64517ab))
* **internal:** fix some typos ([#13](https://github.com/dodopayments/dodopayments-node/issues/13)) ([d419e43](https://github.com/dodopayments/dodopayments-node/commit/d419e432fd48f5dbfe92c7da082d9bb13283e2c8))

## 0.12.0 (2024-12-17)

Full Changelog: [v0.11.1...v0.12.0](https://github.com/dodopayments/dodopayments-node/compare/v0.11.1...v0.12.0)

### Features

* **api:** api update ([#9](https://github.com/dodopayments/dodopayments-node/issues/9)) ([eb67c8c](https://github.com/dodopayments/dodopayments-node/commit/eb67c8c159e56a2123915397279d47c93541e349))
* **api:** updated openapi methods ([#11](https://github.com/dodopayments/dodopayments-node/issues/11)) ([bb5d991](https://github.com/dodopayments/dodopayments-node/commit/bb5d991c1341b3fb6f92a4ada2ad5b06778023ae))

## 0.11.1 (2024-12-16)

Full Changelog: [v0.11.0...v0.11.1](https://github.com/dodopayments/dodopayments-node/compare/v0.11.0...v0.11.1)

### Features

* **api:** manual updates ([#6](https://github.com/dodopayments/dodopayments-node/issues/6)) ([3f7895c](https://github.com/dodopayments/dodopayments-node/commit/3f7895c88c11962bd4f63c63f561b5f82768a5bc))

## 0.11.0 (2024-12-16)

Full Changelog: [v0.0.1-alpha.0...v0.11.0](https://github.com/dodopayments/dodopayments-node/compare/v0.0.1-alpha.0...v0.11.0)

### Features

* **api:** update via SDK Studio ([3c8c120](https://github.com/dodopayments/dodopayments-node/commit/3c8c1207491653be794ef19f6c88685ea9ea25fc))
* **api:** update via SDK Studio ([2187350](https://github.com/dodopayments/dodopayments-node/commit/21873500053ab57c7e6896794f19cb02dd8f6ef2))
* **api:** update via SDK Studio ([b6a4997](https://github.com/dodopayments/dodopayments-node/commit/b6a4997533b095682c53b3cad7d45511989c0660))
* **api:** update via SDK Studio ([e7ee0bd](https://github.com/dodopayments/dodopayments-node/commit/e7ee0bd60f63a0d616546058c095b403d55e75ea))
* **api:** update via SDK Studio ([e69d96d](https://github.com/dodopayments/dodopayments-node/commit/e69d96d3f52a8b4de4cd59a2ee844d518335316d))
* **api:** update via SDK Studio ([cd1786f](https://github.com/dodopayments/dodopayments-node/commit/cd1786fb59450d77997302593a67f208652701ea))
* **api:** update via SDK Studio ([2b8c5a2](https://github.com/dodopayments/dodopayments-node/commit/2b8c5a21824a80d4cd8967b9e30464037cbca83a))
* **api:** update via SDK Studio ([ecd2ce8](https://github.com/dodopayments/dodopayments-node/commit/ecd2ce841aca90eb6853c6d96d734f6bde19b792))


### Chores

* go live ([#1](https://github.com/dodopayments/dodopayments-node/issues/1)) ([0ee38c7](https://github.com/dodopayments/dodopayments-node/commit/0ee38c7ef6ab3bb8057711aeeee1ddb381805775))
* update SDK settings ([#3](https://github.com/dodopayments/dodopayments-node/issues/3)) ([99f2b94](https://github.com/dodopayments/dodopayments-node/commit/99f2b94294e5b5dd5dc6eed57244b1b976858adf))
