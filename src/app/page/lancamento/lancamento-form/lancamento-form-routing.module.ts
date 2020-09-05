import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LancamentoFormPage } from './lancamento-form.page';

const routes: Routes = [
  {
    path: '',
    component: LancamentoFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LancamentoFormPageRoutingModule {}
