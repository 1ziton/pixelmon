import { Injectable } from '@angular/core';
import { BehaviorSubject, merge, ReplaySubject, Subject } from 'rxjs';
import { distinctUntilChanged, filter, map, share, skip, tap } from 'rxjs/operators';
import { AddressQueryService, AddrOption, ResultOption } from './interface';
import { AddrFilterOptionPipe, defaultAddrFilterOption } from './p-option.pipe';

@Injectable()
export class AddressSelectService {
  // Input params
  autoClearSearchValue = true;
  serverSearch = false;
  filterOption: any = defaultAddrFilterOption;
  disabled = false;

  levelLabels: AddrOption[] = [];
  currentLevel: number = 1;
  maxLevel: number = 1;
  separator = '/';
  // selectedValueChanged should emit ngModelChange or not
  private listOfSelectedValueWithEmit$ = new BehaviorSubject<{ value: any[]; emit: boolean }>({
    value: [],
    emit: false,
  });

  // searchValue Change
  private searchValueRaw$ = new BehaviorSubject<string>('');
  private listOfFilteredOption: AddrOption[] = [];
  private openRaw$ = new Subject<boolean>();
  private checkRaw$ = new Subject();
  clearInput$ = new Subject<boolean>();
  searchValue = '';
  isShowNotFound = false;
  // open
  open$ = this.openRaw$.pipe(distinctUntilChanged());
  listOfActivatedOption: any[] = [];
  listOfActivatedOption$ = new ReplaySubject<AddrOption | null>(1);
  selectedOption: ResultOption;
  modelChange$ = this.listOfSelectedValueWithEmit$.pipe(
    filter(item => item.emit),
    map(data => {
      const selectedList = data.value;
      const { length } = selectedList;
      let modelValue: any[] | null = null;
      if (length > 1) {
        modelValue = selectedList[length - 1].value;
      }
      return modelValue;
    }),
  );
  searchValue$ = this.searchValueRaw$.pipe(
    distinctUntilChanged(),
    skip(1),
    share(),
    tap(value => {
      this.searchValue = value;
      // if (value) {
      //   this.updateActivatedOption(this.listOfFilteredOption[0], this.currentLevel);
      // }
      this.updateListOfFilteredOption();
    }),
  );
  // address data
  listOfProvinceOptions: AddrOption[] = [];
  listOfCityOptions: AddrOption[] = [];
  listOfDistinctOptions: AddrOption[] = [];
  listOfStreetOptions: AddrOption[] = [];

  check$ = merge(this.checkRaw$, this.searchValue$, this.listOfActivatedOption$, this.open$, this.modelChange$).pipe(share());
  compareWith = (o1: any, o2: any) => o1 === o2;

  constructor(private addrQuerySrv: AddressQueryService) {}

  getListByCode(code?: string, level = 0) {
    this.addrQuerySrv.getListByCode(code).subscribe(json => {
      if (level === 0) {
        this.listOfProvinceOptions = [...json];
      } else if (level === 1) {
        this.listOfCityOptions = [...json];
      } else if (level === 2) {
        this.listOfDistinctOptions = [...json];
      } else if (level === 3) {
        this.listOfStreetOptions = [...json];
      }
      this.check();
    });
  }

  toggleTab(index: number) {
    this.currentLevel = index + 1;
    this.levelLabels.forEach((item, i) => {
      if (i === index) {
        item.checked = true;
      } else {
        item.checked = false;
      }
    });
  }

  isMaxLevel(): boolean {
    return this.maxLevel === this.currentLevel;
  }

  clickOption(option: AddrOption): void {
    if (option.disabled) {
      return;
    }
    const level = (option.level as number) + 1;
    this.updateActivatedOption(option, level);
    // 设置值
    if (this.isMaxLevel()) {
      this.setOpenState(false);
      return;
    }
    if (this.autoClearSearchValue) {
      this.clearInput();
    }
    this.getListByCode(option.value, level);
    this.toggleTab(level);
  }

