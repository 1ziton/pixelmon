import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PixelmonLocaleModule } from '@pixelmon/theme';
import { PixelmonUtilModule } from '@pixelmon/util';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { TagSelectComponent } from './tag-select.component';

const COMPONENTS = [TagSelectComponent];

@NgModule({
  imports: [CommonModule, NzIconModule, PixelmonLocaleModule, PixelmonUtilModule],
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS],
})
export class TagSelectModule {}
