import { NgModule } from '@angular/core';
import { LodopModule } from '@pixelmon/pikachu/lodop';
import { NoticeIconModule } from './notice-icon';
import { PageHeaderModule } from './page-header';
import { ReuseTabModule } from './reuse-tab';
import { SidebarNavModule } from './sidebar-nav';
import { SVModule } from './view';
import { QueryTabsModule } from './query-tabs';
import { SmartTextModule } from './smart-text';
import { TableModule } from './table';
import { UploadModule } from './upload';
import { NzPaginationModule } from './pagination';

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
  NzPaginationModule,
];

@NgModule({ exports: MODULES })
export class PikachuModule {}
