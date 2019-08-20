/**
 * @Description: 切割文本
 * @Author: zomixi
 * @Date: 2019-07-08 11:18:59
 */

import { Pipe, PipeTransform, NgModule } from '@angular/core';

@Pipe({
  name: 'shortcut',
})
export class ShortcutPipe implements PipeTransform {
  /**
   *
   * @param value 源文本
   * @param maxLength 最大长度，默认20
   * @param tail 切割后显示的尾部，默认...
   */
  transform(value: string, maxLength = 20, tail = '...'): any {
    if (!value) {
      return '';
    }
    if (value.length <= maxLength) {
      return value;
    }

    return String(value).substr(0, maxLength) + tail;
  }
}

@NgModule({
  declarations: [ShortcutPipe],
  exports: [ShortcutPipe],
})
export class ShortcutPipeModule {}
