import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WithdrawcryptoComponent } from './withdrawcrypto.component';

describe('WithdrawcryptoComponent', () => {
  let component: WithdrawcryptoComponent;
  let fixture: ComponentFixture<WithdrawcryptoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WithdrawcryptoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WithdrawcryptoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
