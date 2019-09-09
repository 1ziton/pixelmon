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
import { PSelectTopControlComponent } from './p-select-top-control.component';
import { POption } from './interface';

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
    '[class.ant-select-lg]': 'nzSize==="large"',
    '[class.ant-select-sm]': 'nzSize==="small"',
    '[class.ant-select-enabled]': '!nzDisabled',
    '[class.ant-select-no-arrow]': '!nzShowArrow',
    '[class.ant-select-disabled]': 'nzDisabled',
    '[class.ant-select-allow-clear]': 'nzAllowClear',
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
  open = false;
  // tslint:disable-next-line:no-any
  value: any | any[];
  dropDownPosition: 'top' | 'center' | 'bottom' = 'bottom';
  triggerWidth: number;
  private _data: POption[] = [];
  private _disabled = false;
  private _autoFocus = false;
  private isInit = false;
  private destroy$ = new Subject();
  @ViewChild(CdkOverlayOrigin, { static: false }) cdkOverlayOrigin: CdkOverlayOrigin;
  @ViewChild(CdkConnectedOverlay, { static: false }) cdkConnectedOverlay: CdkConnectedOverlay;
  @ViewChild(PSelectTopControlComponent, { static: true }) nzSelectTopControlComponent: PSelectTopControlComponent;
  // tslint:disable-next-line: jsdoc-format
  /** should move to nz-option-container when https://github.com/angular/angular/issues/20810 resolved **/
  @Output() readonly nzOnSearch = new EventEmitter<string>();
  @Output() readonly nzScrollToBottom = new EventEmitter<void>();
  @Output() readonly nzOpenChange = new EventEmitter<boolean>();
  @Output() readonly nzBlur = new EventEmitter<void>();
  @Output() readonly nzFocus = new EventEmitter<void>();

  @Input() nzSize: NzSizeLDSType = 'default';
  @Input() nzDropdownClassName: string;
  @Input() nzDropdownMatchSelectWidth = true;
  @Input() nzDropdownStyle: { [key: string]: string };
  @Input() nzNotFoundContent: string;
  @Input() @InputBoolean() nzAllowClear = false;
  @Input() @InputBoolean() nzShowSearch = false;
  @Input() @InputBoolean() nzLoading = false;
  @Input() nzPlaceHolder: string;
  @Input() nzMaxTagCount: number;
  @Input() nzSuffixIcon: TemplateRef<void>;
  @Input() nzClearIcon: TemplateRef<void>;
  @Input() nzRemoveIcon: TemplateRef<void>;
  @Input() nzMenuItemSelectedIcon: TemplateRef<void>;
  @Input() nzShowArrow = true;
  @Input() nzTokenSeparators: string[] = [];
  // tslint:disable-next-line:no-any
  @Input() nzMaxTagPlaceholder: TemplateRef<{ $implicit: any[] }>;

  @Input()
  set data(d: POption[]) {
    this._data = d;
    setTimeout(() => {
      this.addrSelectService.updateTemplateOption(this._data);
    });
  }

  @Input()
  set nzAutoClearSearchValue(value: boolean) {
    this.addrSelectService.autoClearSearchValue = toBoolean(value);
  }

  @Input()
  set nzMaxMultipleCount(value: number) {
    this.addrSelectService.maxMultipleCount = value;
  }

  @Input()
  set nzServerSearch(value: boolean) {
    this.addrSelectService.serverSearch = toBoolean(value);
  }

  @Input()
  set nzMode(value: 'default' | 'multiple' | 'tags') {
    this.addrSelectService.mode = value;
    this.addrSelectService.check();
  }

  @Input()
  set nzFilterOption(value: any) {
    this.addrSelectService.filterOption = value;
  }

  @Input()
  // tslint:disable-next-line:no-any
  set compareWith(value: (o1: any, o2: any) => boolean) {
    this.addrSelectService.compareWith = value;
  }

  @Input()
  set nzAutoFocus(value: boolean) {
    this._autoFocus = toBoolean(value);
    this.updateAutoFocus();
  }

  get nzAutoFocus(): boolean {
    return this._autoFocus;
  }

  @Input()
  set nzOpen(value: boolean) {
    this.open = value;
    this.addrSelectService.setOpenState(value);
  }

  @Input()
  set nzDisabled(value: boolean) {
    this._disabled = toBoolean(value);
    this.addrSelectService.disabled = this._disabled;
    this.addrSelectService.check();
    if (this.nzDisabled && this.isInit) {
      this.closeDropDown();
    }
  }

  get nzDisabled(): boolean {
    return this._disabled;
  }

  onChange: (value: string | string[]) => void = () => null;
  onTouched: () => void = () => null;

  updateAutoFocus(): void {
    if (this.nzSelectTopControlComponent.inputElement) {
      if (this.nzAutoFocus) {
        this.renderer.setAttribute(this.nzSelectTopControlComponent.inputElement.nativeElement, 'autofocus', 'autofocus');
      } else {
        this.renderer.removeAttribute(this.nzSelectTopControlComponent.inputElement.nativeElement, 'autofocus');
      }
    }
  }

  focus(): void {
    if (this.nzSelectTopControlComponent.inputElement) {
      this.focusMonitor.focusVia(this.nzSelectTopControlComponent.inputElement, 'keyboard');
      this.nzFocus.emit();
    }
  }

  blur(): void {
    if (this.nzSelectTopControlComponent.inputElement) {
      this.nzSelectTopControlComponent.inputElement.nativeElement.blur();
      this.nzBlur.emit();
    }
  }

  onKeyDown(event: KeyboardEvent): void {
    this.addrSelectService.onKeyDown(event);
  }

  toggleDropDown(): void {
    if (!this.nzDisabled) {
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
      this.triggerWidth = this.cdkOverlayOrigin.elementRef.nativeElement.getBoundingClientRect().width + 70;
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

  /** update ngModel -> update listOfSelectedValue */
  // tslint:disable-next-line:no-any
  writeValue(value: any | any[]): void {
    this.value = value;
    let listValue: any[] = []; // tslint:disable-line:no-any
    if (isNotNil(value)) {
      if (Array.isArray(value)) {
        listValue = value;
      } else {
        listValue = [value];
      }
    }
    this.addrSelectService.updateListOfSelectedValue(listValue, false);
    this.cdr.markForCheck();
  }

  registerOnChange(fn: (value: string | string[]) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.nzDisabled = isDisabled;
    this.cdr.markForCheck();
  }

  ngOnInit(): void {
    this.addrSelectService.searchValue$.pipe(takeUntil(this.destroy$)).subscribe(data => {
      this.nzOnSearch.emit(data);
      this.updateCdkConnectedOverlayPositions();
    });
    this.addrSelectService.modelChange$.pipe(takeUntil(this.destroy$)).subscribe(modelValue => {
      if (this.value !== modelValue) {
        this.value = modelValue;
        this.onChange(this.value);
        this.updateCdkConnectedOverlayPositions();
      }
    });
    this.addrSelectService.open$.pipe(takeUntil(this.destroy$)).subscribe(value => {
      if (this.open !== value) {
        this.nzOpenChange.emit(value);
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
