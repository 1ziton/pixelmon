---
order: 1
title:
  en-US: Basic
  zh-CN: 基础
  bg: f2f4f5
---

基础用法。

```ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'demo-basic',
  template: `
    <form nz-form [formGroup]="validateForm">
      <div nz-row [nzGutter]="8">
        <div nz-col [nzSpan]="8">
          <nz-form-item>
            <nz-form-label [nzSpan]="8">运单号</nz-form-label>
            <nz-form-control [nzSpan]="16">
              <p-input-plus formControlName="waybillNo"></p-input-plus>
            </nz-form-control>
          </nz-form-item>
        </div>
        <div nz-col [nzSpan]="8">
          <nz-form-item>
            <nz-form-label [nzSpan]="8">订单号</nz-form-label>
            <nz-form-control [nzSpan]="16">
              <p-input-plus formControlName="orderNo"></p-input-plus>
            </nz-form-control>
          </nz-form-item>
        </div>
        <div nz-col [nzSpan]="8">
          <nz-form-item>
            <nz-form-label [nzSpan]="8">客户单号</nz-form-label>
            <nz-form-control [nzSpan]="16">
              <p-input-plus formControlName="customerOrderNo"></p-input-plus>
            </nz-form-control>
          </nz-form-item>
        </div>
      </div>
    </form>
    <div nz-row nzType="flex" nzAlign="middle" nzJustify="end">
      <button nz-button nzType="primary" (click)="onOk()">确定</button>
      <button nz-button (click)="onClear()">清空</button>
    </div>
  `,
})
export class DemoBasicComponent implements OnInit {
  validateForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      waybillNo: [null],
      orderNo: [null],
      customerOrderNo: [null],
    });
  }

  onOk() {
    console.log(this.validateForm.value);
  }

  onClear() {
    this.validateForm.reset();
  }
}
```
