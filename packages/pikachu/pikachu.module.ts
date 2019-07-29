import { NgModule } from '@angular/core';
import { LodopModule } from '@pokemon/pikachu/lodop';
import { AdvancedTableModule } from './advanced-table/advanced-table.module';
import { QueryDisplayModule } from './query-display/query-display.module';
import { SmartTextModule } from './smart-text/smart-text.module';

const MODULES = [AdvancedTableModule, QueryDisplayModule, SmartTextModule, LodopModule];

@NgModule({ exports: MODULES })
export class PikachuModule {}
