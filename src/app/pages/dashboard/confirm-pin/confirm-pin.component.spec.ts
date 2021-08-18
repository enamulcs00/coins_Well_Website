import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmPinComponent } from './confirm-pin.component';

describe('ConfirmPinComponent', () => {
  let component: ConfirmPinComponent;
  let fixture: ComponentFixture<ConfirmPinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmPinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmPinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
