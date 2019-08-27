import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { SmartTextModule } from '@pixelmon/pikachu/smart-text';
import { ViewerDirectiveModule } from '@pixelmon/pikachu/viewer';
import { TableComponent } from './table.component';
import { TableCellComponent } from './table-cell.component';
import { TableFilterComponent } from './table-filter.component';

const COMPONENT = [TableComponent, TableCellComponent, TableFilterComponent];

const MODULE = [CommonModule, FormsModule, NgZorroAntdModule, SmartTextModule, ViewerDirectiveModule];

@NgModule({
  declarations: [...COMPONENT],
  imports: [...MODULE],
  exports: [...MODULE, ...COMPONENT],
})
export class TableModule {}
