import { Component, OnInit } from "@angular/core";
import { Cliente } from "src/app/models/cliente";
import { Router, NavigationExtras } from "@angular/router";
import { ClienteService } from "src/app/service/cliente/cliente.service";
import { MenssagemService } from "src/app/service/menssagem/menssagem.service";

@Component({
  selector: "app-cliente-view",
  templateUrl: "./cliente-view.page.html",
  styleUrls: ["./cliente-view.page.scss"],
})
export class ClienteViewPage implements OnInit {
  filteredCliente: Cliente[] = [];
  _clientes: Cliente[] = [];
  _filterBy: string;
  estados: String;

  constructor(
    public clienteService: ClienteService,
    private router: Router,
    private menssagemService: MenssagemService
  ) {}

  ngOnInit() {}

  ionViewDidEnter() {
    this.buscarClientes();
  }

  adicionarCliente() {
    this.router.navigate(["/cliente-form"]);
  }

  async buscarClientes() {
    this._clientes = await this.clienteService.findAll();
    this.filteredCliente = this._clientes;
  }

  deletar(cliente: Cliente) {
    let mensagem = "Deseja excluir o cliente '" + cliente.nome + "' ?";
    this.menssagemService.confirmar(mensagem, async () => {
      await this.clienteService.delete(cliente);
      this.buscarClientes();
      this.menssagemService.sucesso("Cliente removido com sucesso !");
    });
  }

  editar(cliente: Cliente) {
    let navigationExtras: NavigationExtras = {
      state: {
        cliente: cliente,
      },
    };
    this.router.navigate(["/cliente-form"], navigationExtras);
  }

  filtroEvent(event) {
    const filter = event.target.value;
    this._filterBy = filter;

    if (filter == "") {
      this.filteredCliente = this._clientes;
    } else {
      this.filtrar(filter);
    }
  }

  filtrar(filter: string) {
    this.filteredCliente = this._clientes;

    filter = filter.toLowerCase();
    this.filteredCliente = this.filteredCliente.filter((cliente) => {
      return cliente.nome.toLowerCase().includes(filter);
    });
  }
}
