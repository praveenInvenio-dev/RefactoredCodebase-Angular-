import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ProfileRoutingModule } from "./profile-routing.module";
import { ProfileComponent } from "./profile/profile.component";
import { UpdateEmailComponent } from "./update-email/update-email.component";
import { UpdateMobileComponent } from "./update-mobile/update-mobile.component";
import { RegistrationDetailsComponent } from "./registration-details/registration-details.component";
import { ZakatDeregistrationComponent } from "./zakat-deregistration/zakat-deregistration.component";
import { ChangePasswordComponent } from "./change-password/change-password.component";
import { DeregistrationComponent } from "./deregistration/deregistration.component";
import { UserManagementComponent } from "./user-management/user-management.component";
import { SettingsComponent } from "./settings/settings.component";
import { OTPVerificationComponent } from "./otpverification/otpverification.component";
import { CreatePasswordComponent } from "./create-password/create-password.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NotifierModule, NotifierOptions } from "angular-notifier";
import { MaterialModule } from "../material.module";
import { CreatePwdComponent } from "./createPwd/createPwd.component";
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
    ProfileComponent,
    UpdateEmailComponent,
    UpdateMobileComponent,
    RegistrationDetailsComponent,
    ChangePasswordComponent,
    DeregistrationComponent,
    ZakatDeregistrationComponent,
    UserManagementComponent,
    SettingsComponent,
    OTPVerificationComponent,
    CreatePasswordComponent,
    CreatePwdComponent,
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    NotifierModule.withConfig(notifierDefaultOptions),
  ],
})
export class ProfileModule {}
