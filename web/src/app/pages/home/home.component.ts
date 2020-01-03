import { Component, OnInit } from "@angular/core";
import { Tops } from "src/app/models/tops";
import { ShirtsService } from "../../core/services/shirts.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  constructor(private shirtsService: ShirtsService) {}
  loading: boolean = true;
  products: any[];
  productsLoaded: boolean;

  ngOnInit() {
    this.loading = true;
    this.getAllProducts();
    setInterval(() => {
      if(this.loading) {
        this.checkLoading();
      }
    }, 100)
  }

  getAllProducts() {
    this.shirtsService.getAll().subscribe(res => {
      this.products = res.data;
      console.log(this.products)
    },
    error => {},
    () => {
    }
  )}

  checkLoading() {
    if(this.products) {
      this.products.forEach(product => {
        if(product.images.length) {
          this.productsLoaded = true;
        } else {
          this.productsLoaded = false;
          this.getAllProducts();
        }
      });
    }
    if(this.productsLoaded) {
      this.loading = false;
    }
  }
}
