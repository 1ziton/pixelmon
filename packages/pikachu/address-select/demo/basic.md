---
order: 1
title:
  en-US: Basic
  zh-CN: 基础
  bg: f2f4f5
---

基础用法，默认回显。

```ts
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'p-demo-address-select-basic',
  template: `
    <p-address-select style="width: 320px;"  [(ngModel)]="selectedValue" nzAllowClear  nzShowSearch nzPlaceHolder="选择政区地址"></p-address-select>
     <span style="margin-left:30px">
        值：{{selectedValue}}
    </span>
  `
})
export class PDemoSelectBasicComponent  implements OnInit {
  selectedValue = '450503000000';

  ngOnInit(): void {
  }
}

```
