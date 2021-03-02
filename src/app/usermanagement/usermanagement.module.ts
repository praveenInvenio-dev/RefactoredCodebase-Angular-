import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { UsermanagementRoutingModule } from "./usermanagement-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NotifierOptions, NotifierModule } from "angular-notifier";
import { MaterialModule } from "../material.module";
import { AddUserComponent } from "./add-user/add-user.component";
import { EditUserComponent } from "./edit-user/edit-user.component";
import { TaskAllocationComponent } from "./task-allocation/task-allocation.component";
import { UserManagementComponent } from "./user-management/user-management.component";
import { UserdetailsComponent } from "./userdetails/userdetails.component";
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
    AddUserComponent,
    EditUserComponent,
    TaskAllocationComponent,
    UserManagementComponent,
    UserdetailsComponent,
  ],
  imports: [
    CommonModule,
    UsermanagementRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    NotifierModule.withConfig(notifierDefaultOptions),
  ],
})
export class UsermanagementModule {}
