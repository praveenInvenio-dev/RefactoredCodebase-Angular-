import { Component, OnInit } from "@angular/core";
import { VatServiceService } from "src/app/services/vat-service.service";
import { ActivatedRoute, Router } from "@angular/router";
import { ReturnsService } from "../returns.service";
import * as moment from "moment";
import { FormGroup, FormBuilder, FormArray, Validators } from "@angular/forms";
import * as FileSaver from "file-saver";
import { form4constants } from "src/app/returns/form4/form4constants.model";
import { environment } from "src/environments/environment";
import * as XLSX from "xlsx";
import { toHijri } from "hijri-converter";

declare var jQuery;
declare var $: any;

@Component({
  selector: "app-form4",
  templateUrl: "./form4.component.html",
  styleUrls: ["./form4.component.css"],
})
export class Form4Component implements OnInit {
  baseUrl = environment.loginurl.split("irj")[0] + "/";
  step: number = 1;
  Fbguid: string = "";
  RetrunObjStatus: string = "";
  Form4Object: any;
  taxpayerDetails: any = [];
  taxpayerDetailsObject: any = [];
  form4DetailsScreen: boolean = false;
  lang: any;
  direction: string;
  euser: any;
  PeroidStartDate: any;
  PeroidEndDate: any;
  SumOfTaxBase: any;
  otherIncomeForm: FormGroup;
  NoOfAddedForms: number = 1;
  individualCompaniesForm: FormGroup;
  otherTaxForm: FormGroup;
  notesAttached: string;
  errorNotes: boolean = false;
  ADueDt1: any;
  ADueDt2: any;
  ADueDt3: any;
  notApplicableAction: string = "";
  profitFromMainActivity: any;
  disableInputs: boolean = false;
  isAmendment: boolean = false;
  language: any;
  errorMessage: any;
  retrunObjStatus: any;
  returnObjStatusTxt: any;
  downloadExcelbuttonTitle: any;
  titleText: string = "No file choosen";

  constructor(
    private vatService: VatServiceService,
    private activatedRoute: ActivatedRoute,
    private returnService: ReturnsService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.otherIncomeForm = this.fb.group({
      Schedule: [false],
      FillType: ["Manual"],
      Incomes: this.fb.array([]),
      Totals: [0.0],
    });
    this.individualCompaniesForm = this.fb.group({
      Schedule: [false],
      FillType: ["Manual"],
      individualCompaniesResult: this.fb.array([]),
      Totals: [0.0],
    });
    this.otherTaxForm = this.fb.group({
      Schedule: [false],
      FillType: ["Manual"],
      Taxs: this.fb.array([]),
      Totals: [0.0],
    });
  }

  ngOnInit(): void {
    $('[data-toggle="tooltip"]').tooltip("hide");
    // //For Tab Active
    // if (localStorage.getItem("lang") === "ar") {
    //   localStorage.setItem("ActiveTab", JSON.stringify("الزكاة و ضريبة الدخل"));
    // } else {
    //   localStorage.setItem("ActiveTab", JSON.stringify("Zakat & CIT"));
    // }
    // //For Tab Active end

    moment.locale("en-Us");
    if (localStorage.getItem("lang") === "ar") {
      this.lang = form4constants.langz.arb.form4;
      this.direction = form4constants.langz.arb.dir;
    } else {
      this.lang = form4constants.langz.eng.form4;
      this.direction = form4constants.langz.eng.dir;
    }

    if (localStorage.getItem("lang") === "ar") {
      this.language = "ar";
    } else {
      this.language = "en";
    }

    if (this.language == "ar") {
      this.titleText = "لم تقم باختيار ملف";
      this.downloadExcelbuttonTitle = "تحميل بصيغة إكسل";
    } else {
      this.titleText = "No file chosen";
      this.downloadExcelbuttonTitle = "Download Excel Format";
    }

    this.activatedRoute.params.subscribe((params) => {
      console.log("params", params);
      this.Fbguid = params["Fbguid"] || "";
      this.RetrunObjStatus = params["Status"] || "";
      if (this.RetrunObjStatus == "IP014") {
        if (this.language == "ar") {
          this.returnObjStatusTxt = "فاتورة";
        } else {
          this.returnObjStatusTxt = "Billed";
        }
      } else if (this.RetrunObjStatus == "IP011") {
        if (this.language == "ar") {
          this.returnObjStatusTxt = "تم تقديمه";
        } else {
          this.returnObjStatusTxt = "Submitted";
        }
      }
      this.euser = params["euser"] || "";
      if (this.Fbguid) {
        this.GetUserDetails();
      }
    });
  }

  get Incomes(): FormArray {
    return this.otherIncomeForm.get("Incomes") as FormArray;
  }
  get individualCompaniesResult(): FormArray {
    return this.individualCompaniesForm.get(
      "individualCompaniesResult"
    ) as FormArray;
  }
  get Taxs(): FormArray {
    return this.otherTaxForm.get("Taxs") as FormArray;
  }
  DeleteRow(pi) {
    const control = this.otherIncomeForm.get("Incomes") as FormArray;
    control.removeAt(pi);
    this.CalculateOtherIncomeTotals();
    if (pi == 0) {
      this.AddRow();
    }
  }
  DeleteCompanyResult(pi) {
    const control = this.individualCompaniesForm.get(
      "individualCompaniesResult"
    ) as FormArray;
    control.removeAt(pi);
    this.CalculateCompanyResultTotals();
    if (pi == 0) {
      this.AddCompanyResult();
    }
  }
  DeleteTaxRow(pi) {
    const control = this.otherTaxForm.get("Taxs") as FormArray;
    control.removeAt(pi);
    this.CalculateOtherTaxTotals();
    if (pi == 0) {
      this.AddTaxRow();
    }
  }
  AddRow() {
    let type = this.IncomeForm();
    this.Incomes.push(type);
  }
  AddCompanyResult() {
    let type = this.IndividualCompanyForm();
    this.individualCompaniesResult.push(type);
  }
  AddTaxRow() {
    let type = this.TaxForm();
    this.Taxs.push(type);
  }
  IncomeForm() {
    return this.fb.group({
      Description: [null, Validators.required],
      SAR: [0.0, [Validators.required, Validators.min(0)]],
    });
  }
  IndividualCompanyForm() {
    return this.fb.group({
      TIN: [null, [Validators.required]],
      Name: [null, Validators.required],
      Amount: [0.0, [Validators.required, Validators.min(0)]],
    });
  }
  TaxForm() {
    return this.fb.group({
      Description: [null, Validators.required],
      SAR: [0.0, [Validators.required, Validators.min(0)]],
    });
  }

  form4Obj: any;
  GetUserDetails() {
    this.vatService.getVatData().subscribe((res) => {
      console.log("resdata", res["d"]);
      this.Form4Object = res;
      //this.getWithHoldings();
      this.form4Obj = {
        Status: this.RetrunObjStatus,
        Euser: this.euser,
        Fbguid: this.Fbguid,
      };
      this.GetForm4TaxpayerDetails(this.form4Obj);
      console.log(this.form4Obj.Status);
    });
  }

