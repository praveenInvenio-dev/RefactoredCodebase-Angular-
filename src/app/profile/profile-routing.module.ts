import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ChangePasswordComponent } from "./change-password/change-password.component";
import { DeregistrationComponent } from "./deregistration/deregistration.component";
import { ProfileComponent } from "./profile/profile.component";
import { RegistrationDetailsComponent } from "./registration-details/registration-details.component";
import { SettingsComponent } from "./settings/settings.component";
import { UpdateEmailComponent } from "./update-email/update-email.component";
import { UpdateMobileComponent } from "./update-mobile/update-mobile.component";
import { UserManagementComponent } from "./user-management/user-management.component";
import { ZakatDeregistrationComponent } from "./zakat-deregistration/zakat-deregistration.component";

const routes: Routes = [
  {
    path: "",
    component: ProfileComponent,
  },
  {
    path: "updateMobile",
    component: UpdateMobileComponent,
  },
  {
    path: "updateEmail",
    component: UpdateEmailComponent,
  },
  {
    path: "regDetails",
    component: RegistrationDetailsComponent,
  },
  {
    path: "deregister",
    component: DeregistrationComponent,
  },
  {
    path: "zakat-deregister",
    component: ZakatDeregistrationComponent,
  },
  {
    path: "changePwd",
    component: ChangePasswordComponent,
  },
  {
    path: "usermanagement",
    component: UserManagementComponent,
  },
  {
    path: "setting",
    component: SettingsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
