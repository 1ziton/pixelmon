### 基本功能：

- 单元格属性
  |- left 左侧距离，用于固定左侧列
  |- right 右侧距离，用于固定右侧列
  |- type: 'thumbnail':图片,'link':链接，配套使用 linkClick
- 文本超出最大长度显示省略号（自定义最大长度）
  |- smart-text 组件代理
- 表头搜索 √
  |- 控件枚举：input、select...
  |- 控件属性：mode、options...
- 排序
- 自定义单元格 √
  |- 使用 advanced-cell
  |- 知识点：ng-content @ContentChildren
- 复选框 √
  |- 组件内部收集 isChecked 的 row 作为 selections
- 可选分页固定底部 √
  |- 使用分页组件，不使用表格自带分页：自带分页数据为 0 时无法显示

### 优化：

- OnPush √
- load 防抖 √
- 懒加载图片(viewer) √

# API

### advanced-table

| 参数 | 说明 | 类型 | 默认值 |
| `[data]` | 表格数据 | `object` | `{ content: [], totalElements: 0 }` |
| `[frontPagination]` | 是否在前端对数据进行分页，如果在服务器分页数据或者需要在前端显示全部数据时传入 false | `boolean` | `false` |
| `[pageIndex]` | 当前页码，可双向绑定 | `number` | - |
| `[pageSize]` | 每页展示多少数据，可双向绑定 | `number` | - |
| `[showPagination]` | 是否显示分页器 | `boolean` | `true` |
| `[size]` | 正常或迷你类型 | `'middle'｜'small'｜'default'` | `'default'` |
| `[loading]` | 页面是否加载中 | `boolean` | `false` |
| `[scroll]` | 横向或纵向支持滚动，也可用于指定滚动区域的宽高度 | `object` | - |
| `[title]` | 表格标题 | `string｜TemplateRef<void>` | - |
| `[pageSizeOptions]` | 页数选择器可选值 | `number[]` | `[10, 30, 50, 100]` |
| `[showSizeChanger]` | 是否可以改变 `nzPageSize` | `boolean` | `true` |
| `[selections]` | 当前选中数据,可双向绑定 | `any[]` | `[]` |
| `[columns]` | 数据列的属性，建议双向绑定 | `Column[]` | `[]` |
| `(load)` | 加载数据事件 | `EventEmitter<[PageParams, { [key: string]: any }?]>` | - |
| `(sort)` | 排序事件 | `EventEmitter<{ key: string; value: 'descend' | 'ascend' | null }>` | - |
| `(linkClick)` | 链接点击事件 | `EventEmitter<{ field: string; rowData: any }>` | - |

### column 对象详解

基本属性

| 属性 | 说明 | 类型 | 默认值 |
| `title` | Th 标签中显示的数据列名称 | `string` | - |
| `field` | 数据列对应的关键字 | `string` | - |
| `width` | 列宽度 | `string` | `120px` |
| `left` | 左侧距离，用于固定左侧列 | `string` | - |
| `right` | 右侧距离，用于固定左侧列 | `string` | - |
| `type` | 数据列类型，link 表示链接，配套使用 linkClick 事件；thumbnail 表示图片 | `'link' | 'thumbnail'` | - |
| `customCell` | 自定义单元格,可以使用 advanced-cell 组件简单定义 | `TemplateRef<any>` | - |

排序属性

| 属性 | 说明 | 类型 | 默认值 |
| `showSort` | 是否显示排序 | `boolean` | - |
| `sortValue` | 排序状态 | `'descend' | 'ascend' | null` | - |
| `customSort` | 是否自定义排序,配套使用 sort 事件自定义排序动作 | `boolean` | `false` |

过滤属性

| 属性 | 说明 | 类型 | 默认值 |
| `showFilter` | 是否显示过滤 | `boolean` | `false` |
| `filterType` | 搜索组件类型 | `'select'|'rangePicker'|'input'` | `'input'` |
| `filterOptions` | 下拉搜索组件选项,配合 filterType 传入 select 时传入选项 | `{label:string,value:any}[]` | `[]` |
| `filterWidth` | 下拉搜索宽度 | `string` | - |
| `filterMultiple` | 是否多选 | `boolean` | `false` |
| `customFilter` | 自定义搜索组件,可以使用 advanced-filter 组件简单定义 | `TemplateRef<any>` | - |
| `searchValue` | 搜索值,详见 query-display 组件 | `any` | - |
| `defaultValue` | 默认值,详见 query-display 组件 | `any` | - |
| `displayValue` | 展示值,详见 query-display 组件 | `any` | - |
| `lexicon` | 词典,详见 query-display 组件 | `{ value: any; label: string }[]` | `[]` |

## 注意

advanced-table 采用`OnPush`策略

按照 [Angular 的设计](https://angular.io/guide/lifecycle-hooks#onchanges)，当需要对数据进行增删时需要使用以下操作，使用 `push` 或者 `splice` 不会生效

```typescript
// 增加数据
this.tableData.content = [
  ...this.tableData.content,
  {
    key: `${this.i}`,
    name: `Edward King ${this.i}`,
    age: '32',
    address: `London, Park Lane no. ${this.i}`
  }
]; // 传入nz-table
this.tableData = { ...this.tableData }; // 传入advanced-table

// 删除数据
this.tableData.content = this.tableData.content.filter(d => d.key !== i); // 传入nz-table
this.tableData = { ...this.tableData }; // 传入advanced-table
```
