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

  // region: owners
  owners = [
    {
      id: 'wzj',
      name: '我自己',
    },
    {
      id: 'wjh',
      name: '吴家豪',
    },
    {
      id: 'zxx',
      name: '周星星',
    },
    {
      id: 'zly',
      name: '赵丽颖',
    },
    {
      id: 'ym',
      name: '姚明',
    },
  ];

  constructor(
    private overlay: Overlay,
    private cdr: ChangeDetectorRef,
    public msg: NzMessageService,
    private materialSrv: MaterialsService,
  ) {}

  changeCategory(status: boolean, idx: number) {
    if (idx === 0) {
      this.categories.map(i => (i.value = status));
    } else {
      this.categories[idx].value = status;
    }
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

    this.categories = MaterialsMeta.categories.map((c, index) => ({
      id: index,
      value: false,
      text: c,
    }));
    this.getData();
  }

  getData() {
    this.loading = true;
    setTimeout(() => {
      this.list = MaterialsMeta.materials;
      this.loading = false;
      this.cdr.detectChanges();
    }, 17);
    // this.http.get('/api/list', { count: this.q.ps }).subscribe((res: any) => {
    //   this.list = more ? this.list.concat(res) : res;
    //   this.loading = false;
    //   this.cdr.detectChanges();
    // });
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
}
