---
order: 1
title:
  zh-CN: 间隔符
  bg: f2f4f5
---

基础用法。

```ts
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'p-demo-address-select-separator',
  template: `
    <p-address-select style="width: 320px;"  [(ngModel)]="selectedValue" separator="-" nzPlaceHolder="选择政区地址"></p-address-select>
     <span style="margin-left:30px">
        值：{{selectedValue}}
    </span>
  `
})
export class PDemoSelectSeparatorComponent  implements OnInit {
  selectedValue = '450503000000';

  ngOnInit(): void {
  }
}

```
