---
order: 1
title: Getting Started
type: Documents
---

Chart provides the well-designed abstract chart components based on the [G2](https://antv.alipay.com/zh-cn/g2/3.x/index.html). These components provide the ability to use with complex mixed view or just use along for common business usage.

## Usage

### Install dependence

```bash
# add
ng g pixelmon:plugin g2
# remove
ng g pixelmon:plugin g2 -t=remove
```

### Import module

```ts
// shared.module.ts
import { PixelmonChartModule } from '@pixelmon/chart';
// Support for secondary imports, such as using only the `g2-bar` component
// import { G2BarModule } from '@pixelmon/chart/bar';

@NgModule({
  imports: [ PixelmonChartModule ],
  exports: [ PixelmonChartModule ]
})
```

## Custom G2 components

Use the [g2-chart](/chart/custom) component to better implement custom charts.