import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { GendersPipe } from "./genders.pipe";
import { ModelsPipe } from "./models.pipe";

@NgModule({
  declarations: [GendersPipe, ModelsPipe],
  imports: [CommonModule],
  exports: [GendersPipe, ModelsPipe]
})
export class PipesModule {}
