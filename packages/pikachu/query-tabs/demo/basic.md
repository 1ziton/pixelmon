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
      [title]="title"
      [fixedPagination]="true"
      (load)="load($event)"
      (sort)="sort($event)"
    >
      <!-- 自定义单元格 -->
      <p-tableCell field="email">
        <ng-template let-data>
          <a>{{ data.email }}</a>
        </ng-template>
      </p-tableCell>
      <!-- 自定义搜索组件 -->
      <p-tableFilter field="name">
        <ng-template let-column>
          <nz-tree-select style="width: 250px" [nzNodes]="nodes" nzPlaceHolder="请选择" [(ngModel)]="column.searchValue"> </nz-tree-select>
        </ng-template>
      </p-tableFilter>

      <!-- 自定义title -->
      <ng-template #title>
        <div [hidden]="selections.length">
          <p-queryTabs [(tabs)]="columns" (queryChange)="onQueryChange($event)"></p-queryTabs>
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
export class BasicComponent implements OnInit {
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

  nodes = [
    {
      title: 'parent 1',
      key: '100',
      children: [
        {
          title: 'parent 1-0',
          key: '1001',
          children: [{ title: 'leaf 1-0-0', key: '10010', isLeaf: true }, { title: 'leaf 1-0-1', key: '10011', isLeaf: true }],
        },
        {
          title: 'parent 1-1',
          key: '1002',
          children: [{ title: 'leaf 1-1-0', key: '10020', isLeaf: true }],
        },
      ],
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

  sort(sort: { field: string; sortValue: 'descend' | 'ascend' | null }) {
    console.log(sort);
  }
}
```
