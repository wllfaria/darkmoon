import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { ROUTER } from "./app-routing";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./pages/home/home.component";
import { TemplateComponent } from "./template/template.component";
import { NotFoundComponent } from "./pages/not-found/not-found.component";

import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { ComponentsModule } from "./components/components.module";
import { PipesModule } from "./pipes/pipes.module";
import { DirectivesModule } from "./core/directives/directives.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthenticationModule } from './pages/authentication/authentication.module';
import { ShirtsComponent } from './pages/shirts/shirts.component';
import ErrorInterceptor from './core/interceptors/error-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TemplateComponent,
    NotFoundComponent,
    ShirtsComponent,
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
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
