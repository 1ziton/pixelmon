/**
 * @Description: 表格组件
 * @Author: zomixi
 * @Date: 2019-07-05 10:06:41
 */

import { formatDate } from '@angular/common';
import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';
import { NzDropDownDirective } from 'ng-zorro-antd';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { TableCellComponent } from './table-cell.component';
import { TableFilterComponent } from './table-filter.component';
import { PTableColumn, PTablePage, PTableRow } from './table-interface';

@Component({
  selector: 'p-table',
  exportAs: 'pTable',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.Emulated,
})
export class TableComponent implements OnChanges, OnInit, AfterViewInit, AfterContentInit, OnDestroy {
  @Input() columns: PTableColumn[] = []; // 列数据
  @Input() data: { data: PTableRow[]; totalSize: number } = { data: [], totalSize: 0 }; // 表格数据
  @Input() selections: PTableRow[] = []; // 已选项
  @Input() scroll: { x?: string | null; y?: string | null }; // 固定表头，滚动
  @Input() loading = false; // 表格loading
  @Input() pageSize = 10; // 显示条数
  @Input() frontPagination = false; // 是否前端分页
  @Input() showPagination = true; // 是否显示分页器
  @Input() fixedPagination = false; // 是否固定分页器
  @Input() showSizeChanger = true; // 是否显示条数切换器
  @Input() size = 'middle'; // 表格size
  @Input() pageSizeOptions = [10, 30, 50, 100]; // 页数选择器可选值
  @Input() showCheckbox = false; // 是否显示复选框
  @Input() titleTemplate: TemplateRef<void>; // title模板

  @Output() columnsChange: EventEmitter<PTableColumn[]> = new EventEmitter(); // 列数据改变事件 用于双向绑定
  @Output() selectionsChange: EventEmitter<PTableRow[]> = new EventEmitter(); // 已选项改变事件 用于双向绑定
  @Output() load: EventEmitter<PTablePage> = new EventEmitter(); // load事件
  @Output() sort: EventEmitter<{ key: string; value: 'descend' | 'ascend' | null }> = new EventEmitter(); // 排序事件
  @Output() linkClick: EventEmitter<{ field: string; rowData: any }> = new EventEmitter(); // 链接点击事件

  @ContentChildren(TableCellComponent) customCells: TableCellComponent[]; // 自定义单元格
  @ContentChildren(TableFilterComponent) customFilters: TableFilterComponent[]; // 自定义搜索组件

  load$: Subject<any> = new Subject(); // load流

  displayData: PTableRow[] = []; // 当前显示数据
  pageIndex = 1; // 当前页码
  sortParams: { key: string; value: 'descend' | 'ascend' | null };

  constructor(private _elementRef: ElementRef, private _renderer2: Renderer2) {}

  ngOnChanges(changes) {
    if (changes.data) {
      // 重走sort
      if (this.sortParams && this.sortParams.key && this.sortParams.value) {
        this.onSort(this.sortParams);
      }
    }
    if (changes.columns) {
      // 是下拉选择的自动添加词典
      this.columns.forEach(column => {
        if (column.showFilter && column.filterType === 'select' && Array.isArray(column.filterOptions)) {
          column.lexicon = column.lexicon ? [...column.lexicon, ...column.filterOptions] : column.filterOptions;
        }
      });
    }
    if (changes.selections) {
      this.updateCheckedBySelections();
    }
  }

  ngOnInit() {
    /* tslint:disable */
    this.load$.pipe(debounceTime(20)).subscribe(() => {
      // 发出load事件
      this.load.emit({ page: this.pageIndex, size: this.pageSize });
    });
  }

  ngAfterViewInit() {
    // 页面初始化完成后自动load一次
    this.load$.next();
    if (this.showPagination && this.fixedPagination) {
      this.toFixedPagination();
    }
  }

