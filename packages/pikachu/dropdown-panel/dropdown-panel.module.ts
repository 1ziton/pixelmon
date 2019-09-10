import { OverlayModule } from '@angular/cdk/overlay';
import { PlatformModule } from '@angular/cdk/platform';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzAddOnModule, NzNoAnimationModule, NzOverlayModule } from 'ng-zorro-antd/core';
import { DropdownPanelComponent } from './dropdown-panel.component';
import { PanelFilterOptionPipe } from './p-option.pipe';
import { PanelSelectTopControlComponent } from './p-panel-top-control.component';
import { PanelOptionContainerComponent } from './p-option-container.component';

@NgModule({
  declarations: [DropdownPanelComponent, PanelSelectTopControlComponent, PanelFilterOptionPipe, PanelOptionContainerComponent],
  imports: [
    OverlayModule,
    PlatformModule,
    FormsModule,
    CommonModule,
    NzEmptyModule,
    NzIconModule,
    NzAddOnModule,
    NzNoAnimationModule,
    NzOverlayModule,
  ],
  exports: [DropdownPanelComponent, PanelSelectTopControlComponent, PanelFilterOptionPipe, PanelOptionContainerComponent],
})
export class DropdownPanelModule {}
