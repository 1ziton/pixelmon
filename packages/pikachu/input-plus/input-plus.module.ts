import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputPlusComponent } from './input-plus.component';
import { NzInputModule, NzIconModule, NzPopoverModule, NzButtonModule } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [InputPlusComponent],
  imports: [CommonModule, NzInputModule, FormsModule, NzIconModule, NzInputModule, NzPopoverModule, NzButtonModule],
  exports: [InputPlusComponent],
})
export class InputPlusModule {}
