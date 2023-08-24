---
title: Linux common commands
date: 2017-05-08 14:26:53
updated: 2023-08-09 12:40:51
tags:
- Linux
- shell
- commands
categories:
- Linux
- commands
---


```bash
# 保持文件属性
cp -p 

# 递归处理目录及文件
chowm -R 

# 统计目录大小/排序/前20
du -shc ~/.cache/* | sort -hr | head -20

# 获取当前目录名称
echo $(cd $(dirname $0); pwd)

# 获取指定 nvme 硬盘的 信息
sudo nvme smart-log /dev/nvme0n1

# 获取目录下的文件列表 重定向 输出到文件
find "/home/suse/Music/xxx/" -name "*.flac" | sort -n > "/home/suse/Music/Playlist/xxx.m3u8"

# KDE 桌面环境 终端内执行 *.desktop 文件
kioclient exec <path-to-desktop-file>

```

```bash
if [ -f /usr/bin/pipewire-pulse ]; then
    echo 'success'
fi
```