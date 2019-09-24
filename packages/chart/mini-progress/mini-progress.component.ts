import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  ViewEncapsulation,
} from '@angular/core';
import { PixelmonLocaleService } from '@pixelmon/theme';
import { toNumber, InputNumber } from '@pixelmon/util';

@Component({
  selector: 'g2-mini-progress',
  exportAs: 'g2MiniProgress',
  templateUrl: './mini-progress.component.html',
  host: { '[class.g2-mini-progress]': 'true' },
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class G2MiniProgressComponent implements OnChanges {
  @Input() color = '#1890FF';
  @Input() @InputNumber() target: number;
  @Input() @InputNumber() percent: number;
  @Input() @InputNumber() strokeWidth: number;

  constructor(public i18n: PixelmonLocaleService, private cdr: ChangeDetectorRef) {}

  private fixNum(value: number) {
    return Math.min(Math.max(toNumber(value), 0), 100);
  }

  ngOnChanges() {
    this.target = this.fixNum(this.target);
    this.percent = this.fixNum(this.percent);
    this.cdr.detectChanges();
  }
}
