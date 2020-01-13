import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "models"
})
export class ModelsPipe implements PipeTransform {
  transform(value: string): any {
    switch (value.toLowerCase()) {
      case "shirt":
        return "camisetas";
    }
  }
}
