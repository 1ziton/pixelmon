---
order: 1
title: 开始使用
type: Documents
module: PixelmonGGEditorModule
---

## 写在前面

[GGEditor](https://github.com/gaoli/GGEditor) 是一个基于 G6 和 React 的可视化图编辑器，`@pixelmon/ggeditor` 模块则是对 GGEditor 的封装，使得 React 组件可以直接使用到 Angular 技术栈项目中，而不是花更多的时间改写为 Angular 组件，这也是一个临时的解决方案。有时间后，会考虑使用 Angular 给予 G6 开发出一个类似的可视化图编辑器组件。


- [GGEditor 文档](https://github.com/gaoli/GGEditor/blob/master/docs/README.zh-CN.md)


## 如何使用

**安装**

```bash
yarn add @pixelmon/ggeditor 
```

或

```bash
npm install @pixelmon/ggeditor 
```


**注册**

在根模块 `AppModule` 导入 `PixelmonGGEditorModule`；

```ts
import { PixelmonGGEditorModule } from '@pixelmon/ggeditor';

@NgModule({
  imports: [
    PixelmonGGEditorModule
  ]
})
```


### 属性

| 参数名       | 类型           | 默认值            | 描述                                                                                                                                  |
|--------------|----------------|-------------------|---------------------------------------------------------------------------------------------------------------------------------------|
| `[data]`     | `FlowProps` | -         | 流程图数据内容                                                          |
| `[style]`   | `Object`       | `width: 500, height: 500`      |  编辑器样式 |
