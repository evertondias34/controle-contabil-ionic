import { Periodo } from "./../../models/periodo";
import { Injectable } from "@angular/core";
import { Platform } from "@ionic/angular";
import { MenssagemService } from "../menssagem/menssagem.service";
import { Plugins } from "@capacitor/core";
import { Dados } from "src/app/models/dados";

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

  async delete(periodo: Periodo): Promise<any> {
    try {
      periodo.isAtivo = false;
      this.refresh(periodo);
      var dadosPeriodos = this.createDadosPeriodo();

      this.setPeriodosStorage(dadosPeriodos);
    } catch (error) {
      this.menssagemService.error("Falha ao deletar período!");
      console.error("Delete failed " + error);
    }
  }
  async findAll(): Promise<Periodo[]> {
    try {
      const periodosJson = await Storage.get({ key: this.PERIODO_STORAGE });
      var dadosPeriodos = JSON.parse(periodosJson.value);

      if (dadosPeriodos) {
        const { lastId, values } = dadosPeriodos[0];
        this.idCurrent = lastId;
        this.periodos = values;
      }

      return this.getPeriodosAtivos();
    } catch (error) {
      this.menssagemService.error("Falha ao buscar Períodos!");
      console.error("FindAll failed " + error);
    }
  }

  async save(periodo: Periodo): Promise<any> {
    try {
      this.addNovo(periodo);
      var dadosperíodos = this.createDadosPeriodo();

      this.setPeriodosStorage(dadosperíodos);
    } catch (error) {
      this.menssagemService.error("Falha ao salvar período!");
      console.error("Save failed " + error);
    }
  }

  async update(periodo: Periodo): Promise<any> {
    try {
      this.refresh(periodo);
      var dadosPeriodo = this.createDadosPeriodo();

      this.setPeriodosStorage(dadosPeriodo);
    } catch (error) {
      this.menssagemService.error("Falha ao atualizar período!");
      console.error("Update failed " + error);
    }
  }

  private addNovo(novoPeriodo: Periodo) {
    novoPeriodo.id = ++this.idCurrent;
    novoPeriodo.isAtivo = true;
    this.periodos.push(novoPeriodo);
  }

  private createDadosPeriodo(): Dados {
    var dadosPeriodos = new Dados();
    dadosPeriodos.lastId = this.idCurrent;
    dadosPeriodos.values = this.periodos;

    return dadosPeriodos;
  }

  private getPeriodosAtivos(): Periodo[] {
    var periodosAtivos: Periodo[] = this.periodos.filter(
      (periodo) => periodo.isAtivo
    );

    return periodosAtivos;
  }

  private async setPeriodosStorage(allPeridos: Dados) {
    var periodosDados = [allPeridos];

    Storage.set({
      key: this.PERIODO_STORAGE,
      value: this.platform.is("hybrid")
        ? JSON.stringify(periodosDados)
        : JSON.stringify(
            periodosDados.map((dados) => {
              const periodo = { ...dados };
              return periodo;
            })
          ),
    });
  }

  private refresh(periodoEditado: Periodo) {
    const indexEditado = this.periodos.findIndex(({ id }) => {
      return id === periodoEditado.id;
    });

    this.periodos[indexEditado] = periodoEditado;
  }
}
