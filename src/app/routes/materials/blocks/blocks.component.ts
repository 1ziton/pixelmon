/**
 * @author: giscafer ,https://github.com/giscafer
 * @date: 2019-09-21 17:39:38
 * @description:
 */

import { OverlayRef, Overlay } from '@angular/cdk/overlay';
import { ComponentPortal, ComponentType } from '@angular/cdk/portal';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ComponentRef, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { MaterialsPreviewComponent } from '../preview.component';
import { MaterialsService } from '@core/materials.service';
const MaterialsMeta = require('./materials.json');

@Component({
  selector: 'app-list-blocks',
  templateUrl: './blocks.component.html',
  styleUrls: ['./blocks.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlockListComponent implements OnInit {
  private overlayRef: OverlayRef;
  private modalRef: ComponentRef<any> | null; // Modal ComponentRef, "null" means it has been destroyed

  list: any[] = [];
  loading = false;
  categories: Array<{ text: string; id: number; value: boolean }> = [];

  constructor(
    private overlay: Overlay,
    private cdr: ChangeDetectorRef,
    public msgSrv: NzMessageService,
    private materialSrv: MaterialsService,
  ) {}

  changeCategory(status: boolean, idx: number) {
    if (idx === 0) {
      this.categories.map(i => (i.value = status));
    } else {
      this.categories[idx].value = status;
    }
    this.getData(true);
  }

  setOwner() {
    // TODO: wait nz-dropdown OnPush mode
    setTimeout(() => this.cdr.detectChanges());
  }

  ngOnInit() {
    this.materialSrv.change.subscribe((v: any) => {
      if (v === 'close') {
        this.destroyModal();
        return;
      }
    });

    const cate = MaterialsMeta.categories.map((c, index) => ({
      id: index + 1,
      value: false,
      text: c,
    }));
    this.categories = [{ text: '所有', value: false, id: 0 }, ...cate];
    this.getData();
  }

  getData(filter = false) {
    this.loading = true;

    if (!filter) {
      return this.getAllList();
    }
    const qs = this.categories.filter(c => c.value);
    if (qs.length === 0) {
      return this.getAllList();
    }

    // tslint:disable-next-line: prefer-const
    let result: any = [];
    const cateLabels = qs.map(v => v.text).join('');
    for (const m of MaterialsMeta.materials) {
      for (const t of m.categories) {
        if (cateLabels.indexOf(t) !== -1) {
          result.push(m);
          break;
        }
      }
    }

    this.loading = false;
    this.list = result;
    this.cdr.detectChanges();
  }

  getAllList() {
    setTimeout(() => {
      this.list = MaterialsMeta.materials;
      this.loading = false;
      this.cdr.detectChanges();
    }, 17);
  }

  imgLoad($event, item) {
    item.imgError = $event.type === 'error';
  }

  public createModal(component: ComponentType<any>) {
    this.overlayRef = this.overlay.create();
    this.modalRef = this.overlayRef.attach(new ComponentPortal(component));
  }

  private destroyModal(): void {
    if (this.modalRef) {
      this.overlayRef.dispose();
      this.modalRef = null;
    }
  }

  private changeProps(options): void {
    if (this.modalRef) {
      Object.assign(this.modalRef.instance, options);
      console.log(this.modalRef.instance);
    }
  }

  // 需求变动，弹窗无用
  preview(item) {
    const { name, title, entryClassName } = item;
    this.createModal(MaterialsPreviewComponent);
    this.changeProps({ componentName: entryClassName, title, selector: name });
  }

  viewSourceCode(item) {
    if (!item.repositoryUrl) {
      this.msgSrv.error(`没有找到物料组件源码地址，请检测配置!`);
      return;
    }
    window.open(item.repositoryUrl);
  }
}
