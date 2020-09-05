import { PeriodoService } from "./../../../service/periodo/periodo.service";
import { Periodo } from "./../../../models/periodo";
import { Lancamento } from "./../../../models/lancamento";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Cliente } from "src/app/models/cliente";
import { Item } from "src/app/models/item";
import { ClienteService } from "src/app/service/cliente/cliente.service";
import { Router } from "@angular/router";
import { ModalController } from "@ionic/angular";
import { SelectModalComponent } from "src/app/components/select-modal/select-modal.component";

@Component({
  selector: "app-lancamento-form",
  templateUrl: "./lancamento-form.page.html",
  styleUrls: ["./lancamento-form.page.scss"],
})
export class LancamentoFormPage implements OnInit {
  public lancamentoGroup: FormGroup;
  public lancamento: Lancamento = new Lancamento();
  public clientes: Cliente[] = [];
  public clienteSelected: Cliente;
  public clientesSelect: Item[];
  public periodos: Periodo[] = [];
  public periodoSelected: Periodo;
  public periodosSelect: Item[];
  public isNewLancamento;

  constructor(
    private clienteService: ClienteService,
    private periodoService: PeriodoService,
    private router: Router,
    private fBuilder: FormBuilder,
    public modalController: ModalController
  ) {
    if (this.router.getCurrentNavigation().extras.state) {
      // this.lancamento = this.router.getCurrentNavigation().extras.state.lancamento;
      // this.clienteSelected = this.lancamento.cliente;
      // this.periodoSelected = this.lancamento.periodo;
      this.buscarLancamentoCompleto();
      this.isNewLancamento = false;
    } else {
      this.lancamento = new Lancamento();
      this.clienteSelected = new Cliente();
      this.periodoSelected = new Periodo();
      this.isNewLancamento = true;
    }

    this.buscarDadosToSelect();
    this.createLancamentoFormGroup();
  }

  ngOnInit() {}

  async buscarDadosToSelect() {
    await this.getClientes();
    await this.getPeriodos();
  }

  createLancamentoFormGroup() {
    this.lancamentoGroup = this.fBuilder.group({
      id: [this.lancamento.id],
      cliente: [
        this.clienteSelected.nome,
        Validators.compose([Validators.required]),
      ],
      periodo: [
        this.periodoSelected.mesAno,
        Validators.compose([Validators.required]),
      ],
    });

    // this.contratoGroup.markAllAsTouched();
  }

  async buscarLancamentoCompleto() {
    let idLancamento = this.router.getCurrentNavigation().extras.state
      .idLancamento;
    // this.lancamento = await lancamentoService.getContratoFull(idLancamento);
    this.clienteSelected = this.lancamento.cliente;
    this.periodoSelected = this.lancamento.periodo;

    this.createLancamentoFormGroup();
  }

  async getClientes() {
    this.clientes = await this.clienteService.findAll();
  }

  async getPeriodos() {
    this.periodos = await this.periodoService.findAll();
  }

  submitForm() {
    // const contratoEditado: any = this.contratoGroup.getRawValue();
    // contratoEditado.id = this.contrato.id;
    // contratoEditado.cliente = this.clienteSelected;
    // let emailsEditados = Array.of(contratoEditado.emails);
    // contratoEditado.responsaveisEmail = emailsEditados.join(",");
    // console.log(contratoEditado);
    // this.setValoresFaturamentos(contratoEditado);
    // console.log(contratoEditado);
    // this.salvar(contratoEditado);
  }

  async selectCliente() {
    this.createItensCliente();

    const modal = await this.modalController.create({
      component: SelectModalComponent,
      componentProps: {
        listItens: this.clientesSelect,
        tipoItem: "Selecionar Cliente",
        isSelectMultiples: false,
      },
    });

    modal.onDidDismiss().then((detail: any) => {
      if (detail.data) {
        this.getClienteSelected(detail.data);
      }
    });

    return await modal.present();
  }

  createItensCliente() {
    this.clientesSelect = [];
    this.clientes.forEach((cliente) => {
      let novoItem = new Item();
      novoItem.id = cliente.id;
      novoItem.nome = cliente.nome;
      novoItem.isChecked = false;
      if (cliente === this.clienteSelected) {
        novoItem.isChecked = true;
      }

      this.clientesSelect.push(novoItem);
    });
  }

  getClienteSelected(clienteItem: Item) {
    this.clienteSelected = this.clientes.filter((cliente) => {
      return clienteItem.id === cliente.id;
    })[0];
  }

  async selectPeriodo() {
    this.createItensPeriodo();

    const modal = await this.modalController.create({
      component: SelectModalComponent,
      componentProps: {
        listItens: this.periodosSelect,
        tipoItem: "Selecionar Período",
        isSelectMultiples: false,
      },
    });

    modal.onDidDismiss().then((detail: any) => {
      if (detail.data) {
        this.getPeriodosSelected(detail.data);
      }
    });

    return await modal.present();
  }

  createItensPeriodo() {
    this.periodosSelect = [];
    this.periodos.forEach((periodo) => {
      let novoItem = new Item();
      novoItem.id = periodo.id;
      novoItem.nome = periodo.mesAno;
      novoItem.isChecked = false;
      if (periodo === this.periodoSelected) {
        novoItem.isChecked = true;
      }

      this.periodosSelect.push(novoItem);
    });
  }

  getPeriodosSelected(periodoItem: Item) {
    this.periodoSelected = this.periodos.filter((periodo) => {
      return periodoItem.id === periodo.id;
    })[0];
  }
}
