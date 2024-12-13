// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { AbstractPage, Response, APIClient, FinalRequestOptions, PageInfo } from './core';

export interface PageNumberPageResponse<Item> {
  data: Array<Item>;
}

export interface PageNumberPageParams {
  page_number?: number;

  page_size?: number;
}

export class PageNumberPage<Item> extends AbstractPage<Item> implements PageNumberPageResponse<Item> {
  data: Array<Item>;

  constructor(
    client: APIClient,
    response: Response,
    body: PageNumberPageResponse<Item>,
    options: FinalRequestOptions,
  ) {
    super(client, response, body, options);

    this.data = body.data || [];
  }

  getPaginatedItems(): Item[] {
    return this.data ?? [];
  }

  // @deprecated Please use `nextPageInfo()` instead
  nextPageParams(): Partial<PageNumberPageParams> | null {
    const info = this.nextPageInfo();
    if (!info) return null;
    if ('params' in info) return info.params;
    const params = Object.fromEntries(info.url.searchParams);
    if (!Object.keys(params).length) return null;
    return params;
  }

  nextPageInfo(): PageInfo | null {
    const query = this.options.query as PageNumberPageParams;
    const currentPage = query?.page_number ?? 1;

    return { params: { page_number: currentPage + 1 } };
  }
}
