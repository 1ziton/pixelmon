import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
// #endregion
// #region all pokemon used icons
// - zorro: https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/components/icon/nz-icon.service.ts#L6
import { BellOutline, DeleteOutline, InboxOutline, PlusOutline } from '@ant-design/icons-angular/icons';
import { NzIconService } from 'ng-zorro-antd/icon';
import { PokemonLocaleModule } from './locale/locale.module';
// #region import
import { DrawerHelper } from './services/drawer/drawer.helper';
import { ModalHelper } from './services/modal/modal.helper';

// pipes
import { CNCurrencyPipe } from './pipes/currency/cn-currency.pipe';
import { DatePipe } from './pipes/date/date.pipe';
import { KeysPipe } from './pipes/keys/keys.pipe';
import { HTMLPipe } from './pipes/safe/html.pipe';
import { URLPipe } from './pipes/safe/url.pipe';
import { YNPipe } from './pipes/yn/yn.pipe';
import { ShortcutPipeModule } from './pipes/shortcut/shortcut.pipe';
import { FilterPipeModule } from './pipes/filter/filter.pipe';
import { TranslatePipeModule } from './pipes/translate/translate.pipe';
import { I18nPipe } from './services/i18n/i18n.pipe';

const PIPES = [DatePipe, CNCurrencyPipe, KeysPipe, YNPipe, I18nPipe, HTMLPipe, URLPipe];

const HELPERS = [ModalHelper, DrawerHelper];

// components
const COMPONENTS = [];

const ICONS = [BellOutline, DeleteOutline, PlusOutline, InboxOutline];

// #endregion

@NgModule({
  imports: [CommonModule, RouterModule, OverlayModule, FilterPipeModule, TranslatePipeModule, ShortcutPipeModule],
  declarations: [...COMPONENTS, ...PIPES],
  exports: [...COMPONENTS, ...PIPES, PokemonLocaleModule],
})
export class PokemonThemeModule {
  constructor(iconSrv: NzIconService) {
    iconSrv.addIcon(...ICONS);
  }

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: PokemonThemeModule,
      providers: [...HELPERS],
    };
  }

  static forChild(): ModuleWithProviders {
    return {
      ngModule: PokemonThemeModule,
      providers: [...HELPERS],
    };
  }
}
