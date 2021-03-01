import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "src/app/material.module";
import { AuditorRoutingModule } from "./auditor-routing.module";
import { NotifierModule, NotifierOptions } from "angular-notifier";
import { Ng2SearchPipeModule } from "ng2-search-filter";
import { AuditorComponent } from "./auditor.component";
import { ApprovalRejectionComponent } from "./approval-rejection/approval-rejection.component";
import { BranchInfoComponent } from "./branch-info/branch-info.component";
import { EmployeeInfoComponent } from "./employee-info/employee-info.component";
import { TaxpayerActivityComponent } from "./taxpayer-activity/taxpayer-activity.component";

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
    AuditorComponent,
    BranchInfoComponent,
    ApprovalRejectionComponent,
    EmployeeInfoComponent,
    TaxpayerActivityComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    Ng2SearchPipeModule,
    AuditorRoutingModule,
    NotifierModule.withConfig(notifierDefaultOptions),
  ],
})
export class AuditorModule {}
