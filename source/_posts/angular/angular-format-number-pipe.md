---
title: Angular format number pipe
date: 2023-06-06 15:32:01
tags:
  - 前端
  - Angular
  - Pipe
categories:
  - 前端
  - Angular
  - Pipe
---

{{ title }}
<!-- more -->
Angular `pipe`，用来自定义格式化页面中的数字，通过配置 最多小数位数 和 最少小数位数，截取小数位或者在小数位尾部补`0`。
如：
3.133 -> 3.13
3.1 -> 3.10

```typescript
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatNumberPipe',
})
export class FormatNumberPipe implements PipeTransform {
  /**
   * 数字字符 格式化; 默认最少 2 位小数，最多 4 位小数，可配置
   * @description  数字字符 格式化
   * @param value: 输入值
   * @param minFractionDigits: 小数点后最小位数 默认 2
   * @param maxFractionDigits: 小数点后最大位数 默认 4
   */
  transform(value: string | number | undefined | null, minFractionDigits = 2, maxFractionDigits = 4): string {
    let originValue = value;
    if (!originValue && originValue !== 0) {
      originValue = '';
      return originValue;
    }
    if (typeof originValue === 'string' && isNaN(Number(originValue))) {
      return originValue;
    } else {
      originValue = Number(originValue);
    }

    const isInteger = originValue % 1 === 0; // 是否是整数
    // 整数
    if (isInteger) {
      return `${originValue.toFixed(minFractionDigits)}`;
    } else {
      // 浮点数
      const fractionDigits = String(originValue).split('.')[1];
      if (fractionDigits.length > maxFractionDigits) {
        return originValue.toFixed(maxFractionDigits); // 按 最大 小数 位数 保留
      }
      if (fractionDigits.length < minFractionDigits) {
        return originValue.toFixed(minFractionDigits); // 按 最小 小数 位数 保留
      }
      return `${value}`; // 返回原始值
    }
  }
}

```