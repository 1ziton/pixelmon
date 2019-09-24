import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PixelmonUtilModule } from '@pixelmon/util';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { NumberInfoComponent } from './number-info.component';

const COMPONENTS = [NumberInfoComponent];

@NgModule({
  imports: [CommonModule, NzIconModule, PixelmonUtilModule],
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS],
})
export class NumberInfoModule {}
