/**
 * 模拟lodash _.pick
 * @param {Object} o
 * @param  {Array<string>} props
 */
export function pick(o, props) {
  return Object.assign({}, ...props.map(prop => ({ [prop]: o[prop] })));
}
