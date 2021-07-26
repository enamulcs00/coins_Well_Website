import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeTranstionpinComponent } from './change-transtionpin.component';

describe('ChangeTranstionpinComponent', () => {
  let component: ChangeTranstionpinComponent;
  let fixture: ComponentFixture<ChangeTranstionpinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeTranstionpinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeTranstionpinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
