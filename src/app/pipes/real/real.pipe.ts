import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "realPipe",
})
export class RealPipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    return this.formatterLancamentos(value);
  }

  formatterLancamentos(lancamento) {
    var option = {
      style: "currency",
      currency: "BRL",
    };
    var formatter = new Intl.NumberFormat("pt-BR", option);
    var value = lancamento ? lancamento : 0;

    var lancamentoFormated = formatter.format(lancamento);

    return lancamentoFormated;
  }
}
