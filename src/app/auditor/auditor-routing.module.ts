import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BranchInfoComponent } from './branch-info/branch-info.component';
import { AuditorComponent } from './auditor.component';
import { ApprovalRejectionComponent } from './approval-rejection/approval-rejection.component';
import { EmployeeInfoComponent } from './employee-info/employee-info.component';
import { TaxpayerActivityComponent } from './taxpayer-activity/taxpayer-activity.component';
const routes: Routes = [
  { path: '', component: AuditorComponent },
  { path: 'branchInfo', component: BranchInfoComponent },
  { path: 'approvalRejection', component: ApprovalRejectionComponent },
  { path: 'userInfo', component: EmployeeInfoComponent },
  { path: 'taxPayer', component: TaxpayerActivityComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuditorRoutingModule { }
