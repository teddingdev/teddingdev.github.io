---
title: 为 React 项目手动配置代理
date: 2018-05-25 17:39:46
tags:
- React
- Proxy
- FE-Dev
categories:
- 前端
- React
- Proxy
---
通过为项目*设置代理* 解决http请求跨域问题。  
*此功能适用于react脚本@ 1 . 0 . 0和更高版本。*
<!-- more -->
在 ``package.json``文件中指定如下对象
```
{
  // ...
  "proxy": {
    "/api": {
      "target": "<url>",
      "ws": true
      // ...
    }
  }
  // ...
}
```


