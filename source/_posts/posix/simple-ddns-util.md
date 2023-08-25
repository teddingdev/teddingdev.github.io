---
title: 在路由上运行一个简单的 ddns 实用脚本
date: 2023-08-25 16:51:48
tags:
- openwrt
- crontab
- ddns
categories:
- openwrt
- shell
---

配和 crontab 在 openwrt 中定时执行，检测公网 ip 变动并同时推送 钉钉 、BARK，以及更新 cloudflare DNS
<!-- more -->
### 给死去的路由添加功能
死去许久的 HiWiFi 路由 + shell 脚本 完美实现了我需要的 `ddns`，这也是第一次完整的用 `shell script` 实现小功能，     
完整代码这里 [Github](https://github.com/teddingdev/ddns-util)      

>如果这篇文章有幸被你看到，希望你知道这个脚本大概率没有办法拿来即用