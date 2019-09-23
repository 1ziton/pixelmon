import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ENTY_BLOCKS_COMPONENTS } from '@materials/blocks/entry_components';
import { SharedModule } from '@shared/shared.module';
import { DynamicModule } from 'ng-dynamic-component';
import { BlockListComponent } from './blocks/blocks.component';
import { ProListLayoutComponent } from './list/list.component';
import { MaterialsPreviewComponent } from './preview.component';
import { ProListProjectsComponent } from './scaffolds/scaffolds.component';

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  {
    path: 'list',
    component: ProListLayoutComponent,
    children: [
      { path: '', redirectTo: 'blocks', pathMatch: 'full' },
      { path: 'blocks', component: BlockListComponent, pathMatch: 'full' },
      { path: 'scaffolds', component: ProListProjectsComponent, pathMatch: 'full' },
    ],
  },
];

@NgModule({
  declarations: [
    MaterialsPreviewComponent,
    ProListLayoutComponent,
    BlockListComponent,
    ProListProjectsComponent,
    MaterialsPreviewComponent,
    ...ENTY_BLOCKS_COMPONENTS,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    DynamicModule.withComponents([...ENTY_BLOCKS_COMPONENTS, MaterialsPreviewComponent]),
  ],
})
export class MaterialsModule {}
