import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BannerComponent } from "./banner/banner.component";
import { FooterComponent } from "./footer/footer.component";
import { HeaderComponent } from "./header/header.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { ProductCardComponent } from "./product-card/product-card.component";
import { TopbarComponent } from "./header/topbar/topbar.component";
import { PipesModule } from "../pipes/pipes.module";
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [
    BannerComponent,
    FooterComponent,
    HeaderComponent,
    TopbarComponent,
    NavbarComponent,
    ProductCardComponent
  ],
  imports: [CommonModule, PipesModule, RouterModule],
  exports: [
    BannerComponent,
    FooterComponent,
    HeaderComponent,
    NavbarComponent,
    ProductCardComponent
  ]
})
export class ComponentsModule {}
