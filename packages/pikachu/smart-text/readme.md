---
type: Business
title: smart-text
subtitle: 智能显示文本
cols: 1
module: SmartTextModule
---

根据文本长度智能显示文本。

## API

### notice-icon

| 参数          | 说明                     | 类型     | 默认值 |
| ------------- | ------------------------ | -------- | ------ |
| `[text]`      | 要显示的文本             | `string` | -      |
| `[maxLength]` | 直接显示的最大长度       | `number` | `20`   |
| `[tail]`      | 超过最大长度时拼接的尾部 | `string` | `...`  |
