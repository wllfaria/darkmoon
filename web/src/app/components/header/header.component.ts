import { Component, OnInit, ViewChild } from "@angular/core";
import { CartComponent } from "../cart/cart.component";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
  constructor() {}

  @ViewChild(CartComponent, { static: false })
  cartComponent: CartComponent;

  ngOnInit() {}

  toggleCart(): void {
    this.cartComponent.toggleCart();
  }
}
