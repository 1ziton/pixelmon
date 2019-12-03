import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputPlusComponent } from './input-plus.component';
import { NzInputModule, NzIconModule, NzPopoverModule, NzButtonModule, NzGridModule, NZ_ICONS } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';
import { PlusOutline } from '@ant-design/icons-angular/icons';

@NgModule({
  declarations: [InputPlusComponent],
  imports: [CommonModule, NzInputModule, FormsModule, NzIconModule, NzInputModule, NzPopoverModule, NzButtonModule, NzGridModule],
  providers: [{ provide: NZ_ICONS, useValue: [PlusOutline] }],
  exports: [InputPlusComponent],
})
export class InputPlusModule {}
