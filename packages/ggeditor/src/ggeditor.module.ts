import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlowPageEditorComponent } from './flow-editor.component';
import { FlowComponent } from './flow.component';
import { MindComponent } from './mind.component';

@NgModule({
    imports: [CommonModule],
    declarations: [FlowComponent, MindComponent, FlowPageEditorComponent],
    exports: [FlowComponent, MindComponent, FlowPageEditorComponent]
})
export class PixelmonGGEditorModule { }
