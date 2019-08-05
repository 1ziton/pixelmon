---
type: Business
title: query-display
subtitle: 查询条件
cols: 1
module: QueryDisplayModule
---

API:

| 参数 | 说明 | 类型 | 默认值 |
| `[columns]` | 数据列的属性，建议双向绑定,详细看 advanced-table 的 readme 的过滤属性 | `Column[]` | `[]` |
| `[lexicon]` | 词典，用于转换枚举 | `{ value: any; label: string }[]` | `[]` |
| `(queryChange)` | 查询值改变事件，绑定用于查询 | `EventEmitter<object>` | - |
| `(close)` | 关闭查询值事件 | `EventEmitter<Column>` | - |
