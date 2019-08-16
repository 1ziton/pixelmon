import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { GGEditorComponent } from './ggeditor.component';

@NgModule({
  imports: [CommonModule],
  declarations: [GGEditorComponent],
  exports: [GGEditorComponent],
})
export class PixelmonGGEditorModule {}
