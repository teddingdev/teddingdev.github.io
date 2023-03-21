---
title: 增加 AfterEffect 插件 FLow 的试用时间（理论上永久）
date: 2018-04-11 00:51:48
tags:
- Adobe
- After Effect
- 插件
- FLow
categories:
- Adobe
- AfterEffect
---
！！商业用途请支持正版！！  
！！有能力请支持开发者！！  
本文提供一个方法，在Flow插件试用到期之后可以继续试用(理论永久)。原因是 开发者 只是象征性的在插件试用到期之后，进行了隐藏。再次强调，有能力请支持正版[点击这里](https://aescripts.com/flow/)。

<!-- more -->
  ## 1、 插件修改
- 将flow.zxp更改扩展名为.zip并解压缩
- 使用vscode 或者其他编辑器 打开./Flow/js/flow.js
- 查找以下片段
```javascript
  function g(A, Q) {
    var B = document.createElement('iframe')
    ;(B.className = 'aesp ' + A),
      (B.src = 'data:text/html;charset=utf-8,' + encodeURI(Q))
    var I = B.style
    ;(I.position = 'absolute'),
      (I.left = '0px'),
      (I.top = '0px'),
      (I.right = '0px'),
      (I.bottom = '0px'),
      (I.width = '100%'),
      (I.height = '100%'),
      (I.backgroundColor = 'white'),
      (I.borderWidth = '0px'),
      (I.display = 'none'),
      document.body.appendChild(B)
    var i = B.contentWindow
    return (
      (i.onload = function() {
        for (var A = i._('[loc-key]'), Q = 0; Q < A.length; Q++) {
          var B = A[Q],
            E = F(B.getAttribute('loc-key'))
          B.innerText = E
        }
      }),
      B
    )
  }
```
增加 ``(I.display = 'none'),``
- 接着查找下面这一句
```javascript
(document.getElementById('app').style.display = 'none'),
```
将 ``none`` 改为 ``block``
```javascript
(document.getElementById('app').style.display = 'block'),
```
- 保存 

## 2、系统修改，开启 Adobe CEP debug 模式 
因为插件在打包发布的时候有代码签名，默认不执行修改过的文件，需要手动开启 ``debug`` 模式。(下面是adobe CEP 开发文档原文)  
- Win: regedit > HKEY_CURRENT_USER/Software/Adobe/CSXS.8, then add a new entry PlayerDebugMode of type "string" with the value of "1".
 - Mac: In the terminal, type: `defaults write com.adobe.CSXS.8 PlayerDebugMode 1` (The plist is also located at /Users/`<username>`/Library/Preferences/com.adobe.CSXS.8.plist)


These entries will enable debug extensions to be displayed in the host applications. Please note that, CSXS.8 is given with the assumption that, you are developing the extension for CEP 8. If you are developing extension for previous version of CEP, replace 8 with corresponding version number.


#### Special notes for Mac 10.9 and higher


Staring with Mac 10.9, Apple introduced a caching mechanism for plist files. Your modifications to plist files does not take effect until the cache gets updated (on a periodic basis, you cannot know exactly when the update will happen). To make sure your modifications take effect, there are two methods.


 - Kill **cfprefsd** process. It will restart automatically. Then the update
   takes effect.
 - Restart your Mac, or log out the current user and re-log in.
 - [More Information](http://hints.macworld.com/article.php?story=20130908042828630)