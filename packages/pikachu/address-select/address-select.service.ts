import { BACKSPACE, DOWN_ARROW, ENTER, SPACE, TAB, UP_ARROW } from '@angular/cdk/keycodes';
import { Injectable } from '@angular/core';
import { combineLatest, merge, BehaviorSubject, ReplaySubject, Subject } from 'rxjs';
import { distinctUntilChanged, filter, map, share, skip, tap } from 'rxjs/operators';

import { isNil, isNotNil } from 'ng-zorro-antd/core';
import { POption } from './interface';
import { defaultFilterOption, AddrFilterOptionPipe } from './p-option.pipe';

@Injectable()
export class AddressSelectService {
  // Input params
  autoClearSearchValue = true;
  serverSearch = false;
  filterOption: any = defaultFilterOption;
  mode = 'default';
  maxMultipleCount = Infinity;
  disabled = false;

  // selectedValueChanged should emit ngModelChange or not
  // tslint:disable-next-line:no-any
  private listOfSelectedValueWithEmit$ = new BehaviorSubject<{ value: any[]; emit: boolean }>({
    value: [],
    emit: false,
  });
  // Data Change
  private mapOfTemplateOption$ = new BehaviorSubject<{
    listOfPOption: POption[];
  }>({
    listOfPOption: [],
  });
  // searchValue Change
  private searchValueRaw$ = new BehaviorSubject<string>('');
  private listOfFilteredOption: POption[] = [];
  private openRaw$ = new Subject<boolean>();
  private checkRaw$ = new Subject();
  private open = false;
  clearInput$ = new Subject<boolean>();
  searchValue = '';
  isShowNotFound = false;
  // open
  open$ = this.openRaw$.pipe(distinctUntilChanged());
  activatedOption: POption | null;
  activatedOption$ = new ReplaySubject<POption | null>(1);
  listOfSelectedValue$ = this.listOfSelectedValueWithEmit$.pipe(map(data => data.value));
  modelChange$ = this.listOfSelectedValueWithEmit$.pipe(
    filter(item => item.emit),
    map(data => {
      const selectedList = data.value;
      let modelValue: any[] | null = null; // tslint:disable-line:no-any
      if (this.isSingleMode) {
        if (selectedList.length) {
          modelValue = selectedList[0];
        }
      } else {
        modelValue = selectedList;
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
        this.updateActivatedOption(this.listOfFilteredOption[0]);
      }
      this.updateListOfFilteredOption();
    }),
  );
  // tslint:disable-next-line:no-any
  listOfSelectedValue: any[] = [];
  // data
  listOfPOption: POption[] = [];
  listOfCachedSelectedOption: POption[] = [];
  // selected value or Data change
  valueOrOption$ = combineLatest([this.listOfSelectedValue$, this.mapOfTemplateOption$]).pipe(
    tap(data => {
      this.listOfSelectedValue = data[0];
      this.listOfPOption = data[1].listOfPOption;
      // console.log(JSON.stringify(this.listOfPOption));
      this.updateListOfFilteredOption();
      this.resetActivatedOptionIfNeeded();
      this.updateListOfCachedOption();
    }),
    share(),
  );
  check$ = merge(this.checkRaw$, this.valueOrOption$, this.searchValue$, this.activatedOption$, this.open$, this.modelChange$).pipe(
    share(),
  );
  // tslint:disable-next-line:no-any
  compareWith = (o1: any, o2: any) => o1 === o2;

  clickOption(option: POption): void {
    /** update listOfSelectedOption -> update listOfSelectedValue -> next listOfSelectedValue$ */
    if (!option.disabled) {
      this.updateActivatedOption(option);
      this.listOfPOption.map(item => {
        item.checked = false;
      });
      option.checked = true;
      let listOfSelectedValue = [...this.listOfSelectedValue];
      if (!this.compareWith(listOfSelectedValue[0], option.value)) {
        listOfSelectedValue = [option.value];
        this.updateListOfSelectedValue(listOfSelectedValue, true);
      }
      if (this.isSingleMode) {
        this.setOpenState(false);
      } else if (this.autoClearSearchValue) {
        this.clearInput();
      }
    }
  }

