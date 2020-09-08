import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    redirectTo: "cliente-view",
    pathMatch: "full",
  },
  {
    path: "cliente-view",
    loadChildren: () =>
      import("./page/cliente/cliente-view/cliente-view.module").then(
        (m) => m.ClienteViewPageModule
      ),
  },
  {
    path: "cliente-form",
    loadChildren: () =>
      import("./page/cliente/cliente-form/cliente-form.module").then(
        (m) => m.ClienteFormPageModule
      ),
  },
  {
    path: "periodo-view",
    loadChildren: () =>
      import("./page/periodo-view/periodo-view.module").then(
        (m) => m.PeriodoViewPageModule
      ),
  },
  {
    path: "lancamento-view",
    loadChildren: () =>
      import(
        "./page/lancamento/lancamentos-view/lancamento-view/lancamento-view.module"
      ).then((m) => m.LancamentoViewPageModule),
  },
  {
    path: "lancamento-form",
    loadChildren: () =>
      import("./page/lancamento/lancamento-form/lancamento-form.module").then(
        (m) => m.LancamentoFormPageModule
      ),
  },
  {
    path: "lancamento-concluido-view",
    loadChildren: () =>
      import(
        "./page/lancamento/lancamentos-view/lancamento-concluido-view/lancamento-concluido-view.module"
      ).then((m) => m.LancamentoConcluidoViewPageModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
