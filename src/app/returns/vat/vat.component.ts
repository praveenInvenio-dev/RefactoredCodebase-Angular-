import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { ReturnsService } from "../returns.service";
import { VatServiceService } from "src/app/services/vat-service.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import * as moment from "moment";
import * as FileSaver from "file-saver";
import { vatconstants } from "src/app/returns/vat/vatconstants.model";
import { ActivatedRoute } from "@angular/router";
import { CurrencyPipe } from "@angular/common";
import { NotifierService } from "angular-notifier";
import { DomSanitizer } from "@angular/platform-browser";

declare var jQuery: any;
declare var $: any;
@Component({
  selector: "app-vat",
  templateUrl: "./vat.component.html",
  styleUrls: ["./vat.component.css"],
})
export class VatComponent implements OnInit {
  @ViewChild("inputFile") myInputVariable: ElementRef;
  fromModal: boolean = false;
  VatReturns: any = [];
  VatReturnsDuplicate: any = [];
  vatObject: any;
  StatusesSet: any = [];
  tilesView: boolean = true;
  status: string = "All";
  disableInputs: boolean = false;
  taxPayerDetails: any = {};
  VatDetailsScreen: boolean = false;
  step: number = 1;
  VATSalesForm: FormGroup;
  VATPurchasesForm: FormGroup;
  fromdate: any = "";
  todate: any = "";
  vatDetailsObj: any;
  lateFinePenality: number = 0;
  CorrectionPenality: any = "0.00";
  extratax: string = "yes";
  goLiveflg: any = "";
  CreditVat: number = 0;
  IBanksSet: any = [];
  PreviousCredits: any = [];
  isrefund: boolean = false;
  bankCode: string = "";
  bankSet: any = [];
  bankLogo: any;
  steppercentage: number = 0;
  IBANNumber: String;
  netVat: number = 0;
  NetdueVat: number = 0;
  searchText: any;
  lang: any;
  language: any;
  direction: string;
  StatusTxt: any;
  IbanSelected: boolean = false;
  notesAttached: string;
  errorNotes: boolean = false;
  ErrorFile: boolean = true;
  Fbguid: string = "";
  RetrunObjStatus: string = "";
  ReturnObjStatusTxt: string = "";
  formattedAmount: any;
  reviewModalShows: boolean = false;
  message: any;
  infotitle: any;
  infomessage1: any;
  infomessage2: any;
  infomessage3: any;
  infomessage4: any;
  infomessage5: any;
  infomessage6: any;
  infomessage7: any;
  infomessage8: any;
  grpSet: any[] = [];
  RateTrtmt: any = "";
  amountModal: boolean = false;
  totalsModal: boolean = false;
  totalModal: boolean = false;
  isAmendment: boolean = false;
  urlPortal: any;
  firstDate: any;
  secondDate: any;
  diffInDays: any;
  voidReturn: boolean = false;
  constructor(
    private returnsService: ReturnsService,
    private vatService: VatServiceService,
    private fb: FormBuilder,
    private currencyPipe: CurrencyPipe,
    private activatedRoute: ActivatedRoute,
    private notifierService: NotifierService,
    public sanitizer: DomSanitizer
  ) {
    if (this.language == "ar") {
      moment.locale("ar-Sa");
    } else {
      moment.locale("en-Us");
    }
  }

  ngOnInit(): void {
    $('[data-toggle="tooltip"]').tooltip("hide");
    // //For Tab Active
    // if (localStorage.getItem("lang") === "ar") {
    //   localStorage.setItem("ActiveTab",JSON.stringify("ضريبة القيمة المضافة"));
    //   }else
    //   {
    //     localStorage.setItem("ActiveTab",JSON.stringify("VAT"));
    //   }
    // //For Tab Active end

    setTimeout(() => {
      this.returnsService.ViewSubject.subscribe((data: boolean) => {
        this.tilesView = data;
      });
      if (localStorage.getItem("lang") === "ar") {
        this.lang = vatconstants.langz.arb.newReturnsVAT;
        this.direction = vatconstants.langz.arb.dir;
      } else {
        this.lang = vatconstants.langz.eng.newReturnsVAT;
        this.direction = vatconstants.langz.eng.dir;
      }
      this.language = localStorage.getItem("lang");
      if (this.language == "ar") {
        moment.locale("ar-Sa");
      } else {
        moment.locale("en-Us");
      }

      this.activatedRoute.params.subscribe((params) => {
        console.log("params", params);
        this.Fbguid = params["Fbguid"] || "";
        this.RetrunObjStatus = params["Status"];
        if (this.ReturnObjStatusTxt == "E0055") {
          if (this.language == "ar") {
            this.ReturnObjStatusTxt = "تم تقديمه";
          } else {
            this.ReturnObjStatusTxt = "Submitted";
          }
        } else if (this.RetrunObjStatus == "E0045") {
          if (this.language == "ar") {
            this.ReturnObjStatusTxt = "فاتورة";
          } else {
            this.ReturnObjStatusTxt = "Billed";
          }
        } else if (this.RetrunObjStatus == "E0006") {
          if (this.language == "ar") {
            this.ReturnObjStatusTxt = "معدل";
          } else {
            this.ReturnObjStatusTxt = "Amended";
          }
        }
        console.log(this.ReturnObjStatusTxt);
        if (this.Fbguid) {
          this.GetUserDetails();
        }
      });

      //hema added on 13-11-2020 starts
      this.VATSalesForm = this.fb.group({
        StandardRatedSales1: [0, [Validators.required, Validators.min(0)]],
        StandardRatedSales1Adjustment: [
          0,
          [Validators.required, Validators.min(0)],
        ],
        PrivateHealthCareEducation: [
          0,
          [Validators.required, Validators.min(0)],
        ],
        PrivateHealthCareEducationAdjustment: [
          0,
          [Validators.required, Validators.min(0)],
        ],
        ZeroRatedDomesticSales: [0, [Validators.required, Validators.min(0)]],
        ZeroRatedDomesticSalesAdjustment: [
          0,
          [Validators.required, Validators.min(0)],
        ],
        Exports: [0, [Validators.required, Validators.min(0)]],
        ExportsAdjustment: [0, [Validators.required, Validators.min(0)]],
        ExemptSales: [0, [Validators.required, Validators.min(0)]],
        ExemptSalesAdjustment: [0, [Validators.required, Validators.min(0)]],
        StandardRatedSales1VAT: [0, [Validators.required]],
        totalSales: [0, [Validators.required]],
        totalSalesAdjustment: [0, [Validators.required]],
        TotalVATonSales: [0, [Validators.required]],
        salesSubjecttovat: [0, [Validators.required, Validators.min(0)]],
        salesSubjecttovatAdjustment: [
          0,
          [Validators.required, Validators.min(0)],
        ],
        salesSubjecttovatVAT: [0, [Validators.required]],
      });
      this.VATPurchasesForm = this.fb.group({
        StandardRatedDomesticPurchases1: [
          0,
          [Validators.required, Validators.min(0)],
        ],
        StandardRatedDomesticPurchases1Adjustment: [
          0,
          [Validators.required, Validators.min(0)],
        ],
        ImportSubjectVatPaidCustoms: [
          0,
          [Validators.required, Validators.min(0)],
        ],
        ImportSubjectVatPaidCustomsAdjustments: [
          0,
          [Validators.required, Validators.min(0)],
        ],
        ImportSubjectVatPaidforReverseCharge: [
          0,
          [Validators.required, Validators.min(0)],
        ],
        ImportSubjectVatPaidforReverseChargeAdjustments: [
          0,
          [Validators.required, Validators.min(0)],
        ],
        ZeroRatedPurchases: [0, [Validators.required, Validators.min(0)]],
        ZeroRatedPurchasesAdjustments: [
          0,
          [Validators.required, Validators.min(0)],
        ],
        ExemptPurchases: [0, [Validators.required, Validators.min(0)]],
        ExemptPurchasesAdjustment: [
          0,
          [Validators.required, Validators.min(0)],
        ],
        StandardRatedDomesticPurchases1VAT: [0, [Validators.required]],
        totalPurchases: [0, [Validators.required]],
        totalPurchasesAdjustment: [0, [Validators.required]],
        totalVATOnPurchases: [0, [Validators.required]],
        ImportSubjectVatPaidCustoms1VAT: [0, [Validators.required]],
        ImportSubjectVatPaidforReverseCharge1VAT: [0, [Validators.required]],
        PurchaseSubjectToVAT: [0, [Validators.required, Validators.min(0)]],
        PurchaseSubjectToVATAdjustment: [
          0,
          [Validators.required, Validators.min(0)],
        ],
        PurchaseSubjectToVATVAT: [0, [Validators.required]],
        ImportSubjectVatStepAmt: [0, [Validators.required, Validators.min(0)]],
        ImportSubjectVatStepAdjustments: [
          0,
          [Validators.required, Validators.min(0)],
        ],
        ImportSubjectVatStepVAT: [0, [Validators.required]],
        ImportSubjectVatPaidforReverseChargeStepAmt: [0, [Validators.required]],
        ImportSubjectVatPaidforReverseChargeStepAdjustments: [
          0,
          [Validators.required, Validators.min(0)],
        ],
        ImportSubjectVatPaidforReverseChargeStepVAT: [0, [Validators.required]],
      });
      // this.VATSalesForm.controls["salesSubjecttovat"].setValue(0);
      // this.VATSalesForm.controls["salesSubjecttovatAdjustment"].setValue(0);
      // this.VATSalesForm.controls["salesSubjecttovatVAT"].setValue(0);
      // this.VATPurchasesForm.controls['PurchaseSubjectToVAT'].setValue(0)
      // this.VATPurchasesForm.controls['PurchaseSubjectToVATAdjustment'].setValue(0)
      // this.VATPurchasesForm.controls['PurchaseSubjectToVATVAT'].setValue(0)
      // this.VATPurchasesForm.controls['ImportSubjectVatStepAmt'].setValue(0)
      // this.VATPurchasesForm.controls['ImportSubjectVatStepAdjustments'].setValue(0)
      // this.VATPurchasesForm.controls['ImportSubjectVatStepVAT'].setValue(0)
      // this.VATPurchasesForm.controls['ImportSubjectVatPaidforReverseChargeStepAmt'].setValue(0)
      // this.VATPurchasesForm.controls['ImportSubjectVatPaidforReverseChargeStepAdjustments'].setValue(0)
      // this.VATPurchasesForm.controls['ImportSubjectVatPaidforReverseChargeStepVAT'].setValue(0);
      //hema added on 13-11-2020 starts
    }, 500);
  }
  validateForms() {
    if (
      this.VATSalesForm.value.StandardRatedSales1 < 0 ||
      this.VATSalesForm.value.StandardRatedSales1 > 999999999999.99
    ) {
      this.VATSalesForm.value.StandardRatedSales1 = 0.0;
    }
    if (
      this.VATSalesForm.value.StandardRatedSales1Adjustment < 0 ||
      this.VATSalesForm.value.StandardRatedSales1Adjustment > 999999999999.99
    ) {
      this.VATSalesForm.patchValue({ StandardRatedSales1Adjustment: "0.00" });
    }

    if (
      this.VATSalesForm.value.PrivateHealthCareEducation < 0 ||
      this.VATSalesForm.value.PrivateHealthCareEducation > 999999999999.99
    ) {
      this.VATSalesForm.patchValue({ PrivateHealthCareEducation: "0.00" });
    }
    if (
      this.VATSalesForm.value.PrivateHealthCareEducationAdjustment < 0 ||
      this.VATSalesForm.value.PrivateHealthCareEducationAdjustment >
        999999999999.99
    ) {
      this.VATSalesForm.patchValue({
        PrivateHealthCareEducationAdjustment: "0.00",
      });
    }
    if (
      this.VATSalesForm.value.ZeroRatedDomesticSales < 0 ||
      this.VATSalesForm.value.ZeroRatedDomesticSales > 999999999999.99
    ) {
      this.VATSalesForm.patchValue({ ZeroRatedDomesticSales: "0.00" });
    }
    if (
      this.VATSalesForm.value.ZeroRatedDomesticSalesAdjustment < 0 ||
      this.VATSalesForm.value.ZeroRatedDomesticSalesAdjustment > 999999999999.99
    ) {
      this.VATSalesForm.patchValue({
        ZeroRatedDomesticSalesAdjustment: "0.00",
      });
    }
    if (
      this.VATSalesForm.value.Exports < 0 ||
      this.VATSalesForm.value.Exports > 999999999999.99
    ) {
      this.VATSalesForm.patchValue({ Exports: "0.00" });
    }
    if (
      this.VATSalesForm.value.ExportsAdjustment < 0 ||
      this.VATSalesForm.value.ExportsAdjustment > 999999999999.99
    ) {
      this.VATSalesForm.patchValue({ ExportsAdjustment: "0.00" });
    }
    if (
      this.VATSalesForm.value.ExemptSales < 0 ||
      this.VATSalesForm.value.ExemptSales > 999999999999.99
    ) {
      this.VATSalesForm.patchValue({ ExemptSales: "0.00" });
    }
    if (
      this.VATSalesForm.value.ExemptSalesAdjustment < 0 ||
      this.VATSalesForm.value.ExemptSalesAdjustment > 999999999999.99
    ) {
      this.VATSalesForm.patchValue({ ExemptSalesAdjustment: "0.00" });
    }
    if (
      this.VATSalesForm.value.salesSubjecttovat < 0 ||
      this.VATSalesForm.value.salesSubjecttovat > 999999999999.99
    ) {
      this.VATSalesForm.patchValue({ salesSubjecttovat: "0.00" });
    }
    if (
      this.VATSalesForm.value.salesSubjecttovatAdjustment < 0 ||
      this.VATSalesForm.value.salesSubjecttovatAdjustment > 999999999999.99
    ) {
      this.VATSalesForm.patchValue({ salesSubjecttovatAdjustment: "0.00" });
    }
    if (
      this.VATPurchasesForm.value.StandardRatedDomesticPurchases1 < 0 ||
      this.VATPurchasesForm.value.StandardRatedDomesticPurchases1 >
        999999999999.99
    ) {
      this.VATPurchasesForm.patchValue({
        StandardRatedDomesticPurchases1: "0.00",
      });
    }
    if (
      this.VATPurchasesForm.value.StandardRatedDomesticPurchases1Adjustment <
        0 ||
      this.VATPurchasesForm.value.StandardRatedDomesticPurchases1Adjustment >
        999999999999.99
    ) {
      this.VATPurchasesForm.patchValue({
        StandardRatedDomesticPurchases1Adjustment: "0.00",
      });
    }
    if (
      this.VATPurchasesForm.value.ImportSubjectVatPaidCustoms < 0 ||
      this.VATPurchasesForm.value.ImportSubjectVatPaidCustoms > 999999999999.99
    ) {
      this.VATPurchasesForm.patchValue({ ImportSubjectVatPaidCustoms: "0.00" });
    }
    if (
      this.VATPurchasesForm.value.ImportSubjectVatPaidCustomsAdjustments < 0 ||
      this.VATPurchasesForm.value.ImportSubjectVatPaidCustomsAdjustments >
        999999999999.99
    ) {
      this.VATPurchasesForm.patchValue({
        ImportSubjectVatPaidCustomsAdjustments: "0.00",
      });
    }
    if (
      this.VATPurchasesForm.value.ImportSubjectVatPaidforReverseCharge < 0 ||
      this.VATPurchasesForm.value.ImportSubjectVatPaidforReverseCharge >
        999999999999.99
    ) {
      this.VATPurchasesForm.patchValue({
        ImportSubjectVatPaidforReverseCharge: "0.00",
      });
    }
    if (
      this.VATPurchasesForm.value
        .ImportSubjectVatPaidforReverseChargeAdjustments < 0 ||
      this.VATPurchasesForm.value
        .ImportSubjectVatPaidforReverseChargeAdjustments > 999999999999.99
    ) {
      this.VATPurchasesForm.patchValue({
        ImportSubjectVatPaidforReverseChargeAdjustments: "0.00",
      });
    }
    if (
      this.VATPurchasesForm.value.ZeroRatedPurchases < 0 ||
      this.VATPurchasesForm.value.ZeroRatedPurchases > 999999999999.99
    ) {
      this.VATPurchasesForm.patchValue({ ZeroRatedPurchases: "0.00" });
    }
    if (
      this.VATPurchasesForm.value.ZeroRatedPurchasesAdjustments < 0 ||
      this.VATPurchasesForm.value.ZeroRatedPurchasesAdjustments >
        999999999999.99
    ) {
      this.VATPurchasesForm.patchValue({
        ZeroRatedPurchasesAdjustments: "0.00",
      });
    }
    if (
      this.VATPurchasesForm.value.ExemptPurchases < 0 ||
      this.VATPurchasesForm.value.ExemptPurchases > 999999999999.99
    ) {
      this.VATPurchasesForm.patchValue({ ExemptPurchases: "0.00" });
    }
    if (
      this.VATPurchasesForm.value.ExemptPurchasesAdjustment < 0 ||
      this.VATPurchasesForm.value.ExemptPurchasesAdjustment > 999999999999.99
    ) {
      this.VATPurchasesForm.patchValue({ ExemptPurchasesAdjustment: "0.00" });
    }
    if (
      this.VATPurchasesForm.value.PurchaseSubjectToVAT < 0 ||
      this.VATPurchasesForm.value.PurchaseSubjectToVAT > 999999999999.99
    ) {
      this.VATPurchasesForm.patchValue({ PurchaseSubjectToVAT: "0.00" });
    }
    if (
      this.VATPurchasesForm.value.PurchaseSubjectToVATAdjustment < 0 ||
      this.VATPurchasesForm.value.PurchaseSubjectToVATAdjustment >
        999999999999.99
    ) {
      this.VATPurchasesForm.patchValue({
        PurchaseSubjectToVATAdjustment: "0.00",
      });
    }
    if (
      this.VATPurchasesForm.value.ImportSubjectVatStepAmt < 0 ||
      this.VATPurchasesForm.value.ImportSubjectVatStepAmt > 999999999999.99
    ) {
      this.VATPurchasesForm.patchValue({ ImportSubjectVatStepAmt: "0.00" });
    }
    if (
      this.VATPurchasesForm.value.ImportSubjectVatStepAdjustments < 0 ||
      this.VATPurchasesForm.value.ImportSubjectVatStepAdjustments >
        999999999999.99
    ) {
      this.VATPurchasesForm.patchValue({
        ImportSubjectVatStepAdjustments: "0.00",
      });
    }
    if (
      this.VATPurchasesForm.value.ImportSubjectVatPaidforReverseChargeStepAmt <
        0 ||
      this.VATPurchasesForm.value.ImportSubjectVatPaidforReverseChargeStepAmt >
        999999999999.99
    ) {
      this.VATPurchasesForm.patchValue({
        ImportSubjectVatPaidforReverseChargeStepAmt: "0.00",
      });
    }
    if (
      this.VATPurchasesForm.value
        .ImportSubjectVatPaidforReverseChargeStepAdjustments < 0 ||
      this.VATPurchasesForm.value
        .ImportSubjectVatPaidforReverseChargeStepAdjustments > 999999999999.99
    ) {
      this.VATPurchasesForm.patchValue({
        ImportSubjectVatPaidforReverseChargeStepAdjustments: "0.00",
      });
    }

    this.VATSalesForm.controls["StandardRatedSales1"].setValue(
      parseFloat(this.VATSalesForm.value.StandardRatedSales1).toFixed(2)
    );
    this.VATSalesForm.controls["StandardRatedSales1Adjustment"].setValue(
      parseFloat(this.VATSalesForm.value.StandardRatedSales1Adjustment).toFixed(
        2
      )
    );
    this.VATSalesForm.controls["PrivateHealthCareEducation"].setValue(
      parseFloat(this.VATSalesForm.value.PrivateHealthCareEducation).toFixed(2)
    );
    this.VATSalesForm.controls["PrivateHealthCareEducationAdjustment"].setValue(
      parseFloat(
        this.VATSalesForm.value.PrivateHealthCareEducationAdjustment
      ).toFixed(2)
    );
    this.VATSalesForm.controls["ZeroRatedDomesticSales"].setValue(
      parseFloat(this.VATSalesForm.value.ZeroRatedDomesticSales).toFixed(2)
    );
    this.VATSalesForm.controls["ZeroRatedDomesticSalesAdjustment"].setValue(
      parseFloat(
        this.VATSalesForm.value.ZeroRatedDomesticSalesAdjustment
      ).toFixed(2)
    );
    this.VATSalesForm.controls["Exports"].setValue(
      parseFloat(this.VATSalesForm.value.Exports).toFixed(2)
    );
    this.VATSalesForm.controls["ExportsAdjustment"].setValue(
      parseFloat(this.VATSalesForm.value.ExportsAdjustment).toFixed(2)
    );
    this.VATSalesForm.controls["ExemptSales"].setValue(
      parseFloat(this.VATSalesForm.value.ExemptSales).toFixed(2)
    );
    this.VATSalesForm.controls["ExemptSalesAdjustment"].setValue(
      parseFloat(this.VATSalesForm.value.ExemptSalesAdjustment).toFixed(2)
    );
    this.VATSalesForm.controls["StandardRatedSales1VAT"].setValue(
      parseFloat(this.VATSalesForm.value.StandardRatedSales1VAT).toFixed(2)
    );
    this.VATSalesForm.controls["totalSales"].setValue(
      parseFloat(this.VATSalesForm.value.totalSales).toFixed(2)
    );
    this.VATSalesForm.controls["totalSalesAdjustment"].setValue(
      parseFloat(this.VATSalesForm.value.totalSalesAdjustment).toFixed(2)
    );
    this.VATSalesForm.controls["TotalVATonSales"].setValue(
      parseFloat(this.VATSalesForm.value.TotalVATonSales).toFixed(2)
    );
    this.VATSalesForm.controls["salesSubjecttovat"].setValue(
      parseFloat(this.VATSalesForm.value.salesSubjecttovat).toFixed(2)
    );
    this.VATSalesForm.controls["salesSubjecttovatAdjustment"].setValue(
      parseFloat(this.VATSalesForm.value.salesSubjecttovatAdjustment).toFixed(2)
    );
    this.VATSalesForm.controls["salesSubjecttovatVAT"].setValue(
      parseFloat(this.VATSalesForm.value.salesSubjecttovatVAT).toFixed(2)
    );

    this.VATPurchasesForm.controls["StandardRatedDomesticPurchases1"].setValue(
      parseFloat(
        this.VATPurchasesForm.value.StandardRatedDomesticPurchases1
      ).toFixed(2)
    );
    this.VATPurchasesForm.controls[
      "StandardRatedDomesticPurchases1Adjustment"
    ].setValue(
      parseFloat(
        this.VATPurchasesForm.value.StandardRatedDomesticPurchases1Adjustment
      ).toFixed(2)
    );
    this.VATPurchasesForm.controls["ImportSubjectVatPaidCustoms"].setValue(
      parseFloat(
        this.VATPurchasesForm.value.ImportSubjectVatPaidCustoms
      ).toFixed(2)
    );
    this.VATPurchasesForm.controls[
      "ImportSubjectVatPaidCustomsAdjustments"
    ].setValue(
      parseFloat(
        this.VATPurchasesForm.value.ImportSubjectVatPaidCustomsAdjustments
      ).toFixed(2)
    );
    this.VATPurchasesForm.controls[
      "ImportSubjectVatPaidforReverseCharge"
    ].setValue(
      parseFloat(
        this.VATPurchasesForm.value.ImportSubjectVatPaidforReverseCharge
      ).toFixed(2)
    );
    this.VATPurchasesForm.controls[
      "ImportSubjectVatPaidforReverseChargeAdjustments"
    ].setValue(
      parseFloat(
        this.VATPurchasesForm.value
          .ImportSubjectVatPaidforReverseChargeAdjustments
      ).toFixed(2)
    );
    this.VATPurchasesForm.controls["ZeroRatedPurchases"].setValue(
      parseFloat(this.VATPurchasesForm.value.ZeroRatedPurchases).toFixed(2)
    );
    this.VATPurchasesForm.controls["ZeroRatedPurchasesAdjustments"].setValue(
      parseFloat(
        this.VATPurchasesForm.value.ZeroRatedPurchasesAdjustments
      ).toFixed(2)
    );
    this.VATPurchasesForm.controls["ExemptPurchases"].setValue(
      parseFloat(this.VATPurchasesForm.value.ExemptPurchases).toFixed(2)
    );
    this.VATPurchasesForm.controls["ExemptPurchasesAdjustment"].setValue(
      parseFloat(this.VATPurchasesForm.value.ExemptPurchasesAdjustment).toFixed(
        2
      )
    );
    this.VATPurchasesForm.controls[
      "StandardRatedDomesticPurchases1VAT"
    ].setValue(
      parseFloat(
        this.VATPurchasesForm.value.StandardRatedDomesticPurchases1VAT
      ).toFixed(2)
    );
    this.VATPurchasesForm.controls["totalPurchases"].setValue(
      parseFloat(this.VATPurchasesForm.value.totalPurchases).toFixed(2)
    );
    this.VATPurchasesForm.controls["totalPurchasesAdjustment"].setValue(
      parseFloat(this.VATPurchasesForm.value.totalPurchasesAdjustment).toFixed(
        2
      )
    );
    this.VATPurchasesForm.controls["totalVATOnPurchases"].setValue(
      parseFloat(this.VATPurchasesForm.value.totalVATOnPurchases).toFixed(2)
    );
    this.VATPurchasesForm.controls["ImportSubjectVatPaidCustoms1VAT"].setValue(
      parseFloat(
        this.VATPurchasesForm.value.ImportSubjectVatPaidCustoms1VAT
      ).toFixed(2)
    );
    this.VATPurchasesForm.controls[
      "ImportSubjectVatPaidforReverseCharge1VAT"
    ].setValue(
      parseFloat(
        this.VATPurchasesForm.value.ImportSubjectVatPaidforReverseCharge1VAT
      ).toFixed(2)
    );
    this.VATPurchasesForm.controls["PurchaseSubjectToVAT"].setValue(
      parseFloat(this.VATPurchasesForm.value.PurchaseSubjectToVAT).toFixed(2)
    );
    this.VATPurchasesForm.controls["PurchaseSubjectToVATAdjustment"].setValue(
      parseFloat(
        this.VATPurchasesForm.value.PurchaseSubjectToVATAdjustment
      ).toFixed(2)
    );
    this.VATPurchasesForm.controls["PurchaseSubjectToVATVAT"].setValue(
      parseFloat(this.VATPurchasesForm.value.PurchaseSubjectToVATVAT).toFixed(2)
    );
    this.VATPurchasesForm.controls["ImportSubjectVatStepAmt"].setValue(
      parseFloat(this.VATPurchasesForm.value.ImportSubjectVatStepAmt).toFixed(2)
    );
    this.VATPurchasesForm.controls["ImportSubjectVatStepAdjustments"].setValue(
      parseFloat(
        this.VATPurchasesForm.value.ImportSubjectVatStepAdjustments
      ).toFixed(2)
    );
    this.VATPurchasesForm.controls["ImportSubjectVatStepVAT"].setValue(
      parseFloat(this.VATPurchasesForm.value.ImportSubjectVatStepVAT).toFixed(2)
    );
    this.VATPurchasesForm.controls[
      "ImportSubjectVatPaidforReverseChargeStepAmt"
    ].setValue(
      parseFloat(
        this.VATPurchasesForm.value.ImportSubjectVatPaidforReverseChargeStepAmt
      ).toFixed(2)
    );
    this.VATPurchasesForm.controls[
      "ImportSubjectVatPaidforReverseChargeStepAdjustments"
    ].setValue(
      parseFloat(
        this.VATPurchasesForm.value
          .ImportSubjectVatPaidforReverseChargeStepAdjustments
      ).toFixed(2)
    );
    this.VATPurchasesForm.controls[
      "ImportSubjectVatPaidforReverseChargeStepVAT"
    ].setValue(
      parseFloat(
        this.VATPurchasesForm.value.ImportSubjectVatPaidforReverseChargeStepVAT
      ).toFixed(2)
    );

    this.VATSalesCalculation();
    this.VATPurchasesCalculation();
  }

