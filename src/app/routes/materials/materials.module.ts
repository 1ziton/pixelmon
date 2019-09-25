import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MATERIALS_ENTY_COMPONENTS } from '@materials/entry_components';
import { SharedModule } from '@shared/shared.module';
import { DynamicModule } from 'ng-dynamic-component';
import { BlockListComponent } from './blocks/blocks.component';
import { ProListLayoutComponent } from './list/list.component';
import { MaterialsPreviewComponent } from './preview.component';
import { ScaffoldsListComponent } from './scaffolds/scaffolds.component';

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  {
    path: 'list',
    component: ProListLayoutComponent,
    children: [
      { path: '', redirectTo: 'blocks', pathMatch: 'full' },
      { path: 'blocks', component: BlockListComponent, pathMatch: 'full' },
      { path: 'scaffolds', component: ScaffoldsListComponent, pathMatch: 'full' },
    ],
  },
];

@NgModule({
  declarations: [
    MaterialsPreviewComponent,
    ProListLayoutComponent,
    BlockListComponent,
    ScaffoldsListComponent,
    MaterialsPreviewComponent,
    ...MATERIALS_ENTY_COMPONENTS,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    DynamicModule.withComponents([...MATERIALS_ENTY_COMPONENTS, MaterialsPreviewComponent]),
  ],
})
export class MaterialsModule {}
