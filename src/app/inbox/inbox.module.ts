import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { InboxRoutingModule } from "./inbox-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NotifierOptions, NotifierModule } from "angular-notifier";
import { MaterialModule } from "../material.module";
import { InboxComponent } from "./inbox/inbox.component";
import { CorrespondanceComponent } from "./correspondance/correspondance.component";
import { NotificationsComponent } from "./notifications/notifications.component";
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
    InboxComponent,
    CorrespondanceComponent,
    NotificationsComponent,
  ],
  imports: [
    CommonModule,
    InboxRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    NotifierModule.withConfig(notifierDefaultOptions),
  ],
})
export class InboxModule {}
