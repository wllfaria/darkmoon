import { Component, OnInit, Input } from "@angular/core";
import { TopImages } from "src/app/models/topImages";

@Component({
  selector: "app-product-card",
  templateUrl: "./product-card.component.html",
  styleUrls: ["./product-card.component.scss"]
})
export class ProductCardComponent implements OnInit {
  @Input() id: number;
  @Input() name: string;
  @Input() url: string;
  @Input() price: number;
  @Input() gender: string;
  @Input() category: string;
  @Input() images: Array<TopImages>;
  @Input() model: string;

  loading: boolean = false;

  constructor() {}

  ngOnInit() {}
}
