import { Component, OnInit } from "@angular/core";
import { Router, NavigationExtras } from "@angular/router";
import { MenssagemService } from "src/app/service/menssagem/menssagem.service";
import { LancamentoService } from "src/app/service/lancamento/lancamento.service";
import { LancamentoBean } from "src/app/models/lancamento-bean";

@Component({
  selector: "app-lancamento-view",
  templateUrl: "./lancamento-view.page.html",
  styleUrls: ["./lancamento-view.page.scss"],
})
export class LancamentoViewPage implements OnInit {
  filteredLancamentosBean: LancamentoBean[] = [];
  _lancamentosBean: LancamentoBean[] = [];
  isShowPendentes: boolean = false;

  constructor(
    public lancamentoService: LancamentoService,
    private router: Router,
    private menssagemService: MenssagemService
  ) {}

  ngOnInit() {}

  ionViewDidEnter() {
    this.buscarLancamentos();
  }

  adicionarLancamento() {
    this.router.navigate(["/lancamento-form"]);
  }

  async buscarLancamentos() {
    this._lancamentosBean = await this.lancamentoService.findAll();
    this.filteredLancamentosBean = this._lancamentosBean;

    if (this.isShowPendentes) {
      this.getLancamentosPendentes();
    }
  }

  concluir(idLancamento: number) {
    let mensagem =
      "Deseja concluir esse lancamento? (Após concluído este não poderá mais ser editado";
    this.menssagemService.confirmar(mensagem, async () => {
      let navigationExtras: NavigationExtras = {
        state: {
          idLancamento: idLancamento,
        },
      };
      this.router.navigate(["/lancamento-concluido-view"], navigationExtras);
    });
  }

  deletar(lancamentoBean: LancamentoBean) {
    let mensagem =
      "Deseja excluir o lancamento: '" +
      lancamentoBean.nomeCliente +
      " -" +
      lancamentoBean.periodo +
      "'  ?";
    this.menssagemService.confirmar(mensagem, async () => {
      await this.lancamentoService.deleteById(lancamentoBean.idLancamento);
      this.buscarLancamentos();
      this.menssagemService.sucesso("Lançamento removido com sucesso !");
    });
  }

  editar(idLancamento: number) {
    let navigationExtras: NavigationExtras = {
      state: {
        idLancamento: idLancamento,
      },
    };
    this.router.navigate(["/lancamento-form"], navigationExtras);
  }

  filtroEvent(event) {
    const filter = event.target.value;

    if (filter == "") {
      this.filteredLancamentosBean = this._lancamentosBean;
    } else {
      this.filtrar(filter);
    }
  }

  filtrar(filter: string) {
    this.filteredLancamentosBean = this._lancamentosBean;

    filter = filter.toLowerCase();
    this.filteredLancamentosBean = this.filteredLancamentosBean.filter(
      (lancamentoBean) => {
        return (
          lancamentoBean.nomeCliente.toLowerCase().includes(filter) ||
          lancamentoBean.periodo.toLocaleLowerCase().includes(filter)
        );
      }
    );
  }

  getLancamentosPendentes() {
    this.filteredLancamentosBean = this._lancamentosBean.filter(
      (lancamento) => !lancamento.isConcluido
    );
  }

  showLancamentosPendentes(isPendentes: boolean) {
    if (isPendentes) {
      this.getLancamentosPendentes();
    } else {
      this.filteredLancamentosBean = this._lancamentosBean;
    }

    this.isShowPendentes = isPendentes;
  }
}
