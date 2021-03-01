import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewRefundComponent } from './new-refund/new-refund.component';
import { RefundRoutingModule } from './refunds-routing.module';
import { MaterialModule } from 'src/app/material.module';
import { RefundSuccessComponent } from './refund-success/refund-success.component';
import { NewAppealRefundComponent } from './new-appeal-refund/new-appeal-refund.component';
import { NewSaleAssetsRefundComponent } from './new-sale-assets-refund/new-sale-assets-refund.component';
import { NewExportsRefundComponent } from './new-exports-refund/new-exports-refund.component';
import { NewExciseTaxRefundComponent } from './new-excise-tax-refund/new-excise-tax-refund.component';



@NgModule({
  declarations: [NewRefundComponent, RefundSuccessComponent, NewAppealRefundComponent, NewSaleAssetsRefundComponent, NewExportsRefundComponent, NewExciseTaxRefundComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RefundRoutingModule
  ]
})
export class RefundsModule { }
