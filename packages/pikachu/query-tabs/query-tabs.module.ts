import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FilterPipeModule, TranslatePipeModule } from '@pixelmon/theme';
import { NzTabsModule, NzPopoverModule, NzIconModule } from 'ng-zorro-antd';
import { QueryTabsComponent } from './query-tabs.component';

@NgModule({
  declarations: [QueryTabsComponent],
  imports: [CommonModule, TranslatePipeModule, FilterPipeModule, NzTabsModule, NzPopoverModule, NzIconModule],
  exports: [QueryTabsComponent],
})
export class QueryTabsModule {}
