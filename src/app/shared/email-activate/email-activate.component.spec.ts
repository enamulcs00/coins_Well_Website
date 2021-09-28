import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailActivateComponent } from './email-activate.component';

describe('EmailActivateComponent', () => {
  let component: EmailActivateComponent;
  let fixture: ComponentFixture<EmailActivateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailActivateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailActivateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
