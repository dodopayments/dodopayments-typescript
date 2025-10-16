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
        { product_id: 'product_id', quantity: 0, addons: [{ addon_id: 'addon_id', quantity: 0 }], amount: 0 },
      ],
      allowed_payment_method_types: ['credit'],
      billing_address: { country: 'AF', city: 'city', state: 'state', street: 'street', zipcode: 'zipcode' },
      billing_currency: 'AED',
      confirm: true,
      customer: { customer_id: 'customer_id' },
      customization: {
        force_language: 'force_language',
        show_on_demand_tag: true,
        show_order_details: true,
        theme: 'dark',
      },
      discount_code: 'discount_code',
      feature_flags: {
        allow_currency_selection: true,
        allow_discount_code: true,
        allow_phone_number_collection: true,
        allow_tax_id: true,
        always_create_new_customer: true,
      },
      force_3ds: true,
      metadata: { foo: 'string' },
      return_url: 'return_url',
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
