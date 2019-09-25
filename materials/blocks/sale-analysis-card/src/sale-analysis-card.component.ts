import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { _HttpClient } from '@pixelmon/theme';
import { deepCopy, getTimeDistance } from '@pixelmon/util';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'block-sale-analysis-card',
  templateUrl: './sale-analysis-card.component.html',
  styleUrls: ['./sale-analysis-card.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SaleAnalysisCardBlockComponent implements OnInit {
  constructor(private http: _HttpClient, public msg: NzMessageService, private cdr: ChangeDetectorRef) {}
  data: any = { visitData: [] };
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
      setTimeout(() => this.cdr.detectChanges());
    });
  }

  salesChange(idx: number) {
    if (this.saleTabs[idx].show !== true) {
      this.saleTabs[idx].show = true;
      this.cdr.detectChanges();
    }
  }

  setDate(type: any) {
    this.date_range = getTimeDistance(type);
    setTimeout(() => this.cdr.detectChanges());
  }
}
