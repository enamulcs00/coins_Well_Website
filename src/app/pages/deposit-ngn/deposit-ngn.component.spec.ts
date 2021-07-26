import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositNgnComponent } from './deposit-ngn.component';

describe('DepositNgnComponent', () => {
  let component: DepositNgnComponent;
  let fixture: ComponentFixture<DepositNgnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepositNgnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepositNgnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
