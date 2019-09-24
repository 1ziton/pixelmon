import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PixelmonUtilModule } from '@pixelmon/util';
import { NzDividerModule } from 'ng-zorro-antd/divider';

import { G2PieComponent } from './pie.component';

const COMPONENTS = [G2PieComponent];

@NgModule({
  imports: [CommonModule, PixelmonUtilModule, NzDividerModule],
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS],
})
export class G2PieModule {}
