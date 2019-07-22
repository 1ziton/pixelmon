import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FilterPipeModule } from '@pokemon/butterfree/src/pipes/filter.pipe';
import { TranslatePipeModule } from '@pokemon/butterfree/src/pipes/translate.pipe';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { QueryDisplayComponent } from './query-display.component';

@NgModule({
  declarations: [QueryDisplayComponent],
  imports: [CommonModule, NgZorroAntdModule, FilterPipeModule, TranslatePipeModule],
  exports: [CommonModule, NgZorroAntdModule, FilterPipeModule, TranslatePipeModule, QueryDisplayComponent],
})
export class QueryDisplayModule {}
