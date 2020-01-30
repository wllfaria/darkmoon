import { Component, OnInit, Input } from "@angular/core";
import { Skus } from 'src/app/models/skus.model';

@Component({
  selector: "app-product-card",
  templateUrl: "./product-card.component.html",
  styleUrls: ["./product-card.component.scss"]
})
export class ProductCardComponent implements OnInit {
  @Input() product: Skus;

  loading: boolean = false;

  constructor() {}

  ngOnInit() {
    
  }
}
