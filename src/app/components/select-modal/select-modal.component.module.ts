import { SelectModalComponent } from "src/app/components/select-modal/select-modal.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";

@NgModule({
  declarations: [SelectModalComponent],
  imports: [CommonModule, FormsModule, IonicModule, ReactiveFormsModule],
  // SelectModalComponentModule,CommonModule, FormsModule],
  exports: [SelectModalComponent],
  entryComponents: [SelectModalComponent],
})
export class SelectModalComponentModule {}
