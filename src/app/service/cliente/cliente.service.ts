import { Injectable } from "@angular/core";
import { Cliente } from "../../models/cliente";

import {
  Plugins,
  Capacitor,
  FilesystemDirectory,
  ClipboardPluginWeb,
} from "@capacitor/core";
import { promisify } from "util";
import { Platform } from "@ionic/angular";
import { Dados } from "src/app/models/dados";

const { Filesystem, Storage } = Plugins;

@Injectable({
  providedIn: "root",
})
export class ClienteService {
  private CLIENTE_STORAGE: string = "clientes";
  private idCurrent: number = 0;
  private clientes: Cliente[] = [];
  private platform: Platform;

  constructor(platform: Platform) {
    this.platform = platform;
  }

  async findAll(): Promise<Cliente[]> {
    try {
      const clientesJson = await Storage.get({ key: this.CLIENTE_STORAGE });

      var dadosClientes = JSON.parse(clientesJson.value)[0];

      console.log(dadosClientes);

      if (dadosClientes) {
        const { nextId, dados } = dadosClientes;
        this.idCurrent = nextId;
        this.clientes = dados;
      }

      return this.clientes;
    } catch (error) {
      console.log("FindAll " + error);
    }
  }

  async deleteById(id: number): Promise<any> {
    try {
      this.clientes = await this.clientes.filter(
        (cliente) => cliente.id !== id
      );
      var dadosClientes = this.createDadosCliente();

      this.setClientesStorage(dadosClientes);
    } catch (error) {
      console.log("Não salvou " + error);
    }

    // return this.redeService.delete<any>("cliente/delete/?id=" + id);
  }

  async delete(cliente: Cliente): Promise<any> {
    try {
      cliente.isAtivo = false;
      this.refresh(cliente);
      var dadosClientes = this.createDadosCliente();

      this.setClientesStorage(dadosClientes);
    } catch (error) {
      console.log("Não salvou " + error);
    }
  }

  async save(cliente: Cliente): Promise<any> {
    try {
      this.addNovo(cliente);
      var dadosClientes = this.createDadosCliente();

      this.setClientesStorage(dadosClientes);
    } catch (error) {
      console.log("Save " + error);
    }
  }

  async update(cliente: Cliente): Promise<any> {
    try {
      var dadosClientes = this.createDadosCliente();
      this.refresh(cliente);

      this.setClientesStorage(dadosClientes);
    } catch (error) {
      console.log("Não salvou " + error);
    }
  }

  private addNovo(novoCliente: Cliente) {
    novoCliente.id = ++this.idCurrent;
    this.clientes.push(novoCliente);
  }

  private createDadosCliente(): Dados {
    var dadosClientes = new Dados();
    dadosClientes.nextId = this.idCurrent;
    dadosClientes.dados = this.clientes;

    return dadosClientes;
  }

  private async setClientesStorage(allClientes: Dados) {
    var clientesDados = [allClientes];

    Storage.set({
      key: this.CLIENTE_STORAGE,
      value: this.platform.is("hybrid")
        ? JSON.stringify(clientesDados)
        : JSON.stringify(
            clientesDados.map((dados) => {
              const clienteCopy = { ...dados };
              return clienteCopy;
            })
          ),
    });
  }

  private refresh(clienteEditado: Cliente) {
    const indexEditado = this.clientes.findIndex(({ id }) => {
      return id === clienteEditado.id;
    });

    this.clientes[indexEditado] = clienteEditado;
  }
}
