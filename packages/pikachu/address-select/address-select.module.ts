import { OverlayModule } from '@angular/cdk/overlay';
import { PlatformModule } from '@angular/cdk/platform';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzAddOnModule, NzNoAnimationModule, NzOverlayModule } from 'ng-zorro-antd/core';
import { AddressSelectComponent } from './address-select.component';
import { PFilterOptionPipe } from './p-option.pipe';
import { PSelectTopControlComponent } from './p-select-top-control.component';
import { POptionContainerComponent } from './p-option-container.component';

@NgModule({
  declarations: [AddressSelectComponent, PSelectTopControlComponent, PFilterOptionPipe, POptionContainerComponent],
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
  exports: [AddressSelectComponent, PSelectTopControlComponent, PFilterOptionPipe, POptionContainerComponent],
})
export class AddressSelectModule {}
