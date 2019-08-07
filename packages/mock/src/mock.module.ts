import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { PixelmonMockConfig } from './mock.config';
import { MockInterceptor } from './mock.interceptor';
import { MockService } from './mock.service';

@NgModule({})
export class PixelmonMockModule {
  static forRoot(config: PixelmonMockConfig): ModuleWithProviders {
    return {
      ngModule: PixelmonMockModule,
      providers: [
        MockService,
        { provide: PixelmonMockConfig, useValue: config },
        { provide: HTTP_INTERCEPTORS, useClass: MockInterceptor, multi: true },
      ],
    };
  }

  static forChild(): ModuleWithProviders {
    return {
      ngModule: PixelmonMockModule,
      providers: [{ provide: HTTP_INTERCEPTORS, useClass: MockInterceptor, multi: true }],
    };
  }
}
