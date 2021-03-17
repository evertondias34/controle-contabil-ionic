import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PeriodoViewPage } from './periodo-view.page';

const routes: Routes = [
  {
    path: '',
    component: PeriodoViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PeriodoViewPageRoutingModule {}
