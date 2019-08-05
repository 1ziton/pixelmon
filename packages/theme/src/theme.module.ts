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
// pipes
import {
  CNCurrencyPipe,
  DatePipe,
  FilterPipe,
  HTMLPipe,
  KeysPipe,
  ShortcutPipe,
  ShortcutPipeModule,
  TranslatePipe,
  URLPipe,
  YNPipe,
} from './pipes';
// #region import
import { DrawerHelper } from './services/drawer/drawer.helper';
import { I18nPipe } from './services/i18n/i18n.pipe';
import { ModalHelper } from './services/modal/modal.helper';

const HELPERS = [ModalHelper, DrawerHelper];

// components
const COMPONENTS = [];

const PIPES = [DatePipe, CNCurrencyPipe, KeysPipe, YNPipe, I18nPipe, HTMLPipe, URLPipe, FilterPipe, TranslatePipe, ShortcutPipe];

const ICONS = [BellOutline, DeleteOutline, PlusOutline, InboxOutline];

// #endregion

@NgModule({
  imports: [CommonModule, RouterModule, OverlayModule, ShortcutPipeModule],
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
