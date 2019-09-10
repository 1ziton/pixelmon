
const data = [
  { code: '110000000000', parentCode: '000000000000', name: '北京市', level: 0, mergerName: '北京市' },
  { code: '120000000000', parentCode: '000000000000', name: '天津市', level: 0, mergerName: '天津市' },
  { code: '130000000000', parentCode: '000000000000', name: '河北省', level: 0, mergerName: '河北省' },
  { code: '140000000000', parentCode: '000000000000', name: '山西省', level: 0, mergerName: '山西省' },
  { code: '150000000000', parentCode: '000000000000', name: '内蒙古自治区', level: 0, mergerName: '内蒙古自治区' },
  { code: '210000000000', parentCode: '000000000000', name: '辽宁省', level: 0, mergerName: '辽宁省' },
  { code: '220000000000', parentCode: '000000000000', name: '吉林省', level: 0, mergerName: '吉林省' },
  { code: '230000000000', parentCode: '000000000000', name: '黑龙江省', level: 0, mergerName: '黑龙江省' },
  { code: '310000000000', parentCode: '000000000000', name: '上海市', level: 0, mergerName: '上海市' },
  { code: '320000000000', parentCode: '000000000000', name: '江苏省', level: 0, mergerName: '江苏省' },
  { code: '330000000000', parentCode: '000000000000', name: '浙江省', level: 0, mergerName: '浙江省' },
  { code: '340000000000', parentCode: '000000000000', name: '安徽省', level: 0, mergerName: '安徽省' },
  { code: '350000000000', parentCode: '000000000000', name: '福建省', level: 0, mergerName: '福建省' },
  { code: '360000000000', parentCode: '000000000000', name: '江西省', level: 0, mergerName: '江西省' },
  { code: '370000000000', parentCode: '000000000000', name: '山东省', level: 0, mergerName: '山东省' },
  { code: '410000000000', parentCode: '000000000000', name: '河南省', level: 0, mergerName: '河南省' },
  { code: '420000000000', parentCode: '000000000000', name: '湖北省', level: 0, mergerName: '湖北省' },
  { code: '430000000000', parentCode: '000000000000', name: '湖南省', level: 0, mergerName: '湖南省' },
  { code: '440000000000', parentCode: '000000000000', name: '广东省', level: 0, mergerName: '广东省' },
  { code: '450000000000', parentCode: '000000000000', name: '广西壮族自治区', level: 0, mergerName: '广西壮族自治区' },
  { code: '460000000000', parentCode: '000000000000', name: '海南省', level: 0, mergerName: '海南省' },
  { code: '500000000000', parentCode: '000000000000', name: '重庆市', level: 0, mergerName: '重庆市' },
  { code: '510000000000', parentCode: '000000000000', name: '四川省', level: 0, mergerName: '四川省' },
  { code: '520000000000', parentCode: '000000000000', name: '贵州省', level: 0, mergerName: '贵州省' },
  { code: '530000000000', parentCode: '000000000000', name: '云南省', level: 0, mergerName: '云南省' },
  { code: '540000000000', parentCode: '000000000000', name: '西藏自治区', level: 0, mergerName: '西藏自治区' },
  { code: '610000000000', parentCode: '000000000000', name: '陕西省', level: 0, mergerName: '陕西省' },
  { code: '620000000000', parentCode: '000000000000', name: '甘肃省', level: 0, mergerName: '甘肃省' },
  { code: '630000000000', parentCode: '000000000000', name: '青海省', level: 0, mergerName: '青海省' },
  { code: '640000000000', parentCode: '000000000000', name: '宁夏回族自治区', level: 0, mergerName: '宁夏回族自治区' },
  { code: '650000000000', parentCode: '000000000000', name: '新疆维吾尔自治区', level: 0, mergerName: '新疆维吾尔自治区' },
  { code: '澳门特别行政区', parentCode: '000000000000', name: '澳门特别行政区', level: 0, mergerName: '澳门特别行政区' },
  { code: '香港特别行政区', parentCode: '000000000000', name: '香港特别行政区', level: 0, mergerName: '香港特别行政区' },
];

export const AREAS = {
  'GET /areas': () => {
    return data;
  },
};
