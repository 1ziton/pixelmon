import { toFixed, toCentNumber, toYuanNumber } from './number';

describe('util: number', () => {
  describe('#toFixed', () => {
    it('Fix:1121.1/100', () => {
      expect(toFixed(1121.1 / 100)).toBe(11.21);
    });
    it('Fix: 解决"0.015".toFixed(2)结果为0.01', () => {
      expect(toFixed(0.015, 2)).toBe(0.02);
    });
    it('Fix: 1.13*100=112.9999999999999', () => {
      expect(toFixed(1.13 * 100, 0)).toBe(113);
    });
    it('1.133333333', () => {
      expect(toFixed(1.133333333, 4)).toBe(1.1333);
    });
    it('1.133333333', () => {
      expect(toFixed(1.133333333, 0)).toBe(1);
    });
  });
  describe('#toYuanNumber', () => {
    it('normal', () => {
      expect(toYuanNumber(1080)).toBe(10.8);
    });
    it('precision test', () => {
      expect(toYuanNumber(1080,0)).toBe(11);
    });
  });
  describe('#toCentNumber', () => {
    it('10.8', () => {
      expect(toCentNumber(10.8)).toBe(1080);
    });
  });
});
