import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TroubleloginComponent } from './troublelogin.component';

describe('TroubleloginComponent', () => {
  let component: TroubleloginComponent;
  let fixture: ComponentFixture<TroubleloginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TroubleloginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TroubleloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
