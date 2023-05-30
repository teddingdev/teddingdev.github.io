---
title: RxJs-Set-Interval
date: 2023-05-30 19:09:14
tags:
categories:
---

{{ title }}

<!-- more -->

```typescript
import {
  concat,
  map,
  interval,
  take,
  takeUntil,
  exhaustMap,
  catchError,
  of,
} from "rxjs";

const stop$ = new Subject<string>();

concat(
  interval(1000).pipe(takeUntil(stop$), take(1)),
  interval(1000 * 3).pipe(
    takeUntil(stop$),
    take(1),
    map(() => {
      return 4;
    })
  ),
  interval(1000).pipe(
    map(() => {
      return 1;
    })
  )
)
  .pipe(
    takeUntil(stop$),
    exhaustMap(() => {
      return fetch();
    }),
    catchError((error) => {
      console.log(error);
      return of(null);
    })
  )
  .subscribe(() => {
    // code
  });
```
