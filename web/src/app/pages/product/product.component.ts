import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { TopsService } from "src/app/core/services/tops.service";

@Component({
  selector: "app-product",
  templateUrl: "./product.component.html",
  styleUrls: ["./product.component.scss"]
})
export class ProductComponent implements OnInit {
  constructor(
    private router: Router,
    private topsService: TopsService,
    private route: ActivatedRoute
  ) {}

  loading: boolean;
  product: any;
  productPreview: string;
  suggestions: any[];
  choosenSize = "M";

  ngOnInit() {
    this.loading = true;
    this.suggestions = [];
    this.getCurrentProduct();
    this.route.params.subscribe(() => {
      this.loading = true;
      this.getCurrentProduct();
    });
  }

  loadingComplete() {
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }

  changePreview(previewImage: any): void {
    this.productPreview = previewImage;
  }

  getCurrentProduct(): void {
    const urlArray = this.router.url.split("/");
    if (urlArray.length === 5 && urlArray[4].indexOf("-") !== -1) {
      this.topsService.getByUrl(urlArray[4]).subscribe(
        response => {
          this.product = response.data[0];
          this.productPreview = this.product.images[0];
        },
        error => {},
        () => {
          console.log(this.product);
          this.loading = false;
        }
      );
    }
  }

  addToCart(): void {
    let currentCart: any = JSON.parse(
      window.localStorage.getItem("DARKMOONCART")
    );
    if (currentCart) {
      window.localStorage.removeItem("DARKMOONCART");
      let product = {
        sku: this.product.sku,
        name: this.product.product_name,
        url: this.product.product_url,
        size: this.choosenSize
      };
      currentCart.cart.push(product);
      window.localStorage.setItem("DARKMOONCART", JSON.stringify(currentCart));
    } else {
      currentCart = {
        cart: [
          {
            sku: this.product.sku,
            name: this.product.product_name,
            url: this.product.product_url,
            size: this.choosenSize
          }
        ]
      };
      window.localStorage.setItem("DARKMOONCART", JSON.stringify(currentCart));
    }
  }
}
