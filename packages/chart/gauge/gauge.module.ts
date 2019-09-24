import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PixelmonUtilModule } from '@pixelmon/util';

import { G2GaugeComponent } from './gauge.component';

const COMPONENTS = [G2GaugeComponent];

@NgModule({
  imports: [CommonModule, PixelmonUtilModule],
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS],
})
export class G2GaugeModule {}
