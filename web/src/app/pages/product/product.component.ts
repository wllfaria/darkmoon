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

  changePreview(url: string): void {
    this.productPreview = url;
  }

  getCurrentProduct(): void {
    const urlArray = this.router.url.split("/");
    if (urlArray.length === 5 && urlArray[4].indexOf("-") !== -1) {
      this.topsService.getByUrl(urlArray[4]).subscribe(
        response => {
          this.product = response.data;
          this.product.size_m = 0;
        },
        error => {},
        () => {
          this.getCurrentProductImages();
        }
      );
    }
  }

  getCurrentProductImages(): void {
    this.topsService.getImagesByTopId(this.product.id).subscribe(
      response => {
        this.product.images = [];
        response.data.forEach(image => {
          this.product.images.push(image);
        });
      },
      error => {},
      () => {
        this.productPreview = this.product.images[0].url;
        this.getSuggestions();
      }
    );
  }

  addToCart(): void {
    let currentCart: any = JSON.parse(
      window.localStorage.getItem("DARKMOONCART")
    );
    if (currentCart) {
      window.localStorage.removeItem("DARKMOONCART");
      let product = {
        id: this.product.id,
        name: this.product.name,
        url: this.product.url,
        size: this.choosenSize
      };
      currentCart.cart.push(product);
      window.localStorage.setItem("DARKMOONCART", JSON.stringify(currentCart));
    } else {
      currentCart = {
        cart: [
          {
            id: this.product.id,
            name: this.product.name,
            url: this.product.url,
            size: this.choosenSize
          }
        ]
      };
      window.localStorage.setItem("DARKMOONCART", JSON.stringify(currentCart));
    }
  }

  getSuggestions(): void {
    this.topsService.getAll().subscribe(
      response => {
        this.suggestions = [];
        this.suggestions.push(response.data[0]);
        this.suggestions.push(response.data[1]);
      },
      error => {},
      () => {
        this.getSuggestionsImages();
      }
    );
  }

  getSuggestionsImages(): void {
    this.suggestions.forEach(product => {
      this.topsService.getImagesByTopId(product.id).subscribe(
        response => {
          product.images = [];
          response.data.forEach(image => {
            product.images.push(image);
          });
        },
        error => {},
        () => {
          this.loadingComplete();
        }
      );
    });
  }
}
