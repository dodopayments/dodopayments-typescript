// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import DodoPayments from 'dodopayments';

const client = new DodoPayments({
  bearerToken: 'My Bearer Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource shortLinks', () => {
  test('create: only required params', async () => {
    const responsePromise = client.products.shortLinks.create('id', { slug: 'slug' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('create: required and optional params', async () => {
    const response = await client.products.shortLinks.create('id', {
      slug: 'slug',
      static_checkout_params: { foo: 'string' },
    });
  });

  test('list', async () => {
    const responsePromise = client.products.shortLinks.list();
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
      client.products.shortLinks.list(
        { page_number: 0, page_size: 0, product_id: 'product_id' },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(DodoPayments.NotFoundError);
  });
});
