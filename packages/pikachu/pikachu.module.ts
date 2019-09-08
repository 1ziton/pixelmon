import { NgModule } from '@angular/core';
import { LodopModule } from '@pixelmon/pikachu/lodop';
import { FooterToolbarModule } from './footer-toolbar';
import { NoticeIconModule } from './notice-icon';
import { PageHeaderModule } from './page-header';
import { PaginationModule } from './pagination';
import { QueryTabsModule } from './query-tabs';
import { ReuseTabModule } from './reuse-tab';
import { SidebarNavModule } from './sidebar-nav';
import { SmartTextModule } from './smart-text';
import { TableModule } from './table';
import { UploadModule } from './upload';
import { SVModule } from './view';
import { StepsModule } from './steps/steps.module';

const MODULES = [
  QueryTabsModule,
  SmartTextModule,
  LodopModule,
  ReuseTabModule,
  NoticeIconModule,
  SidebarNavModule,
  SVModule,
  PageHeaderModule,
  TableModule,
  UploadModule,
  PaginationModule,
  FooterToolbarModule,
  StepsModule,
];

@NgModule({ exports: MODULES })
export class PikachuModule {}
