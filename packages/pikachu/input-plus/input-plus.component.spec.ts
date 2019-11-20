import { async, ComponentFixture, TestBed, tick, fakeAsync, inject } from '@angular/core/testing';
import { InputPlusComponent } from './input-plus.component';
import { CommonModule } from '@angular/common';
import { NzInputModule, NzIconModule, NzPopoverModule, NzButtonModule, NzGridModule, NZ_ICONS, NzFormModule } from 'ng-zorro-antd';
import { FormsModule, FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { PlusOutline } from '@ant-design/icons-angular/icons';
import { BrowserModule } from '@angular/platform-browser';
import { OnInit, Component } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { OverlayContainer } from '@angular/cdk/overlay';

describe('pikachu: input-plus', () => {
  let overlayContainer: OverlayContainer;
  let overlayContainerElement: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InputPlusComponent, TestComponent],
      imports: [
        BrowserModule,
        NoopAnimationsModule,
        CommonModule,
        NzInputModule,
        FormsModule,
        NzIconModule,
        NzInputModule,
        NzPopoverModule,
        NzButtonModule,
        NzGridModule,
        ReactiveFormsModule,
        NzFormModule,
      ],
      providers: [{ provide: NZ_ICONS, useValue: [PlusOutline] }],
    }).compileComponents();
  }));

  beforeEach(inject([OverlayContainer], (oc: OverlayContainer) => {
    overlayContainer = oc;
    overlayContainerElement = oc.getContainerElement();
  }));

  afterEach(() => {
    overlayContainer.ngOnDestroy();
  });

  describe('work in self', () => {
    let component: InputPlusComponent;
    let fixture: ComponentFixture<InputPlusComponent>;
    let triggerButton: HTMLElement;
    let input: HTMLInputElement;

    beforeEach(() => {
      fixture = TestBed.createComponent(InputPlusComponent);
      component = fixture.componentInstance;
      triggerButton = fixture.nativeElement.querySelector('.p-input-plus-button');
      input = fixture.nativeElement.querySelector('.p-input-plus-input');
      fixture.detectChanges();
    });

    it('should conponent create', () => {
      expect(component).toBeTruthy();
      expect(triggerButton).toBeTruthy();
      expect(input).toBeTruthy();
    });

    it('should trigger button work', () => {
      triggerButton.click();

      const popover = overlayContainerElement.querySelector('.p-input-plus-popover');

      expect(popover).toBeTruthy();
    });

    it('should origin title show', () => {
      triggerButton.click();

      const popover = overlayContainerElement.querySelector('.p-input-plus-popover') as HTMLElement;
      const title = popover.querySelector('.p-input-plus-title') as HTMLElement;

      expect(title.textContent).toContain(component.title);
    });

    it('should input work', () => {
      input.value = 'waybill,waybill';

      input.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      expect(component.inputValue).toBe('waybill,waybill');
      expect(component.textareaValue).toBe('waybill\nwaybill');
    });

    it('should textarea work', () => {
      triggerButton.click();

      const popover = overlayContainerElement.querySelector('.p-input-plus-popover') as HTMLElement;
      const textarea = popover.querySelector('.p-input-plus-textarea') as HTMLInputElement;

      textarea.value = 'waybill\nwaybill';

      textarea.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      expect(component.textareaValue).toBe('waybill\nwaybill');
      expect(component.inputValue).toBe('waybill,waybill');
    });

    it('should ok Button work', fakeAsync(() => {
      triggerButton.click();

      const popover = overlayContainerElement.querySelector('.p-input-plus-popover') as HTMLElement;
      const okButton = popover.querySelector('.ant-btn-primary') as HTMLElement;

      okButton.click();

      fixture.detectChanges();
      tick(150); // wait for the default 100ms delay
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      expect(component.visible).toBeFalsy();

      // const currentPopover = overlayContainerElement.querySelector('.p-input-plus-popover');
      // expect(currentPopover).toBeFalsy();
    }));

    it('should clear Button work', fakeAsync(() => {
      triggerButton.click();

      const popover = overlayContainerElement.querySelector('.p-input-plus-popover') as HTMLElement;
      const textarea = popover.querySelector('.p-input-plus-textarea') as HTMLInputElement;
      const clearButton = popover.querySelector('.ant-btn-default') as HTMLElement;

      clearButton.click();
      fixture.detectChanges();

      expect(input.value).toBe('');
      expect(component.inputValue).toBe('');

      expect(textarea.value).toBe('');
      expect(component.textareaValue).toBe('');
    }));
  });

  describe('work in form', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;
    let triggerButton: HTMLElement;
    let input: HTMLInputElement;

    beforeEach(() => {
      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
      triggerButton = fixture.nativeElement.querySelector('.p-input-plus-button');
      input = fixture.nativeElement.querySelector('.p-input-plus-input');
      fixture.detectChanges();
    });

    it('should input work', () => {
      input.value = 'waybill,waybill';

      input.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      expect(component.validateForm.value.waybillNo).toBe('waybill,waybill');
    });

    it('should textarea work', () => {
      triggerButton.click();

      const popover = overlayContainerElement.querySelector('.p-input-plus-popover') as HTMLElement;
      const textarea = popover.querySelector('.p-input-plus-textarea') as HTMLInputElement;

      textarea.value = 'waybill\nwaybill';

      textarea.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      expect(component.validateForm.value.waybillNo).toBe('waybill,waybill');
    });

    it('should clear work', () => {
      component.onClear();
      fixture.detectChanges();

      expect(input.value).toBeFalsy();

      triggerButton.click();

      const popover = overlayContainerElement.querySelector('.p-input-plus-popover') as HTMLElement;
      const textarea = popover.querySelector('.p-input-plus-textarea') as HTMLInputElement;

      expect(textarea.value).toBeFalsy();
    });
  });
});

@Component({
  template: `
    <form nz-form [formGroup]="validateForm">
      <div nz-row [nzGutter]="8">
        <div nz-col [nzSpan]="8">
          <nz-form-item>
            <nz-form-label [nzSpan]="8">运单号</nz-form-label>
            <nz-form-control [nzSpan]="16">
              <p-input-plus formControlName="waybillNo"></p-input-plus>
            </nz-form-control>
          </nz-form-item>
        </div>
      </div>
    </form>
    <div nz-row nzType="flex" nzAlign="middle" nzJustify="end">
      <button nz-button nzType="primary" (click)="onOk()">确定</button>
      <button nz-button (click)="onClear()">清空</button>
    </div>
  `,
})
export class TestComponent implements OnInit {
  validateForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      waybillNo: [null],
    });
  }

  onOk(): void {}

  onClear(): void {
    this.validateForm.reset();
  }
}