  ngAfterContentInit() {
    // 赋值自定义单元格
    this.customCells.forEach(customCell => {
      const findedColumn = this.columns.find(column => column.field === customCell.field);
      if (findedColumn) findedColumn.customCell = customCell.templateRef;
    });
    // 赋值自定义搜索组件
    this.customFilters.forEach(customFilter => {
      const findedColumn = this.columns.find(column => column.field === customFilter.field);
      if (findedColumn) {
        findedColumn.showFilter = true;
        findedColumn.customFilter = customFilter.templateRef;
      }
    });
  }

  ngOnDestroy() {
    // 不使用takeUntil是因为直接unsubscribe性能更好
    this.load$.unsubscribe();
  }

  /**
   * 表格当前显示数据改变回调
   * @param currentData 当前页显示数据
   */
  currentPageDataChange(currentData: any[]): void {
    this.displayData = currentData;
  }

  /**
   * 单选改变回调
   */
  singleCheckChange(): void {
    this.updateSelectionsByChecked();
  }

  /**
   * 全选复选框改变回调
   * @param isChecked 是否全选
   */
  allCheckChange(isChecked: boolean): void {
    this.displayData.forEach(row => (row.isChecked = isChecked));
    this.updateSelectionsByChecked();
  }

  /**
   * 根据checked更新selections
   */
  updateSelectionsByChecked(): void {
    this.selections = this.displayData.filter(row => row.isChecked);
    this.selectionsChange.emit(this.selections);
  }

  /**
   * 根据selections更新checked
   */
  updateCheckedBySelections(): void {
    this.displayData.forEach(row => (row.isChecked = this.selections.includes(row)));
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
    if (sortColumn && !sortColumn.customSort) {
      this.data.data.sort((previous, further) =>
        sortParams.value === 'descend'
          ? further[sortParams.key] > previous[sortParams.key]
            ? 1
            : -1
          : previous[sortParams.key] > further[sortParams.key]
          ? 1
          : -1,
      );
      this.data.data = [...this.data.data];
    }
    this.sort.emit(sortParams);
  }

  /**
   * 日期改变回调
   * @param isOpen 是否打开
   * @param column 当前列模型数据
   */
  onRangePickerOpenChange(isOpen: boolean, column: PTableColumn): void {
    if (isOpen === false) {
      const date = column.searchValue;
      if (date && Array.isArray(date) && date.length === 2) {
        column.searchValue = [formatDate(date[0], 'yyyy-MM-dd 00:00:00', 'zh_CN'), formatDate(date[1], 'yyyy-MM-dd 23:59:59', 'zh_CN')];
        column.displayValue = [formatDate(date[0], 'yyyy-MM-dd', 'zh_CN'), formatDate(date[1], 'yyyy-MM-dd', 'zh_CN')];
      }
    }
  }

  /**
   * 查询确认回调
   */
  onFilterConfim(dropdown: NzDropDownDirective): void {
    dropdown.nzDropdownMenu.setVisibleStateWhen(false);
    this.columns = [...this.columns];
    this.columnsChange.emit(this.columns);
  }

  /**
   * 固定分页
   */
  toFixedPagination(): void {
    // 没有滚动条时和有滚动条时tableBody会不一样，故先给上滚动条
    this.scroll = { ...this.scroll, y: '0px' };
    // 等待滚动条更新
    setTimeout(() => {
      const windowHeight = document.documentElement.clientHeight;
      const tableBody = this._elementRef.nativeElement.querySelector('.ant-table-body');
      const pagination = this._elementRef.nativeElement.querySelector('.p-table-pagination-container');
      const tableBodyTop = tableBody.getBoundingClientRect().top;
      const scrollHeight = windowHeight - tableBodyTop - pagination.clientHeight + 'px';
      // 设scroll 实际上是设了max-height
      this.scroll = { ...this.scroll, y: scrollHeight };
      // 设height
      this._renderer2.setStyle(tableBody, 'height', scrollHeight);
    });
  }

  onlinkClick(field: string, rowData: any) {
    this.linkClick.emit({ field, rowData });
  }
}
