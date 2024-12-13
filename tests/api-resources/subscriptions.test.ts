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
      billing: { city: 'city', country: 'AF', state: 'state', street: 'street', zipcode: 0 },
      customer: { email: 'email', name: 'name' },
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
      billing: { city: 'city', country: 'AF', state: 'state', street: 'street', zipcode: 0 },
      customer: { email: 'email', name: 'name', phone_number: 'phone_number' },
      product_id: 'product_id',
      quantity: 0,
      payment_link: true,
      return_url: 'return_url',
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

  test('update: only required params', async () => {
    const responsePromise = client.subscriptions.update('subscription_id', { status: 'pending' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('update: required and optional params', async () => {
    const response = await client.subscriptions.update('subscription_id', { status: 'pending' });
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
      client.subscriptions.list({ page_number: 0, page_size: 0 }, { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(DodoPayments.NotFoundError);
  });
});
