import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatephonenoComponent } from './updatephoneno.component';

describe('UpdatephonenoComponent', () => {
  let component: UpdatephonenoComponent;
  let fixture: ComponentFixture<UpdatephonenoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatephonenoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatephonenoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
