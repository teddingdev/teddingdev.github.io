---
title: Linux 常用命令记录
date: 2017-05-08 14:26:53
updated: 2024-02-22 14:54:13
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

#### 统计目录大小/排序/前 20

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
find "/home/username/Music/xxx/" -name "*.flac" | sort -n > "/home/username/Music/Playlist/xxx.m3u8"
```

#### KDE 桌面环境 终端内执行 \*.desktop 文件

```bash
kioclient exec <path-to-desktop-file>
```

#### 统计暴力破解 ssh 登录的 ip

```bash
# 查询日志
journalctl -u sshd.service | grep 'Invalid .* from [0-9]\{1,3\}\.[0-9]\{1,3\}\.[0-9]\{1,3\}\.[0-9]\{1,3\}'
# 查询日志 重定向 输出 到 ～/Documents/ips.txt
journalctl -u sshd.service | grep 'Invalid .* from [0-9]\{1,3\}\.[0-9]\{1,3\}\.[0-9]\{1,3\}\.[0-9]\{1,3\}' | grep -o '[0-9]\{1,3\}\.[0-9]\{1,3\}\.[0-9]\{1,3\}\.[0-9]\{1,3\}' | uniq | awk '{print "\""$1"\""","}' > ~/Documents/ips.txt

```

#### ffmpeg 分割音频文件

```bash
# hh:mm:ss.mmm
ffmpeg -i input.file -ss 00:00:00.000 -to 01:00:00.000 -c copy output.file
ffmpeg -i '/path/to/Music/2015-我只在乎你[蜚声环球系列][WAV]/out.flac' -acodec alac out.m4a
```

#### shnsplit 按照指定的 cue 文件切割音频文件

```bash
# 手动指定 cue 和待分割的音频文件
shnsplit -f '/path/to/Music/影视OST/仙剑奇侠传/麦振鸿 - 仙剑奇侠传 - 电视原创配乐.cue' -t "%n %p - %t" -d out '/path/to/Music/影视OST/仙剑奇侠传/麦振鸿 - 仙剑奇侠传 - 电视 原创配乐.wav'

# 自动根据文件名分割 wav 文件
mkdir out; for file in *.cue; do shnsplit -f "${file}" -t "%n.%p - %t" -d out "$(basename "${file}" ".cue").wav"; done;
# 批量转换 wav -> m4a 并删除源文件
for file in ./out/*.wav; do ffmpeg -i "$file" -c:a alac "`basename "$file" .wav`.m4a"; done; rm -rf ./out;
# 批量转换 wav -> m4a 并丢弃封面
for file in ./*.wav; do ffmpeg -i "$file" -c:a alac -vn "`basename "$file" .wav`.m4a"; done; rm -f ./*.wav;
# 批量转换 wav -> m4a 并保留封面
for file in ./*.wav; do ffmpeg -i "$file" -c:a alac -c:v copy "`basename "$file" .wav`.m4a"; done; rm -f ./*.wav;
# 批量转换 flac -> flac 并丢弃封面
for file in ./out/*.flac; do ffmpeg -i "$file" -c:a copy -vn "`basename "$file" .flac`.flac"; done; rm -rf ./out;
# 批量转换 m4a -> m4a 并丢弃封面
for file in ./out/*.m4a; do ffmpeg -i "$file" -c:a copy -vn "`basename "$file" .m4a`.m4a"; done; rm -rf ./out;
# 批量重命名（删除指定字符串[qobuz]）
for file in *; do mv "${file}" "$(basename "${file}" "[qobuz]")"; done;
```
