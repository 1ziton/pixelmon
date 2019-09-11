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
  selector: 'p-demo-address-select-basic',
  template: `
    <div>
      <p-address-select style="width: 320px;"  [(ngModel)]="selectedValue" nzAllowClear  nzShowSearch nzPlaceHolder="选择政区地址"></p-address-select>
    </div>
  `
})
export class PDemoSelectBasicComponent  implements OnInit {
  selectedValue = '150000000000';

  ngOnInit(): void {
  }
}

```
