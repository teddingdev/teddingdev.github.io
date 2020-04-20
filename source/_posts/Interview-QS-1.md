---
title: Interview QS 1
date: 2020-04-18 03:34:02
tags:
---

# 前端面试 笔试题 1

## 1、Cookie、sessionStorage、localStorage 区别

### Cookie

`HTTP Cookie（也叫Web Cookie或浏览器 Cookie）是服务器发送到用户浏览器并保存在本地的一小块数据，它会在浏览器下次向同一服务器再发起请求时被携带并发送到服务器上。通常，它用于告知服务端两个请求是否来自同一浏览器，如保持用户的登录状态。Cookie 使基于无状态的HTTP协议记录稳定的状态信息成为了可能。`

- 会话期 Cookie
  > 会话期 Cookie 是最简单的 Cookie：浏览器关闭之后它会被自动删除，也就是说它仅在会话期内有效。会话期 Cookie 不需要指定过期时间（Expires）或者有效期（Max-Age）。需要注意的是，有些浏览器提供了会话恢复功能，这种情况下即使关闭了浏览器，会话期 Cookie 也会被保留下来，就好像浏览器从来没有关闭一样。
- 持久性 Cookie
  > 和关闭浏览器便失效的会话期 Cookie 不同，持久性 Cookie 可以指定一个特定的过期时间（Expires）或有效期（Max-Age）。

### Web Storage

- sessionStorage    
> 为每一个给定的源（given origin）维持一个独立的存储区域，该存储区域在页面会话期间可用（即只要浏览器处于打开状态，包括页面重新加载和恢复）。
- localStorage  
> 同样的功能，但是在浏览器关闭，然后重新打开后数据仍然存在。

## 2、 Vue 的生命周期分为几个阶段，状态如何

![生命周期图](https://cn.vuejs.org/images/lifecycle.png)

<center>图片引用自官网</center>

## 3、Vue 组件之间的传值通信

## 4、添加、移动、复制、创建、查找节点

```javaScript
createDocumentFragment() //创建一个 DOM 片段  
createElement() //创建一个具体的元素  
createTextNode() //创建一个文本节点

appendChild() //添加
remove() //移除
replaceChild() //替换
insertBefore() //插入

getElementsByTagName()//通过标签名
getElementsByClassName()//通过元素的name属性
getElementById()//通过ID
getAttribute()
```
## 5、闭包和闭包的用途、优缺点

## 6、http状态码
200     
301     
302     
404     
500 

## 7、web应用性能优化
>1、减少请求次数     
>2、降低请求耗时

- CDN
- 压缩传输，即GZIP/Deflate
- 前端模块化
- 使用缓存
- 使用本地存储
- 负载均衡：Nginx/SLB



## 8、DOM 事件流
“DOM2级事件”规定的事件流包括三个阶段: 事件捕获阶段、处于目标阶段和事件冒泡阶段。首先发生的是事件捕获，为截获事件提供了机会。然后是实际的目标接收到事件。最后一个阶段是冒泡阶 段，可以在这个阶段对事件做出响应。  
  
在 DOM 事件流中，实际的目标在捕获阶段不会接收到事件。下一个阶段是“处于目标”阶段，于是事件在目标上发生，并在事件处理中被看成冒泡阶段的一部分。然后，冒泡阶段发生，事件又传播回文档。