  updateListOfCachedOption(): void {
    const selectedOption = this.listOfPOption.find(o => this.compareWith(o.value, this.listOfSelectedValue[0]));
    if (!isNil(selectedOption)) {
      this.listOfCachedSelectedOption = [selectedOption];
    }
  }

  updateListOfFilteredOption(): void {
    const listOfFilteredOption = new AddrFilterOptionPipe().transform(
      this.listOfPOption,
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
  }

  updateActivatedOption(option: POption | null): void {
    this.activatedOption$.next(option);
    this.activatedOption = option;
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
      const activatedOption = this.listOfFilteredOption.find(item => this.compareWith(item.value, this.listOfSelectedValue[0]));
      this.updateActivatedOption(activatedOption || null);
    };
    if (this.activatedOption) {
      if (
        !this.listOfFilteredOption.find(item => this.compareWith(item.value, this.activatedOption!.value)) ||
        !this.listOfSelectedValue.find(item => this.compareWith(item, this.activatedOption!.value))
      ) {
        resetActivatedOption();
      }
    } else {
      resetActivatedOption();
    }
  }

  updateTemplateOption(listOfPOption: POption[]): void {
    this.mapOfTemplateOption$.next({ listOfPOption });
  }

  updateSearchValue(value: string): void {
    this.searchValueRaw$.next(value);
  }

  updateSelectedValueByLabelList(listOfLabel: string[]): void {
    const listOfSelectedValue = [...this.listOfSelectedValue];
    const listOfMatchOptionValue = this.listOfFilteredOption
      .filter(item => listOfLabel.indexOf(item.label) !== -1)
      .map(item => item.value)
      .filter(item => !isNotNil(this.listOfSelectedValue.find(v => this.compareWith(v, item))));

    const listOfUnMatchOptionValue = listOfLabel.filter(label => this.listOfFilteredOption.map(item => item.label).indexOf(label) === -1);
    this.updateListOfSelectedValue([...listOfSelectedValue, ...listOfMatchOptionValue, ...listOfUnMatchOptionValue], true);
  }

  onKeyDown(e: KeyboardEvent): void {
    if (this.disabled) {
      return;
    }
    const keyCode = e.keyCode;
    const listOfFilteredOptionWithoutDisabled = this.listOfFilteredOption.filter(item => !item.disabled);
    const activatedIndex = listOfFilteredOptionWithoutDisabled.findIndex(item => item === this.activatedOption);
    switch (keyCode) {
      case UP_ARROW:
        e.preventDefault();
        const preIndex = activatedIndex > 0 ? activatedIndex - 1 : listOfFilteredOptionWithoutDisabled.length - 1;
        this.updateActivatedOption(listOfFilteredOptionWithoutDisabled[preIndex]);
        break;
      case DOWN_ARROW:
        e.preventDefault();
        const nextIndex = activatedIndex < listOfFilteredOptionWithoutDisabled.length - 1 ? activatedIndex + 1 : 0;
        this.updateActivatedOption(listOfFilteredOptionWithoutDisabled[nextIndex]);
        if (!this.disabled && !this.open) {
          this.setOpenState(true);
        }
        break;
      case ENTER:
        e.preventDefault();
        if (this.open) {
          if (this.activatedOption && !this.activatedOption.disabled) {
            this.clickOption(this.activatedOption);
          }
        } else {
          this.setOpenState(true);
        }
        break;
      case BACKSPACE:
        break;
      case SPACE:
        if (!this.disabled && !this.open) {
          this.setOpenState(true);
          e.preventDefault();
        }
        break;
      case TAB:
        this.setOpenState(false);
        break;
    }
  }

  // tslint:disable-next-line:no-any
  removeValueFormSelected(option: POption): void {
    if (this.disabled || option.disabled) {
      return;
    }
    const listOfSelectedValue = this.listOfSelectedValue.filter(item => !this.compareWith(item, option.value));
    this.updateListOfSelectedValue(listOfSelectedValue, true);
    this.clearInput();
  }

  setOpenState(value: boolean): void {
    this.openRaw$.next(value);
    this.open = value;
  }

  check(): void {
    this.checkRaw$.next();
  }

  get isSingleMode(): boolean {
    return this.mode === 'default';
  }
}
