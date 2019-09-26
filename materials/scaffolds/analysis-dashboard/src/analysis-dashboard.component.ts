import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TableColumn, TableData, TableRow } from '@pixelmon/pikachu/table';
import { _HttpClient } from '@pixelmon/theme';
import { deepCopy, getTimeDistance, toFixed } from '@pixelmon/util';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'dashboard-analysis-page',
  templateUrl: './analysis-dashboard.component.html',
  styleUrls: ['./analysis-dashboard.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardAnalysisPageComponent implements OnInit {
  constructor(private http: _HttpClient, public msg: NzMessageService, private cdr: ChangeDetectorRef) {}
  data: any = {};
  loading = true;
  date_range: Date[] = [];
  rankingListData: any[] = Array(7)
    .fill({})
    .map((item, i) => {
      return {
        title: `工专路 ${i + 1} 号店`,
        total: 323234,
        item,
      };
    });
  titleMap = {
    y1: '客流量',
    y2: '支付笔数',
  };
  tableData: TableData = {
    data: [],
    totalSize: 0,
  };
  queryParams = {};

  tableLoading = false;
  selections: TableRow[] = [];
  columns: TableColumn[] = [
    {
      title: '排名',
      field: 'index',
    },
    {
      title: '搜索关键词',
      field: 'keyword',
      type: 'link',
    },
    {
      title: '用户数',
      field: 'count',
    },
    {
      title: '周涨幅',
      field: 'range',
    },
  ];

  salesType = 'all';
  salesPieData: any;
  salesTotal = 0;

  saleTabs: any[] = [{ key: 'sales', show: true }, { key: 'visits' }];

  offlineIdx = 0;

  ngOnInit() {
    this.http.get('/chart').subscribe((res: any) => {
      res.offlineData.forEach((item: any, idx: number) => {
        item.show = idx === 0;
        item.chart = deepCopy(res.offlineChartData);
      });
      this.data = res;
      this.tableData.data = res.searchData;
      this.tableData.totalSize = res.searchData.length;
      this.loading = false;
      this.changeSaleType();
    });
  }

  setDate(type: any) {
    this.date_range = getTimeDistance(type);
    setTimeout(() => this.cdr.detectChanges());
  }
  changeSaleType() {
    this.salesPieData =
      this.salesType === 'all'
        ? this.data.salesTypeData
        : this.salesType === 'online'
        ? this.data.salesTypeDataOnline
        : this.data.salesTypeDataOffline;
    if (this.salesPieData) {
      this.salesTotal = this.salesPieData.reduce((pre, now) => now.y + pre, 0);
    }
    this.cdr.detectChanges();
  }

  handlePieValueFormat(value: any) {
    return toFixed(value);
  }
  salesChange(idx: number) {
    if (this.saleTabs[idx].show !== true) {
      this.saleTabs[idx].show = true;
      this.cdr.detectChanges();
    }
  }
  offlineChange(idx: number) {
    if (this.data.offlineData[idx].show !== true) {
      this.data.offlineData[idx].show = true;
      this.cdr.detectChanges();
    }
  }
}
