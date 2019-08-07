---
order: 1
title: Getting Started
type: Documents
module: PixelmonUtilModule
config: PixelmonUtilConfig
---

`@pixelmon/util` is a collection of tool functions.

## Usage

Installing `@pixelmon/util` dependency package:

```bash
yarn add @pixelmon/util
```

Import the `PixelmonUtilModule` in to your root AppModule.

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

Common configuration, such as unifying mapping name for `ArrayService`.

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
