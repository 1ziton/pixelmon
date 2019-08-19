/**
 * @Description: 用于展示当前查询条件
 * @Author: zomixi
 * @Date: 2019-05-15 14:42:17
 */

import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { QueryColumn } from './query-display.module';

@Component({
  selector: 'query-display',
  templateUrl: './query-display.component.html',
  styleUrls: ['./query-display.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QueryDisplayComponent implements OnInit, OnChanges {
  @Input() columns: QueryColumn[] = [];
  @Input() lexicon: { value: any; label: string }[] = []; // 词典

  @Output() columnsChange: EventEmitter<QueryColumn[]> = new EventEmitter();
  @Output() queryChange: EventEmitter<object> = new EventEmitter();
  @Output() close: EventEmitter<QueryColumn> = new EventEmitter();

  // 过滤规则
  @Input() filterRule: (element: any) => boolean = element => {
    const searchValue = element.searchValue;

    // 有默认值且搜索值和默认值相等
    if (element.hasOwnProperty('defaultValue') && searchValue === element.defaultValue) {
      return false;
    }
    // 非法基础数据类型
    if ([undefined, null, ''].includes(searchValue)) {
      return false;
    }
    // 空数组
    if (Array.isArray(searchValue) && !searchValue.length) {
      return false;
    }
    // 通过校验，返回true
    return true;
  };

  constructor() {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.columns) {
      this.updateQuery();
    }
  }

  onClose(column: QueryColumn): void {
    // 有默认值恢复默认值，没有则置为null
    column.searchValue = column.hasOwnProperty('defaultValue') ? column.defaultValue : null;

    this.close.emit(column);
    this.columns = [...this.columns];
    this.columnsChange.emit(this.columns);
  }

  // 组件内更新查询值
  updateQuery() {
    const query = {};
    this.columns.forEach(column => {
      if (column.showFilter) {
        query[column.field] = column.searchValue;
      }
    });
    this.queryChange.emit(query);
  }
}
