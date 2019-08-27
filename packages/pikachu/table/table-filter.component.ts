import { Component, OnInit, ContentChild, TemplateRef, Input } from '@angular/core';

@Component({
  selector: 'p-tableFilter',
  template: '<ng-content> </ng-content>',
})
export class TableFilterComponent implements OnInit {
  @Input() field = ''; // 对应域
  @ContentChild(TemplateRef, { static: false }) templateRef: TemplateRef<any>; // 模板

  constructor() {}

  ngOnInit() {}
}
