---
title: 高度不一的&lt;li&gt;列表靠底部对齐
date: 2017-09-11 17:35:09
tags:
- 前端
categories:
- 前端
---
```xml
<!DOCTYPE HTML>
<html>
<head>
	<meta charset="utf-8">
	<title>测试文字底部对齐</title>
	<style type="text/css">
		* {
			margin: 0;
			padding: 0;
		}

		body {
			font: 12px/1.5 arial;
		}

		ul {
			list-style: none;
		}

		ul li {
			display: inline-block;
			*display: inline;
			*zoom: 1;
			width: 1em;
			margin-right: 10px;
			overflow: hidden;
			background: #cecece;
		}
	</style>
</head>

<body>
	<ul>
		<li style="height: 65px;">65</li>
		<li style="height: 80px;">80</li>
		<li style="height: 40px;">40</li>
		<li style="height: 60px;">60</li>
		<li style="height: 50px;">50</li>
		<li style="height: 70px;">70</li>
	</ul>
</body>

</html>
```

![预览1.png](http://upload-images.jianshu.io/upload_images/4221131-e474b0a909b03bdd.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![预览2.png](http://upload-images.jianshu.io/upload_images/4221131-a836fa15f7324ecd.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

- 当``<li>``标签内没有文本节点时，通过设置样式**``display:inline-block``**可以将高度不一样的``<li>``标签底部对齐。
- 当``<li>``标签内有文本节点时，通过设置样式**``display:inline-block``**，**``overflow:hidden``**可以将高度不一样的``<li>``标签底部对齐。