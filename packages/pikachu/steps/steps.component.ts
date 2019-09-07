import { Component, OnInit, Input } from '@angular/core';
import { Step } from './steps.interface';

@Component({
  selector: 'p-steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.less'],
})
export class StepsComponent implements OnInit {
  @Input() activeBackground = '#1ECB8E';
  @Input() activeWidth = '0%';
  @Input() inactiveBackground = '#EAF0F0';
  @Input() backgroundImage = 'url(/assets/total-links/background.png)';

  @Input() activePointColor = '#1ECB8E';
  @Input() activeContentColor = '#FFFFFF';
  @Input() activeContentBackground = '#1ECB8E';
  @Input() activeStep: Step;

  @Input() keyPointColor = '#1ECB8E';
  @Input() keyContentColor = '#999999';
  @Input() keyContentBackground = 'transparent';
  @Input() keySteps: Step[] = [];

  @Input() extraPointColor = '#F5A623';
  @Input() extraContentColor = '#333333';
  @Input() extraContentBackground = '#FFFFFF';
  @Input() extraSteps: Step[] = [];

  constructor() {}

  ngOnInit() {}
}
