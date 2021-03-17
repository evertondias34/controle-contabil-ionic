import { PeriodoFormModalComponent } from "src/app/components/periodo-form-modal/periodo-form-modal.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";

@NgModule({
  declarations: [PeriodoFormModalComponent],
  imports: [CommonModule, FormsModule, IonicModule, ReactiveFormsModule],
  exports: [PeriodoFormModalComponent],
  entryComponents: [PeriodoFormModalComponent],
})
export class PeriodoFormModalModule {}
