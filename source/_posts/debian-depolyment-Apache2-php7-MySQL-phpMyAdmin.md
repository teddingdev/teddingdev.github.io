---
title: debian 部署 Apache2+php7+MySQL+phpMyAdmin
date: 2017-09-30 23:04:48
tags:
- Server
- debian
- LAMP
categories:
- Server
- LAMP
---

1\.``sudo  apt-get update``
2\.``sudo apt-get upgrade``
3\.``sudo apt-get install apache2``
4\.``sudo apt-get install php7.0``
5\.``sudo apt-get install mysql-server mysql-client``
6\.``sudo apt-get install phpmyadmin``

<!-- more -->
【注意】安装mysql的时候不会提示输入root密码，需要在安装完成之后在终端执行
``sudo mysql_secure_installation``
根据提示设置MySQL root帐号的密码，以及是否允许root 账号远程连接。
接着终端执行下面几条
``sudo mysql -u root``
``use mysql``
``update mysql.user set plugin = ''where User='root'; ``
``flush privileges; ``
``exit;``
至此phpmyadmin可以使用root帐户登陆。