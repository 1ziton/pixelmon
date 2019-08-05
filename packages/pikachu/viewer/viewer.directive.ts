/**
 * @Description: 基于viewer封装
 * @Author: zomixi
 * @Date: 2019-07-09 16:56:59
 */

import { NgModule, Directive, AfterContentInit, OnDestroy, ContentChildren, QueryList, ElementRef, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

declare var Viewer;

@Directive({
  selector: '[viewerImg]',
})
export class ViewerImgDirective implements OnInit {
  @Input() lazyLoadSrc = ''; // 懒加载图片url
  @Input() thumbnailSrc = '/assets/img/thumbnail.png'; // 懒加载缩略图url
  nativeElement: HTMLImageElement; // HTMLImageElement实例

  constructor(private _elementRef: ElementRef<HTMLImageElement>) {
    this.nativeElement = this._elementRef.nativeElement;
  }

  ngOnInit() {
    // 懒加载时赋值url
    if (this.lazyLoadSrc) {
      this.nativeElement.src = this.thumbnailSrc;
      this.nativeElement.dataset.lazyLoadSrc = this.lazyLoadSrc;
    }
  }
}

@Directive({
  selector: '[viewer]',
})
export class ViewerDirective implements AfterContentInit, OnDestroy {
  viewer: any = null; // viewer实例
  private _subscription: Subscription; // 用于unsubscribe

  @Input() isLazyLoad = false; // 是否懒加载图片
  @Input() maxShowNum = Infinity; // 最大显示数量
  @ContentChildren(ViewerImgDirective, { descendants: true }) viewerImgs: QueryList<ViewerImgDirective>; // 当viewerImgs改变时自动更新viewer

  constructor(private _elementRef: ElementRef) {}

  ngAfterContentInit() {
    this.initViewer();

    this._subscription = this.viewerImgs.changes.subscribe(() => {
      // 等待DOM更新
      setTimeout(() => {
        this.initViewer();
      });
    });
  }

  ngOnDestroy() {
    if (this._subscription) {
      this._subscription.unsubscribe();
    }
  }

  initViewer() {
    let imgElements: HTMLCollection;
    // 因为ready事件只会执行一遍，故采用destroy再new的方法，update方法不适用
    if (this.viewer) {
      this.viewer.destroy();
    }
    this.viewer = new Viewer(this._elementRef.nativeElement, {
      ready: () => {
        imgElements = this.viewer.images || [];

        // 给src赋值懒加载url
        if (this.isLazyLoad) {
          // tslint:disable-next-line: prefer-for-of
          for (let index = 0; index < imgElements.length; index++) {
            const element = imgElements[index] as HTMLImageElement;
            element.src = element.dataset.lazyLoadSrc as string;
          }
        }
      },
    });

    // viewer初始化后才有viewer.images
    imgElements = this.viewer.images || [];

    // 超过最大数量的不显示
    for (let index = this.maxShowNum; index < imgElements.length; index++) {
      const element = imgElements[index] as HTMLImageElement;
      element.hidden = true;
    }
  }
}

@NgModule({
  declarations: [ViewerDirective, ViewerImgDirective],
  exports: [ViewerDirective, ViewerImgDirective],
})
export class ViewerDirectiveModule {}
