import { AbstractControl, ValidationErrors } from '@angular/forms';
import { isDecimal, isIdCard, isInt, isMobile, isNum, isUrl, isBase64, isCreditCard, isEmail, isUUID, isTelPhone } from './validate';

/** 一套日常验证器 */
// tslint:disable-next-line:class-name
export class _Validators {
  /** 是否为数字 */
  static num(control: AbstractControl): ValidationErrors | null {
    return isNum(control.value) ? null : { num: true };
  }

  /** 是否为整数 */
  static int(control: AbstractControl): ValidationErrors | null {
    return isInt(control.value) ? null : { int: true };
  }

  /** 是否为小数 */
  static decimal(control: AbstractControl): ValidationErrors | null {
    return isDecimal(control.value) ? null : { decimal: true };
  }

  /** 是否为身份证 */
  static idCard(control: AbstractControl): ValidationErrors | null {
    return isIdCard(control.value) ? null : { idCard: true };
  }

  /** 是否为手机号 */
  static mobile(control: AbstractControl): ValidationErrors | null {
    return isMobile(control.value) ? null : { mobile: true };
  }

  /**
   * 是否为手机号/座机/或有特殊符号分隔的电话号码
   * @param which 号码类型
   */
  static telPhone(which?: any) {
    return (control: AbstractControl): ValidationErrors | null => {
      return isTelPhone(which, control.value) ? null : { telPhone: true };
    };
  }

  /** 是否URL地址 */
  static url(control: AbstractControl): ValidationErrors | null {
    return isUrl(control.value) ? null : { url: true };
  }

  /** 是否base64编码 */
  static base64(control: AbstractControl): ValidationErrors | null {
    return isBase64(control.value) ? null : { base64: true };
  }

  /** 是否银行卡 */
  static creditCard(control: AbstractControl): ValidationErrors | null {
    return isCreditCard(control.value) ? null : { creditCard: true };
  }

  /** 是否email */
  static email(control: AbstractControl): ValidationErrors | null {
    return isEmail(control.value) ? null : { email: true };
  }

  /** 是否全等 */
  static equal(val: any) {
    return (control: AbstractControl): ValidationErrors | null => {
      const v: any = control.value;
      return val === v ? null : { equal: true };
    };
  }

  /** 是否大于某个数 */
  static gt(val: number) {
    return (control: AbstractControl): ValidationErrors | null => {
      const v: any = control.value;
      return +v > +val ? null : { gt: true };
    };
  }

  /** 是否大于等于某个数 */
  static gte(val: number) {
    return (control: AbstractControl): ValidationErrors | null => {
      const v: any = control.value;
      return +v >= +val ? null : { gte: true };
    };
  }

  /** 是否小于某个数 */
  static lt(val: number) {
    return (control: AbstractControl): ValidationErrors | null => {
      const v: any = control.value;
      return +v < +val ? null : { lt: true };
    };
  }

  /** 是否小于等于某个数 */
  static lte(val: number) {
    return (control: AbstractControl): ValidationErrors | null => {
      const v: any = control.value;
      return +v <= +val ? null : { lte: true };
    };
  }

  /** 是否在指定区间内 */
  static range(val: Array<number>) {
    return (control: AbstractControl): ValidationErrors | null => {
      const v: any = control.value;
      return +v >= val[0] && +v <= val[1] ? null : { range: true };
    };
  }

  /** 是否uuid */
  static uuid(control: AbstractControl): ValidationErrors | null {
    return isUUID(control.value) ? null : { uuid: true };
  }
}
