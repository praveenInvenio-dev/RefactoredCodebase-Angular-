import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from './../../material.module';
import { ConsolidatedAccountsRoutingModule } from './consolidated-accounts-routing.module';
import { ConsolidatedAccountsComponent } from './consolidated-accounts.component';
import { CancelConsolidatedAccountsComponent } from './cancel-consolidated-accounts/cancel-consolidated-accounts.component';
import { NotifierModule, NotifierOptions } from 'angular-notifier';
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
    ConsolidatedAccountsComponent,
    CancelConsolidatedAccountsComponent
  ],
  imports: [
    CommonModule,
    FormsModule, 
    ReactiveFormsModule,
    MaterialModule,
    ConsolidatedAccountsRoutingModule,
    NotifierModule.withConfig(notifierDefaultOptions)
  ]
})
export class ConsolidatedAccountsModule { }
