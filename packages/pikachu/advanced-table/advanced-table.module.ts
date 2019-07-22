import { NgModule, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { QueryDisplayModule } from '../query-display/query-display.module';
import { SmartTextModule } from '../smart-text/smart-text.module';
import { ViewerDirectiveModule } from '@shared/directives/viewer.directive';
import { AdvancedTableComponent } from './advanced-table.component';
import { AdvancedCellComponent } from './advanced-cell.component';
import { AdvancedFilterComponent } from './advanced-filter.component';

const COMPONENT = [AdvancedTableComponent, AdvancedCellComponent, AdvancedFilterComponent];

const MODULE = [
  CommonModule,
  FormsModule,
  NgZorroAntdModule,
  QueryDisplayModule,
  SmartTextModule,
  ViewerDirectiveModule
];

@NgModule({
  declarations: [...COMPONENT],
  imports: [...MODULE],
  exports: [...MODULE, ...COMPONENT]
})
export class AdvancedTableModule {}

// 列数据接口
export interface Column {
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
  searchValue?: any; // 搜索值
  defaultValue?: any; // 默认值
  displayValue?: any; // 展示值
  lexicon?: { [key: string]: string }; // 词典
}

// 分页参数接口
export interface PageParams {
  page: number;
  size: number;
}
