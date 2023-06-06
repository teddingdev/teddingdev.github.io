---
title: vue-CURD-class
date: 2023-06-06 13:48:46
tags:
  - 前端
  - Vue
  - RxJs
categories:
  - 前端
  - Vue
---

{{ title }}

<!-- more -->

## vue 专属的 curd 类

在之前 [Angular 版本](/2023/03/15/e65d1f7193f4.html)上面作了少量修改，但是默认依然返回 `Observable`。

```typescript
import type http from "@/libraries/request";
import { of, Observable, from } from "rxjs";
import { map, filter, mergeMap } from "rxjs/operators";

import type { CommonResult, PageResult } from "@/models/public_api";

type httpClient = typeof http;
type joinPathParamsType = Parameters<typeof joinPath>[0];

const env = import.meta.env;

const handleError = (error: Error) => {
  if (env.MODE !== "prod") {
    console.error(error);
  }
};

export function isNonNull<T>(value: T): value is NonNullable<T> {
  return value != null || value !== undefined;
}

export function joinPath(params?: {
  [key: string]: string | undefined | null;
}): string {
  let path = "";
  if (!params) {
    return path;
  } else if (Object.prototype.toString.call(params) === "[object Object]") {
    for (const key in params) {
      const value = params[key];
      path = `${path}${value}/`;
    }
    return path;
  } else {
    return path;
  }
}

export class CurdFactoryService {
  /**
   *
   * @param queryParams url ? 查询参数
   * @param params url 路径参数 id、code 拼接
   */
  _fetch = async <T = never, Q = never, P extends joinPathParamsType = never>(
    queryParams?: Q,
    params?: P
  ) => {
    const url = `${this.baseUrl}${joinPath(params)}`;
    return (
      this.http.get(url, { params: queryParams }) as Promise<CommonResult<T>>
    )
      .then((res) => {
        if (res) {
          return res;
        } else {
          return null;
        }
      })
      .catch((error) => {
        handleError(error);
        return null;
      });
  };
  /**
   *
   * @desc 获取携带分页信息的数据
   * @param queryParams url ? 查询参数
   * @param params url 路径参数 id、code 拼接
   */
  _fetchSlice = async <
    T = never,
    Q = never,
    P extends joinPathParamsType = never
  >(
    queryParams?: Q,
    params?: P
  ) => {
    const url = `${this.baseUrl}${joinPath(params)}`;
    return (
      this.http.get(url, { params: queryParams }) as Promise<
        CommonResult<PageResult<T[]>>
      >
    )
      .then((res) => {
        if (res) {
          return res;
        } else {
          return null;
        }
      })
      .catch((error) => {
        handleError(error);
        return null;
      });
  };
  /**
   *
   * @desc 获取携带分页信息的所有分页数据
   * @param queryParams url ? 查询参数
   * @param params url 路径参数 id、code 拼接
   */
  _fetchAllSlice = <T = never, Q = never, P extends joinPathParamsType = never>(
    queryParams: Q & { limit: number; offset: number },
    params?: P
  ) => {
    const part = (
      _queryParams: typeof queryParams,
      _params?: typeof params
    ): Observable<T[]> => {
      return from(this._fetchSlice<T, Q, P>(_queryParams, _params)).pipe(
        filter(isNonNull),
        mergeMap((res) => {
          const { results: previousResults, count } = res.data;
          const { limit, offset } = _queryParams;
          const nextOffset = Number(limit) + Number(offset);
          if (nextOffset <= count - 1) {
            return part({ ...queryParams, offset: nextOffset }).pipe(
              map((results) => {
                return [...previousResults, ...results];
              })
            );
          } else {
            return of(previousResults);
          }
        })
      );
    };
    return part(queryParams, params);
  };
  /**
   *
   * @param body 请求体
   * @param params url 路径参数 id、code 拼接
   */
  _post = async <T = never, B = never, P extends joinPathParamsType = never>(
    body?: B,
    params?: P
  ) => {
    const url = `${this.baseUrl}${joinPath(params)}`;
    return (this.http.post(url, body) as Promise<CommonResult<T>>)
      .then((res) => {
        if (res) {
          return res;
        } else {
          return null;
        }
      })
      .catch((error) => {
        handleError(error);
        return null;
      });
  };
  /**
   *
   * @param body 请求体
   * @param params url 路径参数 id、code 拼接
   */
  _postForm = async <
    T = never,
    B = never,
    P extends joinPathParamsType = never
  >(
    body?: B,
    params?: P
  ) => {
    const url = `${this.baseUrl}${joinPath(params)}`;
    return (this.http.postForm(url, body) as Promise<CommonResult<T>>)
      .then((res) => {
        if (res) {
          return res;
        } else {
          return null;
        }
      })
      .catch((error) => {
        handleError(error);
        return null;
      });
  };
  /**
   *
   * @param body 请求体
   * @param params url 路径参数 id、code 拼接
   */
  _patch = async <T = never, B = never, P extends joinPathParamsType = never>(
    body?: B,
    params?: P
  ) => {
    const url = `${this.baseUrl}${joinPath(params)}`;
    return (this.http.patch(url, body) as Promise<CommonResult<T>>)
      .then((res) => {
        if (res) {
          return res;
        } else {
          return null;
        }
      })
      .catch((error) => {
        handleError(error);
        return null;
      });
  };
  /**
   *
   * @param body 请求体
   * @param params url 路径参数 id、code 拼接
   */
  _put = async <T = never, B = never, P extends joinPathParamsType = never>(
    body?: B,
    params?: P
  ) => {
    const url = `${this.baseUrl}${joinPath(params)}`;
    return (this.http.put(url, body) as Promise<CommonResult<T>>)
      .then((res) => {
        if (res) {
          return res;
        } else {
          return null;
        }
      })
      .catch((error) => {
        handleError(error);
        return null;
      });
  };
  /**
   *
   * @param body 请求体
   * @param params url 路径参数 id、code 拼接
   */
  _delete = async <T = never, P extends joinPathParamsType = never>(
    params?: P
  ) => {
    const url = `${this.baseUrl}${joinPath(params)}`;
    return (this.http.delete(url) as Promise<CommonResult<T>>)
      .then((res) => {
        if (res) {
          return res;
        } else {
          return null;
        }
      })
      .catch((error) => {
        handleError(error);
        return null;
      });
  };

  constructor(private http: httpClient, private baseUrl: string | null) {}
}
```

## 如何使用

```typescript
import { CurdFactoryService } from '@/apis/curd-factory';
import http from '@/libraries/request';

const host = "https://api.tedding.dev";
const api = "/api/get-xxx";
const AAA = new CurdFactoryService(http, `${host}${api}`);

const fetchAAA = (params: any) => {
  AAA._fetch<any, typeof params>(params);
};
const postAAA = (body) => {
  AAA._post(body);
};
const postFormAAA = (body) => {
  AAA._postForm(body);
};
const fetchSliceAAA = (params) => {
  AAA._fetchSlice(params);
};
```
