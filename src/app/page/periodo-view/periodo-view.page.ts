import { Periodo } from "./../../models/periodo";
import { Component, OnInit } from "@angular/core";
import { PeriodoFormModalComponent } from "src/app/components/periodo-form-modal/periodo-form-modal.component";
import { ModalController } from "@ionic/angular";
import { PeriodoService } from "src/app/service/periodo/periodo.service";
import { MenssagemService } from "src/app/service/menssagem/menssagem.service";

@Component({
  selector: "app-periodo-view",
  templateUrl: "./periodo-view.page.html",
  styleUrls: ["./periodo-view.page.scss"],
})
export class PeriodoViewPage implements OnInit {
  filteredPeriodos: Periodo[] = [];
  _periodos: Periodo[] = [];
  _filterBy: string = "";
  constructor(
    public periodoService: PeriodoService,
    public modalController: ModalController,
    private menssagemService: MenssagemService
  ) {}

  ngOnInit() {}

  ionViewDidEnter() {
    this.buscarPeriodos();
  }

  adicionarPeriodo() {
    let novoPeriodo = new Periodo();
    novoPeriodo.mesAno = "";
    this.formPeriodo(novoPeriodo);
  }

  async atualizar(periodoEditado: Periodo) {
    await this.periodoService.update(periodoEditado);
  }

  async buscarPeriodos() {
    this._periodos = await this.periodoService.findAll();
    this.filteredPeriodos = this._periodos;
  }

  deletar(periodo: Periodo) {
    let mensagem = "Deseja excluir o período '" + periodo.mesAno + "' ?";
    this.menssagemService.confirmar(mensagem, async () => {
      await this.periodoService.delete(periodo);
      this.buscarPeriodos();
      this.menssagemService.sucesso("Período removido com sucesso !");
    });
  }

  editar(periodoEditado: Periodo) {
    this.formPeriodo(periodoEditado);
  }

  filtroEvent(event) {
    const filter = event.target.value;

    if (filter == "") {
      this.filteredPeriodos = this._periodos;
    } else {
      this.filtrar(filter);
    }
  }

  filtrar(filter: string) {
    this.filteredPeriodos = this._periodos;

    filter = filter.toLowerCase();
    this.filteredPeriodos = this.filteredPeriodos.filter((periodo) => {
      return periodo.mesAno.toLowerCase().includes(filter);
    });
  }

  async formPeriodo(periodo: Periodo) {
    const modal = await this.modalController.create({
      component: PeriodoFormModalComponent,
      componentProps: {
        periodo: periodo.mesAno,
      },
    });

    modal.onDidDismiss().then((detail: any) => {
      if (detail.data) {
        periodo.mesAno = detail.data;

        this.submitForm(periodo);
      }
    });

    return await modal.present();
  }

  async salvar(novoPeriodo: Periodo) {
    await this.periodoService.save(novoPeriodo);
  }

  submitForm(periodo: Periodo) {
    if (!periodo.id) {
      this.salvar(periodo);
    } else {
      this.atualizar(periodo);
    }

    this.buscarPeriodos();
  }
}
