import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputPlusComponent } from './input-plus.component';

describe('InputPlusComponent', () => {
  let component: InputPlusComponent;
  let fixture: ComponentFixture<InputPlusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InputPlusComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputPlusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
