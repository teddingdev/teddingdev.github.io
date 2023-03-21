---
title: 将数组值相同的索引分为一组 [group array index by value]
date: 2023-03-14 13:55:27
tags:
categories:
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
