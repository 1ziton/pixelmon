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
import { TableColumn, TableData, TableRow, TablePage } from '@pixelmon/pikachu/table';

@Component({
  selector: 'app-demo',
  template: `
    <p-table
      #table
      [data]="tableData"
      [(columns)]="columns"
      [showCheckbox]="true"
      [(selections)]="selections"
      [scroll]="{ y: '300px' }"
      [loading]="tableLoading"
      [title]="title"
      [fixedPagination]="true"
      (load)="load($event)"
    >
      <!-- 自定义title -->
      <ng-template #title>
        <div [hidden]="selections.length">
          <p-query-tabs [(tabs)]="columns" (queryChange)="onQueryChange($event)" (tabClose)="onTabClose($event)"></p-query-tabs>
        </div>
        <div [hidden]="!selections.length">
          已选 {{ selections.length }} 项
          <a (click)="selections = []" style="margin-right:8px">取消</a>
          <button nz-button nzType="primary">自定义操作1</button>
          <button nz-button nzType="primary">自定义操作2</button>
          <button nz-button nzType="primary">自定义操作3</button>
        </div>
      </ng-template>
    </p-table>
  `,
})
export class DemoComponent implements OnInit {
  tableData: TableData = {
    data: [],
    totalSize: 0,
  };
  queryParams = {};

  tableLoading = false;
  selections: TableRow[] = [];
  columns: TableColumn[] = [
    {
      title: 'id',
      field: 'id',
    },
    {
      title: '姓名',
      field: 'name',
      type: 'link',
    },
    {
      title: '性别',
      field: 'gender',
      showFilter: true,
      filterType: 'select',
      defaultValue: 'ALL',
      filterOptions: [
        { value: 'ALL', label: '全部' },
        { value: 'MALE', label: '男' },
        { value: 'FEMALE', label: '女' },
      ],
    },
    {
      title: '生日',
      field: 'birthday',
      showFilter: true,
      filterType: 'rangePicker',
    },
    {
      title: '邮箱',
      field: 'email',
      showSort: true,
      showFilter: true,
    },
    {
      title: '手机号',
      field: 'phone',
      showSort: true,
      showFilter: true,
    },
    {
      title: '图片',
      field: 'pictures',
      type: 'thumbnail',
    },
  ];

  constructor(private http: HttpClient) {}

  ngOnInit() {}

  load(pageParams: TablePage = { page: 1, size: 10 }) {
    console.log(pageParams);
    console.log(this.queryParams);
    this.tableLoading = true;

    const url = `/users?total=1000&size=${pageParams.size}`;
    this.http.get(url).subscribe(users => {
      this.tableData = users as TableData;
      this.selections = [];
      this.tableLoading = false;
    });
  }

  onQueryChange(queryParams) {
    this.queryParams = queryParams;
    window.setTimeout(() => this.load());
  }

  onTabClose(tab) {
    console.log(tab);
  }
}
```
