import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';

import { throwIfAlreadyLoaded } from './core/module-import-guard';

// mock
import { PixelmonMockModule } from '@pixelmon/mock';

import { PixelmonThemeModule } from '@pixelmon/theme';

import * as MOCKDATA from '../../_mock';

// #region reuse-tab
/**
 * 若需要[路由复用](https://1ziton.com/components/reuse-tab)需要：
 * 1、增加 `REUSETAB_PROVIDES`
 * 2、在 `src/app/layout/default/default.component.html` 修改：
 *  ```html
 *  <section class="pixelmon-default__content">
 *    <reuse-tab></reuse-tab>
 *    <router-outlet></router-outlet>
 *  </section>
 *  ```
 */
// import { RouteReuseStrategy } from '@angular/router';
// import { ReuseTabService, ReuseTabStrategy } from '@pixelmon/pikachu/reuse-tab';
const REUSETAB_PROVIDES = [
  // {
  //   provide: RouteReuseStrategy,
  //   useClass: ReuseTabStrategy,
  //   deps: [ReuseTabService],
  // },
];
// #endregion

// #region global config functions

import { LodopConfig } from '@pixelmon/pikachu';

import { PixelmonACLModule } from '@pixelmon/acl';
import { PixelmonGGEditorModule } from '@pixelmon/ggeditor';

export function fnLodopConfig(): LodopConfig {
  return Object.assign(new LodopConfig(), {
    license: `A59B099A586B3851E0F0D7FDBF37B603`,
    licenseA: `C94CEE276DB2187AE6B65D56B3FC2848`,
  });
}

// #endregion

@NgModule({
  imports: [
    PixelmonThemeModule.forRoot(),
    PixelmonACLModule.forRoot(),
    PixelmonMockModule.forRoot({
      data: MOCKDATA,
    }),
    PixelmonGGEditorModule,
  ],
})
export class PixelmonModule {
  constructor(@Optional() @SkipSelf() parentModule: PixelmonModule) {
    throwIfAlreadyLoaded(parentModule, 'PixelmonModule');
  }

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: PixelmonModule,
      providers: [
        ...REUSETAB_PROVIDES,
        {
          provide: LodopConfig,
          useFactory: fnLodopConfig,
        },
      ],
    };
  }
}
