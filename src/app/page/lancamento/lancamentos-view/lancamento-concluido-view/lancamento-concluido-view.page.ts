import { Platform } from "@ionic/angular";
import { Screenshot } from "@ionic-native/screenshot/ngx";
import { SocialSharing } from "@ionic-native/social-sharing/ngx";

import { Lancamento } from "./../../../../models/lancamento";
import { Component, OnInit } from "@angular/core";
import { LancamentoService } from "src/app/service/lancamento/lancamento.service";
import { Router } from "@angular/router";
import { LancamentoConcluido } from "src/app/models/lancamento-concluido";
import { MenssagemService } from "src/app/service/menssagem/menssagem.service";
import { App } from "@capacitor/core/dist/esm/web/app";
import { error } from "protractor";

@Component({
  selector: "app-lancamento-concluido-view",
  templateUrl: "./lancamento-concluido-view.page.html",
  styleUrls: ["./lancamento-concluido-view.page.scss"],
})
export class LancamentoConcluidoViewPage implements OnInit {
  lancamentoConcluido: LancamentoConcluido = new LancamentoConcluido();
  isShowButtom: boolean = true;

  constructor(
    private lancamentoService: LancamentoService,
    private router: Router,
    private screenshot: Screenshot,
    private menssagemService: MenssagemService,
    private socialSharing: SocialSharing
  ) {}

  ngOnInit() {
    this.buscarLancamentoCompleto();
  }

  async buscarLancamentoCompleto() {
    let id = this.router.getCurrentNavigation().extras.state.idLancamento;
    let lancamentoCurrent = await this.lancamentoService.getContratoFull(id);

    this.createLancamentoConcluido(lancamentoCurrent);
  }

  shareWhatsapp() {
    this.isShowButtom = false;

    this.screenshot
      .URI(80)
      .then((res) => {
        var screen = res.URI;

        this.socialSharing
          .shareViaWhatsApp("Segue o extrato da contabilidade", screen, null)
          .then(() => {
            this.menssagemService.sucesso("Compartilhado com sucesso");
            this.isShowButtom = true;
          })
          .catch((error) => {
            this.menssagemService.error("Falha ao  compartilhar! " + error);
          });
      })
      .catch((error) => {
        this.menssagemService.error("Falha ao printar lançamento! " + error);
      });
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
  }
}
