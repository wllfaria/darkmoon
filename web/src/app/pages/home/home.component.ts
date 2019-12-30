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
  products: any;

  ngOnInit() {
    this.getAllProducts();
  }

  getAllProducts() {
    this.topsService.getAll().subscribe(res => {
      this.products = res.data;
    },
    error => {},
    () => {
      this.loading = false;
      console.log(this.products)
    }
    );
  }
}
