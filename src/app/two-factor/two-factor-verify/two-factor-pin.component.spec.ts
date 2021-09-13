import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TwoFactorVerifyComponent } from './two-factor-pin.component';

describe('TwoFactorVerifyComponent', () => {
  let component: TwoFactorVerifyComponent;
  let fixture: ComponentFixture<TwoFactorVerifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TwoFactorVerifyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwoFactorVerifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
