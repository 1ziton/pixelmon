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
  @Input() thumbnailSrc = `data:img/jpg;base64,
  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`; // 懒加载缩略图url
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
