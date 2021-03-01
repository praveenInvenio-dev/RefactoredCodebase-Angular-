import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { NewExciseRegistrationComponent } from "./new-excise-registration/new-excise-registration.component";
import { NewVatRegistrationComponent } from "./new-vat-registration/new-vat-registration.component";

const routes: Routes = [
  {
    path: "newvat",
    component: NewVatRegistrationComponent,
  },
  {
    path: "newexcise",
    component: NewExciseRegistrationComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistrationRoutingModule {}
