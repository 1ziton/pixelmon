import { Injectable } from '@angular/core';
import { isNotNil } from 'ng-zorro-antd/core';
import { BehaviorSubject, merge, ReplaySubject, Subject } from 'rxjs';
import { distinctUntilChanged, filter, map, share, skip, tap } from 'rxjs/operators';
import { AddressQueryService, POption, ResultOption } from './interface';
import { AddrFilterOptionPipe, defaultFilterOption } from './p-option.pipe';

@Injectable()
export class AddressSelectService {
  // Input params
  autoClearSearchValue = true;
  serverSearch = false;
  filterOption: any = defaultFilterOption;
  disabled = false;

  levelLabels: POption[] = [];
  currentLevel: number = 1;
  maxLevel: number = 1;
  // selectedValueChanged should emit ngModelChange or not
  // tslint:disable-next-line:no-any
  private listOfSelectedValueWithEmit$ = new BehaviorSubject<{ value: any[]; emit: boolean }>({
    value: [],
    emit: false,
  });

  // searchValue Change
  private searchValueRaw$ = new BehaviorSubject<string>('');
  private listOfFilteredOption: POption[] = [];
  private openRaw$ = new Subject<boolean>();
  private checkRaw$ = new Subject();
  clearInput$ = new Subject<boolean>();
  searchValue = '';
  isShowNotFound = false;
  // open
  open$ = this.openRaw$.pipe(distinctUntilChanged());
  listOfActivatedOption: any[] = [];
  listOfActivatedOption$ = new ReplaySubject<POption | null>(1);
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
      if (value) {
        this.updateActivatedOption(this.listOfFilteredOption[0], this.currentLevel);
      }
      this.updateListOfFilteredOption();
    }),
  );
  // address data
  listOfProvinceOptions: POption[] = [];
  listOfCityOptions: POption[] = [];
  listOfDistinctOptions: POption[] = [];
  listOfStreetOptions: POption[] = [];

  check$ = merge(this.checkRaw$, this.searchValue$, this.listOfActivatedOption$, this.open$, this.modelChange$).pipe(share());
  compareWith = (o1: any, o2: any) => o1 === o2;

  constructor(private addrQuerySrv: AddressQueryService) {}

  getAreasByCode(code?: string, level = 0) {
    this.addrQuerySrv.getAreasByCode(code).subscribe(json => {
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

  getAreaLabelByCode(code: string) {
    this.addrQuerySrv.getAreaLabelByCode(code).subscribe(json => {
      console.log(json);
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

  clickOption(option: POption): void {
    if (option.disabled) {
      return;
    }
    const level = (option.level as number) + 1;
    this.updateActivatedOption(option, level);
    // 设置值
    if (this.isMaxLevel()) {
      if (this.autoClearSearchValue) {
        this.clearInput();
      }
      this.setOpenState(false);
      return;
    }

    this.getAreasByCode(option.value, level);
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
      return;
    }
    const selectedOption: POption[] = this.listOfActivatedOption.filter(o => o && o.value);
    const { length } = selectedOption;
    if (length > 0) {
      const { label, value, level } = selectedOption[length - 1];
      this.selectedOption = {
        label,
        value,
        level,
        mergeName: selectedOption.map(o => o.label).join('/'),
      };
    }
  }

  updateListOfFilteredOption(): void {
    const listOfFilteredOption = new AddrFilterOptionPipe().transform(
      this.listOfProvinceOptions,
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

  // tslint:disable-next-line:no-any
  updateListOfSelectedValue(value: any[], emit: boolean): void {
    this.listOfSelectedValueWithEmit$.next({ value, emit });
    this.updateSelectedOption(!value.length);
  }

  updateActivatedOption(option: POption | null, level: number): void {
    this.listOfActivatedOption$.next(option);

    if (this.listOfActivatedOption[level]) {
      if (this.listOfActivatedOption[level].value !== (option && option.value) && this.isMaxLevel()) {
        this.listOfActivatedOption[level] = option;
        this.updateListOfSelectedValue([...this.listOfActivatedOption], true);
        return;
      }
    }
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

  splitBySeparators(str: string | string[], separators: string[]): string[] {
    const reg = new RegExp(`[${separators.join()}]`);
    const array = (str as string).split(reg).filter(token => token);
    return Array.from(new Set(array));
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

  updateSelectedValueByLabelList(listOfLabel: string[]): void {
    const selectedOption = [...this.listOfActivatedOption];
    const listOfMatchOptionValue = this.listOfFilteredOption
      .filter(item => listOfLabel.indexOf(item.label) !== -1)
      .map(item => item.value)
      .filter(item => !isNotNil(this.listOfActivatedOption.find(v => this.compareWith(v, item))));

    const listOfUnMatchOptionValue = listOfLabel.filter(label => this.listOfFilteredOption.map(item => item.label).indexOf(label) === -1);
    this.updateListOfSelectedValue([...selectedOption, ...listOfMatchOptionValue, ...listOfUnMatchOptionValue], true);
  }

  removeValueFormSelected(option: POption): void {
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
