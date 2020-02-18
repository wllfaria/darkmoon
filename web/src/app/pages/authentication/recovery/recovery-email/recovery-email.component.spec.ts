import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecoveryEmailComponent } from './recovery-email.component';

describe('RecoveryEmailComponent', () => {
  let component: RecoveryEmailComponent;
  let fixture: ComponentFixture<RecoveryEmailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecoveryEmailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecoveryEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
