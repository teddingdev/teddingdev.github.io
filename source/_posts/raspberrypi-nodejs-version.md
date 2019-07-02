---
title: 树莓派安装指定版本的node.js
date: 2017-06-17 16:54:37
tags:
- Node.js
- 树莓派
categories: 
- Node.js
- 树莓派
---
默认你已经打开终端 `ssh` 连接至树莓派				
依次执行下面的命令更新源和package：
```
$ sudo apt-get update			
$ sudo apt-get upgrade
```

## 安装 node 和 npm
如果你之前通过 ``apt-get`` 安装过 *node* 和 *npm* 请忽略，直接到下一步。如果没有就依次执行下面的命令
```
$ sudo apt-get install nodejs
$ sudo apt-get install npm
```

可以通过下面的命令查看``apt-get``源中的软件和描述。
```	
$ apt-cache serach nodejs	
$ apt-cache serach npm
```

安装完成后通过 ``node -v``  ``npm -v``  查看 node 和 npm 的版本。
不出意外的话 ``node`` 的版本是0.10.x ，``npm`` 的版本是2.x的老版本。

## 升级 node 和 npm 
全局安装管理 ``node`` 版本的软件包 ``n``，软件包的名字就叫做 ``n``
```
$ sudo npm install -g n
```
安装 ``node`` 稳定版本
```
sudo n stable
```
安装 ``node`` 指定版本
```
sudo n vxxx
#vvv为版本号
```
安装 `` node LTS 6.11.0 ``
```
sudo n v6.11.0
```

*以上所有命令都要 sudo 以root 权限执行*

## 刷新环境变量
```
source /etc/profile
```

## 清理多余的 node 版本
现在系统中的 node 已经是指定的版本了。
但是除了最新的node之外，你还有一个通过apt-get所安装的低版本，可以不用管它，也可以通过下面的命令来清理。
```
$ sudo apt-get remove nodejs
$ sudo apt autoremove
```