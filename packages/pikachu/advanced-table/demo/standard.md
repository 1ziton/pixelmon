---
order: 1
title:
  en-US: Standard
  zh-CN: 标准
bg: f2f4f5
---

标准表格。

```ts
import { Component, OnInit } from '@angular/core';
import { AdvancedTableColumn } from '@pixelmon/pikachu/advanced-table';

@Component({
  selector: 'app-demo',
  template: `
    <advanced-table
      #table
      [data]="tableData"
      [(columns)]="columns"
      [showCheckbox]="true"
      [(selections)]="selections"
      [scroll]="{y:'300px'}"
      [loading]="tableLoading"
      [titleTemplate]="titleTemplate"
      [fixedPagination]="false"
      (load)="load($event)"
      (sort)="sort($event)"
    >
      <!-- 自定义单元格 -->
      <advanced-cell field="field1">
        <ng-template let-data>
          <a>{{ data.field1 }}</a>
        </ng-template>
      </advanced-cell>
      <!-- 自定义搜索组件 -->
      <advanced-filter field="field2">
        <ng-template let-column>
          <nz-tree-select style="width: 250px" [nzNodes]="nodes" nzPlaceHolder="请选择" [(ngModel)]="column.searchValue"> </nz-tree-select>
        </ng-template>
      </advanced-filter>

      <!-- 自定义title -->
      <ng-template #titleTemplate>
        <div class="content-header" [hidden]="selections.length">
          <div class="content-title">列表</div>
          <div class="content-query">
            <query-display [(columns)]="columns" (queryChange)="onQueryChange($event)"></query-display>
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
    </advanced-table>
  `,
})
export class DemoComponent implements OnInit {
  imgUrls = [
    'https://images.pexels.com/photos/1054289/pexels-photo-1054289.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    'https://images.pexels.com/photos/1261728/pexels-photo-1261728.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    'https://images.pexels.com/photos/1308624/pexels-photo-1308624.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    'https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  ];

  tableData: { content: any[]; totalElements: number } = {
    content: [],
    totalElements: 0,
  };

  tableLoading = false;
  selections = [];
  columns: AdvancedTableColumn[] = [
    {
      title: 'title1',
      field: 'field1',
    },
    {
      title: 'title2',
      field: 'field2',
      type: 'link',
    },
    {
      title: 'title3',
      field: 'field3',
      showFilter: true,
      filterType: 'select',
      filterOptions: [{ value: 'value1', label: 'option1' }, { value: 'value2', label: 'option2' }, { value: 'value3', label: 'option3' }],
    },
    {
      title: 'title4',
      field: 'field4',
      showFilter: true,
      filterType: 'rangePicker',
    },
    {
      title: 'title5',
      field: 'field5',
      showSort: true,
      showFilter: true,
    },
    {
      title: 'title6',
      field: 'field6',
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

  constructor() {
    this.tableData = {
      content: [],
      totalElements: 0,
    };
    this.tableData.totalElements = 100;
    for (let index = 0; index < this.tableData.totalElements; index++) {
      const row = {};
      this.columns.forEach(element => {
        row[element.field] = `${element.field} ${index} aaaaaaaaaaaaaaaaaaaaaaaaaaaa`;
      });
      row['field6'] = [
        'https://cdn.pixabay.com/photo/2018/01/12/10/19/fantasy-3077928__340.jpg',
        'https://cdn.pixabay.com/photo/2016/10/18/21/22/california-1751455__340.jpg',
        'https://cdn.pixabay.com/photo/2018/08/21/23/29/fog-3622519__340.jpg',
        'https://cdn.pixabay.com/photo/2018/08/14/13/23/ocean-3605547__340.jpg',
      ];
      this.tableData.content.push(row);
    }
  }

  ngOnInit() {}

  load(params) {
    console.log(params);
    this.tableLoading = true;
    setTimeout(() => {
      this.tableData = {
        content: [],
        totalElements: 0,
      };
      this.tableData.totalElements = 100;
      for (let index = 0; index < this.tableData.totalElements; index++) {
        const row = {};
        this.columns.forEach(element => {
          row[element.field] = `${element.field} ${index} aaaaaaaaaaaaaaaaaaaaaaaaaaaa`;
        });
        row['field6'] = [
          'https://cdn.pixabay.com/photo/2018/01/12/10/19/fantasy-3077928.jpg',
          'https://cdn.pixabay.com/photo/2016/10/18/21/22/california-1751455.jpg',
          'https://cdn.pixabay.com/photo/2018/08/21/23/29/fog-3622519.jpg',
          'https://cdn.pixabay.com/photo/2018/08/14/13/23/ocean-3605547.jpg',
        ];
        this.tableData.content.push(row);
      }
      this.tableLoading = false;
    }, 2000);
  }

  onQueryChange(params) {
    console.log(params);
  }

  sort(sort: { field: string; sortValue: 'descend' | 'ascend' | null }) {
    console.log(sort);
  }
}
```
