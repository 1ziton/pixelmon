import { NgModule } from '@angular/core';

// #region all modules

import { G2BarModule } from '@pixelmon/chart/bar';
import { G2CardModule } from '@pixelmon/chart/card';
import { G2CustomModule } from '@pixelmon/chart/custom';
import { G2GaugeModule } from '@pixelmon/chart/gauge';
import { G2MiniAreaModule } from '@pixelmon/chart/mini-area';
import { G2MiniBarModule } from '@pixelmon/chart/mini-bar';
import { G2MiniProgressModule } from '@pixelmon/chart/mini-progress';
import { NumberInfoModule } from '@pixelmon/chart/number-info';
import { G2PieModule } from '@pixelmon/chart/pie';
import { G2RadarModule } from '@pixelmon/chart/radar';
import { G2SingleBarModule } from '@pixelmon/chart/single-bar';
import { G2TagCloudModule } from '@pixelmon/chart/tag-cloud';
import { G2TimelineModule } from '@pixelmon/chart/timeline';
import { TrendModule } from '@pixelmon/chart/trend';
import { G2WaterWaveModule } from '@pixelmon/chart/water-wave';

const MODULES = [
  G2BarModule,
  G2CardModule,
  G2CustomModule,
  G2GaugeModule,
  G2MiniAreaModule,
  G2MiniBarModule,
  G2MiniProgressModule,
  G2PieModule,
  G2RadarModule,
  G2TagCloudModule,
  G2TimelineModule,
  G2WaterWaveModule,
  G2SingleBarModule,
  NumberInfoModule,
  TrendModule,
];

// #endregion

@NgModule({ exports: MODULES })
export class PixelmonChartModule {}
