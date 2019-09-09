---
type: Business
title: steps
subtitle: 步骤条
cols: 1
module: StepsModule
---

当任务复杂或者存在先后关系时，将其分解成一系列步骤，从而简化任务。引导用户按照流程完成任务的导航条。

## API

### p-steps

| 参数                        | 说明                                         | 类型     | 默认值        |
| --------------------------- | -------------------------------------------- | -------- | ------------- |
| `[activeBackground]`        | 激活的步骤进度条背景                         | `string` | `#1ECB8E`     |
| `[activeWidth]`             | 激活的步骤进度条宽度(请使用百分比)           | `string` | `0%`          |
| `[inactiveBackground]`      | 未激活的步骤进度条背景                       | `string` | `#EAF0F0`     |
| `[backgroundImage]`         | 背景图                                       | `string` | -             |
| `[activePointColor]`        | 默认 activeStep 的点的颜色                   | `string` | `#1ECB8E`     |
| `[activeContentColor]`      | 默认 activeStep 的文本的颜色                 | `string` | `#FFFFFF`     |
| `[activeContentBackground]` | 默认 activeStep 的文本的背景                 | `string` | `#1ECB8E`     |
| `[activeStep]`              | activeStep 的具体内容，样式优先级大于默认    | `Step`   | -             |
| `[keyPointColor]`           | 默认 keyStep 的点的颜色                      | `string` | `#1ECB8E`     |
| `[keyContentColor]`         | 默认 keyStep 的文本的颜色                    | `string` | `#999999`     |
| `[keyContentBackground]`    | 默认 keyStep 的文本的背景                    | `string` | `transparent` |
| `[keySteps]`                | keyStep 的具体内容数组，样式优先级大于默认   | `Step[]` | `[]`          |
| `[extraPointColor]`         | 默认 extraStep 的点的颜色                    | `string` | `#F5A623`     |
| `[extraContentColor]`       | 默认 extraStep 的文本的颜色                  | `string` | `#333333`     |
| `[extraContentBackground]`  | 默认 extraStep 的文本的背景                  | `string` | `#FFFFFF`     |
| `[extraSteps]`              | extraStep 的具体内容数组，样式优先级大于默认 | `Step[]` | `[]`          |

### Step

| 参数                | 说明                           | 类型      | 是否必填 |
| ------------------- | ------------------------------ | --------- | -------- |
| `index`             | 相对于左边的坐标(请使用百分比) | `string`  | `true`   |
| `title`             | 标题                           | `string`  | `true`   |
| `subTitle`          | 副标题                         | `string`  | `false`  |
| `description`       | 描述                           | `string`  | `false`  |
| `pointColor`        | 点的颜色                       | `string`  | `false`  |
| `contentColor`      | 文本的颜色                     | `string`  | `false`  |
| `contentBackground` | 文本的背景                     | `string`  | `false`  |
| `hiddenContent`     | 是否隐藏文本                   | `boolean` | `false`  |
