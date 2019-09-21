/**
 * @author: giscafer ,https://github.com/giscafer
 * @date: 2019-09-21 17:39:38
 * @description:
 */

import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { _HttpClient } from '@pixelmon/theme';

const MaterialsMeta = require('./materials.json');
@Component({
  selector: 'app-list-blocks',
  templateUrl: './blocks.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProListArticlesComponent implements OnInit {
  // endregion

  constructor(private cdr: ChangeDetectorRef) {}

  list: any[] = [];
  loading = false;

  // region: cateogry
  categories: Array<{ text: string; id: number; value: boolean }> = [];
  // endregion

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
    this.categories = MaterialsMeta.categories.map((c, index) => ({ id: index, value: false, text: c }));
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
}
