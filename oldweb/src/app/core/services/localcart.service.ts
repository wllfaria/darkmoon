import { Injectable } from '@angular/core';
import { ISku } from 'src/app/models/sku.model';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LocalCartService {

    private readonly CART_KEY = "DARKMOON_CART";

    /**
     * Adds a product to the local cart
     * @param product The product to be added to the cart
     */
    public addToStorage(product: ISku) {
        if (!product) {
            return;
        }

        const current = this.getCartItems();
        current.push(product);
        localStorage.setItem(this.CART_KEY, JSON.stringify(current));
    }

    /**
     * Removes a product from the cart
     * @param product Product to be removed from the local cart
     */
    public removeFromStorage(product: ISku) {
        if (!product) {
            return;
        }

        let current = this.getCartItems();
        const index = current.findIndex(element => element.id === product.id);
        current.splice(index, 1);
        localStorage.setItem(this.CART_KEY, JSON.stringify(current));
    }

    /**
     * Adds a product to the cart N times
     * @param product The product to be added
     * @param amount The ammount of times
     */
    public addAmmountToStorage(product: ISku, amount: number) {
        for (let i = 0; i < amount; i++) {
            this.addToStorage(product);
        }
    }

    /**
     * Returns all the items currently in the cart. Returns
     * an empty array in case of empty cart.
     */
    public getCartItems(): ISku[] {
        const items = localStorage.getItem(this.CART_KEY);
        if (!items) {
            return [];
        }
        return JSON.parse(items) as ISku[];
    }
}