import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestErrorComponent } from './request-error.component';

describe('RequestErrorComponent', () => {
  let component: RequestErrorComponent;
  let fixture: ComponentFixture<RequestErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestErrorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
