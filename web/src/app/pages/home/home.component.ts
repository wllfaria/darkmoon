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

  private contentLoading: boolean;
  private products: any[];
  private productsLoading: boolean;

  ngOnInit() {
    this.setPageLoading();
    this.getAllProducts();
  }

  setPageLoading() {
    this.contentLoading = true;
    this.productsLoading = true;
  }

  checkLoading() {
    if(
      !this.productsLoading
    ) {
      this.contentLoading = false;
    }
  }

  getAllProducts() {
    this.shirtsService.getAll().subscribe(res => {
      this.products = res.data;
      console.log(this.products)
    },
    error => {},
    () => {
      this.checkLoading();
    }
  )}
}
