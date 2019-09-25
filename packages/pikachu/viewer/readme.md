---
type: Business
title: viewer
subtitle: 图片浏览
cols: 1
order: 1
module: ViewerModule
---

图片展示，基于 [viewerjs](https://fengyuanchen.github.io/viewerjs/) 封装。

## API

### [viewer]

| 参数           | 说明       | 类型      | 默认值  |
| -------------- | ---------- | --------- | ------- |
| `[isLazyLoad]` | 是否懒加载 | `boolean` | `false` |

### [viewerImg]

基本属性

| 参数             | 说明             | 类型     | 默认值 |
| ---------------- | ---------------- | -------- | ------ |
| `[lazyLoadSrc]`  | 懒加载图片 url   | `string` | -      |
| `[thumbnailSrc]` | 懒加载时的缩略图 | `string` | -      |

## 注意

依赖了 viewer.js，请自行安装依赖:[viewer.js](https://github.com/fengyuanchen/viewerjs)。
