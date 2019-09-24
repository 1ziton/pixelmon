import { Component, ChangeDetectionStrategy, OnInit, ChangeDetectorRef } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { getTimeDistance, deepCopy, toFixed } from '@pixelmon/util';
import { _HttpClient } from '@pixelmon/theme';

@Component({
  selector: 'app-dashboard-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardAnalysisComponent implements OnInit {
  constructor(private http: _HttpClient, public msg: NzMessageService, private cdr: ChangeDetectorRef) {}
  data: any = {};
  loading = true;
  date_range: Date[] = [];
  rankingListData: any[] = Array(7)
    .fill({})
    .map(() => {
      return {
        title: '总销售额',
        total: 323234,
      };
    });
  titleMap = {
    y1: '访问量',
    y2: '日访问量',
  };


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
