import { Component, OnInit } from "@angular/core";
import { Cliente } from "src/app/models/cliente";
import { Router, NavigationExtras } from "@angular/router";
import { ClienteService } from "src/app/service/cliente/cliente.service";

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
    // public sessionService: SessionService,
    private router: Router // private menssagemService: MenssagemService
  ) {}

  ngOnInit() {}

  ionViewDidEnter() {
    this.buscarClientes();
  }

  adicionarCliente() {
    let navigationExtras: NavigationExtras = {
      state: {
        lastId: this._clientes.length,
      },
    };
    this.router.navigate(["/cliente-form"], navigationExtras);

    // this.router.navigate(["/cliente-form"]);
  }

  async buscarClientes() {
    this._clientes = await this.clienteService.findAll();

    this.filtrar(this._filterBy);
  }

  deletar(cliente: Cliente) {
    // let mensagem = "Deseja excluir o cliente '" + cliente.nome + "' ?";
    // this.menssagemService.confirmar(mensagem, async () => {
    //   await this.clienteService.deleteById(cliente.id);
    //   this.buscarClientes();
    //   this.menssagemService.sucesso("Cliente removido com sucesso !");
    // });
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
    const val = event.target.value;
    this._filterBy = val;
    this.filtrar(val);
  }

  filtrar(val: string) {
    this.filteredCliente = this._clientes;

    if (val && val.trim() != "") {
      val = val.toLowerCase();
      this.filteredCliente = this.filteredCliente.filter((value) => {
        return value.nome.toLowerCase().includes(val);
        // value.estadoCurrent.toLowerCase().includes(val)
      });
    } else if (val == "") {
      this.filteredCliente = this._clientes;
    }
  }
}
