import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './../../material.module';
import { ExciseTaxServicesRoutingModule } from './excise-tax-services-routing.module';
import { NotifierModule, NotifierOptions } from 'angular-notifier';
import { ExciseTaxServicesComponent } from './excise-tax-services.component';
import { ExciseTaxDeregistrationComponent } from './excise-tax-deregistration/excise-tax-deregistration.component';
import { DisplayAmendentExiceRegistrationComponent } from './display-amendent-exice-registration/display-amendent-exice-registration.component';

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
    ExciseTaxServicesComponent, 
    ExciseTaxDeregistrationComponent,
    DisplayAmendentExiceRegistrationComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    ExciseTaxServicesRoutingModule,
    NotifierModule.withConfig(notifierDefaultOptions)
  ]
})
export class ExciseTaxServicesModule { }
