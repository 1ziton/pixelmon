/**
 * @Description: 主要用于把英文枚举转成中文
 * @Author: zomixi
 * @Date: 2019-05-15 14:39:06
 */

import { Pipe, PipeTransform, NgModule } from '@angular/core';
const ENUM_FIELDS = [];

@Pipe({
  name: 'translate',
})
export class TranslatePipe implements PipeTransform {
  transform(rawValue: any, _lexicon: { value: any; label: string }[]) {
    const lexicon = [..._lexicon, ...ENUM_FIELDS];

    let newValue: any = '';

    if (Array.isArray(rawValue)) {
      newValue = rawValue.map(value => translate(value, lexicon));
      newValue = newValue.join(',');
    } else {
      newValue = translate(rawValue, lexicon);
    }

    return newValue;
  }
}

function translate(rawValue: any, lexicon: { value: any; label: string }[]) {
  if (rawValue === null || rawValue === undefined) {
    return rawValue;
  }

  let newValue = '';

  // tslint:disable-next-line:prefer-for-of
  for (let index = 0; index < lexicon.length; index++) {
    const element = lexicon[index];

    if (element.value === rawValue) {
      newValue = element.label;
      return newValue;
    }
  }

  return rawValue;
}

@NgModule({
  declarations: [TranslatePipe],
  exports: [TranslatePipe],
})
export class TranslatePipeModule {}
