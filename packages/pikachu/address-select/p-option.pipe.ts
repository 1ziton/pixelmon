import { Pipe, PipeTransform } from '@angular/core';
import { AddrOption } from './interface';

export type TFilterOption = (input: string, option: AddrOption) => boolean;

const defaultAddressLevelOptions: AddrOption[] = [
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

@Pipe({ name: 'addrFilterOption' })
export class AddrFilterOptionPipe implements PipeTransform {
  transform(options: AddrOption[], searchValue: string, filterOption: TFilterOption, serverSearch: boolean): AddrOption[] {
    if (serverSearch || !searchValue) {
      return options;
    } else {
      const result = (options as AddrOption[]).filter(o => filterOption(searchValue, o));
      console.log(result);
      return result;
    }
  }
}

export function defaultAddrFilterOption(searchValue: string, option: AddrOption): boolean {
  if (option && option.label) {
    return option.label.toLowerCase().indexOf(searchValue.toLowerCase()) > -1;
  } else {
    return false;
  }
}

export function defaultLevelLabelsFilterOption(level = 1): AddrOption[] {
  const cloneArr = defaultAddressLevelOptions.map(o => ({ ...o }));
  return cloneArr.slice(0, level);
}

@Pipe({ name: 'pAddrLevelFitler' })
export class AddrLevelFilterPipe implements PipeTransform {
  transform(level: number): any[] {
    return defaultLevelLabelsFilterOption(level);
  }
}

@Pipe({ name: 'pAddrCheckedFitler' })
export class AddrCheckedFilterPipe implements PipeTransform {
  transform(activedOption: AddrOption[], index: number, option: AddrOption): boolean {
    if (activedOption && activedOption.length > 0) {
      if (!activedOption[index]) return false;
      return activedOption[index].value === option.value && !option.disabled;
    }
    return false;
  }
}
