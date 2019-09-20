---
type: Business
title: table
subtitle: 表格组件
cols: 1
order: 1
module: TableModule
---

表格数据展示，基于 [NzTable](https://ng.ant.design/components/table/zh) 封装。

## API

### p-table

| 参数                 | 说明                                                                               | 类型                                                                | 默认值                       |
| -------------------- | ---------------------------------------------------------------------------------- | ------------------------------------------------------------------- | ---------------------------- |
| `[data]`             | 表格数据                                                                           | `object`                                                            | `{ data: [], totalSize: 0 }` |
| `[frontPagination]`  | 是否在前端对数据进行分页                                                           | `boolean`                                                           | `false`                      |
| `[fixedPagination]`  | 是否固定分页在页面底部，直接固定在页面底部                                         | `boolean`                                                           | `false`                      |
| `[paginationOffset]` | 固定分页器的偏移量，固定分页器的偏移量，用于不固定在页面底部而与页面底部有小许边距 | `number`                                                            | `0`                          |
| `[pageIndex]`        | 当前页码，可双向绑定                                                               | `number`                                                            | -                            |
| `[pageSize]`         | 每页展示多少数据，可双向绑定                                                       | `number`                                                            | -                            |
| `[showPagination]`   | 是否显示分页器                                                                     | `boolean`                                                           | `true`                       |
| `[size]`             | 表格大小                                                                           | `'middle'｜'small'｜'default'`                                      | `'default'`                  |
| `[paginationSize]`   | 分页大小                                                                           | `'default' | 'small'`                                               | `'default'`                  |
| `[loading]`          | 页面是否加载中                                                                     | `boolean`                                                           | `false`                      |
| `[scroll]`           | 横向或纵向支持滚动，也可用于指定滚动区域的宽高度                                   | `object`                                                            | -                            |
| `[title]`            | 表格标题                                                                           | `string｜TemplateRef<void>`                                         | -                            |
| `[pageSizeOptions]`  | 页数选择器可选值                                                                   | `number[]`                                                          | `[10, 30, 50, 100]`          |
| `[showSizeChanger]`  | 是否显示条数切换器                                                                 | `boolean`                                                           | `true`                       |
| `[showQuickJumper]`  | 是否显示快速跳转器                                                                 | `boolean`                                                           | `true`                       |
| `[selections]`       | 当前选中数据,可双向绑定                                                            | `any[]`                                                             | `[]`                         |
| `[columns]`          | 数据列的属性，建议双向绑定                                                         | `TableColumn[]`                                                     | `[]`                         |
| `(load)`             | 加载数据事件                                                                       | `EventEmitter<[PageParams, { [key: string]: any }?]>`               | -                            |
| `(sort)`             | 排序事件                                                                           | `EventEmitter<{ key: string; value: 'descend' | 'ascend' | null }>` | -                            |
| `(linkClick)`        | 链接点击事件                                                                       | `EventEmitter<{ field: string; rowData: any }>`                     | -                            |

### TableColumn

基本属性

| 属性         | 说明                                                                   | 类型                   | 是否必填 |
| ------------ | ---------------------------------------------------------------------- | ---------------------- | -------- |
| `title`      | th 标签中显示的数据列名称                                              | `string`               | `true`   |
| `field`      | 数据列对应的域                                                         | `string`               | `true`   |
| `width`      | 列宽度                                                                 | `string`               | `false`  |
| `left`       | 左侧距离，用于固定左侧列                                               | `string`               | `false`  |
| `right`      | 右侧距离，用于固定左侧列                                               | `string`               | `false`  |
| `type`       | 数据列类型，link 表示链接，配套使用 linkClick 事件；thumbnail 表示图片 | `'link' | 'thumbnail'` | `false`  |
| `customCell` | 自定义单元格,可以使用 p-advancedCell 标签简单定义                      | `TemplateRef<any>`     | `false`  |

排序属性

| 属性         | 说明                                            | 类型                          | 是否必填 |
| ------------ | ----------------------------------------------- | ----------------------------- | -------- |
| `showSort`   | 是否显示排序                                    | `boolean`                     | `false`  |
| `sortValue`  | 排序状态                                        | `'descend' | 'ascend' | null` | `false`  |
| `customSort` | 是否自定义排序,配套使用 sort 事件自定义排序动作 | `boolean`                     | `false`  |

过滤属性

| 属性             | 说明                                                    | 类型                              | 是否必填 |
| ---------------- | ------------------------------------------------------- | --------------------------------- | -------- |
| `showFilter`     | 是否显示过滤                                            | `boolean`                         | `false`  |
| `filterType`     | 搜索组件类型                                            | `'select'|'rangePicker'|'input'`  | `false`  |
| `filterOptions`  | 下拉搜索组件选项,配合 filterType 传入 select 时传入选项 | `{label:string,value:any}[]`      | `false`  |
| `filterWidth`    | 下拉搜索宽度                                            | `string`                          | `false`  |
| `filterMultiple` | 是否多选                                                | `boolean`                         | `false`  |
| `customFilter`   | 自定义搜索组件,可以使用 p-advancedFilter 标签简单定义   | `TemplateRef<any>`                | `false`  |
| `searchValue`    | 搜索值,详见 queryTabs 组件                              | `any`                             | `false`  |
| `defaultValue`   | 默认值,详见 queryTabs 组件                              | `any`                             | `false`  |
| `displayValue`   | 展示值,详见 queryTabs 组件                              | `any`                             | `false`  |
| `lexicon`        | 词典,详见 queryTabs 组件                                | `{ value: any; label: string }[]` | `false`  |

### 优化：

- OnPush √
- load 防抖 √
- 懒加载图片(viewer) √

## 注意

- p-table 采用`OnPush`策略，按照 [Angular 的设计](https://angular.io/guide/lifecycle-hooks#onchanges)，当需要对数据进行增删时需要使用以下操作，使用 `push` 或者 `splice` 不会生效

```typescript
// 增加数据
this.tableData.data = [
  ...this.tableData.data,
  {
    key: `${this.i}`,
    name: `Edward King ${this.i}`,
    age: '32',
    address: `London, Park Lane no. ${this.i}`,
  },
]; // 传入nz-table
this.tableData = { ...this.tableData }; // 传入p-table

// 删除数据
this.tableData.data = this.tableData.data.filter(d => d.key !== i); // 传入nz-table
this.tableData = { ...this.tableData }; // 传入p-table
```

- 图片预览依赖了 viewer.js，请自行安装依赖:[viewer.js](https://github.com/fengyuanchen/viewerjs)。

```html
<!-- index.html -->

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/viewerjs/1.3.6/viewer.min.css" />
<script src="https://cdnjs.cloudflare.com/ajax/libs/viewerjs/1.3.6/viewer.min.js" type="text/javascript"></script>
```

- 因为固定分页只会在初始化时动态计算，请保证初始化后页面高度不会抖动。

```typescript
// table.component.ts

const windowHeight = document.documentElement.clientHeight;
const tableBody = this._elementRef.nativeElement.querySelector('.ant-table-body');
const pagination = this._elementRef.nativeElement.querySelector('.ant-pagination');
const tableBodyTop = tableBody.getBoundingClientRect().top;
const scrollHeight = windowHeight - tableBodyTop - pagination.clientHeight + 'px';
// 设scroll 实际上是设了max-height
this.scroll = { ...this.scroll, y: scrollHeight };
// 设height
this._renderer2.setStyle(tableBody, 'height', scrollHeight);
```
