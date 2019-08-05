import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ShortcutPipeModule } from '@pokemon/theme';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { SmartTextComponent } from './smart-text.component';

@NgModule({
  imports: [CommonModule, ShortcutPipeModule, NzToolTipModule],
  declarations: [SmartTextComponent],
  exports: [CommonModule, SmartTextComponent],
})
export class SmartTextModule {}
