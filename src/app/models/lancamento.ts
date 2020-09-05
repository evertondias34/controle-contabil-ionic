import { Periodo } from "./periodo";
import { Cliente } from "./cliente";

export class Lancamento {
  id: number;
  cliente: Cliente;
  periodo: Periodo;
  valorInss: number;
  pagoInss: number;
  isPagoInss: boolean;
  valorSn: number;
  pagoSn: number;
  isPagoSn: boolean;
  valorIr: number;
  pagoIr: number;
  isPagoIr: boolean;
  valorCont: number;
  pagoCont: number;
  isPagoCont: boolean;
  valorProl: number;
  pagoProl: number;
  isPagoProl: boolean;
  valorRecebido: number;
  isRecebido: boolean;
  isLancamentoConcluido: boolean;
}
