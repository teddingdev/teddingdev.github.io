---
title: Let's Encrypt
date: 2022-04-04 03:50:46
tags:
- linux
- docker
- let's encrypt
categories:
- linux
- docker
---

## 使用 docker 签署 Let's Encrypt 证书 
<!-- more -->
### docker certbot/certbot command
```bash
sudo docker run -it --rm --name certbot     
                -v "/etc/letsencrypt:/etc/letsencrypt"             
                -v "/var/lib/letsencrypt:/var/lib/letsencrypt"             
                certbot/certbot certonly --manual --preferred-challenges dns
```
ps: 90 天有效期，不能自动续签，需要在证书过期前手动再次签署证书。

### certbot 文档
- [安装 certbot client](https://eff-certbot.readthedocs.io/en/stable/intro.html#how-to-run-the-client)        
- [使用 certbot 签署证书](https://eff-certbot.readthedocs.io/en/stable/using.html#standalone)