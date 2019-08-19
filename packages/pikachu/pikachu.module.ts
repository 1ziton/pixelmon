import { NgModule } from '@angular/core';
import { LodopModule } from '@pixelmon/pikachu/lodop';
import { AdvancedTableModule } from './advanced-table/advanced-table.module';
import { SmartTextModule } from './smart-text/smart-text.module';
import { NoticeIconModule } from './notice-icon';
import { PageHeaderModule } from './page-header';
import { ReuseTabModule } from './reuse-tab';
import { SidebarNavModule } from './sidebar-nav';
import { SVModule } from './view';
import { QueryDisplayModule } from './query-display';

const MODULES = [
  AdvancedTableModule,
  QueryDisplayModule,
  SmartTextModule,
  LodopModule,
  ReuseTabModule,
  NoticeIconModule,
  SidebarNavModule,
  SVModule,
  PageHeaderModule,
];

@NgModule({ exports: MODULES })
export class PikachuModule {}
