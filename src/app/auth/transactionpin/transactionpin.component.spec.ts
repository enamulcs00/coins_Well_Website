import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionpinComponent } from './transactionpin.component';

describe('TransactionpinComponent', () => {
  let component: TransactionpinComponent;
  let fixture: ComponentFixture<TransactionpinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionpinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionpinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