  GetForm4TaxpayerDetails(form4obj) {
    console.log(form4obj);
    this.returnService
      .getForm4Details(form4obj["Euser"], form4obj["Fbguid"])
      .subscribe((data) => {
        this.taxpayerDetails = data["d"];
        localStorage.setItem("ReturnObj", JSON.stringify(data["d"]));
        console.log("One", this.taxpayerDetails);
        console.log("two", this.taxpayerDetailsObject);
        moment.locale("en-Us");
        if (this.taxpayerDetails.ACalendarTp == "H") {
          this.PeroidStartDate = toHijri(
            +moment(
              new Date(
                +this.taxpayerDetails.AFrom.toString()
                  .replace(")", "")
                  .toString()
                  .replace("/Date(", "")
                  .toString()
                  .replace("/", "")
              )
            ).format("YYYY"),
            +moment(new Date()).format("MM"),
            +moment(new Date()).format("DD")
          );
          this.PeroidEndDate = toHijri(
            +moment(
              new Date(
                +this.taxpayerDetails.ATo.toString()
                  .replace(")", "")
                  .toString()
                  .replace("/Date(", "")
                  .toString()
                  .replace("/", "")
              )
            ).format("YYYY"),
            +moment(new Date()).format("MM"),
            +moment(new Date()).format("DD")
          );
        } else if (this.taxpayerDetails.ACalendarTp == "G") {
          this.PeroidStartDate = moment(
            new Date(
              +this.taxpayerDetails.AFrom.replace(")", "")
                .toString()
                .replace("/Date(", "")
                .toString()
                .replace("/", "")
            )
          ).format("DD/MM/YYYY");
          this.PeroidEndDate = moment(
            new Date(
              +this.taxpayerDetails.ATo.replace(")", "")
                .toString()
                .replace("/Date(", "")
                .toString()
                .replace("/", "")
            )
          ).format("DD/MM/YYYY");
        }
        console.log("Form4 Data", data);
        this.otherIncomeForm.patchValue({
          Schedule:
            this.taxpayerDetails.AOtherIncomeAttach == "1" ? true : false,
        });
        this.individualCompaniesForm.patchValue({
          Schedule:
            this.taxpayerDetails.AProfitlossAttach == "1" ? true : false,
        });
        this.otherTaxForm.patchValue({
          Schedule: this.taxpayerDetails.AOtherTaxAttach == "1" ? true : false,
        });

        this.clearFormArray(this.Incomes);
        for (
          let i = 0;
          i < this.taxpayerDetails.Sch1_199Set["results"].length;
          i++
        ) {
          this.AddRow();
          this.Incomes.controls[i].patchValue({
            Description: this.taxpayerDetails.Sch1_199Set["results"][i][
              "Description"
            ],
          });
          this.Incomes.controls[i].patchValue({
            SAR: this.taxpayerDetails.Sch1_199Set["results"][i]["Amount"],
          });
        }
        this.CalculateOtherIncomeTotals();
        this.taxpayerDetails.AOtherIncome = (+this.totalOtherIncome).toFixed(2);
        this.SumOfTaxBase = parseFloat(
          (
            (+this.taxpayerDetails.AIncTicketTotal || 0) +
            (+this.taxpayerDetails.AIncShipTotal || 0) +
            (+this.taxpayerDetails.AIncETotal || 0) +
            (+this.taxpayerDetails.AOtherIncome || 0)
          ).toString()
        ).toFixed(2);
        console.log(this.SumOfTaxBase);

        this.clearFormArray(this.individualCompaniesResult);
        for (
          let i = 0;
          i < this.taxpayerDetails.Sch1_405Set["results"].length;
          i++
        ) {
          this.AddCompanyResult();
          this.individualCompaniesResult.controls[i].patchValue({
            TIN: this.taxpayerDetails.Sch1_405Set["results"][i]["Tin"],
          });
          this.individualCompaniesResult.controls[i].patchValue({
            Name: this.taxpayerDetails.Sch1_405Set["results"][i]["Name"],
          });
          this.individualCompaniesResult.controls[i].patchValue({
            Amount: this.taxpayerDetails.Sch1_405Set["results"][i]["Amount"],
          });
        }
        this.errorMsg = [false];
        this.CalculateCompanyResultTotals();
        this.taxpayerDetails.AShareProfit = (+this.totalCompanyResult).toFixed(
          2
        );

        this.clearFormArray(this.Taxs);
        for (
          let i = 0;
          i < this.taxpayerDetails.Sch1_499Set["results"].length;
          i++
        ) {
          this.AddTaxRow();
          this.Taxs.controls[i].patchValue({
            Description: this.taxpayerDetails.Sch1_499Set["results"][i][
              "Description"
            ],
          });
          this.Taxs.controls[i].patchValue({
            SAR: this.taxpayerDetails.Sch1_499Set["results"][i]["Amount"],
          });
        }
        this.CalculateOtherTaxTotals();
        this.taxpayerDetails.AOtherTax = (+this.totalOtherTax).toFixed(2);
        this.taxpayerDetails.ATaxTotal = parseFloat(
          (
            (+this.taxpayerDetails.AProfitMain || 0) +
            (+this.taxpayerDetails.ABankComm || 0) +
            (+this.taxpayerDetails.ADividends || 0) +
            (+this.taxpayerDetails.ACapital || 0) +
            (+this.taxpayerDetails.AShareProfit || 0) +
            (+this.taxpayerDetails.AOtherTax || 0)
          ).toString()
        ).toFixed(2);

        this.notesAttached = "";
        for (
          let i = 0;
          i < this.taxpayerDetails["Off_notesSet"]["results"].length;
          i++
        ) {
          this.notesAttached =
            this.notesAttached +
            (i > 0 ? "\n" : "") +
            this.taxpayerDetails["Off_notesSet"]["results"][i].Strline;
        }
        console.log(this.notesAttached);

        if (this.taxpayerDetails.AAgree == "") {
          jQuery("#infoModal").modal("show");
        }

        if (
          this.taxpayerDetails.Status == "IP011" ||
          this.taxpayerDetails.Status == "IP014"
        ) {
          this.disableInputs = true;
          this.step = 7;
        }

        this.ADueDt1 =
          this.taxpayerDetails.Sch1_700.ADueDt1 != null
            ? moment(
                new Date(
                  +this.taxpayerDetails.Sch1_700.ADueDt1.replace(")", "")
                    .toString()
                    .replace("/Date(", "")
                    .toString()
                    .replace("/", "")
                )
              ).format("DD/MM/YYYY")
            : "-";
        this.ADueDt2 =
          this.taxpayerDetails.Sch1_700.ADueDt1 != null
            ? moment(
                new Date(
                  +this.taxpayerDetails.Sch1_700.ADueDt2.replace(")", "")
                    .toString()
                    .replace("/Date(", "")
                    .toString()
                    .replace("/", "")
                )
              ).format("DD/MM/YYYY")
            : "-";
        this.ADueDt3 =
          this.taxpayerDetails.Sch1_700.ADueDt1 != null
            ? moment(
                new Date(
                  +this.taxpayerDetails.Sch1_700.ADueDt3.replace(")", "")
                    .toString()
                    .replace("/Date(", "")
                    .toString()
                    .replace("/", "")
                )
              ).format("DD/MM/YYYY")
            : "-";
      });
  }
  GlobalNumberAllow(event) {
    console.log(event.target.value);
    var rgx = /^\d{0,11}(\.\d{0,2})?$/;
    console.log(event.target.value);
    if (event.keyCode == 8) {
      return true;
    } else if (event.keyCode == 32) {
      event.preventDefault();
    } else if (!rgx.test(event.target.value.toString().replace(/,/g, ""))) {
      event.preventDefault();
    }
  }
  SpaceValidator(event) {
    if (!event.target.value.length && event.keyCode == 32) {
      event.preventDefault();
    }
  }
  ValidateProfitFromMain() {
    this.taxpayerDetails.AProfitMain = this.taxpayerDetails.AProfitMain
      ? parseFloat(this.taxpayerDetails.AProfitMain).toFixed(2)
      : "0.00";
    this.taxpayerDetails.ATaxTotal = parseFloat(
      (
        (+this.taxpayerDetails.AProfitMain || 0) +
        (+this.taxpayerDetails.ABankComm || 0) +
        (+this.taxpayerDetails.ADividends || 0) +
        (+this.taxpayerDetails.ACapital || 0) +
        (+this.taxpayerDetails.AShareProfit || 0) +
        (+this.taxpayerDetails.AOtherTax || 0)
      ).toString()
    ).toFixed(2);
    this.CalculateInterestAmount();
  }
  ValidatePatterns() {
    this.taxpayerDetails.AIncTicketTotal = this.taxpayerDetails.AIncTicketTotal
      ? parseFloat(this.taxpayerDetails.AIncTicketTotal).toFixed(2)
      : "0.00";
    this.taxpayerDetails.AIncShipTotal = this.taxpayerDetails.AIncShipTotal
      ? parseFloat(this.taxpayerDetails.AIncShipTotal).toFixed(2)
      : "0.00";
    this.taxpayerDetails.AIncETotal = this.taxpayerDetails.AIncETotal
      ? parseFloat(this.taxpayerDetails.AIncETotal).toFixed(2)
      : "0.00";
    this.taxpayerDetails.AOtherIncome = this.taxpayerDetails.AOtherIncome
      ? parseFloat(this.taxpayerDetails.AOtherIncome).toFixed(2)
      : "0.00";
    this.taxpayerDetails.ARoyalties = this.taxpayerDetails.ARoyalties
      ? parseFloat(this.taxpayerDetails.ARoyalties).toFixed(2)
      : "0.00";
    this.taxpayerDetails.AMangementFee = this.taxpayerDetails.AMangementFee
      ? parseFloat(this.taxpayerDetails.AMangementFee).toFixed(2)
      : "0.00";
    this.taxpayerDetails.ATechnicalService = this.taxpayerDetails
      .ATechnicalService
      ? parseFloat(this.taxpayerDetails.ATechnicalService).toFixed(2)
      : "0.00";
    this.taxpayerDetails.ASelfEmployed = this.taxpayerDetails.ASelfEmployed
      ? parseFloat(this.taxpayerDetails.ASelfEmployed).toFixed(2)
      : "0.00";
    this.taxpayerDetails.APubServiceOffice = this.taxpayerDetails
      .APubServiceOffice
      ? parseFloat(this.taxpayerDetails.APubServiceOffice).toFixed(2)
      : "0.00";
    this.taxpayerDetails.AShops = this.taxpayerDetails.AShops
      ? parseFloat(this.taxpayerDetails.AShops).toFixed(2)
      : "0.00";
    this.taxpayerDetails.AGasolineStn = this.taxpayerDetails.AGasolineStn
      ? parseFloat(this.taxpayerDetails.AGasolineStn).toFixed(2)
      : "0.00";
    this.taxpayerDetails.AContractorsConstruct = this.taxpayerDetails
      .AContractorsConstruct
      ? parseFloat(this.taxpayerDetails.AContractorsConstruct).toFixed(2)
      : "0.00";
    this.taxpayerDetails.AOtherActivity = this.taxpayerDetails.AOtherActivity
      ? parseFloat(this.taxpayerDetails.AOtherActivity).toFixed(2)
      : "0.00";
    this.taxpayerDetails.ABankComm = this.taxpayerDetails.ABankComm
      ? parseFloat(this.taxpayerDetails.ABankComm).toFixed(2)
      : "0.00";
    this.taxpayerDetails.ADividends = this.taxpayerDetails.ADividends
      ? parseFloat(this.taxpayerDetails.ADividends).toFixed(2)
      : "0.00";
    this.taxpayerDetails.ACapital = this.taxpayerDetails.ACapital
      ? parseFloat(this.taxpayerDetails.ACapital).toFixed(2)
      : "0.00";

    this.CalculateTotals();
  }
  CalculateTotals() {
    this.SumOfTaxBase = (
      (+this.taxpayerDetails.AIncTicketTotal || 0) +
      (+this.taxpayerDetails.AIncShipTotal || 0) +
      (+this.taxpayerDetails.AIncETotal || 0) +
      (+this.taxpayerDetails.AOtherIncome || 0)
    ).toFixed(2);
    this.taxpayerDetails.ATaxBase = parseFloat(
      ((+this.SumOfTaxBase * 5) / 100).toString()
    ).toFixed(2); //parseFloat((((+this.taxpayerDetails.AIncTicketTotal) + (+this.taxpayerDetails.AIncShipTotal) + (+this.taxpayerDetails.AIncETotal) + (+this.taxpayerDetails.AOtherIncome)) * 0.05).toString()).toFixed(2) || "0.00";
    this.taxpayerDetails.ARevTotal =
      parseFloat(
        (
          +this.taxpayerDetails.ARoyalties +
          +this.taxpayerDetails.AMangementFee +
          +this.taxpayerDetails.ATechnicalService +
          +this.taxpayerDetails.ASelfEmployed +
          +this.taxpayerDetails.APubServiceOffice +
          +this.taxpayerDetails.AShops +
          +this.taxpayerDetails.AGasolineStn +
          +this.taxpayerDetails.AContractorsConstruct +
          +this.taxpayerDetails.AOtherActivity +
          +this.SumOfTaxBase
        ).toString()
      ).toFixed(2) || "0.00";
    this.profitFromMainActivity =
      parseFloat(
        (
          (+this.taxpayerDetails.ARoyalties * 75) / 100 +
          (+this.taxpayerDetails.AMangementFee * 80) / 100 +
          (+this.taxpayerDetails.ATechnicalService * 20) / 100 +
          (+this.taxpayerDetails.ASelfEmployed * 20) / 100 +
          (+this.taxpayerDetails.APubServiceOffice * 20) / 100 +
          (+this.taxpayerDetails.AShops * 10) / 100 +
          (+this.taxpayerDetails.AGasolineStn * 10) / 100 +
          (+this.taxpayerDetails.AContractorsConstruct * 10) / 100 +
          (+this.taxpayerDetails.AOtherActivity * 15) / 100
        ).toString()
      ).toFixed(2) || "0.00";
    this.taxpayerDetails.AProfitMain =
      +this.taxpayerDetails.AProfitMain < +this.profitFromMainActivity
        ? this.profitFromMainActivity
        : this.taxpayerDetails.AProfitMain || "0.00";
    this.taxpayerDetails.ATaxTotal = parseFloat(
      (
        (+this.taxpayerDetails.AProfitMain || 0) +
        (+this.taxpayerDetails.ABankComm || 0) +
        (+this.taxpayerDetails.ADividends || 0) +
        (+this.taxpayerDetails.ACapital || 0) +
        (+this.taxpayerDetails.AShareProfit || 0) +
        (+this.taxpayerDetails.AOtherTax || 0)
      ).toString()
    ).toFixed(2);
    console.log("ARevTotal", this.taxpayerDetails.ARevTotal);
    this.taxpayerDetails.ATaxPay =
      parseFloat(
        (
          ((+this.taxpayerDetails.ATaxBase + +this.taxpayerDetails.ATaxTotal) *
            20) /
          100
        ).toString()
      ).toFixed(2) || "0.00";
    console.log(
      +this.taxpayerDetails.ATaxTotal,
      +this.taxpayerDetails.ATaxBase
    );
    this.taxpayerDetails.ANetPayable = parseFloat(
      (
        (+this.taxpayerDetails.ATaxPay || 0) -
        (+this.taxpayerDetails.AContractRelTax || 0) -
        (+this.taxpayerDetails.AProviPayAmt || 0)
      ).toString()
    ).toFixed(2);
    this.taxpayerDetails.AInterestProvi =
      parseFloat(
        (
          +this.taxpayerDetails.AContractRelTax -
          +this.taxpayerDetails.AProviPayAmt
        ).toString()
      ).toFixed(2) || "0.00";
    this.taxpayerDetails.ATotTaxPayable =
      parseFloat(
        (
          +this.taxpayerDetails.ANetPayable +
          +this.taxpayerDetails.AInterestProvi
        ).toString()
      ).toFixed(2) || "0.00";
    this.taxpayerDetails.AFineTotal =
      parseFloat(
        (+this.taxpayerDetails.AFine + +this.taxpayerDetails.ADemurr).toString()
      ).toFixed(2) || "0.00";
    this.taxpayerDetails.ATaxFineTotal =
      parseFloat(
        (
          +this.taxpayerDetails.ATotTaxPayable +
          +this.taxpayerDetails.AFineTotal
        ).toString()
      ).toFixed(2) || "0.00";
    console.log("this.sumoftaxbase", this.SumOfTaxBase);
    this.CalculateInterestAmount();
  }
  AddMultipleForms() {
    for (let i = 0; i < this.NoOfAddedForms; i++) {
      this.AddRow();
    }
    this.NoOfAddedForms = 1;
    this.CalculateOtherIncomeTotals();
    jQuery("body").addClass("modalopen");
  }
  AddMultiplecompanyForms() {
    for (let i = 0; i < this.NoOfAddedForms; i++) {
      this.AddCompanyResult();
    }
    this.NoOfAddedForms = 1;
    this.CalculateCompanyResultTotals();
    jQuery("body").addClass("modalopen");
  }
  AddMultipleTaxForms() {
    for (let i = 0; i < this.NoOfAddedForms; i++) {
      this.AddTaxRow();
    }
    this.NoOfAddedForms = 1;
    this.CalculateOtherTaxTotals();
    jQuery("body").addClass("modalopen");
  }

