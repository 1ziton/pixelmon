import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PixelmonLocaleModule } from '@pixelmon/theme';
import { PixelmonUtilModule } from '@pixelmon/util';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';

import { G2MiniProgressComponent } from './mini-progress.component';

const COMPONENTS = [G2MiniProgressComponent];

@NgModule({
  imports: [CommonModule, PixelmonUtilModule, PixelmonLocaleModule, NzToolTipModule],
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS],
})
export class G2MiniProgressModule {}
