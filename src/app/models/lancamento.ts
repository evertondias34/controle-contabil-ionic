import { Periodo } from "./periodo";
import { Cliente } from "./cliente";

export class Lancamento {
  id: number;
  cliente: Cliente;
  periodo: Periodo;
  valorInss: number;
  pgtoInss: number;
  isPagoInss: boolean;
  valorSn: number;
  pgtoSn: number;
  isPagoSn: boolean;
  valorIr: number;
  pgtoIr: number;
  isPagoIr: boolean;
  valorCont: number;
  pgtoCont: number;
  isPagoCont: boolean;
  valorProl: number;
  pgtoProl: number;
  isPagoProl: boolean;
  valorRecebido: number;
  isRecebido: boolean;
  isLancamentoConcluido: boolean;
}
