---
title: 在 Angular 创建可注入的通用防抖服务
date: 2024-02-29 18:18:46
update_date: 2024-03-06 14:34:07
tags:
  - 前端
  - Angular
categories:
  - 前端
  - Angular
---

{{ title }}

<!-- more -->

在业务中经常遇到需要多次调用接口获取结果的情况，当页面中只有一个需要搜索的位置，手动写一个防抖函数就可以满足，但是当有多个类似搜索存在时，只是起名字就很伤脑筋，同时也多了很多有用又没什么用的~重复代码~，这个时候封装一个通用的防抖函数就很重要。

> **通过在组件中注入独立的服务来获取数据，只需提供 `本服务`(DebounceSearchService) 和 `搜索服务`(DebounceFetchDataService) 以及 搜索服务中的`方法名称`(fetchDataFnName)，即可快速使用延迟搜索实现相应的业务逻辑**

下面这个例子是用在搜索接口的可注入防抖服务([Angular])，你可以提供任意的服务并指定需要执行的方法名，以实现不同的功能。

### 例子

````typescript
import { Injectable，Inject } from "@angular/core";
import { Subject，Observable，ReplaySubject } from "rxjs";
import { filter，debounceTime，switchMap } from "rxjs/operators";

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
 *     DebounceSearchService，
 *     {
 *       provide: 'DebounceFetchDataService'，
 *       useFactory: DebounceFetchDataServiceFactory('fetchDataFnName')，
 *       deps: [fetchDataService]，
 *     }
 *   ]，
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
        filter((params) => (params ? true : false))，
        debounceTime(500)，
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
    }，
    private fetchDataFnName: T
  ) {}
}

/** 创建 获取 data 服务的工厂函数 */
export function DebounceFetchDataServiceFactory<T extends string>(
  fetchDataFnName: T
) {
  return (fetchDataService: {
    [key in T]: (...args: any[]) => Observable<any>;
  }) => new DebounceFetchDataService(fetchDataService，fetchDataFnName);
}

````

### 使用

将上面的代码拷贝到一个服务中，同时在组件自身的 **`providers`** 中添加如下的代码.
首先提供我们刚刚创建的搜索服务 **`DebounceSearchService`** ，接着通过工厂函数 **`DebounceFetchDataServiceFactory`** 提供 **`DebounceFetchDataService`** ，同时别忘记指定需要调用的方法名称，以及在 **`deps`** 字段中指定需要依赖的服务。特别的是你可以通过[在 AngularJS 组件实例中注入相同 service 的多个实例] 以实现调用不同的实例。

```typescript
providers: [
    DebounceSearchService，
    {
      provide: 'DebounceFetchDataService'，
      useFactory: DebounceFetchDataServiceFactory('fetchDataFnName')，
      deps: [fetchDataService]，
    }
  ]，
```

### 总结

通过封装可注入的服务，使用 [Angular] 提供的依赖注入方式，快速实现各种方法的防抖调用，隐藏不必要的细节，组件只关注自身的显示逻辑，更加干净纯粹，同时加快开发速度.

### 更后面

提供给防抖服务的依赖可以是任意需要防抖的调用，上面提供的搜索只是其中一种特殊的用法。

[Angular]: https://angular.io
[在 AngularJS 组件实例中注入相同 service 的多个实例]: /2024/03/06/18e125846d8.html
