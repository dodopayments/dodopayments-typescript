// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import DodoPayments from 'dodopayments';
import { Response } from 'node-fetch';

const client = new DodoPayments({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource subscriptions', () => {
  test('create: only required params', async () => {
    const responsePromise = client.subscriptions.create({
      billing: { city: 'city', country: 'AF', state: 'state', street: 'street', zipcode: 'zipcode' },
      customer: { customer_id: 'customer_id' },
      product_id: 'product_id',
      quantity: 0,
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
    const response = await client.subscriptions.create({
      billing: { city: 'city', country: 'AF', state: 'state', street: 'street', zipcode: 'zipcode' },
      customer: { customer_id: 'customer_id' },
      product_id: 'product_id',
      quantity: 0,
      addons: [{ addon_id: 'addon_id', quantity: 0 }],
      allowed_payment_method_types: ['credit'],
      billing_currency: 'AED',
      discount_code: 'discount_code',
      metadata: { foo: 'string' },
      on_demand: { mandate_only: true, product_price: 0 },
      payment_link: true,
      return_url: 'return_url',
      show_saved_payment_methods: true,
      tax_id: 'tax_id',
      trial_period_days: 0,
    });
  });

  test('retrieve', async () => {
    const responsePromise = client.subscriptions.retrieve('subscription_id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('retrieve: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.subscriptions.retrieve('subscription_id', { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(DodoPayments.NotFoundError);
  });

  test('update', async () => {
    const responsePromise = client.subscriptions.update('subscription_id', {});
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('list', async () => {
    const responsePromise = client.subscriptions.list();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('list: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(client.subscriptions.list({ path: '/_stainless_unknown_path' })).rejects.toThrow(
      DodoPayments.NotFoundError,
    );
  });

  test('list: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.subscriptions.list(
        {
          created_at_gte: '2019-12-27T18:11:19.117Z',
          created_at_lte: '2019-12-27T18:11:19.117Z',
          customer_id: 'customer_id',
          page_number: 0,
          page_size: 0,
          status: 'pending',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(DodoPayments.NotFoundError);
  });

  test('changePlan: only required params', async () => {
    const responsePromise = client.subscriptions.changePlan('subscription_id', {
      product_id: 'product_id',
      proration_billing_mode: 'prorated_immediately',
      quantity: 0,
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('changePlan: required and optional params', async () => {
    const response = await client.subscriptions.changePlan('subscription_id', {
      product_id: 'product_id',
      proration_billing_mode: 'prorated_immediately',
      quantity: 0,
    });
  });

  test('charge: only required params', async () => {
    const responsePromise = client.subscriptions.charge('subscription_id', { product_price: 0 });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('charge: required and optional params', async () => {
    const response = await client.subscriptions.charge('subscription_id', { product_price: 0 });
  });
});
