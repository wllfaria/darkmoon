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
import { ProductLoaderComponent } from "./loaders/product-loader/product-loader.component";

@NgModule({
  declarations: [
    BannerComponent,
    FooterComponent,
    HeaderComponent,
    TopbarComponent,
    NavbarComponent,
    ProductCardComponent,
    ProductLoaderComponent
  ],
  imports: [CommonModule, PipesModule, RouterModule],
  exports: [
    BannerComponent,
    FooterComponent,
    HeaderComponent,
    NavbarComponent,
    ProductCardComponent
  ],
  entryComponents: [ProductLoaderComponent]
})
export class ComponentsModule {}
