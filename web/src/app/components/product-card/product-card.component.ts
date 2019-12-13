import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
  @Input() public id: Number;
  @Input() public name: String;
  @Input() public price: Number;
  @Input() public images: Array<String>;

  constructor() { }

  ngOnInit() {
  }

}
