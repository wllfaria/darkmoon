import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { GendersPipe } from "./genders.pipe";

@NgModule({
  declarations: [GendersPipe],
  imports: [CommonModule],
  exports: [GendersPipe]
})
export class PipesModule {}
