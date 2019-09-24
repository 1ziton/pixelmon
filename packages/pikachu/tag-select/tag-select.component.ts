import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { InputBoolean } from '@pixelmon/util';

@Component({
  selector: 'tag-select',
  exportAs: 'tagSelect',
  templateUrl: './tag-select.component.html',
  host: {
    '[class.tag-select]': 'true',
    '[class.tag-select__has-expand]': 'expandable',
    '[class.tag-select__expanded]': 'expand',
  },
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class TagSelectComponent {
  expand = false;

  /** 是否启用 `展开与收进` */
  @Input() @InputBoolean() expandable = true;
  @Output() readonly change = new EventEmitter<boolean>();

  constructor() {}

  trigger() {
    this.expand = !this.expand;
    this.change.emit(this.expand);
  }
}
