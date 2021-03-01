import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OthersLandingComponent } from './others-landing/others-landing.component';
import { OthersRoutingModule } from './others-routing.module';
import { MaterialModule } from '../../material.module';
// import { CharityComponent } from './charity/charity.component';
import { ConsortiumComponent } from './consortium/consortium.component';
import { NotifierOptions, NotifierModule } from 'angular-notifier';
import { CompanyComponent } from './company/company.component'
import { NgxMaskModule, IConfig } from "ngx-mask";
import { NaturalGasComponent } from "./natural-gas/natural-gas.component";
import { SignupComponentsModule } from '../signup-components/signup-components.module';
import { NonResidentCompanyComponent } from './non-resident-company/non-resident-company.component';
import { EstabComponent } from './estab/estab.component';
import { VATEligiblePersonComponent } from './vat-eligible-person/vat-eligible-person.component';
import { OilHydrocarbonComponent } from './oil-hydrocarbon/oil-hydrocarbon.component';
import { NonRegTPComponent } from './non-reg-tp/non-reg-tp.component';



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

const maskConfig: Partial<IConfig> = {
  validation: true,
};


@NgModule({
  declarations: [
    OthersLandingComponent,
    // CharityComponent,
    ConsortiumComponent,
    NaturalGasComponent,
    CompanyComponent,
    NonResidentCompanyComponent,
    EstabComponent,
    VATEligiblePersonComponent,
    OilHydrocarbonComponent,
    NonRegTPComponent
  ],
  imports: [
    CommonModule,
    OthersRoutingModule,
    MaterialModule,
    NgxMaskModule.forRoot(maskConfig),
    NotifierModule.withConfig(notifierDefaultOptions),
    SignupComponentsModule
  ]
})
export class OthersModule { }
