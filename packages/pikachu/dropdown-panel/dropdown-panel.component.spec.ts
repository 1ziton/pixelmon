import { OverlayContainer } from '@angular/cdk/overlay';
import { HttpClientModule } from '@angular/common/http';
import { Component, DebugElement, NgZone, OnInit } from '@angular/core';
import { async, ComponentFixture, fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MockNgZone } from 'ng-zorro-antd/core';
import { DropdownPanelComponent } from './dropdown-panel.component';
import { DropdownPanelModule } from './dropdown-panel.module';
import { defaultFilterOption } from './p-option.pipe';

describe('dropdown-panel component', () => {
  let overlayContainer: OverlayContainer;
  let overlayContainerElement: HTMLElement;
  let zone: MockNgZone;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [DropdownPanelModule, NoopAnimationsModule, FormsModule, ReactiveFormsModule, HttpClientModule],
      declarations: [TestDropdownPanelDefaultComponent],
      providers: [
        {
          provide: NgZone,
          useFactory: () => {
            zone = new MockNgZone();
            return zone;
          },
        },
      ],
    });
    TestBed.compileComponents();
    inject([OverlayContainer], (oc: OverlayContainer) => {
      overlayContainer = oc;
      overlayContainerElement = oc.getContainerElement();
    })();
  }));
  afterEach(inject([OverlayContainer], (currentOverlayContainer: OverlayContainer) => {
    currentOverlayContainer.ngOnDestroy();
    overlayContainer.ngOnDestroy();
  }));
  describe('default', () => {
    let fixture: ComponentFixture<TestDropdownPanelDefaultComponent>;
    let testComponent: TestDropdownPanelDefaultComponent;
    let dropdownPanel: DebugElement;
    // let dropdownPanelComponent: DropdownPanelComponent;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestDropdownPanelDefaultComponent);
      fixture.detectChanges();
      testComponent = fixture.debugElement.componentInstance;
      dropdownPanel = fixture.debugElement.query(By.directive(DropdownPanelComponent));
      // dropdownPanelComponent = dropdownPanel.injector.get(DropdownPanelComponent);
    });

    it('should className correct', () => {
      fixture.detectChanges();
      expect(dropdownPanel.nativeElement.classList).toContain('ant-select');
    });
    it('should size work', () => {
      testComponent.size = 'small';
      fixture.detectChanges();
      expect(dropdownPanel.nativeElement.classList).toContain('ant-select-sm');
      testComponent.size = 'large';
      fixture.detectChanges();
      expect(dropdownPanel.nativeElement.classList).toContain('ant-select-lg');
    });
    it('should allowClear work', () => {
      fixture.detectChanges();
      expect(dropdownPanel.nativeElement.classList).not.toContain('ant-select-allow-clear');
      testComponent.allowClear = true;
      fixture.detectChanges();
      expect(dropdownPanel.nativeElement.classList).toContain('ant-select-allow-clear');
    });
    it('should open work', fakeAsync(() => {
      fixture.detectChanges();
      expect(dropdownPanel.nativeElement.classList).not.toContain('ant-select-open');
      testComponent.open = true;
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(dropdownPanel.nativeElement.classList).toContain('ant-select-open');
      expect(testComponent.openChange).toHaveBeenCalledTimes(0);
    }));
    // it('should click toggle open', fakeAsync(() => {
    //   fixture.detectChanges();
    //   dropdownPanel.nativeElement.click();
    //   fixture.detectChanges();
    //   tick();
    //   fixture.detectChanges();
    //   expect(testComponent.open).toBe(true);
    //   expect(testComponent.openChange).toHaveBeenCalledTimes(1);
    //   dropdownPanel.nativeElement.click();
    //   fixture.detectChanges();
    //   tick();
    //   fixture.detectChanges();
    //   expect(testComponent.open).toBe(false);
    //   expect(testComponent.openChange).toHaveBeenCalledTimes(2);
    // }));
    it('should disabled work', fakeAsync(() => {
      expect(dropdownPanel.nativeElement.classList).toContain('ant-select-enabled');
      testComponent.disabled = true;
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(dropdownPanel.nativeElement.classList).toContain('ant-select-disabled');
      expect(testComponent.openChange).toHaveBeenCalledTimes(0);
      dropdownPanel.nativeElement.click();
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(testComponent.open).toBe(false);
      expect(testComponent.openChange).toHaveBeenCalledTimes(0);
    }));
    it('should autofocus work', () => {
      testComponent.showSearch = true;
      fixture.detectChanges();
      testComponent.autoFocus = true;
      fixture.detectChanges();
      expect(dropdownPanel.nativeElement.querySelector('input').attributes.getNamedItem('autofocus').name).toBe('autofocus');
      testComponent.autoFocus = false;
      fixture.detectChanges();
      expect(dropdownPanel.nativeElement.querySelector('input').attributes.getNamedItem('autofocus')).toBe(null);
    });
    it('should dropdown class work', () => {
      fixture.detectChanges();
      dropdownPanel.nativeElement.click();
      fixture.detectChanges();
      expect(testComponent.open).toBe(true);
      expect(overlayContainerElement.querySelector('.test-class')).toBeDefined();
    });
    it('should dropdown style work', () => {
      fixture.detectChanges();
      dropdownPanel.nativeElement.click();
      fixture.detectChanges();
      expect(testComponent.open).toBe(true);
      expect(dropdownPanel.nativeElement.style.width).toBe('10px');
    });

    // it('should dropdownMatchSelectWidth false work', fakeAsync(() => {
    //   testComponent.dropdownMatchSelectWidth = false;
    //   fixture.detectChanges();
    //   tick();
    //   fixture.detectChanges();
    //   dropdownPanel.nativeElement.click();
    //   fixture.detectChanges();
    //   tick();
    //   fixture.detectChanges();
    //   zone.simulateZoneExit();
    //   fixture.detectChanges();
    //   expect(testComponent.open).toBe(true);
    //   const targetElement = overlayContainerElement.querySelector('.cdk-overlay-pane') as HTMLElement;
    //   expect(targetElement.style.width).toBe('');
    //   expect(targetElement.style.minWidth).toBe('10px');
    // }));
    // it('should click option close dropdown', () => {
    //   testComponent.showSearch = true;
    //   dropdownPanel.nativeElement.click();
    //   fixture.detectChanges();
    //   expect(testComponent.open).toBe(true);
    //   fixture.detectChanges();
    //   overlayContainerElement.querySelector('li')!.click();
    //   fixture.detectChanges();
    //   expect(testComponent.open).toBe(false);
    // });
    // it('should keep overlay open when press esc', fakeAsync(() => {
    //   fixture.detectChanges();
    //   dropdownPanel.nativeElement.click();
    //   fixture.detectChanges();
    //   dispatchKeyboardEvent(document.body, 'keydown', ESCAPE);
    //   fixture.detectChanges();
    //   flush();
    //   fixture.detectChanges();
    //   dropdownPanel.nativeElement.click();
    //   fixture.detectChanges();
    //   flush();
    //   fixture.detectChanges();
    //   expect(testComponent.open).toBe(true);
    //   expect(dropdownPanelComponent.cdkConnectedOverlay.overlayRef.backdropElement).toBeDefined();
    // }));
  });
});

