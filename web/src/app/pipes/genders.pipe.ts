import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "genders"
})
export class GendersPipe implements PipeTransform {
  transform(value: any): any {
    switch (value) {
      case "M":
        return "masculino";
      case "F":
        return "feminino";
      case "U":
        return "unisex";
      default:
        break;
    }
  }
}
