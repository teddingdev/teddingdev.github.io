---
title: fail2ban 配置记录
date: 2023-08-31 16:05:43
tags:
- Linux
- fail2ban
categories:
- Linux
- fail2ban
---

上周在公网暴露了一台 linux 机器用于远程开发，关闭了 `root` 和 `password` 登录，只保留了密钥验证登录。昨晚查询了一下sshd日志发现有4w+的暴力破解登录记录。今天开启了`fail2ban` ，现在记录一下在 `openSUSE` 配置的过程。

<!-- more -->

### 安装
```bash
zypper ref && zypper in fail2ban
```
### 配置
`fail2ban` 的配置 文件默认在 `/etc/fail2ban/`，`jail.conf` 是默认的配置文件，升级时会被覆盖。目录下有一个同名的`jail.local`文件，我们的自定义的配置可以放在这里。优先级是 **file*.local > file*.conf**，包括根目录下的配置和 `dir*.d` 目录下的配置。
```bash
┌──(user@localhost)-[/etc/fail2ban]
└─$ tree -L 1
.
├── action.d
├── fail2ban.conf
├── fail2ban.d
├── filter.d
├── jail.conf
├── jail.d
├── jail.local
├── paths-common.conf
└── paths-opensuse.conf
```
复制 `jail.conf` 的内容到 `jail.local`（也可以只拷贝你需要的部分配置）
大概在274行找到 
```conf
[sshd]

# To use more aggressive sshd modes set filter parameter "mode" in jail.local:
# normal (default), ddos, extra or aggressive (combines all).
# See "tests/files/logs/sshd" or "filter.d/sshd.conf" for usage example and details.
#mode   = normal
port    = ssh
logpath = %(sshd_log)s
backend = %(sshd_backend)s
# 新增下面几行
enabled = true
# 秒
bantime = 86400
# 最大错误次数
maxretry = 3
# 如果主机在最后“findtime”秒内生成了“maxretry”，则该主机将被禁止
findtime = 10m
```

### 将 fail2ban 服务添加到开机自启动项
```bash
systemctl enable fail2ban
```

### 启动 fail2ban 服务
```bash
systemctl start fail2ban
```

### 查看服务状态
```bash
systemctl status fail2ban.service
```

### 查看 fail2ban 状态
```bash
fail2ban-client status
```

### 查看 sshd jail 状态
```bash
fail2ban-client status sshd
```

> 注意 默认的配置是 当 `restart / reload` fail2ban 服务时，被 ban 的 ip 列表将会被清除。

### 取消 restart / reload 默认清除 baned ip 列表的配置
在 `action.d`目录下有 iptables.conf 文件，手动创建 iptables.local 文件，并添加如下配置，删除 `<actionflush>`行，使自动清除的配置不生效。
```conf
# Option:  actionstop
# Notes.:  command executed at the stop of jail (or at the end of Fail2Ban)
# Values:  CMD
#
actionstop = <_ipt_del_rules>
# 删除 <actionflush> 行
             <actionflush>
             <iptables> -X f2b-<name>

```

### 重新加载 fail2ban 服务
```bash
systemctl reload fail2ban
```

### 手动添加向fail2ban 添加 禁止的 ip
```bash
fail2ban-client set sshd 8.8.8.8 4.4.4.4 114.114.114.114 
```
> 通过 `journal` 日志过滤曾经登录失败的 ip，[查看](/2017/05/08/15be6bd3bc8.html#统计暴力破解-ssh-登录的-ip)
> 参考文档
https://aws.amazon.com/cn/blogs/china/open-source-tool-to-protect-ec2-instances-fail2ban/