  totalOtherIncome: any;
  CalculateOtherIncomeTotals() {
    //this.taxpayerDetails.AOtherIncome = 0;
    this.totalOtherIncome = 0;
    for (let i = 0; i < this.Incomes.controls.length; i++) {
      this.Incomes.controls[i].patchValue({
        SAR: this.Incomes.controls[i].value.SAR
          ? parseFloat(this.Incomes.controls[i].value.SAR).toFixed(2)
          : parseFloat("0.00").toFixed(2),
      });
      //this.taxpayerDetails.AOtherIncome = parseFloat(((+this.taxpayerDetails.AOtherIncome) + (+this.Incomes.controls[i].value.SAR)).toString()).toFixed(2);
      this.totalOtherIncome = parseFloat(
        (
          +this.totalOtherIncome + +this.Incomes.controls[i].value.SAR
        ).toString()
      ).toFixed(2);
    }
  }

  totalCompanyResult: any;
  CalculateCompanyResultTotals() {
    //this.taxpayerDetails.AShareProfit = 0;
    this.totalCompanyResult = 0;
    for (let i = 0; i < this.individualCompaniesResult.controls.length; i++) {
      this.individualCompaniesResult.controls[i].patchValue({
        Amount: this.individualCompaniesResult.controls[i].value.Amount
          ? parseFloat(
              this.individualCompaniesResult.controls[i].value.Amount
            ).toFixed(2)
          : "0.00",
      });
      //this.taxpayerDetails.AShareProfit = parseFloat(((+this.taxpayerDetails.AShareProfit) + (+this.individualCompaniesResult.controls[i].value.Amount)).toString()).toFixed(2);
      this.totalCompanyResult = parseFloat(
        (
          +this.totalCompanyResult +
          +this.individualCompaniesResult.controls[i].value.Amount
        ).toString()
      ).toFixed(2);
    }
  }