  VATSalesCalculation() {
    if (this.VATSalesForm.value.StandardRatedSales1) {
      this.VATSalesForm.controls["StandardRatedSales1VAT"].setValue(
        ((this.VATSalesForm.value.StandardRatedSales1 -
          this.VATSalesForm.value.StandardRatedSales1Adjustment) *
          this.steppercentage) /
          100
      );
    }
    //golive flag as x and he choosed yes for 5% discount
    if (this.VATSalesForm.value.salesSubjecttovat) {
      this.VATSalesForm.controls["salesSubjecttovatVAT"].setValue(
        ((this.VATSalesForm.value.salesSubjecttovat -
          this.VATSalesForm.value.salesSubjecttovatAdjustment) *
          5) /
          100
      );
    }
    this.VATSalesForm.controls["TotalVATonSales"].setValue(
      +this.VATSalesForm.value.StandardRatedSales1VAT +
        +this.VATSalesForm.value.salesSubjecttovatVAT
    );
    this.TotalSalesCalculation();
    this.TotalAdjustmentCalculation();
  }

  VATPurchasesCalculation() {
    if (this.VATPurchasesForm.value.StandardRatedDomesticPurchases1) {
      this.VATPurchasesForm.controls[
        "StandardRatedDomesticPurchases1VAT"
      ].setValue(
        ((this.VATPurchasesForm.value.StandardRatedDomesticPurchases1 -
          this.VATPurchasesForm.value
            .StandardRatedDomesticPurchases1Adjustment) *
          this.steppercentage) /
          100
      );
    }
    if (this.VATPurchasesForm.value.ImportSubjectVatPaidCustoms) {
      if (this.vatDetailsObj["ImporterFg"] == "") {
        this.VATPurchasesForm.controls[
          "ImportSubjectVatPaidCustoms1VAT"
        ].setValue(
          ((this.VATPurchasesForm.value.ImportSubjectVatPaidCustoms -
            this.VATPurchasesForm.value
              .ImportSubjectVatPaidCustomsAdjustments) *
            this.steppercentage) /
            100
        );
      } else {
        this.VATPurchasesForm.controls[
          "ImportSubjectVatPaidCustoms1VAT"
        ].setValue(
          (this.VATPurchasesForm.value.ImportSubjectVatPaidCustomsAdjustments *
            this.steppercentage) /
            100
        );
      }
    }
    if (this.VATPurchasesForm.value.ImportSubjectVatPaidforReverseCharge) {
      this.VATPurchasesForm.controls[
        "ImportSubjectVatPaidforReverseCharge1VAT"
      ].setValue(
        (this.VATPurchasesForm.value
          .ImportSubjectVatPaidforReverseChargeAdjustments *
          this.steppercentage) /
          100
      );
    }
    //golive flag as x and he choosed yes for 5% discount
    if (this.VATPurchasesForm.value.PurchaseSubjectToVAT) {
      this.VATPurchasesForm.controls["PurchaseSubjectToVATVAT"].setValue(
        ((this.VATPurchasesForm.value.PurchaseSubjectToVAT -
          this.VATPurchasesForm.value.PurchaseSubjectToVATAdjustment) *
          5) /
          100
      );
    }
    if (this.VATPurchasesForm.value.ImportSubjectVatStepAmt) {
      if (this.vatDetailsObj["ImporterFg"] == "") {
        this.VATPurchasesForm.controls["ImportSubjectVatStepVAT"].setValue(
          ((this.VATPurchasesForm.value.ImportSubjectVatStepAmt -
            this.VATPurchasesForm.value.ImportSubjectVatStepAdjustments) *
            5) /
            100
        );
      } else {
        this.VATPurchasesForm.controls["ImportSubjectVatStepVAT"].setValue(
          (this.VATPurchasesForm.value.ImportSubjectVatStepAdjustments * 5) /
            100
        );
      }
    }
    if (
      this.VATPurchasesForm.value.ImportSubjectVatPaidforReverseChargeStepAmt
    ) {
      this.VATPurchasesForm.controls[
        "ImportSubjectVatPaidforReverseChargeStepVAT"
      ].setValue(
        (this.VATPurchasesForm.value
          .ImportSubjectVatPaidforReverseChargeStepAdjustments *
          5) /
          100
      );
    }
    let totalpurchaseVAT =
      +this.VATPurchasesForm.value.StandardRatedDomesticPurchases1VAT +
      +this.VATPurchasesForm.value.ImportSubjectVatPaidCustoms1VAT +
      +this.VATPurchasesForm.value.ImportSubjectVatPaidforReverseCharge1VAT +
      +this.VATPurchasesForm.value.PurchaseSubjectToVATVAT +
      +this.VATPurchasesForm.value.ImportSubjectVatStepVAT +
      +this.VATPurchasesForm.value.ImportSubjectVatPaidforReverseChargeStepVAT;
    this.TotalPurchasesCalculation();
    this.TotalPurchasesAdjustments();
    this.VATPurchasesForm.controls["totalVATOnPurchases"].setValue(
      parseFloat(totalpurchaseVAT.toString()).toFixed(2)
    );
  }

  ExtrataxCalculation() {
    if (this.extratax == "no") {
      console.log("extra", this.extratax);
      this.VATSalesForm.patchValue({ salesSubjecttovat: 0.0 });
      this.VATSalesForm.patchValue({ salesSubjecttovatAdjustment: 0.0 });
      this.VATSalesForm.patchValue({ salesSubjecttovatVAT: 0.0 });
      this.VATPurchasesForm.patchValue({ PurchaseSubjectToVAT: 0.0 });
      this.VATPurchasesForm.patchValue({ PurchaseSubjectToVATAdjustment: 0.0 });
      this.VATPurchasesForm.patchValue({ ImportSubjectVatStepAmt: 0.0 });
      this.VATPurchasesForm.patchValue({
        ImportSubjectVatStepAdjustments: 0.0,
      });
      this.VATPurchasesForm.patchValue({
        ImportSubjectVatPaidforReverseChargeStepAmt: 0.0,
      });
      this.VATPurchasesForm.patchValue({
        ImportSubjectVatPaidforReverseChargeStepAdjustments: 0.0,
      });
      this.VATPurchasesForm.patchValue({ PurchaseSubjectToVATVAT: 0.0 });
      this.VATPurchasesForm.patchValue({ ImportSubjectVatStepVAT: 0.0 });
      this.VATPurchasesForm.patchValue({
        ImportSubjectVatPaidforReverseChargeStepVAT: 0.0,
      });
      this.VATSalesCalculation();
      this.VATPurchasesCalculation();
    } else {
      this.validateForms();
    }
  }

  GetUserDetails() {
    this.vatService.getVatData().subscribe((res) => {
      console.log("getVatData", res["d"]);
      this.vatObject = res;
      //this.GetVats();
      this.VatDetails({
        Status: this.RetrunObjStatus,
        Euser: "0000000000000000000000" + this.vatObject["d"]["Gpartz"],
        Fbguid: this.Fbguid,
        Gpart: this.vatObject["d"]["Gpartz"],
      });
    });
  }
  GetVats() {
    this.returnsService
      .getVats(
        this.vatObject["d"]["Fbnumz"],
        this.vatObject["d"]["Gpartz"],
        this.vatObject["d"]["Euser"],
        this.vatObject["d"]["Fbguid"]
      )
      .subscribe((data) => {
        if (data["d"]["ICR_LISTSet"]["results"]) {
          this.VatReturnsDuplicate = data["d"]["ICR_LISTSet"]["results"] || [];
          this.VatReturns = data["d"]["ICR_LISTSet"]["results"] || [];
          console.log(this.VatReturns);
          this.StatusesSet = data["d"]["ICR_STATUSSet"]["results"] || [];
          console.log(this.StatusesSet);
          this.FilterVats();

          // let selectedVat=this.VatReturns.filter((vatReturn)=>{
          //   console.log("vatReturn",vatReturn,vatReturn.Fbguid==this.Fbguid)
          //   if(vatReturn.Fbguid==this.Fbguid){
          //     return true;
          //   }

          // });

          // console.log("selectedVat",selectedVat);
          // if(selectedVat.length>0){
          //   this.VatDetails(selectedVat[0]);
          // }
        }
      });
  }
  // FilterVats()
  // {
  //   var startDate = moment(this.fromdate, "YYYY-MM-DD");
  //   var endDate = moment(this.todate, "YYYY-MM-DD");
  //   if(this.status!= 'All')
  //   {
  //     this.VatReturns = this.VatReturnsDuplicate.filter((data)=>{
  //       console.log(data);
  //       var fileddate=moment(moment(data["DueDtC"],'DD/MM/YYYY'),'YYYY-MM-DD');
  //       if((this.fromdate.toString()!='') && (this.todate.toString()!=''))
  //       {
  //         return (data["StatusTxt"].toString().toLowerCase()== this.status.toLowerCase()) && (fileddate.diff(startDate, 'days')>0) && (endDate.diff(fileddate, 'days')>0)
  //       }
  //       else if(this.status=='')
  //       {
  //         return (fileddate.diff(startDate, 'days')>0) && (endDate.diff(fileddate, 'days')>0)
  //       }
  //       else{
  //         return data["StatusTxt"].toString().toLowerCase()== this.status.toLowerCase()
  //       }
  //     })
  //   }

  //   else {
  //     this.VatReturns = this.VatReturnsDuplicate;
  //   }
  //   // this.fromdate='';
  //   // this.todate='';
  //   // this.status='';

  // }

