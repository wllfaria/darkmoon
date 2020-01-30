import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShirtsListComponent } from './shirts-list.component';

describe('ShirtsListComponent', () => {
  let component: ShirtsListComponent;
  let fixture: ComponentFixture<ShirtsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShirtsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShirtsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
