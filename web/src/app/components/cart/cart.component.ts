import { Component, OnInit } from "@angular/core";
import { TopsService } from "src/app/core/services/tops.service";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.scss"]
})
export class CartComponent implements OnInit {
  constructor(private topsService: TopsService) {}

  private loading: boolean;
  private isCartOpen: boolean;
  private isCartEmpty: boolean;
  private products: any[];
  private cartHasError: boolean;
  private suggestion: any;
  private totalPrice: number;

  ngOnInit() {
    this.isCartOpen = false;
    this.loading = true;
    this.totalPrice = 0;
  }

  toggleCart(): void {
    this.loading = true;
    this.getCurrentCart();
    this.isCartOpen = !this.isCartOpen;
  }

  getCurrentCart(): void {
    let currentCart = JSON.parse(window.localStorage.getItem("DARKMOONCART"));
    if (!currentCart || !currentCart.cart.length) {
      this.isCartEmpty = true;
      this.loading = false;
      // this.getSuggestion();
      return;
    }
    this.products = currentCart.cart;
    this.loading = false;
    this.isCartEmpty = false;
    this.getProductsData();
  }

  getProductsData(): void {
    this.products.forEach(product => {
      this.topsService.getByUrl(product.url).subscribe(
        response => {
          console.log(response)
          product["sku"] = response.data[0].sku;
          product["price"] = response.data[0].price;
          product["type"] = response.data[0].product_type;
          product["model"] = response.data[0].model;
          product["gender"] = response.data[0].gender;
          product["images"] = response.data[0].images;
        },
        error => {
          this.cartHasError = true;
        },
        () => {
          setTimeout(() => {
            this.calculateCartPrice();
          }, 1500)
        }
      );
    });
  }

  calculateCartPrice() {
    if(this.totalPrice === 0) {
      this.products.forEach((product, index, array) => {
        this.totalPrice = this.totalPrice + Number(product.price);
      })
      this.totalPrice = Number((Math.round(this.totalPrice * 100) / 100).toFixed(2));
    }
  }

  getSuggestion(): void {
    this.topsService.getAll().subscribe(
      response => {
        this.suggestion = response.data[0];
      },
      error => {
        this.cartHasError = true;
      },
      () => {
      }
    );
  }

  removeFromCart(index: number): void {
    this.loading = true;
    let currentCart = JSON.parse(window.localStorage.getItem("DARKMOONCART"));
    currentCart.cart.splice(index, 1);
    this.products = currentCart.cart;
    window.localStorage.removeItem("DARKMOONCART");
    if (!this.products) {
      this.isCartEmpty = true;
      this.loading = false;
      return;
    } else {
      window.localStorage.setItem(
        "DARKMOONCART",
        JSON.stringify({ cart: this.products })
      );
      this.loading = false;
    }
    this.getCurrentCart();
  }
}
