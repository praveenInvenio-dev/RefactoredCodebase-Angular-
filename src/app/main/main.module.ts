import { NgModule } from "@angular/core";
import { CommonModule, DecimalPipe, TitleCasePipe } from "@angular/common";
import { MaterialModule } from "../material.module";
import { MainRoutingModule } from "./main-routing.module";
import { OtpComponent } from "./otp/otp.component";
import { HomeComponent } from "./home/home.component";
import { LandingpageComponent } from "./landingpage/landingpage.component";
import { NewDashboardComponent } from "./new-dashboard/new-dashboard.component";
import { DaterangeModule } from "./daterange/daterange.module";
import { BillsComponent } from "./bills/bills.component";
import { NotifierOptions, NotifierModule } from "angular-notifier";

import { Ng2SearchPipeModule } from "ng2-search-filter";
import { TaxlandingComponent } from "./taxlanding/taxlanding.component";
//import { ReturnsComponent } from './returns/returns.component';
import { NgbDate, NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { CreatePwdComponent } from "./createPwd/createPwd.component";
import { QuickactionComponent } from "./quickaction/quickaction.component";

/*ZS Components Starts */

import { InboxComponent } from "./inbox/inbox.component";
import { CorrespondanceComponent } from "./correspondance/correspondance.component";
import { AuthorizationComponent } from "./authorization/authorization.component";
import { UserManagementComponent } from "./user-management/user-management.component";
import { AddUserComponent } from "./add-user/add-user.component";
import { TaskAllocationComponent } from "./task-allocation/task-allocation.component";
import { CommitmentComponent } from "./commitment/commitment.component";
import { SatDatepickerModule, SatNativeDateModule } from "saturn-datepicker";
import { AccountStatementComponent } from "./account-statement/account-statement.component";
import { StatementDetailComponent } from "./account-statement/statement-detail/statement-detail.component";
import { StatementListComponent } from "./account-statement/statement-list/statement-list.component";
import { DialogBoxComponent } from "./account-statement/dialog-box/dialog-box.component";
import { DownloadDialogComponent } from "./account-statement/download-dialog/download-dialog.component";
import { FilterDialogComponent } from "./account-statement/filter-dialog/filter-dialog.component";
import { SukukBondsComponent } from "./sukuk-bonds/sukuk-bonds.component";
import { NgbdModalContent } from "./request-installment/check-notification.dialog";
import { ErrorMessageModal } from "./request-installment/error.message.modal";
import { CommonComponentComponent } from "./common-component/common-component.component";
import { RequestCertificateComponent } from "./request-certificate/request-certificate.component";
import { RequesToReleaseSecuritiesComponent } from "./reques-to-release-securities/reques-to-release-securities.component";
import { ReprintVatCertificateComponent } from "./reprint-vat-certificate/reprint-vat-certificate.component";
import { NewChangeFilingFrequencyComponent } from "./new-change-filing-frequency/new-change-filing-frequency.component";
import { NewVatRefundComponent } from "./new-vat-refund/new-vat-refund.component";
import { RequestInstallmentComponent } from "./request-installment/request-installment.component";
import { NewRequestRulingComponent } from "./new-request-ruling/new-request-ruling.component";
import { NewZakatObjectionComponent } from "./new-zakat-objection/new-zakat-objection.component";
import { ZakatObjectionComponent } from "./zakat-objection/zakat-objection.component";
import { InstallmentDetailComponent } from "./investment-detail/installment-detail.component";
import { ZakatDetailsComponent } from "./zakat-details/zakat-details.component";
import { NumberOnlyDirective } from "../directive/number-only.directive";
import { WitholdingTaxObjectionComponent } from "./witholding-tax-objection/witholding-tax-objection.component";
import { NewWithholdingTaxObjectionComponent } from "./new-withholding-tax-objection/new-withholding-tax-objection.component";
import { ObjectionReviewsComponent } from "./objection-reviews/objection-reviews.component";
import { NewVatReviewComponent } from "./new-vat-review/new-vat-review.component";
import { NumberInputDirective } from "../directives/number-input.directive";
import { UserdetailsComponent } from "./userdetails/userdetails.component";
import { MatDialogModule } from "@angular/material/dialog";
import { SearchPipe } from "./search.pipe";
import { DateRangePickerModule } from "@syncfusion/ej2-angular-calendars";
import { EditUserComponent } from "./edit-user/edit-user.component";
import { FlexLayoutModule } from "@angular/flex-layout";
import { NotificationsComponent } from "./notifications/notifications.component";
import { DeferralVatPaymentComponent } from "./deferral-vat-payment/deferral-vat-payment.component";
import { RequestForContractReleaseFormComponent } from "./request-for-contract-release-form/request-for-contract-release-form.component";
import { StatementCategoryComponent } from "./account-statement/statement-category/statement-category.component";
import { NgxMaskModule, IConfig } from "ngx-mask";
import { OrderModule } from "ngx-order-pipe";
import { ReportExciseGoodsComponent } from "./loss-excise-goods/report-excise-goods/report-excise-goods.component";
import { AddGoodsLossComponent } from "./loss-excise-goods/add-goods-loss/add-goods-loss.component";
import { VatFieldInspectionComponent } from "./vat-field-inspection/vat-field-inspection.component";
import { WhitelistingComponent } from "./whitelisting/whitelisting.component";
import { NewWhiteListRequestComponent } from "./new-white-list-request/new-white-list-request.component";
import { WhitelistingSuccessComponent } from "./whitelisting-success/whitelisting-success.component";
import { FieldInspectionCasesComponent } from "./field-inspection-cases/field-inspection-cases.component";
import { DownloadDialogBoxComponent } from "./field-inspection-cases/download-dialog-box/download-dialog-box.component";
import { RefundsLandingComponent } from "./refunds-landing/refunds-landing.component";
import { RequestIncomeTaxReductionComponent } from "./request-income-tax-reduction/request-income-tax-reduction.component";
import { ItReductionListComponent } from "./request-income-tax-reduction/main/it-reduction-list/it-reduction-list.component";
import { VatInstallmentPlanComponent } from "./vat-installment-plan/vat-installment-plan.component";
import { SchPlanModal } from "./vat-installment-plan/sch-plan.dialog";
import { InputTaxListComponent } from "./tax-reduction/input-tax-reduction/input-tax-list.component";
import { InputTaxRequestComponent } from "./tax-reduction/input-tax-reduction/input-tax-request/input-tax-request.component";
import { TncComponent } from "./tax-reduction/tnc/tnc.component";
import { TaxCardViewComponent } from "./tax-reduction/input-tax-reduction/tax-card-view/tax-card-view.component";
import { TaxTabularViewComponent } from "./tax-reduction/input-tax-reduction/tax-tabular-view/tax-tabular-view.component";

/*ZS Components Ends */

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
  validation: false,
};

