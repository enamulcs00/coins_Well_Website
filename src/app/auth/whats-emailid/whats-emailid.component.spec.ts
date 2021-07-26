import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WhatsEmailidComponent } from './whats-emailid.component';

describe('WhatsEmailidComponent', () => {
  let component: WhatsEmailidComponent;
  let fixture: ComponentFixture<WhatsEmailidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WhatsEmailidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WhatsEmailidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
