import { NgModule } from '@angular/core';
import { LodopModule } from '@pixelmon/pikachu/lodop';
import { NoticeIconModule } from './notice-icon';
import { PageHeaderModule } from './page-header';
import { ReuseTabModule } from './reuse-tab';
import { SidebarNavModule } from './sidebar-nav';
import { SVModule } from './view';
import { QueryTabsModule } from './query-tabs';
import { AdvancedTableModule } from './advanced-table';
import { SmartTextModule } from './smart-text';
import { AdvancedUploadModule } from './advanced-upload/advanced-upload.module';
import { UploadServiceToken } from './advanced-upload/advanced-upload.component';
import { UploadService } from './advanced-upload/upload.service';

const MODULES = [
  AdvancedTableModule,
  QueryTabsModule,
  SmartTextModule,
  LodopModule,
  ReuseTabModule,
  NoticeIconModule,
  SidebarNavModule,
  SVModule,
  PageHeaderModule,
  AdvancedUploadModule,
];

@NgModule({ exports: MODULES, providers: [{ provide: UploadServiceToken, useExisting: UploadService }] })
export class PikachuModule {}
