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
    path: 'periodo-view',
    loadChildren: () => import('./page/periodo-view/periodo-view.module').then( m => m.PeriodoViewPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
