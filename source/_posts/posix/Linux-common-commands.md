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

```

```bash
if [ -f /usr/bin/pipewire-pulse ]; then
    echo 'success'
fi
```