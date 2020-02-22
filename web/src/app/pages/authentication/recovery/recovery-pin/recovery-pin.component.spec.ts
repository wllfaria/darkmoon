import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecoveryPinComponent } from './recovery-pin.component';

describe('RecoveryPinComponent', () => {
  let component: RecoveryPinComponent;
  let fixture: ComponentFixture<RecoveryPinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecoveryPinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecoveryPinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
