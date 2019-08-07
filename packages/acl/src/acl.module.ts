import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { PixelmonUtilModule } from '@pixelmon/util';

import { ACLIfDirective } from './acl-if.directive';
import { ACLDirective } from './acl.directive';
import { ACLService } from './acl.service';

const COMPONENTS = [ACLDirective, ACLIfDirective];

@NgModule({
  imports: [CommonModule, PixelmonUtilModule],
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS],
})
export class PixelmonACLModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: PixelmonACLModule,
      providers: [ACLService],
    };
  }
}
