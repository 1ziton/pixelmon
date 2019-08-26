import { uid } from './uid';

describe('utils: uid', () => {
  it('#work', () => {
    const result = uid();
    expect(result.length === 11);
  });
});
