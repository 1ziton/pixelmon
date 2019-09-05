---
title: dom
subtitle: DOM 工具类
type: Type
---

提供一些DOM操作的方法集合，方便在ts操作DOM，工具化统一管理方法，常见的操作封装也提搞代码复用和使用效率。

## 方法列表


| 方法名称                      | 作用                                                                                            | 参数                                    | 返回类型                                                           |
|-------------------------------|-------------------------------------------------------------------------------------------------|-----------------------------------------|--------------------------------------------------------------------|
| `addClass`                    | 给指定元素添加类样式                                                                            | `element: any, className: string`       | `void`                                                             |
| `addMultipleClasses`          | 给指定元素添加多个类样式                                                                        | `element: any, className: string`       | `void`                                                             |
| `removeClass`                 | 移除指定元素类样式(多个空格隔开)                                                                | `element: any, className: string`       | `void`                                                             |
| `hasClass`                    | 判断元素是否包含对应类样式                                                                      | `element: any, className: string`       | `boolean`                                                          |
| `siblings`                    | 获取元素的兄弟节点                                                                              | `element: any`                          | `Array<Element>`                                                   |
| `find`                        | 查找 element 下的所有元素                                                                       | `element: any, selector: string`        | `Array<Element>`                                                   |
| `findSingle`                  | 查找 element 下的一个子元素                                                                     | `element: any, selector: string`        | `Array<Element>`                                                   |
| `index`                       | 查找 element 在父级下是第几个元素                                                               | `element: any`                          | `Array<Element>`                                                   |
| `indexWithinGroup`            | 查找 element 在父级下有相同属性 `attributeName` 的是第几个元素                                  | `element: any, attributeName: string`   | `number`  -1则为找不到                                             |
| `relativePosition`            | element 在目标元素 `taget` 下的相对位置定位                                                     | `element: any, target: any`             | `void`                                                             |
| `absolutePosition`            | element 在目标元素 `taget` 下的绝对位置定位                                                     | `element: any, target: any`             | `void`                                                             |
| `getHiddenElementOuterHeight` | 获取隐藏元素 element 的高度（`offsetHeight`)                                                    | `element: any, target: any`             | `number`                                                           |
| `getHiddenElementOuterWidth`  | 获取隐藏元素 element 的宽度（`offsetWidth`)                                                     | `element: any, target: any`             | `number`                                                           |
| `getHiddenElementDimensions`  | 获取隐藏元素 element 的宽度和高度                                                               | `element: any, target: any`             | `object`   {offsetWidth,offsetHeight}                              |
| `scrollInView`                | item 在 container 中滚动到可见区域                                                              | `container, item`                       | `void`                                                             |
| `fadeIn`                      | element 淡入显示                                                                                | `element, duration: number`             | `void`                                                             |
| `fadeOut`                     | element 淡出隐藏                                                                                | `element, duration: number`             | `void`                                                             |
| `getWindowScrollTop`          | 获取当前Y滚动条滚动距离(文档顶部)                                                               | -                                       | `number`                                                           |
| `getWindowScrollLeft`         | 获取当前X滚动条滚动距离(文档左侧)                                                               | -                                       | `number`                                                           |
| `matches`                     | 判断 element 的子元素是否存在选择器为 `selector` 的元素                                                            | `element, selector: string`             | `boolean`                                                          |
| `getOuterWidth`               | 获取 element 元素的outer width (margin参数为是否将margin计入)                                   | `element, margin?:boolean`              | `number`                                                           |
| `getHorizontalPadding`        | 获取 element 元素垂直方向的 padding 值                                                          | `element`                               | `number`                                                           |
| `getHorizontalMargin`         | 获取 element 元素垂直方向的 margin 值                                                           | `element`                               | `number`                                                           |
| `innerWidth`                  | 获取 element 元素 innerWidth 值  (包含paddingLeft、paddingRight)                                | `element`                               | `number`                                                           |
| `width`                       | 获取 element 元素 width 值 (去除paddingLeft paddingRight)                                       | `element`                               | `number`                                                           |
| `getInnerHeight`              | 获取 element 元素 innerHeight 值 (包含 paddingTop、paddingBottom)                               | `element`                               | `number`                                                           |
| `getOuterHeight`              | 获取 element 元素 outHeight 值 (包含 marginTop、marginBottom)                                   | `element`                               | `number`                                                           |
| `getHeight`                   | 获取 element 元素 height 值 (去除 paddingTop、paddingBottom、borderTopWidth、borderBottomWidth) | `element`                               | `number`                                                           |
| `getWidth`                    | 获取 element 元素 width 值 (去除 paddingLeft、paddingRight、borderLeftWidth、borderRightWidth)  | `element`                               | `number`                                                           |
| `getViewport`                 | 获取可视区域的高度和宽度                                                                        | -                                       | `object:{ width: number, height:number }`                          |
| `getOffset`                   | 获取元素左上角坐标（getBoundingClientRect）                                                     | `element`                               | `object:{ top: number, left:number }`                              |
| `replaceElementWith`          | 用 replacementElement 替换 element                                                              | `element: any, replacementElement: any` | `any`                                                              |
| `getUserAgent`                | 浏览器user agent                                                                                | -                                       | `string`                                                           |
| `isIE`                        | 判断是否为 IE 浏览器                                                                            | -                                       | `boolean`                                                          |
| `isIOS`                       | 判断是否为 IOS 浏览器                                                                           | -                                       | `boolean`                                                          |
| `isAndroid`                   | 判断是否为 Android 浏览器                                                                       | -                                       | `boolean`                                                          |
| `appendChild`                 | element 添加到 target 下                                                                        | `element: any, target: any`             | `void`                                                             |
| `removeChild`                 | 将 target 下移除 element 元素                                                                   | `element: any, target: any`             | `void`                                                             |
| `isElement`                   | 判断是否 Element                                                                                | `obj:any`                               | `boolean`                                                          |
| `calculateScrollbarWidth`     | 计算 scrollbarWidth 的宽度                                                                      | `el?: HTMLElement`                      | `number`                                                           |
| `calculateScrollbarHeight`    | 计算 scrollbarHeight 的高度                                                                     | -                                       | `number`                                                           |
| `invokeElementMethod`         | 动态调用 Element 的方法                                                                         | -                                       | `void`                                                             |
| `clearSelection`              | 清除 selection 内容                                                                             | -                                       | `void`                                                             |
| `getBrowser`                  | 获取浏览器信息                                                                                  | -                                       | `{browser:string,version:string，webkit?:boolean,safari?:boolean}` |
| `resolveUserAgent`  | 获取浏览器类型和版本号     | -          | `{browser:string,version:string}`   |
| `isInteger`  | 判断是否为 Integer 类型     | `value`          | `boolean`   |
| `isHidden`  | 判断元素是否隐藏     | `element: HTMLElement`          | `boolean`   |