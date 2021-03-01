import { CharityComponent } from './charity/charity.component';
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule, PreloadAllModules } from "@angular/router";
import { SignupLandingComponent } from './signup-landing/signup-landing.component';
import { IndividualsSignUpComponent } from './individuals-sign-up/individuals-sign-up.component';
import { EstablishmentComponent } from './establishment/establishment.component';
import { GovernmentComponent } from './government/government.component';
import { OtherslandingComponent } from './otherslanding/otherslanding.component';
import { AuditorComponent } from './auditor/auditor.component';
const routes: Routes = [
  {
    path: "",
    component: SignupLandingComponent,
  },
  {
    path: "individual",
    component: IndividualsSignUpComponent,
  }, 
  
  {
    path: "government",
    component: GovernmentComponent,
  },
  {
    path: "auditor",
    component: AuditorComponent,
  },
  {
    path: "npoCharity",
    component: CharityComponent,
  },
  {
    path: "",
      loadChildren: () =>
      import("./others/others.module").then((m) => m.OthersModule),
  },
  // {{
  //   path: "signup",
  //   loadChildren: () =>
  //     import("./signup/signup.module").then((m) => m.SignupModule),
  // },
  {
    path: "others",
    component: OtherslandingComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class SignupRoutingModule {}
