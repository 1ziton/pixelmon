import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Host,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { NzNoAnimationDirective, zoomMotion } from 'ng-zorro-antd/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AddressSelectService } from './address-select.service';

@Component({
  selector: '[p-select-top-control]',
  templateUrl: './p-select-top-control.component.html',
  exportAs: 'nzSelectTopControl',
  preserveWhitespaces: false,
  animations: [zoomMotion],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class AddrSelectTopControlComponent implements OnInit, OnDestroy {
  inputValue: string;
  isComposing = false;
  private destroy$ = new Subject();
  @ViewChild('inputElement', { static: false }) inputElement: ElementRef;
  @Input() showSearch = false;
  @Input() placeHolder: string;
  @Input() open = false;
  @Input() allowClear = false;
  @Input() showArrow = true;
  @Input() loading = false;
  @Input() suffixIcon: TemplateRef<void>;
  @Input() clearIcon: TemplateRef<void>;
  @Input() removeIcon: TemplateRef<void>;

  onClearSelection(e: MouseEvent): void {
    e.stopPropagation();
    this.addrSelectService.updateListOfSelectedValue([], true);
  }

  setInputValue(value: string): void {
    /** fix clear value https://github.com/NG-ZORRO/ng-zorro-antd/issues/3825 */
    if (this.inputElement && !value) {
      this.inputElement.nativeElement.value = value;
    }
    this.inputValue = value;
    this.addrSelectService.updateSearchValue(value);
  }

  get placeHolderDisplay(): string {
    return this.inputValue || this.isComposing || this.addrSelectService.listOfSelectedValue.length ? 'none' : 'block';
  }

  get selectedValueStyle(): { [key: string]: string } {
    let showSelectedValue = false;
    let opacity = 1;
    if (!this.showSearch) {
      showSelectedValue = true;
    } else {
      if (this.open) {
        showSelectedValue = !(this.inputValue || this.isComposing);
        if (showSelectedValue) {
          opacity = 0.4;
        }
      } else {
        showSelectedValue = true;
      }
    }
    return {
      display: showSelectedValue ? 'block' : 'none',
      opacity: `${opacity}`,
    };
  }

  // tslint:disable-next-line:no-any
  trackValue(_index: number, option: any): any {
    return option.value;
  }

  removeSelectedValue(option: any, e: MouseEvent): void {
    this.addrSelectService.removeValueFormSelected(option);
    e.stopPropagation();
  }

  constructor(
    public addrSelectService: AddressSelectService,
    private cdr: ChangeDetectorRef,
    @Host() @Optional() public noAnimation?: NzNoAnimationDirective,
  ) {}

  ngOnInit(): void {
    this.addrSelectService.open$.pipe(takeUntil(this.destroy$)).subscribe(open => {
      if (this.inputElement && open) {
        setTimeout(() => this.inputElement.nativeElement.focus());
      }
    });
    this.addrSelectService.clearInput$.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.setInputValue('');
    });
    this.addrSelectService.check$.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.cdr.markForCheck();
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
