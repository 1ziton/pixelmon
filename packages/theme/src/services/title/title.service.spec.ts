import { DOCUMENT } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { PixelmonThemeModule } from '../../theme.module';
import { PixelmonI18NService, PixelmonI18NServiceFake, PIXELMON_I18N_TOKEN } from '../i18n/i18n';
import { Menu } from '../menu/interface';
import { MenuService } from '../menu/menu.service';
import { TitleService } from './title.service';

describe('Service: Title', () => {
  let getPathByUrlData: any;
  class TestTitleService {
    setTitle = jasmine.createSpy('reset');
  }

  class TestMenuService {
    getPathByUrl(): Menu[] {
      return getPathByUrlData;
    }
  }

  class TestDocument {
    querySelector() {
      return {
        firstChild: {
          textContent: 'a',
        },
      };
    }
  }

  let title: TestTitleService;
  let srv: TitleService;
  let i18n: PixelmonI18NService;
  const pixelmon = 'Pixelmon';
  const notPageName = 'Not Page Name';

  function genModule(providers: any[] = [], loadI18n = true) {
    const i18nProvider: any[] = loadI18n
      ? [{ provide: PIXELMON_I18N_TOKEN, useClass: PixelmonI18NServiceFake }]
      : [];
    TestBed.configureTestingModule({
      imports: [PixelmonThemeModule, RouterTestingModule],
      providers: [
        TitleService,
        MenuService,
        { provide: Title, useClass: TestTitleService },
        ...i18nProvider,
      ].concat(providers),
    });
    title = TestBed.get(Title);
    srv = TestBed.get<TitleService>(TitleService);
    i18n = TestBed.get(PIXELMON_I18N_TOKEN);
  }

  afterEach(() => srv.ngOnDestroy());

  describe('[default]', () => {
    beforeEach(() => genModule());

    it('should set the default empty title', () => {
      srv.suffix = pixelmon;
      srv.setTitle();
      expect(title.setTitle).toHaveBeenCalledWith(`${notPageName} - ${pixelmon}`);
    });

    it('should set new title', () => {
      srv.suffix = pixelmon;
      srv.setTitle('newTitle');
      expect(title.setTitle).toHaveBeenCalledWith('newTitle - ' + pixelmon);
    });

    it('should set new title via array', () => {
      srv.suffix = pixelmon;
      srv.setTitle(['newTitle']);
      expect(title.setTitle).toHaveBeenCalledWith('newTitle - ' + pixelmon);
    });

    it('#separator', () => {
      srv.suffix = pixelmon;
      srv.separator = ' / ';
      srv.setTitle('newTitle');
      expect(title.setTitle).toHaveBeenCalledWith('newTitle / ' + pixelmon);
    });

    it('#prefix', () => {
      srv.prefix = pixelmon;
      srv.setTitle('newTitle');
      expect(title.setTitle).toHaveBeenCalledWith(pixelmon + ' - newTitle');
    });

    it('#reverse', () => {
      srv.reverse = true;
      srv.suffix = pixelmon;
      srv.setTitle('newTitle');
      expect(title.setTitle).toHaveBeenCalledWith(pixelmon + ' - newTitle');
    });

    it('#default', () => {
      const def = 'DEFAULT';
      srv.default = def;
      srv.setTitle();
      expect(title.setTitle).toHaveBeenCalledWith(def);
    });
  });

  describe('[logic]', () => {
    describe('should be hava title via route data property', () => {
      it('with text', () => {
        genModule([
          {
            provide: ActivatedRoute,
            useValue: {
              firstChild: {
                snapshot: {
                  data: {
                    title: pixelmon,
                  },
                },
              },
            },
          },
        ]);
        srv.setTitle();
        expect(title.setTitle).toHaveBeenCalledWith(pixelmon);
      });
      it('without', () => {
        genModule([
          {
            provide: ActivatedRoute,
            useValue: {},
          },
        ]);
        srv.setTitle();
        expect(title.setTitle).toHaveBeenCalledWith(notPageName);
      });
      it('with i18n', () => {
        const titleI18n = 'a';
        genModule([
          {
            provide: ActivatedRoute,
            useValue: {
              snapshot: {
                data: {
                  titleI18n,
                },
              },
            },
          },
        ]);
        spyOn(i18n, 'fanyi');
        srv.setTitle();
        expect(i18n.fanyi).toHaveBeenCalled();
      });
    });

    describe('should be hava title via menu data property', () => {
      it('with text', () => {
        getPathByUrlData = [{ text: 'home' }];
        genModule([{ provide: MenuService, useClass: TestMenuService }]);
        srv.setTitle();
        expect(title.setTitle).toHaveBeenCalledWith(getPathByUrlData[0].text);
      });
      it('with i18n', () => {
        getPathByUrlData = [{ text: 'home', i18n: 'a' }];
        genModule([{ provide: MenuService, useClass: TestMenuService }]);
        srv.setTitle();
        expect(title.setTitle).toHaveBeenCalledWith(getPathByUrlData[0].i18n);
      });
      it('without menu data', () => {
        getPathByUrlData = [];
        genModule([{ provide: MenuService, useClass: TestMenuService }]);
        srv.setTitle();
        expect(title.setTitle).toHaveBeenCalledWith(notPageName);
      });
    });

    describe('should be hava title via element', () => {
      it('with element', () => {
        genModule([{ provide: DOCUMENT, useClass: TestDocument }]);
        srv.setTitle();
        expect(title.setTitle).toHaveBeenCalledWith('a');
      });
      it('without element', () => {
        genModule([]);
        srv.setTitle();
        expect(title.setTitle).toHaveBeenCalledWith(notPageName);
      });
    });
  });

  describe('[i18n]', () => {
    it('should be set when not i18n service', () => {
      genModule([], false);
      srv.suffix = pixelmon;
      srv.setTitle();
      expect(title.setTitle).toHaveBeenCalledWith(`${notPageName} - ${pixelmon}`);
    });
    it('should be reset title when i18n has changed', () => {
      genModule();
      spyOn(srv, 'setTitle');
      i18n.use('en');
      expect(srv.setTitle).toHaveBeenCalled();
    });
    it('#setTitleByI18n', () => {
      genModule([], true);
      srv.suffix = pixelmon;
      const key = 'aa';
      srv.setTitleByI18n(key);
      expect(title.setTitle).toHaveBeenCalledWith(`${key} - ${pixelmon}`);
    });
  });
});
