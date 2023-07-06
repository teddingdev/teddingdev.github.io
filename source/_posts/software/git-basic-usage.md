---
title: git 常用命令
date: 2023-07-06 14:21:19
tags: 
- git
categories:
- git
---


今天闲来无事，记录一下 git 常用的命令
<!-- more -->

```bash
# 查看分支信息
git branch -vv

# 重命名分支
git branch -m <新分支名称> (当前分支)

# 重命名分支 
git branch -m <旧分支名称> <新分支名称> (非当前分支) 

# 关联远程分支
git branch --set-upstream-to=<主机名称> <分支名称>

# 关联远程主机
git remote add <主机名称> <主机地址>

# 删除远程地址
git remote remove <主机名称>

# 重命名远程地址
git remote rename <旧主机名称> <新主机名称>

git stash push -S -m <message>

# 删除远程分支
git push --delete <主机名称> <分支名称>

# git 对比两次提交 差异的文件 打包
git diff <commitID> <commitID> --name-only | xargs zip diff.zip
```