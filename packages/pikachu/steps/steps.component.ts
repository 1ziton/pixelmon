import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
  ElementRef,
  OnChanges,
  SimpleChanges,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';
import { Step } from './steps.interface';
import { DomHandler } from '@pixelmon/util';

@Component({
  selector: 'p-steps',
  exportAs: 'pSteps',
  templateUrl: './steps.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepsComponent implements OnInit, OnChanges {
  @Input() activeBackground = '#1ECB8E';
  @Input() activeWidth = '0%';
  @Input() inactiveBackground = '#EAF0F0';
  @Input() backgroundImage = '';

  @Input() activePointTemplate: TemplateRef<void>;
  @Input() activePointColor = '#1ECB8E';
  @Input() activeContentColor = '#FFFFFF';
  @Input() activeContentBackground = '#1ECB8E';
  @Input() activeContentAlign: 'left' | 'right';
  @Input() activeStep: Step;

  @Input() keyPointTemplate: TemplateRef<void>;
  @Input() keyPointColor = '#1ECB8E';
  @Input() keyContentColor = '#999999';
  @Input() keyContentBackground = 'transparent';
  @Input() keySteps: Step[] = [];

  @Input() extraPointTemplate: TemplateRef<void>;
  @Input() extraPointColor = '#F5A623';
  @Input() extraContentColor = '#333333';
  @Input() extraContentBackground = '#FFFFFF';
  @Input() extraContentAlign: 'left' | 'right';
  @Input() extraSteps: Step[] = [];

  constructor(private _el: ElementRef) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.activeStep) {
      setTimeout(() => {
        this.updateContentAlign('.p-steps-active-step-content', [this.activeStep]);
      });
    }
    if (changes.extraSteps) {
      setTimeout(() => {
        this.updateContentAlign('.p-steps-extra-step-content', this.extraSteps);
      });
    }
  }

  ngOnInit() {}

  /**
   * 更新对齐
   * @param contentSelector content的选择器
   * @param steps 对应的steps
   */
  updateContentAlign(contentSelector: string, steps: Step[]) {
    const container = this._el.nativeElement.querySelector('.p-steps');

    if (!container) {
      return;
    }

    const containerWidth = DomHandler.getOuterWidth(container);
    const containerOffsetLeft = DomHandler.getOffset(container).left;

    const contents = this._el.nativeElement.querySelectorAll(contentSelector);

    if (!contents) {
      return;
    }

    for (let index = 0; index < contents.length; index++) {
      const content = contents[index];
      const contentWidth = DomHandler.getOuterWidth(content);
      const contentOffsetLeft = DomHandler.getOffset(content).left;

      // 原则是能尽量左对齐
      if (steps[index].smartContentAlign === 'right') {
        if (contentWidth * 2 + contentOffsetLeft < containerWidth + containerOffsetLeft) {
          // 左对齐
          steps[index].smartContentAlign = 'left';
        }
      } else if (contentWidth + contentOffsetLeft > containerWidth + containerOffsetLeft) {
        // 右对齐
        steps[index].smartContentAlign = 'right';
      } else {
        // 左对齐
        steps[index].smartContentAlign = 'left';
      }
    }
  }
}
