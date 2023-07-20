---
title: 如何在 Unix-like-System 获得 Figma-web 本地字体的支持
date: 2023-07-20 11:31:58
tags:
categories:
---

{{ title }}
<!-- more -->
### 简介
[Figma](https://www.figma.com) 为 `OS X` 和 `Windows` 提供了名为 [Font installers](https://www.figma.com/downloads/) 的软件以提供在 Web 中选择并使用本地字体的功能。
虽然官方没有支持 `Unix-like`，但幸运的是开源社区提供的 [figma-linux-font-helper](https://github.com/Figma-Linux/figma-linux-font-helper) 项目实现了类似功能。
### 原理
通过`http`服务在本地端口提供了一个字体列表的接口，支持配置扫描的字体目录，默认系统目录，可以自定义添加用户的字体目录。
### 如何使用
- 参照项目的 `Readme` 文档 通过 `systemctl` 使用 
- 下载 Release 文件，在需要的时候手动执行其中的 `fonthelper` 二进制文件。