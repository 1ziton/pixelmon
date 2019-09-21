import { NgModule } from '@angular/core';
import { LodopModule } from '@pixelmon/pikachu/lodop';
import { FooterToolbarModule } from '@pixelmon/pikachu/footer-toolbar';
import { NoticeIconModule } from '@pixelmon/pikachu/notice-icon';
import { PageHeaderModule } from '@pixelmon/pikachu/page-header';
import { PaginationModule } from '@pixelmon/pikachu/pagination';
import { QueryTabsModule } from '@pixelmon/pikachu/query-tabs';
import { ReuseTabModule } from '@pixelmon/pikachu/reuse-tab';
import { SidebarNavModule } from '@pixelmon/pikachu/sidebar-nav';
import { SmartTextModule } from '@pixelmon/pikachu/smart-text';
import { TableModule } from '@pixelmon/pikachu/table';
import { UploadModule } from '@pixelmon/pikachu/upload';
import { SVModule } from '@pixelmon/pikachu/view';
import { SEModule } from '@pixelmon/pikachu/edit';
import { StepsModule } from '@pixelmon/pikachu/steps';
import { AddressSelectModule } from '@pixelmon/pikachu/address-select';
import { DropdownPanelModule } from '@pixelmon/pikachu/dropdown-panel';
import { TagSelectModule } from '@pixelmon/pikachu/tag-select';

const MODULES = [
  QueryTabsModule,
  SmartTextModule,
  LodopModule,
  ReuseTabModule,
  NoticeIconModule,
  SidebarNavModule,
  SVModule,
  SEModule,
  PageHeaderModule,
  TableModule,
  UploadModule,
  PaginationModule,
  FooterToolbarModule,
  StepsModule,
  AddressSelectModule,
  DropdownPanelModule,
  TagSelectModule,
];

@NgModule({ exports: MODULES })
export class PikachuModule {}
