import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "genders"
})
export class GendersPipe implements PipeTransform {
  transform(value: string): any {
    switch (value.toLowerCase()) {
      case "male":
        return "masculino";
      case "female":
        return "feminino";
      case "unisex":
        return "unisex";
      default:
        break;
    }
  }
}
