import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FilterPipeModule, TranslatePipeModule } from '@pokemon/theme';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { QueryDisplayComponent } from './query-display.component';

@NgModule({
  declarations: [QueryDisplayComponent],
  imports: [CommonModule, NgZorroAntdModule, FilterPipeModule, TranslatePipeModule],
  exports: [CommonModule, NgZorroAntdModule, FilterPipeModule, TranslatePipeModule, QueryDisplayComponent],
})
export class QueryDisplayModule {}
