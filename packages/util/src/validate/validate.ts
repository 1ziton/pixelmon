/** 是否为数字 */
export function isNum(value: string | number): boolean {
  return /^((-?\d+\.\d+)|(-?\d+)|(-?\.\d+))$/.test(value.toString());
}

/** 是否为整数 */
export function isInt(value: string | number): boolean {
  // tslint:disable-next-line:triple-equals
  return isNum(value) && parseInt(value.toString(), 10) == value;
}

/** 是否为小数 */
export function isDecimal(value: string | number): boolean {
  return isNum(value) && !isInt(value);
}

/** 是否为身份证 */
export function isIdCard(value: string): boolean {
  return typeof value === 'string' && /(^\d{15}$)|(^\d{17}([0-9]|X)$)/i.test(value);
}

/** 是否为手机号 */
export function isMobile(value: string): boolean {
  return typeof value === 'string' && /^(0|\+?86|17951)?(13[0-9]|15[0-9]|17[0678]|18[0-9]|14[57])[0-9]{8}$/.test(value);
}

/** 是否为手机号/座机/或有特殊符号分隔的电话号码 */
export function isTelPhone(which = 'phone', value: string): boolean {
  const _regex = {
    phone: /^(0|\+?86|17951)?(13[0-9]|15[0-9]|17[0678]|18[0-9]|14[57])[0-9]{8}$/,
    tel: /^[0]\d{2,3}-\d{7,8}$/, // 标准座机没分号
    multFormat: /^\d[\s+-\/,，0-9]{0,34}$/, // 任意数字加特殊符号
  };
  return _regex[which].test(value);
}

/** 是否URL地址 */
export function isUrl(url: string): boolean {
  return /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/.test(
    url,
  );
}

/** 是否base64编码 */
export function isBase64(value: string): boolean {
  return /^\s*data:([a-z]+\/[a-z0-9-+.]+(;[a-z-]+=[a-z0-9-]+)?)?(;base64)?,([a-z0-9!$&',()*+;=\-._~:@\/?%\s]*?)\s*$/i.test(value);
}

/** 是否银行卡格式 */
export function isCreditCard(value: string): boolean {
  const sanitized = value.replace(/[^0-9]+/g, '');
  return /^(?:[1-9]{1})(?:\d{15}|\d{18})$/.test(sanitized);
}

/** 是否email */
export function isEmail(value: string): boolean {
  return /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(value);
}

/** 是否uuid */
export function isUUID(value: string): boolean {
  return /^[0-9a-z]{8}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{12}$/i.test(value);
}
