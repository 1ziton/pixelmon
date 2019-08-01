import { NgModule } from '@angular/core';
import { LodopModule } from '@pokemon/pikachu/lodop';
import { AdvancedTableModule } from './advanced-table/advanced-table.module';
import { NoticeIconModule } from './notice-icon';
import { QueryDisplayModule } from './query-display/query-display.module';
import { ReuseTabModule } from './reuse-tab';
import { SidebarNavModule } from './sidebar-nav';
import { SmartTextModule } from './smart-text/smart-text.module';
import { SVModule } from './view';

const MODULES = [
  AdvancedTableModule,
  QueryDisplayModule,
  SmartTextModule,
  LodopModule,
  ReuseTabModule,
  NoticeIconModule,
  SidebarNavModule,
  SVModule,
];

@NgModule({ exports: MODULES })
export class PikachuModule {}
