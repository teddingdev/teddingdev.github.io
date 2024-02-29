---
title: 为 Firefox Developer Edition 创建桌面快捷方式（.desktop）
date: 2023-09-28 16:56:58
update_date: 2024-02-29 10:12:33
tags:
    - Linux
    - Firefox
categories:
    - Linux
    - Firefox
---

{{ title }}
<!-- more -->
Mozilla 并没有为 `Firefox Developer Edition` 提供诸如 Rpm、Deb 、Pkg、AppImage 此类的安装包，你只会得到一个 *.tar.bz2的压缩文件。你需要将全部的文件释放到一个目录，并执行其中的 `firefox` 可执行文件，到此为止一切正常。
但是很快你就会发现怎么也找不到经常见到的采用 XDG 桌面配置规范的 *.desktop 文件。幸运的是你可以从你使用的发行版那里获得并安装 stable 版本的firefox（大部分安装了桌面环境的发行版都附带了 firefox 供用户浏览器互联网）。而你可以拷贝firefox stable 所使用的 *.desktop 文件到 `$HOME/.local/share/applications` 并修改为你希望的名字(如：Firefox-Develop-Edition.desktop)。但是此时还不能使用，使用你熟悉的文本编辑器 vi/vim/nano/kate 等打开，替换其中所有的 Exec=xxxxx 部分，并填入你刚刚释放的 firefox 文件的路径。当你将快捷入口固定到窗口管理器提供的dock / panel 栏的时候 一切正常，但是你关闭之后再次打开你会发现蓝色 firefox 图标在 dock/panel 出现了两次，而不是出现在固定的位置。此时你需要在 `[Desktop Entry]` 项目下面加入 `StartupWMClass=firefox-aurora`,内容大概和下面的样子差不多。当你关闭窗口之后重新打开你会发现图标和高亮出现在了它应该在的位置。
```
...
[Desktop Entry]
Actions=new-window;PrivateBrowsing;ProfileManager
Categories=Network;WebBrowser;GTK
Name=Firefox-Developer-Edition
Path=
StartupNotify=true
StartupWMClass=firefox-aurora
...
```

> 你可以通过 xprop 工具 获取打开窗口的 WMClass 值，`Firefox Developer Editon` 窗口为 `firefox-aurora`