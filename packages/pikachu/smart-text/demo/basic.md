---
order: 1
title:
  en-US: Basic
  zh-CN: 基础
  bg: f2f4f5
---

基础用法。

```ts
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-demo',
  template: `
    <p>
      <p-smart-text [text]="text1"></p-smart-text>
    </p>
    <p>
      <p-smart-text [text]="text2"></p-smart-text>
    </p>
    <p>
      <p-smart-text [text]="text2" tail="??"></p-smart-text>
    </p>
    <p>
      <p-smart-text [text]="text2" [maxLength]="10"></p-smart-text>
    </p>
    <p>
      <p-smart-text [text]="text3"></p-smart-text>
    </p>
    <p>
      <p-smart-text [text]="text4"></p-smart-text>
    </p>
    <p>
      <p-smart-text [text]="text5"></p-smart-text>
    </p>
  `,
})
export class DemoComponent implements OnInit {
  text1 = '我的愿望是世界和平！';
  text2 = '富强、民主、文明、和谐；自由、平等、公正、法治；爱国、敬业、诚信、友善。';
  text3 = '';
  text4 = null;
  text5 = undefined;

  ngOnInit() {
    setTimeout(() => {
      this.text3 = this.text2;
    }, 2000);
  }
}
```
