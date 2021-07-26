import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetappPinComponent } from './setapp-pin.component';

describe('SetappPinComponent', () => {
  let component: SetappPinComponent;
  let fixture: ComponentFixture<SetappPinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetappPinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetappPinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
