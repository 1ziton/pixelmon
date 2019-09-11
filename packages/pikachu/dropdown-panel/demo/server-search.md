---
order: 5
title:
  zh-CN: 服务端搜索过滤
---

## zh-CN

支持搜索过滤（服务端搜索），输入 `male` 或 `female` 试一试


```ts
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'p-demo-dropdown-panel-server-search',
  template: `
    <p-dropdown-panel
      style="width: 320px;"
      [loading]="isLoading"
      [data]="optionList"
      [(ngModel)]="selectedValue"
      showSearch
      serverSearch
      (onSearch)="loadMore($event)"
      placeHolder="请选择"
    ></p-dropdown-panel>
    <span style="margin-left:30px"> 值：{{ selectedValue }} </span>
  `,
})
export class PDemoDropdownSelectServerSearchComponent implements OnInit {
  backendUrl = 'https://api.randomuser.me/?results=30&gender=male';
  optionList: string[] = [];
  selectedValue = null;
  isLoading = false;

  getSugList(key?: string): Observable<string[]> {
    let url = this.backendUrl;
    if(key){
      url += `&gender=${key}`;
    }
    return this.http
      .get(url)
      .pipe(map((res: any) => res.results))
      .pipe(
        map((list: any) => {
          return list.map((item: any) => ({
            label:`${item.name.first}`,
            value:`${item.id.value || item.id.name}`,
          }));
        })
      );
  }

  loadMore(value?: string): void {
    this.isLoading = true;
    this.getSugList(value).subscribe(data => {
      this.isLoading = false;
      this.optionList = [...data];
    });
  }

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadMore();
  }
}

```