// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import DodoPayments from 'dodopayments';
import { Response } from 'node-fetch';

const client = new DodoPayments({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource products', () => {
  test('create: only required params', async () => {
    const responsePromise = client.products.create({
      price: {
        currency: 'AED',
        discount: 0,
        price: 0,
        purchasing_power_parity: true,
        type: 'one_time_price',
      },
      tax_category: 'digital_products',
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
    const response = await client.products.create({
      price: {
        currency: 'AED',
        discount: 0,
        price: 0,
        purchasing_power_parity: true,
        type: 'one_time_price',
      },
      tax_category: 'digital_products',
      description: 'description',
      name: 'name',
    });
  });

  test('retrieve', async () => {
    const responsePromise = client.products.retrieve('id');
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
    await expect(client.products.retrieve('id', { path: '/_stainless_unknown_path' })).rejects.toThrow(
      DodoPayments.NotFoundError,
    );
  });

  test('update', async () => {
    const responsePromise = client.products.update('id', {});
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('list', async () => {
    const responsePromise = client.products.list();
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
    await expect(client.products.list({ path: '/_stainless_unknown_path' })).rejects.toThrow(
      DodoPayments.NotFoundError,
    );
  });

  test('list: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.products.list({ page_number: 0, page_size: 0 }, { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(DodoPayments.NotFoundError);
  });
});
