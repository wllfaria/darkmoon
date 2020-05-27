import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalCartService } from './localcart.service';
import { ISku } from 'src/app/models/sku.model';

describe('LocalCartService', () => {
  let cartService = new LocalCartService();

  const testProduct: ISku = {
      id: 1,
      product_name: "test_shirt",
      product_url: "www.darkmoon.com/test_shirt",
      available: false,
      created_at: new Date(),
      updated_at: new Date(),
      price: 10,
      sale_price: 12,
      deleted_at: new Date(),
      sale_date: 123,
      type_id: 1,
      gender_id: 1,
      model_id: 1,
      images: []
  }

  it('Should add the product to the cart correctly', () => {
    cartService.addToStorage(testProduct);
    const products = cartService.getCartItems();
    expect(products.length).toBe(1);
  });

  it('Should remove the product from the cart correctly', () => {
    cartService.removeFromStorage(testProduct);
    const products = cartService.getCartItems();
    expect(products.length).toBe(0);
  });
});
