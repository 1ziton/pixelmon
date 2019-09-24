import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PixelmonUtilModule } from '@pixelmon/util';

import { G2TimelineComponent } from './timeline.component';

const COMPONENTS = [G2TimelineComponent];

@NgModule({
  imports: [CommonModule, PixelmonUtilModule],
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS],
})
export class G2TimelineModule {}
