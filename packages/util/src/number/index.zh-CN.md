---
title: number
subtitle: 数值型
type: Type
---

数值型的处理相关方法集合

## toFixed

字符串的 `toFixed` 原生方法会有以下问题：

 * 1.12*100=112.00000000000001
 * 1.13*100=112.9999999999999
 * '0.015'.toFixed(2)结果为0.01
 * 1121.1/100 = 11.210999999999999

所以有必要进行改写和处理，改写后的 `toFixed` 方法具备自定义四舍五入位数，默认是两位小数

```ts
import { toFixed } from '@pixelmon/util'
toFixed(1.13*100);
// output: 113
toFixed(1.13333);
// output: 1.13
toFixed(1.133333333,4);
// output: 1.1333
toFixed(1.133333333,0);
// output: 1
```

**参数**

- `value: string | number` 数值
- `precision = 2` 精确小数位数，默认2位


## toCentNumber

**元转分** 函数，后端架构定制了金钱数值分为单位时，通常前端展示或者计算之前需要做转换工作，所以统一封装为方法工具。

```ts
import { toCentNumber } from '@pixelmon/util'
toCentNumber(1.13);
// output: 113
toCentNumber(21);
// output: 2100
```

**参数**

- `value: string | number` 数值

## toYuanNumber

**分转元** 函数，后端架构定制了金钱数值分为单位时，通常前端展示或者计算之前需要做转换工作，所以统一封装为方法工具。默认做了保留两位小数

```ts
import { toYuanNumber } from '@pixelmon/util'
toYuanNumber(1130);
// output: 11.3
toYuanNumber(21);
// output: 0.21
toYuanNumber(1080,0);
// output: 11
```

**参数**

- `value: string | number` 数值
- `precision: number` 精确小数位数，默认2位

