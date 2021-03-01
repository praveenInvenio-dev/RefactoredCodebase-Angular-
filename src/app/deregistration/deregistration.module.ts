import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DeregistrationRoutingModule } from "./deregistration-routing.module";
import { NotifierModule, NotifierOptions } from "angular-notifier";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "../material.module";
import { DeregistrationLandingComponent } from "./deregistration-landing/deregistration-landing.component";
import { TinDeregistrationComponent } from "./tin-deregistration/tin-deregistration.component";
import { OutletDeregistrationComponent } from "./outlet-deregistration/outlet-deregistration.component";
import { PermitDeregistrationComponent } from "./permit-deregistration/permit-deregistration.component";

const notifierDefaultOptions: NotifierOptions = {
  position: {
    horizontal: {
      position: "right",
      distance: 12,
    },
    vertical: {
      position: "top",
      distance: 12,
      gap: 10,
    },
  },
  theme: "material",
  behaviour: {
    autoHide: 5000,
    onClick: false,
    onMouseover: "pauseAutoHide",
    showDismissButton: true,
    stacking: 4,
  },
  animations: {
    enabled: true,
    show: {
      preset: "slide",
      speed: 300,
      easing: "ease",
    },
    hide: {
      preset: "fade",
      speed: 300,
      easing: "ease",
      offset: 50,
    },
    shift: {
      speed: 300,
      easing: "ease",
    },
    overlap: 150,
  },
};

@NgModule({
  declarations: [
    DeregistrationLandingComponent,
    TinDeregistrationComponent,
    OutletDeregistrationComponent,
    PermitDeregistrationComponent,
  ],
  imports: [
    CommonModule,
    DeregistrationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    NotifierModule.withConfig(notifierDefaultOptions),
  ],
})
export class DeregistrationModule {}
