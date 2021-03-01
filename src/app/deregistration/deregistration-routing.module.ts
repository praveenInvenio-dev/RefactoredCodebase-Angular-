import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { OutletDeregistrationComponent } from "./outlet-deregistration/outlet-deregistration.component";
import { PermitDeregistrationComponent } from "./permit-deregistration/permit-deregistration.component";
import { TinDeregistrationComponent } from "./tin-deregistration/tin-deregistration.component";

const routes: Routes = [
  {
    path: "tin",
    component: TinDeregistrationComponent,
  },
  {
    path: "outlet",
    component: OutletDeregistrationComponent,
  },
  {
    path: "permit",
    component: PermitDeregistrationComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeregistrationRoutingModule {}
