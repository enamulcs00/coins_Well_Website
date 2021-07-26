import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RateDashComponent } from './rate-dash.component';

describe('RateDashComponent', () => {
  let component: RateDashComponent;
  let fixture: ComponentFixture<RateDashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RateDashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RateDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
