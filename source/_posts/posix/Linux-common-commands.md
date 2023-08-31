---
title: Linux 常用命令记录
date: 2017-05-08 14:26:53
updated: 2023-08-31 16:01:34
tags:
- Linux
- shell
- commands
categories:
- Linux
- commands
---


#### 保持文件属性
```bash
cp -p 
```

#### 递归处理目录及文件
```bash
chowm -R 
```

#### 统计目录大小/排序/前20
```bash
du -shc ~/.cache/* | sort -hr | head -20
```

#### 获取当前目录名称
```bash
echo $(cd $(dirname $0); pwd)
```

#### 获取指定 nvme 硬盘的 信息
```bash
sudo nvme smart-log /dev/nvme0n1
```

#### 获取目录下的文件列表 重定向 输出到文件
```bash
find "/home/suse/Music/xxx/" -name "*.flac" | sort -n > "/home/suse/Music/Playlist/xxx.m3u8"
```

#### KDE 桌面环境 终端内执行 *.desktop 文件
```bash
kioclient exec <path-to-desktop-file>
```

#### 统计暴力破解 ssh 登录的 ip
```bash
journalctl -u sshd.service | grep 'Invalid .* from [0-9]\{1,3\}\.[0-9]\{1,3\}\.[0-9]\{1,3\}\.[0-9]\{1,3\}' | grep -o '[0-9]\{1,3\}\.[0-9]\{1,3\}\.[0-9]\{1,3\}\.[0-9]\{1,3\}' | uniq | awk '{print "\""$1"\""","}' > ～/Documents/ips.txt

```

```bash
if [ -f /usr/bin/pipewire-pulse ]; then
    echo 'success'
fi
```