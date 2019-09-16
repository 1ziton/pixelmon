import { FocusMonitor } from '@angular/cdk/a11y';
import { CdkConnectedOverlay, CdkOverlayOrigin, ConnectedOverlayPositionChange } from '@angular/cdk/overlay';
import { Platform } from '@angular/cdk/platform';
import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Host,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  Renderer2,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { InputBoolean, isNotNil, NzNoAnimationDirective, NzSizeLDSType, slideMotion, toBoolean } from 'ng-zorro-antd/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AddressSelectService } from './address-select.service';
import { AddrSelectTopControlComponent } from './p-select-top-control.component';

@Component({
  selector: 'p-address-select',
  exportAs: 'pAddressSelect',
  preserveWhitespaces: false,
  providers: [
    AddressSelectService,
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AddressSelectComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  animations: [slideMotion],
  templateUrl: './address-select.component.html',
  host: {
    '[class.ant-select-lg]': 'size==="large"',
    '[class.ant-select-sm]': 'size==="small"',
    '[class.ant-select-enabled]': '!disabled',
    '[class.ant-select-no-arrow]': '!showArrow',
    '[class.ant-select-disabled]': 'disabled',
    '[class.ant-select-allow-clear]': 'allowClear',
    '[class.ant-select-open]': 'open',
    '(click)': 'toggleDropDown()',
  },
  styles: [
    `
      .ant-select-dropdown {
        top: 100%;
        left: 0;
        position: relative;
        width: 100%;
        margin-top: 4px;
        margin-bottom: 4px;
      }
    `,
  ],
})
export class AddressSelectComponent implements ControlValueAccessor, OnInit, AfterViewInit, OnDestroy, AfterContentInit {
  _open = false;
  // tslint:disable-next-line:no-any
  value: any | any[];
  dropDownPosition: 'top' | 'center' | 'bottom' = 'bottom';
  triggerWidth: number;
  private _disabled = false;
  private _autoFocus = false;
  private isInit = false;
  private destroy$ = new Subject();
  @ViewChild(CdkOverlayOrigin, { static: false }) cdkOverlayOrigin: CdkOverlayOrigin;
  @ViewChild(CdkConnectedOverlay, { static: false }) cdkConnectedOverlay: CdkConnectedOverlay;
  @ViewChild(AddrSelectTopControlComponent, { static: true }) panelTopControlComponent: AddrSelectTopControlComponent;
  // tslint:disable-next-line: jsdoc-format
  /** should move to nz-option-container when https://github.com/angular/angular/issues/20810 resolved **/
  // tslint:disable-next-line: no-output-on-prefix
  @Output() readonly onSearch = new EventEmitter<string>();
  @Output() readonly scrollToBottom = new EventEmitter<void>();
  @Output() readonly openChange = new EventEmitter<boolean>();
  @Output() readonly pBlur = new EventEmitter<void>();
  @Output() readonly pFocus = new EventEmitter<void>();

  @Input() size: NzSizeLDSType = 'default';
  @Input() level: number = 3;

  @Input() dropdownClassName: string;
  @Input() dropdownMatchSelectWidth = false;
  @Input() dropdownStyle: { [key: string]: string };
  @Input() notFoundContent: string;
  @Input() @InputBoolean() allowClear = true;
  @Input() @InputBoolean() showSearch = false;
  @Input() @InputBoolean() loading = false;
  @Input() placeHolder: string;
  @Input() suffixIcon: TemplateRef<void>;
  @Input() clearIcon: TemplateRef<void>;
  @Input() removeIcon: TemplateRef<void>;
  @Input() menuItemSelectedIcon: TemplateRef<void>;
  @Input() showArrow = true;

  @Input()
  set autoClearSearchValue(value: boolean) {
    this.addrSelectService.autoClearSearchValue = toBoolean(value);
  }

  @Input()
  set serverSearch(value: boolean) {
    this.addrSelectService.serverSearch = toBoolean(value);
  }

  @Input()
  set filterOption(value: any) {
    this.addrSelectService.filterOption = value;
  }
  
  @Input()
  set separator(value: string) {
    this.addrSelectService.separator = value;
  }

  @Input()
  // tslint:disable-next-line:no-any
  set compareWith(value: (o1: any, o2: any) => boolean) {
    this.addrSelectService.compareWith = value;
  }

  @Input()
  set autoFocus(value: boolean) {
    this._autoFocus = toBoolean(value);
    this.updateAutoFocus();
  }

  get autoFocus(): boolean {
    return this._autoFocus;
  }

  @Input()
  set open(value: boolean) {
    this._open = value;
    this.addrSelectService.setOpenState(value);
  }

  @Input()
  set disabled(value: boolean) {
    this._disabled = toBoolean(value);
    this.addrSelectService.disabled = this._disabled;
    this.addrSelectService.check();
    if (this.disabled && this.isInit) {
      this.closeDropDown();
    }
  }

  get disabled(): boolean {
    return this._disabled;
  }

  onChange: (value: string | string[]) => void = () => null;
  onTouched: () => void = () => null;

  updateAutoFocus(): void {
    if (this.panelTopControlComponent.inputElement) {
      if (this.autoFocus) {
        this.renderer.setAttribute(this.panelTopControlComponent.inputElement.nativeElement, 'autofocus', 'autofocus');
      } else {
        this.renderer.removeAttribute(this.panelTopControlComponent.inputElement.nativeElement, 'autofocus');
      }
    }
  }

  focus(): void {
    if (this.panelTopControlComponent.inputElement) {
      this.focusMonitor.focusVia(this.panelTopControlComponent.inputElement, 'keyboard');
      this.pFocus.emit();
    }
  }

  blur(): void {
    if (this.panelTopControlComponent.inputElement) {
      this.panelTopControlComponent.inputElement.nativeElement.blur();
      this.pBlur.emit();
    }
  }

  toggleDropDown(): void {
    if (!this.disabled) {
      this.addrSelectService.setOpenState(!this.open);
    }
  }

  closeDropDown(): void {
    this.addrSelectService.setOpenState(false);
  }

  onPositionChange(position: ConnectedOverlayPositionChange): void {
    this.dropDownPosition = position.connectionPair.originY;
  }

  updateCdkConnectedOverlayStatus(): void {
    if (this.platform.isBrowser) {
      const triggerWidth = this.cdkOverlayOrigin.elementRef.nativeElement.getBoundingClientRect().width;
      this.triggerWidth = this.dropdownMatchSelectWidth ? triggerWidth : triggerWidth + 75;
    }
  }

  updateCdkConnectedOverlayPositions(): void {
    setTimeout(() => {
      if (this.cdkConnectedOverlay && this.cdkConnectedOverlay.overlayRef) {
        this.cdkConnectedOverlay.overlayRef.updatePosition();
      }
    });
  }

  constructor(
    private renderer: Renderer2,
    public addrSelectService: AddressSelectService,
    private cdr: ChangeDetectorRef,
    private focusMonitor: FocusMonitor,
    private platform: Platform,
    elementRef: ElementRef,
    @Host() @Optional() public noAnimation?: NzNoAnimationDirective,
  ) {
    renderer.addClass(elementRef.nativeElement, 'ant-select');
  }

  /** update ngModel -> update selectedOption */
  writeValue(value: any | any[]): void {
    this.value = value;
    let listValue: any[] = []; 
    if (isNotNil(value)) {
      if (Array.isArray(value)) {
        listValue = value;
      } else {
        listValue = [value];
      }
    }
    this.addrSelectService.updateListOfSelectedValue(listValue, false);
    if (value) {
      this.addrSelectService.updateSelectedOptionByCode(value);
    }
    this.cdr.markForCheck();
  }

  registerOnChange(fn: (value: string | string[]) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this.cdr.markForCheck();
  }

  ngOnInit(): void {
    // 获取一级地址数据
    this.addrSelectService.getListByCode('', 0);
    this.addrSelectService.searchValue$.pipe(takeUntil(this.destroy$)).subscribe(data => {
      this.onSearch.emit(data);
      this.updateCdkConnectedOverlayPositions();
    });
    this.addrSelectService.modelChange$.pipe(takeUntil(this.destroy$)).subscribe(modelValue => {
      if (this.value !== modelValue) {
        this.value = modelValue;
        this.onChange(this.value);
        this.updateCdkConnectedOverlayPositions();
        // this.cdr.detectChanges();
      }
    });
    this.addrSelectService.open$.pipe(takeUntil(this.destroy$)).subscribe(value => {
      if (this.open !== value) {
        this.openChange.emit(value);
      }
      if (value) {
        this.focus();
        this.updateCdkConnectedOverlayStatus();
      } else {
        this.blur();
        this.onTouched();
      }
      this.open = value;
      this.addrSelectService.clearInput();
    });
    this.addrSelectService.check$.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.cdr.markForCheck();
    });
  }

  ngAfterViewInit(): void {
    this.updateCdkConnectedOverlayStatus();
    this.isInit = true;
  }

  ngAfterContentInit(): void {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
