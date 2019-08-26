import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvancedUploadComponent } from './advanced-upload.component';

describe('AdvancedUploadComponent', () => {
  let component: AdvancedUploadComponent;
  let fixture: ComponentFixture<AdvancedUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdvancedUploadComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvancedUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
