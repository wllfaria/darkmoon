import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { NavbarComponent } from './header/navbar/navbar.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { PipesModule } from '../pipes/pipes.module';
import { RouterModule } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RequestErrorComponent } from './errors/request-error/request-error.component';
import { GenericInputComponent } from './generic-input/generic-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CartIconComponent } from './svg/icons/cart-icon/cart-icon.component';
import { NgxMaskModule } from 'ngx-mask';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { SkeletonLoaderComponent } from './loaders/skeleton-loader/skeleton-loader.component';

@NgModule({
	declarations: [
		CartComponent,
		FooterComponent,
		HeaderComponent,
		NavbarComponent,
		CartIconComponent,
		ProductCardComponent,
		RequestErrorComponent,
		GenericInputComponent,
		SkeletonLoaderComponent,
	],
	imports: [
		CommonModule,
		PipesModule,
		RouterModule,
		FontAwesomeModule,
		DragDropModule,
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
		CartIconComponent,
		SkeletonLoaderComponent
	],
	entryComponents: [
		RequestErrorComponent
	]
})
export class ComponentsModule { }
