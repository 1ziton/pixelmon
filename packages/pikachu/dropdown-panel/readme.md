---
type: Basic
title: dropdown-panel
subtitle: 下拉选择面板
cols: 2
order: 4
module: DropDownPanelModule
---

下拉选择面板（暂不支持多选）

## API

### p-dropdown-panel

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `[ngModel]` | 双向绑定，当 `mode` 为 `multiple` 或 `tags` 时，ngModel 为数组 | `any | any[]` | - |
| `[compareWith]` | 与 [SelectControlValueAccessor](https://angular.io/api/forms/SelectControlValueAccessor#caveat-option-selection) 相同 | `(o1: any, o2: any) => boolean` | `(o1: any, o2: any) => o1===o2` |
| `[allowClear]` | 支持清除 | `boolean` | `true` |
| `[open]` | 下拉菜单是否打开，可双向绑定 | `boolean` | `false` |
| `[autoFocus]` | 默认获取焦点 | `boolean` | `false` |
| `[disabled]` | 是否禁用 | `boolean` | `false` |
| `[dropdownClassName]` | 下拉菜单的 className 属性 | `string` | - |
| `[dropdownMatchSelectWidth]` | 下拉菜单和选择器同宽 | `boolean` | `false` |
| `[dropdownStyle]` | 下拉菜单的 style 属性 | `object` | - |
<!-- | `[nzCustomTemplate]` | 自定义选择框的Template内容 | `TemplateRef<{ $implicit: NzOptionComponent }>` | - | -->
| `[serverSearch]` | 是否使用服务端搜索，当为 true 时，将不再在前端进行过滤 | `boolean` | `false` |
| `[filterOption]` | 是否根据输入项进行筛选。当其为一个函数时，会接收 `inputValue` `option` 两个参数，当 `option` 符合筛选条件时，应返回 `true`，反之则返回 `false`。 | `(input?: string, option?: POption) => boolean;` | - |
| `[maxMultipleCount]` | 最多选中多少个标签| `number` | `Infinity` |
| `[mode]` | 设置 p-dropdown-panel 的模式 | `'multiple' | 'tags' | 'default'` | `'default'` |
| `[notFoundContent]` | 当下拉列表为空时显示的内容 | `string | TemplateRef<void>` | - |
| `[placeHolder]` | 选择框默认文字 | `string` | - |
| `[showArrow]` | 是否显示下拉小箭头 | `boolean` | `true` |
| `[showSearch]` | 使单选模式可搜索 | `boolean` | `false` |
| `[size]` | 选择框大小 | `'large' | 'small' | 'default'` | `'default'` |
| `[suffixIcon]` | 自定义的选择框后缀图标 | `TemplateRef<void>` | - |
| `[removeIcon]` | 自定义的多选框清除图标 | `TemplateRef<void>` | - |
| `[clearIcon]` | 自定义的多选框清空图标 | `TemplateRef<void>` | - |
| `[loading]` | 加载中状态 | `boolean` | `false` |
| `(ngModelChange)` | 值发生变化时，调用此函数 | `EventEmitter<any[]>` | - |
| `(openChange)` | 下拉菜单打开状态变化回调 | `EventEmitter<boolean>` | - |
| `(scrollToBottom)` | 下拉列表滚动到底部的回调 | `EventEmitter<void>` | - |
| `(onSearch)` | 文本框值变化时回调 | `EventEmitter<string>` | - |
| `(pFocus)` | focus时回调 | `EventEmitter<void>` | - |
| `(pBlur)` | blur时回调 | `EventEmitter<void>` | - |


## 方法

### p-dropdown-panel

| 名称 | 说明 |
| --- | --- |
| blur() | 取消焦点 |
| focus() | 获取焦点 |

