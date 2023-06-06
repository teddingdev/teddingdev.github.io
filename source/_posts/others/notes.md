---
title: Linux 笔记
date: 2023-03-21 17:23:35
tags:
    - Linux
    - shell
categories:
    - Linux
    - shell
---

{{ title }}
<!-- more -->

### microsoft-edge 通过命令行配置代理
[microsoft 文档]('https://learn.microsoft.com/zh-cn/deployedge/edge-learnmore-cmdline-options-proxy-settings')

```bash
microsoft-edge --proxy-server="socks5://ip:port"
microsoft-edge --proxy-server="http://ip:port"
```

### zypper 命令技巧
```bash
zypper rm -u package-name // 卸载软件包的同时删除相关联的包
```

### bash 配置 sudo 可以使用当前用户环境变量
```bash
alias sudo='sudo '
// bash manpage 有详细解释
```

### linux 通过 firefox 查看 manpage 文档
在地址栏键入 `man:command` 就可以查看对应命令的文档，
`kde` 环境能够打开 `kde help center`，其他 `DE` 未测试。