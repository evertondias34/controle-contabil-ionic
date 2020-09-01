import { Component, OnInit } from "@angular/core";
import { Periodo } from "src/app/models/periodo";
import { PeriodoFormModalComponent } from "src/app/components/periodo-form-modal/periodo-form-modal.component";
import { ModalController } from "@ionic/angular";
import { PeriodoService } from "src/app/service/periodo/periodo.service";

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
    public modalController: ModalController
  ) {}

  ngOnInit() {}

  ionViewDidEnter() {
    this.buscarPeriodos();
  }

  async adicionarPeriodo() {
    const modal = await this.modalController.create({
      component: PeriodoFormModalComponent,
      componentProps: {
        periodo: "",
      },
    });

    modal.onDidDismiss().then((detail: any) => {
      if (detail.data) {
        let novoPeriodo = new Periodo();
        novoPeriodo.mesAno = detail.data;

        console.log(novoPeriodo);
        // this.getEstadoSelected(detail.data);
      }
    });

    return await modal.present();
  }

  async buscarPeriodos() {
    // this._periodos = await this.periodoService.findAll();

    this.filtrar(this._filterBy);
  }

  deletar(perido: Periodo) {
    // let mensagem = "Deseja excluir o cliente '" + cliente.nome + "' ?";
    // this.menssagemService.confirmar(mensagem, async () => {
    //   await this.clienteService.deleteById(cliente.id);
    //   this.buscarClientes();
    //   this.menssagemService.sucesso("Cliente removido com sucesso !");
    // });
  }

  editar() {}

  filtroEvent(event) {
    const val = event.target.value;
    this._filterBy = val;

    if (!this._filterBy || this._filterBy == "") {
      this.filteredPeriodos = this._periodos;
    } else {
      this.filtrar(this._filterBy);
    }
  }

  filtrar(val: string) {
    this.filteredPeriodos = this._periodos;

    val = val.toLowerCase();
    this.filteredPeriodos = this.filteredPeriodos.filter((value) => {
      return value.mesAno.toLowerCase().includes(val);
    });
  }
}
