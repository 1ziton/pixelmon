---
order: 1
title:
  en-US: Standard
  zh-CN: 标准
bg: f2f4f5
---

标准用法。

```ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AdvancedTableColumn } from '@pixelmon/pikachu/advanced-table';

@Component({
  selector: 'app-demo',
  template: `
    <p-advancedTable
      #table
      [data]="tableData"
      [(columns)]="columns"
      [showCheckbox]="true"
      [(selections)]="selections"
      [scroll]="{ y: '300px' }"
      [loading]="tableLoading"
      [titleTemplate]="titleTemplate"
      [fixedPagination]="false"
      (load)="load($event)"
      (sort)="sort($event)"
    >
      <!-- 自定义单元格 -->
      <p-advancedCell field="email">
        <ng-template let-data>
          <a>{{ data.email }}</a>
        </ng-template>
      </p-advancedCell>
      <!-- 自定义搜索组件 -->
      <p-advancedFilter field="name">
        <ng-template let-column>
          <nz-tree-select style="width: 250px" [nzNodes]="nodes" nzPlaceHolder="请选择" [(ngModel)]="column.searchValue"> </nz-tree-select>
        </ng-template>
      </p-advancedFilter>

      <!-- 自定义title -->
      <ng-template #titleTemplate>
        <div class="content-header" [hidden]="selections.length">
          <div class="content-title">列表</div>
          <div class="content-query">
            <p-queryTabs [(tabs)]="columns" (queryChange)="onQueryChange($event)"></p-queryTabs>
          </div>
        </div>
        <div class="content-header" [hidden]="!selections.length">
          <div class="selection-box">
            已选 <span class="color-theme">{{ selections.length }}</span> 项
            <a *ngIf="selections.length" class="margin-left-16" (click)="selections = []">取消</a>
          </div>
          <div class="operation-box">
            <button nz-button nzType="primary">自定义操作1</button>
            <button nz-button nzType="primary">自定义操作2</button>
            <button nz-button nzType="primary">自定义操作3</button>
          </div>
        </div>
      </ng-template>
    </p-advancedTable>
  `,
})
export class DemoComponent implements OnInit {

  tableData:any = {
    data: [],
    totalSize: 0,
  };

  tableLoading = false;
  selections: any[] = [];
  columns: AdvancedTableColumn[] = [
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
      filterOptions: [{ value: 'all', label: '全部' }, { value: 'male', label: '男'}, { value: 'female', label: '女' }],
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
      showSort: true,
      customSort: true,
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

  constructor(private http:HttpClient) {}

  ngOnInit() {}

  load(params) {
     console.log(params);
    const url = `/users?total=100`;
    this.tableLoading = true;
    setTimeout(() => {
      this.http.get(url).subscribe((users)=>{
        this.tableData = {
          ...users
        };
      })
      this.tableLoading = false;
    }, 1000);
  }

  onQueryChange(params) {
    console.log(params);
  }

  sort(sort: { field: string; sortValue: 'descend' | 'ascend' | null }) {
    console.log(sort);
  }
}
```
