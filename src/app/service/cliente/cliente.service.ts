import { Injectable } from "@angular/core";
import { Cliente } from "../../models/cliente";

import { Plugins, Capacitor, FilesystemDirectory } from "@capacitor/core";
import { promisify } from "util";
import { Platform } from "@ionic/angular";

const { Filesystem, Storage } = Plugins;

@Injectable({
  providedIn: "root",
})
export class ClienteService {
  private CLIENTE_STORAGE: string = "clientes";
  private clientes: Cliente[] = [];
  private platform: Platform;

  constructor(platform: Platform) {
    this.platform = platform;
  }

  async findAll(): Promise<Cliente[]> {
    try {
      const clientesJson = await Storage.get({ key: this.CLIENTE_STORAGE });
      this.clientes = JSON.parse(clientesJson.value) || [];

      // this.clientes = [...clientesJson.value];

      console.log("passou " + clientesJson.value);

      return this.clientes;
    } catch (error) {
      console.log(" deu zebra " + error);
    }

    // return this.redeService.get<Cliente[]>("cliente/findAll");
  }

  async update(cliente: Cliente): Promise<any> {
    try {
      console.log(this.clientes);

      this.clientes.push(cliente);

      console.log(this.clientes);

      Storage.set({
        key: this.CLIENTE_STORAGE,
        value: this.platform.is("hybrid")
          ? JSON.stringify(this.clientes)
          : JSON.stringify(
              this.clientes.map((p) => {
                // Don't save the base64 representation of the photo data,
                // since it's already saved on the Filesystem
                const clienteCopy = { ...p };
                // delete photoCopy.base64;

                return clienteCopy;
              })
            ),
      });

      // await Filesystem.writeFile({
      //   path:
      //   data: clienteSalvo,
      //   directory: FilesystemDirectory.Data,
      // });
      // let clienteSalvo = JSON.stringify(cliente);
      // await Storage.set({
      //   key: this.CLIENTE_STORAGE,
      //   value: clienteSalvo,
      // });
    } catch (error) {
      console.log("Não salvou " + error);
    }
    // return this.storage.set(key, contact);
  }

  // return this.storage.set(key, contact);
  // this.fotos = JSON.parse(photos.value) || [];
}
