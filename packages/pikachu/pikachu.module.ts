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
import { UploadService } from './upload/upload.service';
import { UploadModule } from './upload';
import { UploadServiceToken } from './upload/upload-interface';

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
];

@NgModule({ exports: MODULES, providers: [{ provide: UploadServiceToken, useExisting: UploadService }] })
export class PikachuModule {}
