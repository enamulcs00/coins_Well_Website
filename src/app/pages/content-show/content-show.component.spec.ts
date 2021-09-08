import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentShowComponent } from './content-show.component';

describe('ContentShowComponent', () => {
  let component: ContentShowComponent;
  let fixture: ComponentFixture<ContentShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
