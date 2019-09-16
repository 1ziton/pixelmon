---
title: 校验
type: Type
---

## API

| 表单校验器 | 内置方法名     | 说明                                         | 其他                 |
| ---------- | -------------- | -------------------------------------------- | -------------------- |
| num        | `isNum`        | 是否为数字                                   | -                    |
| int        | `isInt`        | 是否为整数                                   | -                    |
| decimal    | `isDecimal`    | 是否为小数                                   | -                    |
| idCard     | `isIdCard`     | 是否为身份证                                 | -                    |
| mobile     | `isMobile`     | 是否为手机号                                 | -                    |
| telPhone   | `isTelPhone`   | 是否为手机号/座机/或有特殊符号分隔的电话号码 | phone/tel/multFormat |
| url        | `isUrl`        | 是否 URL 地址                                | -                    |
| base64     | `isBase64`     | 是否 base64 编码                             | -                    |
| creditCard | `isCreditCard` | 是否银行卡                                   | -                    |
| email      | `isEmail`      | 是否邮箱                                     | -                    |
| uuid       | `isUUID`       | 是否 uuid                                    | -                    |
| equal      | -              | 是否全等                                     | -                    |
| gt         | -              | 是否大于某个数                               | -                    |
| gte        | -              | 是否大于等于某个数                           | -                    |
| lt         | -              | 是否小于某个数                               | -                    |
| lte        | -              | 是否小于等于某个数                           | -                    |
| range      | -              | 是否在指定区间内                             | -                    |

每一个验证型都包括着用于表单验证器：

```ts
this.valForm = fb.group({
  // 手机号
  mobile: [null, Validators.compose([Validators.required, _Validators.mobile])],
});
```

```ts
this.valForm = fb.group({
  // 是否大于某个数
  count: [null, Validators.compose([Validators.required, _Validators.equal(10)])],
});
```

### 优化

- 给表单组件添加指令校验

```html
<input [(ngModel)]="value" [gt]="3" />
```
