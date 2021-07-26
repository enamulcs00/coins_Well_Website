import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddbankdetailsComponent } from './addbankdetails.component';

describe('AddbankdetailsComponent', () => {
  let component: AddbankdetailsComponent;
  let fixture: ComponentFixture<AddbankdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddbankdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddbankdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
