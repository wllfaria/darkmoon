import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductLoaderComponent } from './product-loader.component';

describe('ProductLoaderComponent', () => {
  let component: ProductLoaderComponent;
  let fixture: ComponentFixture<ProductLoaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductLoaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
