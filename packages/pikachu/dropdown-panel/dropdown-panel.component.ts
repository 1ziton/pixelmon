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
import { DropdownPanelService } from './dropdown-panel.service';
import { PanelSelectTopControlComponent } from './p-panel-top-control.component';
import { POption } from './interface';

@Component({
  selector: 'p-dropdown-panel',
  exportAs: 'pDropdownPanel',
  preserveWhitespaces: false,
  providers: [
    DropdownPanelService,
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropdownPanelComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  animations: [slideMotion],
  templateUrl: './dropdown-panel.component.html',
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
export class DropdownPanelComponent implements ControlValueAccessor, OnInit, AfterViewInit, OnDestroy, AfterContentInit {
  _open = false;
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
  @ViewChild(PanelSelectTopControlComponent, { static: true }) panelTopControlComponent: PanelSelectTopControlComponent;
  // tslint:disable-next-line: jsdoc-format
  /** should move to nz-option-container when https://github.com/angular/angular/issues/20810 resolved **/
  // tslint:disable-next-line: no-output-on-prefix
  @Output() readonly onSearch = new EventEmitter<string>();
  @Output() readonly scrollToBottom = new EventEmitter<void>();
  @Output() readonly openChange = new EventEmitter<boolean>();
  @Output() readonly pBlur = new EventEmitter<void>();
  @Output() readonly pFocus = new EventEmitter<void>();

  @Input() size: NzSizeLDSType = 'default';
  @Input() dropdownClassName: string;
  @Input() dropdownMatchSelectWidth = false;
  @Input() dropdownStyle: { [key: string]: string };
  @Input() notFoundContent: string;
  @Input() @InputBoolean() allowClear = true;
  @Input() @InputBoolean() showSearch = false;
  @Input() @InputBoolean() loading = false;
  @Input() placeHolder: string;
  @Input() maxTagCount: number;
  @Input() suffixIcon: TemplateRef<void>;
  @Input() clearIcon: TemplateRef<void>;
  @Input() removeIcon: TemplateRef<void>;
  @Input() menuItemSelectedIcon: TemplateRef<void>;
  @Input() showArrow = true;

  @Input()
  set data(d: POption[]) {
    this._data = d;
    setTimeout(() => {
      this.dropPanelService.updateTemplateOption(this._data);
    });
  }

  @Input()
  set autoClearSearchValue(value: boolean) {
    this.dropPanelService.autoClearSearchValue = toBoolean(value);
  }

  @Input()
  set maxMultipleCount(value: number) {
    this.dropPanelService.maxMultipleCount = value;
  }

  @Input()
  set serverSearch(value: boolean) {
    this.dropPanelService.serverSearch = toBoolean(value);
  }

  @Input()
  set mode(value: 'default' | 'multiple' | 'tags') {
    this.dropPanelService.mode = value;
    this.dropPanelService.check();
  }

  @Input()
  set filterOption(value: any) {
    this.dropPanelService.filterOption = value;
  }

  @Input()
  // tslint:disable-next-line:no-any
  set compareWith(value: (o1: any, o2: any) => boolean) {
    this.dropPanelService.compareWith = value;
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
    this.dropPanelService.setOpenState(value);
  }

  @Input()
  set disabled(value: boolean) {
    this._disabled = toBoolean(value);
    this.dropPanelService.disabled = this._disabled;
    this.dropPanelService.check();
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

  onKeyDown(event: KeyboardEvent): void {
    this.dropPanelService.onKeyDown(event);
  }

  toggleDropDown(): void {
    if (!this.disabled) {
      this.dropPanelService.setOpenState(!this.open);
    }
  }

  closeDropDown(): void {
    this.dropPanelService.setOpenState(false);
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
    public dropPanelService: DropdownPanelService,
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
    this.dropPanelService.updateListOfSelectedValue(listValue, false);
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
    this.dropPanelService.searchValue$.pipe(takeUntil(this.destroy$)).subscribe(data => {
      this.onSearch.emit(data);
      this.updateCdkConnectedOverlayPositions();
    });
    this.dropPanelService.modelChange$.pipe(takeUntil(this.destroy$)).subscribe(modelValue => {
      if (this.value !== modelValue) {
        this.value = modelValue;
        this.onChange(this.value);
        this.updateCdkConnectedOverlayPositions();
        // this.cdr.detectChanges();
      }
    });
    this.dropPanelService.open$.pipe(takeUntil(this.destroy$)).subscribe(value => {
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
      this.dropPanelService.clearInput();
    });
    this.dropPanelService.check$.pipe(takeUntil(this.destroy$)).subscribe(() => {
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
