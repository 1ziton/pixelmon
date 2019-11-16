import { Component, OnInit, Input, ChangeDetectionStrategy, ViewEncapsulation, forwardRef, ChangeDetectorRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'p-input-plus',
  exportAs: 'pInputPlus',
  templateUrl: './input-plus.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputPlusComponent),
      multi: true,
    },
  ],
})
export class InputPlusComponent implements OnInit, ControlValueAccessor {
  @Input() placeholder = '';
  @Input() title = '批量添加';

  inputValue = ''; // input 输入框值 是实际双向绑定的值
  textareaValue = ''; // textarea 输入框值

  visible = false;

  onChange: (value: string) => void = () => null;
  onTouched: () => void = () => null;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {}

  /**
   * 组件外部写入值
   * @param value 写入的值
   */
  writeValue(value: string): void {
    this.inputValue = value;
    this.updateTextareaValueByInputValue();
    this.cdr.detectChanges();
  }

  /**
   * 注册onChange回调
   * @param fn onChange回调
   */
  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  /**
   * 注册onTouched回调
   * @param fn onTouched回调
   */
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  /**
   * inputValue改变回调
   */
  inputValueChange() {
    this.updateTextareaValueByInputValue();
    this.onChange(this.inputValue);
  }

  /**
   * textareaValue改变回调
   */
  textareaValueChange() {
    this.updateInputValueByTextareaValue();
    this.onChange(this.inputValue);
  }

  /**
   * 根据inputValue更新textareaValue
   */
  updateInputValueByTextareaValue() {
    this.inputValue = this.textareaValue;

    if (typeof this.inputValue === 'string') {
      this.inputValue = this.inputValue.replace(/\n/g, ',');
    }
  }

  /**
   * 根据textareaValue更新inputValue
   */
  updateTextareaValueByInputValue() {
    this.textareaValue = this.inputValue;

    if (typeof this.textareaValue === 'string') {
      this.textareaValue = this.textareaValue.replace(/,|，/g, '\n');
    }
  }

  /**
   * 点击确定按钮回调
   */
  onOk() {
    this.visible = false;
  }

  /**
   * 点击清空按钮回调
   */
  onClear() {
    this.inputValue = '';
    this.textareaValue = '';
    this.onChange('');
  }
}
