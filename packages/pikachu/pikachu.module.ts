import { NgModule } from '@angular/core';
import { AdvancedTableModule } from './advanced-table/advanced-table.module';
import { QueryDisplayModule } from './query-display/query-display.module';
import { SmartTextModule } from './smart-text/smart-text.module';

const MODULES = [AdvancedTableModule, QueryDisplayModule, SmartTextModule];

@NgModule({ exports: MODULES })
export class PikachuModule {}
