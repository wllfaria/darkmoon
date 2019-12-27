import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "models"
})
export class ModelsPipe implements PipeTransform {
  transform(value: any): any {
    switch (value) {
      case "tshirt":
        return "camisetas";
    }
  }
}
