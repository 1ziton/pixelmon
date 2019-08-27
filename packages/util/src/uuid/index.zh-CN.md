---
title: uuid
subtitle: UUID
type: Type
---

生成符合 RFC 的 UUID，基于 [node-uuid](https://github.com/kelektiv/node-uuid) 模块实现

## 示例

Version 1 (timestamp)：

```typescript
import { uuidv1 } from '@pixelmon/util';
uuidv1(); // ⇨ '2c5ea4c0-4067-11e9-8bad-9b1deb4d3b7d'
```

Version 3 (namespace):

```ts
import { uuidv3 } from '@pixelmon/util';

// ... using predefined DNS namespace (for domain names)
uuidv3('hello.example.com', uuidv3.DNS); // ⇨ '9125a8dc-52ee-365b-a5aa-81b0b3681cf6'

// ... using predefined URL namespace (for, well, URLs)
uuidv3('http://example.com/hello', uuidv3.URL); // ⇨ 'c6235813-3ba4-3801-ae84-e0a6ebb7d138'

// ... using a custom namespace
//
// Note: Custom namespaces should be a UUID string specific to your application!
// E.g. the one here was generated using this modules `uuid` CLI.
const MY_NAMESPACE = '1b671a64-40d5-491e-99b0-da01ff1f3341';
uuidv3('Hello, World!', MY_NAMESPACE); // ⇨ 'e8b5a51d-11c8-3310-a6ab-367563f20686'
```

Version 4 (random):

```ts
import { uuidv4 } from '@pixelmon/util';
uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
```

Version 5 (namespace):

```ts
import { uuidv5 } from '@pixelmon/util';

// ... using predefined DNS namespace (for domain names)
uuidv5('hello.example.com', uuidv5.DNS); // ⇨ 'fdda765f-fc57-5604-a269-52a7df8164ec'

// ... using predefined URL namespace (for, well, URLs)
uuidv5('http://example.com/hello', uuidv5.URL); // ⇨ '3bbcee75-cecc-5b56-8031-b6641c1ed1f1'

// ... using a custom namespace
//
// Note: Custom namespaces should be a UUID string specific to your application!
// E.g. the one here was generated using this modules `uuid` CLI.
const MY_NAMESPACE = '1b671a64-40d5-491e-99b0-da01ff1f3341';
uuidv5('Hello, World!', MY_NAMESPACE); // ⇨ '630eb68f-e0fa-5ecc-887a-7c7a62614681'
```

以上还可以使用 `uuid.v1、uuid.v3、uuid.v4、uuid.v5` 来代替，如：

```ts
import uuid from '@pixelmon/util';
// uuid.v1()
// uuid.v3()
// uuid.v4()
// uuid.v5()
```

