---
title: 前端笔记
date: 2023-07-20 19:09:33
tags:
    - 前端
    - notes
categories:
    - 前端
    - notes
---

## 没有分类的前端笔记
<!-- more -->
### Webkit 对 &lt;svg&gt; whitespace 属性的支持问题
如果 svg 文件中```<tspan>```标签没有指定 ```whitespace``` 的属性，Webkit 浏览器将会忽略祖先元素的属性，没有被继承。[fabric.js](https://github.com/fabricjs/fabric.js/pull/4294)中提到了这个问题。
> **本站顶部的 banner 图片是一个 ASCII 字符组成的 svg 图像，这个问题是在绘制这个图像的时候发现的[2023-07-20]**

## 浏览器对 &lt;img&gt; alt 属性的表现
如果把这个属性设置为空字符串（alt=""），则表明该图像不是内容的关键部分（这是一种装饰或者一个追踪像素点），非可视化浏览器在渲染的时候可能会忽略它。而且，如果图片加载失败，可视化浏览器会隐藏表示图片损坏的图标。[MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/img#%E5%B1%9E%E6%80%A7)
> **本站底部的 `badge` 图标就应用了这个特性在用户网络不佳的情况下不展示破碎的图标。[2023-07-17]**