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
      <p-dropdown-panel style="width: 320px;" size="small" [data]="data" [(ngModel)]="selectedValue" placeHolder="小"></p-dropdown-panel>
    </div>
    <div style="margin-top:15px">
      <p-dropdown-panel style="width: 320px;" [data]="data" [(ngModel)]="selectedValue" placeHolder="中（默认）" [disabled]="true"></p-dropdown-panel>
    </div>
    <div style="margin-top:15px">
      <p-dropdown-panel style="width: 320px;" size="large" [data]="data" [open]="true" [(ngModel)]="selectedValue" placeHolder="大" (openChange)="openChanged($event)"></p-dropdown-panel>
    </div>
  `
})
export class PDemoDropdownSelectBasicComponent  implements OnInit {
  selectedValue = '';
  data : any = [];
  
  constructor(private http: HttpClient) {
   
  }

  ngOnInit(): void {
    this.http.get(`/users?field=list&size=15`).subscribe((result:any) => {
      this.data = result.map(item=>({
        label:item.name,
        value:item.id
      }))
    });
  }

  openChanged($event){
    console.log($event)
  }
}

```
