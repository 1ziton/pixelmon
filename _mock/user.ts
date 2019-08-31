import { MockRequest, MockStatusError } from '@pixelmon/mock';
// import * as Mock from 'mockjs';

const r = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min);

export const USERS = {
  // 支持值为 Object 和 Array
  'GET /users': (req: MockRequest) => {
    const totalSize = +(req.queryString.total || 100);
    const size = +(req.queryString.size || 10);
    const res: any = {
      data: [],
      totalSize,
      totalPage: totalSize / size,
    };
    const onlyList = req.queryString!.field === 'list';
    let num = onlyList ? size : +req.queryString.ps;
    if (isNaN(num) || num <= 0) {
      num = size;
    }
    for (let i = 0; i < num; i++) {
      res.data.push({
        id: i + 1,
        thumbnail: `https://randomuser.me/api/portraits/thumb/${r(0, 1) === 0 ? 'men' : 'women'}/${r(1, 50)}.jpg`,
        name: `Tom-${r(1, 10)}`,
        fullname: {
          last: `last-${r(1, 10)}`,
          first: `first-${r(10, 20)}`,
        },
        nat: ['CH', 'US', 'DE'][i % 3],
        birthday: '1992-08-08',
        gender: ['male', 'female'][i % 2],
        email: `aaa${r(1, 10)}@qq.com`,
        phone: `phone-${r(1000, 100000)}`,
        price: r(10, 10000000),
        registered: new Date(),
        pictures: [
          'https://cdn.pixabay.com/photo/2018/01/12/10/19/fantasy-3077928__340.jpg',
          'https://cdn.pixabay.com/photo/2016/10/18/21/22/california-1751455__340.jpg',
          'https://cdn.pixabay.com/photo/2018/08/21/23/29/fog-3622519__340.jpg',
          'https://cdn.pixabay.com/photo/2018/08/14/13/23/ocean-3605547__340.jpg',
        ],
      });
    }
    return onlyList ? res.list : res;
  },
  'GET /user/check/': () => false,
  'GET /user/check/:name': (req: MockRequest) => req.params.name === 'cipchk',
  // GET POST 可省略
  // '/users/1': Mock.mock({ id: 1, 'rank|3': '★★★' }),
  // 发送 Status 错误
  '/500': () => {
    throw new MockStatusError(500);
  },
  '/404': () => {
    throw new MockStatusError(404);
  },
  '/user/:id': (req: MockRequest) => {
    return { id: req.params.id, name: 'detail' };
  },
  '/user/:id/edit': (req: MockRequest) => {
    return { id: req.params.id, name: 'edit' };
  },
  '/user/:id/upload': (req: MockRequest) => {
    return { id: req.params.id, name: 'upload' };
  },
};
