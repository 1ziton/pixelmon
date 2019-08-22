---
order: 1
title: 开始使用
type: Documents
module: PixelmonGGEditorModule
---

## 写在前面

[GGEditor](https://github.com/gaoli/GGEditor) 是一个基于 G6 和 React 的可视化图编辑器，`@pixelmon/ggeditor` 模块则是对 GGEditor 的封装，使得 React 组件可以直接使用到 Angular 技术栈项目中，而不是花更多的时间改写为 Angular 组件，这也是一个临时的解决方案。有时间会考虑使用 Angular 基于 G6 开发出一个类似的可视化图编辑器组件。


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



## API
 
### p-ggeditor

| 属性             | 说明                     | 类型                        | 默认值                      |
|------------------|--------------------------|-----------------------------|-----------------------------|
| `[type]`         | 绘图类型                 | `GraphType:"flow" | "mind"` | `flow`                      |
| `[enableEditor]` | 启用编辑器               | `boolean`                   | `false`                          |
| `[data]`         | 是否默认高亮第一个选项。 | `FlowProps | MindProps`     | -                           |
| `[style]`        | 样式                     | `Object`                    | `{width: 500, height: 500}` |

