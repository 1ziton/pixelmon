import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { PokemonMockConfig } from './mock.config';
import { MockInterceptor } from './mock.interceptor';
import { MockService } from './mock.service';

@NgModule({})
export class PokemonMockModule {
  static forRoot(config: PokemonMockConfig): ModuleWithProviders {
    return {
      ngModule: PokemonMockModule,
      providers: [
        MockService,
        { provide: PokemonMockConfig, useValue: config },
        { provide: HTTP_INTERCEPTORS, useClass: MockInterceptor, multi: true },
      ],
    };
  }

  static forChild(): ModuleWithProviders {
    return {
      ngModule: PokemonMockModule,
      providers: [{ provide: HTTP_INTERCEPTORS, useClass: MockInterceptor, multi: true }],
    };
  }
}
