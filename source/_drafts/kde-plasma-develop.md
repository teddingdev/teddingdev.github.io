---
title: kde-plasma-develop
date: 2023-08-10 18:00:00.123
tags:
categories:
---

{{ title }}
<!-- more -->

plasma5-sdk
kdevelop5
<!-- Qt oriented code checker based on the Clang framework -->
clazy

###
┌──(suse@localhost)-[~]
└─$ sudo zypper in --no-recommends plasma-framework-devel plasma5-addons-devel plasma5-integration-devel plasma5-workspace-devel
[sudo] password for root: 
Loading repository data...
Reading installed packages...
Resolving package dependencies...

The following 48 NEW packages are going to be installed:
  extra-cmake-modules gcc-c++ gettext-tools kconfig-devel kcoreaddons-devel kf5-filesystem ki18n-devel
  kiconthemes-devel kpackage-devel kservice-devel kwayland-devel kwindowsystem-devel libdrm-devel libffi-devel
  libglvnd-devel libksysguard5-devel libpciaccess-devel libQt5Core-devel libQt5DBus-devel libQt5Gui-devel
  libQt5Network-devel libqt5-qtbase-common-devel libqt5-qtdeclarative-devel libqt5-qtdeclarative-tools
  libQt5Test-devel libQt5Widgets-devel libQt5Xml-devel libX11-devel libXau-devel libxcb-devel libxcb-screensaver0
  libxcb-xf86dri0 libxcb-xtest0 libxcb-xvmc0 libXext-devel libXrandr-devel libXrender-devel Mesa-KHR-devel
  Mesa-libEGL-devel Mesa-libGL-devel plasma5-addons-devel plasma5-integration-devel plasma5-workspace-devel
  plasma-framework-devel vulkan-devel vulkan-headers wayland-devel xorgproto-devel

48 new packages to install.
Overall download size: 20.3 MiB. Already cached: 0 B. After the operation, additional 97.4 MiB will be used.


## suse 依赖参考
zypper in --no-recommends gcc cmake libopenssl-3-devel dbus-1-devel glib2-devel gdk-pixbuf-devel gtk4-devel libadwaita-devel gstreamer-devel gstreamer-plugins-base-devel gstreamer-plugins-bad-devel desktop-file-utils appstream-glib