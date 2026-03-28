// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import MiniSearch from 'minisearch';
import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import { getLogger } from './logger';

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
      "## update\n\n`client.subscriptions.update(subscription_id: string, billing?: { country: country_code; city?: string; state?: string; street?: string; zipcode?: string; }, cancel_at_next_billing_date?: boolean, credit_entitlement_cart?: { credit_entitlement_id: string; credits_amount?: string; expires_after_days?: number; low_balance_threshold_percent?: number; max_rollover_count?: number; overage_enabled?: boolean; overage_limit?: string; rollover_enabled?: boolean; rollover_percentage?: number; rollover_timeframe_count?: number; rollover_timeframe_interval?: 'Day' | 'Week' | 'Month' | 'Year'; }[], customer_name?: string, disable_on_demand?: { next_billing_date: string; }, metadata?: object, next_billing_date?: string, status?: 'pending' | 'active' | 'on_hold' | 'cancelled' | 'failed' | 'expired', tax_id?: string): { addons: addon_cart_response_item[]; billing: billing_address; cancel_at_next_billing_date: boolean; created_at: string; credit_entitlement_cart: credit_entitlement_cart_response[]; currency: currency; customer: customer_limited_details; metadata: object; meter_credit_entitlement_cart: meter_credit_entitlement_cart_response[]; meters: meter_cart_response_item[]; next_billing_date: string; on_demand: boolean; payment_frequency_count: number; payment_frequency_interval: time_interval; previous_billing_date: string; product_id: string; quantity: number; recurring_pre_tax_amount: number; status: subscription_status; subscription_id: string; subscription_period_count: number; subscription_period_interval: time_interval; tax_inclusive: boolean; trial_period_days: number; cancelled_at?: string; custom_field_responses?: custom_field_response[]; discount_cycles_remaining?: number; discount_id?: string; expires_at?: string; payment_method_id?: string; scheduled_change?: object; tax_id?: string; }`\n\n**patch** `/subscriptions/{subscription_id}`\n\n### Parameters\n\n- `subscription_id: string`\n\n- `billing?: { country: string; city?: string; state?: string; street?: string; zipcode?: string; }`\n  - `country: string`\n    Two-letter ISO country code (ISO 3166-1 alpha-2)\n  - `city?: string`\n    City name\n  - `state?: string`\n    State or province name\n  - `street?: string`\n    Street address including house number and unit/apartment if applicable\n  - `zipcode?: string`\n    Postal code or ZIP code\n\n- `cancel_at_next_billing_date?: boolean`\n  When set, the subscription will remain active until the end of billing period\n\n- `credit_entitlement_cart?: { credit_entitlement_id: string; credits_amount?: string; expires_after_days?: number; low_balance_threshold_percent?: number; max_rollover_count?: number; overage_enabled?: boolean; overage_limit?: string; rollover_enabled?: boolean; rollover_percentage?: number; rollover_timeframe_count?: number; rollover_timeframe_interval?: 'Day' | 'Week' | 'Month' | 'Year'; }[]`\n  Update credit entitlement cart settings\n\n- `customer_name?: string`\n\n- `disable_on_demand?: { next_billing_date: string; }`\n  - `next_billing_date: string`\n\n- `metadata?: object`\n\n- `next_billing_date?: string`\n\n- `status?: 'pending' | 'active' | 'on_hold' | 'cancelled' | 'failed' | 'expired'`\n\n- `tax_id?: string`\n\n### Returns\n\n- `{ addons: { addon_id: string; quantity: number; }[]; billing: { country: country_code; city?: string; state?: string; street?: string; zipcode?: string; }; cancel_at_next_billing_date: boolean; created_at: string; credit_entitlement_cart: { credit_entitlement_id: string; credit_entitlement_name: string; credits_amount: string; overage_balance: string; overage_behavior: cbb_overage_behavior; overage_enabled: boolean; product_id: string; remaining_balance: string; rollover_enabled: boolean; unit: string; expires_after_days?: number; low_balance_threshold_percent?: number; max_rollover_count?: number; overage_limit?: string; rollover_percentage?: number; rollover_timeframe_count?: number; rollover_timeframe_interval?: time_interval; }[]; currency: string; customer: { customer_id: string; email: string; name: string; metadata?: object; phone_number?: string; }; metadata: object; meter_credit_entitlement_cart: { credit_entitlement_id: string; meter_id: string; meter_name: string; meter_units_per_credit: string; product_id: string; }[]; meters: { currency: currency; free_threshold: number; measurement_unit: string; meter_id: string; name: string; description?: string; price_per_unit?: string; }[]; next_billing_date: string; on_demand: boolean; payment_frequency_count: number; payment_frequency_interval: 'Day' | 'Week' | 'Month' | 'Year'; previous_billing_date: string; product_id: string; quantity: number; recurring_pre_tax_amount: number; status: 'pending' | 'active' | 'on_hold' | 'cancelled' | 'failed' | 'expired'; subscription_id: string; subscription_period_count: number; subscription_period_interval: 'Day' | 'Week' | 'Month' | 'Year'; tax_inclusive: boolean; trial_period_days: number; cancelled_at?: string; custom_field_responses?: { key: string; value: string; }[]; discount_cycles_remaining?: number; discount_id?: string; expires_at?: string; payment_method_id?: string; scheduled_change?: { id: string; addons: { addon_id: string; name: string; quantity: number; }[]; created_at: string; effective_at: string; product_id: string; quantity: number; product_description?: string; product_name?: string; }; tax_id?: string; }`\n  Response struct representing subscription details\n\n  - `addons: { addon_id: string; quantity: number; }[]`\n  - `billing: { country: string; city?: string; state?: string; street?: string; zipcode?: string; }`\n  - `cancel_at_next_billing_date: boolean`\n  - `created_at: string`\n  - `credit_entitlement_cart: { credit_entitlement_id: string; credit_entitlement_name: string; credits_amount: string; overage_balance: string; overage_behavior: 'forgive_at_reset' | 'invoice_at_billing' | 'carry_deficit' | 'carry_deficit_auto_repay'; overage_enabled: boolean; product_id: string; remaining_balance: string; rollover_enabled: boolean; unit: string; expires_after_days?: number; low_balance_threshold_percent?: number; max_rollover_count?: number; overage_limit?: string; rollover_percentage?: number; rollover_timeframe_count?: number; rollover_timeframe_interval?: 'Day' | 'Week' | 'Month' | 'Year'; }[]`\n  - `currency: string`\n  - `customer: { customer_id: string; email: string; name: string; metadata?: object; phone_number?: string; }`\n  - `metadata: object`\n  - `meter_credit_entitlement_cart: { credit_entitlement_id: string; meter_id: string; meter_name: string; meter_units_per_credit: string; product_id: string; }[]`\n  - `meters: { currency: string; free_threshold: number; measurement_unit: string; meter_id: string; name: string; description?: string; price_per_unit?: string; }[]`\n  - `next_billing_date: string`\n  - `on_demand: boolean`\n  - `payment_frequency_count: number`\n  - `payment_frequency_interval: 'Day' | 'Week' | 'Month' | 'Year'`\n  - `previous_billing_date: string`\n  - `product_id: string`\n  - `quantity: number`\n  - `recurring_pre_tax_amount: number`\n  - `status: 'pending' | 'active' | 'on_hold' | 'cancelled' | 'failed' | 'expired'`\n  - `subscription_id: string`\n  - `subscription_period_count: number`\n  - `subscription_period_interval: 'Day' | 'Week' | 'Month' | 'Year'`\n  - `tax_inclusive: boolean`\n  - `trial_period_days: number`\n  - `cancelled_at?: string`\n  - `custom_field_responses?: { key: string; value: string; }[]`\n  - `discount_cycles_remaining?: number`\n  - `discount_id?: string`\n  - `expires_at?: string`\n  - `payment_method_id?: string`\n  - `scheduled_change?: { id: string; addons: { addon_id: string; name: string; quantity: number; }[]; created_at: string; effective_at: string; product_id: string; quantity: number; product_description?: string; product_name?: string; }`\n  - `tax_id?: string`\n\n### Example\n\n```typescript\nimport DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments();\n\nconst subscription = await client.subscriptions.update('subscription_id');\n\nconsole.log(subscription);\n```",
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
      "{ id: string; business_id: string; created_at: string; customer_id: string; instances_count: number; key: string; payment_id: string; product_id: string; status: 'active' | 'expired' | 'disabled'; activations_limit?: number; expires_at?: string; subscription_id?: string; }",
    markdown:
      "## retrieve\n\n`client.licenseKeys.retrieve(id: string): { id: string; business_id: string; created_at: string; customer_id: string; instances_count: number; key: string; payment_id: string; product_id: string; status: license_key_status; activations_limit?: number; expires_at?: string; subscription_id?: string; }`\n\n**get** `/license_keys/{id}`\n\n### Parameters\n\n- `id: string`\n\n### Returns\n\n- `{ id: string; business_id: string; created_at: string; customer_id: string; instances_count: number; key: string; payment_id: string; product_id: string; status: 'active' | 'expired' | 'disabled'; activations_limit?: number; expires_at?: string; subscription_id?: string; }`\n\n  - `id: string`\n  - `business_id: string`\n  - `created_at: string`\n  - `customer_id: string`\n  - `instances_count: number`\n  - `key: string`\n  - `payment_id: string`\n  - `product_id: string`\n  - `status: 'active' | 'expired' | 'disabled'`\n  - `activations_limit?: number`\n  - `expires_at?: string`\n  - `subscription_id?: string`\n\n### Example\n\n```typescript\nimport DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments();\n\nconst licenseKey = await client.licenseKeys.retrieve('lic_123');\n\nconsole.log(licenseKey);\n```",
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
      "{ id: string; business_id: string; created_at: string; customer_id: string; instances_count: number; key: string; payment_id: string; product_id: string; status: 'active' | 'expired' | 'disabled'; activations_limit?: number; expires_at?: string; subscription_id?: string; }",
    markdown:
      "## update\n\n`client.licenseKeys.update(id: string, activations_limit?: number, disabled?: boolean, expires_at?: string): { id: string; business_id: string; created_at: string; customer_id: string; instances_count: number; key: string; payment_id: string; product_id: string; status: license_key_status; activations_limit?: number; expires_at?: string; subscription_id?: string; }`\n\n**patch** `/license_keys/{id}`\n\n### Parameters\n\n- `id: string`\n\n- `activations_limit?: number`\n  The updated activation limit for the license key.\nUse `null` to remove the limit, or omit this field to leave it unchanged.\n\n- `disabled?: boolean`\n  Indicates whether the license key should be disabled.\nA value of `true` disables the key, while `false` enables it. Omit this field to leave it unchanged.\n\n- `expires_at?: string`\n  The updated expiration timestamp for the license key in UTC.\nUse `null` to remove the expiration date, or omit this field to leave it unchanged.\n\n### Returns\n\n- `{ id: string; business_id: string; created_at: string; customer_id: string; instances_count: number; key: string; payment_id: string; product_id: string; status: 'active' | 'expired' | 'disabled'; activations_limit?: number; expires_at?: string; subscription_id?: string; }`\n\n  - `id: string`\n  - `business_id: string`\n  - `created_at: string`\n  - `customer_id: string`\n  - `instances_count: number`\n  - `key: string`\n  - `payment_id: string`\n  - `product_id: string`\n  - `status: 'active' | 'expired' | 'disabled'`\n  - `activations_limit?: number`\n  - `expires_at?: string`\n  - `subscription_id?: string`\n\n### Example\n\n```typescript\nimport DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments();\n\nconst licenseKey = await client.licenseKeys.update('lic_123');\n\nconsole.log(licenseKey);\n```",
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
      "status?: 'active' | 'expired' | 'disabled';",
    ],
    response:
      "{ id: string; business_id: string; created_at: string; customer_id: string; instances_count: number; key: string; payment_id: string; product_id: string; status: 'active' | 'expired' | 'disabled'; activations_limit?: number; expires_at?: string; subscription_id?: string; }",
    markdown:
      "## list\n\n`client.licenseKeys.list(created_at_gte?: string, created_at_lte?: string, customer_id?: string, page_number?: number, page_size?: number, product_id?: string, status?: 'active' | 'expired' | 'disabled'): { id: string; business_id: string; created_at: string; customer_id: string; instances_count: number; key: string; payment_id: string; product_id: string; status: license_key_status; activations_limit?: number; expires_at?: string; subscription_id?: string; }`\n\n**get** `/license_keys`\n\n### Parameters\n\n- `created_at_gte?: string`\n  Filter license keys created on or after this timestamp\n\n- `created_at_lte?: string`\n  Filter license keys created on or before this timestamp\n\n- `customer_id?: string`\n  Filter by customer ID\n\n- `page_number?: number`\n  Page number default is 0\n\n- `page_size?: number`\n  Page size default is 10 max is 100\n\n- `product_id?: string`\n  Filter by product ID\n\n- `status?: 'active' | 'expired' | 'disabled'`\n  Filter by license key status\n\n### Returns\n\n- `{ id: string; business_id: string; created_at: string; customer_id: string; instances_count: number; key: string; payment_id: string; product_id: string; status: 'active' | 'expired' | 'disabled'; activations_limit?: number; expires_at?: string; subscription_id?: string; }`\n\n  - `id: string`\n  - `business_id: string`\n  - `created_at: string`\n  - `customer_id: string`\n  - `instances_count: number`\n  - `key: string`\n  - `payment_id: string`\n  - `product_id: string`\n  - `status: 'active' | 'expired' | 'disabled'`\n  - `activations_limit?: number`\n  - `expires_at?: string`\n  - `subscription_id?: string`\n\n### Example\n\n```typescript\nimport DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments();\n\n// Automatically fetches more pages as needed.\nfor await (const licenseKey of client.licenseKeys.list()) {\n  console.log(licenseKey);\n}\n```",
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
      'license_key_activation_message?: string;',
      'license_key_activations_limit?: number;',
      "license_key_duration?: { count: number; interval: 'Day' | 'Week' | 'Month' | 'Year'; };",
      'license_key_enabled?: boolean;',
      'metadata?: object;',
    ],
    response:
      "{ brand_id: string; business_id: string; created_at: string; credit_entitlements: object[]; is_recurring: boolean; license_key_enabled: boolean; metadata: object; price: object | object | object; product_id: string; tax_category: 'digital_products' | 'saas' | 'e_book' | 'edtech'; updated_at: string; addons?: string[]; description?: string; digital_product_delivery?: object; image?: string; license_key_activation_message?: string; license_key_activations_limit?: number; license_key_duration?: object; name?: string; product_collection_id?: string; }",
    markdown:
      "## create\n\n`client.products.create(name: string, price: { currency: currency; discount: number; price: number; purchasing_power_parity: boolean; type: 'one_time_price'; pay_what_you_want?: boolean; suggested_price?: number; tax_inclusive?: boolean; } | { currency: currency; discount: number; payment_frequency_count: number; payment_frequency_interval: time_interval; price: number; purchasing_power_parity: boolean; subscription_period_count: number; subscription_period_interval: time_interval; type: 'recurring_price'; tax_inclusive?: boolean; trial_period_days?: number; } | { currency: currency; discount: number; fixed_price: number; payment_frequency_count: number; payment_frequency_interval: time_interval; purchasing_power_parity: boolean; subscription_period_count: number; subscription_period_interval: time_interval; type: 'usage_based_price'; meters?: add_meter_to_price[]; tax_inclusive?: boolean; }, tax_category: 'digital_products' | 'saas' | 'e_book' | 'edtech', addons?: string[], brand_id?: string, credit_entitlements?: { credit_entitlement_id: string; credits_amount: string; currency?: currency; expires_after_days?: number; low_balance_threshold_percent?: number; max_rollover_count?: number; overage_behavior?: cbb_overage_behavior; overage_enabled?: boolean; overage_limit?: string; price_per_unit?: string; proration_behavior?: cbb_proration_behavior; rollover_enabled?: boolean; rollover_percentage?: number; rollover_timeframe_count?: number; rollover_timeframe_interval?: time_interval; trial_credits?: string; trial_credits_expire_after_trial?: boolean; }[], description?: string, digital_product_delivery?: { external_url?: string; instructions?: string; }, license_key_activation_message?: string, license_key_activations_limit?: number, license_key_duration?: { count: number; interval: time_interval; }, license_key_enabled?: boolean, metadata?: object): { brand_id: string; business_id: string; created_at: string; credit_entitlements: credit_entitlement_mapping_response[]; is_recurring: boolean; license_key_enabled: boolean; metadata: object; price: price; product_id: string; tax_category: tax_category; updated_at: string; addons?: string[]; description?: string; digital_product_delivery?: digital_product_delivery; image?: string; license_key_activation_message?: string; license_key_activations_limit?: number; license_key_duration?: license_key_duration; name?: string; product_collection_id?: string; }`\n\n**post** `/products`\n\n### Parameters\n\n- `name: string`\n  Name of the product\n\n- `price: { currency: string; discount: number; price: number; purchasing_power_parity: boolean; type: 'one_time_price'; pay_what_you_want?: boolean; suggested_price?: number; tax_inclusive?: boolean; } | { currency: string; discount: number; payment_frequency_count: number; payment_frequency_interval: 'Day' | 'Week' | 'Month' | 'Year'; price: number; purchasing_power_parity: boolean; subscription_period_count: number; subscription_period_interval: 'Day' | 'Week' | 'Month' | 'Year'; type: 'recurring_price'; tax_inclusive?: boolean; trial_period_days?: number; } | { currency: string; discount: number; fixed_price: number; payment_frequency_count: number; payment_frequency_interval: 'Day' | 'Week' | 'Month' | 'Year'; purchasing_power_parity: boolean; subscription_period_count: number; subscription_period_interval: 'Day' | 'Week' | 'Month' | 'Year'; type: 'usage_based_price'; meters?: { meter_id: string; credit_entitlement_id?: string; description?: string; free_threshold?: number; measurement_unit?: string; meter_units_per_credit?: string; name?: string; price_per_unit?: string; }[]; tax_inclusive?: boolean; }`\n  Price configuration for the product\n\n- `tax_category: 'digital_products' | 'saas' | 'e_book' | 'edtech'`\n  Tax category applied to this product\n\n- `addons?: string[]`\n  Addons available for subscription product\n\n- `brand_id?: string`\n  Brand id for the product, if not provided will default to primary brand\n\n- `credit_entitlements?: { credit_entitlement_id: string; credits_amount: string; currency?: string; expires_after_days?: number; low_balance_threshold_percent?: number; max_rollover_count?: number; overage_behavior?: 'forgive_at_reset' | 'invoice_at_billing' | 'carry_deficit' | 'carry_deficit_auto_repay'; overage_enabled?: boolean; overage_limit?: string; price_per_unit?: string; proration_behavior?: 'prorate' | 'no_prorate'; rollover_enabled?: boolean; rollover_percentage?: number; rollover_timeframe_count?: number; rollover_timeframe_interval?: 'Day' | 'Week' | 'Month' | 'Year'; trial_credits?: string; trial_credits_expire_after_trial?: boolean; }[]`\n  Optional credit entitlements to attach (max 3)\n\n- `description?: string`\n  Optional description of the product\n\n- `digital_product_delivery?: { external_url?: string; instructions?: string; }`\n  Choose how you would like you digital product delivered\n  - `external_url?: string`\n    External URL to digital product\n  - `instructions?: string`\n    Instructions to download and use the digital product\n\n- `license_key_activation_message?: string`\n  Optional message displayed during license key activation\n\n- `license_key_activations_limit?: number`\n  The number of times the license key can be activated.\nMust be 0 or greater\n\n- `license_key_duration?: { count: number; interval: 'Day' | 'Week' | 'Month' | 'Year'; }`\n  Duration configuration for the license key.\nSet to null if you don't want the license key to expire.\nFor subscriptions, the lifetime of the license key is tied to the subscription period\n  - `count: number`\n  - `interval: 'Day' | 'Week' | 'Month' | 'Year'`\n\n- `license_key_enabled?: boolean`\n  When true, generates and sends a license key to your customer.\nDefaults to false\n\n- `metadata?: object`\n  Additional metadata for the product\n\n### Returns\n\n- `{ brand_id: string; business_id: string; created_at: string; credit_entitlements: { id: string; credit_entitlement_id: string; credit_entitlement_name: string; credit_entitlement_unit: string; credits_amount: string; overage_behavior: cbb_overage_behavior; overage_enabled: boolean; proration_behavior: cbb_proration_behavior; rollover_enabled: boolean; trial_credits_expire_after_trial: boolean; currency?: currency; expires_after_days?: number; low_balance_threshold_percent?: number; max_rollover_count?: number; overage_limit?: string; price_per_unit?: string; rollover_percentage?: number; rollover_timeframe_count?: number; rollover_timeframe_interval?: time_interval; trial_credits?: string; }[]; is_recurring: boolean; license_key_enabled: boolean; metadata: object; price: { currency: currency; discount: number; price: number; purchasing_power_parity: boolean; type: 'one_time_price'; pay_what_you_want?: boolean; suggested_price?: number; tax_inclusive?: boolean; } | { currency: currency; discount: number; payment_frequency_count: number; payment_frequency_interval: time_interval; price: number; purchasing_power_parity: boolean; subscription_period_count: number; subscription_period_interval: time_interval; type: 'recurring_price'; tax_inclusive?: boolean; trial_period_days?: number; } | { currency: currency; discount: number; fixed_price: number; payment_frequency_count: number; payment_frequency_interval: time_interval; purchasing_power_parity: boolean; subscription_period_count: number; subscription_period_interval: time_interval; type: 'usage_based_price'; meters?: add_meter_to_price[]; tax_inclusive?: boolean; }; product_id: string; tax_category: 'digital_products' | 'saas' | 'e_book' | 'edtech'; updated_at: string; addons?: string[]; description?: string; digital_product_delivery?: { external_url?: string; files?: digital_product_delivery_file[]; instructions?: string; }; image?: string; license_key_activation_message?: string; license_key_activations_limit?: number; license_key_duration?: { count: number; interval: time_interval; }; name?: string; product_collection_id?: string; }`\n\n  - `brand_id: string`\n  - `business_id: string`\n  - `created_at: string`\n  - `credit_entitlements: { id: string; credit_entitlement_id: string; credit_entitlement_name: string; credit_entitlement_unit: string; credits_amount: string; overage_behavior: 'forgive_at_reset' | 'invoice_at_billing' | 'carry_deficit' | 'carry_deficit_auto_repay'; overage_enabled: boolean; proration_behavior: 'prorate' | 'no_prorate'; rollover_enabled: boolean; trial_credits_expire_after_trial: boolean; currency?: string; expires_after_days?: number; low_balance_threshold_percent?: number; max_rollover_count?: number; overage_limit?: string; price_per_unit?: string; rollover_percentage?: number; rollover_timeframe_count?: number; rollover_timeframe_interval?: 'Day' | 'Week' | 'Month' | 'Year'; trial_credits?: string; }[]`\n  - `is_recurring: boolean`\n  - `license_key_enabled: boolean`\n  - `metadata: object`\n  - `price: { currency: string; discount: number; price: number; purchasing_power_parity: boolean; type: 'one_time_price'; pay_what_you_want?: boolean; suggested_price?: number; tax_inclusive?: boolean; } | { currency: string; discount: number; payment_frequency_count: number; payment_frequency_interval: 'Day' | 'Week' | 'Month' | 'Year'; price: number; purchasing_power_parity: boolean; subscription_period_count: number; subscription_period_interval: 'Day' | 'Week' | 'Month' | 'Year'; type: 'recurring_price'; tax_inclusive?: boolean; trial_period_days?: number; } | { currency: string; discount: number; fixed_price: number; payment_frequency_count: number; payment_frequency_interval: 'Day' | 'Week' | 'Month' | 'Year'; purchasing_power_parity: boolean; subscription_period_count: number; subscription_period_interval: 'Day' | 'Week' | 'Month' | 'Year'; type: 'usage_based_price'; meters?: { meter_id: string; credit_entitlement_id?: string; description?: string; free_threshold?: number; measurement_unit?: string; meter_units_per_credit?: string; name?: string; price_per_unit?: string; }[]; tax_inclusive?: boolean; }`\n  - `product_id: string`\n  - `tax_category: 'digital_products' | 'saas' | 'e_book' | 'edtech'`\n  - `updated_at: string`\n  - `addons?: string[]`\n  - `description?: string`\n  - `digital_product_delivery?: { external_url?: string; files?: { file_id: string; file_name: string; url: string; }[]; instructions?: string; }`\n  - `image?: string`\n  - `license_key_activation_message?: string`\n  - `license_key_activations_limit?: number`\n  - `license_key_duration?: { count: number; interval: 'Day' | 'Week' | 'Month' | 'Year'; }`\n  - `name?: string`\n  - `product_collection_id?: string`\n\n### Example\n\n```typescript\nimport DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments();\n\nconst product = await client.products.create({\n  name: 'name',\n  price: {\n  currency: 'AED',\n  discount: 0,\n  price: 0,\n  purchasing_power_parity: true,\n  type: 'one_time_price',\n},\n  tax_category: 'digital_products',\n});\n\nconsole.log(product);\n```",
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
      "{ brand_id: string; business_id: string; created_at: string; credit_entitlements: object[]; is_recurring: boolean; license_key_enabled: boolean; metadata: object; price: object | object | object; product_id: string; tax_category: 'digital_products' | 'saas' | 'e_book' | 'edtech'; updated_at: string; addons?: string[]; description?: string; digital_product_delivery?: object; image?: string; license_key_activation_message?: string; license_key_activations_limit?: number; license_key_duration?: object; name?: string; product_collection_id?: string; }",
    markdown:
      "## retrieve\n\n`client.products.retrieve(id: string): { brand_id: string; business_id: string; created_at: string; credit_entitlements: credit_entitlement_mapping_response[]; is_recurring: boolean; license_key_enabled: boolean; metadata: object; price: price; product_id: string; tax_category: tax_category; updated_at: string; addons?: string[]; description?: string; digital_product_delivery?: digital_product_delivery; image?: string; license_key_activation_message?: string; license_key_activations_limit?: number; license_key_duration?: license_key_duration; name?: string; product_collection_id?: string; }`\n\n**get** `/products/{id}`\n\n### Parameters\n\n- `id: string`\n\n### Returns\n\n- `{ brand_id: string; business_id: string; created_at: string; credit_entitlements: { id: string; credit_entitlement_id: string; credit_entitlement_name: string; credit_entitlement_unit: string; credits_amount: string; overage_behavior: cbb_overage_behavior; overage_enabled: boolean; proration_behavior: cbb_proration_behavior; rollover_enabled: boolean; trial_credits_expire_after_trial: boolean; currency?: currency; expires_after_days?: number; low_balance_threshold_percent?: number; max_rollover_count?: number; overage_limit?: string; price_per_unit?: string; rollover_percentage?: number; rollover_timeframe_count?: number; rollover_timeframe_interval?: time_interval; trial_credits?: string; }[]; is_recurring: boolean; license_key_enabled: boolean; metadata: object; price: { currency: currency; discount: number; price: number; purchasing_power_parity: boolean; type: 'one_time_price'; pay_what_you_want?: boolean; suggested_price?: number; tax_inclusive?: boolean; } | { currency: currency; discount: number; payment_frequency_count: number; payment_frequency_interval: time_interval; price: number; purchasing_power_parity: boolean; subscription_period_count: number; subscription_period_interval: time_interval; type: 'recurring_price'; tax_inclusive?: boolean; trial_period_days?: number; } | { currency: currency; discount: number; fixed_price: number; payment_frequency_count: number; payment_frequency_interval: time_interval; purchasing_power_parity: boolean; subscription_period_count: number; subscription_period_interval: time_interval; type: 'usage_based_price'; meters?: add_meter_to_price[]; tax_inclusive?: boolean; }; product_id: string; tax_category: 'digital_products' | 'saas' | 'e_book' | 'edtech'; updated_at: string; addons?: string[]; description?: string; digital_product_delivery?: { external_url?: string; files?: digital_product_delivery_file[]; instructions?: string; }; image?: string; license_key_activation_message?: string; license_key_activations_limit?: number; license_key_duration?: { count: number; interval: time_interval; }; name?: string; product_collection_id?: string; }`\n\n  - `brand_id: string`\n  - `business_id: string`\n  - `created_at: string`\n  - `credit_entitlements: { id: string; credit_entitlement_id: string; credit_entitlement_name: string; credit_entitlement_unit: string; credits_amount: string; overage_behavior: 'forgive_at_reset' | 'invoice_at_billing' | 'carry_deficit' | 'carry_deficit_auto_repay'; overage_enabled: boolean; proration_behavior: 'prorate' | 'no_prorate'; rollover_enabled: boolean; trial_credits_expire_after_trial: boolean; currency?: string; expires_after_days?: number; low_balance_threshold_percent?: number; max_rollover_count?: number; overage_limit?: string; price_per_unit?: string; rollover_percentage?: number; rollover_timeframe_count?: number; rollover_timeframe_interval?: 'Day' | 'Week' | 'Month' | 'Year'; trial_credits?: string; }[]`\n  - `is_recurring: boolean`\n  - `license_key_enabled: boolean`\n  - `metadata: object`\n  - `price: { currency: string; discount: number; price: number; purchasing_power_parity: boolean; type: 'one_time_price'; pay_what_you_want?: boolean; suggested_price?: number; tax_inclusive?: boolean; } | { currency: string; discount: number; payment_frequency_count: number; payment_frequency_interval: 'Day' | 'Week' | 'Month' | 'Year'; price: number; purchasing_power_parity: boolean; subscription_period_count: number; subscription_period_interval: 'Day' | 'Week' | 'Month' | 'Year'; type: 'recurring_price'; tax_inclusive?: boolean; trial_period_days?: number; } | { currency: string; discount: number; fixed_price: number; payment_frequency_count: number; payment_frequency_interval: 'Day' | 'Week' | 'Month' | 'Year'; purchasing_power_parity: boolean; subscription_period_count: number; subscription_period_interval: 'Day' | 'Week' | 'Month' | 'Year'; type: 'usage_based_price'; meters?: { meter_id: string; credit_entitlement_id?: string; description?: string; free_threshold?: number; measurement_unit?: string; meter_units_per_credit?: string; name?: string; price_per_unit?: string; }[]; tax_inclusive?: boolean; }`\n  - `product_id: string`\n  - `tax_category: 'digital_products' | 'saas' | 'e_book' | 'edtech'`\n  - `updated_at: string`\n  - `addons?: string[]`\n  - `description?: string`\n  - `digital_product_delivery?: { external_url?: string; files?: { file_id: string; file_name: string; url: string; }[]; instructions?: string; }`\n  - `image?: string`\n  - `license_key_activation_message?: string`\n  - `license_key_activations_limit?: number`\n  - `license_key_duration?: { count: number; interval: 'Day' | 'Week' | 'Month' | 'Year'; }`\n  - `name?: string`\n  - `product_collection_id?: string`\n\n### Example\n\n```typescript\nimport DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments();\n\nconst product = await client.products.retrieve('id');\n\nconsole.log(product);\n```",
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
      "## update\n\n`client.products.update(id: string, addons?: string[], brand_id?: string, credit_entitlements?: { credit_entitlement_id: string; credits_amount: string; currency?: currency; expires_after_days?: number; low_balance_threshold_percent?: number; max_rollover_count?: number; overage_behavior?: cbb_overage_behavior; overage_enabled?: boolean; overage_limit?: string; price_per_unit?: string; proration_behavior?: cbb_proration_behavior; rollover_enabled?: boolean; rollover_percentage?: number; rollover_timeframe_count?: number; rollover_timeframe_interval?: time_interval; trial_credits?: string; trial_credits_expire_after_trial?: boolean; }[], description?: string, digital_product_delivery?: { external_url?: string; files?: string[]; instructions?: string; }, image_id?: string, license_key_activation_message?: string, license_key_activations_limit?: number, license_key_duration?: { count: number; interval: time_interval; }, license_key_enabled?: boolean, metadata?: object, name?: string, price?: { currency: currency; discount: number; price: number; purchasing_power_parity: boolean; type: 'one_time_price'; pay_what_you_want?: boolean; suggested_price?: number; tax_inclusive?: boolean; } | { currency: currency; discount: number; payment_frequency_count: number; payment_frequency_interval: time_interval; price: number; purchasing_power_parity: boolean; subscription_period_count: number; subscription_period_interval: time_interval; type: 'recurring_price'; tax_inclusive?: boolean; trial_period_days?: number; } | { currency: currency; discount: number; fixed_price: number; payment_frequency_count: number; payment_frequency_interval: time_interval; purchasing_power_parity: boolean; subscription_period_count: number; subscription_period_interval: time_interval; type: 'usage_based_price'; meters?: add_meter_to_price[]; tax_inclusive?: boolean; }, tax_category?: 'digital_products' | 'saas' | 'e_book' | 'edtech'): void`\n\n**patch** `/products/{id}`\n\n### Parameters\n\n- `id: string`\n\n- `addons?: string[]`\n  Available Addons for subscription products\n\n- `brand_id?: string`\n\n- `credit_entitlements?: { credit_entitlement_id: string; credits_amount: string; currency?: string; expires_after_days?: number; low_balance_threshold_percent?: number; max_rollover_count?: number; overage_behavior?: 'forgive_at_reset' | 'invoice_at_billing' | 'carry_deficit' | 'carry_deficit_auto_repay'; overage_enabled?: boolean; overage_limit?: string; price_per_unit?: string; proration_behavior?: 'prorate' | 'no_prorate'; rollover_enabled?: boolean; rollover_percentage?: number; rollover_timeframe_count?: number; rollover_timeframe_interval?: 'Day' | 'Week' | 'Month' | 'Year'; trial_credits?: string; trial_credits_expire_after_trial?: boolean; }[]`\n  Credit entitlements to update (replaces all existing when present)\nSend empty array to remove all, omit field to leave unchanged\n\n- `description?: string`\n  Description of the product, optional and must be at most 1000 characters.\n\n- `digital_product_delivery?: { external_url?: string; files?: string[]; instructions?: string; }`\n  Choose how you would like you digital product delivered\n  - `external_url?: string`\n    External URL to digital product\n  - `files?: string[]`\n    Uploaded files ids of digital product\n  - `instructions?: string`\n    Instructions to download and use the digital product\n\n- `image_id?: string`\n  Product image id after its uploaded to S3\n\n- `license_key_activation_message?: string`\n  Message sent to the customer upon license key activation.\n\nOnly applicable if `license_key_enabled` is `true`. This message contains instructions for\nactivating the license key.\n\n- `license_key_activations_limit?: number`\n  Limit for the number of activations for the license key.\n\nOnly applicable if `license_key_enabled` is `true`. Represents the maximum number of times\nthe license key can be activated.\n\n- `license_key_duration?: { count: number; interval: 'Day' | 'Week' | 'Month' | 'Year'; }`\n  Duration of the license key if enabled.\n\nOnly applicable if `license_key_enabled` is `true`. Represents the duration in days for which\nthe license key is valid.\n  - `count: number`\n  - `interval: 'Day' | 'Week' | 'Month' | 'Year'`\n\n- `license_key_enabled?: boolean`\n  Whether the product requires a license key.\n\nIf `true`, additional fields related to license key (duration, activations limit, activation message)\nbecome applicable.\n\n- `metadata?: object`\n  Additional metadata for the product\n\n- `name?: string`\n  Name of the product, optional and must be at most 100 characters.\n\n- `price?: { currency: string; discount: number; price: number; purchasing_power_parity: boolean; type: 'one_time_price'; pay_what_you_want?: boolean; suggested_price?: number; tax_inclusive?: boolean; } | { currency: string; discount: number; payment_frequency_count: number; payment_frequency_interval: 'Day' | 'Week' | 'Month' | 'Year'; price: number; purchasing_power_parity: boolean; subscription_period_count: number; subscription_period_interval: 'Day' | 'Week' | 'Month' | 'Year'; type: 'recurring_price'; tax_inclusive?: boolean; trial_period_days?: number; } | { currency: string; discount: number; fixed_price: number; payment_frequency_count: number; payment_frequency_interval: 'Day' | 'Week' | 'Month' | 'Year'; purchasing_power_parity: boolean; subscription_period_count: number; subscription_period_interval: 'Day' | 'Week' | 'Month' | 'Year'; type: 'usage_based_price'; meters?: { meter_id: string; credit_entitlement_id?: string; description?: string; free_threshold?: number; measurement_unit?: string; meter_units_per_credit?: string; name?: string; price_per_unit?: string; }[]; tax_inclusive?: boolean; }`\n  Price details of the product.\n\n- `tax_category?: 'digital_products' | 'saas' | 'e_book' | 'edtech'`\n  Tax category of the product.\n\n### Example\n\n```typescript\nimport DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments();\n\nawait client.products.update('id')\n```",
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
      "{ business_id: string; created_at: string; is_recurring: boolean; metadata: object; product_id: string; tax_category: 'digital_products' | 'saas' | 'e_book' | 'edtech'; updated_at: string; currency?: string; description?: string; image?: string; name?: string; price?: number; price_detail?: { currency: currency; discount: number; price: number; purchasing_power_parity: boolean; type: 'one_time_price'; pay_what_you_want?: boolean; suggested_price?: number; tax_inclusive?: boolean; } | { currency: currency; discount: number; payment_frequency_count: number; payment_frequency_interval: time_interval; price: number; purchasing_power_parity: boolean; subscription_period_count: number; subscription_period_interval: time_interval; type: 'recurring_price'; tax_inclusive?: boolean; trial_period_days?: number; } | { currency: currency; discount: number; fixed_price: number; payment_frequency_count: number; payment_frequency_interval: time_interval; purchasing_power_parity: boolean; subscription_period_count: number; subscription_period_interval: time_interval; type: 'usage_based_price'; meters?: add_meter_to_price[]; tax_inclusive?: boolean; }; tax_inclusive?: boolean; }",
    markdown:
      "## list\n\n`client.products.list(archived?: boolean, brand_id?: string, page_number?: number, page_size?: number, recurring?: boolean): { business_id: string; created_at: string; is_recurring: boolean; metadata: object; product_id: string; tax_category: tax_category; updated_at: string; currency?: currency; description?: string; image?: string; name?: string; price?: number; price_detail?: price; tax_inclusive?: boolean; }`\n\n**get** `/products`\n\n### Parameters\n\n- `archived?: boolean`\n  List archived products\n\n- `brand_id?: string`\n  filter by Brand id\n\n- `page_number?: number`\n  Page number default is 0\n\n- `page_size?: number`\n  Page size default is 10 max is 100\n\n- `recurring?: boolean`\n  Filter products by pricing type:\n- `true`: Show only recurring pricing products (e.g. subscriptions)\n- `false`: Show only one-time price products\n- `null` or absent: Show both types of products\n\n### Returns\n\n- `{ business_id: string; created_at: string; is_recurring: boolean; metadata: object; product_id: string; tax_category: 'digital_products' | 'saas' | 'e_book' | 'edtech'; updated_at: string; currency?: string; description?: string; image?: string; name?: string; price?: number; price_detail?: { currency: currency; discount: number; price: number; purchasing_power_parity: boolean; type: 'one_time_price'; pay_what_you_want?: boolean; suggested_price?: number; tax_inclusive?: boolean; } | { currency: currency; discount: number; payment_frequency_count: number; payment_frequency_interval: time_interval; price: number; purchasing_power_parity: boolean; subscription_period_count: number; subscription_period_interval: time_interval; type: 'recurring_price'; tax_inclusive?: boolean; trial_period_days?: number; } | { currency: currency; discount: number; fixed_price: number; payment_frequency_count: number; payment_frequency_interval: time_interval; purchasing_power_parity: boolean; subscription_period_count: number; subscription_period_interval: time_interval; type: 'usage_based_price'; meters?: add_meter_to_price[]; tax_inclusive?: boolean; }; tax_inclusive?: boolean; }`\n\n  - `business_id: string`\n  - `created_at: string`\n  - `is_recurring: boolean`\n  - `metadata: object`\n  - `product_id: string`\n  - `tax_category: 'digital_products' | 'saas' | 'e_book' | 'edtech'`\n  - `updated_at: string`\n  - `currency?: string`\n  - `description?: string`\n  - `image?: string`\n  - `name?: string`\n  - `price?: number`\n  - `price_detail?: { currency: string; discount: number; price: number; purchasing_power_parity: boolean; type: 'one_time_price'; pay_what_you_want?: boolean; suggested_price?: number; tax_inclusive?: boolean; } | { currency: string; discount: number; payment_frequency_count: number; payment_frequency_interval: 'Day' | 'Week' | 'Month' | 'Year'; price: number; purchasing_power_parity: boolean; subscription_period_count: number; subscription_period_interval: 'Day' | 'Week' | 'Month' | 'Year'; type: 'recurring_price'; tax_inclusive?: boolean; trial_period_days?: number; } | { currency: string; discount: number; fixed_price: number; payment_frequency_count: number; payment_frequency_interval: 'Day' | 'Week' | 'Month' | 'Year'; purchasing_power_parity: boolean; subscription_period_count: number; subscription_period_interval: 'Day' | 'Week' | 'Month' | 'Year'; type: 'usage_based_price'; meters?: { meter_id: string; credit_entitlement_id?: string; description?: string; free_threshold?: number; measurement_unit?: string; meter_units_per_credit?: string; name?: string; price_per_unit?: string; }[]; tax_inclusive?: boolean; }`\n  - `tax_inclusive?: boolean`\n\n### Example\n\n```typescript\nimport DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments();\n\n// Automatically fetches more pages as needed.\nfor await (const productListResponse of client.products.list()) {\n  console.log(productListResponse);\n}\n```",
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
      'name?: string;',
      'preserve_on_plan_change?: boolean;',
      'restricted_to?: string[];',
      'subscription_cycles?: number;',
      'usage_limit?: number;',
    ],
    response:
      "{ amount: number; business_id: string; code: string; created_at: string; discount_id: string; preserve_on_plan_change: boolean; restricted_to: string[]; times_used: number; type: 'percentage'; expires_at?: string; name?: string; subscription_cycles?: number; usage_limit?: number; }",
    markdown:
      "## create\n\n`client.discounts.create(amount: number, type: 'percentage', code?: string, expires_at?: string, name?: string, preserve_on_plan_change?: boolean, restricted_to?: string[], subscription_cycles?: number, usage_limit?: number): { amount: number; business_id: string; code: string; created_at: string; discount_id: string; preserve_on_plan_change: boolean; restricted_to: string[]; times_used: number; type: discount_type; expires_at?: string; name?: string; subscription_cycles?: number; usage_limit?: number; }`\n\n**post** `/discounts`\n\nPOST /discounts\nIf `code` is omitted or empty, a random 16-char uppercase code is generated.\n\n### Parameters\n\n- `amount: number`\n  The discount amount.\n\n- If `discount_type` is **not** `percentage`, `amount` is in **USD cents**. For example, `100` means `$1.00`.\n  Only USD is allowed.\n- If `discount_type` **is** `percentage`, `amount` is in **basis points**. For example, `540` means `5.4%`.\n\nMust be at least 1.\n\n- `type: 'percentage'`\n  The discount type (e.g. `percentage`, `flat`, or `flat_per_unit`).\n\n- `code?: string`\n  Optionally supply a code (will be uppercased).\n- Must be at least 3 characters if provided.\n- If omitted, a random 16-character code is generated.\n\n- `expires_at?: string`\n  When the discount expires, if ever.\n\n- `name?: string`\n\n- `preserve_on_plan_change?: boolean`\n  Whether this discount should be preserved when a subscription changes plans.\nDefault: false (discount is removed on plan change)\n\n- `restricted_to?: string[]`\n  List of product IDs to restrict usage (if any).\n\n- `subscription_cycles?: number`\n  Number of subscription billing cycles this discount is valid for.\nIf not provided, the discount will be applied indefinitely to\nall recurring payments related to the subscription.\n\n- `usage_limit?: number`\n  How many times this discount can be used (if any).\nMust be >= 1 if provided.\n\n### Returns\n\n- `{ amount: number; business_id: string; code: string; created_at: string; discount_id: string; preserve_on_plan_change: boolean; restricted_to: string[]; times_used: number; type: 'percentage'; expires_at?: string; name?: string; subscription_cycles?: number; usage_limit?: number; }`\n\n  - `amount: number`\n  - `business_id: string`\n  - `code: string`\n  - `created_at: string`\n  - `discount_id: string`\n  - `preserve_on_plan_change: boolean`\n  - `restricted_to: string[]`\n  - `times_used: number`\n  - `type: 'percentage'`\n  - `expires_at?: string`\n  - `name?: string`\n  - `subscription_cycles?: number`\n  - `usage_limit?: number`\n\n### Example\n\n```typescript\nimport DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments();\n\nconst discount = await client.discounts.create({ amount: 0, type: 'percentage' });\n\nconsole.log(discount);\n```",
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
      "{ amount: number; business_id: string; code: string; created_at: string; discount_id: string; preserve_on_plan_change: boolean; restricted_to: string[]; times_used: number; type: 'percentage'; expires_at?: string; name?: string; subscription_cycles?: number; usage_limit?: number; }",
    markdown:
      "## retrieve\n\n`client.discounts.retrieve(discount_id: string): { amount: number; business_id: string; code: string; created_at: string; discount_id: string; preserve_on_plan_change: boolean; restricted_to: string[]; times_used: number; type: discount_type; expires_at?: string; name?: string; subscription_cycles?: number; usage_limit?: number; }`\n\n**get** `/discounts/{discount_id}`\n\nGET /discounts/{discount_id}\n\n### Parameters\n\n- `discount_id: string`\n\n### Returns\n\n- `{ amount: number; business_id: string; code: string; created_at: string; discount_id: string; preserve_on_plan_change: boolean; restricted_to: string[]; times_used: number; type: 'percentage'; expires_at?: string; name?: string; subscription_cycles?: number; usage_limit?: number; }`\n\n  - `amount: number`\n  - `business_id: string`\n  - `code: string`\n  - `created_at: string`\n  - `discount_id: string`\n  - `preserve_on_plan_change: boolean`\n  - `restricted_to: string[]`\n  - `times_used: number`\n  - `type: 'percentage'`\n  - `expires_at?: string`\n  - `name?: string`\n  - `subscription_cycles?: number`\n  - `usage_limit?: number`\n\n### Example\n\n```typescript\nimport DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments();\n\nconst discount = await client.discounts.retrieve('discount_id');\n\nconsole.log(discount);\n```",
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
      'name?: string;',
      'preserve_on_plan_change?: boolean;',
      'restricted_to?: string[];',
      'subscription_cycles?: number;',
      "type?: 'percentage';",
      'usage_limit?: number;',
    ],
    response:
      "{ amount: number; business_id: string; code: string; created_at: string; discount_id: string; preserve_on_plan_change: boolean; restricted_to: string[]; times_used: number; type: 'percentage'; expires_at?: string; name?: string; subscription_cycles?: number; usage_limit?: number; }",
    markdown:
      "## update\n\n`client.discounts.update(discount_id: string, amount?: number, code?: string, expires_at?: string, name?: string, preserve_on_plan_change?: boolean, restricted_to?: string[], subscription_cycles?: number, type?: 'percentage', usage_limit?: number): { amount: number; business_id: string; code: string; created_at: string; discount_id: string; preserve_on_plan_change: boolean; restricted_to: string[]; times_used: number; type: discount_type; expires_at?: string; name?: string; subscription_cycles?: number; usage_limit?: number; }`\n\n**patch** `/discounts/{discount_id}`\n\nPATCH /discounts/{discount_id}\n\n### Parameters\n\n- `discount_id: string`\n\n- `amount?: number`\n  If present, update the discount amount:\n- If `discount_type` is `percentage`, this represents **basis points** (e.g., `540` = `5.4%`).\n- Otherwise, this represents **USD cents** (e.g., `100` = `$1.00`).\n\nMust be at least 1 if provided.\n\n- `code?: string`\n  If present, update the discount code (uppercase).\n\n- `expires_at?: string`\n\n- `name?: string`\n\n- `preserve_on_plan_change?: boolean`\n  Whether this discount should be preserved when a subscription changes plans.\nIf not provided, the existing value is kept.\n\n- `restricted_to?: string[]`\n  If present, replaces all restricted product IDs with this new set.\nTo remove all restrictions, send empty array\n\n- `subscription_cycles?: number`\n  Number of subscription billing cycles this discount is valid for.\nIf not provided, the discount will be applied indefinitely to\nall recurring payments related to the subscription.\n\n- `type?: 'percentage'`\n  If present, update the discount type.\n\n- `usage_limit?: number`\n\n### Returns\n\n- `{ amount: number; business_id: string; code: string; created_at: string; discount_id: string; preserve_on_plan_change: boolean; restricted_to: string[]; times_used: number; type: 'percentage'; expires_at?: string; name?: string; subscription_cycles?: number; usage_limit?: number; }`\n\n  - `amount: number`\n  - `business_id: string`\n  - `code: string`\n  - `created_at: string`\n  - `discount_id: string`\n  - `preserve_on_plan_change: boolean`\n  - `restricted_to: string[]`\n  - `times_used: number`\n  - `type: 'percentage'`\n  - `expires_at?: string`\n  - `name?: string`\n  - `subscription_cycles?: number`\n  - `usage_limit?: number`\n\n### Example\n\n```typescript\nimport DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments();\n\nconst discount = await client.discounts.update('discount_id');\n\nconsole.log(discount);\n```",
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
      "{ amount: number; business_id: string; code: string; created_at: string; discount_id: string; preserve_on_plan_change: boolean; restricted_to: string[]; times_used: number; type: 'percentage'; expires_at?: string; name?: string; subscription_cycles?: number; usage_limit?: number; }",
    markdown:
      "## list\n\n`client.discounts.list(active?: boolean, code?: string, discount_type?: 'percentage', page_number?: number, page_size?: number, product_id?: string): { amount: number; business_id: string; code: string; created_at: string; discount_id: string; preserve_on_plan_change: boolean; restricted_to: string[]; times_used: number; type: discount_type; expires_at?: string; name?: string; subscription_cycles?: number; usage_limit?: number; }`\n\n**get** `/discounts`\n\nGET /discounts\n\n### Parameters\n\n- `active?: boolean`\n  Filter by active status (true = not expired, false = expired)\n\n- `code?: string`\n  Filter by discount code (partial match, case-insensitive)\n\n- `discount_type?: 'percentage'`\n  Filter by discount type (percentage)\n\n- `page_number?: number`\n  Page number (default = 0).\n\n- `page_size?: number`\n  Page size (default = 10, max = 100).\n\n- `product_id?: string`\n  Filter by product restriction (only discounts that apply to this product)\n\n### Returns\n\n- `{ amount: number; business_id: string; code: string; created_at: string; discount_id: string; preserve_on_plan_change: boolean; restricted_to: string[]; times_used: number; type: 'percentage'; expires_at?: string; name?: string; subscription_cycles?: number; usage_limit?: number; }`\n\n  - `amount: number`\n  - `business_id: string`\n  - `code: string`\n  - `created_at: string`\n  - `discount_id: string`\n  - `preserve_on_plan_change: boolean`\n  - `restricted_to: string[]`\n  - `times_used: number`\n  - `type: 'percentage'`\n  - `expires_at?: string`\n  - `name?: string`\n  - `subscription_cycles?: number`\n  - `usage_limit?: number`\n\n### Example\n\n```typescript\nimport DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments();\n\n// Automatically fetches more pages as needed.\nfor await (const discount of client.discounts.list()) {\n  console.log(discount);\n}\n```",
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
      "{ amount: number; business_id: string; code: string; created_at: string; discount_id: string; preserve_on_plan_change: boolean; restricted_to: string[]; times_used: number; type: 'percentage'; expires_at?: string; name?: string; subscription_cycles?: number; usage_limit?: number; }",
    markdown:
      "## retrieve_by_code\n\n`client.discounts.retrieveByCode(code: string): { amount: number; business_id: string; code: string; created_at: string; discount_id: string; preserve_on_plan_change: boolean; restricted_to: string[]; times_used: number; type: discount_type; expires_at?: string; name?: string; subscription_cycles?: number; usage_limit?: number; }`\n\n**get** `/discounts/code/{code}`\n\nValidate and fetch a discount by its code name (e.g., \"SAVE20\").\nThis allows real-time validation directly against the API using the\nhuman-readable discount code instead of requiring the internal discount_id.\n\n### Parameters\n\n- `code: string`\n\n### Returns\n\n- `{ amount: number; business_id: string; code: string; created_at: string; discount_id: string; preserve_on_plan_change: boolean; restricted_to: string[]; times_used: number; type: 'percentage'; expires_at?: string; name?: string; subscription_cycles?: number; usage_limit?: number; }`\n\n  - `amount: number`\n  - `business_id: string`\n  - `code: string`\n  - `created_at: string`\n  - `discount_id: string`\n  - `preserve_on_plan_change: boolean`\n  - `restricted_to: string[]`\n  - `times_used: number`\n  - `type: 'percentage'`\n  - `expires_at?: string`\n  - `name?: string`\n  - `subscription_cycles?: number`\n  - `usage_limit?: number`\n\n### Example\n\n```typescript\nimport DodoPayments from 'dodopayments';\n\nconst client = new DodoPayments();\n\nconst discount = await client.discounts.retrieveByCode('code');\n\nconsole.log(discount);\n```",
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
    fuzzy: 0.2,
    boost: {
      name: 3,
      endpoint: 2,
      summary: 2,
      qualified: 2,
      content: 1,
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
    if (opts?.docsDir) {
      await instance.loadDocsDirectory(opts.docsDir);
    }
    return instance;
  }

  // Note: Language is accepted for interface consistency with remote search, but currently has no
  // effect since this local search only supports TypeScript docs.
  search(props: {
    query: string;
    language?: string;
    detail?: string;
    maxResults?: number;
    maxLength?: number;
  }): SearchResult {
    const { query, detail = 'default', maxResults = 5, maxLength = 100_000 } = props;

    const useMarkdown = detail === 'verbose' || detail === 'high';

    // Search both indices and merge results by score
    const methodHits = this.methodIndex
      .search(query)
      .map((hit) => ({ ...hit, _kind: 'http_method' as const }));
    const proseHits = this.proseIndex.search(query).map((hit) => ({ ...hit, _kind: 'prose' as const }));
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
          fullResults.push({
            method: m.qualified,
            summary: m.summary,
            description: m.description,
            endpoint: `${m.httpMethod.toUpperCase()} ${m.endpoint}`,
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
          this.indexProse(content, file.name);
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
