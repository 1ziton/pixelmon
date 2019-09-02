import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// import { ErrorCollectModule } from '@pixelmon/pikachu/error-collect';
import { PixelmonUtilModule } from '@pixelmon/util';

import { FooterToolbarComponent } from './footer-toolbar.component';

const COMPONENTS = [FooterToolbarComponent];

@NgModule({
  imports: [CommonModule, PixelmonUtilModule],
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS],
})
export class FooterToolbarModule {}
