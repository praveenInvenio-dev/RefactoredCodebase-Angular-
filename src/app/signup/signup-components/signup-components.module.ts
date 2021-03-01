import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BranchesDetailsComponent } from './branches-details/branches-details.component';
import { FinancialDetailsComponent } from './financial-details/financial-details.component';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { NotifierModule, NotifierOptions } from 'angular-notifier';
import { MaterialModule } from 'src/app/material.module';
import { SignupOtpComponent } from './signup-otp/signup-otp.component';
import { SignupCreatePasswordComponent } from './signup-create-password/signup-create-password.component';
import { ShareholdersDetailsComponent } from './shareholders-details/shareholders-details.component';
import { SignupAttachmentsComponent } from './signup-attachments/signup-attachments.component';
import { ResidentiaryDetailsComponent } from './residentiary-details/residentiary-details.component';

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
  declarations: [BranchesDetailsComponent, FinancialDetailsComponent, SignupOtpComponent, SignupCreatePasswordComponent, ShareholdersDetailsComponent, SignupAttachmentsComponent, ResidentiaryDetailsComponent],
  imports: [
    CommonModule,
    MaterialModule,
    NgxMaskModule.forRoot(maskConfig),
    NotifierModule.withConfig(notifierDefaultOptions)
  ],
  exports: [BranchesDetailsComponent, FinancialDetailsComponent, SignupOtpComponent, SignupCreatePasswordComponent,ShareholdersDetailsComponent,SignupAttachmentsComponent,ResidentiaryDetailsComponent]
})
export class SignupComponentsModule { }
