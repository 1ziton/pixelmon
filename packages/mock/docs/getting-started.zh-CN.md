---
order: 1
title: 开始使用
type: Documents
---

## 写在前面

Mock 是指通过生成模拟数据让前端开发人员独立于后端进行开发，有时我们也会运用在测试环境中。

`@pixelmon/mock` 是一个简单 Mock 功能，包括以下几个特征：

- 任意 Angular 项目
- 开发无侵入
- 超简单用法
- 支持 [mock.js](http://mockjs.com/)

## 如何使用

安装 `@pixelmon/mock` 依赖包：

```bash
yarn add @pixelmon/mock -D
```

在根模块 `AppModule` 导入 [Mock 规则数据](/mock/rule)和 `PixelmonMockModule`；

```ts
import { PixelmonMockModule } from '@pixelmon/mock';
import * as MOCKDATA from '../../_mock';
// 只对开发环境有效
import { environment } from '../environments/environment';
const MOCKMODULE = !environment.production ? [ PixelmonMockModule.forRoot({ data: MOCKDATA }) ] : [];

@NgModule({
  imports: [
    ...MOCKMODULE
  ]
})
```

### MockOptions 配置

`forRoot` 参数还包括：

| 参数名                       | 类型      | 默认值  | 描述                                                                                                               |
| ---------------------------- | --------- | ------- | ------------------------------------------------------------------------------------------------------------------ |
| `[data]`                     | `any`     | -       | Mock 数据规则                                                                                                      |
| `[delay]`                    | `number`  | `300`   | 请求延迟，单位：毫秒                                                                                               |
| `[force]`                    | `boolean` | `false` | 是否强制所有请求都 Mock，`true` 表示当请求的 URL 不存在时直接返回 404 错误，`false` 表示未命中时发送真实 HTTP 请求 |
| `[log]`                      | `boolean` | `true`  | 是否打印 Mock 请求信息，弥补浏览器无 Network 信息；当请求经过 Mock 会接收【👽Mock】                                |
| `[executeOtherInterceptors]` | `boolean` | `true`  | 是否拦截命中后继续调用后续拦截器的 `intercept` 方法                                                                |

> 若**懒模块**还需要导入 `forChild` 确保 HTTP 拦截器有效，一般可以直接在 SharedModule 直接使用 `forChild`。

### 为什么只对开发环境有效？

Mock 并非是真实数据，大部分场景是针对开发本地或测试环境；所以在生产环境中不应该包括 Mock 模块以及规则数据。因此上述才会根据 `!environment.production` 依据环境来决定是否加载 `PixelmonMockModule`。

当然，你依然可以在生产环境也使用这种规则，就像 //ng-pixelmon.github.io/ng-pixelmon/ 一样，需要一些模拟请求来保证环境的运行。

```ts
import { PixelmonMockModule } from '@pixelmon/mock';
import * as MOCKDATA from '../../_mock';
@NgModule({
  imports: [
    PixelmonMockModule.forRoot({ data: MOCKDATA })
  ]
})
```
