import { Lancamento } from "./../../../../models/lancamento";
import { Component, OnInit } from "@angular/core";
import { LancamentoService } from "src/app/service/lancamento/lancamento.service";
import { Router } from "@angular/router";
import { LancamentoConcluido } from "src/app/models/lancamento-concluido";

@Component({
  selector: "app-lancamento-concluido-view",
  templateUrl: "./lancamento-concluido-view.page.html",
  styleUrls: ["./lancamento-concluido-view.page.scss"],
})
export class LancamentoConcluidoViewPage implements OnInit {
  lancamentoConcluido: LancamentoConcluido = new LancamentoConcluido();

  constructor(
    private lancamentoService: LancamentoService,
    private router: Router
  ) {
    // if (this.router.getCurrentNavigation().extras.state) {
    //   this.buscarLancamentoCompleto();
    // }
  }

  ngOnInit() {
    this.buscarLancamentoCompleto();
  }

  async buscarLancamentoCompleto() {
    let id = this.router.getCurrentNavigation().extras.state.idLancamento;
    let lancamentoCurrent = await this.lancamentoService.getContratoFull(id);

    this.createLancamentoConcluido(lancamentoCurrent);
  }

  compartilhar() {
    //TODO fazer aqui
  }

  createLancamentoConcluido(lancamento: Lancamento) {
    const {
      cliente,
      periodo,
      valorInss,
      valorSn,
      valorIr,
      valorProl,
      valorCont,
      valorRecebido,
    } = lancamento;

    this.lancamentoConcluido.nomeCliente = cliente.nome.toUpperCase();
    this.lancamentoConcluido.periodo = periodo.mesAno.toUpperCase();
    this.lancamentoConcluido.valorInss = valorInss;
    this.lancamentoConcluido.valorSn = valorSn;
    this.lancamentoConcluido.valorIr = valorIr;
    this.lancamentoConcluido.valorProl = valorProl;
    this.lancamentoConcluido.valorCont = valorCont;
    this.lancamentoConcluido.valorRecebido = valorRecebido;

    var totalDespesa = valorInss + valorSn + valorIr + valorProl + valorCont;
    var saldoTotal = valorRecebido - totalDespesa;

    this.lancamentoConcluido.despesaTotal = totalDespesa;
    this.lancamentoConcluido.saldoFinal = saldoTotal;

    console.log(this.lancamentoConcluido.saldoFinal);
  }
}
