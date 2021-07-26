import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OldphoneComponent } from './oldphone.component';

describe('OldphoneComponent', () => {
  let component: OldphoneComponent;
  let fixture: ComponentFixture<OldphoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OldphoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OldphoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
