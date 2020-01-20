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
import { LoginComponent } from './pages/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './pages/login/register/register.component';
import { RecoveryComponent } from './pages/login/recovery/recovery.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TemplateComponent,
    ProductComponent,
    NotFoundComponent,
    ProductListComponent,
    LoginComponent,
    RegisterComponent,
    RecoveryComponent,

  ],
  imports: [
    ComponentsModule,
    HttpClientModule,
    PipesModule,
    DirectivesModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    RouterModule.forRoot(ROUTER, {
      useHash: false
    }),
    BrowserModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