@Component({
  template: `
    <p-dropdown-panel
      style="width:10px;position: relative;display: block;"
      [size]="size"
      [data]="data"
      [(ngModel)]="selectedValue"
      [allowClear]="allowClear"
      (openChange)="openChange($event)"
      [disabled]="disabled"
      [mode]="mode"
      [autoClearSearchValue]="true"
      [serverSearch]="false"
      [showSearch]="showSearch"
      [autoFocus]="autoFocus"
      [(open)]="open"
      [dropdownMatchSelectWidth]="dropdownMatchSelectWidth"
      [dropdownStyle]="dropdownStyle"
      [dropdownClassName]="'test-class'"
      (onSearch)="onSearch($event)"
      [placeHolder]="placeholder"
    >
    </p-dropdown-panel>
  `,
})
export class TestDropdownPanelDefaultComponent implements OnInit {
  selectedValue = 'lucy';
  allowClear = false;
  open = false;
  size = 'default';
  mode = 'default';
  autoFocus = false;
  disabled = false;
  onSearch = jasmine.createSpy('on search');
  showSearch = false;
  placeholder = 'placeholder';
  filterOption = defaultFilterOption;
  dropdownMatchSelectWidth = true;
  openChange = jasmine.createSpy('open change');
  dropdownStyle = { height: '120px' };
  data: any = [
    {
      label: 'Thomas',
      value: 'thomas',
    },
    {
      label: 'Jake',
      value: 'jake',
    },
    {
      label: 'Jhon',
      value: 'jhon',
    },
  ];
  constructor() {}
  ngOnInit(): void {}
}
