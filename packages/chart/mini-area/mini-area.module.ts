import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PixelmonUtilModule } from '@pixelmon/util';

import { G2MiniAreaComponent } from './mini-area.component';

const COMPONENTS = [G2MiniAreaComponent];

@NgModule({
  imports: [CommonModule, PixelmonUtilModule],
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS],
})
export class G2MiniAreaModule {}
