import { FormControl } from '@angular/forms';
import { isDecimal, isIdCard, isInt, isMobile, isNum, isUrl, isCreditCard, isBase64, isEmail, isUUID, isTelPhone } from './validate';
import { _Validators } from './validators';

describe('utils: validate', () => {
  it('#isNum', () => {
    const data = [
      { k: '123', v: true },
      { k: '12.3', v: true },
      { k: '12.', v: false },
      { k: '-12', v: true },
      { k: 123, v: true },
      { k: '123.1.2', v: false },
      { k: '123a', v: false },
    ];
    for (const item of data) {
      expect(isNum(item.k)).toBe(item.v, `${item.k}=${typeof item.k} must be ${item.v}`);

      const ctr = new FormControl(item.k);
      if (item.v) {
        expect(_Validators.num(ctr)).toBeNull();
      } else {
        expect(_Validators.num(ctr)).toEqual({ num: true });
      }
    }
  });

  it('#isInt', () => {
    const data = [{ k: '123', v: true }, { k: 123, v: true }, { k: '123.1', v: false }, { k: '123.123', v: false }];
    for (const item of data) {
      expect(isInt(item.k)).toBe(item.v, `${item.k}=${typeof item.k} must be ${item.v}`);

      const ctr = new FormControl(item.k);
      if (item.v) {
        expect(_Validators.int(ctr)).toBeNull();
      } else {
        expect(_Validators.int(ctr)).toEqual({ int: true });
      }
    }
  });

  it('#isDecimal', () => {
    const data = [
      { k: '12.3', v: true },
      { k: '-12.3', v: true },
      { k: '123', v: false },
      { k: '12.', v: false },
      { k: '-12', v: false },
      { k: 123, v: false },
      { k: '123.1.2', v: false },
      { k: '123a', v: false },
    ];
    for (const item of data) {
      expect(isDecimal(item.k)).toBe(item.v, `${item.k}=${typeof item.k} must be ${item.v}`);
      const ctr = new FormControl(item.k);
      if (item.v) {
        expect(_Validators.decimal(ctr)).toBeNull();
      } else {
        expect(_Validators.decimal(ctr)).toEqual({ decimal: true });
      }
    }
  });

  it('#isIdCard', () => {
    const data = [{ k: '610102198006042614', v: true }, { k: '61010219800604261', v: false }];
    for (const item of data) {
      expect(isIdCard(item.k)).toBe(item.v, `${item.k}=${typeof item.k} must be ${item.v}`);

      const ctr = new FormControl(item.k);
      if (item.v) {
        expect(_Validators.idCard(ctr)).toBeNull();
      } else {
        expect(_Validators.idCard(ctr)).toEqual({ idCard: true });
      }
    }
  });

  it('#isMobile', () => {
    const data = [
      { k: '15900000000', v: true },
      { k: '17000000000', v: true },
      { k: '14700000000', v: true },
      { k: '1590000000', v: false },
      { k: '+8615900000000', v: true },
    ];
    for (const item of data) {
      expect(isMobile(item.k)).toBe(item.v, `${item.k}=${typeof item.k} must be ${item.v}`);

      const ctr = new FormControl(item.k);
      if (item.v) {
        expect(_Validators.mobile(ctr)).toBeNull();
      } else {
        expect(_Validators.mobile(ctr)).toEqual({ mobile: true });
      }
    }
  });

  it('#isTelPhone', () => {
    const data = [
      { k: '15900000000', v: true },
      { w: 'tel', k: '0757-88888888', v: true },
      { w: 'tel', k: '07572-88888888', v: false },
      { w: 'phone', k: '0757-88888888', v: false },
      { w: 'multFormat', k: '14700000000/1154879879', v: true },
      { k: '1590000000', v: false },
      { k: '+8615900000000', v: true },
    ];
    for (const item of data) {
      expect(isTelPhone(item.w, item.k)).toBe(item.v, `${item.k}=${typeof item.k} must be ${item.v}`);

      const ctr = new FormControl(item.k);
      if (item.v) {
        expect(_Validators.telPhone(item.w)(ctr)).toBeNull();
      } else {
        expect(_Validators.telPhone(item.w)(ctr)).toEqual({ telPhone: true });
      }
    }
  });

  it('#isUrl', () => {
    const data = [
      { k: 'http://1ziton.com', v: true },
      { k: 'http://fex.1ziton.com/pixelmon', v: true },
      { k: '//1ziton.com', v: false },
      { k: '1ziton.com', v: false },
      { k: '中国.com', v: false },
    ];
    for (const item of data) {
      expect(isUrl(item.k)).toBe(item.v, `${item.k}=${typeof item.k} must be ${item.v}`);

      const ctr = new FormControl(item.k);
      if (item.v) {
        expect(_Validators.url(ctr)).toBeNull();
      } else {
        expect(_Validators.url(ctr)).toEqual({ url: true });
      }
    }
  });

  it('#isBase64', () => {
    const data = [
      { k: 'data:image/jpeg;base64,/9j/2wCEAAIBAQEBAQIBAQIDAgECAwMCAgICAwMDAwMDAwMFAwQEBAQDBQUFBgYGBQUHBwgIBwcKCgoKCgwMDAwM', v: true },
      { k: 'http://fex.1ziton.com/pixelmon', v: false },
      { k: '//1ziton.com', v: false },
    ];
    for (const item of data) {
      expect(isBase64(item.k)).toBe(item.v, `${item.k}=${typeof item.k} must be ${item.v}`);

      const ctr = new FormControl(item.k);
      if (item.v) {
        expect(_Validators.base64(ctr)).toBeNull();
      } else {
        expect(_Validators.base64(ctr)).toEqual({ base64: true });
      }
    }
  });

  it('#isCreditCard', () => {
    const data = [
      { k: '6221888200604489572', v: true },
      { k: '62218882006044895720', v: false },
      { k: '622188820060448957', v: false },
      { k: '6221-8882-0060-4489-572', v: true },
    ];
    for (const item of data) {
      expect(isCreditCard(item.k)).toBe(item.v, `${item.k}=${typeof item.k} must be ${item.v}`);

      const ctr = new FormControl(item.k);
      if (item.v) {
        expect(_Validators.creditCard(ctr)).toBeNull();
      } else {
        expect(_Validators.creditCard(ctr)).toEqual({ creditCard: true });
      }
    }
  });

  it('#isEmail', () => {
    const data = [{ k: 'aaa@163.com', v: true }, { k: 'aaa163.com', v: false }, { k: 'aaa@163', v: false }, { k: '@163.com', v: false }];
    for (const item of data) {
      expect(isEmail(item.k)).toBe(item.v, `${item.k}=${typeof item.k} must be ${item.v}`);

      const ctr = new FormControl(item.k);
      if (item.v) {
        expect(_Validators.email(ctr)).toBeNull();
      } else {
        expect(_Validators.email(ctr)).toEqual({ email: true });
      }
    }
  });

  it('#isUUID', () => {
    const data = [
      { k: '9d1a1f65-6099-7a13-83eb-c462a8ffcad2', v: true },
      { k: '9d1a1f65 6099 7a13 83eb c462a8ffcad2', v: false },
      { k: '9d1a1f6560997a1383ebc462a8ffcad2', v: false },
      { k: '9d1a1f65-60997a1383ebc462a8ffcad2', v: false },
    ];
    for (const item of data) {
      expect(isUUID(item.k)).toBe(item.v, `${item.k}=${typeof item.k} must be ${item.v}`);

      const ctr = new FormControl(item.k);
      if (item.v) {
        expect(_Validators.uuid(ctr)).toBeNull();
      } else {
        expect(_Validators.uuid(ctr)).toEqual({ uuid: true });
      }
    }
  });
});
