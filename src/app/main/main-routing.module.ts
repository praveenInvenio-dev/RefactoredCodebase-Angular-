import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { LandingpageComponent } from "./landingpage/landingpage.component";
import { NewDashboardComponent } from "./new-dashboard/new-dashboard.component";
import { BillsComponent } from "./bills/bills.component";
import { TaxlandingComponent } from "./taxlanding/taxlanding.component";

import { QuickactionComponent } from "./quickaction/quickaction.component";

import { InboxComponent } from "./inbox/inbox.component";
import { AuthorizationComponent } from "./authorization/authorization.component";
import { AddUserComponent } from "./add-user/add-user.component";
import { TaskAllocationComponent } from "./task-allocation/task-allocation.component";
import { CommitmentComponent } from "./commitment/commitment.component";
import { AccountStatementComponent } from "./account-statement/account-statement.component";
import { SukukBondsComponent } from "./sukuk-bonds/sukuk-bonds.component";
import { NewChangeFilingFrequencyComponent } from "./new-change-filing-frequency/new-change-filing-frequency.component";
import { NewVatRefundComponent } from "./new-vat-refund/new-vat-refund.component";
import { CommonComponentComponent } from "./common-component/common-component.component";
import { RequestCertificateComponent } from "./request-certificate/request-certificate.component";
import { RequesToReleaseSecuritiesComponent } from "./reques-to-release-securities/reques-to-release-securities.component";
import { ReprintVatCertificateComponent } from "./reprint-vat-certificate/reprint-vat-certificate.component";
import { RequestInstallmentComponent } from "./request-installment/request-installment.component";
import { NewRequestRulingComponent } from "./new-request-ruling/new-request-ruling.component";
import { NewZakatObjectionComponent } from "./new-zakat-objection/new-zakat-objection.component";
import { ZakatObjectionComponent } from "./zakat-objection/zakat-objection.component";
import { UserdetailsComponent } from "./userdetails/userdetails.component";
import { InstallmentDetailComponent } from "./investment-detail/installment-detail.component";
import { ZakatDetailsComponent } from "./zakat-details/zakat-details.component";
import { NewWithholdingTaxObjectionComponent } from "./new-withholding-tax-objection/new-withholding-tax-objection.component";
import { WitholdingTaxObjectionComponent } from "./witholding-tax-objection/witholding-tax-objection.component";
import { NewVatReviewComponent } from "./new-vat-review/new-vat-review.component";
import { ObjectionReviewsComponent } from "./objection-reviews/objection-reviews.component";
import { ReportExciseGoodsComponent } from "./loss-excise-goods/report-excise-goods/report-excise-goods.component";
import { AddGoodsLossComponent } from "./loss-excise-goods/add-goods-loss/add-goods-loss.component";
import { EditUserComponent } from "./edit-user/edit-user.component";
import { DeferralVatPaymentComponent } from "./deferral-vat-payment/deferral-vat-payment.component";
import { RequestForContractReleaseFormComponent } from "./request-for-contract-release-form/request-for-contract-release-form.component";
import { VatFieldInspectionComponent } from "./vat-field-inspection/vat-field-inspection.component";
import { WhitelistingComponent } from "./whitelisting/whitelisting.component";
import { FieldInspectionCasesComponent } from "./field-inspection-cases/field-inspection-cases.component";
import { RefundsLandingComponent } from "./refunds-landing/refunds-landing.component";
import { RequestIncomeTaxReductionComponent } from "./request-income-tax-reduction/request-income-tax-reduction.component";
import { ItReductionListComponent } from "./request-income-tax-reduction/main/it-reduction-list/it-reduction-list.component";
import { VatInstallmentPlanComponent } from "./vat-installment-plan/vat-installment-plan.component";
import { InputTaxListComponent } from "./tax-reduction/input-tax-reduction/input-tax-list.component";
import { InputTaxRequestComponent } from "./tax-reduction/input-tax-reduction/input-tax-request/input-tax-request.component";
import { UserManagementComponent } from "./user-management/user-management.component";

