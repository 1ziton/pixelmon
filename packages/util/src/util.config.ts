import { Injectable } from '@angular/core';
import { ArrayConfig } from './array/array.config';

@Injectable({ providedIn: 'root' })
export class PixelmonUtilConfig {
  array?: ArrayConfig;
}
