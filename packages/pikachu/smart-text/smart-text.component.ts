/**
 * @Description: 智能显示文本，超过最大字数自动shortcut并tooltip
 * @Author: zomixi
 * @Date: 2019-07-08 10:04:13
 */

import { Component, Input } from '@angular/core';

@Component({
  selector: 'smart-text',
  templateUrl: './smart-text.component.html',
})
export class SmartTextComponent {
  protected _text = '';

  @Input() maxLength = 20;
  @Input() tail = '...';
  @Input() set text(value) {
    if (value === undefined || value === null) {
      this._text = '';
    } else {
      this._text = String(value);
    }
  }

  get text() {
    return this._text;
  }
}
