import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoadingProductDirective } from "./loading-product.directive";
import { ComponentsModule } from "src/app/components/components.module";
import { LoadingCartDirective } from "./loading-cart.directive";
import { RequestErrorDirective } from './request-error.directive';

@NgModule({
	declarations: [
		LoadingProductDirective, 
		LoadingCartDirective, 
		RequestErrorDirective
	],
	imports: [
		CommonModule, 
		ComponentsModule
	],
	exports: [
		LoadingProductDirective, 
		LoadingCartDirective,
		RequestErrorDirective
	]
})
export class DirectivesModule {}
