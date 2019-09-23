import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list-layout',
  templateUrl: './list.component.html',
  host: {
    '[style.padding]': '"40px 80px 80px 80px"'
  },
})
export class ProListLayoutComponent implements OnInit, OnDestroy {
  private router$: Subscription;
  tabs: any[] = [
    {
      key: 'blocks',
      tab: '区块',
    },
    {
      key: 'scaffolds',
      tab: '模板',
    },
  ];

  pos = 0;

  constructor(private router: Router) {}

  private setActive() {
    const key = this.router.url.substr(this.router.url.lastIndexOf('/') + 1);
    const idx = this.tabs.findIndex(w => w.key === key);
    if (idx !== -1) {
      this.pos = idx;
    }
  }

  ngOnInit(): void {
    console.log('list')
    this.router$ = this.router.events.pipe(filter(e => e instanceof ActivationEnd)).subscribe(() => this.setActive());
    this.setActive();
  }

  to(item: any) {
    this.router.navigateByUrl(`/materials/list/${item.key}`);
  }

  ngOnDestroy() {
    if (this.router$) {
      this.router$.unsubscribe();
    }
  }
}
