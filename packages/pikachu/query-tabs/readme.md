---
type: Business
title: query-tabs
subtitle: 查询条件展示
cols: 1
module: QueryDisplayModule
---

显示当前查询条件。

## API

### p-queryTabs

| 参数            | 说明                                                                  | 类型                              | 默认值     |
| --------------- | --------------------------------------------------------------------- | --------------------------------- | ---------- |
| `[columns]`     | 数据列的属性，建议双向绑定,详细看 advanced-table 的 readme 的过滤属性 | `QueryTab[]`                      | `[]`       |
| `[lexicon]`     | 词典，用于转换枚举                                                    | `{ value: any; label: string }[]` | `[]`       |
| `[filterRule]`  | 过滤规则，返回 false 隐藏某一些查询值                                 | `(column:QueryTab)=>boolean`      | `详见源码` |
| `(queryChange)` | 查询值改变事件，绑定用于查询                                          | `EventEmitter<object>`            | -          |
| `(close)`       | 关闭查询值事件                                                        | `EventEmitter<QueryTab>`          | -          |

### QueryTab

| 参数             | 说明               | 类型                              | 是否必填 |
| ---------------- | ------------------ | --------------------------------- | -------- |
| `[title]`        | 标题               | `string`                          | `true`   |
| `[field]`        | 域                 | `string`                          | `true`   |
| `[showFilter]`   | 是否显示           | `boolean`                         | `false`  |
| `[lexicon]`      | 词典，用于转换枚举 | `{ value: any; label: string }[]` | `false`  |
| `[displayValue]` | 展示值             | `any`                             | `false`  |
| `[defaultValue]` | 默认值             | `any`                             | `false`  |
| `[searchValue]`  | 搜索值             | `any`                             | `false`  |
