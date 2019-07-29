import { Directive, Input, ElementRef, Renderer2, Attribute, TemplateRef, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

@Directive({
  selector: '[pageSelector]'
})
export class SetPageHeightDirective implements OnInit, OnDestroy {
  listenHeight: Subscription;
  @Input() pageSelector: TemplateRef<ElementRef>;
  // 页面缩小时高度不再变化的临界值
  @Input() minHeight = '500px';
  // 内容高度限制，使用弹窗，默认header和nav的距离为固定160
  @Input() contentHeight = 160;

  constructor(private el: ElementRef,
    private rd2: Renderer2) { }

  ngOnInit() {
    this.getHeight();
    this.listenHeight = Observable.fromEvent(window, 'resize').subscribe(e => {
      this.getHeight();
    });
  }

  ngOnDestroy() {
    this.listenHeight.unsubscribe();
  }

  getHeight() {
    let con: any = this.pageSelector
    // header和nav的距离为固定160
    let height: Number = document.body.clientHeight - this.contentHeight;
    height < parseInt(this.minHeight, 10) ? this.rd2.setStyle(con, 'height', this.minHeight) : this.rd2.setStyle(con, 'height', height + 'px');

  }
}
