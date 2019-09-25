/**
 * 模拟lodash _.pick
 */
export function pick(o: any, props: Array<string>) {
  return Object.assign({}, ...props.map(prop => ({ [prop]: o[prop] })));
}
