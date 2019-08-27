import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { UploadComponent } from './upload.component';

@NgModule({
  declarations: [UploadComponent],
  imports: [CommonModule, NgZorroAntdModule],
  exports: [CommonModule, NgZorroAntdModule, UploadComponent],
})
export class UploadModule {}
