---
title: Interview QS 1
date: 2020-04-18 03:34:02
tags:
- 前端
- 面试
categories:
- 前端
- 面试
---

前端面试 笔试题 1

<!--more-->

# Cookie、sessionStorage、localStorage 区别

## Cookie

`HTTP Cookie（也叫Web Cookie或浏览器 Cookie）是服务器发送到用户浏览器并保存在本地的一小块数据，它会在浏览器下次向同一服务器再发起请求时被携带并发送到服务器上。通常，它用于告知服务端两个请求是否来自同一浏览器，如保持用户的登录状态。Cookie 使基于无状态的HTTP协议记录稳定的状态信息成为了可能。`

- 会话期 Cookie
  > 会话期 Cookie 是最简单的 Cookie：浏览器关闭之后它会被自动删除，也就是说它仅在会话期内有效。会话期 Cookie 不需要指定过期时间（Expires）或者有效期（Max-Age）。需要注意的是，有些浏览器提供了会话恢复功能，这种情况下即使关闭了浏览器，会话期 Cookie 也会被保留下来，就好像浏览器从来没有关闭一样。
- 持久性 Cookie
  > 和关闭浏览器便失效的会话期 Cookie 不同，持久性 Cookie 可以指定一个特定的过期时间（Expires）或有效期（Max-Age）。

## Web Storage

- sessionStorage    
> 为每一个给定的源（given origin）维持一个独立的存储区域，该存储区域在页面会话期间可用（即只要浏览器处于打开状态，包括页面重新加载和恢复）。
- localStorage  
> 同样的功能，但是在浏览器关闭，然后重新打开后数据仍然存在。

# Vue 的生命周期分为几个阶段，状态如何

![生命周期图](https://cn.vuejs.org/images/lifecycle.png)

<center>图片引用自官网</center>

# Vue 组件之间的传值通信

# 添加、移动、复制、创建、查找节点

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
# 闭包和闭包的用途、优缺点

# http状态码
200     
301     
302     
404     
500 

# web应用性能优化
>1、减少请求次数     
>2、降低请求耗时

- CDN
- 压缩传输，即GZIP/Deflate
- 前端模块化
- 使用缓存
- 使用本地存储
- 负载均衡：Nginx/SLB


# DOM 事件流
“DOM2级事件”规定的事件流包括三个阶段: 事件捕获阶段、处于目标阶段和事件冒泡阶段。首先发生的是事件捕获，为截获事件提供了机会。然后是实际的目标接收到事件。最后一个阶段是冒泡阶 段，可以在这个阶段对事件做出响应。  
  
在 DOM 事件流中，实际的目标在捕获阶段不会接收到事件。下一个阶段是“处于目标”阶段，于是事件在目标上发生，并在事件处理中被看成冒泡阶段的一部分。然后，冒泡阶段发生，事件又传播回文档。


# 实现Flat
[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/flat)   
`原生flat`
```javascript
var newArray = arr.flat([depth])
var arr1 = [1, 2, [3, 4]];
arr1.flat(); 
// [1, 2, 3, 4]
var arr2 = [1, 2, [3, 4, [5, 6]]];
arr2.flat();
// [1, 2, 3, 4, [5, 6]]
var arr3 = [1, 2, [3, 4, [5, 6]]];
arr3.flat(2);
// [1, 2, 3, 4, 5, 6]

//使用 Infinity，可展开任意深度的嵌套数组
var arr4 = [1, 2, [3, 4, [5, 6, [7, 8, [9, 10]]]]];
arr4.flat(Infinity);
// [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
```
`替代方案`
>使用 reduce 与 concat
```javascript
var arr = [1, 2, [3, 4]];

// 展开一层数组
arr.flat();
// 等效于
arr.reduce((acc, val) => acc.concat(val), []);
// [1, 2, 3, 4]

// 使用扩展运算符 ...
const flattened = arr => [].concat(...arr);
```
>reduce + concat + isArray + recursivity
```javascript
// 使用 reduce、concat 和递归展开无限多层嵌套的数组
var arr1 = [1,2,3,[1,2,3,4, [2,3,4]]];

function flatDeep(arr, d = 1) {
   return d > 0 ? arr.reduce((acc, val) => acc.concat(Array.isArray(val) ? flatDeep(val, d - 1) : val), [])
                : arr.slice();
};

flatDeep(arr1, Infinity);
// [1, 2, 3, 1, 2, 3, 4, 2, 3, 4]
```
>forEach+isArray+push+recursivity
```javascript
// forEach 遍历数组会自动跳过空元素
const eachFlat = (arr = [], depth = 1) => {
  const result = []; // 缓存递归结果
  // 开始递归
  (function flat(arr, depth) {
    // forEach 会自动去除数组空位
    arr.forEach((item) => {
      // 控制递归深度
      if (Array.isArray(item) && depth > 0) {
        // 递归数组
        flat(item, depth - 1)
      } else {
        // 缓存元素
        result.push(item)
      }
    })
  })(arr, depth)
  // 返回递归结果
  return result;
} 

// for of 循环不能去除数组空位，需要手动去除
const forFlat = (arr = [], depth = 1) => {
  const result = [];
  (function flat(arr, depth) {
    for (let item of arr) {
      if (Array.isArray(item) && depth > 0) {
        flat(item, depth - 1)
      } else {
        // 去除空元素，添加非undefined元素
        item !== void 0 && result.push(item);
      }
    }
  })(arr, depth)
  return result;
}
```

# 大量插入DOM节点
`document.createDocumentFragment`
[MDN描述](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/createDocumentFragment)   
DocumentFragments 是DOM节点。它们不是主DOM树的一部分。通常的用例是创建文档片段，将元素附加到文档片段，然后将文档片段附加到DOM树。在DOM树中，文档片段被其所有的子元素所代替。

因为文档片段存在于内存中，并不在DOM树中，所以将子元素插入到文档片段时不会引起页面回流（对元素位置和几何上的计算）。因此，使用文档片段通常会带来更好的性能。
