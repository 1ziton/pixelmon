---
order: 1
title:
  en-US: Basic
  zh-CN: 基础
  bg: f2f4f5
---

基础用法。

```ts
import { Component, OnInit } from '@angular/core';
import { Step } from '@pixelmon/pikachu/steps';

@Component({
  selector: 'app-demo',
  template: `
    <p-steps [activeWidth]="activeWidth" [keySteps]="keySteps"></p-steps>

    <div>
      <button (click)="goForward()">
        下一步
      </button>
    </div>
  `,
})
export class DemoComponent implements OnInit {
  index = 0;
  activeWidth = '0%';

  keySteps: Step[] = [
    {
      index: '0%',
      title: 'Login',
    },
    {
      index: '30%',
      title: 'Verification',
    },
    {
      index: '70%',
      title: 'Pay',
    },
    {
      index: '100%',
      title: 'Done',
    },
  ];

  constructor() {}

  ngOnInit() {}

  goForward() {
    if (this.index === 3) {
      return;
    }
    this.index++;
    this.activeWidth = this.keySteps[this.index].index;
  }
}
```
