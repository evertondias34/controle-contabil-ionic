import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { ClienteFormPageRoutingModule } from "./cliente-form-routing.module";
import { ClienteFormPage } from "./cliente-form.page";
import { SelectModalComponentModule } from "src/app/components/select-modal/select-modal.component.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ClienteFormPageRoutingModule,
    SelectModalComponentModule,
  ],
  declarations: [ClienteFormPage],
})
export class ClienteFormPageModule {}
