import { Periodo } from "./periodo";
import { Cliente } from "./cliente";

export class Lancamento {
  id: number;
  cliente: Cliente;
  periodo: Periodo;
  valorInss: number;
  isPagoInss: boolean;
  valorSn: number;
  isPagoSn: boolean;
  valorIr: number;
  isPagoIr: boolean;
  valorCont: number;
  isPagoCont: boolean;
  valorProl: number;
  isPagoProl: boolean;
  valorRecebido: number;
  isRecebido: boolean;
  isLancamentoConcluido: boolean;
  isExtrato: boolean;
}
