import { LancamentoService } from "src/app/service/lancamento/lancamento.service";
import { Injectable } from "@angular/core";
import { Cliente } from "../../models/cliente";

import { Plugins } from "@capacitor/core";
import { Platform } from "@ionic/angular";
import { Dados } from "src/app/models/dados";
import { MenssagemService } from "../menssagem/menssagem.service";

const { Storage } = Plugins;

@Injectable({
  providedIn: "root",
})
export class ClienteService {
  private CLIENTE_STORAGE: string = "clientes";
  private idCurrent: number = 0;
  private clientes: Cliente[] = [];
  private platform: Platform;

  constructor(
    platform: Platform,
    private menssagemService: MenssagemService,
    private lancamentoService: LancamentoService
  ) {
    this.platform = platform;
  }

  async deleteById(id: number): Promise<any> {
    try {
      this.clientes = await this.clientes.filter(
        (cliente) => cliente.id !== id
      );
      var dadosClientes = this.createDadosCliente();

      this.setClientesStorage(dadosClientes);
    } catch (error) {
      this.menssagemService.error("Falha ao deletar Cliente!");
      console.error("DeleteById failed " + error);
    }
  }

  async delete(cliente: Cliente): Promise<any> {
    try {
      cliente.isAtivo = false;
      this.refresh(cliente);
      var dadosClientes = this.createDadosCliente();

      this.setClientesStorage(dadosClientes);
    } catch (error) {
      this.menssagemService.error("Falha ao deletar cliente!");
      console.error("Delete failed " + error);
    }
  }

  async findAll(): Promise<Cliente[]> {
    try {
      const clientesJson = await Storage.get({ key: this.CLIENTE_STORAGE });
      var dadosClientes = JSON.parse(clientesJson.value);

      if (dadosClientes) {
        const { lastId, values } = dadosClientes[0];
        this.idCurrent = lastId;
        this.clientes = values;
      }

      return this.getClientesAtivos();
    } catch (error) {
      this.menssagemService.error("Falha ao buscar Clientes!");
      console.error("FindAll failed " + error);
    }
  }

  async save(cliente: Cliente): Promise<any> {
    try {
      this.addNovo(cliente);
      var dadosClientes = this.createDadosCliente();

      this.setClientesStorage(dadosClientes);
    } catch (error) {
      this.menssagemService.error("Falha ao salvar cliente!");
      console.error("Save failed " + error);
    }
  }

  async update(cliente: Cliente): Promise<any> {
    try {
      this.refresh(cliente);
      var dadosClientes = this.createDadosCliente();

      this.setClientesStorage(dadosClientes);

      this.lancamentoService.updateCliente(cliente);
    } catch (error) {
      this.menssagemService.error("Falha ao atualizar cliente!");
      console.error("Update failed " + error);
    }
  }

  private addNovo(novoCliente: Cliente) {
    novoCliente.id = ++this.idCurrent;
    novoCliente.isAtivo = true;
    this.clientes.push(novoCliente);
  }

  private createDadosCliente(): Dados {
    var dadosClientes = new Dados();
    dadosClientes.lastId = this.idCurrent;
    dadosClientes.values = this.clientes;

    return dadosClientes;
  }

  private getClientesAtivos(): Cliente[] {
    var clientesAtivos: Cliente[] = this.clientes.filter(
      (cliente) => cliente.isAtivo
    );

    return clientesAtivos;
  }

  private refresh(clienteEditado: Cliente) {
    const indexEditado = this.clientes.findIndex(({ id }) => {
      return id === clienteEditado.id;
    });

    this.clientes[indexEditado] = clienteEditado;
  }

  private async setClientesStorage(allClientes: Dados) {
    var clientesDados = [allClientes];

    Storage.set({
      key: this.CLIENTE_STORAGE,
      value: this.platform.is("hybrid")
        ? JSON.stringify(clientesDados)
        : JSON.stringify(
            clientesDados.map((dados) => {
              const cliente = { ...dados };
              return cliente;
            })
          ),
    });
  }
}
