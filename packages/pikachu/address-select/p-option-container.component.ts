import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AddressSelectService } from './address-select.service';
import { POption } from './interface';

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
    '[style.padding]': '"10px"',
    '(mousedown)': '$event.preventDefault()',
  },
  styles: [
    `
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
  private lastScrollTop = 0;
  @ViewChild('dropdownUl', { static: true }) dropdownUl: ElementRef<HTMLUListElement>;
  @Input() notFoundContent: string;
  @Input() menuItemSelectedIcon: TemplateRef<void>;
  @Output() readonly scrollToBottom = new EventEmitter<void>();
  clickOption(option: POption): void {
    this.addrSelectService.clickOption(option);
  }
  trackLabel(_index: number, option: POption): string | TemplateRef<void> {
    return option.label;
  }

  // tslint:disable-next-line:no-any
  trackValue(_index: number, option: POption): any {
    return option.value;
  }

  constructor(public addrSelectService: AddressSelectService, private cdr: ChangeDetectorRef, private ngZone: NgZone) {}

  ngOnInit(): void {
    this.addrSelectService.check$.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.cdr.markForCheck();
    });
    this.ngZone.runOutsideAngular(() => {
      const ul = this.dropdownUl.nativeElement;
      fromEvent<MouseEvent>(ul, 'scroll')
        .pipe(takeUntil(this.destroy$))
        .subscribe(e => {
          e.preventDefault();
          e.stopPropagation();
          if (ul && ul.scrollTop > this.lastScrollTop && ul.scrollHeight < ul.clientHeight + ul.scrollTop + 10) {
            this.lastScrollTop = ul.scrollTop;
            this.ngZone.run(() => {
              this.scrollToBottom.emit();
            });
          }
        });
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
