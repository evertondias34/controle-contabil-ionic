import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LancamentoViewPage } from './lancamento-view.page';

const routes: Routes = [
  {
    path: '',
    component: LancamentoViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LancamentoViewPageRoutingModule {}
