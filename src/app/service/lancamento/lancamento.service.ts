import { LancamentoBean } from "src/app/models/lancamento-bean";
import { Lancamento } from "./../../models/lancamento";
import { Injectable } from "@angular/core";

import { Plugins } from "@capacitor/core";
import { Platform } from "@ionic/angular";
import { MenssagemService } from "../menssagem/menssagem.service";
import { Dados } from "src/app/models/dados";

const { Storage } = Plugins;

@Injectable({
  providedIn: "root",
})
export class LancamentoService {
  private LANCAMENTO_STORAGE: string = "lancamentos";
  private idCurrent: number = 0;
  private lancamentos: Lancamento[] = [];
  private platform: Platform;

  constructor(platform: Platform, private menssagemService: MenssagemService) {
    this.platform = platform;
  }

  async deleteById(id: number): Promise<any> {
    try {
      this.lancamentos = await this.lancamentos.filter(
        (cliente) => cliente.id !== id
      );
      var dadosLancamentos = this.createDadosLancamentos();

      this.setLancamentosStorage(dadosLancamentos);
    } catch (error) {
      this.menssagemService.error("Falha ao deletar lançamento!");
      console.error("DeleteById failed " + error);
    }
  }

  async findAll(): Promise<LancamentoBean[]> {
    try {
      const lancamentoJson = await Storage.get({
        key: this.LANCAMENTO_STORAGE,
      });
      var dadosLancamentos = JSON.parse(lancamentoJson.value);

      console.log(dadosLancamentos);

      if (dadosLancamentos) {
        const { lastId, values } = dadosLancamentos[0];
        this.idCurrent = lastId;
        this.lancamentos = values;
      }

      return this.getLancamentosBean();
    } catch (error) {
      this.menssagemService.error("Falha ao buscar Lançamentos!");
      console.error("FindAll failed " + error);
    }
  }

  async getContratoFull(idLancamento: number): Promise<Lancamento> {
    var lancamentoCompleto = await this.lancamentos.find(
      (lancamento) => (lancamento.id = idLancamento)
    );

    return lancamentoCompleto;
  }

  async save(lancamento: Lancamento): Promise<any> {
    try {
      this.addNovo(lancamento);
      var dadoLancamento = this.createDadosLancamentos();

      this.setLancamentosStorage(dadoLancamento);
    } catch (error) {
      this.menssagemService.error("Falha ao salvar cliente!");
      console.error("Save failed " + error);
    }
  }

  async update(lancamento: Lancamento): Promise<any> {
    try {
      this.refresh(lancamento);
      var dadosLancamentos = this.createDadosLancamentos();

      this.setLancamentosStorage(dadosLancamentos);
    } catch (error) {
      this.menssagemService.error("Falha ao atualizar lançamento!");
      console.error("Update failed " + error);
    }
  }

  private addNovo(novoLancamento: Lancamento) {
    novoLancamento.id = ++this.idCurrent;
    this.lancamentos.push(novoLancamento);
  }

  private createDadosLancamentos(): Dados {
    var dadoLancamentos = new Dados();
    dadoLancamentos.lastId = this.idCurrent;
    dadoLancamentos.values = this.lancamentos;

    return dadoLancamentos;
  }

  private createLancamentoBean(lancamento: Lancamento): LancamentoBean {
    const { id, cliente, periodo } = lancamento;

    var novoLancamentoBean = new LancamentoBean();
    novoLancamentoBean.idLancamento = id;
    novoLancamentoBean.nomeCliente = cliente.nome;
    novoLancamentoBean.periodo = periodo.mesAno;

    return novoLancamentoBean;
  }

  private getLancamentosBean(): LancamentoBean[] {
    var lancamentosBean: LancamentoBean[] = this.lancamentos.map(
      (lancamento) => {
        var beanLancamento = this.createLancamentoBean(lancamento);

        return beanLancamento;
      }
    );

    return lancamentosBean;
  }

  private refresh(lancamentoEditado: Lancamento) {
    const indexEditado = this.lancamentos.findIndex(({ id }) => {
      return id === lancamentoEditado.id;
    });

    this.lancamentos[indexEditado] = lancamentoEditado;
  }

  private async setLancamentosStorage(allLancamentos: Dados) {
    var lancamentosDados = [allLancamentos];

    Storage.set({
      key: this.LANCAMENTO_STORAGE,
      value: this.platform.is("hybrid")
        ? JSON.stringify(lancamentosDados)
        : JSON.stringify(
            lancamentosDados.map((dados) => {
              const lancamento = { ...dados };
              return lancamento;
            })
          ),
    });
  }
}
