import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdvancedUploadComponent } from './advanced-upload.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';

@NgModule({
  declarations: [AdvancedUploadComponent],
  imports: [CommonModule, NgZorroAntdModule],
  exports: [CommonModule, NgZorroAntdModule, AdvancedUploadComponent]
})
export class AdvancedUploadModule {}
