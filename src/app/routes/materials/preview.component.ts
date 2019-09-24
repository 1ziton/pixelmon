/**
 * @author: giscafer ,https://github.com/giscafer
 * @date: 2019-09-23 16:32:20
 * @description: 物料预览
 */

import { Component, Input, OnInit, ChangeDetectorRef, ViewChildren } from '@angular/core';
import { MaterialsService } from '@core/materials.service';
import { ENTY_BLOCKS_COMPONENTS } from '@materials/blocks/entry_components';
import { NzMessageService } from 'ng-zorro-antd';
import { DynamicComponent } from 'ng-dynamic-component';

@Component({
  selector: 'app-preview-materials',
  template: `
    <div class="flow-modal">
      <div class="top">
        <span class="title"> {{ selector }} - {{ title }} </span>
        <span class="close" (click)="close()">
          <i nz-icon nzType="close-circle" nzTheme="outline"></i>
        </span>
      </div>
      <div class="modal-content">
        <ndc-dynamic [ndcDynamicComponent]="componentType" #component></ndc-dynamic>
      </div>
      <div class="footer"></div>
    </div>
  `,
  styles: [
    `
      .flow-modal {
        position: fixed;
        width: 95%;
        height: 95%;
        left: 2.5%;
        top: 2.5%;
        z-index: 1000;
        background-color: rgba(0, 0, 0, 0.15);
      }
      .title {
        display: inline-block;
        font-size: 18px;
        width: 30%;
        margin: 5px 30px;
      }
      .top {
        background: #ee8a7b;
        color: #fff;
      }
      .top,
      .footer {
        height: 40px;
      }

      .modal-content {
        position: relative;
        padding: 20px 30px 0 30px;
        overflow-y: scroll;
        width: 100%;
        height: 90%;
      }
      .close {
        float: right;
        margin: 0 10px;
        cursor: pointer;
        font-size: 28px;
      }
    `,
  ],
})
export class MaterialsPreviewComponent implements OnInit {
  @ViewChildren(DynamicComponent) component: DynamicComponent;

  componentType: any;
  @Input()
  title: string;
  @Input()
  selector: string;

  @Input()
  set componentName(name: string) {
    console.log(name);
    if (!name) {
      this.msgSrv.error(`没有找到物料组件名称，请参考约定规则!`);
      return;
    }
    const arr = ENTY_BLOCKS_COMPONENTS.filter(comp => {
      return comp.name === name;
    });
    if (arr.length === 1) {
      this.componentType = arr[0];
      this.cdr.detectChanges();
      return;
    }
    if (arr.length > 1) {
      this.msgSrv.error(`物料组件类名重复，请参考约定规则!`);
      return;
    }
    this.msgSrv.error(`没有找到物料组件类，请确认配置!`);
  }

  constructor(private materialSrv: MaterialsService, private msgSrv: NzMessageService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {}

  // Module级别的动态渲染方式
  // public renderMaterials(comp: any) {
  //   @NgModule({
  //     declarations: [comp],
  //     imports: [CommonModule, SharedModule],
  //     providers: [],
  //   })
  //   class TemplateModule {}

  //   const mod = this.compiler.compileModuleAndAllComponentsSync(TemplateModule);
  //   const factory = mod.componentFactories.find(p => p === comp);
  //   const component = this.container.createComponent(factory as any);
  //   // Object.assign(component.instance, properties);
  //   return component;
  // }

  close() {
    this.materialSrv.next('close');
  }
}
