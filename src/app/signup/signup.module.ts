// import { CharityComponent } from './others/charity/charity.component';
import { OTPVerificationComponent } from "./OTP-Verification/OTP-Verification.component";
import { CreatePasswordComponent } from "./Create-Password/Create-Password.component";
import { AcknowledgmentComponent } from "./acknowledgment/acknowledgment.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SignupLandingComponent } from "./signup-landing/signup-landing.component";
import { SignupRoutingModule } from "./signup-routing.module";
import { MaterialModule } from "../material.module";
import { IndividualsSignUpComponent } from "./individuals-sign-up/individuals-sign-up.component";
import { EstablishmentComponent } from "./establishment/establishment.component";
import { HeaderComponent } from "./header/header.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NotifierOptions, NotifierModule } from "angular-notifier";
import { GovernmentComponent } from "./government/government.component";
import { EstablishmentOldDesignComponent } from "./establishment-old-design/establishment-old-design.component";
import { CharityComponent } from "./charity/charity.component";
import { OtherslandingComponent } from "./otherslanding/otherslanding.component";
import { AuditorComponent } from "./auditor/auditor.component";
import { AttachmentComponent } from "./attachment/attachment.component";
import { FreelancerComponent } from "./freelancer/freelancer.component";

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

@NgModule({
  declarations: [
    SignupLandingComponent,
    IndividualsSignUpComponent,
    EstablishmentComponent,
    HeaderComponent,
    AcknowledgmentComponent,
    CreatePasswordComponent,
    OTPVerificationComponent,
    GovernmentComponent,
    EstablishmentOldDesignComponent,
    CharityComponent,
    OtherslandingComponent,
    AuditorComponent,
    AttachmentComponent,
    FreelancerComponent,
  ],
  imports: [
    CommonModule,
    SignupRoutingModule,
    MaterialModule,
    NgbModule,
    NotifierModule.withConfig(notifierDefaultOptions),
  ],
  providers: [],
})
export class SignupModule {}
