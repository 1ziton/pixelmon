---
order: 4
title:
  zh-CN: 搜索
  bg: f2f4f5
---

支持搜索过滤，仅限于当前级别的筛选

```ts
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'p-demo-address-select-separator',
  template: `
    <p-address-select style="width: 320px;" [(ngModel)]="selectedValue" separator="-" nzPlaceHolder="选择政区地址" showSearch></p-address-select>
     <span style="margin-left:30px">
        值：{{selectedValue}}
    </span>
  `
})
export class PDemoSelectSeparatorComponent  implements OnInit {
  selectedValue = '';

  ngOnInit(): void {
  }
}

```
