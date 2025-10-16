// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import DodoPayments from 'dodopayments';

const client = new DodoPayments({
  bearerToken: 'My Bearer Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource payments', () => {
  test('create: only required params', async () => {
    const responsePromise = client.payments.create({
      billing: { city: 'city', country: 'AF', state: 'state', street: 'street', zipcode: 'zipcode' },
      customer: { customer_id: 'customer_id' },
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
    const response = await client.payments.create({
      billing: { city: 'city', country: 'AF', state: 'state', street: 'street', zipcode: 'zipcode' },
      customer: { customer_id: 'customer_id' },
      product_cart: [{ product_id: 'product_id', quantity: 0, amount: 0 }],
      allowed_payment_method_types: ['credit'],
      billing_currency: 'AED',
      discount_code: 'discount_code',
      force_3ds: true,
      metadata: { foo: 'string' },
      payment_link: true,
      return_url: 'return_url',
      show_saved_payment_methods: true,
      tax_id: 'tax_id',
    });
  });

  test('retrieve', async () => {
    const responsePromise = client.payments.retrieve('payment_id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('list', async () => {
    const responsePromise = client.payments.list();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('list: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.payments.list(
        {
          brand_id: 'brand_id',
          created_at_gte: '2019-12-27T18:11:19.117Z',
          created_at_lte: '2019-12-27T18:11:19.117Z',
          customer_id: 'customer_id',
          page_number: 0,
          page_size: 0,
          status: 'succeeded',
          subscription_id: 'subscription_id',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(DodoPayments.NotFoundError);
  });

  test('retrieveLineItems', async () => {
    const responsePromise = client.payments.retrieveLineItems('payment_id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });
});
