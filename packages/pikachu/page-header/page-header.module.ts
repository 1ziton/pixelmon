import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PixelmonUtilModule } from '@pixelmon/util';
import { NzAffixModule } from 'ng-zorro-antd/affix';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';

import { PageHeaderComponent } from './page-header.component';

const COMPONENTS = [PageHeaderComponent];

@NgModule({
  imports: [CommonModule, RouterModule, PixelmonUtilModule, NzAffixModule, NzSkeletonModule, NzBreadCrumbModule],
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS],
})
export class PageHeaderModule {}
