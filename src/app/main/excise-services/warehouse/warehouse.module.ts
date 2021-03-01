import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../material.module';
import { WarehouseRoutingModule } from './warehouse-routing.module';
import { NotifierOptions, NotifierModule } from "angular-notifier";
import { WarehouseComponent } from './warehouse.component';
import { RegisterNewWarehouseComponent } from './register-new-warehouse/register-new-warehouse.component';
import { CancelWarehouseComponent } from './cancel-warehouse/cancel-warehouse.component';
import { ModifyWarehouseLicenseComponent } from './modify-warehouse-license/modify-warehouse-license.component';
import { DisplayWarehouseComponent } from './display-warehouse/display-warehouse.component';
import { WarehouseListComponent } from './warehouse-list/warehouse-list.component';
import { RequestReactivationWarehouseComponent } from './request-reactivation-warehouse/request-reactivation-warehouse.component';
import { ReneualWarehouseComponent } from './reneual-warehouse/reneual-warehouse.component';

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
    WarehouseComponent,
    RegisterNewWarehouseComponent,
    CancelWarehouseComponent,
    ModifyWarehouseLicenseComponent,
    DisplayWarehouseComponent,
    WarehouseListComponent,
    RequestReactivationWarehouseComponent,
    ReneualWarehouseComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    WarehouseRoutingModule,
    NotifierModule.withConfig(notifierDefaultOptions)
  ]
})
export class WarehouseModule { }
