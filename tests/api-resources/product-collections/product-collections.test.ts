// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import DodoPayments from 'dodopayments';

const client = new DodoPayments({
  bearerToken: 'My Bearer Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource productCollections', () => {
  test('create: only required params', async () => {
    const responsePromise = client.productCollections.create({
      groups: [{ products: [{ product_id: 'product_id' }] }],
      name: 'name',
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
    const response = await client.productCollections.create({
      groups: [
        {
          products: [{ product_id: 'product_id', status: true }],
          group_name: 'group_name',
          status: true,
        },
      ],
      name: 'name',
      brand_id: 'brand_id',
      description: 'description',
    });
  });

  test('retrieve', async () => {
    const responsePromise = client.productCollections.retrieve('id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('update', async () => {
    const responsePromise = client.productCollections.update('id', {});
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('list', async () => {
    const responsePromise = client.productCollections.list();
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
      client.productCollections.list(
        {
          archived: true,
          brand_id: 'brand_id',
          page_number: 0,
          page_size: 0,
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(DodoPayments.NotFoundError);
  });

  test('delete', async () => {
    const responsePromise = client.productCollections.delete('id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('unarchive', async () => {
    const responsePromise = client.productCollections.unarchive('id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('updateImages', async () => {
    const responsePromise = client.productCollections.updateImages('id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('updateImages: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.productCollections.updateImages(
        'id',
        { force_update: true },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(DodoPayments.NotFoundError);
  });
});
