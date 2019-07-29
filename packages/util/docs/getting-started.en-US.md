---
order: 1
title: Getting Started
type: Documents
module: PokemonUtilModule
config: PokemonUtilConfig
---

`@pokemon/util` is a collection of tool functions.

## Usage

Installing `@pokemon/util` dependency package:

```bash
yarn add @pokemon/util
```

Import the `PokemonUtilModule` in to your root AppModule.

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

Common configuration, such as unifying mapping name for `ArrayService`.

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
