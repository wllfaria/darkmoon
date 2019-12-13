import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrivalComponent } from './arrival.component';

describe('ArrivalComponent', () => {
  let component: ArrivalComponent;
  let fixture: ComponentFixture<ArrivalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArrivalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArrivalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