  totalOtherTax: any;
  CalculateOtherTaxTotals() {
    //this.taxpayerDetails.AOtherTax = 0;
    this.totalOtherTax = 0;
    for (let i = 0; i < this.Taxs.controls.length; i++) {
      this.Taxs.controls[i].patchValue({
        SAR: this.Taxs.controls[i].value.SAR
          ? parseFloat(this.Taxs.controls[i].value.SAR).toFixed(2)
          : parseFloat("0.00").toFixed(2),
      });
      //this.taxpayerDetails.AOtherTax = parseFloat(((+this.taxpayerDetails.AOtherTax) + (+this.Taxs.controls[i].value.SAR)).toString()).toFixed(2);
      this.totalOtherTax = parseFloat(
        (+this.totalOtherTax + +this.Taxs.controls[i].value.SAR).toString()
      ).toFixed(2);
    }
  }

  SaveOtherIncomeForm() {
    this.taxpayerDetails.Savez = "X";
    this.taxpayerDetails.AOtherIncomeAttach = "1";
    //let fbguid = this.taxpayerDetails.FormGuid;
    let fbguid = this.taxpayerDetails.Sch1_199Set["results"][0]["FormGuid"];
    this.taxpayerDetails.Sch1_199Set["results"] = [];
    for (let i = 0; i < this.Incomes.controls.length; i++) {
      this.taxpayerDetails.Sch1_199Set["results"].push({});
      this.taxpayerDetails.Sch1_199Set["results"][i][
        "Description"
      ] = this.Incomes.controls[i].value.Description;
      this.taxpayerDetails.Sch1_199Set["results"][i][
        "Amount"
      ] = this.Incomes.controls[i].value.SAR;
      this.taxpayerDetails.Sch1_199Set["results"][i]["LineNo"] = i + 1;
      this.taxpayerDetails.Sch1_199Set["results"][i]["RankingOrder"] = "99";
      this.taxpayerDetails.Sch1_199Set["results"][i]["FormGuid"] = fbguid;
    }
    this.taxpayerDetails.AOtherIncome = (+this.totalOtherIncome).toFixed(2);
    //this.taxpayerDetails.AAgree = "1";
    this.ValidatePatterns();
    this.returnService
      .SubmitForm4(this.taxpayerDetails)
      .subscribe((data: any) => {
        console.log(data);
        this.GetUserDetails();
        jQuery("#provisionsotherIncome").modal("hide");
      });
  }
  SaveOtherCompanyResult() {
    this.taxpayerDetails.Savez = "X";
    this.taxpayerDetails.AProfitlossAttach = "1";
    //let fbguid = this.taxpayerDetails.FormGuid;
    let fbguid = this.taxpayerDetails.Sch1_405Set["results"][0]["FormGuid"];
    this.taxpayerDetails.Sch1_405Set["results"] = [];

    for (let i = 0; i < this.individualCompaniesResult.controls.length; i++) {
      this.taxpayerDetails.Sch1_405Set["results"].push({});
      this.taxpayerDetails.Sch1_405Set["results"][i][
        "Tin"
      ] = this.individualCompaniesResult.controls[i].value.TIN;
      this.taxpayerDetails.Sch1_405Set["results"][i][
        "Name"
      ] = this.individualCompaniesResult.controls[i].value.Name;
      this.taxpayerDetails.Sch1_405Set["results"][i][
        "Amount"
      ] = this.individualCompaniesResult.controls[i].value.Amount;
      this.taxpayerDetails.Sch1_405Set["results"][i]["LineNo"] = i + 1;
      this.taxpayerDetails.Sch1_405Set["results"][i]["RankingOrder"] = "99";
      this.taxpayerDetails.Sch1_405Set["results"][i]["FormGuid"] = fbguid;
    }
    this.taxpayerDetails.AShareProfit = (+this.totalCompanyResult).toFixed(2);
    //this.taxpayerDetails.AAgree = "1";
    this.ValidatePatterns();
    this.returnService
      .SubmitForm4(this.taxpayerDetails)
      .subscribe((data: any) => {
        console.log(data);
        this.GetUserDetails();
        jQuery("#tin").modal("hide");
      });
  }

  SaveOtherTaxForm() {
    this.taxpayerDetails.Savez = "X";
    this.taxpayerDetails.AOtherTaxAttach = "1";
    //let fbguid = this.taxpayerDetails.FormGuid;
    let fbguid = this.taxpayerDetails.Sch1_499Set["results"][0]["FormGuid"];
    this.taxpayerDetails.Sch1_499Set["results"] = [];

    for (let i = 0; i < this.Taxs.controls.length; i++) {
      this.taxpayerDetails.Sch1_499Set["results"].push({});
      this.taxpayerDetails.Sch1_499Set["results"][i][
        "Description"
      ] = this.Taxs.controls[i].value.Description;
      this.taxpayerDetails.Sch1_499Set["results"][i][
        "Amount"
      ] = this.Taxs.controls[i].value.SAR;
      this.taxpayerDetails.Sch1_499Set["results"][i]["FormGuid"] = fbguid;
      this.taxpayerDetails.Sch1_499Set["results"][i]["LineNo"] = i + 1;
      this.taxpayerDetails.Sch1_499Set["results"][i]["RankingOrder"] = "99";
    }
    this.taxpayerDetails.AOtherTax = (+this.totalOtherTax).toFixed(2);
    //this.taxpayerDetails.AAgree = "1";
    this.ValidatePatterns();
    this.returnService
      .SubmitForm4(this.taxpayerDetails)
      .subscribe((data: any) => {
        console.log(data);
        this.GetUserDetails();
        jQuery("#provisions1").modal("hide");
      });
  }

  OtherIncomeApplicableChange(event) {
    if (event.target.checked) {
      this.taxpayerDetails.AOtherIncomeAttach = "1";
      this.otherIncomeForm.patchValue({ Schedule: true });
      jQuery("#provisionsotherIncome").modal("show");
    } else {
      this.notApplicableAction = "provisionOtherIncome";
      jQuery("#NotApplicableForm").modal("show");
    }
  }
  IndividualCompaniesApplicableChange(event) {
    if (event.target.checked) {
      this.individualCompaniesForm.patchValue({ Schedule: true });
      this.taxpayerDetails.AProfitlossAttach = "1";
      jQuery("#tin").modal("show");
    } else {
      this.notApplicableAction = "tinIncome";
      jQuery("#NotApplicableForm").modal("show");
    }
  }
  OtherTaxApplicableChange(event) {
    if (event.target.checked) {
      this.taxpayerDetails.AOtherTaxAttach = "1";
      this.otherTaxForm.patchValue({ Schedule: true });
      jQuery("#provisions1").modal("show");
    } else {
      this.notApplicableAction = "provision1";
      jQuery("#NotApplicableForm").modal("show");
    }
  }
  clearFormArray = (formArray: FormArray) => {
    while (formArray.length !== 0) {
      formArray.removeAt(0);
    }
  };

