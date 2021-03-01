import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DisplayAmendentExiceRegistrationComponent } from './display-amendent-exice-registration/display-amendent-exice-registration.component';
import { ExciseTaxDeregistrationComponent } from './excise-tax-deregistration/excise-tax-deregistration.component';
import { ExciseTaxServicesComponent } from './excise-tax-services.component';

const routes: Routes = [
  { path: '', component: ExciseTaxServicesComponent },
  { path: 'exciseTaxDeregister', component: ExciseTaxDeregistrationComponent },
  { path: 'displayAmendmentExciseRegistration', component: DisplayAmendentExiceRegistrationComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExciseTaxServicesRoutingModule { }
