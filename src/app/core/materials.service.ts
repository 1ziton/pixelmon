import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MaterialsService {
  private notify$ = new BehaviorSubject<any>(null!);

  next(value: any) {
    this.notify$.next(value);
  }

  get change() {
    return this.notify$.asObservable();
  }
}
