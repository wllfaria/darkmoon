import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShirtInsideComponent } from './shirt-inside.component';

describe('ShirtInsideComponent', () => {
  let component: ShirtInsideComponent;
  let fixture: ComponentFixture<ShirtInsideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShirtInsideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShirtInsideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
