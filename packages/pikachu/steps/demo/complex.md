---
order: 1
title:
  en-US: Complex
  zh-CN: 复杂
  bg: f2f4f5
---

复杂的自定义用法。

```ts
import { Component, OnInit } from '@angular/core';
import { Step } from '@pixelmon/pikachu/steps';

@Component({
  selector: 'app-demo',
  template: `
    <p-steps
      [activeWidth]="activeWidth"
      [keySteps]="keySteps"
      [extraSteps]="extraSteps"
      [activeStep]="activeStep"
      backgroundImage="url(/assets/img/steps/background.png)"
    ></p-steps>

    <div>
      <button nz-button (click)="goBack()">
        后退
      </button>
      <button nz-button (click)="goForward()">
        前进
      </button>
    </div>
  `,
})
export class DemoComponent implements OnInit {
  progress = 0;
  activeWidth = '0%';

  activeStep: Step = {
    index: '0%',
    title: '全链路剩余时效：2天',
  };

  keySteps: Step[] = [
    {
      index: '0%',
      title: '开单时间',
      description: '2019/08/02 12:00',
    },
    {
      index: '20%',
      title: '枢纽发车时间',
      description: '2019/08/02 12:00',
    },
    {
      index: '70%',
      title: '干线到达时间',
      description: '2019/08/02 12:00',
    },
    {
      index: '90%',
      title: '签收时间',
      description: '2019/08/02 12:00',
    },
  ];

  extraSteps: Step[] = [
    {
      index: '0%',
      title: '开单时间',
      description: '2019/08/02 12:00',
    },
    {
      index: '60%',
      title: '枢纽发车时间',
      subTitle: '（已超14小时）',
      description: '2019/08/02 12:00',
    },
    {
      index: '62%',
      title: '干线到达时间',
      description: '2019/08/02 12:00',
    },
  ];

  constructor() {}

  ngOnInit() {
    setTimeout(() => {
      this.progress = 63;
      this.activeWidth = '63%';
      this.activeStep.index = '63%';
    }, 200);
  }

  goForward() {
    if (this.progress >= 100) {
      return;
    }
    this.progress++;
    this.activeWidth = this.progress + '%';
    this.activeStep = { ...this.activeStep, index: this.progress + '%' };
  }

  goBack() {
    if (this.progress <= 0) {
      return;
    }
    this.progress--;
    this.activeWidth = this.progress + '%';
    this.activeStep = { ...this.activeStep, index: this.progress + '%' };
  }
}
```
