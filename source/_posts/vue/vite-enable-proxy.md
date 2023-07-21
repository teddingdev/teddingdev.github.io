---
title: Vite 配置 API 代理
date: 2023-07-20 20:22:26
tags:
    - 前端
    - vite
    - proxy
categories:
    - 前端
    - vite
---

当你本地开发遇到跨域问题时，可以尝试在 Vite 项目中配置 API 代理帮助转发对应的接口，参考 [Vite 文档](https://cn.vitejs.dev/config/)。
<!-- more -->
> 记录一下当前项目中的配置
### package.json
```json
{
  "scripts": {
    "proxy:dev": "vite --debug serve --mode proxy-dev --config vite-enable-proxy.config.ts"
    "proxy:qa": "vite --debug serve --mode proxy-qa --config vite-enable-proxy.config.ts"
    "proxy:prod": "vite --debug serve --mode proxy-prod --config vite-enable-proxy.config.ts"
  }
}
```

### vite-enable-proxy.config.ts
```typescript
import { defineConfig, type UserConfig } from 'vite';
import viteConfig from './vite.config';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // 加载不同的代理配置
  let proxy: Required<UserConfig>['server']['proxy'] = undefined;
  if (mode === 'proxy-dev') {
    proxy = proxyConfig['dev'];
  } else if (mode === 'proxy-qa') {
    proxy = proxyConfig['qa'];
  } else if (mode === 'proxy-prep') {
    proxy = proxyConfig['prep'];
  } else {
    proxy = undefined;
  }

  const draft = {
    ...viteConfig,
    server: {
      ...viteConfig['server'],
      proxy,
    },
  };
  // console.log(draft.server);
  return draft;
});

const proxyConfig: { [key in 'dev' | 'qa' | 'prep']?: Required<UserConfig>['server']['proxy'] } = {
  dev: {
    '/PROXY_DOMAIN': {
      target: 'https://devapi.domain.com',
      changeOrigin: true,
      rewrite: path => path.replace(/^\/PROXY_AAA/, ''),
    },
  },
  qa: {
    '/PROXY_DOMAIN': {
      target: 'https://qaapi.domain.com',
      changeOrigin: true,
      rewrite: path => path.replace(/^\/PROXY_DOMAIN/, ''),
    },
  },
  prep: {
    '/PROXY_DOMAIN': {
      target: 'https://prepapi.domain.com',
      changeOrigin: true,
      rewrite: path => path.replace(/^\/PROXY_DOMAIN/, ''),
    },
  },
};
```
