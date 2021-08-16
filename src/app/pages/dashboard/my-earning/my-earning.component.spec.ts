import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyEarningComponent } from './my-earning.component';

describe('MyEarningComponent', () => {
  let component: MyEarningComponent;
  let fixture: ComponentFixture<MyEarningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyEarningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyEarningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
