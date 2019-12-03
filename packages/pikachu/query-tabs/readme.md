---
type: Business
title: query-tabs
subtitle: 查询条件展示
cols: 1
module: QueryTabsModule
---

显示当前查询条件，基于 [NzTabs](https://ng.ant.design/components/tabs/zh) 封装。

## API

### p-query-tabs

| 参数            | 说明                                  | 类型                              | 默认值       |
| --------------- | ------------------------------------- | --------------------------------- | ------------ |
| `[tabs]`        | 数据列的属性，建议双向绑定            | `QueryTab[]`                      | `[]`         |
| `[lexicon]`     | 词典，用于转换枚举                    | `{ value: any; label: string }[]` | `[]`         |
| `[filterRule]`  | 过滤规则，返回 false 隐藏某一些查询值 | `(column:QueryTab)=>boolean`      | `filterRule` |
| `(queryChange)` | 查询值改变事件，绑定用于查询          | `EventEmitter<object>`            | -            |
| `(tabClose)`    | 关闭 tab 事件                         | `EventEmitter<QueryTab>`          | -            |

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

### filterRule

```typescript
  @Input() filterRule: (tab: QueryTab) => boolean = tab => {
    const searchValue = tab.searchValue;

    // 有默认值且搜索值和默认值相等
    if (tab.hasOwnProperty('defaultValue') && searchValue === tab.defaultValue) {
      return false;
    }
    // 非法基础数据类型
    if ([undefined, null, ''].includes(searchValue)) {
      return false;
    }
    // 空数组
    if (Array.isArray(searchValue) && !searchValue.length) {
      return false;
    }
    // 通过校验，返回true
    return true;
  };
```

## 注意

1. 优先展示 displayValue，无 displayValue 时展示 searchValue，可用于展示 searchValue 的格式化，例如 Date 类型
2. 当 searchValue 和 defaultValue 全等时默认是不会展示，可用于特殊的默认值，比如下拉列表的枚举 ALL（全部）
