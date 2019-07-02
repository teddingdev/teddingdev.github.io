---
title: Linux 虚拟机中 Apache 访问宿主机 Vbox-shared-folder
date: 2017-09-30 23:04:58
tags:
- VirtualBox
- Linux
- debian
- Apache
- 共享文件夹
categories:
- Server 
- VirtualBox
---

## 将 sf_xxx 目录通过软连接的形式链接到 Apache Document Root。
``ln -s /media/sf_xxx  /var/www/html``
【注意】要使用绝对路径。
## 将 www_data 用户加入到 vboxsf 用户组。
``sudo usermod -a -G vboxsf www-data``
尝试重启 虚拟机 查看是否生效