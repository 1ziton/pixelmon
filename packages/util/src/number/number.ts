/**
 * toFixed 解决js精度问题，使用方式：toFixed(value)
 * @param {Number | String} value
 * @param {Number} precision 精度，默认2位小数，需要取整则传0
 * 该方法会处理好以下这些问题：
 * 1.12*100=112.00000000000001
 * 1.13*100=112.9999999999999
 * '0.015'.toFixed(2)结果为0.01
 * 1121.1/100 = 11.210999999999999
 */
export const toFixed = (value, precision = 2) => {
  const num = Number(value);
  if (Number.isNaN(num)) {
    return 0;
  }
  if (num < Math.pow(-2, 31) || num > Math.pow(2, 31) - 1) {
    return 0;
  }
  // console.log(num, precision)
  if (precision < 0 || typeof precision !== 'number') {
    return value;
  } else if (precision > 0) {
    return Math.round(num * Math.pow(10, precision)) / Math.pow(10, precision);
  }
  return Math.round(num);
};

/**
 * 单位为元数值转为分
 * @param {Number} value
 */
export const toCentNumber = value => {
  const num = Number(value);
  if (Number.isNaN(num)) {
    return 0;
  }
  return toFixed(num * 100, 0);
};

/**
 * 分数值数值转为元
 * @param {Number} centval 分为单位
 * @param {Number} precision 精度，默认2位小数
 */
export const toYuanNumber = (centval, precision = 2) => {
  const num = Number(centval);
  if (Number.isNaN(num)) {
    return 0;
  }
  return toFixed(num / 100, precision);
};
