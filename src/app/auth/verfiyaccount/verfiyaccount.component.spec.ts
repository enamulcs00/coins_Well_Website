import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerfiyaccountComponent } from './verfiyaccount.component';

describe('VerfiyaccountComponent', () => {
  let component: VerfiyaccountComponent;
  let fixture: ComponentFixture<VerfiyaccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerfiyaccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerfiyaccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
