import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { ROUTER } from "./app-routing";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./components/header/header.component";
import { HomeComponent } from "./pages/home/home.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { TopbarComponent } from "./components/header/topbar/topbar.component";
import { BannerComponent } from "./components/banner/banner.component";
import { ProductCardComponent } from "./components/product-card/product-card.component";

import { TemplateComponent } from "./template/template.component";
import { HttpClientModule } from "@angular/common/http";
import { FooterComponent } from "./components/footer/footer.component";
import { ProductComponent } from './pages/product/product.component';
import { GendersPipe } from './pipes/genders.pipe';
import { NotFoundComponent } from './pages/not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    NavbarComponent,
    TopbarComponent,
    BannerComponent,
    ProductCardComponent,
    TemplateComponent,
    FooterComponent,
    ProductComponent,
    GendersPipe,
    NotFoundComponent
  ],
  imports: [
    HttpClientModule,
    RouterModule.forRoot(ROUTER, {
      // enableTracing: true,
      useHash: false
    }),
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
