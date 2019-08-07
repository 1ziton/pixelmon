import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';

import { en_US as pixelmonEnUS, zh_CN as pixelmonZhCn, PixelmonI18NService, PixelmonLocaleService } from '@pixelmon/theme';
import { en_US, zh_CN, NzI18nService } from 'ng-zorro-antd';

import { ENUS } from './en-US';
import { ZHCN } from './zh-CN';

export type LangType = 'en-US' | 'zh-CN';

@Injectable({ providedIn: 'root' })
export class I18NService implements PixelmonI18NService {
  private change$: Subject<LangType> = new Subject<LangType>();

  private _langs = [{ code: 'en-US', text: 'English' }, { code: 'zh-CN', text: '中文' }];

  constructor(
    private zorroI18n: NzI18nService,
    private pixelmonI18n: PixelmonLocaleService,
    private translate: TranslateService,
    private dom: DomSanitizer,
  ) {
    this.translate.setTranslation('en-US', ENUS);
    this.translate.setTranslation('zh-CN', ZHCN);
    this.translate.setDefaultLang('en-US');
    // from browser
    const lang = (this.getBrowserLang() || this.defaultLang) as LangType;
    this.use(lang, false);
  }

  private getBrowserLang(): string | undefined {
    const winNav: any = window.navigator;
    if (typeof window === 'undefined' || typeof winNav === 'undefined') {
      return undefined;
    }

    let browserLang: any = winNav.languages ? winNav.languages[0] : null;
    browserLang = browserLang || winNav.language || winNav.browserLanguage || winNav.userLanguage;

    if (browserLang.indexOf('-') !== -1) {
      browserLang = browserLang.split('-')[0];
    }

    if (browserLang.indexOf('_') !== -1) {
      browserLang = browserLang.split('_')[0];
    }

    return this.getFullLang(browserLang);
  }

  get change() {
    return this.change$.asObservable();
  }

  use(lang: LangType, emit = true) {
    this.translate.use(lang);
    this.zorroI18n.setLocale(lang === 'en-US' ? en_US : zh_CN);
    this.pixelmonI18n.setLocale(lang === 'en-US' ? pixelmonEnUS : pixelmonZhCn);
    if (emit) this.change$.next(lang);
  }

  getLangs(): any[] {
    return this._langs;
  }

  get defaultLang(): LangType {
    return 'zh-CN';
  }

  get lang() {
    return this.translate.currentLang;
  }

  get zone() {
    return this.translate.currentLang.split('-')[0];
  }

  get langs() {
    return ['zh-CN', 'en-US'];
  }

  fanyi(key: string, interpolateParams?: {}, isSafe?: boolean) {
    const res = this.translate.instant(key, interpolateParams);
    if (isSafe === true) {
      return this.dom.bypassSecurityTrustHtml(res);
    }
    return res;
  }

  get(i: any) {
    return typeof i === 'string' ? i : i[this.lang] || i[this.defaultLang] || '';
  }

  getFullLang(lang: string) {
    const res = this._langs.filter(l => l.code.split('-')[0] === lang);
    return res.length > 0 ? res[0].code : this.defaultLang;
  }

  getRealUrl(url: string) {
    const arr = url
      .split('#')[0]
      .split('?')[0]
      .split('/');
    arr.splice(-1);
    return arr.join('/');
  }
}
