---
order: 0
title:
  zh-CN: 基本
  en-US: Basic
---

## zh-CN

基础分页。

## en-US

Basic pagination.

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'demo-basic',
  template: `
    <p-pagination [nzPageIndex]="1" [nzTotal]="0"></p-pagination>
  `,
})
export class NzDemoPaginationBasicComponent {}
```
