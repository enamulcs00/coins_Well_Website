import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WithoutheaderComponent } from './withoutheader.component';

describe('WithoutheaderComponent', () => {
  let component: WithoutheaderComponent;
  let fixture: ComponentFixture<WithoutheaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WithoutheaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WithoutheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
