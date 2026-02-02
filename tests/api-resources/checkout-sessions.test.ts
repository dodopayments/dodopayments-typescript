// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import DodoPayments from 'dodopayments';

const client = new DodoPayments({
  bearerToken: 'My Bearer Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource checkoutSessions', () => {
  test('create: only required params', async () => {
    const responsePromise = client.checkoutSessions.create({
      product_cart: [{ product_id: 'product_id', quantity: 0 }],
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('create: required and optional params', async () => {
    const response = await client.checkoutSessions.create({
      product_cart: [
        {
          product_id: 'product_id',
          quantity: 0,
          addons: [{ addon_id: 'addon_id', quantity: 0 }],
          amount: 0,
        },
      ],
      allowed_payment_method_types: ['ach'],
      billing_address: {
        country: 'AF',
        city: 'city',
        state: 'state',
        street: 'street',
        zipcode: 'zipcode',
      },
      billing_currency: 'AED',
      confirm: true,
      custom_fields: [
        {
          field_type: 'text',
          key: 'key',
          label: 'label',
          options: ['string'],
          placeholder: 'placeholder',
          required: true,
        },
      ],
      customer: { customer_id: 'customer_id' },
      customization: {
        force_language: 'force_language',
        show_on_demand_tag: true,
        show_order_details: true,
        theme: 'dark',
        theme_config: {
          dark: {
            bg_primary: 'bg_primary',
            bg_secondary: 'bg_secondary',
            border_primary: 'border_primary',
            border_secondary: 'border_secondary',
            button_primary: 'button_primary',
            button_primary_hover: 'button_primary_hover',
            button_secondary: 'button_secondary',
            button_secondary_hover: 'button_secondary_hover',
            button_text_primary: 'button_text_primary',
            button_text_secondary: 'button_text_secondary',
            input_focus_border: 'input_focus_border',
            text_error: 'text_error',
            text_placeholder: 'text_placeholder',
            text_primary: 'text_primary',
            text_secondary: 'text_secondary',
            text_success: 'text_success',
          },
          font_size: 'xs',
          font_weight: 'normal',
          light: {
            bg_primary: 'bg_primary',
            bg_secondary: 'bg_secondary',
            border_primary: 'border_primary',
            border_secondary: 'border_secondary',
            button_primary: 'button_primary',
            button_primary_hover: 'button_primary_hover',
            button_secondary: 'button_secondary',
            button_secondary_hover: 'button_secondary_hover',
            button_text_primary: 'button_text_primary',
            button_text_secondary: 'button_text_secondary',
            input_focus_border: 'input_focus_border',
            text_error: 'text_error',
            text_placeholder: 'text_placeholder',
            text_primary: 'text_primary',
            text_secondary: 'text_secondary',
            text_success: 'text_success',
          },
          pay_button_text: 'pay_button_text',
          radius: 'radius',
        },
      },
      discount_code: 'discount_code',
      feature_flags: {
        allow_currency_selection: true,
        allow_customer_editing_city: true,
        allow_customer_editing_country: true,
        allow_customer_editing_email: true,
        allow_customer_editing_name: true,
        allow_customer_editing_state: true,
        allow_customer_editing_street: true,
        allow_customer_editing_zipcode: true,
        allow_discount_code: true,
        allow_phone_number_collection: true,
        allow_tax_id: true,
        always_create_new_customer: true,
        redirect_immediately: true,
      },
      force_3ds: true,
      metadata: { foo: 'string' },
      minimal_address: true,
      payment_method_id: 'payment_method_id',
      product_collection_id: 'product_collection_id',
      return_url: 'return_url',
      short_link: true,
      show_saved_payment_methods: true,
      subscription_data: {
        on_demand: {
          mandate_only: true,
          adaptive_currency_fees_inclusive: true,
          product_currency: 'AED',
          product_description: 'product_description',
          product_price: 0,
        },
        trial_period_days: 0,
      },
    });
  });

  test('retrieve', async () => {
    const responsePromise = client.checkoutSessions.retrieve('id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('preview: only required params', async () => {
    const responsePromise = client.checkoutSessions.preview({
      product_cart: [{ product_id: 'product_id', quantity: 0 }],
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('preview: required and optional params', async () => {
    const response = await client.checkoutSessions.preview({
      product_cart: [
        {
          product_id: 'product_id',
          quantity: 0,
          addons: [{ addon_id: 'addon_id', quantity: 0 }],
          amount: 0,
        },
      ],
      allowed_payment_method_types: ['ach'],
      billing_address: {
        country: 'AF',
        city: 'city',
        state: 'state',
        street: 'street',
        zipcode: 'zipcode',
      },
      billing_currency: 'AED',
      confirm: true,
      custom_fields: [
        {
          field_type: 'text',
          key: 'key',
          label: 'label',
          options: ['string'],
          placeholder: 'placeholder',
          required: true,
        },
      ],
      customer: { customer_id: 'customer_id' },
      customization: {
        force_language: 'force_language',
        show_on_demand_tag: true,
        show_order_details: true,
        theme: 'dark',
        theme_config: {
          dark: {
            bg_primary: 'bg_primary',
            bg_secondary: 'bg_secondary',
            border_primary: 'border_primary',
            border_secondary: 'border_secondary',
            button_primary: 'button_primary',
            button_primary_hover: 'button_primary_hover',
            button_secondary: 'button_secondary',
            button_secondary_hover: 'button_secondary_hover',
            button_text_primary: 'button_text_primary',
            button_text_secondary: 'button_text_secondary',
            input_focus_border: 'input_focus_border',
            text_error: 'text_error',
            text_placeholder: 'text_placeholder',
            text_primary: 'text_primary',
            text_secondary: 'text_secondary',
            text_success: 'text_success',
          },
          font_size: 'xs',
          font_weight: 'normal',
          light: {
            bg_primary: 'bg_primary',
            bg_secondary: 'bg_secondary',
            border_primary: 'border_primary',
            border_secondary: 'border_secondary',
            button_primary: 'button_primary',
            button_primary_hover: 'button_primary_hover',
            button_secondary: 'button_secondary',
            button_secondary_hover: 'button_secondary_hover',
            button_text_primary: 'button_text_primary',
            button_text_secondary: 'button_text_secondary',
            input_focus_border: 'input_focus_border',
            text_error: 'text_error',
            text_placeholder: 'text_placeholder',
            text_primary: 'text_primary',
            text_secondary: 'text_secondary',
            text_success: 'text_success',
          },
          pay_button_text: 'pay_button_text',
          radius: 'radius',
        },
      },
      discount_code: 'discount_code',
      feature_flags: {
        allow_currency_selection: true,
        allow_customer_editing_city: true,
        allow_customer_editing_country: true,
        allow_customer_editing_email: true,
        allow_customer_editing_name: true,
        allow_customer_editing_state: true,
        allow_customer_editing_street: true,
        allow_customer_editing_zipcode: true,
        allow_discount_code: true,
        allow_phone_number_collection: true,
        allow_tax_id: true,
        always_create_new_customer: true,
        redirect_immediately: true,
      },
      force_3ds: true,
      metadata: { foo: 'string' },
      minimal_address: true,
      payment_method_id: 'payment_method_id',
      product_collection_id: 'product_collection_id',
      return_url: 'return_url',
      short_link: true,
      show_saved_payment_methods: true,
      subscription_data: {
        on_demand: {
          mandate_only: true,
          adaptive_currency_fees_inclusive: true,
          product_currency: 'AED',
          product_description: 'product_description',
          product_price: 0,
        },
        trial_period_days: 0,
      },
    });
  });
});
