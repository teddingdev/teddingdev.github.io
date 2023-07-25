---
title: 关于 VS Code、Edge、Chrome 中缩放的偏好设置
date: 2023-06-13 14:24:12
tags:
    - VS Code

categories:
    - VS Code
---


今天偶然在一个博主的文章中看到了关于 `Chrome` 、`EDGE` 配置缩放的问题，很有意思，虽然可选的缩放比例都是整数，但是在存储的时确是一个看似没规律的浮点数。
<!-- more -->
博主提到了这个数字是可能是一个对数，验证了一下确实是取以 1.2 为底的对数。
在 VS Code 设置中是这么描述的 ：
>**Window: Zoom Level**
>Adjust the zoom level of the window. The original size is 0 and each increment above (e.g. 1) or below (e.g. -1) represents zooming >20% larger or smaller. You can also enter decimals to adjust the zoom level with a finer granularity.

我自己一直将这部分配置为 `0.7142857142857143`，但可惜的是我并不知道这可能与对数有关。编辑器默认的字体大小是 14 号，而我想要的结果16号，最简单是方式是通过设置编辑区域的字体大小达到目的，但是整个 vscode 窗口的其他部分会显得很突兀，所以我决定用 `zoom` 属性来达到目的。最简单的计算方式是根据描述得到的 下面这个
> 14 * ( 0.2 * zoomLevel + 1 ) = 16

简单算一下就可以得到 (( 16 / 14 ) - 1 ) / 0.2 = `0.7142857142857143` 的结果。
当得知这个缩放值是对数的时候，我们可以更简单的计算出

> Math.log(16/14) / Math.log(1.2) 

16: 目标字体大小
14: 当前字体大小

了解缩放值是怎么来的以后，我们就可以开始随心所欲了。Chrome、Edge 和 Firefox 中都可以配置浏览器的默认缩放级别，但是它们的选项并不相同，为了配合 KDE 桌面设置字体大小，Firefox 一直默认配置全局缩放 120%，到了 Chromium 系之后就只有125% 可选了，虽然不能直接设置，但我们可以通过直接修改偏好设置文件达到我们的目的。
> ~/.config/microsoft-edge/Default/Preferences

打开之后 找到 `{"default_zoom_level":{"x":zoomLevel}` 替换 `zoomLevel` 的值为 `1` 保存后就生效了。
> zoomLevel = Math.log(1.2) / Math.log(1.2)

