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
import { ProductComponent } from "./pages/product/product.component";
import { GendersPipe } from "./pipes/genders.pipe";
import { NotFoundComponent } from "./pages/not-found/not-found.component";
import { ProductListComponent } from "./pages/product-list/product-list.component";
import { LoadingContentDirective } from "./core/directives/loading-content.directive";
import { ComponentsModule } from "./components/components.module";
import { PipesModule } from "./pipes/pipes.module";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TemplateComponent,
    ProductComponent,
    NotFoundComponent,
    ProductListComponent,
    LoadingContentDirective
  ],
  imports: [
    ComponentsModule,
    HttpClientModule,
    PipesModule,
    RouterModule.forRoot(ROUTER, {
      useHash: false
    }),
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
