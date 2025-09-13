// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { DodoPaymentsError } from './error';
import { FinalRequestOptions } from '../internal/request-options';
import { defaultParseResponse } from '../internal/parse';
import { type DodoPayments } from '../client';
import { APIPromise } from './api-promise';
import { type APIResponseProps } from '../internal/parse';
import { maybeObj } from '../internal/utils/values';

export type PageRequestOptions = Pick<FinalRequestOptions, 'query' | 'headers' | 'body' | 'path' | 'method'>;

export abstract class AbstractPage<Item> implements AsyncIterable<Item> {
  #client: DodoPayments;
  protected options: FinalRequestOptions;

  protected response: Response;
  protected body: unknown;

  constructor(client: DodoPayments, response: Response, body: unknown, options: FinalRequestOptions) {
    this.#client = client;
    this.options = options;
    this.response = response;
    this.body = body;
  }

  abstract nextPageRequestOptions(): PageRequestOptions | null;

  abstract getPaginatedItems(): Item[];

  hasNextPage(): boolean {
    const items = this.getPaginatedItems();
    if (!items.length) return false;
    return this.nextPageRequestOptions() != null;
  }

  async getNextPage(): Promise<this> {
    const nextOptions = this.nextPageRequestOptions();
    if (!nextOptions) {
      throw new DodoPaymentsError(
        'No next page expected; please check `.hasNextPage()` before calling `.getNextPage()`.',
      );
    }

    return await this.#client.requestAPIList(this.constructor as any, nextOptions);
  }

  async *iterPages(): AsyncGenerator<this> {
    let page: this = this;
    yield page;
    while (page.hasNextPage()) {
      page = await page.getNextPage();
      yield page;
    }
  }

  async *[Symbol.asyncIterator](): AsyncGenerator<Item> {
    for await (const page of this.iterPages()) {
      for (const item of page.getPaginatedItems()) {
        yield item;
      }
    }
  }
}

/**
 * This subclass of Promise will resolve to an instantiated Page once the request completes.
 *
 * It also implements AsyncIterable to allow auto-paginating iteration on an unawaited list call, eg:
 *
 *    for await (const item of client.items.list()) {
 *      console.log(item)
 *    }
 */
export class PagePromise<
    PageClass extends AbstractPage<Item>,
    Item = ReturnType<PageClass['getPaginatedItems']>[number],
  >
  extends APIPromise<PageClass>
  implements AsyncIterable<Item>
{
  constructor(
    client: DodoPayments,
    request: Promise<APIResponseProps>,
    Page: new (...args: ConstructorParameters<typeof AbstractPage>) => PageClass,
  ) {
    super(
      client,
      request,
      async (client, props) =>
        new Page(client, props.response, await defaultParseResponse(client, props), props.options),
    );
  }

  /**
   * Allow auto-paginating iteration on an unawaited list call, eg:
   *
   *    for await (const item of client.items.list()) {
   *      console.log(item)
   *    }
   */
  async *[Symbol.asyncIterator](): AsyncGenerator<Item> {
    const page = await this;
    for await (const item of page) {
      yield item;
    }
  }
}

export interface DefaultPageNumberPaginationResponse<Item> {
  items: Array<Item>;
}

export interface DefaultPageNumberPaginationParams {
  page_number?: number;

  page_size?: number;
}

export class DefaultPageNumberPagination<Item>
  extends AbstractPage<Item>
  implements DefaultPageNumberPaginationResponse<Item>
{
  items: Array<Item>;

  constructor(
    client: DodoPayments,
    response: Response,
    body: DefaultPageNumberPaginationResponse<Item>,
    options: FinalRequestOptions,
  ) {
    super(client, response, body, options);

    this.items = body.items || [];
  }

  getPaginatedItems(): Item[] {
    return this.items ?? [];
  }

  nextPageRequestOptions(): PageRequestOptions | null {
    const query = this.options.query as DefaultPageNumberPaginationParams;
    const currentPage = query?.page_number ?? 1;

    return {
      ...this.options,
      query: {
        ...maybeObj(this.options.query),
        page_number: currentPage + 1,
      },
    };
  }
}

export interface CursorPagePaginationResponse<Item> {
  data: Array<Item>;

  iterator: string;

  done: boolean;
}

export interface CursorPagePaginationParams {
  iterator?: string;

  limit?: number;
}

export class CursorPagePagination<Item>
  extends AbstractPage<Item>
  implements CursorPagePaginationResponse<Item>
{
  data: Array<Item>;

  iterator: string;

  done: boolean;

  constructor(
    client: DodoPayments,
    response: Response,
    body: CursorPagePaginationResponse<Item>,
    options: FinalRequestOptions,
  ) {
    super(client, response, body, options);

    this.data = body.data || [];
    this.iterator = body.iterator || '';
    this.done = body.done || false;
  }

  getPaginatedItems(): Item[] {
    return this.data ?? [];
  }

  override hasNextPage(): boolean {
    if (this.done === false) {
      return false;
    }

    return super.hasNextPage();
  }

  nextPageRequestOptions(): PageRequestOptions | null {
    const cursor = this.iterator;
    if (!cursor) {
      return null;
    }

    return {
      ...this.options,
      query: {
        ...maybeObj(this.options.query),
        iterator: cursor,
      },
    };
  }
}
