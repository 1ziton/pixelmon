---
order: 1
title: 开始使用
type: Documents
module: PokemonUtilModule
config: PokemonUtilConfig
---

@pokemon/util 是一组日常普通使用的工具函数的集合。

## 如何使用

安装 `@pokemon/util` 依赖包：

```bash
yarn add @pokemon/util
```

导入 `PokemonUtilModule` 模块：

```typescript
import { PokemonUtilModule } from '@pokemon/util';

@NgModule({
  imports: [
    PokemonUtilModule
  ]
})
export class AppModule { }
```

## PokemonUtilConfig

通用配置项，例如统一对 `ArrayService` 设置映射名称。

```ts
import { PokemonUtilConfig } from '@pokemon/pikachu';
export function fnPokemonUtilConfig(): PokemonUtilConfig {
  return Object.assign(new PokemonUtilConfig(), <PokemonUtilConfig>{
    array: {
      idMapName: 'Id',
      parentIdMapName: 'ParentId'
    }
  });
}

@NgModule({ })
export class PokemonModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: PokemonModule,
      providers: [
        { provide: PokemonUtilConfig, useFactory: fnPokemonUtilConfig }
      ]
    };
  }
}
```