  FilterVats() {
    console.log("hi");
    var startDate = moment(this.fromdate, "YYYY-MM-DD");
    var endDate = moment(this.todate, "YYYY-MM-DD");
    if (this.status != "All") {
      this.VatReturns = this.VatReturnsDuplicate.filter((data) => {
        console.log(data);
        var fileddate = moment(
          moment(data["DueDtC"], "DD/MM/YYYY"),
          "YYYY-MM-DD"
        );
        if (this.fromdate.toString() != "" && this.todate.toString() != "") {
          return (
            data["StatusTxt"].toString().toLowerCase() ==
              this.status.toLowerCase() &&
            fileddate.diff(startDate, "days") > 0 &&
            endDate.diff(fileddate, "days") > 0
          );
        } else if (this.status == "") {
          return (
            fileddate.diff(startDate, "days") > 0 &&
            endDate.diff(fileddate, "days") > 0
          );
        } else {
          return (
            data["StatusTxt"].toString().toLowerCase() ==
            this.status.toLowerCase()
          );
        }
      });
    } else {
      //this.VatReturns = this.VatReturnsDuplicate;
      console.log(this.fromdate == "", this.todate == "");
      this.VatReturns = this.VatReturnsDuplicate.filter((data) => {
        var fileddate = moment(
          moment(data["DueDtC"], "DD/MM/YYYY"),
          "YYYY-MM-DD"
        );
        if (this.fromdate.toString() != "" && this.todate.toString() != "") {
          return (
            fileddate.diff(startDate, "days") > 0 &&
            endDate.diff(fileddate, "days") > 0
          );
        } else {
          return data;
        }
      });
    }
    // this.fromdate='';
    // this.todate='';
    // this.status='';
  }
  TaxPayerDetails(vatobj) {
    console.log(vatobj);
    this.returnsService
      .getTaxPayerDetails(vatobj["Euser"], vatobj["Fbguid"])
      .subscribe((data) => {
        console.log(data);
        this.totalsModal = false;
        this.totalModal = false;
        this.isAmendment = false;
        this.vatDetailsObj = data["d"];
        this.taxPayerDetails = data["d"];
        // if(this.language == 'ar') {
        //   moment.locale('ar-Sa');
        // }
        // else {
        //   moment.locale('en-Us');

        // }
        //if it is X need to show yes or no value
        this.goLiveflg = this.vatDetailsObj["GoliveFg"];
        //this is the yes or no value for 5%
        this.IBanksSet = this.vatDetailsObj["IBANSet"]["results"] || [];
        for (let i = 0; i < this.IBanksSet.length; i++) {
          this.bankCode = this.IBanksSet[i].Iban.substring(4, 6);
          console.log("Bankcode", this.bankCode);
          this.returnsService
            .getIbanDetails(this.bankCode)
            .subscribe((data) => {
              console.log("Iban", data);
              this.bankLogo = data["d"]["results"][0];
              let obj = {
                code: this.bankLogo.Bnkcd,
                Iban: this.IBanksSet[i].Iban,
                Logo: this.transform(
                  "data:image/svg+xml;base64," + this.bankLogo.LogoBid
                ),
                bankName: this.bankLogo.Descr,
              };
              this.bankSet.push(obj);
              console.log("bankset", this.bankSet);
            });
        }

        this.PreviousCredits =
          this.vatDetailsObj["CFSet"]["results"] || "No data";
        this.firstDate = new Date("1 July 2020");
        this.secondDate = +this.taxPayerDetails.Abrzu.replace(")", "")
          .toString()
          .replace("/Date(", "")
          .toString()
          .replace("/", "");
        var timeDiff = this.firstDate.getTime() - this.secondDate;
        var diff = timeDiff / (1000 * 3600 * 24);
        console.log(diff);
        this.steppercentage = diff < 0 ? 15 : 5;
        if (this.vatDetailsObj["GoliveFg"] == "") {
          this.VATSalesForm.controls["StandardRatedSales1"].setValue(
            this.vatDetailsObj["StdsalesAmt"] || 0.0
          );
          this.VATSalesForm.controls["StandardRatedSales1Adjustment"].setValue(
            this.vatDetailsObj["StdsalesAdj"] || 0.0
          );
          this.VATSalesForm.controls["StandardRatedSales1VAT"].setValue(
            this.vatDetailsObj["StdsalesVat"] || 0.0
          );
          this.VATPurchasesForm.controls[
            "StandardRatedDomesticPurchases1"
          ].setValue(this.vatDetailsObj["StdpurchaseAmt"] || 0.0);
          this.VATPurchasesForm.controls[
            "StandardRatedDomesticPurchases1Adjustment"
          ].setValue(this.vatDetailsObj["StdpurchaseAdj"] || 0.0);
          this.VATPurchasesForm.controls[
            "StandardRatedDomesticPurchases1VAT"
          ].setValue(this.vatDetailsObj["StdpurchasesVat"] || 0.0);
          this.VATPurchasesForm.controls[
            "ImportSubjectVatPaidCustoms"
          ].setValue(this.vatDetailsObj["ImportspaidAmt"] || 0.0);
          this.VATPurchasesForm.controls[
            "ImportSubjectVatPaidCustomsAdjustments"
          ].setValue(this.vatDetailsObj["ImportspaidAdj"] || 0.0);
          this.VATPurchasesForm.controls["ImportSubjectVatStepVAT"].setValue(
            this.vatDetailsObj["ImportspaidVat"] || 0.0
          );
          this.VATPurchasesForm.controls[
            "ImportSubjectVatPaidforReverseCharge"
          ].setValue(this.vatDetailsObj["ImportsaccAmt"] || 0.0);
          this.VATPurchasesForm.controls[
            "ImportSubjectVatPaidforReverseChargeAdjustments"
          ].setValue(this.vatDetailsObj["ImportsaccAdj"] || 0.0);
          this.VATPurchasesForm.controls[
            "ImportSubjectVatPaidforReverseCharge1VAT"
          ].setValue(this.vatDetailsObj["ImportsaccVat"] || 0.0);
        } else {
          this.VATSalesForm.controls["StandardRatedSales1"].setValue(
            this.vatDetailsObj["VATPERITEMSet"]["results"][0]["StdsalesAmt"] ||
              0.0
          );
          this.VATSalesForm.controls["StandardRatedSales1Adjustment"].setValue(
            this.vatDetailsObj["VATPERITEMSet"]["results"][0]["StdsalesAdj"] ||
              0.0
          );
          this.VATSalesForm.controls["StandardRatedSales1VAT"].setValue(
            this.vatDetailsObj["VATPERITEMSet"]["results"][0]["StdsalesVat"] ||
              0.0
          );
          this.VATSalesForm.controls["salesSubjecttovat"].setValue(
            this.vatDetailsObj["VATPERITEMSet"]["results"][1]["StdsalesAmt"] ||
              0.0
          );
          this.VATSalesForm.controls["salesSubjecttovatAdjustment"].setValue(
            this.vatDetailsObj["VATPERITEMSet"]["results"][1]["StdsalesAdj"] ||
              0.0
          );
          this.VATSalesForm.controls["salesSubjecttovatVAT"].setValue(
            this.vatDetailsObj["VATPERITEMSet"]["results"][1]["StdsalesVat"] ||
              0.0
          );
          this.VATPurchasesForm.controls[
            "StandardRatedDomesticPurchases1"
          ].setValue(
            this.vatDetailsObj["VATPERITEMSet"]["results"][0][
              "StdpurchaseAmt"
            ] || 0.0
          );
          this.VATPurchasesForm.controls[
            "StandardRatedDomesticPurchases1Adjustment"
          ].setValue(
            this.vatDetailsObj["VATPERITEMSet"]["results"][0][
              "StdpurchaseAdj"
            ] || 0.0
          );
          this.VATPurchasesForm.controls[
            "StandardRatedDomesticPurchases1VAT"
          ].setValue(
            this.vatDetailsObj["VATPERITEMSet"]["results"][0][
              "StdpurchasesVat"
            ] || 0.0
          );
          this.VATPurchasesForm.controls["PurchaseSubjectToVAT"].setValue(
            this.vatDetailsObj["VATPERITEMSet"]["results"][1][
              "StdpurchaseAmt"
            ] || 0.0
          );
          this.VATPurchasesForm.controls[
            "PurchaseSubjectToVATAdjustment"
          ].setValue(
            this.vatDetailsObj["VATPERITEMSet"]["results"][1][
              "StdpurchaseAdj"
            ] || 0.0
          );
          this.VATPurchasesForm.controls["PurchaseSubjectToVATVAT"].setValue(
            this.vatDetailsObj["VATPERITEMSet"]["results"][1][
              "StdpurchasesVat"
            ] || 0.0
          );
          this.VATPurchasesForm.controls[
            "ImportSubjectVatPaidCustoms"
          ].setValue(
            this.vatDetailsObj["VATPERITEMSet"]["results"][0][
              "ImportspaidAmt"
            ] || 0.0
          );
          this.VATPurchasesForm.controls[
            "ImportSubjectVatPaidCustomsAdjustments"
          ].setValue(
            this.vatDetailsObj["VATPERITEMSet"]["results"][0][
              "ImportspaidAdj"
            ] || 0.0
          );
          this.VATPurchasesForm.controls["ImportSubjectVatStepVAT"].setValue(
            this.vatDetailsObj["VATPERITEMSet"]["results"][0][
              "ImportspaidVat"
            ] || 0.0
          );
          this.VATPurchasesForm.controls["ImportSubjectVatStepAmt"].setValue(
            this.vatDetailsObj["VATPERITEMSet"]["results"][1][
              "ImportspaidAmt"
            ] || 0.0
          );
          this.VATPurchasesForm.controls[
            "ImportSubjectVatStepAdjustments"
          ].setValue(
            this.vatDetailsObj["VATPERITEMSet"]["results"][1][
              "ImportspaidAdj"
            ] || 0.0
          );
          this.VATPurchasesForm.controls["ImportSubjectVatStepVAT"].setValue(
            this.vatDetailsObj["VATPERITEMSet"]["results"][1][
              "ImportspaidVat"
            ] || 0.0
          );
          this.VATPurchasesForm.controls[
            "ImportSubjectVatPaidforReverseCharge"
          ].setValue(
            this.vatDetailsObj["VATPERITEMSet"]["results"][0][
              "ImportsaccAmt"
            ] || 0.0
          );
          this.VATPurchasesForm.controls[
            "ImportSubjectVatPaidforReverseChargeAdjustments"
          ].setValue(
            this.vatDetailsObj["VATPERITEMSet"]["results"][0][
              "ImportsaccAdj"
            ] || 0.0
          );
          this.VATPurchasesForm.controls[
            "ImportSubjectVatPaidforReverseCharge1VAT"
          ].setValue(
            this.vatDetailsObj["VATPERITEMSet"]["results"][0][
              "ImportsaccVat"
            ] || 0.0
          );
          this.VATPurchasesForm.controls[
            "ImportSubjectVatPaidforReverseChargeStepAmt"
          ].setValue(
            this.vatDetailsObj["VATPERITEMSet"]["results"][1][
              "ImportsaccAmt"
            ] || 0.0
          );
          this.VATPurchasesForm.controls[
            "ImportSubjectVatPaidforReverseChargeStepAdjustments"
          ].setValue(
            this.vatDetailsObj["VATPERITEMSet"]["results"][1][
              "ImportsaccAdj"
            ] || 0.0
          );
          this.VATPurchasesForm.controls[
            "ImportSubjectVatPaidforReverseChargeStepVAT"
          ].setValue(
            this.vatDetailsObj["VATPERITEMSet"]["results"][1][
              "ImportsaccVat"
            ] || 0.0
          );
        }
        this.VATSalesForm.controls["PrivateHealthCareEducation"].setValue(
          this.vatDetailsObj["SalesGccAmt"] || 0.0
        );
        this.VATSalesForm.controls[
          "PrivateHealthCareEducationAdjustment"
        ].setValue(this.vatDetailsObj["SalesGccAdj"] || 0.0);
        this.VATSalesForm.controls["ZeroRatedDomesticSales"].setValue(
          this.vatDetailsObj["ZerosalesAmt"] || 0.0
        );
        this.VATSalesForm.controls["ZeroRatedDomesticSalesAdjustment"].setValue(
          this.vatDetailsObj["ZerosalesAdj"] || 0.0
        );
        this.VATSalesForm.controls["Exports"].setValue(
          this.vatDetailsObj["ExportsAmt"] || 0.0
        );
        this.VATSalesForm.controls["ExportsAdjustment"].setValue(
          this.vatDetailsObj["ExportsAdj"] || 0.0
        );
        this.VATSalesForm.controls["ExemptSales"].setValue(
          this.vatDetailsObj["ExemptsalesAmt"] || 0.0
        );
        this.VATSalesForm.controls["ExemptSalesAdjustment"].setValue(
          this.vatDetailsObj["ExemptsalesAdj"] || 0.0
        );
        this.VATSalesForm.controls["totalSales"].setValue(
          this.vatDetailsObj["TotalsalesAmt"] || 0.0
        );
        this.VATSalesForm.controls["totalSalesAdjustment"].setValue(
          this.vatDetailsObj["TotalsalesAdj"] || 0.0
        );
        this.VATSalesForm.controls["TotalVATonSales"].setValue(
          this.vatDetailsObj["TotalsalesVat"] || 0.0
        );

        this.VATPurchasesForm.controls["ZeroRatedPurchases"].setValue(
          this.vatDetailsObj["ZeropurchaseAmt"] || 0.0
        );
        this.VATPurchasesForm.controls[
          "ZeroRatedPurchasesAdjustments"
        ].setValue(this.vatDetailsObj["ZeropurchaseAdj"] || 0.0);
        this.VATPurchasesForm.controls["ExemptPurchases"].setValue(
          this.vatDetailsObj["ExemptpurchaseAmt"] || 0.0
        );
        this.VATPurchasesForm.controls["ExemptPurchasesAdjustment"].setValue(
          this.vatDetailsObj["ExemptpurchaseAdj"] || 0.0
        );
        this.VATPurchasesForm.controls["totalPurchases"].setValue(
          this.vatDetailsObj["TotalpurchaseAmt"] || 0.0
        );
        this.VATPurchasesForm.controls["totalPurchasesAdjustment"].setValue(
          this.vatDetailsObj["TotalpurchaseAdj"] || 0.0
        );
        this.VATPurchasesForm.controls["totalVATOnPurchases"].setValue(
          this.vatDetailsObj["TotalpurchaseVat"] || 0.0
        );
        this.extratax = this.vatDetailsObj["Yesno"] == "X" ? "yes" : "no";
        console.log(
          this.taxPayerDetails["TxnTp"],
          this.taxPayerDetails["Periodkey"]
        );
        this.getReturnDetails(
          vatobj,
          this.taxPayerDetails["TxnTpz"],
          this.taxPayerDetails["Periodkeyz"]
        );
        console.log(this.taxPayerDetails["Gpartz"]);
        this.CorrectionPenality = this.vatDetailsObj["Preperiodcorr"];
        this.calculateVat();
        this.notesAttached = "";
        console.log(this.vatDetailsObj);
        if (this.vatDetailsObj["NOTESSet"]["results"].length > 0) {
          for (
            let i = 0;
            i < this.vatDetailsObj["NOTESSet"]["results"].length;
            i++
          ) {
            this.notesAttached =
              this.notesAttached +
              this.vatDetailsObj["NOTESSet"]["results"][i].Strline;
          }
        }
      });
  }

  VatDetails(vatobj) {
    this.StatusTxt = vatobj["Status"];
    this.TaxPayerDetails(vatobj);
    window.scrollTo(0, 0);
    this.step = 1;
    this.VatDetailsScreen = true;
    this.disableInputs = false;
    this.voidReturn = false;
    //hema added on 13-11-2020
    this.reviewModalShows = false;
    //hema added on 13-11-2020

    if (
      vatobj["Status"] == "E0055" ||
      vatobj["Status"] == "E0045" ||
      vatobj["Status"] == "E0006"
    ) {
      this.step = 8;
      this.VATSalesForm.disable();
      this.VATPurchasesForm.disable();
      this.disableInputs = true;
    }
    // else {
    //   this.disableInputs = false;
    //   console.log(this.disableInputs);
    // }
  }
  getReturnDetails(vatobj, TxnTp, Periodkey) {
    console.log("getReturnDetails", TxnTp, Periodkey);
    this.returnsService
      .getReturnDetails(vatobj["Gpart"], vatobj["Status"], TxnTp, Periodkey)
      .subscribe((data) => {
        console.log(data);
        data["d"]["ITUDSet"]["results"].filter((data) => {
          if (data.Fbtyp == "VATR" && data.SourceFg == "1") {
            if (this.language == "ar") {
              this.urlPortal =
                "https://gazt.gov.sa/ar/HelpCenter/FAQs/Pages/FAQArchiveEservices.aspx";
            } else {
              this.urlPortal =
                "https://gazt.gov.sa/en/HelpCenter/FAQs/Pages/FAQArchiveEservices.aspx";
            }
          }
        });
        this.grpSet = data["d"]["IGRTSet"]["results"];
        this.grpSet.forEach((data) => {
          if (data.GrpNo == this.vatDetailsObj["GrpNo"]) {
            this.RateTrtmt = data.RateTrtmt;
          }
        });
      });
  }
  TotalSalesCalculation() {
    let totalsales =
      +this.VATSalesForm.value.StandardRatedSales1 +
      +this.VATSalesForm.value.PrivateHealthCareEducation +
      +this.VATSalesForm.value.ZeroRatedDomesticSales +
      +this.VATSalesForm.value.Exports +
      +this.VATSalesForm.value.ExemptSales +
      +this.VATSalesForm.value.salesSubjecttovat;
    this.VATSalesForm.controls["totalSales"].setValue(totalsales);
  }
  TotalAdjustmentCalculation() {
    let totalsalesadjustment =
      +this.VATSalesForm.value.StandardRatedSales1Adjustment +
      +this.VATSalesForm.value.PrivateHealthCareEducationAdjustment +
      +this.VATSalesForm.value.ZeroRatedDomesticSalesAdjustment +
      +this.VATSalesForm.value.ExportsAdjustment +
      (+this.VATSalesForm.value.ExemptSalesAdjustment +
        +this.VATSalesForm.value.salesSubjecttovatAdjustment);
    this.VATSalesForm.controls["totalSalesAdjustment"].setValue(
      totalsalesadjustment
    );
  }

  TotalPurchasesCalculation() {
    let totalPurchases =
      +this.VATPurchasesForm.value.StandardRatedDomesticPurchases1 +
      +this.VATPurchasesForm.value.ImportSubjectVatPaidCustoms +
      +this.VATPurchasesForm.value.ImportSubjectVatPaidforReverseCharge +
      +this.VATPurchasesForm.value.ZeroRatedPurchases +
      (+this.VATPurchasesForm.value.ExemptPurchases +
        +this.VATPurchasesForm.value.PurchaseSubjectToVAT +
        +this.VATPurchasesForm.value.ImportSubjectVatStepAmt +
        +this.VATPurchasesForm.value
          .ImportSubjectVatPaidforReverseChargeStepAmt);
    this.VATPurchasesForm.controls["totalPurchases"].setValue(totalPurchases);
  }

  TotalPurchasesAdjustments() {
    let totalPurchasesAdjustment =
      +this.VATPurchasesForm.value.StandardRatedDomesticPurchases1Adjustment +
      +this.VATPurchasesForm.value.ImportSubjectVatPaidCustomsAdjustments +
      +this.VATPurchasesForm.value
        .ImportSubjectVatPaidforReverseChargeAdjustments +
      +this.VATPurchasesForm.value.ZeroRatedPurchasesAdjustments +
      (+this.VATPurchasesForm.value.ExemptPurchasesAdjustment +
        +this.VATPurchasesForm.value.PurchaseSubjectToVATAdjustment +
        +this.VATPurchasesForm.value.ImportSubjectVatStepAdjustments +
        +this.VATPurchasesForm.value
          .ImportSubjectVatPaidforReverseChargeStepAdjustments);
    this.VATPurchasesForm.controls["totalPurchasesAdjustment"].setValue(
      totalPurchasesAdjustment
    );
  }

  getPenalityUserDetails() {
    //this.vatDetailsObj["Operationz"]="05";
    this.vatDetailsObj["FldNm"] = "20";
    this.vatDetailsObj["Block"] = "2";
    this.vatDetailsObj["StepNumberz"] = "2";
    this.vatDetailsObj["Langz"] = "EN";
    this.vatDetailsObj["ConfStp2"] = "1";
    this.vatDetailsObj["TcFlg"] = "1";
    this.vatDetailsObj["TcFg"] = "1";
    if (this.vatDetailsObj["GoliveFg"] == "") {
      this.vatDetailsObj[
        "StdsalesAmt"
      ] = this.VATSalesForm.value.StandardRatedSales1.toString();
      this.vatDetailsObj[
        "StdsalesAdj"
      ] = this.VATSalesForm.value.StandardRatedSales1Adjustment.toString();
      this.vatDetailsObj[
        "StdsalesVat"
      ] = this.VATSalesForm.value.StandardRatedSales1VAT.toString();
    } else {
      this.vatDetailsObj[
        "StdsalesAmt"
      ] = this.VATSalesForm.value.StandardRatedSales1.toString();
      this.vatDetailsObj[
        "StdsalesAdj"
      ] = this.VATSalesForm.value.StandardRatedSales1Adjustment.toString();
      this.vatDetailsObj[
        "StdsalesVat"
      ] = this.VATSalesForm.value.StandardRatedSales1VAT.toString();
      this.vatDetailsObj["VATPERITEMSet"]["results"][0][
        "StdsalesAmt"
      ] = this.VATSalesForm.value.StandardRatedSales1.toString();
      this.vatDetailsObj["VATPERITEMSet"]["results"][0][
        "StdsalesAdj"
      ] = this.VATSalesForm.value.StandardRatedSales1Adjustment.toString();
      this.vatDetailsObj["VATPERITEMSet"]["results"][0][
        "StdsalesVat"
      ] = this.VATSalesForm.value.StandardRatedSales1VAT.toString();
      this.vatDetailsObj["VATPERITEMSet"]["results"][1][
        "StdsalesAmt"
      ] = this.VATSalesForm.value.salesSubjecttovat.toString();
      this.vatDetailsObj["VATPERITEMSet"]["results"][1][
        "StdsalesAdj"
      ] = this.VATSalesForm.value.salesSubjecttovatAdjustment.toString();
      this.vatDetailsObj["VATPERITEMSet"]["results"][1][
        "StdsalesVat"
      ] = this.VATSalesForm.value.salesSubjecttovatVAT.toString();
    }

    this.vatDetailsObj[
      "SalesGccAmt"
    ] = this.VATSalesForm.value.PrivateHealthCareEducation.toString();
    this.vatDetailsObj[
      "SalesGccAdj"
    ] = this.VATSalesForm.value.PrivateHealthCareEducationAdjustment.toString();
    this.vatDetailsObj[
      "ZerosalesAmt"
    ] = this.VATSalesForm.value.ZeroRatedDomesticSales.toString();
    this.vatDetailsObj[
      "ZerosalesAdj"
    ] = this.VATSalesForm.value.ZeroRatedDomesticSalesAdjustment.toString();
    this.vatDetailsObj[
      "ExportsAmt"
    ] = this.VATSalesForm.value.Exports.toString();
    this.vatDetailsObj[
      "ExportsAdj"
    ] = this.VATSalesForm.value.ExportsAdjustment.toString();
    this.vatDetailsObj[
      "ExemptsalesAmt"
    ] = this.VATSalesForm.value.ExemptSales.toString();
    this.vatDetailsObj[
      "ExemptsalesAdj"
    ] = this.VATSalesForm.value.ExemptSalesAdjustment.toString();
    this.vatDetailsObj[
      "TotalsalesAmt"
    ] = this.VATSalesForm.value.totalSales.toString();
    this.vatDetailsObj[
      "TotalsalesAdj"
    ] = this.VATSalesForm.value.totalSalesAdjustment.toString();
    this.vatDetailsObj[
      "TotalsalesVat"
    ] = this.VATSalesForm.value.TotalVATonSales.toString();
    this.vatDetailsObj["TotaldueVat"] = "0";
    // this.vatDetailsObj["TotaldueVat"]=(((((+this.VATSalesForm.value.TotalVATonSales)-(+(this.vatDetailsObj["TotalpurchaseVat"])))+ this.CreditVat)) || 0).toString();
    console.log(this.vatDetailsObj);
    this.vatDetailsObj["UserTypz"] = "TP";
    this.returnsService
      .getPenalityDetails(this.vatDetailsObj)
      .subscribe((data) => {
        console.log(data);
        this.lateFinePenality =
          data["d"]["LfpVat"] == "" ? 0 : +data["d"]["LfpVat"];
        this.CorrectionPenality =
          data["d"]["Preperiodcorr"] == "" ? 0 : +data["d"]["Preperiodcorr"];
        this.CreditVat =
          data["d"]["CreditVat"] == "" ? 0 : +data["d"]["CreditVat"];
        console.log(this.lateFinePenality, this.CorrectionPenality);
        //this.SaveAsDraft();
        this.taxPayerDetails = data["d"];
        this.vatDetailsObj = data["d"];
        this.calculateVat();
      });
  }

