import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "phoneView",
})
export class PhoneViewPipe implements PipeTransform {
  transform(tel: number, ...args: any[]): string {
    var value = tel.toString().trim();

    var codigo = value.slice(0, 3);
    var firstNumbers = value.slice(3, 8);
    var lastNumbers = value.slice(8);

    var phoneView = `(${codigo}) ${firstNumbers}-${lastNumbers}`;

    return phoneView.trim();
  }
}
