import { Component, OnInit } from "@angular/core";
import { ShirtsService } from "src/app/core/services/shirts.service";
import { Skus } from 'src/app/models/skus.model';

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.scss"]
})
export class CartComponent implements OnInit {
  constructor(private shirtsService: ShirtsService) {}

  private cartLoading: boolean;
  private isCartOpen: boolean;
  private isCartEmpty: boolean;
  private products: any[];
  private cartHasError: boolean;
  private suggestion: any;
  private totalPrice: number;

  private cartLoaded: boolean;

  ngOnInit() {
    this.setLoading();
    this.totalPrice = 0;
  }

  checkLoading = () => {
    if(
      this.cartLoaded
    ) { 
      this.cartLoading = false;
    }
  }

  setLoading = () => {
    this.cartLoaded = false;
    this.cartLoading = true;
  }

  toggleCart(): void {
    this.setLoading();
    this.getCurrentCart();
    this.isCartOpen = !this.isCartOpen;
  }

  getCurrentCart(): void {
    this.setLoading();

    let currentCart = JSON.parse(window.localStorage.getItem("DARKMOONCART"));

    if (!currentCart || !currentCart.cart.length) {
      this.isCartEmpty = true;
      this.cartLoaded = true;
      this.checkLoading();
      // this.getSuggestion();
      return;
    }
    
    this.products = currentCart.cart;
    this.cartLoaded = true;
    this.checkLoading();
  }

  calculateCartPrice() {
    if(this.totalPrice === 0) {
      this.products.forEach((product, index, array) => {
        this.totalPrice = this.totalPrice + Number(product.price);
      })
      this.totalPrice = Number((Math.round(this.totalPrice * 100) / 100).toFixed(2));
    }
  }

  removeFromCart = (index: number): void => {
    this.setLoading();

    let currentCart: any = JSON.parse(window.localStorage.getItem("DARKMOONCART"));
    currentCart.cart.splice(index, 1);
    this.products = currentCart.cart;
    window.localStorage.removeItem("DARKMOONCART");

    if (!this.products) {
      this.isCartEmpty = true;
      this.cartLoaded = true;
      this.checkLoading();
      return;
    }

    window.localStorage.setItem("DARKMOONCART", JSON.stringify({ cart: this.products }));
    this.getCurrentCart();
  }
}
