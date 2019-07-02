---
title: Linux 虚拟机 访问 Virtual Box 宿主机 共享文件夹
date: 2017-09-30 23:04:06
tags:
- VirtualBox
- VBox shared folder
- Linux
categories:
- Server
- VirtualBox
---
Vbox共享文件夹挂载在``/media/sf_xxx``，属于``root``用户和``vfsbox``用户组，一般用户不能访问。
想要访问共享文件夹需要将用户加入 ``vfsbox`` 用户组。
首先安装  ``VBoxLinuxAdditions``
然后在终端中执行：
 ``sudo usermod -a -G vboxsf 你的用户名``