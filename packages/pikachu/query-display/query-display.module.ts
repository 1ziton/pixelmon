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

export interface QueryColumn {
  title: string;
  field: string;
  showFilter?: boolean;
  searchValue?: any; // 搜索值
  defaultValue?: any; // 默认值
  displayValue?: any; // 展示值
  lexicon?: { value: any; label: string }[]; // 词典
}
