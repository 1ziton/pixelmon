import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ShortcutPipeModule } from '@pokemon/butterfree/src/pipes/shortcut.pipe';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { SmartTextComponent } from './smart-text.component';

@NgModule({
  declarations: [SmartTextComponent],
  imports: [CommonModule, NgZorroAntdModule, ShortcutPipeModule],
  exports: [CommonModule, NgZorroAntdModule, ShortcutPipeModule, SmartTextComponent],
})
export class SmartTextModule {}
