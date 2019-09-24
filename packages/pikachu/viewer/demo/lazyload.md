---
order: 1
title:
  en-US: lazyload
  zh-CN: 懒加载
  bg: f2f4f5
---

懒加载用法,即点开 viewer 时才下载图片。

```ts
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-demo',
  template: `
    <div viewer [isLazyLoad]="true">
      <img viewerImg *ngFor="let url of imgUrls" [lazyLoadSrc]="url" height="24px" width="24px" style="margin-right:8px" />
    </div>
  `,
})
export class BasicComponent implements OnInit {
  imgUrls = [
    'https://uploadbeta.com/api/pictures/random/?key=BingEverydayWallpaperPicture',
    'https://uploadbeta.com/api/pictures/random/?key=BingEverydayWallpaperPicture',
    'https://uploadbeta.com/api/pictures/random/?key=BingEverydayWallpaperPicture',
    'https://uploadbeta.com/api/pictures/random/?key=BingEverydayWallpaperPicture',
  ];

  constructor() {}

  ngOnInit() {}
}
```
