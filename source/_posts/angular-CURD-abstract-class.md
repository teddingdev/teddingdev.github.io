---
title: Angular CURD abstract class
date: 2023-03-15 09:44:26
tags:
  - 前端
  - Angular
categories:
  - 前端
  - Angular
---

{{ title }}
为`RESTful Api` 一次性生成所有的可能的 `Http Action`，简化`coding` 时间

<!-- more -->

```typescript
import { catchError, map, filter, mergeMap } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { of, Observable } from "rxjs";

interface CommonResult<T> {
  code: number;
  success: boolean;
  msg: string;
  data: T;
}

interface Result<T> {
  count: number;
  next: string;
  previous: string;
  results: T;
}

export function isNonNull<T>(value: T): value is NonNullable<T> {
  return value != null || value !== undefined;
}

export abstract class CurdFactoryService {
  /** 基础接口url */
  abstract baseUrl: string;

  private joinPath(params?: {
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

  /**
   *
   * @param queryParams url ? 查询参数
   * @param params url 路径参数 id、code 拼接
   */
  _fetch = <T, Q = any, P extends any = any>(queryParams?: Q, params?: P) => {
    const url = `${this.baseUrl}${this.joinPath(params)}`;
    return this.http.get<CommonResult<T>>(url, queryParams).pipe(
      map((res) => {
        if (res) {
          return res;
        } else {
          return null;
        }
      }),
      catchError((error) => {
        console.error(error);
        return of(null);
      })
    );
  };
  /**
   *
   * @desc 获取携带分页信息的数据
   * @param queryParams url ? 查询参数
   * @param params url 路径参数 id、code 拼接
   */
  _fetchSlice = <T, Q = any, P extends any = any>(
    queryParams?: Q,
    params?: P
  ) => {
    const url = `${this.baseUrl}${this.joinPath(params)}`;
    return this.http.get<CommonResult<Result<T[]>>>(url, queryParams).pipe(
      map((res) => {
        if (res) {
          return res;
        } else {
          return null;
        }
      }),
      catchError((error) => {
        console.error(error);
        return of(null);
      })
    );
  };
  /**
   *
   * @desc 获取携带分页信息的所有分页数据
   * @param queryParams url ? 查询参数
   * @param params url 路径参数 id、code 拼接
   */
  _fetchAllSlice = <T, Q = any, P extends any = any>(
    queryParams: Q & { limit: number; offset: number },
    params?: P
  ) => {
    const part = (
      _queryParams: typeof queryParams,
      _params?: typeof params
    ): Observable<T[]> => {
      return this._fetchSlice<T, Q, P>(_queryParams, _params).pipe(
        filter(isNonNull),
        map((res) => res.data),
        mergeMap((data) => {
          const { results: previousResults, count } = data;
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
  _post = <T, B = any, P extends any = any>(body?: B, params?: P) => {
    const url = `${this.baseUrl}${this.joinPath(params)}`;
    return this.http.post<CommonResult<T>>(url, body, params).pipe(
      map((res) => {
        if (res) {
          return res;
        } else {
          return null;
        }
      }),
      catchError((error) => {
        console.error(error);
        return of(null);
      })
    );
  };
  /**
   *
   * @param body 请求体
   * @param params url 路径参数 id、code 拼接
   */
  _patch = <T, B = any, P extends any = any>(body?: B, params?: P) => {
    const url = `${this.baseUrl}${this.joinPath(params)}`;
    return this.http.patch<CommonResult<T>>(url, body).pipe(
      map((res) => {
        if (res) {
          return res;
        } else {
          return null;
        }
      }),
      catchError((error) => {
        console.error(error);
        return of(null);
      })
    );
  };
  /**
   *
   * @param body 请求体
   * @param params url 路径参数 id、code 拼接
   */
  _delete = <T, P extends any = any>(params?: P) => {
    const url = `${this.baseUrl}${this.joinPath(params)}`;
    return this.http.delete<CommonResult<T>>(url).pipe(
      map((res) => {
        if (res) {
          return res;
        } else {
          return null;
        }
      }),
      catchError((error) => {
        console.error(error);
        return of(null);
      })
    );
  };

  constructor(private http: HttpClient) {}
}
```

### 如何使用

```typescript
import { Injectable } from "@angular/core";
import { CurdFactoryService } from "@core";
import { _HttpClient } from "r@delon/theme";
import { APIS } from "@configure";

@Injectable({
  providedIn: "root",
})
export class DoctorAppConfigService extends CurdFactoryService {
  baseUrl: string;
  constructor(http: _HttpClient) {
    super(http);
    this.baseUrl = APIS.doctorPromotion;
  }
}
/** 也可以在此扩展特有的方法 **/
funcA(){}
funcB(){}
funcC(){}
```

### 还可以这样用

```typescript
class AAA extends CurdFactoryService {
  baseUrl: string;
  constructor(http: _HttpClient) {
    super(http);
    this.baseUrl = APIS.AAA;
  }
}

class BBB extends CurdFactoryService {
  baseUrl: string;
  constructor(http: _HttpClient) {
    super(http);
    this.baseUrl = APIS.BBB;
  }
}

class CCC extends CurdFactoryService {
  baseUrl: string;
  constructor(http: _HttpClient) {
    super(http);
    this.baseUrl = APIS.CCC;
  }
}
class DDD extends CurdFactoryService {
  baseUrl: string;
  constructor(http: _HttpClient) {
    super(http);
    this.baseUrl = APIS.DDD;
  }
}

@Injectable({
  providedIn: "root",
})
export class UnionService {
  /** API 1 */
  AAAService = new AAA(this.http);
  /** API 2 */
  BBBService = new BBB(this.http);
  /** API 3 */
  CCCService = new CCC(this.http);
  /** API 4 */
  DDDService = new DDD(this.http);
  constructor(private http: _HttpClient) {}
}
```
