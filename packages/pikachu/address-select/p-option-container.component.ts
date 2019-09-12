import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AddressSelectService } from './address-select.service';
import { AddrOption } from './interface';
import { AddrLevelFilterPipe } from './p-option.pipe';

@Component({
  selector: '[p-option-container]',
  exportAs: 'pOptionContainer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
  templateUrl: './p-option-container.component.html',
  host: {
    '[attr.unselectable]': '"unselectable"',
    '[style.user-select]': '"none"',
    '(mousedown)': '$event.preventDefault()',
  },
  styles: [
    `
      .ant-tabs-bar {
        margin-bottom: 10px;
        padding-left: 10px;
        background: #e8e8e8;
        border-bottom: none !important;
      }
      .ant-tabs-tab {
        display: inline-block;
        height: 100%;
        background: transparent !important;
        cursor: pointer;
      }
      .ant-tabs-tab-active {
        background: #fff !important;
      }
      .ant-select-dropdown-menu-root {
        padding: 0 10px 5px 10px;
      }
      .item {
        display: inline-block;
        width: 120px;
        padding: 5px 10px;
      }
    `,
  ],
})
export class AddrOptionContainerComponent implements OnDestroy, OnInit {
  private destroy$ = new Subject();
  @Input() notFoundContent: string;
  @Input() menuItemSelectedIcon: TemplateRef<void>;
  @Output() readonly scrollToBottom = new EventEmitter<void>();

  @Input()
  set level(v: number) {
    this.addrSrv.levelLabels = new AddrLevelFilterPipe().transform(v);
    this.addrSrv.maxLevel = v;
    this.addrSrv.currentLevel = 1;
  }

  clickOption(option: AddrOption): void {
    this.addrSrv.clickOption(option);
  }

  toggleTabs(tab, index: number) {
    if (tab.checked) return;
    this.addrSrv.toggleTab(index);
    this.addrSrv.updateListOfFilteredOption();
  }

  trackLabel(_index: number, option: AddrOption): string | TemplateRef<void> {
    return option.label;
  }

  // tslint:disable-next-line:no-any
  trackValue(_index: number, option: AddrOption): any {
    return option.value;
  }

  constructor(public addrSrv: AddressSelectService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.addrSrv.check$.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.cdr.markForCheck();
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
