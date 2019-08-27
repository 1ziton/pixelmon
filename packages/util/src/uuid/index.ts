/**
 * @author: giscafer ;https://github.com/giscafer
 * @date: 2019-08-27 10:19:05
 * @description: 依赖 https://github.com/kelektiv/node-uuid
 */

import v1 from 'uuid/v1';
import v3 from 'uuid/v3';
import v4 from 'uuid/v4';
import v5 from 'uuid/v5';

const uuid = v4;
uuid.v1 = v1;
uuid.v3 = v3;
uuid.v4 = v4;
uuid.v5 = v5;

export default uuid;
export const uuidv1 = v1;
export const uuidv3 = v3;
export const uuidv4 = v4;
export const uuidv5 = v5;
