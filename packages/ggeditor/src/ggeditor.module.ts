import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlowEditorComponent } from './flow.component';
import { MindEditorComponent } from './mind.component';

@NgModule({
    imports: [CommonModule],
    declarations: [FlowEditorComponent, MindEditorComponent],
    exports: [FlowEditorComponent, MindEditorComponent]
})
export class PixelmonGGEditorModule { }