  errorMsg = [false];

  ValidateTIN(index) {
    this.returnService
      .ValidateTIN(
        this.individualCompaniesResult.controls[index].value.TIN,
        this.Form4Object["d"]["Gpartz"],
        this.taxpayerDetails.RegIdz,
        this.taxpayerDetails.PeriodKeyz
      )
      .subscribe(
        (data: any) => {
          if (data.error) {
            //this.individualCompaniesResult.controls[index].patchValue({'TIN':''});
            this.errorMsg[index] = true;
          } else {
            this.individualCompaniesResult.controls[index].patchValue({
              Name: data["d"]["Name"],
            });
            //this.individualCompaniesResult.controls[index].patchValue({'TIN':data["d"]["Tin"]});
            this.errorMsg[index] = false;
          }
        },
        (err) => {
          console.error(err);
          //this.individualCompaniesResult.controls[index].patchValue({'TIN':''});
          this.errorMsg[index] = true;
        }
      );
  }
  SubmitForm4() {
    this.taxpayerDetails.AAgree = "1";
    this.taxpayerDetails.Savez = "X";
    let fbguid = this.taxpayerDetails.Sch1_199Set["results"][0]["FormGuid"];
    //let fbguid = this.taxpayerDetails.FormGuid;
    this.taxpayerDetails.Sch1_199Set["results"] = [];
    for (let i = 0; i < this.Incomes.controls.length; i++) {
      this.taxpayerDetails.Sch1_199Set["results"].push({});
      this.taxpayerDetails.Sch1_199Set["results"][i][
        "Description"
      ] = this.Incomes.controls[i].value.Description;
      this.taxpayerDetails.Sch1_199Set["results"][i][
        "Amount"
      ] = this.Incomes.controls[i].value.SAR;
      this.taxpayerDetails.Sch1_199Set["results"][i]["LineNo"] = i + 1;
      this.taxpayerDetails.Sch1_199Set["results"][i]["RankingOrder"] = "99";
      this.taxpayerDetails.Sch1_199Set["results"][i]["FormGuid"] = fbguid;
    }

    let fbguid1 = this.taxpayerDetails.Sch1_405Set["results"][0]["FormGuid"];
    //let fbguid1 = this.taxpayerDetails.FormGuid;
    this.taxpayerDetails.Sch1_405Set["results"] = [];

    for (let i = 0; i < this.individualCompaniesResult.controls.length; i++) {
      this.taxpayerDetails.Sch1_405Set["results"].push({});
      this.taxpayerDetails.Sch1_405Set["results"][i][
        "Tin"
      ] = this.individualCompaniesResult.controls[i].value.TIN;
      this.taxpayerDetails.Sch1_405Set["results"][i][
        "Name"
      ] = this.individualCompaniesResult.controls[i].value.Name;
      this.taxpayerDetails.Sch1_405Set["results"][i][
        "Amount"
      ] = this.individualCompaniesResult.controls[i].value.Amount;
      this.taxpayerDetails.Sch1_405Set["results"][i]["LineNo"] = i + 1;
      this.taxpayerDetails.Sch1_405Set["results"][i]["RankingOrder"] = "99";
      this.taxpayerDetails.Sch1_405Set["results"][i]["FormGuid"] = fbguid1;
    }

    let fbguid2 = this.taxpayerDetails.Sch1_499Set["results"][0]["FormGuid"];
    //let fbguid2 = this.taxpayerDetails.FormGuid;
    this.taxpayerDetails.Sch1_499Set["results"] = [];

    for (let i = 0; i < this.Taxs.controls.length; i++) {
      this.taxpayerDetails.Sch1_499Set["results"].push({});
      this.taxpayerDetails.Sch1_499Set["results"][i][
        "Description"
      ] = this.Taxs.controls[i].value.Description;
      this.taxpayerDetails.Sch1_499Set["results"][i][
        "Amount"
      ] = this.Taxs.controls[i].value.SAR;
      this.taxpayerDetails.Sch1_499Set["results"][i]["FormGuid"] = fbguid2;
      this.taxpayerDetails.Sch1_499Set["results"][i]["LineNo"] = i + 1;
      this.taxpayerDetails.Sch1_499Set["results"][i]["RankingOrder"] = "99";
    }
    if (this.step == 5) {
      this.taxpayerDetails.Savez = "";
      this.taxpayerDetails.Submitz = "X";
      this.taxpayerDetails.UserType = "TP";
    } else {
      this.taxpayerDetails.Submitz = "";
      this.taxpayerDetails.Savez = "X";
    }
    this.returnService
      .SubmitForm4(this.taxpayerDetails)
      .subscribe((data: any) => {
        console.log(data);
        this.taxpayerDetails = data["d"];
        // this.taxpayerDetailsObj = data["d"];
        moment.locale("en-Us");
        if (this.taxpayerDetails.ACalendarTp == "H") {
          this.PeroidStartDate = toHijri(
            +moment(
              new Date(
                +this.taxpayerDetails.AFrom.toString()
                  .replace(")", "")
                  .toString()
                  .replace("/Date(", "")
                  .toString()
                  .replace("/", "")
              )
            ).format("YYYY"),
            +moment(new Date()).format("MM"),
            +moment(new Date()).format("DD")
          );
          this.PeroidEndDate = toHijri(
            +moment(
              new Date(
                +this.taxpayerDetails.ATo.toString()
                  .replace(")", "")
                  .toString()
                  .replace("/Date(", "")
                  .toString()
                  .replace("/", "")
              )
            ).format("YYYY"),
            +moment(new Date()).format("MM"),
            +moment(new Date()).format("DD")
          );
        } else if (this.taxpayerDetails.ACalendarTp == "G") {
          this.PeroidStartDate = moment(
            new Date(
              +this.taxpayerDetails.AFrom.replace(")", "")
                .toString()
                .replace("/Date(", "")
                .toString()
                .replace("/", "")
            )
          ).format("DD/MM/YYYY");
          this.PeroidEndDate = moment(
            new Date(
              +this.taxpayerDetails.ATo.replace(")", "")
                .toString()
                .replace("/Date(", "")
                .toString()
                .replace("/", "")
            )
          ).format("DD/MM/YYYY");
        }

        this.ADueDt1 =
          this.taxpayerDetails.Sch1_700.ADueDt1 != null
            ? moment(
                new Date(
                  +this.taxpayerDetails.Sch1_700.ADueDt1.replace(")", "")
                    .toString()
                    .replace("/Date(", "")
                    .toString()
                    .replace("/", "")
                )
              ).format("DD/MM/YYYY")
            : "-";
        this.ADueDt2 =
          this.taxpayerDetails.Sch1_700.ADueDt1 != null
            ? moment(
                new Date(
                  +this.taxpayerDetails.Sch1_700.ADueDt2.replace(")", "")
                    .toString()
                    .replace("/Date(", "")
                    .toString()
                    .replace("/", "")
                )
              ).format("DD/MM/YYYY")
            : "-";
        this.ADueDt3 =
          this.taxpayerDetails.Sch1_700.ADueDt1 != null
            ? moment(
                new Date(
                  +this.taxpayerDetails.Sch1_700.ADueDt3.replace(")", "")
                    .toString()
                    .replace("/Date(", "")
                    .toString()
                    .replace("/", "")
                )
              ).format("DD/MM/YYYY")
            : "-";
        if (this.step == 5) {
          this.step = 6;
          this.taxpayerDetails.Sopbel = "";
          this.onRefresh();
        }
      });
  }
  onRefresh() {
    this.returnService
      .generateSadadNumber(this.taxpayerDetails.Fbnum)
      .subscribe((data) => {
        console.log(data);
        this.taxpayerDetails.Sopbel = data["d"]["results"][0]["Sopbel"];
        this.taxpayerDetails.Betrh = data["d"]["results"][0]["Betrh"];
      });
  }
  onDownloadAcknowledgement() {
    this.returnService
      .DownloadAcknowledgement(this.taxpayerDetails["Fbnumz"])
      .subscribe((data: any) => {
        FileSaver.saveAs(data, "Form4Acknowledgement.pdf");
      });
  }
  onDownloadForm() {
    this.returnService
      .DownloadForm4Form(this.taxpayerDetails["Fbnumz"])
      .subscribe((data: any) => {
        FileSaver.saveAs(data, "Form4Form.pdf");
      });
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
  SaveFinalNotes() {
    let linebreaks = this.notesAttached.split(/\n/g); //.match(/\n/g)||[]);
    for (let i = 0; i < linebreaks.length; i++) {
      let obj = {
        Notenoz: (i + 1).toString(),
        Refnamez: "",
        XInvoicez: "",
        XObsoletez: "",
        Rcodez: "ITXE_ST04",
        AttByz: "TP",
        ByGpartz: this.taxpayerDetails.Taxpayerz,
        DataVersionz: "00000",
        Namez: this.taxpayerDetails.Tpnm,
        Noteno: (i + 1).toString(),
        Lineno: i + 1,
        ElemNo: 0,
        Tdformat: "",
        Tdline: linebreaks[i],
      };
      this.taxpayerDetails["Off_notesSet"]["results"].push(obj);
    }
  }
  CalculateInterestAmount() {
    let fineAmount =
      (+this.taxpayerDetails.AIncTicketTotal || 0) +
      (+this.taxpayerDetails.AIncShipTotal || 0) +
      (+this.taxpayerDetails.AIncETotal || 0) +
      (+this.taxpayerDetails.AOtherIncome || 0) +
      (+this.taxpayerDetails.ARoyalties || 0) +
      (+this.taxpayerDetails.AMangementFee || 0) +
      (+this.taxpayerDetails.ATechnicalService || 0) +
      (+this.taxpayerDetails.ASelfEmployed || 0) +
      (+this.taxpayerDetails.APubServiceOffice || 0) +
      (+this.taxpayerDetails.AShops || 0) +
      (+this.taxpayerDetails.AGasolineStn || 0) +
      (+this.taxpayerDetails.AContractorsConstruct || 0) +
      (+this.taxpayerDetails.AOtherActivity || 0) +
      (+this.taxpayerDetails.ARevTotal || 0) +
      (+this.taxpayerDetails.AProfitMain || 0) +
      (+this.taxpayerDetails.ABankComm || 0) +
      (+this.taxpayerDetails.ADividends || 0) +
      (+this.taxpayerDetails.ACapital || 0) +
      (+this.taxpayerDetails.AShareProfit || 0) +
      (+this.taxpayerDetails.AOtherTax || 0);
    // this.returnService.CalculateFineAmount(this.Form4Object["d"]["Gpartz"], 'ITXE', this.taxpayerDetails.PeriodKeyz, this.taxpayerDetails.RegIdz, this.taxpayerDetails.Fbnumz, parseFloat((fineAmount / 100).toString()).toFixed(2), parseFloat((fineAmount / 100).toString()).toFixed(2), fineAmount).subscribe((data: any) => {
    // fineAmount
    this.returnService
      .CalculateFineAmount(
        this.Form4Object["d"]["Gpartz"],
        "ITXE",
        this.taxpayerDetails.PeriodKeyz,
        this.taxpayerDetails.RegIdz,
        this.taxpayerDetails.Fbnumz,
        parseFloat(this.taxpayerDetails.ATotTaxPayable).toFixed(2),
        parseFloat(this.taxpayerDetails.ATotTaxPayable).toFixed(2),
        this.taxpayerDetails.ARevTotal
      )
      .subscribe((data: any) => {
        console.log(data);
        this.taxpayerDetails.AFine = parseFloat(data["d"]["PenAmt"]).toFixed(2);
        this.taxpayerDetails.ADemurr = parseFloat(data["d"]["IntAmt"]).toFixed(
          2
        );
        this.taxpayerDetails.AFineTotal =
          parseFloat(
            (
              +this.taxpayerDetails.AFine + +this.taxpayerDetails.ADemurr
            ).toString()
          ).toFixed(2) || "0.00";
        this.taxpayerDetails.ATaxFineTotal =
          parseFloat(
            (
              +this.taxpayerDetails.ATotTaxPayable +
              +this.taxpayerDetails.AFineTotal
            ).toString()
          ).toFixed(2) || "0.00";
      });
  }
  InstructionsChange(event) {
    if (event.target.checked) {
      this.taxpayerDetails.AAgree = "1";
    } else {
      this.taxpayerDetails.AAgree = "";
    }
  }
  addPopup() {
    jQuery("body").addClass("modalopen");
  }
  clsePopup() {
    //this.GetUserDetails();
    jQuery("body").removeClass("modalopen");
  }
  NotApplicableApply(value) {
    if (this.notApplicableAction == "provisionOtherIncome") {
      if (value) {
        this.otherIncomeForm.value.Schedule = false;
        //this.otherIncomeForm.patchValue({'Schedule': false});
        this.clearFormArray(this.Incomes);
        this.AddRow();
        this.taxpayerDetails.AOtherIncomeAttach = "";
        this.taxpayerDetails.AOtherIncome = "0.00";
        this.taxpayerDetails.Sch1_199Set["results"] = [];
        this.CalculateOtherIncomeTotals();
        this.ValidatePatterns();
        this.SubmitForm4step1();
        //this.GetUserDetails();
        this.GetForm4TaxpayerDetails(this.form4Obj);
        setTimeout(() => {
          jQuery("#switch01").prop("checked", false);
          jQuery("#provisionsotherIncome").modal("hide");
        }, 300);
      } else {
        jQuery("#switch01").prop("checked", true);
      }
    } else if (this.notApplicableAction == "tinIncome") {
      if (value) {
        this.individualCompaniesForm.value.Schedule = false;
        //this.individualCompaniesForm.patchValue({'Schedule': false});
        this.clearFormArray(this.individualCompaniesResult);
        this.AddCompanyResult();
        this.taxpayerDetails.AProfitlossAttach = "";
        this.taxpayerDetails.AShareProfit = "0.00";
        this.taxpayerDetails.Sch1_405Set["results"] = [];
        this.CalculateCompanyResultTotals();
        this.ValidatePatterns();
        this.SubmitForm4step1();
        //this.GetUserDetails();
        this.GetForm4TaxpayerDetails(this.form4Obj);
        setTimeout(() => {
          jQuery("#switch02").prop("checked", false);
          jQuery("#tin").modal("hide");
        }, 300);
      } else {
        jQuery("#switch02").prop("checked", true);
      }
    } else if (this.notApplicableAction == "provision1") {
      if (value) {
        this.otherTaxForm.value.Schedule = false;
        //this.otherTaxForm.patchValue({'Schedule': false});
        this.clearFormArray(this.Taxs);
        this.AddTaxRow();
        this.taxpayerDetails.AOtherTaxAttach = "";
        this.taxpayerDetails.AOtherTax = "0.00";
        this.taxpayerDetails.Sch1_499Set["results"] = [];
        this.CalculateOtherTaxTotals();
        this.ValidatePatterns();
        this.SubmitForm4step1();
        //this.GetUserDetails();
        this.GetForm4TaxpayerDetails(this.form4Obj);
        setTimeout(() => {
          jQuery("#switch03").prop("checked", false);
          jQuery("#provisions1").modal("hide");
        }, 300);
      } else {
        jQuery("#switch03").prop("checked", true);
      }
    }
  }
  SubmitForm4step1() {
    this.taxpayerDetails.AAgree = "1";
    this.taxpayerDetails.Savez = "X";
    if (this.step == 5) {
      this.taxpayerDetails.Savez = "";
      this.taxpayerDetails.Submitz = "X";
      this.taxpayerDetails.UserType = "TP";
    } else {
      this.taxpayerDetails.Submitz = "";
      this.taxpayerDetails.Savez = "X";
    }
    this.returnService
      .SubmitForm4(this.taxpayerDetails)
      .subscribe((data: any) => {
        console.log(data);
        this.taxpayerDetails = data["d"];
        this.ADueDt1 =
          this.taxpayerDetails.Sch1_700.ADueDt1 != null
            ? moment(
                new Date(
                  +this.taxpayerDetails.Sch1_700.ADueDt1.replace(")", "")
                    .toString()
                    .replace("/Date(", "")
                    .toString()
                    .replace("/", "")
                )
              ).format("DD/MM/YYYY")
            : "-";
        this.ADueDt2 =
          this.taxpayerDetails.Sch1_700.ADueDt1 != null
            ? moment(
                new Date(
                  +this.taxpayerDetails.Sch1_700.ADueDt2.replace(")", "")
                    .toString()
                    .replace("/Date(", "")
                    .toString()
                    .replace("/", "")
                )
              ).format("DD/MM/YYYY")
            : "-";
        this.ADueDt3 =
          this.taxpayerDetails.Sch1_700.ADueDt1 != null
            ? moment(
                new Date(
                  +this.taxpayerDetails.Sch1_700.ADueDt3.replace(")", "")
                    .toString()
                    .replace("/Date(", "")
                    .toString()
                    .replace("/", "")
                )
              ).format("DD/MM/YYYY")
            : "-";
      });
  }
  GlobalNumberAllow1(event) {
    if (event.keyCode < 48 || event.keyCode > 57) {
      event.preventDefault();
    }
  }
  topWindowScroll() {
    window.scrollTo(0, 0);
  }

  fileData: any;
  cancelUpload: boolean = false;

  OtherIncomeUploadFile(event) {
    jQuery("#OtherIncomeConfirmation").modal("show");
    this.fileData = event;
  }

  OtherIncomeUploadOk() {
    let headerTitles;
    if (this.language == "ar") {
      headerTitles = [
        "الــبــــيـــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــان",
        "ريال سعودي",
      ];
    } else {
      headerTitles = ["Description", "Amount (SAR)"];
    }
    // alert(headerTitles)
    this.onFileUpload(this.fileData, headerTitles, 40199);
  }

  IndividualCompaniesUploadFile(event) {
    jQuery("#IndividualCompaniesConfirmation").modal("show");
    this.fileData = event;
  }

  IndividualCompaniesUploadOk() {
    let headerTitles;
    if (this.language == "ar") {
      headerTitles = ["الرقم المميز", "الاسم", "مبلغ الربح/الخسارة"];
    } else {
      headerTitles = ["TIN", "Name", "Amount of Profit/Loss"];
    }
    this.onFileUpload(this.fileData, headerTitles, 40405);
  }

  OtherTaxUploadFile(event) {
    jQuery("#OtherTaxConfirmation").modal("show");
    this.fileData = event;
  }

  OtherTaxUploadOk() {
    let headerTitles;
    if (this.language == "ar") {
      headerTitles = [
        "الــبــــيـــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــان",
        "ريال سعودي",
      ];
    } else {
      headerTitles = ["Description", "Amount (SAR)"];
    }
    this.onFileUpload(this.fileData, headerTitles, 40499);
  }

  file: any;
  arrayBuffer: any;
  filelist: any[] = [];
  onFileUpload(event, headerTitles, scheduleNo) {
    if (!this.cancelUpload) {
      this.file = event.target.files[0];
      let fileReader = new FileReader();
      fileReader.readAsArrayBuffer(this.file);
      let headerArray = new Array();
      fileReader.onload = (e) => {
        this.arrayBuffer = fileReader.result;
        var data = new Uint8Array(this.arrayBuffer);
        var arr = new Array();
        for (var i = 0; i != data.length; i++)
          arr[i] = String.fromCharCode(data[i]);
        var bstr = arr.join("");
        var workbook = XLSX.read(bstr, {
          type: "binary",
          cellDates: true,
          dateNF: "mm-dd-yyyy;@",
        });
        var first_sheet_name = workbook.SheetNames[0];
        var worksheet = workbook.Sheets[first_sheet_name];
        console.log(XLSX.utils.sheet_to_json(worksheet, { raw: true }));
        //console.log(XLSX.utils.sheet_to_json(worksheet, { header: 1 })[0]);
        for (
          let i = 0;
          i <
          XLSX.utils
            .sheet_to_json(worksheet, { header: 1 })[0]
            .toString()
            .split(",").length;
          i++
        ) {
          headerArray.push(
            XLSX.utils
              .sheet_to_json(worksheet, { header: 1 })[0]
              .toString()
              .split(",")[i]
          );
        }
        console.log("headerArray", headerArray);
        let data1 = XLSX.utils.sheet_to_json(worksheet, { raw: true });
        console.log(data1);
        //console.log(moment(new Date(data1[0]['Date'])).format('MM-DD-YYYY'));
        // var arraylist = XLSX.utils.sheet_to_json(worksheet,{raw:true});
        //     this.filelist = [];
        //     console.log(this.filelist)

        let count = 0;
        let ColumnsHeaderArray = headerTitles;
        console.log(headerArray.length, ColumnsHeaderArray.length);
        if (headerArray.length == ColumnsHeaderArray.length) {
          for (let i = 0; i < headerArray.length; i++) {
            console.log(typeof headerArray[i]);
            if (
              headerArray[i].trimRight() != ColumnsHeaderArray[i].trimRight()
            ) {
              count++;
              break;
            }
          }
        } else {
          count++;
        }

        for (let i = 0; i < data1.length; i++) {
          if (Object.keys(data1[i]).indexOf("__EMPTY") != -1) {
            count++;
            break;
          }
        }

        if (count == 0 && data1.length > 0) {
          let newData = [];
          let obj = {};
          for (let i = 0; i < data1.length; i++) {
            obj = {};
            //to validate the data in the row
            for (let j = 0; j < headerArray.length; j++) {
              obj[headerArray[j].trimRight()] = data1[i][headerArray[j]]
                ? data1[i][headerArray[j]]
                : 0;
            }
            newData.push(obj);
          }
          console.log("newData", newData);

          if (scheduleNo == 40199) {
            this.clearFormArray(this.Incomes);
            for (let i = 0; i < newData.length; i++) {
              this.AddRow();
              if (this.language == "ar") {
                this.Incomes.controls[i].patchValue({
                  Description:
                    newData[i][
                      "الــبــــيـــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــان"
                    ],
                });
                this.Incomes.controls[i].patchValue({
                  SAR: newData[i]["ريال سعودي"],
                });
              } else {
                this.Incomes.controls[i].patchValue({
                  Description: newData[i]["Description"],
                });
                this.Incomes.controls[i].patchValue({
                  SAR: newData[i]["Amount (SAR)"],
                });
              }

              this.CalculateOtherIncomeTotals();
            }
          } else if (scheduleNo == 40405) {
            this.clearFormArray(this.individualCompaniesResult);
            for (let i = 0; i < newData.length; i++) {
              this.AddCompanyResult();
              if (this.language == "ar") {
                this.individualCompaniesResult.controls[i].patchValue({
                  TIN: newData[i]["الرقم المميز"],
                });
                this.individualCompaniesResult.controls[i].patchValue({
                  Name: newData[i]["الاسم"],
                });
                this.individualCompaniesResult.controls[i].patchValue({
                  Amount: newData[i]["مبلغ الربح/الخسارة"],
                });
              } else {
                this.individualCompaniesResult.controls[i].patchValue({
                  TIN: newData[i]["TIN"],
                });
                this.individualCompaniesResult.controls[i].patchValue({
                  Name: newData[i]["Name"],
                });
                this.individualCompaniesResult.controls[i].patchValue({
                  Amount: newData[i]["Amount of Profit/Loss"],
                });
              }
              this.ValidateTIN(i);
              this.CalculateCompanyResultTotals();
            }
          } else if (scheduleNo == 40499) {
            this.clearFormArray(this.Taxs);
            for (let i = 0; i < newData.length; i++) {
              this.AddTaxRow();
              if (this.language == "ar") {
                this.Taxs.controls[i].patchValue({
                  Description:
                    newData[i][
                      "الــبــــيـــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــان"
                    ],
                });
                this.Taxs.controls[i].patchValue({
                  SAR: newData[i]["ريال سعودي"],
                });
              } else {
                this.Taxs.controls[i].patchValue({
                  Description: newData[i]["Description"],
                });
                this.Taxs.controls[i].patchValue({
                  SAR: newData[i]["Amount (SAR)"],
                });
              }
              this.CalculateOtherTaxTotals();
            }
          }

          this.ValidatePatterns();
        } else {
          jQuery("#toolTips").modal("show");
        }
      };
    } else {
      this.cancelUpload = false;
    }
    event.target.value = "";
  }

  // To Cancel Drafted return
  CancelReturn() {
    this.taxpayerDetails.Savez = "";
    this.taxpayerDetails.Submitz = "";
    this.taxpayerDetails.UserType = "TP";
    this.taxpayerDetails.Xvoidz = "X";
    this.returnService
      .SubmitForm4(this.taxpayerDetails)
      .subscribe((data: any) => {
        console.log(data);
        this.taxpayerDetails = data["d"];
        jQuery("#VoidModal").modal("hide");
        this.router.navigateByUrl("/mains/returns/search");
      });
  }

  // To Amend Billed Return
  AmendReturn() {
    this.returnService
      .getForm4AmendDetails(this.taxpayerDetails.Fbnum)
      .subscribe((data) => {
        console.log("Amended Data", data);
        if (data["d"]["Amdflg"] == "Y") {
          this.disableInputs = false;
          this.step = 1;
          this.isAmendment = true;
        }
      });
  }

  //Submit after Amendment
  onAmendSubmit() {
    this.taxpayerDetails.AAgree = "1";
    let fbguid = this.taxpayerDetails.Sch1_199Set["results"][0]["FormGuid"];
    //let fbguid = this.taxpayerDetails.FormGuid;
    this.taxpayerDetails.Sch1_199Set["results"] = [];
    for (let i = 0; i < this.Incomes.controls.length; i++) {
      this.taxpayerDetails.Sch1_199Set["results"].push({});
      this.taxpayerDetails.Sch1_199Set["results"][i][
        "Description"
      ] = this.Incomes.controls[i].value.Description;
      this.taxpayerDetails.Sch1_199Set["results"][i][
        "Amount"
      ] = this.Incomes.controls[i].value.SAR;
      this.taxpayerDetails.Sch1_199Set["results"][i]["LineNo"] = i + 1;
      this.taxpayerDetails.Sch1_199Set["results"][i]["RankingOrder"] = "99";
      this.taxpayerDetails.Sch1_199Set["results"][i]["FormGuid"] = fbguid;
    }

    let fbguid1 = this.taxpayerDetails.Sch1_405Set["results"][0]["FormGuid"];
    //let fbguid1 = this.taxpayerDetails.FormGuid;
    this.taxpayerDetails.Sch1_405Set["results"] = [];

    for (let i = 0; i < this.individualCompaniesResult.controls.length; i++) {
      this.taxpayerDetails.Sch1_405Set["results"].push({});
      this.taxpayerDetails.Sch1_405Set["results"][i][
        "Tin"
      ] = this.individualCompaniesResult.controls[i].value.TIN;
      this.taxpayerDetails.Sch1_405Set["results"][i][
        "Name"
      ] = this.individualCompaniesResult.controls[i].value.Name;
      this.taxpayerDetails.Sch1_405Set["results"][i][
        "Amount"
      ] = this.individualCompaniesResult.controls[i].value.Amount;
      this.taxpayerDetails.Sch1_405Set["results"][i]["LineNo"] = i + 1;
      this.taxpayerDetails.Sch1_405Set["results"][i]["RankingOrder"] = "99";
      this.taxpayerDetails.Sch1_405Set["results"][i]["FormGuid"] = fbguid1;
    }

    let fbguid2 = this.taxpayerDetails.Sch1_499Set["results"][0]["FormGuid"];
    //let fbguid2 = this.taxpayerDetails.FormGuid;
    this.taxpayerDetails.Sch1_499Set["results"] = [];

    for (let i = 0; i < this.Taxs.controls.length; i++) {
      this.taxpayerDetails.Sch1_499Set["results"].push({});
      this.taxpayerDetails.Sch1_499Set["results"][i][
        "Description"
      ] = this.Taxs.controls[i].value.Description;
      this.taxpayerDetails.Sch1_499Set["results"][i][
        "Amount"
      ] = this.Taxs.controls[i].value.SAR;
      this.taxpayerDetails.Sch1_499Set["results"][i]["FormGuid"] = fbguid2;
      this.taxpayerDetails.Sch1_499Set["results"][i]["LineNo"] = i + 1;
      this.taxpayerDetails.Sch1_499Set["results"][i]["RankingOrder"] = "99";
    }
    console.log("TPD one", this.taxpayerDetails);
    this.taxpayerDetailsObject = JSON.parse(localStorage.getItem("ReturnObj"));
    console.log("TDP two", this.taxpayerDetailsObject);
    if (this.taxpayerDetails == this.taxpayerDetailsObject) {
      jQuery("#AmendmentModal").modal("show");
      if (this.language == "ar") {
        this.errorMessage = "لايمكنك التقديم لعدم وجود تعديلات جديدة";
      } else {
        this.errorMessage = "No Changes made so cannot submit";
      }
    } else if (this.notesAttached == "") {
      jQuery("#AmendmentModal").modal("show");
      if (this.language == "ar") {
        this.errorMessage =
          "الرجاء إدخال أسباب التعديل على الخطوة بالضغط على ملاحظات";
      } else {
        this.errorMessage =
          "Please enter reason for change on current section using section notes";
      }
    } else {
      this.taxpayerDetails["SelfAmd"] = "X";
      this.taxpayerDetails.UserType = "TP";
      this.taxpayerDetails["Savez"] = "";
      // this.taxpayerDetails["Submitz"] = "X";
      this.returnService
        .SubmitForm4(this.taxpayerDetails)
        .subscribe((data: any) => {
          console.log(data);
          this.taxpayerDetails = data["d"];
          // this.taxpayerDetailsObj = data["d"];
          if (this.taxpayerDetails.ACalendarTp == "H") {
            this.PeroidStartDate = toHijri(
              +moment(
                new Date(
                  +this.taxpayerDetails.AFrom.toString()
                    .replace(")", "")
                    .toString()
                    .replace("/Date(", "")
                    .toString()
                    .replace("/", "")
                )
              ).format("YYYY"),
              +moment(new Date()).format("MM"),
              +moment(new Date()).format("DD")
            );
            this.PeroidEndDate = toHijri(
              +moment(
                new Date(
                  +this.taxpayerDetails.ATo.toString()
                    .replace(")", "")
                    .toString()
                    .replace("/Date(", "")
                    .toString()
                    .replace("/", "")
                )
              ).format("YYYY"),
              +moment(new Date()).format("MM"),
              +moment(new Date()).format("DD")
            );
          } else if (this.taxpayerDetails.ACalendarTp == "G") {
            this.PeroidStartDate = moment(
              new Date(
                +this.taxpayerDetails.AFrom.replace(")", "")
                  .toString()
                  .replace("/Date(", "")
                  .toString()
                  .replace("/", "")
              )
            ).format("DD/MM/YYYY");
            this.PeroidEndDate = moment(
              new Date(
                +this.taxpayerDetails.ATo.replace(")", "")
                  .toString()
                  .replace("/Date(", "")
                  .toString()
                  .replace("/", "")
              )
            ).format("DD/MM/YYYY");
          }
          this.ADueDt1 =
            this.taxpayerDetails.Sch1_700.ADueDt1 != null
              ? moment(
                  new Date(
                    +this.taxpayerDetails.Sch1_700.ADueDt1.replace(")", "")
                      .toString()
                      .replace("/Date(", "")
                      .toString()
                      .replace("/", "")
                  )
                ).format("DD/MM/YYYY")
              : "-";
          this.ADueDt2 =
            this.taxpayerDetails.Sch1_700.ADueDt1 != null
              ? moment(
                  new Date(
                    +this.taxpayerDetails.Sch1_700.ADueDt2.replace(")", "")
                      .toString()
                      .replace("/Date(", "")
                      .toString()
                      .replace("/", "")
                  )
                ).format("DD/MM/YYYY")
              : "-";
          this.ADueDt3 =
            this.taxpayerDetails.Sch1_700.ADueDt1 != null
              ? moment(
                  new Date(
                    +this.taxpayerDetails.Sch1_700.ADueDt3.replace(")", "")
                      .toString()
                      .replace("/Date(", "")
                      .toString()
                      .replace("/", "")
                  )
                ).format("DD/MM/YYYY")
              : "-";
          if (this.step == 5) {
            this.step = 6;
            this.taxpayerDetails.Sopbel = "";
            this.onRefresh();
          }
        });
    }
  }
}
