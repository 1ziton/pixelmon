---
title: Validate
type: Type
---

## API

| FormValidator | Method         | Description                  | other                |
| ------------- | -------------- | ---------------------------- | -------------------- |
| num           | `isNum`        | Whether number               |
| int           | `isInt`        | Whether integer              |
| decimal       | `isDecimal`    | Whether decimal              |
| idCard        | `isIdCard`     | Whether IDCard(Chinese User) |
| mobile        | `isMobile`     | Whether mobile(Chinese User) |
| telPhone      | `isTelPhone`   | Whether phone/tel/multFormat | phone/tel/multFormat |
| url           | `isUrl`        | Whether URL Address          |
| base64        | `isBase64`     | Whether base64 encoding      |
| creditCard    | `isCreditCard` | Whether creditCard           |
| email         | `isEmail`      | Whether email                |
| uuid          | `isUUID`       | Whether uuid                 |
| equal         | -              | Whether equal                |
| gt            | -              | Whether gt                   |
| gte           | -              | Whether gte                  |
| lt            | -              | Whether lt                   |
| lte           | -              | Whether lte                  |
| range         | -              | Whether range                |

Every method has a corresponding form validation:

```ts
this.valForm = fb.group({
  // is mobile
  mobile: [null, Validators.compose([Validators.required, _Validators.mobile])],
});
```

```ts
this.valForm = fb.group({
  // gt digit
  count: [null, Validators.compose([Validators.required, _Validators.equal(10)])],
});
```

### Optimize
- add validate Directive in form dom
```html
<input [(ngModel)]="value" [gt]="3" />
```