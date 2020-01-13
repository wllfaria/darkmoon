import { Component, OnInit, ViewChild } from "@angular/core";
import { CartComponent } from "../cart/cart.component";
import { faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
  constructor() {}

  @ViewChild(CartComponent, { static: false })
  cartComponent: CartComponent;
  faShoppingCart = faShoppingCart;
  faUser = faUser;

  ngOnInit() {}

  toggleCart(): void {
    this.cartComponent.toggleCart();
  }
}
