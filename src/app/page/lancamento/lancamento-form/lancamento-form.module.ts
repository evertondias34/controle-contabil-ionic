import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { LancamentoFormPageRoutingModule } from "./lancamento-form-routing.module";

import { LancamentoFormPage } from "./lancamento-form.page";
import { SelectModalComponentModule } from "src/app/components/select-modal/select-modal.component.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LancamentoFormPageRoutingModule,
    ReactiveFormsModule,
    SelectModalComponentModule,
  ],
  declarations: [LancamentoFormPage],
})
export class LancamentoFormPageModule {}
