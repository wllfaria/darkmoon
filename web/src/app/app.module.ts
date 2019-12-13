import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TopbarComponent } from './components/header/topbar/topbar.component';
import { BannerComponent } from './components/banner/banner.component';
import { ArrivalComponent } from './components/arrival/arrival.component';
import { ProductCardComponent } from './components/product-card/product-card.component';

import { ArrivalsService } from './services/arrivals.service';

const appRoutes: Routes = [
  { path: '',
    pathMatch: 'full',
    component: HomeComponent
  }
  // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    NavbarComponent,
    TopbarComponent,
    BannerComponent,
    ArrivalComponent,
    ProductCardComponent,
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {
        enableTracing: true
      }
    ),
    BrowserModule
  ],
  providers: [ArrivalsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
