import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { _HttpClient } from '@pixelmon/theme';
import { deepCopy } from '@pixelmon/util';
import { NzMessageService } from 'ng-zorro-antd';


@Component({
  selector: 'block-statistic-card',
  templateUrl: './statistic-card.component.html',
  styleUrls: ['./statistic-card.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatisticCardBlockComponent implements OnInit {
  constructor(private http: _HttpClient, public msg: NzMessageService, private cdr: ChangeDetectorRef) {}
  data: any = { visitData: [] };
  loading = true;

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
}
