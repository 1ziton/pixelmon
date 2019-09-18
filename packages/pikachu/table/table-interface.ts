import { TemplateRef } from '@angular/core';
import { QueryTab } from '@pixelmon/pikachu/query-tabs';

export interface TableData {
  data: TableRow[];
  totalSize: number;
}

// 列数据接口
export interface TableColumn extends QueryTab {
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

// 行数据接口
export interface TableRow {
  isChecked?: boolean;
  [key: string]: any;
}

// 分页参数接口
export interface TablePage {
  page: number;
  size: number;
}
