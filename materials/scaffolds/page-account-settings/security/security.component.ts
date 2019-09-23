import { Component, ChangeDetectionStrategy } from '@angular/core';
import { _HttpClient } from '@pixelmon/theme';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-account-settings-security',
  templateUrl: './security.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProAccountSettingsSecurityComponent {
  constructor(public msg: NzMessageService) {}
}
