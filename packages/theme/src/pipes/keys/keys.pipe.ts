import { Pipe, PipeTransform } from '@angular/core';

/**
 * @see https://1ziton.com/theme/keys
 */
@Pipe({ name: 'keys' })
export class KeysPipe implements PipeTransform {
  transform(value: any, keyIsNumber: boolean = false): any[] {
    const ret: any[] = [];
    // tslint:disable-next-line: forin
    for (const key in value) {
      ret.push({ key: keyIsNumber ? +key : key, value: value[key] });
    }
    return ret;
  }
}
