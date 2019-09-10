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
  selector: 'p-demo-dropdown-panel-basic',
  template: `
    <div>
      <p-dropdown-panel style="width: 320px;" [data]="data" [(ngModel)]="selectedValue" placeHolder="选择政区地址"></p-dropdown-panel>
      <span style="margin-left:30px">
        值：{{selectedValue}}
      </span>
    </div>
  `
})
export class PDemoDropdownSelectBasicComponent  implements OnInit {
  selectedValue = '';
  data : any = [];
  
  constructor(private http: HttpClient) {
   
  }

  ngOnInit(): void {
    this.http.get(`/users?field=list&size=30`).subscribe((result:any) => {
      this.data = result.map(item=>({
        label:item.name,
        value:item.id
      }))
    });
  }
}

```
