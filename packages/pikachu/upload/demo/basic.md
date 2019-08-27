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
    <p-upload [(ngModel)]="fileList" [maxLength]="5"> </p-upload>
  `,
})
export class DemoComponent implements OnInit {
  fileList = [
    {
      name: 'xxx.png',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      name: 'yyy.png',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
  ];

  constructor() {}

  ngOnInit() {}
}
```
