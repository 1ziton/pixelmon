import uuid from './index';

// Verify ordering of v1 ids created with explicit times
const TIME = 1321644961388; // 2011-11-18 11:36:01.388-08:00

describe('utils: uid', () => {
  it('v1:Explicit options produce expected id', () => {
    const id = uuid.v1({
      msecs: 1321651533573,
      nsecs: 5432,
      clockseq: 0x385c,
      node: [0x61, 0xcd, 0x3c, 0xbb, 0x32, 0x10],
    });
    expect(id).toEqual('d9428888-122b-11e1-b85c-61cd3cbb3210');
  });
  it('v1:IDs created at same msec are different', () => {
    expect(uuid.v1({ msecs: TIME })).not.toEqual(uuid.v1({ msecs: TIME }));
  });
  it('test:v3', () => {
    // Expect to get the same results as http://tools.adjet.org/uuid-v3
    expect(uuid.v3('hello.example.com', uuid.v3.DNS)).toEqual('9125a8dc-52ee-365b-a5aa-81b0b3681cf6');

    expect(uuid.v3('http://example.com/hello', uuid.v3.URL)).toEqual('c6235813-3ba4-3801-ae84-e0a6ebb7d138');
    expect(uuid.v3('hello', '0f5abcd1-c194-47f3-905b-2df7263a084b')).toEqual('a981a0c2-68b1-35dc-bcfc-296e52ab01ec');
  });
  it('test:v5', () => {
    // Expect to get the same results as http://tools.adjet.org/uuid-v5
    expect(uuid.v5('hello.example.com', uuid.v5.DNS)).toEqual('fdda765f-fc57-5604-a269-52a7df8164ec');
    expect(uuid.v5('http://example.com/hello', uuid.v5.URL)).toEqual('3bbcee75-cecc-5b56-8031-b6641c1ed1f1');
    expect(uuid.v5('hello', '0f5abcd1-c194-47f3-905b-2df7263a084b')).toEqual('90123e1c-7512-523e-bb28-76fab9f2f73d');
  });
});
