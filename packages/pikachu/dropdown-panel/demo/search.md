---
order: 4
title:
  zh-CN: 搜索过滤
---

## zh-CN

支持搜索过滤（前端搜索）


```ts
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'p-demo-dropdown-panel-search',
  template: `
   <p-dropdown-panel style="width: 320px;" [data]="optionList" [(ngModel)]="selectedValue" (ngModelChange)="modelChanged($event)" showSearch placeHolder="请选择"></p-dropdown-panel>
     <span style="margin-left:30px">
        值：{{selectedValue}}
    </span>
  `
})
export class PDemoDropdownSelectScrollLoadComponent implements OnInit {
  randomUserUrl = 'https://api.randomuser.me/?results=12';
  optionList: string[] = [];
  selectedValue = null;
  isLoading = false;
 
  getRandomNameList: Observable<string[]> = this.http
    .get(`${this.randomUserUrl}`)
    .pipe(map((res: any) => res.results))
    .pipe(
      map((list: any) => {
        return list.map((item: any) => ({
          label:`${item.name.first}`,
          value:`${item.id.value}`,
        }));
      })
    );

  loadMore(): void {
    this.isLoading = true;
    this.getRandomNameList.subscribe(data => {
      this.isLoading = false;
      this.optionList = [...this.optionList, ...data];
    });
  }

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadMore();
  }

  modelChanged($event){
    console.log($event)
  }
}

```