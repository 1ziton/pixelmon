import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PokemonUtilModule } from '@pokemon/util';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';

import { SidebarNavComponent } from './sidebar-nav.component';

@NgModule({
  imports: [CommonModule, RouterModule, NzIconModule, NzToolTipModule, PokemonUtilModule],
  declarations: [SidebarNavComponent],
  exports: [SidebarNavComponent],
})
export class SidebarNavModule {}
