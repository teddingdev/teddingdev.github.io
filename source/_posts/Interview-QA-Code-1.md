---
title: Interview-QS-Code-1
date: 2020-04-23 03:09:33
tags:
- 前端
- 面试
- 代码阅读
categories:
- 前端
- 面试
---

前端面试 笔试题 代码阅读 1
<!--more-->

# Q:下面这段代码输出什么？
```javascript
var a = 1;
var obj = {
  a: 2,
  func1: () => {
    return this.a;
  },
  func2: function () {
    return this.a
  }
}

var obj2 = {
  a: 3
}
console.log(obj.func1())
console.log(obj.func2())
console.log(obj.func2.apply(obj2))
var newFunc = obj.func2
console.log(newFunc())
```
A: `1,2,3,1`

# Q:下面这段代码输出什么？
```javascript
for (var i = 0; i < 5; i++) {
  setTimeout(function () {
    console.log(i)
  }, 1000 * i)
}
```
A: `5,5,5,5,5` 看起来像每隔一秒输出一次（实际统计不到5s）

# Q:下面这段代码输出什么？
```javascript
for (let i = 0; i < 5; i++) {
  setTimeout(function () {
    console.log(i)
  }, 1000 * i)
}
```

A:`0,1,2,3,4` 看起来像每隔一秒输出一次（实际统计不到5s）


# Q:下面这段代码输出什么？
```javascript
for (let i = 0; i < 5; i++) {
  (function (i) {
    setTimeout(function () {
      console.log(i)
    }, 1000 * i)
  })(i)
}
```
A:`0,1,2,3,4`   
因为闭包，所以输出12345，看起来像每隔一秒输出一次（实际统计不到5s）

# Q:下面这段代码输出什么？
```javascript
var bb = 1
function aa(bb) {
  console.log(bb)
  bb = 2;
  console.log(bb)
}
aa(bb)
console.log(bb)
```
A:`1,2,1` 函数有自己的作用域   
