import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { ROUTER } from "./app-routing";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./pages/home/home.component";
import { TemplateComponent } from "./template/template.component";
import { NotFoundComponent } from "./pages/not-found/not-found.component";
import { ProductComponent } from "./pages/product/product.component";
import { ProductListComponent } from "./pages/product-list/product-list.component";

import { HttpClientModule } from "@angular/common/http";
import { ComponentsModule } from "./components/components.module";
import { PipesModule } from "./pipes/pipes.module";
import { DirectivesModule } from "./core/directives/directives.module";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TemplateComponent,
    ProductComponent,
    NotFoundComponent,
    ProductListComponent
  ],
  imports: [
    ComponentsModule,
    HttpClientModule,
    PipesModule,
    DirectivesModule,
    RouterModule.forRoot(ROUTER, {
      useHash: false
    }),
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
