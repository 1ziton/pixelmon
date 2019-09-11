---
type: Basic
subtitle: 分页
title: pagination
cols: 1
order: 2
module: PaginationModule
---

因为 [NzPagination](https://ng.ant.design/components/pagination/zh) 无数据时不显示分页，故拷贝了一份代码，复写成无数据时也显示分页。

## API

### p-pagination

| 参数                   | 说明                                                       | 类型                                                                   | 默认值             |
| ---------------------- | ---------------------------------------------------------- | ---------------------------------------------------------------------- | ------------------ |
| `[nzTotal]`            | 数据总数                                                   | `number`                                                               | -                  |
| `[nzPageIndex]`        | 当前页数，可双向绑定                                       | `number`                                                               | `1`                |
| `[nzPageSize]`         | 每页条数 ，可双向绑定                                      | `number`                                                               | `10`               |
| `[nzDisabled]`         | 是否禁用                                                   | `boolean`                                                              | `false`            |
| `[nzShowQuickJumper]`  | 是否可以快速跳转至某页                                     | `boolean`                                                              | `false`            |
| `[nzShowSizeChanger]`  | 是否可以改变 `nzPageSize`                                  | `boolean`                                                              | `false`            |
| `[nzSimple]`           | 当添加该属性时，显示为简单分页                             | `boolean`                                                              | -                  |
| `[nzSize]`             | 当为「small」时，是小尺寸分页                              | `'small'`                                                              | `'default'`        |
| `[nzPageSizeOptions]`  | 指定每页可以显示多少条                                     | `number[]`                                                             | `[10, 20, 30, 40]` |
| `[nzItemRender]`       | 用于自定义页码的结构                                       | `TemplateRef<{ $implicit: 'page' \| 'prev' \| 'next', page: number }>` | -                  |
| `[nzShowTotal]`        | 用于显示数据总量和当前数据范围，具体使用方式见代码演示部分 | `TemplateRef<{ $implicit: number, range: [ number, number ] }>`        | -                  |
| `[nzHideOnSinglePage]` | 只有一页时是否隐藏分页器                                   | `boolean`                                                              | `false`            |
| `(nzPageIndexChange)`  | 页码改变的回调                                             | `EventEmitter<number>`                                                 | -                  |
| `(nzPageSizeChange)`   | 每页条数改变的回调                                         | `EventEmitter<number>`                                                 | -                  |
