import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { ProListArticlesComponent } from './blocks/blocks.component';
import { ProListLayoutComponent } from './list/list.component';
import { ProListProjectsComponent } from './scaffolds/scaffolds.component';

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  {
    path: 'list',
    component: ProListLayoutComponent,
    children: [
      { path: '', redirectTo: 'blocks', pathMatch: 'full' },
      { path: 'blocks', component: ProListArticlesComponent, pathMatch: 'full' },
      { path: 'scaffolds', component: ProListProjectsComponent, pathMatch: 'full' },
    ],
  },
];

@NgModule({
  declarations: [ProListLayoutComponent, ProListArticlesComponent, ProListProjectsComponent],
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
})
export class MaterialsModule {}
