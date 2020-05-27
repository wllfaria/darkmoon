import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FooterComponent } from "./footer/footer.component";
import { HeaderComponent } from "./header/header.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { ProductCardComponent } from "./product-card/product-card.component";
import { PipesModule } from "../pipes/pipes.module";
import { RouterModule } from "@angular/router";
import { ProductLoaderComponent } from "./loaders/product-loader/product-loader.component";
import { CartComponent } from "./cart/cart.component";
import { CartLoaderComponent } from "./loaders/cart-loader/cart-loader.component";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RequestErrorComponent } from './errors/request-error/request-error.component';
import { GenericInputComponent } from './generic-input/generic-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
	declarations: [
		FooterComponent,
		HeaderComponent,
		NavbarComponent,
		ProductCardComponent,
		ProductLoaderComponent,
		CartComponent,
		CartLoaderComponent,
		RequestErrorComponent,
		GenericInputComponent
	],
	imports: [
		CommonModule,
		PipesModule,
		RouterModule,
        FontAwesomeModule,
        FormsModule,
        ReactiveFormsModule,
        NgxMaskModule
	],
	exports: [
		FooterComponent,
		HeaderComponent,
		NavbarComponent,
        ProductCardComponent,
        GenericInputComponent,
	],
	entryComponents: [
		ProductLoaderComponent,
		CartLoaderComponent,
		RequestErrorComponent
	]
})
export class ComponentsModule {}
