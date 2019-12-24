import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { TopsService } from "src/app/core/services/tops.service";

@Component({
  selector: "app-product",
  templateUrl: "./product.component.html",
  styleUrls: ["./product.component.scss"]
})
export class ProductComponent implements OnInit {
  constructor(private router: Router, private topsService: TopsService) {}

  loading: boolean = true;
  product: any;
  productPreview: string;

  ngOnInit() {
    this.getCurrentProduct();
  }

  changePreview(url: string): void {
    this.productPreview = url;
  }

  getCurrentProduct(): void {
    const urlArray = this.router.url.split("/");
    if (urlArray.length === 5 && urlArray[4].indexOf("-") !== -1) {
      this.topsService.getByUrl(urlArray[4]).subscribe(
        response => {
          if (response.ok) {
            this.product = response.data;
            this.product.price.toFixed(2)
          }
        },
        error => {},
        () => {
          this.getCurrentProductImages();
        }
      );
    }
  }

  getCurrentProductImages(): void {
    this.topsService.getImagesByTopId(1).subscribe(
      response => {
        if (response.ok) {
          this.product.images = [];
          response.data.forEach(image => {
            this.product.images.push(image);
          });
        }
      },
      error => {},
      () => {
        this.productPreview = this.product.images[0].url;
        this.loading = false;
      }
    );
  }

  addToCart(): void {
    let actualCart: any = JSON.parse(
      window.localStorage.getItem("DARKMOONCART")
    );
    let now: any = new Date();
    let expires = now.setDate(now.getDate() + 3);
    if (actualCart !== null) {
      window.localStorage.removeItem("DARKMOONCART");
      actualCart.cart.push(this.product);
      actualCart.expires = expires;
      window.localStorage.setItem("DARKMOONCART", actualCart);
    } else {
      actualCart = {
        cart: [],
        expires: expires
      };
      actualCart.cart.push(this.product);
      window.localStorage.setItem("DARKMOONCART", JSON.stringify(actualCart));
    }
    console.log(JSON.parse(window.localStorage.getItem("DARKMOONCART")));
  }
}
