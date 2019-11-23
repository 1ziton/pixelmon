/**
 * @Description: 用于展示当前查询条件
 * @Author: zomixi
 * @Date: 2019-05-15 14:42:17
 */

import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';
import { QueryTab } from './query-tabs-interface';

@Component({
  selector: 'p-query-tabs',
  exportAs: 'pQueryTabs',
  templateUrl: './query-tabs.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class QueryTabsComponent implements OnInit, OnChanges {
  @Input() tabs: QueryTab[] = [];
  @Input() lexicon: { value: any; label: string }[] = []; // 词典

  @Output() tabsChange: EventEmitter<QueryTab[]> = new EventEmitter();
  @Output() queryChange: EventEmitter<object> = new EventEmitter();
  @Output() tabClose: EventEmitter<QueryTab> = new EventEmitter();

  // 过滤规则
  @Input() filterRule: (tab: QueryTab) => boolean = tab => {
    const searchValue = tab.searchValue;

    // 有默认值且搜索值和默认值相等
    if (tab.hasOwnProperty('defaultValue') && searchValue === tab.defaultValue) {
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
    if (changes.tabs) {
      Promise.resolve().then(() => {
        this.updateQuery();
      });
    }
  }

  onClose(tab: QueryTab): void {
    // 有默认值恢复默认值，没有则置为null
    tab.searchValue = tab.hasOwnProperty('defaultValue') ? tab.defaultValue : null;

    this.tabClose.emit(tab);
    this.tabs = [...this.tabs];
    this.tabsChange.emit(this.tabs);
  }

  // 组件内更新查询值
  updateQuery() {
    const query = {};
    this.tabs.forEach(tab => {
      if (tab.showFilter) {
        query[tab.field] = tab.searchValue;
      }
    });
    this.queryChange.emit(query);
  }
}