  updateSelectedOption(clean = false): void {
    if (clean) {
      this.toggleTab(0);
      this.selectedOption = {
        label: '',
        value: '',
        mergeName: '',
      };
      this.listOfActivatedOption = [];
      return;
    }
    const selectedOption: AddrOption[] = this.listOfActivatedOption.filter(o => o && o.value);
    const { length } = selectedOption;
    if (length > 0) {
      const { label, value, level } = selectedOption[length - 1];
      this.selectedOption = {
        label,
        value,
        level,
        mergeName: selectedOption.map(o => o.label).join(this.separator),
      };
    }
  }

  updateListOfFilteredOption(): void {
    let filterOptionList: AddrOption[] = [];

    if (this.currentLevel === 1) filterOptionList = [...this.listOfProvinceOptions];
    if (this.currentLevel === 2) filterOptionList = [...this.listOfCityOptions];
    if (this.currentLevel === 3) filterOptionList = [...this.listOfDistinctOptions];
    if (this.currentLevel === 4) filterOptionList = [...this.listOfStreetOptions];

    const listOfFilteredOption = new AddrFilterOptionPipe().transform(
      filterOptionList,
      this.searchValue,
      this.filterOption,
      this.serverSearch,
    );
    this.listOfFilteredOption = [...listOfFilteredOption];
    this.isShowNotFound = !this.listOfFilteredOption.length;
  }

  clearInput(): void {
    this.clearInput$.next();
  }

  updateListOfSelectedValue(value: any[], emit: boolean): void {
    this.listOfSelectedValueWithEmit$.next({ value, emit });
    this.updateSelectedOption(!value.length);
    this.check();
  }

  updateActivatedOption(option: AddrOption | null, level: number): void {
    this.listOfActivatedOption$.next(option);

    this.listOfActivatedOption[level] = option;
    if (this.isMaxLevel()) {
      this.updateListOfSelectedValue([...this.listOfActivatedOption], true);
    }
  }

  includesSeparators(str: string | string[], separators: string[]): boolean {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < separators.length; ++i) {
      if (str.lastIndexOf(separators[i]) > 0) {
        return true;
      }
    }
    return false;
  }

  resetActivatedOptionIfNeeded(): void {
    const resetActivatedOption = () => {
      const listOfActivatedOption = this.listOfFilteredOption.find(item => this.compareWith(item.value, this.selectedOption[0]));
      this.updateActivatedOption(listOfActivatedOption || null, this.currentLevel);
    };
    if (this.listOfActivatedOption) {
      if (
        !this.listOfFilteredOption.find(item => this.compareWith(item.value, this.listOfActivatedOption[this.currentLevel]!.value)) ||
        !this.listOfActivatedOption.find(item => this.compareWith(item, this.listOfActivatedOption[this.currentLevel]!.value))
      ) {
        resetActivatedOption();
      }
    } else {
      resetActivatedOption();
    }
  }

  updateSearchValue(value: string): void {
    this.searchValueRaw$.next(value);
  }

  updateSelectedOptionByCode(code: string): void {
    this.addrQuerySrv.getOptionByCode(code).subscribe(json => {
      if (json.code === code) {
        this.selectedOption = {
          label: json.name,
          value: json.code,
          level: json.level,
          mergeName: json.mergerName,
        };
        this.check();
      }
    });
  }

  removeValueFormSelected(option: AddrOption): void {
    if (this.disabled || option.disabled) {
      return;
    }
    const selectedOption = this.listOfActivatedOption.filter(item => !this.compareWith(item, option.value));
    this.updateListOfSelectedValue(selectedOption, true);
    this.clearInput();
  }

  setOpenState(value: boolean): void {
    this.openRaw$.next(value);
    // this.open = value;
  }

  check(): void {
    this.checkRaw$.next();
  }
}
