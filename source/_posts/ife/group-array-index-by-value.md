---
title: 将数组值相同的索引分为一组 [Group array index by value]
date: 2023-03-14 13:55:27
tags:
    - 前端
categories:
    - 前端
---

### {{ title }}
<!-- more -->

```javascript
["aa", "er", "ewr", "er", "as", "asfad", "asfad", "vvv", "aa"].reduce(
  (accumulator, seed, index) => {
    accumulator[seed] = (accumulator[seed] || []).concat(index);
    return accumulator;
  },
  {}
);
```
