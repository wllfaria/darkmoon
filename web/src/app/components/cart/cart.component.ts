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
  private isCartOpen: boolean = false;
  private isCartEmpty: boolean;
  private products: any[];
  private cartHasError: boolean;
  private suggestion: any;

  ngOnInit() {
    this.loading = true;
  }

  toggleCart(): void {
    this.loading = true;
    this.getCurrentCart();
    this.isCartOpen = !this.isCartOpen;
  }

  getCurrentCart(): void {
    let currentCart = JSON.parse(window.localStorage.getItem("DARKMOONCART"));
    if (!currentCart) {
      this.isCartEmpty = true;
      this.loading = false;
      this.getSuggestion();
      return;
    }
    this.products = currentCart.cart;
    this.isCartEmpty = false;
    this.getProductsData();
  }

  getProductsData(): void {
    this.products.forEach(product => {
      this.topsService.getByUrl(product.url).subscribe(
        response => {
          product["id"] = response.data.id;
          product["price"] = response.data.price;
          product["model"] = response.data.model;
          product["category"] = response.data.category;
          product["gender"] = response.data.gender;
        },
        error => {
          this.cartHasError = true;
        },
        () => {
          this.getProductsImages();
        }
      );
    });
  }

  getProductsImages(): void {
    this.products.forEach(product => {
      this.topsService.getImagesByTopId(product.id).subscribe(
        response => {
          product["images"] = response.data;
        },
        error => {
          this.cartHasError = true;
        },
        () => {
          this.loading = false;
        }
      );
    });
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
        this.getSuggestionImage();
      }
    );
  }

  getSuggestionImage(): void {
    this.topsService.getImagesByTopId(this.suggestion.id).subscribe(
      response => {
        this.suggestion.images = response.data;
      },
      error => {
        this.cartHasError = true;
      },
      () => {
        this.loading = false;
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
  }
}
