// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import MiniSearch from 'minisearch';
import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import { getLogger } from './logger';

type PerLanguageData = {
  method?: string;
  example?: string;
};

type MethodEntry = {
  name: string;
  endpoint: string;
  httpMethod: string;
  summary: string;
  description: string;
  stainlessPath: string;
  qualified: string;
  params?: string[];
  response?: string;
  markdown?: string;
  perLanguage?: Record<string, PerLanguageData>;
};

type ProseChunk = {
  content: string;
  tag: string;
  sectionContext?: string;
  source?: string;
};

type MiniSearchDocument = {
  id: string;
  kind: 'http_method' | 'prose';
  name?: string;
  endpoint?: string;
  summary?: string;
  description?: string;
  qualified?: string;
  stainlessPath?: string;
  content?: string;
  sectionContext?: string;
  _original: Record<string, unknown>;
};

type SearchResult = {
  results: (string | Record<string, unknown>)[];
};

const EMBEDDED_METHODS: MethodEntry[] = [
  {
    name: 'create',
    endpoint: '/checkouts',
    httpMethod: 'post',
    summary: '',
    description: '',
    stainlessPath: '(resource) checkout_sessions > (method) create',
    qualified: 'client.checkoutSessions.create',
    params: [
      'product_cart: { product_id: string; quantity: number; addons?: { addon_id: string; quantity: number; }[]; amount?: number; }[];',
      'allowed_payment_method_types?: string[];',
      'billing_address?: { country: string; city?: string; state?: string; street?: string; zipcode?: string; };',
      'billing_currency?: string;',
      'cancel_url?: string;',
      'confirm?: boolean;',
      "custom_fields?: { field_type: 'text' | 'number' | 'email' | 'url' | 'date' | 'dropdown' | 'boolean'; key: string; label: string; options?: string[]; placeholder?: string; required?: boolean; }[];",
      'customer?: { customer_id: string; } | { email: string; name?: string; phone_number?: string; };',
      "customization?: { force_language?: string; show_on_demand_tag?: boolean; show_order_details?: boolean; theme?: 'dark' | 'light' | 'system'; theme_config?: { dark?: theme_mode_config; font_primary_url?: string; font_secondary_url?: string; font_size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'; font_weight?: 'normal' | 'medium' | 'bold' | 'extraBold'; light?: theme_mode_config; pay_button_text?: string; radius?: string; }; };",
      'discount_code?: string;',
      'feature_flags?: { allow_currency_selection?: boolean; allow_customer_editing_city?: boolean; allow_customer_editing_country?: boolean; allow_customer_editing_email?: boolean; allow_customer_editing_name?: boolean; allow_customer_editing_state?: boolean; allow_customer_editing_street?: boolean; allow_customer_editing_tax_id?: boolean; allow_customer_editing_zipcode?: boolean; allow_discount_code?: boolean; allow_phone_number_collection?: boolean; allow_tax_id?: boolean; always_create_new_customer?: boolean; redirect_immediately?: boolean; };',
      'force_3ds?: boolean;',
      'metadata?: object;',
      'minimal_address?: boolean;',
      'payment_method_id?: string;',
      'product_collection_id?: string;',
      'return_url?: string;',
      'short_link?: boolean;',
      'show_saved_payment_methods?: boolean;',
      'subscription_data?: { on_demand?: { mandate_only: boolean; adaptive_currency_fees_inclusive?: boolean; product_currency?: currency; product_description?: string; product_price?: number; }; trial_period_days?: number; };',
      'tax_id?: string;',
    ],
    response: '{ session_id: string; checkout_url?: string; }',
    markdown:
      "## create\n\n`client.checkoutSessions.create(product_cart: { product_id: string; quantity: number; addons?: attach_addon[]; amount?: number; }[], allowed_payment_method_types?: string[], billing_address?: { country: country_code; city?: string; state?: string; street?: string; zipcode?: string; }, billing_currency?: string, cancel_url?: string, confirm?: boolean, custom_fields?: { field_type: 'text' | 'number' | 'email' | 'url' | 'date' | 'dropdown' | 'boolean'; key: string; label: string; options?: string[]; placeholder?: string; required?: boolean; }[], customer?: object | object, customization?: { force_language?: string; show_on_demand_tag?: boolean; show_order_details?: boolean; theme?: 'dark' | 'light' | 'system'; theme_config?: theme_config; }, discount_code?: string, feature_flags?: { allow_currency_selection?: boolean; allow_customer_editing_city?: boolean; allow_customer_editing_country?: boolean; allow_customer_editing_email?: boolean; allow_customer_editing_name?: boolean; allow_customer_editing_state?: boolean; allow_customer_editing_street?: boolean; allow_customer_editing_tax_id?: boolean; allow_customer_editing_zipcode?: boolean; allow_discount_code?: boolean; allow_phone_number_collection?: boolean; allow_tax_id?: boolean; always_create_new_customer?: boolean; redirect_immediately?: boolean; }, force_3ds?: boolean, metadata?: object, minimal_address?: boolean, payment_method_id?: string, product_collection_id?: string, return_url?: string, short_link?: boolean, show_saved_payment_methods?: boolean, subscription_data?: { on_demand?: on_demand_subscription; trial_period_days?: number; }, tax_id?: string): { session_id: string; checkout_url?: string; }`\n\n**post** `/checkouts`\n\n### Parameters\n\n- `product_cart: { product_id: string; quantity: number; addons?: { addon_id: string; quantity: number; }[]; amount?: number; }[]`\n\n- `allowed_payment_method_types?: string[]`\n  Customers will never see payment methods that are not in this list.\nHowever, adding a method here does not guarantee customers will see it.\nAvailability still depends on other factors (e.g., customer location, merchant settings).\n\nDisclaimar: Always provide 'credit' and 'debit' as a fallback.\nIf all payment methods are unavailable, checkout session will fail.\n\n- `billing_address?: { country: string; city?: string; state?: string; street?: string; zipcode?: string; }`\n  Billing address information for the session\n  - `country: string`\n    Two-letter ISO country code (ISO 3166-1 alpha-2)\n  - `city?: string`\n    City name\n  - `state?: string`\n    State or province name\n  - `street?: string`\n    Street address including house number and unit/apartment if applicable\n  - `zipcode?: string`\n    Postal code or ZIP code\n\n- `billing_currency?: string`\n  This field is ingored if adaptive pricing is disabled\n\n- `cancel_url?: string`\n  The URL to redirect the customer if they cancel or go back from the checkout.\nIf not provided, the back button will not be displayed.\n\n- `confirm?: boolean`\n  If confirm is true, all the details will be finalized. If required data is missing, an API error is thrown.\n\n- `custom_fields?: { field_type: 'text' | 'number' | 'email' | 'url' | 'date' | 'dropdown' | 'boolean'; key: string; label: string; options?: string[]; placeholder?: string; required?: boolean; }[]`\n  Custom fields to collect from customer during checkout (max 5 fields)\n\n- `customer?: { customer_id: string; } | { email: string; name?: string; phone_number?: string; }`\n  Customer details for the session\n\n- `customization?: { force_language?: string; show_on_demand_tag?: boolean; show_order_details?: boolean; theme?: 'dark' | 'light' | 'system'; theme_config?: { dark?: theme_mode_config; font_primary_url?: string; font_secondary_url?: string; font_size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'; font_weight?: 'normal' | 'medium' | 'bold' | 'extraBold'; light?: theme_mode_config; pay_button_text?: string; radius?: string; }; }`\n  Customization for the checkout session page\n  - `force_language?: string`\n    Force the checkout interface to render in a specific language (e.g. `en`, `es`)\n  - `show_on_demand_tag?: boolean`\n    Show on demand tag\n\nDefault is true\n  - `show_order_details?: boolean`\n    Show order details by default\n\nDefault is true\n  - `theme?: 'dark' | 'light' | 'system'`\n    Theme of the page (determines which mode - light/dark/system - to use)\n\nIf not provided, uses the business-configured theme from business_themes table.\n  - `theme_config?: { dark?: { bg_primary?: string; bg_secondary?: string; border_primary?: string; border_secondary?: string; button_primary?: string; button_primary_hover?: string; button_secondary?: string; button_secondary_hover?: string; button_text_primary?: string; button_text_secondary?: string; input_focus_border?: string; text_error?: string; text_placeholder?: string; text_primary?: string; text_secondary?: string; text_success?: string; }; font_primary_url?: string; font_secondary_url?: string; font_size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'; font_weight?: 'normal' | 'medium' | 'bold' | 'extraBold'; light?: { bg_primary?: string; bg_secondary?: string; border_primary?: string; border_secondary?: string; button_primary?: string; button_primary_hover?: string; button_secondary?: string; button_secondary_hover?: string; button_text_primary?: string; button_text_secondary?: string; input_focus_border?: string; text_error?: string; text_placeholder?: string; text_primary?: string; text_secondary?: string; text_success?: string; }; pay_button_text?: string; radius?: string; }`\n    Optional custom theme configuration with colors for light and dark modes\n\n- `discount_code?: string`\n\n- `feature_flags?: { allow_currency_selection?: boolean; allow_customer_editing_city?: boolean; allow_customer_editing_country?: boolean; allow_customer_editing_email?: boolean; allow_customer_editing_name?: boolean; allow_customer_editing_state?: boolean; allow_customer_editing_street?: boolean; allow_customer_editing_tax_id?: boolean; allow_customer_editing_zipcode?: boolean; allow_discount_code?: boolean; allow_phone_number_collection?: boolean; allow_tax_id?: boolean; always_create_new_customer?: boolean; redirect_immediately?: boolean; }`\n  - `allow_currency_selection?: boolean`\n    if customer is allowed to change currency, set it to true\n\nDefault is true\n  - `allow_customer_editing_city?: boolean`\n  - `allow_customer_editing_country?: boolean`\n  - `allow_customer_editing_email?: boolean`\n  - `allow_customer_editing_name?: boolean`\n  - `allow_customer_editing_state?: boolean`\n  - `allow_customer_editing_street?: boolean`\n  - `allow_customer_editing_tax_id?: boolean`\n  - `allow_customer_editing_zipcode?: boolean`\n  - `allow_discount_code?: boolean`\n    If the customer is allowed to apply discount code, set it to true.\n\nDefault is true\n  - `allow_phone_number_collection?: boolean`\n    If phone number is collected from customer, set it to rue\n\nDefault is true\n  - `allow_tax_id?: boolean`\n    If the customer is allowed to add tax id, set it to true\n\nDefault is true\n  - `always_create_new_customer?: boolean`\n    Set to true if a new customer object should be created.\nBy default email is used to find an existing customer to attach the session to\n\nDefault is false\n  - `redirect_immediately?: boolean`\n    If true, redirects the customer immediately after payment completion\n\nDefault is false\n\n- `force_3ds?: boolean`\n  Override merchant default 3DS behaviour for this session\n\n- `metadata?: object`\n  Additional metadata associated with the payment. Defaults to empty if not provided.\n\n- `minimal_address?: boolean`\n  If true, only zipcode is required when confirm is true; other address fields remain optional\n\n- `payment_method_id?: string`\n  Optional payment method ID to use for this checkout session.\nOnly allowed when `confirm` is true.\nIf provided, existing customer id must also be provided.\n\n- `product_collection_id?: string`\n  Product collection ID for collection-based checkout flow\n\n- `return_url?: string`\n  The url to redirect after payment failure or success.\n\n- `short_link?: boolean`\n  If true, returns a shortened checkout URL.\nDefaults to false if not specified.\n\n- `show_saved_payment_methods?: boolean`\n  Display saved payment methods of a returning customer False by default\n\n- `subscription_data?: { on_demand?: { mandate_only: boolean; adaptive_currency_fees_inclusive?: boolean; product_currency?: currency; product_description?: string; product_price?: number; }; trial_period_days?: number; }`\n  - `on_demand?: { mandate_only: boolean; adaptive_currency_fees_inclusive?: boolean; product_currency?: string; product_description?: string; product_price?: number; }`\n  - `trial_period_days?: number`\n    Optional trial period in days If specified, this value overrides the trial period set in the product's price Must be between 0 and 10000 days\n\n- `tax_id?: string`\n  Tax ID for the customer (e.g. VAT number). Requires billing_address with country.\n\n### Returns\n\n- `{ session_id: string; checkout_url?: string; }`\n\n  - `session_id: string`\n  - `checkout_url?: string`\n\n### Example\n\n```typescript\nimport DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments();\n\nconst checkoutSessionResponse = await client.checkoutSessions.create({ product_cart: [{ product_id: 'product_id', quantity: 0 }] });\n\nconsole.log(checkoutSessionResponse);\n```",
    perLanguage: {
      cli: {
        method: 'checkout_sessions create',
        example:
          "dodo-payments-cli checkout-sessions create \\\n  --bearer-token 'My Bearer Token' \\\n  --product-cart '{product_id: product_id, quantity: 0}'",
      },
      csharp: {
        method: 'CheckoutSessions.Create',
        example:
          'CheckoutSessionCreateParams parameters = new()\n{\n    ProductCart =\n    [\n        new()\n        {\n            ProductID = "product_id",\n            Quantity = 0,\n            Addons =\n            [\n                new()\n                {\n                    AddonID = "addon_id",\n                    Quantity = 0,\n                },\n            ],\n            Amount = 0,\n        },\n    ],\n};\n\nvar checkoutSessionResponse = await client.CheckoutSessions.Create(parameters);\n\nConsole.WriteLine(checkoutSessionResponse);',
      },
      go: {
        method: 'client.CheckoutSessions.New',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/dodopayments/dodopayments-go"\n\t"github.com/dodopayments/dodopayments-go/option"\n)\n\nfunc main() {\n\tclient := dodopayments.NewClient(\n\t\toption.WithBearerToken("My Bearer Token"),\n\t)\n\tcheckoutSessionResponse, err := client.CheckoutSessions.New(context.TODO(), dodopayments.CheckoutSessionNewParams{\n\t\tCheckoutSessionRequest: dodopayments.CheckoutSessionRequestParam{\n\t\t\tProductCart: dodopayments.F([]dodopayments.ProductItemReqParam{{\n\t\t\t\tProductID: dodopayments.F("product_id"),\n\t\t\t\tQuantity:  dodopayments.F(int64(0)),\n\t\t\t}}),\n\t\t},\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", checkoutSessionResponse.SessionID)\n}\n',
      },
      http: {
        example:
          'curl https://live.dodopayments.com/checkouts \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $DODO_PAYMENTS_API_KEY" \\\n    -d \'{\n          "product_cart": [\n            {\n              "product_id": "product_id",\n              "quantity": 0\n            }\n          ]\n        }\'',
      },
      java: {
        method: 'checkoutSessions().create',
        example:
          'package com.dodopayments.api.example;\n\nimport com.dodopayments.api.client.DodoPaymentsClient;\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient;\nimport com.dodopayments.api.models.checkoutsessions.CheckoutSessionCreateParams;\nimport com.dodopayments.api.models.checkoutsessions.CheckoutSessionRequest;\nimport com.dodopayments.api.models.checkoutsessions.CheckoutSessionResponse;\nimport com.dodopayments.api.models.checkoutsessions.ProductItemReq;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        DodoPaymentsClient client = DodoPaymentsOkHttpClient.fromEnv();\n\n        CheckoutSessionRequest params = CheckoutSessionRequest.builder()\n            .addProductCart(ProductItemReq.builder()\n                .productId("product_id")\n                .quantity(0)\n                .build())\n            .build();\n        CheckoutSessionResponse checkoutSessionResponse = client.checkoutSessions().create(params);\n    }\n}',
      },
      kotlin: {
        method: 'checkoutSessions().create',
        example:
          'package com.dodopayments.api.example\n\nimport com.dodopayments.api.client.DodoPaymentsClient\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient\nimport com.dodopayments.api.models.checkoutsessions.CheckoutSessionCreateParams\nimport com.dodopayments.api.models.checkoutsessions.CheckoutSessionRequest\nimport com.dodopayments.api.models.checkoutsessions.CheckoutSessionResponse\nimport com.dodopayments.api.models.checkoutsessions.ProductItemReq\n\nfun main() {\n    val client: DodoPaymentsClient = DodoPaymentsOkHttpClient.fromEnv()\n\n    val params: CheckoutSessionRequest = CheckoutSessionRequest.builder()\n        .addProductCart(ProductItemReq.builder()\n            .productId("product_id")\n            .quantity(0)\n            .build())\n        .build()\n    val checkoutSessionResponse: CheckoutSessionResponse = client.checkoutSessions().create(params)\n}',
      },
      php: {
        method: 'checkoutSessions->create',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(bearerToken: 'My Bearer Token', environment: 'test_mode');\n\n$checkoutSessionResponse = $client->checkoutSessions->create(\n  productCart: [\n    [\n      'productID' => 'product_id',\n      'quantity' => 0,\n      'addons' => [['addonID' => 'addon_id', 'quantity' => 0]],\n      'amount' => 0,\n    ],\n  ],\n  allowedPaymentMethodTypes: [PaymentMethodTypes::ACH],\n  billingAddress: [\n    'country' => CountryCode::AF,\n    'city' => 'city',\n    'state' => 'state',\n    'street' => 'street',\n    'zipcode' => 'zipcode',\n  ],\n  billingCurrency: Currency::AED,\n  cancelURL: 'cancel_url',\n  confirm: true,\n  customFields: [\n    [\n      'fieldType' => 'text',\n      'key' => 'key',\n      'label' => 'label',\n      'options' => ['string'],\n      'placeholder' => 'placeholder',\n      'required' => true,\n    ],\n  ],\n  customer: ['customerID' => 'customer_id'],\n  customization: [\n    'forceLanguage' => 'force_language',\n    'showOnDemandTag' => true,\n    'showOrderDetails' => true,\n    'theme' => 'dark',\n    'themeConfig' => [\n      'dark' => [\n        'bgPrimary' => 'bg_primary',\n        'bgSecondary' => 'bg_secondary',\n        'borderPrimary' => 'border_primary',\n        'borderSecondary' => 'border_secondary',\n        'buttonPrimary' => 'button_primary',\n        'buttonPrimaryHover' => 'button_primary_hover',\n        'buttonSecondary' => 'button_secondary',\n        'buttonSecondaryHover' => 'button_secondary_hover',\n        'buttonTextPrimary' => 'button_text_primary',\n        'buttonTextSecondary' => 'button_text_secondary',\n        'inputFocusBorder' => 'input_focus_border',\n        'textError' => 'text_error',\n        'textPlaceholder' => 'text_placeholder',\n        'textPrimary' => 'text_primary',\n        'textSecondary' => 'text_secondary',\n        'textSuccess' => 'text_success',\n      ],\n      'fontPrimaryURL' => 'font_primary_url',\n      'fontSecondaryURL' => 'font_secondary_url',\n      'fontSize' => 'xs',\n      'fontWeight' => 'normal',\n      'light' => [\n        'bgPrimary' => 'bg_primary',\n        'bgSecondary' => 'bg_secondary',\n        'borderPrimary' => 'border_primary',\n        'borderSecondary' => 'border_secondary',\n        'buttonPrimary' => 'button_primary',\n        'buttonPrimaryHover' => 'button_primary_hover',\n        'buttonSecondary' => 'button_secondary',\n        'buttonSecondaryHover' => 'button_secondary_hover',\n        'buttonTextPrimary' => 'button_text_primary',\n        'buttonTextSecondary' => 'button_text_secondary',\n        'inputFocusBorder' => 'input_focus_border',\n        'textError' => 'text_error',\n        'textPlaceholder' => 'text_placeholder',\n        'textPrimary' => 'text_primary',\n        'textSecondary' => 'text_secondary',\n        'textSuccess' => 'text_success',\n      ],\n      'payButtonText' => 'pay_button_text',\n      'radius' => 'radius',\n    ],\n  ],\n  discountCode: 'discount_code',\n  featureFlags: [\n    'allowCurrencySelection' => true,\n    'allowCustomerEditingCity' => true,\n    'allowCustomerEditingCountry' => true,\n    'allowCustomerEditingEmail' => true,\n    'allowCustomerEditingName' => true,\n    'allowCustomerEditingState' => true,\n    'allowCustomerEditingStreet' => true,\n    'allowCustomerEditingTaxID' => true,\n    'allowCustomerEditingZipcode' => true,\n    'allowDiscountCode' => true,\n    'allowPhoneNumberCollection' => true,\n    'allowTaxID' => true,\n    'alwaysCreateNewCustomer' => true,\n    'redirectImmediately' => true,\n  ],\n  force3DS: true,\n  metadata: ['foo' => 'string'],\n  minimalAddress: true,\n  paymentMethodID: 'payment_method_id',\n  productCollectionID: 'product_collection_id',\n  returnURL: 'return_url',\n  shortLink: true,\n  showSavedPaymentMethods: true,\n  subscriptionData: [\n    'onDemand' => [\n      'mandateOnly' => true,\n      'adaptiveCurrencyFeesInclusive' => true,\n      'productCurrency' => Currency::AED,\n      'productDescription' => 'product_description',\n      'productPrice' => 0,\n    ],\n    'trialPeriodDays' => 0,\n  ],\n  taxID: 'tax_id',\n);\n\nvar_dump($checkoutSessionResponse);",
      },
      python: {
        method: 'checkout_sessions.create',
        example:
          'import os\nfrom dodopayments import DodoPayments\n\nclient = DodoPayments(\n    bearer_token=os.environ.get("DODO_PAYMENTS_API_KEY"),  # This is the default and can be omitted\n)\ncheckout_session_response = client.checkout_sessions.create(\n    product_cart=[{\n        "product_id": "product_id",\n        "quantity": 0,\n    }],\n)\nprint(checkout_session_response.session_id)',
      },
      ruby: {
        method: 'checkout_sessions.create',
        example:
          'require "dodopayments"\n\ndodo_payments = Dodopayments::Client.new(\n  bearer_token: "My Bearer Token",\n  environment: "test_mode" # defaults to "live_mode"\n)\n\ncheckout_session_response = dodo_payments.checkout_sessions.create(product_cart: [{product_id: "product_id", quantity: 0}])\n\nputs(checkout_session_response)',
      },
      typescript: {
        method: 'client.checkoutSessions.create',
        example:
          "import DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments({\n  bearerToken: process.env['DODO_PAYMENTS_API_KEY'], // This is the default and can be omitted\n});\n\nconst checkoutSessionResponse = await client.checkoutSessions.create({\n  product_cart: [{ product_id: 'product_id', quantity: 0 }],\n});\n\nconsole.log(checkoutSessionResponse.session_id);",
      },
    },
  },
  {
    name: 'retrieve',
    endpoint: '/checkouts/{id}',
    httpMethod: 'get',
    summary: '',
    description: '',
    stainlessPath: '(resource) checkout_sessions > (method) retrieve',
    qualified: 'client.checkoutSessions.retrieve',
    params: ['id: string;'],
    response:
      '{ id: string; created_at: string; customer_email?: string; customer_name?: string; payment_id?: string; payment_status?: string; }',
    markdown:
      "## retrieve\n\n`client.checkoutSessions.retrieve(id: string): { id: string; created_at: string; customer_email?: string; customer_name?: string; payment_id?: string; payment_status?: intent_status; }`\n\n**get** `/checkouts/{id}`\n\n### Parameters\n\n- `id: string`\n\n### Returns\n\n- `{ id: string; created_at: string; customer_email?: string; customer_name?: string; payment_id?: string; payment_status?: string; }`\n\n  - `id: string`\n  - `created_at: string`\n  - `customer_email?: string`\n  - `customer_name?: string`\n  - `payment_id?: string`\n  - `payment_status?: string`\n\n### Example\n\n```typescript\nimport DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments();\n\nconst checkoutSessionStatus = await client.checkoutSessions.retrieve('id');\n\nconsole.log(checkoutSessionStatus);\n```",
    perLanguage: {
      cli: {
        method: 'checkout_sessions retrieve',
        example:
          "dodo-payments-cli checkout-sessions retrieve \\\n  --bearer-token 'My Bearer Token' \\\n  --id id",
      },
      csharp: {
        method: 'CheckoutSessions.Retrieve',
        example:
          'CheckoutSessionRetrieveParams parameters = new() { ID = "id" };\n\nvar checkoutSessionStatus = await client.CheckoutSessions.Retrieve(parameters);\n\nConsole.WriteLine(checkoutSessionStatus);',
      },
      go: {
        method: 'client.CheckoutSessions.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/dodopayments/dodopayments-go"\n\t"github.com/dodopayments/dodopayments-go/option"\n)\n\nfunc main() {\n\tclient := dodopayments.NewClient(\n\t\toption.WithBearerToken("My Bearer Token"),\n\t)\n\tcheckoutSessionStatus, err := client.CheckoutSessions.Get(context.TODO(), "id")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", checkoutSessionStatus.ID)\n}\n',
      },
      http: {
        example:
          'curl https://live.dodopayments.com/checkouts/$ID \\\n    -H "Authorization: Bearer $DODO_PAYMENTS_API_KEY"',
      },
      java: {
        method: 'checkoutSessions().retrieve',
        example:
          'package com.dodopayments.api.example;\n\nimport com.dodopayments.api.client.DodoPaymentsClient;\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient;\nimport com.dodopayments.api.models.checkoutsessions.CheckoutSessionRetrieveParams;\nimport com.dodopayments.api.models.checkoutsessions.CheckoutSessionStatus;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        DodoPaymentsClient client = DodoPaymentsOkHttpClient.fromEnv();\n\n        CheckoutSessionStatus checkoutSessionStatus = client.checkoutSessions().retrieve("id");\n    }\n}',
      },
      kotlin: {
        method: 'checkoutSessions().retrieve',
        example:
          'package com.dodopayments.api.example\n\nimport com.dodopayments.api.client.DodoPaymentsClient\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient\nimport com.dodopayments.api.models.checkoutsessions.CheckoutSessionRetrieveParams\nimport com.dodopayments.api.models.checkoutsessions.CheckoutSessionStatus\n\nfun main() {\n    val client: DodoPaymentsClient = DodoPaymentsOkHttpClient.fromEnv()\n\n    val checkoutSessionStatus: CheckoutSessionStatus = client.checkoutSessions().retrieve("id")\n}',
      },
      php: {
        method: 'checkoutSessions->retrieve',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(bearerToken: 'My Bearer Token', environment: 'test_mode');\n\n$checkoutSessionStatus = $client->checkoutSessions->retrieve('id');\n\nvar_dump($checkoutSessionStatus);",
      },
      python: {
        method: 'checkout_sessions.retrieve',
        example:
          'import os\nfrom dodopayments import DodoPayments\n\nclient = DodoPayments(\n    bearer_token=os.environ.get("DODO_PAYMENTS_API_KEY"),  # This is the default and can be omitted\n)\ncheckout_session_status = client.checkout_sessions.retrieve(\n    "id",\n)\nprint(checkout_session_status.id)',
      },
      ruby: {
        method: 'checkout_sessions.retrieve',
        example:
          'require "dodopayments"\n\ndodo_payments = Dodopayments::Client.new(\n  bearer_token: "My Bearer Token",\n  environment: "test_mode" # defaults to "live_mode"\n)\n\ncheckout_session_status = dodo_payments.checkout_sessions.retrieve("id")\n\nputs(checkout_session_status)',
      },
      typescript: {
        method: 'client.checkoutSessions.retrieve',
        example:
          "import DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments({\n  bearerToken: process.env['DODO_PAYMENTS_API_KEY'], // This is the default and can be omitted\n});\n\nconst checkoutSessionStatus = await client.checkoutSessions.retrieve('id');\n\nconsole.log(checkoutSessionStatus.id);",
      },
    },
  },
  {
    name: 'preview',
    endpoint: '/checkouts/preview',
    httpMethod: 'post',
    summary: '',
    description: '',
    stainlessPath: '(resource) checkout_sessions > (method) preview',
    qualified: 'client.checkoutSessions.preview',
    params: [
      'product_cart: { product_id: string; quantity: number; addons?: { addon_id: string; quantity: number; }[]; amount?: number; }[];',
      'allowed_payment_method_types?: string[];',
      'billing_address?: { country: string; city?: string; state?: string; street?: string; zipcode?: string; };',
      'billing_currency?: string;',
      'cancel_url?: string;',
      'confirm?: boolean;',
      "custom_fields?: { field_type: 'text' | 'number' | 'email' | 'url' | 'date' | 'dropdown' | 'boolean'; key: string; label: string; options?: string[]; placeholder?: string; required?: boolean; }[];",
      'customer?: { customer_id: string; } | { email: string; name?: string; phone_number?: string; };',
      "customization?: { force_language?: string; show_on_demand_tag?: boolean; show_order_details?: boolean; theme?: 'dark' | 'light' | 'system'; theme_config?: { dark?: theme_mode_config; font_primary_url?: string; font_secondary_url?: string; font_size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'; font_weight?: 'normal' | 'medium' | 'bold' | 'extraBold'; light?: theme_mode_config; pay_button_text?: string; radius?: string; }; };",
      'discount_code?: string;',
      'feature_flags?: { allow_currency_selection?: boolean; allow_customer_editing_city?: boolean; allow_customer_editing_country?: boolean; allow_customer_editing_email?: boolean; allow_customer_editing_name?: boolean; allow_customer_editing_state?: boolean; allow_customer_editing_street?: boolean; allow_customer_editing_tax_id?: boolean; allow_customer_editing_zipcode?: boolean; allow_discount_code?: boolean; allow_phone_number_collection?: boolean; allow_tax_id?: boolean; always_create_new_customer?: boolean; redirect_immediately?: boolean; };',
      'force_3ds?: boolean;',
      'metadata?: object;',
      'minimal_address?: boolean;',
      'payment_method_id?: string;',
      'product_collection_id?: string;',
      'return_url?: string;',
      'short_link?: boolean;',
      'show_saved_payment_methods?: boolean;',
      'subscription_data?: { on_demand?: { mandate_only: boolean; adaptive_currency_fees_inclusive?: boolean; product_currency?: currency; product_description?: string; product_price?: number; }; trial_period_days?: number; };',
      'tax_id?: string;',
    ],
    response:
      '{ billing_country: string; currency: string; current_breakup: { discount: number; subtotal: number; total_amount: number; tax?: number; }; product_cart: { credit_entitlements: object[]; currency: currency; discounted_price: number; is_subscription: boolean; is_usage_based: boolean; meters: object[]; og_currency: currency; og_price: number; product_id: string; quantity: number; tax_category: tax_category; tax_inclusive: boolean; tax_rate: number; addons?: object[]; description?: string; discount_amount?: number; discount_cycle?: number; name?: string; tax?: number; }[]; total_price: number; recurring_breakup?: { discount: number; subtotal: number; total_amount: number; tax?: number; }; tax_id_err_msg?: string; total_tax?: number; }',
    markdown:
      "## preview\n\n`client.checkoutSessions.preview(product_cart: { product_id: string; quantity: number; addons?: attach_addon[]; amount?: number; }[], allowed_payment_method_types?: string[], billing_address?: { country: country_code; city?: string; state?: string; street?: string; zipcode?: string; }, billing_currency?: string, cancel_url?: string, confirm?: boolean, custom_fields?: { field_type: 'text' | 'number' | 'email' | 'url' | 'date' | 'dropdown' | 'boolean'; key: string; label: string; options?: string[]; placeholder?: string; required?: boolean; }[], customer?: object | object, customization?: { force_language?: string; show_on_demand_tag?: boolean; show_order_details?: boolean; theme?: 'dark' | 'light' | 'system'; theme_config?: theme_config; }, discount_code?: string, feature_flags?: { allow_currency_selection?: boolean; allow_customer_editing_city?: boolean; allow_customer_editing_country?: boolean; allow_customer_editing_email?: boolean; allow_customer_editing_name?: boolean; allow_customer_editing_state?: boolean; allow_customer_editing_street?: boolean; allow_customer_editing_tax_id?: boolean; allow_customer_editing_zipcode?: boolean; allow_discount_code?: boolean; allow_phone_number_collection?: boolean; allow_tax_id?: boolean; always_create_new_customer?: boolean; redirect_immediately?: boolean; }, force_3ds?: boolean, metadata?: object, minimal_address?: boolean, payment_method_id?: string, product_collection_id?: string, return_url?: string, short_link?: boolean, show_saved_payment_methods?: boolean, subscription_data?: { on_demand?: on_demand_subscription; trial_period_days?: number; }, tax_id?: string): { billing_country: country_code; currency: currency; current_breakup: object; product_cart: object[]; total_price: number; recurring_breakup?: object; tax_id_err_msg?: string; total_tax?: number; }`\n\n**post** `/checkouts/preview`\n\n### Parameters\n\n- `product_cart: { product_id: string; quantity: number; addons?: { addon_id: string; quantity: number; }[]; amount?: number; }[]`\n\n- `allowed_payment_method_types?: string[]`\n  Customers will never see payment methods that are not in this list.\nHowever, adding a method here does not guarantee customers will see it.\nAvailability still depends on other factors (e.g., customer location, merchant settings).\n\nDisclaimar: Always provide 'credit' and 'debit' as a fallback.\nIf all payment methods are unavailable, checkout session will fail.\n\n- `billing_address?: { country: string; city?: string; state?: string; street?: string; zipcode?: string; }`\n  Billing address information for the session\n  - `country: string`\n    Two-letter ISO country code (ISO 3166-1 alpha-2)\n  - `city?: string`\n    City name\n  - `state?: string`\n    State or province name\n  - `street?: string`\n    Street address including house number and unit/apartment if applicable\n  - `zipcode?: string`\n    Postal code or ZIP code\n\n- `billing_currency?: string`\n  This field is ingored if adaptive pricing is disabled\n\n- `cancel_url?: string`\n  The URL to redirect the customer if they cancel or go back from the checkout.\nIf not provided, the back button will not be displayed.\n\n- `confirm?: boolean`\n  If confirm is true, all the details will be finalized. If required data is missing, an API error is thrown.\n\n- `custom_fields?: { field_type: 'text' | 'number' | 'email' | 'url' | 'date' | 'dropdown' | 'boolean'; key: string; label: string; options?: string[]; placeholder?: string; required?: boolean; }[]`\n  Custom fields to collect from customer during checkout (max 5 fields)\n\n- `customer?: { customer_id: string; } | { email: string; name?: string; phone_number?: string; }`\n  Customer details for the session\n\n- `customization?: { force_language?: string; show_on_demand_tag?: boolean; show_order_details?: boolean; theme?: 'dark' | 'light' | 'system'; theme_config?: { dark?: theme_mode_config; font_primary_url?: string; font_secondary_url?: string; font_size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'; font_weight?: 'normal' | 'medium' | 'bold' | 'extraBold'; light?: theme_mode_config; pay_button_text?: string; radius?: string; }; }`\n  Customization for the checkout session page\n  - `force_language?: string`\n    Force the checkout interface to render in a specific language (e.g. `en`, `es`)\n  - `show_on_demand_tag?: boolean`\n    Show on demand tag\n\nDefault is true\n  - `show_order_details?: boolean`\n    Show order details by default\n\nDefault is true\n  - `theme?: 'dark' | 'light' | 'system'`\n    Theme of the page (determines which mode - light/dark/system - to use)\n\nIf not provided, uses the business-configured theme from business_themes table.\n  - `theme_config?: { dark?: { bg_primary?: string; bg_secondary?: string; border_primary?: string; border_secondary?: string; button_primary?: string; button_primary_hover?: string; button_secondary?: string; button_secondary_hover?: string; button_text_primary?: string; button_text_secondary?: string; input_focus_border?: string; text_error?: string; text_placeholder?: string; text_primary?: string; text_secondary?: string; text_success?: string; }; font_primary_url?: string; font_secondary_url?: string; font_size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'; font_weight?: 'normal' | 'medium' | 'bold' | 'extraBold'; light?: { bg_primary?: string; bg_secondary?: string; border_primary?: string; border_secondary?: string; button_primary?: string; button_primary_hover?: string; button_secondary?: string; button_secondary_hover?: string; button_text_primary?: string; button_text_secondary?: string; input_focus_border?: string; text_error?: string; text_placeholder?: string; text_primary?: string; text_secondary?: string; text_success?: string; }; pay_button_text?: string; radius?: string; }`\n    Optional custom theme configuration with colors for light and dark modes\n\n- `discount_code?: string`\n\n- `feature_flags?: { allow_currency_selection?: boolean; allow_customer_editing_city?: boolean; allow_customer_editing_country?: boolean; allow_customer_editing_email?: boolean; allow_customer_editing_name?: boolean; allow_customer_editing_state?: boolean; allow_customer_editing_street?: boolean; allow_customer_editing_tax_id?: boolean; allow_customer_editing_zipcode?: boolean; allow_discount_code?: boolean; allow_phone_number_collection?: boolean; allow_tax_id?: boolean; always_create_new_customer?: boolean; redirect_immediately?: boolean; }`\n  - `allow_currency_selection?: boolean`\n    if customer is allowed to change currency, set it to true\n\nDefault is true\n  - `allow_customer_editing_city?: boolean`\n  - `allow_customer_editing_country?: boolean`\n  - `allow_customer_editing_email?: boolean`\n  - `allow_customer_editing_name?: boolean`\n  - `allow_customer_editing_state?: boolean`\n  - `allow_customer_editing_street?: boolean`\n  - `allow_customer_editing_tax_id?: boolean`\n  - `allow_customer_editing_zipcode?: boolean`\n  - `allow_discount_code?: boolean`\n    If the customer is allowed to apply discount code, set it to true.\n\nDefault is true\n  - `allow_phone_number_collection?: boolean`\n    If phone number is collected from customer, set it to rue\n\nDefault is true\n  - `allow_tax_id?: boolean`\n    If the customer is allowed to add tax id, set it to true\n\nDefault is true\n  - `always_create_new_customer?: boolean`\n    Set to true if a new customer object should be created.\nBy default email is used to find an existing customer to attach the session to\n\nDefault is false\n  - `redirect_immediately?: boolean`\n    If true, redirects the customer immediately after payment completion\n\nDefault is false\n\n- `force_3ds?: boolean`\n  Override merchant default 3DS behaviour for this session\n\n- `metadata?: object`\n  Additional metadata associated with the payment. Defaults to empty if not provided.\n\n- `minimal_address?: boolean`\n  If true, only zipcode is required when confirm is true; other address fields remain optional\n\n- `payment_method_id?: string`\n  Optional payment method ID to use for this checkout session.\nOnly allowed when `confirm` is true.\nIf provided, existing customer id must also be provided.\n\n- `product_collection_id?: string`\n  Product collection ID for collection-based checkout flow\n\n- `return_url?: string`\n  The url to redirect after payment failure or success.\n\n- `short_link?: boolean`\n  If true, returns a shortened checkout URL.\nDefaults to false if not specified.\n\n- `show_saved_payment_methods?: boolean`\n  Display saved payment methods of a returning customer False by default\n\n- `subscription_data?: { on_demand?: { mandate_only: boolean; adaptive_currency_fees_inclusive?: boolean; product_currency?: currency; product_description?: string; product_price?: number; }; trial_period_days?: number; }`\n  - `on_demand?: { mandate_only: boolean; adaptive_currency_fees_inclusive?: boolean; product_currency?: string; product_description?: string; product_price?: number; }`\n  - `trial_period_days?: number`\n    Optional trial period in days If specified, this value overrides the trial period set in the product's price Must be between 0 and 10000 days\n\n- `tax_id?: string`\n  Tax ID for the customer (e.g. VAT number). Requires billing_address with country.\n\n### Returns\n\n- `{ billing_country: string; currency: string; current_breakup: { discount: number; subtotal: number; total_amount: number; tax?: number; }; product_cart: { credit_entitlements: { credit_entitlement_id: string; credit_entitlement_name: string; credit_entitlement_unit: string; credits_amount: string; }[]; currency: string; discounted_price: number; is_subscription: boolean; is_usage_based: boolean; meters: { measurement_unit: string; name: string; price_per_unit: string; description?: string; free_threshold?: number; }[]; og_currency: string; og_price: number; product_id: string; quantity: number; tax_category: 'digital_products' | 'saas' | 'e_book' | 'edtech'; tax_inclusive: boolean; tax_rate: number; addons?: { addon_id: string; currency: currency; discounted_price: number; name: string; og_currency: currency; og_price: number; quantity: number; tax_category: tax_category; tax_inclusive: boolean; tax_rate: number; description?: string; discount_amount?: number; tax?: number; }[]; description?: string; discount_amount?: number; discount_cycle?: number; name?: string; tax?: number; }[]; total_price: number; recurring_breakup?: { discount: number; subtotal: number; total_amount: number; tax?: number; }; tax_id_err_msg?: string; total_tax?: number; }`\n  Data returned by the calculate checkout session API\n\n  - `billing_country: string`\n  - `currency: string`\n  - `current_breakup: { discount: number; subtotal: number; total_amount: number; tax?: number; }`\n  - `product_cart: { credit_entitlements: { credit_entitlement_id: string; credit_entitlement_name: string; credit_entitlement_unit: string; credits_amount: string; }[]; currency: string; discounted_price: number; is_subscription: boolean; is_usage_based: boolean; meters: { measurement_unit: string; name: string; price_per_unit: string; description?: string; free_threshold?: number; }[]; og_currency: string; og_price: number; product_id: string; quantity: number; tax_category: 'digital_products' | 'saas' | 'e_book' | 'edtech'; tax_inclusive: boolean; tax_rate: number; addons?: { addon_id: string; currency: string; discounted_price: number; name: string; og_currency: string; og_price: number; quantity: number; tax_category: 'digital_products' | 'saas' | 'e_book' | 'edtech'; tax_inclusive: boolean; tax_rate: number; description?: string; discount_amount?: number; tax?: number; }[]; description?: string; discount_amount?: number; discount_cycle?: number; name?: string; tax?: number; }[]`\n  - `total_price: number`\n  - `recurring_breakup?: { discount: number; subtotal: number; total_amount: number; tax?: number; }`\n  - `tax_id_err_msg?: string`\n  - `total_tax?: number`\n\n### Example\n\n```typescript\nimport DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments();\n\nconst response = await client.checkoutSessions.preview({ product_cart: [{ product_id: 'product_id', quantity: 0 }] });\n\nconsole.log(response);\n```",
    perLanguage: {
      cli: {
        method: 'checkout_sessions preview',
        example:
          "dodo-payments-cli checkout-sessions preview \\\n  --bearer-token 'My Bearer Token' \\\n  --product-cart '{product_id: product_id, quantity: 0}'",
      },
      csharp: {
        method: 'CheckoutSessions.Preview',
        example:
          'CheckoutSessionPreviewParams parameters = new()\n{\n    ProductCart =\n    [\n        new()\n        {\n            ProductID = "product_id",\n            Quantity = 0,\n            Addons =\n            [\n                new()\n                {\n                    AddonID = "addon_id",\n                    Quantity = 0,\n                },\n            ],\n            Amount = 0,\n        },\n    ],\n};\n\nvar response = await client.CheckoutSessions.Preview(parameters);\n\nConsole.WriteLine(response);',
      },
      go: {
        method: 'client.CheckoutSessions.Preview',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/dodopayments/dodopayments-go"\n\t"github.com/dodopayments/dodopayments-go/option"\n)\n\nfunc main() {\n\tclient := dodopayments.NewClient(\n\t\toption.WithBearerToken("My Bearer Token"),\n\t)\n\tresponse, err := client.CheckoutSessions.Preview(context.TODO(), dodopayments.CheckoutSessionPreviewParams{\n\t\tCheckoutSessionRequest: dodopayments.CheckoutSessionRequestParam{\n\t\t\tProductCart: dodopayments.F([]dodopayments.ProductItemReqParam{{\n\t\t\t\tProductID: dodopayments.F("product_id"),\n\t\t\t\tQuantity:  dodopayments.F(int64(0)),\n\t\t\t}}),\n\t\t},\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.TaxIDErrMsg)\n}\n',
      },
      http: {
        example:
          'curl https://live.dodopayments.com/checkouts/preview \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $DODO_PAYMENTS_API_KEY" \\\n    -d \'{\n          "product_cart": [\n            {\n              "product_id": "product_id",\n              "quantity": 0\n            }\n          ]\n        }\'',
      },
      java: {
        method: 'checkoutSessions().preview',
        example:
          'package com.dodopayments.api.example;\n\nimport com.dodopayments.api.client.DodoPaymentsClient;\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient;\nimport com.dodopayments.api.models.checkoutsessions.CheckoutSessionPreviewParams;\nimport com.dodopayments.api.models.checkoutsessions.CheckoutSessionPreviewResponse;\nimport com.dodopayments.api.models.checkoutsessions.CheckoutSessionRequest;\nimport com.dodopayments.api.models.checkoutsessions.ProductItemReq;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        DodoPaymentsClient client = DodoPaymentsOkHttpClient.fromEnv();\n\n        CheckoutSessionRequest params = CheckoutSessionRequest.builder()\n            .addProductCart(ProductItemReq.builder()\n                .productId("product_id")\n                .quantity(0)\n                .build())\n            .build();\n        CheckoutSessionPreviewResponse response = client.checkoutSessions().preview(params);\n    }\n}',
      },
      kotlin: {
        method: 'checkoutSessions().preview',
        example:
          'package com.dodopayments.api.example\n\nimport com.dodopayments.api.client.DodoPaymentsClient\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient\nimport com.dodopayments.api.models.checkoutsessions.CheckoutSessionPreviewParams\nimport com.dodopayments.api.models.checkoutsessions.CheckoutSessionPreviewResponse\nimport com.dodopayments.api.models.checkoutsessions.CheckoutSessionRequest\nimport com.dodopayments.api.models.checkoutsessions.ProductItemReq\n\nfun main() {\n    val client: DodoPaymentsClient = DodoPaymentsOkHttpClient.fromEnv()\n\n    val params: CheckoutSessionRequest = CheckoutSessionRequest.builder()\n        .addProductCart(ProductItemReq.builder()\n            .productId("product_id")\n            .quantity(0)\n            .build())\n        .build()\n    val response: CheckoutSessionPreviewResponse = client.checkoutSessions().preview(params)\n}',
      },
      php: {
        method: 'checkoutSessions->preview',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(bearerToken: 'My Bearer Token', environment: 'test_mode');\n\n$response = $client->checkoutSessions->preview(\n  productCart: [\n    [\n      'productID' => 'product_id',\n      'quantity' => 0,\n      'addons' => [['addonID' => 'addon_id', 'quantity' => 0]],\n      'amount' => 0,\n    ],\n  ],\n  allowedPaymentMethodTypes: [PaymentMethodTypes::ACH],\n  billingAddress: [\n    'country' => CountryCode::AF,\n    'city' => 'city',\n    'state' => 'state',\n    'street' => 'street',\n    'zipcode' => 'zipcode',\n  ],\n  billingCurrency: Currency::AED,\n  cancelURL: 'cancel_url',\n  confirm: true,\n  customFields: [\n    [\n      'fieldType' => 'text',\n      'key' => 'key',\n      'label' => 'label',\n      'options' => ['string'],\n      'placeholder' => 'placeholder',\n      'required' => true,\n    ],\n  ],\n  customer: ['customerID' => 'customer_id'],\n  customization: [\n    'forceLanguage' => 'force_language',\n    'showOnDemandTag' => true,\n    'showOrderDetails' => true,\n    'theme' => 'dark',\n    'themeConfig' => [\n      'dark' => [\n        'bgPrimary' => 'bg_primary',\n        'bgSecondary' => 'bg_secondary',\n        'borderPrimary' => 'border_primary',\n        'borderSecondary' => 'border_secondary',\n        'buttonPrimary' => 'button_primary',\n        'buttonPrimaryHover' => 'button_primary_hover',\n        'buttonSecondary' => 'button_secondary',\n        'buttonSecondaryHover' => 'button_secondary_hover',\n        'buttonTextPrimary' => 'button_text_primary',\n        'buttonTextSecondary' => 'button_text_secondary',\n        'inputFocusBorder' => 'input_focus_border',\n        'textError' => 'text_error',\n        'textPlaceholder' => 'text_placeholder',\n        'textPrimary' => 'text_primary',\n        'textSecondary' => 'text_secondary',\n        'textSuccess' => 'text_success',\n      ],\n      'fontPrimaryURL' => 'font_primary_url',\n      'fontSecondaryURL' => 'font_secondary_url',\n      'fontSize' => 'xs',\n      'fontWeight' => 'normal',\n      'light' => [\n        'bgPrimary' => 'bg_primary',\n        'bgSecondary' => 'bg_secondary',\n        'borderPrimary' => 'border_primary',\n        'borderSecondary' => 'border_secondary',\n        'buttonPrimary' => 'button_primary',\n        'buttonPrimaryHover' => 'button_primary_hover',\n        'buttonSecondary' => 'button_secondary',\n        'buttonSecondaryHover' => 'button_secondary_hover',\n        'buttonTextPrimary' => 'button_text_primary',\n        'buttonTextSecondary' => 'button_text_secondary',\n        'inputFocusBorder' => 'input_focus_border',\n        'textError' => 'text_error',\n        'textPlaceholder' => 'text_placeholder',\n        'textPrimary' => 'text_primary',\n        'textSecondary' => 'text_secondary',\n        'textSuccess' => 'text_success',\n      ],\n      'payButtonText' => 'pay_button_text',\n      'radius' => 'radius',\n    ],\n  ],\n  discountCode: 'discount_code',\n  featureFlags: [\n    'allowCurrencySelection' => true,\n    'allowCustomerEditingCity' => true,\n    'allowCustomerEditingCountry' => true,\n    'allowCustomerEditingEmail' => true,\n    'allowCustomerEditingName' => true,\n    'allowCustomerEditingState' => true,\n    'allowCustomerEditingStreet' => true,\n    'allowCustomerEditingTaxID' => true,\n    'allowCustomerEditingZipcode' => true,\n    'allowDiscountCode' => true,\n    'allowPhoneNumberCollection' => true,\n    'allowTaxID' => true,\n    'alwaysCreateNewCustomer' => true,\n    'redirectImmediately' => true,\n  ],\n  force3DS: true,\n  metadata: ['foo' => 'string'],\n  minimalAddress: true,\n  paymentMethodID: 'payment_method_id',\n  productCollectionID: 'product_collection_id',\n  returnURL: 'return_url',\n  shortLink: true,\n  showSavedPaymentMethods: true,\n  subscriptionData: [\n    'onDemand' => [\n      'mandateOnly' => true,\n      'adaptiveCurrencyFeesInclusive' => true,\n      'productCurrency' => Currency::AED,\n      'productDescription' => 'product_description',\n      'productPrice' => 0,\n    ],\n    'trialPeriodDays' => 0,\n  ],\n  taxID: 'tax_id',\n);\n\nvar_dump($response);",
      },
      python: {
        method: 'checkout_sessions.preview',
        example:
          'import os\nfrom dodopayments import DodoPayments\n\nclient = DodoPayments(\n    bearer_token=os.environ.get("DODO_PAYMENTS_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.checkout_sessions.preview(\n    product_cart=[{\n        "product_id": "product_id",\n        "quantity": 0,\n    }],\n)\nprint(response.tax_id_err_msg)',
      },
      ruby: {
        method: 'checkout_sessions.preview',
        example:
          'require "dodopayments"\n\ndodo_payments = Dodopayments::Client.new(\n  bearer_token: "My Bearer Token",\n  environment: "test_mode" # defaults to "live_mode"\n)\n\nresponse = dodo_payments.checkout_sessions.preview(product_cart: [{product_id: "product_id", quantity: 0}])\n\nputs(response)',
      },
      typescript: {
        method: 'client.checkoutSessions.preview',
        example:
          "import DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments({\n  bearerToken: process.env['DODO_PAYMENTS_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.checkoutSessions.preview({\n  product_cart: [{ product_id: 'product_id', quantity: 0 }],\n});\n\nconsole.log(response.tax_id_err_msg);",
      },
    },
  },
  {
    name: 'list',
    endpoint: '/payments',
    httpMethod: 'get',
    summary: '',
    description: '',
    stainlessPath: '(resource) payments > (method) list',
    qualified: 'client.payments.list',
    params: [
      'brand_id?: string;',
      'created_at_gte?: string;',
      'created_at_lte?: string;',
      'customer_id?: string;',
      'page_number?: number;',
      'page_size?: number;',
      'product_id?: string;',
      'status?: string;',
      'subscription_id?: string;',
    ],
    response:
      "{ brand_id: string; created_at: string; currency: string; customer: { customer_id: string; email: string; name: string; metadata?: object; phone_number?: string; }; digital_products_delivered: boolean; has_license_key: boolean; metadata: object; payment_id: string; total_amount: number; dispute_status?: string; invoice_id?: string; invoice_url?: string; payment_method?: string; payment_method_type?: string; refund_status?: 'partial' | 'full'; status?: string; subscription_id?: string; }",
    markdown:
      "## list\n\n`client.payments.list(brand_id?: string, created_at_gte?: string, created_at_lte?: string, customer_id?: string, page_number?: number, page_size?: number, product_id?: string, status?: string, subscription_id?: string): { brand_id: string; created_at: string; currency: currency; customer: customer_limited_details; digital_products_delivered: boolean; has_license_key: boolean; metadata: object; payment_id: string; total_amount: number; dispute_status?: dispute_status; invoice_id?: string; invoice_url?: string; payment_method?: string; payment_method_type?: string; refund_status?: payment_refund_status; status?: intent_status; subscription_id?: string; }`\n\n**get** `/payments`\n\n### Parameters\n\n- `brand_id?: string`\n  filter by Brand id\n\n- `created_at_gte?: string`\n  Get events after this created time\n\n- `created_at_lte?: string`\n  Get events created before this time\n\n- `customer_id?: string`\n  Filter by customer id\n\n- `page_number?: number`\n  Page number default is 0\n\n- `page_size?: number`\n  Page size default is 10 max is 100\n\n- `product_id?: string`\n  Filter by product id\n\n- `status?: string`\n  Filter by status\n\n- `subscription_id?: string`\n  Filter by subscription id\n\n### Returns\n\n- `{ brand_id: string; created_at: string; currency: string; customer: { customer_id: string; email: string; name: string; metadata?: object; phone_number?: string; }; digital_products_delivered: boolean; has_license_key: boolean; metadata: object; payment_id: string; total_amount: number; dispute_status?: string; invoice_id?: string; invoice_url?: string; payment_method?: string; payment_method_type?: string; refund_status?: 'partial' | 'full'; status?: string; subscription_id?: string; }`\n\n  - `brand_id: string`\n  - `created_at: string`\n  - `currency: string`\n  - `customer: { customer_id: string; email: string; name: string; metadata?: object; phone_number?: string; }`\n  - `digital_products_delivered: boolean`\n  - `has_license_key: boolean`\n  - `metadata: object`\n  - `payment_id: string`\n  - `total_amount: number`\n  - `dispute_status?: string`\n  - `invoice_id?: string`\n  - `invoice_url?: string`\n  - `payment_method?: string`\n  - `payment_method_type?: string`\n  - `refund_status?: 'partial' | 'full'`\n  - `status?: string`\n  - `subscription_id?: string`\n\n### Example\n\n```typescript\nimport DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments();\n\n// Automatically fetches more pages as needed.\nfor await (const paymentListResponse of client.payments.list()) {\n  console.log(paymentListResponse);\n}\n```",
    perLanguage: {
      cli: {
        method: 'payments list',
        example: "dodo-payments-cli payments list \\\n  --bearer-token 'My Bearer Token'",
      },
      csharp: {
        method: 'Payments.List',
        example:
          'PaymentListParams parameters = new();\n\nvar page = await client.Payments.List(parameters);\nawait foreach (var item in page.Paginate())\n{\n    Console.WriteLine(item);\n}',
      },
      go: {
        method: 'client.Payments.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/dodopayments/dodopayments-go"\n\t"github.com/dodopayments/dodopayments-go/option"\n)\n\nfunc main() {\n\tclient := dodopayments.NewClient(\n\t\toption.WithBearerToken("My Bearer Token"),\n\t)\n\tpage, err := client.Payments.List(context.TODO(), dodopayments.PaymentListParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", page)\n}\n',
      },
      http: {
        example:
          'curl https://live.dodopayments.com/payments \\\n    -H "Authorization: Bearer $DODO_PAYMENTS_API_KEY"',
      },
      java: {
        method: 'payments().list',
        example:
          'package com.dodopayments.api.example;\n\nimport com.dodopayments.api.client.DodoPaymentsClient;\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient;\nimport com.dodopayments.api.models.payments.PaymentListPage;\nimport com.dodopayments.api.models.payments.PaymentListParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        DodoPaymentsClient client = DodoPaymentsOkHttpClient.fromEnv();\n\n        PaymentListPage page = client.payments().list();\n    }\n}',
      },
      kotlin: {
        method: 'payments().list',
        example:
          'package com.dodopayments.api.example\n\nimport com.dodopayments.api.client.DodoPaymentsClient\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient\nimport com.dodopayments.api.models.payments.PaymentListPage\nimport com.dodopayments.api.models.payments.PaymentListParams\n\nfun main() {\n    val client: DodoPaymentsClient = DodoPaymentsOkHttpClient.fromEnv()\n\n    val page: PaymentListPage = client.payments().list()\n}',
      },
      php: {
        method: 'payments->list',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(bearerToken: 'My Bearer Token', environment: 'test_mode');\n\n$page = $client->payments->list(\n  brandID: 'brand_id',\n  createdAtGte: new \\DateTimeImmutable('2019-12-27T18:11:19.117Z'),\n  createdAtLte: new \\DateTimeImmutable('2019-12-27T18:11:19.117Z'),\n  customerID: 'customer_id',\n  pageNumber: 0,\n  pageSize: 0,\n  productID: 'product_id',\n  status: 'succeeded',\n  subscriptionID: 'subscription_id',\n);\n\nvar_dump($page);",
      },
      python: {
        method: 'payments.list',
        example:
          'import os\nfrom dodopayments import DodoPayments\n\nclient = DodoPayments(\n    bearer_token=os.environ.get("DODO_PAYMENTS_API_KEY"),  # This is the default and can be omitted\n)\npage = client.payments.list()\npage = page.items[0]\nprint(page.brand_id)',
      },
      ruby: {
        method: 'payments.list',
        example:
          'require "dodopayments"\n\ndodo_payments = Dodopayments::Client.new(\n  bearer_token: "My Bearer Token",\n  environment: "test_mode" # defaults to "live_mode"\n)\n\npage = dodo_payments.payments.list\n\nputs(page)',
      },
      typescript: {
        method: 'client.payments.list',
        example:
          "import DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments({\n  bearerToken: process.env['DODO_PAYMENTS_API_KEY'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const paymentListResponse of client.payments.list()) {\n  console.log(paymentListResponse.brand_id);\n}",
      },
    },
  },
  {
    name: 'create',
    endpoint: '/payments',
    httpMethod: 'post',
    summary: '',
    description: '',
    stainlessPath: '(resource) payments > (method) create',
    qualified: 'client.payments.create',
    params: [
      'billing: { country: string; city?: string; state?: string; street?: string; zipcode?: string; };',
      'customer: { customer_id: string; } | { email: string; name?: string; phone_number?: string; };',
      'product_cart: { product_id: string; quantity: number; amount?: number; }[];',
      'allowed_payment_method_types?: string[];',
      'billing_currency?: string;',
      'discount_code?: string;',
      'force_3ds?: boolean;',
      'metadata?: object;',
      'payment_link?: boolean;',
      'payment_method_id?: string;',
      'redirect_immediately?: boolean;',
      'return_url?: string;',
      'short_link?: boolean;',
      'show_saved_payment_methods?: boolean;',
      'tax_id?: string;',
    ],
    response:
      '{ client_secret: string; customer: { customer_id: string; email: string; name: string; metadata?: object; phone_number?: string; }; metadata: object; payment_id: string; total_amount: number; discount_id?: string; expires_on?: string; payment_link?: string; product_cart?: { product_id: string; quantity: number; amount?: number; }[]; }',
    markdown:
      "## create\n\n`client.payments.create(billing: { country: country_code; city?: string; state?: string; street?: string; zipcode?: string; }, customer: object | object, product_cart: { product_id: string; quantity: number; amount?: number; }[], allowed_payment_method_types?: string[], billing_currency?: string, discount_code?: string, force_3ds?: boolean, metadata?: object, payment_link?: boolean, payment_method_id?: string, redirect_immediately?: boolean, return_url?: string, short_link?: boolean, show_saved_payment_methods?: boolean, tax_id?: string): { client_secret: string; customer: customer_limited_details; metadata: object; payment_id: string; total_amount: number; discount_id?: string; expires_on?: string; payment_link?: string; product_cart?: object[]; }`\n\n**post** `/payments`\n\n### Parameters\n\n- `billing: { country: string; city?: string; state?: string; street?: string; zipcode?: string; }`\n  Billing address details for the payment\n  - `country: string`\n    Two-letter ISO country code (ISO 3166-1 alpha-2)\n  - `city?: string`\n    City name\n  - `state?: string`\n    State or province name\n  - `street?: string`\n    Street address including house number and unit/apartment if applicable\n  - `zipcode?: string`\n    Postal code or ZIP code\n\n- `customer: { customer_id: string; } | { email: string; name?: string; phone_number?: string; }`\n  Customer information for the payment\n\n- `product_cart: { product_id: string; quantity: number; amount?: number; }[]`\n  List of products in the cart. Must contain at least 1 and at most 100 items.\n\n- `allowed_payment_method_types?: string[]`\n  List of payment methods allowed during checkout.\n\nCustomers will **never** see payment methods that are **not** in this list.\nHowever, adding a method here **does not guarantee** customers will see it.\nAvailability still depends on other factors (e.g., customer location, merchant settings).\n\n- `billing_currency?: string`\n  Fix the currency in which the end customer is billed.\nIf Dodo Payments cannot support that currency for this transaction, it will not proceed\n\n- `discount_code?: string`\n  Discount Code to apply to the transaction\n\n- `force_3ds?: boolean`\n  Override merchant default 3DS behaviour for this payment\n\n- `metadata?: object`\n  Additional metadata associated with the payment.\nDefaults to empty if not provided.\n\n- `payment_link?: boolean`\n  Whether to generate a payment link. Defaults to false if not specified.\n\n- `payment_method_id?: string`\n  Optional payment method ID to use for this payment.\nIf provided, customer_id must also be provided.\nThe payment method will be validated for eligibility with the payment's currency.\n\n- `redirect_immediately?: boolean`\n  If true, redirects the customer immediately after payment completion\nFalse by default\n\n- `return_url?: string`\n  Optional URL to redirect the customer after payment.\nMust be a valid URL if provided.\n\n- `short_link?: boolean`\n  If true, returns a shortened payment link.\nDefaults to false if not specified.\n\n- `show_saved_payment_methods?: boolean`\n  Display saved payment methods of a returning customer\nFalse by default\n\n- `tax_id?: string`\n  Tax ID in case the payment is B2B. If tax id validation fails the payment creation will fail\n\n### Returns\n\n- `{ client_secret: string; customer: { customer_id: string; email: string; name: string; metadata?: object; phone_number?: string; }; metadata: object; payment_id: string; total_amount: number; discount_id?: string; expires_on?: string; payment_link?: string; product_cart?: { product_id: string; quantity: number; amount?: number; }[]; }`\n\n  - `client_secret: string`\n  - `customer: { customer_id: string; email: string; name: string; metadata?: object; phone_number?: string; }`\n  - `metadata: object`\n  - `payment_id: string`\n  - `total_amount: number`\n  - `discount_id?: string`\n  - `expires_on?: string`\n  - `payment_link?: string`\n  - `product_cart?: { product_id: string; quantity: number; amount?: number; }[]`\n\n### Example\n\n```typescript\nimport DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments();\n\nconst payment = await client.payments.create({\n  billing: { country: 'AF' },\n  customer: { customer_id: 'customer_id' },\n  product_cart: [{ product_id: 'product_id', quantity: 0 }],\n});\n\nconsole.log(payment);\n```",
    perLanguage: {
      cli: {
        method: 'payments create',
        example:
          "dodo-payments-cli payments create \\\n  --bearer-token 'My Bearer Token' \\\n  --billing '{country: AF}' \\\n  --customer '{customer_id: customer_id}' \\\n  --product-cart '{product_id: product_id, quantity: 0}'",
      },
      csharp: {
        method: 'Payments.Create',
        example:
          'PaymentCreateParams parameters = new()\n{\n    Billing = new()\n    {\n        Country = CountryCode.Af,\n        City = "city",\n        State = "state",\n        Street = "street",\n        Zipcode = "zipcode",\n    },\n    Customer = new AttachExistingCustomer("customer_id"),\n    ProductCart =\n    [\n        new()\n        {\n            ProductID = "product_id",\n            Quantity = 0,\n            Amount = 0,\n        },\n    ],\n};\n\nvar payment = await client.Payments.Create(parameters);\n\nConsole.WriteLine(payment);',
      },
      go: {
        method: 'client.Payments.New',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/dodopayments/dodopayments-go"\n\t"github.com/dodopayments/dodopayments-go/option"\n)\n\nfunc main() {\n\tclient := dodopayments.NewClient(\n\t\toption.WithBearerToken("My Bearer Token"),\n\t)\n\tpayment, err := client.Payments.New(context.TODO(), dodopayments.PaymentNewParams{\n\t\tBilling: dodopayments.F(dodopayments.BillingAddressParam{\n\t\t\tCountry: dodopayments.F(dodopayments.CountryCodeAf),\n\t\t}),\n\t\tCustomer: dodopayments.F[dodopayments.CustomerRequestUnionParam](dodopayments.AttachExistingCustomerParam{\n\t\t\tCustomerID: dodopayments.F("customer_id"),\n\t\t}),\n\t\tProductCart: dodopayments.F([]dodopayments.PaymentNewParamsProductCart{{\n\t\t\tProductID: dodopayments.F("product_id"),\n\t\t\tQuantity:  dodopayments.F(int64(0)),\n\t\t}}),\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", payment.PaymentID)\n}\n',
      },
      http: {
        example:
          'curl https://live.dodopayments.com/payments \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $DODO_PAYMENTS_API_KEY" \\\n    -d \'{\n          "billing": {\n            "country": "AF"\n          },\n          "customer": {\n            "customer_id": "customer_id"\n          },\n          "product_cart": [\n            {\n              "product_id": "product_id",\n              "quantity": 0\n            }\n          ]\n        }\'',
      },
      java: {
        method: 'payments().create',
        example:
          'package com.dodopayments.api.example;\n\nimport com.dodopayments.api.client.DodoPaymentsClient;\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient;\nimport com.dodopayments.api.models.misc.CountryCode;\nimport com.dodopayments.api.models.payments.AttachExistingCustomer;\nimport com.dodopayments.api.models.payments.BillingAddress;\nimport com.dodopayments.api.models.payments.PaymentCreateParams;\nimport com.dodopayments.api.models.payments.PaymentCreateResponse;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        DodoPaymentsClient client = DodoPaymentsOkHttpClient.fromEnv();\n\n        PaymentCreateParams params = PaymentCreateParams.builder()\n            .billing(BillingAddress.builder()\n                .country(CountryCode.AF)\n                .build())\n            .customer(AttachExistingCustomer.builder()\n                .customerId("customer_id")\n                .build())\n            .addProductCart(PaymentCreateParams.ProductCart.builder()\n                .productId("product_id")\n                .quantity(0)\n                .build())\n            .build();\n        PaymentCreateResponse payment = client.payments().create(params);\n    }\n}',
      },
      kotlin: {
        method: 'payments().create',
        example:
          'package com.dodopayments.api.example\n\nimport com.dodopayments.api.client.DodoPaymentsClient\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient\nimport com.dodopayments.api.models.misc.CountryCode\nimport com.dodopayments.api.models.payments.AttachExistingCustomer\nimport com.dodopayments.api.models.payments.BillingAddress\nimport com.dodopayments.api.models.payments.PaymentCreateParams\nimport com.dodopayments.api.models.payments.PaymentCreateResponse\n\nfun main() {\n    val client: DodoPaymentsClient = DodoPaymentsOkHttpClient.fromEnv()\n\n    val params: PaymentCreateParams = PaymentCreateParams.builder()\n        .billing(BillingAddress.builder()\n            .country(CountryCode.AF)\n            .build())\n        .customer(AttachExistingCustomer.builder()\n            .customerId("customer_id")\n            .build())\n        .addProductCart(PaymentCreateParams.ProductCart.builder()\n            .productId("product_id")\n            .quantity(0)\n            .build())\n        .build()\n    val payment: PaymentCreateResponse = client.payments().create(params)\n}',
      },
      php: {
        method: 'payments->create',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(bearerToken: 'My Bearer Token', environment: 'test_mode');\n\n$payment = $client->payments->create(\n  billing: [\n    'country' => CountryCode::AF,\n    'city' => 'city',\n    'state' => 'state',\n    'street' => 'street',\n    'zipcode' => 'zipcode',\n  ],\n  customer: ['customerID' => 'customer_id'],\n  productCart: [['productID' => 'product_id', 'quantity' => 0, 'amount' => 0]],\n  allowedPaymentMethodTypes: [PaymentMethodTypes::ACH],\n  billingCurrency: Currency::AED,\n  discountCode: 'discount_code',\n  force3DS: true,\n  metadata: ['foo' => 'string'],\n  paymentLink: true,\n  paymentMethodID: 'payment_method_id',\n  redirectImmediately: true,\n  returnURL: 'return_url',\n  shortLink: true,\n  showSavedPaymentMethods: true,\n  taxID: 'tax_id',\n);\n\nvar_dump($payment);",
      },
      python: {
        method: 'payments.create',
        example:
          'import os\nfrom dodopayments import DodoPayments\n\nclient = DodoPayments(\n    bearer_token=os.environ.get("DODO_PAYMENTS_API_KEY"),  # This is the default and can be omitted\n)\npayment = client.payments.create(\n    billing={\n        "country": "AF"\n    },\n    customer={\n        "customer_id": "customer_id"\n    },\n    product_cart=[{\n        "product_id": "product_id",\n        "quantity": 0,\n    }],\n)\nprint(payment.payment_id)',
      },
      ruby: {
        method: 'payments.create',
        example:
          'require "dodopayments"\n\ndodo_payments = Dodopayments::Client.new(\n  bearer_token: "My Bearer Token",\n  environment: "test_mode" # defaults to "live_mode"\n)\n\npayment = dodo_payments.payments.create(\n  billing: {country: :AF},\n  customer: {customer_id: "customer_id"},\n  product_cart: [{product_id: "product_id", quantity: 0}]\n)\n\nputs(payment)',
      },
      typescript: {
        method: 'client.payments.create',
        example:
          "import DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments({\n  bearerToken: process.env['DODO_PAYMENTS_API_KEY'], // This is the default and can be omitted\n});\n\nconst payment = await client.payments.create({\n  billing: { country: 'AF' },\n  customer: { customer_id: 'customer_id' },\n  product_cart: [{ product_id: 'product_id', quantity: 0 }],\n});\n\nconsole.log(payment.payment_id);",
      },
    },
  },
  {
    name: 'retrieve',
    endpoint: '/payments/{payment_id}',
    httpMethod: 'get',
    summary: '',
    description: '',
    stainlessPath: '(resource) payments > (method) retrieve',
    qualified: 'client.payments.retrieve',
    params: ['payment_id: string;'],
    response:
      "{ billing: object; brand_id: string; business_id: string; created_at: string; currency: string; customer: object; digital_products_delivered: boolean; disputes: object[]; metadata: object; payment_id: string; refunds: object[]; settlement_amount: number; settlement_currency: string; total_amount: number; card_holder_name?: string; card_issuing_country?: string; card_last_four?: string; card_network?: string; card_type?: string; checkout_session_id?: string; custom_field_responses?: object[]; discount_id?: string; error_code?: string; error_message?: string; invoice_id?: string; invoice_url?: string; payment_link?: string; payment_method?: string; payment_method_type?: string; product_cart?: object[]; refund_status?: 'partial' | 'full'; settlement_tax?: number; status?: string; subscription_id?: string; tax?: number; updated_at?: string; }",
    markdown:
      "## retrieve\n\n`client.payments.retrieve(payment_id: string): { billing: billing_address; brand_id: string; business_id: string; created_at: string; currency: currency; customer: customer_limited_details; digital_products_delivered: boolean; disputes: dispute[]; metadata: object; payment_id: string; refunds: refund_list_item[]; settlement_amount: number; settlement_currency: currency; total_amount: number; card_holder_name?: string; card_issuing_country?: country_code; card_last_four?: string; card_network?: string; card_type?: string; checkout_session_id?: string; custom_field_responses?: custom_field_response[]; discount_id?: string; error_code?: string; error_message?: string; invoice_id?: string; invoice_url?: string; payment_link?: string; payment_method?: string; payment_method_type?: string; product_cart?: one_time_product_cart_item[]; refund_status?: payment_refund_status; settlement_tax?: number; status?: intent_status; subscription_id?: string; tax?: number; updated_at?: string; }`\n\n**get** `/payments/{payment_id}`\n\n### Parameters\n\n- `payment_id: string`\n\n### Returns\n\n- `{ billing: { country: country_code; city?: string; state?: string; street?: string; zipcode?: string; }; brand_id: string; business_id: string; created_at: string; currency: string; customer: { customer_id: string; email: string; name: string; metadata?: object; phone_number?: string; }; digital_products_delivered: boolean; disputes: { amount: string; business_id: string; created_at: string; currency: string; dispute_id: string; dispute_stage: dispute_stage; dispute_status: dispute_status; payment_id: string; is_resolved_by_rdr?: boolean; remarks?: string; }[]; metadata: object; payment_id: string; refunds: { business_id: string; created_at: string; is_partial: boolean; payment_id: string; refund_id: string; status: refund_status; amount?: number; currency?: currency; reason?: string; }[]; settlement_amount: number; settlement_currency: string; total_amount: number; card_holder_name?: string; card_issuing_country?: string; card_last_four?: string; card_network?: string; card_type?: string; checkout_session_id?: string; custom_field_responses?: { key: string; value: string; }[]; discount_id?: string; error_code?: string; error_message?: string; invoice_id?: string; invoice_url?: string; payment_link?: string; payment_method?: string; payment_method_type?: string; product_cart?: { product_id: string; quantity: number; }[]; refund_status?: 'partial' | 'full'; settlement_tax?: number; status?: string; subscription_id?: string; tax?: number; updated_at?: string; }`\n\n  - `billing: { country: string; city?: string; state?: string; street?: string; zipcode?: string; }`\n  - `brand_id: string`\n  - `business_id: string`\n  - `created_at: string`\n  - `currency: string`\n  - `customer: { customer_id: string; email: string; name: string; metadata?: object; phone_number?: string; }`\n  - `digital_products_delivered: boolean`\n  - `disputes: { amount: string; business_id: string; created_at: string; currency: string; dispute_id: string; dispute_stage: 'pre_dispute' | 'dispute' | 'pre_arbitration'; dispute_status: string; payment_id: string; is_resolved_by_rdr?: boolean; remarks?: string; }[]`\n  - `metadata: object`\n  - `payment_id: string`\n  - `refunds: { business_id: string; created_at: string; is_partial: boolean; payment_id: string; refund_id: string; status: 'succeeded' | 'failed' | 'pending' | 'review'; amount?: number; currency?: string; reason?: string; }[]`\n  - `settlement_amount: number`\n  - `settlement_currency: string`\n  - `total_amount: number`\n  - `card_holder_name?: string`\n  - `card_issuing_country?: string`\n  - `card_last_four?: string`\n  - `card_network?: string`\n  - `card_type?: string`\n  - `checkout_session_id?: string`\n  - `custom_field_responses?: { key: string; value: string; }[]`\n  - `discount_id?: string`\n  - `error_code?: string`\n  - `error_message?: string`\n  - `invoice_id?: string`\n  - `invoice_url?: string`\n  - `payment_link?: string`\n  - `payment_method?: string`\n  - `payment_method_type?: string`\n  - `product_cart?: { product_id: string; quantity: number; }[]`\n  - `refund_status?: 'partial' | 'full'`\n  - `settlement_tax?: number`\n  - `status?: string`\n  - `subscription_id?: string`\n  - `tax?: number`\n  - `updated_at?: string`\n\n### Example\n\n```typescript\nimport DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments();\n\nconst payment = await client.payments.retrieve('payment_id');\n\nconsole.log(payment);\n```",
    perLanguage: {
      cli: {
        method: 'payments retrieve',
        example:
          "dodo-payments-cli payments retrieve \\\n  --bearer-token 'My Bearer Token' \\\n  --payment-id payment_id",
      },
      csharp: {
        method: 'Payments.Retrieve',
        example:
          'PaymentRetrieveParams parameters = new() { PaymentID = "payment_id" };\n\nvar payment = await client.Payments.Retrieve(parameters);\n\nConsole.WriteLine(payment);',
      },
      go: {
        method: 'client.Payments.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/dodopayments/dodopayments-go"\n\t"github.com/dodopayments/dodopayments-go/option"\n)\n\nfunc main() {\n\tclient := dodopayments.NewClient(\n\t\toption.WithBearerToken("My Bearer Token"),\n\t)\n\tpayment, err := client.Payments.Get(context.TODO(), "payment_id")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", payment.BrandID)\n}\n',
      },
      http: {
        example:
          'curl https://live.dodopayments.com/payments/$PAYMENT_ID \\\n    -H "Authorization: Bearer $DODO_PAYMENTS_API_KEY"',
      },
      java: {
        method: 'payments().retrieve',
        example:
          'package com.dodopayments.api.example;\n\nimport com.dodopayments.api.client.DodoPaymentsClient;\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient;\nimport com.dodopayments.api.models.payments.Payment;\nimport com.dodopayments.api.models.payments.PaymentRetrieveParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        DodoPaymentsClient client = DodoPaymentsOkHttpClient.fromEnv();\n\n        Payment payment = client.payments().retrieve("payment_id");\n    }\n}',
      },
      kotlin: {
        method: 'payments().retrieve',
        example:
          'package com.dodopayments.api.example\n\nimport com.dodopayments.api.client.DodoPaymentsClient\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient\nimport com.dodopayments.api.models.payments.Payment\nimport com.dodopayments.api.models.payments.PaymentRetrieveParams\n\nfun main() {\n    val client: DodoPaymentsClient = DodoPaymentsOkHttpClient.fromEnv()\n\n    val payment: Payment = client.payments().retrieve("payment_id")\n}',
      },
      php: {
        method: 'payments->retrieve',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(bearerToken: 'My Bearer Token', environment: 'test_mode');\n\n$payment = $client->payments->retrieve('payment_id');\n\nvar_dump($payment);",
      },
      python: {
        method: 'payments.retrieve',
        example:
          'import os\nfrom dodopayments import DodoPayments\n\nclient = DodoPayments(\n    bearer_token=os.environ.get("DODO_PAYMENTS_API_KEY"),  # This is the default and can be omitted\n)\npayment = client.payments.retrieve(\n    "payment_id",\n)\nprint(payment.brand_id)',
      },
      ruby: {
        method: 'payments.retrieve',
        example:
          'require "dodopayments"\n\ndodo_payments = Dodopayments::Client.new(\n  bearer_token: "My Bearer Token",\n  environment: "test_mode" # defaults to "live_mode"\n)\n\npayment = dodo_payments.payments.retrieve("payment_id")\n\nputs(payment)',
      },
      typescript: {
        method: 'client.payments.retrieve',
        example:
          "import DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments({\n  bearerToken: process.env['DODO_PAYMENTS_API_KEY'], // This is the default and can be omitted\n});\n\nconst payment = await client.payments.retrieve('payment_id');\n\nconsole.log(payment.brand_id);",
      },
    },
  },
  {
    name: 'retrieve_line_items',
    endpoint: '/payments/{payment_id}/line-items',
    httpMethod: 'get',
    summary: '',
    description: '',
    stainlessPath: '(resource) payments > (method) retrieve_line_items',
    qualified: 'client.payments.retrieveLineItems',
    params: ['payment_id: string;'],
    response:
      '{ currency: string; items: { amount: number; items_id: string; refundable_amount: number; tax: number; description?: string; name?: string; }[]; }',
    markdown:
      "## retrieve_line_items\n\n`client.payments.retrieveLineItems(payment_id: string): { currency: currency; items: object[]; }`\n\n**get** `/payments/{payment_id}/line-items`\n\n### Parameters\n\n- `payment_id: string`\n\n### Returns\n\n- `{ currency: string; items: { amount: number; items_id: string; refundable_amount: number; tax: number; description?: string; name?: string; }[]; }`\n\n  - `currency: string`\n  - `items: { amount: number; items_id: string; refundable_amount: number; tax: number; description?: string; name?: string; }[]`\n\n### Example\n\n```typescript\nimport DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments();\n\nconst response = await client.payments.retrieveLineItems('payment_id');\n\nconsole.log(response);\n```",
    perLanguage: {
      cli: {
        method: 'payments retrieve_line_items',
        example:
          "dodo-payments-cli payments retrieve-line-items \\\n  --bearer-token 'My Bearer Token' \\\n  --payment-id payment_id",
      },
      csharp: {
        method: 'Payments.RetrieveLineItems',
        example:
          'PaymentRetrieveLineItemsParams parameters = new() { PaymentID = "payment_id" };\n\nvar response = await client.Payments.RetrieveLineItems(parameters);\n\nConsole.WriteLine(response);',
      },
      go: {
        method: 'client.Payments.GetLineItems',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/dodopayments/dodopayments-go"\n\t"github.com/dodopayments/dodopayments-go/option"\n)\n\nfunc main() {\n\tclient := dodopayments.NewClient(\n\t\toption.WithBearerToken("My Bearer Token"),\n\t)\n\tresponse, err := client.Payments.GetLineItems(context.TODO(), "payment_id")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.Currency)\n}\n',
      },
      http: {
        example:
          'curl https://live.dodopayments.com/payments/$PAYMENT_ID/line-items \\\n    -H "Authorization: Bearer $DODO_PAYMENTS_API_KEY"',
      },
      java: {
        method: 'payments().retrieveLineItems',
        example:
          'package com.dodopayments.api.example;\n\nimport com.dodopayments.api.client.DodoPaymentsClient;\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient;\nimport com.dodopayments.api.models.payments.PaymentRetrieveLineItemsParams;\nimport com.dodopayments.api.models.payments.PaymentRetrieveLineItemsResponse;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        DodoPaymentsClient client = DodoPaymentsOkHttpClient.fromEnv();\n\n        PaymentRetrieveLineItemsResponse response = client.payments().retrieveLineItems("payment_id");\n    }\n}',
      },
      kotlin: {
        method: 'payments().retrieveLineItems',
        example:
          'package com.dodopayments.api.example\n\nimport com.dodopayments.api.client.DodoPaymentsClient\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient\nimport com.dodopayments.api.models.payments.PaymentRetrieveLineItemsParams\nimport com.dodopayments.api.models.payments.PaymentRetrieveLineItemsResponse\n\nfun main() {\n    val client: DodoPaymentsClient = DodoPaymentsOkHttpClient.fromEnv()\n\n    val response: PaymentRetrieveLineItemsResponse = client.payments().retrieveLineItems("payment_id")\n}',
      },
      php: {
        method: 'payments->retrieveLineItems',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(bearerToken: 'My Bearer Token', environment: 'test_mode');\n\n$response = $client->payments->retrieveLineItems('payment_id');\n\nvar_dump($response);",
      },
      python: {
        method: 'payments.retrieve_line_items',
        example:
          'import os\nfrom dodopayments import DodoPayments\n\nclient = DodoPayments(\n    bearer_token=os.environ.get("DODO_PAYMENTS_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.payments.retrieve_line_items(\n    "payment_id",\n)\nprint(response.currency)',
      },
      ruby: {
        method: 'payments.retrieve_line_items',
        example:
          'require "dodopayments"\n\ndodo_payments = Dodopayments::Client.new(\n  bearer_token: "My Bearer Token",\n  environment: "test_mode" # defaults to "live_mode"\n)\n\nresponse = dodo_payments.payments.retrieve_line_items("payment_id")\n\nputs(response)',
      },
      typescript: {
        method: 'client.payments.retrieveLineItems',
        example:
          "import DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments({\n  bearerToken: process.env['DODO_PAYMENTS_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.payments.retrieveLineItems('payment_id');\n\nconsole.log(response.currency);",
      },
    },
  },
  {
    name: 'list',
    endpoint: '/subscriptions',
    httpMethod: 'get',
    summary: '',
    description: '',
    stainlessPath: '(resource) subscriptions > (method) list',
    qualified: 'client.subscriptions.list',
    params: [
      'brand_id?: string;',
      'created_at_gte?: string;',
      'created_at_lte?: string;',
      'customer_id?: string;',
      'page_number?: number;',
      'page_size?: number;',
      'product_id?: string;',
      "status?: 'pending' | 'active' | 'on_hold' | 'cancelled' | 'failed' | 'expired';",
    ],
    response:
      "{ billing: { country: country_code; city?: string; state?: string; street?: string; zipcode?: string; }; cancel_at_next_billing_date: boolean; created_at: string; currency: string; customer: { customer_id: string; email: string; name: string; metadata?: object; phone_number?: string; }; metadata: object; next_billing_date: string; on_demand: boolean; payment_frequency_count: number; payment_frequency_interval: 'Day' | 'Week' | 'Month' | 'Year'; previous_billing_date: string; product_id: string; quantity: number; recurring_pre_tax_amount: number; status: 'pending' | 'active' | 'on_hold' | 'cancelled' | 'failed' | 'expired'; subscription_id: string; subscription_period_count: number; subscription_period_interval: 'Day' | 'Week' | 'Month' | 'Year'; tax_inclusive: boolean; trial_period_days: number; cancelled_at?: string; discount_cycles_remaining?: number; discount_id?: string; payment_method_id?: string; product_name?: string; scheduled_change?: { id: string; addons: { addon_id: string; name: string; quantity: number; }[]; created_at: string; effective_at: string; product_id: string; quantity: number; product_description?: string; product_name?: string; }; tax_id?: string; }",
    markdown:
      "## list\n\n`client.subscriptions.list(brand_id?: string, created_at_gte?: string, created_at_lte?: string, customer_id?: string, page_number?: number, page_size?: number, product_id?: string, status?: 'pending' | 'active' | 'on_hold' | 'cancelled' | 'failed' | 'expired'): { billing: billing_address; cancel_at_next_billing_date: boolean; created_at: string; currency: currency; customer: customer_limited_details; metadata: object; next_billing_date: string; on_demand: boolean; payment_frequency_count: number; payment_frequency_interval: time_interval; previous_billing_date: string; product_id: string; quantity: number; recurring_pre_tax_amount: number; status: subscription_status; subscription_id: string; subscription_period_count: number; subscription_period_interval: time_interval; tax_inclusive: boolean; trial_period_days: number; cancelled_at?: string; discount_cycles_remaining?: number; discount_id?: string; payment_method_id?: string; product_name?: string; scheduled_change?: object; tax_id?: string; }`\n\n**get** `/subscriptions`\n\n### Parameters\n\n- `brand_id?: string`\n  filter by Brand id\n\n- `created_at_gte?: string`\n  Get events after this created time\n\n- `created_at_lte?: string`\n  Get events created before this time\n\n- `customer_id?: string`\n  Filter by customer id\n\n- `page_number?: number`\n  Page number default is 0\n\n- `page_size?: number`\n  Page size default is 10 max is 100\n\n- `product_id?: string`\n  Filter by product id\n\n- `status?: 'pending' | 'active' | 'on_hold' | 'cancelled' | 'failed' | 'expired'`\n  Filter by status\n\n### Returns\n\n- `{ billing: { country: country_code; city?: string; state?: string; street?: string; zipcode?: string; }; cancel_at_next_billing_date: boolean; created_at: string; currency: string; customer: { customer_id: string; email: string; name: string; metadata?: object; phone_number?: string; }; metadata: object; next_billing_date: string; on_demand: boolean; payment_frequency_count: number; payment_frequency_interval: 'Day' | 'Week' | 'Month' | 'Year'; previous_billing_date: string; product_id: string; quantity: number; recurring_pre_tax_amount: number; status: 'pending' | 'active' | 'on_hold' | 'cancelled' | 'failed' | 'expired'; subscription_id: string; subscription_period_count: number; subscription_period_interval: 'Day' | 'Week' | 'Month' | 'Year'; tax_inclusive: boolean; trial_period_days: number; cancelled_at?: string; discount_cycles_remaining?: number; discount_id?: string; payment_method_id?: string; product_name?: string; scheduled_change?: { id: string; addons: { addon_id: string; name: string; quantity: number; }[]; created_at: string; effective_at: string; product_id: string; quantity: number; product_description?: string; product_name?: string; }; tax_id?: string; }`\n  Response struct representing subscription details\n\n  - `billing: { country: string; city?: string; state?: string; street?: string; zipcode?: string; }`\n  - `cancel_at_next_billing_date: boolean`\n  - `created_at: string`\n  - `currency: string`\n  - `customer: { customer_id: string; email: string; name: string; metadata?: object; phone_number?: string; }`\n  - `metadata: object`\n  - `next_billing_date: string`\n  - `on_demand: boolean`\n  - `payment_frequency_count: number`\n  - `payment_frequency_interval: 'Day' | 'Week' | 'Month' | 'Year'`\n  - `previous_billing_date: string`\n  - `product_id: string`\n  - `quantity: number`\n  - `recurring_pre_tax_amount: number`\n  - `status: 'pending' | 'active' | 'on_hold' | 'cancelled' | 'failed' | 'expired'`\n  - `subscription_id: string`\n  - `subscription_period_count: number`\n  - `subscription_period_interval: 'Day' | 'Week' | 'Month' | 'Year'`\n  - `tax_inclusive: boolean`\n  - `trial_period_days: number`\n  - `cancelled_at?: string`\n  - `discount_cycles_remaining?: number`\n  - `discount_id?: string`\n  - `payment_method_id?: string`\n  - `product_name?: string`\n  - `scheduled_change?: { id: string; addons: { addon_id: string; name: string; quantity: number; }[]; created_at: string; effective_at: string; product_id: string; quantity: number; product_description?: string; product_name?: string; }`\n  - `tax_id?: string`\n\n### Example\n\n```typescript\nimport DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments();\n\n// Automatically fetches more pages as needed.\nfor await (const subscriptionListResponse of client.subscriptions.list()) {\n  console.log(subscriptionListResponse);\n}\n```",
    perLanguage: {
      cli: {
        method: 'subscriptions list',
        example: "dodo-payments-cli subscriptions list \\\n  --bearer-token 'My Bearer Token'",
      },
      csharp: {
        method: 'Subscriptions.List',
        example:
          'SubscriptionListParams parameters = new();\n\nvar page = await client.Subscriptions.List(parameters);\nawait foreach (var item in page.Paginate())\n{\n    Console.WriteLine(item);\n}',
      },
      go: {
        method: 'client.Subscriptions.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/dodopayments/dodopayments-go"\n\t"github.com/dodopayments/dodopayments-go/option"\n)\n\nfunc main() {\n\tclient := dodopayments.NewClient(\n\t\toption.WithBearerToken("My Bearer Token"),\n\t)\n\tpage, err := client.Subscriptions.List(context.TODO(), dodopayments.SubscriptionListParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", page)\n}\n',
      },
      http: {
        example:
          'curl https://live.dodopayments.com/subscriptions \\\n    -H "Authorization: Bearer $DODO_PAYMENTS_API_KEY"',
      },
      java: {
        method: 'subscriptions().list',
        example:
          'package com.dodopayments.api.example;\n\nimport com.dodopayments.api.client.DodoPaymentsClient;\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient;\nimport com.dodopayments.api.models.subscriptions.SubscriptionListPage;\nimport com.dodopayments.api.models.subscriptions.SubscriptionListParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        DodoPaymentsClient client = DodoPaymentsOkHttpClient.fromEnv();\n\n        SubscriptionListPage page = client.subscriptions().list();\n    }\n}',
      },
      kotlin: {
        method: 'subscriptions().list',
        example:
          'package com.dodopayments.api.example\n\nimport com.dodopayments.api.client.DodoPaymentsClient\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient\nimport com.dodopayments.api.models.subscriptions.SubscriptionListPage\nimport com.dodopayments.api.models.subscriptions.SubscriptionListParams\n\nfun main() {\n    val client: DodoPaymentsClient = DodoPaymentsOkHttpClient.fromEnv()\n\n    val page: SubscriptionListPage = client.subscriptions().list()\n}',
      },
      php: {
        method: 'subscriptions->list',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(bearerToken: 'My Bearer Token', environment: 'test_mode');\n\n$page = $client->subscriptions->list(\n  brandID: 'brand_id',\n  createdAtGte: new \\DateTimeImmutable('2019-12-27T18:11:19.117Z'),\n  createdAtLte: new \\DateTimeImmutable('2019-12-27T18:11:19.117Z'),\n  customerID: 'customer_id',\n  pageNumber: 0,\n  pageSize: 0,\n  productID: 'product_id',\n  status: 'pending',\n);\n\nvar_dump($page);",
      },
      python: {
        method: 'subscriptions.list',
        example:
          'import os\nfrom dodopayments import DodoPayments\n\nclient = DodoPayments(\n    bearer_token=os.environ.get("DODO_PAYMENTS_API_KEY"),  # This is the default and can be omitted\n)\npage = client.subscriptions.list()\npage = page.items[0]\nprint(page.product_id)',
      },
      ruby: {
        method: 'subscriptions.list',
        example:
          'require "dodopayments"\n\ndodo_payments = Dodopayments::Client.new(\n  bearer_token: "My Bearer Token",\n  environment: "test_mode" # defaults to "live_mode"\n)\n\npage = dodo_payments.subscriptions.list\n\nputs(page)',
      },
      typescript: {
        method: 'client.subscriptions.list',
        example:
          "import DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments({\n  bearerToken: process.env['DODO_PAYMENTS_API_KEY'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const subscriptionListResponse of client.subscriptions.list()) {\n  console.log(subscriptionListResponse.product_id);\n}",
      },
    },
  },
  {
    name: 'create',
    endpoint: '/subscriptions',
    httpMethod: 'post',
    summary: '',
    description: '',
    stainlessPath: '(resource) subscriptions > (method) create',
    qualified: 'client.subscriptions.create',
    params: [
      'billing: { country: string; city?: string; state?: string; street?: string; zipcode?: string; };',
      'customer: { customer_id: string; } | { email: string; name?: string; phone_number?: string; };',
      'product_id: string;',
      'quantity: number;',
      'addons?: { addon_id: string; quantity: number; }[];',
      'allowed_payment_method_types?: string[];',
      'billing_currency?: string;',
      'discount_code?: string;',
      'force_3ds?: boolean;',
      'metadata?: object;',
      'on_demand?: { mandate_only: boolean; adaptive_currency_fees_inclusive?: boolean; product_currency?: string; product_description?: string; product_price?: number; };',
      'one_time_product_cart?: { product_id: string; quantity: number; amount?: number; }[];',
      'payment_link?: boolean;',
      'payment_method_id?: string;',
      'redirect_immediately?: boolean;',
      'return_url?: string;',
      'short_link?: boolean;',
      'show_saved_payment_methods?: boolean;',
      'tax_id?: string;',
      'trial_period_days?: number;',
    ],
    response:
      '{ addons: { addon_id: string; quantity: number; }[]; customer: { customer_id: string; email: string; name: string; metadata?: object; phone_number?: string; }; metadata: object; payment_id: string; recurring_pre_tax_amount: number; subscription_id: string; client_secret?: string; discount_id?: string; expires_on?: string; one_time_product_cart?: { product_id: string; quantity: number; }[]; payment_link?: string; }',
    markdown:
      "## create\n\n`client.subscriptions.create(billing: { country: country_code; city?: string; state?: string; street?: string; zipcode?: string; }, customer: object | object, product_id: string, quantity: number, addons?: { addon_id: string; quantity: number; }[], allowed_payment_method_types?: string[], billing_currency?: string, discount_code?: string, force_3ds?: boolean, metadata?: object, on_demand?: { mandate_only: boolean; adaptive_currency_fees_inclusive?: boolean; product_currency?: currency; product_description?: string; product_price?: number; }, one_time_product_cart?: { product_id: string; quantity: number; amount?: number; }[], payment_link?: boolean, payment_method_id?: string, redirect_immediately?: boolean, return_url?: string, short_link?: boolean, show_saved_payment_methods?: boolean, tax_id?: string, trial_period_days?: number): { addons: addon_cart_response_item[]; customer: customer_limited_details; metadata: object; payment_id: string; recurring_pre_tax_amount: number; subscription_id: string; client_secret?: string; discount_id?: string; expires_on?: string; one_time_product_cart?: one_time_product_cart_item[]; payment_link?: string; }`\n\n**post** `/subscriptions`\n\n### Parameters\n\n- `billing: { country: string; city?: string; state?: string; street?: string; zipcode?: string; }`\n  Billing address information for the subscription\n  - `country: string`\n    Two-letter ISO country code (ISO 3166-1 alpha-2)\n  - `city?: string`\n    City name\n  - `state?: string`\n    State or province name\n  - `street?: string`\n    Street address including house number and unit/apartment if applicable\n  - `zipcode?: string`\n    Postal code or ZIP code\n\n- `customer: { customer_id: string; } | { email: string; name?: string; phone_number?: string; }`\n  Customer details for the subscription\n\n- `product_id: string`\n  Unique identifier of the product to subscribe to\n\n- `quantity: number`\n  Number of units to subscribe for. Must be at least 1.\n\n- `addons?: { addon_id: string; quantity: number; }[]`\n  Attach addons to this subscription\n\n- `allowed_payment_method_types?: string[]`\n  List of payment methods allowed during checkout.\n\nCustomers will **never** see payment methods that are **not** in this list.\nHowever, adding a method here **does not guarantee** customers will see it.\nAvailability still depends on other factors (e.g., customer location, merchant settings).\n\n- `billing_currency?: string`\n  Fix the currency in which the end customer is billed.\nIf Dodo Payments cannot support that currency for this transaction, it will not proceed\n\n- `discount_code?: string`\n  Discount Code to apply to the subscription\n\n- `force_3ds?: boolean`\n  Override merchant default 3DS behaviour for this subscription\n\n- `metadata?: object`\n  Additional metadata for the subscription\nDefaults to empty if not specified\n\n- `on_demand?: { mandate_only: boolean; adaptive_currency_fees_inclusive?: boolean; product_currency?: string; product_description?: string; product_price?: number; }`\n  - `mandate_only: boolean`\n    If set as True, does not perform any charge and only authorizes payment method details for future use.\n  - `adaptive_currency_fees_inclusive?: boolean`\n    Whether adaptive currency fees should be included in the product_price (true) or added on top (false).\nThis field is ignored if adaptive pricing is not enabled for the business.\n  - `product_currency?: string`\n    Optional currency of the product price. If not specified, defaults to the currency of the product.\n  - `product_description?: string`\n    Optional product description override for billing and line items.\nIf not specified, the stored description of the product will be used.\n  - `product_price?: number`\n    Product price for the initial charge to customer\nIf not specified the stored price of the product will be used\nRepresented in the lowest denomination of the currency (e.g., cents for USD).\nFor example, to charge $1.00, pass `100`.\n\n- `one_time_product_cart?: { product_id: string; quantity: number; amount?: number; }[]`\n  List of one time products that will be bundled with the first payment for this subscription\n\n- `payment_link?: boolean`\n  If true, generates a payment link.\nDefaults to false if not specified.\n\n- `payment_method_id?: string`\n  Optional payment method ID to use for this subscription.\nIf provided, customer_id must also be provided (via AttachExistingCustomer).\nThe payment method will be validated for eligibility with the subscription's currency.\n\n- `redirect_immediately?: boolean`\n  If true, redirects the customer immediately after payment completion\nFalse by default\n\n- `return_url?: string`\n  Optional URL to redirect after successful subscription creation\n\n- `short_link?: boolean`\n  If true, returns a shortened payment link.\nDefaults to false if not specified.\n\n- `show_saved_payment_methods?: boolean`\n  Display saved payment methods of a returning customer\nFalse by default\n\n- `tax_id?: string`\n  Tax ID in case the payment is B2B. If tax id validation fails the payment creation will fail\n\n- `trial_period_days?: number`\n  Optional trial period in days\nIf specified, this value overrides the trial period set in the product's price\nMust be between 0 and 10000 days\n\n### Returns\n\n- `{ addons: { addon_id: string; quantity: number; }[]; customer: { customer_id: string; email: string; name: string; metadata?: object; phone_number?: string; }; metadata: object; payment_id: string; recurring_pre_tax_amount: number; subscription_id: string; client_secret?: string; discount_id?: string; expires_on?: string; one_time_product_cart?: { product_id: string; quantity: number; }[]; payment_link?: string; }`\n\n  - `addons: { addon_id: string; quantity: number; }[]`\n  - `customer: { customer_id: string; email: string; name: string; metadata?: object; phone_number?: string; }`\n  - `metadata: object`\n  - `payment_id: string`\n  - `recurring_pre_tax_amount: number`\n  - `subscription_id: string`\n  - `client_secret?: string`\n  - `discount_id?: string`\n  - `expires_on?: string`\n  - `one_time_product_cart?: { product_id: string; quantity: number; }[]`\n  - `payment_link?: string`\n\n### Example\n\n```typescript\nimport DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments();\n\nconst subscription = await client.subscriptions.create({\n  billing: { country: 'AF' },\n  customer: { customer_id: 'customer_id' },\n  product_id: 'product_id',\n  quantity: 0,\n});\n\nconsole.log(subscription);\n```",
    perLanguage: {
      cli: {
        method: 'subscriptions create',
        example:
          "dodo-payments-cli subscriptions create \\\n  --bearer-token 'My Bearer Token' \\\n  --billing '{country: AF}' \\\n  --customer '{customer_id: customer_id}' \\\n  --product-id product_id \\\n  --quantity 0",
      },
      csharp: {
        method: 'Subscriptions.Create',
        example:
          'SubscriptionCreateParams parameters = new()\n{\n    Billing = new()\n    {\n        Country = CountryCode.Af,\n        City = "city",\n        State = "state",\n        Street = "street",\n        Zipcode = "zipcode",\n    },\n    Customer = new AttachExistingCustomer("customer_id"),\n    ProductID = "product_id",\n    Quantity = 0,\n};\n\nvar subscription = await client.Subscriptions.Create(parameters);\n\nConsole.WriteLine(subscription);',
      },
      go: {
        method: 'client.Subscriptions.New',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/dodopayments/dodopayments-go"\n\t"github.com/dodopayments/dodopayments-go/option"\n)\n\nfunc main() {\n\tclient := dodopayments.NewClient(\n\t\toption.WithBearerToken("My Bearer Token"),\n\t)\n\tsubscription, err := client.Subscriptions.New(context.TODO(), dodopayments.SubscriptionNewParams{\n\t\tBilling: dodopayments.F(dodopayments.BillingAddressParam{\n\t\t\tCountry: dodopayments.F(dodopayments.CountryCodeAf),\n\t\t}),\n\t\tCustomer: dodopayments.F[dodopayments.CustomerRequestUnionParam](dodopayments.AttachExistingCustomerParam{\n\t\t\tCustomerID: dodopayments.F("customer_id"),\n\t\t}),\n\t\tProductID: dodopayments.F("product_id"),\n\t\tQuantity:  dodopayments.F(int64(0)),\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", subscription.PaymentID)\n}\n',
      },
      http: {
        example:
          'curl https://live.dodopayments.com/subscriptions \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $DODO_PAYMENTS_API_KEY" \\\n    -d \'{\n          "billing": {\n            "country": "AF"\n          },\n          "customer": {\n            "customer_id": "customer_id"\n          },\n          "product_id": "product_id",\n          "quantity": 0\n        }\'',
      },
      java: {
        method: 'subscriptions().create',
        example:
          'package com.dodopayments.api.example;\n\nimport com.dodopayments.api.client.DodoPaymentsClient;\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient;\nimport com.dodopayments.api.models.misc.CountryCode;\nimport com.dodopayments.api.models.payments.AttachExistingCustomer;\nimport com.dodopayments.api.models.payments.BillingAddress;\nimport com.dodopayments.api.models.subscriptions.SubscriptionCreateParams;\nimport com.dodopayments.api.models.subscriptions.SubscriptionCreateResponse;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        DodoPaymentsClient client = DodoPaymentsOkHttpClient.fromEnv();\n\n        SubscriptionCreateParams params = SubscriptionCreateParams.builder()\n            .billing(BillingAddress.builder()\n                .country(CountryCode.AF)\n                .build())\n            .customer(AttachExistingCustomer.builder()\n                .customerId("customer_id")\n                .build())\n            .productId("product_id")\n            .quantity(0)\n            .build();\n        SubscriptionCreateResponse subscription = client.subscriptions().create(params);\n    }\n}',
      },
      kotlin: {
        method: 'subscriptions().create',
        example:
          'package com.dodopayments.api.example\n\nimport com.dodopayments.api.client.DodoPaymentsClient\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient\nimport com.dodopayments.api.models.misc.CountryCode\nimport com.dodopayments.api.models.payments.AttachExistingCustomer\nimport com.dodopayments.api.models.payments.BillingAddress\nimport com.dodopayments.api.models.subscriptions.SubscriptionCreateParams\nimport com.dodopayments.api.models.subscriptions.SubscriptionCreateResponse\n\nfun main() {\n    val client: DodoPaymentsClient = DodoPaymentsOkHttpClient.fromEnv()\n\n    val params: SubscriptionCreateParams = SubscriptionCreateParams.builder()\n        .billing(BillingAddress.builder()\n            .country(CountryCode.AF)\n            .build())\n        .customer(AttachExistingCustomer.builder()\n            .customerId("customer_id")\n            .build())\n        .productId("product_id")\n        .quantity(0)\n        .build()\n    val subscription: SubscriptionCreateResponse = client.subscriptions().create(params)\n}',
      },
      php: {
        method: 'subscriptions->create',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(bearerToken: 'My Bearer Token', environment: 'test_mode');\n\n$subscription = $client->subscriptions->create(\n  billing: [\n    'country' => CountryCode::AF,\n    'city' => 'city',\n    'state' => 'state',\n    'street' => 'street',\n    'zipcode' => 'zipcode',\n  ],\n  customer: ['customerID' => 'customer_id'],\n  productID: 'product_id',\n  quantity: 0,\n  addons: [['addonID' => 'addon_id', 'quantity' => 0]],\n  allowedPaymentMethodTypes: [PaymentMethodTypes::ACH],\n  billingCurrency: Currency::AED,\n  discountCode: 'discount_code',\n  force3DS: true,\n  metadata: ['foo' => 'string'],\n  onDemand: [\n    'mandateOnly' => true,\n    'adaptiveCurrencyFeesInclusive' => true,\n    'productCurrency' => Currency::AED,\n    'productDescription' => 'product_description',\n    'productPrice' => 0,\n  ],\n  oneTimeProductCart: [\n    ['productID' => 'product_id', 'quantity' => 0, 'amount' => 0]\n  ],\n  paymentLink: true,\n  paymentMethodID: 'payment_method_id',\n  redirectImmediately: true,\n  returnURL: 'return_url',\n  shortLink: true,\n  showSavedPaymentMethods: true,\n  taxID: 'tax_id',\n  trialPeriodDays: 0,\n);\n\nvar_dump($subscription);",
      },
      python: {
        method: 'subscriptions.create',
        example:
          'import os\nfrom dodopayments import DodoPayments\n\nclient = DodoPayments(\n    bearer_token=os.environ.get("DODO_PAYMENTS_API_KEY"),  # This is the default and can be omitted\n)\nsubscription = client.subscriptions.create(\n    billing={\n        "country": "AF"\n    },\n    customer={\n        "customer_id": "customer_id"\n    },\n    product_id="product_id",\n    quantity=0,\n)\nprint(subscription.payment_id)',
      },
      ruby: {
        method: 'subscriptions.create',
        example:
          'require "dodopayments"\n\ndodo_payments = Dodopayments::Client.new(\n  bearer_token: "My Bearer Token",\n  environment: "test_mode" # defaults to "live_mode"\n)\n\nsubscription = dodo_payments.subscriptions.create(\n  billing: {country: :AF},\n  customer: {customer_id: "customer_id"},\n  product_id: "product_id",\n  quantity: 0\n)\n\nputs(subscription)',
      },
      typescript: {
        method: 'client.subscriptions.create',
        example:
          "import DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments({\n  bearerToken: process.env['DODO_PAYMENTS_API_KEY'], // This is the default and can be omitted\n});\n\nconst subscription = await client.subscriptions.create({\n  billing: { country: 'AF' },\n  customer: { customer_id: 'customer_id' },\n  product_id: 'product_id',\n  quantity: 0,\n});\n\nconsole.log(subscription.payment_id);",
      },
    },
  },
  {
    name: 'retrieve',
    endpoint: '/subscriptions/{subscription_id}',
    httpMethod: 'get',
    summary: '',
    description: '',
    stainlessPath: '(resource) subscriptions > (method) retrieve',
    qualified: 'client.subscriptions.retrieve',
    params: ['subscription_id: string;'],
    response:
      "{ addons: object[]; billing: object; cancel_at_next_billing_date: boolean; created_at: string; credit_entitlement_cart: object[]; currency: string; customer: object; metadata: object; meter_credit_entitlement_cart: object[]; meters: object[]; next_billing_date: string; on_demand: boolean; payment_frequency_count: number; payment_frequency_interval: 'Day' | 'Week' | 'Month' | 'Year'; previous_billing_date: string; product_id: string; quantity: number; recurring_pre_tax_amount: number; status: 'pending' | 'active' | 'on_hold' | 'cancelled' | 'failed' | 'expired'; subscription_id: string; subscription_period_count: number; subscription_period_interval: 'Day' | 'Week' | 'Month' | 'Year'; tax_inclusive: boolean; trial_period_days: number; cancelled_at?: string; custom_field_responses?: object[]; discount_cycles_remaining?: number; discount_id?: string; expires_at?: string; payment_method_id?: string; scheduled_change?: { id: string; addons: object[]; created_at: string; effective_at: string; product_id: string; quantity: number; product_description?: string; product_name?: string; }; tax_id?: string; }",
    markdown:
      "## retrieve\n\n`client.subscriptions.retrieve(subscription_id: string): { addons: addon_cart_response_item[]; billing: billing_address; cancel_at_next_billing_date: boolean; created_at: string; credit_entitlement_cart: credit_entitlement_cart_response[]; currency: currency; customer: customer_limited_details; metadata: object; meter_credit_entitlement_cart: meter_credit_entitlement_cart_response[]; meters: meter_cart_response_item[]; next_billing_date: string; on_demand: boolean; payment_frequency_count: number; payment_frequency_interval: time_interval; previous_billing_date: string; product_id: string; quantity: number; recurring_pre_tax_amount: number; status: subscription_status; subscription_id: string; subscription_period_count: number; subscription_period_interval: time_interval; tax_inclusive: boolean; trial_period_days: number; cancelled_at?: string; custom_field_responses?: custom_field_response[]; discount_cycles_remaining?: number; discount_id?: string; expires_at?: string; payment_method_id?: string; scheduled_change?: object; tax_id?: string; }`\n\n**get** `/subscriptions/{subscription_id}`\n\n### Parameters\n\n- `subscription_id: string`\n\n### Returns\n\n- `{ addons: { addon_id: string; quantity: number; }[]; billing: { country: country_code; city?: string; state?: string; street?: string; zipcode?: string; }; cancel_at_next_billing_date: boolean; created_at: string; credit_entitlement_cart: { credit_entitlement_id: string; credit_entitlement_name: string; credits_amount: string; overage_balance: string; overage_behavior: cbb_overage_behavior; overage_enabled: boolean; product_id: string; remaining_balance: string; rollover_enabled: boolean; unit: string; expires_after_days?: number; low_balance_threshold_percent?: number; max_rollover_count?: number; overage_limit?: string; rollover_percentage?: number; rollover_timeframe_count?: number; rollover_timeframe_interval?: time_interval; }[]; currency: string; customer: { customer_id: string; email: string; name: string; metadata?: object; phone_number?: string; }; metadata: object; meter_credit_entitlement_cart: { credit_entitlement_id: string; meter_id: string; meter_name: string; meter_units_per_credit: string; product_id: string; }[]; meters: { currency: currency; free_threshold: number; measurement_unit: string; meter_id: string; name: string; description?: string; price_per_unit?: string; }[]; next_billing_date: string; on_demand: boolean; payment_frequency_count: number; payment_frequency_interval: 'Day' | 'Week' | 'Month' | 'Year'; previous_billing_date: string; product_id: string; quantity: number; recurring_pre_tax_amount: number; status: 'pending' | 'active' | 'on_hold' | 'cancelled' | 'failed' | 'expired'; subscription_id: string; subscription_period_count: number; subscription_period_interval: 'Day' | 'Week' | 'Month' | 'Year'; tax_inclusive: boolean; trial_period_days: number; cancelled_at?: string; custom_field_responses?: { key: string; value: string; }[]; discount_cycles_remaining?: number; discount_id?: string; expires_at?: string; payment_method_id?: string; scheduled_change?: { id: string; addons: { addon_id: string; name: string; quantity: number; }[]; created_at: string; effective_at: string; product_id: string; quantity: number; product_description?: string; product_name?: string; }; tax_id?: string; }`\n  Response struct representing subscription details\n\n  - `addons: { addon_id: string; quantity: number; }[]`\n  - `billing: { country: string; city?: string; state?: string; street?: string; zipcode?: string; }`\n  - `cancel_at_next_billing_date: boolean`\n  - `created_at: string`\n  - `credit_entitlement_cart: { credit_entitlement_id: string; credit_entitlement_name: string; credits_amount: string; overage_balance: string; overage_behavior: 'forgive_at_reset' | 'invoice_at_billing' | 'carry_deficit' | 'carry_deficit_auto_repay'; overage_enabled: boolean; product_id: string; remaining_balance: string; rollover_enabled: boolean; unit: string; expires_after_days?: number; low_balance_threshold_percent?: number; max_rollover_count?: number; overage_limit?: string; rollover_percentage?: number; rollover_timeframe_count?: number; rollover_timeframe_interval?: 'Day' | 'Week' | 'Month' | 'Year'; }[]`\n  - `currency: string`\n  - `customer: { customer_id: string; email: string; name: string; metadata?: object; phone_number?: string; }`\n  - `metadata: object`\n  - `meter_credit_entitlement_cart: { credit_entitlement_id: string; meter_id: string; meter_name: string; meter_units_per_credit: string; product_id: string; }[]`\n  - `meters: { currency: string; free_threshold: number; measurement_unit: string; meter_id: string; name: string; description?: string; price_per_unit?: string; }[]`\n  - `next_billing_date: string`\n  - `on_demand: boolean`\n  - `payment_frequency_count: number`\n  - `payment_frequency_interval: 'Day' | 'Week' | 'Month' | 'Year'`\n  - `previous_billing_date: string`\n  - `product_id: string`\n  - `quantity: number`\n  - `recurring_pre_tax_amount: number`\n  - `status: 'pending' | 'active' | 'on_hold' | 'cancelled' | 'failed' | 'expired'`\n  - `subscription_id: string`\n  - `subscription_period_count: number`\n  - `subscription_period_interval: 'Day' | 'Week' | 'Month' | 'Year'`\n  - `tax_inclusive: boolean`\n  - `trial_period_days: number`\n  - `cancelled_at?: string`\n  - `custom_field_responses?: { key: string; value: string; }[]`\n  - `discount_cycles_remaining?: number`\n  - `discount_id?: string`\n  - `expires_at?: string`\n  - `payment_method_id?: string`\n  - `scheduled_change?: { id: string; addons: { addon_id: string; name: string; quantity: number; }[]; created_at: string; effective_at: string; product_id: string; quantity: number; product_description?: string; product_name?: string; }`\n  - `tax_id?: string`\n\n### Example\n\n```typescript\nimport DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments();\n\nconst subscription = await client.subscriptions.retrieve('subscription_id');\n\nconsole.log(subscription);\n```",
    perLanguage: {
      cli: {
        method: 'subscriptions retrieve',
        example:
          "dodo-payments-cli subscriptions retrieve \\\n  --bearer-token 'My Bearer Token' \\\n  --subscription-id subscription_id",
      },
      csharp: {
        method: 'Subscriptions.Retrieve',
        example:
          'SubscriptionRetrieveParams parameters = new()\n{\n    SubscriptionID = "subscription_id"\n};\n\nvar subscription = await client.Subscriptions.Retrieve(parameters);\n\nConsole.WriteLine(subscription);',
      },
      go: {
        method: 'client.Subscriptions.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/dodopayments/dodopayments-go"\n\t"github.com/dodopayments/dodopayments-go/option"\n)\n\nfunc main() {\n\tclient := dodopayments.NewClient(\n\t\toption.WithBearerToken("My Bearer Token"),\n\t)\n\tsubscription, err := client.Subscriptions.Get(context.TODO(), "subscription_id")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", subscription.ProductID)\n}\n',
      },
      http: {
        example:
          'curl https://live.dodopayments.com/subscriptions/$SUBSCRIPTION_ID \\\n    -H "Authorization: Bearer $DODO_PAYMENTS_API_KEY"',
      },
      java: {
        method: 'subscriptions().retrieve',
        example:
          'package com.dodopayments.api.example;\n\nimport com.dodopayments.api.client.DodoPaymentsClient;\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient;\nimport com.dodopayments.api.models.subscriptions.Subscription;\nimport com.dodopayments.api.models.subscriptions.SubscriptionRetrieveParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        DodoPaymentsClient client = DodoPaymentsOkHttpClient.fromEnv();\n\n        Subscription subscription = client.subscriptions().retrieve("subscription_id");\n    }\n}',
      },
      kotlin: {
        method: 'subscriptions().retrieve',
        example:
          'package com.dodopayments.api.example\n\nimport com.dodopayments.api.client.DodoPaymentsClient\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient\nimport com.dodopayments.api.models.subscriptions.Subscription\nimport com.dodopayments.api.models.subscriptions.SubscriptionRetrieveParams\n\nfun main() {\n    val client: DodoPaymentsClient = DodoPaymentsOkHttpClient.fromEnv()\n\n    val subscription: Subscription = client.subscriptions().retrieve("subscription_id")\n}',
      },
      php: {
        method: 'subscriptions->retrieve',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(bearerToken: 'My Bearer Token', environment: 'test_mode');\n\n$subscription = $client->subscriptions->retrieve('subscription_id');\n\nvar_dump($subscription);",
      },
      python: {
        method: 'subscriptions.retrieve',
        example:
          'import os\nfrom dodopayments import DodoPayments\n\nclient = DodoPayments(\n    bearer_token=os.environ.get("DODO_PAYMENTS_API_KEY"),  # This is the default and can be omitted\n)\nsubscription = client.subscriptions.retrieve(\n    "subscription_id",\n)\nprint(subscription.product_id)',
      },
      ruby: {
        method: 'subscriptions.retrieve',
        example:
          'require "dodopayments"\n\ndodo_payments = Dodopayments::Client.new(\n  bearer_token: "My Bearer Token",\n  environment: "test_mode" # defaults to "live_mode"\n)\n\nsubscription = dodo_payments.subscriptions.retrieve("subscription_id")\n\nputs(subscription)',
      },
      typescript: {
        method: 'client.subscriptions.retrieve',
        example:
          "import DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments({\n  bearerToken: process.env['DODO_PAYMENTS_API_KEY'], // This is the default and can be omitted\n});\n\nconst subscription = await client.subscriptions.retrieve('subscription_id');\n\nconsole.log(subscription.product_id);",
      },
    },
  },
  {
    name: 'update',
    endpoint: '/subscriptions/{subscription_id}',
    httpMethod: 'patch',
    summary: '',
    description: '',
    stainlessPath: '(resource) subscriptions > (method) update',
    qualified: 'client.subscriptions.update',
    params: [
      'subscription_id: string;',
      'billing?: { country: string; city?: string; state?: string; street?: string; zipcode?: string; };',
      'cancel_at_next_billing_date?: boolean;',
      "cancel_reason?: 'cancelled_by_customer' | 'cancelled_by_merchant' | 'cancelled_by_merchant_send_dunning';",
      "credit_entitlement_cart?: { credit_entitlement_id: string; credits_amount?: string; expires_after_days?: number; low_balance_threshold_percent?: number; max_rollover_count?: number; overage_enabled?: boolean; overage_limit?: string; rollover_enabled?: boolean; rollover_percentage?: number; rollover_timeframe_count?: number; rollover_timeframe_interval?: 'Day' | 'Week' | 'Month' | 'Year'; }[];",
      'customer_name?: string;',
      'disable_on_demand?: { next_billing_date: string; };',
      'metadata?: object;',
      'next_billing_date?: string;',
      "status?: 'pending' | 'active' | 'on_hold' | 'cancelled' | 'failed' | 'expired';",
      'tax_id?: string;',
    ],
    response:
      "{ addons: object[]; billing: object; cancel_at_next_billing_date: boolean; created_at: string; credit_entitlement_cart: object[]; currency: string; customer: object; metadata: object; meter_credit_entitlement_cart: object[]; meters: object[]; next_billing_date: string; on_demand: boolean; payment_frequency_count: number; payment_frequency_interval: 'Day' | 'Week' | 'Month' | 'Year'; previous_billing_date: string; product_id: string; quantity: number; recurring_pre_tax_amount: number; status: 'pending' | 'active' | 'on_hold' | 'cancelled' | 'failed' | 'expired'; subscription_id: string; subscription_period_count: number; subscription_period_interval: 'Day' | 'Week' | 'Month' | 'Year'; tax_inclusive: boolean; trial_period_days: number; cancelled_at?: string; custom_field_responses?: object[]; discount_cycles_remaining?: number; discount_id?: string; expires_at?: string; payment_method_id?: string; scheduled_change?: { id: string; addons: object[]; created_at: string; effective_at: string; product_id: string; quantity: number; product_description?: string; product_name?: string; }; tax_id?: string; }",
    markdown:
      "## update\n\n`client.subscriptions.update(subscription_id: string, billing?: { country: country_code; city?: string; state?: string; street?: string; zipcode?: string; }, cancel_at_next_billing_date?: boolean, cancel_reason?: 'cancelled_by_customer' | 'cancelled_by_merchant' | 'cancelled_by_merchant_send_dunning', credit_entitlement_cart?: { credit_entitlement_id: string; credits_amount?: string; expires_after_days?: number; low_balance_threshold_percent?: number; max_rollover_count?: number; overage_enabled?: boolean; overage_limit?: string; rollover_enabled?: boolean; rollover_percentage?: number; rollover_timeframe_count?: number; rollover_timeframe_interval?: 'Day' | 'Week' | 'Month' | 'Year'; }[], customer_name?: string, disable_on_demand?: { next_billing_date: string; }, metadata?: object, next_billing_date?: string, status?: 'pending' | 'active' | 'on_hold' | 'cancelled' | 'failed' | 'expired', tax_id?: string): { addons: addon_cart_response_item[]; billing: billing_address; cancel_at_next_billing_date: boolean; created_at: string; credit_entitlement_cart: credit_entitlement_cart_response[]; currency: currency; customer: customer_limited_details; metadata: object; meter_credit_entitlement_cart: meter_credit_entitlement_cart_response[]; meters: meter_cart_response_item[]; next_billing_date: string; on_demand: boolean; payment_frequency_count: number; payment_frequency_interval: time_interval; previous_billing_date: string; product_id: string; quantity: number; recurring_pre_tax_amount: number; status: subscription_status; subscription_id: string; subscription_period_count: number; subscription_period_interval: time_interval; tax_inclusive: boolean; trial_period_days: number; cancelled_at?: string; custom_field_responses?: custom_field_response[]; discount_cycles_remaining?: number; discount_id?: string; expires_at?: string; payment_method_id?: string; scheduled_change?: object; tax_id?: string; }`\n\n**patch** `/subscriptions/{subscription_id}`\n\n### Parameters\n\n- `subscription_id: string`\n\n- `billing?: { country: string; city?: string; state?: string; street?: string; zipcode?: string; }`\n  - `country: string`\n    Two-letter ISO country code (ISO 3166-1 alpha-2)\n  - `city?: string`\n    City name\n  - `state?: string`\n    State or province name\n  - `street?: string`\n    Street address including house number and unit/apartment if applicable\n  - `zipcode?: string`\n    Postal code or ZIP code\n\n- `cancel_at_next_billing_date?: boolean`\n  When set, the subscription will remain active until the end of billing period\n\n- `cancel_reason?: 'cancelled_by_customer' | 'cancelled_by_merchant' | 'cancelled_by_merchant_send_dunning'`\n\n- `credit_entitlement_cart?: { credit_entitlement_id: string; credits_amount?: string; expires_after_days?: number; low_balance_threshold_percent?: number; max_rollover_count?: number; overage_enabled?: boolean; overage_limit?: string; rollover_enabled?: boolean; rollover_percentage?: number; rollover_timeframe_count?: number; rollover_timeframe_interval?: 'Day' | 'Week' | 'Month' | 'Year'; }[]`\n  Update credit entitlement cart settings\n\n- `customer_name?: string`\n\n- `disable_on_demand?: { next_billing_date: string; }`\n  - `next_billing_date: string`\n\n- `metadata?: object`\n\n- `next_billing_date?: string`\n\n- `status?: 'pending' | 'active' | 'on_hold' | 'cancelled' | 'failed' | 'expired'`\n\n- `tax_id?: string`\n\n### Returns\n\n- `{ addons: { addon_id: string; quantity: number; }[]; billing: { country: country_code; city?: string; state?: string; street?: string; zipcode?: string; }; cancel_at_next_billing_date: boolean; created_at: string; credit_entitlement_cart: { credit_entitlement_id: string; credit_entitlement_name: string; credits_amount: string; overage_balance: string; overage_behavior: cbb_overage_behavior; overage_enabled: boolean; product_id: string; remaining_balance: string; rollover_enabled: boolean; unit: string; expires_after_days?: number; low_balance_threshold_percent?: number; max_rollover_count?: number; overage_limit?: string; rollover_percentage?: number; rollover_timeframe_count?: number; rollover_timeframe_interval?: time_interval; }[]; currency: string; customer: { customer_id: string; email: string; name: string; metadata?: object; phone_number?: string; }; metadata: object; meter_credit_entitlement_cart: { credit_entitlement_id: string; meter_id: string; meter_name: string; meter_units_per_credit: string; product_id: string; }[]; meters: { currency: currency; free_threshold: number; measurement_unit: string; meter_id: string; name: string; description?: string; price_per_unit?: string; }[]; next_billing_date: string; on_demand: boolean; payment_frequency_count: number; payment_frequency_interval: 'Day' | 'Week' | 'Month' | 'Year'; previous_billing_date: string; product_id: string; quantity: number; recurring_pre_tax_amount: number; status: 'pending' | 'active' | 'on_hold' | 'cancelled' | 'failed' | 'expired'; subscription_id: string; subscription_period_count: number; subscription_period_interval: 'Day' | 'Week' | 'Month' | 'Year'; tax_inclusive: boolean; trial_period_days: number; cancelled_at?: string; custom_field_responses?: { key: string; value: string; }[]; discount_cycles_remaining?: number; discount_id?: string; expires_at?: string; payment_method_id?: string; scheduled_change?: { id: string; addons: { addon_id: string; name: string; quantity: number; }[]; created_at: string; effective_at: string; product_id: string; quantity: number; product_description?: string; product_name?: string; }; tax_id?: string; }`\n  Response struct representing subscription details\n\n  - `addons: { addon_id: string; quantity: number; }[]`\n  - `billing: { country: string; city?: string; state?: string; street?: string; zipcode?: string; }`\n  - `cancel_at_next_billing_date: boolean`\n  - `created_at: string`\n  - `credit_entitlement_cart: { credit_entitlement_id: string; credit_entitlement_name: string; credits_amount: string; overage_balance: string; overage_behavior: 'forgive_at_reset' | 'invoice_at_billing' | 'carry_deficit' | 'carry_deficit_auto_repay'; overage_enabled: boolean; product_id: string; remaining_balance: string; rollover_enabled: boolean; unit: string; expires_after_days?: number; low_balance_threshold_percent?: number; max_rollover_count?: number; overage_limit?: string; rollover_percentage?: number; rollover_timeframe_count?: number; rollover_timeframe_interval?: 'Day' | 'Week' | 'Month' | 'Year'; }[]`\n  - `currency: string`\n  - `customer: { customer_id: string; email: string; name: string; metadata?: object; phone_number?: string; }`\n  - `metadata: object`\n  - `meter_credit_entitlement_cart: { credit_entitlement_id: string; meter_id: string; meter_name: string; meter_units_per_credit: string; product_id: string; }[]`\n  - `meters: { currency: string; free_threshold: number; measurement_unit: string; meter_id: string; name: string; description?: string; price_per_unit?: string; }[]`\n  - `next_billing_date: string`\n  - `on_demand: boolean`\n  - `payment_frequency_count: number`\n  - `payment_frequency_interval: 'Day' | 'Week' | 'Month' | 'Year'`\n  - `previous_billing_date: string`\n  - `product_id: string`\n  - `quantity: number`\n  - `recurring_pre_tax_amount: number`\n  - `status: 'pending' | 'active' | 'on_hold' | 'cancelled' | 'failed' | 'expired'`\n  - `subscription_id: string`\n  - `subscription_period_count: number`\n  - `subscription_period_interval: 'Day' | 'Week' | 'Month' | 'Year'`\n  - `tax_inclusive: boolean`\n  - `trial_period_days: number`\n  - `cancelled_at?: string`\n  - `custom_field_responses?: { key: string; value: string; }[]`\n  - `discount_cycles_remaining?: number`\n  - `discount_id?: string`\n  - `expires_at?: string`\n  - `payment_method_id?: string`\n  - `scheduled_change?: { id: string; addons: { addon_id: string; name: string; quantity: number; }[]; created_at: string; effective_at: string; product_id: string; quantity: number; product_description?: string; product_name?: string; }`\n  - `tax_id?: string`\n\n### Example\n\n```typescript\nimport DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments();\n\nconst subscription = await client.subscriptions.update('subscription_id');\n\nconsole.log(subscription);\n```",
    perLanguage: {
      cli: {
        method: 'subscriptions update',
        example:
          "dodo-payments-cli subscriptions update \\\n  --bearer-token 'My Bearer Token' \\\n  --subscription-id subscription_id",
      },
      csharp: {
        method: 'Subscriptions.Update',
        example:
          'SubscriptionUpdateParams parameters = new()\n{\n    SubscriptionID = "subscription_id"\n};\n\nvar subscription = await client.Subscriptions.Update(parameters);\n\nConsole.WriteLine(subscription);',
      },
      go: {
        method: 'client.Subscriptions.Update',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/dodopayments/dodopayments-go"\n\t"github.com/dodopayments/dodopayments-go/option"\n)\n\nfunc main() {\n\tclient := dodopayments.NewClient(\n\t\toption.WithBearerToken("My Bearer Token"),\n\t)\n\tsubscription, err := client.Subscriptions.Update(\n\t\tcontext.TODO(),\n\t\t"subscription_id",\n\t\tdodopayments.SubscriptionUpdateParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", subscription.ProductID)\n}\n',
      },
      http: {
        example:
          "curl https://live.dodopayments.com/subscriptions/$SUBSCRIPTION_ID \\\n    -X PATCH \\\n    -H 'Content-Type: application/json' \\\n    -H \"Authorization: Bearer $DODO_PAYMENTS_API_KEY\" \\\n    -d '{}'",
      },
      java: {
        method: 'subscriptions().update',
        example:
          'package com.dodopayments.api.example;\n\nimport com.dodopayments.api.client.DodoPaymentsClient;\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient;\nimport com.dodopayments.api.models.subscriptions.Subscription;\nimport com.dodopayments.api.models.subscriptions.SubscriptionUpdateParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        DodoPaymentsClient client = DodoPaymentsOkHttpClient.fromEnv();\n\n        Subscription subscription = client.subscriptions().update("subscription_id");\n    }\n}',
      },
      kotlin: {
        method: 'subscriptions().update',
        example:
          'package com.dodopayments.api.example\n\nimport com.dodopayments.api.client.DodoPaymentsClient\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient\nimport com.dodopayments.api.models.subscriptions.Subscription\nimport com.dodopayments.api.models.subscriptions.SubscriptionUpdateParams\n\nfun main() {\n    val client: DodoPaymentsClient = DodoPaymentsOkHttpClient.fromEnv()\n\n    val subscription: Subscription = client.subscriptions().update("subscription_id")\n}',
      },
      php: {
        method: 'subscriptions->update',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(bearerToken: 'My Bearer Token', environment: 'test_mode');\n\n$subscription = $client->subscriptions->update(\n  'subscription_id',\n  billing: [\n    'country' => CountryCode::AF,\n    'city' => 'city',\n    'state' => 'state',\n    'street' => 'street',\n    'zipcode' => 'zipcode',\n  ],\n  cancelAtNextBillingDate: true,\n  cancelReason: 'cancelled_by_customer',\n  creditEntitlementCart: [\n    [\n      'creditEntitlementID' => 'credit_entitlement_id',\n      'creditsAmount' => 'credits_amount',\n      'expiresAfterDays' => 0,\n      'lowBalanceThresholdPercent' => 0,\n      'maxRolloverCount' => 0,\n      'overageEnabled' => true,\n      'overageLimit' => 'overage_limit',\n      'rolloverEnabled' => true,\n      'rolloverPercentage' => 0,\n      'rolloverTimeframeCount' => 0,\n      'rolloverTimeframeInterval' => TimeInterval::DAY,\n    ],\n  ],\n  customerName: 'customer_name',\n  disableOnDemand: [\n    'nextBillingDate' => new \\DateTimeImmutable('2019-12-27T18:11:19.117Z')\n  ],\n  metadata: ['foo' => 'string'],\n  nextBillingDate: new \\DateTimeImmutable('2019-12-27T18:11:19.117Z'),\n  status: SubscriptionStatus::PENDING,\n  taxID: 'tax_id',\n);\n\nvar_dump($subscription);",
      },
      python: {
        method: 'subscriptions.update',
        example:
          'import os\nfrom dodopayments import DodoPayments\n\nclient = DodoPayments(\n    bearer_token=os.environ.get("DODO_PAYMENTS_API_KEY"),  # This is the default and can be omitted\n)\nsubscription = client.subscriptions.update(\n    subscription_id="subscription_id",\n)\nprint(subscription.product_id)',
      },
      ruby: {
        method: 'subscriptions.update',
        example:
          'require "dodopayments"\n\ndodo_payments = Dodopayments::Client.new(\n  bearer_token: "My Bearer Token",\n  environment: "test_mode" # defaults to "live_mode"\n)\n\nsubscription = dodo_payments.subscriptions.update("subscription_id")\n\nputs(subscription)',
      },
      typescript: {
        method: 'client.subscriptions.update',
        example:
          "import DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments({\n  bearerToken: process.env['DODO_PAYMENTS_API_KEY'], // This is the default and can be omitted\n});\n\nconst subscription = await client.subscriptions.update('subscription_id');\n\nconsole.log(subscription.product_id);",
      },
    },
  },
  {
    name: 'charge',
    endpoint: '/subscriptions/{subscription_id}/charge',
    httpMethod: 'post',
    summary: '',
    description: '',
    stainlessPath: '(resource) subscriptions > (method) charge',
    qualified: 'client.subscriptions.charge',
    params: [
      'subscription_id: string;',
      'product_price: number;',
      'adaptive_currency_fees_inclusive?: boolean;',
      'customer_balance_config?: { allow_customer_credits_purchase?: boolean; allow_customer_credits_usage?: boolean; };',
      'metadata?: object;',
      'product_currency?: string;',
      'product_description?: string;',
    ],
    response: '{ payment_id: string; }',
    markdown:
      "## charge\n\n`client.subscriptions.charge(subscription_id: string, product_price: number, adaptive_currency_fees_inclusive?: boolean, customer_balance_config?: { allow_customer_credits_purchase?: boolean; allow_customer_credits_usage?: boolean; }, metadata?: object, product_currency?: string, product_description?: string): { payment_id: string; }`\n\n**post** `/subscriptions/{subscription_id}/charge`\n\n### Parameters\n\n- `subscription_id: string`\n\n- `product_price: number`\n  The product price. Represented in the lowest denomination of the currency (e.g., cents for USD).\nFor example, to charge $1.00, pass `100`.\n\n- `adaptive_currency_fees_inclusive?: boolean`\n  Whether adaptive currency fees should be included in the product_price (true) or added on top (false).\nThis field is ignored if adaptive pricing is not enabled for the business.\n\n- `customer_balance_config?: { allow_customer_credits_purchase?: boolean; allow_customer_credits_usage?: boolean; }`\n  Specify how customer balance is used for the payment\n  - `allow_customer_credits_purchase?: boolean`\n    Allows Customer Credit to be purchased to settle payments\n  - `allow_customer_credits_usage?: boolean`\n    Allows Customer Credit Balance to be used to settle payments\n\n- `metadata?: object`\n  Metadata for the payment. If not passed, the metadata of the subscription will be taken\n\n- `product_currency?: string`\n  Optional currency of the product price. If not specified, defaults to the currency of the product.\n\n- `product_description?: string`\n  Optional product description override for billing and line items.\nIf not specified, the stored description of the product will be used.\n\n### Returns\n\n- `{ payment_id: string; }`\n\n  - `payment_id: string`\n\n### Example\n\n```typescript\nimport DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments();\n\nconst response = await client.subscriptions.charge('subscription_id', { product_price: 0 });\n\nconsole.log(response);\n```",
    perLanguage: {
      cli: {
        method: 'subscriptions charge',
        example:
          "dodo-payments-cli subscriptions charge \\\n  --bearer-token 'My Bearer Token' \\\n  --subscription-id subscription_id \\\n  --product-price 0",
      },
      csharp: {
        method: 'Subscriptions.Charge',
        example:
          'SubscriptionChargeParams parameters = new()\n{\n    SubscriptionID = "subscription_id",\n    ProductPrice = 0,\n};\n\nvar response = await client.Subscriptions.Charge(parameters);\n\nConsole.WriteLine(response);',
      },
      go: {
        method: 'client.Subscriptions.Charge',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/dodopayments/dodopayments-go"\n\t"github.com/dodopayments/dodopayments-go/option"\n)\n\nfunc main() {\n\tclient := dodopayments.NewClient(\n\t\toption.WithBearerToken("My Bearer Token"),\n\t)\n\tresponse, err := client.Subscriptions.Charge(\n\t\tcontext.TODO(),\n\t\t"subscription_id",\n\t\tdodopayments.SubscriptionChargeParams{\n\t\t\tProductPrice: dodopayments.F(int64(0)),\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.PaymentID)\n}\n',
      },
      http: {
        example:
          'curl https://live.dodopayments.com/subscriptions/$SUBSCRIPTION_ID/charge \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $DODO_PAYMENTS_API_KEY" \\\n    -d \'{\n          "product_price": 0\n        }\'',
      },
      java: {
        method: 'subscriptions().charge',
        example:
          'package com.dodopayments.api.example;\n\nimport com.dodopayments.api.client.DodoPaymentsClient;\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient;\nimport com.dodopayments.api.models.subscriptions.SubscriptionChargeParams;\nimport com.dodopayments.api.models.subscriptions.SubscriptionChargeResponse;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        DodoPaymentsClient client = DodoPaymentsOkHttpClient.fromEnv();\n\n        SubscriptionChargeParams params = SubscriptionChargeParams.builder()\n            .subscriptionId("subscription_id")\n            .productPrice(0)\n            .build();\n        SubscriptionChargeResponse response = client.subscriptions().charge(params);\n    }\n}',
      },
      kotlin: {
        method: 'subscriptions().charge',
        example:
          'package com.dodopayments.api.example\n\nimport com.dodopayments.api.client.DodoPaymentsClient\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient\nimport com.dodopayments.api.models.subscriptions.SubscriptionChargeParams\nimport com.dodopayments.api.models.subscriptions.SubscriptionChargeResponse\n\nfun main() {\n    val client: DodoPaymentsClient = DodoPaymentsOkHttpClient.fromEnv()\n\n    val params: SubscriptionChargeParams = SubscriptionChargeParams.builder()\n        .subscriptionId("subscription_id")\n        .productPrice(0)\n        .build()\n    val response: SubscriptionChargeResponse = client.subscriptions().charge(params)\n}',
      },
      php: {
        method: 'subscriptions->charge',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(bearerToken: 'My Bearer Token', environment: 'test_mode');\n\n$response = $client->subscriptions->charge(\n  'subscription_id',\n  productPrice: 0,\n  adaptiveCurrencyFeesInclusive: true,\n  customerBalanceConfig: [\n    'allowCustomerCreditsPurchase' => true, 'allowCustomerCreditsUsage' => true\n  ],\n  metadata: ['foo' => 'string'],\n  productCurrency: Currency::AED,\n  productDescription: 'product_description',\n);\n\nvar_dump($response);",
      },
      python: {
        method: 'subscriptions.charge',
        example:
          'import os\nfrom dodopayments import DodoPayments\n\nclient = DodoPayments(\n    bearer_token=os.environ.get("DODO_PAYMENTS_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.subscriptions.charge(\n    subscription_id="subscription_id",\n    product_price=0,\n)\nprint(response.payment_id)',
      },
      ruby: {
        method: 'subscriptions.charge',
        example:
          'require "dodopayments"\n\ndodo_payments = Dodopayments::Client.new(\n  bearer_token: "My Bearer Token",\n  environment: "test_mode" # defaults to "live_mode"\n)\n\nresponse = dodo_payments.subscriptions.charge("subscription_id", product_price: 0)\n\nputs(response)',
      },
      typescript: {
        method: 'client.subscriptions.charge',
        example:
          "import DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments({\n  bearerToken: process.env['DODO_PAYMENTS_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.subscriptions.charge('subscription_id', { product_price: 0 });\n\nconsole.log(response.payment_id);",
      },
    },
  },
  {
    name: 'change_plan',
    endpoint: '/subscriptions/{subscription_id}/change-plan',
    httpMethod: 'post',
    summary: '',
    description: '',
    stainlessPath: '(resource) subscriptions > (method) change_plan',
    qualified: 'client.subscriptions.changePlan',
    params: [
      'subscription_id: string;',
      'product_id: string;',
      "proration_billing_mode: 'prorated_immediately' | 'full_immediately' | 'difference_immediately' | 'do_not_bill';",
      'quantity: number;',
      'addons?: { addon_id: string; quantity: number; }[];',
      'discount_code?: string;',
      "effective_at?: 'immediately' | 'next_billing_date';",
      'metadata?: object;',
      "on_payment_failure?: 'prevent_change' | 'apply_change';",
    ],
    markdown:
      "## change_plan\n\n`client.subscriptions.changePlan(subscription_id: string, product_id: string, proration_billing_mode: 'prorated_immediately' | 'full_immediately' | 'difference_immediately' | 'do_not_bill', quantity: number, addons?: { addon_id: string; quantity: number; }[], discount_code?: string, effective_at?: 'immediately' | 'next_billing_date', metadata?: object, on_payment_failure?: 'prevent_change' | 'apply_change'): void`\n\n**post** `/subscriptions/{subscription_id}/change-plan`\n\n### Parameters\n\n- `subscription_id: string`\n\n- `product_id: string`\n  Unique identifier of the product to subscribe to\n\n- `proration_billing_mode: 'prorated_immediately' | 'full_immediately' | 'difference_immediately' | 'do_not_bill'`\n  Proration Billing Mode\n\n- `quantity: number`\n  Number of units to subscribe for. Must be at least 1.\n\n- `addons?: { addon_id: string; quantity: number; }[]`\n  Addons for the new plan.\nNote : Leaving this empty would remove any existing addons\n\n- `discount_code?: string`\n  Optional discount code to apply to the new plan.\nIf provided, validates and applies the discount to the plan change.\nIf not provided and the subscription has an existing discount with `preserve_on_plan_change=true`,\nthe existing discount will be preserved (if applicable to the new product).\n\n- `effective_at?: 'immediately' | 'next_billing_date'`\n  When to apply the plan change.\n- `immediately` (default): Apply the plan change right away\n- `next_billing_date`: Schedule the change for the next billing date\n\n- `metadata?: object`\n  Metadata for the payment. If not passed, the metadata of the subscription will be taken\n\n- `on_payment_failure?: 'prevent_change' | 'apply_change'`\n  Controls behavior when the plan change payment fails.\n- `prevent_change`: Keep subscription on current plan until payment succeeds\n- `apply_change` (default): Apply plan change immediately regardless of payment outcome\n\nIf not specified, uses the business-level default setting.\n\n### Example\n\n```typescript\nimport DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments();\n\nawait client.subscriptions.changePlan('subscription_id', {\n  product_id: 'product_id',\n  proration_billing_mode: 'prorated_immediately',\n  quantity: 0,\n})\n```",
    perLanguage: {
      cli: {
        method: 'subscriptions change_plan',
        example:
          "dodo-payments-cli subscriptions change-plan \\\n  --bearer-token 'My Bearer Token' \\\n  --subscription-id subscription_id \\\n  --product-id product_id \\\n  --proration-billing-mode prorated_immediately \\\n  --quantity 0",
      },
      csharp: {
        method: 'Subscriptions.ChangePlan',
        example:
          'SubscriptionChangePlanParams parameters = new()\n{\n    SubscriptionID = "subscription_id",\n    ProductID = "product_id",\n    ProrationBillingMode = ProrationBillingMode.ProratedImmediately,\n    Quantity = 0,\n};\n\nawait client.Subscriptions.ChangePlan(parameters);',
      },
      go: {
        method: 'client.Subscriptions.ChangePlan',
        example:
          'package main\n\nimport (\n\t"context"\n\n\t"github.com/dodopayments/dodopayments-go"\n\t"github.com/dodopayments/dodopayments-go/option"\n)\n\nfunc main() {\n\tclient := dodopayments.NewClient(\n\t\toption.WithBearerToken("My Bearer Token"),\n\t)\n\terr := client.Subscriptions.ChangePlan(\n\t\tcontext.TODO(),\n\t\t"subscription_id",\n\t\tdodopayments.SubscriptionChangePlanParams{\n\t\t\tUpdateSubscriptionPlanReq: dodopayments.UpdateSubscriptionPlanReqParam{\n\t\t\t\tProductID:            dodopayments.F("product_id"),\n\t\t\t\tProrationBillingMode: dodopayments.F(dodopayments.UpdateSubscriptionPlanReqProrationBillingModeProratedImmediately),\n\t\t\t\tQuantity:             dodopayments.F(int64(0)),\n\t\t\t},\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
      http: {
        example:
          'curl https://live.dodopayments.com/subscriptions/$SUBSCRIPTION_ID/change-plan \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $DODO_PAYMENTS_API_KEY" \\\n    -d \'{\n          "product_id": "product_id",\n          "proration_billing_mode": "prorated_immediately",\n          "quantity": 0\n        }\'',
      },
      java: {
        method: 'subscriptions().changePlan',
        example:
          'package com.dodopayments.api.example;\n\nimport com.dodopayments.api.client.DodoPaymentsClient;\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient;\nimport com.dodopayments.api.models.subscriptions.SubscriptionChangePlanParams;\nimport com.dodopayments.api.models.subscriptions.UpdateSubscriptionPlanReq;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        DodoPaymentsClient client = DodoPaymentsOkHttpClient.fromEnv();\n\n        SubscriptionChangePlanParams params = SubscriptionChangePlanParams.builder()\n            .subscriptionId("subscription_id")\n            .updateSubscriptionPlanReq(UpdateSubscriptionPlanReq.builder()\n                .productId("product_id")\n                .prorationBillingMode(UpdateSubscriptionPlanReq.ProrationBillingMode.PRORATED_IMMEDIATELY)\n                .quantity(0)\n                .build())\n            .build();\n        client.subscriptions().changePlan(params);\n    }\n}',
      },
      kotlin: {
        method: 'subscriptions().changePlan',
        example:
          'package com.dodopayments.api.example\n\nimport com.dodopayments.api.client.DodoPaymentsClient\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient\nimport com.dodopayments.api.models.subscriptions.SubscriptionChangePlanParams\nimport com.dodopayments.api.models.subscriptions.UpdateSubscriptionPlanReq\n\nfun main() {\n    val client: DodoPaymentsClient = DodoPaymentsOkHttpClient.fromEnv()\n\n    val params: SubscriptionChangePlanParams = SubscriptionChangePlanParams.builder()\n        .subscriptionId("subscription_id")\n        .updateSubscriptionPlanReq(UpdateSubscriptionPlanReq.builder()\n            .productId("product_id")\n            .prorationBillingMode(UpdateSubscriptionPlanReq.ProrationBillingMode.PRORATED_IMMEDIATELY)\n            .quantity(0)\n            .build())\n        .build()\n    client.subscriptions().changePlan(params)\n}',
      },
      php: {
        method: 'subscriptions->changePlan',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(bearerToken: 'My Bearer Token', environment: 'test_mode');\n\n$result = $client->subscriptions->changePlan(\n  'subscription_id',\n  productID: 'product_id',\n  prorationBillingMode: 'prorated_immediately',\n  quantity: 0,\n  addons: [['addonID' => 'addon_id', 'quantity' => 0]],\n  discountCode: 'discount_code',\n  effectiveAt: 'immediately',\n  metadata: ['foo' => 'string'],\n  onPaymentFailure: 'prevent_change',\n);\n\nvar_dump($result);",
      },
      python: {
        method: 'subscriptions.change_plan',
        example:
          'import os\nfrom dodopayments import DodoPayments\n\nclient = DodoPayments(\n    bearer_token=os.environ.get("DODO_PAYMENTS_API_KEY"),  # This is the default and can be omitted\n)\nclient.subscriptions.change_plan(\n    subscription_id="subscription_id",\n    product_id="product_id",\n    proration_billing_mode="prorated_immediately",\n    quantity=0,\n)',
      },
      ruby: {
        method: 'subscriptions.change_plan',
        example:
          'require "dodopayments"\n\ndodo_payments = Dodopayments::Client.new(\n  bearer_token: "My Bearer Token",\n  environment: "test_mode" # defaults to "live_mode"\n)\n\nresult = dodo_payments.subscriptions.change_plan(\n  "subscription_id",\n  product_id: "product_id",\n  proration_billing_mode: :prorated_immediately,\n  quantity: 0\n)\n\nputs(result)',
      },
      typescript: {
        method: 'client.subscriptions.changePlan',
        example:
          "import DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments({\n  bearerToken: process.env['DODO_PAYMENTS_API_KEY'], // This is the default and can be omitted\n});\n\nawait client.subscriptions.changePlan('subscription_id', {\n  product_id: 'product_id',\n  proration_billing_mode: 'prorated_immediately',\n  quantity: 0,\n});",
      },
    },
  },
  {
    name: 'retrieve_usage_history',
    endpoint: '/subscriptions/{subscription_id}/usage-history',
    httpMethod: 'get',
    summary: 'Retrieve usage-based billing history for a subscription',
    description:
      "Get detailed usage history for a subscription that includes usage-based billing (metered components).\nThis endpoint provides insights into customer usage patterns and billing calculations over time.\n\n## What You'll Get:\n- **Billing periods**: Each item represents a billing cycle with start and end dates\n- **Meter usage**: Detailed breakdown of usage for each meter configured on the subscription\n- **Usage calculations**: Total units consumed, free threshold units, and chargeable units\n- **Historical tracking**: Complete audit trail of usage-based charges\n\n## Use Cases:\n- **Customer support**: Investigate billing questions and usage discrepancies\n- **Usage analytics**: Analyze customer consumption patterns over time\n- **Billing transparency**: Provide customers with detailed usage breakdowns\n- **Revenue optimization**: Identify usage trends to optimize pricing strategies\n\n## Filtering Options:\n- **Date range filtering**: Get usage history for specific time periods\n- **Meter-specific filtering**: Focus on usage for a particular meter\n- **Pagination**: Navigate through large usage histories efficiently\n\n## Important Notes:\n- Only returns data for subscriptions with usage-based (metered) components\n- Usage history is organized by billing periods (subscription cycles)\n- Free threshold units are calculated and displayed separately from chargeable units\n- Historical data is preserved even if meter configurations change\n\n## Example Query Patterns:\n- Get last 3 months: `?start_date=2024-01-01T00:00:00Z&end_date=2024-03-31T23:59:59Z`\n- Filter by meter: `?meter_id=mtr_api_requests`\n- Paginate results: `?page_size=20&page_number=1`\n- Recent usage: `?start_date=2024-03-01T00:00:00Z` (from March 1st to now)",
    stainlessPath: '(resource) subscriptions > (method) retrieve_usage_history',
    qualified: 'client.subscriptions.retrieveUsageHistory',
    params: [
      'subscription_id: string;',
      'end_date?: string;',
      'meter_id?: string;',
      'page_number?: number;',
      'page_size?: number;',
      'start_date?: string;',
    ],
    response:
      '{ end_date: string; meters: { id: string; chargeable_units: string; consumed_units: string; currency: string; free_threshold: number; name: string; price_per_unit: string; total_price: number; }[]; start_date: string; }',
    markdown:
      "## retrieve_usage_history\n\n`client.subscriptions.retrieveUsageHistory(subscription_id: string, end_date?: string, meter_id?: string, page_number?: number, page_size?: number, start_date?: string): { end_date: string; meters: object[]; start_date: string; }`\n\n**get** `/subscriptions/{subscription_id}/usage-history`\n\nGet detailed usage history for a subscription that includes usage-based billing (metered components).\nThis endpoint provides insights into customer usage patterns and billing calculations over time.\n\n## What You'll Get:\n- **Billing periods**: Each item represents a billing cycle with start and end dates\n- **Meter usage**: Detailed breakdown of usage for each meter configured on the subscription\n- **Usage calculations**: Total units consumed, free threshold units, and chargeable units\n- **Historical tracking**: Complete audit trail of usage-based charges\n\n## Use Cases:\n- **Customer support**: Investigate billing questions and usage discrepancies\n- **Usage analytics**: Analyze customer consumption patterns over time\n- **Billing transparency**: Provide customers with detailed usage breakdowns\n- **Revenue optimization**: Identify usage trends to optimize pricing strategies\n\n## Filtering Options:\n- **Date range filtering**: Get usage history for specific time periods\n- **Meter-specific filtering**: Focus on usage for a particular meter\n- **Pagination**: Navigate through large usage histories efficiently\n\n## Important Notes:\n- Only returns data for subscriptions with usage-based (metered) components\n- Usage history is organized by billing periods (subscription cycles)\n- Free threshold units are calculated and displayed separately from chargeable units\n- Historical data is preserved even if meter configurations change\n\n## Example Query Patterns:\n- Get last 3 months: `?start_date=2024-01-01T00:00:00Z&end_date=2024-03-31T23:59:59Z`\n- Filter by meter: `?meter_id=mtr_api_requests`\n- Paginate results: `?page_size=20&page_number=1`\n- Recent usage: `?start_date=2024-03-01T00:00:00Z` (from March 1st to now)\n\n### Parameters\n\n- `subscription_id: string`\n\n- `end_date?: string`\n  Filter by end date (inclusive)\n\n- `meter_id?: string`\n  Filter by specific meter ID\n\n- `page_number?: number`\n  Page number (default: 0)\n\n- `page_size?: number`\n  Page size (default: 10, max: 100)\n\n- `start_date?: string`\n  Filter by start date (inclusive)\n\n### Returns\n\n- `{ end_date: string; meters: { id: string; chargeable_units: string; consumed_units: string; currency: string; free_threshold: number; name: string; price_per_unit: string; total_price: number; }[]; start_date: string; }`\n\n  - `end_date: string`\n  - `meters: { id: string; chargeable_units: string; consumed_units: string; currency: string; free_threshold: number; name: string; price_per_unit: string; total_price: number; }[]`\n  - `start_date: string`\n\n### Example\n\n```typescript\nimport DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments();\n\n// Automatically fetches more pages as needed.\nfor await (const subscriptionRetrieveUsageHistoryResponse of client.subscriptions.retrieveUsageHistory('subscription_id')) {\n  console.log(subscriptionRetrieveUsageHistoryResponse);\n}\n```",
    perLanguage: {
      cli: {
        method: 'subscriptions retrieve_usage_history',
        example:
          "dodo-payments-cli subscriptions retrieve-usage-history \\\n  --bearer-token 'My Bearer Token' \\\n  --subscription-id subscription_id",
      },
      csharp: {
        method: 'Subscriptions.RetrieveUsageHistory',
        example:
          'SubscriptionRetrieveUsageHistoryParams parameters = new()\n{\n    SubscriptionID = "subscription_id"\n};\n\nvar page = await client.Subscriptions.RetrieveUsageHistory(parameters);\nawait foreach (var item in page.Paginate())\n{\n    Console.WriteLine(item);\n}',
      },
      go: {
        method: 'client.Subscriptions.GetUsageHistory',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/dodopayments/dodopayments-go"\n\t"github.com/dodopayments/dodopayments-go/option"\n)\n\nfunc main() {\n\tclient := dodopayments.NewClient(\n\t\toption.WithBearerToken("My Bearer Token"),\n\t)\n\tpage, err := client.Subscriptions.GetUsageHistory(\n\t\tcontext.TODO(),\n\t\t"subscription_id",\n\t\tdodopayments.SubscriptionGetUsageHistoryParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", page)\n}\n',
      },
      http: {
        example:
          'curl https://live.dodopayments.com/subscriptions/$SUBSCRIPTION_ID/usage-history \\\n    -H "Authorization: Bearer $DODO_PAYMENTS_API_KEY"',
      },
      java: {
        method: 'subscriptions().retrieveUsageHistory',
        example:
          'package com.dodopayments.api.example;\n\nimport com.dodopayments.api.client.DodoPaymentsClient;\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient;\nimport com.dodopayments.api.models.subscriptions.SubscriptionRetrieveUsageHistoryPage;\nimport com.dodopayments.api.models.subscriptions.SubscriptionRetrieveUsageHistoryParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        DodoPaymentsClient client = DodoPaymentsOkHttpClient.fromEnv();\n\n        SubscriptionRetrieveUsageHistoryPage page = client.subscriptions().retrieveUsageHistory("subscription_id");\n    }\n}',
      },
      kotlin: {
        method: 'subscriptions().retrieveUsageHistory',
        example:
          'package com.dodopayments.api.example\n\nimport com.dodopayments.api.client.DodoPaymentsClient\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient\nimport com.dodopayments.api.models.subscriptions.SubscriptionRetrieveUsageHistoryPage\nimport com.dodopayments.api.models.subscriptions.SubscriptionRetrieveUsageHistoryParams\n\nfun main() {\n    val client: DodoPaymentsClient = DodoPaymentsOkHttpClient.fromEnv()\n\n    val page: SubscriptionRetrieveUsageHistoryPage = client.subscriptions().retrieveUsageHistory("subscription_id")\n}',
      },
      php: {
        method: 'subscriptions->retrieveUsageHistory',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(bearerToken: 'My Bearer Token', environment: 'test_mode');\n\n$page = $client->subscriptions->retrieveUsageHistory(\n  'subscription_id',\n  endDate: new \\DateTimeImmutable('2019-12-27T18:11:19.117Z'),\n  meterID: 'meter_id',\n  pageNumber: 0,\n  pageSize: 0,\n  startDate: new \\DateTimeImmutable('2019-12-27T18:11:19.117Z'),\n);\n\nvar_dump($page);",
      },
      python: {
        method: 'subscriptions.retrieve_usage_history',
        example:
          'import os\nfrom dodopayments import DodoPayments\n\nclient = DodoPayments(\n    bearer_token=os.environ.get("DODO_PAYMENTS_API_KEY"),  # This is the default and can be omitted\n)\npage = client.subscriptions.retrieve_usage_history(\n    subscription_id="subscription_id",\n)\npage = page.items[0]\nprint(page.end_date)',
      },
      ruby: {
        method: 'subscriptions.retrieve_usage_history',
        example:
          'require "dodopayments"\n\ndodo_payments = Dodopayments::Client.new(\n  bearer_token: "My Bearer Token",\n  environment: "test_mode" # defaults to "live_mode"\n)\n\npage = dodo_payments.subscriptions.retrieve_usage_history("subscription_id")\n\nputs(page)',
      },
      typescript: {
        method: 'client.subscriptions.retrieveUsageHistory',
        example:
          "import DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments({\n  bearerToken: process.env['DODO_PAYMENTS_API_KEY'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const subscriptionRetrieveUsageHistoryResponse of client.subscriptions.retrieveUsageHistory(\n  'subscription_id',\n)) {\n  console.log(subscriptionRetrieveUsageHistoryResponse.end_date);\n}",
      },
    },
  },
  {
    name: 'update_payment_method',
    endpoint: '/subscriptions/{subscription_id}/update-payment-method',
    httpMethod: 'post',
    summary: '',
    description: '',
    stainlessPath: '(resource) subscriptions > (method) update_payment_method',
    qualified: 'client.subscriptions.updatePaymentMethod',
    params: [
      'subscription_id: string;',
      "body: { type: 'new'; return_url?: string; } | { payment_method_id: string; type: 'existing'; };",
    ],
    response: '{ client_secret?: string; expires_on?: string; payment_id?: string; payment_link?: string; }',
    perLanguage: {
      cli: {
        method: 'subscriptions update_payment_method',
        example:
          "dodo-payments-cli subscriptions update-payment-method \\\n  --bearer-token 'My Bearer Token' \\\n  --subscription-id subscription_id \\\n  --type new \\\n  --payment-method-id payment_method_id",
      },
      csharp: {
        method: 'Subscriptions.UpdatePaymentMethod',
        example:
          'SubscriptionUpdatePaymentMethodParams parameters = new()\n{\n    SubscriptionID = "subscription_id",\n    Body = new New()\n    {\n        Type = Type.New,\n        ReturnUrl = "return_url",\n    },\n};\n\nvar response = await client.Subscriptions.UpdatePaymentMethod(parameters);\n\nConsole.WriteLine(response);',
      },
      go: {
        method: 'client.Subscriptions.UpdatePaymentMethod',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/dodopayments/dodopayments-go"\n\t"github.com/dodopayments/dodopayments-go/option"\n)\n\nfunc main() {\n\tclient := dodopayments.NewClient(\n\t\toption.WithBearerToken("My Bearer Token"),\n\t)\n\tresponse, err := client.Subscriptions.UpdatePaymentMethod(\n\t\tcontext.TODO(),\n\t\t"subscription_id",\n\t\tdodopayments.SubscriptionUpdatePaymentMethodParams{\n\t\t\tBody: dodopayments.SubscriptionUpdatePaymentMethodParamsBodyNew{\n\t\t\t\tType: dodopayments.F(dodopayments.SubscriptionUpdatePaymentMethodParamsBodyNewTypeNew),\n\t\t\t},\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.PaymentID)\n}\n',
      },
      http: {
        example:
          'curl https://live.dodopayments.com/subscriptions/$SUBSCRIPTION_ID/update-payment-method \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $DODO_PAYMENTS_API_KEY" \\\n    -d \'{\n          "type": "new"\n        }\'',
      },
      java: {
        method: 'subscriptions().updatePaymentMethod',
        example:
          'package com.dodopayments.api.example;\n\nimport com.dodopayments.api.client.DodoPaymentsClient;\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient;\nimport com.dodopayments.api.models.subscriptions.SubscriptionUpdatePaymentMethodParams;\nimport com.dodopayments.api.models.subscriptions.SubscriptionUpdatePaymentMethodResponse;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        DodoPaymentsClient client = DodoPaymentsOkHttpClient.fromEnv();\n\n        SubscriptionUpdatePaymentMethodParams params = SubscriptionUpdatePaymentMethodParams.builder()\n            .subscriptionId("subscription_id")\n            .body(SubscriptionUpdatePaymentMethodParams.Body.New.builder()\n                .type(SubscriptionUpdatePaymentMethodParams.Body.New.Type.NEW)\n                .build())\n            .build();\n        SubscriptionUpdatePaymentMethodResponse response = client.subscriptions().updatePaymentMethod(params);\n    }\n}',
      },
      kotlin: {
        method: 'subscriptions().updatePaymentMethod',
        example:
          'package com.dodopayments.api.example\n\nimport com.dodopayments.api.client.DodoPaymentsClient\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient\nimport com.dodopayments.api.models.subscriptions.SubscriptionUpdatePaymentMethodParams\nimport com.dodopayments.api.models.subscriptions.SubscriptionUpdatePaymentMethodResponse\n\nfun main() {\n    val client: DodoPaymentsClient = DodoPaymentsOkHttpClient.fromEnv()\n\n    val params: SubscriptionUpdatePaymentMethodParams = SubscriptionUpdatePaymentMethodParams.builder()\n        .subscriptionId("subscription_id")\n        .body(SubscriptionUpdatePaymentMethodParams.Body.New.builder()\n            .type(SubscriptionUpdatePaymentMethodParams.Body.New.Type.NEW)\n            .build())\n        .build()\n    val response: SubscriptionUpdatePaymentMethodResponse = client.subscriptions().updatePaymentMethod(params)\n}',
      },
      php: {
        method: 'subscriptions->updatePaymentMethod',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(bearerToken: 'My Bearer Token', environment: 'test_mode');\n\n$response = $client->subscriptions->updatePaymentMethod(\n  'subscription_id',\n  type: 'existing',\n  returnURL: 'return_url',\n  paymentMethodID: 'payment_method_id',\n);\n\nvar_dump($response);",
      },
      python: {
        method: 'subscriptions.update_payment_method',
        example:
          'import os\nfrom dodopayments import DodoPayments\n\nclient = DodoPayments(\n    bearer_token=os.environ.get("DODO_PAYMENTS_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.subscriptions.update_payment_method(\n    subscription_id="subscription_id",\n    type="new",\n)\nprint(response.payment_id)',
      },
      ruby: {
        method: 'subscriptions.update_payment_method',
        example:
          'require "dodopayments"\n\ndodo_payments = Dodopayments::Client.new(\n  bearer_token: "My Bearer Token",\n  environment: "test_mode" # defaults to "live_mode"\n)\n\nresponse = dodo_payments.subscriptions.update_payment_method("subscription_id", body: {type: :new})\n\nputs(response)',
      },
      typescript: {
        method: 'client.subscriptions.updatePaymentMethod',
        example:
          "import DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments({\n  bearerToken: process.env['DODO_PAYMENTS_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.subscriptions.updatePaymentMethod('subscription_id', { type: 'new' });\n\nconsole.log(response.payment_id);",
      },
    },
  },
  {
    name: 'preview_change_plan',
    endpoint: '/subscriptions/{subscription_id}/change-plan/preview',
    httpMethod: 'post',
    summary: '',
    description: '',
    stainlessPath: '(resource) subscriptions > (method) preview_change_plan',
    qualified: 'client.subscriptions.previewChangePlan',
    params: [
      'subscription_id: string;',
      'product_id: string;',
      "proration_billing_mode: 'prorated_immediately' | 'full_immediately' | 'difference_immediately' | 'do_not_bill';",
      'quantity: number;',
      'addons?: { addon_id: string; quantity: number; }[];',
      'discount_code?: string;',
      "effective_at?: 'immediately' | 'next_billing_date';",
      'metadata?: object;',
      "on_payment_failure?: 'prevent_change' | 'apply_change';",
    ],
    response:
      '{ immediate_charge: { effective_at: string; line_items: object | object | object[]; summary: object; }; new_plan: object; }',
    markdown:
      "## preview_change_plan\n\n`client.subscriptions.previewChangePlan(subscription_id: string, product_id: string, proration_billing_mode: 'prorated_immediately' | 'full_immediately' | 'difference_immediately' | 'do_not_bill', quantity: number, addons?: { addon_id: string; quantity: number; }[], discount_code?: string, effective_at?: 'immediately' | 'next_billing_date', metadata?: object, on_payment_failure?: 'prevent_change' | 'apply_change'): { immediate_charge: object; new_plan: subscription; }`\n\n**post** `/subscriptions/{subscription_id}/change-plan/preview`\n\n### Parameters\n\n- `subscription_id: string`\n\n- `product_id: string`\n  Unique identifier of the product to subscribe to\n\n- `proration_billing_mode: 'prorated_immediately' | 'full_immediately' | 'difference_immediately' | 'do_not_bill'`\n  Proration Billing Mode\n\n- `quantity: number`\n  Number of units to subscribe for. Must be at least 1.\n\n- `addons?: { addon_id: string; quantity: number; }[]`\n  Addons for the new plan.\nNote : Leaving this empty would remove any existing addons\n\n- `discount_code?: string`\n  Optional discount code to apply to the new plan.\nIf provided, validates and applies the discount to the plan change.\nIf not provided and the subscription has an existing discount with `preserve_on_plan_change=true`,\nthe existing discount will be preserved (if applicable to the new product).\n\n- `effective_at?: 'immediately' | 'next_billing_date'`\n  When to apply the plan change.\n- `immediately` (default): Apply the plan change right away\n- `next_billing_date`: Schedule the change for the next billing date\n\n- `metadata?: object`\n  Metadata for the payment. If not passed, the metadata of the subscription will be taken\n\n- `on_payment_failure?: 'prevent_change' | 'apply_change'`\n  Controls behavior when the plan change payment fails.\n- `prevent_change`: Keep subscription on current plan until payment succeeds\n- `apply_change` (default): Apply plan change immediately regardless of payment outcome\n\nIf not specified, uses the business-level default setting.\n\n### Returns\n\n- `{ immediate_charge: { effective_at: string; line_items: { id: string; currency: currency; product_id: string; proration_factor: number; quantity: number; tax_inclusive: boolean; type: 'subscription'; unit_price: number; description?: string; name?: string; tax?: number; tax_rate?: number; } | { id: string; currency: currency; name: string; proration_factor: number; quantity: number; tax_category: tax_category; tax_inclusive: boolean; tax_rate: number; type: 'addon'; unit_price: number; description?: string; tax?: number; } | { id: string; chargeable_units: string; currency: currency; free_threshold: number; name: string; price_per_unit: string; subtotal: number; tax_inclusive: boolean; tax_rate: number; type: 'meter'; units_consumed: string; description?: string; tax?: number; }[]; summary: { currency: currency; customer_credits: number; settlement_amount: number; settlement_currency: currency; total_amount: number; settlement_tax?: number; tax?: number; }; }; new_plan: { addons: addon_cart_response_item[]; billing: billing_address; cancel_at_next_billing_date: boolean; created_at: string; credit_entitlement_cart: credit_entitlement_cart_response[]; currency: currency; customer: customer_limited_details; metadata: object; meter_credit_entitlement_cart: meter_credit_entitlement_cart_response[]; meters: meter_cart_response_item[]; next_billing_date: string; on_demand: boolean; payment_frequency_count: number; payment_frequency_interval: time_interval; previous_billing_date: string; product_id: string; quantity: number; recurring_pre_tax_amount: number; status: subscription_status; subscription_id: string; subscription_period_count: number; subscription_period_interval: time_interval; tax_inclusive: boolean; trial_period_days: number; cancelled_at?: string; custom_field_responses?: custom_field_response[]; discount_cycles_remaining?: number; discount_id?: string; expires_at?: string; payment_method_id?: string; scheduled_change?: object; tax_id?: string; }; }`\n\n  - `immediate_charge: { effective_at: string; line_items: { id: string; currency: string; product_id: string; proration_factor: number; quantity: number; tax_inclusive: boolean; type: 'subscription'; unit_price: number; description?: string; name?: string; tax?: number; tax_rate?: number; } | { id: string; currency: string; name: string; proration_factor: number; quantity: number; tax_category: 'digital_products' | 'saas' | 'e_book' | 'edtech'; tax_inclusive: boolean; tax_rate: number; type: 'addon'; unit_price: number; description?: string; tax?: number; } | { id: string; chargeable_units: string; currency: string; free_threshold: number; name: string; price_per_unit: string; subtotal: number; tax_inclusive: boolean; tax_rate: number; type: 'meter'; units_consumed: string; description?: string; tax?: number; }[]; summary: { currency: string; customer_credits: number; settlement_amount: number; settlement_currency: string; total_amount: number; settlement_tax?: number; tax?: number; }; }`\n  - `new_plan: { addons: { addon_id: string; quantity: number; }[]; billing: { country: country_code; city?: string; state?: string; street?: string; zipcode?: string; }; cancel_at_next_billing_date: boolean; created_at: string; credit_entitlement_cart: { credit_entitlement_id: string; credit_entitlement_name: string; credits_amount: string; overage_balance: string; overage_behavior: cbb_overage_behavior; overage_enabled: boolean; product_id: string; remaining_balance: string; rollover_enabled: boolean; unit: string; expires_after_days?: number; low_balance_threshold_percent?: number; max_rollover_count?: number; overage_limit?: string; rollover_percentage?: number; rollover_timeframe_count?: number; rollover_timeframe_interval?: time_interval; }[]; currency: string; customer: { customer_id: string; email: string; name: string; metadata?: object; phone_number?: string; }; metadata: object; meter_credit_entitlement_cart: { credit_entitlement_id: string; meter_id: string; meter_name: string; meter_units_per_credit: string; product_id: string; }[]; meters: { currency: currency; free_threshold: number; measurement_unit: string; meter_id: string; name: string; description?: string; price_per_unit?: string; }[]; next_billing_date: string; on_demand: boolean; payment_frequency_count: number; payment_frequency_interval: 'Day' | 'Week' | 'Month' | 'Year'; previous_billing_date: string; product_id: string; quantity: number; recurring_pre_tax_amount: number; status: 'pending' | 'active' | 'on_hold' | 'cancelled' | 'failed' | 'expired'; subscription_id: string; subscription_period_count: number; subscription_period_interval: 'Day' | 'Week' | 'Month' | 'Year'; tax_inclusive: boolean; trial_period_days: number; cancelled_at?: string; custom_field_responses?: { key: string; value: string; }[]; discount_cycles_remaining?: number; discount_id?: string; expires_at?: string; payment_method_id?: string; scheduled_change?: { id: string; addons: { addon_id: string; name: string; quantity: number; }[]; created_at: string; effective_at: string; product_id: string; quantity: number; product_description?: string; product_name?: string; }; tax_id?: string; }`\n\n### Example\n\n```typescript\nimport DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments();\n\nconst response = await client.subscriptions.previewChangePlan('subscription_id', {\n  product_id: 'product_id',\n  proration_billing_mode: 'prorated_immediately',\n  quantity: 0,\n});\n\nconsole.log(response);\n```",
    perLanguage: {
      cli: {
        method: 'subscriptions preview_change_plan',
        example:
          "dodo-payments-cli subscriptions preview-change-plan \\\n  --bearer-token 'My Bearer Token' \\\n  --subscription-id subscription_id \\\n  --product-id product_id \\\n  --proration-billing-mode prorated_immediately \\\n  --quantity 0",
      },
      csharp: {
        method: 'Subscriptions.PreviewChangePlan',
        example:
          'SubscriptionPreviewChangePlanParams parameters = new()\n{\n    SubscriptionID = "subscription_id",\n    ProductID = "product_id",\n    ProrationBillingMode = ProrationBillingMode.ProratedImmediately,\n    Quantity = 0,\n};\n\nvar response = await client.Subscriptions.PreviewChangePlan(parameters);\n\nConsole.WriteLine(response);',
      },
      go: {
        method: 'client.Subscriptions.PreviewChangePlan',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/dodopayments/dodopayments-go"\n\t"github.com/dodopayments/dodopayments-go/option"\n)\n\nfunc main() {\n\tclient := dodopayments.NewClient(\n\t\toption.WithBearerToken("My Bearer Token"),\n\t)\n\tresponse, err := client.Subscriptions.PreviewChangePlan(\n\t\tcontext.TODO(),\n\t\t"subscription_id",\n\t\tdodopayments.SubscriptionPreviewChangePlanParams{\n\t\t\tUpdateSubscriptionPlanReq: dodopayments.UpdateSubscriptionPlanReqParam{\n\t\t\t\tProductID:            dodopayments.F("product_id"),\n\t\t\t\tProrationBillingMode: dodopayments.F(dodopayments.UpdateSubscriptionPlanReqProrationBillingModeProratedImmediately),\n\t\t\t\tQuantity:             dodopayments.F(int64(0)),\n\t\t\t},\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.ImmediateCharge)\n}\n',
      },
      http: {
        example:
          'curl https://live.dodopayments.com/subscriptions/$SUBSCRIPTION_ID/change-plan/preview \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $DODO_PAYMENTS_API_KEY" \\\n    -d \'{\n          "product_id": "product_id",\n          "proration_billing_mode": "prorated_immediately",\n          "quantity": 0\n        }\'',
      },
      java: {
        method: 'subscriptions().previewChangePlan',
        example:
          'package com.dodopayments.api.example;\n\nimport com.dodopayments.api.client.DodoPaymentsClient;\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient;\nimport com.dodopayments.api.models.subscriptions.SubscriptionPreviewChangePlanParams;\nimport com.dodopayments.api.models.subscriptions.SubscriptionPreviewChangePlanResponse;\nimport com.dodopayments.api.models.subscriptions.UpdateSubscriptionPlanReq;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        DodoPaymentsClient client = DodoPaymentsOkHttpClient.fromEnv();\n\n        SubscriptionPreviewChangePlanParams params = SubscriptionPreviewChangePlanParams.builder()\n            .subscriptionId("subscription_id")\n            .updateSubscriptionPlanReq(UpdateSubscriptionPlanReq.builder()\n                .productId("product_id")\n                .prorationBillingMode(UpdateSubscriptionPlanReq.ProrationBillingMode.PRORATED_IMMEDIATELY)\n                .quantity(0)\n                .build())\n            .build();\n        SubscriptionPreviewChangePlanResponse response = client.subscriptions().previewChangePlan(params);\n    }\n}',
      },
      kotlin: {
        method: 'subscriptions().previewChangePlan',
        example:
          'package com.dodopayments.api.example\n\nimport com.dodopayments.api.client.DodoPaymentsClient\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient\nimport com.dodopayments.api.models.subscriptions.SubscriptionPreviewChangePlanParams\nimport com.dodopayments.api.models.subscriptions.SubscriptionPreviewChangePlanResponse\nimport com.dodopayments.api.models.subscriptions.UpdateSubscriptionPlanReq\n\nfun main() {\n    val client: DodoPaymentsClient = DodoPaymentsOkHttpClient.fromEnv()\n\n    val params: SubscriptionPreviewChangePlanParams = SubscriptionPreviewChangePlanParams.builder()\n        .subscriptionId("subscription_id")\n        .updateSubscriptionPlanReq(UpdateSubscriptionPlanReq.builder()\n            .productId("product_id")\n            .prorationBillingMode(UpdateSubscriptionPlanReq.ProrationBillingMode.PRORATED_IMMEDIATELY)\n            .quantity(0)\n            .build())\n        .build()\n    val response: SubscriptionPreviewChangePlanResponse = client.subscriptions().previewChangePlan(params)\n}',
      },
      php: {
        method: 'subscriptions->previewChangePlan',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(bearerToken: 'My Bearer Token', environment: 'test_mode');\n\n$response = $client->subscriptions->previewChangePlan(\n  'subscription_id',\n  productID: 'product_id',\n  prorationBillingMode: 'prorated_immediately',\n  quantity: 0,\n  addons: [['addonID' => 'addon_id', 'quantity' => 0]],\n  discountCode: 'discount_code',\n  effectiveAt: 'immediately',\n  metadata: ['foo' => 'string'],\n  onPaymentFailure: 'prevent_change',\n);\n\nvar_dump($response);",
      },
      python: {
        method: 'subscriptions.preview_change_plan',
        example:
          'import os\nfrom dodopayments import DodoPayments\n\nclient = DodoPayments(\n    bearer_token=os.environ.get("DODO_PAYMENTS_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.subscriptions.preview_change_plan(\n    subscription_id="subscription_id",\n    product_id="product_id",\n    proration_billing_mode="prorated_immediately",\n    quantity=0,\n)\nprint(response.immediate_charge)',
      },
      ruby: {
        method: 'subscriptions.preview_change_plan',
        example:
          'require "dodopayments"\n\ndodo_payments = Dodopayments::Client.new(\n  bearer_token: "My Bearer Token",\n  environment: "test_mode" # defaults to "live_mode"\n)\n\nresponse = dodo_payments.subscriptions.preview_change_plan(\n  "subscription_id",\n  product_id: "product_id",\n  proration_billing_mode: :prorated_immediately,\n  quantity: 0\n)\n\nputs(response)',
      },
      typescript: {
        method: 'client.subscriptions.previewChangePlan',
        example:
          "import DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments({\n  bearerToken: process.env['DODO_PAYMENTS_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.subscriptions.previewChangePlan('subscription_id', {\n  product_id: 'product_id',\n  proration_billing_mode: 'prorated_immediately',\n  quantity: 0,\n});\n\nconsole.log(response.immediate_charge);",
      },
    },
  },
  {
    name: 'retrieve_credit_usage',
    endpoint: '/subscriptions/{subscription_id}/credit-usage',
    httpMethod: 'get',
    summary: '',
    description: '',
    stainlessPath: '(resource) subscriptions > (method) retrieve_credit_usage',
    qualified: 'client.subscriptions.retrieveCreditUsage',
    params: ['subscription_id: string;'],
    response:
      '{ items: { balance: string; credit_entitlement_id: string; credit_entitlement_name: string; limit_reached: boolean; overage: string; overage_enabled: boolean; unit: string; overage_limit?: string; remaining_headroom?: string; }[]; subscription_id: string; }',
    markdown:
      "## retrieve_credit_usage\n\n`client.subscriptions.retrieveCreditUsage(subscription_id: string): { items: object[]; subscription_id: string; }`\n\n**get** `/subscriptions/{subscription_id}/credit-usage`\n\n### Parameters\n\n- `subscription_id: string`\n\n### Returns\n\n- `{ items: { balance: string; credit_entitlement_id: string; credit_entitlement_name: string; limit_reached: boolean; overage: string; overage_enabled: boolean; unit: string; overage_limit?: string; remaining_headroom?: string; }[]; subscription_id: string; }`\n  Credit usage status for all entitlements linked to a subscription\n\n  - `items: { balance: string; credit_entitlement_id: string; credit_entitlement_name: string; limit_reached: boolean; overage: string; overage_enabled: boolean; unit: string; overage_limit?: string; remaining_headroom?: string; }[]`\n  - `subscription_id: string`\n\n### Example\n\n```typescript\nimport DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments();\n\nconst response = await client.subscriptions.retrieveCreditUsage('subscription_id');\n\nconsole.log(response);\n```",
    perLanguage: {
      cli: {
        method: 'subscriptions retrieve_credit_usage',
        example:
          "dodo-payments-cli subscriptions retrieve-credit-usage \\\n  --bearer-token 'My Bearer Token' \\\n  --subscription-id subscription_id",
      },
      csharp: {
        method: 'Subscriptions.RetrieveCreditUsage',
        example:
          'SubscriptionRetrieveCreditUsageParams parameters = new()\n{\n    SubscriptionID = "subscription_id"\n};\n\nvar response = await client.Subscriptions.RetrieveCreditUsage(parameters);\n\nConsole.WriteLine(response);',
      },
      go: {
        method: 'client.Subscriptions.GetCreditUsage',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/dodopayments/dodopayments-go"\n\t"github.com/dodopayments/dodopayments-go/option"\n)\n\nfunc main() {\n\tclient := dodopayments.NewClient(\n\t\toption.WithBearerToken("My Bearer Token"),\n\t)\n\tresponse, err := client.Subscriptions.GetCreditUsage(context.TODO(), "subscription_id")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.SubscriptionID)\n}\n',
      },
      http: {
        example:
          'curl https://live.dodopayments.com/subscriptions/$SUBSCRIPTION_ID/credit-usage \\\n    -H "Authorization: Bearer $DODO_PAYMENTS_API_KEY"',
      },
      java: {
        method: 'subscriptions().retrieveCreditUsage',
        example:
          'package com.dodopayments.api.example;\n\nimport com.dodopayments.api.client.DodoPaymentsClient;\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient;\nimport com.dodopayments.api.models.subscriptions.SubscriptionRetrieveCreditUsageParams;\nimport com.dodopayments.api.models.subscriptions.SubscriptionRetrieveCreditUsageResponse;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        DodoPaymentsClient client = DodoPaymentsOkHttpClient.fromEnv();\n\n        SubscriptionRetrieveCreditUsageResponse response = client.subscriptions().retrieveCreditUsage("subscription_id");\n    }\n}',
      },
      kotlin: {
        method: 'subscriptions().retrieveCreditUsage',
        example:
          'package com.dodopayments.api.example\n\nimport com.dodopayments.api.client.DodoPaymentsClient\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient\nimport com.dodopayments.api.models.subscriptions.SubscriptionRetrieveCreditUsageParams\nimport com.dodopayments.api.models.subscriptions.SubscriptionRetrieveCreditUsageResponse\n\nfun main() {\n    val client: DodoPaymentsClient = DodoPaymentsOkHttpClient.fromEnv()\n\n    val response: SubscriptionRetrieveCreditUsageResponse = client.subscriptions().retrieveCreditUsage("subscription_id")\n}',
      },
      php: {
        method: 'subscriptions->retrieveCreditUsage',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(bearerToken: 'My Bearer Token', environment: 'test_mode');\n\n$response = $client->subscriptions->retrieveCreditUsage('subscription_id');\n\nvar_dump($response);",
      },
      python: {
        method: 'subscriptions.retrieve_credit_usage',
        example:
          'import os\nfrom dodopayments import DodoPayments\n\nclient = DodoPayments(\n    bearer_token=os.environ.get("DODO_PAYMENTS_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.subscriptions.retrieve_credit_usage(\n    "subscription_id",\n)\nprint(response.subscription_id)',
      },
      ruby: {
        method: 'subscriptions.retrieve_credit_usage',
        example:
          'require "dodopayments"\n\ndodo_payments = Dodopayments::Client.new(\n  bearer_token: "My Bearer Token",\n  environment: "test_mode" # defaults to "live_mode"\n)\n\nresponse = dodo_payments.subscriptions.retrieve_credit_usage("subscription_id")\n\nputs(response)',
      },
      typescript: {
        method: 'client.subscriptions.retrieveCreditUsage',
        example:
          "import DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments({\n  bearerToken: process.env['DODO_PAYMENTS_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.subscriptions.retrieveCreditUsage('subscription_id');\n\nconsole.log(response.subscription_id);",
      },
    },
  },
  {
    name: 'cancel_change_plan',
    endpoint: '/subscriptions/{subscription_id}/change-plan/scheduled',
    httpMethod: 'delete',
    summary: '',
    description: '',
    stainlessPath: '(resource) subscriptions > (method) cancel_change_plan',
    qualified: 'client.subscriptions.cancelChangePlan',
    params: ['subscription_id: string;'],
    markdown:
      "## cancel_change_plan\n\n`client.subscriptions.cancelChangePlan(subscription_id: string): void`\n\n**delete** `/subscriptions/{subscription_id}/change-plan/scheduled`\n\n### Parameters\n\n- `subscription_id: string`\n\n### Example\n\n```typescript\nimport DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments();\n\nawait client.subscriptions.cancelChangePlan('subscription_id')\n```",
    perLanguage: {
      cli: {
        method: 'subscriptions cancel_change_plan',
        example:
          "dodo-payments-cli subscriptions cancel-change-plan \\\n  --bearer-token 'My Bearer Token' \\\n  --subscription-id subscription_id",
      },
      csharp: {
        method: 'Subscriptions.CancelChangePlan',
        example:
          'SubscriptionCancelChangePlanParams parameters = new()\n{\n    SubscriptionID = "subscription_id"\n};\n\nawait client.Subscriptions.CancelChangePlan(parameters);',
      },
      go: {
        method: 'client.Subscriptions.CancelChangePlan',
        example:
          'package main\n\nimport (\n\t"context"\n\n\t"github.com/dodopayments/dodopayments-go"\n\t"github.com/dodopayments/dodopayments-go/option"\n)\n\nfunc main() {\n\tclient := dodopayments.NewClient(\n\t\toption.WithBearerToken("My Bearer Token"),\n\t)\n\terr := client.Subscriptions.CancelChangePlan(context.TODO(), "subscription_id")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
      http: {
        example:
          'curl https://live.dodopayments.com/subscriptions/$SUBSCRIPTION_ID/change-plan/scheduled \\\n    -X DELETE \\\n    -H "Authorization: Bearer $DODO_PAYMENTS_API_KEY"',
      },
      java: {
        method: 'subscriptions().cancelChangePlan',
        example:
          'package com.dodopayments.api.example;\n\nimport com.dodopayments.api.client.DodoPaymentsClient;\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient;\nimport com.dodopayments.api.models.subscriptions.SubscriptionCancelChangePlanParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        DodoPaymentsClient client = DodoPaymentsOkHttpClient.fromEnv();\n\n        client.subscriptions().cancelChangePlan("subscription_id");\n    }\n}',
      },
      kotlin: {
        method: 'subscriptions().cancelChangePlan',
        example:
          'package com.dodopayments.api.example\n\nimport com.dodopayments.api.client.DodoPaymentsClient\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient\nimport com.dodopayments.api.models.subscriptions.SubscriptionCancelChangePlanParams\n\nfun main() {\n    val client: DodoPaymentsClient = DodoPaymentsOkHttpClient.fromEnv()\n\n    client.subscriptions().cancelChangePlan("subscription_id")\n}',
      },
      php: {
        method: 'subscriptions->cancelChangePlan',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(bearerToken: 'My Bearer Token', environment: 'test_mode');\n\n$result = $client->subscriptions->cancelChangePlan('subscription_id');\n\nvar_dump($result);",
      },
      python: {
        method: 'subscriptions.cancel_change_plan',
        example:
          'import os\nfrom dodopayments import DodoPayments\n\nclient = DodoPayments(\n    bearer_token=os.environ.get("DODO_PAYMENTS_API_KEY"),  # This is the default and can be omitted\n)\nclient.subscriptions.cancel_change_plan(\n    "subscription_id",\n)',
      },
      ruby: {
        method: 'subscriptions.cancel_change_plan',
        example:
          'require "dodopayments"\n\ndodo_payments = Dodopayments::Client.new(\n  bearer_token: "My Bearer Token",\n  environment: "test_mode" # defaults to "live_mode"\n)\n\nresult = dodo_payments.subscriptions.cancel_change_plan("subscription_id")\n\nputs(result)',
      },
      typescript: {
        method: 'client.subscriptions.cancelChangePlan',
        example:
          "import DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments({\n  bearerToken: process.env['DODO_PAYMENTS_API_KEY'], // This is the default and can be omitted\n});\n\nawait client.subscriptions.cancelChangePlan('subscription_id');",
      },
    },
  },
  {
    name: 'retrieve',
    endpoint: '/invoices/payments/{payment_id}',
    httpMethod: 'get',
    summary: '',
    description: '',
    stainlessPath: '(resource) invoices.payments > (method) retrieve',
    qualified: 'client.invoices.payments.retrieve',
    params: ['payment_id: string;'],
    response: 'string',
    markdown:
      "## retrieve\n\n`client.invoices.payments.retrieve(payment_id: string): string`\n\n**get** `/invoices/payments/{payment_id}`\n\n### Parameters\n\n- `payment_id: string`\n\n### Returns\n\n- `string`\n\n### Example\n\n```typescript\nimport DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments();\n\nconst payment = await client.invoices.payments.retrieve('payment_id');\n\nconsole.log(payment);\n\nconst content = await payment.blob()\nconsole.log(content)\n```",
    perLanguage: {
      cli: {
        method: 'payments retrieve',
        example:
          "dodo-payments-cli invoices:payments retrieve \\\n  --bearer-token 'My Bearer Token' \\\n  --payment-id payment_id",
      },
      csharp: {
        method: 'Invoices.Payments.Retrieve',
        example:
          'PaymentRetrieveParams parameters = new() { PaymentID = "payment_id" };\n\nvar payment = await client.Invoices.Payments.Retrieve(parameters);\n\nConsole.WriteLine(payment);',
      },
      go: {
        method: 'client.Invoices.Payments.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/dodopayments/dodopayments-go"\n\t"github.com/dodopayments/dodopayments-go/option"\n)\n\nfunc main() {\n\tclient := dodopayments.NewClient(\n\t\toption.WithBearerToken("My Bearer Token"),\n\t)\n\tpayment, err := client.Invoices.Payments.Get(context.TODO(), "payment_id")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", payment)\n}\n',
      },
      http: {
        example:
          'curl https://live.dodopayments.com/invoices/payments/$PAYMENT_ID \\\n    -H "Authorization: Bearer $DODO_PAYMENTS_API_KEY"',
      },
      java: {
        method: 'invoices().payments().retrieve',
        example:
          'package com.dodopayments.api.example;\n\nimport com.dodopayments.api.client.DodoPaymentsClient;\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient;\nimport com.dodopayments.api.core.http.HttpResponse;\nimport com.dodopayments.api.models.invoices.payments.PaymentRetrieveParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        DodoPaymentsClient client = DodoPaymentsOkHttpClient.fromEnv();\n\n        HttpResponse payment = client.invoices().payments().retrieve("payment_id");\n    }\n}',
      },
      kotlin: {
        method: 'invoices().payments().retrieve',
        example:
          'package com.dodopayments.api.example\n\nimport com.dodopayments.api.client.DodoPaymentsClient\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient\nimport com.dodopayments.api.core.http.HttpResponse\nimport com.dodopayments.api.models.invoices.payments.PaymentRetrieveParams\n\nfun main() {\n    val client: DodoPaymentsClient = DodoPaymentsOkHttpClient.fromEnv()\n\n    val payment: HttpResponse = client.invoices().payments().retrieve("payment_id")\n}',
      },
      php: {
        method: 'invoices->payments->retrieve',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(bearerToken: 'My Bearer Token', environment: 'test_mode');\n\n$payment = $client->invoices->payments->retrieve('payment_id');\n\nvar_dump($payment);",
      },
      python: {
        method: 'invoices.payments.retrieve',
        example:
          'import os\nfrom dodopayments import DodoPayments\n\nclient = DodoPayments(\n    bearer_token=os.environ.get("DODO_PAYMENTS_API_KEY"),  # This is the default and can be omitted\n)\npayment = client.invoices.payments.retrieve(\n    "payment_id",\n)\nprint(payment)\ncontent = payment.read()\nprint(content)',
      },
      ruby: {
        method: 'invoices.payments.retrieve',
        example:
          'require "dodopayments"\n\ndodo_payments = Dodopayments::Client.new(\n  bearer_token: "My Bearer Token",\n  environment: "test_mode" # defaults to "live_mode"\n)\n\npayment = dodo_payments.invoices.payments.retrieve("payment_id")\n\nputs(payment)',
      },
      typescript: {
        method: 'client.invoices.payments.retrieve',
        example:
          "import DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments({\n  bearerToken: process.env['DODO_PAYMENTS_API_KEY'], // This is the default and can be omitted\n});\n\nconst payment = await client.invoices.payments.retrieve('payment_id');\n\nconsole.log(payment);\n\nconst content = await payment.blob();\nconsole.log(content);",
      },
    },
  },
  {
    name: 'retrieve_refund',
    endpoint: '/invoices/refunds/{refund_id}',
    httpMethod: 'get',
    summary: '',
    description: '',
    stainlessPath: '(resource) invoices.payments > (method) retrieve_refund',
    qualified: 'client.invoices.payments.retrieveRefund',
    params: ['refund_id: string;'],
    response: 'string',
    markdown:
      "## retrieve_refund\n\n`client.invoices.payments.retrieveRefund(refund_id: string): string`\n\n**get** `/invoices/refunds/{refund_id}`\n\n### Parameters\n\n- `refund_id: string`\n\n### Returns\n\n- `string`\n\n### Example\n\n```typescript\nimport DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments();\n\nconst response = await client.invoices.payments.retrieveRefund('refund_id');\n\nconsole.log(response);\n\nconst content = await response.blob()\nconsole.log(content)\n```",
    perLanguage: {
      cli: {
        method: 'payments retrieve_refund',
        example:
          "dodo-payments-cli invoices:payments retrieve-refund \\\n  --bearer-token 'My Bearer Token' \\\n  --refund-id refund_id",
      },
      csharp: {
        method: 'Invoices.Payments.RetrieveRefund',
        example:
          'PaymentRetrieveRefundParams parameters = new() { RefundID = "refund_id" };\n\nvar response = await client.Invoices.Payments.RetrieveRefund(parameters);\n\nConsole.WriteLine(response);',
      },
      go: {
        method: 'client.Invoices.Payments.GetRefund',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/dodopayments/dodopayments-go"\n\t"github.com/dodopayments/dodopayments-go/option"\n)\n\nfunc main() {\n\tclient := dodopayments.NewClient(\n\t\toption.WithBearerToken("My Bearer Token"),\n\t)\n\tresponse, err := client.Invoices.Payments.GetRefund(context.TODO(), "refund_id")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response)\n}\n',
      },
      http: {
        example:
          'curl https://live.dodopayments.com/invoices/refunds/$REFUND_ID \\\n    -H "Authorization: Bearer $DODO_PAYMENTS_API_KEY"',
      },
      java: {
        method: 'invoices().payments().retrieveRefund',
        example:
          'package com.dodopayments.api.example;\n\nimport com.dodopayments.api.client.DodoPaymentsClient;\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient;\nimport com.dodopayments.api.core.http.HttpResponse;\nimport com.dodopayments.api.models.invoices.payments.PaymentRetrieveRefundParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        DodoPaymentsClient client = DodoPaymentsOkHttpClient.fromEnv();\n\n        HttpResponse response = client.invoices().payments().retrieveRefund("refund_id");\n    }\n}',
      },
      kotlin: {
        method: 'invoices().payments().retrieveRefund',
        example:
          'package com.dodopayments.api.example\n\nimport com.dodopayments.api.client.DodoPaymentsClient\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient\nimport com.dodopayments.api.core.http.HttpResponse\nimport com.dodopayments.api.models.invoices.payments.PaymentRetrieveRefundParams\n\nfun main() {\n    val client: DodoPaymentsClient = DodoPaymentsOkHttpClient.fromEnv()\n\n    val response: HttpResponse = client.invoices().payments().retrieveRefund("refund_id")\n}',
      },
      php: {
        method: 'invoices->payments->retrieveRefund',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(bearerToken: 'My Bearer Token', environment: 'test_mode');\n\n$response = $client->invoices->payments->retrieveRefund('refund_id');\n\nvar_dump($response);",
      },
      python: {
        method: 'invoices.payments.retrieve_refund',
        example:
          'import os\nfrom dodopayments import DodoPayments\n\nclient = DodoPayments(\n    bearer_token=os.environ.get("DODO_PAYMENTS_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.invoices.payments.retrieve_refund(\n    "refund_id",\n)\nprint(response)\ncontent = response.read()\nprint(content)',
      },
      ruby: {
        method: 'invoices.payments.retrieve_refund',
        example:
          'require "dodopayments"\n\ndodo_payments = Dodopayments::Client.new(\n  bearer_token: "My Bearer Token",\n  environment: "test_mode" # defaults to "live_mode"\n)\n\nresponse = dodo_payments.invoices.payments.retrieve_refund("refund_id")\n\nputs(response)',
      },
      typescript: {
        method: 'client.invoices.payments.retrieveRefund',
        example:
          "import DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments({\n  bearerToken: process.env['DODO_PAYMENTS_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.invoices.payments.retrieveRefund('refund_id');\n\nconsole.log(response);\n\nconst content = await response.blob();\nconsole.log(content);",
      },
    },
  },
  {
    name: 'activate',
    endpoint: '/licenses/activate',
    httpMethod: 'post',
    summary: '',
    description: '',
    stainlessPath: '(resource) licenses > (method) activate',
    qualified: 'client.licenses.activate',
    params: ['license_key: string;', 'name: string;'],
    response:
      '{ id: string; business_id: string; created_at: string; customer: { customer_id: string; email: string; name: string; metadata?: object; phone_number?: string; }; license_key_id: string; name: string; product: { product_id: string; name?: string; }; }',
    markdown:
      "## activate\n\n`client.licenses.activate(license_key: string, name: string): { id: string; business_id: string; created_at: string; customer: customer_limited_details; license_key_id: string; name: string; product: object; }`\n\n**post** `/licenses/activate`\n\n### Parameters\n\n- `license_key: string`\n\n- `name: string`\n\n### Returns\n\n- `{ id: string; business_id: string; created_at: string; customer: { customer_id: string; email: string; name: string; metadata?: object; phone_number?: string; }; license_key_id: string; name: string; product: { product_id: string; name?: string; }; }`\n\n  - `id: string`\n  - `business_id: string`\n  - `created_at: string`\n  - `customer: { customer_id: string; email: string; name: string; metadata?: object; phone_number?: string; }`\n  - `license_key_id: string`\n  - `name: string`\n  - `product: { product_id: string; name?: string; }`\n\n### Example\n\n```typescript\nimport DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments();\n\nconst response = await client.licenses.activate({ license_key: 'license_key', name: 'name' });\n\nconsole.log(response);\n```",
    perLanguage: {
      cli: {
        method: 'licenses activate',
        example:
          "dodo-payments-cli licenses activate \\\n  --bearer-token 'My Bearer Token' \\\n  --license-key license_key \\\n  --name name",
      },
      csharp: {
        method: 'Licenses.Activate',
        example:
          'LicenseActivateParams parameters = new()\n{\n    LicenseKey = "license_key",\n    Name = "name",\n};\n\nvar response = await client.Licenses.Activate(parameters);\n\nConsole.WriteLine(response);',
      },
      go: {
        method: 'client.Licenses.Activate',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/dodopayments/dodopayments-go"\n\t"github.com/dodopayments/dodopayments-go/option"\n)\n\nfunc main() {\n\tclient := dodopayments.NewClient(\n\t\toption.WithBearerToken("My Bearer Token"),\n\t)\n\tresponse, err := client.Licenses.Activate(context.TODO(), dodopayments.LicenseActivateParams{\n\t\tLicenseKey: dodopayments.F("license_key"),\n\t\tName:       dodopayments.F("name"),\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.ID)\n}\n',
      },
      http: {
        example:
          'curl https://live.dodopayments.com/licenses/activate \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $DODO_PAYMENTS_API_KEY" \\\n    -d \'{\n          "license_key": "license_key",\n          "name": "name"\n        }\'',
      },
      java: {
        method: 'licenses().activate',
        example:
          'package com.dodopayments.api.example;\n\nimport com.dodopayments.api.client.DodoPaymentsClient;\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient;\nimport com.dodopayments.api.models.licenses.LicenseActivateParams;\nimport com.dodopayments.api.models.licenses.LicenseActivateResponse;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        DodoPaymentsClient client = DodoPaymentsOkHttpClient.fromEnv();\n\n        LicenseActivateParams params = LicenseActivateParams.builder()\n            .licenseKey("license_key")\n            .name("name")\n            .build();\n        LicenseActivateResponse response = client.licenses().activate(params);\n    }\n}',
      },
      kotlin: {
        method: 'licenses().activate',
        example:
          'package com.dodopayments.api.example\n\nimport com.dodopayments.api.client.DodoPaymentsClient\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient\nimport com.dodopayments.api.models.licenses.LicenseActivateParams\nimport com.dodopayments.api.models.licenses.LicenseActivateResponse\n\nfun main() {\n    val client: DodoPaymentsClient = DodoPaymentsOkHttpClient.fromEnv()\n\n    val params: LicenseActivateParams = LicenseActivateParams.builder()\n        .licenseKey("license_key")\n        .name("name")\n        .build()\n    val response: LicenseActivateResponse = client.licenses().activate(params)\n}',
      },
      php: {
        method: 'licenses->activate',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(bearerToken: 'My Bearer Token', environment: 'test_mode');\n\n$response = $client->licenses->activate(\n  licenseKey: 'license_key', name: 'name'\n);\n\nvar_dump($response);",
      },
      python: {
        method: 'licenses.activate',
        example:
          'import os\nfrom dodopayments import DodoPayments\n\nclient = DodoPayments(\n    bearer_token=os.environ.get("DODO_PAYMENTS_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.licenses.activate(\n    license_key="license_key",\n    name="name",\n)\nprint(response.id)',
      },
      ruby: {
        method: 'licenses.activate',
        example:
          'require "dodopayments"\n\ndodo_payments = Dodopayments::Client.new(\n  bearer_token: "My Bearer Token",\n  environment: "test_mode" # defaults to "live_mode"\n)\n\nresponse = dodo_payments.licenses.activate(license_key: "license_key", name: "name")\n\nputs(response)',
      },
      typescript: {
        method: 'client.licenses.activate',
        example:
          "import DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments({\n  bearerToken: process.env['DODO_PAYMENTS_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.licenses.activate({ license_key: 'license_key', name: 'name' });\n\nconsole.log(response.id);",
      },
    },
  },
  {
    name: 'deactivate',
    endpoint: '/licenses/deactivate',
    httpMethod: 'post',
    summary: '',
    description: '',
    stainlessPath: '(resource) licenses > (method) deactivate',
    qualified: 'client.licenses.deactivate',
    params: ['license_key: string;', 'license_key_instance_id: string;'],
    markdown:
      "## deactivate\n\n`client.licenses.deactivate(license_key: string, license_key_instance_id: string): void`\n\n**post** `/licenses/deactivate`\n\n### Parameters\n\n- `license_key: string`\n\n- `license_key_instance_id: string`\n\n### Example\n\n```typescript\nimport DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments();\n\nawait client.licenses.deactivate({ license_key: 'license_key', license_key_instance_id: 'license_key_instance_id' })\n```",
    perLanguage: {
      cli: {
        method: 'licenses deactivate',
        example:
          "dodo-payments-cli licenses deactivate \\\n  --bearer-token 'My Bearer Token' \\\n  --license-key license_key \\\n  --license-key-instance-id license_key_instance_id",
      },
      csharp: {
        method: 'Licenses.Deactivate',
        example:
          'LicenseDeactivateParams parameters = new()\n{\n    LicenseKey = "license_key",\n    LicenseKeyInstanceID = "license_key_instance_id",\n};\n\nawait client.Licenses.Deactivate(parameters);',
      },
      go: {
        method: 'client.Licenses.Deactivate',
        example:
          'package main\n\nimport (\n\t"context"\n\n\t"github.com/dodopayments/dodopayments-go"\n\t"github.com/dodopayments/dodopayments-go/option"\n)\n\nfunc main() {\n\tclient := dodopayments.NewClient(\n\t\toption.WithBearerToken("My Bearer Token"),\n\t)\n\terr := client.Licenses.Deactivate(context.TODO(), dodopayments.LicenseDeactivateParams{\n\t\tLicenseKey:           dodopayments.F("license_key"),\n\t\tLicenseKeyInstanceID: dodopayments.F("license_key_instance_id"),\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
      http: {
        example:
          'curl https://live.dodopayments.com/licenses/deactivate \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $DODO_PAYMENTS_API_KEY" \\\n    -d \'{\n          "license_key": "license_key",\n          "license_key_instance_id": "license_key_instance_id"\n        }\'',
      },
      java: {
        method: 'licenses().deactivate',
        example:
          'package com.dodopayments.api.example;\n\nimport com.dodopayments.api.client.DodoPaymentsClient;\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient;\nimport com.dodopayments.api.models.licenses.LicenseDeactivateParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        DodoPaymentsClient client = DodoPaymentsOkHttpClient.fromEnv();\n\n        LicenseDeactivateParams params = LicenseDeactivateParams.builder()\n            .licenseKey("license_key")\n            .licenseKeyInstanceId("license_key_instance_id")\n            .build();\n        client.licenses().deactivate(params);\n    }\n}',
      },
      kotlin: {
        method: 'licenses().deactivate',
        example:
          'package com.dodopayments.api.example\n\nimport com.dodopayments.api.client.DodoPaymentsClient\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient\nimport com.dodopayments.api.models.licenses.LicenseDeactivateParams\n\nfun main() {\n    val client: DodoPaymentsClient = DodoPaymentsOkHttpClient.fromEnv()\n\n    val params: LicenseDeactivateParams = LicenseDeactivateParams.builder()\n        .licenseKey("license_key")\n        .licenseKeyInstanceId("license_key_instance_id")\n        .build()\n    client.licenses().deactivate(params)\n}',
      },
      php: {
        method: 'licenses->deactivate',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(bearerToken: 'My Bearer Token', environment: 'test_mode');\n\n$result = $client->licenses->deactivate(\n  licenseKey: 'license_key', licenseKeyInstanceID: 'license_key_instance_id'\n);\n\nvar_dump($result);",
      },
      python: {
        method: 'licenses.deactivate',
        example:
          'import os\nfrom dodopayments import DodoPayments\n\nclient = DodoPayments(\n    bearer_token=os.environ.get("DODO_PAYMENTS_API_KEY"),  # This is the default and can be omitted\n)\nclient.licenses.deactivate(\n    license_key="license_key",\n    license_key_instance_id="license_key_instance_id",\n)',
      },
      ruby: {
        method: 'licenses.deactivate',
        example:
          'require "dodopayments"\n\ndodo_payments = Dodopayments::Client.new(\n  bearer_token: "My Bearer Token",\n  environment: "test_mode" # defaults to "live_mode"\n)\n\nresult = dodo_payments.licenses.deactivate(\n  license_key: "license_key",\n  license_key_instance_id: "license_key_instance_id"\n)\n\nputs(result)',
      },
      typescript: {
        method: 'client.licenses.deactivate',
        example:
          "import DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments({\n  bearerToken: process.env['DODO_PAYMENTS_API_KEY'], // This is the default and can be omitted\n});\n\nawait client.licenses.deactivate({\n  license_key: 'license_key',\n  license_key_instance_id: 'license_key_instance_id',\n});",
      },
    },
  },
  {
    name: 'validate',
    endpoint: '/licenses/validate',
    httpMethod: 'post',
    summary: '',
    description: '',
    stainlessPath: '(resource) licenses > (method) validate',
    qualified: 'client.licenses.validate',
    params: ['license_key: string;', 'license_key_instance_id?: string;'],
    response: '{ valid: boolean; }',
    markdown:
      "## validate\n\n`client.licenses.validate(license_key: string, license_key_instance_id?: string): { valid: boolean; }`\n\n**post** `/licenses/validate`\n\n### Parameters\n\n- `license_key: string`\n\n- `license_key_instance_id?: string`\n\n### Returns\n\n- `{ valid: boolean; }`\n\n  - `valid: boolean`\n\n### Example\n\n```typescript\nimport DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments();\n\nconst response = await client.licenses.validate({ license_key: '2b1f8e2d-c41e-4e8f-b2d3-d9fd61c38f43' });\n\nconsole.log(response);\n```",
    perLanguage: {
      cli: {
        method: 'licenses validate',
        example:
          "dodo-payments-cli licenses validate \\\n  --bearer-token 'My Bearer Token' \\\n  --license-key 2b1f8e2d-c41e-4e8f-b2d3-d9fd61c38f43",
      },
      csharp: {
        method: 'Licenses.Validate',
        example:
          'LicenseValidateParams parameters = new()\n{\n    LicenseKey = "2b1f8e2d-c41e-4e8f-b2d3-d9fd61c38f43"\n};\n\nvar response = await client.Licenses.Validate(parameters);\n\nConsole.WriteLine(response);',
      },
      go: {
        method: 'client.Licenses.Validate',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/dodopayments/dodopayments-go"\n\t"github.com/dodopayments/dodopayments-go/option"\n)\n\nfunc main() {\n\tclient := dodopayments.NewClient(\n\t\toption.WithBearerToken("My Bearer Token"),\n\t)\n\tresponse, err := client.Licenses.Validate(context.TODO(), dodopayments.LicenseValidateParams{\n\t\tLicenseKey: dodopayments.F("2b1f8e2d-c41e-4e8f-b2d3-d9fd61c38f43"),\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.Valid)\n}\n',
      },
      http: {
        example:
          'curl https://live.dodopayments.com/licenses/validate \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $DODO_PAYMENTS_API_KEY" \\\n    -d \'{\n          "license_key": "2b1f8e2d-c41e-4e8f-b2d3-d9fd61c38f43",\n          "license_key_instance_id": "lki_123"\n        }\'',
      },
      java: {
        method: 'licenses().validate',
        example:
          'package com.dodopayments.api.example;\n\nimport com.dodopayments.api.client.DodoPaymentsClient;\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient;\nimport com.dodopayments.api.models.licenses.LicenseValidateParams;\nimport com.dodopayments.api.models.licenses.LicenseValidateResponse;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        DodoPaymentsClient client = DodoPaymentsOkHttpClient.fromEnv();\n\n        LicenseValidateParams params = LicenseValidateParams.builder()\n            .licenseKey("2b1f8e2d-c41e-4e8f-b2d3-d9fd61c38f43")\n            .build();\n        LicenseValidateResponse response = client.licenses().validate(params);\n    }\n}',
      },
      kotlin: {
        method: 'licenses().validate',
        example:
          'package com.dodopayments.api.example\n\nimport com.dodopayments.api.client.DodoPaymentsClient\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient\nimport com.dodopayments.api.models.licenses.LicenseValidateParams\nimport com.dodopayments.api.models.licenses.LicenseValidateResponse\n\nfun main() {\n    val client: DodoPaymentsClient = DodoPaymentsOkHttpClient.fromEnv()\n\n    val params: LicenseValidateParams = LicenseValidateParams.builder()\n        .licenseKey("2b1f8e2d-c41e-4e8f-b2d3-d9fd61c38f43")\n        .build()\n    val response: LicenseValidateResponse = client.licenses().validate(params)\n}',
      },
      php: {
        method: 'licenses->validate',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(bearerToken: 'My Bearer Token', environment: 'test_mode');\n\n$response = $client->licenses->validate(\n  licenseKey: '2b1f8e2d-c41e-4e8f-b2d3-d9fd61c38f43',\n  licenseKeyInstanceID: 'lki_123',\n);\n\nvar_dump($response);",
      },
      python: {
        method: 'licenses.validate',
        example:
          'import os\nfrom dodopayments import DodoPayments\n\nclient = DodoPayments(\n    bearer_token=os.environ.get("DODO_PAYMENTS_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.licenses.validate(\n    license_key="2b1f8e2d-c41e-4e8f-b2d3-d9fd61c38f43",\n)\nprint(response.valid)',
      },
      ruby: {
        method: 'licenses.validate',
        example:
          'require "dodopayments"\n\ndodo_payments = Dodopayments::Client.new(\n  bearer_token: "My Bearer Token",\n  environment: "test_mode" # defaults to "live_mode"\n)\n\nresponse = dodo_payments.licenses.validate(license_key: "2b1f8e2d-c41e-4e8f-b2d3-d9fd61c38f43")\n\nputs(response)',
      },
      typescript: {
        method: 'client.licenses.validate',
        example:
          "import DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments({\n  bearerToken: process.env['DODO_PAYMENTS_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.licenses.validate({\n  license_key: '2b1f8e2d-c41e-4e8f-b2d3-d9fd61c38f43',\n});\n\nconsole.log(response.valid);",
      },
    },
  },
  {
    name: 'list',
    endpoint: '/license_keys',
    httpMethod: 'get',
    summary: '',
    description: '',
    stainlessPath: '(resource) license_keys > (method) list',
    qualified: 'client.licenseKeys.list',
    params: [
      'created_at_gte?: string;',
      'created_at_lte?: string;',
      'customer_id?: string;',
      'page_number?: number;',
      'page_size?: number;',
      'product_id?: string;',
      "source?: 'auto' | 'import';",
      "status?: 'active' | 'expired' | 'disabled';",
    ],
    response:
      "{ id: string; business_id: string; created_at: string; customer_id: string; instances_count: number; key: string; product_id: string; source: 'auto' | 'import'; status: 'active' | 'expired' | 'disabled'; activations_limit?: number; expires_at?: string; payment_id?: string; subscription_id?: string; }",
    markdown:
      "## list\n\n`client.licenseKeys.list(created_at_gte?: string, created_at_lte?: string, customer_id?: string, page_number?: number, page_size?: number, product_id?: string, source?: 'auto' | 'import', status?: 'active' | 'expired' | 'disabled'): { id: string; business_id: string; created_at: string; customer_id: string; instances_count: number; key: string; product_id: string; source: 'auto' | 'import'; status: license_key_status; activations_limit?: number; expires_at?: string; payment_id?: string; subscription_id?: string; }`\n\n**get** `/license_keys`\n\n### Parameters\n\n- `created_at_gte?: string`\n  Filter license keys created on or after this timestamp\n\n- `created_at_lte?: string`\n  Filter license keys created on or before this timestamp\n\n- `customer_id?: string`\n  Filter by customer ID\n\n- `page_number?: number`\n  Page number default is 0\n\n- `page_size?: number`\n  Page size default is 10 max is 100\n\n- `product_id?: string`\n  Filter by product ID\n\n- `source?: 'auto' | 'import'`\n  Filter by license key source\n\n- `status?: 'active' | 'expired' | 'disabled'`\n  Filter by license key status\n\n### Returns\n\n- `{ id: string; business_id: string; created_at: string; customer_id: string; instances_count: number; key: string; product_id: string; source: 'auto' | 'import'; status: 'active' | 'expired' | 'disabled'; activations_limit?: number; expires_at?: string; payment_id?: string; subscription_id?: string; }`\n\n  - `id: string`\n  - `business_id: string`\n  - `created_at: string`\n  - `customer_id: string`\n  - `instances_count: number`\n  - `key: string`\n  - `product_id: string`\n  - `source: 'auto' | 'import'`\n  - `status: 'active' | 'expired' | 'disabled'`\n  - `activations_limit?: number`\n  - `expires_at?: string`\n  - `payment_id?: string`\n  - `subscription_id?: string`\n\n### Example\n\n```typescript\nimport DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments();\n\n// Automatically fetches more pages as needed.\nfor await (const licenseKey of client.licenseKeys.list()) {\n  console.log(licenseKey);\n}\n```",
    perLanguage: {
      cli: {
        method: 'license_keys list',
        example: "dodo-payments-cli license-keys list \\\n  --bearer-token 'My Bearer Token'",
      },
      csharp: {
        method: 'LicenseKeys.List',
        example:
          'LicenseKeyListParams parameters = new();\n\nvar page = await client.LicenseKeys.List(parameters);\nawait foreach (var item in page.Paginate())\n{\n    Console.WriteLine(item);\n}',
      },
      go: {
        method: 'client.LicenseKeys.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/dodopayments/dodopayments-go"\n\t"github.com/dodopayments/dodopayments-go/option"\n)\n\nfunc main() {\n\tclient := dodopayments.NewClient(\n\t\toption.WithBearerToken("My Bearer Token"),\n\t)\n\tpage, err := client.LicenseKeys.List(context.TODO(), dodopayments.LicenseKeyListParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", page)\n}\n',
      },
      http: {
        example:
          'curl https://live.dodopayments.com/license_keys \\\n    -H "Authorization: Bearer $DODO_PAYMENTS_API_KEY"',
      },
      java: {
        method: 'licenseKeys().list',
        example:
          'package com.dodopayments.api.example;\n\nimport com.dodopayments.api.client.DodoPaymentsClient;\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient;\nimport com.dodopayments.api.models.licensekeys.LicenseKeyListPage;\nimport com.dodopayments.api.models.licensekeys.LicenseKeyListParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        DodoPaymentsClient client = DodoPaymentsOkHttpClient.fromEnv();\n\n        LicenseKeyListPage page = client.licenseKeys().list();\n    }\n}',
      },
      kotlin: {
        method: 'licenseKeys().list',
        example:
          'package com.dodopayments.api.example\n\nimport com.dodopayments.api.client.DodoPaymentsClient\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient\nimport com.dodopayments.api.models.licensekeys.LicenseKeyListPage\nimport com.dodopayments.api.models.licensekeys.LicenseKeyListParams\n\nfun main() {\n    val client: DodoPaymentsClient = DodoPaymentsOkHttpClient.fromEnv()\n\n    val page: LicenseKeyListPage = client.licenseKeys().list()\n}',
      },
      php: {
        method: 'licenseKeys->list',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(bearerToken: 'My Bearer Token', environment: 'test_mode');\n\n$page = $client->licenseKeys->list(\n  createdAtGte: new \\DateTimeImmutable('2019-12-27T18:11:19.117Z'),\n  createdAtLte: new \\DateTimeImmutable('2019-12-27T18:11:19.117Z'),\n  customerID: 'customer_id',\n  pageNumber: 0,\n  pageSize: 0,\n  productID: 'product_id',\n  source: 'auto',\n  status: 'active',\n);\n\nvar_dump($page);",
      },
      python: {
        method: 'license_keys.list',
        example:
          'import os\nfrom dodopayments import DodoPayments\n\nclient = DodoPayments(\n    bearer_token=os.environ.get("DODO_PAYMENTS_API_KEY"),  # This is the default and can be omitted\n)\npage = client.license_keys.list()\npage = page.items[0]\nprint(page.id)',
      },
      ruby: {
        method: 'license_keys.list',
        example:
          'require "dodopayments"\n\ndodo_payments = Dodopayments::Client.new(\n  bearer_token: "My Bearer Token",\n  environment: "test_mode" # defaults to "live_mode"\n)\n\npage = dodo_payments.license_keys.list\n\nputs(page)',
      },
      typescript: {
        method: 'client.licenseKeys.list',
        example:
          "import DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments({\n  bearerToken: process.env['DODO_PAYMENTS_API_KEY'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const licenseKey of client.licenseKeys.list()) {\n  console.log(licenseKey.id);\n}",
      },
    },
  },
  {
    name: 'retrieve',
    endpoint: '/license_keys/{id}',
    httpMethod: 'get',
    summary: '',
    description: '',
    stainlessPath: '(resource) license_keys > (method) retrieve',
    qualified: 'client.licenseKeys.retrieve',
    params: ['id: string;'],
    response:
      "{ id: string; business_id: string; created_at: string; customer_id: string; instances_count: number; key: string; product_id: string; source: 'auto' | 'import'; status: 'active' | 'expired' | 'disabled'; activations_limit?: number; expires_at?: string; payment_id?: string; subscription_id?: string; }",
    markdown:
      "## retrieve\n\n`client.licenseKeys.retrieve(id: string): { id: string; business_id: string; created_at: string; customer_id: string; instances_count: number; key: string; product_id: string; source: 'auto' | 'import'; status: license_key_status; activations_limit?: number; expires_at?: string; payment_id?: string; subscription_id?: string; }`\n\n**get** `/license_keys/{id}`\n\n### Parameters\n\n- `id: string`\n\n### Returns\n\n- `{ id: string; business_id: string; created_at: string; customer_id: string; instances_count: number; key: string; product_id: string; source: 'auto' | 'import'; status: 'active' | 'expired' | 'disabled'; activations_limit?: number; expires_at?: string; payment_id?: string; subscription_id?: string; }`\n\n  - `id: string`\n  - `business_id: string`\n  - `created_at: string`\n  - `customer_id: string`\n  - `instances_count: number`\n  - `key: string`\n  - `product_id: string`\n  - `source: 'auto' | 'import'`\n  - `status: 'active' | 'expired' | 'disabled'`\n  - `activations_limit?: number`\n  - `expires_at?: string`\n  - `payment_id?: string`\n  - `subscription_id?: string`\n\n### Example\n\n```typescript\nimport DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments();\n\nconst licenseKey = await client.licenseKeys.retrieve('lic_123');\n\nconsole.log(licenseKey);\n```",
    perLanguage: {
      cli: {
        method: 'license_keys retrieve',
        example:
          "dodo-payments-cli license-keys retrieve \\\n  --bearer-token 'My Bearer Token' \\\n  --id lic_123",
      },
      csharp: {
        method: 'LicenseKeys.Retrieve',
        example:
          'LicenseKeyRetrieveParams parameters = new() { ID = "lic_123" };\n\nvar licenseKey = await client.LicenseKeys.Retrieve(parameters);\n\nConsole.WriteLine(licenseKey);',
      },
      go: {
        method: 'client.LicenseKeys.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/dodopayments/dodopayments-go"\n\t"github.com/dodopayments/dodopayments-go/option"\n)\n\nfunc main() {\n\tclient := dodopayments.NewClient(\n\t\toption.WithBearerToken("My Bearer Token"),\n\t)\n\tlicenseKey, err := client.LicenseKeys.Get(context.TODO(), "lic_123")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", licenseKey.ID)\n}\n',
      },
      http: {
        example:
          'curl https://live.dodopayments.com/license_keys/$ID \\\n    -H "Authorization: Bearer $DODO_PAYMENTS_API_KEY"',
      },
      java: {
        method: 'licenseKeys().retrieve',
        example:
          'package com.dodopayments.api.example;\n\nimport com.dodopayments.api.client.DodoPaymentsClient;\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient;\nimport com.dodopayments.api.models.licensekeys.LicenseKey;\nimport com.dodopayments.api.models.licensekeys.LicenseKeyRetrieveParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        DodoPaymentsClient client = DodoPaymentsOkHttpClient.fromEnv();\n\n        LicenseKey licenseKey = client.licenseKeys().retrieve("lic_123");\n    }\n}',
      },
      kotlin: {
        method: 'licenseKeys().retrieve',
        example:
          'package com.dodopayments.api.example\n\nimport com.dodopayments.api.client.DodoPaymentsClient\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient\nimport com.dodopayments.api.models.licensekeys.LicenseKey\nimport com.dodopayments.api.models.licensekeys.LicenseKeyRetrieveParams\n\nfun main() {\n    val client: DodoPaymentsClient = DodoPaymentsOkHttpClient.fromEnv()\n\n    val licenseKey: LicenseKey = client.licenseKeys().retrieve("lic_123")\n}',
      },
      php: {
        method: 'licenseKeys->retrieve',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(bearerToken: 'My Bearer Token', environment: 'test_mode');\n\n$licenseKey = $client->licenseKeys->retrieve('lic_123');\n\nvar_dump($licenseKey);",
      },
      python: {
        method: 'license_keys.retrieve',
        example:
          'import os\nfrom dodopayments import DodoPayments\n\nclient = DodoPayments(\n    bearer_token=os.environ.get("DODO_PAYMENTS_API_KEY"),  # This is the default and can be omitted\n)\nlicense_key = client.license_keys.retrieve(\n    "lic_123",\n)\nprint(license_key.id)',
      },
      ruby: {
        method: 'license_keys.retrieve',
        example:
          'require "dodopayments"\n\ndodo_payments = Dodopayments::Client.new(\n  bearer_token: "My Bearer Token",\n  environment: "test_mode" # defaults to "live_mode"\n)\n\nlicense_key = dodo_payments.license_keys.retrieve("lic_123")\n\nputs(license_key)',
      },
      typescript: {
        method: 'client.licenseKeys.retrieve',
        example:
          "import DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments({\n  bearerToken: process.env['DODO_PAYMENTS_API_KEY'], // This is the default and can be omitted\n});\n\nconst licenseKey = await client.licenseKeys.retrieve('lic_123');\n\nconsole.log(licenseKey.id);",
      },
    },
  },
  {
    name: 'update',
    endpoint: '/license_keys/{id}',
    httpMethod: 'patch',
    summary: '',
    description: '',
    stainlessPath: '(resource) license_keys > (method) update',
    qualified: 'client.licenseKeys.update',
    params: ['id: string;', 'activations_limit?: number;', 'disabled?: boolean;', 'expires_at?: string;'],
    response:
      "{ id: string; business_id: string; created_at: string; customer_id: string; instances_count: number; key: string; product_id: string; source: 'auto' | 'import'; status: 'active' | 'expired' | 'disabled'; activations_limit?: number; expires_at?: string; payment_id?: string; subscription_id?: string; }",
    markdown:
      "## update\n\n`client.licenseKeys.update(id: string, activations_limit?: number, disabled?: boolean, expires_at?: string): { id: string; business_id: string; created_at: string; customer_id: string; instances_count: number; key: string; product_id: string; source: 'auto' | 'import'; status: license_key_status; activations_limit?: number; expires_at?: string; payment_id?: string; subscription_id?: string; }`\n\n**patch** `/license_keys/{id}`\n\n### Parameters\n\n- `id: string`\n\n- `activations_limit?: number`\n  The updated activation limit for the license key.\nUse `null` to remove the limit, or omit this field to leave it unchanged.\n\n- `disabled?: boolean`\n  Indicates whether the license key should be disabled.\nA value of `true` disables the key, while `false` enables it. Omit this field to leave it unchanged.\n\n- `expires_at?: string`\n  The updated expiration timestamp for the license key in UTC.\nUse `null` to remove the expiration date, or omit this field to leave it unchanged.\n\n### Returns\n\n- `{ id: string; business_id: string; created_at: string; customer_id: string; instances_count: number; key: string; product_id: string; source: 'auto' | 'import'; status: 'active' | 'expired' | 'disabled'; activations_limit?: number; expires_at?: string; payment_id?: string; subscription_id?: string; }`\n\n  - `id: string`\n  - `business_id: string`\n  - `created_at: string`\n  - `customer_id: string`\n  - `instances_count: number`\n  - `key: string`\n  - `product_id: string`\n  - `source: 'auto' | 'import'`\n  - `status: 'active' | 'expired' | 'disabled'`\n  - `activations_limit?: number`\n  - `expires_at?: string`\n  - `payment_id?: string`\n  - `subscription_id?: string`\n\n### Example\n\n```typescript\nimport DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments();\n\nconst licenseKey = await client.licenseKeys.update('lic_123');\n\nconsole.log(licenseKey);\n```",
    perLanguage: {
      cli: {
        method: 'license_keys update',
        example:
          "dodo-payments-cli license-keys update \\\n  --bearer-token 'My Bearer Token' \\\n  --id lic_123",
      },
      csharp: {
        method: 'LicenseKeys.Update',
        example:
          'LicenseKeyUpdateParams parameters = new() { ID = "lic_123" };\n\nvar licenseKey = await client.LicenseKeys.Update(parameters);\n\nConsole.WriteLine(licenseKey);',
      },
      go: {
        method: 'client.LicenseKeys.Update',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/dodopayments/dodopayments-go"\n\t"github.com/dodopayments/dodopayments-go/option"\n)\n\nfunc main() {\n\tclient := dodopayments.NewClient(\n\t\toption.WithBearerToken("My Bearer Token"),\n\t)\n\tlicenseKey, err := client.LicenseKeys.Update(\n\t\tcontext.TODO(),\n\t\t"lic_123",\n\t\tdodopayments.LicenseKeyUpdateParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", licenseKey.ID)\n}\n',
      },
      http: {
        example:
          "curl https://live.dodopayments.com/license_keys/$ID \\\n    -X PATCH \\\n    -H 'Content-Type: application/json' \\\n    -H \"Authorization: Bearer $DODO_PAYMENTS_API_KEY\" \\\n    -d '{}'",
      },
      java: {
        method: 'licenseKeys().update',
        example:
          'package com.dodopayments.api.example;\n\nimport com.dodopayments.api.client.DodoPaymentsClient;\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient;\nimport com.dodopayments.api.models.licensekeys.LicenseKey;\nimport com.dodopayments.api.models.licensekeys.LicenseKeyUpdateParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        DodoPaymentsClient client = DodoPaymentsOkHttpClient.fromEnv();\n\n        LicenseKey licenseKey = client.licenseKeys().update("lic_123");\n    }\n}',
      },
      kotlin: {
        method: 'licenseKeys().update',
        example:
          'package com.dodopayments.api.example\n\nimport com.dodopayments.api.client.DodoPaymentsClient\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient\nimport com.dodopayments.api.models.licensekeys.LicenseKey\nimport com.dodopayments.api.models.licensekeys.LicenseKeyUpdateParams\n\nfun main() {\n    val client: DodoPaymentsClient = DodoPaymentsOkHttpClient.fromEnv()\n\n    val licenseKey: LicenseKey = client.licenseKeys().update("lic_123")\n}',
      },
      php: {
        method: 'licenseKeys->update',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(bearerToken: 'My Bearer Token', environment: 'test_mode');\n\n$licenseKey = $client->licenseKeys->update(\n  'lic_123',\n  activationsLimit: 0,\n  disabled: true,\n  expiresAt: new \\DateTimeImmutable('2019-12-27T18:11:19.117Z'),\n);\n\nvar_dump($licenseKey);",
      },
      python: {
        method: 'license_keys.update',
        example:
          'import os\nfrom dodopayments import DodoPayments\n\nclient = DodoPayments(\n    bearer_token=os.environ.get("DODO_PAYMENTS_API_KEY"),  # This is the default and can be omitted\n)\nlicense_key = client.license_keys.update(\n    id="lic_123",\n)\nprint(license_key.id)',
      },
      ruby: {
        method: 'license_keys.update',
        example:
          'require "dodopayments"\n\ndodo_payments = Dodopayments::Client.new(\n  bearer_token: "My Bearer Token",\n  environment: "test_mode" # defaults to "live_mode"\n)\n\nlicense_key = dodo_payments.license_keys.update("lic_123")\n\nputs(license_key)',
      },
      typescript: {
        method: 'client.licenseKeys.update',
        example:
          "import DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments({\n  bearerToken: process.env['DODO_PAYMENTS_API_KEY'], // This is the default and can be omitted\n});\n\nconst licenseKey = await client.licenseKeys.update('lic_123');\n\nconsole.log(licenseKey.id);",
      },
    },
  },
  {
    name: 'create',
    endpoint: '/license_keys',
    httpMethod: 'post',
    summary: '',
    description: '',
    stainlessPath: '(resource) license_keys > (method) create',
    qualified: 'client.licenseKeys.create',
    params: [
      'customer_id: string;',
      'key: string;',
      'product_id: string;',
      'activations_limit?: number;',
      'expires_at?: string;',
    ],
    response:
      "{ id: string; business_id: string; created_at: string; customer_id: string; instances_count: number; key: string; product_id: string; source: 'auto' | 'import'; status: 'active' | 'expired' | 'disabled'; activations_limit?: number; expires_at?: string; payment_id?: string; subscription_id?: string; }",
    markdown:
      "## create\n\n`client.licenseKeys.create(customer_id: string, key: string, product_id: string, activations_limit?: number, expires_at?: string): { id: string; business_id: string; created_at: string; customer_id: string; instances_count: number; key: string; product_id: string; source: 'auto' | 'import'; status: license_key_status; activations_limit?: number; expires_at?: string; payment_id?: string; subscription_id?: string; }`\n\n**post** `/license_keys`\n\n### Parameters\n\n- `customer_id: string`\n  The customer this license key belongs to.\n\n- `key: string`\n  The license key string to import.\n\n- `product_id: string`\n  The product this license key is for.\n\n- `activations_limit?: number`\n  Maximum number of activations allowed. Null means unlimited.\n\n- `expires_at?: string`\n  Expiration timestamp. Null means the key never expires.\n\n### Returns\n\n- `{ id: string; business_id: string; created_at: string; customer_id: string; instances_count: number; key: string; product_id: string; source: 'auto' | 'import'; status: 'active' | 'expired' | 'disabled'; activations_limit?: number; expires_at?: string; payment_id?: string; subscription_id?: string; }`\n\n  - `id: string`\n  - `business_id: string`\n  - `created_at: string`\n  - `customer_id: string`\n  - `instances_count: number`\n  - `key: string`\n  - `product_id: string`\n  - `source: 'auto' | 'import'`\n  - `status: 'active' | 'expired' | 'disabled'`\n  - `activations_limit?: number`\n  - `expires_at?: string`\n  - `payment_id?: string`\n  - `subscription_id?: string`\n\n### Example\n\n```typescript\nimport DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments();\n\nconst licenseKey = await client.licenseKeys.create({\n  customer_id: 'customer_id',\n  key: 'key',\n  product_id: 'product_id',\n});\n\nconsole.log(licenseKey);\n```",
    perLanguage: {
      cli: {
        method: 'license_keys create',
        example:
          "dodo-payments-cli license-keys create \\\n  --bearer-token 'My Bearer Token' \\\n  --customer-id customer_id \\\n  --key key \\\n  --product-id product_id",
      },
      csharp: {
        method: 'LicenseKeys.Create',
        example:
          'LicenseKeyCreateParams parameters = new()\n{\n    CustomerID = "customer_id",\n    Key = "key",\n    ProductID = "product_id",\n};\n\nvar licenseKey = await client.LicenseKeys.Create(parameters);\n\nConsole.WriteLine(licenseKey);',
      },
      go: {
        method: 'client.LicenseKeys.New',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/dodopayments/dodopayments-go"\n\t"github.com/dodopayments/dodopayments-go/option"\n)\n\nfunc main() {\n\tclient := dodopayments.NewClient(\n\t\toption.WithBearerToken("My Bearer Token"),\n\t)\n\tlicenseKey, err := client.LicenseKeys.New(context.TODO(), dodopayments.LicenseKeyNewParams{\n\t\tCustomerID: dodopayments.F("customer_id"),\n\t\tKey:        dodopayments.F("key"),\n\t\tProductID:  dodopayments.F("product_id"),\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", licenseKey.ID)\n}\n',
      },
      http: {
        example:
          'curl https://live.dodopayments.com/license_keys \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $DODO_PAYMENTS_API_KEY" \\\n    -d \'{\n          "customer_id": "customer_id",\n          "key": "key",\n          "product_id": "product_id"\n        }\'',
      },
      java: {
        method: 'licenseKeys().create',
        example:
          'package com.dodopayments.api.example;\n\nimport com.dodopayments.api.client.DodoPaymentsClient;\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient;\nimport com.dodopayments.api.models.licensekeys.LicenseKey;\nimport com.dodopayments.api.models.licensekeys.LicenseKeyCreateParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        DodoPaymentsClient client = DodoPaymentsOkHttpClient.fromEnv();\n\n        LicenseKeyCreateParams params = LicenseKeyCreateParams.builder()\n            .customerId("customer_id")\n            .key("key")\n            .productId("product_id")\n            .build();\n        LicenseKey licenseKey = client.licenseKeys().create(params);\n    }\n}',
      },
      kotlin: {
        method: 'licenseKeys().create',
        example:
          'package com.dodopayments.api.example\n\nimport com.dodopayments.api.client.DodoPaymentsClient\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient\nimport com.dodopayments.api.models.licensekeys.LicenseKey\nimport com.dodopayments.api.models.licensekeys.LicenseKeyCreateParams\n\nfun main() {\n    val client: DodoPaymentsClient = DodoPaymentsOkHttpClient.fromEnv()\n\n    val params: LicenseKeyCreateParams = LicenseKeyCreateParams.builder()\n        .customerId("customer_id")\n        .key("key")\n        .productId("product_id")\n        .build()\n    val licenseKey: LicenseKey = client.licenseKeys().create(params)\n}',
      },
      php: {
        method: 'licenseKeys->create',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(bearerToken: 'My Bearer Token', environment: 'test_mode');\n\n$licenseKey = $client->licenseKeys->create(\n  customerID: 'customer_id',\n  key: 'key',\n  productID: 'product_id',\n  activationsLimit: 0,\n  expiresAt: new \\DateTimeImmutable('2019-12-27T18:11:19.117Z'),\n);\n\nvar_dump($licenseKey);",
      },
      python: {
        method: 'license_keys.create',
        example:
          'import os\nfrom dodopayments import DodoPayments\n\nclient = DodoPayments(\n    bearer_token=os.environ.get("DODO_PAYMENTS_API_KEY"),  # This is the default and can be omitted\n)\nlicense_key = client.license_keys.create(\n    customer_id="customer_id",\n    key="key",\n    product_id="product_id",\n)\nprint(license_key.id)',
      },
      ruby: {
        method: 'license_keys.create',
        example:
          'require "dodopayments"\n\ndodo_payments = Dodopayments::Client.new(\n  bearer_token: "My Bearer Token",\n  environment: "test_mode" # defaults to "live_mode"\n)\n\nlicense_key = dodo_payments.license_keys.create(customer_id: "customer_id", key: "key", product_id: "product_id")\n\nputs(license_key)',
      },
      typescript: {
        method: 'client.licenseKeys.create',
        example:
          "import DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments({\n  bearerToken: process.env['DODO_PAYMENTS_API_KEY'], // This is the default and can be omitted\n});\n\nconst licenseKey = await client.licenseKeys.create({\n  customer_id: 'customer_id',\n  key: 'key',\n  product_id: 'product_id',\n});\n\nconsole.log(licenseKey.id);",
      },
    },
  },
  {
    name: 'list',
    endpoint: '/license_key_instances',
    httpMethod: 'get',
    summary: '',
    description: '',
    stainlessPath: '(resource) license_key_instances > (method) list',
    qualified: 'client.licenseKeyInstances.list',
    params: ['license_key_id?: string;', 'page_number?: number;', 'page_size?: number;'],
    response:
      '{ id: string; business_id: string; created_at: string; license_key_id: string; name: string; }',
    markdown:
      "## list\n\n`client.licenseKeyInstances.list(license_key_id?: string, page_number?: number, page_size?: number): { id: string; business_id: string; created_at: string; license_key_id: string; name: string; }`\n\n**get** `/license_key_instances`\n\n### Parameters\n\n- `license_key_id?: string`\n  Filter by license key ID\n\n- `page_number?: number`\n  Page number default is 0\n\n- `page_size?: number`\n  Page size default is 10 max is 100\n\n### Returns\n\n- `{ id: string; business_id: string; created_at: string; license_key_id: string; name: string; }`\n\n  - `id: string`\n  - `business_id: string`\n  - `created_at: string`\n  - `license_key_id: string`\n  - `name: string`\n\n### Example\n\n```typescript\nimport DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments();\n\n// Automatically fetches more pages as needed.\nfor await (const licenseKeyInstance of client.licenseKeyInstances.list()) {\n  console.log(licenseKeyInstance);\n}\n```",
    perLanguage: {
      cli: {
        method: 'license_key_instances list',
        example: "dodo-payments-cli license-key-instances list \\\n  --bearer-token 'My Bearer Token'",
      },
      csharp: {
        method: 'LicenseKeyInstances.List',
        example:
          'LicenseKeyInstanceListParams parameters = new();\n\nvar page = await client.LicenseKeyInstances.List(parameters);\nawait foreach (var item in page.Paginate())\n{\n    Console.WriteLine(item);\n}',
      },
      go: {
        method: 'client.LicenseKeyInstances.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/dodopayments/dodopayments-go"\n\t"github.com/dodopayments/dodopayments-go/option"\n)\n\nfunc main() {\n\tclient := dodopayments.NewClient(\n\t\toption.WithBearerToken("My Bearer Token"),\n\t)\n\tpage, err := client.LicenseKeyInstances.List(context.TODO(), dodopayments.LicenseKeyInstanceListParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", page)\n}\n',
      },
      http: {
        example:
          'curl https://live.dodopayments.com/license_key_instances \\\n    -H "Authorization: Bearer $DODO_PAYMENTS_API_KEY"',
      },
      java: {
        method: 'licenseKeyInstances().list',
        example:
          'package com.dodopayments.api.example;\n\nimport com.dodopayments.api.client.DodoPaymentsClient;\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient;\nimport com.dodopayments.api.models.licensekeyinstances.LicenseKeyInstanceListPage;\nimport com.dodopayments.api.models.licensekeyinstances.LicenseKeyInstanceListParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        DodoPaymentsClient client = DodoPaymentsOkHttpClient.fromEnv();\n\n        LicenseKeyInstanceListPage page = client.licenseKeyInstances().list();\n    }\n}',
      },
      kotlin: {
        method: 'licenseKeyInstances().list',
        example:
          'package com.dodopayments.api.example\n\nimport com.dodopayments.api.client.DodoPaymentsClient\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient\nimport com.dodopayments.api.models.licensekeyinstances.LicenseKeyInstanceListPage\nimport com.dodopayments.api.models.licensekeyinstances.LicenseKeyInstanceListParams\n\nfun main() {\n    val client: DodoPaymentsClient = DodoPaymentsOkHttpClient.fromEnv()\n\n    val page: LicenseKeyInstanceListPage = client.licenseKeyInstances().list()\n}',
      },
      php: {
        method: 'licenseKeyInstances->list',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(bearerToken: 'My Bearer Token', environment: 'test_mode');\n\n$page = $client->licenseKeyInstances->list(\n  licenseKeyID: 'license_key_id', pageNumber: 0, pageSize: 0\n);\n\nvar_dump($page);",
      },
      python: {
        method: 'license_key_instances.list',
        example:
          'import os\nfrom dodopayments import DodoPayments\n\nclient = DodoPayments(\n    bearer_token=os.environ.get("DODO_PAYMENTS_API_KEY"),  # This is the default and can be omitted\n)\npage = client.license_key_instances.list()\npage = page.items[0]\nprint(page.id)',
      },
      ruby: {
        method: 'license_key_instances.list',
        example:
          'require "dodopayments"\n\ndodo_payments = Dodopayments::Client.new(\n  bearer_token: "My Bearer Token",\n  environment: "test_mode" # defaults to "live_mode"\n)\n\npage = dodo_payments.license_key_instances.list\n\nputs(page)',
      },
      typescript: {
        method: 'client.licenseKeyInstances.list',
        example:
          "import DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments({\n  bearerToken: process.env['DODO_PAYMENTS_API_KEY'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const licenseKeyInstance of client.licenseKeyInstances.list()) {\n  console.log(licenseKeyInstance.id);\n}",
      },
    },
  },
  {
    name: 'retrieve',
    endpoint: '/license_key_instances/{id}',
    httpMethod: 'get',
    summary: '',
    description: '',
    stainlessPath: '(resource) license_key_instances > (method) retrieve',
    qualified: 'client.licenseKeyInstances.retrieve',
    params: ['id: string;'],
    response:
      '{ id: string; business_id: string; created_at: string; license_key_id: string; name: string; }',
    markdown:
      "## retrieve\n\n`client.licenseKeyInstances.retrieve(id: string): { id: string; business_id: string; created_at: string; license_key_id: string; name: string; }`\n\n**get** `/license_key_instances/{id}`\n\n### Parameters\n\n- `id: string`\n\n### Returns\n\n- `{ id: string; business_id: string; created_at: string; license_key_id: string; name: string; }`\n\n  - `id: string`\n  - `business_id: string`\n  - `created_at: string`\n  - `license_key_id: string`\n  - `name: string`\n\n### Example\n\n```typescript\nimport DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments();\n\nconst licenseKeyInstance = await client.licenseKeyInstances.retrieve('lki_123');\n\nconsole.log(licenseKeyInstance);\n```",
    perLanguage: {
      cli: {
        method: 'license_key_instances retrieve',
        example:
          "dodo-payments-cli license-key-instances retrieve \\\n  --bearer-token 'My Bearer Token' \\\n  --id lki_123",
      },
      csharp: {
        method: 'LicenseKeyInstances.Retrieve',
        example:
          'LicenseKeyInstanceRetrieveParams parameters = new() { ID = "lki_123" };\n\nvar licenseKeyInstance = await client.LicenseKeyInstances.Retrieve(parameters);\n\nConsole.WriteLine(licenseKeyInstance);',
      },
      go: {
        method: 'client.LicenseKeyInstances.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/dodopayments/dodopayments-go"\n\t"github.com/dodopayments/dodopayments-go/option"\n)\n\nfunc main() {\n\tclient := dodopayments.NewClient(\n\t\toption.WithBearerToken("My Bearer Token"),\n\t)\n\tlicenseKeyInstance, err := client.LicenseKeyInstances.Get(context.TODO(), "lki_123")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", licenseKeyInstance.ID)\n}\n',
      },
      http: {
        example:
          'curl https://live.dodopayments.com/license_key_instances/$ID \\\n    -H "Authorization: Bearer $DODO_PAYMENTS_API_KEY"',
      },
      java: {
        method: 'licenseKeyInstances().retrieve',
        example:
          'package com.dodopayments.api.example;\n\nimport com.dodopayments.api.client.DodoPaymentsClient;\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient;\nimport com.dodopayments.api.models.licensekeyinstances.LicenseKeyInstance;\nimport com.dodopayments.api.models.licensekeyinstances.LicenseKeyInstanceRetrieveParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        DodoPaymentsClient client = DodoPaymentsOkHttpClient.fromEnv();\n\n        LicenseKeyInstance licenseKeyInstance = client.licenseKeyInstances().retrieve("lki_123");\n    }\n}',
      },
      kotlin: {
        method: 'licenseKeyInstances().retrieve',
        example:
          'package com.dodopayments.api.example\n\nimport com.dodopayments.api.client.DodoPaymentsClient\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient\nimport com.dodopayments.api.models.licensekeyinstances.LicenseKeyInstance\nimport com.dodopayments.api.models.licensekeyinstances.LicenseKeyInstanceRetrieveParams\n\nfun main() {\n    val client: DodoPaymentsClient = DodoPaymentsOkHttpClient.fromEnv()\n\n    val licenseKeyInstance: LicenseKeyInstance = client.licenseKeyInstances().retrieve("lki_123")\n}',
      },
      php: {
        method: 'licenseKeyInstances->retrieve',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(bearerToken: 'My Bearer Token', environment: 'test_mode');\n\n$licenseKeyInstance = $client->licenseKeyInstances->retrieve('lki_123');\n\nvar_dump($licenseKeyInstance);",
      },
      python: {
        method: 'license_key_instances.retrieve',
        example:
          'import os\nfrom dodopayments import DodoPayments\n\nclient = DodoPayments(\n    bearer_token=os.environ.get("DODO_PAYMENTS_API_KEY"),  # This is the default and can be omitted\n)\nlicense_key_instance = client.license_key_instances.retrieve(\n    "lki_123",\n)\nprint(license_key_instance.id)',
      },
      ruby: {
        method: 'license_key_instances.retrieve',
        example:
          'require "dodopayments"\n\ndodo_payments = Dodopayments::Client.new(\n  bearer_token: "My Bearer Token",\n  environment: "test_mode" # defaults to "live_mode"\n)\n\nlicense_key_instance = dodo_payments.license_key_instances.retrieve("lki_123")\n\nputs(license_key_instance)',
      },
      typescript: {
        method: 'client.licenseKeyInstances.retrieve',
        example:
          "import DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments({\n  bearerToken: process.env['DODO_PAYMENTS_API_KEY'], // This is the default and can be omitted\n});\n\nconst licenseKeyInstance = await client.licenseKeyInstances.retrieve('lki_123');\n\nconsole.log(licenseKeyInstance.id);",
      },
    },
  },
  {
    name: 'update',
    endpoint: '/license_key_instances/{id}',
    httpMethod: 'patch',
    summary: '',
    description: '',
    stainlessPath: '(resource) license_key_instances > (method) update',
    qualified: 'client.licenseKeyInstances.update',
    params: ['id: string;', 'name: string;'],
    response:
      '{ id: string; business_id: string; created_at: string; license_key_id: string; name: string; }',
    markdown:
      "## update\n\n`client.licenseKeyInstances.update(id: string, name: string): { id: string; business_id: string; created_at: string; license_key_id: string; name: string; }`\n\n**patch** `/license_key_instances/{id}`\n\n### Parameters\n\n- `id: string`\n\n- `name: string`\n\n### Returns\n\n- `{ id: string; business_id: string; created_at: string; license_key_id: string; name: string; }`\n\n  - `id: string`\n  - `business_id: string`\n  - `created_at: string`\n  - `license_key_id: string`\n  - `name: string`\n\n### Example\n\n```typescript\nimport DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments();\n\nconst licenseKeyInstance = await client.licenseKeyInstances.update('lki_123', { name: 'name' });\n\nconsole.log(licenseKeyInstance);\n```",
    perLanguage: {
      cli: {
        method: 'license_key_instances update',
        example:
          "dodo-payments-cli license-key-instances update \\\n  --bearer-token 'My Bearer Token' \\\n  --id lki_123 \\\n  --name name",
      },
      csharp: {
        method: 'LicenseKeyInstances.Update',
        example:
          'LicenseKeyInstanceUpdateParams parameters = new()\n{\n    ID = "lki_123",\n    Name = "name",\n};\n\nvar licenseKeyInstance = await client.LicenseKeyInstances.Update(parameters);\n\nConsole.WriteLine(licenseKeyInstance);',
      },
      go: {
        method: 'client.LicenseKeyInstances.Update',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/dodopayments/dodopayments-go"\n\t"github.com/dodopayments/dodopayments-go/option"\n)\n\nfunc main() {\n\tclient := dodopayments.NewClient(\n\t\toption.WithBearerToken("My Bearer Token"),\n\t)\n\tlicenseKeyInstance, err := client.LicenseKeyInstances.Update(\n\t\tcontext.TODO(),\n\t\t"lki_123",\n\t\tdodopayments.LicenseKeyInstanceUpdateParams{\n\t\t\tName: dodopayments.F("name"),\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", licenseKeyInstance.ID)\n}\n',
      },
      http: {
        example:
          'curl https://live.dodopayments.com/license_key_instances/$ID \\\n    -X PATCH \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $DODO_PAYMENTS_API_KEY" \\\n    -d \'{\n          "name": "name"\n        }\'',
      },
      java: {
        method: 'licenseKeyInstances().update',
        example:
          'package com.dodopayments.api.example;\n\nimport com.dodopayments.api.client.DodoPaymentsClient;\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient;\nimport com.dodopayments.api.models.licensekeyinstances.LicenseKeyInstance;\nimport com.dodopayments.api.models.licensekeyinstances.LicenseKeyInstanceUpdateParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        DodoPaymentsClient client = DodoPaymentsOkHttpClient.fromEnv();\n\n        LicenseKeyInstanceUpdateParams params = LicenseKeyInstanceUpdateParams.builder()\n            .id("lki_123")\n            .name("name")\n            .build();\n        LicenseKeyInstance licenseKeyInstance = client.licenseKeyInstances().update(params);\n    }\n}',
      },
      kotlin: {
        method: 'licenseKeyInstances().update',
        example:
          'package com.dodopayments.api.example\n\nimport com.dodopayments.api.client.DodoPaymentsClient\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient\nimport com.dodopayments.api.models.licensekeyinstances.LicenseKeyInstance\nimport com.dodopayments.api.models.licensekeyinstances.LicenseKeyInstanceUpdateParams\n\nfun main() {\n    val client: DodoPaymentsClient = DodoPaymentsOkHttpClient.fromEnv()\n\n    val params: LicenseKeyInstanceUpdateParams = LicenseKeyInstanceUpdateParams.builder()\n        .id("lki_123")\n        .name("name")\n        .build()\n    val licenseKeyInstance: LicenseKeyInstance = client.licenseKeyInstances().update(params)\n}',
      },
      php: {
        method: 'licenseKeyInstances->update',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(bearerToken: 'My Bearer Token', environment: 'test_mode');\n\n$licenseKeyInstance = $client->licenseKeyInstances->update(\n  'lki_123', name: 'name'\n);\n\nvar_dump($licenseKeyInstance);",
      },
      python: {
        method: 'license_key_instances.update',
        example:
          'import os\nfrom dodopayments import DodoPayments\n\nclient = DodoPayments(\n    bearer_token=os.environ.get("DODO_PAYMENTS_API_KEY"),  # This is the default and can be omitted\n)\nlicense_key_instance = client.license_key_instances.update(\n    id="lki_123",\n    name="name",\n)\nprint(license_key_instance.id)',
      },
      ruby: {
        method: 'license_key_instances.update',
        example:
          'require "dodopayments"\n\ndodo_payments = Dodopayments::Client.new(\n  bearer_token: "My Bearer Token",\n  environment: "test_mode" # defaults to "live_mode"\n)\n\nlicense_key_instance = dodo_payments.license_key_instances.update("lki_123", name: "name")\n\nputs(license_key_instance)',
      },
      typescript: {
        method: 'client.licenseKeyInstances.update',
        example:
          "import DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments({\n  bearerToken: process.env['DODO_PAYMENTS_API_KEY'], // This is the default and can be omitted\n});\n\nconst licenseKeyInstance = await client.licenseKeyInstances.update('lki_123', { name: 'name' });\n\nconsole.log(licenseKeyInstance.id);",
      },
    },
  },
  {
    name: 'list',
    endpoint: '/customers',
    httpMethod: 'get',
    summary: '',
    description: '',
    stainlessPath: '(resource) customers > (method) list',
    qualified: 'client.customers.list',
    params: [
      'created_at_gte?: string;',
      'created_at_lte?: string;',
      'email?: string;',
      'name?: string;',
      'page_number?: number;',
      'page_size?: number;',
    ],
    response:
      '{ business_id: string; created_at: string; customer_id: string; email: string; name: string; metadata?: object; phone_number?: string; }',
    markdown:
      "## list\n\n`client.customers.list(created_at_gte?: string, created_at_lte?: string, email?: string, name?: string, page_number?: number, page_size?: number): { business_id: string; created_at: string; customer_id: string; email: string; name: string; metadata?: object; phone_number?: string; }`\n\n**get** `/customers`\n\n### Parameters\n\n- `created_at_gte?: string`\n  Filter customers created on or after this timestamp\n\n- `created_at_lte?: string`\n  Filter customers created on or before this timestamp\n\n- `email?: string`\n  Filter by customer email\n\n- `name?: string`\n  Filter by customer name (partial match, case-insensitive)\n\n- `page_number?: number`\n  Page number default is 0\n\n- `page_size?: number`\n  Page size default is 10 max is 100\n\n### Returns\n\n- `{ business_id: string; created_at: string; customer_id: string; email: string; name: string; metadata?: object; phone_number?: string; }`\n\n  - `business_id: string`\n  - `created_at: string`\n  - `customer_id: string`\n  - `email: string`\n  - `name: string`\n  - `metadata?: object`\n  - `phone_number?: string`\n\n### Example\n\n```typescript\nimport DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments();\n\n// Automatically fetches more pages as needed.\nfor await (const customer of client.customers.list()) {\n  console.log(customer);\n}\n```",
    perLanguage: {
      cli: {
        method: 'customers list',
        example: "dodo-payments-cli customers list \\\n  --bearer-token 'My Bearer Token'",
      },
      csharp: {
        method: 'Customers.List',
        example:
          'CustomerListParams parameters = new();\n\nvar page = await client.Customers.List(parameters);\nawait foreach (var item in page.Paginate())\n{\n    Console.WriteLine(item);\n}',
      },
      go: {
        method: 'client.Customers.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/dodopayments/dodopayments-go"\n\t"github.com/dodopayments/dodopayments-go/option"\n)\n\nfunc main() {\n\tclient := dodopayments.NewClient(\n\t\toption.WithBearerToken("My Bearer Token"),\n\t)\n\tpage, err := client.Customers.List(context.TODO(), dodopayments.CustomerListParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", page)\n}\n',
      },
      http: {
        example:
          'curl https://live.dodopayments.com/customers \\\n    -H "Authorization: Bearer $DODO_PAYMENTS_API_KEY"',
      },
      java: {
        method: 'customers().list',
        example:
          'package com.dodopayments.api.example;\n\nimport com.dodopayments.api.client.DodoPaymentsClient;\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient;\nimport com.dodopayments.api.models.customers.CustomerListPage;\nimport com.dodopayments.api.models.customers.CustomerListParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        DodoPaymentsClient client = DodoPaymentsOkHttpClient.fromEnv();\n\n        CustomerListPage page = client.customers().list();\n    }\n}',
      },
      kotlin: {
        method: 'customers().list',
        example:
          'package com.dodopayments.api.example\n\nimport com.dodopayments.api.client.DodoPaymentsClient\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient\nimport com.dodopayments.api.models.customers.CustomerListPage\nimport com.dodopayments.api.models.customers.CustomerListParams\n\nfun main() {\n    val client: DodoPaymentsClient = DodoPaymentsOkHttpClient.fromEnv()\n\n    val page: CustomerListPage = client.customers().list()\n}',
      },
      php: {
        method: 'customers->list',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(bearerToken: 'My Bearer Token', environment: 'test_mode');\n\n$page = $client->customers->list(\n  createdAtGte: new \\DateTimeImmutable('2019-12-27T18:11:19.117Z'),\n  createdAtLte: new \\DateTimeImmutable('2019-12-27T18:11:19.117Z'),\n  email: 'email',\n  name: 'name',\n  pageNumber: 0,\n  pageSize: 0,\n);\n\nvar_dump($page);",
      },
      python: {
        method: 'customers.list',
        example:
          'import os\nfrom dodopayments import DodoPayments\n\nclient = DodoPayments(\n    bearer_token=os.environ.get("DODO_PAYMENTS_API_KEY"),  # This is the default and can be omitted\n)\npage = client.customers.list()\npage = page.items[0]\nprint(page.business_id)',
      },
      ruby: {
        method: 'customers.list',
        example:
          'require "dodopayments"\n\ndodo_payments = Dodopayments::Client.new(\n  bearer_token: "My Bearer Token",\n  environment: "test_mode" # defaults to "live_mode"\n)\n\npage = dodo_payments.customers.list\n\nputs(page)',
      },
      typescript: {
        method: 'client.customers.list',
        example:
          "import DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments({\n  bearerToken: process.env['DODO_PAYMENTS_API_KEY'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const customer of client.customers.list()) {\n  console.log(customer.business_id);\n}",
      },
    },
  },
  {
    name: 'retrieve',
    endpoint: '/customers/{customer_id}',
    httpMethod: 'get',
    summary: '',
    description: '',
    stainlessPath: '(resource) customers > (method) retrieve',
    qualified: 'client.customers.retrieve',
    params: ['customer_id: string;'],
    response:
      '{ business_id: string; created_at: string; customer_id: string; email: string; name: string; metadata?: object; phone_number?: string; }',
    markdown:
      "## retrieve\n\n`client.customers.retrieve(customer_id: string): { business_id: string; created_at: string; customer_id: string; email: string; name: string; metadata?: object; phone_number?: string; }`\n\n**get** `/customers/{customer_id}`\n\n### Parameters\n\n- `customer_id: string`\n\n### Returns\n\n- `{ business_id: string; created_at: string; customer_id: string; email: string; name: string; metadata?: object; phone_number?: string; }`\n\n  - `business_id: string`\n  - `created_at: string`\n  - `customer_id: string`\n  - `email: string`\n  - `name: string`\n  - `metadata?: object`\n  - `phone_number?: string`\n\n### Example\n\n```typescript\nimport DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments();\n\nconst customer = await client.customers.retrieve('customer_id');\n\nconsole.log(customer);\n```",
    perLanguage: {
      cli: {
        method: 'customers retrieve',
        example:
          "dodo-payments-cli customers retrieve \\\n  --bearer-token 'My Bearer Token' \\\n  --customer-id customer_id",
      },
      csharp: {
        method: 'Customers.Retrieve',
        example:
          'CustomerRetrieveParams parameters = new() { CustomerID = "customer_id" };\n\nvar customer = await client.Customers.Retrieve(parameters);\n\nConsole.WriteLine(customer);',
      },
      go: {
        method: 'client.Customers.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/dodopayments/dodopayments-go"\n\t"github.com/dodopayments/dodopayments-go/option"\n)\n\nfunc main() {\n\tclient := dodopayments.NewClient(\n\t\toption.WithBearerToken("My Bearer Token"),\n\t)\n\tcustomer, err := client.Customers.Get(context.TODO(), "customer_id")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", customer.BusinessID)\n}\n',
      },
      http: {
        example:
          'curl https://live.dodopayments.com/customers/$CUSTOMER_ID \\\n    -H "Authorization: Bearer $DODO_PAYMENTS_API_KEY"',
      },
      java: {
        method: 'customers().retrieve',
        example:
          'package com.dodopayments.api.example;\n\nimport com.dodopayments.api.client.DodoPaymentsClient;\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient;\nimport com.dodopayments.api.models.customers.Customer;\nimport com.dodopayments.api.models.customers.CustomerRetrieveParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        DodoPaymentsClient client = DodoPaymentsOkHttpClient.fromEnv();\n\n        Customer customer = client.customers().retrieve("customer_id");\n    }\n}',
      },
      kotlin: {
        method: 'customers().retrieve',
        example:
          'package com.dodopayments.api.example\n\nimport com.dodopayments.api.client.DodoPaymentsClient\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient\nimport com.dodopayments.api.models.customers.Customer\nimport com.dodopayments.api.models.customers.CustomerRetrieveParams\n\nfun main() {\n    val client: DodoPaymentsClient = DodoPaymentsOkHttpClient.fromEnv()\n\n    val customer: Customer = client.customers().retrieve("customer_id")\n}',
      },
      php: {
        method: 'customers->retrieve',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(bearerToken: 'My Bearer Token', environment: 'test_mode');\n\n$customer = $client->customers->retrieve('customer_id');\n\nvar_dump($customer);",
      },
      python: {
        method: 'customers.retrieve',
        example:
          'import os\nfrom dodopayments import DodoPayments\n\nclient = DodoPayments(\n    bearer_token=os.environ.get("DODO_PAYMENTS_API_KEY"),  # This is the default and can be omitted\n)\ncustomer = client.customers.retrieve(\n    "customer_id",\n)\nprint(customer.business_id)',
      },
      ruby: {
        method: 'customers.retrieve',
        example:
          'require "dodopayments"\n\ndodo_payments = Dodopayments::Client.new(\n  bearer_token: "My Bearer Token",\n  environment: "test_mode" # defaults to "live_mode"\n)\n\ncustomer = dodo_payments.customers.retrieve("customer_id")\n\nputs(customer)',
      },
      typescript: {
        method: 'client.customers.retrieve',
        example:
          "import DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments({\n  bearerToken: process.env['DODO_PAYMENTS_API_KEY'], // This is the default and can be omitted\n});\n\nconst customer = await client.customers.retrieve('customer_id');\n\nconsole.log(customer.business_id);",
      },
    },
  },
  {
    name: 'create',
    endpoint: '/customers',
    httpMethod: 'post',
    summary: '',
    description: '',
    stainlessPath: '(resource) customers > (method) create',
    qualified: 'client.customers.create',
    params: ['email: string;', 'name: string;', 'metadata?: object;', 'phone_number?: string;'],
    response:
      '{ business_id: string; created_at: string; customer_id: string; email: string; name: string; metadata?: object; phone_number?: string; }',
    markdown:
      "## create\n\n`client.customers.create(email: string, name: string, metadata?: object, phone_number?: string): { business_id: string; created_at: string; customer_id: string; email: string; name: string; metadata?: object; phone_number?: string; }`\n\n**post** `/customers`\n\n### Parameters\n\n- `email: string`\n\n- `name: string`\n\n- `metadata?: object`\n  Additional metadata for the customer\n\n- `phone_number?: string`\n\n### Returns\n\n- `{ business_id: string; created_at: string; customer_id: string; email: string; name: string; metadata?: object; phone_number?: string; }`\n\n  - `business_id: string`\n  - `created_at: string`\n  - `customer_id: string`\n  - `email: string`\n  - `name: string`\n  - `metadata?: object`\n  - `phone_number?: string`\n\n### Example\n\n```typescript\nimport DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments();\n\nconst customer = await client.customers.create({ email: 'email', name: 'name' });\n\nconsole.log(customer);\n```",
    perLanguage: {
      cli: {
        method: 'customers create',
        example:
          "dodo-payments-cli customers create \\\n  --bearer-token 'My Bearer Token' \\\n  --email email \\\n  --name name",
      },
      csharp: {
        method: 'Customers.Create',
        example:
          'CustomerCreateParams parameters = new()\n{\n    Email = "email",\n    Name = "name",\n};\n\nvar customer = await client.Customers.Create(parameters);\n\nConsole.WriteLine(customer);',
      },
      go: {
        method: 'client.Customers.New',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/dodopayments/dodopayments-go"\n\t"github.com/dodopayments/dodopayments-go/option"\n)\n\nfunc main() {\n\tclient := dodopayments.NewClient(\n\t\toption.WithBearerToken("My Bearer Token"),\n\t)\n\tcustomer, err := client.Customers.New(context.TODO(), dodopayments.CustomerNewParams{\n\t\tEmail: dodopayments.F("email"),\n\t\tName:  dodopayments.F("name"),\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", customer.BusinessID)\n}\n',
      },
      http: {
        example:
          'curl https://live.dodopayments.com/customers \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $DODO_PAYMENTS_API_KEY" \\\n    -d \'{\n          "email": "email",\n          "name": "name"\n        }\'',
      },
      java: {
        method: 'customers().create',
        example:
          'package com.dodopayments.api.example;\n\nimport com.dodopayments.api.client.DodoPaymentsClient;\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient;\nimport com.dodopayments.api.models.customers.Customer;\nimport com.dodopayments.api.models.customers.CustomerCreateParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        DodoPaymentsClient client = DodoPaymentsOkHttpClient.fromEnv();\n\n        CustomerCreateParams params = CustomerCreateParams.builder()\n            .email("email")\n            .name("name")\n            .build();\n        Customer customer = client.customers().create(params);\n    }\n}',
      },
      kotlin: {
        method: 'customers().create',
        example:
          'package com.dodopayments.api.example\n\nimport com.dodopayments.api.client.DodoPaymentsClient\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient\nimport com.dodopayments.api.models.customers.Customer\nimport com.dodopayments.api.models.customers.CustomerCreateParams\n\nfun main() {\n    val client: DodoPaymentsClient = DodoPaymentsOkHttpClient.fromEnv()\n\n    val params: CustomerCreateParams = CustomerCreateParams.builder()\n        .email("email")\n        .name("name")\n        .build()\n    val customer: Customer = client.customers().create(params)\n}',
      },
      php: {
        method: 'customers->create',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(bearerToken: 'My Bearer Token', environment: 'test_mode');\n\n$customer = $client->customers->create(\n  email: 'email',\n  name: 'name',\n  metadata: ['foo' => 'string'],\n  phoneNumber: 'phone_number',\n);\n\nvar_dump($customer);",
      },
      python: {
        method: 'customers.create',
        example:
          'import os\nfrom dodopayments import DodoPayments\n\nclient = DodoPayments(\n    bearer_token=os.environ.get("DODO_PAYMENTS_API_KEY"),  # This is the default and can be omitted\n)\ncustomer = client.customers.create(\n    email="email",\n    name="name",\n)\nprint(customer.business_id)',
      },
      ruby: {
        method: 'customers.create',
        example:
          'require "dodopayments"\n\ndodo_payments = Dodopayments::Client.new(\n  bearer_token: "My Bearer Token",\n  environment: "test_mode" # defaults to "live_mode"\n)\n\ncustomer = dodo_payments.customers.create(email: "email", name: "name")\n\nputs(customer)',
      },
      typescript: {
        method: 'client.customers.create',
        example:
          "import DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments({\n  bearerToken: process.env['DODO_PAYMENTS_API_KEY'], // This is the default and can be omitted\n});\n\nconst customer = await client.customers.create({ email: 'email', name: 'name' });\n\nconsole.log(customer.business_id);",
      },
    },
  },
  {
    name: 'update',
    endpoint: '/customers/{customer_id}',
    httpMethod: 'patch',
    summary: '',
    description: '',
    stainlessPath: '(resource) customers > (method) update',
    qualified: 'client.customers.update',
    params: [
      'customer_id: string;',
      'email?: string;',
      'metadata?: object;',
      'name?: string;',
      'phone_number?: string;',
    ],
    response:
      '{ business_id: string; created_at: string; customer_id: string; email: string; name: string; metadata?: object; phone_number?: string; }',
    markdown:
      "## update\n\n`client.customers.update(customer_id: string, email?: string, metadata?: object, name?: string, phone_number?: string): { business_id: string; created_at: string; customer_id: string; email: string; name: string; metadata?: object; phone_number?: string; }`\n\n**patch** `/customers/{customer_id}`\n\n### Parameters\n\n- `customer_id: string`\n\n- `email?: string`\n\n- `metadata?: object`\n  Additional metadata for the customer\n\n- `name?: string`\n\n- `phone_number?: string`\n\n### Returns\n\n- `{ business_id: string; created_at: string; customer_id: string; email: string; name: string; metadata?: object; phone_number?: string; }`\n\n  - `business_id: string`\n  - `created_at: string`\n  - `customer_id: string`\n  - `email: string`\n  - `name: string`\n  - `metadata?: object`\n  - `phone_number?: string`\n\n### Example\n\n```typescript\nimport DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments();\n\nconst customer = await client.customers.update('customer_id');\n\nconsole.log(customer);\n```",
    perLanguage: {
      cli: {
        method: 'customers update',
        example:
          "dodo-payments-cli customers update \\\n  --bearer-token 'My Bearer Token' \\\n  --customer-id customer_id",
      },
      csharp: {
        method: 'Customers.Update',
        example:
          'CustomerUpdateParams parameters = new() { CustomerID = "customer_id" };\n\nvar customer = await client.Customers.Update(parameters);\n\nConsole.WriteLine(customer);',
      },
      go: {
        method: 'client.Customers.Update',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/dodopayments/dodopayments-go"\n\t"github.com/dodopayments/dodopayments-go/option"\n)\n\nfunc main() {\n\tclient := dodopayments.NewClient(\n\t\toption.WithBearerToken("My Bearer Token"),\n\t)\n\tcustomer, err := client.Customers.Update(\n\t\tcontext.TODO(),\n\t\t"customer_id",\n\t\tdodopayments.CustomerUpdateParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", customer.BusinessID)\n}\n',
      },
      http: {
        example:
          "curl https://live.dodopayments.com/customers/$CUSTOMER_ID \\\n    -X PATCH \\\n    -H 'Content-Type: application/json' \\\n    -H \"Authorization: Bearer $DODO_PAYMENTS_API_KEY\" \\\n    -d '{}'",
      },
      java: {
        method: 'customers().update',
        example:
          'package com.dodopayments.api.example;\n\nimport com.dodopayments.api.client.DodoPaymentsClient;\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient;\nimport com.dodopayments.api.models.customers.Customer;\nimport com.dodopayments.api.models.customers.CustomerUpdateParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        DodoPaymentsClient client = DodoPaymentsOkHttpClient.fromEnv();\n\n        Customer customer = client.customers().update("customer_id");\n    }\n}',
      },
      kotlin: {
        method: 'customers().update',
        example:
          'package com.dodopayments.api.example\n\nimport com.dodopayments.api.client.DodoPaymentsClient\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient\nimport com.dodopayments.api.models.customers.Customer\nimport com.dodopayments.api.models.customers.CustomerUpdateParams\n\nfun main() {\n    val client: DodoPaymentsClient = DodoPaymentsOkHttpClient.fromEnv()\n\n    val customer: Customer = client.customers().update("customer_id")\n}',
      },
      php: {
        method: 'customers->update',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(bearerToken: 'My Bearer Token', environment: 'test_mode');\n\n$customer = $client->customers->update(\n  'customer_id',\n  email: 'email',\n  metadata: ['foo' => 'string'],\n  name: 'name',\n  phoneNumber: 'phone_number',\n);\n\nvar_dump($customer);",
      },
      python: {
        method: 'customers.update',
        example:
          'import os\nfrom dodopayments import DodoPayments\n\nclient = DodoPayments(\n    bearer_token=os.environ.get("DODO_PAYMENTS_API_KEY"),  # This is the default and can be omitted\n)\ncustomer = client.customers.update(\n    customer_id="customer_id",\n)\nprint(customer.business_id)',
      },
      ruby: {
        method: 'customers.update',
        example:
          'require "dodopayments"\n\ndodo_payments = Dodopayments::Client.new(\n  bearer_token: "My Bearer Token",\n  environment: "test_mode" # defaults to "live_mode"\n)\n\ncustomer = dodo_payments.customers.update("customer_id")\n\nputs(customer)',
      },
      typescript: {
        method: 'client.customers.update',
        example:
          "import DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments({\n  bearerToken: process.env['DODO_PAYMENTS_API_KEY'], // This is the default and can be omitted\n});\n\nconst customer = await client.customers.update('customer_id');\n\nconsole.log(customer.business_id);",
      },
    },
  },
  {
    name: 'retrieve_payment_methods',
    endpoint: '/customers/{customer_id}/payment-methods',
    httpMethod: 'get',
    summary: '',
    description: '',
    stainlessPath: '(resource) customers > (method) retrieve_payment_methods',
    qualified: 'client.customers.retrievePaymentMethods',
    params: ['customer_id: string;'],
    response:
      '{ items: { payment_method: string; payment_method_id: string; card?: { card_holder_name?: string; card_issuing_country?: country_code; card_network?: string; card_type?: string; expiry_month?: string; expiry_year?: string; last4_digits?: string; }; last_used_at?: string; payment_method_type?: string; recurring_enabled?: boolean; }[]; }',
    markdown:
      "## retrieve_payment_methods\n\n`client.customers.retrievePaymentMethods(customer_id: string): { items: object[]; }`\n\n**get** `/customers/{customer_id}/payment-methods`\n\n### Parameters\n\n- `customer_id: string`\n\n### Returns\n\n- `{ items: { payment_method: string; payment_method_id: string; card?: { card_holder_name?: string; card_issuing_country?: country_code; card_network?: string; card_type?: string; expiry_month?: string; expiry_year?: string; last4_digits?: string; }; last_used_at?: string; payment_method_type?: string; recurring_enabled?: boolean; }[]; }`\n\n  - `items: { payment_method: string; payment_method_id: string; card?: { card_holder_name?: string; card_issuing_country?: string; card_network?: string; card_type?: string; expiry_month?: string; expiry_year?: string; last4_digits?: string; }; last_used_at?: string; payment_method_type?: string; recurring_enabled?: boolean; }[]`\n\n### Example\n\n```typescript\nimport DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments();\n\nconst response = await client.customers.retrievePaymentMethods('customer_id');\n\nconsole.log(response);\n```",
    perLanguage: {
      cli: {
        method: 'customers retrieve_payment_methods',
        example:
          "dodo-payments-cli customers retrieve-payment-methods \\\n  --bearer-token 'My Bearer Token' \\\n  --customer-id customer_id",
      },
      csharp: {
        method: 'Customers.RetrievePaymentMethods',
        example:
          'CustomerRetrievePaymentMethodsParams parameters = new()\n{\n    CustomerID = "customer_id"\n};\n\nvar response = await client.Customers.RetrievePaymentMethods(parameters);\n\nConsole.WriteLine(response);',
      },
      go: {
        method: 'client.Customers.GetPaymentMethods',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/dodopayments/dodopayments-go"\n\t"github.com/dodopayments/dodopayments-go/option"\n)\n\nfunc main() {\n\tclient := dodopayments.NewClient(\n\t\toption.WithBearerToken("My Bearer Token"),\n\t)\n\tresponse, err := client.Customers.GetPaymentMethods(context.TODO(), "customer_id")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.Items)\n}\n',
      },
      http: {
        example:
          'curl https://live.dodopayments.com/customers/$CUSTOMER_ID/payment-methods \\\n    -H "Authorization: Bearer $DODO_PAYMENTS_API_KEY"',
      },
      java: {
        method: 'customers().retrievePaymentMethods',
        example:
          'package com.dodopayments.api.example;\n\nimport com.dodopayments.api.client.DodoPaymentsClient;\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient;\nimport com.dodopayments.api.models.customers.CustomerRetrievePaymentMethodsParams;\nimport com.dodopayments.api.models.customers.CustomerRetrievePaymentMethodsResponse;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        DodoPaymentsClient client = DodoPaymentsOkHttpClient.fromEnv();\n\n        CustomerRetrievePaymentMethodsResponse response = client.customers().retrievePaymentMethods("customer_id");\n    }\n}',
      },
      kotlin: {
        method: 'customers().retrievePaymentMethods',
        example:
          'package com.dodopayments.api.example\n\nimport com.dodopayments.api.client.DodoPaymentsClient\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient\nimport com.dodopayments.api.models.customers.CustomerRetrievePaymentMethodsParams\nimport com.dodopayments.api.models.customers.CustomerRetrievePaymentMethodsResponse\n\nfun main() {\n    val client: DodoPaymentsClient = DodoPaymentsOkHttpClient.fromEnv()\n\n    val response: CustomerRetrievePaymentMethodsResponse = client.customers().retrievePaymentMethods("customer_id")\n}',
      },
      php: {
        method: 'customers->retrievePaymentMethods',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(bearerToken: 'My Bearer Token', environment: 'test_mode');\n\n$response = $client->customers->retrievePaymentMethods('customer_id');\n\nvar_dump($response);",
      },
      python: {
        method: 'customers.retrieve_payment_methods',
        example:
          'import os\nfrom dodopayments import DodoPayments\n\nclient = DodoPayments(\n    bearer_token=os.environ.get("DODO_PAYMENTS_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.customers.retrieve_payment_methods(\n    "customer_id",\n)\nprint(response.items)',
      },
      ruby: {
        method: 'customers.retrieve_payment_methods',
        example:
          'require "dodopayments"\n\ndodo_payments = Dodopayments::Client.new(\n  bearer_token: "My Bearer Token",\n  environment: "test_mode" # defaults to "live_mode"\n)\n\nresponse = dodo_payments.customers.retrieve_payment_methods("customer_id")\n\nputs(response)',
      },
      typescript: {
        method: 'client.customers.retrievePaymentMethods',
        example:
          "import DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments({\n  bearerToken: process.env['DODO_PAYMENTS_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.customers.retrievePaymentMethods('customer_id');\n\nconsole.log(response.items);",
      },
    },
  },
  {
    name: 'list_credit_entitlements',
    endpoint: '/customers/{customer_id}/credit-entitlements',
    httpMethod: 'get',
    summary: 'List all credit entitlements for a customer with their current balances',
    description: 'List all credit entitlements for a customer with their current balances',
    stainlessPath: '(resource) customers > (method) list_credit_entitlements',
    qualified: 'client.customers.listCreditEntitlements',
    params: ['customer_id: string;'],
    response:
      '{ items: { balance: string; credit_entitlement_id: string; name: string; overage: string; unit: string; description?: string; }[]; }',
    markdown:
      "## list_credit_entitlements\n\n`client.customers.listCreditEntitlements(customer_id: string): { items: object[]; }`\n\n**get** `/customers/{customer_id}/credit-entitlements`\n\nList all credit entitlements for a customer with their current balances\n\n### Parameters\n\n- `customer_id: string`\n\n### Returns\n\n- `{ items: { balance: string; credit_entitlement_id: string; name: string; overage: string; unit: string; description?: string; }[]; }`\n\n  - `items: { balance: string; credit_entitlement_id: string; name: string; overage: string; unit: string; description?: string; }[]`\n\n### Example\n\n```typescript\nimport DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments();\n\nconst response = await client.customers.listCreditEntitlements('customer_id');\n\nconsole.log(response);\n```",
    perLanguage: {
      cli: {
        method: 'customers list_credit_entitlements',
        example:
          "dodo-payments-cli customers list-credit-entitlements \\\n  --bearer-token 'My Bearer Token' \\\n  --customer-id customer_id",
      },
      csharp: {
        method: 'Customers.ListCreditEntitlements',
        example:
          'CustomerListCreditEntitlementsParams parameters = new()\n{\n    CustomerID = "customer_id"\n};\n\nvar response = await client.Customers.ListCreditEntitlements(parameters);\n\nConsole.WriteLine(response);',
      },
      go: {
        method: 'client.Customers.ListCreditEntitlements',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/dodopayments/dodopayments-go"\n\t"github.com/dodopayments/dodopayments-go/option"\n)\n\nfunc main() {\n\tclient := dodopayments.NewClient(\n\t\toption.WithBearerToken("My Bearer Token"),\n\t)\n\tresponse, err := client.Customers.ListCreditEntitlements(context.TODO(), "customer_id")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.Items)\n}\n',
      },
      http: {
        example:
          'curl https://live.dodopayments.com/customers/$CUSTOMER_ID/credit-entitlements \\\n    -H "Authorization: Bearer $DODO_PAYMENTS_API_KEY"',
      },
      java: {
        method: 'customers().listCreditEntitlements',
        example:
          'package com.dodopayments.api.example;\n\nimport com.dodopayments.api.client.DodoPaymentsClient;\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient;\nimport com.dodopayments.api.models.customers.CustomerListCreditEntitlementsParams;\nimport com.dodopayments.api.models.customers.CustomerListCreditEntitlementsResponse;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        DodoPaymentsClient client = DodoPaymentsOkHttpClient.fromEnv();\n\n        CustomerListCreditEntitlementsResponse response = client.customers().listCreditEntitlements("customer_id");\n    }\n}',
      },
      kotlin: {
        method: 'customers().listCreditEntitlements',
        example:
          'package com.dodopayments.api.example\n\nimport com.dodopayments.api.client.DodoPaymentsClient\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient\nimport com.dodopayments.api.models.customers.CustomerListCreditEntitlementsParams\nimport com.dodopayments.api.models.customers.CustomerListCreditEntitlementsResponse\n\nfun main() {\n    val client: DodoPaymentsClient = DodoPaymentsOkHttpClient.fromEnv()\n\n    val response: CustomerListCreditEntitlementsResponse = client.customers().listCreditEntitlements("customer_id")\n}',
      },
      php: {
        method: 'customers->listCreditEntitlements',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(bearerToken: 'My Bearer Token', environment: 'test_mode');\n\n$response = $client->customers->listCreditEntitlements('customer_id');\n\nvar_dump($response);",
      },
      python: {
        method: 'customers.list_credit_entitlements',
        example:
          'import os\nfrom dodopayments import DodoPayments\n\nclient = DodoPayments(\n    bearer_token=os.environ.get("DODO_PAYMENTS_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.customers.list_credit_entitlements(\n    "customer_id",\n)\nprint(response.items)',
      },
      ruby: {
        method: 'customers.list_credit_entitlements',
        example:
          'require "dodopayments"\n\ndodo_payments = Dodopayments::Client.new(\n  bearer_token: "My Bearer Token",\n  environment: "test_mode" # defaults to "live_mode"\n)\n\nresponse = dodo_payments.customers.list_credit_entitlements("customer_id")\n\nputs(response)',
      },
      typescript: {
        method: 'client.customers.listCreditEntitlements',
        example:
          "import DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments({\n  bearerToken: process.env['DODO_PAYMENTS_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.customers.listCreditEntitlements('customer_id');\n\nconsole.log(response.items);",
      },
    },
  },
  {
    name: 'delete_payment_method',
    endpoint: '/customers/{customer_id}/payment-methods/{payment_method_id}',
    httpMethod: 'delete',
    summary: '',
    description: '',
    stainlessPath: '(resource) customers > (method) delete_payment_method',
    qualified: 'client.customers.deletePaymentMethod',
    params: ['customer_id: string;', 'payment_method_id: string;'],
    markdown:
      "## delete_payment_method\n\n`client.customers.deletePaymentMethod(customer_id: string, payment_method_id: string): void`\n\n**delete** `/customers/{customer_id}/payment-methods/{payment_method_id}`\n\n### Parameters\n\n- `customer_id: string`\n\n- `payment_method_id: string`\n\n### Example\n\n```typescript\nimport DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments();\n\nawait client.customers.deletePaymentMethod('payment_method_id', { customer_id: 'customer_id' })\n```",
    perLanguage: {
      cli: {
        method: 'customers delete_payment_method',
        example:
          "dodo-payments-cli customers delete-payment-method \\\n  --bearer-token 'My Bearer Token' \\\n  --customer-id customer_id \\\n  --payment-method-id payment_method_id",
      },
      csharp: {
        method: 'Customers.DeletePaymentMethod',
        example:
          'CustomerDeletePaymentMethodParams parameters = new()\n{\n    CustomerID = "customer_id",\n    PaymentMethodID = "payment_method_id",\n};\n\nawait client.Customers.DeletePaymentMethod(parameters);',
      },
      go: {
        method: 'client.Customers.DeletePaymentMethod',
        example:
          'package main\n\nimport (\n\t"context"\n\n\t"github.com/dodopayments/dodopayments-go"\n\t"github.com/dodopayments/dodopayments-go/option"\n)\n\nfunc main() {\n\tclient := dodopayments.NewClient(\n\t\toption.WithBearerToken("My Bearer Token"),\n\t)\n\terr := client.Customers.DeletePaymentMethod(\n\t\tcontext.TODO(),\n\t\t"customer_id",\n\t\t"payment_method_id",\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
      http: {
        example:
          'curl https://live.dodopayments.com/customers/$CUSTOMER_ID/payment-methods/$PAYMENT_METHOD_ID \\\n    -X DELETE \\\n    -H "Authorization: Bearer $DODO_PAYMENTS_API_KEY"',
      },
      java: {
        method: 'customers().deletePaymentMethod',
        example:
          'package com.dodopayments.api.example;\n\nimport com.dodopayments.api.client.DodoPaymentsClient;\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient;\nimport com.dodopayments.api.models.customers.CustomerDeletePaymentMethodParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        DodoPaymentsClient client = DodoPaymentsOkHttpClient.fromEnv();\n\n        CustomerDeletePaymentMethodParams params = CustomerDeletePaymentMethodParams.builder()\n            .customerId("customer_id")\n            .paymentMethodId("payment_method_id")\n            .build();\n        client.customers().deletePaymentMethod(params);\n    }\n}',
      },
      kotlin: {
        method: 'customers().deletePaymentMethod',
        example:
          'package com.dodopayments.api.example\n\nimport com.dodopayments.api.client.DodoPaymentsClient\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient\nimport com.dodopayments.api.models.customers.CustomerDeletePaymentMethodParams\n\nfun main() {\n    val client: DodoPaymentsClient = DodoPaymentsOkHttpClient.fromEnv()\n\n    val params: CustomerDeletePaymentMethodParams = CustomerDeletePaymentMethodParams.builder()\n        .customerId("customer_id")\n        .paymentMethodId("payment_method_id")\n        .build()\n    client.customers().deletePaymentMethod(params)\n}',
      },
      php: {
        method: 'customers->deletePaymentMethod',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(bearerToken: 'My Bearer Token', environment: 'test_mode');\n\n$result = $client->customers->deletePaymentMethod(\n  'payment_method_id', customerID: 'customer_id'\n);\n\nvar_dump($result);",
      },
      python: {
        method: 'customers.delete_payment_method',
        example:
          'import os\nfrom dodopayments import DodoPayments\n\nclient = DodoPayments(\n    bearer_token=os.environ.get("DODO_PAYMENTS_API_KEY"),  # This is the default and can be omitted\n)\nclient.customers.delete_payment_method(\n    payment_method_id="payment_method_id",\n    customer_id="customer_id",\n)',
      },
      ruby: {
        method: 'customers.delete_payment_method',
        example:
          'require "dodopayments"\n\ndodo_payments = Dodopayments::Client.new(\n  bearer_token: "My Bearer Token",\n  environment: "test_mode" # defaults to "live_mode"\n)\n\nresult = dodo_payments.customers.delete_payment_method("payment_method_id", customer_id: "customer_id")\n\nputs(result)',
      },
      typescript: {
        method: 'client.customers.deletePaymentMethod',
        example:
          "import DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments({\n  bearerToken: process.env['DODO_PAYMENTS_API_KEY'], // This is the default and can be omitted\n});\n\nawait client.customers.deletePaymentMethod('payment_method_id', { customer_id: 'customer_id' });",
      },
    },
  },
  {
    name: 'create',
    endpoint: '/customers/{customer_id}/customer-portal/session',
    httpMethod: 'post',
    summary: '',
    description: '',
    stainlessPath: '(resource) customers.customer_portal > (method) create',
    qualified: 'client.customers.customerPortal.create',
    params: ['customer_id: string;', 'return_url?: string;', 'send_email?: boolean;'],
    response: '{ link: string; }',
    markdown:
      "## create\n\n`client.customers.customerPortal.create(customer_id: string, return_url?: string, send_email?: boolean): { link: string; }`\n\n**post** `/customers/{customer_id}/customer-portal/session`\n\n### Parameters\n\n- `customer_id: string`\n\n- `return_url?: string`\n  Optional return URL for this session. Overrides the business-level default.\nThis URL will be shown as a \"Return to {business}\" back button in the portal.\n\n- `send_email?: boolean`\n  If true, will send link to user.\n\n### Returns\n\n- `{ link: string; }`\n\n  - `link: string`\n\n### Example\n\n```typescript\nimport DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments();\n\nconst customerPortalSession = await client.customers.customerPortal.create('customer_id');\n\nconsole.log(customerPortalSession);\n```",
    perLanguage: {
      cli: {
        method: 'customer_portal create',
        example:
          "dodo-payments-cli customers:customer-portal create \\\n  --bearer-token 'My Bearer Token' \\\n  --customer-id customer_id",
      },
      csharp: {
        method: 'Customers.CustomerPortal.Create',
        example:
          'CustomerPortalCreateParams parameters = new() { CustomerID = "customer_id" };\n\nvar customerPortalSession = await client.Customers.CustomerPortal.Create(parameters);\n\nConsole.WriteLine(customerPortalSession);',
      },
      go: {
        method: 'client.Customers.CustomerPortal.New',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/dodopayments/dodopayments-go"\n\t"github.com/dodopayments/dodopayments-go/option"\n)\n\nfunc main() {\n\tclient := dodopayments.NewClient(\n\t\toption.WithBearerToken("My Bearer Token"),\n\t)\n\tcustomerPortalSession, err := client.Customers.CustomerPortal.New(\n\t\tcontext.TODO(),\n\t\t"customer_id",\n\t\tdodopayments.CustomerCustomerPortalNewParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", customerPortalSession.Link)\n}\n',
      },
      http: {
        example:
          'curl https://live.dodopayments.com/customers/$CUSTOMER_ID/customer-portal/session \\\n    -X POST \\\n    -H "Authorization: Bearer $DODO_PAYMENTS_API_KEY"',
      },
      java: {
        method: 'customers().customerPortal().create',
        example:
          'package com.dodopayments.api.example;\n\nimport com.dodopayments.api.client.DodoPaymentsClient;\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient;\nimport com.dodopayments.api.models.customers.CustomerPortalSession;\nimport com.dodopayments.api.models.customers.customerportal.CustomerPortalCreateParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        DodoPaymentsClient client = DodoPaymentsOkHttpClient.fromEnv();\n\n        CustomerPortalSession customerPortalSession = client.customers().customerPortal().create("customer_id");\n    }\n}',
      },
      kotlin: {
        method: 'customers().customerPortal().create',
        example:
          'package com.dodopayments.api.example\n\nimport com.dodopayments.api.client.DodoPaymentsClient\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient\nimport com.dodopayments.api.models.customers.CustomerPortalSession\nimport com.dodopayments.api.models.customers.customerportal.CustomerPortalCreateParams\n\nfun main() {\n    val client: DodoPaymentsClient = DodoPaymentsOkHttpClient.fromEnv()\n\n    val customerPortalSession: CustomerPortalSession = client.customers().customerPortal().create("customer_id")\n}',
      },
      php: {
        method: 'customers->customerPortal->create',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(bearerToken: 'My Bearer Token', environment: 'test_mode');\n\n$customerPortalSession = $client->customers->customerPortal->create(\n  'customer_id', returnURL: 'return_url', sendEmail: true\n);\n\nvar_dump($customerPortalSession);",
      },
      python: {
        method: 'customers.customer_portal.create',
        example:
          'import os\nfrom dodopayments import DodoPayments\n\nclient = DodoPayments(\n    bearer_token=os.environ.get("DODO_PAYMENTS_API_KEY"),  # This is the default and can be omitted\n)\ncustomer_portal_session = client.customers.customer_portal.create(\n    customer_id="customer_id",\n)\nprint(customer_portal_session.link)',
      },
      ruby: {
        method: 'customers.customer_portal.create',
        example:
          'require "dodopayments"\n\ndodo_payments = Dodopayments::Client.new(\n  bearer_token: "My Bearer Token",\n  environment: "test_mode" # defaults to "live_mode"\n)\n\ncustomer_portal_session = dodo_payments.customers.customer_portal.create("customer_id")\n\nputs(customer_portal_session)',
      },
      typescript: {
        method: 'client.customers.customerPortal.create',
        example:
          "import DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments({\n  bearerToken: process.env['DODO_PAYMENTS_API_KEY'], // This is the default and can be omitted\n});\n\nconst customerPortalSession = await client.customers.customerPortal.create('customer_id');\n\nconsole.log(customerPortalSession.link);",
      },
    },
  },
  {
    name: 'list',
    endpoint: '/customers/{customer_id}/wallets',
    httpMethod: 'get',
    summary: '',
    description: '',
    stainlessPath: '(resource) customers.wallets > (method) list',
    qualified: 'client.customers.wallets.list',
    params: ['customer_id: string;'],
    response:
      '{ items: { balance: number; created_at: string; currency: currency; customer_id: string; updated_at: string; }[]; total_balance_usd: number; }',
    markdown:
      "## list\n\n`client.customers.wallets.list(customer_id: string): { items: customer_wallet[]; total_balance_usd: number; }`\n\n**get** `/customers/{customer_id}/wallets`\n\n### Parameters\n\n- `customer_id: string`\n\n### Returns\n\n- `{ items: { balance: number; created_at: string; currency: currency; customer_id: string; updated_at: string; }[]; total_balance_usd: number; }`\n\n  - `items: { balance: number; created_at: string; currency: string; customer_id: string; updated_at: string; }[]`\n  - `total_balance_usd: number`\n\n### Example\n\n```typescript\nimport DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments();\n\nconst wallets = await client.customers.wallets.list('customer_id');\n\nconsole.log(wallets);\n```",
    perLanguage: {
      cli: {
        method: 'wallets list',
        example:
          "dodo-payments-cli customers:wallets list \\\n  --bearer-token 'My Bearer Token' \\\n  --customer-id customer_id",
      },
      csharp: {
        method: 'Customers.Wallets.List',
        example:
          'WalletListParams parameters = new() { CustomerID = "customer_id" };\n\nvar wallets = await client.Customers.Wallets.List(parameters);\n\nConsole.WriteLine(wallets);',
      },
      go: {
        method: 'client.Customers.Wallets.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/dodopayments/dodopayments-go"\n\t"github.com/dodopayments/dodopayments-go/option"\n)\n\nfunc main() {\n\tclient := dodopayments.NewClient(\n\t\toption.WithBearerToken("My Bearer Token"),\n\t)\n\twallets, err := client.Customers.Wallets.List(context.TODO(), "customer_id")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", wallets.Items)\n}\n',
      },
      http: {
        example:
          'curl https://live.dodopayments.com/customers/$CUSTOMER_ID/wallets \\\n    -H "Authorization: Bearer $DODO_PAYMENTS_API_KEY"',
      },
      java: {
        method: 'customers().wallets().list',
        example:
          'package com.dodopayments.api.example;\n\nimport com.dodopayments.api.client.DodoPaymentsClient;\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient;\nimport com.dodopayments.api.models.customers.wallets.WalletListParams;\nimport com.dodopayments.api.models.customers.wallets.WalletListResponse;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        DodoPaymentsClient client = DodoPaymentsOkHttpClient.fromEnv();\n\n        WalletListResponse wallets = client.customers().wallets().list("customer_id");\n    }\n}',
      },
      kotlin: {
        method: 'customers().wallets().list',
        example:
          'package com.dodopayments.api.example\n\nimport com.dodopayments.api.client.DodoPaymentsClient\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient\nimport com.dodopayments.api.models.customers.wallets.WalletListParams\nimport com.dodopayments.api.models.customers.wallets.WalletListResponse\n\nfun main() {\n    val client: DodoPaymentsClient = DodoPaymentsOkHttpClient.fromEnv()\n\n    val wallets: WalletListResponse = client.customers().wallets().list("customer_id")\n}',
      },
      php: {
        method: 'customers->wallets->list',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(bearerToken: 'My Bearer Token', environment: 'test_mode');\n\n$wallets = $client->customers->wallets->list('customer_id');\n\nvar_dump($wallets);",
      },
      python: {
        method: 'customers.wallets.list',
        example:
          'import os\nfrom dodopayments import DodoPayments\n\nclient = DodoPayments(\n    bearer_token=os.environ.get("DODO_PAYMENTS_API_KEY"),  # This is the default and can be omitted\n)\nwallets = client.customers.wallets.list(\n    "customer_id",\n)\nprint(wallets.items)',
      },
      ruby: {
        method: 'customers.wallets.list',
        example:
          'require "dodopayments"\n\ndodo_payments = Dodopayments::Client.new(\n  bearer_token: "My Bearer Token",\n  environment: "test_mode" # defaults to "live_mode"\n)\n\nwallets = dodo_payments.customers.wallets.list("customer_id")\n\nputs(wallets)',
      },
      typescript: {
        method: 'client.customers.wallets.list',
        example:
          "import DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments({\n  bearerToken: process.env['DODO_PAYMENTS_API_KEY'], // This is the default and can be omitted\n});\n\nconst wallets = await client.customers.wallets.list('customer_id');\n\nconsole.log(wallets.items);",
      },
    },
  },
  {
    name: 'list',
    endpoint: '/customers/{customer_id}/wallets/ledger-entries',
    httpMethod: 'get',
    summary: '',
    description: '',
    stainlessPath: '(resource) customers.wallets.ledger_entries > (method) list',
    qualified: 'client.customers.wallets.ledgerEntries.list',
    params: ['customer_id: string;', 'currency?: string;', 'page_number?: number;', 'page_size?: number;'],
    response:
      '{ id: string; after_balance: number; amount: number; before_balance: number; business_id: string; created_at: string; currency: string; customer_id: string; event_type: string; is_credit: boolean; reason?: string; reference_object_id?: string; }',
    markdown:
      "## list\n\n`client.customers.wallets.ledgerEntries.list(customer_id: string, currency?: string, page_number?: number, page_size?: number): { id: string; after_balance: number; amount: number; before_balance: number; business_id: string; created_at: string; currency: currency; customer_id: string; event_type: string; is_credit: boolean; reason?: string; reference_object_id?: string; }`\n\n**get** `/customers/{customer_id}/wallets/ledger-entries`\n\n### Parameters\n\n- `customer_id: string`\n\n- `currency?: string`\n  Optional currency filter\n\n- `page_number?: number`\n\n- `page_size?: number`\n\n### Returns\n\n- `{ id: string; after_balance: number; amount: number; before_balance: number; business_id: string; created_at: string; currency: string; customer_id: string; event_type: string; is_credit: boolean; reason?: string; reference_object_id?: string; }`\n\n  - `id: string`\n  - `after_balance: number`\n  - `amount: number`\n  - `before_balance: number`\n  - `business_id: string`\n  - `created_at: string`\n  - `currency: string`\n  - `customer_id: string`\n  - `event_type: string`\n  - `is_credit: boolean`\n  - `reason?: string`\n  - `reference_object_id?: string`\n\n### Example\n\n```typescript\nimport DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments();\n\n// Automatically fetches more pages as needed.\nfor await (const customerWalletTransaction of client.customers.wallets.ledgerEntries.list('customer_id')) {\n  console.log(customerWalletTransaction);\n}\n```",
    perLanguage: {
      cli: {
        method: 'ledger_entries list',
        example:
          "dodo-payments-cli customers:wallets:ledger-entries list \\\n  --bearer-token 'My Bearer Token' \\\n  --customer-id customer_id",
      },
      csharp: {
        method: 'Customers.Wallets.LedgerEntries.List',
        example:
          'LedgerEntryListParams parameters = new() { CustomerID = "customer_id" };\n\nvar page = await client.Customers.Wallets.LedgerEntries.List(parameters);\nawait foreach (var item in page.Paginate())\n{\n    Console.WriteLine(item);\n}',
      },
      go: {
        method: 'client.Customers.Wallets.LedgerEntries.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/dodopayments/dodopayments-go"\n\t"github.com/dodopayments/dodopayments-go/option"\n)\n\nfunc main() {\n\tclient := dodopayments.NewClient(\n\t\toption.WithBearerToken("My Bearer Token"),\n\t)\n\tpage, err := client.Customers.Wallets.LedgerEntries.List(\n\t\tcontext.TODO(),\n\t\t"customer_id",\n\t\tdodopayments.CustomerWalletLedgerEntryListParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", page)\n}\n',
      },
      http: {
        example:
          'curl https://live.dodopayments.com/customers/$CUSTOMER_ID/wallets/ledger-entries \\\n    -H "Authorization: Bearer $DODO_PAYMENTS_API_KEY"',
      },
      java: {
        method: 'customers().wallets().ledgerEntries().list',
        example:
          'package com.dodopayments.api.example;\n\nimport com.dodopayments.api.client.DodoPaymentsClient;\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient;\nimport com.dodopayments.api.models.customers.wallets.ledgerentries.LedgerEntryListPage;\nimport com.dodopayments.api.models.customers.wallets.ledgerentries.LedgerEntryListParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        DodoPaymentsClient client = DodoPaymentsOkHttpClient.fromEnv();\n\n        LedgerEntryListPage page = client.customers().wallets().ledgerEntries().list("customer_id");\n    }\n}',
      },
      kotlin: {
        method: 'customers().wallets().ledgerEntries().list',
        example:
          'package com.dodopayments.api.example\n\nimport com.dodopayments.api.client.DodoPaymentsClient\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient\nimport com.dodopayments.api.models.customers.wallets.ledgerentries.LedgerEntryListPage\nimport com.dodopayments.api.models.customers.wallets.ledgerentries.LedgerEntryListParams\n\nfun main() {\n    val client: DodoPaymentsClient = DodoPaymentsOkHttpClient.fromEnv()\n\n    val page: LedgerEntryListPage = client.customers().wallets().ledgerEntries().list("customer_id")\n}',
      },
      php: {
        method: 'customers->wallets->ledgerEntries->list',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(bearerToken: 'My Bearer Token', environment: 'test_mode');\n\n$page = $client->customers->wallets->ledgerEntries->list(\n  'customer_id', currency: Currency::AED, pageNumber: 0, pageSize: 0\n);\n\nvar_dump($page);",
      },
      python: {
        method: 'customers.wallets.ledger_entries.list',
        example:
          'import os\nfrom dodopayments import DodoPayments\n\nclient = DodoPayments(\n    bearer_token=os.environ.get("DODO_PAYMENTS_API_KEY"),  # This is the default and can be omitted\n)\npage = client.customers.wallets.ledger_entries.list(\n    customer_id="customer_id",\n)\npage = page.items[0]\nprint(page.id)',
      },
      ruby: {
        method: 'customers.wallets.ledger_entries.list',
        example:
          'require "dodopayments"\n\ndodo_payments = Dodopayments::Client.new(\n  bearer_token: "My Bearer Token",\n  environment: "test_mode" # defaults to "live_mode"\n)\n\npage = dodo_payments.customers.wallets.ledger_entries.list("customer_id")\n\nputs(page)',
      },
      typescript: {
        method: 'client.customers.wallets.ledgerEntries.list',
        example:
          "import DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments({\n  bearerToken: process.env['DODO_PAYMENTS_API_KEY'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const customerWalletTransaction of client.customers.wallets.ledgerEntries.list(\n  'customer_id',\n)) {\n  console.log(customerWalletTransaction.id);\n}",
      },
    },
  },
  {
    name: 'create',
    endpoint: '/customers/{customer_id}/wallets/ledger-entries',
    httpMethod: 'post',
    summary: '',
    description: '',
    stainlessPath: '(resource) customers.wallets.ledger_entries > (method) create',
    qualified: 'client.customers.wallets.ledgerEntries.create',
    params: [
      'customer_id: string;',
      'amount: number;',
      'currency: string;',
      "entry_type: 'credit' | 'debit';",
      'idempotency_key?: string;',
      'reason?: string;',
    ],
    response:
      '{ balance: number; created_at: string; currency: string; customer_id: string; updated_at: string; }',
    markdown:
      "## create\n\n`client.customers.wallets.ledgerEntries.create(customer_id: string, amount: number, currency: string, entry_type: 'credit' | 'debit', idempotency_key?: string, reason?: string): { balance: number; created_at: string; currency: currency; customer_id: string; updated_at: string; }`\n\n**post** `/customers/{customer_id}/wallets/ledger-entries`\n\n### Parameters\n\n- `customer_id: string`\n\n- `amount: number`\n\n- `currency: string`\n  Currency of the wallet to adjust\n\n- `entry_type: 'credit' | 'debit'`\n  Type of ledger entry - credit or debit\n\n- `idempotency_key?: string`\n  Optional idempotency key to prevent duplicate entries\n\n- `reason?: string`\n\n### Returns\n\n- `{ balance: number; created_at: string; currency: string; customer_id: string; updated_at: string; }`\n\n  - `balance: number`\n  - `created_at: string`\n  - `currency: string`\n  - `customer_id: string`\n  - `updated_at: string`\n\n### Example\n\n```typescript\nimport DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments();\n\nconst customerWallet = await client.customers.wallets.ledgerEntries.create('customer_id', {\n  amount: 0,\n  currency: 'AED',\n  entry_type: 'credit',\n});\n\nconsole.log(customerWallet);\n```",
    perLanguage: {
      cli: {
        method: 'ledger_entries create',
        example:
          "dodo-payments-cli customers:wallets:ledger-entries create \\\n  --bearer-token 'My Bearer Token' \\\n  --customer-id customer_id \\\n  --amount 0 \\\n  --currency AED \\\n  --entry-type credit",
      },
      csharp: {
        method: 'Customers.Wallets.LedgerEntries.Create',
        example:
          'LedgerEntryCreateParams parameters = new()\n{\n    CustomerID = "customer_id",\n    Amount = 0,\n    Currency = Currency.Aed,\n    EntryType = EntryType.Credit,\n};\n\nvar customerWallet = await client.Customers.Wallets.LedgerEntries.Create(parameters);\n\nConsole.WriteLine(customerWallet);',
      },
      go: {
        method: 'client.Customers.Wallets.LedgerEntries.New',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/dodopayments/dodopayments-go"\n\t"github.com/dodopayments/dodopayments-go/option"\n)\n\nfunc main() {\n\tclient := dodopayments.NewClient(\n\t\toption.WithBearerToken("My Bearer Token"),\n\t)\n\tcustomerWallet, err := client.Customers.Wallets.LedgerEntries.New(\n\t\tcontext.TODO(),\n\t\t"customer_id",\n\t\tdodopayments.CustomerWalletLedgerEntryNewParams{\n\t\t\tAmount:    dodopayments.F(int64(0)),\n\t\t\tCurrency:  dodopayments.F(dodopayments.CurrencyAed),\n\t\t\tEntryType: dodopayments.F(dodopayments.CustomerWalletLedgerEntryNewParamsEntryTypeCredit),\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", customerWallet.CustomerID)\n}\n',
      },
      http: {
        example:
          'curl https://live.dodopayments.com/customers/$CUSTOMER_ID/wallets/ledger-entries \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $DODO_PAYMENTS_API_KEY" \\\n    -d \'{\n          "amount": 0,\n          "currency": "AED",\n          "entry_type": "credit"\n        }\'',
      },
      java: {
        method: 'customers().wallets().ledgerEntries().create',
        example:
          'package com.dodopayments.api.example;\n\nimport com.dodopayments.api.client.DodoPaymentsClient;\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient;\nimport com.dodopayments.api.models.customers.wallets.CustomerWallet;\nimport com.dodopayments.api.models.customers.wallets.ledgerentries.LedgerEntryCreateParams;\nimport com.dodopayments.api.models.misc.Currency;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        DodoPaymentsClient client = DodoPaymentsOkHttpClient.fromEnv();\n\n        LedgerEntryCreateParams params = LedgerEntryCreateParams.builder()\n            .customerId("customer_id")\n            .amount(0L)\n            .currency(Currency.AED)\n            .entryType(LedgerEntryCreateParams.EntryType.CREDIT)\n            .build();\n        CustomerWallet customerWallet = client.customers().wallets().ledgerEntries().create(params);\n    }\n}',
      },
      kotlin: {
        method: 'customers().wallets().ledgerEntries().create',
        example:
          'package com.dodopayments.api.example\n\nimport com.dodopayments.api.client.DodoPaymentsClient\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient\nimport com.dodopayments.api.models.customers.wallets.CustomerWallet\nimport com.dodopayments.api.models.customers.wallets.ledgerentries.LedgerEntryCreateParams\nimport com.dodopayments.api.models.misc.Currency\n\nfun main() {\n    val client: DodoPaymentsClient = DodoPaymentsOkHttpClient.fromEnv()\n\n    val params: LedgerEntryCreateParams = LedgerEntryCreateParams.builder()\n        .customerId("customer_id")\n        .amount(0L)\n        .currency(Currency.AED)\n        .entryType(LedgerEntryCreateParams.EntryType.CREDIT)\n        .build()\n    val customerWallet: CustomerWallet = client.customers().wallets().ledgerEntries().create(params)\n}',
      },
      php: {
        method: 'customers->wallets->ledgerEntries->create',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(bearerToken: 'My Bearer Token', environment: 'test_mode');\n\n$customerWallet = $client->customers->wallets->ledgerEntries->create(\n  'customer_id',\n  amount: 0,\n  currency: Currency::AED,\n  entryType: 'credit',\n  idempotencyKey: 'idempotency_key',\n  reason: 'reason',\n);\n\nvar_dump($customerWallet);",
      },
      python: {
        method: 'customers.wallets.ledger_entries.create',
        example:
          'import os\nfrom dodopayments import DodoPayments\n\nclient = DodoPayments(\n    bearer_token=os.environ.get("DODO_PAYMENTS_API_KEY"),  # This is the default and can be omitted\n)\ncustomer_wallet = client.customers.wallets.ledger_entries.create(\n    customer_id="customer_id",\n    amount=0,\n    currency="AED",\n    entry_type="credit",\n)\nprint(customer_wallet.customer_id)',
      },
      ruby: {
        method: 'customers.wallets.ledger_entries.create',
        example:
          'require "dodopayments"\n\ndodo_payments = Dodopayments::Client.new(\n  bearer_token: "My Bearer Token",\n  environment: "test_mode" # defaults to "live_mode"\n)\n\ncustomer_wallet = dodo_payments.customers.wallets.ledger_entries.create(\n  "customer_id",\n  amount: 0,\n  currency: :AED,\n  entry_type: :credit\n)\n\nputs(customer_wallet)',
      },
      typescript: {
        method: 'client.customers.wallets.ledgerEntries.create',
        example:
          "import DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments({\n  bearerToken: process.env['DODO_PAYMENTS_API_KEY'], // This is the default and can be omitted\n});\n\nconst customerWallet = await client.customers.wallets.ledgerEntries.create('customer_id', {\n  amount: 0,\n  currency: 'AED',\n  entry_type: 'credit',\n});\n\nconsole.log(customerWallet.customer_id);",
      },
    },
  },
  {
    name: 'list',
    endpoint: '/refunds',
    httpMethod: 'get',
    summary: '',
    description: '',
    stainlessPath: '(resource) refunds > (method) list',
    qualified: 'client.refunds.list',
    params: [
      'created_at_gte?: string;',
      'created_at_lte?: string;',
      'customer_id?: string;',
      'page_number?: number;',
      'page_size?: number;',
      "status?: 'succeeded' | 'failed' | 'pending' | 'review';",
      'subscription_id?: string;',
    ],
    response:
      "{ business_id: string; created_at: string; is_partial: boolean; payment_id: string; refund_id: string; status: 'succeeded' | 'failed' | 'pending' | 'review'; amount?: number; currency?: string; reason?: string; }",
    markdown:
      "## list\n\n`client.refunds.list(created_at_gte?: string, created_at_lte?: string, customer_id?: string, page_number?: number, page_size?: number, status?: 'succeeded' | 'failed' | 'pending' | 'review', subscription_id?: string): { business_id: string; created_at: string; is_partial: boolean; payment_id: string; refund_id: string; status: refund_status; amount?: number; currency?: currency; reason?: string; }`\n\n**get** `/refunds`\n\n### Parameters\n\n- `created_at_gte?: string`\n  Get events after this created time\n\n- `created_at_lte?: string`\n  Get events created before this time\n\n- `customer_id?: string`\n  Filter by customer_id\n\n- `page_number?: number`\n  Page number default is 0\n\n- `page_size?: number`\n  Page size default is 10 max is 100\n\n- `status?: 'succeeded' | 'failed' | 'pending' | 'review'`\n  Filter by status\n\n- `subscription_id?: string`\n  Filter by subscription id\n\n### Returns\n\n- `{ business_id: string; created_at: string; is_partial: boolean; payment_id: string; refund_id: string; status: 'succeeded' | 'failed' | 'pending' | 'review'; amount?: number; currency?: string; reason?: string; }`\n\n  - `business_id: string`\n  - `created_at: string`\n  - `is_partial: boolean`\n  - `payment_id: string`\n  - `refund_id: string`\n  - `status: 'succeeded' | 'failed' | 'pending' | 'review'`\n  - `amount?: number`\n  - `currency?: string`\n  - `reason?: string`\n\n### Example\n\n```typescript\nimport DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments();\n\n// Automatically fetches more pages as needed.\nfor await (const refundListItem of client.refunds.list()) {\n  console.log(refundListItem);\n}\n```",
    perLanguage: {
      cli: {
        method: 'refunds list',
        example: "dodo-payments-cli refunds list \\\n  --bearer-token 'My Bearer Token'",
      },
      csharp: {
        method: 'Refunds.List',
        example:
          'RefundListParams parameters = new();\n\nvar page = await client.Refunds.List(parameters);\nawait foreach (var item in page.Paginate())\n{\n    Console.WriteLine(item);\n}',
      },
      go: {
        method: 'client.Refunds.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/dodopayments/dodopayments-go"\n\t"github.com/dodopayments/dodopayments-go/option"\n)\n\nfunc main() {\n\tclient := dodopayments.NewClient(\n\t\toption.WithBearerToken("My Bearer Token"),\n\t)\n\tpage, err := client.Refunds.List(context.TODO(), dodopayments.RefundListParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", page)\n}\n',
      },
      http: {
        example:
          'curl https://live.dodopayments.com/refunds \\\n    -H "Authorization: Bearer $DODO_PAYMENTS_API_KEY"',
      },
      java: {
        method: 'refunds().list',
        example:
          'package com.dodopayments.api.example;\n\nimport com.dodopayments.api.client.DodoPaymentsClient;\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient;\nimport com.dodopayments.api.models.refunds.RefundListPage;\nimport com.dodopayments.api.models.refunds.RefundListParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        DodoPaymentsClient client = DodoPaymentsOkHttpClient.fromEnv();\n\n        RefundListPage page = client.refunds().list();\n    }\n}',
      },
      kotlin: {
        method: 'refunds().list',
        example:
          'package com.dodopayments.api.example\n\nimport com.dodopayments.api.client.DodoPaymentsClient\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient\nimport com.dodopayments.api.models.refunds.RefundListPage\nimport com.dodopayments.api.models.refunds.RefundListParams\n\nfun main() {\n    val client: DodoPaymentsClient = DodoPaymentsOkHttpClient.fromEnv()\n\n    val page: RefundListPage = client.refunds().list()\n}',
      },
      php: {
        method: 'refunds->list',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(bearerToken: 'My Bearer Token', environment: 'test_mode');\n\n$page = $client->refunds->list(\n  createdAtGte: new \\DateTimeImmutable('2019-12-27T18:11:19.117Z'),\n  createdAtLte: new \\DateTimeImmutable('2019-12-27T18:11:19.117Z'),\n  customerID: 'customer_id',\n  pageNumber: 0,\n  pageSize: 0,\n  status: 'succeeded',\n  subscriptionID: 'subscription_id',\n);\n\nvar_dump($page);",
      },
      python: {
        method: 'refunds.list',
        example:
          'import os\nfrom dodopayments import DodoPayments\n\nclient = DodoPayments(\n    bearer_token=os.environ.get("DODO_PAYMENTS_API_KEY"),  # This is the default and can be omitted\n)\npage = client.refunds.list()\npage = page.items[0]\nprint(page.business_id)',
      },
      ruby: {
        method: 'refunds.list',
        example:
          'require "dodopayments"\n\ndodo_payments = Dodopayments::Client.new(\n  bearer_token: "My Bearer Token",\n  environment: "test_mode" # defaults to "live_mode"\n)\n\npage = dodo_payments.refunds.list\n\nputs(page)',
      },
      typescript: {
        method: 'client.refunds.list',
        example:
          "import DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments({\n  bearerToken: process.env['DODO_PAYMENTS_API_KEY'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const refundListItem of client.refunds.list()) {\n  console.log(refundListItem.business_id);\n}",
      },
    },
  },
  {
    name: 'create',
    endpoint: '/refunds',
    httpMethod: 'post',
    summary: '',
    description: '',
    stainlessPath: '(resource) refunds > (method) create',
    qualified: 'client.refunds.create',
    params: [
      'payment_id: string;',
      'items?: { item_id: string; amount?: number; tax_inclusive?: boolean; }[];',
      'metadata?: object;',
      'reason?: string;',
    ],
    response:
      "{ business_id: string; created_at: string; customer: { customer_id: string; email: string; name: string; metadata?: object; phone_number?: string; }; is_partial: boolean; metadata: object; payment_id: string; refund_id: string; status: 'succeeded' | 'failed' | 'pending' | 'review'; amount?: number; currency?: string; reason?: string; }",
    markdown:
      "## create\n\n`client.refunds.create(payment_id: string, items?: { item_id: string; amount?: number; tax_inclusive?: boolean; }[], metadata?: object, reason?: string): { business_id: string; created_at: string; customer: customer_limited_details; is_partial: boolean; metadata: object; payment_id: string; refund_id: string; status: refund_status; amount?: number; currency?: currency; reason?: string; }`\n\n**post** `/refunds`\n\n### Parameters\n\n- `payment_id: string`\n  The unique identifier of the payment to be refunded.\n\n- `items?: { item_id: string; amount?: number; tax_inclusive?: boolean; }[]`\n  Partially Refund an Individual Item\n\n- `metadata?: object`\n  Additional metadata associated with the refund.\n\n- `reason?: string`\n  The reason for the refund, if any. Maximum length is 3000 characters. Optional.\n\n### Returns\n\n- `{ business_id: string; created_at: string; customer: { customer_id: string; email: string; name: string; metadata?: object; phone_number?: string; }; is_partial: boolean; metadata: object; payment_id: string; refund_id: string; status: 'succeeded' | 'failed' | 'pending' | 'review'; amount?: number; currency?: string; reason?: string; }`\n\n  - `business_id: string`\n  - `created_at: string`\n  - `customer: { customer_id: string; email: string; name: string; metadata?: object; phone_number?: string; }`\n  - `is_partial: boolean`\n  - `metadata: object`\n  - `payment_id: string`\n  - `refund_id: string`\n  - `status: 'succeeded' | 'failed' | 'pending' | 'review'`\n  - `amount?: number`\n  - `currency?: string`\n  - `reason?: string`\n\n### Example\n\n```typescript\nimport DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments();\n\nconst refund = await client.refunds.create({ payment_id: 'payment_id' });\n\nconsole.log(refund);\n```",
    perLanguage: {
      cli: {
        method: 'refunds create',
        example:
          "dodo-payments-cli refunds create \\\n  --bearer-token 'My Bearer Token' \\\n  --payment-id payment_id",
      },
      csharp: {
        method: 'Refunds.Create',
        example:
          'RefundCreateParams parameters = new() { PaymentID = "payment_id" };\n\nvar refund = await client.Refunds.Create(parameters);\n\nConsole.WriteLine(refund);',
      },
      go: {
        method: 'client.Refunds.New',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/dodopayments/dodopayments-go"\n\t"github.com/dodopayments/dodopayments-go/option"\n)\n\nfunc main() {\n\tclient := dodopayments.NewClient(\n\t\toption.WithBearerToken("My Bearer Token"),\n\t)\n\trefund, err := client.Refunds.New(context.TODO(), dodopayments.RefundNewParams{\n\t\tPaymentID: dodopayments.F("payment_id"),\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", refund.BusinessID)\n}\n',
      },
      http: {
        example:
          'curl https://live.dodopayments.com/refunds \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $DODO_PAYMENTS_API_KEY" \\\n    -d \'{\n          "payment_id": "payment_id"\n        }\'',
      },
      java: {
        method: 'refunds().create',
        example:
          'package com.dodopayments.api.example;\n\nimport com.dodopayments.api.client.DodoPaymentsClient;\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient;\nimport com.dodopayments.api.models.refunds.Refund;\nimport com.dodopayments.api.models.refunds.RefundCreateParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        DodoPaymentsClient client = DodoPaymentsOkHttpClient.fromEnv();\n\n        RefundCreateParams params = RefundCreateParams.builder()\n            .paymentId("payment_id")\n            .build();\n        Refund refund = client.refunds().create(params);\n    }\n}',
      },
      kotlin: {
        method: 'refunds().create',
        example:
          'package com.dodopayments.api.example\n\nimport com.dodopayments.api.client.DodoPaymentsClient\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient\nimport com.dodopayments.api.models.refunds.Refund\nimport com.dodopayments.api.models.refunds.RefundCreateParams\n\nfun main() {\n    val client: DodoPaymentsClient = DodoPaymentsOkHttpClient.fromEnv()\n\n    val params: RefundCreateParams = RefundCreateParams.builder()\n        .paymentId("payment_id")\n        .build()\n    val refund: Refund = client.refunds().create(params)\n}',
      },
      php: {
        method: 'refunds->create',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(bearerToken: 'My Bearer Token', environment: 'test_mode');\n\n$refund = $client->refunds->create(\n  paymentID: 'payment_id',\n  items: [['itemID' => 'item_id', 'amount' => 0, 'taxInclusive' => true]],\n  metadata: ['foo' => 'string'],\n  reason: 'reason',\n);\n\nvar_dump($refund);",
      },
      python: {
        method: 'refunds.create',
        example:
          'import os\nfrom dodopayments import DodoPayments\n\nclient = DodoPayments(\n    bearer_token=os.environ.get("DODO_PAYMENTS_API_KEY"),  # This is the default and can be omitted\n)\nrefund = client.refunds.create(\n    payment_id="payment_id",\n)\nprint(refund.business_id)',
      },
      ruby: {
        method: 'refunds.create',
        example:
          'require "dodopayments"\n\ndodo_payments = Dodopayments::Client.new(\n  bearer_token: "My Bearer Token",\n  environment: "test_mode" # defaults to "live_mode"\n)\n\nrefund = dodo_payments.refunds.create(payment_id: "payment_id")\n\nputs(refund)',
      },
      typescript: {
        method: 'client.refunds.create',
        example:
          "import DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments({\n  bearerToken: process.env['DODO_PAYMENTS_API_KEY'], // This is the default and can be omitted\n});\n\nconst refund = await client.refunds.create({ payment_id: 'payment_id' });\n\nconsole.log(refund.business_id);",
      },
    },
  },
  {
    name: 'retrieve',
    endpoint: '/refunds/{refund_id}',
    httpMethod: 'get',
    summary: '',
    description: '',
    stainlessPath: '(resource) refunds > (method) retrieve',
    qualified: 'client.refunds.retrieve',
    params: ['refund_id: string;'],
    response:
      "{ business_id: string; created_at: string; customer: { customer_id: string; email: string; name: string; metadata?: object; phone_number?: string; }; is_partial: boolean; metadata: object; payment_id: string; refund_id: string; status: 'succeeded' | 'failed' | 'pending' | 'review'; amount?: number; currency?: string; reason?: string; }",
    markdown:
      "## retrieve\n\n`client.refunds.retrieve(refund_id: string): { business_id: string; created_at: string; customer: customer_limited_details; is_partial: boolean; metadata: object; payment_id: string; refund_id: string; status: refund_status; amount?: number; currency?: currency; reason?: string; }`\n\n**get** `/refunds/{refund_id}`\n\n### Parameters\n\n- `refund_id: string`\n\n### Returns\n\n- `{ business_id: string; created_at: string; customer: { customer_id: string; email: string; name: string; metadata?: object; phone_number?: string; }; is_partial: boolean; metadata: object; payment_id: string; refund_id: string; status: 'succeeded' | 'failed' | 'pending' | 'review'; amount?: number; currency?: string; reason?: string; }`\n\n  - `business_id: string`\n  - `created_at: string`\n  - `customer: { customer_id: string; email: string; name: string; metadata?: object; phone_number?: string; }`\n  - `is_partial: boolean`\n  - `metadata: object`\n  - `payment_id: string`\n  - `refund_id: string`\n  - `status: 'succeeded' | 'failed' | 'pending' | 'review'`\n  - `amount?: number`\n  - `currency?: string`\n  - `reason?: string`\n\n### Example\n\n```typescript\nimport DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments();\n\nconst refund = await client.refunds.retrieve('refund_id');\n\nconsole.log(refund);\n```",
    perLanguage: {
      cli: {
        method: 'refunds retrieve',
        example:
          "dodo-payments-cli refunds retrieve \\\n  --bearer-token 'My Bearer Token' \\\n  --refund-id refund_id",
      },
      csharp: {
        method: 'Refunds.Retrieve',
        example:
          'RefundRetrieveParams parameters = new() { RefundID = "refund_id" };\n\nvar refund = await client.Refunds.Retrieve(parameters);\n\nConsole.WriteLine(refund);',
      },
      go: {
        method: 'client.Refunds.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/dodopayments/dodopayments-go"\n\t"github.com/dodopayments/dodopayments-go/option"\n)\n\nfunc main() {\n\tclient := dodopayments.NewClient(\n\t\toption.WithBearerToken("My Bearer Token"),\n\t)\n\trefund, err := client.Refunds.Get(context.TODO(), "refund_id")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", refund.BusinessID)\n}\n',
      },
      http: {
        example:
          'curl https://live.dodopayments.com/refunds/$REFUND_ID \\\n    -H "Authorization: Bearer $DODO_PAYMENTS_API_KEY"',
      },
      java: {
        method: 'refunds().retrieve',
        example:
          'package com.dodopayments.api.example;\n\nimport com.dodopayments.api.client.DodoPaymentsClient;\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient;\nimport com.dodopayments.api.models.refunds.Refund;\nimport com.dodopayments.api.models.refunds.RefundRetrieveParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        DodoPaymentsClient client = DodoPaymentsOkHttpClient.fromEnv();\n\n        Refund refund = client.refunds().retrieve("refund_id");\n    }\n}',
      },
      kotlin: {
        method: 'refunds().retrieve',
        example:
          'package com.dodopayments.api.example\n\nimport com.dodopayments.api.client.DodoPaymentsClient\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient\nimport com.dodopayments.api.models.refunds.Refund\nimport com.dodopayments.api.models.refunds.RefundRetrieveParams\n\nfun main() {\n    val client: DodoPaymentsClient = DodoPaymentsOkHttpClient.fromEnv()\n\n    val refund: Refund = client.refunds().retrieve("refund_id")\n}',
      },
      php: {
        method: 'refunds->retrieve',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(bearerToken: 'My Bearer Token', environment: 'test_mode');\n\n$refund = $client->refunds->retrieve('refund_id');\n\nvar_dump($refund);",
      },
      python: {
        method: 'refunds.retrieve',
        example:
          'import os\nfrom dodopayments import DodoPayments\n\nclient = DodoPayments(\n    bearer_token=os.environ.get("DODO_PAYMENTS_API_KEY"),  # This is the default and can be omitted\n)\nrefund = client.refunds.retrieve(\n    "refund_id",\n)\nprint(refund.business_id)',
      },
      ruby: {
        method: 'refunds.retrieve',
        example:
          'require "dodopayments"\n\ndodo_payments = Dodopayments::Client.new(\n  bearer_token: "My Bearer Token",\n  environment: "test_mode" # defaults to "live_mode"\n)\n\nrefund = dodo_payments.refunds.retrieve("refund_id")\n\nputs(refund)',
      },
      typescript: {
        method: 'client.refunds.retrieve',
        example:
          "import DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments({\n  bearerToken: process.env['DODO_PAYMENTS_API_KEY'], // This is the default and can be omitted\n});\n\nconst refund = await client.refunds.retrieve('refund_id');\n\nconsole.log(refund.business_id);",
      },
    },
  },
  {
    name: 'list',
    endpoint: '/disputes',
    httpMethod: 'get',
    summary: '',
    description: '',
    stainlessPath: '(resource) disputes > (method) list',
    qualified: 'client.disputes.list',
    params: [
      'created_at_gte?: string;',
      'created_at_lte?: string;',
      'customer_id?: string;',
      "dispute_stage?: 'pre_dispute' | 'dispute' | 'pre_arbitration';",
      'dispute_status?: string;',
      'page_number?: number;',
      'page_size?: number;',
    ],
    response:
      "{ amount: string; business_id: string; created_at: string; currency: string; dispute_id: string; dispute_stage: 'pre_dispute' | 'dispute' | 'pre_arbitration'; dispute_status: string; payment_id: string; is_resolved_by_rdr?: boolean; }",
    markdown:
      "## list\n\n`client.disputes.list(created_at_gte?: string, created_at_lte?: string, customer_id?: string, dispute_stage?: 'pre_dispute' | 'dispute' | 'pre_arbitration', dispute_status?: string, page_number?: number, page_size?: number): { amount: string; business_id: string; created_at: string; currency: string; dispute_id: string; dispute_stage: dispute_stage; dispute_status: dispute_status; payment_id: string; is_resolved_by_rdr?: boolean; }`\n\n**get** `/disputes`\n\n### Parameters\n\n- `created_at_gte?: string`\n  Get events after this created time\n\n- `created_at_lte?: string`\n  Get events created before this time\n\n- `customer_id?: string`\n  Filter by customer_id\n\n- `dispute_stage?: 'pre_dispute' | 'dispute' | 'pre_arbitration'`\n  Filter by dispute stage\n\n- `dispute_status?: string`\n  Filter by dispute status\n\n- `page_number?: number`\n  Page number default is 0\n\n- `page_size?: number`\n  Page size default is 10 max is 100\n\n### Returns\n\n- `{ amount: string; business_id: string; created_at: string; currency: string; dispute_id: string; dispute_stage: 'pre_dispute' | 'dispute' | 'pre_arbitration'; dispute_status: string; payment_id: string; is_resolved_by_rdr?: boolean; }`\n\n  - `amount: string`\n  - `business_id: string`\n  - `created_at: string`\n  - `currency: string`\n  - `dispute_id: string`\n  - `dispute_stage: 'pre_dispute' | 'dispute' | 'pre_arbitration'`\n  - `dispute_status: string`\n  - `payment_id: string`\n  - `is_resolved_by_rdr?: boolean`\n\n### Example\n\n```typescript\nimport DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments();\n\n// Automatically fetches more pages as needed.\nfor await (const disputeListResponse of client.disputes.list()) {\n  console.log(disputeListResponse);\n}\n```",
    perLanguage: {
      cli: {
        method: 'disputes list',
        example: "dodo-payments-cli disputes list \\\n  --bearer-token 'My Bearer Token'",
      },
      csharp: {
        method: 'Disputes.List',
        example:
          'DisputeListParams parameters = new();\n\nvar page = await client.Disputes.List(parameters);\nawait foreach (var item in page.Paginate())\n{\n    Console.WriteLine(item);\n}',
      },
      go: {
        method: 'client.Disputes.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/dodopayments/dodopayments-go"\n\t"github.com/dodopayments/dodopayments-go/option"\n)\n\nfunc main() {\n\tclient := dodopayments.NewClient(\n\t\toption.WithBearerToken("My Bearer Token"),\n\t)\n\tpage, err := client.Disputes.List(context.TODO(), dodopayments.DisputeListParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", page)\n}\n',
      },
      http: {
        example:
          'curl https://live.dodopayments.com/disputes \\\n    -H "Authorization: Bearer $DODO_PAYMENTS_API_KEY"',
      },
      java: {
        method: 'disputes().list',
        example:
          'package com.dodopayments.api.example;\n\nimport com.dodopayments.api.client.DodoPaymentsClient;\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient;\nimport com.dodopayments.api.models.disputes.DisputeListPage;\nimport com.dodopayments.api.models.disputes.DisputeListParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        DodoPaymentsClient client = DodoPaymentsOkHttpClient.fromEnv();\n\n        DisputeListPage page = client.disputes().list();\n    }\n}',
      },
      kotlin: {
        method: 'disputes().list',
        example:
          'package com.dodopayments.api.example\n\nimport com.dodopayments.api.client.DodoPaymentsClient\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient\nimport com.dodopayments.api.models.disputes.DisputeListPage\nimport com.dodopayments.api.models.disputes.DisputeListParams\n\nfun main() {\n    val client: DodoPaymentsClient = DodoPaymentsOkHttpClient.fromEnv()\n\n    val page: DisputeListPage = client.disputes().list()\n}',
      },
      php: {
        method: 'disputes->list',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(bearerToken: 'My Bearer Token', environment: 'test_mode');\n\n$page = $client->disputes->list(\n  createdAtGte: new \\DateTimeImmutable('2019-12-27T18:11:19.117Z'),\n  createdAtLte: new \\DateTimeImmutable('2019-12-27T18:11:19.117Z'),\n  customerID: 'customer_id',\n  disputeStage: 'pre_dispute',\n  disputeStatus: 'dispute_opened',\n  pageNumber: 0,\n  pageSize: 0,\n);\n\nvar_dump($page);",
      },
      python: {
        method: 'disputes.list',
        example:
          'import os\nfrom dodopayments import DodoPayments\n\nclient = DodoPayments(\n    bearer_token=os.environ.get("DODO_PAYMENTS_API_KEY"),  # This is the default and can be omitted\n)\npage = client.disputes.list()\npage = page.items[0]\nprint(page.business_id)',
      },
      ruby: {
        method: 'disputes.list',
        example:
          'require "dodopayments"\n\ndodo_payments = Dodopayments::Client.new(\n  bearer_token: "My Bearer Token",\n  environment: "test_mode" # defaults to "live_mode"\n)\n\npage = dodo_payments.disputes.list\n\nputs(page)',
      },
      typescript: {
        method: 'client.disputes.list',
        example:
          "import DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments({\n  bearerToken: process.env['DODO_PAYMENTS_API_KEY'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const disputeListResponse of client.disputes.list()) {\n  console.log(disputeListResponse.business_id);\n}",
      },
    },
  },
  {
    name: 'retrieve',
    endpoint: '/disputes/{dispute_id}',
    httpMethod: 'get',
    summary: '',
    description: '',
    stainlessPath: '(resource) disputes > (method) retrieve',
    qualified: 'client.disputes.retrieve',
    params: ['dispute_id: string;'],
    response:
      "{ amount: string; business_id: string; created_at: string; currency: string; customer: { customer_id: string; email: string; name: string; metadata?: object; phone_number?: string; }; dispute_id: string; dispute_stage: 'pre_dispute' | 'dispute' | 'pre_arbitration'; dispute_status: string; payment_id: string; is_resolved_by_rdr?: boolean; reason?: string; remarks?: string; }",
    markdown:
      "## retrieve\n\n`client.disputes.retrieve(dispute_id: string): { amount: string; business_id: string; created_at: string; currency: string; customer: customer_limited_details; dispute_id: string; dispute_stage: dispute_stage; dispute_status: dispute_status; payment_id: string; is_resolved_by_rdr?: boolean; reason?: string; remarks?: string; }`\n\n**get** `/disputes/{dispute_id}`\n\n### Parameters\n\n- `dispute_id: string`\n\n### Returns\n\n- `{ amount: string; business_id: string; created_at: string; currency: string; customer: { customer_id: string; email: string; name: string; metadata?: object; phone_number?: string; }; dispute_id: string; dispute_stage: 'pre_dispute' | 'dispute' | 'pre_arbitration'; dispute_status: string; payment_id: string; is_resolved_by_rdr?: boolean; reason?: string; remarks?: string; }`\n\n  - `amount: string`\n  - `business_id: string`\n  - `created_at: string`\n  - `currency: string`\n  - `customer: { customer_id: string; email: string; name: string; metadata?: object; phone_number?: string; }`\n  - `dispute_id: string`\n  - `dispute_stage: 'pre_dispute' | 'dispute' | 'pre_arbitration'`\n  - `dispute_status: string`\n  - `payment_id: string`\n  - `is_resolved_by_rdr?: boolean`\n  - `reason?: string`\n  - `remarks?: string`\n\n### Example\n\n```typescript\nimport DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments();\n\nconst getDispute = await client.disputes.retrieve('dispute_id');\n\nconsole.log(getDispute);\n```",
    perLanguage: {
      cli: {
        method: 'disputes retrieve',
        example:
          "dodo-payments-cli disputes retrieve \\\n  --bearer-token 'My Bearer Token' \\\n  --dispute-id dispute_id",
      },
      csharp: {
        method: 'Disputes.Retrieve',
        example:
          'DisputeRetrieveParams parameters = new() { DisputeID = "dispute_id" };\n\nvar getDispute = await client.Disputes.Retrieve(parameters);\n\nConsole.WriteLine(getDispute);',
      },
      go: {
        method: 'client.Disputes.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/dodopayments/dodopayments-go"\n\t"github.com/dodopayments/dodopayments-go/option"\n)\n\nfunc main() {\n\tclient := dodopayments.NewClient(\n\t\toption.WithBearerToken("My Bearer Token"),\n\t)\n\tgetDispute, err := client.Disputes.Get(context.TODO(), "dispute_id")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", getDispute.BusinessID)\n}\n',
      },
      http: {
        example:
          'curl https://live.dodopayments.com/disputes/$DISPUTE_ID \\\n    -H "Authorization: Bearer $DODO_PAYMENTS_API_KEY"',
      },
      java: {
        method: 'disputes().retrieve',
        example:
          'package com.dodopayments.api.example;\n\nimport com.dodopayments.api.client.DodoPaymentsClient;\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient;\nimport com.dodopayments.api.models.disputes.DisputeRetrieveParams;\nimport com.dodopayments.api.models.disputes.GetDispute;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        DodoPaymentsClient client = DodoPaymentsOkHttpClient.fromEnv();\n\n        GetDispute getDispute = client.disputes().retrieve("dispute_id");\n    }\n}',
      },
      kotlin: {
        method: 'disputes().retrieve',
        example:
          'package com.dodopayments.api.example\n\nimport com.dodopayments.api.client.DodoPaymentsClient\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient\nimport com.dodopayments.api.models.disputes.DisputeRetrieveParams\nimport com.dodopayments.api.models.disputes.GetDispute\n\nfun main() {\n    val client: DodoPaymentsClient = DodoPaymentsOkHttpClient.fromEnv()\n\n    val getDispute: GetDispute = client.disputes().retrieve("dispute_id")\n}',
      },
      php: {
        method: 'disputes->retrieve',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(bearerToken: 'My Bearer Token', environment: 'test_mode');\n\n$getDispute = $client->disputes->retrieve('dispute_id');\n\nvar_dump($getDispute);",
      },
      python: {
        method: 'disputes.retrieve',
        example:
          'import os\nfrom dodopayments import DodoPayments\n\nclient = DodoPayments(\n    bearer_token=os.environ.get("DODO_PAYMENTS_API_KEY"),  # This is the default and can be omitted\n)\nget_dispute = client.disputes.retrieve(\n    "dispute_id",\n)\nprint(get_dispute.business_id)',
      },
      ruby: {
        method: 'disputes.retrieve',
        example:
          'require "dodopayments"\n\ndodo_payments = Dodopayments::Client.new(\n  bearer_token: "My Bearer Token",\n  environment: "test_mode" # defaults to "live_mode"\n)\n\nget_dispute = dodo_payments.disputes.retrieve("dispute_id")\n\nputs(get_dispute)',
      },
      typescript: {
        method: 'client.disputes.retrieve',
        example:
          "import DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments({\n  bearerToken: process.env['DODO_PAYMENTS_API_KEY'], // This is the default and can be omitted\n});\n\nconst getDispute = await client.disputes.retrieve('dispute_id');\n\nconsole.log(getDispute.business_id);",
      },
    },
  },
  {
    name: 'list',
    endpoint: '/payouts',
    httpMethod: 'get',
    summary: '',
    description: '',
    stainlessPath: '(resource) payouts > (method) list',
    qualified: 'client.payouts.list',
    params: [
      'created_at_gte?: string;',
      'created_at_lte?: string;',
      'page_number?: number;',
      'page_size?: number;',
    ],
    response:
      "{ amount: number; business_id: string; chargebacks: number; created_at: string; currency: string; fee: number; payment_method: string; payout_id: string; refunds: number; status: 'not_initiated' | 'in_progress' | 'on_hold' | 'failed' | 'success'; tax: number; updated_at: string; name?: string; payout_document_url?: string; remarks?: string; }",
    markdown:
      "## list\n\n`client.payouts.list(created_at_gte?: string, created_at_lte?: string, page_number?: number, page_size?: number): { amount: number; business_id: string; chargebacks: number; created_at: string; currency: currency; fee: number; payment_method: string; payout_id: string; refunds: number; status: 'not_initiated' | 'in_progress' | 'on_hold' | 'failed' | 'success'; tax: number; updated_at: string; name?: string; payout_document_url?: string; remarks?: string; }`\n\n**get** `/payouts`\n\n### Parameters\n\n- `created_at_gte?: string`\n  Get payouts created after this time (inclusive)\n\n- `created_at_lte?: string`\n  Get payouts created before this time (inclusive)\n\n- `page_number?: number`\n  Page number default is 0\n\n- `page_size?: number`\n  Page size default is 10 max is 100\n\n### Returns\n\n- `{ amount: number; business_id: string; chargebacks: number; created_at: string; currency: string; fee: number; payment_method: string; payout_id: string; refunds: number; status: 'not_initiated' | 'in_progress' | 'on_hold' | 'failed' | 'success'; tax: number; updated_at: string; name?: string; payout_document_url?: string; remarks?: string; }`\n\n  - `amount: number`\n  - `business_id: string`\n  - `chargebacks: number`\n  - `created_at: string`\n  - `currency: string`\n  - `fee: number`\n  - `payment_method: string`\n  - `payout_id: string`\n  - `refunds: number`\n  - `status: 'not_initiated' | 'in_progress' | 'on_hold' | 'failed' | 'success'`\n  - `tax: number`\n  - `updated_at: string`\n  - `name?: string`\n  - `payout_document_url?: string`\n  - `remarks?: string`\n\n### Example\n\n```typescript\nimport DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments();\n\n// Automatically fetches more pages as needed.\nfor await (const payoutListResponse of client.payouts.list()) {\n  console.log(payoutListResponse);\n}\n```",
    perLanguage: {
      cli: {
        method: 'payouts list',
        example: "dodo-payments-cli payouts list \\\n  --bearer-token 'My Bearer Token'",
      },
      csharp: {
        method: 'Payouts.List',
        example:
          'PayoutListParams parameters = new();\n\nvar page = await client.Payouts.List(parameters);\nawait foreach (var item in page.Paginate())\n{\n    Console.WriteLine(item);\n}',
      },
      go: {
        method: 'client.Payouts.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/dodopayments/dodopayments-go"\n\t"github.com/dodopayments/dodopayments-go/option"\n)\n\nfunc main() {\n\tclient := dodopayments.NewClient(\n\t\toption.WithBearerToken("My Bearer Token"),\n\t)\n\tpage, err := client.Payouts.List(context.TODO(), dodopayments.PayoutListParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", page)\n}\n',
      },
      http: {
        example:
          'curl https://live.dodopayments.com/payouts \\\n    -H "Authorization: Bearer $DODO_PAYMENTS_API_KEY"',
      },
      java: {
        method: 'payouts().list',
        example:
          'package com.dodopayments.api.example;\n\nimport com.dodopayments.api.client.DodoPaymentsClient;\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient;\nimport com.dodopayments.api.models.payouts.PayoutListPage;\nimport com.dodopayments.api.models.payouts.PayoutListParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        DodoPaymentsClient client = DodoPaymentsOkHttpClient.fromEnv();\n\n        PayoutListPage page = client.payouts().list();\n    }\n}',
      },
      kotlin: {
        method: 'payouts().list',
        example:
          'package com.dodopayments.api.example\n\nimport com.dodopayments.api.client.DodoPaymentsClient\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient\nimport com.dodopayments.api.models.payouts.PayoutListPage\nimport com.dodopayments.api.models.payouts.PayoutListParams\n\nfun main() {\n    val client: DodoPaymentsClient = DodoPaymentsOkHttpClient.fromEnv()\n\n    val page: PayoutListPage = client.payouts().list()\n}',
      },
      php: {
        method: 'payouts->list',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(bearerToken: 'My Bearer Token', environment: 'test_mode');\n\n$page = $client->payouts->list(\n  createdAtGte: new \\DateTimeImmutable('2019-12-27T18:11:19.117Z'),\n  createdAtLte: new \\DateTimeImmutable('2019-12-27T18:11:19.117Z'),\n  pageNumber: 0,\n  pageSize: 0,\n);\n\nvar_dump($page);",
      },
      python: {
        method: 'payouts.list',
        example:
          'import os\nfrom dodopayments import DodoPayments\n\nclient = DodoPayments(\n    bearer_token=os.environ.get("DODO_PAYMENTS_API_KEY"),  # This is the default and can be omitted\n)\npage = client.payouts.list()\npage = page.items[0]\nprint(page.business_id)',
      },
      ruby: {
        method: 'payouts.list',
        example:
          'require "dodopayments"\n\ndodo_payments = Dodopayments::Client.new(\n  bearer_token: "My Bearer Token",\n  environment: "test_mode" # defaults to "live_mode"\n)\n\npage = dodo_payments.payouts.list\n\nputs(page)',
      },
      typescript: {
        method: 'client.payouts.list',
        example:
          "import DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments({\n  bearerToken: process.env['DODO_PAYMENTS_API_KEY'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const payoutListResponse of client.payouts.list()) {\n  console.log(payoutListResponse.business_id);\n}",
      },
    },
  },
  {
    name: 'retrieve',
    endpoint: '/payouts/{payout_id}/breakup',
    httpMethod: 'get',
    summary: '',
    description:
      "Returns the breakdown of a payout by event type (payments, refunds, disputes, fees, etc.) in the payout's currency. Each amount is proportionally allocated based on USD equivalent values, ensuring the total sums exactly to the payout amount.",
    stainlessPath: '(resource) payouts.breakup > (method) retrieve',
    qualified: 'client.payouts.breakup.retrieve',
    params: ['payout_id: string;'],
    response: '{ event_type: string; total: number; }[]',
    markdown:
      "## retrieve\n\n`client.payouts.breakup.retrieve(payout_id: string): { event_type: string; total: number; }[]`\n\n**get** `/payouts/{payout_id}/breakup`\n\nReturns the breakdown of a payout by event type (payments, refunds, disputes, fees, etc.) in the payout's currency. Each amount is proportionally allocated based on USD equivalent values, ensuring the total sums exactly to the payout amount.\n\n### Parameters\n\n- `payout_id: string`\n\n### Returns\n\n- `{ event_type: string; total: number; }[]`\n\n### Example\n\n```typescript\nimport DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments();\n\nconst breakups = await client.payouts.breakup.retrieve('payout_id');\n\nconsole.log(breakups);\n```",
    perLanguage: {
      cli: {
        method: 'breakup retrieve',
        example:
          "dodo-payments-cli payouts:breakup retrieve \\\n  --bearer-token 'My Bearer Token' \\\n  --payout-id payout_id",
      },
      csharp: {
        method: 'Payouts.Breakup.Retrieve',
        example:
          'BreakupRetrieveParams parameters = new() { PayoutID = "payout_id" };\n\nvar breakups = await client.Payouts.Breakup.Retrieve(parameters);\n\nConsole.WriteLine(breakups);',
      },
      go: {
        method: 'client.Payouts.Breakup.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/dodopayments/dodopayments-go"\n\t"github.com/dodopayments/dodopayments-go/option"\n)\n\nfunc main() {\n\tclient := dodopayments.NewClient(\n\t\toption.WithBearerToken("My Bearer Token"),\n\t)\n\tbreakups, err := client.Payouts.Breakup.Get(context.TODO(), "payout_id")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", breakups)\n}\n',
      },
      http: {
        example:
          'curl https://live.dodopayments.com/payouts/$PAYOUT_ID/breakup \\\n    -H "Authorization: Bearer $DODO_PAYMENTS_API_KEY"',
      },
      java: {
        method: 'payouts().breakup().retrieve',
        example:
          'package com.dodopayments.api.example;\n\nimport com.dodopayments.api.client.DodoPaymentsClient;\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient;\nimport com.dodopayments.api.models.payouts.breakup.BreakupRetrieveParams;\nimport com.dodopayments.api.models.payouts.breakup.BreakupRetrieveResponse;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        DodoPaymentsClient client = DodoPaymentsOkHttpClient.fromEnv();\n\n        List<BreakupRetrieveResponse> breakups = client.payouts().breakup().retrieve("payout_id");\n    }\n}',
      },
      kotlin: {
        method: 'payouts().breakup().retrieve',
        example:
          'package com.dodopayments.api.example\n\nimport com.dodopayments.api.client.DodoPaymentsClient\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient\nimport com.dodopayments.api.models.payouts.breakup.BreakupRetrieveParams\nimport com.dodopayments.api.models.payouts.breakup.BreakupRetrieveResponse\n\nfun main() {\n    val client: DodoPaymentsClient = DodoPaymentsOkHttpClient.fromEnv()\n\n    val breakups: List<BreakupRetrieveResponse> = client.payouts().breakup().retrieve("payout_id")\n}',
      },
      php: {
        method: 'payouts->breakup->retrieve',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(bearerToken: 'My Bearer Token', environment: 'test_mode');\n\n$breakups = $client->payouts->breakup->retrieve('payout_id');\n\nvar_dump($breakups);",
      },
      python: {
        method: 'payouts.breakup.retrieve',
        example:
          'import os\nfrom dodopayments import DodoPayments\n\nclient = DodoPayments(\n    bearer_token=os.environ.get("DODO_PAYMENTS_API_KEY"),  # This is the default and can be omitted\n)\nbreakups = client.payouts.breakup.retrieve(\n    "payout_id",\n)\nprint(breakups)',
      },
      ruby: {
        method: 'payouts.breakup.retrieve',
        example:
          'require "dodopayments"\n\ndodo_payments = Dodopayments::Client.new(\n  bearer_token: "My Bearer Token",\n  environment: "test_mode" # defaults to "live_mode"\n)\n\nbreakups = dodo_payments.payouts.breakup.retrieve("payout_id")\n\nputs(breakups)',
      },
      typescript: {
        method: 'client.payouts.breakup.retrieve',
        example:
          "import DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments({\n  bearerToken: process.env['DODO_PAYMENTS_API_KEY'], // This is the default and can be omitted\n});\n\nconst breakups = await client.payouts.breakup.retrieve('payout_id');\n\nconsole.log(breakups);",
      },
    },
  },
  {
    name: 'list',
    endpoint: '/payouts/{payout_id}/breakup/details',
    httpMethod: 'get',
    summary: '',
    description:
      "Returns paginated individual balance ledger entries for a payout, with each entry's amount pro-rated into the payout's currency. Supports pagination via `page_size` (default 10, max 100) and `page_number` (default 0) query parameters.",
    stainlessPath: '(resource) payouts.breakup.details > (method) list',
    qualified: 'client.payouts.breakup.details.list',
    params: ['payout_id: string;', 'page_number?: number;', 'page_size?: number;'],
    response:
      '{ id: string; created_at: string; event_type: string; original_amount: number; original_currency: string; payout_currency_amount: number; usd_equivalent_amount: number; description?: string; reference_object_id?: string; }',
    markdown:
      "## list\n\n`client.payouts.breakup.details.list(payout_id: string, page_number?: number, page_size?: number): { id: string; created_at: string; event_type: string; original_amount: number; original_currency: string; payout_currency_amount: number; usd_equivalent_amount: number; description?: string; reference_object_id?: string; }`\n\n**get** `/payouts/{payout_id}/breakup/details`\n\nReturns paginated individual balance ledger entries for a payout, with each entry's amount pro-rated into the payout's currency. Supports pagination via `page_size` (default 10, max 100) and `page_number` (default 0) query parameters.\n\n### Parameters\n\n- `payout_id: string`\n\n- `page_number?: number`\n  Page number (0-indexed). Default: 0.\n\n- `page_size?: number`\n  Number of items per page. Default: 10, Max: 100.\n\n### Returns\n\n- `{ id: string; created_at: string; event_type: string; original_amount: number; original_currency: string; payout_currency_amount: number; usd_equivalent_amount: number; description?: string; reference_object_id?: string; }`\n  Individual balance ledger entry for a payout, with amounts pro-rated into the payout's currency.\n\n  - `id: string`\n  - `created_at: string`\n  - `event_type: string`\n  - `original_amount: number`\n  - `original_currency: string`\n  - `payout_currency_amount: number`\n  - `usd_equivalent_amount: number`\n  - `description?: string`\n  - `reference_object_id?: string`\n\n### Example\n\n```typescript\nimport DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments();\n\n// Automatically fetches more pages as needed.\nfor await (const detailListResponse of client.payouts.breakup.details.list('payout_id')) {\n  console.log(detailListResponse);\n}\n```",
    perLanguage: {
      cli: {
        method: 'details list',
        example:
          "dodo-payments-cli payouts:breakup:details list \\\n  --bearer-token 'My Bearer Token' \\\n  --payout-id payout_id",
      },
      csharp: {
        method: 'Payouts.Breakup.Details.List',
        example:
          'DetailListParams parameters = new() { PayoutID = "payout_id" };\n\nvar page = await client.Payouts.Breakup.Details.List(parameters);\nawait foreach (var item in page.Paginate())\n{\n    Console.WriteLine(item);\n}',
      },
      go: {
        method: 'client.Payouts.Breakup.Details.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/dodopayments/dodopayments-go"\n\t"github.com/dodopayments/dodopayments-go/option"\n)\n\nfunc main() {\n\tclient := dodopayments.NewClient(\n\t\toption.WithBearerToken("My Bearer Token"),\n\t)\n\tpage, err := client.Payouts.Breakup.Details.List(\n\t\tcontext.TODO(),\n\t\t"payout_id",\n\t\tdodopayments.PayoutBreakupDetailListParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", page)\n}\n',
      },
      http: {
        example:
          'curl https://live.dodopayments.com/payouts/$PAYOUT_ID/breakup/details \\\n    -H "Authorization: Bearer $DODO_PAYMENTS_API_KEY"',
      },
      java: {
        method: 'payouts().breakup().details().list',
        example:
          'package com.dodopayments.api.example;\n\nimport com.dodopayments.api.client.DodoPaymentsClient;\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient;\nimport com.dodopayments.api.models.payouts.breakup.details.DetailListPage;\nimport com.dodopayments.api.models.payouts.breakup.details.DetailListParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        DodoPaymentsClient client = DodoPaymentsOkHttpClient.fromEnv();\n\n        DetailListPage page = client.payouts().breakup().details().list("payout_id");\n    }\n}',
      },
      kotlin: {
        method: 'payouts().breakup().details().list',
        example:
          'package com.dodopayments.api.example\n\nimport com.dodopayments.api.client.DodoPaymentsClient\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient\nimport com.dodopayments.api.models.payouts.breakup.details.DetailListPage\nimport com.dodopayments.api.models.payouts.breakup.details.DetailListParams\n\nfun main() {\n    val client: DodoPaymentsClient = DodoPaymentsOkHttpClient.fromEnv()\n\n    val page: DetailListPage = client.payouts().breakup().details().list("payout_id")\n}',
      },
      php: {
        method: 'payouts->breakup->details->list',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(bearerToken: 'My Bearer Token', environment: 'test_mode');\n\n$page = $client->payouts->breakup->details->list(\n  'payout_id', pageNumber: 0, pageSize: 0\n);\n\nvar_dump($page);",
      },
      python: {
        method: 'payouts.breakup.details.list',
        example:
          'import os\nfrom dodopayments import DodoPayments\n\nclient = DodoPayments(\n    bearer_token=os.environ.get("DODO_PAYMENTS_API_KEY"),  # This is the default and can be omitted\n)\npage = client.payouts.breakup.details.list(\n    payout_id="payout_id",\n)\npage = page.items[0]\nprint(page.id)',
      },
      ruby: {
        method: 'payouts.breakup.details.list',
        example:
          'require "dodopayments"\n\ndodo_payments = Dodopayments::Client.new(\n  bearer_token: "My Bearer Token",\n  environment: "test_mode" # defaults to "live_mode"\n)\n\npage = dodo_payments.payouts.breakup.details.list("payout_id")\n\nputs(page)',
      },
      typescript: {
        method: 'client.payouts.breakup.details.list',
        example:
          "import DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments({\n  bearerToken: process.env['DODO_PAYMENTS_API_KEY'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const detailListResponse of client.payouts.breakup.details.list('payout_id')) {\n  console.log(detailListResponse.id);\n}",
      },
    },
  },
  {
    name: 'download_csv',
    endpoint: '/payouts/{payout_id}/breakup/details/csv',
    httpMethod: 'get',
    summary: '',
    description:
      'Downloads the complete payout breakup as a CSV file. Each row represents a balance ledger entry with columns: Ledger ID, Event Type, Original Amount, Original Currency, Reference Object ID, Description, Created At, USD Equivalent Amount, and Payout Currency Amount.',
    stainlessPath: '(resource) payouts.breakup.details > (method) download_csv',
    qualified: 'client.payouts.breakup.details.downloadCsv',
    params: ['payout_id: string;'],
    markdown:
      "## download_csv\n\n`client.payouts.breakup.details.downloadCsv(payout_id: string): void`\n\n**get** `/payouts/{payout_id}/breakup/details/csv`\n\nDownloads the complete payout breakup as a CSV file. Each row represents a balance ledger entry with columns: Ledger ID, Event Type, Original Amount, Original Currency, Reference Object ID, Description, Created At, USD Equivalent Amount, and Payout Currency Amount.\n\n### Parameters\n\n- `payout_id: string`\n\n### Example\n\n```typescript\nimport DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments();\n\nawait client.payouts.breakup.details.downloadCsv('payout_id')\n```",
    perLanguage: {
      cli: {
        method: 'details download_csv',
        example:
          "dodo-payments-cli payouts:breakup:details download-csv \\\n  --bearer-token 'My Bearer Token' \\\n  --payout-id payout_id",
      },
      csharp: {
        method: 'Payouts.Breakup.Details.DownloadCsv',
        example:
          'DetailDownloadCsvParams parameters = new() { PayoutID = "payout_id" };\n\nawait client.Payouts.Breakup.Details.DownloadCsv(parameters);',
      },
      go: {
        method: 'client.Payouts.Breakup.Details.DownloadCsv',
        example:
          'package main\n\nimport (\n\t"context"\n\n\t"github.com/dodopayments/dodopayments-go"\n\t"github.com/dodopayments/dodopayments-go/option"\n)\n\nfunc main() {\n\tclient := dodopayments.NewClient(\n\t\toption.WithBearerToken("My Bearer Token"),\n\t)\n\terr := client.Payouts.Breakup.Details.DownloadCsv(context.TODO(), "payout_id")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
      http: {
        example:
          'curl https://live.dodopayments.com/payouts/$PAYOUT_ID/breakup/details/csv \\\n    -H "Authorization: Bearer $DODO_PAYMENTS_API_KEY"',
      },
      java: {
        method: 'payouts().breakup().details().downloadCsv',
        example:
          'package com.dodopayments.api.example;\n\nimport com.dodopayments.api.client.DodoPaymentsClient;\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient;\nimport com.dodopayments.api.models.payouts.breakup.details.DetailDownloadCsvParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        DodoPaymentsClient client = DodoPaymentsOkHttpClient.fromEnv();\n\n        client.payouts().breakup().details().downloadCsv("payout_id");\n    }\n}',
      },
      kotlin: {
        method: 'payouts().breakup().details().downloadCsv',
        example:
          'package com.dodopayments.api.example\n\nimport com.dodopayments.api.client.DodoPaymentsClient\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient\nimport com.dodopayments.api.models.payouts.breakup.details.DetailDownloadCsvParams\n\nfun main() {\n    val client: DodoPaymentsClient = DodoPaymentsOkHttpClient.fromEnv()\n\n    client.payouts().breakup().details().downloadCsv("payout_id")\n}',
      },
      php: {
        method: 'payouts->breakup->details->downloadCsv',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(bearerToken: 'My Bearer Token', environment: 'test_mode');\n\n$result = $client->payouts->breakup->details->downloadCsv('payout_id');\n\nvar_dump($result);",
      },
      python: {
        method: 'payouts.breakup.details.download_csv',
        example:
          'import os\nfrom dodopayments import DodoPayments\n\nclient = DodoPayments(\n    bearer_token=os.environ.get("DODO_PAYMENTS_API_KEY"),  # This is the default and can be omitted\n)\nclient.payouts.breakup.details.download_csv(\n    "payout_id",\n)',
      },
      ruby: {
        method: 'payouts.breakup.details.download_csv',
        example:
          'require "dodopayments"\n\ndodo_payments = Dodopayments::Client.new(\n  bearer_token: "My Bearer Token",\n  environment: "test_mode" # defaults to "live_mode"\n)\n\nresult = dodo_payments.payouts.breakup.details.download_csv("payout_id")\n\nputs(result)',
      },
      typescript: {
        method: 'client.payouts.breakup.details.downloadCsv',
        example:
          "import DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments({\n  bearerToken: process.env['DODO_PAYMENTS_API_KEY'], // This is the default and can be omitted\n});\n\nawait client.payouts.breakup.details.downloadCsv('payout_id');",
      },
    },
  },
  {
    name: 'list',
    endpoint: '/products',
    httpMethod: 'get',
    summary: '',
    description: '',
    stainlessPath: '(resource) products > (method) list',
    qualified: 'client.products.list',
    params: [
      'archived?: boolean;',
      'brand_id?: string;',
      'page_number?: number;',
      'page_size?: number;',
      'recurring?: boolean;',
    ],
    response:
      "{ business_id: string; created_at: string; entitlements: { id: string; integration_config: object | object | object | object | object | object | object | object; integration_type: 'discord' | 'telegram' | 'github' | 'figma' | 'framer' | 'notion' | 'digital_files' | 'license_key'; name: string; description?: string; }[]; is_recurring: boolean; metadata: object; product_id: string; tax_category: 'digital_products' | 'saas' | 'e_book' | 'edtech'; updated_at: string; currency?: string; description?: string; image?: string; name?: string; price?: number; price_detail?: object | object | object; tax_inclusive?: boolean; }",
    markdown:
      "## list\n\n`client.products.list(archived?: boolean, brand_id?: string, page_number?: number, page_size?: number, recurring?: boolean): { business_id: string; created_at: string; entitlements: object[]; is_recurring: boolean; metadata: object; product_id: string; tax_category: tax_category; updated_at: string; currency?: currency; description?: string; image?: string; name?: string; price?: number; price_detail?: price; tax_inclusive?: boolean; }`\n\n**get** `/products`\n\n### Parameters\n\n- `archived?: boolean`\n  List archived products\n\n- `brand_id?: string`\n  filter by Brand id\n\n- `page_number?: number`\n  Page number default is 0\n\n- `page_size?: number`\n  Page size default is 10 max is 100\n\n- `recurring?: boolean`\n  Filter products by pricing type:\n- `true`: Show only recurring pricing products (e.g. subscriptions)\n- `false`: Show only one-time price products\n- `null` or absent: Show both types of products\n\n### Returns\n\n- `{ business_id: string; created_at: string; entitlements: { id: string; integration_config: { permission: string; target_id: string; } | { guild_id: string; role_id?: string; } | { chat_id: string; } | { figma_file_id: string; } | { framer_template_id: string; } | { notion_template_id: string; } | { digital_file_ids: string[]; external_url?: string; instructions?: string; } | { activation_message?: string; activations_limit?: number; duration_count?: number; duration_interval?: string; }; integration_type: 'discord' | 'telegram' | 'github' | 'figma' | 'framer' | 'notion' | 'digital_files' | 'license_key'; name: string; description?: string; }[]; is_recurring: boolean; metadata: object; product_id: string; tax_category: 'digital_products' | 'saas' | 'e_book' | 'edtech'; updated_at: string; currency?: string; description?: string; image?: string; name?: string; price?: number; price_detail?: { currency: currency; discount: number; price: number; purchasing_power_parity: boolean; type: 'one_time_price'; pay_what_you_want?: boolean; suggested_price?: number; tax_inclusive?: boolean; } | { currency: currency; discount: number; payment_frequency_count: number; payment_frequency_interval: time_interval; price: number; purchasing_power_parity: boolean; subscription_period_count: number; subscription_period_interval: time_interval; type: 'recurring_price'; tax_inclusive?: boolean; trial_period_days?: number; } | { currency: currency; discount: number; fixed_price: number; payment_frequency_count: number; payment_frequency_interval: time_interval; purchasing_power_parity: boolean; subscription_period_count: number; subscription_period_interval: time_interval; type: 'usage_based_price'; meters?: add_meter_to_price[]; tax_inclusive?: boolean; }; tax_inclusive?: boolean; }`\n\n  - `business_id: string`\n  - `created_at: string`\n  - `entitlements: { id: string; integration_config: { permission: string; target_id: string; } | { guild_id: string; role_id?: string; } | { chat_id: string; } | { figma_file_id: string; } | { framer_template_id: string; } | { notion_template_id: string; } | { digital_file_ids: string[]; external_url?: string; instructions?: string; } | { activation_message?: string; activations_limit?: number; duration_count?: number; duration_interval?: string; }; integration_type: 'discord' | 'telegram' | 'github' | 'figma' | 'framer' | 'notion' | 'digital_files' | 'license_key'; name: string; description?: string; }[]`\n  - `is_recurring: boolean`\n  - `metadata: object`\n  - `product_id: string`\n  - `tax_category: 'digital_products' | 'saas' | 'e_book' | 'edtech'`\n  - `updated_at: string`\n  - `currency?: string`\n  - `description?: string`\n  - `image?: string`\n  - `name?: string`\n  - `price?: number`\n  - `price_detail?: { currency: string; discount: number; price: number; purchasing_power_parity: boolean; type: 'one_time_price'; pay_what_you_want?: boolean; suggested_price?: number; tax_inclusive?: boolean; } | { currency: string; discount: number; payment_frequency_count: number; payment_frequency_interval: 'Day' | 'Week' | 'Month' | 'Year'; price: number; purchasing_power_parity: boolean; subscription_period_count: number; subscription_period_interval: 'Day' | 'Week' | 'Month' | 'Year'; type: 'recurring_price'; tax_inclusive?: boolean; trial_period_days?: number; } | { currency: string; discount: number; fixed_price: number; payment_frequency_count: number; payment_frequency_interval: 'Day' | 'Week' | 'Month' | 'Year'; purchasing_power_parity: boolean; subscription_period_count: number; subscription_period_interval: 'Day' | 'Week' | 'Month' | 'Year'; type: 'usage_based_price'; meters?: { meter_id: string; credit_entitlement_id?: string; description?: string; free_threshold?: number; measurement_unit?: string; meter_units_per_credit?: string; name?: string; price_per_unit?: string; }[]; tax_inclusive?: boolean; }`\n  - `tax_inclusive?: boolean`\n\n### Example\n\n```typescript\nimport DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments();\n\n// Automatically fetches more pages as needed.\nfor await (const productListResponse of client.products.list()) {\n  console.log(productListResponse);\n}\n```",
    perLanguage: {
      cli: {
        method: 'products list',
        example: "dodo-payments-cli products list \\\n  --bearer-token 'My Bearer Token'",
      },
      csharp: {
        method: 'Products.List',
        example:
          'ProductListParams parameters = new();\n\nvar page = await client.Products.List(parameters);\nawait foreach (var item in page.Paginate())\n{\n    Console.WriteLine(item);\n}',
      },
      go: {
        method: 'client.Products.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/dodopayments/dodopayments-go"\n\t"github.com/dodopayments/dodopayments-go/option"\n)\n\nfunc main() {\n\tclient := dodopayments.NewClient(\n\t\toption.WithBearerToken("My Bearer Token"),\n\t)\n\tpage, err := client.Products.List(context.TODO(), dodopayments.ProductListParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", page)\n}\n',
      },
      http: {
        example:
          'curl https://live.dodopayments.com/products \\\n    -H "Authorization: Bearer $DODO_PAYMENTS_API_KEY"',
      },
      java: {
        method: 'products().list',
        example:
          'package com.dodopayments.api.example;\n\nimport com.dodopayments.api.client.DodoPaymentsClient;\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient;\nimport com.dodopayments.api.models.products.ProductListPage;\nimport com.dodopayments.api.models.products.ProductListParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        DodoPaymentsClient client = DodoPaymentsOkHttpClient.fromEnv();\n\n        ProductListPage page = client.products().list();\n    }\n}',
      },
      kotlin: {
        method: 'products().list',
        example:
          'package com.dodopayments.api.example\n\nimport com.dodopayments.api.client.DodoPaymentsClient\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient\nimport com.dodopayments.api.models.products.ProductListPage\nimport com.dodopayments.api.models.products.ProductListParams\n\nfun main() {\n    val client: DodoPaymentsClient = DodoPaymentsOkHttpClient.fromEnv()\n\n    val page: ProductListPage = client.products().list()\n}',
      },
      php: {
        method: 'products->list',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(bearerToken: 'My Bearer Token', environment: 'test_mode');\n\n$page = $client->products->list(\n  archived: true,\n  brandID: 'brand_id',\n  pageNumber: 0,\n  pageSize: 0,\n  recurring: true,\n);\n\nvar_dump($page);",
      },
      python: {
        method: 'products.list',
        example:
          'import os\nfrom dodopayments import DodoPayments\n\nclient = DodoPayments(\n    bearer_token=os.environ.get("DODO_PAYMENTS_API_KEY"),  # This is the default and can be omitted\n)\npage = client.products.list()\npage = page.items[0]\nprint(page.business_id)',
      },
      ruby: {
        method: 'products.list',
        example:
          'require "dodopayments"\n\ndodo_payments = Dodopayments::Client.new(\n  bearer_token: "My Bearer Token",\n  environment: "test_mode" # defaults to "live_mode"\n)\n\npage = dodo_payments.products.list\n\nputs(page)',
      },
      typescript: {
        method: 'client.products.list',
        example:
          "import DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments({\n  bearerToken: process.env['DODO_PAYMENTS_API_KEY'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const productListResponse of client.products.list()) {\n  console.log(productListResponse.business_id);\n}",
      },
    },
  },
  {
    name: 'create',
    endpoint: '/products',
    httpMethod: 'post',
    summary: '',
    description: '',
    stainlessPath: '(resource) products > (method) create',
    qualified: 'client.products.create',
    params: [
      'name: string;',
      "price: { currency: string; discount: number; price: number; purchasing_power_parity: boolean; type: 'one_time_price'; pay_what_you_want?: boolean; suggested_price?: number; tax_inclusive?: boolean; } | { currency: string; discount: number; payment_frequency_count: number; payment_frequency_interval: 'Day' | 'Week' | 'Month' | 'Year'; price: number; purchasing_power_parity: boolean; subscription_period_count: number; subscription_period_interval: 'Day' | 'Week' | 'Month' | 'Year'; type: 'recurring_price'; tax_inclusive?: boolean; trial_period_days?: number; } | { currency: string; discount: number; fixed_price: number; payment_frequency_count: number; payment_frequency_interval: 'Day' | 'Week' | 'Month' | 'Year'; purchasing_power_parity: boolean; subscription_period_count: number; subscription_period_interval: 'Day' | 'Week' | 'Month' | 'Year'; type: 'usage_based_price'; meters?: { meter_id: string; credit_entitlement_id?: string; description?: string; free_threshold?: number; measurement_unit?: string; meter_units_per_credit?: string; name?: string; price_per_unit?: string; }[]; tax_inclusive?: boolean; };",
      "tax_category: 'digital_products' | 'saas' | 'e_book' | 'edtech';",
      'addons?: string[];',
      'brand_id?: string;',
      "credit_entitlements?: { credit_entitlement_id: string; credits_amount: string; currency?: string; expires_after_days?: number; low_balance_threshold_percent?: number; max_rollover_count?: number; overage_behavior?: 'forgive_at_reset' | 'invoice_at_billing' | 'carry_deficit' | 'carry_deficit_auto_repay'; overage_enabled?: boolean; overage_limit?: string; price_per_unit?: string; proration_behavior?: 'prorate' | 'no_prorate'; rollover_enabled?: boolean; rollover_percentage?: number; rollover_timeframe_count?: number; rollover_timeframe_interval?: 'Day' | 'Week' | 'Month' | 'Year'; trial_credits?: string; trial_credits_expire_after_trial?: boolean; }[];",
      'description?: string;',
      'digital_product_delivery?: { external_url?: string; instructions?: string; };',
      'entitlement_ids?: string[];',
      'license_key_activation_message?: string;',
      'license_key_activations_limit?: number;',
      "license_key_duration?: { count: number; interval: 'Day' | 'Week' | 'Month' | 'Year'; };",
      'license_key_enabled?: boolean;',
      'metadata?: object;',
    ],
    response:
      "{ brand_id: string; business_id: string; created_at: string; credit_entitlements: object[]; entitlements: { id: string; integration_config: object | object | object | object | object | object | object | object; integration_type: 'discord' | 'telegram' | 'github' | 'figma' | 'framer' | 'notion' | 'digital_files' | 'license_key'; name: string; description?: string; }[]; is_recurring: boolean; license_key_enabled: boolean; metadata: object; price: object | object | object; product_id: string; tax_category: 'digital_products' | 'saas' | 'e_book' | 'edtech'; updated_at: string; addons?: string[]; description?: string; digital_product_delivery?: object; image?: string; license_key_activation_message?: string; license_key_activations_limit?: number; license_key_duration?: object; name?: string; product_collection_id?: string; }",
    markdown:
      "## create\n\n`client.products.create(name: string, price: { currency: currency; discount: number; price: number; purchasing_power_parity: boolean; type: 'one_time_price'; pay_what_you_want?: boolean; suggested_price?: number; tax_inclusive?: boolean; } | { currency: currency; discount: number; payment_frequency_count: number; payment_frequency_interval: time_interval; price: number; purchasing_power_parity: boolean; subscription_period_count: number; subscription_period_interval: time_interval; type: 'recurring_price'; tax_inclusive?: boolean; trial_period_days?: number; } | { currency: currency; discount: number; fixed_price: number; payment_frequency_count: number; payment_frequency_interval: time_interval; purchasing_power_parity: boolean; subscription_period_count: number; subscription_period_interval: time_interval; type: 'usage_based_price'; meters?: add_meter_to_price[]; tax_inclusive?: boolean; }, tax_category: 'digital_products' | 'saas' | 'e_book' | 'edtech', addons?: string[], brand_id?: string, credit_entitlements?: { credit_entitlement_id: string; credits_amount: string; currency?: currency; expires_after_days?: number; low_balance_threshold_percent?: number; max_rollover_count?: number; overage_behavior?: cbb_overage_behavior; overage_enabled?: boolean; overage_limit?: string; price_per_unit?: string; proration_behavior?: cbb_proration_behavior; rollover_enabled?: boolean; rollover_percentage?: number; rollover_timeframe_count?: number; rollover_timeframe_interval?: time_interval; trial_credits?: string; trial_credits_expire_after_trial?: boolean; }[], description?: string, digital_product_delivery?: { external_url?: string; instructions?: string; }, entitlement_ids?: string[], license_key_activation_message?: string, license_key_activations_limit?: number, license_key_duration?: { count: number; interval: time_interval; }, license_key_enabled?: boolean, metadata?: object): { brand_id: string; business_id: string; created_at: string; credit_entitlements: credit_entitlement_mapping_response[]; entitlements: object[]; is_recurring: boolean; license_key_enabled: boolean; metadata: object; price: price; product_id: string; tax_category: tax_category; updated_at: string; addons?: string[]; description?: string; digital_product_delivery?: digital_product_delivery; image?: string; license_key_activation_message?: string; license_key_activations_limit?: number; license_key_duration?: license_key_duration; name?: string; product_collection_id?: string; }`\n\n**post** `/products`\n\n### Parameters\n\n- `name: string`\n  Name of the product\n\n- `price: { currency: string; discount: number; price: number; purchasing_power_parity: boolean; type: 'one_time_price'; pay_what_you_want?: boolean; suggested_price?: number; tax_inclusive?: boolean; } | { currency: string; discount: number; payment_frequency_count: number; payment_frequency_interval: 'Day' | 'Week' | 'Month' | 'Year'; price: number; purchasing_power_parity: boolean; subscription_period_count: number; subscription_period_interval: 'Day' | 'Week' | 'Month' | 'Year'; type: 'recurring_price'; tax_inclusive?: boolean; trial_period_days?: number; } | { currency: string; discount: number; fixed_price: number; payment_frequency_count: number; payment_frequency_interval: 'Day' | 'Week' | 'Month' | 'Year'; purchasing_power_parity: boolean; subscription_period_count: number; subscription_period_interval: 'Day' | 'Week' | 'Month' | 'Year'; type: 'usage_based_price'; meters?: { meter_id: string; credit_entitlement_id?: string; description?: string; free_threshold?: number; measurement_unit?: string; meter_units_per_credit?: string; name?: string; price_per_unit?: string; }[]; tax_inclusive?: boolean; }`\n  Price configuration for the product\n\n- `tax_category: 'digital_products' | 'saas' | 'e_book' | 'edtech'`\n  Tax category applied to this product\n\n- `addons?: string[]`\n  Addons available for subscription product\n\n- `brand_id?: string`\n  Brand id for the product, if not provided will default to primary brand\n\n- `credit_entitlements?: { credit_entitlement_id: string; credits_amount: string; currency?: string; expires_after_days?: number; low_balance_threshold_percent?: number; max_rollover_count?: number; overage_behavior?: 'forgive_at_reset' | 'invoice_at_billing' | 'carry_deficit' | 'carry_deficit_auto_repay'; overage_enabled?: boolean; overage_limit?: string; price_per_unit?: string; proration_behavior?: 'prorate' | 'no_prorate'; rollover_enabled?: boolean; rollover_percentage?: number; rollover_timeframe_count?: number; rollover_timeframe_interval?: 'Day' | 'Week' | 'Month' | 'Year'; trial_credits?: string; trial_credits_expire_after_trial?: boolean; }[]`\n  Optional credit entitlements to attach (max 3)\n\n- `description?: string`\n  Optional description of the product\n\n- `digital_product_delivery?: { external_url?: string; instructions?: string; }`\n  Choose how you would like you digital product delivered\n  - `external_url?: string`\n    External URL to digital product\n  - `instructions?: string`\n    Instructions to download and use the digital product\n\n- `entitlement_ids?: string[]`\n  Optional entitlement IDs to attach to this product (max 20)\n\n- `license_key_activation_message?: string`\n  Optional message displayed during license key activation\n\n- `license_key_activations_limit?: number`\n  The number of times the license key can be activated.\nMust be 0 or greater\n\n- `license_key_duration?: { count: number; interval: 'Day' | 'Week' | 'Month' | 'Year'; }`\n  Duration configuration for the license key.\nSet to null if you don't want the license key to expire.\nFor subscriptions, the lifetime of the license key is tied to the subscription period\n  - `count: number`\n  - `interval: 'Day' | 'Week' | 'Month' | 'Year'`\n\n- `license_key_enabled?: boolean`\n  When true, generates and sends a license key to your customer.\nDefaults to false\n\n- `metadata?: object`\n  Additional metadata for the product\n\n### Returns\n\n- `{ brand_id: string; business_id: string; created_at: string; credit_entitlements: { id: string; credit_entitlement_id: string; credit_entitlement_name: string; credit_entitlement_unit: string; credits_amount: string; overage_behavior: cbb_overage_behavior; overage_enabled: boolean; proration_behavior: cbb_proration_behavior; rollover_enabled: boolean; trial_credits_expire_after_trial: boolean; currency?: currency; expires_after_days?: number; low_balance_threshold_percent?: number; max_rollover_count?: number; overage_limit?: string; price_per_unit?: string; rollover_percentage?: number; rollover_timeframe_count?: number; rollover_timeframe_interval?: time_interval; trial_credits?: string; }[]; entitlements: { id: string; integration_config: { permission: string; target_id: string; } | { guild_id: string; role_id?: string; } | { chat_id: string; } | { figma_file_id: string; } | { framer_template_id: string; } | { notion_template_id: string; } | { digital_file_ids: string[]; external_url?: string; instructions?: string; } | { activation_message?: string; activations_limit?: number; duration_count?: number; duration_interval?: string; }; integration_type: 'discord' | 'telegram' | 'github' | 'figma' | 'framer' | 'notion' | 'digital_files' | 'license_key'; name: string; description?: string; }[]; is_recurring: boolean; license_key_enabled: boolean; metadata: object; price: { currency: currency; discount: number; price: number; purchasing_power_parity: boolean; type: 'one_time_price'; pay_what_you_want?: boolean; suggested_price?: number; tax_inclusive?: boolean; } | { currency: currency; discount: number; payment_frequency_count: number; payment_frequency_interval: time_interval; price: number; purchasing_power_parity: boolean; subscription_period_count: number; subscription_period_interval: time_interval; type: 'recurring_price'; tax_inclusive?: boolean; trial_period_days?: number; } | { currency: currency; discount: number; fixed_price: number; payment_frequency_count: number; payment_frequency_interval: time_interval; purchasing_power_parity: boolean; subscription_period_count: number; subscription_period_interval: time_interval; type: 'usage_based_price'; meters?: add_meter_to_price[]; tax_inclusive?: boolean; }; product_id: string; tax_category: 'digital_products' | 'saas' | 'e_book' | 'edtech'; updated_at: string; addons?: string[]; description?: string; digital_product_delivery?: { external_url?: string; files?: digital_product_delivery_file[]; instructions?: string; }; image?: string; license_key_activation_message?: string; license_key_activations_limit?: number; license_key_duration?: { count: number; interval: time_interval; }; name?: string; product_collection_id?: string; }`\n\n  - `brand_id: string`\n  - `business_id: string`\n  - `created_at: string`\n  - `credit_entitlements: { id: string; credit_entitlement_id: string; credit_entitlement_name: string; credit_entitlement_unit: string; credits_amount: string; overage_behavior: 'forgive_at_reset' | 'invoice_at_billing' | 'carry_deficit' | 'carry_deficit_auto_repay'; overage_enabled: boolean; proration_behavior: 'prorate' | 'no_prorate'; rollover_enabled: boolean; trial_credits_expire_after_trial: boolean; currency?: string; expires_after_days?: number; low_balance_threshold_percent?: number; max_rollover_count?: number; overage_limit?: string; price_per_unit?: string; rollover_percentage?: number; rollover_timeframe_count?: number; rollover_timeframe_interval?: 'Day' | 'Week' | 'Month' | 'Year'; trial_credits?: string; }[]`\n  - `entitlements: { id: string; integration_config: { permission: string; target_id: string; } | { guild_id: string; role_id?: string; } | { chat_id: string; } | { figma_file_id: string; } | { framer_template_id: string; } | { notion_template_id: string; } | { digital_file_ids: string[]; external_url?: string; instructions?: string; } | { activation_message?: string; activations_limit?: number; duration_count?: number; duration_interval?: string; }; integration_type: 'discord' | 'telegram' | 'github' | 'figma' | 'framer' | 'notion' | 'digital_files' | 'license_key'; name: string; description?: string; }[]`\n  - `is_recurring: boolean`\n  - `license_key_enabled: boolean`\n  - `metadata: object`\n  - `price: { currency: string; discount: number; price: number; purchasing_power_parity: boolean; type: 'one_time_price'; pay_what_you_want?: boolean; suggested_price?: number; tax_inclusive?: boolean; } | { currency: string; discount: number; payment_frequency_count: number; payment_frequency_interval: 'Day' | 'Week' | 'Month' | 'Year'; price: number; purchasing_power_parity: boolean; subscription_period_count: number; subscription_period_interval: 'Day' | 'Week' | 'Month' | 'Year'; type: 'recurring_price'; tax_inclusive?: boolean; trial_period_days?: number; } | { currency: string; discount: number; fixed_price: number; payment_frequency_count: number; payment_frequency_interval: 'Day' | 'Week' | 'Month' | 'Year'; purchasing_power_parity: boolean; subscription_period_count: number; subscription_period_interval: 'Day' | 'Week' | 'Month' | 'Year'; type: 'usage_based_price'; meters?: { meter_id: string; credit_entitlement_id?: string; description?: string; free_threshold?: number; measurement_unit?: string; meter_units_per_credit?: string; name?: string; price_per_unit?: string; }[]; tax_inclusive?: boolean; }`\n  - `product_id: string`\n  - `tax_category: 'digital_products' | 'saas' | 'e_book' | 'edtech'`\n  - `updated_at: string`\n  - `addons?: string[]`\n  - `description?: string`\n  - `digital_product_delivery?: { external_url?: string; files?: { file_id: string; file_name: string; url: string; }[]; instructions?: string; }`\n  - `image?: string`\n  - `license_key_activation_message?: string`\n  - `license_key_activations_limit?: number`\n  - `license_key_duration?: { count: number; interval: 'Day' | 'Week' | 'Month' | 'Year'; }`\n  - `name?: string`\n  - `product_collection_id?: string`\n\n### Example\n\n```typescript\nimport DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments();\n\nconst product = await client.products.create({\n  name: 'name',\n  price: {\n  currency: 'AED',\n  discount: 0,\n  price: 0,\n  purchasing_power_parity: true,\n  type: 'one_time_price',\n},\n  tax_category: 'digital_products',\n});\n\nconsole.log(product);\n```",
    perLanguage: {
      cli: {
        method: 'products create',
        example:
          "dodo-payments-cli products create \\\n  --bearer-token 'My Bearer Token' \\\n  --name name \\\n  --price '{currency: AED, discount: 0, price: 0, purchasing_power_parity: true, type: one_time_price}' \\\n  --tax-category digital_products",
      },
      csharp: {
        method: 'Products.Create',
        example:
          'ProductCreateParams parameters = new()\n{\n    Name = "name",\n    Price = new OneTimePrice()\n    {\n        Currency = Currency.Aed,\n        Discount = 0,\n        Price = 0,\n        PurchasingPowerParity = true,\n        Type = Type.OneTimePrice,\n        PayWhatYouWant = true,\n        SuggestedPrice = 0,\n        TaxInclusive = true,\n    },\n    TaxCategory = TaxCategory.DigitalProducts,\n};\n\nvar product = await client.Products.Create(parameters);\n\nConsole.WriteLine(product);',
      },
      go: {
        method: 'client.Products.New',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/dodopayments/dodopayments-go"\n\t"github.com/dodopayments/dodopayments-go/option"\n)\n\nfunc main() {\n\tclient := dodopayments.NewClient(\n\t\toption.WithBearerToken("My Bearer Token"),\n\t)\n\tproduct, err := client.Products.New(context.TODO(), dodopayments.ProductNewParams{\n\t\tName: dodopayments.F("name"),\n\t\tPrice: dodopayments.F[dodopayments.PriceUnionParam](dodopayments.PriceOneTimePriceParam{\n\t\t\tCurrency:              dodopayments.F(dodopayments.CurrencyAed),\n\t\t\tDiscount:              dodopayments.F(int64(0)),\n\t\t\tPrice:                 dodopayments.F(int64(0)),\n\t\t\tPurchasingPowerParity: dodopayments.F(true),\n\t\t\tType:                  dodopayments.F(dodopayments.PriceOneTimePriceTypeOneTimePrice),\n\t\t}),\n\t\tTaxCategory: dodopayments.F(dodopayments.TaxCategoryDigitalProducts),\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", product.BrandID)\n}\n',
      },
      http: {
        example:
          'curl https://live.dodopayments.com/products \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $DODO_PAYMENTS_API_KEY" \\\n    -d \'{\n          "name": "name",\n          "price": {\n            "currency": "AED",\n            "discount": 0,\n            "price": 0,\n            "purchasing_power_parity": true,\n            "type": "one_time_price"\n          },\n          "tax_category": "digital_products"\n        }\'',
      },
      java: {
        method: 'products().create',
        example:
          'package com.dodopayments.api.example;\n\nimport com.dodopayments.api.client.DodoPaymentsClient;\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient;\nimport com.dodopayments.api.models.misc.Currency;\nimport com.dodopayments.api.models.misc.TaxCategory;\nimport com.dodopayments.api.models.products.Price;\nimport com.dodopayments.api.models.products.Product;\nimport com.dodopayments.api.models.products.ProductCreateParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        DodoPaymentsClient client = DodoPaymentsOkHttpClient.fromEnv();\n\n        ProductCreateParams params = ProductCreateParams.builder()\n            .name("name")\n            .price(Price.OneTimePrice.builder()\n                .currency(Currency.AED)\n                .discount(0L)\n                .price(0)\n                .purchasingPowerParity(true)\n                .type(Price.OneTimePrice.Type.ONE_TIME_PRICE)\n                .build())\n            .taxCategory(TaxCategory.DIGITAL_PRODUCTS)\n            .build();\n        Product product = client.products().create(params);\n    }\n}',
      },
      kotlin: {
        method: 'products().create',
        example:
          'package com.dodopayments.api.example\n\nimport com.dodopayments.api.client.DodoPaymentsClient\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient\nimport com.dodopayments.api.models.misc.Currency\nimport com.dodopayments.api.models.misc.TaxCategory\nimport com.dodopayments.api.models.products.Price\nimport com.dodopayments.api.models.products.Product\nimport com.dodopayments.api.models.products.ProductCreateParams\n\nfun main() {\n    val client: DodoPaymentsClient = DodoPaymentsOkHttpClient.fromEnv()\n\n    val params: ProductCreateParams = ProductCreateParams.builder()\n        .name("name")\n        .price(Price.OneTimePrice.builder()\n            .currency(Currency.AED)\n            .discount(0L)\n            .price(0)\n            .purchasingPowerParity(true)\n            .type(Price.OneTimePrice.Type.ONE_TIME_PRICE)\n            .build())\n        .taxCategory(TaxCategory.DIGITAL_PRODUCTS)\n        .build()\n    val product: Product = client.products().create(params)\n}',
      },
      php: {
        method: 'products->create',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(bearerToken: 'My Bearer Token', environment: 'test_mode');\n\n$product = $client->products->create(\n  name: 'name',\n  price: [\n    'currency' => Currency::AED,\n    'discount' => 0,\n    'price' => 0,\n    'purchasingPowerParity' => true,\n    'type' => 'one_time_price',\n    'payWhatYouWant' => true,\n    'suggestedPrice' => 0,\n    'taxInclusive' => true,\n  ],\n  taxCategory: TaxCategory::DIGITAL_PRODUCTS,\n  addons: ['string'],\n  brandID: 'brand_id',\n  creditEntitlements: [\n    [\n      'creditEntitlementID' => 'credit_entitlement_id',\n      'creditsAmount' => 'credits_amount',\n      'currency' => Currency::AED,\n      'expiresAfterDays' => 0,\n      'lowBalanceThresholdPercent' => 0,\n      'maxRolloverCount' => 0,\n      'overageBehavior' => CbbOverageBehavior::FORGIVE_AT_RESET,\n      'overageEnabled' => true,\n      'overageLimit' => 'overage_limit',\n      'pricePerUnit' => 'price_per_unit',\n      'prorationBehavior' => CbbProrationBehavior::PRORATE,\n      'rolloverEnabled' => true,\n      'rolloverPercentage' => 0,\n      'rolloverTimeframeCount' => 0,\n      'rolloverTimeframeInterval' => TimeInterval::DAY,\n      'trialCredits' => 'trial_credits',\n      'trialCreditsExpireAfterTrial' => true,\n    ],\n  ],\n  description: 'description',\n  digitalProductDelivery: [\n    'externalURL' => 'external_url', 'instructions' => 'instructions'\n  ],\n  entitlementIDs: ['string'],\n  licenseKeyActivationMessage: 'license_key_activation_message',\n  licenseKeyActivationsLimit: 0,\n  licenseKeyDuration: ['count' => 0, 'interval' => TimeInterval::DAY],\n  licenseKeyEnabled: true,\n  metadata: ['foo' => 'string'],\n);\n\nvar_dump($product);",
      },
      python: {
        method: 'products.create',
        example:
          'import os\nfrom dodopayments import DodoPayments\n\nclient = DodoPayments(\n    bearer_token=os.environ.get("DODO_PAYMENTS_API_KEY"),  # This is the default and can be omitted\n)\nproduct = client.products.create(\n    name="name",\n    price={\n        "currency": "AED",\n        "discount": 0,\n        "price": 0,\n        "purchasing_power_parity": True,\n        "type": "one_time_price",\n    },\n    tax_category="digital_products",\n)\nprint(product.brand_id)',
      },
      ruby: {
        method: 'products.create',
        example:
          'require "dodopayments"\n\ndodo_payments = Dodopayments::Client.new(\n  bearer_token: "My Bearer Token",\n  environment: "test_mode" # defaults to "live_mode"\n)\n\nproduct = dodo_payments.products.create(\n  name: "name",\n  price: {currency: :AED, discount: 0, price: 0, purchasing_power_parity: true, type: :one_time_price},\n  tax_category: :digital_products\n)\n\nputs(product)',
      },
      typescript: {
        method: 'client.products.create',
        example:
          "import DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments({\n  bearerToken: process.env['DODO_PAYMENTS_API_KEY'], // This is the default and can be omitted\n});\n\nconst product = await client.products.create({\n  name: 'name',\n  price: {\n    currency: 'AED',\n    discount: 0,\n    price: 0,\n    purchasing_power_parity: true,\n    type: 'one_time_price',\n  },\n  tax_category: 'digital_products',\n});\n\nconsole.log(product.brand_id);",
      },
    },
  },
  {
    name: 'retrieve',
    endpoint: '/products/{id}',
    httpMethod: 'get',
    summary: '',
    description: '',
    stainlessPath: '(resource) products > (method) retrieve',
    qualified: 'client.products.retrieve',
    params: ['id: string;'],
    response:
      "{ brand_id: string; business_id: string; created_at: string; credit_entitlements: object[]; entitlements: { id: string; integration_config: object | object | object | object | object | object | object | object; integration_type: 'discord' | 'telegram' | 'github' | 'figma' | 'framer' | 'notion' | 'digital_files' | 'license_key'; name: string; description?: string; }[]; is_recurring: boolean; license_key_enabled: boolean; metadata: object; price: object | object | object; product_id: string; tax_category: 'digital_products' | 'saas' | 'e_book' | 'edtech'; updated_at: string; addons?: string[]; description?: string; digital_product_delivery?: object; image?: string; license_key_activation_message?: string; license_key_activations_limit?: number; license_key_duration?: object; name?: string; product_collection_id?: string; }",
    markdown:
      "## retrieve\n\n`client.products.retrieve(id: string): { brand_id: string; business_id: string; created_at: string; credit_entitlements: credit_entitlement_mapping_response[]; entitlements: object[]; is_recurring: boolean; license_key_enabled: boolean; metadata: object; price: price; product_id: string; tax_category: tax_category; updated_at: string; addons?: string[]; description?: string; digital_product_delivery?: digital_product_delivery; image?: string; license_key_activation_message?: string; license_key_activations_limit?: number; license_key_duration?: license_key_duration; name?: string; product_collection_id?: string; }`\n\n**get** `/products/{id}`\n\n### Parameters\n\n- `id: string`\n\n### Returns\n\n- `{ brand_id: string; business_id: string; created_at: string; credit_entitlements: { id: string; credit_entitlement_id: string; credit_entitlement_name: string; credit_entitlement_unit: string; credits_amount: string; overage_behavior: cbb_overage_behavior; overage_enabled: boolean; proration_behavior: cbb_proration_behavior; rollover_enabled: boolean; trial_credits_expire_after_trial: boolean; currency?: currency; expires_after_days?: number; low_balance_threshold_percent?: number; max_rollover_count?: number; overage_limit?: string; price_per_unit?: string; rollover_percentage?: number; rollover_timeframe_count?: number; rollover_timeframe_interval?: time_interval; trial_credits?: string; }[]; entitlements: { id: string; integration_config: { permission: string; target_id: string; } | { guild_id: string; role_id?: string; } | { chat_id: string; } | { figma_file_id: string; } | { framer_template_id: string; } | { notion_template_id: string; } | { digital_file_ids: string[]; external_url?: string; instructions?: string; } | { activation_message?: string; activations_limit?: number; duration_count?: number; duration_interval?: string; }; integration_type: 'discord' | 'telegram' | 'github' | 'figma' | 'framer' | 'notion' | 'digital_files' | 'license_key'; name: string; description?: string; }[]; is_recurring: boolean; license_key_enabled: boolean; metadata: object; price: { currency: currency; discount: number; price: number; purchasing_power_parity: boolean; type: 'one_time_price'; pay_what_you_want?: boolean; suggested_price?: number; tax_inclusive?: boolean; } | { currency: currency; discount: number; payment_frequency_count: number; payment_frequency_interval: time_interval; price: number; purchasing_power_parity: boolean; subscription_period_count: number; subscription_period_interval: time_interval; type: 'recurring_price'; tax_inclusive?: boolean; trial_period_days?: number; } | { currency: currency; discount: number; fixed_price: number; payment_frequency_count: number; payment_frequency_interval: time_interval; purchasing_power_parity: boolean; subscription_period_count: number; subscription_period_interval: time_interval; type: 'usage_based_price'; meters?: add_meter_to_price[]; tax_inclusive?: boolean; }; product_id: string; tax_category: 'digital_products' | 'saas' | 'e_book' | 'edtech'; updated_at: string; addons?: string[]; description?: string; digital_product_delivery?: { external_url?: string; files?: digital_product_delivery_file[]; instructions?: string; }; image?: string; license_key_activation_message?: string; license_key_activations_limit?: number; license_key_duration?: { count: number; interval: time_interval; }; name?: string; product_collection_id?: string; }`\n\n  - `brand_id: string`\n  - `business_id: string`\n  - `created_at: string`\n  - `credit_entitlements: { id: string; credit_entitlement_id: string; credit_entitlement_name: string; credit_entitlement_unit: string; credits_amount: string; overage_behavior: 'forgive_at_reset' | 'invoice_at_billing' | 'carry_deficit' | 'carry_deficit_auto_repay'; overage_enabled: boolean; proration_behavior: 'prorate' | 'no_prorate'; rollover_enabled: boolean; trial_credits_expire_after_trial: boolean; currency?: string; expires_after_days?: number; low_balance_threshold_percent?: number; max_rollover_count?: number; overage_limit?: string; price_per_unit?: string; rollover_percentage?: number; rollover_timeframe_count?: number; rollover_timeframe_interval?: 'Day' | 'Week' | 'Month' | 'Year'; trial_credits?: string; }[]`\n  - `entitlements: { id: string; integration_config: { permission: string; target_id: string; } | { guild_id: string; role_id?: string; } | { chat_id: string; } | { figma_file_id: string; } | { framer_template_id: string; } | { notion_template_id: string; } | { digital_file_ids: string[]; external_url?: string; instructions?: string; } | { activation_message?: string; activations_limit?: number; duration_count?: number; duration_interval?: string; }; integration_type: 'discord' | 'telegram' | 'github' | 'figma' | 'framer' | 'notion' | 'digital_files' | 'license_key'; name: string; description?: string; }[]`\n  - `is_recurring: boolean`\n  - `license_key_enabled: boolean`\n  - `metadata: object`\n  - `price: { currency: string; discount: number; price: number; purchasing_power_parity: boolean; type: 'one_time_price'; pay_what_you_want?: boolean; suggested_price?: number; tax_inclusive?: boolean; } | { currency: string; discount: number; payment_frequency_count: number; payment_frequency_interval: 'Day' | 'Week' | 'Month' | 'Year'; price: number; purchasing_power_parity: boolean; subscription_period_count: number; subscription_period_interval: 'Day' | 'Week' | 'Month' | 'Year'; type: 'recurring_price'; tax_inclusive?: boolean; trial_period_days?: number; } | { currency: string; discount: number; fixed_price: number; payment_frequency_count: number; payment_frequency_interval: 'Day' | 'Week' | 'Month' | 'Year'; purchasing_power_parity: boolean; subscription_period_count: number; subscription_period_interval: 'Day' | 'Week' | 'Month' | 'Year'; type: 'usage_based_price'; meters?: { meter_id: string; credit_entitlement_id?: string; description?: string; free_threshold?: number; measurement_unit?: string; meter_units_per_credit?: string; name?: string; price_per_unit?: string; }[]; tax_inclusive?: boolean; }`\n  - `product_id: string`\n  - `tax_category: 'digital_products' | 'saas' | 'e_book' | 'edtech'`\n  - `updated_at: string`\n  - `addons?: string[]`\n  - `description?: string`\n  - `digital_product_delivery?: { external_url?: string; files?: { file_id: string; file_name: string; url: string; }[]; instructions?: string; }`\n  - `image?: string`\n  - `license_key_activation_message?: string`\n  - `license_key_activations_limit?: number`\n  - `license_key_duration?: { count: number; interval: 'Day' | 'Week' | 'Month' | 'Year'; }`\n  - `name?: string`\n  - `product_collection_id?: string`\n\n### Example\n\n```typescript\nimport DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments();\n\nconst product = await client.products.retrieve('id');\n\nconsole.log(product);\n```",
    perLanguage: {
      cli: {
        method: 'products retrieve',
        example: "dodo-payments-cli products retrieve \\\n  --bearer-token 'My Bearer Token' \\\n  --id id",
      },
      csharp: {
        method: 'Products.Retrieve',
        example:
          'ProductRetrieveParams parameters = new() { ID = "id" };\n\nvar product = await client.Products.Retrieve(parameters);\n\nConsole.WriteLine(product);',
      },
      go: {
        method: 'client.Products.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/dodopayments/dodopayments-go"\n\t"github.com/dodopayments/dodopayments-go/option"\n)\n\nfunc main() {\n\tclient := dodopayments.NewClient(\n\t\toption.WithBearerToken("My Bearer Token"),\n\t)\n\tproduct, err := client.Products.Get(context.TODO(), "id")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", product.BrandID)\n}\n',
      },
      http: {
        example:
          'curl https://live.dodopayments.com/products/$ID \\\n    -H "Authorization: Bearer $DODO_PAYMENTS_API_KEY"',
      },
      java: {
        method: 'products().retrieve',
        example:
          'package com.dodopayments.api.example;\n\nimport com.dodopayments.api.client.DodoPaymentsClient;\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient;\nimport com.dodopayments.api.models.products.Product;\nimport com.dodopayments.api.models.products.ProductRetrieveParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        DodoPaymentsClient client = DodoPaymentsOkHttpClient.fromEnv();\n\n        Product product = client.products().retrieve("id");\n    }\n}',
      },
      kotlin: {
        method: 'products().retrieve',
        example:
          'package com.dodopayments.api.example\n\nimport com.dodopayments.api.client.DodoPaymentsClient\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient\nimport com.dodopayments.api.models.products.Product\nimport com.dodopayments.api.models.products.ProductRetrieveParams\n\nfun main() {\n    val client: DodoPaymentsClient = DodoPaymentsOkHttpClient.fromEnv()\n\n    val product: Product = client.products().retrieve("id")\n}',
      },
      php: {
        method: 'products->retrieve',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(bearerToken: 'My Bearer Token', environment: 'test_mode');\n\n$product = $client->products->retrieve('id');\n\nvar_dump($product);",
      },
      python: {
        method: 'products.retrieve',
        example:
          'import os\nfrom dodopayments import DodoPayments\n\nclient = DodoPayments(\n    bearer_token=os.environ.get("DODO_PAYMENTS_API_KEY"),  # This is the default and can be omitted\n)\nproduct = client.products.retrieve(\n    "id",\n)\nprint(product.brand_id)',
      },
      ruby: {
        method: 'products.retrieve',
        example:
          'require "dodopayments"\n\ndodo_payments = Dodopayments::Client.new(\n  bearer_token: "My Bearer Token",\n  environment: "test_mode" # defaults to "live_mode"\n)\n\nproduct = dodo_payments.products.retrieve("id")\n\nputs(product)',
      },
      typescript: {
        method: 'client.products.retrieve',
        example:
          "import DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments({\n  bearerToken: process.env['DODO_PAYMENTS_API_KEY'], // This is the default and can be omitted\n});\n\nconst product = await client.products.retrieve('id');\n\nconsole.log(product.brand_id);",
      },
    },
  },
  {
    name: 'update',
    endpoint: '/products/{id}',
    httpMethod: 'patch',
    summary: '',
    description: '',
    stainlessPath: '(resource) products > (method) update',
    qualified: 'client.products.update',
    params: [
      'id: string;',
      'addons?: string[];',
      'brand_id?: string;',
      "credit_entitlements?: { credit_entitlement_id: string; credits_amount: string; currency?: string; expires_after_days?: number; low_balance_threshold_percent?: number; max_rollover_count?: number; overage_behavior?: 'forgive_at_reset' | 'invoice_at_billing' | 'carry_deficit' | 'carry_deficit_auto_repay'; overage_enabled?: boolean; overage_limit?: string; price_per_unit?: string; proration_behavior?: 'prorate' | 'no_prorate'; rollover_enabled?: boolean; rollover_percentage?: number; rollover_timeframe_count?: number; rollover_timeframe_interval?: 'Day' | 'Week' | 'Month' | 'Year'; trial_credits?: string; trial_credits_expire_after_trial?: boolean; }[];",
      'description?: string;',
      'digital_product_delivery?: { external_url?: string; files?: string[]; instructions?: string; };',
      'entitlement_ids?: string[];',
      'image_id?: string;',
      'license_key_activation_message?: string;',
      'license_key_activations_limit?: number;',
      "license_key_duration?: { count: number; interval: 'Day' | 'Week' | 'Month' | 'Year'; };",
      'license_key_enabled?: boolean;',
      'metadata?: object;',
      'name?: string;',
      "price?: { currency: string; discount: number; price: number; purchasing_power_parity: boolean; type: 'one_time_price'; pay_what_you_want?: boolean; suggested_price?: number; tax_inclusive?: boolean; } | { currency: string; discount: number; payment_frequency_count: number; payment_frequency_interval: 'Day' | 'Week' | 'Month' | 'Year'; price: number; purchasing_power_parity: boolean; subscription_period_count: number; subscription_period_interval: 'Day' | 'Week' | 'Month' | 'Year'; type: 'recurring_price'; tax_inclusive?: boolean; trial_period_days?: number; } | { currency: string; discount: number; fixed_price: number; payment_frequency_count: number; payment_frequency_interval: 'Day' | 'Week' | 'Month' | 'Year'; purchasing_power_parity: boolean; subscription_period_count: number; subscription_period_interval: 'Day' | 'Week' | 'Month' | 'Year'; type: 'usage_based_price'; meters?: { meter_id: string; credit_entitlement_id?: string; description?: string; free_threshold?: number; measurement_unit?: string; meter_units_per_credit?: string; name?: string; price_per_unit?: string; }[]; tax_inclusive?: boolean; };",
      "tax_category?: 'digital_products' | 'saas' | 'e_book' | 'edtech';",
    ],
    markdown:
      "## update\n\n`client.products.update(id: string, addons?: string[], brand_id?: string, credit_entitlements?: { credit_entitlement_id: string; credits_amount: string; currency?: currency; expires_after_days?: number; low_balance_threshold_percent?: number; max_rollover_count?: number; overage_behavior?: cbb_overage_behavior; overage_enabled?: boolean; overage_limit?: string; price_per_unit?: string; proration_behavior?: cbb_proration_behavior; rollover_enabled?: boolean; rollover_percentage?: number; rollover_timeframe_count?: number; rollover_timeframe_interval?: time_interval; trial_credits?: string; trial_credits_expire_after_trial?: boolean; }[], description?: string, digital_product_delivery?: { external_url?: string; files?: string[]; instructions?: string; }, entitlement_ids?: string[], image_id?: string, license_key_activation_message?: string, license_key_activations_limit?: number, license_key_duration?: { count: number; interval: time_interval; }, license_key_enabled?: boolean, metadata?: object, name?: string, price?: { currency: currency; discount: number; price: number; purchasing_power_parity: boolean; type: 'one_time_price'; pay_what_you_want?: boolean; suggested_price?: number; tax_inclusive?: boolean; } | { currency: currency; discount: number; payment_frequency_count: number; payment_frequency_interval: time_interval; price: number; purchasing_power_parity: boolean; subscription_period_count: number; subscription_period_interval: time_interval; type: 'recurring_price'; tax_inclusive?: boolean; trial_period_days?: number; } | { currency: currency; discount: number; fixed_price: number; payment_frequency_count: number; payment_frequency_interval: time_interval; purchasing_power_parity: boolean; subscription_period_count: number; subscription_period_interval: time_interval; type: 'usage_based_price'; meters?: add_meter_to_price[]; tax_inclusive?: boolean; }, tax_category?: 'digital_products' | 'saas' | 'e_book' | 'edtech'): void`\n\n**patch** `/products/{id}`\n\n### Parameters\n\n- `id: string`\n\n- `addons?: string[]`\n  Available Addons for subscription products\n\n- `brand_id?: string`\n\n- `credit_entitlements?: { credit_entitlement_id: string; credits_amount: string; currency?: string; expires_after_days?: number; low_balance_threshold_percent?: number; max_rollover_count?: number; overage_behavior?: 'forgive_at_reset' | 'invoice_at_billing' | 'carry_deficit' | 'carry_deficit_auto_repay'; overage_enabled?: boolean; overage_limit?: string; price_per_unit?: string; proration_behavior?: 'prorate' | 'no_prorate'; rollover_enabled?: boolean; rollover_percentage?: number; rollover_timeframe_count?: number; rollover_timeframe_interval?: 'Day' | 'Week' | 'Month' | 'Year'; trial_credits?: string; trial_credits_expire_after_trial?: boolean; }[]`\n  Credit entitlements to update (replaces all existing when present)\nSend empty array to remove all, omit field to leave unchanged\n\n- `description?: string`\n  Description of the product, optional and must be at most 1000 characters.\n\n- `digital_product_delivery?: { external_url?: string; files?: string[]; instructions?: string; }`\n  Choose how you would like you digital product delivered\n  - `external_url?: string`\n    External URL to digital product\n  - `files?: string[]`\n    Uploaded files ids of digital product\n  - `instructions?: string`\n    Instructions to download and use the digital product\n\n- `entitlement_ids?: string[]`\n  Entitlement IDs to attach (replaces all existing when present)\nSend empty array to remove all, omit field to leave unchanged\n\n- `image_id?: string`\n  Product image id after its uploaded to S3\n\n- `license_key_activation_message?: string`\n  Message sent to the customer upon license key activation.\n\nOnly applicable if `license_key_enabled` is `true`. This message contains instructions for\nactivating the license key.\n\n- `license_key_activations_limit?: number`\n  Limit for the number of activations for the license key.\n\nOnly applicable if `license_key_enabled` is `true`. Represents the maximum number of times\nthe license key can be activated.\n\n- `license_key_duration?: { count: number; interval: 'Day' | 'Week' | 'Month' | 'Year'; }`\n  Duration of the license key if enabled.\n\nOnly applicable if `license_key_enabled` is `true`. Represents the duration in days for which\nthe license key is valid.\n  - `count: number`\n  - `interval: 'Day' | 'Week' | 'Month' | 'Year'`\n\n- `license_key_enabled?: boolean`\n  Whether the product requires a license key.\n\nIf `true`, additional fields related to license key (duration, activations limit, activation message)\nbecome applicable.\n\n- `metadata?: object`\n  Additional metadata for the product\n\n- `name?: string`\n  Name of the product, optional and must be at most 100 characters.\n\n- `price?: { currency: string; discount: number; price: number; purchasing_power_parity: boolean; type: 'one_time_price'; pay_what_you_want?: boolean; suggested_price?: number; tax_inclusive?: boolean; } | { currency: string; discount: number; payment_frequency_count: number; payment_frequency_interval: 'Day' | 'Week' | 'Month' | 'Year'; price: number; purchasing_power_parity: boolean; subscription_period_count: number; subscription_period_interval: 'Day' | 'Week' | 'Month' | 'Year'; type: 'recurring_price'; tax_inclusive?: boolean; trial_period_days?: number; } | { currency: string; discount: number; fixed_price: number; payment_frequency_count: number; payment_frequency_interval: 'Day' | 'Week' | 'Month' | 'Year'; purchasing_power_parity: boolean; subscription_period_count: number; subscription_period_interval: 'Day' | 'Week' | 'Month' | 'Year'; type: 'usage_based_price'; meters?: { meter_id: string; credit_entitlement_id?: string; description?: string; free_threshold?: number; measurement_unit?: string; meter_units_per_credit?: string; name?: string; price_per_unit?: string; }[]; tax_inclusive?: boolean; }`\n  Price details of the product.\n\n- `tax_category?: 'digital_products' | 'saas' | 'e_book' | 'edtech'`\n  Tax category of the product.\n\n### Example\n\n```typescript\nimport DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments();\n\nawait client.products.update('id')\n```",
    perLanguage: {
      cli: {
        method: 'products update',
        example: "dodo-payments-cli products update \\\n  --bearer-token 'My Bearer Token' \\\n  --id id",
      },
      csharp: {
        method: 'Products.Update',
        example:
          'ProductUpdateParams parameters = new() { ID = "id" };\n\nawait client.Products.Update(parameters);',
      },
      go: {
        method: 'client.Products.Update',
        example:
          'package main\n\nimport (\n\t"context"\n\n\t"github.com/dodopayments/dodopayments-go"\n\t"github.com/dodopayments/dodopayments-go/option"\n)\n\nfunc main() {\n\tclient := dodopayments.NewClient(\n\t\toption.WithBearerToken("My Bearer Token"),\n\t)\n\terr := client.Products.Update(\n\t\tcontext.TODO(),\n\t\t"id",\n\t\tdodopayments.ProductUpdateParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
      http: {
        example:
          "curl https://live.dodopayments.com/products/$ID \\\n    -X PATCH \\\n    -H 'Content-Type: application/json' \\\n    -H \"Authorization: Bearer $DODO_PAYMENTS_API_KEY\" \\\n    -d '{}'",
      },
      java: {
        method: 'products().update',
        example:
          'package com.dodopayments.api.example;\n\nimport com.dodopayments.api.client.DodoPaymentsClient;\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient;\nimport com.dodopayments.api.models.products.ProductUpdateParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        DodoPaymentsClient client = DodoPaymentsOkHttpClient.fromEnv();\n\n        client.products().update("id");\n    }\n}',
      },
      kotlin: {
        method: 'products().update',
        example:
          'package com.dodopayments.api.example\n\nimport com.dodopayments.api.client.DodoPaymentsClient\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient\nimport com.dodopayments.api.models.products.ProductUpdateParams\n\nfun main() {\n    val client: DodoPaymentsClient = DodoPaymentsOkHttpClient.fromEnv()\n\n    client.products().update("id")\n}',
      },
      php: {
        method: 'products->update',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(bearerToken: 'My Bearer Token', environment: 'test_mode');\n\n$result = $client->products->update(\n  'id',\n  addons: ['string'],\n  brandID: 'brand_id',\n  creditEntitlements: [\n    [\n      'creditEntitlementID' => 'credit_entitlement_id',\n      'creditsAmount' => 'credits_amount',\n      'currency' => Currency::AED,\n      'expiresAfterDays' => 0,\n      'lowBalanceThresholdPercent' => 0,\n      'maxRolloverCount' => 0,\n      'overageBehavior' => CbbOverageBehavior::FORGIVE_AT_RESET,\n      'overageEnabled' => true,\n      'overageLimit' => 'overage_limit',\n      'pricePerUnit' => 'price_per_unit',\n      'prorationBehavior' => CbbProrationBehavior::PRORATE,\n      'rolloverEnabled' => true,\n      'rolloverPercentage' => 0,\n      'rolloverTimeframeCount' => 0,\n      'rolloverTimeframeInterval' => TimeInterval::DAY,\n      'trialCredits' => 'trial_credits',\n      'trialCreditsExpireAfterTrial' => true,\n    ],\n  ],\n  description: 'description',\n  digitalProductDelivery: [\n    'externalURL' => 'external_url',\n    'files' => ['182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e'],\n    'instructions' => 'instructions',\n  ],\n  entitlementIDs: ['string'],\n  imageID: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',\n  licenseKeyActivationMessage: 'license_key_activation_message',\n  licenseKeyActivationsLimit: 0,\n  licenseKeyDuration: ['count' => 0, 'interval' => TimeInterval::DAY],\n  licenseKeyEnabled: true,\n  metadata: ['foo' => 'string'],\n  name: 'name',\n  price: [\n    'currency' => Currency::AED,\n    'discount' => 0,\n    'price' => 0,\n    'purchasingPowerParity' => true,\n    'type' => 'one_time_price',\n    'payWhatYouWant' => true,\n    'suggestedPrice' => 0,\n    'taxInclusive' => true,\n  ],\n  taxCategory: TaxCategory::DIGITAL_PRODUCTS,\n);\n\nvar_dump($result);",
      },
      python: {
        method: 'products.update',
        example:
          'import os\nfrom dodopayments import DodoPayments\n\nclient = DodoPayments(\n    bearer_token=os.environ.get("DODO_PAYMENTS_API_KEY"),  # This is the default and can be omitted\n)\nclient.products.update(\n    id="id",\n)',
      },
      ruby: {
        method: 'products.update',
        example:
          'require "dodopayments"\n\ndodo_payments = Dodopayments::Client.new(\n  bearer_token: "My Bearer Token",\n  environment: "test_mode" # defaults to "live_mode"\n)\n\nresult = dodo_payments.products.update("id")\n\nputs(result)',
      },
      typescript: {
        method: 'client.products.update',
        example:
          "import DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments({\n  bearerToken: process.env['DODO_PAYMENTS_API_KEY'], // This is the default and can be omitted\n});\n\nawait client.products.update('id');",
      },
    },
  },
  {
    name: 'archive',
    endpoint: '/products/{id}',
    httpMethod: 'delete',
    summary: '',
    description: '',
    stainlessPath: '(resource) products > (method) archive',
    qualified: 'client.products.archive',
    params: ['id: string;'],
    markdown:
      "## archive\n\n`client.products.archive(id: string): void`\n\n**delete** `/products/{id}`\n\n### Parameters\n\n- `id: string`\n\n### Example\n\n```typescript\nimport DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments();\n\nawait client.products.archive('id')\n```",
    perLanguage: {
      cli: {
        method: 'products archive',
        example: "dodo-payments-cli products archive \\\n  --bearer-token 'My Bearer Token' \\\n  --id id",
      },
      csharp: {
        method: 'Products.Archive',
        example:
          'ProductArchiveParams parameters = new() { ID = "id" };\n\nawait client.Products.Archive(parameters);',
      },
      go: {
        method: 'client.Products.Archive',
        example:
          'package main\n\nimport (\n\t"context"\n\n\t"github.com/dodopayments/dodopayments-go"\n\t"github.com/dodopayments/dodopayments-go/option"\n)\n\nfunc main() {\n\tclient := dodopayments.NewClient(\n\t\toption.WithBearerToken("My Bearer Token"),\n\t)\n\terr := client.Products.Archive(context.TODO(), "id")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
      http: {
        example:
          'curl https://live.dodopayments.com/products/$ID \\\n    -X DELETE \\\n    -H "Authorization: Bearer $DODO_PAYMENTS_API_KEY"',
      },
      java: {
        method: 'products().archive',
        example:
          'package com.dodopayments.api.example;\n\nimport com.dodopayments.api.client.DodoPaymentsClient;\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient;\nimport com.dodopayments.api.models.products.ProductArchiveParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        DodoPaymentsClient client = DodoPaymentsOkHttpClient.fromEnv();\n\n        client.products().archive("id");\n    }\n}',
      },
      kotlin: {
        method: 'products().archive',
        example:
          'package com.dodopayments.api.example\n\nimport com.dodopayments.api.client.DodoPaymentsClient\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient\nimport com.dodopayments.api.models.products.ProductArchiveParams\n\nfun main() {\n    val client: DodoPaymentsClient = DodoPaymentsOkHttpClient.fromEnv()\n\n    client.products().archive("id")\n}',
      },
      php: {
        method: 'products->archive',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(bearerToken: 'My Bearer Token', environment: 'test_mode');\n\n$result = $client->products->archive('id');\n\nvar_dump($result);",
      },
      python: {
        method: 'products.archive',
        example:
          'import os\nfrom dodopayments import DodoPayments\n\nclient = DodoPayments(\n    bearer_token=os.environ.get("DODO_PAYMENTS_API_KEY"),  # This is the default and can be omitted\n)\nclient.products.archive(\n    "id",\n)',
      },
      ruby: {
        method: 'products.archive',
        example:
          'require "dodopayments"\n\ndodo_payments = Dodopayments::Client.new(\n  bearer_token: "My Bearer Token",\n  environment: "test_mode" # defaults to "live_mode"\n)\n\nresult = dodo_payments.products.archive("id")\n\nputs(result)',
      },
      typescript: {
        method: 'client.products.archive',
        example:
          "import DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments({\n  bearerToken: process.env['DODO_PAYMENTS_API_KEY'], // This is the default and can be omitted\n});\n\nawait client.products.archive('id');",
      },
    },
  },
  {
    name: 'unarchive',
    endpoint: '/products/{id}/unarchive',
    httpMethod: 'post',
    summary: '',
    description: '',
    stainlessPath: '(resource) products > (method) unarchive',
    qualified: 'client.products.unarchive',
    params: ['id: string;'],
    markdown:
      "## unarchive\n\n`client.products.unarchive(id: string): void`\n\n**post** `/products/{id}/unarchive`\n\n### Parameters\n\n- `id: string`\n\n### Example\n\n```typescript\nimport DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments();\n\nawait client.products.unarchive('id')\n```",
    perLanguage: {
      cli: {
        method: 'products unarchive',
        example: "dodo-payments-cli products unarchive \\\n  --bearer-token 'My Bearer Token' \\\n  --id id",
      },
      csharp: {
        method: 'Products.Unarchive',
        example:
          'ProductUnarchiveParams parameters = new() { ID = "id" };\n\nawait client.Products.Unarchive(parameters);',
      },
      go: {
        method: 'client.Products.Unarchive',
        example:
          'package main\n\nimport (\n\t"context"\n\n\t"github.com/dodopayments/dodopayments-go"\n\t"github.com/dodopayments/dodopayments-go/option"\n)\n\nfunc main() {\n\tclient := dodopayments.NewClient(\n\t\toption.WithBearerToken("My Bearer Token"),\n\t)\n\terr := client.Products.Unarchive(context.TODO(), "id")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
      http: {
        example:
          'curl https://live.dodopayments.com/products/$ID/unarchive \\\n    -X POST \\\n    -H "Authorization: Bearer $DODO_PAYMENTS_API_KEY"',
      },
      java: {
        method: 'products().unarchive',
        example:
          'package com.dodopayments.api.example;\n\nimport com.dodopayments.api.client.DodoPaymentsClient;\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient;\nimport com.dodopayments.api.models.products.ProductUnarchiveParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        DodoPaymentsClient client = DodoPaymentsOkHttpClient.fromEnv();\n\n        client.products().unarchive("id");\n    }\n}',
      },
      kotlin: {
        method: 'products().unarchive',
        example:
          'package com.dodopayments.api.example\n\nimport com.dodopayments.api.client.DodoPaymentsClient\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient\nimport com.dodopayments.api.models.products.ProductUnarchiveParams\n\nfun main() {\n    val client: DodoPaymentsClient = DodoPaymentsOkHttpClient.fromEnv()\n\n    client.products().unarchive("id")\n}',
      },
      php: {
        method: 'products->unarchive',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(bearerToken: 'My Bearer Token', environment: 'test_mode');\n\n$result = $client->products->unarchive('id');\n\nvar_dump($result);",
      },
      python: {
        method: 'products.unarchive',
        example:
          'import os\nfrom dodopayments import DodoPayments\n\nclient = DodoPayments(\n    bearer_token=os.environ.get("DODO_PAYMENTS_API_KEY"),  # This is the default and can be omitted\n)\nclient.products.unarchive(\n    "id",\n)',
      },
      ruby: {
        method: 'products.unarchive',
        example:
          'require "dodopayments"\n\ndodo_payments = Dodopayments::Client.new(\n  bearer_token: "My Bearer Token",\n  environment: "test_mode" # defaults to "live_mode"\n)\n\nresult = dodo_payments.products.unarchive("id")\n\nputs(result)',
      },
      typescript: {
        method: 'client.products.unarchive',
        example:
          "import DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments({\n  bearerToken: process.env['DODO_PAYMENTS_API_KEY'], // This is the default and can be omitted\n});\n\nawait client.products.unarchive('id');",
      },
    },
  },
  {
    name: 'update_files',
    endpoint: '/products/{id}/files',
    httpMethod: 'put',
    summary: '',
    description: '',
    stainlessPath: '(resource) products > (method) update_files',
    qualified: 'client.products.updateFiles',
    params: ['id: string;', 'file_name: string;'],
    response: '{ file_id: string; url: string; }',
    markdown:
      "## update_files\n\n`client.products.updateFiles(id: string, file_name: string): { file_id: string; url: string; }`\n\n**put** `/products/{id}/files`\n\n### Parameters\n\n- `id: string`\n\n- `file_name: string`\n\n### Returns\n\n- `{ file_id: string; url: string; }`\n\n  - `file_id: string`\n  - `url: string`\n\n### Example\n\n```typescript\nimport DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments();\n\nconst response = await client.products.updateFiles('id', { file_name: 'file_name' });\n\nconsole.log(response);\n```",
    perLanguage: {
      cli: {
        method: 'products update_files',
        example:
          "dodo-payments-cli products update-files \\\n  --bearer-token 'My Bearer Token' \\\n  --id id \\\n  --file-name file_name",
      },
      csharp: {
        method: 'Products.UpdateFiles',
        example:
          'ProductUpdateFilesParams parameters = new()\n{\n    ID = "id",\n    FileName = "file_name",\n};\n\nvar response = await client.Products.UpdateFiles(parameters);\n\nConsole.WriteLine(response);',
      },
      go: {
        method: 'client.Products.UpdateFiles',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/dodopayments/dodopayments-go"\n\t"github.com/dodopayments/dodopayments-go/option"\n)\n\nfunc main() {\n\tclient := dodopayments.NewClient(\n\t\toption.WithBearerToken("My Bearer Token"),\n\t)\n\tresponse, err := client.Products.UpdateFiles(\n\t\tcontext.TODO(),\n\t\t"id",\n\t\tdodopayments.ProductUpdateFilesParams{\n\t\t\tFileName: dodopayments.F("file_name"),\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.FileID)\n}\n',
      },
      http: {
        example:
          'curl https://live.dodopayments.com/products/$ID/files \\\n    -X PUT \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $DODO_PAYMENTS_API_KEY" \\\n    -d \'{\n          "file_name": "file_name"\n        }\'',
      },
      java: {
        method: 'products().updateFiles',
        example:
          'package com.dodopayments.api.example;\n\nimport com.dodopayments.api.client.DodoPaymentsClient;\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient;\nimport com.dodopayments.api.models.products.ProductUpdateFilesParams;\nimport com.dodopayments.api.models.products.ProductUpdateFilesResponse;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        DodoPaymentsClient client = DodoPaymentsOkHttpClient.fromEnv();\n\n        ProductUpdateFilesParams params = ProductUpdateFilesParams.builder()\n            .id("id")\n            .fileName("file_name")\n            .build();\n        ProductUpdateFilesResponse response = client.products().updateFiles(params);\n    }\n}',
      },
      kotlin: {
        method: 'products().updateFiles',
        example:
          'package com.dodopayments.api.example\n\nimport com.dodopayments.api.client.DodoPaymentsClient\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient\nimport com.dodopayments.api.models.products.ProductUpdateFilesParams\nimport com.dodopayments.api.models.products.ProductUpdateFilesResponse\n\nfun main() {\n    val client: DodoPaymentsClient = DodoPaymentsOkHttpClient.fromEnv()\n\n    val params: ProductUpdateFilesParams = ProductUpdateFilesParams.builder()\n        .id("id")\n        .fileName("file_name")\n        .build()\n    val response: ProductUpdateFilesResponse = client.products().updateFiles(params)\n}',
      },
      php: {
        method: 'products->updateFiles',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(bearerToken: 'My Bearer Token', environment: 'test_mode');\n\n$response = $client->products->updateFiles('id', fileName: 'file_name');\n\nvar_dump($response);",
      },
      python: {
        method: 'products.update_files',
        example:
          'import os\nfrom dodopayments import DodoPayments\n\nclient = DodoPayments(\n    bearer_token=os.environ.get("DODO_PAYMENTS_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.products.update_files(\n    id="id",\n    file_name="file_name",\n)\nprint(response.file_id)',
      },
      ruby: {
        method: 'products.update_files',
        example:
          'require "dodopayments"\n\ndodo_payments = Dodopayments::Client.new(\n  bearer_token: "My Bearer Token",\n  environment: "test_mode" # defaults to "live_mode"\n)\n\nresponse = dodo_payments.products.update_files("id", file_name: "file_name")\n\nputs(response)',
      },
      typescript: {
        method: 'client.products.updateFiles',
        example:
          "import DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments({\n  bearerToken: process.env['DODO_PAYMENTS_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.products.updateFiles('id', { file_name: 'file_name' });\n\nconsole.log(response.file_id);",
      },
    },
  },
  {
    name: 'update',
    endpoint: '/products/{id}/images',
    httpMethod: 'put',
    summary: '',
    description: '',
    stainlessPath: '(resource) products.images > (method) update',
    qualified: 'client.products.images.update',
    params: ['id: string;', 'force_update?: boolean;'],
    response: '{ url: string; image_id?: string; }',
    markdown:
      "## update\n\n`client.products.images.update(id: string, force_update?: boolean): { url: string; image_id?: string; }`\n\n**put** `/products/{id}/images`\n\n### Parameters\n\n- `id: string`\n\n- `force_update?: boolean`\n\n### Returns\n\n- `{ url: string; image_id?: string; }`\n\n  - `url: string`\n  - `image_id?: string`\n\n### Example\n\n```typescript\nimport DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments();\n\nconst image = await client.products.images.update('id');\n\nconsole.log(image);\n```",
    perLanguage: {
      cli: {
        method: 'images update',
        example:
          "dodo-payments-cli products:images update \\\n  --bearer-token 'My Bearer Token' \\\n  --id id",
      },
      csharp: {
        method: 'Products.Images.Update',
        example:
          'ImageUpdateParams parameters = new() { ID = "id" };\n\nvar image = await client.Products.Images.Update(parameters);\n\nConsole.WriteLine(image);',
      },
      go: {
        method: 'client.Products.Images.Update',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/dodopayments/dodopayments-go"\n\t"github.com/dodopayments/dodopayments-go/option"\n)\n\nfunc main() {\n\tclient := dodopayments.NewClient(\n\t\toption.WithBearerToken("My Bearer Token"),\n\t)\n\timage, err := client.Products.Images.Update(\n\t\tcontext.TODO(),\n\t\t"id",\n\t\tdodopayments.ProductImageUpdateParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", image.ImageID)\n}\n',
      },
      http: {
        example:
          'curl https://live.dodopayments.com/products/$ID/images \\\n    -X PUT \\\n    -H "Authorization: Bearer $DODO_PAYMENTS_API_KEY"',
      },
      java: {
        method: 'products().images().update',
        example:
          'package com.dodopayments.api.example;\n\nimport com.dodopayments.api.client.DodoPaymentsClient;\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient;\nimport com.dodopayments.api.models.products.images.ImageUpdateParams;\nimport com.dodopayments.api.models.products.images.ImageUpdateResponse;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        DodoPaymentsClient client = DodoPaymentsOkHttpClient.fromEnv();\n\n        ImageUpdateResponse image = client.products().images().update("id");\n    }\n}',
      },
      kotlin: {
        method: 'products().images().update',
        example:
          'package com.dodopayments.api.example\n\nimport com.dodopayments.api.client.DodoPaymentsClient\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient\nimport com.dodopayments.api.models.products.images.ImageUpdateParams\nimport com.dodopayments.api.models.products.images.ImageUpdateResponse\n\nfun main() {\n    val client: DodoPaymentsClient = DodoPaymentsOkHttpClient.fromEnv()\n\n    val image: ImageUpdateResponse = client.products().images().update("id")\n}',
      },
      php: {
        method: 'products->images->update',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(bearerToken: 'My Bearer Token', environment: 'test_mode');\n\n$image = $client->products->images->update('id', forceUpdate: true);\n\nvar_dump($image);",
      },
      python: {
        method: 'products.images.update',
        example:
          'import os\nfrom dodopayments import DodoPayments\n\nclient = DodoPayments(\n    bearer_token=os.environ.get("DODO_PAYMENTS_API_KEY"),  # This is the default and can be omitted\n)\nimage = client.products.images.update(\n    id="id",\n)\nprint(image.image_id)',
      },
      ruby: {
        method: 'products.images.update',
        example:
          'require "dodopayments"\n\ndodo_payments = Dodopayments::Client.new(\n  bearer_token: "My Bearer Token",\n  environment: "test_mode" # defaults to "live_mode"\n)\n\nimage = dodo_payments.products.images.update("id")\n\nputs(image)',
      },
      typescript: {
        method: 'client.products.images.update',
        example:
          "import DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments({\n  bearerToken: process.env['DODO_PAYMENTS_API_KEY'], // This is the default and can be omitted\n});\n\nconst image = await client.products.images.update('id');\n\nconsole.log(image.image_id);",
      },
    },
  },
  {
    name: 'list',
    endpoint: '/products/short_links',
    httpMethod: 'get',
    summary: 'Lists all short links created by the business.',
    description: 'Lists all short links created by the business.',
    stainlessPath: '(resource) products.short_links > (method) list',
    qualified: 'client.products.shortLinks.list',
    params: ['page_number?: number;', 'page_size?: number;', 'product_id?: string;'],
    response: '{ created_at: string; full_url: string; product_id: string; short_url: string; }',
    markdown:
      "## list\n\n`client.products.shortLinks.list(page_number?: number, page_size?: number, product_id?: string): { created_at: string; full_url: string; product_id: string; short_url: string; }`\n\n**get** `/products/short_links`\n\nLists all short links created by the business.\n\n### Parameters\n\n- `page_number?: number`\n  Page number default is 0\n\n- `page_size?: number`\n  Page size default is 10 max is 100\n\n- `product_id?: string`\n  Filter by product ID\n\n### Returns\n\n- `{ created_at: string; full_url: string; product_id: string; short_url: string; }`\n\n  - `created_at: string`\n  - `full_url: string`\n  - `product_id: string`\n  - `short_url: string`\n\n### Example\n\n```typescript\nimport DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments();\n\n// Automatically fetches more pages as needed.\nfor await (const shortLinkListResponse of client.products.shortLinks.list()) {\n  console.log(shortLinkListResponse);\n}\n```",
    perLanguage: {
      cli: {
        method: 'short_links list',
        example: "dodo-payments-cli products:short-links list \\\n  --bearer-token 'My Bearer Token'",
      },
      csharp: {
        method: 'Products.ShortLinks.List',
        example:
          'ShortLinkListParams parameters = new();\n\nvar page = await client.Products.ShortLinks.List(parameters);\nawait foreach (var item in page.Paginate())\n{\n    Console.WriteLine(item);\n}',
      },
      go: {
        method: 'client.Products.ShortLinks.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/dodopayments/dodopayments-go"\n\t"github.com/dodopayments/dodopayments-go/option"\n)\n\nfunc main() {\n\tclient := dodopayments.NewClient(\n\t\toption.WithBearerToken("My Bearer Token"),\n\t)\n\tpage, err := client.Products.ShortLinks.List(context.TODO(), dodopayments.ProductShortLinkListParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", page)\n}\n',
      },
      http: {
        example:
          'curl https://live.dodopayments.com/products/short_links \\\n    -H "Authorization: Bearer $DODO_PAYMENTS_API_KEY"',
      },
      java: {
        method: 'products().shortLinks().list',
        example:
          'package com.dodopayments.api.example;\n\nimport com.dodopayments.api.client.DodoPaymentsClient;\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient;\nimport com.dodopayments.api.models.products.shortlinks.ShortLinkListPage;\nimport com.dodopayments.api.models.products.shortlinks.ShortLinkListParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        DodoPaymentsClient client = DodoPaymentsOkHttpClient.fromEnv();\n\n        ShortLinkListPage page = client.products().shortLinks().list();\n    }\n}',
      },
      kotlin: {
        method: 'products().shortLinks().list',
        example:
          'package com.dodopayments.api.example\n\nimport com.dodopayments.api.client.DodoPaymentsClient\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient\nimport com.dodopayments.api.models.products.shortlinks.ShortLinkListPage\nimport com.dodopayments.api.models.products.shortlinks.ShortLinkListParams\n\nfun main() {\n    val client: DodoPaymentsClient = DodoPaymentsOkHttpClient.fromEnv()\n\n    val page: ShortLinkListPage = client.products().shortLinks().list()\n}',
      },
      php: {
        method: 'products->shortLinks->list',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(bearerToken: 'My Bearer Token', environment: 'test_mode');\n\n$page = $client->products->shortLinks->list(\n  pageNumber: 0, pageSize: 0, productID: 'product_id'\n);\n\nvar_dump($page);",
      },
      python: {
        method: 'products.short_links.list',
        example:
          'import os\nfrom dodopayments import DodoPayments\n\nclient = DodoPayments(\n    bearer_token=os.environ.get("DODO_PAYMENTS_API_KEY"),  # This is the default and can be omitted\n)\npage = client.products.short_links.list()\npage = page.items[0]\nprint(page.product_id)',
      },
      ruby: {
        method: 'products.short_links.list',
        example:
          'require "dodopayments"\n\ndodo_payments = Dodopayments::Client.new(\n  bearer_token: "My Bearer Token",\n  environment: "test_mode" # defaults to "live_mode"\n)\n\npage = dodo_payments.products.short_links.list\n\nputs(page)',
      },
      typescript: {
        method: 'client.products.shortLinks.list',
        example:
          "import DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments({\n  bearerToken: process.env['DODO_PAYMENTS_API_KEY'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const shortLinkListResponse of client.products.shortLinks.list()) {\n  console.log(shortLinkListResponse.product_id);\n}",
      },
    },
  },
  {
    name: 'create',
    endpoint: '/products/{id}/short_links',
    httpMethod: 'post',
    summary:
      'Gives a Short Checkout URL with custom slug for a product.\nUses a Static Checkout URL under the hood.',
    description:
      'Gives a Short Checkout URL with custom slug for a product.\nUses a Static Checkout URL under the hood.',
    stainlessPath: '(resource) products.short_links > (method) create',
    qualified: 'client.products.shortLinks.create',
    params: ['id: string;', 'slug: string;', 'static_checkout_params?: object;'],
    response: '{ full_url: string; short_url: string; }',
    markdown:
      "## create\n\n`client.products.shortLinks.create(id: string, slug: string, static_checkout_params?: object): { full_url: string; short_url: string; }`\n\n**post** `/products/{id}/short_links`\n\nGives a Short Checkout URL with custom slug for a product.\nUses a Static Checkout URL under the hood.\n\n### Parameters\n\n- `id: string`\n\n- `slug: string`\n  Slug for the short link.\n\n- `static_checkout_params?: object`\n  Static Checkout URL parameters to apply to the resulting\nshort URL.\n\n### Returns\n\n- `{ full_url: string; short_url: string; }`\n\n  - `full_url: string`\n  - `short_url: string`\n\n### Example\n\n```typescript\nimport DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments();\n\nconst shortLink = await client.products.shortLinks.create('id', { slug: 'slug' });\n\nconsole.log(shortLink);\n```",
    perLanguage: {
      cli: {
        method: 'short_links create',
        example:
          "dodo-payments-cli products:short-links create \\\n  --bearer-token 'My Bearer Token' \\\n  --id id \\\n  --slug slug",
      },
      csharp: {
        method: 'Products.ShortLinks.Create',
        example:
          'ShortLinkCreateParams parameters = new()\n{\n    ID = "id",\n    Slug = "slug",\n};\n\nvar shortLink = await client.Products.ShortLinks.Create(parameters);\n\nConsole.WriteLine(shortLink);',
      },
      go: {
        method: 'client.Products.ShortLinks.New',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/dodopayments/dodopayments-go"\n\t"github.com/dodopayments/dodopayments-go/option"\n)\n\nfunc main() {\n\tclient := dodopayments.NewClient(\n\t\toption.WithBearerToken("My Bearer Token"),\n\t)\n\tshortLink, err := client.Products.ShortLinks.New(\n\t\tcontext.TODO(),\n\t\t"id",\n\t\tdodopayments.ProductShortLinkNewParams{\n\t\t\tSlug: dodopayments.F("slug"),\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", shortLink.FullURL)\n}\n',
      },
      http: {
        example:
          'curl https://live.dodopayments.com/products/$ID/short_links \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $DODO_PAYMENTS_API_KEY" \\\n    -d \'{\n          "slug": "slug"\n        }\'',
      },
      java: {
        method: 'products().shortLinks().create',
        example:
          'package com.dodopayments.api.example;\n\nimport com.dodopayments.api.client.DodoPaymentsClient;\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient;\nimport com.dodopayments.api.models.products.shortlinks.ShortLinkCreateParams;\nimport com.dodopayments.api.models.products.shortlinks.ShortLinkCreateResponse;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        DodoPaymentsClient client = DodoPaymentsOkHttpClient.fromEnv();\n\n        ShortLinkCreateParams params = ShortLinkCreateParams.builder()\n            .id("id")\n            .slug("slug")\n            .build();\n        ShortLinkCreateResponse shortLink = client.products().shortLinks().create(params);\n    }\n}',
      },
      kotlin: {
        method: 'products().shortLinks().create',
        example:
          'package com.dodopayments.api.example\n\nimport com.dodopayments.api.client.DodoPaymentsClient\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient\nimport com.dodopayments.api.models.products.shortlinks.ShortLinkCreateParams\nimport com.dodopayments.api.models.products.shortlinks.ShortLinkCreateResponse\n\nfun main() {\n    val client: DodoPaymentsClient = DodoPaymentsOkHttpClient.fromEnv()\n\n    val params: ShortLinkCreateParams = ShortLinkCreateParams.builder()\n        .id("id")\n        .slug("slug")\n        .build()\n    val shortLink: ShortLinkCreateResponse = client.products().shortLinks().create(params)\n}',
      },
      php: {
        method: 'products->shortLinks->create',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(bearerToken: 'My Bearer Token', environment: 'test_mode');\n\n$shortLink = $client->products->shortLinks->create(\n  'id', slug: 'slug', staticCheckoutParams: ['foo' => 'string']\n);\n\nvar_dump($shortLink);",
      },
      python: {
        method: 'products.short_links.create',
        example:
          'import os\nfrom dodopayments import DodoPayments\n\nclient = DodoPayments(\n    bearer_token=os.environ.get("DODO_PAYMENTS_API_KEY"),  # This is the default and can be omitted\n)\nshort_link = client.products.short_links.create(\n    id="id",\n    slug="slug",\n)\nprint(short_link.full_url)',
      },
      ruby: {
        method: 'products.short_links.create',
        example:
          'require "dodopayments"\n\ndodo_payments = Dodopayments::Client.new(\n  bearer_token: "My Bearer Token",\n  environment: "test_mode" # defaults to "live_mode"\n)\n\nshort_link = dodo_payments.products.short_links.create("id", slug: "slug")\n\nputs(short_link)',
      },
      typescript: {
        method: 'client.products.shortLinks.create',
        example:
          "import DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments({\n  bearerToken: process.env['DODO_PAYMENTS_API_KEY'], // This is the default and can be omitted\n});\n\nconst shortLink = await client.products.shortLinks.create('id', { slug: 'slug' });\n\nconsole.log(shortLink.full_url);",
      },
    },
  },
  {
    name: 'list_supported_countries',
    endpoint: '/checkout/supported_countries',
    httpMethod: 'get',
    summary: '',
    description: '',
    stainlessPath: '(resource) misc > (method) list_supported_countries',
    qualified: 'client.misc.listSupportedCountries',
    response: 'string[]',
    markdown:
      "## list_supported_countries\n\n`client.misc.listSupportedCountries(): string[]`\n\n**get** `/checkout/supported_countries`\n\n### Returns\n\n- `string[]`\n\n### Example\n\n```typescript\nimport DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments();\n\nconst countryCodes = await client.misc.listSupportedCountries();\n\nconsole.log(countryCodes);\n```",
    perLanguage: {
      cli: {
        method: 'misc list_supported_countries',
        example: "dodo-payments-cli misc list-supported-countries \\\n  --bearer-token 'My Bearer Token'",
      },
      csharp: {
        method: 'Misc.ListSupportedCountries',
        example:
          'MiscListSupportedCountriesParams parameters = new();\n\nvar countryCodes = await client.Misc.ListSupportedCountries(parameters);\n\nConsole.WriteLine(countryCodes);',
      },
      go: {
        method: 'client.Misc.ListSupportedCountries',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/dodopayments/dodopayments-go"\n\t"github.com/dodopayments/dodopayments-go/option"\n)\n\nfunc main() {\n\tclient := dodopayments.NewClient(\n\t\toption.WithBearerToken("My Bearer Token"),\n\t)\n\tcountryCodes, err := client.Misc.ListSupportedCountries(context.TODO())\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", countryCodes)\n}\n',
      },
      http: {
        example:
          'curl https://live.dodopayments.com/checkout/supported_countries \\\n    -H "Authorization: Bearer $DODO_PAYMENTS_API_KEY"',
      },
      java: {
        method: 'misc().listSupportedCountries',
        example:
          'package com.dodopayments.api.example;\n\nimport com.dodopayments.api.client.DodoPaymentsClient;\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient;\nimport com.dodopayments.api.models.misc.CountryCode;\nimport com.dodopayments.api.models.misc.MiscListSupportedCountriesParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        DodoPaymentsClient client = DodoPaymentsOkHttpClient.fromEnv();\n\n        List<CountryCode> countryCodes = client.misc().listSupportedCountries();\n    }\n}',
      },
      kotlin: {
        method: 'misc().listSupportedCountries',
        example:
          'package com.dodopayments.api.example\n\nimport com.dodopayments.api.client.DodoPaymentsClient\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient\nimport com.dodopayments.api.models.misc.CountryCode\nimport com.dodopayments.api.models.misc.MiscListSupportedCountriesParams\n\nfun main() {\n    val client: DodoPaymentsClient = DodoPaymentsOkHttpClient.fromEnv()\n\n    val countryCodes: List<CountryCode> = client.misc().listSupportedCountries()\n}',
      },
      php: {
        method: 'misc->listSupportedCountries',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(bearerToken: 'My Bearer Token', environment: 'test_mode');\n\n$countryCodes = $client->misc->listSupportedCountries();\n\nvar_dump($countryCodes);",
      },
      python: {
        method: 'misc.list_supported_countries',
        example:
          'import os\nfrom dodopayments import DodoPayments\n\nclient = DodoPayments(\n    bearer_token=os.environ.get("DODO_PAYMENTS_API_KEY"),  # This is the default and can be omitted\n)\ncountry_codes = client.misc.list_supported_countries()\nprint(country_codes)',
      },
      ruby: {
        method: 'misc.list_supported_countries',
        example:
          'require "dodopayments"\n\ndodo_payments = Dodopayments::Client.new(\n  bearer_token: "My Bearer Token",\n  environment: "test_mode" # defaults to "live_mode"\n)\n\ncountry_codes = dodo_payments.misc.list_supported_countries\n\nputs(country_codes)',
      },
      typescript: {
        method: 'client.misc.listSupportedCountries',
        example:
          "import DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments({\n  bearerToken: process.env['DODO_PAYMENTS_API_KEY'], // This is the default and can be omitted\n});\n\nconst countryCodes = await client.misc.listSupportedCountries();\n\nconsole.log(countryCodes);",
      },
    },
  },
  {
    name: 'list',
    endpoint: '/discounts',
    httpMethod: 'get',
    summary: 'GET /discounts',
    description: 'GET /discounts',
    stainlessPath: '(resource) discounts > (method) list',
    qualified: 'client.discounts.list',
    params: [
      'active?: boolean;',
      'code?: string;',
      "discount_type?: 'percentage';",
      'page_number?: number;',
      'page_size?: number;',
      'product_id?: string;',
    ],
    response:
      "{ amount: number; business_id: string; code: string; created_at: string; discount_id: string; metadata: object; preserve_on_plan_change: boolean; restricted_to: string[]; times_used: number; type: 'percentage'; expires_at?: string; name?: string; subscription_cycles?: number; usage_limit?: number; }",
    markdown:
      "## list\n\n`client.discounts.list(active?: boolean, code?: string, discount_type?: 'percentage', page_number?: number, page_size?: number, product_id?: string): { amount: number; business_id: string; code: string; created_at: string; discount_id: string; metadata: object; preserve_on_plan_change: boolean; restricted_to: string[]; times_used: number; type: discount_type; expires_at?: string; name?: string; subscription_cycles?: number; usage_limit?: number; }`\n\n**get** `/discounts`\n\nGET /discounts\n\n### Parameters\n\n- `active?: boolean`\n  Filter by active status (true = not expired, false = expired)\n\n- `code?: string`\n  Filter by discount code (partial match, case-insensitive)\n\n- `discount_type?: 'percentage'`\n  Filter by discount type (percentage)\n\n- `page_number?: number`\n  Page number (default = 0).\n\n- `page_size?: number`\n  Page size (default = 10, max = 100).\n\n- `product_id?: string`\n  Filter by product restriction (only discounts that apply to this product)\n\n### Returns\n\n- `{ amount: number; business_id: string; code: string; created_at: string; discount_id: string; metadata: object; preserve_on_plan_change: boolean; restricted_to: string[]; times_used: number; type: 'percentage'; expires_at?: string; name?: string; subscription_cycles?: number; usage_limit?: number; }`\n\n  - `amount: number`\n  - `business_id: string`\n  - `code: string`\n  - `created_at: string`\n  - `discount_id: string`\n  - `metadata: object`\n  - `preserve_on_plan_change: boolean`\n  - `restricted_to: string[]`\n  - `times_used: number`\n  - `type: 'percentage'`\n  - `expires_at?: string`\n  - `name?: string`\n  - `subscription_cycles?: number`\n  - `usage_limit?: number`\n\n### Example\n\n```typescript\nimport DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments();\n\n// Automatically fetches more pages as needed.\nfor await (const discount of client.discounts.list()) {\n  console.log(discount);\n}\n```",
    perLanguage: {
      cli: {
        method: 'discounts list',
        example: "dodo-payments-cli discounts list \\\n  --bearer-token 'My Bearer Token'",
      },
      csharp: {
        method: 'Discounts.List',
        example:
          'DiscountListParams parameters = new();\n\nvar page = await client.Discounts.List(parameters);\nawait foreach (var item in page.Paginate())\n{\n    Console.WriteLine(item);\n}',
      },
      go: {
        method: 'client.Discounts.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/dodopayments/dodopayments-go"\n\t"github.com/dodopayments/dodopayments-go/option"\n)\n\nfunc main() {\n\tclient := dodopayments.NewClient(\n\t\toption.WithBearerToken("My Bearer Token"),\n\t)\n\tpage, err := client.Discounts.List(context.TODO(), dodopayments.DiscountListParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", page)\n}\n',
      },
      http: {
        example:
          'curl https://live.dodopayments.com/discounts \\\n    -H "Authorization: Bearer $DODO_PAYMENTS_API_KEY"',
      },
      java: {
        method: 'discounts().list',
        example:
          'package com.dodopayments.api.example;\n\nimport com.dodopayments.api.client.DodoPaymentsClient;\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient;\nimport com.dodopayments.api.models.discounts.DiscountListPage;\nimport com.dodopayments.api.models.discounts.DiscountListParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        DodoPaymentsClient client = DodoPaymentsOkHttpClient.fromEnv();\n\n        DiscountListPage page = client.discounts().list();\n    }\n}',
      },
      kotlin: {
        method: 'discounts().list',
        example:
          'package com.dodopayments.api.example\n\nimport com.dodopayments.api.client.DodoPaymentsClient\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient\nimport com.dodopayments.api.models.discounts.DiscountListPage\nimport com.dodopayments.api.models.discounts.DiscountListParams\n\nfun main() {\n    val client: DodoPaymentsClient = DodoPaymentsOkHttpClient.fromEnv()\n\n    val page: DiscountListPage = client.discounts().list()\n}',
      },
      php: {
        method: 'discounts->list',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(bearerToken: 'My Bearer Token', environment: 'test_mode');\n\n$page = $client->discounts->list(\n  active: true,\n  code: 'code',\n  discountType: DiscountType::PERCENTAGE,\n  pageNumber: 0,\n  pageSize: 0,\n  productID: 'product_id',\n);\n\nvar_dump($page);",
      },
      python: {
        method: 'discounts.list',
        example:
          'import os\nfrom dodopayments import DodoPayments\n\nclient = DodoPayments(\n    bearer_token=os.environ.get("DODO_PAYMENTS_API_KEY"),  # This is the default and can be omitted\n)\npage = client.discounts.list()\npage = page.items[0]\nprint(page.business_id)',
      },
      ruby: {
        method: 'discounts.list',
        example:
          'require "dodopayments"\n\ndodo_payments = Dodopayments::Client.new(\n  bearer_token: "My Bearer Token",\n  environment: "test_mode" # defaults to "live_mode"\n)\n\npage = dodo_payments.discounts.list\n\nputs(page)',
      },
      typescript: {
        method: 'client.discounts.list',
        example:
          "import DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments({\n  bearerToken: process.env['DODO_PAYMENTS_API_KEY'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const discount of client.discounts.list()) {\n  console.log(discount.business_id);\n}",
      },
    },
  },
  {
    name: 'create',
    endpoint: '/discounts',
    httpMethod: 'post',
    summary: 'POST /discounts\nIf `code` is omitted or empty, a random 16-char uppercase code is generated.',
    description:
      'POST /discounts\nIf `code` is omitted or empty, a random 16-char uppercase code is generated.',
    stainlessPath: '(resource) discounts > (method) create',
    qualified: 'client.discounts.create',
    params: [
      'amount: number;',
      "type: 'percentage';",
      'code?: string;',
      'expires_at?: string;',
      'metadata?: object;',
      'name?: string;',
      'preserve_on_plan_change?: boolean;',
      'restricted_to?: string[];',
      'subscription_cycles?: number;',
      'usage_limit?: number;',
    ],
    response:
      "{ amount: number; business_id: string; code: string; created_at: string; discount_id: string; metadata: object; preserve_on_plan_change: boolean; restricted_to: string[]; times_used: number; type: 'percentage'; expires_at?: string; name?: string; subscription_cycles?: number; usage_limit?: number; }",
    markdown:
      "## create\n\n`client.discounts.create(amount: number, type: 'percentage', code?: string, expires_at?: string, metadata?: object, name?: string, preserve_on_plan_change?: boolean, restricted_to?: string[], subscription_cycles?: number, usage_limit?: number): { amount: number; business_id: string; code: string; created_at: string; discount_id: string; metadata: object; preserve_on_plan_change: boolean; restricted_to: string[]; times_used: number; type: discount_type; expires_at?: string; name?: string; subscription_cycles?: number; usage_limit?: number; }`\n\n**post** `/discounts`\n\nPOST /discounts\nIf `code` is omitted or empty, a random 16-char uppercase code is generated.\n\n### Parameters\n\n- `amount: number`\n  The discount amount.\n\n- If `discount_type` is **not** `percentage`, `amount` is in **USD cents**. For example, `100` means `$1.00`.\n  Only USD is allowed.\n- If `discount_type` **is** `percentage`, `amount` is in **basis points**. For example, `540` means `5.4%`.\n\nMust be at least 1.\n\n- `type: 'percentage'`\n  The discount type (e.g. `percentage`, `flat`, or `flat_per_unit`).\n\n- `code?: string`\n  Optionally supply a code (will be uppercased).\n- Must be at least 3 characters if provided.\n- If omitted, a random 16-character code is generated.\n\n- `expires_at?: string`\n  When the discount expires, if ever.\n\n- `metadata?: object`\n  Additional metadata for the discount\n\n- `name?: string`\n\n- `preserve_on_plan_change?: boolean`\n  Whether this discount should be preserved when a subscription changes plans.\nDefault: false (discount is removed on plan change)\n\n- `restricted_to?: string[]`\n  List of product IDs to restrict usage (if any).\n\n- `subscription_cycles?: number`\n  Number of subscription billing cycles this discount is valid for.\nIf not provided, the discount will be applied indefinitely to\nall recurring payments related to the subscription.\n\n- `usage_limit?: number`\n  How many times this discount can be used (if any).\nMust be >= 1 if provided.\n\n### Returns\n\n- `{ amount: number; business_id: string; code: string; created_at: string; discount_id: string; metadata: object; preserve_on_plan_change: boolean; restricted_to: string[]; times_used: number; type: 'percentage'; expires_at?: string; name?: string; subscription_cycles?: number; usage_limit?: number; }`\n\n  - `amount: number`\n  - `business_id: string`\n  - `code: string`\n  - `created_at: string`\n  - `discount_id: string`\n  - `metadata: object`\n  - `preserve_on_plan_change: boolean`\n  - `restricted_to: string[]`\n  - `times_used: number`\n  - `type: 'percentage'`\n  - `expires_at?: string`\n  - `name?: string`\n  - `subscription_cycles?: number`\n  - `usage_limit?: number`\n\n### Example\n\n```typescript\nimport DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments();\n\nconst discount = await client.discounts.create({ amount: 0, type: 'percentage' });\n\nconsole.log(discount);\n```",
    perLanguage: {
      cli: {
        method: 'discounts create',
        example:
          "dodo-payments-cli discounts create \\\n  --bearer-token 'My Bearer Token' \\\n  --amount 0 \\\n  --type percentage",
      },
      csharp: {
        method: 'Discounts.Create',
        example:
          'DiscountCreateParams parameters = new()\n{\n    Amount = 0,\n    Type = DiscountType.Percentage,\n};\n\nvar discount = await client.Discounts.Create(parameters);\n\nConsole.WriteLine(discount);',
      },
      go: {
        method: 'client.Discounts.New',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/dodopayments/dodopayments-go"\n\t"github.com/dodopayments/dodopayments-go/option"\n)\n\nfunc main() {\n\tclient := dodopayments.NewClient(\n\t\toption.WithBearerToken("My Bearer Token"),\n\t)\n\tdiscount, err := client.Discounts.New(context.TODO(), dodopayments.DiscountNewParams{\n\t\tAmount: dodopayments.F(int64(0)),\n\t\tType:   dodopayments.F(dodopayments.DiscountTypePercentage),\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", discount.BusinessID)\n}\n',
      },
      http: {
        example:
          'curl https://live.dodopayments.com/discounts \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $DODO_PAYMENTS_API_KEY" \\\n    -d \'{\n          "amount": 0,\n          "type": "percentage"\n        }\'',
      },
      java: {
        method: 'discounts().create',
        example:
          'package com.dodopayments.api.example;\n\nimport com.dodopayments.api.client.DodoPaymentsClient;\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient;\nimport com.dodopayments.api.models.discounts.Discount;\nimport com.dodopayments.api.models.discounts.DiscountCreateParams;\nimport com.dodopayments.api.models.discounts.DiscountType;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        DodoPaymentsClient client = DodoPaymentsOkHttpClient.fromEnv();\n\n        DiscountCreateParams params = DiscountCreateParams.builder()\n            .amount(0)\n            .type(DiscountType.PERCENTAGE)\n            .build();\n        Discount discount = client.discounts().create(params);\n    }\n}',
      },
      kotlin: {
        method: 'discounts().create',
        example:
          'package com.dodopayments.api.example\n\nimport com.dodopayments.api.client.DodoPaymentsClient\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient\nimport com.dodopayments.api.models.discounts.Discount\nimport com.dodopayments.api.models.discounts.DiscountCreateParams\nimport com.dodopayments.api.models.discounts.DiscountType\n\nfun main() {\n    val client: DodoPaymentsClient = DodoPaymentsOkHttpClient.fromEnv()\n\n    val params: DiscountCreateParams = DiscountCreateParams.builder()\n        .amount(0)\n        .type(DiscountType.PERCENTAGE)\n        .build()\n    val discount: Discount = client.discounts().create(params)\n}',
      },
      php: {
        method: 'discounts->create',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(bearerToken: 'My Bearer Token', environment: 'test_mode');\n\n$discount = $client->discounts->create(\n  amount: 0,\n  type: DiscountType::PERCENTAGE,\n  code: 'code',\n  expiresAt: new \\DateTimeImmutable('2019-12-27T18:11:19.117Z'),\n  metadata: ['foo' => 'string'],\n  name: 'name',\n  preserveOnPlanChange: true,\n  restrictedTo: ['string'],\n  subscriptionCycles: 0,\n  usageLimit: 0,\n);\n\nvar_dump($discount);",
      },
      python: {
        method: 'discounts.create',
        example:
          'import os\nfrom dodopayments import DodoPayments\n\nclient = DodoPayments(\n    bearer_token=os.environ.get("DODO_PAYMENTS_API_KEY"),  # This is the default and can be omitted\n)\ndiscount = client.discounts.create(\n    amount=0,\n    type="percentage",\n)\nprint(discount.business_id)',
      },
      ruby: {
        method: 'discounts.create',
        example:
          'require "dodopayments"\n\ndodo_payments = Dodopayments::Client.new(\n  bearer_token: "My Bearer Token",\n  environment: "test_mode" # defaults to "live_mode"\n)\n\ndiscount = dodo_payments.discounts.create(amount: 0, type: :percentage)\n\nputs(discount)',
      },
      typescript: {
        method: 'client.discounts.create',
        example:
          "import DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments({\n  bearerToken: process.env['DODO_PAYMENTS_API_KEY'], // This is the default and can be omitted\n});\n\nconst discount = await client.discounts.create({ amount: 0, type: 'percentage' });\n\nconsole.log(discount.business_id);",
      },
    },
  },
  {
    name: 'retrieve',
    endpoint: '/discounts/{discount_id}',
    httpMethod: 'get',
    summary: 'GET /discounts/{discount_id}',
    description: 'GET /discounts/{discount_id}',
    stainlessPath: '(resource) discounts > (method) retrieve',
    qualified: 'client.discounts.retrieve',
    params: ['discount_id: string;'],
    response:
      "{ amount: number; business_id: string; code: string; created_at: string; discount_id: string; metadata: object; preserve_on_plan_change: boolean; restricted_to: string[]; times_used: number; type: 'percentage'; expires_at?: string; name?: string; subscription_cycles?: number; usage_limit?: number; }",
    markdown:
      "## retrieve\n\n`client.discounts.retrieve(discount_id: string): { amount: number; business_id: string; code: string; created_at: string; discount_id: string; metadata: object; preserve_on_plan_change: boolean; restricted_to: string[]; times_used: number; type: discount_type; expires_at?: string; name?: string; subscription_cycles?: number; usage_limit?: number; }`\n\n**get** `/discounts/{discount_id}`\n\nGET /discounts/{discount_id}\n\n### Parameters\n\n- `discount_id: string`\n\n### Returns\n\n- `{ amount: number; business_id: string; code: string; created_at: string; discount_id: string; metadata: object; preserve_on_plan_change: boolean; restricted_to: string[]; times_used: number; type: 'percentage'; expires_at?: string; name?: string; subscription_cycles?: number; usage_limit?: number; }`\n\n  - `amount: number`\n  - `business_id: string`\n  - `code: string`\n  - `created_at: string`\n  - `discount_id: string`\n  - `metadata: object`\n  - `preserve_on_plan_change: boolean`\n  - `restricted_to: string[]`\n  - `times_used: number`\n  - `type: 'percentage'`\n  - `expires_at?: string`\n  - `name?: string`\n  - `subscription_cycles?: number`\n  - `usage_limit?: number`\n\n### Example\n\n```typescript\nimport DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments();\n\nconst discount = await client.discounts.retrieve('discount_id');\n\nconsole.log(discount);\n```",
    perLanguage: {
      cli: {
        method: 'discounts retrieve',
        example:
          "dodo-payments-cli discounts retrieve \\\n  --bearer-token 'My Bearer Token' \\\n  --discount-id discount_id",
      },
      csharp: {
        method: 'Discounts.Retrieve',
        example:
          'DiscountRetrieveParams parameters = new() { DiscountID = "discount_id" };\n\nvar discount = await client.Discounts.Retrieve(parameters);\n\nConsole.WriteLine(discount);',
      },
      go: {
        method: 'client.Discounts.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/dodopayments/dodopayments-go"\n\t"github.com/dodopayments/dodopayments-go/option"\n)\n\nfunc main() {\n\tclient := dodopayments.NewClient(\n\t\toption.WithBearerToken("My Bearer Token"),\n\t)\n\tdiscount, err := client.Discounts.Get(context.TODO(), "discount_id")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", discount.BusinessID)\n}\n',
      },
      http: {
        example:
          'curl https://live.dodopayments.com/discounts/$DISCOUNT_ID \\\n    -H "Authorization: Bearer $DODO_PAYMENTS_API_KEY"',
      },
      java: {
        method: 'discounts().retrieve',
        example:
          'package com.dodopayments.api.example;\n\nimport com.dodopayments.api.client.DodoPaymentsClient;\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient;\nimport com.dodopayments.api.models.discounts.Discount;\nimport com.dodopayments.api.models.discounts.DiscountRetrieveParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        DodoPaymentsClient client = DodoPaymentsOkHttpClient.fromEnv();\n\n        Discount discount = client.discounts().retrieve("discount_id");\n    }\n}',
      },
      kotlin: {
        method: 'discounts().retrieve',
        example:
          'package com.dodopayments.api.example\n\nimport com.dodopayments.api.client.DodoPaymentsClient\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient\nimport com.dodopayments.api.models.discounts.Discount\nimport com.dodopayments.api.models.discounts.DiscountRetrieveParams\n\nfun main() {\n    val client: DodoPaymentsClient = DodoPaymentsOkHttpClient.fromEnv()\n\n    val discount: Discount = client.discounts().retrieve("discount_id")\n}',
      },
      php: {
        method: 'discounts->retrieve',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(bearerToken: 'My Bearer Token', environment: 'test_mode');\n\n$discount = $client->discounts->retrieve('discount_id');\n\nvar_dump($discount);",
      },
      python: {
        method: 'discounts.retrieve',
        example:
          'import os\nfrom dodopayments import DodoPayments\n\nclient = DodoPayments(\n    bearer_token=os.environ.get("DODO_PAYMENTS_API_KEY"),  # This is the default and can be omitted\n)\ndiscount = client.discounts.retrieve(\n    "discount_id",\n)\nprint(discount.business_id)',
      },
      ruby: {
        method: 'discounts.retrieve',
        example:
          'require "dodopayments"\n\ndodo_payments = Dodopayments::Client.new(\n  bearer_token: "My Bearer Token",\n  environment: "test_mode" # defaults to "live_mode"\n)\n\ndiscount = dodo_payments.discounts.retrieve("discount_id")\n\nputs(discount)',
      },
      typescript: {
        method: 'client.discounts.retrieve',
        example:
          "import DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments({\n  bearerToken: process.env['DODO_PAYMENTS_API_KEY'], // This is the default and can be omitted\n});\n\nconst discount = await client.discounts.retrieve('discount_id');\n\nconsole.log(discount.business_id);",
      },
    },
  },
  {
    name: 'delete',
    endpoint: '/discounts/{discount_id}',
    httpMethod: 'delete',
    summary: 'DELETE /discounts/{discount_id}',
    description: 'DELETE /discounts/{discount_id}',
    stainlessPath: '(resource) discounts > (method) delete',
    qualified: 'client.discounts.delete',
    params: ['discount_id: string;'],
    markdown:
      "## delete\n\n`client.discounts.delete(discount_id: string): void`\n\n**delete** `/discounts/{discount_id}`\n\nDELETE /discounts/{discount_id}\n\n### Parameters\n\n- `discount_id: string`\n\n### Example\n\n```typescript\nimport DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments();\n\nawait client.discounts.delete('discount_id')\n```",
    perLanguage: {
      cli: {
        method: 'discounts delete',
        example:
          "dodo-payments-cli discounts delete \\\n  --bearer-token 'My Bearer Token' \\\n  --discount-id discount_id",
      },
      csharp: {
        method: 'Discounts.Delete',
        example:
          'DiscountDeleteParams parameters = new() { DiscountID = "discount_id" };\n\nawait client.Discounts.Delete(parameters);',
      },
      go: {
        method: 'client.Discounts.Delete',
        example:
          'package main\n\nimport (\n\t"context"\n\n\t"github.com/dodopayments/dodopayments-go"\n\t"github.com/dodopayments/dodopayments-go/option"\n)\n\nfunc main() {\n\tclient := dodopayments.NewClient(\n\t\toption.WithBearerToken("My Bearer Token"),\n\t)\n\terr := client.Discounts.Delete(context.TODO(), "discount_id")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
      http: {
        example:
          'curl https://live.dodopayments.com/discounts/$DISCOUNT_ID \\\n    -X DELETE \\\n    -H "Authorization: Bearer $DODO_PAYMENTS_API_KEY"',
      },
      java: {
        method: 'discounts().delete',
        example:
          'package com.dodopayments.api.example;\n\nimport com.dodopayments.api.client.DodoPaymentsClient;\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient;\nimport com.dodopayments.api.models.discounts.DiscountDeleteParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        DodoPaymentsClient client = DodoPaymentsOkHttpClient.fromEnv();\n\n        client.discounts().delete("discount_id");\n    }\n}',
      },
      kotlin: {
        method: 'discounts().delete',
        example:
          'package com.dodopayments.api.example\n\nimport com.dodopayments.api.client.DodoPaymentsClient\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient\nimport com.dodopayments.api.models.discounts.DiscountDeleteParams\n\nfun main() {\n    val client: DodoPaymentsClient = DodoPaymentsOkHttpClient.fromEnv()\n\n    client.discounts().delete("discount_id")\n}',
      },
      php: {
        method: 'discounts->delete',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(bearerToken: 'My Bearer Token', environment: 'test_mode');\n\n$result = $client->discounts->delete('discount_id');\n\nvar_dump($result);",
      },
      python: {
        method: 'discounts.delete',
        example:
          'import os\nfrom dodopayments import DodoPayments\n\nclient = DodoPayments(\n    bearer_token=os.environ.get("DODO_PAYMENTS_API_KEY"),  # This is the default and can be omitted\n)\nclient.discounts.delete(\n    "discount_id",\n)',
      },
      ruby: {
        method: 'discounts.delete',
        example:
          'require "dodopayments"\n\ndodo_payments = Dodopayments::Client.new(\n  bearer_token: "My Bearer Token",\n  environment: "test_mode" # defaults to "live_mode"\n)\n\nresult = dodo_payments.discounts.delete("discount_id")\n\nputs(result)',
      },
      typescript: {
        method: 'client.discounts.delete',
        example:
          "import DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments({\n  bearerToken: process.env['DODO_PAYMENTS_API_KEY'], // This is the default and can be omitted\n});\n\nawait client.discounts.delete('discount_id');",
      },
    },
  },
  {
    name: 'update',
    endpoint: '/discounts/{discount_id}',
    httpMethod: 'patch',
    summary: 'PATCH /discounts/{discount_id}',
    description: 'PATCH /discounts/{discount_id}',
    stainlessPath: '(resource) discounts > (method) update',
    qualified: 'client.discounts.update',
    params: [
      'discount_id: string;',
      'amount?: number;',
      'code?: string;',
      'expires_at?: string;',
      'metadata?: object;',
      'name?: string;',
      'preserve_on_plan_change?: boolean;',
      'restricted_to?: string[];',
      'subscription_cycles?: number;',
      "type?: 'percentage';",
      'usage_limit?: number;',
    ],
    response:
      "{ amount: number; business_id: string; code: string; created_at: string; discount_id: string; metadata: object; preserve_on_plan_change: boolean; restricted_to: string[]; times_used: number; type: 'percentage'; expires_at?: string; name?: string; subscription_cycles?: number; usage_limit?: number; }",
    markdown:
      "## update\n\n`client.discounts.update(discount_id: string, amount?: number, code?: string, expires_at?: string, metadata?: object, name?: string, preserve_on_plan_change?: boolean, restricted_to?: string[], subscription_cycles?: number, type?: 'percentage', usage_limit?: number): { amount: number; business_id: string; code: string; created_at: string; discount_id: string; metadata: object; preserve_on_plan_change: boolean; restricted_to: string[]; times_used: number; type: discount_type; expires_at?: string; name?: string; subscription_cycles?: number; usage_limit?: number; }`\n\n**patch** `/discounts/{discount_id}`\n\nPATCH /discounts/{discount_id}\n\n### Parameters\n\n- `discount_id: string`\n\n- `amount?: number`\n  If present, update the discount amount:\n- If `discount_type` is `percentage`, this represents **basis points** (e.g., `540` = `5.4%`).\n- Otherwise, this represents **USD cents** (e.g., `100` = `$1.00`).\n\nMust be at least 1 if provided.\n\n- `code?: string`\n  If present, update the discount code (uppercase).\n\n- `expires_at?: string`\n\n- `metadata?: object`\n  Additional metadata for the discount\n\n- `name?: string`\n\n- `preserve_on_plan_change?: boolean`\n  Whether this discount should be preserved when a subscription changes plans.\nIf not provided, the existing value is kept.\n\n- `restricted_to?: string[]`\n  If present, replaces all restricted product IDs with this new set.\nTo remove all restrictions, send empty array\n\n- `subscription_cycles?: number`\n  Number of subscription billing cycles this discount is valid for.\nIf not provided, the discount will be applied indefinitely to\nall recurring payments related to the subscription.\n\n- `type?: 'percentage'`\n  If present, update the discount type.\n\n- `usage_limit?: number`\n\n### Returns\n\n- `{ amount: number; business_id: string; code: string; created_at: string; discount_id: string; metadata: object; preserve_on_plan_change: boolean; restricted_to: string[]; times_used: number; type: 'percentage'; expires_at?: string; name?: string; subscription_cycles?: number; usage_limit?: number; }`\n\n  - `amount: number`\n  - `business_id: string`\n  - `code: string`\n  - `created_at: string`\n  - `discount_id: string`\n  - `metadata: object`\n  - `preserve_on_plan_change: boolean`\n  - `restricted_to: string[]`\n  - `times_used: number`\n  - `type: 'percentage'`\n  - `expires_at?: string`\n  - `name?: string`\n  - `subscription_cycles?: number`\n  - `usage_limit?: number`\n\n### Example\n\n```typescript\nimport DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments();\n\nconst discount = await client.discounts.update('discount_id');\n\nconsole.log(discount);\n```",
    perLanguage: {
      cli: {
        method: 'discounts update',
        example:
          "dodo-payments-cli discounts update \\\n  --bearer-token 'My Bearer Token' \\\n  --discount-id discount_id",
      },
      csharp: {
        method: 'Discounts.Update',
        example:
          'DiscountUpdateParams parameters = new() { DiscountID = "discount_id" };\n\nvar discount = await client.Discounts.Update(parameters);\n\nConsole.WriteLine(discount);',
      },
      go: {
        method: 'client.Discounts.Update',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/dodopayments/dodopayments-go"\n\t"github.com/dodopayments/dodopayments-go/option"\n)\n\nfunc main() {\n\tclient := dodopayments.NewClient(\n\t\toption.WithBearerToken("My Bearer Token"),\n\t)\n\tdiscount, err := client.Discounts.Update(\n\t\tcontext.TODO(),\n\t\t"discount_id",\n\t\tdodopayments.DiscountUpdateParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", discount.BusinessID)\n}\n',
      },
      http: {
        example:
          "curl https://live.dodopayments.com/discounts/$DISCOUNT_ID \\\n    -X PATCH \\\n    -H 'Content-Type: application/json' \\\n    -H \"Authorization: Bearer $DODO_PAYMENTS_API_KEY\" \\\n    -d '{}'",
      },
      java: {
        method: 'discounts().update',
        example:
          'package com.dodopayments.api.example;\n\nimport com.dodopayments.api.client.DodoPaymentsClient;\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient;\nimport com.dodopayments.api.models.discounts.Discount;\nimport com.dodopayments.api.models.discounts.DiscountUpdateParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        DodoPaymentsClient client = DodoPaymentsOkHttpClient.fromEnv();\n\n        Discount discount = client.discounts().update("discount_id");\n    }\n}',
      },
      kotlin: {
        method: 'discounts().update',
        example:
          'package com.dodopayments.api.example\n\nimport com.dodopayments.api.client.DodoPaymentsClient\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient\nimport com.dodopayments.api.models.discounts.Discount\nimport com.dodopayments.api.models.discounts.DiscountUpdateParams\n\nfun main() {\n    val client: DodoPaymentsClient = DodoPaymentsOkHttpClient.fromEnv()\n\n    val discount: Discount = client.discounts().update("discount_id")\n}',
      },
      php: {
        method: 'discounts->update',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(bearerToken: 'My Bearer Token', environment: 'test_mode');\n\n$discount = $client->discounts->update(\n  'discount_id',\n  amount: 0,\n  code: 'code',\n  expiresAt: new \\DateTimeImmutable('2019-12-27T18:11:19.117Z'),\n  metadata: ['foo' => 'string'],\n  name: 'name',\n  preserveOnPlanChange: true,\n  restrictedTo: ['string'],\n  subscriptionCycles: 0,\n  type: DiscountType::PERCENTAGE,\n  usageLimit: 0,\n);\n\nvar_dump($discount);",
      },
      python: {
        method: 'discounts.update',
        example:
          'import os\nfrom dodopayments import DodoPayments\n\nclient = DodoPayments(\n    bearer_token=os.environ.get("DODO_PAYMENTS_API_KEY"),  # This is the default and can be omitted\n)\ndiscount = client.discounts.update(\n    discount_id="discount_id",\n)\nprint(discount.business_id)',
      },
      ruby: {
        method: 'discounts.update',
        example:
          'require "dodopayments"\n\ndodo_payments = Dodopayments::Client.new(\n  bearer_token: "My Bearer Token",\n  environment: "test_mode" # defaults to "live_mode"\n)\n\ndiscount = dodo_payments.discounts.update("discount_id")\n\nputs(discount)',
      },
      typescript: {
        method: 'client.discounts.update',
        example:
          "import DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments({\n  bearerToken: process.env['DODO_PAYMENTS_API_KEY'], // This is the default and can be omitted\n});\n\nconst discount = await client.discounts.update('discount_id');\n\nconsole.log(discount.business_id);",
      },
    },
  },
  {
    name: 'retrieve_by_code',
    endpoint: '/discounts/code/{code}',
    httpMethod: 'get',
    summary: 'GET /discounts/code/{code}',
    description:
      'Validate and fetch a discount by its code name (e.g., "SAVE20").\nThis allows real-time validation directly against the API using the\nhuman-readable discount code instead of requiring the internal discount_id.',
    stainlessPath: '(resource) discounts > (method) retrieve_by_code',
    qualified: 'client.discounts.retrieveByCode',
    params: ['code: string;'],
    response:
      "{ amount: number; business_id: string; code: string; created_at: string; discount_id: string; metadata: object; preserve_on_plan_change: boolean; restricted_to: string[]; times_used: number; type: 'percentage'; expires_at?: string; name?: string; subscription_cycles?: number; usage_limit?: number; }",
    markdown:
      "## retrieve_by_code\n\n`client.discounts.retrieveByCode(code: string): { amount: number; business_id: string; code: string; created_at: string; discount_id: string; metadata: object; preserve_on_plan_change: boolean; restricted_to: string[]; times_used: number; type: discount_type; expires_at?: string; name?: string; subscription_cycles?: number; usage_limit?: number; }`\n\n**get** `/discounts/code/{code}`\n\nValidate and fetch a discount by its code name (e.g., \"SAVE20\").\nThis allows real-time validation directly against the API using the\nhuman-readable discount code instead of requiring the internal discount_id.\n\n### Parameters\n\n- `code: string`\n\n### Returns\n\n- `{ amount: number; business_id: string; code: string; created_at: string; discount_id: string; metadata: object; preserve_on_plan_change: boolean; restricted_to: string[]; times_used: number; type: 'percentage'; expires_at?: string; name?: string; subscription_cycles?: number; usage_limit?: number; }`\n\n  - `amount: number`\n  - `business_id: string`\n  - `code: string`\n  - `created_at: string`\n  - `discount_id: string`\n  - `metadata: object`\n  - `preserve_on_plan_change: boolean`\n  - `restricted_to: string[]`\n  - `times_used: number`\n  - `type: 'percentage'`\n  - `expires_at?: string`\n  - `name?: string`\n  - `subscription_cycles?: number`\n  - `usage_limit?: number`\n\n### Example\n\n```typescript\nimport DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments();\n\nconst discount = await client.discounts.retrieveByCode('code');\n\nconsole.log(discount);\n```",
    perLanguage: {
      cli: {
        method: 'discounts retrieve_by_code',
        example:
          "dodo-payments-cli discounts retrieve-by-code \\\n  --bearer-token 'My Bearer Token' \\\n  --code code",
      },
      csharp: {
        method: 'Discounts.RetrieveByCode',
        example:
          'DiscountRetrieveByCodeParams parameters = new() { Code = "code" };\n\nvar discount = await client.Discounts.RetrieveByCode(parameters);\n\nConsole.WriteLine(discount);',
      },
      go: {
        method: 'client.Discounts.GetByCode',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/dodopayments/dodopayments-go"\n\t"github.com/dodopayments/dodopayments-go/option"\n)\n\nfunc main() {\n\tclient := dodopayments.NewClient(\n\t\toption.WithBearerToken("My Bearer Token"),\n\t)\n\tdiscount, err := client.Discounts.GetByCode(context.TODO(), "code")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", discount.BusinessID)\n}\n',
      },
      http: {
        example:
          'curl https://live.dodopayments.com/discounts/code/$CODE \\\n    -H "Authorization: Bearer $DODO_PAYMENTS_API_KEY"',
      },
      java: {
        method: 'discounts().retrieveByCode',
        example:
          'package com.dodopayments.api.example;\n\nimport com.dodopayments.api.client.DodoPaymentsClient;\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient;\nimport com.dodopayments.api.models.discounts.Discount;\nimport com.dodopayments.api.models.discounts.DiscountRetrieveByCodeParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        DodoPaymentsClient client = DodoPaymentsOkHttpClient.fromEnv();\n\n        Discount discount = client.discounts().retrieveByCode("code");\n    }\n}',
      },
      kotlin: {
        method: 'discounts().retrieveByCode',
        example:
          'package com.dodopayments.api.example\n\nimport com.dodopayments.api.client.DodoPaymentsClient\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient\nimport com.dodopayments.api.models.discounts.Discount\nimport com.dodopayments.api.models.discounts.DiscountRetrieveByCodeParams\n\nfun main() {\n    val client: DodoPaymentsClient = DodoPaymentsOkHttpClient.fromEnv()\n\n    val discount: Discount = client.discounts().retrieveByCode("code")\n}',
      },
      php: {
        method: 'discounts->retrieveByCode',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(bearerToken: 'My Bearer Token', environment: 'test_mode');\n\n$discount = $client->discounts->retrieveByCode('code');\n\nvar_dump($discount);",
      },
      python: {
        method: 'discounts.retrieve_by_code',
        example:
          'import os\nfrom dodopayments import DodoPayments\n\nclient = DodoPayments(\n    bearer_token=os.environ.get("DODO_PAYMENTS_API_KEY"),  # This is the default and can be omitted\n)\ndiscount = client.discounts.retrieve_by_code(\n    "code",\n)\nprint(discount.business_id)',
      },
      ruby: {
        method: 'discounts.retrieve_by_code',
        example:
          'require "dodopayments"\n\ndodo_payments = Dodopayments::Client.new(\n  bearer_token: "My Bearer Token",\n  environment: "test_mode" # defaults to "live_mode"\n)\n\ndiscount = dodo_payments.discounts.retrieve_by_code("code")\n\nputs(discount)',
      },
      typescript: {
        method: 'client.discounts.retrieveByCode',
        example:
          "import DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments({\n  bearerToken: process.env['DODO_PAYMENTS_API_KEY'], // This is the default and can be omitted\n});\n\nconst discount = await client.discounts.retrieveByCode('code');\n\nconsole.log(discount.business_id);",
      },
    },
  },
  {
    name: 'list',
    endpoint: '/addons',
    httpMethod: 'get',
    summary: '',
    description: '',
    stainlessPath: '(resource) addons > (method) list',
    qualified: 'client.addons.list',
    params: ['page_number?: number;', 'page_size?: number;'],
    response:
      "{ id: string; business_id: string; created_at: string; currency: string; name: string; price: number; tax_category: 'digital_products' | 'saas' | 'e_book' | 'edtech'; updated_at: string; description?: string; image?: string; }",
    markdown:
      "## list\n\n`client.addons.list(page_number?: number, page_size?: number): { id: string; business_id: string; created_at: string; currency: currency; name: string; price: number; tax_category: tax_category; updated_at: string; description?: string; image?: string; }`\n\n**get** `/addons`\n\n### Parameters\n\n- `page_number?: number`\n  Page number default is 0\n\n- `page_size?: number`\n  Page size default is 10 max is 100\n\n### Returns\n\n- `{ id: string; business_id: string; created_at: string; currency: string; name: string; price: number; tax_category: 'digital_products' | 'saas' | 'e_book' | 'edtech'; updated_at: string; description?: string; image?: string; }`\n\n  - `id: string`\n  - `business_id: string`\n  - `created_at: string`\n  - `currency: string`\n  - `name: string`\n  - `price: number`\n  - `tax_category: 'digital_products' | 'saas' | 'e_book' | 'edtech'`\n  - `updated_at: string`\n  - `description?: string`\n  - `image?: string`\n\n### Example\n\n```typescript\nimport DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments();\n\n// Automatically fetches more pages as needed.\nfor await (const addonResponse of client.addons.list()) {\n  console.log(addonResponse);\n}\n```",
    perLanguage: {
      cli: {
        method: 'addons list',
        example: "dodo-payments-cli addons list \\\n  --bearer-token 'My Bearer Token'",
      },
      csharp: {
        method: 'Addons.List',
        example:
          'AddonListParams parameters = new();\n\nvar page = await client.Addons.List(parameters);\nawait foreach (var item in page.Paginate())\n{\n    Console.WriteLine(item);\n}',
      },
      go: {
        method: 'client.Addons.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/dodopayments/dodopayments-go"\n\t"github.com/dodopayments/dodopayments-go/option"\n)\n\nfunc main() {\n\tclient := dodopayments.NewClient(\n\t\toption.WithBearerToken("My Bearer Token"),\n\t)\n\tpage, err := client.Addons.List(context.TODO(), dodopayments.AddonListParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", page)\n}\n',
      },
      http: {
        example:
          'curl https://live.dodopayments.com/addons \\\n    -H "Authorization: Bearer $DODO_PAYMENTS_API_KEY"',
      },
      java: {
        method: 'addons().list',
        example:
          'package com.dodopayments.api.example;\n\nimport com.dodopayments.api.client.DodoPaymentsClient;\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient;\nimport com.dodopayments.api.models.addons.AddonListPage;\nimport com.dodopayments.api.models.addons.AddonListParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        DodoPaymentsClient client = DodoPaymentsOkHttpClient.fromEnv();\n\n        AddonListPage page = client.addons().list();\n    }\n}',
      },
      kotlin: {
        method: 'addons().list',
        example:
          'package com.dodopayments.api.example\n\nimport com.dodopayments.api.client.DodoPaymentsClient\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient\nimport com.dodopayments.api.models.addons.AddonListPage\nimport com.dodopayments.api.models.addons.AddonListParams\n\nfun main() {\n    val client: DodoPaymentsClient = DodoPaymentsOkHttpClient.fromEnv()\n\n    val page: AddonListPage = client.addons().list()\n}',
      },
      php: {
        method: 'addons->list',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(bearerToken: 'My Bearer Token', environment: 'test_mode');\n\n$page = $client->addons->list(pageNumber: 0, pageSize: 0);\n\nvar_dump($page);",
      },
      python: {
        method: 'addons.list',
        example:
          'import os\nfrom dodopayments import DodoPayments\n\nclient = DodoPayments(\n    bearer_token=os.environ.get("DODO_PAYMENTS_API_KEY"),  # This is the default and can be omitted\n)\npage = client.addons.list()\npage = page.items[0]\nprint(page.id)',
      },
      ruby: {
        method: 'addons.list',
        example:
          'require "dodopayments"\n\ndodo_payments = Dodopayments::Client.new(\n  bearer_token: "My Bearer Token",\n  environment: "test_mode" # defaults to "live_mode"\n)\n\npage = dodo_payments.addons.list\n\nputs(page)',
      },
      typescript: {
        method: 'client.addons.list',
        example:
          "import DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments({\n  bearerToken: process.env['DODO_PAYMENTS_API_KEY'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const addonResponse of client.addons.list()) {\n  console.log(addonResponse.id);\n}",
      },
    },
  },
  {
    name: 'create',
    endpoint: '/addons',
    httpMethod: 'post',
    summary: '',
    description: '',
    stainlessPath: '(resource) addons > (method) create',
    qualified: 'client.addons.create',
    params: [
      'currency: string;',
      'name: string;',
      'price: number;',
      "tax_category: 'digital_products' | 'saas' | 'e_book' | 'edtech';",
      'description?: string;',
    ],
    response:
      "{ id: string; business_id: string; created_at: string; currency: string; name: string; price: number; tax_category: 'digital_products' | 'saas' | 'e_book' | 'edtech'; updated_at: string; description?: string; image?: string; }",
    markdown:
      "## create\n\n`client.addons.create(currency: string, name: string, price: number, tax_category: 'digital_products' | 'saas' | 'e_book' | 'edtech', description?: string): { id: string; business_id: string; created_at: string; currency: currency; name: string; price: number; tax_category: tax_category; updated_at: string; description?: string; image?: string; }`\n\n**post** `/addons`\n\n### Parameters\n\n- `currency: string`\n  The currency of the Addon\n\n- `name: string`\n  Name of the Addon\n\n- `price: number`\n  Amount of the addon\n\n- `tax_category: 'digital_products' | 'saas' | 'e_book' | 'edtech'`\n  Tax category applied to this Addon\n\n- `description?: string`\n  Optional description of the Addon\n\n### Returns\n\n- `{ id: string; business_id: string; created_at: string; currency: string; name: string; price: number; tax_category: 'digital_products' | 'saas' | 'e_book' | 'edtech'; updated_at: string; description?: string; image?: string; }`\n\n  - `id: string`\n  - `business_id: string`\n  - `created_at: string`\n  - `currency: string`\n  - `name: string`\n  - `price: number`\n  - `tax_category: 'digital_products' | 'saas' | 'e_book' | 'edtech'`\n  - `updated_at: string`\n  - `description?: string`\n  - `image?: string`\n\n### Example\n\n```typescript\nimport DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments();\n\nconst addonResponse = await client.addons.create({\n  currency: 'AED',\n  name: 'name',\n  price: 0,\n  tax_category: 'digital_products',\n});\n\nconsole.log(addonResponse);\n```",
    perLanguage: {
      cli: {
        method: 'addons create',
        example:
          "dodo-payments-cli addons create \\\n  --bearer-token 'My Bearer Token' \\\n  --currency AED \\\n  --name name \\\n  --price 0 \\\n  --tax-category digital_products",
      },
      csharp: {
        method: 'Addons.Create',
        example:
          'AddonCreateParams parameters = new()\n{\n    Currency = Currency.Aed,\n    Name = "name",\n    Price = 0,\n    TaxCategory = TaxCategory.DigitalProducts,\n};\n\nvar addonResponse = await client.Addons.Create(parameters);\n\nConsole.WriteLine(addonResponse);',
      },
      go: {
        method: 'client.Addons.New',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/dodopayments/dodopayments-go"\n\t"github.com/dodopayments/dodopayments-go/option"\n)\n\nfunc main() {\n\tclient := dodopayments.NewClient(\n\t\toption.WithBearerToken("My Bearer Token"),\n\t)\n\taddonResponse, err := client.Addons.New(context.TODO(), dodopayments.AddonNewParams{\n\t\tCurrency:    dodopayments.F(dodopayments.CurrencyAed),\n\t\tName:        dodopayments.F("name"),\n\t\tPrice:       dodopayments.F(int64(0)),\n\t\tTaxCategory: dodopayments.F(dodopayments.TaxCategoryDigitalProducts),\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", addonResponse.ID)\n}\n',
      },
      http: {
        example:
          'curl https://live.dodopayments.com/addons \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $DODO_PAYMENTS_API_KEY" \\\n    -d \'{\n          "currency": "AED",\n          "name": "name",\n          "price": 0,\n          "tax_category": "digital_products"\n        }\'',
      },
      java: {
        method: 'addons().create',
        example:
          'package com.dodopayments.api.example;\n\nimport com.dodopayments.api.client.DodoPaymentsClient;\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient;\nimport com.dodopayments.api.models.addons.AddonCreateParams;\nimport com.dodopayments.api.models.addons.AddonResponse;\nimport com.dodopayments.api.models.misc.Currency;\nimport com.dodopayments.api.models.misc.TaxCategory;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        DodoPaymentsClient client = DodoPaymentsOkHttpClient.fromEnv();\n\n        AddonCreateParams params = AddonCreateParams.builder()\n            .currency(Currency.AED)\n            .name("name")\n            .price(0)\n            .taxCategory(TaxCategory.DIGITAL_PRODUCTS)\n            .build();\n        AddonResponse addonResponse = client.addons().create(params);\n    }\n}',
      },
      kotlin: {
        method: 'addons().create',
        example:
          'package com.dodopayments.api.example\n\nimport com.dodopayments.api.client.DodoPaymentsClient\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient\nimport com.dodopayments.api.models.addons.AddonCreateParams\nimport com.dodopayments.api.models.addons.AddonResponse\nimport com.dodopayments.api.models.misc.Currency\nimport com.dodopayments.api.models.misc.TaxCategory\n\nfun main() {\n    val client: DodoPaymentsClient = DodoPaymentsOkHttpClient.fromEnv()\n\n    val params: AddonCreateParams = AddonCreateParams.builder()\n        .currency(Currency.AED)\n        .name("name")\n        .price(0)\n        .taxCategory(TaxCategory.DIGITAL_PRODUCTS)\n        .build()\n    val addonResponse: AddonResponse = client.addons().create(params)\n}',
      },
      php: {
        method: 'addons->create',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(bearerToken: 'My Bearer Token', environment: 'test_mode');\n\n$addonResponse = $client->addons->create(\n  currency: Currency::AED,\n  name: 'name',\n  price: 0,\n  taxCategory: TaxCategory::DIGITAL_PRODUCTS,\n  description: 'description',\n);\n\nvar_dump($addonResponse);",
      },
      python: {
        method: 'addons.create',
        example:
          'import os\nfrom dodopayments import DodoPayments\n\nclient = DodoPayments(\n    bearer_token=os.environ.get("DODO_PAYMENTS_API_KEY"),  # This is the default and can be omitted\n)\naddon_response = client.addons.create(\n    currency="AED",\n    name="name",\n    price=0,\n    tax_category="digital_products",\n)\nprint(addon_response.id)',
      },
      ruby: {
        method: 'addons.create',
        example:
          'require "dodopayments"\n\ndodo_payments = Dodopayments::Client.new(\n  bearer_token: "My Bearer Token",\n  environment: "test_mode" # defaults to "live_mode"\n)\n\naddon_response = dodo_payments.addons.create(currency: :AED, name: "name", price: 0, tax_category: :digital_products)\n\nputs(addon_response)',
      },
      typescript: {
        method: 'client.addons.create',
        example:
          "import DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments({\n  bearerToken: process.env['DODO_PAYMENTS_API_KEY'], // This is the default and can be omitted\n});\n\nconst addonResponse = await client.addons.create({\n  currency: 'AED',\n  name: 'name',\n  price: 0,\n  tax_category: 'digital_products',\n});\n\nconsole.log(addonResponse.id);",
      },
    },
  },
  {
    name: 'retrieve',
    endpoint: '/addons/{id}',
    httpMethod: 'get',
    summary: '',
    description: '',
    stainlessPath: '(resource) addons > (method) retrieve',
    qualified: 'client.addons.retrieve',
    params: ['id: string;'],
    response:
      "{ id: string; business_id: string; created_at: string; currency: string; name: string; price: number; tax_category: 'digital_products' | 'saas' | 'e_book' | 'edtech'; updated_at: string; description?: string; image?: string; }",
    markdown:
      "## retrieve\n\n`client.addons.retrieve(id: string): { id: string; business_id: string; created_at: string; currency: currency; name: string; price: number; tax_category: tax_category; updated_at: string; description?: string; image?: string; }`\n\n**get** `/addons/{id}`\n\n### Parameters\n\n- `id: string`\n\n### Returns\n\n- `{ id: string; business_id: string; created_at: string; currency: string; name: string; price: number; tax_category: 'digital_products' | 'saas' | 'e_book' | 'edtech'; updated_at: string; description?: string; image?: string; }`\n\n  - `id: string`\n  - `business_id: string`\n  - `created_at: string`\n  - `currency: string`\n  - `name: string`\n  - `price: number`\n  - `tax_category: 'digital_products' | 'saas' | 'e_book' | 'edtech'`\n  - `updated_at: string`\n  - `description?: string`\n  - `image?: string`\n\n### Example\n\n```typescript\nimport DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments();\n\nconst addonResponse = await client.addons.retrieve('id');\n\nconsole.log(addonResponse);\n```",
    perLanguage: {
      cli: {
        method: 'addons retrieve',
        example: "dodo-payments-cli addons retrieve \\\n  --bearer-token 'My Bearer Token' \\\n  --id id",
      },
      csharp: {
        method: 'Addons.Retrieve',
        example:
          'AddonRetrieveParams parameters = new() { ID = "id" };\n\nvar addonResponse = await client.Addons.Retrieve(parameters);\n\nConsole.WriteLine(addonResponse);',
      },
      go: {
        method: 'client.Addons.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/dodopayments/dodopayments-go"\n\t"github.com/dodopayments/dodopayments-go/option"\n)\n\nfunc main() {\n\tclient := dodopayments.NewClient(\n\t\toption.WithBearerToken("My Bearer Token"),\n\t)\n\taddonResponse, err := client.Addons.Get(context.TODO(), "id")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", addonResponse.ID)\n}\n',
      },
      http: {
        example:
          'curl https://live.dodopayments.com/addons/$ID \\\n    -H "Authorization: Bearer $DODO_PAYMENTS_API_KEY"',
      },
      java: {
        method: 'addons().retrieve',
        example:
          'package com.dodopayments.api.example;\n\nimport com.dodopayments.api.client.DodoPaymentsClient;\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient;\nimport com.dodopayments.api.models.addons.AddonResponse;\nimport com.dodopayments.api.models.addons.AddonRetrieveParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        DodoPaymentsClient client = DodoPaymentsOkHttpClient.fromEnv();\n\n        AddonResponse addonResponse = client.addons().retrieve("id");\n    }\n}',
      },
      kotlin: {
        method: 'addons().retrieve',
        example:
          'package com.dodopayments.api.example\n\nimport com.dodopayments.api.client.DodoPaymentsClient\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient\nimport com.dodopayments.api.models.addons.AddonResponse\nimport com.dodopayments.api.models.addons.AddonRetrieveParams\n\nfun main() {\n    val client: DodoPaymentsClient = DodoPaymentsOkHttpClient.fromEnv()\n\n    val addonResponse: AddonResponse = client.addons().retrieve("id")\n}',
      },
      php: {
        method: 'addons->retrieve',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(bearerToken: 'My Bearer Token', environment: 'test_mode');\n\n$addonResponse = $client->addons->retrieve('id');\n\nvar_dump($addonResponse);",
      },
      python: {
        method: 'addons.retrieve',
        example:
          'import os\nfrom dodopayments import DodoPayments\n\nclient = DodoPayments(\n    bearer_token=os.environ.get("DODO_PAYMENTS_API_KEY"),  # This is the default and can be omitted\n)\naddon_response = client.addons.retrieve(\n    "id",\n)\nprint(addon_response.id)',
      },
      ruby: {
        method: 'addons.retrieve',
        example:
          'require "dodopayments"\n\ndodo_payments = Dodopayments::Client.new(\n  bearer_token: "My Bearer Token",\n  environment: "test_mode" # defaults to "live_mode"\n)\n\naddon_response = dodo_payments.addons.retrieve("id")\n\nputs(addon_response)',
      },
      typescript: {
        method: 'client.addons.retrieve',
        example:
          "import DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments({\n  bearerToken: process.env['DODO_PAYMENTS_API_KEY'], // This is the default and can be omitted\n});\n\nconst addonResponse = await client.addons.retrieve('id');\n\nconsole.log(addonResponse.id);",
      },
    },
  },
  {
    name: 'update',
    endpoint: '/addons/{id}',
    httpMethod: 'patch',
    summary: '',
    description: '',
    stainlessPath: '(resource) addons > (method) update',
    qualified: 'client.addons.update',
    params: [
      'id: string;',
      'currency?: string;',
      'description?: string;',
      'image_id?: string;',
      'name?: string;',
      'price?: number;',
      "tax_category?: 'digital_products' | 'saas' | 'e_book' | 'edtech';",
    ],
    response:
      "{ id: string; business_id: string; created_at: string; currency: string; name: string; price: number; tax_category: 'digital_products' | 'saas' | 'e_book' | 'edtech'; updated_at: string; description?: string; image?: string; }",
    markdown:
      "## update\n\n`client.addons.update(id: string, currency?: string, description?: string, image_id?: string, name?: string, price?: number, tax_category?: 'digital_products' | 'saas' | 'e_book' | 'edtech'): { id: string; business_id: string; created_at: string; currency: currency; name: string; price: number; tax_category: tax_category; updated_at: string; description?: string; image?: string; }`\n\n**patch** `/addons/{id}`\n\n### Parameters\n\n- `id: string`\n\n- `currency?: string`\n  The currency of the Addon\n\n- `description?: string`\n  Description of the Addon, optional and must be at most 1000 characters.\n\n- `image_id?: string`\n  Addon image id after its uploaded to S3\n\n- `name?: string`\n  Name of the Addon, optional and must be at most 100 characters.\n\n- `price?: number`\n  Amount of the addon\n\n- `tax_category?: 'digital_products' | 'saas' | 'e_book' | 'edtech'`\n  Tax category of the Addon.\n\n### Returns\n\n- `{ id: string; business_id: string; created_at: string; currency: string; name: string; price: number; tax_category: 'digital_products' | 'saas' | 'e_book' | 'edtech'; updated_at: string; description?: string; image?: string; }`\n\n  - `id: string`\n  - `business_id: string`\n  - `created_at: string`\n  - `currency: string`\n  - `name: string`\n  - `price: number`\n  - `tax_category: 'digital_products' | 'saas' | 'e_book' | 'edtech'`\n  - `updated_at: string`\n  - `description?: string`\n  - `image?: string`\n\n### Example\n\n```typescript\nimport DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments();\n\nconst addonResponse = await client.addons.update('id');\n\nconsole.log(addonResponse);\n```",
    perLanguage: {
      cli: {
        method: 'addons update',
        example: "dodo-payments-cli addons update \\\n  --bearer-token 'My Bearer Token' \\\n  --id id",
      },
      csharp: {
        method: 'Addons.Update',
        example:
          'AddonUpdateParams parameters = new() { ID = "id" };\n\nvar addonResponse = await client.Addons.Update(parameters);\n\nConsole.WriteLine(addonResponse);',
      },
      go: {
        method: 'client.Addons.Update',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/dodopayments/dodopayments-go"\n\t"github.com/dodopayments/dodopayments-go/option"\n)\n\nfunc main() {\n\tclient := dodopayments.NewClient(\n\t\toption.WithBearerToken("My Bearer Token"),\n\t)\n\taddonResponse, err := client.Addons.Update(\n\t\tcontext.TODO(),\n\t\t"id",\n\t\tdodopayments.AddonUpdateParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", addonResponse.ID)\n}\n',
      },
      http: {
        example:
          "curl https://live.dodopayments.com/addons/$ID \\\n    -X PATCH \\\n    -H 'Content-Type: application/json' \\\n    -H \"Authorization: Bearer $DODO_PAYMENTS_API_KEY\" \\\n    -d '{}'",
      },
      java: {
        method: 'addons().update',
        example:
          'package com.dodopayments.api.example;\n\nimport com.dodopayments.api.client.DodoPaymentsClient;\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient;\nimport com.dodopayments.api.models.addons.AddonResponse;\nimport com.dodopayments.api.models.addons.AddonUpdateParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        DodoPaymentsClient client = DodoPaymentsOkHttpClient.fromEnv();\n\n        AddonResponse addonResponse = client.addons().update("id");\n    }\n}',
      },
      kotlin: {
        method: 'addons().update',
        example:
          'package com.dodopayments.api.example\n\nimport com.dodopayments.api.client.DodoPaymentsClient\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient\nimport com.dodopayments.api.models.addons.AddonResponse\nimport com.dodopayments.api.models.addons.AddonUpdateParams\n\nfun main() {\n    val client: DodoPaymentsClient = DodoPaymentsOkHttpClient.fromEnv()\n\n    val addonResponse: AddonResponse = client.addons().update("id")\n}',
      },
      php: {
        method: 'addons->update',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(bearerToken: 'My Bearer Token', environment: 'test_mode');\n\n$addonResponse = $client->addons->update(\n  'id',\n  currency: Currency::AED,\n  description: 'description',\n  imageID: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',\n  name: 'name',\n  price: 0,\n  taxCategory: TaxCategory::DIGITAL_PRODUCTS,\n);\n\nvar_dump($addonResponse);",
      },
      python: {
        method: 'addons.update',
        example:
          'import os\nfrom dodopayments import DodoPayments\n\nclient = DodoPayments(\n    bearer_token=os.environ.get("DODO_PAYMENTS_API_KEY"),  # This is the default and can be omitted\n)\naddon_response = client.addons.update(\n    id="id",\n)\nprint(addon_response.id)',
      },
      ruby: {
        method: 'addons.update',
        example:
          'require "dodopayments"\n\ndodo_payments = Dodopayments::Client.new(\n  bearer_token: "My Bearer Token",\n  environment: "test_mode" # defaults to "live_mode"\n)\n\naddon_response = dodo_payments.addons.update("id")\n\nputs(addon_response)',
      },
      typescript: {
        method: 'client.addons.update',
        example:
          "import DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments({\n  bearerToken: process.env['DODO_PAYMENTS_API_KEY'], // This is the default and can be omitted\n});\n\nconst addonResponse = await client.addons.update('id');\n\nconsole.log(addonResponse.id);",
      },
    },
  },
  {
    name: 'update_images',
    endpoint: '/addons/{id}/images',
    httpMethod: 'put',
    summary: '',
    description: '',
    stainlessPath: '(resource) addons > (method) update_images',
    qualified: 'client.addons.updateImages',
    params: ['id: string;'],
    response: '{ image_id: string; url: string; }',
    markdown:
      "## update_images\n\n`client.addons.updateImages(id: string): { image_id: string; url: string; }`\n\n**put** `/addons/{id}/images`\n\n### Parameters\n\n- `id: string`\n\n### Returns\n\n- `{ image_id: string; url: string; }`\n\n  - `image_id: string`\n  - `url: string`\n\n### Example\n\n```typescript\nimport DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments();\n\nconst response = await client.addons.updateImages('id');\n\nconsole.log(response);\n```",
    perLanguage: {
      cli: {
        method: 'addons update_images',
        example:
          "dodo-payments-cli addons update-images \\\n  --bearer-token 'My Bearer Token' \\\n  --id id",
      },
      csharp: {
        method: 'Addons.UpdateImages',
        example:
          'AddonUpdateImagesParams parameters = new() { ID = "id" };\n\nvar response = await client.Addons.UpdateImages(parameters);\n\nConsole.WriteLine(response);',
      },
      go: {
        method: 'client.Addons.UpdateImages',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/dodopayments/dodopayments-go"\n\t"github.com/dodopayments/dodopayments-go/option"\n)\n\nfunc main() {\n\tclient := dodopayments.NewClient(\n\t\toption.WithBearerToken("My Bearer Token"),\n\t)\n\tresponse, err := client.Addons.UpdateImages(context.TODO(), "id")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.ImageID)\n}\n',
      },
      http: {
        example:
          'curl https://live.dodopayments.com/addons/$ID/images \\\n    -X PUT \\\n    -H "Authorization: Bearer $DODO_PAYMENTS_API_KEY"',
      },
      java: {
        method: 'addons().updateImages',
        example:
          'package com.dodopayments.api.example;\n\nimport com.dodopayments.api.client.DodoPaymentsClient;\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient;\nimport com.dodopayments.api.models.addons.AddonUpdateImagesParams;\nimport com.dodopayments.api.models.addons.AddonUpdateImagesResponse;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        DodoPaymentsClient client = DodoPaymentsOkHttpClient.fromEnv();\n\n        AddonUpdateImagesResponse response = client.addons().updateImages("id");\n    }\n}',
      },
      kotlin: {
        method: 'addons().updateImages',
        example:
          'package com.dodopayments.api.example\n\nimport com.dodopayments.api.client.DodoPaymentsClient\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient\nimport com.dodopayments.api.models.addons.AddonUpdateImagesParams\nimport com.dodopayments.api.models.addons.AddonUpdateImagesResponse\n\nfun main() {\n    val client: DodoPaymentsClient = DodoPaymentsOkHttpClient.fromEnv()\n\n    val response: AddonUpdateImagesResponse = client.addons().updateImages("id")\n}',
      },
      php: {
        method: 'addons->updateImages',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(bearerToken: 'My Bearer Token', environment: 'test_mode');\n\n$response = $client->addons->updateImages('id');\n\nvar_dump($response);",
      },
      python: {
        method: 'addons.update_images',
        example:
          'import os\nfrom dodopayments import DodoPayments\n\nclient = DodoPayments(\n    bearer_token=os.environ.get("DODO_PAYMENTS_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.addons.update_images(\n    "id",\n)\nprint(response.image_id)',
      },
      ruby: {
        method: 'addons.update_images',
        example:
          'require "dodopayments"\n\ndodo_payments = Dodopayments::Client.new(\n  bearer_token: "My Bearer Token",\n  environment: "test_mode" # defaults to "live_mode"\n)\n\nresponse = dodo_payments.addons.update_images("id")\n\nputs(response)',
      },
      typescript: {
        method: 'client.addons.updateImages',
        example:
          "import DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments({\n  bearerToken: process.env['DODO_PAYMENTS_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.addons.updateImages('id');\n\nconsole.log(response.image_id);",
      },
    },
  },
  {
    name: 'list',
    endpoint: '/brands',
    httpMethod: 'get',
    summary: '',
    description: '',
    stainlessPath: '(resource) brands > (method) list',
    qualified: 'client.brands.list',
    response:
      "{ items: { brand_id: string; business_id: string; enabled: boolean; statement_descriptor: string; verification_enabled: boolean; verification_status: 'Success' | 'Fail' | 'Review' | 'Hold'; description?: string; image?: string; name?: string; reason_for_hold?: string; support_email?: string; url?: string; }[]; }",
    markdown:
      "## list\n\n`client.brands.list(): { items: brand[]; }`\n\n**get** `/brands`\n\n### Returns\n\n- `{ items: { brand_id: string; business_id: string; enabled: boolean; statement_descriptor: string; verification_enabled: boolean; verification_status: 'Success' | 'Fail' | 'Review' | 'Hold'; description?: string; image?: string; name?: string; reason_for_hold?: string; support_email?: string; url?: string; }[]; }`\n\n  - `items: { brand_id: string; business_id: string; enabled: boolean; statement_descriptor: string; verification_enabled: boolean; verification_status: 'Success' | 'Fail' | 'Review' | 'Hold'; description?: string; image?: string; name?: string; reason_for_hold?: string; support_email?: string; url?: string; }[]`\n\n### Example\n\n```typescript\nimport DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments();\n\nconst brands = await client.brands.list();\n\nconsole.log(brands);\n```",
    perLanguage: {
      cli: {
        method: 'brands list',
        example: "dodo-payments-cli brands list \\\n  --bearer-token 'My Bearer Token'",
      },
      csharp: {
        method: 'Brands.List',
        example:
          'BrandListParams parameters = new();\n\nvar brands = await client.Brands.List(parameters);\n\nConsole.WriteLine(brands);',
      },
      go: {
        method: 'client.Brands.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/dodopayments/dodopayments-go"\n\t"github.com/dodopayments/dodopayments-go/option"\n)\n\nfunc main() {\n\tclient := dodopayments.NewClient(\n\t\toption.WithBearerToken("My Bearer Token"),\n\t)\n\tbrands, err := client.Brands.List(context.TODO())\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", brands.Items)\n}\n',
      },
      http: {
        example:
          'curl https://live.dodopayments.com/brands \\\n    -H "Authorization: Bearer $DODO_PAYMENTS_API_KEY"',
      },
      java: {
        method: 'brands().list',
        example:
          'package com.dodopayments.api.example;\n\nimport com.dodopayments.api.client.DodoPaymentsClient;\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient;\nimport com.dodopayments.api.models.brands.BrandListParams;\nimport com.dodopayments.api.models.brands.BrandListResponse;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        DodoPaymentsClient client = DodoPaymentsOkHttpClient.fromEnv();\n\n        BrandListResponse brands = client.brands().list();\n    }\n}',
      },
      kotlin: {
        method: 'brands().list',
        example:
          'package com.dodopayments.api.example\n\nimport com.dodopayments.api.client.DodoPaymentsClient\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient\nimport com.dodopayments.api.models.brands.BrandListParams\nimport com.dodopayments.api.models.brands.BrandListResponse\n\nfun main() {\n    val client: DodoPaymentsClient = DodoPaymentsOkHttpClient.fromEnv()\n\n    val brands: BrandListResponse = client.brands().list()\n}',
      },
      php: {
        method: 'brands->list',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(bearerToken: 'My Bearer Token', environment: 'test_mode');\n\n$brands = $client->brands->list();\n\nvar_dump($brands);",
      },
      python: {
        method: 'brands.list',
        example:
          'import os\nfrom dodopayments import DodoPayments\n\nclient = DodoPayments(\n    bearer_token=os.environ.get("DODO_PAYMENTS_API_KEY"),  # This is the default and can be omitted\n)\nbrands = client.brands.list()\nprint(brands.items)',
      },
      ruby: {
        method: 'brands.list',
        example:
          'require "dodopayments"\n\ndodo_payments = Dodopayments::Client.new(\n  bearer_token: "My Bearer Token",\n  environment: "test_mode" # defaults to "live_mode"\n)\n\nbrands = dodo_payments.brands.list\n\nputs(brands)',
      },
      typescript: {
        method: 'client.brands.list',
        example:
          "import DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments({\n  bearerToken: process.env['DODO_PAYMENTS_API_KEY'], // This is the default and can be omitted\n});\n\nconst brands = await client.brands.list();\n\nconsole.log(brands.items);",
      },
    },
  },
  {
    name: 'create',
    endpoint: '/brands',
    httpMethod: 'post',
    summary: '',
    description: '',
    stainlessPath: '(resource) brands > (method) create',
    qualified: 'client.brands.create',
    params: [
      'description?: string;',
      'name?: string;',
      'statement_descriptor?: string;',
      'support_email?: string;',
      'url?: string;',
    ],
    response:
      "{ brand_id: string; business_id: string; enabled: boolean; statement_descriptor: string; verification_enabled: boolean; verification_status: 'Success' | 'Fail' | 'Review' | 'Hold'; description?: string; image?: string; name?: string; reason_for_hold?: string; support_email?: string; url?: string; }",
    markdown:
      "## create\n\n`client.brands.create(description?: string, name?: string, statement_descriptor?: string, support_email?: string, url?: string): { brand_id: string; business_id: string; enabled: boolean; statement_descriptor: string; verification_enabled: boolean; verification_status: 'Success' | 'Fail' | 'Review' | 'Hold'; description?: string; image?: string; name?: string; reason_for_hold?: string; support_email?: string; url?: string; }`\n\n**post** `/brands`\n\n### Parameters\n\n- `description?: string`\n\n- `name?: string`\n\n- `statement_descriptor?: string`\n\n- `support_email?: string`\n\n- `url?: string`\n\n### Returns\n\n- `{ brand_id: string; business_id: string; enabled: boolean; statement_descriptor: string; verification_enabled: boolean; verification_status: 'Success' | 'Fail' | 'Review' | 'Hold'; description?: string; image?: string; name?: string; reason_for_hold?: string; support_email?: string; url?: string; }`\n\n  - `brand_id: string`\n  - `business_id: string`\n  - `enabled: boolean`\n  - `statement_descriptor: string`\n  - `verification_enabled: boolean`\n  - `verification_status: 'Success' | 'Fail' | 'Review' | 'Hold'`\n  - `description?: string`\n  - `image?: string`\n  - `name?: string`\n  - `reason_for_hold?: string`\n  - `support_email?: string`\n  - `url?: string`\n\n### Example\n\n```typescript\nimport DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments();\n\nconst brand = await client.brands.create();\n\nconsole.log(brand);\n```",
    perLanguage: {
      cli: {
        method: 'brands create',
        example: "dodo-payments-cli brands create \\\n  --bearer-token 'My Bearer Token'",
      },
      csharp: {
        method: 'Brands.Create',
        example:
          'BrandCreateParams parameters = new();\n\nvar brand = await client.Brands.Create(parameters);\n\nConsole.WriteLine(brand);',
      },
      go: {
        method: 'client.Brands.New',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/dodopayments/dodopayments-go"\n\t"github.com/dodopayments/dodopayments-go/option"\n)\n\nfunc main() {\n\tclient := dodopayments.NewClient(\n\t\toption.WithBearerToken("My Bearer Token"),\n\t)\n\tbrand, err := client.Brands.New(context.TODO(), dodopayments.BrandNewParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", brand.BrandID)\n}\n',
      },
      http: {
        example:
          "curl https://live.dodopayments.com/brands \\\n    -H 'Content-Type: application/json' \\\n    -H \"Authorization: Bearer $DODO_PAYMENTS_API_KEY\" \\\n    -d '{}'",
      },
      java: {
        method: 'brands().create',
        example:
          'package com.dodopayments.api.example;\n\nimport com.dodopayments.api.client.DodoPaymentsClient;\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient;\nimport com.dodopayments.api.models.brands.Brand;\nimport com.dodopayments.api.models.brands.BrandCreateParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        DodoPaymentsClient client = DodoPaymentsOkHttpClient.fromEnv();\n\n        Brand brand = client.brands().create();\n    }\n}',
      },
      kotlin: {
        method: 'brands().create',
        example:
          'package com.dodopayments.api.example\n\nimport com.dodopayments.api.client.DodoPaymentsClient\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient\nimport com.dodopayments.api.models.brands.Brand\nimport com.dodopayments.api.models.brands.BrandCreateParams\n\nfun main() {\n    val client: DodoPaymentsClient = DodoPaymentsOkHttpClient.fromEnv()\n\n    val brand: Brand = client.brands().create()\n}',
      },
      php: {
        method: 'brands->create',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(bearerToken: 'My Bearer Token', environment: 'test_mode');\n\n$brand = $client->brands->create(\n  description: 'description',\n  name: 'name',\n  statementDescriptor: 'statement_descriptor',\n  supportEmail: 'support_email',\n  url: 'url',\n);\n\nvar_dump($brand);",
      },
      python: {
        method: 'brands.create',
        example:
          'import os\nfrom dodopayments import DodoPayments\n\nclient = DodoPayments(\n    bearer_token=os.environ.get("DODO_PAYMENTS_API_KEY"),  # This is the default and can be omitted\n)\nbrand = client.brands.create()\nprint(brand.brand_id)',
      },
      ruby: {
        method: 'brands.create',
        example:
          'require "dodopayments"\n\ndodo_payments = Dodopayments::Client.new(\n  bearer_token: "My Bearer Token",\n  environment: "test_mode" # defaults to "live_mode"\n)\n\nbrand = dodo_payments.brands.create\n\nputs(brand)',
      },
      typescript: {
        method: 'client.brands.create',
        example:
          "import DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments({\n  bearerToken: process.env['DODO_PAYMENTS_API_KEY'], // This is the default and can be omitted\n});\n\nconst brand = await client.brands.create();\n\nconsole.log(brand.brand_id);",
      },
    },
  },
  {
    name: 'retrieve',
    endpoint: '/brands/{id}',
    httpMethod: 'get',
    summary: 'Thin handler just calls `get_brand` and wraps in `Json(...)`',
    description: 'Thin handler just calls `get_brand` and wraps in `Json(...)`',
    stainlessPath: '(resource) brands > (method) retrieve',
    qualified: 'client.brands.retrieve',
    params: ['id: string;'],
    response:
      "{ brand_id: string; business_id: string; enabled: boolean; statement_descriptor: string; verification_enabled: boolean; verification_status: 'Success' | 'Fail' | 'Review' | 'Hold'; description?: string; image?: string; name?: string; reason_for_hold?: string; support_email?: string; url?: string; }",
    markdown:
      "## retrieve\n\n`client.brands.retrieve(id: string): { brand_id: string; business_id: string; enabled: boolean; statement_descriptor: string; verification_enabled: boolean; verification_status: 'Success' | 'Fail' | 'Review' | 'Hold'; description?: string; image?: string; name?: string; reason_for_hold?: string; support_email?: string; url?: string; }`\n\n**get** `/brands/{id}`\n\nThin handler just calls `get_brand` and wraps in `Json(...)`\n\n### Parameters\n\n- `id: string`\n\n### Returns\n\n- `{ brand_id: string; business_id: string; enabled: boolean; statement_descriptor: string; verification_enabled: boolean; verification_status: 'Success' | 'Fail' | 'Review' | 'Hold'; description?: string; image?: string; name?: string; reason_for_hold?: string; support_email?: string; url?: string; }`\n\n  - `brand_id: string`\n  - `business_id: string`\n  - `enabled: boolean`\n  - `statement_descriptor: string`\n  - `verification_enabled: boolean`\n  - `verification_status: 'Success' | 'Fail' | 'Review' | 'Hold'`\n  - `description?: string`\n  - `image?: string`\n  - `name?: string`\n  - `reason_for_hold?: string`\n  - `support_email?: string`\n  - `url?: string`\n\n### Example\n\n```typescript\nimport DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments();\n\nconst brand = await client.brands.retrieve('id');\n\nconsole.log(brand);\n```",
    perLanguage: {
      cli: {
        method: 'brands retrieve',
        example: "dodo-payments-cli brands retrieve \\\n  --bearer-token 'My Bearer Token' \\\n  --id id",
      },
      csharp: {
        method: 'Brands.Retrieve',
        example:
          'BrandRetrieveParams parameters = new() { ID = "id" };\n\nvar brand = await client.Brands.Retrieve(parameters);\n\nConsole.WriteLine(brand);',
      },
      go: {
        method: 'client.Brands.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/dodopayments/dodopayments-go"\n\t"github.com/dodopayments/dodopayments-go/option"\n)\n\nfunc main() {\n\tclient := dodopayments.NewClient(\n\t\toption.WithBearerToken("My Bearer Token"),\n\t)\n\tbrand, err := client.Brands.Get(context.TODO(), "id")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", brand.BrandID)\n}\n',
      },
      http: {
        example:
          'curl https://live.dodopayments.com/brands/$ID \\\n    -H "Authorization: Bearer $DODO_PAYMENTS_API_KEY"',
      },
      java: {
        method: 'brands().retrieve',
        example:
          'package com.dodopayments.api.example;\n\nimport com.dodopayments.api.client.DodoPaymentsClient;\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient;\nimport com.dodopayments.api.models.brands.Brand;\nimport com.dodopayments.api.models.brands.BrandRetrieveParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        DodoPaymentsClient client = DodoPaymentsOkHttpClient.fromEnv();\n\n        Brand brand = client.brands().retrieve("id");\n    }\n}',
      },
      kotlin: {
        method: 'brands().retrieve',
        example:
          'package com.dodopayments.api.example\n\nimport com.dodopayments.api.client.DodoPaymentsClient\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient\nimport com.dodopayments.api.models.brands.Brand\nimport com.dodopayments.api.models.brands.BrandRetrieveParams\n\nfun main() {\n    val client: DodoPaymentsClient = DodoPaymentsOkHttpClient.fromEnv()\n\n    val brand: Brand = client.brands().retrieve("id")\n}',
      },
      php: {
        method: 'brands->retrieve',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(bearerToken: 'My Bearer Token', environment: 'test_mode');\n\n$brand = $client->brands->retrieve('id');\n\nvar_dump($brand);",
      },
      python: {
        method: 'brands.retrieve',
        example:
          'import os\nfrom dodopayments import DodoPayments\n\nclient = DodoPayments(\n    bearer_token=os.environ.get("DODO_PAYMENTS_API_KEY"),  # This is the default and can be omitted\n)\nbrand = client.brands.retrieve(\n    "id",\n)\nprint(brand.brand_id)',
      },
      ruby: {
        method: 'brands.retrieve',
        example:
          'require "dodopayments"\n\ndodo_payments = Dodopayments::Client.new(\n  bearer_token: "My Bearer Token",\n  environment: "test_mode" # defaults to "live_mode"\n)\n\nbrand = dodo_payments.brands.retrieve("id")\n\nputs(brand)',
      },
      typescript: {
        method: 'client.brands.retrieve',
        example:
          "import DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments({\n  bearerToken: process.env['DODO_PAYMENTS_API_KEY'], // This is the default and can be omitted\n});\n\nconst brand = await client.brands.retrieve('id');\n\nconsole.log(brand.brand_id);",
      },
    },
  },
  {
    name: 'update',
    endpoint: '/brands/{id}',
    httpMethod: 'patch',
    summary: '',
    description: '',
    stainlessPath: '(resource) brands > (method) update',
    qualified: 'client.brands.update',
    params: [
      'id: string;',
      'description?: string;',
      'image_id?: string;',
      'name?: string;',
      'statement_descriptor?: string;',
      'support_email?: string;',
      'url?: string;',
    ],
    response:
      "{ brand_id: string; business_id: string; enabled: boolean; statement_descriptor: string; verification_enabled: boolean; verification_status: 'Success' | 'Fail' | 'Review' | 'Hold'; description?: string; image?: string; name?: string; reason_for_hold?: string; support_email?: string; url?: string; }",
    markdown:
      "## update\n\n`client.brands.update(id: string, description?: string, image_id?: string, name?: string, statement_descriptor?: string, support_email?: string, url?: string): { brand_id: string; business_id: string; enabled: boolean; statement_descriptor: string; verification_enabled: boolean; verification_status: 'Success' | 'Fail' | 'Review' | 'Hold'; description?: string; image?: string; name?: string; reason_for_hold?: string; support_email?: string; url?: string; }`\n\n**patch** `/brands/{id}`\n\n### Parameters\n\n- `id: string`\n\n- `description?: string`\n\n- `image_id?: string`\n  The UUID you got back from the presigned‐upload call\n\n- `name?: string`\n\n- `statement_descriptor?: string`\n\n- `support_email?: string`\n\n- `url?: string`\n\n### Returns\n\n- `{ brand_id: string; business_id: string; enabled: boolean; statement_descriptor: string; verification_enabled: boolean; verification_status: 'Success' | 'Fail' | 'Review' | 'Hold'; description?: string; image?: string; name?: string; reason_for_hold?: string; support_email?: string; url?: string; }`\n\n  - `brand_id: string`\n  - `business_id: string`\n  - `enabled: boolean`\n  - `statement_descriptor: string`\n  - `verification_enabled: boolean`\n  - `verification_status: 'Success' | 'Fail' | 'Review' | 'Hold'`\n  - `description?: string`\n  - `image?: string`\n  - `name?: string`\n  - `reason_for_hold?: string`\n  - `support_email?: string`\n  - `url?: string`\n\n### Example\n\n```typescript\nimport DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments();\n\nconst brand = await client.brands.update('id');\n\nconsole.log(brand);\n```",
    perLanguage: {
      cli: {
        method: 'brands update',
        example: "dodo-payments-cli brands update \\\n  --bearer-token 'My Bearer Token' \\\n  --id id",
      },
      csharp: {
        method: 'Brands.Update',
        example:
          'BrandUpdateParams parameters = new() { ID = "id" };\n\nvar brand = await client.Brands.Update(parameters);\n\nConsole.WriteLine(brand);',
      },
      go: {
        method: 'client.Brands.Update',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/dodopayments/dodopayments-go"\n\t"github.com/dodopayments/dodopayments-go/option"\n)\n\nfunc main() {\n\tclient := dodopayments.NewClient(\n\t\toption.WithBearerToken("My Bearer Token"),\n\t)\n\tbrand, err := client.Brands.Update(\n\t\tcontext.TODO(),\n\t\t"id",\n\t\tdodopayments.BrandUpdateParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", brand.BrandID)\n}\n',
      },
      http: {
        example:
          "curl https://live.dodopayments.com/brands/$ID \\\n    -X PATCH \\\n    -H 'Content-Type: application/json' \\\n    -H \"Authorization: Bearer $DODO_PAYMENTS_API_KEY\" \\\n    -d '{}'",
      },
      java: {
        method: 'brands().update',
        example:
          'package com.dodopayments.api.example;\n\nimport com.dodopayments.api.client.DodoPaymentsClient;\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient;\nimport com.dodopayments.api.models.brands.Brand;\nimport com.dodopayments.api.models.brands.BrandUpdateParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        DodoPaymentsClient client = DodoPaymentsOkHttpClient.fromEnv();\n\n        Brand brand = client.brands().update("id");\n    }\n}',
      },
      kotlin: {
        method: 'brands().update',
        example:
          'package com.dodopayments.api.example\n\nimport com.dodopayments.api.client.DodoPaymentsClient\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient\nimport com.dodopayments.api.models.brands.Brand\nimport com.dodopayments.api.models.brands.BrandUpdateParams\n\nfun main() {\n    val client: DodoPaymentsClient = DodoPaymentsOkHttpClient.fromEnv()\n\n    val brand: Brand = client.brands().update("id")\n}',
      },
      php: {
        method: 'brands->update',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(bearerToken: 'My Bearer Token', environment: 'test_mode');\n\n$brand = $client->brands->update(\n  'id',\n  description: 'description',\n  imageID: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',\n  name: 'name',\n  statementDescriptor: 'statement_descriptor',\n  supportEmail: 'support_email',\n  url: 'url',\n);\n\nvar_dump($brand);",
      },
      python: {
        method: 'brands.update',
        example:
          'import os\nfrom dodopayments import DodoPayments\n\nclient = DodoPayments(\n    bearer_token=os.environ.get("DODO_PAYMENTS_API_KEY"),  # This is the default and can be omitted\n)\nbrand = client.brands.update(\n    id="id",\n)\nprint(brand.brand_id)',
      },
      ruby: {
        method: 'brands.update',
        example:
          'require "dodopayments"\n\ndodo_payments = Dodopayments::Client.new(\n  bearer_token: "My Bearer Token",\n  environment: "test_mode" # defaults to "live_mode"\n)\n\nbrand = dodo_payments.brands.update("id")\n\nputs(brand)',
      },
      typescript: {
        method: 'client.brands.update',
        example:
          "import DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments({\n  bearerToken: process.env['DODO_PAYMENTS_API_KEY'], // This is the default and can be omitted\n});\n\nconst brand = await client.brands.update('id');\n\nconsole.log(brand.brand_id);",
      },
    },
  },
  {
    name: 'update_images',
    endpoint: '/brands/{id}/images',
    httpMethod: 'put',
    summary: '',
    description: '',
    stainlessPath: '(resource) brands > (method) update_images',
    qualified: 'client.brands.updateImages',
    params: ['id: string;'],
    response: '{ image_id: string; url: string; }',
    markdown:
      "## update_images\n\n`client.brands.updateImages(id: string): { image_id: string; url: string; }`\n\n**put** `/brands/{id}/images`\n\n### Parameters\n\n- `id: string`\n\n### Returns\n\n- `{ image_id: string; url: string; }`\n\n  - `image_id: string`\n  - `url: string`\n\n### Example\n\n```typescript\nimport DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments();\n\nconst response = await client.brands.updateImages('id');\n\nconsole.log(response);\n```",
    perLanguage: {
      cli: {
        method: 'brands update_images',
        example:
          "dodo-payments-cli brands update-images \\\n  --bearer-token 'My Bearer Token' \\\n  --id id",
      },
      csharp: {
        method: 'Brands.UpdateImages',
        example:
          'BrandUpdateImagesParams parameters = new() { ID = "id" };\n\nvar response = await client.Brands.UpdateImages(parameters);\n\nConsole.WriteLine(response);',
      },
      go: {
        method: 'client.Brands.UpdateImages',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/dodopayments/dodopayments-go"\n\t"github.com/dodopayments/dodopayments-go/option"\n)\n\nfunc main() {\n\tclient := dodopayments.NewClient(\n\t\toption.WithBearerToken("My Bearer Token"),\n\t)\n\tresponse, err := client.Brands.UpdateImages(context.TODO(), "id")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.ImageID)\n}\n',
      },
      http: {
        example:
          'curl https://live.dodopayments.com/brands/$ID/images \\\n    -X PUT \\\n    -H "Authorization: Bearer $DODO_PAYMENTS_API_KEY"',
      },
      java: {
        method: 'brands().updateImages',
        example:
          'package com.dodopayments.api.example;\n\nimport com.dodopayments.api.client.DodoPaymentsClient;\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient;\nimport com.dodopayments.api.models.brands.BrandUpdateImagesParams;\nimport com.dodopayments.api.models.brands.BrandUpdateImagesResponse;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        DodoPaymentsClient client = DodoPaymentsOkHttpClient.fromEnv();\n\n        BrandUpdateImagesResponse response = client.brands().updateImages("id");\n    }\n}',
      },
      kotlin: {
        method: 'brands().updateImages',
        example:
          'package com.dodopayments.api.example\n\nimport com.dodopayments.api.client.DodoPaymentsClient\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient\nimport com.dodopayments.api.models.brands.BrandUpdateImagesParams\nimport com.dodopayments.api.models.brands.BrandUpdateImagesResponse\n\nfun main() {\n    val client: DodoPaymentsClient = DodoPaymentsOkHttpClient.fromEnv()\n\n    val response: BrandUpdateImagesResponse = client.brands().updateImages("id")\n}',
      },
      php: {
        method: 'brands->updateImages',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(bearerToken: 'My Bearer Token', environment: 'test_mode');\n\n$response = $client->brands->updateImages('id');\n\nvar_dump($response);",
      },
      python: {
        method: 'brands.update_images',
        example:
          'import os\nfrom dodopayments import DodoPayments\n\nclient = DodoPayments(\n    bearer_token=os.environ.get("DODO_PAYMENTS_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.brands.update_images(\n    "id",\n)\nprint(response.image_id)',
      },
      ruby: {
        method: 'brands.update_images',
        example:
          'require "dodopayments"\n\ndodo_payments = Dodopayments::Client.new(\n  bearer_token: "My Bearer Token",\n  environment: "test_mode" # defaults to "live_mode"\n)\n\nresponse = dodo_payments.brands.update_images("id")\n\nputs(response)',
      },
      typescript: {
        method: 'client.brands.updateImages',
        example:
          "import DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments({\n  bearerToken: process.env['DODO_PAYMENTS_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.brands.updateImages('id');\n\nconsole.log(response.image_id);",
      },
    },
  },
  {
    name: 'list',
    endpoint: '/webhooks',
    httpMethod: 'get',
    summary: 'List all webhooks',
    description: 'List all webhooks',
    stainlessPath: '(resource) webhooks > (method) list',
    qualified: 'client.webhooks.list',
    params: ['iterator?: string;', 'limit?: number;'],
    response:
      '{ id: string; created_at: string; description: string; metadata: object; updated_at: string; url: string; disabled?: boolean; filter_types?: string[]; rate_limit?: number; }',
    markdown:
      "## list\n\n`client.webhooks.list(iterator?: string, limit?: number): { id: string; created_at: string; description: string; metadata: object; updated_at: string; url: string; disabled?: boolean; filter_types?: string[]; rate_limit?: number; }`\n\n**get** `/webhooks`\n\nList all webhooks\n\n### Parameters\n\n- `iterator?: string`\n  The iterator returned from a prior invocation\n\n- `limit?: number`\n  Limit the number of returned items\n\n### Returns\n\n- `{ id: string; created_at: string; description: string; metadata: object; updated_at: string; url: string; disabled?: boolean; filter_types?: string[]; rate_limit?: number; }`\n\n  - `id: string`\n  - `created_at: string`\n  - `description: string`\n  - `metadata: object`\n  - `updated_at: string`\n  - `url: string`\n  - `disabled?: boolean`\n  - `filter_types?: string[]`\n  - `rate_limit?: number`\n\n### Example\n\n```typescript\nimport DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments();\n\n// Automatically fetches more pages as needed.\nfor await (const webhookDetails of client.webhooks.list()) {\n  console.log(webhookDetails);\n}\n```",
    perLanguage: {
      cli: {
        method: 'webhooks list',
        example: "dodo-payments-cli webhooks list \\\n  --bearer-token 'My Bearer Token'",
      },
      csharp: {
        method: 'Webhooks.List',
        example:
          'WebhookListParams parameters = new();\n\nvar page = await client.Webhooks.List(parameters);\nawait foreach (var item in page.Paginate())\n{\n    Console.WriteLine(item);\n}',
      },
      go: {
        method: 'client.Webhooks.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/dodopayments/dodopayments-go"\n\t"github.com/dodopayments/dodopayments-go/option"\n)\n\nfunc main() {\n\tclient := dodopayments.NewClient(\n\t\toption.WithBearerToken("My Bearer Token"),\n\t)\n\tpage, err := client.Webhooks.List(context.TODO(), dodopayments.WebhookListParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", page)\n}\n',
      },
      http: {
        example:
          'curl https://live.dodopayments.com/webhooks \\\n    -H "Authorization: Bearer $DODO_PAYMENTS_API_KEY"',
      },
      java: {
        method: 'webhooks().list',
        example:
          'package com.dodopayments.api.example;\n\nimport com.dodopayments.api.client.DodoPaymentsClient;\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient;\nimport com.dodopayments.api.models.webhooks.WebhookListPage;\nimport com.dodopayments.api.models.webhooks.WebhookListParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        DodoPaymentsClient client = DodoPaymentsOkHttpClient.fromEnv();\n\n        WebhookListPage page = client.webhooks().list();\n    }\n}',
      },
      kotlin: {
        method: 'webhooks().list',
        example:
          'package com.dodopayments.api.example\n\nimport com.dodopayments.api.client.DodoPaymentsClient\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient\nimport com.dodopayments.api.models.webhooks.WebhookListPage\nimport com.dodopayments.api.models.webhooks.WebhookListParams\n\nfun main() {\n    val client: DodoPaymentsClient = DodoPaymentsOkHttpClient.fromEnv()\n\n    val page: WebhookListPage = client.webhooks().list()\n}',
      },
      php: {
        method: 'webhooks->list',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(bearerToken: 'My Bearer Token', environment: 'test_mode');\n\n$page = $client->webhooks->list(iterator: 'iterator', limit: 0);\n\nvar_dump($page);",
      },
      python: {
        method: 'webhooks.list',
        example:
          'import os\nfrom dodopayments import DodoPayments\n\nclient = DodoPayments(\n    bearer_token=os.environ.get("DODO_PAYMENTS_API_KEY"),  # This is the default and can be omitted\n)\npage = client.webhooks.list()\npage = page.data[0]\nprint(page.id)',
      },
      ruby: {
        method: 'webhooks.list',
        example:
          'require "dodopayments"\n\ndodo_payments = Dodopayments::Client.new(\n  bearer_token: "My Bearer Token",\n  environment: "test_mode" # defaults to "live_mode"\n)\n\npage = dodo_payments.webhooks.list\n\nputs(page)',
      },
      typescript: {
        method: 'client.webhooks.list',
        example:
          "import DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments({\n  bearerToken: process.env['DODO_PAYMENTS_API_KEY'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const webhookDetails of client.webhooks.list()) {\n  console.log(webhookDetails.id);\n}",
      },
    },
  },
  {
    name: 'create',
    endpoint: '/webhooks',
    httpMethod: 'post',
    summary: 'Create a new webhook',
    description: 'Create a new webhook',
    stainlessPath: '(resource) webhooks > (method) create',
    qualified: 'client.webhooks.create',
    params: [
      'url: string;',
      'description?: string;',
      'disabled?: boolean;',
      'filter_types?: string[];',
      'headers?: object;',
      'idempotency_key?: string;',
      'metadata?: object;',
      'rate_limit?: number;',
    ],
    response:
      '{ id: string; created_at: string; description: string; metadata: object; updated_at: string; url: string; disabled?: boolean; filter_types?: string[]; rate_limit?: number; }',
    markdown:
      "## create\n\n`client.webhooks.create(url: string, description?: string, disabled?: boolean, filter_types?: string[], headers?: object, idempotency_key?: string, metadata?: object, rate_limit?: number): { id: string; created_at: string; description: string; metadata: object; updated_at: string; url: string; disabled?: boolean; filter_types?: string[]; rate_limit?: number; }`\n\n**post** `/webhooks`\n\nCreate a new webhook\n\n### Parameters\n\n- `url: string`\n  Url of the webhook\n\n- `description?: string`\n\n- `disabled?: boolean`\n  Create the webhook in a disabled state.\n\nDefault is false\n\n- `filter_types?: string[]`\n  Filter events to the webhook.\n\nWebhook event will only be sent for events in the list.\n\n- `headers?: object`\n  Custom headers to be passed\n\n- `idempotency_key?: string`\n  The request's idempotency key\n\n- `metadata?: object`\n  Metadata to be passed to the webhook\nDefaut is {}\n\n- `rate_limit?: number`\n\n### Returns\n\n- `{ id: string; created_at: string; description: string; metadata: object; updated_at: string; url: string; disabled?: boolean; filter_types?: string[]; rate_limit?: number; }`\n\n  - `id: string`\n  - `created_at: string`\n  - `description: string`\n  - `metadata: object`\n  - `updated_at: string`\n  - `url: string`\n  - `disabled?: boolean`\n  - `filter_types?: string[]`\n  - `rate_limit?: number`\n\n### Example\n\n```typescript\nimport DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments();\n\nconst webhookDetails = await client.webhooks.create({ url: 'url' });\n\nconsole.log(webhookDetails);\n```",
    perLanguage: {
      cli: {
        method: 'webhooks create',
        example: "dodo-payments-cli webhooks create \\\n  --bearer-token 'My Bearer Token' \\\n  --url url",
      },
      csharp: {
        method: 'Webhooks.Create',
        example:
          'WebhookCreateParams parameters = new() { Url = "url" };\n\nvar webhookDetails = await client.Webhooks.Create(parameters);\n\nConsole.WriteLine(webhookDetails);',
      },
      go: {
        method: 'client.Webhooks.New',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/dodopayments/dodopayments-go"\n\t"github.com/dodopayments/dodopayments-go/option"\n)\n\nfunc main() {\n\tclient := dodopayments.NewClient(\n\t\toption.WithBearerToken("My Bearer Token"),\n\t)\n\twebhookDetails, err := client.Webhooks.New(context.TODO(), dodopayments.WebhookNewParams{\n\t\tURL: dodopayments.F("url"),\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", webhookDetails.ID)\n}\n',
      },
      http: {
        example:
          'curl https://live.dodopayments.com/webhooks \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $DODO_PAYMENTS_API_KEY" \\\n    -d \'{\n          "url": "url"\n        }\'',
      },
      java: {
        method: 'webhooks().create',
        example:
          'package com.dodopayments.api.example;\n\nimport com.dodopayments.api.client.DodoPaymentsClient;\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient;\nimport com.dodopayments.api.models.webhooks.WebhookCreateParams;\nimport com.dodopayments.api.models.webhooks.WebhookDetails;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        DodoPaymentsClient client = DodoPaymentsOkHttpClient.fromEnv();\n\n        WebhookCreateParams params = WebhookCreateParams.builder()\n            .url("url")\n            .build();\n        WebhookDetails webhookDetails = client.webhooks().create(params);\n    }\n}',
      },
      kotlin: {
        method: 'webhooks().create',
        example:
          'package com.dodopayments.api.example\n\nimport com.dodopayments.api.client.DodoPaymentsClient\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient\nimport com.dodopayments.api.models.webhooks.WebhookCreateParams\nimport com.dodopayments.api.models.webhooks.WebhookDetails\n\nfun main() {\n    val client: DodoPaymentsClient = DodoPaymentsOkHttpClient.fromEnv()\n\n    val params: WebhookCreateParams = WebhookCreateParams.builder()\n        .url("url")\n        .build()\n    val webhookDetails: WebhookDetails = client.webhooks().create(params)\n}',
      },
      php: {
        method: 'webhooks->create',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(bearerToken: 'My Bearer Token', environment: 'test_mode');\n\n$webhookDetails = $client->webhooks->create(\n  url: 'url',\n  description: 'description',\n  disabled: true,\n  filterTypes: [WebhookEventType::PAYMENT_SUCCEEDED],\n  headers: ['foo' => 'string'],\n  idempotencyKey: 'idempotency_key',\n  metadata: ['foo' => 'string'],\n  rateLimit: 0,\n);\n\nvar_dump($webhookDetails);",
      },
      python: {
        method: 'webhooks.create',
        example:
          'import os\nfrom dodopayments import DodoPayments\n\nclient = DodoPayments(\n    bearer_token=os.environ.get("DODO_PAYMENTS_API_KEY"),  # This is the default and can be omitted\n)\nwebhook_details = client.webhooks.create(\n    url="url",\n)\nprint(webhook_details.id)',
      },
      ruby: {
        method: 'webhooks.create',
        example:
          'require "dodopayments"\n\ndodo_payments = Dodopayments::Client.new(\n  bearer_token: "My Bearer Token",\n  environment: "test_mode" # defaults to "live_mode"\n)\n\nwebhook_details = dodo_payments.webhooks.create(url: "url")\n\nputs(webhook_details)',
      },
      typescript: {
        method: 'client.webhooks.create',
        example:
          "import DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments({\n  bearerToken: process.env['DODO_PAYMENTS_API_KEY'], // This is the default and can be omitted\n});\n\nconst webhookDetails = await client.webhooks.create({ url: 'url' });\n\nconsole.log(webhookDetails.id);",
      },
    },
  },
  {
    name: 'retrieve',
    endpoint: '/webhooks/{webhook_id}',
    httpMethod: 'get',
    summary: 'Get a webhook by id',
    description: 'Get a webhook by id',
    stainlessPath: '(resource) webhooks > (method) retrieve',
    qualified: 'client.webhooks.retrieve',
    params: ['webhook_id: string;'],
    response:
      '{ id: string; created_at: string; description: string; metadata: object; updated_at: string; url: string; disabled?: boolean; filter_types?: string[]; rate_limit?: number; }',
    markdown:
      "## retrieve\n\n`client.webhooks.retrieve(webhook_id: string): { id: string; created_at: string; description: string; metadata: object; updated_at: string; url: string; disabled?: boolean; filter_types?: string[]; rate_limit?: number; }`\n\n**get** `/webhooks/{webhook_id}`\n\nGet a webhook by id\n\n### Parameters\n\n- `webhook_id: string`\n\n### Returns\n\n- `{ id: string; created_at: string; description: string; metadata: object; updated_at: string; url: string; disabled?: boolean; filter_types?: string[]; rate_limit?: number; }`\n\n  - `id: string`\n  - `created_at: string`\n  - `description: string`\n  - `metadata: object`\n  - `updated_at: string`\n  - `url: string`\n  - `disabled?: boolean`\n  - `filter_types?: string[]`\n  - `rate_limit?: number`\n\n### Example\n\n```typescript\nimport DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments();\n\nconst webhookDetails = await client.webhooks.retrieve('webhook_id');\n\nconsole.log(webhookDetails);\n```",
    perLanguage: {
      cli: {
        method: 'webhooks retrieve',
        example:
          "dodo-payments-cli webhooks retrieve \\\n  --bearer-token 'My Bearer Token' \\\n  --webhook-id webhook_id",
      },
      csharp: {
        method: 'Webhooks.Retrieve',
        example:
          'WebhookRetrieveParams parameters = new() { WebhookID = "webhook_id" };\n\nvar webhookDetails = await client.Webhooks.Retrieve(parameters);\n\nConsole.WriteLine(webhookDetails);',
      },
      go: {
        method: 'client.Webhooks.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/dodopayments/dodopayments-go"\n\t"github.com/dodopayments/dodopayments-go/option"\n)\n\nfunc main() {\n\tclient := dodopayments.NewClient(\n\t\toption.WithBearerToken("My Bearer Token"),\n\t)\n\twebhookDetails, err := client.Webhooks.Get(context.TODO(), "webhook_id")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", webhookDetails.ID)\n}\n',
      },
      http: {
        example:
          'curl https://live.dodopayments.com/webhooks/$WEBHOOK_ID \\\n    -H "Authorization: Bearer $DODO_PAYMENTS_API_KEY"',
      },
      java: {
        method: 'webhooks().retrieve',
        example:
          'package com.dodopayments.api.example;\n\nimport com.dodopayments.api.client.DodoPaymentsClient;\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient;\nimport com.dodopayments.api.models.webhooks.WebhookDetails;\nimport com.dodopayments.api.models.webhooks.WebhookRetrieveParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        DodoPaymentsClient client = DodoPaymentsOkHttpClient.fromEnv();\n\n        WebhookDetails webhookDetails = client.webhooks().retrieve("webhook_id");\n    }\n}',
      },
      kotlin: {
        method: 'webhooks().retrieve',
        example:
          'package com.dodopayments.api.example\n\nimport com.dodopayments.api.client.DodoPaymentsClient\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient\nimport com.dodopayments.api.models.webhooks.WebhookDetails\nimport com.dodopayments.api.models.webhooks.WebhookRetrieveParams\n\nfun main() {\n    val client: DodoPaymentsClient = DodoPaymentsOkHttpClient.fromEnv()\n\n    val webhookDetails: WebhookDetails = client.webhooks().retrieve("webhook_id")\n}',
      },
      php: {
        method: 'webhooks->retrieve',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(bearerToken: 'My Bearer Token', environment: 'test_mode');\n\n$webhookDetails = $client->webhooks->retrieve('webhook_id');\n\nvar_dump($webhookDetails);",
      },
      python: {
        method: 'webhooks.retrieve',
        example:
          'import os\nfrom dodopayments import DodoPayments\n\nclient = DodoPayments(\n    bearer_token=os.environ.get("DODO_PAYMENTS_API_KEY"),  # This is the default and can be omitted\n)\nwebhook_details = client.webhooks.retrieve(\n    "webhook_id",\n)\nprint(webhook_details.id)',
      },
      ruby: {
        method: 'webhooks.retrieve',
        example:
          'require "dodopayments"\n\ndodo_payments = Dodopayments::Client.new(\n  bearer_token: "My Bearer Token",\n  environment: "test_mode" # defaults to "live_mode"\n)\n\nwebhook_details = dodo_payments.webhooks.retrieve("webhook_id")\n\nputs(webhook_details)',
      },
      typescript: {
        method: 'client.webhooks.retrieve',
        example:
          "import DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments({\n  bearerToken: process.env['DODO_PAYMENTS_API_KEY'], // This is the default and can be omitted\n});\n\nconst webhookDetails = await client.webhooks.retrieve('webhook_id');\n\nconsole.log(webhookDetails.id);",
      },
    },
  },
  {
    name: 'delete',
    endpoint: '/webhooks/{webhook_id}',
    httpMethod: 'delete',
    summary: 'Delete a webhook by id',
    description: 'Delete a webhook by id',
    stainlessPath: '(resource) webhooks > (method) delete',
    qualified: 'client.webhooks.delete',
    params: ['webhook_id: string;'],
    markdown:
      "## delete\n\n`client.webhooks.delete(webhook_id: string): void`\n\n**delete** `/webhooks/{webhook_id}`\n\nDelete a webhook by id\n\n### Parameters\n\n- `webhook_id: string`\n\n### Example\n\n```typescript\nimport DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments();\n\nawait client.webhooks.delete('webhook_id')\n```",
    perLanguage: {
      cli: {
        method: 'webhooks delete',
        example:
          "dodo-payments-cli webhooks delete \\\n  --bearer-token 'My Bearer Token' \\\n  --webhook-id webhook_id",
      },
      csharp: {
        method: 'Webhooks.Delete',
        example:
          'WebhookDeleteParams parameters = new() { WebhookID = "webhook_id" };\n\nawait client.Webhooks.Delete(parameters);',
      },
      go: {
        method: 'client.Webhooks.Delete',
        example:
          'package main\n\nimport (\n\t"context"\n\n\t"github.com/dodopayments/dodopayments-go"\n\t"github.com/dodopayments/dodopayments-go/option"\n)\n\nfunc main() {\n\tclient := dodopayments.NewClient(\n\t\toption.WithBearerToken("My Bearer Token"),\n\t)\n\terr := client.Webhooks.Delete(context.TODO(), "webhook_id")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
      http: {
        example:
          'curl https://live.dodopayments.com/webhooks/$WEBHOOK_ID \\\n    -X DELETE \\\n    -H "Authorization: Bearer $DODO_PAYMENTS_API_KEY"',
      },
      java: {
        method: 'webhooks().delete',
        example:
          'package com.dodopayments.api.example;\n\nimport com.dodopayments.api.client.DodoPaymentsClient;\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient;\nimport com.dodopayments.api.models.webhooks.WebhookDeleteParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        DodoPaymentsClient client = DodoPaymentsOkHttpClient.fromEnv();\n\n        client.webhooks().delete("webhook_id");\n    }\n}',
      },
      kotlin: {
        method: 'webhooks().delete',
        example:
          'package com.dodopayments.api.example\n\nimport com.dodopayments.api.client.DodoPaymentsClient\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient\nimport com.dodopayments.api.models.webhooks.WebhookDeleteParams\n\nfun main() {\n    val client: DodoPaymentsClient = DodoPaymentsOkHttpClient.fromEnv()\n\n    client.webhooks().delete("webhook_id")\n}',
      },
      php: {
        method: 'webhooks->delete',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(bearerToken: 'My Bearer Token', environment: 'test_mode');\n\n$result = $client->webhooks->delete('webhook_id');\n\nvar_dump($result);",
      },
      python: {
        method: 'webhooks.delete',
        example:
          'import os\nfrom dodopayments import DodoPayments\n\nclient = DodoPayments(\n    bearer_token=os.environ.get("DODO_PAYMENTS_API_KEY"),  # This is the default and can be omitted\n)\nclient.webhooks.delete(\n    "webhook_id",\n)',
      },
      ruby: {
        method: 'webhooks.delete',
        example:
          'require "dodopayments"\n\ndodo_payments = Dodopayments::Client.new(\n  bearer_token: "My Bearer Token",\n  environment: "test_mode" # defaults to "live_mode"\n)\n\nresult = dodo_payments.webhooks.delete("webhook_id")\n\nputs(result)',
      },
      typescript: {
        method: 'client.webhooks.delete',
        example:
          "import DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments({\n  bearerToken: process.env['DODO_PAYMENTS_API_KEY'], // This is the default and can be omitted\n});\n\nawait client.webhooks.delete('webhook_id');",
      },
    },
  },
  {
    name: 'update',
    endpoint: '/webhooks/{webhook_id}',
    httpMethod: 'patch',
    summary: 'Patch a webhook by id',
    description: 'Patch a webhook by id',
    stainlessPath: '(resource) webhooks > (method) update',
    qualified: 'client.webhooks.update',
    params: [
      'webhook_id: string;',
      'description?: string;',
      'disabled?: boolean;',
      'filter_types?: string[];',
      'metadata?: object;',
      'rate_limit?: number;',
      'url?: string;',
    ],
    response:
      '{ id: string; created_at: string; description: string; metadata: object; updated_at: string; url: string; disabled?: boolean; filter_types?: string[]; rate_limit?: number; }',
    markdown:
      "## update\n\n`client.webhooks.update(webhook_id: string, description?: string, disabled?: boolean, filter_types?: string[], metadata?: object, rate_limit?: number, url?: string): { id: string; created_at: string; description: string; metadata: object; updated_at: string; url: string; disabled?: boolean; filter_types?: string[]; rate_limit?: number; }`\n\n**patch** `/webhooks/{webhook_id}`\n\nPatch a webhook by id\n\n### Parameters\n\n- `webhook_id: string`\n\n- `description?: string`\n  Description of the webhook\n\n- `disabled?: boolean`\n  To Disable the endpoint, set it to true.\n\n- `filter_types?: string[]`\n  Filter events to the endpoint.\n\nWebhook event will only be sent for events in the list.\n\n- `metadata?: object`\n  Metadata\n\n- `rate_limit?: number`\n  Rate limit\n\n- `url?: string`\n  Url endpoint\n\n### Returns\n\n- `{ id: string; created_at: string; description: string; metadata: object; updated_at: string; url: string; disabled?: boolean; filter_types?: string[]; rate_limit?: number; }`\n\n  - `id: string`\n  - `created_at: string`\n  - `description: string`\n  - `metadata: object`\n  - `updated_at: string`\n  - `url: string`\n  - `disabled?: boolean`\n  - `filter_types?: string[]`\n  - `rate_limit?: number`\n\n### Example\n\n```typescript\nimport DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments();\n\nconst webhookDetails = await client.webhooks.update('webhook_id');\n\nconsole.log(webhookDetails);\n```",
    perLanguage: {
      cli: {
        method: 'webhooks update',
        example:
          "dodo-payments-cli webhooks update \\\n  --bearer-token 'My Bearer Token' \\\n  --webhook-id webhook_id",
      },
      csharp: {
        method: 'Webhooks.Update',
        example:
          'WebhookUpdateParams parameters = new() { WebhookID = "webhook_id" };\n\nvar webhookDetails = await client.Webhooks.Update(parameters);\n\nConsole.WriteLine(webhookDetails);',
      },
      go: {
        method: 'client.Webhooks.Update',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/dodopayments/dodopayments-go"\n\t"github.com/dodopayments/dodopayments-go/option"\n)\n\nfunc main() {\n\tclient := dodopayments.NewClient(\n\t\toption.WithBearerToken("My Bearer Token"),\n\t)\n\twebhookDetails, err := client.Webhooks.Update(\n\t\tcontext.TODO(),\n\t\t"webhook_id",\n\t\tdodopayments.WebhookUpdateParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", webhookDetails.ID)\n}\n',
      },
      http: {
        example:
          "curl https://live.dodopayments.com/webhooks/$WEBHOOK_ID \\\n    -X PATCH \\\n    -H 'Content-Type: application/json' \\\n    -H \"Authorization: Bearer $DODO_PAYMENTS_API_KEY\" \\\n    -d '{}'",
      },
      java: {
        method: 'webhooks().update',
        example:
          'package com.dodopayments.api.example;\n\nimport com.dodopayments.api.client.DodoPaymentsClient;\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient;\nimport com.dodopayments.api.models.webhooks.WebhookDetails;\nimport com.dodopayments.api.models.webhooks.WebhookUpdateParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        DodoPaymentsClient client = DodoPaymentsOkHttpClient.fromEnv();\n\n        WebhookDetails webhookDetails = client.webhooks().update("webhook_id");\n    }\n}',
      },
      kotlin: {
        method: 'webhooks().update',
        example:
          'package com.dodopayments.api.example\n\nimport com.dodopayments.api.client.DodoPaymentsClient\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient\nimport com.dodopayments.api.models.webhooks.WebhookDetails\nimport com.dodopayments.api.models.webhooks.WebhookUpdateParams\n\nfun main() {\n    val client: DodoPaymentsClient = DodoPaymentsOkHttpClient.fromEnv()\n\n    val webhookDetails: WebhookDetails = client.webhooks().update("webhook_id")\n}',
      },
      php: {
        method: 'webhooks->update',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(bearerToken: 'My Bearer Token', environment: 'test_mode');\n\n$webhookDetails = $client->webhooks->update(\n  'webhook_id',\n  description: 'description',\n  disabled: true,\n  filterTypes: [WebhookEventType::PAYMENT_SUCCEEDED],\n  metadata: ['foo' => 'string'],\n  rateLimit: 0,\n  url: 'url',\n);\n\nvar_dump($webhookDetails);",
      },
      python: {
        method: 'webhooks.update',
        example:
          'import os\nfrom dodopayments import DodoPayments\n\nclient = DodoPayments(\n    bearer_token=os.environ.get("DODO_PAYMENTS_API_KEY"),  # This is the default and can be omitted\n)\nwebhook_details = client.webhooks.update(\n    webhook_id="webhook_id",\n)\nprint(webhook_details.id)',
      },
      ruby: {
        method: 'webhooks.update',
        example:
          'require "dodopayments"\n\ndodo_payments = Dodopayments::Client.new(\n  bearer_token: "My Bearer Token",\n  environment: "test_mode" # defaults to "live_mode"\n)\n\nwebhook_details = dodo_payments.webhooks.update("webhook_id")\n\nputs(webhook_details)',
      },
      typescript: {
        method: 'client.webhooks.update',
        example:
          "import DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments({\n  bearerToken: process.env['DODO_PAYMENTS_API_KEY'], // This is the default and can be omitted\n});\n\nconst webhookDetails = await client.webhooks.update('webhook_id');\n\nconsole.log(webhookDetails.id);",
      },
    },
  },
  {
    name: 'retrieve_secret',
    endpoint: '/webhooks/{webhook_id}/secret',
    httpMethod: 'get',
    summary: 'Get webhook secret by id',
    description: 'Get webhook secret by id',
    stainlessPath: '(resource) webhooks > (method) retrieve_secret',
    qualified: 'client.webhooks.retrieveSecret',
    params: ['webhook_id: string;'],
    response: '{ secret: string; }',
    markdown:
      "## retrieve_secret\n\n`client.webhooks.retrieveSecret(webhook_id: string): { secret: string; }`\n\n**get** `/webhooks/{webhook_id}/secret`\n\nGet webhook secret by id\n\n### Parameters\n\n- `webhook_id: string`\n\n### Returns\n\n- `{ secret: string; }`\n\n  - `secret: string`\n\n### Example\n\n```typescript\nimport DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments();\n\nconst response = await client.webhooks.retrieveSecret('webhook_id');\n\nconsole.log(response);\n```",
    perLanguage: {
      cli: {
        method: 'webhooks retrieve_secret',
        example:
          "dodo-payments-cli webhooks retrieve-secret \\\n  --bearer-token 'My Bearer Token' \\\n  --webhook-id webhook_id",
      },
      csharp: {
        method: 'Webhooks.RetrieveSecret',
        example:
          'WebhookRetrieveSecretParams parameters = new() { WebhookID = "webhook_id" };\n\nvar response = await client.Webhooks.RetrieveSecret(parameters);\n\nConsole.WriteLine(response);',
      },
      go: {
        method: 'client.Webhooks.GetSecret',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/dodopayments/dodopayments-go"\n\t"github.com/dodopayments/dodopayments-go/option"\n)\n\nfunc main() {\n\tclient := dodopayments.NewClient(\n\t\toption.WithBearerToken("My Bearer Token"),\n\t)\n\tresponse, err := client.Webhooks.GetSecret(context.TODO(), "webhook_id")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.Secret)\n}\n',
      },
      http: {
        example:
          'curl https://live.dodopayments.com/webhooks/$WEBHOOK_ID/secret \\\n    -H "Authorization: Bearer $DODO_PAYMENTS_API_KEY"',
      },
      java: {
        method: 'webhooks().retrieveSecret',
        example:
          'package com.dodopayments.api.example;\n\nimport com.dodopayments.api.client.DodoPaymentsClient;\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient;\nimport com.dodopayments.api.models.webhooks.WebhookRetrieveSecretParams;\nimport com.dodopayments.api.models.webhooks.WebhookRetrieveSecretResponse;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        DodoPaymentsClient client = DodoPaymentsOkHttpClient.fromEnv();\n\n        WebhookRetrieveSecretResponse response = client.webhooks().retrieveSecret("webhook_id");\n    }\n}',
      },
      kotlin: {
        method: 'webhooks().retrieveSecret',
        example:
          'package com.dodopayments.api.example\n\nimport com.dodopayments.api.client.DodoPaymentsClient\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient\nimport com.dodopayments.api.models.webhooks.WebhookRetrieveSecretParams\nimport com.dodopayments.api.models.webhooks.WebhookRetrieveSecretResponse\n\nfun main() {\n    val client: DodoPaymentsClient = DodoPaymentsOkHttpClient.fromEnv()\n\n    val response: WebhookRetrieveSecretResponse = client.webhooks().retrieveSecret("webhook_id")\n}',
      },
      php: {
        method: 'webhooks->retrieveSecret',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(bearerToken: 'My Bearer Token', environment: 'test_mode');\n\n$response = $client->webhooks->retrieveSecret('webhook_id');\n\nvar_dump($response);",
      },
      python: {
        method: 'webhooks.retrieve_secret',
        example:
          'import os\nfrom dodopayments import DodoPayments\n\nclient = DodoPayments(\n    bearer_token=os.environ.get("DODO_PAYMENTS_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.webhooks.retrieve_secret(\n    "webhook_id",\n)\nprint(response.secret)',
      },
      ruby: {
        method: 'webhooks.retrieve_secret',
        example:
          'require "dodopayments"\n\ndodo_payments = Dodopayments::Client.new(\n  bearer_token: "My Bearer Token",\n  environment: "test_mode" # defaults to "live_mode"\n)\n\nresponse = dodo_payments.webhooks.retrieve_secret("webhook_id")\n\nputs(response)',
      },
      typescript: {
        method: 'client.webhooks.retrieveSecret',
        example:
          "import DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments({\n  bearerToken: process.env['DODO_PAYMENTS_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.webhooks.retrieveSecret('webhook_id');\n\nconsole.log(response.secret);",
      },
    },
  },
  {
    name: 'unwrap',
    endpoint: '',
    httpMethod: '',
    summary: '',
    description: '',
    stainlessPath: '(resource) webhooks > (method) unwrap',
    qualified: 'client.webhooks.unwrap',
    perLanguage: {
      cli: {
        example: "dodo-payments-cli webhooks unwrap \\\n  --bearer-token 'My Bearer Token'",
      },
      csharp: {
        example: 'WebhookUnwrapParams parameters = new();\n\nawait client.Webhooks.Unwrap(parameters);',
      },
      go: {
        method: 'client.Webhooks.Unwrap',
        example:
          'package main\n\nimport (\n\t"context"\n\n\t"github.com/dodopayments/dodopayments-go"\n\t"github.com/dodopayments/dodopayments-go/option"\n)\n\nfunc main() {\n\tclient := dodopayments.NewClient(\n\t\toption.WithBearerToken("My Bearer Token"),\n\t)\n\terr := client.Webhooks.Unwrap(context.TODO())\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
      java: {
        example:
          'package com.dodopayments.api.example;\n\nimport com.dodopayments.api.client.DodoPaymentsClient;\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient;\nimport com.dodopayments.api.models.webhooks.WebhookUnwrapParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        DodoPaymentsClient client = DodoPaymentsOkHttpClient.fromEnv();\n\n        client.webhooks().unwrap();\n    }\n}',
      },
      kotlin: {
        example:
          'package com.dodopayments.api.example\n\nimport com.dodopayments.api.client.DodoPaymentsClient\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient\nimport com.dodopayments.api.models.webhooks.WebhookUnwrapParams\n\nfun main() {\n    val client: DodoPaymentsClient = DodoPaymentsOkHttpClient.fromEnv()\n\n    client.webhooks().unwrap()\n}',
      },
      php: {
        method: 'webhooks->unwrap',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(bearerToken: 'My Bearer Token', environment: 'test_mode');\n\n$result = $client->webhooks->unwrap();\n\nvar_dump($result);",
      },
      python: {
        method: 'webhooks.unwrap',
        example:
          'import os\nfrom dodopayments import DodoPayments\n\nclient = DodoPayments(\n    bearer_token=os.environ.get("DODO_PAYMENTS_API_KEY"),  # This is the default and can be omitted\n)\nclient.webhooks.unwrap()',
      },
      ruby: {
        method: 'webhooks.unwrap',
        example:
          'require "dodopayments"\n\ndodo_payments = Dodopayments::Client.new(\n  bearer_token: "My Bearer Token",\n  environment: "test_mode" # defaults to "live_mode"\n)\n\nresult = dodo_payments.webhooks.unwrap\n\nputs(result)',
      },
      typescript: {
        method: 'client.webhooks.unwrap',
        example:
          "import DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments({\n  bearerToken: process.env['DODO_PAYMENTS_API_KEY'], // This is the default and can be omitted\n});\n\nawait client.webhooks.unwrap();",
      },
    },
  },
  {
    name: 'unsafe_unwrap',
    endpoint: '',
    httpMethod: '',
    summary: '',
    description: '',
    stainlessPath: '(resource) webhooks > (method) unsafe_unwrap',
    qualified: 'client.webhooks.unsafeUnwrap',
    perLanguage: {
      cli: {
        example: "dodo-payments-cli webhooks unsafe-unwrap \\\n  --bearer-token 'My Bearer Token'",
      },
      csharp: {
        example:
          'WebhookUnsafeUnwrapParams parameters = new();\n\nawait client.Webhooks.UnsafeUnwrap(parameters);',
      },
      go: {
        method: 'client.Webhooks.UnsafeUnwrap',
        example:
          'package main\n\nimport (\n\t"context"\n\n\t"github.com/dodopayments/dodopayments-go"\n\t"github.com/dodopayments/dodopayments-go/option"\n)\n\nfunc main() {\n\tclient := dodopayments.NewClient(\n\t\toption.WithBearerToken("My Bearer Token"),\n\t)\n\terr := client.Webhooks.UnsafeUnwrap(context.TODO())\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
      java: {
        example:
          'package com.dodopayments.api.example;\n\nimport com.dodopayments.api.client.DodoPaymentsClient;\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient;\nimport com.dodopayments.api.models.webhooks.WebhookUnsafeUnwrapParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        DodoPaymentsClient client = DodoPaymentsOkHttpClient.fromEnv();\n\n        client.webhooks().unsafeUnwrap();\n    }\n}',
      },
      kotlin: {
        example:
          'package com.dodopayments.api.example\n\nimport com.dodopayments.api.client.DodoPaymentsClient\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient\nimport com.dodopayments.api.models.webhooks.WebhookUnsafeUnwrapParams\n\nfun main() {\n    val client: DodoPaymentsClient = DodoPaymentsOkHttpClient.fromEnv()\n\n    client.webhooks().unsafeUnwrap()\n}',
      },
      php: {
        method: 'webhooks->unsafeUnwrap',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(bearerToken: 'My Bearer Token', environment: 'test_mode');\n\n$result = $client->webhooks->unsafeUnwrap();\n\nvar_dump($result);",
      },
      python: {
        method: 'webhooks.unsafe_unwrap',
        example:
          'import os\nfrom dodopayments import DodoPayments\n\nclient = DodoPayments(\n    bearer_token=os.environ.get("DODO_PAYMENTS_API_KEY"),  # This is the default and can be omitted\n)\nclient.webhooks.unsafe_unwrap()',
      },
      ruby: {
        method: 'webhooks.unsafe_unwrap',
        example:
          'require "dodopayments"\n\ndodo_payments = Dodopayments::Client.new(\n  bearer_token: "My Bearer Token",\n  environment: "test_mode" # defaults to "live_mode"\n)\n\nresult = dodo_payments.webhooks.unsafe_unwrap\n\nputs(result)',
      },
      typescript: {
        method: 'client.webhooks.unsafeUnwrap',
        example:
          "import DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments({\n  bearerToken: process.env['DODO_PAYMENTS_API_KEY'], // This is the default and can be omitted\n});\n\nawait client.webhooks.unsafeUnwrap();",
      },
    },
  },
  {
    name: 'retrieve',
    endpoint: '/webhooks/{webhook_id}/headers',
    httpMethod: 'get',
    summary: 'Get a webhook by id',
    description: 'Get a webhook by id',
    stainlessPath: '(resource) webhooks.headers > (method) retrieve',
    qualified: 'client.webhooks.headers.retrieve',
    params: ['webhook_id: string;'],
    response: '{ headers: object; sensitive: string[]; }',
    markdown:
      "## retrieve\n\n`client.webhooks.headers.retrieve(webhook_id: string): { headers: object; sensitive: string[]; }`\n\n**get** `/webhooks/{webhook_id}/headers`\n\nGet a webhook by id\n\n### Parameters\n\n- `webhook_id: string`\n\n### Returns\n\n- `{ headers: object; sensitive: string[]; }`\n  The value of the headers is returned in the `headers` field.\n\nSensitive headers that have been redacted are returned in the sensitive\nfield.\n\n  - `headers: object`\n  - `sensitive: string[]`\n\n### Example\n\n```typescript\nimport DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments();\n\nconst header = await client.webhooks.headers.retrieve('webhook_id');\n\nconsole.log(header);\n```",
    perLanguage: {
      cli: {
        method: 'headers retrieve',
        example:
          "dodo-payments-cli webhooks:headers retrieve \\\n  --bearer-token 'My Bearer Token' \\\n  --webhook-id webhook_id",
      },
      csharp: {
        method: 'Webhooks.Headers.Retrieve',
        example:
          'HeaderRetrieveParams parameters = new() { WebhookID = "webhook_id" };\n\nvar header = await client.Webhooks.Headers.Retrieve(parameters);\n\nConsole.WriteLine(header);',
      },
      go: {
        method: 'client.Webhooks.Headers.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/dodopayments/dodopayments-go"\n\t"github.com/dodopayments/dodopayments-go/option"\n)\n\nfunc main() {\n\tclient := dodopayments.NewClient(\n\t\toption.WithBearerToken("My Bearer Token"),\n\t)\n\theader, err := client.Webhooks.Headers.Get(context.TODO(), "webhook_id")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", header.Headers)\n}\n',
      },
      http: {
        example:
          'curl https://live.dodopayments.com/webhooks/$WEBHOOK_ID/headers \\\n    -H "Authorization: Bearer $DODO_PAYMENTS_API_KEY"',
      },
      java: {
        method: 'webhooks().headers().retrieve',
        example:
          'package com.dodopayments.api.example;\n\nimport com.dodopayments.api.client.DodoPaymentsClient;\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient;\nimport com.dodopayments.api.models.webhooks.headers.HeaderRetrieveParams;\nimport com.dodopayments.api.models.webhooks.headers.HeaderRetrieveResponse;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        DodoPaymentsClient client = DodoPaymentsOkHttpClient.fromEnv();\n\n        HeaderRetrieveResponse header = client.webhooks().headers().retrieve("webhook_id");\n    }\n}',
      },
      kotlin: {
        method: 'webhooks().headers().retrieve',
        example:
          'package com.dodopayments.api.example\n\nimport com.dodopayments.api.client.DodoPaymentsClient\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient\nimport com.dodopayments.api.models.webhooks.headers.HeaderRetrieveParams\nimport com.dodopayments.api.models.webhooks.headers.HeaderRetrieveResponse\n\nfun main() {\n    val client: DodoPaymentsClient = DodoPaymentsOkHttpClient.fromEnv()\n\n    val header: HeaderRetrieveResponse = client.webhooks().headers().retrieve("webhook_id")\n}',
      },
      php: {
        method: 'webhooks->headers->retrieve',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(bearerToken: 'My Bearer Token', environment: 'test_mode');\n\n$header = $client->webhooks->headers->retrieve('webhook_id');\n\nvar_dump($header);",
      },
      python: {
        method: 'webhooks.headers.retrieve',
        example:
          'import os\nfrom dodopayments import DodoPayments\n\nclient = DodoPayments(\n    bearer_token=os.environ.get("DODO_PAYMENTS_API_KEY"),  # This is the default and can be omitted\n)\nheader = client.webhooks.headers.retrieve(\n    "webhook_id",\n)\nprint(header.headers)',
      },
      ruby: {
        method: 'webhooks.headers.retrieve',
        example:
          'require "dodopayments"\n\ndodo_payments = Dodopayments::Client.new(\n  bearer_token: "My Bearer Token",\n  environment: "test_mode" # defaults to "live_mode"\n)\n\nheader = dodo_payments.webhooks.headers.retrieve("webhook_id")\n\nputs(header)',
      },
      typescript: {
        method: 'client.webhooks.headers.retrieve',
        example:
          "import DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments({\n  bearerToken: process.env['DODO_PAYMENTS_API_KEY'], // This is the default and can be omitted\n});\n\nconst header = await client.webhooks.headers.retrieve('webhook_id');\n\nconsole.log(header.headers);",
      },
    },
  },
  {
    name: 'update',
    endpoint: '/webhooks/{webhook_id}/headers',
    httpMethod: 'patch',
    summary: 'Patch a webhook by id',
    description: 'Patch a webhook by id',
    stainlessPath: '(resource) webhooks.headers > (method) update',
    qualified: 'client.webhooks.headers.update',
    params: ['webhook_id: string;', 'headers: object;'],
    markdown:
      "## update\n\n`client.webhooks.headers.update(webhook_id: string, headers: object): void`\n\n**patch** `/webhooks/{webhook_id}/headers`\n\nPatch a webhook by id\n\n### Parameters\n\n- `webhook_id: string`\n\n- `headers: object`\n  Object of header-value pair to update or add\n\n### Example\n\n```typescript\nimport DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments();\n\nawait client.webhooks.headers.update('webhook_id', { headers: { foo: 'string' } })\n```",
    perLanguage: {
      cli: {
        method: 'headers update',
        example:
          "dodo-payments-cli webhooks:headers update \\\n  --bearer-token 'My Bearer Token' \\\n  --webhook-id webhook_id \\\n  --headers '{foo: string}'",
      },
      csharp: {
        method: 'Webhooks.Headers.Update',
        example:
          'HeaderUpdateParams parameters = new()\n{\n    WebhookID = "webhook_id",\n    Headers = new Dictionary<string, string>() { { "foo", "string" } },\n};\n\nawait client.Webhooks.Headers.Update(parameters);',
      },
      go: {
        method: 'client.Webhooks.Headers.Update',
        example:
          'package main\n\nimport (\n\t"context"\n\n\t"github.com/dodopayments/dodopayments-go"\n\t"github.com/dodopayments/dodopayments-go/option"\n)\n\nfunc main() {\n\tclient := dodopayments.NewClient(\n\t\toption.WithBearerToken("My Bearer Token"),\n\t)\n\terr := client.Webhooks.Headers.Update(\n\t\tcontext.TODO(),\n\t\t"webhook_id",\n\t\tdodopayments.WebhookHeaderUpdateParams{\n\t\t\tHeaders: dodopayments.F(map[string]string{\n\t\t\t\t"foo": "string",\n\t\t\t}),\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
      http: {
        example:
          'curl https://live.dodopayments.com/webhooks/$WEBHOOK_ID/headers \\\n    -X PATCH \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $DODO_PAYMENTS_API_KEY" \\\n    -d \'{\n          "headers": {\n            "foo": "string"\n          }\n        }\'',
      },
      java: {
        method: 'webhooks().headers().update',
        example:
          'package com.dodopayments.api.example;\n\nimport com.dodopayments.api.client.DodoPaymentsClient;\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient;\nimport com.dodopayments.api.core.JsonValue;\nimport com.dodopayments.api.models.webhooks.headers.HeaderUpdateParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        DodoPaymentsClient client = DodoPaymentsOkHttpClient.fromEnv();\n\n        HeaderUpdateParams params = HeaderUpdateParams.builder()\n            .webhookId("webhook_id")\n            .headers(HeaderUpdateParams.Headers.builder()\n                .putAdditionalProperty("foo", JsonValue.from("string"))\n                .build())\n            .build();\n        client.webhooks().headers().update(params);\n    }\n}',
      },
      kotlin: {
        method: 'webhooks().headers().update',
        example:
          'package com.dodopayments.api.example\n\nimport com.dodopayments.api.client.DodoPaymentsClient\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient\nimport com.dodopayments.api.core.JsonValue\nimport com.dodopayments.api.models.webhooks.headers.HeaderUpdateParams\n\nfun main() {\n    val client: DodoPaymentsClient = DodoPaymentsOkHttpClient.fromEnv()\n\n    val params: HeaderUpdateParams = HeaderUpdateParams.builder()\n        .webhookId("webhook_id")\n        .headers(HeaderUpdateParams.Headers.builder()\n            .putAdditionalProperty("foo", JsonValue.from("string"))\n            .build())\n        .build()\n    client.webhooks().headers().update(params)\n}',
      },
      php: {
        method: 'webhooks->headers->update',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(bearerToken: 'My Bearer Token', environment: 'test_mode');\n\n$result = $client->webhooks->headers->update(\n  'webhook_id', headers: ['foo' => 'string']\n);\n\nvar_dump($result);",
      },
      python: {
        method: 'webhooks.headers.update',
        example:
          'import os\nfrom dodopayments import DodoPayments\n\nclient = DodoPayments(\n    bearer_token=os.environ.get("DODO_PAYMENTS_API_KEY"),  # This is the default and can be omitted\n)\nclient.webhooks.headers.update(\n    webhook_id="webhook_id",\n    headers={\n        "foo": "string"\n    },\n)',
      },
      ruby: {
        method: 'webhooks.headers.update',
        example:
          'require "dodopayments"\n\ndodo_payments = Dodopayments::Client.new(\n  bearer_token: "My Bearer Token",\n  environment: "test_mode" # defaults to "live_mode"\n)\n\nresult = dodo_payments.webhooks.headers.update("webhook_id", headers: {foo: "string"})\n\nputs(result)',
      },
      typescript: {
        method: 'client.webhooks.headers.update',
        example:
          "import DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments({\n  bearerToken: process.env['DODO_PAYMENTS_API_KEY'], // This is the default and can be omitted\n});\n\nawait client.webhooks.headers.update('webhook_id', { headers: { foo: 'string' } });",
      },
    },
  },
  {
    name: 'ingest',
    endpoint: '/events/ingest',
    httpMethod: 'post',
    summary: 'Ingest events for usage-based billing and analytics',
    description:
      'This endpoint allows you to ingest custom events that can be used for:\n- Usage-based billing and metering\n- Analytics and reporting\n- Customer behavior tracking\n\n## Important Notes:\n- **Duplicate Prevention**:\n  - Duplicate `event_id` values within the same request are rejected (entire request fails)\n  - Subsequent requests with existing `event_id` values are ignored (idempotent behavior)\n- **Rate Limiting**: Maximum 1000 events per request\n- **Time Validation**: Events with timestamps older than 1 hour or more than 5 minutes in the future will be rejected\n- **Metadata Limits**: Maximum 50 key-value pairs per event, keys max 100 chars, values max 500 chars\n\n## Example Usage:\n```json\n{\n  "events": [\n    {\n      "event_id": "api_call_12345",\n      "customer_id": "cus_abc123",\n      "event_name": "api_request",\n      "timestamp": "2024-01-15T10:30:00Z",\n      "metadata": {\n        "endpoint": "/api/v1/users",\n        "method": "GET",\n        "tokens_used": "150"\n      }\n    }\n  ]\n}\n```',
    stainlessPath: '(resource) usage_events > (method) ingest',
    qualified: 'client.usageEvents.ingest',
    params: [
      'events: { customer_id: string; event_id: string; event_name: string; metadata?: object; timestamp?: string; }[];',
    ],
    response: '{ ingested_count: number; }',
    markdown:
      '## ingest\n\n`client.usageEvents.ingest(events: { customer_id: string; event_id: string; event_name: string; metadata?: object; timestamp?: string; }[]): { ingested_count: number; }`\n\n**post** `/events/ingest`\n\nThis endpoint allows you to ingest custom events that can be used for:\n- Usage-based billing and metering\n- Analytics and reporting\n- Customer behavior tracking\n\n## Important Notes:\n- **Duplicate Prevention**:\n  - Duplicate `event_id` values within the same request are rejected (entire request fails)\n  - Subsequent requests with existing `event_id` values are ignored (idempotent behavior)\n- **Rate Limiting**: Maximum 1000 events per request\n- **Time Validation**: Events with timestamps older than 1 hour or more than 5 minutes in the future will be rejected\n- **Metadata Limits**: Maximum 50 key-value pairs per event, keys max 100 chars, values max 500 chars\n\n## Example Usage:\n```json\n{\n  "events": [\n    {\n      "event_id": "api_call_12345",\n      "customer_id": "cus_abc123",\n      "event_name": "api_request",\n      "timestamp": "2024-01-15T10:30:00Z",\n      "metadata": {\n        "endpoint": "/api/v1/users",\n        "method": "GET",\n        "tokens_used": "150"\n      }\n    }\n  ]\n}\n```\n\n### Parameters\n\n- `events: { customer_id: string; event_id: string; event_name: string; metadata?: object; timestamp?: string; }[]`\n  List of events to be pushed\n\n### Returns\n\n- `{ ingested_count: number; }`\n\n  - `ingested_count: number`\n\n### Example\n\n```typescript\nimport DodoPayments from \'dodopayments\';\n\nconst client = new DodoPayments();\n\nconst response = await client.usageEvents.ingest({ events: [{\n  customer_id: \'customer_id\',\n  event_id: \'event_id\',\n  event_name: \'event_name\',\n}] });\n\nconsole.log(response);\n```',
    perLanguage: {
      cli: {
        method: 'usage_events ingest',
        example:
          "dodo-payments-cli usage-events ingest \\\n  --bearer-token 'My Bearer Token' \\\n  --event '{customer_id: customer_id, event_id: event_id, event_name: event_name}'",
      },
      csharp: {
        method: 'UsageEvents.Ingest',
        example:
          'UsageEventIngestParams parameters = new()\n{\n    Events =\n    [\n        new()\n        {\n            CustomerID = "customer_id",\n            EventID = "event_id",\n            EventName = "event_name",\n            Metadata = new Dictionary<string, Metadata>()\n            {\n                { "foo", "string" }\n            },\n            Timestamp = DateTimeOffset.Parse("2019-12-27T18:11:19.117Z"),\n        },\n    ],\n};\n\nvar response = await client.UsageEvents.Ingest(parameters);\n\nConsole.WriteLine(response);',
      },
      go: {
        method: 'client.UsageEvents.Ingest',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/dodopayments/dodopayments-go"\n\t"github.com/dodopayments/dodopayments-go/option"\n)\n\nfunc main() {\n\tclient := dodopayments.NewClient(\n\t\toption.WithBearerToken("My Bearer Token"),\n\t)\n\tresponse, err := client.UsageEvents.Ingest(context.TODO(), dodopayments.UsageEventIngestParams{\n\t\tEvents: dodopayments.F([]dodopayments.EventInputParam{{\n\t\t\tCustomerID: dodopayments.F("customer_id"),\n\t\t\tEventID:    dodopayments.F("event_id"),\n\t\t\tEventName:  dodopayments.F("event_name"),\n\t\t}}),\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.IngestedCount)\n}\n',
      },
      http: {
        example:
          'curl https://live.dodopayments.com/events/ingest \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $DODO_PAYMENTS_API_KEY" \\\n    -d \'{\n          "events": [\n            {\n              "customer_id": "customer_id",\n              "event_id": "event_id",\n              "event_name": "event_name"\n            }\n          ]\n        }\'',
      },
      java: {
        method: 'usageEvents().ingest',
        example:
          'package com.dodopayments.api.example;\n\nimport com.dodopayments.api.client.DodoPaymentsClient;\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient;\nimport com.dodopayments.api.models.usageevents.EventInput;\nimport com.dodopayments.api.models.usageevents.UsageEventIngestParams;\nimport com.dodopayments.api.models.usageevents.UsageEventIngestResponse;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        DodoPaymentsClient client = DodoPaymentsOkHttpClient.fromEnv();\n\n        UsageEventIngestParams params = UsageEventIngestParams.builder()\n            .addEvent(EventInput.builder()\n                .customerId("customer_id")\n                .eventId("event_id")\n                .eventName("event_name")\n                .build())\n            .build();\n        UsageEventIngestResponse response = client.usageEvents().ingest(params);\n    }\n}',
      },
      kotlin: {
        method: 'usageEvents().ingest',
        example:
          'package com.dodopayments.api.example\n\nimport com.dodopayments.api.client.DodoPaymentsClient\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient\nimport com.dodopayments.api.models.usageevents.EventInput\nimport com.dodopayments.api.models.usageevents.UsageEventIngestParams\nimport com.dodopayments.api.models.usageevents.UsageEventIngestResponse\n\nfun main() {\n    val client: DodoPaymentsClient = DodoPaymentsOkHttpClient.fromEnv()\n\n    val params: UsageEventIngestParams = UsageEventIngestParams.builder()\n        .addEvent(EventInput.builder()\n            .customerId("customer_id")\n            .eventId("event_id")\n            .eventName("event_name")\n            .build())\n        .build()\n    val response: UsageEventIngestResponse = client.usageEvents().ingest(params)\n}',
      },
      php: {
        method: 'usageEvents->ingest',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(bearerToken: 'My Bearer Token', environment: 'test_mode');\n\n$response = $client->usageEvents->ingest(\n  events: [\n    [\n      'customerID' => 'customer_id',\n      'eventID' => 'event_id',\n      'eventName' => 'event_name',\n      'metadata' => ['foo' => 'string'],\n      'timestamp' => new \\DateTimeImmutable('2019-12-27T18:11:19.117Z'),\n    ],\n  ],\n);\n\nvar_dump($response);",
      },
      python: {
        method: 'usage_events.ingest',
        example:
          'import os\nfrom dodopayments import DodoPayments\n\nclient = DodoPayments(\n    bearer_token=os.environ.get("DODO_PAYMENTS_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.usage_events.ingest(\n    events=[{\n        "customer_id": "customer_id",\n        "event_id": "event_id",\n        "event_name": "event_name",\n    }],\n)\nprint(response.ingested_count)',
      },
      ruby: {
        method: 'usage_events.ingest',
        example:
          'require "dodopayments"\n\ndodo_payments = Dodopayments::Client.new(\n  bearer_token: "My Bearer Token",\n  environment: "test_mode" # defaults to "live_mode"\n)\n\nresponse = dodo_payments.usage_events.ingest(\n  events: [{customer_id: "customer_id", event_id: "event_id", event_name: "event_name"}]\n)\n\nputs(response)',
      },
      typescript: {
        method: 'client.usageEvents.ingest',
        example:
          "import DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments({\n  bearerToken: process.env['DODO_PAYMENTS_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.usageEvents.ingest({\n  events: [\n    {\n      customer_id: 'customer_id',\n      event_id: 'event_id',\n      event_name: 'event_name',\n    },\n  ],\n});\n\nconsole.log(response.ingested_count);",
      },
    },
  },
  {
    name: 'list',
    endpoint: '/events',
    httpMethod: 'get',
    summary: 'Retrieve events with advanced filtering and pagination',
    description:
      "Fetch events from your account with powerful filtering capabilities. This endpoint is ideal for:\n- Debugging event ingestion issues\n- Analyzing customer usage patterns\n- Building custom analytics dashboards\n- Auditing billing-related events\n\n## Filtering Options:\n- **Customer filtering**: Filter by specific customer ID\n- **Event name filtering**: Filter by event type/name\n- **Meter-based filtering**: Use a meter ID to apply the meter's event name and filter criteria automatically\n- **Time range filtering**: Filter events within a specific date range\n- **Pagination**: Navigate through large result sets\n\n## Meter Integration:\nWhen using `meter_id`, the endpoint automatically applies:\n- The meter's configured `event_name` filter\n- The meter's custom filter criteria (if any)\n- If you also provide `event_name`, it must match the meter's event name\n\n## Example Queries:\n- Get all events for a customer: `?customer_id=cus_abc123`\n- Get API request events: `?event_name=api_request`\n- Get events from last 24 hours: `?start=2024-01-14T10:30:00Z&end=2024-01-15T10:30:00Z`\n- Get events with meter filtering: `?meter_id=mtr_xyz789`\n- Paginate results: `?page_size=50&page_number=2`",
    stainlessPath: '(resource) usage_events > (method) list',
    qualified: 'client.usageEvents.list',
    params: [
      'customer_id?: string;',
      'end?: string;',
      'event_name?: string;',
      'meter_id?: string;',
      'page_number?: number;',
      'page_size?: number;',
      'start?: string;',
    ],
    response:
      '{ business_id: string; customer_id: string; event_id: string; event_name: string; timestamp: string; metadata?: object; }',
    markdown:
      "## list\n\n`client.usageEvents.list(customer_id?: string, end?: string, event_name?: string, meter_id?: string, page_number?: number, page_size?: number, start?: string): { business_id: string; customer_id: string; event_id: string; event_name: string; timestamp: string; metadata?: object; }`\n\n**get** `/events`\n\nFetch events from your account with powerful filtering capabilities. This endpoint is ideal for:\n- Debugging event ingestion issues\n- Analyzing customer usage patterns\n- Building custom analytics dashboards\n- Auditing billing-related events\n\n## Filtering Options:\n- **Customer filtering**: Filter by specific customer ID\n- **Event name filtering**: Filter by event type/name\n- **Meter-based filtering**: Use a meter ID to apply the meter's event name and filter criteria automatically\n- **Time range filtering**: Filter events within a specific date range\n- **Pagination**: Navigate through large result sets\n\n## Meter Integration:\nWhen using `meter_id`, the endpoint automatically applies:\n- The meter's configured `event_name` filter\n- The meter's custom filter criteria (if any)\n- If you also provide `event_name`, it must match the meter's event name\n\n## Example Queries:\n- Get all events for a customer: `?customer_id=cus_abc123`\n- Get API request events: `?event_name=api_request`\n- Get events from last 24 hours: `?start=2024-01-14T10:30:00Z&end=2024-01-15T10:30:00Z`\n- Get events with meter filtering: `?meter_id=mtr_xyz789`\n- Paginate results: `?page_size=50&page_number=2`\n\n### Parameters\n\n- `customer_id?: string`\n  Filter events by customer ID\n\n- `end?: string`\n  Filter events created before this timestamp\n\n- `event_name?: string`\n  Filter events by event name. If both event_name and meter_id are provided, they must match the meter's configured event_name\n\n- `meter_id?: string`\n  Filter events by meter ID. When provided, only events that match the meter's event_name and filter criteria will be returned\n\n- `page_number?: number`\n  Page number (0-based, default: 0)\n\n- `page_size?: number`\n  Number of events to return per page (default: 10)\n\n- `start?: string`\n  Filter events created after this timestamp\n\n### Returns\n\n- `{ business_id: string; customer_id: string; event_id: string; event_name: string; timestamp: string; metadata?: object; }`\n\n  - `business_id: string`\n  - `customer_id: string`\n  - `event_id: string`\n  - `event_name: string`\n  - `timestamp: string`\n  - `metadata?: object`\n\n### Example\n\n```typescript\nimport DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments();\n\n// Automatically fetches more pages as needed.\nfor await (const event of client.usageEvents.list()) {\n  console.log(event);\n}\n```",
    perLanguage: {
      cli: {
        method: 'usage_events list',
        example: "dodo-payments-cli usage-events list \\\n  --bearer-token 'My Bearer Token'",
      },
      csharp: {
        method: 'UsageEvents.List',
        example:
          'UsageEventListParams parameters = new();\n\nvar page = await client.UsageEvents.List(parameters);\nawait foreach (var item in page.Paginate())\n{\n    Console.WriteLine(item);\n}',
      },
      go: {
        method: 'client.UsageEvents.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/dodopayments/dodopayments-go"\n\t"github.com/dodopayments/dodopayments-go/option"\n)\n\nfunc main() {\n\tclient := dodopayments.NewClient(\n\t\toption.WithBearerToken("My Bearer Token"),\n\t)\n\tpage, err := client.UsageEvents.List(context.TODO(), dodopayments.UsageEventListParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", page)\n}\n',
      },
      http: {
        example:
          'curl https://live.dodopayments.com/events \\\n    -H "Authorization: Bearer $DODO_PAYMENTS_API_KEY"',
      },
      java: {
        method: 'usageEvents().list',
        example:
          'package com.dodopayments.api.example;\n\nimport com.dodopayments.api.client.DodoPaymentsClient;\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient;\nimport com.dodopayments.api.models.usageevents.UsageEventListPage;\nimport com.dodopayments.api.models.usageevents.UsageEventListParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        DodoPaymentsClient client = DodoPaymentsOkHttpClient.fromEnv();\n\n        UsageEventListPage page = client.usageEvents().list();\n    }\n}',
      },
      kotlin: {
        method: 'usageEvents().list',
        example:
          'package com.dodopayments.api.example\n\nimport com.dodopayments.api.client.DodoPaymentsClient\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient\nimport com.dodopayments.api.models.usageevents.UsageEventListPage\nimport com.dodopayments.api.models.usageevents.UsageEventListParams\n\nfun main() {\n    val client: DodoPaymentsClient = DodoPaymentsOkHttpClient.fromEnv()\n\n    val page: UsageEventListPage = client.usageEvents().list()\n}',
      },
      php: {
        method: 'usageEvents->list',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(bearerToken: 'My Bearer Token', environment: 'test_mode');\n\n$page = $client->usageEvents->list(\n  customerID: 'customer_id',\n  end: new \\DateTimeImmutable('2019-12-27T18:11:19.117Z'),\n  eventName: 'event_name',\n  meterID: 'meter_id',\n  pageNumber: 0,\n  pageSize: 0,\n  start: new \\DateTimeImmutable('2019-12-27T18:11:19.117Z'),\n);\n\nvar_dump($page);",
      },
      python: {
        method: 'usage_events.list',
        example:
          'import os\nfrom dodopayments import DodoPayments\n\nclient = DodoPayments(\n    bearer_token=os.environ.get("DODO_PAYMENTS_API_KEY"),  # This is the default and can be omitted\n)\npage = client.usage_events.list()\npage = page.items[0]\nprint(page.business_id)',
      },
      ruby: {
        method: 'usage_events.list',
        example:
          'require "dodopayments"\n\ndodo_payments = Dodopayments::Client.new(\n  bearer_token: "My Bearer Token",\n  environment: "test_mode" # defaults to "live_mode"\n)\n\npage = dodo_payments.usage_events.list\n\nputs(page)',
      },
      typescript: {
        method: 'client.usageEvents.list',
        example:
          "import DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments({\n  bearerToken: process.env['DODO_PAYMENTS_API_KEY'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const event of client.usageEvents.list()) {\n  console.log(event.business_id);\n}",
      },
    },
  },
  {
    name: 'retrieve',
    endpoint: '/events/{event_id}',
    httpMethod: 'get',
    summary: 'Retrieve a specific event by its unique ID',
    description:
      'Fetch detailed information about a single event using its unique event ID. This endpoint is useful for:\n- Debugging specific event ingestion issues\n- Retrieving event details for customer support\n- Validating that events were processed correctly\n- Getting the complete metadata for an event\n\n## Event ID Format:\nThe event ID should be the same value that was provided during event ingestion via the `/events/ingest` endpoint.\nEvent IDs are case-sensitive and must match exactly.\n\n## Response Details:\nThe response includes all event data including:\n- Complete metadata key-value pairs\n- Original timestamp (preserved from ingestion)\n- Customer and business association\n- Event name and processing information\n\n## Example Usage:\n```text\nGET /events/api_call_12345\n```',
    stainlessPath: '(resource) usage_events > (method) retrieve',
    qualified: 'client.usageEvents.retrieve',
    params: ['event_id: string;'],
    response:
      '{ business_id: string; customer_id: string; event_id: string; event_name: string; timestamp: string; metadata?: object; }',
    markdown:
      "## retrieve\n\n`client.usageEvents.retrieve(event_id: string): { business_id: string; customer_id: string; event_id: string; event_name: string; timestamp: string; metadata?: object; }`\n\n**get** `/events/{event_id}`\n\nFetch detailed information about a single event using its unique event ID. This endpoint is useful for:\n- Debugging specific event ingestion issues\n- Retrieving event details for customer support\n- Validating that events were processed correctly\n- Getting the complete metadata for an event\n\n## Event ID Format:\nThe event ID should be the same value that was provided during event ingestion via the `/events/ingest` endpoint.\nEvent IDs are case-sensitive and must match exactly.\n\n## Response Details:\nThe response includes all event data including:\n- Complete metadata key-value pairs\n- Original timestamp (preserved from ingestion)\n- Customer and business association\n- Event name and processing information\n\n## Example Usage:\n```text\nGET /events/api_call_12345\n```\n\n### Parameters\n\n- `event_id: string`\n\n### Returns\n\n- `{ business_id: string; customer_id: string; event_id: string; event_name: string; timestamp: string; metadata?: object; }`\n\n  - `business_id: string`\n  - `customer_id: string`\n  - `event_id: string`\n  - `event_name: string`\n  - `timestamp: string`\n  - `metadata?: object`\n\n### Example\n\n```typescript\nimport DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments();\n\nconst event = await client.usageEvents.retrieve('event_id');\n\nconsole.log(event);\n```",
    perLanguage: {
      cli: {
        method: 'usage_events retrieve',
        example:
          "dodo-payments-cli usage-events retrieve \\\n  --bearer-token 'My Bearer Token' \\\n  --event-id event_id",
      },
      csharp: {
        method: 'UsageEvents.Retrieve',
        example:
          'UsageEventRetrieveParams parameters = new() { EventID = "event_id" };\n\nvar event_ = await client.UsageEvents.Retrieve(parameters);\n\nConsole.WriteLine(event_);',
      },
      go: {
        method: 'client.UsageEvents.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/dodopayments/dodopayments-go"\n\t"github.com/dodopayments/dodopayments-go/option"\n)\n\nfunc main() {\n\tclient := dodopayments.NewClient(\n\t\toption.WithBearerToken("My Bearer Token"),\n\t)\n\tevent, err := client.UsageEvents.Get(context.TODO(), "event_id")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", event.BusinessID)\n}\n',
      },
      http: {
        example:
          'curl https://live.dodopayments.com/events/$EVENT_ID \\\n    -H "Authorization: Bearer $DODO_PAYMENTS_API_KEY"',
      },
      java: {
        method: 'usageEvents().retrieve',
        example:
          'package com.dodopayments.api.example;\n\nimport com.dodopayments.api.client.DodoPaymentsClient;\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient;\nimport com.dodopayments.api.models.usageevents.Event;\nimport com.dodopayments.api.models.usageevents.UsageEventRetrieveParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        DodoPaymentsClient client = DodoPaymentsOkHttpClient.fromEnv();\n\n        Event event = client.usageEvents().retrieve("event_id");\n    }\n}',
      },
      kotlin: {
        method: 'usageEvents().retrieve',
        example:
          'package com.dodopayments.api.example\n\nimport com.dodopayments.api.client.DodoPaymentsClient\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient\nimport com.dodopayments.api.models.usageevents.Event\nimport com.dodopayments.api.models.usageevents.UsageEventRetrieveParams\n\nfun main() {\n    val client: DodoPaymentsClient = DodoPaymentsOkHttpClient.fromEnv()\n\n    val event: Event = client.usageEvents().retrieve("event_id")\n}',
      },
      php: {
        method: 'usageEvents->retrieve',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(bearerToken: 'My Bearer Token', environment: 'test_mode');\n\n$event = $client->usageEvents->retrieve('event_id');\n\nvar_dump($event);",
      },
      python: {
        method: 'usage_events.retrieve',
        example:
          'import os\nfrom dodopayments import DodoPayments\n\nclient = DodoPayments(\n    bearer_token=os.environ.get("DODO_PAYMENTS_API_KEY"),  # This is the default and can be omitted\n)\nevent = client.usage_events.retrieve(\n    "event_id",\n)\nprint(event.business_id)',
      },
      ruby: {
        method: 'usage_events.retrieve',
        example:
          'require "dodopayments"\n\ndodo_payments = Dodopayments::Client.new(\n  bearer_token: "My Bearer Token",\n  environment: "test_mode" # defaults to "live_mode"\n)\n\nevent = dodo_payments.usage_events.retrieve("event_id")\n\nputs(event)',
      },
      typescript: {
        method: 'client.usageEvents.retrieve',
        example:
          "import DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments({\n  bearerToken: process.env['DODO_PAYMENTS_API_KEY'], // This is the default and can be omitted\n});\n\nconst event = await client.usageEvents.retrieve('event_id');\n\nconsole.log(event.business_id);",
      },
    },
  },
  {
    name: 'list',
    endpoint: '/meters',
    httpMethod: 'get',
    summary: '',
    description: '',
    stainlessPath: '(resource) meters > (method) list',
    qualified: 'client.meters.list',
    params: ['archived?: boolean;', 'page_number?: number;', 'page_size?: number;'],
    response:
      "{ id: string; aggregation: { type: 'count' | 'sum' | 'max' | 'last'; key?: string; }; business_id: string; created_at: string; event_name: string; measurement_unit: string; name: string; updated_at: string; description?: string; filter?: { clauses: object[] | object[]; conjunction: conjunction; }; }",
    markdown:
      "## list\n\n`client.meters.list(archived?: boolean, page_number?: number, page_size?: number): { id: string; aggregation: meter_aggregation; business_id: string; created_at: string; event_name: string; measurement_unit: string; name: string; updated_at: string; description?: string; filter?: meter_filter; }`\n\n**get** `/meters`\n\n### Parameters\n\n- `archived?: boolean`\n  List archived meters\n\n- `page_number?: number`\n  Page number default is 0\n\n- `page_size?: number`\n  Page size default is 10 max is 100\n\n### Returns\n\n- `{ id: string; aggregation: { type: 'count' | 'sum' | 'max' | 'last'; key?: string; }; business_id: string; created_at: string; event_name: string; measurement_unit: string; name: string; updated_at: string; description?: string; filter?: { clauses: object[] | object[]; conjunction: conjunction; }; }`\n\n  - `id: string`\n  - `aggregation: { type: 'count' | 'sum' | 'max' | 'last'; key?: string; }`\n  - `business_id: string`\n  - `created_at: string`\n  - `event_name: string`\n  - `measurement_unit: string`\n  - `name: string`\n  - `updated_at: string`\n  - `description?: string`\n  - `filter?: { clauses: { key: string; operator: string; value: string | number | boolean; }[] | { clauses: { key: string; operator: filter_operator; value: string | number | boolean; }[] | { clauses: object[] | object[]; conjunction: conjunction; }[]; conjunction: 'and' | 'or'; }[]; conjunction: 'and' | 'or'; }`\n\n### Example\n\n```typescript\nimport DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments();\n\n// Automatically fetches more pages as needed.\nfor await (const meter of client.meters.list()) {\n  console.log(meter);\n}\n```",
    perLanguage: {
      cli: {
        method: 'meters list',
        example: "dodo-payments-cli meters list \\\n  --bearer-token 'My Bearer Token'",
      },
      csharp: {
        method: 'Meters.List',
        example:
          'MeterListParams parameters = new();\n\nvar page = await client.Meters.List(parameters);\nawait foreach (var item in page.Paginate())\n{\n    Console.WriteLine(item);\n}',
      },
      go: {
        method: 'client.Meters.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/dodopayments/dodopayments-go"\n\t"github.com/dodopayments/dodopayments-go/option"\n)\n\nfunc main() {\n\tclient := dodopayments.NewClient(\n\t\toption.WithBearerToken("My Bearer Token"),\n\t)\n\tpage, err := client.Meters.List(context.TODO(), dodopayments.MeterListParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", page)\n}\n',
      },
      http: {
        example:
          'curl https://live.dodopayments.com/meters \\\n    -H "Authorization: Bearer $DODO_PAYMENTS_API_KEY"',
      },
      java: {
        method: 'meters().list',
        example:
          'package com.dodopayments.api.example;\n\nimport com.dodopayments.api.client.DodoPaymentsClient;\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient;\nimport com.dodopayments.api.models.meters.MeterListPage;\nimport com.dodopayments.api.models.meters.MeterListParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        DodoPaymentsClient client = DodoPaymentsOkHttpClient.fromEnv();\n\n        MeterListPage page = client.meters().list();\n    }\n}',
      },
      kotlin: {
        method: 'meters().list',
        example:
          'package com.dodopayments.api.example\n\nimport com.dodopayments.api.client.DodoPaymentsClient\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient\nimport com.dodopayments.api.models.meters.MeterListPage\nimport com.dodopayments.api.models.meters.MeterListParams\n\nfun main() {\n    val client: DodoPaymentsClient = DodoPaymentsOkHttpClient.fromEnv()\n\n    val page: MeterListPage = client.meters().list()\n}',
      },
      php: {
        method: 'meters->list',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(bearerToken: 'My Bearer Token', environment: 'test_mode');\n\n$page = $client->meters->list(archived: true, pageNumber: 0, pageSize: 0);\n\nvar_dump($page);",
      },
      python: {
        method: 'meters.list',
        example:
          'import os\nfrom dodopayments import DodoPayments\n\nclient = DodoPayments(\n    bearer_token=os.environ.get("DODO_PAYMENTS_API_KEY"),  # This is the default and can be omitted\n)\npage = client.meters.list()\npage = page.items[0]\nprint(page.id)',
      },
      ruby: {
        method: 'meters.list',
        example:
          'require "dodopayments"\n\ndodo_payments = Dodopayments::Client.new(\n  bearer_token: "My Bearer Token",\n  environment: "test_mode" # defaults to "live_mode"\n)\n\npage = dodo_payments.meters.list\n\nputs(page)',
      },
      typescript: {
        method: 'client.meters.list',
        example:
          "import DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments({\n  bearerToken: process.env['DODO_PAYMENTS_API_KEY'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const meter of client.meters.list()) {\n  console.log(meter.id);\n}",
      },
    },
  },
  {
    name: 'create',
    endpoint: '/meters',
    httpMethod: 'post',
    summary: '',
    description: '',
    stainlessPath: '(resource) meters > (method) create',
    qualified: 'client.meters.create',
    params: [
      "aggregation: { type: 'count' | 'sum' | 'max' | 'last'; key?: string; };",
      'event_name: string;',
      'measurement_unit: string;',
      'name: string;',
      'description?: string;',
      "filter?: { clauses: { key: string; operator: string; value: string | number | boolean; }[] | { clauses: { key: string; operator: filter_operator; value: string | number | boolean; }[] | { clauses: object[] | object[]; conjunction: conjunction; }[]; conjunction: 'and' | 'or'; }[]; conjunction: 'and' | 'or'; };",
    ],
    response:
      "{ id: string; aggregation: { type: 'count' | 'sum' | 'max' | 'last'; key?: string; }; business_id: string; created_at: string; event_name: string; measurement_unit: string; name: string; updated_at: string; description?: string; filter?: { clauses: object[] | object[]; conjunction: conjunction; }; }",
    markdown:
      "## create\n\n`client.meters.create(aggregation: { type: 'count' | 'sum' | 'max' | 'last'; key?: string; }, event_name: string, measurement_unit: string, name: string, description?: string, filter?: { clauses: object[] | object[]; conjunction: conjunction; }): { id: string; aggregation: meter_aggregation; business_id: string; created_at: string; event_name: string; measurement_unit: string; name: string; updated_at: string; description?: string; filter?: meter_filter; }`\n\n**post** `/meters`\n\n### Parameters\n\n- `aggregation: { type: 'count' | 'sum' | 'max' | 'last'; key?: string; }`\n  Aggregation configuration for the meter\n  - `type: 'count' | 'sum' | 'max' | 'last'`\n    Aggregation type for the meter\n  - `key?: string`\n    Required when type is not COUNT\n\n- `event_name: string`\n  Event name to track\n\n- `measurement_unit: string`\n  measurement unit\n\n- `name: string`\n  Name of the meter\n\n- `description?: string`\n  Optional description of the meter\n\n- `filter?: { clauses: { key: string; operator: string; value: string | number | boolean; }[] | { clauses: { key: string; operator: filter_operator; value: string | number | boolean; }[] | { clauses: object[] | object[]; conjunction: conjunction; }[]; conjunction: 'and' | 'or'; }[]; conjunction: 'and' | 'or'; }`\n  Optional filter to apply to the meter\n  - `clauses: { key: string; operator: string; value: string | number | boolean; }[] | { clauses: { key: string; operator: string; value: string | number | boolean; }[] | { clauses: { key: string; operator: string; value: string | number | boolean; }[] | { clauses: { key: string; operator: filter_operator; value: string | number | boolean; }[]; conjunction: 'and' | 'or'; }[]; conjunction: 'and' | 'or'; }[]; conjunction: 'and' | 'or'; }[]`\n    Filter clauses - can be direct conditions or nested filters (up to 3 levels deep)\n  - `conjunction: 'and' | 'or'`\n    Logical conjunction to apply between clauses (and/or)\n\n### Returns\n\n- `{ id: string; aggregation: { type: 'count' | 'sum' | 'max' | 'last'; key?: string; }; business_id: string; created_at: string; event_name: string; measurement_unit: string; name: string; updated_at: string; description?: string; filter?: { clauses: object[] | object[]; conjunction: conjunction; }; }`\n\n  - `id: string`\n  - `aggregation: { type: 'count' | 'sum' | 'max' | 'last'; key?: string; }`\n  - `business_id: string`\n  - `created_at: string`\n  - `event_name: string`\n  - `measurement_unit: string`\n  - `name: string`\n  - `updated_at: string`\n  - `description?: string`\n  - `filter?: { clauses: { key: string; operator: string; value: string | number | boolean; }[] | { clauses: { key: string; operator: filter_operator; value: string | number | boolean; }[] | { clauses: object[] | object[]; conjunction: conjunction; }[]; conjunction: 'and' | 'or'; }[]; conjunction: 'and' | 'or'; }`\n\n### Example\n\n```typescript\nimport DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments();\n\nconst meter = await client.meters.create({\n  aggregation: { type: 'count' },\n  event_name: 'event_name',\n  measurement_unit: 'measurement_unit',\n  name: 'name',\n});\n\nconsole.log(meter);\n```",
    perLanguage: {
      cli: {
        method: 'meters create',
        example:
          "dodo-payments-cli meters create \\\n  --bearer-token 'My Bearer Token' \\\n  --aggregation '{type: count}' \\\n  --event-name event_name \\\n  --measurement-unit measurement_unit \\\n  --name name",
      },
      csharp: {
        method: 'Meters.Create',
        example:
          'MeterCreateParams parameters = new()\n{\n    Aggregation = new()\n    {\n        Type = Type.Count,\n        Key = "key",\n    },\n    EventName = "event_name",\n    MeasurementUnit = "measurement_unit",\n    Name = "name",\n};\n\nvar meter = await client.Meters.Create(parameters);\n\nConsole.WriteLine(meter);',
      },
      go: {
        method: 'client.Meters.New',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/dodopayments/dodopayments-go"\n\t"github.com/dodopayments/dodopayments-go/option"\n)\n\nfunc main() {\n\tclient := dodopayments.NewClient(\n\t\toption.WithBearerToken("My Bearer Token"),\n\t)\n\tmeter, err := client.Meters.New(context.TODO(), dodopayments.MeterNewParams{\n\t\tAggregation: dodopayments.F(dodopayments.MeterAggregationParam{\n\t\t\tType: dodopayments.F(dodopayments.MeterAggregationTypeCount),\n\t\t}),\n\t\tEventName:       dodopayments.F("event_name"),\n\t\tMeasurementUnit: dodopayments.F("measurement_unit"),\n\t\tName:            dodopayments.F("name"),\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", meter.ID)\n}\n',
      },
      http: {
        example:
          'curl https://live.dodopayments.com/meters \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $DODO_PAYMENTS_API_KEY" \\\n    -d \'{\n          "aggregation": {\n            "type": "count"\n          },\n          "event_name": "event_name",\n          "measurement_unit": "measurement_unit",\n          "name": "name"\n        }\'',
      },
      java: {
        method: 'meters().create',
        example:
          'package com.dodopayments.api.example;\n\nimport com.dodopayments.api.client.DodoPaymentsClient;\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient;\nimport com.dodopayments.api.models.meters.Meter;\nimport com.dodopayments.api.models.meters.MeterAggregation;\nimport com.dodopayments.api.models.meters.MeterCreateParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        DodoPaymentsClient client = DodoPaymentsOkHttpClient.fromEnv();\n\n        MeterCreateParams params = MeterCreateParams.builder()\n            .aggregation(MeterAggregation.builder()\n                .type(MeterAggregation.Type.COUNT)\n                .build())\n            .eventName("event_name")\n            .measurementUnit("measurement_unit")\n            .name("name")\n            .build();\n        Meter meter = client.meters().create(params);\n    }\n}',
      },
      kotlin: {
        method: 'meters().create',
        example:
          'package com.dodopayments.api.example\n\nimport com.dodopayments.api.client.DodoPaymentsClient\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient\nimport com.dodopayments.api.models.meters.Meter\nimport com.dodopayments.api.models.meters.MeterAggregation\nimport com.dodopayments.api.models.meters.MeterCreateParams\n\nfun main() {\n    val client: DodoPaymentsClient = DodoPaymentsOkHttpClient.fromEnv()\n\n    val params: MeterCreateParams = MeterCreateParams.builder()\n        .aggregation(MeterAggregation.builder()\n            .type(MeterAggregation.Type.COUNT)\n            .build())\n        .eventName("event_name")\n        .measurementUnit("measurement_unit")\n        .name("name")\n        .build()\n    val meter: Meter = client.meters().create(params)\n}',
      },
      php: {
        method: 'meters->create',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(bearerToken: 'My Bearer Token', environment: 'test_mode');\n\n$meter = $client->meters->create(\n  aggregation: ['type' => 'count', 'key' => 'key'],\n  eventName: 'event_name',\n  measurementUnit: 'measurement_unit',\n  name: 'name',\n  description: 'description',\n  filter: [\n    'clauses' => [\n      [\n        'key' => 'user_id',\n        'operator' => FilterOperator::EQUALS,\n        'value' => 'user123',\n      ],\n      [\n        'key' => 'amount',\n        'operator' => FilterOperator::GREATER_THAN,\n        'value' => 100,\n      ],\n    ],\n    'conjunction' => Conjunction::AND,\n  ],\n);\n\nvar_dump($meter);",
      },
      python: {
        method: 'meters.create',
        example:
          'import os\nfrom dodopayments import DodoPayments\n\nclient = DodoPayments(\n    bearer_token=os.environ.get("DODO_PAYMENTS_API_KEY"),  # This is the default and can be omitted\n)\nmeter = client.meters.create(\n    aggregation={\n        "type": "count"\n    },\n    event_name="event_name",\n    measurement_unit="measurement_unit",\n    name="name",\n)\nprint(meter.id)',
      },
      ruby: {
        method: 'meters.create',
        example:
          'require "dodopayments"\n\ndodo_payments = Dodopayments::Client.new(\n  bearer_token: "My Bearer Token",\n  environment: "test_mode" # defaults to "live_mode"\n)\n\nmeter = dodo_payments.meters.create(\n  aggregation: {type: :count},\n  event_name: "event_name",\n  measurement_unit: "measurement_unit",\n  name: "name"\n)\n\nputs(meter)',
      },
      typescript: {
        method: 'client.meters.create',
        example:
          "import DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments({\n  bearerToken: process.env['DODO_PAYMENTS_API_KEY'], // This is the default and can be omitted\n});\n\nconst meter = await client.meters.create({\n  aggregation: { type: 'count' },\n  event_name: 'event_name',\n  measurement_unit: 'measurement_unit',\n  name: 'name',\n});\n\nconsole.log(meter.id);",
      },
    },
  },
  {
    name: 'retrieve',
    endpoint: '/meters/{id}',
    httpMethod: 'get',
    summary: '',
    description: '',
    stainlessPath: '(resource) meters > (method) retrieve',
    qualified: 'client.meters.retrieve',
    params: ['id: string;'],
    response:
      "{ id: string; aggregation: { type: 'count' | 'sum' | 'max' | 'last'; key?: string; }; business_id: string; created_at: string; event_name: string; measurement_unit: string; name: string; updated_at: string; description?: string; filter?: { clauses: object[] | object[]; conjunction: conjunction; }; }",
    markdown:
      "## retrieve\n\n`client.meters.retrieve(id: string): { id: string; aggregation: meter_aggregation; business_id: string; created_at: string; event_name: string; measurement_unit: string; name: string; updated_at: string; description?: string; filter?: meter_filter; }`\n\n**get** `/meters/{id}`\n\n### Parameters\n\n- `id: string`\n\n### Returns\n\n- `{ id: string; aggregation: { type: 'count' | 'sum' | 'max' | 'last'; key?: string; }; business_id: string; created_at: string; event_name: string; measurement_unit: string; name: string; updated_at: string; description?: string; filter?: { clauses: object[] | object[]; conjunction: conjunction; }; }`\n\n  - `id: string`\n  - `aggregation: { type: 'count' | 'sum' | 'max' | 'last'; key?: string; }`\n  - `business_id: string`\n  - `created_at: string`\n  - `event_name: string`\n  - `measurement_unit: string`\n  - `name: string`\n  - `updated_at: string`\n  - `description?: string`\n  - `filter?: { clauses: { key: string; operator: string; value: string | number | boolean; }[] | { clauses: { key: string; operator: filter_operator; value: string | number | boolean; }[] | { clauses: object[] | object[]; conjunction: conjunction; }[]; conjunction: 'and' | 'or'; }[]; conjunction: 'and' | 'or'; }`\n\n### Example\n\n```typescript\nimport DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments();\n\nconst meter = await client.meters.retrieve('id');\n\nconsole.log(meter);\n```",
    perLanguage: {
      cli: {
        method: 'meters retrieve',
        example: "dodo-payments-cli meters retrieve \\\n  --bearer-token 'My Bearer Token' \\\n  --id id",
      },
      csharp: {
        method: 'Meters.Retrieve',
        example:
          'MeterRetrieveParams parameters = new() { ID = "id" };\n\nvar meter = await client.Meters.Retrieve(parameters);\n\nConsole.WriteLine(meter);',
      },
      go: {
        method: 'client.Meters.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/dodopayments/dodopayments-go"\n\t"github.com/dodopayments/dodopayments-go/option"\n)\n\nfunc main() {\n\tclient := dodopayments.NewClient(\n\t\toption.WithBearerToken("My Bearer Token"),\n\t)\n\tmeter, err := client.Meters.Get(context.TODO(), "id")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", meter.ID)\n}\n',
      },
      http: {
        example:
          'curl https://live.dodopayments.com/meters/$ID \\\n    -H "Authorization: Bearer $DODO_PAYMENTS_API_KEY"',
      },
      java: {
        method: 'meters().retrieve',
        example:
          'package com.dodopayments.api.example;\n\nimport com.dodopayments.api.client.DodoPaymentsClient;\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient;\nimport com.dodopayments.api.models.meters.Meter;\nimport com.dodopayments.api.models.meters.MeterRetrieveParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        DodoPaymentsClient client = DodoPaymentsOkHttpClient.fromEnv();\n\n        Meter meter = client.meters().retrieve("id");\n    }\n}',
      },
      kotlin: {
        method: 'meters().retrieve',
        example:
          'package com.dodopayments.api.example\n\nimport com.dodopayments.api.client.DodoPaymentsClient\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient\nimport com.dodopayments.api.models.meters.Meter\nimport com.dodopayments.api.models.meters.MeterRetrieveParams\n\nfun main() {\n    val client: DodoPaymentsClient = DodoPaymentsOkHttpClient.fromEnv()\n\n    val meter: Meter = client.meters().retrieve("id")\n}',
      },
      php: {
        method: 'meters->retrieve',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(bearerToken: 'My Bearer Token', environment: 'test_mode');\n\n$meter = $client->meters->retrieve('id');\n\nvar_dump($meter);",
      },
      python: {
        method: 'meters.retrieve',
        example:
          'import os\nfrom dodopayments import DodoPayments\n\nclient = DodoPayments(\n    bearer_token=os.environ.get("DODO_PAYMENTS_API_KEY"),  # This is the default and can be omitted\n)\nmeter = client.meters.retrieve(\n    "id",\n)\nprint(meter.id)',
      },
      ruby: {
        method: 'meters.retrieve',
        example:
          'require "dodopayments"\n\ndodo_payments = Dodopayments::Client.new(\n  bearer_token: "My Bearer Token",\n  environment: "test_mode" # defaults to "live_mode"\n)\n\nmeter = dodo_payments.meters.retrieve("id")\n\nputs(meter)',
      },
      typescript: {
        method: 'client.meters.retrieve',
        example:
          "import DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments({\n  bearerToken: process.env['DODO_PAYMENTS_API_KEY'], // This is the default and can be omitted\n});\n\nconst meter = await client.meters.retrieve('id');\n\nconsole.log(meter.id);",
      },
    },
  },
  {
    name: 'archive',
    endpoint: '/meters/{id}',
    httpMethod: 'delete',
    summary: '',
    description: '',
    stainlessPath: '(resource) meters > (method) archive',
    qualified: 'client.meters.archive',
    params: ['id: string;'],
    markdown:
      "## archive\n\n`client.meters.archive(id: string): void`\n\n**delete** `/meters/{id}`\n\n### Parameters\n\n- `id: string`\n\n### Example\n\n```typescript\nimport DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments();\n\nawait client.meters.archive('id')\n```",
    perLanguage: {
      cli: {
        method: 'meters archive',
        example: "dodo-payments-cli meters archive \\\n  --bearer-token 'My Bearer Token' \\\n  --id id",
      },
      csharp: {
        method: 'Meters.Archive',
        example:
          'MeterArchiveParams parameters = new() { ID = "id" };\n\nawait client.Meters.Archive(parameters);',
      },
      go: {
        method: 'client.Meters.Archive',
        example:
          'package main\n\nimport (\n\t"context"\n\n\t"github.com/dodopayments/dodopayments-go"\n\t"github.com/dodopayments/dodopayments-go/option"\n)\n\nfunc main() {\n\tclient := dodopayments.NewClient(\n\t\toption.WithBearerToken("My Bearer Token"),\n\t)\n\terr := client.Meters.Archive(context.TODO(), "id")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
      http: {
        example:
          'curl https://live.dodopayments.com/meters/$ID \\\n    -X DELETE \\\n    -H "Authorization: Bearer $DODO_PAYMENTS_API_KEY"',
      },
      java: {
        method: 'meters().archive',
        example:
          'package com.dodopayments.api.example;\n\nimport com.dodopayments.api.client.DodoPaymentsClient;\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient;\nimport com.dodopayments.api.models.meters.MeterArchiveParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        DodoPaymentsClient client = DodoPaymentsOkHttpClient.fromEnv();\n\n        client.meters().archive("id");\n    }\n}',
      },
      kotlin: {
        method: 'meters().archive',
        example:
          'package com.dodopayments.api.example\n\nimport com.dodopayments.api.client.DodoPaymentsClient\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient\nimport com.dodopayments.api.models.meters.MeterArchiveParams\n\nfun main() {\n    val client: DodoPaymentsClient = DodoPaymentsOkHttpClient.fromEnv()\n\n    client.meters().archive("id")\n}',
      },
      php: {
        method: 'meters->archive',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(bearerToken: 'My Bearer Token', environment: 'test_mode');\n\n$result = $client->meters->archive('id');\n\nvar_dump($result);",
      },
      python: {
        method: 'meters.archive',
        example:
          'import os\nfrom dodopayments import DodoPayments\n\nclient = DodoPayments(\n    bearer_token=os.environ.get("DODO_PAYMENTS_API_KEY"),  # This is the default and can be omitted\n)\nclient.meters.archive(\n    "id",\n)',
      },
      ruby: {
        method: 'meters.archive',
        example:
          'require "dodopayments"\n\ndodo_payments = Dodopayments::Client.new(\n  bearer_token: "My Bearer Token",\n  environment: "test_mode" # defaults to "live_mode"\n)\n\nresult = dodo_payments.meters.archive("id")\n\nputs(result)',
      },
      typescript: {
        method: 'client.meters.archive',
        example:
          "import DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments({\n  bearerToken: process.env['DODO_PAYMENTS_API_KEY'], // This is the default and can be omitted\n});\n\nawait client.meters.archive('id');",
      },
    },
  },
  {
    name: 'unarchive',
    endpoint: '/meters/{id}/unarchive',
    httpMethod: 'post',
    summary: '',
    description: '',
    stainlessPath: '(resource) meters > (method) unarchive',
    qualified: 'client.meters.unarchive',
    params: ['id: string;'],
    markdown:
      "## unarchive\n\n`client.meters.unarchive(id: string): void`\n\n**post** `/meters/{id}/unarchive`\n\n### Parameters\n\n- `id: string`\n\n### Example\n\n```typescript\nimport DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments();\n\nawait client.meters.unarchive('id')\n```",
    perLanguage: {
      cli: {
        method: 'meters unarchive',
        example: "dodo-payments-cli meters unarchive \\\n  --bearer-token 'My Bearer Token' \\\n  --id id",
      },
      csharp: {
        method: 'Meters.Unarchive',
        example:
          'MeterUnarchiveParams parameters = new() { ID = "id" };\n\nawait client.Meters.Unarchive(parameters);',
      },
      go: {
        method: 'client.Meters.Unarchive',
        example:
          'package main\n\nimport (\n\t"context"\n\n\t"github.com/dodopayments/dodopayments-go"\n\t"github.com/dodopayments/dodopayments-go/option"\n)\n\nfunc main() {\n\tclient := dodopayments.NewClient(\n\t\toption.WithBearerToken("My Bearer Token"),\n\t)\n\terr := client.Meters.Unarchive(context.TODO(), "id")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
      http: {
        example:
          'curl https://live.dodopayments.com/meters/$ID/unarchive \\\n    -X POST \\\n    -H "Authorization: Bearer $DODO_PAYMENTS_API_KEY"',
      },
      java: {
        method: 'meters().unarchive',
        example:
          'package com.dodopayments.api.example;\n\nimport com.dodopayments.api.client.DodoPaymentsClient;\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient;\nimport com.dodopayments.api.models.meters.MeterUnarchiveParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        DodoPaymentsClient client = DodoPaymentsOkHttpClient.fromEnv();\n\n        client.meters().unarchive("id");\n    }\n}',
      },
      kotlin: {
        method: 'meters().unarchive',
        example:
          'package com.dodopayments.api.example\n\nimport com.dodopayments.api.client.DodoPaymentsClient\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient\nimport com.dodopayments.api.models.meters.MeterUnarchiveParams\n\nfun main() {\n    val client: DodoPaymentsClient = DodoPaymentsOkHttpClient.fromEnv()\n\n    client.meters().unarchive("id")\n}',
      },
      php: {
        method: 'meters->unarchive',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(bearerToken: 'My Bearer Token', environment: 'test_mode');\n\n$result = $client->meters->unarchive('id');\n\nvar_dump($result);",
      },
      python: {
        method: 'meters.unarchive',
        example:
          'import os\nfrom dodopayments import DodoPayments\n\nclient = DodoPayments(\n    bearer_token=os.environ.get("DODO_PAYMENTS_API_KEY"),  # This is the default and can be omitted\n)\nclient.meters.unarchive(\n    "id",\n)',
      },
      ruby: {
        method: 'meters.unarchive',
        example:
          'require "dodopayments"\n\ndodo_payments = Dodopayments::Client.new(\n  bearer_token: "My Bearer Token",\n  environment: "test_mode" # defaults to "live_mode"\n)\n\nresult = dodo_payments.meters.unarchive("id")\n\nputs(result)',
      },
      typescript: {
        method: 'client.meters.unarchive',
        example:
          "import DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments({\n  bearerToken: process.env['DODO_PAYMENTS_API_KEY'], // This is the default and can be omitted\n});\n\nawait client.meters.unarchive('id');",
      },
    },
  },
  {
    name: 'retrieve_ledger',
    endpoint: '/balances/ledger',
    httpMethod: 'get',
    summary: '',
    description: '',
    stainlessPath: '(resource) balances > (method) retrieve_ledger',
    qualified: 'client.balances.retrieveLedger',
    params: [
      'created_at_gte?: string;',
      'created_at_lte?: string;',
      'currency?: string;',
      'event_type?: string;',
      'limit?: number;',
      'page_number?: number;',
      'page_size?: number;',
      'reference_object_id?: string;',
    ],
    response:
      '{ id: string; amount: number; business_id: string; created_at: string; currency: string; event_type: string; is_credit: boolean; usd_equivalent_amount: number; after_balance?: number; before_balance?: number; description?: string; reference_object_id?: string; }',
    markdown:
      "## retrieve_ledger\n\n`client.balances.retrieveLedger(created_at_gte?: string, created_at_lte?: string, currency?: string, event_type?: string, limit?: number, page_number?: number, page_size?: number, reference_object_id?: string): { id: string; amount: number; business_id: string; created_at: string; currency: currency; event_type: string; is_credit: boolean; usd_equivalent_amount: number; after_balance?: number; before_balance?: number; description?: string; reference_object_id?: string; }`\n\n**get** `/balances/ledger`\n\n### Parameters\n\n- `created_at_gte?: string`\n  Get events after this created time\n\n- `created_at_lte?: string`\n  Get events created before this time\n\n- `currency?: string`\n  Filter by currency\n\n- `event_type?: string`\n  Filter by Ledger Event Type\n\n- `limit?: number`\n  Min : 1, Max : 100, default 10\n\n- `page_number?: number`\n  Page number default is 0\n\n- `page_size?: number`\n  Page size default is 10 max is 100\n\n- `reference_object_id?: string`\n  Get events history of a specific object like payment/subscription/refund/dispute\n\n### Returns\n\n- `{ id: string; amount: number; business_id: string; created_at: string; currency: string; event_type: string; is_credit: boolean; usd_equivalent_amount: number; after_balance?: number; before_balance?: number; description?: string; reference_object_id?: string; }`\n\n  - `id: string`\n  - `amount: number`\n  - `business_id: string`\n  - `created_at: string`\n  - `currency: string`\n  - `event_type: string`\n  - `is_credit: boolean`\n  - `usd_equivalent_amount: number`\n  - `after_balance?: number`\n  - `before_balance?: number`\n  - `description?: string`\n  - `reference_object_id?: string`\n\n### Example\n\n```typescript\nimport DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments();\n\n// Automatically fetches more pages as needed.\nfor await (const balanceLedgerEntry of client.balances.retrieveLedger()) {\n  console.log(balanceLedgerEntry);\n}\n```",
    perLanguage: {
      cli: {
        method: 'balances retrieve_ledger',
        example: "dodo-payments-cli balances retrieve-ledger \\\n  --bearer-token 'My Bearer Token'",
      },
      csharp: {
        method: 'Balances.RetrieveLedger',
        example:
          'BalanceRetrieveLedgerParams parameters = new();\n\nvar page = await client.Balances.RetrieveLedger(parameters);\nawait foreach (var item in page.Paginate())\n{\n    Console.WriteLine(item);\n}',
      },
      go: {
        method: 'client.Balances.GetLedger',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/dodopayments/dodopayments-go"\n\t"github.com/dodopayments/dodopayments-go/option"\n)\n\nfunc main() {\n\tclient := dodopayments.NewClient(\n\t\toption.WithBearerToken("My Bearer Token"),\n\t)\n\tpage, err := client.Balances.GetLedger(context.TODO(), dodopayments.BalanceGetLedgerParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", page)\n}\n',
      },
      http: {
        example:
          'curl https://live.dodopayments.com/balances/ledger \\\n    -H "Authorization: Bearer $DODO_PAYMENTS_API_KEY"',
      },
      java: {
        method: 'balances().retrieveLedger',
        example:
          'package com.dodopayments.api.example;\n\nimport com.dodopayments.api.client.DodoPaymentsClient;\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient;\nimport com.dodopayments.api.models.balances.BalanceRetrieveLedgerPage;\nimport com.dodopayments.api.models.balances.BalanceRetrieveLedgerParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        DodoPaymentsClient client = DodoPaymentsOkHttpClient.fromEnv();\n\n        BalanceRetrieveLedgerPage page = client.balances().retrieveLedger();\n    }\n}',
      },
      kotlin: {
        method: 'balances().retrieveLedger',
        example:
          'package com.dodopayments.api.example\n\nimport com.dodopayments.api.client.DodoPaymentsClient\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient\nimport com.dodopayments.api.models.balances.BalanceRetrieveLedgerPage\nimport com.dodopayments.api.models.balances.BalanceRetrieveLedgerParams\n\nfun main() {\n    val client: DodoPaymentsClient = DodoPaymentsOkHttpClient.fromEnv()\n\n    val page: BalanceRetrieveLedgerPage = client.balances().retrieveLedger()\n}',
      },
      php: {
        method: 'balances->retrieveLedger',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(bearerToken: 'My Bearer Token', environment: 'test_mode');\n\n$page = $client->balances->retrieveLedger(\n  createdAtGte: new \\DateTimeImmutable('2019-12-27T18:11:19.117Z'),\n  createdAtLte: new \\DateTimeImmutable('2019-12-27T18:11:19.117Z'),\n  currency: 'AED',\n  eventType: 'payment',\n  limit: 0,\n  pageNumber: 0,\n  pageSize: 0,\n  referenceObjectID: 'reference_object_id',\n);\n\nvar_dump($page);",
      },
      python: {
        method: 'balances.retrieve_ledger',
        example:
          'import os\nfrom dodopayments import DodoPayments\n\nclient = DodoPayments(\n    bearer_token=os.environ.get("DODO_PAYMENTS_API_KEY"),  # This is the default and can be omitted\n)\npage = client.balances.retrieve_ledger()\npage = page.items[0]\nprint(page.id)',
      },
      ruby: {
        method: 'balances.retrieve_ledger',
        example:
          'require "dodopayments"\n\ndodo_payments = Dodopayments::Client.new(\n  bearer_token: "My Bearer Token",\n  environment: "test_mode" # defaults to "live_mode"\n)\n\npage = dodo_payments.balances.retrieve_ledger\n\nputs(page)',
      },
      typescript: {
        method: 'client.balances.retrieveLedger',
        example:
          "import DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments({\n  bearerToken: process.env['DODO_PAYMENTS_API_KEY'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const balanceLedgerEntry of client.balances.retrieveLedger()) {\n  console.log(balanceLedgerEntry.id);\n}",
      },
    },
  },
  {
    name: 'list',
    endpoint: '/credit-entitlements',
    httpMethod: 'get',
    summary: 'Lists all credit entitlements for the authenticated business with pagination support.',
    description:
      'Returns a paginated list of credit entitlements, allowing filtering of deleted\nentitlements. By default, only non-deleted entitlements are returned.\n\n# Authentication\nRequires an API key with `Viewer` role or higher.\n\n# Query Parameters\n- `page_size` - Number of items per page (default: 10, max: 100)\n- `page_number` - Zero-based page number (default: 0)\n- `deleted` - Boolean flag to list deleted entitlements instead of active ones (default: false)\n\n# Responses\n- `200 OK` - Returns a list of credit entitlements wrapped in a response object\n- `422 Unprocessable Entity` - Invalid query parameters (e.g., page_size > 100)\n- `500 Internal Server Error` - Database or server error\n\n# Business Logic\n- Results are ordered by creation date in descending order (newest first)\n- Only entitlements belonging to the authenticated business are returned\n- The `deleted` parameter controls visibility of soft-deleted entitlements\n- Pagination uses offset-based pagination (offset = page_number * page_size)',
    stainlessPath: '(resource) credit_entitlements > (method) list',
    qualified: 'client.creditEntitlements.list',
    params: ['deleted?: boolean;', 'page_number?: number;', 'page_size?: number;'],
    response:
      "{ id: string; business_id: string; created_at: string; name: string; overage_behavior: 'forgive_at_reset' | 'invoice_at_billing' | 'carry_deficit' | 'carry_deficit_auto_repay'; overage_enabled: boolean; precision: number; rollover_enabled: boolean; unit: string; updated_at: string; currency?: string; description?: string; expires_after_days?: number; max_rollover_count?: number; overage_limit?: number; price_per_unit?: string; rollover_percentage?: number; rollover_timeframe_count?: number; rollover_timeframe_interval?: 'Day' | 'Week' | 'Month' | 'Year'; }",
    markdown:
      "## list\n\n`client.creditEntitlements.list(deleted?: boolean, page_number?: number, page_size?: number): { id: string; business_id: string; created_at: string; name: string; overage_behavior: cbb_overage_behavior; overage_enabled: boolean; precision: number; rollover_enabled: boolean; unit: string; updated_at: string; currency?: currency; description?: string; expires_after_days?: number; max_rollover_count?: number; overage_limit?: number; price_per_unit?: string; rollover_percentage?: number; rollover_timeframe_count?: number; rollover_timeframe_interval?: time_interval; }`\n\n**get** `/credit-entitlements`\n\nReturns a paginated list of credit entitlements, allowing filtering of deleted\nentitlements. By default, only non-deleted entitlements are returned.\n\n# Authentication\nRequires an API key with `Viewer` role or higher.\n\n# Query Parameters\n- `page_size` - Number of items per page (default: 10, max: 100)\n- `page_number` - Zero-based page number (default: 0)\n- `deleted` - Boolean flag to list deleted entitlements instead of active ones (default: false)\n\n# Responses\n- `200 OK` - Returns a list of credit entitlements wrapped in a response object\n- `422 Unprocessable Entity` - Invalid query parameters (e.g., page_size > 100)\n- `500 Internal Server Error` - Database or server error\n\n# Business Logic\n- Results are ordered by creation date in descending order (newest first)\n- Only entitlements belonging to the authenticated business are returned\n- The `deleted` parameter controls visibility of soft-deleted entitlements\n- Pagination uses offset-based pagination (offset = page_number * page_size)\n\n### Parameters\n\n- `deleted?: boolean`\n  List deleted credit entitlements\n\n- `page_number?: number`\n  Page number default is 0\n\n- `page_size?: number`\n  Page size default is 10 max is 100\n\n### Returns\n\n- `{ id: string; business_id: string; created_at: string; name: string; overage_behavior: 'forgive_at_reset' | 'invoice_at_billing' | 'carry_deficit' | 'carry_deficit_auto_repay'; overage_enabled: boolean; precision: number; rollover_enabled: boolean; unit: string; updated_at: string; currency?: string; description?: string; expires_after_days?: number; max_rollover_count?: number; overage_limit?: number; price_per_unit?: string; rollover_percentage?: number; rollover_timeframe_count?: number; rollover_timeframe_interval?: 'Day' | 'Week' | 'Month' | 'Year'; }`\n\n  - `id: string`\n  - `business_id: string`\n  - `created_at: string`\n  - `name: string`\n  - `overage_behavior: 'forgive_at_reset' | 'invoice_at_billing' | 'carry_deficit' | 'carry_deficit_auto_repay'`\n  - `overage_enabled: boolean`\n  - `precision: number`\n  - `rollover_enabled: boolean`\n  - `unit: string`\n  - `updated_at: string`\n  - `currency?: string`\n  - `description?: string`\n  - `expires_after_days?: number`\n  - `max_rollover_count?: number`\n  - `overage_limit?: number`\n  - `price_per_unit?: string`\n  - `rollover_percentage?: number`\n  - `rollover_timeframe_count?: number`\n  - `rollover_timeframe_interval?: 'Day' | 'Week' | 'Month' | 'Year'`\n\n### Example\n\n```typescript\nimport DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments();\n\n// Automatically fetches more pages as needed.\nfor await (const creditEntitlement of client.creditEntitlements.list()) {\n  console.log(creditEntitlement);\n}\n```",
    perLanguage: {
      cli: {
        method: 'credit_entitlements list',
        example: "dodo-payments-cli credit-entitlements list \\\n  --bearer-token 'My Bearer Token'",
      },
      csharp: {
        method: 'CreditEntitlements.List',
        example:
          'CreditEntitlementListParams parameters = new();\n\nvar page = await client.CreditEntitlements.List(parameters);\nawait foreach (var item in page.Paginate())\n{\n    Console.WriteLine(item);\n}',
      },
      go: {
        method: 'client.CreditEntitlements.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/dodopayments/dodopayments-go"\n\t"github.com/dodopayments/dodopayments-go/option"\n)\n\nfunc main() {\n\tclient := dodopayments.NewClient(\n\t\toption.WithBearerToken("My Bearer Token"),\n\t)\n\tpage, err := client.CreditEntitlements.List(context.TODO(), dodopayments.CreditEntitlementListParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", page)\n}\n',
      },
      http: {
        example:
          'curl https://live.dodopayments.com/credit-entitlements \\\n    -H "Authorization: Bearer $DODO_PAYMENTS_API_KEY"',
      },
      java: {
        method: 'creditEntitlements().list',
        example:
          'package com.dodopayments.api.example;\n\nimport com.dodopayments.api.client.DodoPaymentsClient;\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient;\nimport com.dodopayments.api.models.creditentitlements.CreditEntitlementListPage;\nimport com.dodopayments.api.models.creditentitlements.CreditEntitlementListParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        DodoPaymentsClient client = DodoPaymentsOkHttpClient.fromEnv();\n\n        CreditEntitlementListPage page = client.creditEntitlements().list();\n    }\n}',
      },
      kotlin: {
        method: 'creditEntitlements().list',
        example:
          'package com.dodopayments.api.example\n\nimport com.dodopayments.api.client.DodoPaymentsClient\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient\nimport com.dodopayments.api.models.creditentitlements.CreditEntitlementListPage\nimport com.dodopayments.api.models.creditentitlements.CreditEntitlementListParams\n\nfun main() {\n    val client: DodoPaymentsClient = DodoPaymentsOkHttpClient.fromEnv()\n\n    val page: CreditEntitlementListPage = client.creditEntitlements().list()\n}',
      },
      php: {
        method: 'creditEntitlements->list',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(bearerToken: 'My Bearer Token', environment: 'test_mode');\n\n$page = $client->creditEntitlements->list(\n  deleted: true, pageNumber: 0, pageSize: 0\n);\n\nvar_dump($page);",
      },
      python: {
        method: 'credit_entitlements.list',
        example:
          'import os\nfrom dodopayments import DodoPayments\n\nclient = DodoPayments(\n    bearer_token=os.environ.get("DODO_PAYMENTS_API_KEY"),  # This is the default and can be omitted\n)\npage = client.credit_entitlements.list()\npage = page.items[0]\nprint(page.id)',
      },
      ruby: {
        method: 'credit_entitlements.list',
        example:
          'require "dodopayments"\n\ndodo_payments = Dodopayments::Client.new(\n  bearer_token: "My Bearer Token",\n  environment: "test_mode" # defaults to "live_mode"\n)\n\npage = dodo_payments.credit_entitlements.list\n\nputs(page)',
      },
      typescript: {
        method: 'client.creditEntitlements.list',
        example:
          "import DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments({\n  bearerToken: process.env['DODO_PAYMENTS_API_KEY'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const creditEntitlement of client.creditEntitlements.list()) {\n  console.log(creditEntitlement.id);\n}",
      },
    },
  },
  {
    name: 'create',
    endpoint: '/credit-entitlements',
    httpMethod: 'post',
    summary: 'Creates a new credit entitlement for the authenticated business.',
    description:
      'Credit entitlements define reusable credit templates that can be attached to products.\nEach entitlement defines how credits behave in terms of expiration, rollover, and overage.\n\n# Authentication\nRequires an API key with `Editor` role.\n\n# Request Body\n- `name` - Human-readable name of the credit entitlement (1-255 characters, required)\n- `description` - Optional description (max 1000 characters)\n- `precision` - Decimal precision for credit amounts (0-10 decimal places)\n- `unit` - Unit of measurement for the credit (e.g., "API Calls", "Tokens", "Credits")\n- `expires_after_days` - Number of days after which credits expire (optional)\n- `rollover_enabled` - Whether unused credits can rollover to the next period\n- `rollover_percentage` - Percentage of unused credits that rollover (0-100)\n- `rollover_timeframe_count` - Count of timeframe periods for rollover limit\n- `rollover_timeframe_interval` - Interval type (day, week, month, year)\n- `max_rollover_count` - Maximum number of times credits can be rolled over\n- `overage_enabled` - Whether overage charges apply when credits run out (requires price_per_unit)\n- `overage_limit` - Maximum overage units allowed (optional)\n- `currency` - Currency for pricing (required if price_per_unit is set)\n- `price_per_unit` - Price per credit unit (decimal)\n\n# Responses\n- `201 Created` - Credit entitlement created successfully, returns the full entitlement object\n- `422 Unprocessable Entity` - Invalid request parameters or validation failure\n- `500 Internal Server Error` - Database or server error\n\n# Business Logic\n- A unique ID with prefix `cde_` is automatically generated for the entitlement\n- Created and updated timestamps are automatically set\n- Currency is required when price_per_unit is set\n- price_per_unit is required when overage_enabled is true\n- rollover_timeframe_count and rollover_timeframe_interval must both be set or both be null',
    stainlessPath: '(resource) credit_entitlements > (method) create',
    qualified: 'client.creditEntitlements.create',
    params: [
      'name: string;',
      'overage_enabled: boolean;',
      'precision: number;',
      'rollover_enabled: boolean;',
      'unit: string;',
      'currency?: string;',
      'description?: string;',
      'expires_after_days?: number;',
      'max_rollover_count?: number;',
      "overage_behavior?: 'forgive_at_reset' | 'invoice_at_billing' | 'carry_deficit' | 'carry_deficit_auto_repay';",
      'overage_limit?: number;',
      'price_per_unit?: string;',
      'rollover_percentage?: number;',
      'rollover_timeframe_count?: number;',
      "rollover_timeframe_interval?: 'Day' | 'Week' | 'Month' | 'Year';",
    ],
    response:
      "{ id: string; business_id: string; created_at: string; name: string; overage_behavior: 'forgive_at_reset' | 'invoice_at_billing' | 'carry_deficit' | 'carry_deficit_auto_repay'; overage_enabled: boolean; precision: number; rollover_enabled: boolean; unit: string; updated_at: string; currency?: string; description?: string; expires_after_days?: number; max_rollover_count?: number; overage_limit?: number; price_per_unit?: string; rollover_percentage?: number; rollover_timeframe_count?: number; rollover_timeframe_interval?: 'Day' | 'Week' | 'Month' | 'Year'; }",
    markdown:
      "## create\n\n`client.creditEntitlements.create(name: string, overage_enabled: boolean, precision: number, rollover_enabled: boolean, unit: string, currency?: string, description?: string, expires_after_days?: number, max_rollover_count?: number, overage_behavior?: 'forgive_at_reset' | 'invoice_at_billing' | 'carry_deficit' | 'carry_deficit_auto_repay', overage_limit?: number, price_per_unit?: string, rollover_percentage?: number, rollover_timeframe_count?: number, rollover_timeframe_interval?: 'Day' | 'Week' | 'Month' | 'Year'): { id: string; business_id: string; created_at: string; name: string; overage_behavior: cbb_overage_behavior; overage_enabled: boolean; precision: number; rollover_enabled: boolean; unit: string; updated_at: string; currency?: currency; description?: string; expires_after_days?: number; max_rollover_count?: number; overage_limit?: number; price_per_unit?: string; rollover_percentage?: number; rollover_timeframe_count?: number; rollover_timeframe_interval?: time_interval; }`\n\n**post** `/credit-entitlements`\n\nCredit entitlements define reusable credit templates that can be attached to products.\nEach entitlement defines how credits behave in terms of expiration, rollover, and overage.\n\n# Authentication\nRequires an API key with `Editor` role.\n\n# Request Body\n- `name` - Human-readable name of the credit entitlement (1-255 characters, required)\n- `description` - Optional description (max 1000 characters)\n- `precision` - Decimal precision for credit amounts (0-10 decimal places)\n- `unit` - Unit of measurement for the credit (e.g., \"API Calls\", \"Tokens\", \"Credits\")\n- `expires_after_days` - Number of days after which credits expire (optional)\n- `rollover_enabled` - Whether unused credits can rollover to the next period\n- `rollover_percentage` - Percentage of unused credits that rollover (0-100)\n- `rollover_timeframe_count` - Count of timeframe periods for rollover limit\n- `rollover_timeframe_interval` - Interval type (day, week, month, year)\n- `max_rollover_count` - Maximum number of times credits can be rolled over\n- `overage_enabled` - Whether overage charges apply when credits run out (requires price_per_unit)\n- `overage_limit` - Maximum overage units allowed (optional)\n- `currency` - Currency for pricing (required if price_per_unit is set)\n- `price_per_unit` - Price per credit unit (decimal)\n\n# Responses\n- `201 Created` - Credit entitlement created successfully, returns the full entitlement object\n- `422 Unprocessable Entity` - Invalid request parameters or validation failure\n- `500 Internal Server Error` - Database or server error\n\n# Business Logic\n- A unique ID with prefix `cde_` is automatically generated for the entitlement\n- Created and updated timestamps are automatically set\n- Currency is required when price_per_unit is set\n- price_per_unit is required when overage_enabled is true\n- rollover_timeframe_count and rollover_timeframe_interval must both be set or both be null\n\n### Parameters\n\n- `name: string`\n  Name of the credit entitlement\n\n- `overage_enabled: boolean`\n  Whether overage charges are enabled when credits run out\n\n- `precision: number`\n  Precision for credit amounts (0-10 decimal places)\n\n- `rollover_enabled: boolean`\n  Whether rollover is enabled for unused credits\n\n- `unit: string`\n  Unit of measurement for the credit (e.g., \"API Calls\", \"Tokens\", \"Credits\")\n\n- `currency?: string`\n  Currency for pricing (required if price_per_unit is set)\n\n- `description?: string`\n  Optional description of the credit entitlement\n\n- `expires_after_days?: number`\n  Number of days after which credits expire (optional)\n\n- `max_rollover_count?: number`\n  Maximum number of times credits can be rolled over\n\n- `overage_behavior?: 'forgive_at_reset' | 'invoice_at_billing' | 'carry_deficit' | 'carry_deficit_auto_repay'`\n  Controls how overage is handled at billing cycle end.\nDefaults to forgive_at_reset if not specified.\n\n- `overage_limit?: number`\n  Maximum overage units allowed (optional)\n\n- `price_per_unit?: string`\n  Price per credit unit\n\n- `rollover_percentage?: number`\n  Percentage of unused credits that can rollover (0-100)\n\n- `rollover_timeframe_count?: number`\n  Count of timeframe periods for rollover limit\n\n- `rollover_timeframe_interval?: 'Day' | 'Week' | 'Month' | 'Year'`\n  Interval type for rollover timeframe\n\n### Returns\n\n- `{ id: string; business_id: string; created_at: string; name: string; overage_behavior: 'forgive_at_reset' | 'invoice_at_billing' | 'carry_deficit' | 'carry_deficit_auto_repay'; overage_enabled: boolean; precision: number; rollover_enabled: boolean; unit: string; updated_at: string; currency?: string; description?: string; expires_after_days?: number; max_rollover_count?: number; overage_limit?: number; price_per_unit?: string; rollover_percentage?: number; rollover_timeframe_count?: number; rollover_timeframe_interval?: 'Day' | 'Week' | 'Month' | 'Year'; }`\n\n  - `id: string`\n  - `business_id: string`\n  - `created_at: string`\n  - `name: string`\n  - `overage_behavior: 'forgive_at_reset' | 'invoice_at_billing' | 'carry_deficit' | 'carry_deficit_auto_repay'`\n  - `overage_enabled: boolean`\n  - `precision: number`\n  - `rollover_enabled: boolean`\n  - `unit: string`\n  - `updated_at: string`\n  - `currency?: string`\n  - `description?: string`\n  - `expires_after_days?: number`\n  - `max_rollover_count?: number`\n  - `overage_limit?: number`\n  - `price_per_unit?: string`\n  - `rollover_percentage?: number`\n  - `rollover_timeframe_count?: number`\n  - `rollover_timeframe_interval?: 'Day' | 'Week' | 'Month' | 'Year'`\n\n### Example\n\n```typescript\nimport DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments();\n\nconst creditEntitlement = await client.creditEntitlements.create({\n  name: 'name',\n  overage_enabled: true,\n  precision: 0,\n  rollover_enabled: true,\n  unit: 'unit',\n});\n\nconsole.log(creditEntitlement);\n```",
    perLanguage: {
      cli: {
        method: 'credit_entitlements create',
        example:
          "dodo-payments-cli credit-entitlements create \\\n  --bearer-token 'My Bearer Token' \\\n  --name name \\\n  --overage-enabled \\\n  --precision 0 \\\n  --rollover-enabled \\\n  --unit unit",
      },
      csharp: {
        method: 'CreditEntitlements.Create',
        example:
          'CreditEntitlementCreateParams parameters = new()\n{\n    Name = "name",\n    OverageEnabled = true,\n    Precision = 0,\n    RolloverEnabled = true,\n    Unit = "unit",\n};\n\nvar creditEntitlement = await client.CreditEntitlements.Create(parameters);\n\nConsole.WriteLine(creditEntitlement);',
      },
      go: {
        method: 'client.CreditEntitlements.New',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/dodopayments/dodopayments-go"\n\t"github.com/dodopayments/dodopayments-go/option"\n)\n\nfunc main() {\n\tclient := dodopayments.NewClient(\n\t\toption.WithBearerToken("My Bearer Token"),\n\t)\n\tcreditEntitlement, err := client.CreditEntitlements.New(context.TODO(), dodopayments.CreditEntitlementNewParams{\n\t\tName:            dodopayments.F("name"),\n\t\tOverageEnabled:  dodopayments.F(true),\n\t\tPrecision:       dodopayments.F(int64(0)),\n\t\tRolloverEnabled: dodopayments.F(true),\n\t\tUnit:            dodopayments.F("unit"),\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", creditEntitlement.ID)\n}\n',
      },
      http: {
        example:
          'curl https://live.dodopayments.com/credit-entitlements \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $DODO_PAYMENTS_API_KEY" \\\n    -d \'{\n          "name": "name",\n          "overage_enabled": true,\n          "precision": 0,\n          "rollover_enabled": true,\n          "unit": "unit"\n        }\'',
      },
      java: {
        method: 'creditEntitlements().create',
        example:
          'package com.dodopayments.api.example;\n\nimport com.dodopayments.api.client.DodoPaymentsClient;\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient;\nimport com.dodopayments.api.models.creditentitlements.CreditEntitlement;\nimport com.dodopayments.api.models.creditentitlements.CreditEntitlementCreateParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        DodoPaymentsClient client = DodoPaymentsOkHttpClient.fromEnv();\n\n        CreditEntitlementCreateParams params = CreditEntitlementCreateParams.builder()\n            .name("name")\n            .overageEnabled(true)\n            .precision(0)\n            .rolloverEnabled(true)\n            .unit("unit")\n            .build();\n        CreditEntitlement creditEntitlement = client.creditEntitlements().create(params);\n    }\n}',
      },
      kotlin: {
        method: 'creditEntitlements().create',
        example:
          'package com.dodopayments.api.example\n\nimport com.dodopayments.api.client.DodoPaymentsClient\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient\nimport com.dodopayments.api.models.creditentitlements.CreditEntitlement\nimport com.dodopayments.api.models.creditentitlements.CreditEntitlementCreateParams\n\nfun main() {\n    val client: DodoPaymentsClient = DodoPaymentsOkHttpClient.fromEnv()\n\n    val params: CreditEntitlementCreateParams = CreditEntitlementCreateParams.builder()\n        .name("name")\n        .overageEnabled(true)\n        .precision(0)\n        .rolloverEnabled(true)\n        .unit("unit")\n        .build()\n    val creditEntitlement: CreditEntitlement = client.creditEntitlements().create(params)\n}',
      },
      php: {
        method: 'creditEntitlements->create',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(bearerToken: 'My Bearer Token', environment: 'test_mode');\n\n$creditEntitlement = $client->creditEntitlements->create(\n  name: 'name',\n  overageEnabled: true,\n  precision: 0,\n  rolloverEnabled: true,\n  unit: 'unit',\n  currency: Currency::AED,\n  description: 'description',\n  expiresAfterDays: 0,\n  maxRolloverCount: 0,\n  overageBehavior: CbbOverageBehavior::FORGIVE_AT_RESET,\n  overageLimit: 0,\n  pricePerUnit: 'price_per_unit',\n  rolloverPercentage: 0,\n  rolloverTimeframeCount: 0,\n  rolloverTimeframeInterval: TimeInterval::DAY,\n);\n\nvar_dump($creditEntitlement);",
      },
      python: {
        method: 'credit_entitlements.create',
        example:
          'import os\nfrom dodopayments import DodoPayments\n\nclient = DodoPayments(\n    bearer_token=os.environ.get("DODO_PAYMENTS_API_KEY"),  # This is the default and can be omitted\n)\ncredit_entitlement = client.credit_entitlements.create(\n    name="name",\n    overage_enabled=True,\n    precision=0,\n    rollover_enabled=True,\n    unit="unit",\n)\nprint(credit_entitlement.id)',
      },
      ruby: {
        method: 'credit_entitlements.create',
        example:
          'require "dodopayments"\n\ndodo_payments = Dodopayments::Client.new(\n  bearer_token: "My Bearer Token",\n  environment: "test_mode" # defaults to "live_mode"\n)\n\ncredit_entitlement = dodo_payments.credit_entitlements.create(\n  name: "name",\n  overage_enabled: true,\n  precision: 0,\n  rollover_enabled: true,\n  unit: "unit"\n)\n\nputs(credit_entitlement)',
      },
      typescript: {
        method: 'client.creditEntitlements.create',
        example:
          "import DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments({\n  bearerToken: process.env['DODO_PAYMENTS_API_KEY'], // This is the default and can be omitted\n});\n\nconst creditEntitlement = await client.creditEntitlements.create({\n  name: 'name',\n  overage_enabled: true,\n  precision: 0,\n  rollover_enabled: true,\n  unit: 'unit',\n});\n\nconsole.log(creditEntitlement.id);",
      },
    },
  },
  {
    name: 'retrieve',
    endpoint: '/credit-entitlements/{id}',
    httpMethod: 'get',
    summary: 'Retrieves a specific credit entitlement by its ID.',
    description:
      'Returns the full details of a single credit entitlement including all configuration\nsettings for expiration, rollover, and overage policies.\n\n# Authentication\nRequires an API key with `Viewer` role or higher.\n\n# Path Parameters\n- `id` - The unique identifier of the credit entitlement (format: `cde_...`)\n\n# Responses\n- `200 OK` - Returns the full credit entitlement object\n- `404 Not Found` - Credit entitlement does not exist or does not belong to the authenticated business\n- `500 Internal Server Error` - Database or server error\n\n# Business Logic\n- Only non-deleted credit entitlements can be retrieved through this endpoint\n- The entitlement must belong to the authenticated business (business_id check)\n- Deleted entitlements return a 404 error and must be retrieved via the list endpoint with `deleted=true`',
    stainlessPath: '(resource) credit_entitlements > (method) retrieve',
    qualified: 'client.creditEntitlements.retrieve',
    params: ['id: string;'],
    response:
      "{ id: string; business_id: string; created_at: string; name: string; overage_behavior: 'forgive_at_reset' | 'invoice_at_billing' | 'carry_deficit' | 'carry_deficit_auto_repay'; overage_enabled: boolean; precision: number; rollover_enabled: boolean; unit: string; updated_at: string; currency?: string; description?: string; expires_after_days?: number; max_rollover_count?: number; overage_limit?: number; price_per_unit?: string; rollover_percentage?: number; rollover_timeframe_count?: number; rollover_timeframe_interval?: 'Day' | 'Week' | 'Month' | 'Year'; }",
    markdown:
      "## retrieve\n\n`client.creditEntitlements.retrieve(id: string): { id: string; business_id: string; created_at: string; name: string; overage_behavior: cbb_overage_behavior; overage_enabled: boolean; precision: number; rollover_enabled: boolean; unit: string; updated_at: string; currency?: currency; description?: string; expires_after_days?: number; max_rollover_count?: number; overage_limit?: number; price_per_unit?: string; rollover_percentage?: number; rollover_timeframe_count?: number; rollover_timeframe_interval?: time_interval; }`\n\n**get** `/credit-entitlements/{id}`\n\nReturns the full details of a single credit entitlement including all configuration\nsettings for expiration, rollover, and overage policies.\n\n# Authentication\nRequires an API key with `Viewer` role or higher.\n\n# Path Parameters\n- `id` - The unique identifier of the credit entitlement (format: `cde_...`)\n\n# Responses\n- `200 OK` - Returns the full credit entitlement object\n- `404 Not Found` - Credit entitlement does not exist or does not belong to the authenticated business\n- `500 Internal Server Error` - Database or server error\n\n# Business Logic\n- Only non-deleted credit entitlements can be retrieved through this endpoint\n- The entitlement must belong to the authenticated business (business_id check)\n- Deleted entitlements return a 404 error and must be retrieved via the list endpoint with `deleted=true`\n\n### Parameters\n\n- `id: string`\n\n### Returns\n\n- `{ id: string; business_id: string; created_at: string; name: string; overage_behavior: 'forgive_at_reset' | 'invoice_at_billing' | 'carry_deficit' | 'carry_deficit_auto_repay'; overage_enabled: boolean; precision: number; rollover_enabled: boolean; unit: string; updated_at: string; currency?: string; description?: string; expires_after_days?: number; max_rollover_count?: number; overage_limit?: number; price_per_unit?: string; rollover_percentage?: number; rollover_timeframe_count?: number; rollover_timeframe_interval?: 'Day' | 'Week' | 'Month' | 'Year'; }`\n\n  - `id: string`\n  - `business_id: string`\n  - `created_at: string`\n  - `name: string`\n  - `overage_behavior: 'forgive_at_reset' | 'invoice_at_billing' | 'carry_deficit' | 'carry_deficit_auto_repay'`\n  - `overage_enabled: boolean`\n  - `precision: number`\n  - `rollover_enabled: boolean`\n  - `unit: string`\n  - `updated_at: string`\n  - `currency?: string`\n  - `description?: string`\n  - `expires_after_days?: number`\n  - `max_rollover_count?: number`\n  - `overage_limit?: number`\n  - `price_per_unit?: string`\n  - `rollover_percentage?: number`\n  - `rollover_timeframe_count?: number`\n  - `rollover_timeframe_interval?: 'Day' | 'Week' | 'Month' | 'Year'`\n\n### Example\n\n```typescript\nimport DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments();\n\nconst creditEntitlement = await client.creditEntitlements.retrieve('id');\n\nconsole.log(creditEntitlement);\n```",
    perLanguage: {
      cli: {
        method: 'credit_entitlements retrieve',
        example:
          "dodo-payments-cli credit-entitlements retrieve \\\n  --bearer-token 'My Bearer Token' \\\n  --id id",
      },
      csharp: {
        method: 'CreditEntitlements.Retrieve',
        example:
          'CreditEntitlementRetrieveParams parameters = new() { ID = "id" };\n\nvar creditEntitlement = await client.CreditEntitlements.Retrieve(parameters);\n\nConsole.WriteLine(creditEntitlement);',
      },
      go: {
        method: 'client.CreditEntitlements.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/dodopayments/dodopayments-go"\n\t"github.com/dodopayments/dodopayments-go/option"\n)\n\nfunc main() {\n\tclient := dodopayments.NewClient(\n\t\toption.WithBearerToken("My Bearer Token"),\n\t)\n\tcreditEntitlement, err := client.CreditEntitlements.Get(context.TODO(), "id")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", creditEntitlement.ID)\n}\n',
      },
      http: {
        example:
          'curl https://live.dodopayments.com/credit-entitlements/$ID \\\n    -H "Authorization: Bearer $DODO_PAYMENTS_API_KEY"',
      },
      java: {
        method: 'creditEntitlements().retrieve',
        example:
          'package com.dodopayments.api.example;\n\nimport com.dodopayments.api.client.DodoPaymentsClient;\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient;\nimport com.dodopayments.api.models.creditentitlements.CreditEntitlement;\nimport com.dodopayments.api.models.creditentitlements.CreditEntitlementRetrieveParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        DodoPaymentsClient client = DodoPaymentsOkHttpClient.fromEnv();\n\n        CreditEntitlement creditEntitlement = client.creditEntitlements().retrieve("id");\n    }\n}',
      },
      kotlin: {
        method: 'creditEntitlements().retrieve',
        example:
          'package com.dodopayments.api.example\n\nimport com.dodopayments.api.client.DodoPaymentsClient\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient\nimport com.dodopayments.api.models.creditentitlements.CreditEntitlement\nimport com.dodopayments.api.models.creditentitlements.CreditEntitlementRetrieveParams\n\nfun main() {\n    val client: DodoPaymentsClient = DodoPaymentsOkHttpClient.fromEnv()\n\n    val creditEntitlement: CreditEntitlement = client.creditEntitlements().retrieve("id")\n}',
      },
      php: {
        method: 'creditEntitlements->retrieve',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(bearerToken: 'My Bearer Token', environment: 'test_mode');\n\n$creditEntitlement = $client->creditEntitlements->retrieve('id');\n\nvar_dump($creditEntitlement);",
      },
      python: {
        method: 'credit_entitlements.retrieve',
        example:
          'import os\nfrom dodopayments import DodoPayments\n\nclient = DodoPayments(\n    bearer_token=os.environ.get("DODO_PAYMENTS_API_KEY"),  # This is the default and can be omitted\n)\ncredit_entitlement = client.credit_entitlements.retrieve(\n    "id",\n)\nprint(credit_entitlement.id)',
      },
      ruby: {
        method: 'credit_entitlements.retrieve',
        example:
          'require "dodopayments"\n\ndodo_payments = Dodopayments::Client.new(\n  bearer_token: "My Bearer Token",\n  environment: "test_mode" # defaults to "live_mode"\n)\n\ncredit_entitlement = dodo_payments.credit_entitlements.retrieve("id")\n\nputs(credit_entitlement)',
      },
      typescript: {
        method: 'client.creditEntitlements.retrieve',
        example:
          "import DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments({\n  bearerToken: process.env['DODO_PAYMENTS_API_KEY'], // This is the default and can be omitted\n});\n\nconst creditEntitlement = await client.creditEntitlements.retrieve('id');\n\nconsole.log(creditEntitlement.id);",
      },
    },
  },
  {
    name: 'delete',
    endpoint: '/credit-entitlements/{id}',
    httpMethod: 'delete',
    summary: '',
    description: '',
    stainlessPath: '(resource) credit_entitlements > (method) delete',
    qualified: 'client.creditEntitlements.delete',
    params: ['id: string;'],
    markdown:
      "## delete\n\n`client.creditEntitlements.delete(id: string): void`\n\n**delete** `/credit-entitlements/{id}`\n\n### Parameters\n\n- `id: string`\n\n### Example\n\n```typescript\nimport DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments();\n\nawait client.creditEntitlements.delete('id')\n```",
    perLanguage: {
      cli: {
        method: 'credit_entitlements delete',
        example:
          "dodo-payments-cli credit-entitlements delete \\\n  --bearer-token 'My Bearer Token' \\\n  --id id",
      },
      csharp: {
        method: 'CreditEntitlements.Delete',
        example:
          'CreditEntitlementDeleteParams parameters = new() { ID = "id" };\n\nawait client.CreditEntitlements.Delete(parameters);',
      },
      go: {
        method: 'client.CreditEntitlements.Delete',
        example:
          'package main\n\nimport (\n\t"context"\n\n\t"github.com/dodopayments/dodopayments-go"\n\t"github.com/dodopayments/dodopayments-go/option"\n)\n\nfunc main() {\n\tclient := dodopayments.NewClient(\n\t\toption.WithBearerToken("My Bearer Token"),\n\t)\n\terr := client.CreditEntitlements.Delete(context.TODO(), "id")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
      http: {
        example:
          'curl https://live.dodopayments.com/credit-entitlements/$ID \\\n    -X DELETE \\\n    -H "Authorization: Bearer $DODO_PAYMENTS_API_KEY"',
      },
      java: {
        method: 'creditEntitlements().delete',
        example:
          'package com.dodopayments.api.example;\n\nimport com.dodopayments.api.client.DodoPaymentsClient;\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient;\nimport com.dodopayments.api.models.creditentitlements.CreditEntitlementDeleteParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        DodoPaymentsClient client = DodoPaymentsOkHttpClient.fromEnv();\n\n        client.creditEntitlements().delete("id");\n    }\n}',
      },
      kotlin: {
        method: 'creditEntitlements().delete',
        example:
          'package com.dodopayments.api.example\n\nimport com.dodopayments.api.client.DodoPaymentsClient\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient\nimport com.dodopayments.api.models.creditentitlements.CreditEntitlementDeleteParams\n\nfun main() {\n    val client: DodoPaymentsClient = DodoPaymentsOkHttpClient.fromEnv()\n\n    client.creditEntitlements().delete("id")\n}',
      },
      php: {
        method: 'creditEntitlements->delete',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(bearerToken: 'My Bearer Token', environment: 'test_mode');\n\n$result = $client->creditEntitlements->delete('id');\n\nvar_dump($result);",
      },
      python: {
        method: 'credit_entitlements.delete',
        example:
          'import os\nfrom dodopayments import DodoPayments\n\nclient = DodoPayments(\n    bearer_token=os.environ.get("DODO_PAYMENTS_API_KEY"),  # This is the default and can be omitted\n)\nclient.credit_entitlements.delete(\n    "id",\n)',
      },
      ruby: {
        method: 'credit_entitlements.delete',
        example:
          'require "dodopayments"\n\ndodo_payments = Dodopayments::Client.new(\n  bearer_token: "My Bearer Token",\n  environment: "test_mode" # defaults to "live_mode"\n)\n\nresult = dodo_payments.credit_entitlements.delete("id")\n\nputs(result)',
      },
      typescript: {
        method: 'client.creditEntitlements.delete',
        example:
          "import DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments({\n  bearerToken: process.env['DODO_PAYMENTS_API_KEY'], // This is the default and can be omitted\n});\n\nawait client.creditEntitlements.delete('id');",
      },
    },
  },
  {
    name: 'update',
    endpoint: '/credit-entitlements/{id}',
    httpMethod: 'patch',
    summary: 'Updates an existing credit entitlement with partial data.',
    description:
      "Allows partial updates to a credit entitlement's configuration. Only the fields\nprovided in the request body will be updated; all other fields remain unchanged.\nThis endpoint supports nullable fields using the double option pattern.\n\n# Authentication\nRequires an API key with `Editor` role.\n\n# Path Parameters\n- `id` - The unique identifier of the credit entitlement to update (format: `cde_...`)\n\n# Request Body (all fields optional)\n- `name` - Human-readable name of the credit entitlement (1-255 characters)\n- `description` - Optional description (max 1000 characters)\n- `unit` - Unit of measurement for the credit (1-50 characters)\n\nNote: `precision` cannot be modified after creation as it would invalidate existing grants.\n- `expires_after_days` - Number of days after which credits expire (use `null` to remove expiration)\n- `rollover_enabled` - Whether unused credits can rollover to the next period\n- `rollover_percentage` - Percentage of unused credits that rollover (0-100, nullable)\n- `rollover_timeframe_count` - Count of timeframe periods for rollover limit (nullable)\n- `rollover_timeframe_interval` - Interval type (day, week, month, year, nullable)\n- `max_rollover_count` - Maximum number of times credits can be rolled over (nullable)\n- `overage_enabled` - Whether overage charges apply when credits run out\n- `overage_limit` - Maximum overage units allowed (nullable)\n- `currency` - Currency for pricing (nullable)\n- `price_per_unit` - Price per credit unit (decimal, nullable)\n\n# Responses\n- `200 OK` - Credit entitlement updated successfully\n- `404 Not Found` - Credit entitlement does not exist or does not belong to the authenticated business\n- `422 Unprocessable Entity` - Invalid request parameters or validation failure\n- `500 Internal Server Error` - Database or server error\n\n# Business Logic\n- Only non-deleted credit entitlements can be updated\n- Fields set to `null` explicitly will clear the database value (using double option pattern)\n- The `updated_at` timestamp is automatically updated on successful modification\n- Changes take effect immediately but do not retroactively affect existing credit grants\n- The merged state is validated: currency required with price, rollover timeframe fields together, price required for overage",
    stainlessPath: '(resource) credit_entitlements > (method) update',
    qualified: 'client.creditEntitlements.update',
    params: [
      'id: string;',
      'currency?: string;',
      'description?: string;',
      'expires_after_days?: number;',
      'max_rollover_count?: number;',
      'name?: string;',
      "overage_behavior?: 'forgive_at_reset' | 'invoice_at_billing' | 'carry_deficit' | 'carry_deficit_auto_repay';",
      'overage_enabled?: boolean;',
      'overage_limit?: number;',
      'price_per_unit?: string;',
      'rollover_enabled?: boolean;',
      'rollover_percentage?: number;',
      'rollover_timeframe_count?: number;',
      "rollover_timeframe_interval?: 'Day' | 'Week' | 'Month' | 'Year';",
      'unit?: string;',
    ],
    markdown:
      "## update\n\n`client.creditEntitlements.update(id: string, currency?: string, description?: string, expires_after_days?: number, max_rollover_count?: number, name?: string, overage_behavior?: 'forgive_at_reset' | 'invoice_at_billing' | 'carry_deficit' | 'carry_deficit_auto_repay', overage_enabled?: boolean, overage_limit?: number, price_per_unit?: string, rollover_enabled?: boolean, rollover_percentage?: number, rollover_timeframe_count?: number, rollover_timeframe_interval?: 'Day' | 'Week' | 'Month' | 'Year', unit?: string): void`\n\n**patch** `/credit-entitlements/{id}`\n\nAllows partial updates to a credit entitlement's configuration. Only the fields\nprovided in the request body will be updated; all other fields remain unchanged.\nThis endpoint supports nullable fields using the double option pattern.\n\n# Authentication\nRequires an API key with `Editor` role.\n\n# Path Parameters\n- `id` - The unique identifier of the credit entitlement to update (format: `cde_...`)\n\n# Request Body (all fields optional)\n- `name` - Human-readable name of the credit entitlement (1-255 characters)\n- `description` - Optional description (max 1000 characters)\n- `unit` - Unit of measurement for the credit (1-50 characters)\n\nNote: `precision` cannot be modified after creation as it would invalidate existing grants.\n- `expires_after_days` - Number of days after which credits expire (use `null` to remove expiration)\n- `rollover_enabled` - Whether unused credits can rollover to the next period\n- `rollover_percentage` - Percentage of unused credits that rollover (0-100, nullable)\n- `rollover_timeframe_count` - Count of timeframe periods for rollover limit (nullable)\n- `rollover_timeframe_interval` - Interval type (day, week, month, year, nullable)\n- `max_rollover_count` - Maximum number of times credits can be rolled over (nullable)\n- `overage_enabled` - Whether overage charges apply when credits run out\n- `overage_limit` - Maximum overage units allowed (nullable)\n- `currency` - Currency for pricing (nullable)\n- `price_per_unit` - Price per credit unit (decimal, nullable)\n\n# Responses\n- `200 OK` - Credit entitlement updated successfully\n- `404 Not Found` - Credit entitlement does not exist or does not belong to the authenticated business\n- `422 Unprocessable Entity` - Invalid request parameters or validation failure\n- `500 Internal Server Error` - Database or server error\n\n# Business Logic\n- Only non-deleted credit entitlements can be updated\n- Fields set to `null` explicitly will clear the database value (using double option pattern)\n- The `updated_at` timestamp is automatically updated on successful modification\n- Changes take effect immediately but do not retroactively affect existing credit grants\n- The merged state is validated: currency required with price, rollover timeframe fields together, price required for overage\n\n### Parameters\n\n- `id: string`\n\n- `currency?: string`\n  Currency for pricing\n\n- `description?: string`\n  Optional description of the credit entitlement\n\n- `expires_after_days?: number`\n  Number of days after which credits expire\n\n- `max_rollover_count?: number`\n  Maximum number of times credits can be rolled over\n\n- `name?: string`\n  Name of the credit entitlement\n\n- `overage_behavior?: 'forgive_at_reset' | 'invoice_at_billing' | 'carry_deficit' | 'carry_deficit_auto_repay'`\n  Controls how overage is handled at billing cycle end.\n\n- `overage_enabled?: boolean`\n  Whether overage charges are enabled when credits run out\n\n- `overage_limit?: number`\n  Maximum overage units allowed\n\n- `price_per_unit?: string`\n  Price per credit unit\n\n- `rollover_enabled?: boolean`\n  Whether rollover is enabled for unused credits\n\n- `rollover_percentage?: number`\n  Percentage of unused credits that can rollover (0-100)\n\n- `rollover_timeframe_count?: number`\n  Count of timeframe periods for rollover limit\n\n- `rollover_timeframe_interval?: 'Day' | 'Week' | 'Month' | 'Year'`\n  Interval type for rollover timeframe\n\n- `unit?: string`\n  Unit of measurement for the credit (e.g., \"API Calls\", \"Tokens\", \"Credits\")\n\n### Example\n\n```typescript\nimport DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments();\n\nawait client.creditEntitlements.update('id')\n```",
    perLanguage: {
      cli: {
        method: 'credit_entitlements update',
        example:
          "dodo-payments-cli credit-entitlements update \\\n  --bearer-token 'My Bearer Token' \\\n  --id id",
      },
      csharp: {
        method: 'CreditEntitlements.Update',
        example:
          'CreditEntitlementUpdateParams parameters = new() { ID = "id" };\n\nawait client.CreditEntitlements.Update(parameters);',
      },
      go: {
        method: 'client.CreditEntitlements.Update',
        example:
          'package main\n\nimport (\n\t"context"\n\n\t"github.com/dodopayments/dodopayments-go"\n\t"github.com/dodopayments/dodopayments-go/option"\n)\n\nfunc main() {\n\tclient := dodopayments.NewClient(\n\t\toption.WithBearerToken("My Bearer Token"),\n\t)\n\terr := client.CreditEntitlements.Update(\n\t\tcontext.TODO(),\n\t\t"id",\n\t\tdodopayments.CreditEntitlementUpdateParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
      http: {
        example:
          "curl https://live.dodopayments.com/credit-entitlements/$ID \\\n    -X PATCH \\\n    -H 'Content-Type: application/json' \\\n    -H \"Authorization: Bearer $DODO_PAYMENTS_API_KEY\" \\\n    -d '{}'",
      },
      java: {
        method: 'creditEntitlements().update',
        example:
          'package com.dodopayments.api.example;\n\nimport com.dodopayments.api.client.DodoPaymentsClient;\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient;\nimport com.dodopayments.api.models.creditentitlements.CreditEntitlementUpdateParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        DodoPaymentsClient client = DodoPaymentsOkHttpClient.fromEnv();\n\n        client.creditEntitlements().update("id");\n    }\n}',
      },
      kotlin: {
        method: 'creditEntitlements().update',
        example:
          'package com.dodopayments.api.example\n\nimport com.dodopayments.api.client.DodoPaymentsClient\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient\nimport com.dodopayments.api.models.creditentitlements.CreditEntitlementUpdateParams\n\nfun main() {\n    val client: DodoPaymentsClient = DodoPaymentsOkHttpClient.fromEnv()\n\n    client.creditEntitlements().update("id")\n}',
      },
      php: {
        method: 'creditEntitlements->update',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(bearerToken: 'My Bearer Token', environment: 'test_mode');\n\n$result = $client->creditEntitlements->update(\n  'id',\n  currency: Currency::AED,\n  description: 'description',\n  expiresAfterDays: 0,\n  maxRolloverCount: 0,\n  name: 'name',\n  overageBehavior: CbbOverageBehavior::FORGIVE_AT_RESET,\n  overageEnabled: true,\n  overageLimit: 0,\n  pricePerUnit: 'price_per_unit',\n  rolloverEnabled: true,\n  rolloverPercentage: 0,\n  rolloverTimeframeCount: 0,\n  rolloverTimeframeInterval: TimeInterval::DAY,\n  unit: 'unit',\n);\n\nvar_dump($result);",
      },
      python: {
        method: 'credit_entitlements.update',
        example:
          'import os\nfrom dodopayments import DodoPayments\n\nclient = DodoPayments(\n    bearer_token=os.environ.get("DODO_PAYMENTS_API_KEY"),  # This is the default and can be omitted\n)\nclient.credit_entitlements.update(\n    id="id",\n)',
      },
      ruby: {
        method: 'credit_entitlements.update',
        example:
          'require "dodopayments"\n\ndodo_payments = Dodopayments::Client.new(\n  bearer_token: "My Bearer Token",\n  environment: "test_mode" # defaults to "live_mode"\n)\n\nresult = dodo_payments.credit_entitlements.update("id")\n\nputs(result)',
      },
      typescript: {
        method: 'client.creditEntitlements.update',
        example:
          "import DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments({\n  bearerToken: process.env['DODO_PAYMENTS_API_KEY'], // This is the default and can be omitted\n});\n\nawait client.creditEntitlements.update('id');",
      },
    },
  },
  {
    name: 'undelete',
    endpoint: '/credit-entitlements/{id}/undelete',
    httpMethod: 'post',
    summary: 'Restores a previously deleted credit entitlement.',
    description:
      "Undeletes a soft-deleted credit entitlement by clearing `deleted_at`,\nmaking it available again through standard list and get endpoints.\n\n# Authentication\nRequires an API key with `Editor` role.\n\n# Path Parameters\n- `id` - The unique identifier of the credit entitlement to restore (format: `cde_...`)\n\n# Responses\n- `200 OK` - Credit entitlement restored successfully\n- `500 Internal Server Error` - Database error, entitlement not found, or entitlement is not deleted\n\n# Business Logic\n- Only deleted credit entitlements can be restored\n- The query filters for `deleted_at IS NOT NULL`, so non-deleted entitlements will result in 0 rows affected\n- If no rows are affected (entitlement doesn't exist, doesn't belong to business, or is not deleted), returns 500\n- The `updated_at` timestamp is automatically updated on successful restoration\n- Once restored, the entitlement becomes immediately available in the standard list and get endpoints\n- All configuration settings are preserved during delete/restore operations\n\n# Error Handling\nThis endpoint returns 500 Internal Server Error in several cases:\n- The credit entitlement does not exist\n- The credit entitlement belongs to a different business\n- The credit entitlement is not currently deleted (already active)\n\nCallers should verify the entitlement exists and is deleted before calling this endpoint.",
    stainlessPath: '(resource) credit_entitlements > (method) undelete',
    qualified: 'client.creditEntitlements.undelete',
    params: ['id: string;'],
    markdown:
      "## undelete\n\n`client.creditEntitlements.undelete(id: string): void`\n\n**post** `/credit-entitlements/{id}/undelete`\n\nUndeletes a soft-deleted credit entitlement by clearing `deleted_at`,\nmaking it available again through standard list and get endpoints.\n\n# Authentication\nRequires an API key with `Editor` role.\n\n# Path Parameters\n- `id` - The unique identifier of the credit entitlement to restore (format: `cde_...`)\n\n# Responses\n- `200 OK` - Credit entitlement restored successfully\n- `500 Internal Server Error` - Database error, entitlement not found, or entitlement is not deleted\n\n# Business Logic\n- Only deleted credit entitlements can be restored\n- The query filters for `deleted_at IS NOT NULL`, so non-deleted entitlements will result in 0 rows affected\n- If no rows are affected (entitlement doesn't exist, doesn't belong to business, or is not deleted), returns 500\n- The `updated_at` timestamp is automatically updated on successful restoration\n- Once restored, the entitlement becomes immediately available in the standard list and get endpoints\n- All configuration settings are preserved during delete/restore operations\n\n# Error Handling\nThis endpoint returns 500 Internal Server Error in several cases:\n- The credit entitlement does not exist\n- The credit entitlement belongs to a different business\n- The credit entitlement is not currently deleted (already active)\n\nCallers should verify the entitlement exists and is deleted before calling this endpoint.\n\n### Parameters\n\n- `id: string`\n\n### Example\n\n```typescript\nimport DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments();\n\nawait client.creditEntitlements.undelete('id')\n```",
    perLanguage: {
      cli: {
        method: 'credit_entitlements undelete',
        example:
          "dodo-payments-cli credit-entitlements undelete \\\n  --bearer-token 'My Bearer Token' \\\n  --id id",
      },
      csharp: {
        method: 'CreditEntitlements.Undelete',
        example:
          'CreditEntitlementUndeleteParams parameters = new() { ID = "id" };\n\nawait client.CreditEntitlements.Undelete(parameters);',
      },
      go: {
        method: 'client.CreditEntitlements.Undelete',
        example:
          'package main\n\nimport (\n\t"context"\n\n\t"github.com/dodopayments/dodopayments-go"\n\t"github.com/dodopayments/dodopayments-go/option"\n)\n\nfunc main() {\n\tclient := dodopayments.NewClient(\n\t\toption.WithBearerToken("My Bearer Token"),\n\t)\n\terr := client.CreditEntitlements.Undelete(context.TODO(), "id")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
      http: {
        example:
          'curl https://live.dodopayments.com/credit-entitlements/$ID/undelete \\\n    -X POST \\\n    -H "Authorization: Bearer $DODO_PAYMENTS_API_KEY"',
      },
      java: {
        method: 'creditEntitlements().undelete',
        example:
          'package com.dodopayments.api.example;\n\nimport com.dodopayments.api.client.DodoPaymentsClient;\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient;\nimport com.dodopayments.api.models.creditentitlements.CreditEntitlementUndeleteParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        DodoPaymentsClient client = DodoPaymentsOkHttpClient.fromEnv();\n\n        client.creditEntitlements().undelete("id");\n    }\n}',
      },
      kotlin: {
        method: 'creditEntitlements().undelete',
        example:
          'package com.dodopayments.api.example\n\nimport com.dodopayments.api.client.DodoPaymentsClient\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient\nimport com.dodopayments.api.models.creditentitlements.CreditEntitlementUndeleteParams\n\nfun main() {\n    val client: DodoPaymentsClient = DodoPaymentsOkHttpClient.fromEnv()\n\n    client.creditEntitlements().undelete("id")\n}',
      },
      php: {
        method: 'creditEntitlements->undelete',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(bearerToken: 'My Bearer Token', environment: 'test_mode');\n\n$result = $client->creditEntitlements->undelete('id');\n\nvar_dump($result);",
      },
      python: {
        method: 'credit_entitlements.undelete',
        example:
          'import os\nfrom dodopayments import DodoPayments\n\nclient = DodoPayments(\n    bearer_token=os.environ.get("DODO_PAYMENTS_API_KEY"),  # This is the default and can be omitted\n)\nclient.credit_entitlements.undelete(\n    "id",\n)',
      },
      ruby: {
        method: 'credit_entitlements.undelete',
        example:
          'require "dodopayments"\n\ndodo_payments = Dodopayments::Client.new(\n  bearer_token: "My Bearer Token",\n  environment: "test_mode" # defaults to "live_mode"\n)\n\nresult = dodo_payments.credit_entitlements.undelete("id")\n\nputs(result)',
      },
      typescript: {
        method: 'client.creditEntitlements.undelete',
        example:
          "import DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments({\n  bearerToken: process.env['DODO_PAYMENTS_API_KEY'], // This is the default and can be omitted\n});\n\nawait client.creditEntitlements.undelete('id');",
      },
    },
  },
  {
    name: 'list',
    endpoint: '/credit-entitlements/{credit_entitlement_id}/balances',
    httpMethod: 'get',
    summary: 'Lists all customer balances for a specific credit entitlement.',
    description:
      'Returns a paginated list of customer credit balances for the given credit entitlement.\n\n# Authentication\nRequires an API key with `Viewer` role or higher.\n\n# Path Parameters\n- `credit_entitlement_id` - The unique identifier of the credit entitlement\n\n# Query Parameters\n- `page_size` - Number of items per page (default: 10, max: 100)\n- `page_number` - Zero-based page number (default: 0)\n- `customer_id` - Optional filter by specific customer\n\n# Responses\n- `200 OK` - Returns list of customer balances\n- `404 Not Found` - Credit entitlement not found\n- `500 Internal Server Error` - Database or server error',
    stainlessPath: '(resource) credit_entitlements.balances > (method) list',
    qualified: 'client.creditEntitlements.balances.list',
    params: [
      'credit_entitlement_id: string;',
      'customer_id?: string;',
      'page_number?: number;',
      'page_size?: number;',
    ],
    response:
      '{ id: string; balance: string; created_at: string; credit_entitlement_id: string; customer_id: string; overage: string; updated_at: string; last_transaction_at?: string; }',
    markdown:
      "## list\n\n`client.creditEntitlements.balances.list(credit_entitlement_id: string, customer_id?: string, page_number?: number, page_size?: number): { id: string; balance: string; created_at: string; credit_entitlement_id: string; customer_id: string; overage: string; updated_at: string; last_transaction_at?: string; }`\n\n**get** `/credit-entitlements/{credit_entitlement_id}/balances`\n\nReturns a paginated list of customer credit balances for the given credit entitlement.\n\n# Authentication\nRequires an API key with `Viewer` role or higher.\n\n# Path Parameters\n- `credit_entitlement_id` - The unique identifier of the credit entitlement\n\n# Query Parameters\n- `page_size` - Number of items per page (default: 10, max: 100)\n- `page_number` - Zero-based page number (default: 0)\n- `customer_id` - Optional filter by specific customer\n\n# Responses\n- `200 OK` - Returns list of customer balances\n- `404 Not Found` - Credit entitlement not found\n- `500 Internal Server Error` - Database or server error\n\n### Parameters\n\n- `credit_entitlement_id: string`\n\n- `customer_id?: string`\n  Filter by specific customer ID\n\n- `page_number?: number`\n  Page number default is 0\n\n- `page_size?: number`\n  Page size default is 10 max is 100\n\n### Returns\n\n- `{ id: string; balance: string; created_at: string; credit_entitlement_id: string; customer_id: string; overage: string; updated_at: string; last_transaction_at?: string; }`\n  Response for a customer's credit balance\n\n  - `id: string`\n  - `balance: string`\n  - `created_at: string`\n  - `credit_entitlement_id: string`\n  - `customer_id: string`\n  - `overage: string`\n  - `updated_at: string`\n  - `last_transaction_at?: string`\n\n### Example\n\n```typescript\nimport DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments();\n\n// Automatically fetches more pages as needed.\nfor await (const customerCreditBalance of client.creditEntitlements.balances.list('credit_entitlement_id')) {\n  console.log(customerCreditBalance);\n}\n```",
    perLanguage: {
      cli: {
        method: 'balances list',
        example:
          "dodo-payments-cli credit-entitlements:balances list \\\n  --bearer-token 'My Bearer Token' \\\n  --credit-entitlement-id credit_entitlement_id",
      },
      csharp: {
        method: 'CreditEntitlements.Balances.List',
        example:
          'BalanceListParams parameters = new()\n{\n    CreditEntitlementID = "credit_entitlement_id"\n};\n\nvar page = await client.CreditEntitlements.Balances.List(parameters);\nawait foreach (var item in page.Paginate())\n{\n    Console.WriteLine(item);\n}',
      },
      go: {
        method: 'client.CreditEntitlements.Balances.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/dodopayments/dodopayments-go"\n\t"github.com/dodopayments/dodopayments-go/option"\n)\n\nfunc main() {\n\tclient := dodopayments.NewClient(\n\t\toption.WithBearerToken("My Bearer Token"),\n\t)\n\tpage, err := client.CreditEntitlements.Balances.List(\n\t\tcontext.TODO(),\n\t\t"credit_entitlement_id",\n\t\tdodopayments.CreditEntitlementBalanceListParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", page)\n}\n',
      },
      http: {
        example:
          'curl https://live.dodopayments.com/credit-entitlements/$CREDIT_ENTITLEMENT_ID/balances \\\n    -H "Authorization: Bearer $DODO_PAYMENTS_API_KEY"',
      },
      java: {
        method: 'creditEntitlements().balances().list',
        example:
          'package com.dodopayments.api.example;\n\nimport com.dodopayments.api.client.DodoPaymentsClient;\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient;\nimport com.dodopayments.api.models.creditentitlements.balances.BalanceListPage;\nimport com.dodopayments.api.models.creditentitlements.balances.BalanceListParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        DodoPaymentsClient client = DodoPaymentsOkHttpClient.fromEnv();\n\n        BalanceListPage page = client.creditEntitlements().balances().list("credit_entitlement_id");\n    }\n}',
      },
      kotlin: {
        method: 'creditEntitlements().balances().list',
        example:
          'package com.dodopayments.api.example\n\nimport com.dodopayments.api.client.DodoPaymentsClient\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient\nimport com.dodopayments.api.models.creditentitlements.balances.BalanceListPage\nimport com.dodopayments.api.models.creditentitlements.balances.BalanceListParams\n\nfun main() {\n    val client: DodoPaymentsClient = DodoPaymentsOkHttpClient.fromEnv()\n\n    val page: BalanceListPage = client.creditEntitlements().balances().list("credit_entitlement_id")\n}',
      },
      php: {
        method: 'creditEntitlements->balances->list',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(bearerToken: 'My Bearer Token', environment: 'test_mode');\n\n$page = $client->creditEntitlements->balances->list(\n  'credit_entitlement_id', customerID: 'customer_id', pageNumber: 0, pageSize: 0\n);\n\nvar_dump($page);",
      },
      python: {
        method: 'credit_entitlements.balances.list',
        example:
          'import os\nfrom dodopayments import DodoPayments\n\nclient = DodoPayments(\n    bearer_token=os.environ.get("DODO_PAYMENTS_API_KEY"),  # This is the default and can be omitted\n)\npage = client.credit_entitlements.balances.list(\n    credit_entitlement_id="credit_entitlement_id",\n)\npage = page.items[0]\nprint(page.id)',
      },
      ruby: {
        method: 'credit_entitlements.balances.list',
        example:
          'require "dodopayments"\n\ndodo_payments = Dodopayments::Client.new(\n  bearer_token: "My Bearer Token",\n  environment: "test_mode" # defaults to "live_mode"\n)\n\npage = dodo_payments.credit_entitlements.balances.list("credit_entitlement_id")\n\nputs(page)',
      },
      typescript: {
        method: 'client.creditEntitlements.balances.list',
        example:
          "import DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments({\n  bearerToken: process.env['DODO_PAYMENTS_API_KEY'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const customerCreditBalance of client.creditEntitlements.balances.list(\n  'credit_entitlement_id',\n)) {\n  console.log(customerCreditBalance.id);\n}",
      },
    },
  },
  {
    name: 'retrieve',
    endpoint: '/credit-entitlements/{credit_entitlement_id}/balances/{customer_id}',
    httpMethod: 'get',
    summary: "Gets a specific customer's balance for a credit entitlement.",
    description:
      "Returns the credit balance details for a specific customer and credit entitlement.\n\n# Authentication\nRequires an API key with `Viewer` role or higher.\n\n# Path Parameters\n- `credit_entitlement_id` - The unique identifier of the credit entitlement\n- `customer_id` - The unique identifier of the customer\n\n# Responses\n- `200 OK` - Returns the customer's balance\n- `404 Not Found` - Credit entitlement or customer balance not found\n- `500 Internal Server Error` - Database or server error",
    stainlessPath: '(resource) credit_entitlements.balances > (method) retrieve',
    qualified: 'client.creditEntitlements.balances.retrieve',
    params: ['credit_entitlement_id: string;', 'customer_id: string;'],
    response:
      '{ id: string; balance: string; created_at: string; credit_entitlement_id: string; customer_id: string; overage: string; updated_at: string; last_transaction_at?: string; }',
    markdown:
      "## retrieve\n\n`client.creditEntitlements.balances.retrieve(credit_entitlement_id: string, customer_id: string): { id: string; balance: string; created_at: string; credit_entitlement_id: string; customer_id: string; overage: string; updated_at: string; last_transaction_at?: string; }`\n\n**get** `/credit-entitlements/{credit_entitlement_id}/balances/{customer_id}`\n\nReturns the credit balance details for a specific customer and credit entitlement.\n\n# Authentication\nRequires an API key with `Viewer` role or higher.\n\n# Path Parameters\n- `credit_entitlement_id` - The unique identifier of the credit entitlement\n- `customer_id` - The unique identifier of the customer\n\n# Responses\n- `200 OK` - Returns the customer's balance\n- `404 Not Found` - Credit entitlement or customer balance not found\n- `500 Internal Server Error` - Database or server error\n\n### Parameters\n\n- `credit_entitlement_id: string`\n\n- `customer_id: string`\n\n### Returns\n\n- `{ id: string; balance: string; created_at: string; credit_entitlement_id: string; customer_id: string; overage: string; updated_at: string; last_transaction_at?: string; }`\n  Response for a customer's credit balance\n\n  - `id: string`\n  - `balance: string`\n  - `created_at: string`\n  - `credit_entitlement_id: string`\n  - `customer_id: string`\n  - `overage: string`\n  - `updated_at: string`\n  - `last_transaction_at?: string`\n\n### Example\n\n```typescript\nimport DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments();\n\nconst customerCreditBalance = await client.creditEntitlements.balances.retrieve('customer_id', { credit_entitlement_id: 'credit_entitlement_id' });\n\nconsole.log(customerCreditBalance);\n```",
    perLanguage: {
      cli: {
        method: 'balances retrieve',
        example:
          "dodo-payments-cli credit-entitlements:balances retrieve \\\n  --bearer-token 'My Bearer Token' \\\n  --credit-entitlement-id credit_entitlement_id \\\n  --customer-id customer_id",
      },
      csharp: {
        method: 'CreditEntitlements.Balances.Retrieve',
        example:
          'BalanceRetrieveParams parameters = new()\n{\n    CreditEntitlementID = "credit_entitlement_id",\n    CustomerID = "customer_id",\n};\n\nvar customerCreditBalance = await client.CreditEntitlements.Balances.Retrieve(parameters);\n\nConsole.WriteLine(customerCreditBalance);',
      },
      go: {
        method: 'client.CreditEntitlements.Balances.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/dodopayments/dodopayments-go"\n\t"github.com/dodopayments/dodopayments-go/option"\n)\n\nfunc main() {\n\tclient := dodopayments.NewClient(\n\t\toption.WithBearerToken("My Bearer Token"),\n\t)\n\tcustomerCreditBalance, err := client.CreditEntitlements.Balances.Get(\n\t\tcontext.TODO(),\n\t\t"credit_entitlement_id",\n\t\t"customer_id",\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", customerCreditBalance.ID)\n}\n',
      },
      http: {
        example:
          'curl https://live.dodopayments.com/credit-entitlements/$CREDIT_ENTITLEMENT_ID/balances/$CUSTOMER_ID \\\n    -H "Authorization: Bearer $DODO_PAYMENTS_API_KEY"',
      },
      java: {
        method: 'creditEntitlements().balances().retrieve',
        example:
          'package com.dodopayments.api.example;\n\nimport com.dodopayments.api.client.DodoPaymentsClient;\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient;\nimport com.dodopayments.api.models.creditentitlements.balances.BalanceRetrieveParams;\nimport com.dodopayments.api.models.creditentitlements.balances.CustomerCreditBalance;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        DodoPaymentsClient client = DodoPaymentsOkHttpClient.fromEnv();\n\n        BalanceRetrieveParams params = BalanceRetrieveParams.builder()\n            .creditEntitlementId("credit_entitlement_id")\n            .customerId("customer_id")\n            .build();\n        CustomerCreditBalance customerCreditBalance = client.creditEntitlements().balances().retrieve(params);\n    }\n}',
      },
      kotlin: {
        method: 'creditEntitlements().balances().retrieve',
        example:
          'package com.dodopayments.api.example\n\nimport com.dodopayments.api.client.DodoPaymentsClient\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient\nimport com.dodopayments.api.models.creditentitlements.balances.BalanceRetrieveParams\nimport com.dodopayments.api.models.creditentitlements.balances.CustomerCreditBalance\n\nfun main() {\n    val client: DodoPaymentsClient = DodoPaymentsOkHttpClient.fromEnv()\n\n    val params: BalanceRetrieveParams = BalanceRetrieveParams.builder()\n        .creditEntitlementId("credit_entitlement_id")\n        .customerId("customer_id")\n        .build()\n    val customerCreditBalance: CustomerCreditBalance = client.creditEntitlements().balances().retrieve(params)\n}',
      },
      php: {
        method: 'creditEntitlements->balances->retrieve',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(bearerToken: 'My Bearer Token', environment: 'test_mode');\n\n$customerCreditBalance = $client->creditEntitlements->balances->retrieve(\n  'customer_id', creditEntitlementID: 'credit_entitlement_id'\n);\n\nvar_dump($customerCreditBalance);",
      },
      python: {
        method: 'credit_entitlements.balances.retrieve',
        example:
          'import os\nfrom dodopayments import DodoPayments\n\nclient = DodoPayments(\n    bearer_token=os.environ.get("DODO_PAYMENTS_API_KEY"),  # This is the default and can be omitted\n)\ncustomer_credit_balance = client.credit_entitlements.balances.retrieve(\n    customer_id="customer_id",\n    credit_entitlement_id="credit_entitlement_id",\n)\nprint(customer_credit_balance.id)',
      },
      ruby: {
        method: 'credit_entitlements.balances.retrieve',
        example:
          'require "dodopayments"\n\ndodo_payments = Dodopayments::Client.new(\n  bearer_token: "My Bearer Token",\n  environment: "test_mode" # defaults to "live_mode"\n)\n\ncustomer_credit_balance = dodo_payments.credit_entitlements.balances.retrieve(\n  "customer_id",\n  credit_entitlement_id: "credit_entitlement_id"\n)\n\nputs(customer_credit_balance)',
      },
      typescript: {
        method: 'client.creditEntitlements.balances.retrieve',
        example:
          "import DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments({\n  bearerToken: process.env['DODO_PAYMENTS_API_KEY'], // This is the default and can be omitted\n});\n\nconst customerCreditBalance = await client.creditEntitlements.balances.retrieve('customer_id', {\n  credit_entitlement_id: 'credit_entitlement_id',\n});\n\nconsole.log(customerCreditBalance.id);",
      },
    },
  },
  {
    name: 'list_grants',
    endpoint: '/credit-entitlements/{credit_entitlement_id}/balances/{customer_id}/grants',
    httpMethod: 'get',
    summary: 'Lists credit grants for a customer under a specific credit entitlement.',
    description:
      'Returns a paginated list of credit grants with optional filtering by status.\n\n# Authentication\nRequires an API key with `Viewer` role or higher.\n\n# Path Parameters\n- `credit_entitlement_id` - The unique identifier of the credit entitlement\n- `customer_id` - The unique identifier of the customer\n\n# Query Parameters\n- `page_size` - Number of items per page (default: 10, max: 100)\n- `page_number` - Zero-based page number (default: 0)\n- `status` - Filter by status: active, expired, depleted\n\n# Responses\n- `200 OK` - Returns list of grants\n- `404 Not Found` - Credit entitlement not found\n- `500 Internal Server Error` - Database or server error',
    stainlessPath: '(resource) credit_entitlements.balances > (method) list_grants',
    qualified: 'client.creditEntitlements.balances.listGrants',
    params: [
      'credit_entitlement_id: string;',
      'customer_id: string;',
      'page_number?: number;',
      'page_size?: number;',
      "status?: 'active' | 'expired' | 'depleted';",
    ],
    response:
      "{ id: string; created_at: string; credit_entitlement_id: string; customer_id: string; initial_amount: string; is_expired: boolean; is_rolled_over: boolean; remaining_amount: string; rollover_count: number; source_type: 'subscription' | 'one_time' | 'addon' | 'api' | 'rollover'; updated_at: string; expires_at?: string; metadata?: object; parent_grant_id?: string; source_id?: string; }",
    markdown:
      "## list_grants\n\n`client.creditEntitlements.balances.listGrants(credit_entitlement_id: string, customer_id: string, page_number?: number, page_size?: number, status?: 'active' | 'expired' | 'depleted'): { id: string; created_at: string; credit_entitlement_id: string; customer_id: string; initial_amount: string; is_expired: boolean; is_rolled_over: boolean; remaining_amount: string; rollover_count: number; source_type: 'subscription' | 'one_time' | 'addon' | 'api' | 'rollover'; updated_at: string; expires_at?: string; metadata?: object; parent_grant_id?: string; source_id?: string; }`\n\n**get** `/credit-entitlements/{credit_entitlement_id}/balances/{customer_id}/grants`\n\nReturns a paginated list of credit grants with optional filtering by status.\n\n# Authentication\nRequires an API key with `Viewer` role or higher.\n\n# Path Parameters\n- `credit_entitlement_id` - The unique identifier of the credit entitlement\n- `customer_id` - The unique identifier of the customer\n\n# Query Parameters\n- `page_size` - Number of items per page (default: 10, max: 100)\n- `page_number` - Zero-based page number (default: 0)\n- `status` - Filter by status: active, expired, depleted\n\n# Responses\n- `200 OK` - Returns list of grants\n- `404 Not Found` - Credit entitlement not found\n- `500 Internal Server Error` - Database or server error\n\n### Parameters\n\n- `credit_entitlement_id: string`\n\n- `customer_id: string`\n\n- `page_number?: number`\n  Page number default is 0\n\n- `page_size?: number`\n  Page size default is 10 max is 100\n\n- `status?: 'active' | 'expired' | 'depleted'`\n  Filter by grant status: active, expired, depleted\n\n### Returns\n\n- `{ id: string; created_at: string; credit_entitlement_id: string; customer_id: string; initial_amount: string; is_expired: boolean; is_rolled_over: boolean; remaining_amount: string; rollover_count: number; source_type: 'subscription' | 'one_time' | 'addon' | 'api' | 'rollover'; updated_at: string; expires_at?: string; metadata?: object; parent_grant_id?: string; source_id?: string; }`\n  Response for a credit grant\n\n  - `id: string`\n  - `created_at: string`\n  - `credit_entitlement_id: string`\n  - `customer_id: string`\n  - `initial_amount: string`\n  - `is_expired: boolean`\n  - `is_rolled_over: boolean`\n  - `remaining_amount: string`\n  - `rollover_count: number`\n  - `source_type: 'subscription' | 'one_time' | 'addon' | 'api' | 'rollover'`\n  - `updated_at: string`\n  - `expires_at?: string`\n  - `metadata?: object`\n  - `parent_grant_id?: string`\n  - `source_id?: string`\n\n### Example\n\n```typescript\nimport DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments();\n\n// Automatically fetches more pages as needed.\nfor await (const balanceListGrantsResponse of client.creditEntitlements.balances.listGrants('customer_id', { credit_entitlement_id: 'credit_entitlement_id' })) {\n  console.log(balanceListGrantsResponse);\n}\n```",
    perLanguage: {
      cli: {
        method: 'balances list_grants',
        example:
          "dodo-payments-cli credit-entitlements:balances list-grants \\\n  --bearer-token 'My Bearer Token' \\\n  --credit-entitlement-id credit_entitlement_id \\\n  --customer-id customer_id",
      },
      csharp: {
        method: 'CreditEntitlements.Balances.ListGrants',
        example:
          'BalanceListGrantsParams parameters = new()\n{\n    CreditEntitlementID = "credit_entitlement_id",\n    CustomerID = "customer_id",\n};\n\nvar page = await client.CreditEntitlements.Balances.ListGrants(parameters);\nawait foreach (var item in page.Paginate())\n{\n    Console.WriteLine(item);\n}',
      },
      go: {
        method: 'client.CreditEntitlements.Balances.ListGrants',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/dodopayments/dodopayments-go"\n\t"github.com/dodopayments/dodopayments-go/option"\n)\n\nfunc main() {\n\tclient := dodopayments.NewClient(\n\t\toption.WithBearerToken("My Bearer Token"),\n\t)\n\tpage, err := client.CreditEntitlements.Balances.ListGrants(\n\t\tcontext.TODO(),\n\t\t"credit_entitlement_id",\n\t\t"customer_id",\n\t\tdodopayments.CreditEntitlementBalanceListGrantsParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", page)\n}\n',
      },
      http: {
        example:
          'curl https://live.dodopayments.com/credit-entitlements/$CREDIT_ENTITLEMENT_ID/balances/$CUSTOMER_ID/grants \\\n    -H "Authorization: Bearer $DODO_PAYMENTS_API_KEY"',
      },
      java: {
        method: 'creditEntitlements().balances().listGrants',
        example:
          'package com.dodopayments.api.example;\n\nimport com.dodopayments.api.client.DodoPaymentsClient;\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient;\nimport com.dodopayments.api.models.creditentitlements.balances.BalanceListGrantsPage;\nimport com.dodopayments.api.models.creditentitlements.balances.BalanceListGrantsParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        DodoPaymentsClient client = DodoPaymentsOkHttpClient.fromEnv();\n\n        BalanceListGrantsParams params = BalanceListGrantsParams.builder()\n            .creditEntitlementId("credit_entitlement_id")\n            .customerId("customer_id")\n            .build();\n        BalanceListGrantsPage page = client.creditEntitlements().balances().listGrants(params);\n    }\n}',
      },
      kotlin: {
        method: 'creditEntitlements().balances().listGrants',
        example:
          'package com.dodopayments.api.example\n\nimport com.dodopayments.api.client.DodoPaymentsClient\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient\nimport com.dodopayments.api.models.creditentitlements.balances.BalanceListGrantsPage\nimport com.dodopayments.api.models.creditentitlements.balances.BalanceListGrantsParams\n\nfun main() {\n    val client: DodoPaymentsClient = DodoPaymentsOkHttpClient.fromEnv()\n\n    val params: BalanceListGrantsParams = BalanceListGrantsParams.builder()\n        .creditEntitlementId("credit_entitlement_id")\n        .customerId("customer_id")\n        .build()\n    val page: BalanceListGrantsPage = client.creditEntitlements().balances().listGrants(params)\n}',
      },
      php: {
        method: 'creditEntitlements->balances->listGrants',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(bearerToken: 'My Bearer Token', environment: 'test_mode');\n\n$page = $client->creditEntitlements->balances->listGrants(\n  'customer_id',\n  creditEntitlementID: 'credit_entitlement_id',\n  pageNumber: 0,\n  pageSize: 0,\n  status: 'active',\n);\n\nvar_dump($page);",
      },
      python: {
        method: 'credit_entitlements.balances.list_grants',
        example:
          'import os\nfrom dodopayments import DodoPayments\n\nclient = DodoPayments(\n    bearer_token=os.environ.get("DODO_PAYMENTS_API_KEY"),  # This is the default and can be omitted\n)\npage = client.credit_entitlements.balances.list_grants(\n    customer_id="customer_id",\n    credit_entitlement_id="credit_entitlement_id",\n)\npage = page.items[0]\nprint(page.id)',
      },
      ruby: {
        method: 'credit_entitlements.balances.list_grants',
        example:
          'require "dodopayments"\n\ndodo_payments = Dodopayments::Client.new(\n  bearer_token: "My Bearer Token",\n  environment: "test_mode" # defaults to "live_mode"\n)\n\npage = dodo_payments.credit_entitlements.balances.list_grants(\n  "customer_id",\n  credit_entitlement_id: "credit_entitlement_id"\n)\n\nputs(page)',
      },
      typescript: {
        method: 'client.creditEntitlements.balances.listGrants',
        example:
          "import DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments({\n  bearerToken: process.env['DODO_PAYMENTS_API_KEY'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const balanceListGrantsResponse of client.creditEntitlements.balances.listGrants(\n  'customer_id',\n  { credit_entitlement_id: 'credit_entitlement_id' },\n)) {\n  console.log(balanceListGrantsResponse.id);\n}",
      },
    },
  },
  {
    name: 'list_ledger',
    endpoint: '/credit-entitlements/{credit_entitlement_id}/balances/{customer_id}/ledger',
    httpMethod: 'get',
    summary: 'Lists ledger entries for a customer under a specific credit entitlement.',
    description:
      'Returns a paginated list of credit transaction history with optional filtering.\n\n# Authentication\nRequires an API key with `Viewer` role or higher.\n\n# Path Parameters\n- `credit_entitlement_id` - The unique identifier of the credit entitlement\n- `customer_id` - The unique identifier of the customer\n\n# Query Parameters\n- `page_size` - Number of items per page (default: 10, max: 100)\n- `page_number` - Zero-based page number (default: 0)\n- `transaction_type` - Filter by transaction type\n- `start_date` - Filter entries from this date\n- `end_date` - Filter entries until this date\n\n# Responses\n- `200 OK` - Returns list of ledger entries\n- `404 Not Found` - Credit entitlement not found\n- `500 Internal Server Error` - Database or server error',
    stainlessPath: '(resource) credit_entitlements.balances > (method) list_ledger',
    qualified: 'client.creditEntitlements.balances.listLedger',
    params: [
      'credit_entitlement_id: string;',
      'customer_id: string;',
      'end_date?: string;',
      'page_number?: number;',
      'page_size?: number;',
      'start_date?: string;',
      'transaction_type?: string;',
    ],
    response:
      '{ id: string; amount: string; balance_after: string; balance_before: string; business_id: string; created_at: string; credit_entitlement_id: string; customer_id: string; is_credit: boolean; overage_after: string; overage_before: string; transaction_type: string; description?: string; grant_id?: string; reference_id?: string; reference_type?: string; }',
    markdown:
      "## list_ledger\n\n`client.creditEntitlements.balances.listLedger(credit_entitlement_id: string, customer_id: string, end_date?: string, page_number?: number, page_size?: number, start_date?: string, transaction_type?: string): { id: string; amount: string; balance_after: string; balance_before: string; business_id: string; created_at: string; credit_entitlement_id: string; customer_id: string; is_credit: boolean; overage_after: string; overage_before: string; transaction_type: string; description?: string; grant_id?: string; reference_id?: string; reference_type?: string; }`\n\n**get** `/credit-entitlements/{credit_entitlement_id}/balances/{customer_id}/ledger`\n\nReturns a paginated list of credit transaction history with optional filtering.\n\n# Authentication\nRequires an API key with `Viewer` role or higher.\n\n# Path Parameters\n- `credit_entitlement_id` - The unique identifier of the credit entitlement\n- `customer_id` - The unique identifier of the customer\n\n# Query Parameters\n- `page_size` - Number of items per page (default: 10, max: 100)\n- `page_number` - Zero-based page number (default: 0)\n- `transaction_type` - Filter by transaction type\n- `start_date` - Filter entries from this date\n- `end_date` - Filter entries until this date\n\n# Responses\n- `200 OK` - Returns list of ledger entries\n- `404 Not Found` - Credit entitlement not found\n- `500 Internal Server Error` - Database or server error\n\n### Parameters\n\n- `credit_entitlement_id: string`\n\n- `customer_id: string`\n\n- `end_date?: string`\n  Filter by end date\n\n- `page_number?: number`\n  Page number default is 0\n\n- `page_size?: number`\n  Page size default is 10 max is 100\n\n- `start_date?: string`\n  Filter by start date\n\n- `transaction_type?: string`\n  Filter by transaction type (snake_case: credit_added, credit_deducted, credit_expired, etc.)\n\n### Returns\n\n- `{ id: string; amount: string; balance_after: string; balance_before: string; business_id: string; created_at: string; credit_entitlement_id: string; customer_id: string; is_credit: boolean; overage_after: string; overage_before: string; transaction_type: string; description?: string; grant_id?: string; reference_id?: string; reference_type?: string; }`\n  Response for a ledger entry\n\n  - `id: string`\n  - `amount: string`\n  - `balance_after: string`\n  - `balance_before: string`\n  - `business_id: string`\n  - `created_at: string`\n  - `credit_entitlement_id: string`\n  - `customer_id: string`\n  - `is_credit: boolean`\n  - `overage_after: string`\n  - `overage_before: string`\n  - `transaction_type: string`\n  - `description?: string`\n  - `grant_id?: string`\n  - `reference_id?: string`\n  - `reference_type?: string`\n\n### Example\n\n```typescript\nimport DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments();\n\n// Automatically fetches more pages as needed.\nfor await (const creditLedgerEntry of client.creditEntitlements.balances.listLedger('customer_id', { credit_entitlement_id: 'credit_entitlement_id' })) {\n  console.log(creditLedgerEntry);\n}\n```",
    perLanguage: {
      cli: {
        method: 'balances list_ledger',
        example:
          "dodo-payments-cli credit-entitlements:balances list-ledger \\\n  --bearer-token 'My Bearer Token' \\\n  --credit-entitlement-id credit_entitlement_id \\\n  --customer-id customer_id",
      },
      csharp: {
        method: 'CreditEntitlements.Balances.ListLedger',
        example:
          'BalanceListLedgerParams parameters = new()\n{\n    CreditEntitlementID = "credit_entitlement_id",\n    CustomerID = "customer_id",\n};\n\nvar page = await client.CreditEntitlements.Balances.ListLedger(parameters);\nawait foreach (var item in page.Paginate())\n{\n    Console.WriteLine(item);\n}',
      },
      go: {
        method: 'client.CreditEntitlements.Balances.ListLedger',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/dodopayments/dodopayments-go"\n\t"github.com/dodopayments/dodopayments-go/option"\n)\n\nfunc main() {\n\tclient := dodopayments.NewClient(\n\t\toption.WithBearerToken("My Bearer Token"),\n\t)\n\tpage, err := client.CreditEntitlements.Balances.ListLedger(\n\t\tcontext.TODO(),\n\t\t"credit_entitlement_id",\n\t\t"customer_id",\n\t\tdodopayments.CreditEntitlementBalanceListLedgerParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", page)\n}\n',
      },
      http: {
        example:
          'curl https://live.dodopayments.com/credit-entitlements/$CREDIT_ENTITLEMENT_ID/balances/$CUSTOMER_ID/ledger \\\n    -H "Authorization: Bearer $DODO_PAYMENTS_API_KEY"',
      },
      java: {
        method: 'creditEntitlements().balances().listLedger',
        example:
          'package com.dodopayments.api.example;\n\nimport com.dodopayments.api.client.DodoPaymentsClient;\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient;\nimport com.dodopayments.api.models.creditentitlements.balances.BalanceListLedgerPage;\nimport com.dodopayments.api.models.creditentitlements.balances.BalanceListLedgerParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        DodoPaymentsClient client = DodoPaymentsOkHttpClient.fromEnv();\n\n        BalanceListLedgerParams params = BalanceListLedgerParams.builder()\n            .creditEntitlementId("credit_entitlement_id")\n            .customerId("customer_id")\n            .build();\n        BalanceListLedgerPage page = client.creditEntitlements().balances().listLedger(params);\n    }\n}',
      },
      kotlin: {
        method: 'creditEntitlements().balances().listLedger',
        example:
          'package com.dodopayments.api.example\n\nimport com.dodopayments.api.client.DodoPaymentsClient\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient\nimport com.dodopayments.api.models.creditentitlements.balances.BalanceListLedgerPage\nimport com.dodopayments.api.models.creditentitlements.balances.BalanceListLedgerParams\n\nfun main() {\n    val client: DodoPaymentsClient = DodoPaymentsOkHttpClient.fromEnv()\n\n    val params: BalanceListLedgerParams = BalanceListLedgerParams.builder()\n        .creditEntitlementId("credit_entitlement_id")\n        .customerId("customer_id")\n        .build()\n    val page: BalanceListLedgerPage = client.creditEntitlements().balances().listLedger(params)\n}',
      },
      php: {
        method: 'creditEntitlements->balances->listLedger',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(bearerToken: 'My Bearer Token', environment: 'test_mode');\n\n$page = $client->creditEntitlements->balances->listLedger(\n  'customer_id',\n  creditEntitlementID: 'credit_entitlement_id',\n  endDate: new \\DateTimeImmutable('2019-12-27T18:11:19.117Z'),\n  pageNumber: 0,\n  pageSize: 0,\n  startDate: new \\DateTimeImmutable('2019-12-27T18:11:19.117Z'),\n  transactionType: 'transaction_type',\n);\n\nvar_dump($page);",
      },
      python: {
        method: 'credit_entitlements.balances.list_ledger',
        example:
          'import os\nfrom dodopayments import DodoPayments\n\nclient = DodoPayments(\n    bearer_token=os.environ.get("DODO_PAYMENTS_API_KEY"),  # This is the default and can be omitted\n)\npage = client.credit_entitlements.balances.list_ledger(\n    customer_id="customer_id",\n    credit_entitlement_id="credit_entitlement_id",\n)\npage = page.items[0]\nprint(page.id)',
      },
      ruby: {
        method: 'credit_entitlements.balances.list_ledger',
        example:
          'require "dodopayments"\n\ndodo_payments = Dodopayments::Client.new(\n  bearer_token: "My Bearer Token",\n  environment: "test_mode" # defaults to "live_mode"\n)\n\npage = dodo_payments.credit_entitlements.balances.list_ledger(\n  "customer_id",\n  credit_entitlement_id: "credit_entitlement_id"\n)\n\nputs(page)',
      },
      typescript: {
        method: 'client.creditEntitlements.balances.listLedger',
        example:
          "import DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments({\n  bearerToken: process.env['DODO_PAYMENTS_API_KEY'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const creditLedgerEntry of client.creditEntitlements.balances.listLedger('customer_id', {\n  credit_entitlement_id: 'credit_entitlement_id',\n})) {\n  console.log(creditLedgerEntry.id);\n}",
      },
    },
  },
  {
    name: 'create_ledger_entry',
    endpoint: '/credit-entitlements/{credit_entitlement_id}/balances/{customer_id}/ledger-entries',
    httpMethod: 'post',
    summary: "Creates a ledger entry to credit or debit a customer's balance.",
    description:
      'For credit entries, a new grant is created. For debit entries, credits are\ndeducted from existing grants using FIFO (oldest first).\n\n# Authentication\nRequires an API key with `Editor` role.\n\n# Path Parameters\n- `credit_entitlement_id` - The unique identifier of the credit entitlement\n- `customer_id` - The unique identifier of the customer\n\n# Request Body\n- `entry_type` - "credit" or "debit"\n- `amount` - Amount to credit or debit\n- `reason` - Optional human-readable reason\n- `expires_at` - Optional expiration for credited amount (only for credit type)\n- `idempotency_key` - Optional key to prevent duplicate entries\n\n# Responses\n- `201 Created` - Ledger entry created successfully\n- `400 Bad Request` - Invalid request (e.g., debit with insufficient balance)\n- `404 Not Found` - Credit entitlement or customer not found\n- `409 Conflict` - Idempotency key already exists\n- `500 Internal Server Error` - Database or server error',
    stainlessPath: '(resource) credit_entitlements.balances > (method) create_ledger_entry',
    qualified: 'client.creditEntitlements.balances.createLedgerEntry',
    params: [
      'credit_entitlement_id: string;',
      'customer_id: string;',
      'amount: string;',
      "entry_type: 'credit' | 'debit';",
      'expires_at?: string;',
      'idempotency_key?: string;',
      'metadata?: object;',
      'reason?: string;',
    ],
    response:
      "{ id: string; amount: string; balance_after: string; balance_before: string; created_at: string; credit_entitlement_id: string; customer_id: string; entry_type: 'credit' | 'debit'; is_credit: boolean; overage_after: string; overage_before: string; grant_id?: string; reason?: string; }",
    markdown:
      "## create_ledger_entry\n\n`client.creditEntitlements.balances.createLedgerEntry(credit_entitlement_id: string, customer_id: string, amount: string, entry_type: 'credit' | 'debit', expires_at?: string, idempotency_key?: string, metadata?: object, reason?: string): { id: string; amount: string; balance_after: string; balance_before: string; created_at: string; credit_entitlement_id: string; customer_id: string; entry_type: ledger_entry_type; is_credit: boolean; overage_after: string; overage_before: string; grant_id?: string; reason?: string; }`\n\n**post** `/credit-entitlements/{credit_entitlement_id}/balances/{customer_id}/ledger-entries`\n\nFor credit entries, a new grant is created. For debit entries, credits are\ndeducted from existing grants using FIFO (oldest first).\n\n# Authentication\nRequires an API key with `Editor` role.\n\n# Path Parameters\n- `credit_entitlement_id` - The unique identifier of the credit entitlement\n- `customer_id` - The unique identifier of the customer\n\n# Request Body\n- `entry_type` - \"credit\" or \"debit\"\n- `amount` - Amount to credit or debit\n- `reason` - Optional human-readable reason\n- `expires_at` - Optional expiration for credited amount (only for credit type)\n- `idempotency_key` - Optional key to prevent duplicate entries\n\n# Responses\n- `201 Created` - Ledger entry created successfully\n- `400 Bad Request` - Invalid request (e.g., debit with insufficient balance)\n- `404 Not Found` - Credit entitlement or customer not found\n- `409 Conflict` - Idempotency key already exists\n- `500 Internal Server Error` - Database or server error\n\n### Parameters\n\n- `credit_entitlement_id: string`\n\n- `customer_id: string`\n\n- `amount: string`\n  Amount to credit or debit\n\n- `entry_type: 'credit' | 'debit'`\n  Entry type: credit or debit\n\n- `expires_at?: string`\n  Expiration for credited amount (only for credit type)\n\n- `idempotency_key?: string`\n  Idempotency key to prevent duplicate entries\n\n- `metadata?: object`\n  Optional metadata (max 50 key-value pairs, key max 40 chars, value max 500 chars)\n\n- `reason?: string`\n  Human-readable reason for the entry\n\n### Returns\n\n- `{ id: string; amount: string; balance_after: string; balance_before: string; created_at: string; credit_entitlement_id: string; customer_id: string; entry_type: 'credit' | 'debit'; is_credit: boolean; overage_after: string; overage_before: string; grant_id?: string; reason?: string; }`\n  Response for creating a ledger entry\n\n  - `id: string`\n  - `amount: string`\n  - `balance_after: string`\n  - `balance_before: string`\n  - `created_at: string`\n  - `credit_entitlement_id: string`\n  - `customer_id: string`\n  - `entry_type: 'credit' | 'debit'`\n  - `is_credit: boolean`\n  - `overage_after: string`\n  - `overage_before: string`\n  - `grant_id?: string`\n  - `reason?: string`\n\n### Example\n\n```typescript\nimport DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments();\n\nconst response = await client.creditEntitlements.balances.createLedgerEntry('customer_id', {\n  credit_entitlement_id: 'credit_entitlement_id',\n  amount: 'amount',\n  entry_type: 'credit',\n});\n\nconsole.log(response);\n```",
    perLanguage: {
      cli: {
        method: 'balances create_ledger_entry',
        example:
          "dodo-payments-cli credit-entitlements:balances create-ledger-entry \\\n  --bearer-token 'My Bearer Token' \\\n  --credit-entitlement-id credit_entitlement_id \\\n  --customer-id customer_id \\\n  --amount amount \\\n  --entry-type credit",
      },
      csharp: {
        method: 'CreditEntitlements.Balances.CreateLedgerEntry',
        example:
          'BalanceCreateLedgerEntryParams parameters = new()\n{\n    CreditEntitlementID = "credit_entitlement_id",\n    CustomerID = "customer_id",\n    Amount = "amount",\n    EntryType = LedgerEntryType.Credit,\n};\n\nvar response = await client.CreditEntitlements.Balances.CreateLedgerEntry(parameters);\n\nConsole.WriteLine(response);',
      },
      go: {
        method: 'client.CreditEntitlements.Balances.NewLedgerEntry',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/dodopayments/dodopayments-go"\n\t"github.com/dodopayments/dodopayments-go/option"\n)\n\nfunc main() {\n\tclient := dodopayments.NewClient(\n\t\toption.WithBearerToken("My Bearer Token"),\n\t)\n\tresponse, err := client.CreditEntitlements.Balances.NewLedgerEntry(\n\t\tcontext.TODO(),\n\t\t"credit_entitlement_id",\n\t\t"customer_id",\n\t\tdodopayments.CreditEntitlementBalanceNewLedgerEntryParams{\n\t\t\tAmount:    dodopayments.F("amount"),\n\t\t\tEntryType: dodopayments.F(dodopayments.LedgerEntryTypeCredit),\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.ID)\n}\n',
      },
      http: {
        example:
          'curl https://live.dodopayments.com/credit-entitlements/$CREDIT_ENTITLEMENT_ID/balances/$CUSTOMER_ID/ledger-entries \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $DODO_PAYMENTS_API_KEY" \\\n    -d \'{\n          "amount": "amount",\n          "entry_type": "credit"\n        }\'',
      },
      java: {
        method: 'creditEntitlements().balances().createLedgerEntry',
        example:
          'package com.dodopayments.api.example;\n\nimport com.dodopayments.api.client.DodoPaymentsClient;\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient;\nimport com.dodopayments.api.models.creditentitlements.balances.BalanceCreateLedgerEntryParams;\nimport com.dodopayments.api.models.creditentitlements.balances.BalanceCreateLedgerEntryResponse;\nimport com.dodopayments.api.models.creditentitlements.balances.LedgerEntryType;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        DodoPaymentsClient client = DodoPaymentsOkHttpClient.fromEnv();\n\n        BalanceCreateLedgerEntryParams params = BalanceCreateLedgerEntryParams.builder()\n            .creditEntitlementId("credit_entitlement_id")\n            .customerId("customer_id")\n            .amount("amount")\n            .entryType(LedgerEntryType.CREDIT)\n            .build();\n        BalanceCreateLedgerEntryResponse response = client.creditEntitlements().balances().createLedgerEntry(params);\n    }\n}',
      },
      kotlin: {
        method: 'creditEntitlements().balances().createLedgerEntry',
        example:
          'package com.dodopayments.api.example\n\nimport com.dodopayments.api.client.DodoPaymentsClient\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient\nimport com.dodopayments.api.models.creditentitlements.balances.BalanceCreateLedgerEntryParams\nimport com.dodopayments.api.models.creditentitlements.balances.BalanceCreateLedgerEntryResponse\nimport com.dodopayments.api.models.creditentitlements.balances.LedgerEntryType\n\nfun main() {\n    val client: DodoPaymentsClient = DodoPaymentsOkHttpClient.fromEnv()\n\n    val params: BalanceCreateLedgerEntryParams = BalanceCreateLedgerEntryParams.builder()\n        .creditEntitlementId("credit_entitlement_id")\n        .customerId("customer_id")\n        .amount("amount")\n        .entryType(LedgerEntryType.CREDIT)\n        .build()\n    val response: BalanceCreateLedgerEntryResponse = client.creditEntitlements().balances().createLedgerEntry(params)\n}',
      },
      php: {
        method: 'creditEntitlements->balances->createLedgerEntry',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(bearerToken: 'My Bearer Token', environment: 'test_mode');\n\n$response = $client->creditEntitlements->balances->createLedgerEntry(\n  'customer_id',\n  creditEntitlementID: 'credit_entitlement_id',\n  amount: 'amount',\n  entryType: LedgerEntryType::CREDIT,\n  expiresAt: new \\DateTimeImmutable('2019-12-27T18:11:19.117Z'),\n  idempotencyKey: 'idempotency_key',\n  metadata: ['foo' => 'string'],\n  reason: 'reason',\n);\n\nvar_dump($response);",
      },
      python: {
        method: 'credit_entitlements.balances.create_ledger_entry',
        example:
          'import os\nfrom dodopayments import DodoPayments\n\nclient = DodoPayments(\n    bearer_token=os.environ.get("DODO_PAYMENTS_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.credit_entitlements.balances.create_ledger_entry(\n    customer_id="customer_id",\n    credit_entitlement_id="credit_entitlement_id",\n    amount="amount",\n    entry_type="credit",\n)\nprint(response.id)',
      },
      ruby: {
        method: 'credit_entitlements.balances.create_ledger_entry',
        example:
          'require "dodopayments"\n\ndodo_payments = Dodopayments::Client.new(\n  bearer_token: "My Bearer Token",\n  environment: "test_mode" # defaults to "live_mode"\n)\n\nresponse = dodo_payments.credit_entitlements.balances.create_ledger_entry(\n  "customer_id",\n  credit_entitlement_id: "credit_entitlement_id",\n  amount: "amount",\n  entry_type: :credit\n)\n\nputs(response)',
      },
      typescript: {
        method: 'client.creditEntitlements.balances.createLedgerEntry',
        example:
          "import DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments({\n  bearerToken: process.env['DODO_PAYMENTS_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.creditEntitlements.balances.createLedgerEntry('customer_id', {\n  credit_entitlement_id: 'credit_entitlement_id',\n  amount: 'amount',\n  entry_type: 'credit',\n});\n\nconsole.log(response.id);",
      },
    },
  },
];

const EMBEDDED_READMES: { language: string; content: string }[] = [
  {
    language: 'cli',
    content:
      "# Dodo Payments CLI\n\nThe official CLI for the [Dodo Payments REST API](https://docs.dodopayments.com/api-reference/introduction).\n\nIt is generated with [Stainless](https://www.stainless.com/).\n\n## Installation\n\n### Installing with Go\n\nTo test or install the CLI locally, you need [Go](https://go.dev/doc/install) version 1.22 or later installed.\n\n~~~sh\ngo install 'github.com/stainless-sdks/dodo-payments-cli/cmd/dodo-payments-cli@latest'\n~~~\n\nOnce you have run `go install`, the binary is placed in your Go bin directory:\n\n- **Default location**: `$HOME/go/bin` (or `$GOPATH/bin` if GOPATH is set)\n- **Check your path**: Run `go env GOPATH` to see the base directory\n\nIf commands aren't found after installation, add the Go bin directory to your PATH:\n\n~~~sh\n# Add to your shell profile (.zshrc, .bashrc, etc.)\nexport PATH=\"$PATH:$(go env GOPATH)/bin\"\n~~~\n\n### Running Locally\n\nAfter cloning the git repository for this project, you can use the\n`scripts/run` script to run the tool locally:\n\n~~~sh\n./scripts/run args...\n~~~\n\n## Usage\n\nThe CLI follows a resource-based command structure:\n\n~~~sh\ndodo-payments-cli [resource] <command> [flags...]\n~~~\n\n~~~sh\ndodo-payments-cli checkout-sessions create \\\n  --bearer-token 'My Bearer Token' \\\n  --product-cart '{product_id: product_id, quantity: 0}'\n~~~\n\nFor details about specific commands, use the `--help` flag.\n\n### Environment variables\n\n| Environment variable        | Description                         | Required | Default value |\n| --------------------------- | ----------------------------------- | -------- | ------------- |\n| `DODO_PAYMENTS_API_KEY`     | Bearer Token for API authentication | yes      |               |\n| `DODO_PAYMENTS_WEBHOOK_KEY` |                                     | no       | `null`        |\n\n### Global flags\n\n- `--bearer-token` - Bearer Token for API authentication (can also be set with `DODO_PAYMENTS_API_KEY` env var)\n- `--webhook-key` (can also be set with `DODO_PAYMENTS_WEBHOOK_KEY` env var)\n- `--help` - Show command line usage\n- `--debug` - Enable debug logging (includes HTTP request/response details)\n- `--version`, `-v` - Show the CLI version\n- `--base-url` - Use a custom API backend URL\n- `--format` - Change the output format (`auto`, `explore`, `json`, `jsonl`, `pretty`, `raw`, `yaml`)\n- `--format-error` - Change the output format for errors (`auto`, `explore`, `json`, `jsonl`, `pretty`, `raw`, `yaml`)\n- `--transform` - Transform the data output using [GJSON syntax](https://github.com/tidwall/gjson/blob/master/SYNTAX.md)\n- `--transform-error` - Transform the error output using [GJSON syntax](https://github.com/tidwall/gjson/blob/master/SYNTAX.md)\n\n### Passing files as arguments\n\nTo pass files to your API, you can use the `@myfile.ext` syntax:\n\n~~~bash\ndodo-payments-cli <command> --arg @abe.jpg\n~~~\n\nFiles can also be passed inside JSON or YAML blobs:\n\n~~~bash\ndodo-payments-cli <command> --arg '{image: \"@abe.jpg\"}'\n# Equivalent:\ndodo-payments-cli <command> <<YAML\narg:\n  image: \"@abe.jpg\"\nYAML\n~~~\n\nIf you need to pass a string literal that begins with an `@` sign, you can\nescape the `@` sign to avoid accidentally passing a file.\n\n~~~bash\ndodo-payments-cli <command> --username '\\@abe'\n~~~\n\n#### Explicit encoding\n\nFor JSON endpoints, the CLI tool does filetype sniffing to determine whether the\nfile contents should be sent as a string literal (for plain text files) or as a\nbase64-encoded string literal (for binary files). If you need to explicitly send\nthe file as either plain text or base64-encoded data, you can use\n`@file://myfile.txt` (for string encoding) or `@data://myfile.dat` (for\nbase64-encoding). Note that absolute paths will begin with `@file://` or\n`@data://`, followed by a third `/` (for example, `@file:///tmp/file.txt`).\n\n~~~bash\ndodo-payments-cli <command> --arg @data://file.txt\n~~~\n\n## Linking different Go SDK versions\n\nYou can link the CLI against a different version of the Dodo Payments Go SDK\nfor development purposes using the `./scripts/link` script.\n\nTo link to a specific version from a repository (version can be a branch,\ngit tag, or commit hash):\n\n~~~bash\n./scripts/link github.com/org/repo@version\n~~~\n\nTo link to a local copy of the SDK:\n\n~~~bash\n./scripts/link ../path/to/dodopayments-go\n~~~\n\nIf you run the link script without any arguments, it will default to `../dodopayments-go`.\n",
  },
  {
    language: 'csharp',
    content:
      '# Dodo Payments C# API Library\n\nThe Dodo Payments C# SDK provides convenient access to the [Dodo Payments REST API](https://docs.dodopayments.com/api-reference/introduction) from applications written in   C#.\n\n## Installation\n\nInstall the package from [NuGet](https://www.nuget.org/packages/DodoPayments.Client):\n\n```bash\ndotnet add package DodoPayments.Client\n```\n\n## Requirements\n\nThis library requires .NET Standard 2.0 or later.\n\n## Usage\n\nSee the [`examples`](examples) directory for complete and runnable examples.\n\n```csharp\nDodoPaymentsClient client = new();\n\nCheckoutSessionCreateParams parameters = new()\n{\n    ProductCart =\n    [\n        new()\n        {\n            ProductID = "product_id",\n            Quantity = 0,\n        },\n    ],\n};\n\nvar checkoutSessionResponse = await client.CheckoutSessions.Create(parameters);\n\nConsole.WriteLine(checkoutSessionResponse);\n```',
  },
  {
    language: 'go',
    content:
      '# Dodo Payments Go API Library\n\n<a href="https://pkg.go.dev/github.com/dodopayments/dodopayments-go"><img src="https://pkg.go.dev/badge/github.com/dodopayments/dodopayments-go.svg" alt="Go Reference"></a>\n\nThe Dodo Payments Go library provides convenient access to the [Dodo Payments REST API](https://docs.dodopayments.com/api-reference/introduction)\nfrom applications written in Go.\n\nIt is generated with [Stainless](https://www.stainless.com/).\n\n## MCP Server\n\nUse the Dodo Payments MCP Server to enable AI assistants to interact with this API, allowing them to explore endpoints, make test requests, and use documentation to help integrate this SDK into your application.\n\n[![Add to Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/en-US/install-mcp?name=dodopayments-mcp&config=eyJjb21tYW5kIjoibnB4IiwiYXJncyI6WyIteSIsImRvZG9wYXltZW50cy1tY3AiXSwiZW52Ijp7IkRPRE9fUEFZTUVOVFNfQVBJX0tFWSI6Ik15IEJlYXJlciBUb2tlbiIsIkRPRE9fUEFZTUVOVFNfV0VCSE9PS19LRVkiOiJNeSBXZWJob29rIEtleSJ9fQ)\n[![Install in VS Code](https://img.shields.io/badge/_-Add_to_VS_Code-blue?style=for-the-badge&logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCA0MCA0MCI+PHBhdGggZmlsbD0iI0VFRSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMzAuMjM1IDM5Ljg4NGEyLjQ5MSAyLjQ5MSAwIDAgMS0xLjc4MS0uNzNMMTIuNyAyNC43OGwtMy40NiAyLjYyNC0zLjQwNiAyLjU4MmExLjY2NSAxLjY2NSAwIDAgMS0xLjA4Mi4zMzggMS42NjQgMS42NjQgMCAwIDEtMS4wNDYtLjQzMWwtMi4yLTJhMS42NjYgMS42NjYgMCAwIDEgMC0yLjQ2M0w3LjQ1OCAyMCA0LjY3IDE3LjQ1MyAxLjUwNyAxNC41N2ExLjY2NSAxLjY2NSAwIDAgMSAwLTIuNDYzbDIuMi0yYTEuNjY1IDEuNjY1IDAgMCAxIDIuMTMtLjA5N2w2Ljg2MyA1LjIwOUwyOC40NTIuODQ0YTIuNDg4IDIuNDg4IDAgMCAxIDEuODQxLS43MjljLjM1MS4wMDkuNjk5LjA5MSAxLjAxOS4yNDVsOC4yMzYgMy45NjFhMi41IDIuNSAwIDAgMSAxLjQxNSAyLjI1M3YuMDk5LS4wNDVWMzMuMzd2LS4wNDUuMDk1YTIuNTAxIDIuNTAxIDAgMCAxLTEuNDE2IDIuMjU3bC04LjIzNSAzLjk2MWEyLjQ5MiAyLjQ5MiAwIDAgMS0xLjA3Ny4yNDZabS43MTYtMjguOTQ3LTExLjk0OCA5LjA2MiAxMS45NTIgOS4wNjUtLjAwNC0xOC4xMjdaIi8+PC9zdmc+)](https://vscode.stainless.com/mcp/%7B%22name%22%3A%22dodopayments-mcp%22%2C%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22dodopayments-mcp%22%5D%2C%22env%22%3A%7B%22DODO_PAYMENTS_API_KEY%22%3A%22My%20Bearer%20Token%22%2C%22DODO_PAYMENTS_WEBHOOK_KEY%22%3A%22My%20Webhook%20Key%22%7D%7D)\n\n> Note: You may need to set environment variables in your MCP client.\n\n## Installation\n\n<!-- x-release-please-start-version -->\n\n```go\nimport (\n\t"github.com/dodopayments/dodopayments-go" // imported as SDK_PackageName\n)\n```\n\n<!-- x-release-please-end -->\n\nOr to pin the version:\n\n<!-- x-release-please-start-version -->\n\n```sh\ngo get -u \'github.com/dodopayments/dodopayments-go@v0.0.1\'\n```\n\n<!-- x-release-please-end -->\n\n## Requirements\n\nThis library requires Go 1.22+.\n\n## Usage\n\nThe full API of this library can be found in [api.md](api.md).\n\n```go\npackage main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/dodopayments/dodopayments-go"\n\t"github.com/dodopayments/dodopayments-go/option"\n)\n\nfunc main() {\n\tclient := dodopayments.NewClient(\n\t\toption.WithBearerToken("My Bearer Token"), // defaults to os.LookupEnv("DODO_PAYMENTS_API_KEY")\n\t\toption.WithEnvironmentTestMode(),          // defaults to option.WithEnvironmentLiveMode()\n\t)\n\tcheckoutSessionResponse, err := client.CheckoutSessions.New(context.TODO(), dodopayments.CheckoutSessionNewParams{\n\t\tCheckoutSessionRequest: dodopayments.CheckoutSessionRequestParam{\n\t\t\tProductCart: dodopayments.F([]dodopayments.ProductItemReqParam{{\n\t\t\t\tProductID: dodopayments.F("product_id"),\n\t\t\t\tQuantity:  dodopayments.F(int64(0)),\n\t\t\t}}),\n\t\t},\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", checkoutSessionResponse.SessionID)\n}\n\n```\n\n### Request fields\n\nAll request parameters are wrapped in a generic `Field` type,\nwhich we use to distinguish zero values from null or omitted fields.\n\nThis prevents accidentally sending a zero value if you forget a required parameter,\nand enables explicitly sending `null`, `false`, `\'\'`, or `0` on optional parameters.\nAny field not specified is not sent.\n\nTo construct fields with values, use the helpers `String()`, `Int()`, `Float()`, or most commonly, the generic `F[T]()`.\nTo send a null, use `Null[T]()`, and to send a nonconforming value, use `Raw[T](any)`. For example:\n\n```go\nparams := FooParams{\n\tName: SDK_PackageName.F("hello"),\n\n\t// Explicitly send `"description": null`\n\tDescription: SDK_PackageName.Null[string](),\n\n\tPoint: SDK_PackageName.F(SDK_PackageName.Point{\n\t\tX: SDK_PackageName.Int(0),\n\t\tY: SDK_PackageName.Int(1),\n\n\t\t// In cases where the API specifies a given type,\n\t\t// but you want to send something else, use `Raw`:\n\t\tZ: SDK_PackageName.Raw[int64](0.01), // sends a float\n\t}),\n}\n```\n\n### Response objects\n\nAll fields in response structs are value types (not pointers or wrappers).\n\nIf a given field is `null`, not present, or invalid, the corresponding field\nwill simply be its zero value.\n\nAll response structs also include a special `JSON` field, containing more detailed\ninformation about each property, which you can use like so:\n\n```go\nif res.Name == "" {\n\t// true if `"name"` is either not present or explicitly null\n\tres.JSON.Name.IsNull()\n\n\t// true if the `"name"` key was not present in the response JSON at all\n\tres.JSON.Name.IsMissing()\n\n\t// When the API returns data that cannot be coerced to the expected type:\n\tif res.JSON.Name.IsInvalid() {\n\t\traw := res.JSON.Name.Raw()\n\n\t\tlegacyName := struct{\n\t\t\tFirst string `json:"first"`\n\t\t\tLast  string `json:"last"`\n\t\t}{}\n\t\tjson.Unmarshal([]byte(raw), &legacyName)\n\t\tname = legacyName.First + " " + legacyName.Last\n\t}\n}\n```\n\nThese `.JSON` structs also include an `Extras` map containing\nany properties in the json response that were not specified\nin the struct. This can be useful for API features not yet\npresent in the SDK.\n\n```go\nbody := res.JSON.ExtraFields["my_unexpected_field"].Raw()\n```\n\n### RequestOptions\n\nThis library uses the functional options pattern. Functions defined in the\n`SDK_PackageOptionName` package return a `RequestOption`, which is a closure that mutates a\n`RequestConfig`. These options can be supplied to the client or at individual\nrequests. For example:\n\n```go\nclient := SDK_PackageName.SDK_ClientInitializerName(\n\t// Adds a header to every request made by the client\n\tSDK_PackageOptionName.WithHeader("X-Some-Header", "custom_header_info"),\n)\n\nclient.CheckoutSessions.New(context.TODO(), ...,\n\t// Override the header\n\tSDK_PackageOptionName.WithHeader("X-Some-Header", "some_other_custom_header_info"),\n\t// Add an undocumented field to the request body, using sjson syntax\n\tSDK_PackageOptionName.WithJSONSet("some.json.path", map[string]string{"my": "object"}),\n)\n```\n\nSee the [full list of request options](https://pkg.go.dev/github.com/dodopayments/dodopayments-go/SDK_PackageOptionName).\n\n### Pagination\n\nThis library provides some conveniences for working with paginated list endpoints.\n\nYou can use `.ListAutoPaging()` methods to iterate through items across all pages:\n\n```go\niter := client.Payments.ListAutoPaging(context.TODO(), dodopayments.PaymentListParams{})\n// Automatically fetches more pages as needed.\nfor iter.Next() {\n\tpaymentListResponse := iter.Current()\n\tfmt.Printf("%+v\\n", paymentListResponse)\n}\nif err := iter.Err(); err != nil {\n\tpanic(err.Error())\n}\n```\n\nOr you can use simple `.List()` methods to fetch a single page and receive a standard response object\nwith additional helper methods like `.GetNextPage()`, e.g.:\n\n```go\npage, err := client.Payments.List(context.TODO(), dodopayments.PaymentListParams{})\nfor page != nil {\n\tfor _, payment := range page.Items {\n\t\tfmt.Printf("%+v\\n", payment)\n\t}\n\tpage, err = page.GetNextPage()\n}\nif err != nil {\n\tpanic(err.Error())\n}\n```\n\n### Errors\n\nWhen the API returns a non-success status code, we return an error with type\n`*SDK_PackageName.Error`. This contains the `StatusCode`, `*http.Request`, and\n`*http.Response` values of the request, as well as the JSON of the error body\n(much like other response objects in the SDK).\n\nTo handle errors, we recommend that you use the `errors.As` pattern:\n\n```go\n_, err := client.CheckoutSessions.New(context.TODO(), dodopayments.CheckoutSessionNewParams{\n\tCheckoutSessionRequest: dodopayments.CheckoutSessionRequestParam{\n\t\tProductCart: dodopayments.F([]dodopayments.ProductItemReqParam{{\n\t\t\tProductID: dodopayments.F("product_id"),\n\t\t\tQuantity:  dodopayments.F(int64(0)),\n\t\t}}),\n\t},\n})\nif err != nil {\n\tvar apierr *dodopayments.Error\n\tif errors.As(err, &apierr) {\n\t\tprintln(string(apierr.DumpRequest(true)))  // Prints the serialized HTTP request\n\t\tprintln(string(apierr.DumpResponse(true))) // Prints the serialized HTTP response\n\t}\n\tpanic(err.Error()) // GET "/checkouts": 400 Bad Request { ... }\n}\n```\n\nWhen other errors occur, they are returned unwrapped; for example,\nif HTTP transport fails, you might receive `*url.Error` wrapping `*net.OpError`.\n\n### Timeouts\n\nRequests do not time out by default; use context to configure a timeout for a request lifecycle.\n\nNote that if a request is [retried](#retries), the context timeout does not start over.\nTo set a per-retry timeout, use `SDK_PackageOptionName.WithRequestTimeout()`.\n\n```go\n// This sets the timeout for the request, including all the retries.\nctx, cancel := context.WithTimeout(context.Background(), 5*time.Minute)\ndefer cancel()\nclient.CheckoutSessions.New(\n\tctx,\n\tdodopayments.CheckoutSessionNewParams{\n\t\tCheckoutSessionRequest: dodopayments.CheckoutSessionRequestParam{\n\t\t\tProductCart: dodopayments.F([]dodopayments.ProductItemReqParam{{\n\t\t\t\tProductID: dodopayments.F("product_id"),\n\t\t\t\tQuantity:  dodopayments.F(int64(0)),\n\t\t\t}}),\n\t\t},\n\t},\n\t// This sets the per-retry timeout\n\toption.WithRequestTimeout(20*time.Second),\n)\n```\n\n### File uploads\n\nRequest parameters that correspond to file uploads in multipart requests are typed as\n`param.Field[io.Reader]`. The contents of the `io.Reader` will by default be sent as a multipart form\npart with the file name of "anonymous_file" and content-type of "application/octet-stream".\n\nThe file name and content-type can be customized by implementing `Name() string` or `ContentType()\nstring` on the run-time type of `io.Reader`. Note that `os.File` implements `Name() string`, so a\nfile returned by `os.Open` will be sent with the file name on disk.\n\nWe also provide a helper `SDK_PackageName.FileParam(reader io.Reader, filename string, contentType string)`\nwhich can be used to wrap any `io.Reader` with the appropriate file name and content type.\n\n\n\n### Retries\n\nCertain errors will be automatically retried 2 times by default, with a short exponential backoff.\nWe retry by default all connection errors, 408 Request Timeout, 409 Conflict, 429 Rate Limit,\nand >=500 Internal errors.\n\nYou can use the `WithMaxRetries` option to configure or disable this:\n\n```go\n// Configure the default for all requests:\nclient := dodopayments.NewClient(\n\toption.WithMaxRetries(0), // default is 2\n)\n\n// Override per-request:\nclient.CheckoutSessions.New(\n\tcontext.TODO(),\n\tdodopayments.CheckoutSessionNewParams{\n\t\tCheckoutSessionRequest: dodopayments.CheckoutSessionRequestParam{\n\t\t\tProductCart: dodopayments.F([]dodopayments.ProductItemReqParam{{\n\t\t\t\tProductID: dodopayments.F("product_id"),\n\t\t\t\tQuantity:  dodopayments.F(int64(0)),\n\t\t\t}}),\n\t\t},\n\t},\n\toption.WithMaxRetries(5),\n)\n```\n\n\n### Accessing raw response data (e.g. response headers)\n\nYou can access the raw HTTP response data by using the `option.WithResponseInto()` request option. This is useful when\nyou need to examine response headers, status codes, or other details.\n\n```go\n// Create a variable to store the HTTP response\nvar response *http.Response\ncheckoutSessionResponse, err := client.CheckoutSessions.New(\n\tcontext.TODO(),\n\tdodopayments.CheckoutSessionNewParams{\n\t\tCheckoutSessionRequest: dodopayments.CheckoutSessionRequestParam{\n\t\t\tProductCart: dodopayments.F([]dodopayments.ProductItemReqParam{{\n\t\t\t\tProductID: dodopayments.F("product_id"),\n\t\t\t\tQuantity:  dodopayments.F(int64(0)),\n\t\t\t}}),\n\t\t},\n\t},\n\toption.WithResponseInto(&response),\n)\nif err != nil {\n\t// handle error\n}\nfmt.Printf("%+v\\n", checkoutSessionResponse)\n\nfmt.Printf("Status Code: %d\\n", response.StatusCode)\nfmt.Printf("Headers: %+#v\\n", response.Header)\n```\n\n### Making custom/undocumented requests\n\nThis library is typed for convenient access to the documented API. If you need to access undocumented\nendpoints, params, or response properties, the library can still be used.\n\n#### Undocumented endpoints\n\nTo make requests to undocumented endpoints, you can use `client.Get`, `client.Post`, and other HTTP verbs.\n`RequestOptions` on the client, such as retries, will be respected when making these requests.\n\n```go\nvar (\n    // params can be an io.Reader, a []byte, an encoding/json serializable object,\n    // or a "…Params" struct defined in this library.\n    params map[string]interface{}\n\n    // result can be an []byte, *http.Response, a encoding/json deserializable object,\n    // or a model defined in this library.\n    result *http.Response\n)\nerr := client.Post(context.Background(), "/unspecified", params, &result)\nif err != nil {\n    …\n}\n```\n\n#### Undocumented request params\n\nTo make requests using undocumented parameters, you may use either the `SDK_PackageOptionName.WithQuerySet()`\nor the `SDK_PackageOptionName.WithJSONSet()` methods.\n\n```go\nparams := FooNewParams{\n    ID:   SDK_PackageName.F("id_xxxx"),\n    Data: SDK_PackageName.F(FooNewParamsData{\n        FirstName: SDK_PackageName.F("John"),\n    }),\n}\nclient.Foo.New(context.Background(), params, SDK_PackageOptionName.WithJSONSet("data.last_name", "Doe"))\n```\n\n#### Undocumented response properties\n\nTo access undocumented response properties, you may either access the raw JSON of the response as a string\nwith `result.JSON.RawJSON()`, or get the raw JSON of a particular field on the result with\n`result.JSON.Foo.Raw()`.\n\nAny fields that are not present on the response struct will be saved and can be accessed by `result.JSON.ExtraFields()` which returns the extra fields as a `map[string]Field`.\n\n### Middleware\n\nWe provide `SDK_PackageOptionName.WithMiddleware` which applies the given\nmiddleware to requests.\n\n```go\nfunc Logger(req *http.Request, next SDK_PackageOptionName.MiddlewareNext) (res *http.Response, err error) {\n\t// Before the request\n\tstart := time.Now()\n\tLogReq(req)\n\n\t// Forward the request to the next handler\n\tres, err = next(req)\n\n\t// Handle stuff after the request\n\tend := time.Now()\n\tLogRes(res, err, start - end)\n\n    return res, err\n}\n\nclient := SDK_PackageName.SDK_ClientInitializerName(\n\tSDK_PackageOptionName.WithMiddleware(Logger),\n)\n```\n\nWhen multiple middlewares are provided as variadic arguments, the middlewares\nare applied left to right. If `SDK_PackageOptionName.WithMiddleware` is given\nmultiple times, for example first in the client then the method, the\nmiddleware in the client will run first and the middleware given in the method\nwill run next.\n\nYou may also replace the default `http.Client` with\n`SDK_PackageOptionName.WithHTTPClient(client)`. Only one http client is\naccepted (this overwrites any previous client) and receives requests after any\nmiddleware has been applied.\n\n## Semantic versioning\n\nThis package generally follows [SemVer](https://semver.org/spec/v2.0.0.html) conventions, though certain backwards-incompatible changes may be released as minor versions:\n\n1. Changes to library internals which are technically public but not intended or documented for external use. _(Please open a GitHub issue to let us know if you are relying on such internals.)_\n2. Changes that we do not expect to impact the vast majority of users in practice.\n\nWe take backwards-compatibility seriously and work hard to ensure you can rely on a smooth upgrade experience.\n\nWe are keen for your feedback; please open an [issue](https://www.github.com/dodopayments/dodopayments-go/issues) with questions, bugs, or suggestions.\n\n## Contributing\n\nSee [the contributing documentation](./CONTRIBUTING.md).\n',
  },
  {
    language: 'java',
    content:
      '# Dodo Payments Java API Library\n\n<!-- x-release-please-start-version -->\n[![Maven Central](https://img.shields.io/maven-central/v/com.dodopayments.api/dodo-payments-java)](https://central.sonatype.com/artifact/com.dodopayments.api/dodo-payments-java/0.0.1)\n[![javadoc](https://javadoc.io/badge2/com.dodopayments.api/dodo-payments-java/0.0.1/javadoc.svg)](https://javadoc.io/doc/com.dodopayments.api/dodo-payments-java/0.0.1)\n<!-- x-release-please-end -->\n\nThe Dodo Payments Java SDK provides convenient access to the [Dodo Payments REST API](https://docs.dodopayments.com/api-reference/introduction)   from applications written in Java.\n\nThe Dodo Payments Java SDK is similar to the Dodo Payments Kotlin SDK but with minor differences that       make it more ergonomic for use in Java, such as `Optional` instead of nullable values, `Stream`       instead of `Sequence`, and `CompletableFuture` instead of suspend functions.\n\nIt is generated with [Stainless](https://www.stainless.com/).\n\n## MCP Server\n\nUse the Dodo Payments MCP Server to enable AI assistants to interact with this API, allowing them to explore endpoints, make test requests, and use documentation to help integrate this SDK into your application.\n\n[![Add to Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/en-US/install-mcp?name=dodopayments-mcp&config=eyJjb21tYW5kIjoibnB4IiwiYXJncyI6WyIteSIsImRvZG9wYXltZW50cy1tY3AiXSwiZW52Ijp7IkRPRE9fUEFZTUVOVFNfQVBJX0tFWSI6Ik15IEJlYXJlciBUb2tlbiIsIkRPRE9fUEFZTUVOVFNfV0VCSE9PS19LRVkiOiJNeSBXZWJob29rIEtleSJ9fQ)\n[![Install in VS Code](https://img.shields.io/badge/_-Add_to_VS_Code-blue?style=for-the-badge&logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCA0MCA0MCI+PHBhdGggZmlsbD0iI0VFRSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMzAuMjM1IDM5Ljg4NGEyLjQ5MSAyLjQ5MSAwIDAgMS0xLjc4MS0uNzNMMTIuNyAyNC43OGwtMy40NiAyLjYyNC0zLjQwNiAyLjU4MmExLjY2NSAxLjY2NSAwIDAgMS0xLjA4Mi4zMzggMS42NjQgMS42NjQgMCAwIDEtMS4wNDYtLjQzMWwtMi4yLTJhMS42NjYgMS42NjYgMCAwIDEgMC0yLjQ2M0w3LjQ1OCAyMCA0LjY3IDE3LjQ1MyAxLjUwNyAxNC41N2ExLjY2NSAxLjY2NSAwIDAgMSAwLTIuNDYzbDIuMi0yYTEuNjY1IDEuNjY1IDAgMCAxIDIuMTMtLjA5N2w2Ljg2MyA1LjIwOUwyOC40NTIuODQ0YTIuNDg4IDIuNDg4IDAgMCAxIDEuODQxLS43MjljLjM1MS4wMDkuNjk5LjA5MSAxLjAxOS4yNDVsOC4yMzYgMy45NjFhMi41IDIuNSAwIDAgMSAxLjQxNSAyLjI1M3YuMDk5LS4wNDVWMzMuMzd2LS4wNDUuMDk1YTIuNTAxIDIuNTAxIDAgMCAxLTEuNDE2IDIuMjU3bC04LjIzNSAzLjk2MWEyLjQ5MiAyLjQ5MiAwIDAgMS0xLjA3Ny4yNDZabS43MTYtMjguOTQ3LTExLjk0OCA5LjA2MiAxMS45NTIgOS4wNjUtLjAwNC0xOC4xMjdaIi8+PC9zdmc+)](https://vscode.stainless.com/mcp/%7B%22name%22%3A%22dodopayments-mcp%22%2C%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22dodopayments-mcp%22%5D%2C%22env%22%3A%7B%22DODO_PAYMENTS_API_KEY%22%3A%22My%20Bearer%20Token%22%2C%22DODO_PAYMENTS_WEBHOOK_KEY%22%3A%22My%20Webhook%20Key%22%7D%7D)\n\n> Note: You may need to set environment variables in your MCP client.\n\n<!-- x-release-please-start-version -->\n\nThe REST API documentation can be found on [docs.dodopayments.com](https://docs.dodopayments.com/api-reference/introduction). Javadocs are available on [javadoc.io](https://javadoc.io/doc/com.dodopayments.api/dodo-payments-java/0.0.1).\n\n<!-- x-release-please-end -->\n\n## Installation\n\n<!-- x-release-please-start-version -->\n\n### Gradle\n\n~~~kotlin\nimplementation("com.dodopayments.api:dodo-payments-java:0.0.1")\n~~~\n\n### Maven\n\n~~~xml\n<dependency>\n  <groupId>com.dodopayments.api</groupId>\n  <artifactId>dodo-payments-java</artifactId>\n  <version>0.0.1</version>\n</dependency>\n~~~\n\n<!-- x-release-please-end -->\n\n## Requirements\n\nThis library requires Java 8 or later.\n\n## Usage\n\n```java\nimport com.dodopayments.api.client.DodoPaymentsClient;\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient;\nimport com.dodopayments.api.models.checkoutsessions.CheckoutSessionCreateParams;\nimport com.dodopayments.api.models.checkoutsessions.CheckoutSessionRequest;\nimport com.dodopayments.api.models.checkoutsessions.CheckoutSessionResponse;\nimport com.dodopayments.api.models.checkoutsessions.ProductItemReq;\n\n// Configures using the `dodopayments.apiKey`, `dodopayments.webhookKey` and `dodopayments.baseUrl` system properties\n// Or configures using the `DODO_PAYMENTS_API_KEY`, `DODO_PAYMENTS_WEBHOOK_KEY` and `DODO_PAYMENTS_BASE_URL` environment variables\nDodoPaymentsClient client = DodoPaymentsOkHttpClient.fromEnv();\n\nCheckoutSessionRequest params = CheckoutSessionRequest.builder()\n    .addProductCart(ProductItemReq.builder()\n        .productId("product_id")\n        .quantity(0)\n        .build())\n    .build();\nCheckoutSessionResponse checkoutSessionResponse = client.checkoutSessions().create(params);\n```\n\n## Client configuration\n\nConfigure the client using system properties or environment variables:\n\n```java\nimport com.dodopayments.api.client.DodoPaymentsClient;\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient;\n\n// Configures using the `dodopayments.apiKey`, `dodopayments.webhookKey` and `dodopayments.baseUrl` system properties\n// Or configures using the `DODO_PAYMENTS_API_KEY`, `DODO_PAYMENTS_WEBHOOK_KEY` and `DODO_PAYMENTS_BASE_URL` environment variables\nDodoPaymentsClient client = DodoPaymentsOkHttpClient.fromEnv();\n```\n\nOr manually:\n\n```java\nimport com.dodopayments.api.client.DodoPaymentsClient;\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient;\n\nDodoPaymentsClient client = DodoPaymentsOkHttpClient.builder()\n    .bearerToken("My Bearer Token")\n    .build();\n```\n\nOr using a combination of the two approaches:\n\n```java\nimport com.dodopayments.api.client.DodoPaymentsClient;\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient;\n\nDodoPaymentsClient client = DodoPaymentsOkHttpClient.builder()\n    // Configures using the `dodopayments.apiKey`, `dodopayments.webhookKey` and `dodopayments.baseUrl` system properties\n    // Or configures using the `DODO_PAYMENTS_API_KEY`, `DODO_PAYMENTS_WEBHOOK_KEY` and `DODO_PAYMENTS_BASE_URL` environment variables\n    .fromEnv()\n    .bearerToken("My Bearer Token")\n    .build();\n```\n\nSee this table for the available options:\n\n| Setter        | System property           | Environment variable        | Required | Default value                     |\n| ------------- | ------------------------- | --------------------------- | -------- | --------------------------------- |\n| `bearerToken` | `dodopayments.apiKey`     | `DODO_PAYMENTS_API_KEY`     | true     | -                                 |\n| `webhookKey`  | `dodopayments.webhookKey` | `DODO_PAYMENTS_WEBHOOK_KEY` | false    | -                                 |\n| `baseUrl`     | `dodopayments.baseUrl`    | `DODO_PAYMENTS_BASE_URL`    | true     | `"https://live.dodopayments.com"` |\n\nSystem properties take precedence over environment variables.\n\n> [!TIP]\n> Don\'t create more than one client in the same application. Each client has a connection pool and\n> thread pools, which are more efficient to share between requests.\n\n### Modifying configuration\n\nTo temporarily use a modified client configuration, while reusing the same connection and thread       pools, call `withOptions()` on any client or service:\n\n```java\nimport com.dodopayments.api.client.DodoPaymentsClient;\n\nDodoPaymentsClient clientWithOptions = client.withOptions(optionsBuilder -> {\n    optionsBuilder.baseUrl("https://example.com");\n    optionsBuilder.maxRetries(42);\n});\n```\n\nThe `withOptions()` method does not affect the original client or service.\n\n## Requests and responses\n\nTo send a request to the Dodo Payments API, build an instance of some `Params` class and pass it to the     corresponding client method. When the response is received, it will be deserialized into an instance of     a Java class.\n\nFor example, `client.checkoutSessions().create(...)` should be called with an instance of `CheckoutSessionCreateParams`, and it     will return an instance of `CheckoutSessionResponse`.\n\n## Immutability\n\nEach class in the SDK has an associated   [builder](https://blogs.oracle.com/javamagazine/post/exploring-joshua-blochs-builder-design-pattern-in-java)   or factory method for constructing it.\n\nEach class is [immutable](https://docs.oracle.com/javase/tutorial/essential/concurrency/immutable.html)   once constructed. If the class has an associated builder, then it has a `toBuilder()` method, which can   be used to convert it back to a builder for making a modified copy.\n\nBecause each class is immutable, builder modification will _never_ affect already built class instances.\n\n## Asynchronous execution\n\nThe default client is synchronous. To switch to asynchronous execution, call the `async()` method:\n\n```java\nimport com.dodopayments.api.client.DodoPaymentsClient;\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient;\nimport com.dodopayments.api.models.checkoutsessions.CheckoutSessionCreateParams;\nimport com.dodopayments.api.models.checkoutsessions.CheckoutSessionRequest;\nimport com.dodopayments.api.models.checkoutsessions.CheckoutSessionResponse;\nimport com.dodopayments.api.models.checkoutsessions.ProductItemReq;\nimport java.util.concurrent.CompletableFuture;\n\n// Configures using the `dodopayments.apiKey`, `dodopayments.webhookKey` and `dodopayments.baseUrl` system properties\n// Or configures using the `DODO_PAYMENTS_API_KEY`, `DODO_PAYMENTS_WEBHOOK_KEY` and `DODO_PAYMENTS_BASE_URL` environment variables\nDodoPaymentsClient client = DodoPaymentsOkHttpClient.fromEnv();\n\nCheckoutSessionRequest params = CheckoutSessionRequest.builder()\n    .addProductCart(ProductItemReq.builder()\n        .productId("product_id")\n        .quantity(0)\n        .build())\n    .build();\nCompletableFuture<CheckoutSessionResponse> checkoutSessionResponse = client.async().checkoutSessions().create(params);\n```\n\nOr create an asynchronous client from the beginning:\n\n```java\nimport com.dodopayments.api.client.DodoPaymentsClientAsync;\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClientAsync;\nimport com.dodopayments.api.models.checkoutsessions.CheckoutSessionCreateParams;\nimport com.dodopayments.api.models.checkoutsessions.CheckoutSessionRequest;\nimport com.dodopayments.api.models.checkoutsessions.CheckoutSessionResponse;\nimport com.dodopayments.api.models.checkoutsessions.ProductItemReq;\nimport java.util.concurrent.CompletableFuture;\n\n// Configures using the `dodopayments.apiKey`, `dodopayments.webhookKey` and `dodopayments.baseUrl` system properties\n// Or configures using the `DODO_PAYMENTS_API_KEY`, `DODO_PAYMENTS_WEBHOOK_KEY` and `DODO_PAYMENTS_BASE_URL` environment variables\nDodoPaymentsClientAsync client = DodoPaymentsOkHttpClientAsync.fromEnv();\n\nCheckoutSessionRequest params = CheckoutSessionRequest.builder()\n    .addProductCart(ProductItemReq.builder()\n        .productId("product_id")\n        .quantity(0)\n        .build())\n    .build();\nCompletableFuture<CheckoutSessionResponse> checkoutSessionResponse = client.checkoutSessions().create(params);\n```\n\nThe asynchronous client supports the same options as the synchronous one, except most methods return `CompletableFuture`s.\n\n\n\n\n\n## Binary responses\n\nThe SDK defines methods that return binary responses, which are used for API responses that shouldn\'t     necessarily be parsed, like non-JSON data.\n\nThese methods return [`HttpResponse`](dodo-payments-java-core/src/main/kotlin/com/dodopayments/api/core/http/HttpResponse.kt):\n\n```java\nimport com.dodopayments.api.core.http.HttpResponse;\nimport com.dodopayments.api.models.invoices.payments.PaymentRetrieveParams;\n\nHttpResponse payment = client.invoices().payments().retrieve("payment_id");\n```\n\nTo save the response content to a file, use the     [`Files.copy(...)`](https://docs.oracle.com/javase/8/docs/api/java/nio/file/Files.html#copy-java.io.InputStream-java.nio.file.Path-java.nio.file.CopyOption...-)     method:\n\n```java\nimport com.dodopayments.api.core.http.HttpResponse;\nimport java.nio.file.Files;\nimport java.nio.file.Paths;\nimport java.nio.file.StandardCopyOption;\n\ntry (HttpResponse response = client.invoices().payments().retrieve(params)) {\n    Files.copy(\n        response.body(),\n        Paths.get(path),\n        StandardCopyOption.REPLACE_EXISTING\n    );\n} catch (Exception e) {\n    System.out.println("Something went wrong!");\n    throw new RuntimeException(e);\n}\n```\n\nOr transfer the response content to any     [`OutputStream`](https://docs.oracle.com/javase/8/docs/api/java/io/OutputStream.html):\n\n```java\nimport com.dodopayments.api.core.http.HttpResponse;\nimport java.nio.file.Files;\nimport java.nio.file.Paths;\n\ntry (HttpResponse response = client.invoices().payments().retrieve(params)) {\n    response.body().transferTo(Files.newOutputStream(Paths.get(path)));\n} catch (Exception e) {\n    System.out.println("Something went wrong!");\n    throw new RuntimeException(e);\n}\n```\n\n## Raw responses\n\nThe SDK defines methods that deserialize responses into instances of Java classes.       However, these methods don\'t provide access to the response headers, status code, or the raw response       body.\n\nTo access this data, prefix any HTTP method call on a client or service with `withRawResponse()`:\n\n```java\nimport com.dodopayments.api.core.http.Headers;\nimport com.dodopayments.api.core.http.HttpResponseFor;\nimport com.dodopayments.api.models.checkoutsessions.CheckoutSessionCreateParams;\nimport com.dodopayments.api.models.checkoutsessions.CheckoutSessionRequest;\nimport com.dodopayments.api.models.checkoutsessions.CheckoutSessionResponse;\nimport com.dodopayments.api.models.checkoutsessions.ProductItemReq;\n\nCheckoutSessionRequest params = CheckoutSessionRequest.builder()\n    .addProductCart(ProductItemReq.builder()\n        .productId("product_id")\n        .quantity(0)\n        .build())\n    .build();\nHttpResponseFor<CheckoutSessionResponse> checkoutSessionResponse = client.checkoutSessions().withRawResponse().create(params);\n\nint statusCode = checkoutSessionResponse.statusCode();\nHeaders headers = checkoutSessionResponse.headers();\n```\n\nYou can still deserialize the response into an instance of a Java class if needed:\n\n```java\nimport com.dodopayments.api.models.checkoutsessions.CheckoutSessionResponse;\n\nCheckoutSessionResponse parsedCheckoutSessionResponse = checkoutSessionResponse.parse();\n```\n\n## Error handling\n\nThe SDK throws custom unchecked exception types:\n\n- [`DodoPaymentsServiceException`](dodo-payments-java-core/src/main/kotlin/com/dodopayments/api/errors/DodoPaymentsServiceException.kt): Base class for HTTP errors. See this table for which exception       subclass is thrown for each HTTP status code:\n\n  | Status | Exception                                          |\n  | ------ | -------------------------------------------------- |\n  | 400    | [`BadRequestException`](dodo-payments-java-core/src/main/kotlin/com/dodopayments/api/errors/BadRequestException.kt)           |\n  | 401    | [`UnauthorizedException`](dodo-payments-java-core/src/main/kotlin/com/dodopayments/api/errors/UnauthorizedException.kt)         |\n  | 403    | [`PermissionDeniedException`](dodo-payments-java-core/src/main/kotlin/com/dodopayments/api/errors/PermissionDeniedException.kt)     |\n  | 404    | [`NotFoundException`](dodo-payments-java-core/src/main/kotlin/com/dodopayments/api/errors/NotFoundException.kt)             |\n  | 422    | [`UnprocessableEntityException`](dodo-payments-java-core/src/main/kotlin/com/dodopayments/api/errors/UnprocessableEntityException.kt)  |\n  | 429    | [`RateLimitException`](dodo-payments-java-core/src/main/kotlin/com/dodopayments/api/errors/RateLimitException.kt)            |\n  | 5xx    | [`InternalServerException`](dodo-payments-java-core/src/main/kotlin/com/dodopayments/api/errors/InternalServerException.kt)       |\n  | others | [`UnexpectedStatusCodeException`](dodo-payments-java-core/src/main/kotlin/com/dodopayments/api/errors/UnexpectedStatusCodeException.kt) |\n\n- [`DodoPaymentsIoException`](dodo-payments-java-core/src/main/kotlin/com/dodopayments/api/errors/DodoPaymentsIoException.kt): I/O networking errors.\n\n- [`DodoPaymentsRetryableException`](dodo-payments-java-core/src/main/kotlin/com/dodopayments/api/errors/DodoPaymentsRetryableException.kt): Generic error indicating a failure that could be retried by the client.\n\n- [`DodoPaymentsInvalidDataException`](dodo-payments-java-core/src/main/kotlin/com/dodopayments/api/errors/DodoPaymentsInvalidDataException.kt): Failure to interpret successfully parsed data. For example,       when accessing a property that\'s supposed to be required, but the API unexpectedly omitted it from the       response.\n\n- [`DodoPaymentsException`](dodo-payments-java-core/src/main/kotlin/com/dodopayments/api/errors/DodoPaymentsException.kt): Base class for all exceptions. Most errors will result in one of the       previously mentioned ones, but completely generic errors may be thrown using the base class.\n\n## Pagination\n\nThe SDK defines methods that return a paginated lists of results. It provides convenient ways to access     the results either one page at a time or item-by-item across all pages.\n\n### Auto-pagination\n\nTo iterate through all results across all pages, use the `autoPager()` method, which automatically     fetches more pages as needed.\n\nWhen using the synchronous client, the method returns an [`Iterable`](https://docs.oracle.com/javase/8/docs/api/java/lang/Iterable.html)\n\n```java\nimport com.dodopayments.api.models.payments.PaymentListPage;\nimport com.dodopayments.api.models.payments.PaymentListResponse;\n\nPaymentListPage page = client.payments().list();\n\n// Process as an Iterable\nfor (PaymentListResponse payment : page.autoPager()) {\n    System.out.println(payment);\n}\n\n// Process as a Stream\npage.autoPager()\n    .stream()\n    .limit(50)\n    .forEach(payment -> System.out.println(payment));\n```\n\nWhen using the asynchronous client, the method returns an [`AsyncStreamResponse`](dodo-payments-java-core/src/main/kotlin/com/dodopayments/api/core/http/AsyncStreamResponse.kt):\n\n```java\nimport com.dodopayments.api.core.http.AsyncStreamResponse;\nimport com.dodopayments.api.models.payments.PaymentListPageAsync;\nimport com.dodopayments.api.models.payments.PaymentListResponse;\nimport java.util.Optional;\nimport java.util.concurrent.CompletableFuture;\n\nCompletableFuture<PaymentListPageAsync> pageFuture = client.async().payments().list();\n\npageFuture.thenRun(page -> page.autoPager().subscribe(payment -> {\n    System.out.println(payment);\n}));\n\n// If you need to handle errors or completion of the stream\npageFuture.thenRun(page -> page.autoPager().subscribe(new AsyncStreamResponse.Handler<>() {\n    @Override\n    public void onNext(PaymentListResponse payment) {\n        System.out.println(payment);\n    }\n\n    @Override\n    public void onComplete(Optional<Throwable> error) {\n        if (error.isPresent()) {\n            System.out.println("Something went wrong!");\n            throw new RuntimeException(error.get());\n        } else {\n            System.out.println("No more!");\n        }\n    }\n}));\n\n// Or use futures\npageFuture.thenRun(page -> page.autoPager()\n    .subscribe(payment -> {\n        System.out.println(payment);\n    })\n    .onCompleteFuture()\n    .whenComplete((unused, error) -> {\n        if (error != null) {\n            System.out.println("Something went wrong!");\n            throw new RuntimeException(error);\n        } else {\n            System.out.println("No more!");\n        }\n    }));\n```\n\n### Manual pagination\n\nTo access individual page items and manually request the next page, use the `items()`,\n`hasNextPage()`, and `nextPage()` methods:\n\n```java\nimport com.dodopayments.api.models.payments.PaymentListPage;\nimport com.dodopayments.api.models.payments.PaymentListResponse;\n\nPaymentListPage page = client.payments().list();\nwhile (true) {\n    for (PaymentListResponse payment : page.items()) {\n        System.out.println(payment);\n    }\n\n    if (!page.hasNextPage()) {\n        break;\n    }\n\n    page = page.nextPage();\n}\n```\n\n## Logging\n\nThe SDK uses the standard   [OkHttp logging interceptor](https://github.com/square/okhttp/tree/master/okhttp-logging-interceptor).\n\nEnable logging by setting the `DODO_PAYMENTS_LOG` environment variable to   `info`:\n\n```sh\nexport DODO_PAYMENTS_LOG=info\n```\n\nOr to `debug` for more verbose logging:\n\n```sh\nexport DODO_PAYMENTS_LOG=debug\n```\n\n## ProGuard and R8\n\nAlthough the SDK uses reflection, it is still usable with     [ProGuard](https://github.com/Guardsquare/proguard) and     [R8](https://developer.android.com/topic/performance/app-optimization/enable-app-optimization) because     `dodo-payments-java-core` is published with a     [configuration file](dodo-payments-java-core/src/main/resources/META-INF/proguard/dodo-payments-java-core.pro) containing     [keep rules](https://www.guardsquare.com/manual/configuration/usage).\n\nProGuard and R8 should automatically detect and use the published rules, but you can also manually copy     the keep rules if necessary.\n\n\n\n\n\n## Jackson\n\nThe SDK depends on [Jackson](https://github.com/FasterXML/jackson) for JSON     serialization/deserialization. It is compatible with version 2.13.4 or higher,     but depends on version 2.18.2 by default.\n\nThe SDK throws an exception if it detects an incompatible Jackson version at runtime (e.g. if the     default version was overridden in your Maven or Gradle config).\n\nIf the SDK threw an exception, but you\'re _certain_ the version is compatible, then disable the version     check using the `checkJacksonVersionCompatibility` on [`DodoPaymentsOkHttpClient`](dodo-payments-java-client-okhttp/src/main/kotlin/com/dodopayments/api/client/okhttp/DodoPaymentsOkHttpClient.kt) or     [`DodoPaymentsOkHttpClientAsync`](dodo-payments-java-client-okhttp/src/main/kotlin/com/dodopayments/api/client/okhttp/DodoPaymentsOkHttpClientAsync.kt).\n\n> [!CAUTION]\n> We make no guarantee that the SDK works correctly when the Jackson version check is disabled.\n\nAlso note that there are bugs in older Jackson versions that can affect the SDK. We don\'t work around all     Jackson bugs ([example](https://github.com/FasterXML/jackson-databind/issues/3240)) and expect users to     upgrade Jackson for those instead.\n\n## Network options\n\n### Retries\n\nThe SDK automatically retries 2 times by default, with a short exponential backoff between requests.\n\nOnly the following error types are retried:\n- Connection errors (for example, due to a network connectivity problem)\n- 408 Request Timeout\n- 409 Conflict\n- 429 Rate Limit\n- 5xx Internal\n\nThe API may also explicitly instruct the SDK to retry or not retry a request.\n\nTo set a custom number of retries, configure the client using the `maxRetries` method:\n\n```java\nimport com.dodopayments.api.client.DodoPaymentsClient;\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient;\n\nDodoPaymentsClient client = DodoPaymentsOkHttpClient.builder()\n    .fromEnv()\n    .maxRetries(4)\n    .build();\n```\n\n### Timeouts\n\nRequests time out after 1 minute by default.\n\nTo set a custom timeout, configure the method call using the `timeout` method:\n\n```java\nimport com.dodopayments.api.models.checkoutsessions.CheckoutSessionResponse;\n\nCheckoutSessionResponse checkoutSessionResponse = client.checkoutSessions().create(\n  params, RequestOptions.builder().timeout(Duration.ofSeconds(30)).build()\n);\n```\n\nOr configure the default for all method calls at the client level:\n\n```java\nimport com.dodopayments.api.client.DodoPaymentsClient;\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient;\nimport java.time.Duration;\n\nDodoPaymentsClient client = DodoPaymentsOkHttpClient.builder()\n    .fromEnv()\n    .timeout(Duration.ofSeconds(30))\n    .build();\n```\n\n### Proxies\n\nTo route requests through a proxy, configure the client using the `proxy` method:\n\n```java\nimport com.dodopayments.api.client.DodoPaymentsClient;\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient;\nimport java.net.InetSocketAddress;\nimport java.net.Proxy;\n\nDodoPaymentsClient client = DodoPaymentsOkHttpClient.builder()\n    .fromEnv()\n    .proxy(new Proxy(\n      Proxy.Type.HTTP, new InetSocketAddress(\n        "https://example.com", 8080\n      )\n    ))\n    .build();\n```\n\n### Connection pooling\n\nTo customize the underlying OkHttp connection pool, configure the client using the   `maxIdleConnections` and `keepAliveDuration` methods:\n\n```java\nimport com.dodopayments.api.client.DodoPaymentsClient;\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient;\nimport java.time.Duration;\n\nDodoPaymentsClient client = DodoPaymentsOkHttpClient.builder()\n    .fromEnv()\n    // If `maxIdleConnections` is set, then `keepAliveDuration` must be set, and vice versa.\n    .maxIdleConnections(10)\n    .keepAliveDuration(Duration.ofMinutes(2))\n    .build();\n```\n\nIf both options are unset, OkHttp\'s default connection pool settings are used.\n\n### HTTPS\n\n> [!NOTE]\n> Most applications should not call these methods, and instead use the system defaults. The defaults include\n> special optimizations that can be lost if the implementations are modified.\n\nTo configure how HTTPS connections are secured, configure the client using the `sslSocketFactory`,   `trustManager`, and `hostnameVerifier` methods:\n\n```java\nimport com.dodopayments.api.client.DodoPaymentsClient;\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient;\n\nDodoPaymentsClient client = DodoPaymentsOkHttpClient.builder()\n    .fromEnv()\n    // If `sslSocketFactory` is set, then `trustManager` must be set, and vice versa.\n    .sslSocketFactory(yourSSLSocketFactory)\n    .trustManager(yourTrustManager)\n    .hostnameVerifier(yourHostnameVerifier)\n    .build();\n```\n\n### Environments\n\nThe SDK sends requests to the live_mode by default. To send requests to a different     environment, configure the client like so:\n\n```java\nimport com.dodopayments.api.client.DodoPaymentsClient;\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient;\n\nDodoPaymentsClient client = DodoPaymentsOkHttpClient.builder()\n    .fromEnv()\n    .testMode()\n    .build();\n```\n\n### Custom HTTP client\n\nThe SDK consists of three artifacts:\n- `dodo-payments-java-core`\n  - Contains core SDK logic\n  - Does not depend on [OkHttp](https://square.github.io/okhttp)\n  - Exposes [`DodoPaymentsClient`](dodo-payments-java-core/src/main/kotlin/com/dodopayments/api/client/DodoPaymentsClient.kt), [`DodoPaymentsClientAsync`](dodo-payments-java-core/src/main/kotlin/com/dodopayments/api/client/DodoPaymentsClientAsync.kt),             [`DodoPaymentsClientImpl`](dodo-payments-java-core/src/main/kotlin/com/dodopayments/api/client/DodoPaymentsClientImpl.kt), and [`DodoPaymentsClientAsyncImpl`](dodo-payments-java-core/src/main/kotlin/com/dodopayments/api/client/DodoPaymentsClientAsyncImpl.kt), all of which can             work with any HTTP client\n- `dodo-payments-java-client-okhttp`\n  - Depends on [OkHttp](https://square.github.io/okhttp)\n  - Exposes [`DodoPaymentsOkHttpClient`](dodo-payments-java-client-okhttp/src/main/kotlin/com/dodopayments/api/client/okhttp/DodoPaymentsOkHttpClient.kt) and [`DodoPaymentsOkHttpClientAsync`](dodo-payments-java-client-okhttp/src/main/kotlin/com/dodopayments/api/client/okhttp/DodoPaymentsOkHttpClientAsync.kt), which             provide a way to construct [`DodoPaymentsClientImpl`](dodo-payments-java-core/src/main/kotlin/com/dodopayments/api/client/DodoPaymentsClientImpl.kt) and             [`DodoPaymentsClientAsyncImpl`](dodo-payments-java-core/src/main/kotlin/com/dodopayments/api/client/DodoPaymentsClientAsyncImpl.kt), respectively, using OkHttp\n- `dodo-payments-java`\n  - Depends on and exposes the APIs of both `dodo-payments-java-core` and `dodo-payments-java-client-okhttp`\n  - Does not have its own logic\n\nThis structure allows replacing the SDK\'s default HTTP client without pulling in unnecessary dependencies.\n\n#### Customized [`OkHttpClient`](https://square.github.io/okhttp/3.x/okhttp/okhttp3/OkHttpClient.html)\n\n> [!TIP]\n> Try the available [network options](#network-options) before replacing the default client.\n\nTo use a customized `OkHttpClient`:\n\n1. Replace your [`dodo-payments-java` dependency](#installation) with `dodo-payments-java-core`\n2. Copy `dodo-payments-java-client-okhttp`\'s [`OkHttpClient`](dodo-payments-java-client-okhttp/src/main/kotlin/com/dodopayments/api/client/okhttp/OkHttpClient.kt) class into your code and        customize it\n3. Construct [`DodoPaymentsClientImpl`](dodo-payments-java-core/src/main/kotlin/com/dodopayments/api/client/DodoPaymentsClientImpl.kt) or [`DodoPaymentsClientAsyncImpl`](dodo-payments-java-core/src/main/kotlin/com/dodopayments/api/client/DodoPaymentsClientAsyncImpl.kt), similarly to        [`DodoPaymentsOkHttpClient`](dodo-payments-java-client-okhttp/src/main/kotlin/com/dodopayments/api/client/okhttp/DodoPaymentsOkHttpClient.kt) or [`DodoPaymentsOkHttpClientAsync`](dodo-payments-java-client-okhttp/src/main/kotlin/com/dodopayments/api/client/okhttp/DodoPaymentsOkHttpClientAsync.kt), using your        customized client\n\n### Completely custom HTTP client\n\nTo use a completely custom HTTP client:\n\n1. Replace your [`dodo-payments-java` dependency](#installation) with `dodo-payments-java-core`\n2. Write a class that implements the [`HttpClient`](dodo-payments-java-core/src/main/kotlin/com/dodopayments/api/core/http/HttpClient.kt) interface\n3. Construct [`DodoPaymentsClientImpl`](dodo-payments-java-core/src/main/kotlin/com/dodopayments/api/client/DodoPaymentsClientImpl.kt) or [`DodoPaymentsClientAsyncImpl`](dodo-payments-java-core/src/main/kotlin/com/dodopayments/api/client/DodoPaymentsClientAsyncImpl.kt), similarly to        [`DodoPaymentsOkHttpClient`](dodo-payments-java-client-okhttp/src/main/kotlin/com/dodopayments/api/client/okhttp/DodoPaymentsOkHttpClient.kt) or [`DodoPaymentsOkHttpClientAsync`](dodo-payments-java-client-okhttp/src/main/kotlin/com/dodopayments/api/client/okhttp/DodoPaymentsOkHttpClientAsync.kt), using your new        client class\n\n## Undocumented API functionality\n\nThe SDK is typed for convenient usage of the documented API. However, it also supports working with undocumented or not yet supported parts of the API.\n\n### Parameters\n\nTo set undocumented parameters, call the `putAdditionalHeader`, `putAdditionalQueryParam`, or       `putAdditionalBodyProperty` methods on any `Params` class:\n\n```java\nimport com.dodopayments.api.core.JsonValue;\nimport com.dodopayments.api.models.checkoutsessions.CheckoutSessionCreateParams;\n\nCheckoutSessionCreateParams params = CheckoutSessionCreateParams.builder()\n    .putAdditionalHeader("Secret-Header", "42")\n    .putAdditionalQueryParam("secret_query_param", "42")\n    .putAdditionalBodyProperty("secretProperty", JsonValue.from("42"))\n    .build();\n```\n\nThese can be accessed on the built object later using the `_additionalHeaders()`,       `_additionalQueryParams()`, and `_additionalBodyProperties()` methods.\n\nTo set a documented parameter or property to an undocumented or not yet supported _value_, pass a       [`JsonValue`](dodo-payments-java-core/src/main/kotlin/com/dodopayments/api/core/Values.kt) object to its setter:\n\n```java\nimport com.dodopayments.api.models.checkoutsessions.CheckoutSessionCreateParams;\nimport com.dodopayments.api.models.checkoutsessions.CheckoutSessionRequest;\nimport com.dodopayments.api.models.checkoutsessions.ProductItemReq;\n\nCheckoutSessionCreateParams params = CheckoutSessionCreateParams.builder()\n    .checkoutSessionRequest(CheckoutSessionRequest.builder()\n        .addProductCart(ProductItemReq.builder()\n            .productId("product_id")\n            .quantity(0)\n            .build())\n        .build())\n    .build();\n```\n\nThe most straightforward way to create a [`JsonValue`](dodo-payments-java-core/src/main/kotlin/com/dodopayments/api/core/Values.kt) is using its       `from(...)` method:\n\n```java\nimport com.dodopayments.api.core.JsonValue;\nimport java.util.List;\nimport java.util.Map;\n\n// Create primitive JSON values\nJsonValue nullValue = JsonValue.from(null);\nJsonValue booleanValue = JsonValue.from(true);\nJsonValue numberValue = JsonValue.from(42);\nJsonValue stringValue = JsonValue.from("Hello World!");\n\n// Create a JSON array value equivalent to `["Hello", "World"]`\nJsonValue arrayValue = JsonValue.from(List.of(\n  "Hello", "World"\n));\n\n// Create a JSON object value equivalent to `{ "a": 1, "b": 2 }`\nJsonValue objectValue = JsonValue.from(Map.of(\n  "a", 1,\n  "b", 2\n));\n\n// Create an arbitrarily nested JSON equivalent to:\n// {\n//   "a": [1, 2],\n//   "b": [3, 4]\n// }\nJsonValue complexValue = JsonValue.from(Map.of(\n  "a", List.of(\n    1, 2\n  ),\n  "b", List.of(\n    3, 4\n  )\n));\n```\n\nNormally a `Builder` class\'s `build` method will throw         [`IllegalStateException`](https://docs.oracle.com/javase/8/docs/api/java/lang/IllegalStateException.html)         if any required parameter or property is unset.\n\nTo forcibly omit a required parameter or property, pass [`JsonMissing`](dodo-payments-java-core/src/main/kotlin/com/dodopayments/api/core/Values.kt):\n\n```java\nimport com.dodopayments.api.core.JsonMissing;\nimport com.dodopayments.api.models.checkoutsessions.CheckoutSessionCreateParams;\nimport com.dodopayments.api.models.checkoutsessions.CheckoutSessionRequest;\nimport com.dodopayments.api.models.checkoutsessions.ProductItemReq;\n\nCheckoutSessionCreateParams params = CheckoutSessionCreateParams.builder()\n    .checkoutSessionRequest(CheckoutSessionRequest.builder()\n        .addProductCart(ProductItemReq.builder()\n            .productId("product_id")\n            .quantity(0)\n            .build())\n        .build())\n    .productCart(JsonMissing.of())\n    .build();\n```\n\n### Response properties\n\nTo access undocumented response properties, call the `_additionalProperties()` method:\n\n```java\nimport com.dodopayments.api.core.JsonValue;\nimport java.util.Map;\n\nMap<String, JsonValue> additionalProperties = client.checkoutSessions().create(params)._additionalProperties();\nJsonValue secretPropertyValue = additionalProperties.get("secretProperty");\n\nString result = secretPropertyValue.accept(new JsonValue.Visitor<>() {\n    @Override\n    public String visitNull() {\n        return "It\'s null!";\n    }\n\n    @Override\n    public String visitBoolean(boolean value) {\n        return "It\'s a boolean!";\n    }\n\n    @Override\n    public String visitNumber(Number value) {\n        return "It\'s a number!";\n    }\n\n    // Other methods include `visitMissing`, `visitString`, `visitArray`, and `visitObject`\n    // The default implementation of each unimplemented method delegates to `visitDefault`, which throws by default, but can also be overridden\n});\n```\n\nTo access a property\'s raw JSON value, which may be undocumented, call its `_` prefixed method:\n\n```java\nimport com.dodopayments.api.core.JsonField;\nimport java.util.Optional;\n\nJsonField<Object> field = client.checkoutSessions().create(params)._field();\n\nif (field.isMissing()) {\n  // The property is absent from the JSON response\n} else if (field.isNull()) {\n  // The property was set to literal null\n} else {\n  // Check if value was provided as a string\n  // Other methods include `asNumber()`, `asBoolean()`, etc.\n  Optional<String> jsonString = field.asString();\n\n  // Try to deserialize into a custom type\n  MyClass myObject = field.asUnknown().orElseThrow().convert(MyClass.class);\n}\n```\n\n### Response validation\n\nIn rare cases, the API may return a response that doesn\'t match the expected type. For example, the SDK     may expect a property to contain a `String`, but the API could return something else.\n\nBy default, the SDK will not throw an exception in this case. It will throw     [`DodoPaymentsInvalidDataException`](dodo-payments-java-core/src/main/kotlin/com/dodopayments/api/errors/DodoPaymentsInvalidDataException.kt) only if you directly access the property.\n\nIf you would prefer to check that the response is completely well-typed upfront, then either call     `validate()`:\n\n```java\nimport com.dodopayments.api.models.checkoutsessions.CheckoutSessionResponse;\n\nCheckoutSessionResponse checkoutSessionResponse = client.checkoutSessions().create(params).validate();\n```\n\nOr configure the method call to validate the response using the `responseValidation` method:\n\n```java\nimport com.dodopayments.api.models.checkoutsessions.CheckoutSessionResponse;\n\nCheckoutSessionResponse checkoutSessionResponse = client.checkoutSessions().create(\n  params, RequestOptions.builder().responseValidation(true).build()\n);\n```\n\nOr configure the default for all method calls at the client level:\n\n```java\nimport com.dodopayments.api.client.DodoPaymentsClient;\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient;\n\nDodoPaymentsClient client = DodoPaymentsOkHttpClient.builder()\n    .fromEnv()\n    .responseValidation(true)\n    .build();\n```\n\n## FAQ\n\n### Why don\'t you use plain `enum` classes?\n\nJava `enum` classes are not trivially   [forwards compatible](https://www.stainless.com/blog/making-java-enums-forwards-compatible). Using them in   the SDK could cause runtime exceptions if the API is updated to respond with a new enum value.\n\n### Why do you represent fields using `JsonField<T>` instead of just plain `T`?\n\nUsing `JsonField<T>` enables a few features:\n\n- Allowing usage of [undocumented API functionality](#undocumented-api-functionality)\n- Lazily [validating the API response against the expected shape](#response-validation)\n- Representing absent vs explicitly null values\n\n### Why don\'t you use [`data` classes](https://kotlinlang.org/docs/data-classes.html)?\n\nIt is not [backwards compatible to add new fields to a data class](https://kotlinlang.org/docs/api-guidelines-backward-compatibility.html#avoid-using-data-classes-in-your-api)   and we don\'t want to introduce a breaking change every time we add a field to a class.\n\n### Why don\'t you use checked exceptions?\n\nChecked exceptions are widely considered a mistake in the Java programming language. In fact, they were   omitted from Kotlin for this reason.\n\nChecked exceptions:\n\n- Are verbose to handle\n- Encourage error handling at the wrong level of abstraction, where nothing can be done about the error\n- Are tedious to propagate due to the [function coloring problem](https://journal.stuffwithstuff.com/2015/02/01/what-color-is-your-function)\n- Don\'t play well with lambdas (also due to the function coloring problem)\n\n## Semantic versioning\n\nThis package generally follows [SemVer](https://semver.org/spec/v2.0.0.html) conventions, though certain backwards-incompatible changes may be released as minor versions:\n\n1. Changes to library internals which are technically public but not intended or documented for external use. _(Please open a GitHub issue to let us know if you are relying on such internals.)_\n2. Changes that we do not expect to impact the vast majority of users in practice.\n\nWe take backwards-compatibility seriously and work hard to ensure you can rely on a smooth upgrade experience.\n\nWe are keen for your feedback; please open an [issue](https://www.github.com/dodopayments/dodopayments-java/issues) with questions, bugs, or suggestions.\n',
  },
  {
    language: 'kotlin',
    content:
      '# Dodo Payments Kotlin API Library\n\n<!-- x-release-please-start-version -->\n[![Maven Central](https://img.shields.io/maven-central/v/com.dodopayments.api/dodo-payments-kotlin)](https://central.sonatype.com/artifact/com.dodopayments.api/dodo-payments-kotlin/0.0.1)\n[![javadoc](https://javadoc.io/badge2/com.dodopayments.api/dodo-payments-kotlin/0.0.1/javadoc.svg)](https://javadoc.io/doc/com.dodopayments.api/dodo-payments-kotlin/0.0.1)\n<!-- x-release-please-end -->\n\nThe Dodo Payments Kotlin SDK provides convenient access to the [Dodo Payments REST API](https://docs.dodopayments.com/api-reference/introduction)   from applications written in Kotlin.\n\nThe Dodo Payments Kotlin SDK is similar to the Dodo Payments Java SDK but with minor differences that       make it more ergonomic for use in Kotlin, such as nullable values instead of `Optional`,       `Sequence` instead of `Stream`, and suspend functions instead of `CompletableFuture`.\n\nIt is generated with [Stainless](https://www.stainless.com/).\n\n## MCP Server\n\nUse the Dodo Payments MCP Server to enable AI assistants to interact with this API, allowing them to explore endpoints, make test requests, and use documentation to help integrate this SDK into your application.\n\n[![Add to Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/en-US/install-mcp?name=dodopayments-mcp&config=eyJjb21tYW5kIjoibnB4IiwiYXJncyI6WyIteSIsImRvZG9wYXltZW50cy1tY3AiXSwiZW52Ijp7IkRPRE9fUEFZTUVOVFNfQVBJX0tFWSI6Ik15IEJlYXJlciBUb2tlbiIsIkRPRE9fUEFZTUVOVFNfV0VCSE9PS19LRVkiOiJNeSBXZWJob29rIEtleSJ9fQ)\n[![Install in VS Code](https://img.shields.io/badge/_-Add_to_VS_Code-blue?style=for-the-badge&logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCA0MCA0MCI+PHBhdGggZmlsbD0iI0VFRSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMzAuMjM1IDM5Ljg4NGEyLjQ5MSAyLjQ5MSAwIDAgMS0xLjc4MS0uNzNMMTIuNyAyNC43OGwtMy40NiAyLjYyNC0zLjQwNiAyLjU4MmExLjY2NSAxLjY2NSAwIDAgMS0xLjA4Mi4zMzggMS42NjQgMS42NjQgMCAwIDEtMS4wNDYtLjQzMWwtMi4yLTJhMS42NjYgMS42NjYgMCAwIDEgMC0yLjQ2M0w3LjQ1OCAyMCA0LjY3IDE3LjQ1MyAxLjUwNyAxNC41N2ExLjY2NSAxLjY2NSAwIDAgMSAwLTIuNDYzbDIuMi0yYTEuNjY1IDEuNjY1IDAgMCAxIDIuMTMtLjA5N2w2Ljg2MyA1LjIwOUwyOC40NTIuODQ0YTIuNDg4IDIuNDg4IDAgMCAxIDEuODQxLS43MjljLjM1MS4wMDkuNjk5LjA5MSAxLjAxOS4yNDVsOC4yMzYgMy45NjFhMi41IDIuNSAwIDAgMSAxLjQxNSAyLjI1M3YuMDk5LS4wNDVWMzMuMzd2LS4wNDUuMDk1YTIuNTAxIDIuNTAxIDAgMCAxLTEuNDE2IDIuMjU3bC04LjIzNSAzLjk2MWEyLjQ5MiAyLjQ5MiAwIDAgMS0xLjA3Ny4yNDZabS43MTYtMjguOTQ3LTExLjk0OCA5LjA2MiAxMS45NTIgOS4wNjUtLjAwNC0xOC4xMjdaIi8+PC9zdmc+)](https://vscode.stainless.com/mcp/%7B%22name%22%3A%22dodopayments-mcp%22%2C%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22dodopayments-mcp%22%5D%2C%22env%22%3A%7B%22DODO_PAYMENTS_API_KEY%22%3A%22My%20Bearer%20Token%22%2C%22DODO_PAYMENTS_WEBHOOK_KEY%22%3A%22My%20Webhook%20Key%22%7D%7D)\n\n> Note: You may need to set environment variables in your MCP client.\n\n<!-- x-release-please-start-version -->\n\nThe REST API documentation can be found on [docs.dodopayments.com](https://docs.dodopayments.com/api-reference/introduction). KDocs are available on [javadoc.io](https://javadoc.io/doc/com.dodopayments.api/dodo-payments-kotlin/0.0.1).\n\n<!-- x-release-please-end -->\n\n## Installation\n\n<!-- x-release-please-start-version -->\n\n### Gradle\n\n~~~kotlin\nimplementation("com.dodopayments.api:dodo-payments-kotlin:0.0.1")\n~~~\n\n### Maven\n\n~~~xml\n<dependency>\n  <groupId>com.dodopayments.api</groupId>\n  <artifactId>dodo-payments-kotlin</artifactId>\n  <version>0.0.1</version>\n</dependency>\n~~~\n\n<!-- x-release-please-end -->\n\n## Requirements\n\nThis library requires Java 8 or later.\n\n## Usage\n\n```kotlin\nimport com.dodopayments.api.client.DodoPaymentsClient\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient\nimport com.dodopayments.api.models.checkoutsessions.CheckoutSessionCreateParams\nimport com.dodopayments.api.models.checkoutsessions.CheckoutSessionRequest\nimport com.dodopayments.api.models.checkoutsessions.CheckoutSessionResponse\nimport com.dodopayments.api.models.checkoutsessions.ProductItemReq\n\n// Configures using the `dodopayments.apiKey`, `dodopayments.webhookKey` and `dodopayments.baseUrl` system properties\n// Or configures using the `DODO_PAYMENTS_API_KEY`, `DODO_PAYMENTS_WEBHOOK_KEY` and `DODO_PAYMENTS_BASE_URL` environment variables\nval client: DodoPaymentsClient = DodoPaymentsOkHttpClient.fromEnv()\n\nval params: CheckoutSessionRequest = CheckoutSessionRequest.builder()\n    .addProductCart(ProductItemReq.builder()\n        .productId("product_id")\n        .quantity(0)\n        .build())\n    .build()\nval checkoutSessionResponse: CheckoutSessionResponse = client.checkoutSessions().create(params)\n```\n\n## Client configuration\n\nConfigure the client using system properties or environment variables:\n\n```kotlin\nimport com.dodopayments.api.client.DodoPaymentsClient\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient\n\n// Configures using the `dodopayments.apiKey`, `dodopayments.webhookKey` and `dodopayments.baseUrl` system properties\n// Or configures using the `DODO_PAYMENTS_API_KEY`, `DODO_PAYMENTS_WEBHOOK_KEY` and `DODO_PAYMENTS_BASE_URL` environment variables\nval client: DodoPaymentsClient = DodoPaymentsOkHttpClient.fromEnv()\n```\n\nOr manually:\n\n```kotlin\nimport com.dodopayments.api.client.DodoPaymentsClient\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient\n\nval client: DodoPaymentsClient = DodoPaymentsOkHttpClient.builder()\n    .bearerToken("My Bearer Token")\n    .build()\n```\n\nOr using a combination of the two approaches:\n\n```kotlin\nimport com.dodopayments.api.client.DodoPaymentsClient\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient\n\nval client: DodoPaymentsClient = DodoPaymentsOkHttpClient.builder()\n    // Configures using the `dodopayments.apiKey`, `dodopayments.webhookKey` and `dodopayments.baseUrl` system properties\n    // Or configures using the `DODO_PAYMENTS_API_KEY`, `DODO_PAYMENTS_WEBHOOK_KEY` and `DODO_PAYMENTS_BASE_URL` environment variables\n    .fromEnv()\n    .bearerToken("My Bearer Token")\n    .build()\n```\n\nSee this table for the available options:\n\n| Setter        | System property           | Environment variable        | Required | Default value                     |\n| ------------- | ------------------------- | --------------------------- | -------- | --------------------------------- |\n| `bearerToken` | `dodopayments.apiKey`     | `DODO_PAYMENTS_API_KEY`     | true     | -                                 |\n| `webhookKey`  | `dodopayments.webhookKey` | `DODO_PAYMENTS_WEBHOOK_KEY` | false    | -                                 |\n| `baseUrl`     | `dodopayments.baseUrl`    | `DODO_PAYMENTS_BASE_URL`    | true     | `"https://live.dodopayments.com"` |\n\nSystem properties take precedence over environment variables.\n\n> [!TIP]\n> Don\'t create more than one client in the same application. Each client has a connection pool and\n> thread pools, which are more efficient to share between requests.\n\n### Modifying configuration\n\nTo temporarily use a modified client configuration, while reusing the same connection and thread       pools, call `withOptions()` on any client or service:\n\n```kotlin\nimport com.dodopayments.api.client.DodoPaymentsClient\n\nval clientWithOptions: DodoPaymentsClient = client.withOptions {\n    it.baseUrl("https://example.com")\n    it.maxRetries(42)\n}\n```\n\nThe `withOptions()` method does not affect the original client or service.\n\n## Requests and responses\n\nTo send a request to the Dodo Payments API, build an instance of some `Params` class and pass it to the     corresponding client method. When the response is received, it will be deserialized into an instance of     a Kotlin class.\n\nFor example, `client.checkoutSessions().create(...)` should be called with an instance of `CheckoutSessionCreateParams`, and it     will return an instance of `CheckoutSessionResponse`.\n\n## Immutability\n\nEach class in the SDK has an associated   [builder](https://blogs.oracle.com/javamagazine/post/exploring-joshua-blochs-builder-design-pattern-in-java)   or factory method for constructing it.\n\nEach class is [immutable](https://docs.oracle.com/javase/tutorial/essential/concurrency/immutable.html)   once constructed. If the class has an associated builder, then it has a `toBuilder()` method, which can   be used to convert it back to a builder for making a modified copy.\n\nBecause each class is immutable, builder modification will _never_ affect already built class instances.\n\n## Asynchronous execution\n\nThe default client is synchronous. To switch to asynchronous execution, call the `async()` method:\n\n```kotlin\nimport com.dodopayments.api.client.DodoPaymentsClient\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient\nimport com.dodopayments.api.models.checkoutsessions.CheckoutSessionCreateParams\nimport com.dodopayments.api.models.checkoutsessions.CheckoutSessionRequest\nimport com.dodopayments.api.models.checkoutsessions.CheckoutSessionResponse\nimport com.dodopayments.api.models.checkoutsessions.ProductItemReq\n\n// Configures using the `dodopayments.apiKey`, `dodopayments.webhookKey` and `dodopayments.baseUrl` system properties\n// Or configures using the `DODO_PAYMENTS_API_KEY`, `DODO_PAYMENTS_WEBHOOK_KEY` and `DODO_PAYMENTS_BASE_URL` environment variables\nval client: DodoPaymentsClient = DodoPaymentsOkHttpClient.fromEnv()\n\nval params: CheckoutSessionRequest = CheckoutSessionRequest.builder()\n    .addProductCart(ProductItemReq.builder()\n        .productId("product_id")\n        .quantity(0)\n        .build())\n    .build()\nval checkoutSessionResponse: CheckoutSessionResponse = client.async().checkoutSessions().create(params)\n```\n\nOr create an asynchronous client from the beginning:\n\n```kotlin\nimport com.dodopayments.api.client.DodoPaymentsClientAsync\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClientAsync\nimport com.dodopayments.api.models.checkoutsessions.CheckoutSessionCreateParams\nimport com.dodopayments.api.models.checkoutsessions.CheckoutSessionRequest\nimport com.dodopayments.api.models.checkoutsessions.CheckoutSessionResponse\nimport com.dodopayments.api.models.checkoutsessions.ProductItemReq\n\n// Configures using the `dodopayments.apiKey`, `dodopayments.webhookKey` and `dodopayments.baseUrl` system properties\n// Or configures using the `DODO_PAYMENTS_API_KEY`, `DODO_PAYMENTS_WEBHOOK_KEY` and `DODO_PAYMENTS_BASE_URL` environment variables\nval client: DodoPaymentsClientAsync = DodoPaymentsOkHttpClientAsync.fromEnv()\n\nval params: CheckoutSessionRequest = CheckoutSessionRequest.builder()\n    .addProductCart(ProductItemReq.builder()\n        .productId("product_id")\n        .quantity(0)\n        .build())\n    .build()\nval checkoutSessionResponse: CheckoutSessionResponse = client.checkoutSessions().create(params)\n```\n\nThe asynchronous client supports the same options as the synchronous one, except most methods are [suspending](https://kotlinlang.org/docs/coroutines-guide.html).\n\n\n\n\n\n## Binary responses\n\nThe SDK defines methods that return binary responses, which are used for API responses that shouldn\'t     necessarily be parsed, like non-JSON data.\n\nThese methods return [`HttpResponse`](dodo-payments-kotlin-core/src/main/kotlin/com/dodopayments/api/core/http/HttpResponse.kt):\n\n```kotlin\nimport com.dodopayments.api.core.http.HttpResponse\nimport com.dodopayments.api.models.invoices.payments.PaymentRetrieveParams\n\nval payment: HttpResponse = client.invoices().payments().retrieve("payment_id")\n```\n\nTo save the response content to a file, use the     [`Files.copy(...)`](https://docs.oracle.com/javase/8/docs/api/java/nio/file/Files.html#copy-java.io.InputStream-java.nio.file.Path-java.nio.file.CopyOption...-)     method:\n\n```kotlin\nimport java.nio.file.Files\nimport java.nio.file.Paths\nimport java.nio.file.StandardCopyOption\n\nclient.invoices().payments().retrieve(params).use {\n    Files.copy(\n        it.body(),\n        Paths.get(path),\n        StandardCopyOption.REPLACE_EXISTING\n    )\n}\n```\n\nOr transfer the response content to any     [`OutputStream`](https://docs.oracle.com/javase/8/docs/api/java/io/OutputStream.html):\n\n```kotlin\nimport java.nio.file.Files\nimport java.nio.file.Paths\n\nclient.invoices().payments().retrieve(params).use {\n    it.body().transferTo(Files.newOutputStream(Paths.get(path)))\n}\n```\n\n## Raw responses\n\nThe SDK defines methods that deserialize responses into instances of Kotlin classes.       However, these methods don\'t provide access to the response headers, status code, or the raw response       body.\n\nTo access this data, prefix any HTTP method call on a client or service with `withRawResponse()`:\n\n```kotlin\nimport com.dodopayments.api.core.http.Headers\nimport com.dodopayments.api.core.http.HttpResponseFor\nimport com.dodopayments.api.models.checkoutsessions.CheckoutSessionCreateParams\nimport com.dodopayments.api.models.checkoutsessions.CheckoutSessionRequest\nimport com.dodopayments.api.models.checkoutsessions.CheckoutSessionResponse\nimport com.dodopayments.api.models.checkoutsessions.ProductItemReq\n\nval params: CheckoutSessionRequest = CheckoutSessionRequest.builder()\n    .addProductCart(ProductItemReq.builder()\n        .productId("product_id")\n        .quantity(0)\n        .build())\n    .build()\nval checkoutSessionResponse: HttpResponseFor<CheckoutSessionResponse> = client.checkoutSessions().withRawResponse().create(params)\n\nval statusCode: Int = checkoutSessionResponse.statusCode()\nval headers: Headers = checkoutSessionResponse.headers()\n```\n\nYou can still deserialize the response into an instance of a Kotlin class if needed:\n\n```kotlin\nimport com.dodopayments.api.models.checkoutsessions.CheckoutSessionResponse\n\nval parsedCheckoutSessionResponse: CheckoutSessionResponse = checkoutSessionResponse.parse()\n```\n\n## Error handling\n\nThe SDK throws custom unchecked exception types:\n\n- [`DodoPaymentsServiceException`](dodo-payments-kotlin-core/src/main/kotlin/com/dodopayments/api/errors/DodoPaymentsServiceException.kt): Base class for HTTP errors. See this table for which exception       subclass is thrown for each HTTP status code:\n\n  | Status | Exception                                          |\n  | ------ | -------------------------------------------------- |\n  | 400    | [`BadRequestException`](dodo-payments-kotlin-core/src/main/kotlin/com/dodopayments/api/errors/BadRequestException.kt)           |\n  | 401    | [`UnauthorizedException`](dodo-payments-kotlin-core/src/main/kotlin/com/dodopayments/api/errors/UnauthorizedException.kt)         |\n  | 403    | [`PermissionDeniedException`](dodo-payments-kotlin-core/src/main/kotlin/com/dodopayments/api/errors/PermissionDeniedException.kt)     |\n  | 404    | [`NotFoundException`](dodo-payments-kotlin-core/src/main/kotlin/com/dodopayments/api/errors/NotFoundException.kt)             |\n  | 422    | [`UnprocessableEntityException`](dodo-payments-kotlin-core/src/main/kotlin/com/dodopayments/api/errors/UnprocessableEntityException.kt)  |\n  | 429    | [`RateLimitException`](dodo-payments-kotlin-core/src/main/kotlin/com/dodopayments/api/errors/RateLimitException.kt)            |\n  | 5xx    | [`InternalServerException`](dodo-payments-kotlin-core/src/main/kotlin/com/dodopayments/api/errors/InternalServerException.kt)       |\n  | others | [`UnexpectedStatusCodeException`](dodo-payments-kotlin-core/src/main/kotlin/com/dodopayments/api/errors/UnexpectedStatusCodeException.kt) |\n\n- [`DodoPaymentsIoException`](dodo-payments-kotlin-core/src/main/kotlin/com/dodopayments/api/errors/DodoPaymentsIoException.kt): I/O networking errors.\n\n- [`DodoPaymentsRetryableException`](dodo-payments-kotlin-core/src/main/kotlin/com/dodopayments/api/errors/DodoPaymentsRetryableException.kt): Generic error indicating a failure that could be retried by the client.\n\n- [`DodoPaymentsInvalidDataException`](dodo-payments-kotlin-core/src/main/kotlin/com/dodopayments/api/errors/DodoPaymentsInvalidDataException.kt): Failure to interpret successfully parsed data. For example,       when accessing a property that\'s supposed to be required, but the API unexpectedly omitted it from the       response.\n\n- [`DodoPaymentsException`](dodo-payments-kotlin-core/src/main/kotlin/com/dodopayments/api/errors/DodoPaymentsException.kt): Base class for all exceptions. Most errors will result in one of the       previously mentioned ones, but completely generic errors may be thrown using the base class.\n\n## Pagination\n\nThe SDK defines methods that return a paginated lists of results. It provides convenient ways to access     the results either one page at a time or item-by-item across all pages.\n\n### Auto-pagination\n\nTo iterate through all results across all pages, use the `autoPager()` method, which automatically     fetches more pages as needed.\n\nWhen using the synchronous client, the method returns a [`Sequence`](https://kotlinlang.org/docs/sequences.html)\n\n```kotlin\nimport com.dodopayments.api.models.payments.PaymentListPage\n\nval page: PaymentListPage = client.payments().list()\npage.autoPager()\n    .take(50)\n    .forEach { payment -> println(payment) }\n```\n\nWhen using the asynchronous client, the method returns a [`Flow`](https://kotlinlang.org/docs/flow.html):\n\n```kotlin\nimport com.dodopayments.api.models.payments.PaymentListPageAsync\n\nval page: PaymentListPageAsync = client.async().payments().list()\npage.autoPager()\n    .take(50)\n    .forEach { payment -> println(payment) }\n```\n\n### Manual pagination\n\nTo access individual page items and manually request the next page, use the `items()`,\n`hasNextPage()`, and `nextPage()` methods:\n\n```kotlin\nimport com.dodopayments.api.models.payments.PaymentListPage\nimport com.dodopayments.api.models.payments.PaymentListResponse\n\nval page: PaymentListPage = client.payments().list()\nwhile (true) {\n    for (payment in page.items()) {\n        println(payment)\n    }\n\n    if (!page.hasNextPage()) {\n        break\n    }\n\n    page = page.nextPage()\n}\n```\n\n## Logging\n\nThe SDK uses the standard   [OkHttp logging interceptor](https://github.com/square/okhttp/tree/master/okhttp-logging-interceptor).\n\nEnable logging by setting the `DODO_PAYMENTS_LOG` environment variable to   `info`:\n\n```sh\nexport DODO_PAYMENTS_LOG=info\n```\n\nOr to `debug` for more verbose logging:\n\n```sh\nexport DODO_PAYMENTS_LOG=debug\n```\n\n## ProGuard and R8\n\nAlthough the SDK uses reflection, it is still usable with     [ProGuard](https://github.com/Guardsquare/proguard) and     [R8](https://developer.android.com/topic/performance/app-optimization/enable-app-optimization) because     `dodo-payments-kotlin-core` is published with a     [configuration file](dodo-payments-kotlin-core/src/main/resources/META-INF/proguard/dodo-payments-kotlin-core.pro) containing     [keep rules](https://www.guardsquare.com/manual/configuration/usage).\n\nProGuard and R8 should automatically detect and use the published rules, but you can also manually copy     the keep rules if necessary.\n\n\n\n\n\n## Jackson\n\nThe SDK depends on [Jackson](https://github.com/FasterXML/jackson) for JSON     serialization/deserialization. It is compatible with version 2.13.4 or higher,     but depends on version 2.18.2 by default.\n\nThe SDK throws an exception if it detects an incompatible Jackson version at runtime (e.g. if the     default version was overridden in your Maven or Gradle config).\n\nIf the SDK threw an exception, but you\'re _certain_ the version is compatible, then disable the version     check using the `checkJacksonVersionCompatibility` on [`DodoPaymentsOkHttpClient`](dodo-payments-kotlin-client-okhttp/src/main/kotlin/com/dodopayments/api/client/okhttp/DodoPaymentsOkHttpClient.kt) or     [`DodoPaymentsOkHttpClientAsync`](dodo-payments-kotlin-client-okhttp/src/main/kotlin/com/dodopayments/api/client/okhttp/DodoPaymentsOkHttpClientAsync.kt).\n\n> [!CAUTION]\n> We make no guarantee that the SDK works correctly when the Jackson version check is disabled.\n\nAlso note that there are bugs in older Jackson versions that can affect the SDK. We don\'t work around all     Jackson bugs ([example](https://github.com/FasterXML/jackson-databind/issues/3240)) and expect users to     upgrade Jackson for those instead.\n\n## Network options\n\n### Retries\n\nThe SDK automatically retries 2 times by default, with a short exponential backoff between requests.\n\nOnly the following error types are retried:\n- Connection errors (for example, due to a network connectivity problem)\n- 408 Request Timeout\n- 409 Conflict\n- 429 Rate Limit\n- 5xx Internal\n\nThe API may also explicitly instruct the SDK to retry or not retry a request.\n\nTo set a custom number of retries, configure the client using the `maxRetries` method:\n\n```kotlin\nimport com.dodopayments.api.client.DodoPaymentsClient\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient\n\nval client: DodoPaymentsClient = DodoPaymentsOkHttpClient.builder()\n    .fromEnv()\n    .maxRetries(4)\n    .build()\n```\n\n### Timeouts\n\nRequests time out after 1 minute by default.\n\nTo set a custom timeout, configure the method call using the `timeout` method:\n\n```kotlin\nimport com.dodopayments.api.models.checkoutsessions.CheckoutSessionResponse\n\nval checkoutSessionResponse: CheckoutSessionResponse = client.checkoutSessions().create(\n  params, RequestOptions.builder().timeout(Duration.ofSeconds(30)).build()\n)\n```\n\nOr configure the default for all method calls at the client level:\n\n```kotlin\nimport com.dodopayments.api.client.DodoPaymentsClient\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient\nimport java.time.Duration\n\nval client: DodoPaymentsClient = DodoPaymentsOkHttpClient.builder()\n    .fromEnv()\n    .timeout(Duration.ofSeconds(30))\n    .build()\n```\n\n### Proxies\n\nTo route requests through a proxy, configure the client using the `proxy` method:\n\n```kotlin\nimport com.dodopayments.api.client.DodoPaymentsClient\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient\nimport java.net.InetSocketAddress\nimport java.net.Proxy\n\nval client: DodoPaymentsClient = DodoPaymentsOkHttpClient.builder()\n    .fromEnv()\n    .proxy(Proxy(\n      Proxy.Type.HTTP, InetSocketAddress(\n        "https://example.com", 8080\n      )\n    ))\n    .build()\n```\n\n### Connection pooling\n\nTo customize the underlying OkHttp connection pool, configure the client using the   `maxIdleConnections` and `keepAliveDuration` methods:\n\n```kotlin\nimport com.dodopayments.api.client.DodoPaymentsClient\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient\nimport java.time.Duration\n\nval client: DodoPaymentsClient = DodoPaymentsOkHttpClient.builder()\n    .fromEnv()\n    // If `maxIdleConnections` is set, then `keepAliveDuration` must be set, and vice versa.\n    .maxIdleConnections(10)\n    .keepAliveDuration(Duration.ofMinutes(2))\n    .build()\n```\n\nIf both options are unset, OkHttp\'s default connection pool settings are used.\n\n### HTTPS\n\n> [!NOTE]\n> Most applications should not call these methods, and instead use the system defaults. The defaults include\n> special optimizations that can be lost if the implementations are modified.\n\nTo configure how HTTPS connections are secured, configure the client using the `sslSocketFactory`,   `trustManager`, and `hostnameVerifier` methods:\n\n```kotlin\nimport com.dodopayments.api.client.DodoPaymentsClient\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient\n\nval client: DodoPaymentsClient = DodoPaymentsOkHttpClient.builder()\n    .fromEnv()\n    // If `sslSocketFactory` is set, then `trustManager` must be set, and vice versa.\n    .sslSocketFactory(yourSSLSocketFactory)\n    .trustManager(yourTrustManager)\n    .hostnameVerifier(yourHostnameVerifier)\n    .build()\n```\n\n### Environments\n\nThe SDK sends requests to the live_mode by default. To send requests to a different     environment, configure the client like so:\n\n```kotlin\nimport com.dodopayments.api.client.DodoPaymentsClient\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient\n\nval client: DodoPaymentsClient = DodoPaymentsOkHttpClient.builder()\n    .fromEnv()\n    .testMode()\n    .build()\n```\n\n### Custom HTTP client\n\nThe SDK consists of three artifacts:\n- `dodo-payments-kotlin-core`\n  - Contains core SDK logic\n  - Does not depend on [OkHttp](https://square.github.io/okhttp)\n  - Exposes [`DodoPaymentsClient`](dodo-payments-kotlin-core/src/main/kotlin/com/dodopayments/api/client/DodoPaymentsClient.kt), [`DodoPaymentsClientAsync`](dodo-payments-kotlin-core/src/main/kotlin/com/dodopayments/api/client/DodoPaymentsClientAsync.kt),             [`DodoPaymentsClientImpl`](dodo-payments-kotlin-core/src/main/kotlin/com/dodopayments/api/client/DodoPaymentsClientImpl.kt), and [`DodoPaymentsClientAsyncImpl`](dodo-payments-kotlin-core/src/main/kotlin/com/dodopayments/api/client/DodoPaymentsClientAsyncImpl.kt), all of which can             work with any HTTP client\n- `dodo-payments-kotlin-client-okhttp`\n  - Depends on [OkHttp](https://square.github.io/okhttp)\n  - Exposes [`DodoPaymentsOkHttpClient`](dodo-payments-kotlin-client-okhttp/src/main/kotlin/com/dodopayments/api/client/okhttp/DodoPaymentsOkHttpClient.kt) and [`DodoPaymentsOkHttpClientAsync`](dodo-payments-kotlin-client-okhttp/src/main/kotlin/com/dodopayments/api/client/okhttp/DodoPaymentsOkHttpClientAsync.kt), which             provide a way to construct [`DodoPaymentsClientImpl`](dodo-payments-kotlin-core/src/main/kotlin/com/dodopayments/api/client/DodoPaymentsClientImpl.kt) and             [`DodoPaymentsClientAsyncImpl`](dodo-payments-kotlin-core/src/main/kotlin/com/dodopayments/api/client/DodoPaymentsClientAsyncImpl.kt), respectively, using OkHttp\n- `dodo-payments-kotlin`\n  - Depends on and exposes the APIs of both `dodo-payments-kotlin-core` and `dodo-payments-kotlin-client-okhttp`\n  - Does not have its own logic\n\nThis structure allows replacing the SDK\'s default HTTP client without pulling in unnecessary dependencies.\n\n#### Customized [`OkHttpClient`](https://square.github.io/okhttp/3.x/okhttp/okhttp3/OkHttpClient.html)\n\n> [!TIP]\n> Try the available [network options](#network-options) before replacing the default client.\n\nTo use a customized `OkHttpClient`:\n\n1. Replace your [`dodo-payments-kotlin` dependency](#installation) with `dodo-payments-kotlin-core`\n2. Copy `dodo-payments-kotlin-client-okhttp`\'s [`OkHttpClient`](dodo-payments-kotlin-client-okhttp/src/main/kotlin/com/dodopayments/api/client/okhttp/OkHttpClient.kt) class into your code and        customize it\n3. Construct [`DodoPaymentsClientImpl`](dodo-payments-kotlin-core/src/main/kotlin/com/dodopayments/api/client/DodoPaymentsClientImpl.kt) or [`DodoPaymentsClientAsyncImpl`](dodo-payments-kotlin-core/src/main/kotlin/com/dodopayments/api/client/DodoPaymentsClientAsyncImpl.kt), similarly to        [`DodoPaymentsOkHttpClient`](dodo-payments-kotlin-client-okhttp/src/main/kotlin/com/dodopayments/api/client/okhttp/DodoPaymentsOkHttpClient.kt) or [`DodoPaymentsOkHttpClientAsync`](dodo-payments-kotlin-client-okhttp/src/main/kotlin/com/dodopayments/api/client/okhttp/DodoPaymentsOkHttpClientAsync.kt), using your        customized client\n\n### Completely custom HTTP client\n\nTo use a completely custom HTTP client:\n\n1. Replace your [`dodo-payments-kotlin` dependency](#installation) with `dodo-payments-kotlin-core`\n2. Write a class that implements the [`HttpClient`](dodo-payments-kotlin-core/src/main/kotlin/com/dodopayments/api/core/http/HttpClient.kt) interface\n3. Construct [`DodoPaymentsClientImpl`](dodo-payments-kotlin-core/src/main/kotlin/com/dodopayments/api/client/DodoPaymentsClientImpl.kt) or [`DodoPaymentsClientAsyncImpl`](dodo-payments-kotlin-core/src/main/kotlin/com/dodopayments/api/client/DodoPaymentsClientAsyncImpl.kt), similarly to        [`DodoPaymentsOkHttpClient`](dodo-payments-kotlin-client-okhttp/src/main/kotlin/com/dodopayments/api/client/okhttp/DodoPaymentsOkHttpClient.kt) or [`DodoPaymentsOkHttpClientAsync`](dodo-payments-kotlin-client-okhttp/src/main/kotlin/com/dodopayments/api/client/okhttp/DodoPaymentsOkHttpClientAsync.kt), using your new        client class\n\n## Undocumented API functionality\n\nThe SDK is typed for convenient usage of the documented API. However, it also supports working with undocumented or not yet supported parts of the API.\n\n### Parameters\n\nTo set undocumented parameters, call the `putAdditionalHeader`, `putAdditionalQueryParam`, or       `putAdditionalBodyProperty` methods on any `Params` class:\n\n```kotlin\nimport com.dodopayments.api.core.JsonValue\nimport com.dodopayments.api.models.checkoutsessions.CheckoutSessionCreateParams\n\nval params: CheckoutSessionCreateParams = CheckoutSessionCreateParams.builder()\n    .putAdditionalHeader("Secret-Header", "42")\n    .putAdditionalQueryParam("secret_query_param", "42")\n    .putAdditionalBodyProperty("secretProperty", JsonValue.from("42"))\n    .build()\n```\n\nThese can be accessed on the built object later using the `_additionalHeaders()`,       `_additionalQueryParams()`, and `_additionalBodyProperties()` methods.\n\nTo set a documented parameter or property to an undocumented or not yet supported _value_, pass a       [`JsonValue`](dodo-payments-kotlin-core/src/main/kotlin/com/dodopayments/api/core/Values.kt) object to its setter:\n\n```kotlin\nimport com.dodopayments.api.models.checkoutsessions.CheckoutSessionCreateParams\nimport com.dodopayments.api.models.checkoutsessions.CheckoutSessionRequest\nimport com.dodopayments.api.models.checkoutsessions.ProductItemReq\n\nval params: CheckoutSessionCreateParams = CheckoutSessionCreateParams.builder()\n    .checkoutSessionRequest(CheckoutSessionRequest.builder()\n        .addProductCart(ProductItemReq.builder()\n            .productId("product_id")\n            .quantity(0)\n            .build())\n        .build())\n    .build()\n```\n\nThe most straightforward way to create a [`JsonValue`](dodo-payments-kotlin-core/src/main/kotlin/com/dodopayments/api/core/Values.kt) is using its       `from(...)` method:\n\n```kotlin\nimport com.dodopayments.api.core.JsonValue\n\n// Create primitive JSON values\nval nullValue: JsonValue = JsonValue.from(null)\nval booleanValue: JsonValue = JsonValue.from(true)\nval numberValue: JsonValue = JsonValue.from(42)\nval stringValue: JsonValue = JsonValue.from("Hello World!")\n\n// Create a JSON array value equivalent to `["Hello", "World"]`\nval arrayValue: JsonValue = JsonValue.from(listOf(\n  "Hello", "World"\n))\n\n// Create a JSON object value equivalent to `{ "a": 1, "b": 2 }`\nval objectValue: JsonValue = JsonValue.from(mapOf(\n  "a" to 1, "b" to 2\n))\n\n// Create an arbitrarily nested JSON equivalent to:\n// {\n//   "a": [1, 2],\n//   "b": [3, 4]\n// }\nval complexValue: JsonValue = JsonValue.from(mapOf(\n  "a" to listOf(\n    1, 2\n  ), "b" to listOf(\n    3, 4\n  )\n))\n```\n\nNormally a `Builder` class\'s `build` method will throw         [`IllegalStateException`](https://docs.oracle.com/javase/8/docs/api/java/lang/IllegalStateException.html)         if any required parameter or property is unset.\n\nTo forcibly omit a required parameter or property, pass [`JsonMissing`](dodo-payments-kotlin-core/src/main/kotlin/com/dodopayments/api/core/Values.kt):\n\n```kotlin\nimport com.dodopayments.api.core.JsonMissing\nimport com.dodopayments.api.models.checkoutsessions.CheckoutSessionCreateParams\nimport com.dodopayments.api.models.checkoutsessions.CheckoutSessionRequest\nimport com.dodopayments.api.models.checkoutsessions.ProductItemReq\n\nval params: CheckoutSessionCreateParams = CheckoutSessionCreateParams.builder()\n    .checkoutSessionRequest(CheckoutSessionRequest.builder()\n        .addProductCart(ProductItemReq.builder()\n            .productId("product_id")\n            .quantity(0)\n            .build())\n        .build())\n    .productCart(JsonMissing.of())\n    .build()\n```\n\n### Response properties\n\nTo access undocumented response properties, call the `_additionalProperties()` method:\n\n```kotlin\nimport com.dodopayments.api.core.JsonBoolean\nimport com.dodopayments.api.core.JsonNull\nimport com.dodopayments.api.core.JsonNumber\nimport com.dodopayments.api.core.JsonValue\n\nval additionalProperties: Map<String, JsonValue> = client.checkoutSessions().create(params)._additionalProperties()\nval secretPropertyValue: JsonValue = additionalProperties.get("secretProperty")\n\nval result = when (secretPropertyValue) {\n    is JsonNull -> "It\'s null!"\n    is JsonBoolean -> "It\'s a boolean!"\n    is JsonNumber -> "It\'s a number!"\n    // Other types include `JsonMissing`, `JsonString`, `JsonArray`, and `JsonObject`\n    else -> "It\'s something else!"\n}\n```\n\nTo access a property\'s raw JSON value, which may be undocumented, call its `_` prefixed method:\n\n```kotlin\nimport com.dodopayments.api.core.JsonField\n\nval field: JsonField<Any> = client.checkoutSessions().create(params)._field()\n\nif (field.isMissing()) {\n  // The property is absent from the JSON response\n} else if (field.isNull()) {\n  // The property was set to literal null\n} else {\n  // Check if value was provided as a string\n  // Other methods include `asNumber()`, `asBoolean()`, etc.\n  val jsonString: String? = field.asString();\n\n  // Try to deserialize into a custom type\n  val myObject: MyClass = field.asUnknown()!!.convert(MyClass::class.java)\n}\n```\n\n### Response validation\n\nIn rare cases, the API may return a response that doesn\'t match the expected type. For example, the SDK     may expect a property to contain a `String`, but the API could return something else.\n\nBy default, the SDK will not throw an exception in this case. It will throw     [`DodoPaymentsInvalidDataException`](dodo-payments-kotlin-core/src/main/kotlin/com/dodopayments/api/errors/DodoPaymentsInvalidDataException.kt) only if you directly access the property.\n\nIf you would prefer to check that the response is completely well-typed upfront, then either call     `validate()`:\n\n```kotlin\nimport com.dodopayments.api.models.checkoutsessions.CheckoutSessionResponse\n\nval checkoutSessionResponse: CheckoutSessionResponse = client.checkoutSessions().create(params).validate()\n```\n\nOr configure the method call to validate the response using the `responseValidation` method:\n\n```kotlin\nimport com.dodopayments.api.models.checkoutsessions.CheckoutSessionResponse\n\nval checkoutSessionResponse: CheckoutSessionResponse = client.checkoutSessions().create(\n  params, RequestOptions.builder().responseValidation(true).build()\n)\n```\n\nOr configure the default for all method calls at the client level:\n\n```kotlin\nimport com.dodopayments.api.client.DodoPaymentsClient\nimport com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient\n\nval client: DodoPaymentsClient = DodoPaymentsOkHttpClient.builder()\n    .fromEnv()\n    .responseValidation(true)\n    .build()\n```\n\n## FAQ\n\n### Why don\'t you use plain `enum` classes?\n\nKotlin `enum` classes are not trivially   [forwards compatible](https://www.stainless.com/blog/making-java-enums-forwards-compatible). Using them in   the SDK could cause runtime exceptions if the API is updated to respond with a new enum value.\n\n### Why do you represent fields using `JsonField<T>` instead of just plain `T`?\n\nUsing `JsonField<T>` enables a few features:\n\n- Allowing usage of [undocumented API functionality](#undocumented-api-functionality)\n- Lazily [validating the API response against the expected shape](#response-validation)\n- Representing absent vs explicitly null values\n\n### Why don\'t you use [`data` classes](https://kotlinlang.org/docs/data-classes.html)?\n\nIt is not [backwards compatible to add new fields to a data class](https://kotlinlang.org/docs/api-guidelines-backward-compatibility.html#avoid-using-data-classes-in-your-api)   and we don\'t want to introduce a breaking change every time we add a field to a class.\n\n### Why don\'t you use checked exceptions?\n\nChecked exceptions are widely considered a mistake in the Java programming language. In fact, they were   omitted from Kotlin for this reason.\n\nChecked exceptions:\n\n- Are verbose to handle\n- Encourage error handling at the wrong level of abstraction, where nothing can be done about the error\n- Are tedious to propagate due to the [function coloring problem](https://journal.stuffwithstuff.com/2015/02/01/what-color-is-your-function)\n- Don\'t play well with lambdas (also due to the function coloring problem)\n\n## Semantic versioning\n\nThis package generally follows [SemVer](https://semver.org/spec/v2.0.0.html) conventions, though certain backwards-incompatible changes may be released as minor versions:\n\n1. Changes to library internals which are technically public but not intended or documented for external use. _(Please open a GitHub issue to let us know if you are relying on such internals.)_\n2. Changes that we do not expect to impact the vast majority of users in practice.\n\nWe take backwards-compatibility seriously and work hard to ensure you can rely on a smooth upgrade experience.\n\nWe are keen for your feedback; please open an [issue](https://www.github.com/dodopayments/dodopayments-kotlin/issues) with questions, bugs, or suggestions.\n',
  },
  {
    language: 'php',
    content:
      "# Dodo Payments PHP API Library\n\nThe Dodo Payments PHP library provides convenient access to the Dodo Payments REST API from any PHP 8.1.0+ application.\n\n## Installation\n\n<!-- x-release-please-start-version -->\n```\ncomposer require \"dodopayments/client 0.0.1\"\n```\n<!-- x-release-please-end -->\n\n## Usage\n\n```php\n<?php\n\n$client = new Client(\n  bearerToken: getenv('DODO_PAYMENTS_API_KEY') ?: 'My Bearer Token',\n  environment: 'test_mode',\n);\n\n$checkoutSessionResponse = $client->checkoutSessions->create(\n  productCart: [['productID' => 'product_id', 'quantity' => 0]]\n);\n\nvar_dump($checkoutSessionResponse->session_id);\n```",
  },
  {
    language: 'python',
    content:
      '# Dodo Payments Python API library\n\n<!-- prettier-ignore -->\n[![PyPI version](https://img.shields.io/pypi/v/dodopayments.svg?label=pypi%20(stable))](https://pypi.org/project/dodopayments/)\n\nThe Dodo Payments Python library provides convenient access to the Dodo Payments REST API from any Python 3.9+\napplication. The library includes type definitions for all request params and response fields,\nand offers both synchronous and asynchronous clients powered by [httpx](https://github.com/encode/httpx).\n\n\n\nIt is generated with [Stainless](https://www.stainless.com/).\n\n## MCP Server\n\nUse the Dodo Payments MCP Server to enable AI assistants to interact with this API, allowing them to explore endpoints, make test requests, and use documentation to help integrate this SDK into your application.\n\n[![Add to Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/en-US/install-mcp?name=dodopayments-mcp&config=eyJjb21tYW5kIjoibnB4IiwiYXJncyI6WyIteSIsImRvZG9wYXltZW50cy1tY3AiXSwiZW52Ijp7IkRPRE9fUEFZTUVOVFNfQVBJX0tFWSI6Ik15IEJlYXJlciBUb2tlbiIsIkRPRE9fUEFZTUVOVFNfV0VCSE9PS19LRVkiOiJNeSBXZWJob29rIEtleSJ9fQ)\n[![Install in VS Code](https://img.shields.io/badge/_-Add_to_VS_Code-blue?style=for-the-badge&logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCA0MCA0MCI+PHBhdGggZmlsbD0iI0VFRSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMzAuMjM1IDM5Ljg4NGEyLjQ5MSAyLjQ5MSAwIDAgMS0xLjc4MS0uNzNMMTIuNyAyNC43OGwtMy40NiAyLjYyNC0zLjQwNiAyLjU4MmExLjY2NSAxLjY2NSAwIDAgMS0xLjA4Mi4zMzggMS42NjQgMS42NjQgMCAwIDEtMS4wNDYtLjQzMWwtMi4yLTJhMS42NjYgMS42NjYgMCAwIDEgMC0yLjQ2M0w3LjQ1OCAyMCA0LjY3IDE3LjQ1MyAxLjUwNyAxNC41N2ExLjY2NSAxLjY2NSAwIDAgMSAwLTIuNDYzbDIuMi0yYTEuNjY1IDEuNjY1IDAgMCAxIDIuMTMtLjA5N2w2Ljg2MyA1LjIwOUwyOC40NTIuODQ0YTIuNDg4IDIuNDg4IDAgMCAxIDEuODQxLS43MjljLjM1MS4wMDkuNjk5LjA5MSAxLjAxOS4yNDVsOC4yMzYgMy45NjFhMi41IDIuNSAwIDAgMSAxLjQxNSAyLjI1M3YuMDk5LS4wNDVWMzMuMzd2LS4wNDUuMDk1YTIuNTAxIDIuNTAxIDAgMCAxLTEuNDE2IDIuMjU3bC04LjIzNSAzLjk2MWEyLjQ5MiAyLjQ5MiAwIDAgMS0xLjA3Ny4yNDZabS43MTYtMjguOTQ3LTExLjk0OCA5LjA2MiAxMS45NTIgOS4wNjUtLjAwNC0xOC4xMjdaIi8+PC9zdmc+)](https://vscode.stainless.com/mcp/%7B%22name%22%3A%22dodopayments-mcp%22%2C%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22dodopayments-mcp%22%5D%2C%22env%22%3A%7B%22DODO_PAYMENTS_API_KEY%22%3A%22My%20Bearer%20Token%22%2C%22DODO_PAYMENTS_WEBHOOK_KEY%22%3A%22My%20Webhook%20Key%22%7D%7D)\n\n> Note: You may need to set environment variables in your MCP client.\n\n## Documentation\n\nThe REST API documentation can be found on [docs.dodopayments.com](https://docs.dodopayments.com/api-reference/introduction). The full API of this library can be found in [api.md](api.md).\n\n## Installation\n\n```sh\n# install from PyPI\npip install dodopayments\n```\n\n## Usage\n\nThe full API of this library can be found in [api.md](api.md).\n\n```python\nimport os\nfrom dodopayments import DodoPayments\n\nclient = DodoPayments(\n    bearer_token=os.environ.get("DODO_PAYMENTS_API_KEY"),  # This is the default and can be omitted\n    # defaults to "live_mode".\n    environment="test_mode",\n)\n\ncheckout_session_response = client.checkout_sessions.create(\n    product_cart=[{\n        "product_id": "product_id",\n        "quantity": 0,\n    }],\n)\nprint(checkout_session_response.session_id)\n```\n\nWhile you can provide a `bearer_token` keyword argument,\nwe recommend using [python-dotenv](https://pypi.org/project/python-dotenv/)\nto add `DODO_PAYMENTS_API_KEY="My Bearer Token"` to your `.env` file\nso that your Bearer Token is not stored in source control.\n\n## Async usage\n\nSimply import `AsyncDodoPayments` instead of `DodoPayments` and use `await` with each API call:\n\n```python\nimport os\nimport asyncio\nfrom dodopayments import AsyncDodoPayments\n\nclient = AsyncDodoPayments(\n    bearer_token=os.environ.get("DODO_PAYMENTS_API_KEY"),  # This is the default and can be omitted\n    # defaults to "live_mode".\n    environment="test_mode",\n)\n\nasync def main() -> None:\n  checkout_session_response = await client.checkout_sessions.create(\n      product_cart=[{\n          "product_id": "product_id",\n          "quantity": 0,\n      }],\n  )\n  print(checkout_session_response.session_id)\n\nasyncio.run(main())\n```\n\nFunctionality between the synchronous and asynchronous clients is otherwise identical.\n\n### With aiohttp\n\nBy default, the async client uses `httpx` for HTTP requests. However, for improved concurrency performance you may also use `aiohttp` as the HTTP backend.\n\nYou can enable this by installing `aiohttp`:\n\n```sh\n# install from PyPI\npip install dodopayments[aiohttp]\n```\n\nThen you can enable it by instantiating the client with `http_client=DefaultAioHttpClient()`:\n\n```python\nimport os\nimport asyncio\nfrom dodopayments import DefaultAioHttpClient\nfrom dodopayments import AsyncDodoPayments\n\nasync def main() -> None:\n  async with AsyncDodoPayments(\n    bearer_token=os.environ.get("DODO_PAYMENTS_API_KEY"),  # This is the default and can be omitted\n    http_client=DefaultAioHttpClient(),\n) as client:\n    checkout_session_response = await client.checkout_sessions.create(\n        product_cart=[{\n            "product_id": "product_id",\n            "quantity": 0,\n        }],\n    )\n    print(checkout_session_response.session_id)\n\nasyncio.run(main())\n```\n\n\n\n## Using types\n\nNested request parameters are [TypedDicts](https://docs.python.org/3/library/typing.html#typing.TypedDict). Responses are [Pydantic models](https://docs.pydantic.dev) which also provide helper methods for things like:\n\n- Serializing back into JSON, `model.to_json()`\n- Converting to a dictionary, `model.to_dict()`\n\nTyped requests and responses provide autocomplete and documentation within your editor. If you would like to see type errors in VS Code to help catch bugs earlier, set `python.analysis.typeCheckingMode` to `basic`.\n\n## Pagination\n\nList methods in the Dodo Payments API are paginated.\n\nThis library provides auto-paginating iterators with each list response, so you do not have to request successive pages manually:\n\n```python\nfrom dodopayments import DodoPayments\n\nclient = DodoPayments()\n\nall_payments = []\n# Automatically fetches more pages as needed.\nfor payment in client.payments.list():\n    # Do something with payment here\n    all_payments.append(payment)\nprint(all_payments)\n```\n\nOr, asynchronously:\n\n```python\nimport asyncio\nfrom dodopayments import AsyncDodoPayments\n\nclient = AsyncDodoPayments()\n\nasync def main() -> None:\n    all_payments = []\n    # Iterate through items across all pages, issuing requests as needed.\n    async for payment in client.payments.list():\n        all_payments.append(payment)\n    print(all_payments)\n\nasyncio.run(main())\n```\n\nAlternatively, you can use the `.has_next_page()`, `.next_page_info()`, or  `.get_next_page()` methods for more granular control working with pages:\n\n```python\nfirst_page = await client.payments.list()\nif first_page.has_next_page():\n    print(f"will fetch next page using these details: {first_page.next_page_info()}")\n    next_page = await first_page.get_next_page()\n    print(f"number of items we just fetched: {len(next_page.items)}")\n\n# Remove `await` for non-async usage.\n```\n\nOr just work directly with the returned data:\n\n```python\nfirst_page = await client.payments.list()\nfor payment in first_page.items:\n    print(payment.brand_id)\n\n# Remove `await` for non-async usage.\n```\n\n## Nested params\n\nNested parameters are dictionaries, typed using `TypedDict`, for example:\n\n```python\nfrom dodopayments import DodoPayments\n\nclient = DodoPayments()\n\ncheckout_session_response = client.checkout_sessions.create(\n    product_cart=[{\n        "product_id": "product_id",\n        "quantity": 0,\n    }],\n    billing_address={\n        "country": "AF"\n    },\n)\nprint(checkout_session_response.billing_address)\n```\n\n\n\n## Handling errors\n\nWhen the library is unable to connect to the API (for example, due to network connection problems or a timeout), a subclass of `dodopayments.APIConnectionError` is raised.\n\nWhen the API returns a non-success status code (that is, 4xx or 5xx\nresponse), a subclass of `dodopayments.APIStatusError` is raised, containing `status_code` and `response` properties.\n\nAll errors inherit from `dodopayments.APIError`.\n\n```python\nimport dodopayments\nfrom dodopayments import DodoPayments\n\nclient = DodoPayments()\n\ntry:\n    client.checkout_sessions.create(\n        product_cart=[{\n            "product_id": "product_id",\n            "quantity": 0,\n        }],\n    )\nexcept dodopayments.APIConnectionError as e:\n    print("The server could not be reached")\n    print(e.__cause__) # an underlying Exception, likely raised within httpx.\nexcept dodopayments.RateLimitError as e:\n    print("A 429 status code was received; we should back off a bit.")\nexcept dodopayments.APIStatusError as e:\n    print("Another non-200-range status code was received")\n    print(e.status_code)\n    print(e.response)\n```\n\nError codes are as follows:\n\n| Status Code | Error Type                 |\n| ----------- | -------------------------- |\n| 400         | `BadRequestError`          |\n| 401         | `AuthenticationError`      |\n| 403         | `PermissionDeniedError`    |\n| 404         | `NotFoundError`            |\n| 422         | `UnprocessableEntityError` |\n| 429         | `RateLimitError`           |\n| >=500       | `InternalServerError`      |\n| N/A         | `APIConnectionError`       |\n\n### Retries\n\nCertain errors are automatically retried 2 times by default, with a short exponential backoff.\nConnection errors (for example, due to a network connectivity problem), 408 Request Timeout, 409 Conflict,\n429 Rate Limit, and >=500 Internal errors are all retried by default.\n\nYou can use the `max_retries` option to configure or disable retry settings:\n\n```python\nfrom dodopayments import DodoPayments\n\n# Configure the default for all requests:\nclient = DodoPayments(\n    # default is 2\n    max_retries=0,\n)\n\n# Or, configure per-request:\nclient.with_options(max_retries = 5).checkout_sessions.create(\n    product_cart=[{\n        "product_id": "product_id",\n        "quantity": 0,\n    }],\n)\n```\n\n### Timeouts\n\nBy default requests time out after 1 minute. You can configure this with a `timeout` option,\nwhich accepts a float or an [`httpx.Timeout`](https://www.python-httpx.org/advanced/timeouts/#fine-tuning-the-configuration) object:\n\n```python\nfrom dodopayments import DodoPayments\n\n# Configure the default for all requests:\nclient = DodoPayments(\n    # 20 seconds (default is 1 minute)\n    timeout=20.0,\n)\n\n# More granular control:\nclient = DodoPayments(\n    timeout=httpx.Timeout(60.0, read=5.0, write=10.0, connect=2.0),\n)\n\n# Override per-request:\nclient.with_options(timeout = 5.0).checkout_sessions.create(\n    product_cart=[{\n        "product_id": "product_id",\n        "quantity": 0,\n    }],\n)\n```\n\nOn timeout, an `APITimeoutError` is thrown.\n\nNote that requests that time out are [retried twice by default](#retries).\n\n\n\n## Advanced\n\n### Logging\n\nWe use the standard library [`logging`](https://docs.python.org/3/library/logging.html) module.\n\nYou can enable logging by setting the environment variable `DODO_PAYMENTS_LOG` to `info`.\n\n```shell\n$ export DODO_PAYMENTS_LOG=info\n```\n\nOr to `debug` for more verbose logging.\n\n### How to tell whether `None` means `null` or missing\n\nIn an API response, a field may be explicitly `null`, or missing entirely; in either case, its value is `None` in this library. You can differentiate the two cases with `.model_fields_set`:\n\n```py\nif response.my_field is None:\n  if \'my_field\' not in response.model_fields_set:\n    print(\'Got json like {}, without a "my_field" key present at all.\')\n  else:\n    print(\'Got json like {"my_field": null}.\')\n```\n\n### Accessing raw response data (e.g. headers)\n\nThe "raw" Response object can be accessed by prefixing `.with_raw_response.` to any HTTP method call, e.g.,\n\n```py\nfrom dodopayments import DodoPayments\n\nclient = DodoPayments()\nresponse = client.checkout_sessions.with_raw_response.create(\n    product_cart=[{\n        "product_id": "product_id",\n        "quantity": 0,\n    }],\n)\nprint(response.headers.get(\'X-My-Header\'))\n\ncheckout_session = response.parse()  # get the object that `checkout_sessions.create()` would have returned\nprint(checkout_session.session_id)\n```\n\nThese methods return an [`APIResponse`](https://github.com/dodopayments/dodopayments-python/tree/main/src/dodopayments/_response.py) object.\n\nThe async client returns an [`AsyncAPIResponse`](https://github.com/dodopayments/dodopayments-python/tree/main/src/dodopayments/_response.py) with the same structure, the only difference being `await`able methods for reading the response content.\n\n#### `.with_streaming_response`\n\nThe above interface eagerly reads the full response body when you make the request, which may not always be what you want.\n\nTo stream the response body, use `.with_streaming_response` instead, which requires a context manager and only reads the response body once you call `.read()`, `.text()`, `.json()`, `.iter_bytes()`, `.iter_text()`, `.iter_lines()` or `.parse()`. In the async client, these are async methods.\n\n```python\nwith client.checkout_sessions.with_streaming_response.create(\n    product_cart=[{\n        "product_id": "product_id",\n        "quantity": 0,\n    }],\n) as response :\n    print(response.headers.get(\'X-My-Header\'))\n\n    for line in response.iter_lines():\n      print(line)\n```\n\nThe context manager is required so that the response will reliably be closed.\n\n### Making custom/undocumented requests\n\nThis library is typed for convenient access to the documented API.\n\nIf you need to access undocumented endpoints, params, or response properties, the library can still be used.\n\n#### Undocumented endpoints\n\nTo make requests to undocumented endpoints, you can make requests using `client.get`, `client.post`, and other\nhttp verbs. Options on the client will be respected (such as retries) when making this request.\n\n```py\nimport httpx\n\nresponse = client.post(\n    "/foo",\n    cast_to=httpx.Response,\n    body={"my_param": True},\n)\n\nprint(response.headers.get("x-foo"))\n```\n\n#### Undocumented request params\n\nIf you want to explicitly send an extra param, you can do so with the `extra_query`, `extra_body`, and `extra_headers` request\noptions.\n\n#### Undocumented response properties\n\nTo access undocumented response properties, you can access the extra fields like `response.unknown_prop`. You\ncan also get all the extra fields on the Pydantic model as a dict with\n[`response.model_extra`](https://docs.pydantic.dev/latest/api/base_model/#pydantic.BaseModel.model_extra).\n\n### Configuring the HTTP client\n\nYou can directly override the [httpx client](https://www.python-httpx.org/api/#client) to customize it for your use case, including:\n\n- Support for [proxies](https://www.python-httpx.org/advanced/proxies/)\n- Custom [transports](https://www.python-httpx.org/advanced/transports/)\n- Additional [advanced](https://www.python-httpx.org/advanced/clients/) functionality\n\n```python\nimport httpx\nfrom dodopayments import DodoPayments, DefaultHttpxClient\n\nclient = DodoPayments(\n    # Or use the `DODO_PAYMENTS_BASE_URL` env var\n    base_url="http://my.test.server.example.com:8083",\n    http_client=DefaultHttpxClient(proxy="http://my.test.proxy.example.com", transport=httpx.HTTPTransport(local_address="0.0.0.0")),\n)\n```\n\nYou can also customize the client on a per-request basis by using `with_options()`:\n\n```python\nclient.with_options(http_client=DefaultHttpxClient(...))\n```\n\n### Managing HTTP resources\n\nBy default the library closes underlying HTTP connections whenever the client is [garbage collected](https://docs.python.org/3/reference/datamodel.html#object.__del__). You can manually close the client using the `.close()` method if desired, or with a context manager that closes when exiting.\n\n```py\nfrom dodopayments import DodoPayments\n\nwith DodoPayments() as client:\n  # make requests here\n  ...\n\n# HTTP client is now closed\n```\n\n## Versioning\n\nThis package generally follows [SemVer](https://semver.org/spec/v2.0.0.html) conventions, though certain backwards-incompatible changes may be released as minor versions:\n\n1. Changes that only affect static types, without breaking runtime behavior.\n2. Changes to library internals which are technically public but not intended or documented for external use. _(Please open a GitHub issue to let us know if you are relying on such internals.)_\n3. Changes that we do not expect to impact the vast majority of users in practice.\n\nWe take backwards-compatibility seriously and work hard to ensure you can rely on a smooth upgrade experience.\n\nWe are keen for your feedback; please open an [issue](https://www.github.com/dodopayments/dodopayments-python/issues) with questions, bugs, or suggestions.\n\n### Determining the installed version\n\nIf you\'ve upgraded to the latest version but aren\'t seeing any new features you were expecting then your python environment is likely still using an older version.\n\nYou can determine the version that is being used at runtime with:\n\n```py\nimport dodopayments\nprint(dodopayments.__version__)\n```\n\n## Requirements\n\nPython 3.9 or higher.\n\n## Contributing\n\nSee [the contributing documentation](./CONTRIBUTING.md).\n',
  },
  {
    language: 'ruby',
    content:
      '# Dodo Payments Ruby API library\n\nThe Dodo Payments Ruby library provides convenient access to the Dodo Payments REST API from any Ruby 3.2.0+ application. It ships with comprehensive types & docstrings in Yard, RBS, and RBI – [see below](https://github.com/dodopayments/dodopayments-ruby#Sorbet) for usage with Sorbet. The standard library\'s `net/http` is used as the HTTP transport, with connection pooling via the `connection_pool` gem.\n\n\n\nIt is generated with [Stainless](https://www.stainless.com/).\n\n## MCP Server\n\nUse the Dodo Payments MCP Server to enable AI assistants to interact with this API, allowing them to explore endpoints, make test requests, and use documentation to help integrate this SDK into your application.\n\n[![Add to Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/en-US/install-mcp?name=dodopayments-mcp&config=eyJjb21tYW5kIjoibnB4IiwiYXJncyI6WyIteSIsImRvZG9wYXltZW50cy1tY3AiXSwiZW52Ijp7IkRPRE9fUEFZTUVOVFNfQVBJX0tFWSI6Ik15IEJlYXJlciBUb2tlbiIsIkRPRE9fUEFZTUVOVFNfV0VCSE9PS19LRVkiOiJNeSBXZWJob29rIEtleSJ9fQ)\n[![Install in VS Code](https://img.shields.io/badge/_-Add_to_VS_Code-blue?style=for-the-badge&logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCA0MCA0MCI+PHBhdGggZmlsbD0iI0VFRSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMzAuMjM1IDM5Ljg4NGEyLjQ5MSAyLjQ5MSAwIDAgMS0xLjc4MS0uNzNMMTIuNyAyNC43OGwtMy40NiAyLjYyNC0zLjQwNiAyLjU4MmExLjY2NSAxLjY2NSAwIDAgMS0xLjA4Mi4zMzggMS42NjQgMS42NjQgMCAwIDEtMS4wNDYtLjQzMWwtMi4yLTJhMS42NjYgMS42NjYgMCAwIDEgMC0yLjQ2M0w3LjQ1OCAyMCA0LjY3IDE3LjQ1MyAxLjUwNyAxNC41N2ExLjY2NSAxLjY2NSAwIDAgMSAwLTIuNDYzbDIuMi0yYTEuNjY1IDEuNjY1IDAgMCAxIDIuMTMtLjA5N2w2Ljg2MyA1LjIwOUwyOC40NTIuODQ0YTIuNDg4IDIuNDg4IDAgMCAxIDEuODQxLS43MjljLjM1MS4wMDkuNjk5LjA5MSAxLjAxOS4yNDVsOC4yMzYgMy45NjFhMi41IDIuNSAwIDAgMSAxLjQxNSAyLjI1M3YuMDk5LS4wNDVWMzMuMzd2LS4wNDUuMDk1YTIuNTAxIDIuNTAxIDAgMCAxLTEuNDE2IDIuMjU3bC04LjIzNSAzLjk2MWEyLjQ5MiAyLjQ5MiAwIDAgMS0xLjA3Ny4yNDZabS43MTYtMjguOTQ3LTExLjk0OCA5LjA2MiAxMS45NTIgOS4wNjUtLjAwNC0xOC4xMjdaIi8+PC9zdmc+)](https://vscode.stainless.com/mcp/%7B%22name%22%3A%22dodopayments-mcp%22%2C%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22dodopayments-mcp%22%5D%2C%22env%22%3A%7B%22DODO_PAYMENTS_API_KEY%22%3A%22My%20Bearer%20Token%22%2C%22DODO_PAYMENTS_WEBHOOK_KEY%22%3A%22My%20Webhook%20Key%22%7D%7D)\n\n> Note: You may need to set environment variables in your MCP client.\n\n## Documentation\n\nDocumentation for releases of this gem can be found [on RubyDoc](https://gemdocs.org/gems/dodopayments).\n\nThe REST API documentation can be found on [docs.dodopayments.com](https://docs.dodopayments.com/api-reference/introduction).\n\n## Installation\n\nTo use this gem, install via Bundler by adding the following to your application\'s `Gemfile`:\n\n<!-- x-release-please-start-version -->\n\n```ruby\ngem "dodopayments", "~> 0.0.1"\n```\n\n<!-- x-release-please-end -->\n\n## Usage\n\n```ruby\nrequire "bundler/setup"\nrequire "dodopayments"\n\ndodo_payments = Dodopayments::Client.new(\n  bearer_token: ENV["DODO_PAYMENTS_API_KEY"], # This is the default and can be omitted\n  environment: "test_mode" # defaults to "live_mode"\n)\n\ncheckout_session_response = dodo_payments.checkout_sessions.create(product_cart: [{product_id: "product_id", quantity: 0}])\n\nputs(checkout_session_response.session_id)\n```\n\n\n\n### Pagination\n\nList methods in the Dodo Payments API are paginated.\n\nThis library provides auto-paginating iterators with each list response, so you do not have to request successive pages manually:\n\n```ruby\npage = dodo_payments.payments.list\n\n# Fetch single item from page.\npayment = page.items[0]\nputs(payment.brand_id)\n\n# Automatically fetches more pages as needed.\npage.auto_paging_each do |payment|\n  puts(payment.brand_id)\nend\n```\n\nAlternatively, you can use the `#next_page?` and `#next_page` methods for more granular control working with pages.\n\n```ruby\nif page.next_page?\n  new_page = page.next_page\n  puts(new_page.items[0].brand_id)\nend\n```\n\n\n\n### Handling errors\n\nWhen the library is unable to connect to the API, or if the API returns a non-success status code (i.e., 4xx or 5xx response), a subclass of `Dodopayments::Errors::APIError` will be thrown:\n\n```ruby\nbegin\n  checkout_session = dodo_payments.checkout_sessions.create(product_cart: [{product_id: "product_id", quantity: 0}])\nrescue Dodopayments::Errors::APIConnectionError => e\n  puts("The server could not be reached")\n  puts(e.cause)  # an underlying Exception, likely raised within `net/http`\nrescue Dodopayments::Errors::RateLimitError => e\n  puts("A 429 status code was received; we should back off a bit.")\nrescue Dodopayments::Errors::APIStatusError => e\n  puts("Another non-200-range status code was received")\n  puts(e.status)\nend\n```\n\nError codes are as follows:\n\n| Cause            | Error Type                 |\n| ---------------- | -------------------------- |\n| HTTP 400         | `BadRequestError`          |\n| HTTP 401         | `AuthenticationError`      |\n| HTTP 403         | `PermissionDeniedError`    |\n| HTTP 404         | `NotFoundError`            |\n| HTTP 409         | `ConflictError`            |\n| HTTP 422         | `UnprocessableEntityError` |\n| HTTP 429         | `RateLimitError`           |\n| HTTP >= 500      | `InternalServerError`      |\n| Other HTTP error | `APIStatusError`           |\n| Timeout          | `APITimeoutError`          |\n| Network error    | `APIConnectionError`       |\n\n### Retries\n\nCertain errors will be automatically retried 2 times by default, with a short exponential backoff.\n\nConnection errors (for example, due to a network connectivity problem), 408 Request Timeout, 409 Conflict, 429 Rate Limit, >=500 Internal errors, and timeouts will all be retried by default.\n\nYou can use the `max_retries` option to configure or disable this:\n\n```ruby\n# Configure the default for all requests:\ndodo_payments = Dodopayments::Client.new(\n  max_retries: 0 # default is 2\n)\n\n# Or, configure per-request:\ndodo_payments.checkout_sessions.create(\n  product_cart: [{product_id: "product_id", quantity: 0}],\n  request_options: {max_retries: 5}\n)\n```\n\n### Timeouts\n\nBy default, requests will time out after 60 seconds. You can use the timeout option to configure or disable this:\n\n```ruby\n# Configure the default for all requests:\ndodo_payments = Dodopayments::Client.new(\n  timeout: nil # default is 60\n)\n\n# Or, configure per-request:\ndodo_payments.checkout_sessions.create(\n  product_cart: [{product_id: "product_id", quantity: 0}],\n  request_options: {timeout: 5}\n)\n```\n\nOn timeout, `Dodopayments::Errors::APITimeoutError` is raised.\n\nNote that requests that time out are retried by default.\n\n## Advanced concepts\n\n### BaseModel\n\nAll parameter and response objects inherit from `Dodopayments::Internal::Type::BaseModel`, which provides several conveniences, including:\n\n1. All fields, including unknown ones, are accessible with `obj[:prop]` syntax, and can be destructured with `obj => {prop: prop}` or pattern-matching syntax.\n\n2. Structural equivalence for equality; if two API calls return the same values, comparing the responses with == will return true.\n\n3. Both instances and the classes themselves can be pretty-printed.\n\n4. Helpers such as `#to_h`, `#deep_to_h`, `#to_json`, and `#to_yaml`.\n\n### Making custom or undocumented requests\n\n#### Undocumented properties\n\nYou can send undocumented parameters to any endpoint, and read undocumented response properties, like so:\n\nNote: the `extra_` parameters of the same name overrides the documented parameters.\n\n```ruby\ncheckout_session_response =\n  dodo_payments.checkout_sessions.create(\n    product_cart: [{product_id: "product_id", quantity: 0}],\n    request_options: {\n      extra_query: {my_query_parameter: value},\n      extra_body: {my_body_parameter: value},\n      extra_headers: {"my-header": value}\n    }\n  )\n\nputs(checkout_session_response[:my_undocumented_property])\n```\n\n#### Undocumented request params\n\nIf you want to explicitly send an extra param, you can do so with the `extra_query`, `extra_body`, and `extra_headers` under the `request_options:` parameter when making a request, as seen in the examples above.\n\n#### Undocumented endpoints\n\nTo make requests to undocumented endpoints while retaining the benefit of auth, retries, and so on, you can make requests using `client.request`, like so:\n\n```ruby\nresponse = client.request(\n  method: :post,\n  path: \'/undocumented/endpoint\',\n  query: {"dog": "woof"},\n  headers: {"useful-header": "interesting-value"},\n  body: {"hello": "world"}\n)\n```\n\n### Concurrency & connection pooling\n\nThe `Dodopayments::Client` instances are threadsafe, but are only are fork-safe when there are no in-flight HTTP requests.\n\nEach instance of `Dodopayments::Client` has its own HTTP connection pool with a default size of 99. As such, we recommend instantiating the client once per application in most settings.\n\nWhen all available connections from the pool are checked out, requests wait for a new connection to become available, with queue time counting towards the request timeout.\n\nUnless otherwise specified, other classes in the SDK do not have locks protecting their underlying data structure.\n\n## Sorbet\n\nThis library provides comprehensive [RBI](https://sorbet.org/docs/rbi) definitions, and has no dependency on sorbet-runtime.\n\nYou can provide typesafe request parameters like so:\n\n```ruby\ndodo_payments.checkout_sessions.create(\n  product_cart: [Dodopayments::ProductItemReq.new(product_id: "product_id", quantity: 0)]\n)\n```\n\nOr, equivalently:\n\n```ruby\n# Hashes work, but are not typesafe:\ndodo_payments.checkout_sessions.create(product_cart: [{product_id: "product_id", quantity: 0}])\n\n# You can also splat a full Params class:\nparams = Dodopayments::CheckoutSessionCreateParams.new(\n  product_cart: [Dodopayments::ProductItemReq.new(product_id: "product_id", quantity: 0)]\n)\ndodo_payments.checkout_sessions.create(**params)\n```\n\n### Enums\n\nSince this library does not depend on `sorbet-runtime`, it cannot provide [`T::Enum`](https://sorbet.org/docs/tenum) instances. Instead, we provide "tagged symbols" instead, which is always a primitive at runtime:\n\n```ruby\n# :AED\nputs(Dodopayments::Currency::AED)\n\n# Revealed type: `T.all(Dodopayments::Currency, Symbol)`\nT.reveal_type(Dodopayments::Currency::AED)\n```\n\nEnum parameters have a "relaxed" type, so you can either pass in enum constants or their literal value:\n\n```ruby\n# Using the enum constants preserves the tagged type information:\ndodo_payments.checkout_sessions.create(\n  billing_currency: Dodopayments::Currency::AED,\n  # …\n)\n\n# Literal values are also permissible:\ndodo_payments.checkout_sessions.create(\n  billing_currency: :AED,\n  # …\n)\n```\n\n## Versioning\n\nThis package follows [SemVer](https://semver.org/spec/v2.0.0.html) conventions. As the library is in initial development and has a major version of `0`, APIs may change at any time.\n\nThis package considers improvements to the (non-runtime) `*.rbi` and `*.rbs` type definitions to be non-breaking changes.\n\n## Requirements\n\nRuby 3.2.0 or higher.\n\n## Contributing\n\nSee [the contributing documentation](https://github.com/dodopayments/dodopayments-ruby/tree/main/CONTRIBUTING.md).\n',
  },
  {
    language: 'typescript',
    content:
      "# Dodo Payments TypeScript API Library\n\n[![NPM version](https://img.shields.io/npm/v/dodopayments.svg?label=npm%20(stable))](https://npmjs.org/package/dodopayments) ![npm bundle size](https://img.shields.io/bundlephobia/minzip/dodopayments)\n\nThis library provides convenient access to the Dodo Payments REST API from server-side TypeScript or JavaScript.\n\n\n\nThe REST API documentation can be found on [docs.dodopayments.com](https://docs.dodopayments.com/api-reference/introduction). The full API of this library can be found in [api.md](api.md).\n\nIt is generated with [Stainless](https://www.stainless.com/).\n\n## MCP Server\n\nUse the Dodo Payments MCP Server to enable AI assistants to interact with this API, allowing them to explore endpoints, make test requests, and use documentation to help integrate this SDK into your application.\n\n[![Add to Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/en-US/install-mcp?name=dodopayments-mcp&config=eyJjb21tYW5kIjoibnB4IiwiYXJncyI6WyIteSIsImRvZG9wYXltZW50cy1tY3AiXSwiZW52Ijp7IkRPRE9fUEFZTUVOVFNfQVBJX0tFWSI6Ik15IEJlYXJlciBUb2tlbiIsIkRPRE9fUEFZTUVOVFNfV0VCSE9PS19LRVkiOiJNeSBXZWJob29rIEtleSJ9fQ)\n[![Install in VS Code](https://img.shields.io/badge/_-Add_to_VS_Code-blue?style=for-the-badge&logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCA0MCA0MCI+PHBhdGggZmlsbD0iI0VFRSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMzAuMjM1IDM5Ljg4NGEyLjQ5MSAyLjQ5MSAwIDAgMS0xLjc4MS0uNzNMMTIuNyAyNC43OGwtMy40NiAyLjYyNC0zLjQwNiAyLjU4MmExLjY2NSAxLjY2NSAwIDAgMS0xLjA4Mi4zMzggMS42NjQgMS42NjQgMCAwIDEtMS4wNDYtLjQzMWwtMi4yLTJhMS42NjYgMS42NjYgMCAwIDEgMC0yLjQ2M0w3LjQ1OCAyMCA0LjY3IDE3LjQ1MyAxLjUwNyAxNC41N2ExLjY2NSAxLjY2NSAwIDAgMSAwLTIuNDYzbDIuMi0yYTEuNjY1IDEuNjY1IDAgMCAxIDIuMTMtLjA5N2w2Ljg2MyA1LjIwOUwyOC40NTIuODQ0YTIuNDg4IDIuNDg4IDAgMCAxIDEuODQxLS43MjljLjM1MS4wMDkuNjk5LjA5MSAxLjAxOS4yNDVsOC4yMzYgMy45NjFhMi41IDIuNSAwIDAgMSAxLjQxNSAyLjI1M3YuMDk5LS4wNDVWMzMuMzd2LS4wNDUuMDk1YTIuNTAxIDIuNTAxIDAgMCAxLTEuNDE2IDIuMjU3bC04LjIzNSAzLjk2MWEyLjQ5MiAyLjQ5MiAwIDAgMS0xLjA3Ny4yNDZabS43MTYtMjguOTQ3LTExLjk0OCA5LjA2MiAxMS45NTIgOS4wNjUtLjAwNC0xOC4xMjdaIi8+PC9zdmc+)](https://vscode.stainless.com/mcp/%7B%22name%22%3A%22dodopayments-mcp%22%2C%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22dodopayments-mcp%22%5D%2C%22env%22%3A%7B%22DODO_PAYMENTS_API_KEY%22%3A%22My%20Bearer%20Token%22%2C%22DODO_PAYMENTS_WEBHOOK_KEY%22%3A%22My%20Webhook%20Key%22%7D%7D)\n\n> Note: You may need to set environment variables in your MCP client.\n\n## Installation\n\n```sh\nnpm install dodopayments\n```\n\n\n\n## Usage\n\nThe full API of this library can be found in [api.md](api.md).\n\n<!-- prettier-ignore -->\n```js\nimport DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments({\n  bearerToken: process.env['DODO_PAYMENTS_API_KEY'], // This is the default and can be omitted\n  environment: 'test_mode', // defaults to 'live_mode'\n});\n\nconst checkoutSessionResponse = await client.checkoutSessions.create({\n  product_cart: [{ product_id: 'product_id', quantity: 0 }],\n});\n\nconsole.log(checkoutSessionResponse.session_id);\n```\n\n\n\n### Request & Response types\n\nThis library includes TypeScript definitions for all request params and response fields. You may import and use them like so:\n\n<!-- prettier-ignore -->\n```ts\nimport DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments({\n  bearerToken: process.env['DODO_PAYMENTS_API_KEY'], // This is the default and can be omitted\n  environment: 'test_mode', // defaults to 'live_mode'\n});\n\nconst params: DodoPayments.CheckoutSessionCreateParams = {\n  product_cart: [{ product_id: 'product_id', quantity: 0 }],\n};\nconst checkoutSessionResponse: DodoPayments.CheckoutSessionResponse =\n  await client.checkoutSessions.create(params);\n```\n\nDocumentation for each method, request param, and response field are available in docstrings and will appear on hover in most modern editors.\n\n\n\n\n\n## Handling errors\n\nWhen the library is unable to connect to the API,\nor if the API returns a non-success status code (i.e., 4xx or 5xx response),\na subclass of `APIError` will be thrown:\n\n<!-- prettier-ignore -->\n```ts\nconst checkoutSessionResponse = await client.checkoutSessions\n  .create({ product_cart: [{ product_id: 'product_id', quantity: 0 }] })\n  .catch(async (err) => {\n    if (err instanceof DodoPayments.APIError) {\n      console.log(err.status); // 400\n      console.log(err.name); // BadRequestError\n      console.log(err.headers); // {server: 'nginx', ...}\n    } else {\n      throw err;\n    }\n  });\n```\n\nError codes are as follows:\n\n| Status Code | Error Type                 |\n| ----------- | -------------------------- |\n| 400         | `BadRequestError`          |\n| 401         | `AuthenticationError`      |\n| 403         | `PermissionDeniedError`    |\n| 404         | `NotFoundError`            |\n| 422         | `UnprocessableEntityError` |\n| 429         | `RateLimitError`           |\n| >=500       | `InternalServerError`      |\n| N/A         | `APIConnectionError`       |\n\n### Retries\n\nCertain errors will be automatically retried 2 times by default, with a short exponential backoff.\nConnection errors (for example, due to a network connectivity problem), 408 Request Timeout, 409 Conflict,\n429 Rate Limit, and >=500 Internal errors will all be retried by default.\n\nYou can use the `maxRetries` option to configure or disable this:\n\n<!-- prettier-ignore -->\n```js\n// Configure the default for all requests:\nconst client = new DodoPayments({\n  maxRetries: 0, // default is 2\n});\n\n// Or, configure per-request:\nawait client.checkoutSessions.create({ product_cart: [{ product_id: 'product_id', quantity: 0 }] }, {\n  maxRetries: 5,\n});\n```\n\n### Timeouts\n\nRequests time out after 1 minute by default. You can configure this with a `timeout` option:\n\n<!-- prettier-ignore -->\n```ts\n// Configure the default for all requests:\nconst client = new DodoPayments({\n  timeout: 20 * 1000, // 20 seconds (default is 1 minute)\n});\n\n// Override per-request:\nawait client.checkoutSessions.create({ product_cart: [{ product_id: 'product_id', quantity: 0 }] }, {\n  timeout: 5 * 1000,\n});\n```\n\nOn timeout, an `APIConnectionTimeoutError` is thrown.\n\nNote that requests which time out will be [retried twice by default](#retries).\n\n## Auto-pagination\n\nList methods in the DodoPayments API are paginated.\nYou can use the `for await … of` syntax to iterate through items across all pages:\n\n```ts\nasync function fetchAllPaymentListResponses(params) {\n  const allPaymentListResponses = [];\n  // Automatically fetches more pages as needed.\n  for await (const paymentListResponse of client.payments.list()) {\n    allPaymentListResponses.push(paymentListResponse);\n  }\n  return allPaymentListResponses;\n}\n```\n\nAlternatively, you can request a single page at a time:\n\n```ts\nlet page = await client.payments.list();\nfor (const paymentListResponse of page.items) {\n  console.log(paymentListResponse);\n}\n\n// Convenience methods are provided for manually paginating:\nwhile (page.hasNextPage()) {\n  page = await page.getNextPage();\n  // ...\n}\n```\n\n\n\n## Advanced Usage\n\n### Accessing raw Response data (e.g., headers)\n\nThe \"raw\" `Response` returned by `fetch()` can be accessed through the `.asResponse()` method on the `APIPromise` type that all methods return.\nThis method returns as soon as the headers for a successful response are received and does not consume the response body, so you are free to write custom parsing or streaming logic.\n\nYou can also use the `.withResponse()` method to get the raw `Response` along with the parsed data.\nUnlike `.asResponse()` this method consumes the body, returning once it is parsed.\n\n<!-- prettier-ignore -->\n```ts\nconst client = new DodoPayments();\n\nconst response = await client.checkoutSessions\n  .create({ product_cart: [{ product_id: 'product_id', quantity: 0 }] })\n  .asResponse();\nconsole.log(response.headers.get('X-My-Header'));\nconsole.log(response.statusText); // access the underlying Response object\n\nconst { data: checkoutSessionResponse, response: raw } = await client.checkoutSessions\n  .create({ product_cart: [{ product_id: 'product_id', quantity: 0 }] })\n  .withResponse();\nconsole.log(raw.headers.get('X-My-Header'));\nconsole.log(checkoutSessionResponse.session_id);\n```\n\n### Logging\n\n> [!IMPORTANT]\n> All log messages are intended for debugging only. The format and content of log messages\n> may change between releases.\n\n#### Log levels\n\nThe log level can be configured in two ways:\n\n1. Via the `DODO_PAYMENTS_LOG` environment variable\n2. Using the `logLevel` client option (overrides the environment variable if set)\n\n```ts\nimport DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments({\n  logLevel: 'debug', // Show all log messages\n});\n```\n\nAvailable log levels, from most to least verbose:\n\n- `'debug'` - Show debug messages, info, warnings, and errors\n- `'info'` - Show info messages, warnings, and errors\n- `'warn'` - Show warnings and errors (default)\n- `'error'` - Show only errors\n- `'off'` - Disable all logging\n\nAt the `'debug'` level, all HTTP requests and responses are logged, including headers and bodies.\nSome authentication-related headers are redacted, but sensitive data in request and response bodies\nmay still be visible.\n\n#### Custom logger\n\nBy default, this library logs to `globalThis.console`. You can also provide a custom logger.\nMost logging libraries are supported, including [pino](https://www.npmjs.com/package/pino), [winston](https://www.npmjs.com/package/winston), [bunyan](https://www.npmjs.com/package/bunyan), [consola](https://www.npmjs.com/package/consola), [signale](https://www.npmjs.com/package/signale), and [@std/log](https://jsr.io/@std/log). If your logger doesn't work, please open an issue.\n\nWhen providing a custom logger, the `logLevel` option still controls which messages are emitted, messages\nbelow the configured level will not be sent to your logger.\n\n```ts\nimport DodoPayments from 'dodopayments';\nimport pino from 'pino';\n\nconst logger = pino();\n\nconst client = new DodoPayments({\n  logger: logger.child({ name: 'DodoPayments' }),\n  logLevel: 'debug', // Send all messages to pino, allowing it to filter\n});\n```\n\n### Making custom/undocumented requests\n\nThis library is typed for convenient access to the documented API. If you need to access undocumented\nendpoints, params, or response properties, the library can still be used.\n\n#### Undocumented endpoints\n\nTo make requests to undocumented endpoints, you can use `client.get`, `client.post`, and other HTTP verbs.\nOptions on the client, such as retries, will be respected when making these requests.\n\n```ts\nawait client.post('/some/path', {\n  body: { some_prop: 'foo' },\n  query: { some_query_arg: 'bar' },\n});\n```\n\n#### Undocumented request params\n\nTo make requests using undocumented parameters, you may use `// @ts-expect-error` on the undocumented\nparameter. This library doesn't validate at runtime that the request matches the type, so any extra values you\nsend will be sent as-is.\n\n```ts\nclient.checkoutSessions.create({\n  // ...\n  // @ts-expect-error baz is not yet public\n  baz: 'undocumented option',\n});\n```\n\nFor requests with the `GET` verb, any extra params will be in the query, all other requests will send the\nextra param in the body.\n\nIf you want to explicitly send an extra argument, you can do so with the `query`, `body`, and `headers` request\noptions.\n\n#### Undocumented response properties\n\nTo access undocumented response properties, you may access the response object with `// @ts-expect-error` on\nthe response object, or cast the response object to the requisite type. Like the request params, we do not\nvalidate or strip extra properties from the response from the API.\n\n### Customizing the fetch client\n\nBy default, this library expects a global `fetch` function is defined.\n\nIf you want to use a different `fetch` function, you can either polyfill the global:\n\n```ts\nimport fetch from 'my-fetch';\n\nglobalThis.fetch = fetch;\n```\n\nOr pass it to the client:\n\n```ts\nimport DodoPayments from 'dodopayments';\nimport fetch from 'my-fetch';\n\nconst client = new DodoPayments({ fetch });\n```\n\n### Fetch options\n\nIf you want to set custom `fetch` options without overriding the `fetch` function, you can provide a `fetchOptions` object when instantiating the client or making a request. (Request-specific options override client options.)\n\n```ts\nimport DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments({\n  fetchOptions: {\n    // `RequestInit` options\n  },\n});\n```\n\n#### Configuring proxies\n\nTo modify proxy behavior, you can provide custom `fetchOptions` that add runtime-specific proxy\noptions to requests:\n\n<img src=\"https://raw.githubusercontent.com/stainless-api/sdk-assets/refs/heads/main/node.svg\" align=\"top\" width=\"18\" height=\"21\"> **Node** <sup>[[docs](https://github.com/nodejs/undici/blob/main/docs/docs/api/ProxyAgent.md#example---proxyagent-with-fetch)]</sup>\n\n```ts\nimport DodoPayments from 'dodopayments';\nimport * as undici from 'undici';\n\nconst proxyAgent = new undici.ProxyAgent('http://localhost:8888');\nconst client = new DodoPayments({\n  fetchOptions: {\n    dispatcher: proxyAgent,\n  },\n});\n```\n\n<img src=\"https://raw.githubusercontent.com/stainless-api/sdk-assets/refs/heads/main/bun.svg\" align=\"top\" width=\"18\" height=\"21\"> **Bun** <sup>[[docs](https://bun.sh/guides/http/proxy)]</sup>\n\n```ts\nimport DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments({\n  fetchOptions: {\n    proxy: 'http://localhost:8888',\n  },\n});\n```\n\n<img src=\"https://raw.githubusercontent.com/stainless-api/sdk-assets/refs/heads/main/deno.svg\" align=\"top\" width=\"18\" height=\"21\"> **Deno** <sup>[[docs](https://docs.deno.com/api/deno/~/Deno.createHttpClient)]</sup>\n\n```ts\nimport DodoPayments from 'npm:dodopayments';\n\nconst httpClient = Deno.createHttpClient({ proxy: { url: 'http://localhost:8888' } });\nconst client = new DodoPayments({\n  fetchOptions: {\n    client: httpClient,\n  },\n});\n```\n\n## Frequently Asked Questions\n\n## Semantic versioning\n\nThis package generally follows [SemVer](https://semver.org/spec/v2.0.0.html) conventions, though certain backwards-incompatible changes may be released as minor versions:\n\n1. Changes that only affect static types, without breaking runtime behavior.\n2. Changes to library internals which are technically public but not intended or documented for external use. _(Please open a GitHub issue to let us know if you are relying on such internals.)_\n3. Changes that we do not expect to impact the vast majority of users in practice.\n\nWe take backwards-compatibility seriously and work hard to ensure you can rely on a smooth upgrade experience.\n\nWe are keen for your feedback; please open an [issue](https://www.github.com/dodopayments/dodopayments-typescript/issues) with questions, bugs, or suggestions.\n\n## Requirements\n\nTypeScript >= 4.9 is supported.\n\nThe following runtimes are supported:\n\n- Web browsers (Up-to-date Chrome, Firefox, Safari, Edge, and more)\n- Node.js 20 LTS or later ([non-EOL](https://endoflife.date/nodejs)) versions.\n- Deno v1.28.0 or higher.\n- Bun 1.0 or later.\n- Cloudflare Workers.\n- Vercel Edge Runtime.\n- Jest 28 or greater with the `\"node\"` environment (`\"jsdom\"` is not supported at this time).\n- Nitro v2.6 or greater.\n\nNote that React Native is not supported at this time.\n\nIf you are interested in other runtime environments, please open or upvote an issue on GitHub.\n\n## Contributing\n\nSee [the contributing documentation](./CONTRIBUTING.md).\n",
  },
];

const INDEX_OPTIONS = {
  fields: [
    'name',
    'endpoint',
    'summary',
    'description',
    'qualified',
    'stainlessPath',
    'content',
    'sectionContext',
  ],
  storeFields: ['kind', '_original'],
  searchOptions: {
    prefix: true,
    fuzzy: 0.1,
    boost: {
      name: 5,
      stainlessPath: 3,
      endpoint: 3,
      qualified: 3,
      summary: 2,
      content: 1,
      description: 1,
    } as Record<string, number>,
  },
};

/**
 * Self-contained local search engine backed by MiniSearch.
 * Method data is embedded at SDK build time; prose documents
 * can be loaded from an optional docs directory at runtime.
 */
export class LocalDocsSearch {
  private methodIndex: MiniSearch<MiniSearchDocument>;
  private proseIndex: MiniSearch<MiniSearchDocument>;

  private constructor() {
    this.methodIndex = new MiniSearch<MiniSearchDocument>(INDEX_OPTIONS);
    this.proseIndex = new MiniSearch<MiniSearchDocument>(INDEX_OPTIONS);
  }

  static async create(opts?: { docsDir?: string }): Promise<LocalDocsSearch> {
    const instance = new LocalDocsSearch();
    instance.indexMethods(EMBEDDED_METHODS);
    for (const readme of EMBEDDED_READMES) {
      instance.indexProse(readme.content, `readme:${readme.language}`);
    }
    if (opts?.docsDir) {
      await instance.loadDocsDirectory(opts.docsDir);
    }
    return instance;
  }

  search(props: {
    query: string;
    language?: string;
    detail?: string;
    maxResults?: number;
    maxLength?: number;
  }): SearchResult {
    const { query, language = 'typescript', detail = 'default', maxResults = 5, maxLength = 100_000 } = props;

    const useMarkdown = detail === 'verbose' || detail === 'high';

    // Search both indices and merge results by score.
    // Filter prose hits so language-tagged content (READMEs and docs with
    // frontmatter) only matches the requested language.
    const methodHits = this.methodIndex
      .search(query)
      .map((hit) => ({ ...hit, _kind: 'http_method' as const }));
    const proseHits = this.proseIndex
      .search(query)
      .filter((hit) => {
        const source = ((hit as Record<string, unknown>)['_original'] as ProseChunk | undefined)?.source;
        if (!source) return true;
        // Check for language-tagged sources: "readme:<lang>" or "lang:<lang>:<filename>"
        let taggedLang: string | undefined;
        if (source.startsWith('readme:')) taggedLang = source.slice('readme:'.length);
        else if (source.startsWith('lang:')) taggedLang = source.split(':')[1];
        if (!taggedLang) return true;
        return taggedLang === language || (language === 'javascript' && taggedLang === 'typescript');
      })
      .map((hit) => ({ ...hit, _kind: 'prose' as const }));
    const merged = [...methodHits, ...proseHits].sort((a, b) => b.score - a.score);
    const top = merged.slice(0, maxResults);

    const fullResults: (string | Record<string, unknown>)[] = [];

    for (const hit of top) {
      const original = (hit as Record<string, unknown>)['_original'];
      if (hit._kind === 'http_method') {
        const m = original as MethodEntry;
        if (useMarkdown && m.markdown) {
          fullResults.push(m.markdown);
        } else {
          // Use per-language data when available, falling back to the
          // top-level fields (which are TypeScript-specific in the
          // legacy codepath).
          const langData = m.perLanguage?.[language];
          fullResults.push({
            method: langData?.method ?? m.qualified,
            summary: m.summary,
            description: m.description,
            endpoint: `${m.httpMethod.toUpperCase()} ${m.endpoint}`,
            ...(langData?.example ? { example: langData.example } : {}),
            ...(m.params ? { params: m.params } : {}),
            ...(m.response ? { response: m.response } : {}),
          });
        }
      } else {
        const c = original as ProseChunk;
        fullResults.push({
          content: c.content,
          ...(c.source ? { source: c.source } : {}),
        });
      }
    }

    let totalLength = 0;
    const results: (string | Record<string, unknown>)[] = [];
    for (const result of fullResults) {
      const len = typeof result === 'string' ? result.length : JSON.stringify(result).length;
      totalLength += len;
      if (totalLength > maxLength) break;
      results.push(result);
    }

    if (results.length < fullResults.length) {
      results.unshift(`Truncated; showing ${results.length} of ${fullResults.length} results.`);
    }

    return { results };
  }

  private indexMethods(methods: MethodEntry[]): void {
    const docs: MiniSearchDocument[] = methods.map((m, i) => ({
      id: `method-${i}`,
      kind: 'http_method' as const,
      name: m.name,
      endpoint: m.endpoint,
      summary: m.summary,
      description: m.description,
      qualified: m.qualified,
      stainlessPath: m.stainlessPath,
      _original: m as unknown as Record<string, unknown>,
    }));
    if (docs.length > 0) {
      this.methodIndex.addAll(docs);
    }
  }

  private async loadDocsDirectory(docsDir: string): Promise<void> {
    let entries;
    try {
      entries = await fs.readdir(docsDir, { withFileTypes: true });
    } catch (err) {
      getLogger().warn({ err, docsDir }, 'Could not read docs directory');
      return;
    }

    const files = entries
      .filter((e) => e.isFile())
      .filter((e) => e.name.endsWith('.md') || e.name.endsWith('.markdown') || e.name.endsWith('.json'));

    for (const file of files) {
      try {
        const filePath = path.join(docsDir, file.name);
        const content = await fs.readFile(filePath, 'utf-8');

        if (file.name.endsWith('.json')) {
          const texts = extractTexts(JSON.parse(content));
          if (texts.length > 0) {
            this.indexProse(texts.join('\n\n'), file.name);
          }
        } else {
          // Parse optional YAML frontmatter for language tagging.
          // Files with a "language" field in frontmatter will only
          // surface in searches for that language.
          //
          // Example:
          //   ---
          //   language: python
          //   ---
          //   # Error handling in Python
          //   ...
          const frontmatter = parseFrontmatter(content);
          const source = frontmatter.language ? `lang:${frontmatter.language}:${file.name}` : file.name;
          this.indexProse(content, source);
        }
      } catch (err) {
        getLogger().warn({ err, file: file.name }, 'Failed to index docs file');
      }
    }
  }

  private indexProse(markdown: string, source: string): void {
    const chunks = chunkMarkdown(markdown);
    const baseId = this.proseIndex.documentCount;

    const docs: MiniSearchDocument[] = chunks.map((chunk, i) => ({
      id: `prose-${baseId + i}`,
      kind: 'prose' as const,
      content: chunk.content,
      ...(chunk.sectionContext != null ? { sectionContext: chunk.sectionContext } : {}),
      _original: { ...chunk, source } as unknown as Record<string, unknown>,
    }));

    if (docs.length > 0) {
      this.proseIndex.addAll(docs);
    }
  }
}

/** Lightweight markdown chunker — splits on headers, chunks by word count. */
function chunkMarkdown(markdown: string): { content: string; tag: string; sectionContext?: string }[] {
  // Strip YAML frontmatter
  const stripped = markdown.replace(/^---\n[\s\S]*?\n---\n?/, '');
  const lines = stripped.split('\n');

  const chunks: { content: string; tag: string; sectionContext?: string }[] = [];
  const headers: string[] = [];
  let current: string[] = [];

  const flush = () => {
    const text = current.join('\n').trim();
    if (!text) return;
    const sectionContext = headers.length > 0 ? headers.join(' > ') : undefined;
    // Split into ~200-word chunks
    const words = text.split(/\s+/);
    for (let i = 0; i < words.length; i += 200) {
      const slice = words.slice(i, i + 200).join(' ');
      if (slice) {
        chunks.push({ content: slice, tag: 'p', ...(sectionContext != null ? { sectionContext } : {}) });
      }
    }
    current = [];
  };

  for (const line of lines) {
    const headerMatch = line.match(/^(#{1,6})\s+(.+)/);
    if (headerMatch) {
      flush();
      const level = headerMatch[1]!.length;
      const text = headerMatch[2]!.trim();
      while (headers.length >= level) headers.pop();
      headers.push(text);
    } else {
      current.push(line);
    }
  }
  flush();

  return chunks;
}

/** Recursively extracts string values from a JSON structure. */
function extractTexts(data: unknown, depth = 0): string[] {
  if (depth > 10) return [];
  if (typeof data === 'string') return data.trim() ? [data] : [];
  if (Array.isArray(data)) return data.flatMap((item) => extractTexts(item, depth + 1));
  if (typeof data === 'object' && data !== null) {
    return Object.values(data).flatMap((v) => extractTexts(v, depth + 1));
  }
  return [];
}

/** Parses YAML frontmatter from a markdown string, extracting the language field if present. */
function parseFrontmatter(markdown: string): { language?: string } {
  const match = markdown.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};
  const body = match[1] ?? '';
  const langMatch = body.match(/^language:\s*(.+)$/m);
  return langMatch ? { language: langMatch[1]!.trim() } : {};
}
