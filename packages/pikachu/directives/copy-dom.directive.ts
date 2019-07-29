import { Directive, Input, HostListener } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';

/*tslint:disable */
@Directive({
  selector: '[copy-dom]'
})
export class CopyDomDirective {
  @Input("copy-dom") copyDom: string;

  constructor(private message: NzMessageService) {
  }

  @HostListener('copy')
  getContent() {
    const input = document.createElement('input');
    document.body.appendChild(input);
    input.setAttribute('value', this.copyDom);
    input.select();
    if (document.execCommand('copy')) {
      document.execCommand('copy');
      this.message.success(`复制成功，内容：${this.copyDom}`)
    }
    document.body.removeChild(input);
  }
}
