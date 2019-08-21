---
title:
  zh-CN: 流程图编辑器
  en-US: Flow Usage
order: 0
---

## zh-CN

流程图编辑器 例子。


```ts
import { Component, OnDestroy } from '@angular/core';

@Component({
  selector: 'floweditor-demo',
  template: `
  <p-ggeditor [enableEditor]="true" [data]="data" [style]="{width: 900, height: 600}" style="height:600px;display:block"></p-ggeditor>
  `,
})
export class DemoComponent implements OnDestroy {
  data = {
    nodes: [{
        type: 'node',
        size: '70*70',
        shape: 'flow-circle',
        color: '#FA8C16',
        label: '起止节点',
        x: 55,
        y: 55,
        id: 'ea1184e8',
        index: 0,
    }, {
        type: 'node',
        size: '70*70',
        shape: 'flow-circle',
        color: '#FA8C16',
        label: '结束节点',
        x: 55,
        y: 255,
        id: '481fbb1a',
        index: 2,
    }],
    edges: [{
        source: 'ea1184e8',
        sourceAnchor: 2,
        target: '481fbb1a',
        targetAnchor: 0,
        id: '7989ac70',
        index: 1,
    }],
  };

  constructor() {}

  ngOnDestroy() {
  }
}
```
