/**
 * @Description: 表格组件
 * @Author: zomixi
 * @Date: 2019-07-05 10:06:41
 */

import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  AfterContentInit,
  ContentChildren,
  TemplateRef,
  ElementRef,
  Renderer2,
  OnChanges
} from '@angular/core';
import { Subject } from 'rxjs';
import { AdvancedCellComponent } from './advanced-cell.component';
import { AdvancedFilterComponent } from './advanced-filter.component';
import { formatDate } from '@angular/common';
import { Column, PageParams } from './advanced-table.module';

@Component({
  selector: 'advanced-table',
  templateUrl: './advanced-table.component.html',
  styleUrls: ['./advanced-table.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdvancedTableComponent implements OnChanges, OnInit, AfterViewInit, AfterContentInit, OnDestroy {
  @Input() columns: Column[] = []; // 列数据
  @Input() data: { content: object[]; totalElements: number } = { content: [], totalElements: 0 }; // 表格数据
  @Input() selections: object[] = []; // 已选项
  @Input() scroll: { x?: string | null; y?: string | null } = null; // 固定表头，滚动
  @Input() loading = false; // 表格loading
  @Input() pageSize = 10; // 显示条数
  @Input() frontPagination = false; // 是否前端分页
  @Input() showPagination = true; // 是否显示分页器
  @Input() fixedPagination = true; // 是否固定分页器
  @Input() showSizeChanger = true; // 是否显示条数切换器
  @Input() size = 'middle'; // 表格size
  @Input() pageSizeOptions = [10, 30, 50, 100]; // 页数选择器可选值
  @Input() showCheckbox = false; // 是否显示复选框
  @Input() showTitle = true; // 是否有title
  @Input() titleTemplate: TemplateRef<void> = null; // title模板

  @Output() columnsChange: EventEmitter<Column[]> = new EventEmitter(); // 列数据改变事件 用于双向绑定
  @Output() selectionsChange: EventEmitter<object[]> = new EventEmitter(); // 已选项改变事件 用于双向绑定
  @Output() load: EventEmitter<[PageParams, { [key: string]: any }?]> = new EventEmitter(); // load事件
  @Output() sort: EventEmitter<{ key: string; value: 'descend' | 'ascend' | null }> = new EventEmitter(); // 排序事件
  @Output() linkClick: EventEmitter<{ field: string; rowData: any }> = new EventEmitter(); // 链接点击事件

  @ContentChildren(AdvancedCellComponent) customCells: AdvancedCellComponent[]; // 自定义单元格
  @ContentChildren(AdvancedFilterComponent) customFilters: AdvancedFilterComponent[]; // 自定义搜索组件

  load$: Subject<any> = new Subject(); // load流

  displayData: any[] = []; // 当前显示数据
  pageIndex = 1; // 当前页码
  queryParams: { [key: string]: any } = {};
  sortParams: { key: string; value: 'descend' | 'ascend' | null } = null;

  constructor(private _elementRef: ElementRef, private _renderer2: Renderer2) {}

  ngOnChanges(changes) {
    if (changes.data) {
      // 重走sort
      if (this.sortParams && this.sortParams.key && this.sortParams.value) {
        this.onSort(this.sortParams);
      }
    }
    if (changes.columns) {
      // 智能词典
      changes.columns.currentValue.forEach(column => {
        if (column.showFilter && column.filterType === 'select' && Array.isArray(column.filterOptions)) {
          column.lexicon = column.lexicon ? [...column.lexicon, ...column.filterOptions] : column.filterOptions;
        }
      });
    }
  }

  ngOnInit() {
    this.load$.debounceTime(20).subscribe(() => {
      // 清空selections
      this.selections = [];
      this.selectionsChange.emit(this.selections);
      // 发出load事件
      this.load.emit([{ page: this.pageIndex, size: this.pageSize }, this.queryParams]);
    });
  }

  ngAfterViewInit() {
    // 页面初始化完成后自动load一次
    this.load$.next();
    if (this.fixedPagination) {
      this.toFixedPagination();
    }
  }

  ngAfterContentInit() {
    // 赋值自定义单元格
    this.customCells.forEach(customCell => {
      const findedColumn = this.columns.find(column => column.field === customCell.field);
      findedColumn.customCell = customCell.templateRef;
    });
    // 赋值自定义搜索组件
    this.customFilters.forEach(customFilter => {
      const findedColumn = this.columns.find(column => column.field === customFilter.field);
      findedColumn.showFilter = true;
      findedColumn.customFilter = customFilter.templateRef;
    });
  }

  ngOnDestroy() {
    // 不使用takeUntil是因为直接unsubscribe性能更好
    this.load$.unsubscribe();
  }

  /**
   * 表格当前显示数据改变时调用
   * @param currentData 当前页显示数据
   */
  currentPageDataChange(currentData: any[]): void {
    this.displayData = currentData;
  }

  /**
   * 单选改变回调
   */
  singleCheckChange(): void {
    this.updateSelections();
  }

  /**
   * 全选复选框改变回调
   * @param isChecked 是否全选
   */
  allCheckChange(isChecked: boolean): void {
    this.displayData.forEach(row => (row.isChecked = isChecked));
    this.updateSelections();
  }

  /**
   * 更新selections
   */
  updateSelections(): void {
    this.selections = this.displayData.filter(row => row.isChecked);
    this.selectionsChange.emit(this.selections);
  }

  /**
   * 页码改变回调
   */
  pageIndexChange(): void {
    this.load$.next();
  }

  /**
   * 显示条数改变回调
   */
  pageSizeChange(): void {
    // 显示条数改变时回到首页
    this.pageIndex = 1;
    this.load$.next();
  }

  /**
   * 排序改变
   * @param sortParams 排序参数
   */
  onSort(sortParams: { key: string; value: 'descend' | 'ascend' | null }): void {
    // 保存排序参数，用于下次数据进来再进行排序
    this.sortParams = sortParams;
    // 查找正在排序的列
    const sortColumn = this.columns.find(column => column.field === sortParams.key);

    // 如果没有自定义排序，自动前端排序
    if (!sortColumn.customSort) {
      this.data.content.sort((previous, further) =>
        sortParams.value === 'descend'
          ? further[sortParams.key] > previous[sortParams.key]
            ? 1
            : -1
          : previous[sortParams.key] > further[sortParams.key]
          ? 1
          : -1
      );
      this.data.content = [...this.data.content];
    }
    this.sort.emit(sortParams);
  }

  /**
   * 日期改变回调
   * @param isOpen 是否打开
   * @param column 当前列模型数据
   */
  onRangePickerOpenChange(isOpen: boolean, column: Column): void {
    if (isOpen === false) {
      const date = column.searchValue;
      if (date && Array.isArray(date) && date.length === 2) {
        column.searchValue = [
          formatDate(date[0], 'yyyy-MM-dd 00:00:00', 'zh_CN'),
          formatDate(date[1], 'yyyy-MM-dd 23:59:59', 'zh_CN')
        ];
        column.displayValue = [formatDate(date[0], 'yyyy-MM-dd', 'zh_CN'), formatDate(date[1], 'yyyy-MM-dd', 'zh_CN')];
      }
    }
  }

  /**
   * 查询确认回调
   */
  onFilterConfim(): void {
    this.columns = [...this.columns]; // 传入子组件query-display
    this.columnsChange.emit(this.columns); // 传出父组件
  }

  /**
   * 查询参数改变回调
   * @param queryParams 查询参数
   */
  onQueryChange(queryParams: { [key: string]: any }): void {
    this.queryParams = queryParams;
    this.load$.next();
  }

  /**
   * 固定分页
   */
  toFixedPagination(): void {
    // zorro设计缺陷，没有滚动条时和有滚动条时tableBody会不一样，故先给上滚动条
    this.scroll = { y: '0px' };
    // 等待滚动条更新
    setTimeout(() => {
      const windowHeight = document.documentElement.clientHeight;
      const tableBody = this._elementRef.nativeElement.querySelector('.ant-table-body');
      const pagination = this._elementRef.nativeElement.querySelector('nz-pagination');
      const tableBodyTop = tableBody.getBoundingClientRect().top;
      const scrollHeight = windowHeight - tableBodyTop - pagination.clientHeight - 8 + 'px';
      this.scroll = { ...this.scroll, y: scrollHeight };
      this._renderer2.setStyle(tableBody, 'height', scrollHeight);
    });
  }

  onlinkClick(field: string, rowData: any) {
    this.linkClick.emit({ field, rowData });
  }
}
