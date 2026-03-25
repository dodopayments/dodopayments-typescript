// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import DodoPayments from 'dodopayments';

const client = new DodoPayments({
  bearerToken: 'My Bearer Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource groups', () => {
  test('create: only required params', async () => {
    const responsePromise = client.productCollections.groups.create('id', {
      products: [{ product_id: 'product_id' }],
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
    const response = await client.productCollections.groups.create('id', {
      products: [{ product_id: 'product_id', status: true }],
      group_name: 'group_name',
      status: true,
    });
  });

  test('update: only required params', async () => {
    const responsePromise = client.productCollections.groups.update('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      id: 'id',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('update: required and optional params', async () => {
    const response = await client.productCollections.groups.update('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      id: 'id',
      group_name: 'group_name',
      product_order: ['182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e'],
      status: true,
    });
  });

  test('delete: only required params', async () => {
    const responsePromise = client.productCollections.groups.delete('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      id: 'id',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('delete: required and optional params', async () => {
    const response = await client.productCollections.groups.delete('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      id: 'id',
    });
  });
});
