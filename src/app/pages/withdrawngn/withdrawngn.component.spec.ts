import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WithdrawngnComponent } from './withdrawngn.component';

describe('WithdrawngnComponent', () => {
  let component: WithdrawngnComponent;
  let fixture: ComponentFixture<WithdrawngnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WithdrawngnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WithdrawngnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
