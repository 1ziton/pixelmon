---
order: 1
title:
  en-US: Standard
  zh-CN: 标准
bg: f2f4f5
---

标准使用。

```ts
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'components-smart-text-standard',
  template: `
    <p>
      <smart-text [text]="text1"></smart-text>
    </p>
    <p>
      <smart-text [text]="text2"></smart-text>
    </p>
    <p>
      <smart-text [text]="text2" tail="??"></smart-text>
    </p>
    <p>
      <smart-text [text]="text2" [maxLength]="10"></smart-text>
    </p>
    <p>
      <smart-text [text]="text3"></smart-text>
    </p>
  `,
})
export class ComponentsSmartTextStandardComponent implements OnInit {
  text1 = '我的愿望是世界和平！';
  text2 = '富强、民主、文明、和谐；自由、平等、公正、法治；爱国、敬业、诚信、友善。';
  text3 = '';
  ngOnInit() {
    setTimeout(() => {
      this.text3 = this.text2;
    }, 2000);
  }
}
```