@NgModule({
  declarations: [
    OtpComponent,
    HomeComponent,
    LandingpageComponent,
    NewDashboardComponent,
    BillsComponent,
    TaxlandingComponent,
    //ReturnsComponent,
    QuickactionComponent,
    CorrespondanceComponent,
    InboxComponent,
    AuthorizationComponent,
    AddUserComponent,
    TaskAllocationComponent,
    CommitmentComponent,
    AccountStatementComponent,
    StatementDetailComponent,
    StatementListComponent,
    StatementCategoryComponent,
    DialogBoxComponent,
    DownloadDialogComponent,
    FilterDialogComponent,
    SukukBondsComponent,
    NgbdModalContent,
    ErrorMessageModal,
    CommonComponentComponent,
    RequestCertificateComponent,
    RequesToReleaseSecuritiesComponent,
    ReprintVatCertificateComponent,
    NewChangeFilingFrequencyComponent,
    NewVatRefundComponent,
    SearchPipe,
    RequestInstallmentComponent,
    NewRequestRulingComponent,
    NewZakatObjectionComponent,
    ZakatObjectionComponent,
    InstallmentDetailComponent,
    ZakatDetailsComponent,
    NumberOnlyDirective,
    WitholdingTaxObjectionComponent,
    NewWithholdingTaxObjectionComponent,
    ObjectionReviewsComponent,
    NewVatReviewComponent,
    NumberInputDirective,
    UserdetailsComponent,
    EditUserComponent,
    NotificationsComponent,
    DeferralVatPaymentComponent,
    RequestForContractReleaseFormComponent,
    ReportExciseGoodsComponent,
    AddGoodsLossComponent,
    VatFieldInspectionComponent,
    WhitelistingComponent,
    NewWhiteListRequestComponent,
    WhitelistingSuccessComponent,
    FieldInspectionCasesComponent,
    DownloadDialogBoxComponent,
    VatInstallmentPlanComponent,
    SchPlanModal,
    RefundsLandingComponent,
    RequestIncomeTaxReductionComponent,
    ItReductionListComponent,
    InputTaxListComponent,
    InputTaxRequestComponent,
    TncComponent,
    TaxCardViewComponent,
    TaxTabularViewComponent,
    CreatePwdComponent,
    UserManagementComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    MainRoutingModule,
    DaterangeModule,
    Ng2SearchPipeModule,
    NotifierModule.withConfig(notifierDefaultOptions),
    NgbModule,
    SatDatepickerModule,
    SatNativeDateModule,
    MatDialogModule,
    DateRangePickerModule,
    FlexLayoutModule,
    NgxMaskModule.forRoot(maskConfig),
    OrderModule,
  ],
  entryComponents: [
    NgbdModalContent,
    DialogBoxComponent,
    ErrorMessageModal,
    DownloadDialogBoxComponent,
    SchPlanModal,
    TncComponent,
  ],
  providers: [TitleCasePipe, DecimalPipe],
})
export class MainModule {}
