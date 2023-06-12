---
title: 在 Linux 终端中预览图片的工具 [Terminal image viewer]
date: 2023-06-12 09:57:23
tags:
    - Linux
    - Terminal
    - Shell
    - VS Code
categories:
    - Linux
    - Terminal
    - Shell
---

在阅读最近一版的 `Visual Studio Code` [Release Notes](https://code.visualstudio.com/updates/v1_79) 时注意到内置的终端已经支持了 `Images in the terminal`。
<!-- more -->
想要体验可以手动在设置中开启
```json
"terminal.integrated.experimentalImageSupport": true
```
你可以使用 [imgcat python package](https://pypi.org/project/imgcat/) 或者 [imgcat script](https://iterm2.com/documentation-images.html) 在终端预览 png, gif, jpg 文件。