import { Lancamentos } from "./lancamento";
import { Periodo } from "./periodo";

export class LancamentoMes {
  id: number;
  periodo: Periodo;
  lancamentos: Lancamentos[];
}
