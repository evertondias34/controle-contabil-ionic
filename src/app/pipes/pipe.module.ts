import { RealPipe } from "./real/real.pipe";
import { PhoneViewPipe } from "./phone-view/phone-view.pipe";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

@NgModule({
  declarations: [PhoneViewPipe, RealPipe],
  imports: [CommonModule],
  exports: [PhoneViewPipe, RealPipe],
})
export class PipeModule {}
