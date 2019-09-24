import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PixelmonUtilModule } from '@pixelmon/util';

import { G2CustomComponent } from './custom.component';

const COMPONENTS = [G2CustomComponent];

@NgModule({
  imports: [CommonModule, PixelmonUtilModule],
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS],
})
export class G2CustomModule {}
