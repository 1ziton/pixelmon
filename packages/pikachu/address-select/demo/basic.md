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
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'p-demo-address-select-basic',
  template: `
    <div>
      <p-address-select style="width: 320px;" [data]="data" [(ngModel)]="selectedValue" nzAllowClear  nzShowSearch nzPlaceHolder="选择政区地址"></p-address-select>
    </div>
  `
})
export class PDemoSelectBasicComponent  implements OnInit {
  selectedValue = 'lucy';
  data : any = [];
  
  constructor(private http: HttpClient) {
   
  }

  ngOnInit(): void {
    this.http.get(`/areas`).subscribe((result:any) => {
      this.data = result.map(item=>({
        label:item.name,
        value:item.code
      }))

    });
  }
}

```
