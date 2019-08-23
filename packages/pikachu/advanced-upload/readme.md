---
type: Business
title: advanced-upload
subtitle: 上传组件
cols: 1
module: AdvancedUploadModule
---

## API

### p-advancedUpload

| 参数                | 说明                                                                             | 类型                                                                          | 默认值                                       |
| ------------------- | -------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- | -------------------------------------------- |
| `[accept]`          | 接受上传的文件类型                                                               | `string`                                                                      | `'image/png,image/jpeg,image/gif,image/bmp'` |
| `[action]`          | 上传的地址                                                                       | `string`                                                                      | `''`                                         |
| `[directory]`       | 是否支持上传文件夹                                                               | `boolean`                                                                     | `false`                                      |
| `[disabled]`        | 是否禁用                                                                         | `boolean`                                                                     | `false`                                      |
| `[limit]`           | 限制单次最多上传数量，nzMultiple 打开时有效；0 表示不限                          | `number`                                                                      | `9`                                          |
| `[size]`            | 限制文件大小，单位：KB；0 表示不限                                               | `number`                                                                      | `0`                                          |
| `[fileType]`        | 限制文件类型                                                                     | `string`                                                                      | `'image/png,image/jpeg,image/gif,image/bmp'` |
| `[listType]`        | 上传列表的内建样式，支持三种基本样式                                             | `'text' | 'picture' | 'picture-card' = 'picture-card'`                        | `'picture-card'`                             |
| `[multiple]`        | 是否支持多选文件，ie10+ 支持                                                     | `boolean`                                                                     | `true`                                       |
| `[showButton]`      | 是否展示上传按钮                                                                 | `boolean`                                                                     | `true`                                       |
| `[placeholder]`     | 占位提示语                                                                       | `string`                                                                      | `'上传'`                                     |
| `[customContent]`   | 自定义 content                                                                   | `TemplateRef<any>`                                                            | -                                            |
| `[maxLength]`       | 最多上传数                                                                       | `number`                                                                      | `Infinity`                                   |
| `[bucket]`          | 百度 BOS 上的命名空间                                                            | `string`                                                                      | `'bucket'`                                   |
| `[fastUpload]`      | 是否使用快传                                                                     | `boolean`                                                                     | `true`                                       |
| `[filter]`          | 过滤                                                                             | `UploadFilter[]`                                                              | 详见源码                                     |
| `[showPreviewIcon]` | 是否显示预览图标                                                                 | `boolean`                                                                     | `true`                                       |
| `[showRemoveIcon]`  | 是否显示删除图标                                                                 | `boolean`                                                                     | `true`                                       |
| `[beforeUpload]`    | 上传文件之前的钩子,若返回 false 则停止上传。注意：务必使用 => 定义处理方法       | `(file: UploadFile, fileList: UploadFile[]) => boolean | Observable<boolean>` | -                                            |
| `[remove]`          | 点击移除文件时的回调，返回值为 false 时不移除。注意：务必使用 => 定义处理方法。  | `(file: UploadFile) => boolean | Observable<boolean>`                         | -                                            |
| `[preview]`         | 点击文件链接或预览图标时的回调；注意：务必使用 => 定义处理方法                   | `(file: UploadFile) => void`                                                  | 详见源码                                     |
| `[customRequest]`   | 通过覆盖默认的上传行为，可以自定义自己的上传实现；注意：务必使用 => 定义处理方法 | `(subject: UploadXHRArgs) => Subscription`                                    | 详见源码                                     |

### UploadServiceToken

基本属性

| 属性          | 说明                                         | 类型                    | 是否必填 |
| ------------- | -------------------------------------------- | ----------------------- | -------- |
| `bosConfig`   | 百度 Bos 的配置                              | `BosConfig`             | `true`   |
| `workerUrl`   | 配合秒传的 Worker 的地址，不需要秒传时不必填 | `string`                | `false`  |
| `getConfig()` | 获取 tokon 和配置的的方法                    | `Observable<BosConfig>` | `true`   |

## 注意

- 每个文件的 `uid` 要唯一，用于标识不同文件，若相同或者没有会导致删除功能受限等等。建议不要输入，因为当 `uid` 不存在时 组件内会自动生成；若要输入请保证 `uid` 在 `fileList` 中是唯一的。
- 上传组件依赖于百度 Bos 上传，请自行安装依赖：[@baiducloud/sdk](https://cloud.baidu.com/doc/BOS/s/Djwvyrhiw/ '安装SDK')。
- 百度 Bos 上传依赖于服务 `UploadServiceToken`，建议在 AppModule 中使用`{ provide: UploadServiceToken, useExisting: UploadService }`提供。
- 秒传传依赖于 Worker 用于获取文件 Md5，须在`UploadServiceToken`提供 `workerUrl`。比如放在`assets/js/`目录下，然后`workerUrl:'assets/js/getFileMd5.js'`。

```javascript
// ### getFileMd5.js
this.importScripts('/assets/js/md5.min.js');

function getFlieMd5(file) {
  return new Promise(resolve => {
    const reader = new FileReader();
    reader.onload = function(event) {
      const hash = md5(event.target.result);
      resolve(hash);
    };
    reader.readAsText(file);
  });
}

this.onmessage = event => {
  getFlieMd5(event.data).then(hash => {
    this.postMessage(hash);
  });
};
```

[md5.min.js](https://github.com/1ziton/pixelmon/tree/master/src/assets/js/md5.min.js 'md5.min.js')
