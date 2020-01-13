import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BannerComponent } from "./banner/banner.component";
import { FooterComponent } from "./footer/footer.component";
import { HeaderComponent } from "./header/header.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { ProductCardComponent } from "./product-card/product-card.component";
import { PipesModule } from "../pipes/pipes.module";
import { RouterModule } from "@angular/router";
import { ProductLoaderComponent } from "./loaders/product-loader/product-loader.component";
import { CartComponent } from "./cart/cart.component";
import { CartLoaderComponent } from "./loaders/cart-loader/cart-loader.component";
import { DirectivesModule } from "../core/directives/directives.module";
import { LoadingCartDirective } from "../core/directives/loading-cart.directive";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    BannerComponent,
    FooterComponent,
    HeaderComponent,
    NavbarComponent,
    ProductCardComponent,
    ProductLoaderComponent,
    CartComponent,
    CartLoaderComponent
  ],
  imports: [CommonModule, PipesModule, RouterModule, FontAwesomeModule],
  exports: [
    BannerComponent,
    FooterComponent,
    HeaderComponent,
    NavbarComponent,
    ProductCardComponent
  ],
  entryComponents: [ProductLoaderComponent, CartLoaderComponent]
})
export class ComponentsModule {}
