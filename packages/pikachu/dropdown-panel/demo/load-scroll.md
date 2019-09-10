---
order: 17
title:
  zh-CN: 下拉加载
---

## zh-CN

一个带有下拉加载远程数据的例子。



```ts
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'p-demo-select-scroll-load',
  template: `
   <p-dropdown-panel style="width: 320px;" [data]="optionList" [(ngModel)]="selectedValue" (scrollToBottom)="loadMore()"  showSearch placeHolder="请选择"></p-dropdown-panel>
    <span style="margin-left:30px">
        值：{{selectedValue}}
    </span>
  `
})
export class PDemoDropdownSelectScrollLoadComponent implements OnInit {
  randomUserUrl = 'https://api.randomuser.me/?results=30';
  optionList: string[] = [];
  selectedValue = null;
  isLoading = false;
  // tslint:disable:no-any
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
  // tslint:enable:no-any

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
}

```