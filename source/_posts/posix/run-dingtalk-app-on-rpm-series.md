---
title: 在 Linux "rpm" 系发行版上运行钉钉应用程序
date: 2023-06-16 13:29:42
updated: 2024-02-29 10:51:05
tags:
    - Linux
    - openSUSE
    - openSUSE Tumbleweed
    - office
    - dingtalk
    - 钉钉
categories:
    - Linux
    - office
    - dingtalk
---

今天尝试了一下，如何在 `openSUSE Tumbleweed 20230613` 上运行钉钉 linux 版本，现在记录一下过程。
> **PS: 最新版本钉钉(dingtalk_7.5.0.40221)在 `openSUSE Tumbleweed 20240226` 只需要移除软件附带的 `libm.so.6`, 使用系统的so文件即可;**
<!-- more -->
首先去官网下载 `dingtalk` 的 deb 包，毕竟官方支持的发行版有限，只有`deb`系列有包可以直接安装，即使安装成功也不一定能使用。(点击这里可以下载 [dingtalk_1.8.0.30601](https://dtapp-pub.dingtalk.com/dingtalk-desktop/xc_dingtalk_update/linux_deb/Release/com.alibabainc.dingtalk_1.8.0.30601_amd64.deb)，[dingtalk_7.0.40.30706](https://dtapp-pub.dingtalk.com/dingtalk-desktop/xc_dingtalk_update/linux_deb/Release/com.alibabainc.dingtalk_7.0.40.30706_amd64.deb)，[dingtalk_7.5.0.40221](https://dtapp-pub.dingtalk.com/dingtalk-desktop/xc_dingtalk_update/linux_deb/Release/com.alibabainc.dingtalk_7.5.0.40221_amd64.deb)使用 `ar -x` 将文件解压到某个位置)
```bash
┌──(suse@localhost)-[~/Documents/com.alibabainc.dingtalk_1.8.0.30601_amd64]
└─$ ls -al
total 242776
drwxr-xr-x 1 suse suse        84 Jun 16 13:27 .
drwxr-xr-x 1 suse suse      2060 Jun 16 11:25 ..
-rw-r--r-- 1 suse suse     66520 Jun  1 12:05 control.tar.xz
-rw-r--r-- 1 suse suse 248528292 Jun  1 12:05 data.tar.xz
-rw-r--r-- 1 suse suse         4 Jun  1 12:05 debian-binary
```
我们继续解压 data.tar.xz
```bash
┌──(suse@localhost)-[~/Documents/com.alibabainc.dingtalk_1.8.0.30601_amd64]
└─$ ls -al
total 242776
drwxr-xr-x 1 suse suse        84 Jun 16 13:27 .
drwxr-xr-x 1 suse suse      2060 Jun 16 11:25 ..
-rw-r--r-- 1 suse suse     66520 Jun  1 12:05 control.tar.xz
drwxr-xr-x 1 suse suse        12 Jun 16 13:27 data
-rw-r--r-- 1 suse suse 248528292 Jun  1 12:05 data.tar.xz
-rw-r--r-- 1 suse suse         4 Jun  1 12:05 debian-binary

```
现在我们进入 `data` 目录，其中 `opt` 目录下是我们所需要的文件
```bash
┌──(suse@localhost)-[~/Documents/com.alibabainc.dingtalk_1.8.0.30601_amd64/data]
└─$ ls -al
total 0
drwxr-xr-x 1 suse suse 12 Jun 16 13:27 .
drwxr-xr-x 1 suse suse 84 Jun 16 13:27 ..
drwxr-xr-x 1 suse suse  8 Jun 16 13:27 opt
drwxr-xr-x 1 suse suse 10 Jun 16 13:27 usr
```
我习惯将手动安装的软件放在 `/opt` 目录下，所以接下来我会将软件移动到 `/opt`
```bash
sudo mv ./opt/apps /opt
```
导航到 `/opt`,可以看到我们的目录是下面这样，如果你本来就有 `apps` 目录，自行选择合适的方式处理
```bash
┌──(suse@localhost)-[/opt]
└─$ ls -al
total 0
dr-xr-xr-x 1 suse suse 208 Jun 16 13:45 .
drwxr-xr-x 1 root root 142 Oct 18  2022 ..
drwxr-xr-x 1 suse suse  46 Jun 16 13:27 apps
...
...
drwxr-xr-x 1 root root 122 Apr 27 16:19 wemeet
```
前面的准备工作做完之后我们开始进入正题，如何才能运行这个 `App`，首先我们导航到 `/opt/apps/com.alibabainc.dingtalk/files`,找到名为 `Elevator.sh`的文件，在终端执行ta，很明显不能正确执行并抛出了一些错误
```bash
┌──(suse@localhost)-[/opt/apps/com.alibabainc.dingtalk/files]
└─$ ./Elevator.sh 
"opensuse-tumbleweed"
"opensuse-tumbleweed" branch
"opensuse-tumbleweed" glibc lower branch
preload_libs=./envlib.so ./libharfbuzz.so.0
Load /opt/apps/com.alibabainc.dingtalk/files/1.8.0-Release.30601//dingtalk_dll.so failed! Err=./libm.so.6: version `GLIBC_2.29' not found (required by /lib64/libgtk-x11-2.0.so.0)
```
看来是 `dingtalk` 自己是自带 `libm.so.6` 文件而且而系统安装的文件不一致，我们检查并确认一下，确实没有系统文件 `/lib64/libgtk-x11-2.0.so.0` 所需要的 `GLIBC_2.29`。
```bash
┌──(suse@localhost)-[/opt/apps/com.alibabainc.dingtalk/files]
└─$ strings ./1.8.0-Release.30601/libm.so.6 | grep ^GLIBC
GLIBC_2.2.5
GLIBC_2.4
GLIBC_2.15
GLIBC_2.18
GLIBC_2.23
GLIBC_2.24
GLIBC_2.25
GLIBC_2.26
GLIBC_2.27
GLIBC_2.28
GLIBC_PRIVATE
```
所以我们可以手动复制或者软链接一个 `/lib64/libm.so.6` 下的文件到 `release` 目录，也可以直接删掉，让系统文件生效。
这里我选择新建一个 `exclude` 目录 将 `release` 下的 `libm.so.6` 移动过去，做一个备份。
现在我们尝试再次执行 `Elevator.sh` 会有新的错误抛出
```bash
┌──(suse@localhost)-[/opt/apps/com.alibabainc.dingtalk/files/1.8.0-Release.30601]
└─$ ./com.alibabainc.dingtalk 
Load /opt/apps/com.alibabainc.dingtalk/files/1.8.0-Release.30601//dingtalk_dll.so failed! Err=/lib64/libcairo.so.2: undefined symbol: FT_Get_Color_Glyph_Layer
```
看起来还是文件版本不一致的文件啊，简单搜索发现`libcairo.so.2` 这个库和 `libfreetype` 有关，所以将 `release` 下的 `libfreetype.so.6` 和 `libfreetype.so.6.16.1` 移动到 `exclude`。继续运行...好了，完成～
![dingtalk 登录](./assets/img/dingtalk/dingtalk_login.png)
![dingtalk 设置](./assets/img/dingtalk/dingtalk_preferences.png)
![dingtalk 文档](./assets/img/dingtalk/dingtalk_online.png)