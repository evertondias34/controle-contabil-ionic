import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LancamentoConcluidoViewPage } from './lancamento-concluido-view.page';

const routes: Routes = [
  {
    path: '',
    component: LancamentoConcluidoViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LancamentoConcluidoViewPageRoutingModule {}
