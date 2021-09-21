import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyOtpPinComponent } from './verify-otp-pin.component';

describe('VerifyOtpPinComponent', () => {
  let component: VerifyOtpPinComponent;
  let fixture: ComponentFixture<VerifyOtpPinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerifyOtpPinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyOtpPinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
