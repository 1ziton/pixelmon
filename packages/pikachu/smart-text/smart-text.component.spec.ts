import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartTextComponent } from './smart-text.component';

describe('SmartTextComponent', () => {
  let component: SmartTextComponent;
  let fixture: ComponentFixture<SmartTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SmartTextComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmartTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
