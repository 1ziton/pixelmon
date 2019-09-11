---
order: 17
title:
  zh-CN: 下拉加载
  en-US: Load Data on Scroll
---

## zh-CN

一个带有下拉加载远程数据的例子。

## en-US

Load data on scroll.


```ts
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'p-demo-select-scroll-load',
  template: `

   <p-address-select style="width: 320px;" [data]="optionList" [(ngModel)]="selectedUser" (nzScrollToBottom)="loadMore()" nzAllowClear nzShowSearch nzPlaceHolder="选择政区地址"></p-address-select>
  `
})
export class PDemoSelectScrollLoadComponent implements OnInit {
  randomUserUrl = 'https://api.randomuser.me/?results=10';
  optionList: string[] = [];
  selectedUser = null;
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
      console.log(this.optionList)
    });
  }

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadMore();
  }
}

```