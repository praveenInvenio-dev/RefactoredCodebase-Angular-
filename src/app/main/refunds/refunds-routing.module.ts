import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingpageComponent } from '../landingpage/landingpage.component';
import { NewAppealRefundComponent } from './new-appeal-refund/new-appeal-refund.component';
import { NewExciseTaxRefundComponent } from './new-excise-tax-refund/new-excise-tax-refund.component';
import { NewExportsRefundComponent } from './new-exports-refund/new-exports-refund.component';
import { NewRefundComponent } from './new-refund/new-refund.component';
import { NewSaleAssetsRefundComponent } from './new-sale-assets-refund/new-sale-assets-refund.component';
import { RefundSuccessComponent } from './refund-success/refund-success.component';

const routes: Routes = [
  {
    path: "",
    component: LandingpageComponent,
    children: [
      { path: "", redirectTo: "newrefund", pathMatch: "full" },
      {
        path: "newrefund",
        component: NewRefundComponent,
      },
      {
        path: "new-excise-tax-refund",
        component: NewExciseTaxRefundComponent,
      },
      {
        path: "new-exports-refund",
        component: NewExportsRefundComponent,
      },
      {
        path: "new-appeal-refund",
        component: NewAppealRefundComponent,
      },
      {
        path: "new-sale-assets-refund",
        component: NewSaleAssetsRefundComponent,
      },
      {
        path: "refund-success",
        component: RefundSuccessComponent,
      }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class RefundRoutingModule { }
