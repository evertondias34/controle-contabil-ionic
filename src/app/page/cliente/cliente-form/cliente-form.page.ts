import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { Cliente } from "src/app/models/cliente";
// import { ClienteService } from "src/app/service/cliente/cliente.service";
import { ModalController } from "@ionic/angular";
import { Item } from "src/app/models/item";
import { ClienteService } from "src/app/service/cliente/cliente.service";

@Component({
  selector: "app-cliente-form",
  templateUrl: "./cliente-form.page.html",
  styleUrls: ["./cliente-form.page.scss"],
})
export class ClienteFormPage implements OnInit {
  public clienteGroup: FormGroup;
  public cliente: Cliente = new Cliente();

  constructor(
    public clienteService: ClienteService,
    private router: Router,
    private fBuilder: FormBuilder,
    public modalController: ModalController
  ) {
    if (this.router.getCurrentNavigation().extras.state) {
      this.cliente = this.router.getCurrentNavigation().extras.state.cliente;
    } else {
      this.cliente = new Cliente();
    }

    this.createClienteFormGroup();
  }

  ngOnInit() {}

  async atualizar(clienteEditado: Cliente) {
    await this.clienteService.update(clienteEditado);
  }

  createClienteFormGroup() {
    this.clienteGroup = this.fBuilder.group({
      nome: [
        this.cliente.nome,
        Validators.compose([Validators.required, Validators.minLength(2)]),
      ],
      telefone: [
        this.cliente.telefone,
        Validators.compose([
          Validators.required,
          // Validators.pattern(/^(?:\()[0-9]{2}(?:\))\s?[0-9]{5}(?:-)[0-9]{4}$/g),
          // Validators.pattern(/^[0-9]{2}\s?[0-9]{5}\s[0-9]{4}$/g),
          Validators.pattern(/^[0-9]{12}$/g),
          Validators.maxLength(15),
        ]),
      ],
    });

    this.clienteGroup.markAllAsTouched();
  }

  async salvar(clienteSalvo: Cliente) {
    await this.clienteService.save(clienteSalvo);
  }

  submitForm() {
    const clienteCurrent = this.clienteGroup.getRawValue();
    clienteCurrent.id = this.cliente.id;
    clienteCurrent.isAtivo = true;

    if (!this.cliente.id) {
      this.salvar(clienteCurrent);
    } else {
      this.atualizar(clienteCurrent);
    }

    this.router.navigate(["/cliente-view"]);
  }
}
