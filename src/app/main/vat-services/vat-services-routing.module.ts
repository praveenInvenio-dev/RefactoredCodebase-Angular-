import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VatServicesComponent } from './vat-services.component';
import { VatDeregistrationDetailsComponent } from './vat-deregistration-details/vat-deregistration-details.component'; 
import { RequestAmendVatgroupComponent } from './request-amend-vatgroup/request-amend-vatgroup.component';
import { VatgroupRegistrationAppComponent } from './vatgroup-registration-app/vatgroup-registration-app.component';
import { RequestDisbandVatgroupComponent } from './request-disband-vatgroup/request-disband-vatgroup.component';
import { ChangeRegistrationComponent } from './change-registration/change-registration.component';
import { DisplayRegistrationComponent } from './display-registration/display-registration.component';

const routes: Routes = [
  { path: '', component: VatServicesComponent },
  { path: 'deregisterVat', component: VatDeregistrationDetailsComponent },
  { path: 'requestAmend', component: RequestAmendVatgroupComponent },
  { path: 'vatgroupReg', component: VatgroupRegistrationAppComponent },
  { path: 'requestdisband', component: RequestDisbandVatgroupComponent },
  { path: 'vatElegibleDisplay', component: DisplayRegistrationComponent },
  { path: 'vatElegibleChange', component: ChangeRegistrationComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VatServicesRoutingModule { }
