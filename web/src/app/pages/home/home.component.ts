import { Component, OnInit } from "@angular/core";
import { Tops } from "src/app/models/tops";
import { TopsService } from "../../core/services/tops.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  constructor(private topsService: TopsService) {}
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
    this.topsService.getAll().subscribe(res => {
      this.products = res.data;
    },
    error => {},
    () => {
    }
  )}

  checkLoading() {
    if(this.products) {
      this.products.forEach(product => {
        console.log(product)
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
