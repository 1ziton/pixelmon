import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, Inject, NgZone, OnDestroy, OnInit } from '@angular/core';
import { PIXELMON_I18N_TOKEN } from '@pixelmon/theme';
import AOS from 'aos';
import { I18NService } from '../../core/i18n/service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  host: {
    '[class.home-wrapper]': 'true',
  },
})
export class HomeComponent implements OnInit, OnDestroy, AfterViewInit {
  list = [
    { type: 'basic', url: 'https://1ziton.github.io/1ziton' },
    { type: 'pro', url: 'https://e.1ziton.com/theme/pro' },
    { type: 'ms', url: 'https://e.1ziton.com/theme/ms' },
  ];
  constructor(
    @Inject(PIXELMON_I18N_TOKEN) public i18n: I18NService,
    private ngZone: NgZone,
    @Inject(DOCUMENT) private doc: Document,
  ) {}

  private get body(): HTMLElement {
    return this.doc.querySelector('body') as HTMLElement;
  }

  ngAfterViewInit(): void {
    this.ngZone.runOutsideAngular(() => AOS.init());
  }

  ngOnInit() {
    this.body.classList.add(`index-page`);
  }

  ngOnDestroy(): void {
    this.body.classList.remove(`index-page`);
  }
}
