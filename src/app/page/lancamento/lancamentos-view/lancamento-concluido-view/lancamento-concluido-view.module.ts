import { PipeModule } from "src/app/pipes/pipe.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { LancamentoConcluidoViewPageRoutingModule } from "./lancamento-concluido-view-routing.module";

import { LancamentoConcluidoViewPage } from "./lancamento-concluido-view.page";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipeModule,
    LancamentoConcluidoViewPageRoutingModule,
  ],
  declarations: [LancamentoConcluidoViewPage],
})
export class LancamentoConcluidoViewPageModule {}
