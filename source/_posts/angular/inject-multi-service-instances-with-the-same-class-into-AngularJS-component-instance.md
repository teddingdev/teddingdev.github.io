---
title: 在 AngularJS 组件实例中注入相同 service 的多个实例
date: 2024-03-06 13:59:19
tags:
  - 前端
  - Angular
categories:
  - 前端
  - Angular
---

{{ title }}

> inject multi service instances with the same class into AngularJS component instance

<!-- more -->
### 在 providers 中定义
```typescript
// ...
providers: [
  {
    privide: "privide_A", // 注入多次，所以需要别名
    useClass: BeInjectedService,
    deps: [], // 如果需要
  },
  {
    privide: "privide_B", // 注入多次，所以需要别名
    useClass: BeInjectedService,
    deps: [], // 如果需要
  },
  {
    privide: "privide_C", // 注入多次，所以需要别名
    useClass: BeInjectedService,
    deps: [], // 如果需要
  },
  // ... 可以有更多
];
// ...
```

### 在 constructor 中声明

接下来是在 constructor 函数中定义需要被注入的服务名称 和 类型

```typescript
constructor (
  @Inject('privide_A') private privide_A_service: BeInjectedService,
  @Inject('privide_B') private privide_B_service: BeInjectedService,
  @Inject('privide_C') private privide_C_service: BeInjectedService
){
  // code
}
```

### 总结
- 在组件中使用 `this.privide_A_service`,`this.privide_B_service`,`this.privide_C_service`, 将分别来自不同的实例，当你真的需要三个实例时可以尝试使用这种方式实现隔离。一般的 通过封装更加明确的组件可以避免使用这种方式来隔离数据，但是不得不说某些情况下，你清楚的知道自己在做什么，这样做反而会更加的简单。

- 需要说明的是，当在 `providers` 中有定义，同时这个 `service` 又声明在某些 module/root 中提供的时候，组件会优先选择当前位置声明的实例，也就意味着会有不同的实例存在，而不是常规的单例服务，这也是我们这篇文章能够实现的基础。