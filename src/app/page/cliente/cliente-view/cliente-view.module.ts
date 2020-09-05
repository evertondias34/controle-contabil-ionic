import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { ClienteViewPageRoutingModule } from "./cliente-view-routing.module";

import { ClienteViewPage } from "./cliente-view.page";
import { PipeModule } from "src/app/pipes/pipe.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipeModule,
    ClienteViewPageRoutingModule,
  ],
  declarations: [ClienteViewPage],
})
export class ClienteViewPageModule {}
