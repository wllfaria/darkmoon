import { Component, OnInit, Input } from "@angular/core";
import { TopImages } from "src/app/models/topImages";

@Component({
  selector: "app-product-card",
  templateUrl: "./product-card.component.html",
  styleUrls: ["./product-card.component.scss"]
})
export class ProductCardComponent implements OnInit {
  @Input() name: string;
  @Input() url: string;
  @Input() sku: number;
  @Input() price: number;
  @Input() productType: any;
  @Input() model: any;
  @Input() gender: any;
  @Input() images: any[];

  loading: boolean = false;

  constructor() {}

  ngOnInit() {
    console.log(this.productType)
  }
}
