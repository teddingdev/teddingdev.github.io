---
title: RPM Packages Backup
date: 2022-04-03 00:20:00
tags:
    - Linux
    - shell
categories:
    - Linux
    - shell
---

{{ title }}
openSUSE 首次启动 快速初始化

<!-- more -->

- kSysGuard
- Kdevelop
- Kompare
- WPS
- plan
- kfind
- postman
- kde partition manager
- kde connect
- suse studio imagewriter
- latte
- yakuake
- dbeaver-ce
- yast2-fonts
- yast2-users
- screenkey // 显示按键
- inkscape // 适量图形编辑
- zip
- 7zip
- packman
- packman-essentials
- vscode
- chrome
- edge
### 可选
- woeusb

### 当前已经安装
latte-dock
partitionmanager
ksysguard5
kfind
kdeconnect-kde
git-gui


### vscode
```bash
sudo rpm --import https://packages.microsoft.com/keys/microsoft.asc
sudo sh -c 'echo -e "[code]\nname=Visual Studio Code\nbaseurl=https://packages.microsoft.com/yumrepos/vscode\nenabled=1\ntype=rpm-md\ngpgcheck=1\ngpgkey=https://packages.microsoft.com/keys/microsoft.asc" > /etc/zypp/repos.d/vscode.repo'
```

### chrome
```bash
sudo rpm --import https://dl.google.com/linux/linux_signing_key.pub
sudo zypper ar http://dl.google.com/linux/chrome/rpm/stable/x86_64 google-chrome
```

### edge
```bash
sudo rpm --import https://packages.microsoft.com/keys/microsoft.asc
sudo zypper ar https://packages.microsoft.com/yumrepos/edge microsoft-edge
```

### packman
```bash
sudo zypper ar -cfp 90 https://ftp.gwdg.de/pub/linux/misc/packman/suse/openSUSE_Tumbleweed/ packman
sudo zypper dup --from packman --allow-vendor-change
```

### vscode KDE/Plasma 全局菜单失效
需要安装 libdbusmenu-glib4 包

### vscode 登录同步账户
gnome-keyring

### Wine
- appmenu-gtk2-module
- appmenu-gtk3-module
- winetricks riched20  修复输入框聚焦问题
- export WINEPREFIX=/path/to/wineprefix

### 翻译
translate-shell

### 解码 
- https://en.opensuse.org/Additional_package_repositories
- vlc-codecs
- ffmpeg-4

### 编辑器
emacs

### browser
- epiphany (webkit2gtk safari 同款内核)

### ios 设备管理
- libimobiledevice6 
- usbmuxd 
- ifuse        
`https://libimobiledevice.org/#downloads`

### Clang LLVM
- clang 
- llvm

### 创建 Classic Macos 9
```bash
qemu-system-ppc -hda ../mac_os9_zh_CN.img  -M mac99 -m 256 -prom-env "boot-args=-v" -g 1024x768x32
```



### 字体
- wqy-bitmap-fonts
- wqy-microhei-fonts


### Okular 插件
- calligra-extras-okular
- okular-spectre

```bash
zypper in latte-dock partitionmanager ksysguard5 kfind kdeconnect-kde git-gui libdbusmenu-glib4 appmenu-gtk2-module appmenu-gtk3-module translate-shell epiphany yakuake yast2-fonts yast2-users screenkey zip 7zip ksysguard wine -y
```

## 广告屏蔽
AdNauseam
