// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import DodoPayments from 'dodopayments';

const client = new DodoPayments({
  bearerToken: 'My Bearer Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource items', () => {
  test('create: only required params', async () => {
    const responsePromise = client.productCollections.groups.items.create(
      '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      { id: 'id', products: [{ product_id: 'product_id' }] },
    );
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('create: required and optional params', async () => {
    const response = await client.productCollections.groups.items.create(
      '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      { id: 'id', products: [{ product_id: 'product_id', status: true }] },
    );
  });

  test('update: only required params', async () => {
    const responsePromise = client.productCollections.groups.items.update(
      '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      {
        id: 'id',
        group_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
        status: true,
      },
    );
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('update: required and optional params', async () => {
    const response = await client.productCollections.groups.items.update(
      '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      {
        id: 'id',
        group_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
        status: true,
      },
    );
  });

  test('delete: only required params', async () => {
    const responsePromise = client.productCollections.groups.items.delete(
      '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      { id: 'id', group_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e' },
    );
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('delete: required and optional params', async () => {
    const response = await client.productCollections.groups.items.delete(
      '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      { id: 'id', group_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e' },
    );
  });
});
