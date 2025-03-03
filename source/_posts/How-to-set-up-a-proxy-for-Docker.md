---
title: 如何为 Docker 配置代理?（Linux）
date: 2025-03-03 14:49:16
tags:
  - Docker
  - Linux
categories:
  - Linux
  - Docker
---

{{ title }}

<!-- more -->
### 为 docker 拉取镜像设置代理
在 `/etc/systemd/system/docker.service.d/` 创建 `http-proxy.conf`

```ini
#/etc/systemd/system/docker.service.d/http-proxy.conf
[Service]
Environment="HTTP_PROXY=http://localhost:port/"
Environment="HTTPS_PROXY=http://localhost:port/"
Environment="NO_PROXY=localhost,127.0.0.1,.example.com"
```

### 为 docker container 实例设置代理
在 `~/.docker/` 创建 `conig.json`
```json
// ~/.docker/conig.json
{
  "auths": {
    "https://index.docker.io/v1/": {
      "auth": "token"
    }
  },
  "proxies": {
    "default": {
      "httpProxy": "http://localhost:port",
      "httpsProxy": "http://localhost:port",
      "noProxy": "localhost,127.0.0.1"
    }
  }
}
```
