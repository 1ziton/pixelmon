# blocks

区块是组件的拼装集合，它比组件库提供了更上层的业务封装能力，但是这也让它变得没有组件库那么地纯粹。


## 约定

### 目录结构

```
 |-- article-list # 区块名称
     |-- src # 源码文件
     |-- index.ts # 统一入口文件
     |-- package.json # 区块信息文件描述
```

**package.json** 文件说明

重要的属性有如下，还有 `version` 和 `description`

```json

  "blockConfig": {
    "name": "article-list",
    "title": "文章列表",
    "categories": [
      "列表"
    ],
    "screenshot": "https://unpkg.com/@pixelmon-materials/article-list-block/screenshot.png",
    "publishTime": "2019-09-21 13:29:34",
    "updateTime": "2019-09-21 17:29:39"
  },

 ```

 这些信息都会动态展示到网站，所以需要认真书写。

