---
type: Business
title: input-plus
subtitle: 批量输入
cols: 1
module: InputPlusModule
---

使用 textarea 辅助进行批量输入，输入更方便，界面更美观。基于 [NzInput](https://ng.ant.design/components/input/zh) 封装。

## API

### input-plus

| 参数            | 说明               | 类型     | 默认值       |
| --------------- | ------------------ | -------- | ------------ |
| `[ngModel]`     | 输入值，可双向绑定 | `string` | -            |
| `[title]`       | 标题               | `string` | `'批量添加'` |
| `[placeholder]` | 占位符             | `string` | -            |

## 注意

双向绑定的是 input 输入框的值，textarea 输入框输入的值会自动转化为 input 输入框的值并输出
