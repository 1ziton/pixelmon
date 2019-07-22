import { Pipe, PipeTransform, NgModule } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(value: any[], rule: (element: any) => boolean): any[] {
    if (!Array.isArray(value)) {
      return [];
    }
    if (!rule) {
      return value;
    }
    return value.filter(item => rule(item));
  }
}

@NgModule({
  declarations: [FilterPipe],
  exports: [FilterPipe],
})
export class FilterPipeModule {}
