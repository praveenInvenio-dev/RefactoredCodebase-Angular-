import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '', children: [
      {
        path: '', redirectTo: 'warehouse', pathMatch: 'full'
      },
      {
        path: 'warehouse',
        loadChildren: () => import('../excise-services/warehouse/warehouse.module').then(m => m.WarehouseModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExciseServicesRoutingModule { }
