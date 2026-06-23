// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import DodoPayments from 'dodopayments';

const client = new DodoPayments({
  bearerToken: 'My Bearer Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource localizedPrices', () => {
  test('list', async () => {
    const responsePromise = client.products.localizedPrices.list('pdt_R8AWMPiV8RyJElcCKvAID');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('create: only required params', async () => {
    const responsePromise = client.products.localizedPrices.create('pdt_R8AWMPiV8RyJElcCKvAID', {
      amount: 0,
      currency: 'AED',
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
    const response = await client.products.localizedPrices.create('pdt_R8AWMPiV8RyJElcCKvAID', {
      amount: 0,
      currency: 'AED',
      country_code: 'AF',
    });
  });

  test('retrieve: only required params', async () => {
    const responsePromise = client.products.localizedPrices.retrieve('lcp_3aOOT7ebrzBOV41yL2V6s', {
      product_id: 'pdt_R8AWMPiV8RyJElcCKvAID',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('retrieve: required and optional params', async () => {
    const response = await client.products.localizedPrices.retrieve('lcp_3aOOT7ebrzBOV41yL2V6s', {
      product_id: 'pdt_R8AWMPiV8RyJElcCKvAID',
    });
  });

  test('update: only required params', async () => {
    const responsePromise = client.products.localizedPrices.update('lcp_3aOOT7ebrzBOV41yL2V6s', {
      product_id: 'pdt_R8AWMPiV8RyJElcCKvAID',
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
    const response = await client.products.localizedPrices.update('lcp_3aOOT7ebrzBOV41yL2V6s', {
      product_id: 'pdt_R8AWMPiV8RyJElcCKvAID',
      amount: 0,
    });
  });

  test('archive: only required params', async () => {
    const responsePromise = client.products.localizedPrices.archive('lcp_3aOOT7ebrzBOV41yL2V6s', {
      product_id: 'pdt_R8AWMPiV8RyJElcCKvAID',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('archive: required and optional params', async () => {
    const response = await client.products.localizedPrices.archive('lcp_3aOOT7ebrzBOV41yL2V6s', {
      product_id: 'pdt_R8AWMPiV8RyJElcCKvAID',
    });
  });
});
