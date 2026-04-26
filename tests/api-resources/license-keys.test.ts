// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import DodoPayments from 'dodopayments';

const client = new DodoPayments({ bearerToken: 'My Bearer Token', baseURL: process.env["TEST_API_BASE_URL"] ?? 'http://127.0.0.1:4010' });

describe('resource licenseKeys', () => {
  test('create: only required params', async () => {
    const responsePromise = client.licenseKeys.create({
    customer_id: 'customer_id',
    key: 'key',
    product_id: 'product_id',
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
    const response = await client.licenseKeys.create({
    customer_id: 'customer_id',
    key: 'key',
    product_id: 'product_id',
    activations_limit: 0,
    expires_at: '2019-12-27T18:11:19.117Z',
  });
  });

  test('retrieve', async () => {
    const responsePromise = client.licenseKeys.retrieve('lic_123');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('update', async () => {
    const responsePromise = client.licenseKeys.update('lic_123', {});
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('list', async () => {
    const responsePromise = client.licenseKeys.list();
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
    await expect(client.licenseKeys.list({
    created_at_gte: '2019-12-27T18:11:19.117Z',
    created_at_lte: '2019-12-27T18:11:19.117Z',
    customer_id: 'customer_id',
    page_number: 0,
    page_size: 0,
    product_id: 'product_id',
    source: 'auto',
    status: 'active',
  }, { path: '/_stainless_unknown_path' }))
      .rejects
      .toThrow(DodoPayments.NotFoundError);
  });
});
