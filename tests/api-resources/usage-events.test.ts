// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import DodoPayments from 'dodopayments';

const client = new DodoPayments({
  bearerToken: 'My Bearer Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource usageEvents', () => {
  test('retrieve', async () => {
    const responsePromise = client.usageEvents.retrieve('event_id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('list', async () => {
    const responsePromise = client.usageEvents.list();
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
      client.usageEvents.list(
        {
          customer_id: 'customer_id',
          end: '2019-12-27T18:11:19.117Z',
          event_name: 'event_name',
          meter_id: 'meter_id',
          page_number: 0,
          page_size: 0,
          start: '2019-12-27T18:11:19.117Z',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(DodoPayments.NotFoundError);
  });

  test('ingest: only required params', async () => {
    const responsePromise = client.usageEvents.ingest({
      events: [
        {
          customer_id: 'customer_id',
          event_id: 'event_id',
          event_name: 'event_name',
        },
      ],
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('ingest: required and optional params', async () => {
    const response = await client.usageEvents.ingest({
      events: [
        {
          customer_id: 'customer_id',
          event_id: 'event_id',
          event_name: 'event_name',
          metadata: { foo: 'string' },
          timestamp: '2019-12-27T18:11:19.117Z',
        },
      ],
    });
  });
});
