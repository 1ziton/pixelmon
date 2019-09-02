import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FilterPipeModule, TranslatePipeModule } from '@pixelmon/theme';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { QueryTabsComponent } from './query-tabs.component';

@NgModule({
  declarations: [QueryTabsComponent],
  imports: [CommonModule, TranslatePipeModule, FilterPipeModule, NgZorroAntdModule],
  exports: [CommonModule, TranslatePipeModule, FilterPipeModule, NgZorroAntdModule, QueryTabsComponent],
})
export class QueryTabsModule {}
