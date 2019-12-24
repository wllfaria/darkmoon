import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoadingContentDirective } from "./loading-content.directive";
import { ComponentsModule } from "src/app/components/components.module";

@NgModule({
  declarations: [LoadingContentDirective],
  imports: [CommonModule, ComponentsModule],
  exports: [LoadingContentDirective]
})
export class DirectivesModule {}
