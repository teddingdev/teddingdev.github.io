---
title: 在 Angular 创建可注入的延迟搜索服务
date: 2024-02-29 18:18:46
tags:
  - 前端
  - Angular
categories:
  - 前端
  - Angular
---

{{ title }}

<!-- more -->

> **通过在组件中注入独立的服务来获取数据,只需提供 `本服务`(DebounceSearchService) 和 `搜索服务`(DebounceFetchDataService) 以及 搜索服务中的`方法名称`(fetchDataFnName),即可快速使用延迟搜索实现相应的业务逻辑**

````typescript
import { Injectable, Inject } from "@angular/core";
import { Subject, Observable, ReplaySubject } from "rxjs";
import { filter, debounceTime, switchMap } from "rxjs/operators";

type Params = {
  [key in string | number]: string | number | boolean | null | undefined;
};

/**
 * 延迟搜索服务
 * 使用此服务的每个组件都有自己的实例
 * 需要在组件的 providers 中声明
 * ## Example
 * ```ts
 * ...
 * providers: [
 *     DebounceSearchService,
 *     {
 *       provide: 'DebounceFetchDataService',
 *       useFactory: DebounceFetchDataServiceFactory('fetchDataFnName'),
 *       deps: [fetchDataService],
 *     }
 *   ],
 * ...
 * ```
 *  */
@Injectable()
export class DebounceSearchService<T> {
  private $params$ = new Subject<Params>();

  private $value$ = new ReplaySubject<T>();

  value$ = this.$value$.asObservable();

  nextParams(data: Params) {
    this.$params$.next(data);
  }

  nextValue(data: T) {
    this.$value$.next(data);
  }

  constructor(
    @Inject("DebounceFetchDataService") // 获取数据的服务
    private fetchDataService: {
      fetchData: (params: Params) => Observable<T> | Promise<T>;
    }
  ) {
    this.$params$
      .pipe(
        filter((params) => (params ? true : false)),
        debounceTime(500),
        switchMap((params) => {
          return this.fetchDataService.fetchData(params);
        })
      )
      .subscribe(this.$value$);
  }
}

/** 搜索服务 */
export class DebounceFetchDataService<T extends string> {
  fetchData(params: Params) {
    return this.fetchDataService[this.fetchDataFnName](params);
  }
  constructor(
    private fetchDataService: {
      [key in T]: (...args: any[]) => Observable<any>;
    },
    private fetchDataFnName: T
  ) {}
}

/** 创建 获取 data 服务的工厂函数 */
export function DebounceFetchDataServiceFactory<T extends string>(
  fetchDataFnName: T
) {
  return (fetchDataService: {
    [key in T]: () => Observable<any>;
  }) => new DebounceFetchDataService(fetchDataService, fetchDataFnName);
}
````
