---
title: openSUSE 使用平铺窗口管理工具 bspwm 替换 KWin 
date: 2022-08-11 14:41:56
tags: 
- Linux
- openSUSE
categories: 
- Linux
- openSUSE
---

## bspwm 基础安装配置
<!-- more -->

1、 安装 `bspwm` 、`sxhkd`        
2、 复制 配置文件到 ~/.config        
3、 编辑 bspwm desktop session 文件 （/usr/share/xsessions/bspwm）配置,修改 `Exec=bspwm` 到 `Exec=env KDEWM=bspwm`        
4、 禁用 KDE 窗口管理 systemd 启动方式，`kwriteconfig5 --file startkderc --group General --key systemdBoot false`
    

```bash
$:~> mkdir ~/.config/bspwm
$:~> mkdir ~/.config/sxhkd
$:~> cp /usr/share/doc/packages/bspwm/examples/bspwmrc ~/.config/bspwm/bspwmrc
$:~> cp /usr/share/doc/packages/bspwm/examples/sxhkdrc ~/.config/sxhkd/sxhkdrc
```

### 参考链接
- bspwm [arch wiki](https://wiki.archlinux.org/title/Bspwm_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87))
- KDE [arch wiki](https://wiki.archlinux.org/title/KDE_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87))
- KDE UserBase Wiki [Using_Other_Window_Managers_with_Plasma](https://userbase.kde.org/Tutorials/Using_Other_Window_Managers_with_Plasma/zh-cn)