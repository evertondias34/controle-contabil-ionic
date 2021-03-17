import { Component, OnInit } from "@angular/core";
import { NavParams, ModalController } from "@ionic/angular";
import { Item } from "src/app/models/item";

@Component({
  selector: "app-select-modal",
  templateUrl: "./select-modal.component.html",
  styleUrls: ["./select-modal.component.scss"],
})
export class SelectModalComponent {
  allItens: Item[] = [];
  itensSelected: Item[] = [];
  filterdItens: Item[] = [];
  tipoItem: string;
  isSelectMultiples: boolean;

  constructor(
    private navParams: NavParams,
    private modalController: ModalController
  ) {
    this.allItens = this.navParams.get("listItens");
    this.tipoItem = this.navParams.get("tipoItem");
    this.isSelectMultiples = this.navParams.get("isSelectMultiples");

    this.init();
  }

  filtroEvent(event) {
    const val = event.target.value;

    if (val && val.trim() != "") {
      this.filtrar(val.toLowerCase());
    } else {
      this.filterdItens = this.allItens;
    }
  }

  filtrar(val: string) {
    this.filterdItens = this.allItens;

    this.filterdItens = this.filterdItens.filter((value) => {
      return value.nome.toLowerCase().includes(val);
    });
  }

  init() {
    this.allItens.sort((a, b) => {
      return Number(b.isChecked) - Number(a.isChecked);
    });

    if (this.isSelectMultiples) {
      this.itensSelected = this.allItens.filter((item) => item.isChecked);
    }

    this.filterdItens = this.allItens;
  }

  cancelar() {
    this.modalController.dismiss();
  }

  salvar(itemSelected) {
    if (this.isSelectMultiples) {
      this.modalController.dismiss(this.itensSelected);
    } else {
      this.modalController.dismiss(itemSelected);
    }
  }

  selectItem(item: Item) {
    if (this.isSelectMultiples) {
      item.isChecked = !item.isChecked;
      if (!item.isChecked) {
        this.removeItem(item);
      } else {
        this.itensSelected.push(item);
      }
    } else {
      this.salvar(item);
    }
  }

  removeItem(itemCurrent: Item) {
    if (this.itensSelected.includes(itemCurrent)) {
      this.itensSelected = this.itensSelected.filter((item) => {
        return item !== itemCurrent;
      });
    }
  }
}
