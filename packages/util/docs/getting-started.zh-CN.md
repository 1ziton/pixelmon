---
order: 1
title: 开始使用
type: Documents
module: PixelmonUtilModule
config: PixelmonUtilConfig
---

@pixelmon/util 是一组日常普通使用的工具函数的集合。

## 如何使用

安装 `@pixelmon/util` 依赖包：

```bash
yarn add @pixelmon/util
```

导入 `PixelmonUtilModule` 模块：

```typescript
import { PixelmonUtilModule } from '@pixelmon/util';

@NgModule({
  imports: [
    PixelmonUtilModule
  ]
})
export class AppModule { }
```

## PixelmonUtilConfig

通用配置项，例如统一对 `ArrayService` 设置映射名称。

```ts
import { PixelmonUtilConfig } from '@pixelmon/pikachu';
export function fnPixelmonUtilConfig(): PixelmonUtilConfig {
  return Object.assign(new PixelmonUtilConfig(), <PixelmonUtilConfig>{
    array: {
      idMapName: 'Id',
      parentIdMapName: 'ParentId'
    }
  });
}

@NgModule({ })
export class PixelmonModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: PixelmonModule,
      providers: [
        { provide: PixelmonUtilConfig, useFactory: fnPixelmonUtilConfig }
      ]
    };
  }
}
```
