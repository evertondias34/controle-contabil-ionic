import { Periodo } from "./../../models/periodo";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ModalController, NavParams } from "@ionic/angular";

@Component({
  selector: "app-periodo-form-modal",
  templateUrl: "./periodo-form-modal.component.html",
  styleUrls: ["./periodo-form-modal.component.scss"],
})
export class PeriodoFormModalComponent implements OnInit {
  public periodoGroup: FormGroup;
  public periodo: string;

  constructor(
    private navParams: NavParams,
    private fBuilder: FormBuilder,
    public modalController: ModalController
  ) {
    this.periodo = this.navParams.get("periodo");
  }

  ngOnInit() {
    this.periodoGroup = this.fBuilder.group({
      nomePeriodo: [
        this.periodo,
        Validators.compose([
          Validators.required,
          Validators.pattern(/^[a-z, A-Z]{3}(?:-)[0-9]{4}$/g),
        ]),
      ],
    });
  }

  cancelar() {
    this.modalController.dismiss();
  }

  salvar() {
    this.periodo = this.periodoGroup.getRawValue();

    console.log(this.periodo);

    this.modalController.dismiss(this.periodo);
  }
}
