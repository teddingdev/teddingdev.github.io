---
title: 使用 "cross-env" 设置 "nodejs" 环境变量
date: 2023-08-09 15:56:44
tags:
- 前端
- node
categories:
- 前端
- node
---

{{ title }}
<!-- more -->
> use "cross-env" to set "nodejs" env

### 缘起
最近需要维护公司的一个旧项目(`React`)，起初一切正常，但是本地开发调试时无法切换到其他的环境（eg: qa），排查了一段时间，最后发现 `package.json` script 设置了系统的临时环境变量,可能当时的开发机器都是 `widdow` 的缘故，所以用了`set xxx=xxx`，导致我用 `linux`（posix） 机器无法正确设置环境变量。
### 方案
除了多些几个 `script` 这个手动的方案之外，就像经常使用的各种 `polyfill` 一样，还可以通过 `cross-env` 设置环境变量，抹平各个平台之间的差异。