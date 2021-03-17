import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { PeriodoViewPageRoutingModule } from "./periodo-view-routing.module";

import { PeriodoViewPage } from "./periodo-view.page";
import { PeriodoFormModalModule } from "src/app/components/periodo-form-modal/periodo-form-modal.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PeriodoViewPageRoutingModule,
    PeriodoFormModalModule,
  ],
  declarations: [PeriodoViewPage],
})
export class PeriodoViewPageModule {}
