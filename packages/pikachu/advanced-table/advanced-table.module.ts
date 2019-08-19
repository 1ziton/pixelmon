import { CommonModule } from '@angular/common';
import { NgModule, TemplateRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ViewerDirectiveModule } from '@pixelmon/pikachu/viewer';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { AdvancedCellComponent } from './advanced-cell.component';
import { AdvancedFilterComponent } from './advanced-filter.component';
import { AdvancedTableComponent } from './advanced-table.component';
import { QuerySubject } from '@pixelmon/pikachu/query-display';
import { SmartTextModule } from '@pixelmon/pikachu/smart-text';

const COMPONENT = [AdvancedTableComponent, AdvancedCellComponent, AdvancedFilterComponent];

const MODULE = [CommonModule, FormsModule, NgZorroAntdModule, SmartTextModule, ViewerDirectiveModule];

@NgModule({
  declarations: [...COMPONENT],
  imports: [...MODULE],
  exports: [...MODULE, ...COMPONENT],
})
export class AdvancedTableModule {}

// 列数据接口
export interface AdvancedTableColumn extends QuerySubject {
  title: string;
  field: string;
  width?: string;
  left?: string;
  right?: string;
  type?: 'link' | 'thumbnail';
  customCell?: TemplateRef<any>; // 自定义单元格
  // 排序相关
  showSort?: boolean; // 是否显示排序
  sortValue?: 'descend' | 'ascend' | null; // 当前排序状态
  customSort?: boolean; // 是否自定义排序
  // 搜索相关
  showFilter?: boolean; // 是否显示搜索
  filterType?: string; // 搜索组件类型
  filterOptions?: { label: string; value: any }[]; // 下拉搜索组件选项
  filterWidth?: string; // 下拉搜索组件宽度
  filterMultiple?: boolean; // 是否多选
  customFilter?: TemplateRef<any>; // 自定义搜索组件
}

export interface AdvancedTableRow {
  isChecked: boolean;
  [key: string]: any;
}

// 分页参数接口
export interface PageParams {
  page: number;
  size: number;
}
