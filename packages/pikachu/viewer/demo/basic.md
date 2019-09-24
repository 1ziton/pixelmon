---
order: 1
title:
  en-US: Basic
  zh-CN: 基础
  bg: f2f4f5
---

基础用法。

```ts
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-demo',
  template: `
    <div viewer>
      <img *ngFor="let url of imgUrls" [src]="url" height="24px" width="24px" style="margin-right:8px" />
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
