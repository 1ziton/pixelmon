import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PaginationModule } from '@pixelmon/pikachu/pagination';
import { SmartTextModule } from '@pixelmon/pikachu/smart-text';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzTableModule } from 'ng-zorro-antd/table';
import { TableCellComponent } from './table-cell.component';
import { TableFilterComponent } from './table-filter.component';
import { TableComponent } from './table.component';

const COMPONENT = [TableComponent, TableCellComponent, TableFilterComponent];

const MODULE = [
  CommonModule,
  FormsModule,
  NzTableModule,
  NzDropDownModule,
  NzIconModule,
  NzButtonModule,
  NzInputModule,
  NzGridModule,
  NzBadgeModule,
  NzSelectModule,
  NzDatePickerModule,
  NzSpinModule,
  SmartTextModule,
  PaginationModule,
];

@NgModule({
  declarations: [...COMPONENT],
  imports: [...MODULE],
  exports: [...COMPONENT],
})
export class TableModule {}
