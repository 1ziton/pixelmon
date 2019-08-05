import { Directive, Output, EventEmitter, Renderer2, ElementRef } from '@angular/core';

/*tslint:disable */
@Directive({
  selector: '[click.stop]',
})
export class StopPropagationDirective {
  @Output('click.stop') stopPropEvent = new EventEmitter();

  unsubscribe: () => void;

  constructor(
    private renderer: Renderer2, // Angular 2.x导入Renderer
    private element: ElementRef,
  ) {}

  ngOnInit() {
    // 自定义阻止冒泡指令
    this.unsubscribe = this.renderer.listen(this.element.nativeElement, 'click', event => {
      event.stopPropagation();
      this.stopPropEvent.emit(event);
    });
  }

  ngOnDestroy() {
    this.unsubscribe();
  }
}
