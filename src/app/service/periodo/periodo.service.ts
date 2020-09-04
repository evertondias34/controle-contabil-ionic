import { Periodo } from "./../../models/periodo";
import { Injectable } from "@angular/core";
import { Platform } from "@ionic/angular";
import { MenssagemService } from "../menssagem/menssagem.service";
import { Plugins } from "@capacitor/core";

const { Storage } = Plugins;

@Injectable({
  providedIn: "root",
})
export class PeriodoService {
  private PERIODO_STORAGE: string = "periodos";
  private idCurrent: number = 0;
  private periodos: Periodo[] = [];
  private platform: Platform;

  constructor(platform: Platform, private menssagemService: MenssagemService) {
    this.platform = platform;
  }

  async findAll(): Promise<Periodo[]> {
    try {
      const periodosJson = await Storage.get({ key: this.PERIODO_STORAGE });
      var dadosPeriodos = JSON.parse(periodosJson.value);

      console.log(dadosPeriodos);

      if (dadosPeriodos) {
        const { lastId, values } = dadosPeriodos[0];
        this.idCurrent = lastId;
        this.periodos = values;
      }

      return this.getPeriodosAtivos();
    } catch (error) {
      this.menssagemService.error("Falha ao buscar Clientes!");
      console.error("FindAll failed " + error);
    }
  }

  private getPeriodosAtivos(): Periodo[] {
    var periodosAtivos: Periodo[] = this.periodos.filter(
      (periodo) => periodo.isAtivo
    );

    return periodosAtivos;
  }
}