  SaveAsDraft() {
    this.vatDetailsObj["Operationz"] = "05";
    this.vatDetailsObj["StepNumberz"] = "2";
    this.vatDetailsObj["Langz"] = "EN";
    this.vatDetailsObj["ConfStp2"] = "1";
    this.vatDetailsObj["TcFlg"] = "1";
    this.vatDetailsObj["FldNm"] = "";
    this.vatDetailsObj["Block"] = "";
    this.vatDetailsObj["TcFg"] = "1";
    this.vatDetailsObj["UserTypz"] = "TP";
    this.vatDetailsObj["Yesno"] = this.extratax == "yes" ? "X" : "";
    //sales screen keys binding
    if (this.step >= 2) {
      if (this.vatDetailsObj["GoliveFg"] == "") {
        this.vatDetailsObj[
          "StdsalesAmt"
        ] = this.VATSalesForm.value.StandardRatedSales1.toString();
        this.vatDetailsObj[
          "StdsalesAdj"
        ] = this.VATSalesForm.value.StandardRatedSales1Adjustment.toString();
        this.vatDetailsObj[
          "StdsalesVat"
        ] = this.VATSalesForm.value.StandardRatedSales1VAT.toString();
      } else {
        this.vatDetailsObj[
          "StdsalesAmt"
        ] = this.VATSalesForm.value.StandardRatedSales1.toString();
        this.vatDetailsObj[
          "StdsalesAdj"
        ] = this.VATSalesForm.value.StandardRatedSales1Adjustment.toString();
        this.vatDetailsObj[
          "StdsalesVat"
        ] = this.VATSalesForm.value.StandardRatedSales1VAT.toString();
        this.vatDetailsObj["VATPERITEMSet"]["results"][0][
          "StdsalesAmt"
        ] = this.VATSalesForm.value.StandardRatedSales1.toString();
        this.vatDetailsObj["VATPERITEMSet"]["results"][0][
          "StdsalesAdj"
        ] = this.VATSalesForm.value.StandardRatedSales1Adjustment.toString();
        this.vatDetailsObj["VATPERITEMSet"]["results"][0][
          "StdsalesVat"
        ] = this.VATSalesForm.value.StandardRatedSales1VAT.toString();
        this.vatDetailsObj["VATPERITEMSet"]["results"][1][
          "StdsalesAmt"
        ] = this.VATSalesForm.value.salesSubjecttovat.toString();
        this.vatDetailsObj["VATPERITEMSet"]["results"][1][
          "StdsalesAdj"
        ] = this.VATSalesForm.value.salesSubjecttovatAdjustment.toString();
        this.vatDetailsObj["VATPERITEMSet"]["results"][1][
          "StdsalesVat"
        ] = this.VATSalesForm.value.salesSubjecttovatVAT.toString();
      }

      this.vatDetailsObj[
        "SalesGccAmt"
      ] = this.VATSalesForm.value.PrivateHealthCareEducation.toString();
      this.vatDetailsObj[
        "SalesGccAdj"
      ] = this.VATSalesForm.value.PrivateHealthCareEducationAdjustment.toString();
      this.vatDetailsObj[
        "ZerosalesAmt"
      ] = this.VATSalesForm.value.ZeroRatedDomesticSales.toString();
      this.vatDetailsObj[
        "ZerosalesAdj"
      ] = this.VATSalesForm.value.ZeroRatedDomesticSalesAdjustment.toString();
      this.vatDetailsObj[
        "ExportsAmt"
      ] = this.VATSalesForm.value.Exports.toString();
      this.vatDetailsObj[
        "ExportsAdj"
      ] = this.VATSalesForm.value.ExportsAdjustment.toString();
      this.vatDetailsObj[
        "ExemptsalesAmt"
      ] = this.VATSalesForm.value.ExemptSales.toString();
      this.vatDetailsObj[
        "ExemptsalesAdj"
      ] = this.VATSalesForm.value.ExemptSalesAdjustment.toString();
      this.vatDetailsObj[
        "TotalsalesAmt"
      ] = this.VATSalesForm.value.totalSales.toString();
      this.vatDetailsObj[
        "TotalsalesAdj"
      ] = this.VATSalesForm.value.totalSalesAdjustment.toString();
      this.vatDetailsObj[
        "TotalsalesVat"
      ] = this.VATSalesForm.value.TotalVATonSales.toString();
    }
    if (this.step >= 3) {
      //this is purchases screen keys binding
      if (this.vatDetailsObj["GoliveFg"] == "") {
        this.vatDetailsObj[
          "StdpurchaseAmt"
        ] = this.VATPurchasesForm.value.StandardRatedDomesticPurchases1.toString();
        this.vatDetailsObj[
          "StdpurchaseAdj"
        ] = this.VATPurchasesForm.value.StandardRatedDomesticPurchases1Adjustment.toString();
        this.vatDetailsObj["StdpurchasesVat"] = (
          ((+this.VATPurchasesForm.value.StandardRatedDomesticPurchases1 -
            +this.VATPurchasesForm.value
              .StandardRatedDomesticPurchases1Adjustment) *
            this.steppercentage) /
          100
        ).toString();
        this.vatDetailsObj[
          "ImportspaidAmt"
        ] = this.VATPurchasesForm.value.ImportSubjectVatPaidCustoms.toString();
        this.vatDetailsObj[
          "ImportspaidAdj"
        ] = this.VATPurchasesForm.value.ImportSubjectVatPaidCustomsAdjustments.toString();
        this.vatDetailsObj["ImportspaidVat"] = (
          ((+this.VATPurchasesForm.value.ImportSubjectVatPaidCustoms -
            +this.VATPurchasesForm.value
              .ImportSubjectVatPaidCustomsAdjustments) *
            this.steppercentage) /
          100
        ).toString(); //this.VATSalesForm.value.StandardRatedSales1VAT.toString();
        this.vatDetailsObj[
          "ImportsaccAmt"
        ] = this.VATPurchasesForm.value.ImportSubjectVatPaidforReverseCharge.toString();
        this.vatDetailsObj[
          "ImportsaccAdj"
        ] = this.VATPurchasesForm.value.ImportSubjectVatPaidforReverseChargeAdjustments.toString();
        this.vatDetailsObj["ImportsaccVat"] = (
          ((+this.VATPurchasesForm.value.ImportSubjectVatPaidforReverseCharge -
            +this.VATPurchasesForm.value
              .ImportSubjectVatPaidforReverseChargeAdjustments) *
            this.steppercentage) /
          100
        ).toString(); //this.VATSalesForm.value.StandardRatedSales1VAT.toString();
      } else {
        this.vatDetailsObj[
          "StdpurchaseAmt"
        ] = this.VATPurchasesForm.value.StandardRatedDomesticPurchases1.toString();
        this.vatDetailsObj[
          "StdpurchaseAdj"
        ] = this.VATPurchasesForm.value.StandardRatedDomesticPurchases1Adjustment.toString();
        this.vatDetailsObj["StdpurchasesVat"] = (
          ((+this.VATPurchasesForm.value.StandardRatedDomesticPurchases1 -
            +this.VATPurchasesForm.value
              .StandardRatedDomesticPurchases1Adjustment) *
            this.steppercentage) /
          100
        ).toString();
        this.vatDetailsObj[
          "ImportspaidAmt"
        ] = this.VATPurchasesForm.value.ImportSubjectVatPaidCustoms.toString();
        this.vatDetailsObj[
          "ImportspaidAdj"
        ] = this.VATPurchasesForm.value.ImportSubjectVatPaidCustomsAdjustments.toString();
        this.vatDetailsObj["ImportspaidVat"] = (
          ((+this.VATPurchasesForm.value.ImportSubjectVatPaidCustoms -
            +this.VATPurchasesForm.value
              .ImportSubjectVatPaidCustomsAdjustments) *
            this.steppercentage) /
          100
        ).toString(); //this.VATSalesForm.value.StandardRatedSales1VAT.toString();
        this.vatDetailsObj[
          "ImportsaccAmt"
        ] = this.VATPurchasesForm.value.ImportSubjectVatPaidforReverseCharge.toString();
        this.vatDetailsObj[
          "ImportsaccAdj"
        ] = this.VATPurchasesForm.value.ImportSubjectVatPaidforReverseChargeAdjustments.toString();
        this.vatDetailsObj["ImportsaccVat"] = (
          ((+this.VATPurchasesForm.value.ImportSubjectVatPaidforReverseCharge -
            +this.VATPurchasesForm.value
              .ImportSubjectVatPaidforReverseChargeAdjustments) *
            this.steppercentage) /
          100
        ).toString(); //this.VATSalesForm.value.StandardRatedSales1VAT.toString();
        this.vatDetailsObj["VATPERITEMSet"]["results"][0][
          "StdpurchaseAmt"
        ] = this.VATPurchasesForm.value.StandardRatedDomesticPurchases1.toString();
        this.vatDetailsObj["VATPERITEMSet"]["results"][0][
          "StdpurchaseAdj"
        ] = this.VATPurchasesForm.value.StandardRatedDomesticPurchases1Adjustment.toString();
        this.vatDetailsObj["VATPERITEMSet"]["results"][0]["StdpurchasesVat"] = (
          ((+this.VATPurchasesForm.value.StandardRatedDomesticPurchases1 -
            +this.VATPurchasesForm.value
              .StandardRatedDomesticPurchases1Adjustment) *
            this.steppercentage) /
          100
        ).toString();
        this.vatDetailsObj["VATPERITEMSet"]["results"][1][
          "StdpurchaseAmt"
        ] = this.VATPurchasesForm.value.PurchaseSubjectToVAT.toString();
        this.vatDetailsObj["VATPERITEMSet"]["results"][1][
          "StdpurchaseAdj"
        ] = this.VATPurchasesForm.value.PurchaseSubjectToVATAdjustment.toString();
        this.vatDetailsObj["VATPERITEMSet"]["results"][1][
          "StdpurchasesVat"
        ] = this.VATPurchasesForm.value.PurchaseSubjectToVATVAT.toString();
        this.vatDetailsObj["VATPERITEMSet"]["results"][0][
          "ImportspaidAmt"
        ] = this.VATPurchasesForm.value.ImportSubjectVatPaidCustoms.toString();
        this.vatDetailsObj["VATPERITEMSet"]["results"][0][
          "ImportspaidAdj"
        ] = this.VATPurchasesForm.value.ImportSubjectVatPaidCustomsAdjustments.toString();
        this.vatDetailsObj["VATPERITEMSet"]["results"][0]["ImportspaidVat"] = (
          ((+this.VATPurchasesForm.value.ImportSubjectVatPaidCustoms -
            +this.VATPurchasesForm.value
              .ImportSubjectVatPaidCustomsAdjustments) *
            this.steppercentage) /
          100
        ).toString(); //this.VATSalesForm.value.StandardRatedSales1VAT.toString();
        this.vatDetailsObj["VATPERITEMSet"]["results"][1][
          "ImportspaidAmt"
        ] = this.VATPurchasesForm.value.ImportSubjectVatStepAmt.toString();
        this.vatDetailsObj["VATPERITEMSet"]["results"][1][
          "ImportspaidAdj"
        ] = this.VATPurchasesForm.value.ImportSubjectVatStepAdjustments.toString();
        this.vatDetailsObj["VATPERITEMSet"]["results"][1][
          "ImportspaidVat"
        ] = this.VATPurchasesForm.value.ImportSubjectVatStepVAT.toString();
        this.vatDetailsObj["VATPERITEMSet"]["results"][0][
          "ImportsaccAmt"
        ] = this.VATPurchasesForm.value.ImportSubjectVatPaidforReverseCharge.toString();
        this.vatDetailsObj["VATPERITEMSet"]["results"][0][
          "ImportsaccAdj"
        ] = this.VATPurchasesForm.value.ImportSubjectVatPaidforReverseChargeAdjustments.toString();
        this.vatDetailsObj["VATPERITEMSet"]["results"][0]["ImportsaccVat"] = (
          ((+this.VATPurchasesForm.value.ImportSubjectVatPaidforReverseCharge -
            +this.VATPurchasesForm.value
              .ImportSubjectVatPaidforReverseChargeAdjustments) *
            this.steppercentage) /
          100
        ).toString(); //this.VATSalesForm.value.StandardRatedSales1VAT.toString();
        this.vatDetailsObj["VATPERITEMSet"]["results"][1][
          "ImportsaccAmt"
        ] = this.VATPurchasesForm.value.ImportSubjectVatPaidforReverseChargeStepAmt.toString();
        this.vatDetailsObj["VATPERITEMSet"]["results"][1][
          "ImportsaccAdj"
        ] = this.VATPurchasesForm.value.ImportSubjectVatPaidforReverseChargeStepAdjustments.toString();
        this.vatDetailsObj["VATPERITEMSet"]["results"][1][
          "ImportsaccVat"
        ] = this.VATPurchasesForm.value.ImportSubjectVatPaidforReverseChargeStepVAT.toString();
      }

      this.vatDetailsObj[
        "ZeropurchaseAmt"
      ] = this.VATPurchasesForm.value.ZeroRatedPurchases.toString();
      this.vatDetailsObj[
        "ZeropurchaseAdj"
      ] = this.VATPurchasesForm.value.ZeroRatedPurchasesAdjustments.toString();
      this.vatDetailsObj[
        "ExemptpurchaseAmt"
      ] = this.VATPurchasesForm.value.ExemptPurchases.toString();
      this.vatDetailsObj[
        "ExemptpurchaseAdj"
      ] = this.VATPurchasesForm.value.ExemptPurchasesAdjustment.toString();
      this.vatDetailsObj[
        "TotalpurchaseAmt"
      ] = this.VATPurchasesForm.value.totalPurchases.toString();
      this.vatDetailsObj[
        "TotalpurchaseAdj"
      ] = this.VATPurchasesForm.value.totalPurchasesAdjustment.toString();
      this.vatDetailsObj[
        "TotalpurchaseVat"
      ] = this.VATPurchasesForm.value.totalVATOnPurchases.toString();
    }
    this.vatDetailsObj["NetdueVat"] = this.NetdueVat.toString();
    this.vatDetailsObj["Preperiodcorr"] = this.CorrectionPenality.toString();

    //this is the final amounts
    // this.vatDetailsObj["TotaldueVat"]=((((+this.VATSalesForm.value.TotalVATonSales)-(+(this.VATPurchasesForm.value.totalVATOnPurchases)))+(this.CorrectionPenality) + this.CreditVat)+(+(this.lateFinePenality)) || 0).toString();

    console.log("save as draft", this.vatDetailsObj);
    this.netVat =
      +this.VATSalesForm.value.TotalVATonSales -
        +this.VATPurchasesForm.value.totalVATOnPurchases +
        (+this.CorrectionPenality || 0) +
        (+this.CreditVat || 0) +
        (+this.lateFinePenality || 0) || 0.0;
    console.log(this.netVat, "netvat");
    this.vatDetailsObj["TotaldueVat"] = this.netVat.toString();
    this.returnsService
      .getPenalityDetails(this.vatDetailsObj)
      .subscribe((data) => {
        console.log(data);
        this.taxPayerDetails = data["d"];
        this.vatDetailsObj = data["d"];
        this.vatDetailsObj["SubmitFg"] = "";
        // this.GetVats();
        // this.tilesView=true;
        // this.VatDetailsScreen=false;

        jQuery("#SuccessModal").modal("show");
      });
  }
  SaveVatReturn() {
    this.vatDetailsObj["Yesno"] = this.extratax == "yes" ? "X" : "";
    this.vatDetailsObj["DecFg"] = "1";
    this.vatDetailsObj["TcFlg"] = "1";
    this.vatDetailsObj["UserTypz"] = "TP"; //TP for taxpayer and TU for officer
    //sales screen keys binding
    if (this.vatDetailsObj["GoliveFg"] == "") {
      this.vatDetailsObj[
        "StdsalesAmt"
      ] = this.VATSalesForm.value.StandardRatedSales1.toString();
      this.vatDetailsObj[
        "StdsalesAdj"
      ] = this.VATSalesForm.value.StandardRatedSales1Adjustment.toString();
      this.vatDetailsObj[
        "StdsalesVat"
      ] = this.VATSalesForm.value.StandardRatedSales1VAT.toString();
      this.vatDetailsObj[
        "StdpurchaseAmt"
      ] = this.VATPurchasesForm.value.StandardRatedDomesticPurchases1.toString();
      this.vatDetailsObj[
        "StdpurchaseAdj"
      ] = this.VATPurchasesForm.value.StandardRatedDomesticPurchases1Adjustment.toString();
      this.vatDetailsObj["StdpurchasesVat"] = (
        ((+this.VATPurchasesForm.value.StandardRatedDomesticPurchases1 -
          +this.VATPurchasesForm.value
            .StandardRatedDomesticPurchases1Adjustment) *
          this.steppercentage) /
        100
      ).toString();
      this.vatDetailsObj[
        "ImportspaidAmt"
      ] = this.VATPurchasesForm.value.ImportSubjectVatPaidCustoms.toString();
      this.vatDetailsObj[
        "ImportspaidAdj"
      ] = this.VATPurchasesForm.value.ImportSubjectVatPaidCustomsAdjustments.toString();
      this.vatDetailsObj["ImportspaidVat"] = (
        ((+this.VATPurchasesForm.value.ImportSubjectVatPaidCustoms -
          +this.VATPurchasesForm.value.ImportSubjectVatPaidCustomsAdjustments) *
          this.steppercentage) /
        100
      ).toString(); //this.VATSalesForm.value.StandardRatedSales1VAT.toString();
      this.vatDetailsObj[
        "ImportsaccAmt"
      ] = this.VATPurchasesForm.value.ImportSubjectVatPaidforReverseCharge.toString();
      this.vatDetailsObj[
        "ImportsaccAdj"
      ] = this.VATPurchasesForm.value.ImportSubjectVatPaidforReverseChargeAdjustments.toString();
      this.vatDetailsObj["ImportsaccVat"] = (
        ((+this.VATPurchasesForm.value.ImportSubjectVatPaidforReverseCharge -
          +this.VATPurchasesForm.value
            .ImportSubjectVatPaidforReverseChargeAdjustments) *
          this.steppercentage) /
        100
      ).toString(); //this.VATSalesForm.value.StandardRatedSales1VAT.toString();
    } else {
      this.vatDetailsObj[
        "StdsalesAmt"
      ] = this.VATSalesForm.value.StandardRatedSales1.toString();
      this.vatDetailsObj[
        "StdsalesAdj"
      ] = this.VATSalesForm.value.StandardRatedSales1Adjustment.toString();
      this.vatDetailsObj[
        "StdsalesVat"
      ] = this.VATSalesForm.value.StandardRatedSales1VAT.toString();
      this.vatDetailsObj[
        "StdpurchaseAmt"
      ] = this.VATPurchasesForm.value.StandardRatedDomesticPurchases1.toString();
      this.vatDetailsObj[
        "StdpurchaseAdj"
      ] = this.VATPurchasesForm.value.StandardRatedDomesticPurchases1Adjustment.toString();
      this.vatDetailsObj["StdpurchasesVat"] = (
        ((+this.VATPurchasesForm.value.StandardRatedDomesticPurchases1 -
          +this.VATPurchasesForm.value
            .StandardRatedDomesticPurchases1Adjustment) *
          this.steppercentage) /
        100
      ).toString();
      this.vatDetailsObj[
        "ImportspaidAmt"
      ] = this.VATPurchasesForm.value.ImportSubjectVatPaidCustoms.toString();
      this.vatDetailsObj[
        "ImportspaidAdj"
      ] = this.VATPurchasesForm.value.ImportSubjectVatPaidCustomsAdjustments.toString();
      this.vatDetailsObj["ImportspaidVat"] = (
        ((+this.VATPurchasesForm.value.ImportSubjectVatPaidCustoms -
          +this.VATPurchasesForm.value.ImportSubjectVatPaidCustomsAdjustments) *
          this.steppercentage) /
        100
      ).toString(); //this.VATSalesForm.value.StandardRatedSales1VAT.toString();
      this.vatDetailsObj[
        "ImportsaccAmt"
      ] = this.VATPurchasesForm.value.ImportSubjectVatPaidforReverseCharge.toString();
      this.vatDetailsObj[
        "ImportsaccAdj"
      ] = this.VATPurchasesForm.value.ImportSubjectVatPaidforReverseChargeAdjustments.toString();
      this.vatDetailsObj["ImportsaccVat"] = (
        ((+this.VATPurchasesForm.value.ImportSubjectVatPaidforReverseCharge -
          +this.VATPurchasesForm.value
            .ImportSubjectVatPaidforReverseChargeAdjustments) *
          this.steppercentage) /
        100
      ).toString(); //this.VATSalesForm.value.StandardRatedSales1VAT.toString();
      this.vatDetailsObj["VATPERITEMSet"]["results"][0][
        "StdsalesAmt"
      ] = this.VATSalesForm.value.StandardRatedSales1.toString();
      this.vatDetailsObj["VATPERITEMSet"]["results"][0][
        "StdsalesAdj"
      ] = this.VATSalesForm.value.StandardRatedSales1Adjustment.toString();
      this.vatDetailsObj["VATPERITEMSet"]["results"][0][
        "StdsalesVat"
      ] = this.VATSalesForm.value.StandardRatedSales1VAT.toString();
      this.vatDetailsObj["VATPERITEMSet"]["results"][1][
        "StdsalesAmt"
      ] = this.VATSalesForm.value.salesSubjecttovat.toString();
      this.vatDetailsObj["VATPERITEMSet"]["results"][1][
        "StdsalesAdj"
      ] = this.VATSalesForm.value.salesSubjecttovatAdjustment.toString();
      this.vatDetailsObj["VATPERITEMSet"]["results"][1][
        "StdsalesVat"
      ] = this.VATSalesForm.value.salesSubjecttovatVAT.toString();
      this.vatDetailsObj["VATPERITEMSet"]["results"][0][
        "StdpurchaseAmt"
      ] = this.VATPurchasesForm.value.StandardRatedDomesticPurchases1.toString();
      this.vatDetailsObj["VATPERITEMSet"]["results"][0][
        "StdpurchaseAdj"
      ] = this.VATPurchasesForm.value.StandardRatedDomesticPurchases1Adjustment.toString();
      this.vatDetailsObj["VATPERITEMSet"]["results"][0]["StdpurchasesVat"] = (
        ((+this.VATPurchasesForm.value.StandardRatedDomesticPurchases1 -
          +this.VATPurchasesForm.value
            .StandardRatedDomesticPurchases1Adjustment) *
          this.steppercentage) /
        100
      ).toString();
      this.vatDetailsObj["VATPERITEMSet"]["results"][1][
        "StdpurchaseAmt"
      ] = this.VATPurchasesForm.value.PurchaseSubjectToVAT.toString();
      this.vatDetailsObj["VATPERITEMSet"]["results"][1][
        "StdpurchaseAdj"
      ] = this.VATPurchasesForm.value.PurchaseSubjectToVATAdjustment.toString();
      this.vatDetailsObj["VATPERITEMSet"]["results"][1][
        "StdpurchasesVat"
      ] = this.VATPurchasesForm.value.PurchaseSubjectToVATVAT.toString();
      this.vatDetailsObj["VATPERITEMSet"]["results"][0][
        "ImportspaidAmt"
      ] = this.VATPurchasesForm.value.ImportSubjectVatPaidCustoms.toString();
      this.vatDetailsObj["VATPERITEMSet"]["results"][0][
        "ImportspaidAdj"
      ] = this.VATPurchasesForm.value.ImportSubjectVatPaidCustomsAdjustments.toString();
      this.vatDetailsObj["VATPERITEMSet"]["results"][0]["ImportspaidVat"] = (
        ((+this.VATPurchasesForm.value.ImportSubjectVatPaidCustoms -
          +this.VATPurchasesForm.value.ImportSubjectVatPaidCustomsAdjustments) *
          this.steppercentage) /
        100
      ).toString(); //this.VATSalesForm.value.StandardRatedSales1VAT.toString();
      this.vatDetailsObj["VATPERITEMSet"]["results"][1][
        "ImportspaidAmt"
      ] = this.VATPurchasesForm.value.ImportSubjectVatStepAmt.toString();
      this.vatDetailsObj["VATPERITEMSet"]["results"][1][
        "ImportspaidAdj"
      ] = this.VATPurchasesForm.value.ImportSubjectVatStepAdjustments.toString();
      this.vatDetailsObj["VATPERITEMSet"]["results"][1][
        "ImportspaidVat"
      ] = this.VATPurchasesForm.value.ImportSubjectVatStepVAT.toString();
      this.vatDetailsObj["VATPERITEMSet"]["results"][0][
        "ImportsaccAmt"
      ] = this.VATPurchasesForm.value.ImportSubjectVatPaidforReverseCharge.toString();
      this.vatDetailsObj["VATPERITEMSet"]["results"][0][
        "ImportsaccAdj"
      ] = this.VATPurchasesForm.value.ImportSubjectVatPaidforReverseChargeAdjustments.toString();
      this.vatDetailsObj["VATPERITEMSet"]["results"][0]["ImportsaccVat"] = (
        ((+this.VATPurchasesForm.value.ImportSubjectVatPaidforReverseCharge -
          +this.VATPurchasesForm.value
            .ImportSubjectVatPaidforReverseChargeAdjustments) *
          this.steppercentage) /
        100
      ).toString(); //this.VATSalesForm.value.StandardRatedSales1VAT.toString();
      this.vatDetailsObj["VATPERITEMSet"]["results"][1][
        "ImportsaccAmt"
      ] = this.VATPurchasesForm.value.ImportSubjectVatPaidforReverseChargeStepAmt.toString();
      this.vatDetailsObj["VATPERITEMSet"]["results"][1][
        "ImportsaccAdj"
      ] = this.VATPurchasesForm.value.ImportSubjectVatPaidforReverseChargeStepAdjustments.toString();
      this.vatDetailsObj["VATPERITEMSet"]["results"][1][
        "ImportsaccVat"
      ] = this.VATPurchasesForm.value.ImportSubjectVatPaidforReverseChargeStepVAT.toString();
    }

    this.vatDetailsObj[
      "SalesGccAmt"
    ] = this.VATSalesForm.value.PrivateHealthCareEducation.toString();
    this.vatDetailsObj[
      "SalesGccAdj"
    ] = this.VATSalesForm.value.PrivateHealthCareEducationAdjustment.toString();
    this.vatDetailsObj[
      "ZerosalesAmt"
    ] = this.VATSalesForm.value.ZeroRatedDomesticSales.toString();
    this.vatDetailsObj[
      "ZerosalesAdj"
    ] = this.VATSalesForm.value.ZeroRatedDomesticSalesAdjustment.toString();
    this.vatDetailsObj[
      "ExportsAmt"
    ] = this.VATSalesForm.value.Exports.toString();
    this.vatDetailsObj[
      "ExportsAdj"
    ] = this.VATSalesForm.value.ExportsAdjustment.toString();
    this.vatDetailsObj[
      "ExemptsalesAmt"
    ] = this.VATSalesForm.value.ExemptSales.toString();
    this.vatDetailsObj[
      "ExemptsalesAdj"
    ] = this.VATSalesForm.value.ExemptSalesAdjustment.toString();
    this.vatDetailsObj[
      "TotalsalesAmt"
    ] = this.VATSalesForm.value.totalSales.toString();
    this.vatDetailsObj[
      "TotalsalesAdj"
    ] = this.VATSalesForm.value.totalSalesAdjustment.toString();
    this.vatDetailsObj[
      "TotalsalesVat"
    ] = this.VATSalesForm.value.TotalVATonSales.toString();

    this.vatDetailsObj[
      "ZeropurchaseAmt"
    ] = this.VATPurchasesForm.value.ZeroRatedPurchases.toString();
    this.vatDetailsObj[
      "ZeropurchaseAdj"
    ] = this.VATPurchasesForm.value.ZeroRatedPurchasesAdjustments.toString();
    this.vatDetailsObj[
      "ExemptpurchaseAmt"
    ] = this.VATPurchasesForm.value.ExemptPurchases.toString();
    this.vatDetailsObj[
      "ExemptpurchaseAdj"
    ] = this.VATPurchasesForm.value.ExemptPurchasesAdjustment.toString();
    this.vatDetailsObj[
      "TotalpurchaseAmt"
    ] = this.VATPurchasesForm.value.totalPurchases.toString();
    this.vatDetailsObj[
      "TotalpurchaseAdj"
    ] = this.VATPurchasesForm.value.totalPurchasesAdjustment.toString();
    this.vatDetailsObj[
      "TotalpurchaseVat"
    ] = this.VATPurchasesForm.value.totalVATOnPurchases.toString();
    this.vatDetailsObj["NetdueVat"] = this.NetdueVat.toString();
    this.vatDetailsObj["Preperiodcorr"] = this.CorrectionPenality.toString();
    //this is the final amounts
    // this.vatDetailsObj["TotaldueVat"]=((this.VATSalesForm.value.TotalVATonSales-this.VATPurchasesForm.value.totalVATOnPurchases) || 0).toString();

    this.vatDetailsObj["Betrh"] = (
      this.VATSalesForm.value.TotalVATonSales -
      this.VATPurchasesForm.value.totalVATOnPurchases
    ).toString();

    this.netVat =
      +this.VATSalesForm.value.TotalVATonSales -
        +this.VATPurchasesForm.value.totalVATOnPurchases +
        (+this.CorrectionPenality || 0) +
        (+this.CreditVat || 0) +
        (+this.lateFinePenality || 0) || 0.0;
    this.vatDetailsObj["TotaldueVat"] = this.netVat.toString();

    // //newly added by hema start
    // this.vatDetailsObj["AttenbChk"]="";
    // this.vatDetailsObj["SubmitFg"]="X";
    // this.vatDetailsObj["ZzattStatus"]=0;
    // //end

    this.vatDetailsObj["FldNm"] = "";
    this.vatDetailsObj["Block"] = "";
    console.log("save return", this.vatDetailsObj);

    if (this.isAmendment) {
      this.vatDetailsObj["Vrtaxret"] = "Amendment";
    }
    this.vatDetailsObj["Operationz"] = "01";
    this.returnsService.getPenalityDetails(this.vatDetailsObj).subscribe(
      (data) => {
        console.log(data);
        this.taxPayerDetails = data["d"];
        this.vatDetailsObj = data["d"];
        console.log(this.taxPayerDetails.Sopbel);
        console.log("saveVAT", this.vatDetailsObj["Fbnum"]);
        if (
          data["d"]["Sopbel"] == "" &&
          this.vatDetailsObj["SubmitFg"] != "X"
        ) {
          this.generateSadadNumber(data["d"]["Fbnum"]);
          this.GetVats();
          if (!this.fromModal) {
            setTimeout(() => {
              this.step = 6;
            }, 500);
          }
        }
        if (this.vatDetailsObj["SubmitFg"] != "X") {
          this.GetVats();
          if (!this.fromModal) {
            setTimeout(() => {
              this.step = 6;
            }, 500);
          }
        }
        // console.log(data["d"]["Sopbel"]);
        this.vatDetailsObj["SubmitFg"] = "";
        this.fromModal = false;
        this.errorNotes = false;
        // this.SaveVatReturn();
      },
      (err) => {
        this.notifierService.notify(
          "error",
          err["error"]["error"]["innererror"]["errordetails"][0]["message"]
        );
      }
    );
  }
  onRefresh() {
    console.log("refresh", this.vatDetailsObj["Fbnum"]);
    if (
      this.taxPayerDetails["Sopbel"] == "" &&
      this.vatDetailsObj["SubmitFg"] != "X"
    ) {
      this.generateSadadNumber(this.vatDetailsObj["Fbnum"]);
    }
    setTimeout(() => {
      this.step = 6;
    }, 500);
  }
  CommonInfoModal(labelName) {
    if (labelName == "PrivateHealthCareEducation") {
      if (this.language == "ar") {
        (this.infotitle =
          "المبيعات للمواطنين (الخدمات الصحية الخاصة/التعليم الأهلي الخاص)"),
          (this.infomessage1 =
            " مبلغ التوريدات الخاضعة للنسبة الأساسية التي تمت لمواطنين سعوديين (الخدمات الصحية الخاصة/ التعليم الأهلي الخاص)، يرجى العلم بأن الدولة سوف تتحمل  ضريبة القيمة المضافة عن هذه التوريدات طبقا للأمر الملكي");
        this.infomessage2 =
          "'مبلغ التعديلات التي تخص التوريدات الخاضعة للنسبة الأساسية التي تمت لمواطنين سعوديين (الخدمات الصحية الخاصة/ التعليم الأهلي الخاص)، يرجى العلم بأن الدولة سوف تتحمل  ضريبة القيمة المضافة عن هذه التوريدات طبقا للأمر الملكى";
      } else {
        this.infotitle = "Private Healthcare & Education";
        this.infomessage1 =
          "Total amount of standard rated supplies made to Saudi citizens in private healthcare and private education. Please note that VAT will be borne by the state on these supplies as per Royal Order ";
        this.infomessage2 =
          "'Total adjustments to standard rated supplies that were made to Saudi citizens in private healthcare and private education in previous tax periods. Please note that VAT will be borne by the state on these supplies as per Royal Order";
      }
      jQuery("#infoModal1").modal("show");
    } else if (labelName == "ZeroRatedDomesticSales") {
      if (this.language == "ar") {
        this.infotitle = "المبيعات المحلية الخاضعة للنسبة الصفرية";
        this.infomessage1 =
          "• المبلغ الإجمالي لجميع السلع والخدمات  الخاضعة لنسبة الصفر بالمائة التي تم توريدها خلال الفترة الحالية والمباعة في المملكة العربية السعودية. ";
        this.infomessage2 =
          "• يرجى الرجوع إلى رابط الأسئلة الشائعة في الأسفل لمعرفة المزيد حول السلع والخدمات الخاضعة لنسبة الصفر بالمائة.";
        this.infomessage3 =
          "'• المبلغ الإجمالي للتعديلات التي تم إجراؤها على التوريدات  الخاضعة لنسبة الصفر بالمائة التي تم توريدها خلال فترات تقديم الإقرارات السابقة والمباعة في المملكة العربية السعودية ";
        this.infomessage4 =
          "• على سبيل المثال، المبيعات الخاضعة لنسبة الصفر بالمائة في المملكة العربية السعودية والتي يتم إرجاعها، شطب الديون المعدومة على الذمم المدينة المحلية الخاضعة لنسبة الصفر بالمائة.";
      } else {
        this.infotitle = "Zero Rated Domestic Sales";
        this.infomessage1 =
          "• Total amount of all goods and services supplied during the current period that were zero rated and sold in KSA";
        this.infomessage2 =
          "• Please refer to the below FAQ URL for zero rated goods and services.";
        this.infomessage3 =
          "• Total amount of supplies adjustments made to previous reporting periods supplies that were zero rated and sold in KSA ";
        this.infomessage4 =
          "• For example, returned zero rates sales in Saudi Arabia, write off of bad debt on zero rated domestic receivables ";
      }
      jQuery("#infoModal2").modal("show");
    } else if (labelName == "Exports") {
      if (this.language == "ar") {
        this.infotitle = "الصادرات ";
        this.infomessage1 =
          "'• المبلغ الإجمالي للتوريدات الخاصة بجميع السلع والخدمات ( والتي سيطبق عليها نسبة صفر بالمائة ) المصدًرة إلى دول خارج مجلس التعاون الخليجي او دول مجلس التعاون الخليجى التي تطبق ضريبة القيمة المضافة";
        this.infomessage2 =
          "• يرجى الرجوع إلى رابط الأسئلة الشائعة في الأسفل لمعرفة المزيد حول السلع والخدمات المصدًرة.";
        this.infomessage3 =
          "'• المبلغ الإجمالي للتعديلات على التوريدات الخاصة بجميع السلع والخدمات ( والتي سيطبق عليها نسبة صفر بالمائة ) المصدًرة إلى دول خارج مجلس التعاون الخليجي او دول مجلس التعاون الخليجى التي تطبق ضريبة القيمة المضافة . خلال فترات تقديم الإقرارت السابقة";
        this.infomessage4 =
          "• على سبيل المثال، شطب الديون المعدومة  على الذمم المدينة للصادرات";
      } else {
        this.infotitle = "Exports";
        this.infomessage1 =
          "'• Total amount related to all goods and services ( to be subject to zero rate) exported to GCC VAT implementing states and countries utside GCC. ";
        this.infomessage2 =
          "• Please refer to the below FAQ URL for exported goods and services. ";
        this.infomessage3 =
          "'• Total amount of adjustments on supplies related to all goods and services (to be subject to zero rate) exported to GCC VAT implementing countries or countries outside GCC during the previous reporting periods.";
        this.infomessage4 =
          "• For example,write off of bad debt on exports reveivables.";
      }
      jQuery("#infoModal2").modal("show");
    } else if (labelName == "ExemptSales") {
      if (this.language == "ar") {
        this.infotitle = " المبيعات المعفاة";
        this.infomessage1 =
          "• المبلغ الإجمالي للسلع والخدمات المعفاة من ضريبة القيمة المضافة التي تم بيعها في المملكة العربية السعودية خلال الفترة الحالية.";
        this.infomessage2 =
          "• يرجى الرجوع إلى رابط الأسئلة الشائعة في الأسفل للاطلاع على قائمة السلع والخدمات المعفاة.";
        this.infomessage3 =
          "'• المبلغ الإجمالي للتعديلات التي تم إجراؤها على التوريدات المعفاة التي تم بيعها في المملكة العربية السعودية ";
        this.infomessage4 =
          "• على سبيل المثال، إرجاع السلع المعفاة، شطب الديون المعدومة";
      } else {
        this.infotitle = "ExemptSales";
        this.infomessage1 =
          "• Total amount of goods and services supplied during the current period that were exempted and sold in KSA";
        this.infomessage2 =
          "• Please refer to the below FAQ URL for the list of exempted goods and services.";
        this.infomessage3 =
          "'• The total amount made on exempt supplies sold in KSA . ";
        this.infomessage4 =
          "• For example,  Return of exempted goods, bad debt write-off";
      }
      jQuery("#infoModal2").modal("show");
    } else if (labelName == "salesSubjecttovat") {
      if (this.language == "ar") {
        this.infotitle = "المبيعات الخاضعة لنسبة ";
        this.infomessage1 =
          "'• المبلغ الإجمالي لتوريدات السلع والخدمات الخاضعة للضريبة بنسبة 5% وفقاً للأحكام الإنتقالية (غير شامل ضريبة القيمة المضافة ) التي تم توريدها خلال الفترة الحالية والتي بيعت في المملكة العربية السعودية بالإضافة إلى : - التوريدات المفترضة. -التوريدات الخاضعة لطريقة هامش الربح.";
        this.infomessage2 =
          "• يرجى الرجوع إلى رابط الأسئلة الشائعة  في الاسفل لمعرفة المزيد حول السلع والخدمات الخاضعة للنسبة الأساسية (5%)";
        this.infomessage3 =
          "'• المبلغ الإجمالي للتعديلات التي تم إجراؤها على التوريدات الخاضعة لنسبة 5% (غير شامل ضريبة القيمة المضافة ) المباعة في المملكة العربية السعودية خلال الفترات الضريبية السابقة بالإضافة إلى : - التوريدات المفترضة.  - التوريدات الخاضعة لطريقة هامش الربح ";
        this.infomessage4 =
          "• على سبيل المثال، إرجاع العملاء للسلع والخدمات التي استحقت عنها ضريبة القيمة المضافة للهيئة العامة للزكاة والدخل، شطب الديون المعدومة على الذمم المدينة الخاضعة للضريبة بالنسبة الأساسية";
      } else {
        this.infotitle = "Sales subject to VAT at";
        this.infomessage1 =
          "'• Total supplies amount of goods and services subject to 5% VAT rate as per the transitional provisions (excluding VAT paid) supplied during the current period that were sold in KSA, in addition to, nominal supplies and supplies subject to margin scheme.";
        this.infomessage2 =
          "• Please refer to the below FAQ URL for standard rated 5% goods and services.";
        this.infomessage3 =
          "'• Total amount of supplies adjustments subject to 5% rate (excluding VAT paid) made to the previous reporting periods supplies that were sold in KSA, in addition to, nominal supplies and supplies subject to margin scheme.";
        this.infomessage4 =
          "• For example, return of goods and services by customers on which you have paid VAT to GAZT, write off of bad debt on standard rated receivables";
      }
      jQuery("#infoModal2").modal("show");
    } else if (labelName == "salesSubjecttovat") {
      if (this.language == "ar") {
        this.infotitle = "المبيعات الخاضعة لنسبة ";
        this.infomessage1 =
          "'• المبلغ الإجمالي لتوريدات السلع والخدمات الخاضعة للضريبة بنسبة 5% وفقاً للأحكام الإنتقالية (غير شامل ضريبة القيمة المضافة ) التي تم توريدها خلال الفترة الحالية والتي بيعت في المملكة العربية السعودية بالإضافة إلى : - التوريدات المفترضة. -التوريدات الخاضعة لطريقة هامش الربح.";
        this.infomessage2 =
          "• يرجى الرجوع إلى رابط الأسئلة الشائعة  في الاسفل لمعرفة المزيد حول السلع والخدمات الخاضعة للنسبة الأساسية (5%)";
        this.infomessage3 =
          "'• المبلغ الإجمالي للتعديلات التي تم إجراؤها على التوريدات الخاضعة لنسبة 5% (غير شامل ضريبة القيمة المضافة ) المباعة في المملكة العربية السعودية خلال الفترات الضريبية السابقة بالإضافة إلى : - التوريدات المفترضة.  - التوريدات الخاضعة لطريقة هامش الربح ";
        this.infomessage4 =
          "• على سبيل المثال، إرجاع العملاء للسلع والخدمات التي استحقت عنها ضريبة القيمة المضافة للهيئة العامة للزكاة والدخل، شطب الديون المعدومة على الذمم المدينة الخاضعة للضريبة بالنسبة الأساسية";
      } else {
        this.infotitle = "Sales subject to VAT at";
        this.infomessage1 =
          "'• Total supplies amount of goods and services subject to 5% VAT rate as per the transitional provisions (excluding VAT paid) supplied during the current period that were sold in KSA, in addition to, nominal supplies and supplies subject to margin scheme.";
        this.infomessage2 =
          "• Please refer to the below FAQ URL for standard rated 5% goods and services.";
        this.infomessage3 =
          "'• Total amount of supplies adjustments subject to 5% rate (excluding VAT paid) made to the previous reporting periods supplies that were sold in KSA, in addition to, nominal supplies and supplies subject to margin scheme.";
        this.infomessage4 =
          "• For example, return of goods and services by customers on which you have paid VAT to GAZT, write off of bad debt on standard rated receivables";
      }
      jQuery("#infoModal2").modal("show");
    } else if (labelName == "StandardRatedDomesticPurchases1") {
      if (this.language == "ar") {
        this.infotitle = "المشتريات الخاضعة للنسبة الأساسية";
        this.infomessage1 =
          "• المبلغ الإجمالي للسلع والخدمات (غير شامل ضريبة القيمة المضافة) التي تم شراؤها في المملكة العربية السعودية خلال الفترة الحالية والخاضعة للضريبة بالنسبة الأساسية.";
        this.infomessage2 =
          "• يرجى الرجوع إلى رابط الأسئلة الشائعة في الأسفل للاطلاع على قائمة السلع والخدمات الخاضعة للنسبة الأساسية.";
        this.infomessage3 =
          "'• المبلغ الإجمالي للتعديلات التي تم إجراؤها على مشتريات (غير شامل ضريبة القيمة المضافة المدفوعة) السلع والخدمات الخاضعة للنسبة الأساسية والتي تم شراؤها في المملكة العربية السعودية.";
        this.infomessage4 =
          "• على سبيل المثال: مردودات المشتريات الخاضعة للضريبة إلى الموردين، تعديل خصم ضريبة المدخلات من خلال تخصيص المدخلات للتوريدات الخاضعة للضريبة والمعفاة ";
      } else {
        this.infotitle = "Standard rated domestic purchases";
        this.infomessage1 =
          "• Total amount of goods and services (excluding VAT paid) purchased during the current period that were standard rated and bought in KSA.";
        this.infomessage2 =
          "• Please refer to the below FAQ URL for the list of standard rates goods and services.";
        this.infomessage3 =
          "'• Total amount of purchases adjustments (excluding VAT paid) made to goods and services purchased that were standard rated and bought in KSA..";
        this.infomessage4 =
          "• For example: return of taxable purchases to suppliers, adjustment to input tax by allocating inputs to taxable and exempt supplies";
      }
      jQuery("#infoModal2").modal("show");
    } else if (labelName == "PurchaseSubjectToVAT") {
      if (this.language == "ar") {
        this.infotitle = "المشتريات الخاضعة لنسبة";
        this.infomessage1 =
          "• المبلغ الإجمالي للسلع والخدمات (غير شامل ضريبة القيمة المضافة) التي تم شراؤها في المملكة العربية السعودية خلال الفترة الحالية والخاضعة للضريبة بنسبة 5%";
        this.infomessage2 =
          "• يرجى الرجوع إلى رابط الأسئلة الشائعة في الأسفل للاطلاع على قائمة السلع والخدمات الخاضعة للنسبة الأساسية.";
        this.infomessage3 =
          "'• المبلغ الإجمالي للتعديلات التي تم إجراؤها على مشتريات (غير شامل ضريبة القيمة المضافة المدفوعة) السلع والخدمات الخاضعة لنسبة 5% والتي تم شراؤها في المملكة العربية السعودية.";
        this.infomessage4 =
          "• على سبيل المثال: مردودات المشتريات الخاضعة للضريبة بنسبة 5% إلى الموردين، تعديل خصم ضريبة المدخلات من خلال تخصيص المدخلات للتوريدات الخاضعة للضريبة والمعفاة ";
      } else {
        this.infotitle = "Purchases subject to VAT at ";
        this.infomessage1 =
          "• Total amount of goods and services (excluding VAT paid) purchased during the current period that were standard rated at 5% and bought in KSA.";
        this.infomessage2 =
          "• Please refer to the below FAQ URL for the list of standard rates goods and services.";
        this.infomessage3 =
          "'• Total amount of purchases adjustments (excluding VAT paid) made to goods and services purchased that were standard rated at 5% and bought in KSA.";
        this.infomessage4 =
          "• For example: return of taxable purchases to suppliers, adjustment to input tax by allocating inputs to taxable and exempt supplies";
      }
      jQuery("#infoModal2").modal("show");
    } else if (labelName == "ImportSubjectVatPaidCustoms") {
      if (this.language == "ar") {
        this.infotitle =
          "الاستيرادات الخاضعة لضريبة القيمة المضافة  بالنسبة الأساسية و التي تدفع في الجمارك";
        this.infomessage1 =
          "• المبلغ الإجمالي للسلع (غير شامل ضريبة القيمة المضافة) المستوردة والخاضعة للضريبة بالنسبة الأساسية والتي تم شراؤها خلال الفترة الحالية. يجب على المستوردين المعنيين تحديد وارداتهم الخاضعة للضريبة بالنسبة الأساسية.";
        this.infomessage2 =
          "• يرجى الرجوع إلى رابط الأسئلة الشائعة في الأسفل للاطلاع على قائمة السلع والخدمات الخاضعة للنسبة الأساسية. ";
        this.infomessage3 =
          "المبلغ الإجمالي للتعديلات التي تم إجراؤها على مشتريات (غير شامل ضريبة القيمة المضافة ) السلع الخاضعة للضريبة بالنسبة الأساسية والتي تم استيرادها خلال الفترة السابقة. يجب على المستوردين المعنيين تحديد وارداتهم الخاضعة للضريبة بالنسبة الأساسية. ";
      } else {
        this.infotitle = "Imports subject to VAT paid at customs";
        this.infomessage1 =
          "• Total amount of goods (excluding VAT paid) purchased during the current period that were standard rated and imported. Designated importers must specify their standard rated imports.";
        this.infomessage2 =
          "• Please refer to the below FAQ URL for the list of standard rates goods and services.";
        this.infomessage3 =
          "Total amount of purchases adjustments (excluding VAT paid) made to goods purchased during previous reporting periods that were standard rated and imported. Designated importers must specify their standard rated imports.";
      }
      jQuery("#infoModal3").modal("show");
    } else if (labelName == "ImportSubjectVatStepAmt") {
      if (this.language == "ar") {
        this.infotitle =
          "الاستيرادات الخاضعة لضريبة القيمة المضافة  بالنسبة الأساسية و التي تدفع في الجمارك";
        this.infomessage1 =
          "• المبلغ الإجمالي للسلع (غير شامل ضريبة القيمة المضافة) المستوردة والخاضعة للضريبة بنسبة 5% والتي تم شراؤها خلال الفترات السابقة. يجب على المستوردين المعنيين تحديد وارداتهم الخاضعة للضريبة بنسبة 5%. ";
        this.infomessage2 =
          "• يرجى الرجوع إلى رابط الأسئلة الشائعة في الأسفل للاطلاع على قائمة السلع والخدمات الخاضعة للنسبة الأساسية. ";
        this.infomessage3 =
          "المبلغ الإجمالي للتعديلات التي تم إجراؤها على مشتريات (غير شامل ضريبة القيمة المضافة ) السلع الخاضعة للضريبة بنسبة 5% والتي تم استيرادها خلال الفترة السابقة. يجب على المستوردين المعنيين تحديد وارداتهم الخاضعة للضريبة بنسبة 5%. ";
      } else {
        this.infotitle = "Imports subject to VAT paid at customs";
        this.infomessage1 =
          "• Total amount of goods (excluding VAT paid) purchased during the previous periods that were standard rated at 5% and imported. Designated importers must specify their standard rated imports.";
        this.infomessage2 =
          "• Please refer to the below FAQ URL for the list of standard rates goods and services.";
        this.infomessage3 =
          "Total amount of purchases adjustments (excluding VAT paid) made to goods purchased during previous reporting periods that were standard rated at 5% and imported. Designated importers must specify their standard rated imports 5%.";
      }
      jQuery("#infoModal3").modal("show");
    } else if (labelName == "ImportSubjectVatPaidforReverseCharge") {
      if (this.language == "ar") {
        this.infotitle =
          "الاستيرادات الخاضعة لضريبة القيمة المضافة التي تُطبق عليها آلية الاحتساب العكسي";
        this.infomessage1 =
          "• المبلغ الإجمالي للخدمات (غير شامل لضريبة القيمة المضافة) المستوردة والخاضعة للضريبة بالنسبة الأساسية والمحتسبة وفقاً لآلية الاحتساب العكسي والتي تم شراؤها خلال الفترة الحالية. ";
        this.infomessage2 =
          "• يتم استخدام آلية الاحتساب العكسي عندما يكون مستلم السلع والخدمات الخاضع للضريبة مسؤولاً عن أي ضريبة قيمة مضافة مستحقة بدلاً من المورد الخاضع للضريبة. يكون العميل بمثابة المورد والمستلم لأغراض ضريبة القيمة المضافة ويقيّم ذاتياً أي ضريبة قيمة مضافة مستحقة.";
        this.infomessage3 =
          "• يرجى الرجوع إلى رابط الأسئلة الشائعة في الأسفل للاطلاع على قائمة السلع والخدمات الخاضعة للضريبة بالنسبة الأساسية.";
        this.infomessage4 =
          "المبلغ الإجمالي للتعديلات التي تم إجراؤها على مشتريات (غير شامل ضريبة القيمة المضافة ) الخدمات المستوردة والخاضعة للضريبة بالنسبة الأساسية والمحتسبة وفقاً لآلية الاحتساب العكسي . ";
      } else {
        this.infotitle =
          "Imports subject to VAT accounted for through the reverse charge mechanism";
        this.infomessage1 =
          "• Total amount of goods and services (excluding VAT paid) purchased during the current period that were standard rated and imported and reverse charged. ";
        this.infomessage2 =
          "• Reverse charge is where the taxable recipient of goods and services accounts for any VAT due as opposed to the taxable supplier. The customer acts as if he is both the supplier and the recipient for VAT purposes and self-assesses any VAT due.";
        this.infomessage3 =
          "• Please refer to the below FAQ URL for the list of standard rates goods and services.";
        this.infomessage4 =
          "Total amount of purchases adjustments (excluding VAT paid) made to services purchased during previous reporting periods that were standard rated and imported and reverse charged.";
      }
      jQuery("#infoModal4").modal("show");
    } else if (labelName == "ImportSubjectVatPaidforReverseChargeStepAmt") {
      if (this.language == "ar") {
        this.infotitle =
          "الاستيرادات الخاضعة لضريبة القيمة المضافة التي تُطبق عليها آلية الاحتساب العكسي";
        this.infomessage1 =
          "• المبلغ الإجمالي للخدمات (غير شامل لضريبة القيمة المضافة) المستوردة والخاضعة للضريبة بنسبة 5% والمحتسبة وفقاً لآلية الاحتساب العكسي والتي تم شراؤها خلال الفترة الحالية. ";
        this.infomessage2 =
          "• يتم استخدام آلية الاحتساب العكسي عندما يكون مستلم السلع والخدمات الخاضع للضريبة مسؤولاً عن أي ضريبة قيمة مضافة مستحقة بدلاً من المورد الخاضع للضريبة. يكون العميل بمثابة المورد والمستلم لأغراض ضريبة القيمة المضافة ويقيّم ذاتياً أي ضريبة قيمة مضافة مستحقة.";
        this.infomessage3 =
          "• يرجى الرجوع إلى رابط الأسئلة الشائعة في الأسفل للاطلاع على قائمة السلع والخدمات الخاضعة للضريبة بالنسبة الأساسية.";
        this.infomessage4 =
          "المبلغ الإجمالي للتعديلات التي تم إجراؤها على مشتريات (غير شامل ضريبة القيمة المضافة ) الخدمات المستوردة والخاضعة للضريبة بنسبة 5% والمحتسبة وفقاً لآلية الاحتساب العكسي . ";
      } else {
        this.infotitle =
          "Imports subject to VAT accounted for through the reverse charge mechanism";
        this.infomessage1 =
          "• Total amount of goods and services (excluding VAT paid) purchased during the current period that were standard rated at 5% and imported and reverse charged. ";
        this.infomessage2 =
          "• Reverse charge is where the taxable recipient of goods and services accounts for any VAT due as opposed to the taxable supplier. The customer acts as if he is both the supplier and the recipient for VAT purposes and self-assesses any VAT due.";
        this.infomessage3 =
          "• Please refer to the below FAQ URL for the list of standard rates goods and services.";
        this.infomessage4 =
          "Total amount of purchases adjustments (excluding VAT paid) made to services purchased during previous reporting periods that were standard rated at 5% and imported and reverse charged.";
      }
      jQuery("#infoModal4").modal("show");
    } else if (labelName == "ZeroRatedPurchases") {
      if (this.language == "ar") {
        this.infotitle = "المشتريات الخاضعة للنسبة الصفرية";
        this.infomessage1 =
          "• المبلغ الإجمالي للسلع والخدمات (غير شامل ضريبة القيمة المضافة) التي تم شراؤها خلال الفترة الحالية سواءً كانت: ";
        this.infomessage2 =
          "- خاضعة للضريبة بنسبة صفر بالمائة وتم شراؤها في المملكة، ";
        this.infomessage3 =
          "أو- خاضعة للضريبة بنسبة صفر بالمائة ومستوردة من دولة أخرى";
        this.infomessage4 =
          "• يرجى الرجوع إلى رابط الأسئلة الشائعة في الأسفل للاطلاع على قائمة السلع والخدمات الخاضعة للضريبة بنسبة صفر.";
        this.infomessage5 =
          "'• المبلغ الإجمالي للتعديلات التي تم إجراؤها على مشتريات السلع والخدمات (غير شامل ضريبة القيمة المضافة) خلال الفترة الحالية سواءً كانت:";
        this.infomessage6 =
          " - خاضعة للضريبة بنسبة صفر وتم شراؤها في المملكة العربية السعودية، أو";
        this.infomessage7 = "- خاضعة للضريبة بنسبة صفر ومستوردة من دولة أخرى";
        this.infomessage8 =
          "• على سبيل المثال: إرجاع مشتريات خاضعة للضريبة بنسبة صفر إلى الموردين";
      } else {
        this.infotitle = "Zero rated purchases";
        this.infomessage1 =
          "• Total amount of goods and services (excluding VAT paid) purchased during the current period that were either,";
        this.infomessage2 = "– Zero rated and purchased in KSA or, ";
        (this.infomessage3 =
          "– Zero rated and imported from a country outside of KSA"),
          (this.infomessage4 =
            "• Please refer to below FAQ URL for a list of zero rated goods and services");
        this.infomessage5 =
          "• Total amount of purchases adjustments (excluding VAT paid) made to goods and services purchased during previous reporting periods that were either,";
        this.infomessage6 = "– Zero rated and purchased in KSA or,";
        this.infomessage7 =
          "– Zero rated and imported from a country outside of KSA";
        this.infomessage8 =
          "• For example: return of zero taxed purchases to suppliers";
      }
      jQuery("#infoModal5").modal("show");
    } else if (labelName == "ExemptPurchases") {
      if (this.language == "ar") {
        this.infotitle = "المشتريات المعفاة";
        this.infomessage1 =
          "• المبلغ الإجمالي للتوريدات المعفاة التي تم شراؤها في المملكة أو تم استيرادها من خارجها خلال الفترة الحالية .";
        this.infomessage2 =
          "• يرجى الرجوع إلى رابط الأسئلة الشائعة في الأسفل للاطلاع على قائمة السلع والخدمات الخاضعة للضريبة بنسبة صفر بالمائة.";
        this.infomessage3 =
          "• المبلغ الإجمالي للتعديلات التي تم إجراؤها على مشتريات التوريدات المعفاة التي تم شراؤها في المملكة أو تم استيرادها من خارجها خلال الفترات السابقة ";
        this.infomessage4 =
          "• على سبيل المثال: إرجاع المشتريات المعفاة إلى الموردين";
      } else {
        this.infotitle = " Exempt purchases";
        this.infomessage1 =
          "• Total amount of goods and services purchased during the current period that were exempted and either bought in KSA or imported from a country outside of KSA";
        this.infomessage2 =
          "• Please refer to the below FAQ URL for a list of zero rated goods and services.";
        this.infomessage3 =
          "• Total amount of purchases adjustments made to goods and services purchased during previous reporting periods that were exempted and either bought in KSA or imported from a country outside of KSA ";
        this.infomessage4 =
          "• For example: return of exempt purchases to suppliers";
      }
      jQuery("#infoModal2").modal("show");
    }
  }
  totalAmountPopup(controlName) {
    this.amountModal = false;
    if (controlName == "totalSales") {
      let vattenpercentamount =
        +this.VATSalesForm.value.totalSales +
        +this.VATSalesForm.value.totalSales * 0.1;
      if (
        vattenpercentamount < +this.VATSalesForm.value.totalSalesAdjustment &&
        this.totalsModal == false
      ) {
        if (this.language != "ar") {
          this.message =
            "The adjustment amount entered is more than 10% larger than the total amount of sales. Please verify the amount entered in the return or continue if the amount entered is correct.";
        } else if (this.language == "ar") {
          this.message =
            "مبلغ التعديل المدخل أكثر من 10% وذلك أكبر من إجمالي مبلغ المبيعات , يرجى التأكد من صحة المبلغ المدرج بالإقرار أو المتابعة إذا كان المبلغ المدرج صحيح . ";
        }

        jQuery("#amountModal").modal("show");
        this.totalsModal = true;
        // this.step=3;
      } else {
        this.step = 3;
      }
    } else if (controlName == "totalPurchases") {
      let vattenpercentamount =
        +this.VATPurchasesForm.value.totalPurchases +
        +this.VATPurchasesForm.value.totalPurchases * 0.1;
      let vattotpercentageamount =
        +this.VATSalesForm.value.totalSales +
        +this.VATSalesForm.value.totalSales * 0.1;
      if (
        vattenpercentamount <
          +this.VATPurchasesForm.value.totalPurchasesAdjustment &&
        this.totalsModal == false
      ) {
        if (this.language != "ar") {
          this.message =
            "The adjustment amount entered is more than 10% larger than the amount of total purchases. Please verify the amount entered in the return or continue if the amount entered is correct.";
        } else if (this.language == "ar") {
          this.message =
            ".مبلغ التعديل المدخل أكثر من 10% وذلك أكبر من مبلغ إجمالي المشتريات , يرجى التأكد من صحة المبلغ المدرج بالإقرار أو المتابعة إذا كان المبلغ المدرج صحيح ";
        }

        jQuery("#amountModal").modal("show");
        this.totalsModal = true;
      } else if (
        vattotpercentageamount < +this.VATPurchasesForm.value.totalPurchases &&
        this.totalModal == false
      ) {
        if (this.language != "ar") {
          this.message =
            "The amount of your purchases for the current period is much more than the amount of sales for the same period. Please verify the amount entered in the return or continue if the amount entered is correct.";
        } else if (this.language == "ar") {
          this.message =
            "مبلغ المشتريات الخاصة بك للفترة الحالية أكبر بكثير من مبلغ المبيعات لنفس الفترة , يرجى التأكد من صحة المبلغ المدرج بالإقرار أو المتابعة إذا كان المبلغ المدرج صحيح ";
        }
        this.amountModal = true;
        jQuery("#amountModal").modal("show");
        this.totalModal = true;
      } else {
        this.step = 4;
      }
    } else if (controlName == "StandardRatedDomesticPurchases1") {
      let Percentage =
        +this.VATPurchasesForm.value.StandardRatedDomesticPurchases1 +
        +this.VATPurchasesForm.value.PurchaseSubjectToVAT * 0.1;
      if (
        this.VATSalesForm.value.totalSales <
        this.VATPurchasesForm.value.StandardRatedDomesticPurchases1
      ) {
        if (this.language != "ar") {
          this.message =
            "Your standard-rated domestic purchases are greater than your total reported sales for the period. Please verify the amount entered in the return or continue if the amount entered is correct.";
        } else if (this.language == "ar") {
          this.message =
            "المشتريات المحلية الخاصة بك الخاضعة للضريبة بالنسبة الأساسية  أكبر من إجمالي المبيعات المصرح عنها للفترة , يرجى التأكد من صحة المبلغ المدرج بالإقرار أو المتابعة إذا كان المبلغ المدرج صحيح .";
        }
        this.amountModal = true;
        jQuery("#amountModal").modal("show");
      } else if (this.VATSalesForm.value.totalSales < Percentage) {
        if (this.language != "ar") {
          this.message =
            "Your standard-rated domestic purchases are greater than your total reported sales for the period. Please verify the amount entered in the return or continue if the amount entered is correct.";
        } else if (this.language == "ar") {
          this.message =
            "المشتريات المحلية الخاصة بك الخاضعة للضريبة بالنسبة الأساسية  أكبر من إجمالي المبيعات المصرح عنها للفترة , يرجى التأكد من صحة المبلغ المدرج بالإقرار أو المتابعة إذا كان المبلغ المدرج صحيح .";
        }
        this.amountModal = true;
        jQuery("#amountModal").modal("show");
      }
    }
  }
  AdjustmentAmountPopUp(formName, adjustmentcontrolName, amountcontrolName) {
    this.amountModal = false;
    if (adjustmentcontrolName == "StandardRatedSales1Adjustment") {
      if (
        +formName.value[amountcontrolName] == 0 &&
        +formName.value[adjustmentcontrolName] > 0
      ) {
        if (this.language != "ar") {
          this.message =
            "You have entered an adjustment amount without entering a sales amount. Please verify the amount entered in the return or continue if the amount entered is correct.";
        } else if (this.language == "ar") {
          this.message =
            "لقد قمت بإدخال مبلغ التعديل دون إدخال مبلغ المبيعات , يرجى التأكد من صحة المبلغ المدرج بالإقرار أو المتابعة إذا كان المبلغ المدرج صحيح . ";
        }

        jQuery("#amountModal").modal("show");
      } else {
        let tenpercentamount =
          +formName.value[amountcontrolName] +
          +formName.value[amountcontrolName] * 0.1;
        if (tenpercentamount < +formName.value[adjustmentcontrolName]) {
          if (this.language != "ar") {
            this.message =
              "The adjustment amount entered is more than 10% larger than the amount of domestic standard-rated sales. Please verify the amount entered in the return or continue if the amount entered is correct.";
          } else if (this.language == "ar") {
            this.message =
              "مبلغ التعديل المدخل أكثر من 10% وذلك أكبر من مبلغ المبيعات المحلية الخاضعة للضريبة بالنسبة الأساسية , يرجى التأكد من صحة المبلغ المدرج بالإقرار أو المتابعة إذا كان المبلغ المدرج صحيح .";
          }
          jQuery("#amountModal").modal("show");
        }
      }
    } else if (
      adjustmentcontrolName == "PrivateHealthCareEducationAdjustment"
    ) {
      if (
        +formName.value[amountcontrolName] == 0 &&
        +formName.value[adjustmentcontrolName] > 0
      ) {
        if (this.language == "ar") {
          this.message =
            "لقد قمت بادخال مبلغ التعديل دون إدخال مبلغ المبيعات , يرجى التأكد من صحة المبلغ المدرج بالإقرار أو المتابعة إذا كان المبلغ المدرج صحيح .";
        } else {
          this.message =
            "You have entered an adjustment amount without entering a sales amount. Please verify the amount entered in the return or continue if the amount entered is correct.";
        }
        jQuery("#amountModal").modal("show");
      } else {
        let tenpercentamount =
          +formName.value[amountcontrolName] +
          +formName.value[amountcontrolName] * 0.1;
        if (tenpercentamount < +formName.value[adjustmentcontrolName]) {
          if (this.language == "ar") {
            this.message =
              "مبلغ التعديل المدخل اكثر من 10 % وذلك اكبر من مبلغ مبيعات للمواطنين (الخدمات الصحية الخاصة، التعليم الأهلي الخاص)، يرجي التأكد من صحه المبلغ المدرج بالإقرار أو المتابعه إذا كان المبلغ المدرج صحيح";
          } else {
            this.message =
              "The adjustment amount entered is more than 10% larger than the amount of sales to citizens (private healthcare, private education). Please verify the amount entered in the return or continue if the amount entered is correct.";
          }
          jQuery("#amountModal").modal("show");
        }
      }
    } else if (adjustmentcontrolName == "ZeroRatedDomesticSales") {
      if (+formName.value[amountcontrolName] >= 0 && this.RateTrtmt != "Z") {
        if (this.language == "ar") {
          this.message =
            "تشير سجلاتنا إلى أنك لا تنتمي للقطاع الخاضع للضريبة بنسبة صفر بالمائة، وأنه لا يوجد مبيعات خاضعة للضريبة بنسبة صفر بالمائة في هذه الفئة. ";
        } else {
          this.message =
            "Our records indicate that you are not a part of the zero-rated industry and you reported non zero sales in this category.";
        }
        this.amountModal = true;
        jQuery("#amountModal").modal("show");
      }
    } else if (adjustmentcontrolName == "ZeroRatedDomesticSalesAdjustment") {
      if (
        +formName.value[amountcontrolName] == 0 &&
        +formName.value[adjustmentcontrolName] > 0
      ) {
        if (this.language == "ar") {
          this.message =
            "تشير سجلاتنا إلى أنك لا تنتمي للقطاع الخاضع للضريبة بنسبة صفر بالمائة، وأنه لا يوجد مبيعات خاضعة للضريبة بنسبة صفر بالمائة في هذه الفئة. ";
        } else {
          this.message =
            "Our records indicate that you are not a part of the zero-rated industry and you reported non zero sales in this category.";
        }
        jQuery("#amountModal").modal("show");
      } else {
        let tenpercentamount =
          +formName.value[amountcontrolName] +
          +formName.value[amountcontrolName] * 0.1;
        if (tenpercentamount < +formName.value[adjustmentcontrolName]) {
          if (this.language == "ar") {
            this.message =
              "مبلغ التعديل المدخل أكثر من 10% وذلك أكبر من مبلغ المبيعات المحلية الخاضعة للضريبة بنسبة صفر بالمائة , يرجى التأكد من صحة المبلغ المدرج بالإقرار أو المتابعة إذا كان المبلغ المدرج صحيح .";
          } else {
            this.message =
              "The adjustment amount entered is more than 10% larger than the amount of zero rated domestic sales. Please verify the amount entered in the return or continue if the amount entered is correct.";
          }
          jQuery("#amountModal").modal("show");
        }
      }
    } else if (adjustmentcontrolName == "ExportsAdjustment") {
      if (
        +formName.value[amountcontrolName] == 0 &&
        +formName.value[adjustmentcontrolName] > 0
      ) {
        if (this.language == "ar") {
          this.message =
            "تشير سجلاتنا  بأنك لست مصدّر, وأنه يوجد مبيعات لا تخضع للضريبة بنسبة صفر في حقل الصادرات. ";
        } else {
          this.message =
            "Our records indicate that you are not mainly an exporter and you reported non-zero sales in exports. ";
        }
        jQuery("#amountModal").modal("show");
      } else {
        let tenpercentamount =
          +formName.value[amountcontrolName] +
          +formName.value[amountcontrolName] * 0.1;
        if (tenpercentamount < +formName.value[adjustmentcontrolName]) {
          if (this.language == "ar") {
            this.message =
              "مبلغ التعديل المدخل أكثر من 10 % وذلك أكبر من مبلغ الصادرات الخاضعة للضريبة بنسبة صفر بالمائة , يرجى التأكد من صحة المبلغ المدرج بالإقرار أو المتابعة إذا كان المبلغ المدرج صحيح .";
          } else {
            this.message =
              "The adjustment amount entered is more than 10% larger than the amount of zero rated exports. Please verify the amount entered in the return or continue if the amount entered is correct.";
          }
          jQuery("#amountModal").modal("show");
        }
      }
    } else if (adjustmentcontrolName == "ExemptSales") {
      if (+formName.value[amountcontrolName] >= 0 && this.RateTrtmt != "E") {
        if (this.language == "ar") {
          this.message =
            "تشير سجلاتنا إلى أن أن قطاعك غير معفى من الضريبة  ولكن يوجد مبيعات معفاة من الضريبة في إقرارك.";
        } else {
          this.message =
            "Our records indicate that you are not mainly an exempted industry but you reported non-zero exempted sales.";
        }
        this.amountModal = true;
        jQuery("#amountModal").modal("show");
      }
    } else if (adjustmentcontrolName == "ExemptSalesAdjustment") {
      if (
        +formName.value[amountcontrolName] == 0 &&
        +formName.value[adjustmentcontrolName] > 0
      ) {
        if (this.language == "ar") {
          this.message =
            "تشير سجلاتنا إلى أن أن قطاعك غير معفى من الضريبة  ولكن يوجد مبيعات معفاة من الضريبة في إقرارك.  ";
        } else {
          this.message =
            "Our records indicate that you are not mainly an exempted industry but you reported non-zero exempted sales.  ";
        }
        jQuery("#amountModal").modal("show");
      } else {
        let tenpercentamount =
          +formName.value[amountcontrolName] +
          +formName.value[amountcontrolName] * 0.1;
        if (tenpercentamount < +formName.value[adjustmentcontrolName]) {
          if (this.language == "ar") {
            this.message =
              "مبلغ التعديل المدخل أكثر من 10%  وذلك أكبر من مبلغ المبيعات المعفاة من الضريبة , يرجى التأكد من صحة المبلغ المدرج بالإقرار أو المتابعة إذا كان المبلغ المدرج صحيح .";
          } else {
            this.message =
              "The adjustment amount entered is more than 10% larger than the amount of exempt sales. Please verify the amount entered in the return or continue if the amount entered is correct.";
          }
          jQuery("#amountModal").modal("show");
        }
      }
    } else if (adjustmentcontrolName == "salesSubjecttovatAdjustment") {
      if (
        +formName.value[amountcontrolName] == 0 &&
        +formName.value[adjustmentcontrolName] > 0
      ) {
        if (this.language != "ar") {
          this.message =
            "You have entered an adjustment amount without entering a sales amount. Please verify the amount entered in the return or continue if the amount entered is correct.";
        } else {
          this.message =
            "لقد قمت بإدخال مبلغ التعديل دون إدخال مبلغ المبيعات , يرجى التأكد من صحة المبلغ المدرج بالإقرار أو المتابعة إذا كان المبلغ المدرج صحيح . ";
        }
        jQuery("#amountModal").modal("show");
      } else {
        let tenpercentamount =
          +formName.value[amountcontrolName] +
          +formName.value[amountcontrolName] * 0.1;
        if (tenpercentamount < +formName.value[adjustmentcontrolName]) {
          if (this.language != "ar") {
            this.message =
              "The adjustment amount entered is more than 10% larger than the amount of domestic standard-rated sales. Please verify the amount entered in the return or continue if the amount entered is correct.";
          } else if (this.language == "ar") {
            this.message =
              "مبلغ التعديل المدخل أكثر من 10% وذلك أكبر من مبلغ المبيعات المحلية الخاضعة للضريبة بالنسبة الأساسية , يرجى التأكد من صحة المبلغ المدرج بالإقرار أو المتابعة إذا كان المبلغ المدرج صحيح .";
          }
          jQuery("#amountModal").modal("show");
        }
      }
    } else if (
      adjustmentcontrolName == "StandardRatedDomesticPurchases1Adjustment"
    ) {
      if (
        +formName.value[amountcontrolName] == 0 &&
        +formName.value[adjustmentcontrolName] > 0
      ) {
        if (this.language == "ar") {
          this.message =
            "مبلغ التعديل المدخل أكثر من 10% وذلك أكبر من مبلغ المشتريات المحلية الخاضعة للضريبية بالنسبة الأساسية , يرجى التأكد من صحة المبلغ المدرج بالإقرار أو المتابعة إذا كان المبلغ المدرج صحيح .";
        } else {
          this.message =
            "The adjustment amount entered is more than 10% larger than the amount of standard rated domestic purchases. Please verify the amount entered in the return or continue if the amount entered is correct.";
        }
        jQuery("#amountModal").modal("show");
      } else {
        let tenpercentamount =
          +formName.value[amountcontrolName] +
          +formName.value[amountcontrolName] * 0.1;
        if (tenpercentamount < +formName.value[adjustmentcontrolName]) {
          if (this.language == "ar") {
            this.message =
              "مبلغ التعديل المدخل أكثر من 10% وذلك أكبر من مبلغ المشتريات المحلية الخاضعة للضريبية بالنسبة الأساسية , يرجى التأكد من صحة المبلغ المدرج بالإقرار أو المتابعة إذا كان المبلغ المدرج صحيح .";
          } else {
            this.message =
              "The adjustment amount entered is more than 10% larger than the amount of standard rated domestic purchases. Please verify the amount entered in the return or continue if the amount entered is correct.";
          }
          jQuery("#amountModal").modal("show");
        }
      }
    } else if (
      adjustmentcontrolName == "ImportSubjectVatPaidCustomsAdjustments"
    ) {
      if (
        +formName.value[amountcontrolName] == 0 &&
        +formName.value[adjustmentcontrolName] > 0
      ) {
        if (this.language == "ar") {
          this.message =
            "مبلغ التعديل المدخل أكثر من 10% وذلك أكبر من مبلغ الاستيرادات الخاضعة للضريبة والتي تم دفعها في منفذ الجمارك , يرجى التأكد من صحة المبلغ المدرج بالإقرار أو المتابعة إذا كان المبلغ المدرج صحيح .";
        } else {
          this.message =
            "The adjustment amount entered is more than 10% larger than the amount of Imports subject to VAT paid at Customs. Please verify the amount entered in the return or continue if the amount entered is correct.";
        }
        jQuery("#amountModal").modal("show");
      } else {
        let tenpercentamount =
          +formName.value[amountcontrolName] +
          +formName.value[amountcontrolName] * 0.1;
        if (tenpercentamount < +formName.value[adjustmentcontrolName]) {
          if (this.language == "ar") {
            this.message =
              "مبلغ التعديل المدخل أكثر من 10% وذلك أكبر من مبلغ الاستيرادات الخاضعة للضريبة والتي تم دفعها في منفذ الجمارك , يرجى التأكد من صحة المبلغ المدرج بالإقرار أو المتابعة إذا كان المبلغ المدرج صحيح .";
          } else {
            this.message =
              "The adjustment amount entered is more than 10% larger than the amount of Imports subject to VAT paid at Customs. Please verify the amount entered in the return or continue if the amount entered is correct.";
          }
          jQuery("#amountModal").modal("show");
        }
      }
    } else if (
      adjustmentcontrolName == "ImportSubjectVatPaidforReverseChargeAdjustments"
    ) {
      if (
        +formName.value[amountcontrolName] == 0 &&
        +formName.value[adjustmentcontrolName] > 0
      ) {
        if (this.language == "ar") {
          this.message =
            "مبلغ التعديل المدخل أكثر من 10% وذلك أكبر من مبلغ الاستيرادات الخاضعة للضريبة المحسوبة من خلال آلية الاحتساب العكسي , يرجى التأكد من صحة المبلغ المدرج بالإقرار أو المتابعة إذا كان المبلغ المدرج صحيح .";
        } else {
          this.message =
            "The adjustment amount entered is more than 10% larger than the amount of Imports subject to VAT accounted for through reverse charge mechanism. Please verify the amount entered in the return or continue if the amount entered is correct.";
        }
        jQuery("#amountModal").modal("show");
      } else {
        let tenpercentamount =
          +formName.value[amountcontrolName] +
          +formName.value[amountcontrolName] * 0.1;
        if (tenpercentamount < +formName.value[adjustmentcontrolName]) {
          if (this.language == "ar") {
            this.message =
              "مبلغ التعديل المدخل أكثر من 10% وذلك أكبر من مبلغ الاستيرادات الخاضعة للضريبة المحسوبة من خلال آلية الاحتساب العكسي , يرجى التأكد من صحة المبلغ المدرج بالإقرار أو المتابعة إذا كان المبلغ المدرج صحيح .";
          } else {
            this.message =
              "The adjustment amount entered is more than 10% larger than the amount of Imports subject to VAT accounted for through reverse charge mechanism. Please verify the amount entered in the return or continue if the amount entered is correct.";
          }
          jQuery("#amountModal").modal("show");
        }
      }
    } else if (adjustmentcontrolName == "ZeroRatedPurchasesAdjustments") {
      if (
        +formName.value[amountcontrolName] == 0 &&
        +formName.value[adjustmentcontrolName] > 0
      ) {
        if (this.language == "ar") {
          this.message =
            "مبلغ التعديل المدخل أكثر من 10% وذلك أكبر من مبلغ المشتريات الخاضعة لنسبة صفر بالمائة , يرجى التأكد من صحة المبلغ المدرج بالإقرار أو المتابعة إذا كان المبلغ المدرج صحيح .";
        } else {
          this.message =
            "The adjustment amount entered is more than 10% larger than the amount of Zero rated purchase. Please verify the amount entered in the return or continue if the amount entered is correct.";
        }
        jQuery("#amountModal").modal("show");
      } else {
        let tenpercentamount =
          +formName.value[amountcontrolName] +
          +formName.value[amountcontrolName] * 0.1;
        if (tenpercentamount < +formName.value[adjustmentcontrolName]) {
          if (this.language == "ar") {
            this.message =
              "مبلغ التعديل المدخل أكثر من 10% وذلك أكبر من مبلغ المشتريات الخاضعة لنسبة صفر بالمائة , يرجى التأكد من صحة المبلغ المدرج بالإقرار أو المتابعة إذا كان المبلغ المدرج صحيح .";
          } else {
            this.message =
              "The adjustment amount entered is more than 10% larger than the amount of Zero rated purchase. Please verify the amount entered in the return or continue if the amount entered is correct.";
          }
          jQuery("#amountModal").modal("show");
        }
      }
    } else if (adjustmentcontrolName == "ExemptPurchasesAdjustment") {
      if (
        +formName.value[amountcontrolName] == 0 &&
        +formName.value[adjustmentcontrolName] > 0
      ) {
        if (this.language == "ar") {
          this.message =
            " مبلغ التعديل المدخل أكثر من 10% وذلك أكبر من مبلغ المشتريات المعفاه من الضريبة , يرجى التأكد من صحة المبلغ المدرج بالإقرار أو المتابعة إذا كان المبلغ المدرج صحيح .";
        } else {
          this.message =
            "The adjustment amount entered is more than 10% larger than the amount of exempt purchases. Please verify the amount entered in the return or continue if the amount entered is correct.";
        }
        jQuery("#amountModal").modal("show");
      } else {
        let tenpercentamount =
          +formName.value[amountcontrolName] +
          +formName.value[amountcontrolName] * 0.1;
        if (tenpercentamount < +formName.value[adjustmentcontrolName]) {
          if (this.language == "ar") {
            this.message =
              " مبلغ التعديل المدخل أكثر من 10% وذلك أكبر من مبلغ المشتريات المعفاه من الضريبة , يرجى التأكد من صحة المبلغ المدرج بالإقرار أو المتابعة إذا كان المبلغ المدرج صحيح .";
          } else {
            this.message =
              "The adjustment amount entered is more than 10% larger than the amount of exempt purchases. Please verify the amount entered in the return or continue if the amount entered is correct.";
          }
          jQuery("#amountModal").modal("show");
        }
      }
    } else if (adjustmentcontrolName == "PurchaseSubjectToVATAdjustment") {
      if (
        +formName.value[amountcontrolName] == 0 &&
        +formName.value[adjustmentcontrolName] > 0
      ) {
        if (this.language == "ar") {
          this.message =
            "مبلغ التعديل المدخل أكثر من 10% وذلك أكبر من مبلغ المشتريات المحلية الخاضعة للضريبية بالنسبة الأساسية , يرجى التأكد من صحة المبلغ المدرج بالإقرار أو المتابعة إذا كان المبلغ المدرج صحيح .";
        } else {
          this.message =
            "The adjustment amount entered is more than 10% larger than the amount of standard rated domestic purchases. Please verify the amount entered in the return or continue if the amount entered is correct.";
        }
        jQuery("#amountModal").modal("show");
      } else {
        let tenpercentamount =
          +formName.value[amountcontrolName] +
          +formName.value[amountcontrolName] * 0.1;
        if (tenpercentamount < +formName.value[adjustmentcontrolName]) {
          if (this.language == "ar") {
            this.message =
              "مبلغ التعديل المدخل أكثر من 10% وذلك أكبر من مبلغ المشتريات المحلية الخاضعة للضريبية بالنسبة الأساسية , يرجى التأكد من صحة المبلغ المدرج بالإقرار أو المتابعة إذا كان المبلغ المدرج صحيح .";
          } else {
            this.message =
              "The adjustment amount entered is more than 10% larger than the amount of standard rated domestic purchases. Please verify the amount entered in the return or continue if the amount entered is correct.";
          }
          jQuery("#amountModal").modal("show");
        }
      }
    } else if (adjustmentcontrolName == "ImportSubjectVatStepAdjustments") {
      if (
        +formName.value[amountcontrolName] == 0 &&
        +formName.value[adjustmentcontrolName] > 0
      ) {
        if (this.language == "ar") {
          this.message =
            "مبلغ التعديل المدخل أكثر من 10% وذلك أكبر من مبلغ الاستيرادات الخاضعة للضريبة والتي تم دفعها في منفذ الجمارك , يرجى التأكد من صحة المبلغ المدرج بالإقرار أو المتابعة إذا كان المبلغ المدرج صحيح .";
        } else {
          this.message =
            "The adjustment amount entered is more than 10% larger than the amount of Imports subject to VAT paid at Customs. Please verify the amount entered in the return or continue if the amount entered is correct";
        }
        jQuery("#amountModal").modal("show");
      } else {
        let tenpercentamount =
          +formName.value[amountcontrolName] +
          +formName.value[amountcontrolName] * 0.1;
        if (tenpercentamount < +formName.value[adjustmentcontrolName]) {
          if (this.language == "ar") {
            this.message =
              "مبلغ التعديل المدخل أكثر من 10% وذلك أكبر من مبلغ الاستيرادات الخاضعة للضريبة والتي تم دفعها في منفذ الجمارك , يرجى التأكد من صحة المبلغ المدرج بالإقرار أو المتابعة إذا كان المبلغ المدرج صحيح .";
          } else {
            this.message =
              "The adjustment amount entered is more than 10% larger than the amount of Imports subject to VAT paid at Customs. Please verify the amount entered in the return or continue if the amount entered is correct";
          }
          jQuery("#amountModal").modal("show");
        }
      }
    } else if (
      adjustmentcontrolName ==
      "ImportSubjectVatPaidforReverseChargeStepAdjustments"
    ) {
      if (
        +formName.value[amountcontrolName] == 0 &&
        +formName.value[adjustmentcontrolName] > 0
      ) {
        if (this.language == "ar") {
          this.message =
            "مبلغ التعديل المدخل أكثر من 10% وذلك أكبر من مبلغ الاستيرادات الخاضعة للضريبة المحسوبة من خلال آلية الاحتساب العكسي , يرجى التأكد من صحة المبلغ المدرج بالإقرار أو المتابعة إذا كان المبلغ المدرج صحيح ";
        } else {
          this.message =
            "The adjustment amount entered is more than 10% larger than the amount of Imports subject to VAT accounted for through reverse charge mechanism. Please verify the amount entered in the return or continue if the amount entered is correct.";
        }
        jQuery("#amountModal").modal("show");
      } else {
        let tenpercentamount =
          +formName.value[amountcontrolName] +
          +formName.value[amountcontrolName] * 0.1;
        if (tenpercentamount < +formName.value[adjustmentcontrolName]) {
          if (this.language == "ar") {
            this.message =
              "مبلغ التعديل المدخل أكثر من 10% وذلك أكبر من مبلغ الاستيرادات الخاضعة للضريبة المحسوبة من خلال آلية الاحتساب العكسي , يرجى التأكد من صحة المبلغ المدرج بالإقرار أو المتابعة إذا كان المبلغ المدرج صحيح ";
          } else {
            this.message =
              "The adjustment amount entered is more than 10% larger than the amount of Imports subject to VAT accounted for through reverse charge mechanism. Please verify the amount entered in the return or continue if the amount entered is correct.";
          }
          jQuery("#amountModal").modal("show");
        }
      }
    }
  }
  onIBANSelect(bank) {
    this.vatDetailsObj["RefundFg"] = "1";
    this.vatDetailsObj["IbanCb"] = "0";
    //this.vatDetailsObj['oData']={'Iban': bank.Iban};
    this.vatDetailsObj["Iban"] = bank.Iban;
    this.IbanSelected = true;
    // console.log(this.IbanSelected);
    console.log(this.vatDetailsObj);
  }
  NewBankAccountSave() {
    this.vatDetailsObj["RefundFg"] = "1";
    this.vatDetailsObj["IbanCb"] = "1";
    this.returnsService.saveIBANAccount(this.IBANNumber).subscribe((data) => {
      console.log(data);
      this.vatDetailsObj["Iban"] = this.IBANNumber;
      this.IbanSelected = true;
    });
  }
  generateSadadNumber(fbnum) {
    this.returnsService.generateSadadNumber(fbnum).subscribe((data) => {
      console.log(data);
      this.taxPayerDetails.Sopbel = data["d"]["results"][0]["Sopbel"];
      this.taxPayerDetails.Betrh = data["d"]["results"][0]["Betrh"];
      console.log(this.taxPayerDetails.Sopbel);
    });
  }
  onDownloadAcknowledgement() {
    console.log(this.vatDetailsObj["Fbnumz"]);
    this.returnsService
      .DownloadAcknowledgement(this.vatDetailsObj["Fbnumz"])
      .subscribe((data: any) => {
        FileSaver.saveAs(data, "vatAcknowledgement.pdf");
      });
  }
  onDownloadForm() {
    console.log(this.vatDetailsObj["Fbnumz"]);
    this.returnsService
      .DownloadForm(this.vatDetailsObj["Fbnumz"], "")
      .subscribe((data: any) => {
        FileSaver.saveAs(data, "vatForm.pdf");
      });
  }
  calculateVat() {
    console.log(
      +this.VATSalesForm.value.TotalVATonSales,
      +this.VATPurchasesForm.value.totalVATOnPurchases,
      +this.CorrectionPenality,
      +this.CreditVat,
      +this.lateFinePenality
    );
    this.NetdueVat =
      (+this.VATSalesForm.value.TotalVATonSales || 0) -
      (+this.VATPurchasesForm.value.totalVATOnPurchases || 0);
    this.netVat =
      (+this.VATSalesForm.value.TotalVATonSales || 0) -
        (+this.VATPurchasesForm.value.totalVATOnPurchases || 0) +
        (+this.CorrectionPenality || 0) +
        (+this.CreditVat || 0) +
        (+this.lateFinePenality || 0) || 0.0;
    console.log(this.netVat);
  }
  //hema added on 13-11-2020 starts
  SaveVatReturnReview() {
    this.calculateVat();
    if (this.reviewModalShows) {
      this.step = 5;
    } else {
      this.fromModal = true;
      if (this.vatDetailsObj.Fbnumz == "") {
        this.vatDetailsObj["SubmitFg"] = "X";
      } else {
        this.vatDetailsObj["SubmitFg"] = "";
      }

      if (this.vatDetailsObj["SubmitFg"] == "X") {
        this.SaveVatReturn();
      }

      // else {
      //   this.step = 5;
      // }

      this.reviewModalShows = true;
      jQuery("#ReviewModal").modal("show");
    }
  }
  //hema added on 13-11-2020 ends
  ShowSummary() {
    jQuery("#ReviewModal").modal("hide");
    console.log(this.netVat);
    this.step = 5;
    this.fromModal = false;
  }
  CorrectionPenalityChange() {
    if (this.CorrectionPenality > 5000 || this.CorrectionPenality < -5000) {
      this.CorrectionPenality = "0.00";
      this.calculateVat();
    } else {
      this.calculateVat();
    }
  }
  NumberAllow(event) {
    // var rgx = /^[0-9]*\-.?[0-9]*$/;
    // if(!rgx.test(this.CorrectionPenality))
    // {
    //   this.CorrectionPenality='0.00';
    // }
    // return rgx.test(this.CorrectionPenality);
    var rgx = /^[-]?\d{0,4}(\.\d{0,2})?$/;

    console.log(event.target.value);
    console.log(rgx.test(event.target.value));
    if (event.keyCode == 189) {
      return true;
    } else if (event.keyCode == 8) {
      return true;
    } else if (!rgx.test(event.target.value.toString().replace(/,/g, ""))) {
      event.preventDefault();
    }
  }
  FileUpload(event) {
    console.log(this.vatDetailsObj.AttDetSet);
    //console.log(this.taxpayerDetails.AttDetSet['results'][0]['RetGuid'],this.taxpayerDetails.AttDetSet['results'][0].Dotyp ||,this.taxpayerDetails.AttDetSet['results'][0].SchGuid,this.taxpayerDetails.AttDetSet['results'][0].Doguid ||  );
    const frmData = new FormData();
    let filename;
    filename = event.target.files[0]["name"];
    frmData.append("fileUpload", event.target.files[0]);
    this.returnsService
      .SaveGeneralAttachments(
        this.vatDetailsObj["ReturnIdz"],
        filename,
        frmData,
        "VTA0"
      )
      .subscribe(
        (data) => {
          //   console.log(data);
          this.ErrorFile = false;
          let obj = {
            DocUrl: data["d"]["DocUrl"],
            Mimetype: data["d"]["Mimetype"],
            RetGuid: this.vatDetailsObj["ReturnIdz"],
            Seqno: "",
            DataVersion: "",
            SchGuid: data["d"]["SchGuid"],
            Dotyp: "VTA0",
            Srno: data["d"]["Srno"],
            Doguid: data["d"]["Doguid"],
            AttBy: "TP",
            Filename: data["d"]["Filename"],
            FileExtn: data["d"]["Filename"].toString().split(".")[1],
            Enbedit: "",
            Enbdele: "",
            Visedit: "",
            Visdel: "",
          };
          console.log(obj);
          this.vatDetailsObj.ATTACHSet["results"].push(obj);
          console.log(this.vatDetailsObj.ATTACHSet["results"]);
          this.myInputVariable.nativeElement.value = "";
        },
        (err) => {
          console.error(err);
          this.notifierService.notify(
            "error",
            err["error"]["error"]["innererror"]["errordetails"][0]["message"]
          );
        }
      );
  }
  DeleteAttachement(obj) {
    this.returnsService
      .DeleteAttachement(
        "undefined",
        obj["Dotyp"],
        obj["SchGuid"],
        obj["Srno"],
        obj["Doguid"]
      )
      .subscribe(
        (data) => {
          console.log(data);
          this.vatDetailsObj.ATTACHSet[
            "results"
          ] = this.vatDetailsObj.ATTACHSet["results"].filter((data) => {
            return data["Filename"] != obj["Filename"];
          });
          if (this.vatDetailsObj.ATTACHSet["results"].length < 1) {
            this.ErrorFile = true;
          }
        },
        (err) => {
          console.error();
        }
      );
  }
  SaveNotes() {
    let linebreaks = this.notesAttached.split(/\n/g); //.match(/\n/g)||[]);
    let count = 0;
    for (let i = 0; i < linebreaks.length; i++) {
      if (linebreaks[i].length > 132) {
        count++;
      }
    }
    if (count > 0) {
      this.errorNotes = true;
    }
  }
  GlobalNumberAllow(event) {
    // event.target.value = event.target.value.replace(',','');
    // console.log(event.target.value);
    var rgx = /^[0-9]*\.?[0-9]*$/;
    // var rgx = /^\d{0,12}(\.\d{0,2})?$/;
    if (rgx.test(event.target.value)) {
      return true;
    } else if (event.keyCode == 32) {
      event.preventDefault();
    }
    // else {
    //   alert('hi');
    //   return event.preventDefault();
    // }
  }
  // TextAreaChange(event)
  // {
  //   console.log(event)
  //   console.log(this.notesAttached)
  //   let linebreaks = (this.notesAttached.split(/\n/g));//.match(/\n/g)||[]);
  //   console.log(linebreaks);
  // }

