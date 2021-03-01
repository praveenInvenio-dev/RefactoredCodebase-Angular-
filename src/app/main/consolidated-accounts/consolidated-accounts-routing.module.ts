import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConsolidatedAccountsComponent } from './consolidated-accounts.component';
import { CancelConsolidatedAccountsComponent } from './cancel-consolidated-accounts/cancel-consolidated-accounts.component';

const routes: Routes = [
  { path: '', component: ConsolidatedAccountsComponent, children: 
    [
      { path: '', redirectTo: 'cancel', pathMatch: 'full' },
      { path: 'cancel', component: CancelConsolidatedAccountsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsolidatedAccountsRoutingModule { }
