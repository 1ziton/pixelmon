---
type: Business
title: smart-text
subtitle: 智能显示文本
cols: 1
module: SmartTextModule
---

根据文本长度智能显示文本。

## API

### smart-text

| 参数          | 说明                     | 类型     | 默认值 |
| ------------- | ------------------------ | -------- | ------ |
| `[text]`      | 要显示的文本             | `string` | -      |
| `[maxLength]` | 直接显示的最大长度       | `number` | `20`   |
| `[tail]`      | 超过最大长度时拼接的尾部 | `string` | `...`  |

## 注意

[text]的输入将会被强制转成 string

```typescript
  @Input() set text(value) {
    if (value === undefined || value === null) {
      this._text = '';
    } else {
      this._text = String(value);
    }
  }
```
