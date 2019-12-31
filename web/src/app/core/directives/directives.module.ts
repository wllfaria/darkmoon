import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoadingProductDirective } from "./loading-product.directive";
import { ComponentsModule } from "src/app/components/components.module";
import { LoadingCartDirective } from "./loading-cart.directive";

@NgModule({
  declarations: [LoadingProductDirective, LoadingCartDirective],
  imports: [CommonModule, ComponentsModule],
  exports: [LoadingProductDirective, LoadingCartDirective]
})
export class DirectivesModule {}