const routes: Routes = [
  {
    path: "refunds",
    loadChildren: () =>
      import("./refunds/refunds.module").then((m) => m.RefundsModule),
  },
  {
    path: "",
    component: LandingpageComponent,
    children: [
      { path: "", redirectTo: "dashboard", pathMatch: "full" },
      {
        path: "deregister",
        loadChildren: () =>
          import("../deregistration/deregistration.module").then(
            (m) => m.DeregistrationModule
          ),
      },
      {
        path: "registration",
        loadChildren: () =>
          import("../registration/registration.module").then(
            (m) => m.RegistrationModule
          ),
      },
      {
        path: "profile",
        loadChildren: () =>
          import("../profile/profile.module").then((m) => m.ProfileModule),
      },
      {
        path: "dashboard",
        component: NewDashboardComponent,
      },
      {
        path: "bills",
        component: BillsComponent,
      },
      {
        path: "usermanagement",
        component: UserManagementComponent,
      },
      {
        path: "returns",
        loadChildren: () =>
          import("../returns/returns.module").then((r) => r.ReturnsModule),
      },
      {
        path: "tax",
        component: TaxlandingComponent,
      },
      {
        path: "consolidatedAccounts",
        loadChildren: () =>
          import(
            "../main/consolidated-accounts/consolidated-accounts.module"
          ).then((mod) => mod.ConsolidatedAccountsModule),
      },
      {
        path: "vatServices",
        loadChildren: () =>
          import("../main/vat-services/vat-services.module").then(
            (mod) => mod.VatServicesModule
          ),
      },
      {
        path: "exciseServices",
        loadChildren: () =>
          import("../main/excise-services/excise-services.module").then(
            (mod) => mod.ExciseServicesModule
          ),
      },
      {
        path: "exciseTaxServices",
        loadChildren: () =>
          import("../main/excise-tax-services/excise-tax-services.module").then(
            (mod) => mod.ExciseTaxServicesModule
          ),
      },
      {
        path: "quickMenu",
        component: QuickactionComponent,
      },

      {
        path: "adduser",
        component: AddUserComponent,
      },
      {
        path: "taskallocation",
        component: TaskAllocationComponent,
      },
      {
        path: "inbox",
        component: InboxComponent,
      },
      {
        path: "authorization",
        component: AuthorizationComponent,
      },
      {
        path: "commitments",
        component: CommitmentComponent,
      },
      {
        path: "accountstatement",
        component: AccountStatementComponent,
      },
      {
        path: "sukukbonds",
        component: SukukBondsComponent,
      },
      {
        path: "sukukbonds/:period",
        component: SukukBondsComponent,
      },
      {
        path: "newchangefilingfrequency",
        component: NewChangeFilingFrequencyComponent,
      },
      {
        path: "newvatrefund",
        component: NewVatRefundComponent,
      },
      {
        path: "commoncomponent",
        component: CommonComponentComponent,
      },
      {
        path: "requestcertificate",
        component: RequestCertificateComponent,
      },
      {
        path: "requestreleasesecurities",
        component: RequesToReleaseSecuritiesComponent,
      },
      {
        path: "reprintvatcertificate",
        component: ReprintVatCertificateComponent,
      },
      {
        path: "installmentplan",
        component: RequestInstallmentComponent,
      },
      {
        path: "newrequestruling",
        component: NewRequestRulingComponent,
      },
      {
        path: "newzakatobjection",
        component: NewZakatObjectionComponent,
      },
      {
        path: "zakatobjection",
        component: ZakatObjectionComponent,
      },
      {
        path: "userdetails",
        component: UserdetailsComponent,
      },
      {
        path: "edituser",
        component: EditUserComponent,
      },
      {
        path: "installmentdetail",
        component: InstallmentDetailComponent,
      },
      {
        path: "zakatdetail",
        component: ZakatDetailsComponent,
      },
      {
        path: "newwithholdingobjection",
        component: NewWithholdingTaxObjectionComponent,
      },
      {
        path: "withholdingobjection",
        component: WitholdingTaxObjectionComponent,
      },
      {
        path: "newvatreview",
        component: NewVatReviewComponent,
      },
      {
        path: "objectionreviews",
        component: ObjectionReviewsComponent,
      },
      {
        path: "deferralvatpayment",
        component: DeferralVatPaymentComponent,
      },
      {
        path: "contractrelease",
        component: RequestForContractReleaseFormComponent,
      },
      {
        path: "lossexcisegoods",
        component: ReportExciseGoodsComponent,
      },
      {
        path: "lossexcisegoods/add",
        component: AddGoodsLossComponent,
      },
      {
        path: "fieldinspection",
        component: VatFieldInspectionComponent,
      },
      {
        path: "whitelisting",
        component: WhitelistingComponent,
      },
      {
        path: "fieldinspectionreports",
        component: FieldInspectionCasesComponent,
      },
      {
        path: "refundslanding",
        component: RefundsLandingComponent,
      },
      {
        path: "refundslanding/:type",
        component: RefundsLandingComponent,
      },
      {
        path: "vatinstallmentplan",
        component: VatInstallmentPlanComponent,
      },
      {
        path: "requestincometaxreduction",
        component: ItReductionListComponent,
      },
      {
        path: "requestincometaxreduction/add",
        component: RequestIncomeTaxReductionComponent,
      },
      {
        path: "inputtaxdeduction",
        component: InputTaxListComponent,
      },
      {
        path: "inputtaxdeduction/:id",
        component: InputTaxRequestComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
