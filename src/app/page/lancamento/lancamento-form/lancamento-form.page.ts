import { LancamentoService } from "src/app/service/lancamento/lancamento.service";
import { PeriodoService } from "./../../../service/periodo/periodo.service";
import { ClienteService } from "src/app/service/cliente/cliente.service";

import { Periodo } from "./../../../models/periodo";
import { Lancamento } from "./../../../models/lancamento";
import { Cliente } from "src/app/models/cliente";
import { Item } from "src/app/models/item";

import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
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
  public clienteSelected: Cliente = new Cliente();
  public clientesSelect: Item[];
  public periodos: Periodo[] = [];
  public periodoSelected: Periodo = new Periodo();
  public periodosSelect: Item[];
  public isNewLancamento: boolean;
  public isLancamentoConcluido: boolean = true;
  // public isPagoSn = false;

  constructor(
    private clienteService: ClienteService,
    private periodoService: PeriodoService,
    private lancamentoService: LancamentoService,
    private router: Router,
    private fBuilder: FormBuilder,
    public modalController: ModalController
  ) {
    if (this.router.getCurrentNavigation().extras.state) {
      this.buscarLancamentoCompleto();
      this.isNewLancamento = false;
    } else {
      this.lancamento = new Lancamento();
      this.isNewLancamento = true;
    }

    this.buscarDadosToSelect();
    this.createLancamentoFormGroup();
  }

  ngOnInit() {}

  async atualizar(lancamentoEditado: Lancamento) {
    await this.lancamentoService.update(lancamentoEditado);
  }

  async buscarDadosToSelect() {
    await this.getClientes();
    await this.getPeriodos();
  }

  async buscarLancamentoCompleto() {
    let id = this.router.getCurrentNavigation().extras.state.idLancamento;
    this.lancamento = await this.lancamentoService.getContratoFull(id);
    this.clienteSelected = this.lancamento.cliente;
    this.periodoSelected = this.lancamento.periodo;

    this.createLancamentoFormGroup();
  }

  createLancamentoFormGroup() {
    console.log("createLancamentoFormGroup");

    this.lancamentoGroup = this.fBuilder.group({
      id: [this.lancamento.id],
      cliente: [
        this.clienteSelected.nome,
        Validators.compose([Validators.required]),
      ],
      periodo: [
        this.periodoSelected ? this.periodoSelected.mesAno : "",
        Validators.compose([Validators.required]),
      ],
      valorInss: [this.lancamento.valorInss],
      isPagoInss: [this.lancamento.isPagoInss],
      valorSn: [this.lancamento.valorSn],
      isPagoSn: [this.lancamento.isPagoSn],
      valorIr: [this.lancamento.valorIr],
      isPagoIr: [this.lancamento.isPagoIr],
      valorProl: [this.lancamento.valorProl],
      isPagoProl: [this.lancamento.isPagoProl],
      valorCont: [this.lancamento.valorCont],
      isPagoCont: [this.lancamento.isPagoCont],
      valorRecebido: [this.lancamento.valorRecebido],
    });
  }

  async getClientes() {
    this.clientes = await this.clienteService.findAll();
  }

  async getPeriodos() {
    this.periodos = await this.periodoService.findAll();
  }

  hasValorPago(valor: number, isPago: boolean): boolean {
    var hasValorPago = false;

    if (valor != null && isPago) {
      hasValorPago = true;
    }

    return hasValorPago;
  }

  async salvar(novoLancamento: Lancamento) {
    await this.lancamentoService.save(novoLancamento);
  }

  setIsLancamentoConcluido(lancamento: Lancamento) {
    const {
      valorInss,
      isPagoInss,
      valorSn,
      isPagoSn,
      valorIr,
      isPagoIr,
      valorProl,
      isPagoProl,
      valorCont,
      isPagoCont,
      valorRecebido,
    } = lancamento;

    var hasInssPago = this.hasValorPago(valorInss, isPagoInss);
    var hasSnPago = this.hasValorPago(valorSn, isPagoSn);
    var hasIrPago = this.hasValorPago(valorIr, isPagoIr);
    var hasProlPago = this.hasValorPago(valorProl, isPagoProl);
    var hasContPago = this.hasValorPago(valorCont, isPagoCont);
    var hasRecebido = this.hasValorPago(valorRecebido, true);

    var isConcluidoLancamento =
      hasInssPago &&
      hasSnPago &&
      hasIrPago &&
      hasProlPago &&
      hasContPago &&
      hasRecebido;

    lancamento.isLancamentoConcluido = isConcluidoLancamento;
  }

  submitForm() {
    const lancamento: Lancamento = this.lancamentoGroup.getRawValue() as Lancamento;
    lancamento.cliente = this.clienteSelected;
    lancamento.periodo = this.periodoSelected;
    this.setIsLancamentoConcluido(lancamento);

    if (!this.lancamento.id) {
      this.salvar(lancamento);
    } else {
      this.atualizar(lancamento);
    }

    this.router.navigate(["/lancamento-view"]);
  }

  //Select  Cliente
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

  //Select  Periodo
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
}
