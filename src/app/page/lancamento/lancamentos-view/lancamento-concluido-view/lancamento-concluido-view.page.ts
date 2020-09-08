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

  constructor(
    private lancamentoService: LancamentoService,
    private router: Router,
    private screenshot: Screenshot,
    private menssagemService: MenssagemService,
    private socialSharing: SocialSharing
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

  shareWhatsapp() {
    this.printarTela();
    //TODO fazer aqui

    // this.socialSharing.shareViaWhatsApp(
    //   "Compartilhando o conteúdo de um aplicativo com o Social Sharing.",
    //   res,
    //   null
    // );
  }

  // private void CreateDirectoryForPictures()
  // {
  //     App._dir = new File(
  //         Environment.GetExternalStoragePublicDirectory(
  //             Environment.DirectoryPictures), "imgen");
  //     if (!App._dir.Exists())
  //     {
  //         App._dir.Mkdirs();
  //     }
  // }

  printarTela() {
    this.screenshot
      .save("jpg", 80, "extrato")
      .then((res) => {
        this.socialSharing
          .shareViaWhatsApp(
            "Compartilhando o conteúdo de um aplicativo com o Social Sharing.",
            res.filePath,
            null
          )
          .then(() => {
            this.menssagemService.sucesso("compartilhado com sucesso");
          })
          .catch((error) => {
            this.menssagemService.error(
              "Falha ao printar lançamento! " + error
            );
          });

        this.menssagemService.sucesso("no CAPRICHO!");
      })
      .catch((error) => {
        // console.log("falha ao salvar " + error);
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

    console.log(this.lancamentoConcluido.saldoFinal);
  }
}
