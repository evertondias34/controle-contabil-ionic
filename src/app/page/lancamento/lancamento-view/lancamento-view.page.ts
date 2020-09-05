import { Lancamento } from "./../../../models/lancamento";
import { Component, OnInit } from "@angular/core";
import { Router, NavigationExtras } from "@angular/router";
import { MenssagemService } from "src/app/service/menssagem/menssagem.service";
import { LancamentoService } from "src/app/service/lancamento/lancamento.service";

@Component({
  selector: "app-lancamento-view",
  templateUrl: "./lancamento-view.page.html",
  styleUrls: ["./lancamento-view.page.scss"],
})
export class LancamentoViewPage implements OnInit {
  filteredLancamentos: Lancamento[] = [];
  _lancamentos: Lancamento[] = [];

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
    // this._lancamentos = await this.lancamentoService.findAll();
    this.filteredLancamentos = this._lancamentos;
  }

  deletar(lancamento: Lancamento) {
    let mensagem =
      "Deseja excluir o lancamento do'" +
      lancamento.cliente.nome +
      " -" +
      lancamento.periodo.mesAno +
      "'  ?";
    this.menssagemService.confirmar(mensagem, async () => {
      // await this.lancamentoService.delete(lancamento);
      this.buscarLancamentos();
      this.menssagemService.sucesso("Lançamento removido com sucesso !");
    });
  }

  editar(lancamento: Lancamento) {
    let navigationExtras: NavigationExtras = {
      state: {
        lancamento: lancamento,
      },
    };
    this.router.navigate(["/lancamento-form"], navigationExtras);
  }

  filtroEvent(event) {
    const filter = event.target.value;

    if (filter == "") {
      this.filteredLancamentos = this._lancamentos;
    } else {
      this.filtrar(filter);
    }
  }

  filtrar(filter: string) {
    this.filteredLancamentos = this._lancamentos;

    filter = filter.toLowerCase();
    this.filteredLancamentos = this.filteredLancamentos.filter((lancamento) => {
      return (
        lancamento.cliente.nome.toLowerCase().includes(filter) ||
        lancamento.periodo.mesAno.toLocaleLowerCase().includes(filter)
      );
    });
  }
}
