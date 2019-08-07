import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FilterPipeModule, TranslatePipeModule } from '@pixelmon/theme';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { QueryDisplayComponent } from './query-display.component';

@NgModule({
  declarations: [QueryDisplayComponent],
  imports: [CommonModule, TranslatePipeModule, FilterPipeModule, NgZorroAntdModule],
  exports: [QueryDisplayComponent],
})
export class QueryDisplayModule {}
