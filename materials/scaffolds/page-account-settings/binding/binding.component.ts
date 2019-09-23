import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-account-settings-binding',
  templateUrl: './binding.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProAccountSettingsBindingComponent {
  constructor(public msg: NzMessageService) {}
}
