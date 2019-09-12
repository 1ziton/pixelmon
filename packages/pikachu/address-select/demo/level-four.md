---
order: 3
title:
  zh-CN: 四级地址
  bg: f2f4f5
---

省市县街道四级地址，自定义级别

```ts
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'p-demo-address-select-four',
  template: `
    <p-address-select style="width: 320px;" [level]="4" [(ngModel)]="selectedValue" nzPlaceHolder="选择政区地址"></p-address-select>
     <span style="margin-left:30px">
        值：{{selectedValue}}
    </span>
  `
})
export class PDemoSelectFourComponent  implements OnInit {
  selectedValue = "";
  ngOnInit(): void {
  }
}

```
