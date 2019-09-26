---
order: 2
title:
  en-US: simple
  zh-CN: 简单
  bg: f2f4f5
---

简单表格。

```ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TableColumn, TableData, TableRow, TablePage } from '@pixelmon/pikachu/table';

@Component({
  selector: 'app-basic',
  template: `
    <p-table
      #table
      [data]="tableData"
      [(columns)]="columns"
      [showCheckbox]="true"
      [(selections)]="selections"
      [scroll]="{ y: '300px' }"
      [loading]="tableLoading"
      (load)="load($event)"
    >
    </p-table>
  `,
})
export class BasicComponent implements OnInit {
  tableData: TableData = {
    data: [],
    totalSize: 0,
  };
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
      filterOptions: [{ value: 'all', label: '全部' }, { value: 'male', label: '男' }, { value: 'female', label: '女' }],
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
    this.tableLoading = true;

    const url = `/users?total=1000&size=${pageParams.size}`;
    this.http.get(url).subscribe(users => {
      this.tableData = users as TableData;
      this.selections = [];
      this.tableLoading = false;
    });
  }
}
```
