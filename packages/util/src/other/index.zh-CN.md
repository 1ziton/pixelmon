---
title: other
subtitle: 其他
type: Type
---

## isEmptyVal

值为 `null` 、`undefined` 或 `空字符串` 三者之一

## isValidVal

有效值，值不为 `null` 、`undefined` 、 `空字符串` 、`null 和 undefined 字符串`

## isEmpty

节点不为空，用于校验 `<ng-content></ng-content>` 是否为空，自定义组件时蛮有用。

## toBoolean

转换 `boolean` 属性

## toNumber

转换 `number` 属性

## deepGet

类似 `_.get`，根据 `path` 获取安全值。

```ts
const obj = {
  id: 1,
  user: {
    name: 'cipchk',
    age: 18
  }
};

deepGet(obj, 'id'); // 1
deepGet(obj, 'user.age'); // 18
```

## deepCopy

深度复制。

```ts
const source = { a: 1, user: { name: 'cipchk' } };
const obj = deepCopy(source);
```

## deepMerge

深度合并。

```ts
let original = { a: 1, b: { c: 'c' } };
deepMerge(original, { b: { d: 'd' }, arr: [ 1 ] });
// output: { a: 1, b: { c: 'c', d: 'd' }, arr: [ 1 ] }
```

## copy

复制内容至剪贴板。

## updateHostClass

更新宿主组件样式 `class`，例如：

```ts
updateHostClass(
  this.el.nativeElement,
  this.renderer,
  {
    [ 'classname' ]: true,
    [ 'classname' ]: this.type === '1',
    [ this.cls ]: true,
    [ `a-${this.cls}` ]: true
  }
)
```


## deepClone

创建对象的深层克隆。 


```ts
const a = { foo: 'bar', obj: { a: 1, b: 2 } };
const b = deepClone(a); // a !== b, a.obj !== b.obj
```