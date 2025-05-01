// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import DodoPayments from 'dodopayments';
import { Response } from 'node-fetch';

const client = new DodoPayments({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource licenses', () => {
  test('activate: only required params', async () => {
    const responsePromise = client.licenses.activate({ license_key: 'license_key', name: 'name' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('activate: required and optional params', async () => {
    const response = await client.licenses.activate({ license_key: 'license_key', name: 'name' });
  });

  test('deactivate: only required params', async () => {
    const responsePromise = client.licenses.deactivate({
      license_key: 'license_key',
      license_key_instance_id: 'license_key_instance_id',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('deactivate: required and optional params', async () => {
    const response = await client.licenses.deactivate({
      license_key: 'license_key',
      license_key_instance_id: 'license_key_instance_id',
    });
  });

  test('validate: only required params', async () => {
    const responsePromise = client.licenses.validate({ license_key: '2b1f8e2d-c41e-4e8f-b2d3-d9fd61c38f43' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('validate: required and optional params', async () => {
    const response = await client.licenses.validate({
      license_key: '2b1f8e2d-c41e-4e8f-b2d3-d9fd61c38f43',
      license_key_instance_id: 'lki_123',
    });
  });
});
