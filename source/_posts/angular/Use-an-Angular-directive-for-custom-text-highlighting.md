---
title: 使用 Angular 指令进行自定义文本高亮显示
date: 2024-04-03 17:44:08
tags:
  - 前端
  - Angular
  - Directive
categories:
  - 前端
  - Angular
  - Directive
---

{{ title }}

<!-- more -->
### 创建自定义指令
```typescript
import { Directive, Input, ElementRef, AfterViewInit } from "@angular/core";

@Directive({
  selector: "[appHighlight]",
})
export class HighlightDirective implements AfterViewInit {
  @Input() highlightText: string = "";
  @Input() highlightColor: string = "red";

  constructor(private element: ElementRef) {}

  ngAfterViewInit(): void {
    this.highlightAction();
  }

  private highlightAction() {
    const innerHTML = this.element.nativeElement.innerHTML;
    if (!this.highlightText || !innerHTML) {
      return;
    }
    const escapedHighlightText = this.escapeRegExp(this.highlightText);
    const regex = new RegExp(`${escapedHighlightText}`, "gi");
    const highlightedText = innerHTML.replace(
      regex,
      (match) => `<span style="color:${this.highlightColor}">${match}</span>`
    );
    this.element.nativeElement.innerHTML = highlightedText;
  }

  private escapeRegExp(text: string): string {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
  }
}
```
### 默认红色
```typescript
    <div appHighlight [highlightText]="高亮"> 使用 Angular 指令进行自定义文本高亮显示 </div>
```
### 使用自定义颜色
```typescript
    <div appHighlight [highlightText]="高亮" [highlightColor]="yellow"> 使用 Angular 指令进行自定义文本高亮显示 </div>
    <div appHighlight [highlightText]="高亮" [highlightColor]="#000"> 使用 Angular 指令进行自定义文本高亮显示 </div>
```