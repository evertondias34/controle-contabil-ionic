import { PhoneViewPipe } from "./phone-view/phone-view.pipe";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

@NgModule({
  declarations: [PhoneViewPipe],
  imports: [CommonModule],
  exports: [PhoneViewPipe],
})
export class PipeModule {}
