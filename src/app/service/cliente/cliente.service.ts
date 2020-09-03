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

  async save(cliente: Cliente): Promise<any> {
    try {
      cliente.id = ++this.idCurrent;
      this.clientes.push(cliente);

      var dadosClientes = this.createDadosCliente();

      this.setClientesStorage(dadosClientes);
    } catch (error) {
      console.log("Save " + error);
    }
  }

  private createDadosCliente(): Dados {
    var dadosClientes = new Dados();
    dadosClientes.nextId = this.idCurrent;
    dadosClientes.dados = this.clientes;

    return dadosClientes;
  }

  private async setClientesStorage(allClientes: Dados) {
    var clientesDados = [allClientes];

    // console.log(teste);

    // try {
    Storage.set({
      key: this.CLIENTE_STORAGE,
      value: this.platform.is("hybrid")
        ? JSON.stringify(clientesDados)
        : JSON.stringify(
            // allClientes
            clientesDados.map((p) => {
              const clienteCopy = { ...p };
              return clienteCopy;
            })
          ),
    });
  }

  async update(cliente: Cliente): Promise<any> {
    try {
      const indexEditado = this.clientes.findIndex(({ id }) => {
        return id === cliente.id;
      });

      this.clientes[indexEditado] = cliente;

      var dadosClientes = this.createDadosCliente();

      this.setClientesStorage(dadosClientes);
    } catch (error) {
      console.log("Não salvou " + error);
    }
  }
}
