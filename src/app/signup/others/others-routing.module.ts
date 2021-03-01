
import { NgModule } from "@angular/core";

import { Routes, RouterModule, PreloadAllModules } from "@angular/router";
import { OthersLandingComponent } from './others-landing/others-landing.component';
import { ConsortiumComponent } from './consortium/consortium.component';
import { NaturalGasComponent } from "./natural-gas/natural-gas.component";
import { CompanyComponent } from "./company/company.component";
import { NonResidentCompanyComponent } from "./non-resident-company/non-resident-company.component";
import { EstabComponent } from "./estab/estab.component";
import { VATEligiblePersonComponent } from './vat-eligible-person/vat-eligible-person.component';
import { OilHydrocarbonComponent } from './oil-hydrocarbon/oil-hydrocarbon.component';
import { NonRegTPComponent } from "./non-reg-tp/non-reg-tp.component";

const routes: Routes = [
  {
    path: '',
    component: ConsortiumComponent,
  },
  // {
  //   path: 'charity',
  //   component: CharityComponent,
  // },
  {
    path: 'consortium',
    component: ConsortiumComponent
  },
  {
    path: 'naturalGas',
    component: NaturalGasComponent
  },
  {
    path: 'company',
    component: CompanyComponent
  },
  {
    path: 'nonResidentCompany',
    component: NonResidentCompanyComponent
  },
  {
    path: 'establishment',
    component: EstabComponent
  },
  {
    path: 'vatEligiblePerson',
    component: VATEligiblePersonComponent
  },
  {
    path: 'oilHydrocarbon',
    component: OilHydrocarbonComponent
  },
  {
    path: 'nonRegTP',
    component: NonRegTPComponent
  },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class OthersRoutingModule { }
