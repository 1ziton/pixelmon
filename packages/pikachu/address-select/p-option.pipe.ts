import { Pipe, PipeTransform } from '@angular/core';
import { POption } from './interface';

export type TFilterOption = (input: string, option: POption) => boolean;

const defaultAddressLevelOptions: POption[] = [
  {
    label: '省',
    value: 'province',
    checked: true,
  },
  {
    label: '市',
    value: 'city',
  },
  {
    label: '区',
    value: 'distrinct',
  },
  {
    label: '街道',
    value: 'street',
  },
];

@Pipe({ name: 'pFilterOption' })
export class AddrFilterOptionPipe implements PipeTransform {
  transform(options: POption[], searchValue: string, filterOption: TFilterOption, serverSearch: boolean): POption[] {
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

export function defaultLevelLabelsFilterOption(level = 1): POption[] {
  return defaultAddressLevelOptions.slice(0, level);
}

@Pipe({ name: 'pAddrLevelFitler' })
export class AddrLevelFilterPipe implements PipeTransform {
  transform(level: number): any[] {
    return defaultLevelLabelsFilterOption(level);
  }
}
