import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadComponent } from './upload.component';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzButtonModule } from 'ng-zorro-antd/button';

@NgModule({
  declarations: [UploadComponent],
  imports: [CommonModule, NzUploadModule, NzModalModule, NzSpinModule, NzButtonModule],
  exports: [UploadComponent],
})
export class UploadModule {}
