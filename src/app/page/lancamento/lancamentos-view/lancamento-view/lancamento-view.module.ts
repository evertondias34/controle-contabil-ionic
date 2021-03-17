import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LancamentoViewPageRoutingModule } from './lancamento-view-routing.module';

import { LancamentoViewPage } from './lancamento-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LancamentoViewPageRoutingModule
  ],
  declarations: [LancamentoViewPage]
})
export class LancamentoViewPageModule {}
