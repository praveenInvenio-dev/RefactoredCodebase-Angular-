import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from './../../material.module';
import { VatServicesRoutingModule } from './vat-services-routing.module';
import { NotifierOptions, NotifierModule } from "angular-notifier";
import { VatServicesComponent } from './vat-services.component';
import { VatDeregistrationDetailsComponent } from './vat-deregistration-details/vat-deregistration-details.component';
import { RequestAmendVatgroupComponent } from './request-amend-vatgroup/request-amend-vatgroup.component';
import { VatgroupRegistrationAppComponent } from './vatgroup-registration-app/vatgroup-registration-app.component';
import { RequestDisbandVatgroupComponent } from './request-disband-vatgroup/request-disband-vatgroup.component';
import { ChangeRegistrationComponent } from './change-registration/change-registration.component';
import { DisplayRegistrationComponent } from './display-registration/display-registration.component';

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
    stacking: 1,
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
    VatServicesComponent, 
    VatDeregistrationDetailsComponent,
	  RequestAmendVatgroupComponent, 
    VatgroupRegistrationAppComponent,
    RequestDisbandVatgroupComponent,
    ChangeRegistrationComponent,
    DisplayRegistrationComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    VatServicesRoutingModule,
    NotifierModule.withConfig(notifierDefaultOptions)
  ]
})
export class VatServicesModule { }
