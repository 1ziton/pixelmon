import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { PokemonUtilModule } from '@pokemon/util';

import { ACLIfDirective } from './acl-if.directive';
import { ACLDirective } from './acl.directive';
import { ACLService } from './acl.service';

const COMPONENTS = [ACLDirective, ACLIfDirective];

@NgModule({
  imports: [CommonModule, PokemonUtilModule],
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS],
})
export class PokemonACLModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: PokemonACLModule,
      providers: [ACLService],
    };
  }
}
