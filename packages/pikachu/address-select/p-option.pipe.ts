
import { Pipe, PipeTransform } from '@angular/core';
import { POption } from './interface';

export type TFilterOption = (input: string, option: POption) => boolean;

@Pipe({ name: 'pFilterOption' })
export class PFilterOptionPipe implements PipeTransform {
  transform(
    options: POption[],
    searchValue: string,
    filterOption: TFilterOption,
    serverSearch: boolean
  ): POption[] {
    console.log(options)
    if (serverSearch || !searchValue) {
      return options;
    } else {
      return (options as POption[]).filter(o => filterOption(searchValue, o));
    }
  }
}

export function defaultFilterOption(searchValue: string, option: POption): boolean {
  if (option && option.label) {
    return option.label.toLowerCase().indexOf(searchValue.toLowerCase()) > -1;
  } else {
    return false;
  }
}
