import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CancelWarehouseComponent } from './cancel-warehouse/cancel-warehouse.component';
import { DisplayWarehouseComponent } from './display-warehouse/display-warehouse.component';
import { ModifyWarehouseLicenseComponent } from './modify-warehouse-license/modify-warehouse-license.component';
import { RegisterNewWarehouseComponent } from './register-new-warehouse/register-new-warehouse.component';
import { WarehouseComponent } from './warehouse.component';
import { WarehouseListComponent } from './warehouse-list/warehouse-list.component';
import { RequestReactivationWarehouseComponent } from './request-reactivation-warehouse/request-reactivation-warehouse.component';
import { ReneualWarehouseComponent } from './reneual-warehouse/reneual-warehouse.component';

const routes: Routes = [
  {
    path: '', component: WarehouseComponent, children: [
      {
        path: '', redirectTo: 'warehouseList', pathMatch: 'full'
      },
      {
        path: 'registerNewWarehouse', component: RegisterNewWarehouseComponent
      },
      {
        path: 'cancelWarehouse', component: CancelWarehouseComponent
      },
      {
        path: 'modifyWarehouse', component: ModifyWarehouseLicenseComponent
      },
      {
        path: 'displayWarehouse', component: DisplayWarehouseComponent
      },
      {
        path: 'warehouseList', component: WarehouseListComponent
      },
	  {
        path: 'requestReactivation', component: RequestReactivationWarehouseComponent
      }, {
        path: 'renewalWarehouse', component: ReneualWarehouseComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WarehouseRoutingModule { }