  SubmitNotes() {
    let linebreaks = this.notesAttached.split(/\n/g); //.match(/\n/g)||[]);
    let notesSet = [];
    let noteno = "1";
    if (this.vatDetailsObj["NOTESSet"]["results"].length > 0) {
      if (this.vatDetailsObj["NOTESSet"]["results"][0]["Refnamez"] == "") {
        noteno = "2";
      }
    }
    for (let i = 0; i < linebreaks.length; i++) {
      let obj = {
        Notenoz: noteno, //this.vatDetailsObj["NOTESSet"]["results"].length>0?this.vatDetailsObj["NOTESSet"]["results"][0]['Notenoz']+1:"1",
        Refnamez:
          this.vatDetailsObj["NOTESSet"]["results"].length > 0
            ? this.vatDetailsObj["NOTESSet"]["results"][0]["Refnamez"]
            : "",
        XInvoicez: "",
        XObsoletez: "",
        Rcodez: "VATR",
        Erfusrz: "", //this.vatObject["d"]["Gpartz"],
        Erfdtz: null, //"\/Date("+new Date().getTime()+")\/",
        //"Erftmz":null,
        AttByz: "TP",
        //"ByPusrz":"",
        ByGpartz: this.vatObject["d"]["Gpartz"],
        DataVersionz: "00000",
        //"Namez":this.taxPayerDetails.Tpnm,
        Noteno: noteno, //this.vatDetailsObj["NOTESSet"]["results"].length>0?this.vatDetailsObj["NOTESSet"]["results"][0]['Notenoz']+1:"1",
        Lineno: i + 1,
        ElemNo: 0,
        Tdformat: "",
        Tdline: linebreaks[i],
        // "Sect":"MAIN FORM",
        // "Strdt":moment(new Date()).format("YYYY/MM/DD"),//"2020/11/02",
        // "Strtime":moment(new Date().getTime()).format("HH:MM:SS"),
        //"Strline":""
      };
      notesSet.push(obj);
      console.log(this.vatDetailsObj["NOTESSet"]["results"]);
    }
    this.vatDetailsObj["NOTESSet"]["results"] = notesSet;
    this.SaveAsDraft();
  }
  Amendment() {
    this.returnsService.getPenalityDetails(this.vatDetailsObj).subscribe(
      (data) => {
        console.log(data);
        this.taxPayerDetails = data["d"];
        this.vatDetailsObj = data["d"];
        this.vatDetailsObj["SubmitFg"] = "";
        this.disableInputs = false;
        this.voidReturn = false;
        this.VATSalesForm.enable();
        this.VATPurchasesForm.enable();
        this.step = 1;
        this.isAmendment = true;
        let obj = {
          Status: this.RetrunObjStatus,
          Euser: "0000000000000000000000" + this.vatObject["d"]["Gpartz"],
          Fbguid: this.Fbguid,
          Gpart: this.vatObject["d"]["Gpartz"],
        };
        this.getReturnDetails(
          obj,
          this.taxPayerDetails["TxnTpz"],
          this.taxPayerDetails["Periodkeyz"]
        );
      },
      (err) => {
        console.error(err);
        this.notifierService.notify(
          "error",
          err["error"]["error"]["innererror"]["errordetails"][0]["message"]
        );
      }
    );
  }
  transform(val) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(val);
  }
  CancelReturn() {
    this.vatDetailsObj["Operationz"] = "04";
    this.vatDetailsObj["Langz"] = "EN";
    this.vatDetailsObj["ConfStp2"] = "1";
    this.vatDetailsObj["TcFlg"] = "1";
    this.vatDetailsObj["FldNm"] = "";
    this.vatDetailsObj["Block"] = "";
    this.vatDetailsObj["TcFg"] = "1";
    this.vatDetailsObj["UserTypz"] = "TP";
    this.vatDetailsObj["SubmitFg"] = "";
    this.vatDetailsObj["DecFg"] = "0";
    this.returnsService.getPenalityDetails(this.vatDetailsObj).subscribe(
      (data) => {
        console.log("canceled Data", data);
        this.taxPayerDetails = data["d"];
        this.vatDetailsObj = data["d"];
        this.disableInputs = true;
        this.VATSalesForm.disable();
        this.VATPurchasesForm.disable();
        this.voidReturn = true;
        jQuery("#VoidModal").modal("hide");
        jQuery("#voidSuccessModal").modal("show");
        window.scrollTo(0, 0);
        setTimeout(function () {
          jQuery("#voidSuccessModal").modal("hide");
        }, 1000);
        // let obj={"Status":this.RetrunObjStatus,"Euser":"0000000000000000000000"+this.vatObject["d"]["Gpartz"],"Fbguid":this.Fbguid,"Gpart":this.vatObject["d"]["Gpartz"]};
        // this.TaxPayerDetails(obj);
        // this.returnsService.getTaxPayerDetails(obj["Euser"],obj["Fbguid"]).subscribe((data)=>{
        //   console.log(data);
        // this.taxPayerDetails=data["d"];
        // this.vatDetailsObj = data["d"];
        // this.disableInputs=false;
        // this.VATSalesForm.enable();
        // this.VATPurchasesForm.enable();
        // });
      },
      (err) => {
        console.error(err);
        this.notifierService.notify(
          "error",
          err["error"]["error"]["innererror"]["errordetails"][0]["message"]
        );
      }
    );
  }
}
