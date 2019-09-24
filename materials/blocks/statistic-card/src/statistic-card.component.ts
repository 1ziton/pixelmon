import { Component, ChangeDetectionStrategy, OnInit, ChangeDetectorRef } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { getTimeDistance, deepCopy, toFixed } from '@pixelmon/util';
import { _HttpClient } from '@pixelmon/theme';
import { I18NService } from '@core/i18n/service';
import format from 'date-fns/format';

@Component({
  selector: 'block-statistic-card',
  templateUrl: './statistic-card.component.html',
  styleUrls: ['./statistic-card.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatisticCardBlockComponent implements OnInit {
  constructor(private http: _HttpClient, public msg: NzMessageService, private i18n: I18NService, private cdr: ChangeDetectorRef) {}
  data: any = { visitData: [] };
  loading = true;
  date_range: Date[] = [];
  rankingListData: any[] = Array(7)
    .fill({})
    .map((item, i) => {
      console.log(item);
      return {
        title: this.i18n.fanyi('app.analysis.test', { no: i }),
        total: 323234,
      };
    });
  titleMap = {
    y1: this.i18n.fanyi('app.analysis.traffic'),
    y2: this.i18n.fanyi('app.analysis.payments'),
  };
  visitData: any[] = [];

  ngOnInit() {
    const beginDay = new Date().getTime();
    for (let i = 0; i < 20; i += 1) {
      this.visitData.push({
        x: format(new Date(beginDay + 1000 * 60 * 60 * 24 * i), 'YYYY-MM-DD'),
        y: Math.floor(Math.random() * 100) + 10,
      });
    }
    this.cdr.detectChanges();
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

  setDate(type: any) {
    this.date_range = getTimeDistance(type);
    setTimeout(() => this.cdr.detectChanges());
  }

  handlePieValueFormat(value: any) {
    return toFixed(value);
  }

  offlineChange(idx: number) {
    if (this.data.offlineData[idx].show !== true) {
      this.data.offlineData[idx].show = true;
      this.cdr.detectChanges();
    }
  }
}
