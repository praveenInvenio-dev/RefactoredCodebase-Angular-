import { Component, OnInit } from "@angular/core";
import {
  FormControl,
  FormGroup,
  FormBuilder,
  FormArray,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { ReturnsService } from "../returns.service";
import { VatServiceService } from "src/app/services/vat-service.service";
import { form3constants } from "src/app/returns/form3/form3constants.model";
import { ActivatedRoute } from "@angular/router";
import * as moment from "moment";

import * as FileSaver from "file-saver";
declare var jQuery;

@Component({
  selector: "app-form3",
  templateUrl: "./form3.component.html",
  styleUrls: ["./form3.component.css"],
})
export class Form3Component implements OnInit {
  userObject: any = [];
  basicDetailsObj: any = [];
  direction: string;
  lang: any;
  Direction: string;
  Euser: any;
  FbGuid: any;
  step: any = 1;
  periodStartDate: any;
  periodEndDate: any;
  //purna start
  CorrectFlag: boolean = false;
  IsFormDisable: boolean = false;
  NoOfAddedForms: any = 10;
  AGB2Form: FormGroup;
  AGB3Form: FormGroup;
  totalAGB2: any = "0.00";
  totalAGB3: any = "0.00";
  DepreciationIsApplicable: boolean = false;
  Sch4_401: any = [];
  Sch4_401Temp = {
    AAmtBookDepr: "0.00",
    AAmtTaxDepr: "0.00",
    AEndingYr: "0000",
    AFileno: "000",
    AGr1CostcurrYr: "0.00",
    AGr1CostprevYr: "0.00",
    AGr1DeprAmt: "0.00",
    AGr1Grbal: "0.00",
    AGr1Ratio: "5",
    AGr1Restval: "0.00",
    AGr1RestvalCurr1: "0.00",
    AGr1RestvalCurr2: "0.00",
    AGr1TcompCurr: "0.00",
    AGr1TcompPrev: "0.00",
    AGr2CostcurrYr: "0.00",
    AGr2CostprevYr: "0.00",
    AGr2DepAmt: "0.00",
    AGr2DeprAmt: "0.00",
    AGr2Grbal: "0.00",
    AGr2Ratio: "10",
    AGr2Restval: "0.00",
    AGr2RestvalCurr1: "0.00",
    AGr2RestvalCurr2: "0.00",
    AGr2TcompCurr: "0.00",
    AGr2TcompPrev: "0.00",
    AGr3CostcurrYr: "0.00",
    AGr3CostprevYr: "0.00",
    AGr3DeprAmt: "0.00",
    AGr3Grbal: "0.00",
    AGr3Ratio: "25",
    AGr3Restval: "0.00",
    AGr3RestvalCurr1: "0.00",
    AGr3RestvalCurr2: "0.00",
    AGr3TcompCurr: "0.00",
    AGr3TcompPrev: "0.00",
    AGr4CostcurrYr: "0.00",
    AGr4CostprevYr: "0.00",
    AGr4DepAmt: "0.00",
    AGr4DeprAmt: "0.00",
    AGr4Grbal: "0.00",
    AGr4Ratio: "20",
    AGr4Restval: "0.00",
    AGr4RestvalCurr1: "0.00",
    AGr4RestvalCurr2: "0.00",
    AGr4TcompCurr: "0.00",
    AGr4TcompPrev: "0.00",
    AGr5CostcurrYr: "0.00",
    AGr5CostprevYr: "0.00",
    AGr5DeprAmt: "0.00",
    AGr5Grbal: "0.00",
    AGr5Ratio: "10",
    AGr5Restval: "0.00",
    AGr5RestvalCurr1: "0.00",
    AGr5RestvalCurr2: "0.00",
    AGr5TcompCurr: "0.00",
    AGr5TcompPrev: "0.00",
    AGr14excess: "0.00",
    AGr24excess: "0.00",
    AGr34excess: "0.00",
    AGr44excess: "0.00",
    AGr54excess: "0.00",
    AGr150comp: "0.00",
    AGr150cost: "0.00",
    AGr250comp: "0.00",
    AGr250cost: "0.00",
    AGr350comp: "0.00",
    AGr350cost: "0.00",
    AGr450comp: "0.00",
    AGr450cost: "0.00",
    AGr550comp: "0.00",
    AGr550cost: "0.00",
    ALd4excess: "0.00",
    ALd50comp: "0.00",
    ALd50cost: "0.00",
    ALdCostcurrYr: "0.00",
    ALdCostprevYr: "0.00",
    ALdDeprAmt: "0.00",
    ALdGrbal: "0.00",
    ALdRatio: "0",
    ALdRestval: "0.00",
    ALdRestvalCurr1: "0.00",
    ALdRestvalCurr2: "0.00",
    ALdTcomp: "0.00",
    ALdTcompPrev: "0.00",
    AMaintainGrvlGr1: "0.00",
    AMaintainGrvlGr2: "0.00",
    AMaintainGrvlGr3: "0.00",
    AMaintainGrvlGr4: "0.00",
    AMaintainGrvlGr5: "0.00",
    AMaintainGrvlLd: "0.00",
    AMaintainGrvlTot: "0.00",
    AMaintainGrvlTot1: "0.00",
    AName: "",
    ANetAssetDiff: "0.00",
    ANoFinance: "000",
    ATaxDepDedAmt: "0.00",
    ATot4excess: "0.00",
    ATot50comp: "0.00",
    ATot50cost: "0.00",
    ATotAssetAmount: "0.00",
    ATotCostcurrYr: "0.00",
    ATotCostprevYr: "0.00",
    ATotDeprAmt: "0.00",
    ATotGrbal: "0.00",
    ATotRatio: "0",
    ATotRestval: "0.00",
    ATotRestvalCurr1: "0.00",
    ATotRestvalCurr2: "0.00",
    ATotTcompCurr: "0.00",
    ATotTcompPrev: "0.00",
    CoverFld: "",
    FormGuid: "C4346B23F48E1EE4B7B6D2416003490C",
    LegacyDocNo: "",
    SeqNo: "000000",
  };
  Total1 = "0.00";
  Total2 = "0.00";
  Total3 = "0.00";
  Total4 = "0.00";
  Total5 = "0.00";
  Total6 = "0.00";
  Total7 = "0.00";
  Total8 = "0.00";
  Total10 = "0.00";
  Total11 = "0.00";
  Total12 = "0.00";
  Total13 = "0.00";
  Total14 = "0.00";
  //purna end
  //Added by sowjanya
  income30101Form: FormGroup;
  income30102Form: FormGroup;
  income30203Form: FormGroup;
  income30299Form: FormGroup;
  totalincome1: any = "0.00";
  totalincome2: any = "0.00";
  totalincome3: any = "0.00";
  totalincome4: any = "0.00";
  OriginalValueContractAmount = "0.00";
  AdjustmentAmount = "0.00";
  PreviousYearAmount = "0.00";
  CurrentYearAmount = "0.00";
  RemainingAmount = "0.00";
  TotalIncome30100 = "0.00";
  TotalExpenses30200 = "0.00";
  TotalIncome30300 = "0.00";
  maxDate: any;
  incomeError1: boolean = false;
  //ended by sowjanya
  constructor(
    private returnsService: ReturnsService,
    private activatedRoute: ActivatedRoute,
    private vatService: VatServiceService,
    private fb: FormBuilder,
    private router: Router
  ) {
    //purna start
    this.maxDate = new Date();
    this.AGB2Form = this.fb.group({
      Schedule: [false],
      AGB2: this.fb.array([]),
      Totals: [0.0],
    });
    this.AGB3Form = this.fb.group({
      Schedule: [false],
      AGB3: this.fb.array([]),
      Totals: [0.0],
    });
    //purna end
    //sowjanya start
    this.income30101Form = this.fb.group({
      Schedule: [false],
      income30101: this.fb.array([]),
      Totals: [0.0],
      TotalOriginalValueOfContract: [0.0],
      TotalAdjustmentToTheContract: [0.0],
      TotalValueOfPreviousYears: [0.0],
      TotalValueOfCurrentYear: [0.0],
      TotalValueOfRemainingWork: [0.0],
    });
    this.income30102Form = this.fb.group({
      Schedule: [false],
      income30102: this.fb.array([]),
      Totals: [0.0],
    });
    this.income30203Form = this.fb.group({
      Schedule: [false],
      income30203: this.fb.array([]),
      Totals: [0.0],
    });
    this.income30299Form = this.fb.group({
      Schedule: [false],
      income30299: this.fb.array([]),
      Totals: [0.0],
    });
    //sowjanya end
  }
  //purna start
  IncomeStmt(index) {
    var myarray = this.income30101.controls[index].value.ContractDate.split(
      "-"
    );
    let renddate = new Date(myarray[1] + "/" + myarray[2] + "/" + myarray[0]);
    var myarray1 = this.periodEndDate.split("/");
    let renddate1 = new Date(
      myarray1[2] + "-" + myarray1[1] + "-" + myarray1[0]
    );
    if (moment(renddate) > moment(renddate1)) {
      this.incomeError1 = true;
    } else {
      this.incomeError1 = false;
    }
  }
  get AGB2(): FormArray {
    return this.AGB2Form.get("AGB2") as FormArray;
  }
  get AGB3(): FormArray {
    return this.AGB3Form.get("AGB3") as FormArray;
  }
  AGB2Change(event) {
    if (event.currentTarget.checked == true) {
      this.AGB2Form.patchValue({ Schedule: true });
      if (this.AGB2.controls.length == 0) {
        this.AddRowAGB2();
      }
      jQuery("#other-incomeAGB").modal("show");
      //this.taxPayerDetails. = "X";
    } else {
      jQuery("#other-incomeAGB").modal("hide");
      this.AGB2Form.patchValue({ Schedule: false });
      this.clearFormArray(this.AGB2);
      this.AddRowAGB2();
      this.calCellTotalAGB2();
      this.basicDetailsObj.AAdjustAttach = "2";
      this.basicDetailsObj.AOtherProfit = "0.00";
      this.CalculateTotals();
      this.SaveAGB2();
      //this.taxPayerDetails. = "";
    }
  }
  AGB3Change(event) {
    if (event.currentTarget.checked == true) {
      this.AGB3Form.patchValue({ Schedule: true });
      if (this.AGB3.controls.length == 0) {
        this.AddRowAGB3();
      }
      jQuery("#share-profit").modal("show");
      //this.taxPayerDetails. = "X";
    } else {
      jQuery("#share-profit").modal("hide");
      this.AGB3Form.patchValue({ Schedule: false });
      this.clearFormArray(this.AGB3);
      this.calCellTotalAGB3();
      this.AddRowAGB3();
      this.basicDetailsObj.AProfitLossAttach = "2";
      this.basicDetailsObj.AShareProfit = "0.00";
      this.CalculateTotals();
      this.SaveAGB3();
    }
  }
  clearFormArray = (formArray: FormArray) => {
    while (formArray.length !== 0) {
      formArray.removeAt(0);
    }
  };
  DeleteRowAGB2(pi) {
    const control = this.AGB2Form.get("AGB2") as FormArray;
    control.removeAt(pi);
    if (pi == 0) {
      this.AddRowAGB2();
    }
    this.calCellTotalAGB2();
  }
  DeleteRowAGB3(pi) {
    const control = this.AGB3Form.get("AGB3") as FormArray;
    control.removeAt(pi);
    if (pi == 0) {
      this.AddRowAGB3();
    }
    this.calCellTotalAGB3();
  }
  AddRowAGB2() {
    let type = this.AGB2FormM();
    this.AGB2.push(type);
  }
  AddRowAGB3() {
    let type = this.AGB3FormM();
    this.AGB3.push(type);
  }
  AGB2FormM() {
    return this.fb.group({
      Description: ["", [Validators.required, Validators.maxLength(200)]],
      Amount: ["0.00", [Validators.required, Validators.min(0)]],
    });
  }
  AGB3FormM() {
    return this.fb.group({
      Tin: ["", [Validators.required, Validators.maxLength(10)]],
      Name: ["", [Validators.maxLength(200)]],
      Amount: ["0.00", [Validators.required, Validators.min(0)]],
    });
  }
  ClearAGB2() {
    this.clearFormArray(this.AGB2);
    for (
      let i = 0;
      i < this.basicDetailsObj.Sch1_499Set["results"].length;
      i++
    ) {
      this.AddRowAGB2();
      if (this.basicDetailsObj.Sch1_499Set["results"][0]["Description"] != "") {
        this.AGB2Form.patchValue({ Schedule: true });
      } else {
        this.AGB2Form.patchValue({ Schedule: false });
      }
      this.AGB2.controls[i].patchValue({
        Description: this.basicDetailsObj.Sch1_499Set["results"][i][
          "Description"
        ],
      });
      this.AGB2.controls[i].patchValue({
        Amount: this.basicDetailsObj.Sch1_499Set["results"][i]["Amount"],
      });
    }
    this.calCellTotalAGB2();
    jQuery("#other-incomeAGB").modal("hide");
    this.clsePopup();
  }
  ClearAGB3() {
    this.clearFormArray(this.AGB3);
    for (
      let i = 0;
      i < this.basicDetailsObj.Sch1_502Set["results"].length;
      i++
    ) {
      this.AddRowAGB3();
      if (this.basicDetailsObj.Sch1_502Set["results"][0]["Tin"] != "") {
        this.AGB3Form.patchValue({ Schedule: true });
      } else {
        this.AGB3Form.patchValue({ Schedule: false });
      }
      this.AGB3.controls[i].patchValue({
        Tin: this.basicDetailsObj.Sch1_502Set["results"][i]["Tin"],
      });
      this.AGB3.controls[i].patchValue({
        Name: this.basicDetailsObj.Sch1_502Set["results"][i]["Name"],
      });
      this.AGB3.controls[i].patchValue({
        Amount: this.basicDetailsObj.Sch1_502Set["results"][i]["Amount"],
      });
    }
    this.calCellTotalAGB3();
    jQuery("#other-incomeAGB").modal("hide");
    this.clsePopup();
  }
  SpaceValidator(event) {
    if (!event.target.value.length && event.keyCode == 32) {
      event.preventDefault();
    }
  }
  restrictFirstSpace(event, value) {
    if (event.which === 32 && !value.length) {
      event.preventDefault();
    }
  }
  GlobalNumberAllow(event) {
    console.log(event.target.value);
    var rgx = /^\d{0,14}(\.\d{0,2})?$/;
    console.log(event.target.value);
    if (event.keyCode == 8) {
      return true;
    } else if (event.keyCode == 32) {
      event.preventDefault();
    } else if (!rgx.test(event.target.value.toString().replace(/,/g, ""))) {
      event.preventDefault();
    }
  }
  numberOnly(event): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  calCellTotalAGB3() {
    //this.basicDetailsObj.AShareProfit = "0.00";
    this.totalAGB3 = "0.00";
    for (let i = 0; i < this.AGB3.controls.length; i++) {
      if (
        this.AGB3.controls[i].value.Amount == "" ||
        this.AGB3.controls[i].value.Amount == null ||
        this.AGB3.controls[i].value.Amount == undefined ||
        this.AGB3.controls[i].value.Amount == "undefined"
      ) {
        this.AGB3.controls[i].patchValue({ Amount: "0.00" });
      } else {
        if (this.AGB3.controls[i].value.Amount.toString().indexOf(".") > -1) {
          this.AGB3.controls[i].patchValue({
            Amount: this.AGB3.controls[i].value.Amount.slice(
              0,
              this.AGB3.controls[i].value.Amount.indexOf(".") + 3
            ),
          });
        }
        this.AGB3.controls[i].patchValue({
          Amount: (+this.AGB3.controls[i].value.Amount).toFixed(2),
        });
      }
      this.totalAGB3 = (
        parseFloat(this.totalAGB3) +
        parseFloat(this.AGB3.controls[i].value.Amount)
      ).toFixed(2);
    }
    //this.basicDetailsObj.AShareProfit = (+this.totalAGB3).toFixed(2);
  }
  calCellTotalAGB2() {
    // this.basicDetailsObj.AOtherProfit = "0.00";
    this.totalAGB2 = "0.00";
    for (let i = 0; i < this.AGB2.controls.length; i++) {
      if (
        this.AGB2.controls[i].value.Amount == "" ||
        this.AGB2.controls[i].value.Amount == null ||
        this.AGB2.controls[i].value.Amount == undefined ||
        this.AGB2.controls[i].value.Amount == "undefined"
      ) {
        this.AGB2.controls[i].patchValue({ Amount: "0.00" });
      } else {
        if (this.AGB2.controls[i].value.Amount.toString().indexOf(".") > -1) {
          this.AGB2.controls[i].patchValue({
            Amount: this.AGB2.controls[i].value.Amount.slice(
              0,
              this.AGB2.controls[i].value.Amount.indexOf(".") + 3
            ),
          });
        }
        this.AGB2.controls[i].patchValue({
          Amount: (+this.AGB2.controls[i].value.Amount).toFixed(2),
        });
      }
      this.totalAGB2 = (
        parseFloat(this.totalAGB2) +
        parseFloat(this.AGB2.controls[i].value.Amount)
      ).toFixed(2);
    }
    // this.basicDetailsObj.AOtherProfit = (+this.totalAGB2).toFixed(2);
  }
  SaveAGB3() {
    this.basicDetailsObj.AShareProfit = (+this.totalAGB3).toFixed(2);
    // this.taxPayerDetails. = "X";
    let FormGuid = this.basicDetailsObj.Sch1_502Set["results"][0]["FormGuid"];
    this.basicDetailsObj.Sch1_502Set["results"] = [];
    for (let i = 0; i < this.AGB3.controls.length; i++) {
      this.basicDetailsObj.Sch1_502Set["results"].push({});
      this.basicDetailsObj.Sch1_502Set["results"][i]["LineNo"] = i + 1;
      this.basicDetailsObj.Sch1_502Set["results"][i]["FormGuid"] = FormGuid;
      this.basicDetailsObj.Sch1_502Set["results"][i]["RankingOrder"] = "99";
      this.basicDetailsObj.Sch1_502Set["results"][i]["Waers"] = "SAR";
      this.basicDetailsObj.Sch1_502Set["results"][i][
        "Tin"
      ] = this.AGB3.controls[i].value.Tin;
      this.basicDetailsObj.Sch1_502Set["results"][i][
        "Name"
      ] = this.AGB3.controls[i].value.Name;
      this.basicDetailsObj.Sch1_502Set["results"][i]["Amount"] = (+this.AGB3
        .controls[i].value.Amount).toFixed(2);
    }
    jQuery("#share-profit").modal("hide");
    this.basicDetailsObj.AProfitLossAttach = "1";
    this.CalculateTotals();
    this.clsePopup();
  }
  SaveAGB2() {
    this.basicDetailsObj.AOtherProfit = (+this.totalAGB2).toFixed(2);
    // this.taxPayerDetails. = "X";
    let FormGuid = this.basicDetailsObj.Sch1_499Set["results"][0]["FormGuid"];
    this.basicDetailsObj.Sch1_499Set["results"] = [];
    for (let i = 0; i < this.AGB2.controls.length; i++) {
      this.basicDetailsObj.Sch1_499Set["results"].push({});
      this.basicDetailsObj.Sch1_499Set["results"][i]["LineNo"] = i + 1;
      this.basicDetailsObj.Sch1_499Set["results"][i]["RankingOrder"] = "99";
      this.basicDetailsObj.Sch1_499Set["results"][i]["FormGuid"] = FormGuid;
      this.basicDetailsObj.Sch1_499Set["results"][i][
        "Description"
      ] = this.AGB2.controls[i].value.Description;
      this.basicDetailsObj.Sch1_499Set["results"][i]["Amount"] = (+this.AGB2
        .controls[i].value.Amount).toFixed(2);
    }
    this.basicDetailsObj.AAdjustAttach = "1";
    jQuery("#other-incomeAGB").modal("hide");
    this.CalculateTotals();
    this.clsePopup();
  }
  addPopup() {
    jQuery("body").addClass("modalopen");
    this.NoOfAddedForms = 10;
  }
  clsePopup() {
    jQuery("body").removeClass("modalopen");
  }
  AddMultipleAGB3() {
    for (let i = 0; i < this.NoOfAddedForms; i++) {
      this.AddRowAGB3();
    }
    jQuery("#addMultipleFormsAGB3").modal("hide");
    this.addPopup();
  }
  AddMultipleAGB2() {
    for (let i = 0; i < this.NoOfAddedForms; i++) {
      this.AddRowAGB2();
    }
    jQuery("#addMultipleFormsAGB2").modal("hide");
    this.addPopup();
  }
  GetTaxpayerName(index) {
    //,taxPayer,regIdz,periodKeyz
    let taxPayer = this.userObject.Gpartz;
    let regIdz = this.basicDetailsObj.RegIdz;
    let periodKeyz = this.basicDetailsObj.PeriodKeyz;
    let tin = this.AGB3.controls[index].value.Tin;
    if (tin != "") {
      this.returnsService
        .GetTaxpayerName(tin, taxPayer, regIdz, periodKeyz)
        .subscribe(
          (data) => {
            console.log("dataname ", data);
            this.AGB3.controls[index].patchValue({ Name: data["d"].Name });
            //data["d"].Name
          },
          (err) => {
            this.AGB3.controls[index].patchValue({ Tin: "" });
            this.AGB3.controls[index].patchValue({ Name: "" });
          }
        );
    }
  }
  CalculateTotals() {
    if (
      this.basicDetailsObj.ANetProfitLossRatio == "" ||
      this.basicDetailsObj.ANetProfitLossRatio == undefined
    ) {
      this.basicDetailsObj.ANetProfitLossRatio = "0.00";
    } else {
      if (
        this.basicDetailsObj.ANetProfitLossRatio.toString().indexOf(".") > -1
      ) {
        this.basicDetailsObj.ANetProfitLossRatio = this.basicDetailsObj.ANetProfitLossRatio.slice(
          0,
          this.basicDetailsObj.ANetProfitLossRatio.indexOf(".") + 3
        );
      }
      this.basicDetailsObj.ANetProfitLossRatio = (+this.basicDetailsObj
        .ANetProfitLossRatio).toFixed(2);
    }
    if (
      this.basicDetailsObj.AAdoptionProfit == "" ||
      this.basicDetailsObj.AAdoptionProfit == undefined
    ) {
      this.basicDetailsObj.AAdoptionProfit = "0.00";
    } else {
      if (this.basicDetailsObj.AAdoptionProfit.toString().indexOf(".") > -1) {
        this.basicDetailsObj.AAdoptionProfit = this.basicDetailsObj.AAdoptionProfit.slice(
          0,
          this.basicDetailsObj.AAdoptionProfit.indexOf(".") + 3
        );
      }
      this.basicDetailsObj.AAdoptionProfit = (+this.basicDetailsObj
        .AAdoptionProfit).toFixed(2);
    }
    if (
      this.basicDetailsObj.AProvRes == "" ||
      this.basicDetailsObj.AProvRes == undefined
    ) {
      this.basicDetailsObj.AProvRes = "0.00";
    } else {
      if (this.basicDetailsObj.AProvRes.toString().indexOf(".") > -1) {
        this.basicDetailsObj.AProvRes = this.basicDetailsObj.AProvRes.slice(
          0,
          this.basicDetailsObj.AProvRes.indexOf(".") + 3
        );
      }
      this.basicDetailsObj.AProvRes = (+this.basicDetailsObj.AProvRes).toFixed(
        2
      );
    }
    if (
      this.basicDetailsObj.AIncomeTax == "" ||
      this.basicDetailsObj.AIncomeTax == undefined
    ) {
      this.basicDetailsObj.AIncomeTax = "0.00";
    } else {
      if (this.basicDetailsObj.AIncomeTax.toString().indexOf(".") > -1) {
        this.basicDetailsObj.AIncomeTax = this.basicDetailsObj.AIncomeTax.slice(
          0,
          this.basicDetailsObj.AIncomeTax.indexOf(".") + 3
        );
      }
      this.basicDetailsObj.AIncomeTax = (+this.basicDetailsObj
        .AIncomeTax).toFixed(2);
    }
    if (
      this.basicDetailsObj.APersonalExp == "" ||
      this.basicDetailsObj.APersonalExp == undefined
    ) {
      this.basicDetailsObj.APersonalExp = "0.00";
    } else {
      if (this.basicDetailsObj.APersonalExp.toString().indexOf(".") > -1) {
        this.basicDetailsObj.APersonalExp = this.basicDetailsObj.APersonalExp.slice(
          0,
          this.basicDetailsObj.APersonalExp.indexOf(".") + 3
        );
      }
      this.basicDetailsObj.APersonalExp = (+this.basicDetailsObj
        .APersonalExp).toFixed(2);
    }
    if (
      this.basicDetailsObj.APerRebet == "" ||
      this.basicDetailsObj.APerRebet == undefined
    ) {
      this.basicDetailsObj.APerRebet = "0.00";
    } else {
      if (this.basicDetailsObj.APerRebet.toString().indexOf(".") > -1) {
        this.basicDetailsObj.APerRebet = this.basicDetailsObj.APerRebet.slice(
          0,
          this.basicDetailsObj.APerRebet.indexOf(".") + 3
        );
      }
      this.basicDetailsObj.APerRebet = (+this.basicDetailsObj
        .APerRebet).toFixed(2);
    }
    if (
      this.basicDetailsObj.ADiffConsumption == "" ||
      this.basicDetailsObj.ADiffConsumption == undefined
    ) {
      this.basicDetailsObj.ADiffConsumption = "0.00";
    } else {
      if (this.basicDetailsObj.ADiffConsumption.toString().indexOf(".") > -1) {
        this.basicDetailsObj.ADiffConsumption = this.basicDetailsObj.ADiffConsumption.slice(
          0,
          this.basicDetailsObj.ADiffConsumption.indexOf(".") + 3
        );
      }
      this.basicDetailsObj.ADiffConsumption = (+this.basicDetailsObj
        .ADiffConsumption).toFixed(2);
    }
    if (
      this.basicDetailsObj.AOtherProfit == "" ||
      this.basicDetailsObj.AOtherProfit == undefined
    ) {
      this.basicDetailsObj.AOtherProfit = "0.00";
    } else {
      if (this.basicDetailsObj.AOtherProfit.toString().indexOf(".") > -1) {
        this.basicDetailsObj.AOtherProfit = this.basicDetailsObj.AOtherProfit.slice(
          0,
          this.basicDetailsObj.AOtherProfit.indexOf(".") + 3
        );
      }
      this.basicDetailsObj.AOtherProfit = (+this.basicDetailsObj
        .AOtherProfit).toFixed(2);
    }
    if (
      this.basicDetailsObj.AAdjustTotal == "" ||
      this.basicDetailsObj.AAdjustTotal == undefined
    ) {
      this.basicDetailsObj.AAdjustTotal = "0.00";
    } else {
      if (this.basicDetailsObj.AAdjustTotal.toString().indexOf(".") > -1) {
        this.basicDetailsObj.AAdjustTotal = this.basicDetailsObj.AAdjustTotal.slice(
          0,
          this.basicDetailsObj.AAdjustTotal.indexOf(".") + 3
        );
      }
      this.basicDetailsObj.AAdjustTotal = (+this.basicDetailsObj
        .AAdjustTotal).toFixed(2);
    }
    if (
      this.basicDetailsObj.ANetProfitAmend == "" ||
      this.basicDetailsObj.ANetProfitAmend == undefined
    ) {
      this.basicDetailsObj.ANetProfitAmend = "0.00";
    } else {
      if (this.basicDetailsObj.ANetProfitAmend.toString().indexOf(".") > -1) {
        this.basicDetailsObj.ANetProfitAmend = this.basicDetailsObj.ANetProfitAmend.slice(
          0,
          this.basicDetailsObj.ANetProfitAmend.indexOf(".") + 3
        );
      }
      this.basicDetailsObj.ANetProfitAmend = (+this.basicDetailsObj
        .ANetProfitAmend).toFixed(2);
    }
    if (
      this.basicDetailsObj.AShareProfit == "" ||
      this.basicDetailsObj.AShareProfit == undefined
    ) {
      this.basicDetailsObj.AShareProfit = "0.00";
    } else {
      if (this.basicDetailsObj.AShareProfit.toString().indexOf(".") > -1) {
        this.basicDetailsObj.AShareProfit = this.basicDetailsObj.AShareProfit.slice(
          0,
          this.basicDetailsObj.AShareProfit.indexOf(".") + 3
        );
      }
      this.basicDetailsObj.AShareProfit = (+this.basicDetailsObj
        .AShareProfit).toFixed(2);
    }
    if (
      this.basicDetailsObj.AVesselTaxTotal == "" ||
      this.basicDetailsObj.AVesselTaxTotal == undefined
    ) {
      this.basicDetailsObj.AVesselTaxTotal = "0.00";
    } else {
      if (this.basicDetailsObj.AVesselTaxTotal.toString().indexOf(".") > -1) {
        this.basicDetailsObj.AVesselTaxTotal = this.basicDetailsObj.AVesselTaxTotal.slice(
          0,
          this.basicDetailsObj.AVesselTaxTotal.indexOf(".") + 3
        );
      }
      this.basicDetailsObj.AVesselTaxTotal = (+this.basicDetailsObj
        .AVesselTaxTotal).toFixed(2);
    }
    if (
      this.basicDetailsObj.AVesselTax == "" ||
      this.basicDetailsObj.AVesselTax == undefined
    ) {
      this.basicDetailsObj.AVesselTax = "0.00";
    } else {
      if (this.basicDetailsObj.AVesselTax.toString().indexOf(".") > -1) {
        this.basicDetailsObj.AVesselTax = this.basicDetailsObj.AVesselTax.slice(
          0,
          this.basicDetailsObj.AVesselTax.indexOf(".") + 3
        );
      }
      this.basicDetailsObj.AVesselTax = (+this.basicDetailsObj
        .AVesselTax).toFixed(2);
    }
    let val1 = (
      parseFloat(this.basicDetailsObj.ARevTotal) -
      parseFloat(this.basicDetailsObj.AExpense)
    ).toFixed(2);
    this.basicDetailsObj.ANetProfitLossRatio = val1;
    let val2 = (
      parseFloat(this.basicDetailsObj.ADiffConsumption) +
      parseFloat(this.basicDetailsObj.APerRebet) +
      parseFloat(this.basicDetailsObj.APersonalExp) +
      parseFloat(this.basicDetailsObj.AIncomeTax) +
      parseFloat(this.basicDetailsObj.AProvRes) +
      parseFloat(this.basicDetailsObj.AOtherProfit)
    ).toFixed(2);
    this.basicDetailsObj.AAdjustTotal = val2;
    let val3 = (
      parseFloat(this.basicDetailsObj.ANetProfitLossRatio) +
      parseFloat(this.basicDetailsObj.AAdjustTotal)
    ).toFixed(2);
    this.basicDetailsObj.ANetProfitAmend = val3;
    let val4 = (
      parseFloat(this.basicDetailsObj.ANetProfitAmend) +
      parseFloat(this.basicDetailsObj.AShareProfit)
    ).toFixed(2);
    this.basicDetailsObj.AVesselTaxTotal = val4;
    if (parseFloat(this.basicDetailsObj.AAdoptionProfit) > 0) {
      let val5 = (
        parseFloat(this.basicDetailsObj.ANetProfitLossRatio) * 0.25
      ).toFixed(2);
      if (parseFloat(this.basicDetailsObj.AAdoptionProfit) > parseFloat(val5)) {
      } else {
      }
    }
    let val6 = (
      parseFloat(this.basicDetailsObj.AVesselTaxTotal) -
      parseFloat(this.basicDetailsObj.AAdoptionProfit)
    ).toFixed(2);
    this.basicDetailsObj.AVesselTax = val6;
    let val7 = (parseFloat(this.basicDetailsObj.AVesselTax) * 0.2).toFixed(2);
    if (parseFloat(val7) <= 0) {
      this.basicDetailsObj.ATaxPay = "0.00";
    } else {
      this.basicDetailsObj.ATaxPay = val7;
    }
  }
  calAdjustmentsTab() {
    this.CalculateTotals();
  }
  changenoofdays(index) {
    if (
      this.income30101.controls[index].value.ContractDuration == "" ||
      this.income30101.controls[index].value.ContractDuration == undefined
    ) {
      this.income30101.controls[index].patchValue({ ContractDuration: "0" });
    }
  }
  SaveDepreciation() {
    this.basicDetailsObj.ADiffConsumption = this.Sch4_401.ANetAssetDiff;
    this.basicDetailsObj.Sch4_401 = this.Sch4_401;
    this.basicDetailsObj.AConsumptionAttach = "1";
    jQuery("#depreciation").modal("hide");
    this.CalculateTotals();
    this.clsePopup();
  }
  DepreciationApplicable(event) {
    if (event.currentTarget.checked) {
      this.DepreciationIsApplicable = true;
      jQuery("#depreciation").modal("show");
    } else {
      this.DepreciationIsApplicable = false;
      this.Sch4_401 = this.Sch4_401Temp;
      this.calDepreciationA();
      this.calDepreciationB();
      this.calDepreciationC();
      this.calDepreciationD();
      this.calDepreciationE();
      this.calDepreciationF();
      this.basicDetailsObj.ADiffConsumption = "0.00";
      jQuery("#depreciation").modal("hide");
      this.basicDetailsObj.AConsumptionAttach = "2";
      // this.basicDetailsObj.ADiffConsumption="0.00";
      this.CalculateTotals();
      this.SaveDepreciation();
    }
  }
  calDepreciationA() {
    this.Sch4_401.ALdGrbal = (+this.Sch4_401.ALdGrbal).toFixed(2) || "0.00";
    this.Sch4_401.ALdCostprevYr =
      (+this.Sch4_401.ALdCostprevYr).toFixed(2) || "0.00";
    this.Sch4_401.ALdCostcurrYr =
      (+this.Sch4_401.ALdCostcurrYr).toFixed(2) || "0.00";
    this.Sch4_401.ALdTcompPrev =
      (+this.Sch4_401.ALdTcompPrev).toFixed(2) || "0.00";
    this.Sch4_401.ALdTcomp = (+this.Sch4_401.ALdTcomp).toFixed(2) || "0.00";
    //this.Sch4_401.AMaintainGrvlLd = (+this.Sch4_401.AMaintainGrvlLd).toFixed(2) || "0.00";
    //this.Sch4_401.AMaintainGrvlGr1 = (+this.Sch4_401.AMaintainGrvlGr1).toFixed(2) || "0.00";
    this.Sch4_401.ALd4excess = (+this.Sch4_401.ALd4excess).toFixed(2) || "0.00";

    //Lands (A) calculation
    this.Sch4_401.ALd50cost = (
      (parseFloat(this.Sch4_401.ALdCostprevYr) +
        parseFloat(this.Sch4_401.ALdCostcurrYr)) *
      0.5
    ).toFixed(2);
    this.Sch4_401.ALd50comp = (
      (parseFloat(this.Sch4_401.ALdTcompPrev) +
        parseFloat(this.Sch4_401.ALdTcomp)) *
      0.5
    ).toFixed(2);
    this.Sch4_401.ALdRestval = (
      parseFloat(this.Sch4_401.ALdGrbal) +
      parseFloat(this.Sch4_401.ALd50cost) -
      parseFloat(this.Sch4_401.ALd50comp)
    ).toFixed(2);
    this.Sch4_401.ALdDeprAmt = (
      parseFloat(this.Sch4_401.ALdRestval) *
      (parseFloat(this.Sch4_401.ALdRatio) / 100)
    ).toFixed(2);
    this.Sch4_401.ALdRestvalCurr1 = (
      parseFloat(this.Sch4_401.ALdRestval) -
      parseFloat(this.Sch4_401.ALdDeprAmt)
    ).toFixed(2);
    this.Sch4_401.ALdRestvalCurr2 = (
      parseFloat(this.Sch4_401.ALdRestvalCurr1) +
      parseFloat(this.Sch4_401.ALd4excess)
    ).toFixed(2);

    this.calTotalDepreciation();
  }

  calDepreciationB() {
    this.Sch4_401.AGr1Grbal = (+this.Sch4_401.AGr1Grbal).toFixed(2) || "0.00";
    this.Sch4_401.AGr1CostprevYr =
      (+this.Sch4_401.AGr1CostprevYr).toFixed(2) || "0.00";
    this.Sch4_401.AGr1CostcurrYr =
      (+this.Sch4_401.AGr1CostcurrYr).toFixed(2) || "0.00";
    this.Sch4_401.AGr1TcompPrev =
      (+this.Sch4_401.AGr1TcompPrev).toFixed(2) || "0.00";
    this.Sch4_401.AGr14excess =
      (+this.Sch4_401.AGr14excess).toFixed(2) || "0.00";
    this.Sch4_401.AGr1TcompCurr =
      (+this.Sch4_401.AGr1TcompCurr).toFixed(2) || "0.00";
    //this.Sch4_401.AMaintainGrvlGr2 = (+this.Sch4_401.AMaintainGrvlGr2).toFixed(2) || "0.00";

    //First(B): Calculation
    this.Sch4_401.AGr150cost = (
      (parseFloat(this.Sch4_401.AGr1CostprevYr) +
        parseFloat(this.Sch4_401.AGr1CostcurrYr)) *
      0.5
    ).toFixed(2);
    this.Sch4_401.AGr150comp = (
      (parseFloat(this.Sch4_401.AGr1TcompPrev) +
        parseFloat(this.Sch4_401.AGr1TcompCurr)) *
      0.5
    ).toFixed(2);
    this.Sch4_401.AGr1Restval = (
      parseFloat(this.Sch4_401.AGr1Grbal) +
      parseFloat(this.Sch4_401.AGr150cost) -
      parseFloat(this.Sch4_401.AGr150comp)
    ).toFixed(2);
    this.Sch4_401.AGr1DeprAmt = (
      parseFloat(this.Sch4_401.AGr1Restval) *
      (parseFloat(this.Sch4_401.AGr1Ratio) / 100)
    ).toFixed(2);
    this.Sch4_401.AGr1RestvalCurr1 = (
      parseFloat(this.Sch4_401.AGr1Restval) -
      parseFloat(this.Sch4_401.AGr1DeprAmt)
    ).toFixed(2);
    this.Sch4_401.AGr1RestvalCurr2 = (
      parseFloat(this.Sch4_401.AGr1RestvalCurr1) +
      parseFloat(this.Sch4_401.AGr14excess)
    ).toFixed(2);

    this.calTotalDepreciation();
  }

  calDepreciationC() {
    this.Sch4_401.AGr2Grbal = (+this.Sch4_401.AGr2Grbal).toFixed(2) || "0.00";
    this.Sch4_401.AGr2CostprevYr =
      (+this.Sch4_401.AGr2CostprevYr).toFixed(2) || "0.00";
    this.Sch4_401.AGr2CostcurrYr =
      (+this.Sch4_401.AGr2CostcurrYr).toFixed(2) || "0.00";
    this.Sch4_401.AGr2TcompPrev =
      (+this.Sch4_401.AGr2TcompPrev).toFixed(2) || "0.00";
    this.Sch4_401.AGr24excess =
      (+this.Sch4_401.AGr24excess).toFixed(2) || "0.00";
    this.Sch4_401.AGr2TcompCurr =
      (+this.Sch4_401.AGr2TcompCurr).toFixed(2) || "0.00";

    // Second(C): Calculation
    this.Sch4_401.AGr250cost = (
      (parseFloat(this.Sch4_401.AGr2CostprevYr) +
        parseFloat(this.Sch4_401.AGr2CostcurrYr)) *
      0.5
    ).toFixed(2);
    this.Sch4_401.AGr250comp = (
      (parseFloat(this.Sch4_401.AGr2TcompPrev) +
        parseFloat(this.Sch4_401.AGr2TcompCurr)) *
      0.5
    ).toFixed(2);
    this.Sch4_401.AGr2Restval = (
      parseFloat(this.Sch4_401.AGr2Grbal) +
      parseFloat(this.Sch4_401.AGr250cost) -
      parseFloat(this.Sch4_401.AGr250comp)
    ).toFixed(2);
    this.Sch4_401.AGr2DeprAmt = (
      parseFloat(this.Sch4_401.AGr2Restval) *
      (parseFloat(this.Sch4_401.AGr2Ratio) / 100)
    ).toFixed(2);
    this.Sch4_401.AGr2RestvalCurr1 = (
      parseFloat(this.Sch4_401.AGr2Restval) -
      parseFloat(this.Sch4_401.AGr2DeprAmt)
    ).toFixed(2);
    this.Sch4_401.AGr2RestvalCurr2 = (
      parseFloat(this.Sch4_401.AGr2RestvalCurr1) +
      parseFloat(this.Sch4_401.AGr24excess)
    ).toFixed(2);

    this.calTotalDepreciation();
  }

  calDepreciationD() {
    this.Sch4_401.AGr3Grbal = (+this.Sch4_401.AGr3Grbal).toFixed(2) || "0.00";
    this.Sch4_401.AGr3CostprevYr =
      (+this.Sch4_401.AGr3CostprevYr).toFixed(2) || "0.00";
    this.Sch4_401.AGr3CostcurrYr =
      (+this.Sch4_401.AGr3CostcurrYr).toFixed(2) || "0.00";
    this.Sch4_401.AGr3TcompPrev =
      (+this.Sch4_401.AGr3TcompPrev).toFixed(2) || "0.00";
    this.Sch4_401.AGr34excess =
      (+this.Sch4_401.AGr34excess).toFixed(2) || "0.00";
    this.Sch4_401.AGr3TcompCurr =
      (+this.Sch4_401.AGr3TcompCurr).toFixed(2) || "0.00";
    //this.Sch4_401.AMaintainGrvlGr3 = (+this.Sch4_401.AMaintainGrvlGr3).toFixed(2) || "0.00";

    //Third(D): Calculation
    this.Sch4_401.AGr350cost = (
      (parseFloat(this.Sch4_401.AGr3CostprevYr) +
        parseFloat(this.Sch4_401.AGr3CostcurrYr)) *
      0.5
    ).toFixed(2);
    this.Sch4_401.AGr350comp = (
      (parseFloat(this.Sch4_401.AGr3TcompPrev) +
        parseFloat(this.Sch4_401.AGr3TcompCurr)) *
      0.5
    ).toFixed(2);
    this.Sch4_401.AGr3Restval = (
      parseFloat(this.Sch4_401.AGr3Grbal) +
      parseFloat(this.Sch4_401.AGr350cost) -
      parseFloat(this.Sch4_401.AGr350comp)
    ).toFixed(2);
    this.Sch4_401.AGr3DeprAmt = (
      parseFloat(this.Sch4_401.AGr3Restval) *
      (parseFloat(this.Sch4_401.AGr3Ratio) / 100)
    ).toFixed(2);
    this.Sch4_401.AGr3RestvalCurr1 = (
      parseFloat(this.Sch4_401.AGr3Restval) -
      parseFloat(this.Sch4_401.AGr3DeprAmt)
    ).toFixed(2);
    this.Sch4_401.AGr3RestvalCurr2 = (
      parseFloat(this.Sch4_401.AGr3RestvalCurr1) +
      parseFloat(this.Sch4_401.AGr34excess)
    ).toFixed(2);

    this.calTotalDepreciation();
  }

  calDepreciationE() {
    this.Sch4_401.AGr4Grbal = (+this.Sch4_401.AGr4Grbal).toFixed(2) || "0.00";
    this.Sch4_401.AGr4CostprevYr =
      (+this.Sch4_401.AGr4CostprevYr).toFixed(2) || "0.00";
    this.Sch4_401.AGr4CostcurrYr =
      (+this.Sch4_401.AGr4CostcurrYr).toFixed(2) || "0.00";
    this.Sch4_401.AGr4TcompPrev =
      (+this.Sch4_401.AGr4TcompPrev).toFixed(2) || "0.00";
    this.Sch4_401.AGr44excess =
      (+this.Sch4_401.AGr44excess).toFixed(2) || "0.00";
    this.Sch4_401.AGr4TcompCurr =
      (+this.Sch4_401.AGr4TcompCurr).toFixed(2) || "0.00";
    //this.Sch4_401.AMaintainGrvlGr4 = (+this.Sch4_401.AMaintainGrvlGr4).toFixed(2) || "0.00";

    //Fourth(E): Calculation
    this.Sch4_401.AGr450cost = (
      (parseFloat(this.Sch4_401.AGr4CostprevYr) +
        parseFloat(this.Sch4_401.AGr4CostcurrYr)) *
      0.5
    ).toFixed(2);
    this.Sch4_401.AGr450comp = (
      (parseFloat(this.Sch4_401.AGr4TcompPrev) +
        parseFloat(this.Sch4_401.AGr4TcompCurr)) *
      0.5
    ).toFixed(2);
    this.Sch4_401.AGr4Restval = (
      parseFloat(this.Sch4_401.AGr4Grbal) +
      parseFloat(this.Sch4_401.AGr450cost) -
      parseFloat(this.Sch4_401.AGr450comp)
    ).toFixed(2);
    this.Sch4_401.AGr4DeprAmt = (
      parseFloat(this.Sch4_401.AGr4Restval) *
      (parseFloat(this.Sch4_401.AGr4Ratio) / 100)
    ).toFixed(2);
    this.Sch4_401.AGr4RestvalCurr1 = (
      parseFloat(this.Sch4_401.AGr4Restval) -
      parseFloat(this.Sch4_401.AGr4DeprAmt)
    ).toFixed(2);
    this.Sch4_401.AGr4RestvalCurr2 = (
      parseFloat(this.Sch4_401.AGr4RestvalCurr1) +
      parseFloat(this.Sch4_401.AGr44excess)
    ).toFixed(2);

    this.calTotalDepreciation();
  }

  calDepreciationF() {
    this.Sch4_401.AGr5Grbal = (+this.Sch4_401.AGr5Grbal).toFixed(2) || "0.00";
    this.Sch4_401.AGr5CostprevYr =
      (+this.Sch4_401.AGr5CostprevYr).toFixed(2) || "0.00";
    this.Sch4_401.AGr5CostcurrYr =
      (+this.Sch4_401.AGr5CostcurrYr).toFixed(2) || "0.00";
    this.Sch4_401.AGr5TcompPrev =
      (+this.Sch4_401.AGr5TcompPrev).toFixed(2) || "0.00";
    this.Sch4_401.AGr54excess =
      (+this.Sch4_401.AGr54excess).toFixed(2) || "0.00";
    this.Sch4_401.AGr5TcompCurr =
      (+this.Sch4_401.AGr5TcompCurr).toFixed(2) || "0.00";
    //this.Sch4_401.AMaintainGrvlGr5 = (+this.Sch4_401.AMaintainGrvlGr5).toFixed(2) || "0.00";

    //Fifth(F): Calculation
    this.Sch4_401.AGr550cost = (
      (parseFloat(this.Sch4_401.AGr5CostprevYr) +
        parseFloat(this.Sch4_401.AGr5CostcurrYr)) *
      0.5
    ).toFixed(2);
    this.Sch4_401.AGr550comp = (
      (parseFloat(this.Sch4_401.AGr5TcompPrev) +
        parseFloat(this.Sch4_401.AGr5TcompCurr)) *
      0.5
    ).toFixed(2);
    this.Sch4_401.AGr5Restval = (
      parseFloat(this.Sch4_401.AGr5Grbal) +
      parseFloat(this.Sch4_401.AGr550cost) -
      parseFloat(this.Sch4_401.AGr550comp)
    ).toFixed(2);
    this.Sch4_401.AGr5DeprAmt = (
      parseFloat(this.Sch4_401.AGr5Restval) *
      (parseFloat(this.Sch4_401.AGr5Ratio) / 100)
    ).toFixed(2);
    this.Sch4_401.AGr5RestvalCurr1 = (
      parseFloat(this.Sch4_401.AGr5Restval) -
      parseFloat(this.Sch4_401.AGr5DeprAmt)
    ).toFixed(2);
    this.Sch4_401.AGr5RestvalCurr2 = (
      parseFloat(this.Sch4_401.AGr5RestvalCurr1) +
      parseFloat(this.Sch4_401.AGr54excess)
    ).toFixed(2);

    this.calTotalDepreciation();
  }

  calTotalDepreciation() {
    this.Total1 = (
      parseFloat(this.Sch4_401.ALdGrbal) +
      parseFloat(this.Sch4_401.AGr1Grbal) +
      parseFloat(this.Sch4_401.AGr2Grbal) +
      parseFloat(this.Sch4_401.AGr3Grbal) +
      parseFloat(this.Sch4_401.AGr4Grbal) +
      parseFloat(this.Sch4_401.AGr5Grbal)
    ).toFixed(2);
    this.Total2 = (
      parseFloat(this.Sch4_401.ALdCostprevYr) +
      parseFloat(this.Sch4_401.AGr1CostprevYr) +
      parseFloat(this.Sch4_401.AGr2CostprevYr) +
      parseFloat(this.Sch4_401.AGr3CostprevYr) +
      parseFloat(this.Sch4_401.AGr4CostprevYr) +
      parseFloat(this.Sch4_401.AGr5CostprevYr)
    ).toFixed(2);
    this.Total3 = (
      parseFloat(this.Sch4_401.ALdCostcurrYr) +
      parseFloat(this.Sch4_401.AGr1CostcurrYr) +
      parseFloat(this.Sch4_401.AGr2CostcurrYr) +
      parseFloat(this.Sch4_401.AGr3CostcurrYr) +
      parseFloat(this.Sch4_401.AGr4CostcurrYr) +
      parseFloat(this.Sch4_401.AGr5CostcurrYr)
    ).toFixed(2);
    this.Total4 = (
      parseFloat(this.Sch4_401.ALd50cost) +
      parseFloat(this.Sch4_401.AGr150cost) +
      parseFloat(this.Sch4_401.AGr250cost) +
      parseFloat(this.Sch4_401.AGr350cost) +
      parseFloat(this.Sch4_401.AGr450cost) +
      parseFloat(this.Sch4_401.AGr550cost)
    ).toFixed(2);
    this.Total5 = (
      parseFloat(this.Sch4_401.ALdTcompPrev) +
      parseFloat(this.Sch4_401.AGr1TcompPrev) +
      parseFloat(this.Sch4_401.AGr2TcompPrev) +
      parseFloat(this.Sch4_401.AGr3TcompPrev) +
      parseFloat(this.Sch4_401.AGr4TcompPrev) +
      parseFloat(this.Sch4_401.AGr5TcompPrev)
    ).toFixed(2);
    this.Total6 = (
      parseFloat(this.Sch4_401.ALdTcomp) +
      parseFloat(this.Sch4_401.AGr1Tcomp) +
      parseFloat(this.Sch4_401.AGr2Tcomp) +
      parseFloat(this.Sch4_401.AGr3Tcomp) +
      parseFloat(this.Sch4_401.AGr4Tcomp) +
      parseFloat(this.Sch4_401.AGr5Tcomp)
    ).toFixed(2);
    this.Total7 = (
      parseFloat(this.Sch4_401.ALd50comp) +
      parseFloat(this.Sch4_401.AGr150comp) +
      parseFloat(this.Sch4_401.AGr250comp) +
      parseFloat(this.Sch4_401.AGr350comp) +
      parseFloat(this.Sch4_401.AGr450comp) +
      parseFloat(this.Sch4_401.AGr550comp)
    ).toFixed(2);
    this.Total8 = (
      parseFloat(this.Sch4_401.ALdRestval) +
      parseFloat(this.Sch4_401.AGr1Restval) +
      parseFloat(this.Sch4_401.AGr2Restval) +
      parseFloat(this.Sch4_401.AGr3Restval) +
      parseFloat(this.Sch4_401.AGr4Restval) +
      parseFloat(this.Sch4_401.AGr5Restval)
    ).toFixed(2);
    this.Total10 = (
      parseFloat(this.Sch4_401.ALdDeprAmt) +
      parseFloat(this.Sch4_401.AGr1DeprAmt) +
      parseFloat(this.Sch4_401.AGr2DeprAmt) +
      parseFloat(this.Sch4_401.AGr3DeprAmt) +
      parseFloat(this.Sch4_401.AGr4DeprAmt) +
      parseFloat(this.Sch4_401.AGr5DeprAmt)
    ).toFixed(2);
    this.Total11 = (
      parseFloat(this.Sch4_401.ALdRestvalCurr1) +
      parseFloat(this.Sch4_401.AGr1RestvalCurr1) +
      parseFloat(this.Sch4_401.AGr2RestvalCurr1) +
      parseFloat(this.Sch4_401.AGr3RestvalCurr1) +
      parseFloat(this.Sch4_401.AGr4RestvalCurr1) +
      parseFloat(this.Sch4_401.AGr5RestvalCurr1)
    ).toFixed(2);
    // this.Total12 = (parseFloat(this.Sch4_401.AMaintainGrvlLd) + parseFloat(this.Sch4_401.AMaintainGrvlGr1) + parseFloat(this.Sch4_401.AMaintainGrvlGr2) + parseFloat(this.Sch4_401.AMaintainGrvlGr3) + parseFloat(this.Sch4_401.AMaintainGrvlGr4) + parseFloat(this.Sch4_401.AMaintainGrvlGr5)).toFixed(2);
    this.Total12 = (
      parseFloat(this.Sch4_401.ALd4excess) +
      parseFloat(this.Sch4_401.AGr14excess) +
      parseFloat(this.Sch4_401.AGr24excess) +
      parseFloat(this.Sch4_401.AGr34excess) +
      parseFloat(this.Sch4_401.AGr44excess) +
      parseFloat(this.Sch4_401.AGr54excess)
    ).toFixed(2);
    this.Total13 = (
      parseFloat(this.Sch4_401.ALdRestvalCurr2) +
      parseFloat(this.Sch4_401.AGr1RestvalCurr2) +
      parseFloat(this.Sch4_401.AGr2RestvalCurr2) +
      parseFloat(this.Sch4_401.AGr3RestvalCurr2) +
      parseFloat(this.Sch4_401.AGr4RestvalCurr2) +
      parseFloat(this.Sch4_401.AGr5RestvalCurr2)
    ).toFixed(2);

    this.Sch4_401.AAmtTaxDepr = (
      (parseFloat(this.Sch4_401.AGr1CostcurrYr) +
        parseFloat(this.Sch4_401.AGr2CostcurrYr) +
        parseFloat(this.Sch4_401.AGr3CostcurrYr) +
        parseFloat(this.Sch4_401.AGr4CostcurrYr) +
        parseFloat(this.Sch4_401.AGr5CostcurrYr)) *
      0.5
    ).toFixed(2);
    this.Sch4_401.AAmtBookDepr = this.basicDetailsObj.AConsumption;
    this.Sch4_401.ANetAssetDiff = (
      parseFloat(this.Sch4_401.AAmtBookDepr) - parseFloat(this.Total10)
    ).toFixed(2);
    this.Sch4_401.ATaxDepDedAmt = (
      (parseFloat(this.Sch4_401.AGr1TcompPrev) +
        parseFloat(this.Sch4_401.AGr2TcompPrev) +
        parseFloat(this.Sch4_401.AGr3TcompPrev) +
        parseFloat(this.Sch4_401.AGr4TcompPrev) +
        parseFloat(this.Sch4_401.AGr5TcompPrev)) *
      0.5
    ).toFixed(2);
    this.Sch4_401.ATotAssetAmount = (
      parseFloat(this.Total11) +
      parseFloat(this.Sch4_401.AAmtTaxDepr) -
      parseFloat(this.Sch4_401.ATaxDepDedAmt)
    ).toFixed(2);
  }
  SaveForm3() {
    this.basicDetailsObj.AAgree = "1";
    this.basicDetailsObj.Savez = "X";
    this.basicDetailsObj.Submitz = "";
    console.log("postobj", this.basicDetailsObj);
    this.returnsService
      .SubmitForm3(this.basicDetailsObj)
      .subscribe((data: any) => {
        this.GetForm3Details();
      });
    this.clsePopup();
  }
  SubmitForm3() {
    this.basicDetailsObj.AAgree = "1";
    this.basicDetailsObj.Submitz = "X";
    this.returnsService
      .SubmitForm3(this.basicDetailsObj)
      .subscribe((data: any) => {
        this.GetForm3Details();
        this.step = 6;
      });
  }
  BasisChange(flag) {
    if (flag == "a") {
      this.basicDetailsObj.Baccrual = "true";
      this.basicDetailsObj.Bcash = "false";
      this.basicDetailsObj.Bamcash = "false";
    } else if (flag == "c") {
      this.basicDetailsObj.Baccrual = "false";
      this.basicDetailsObj.Bcash = "true";
      this.basicDetailsObj.Bamcash = "false";
    } else {
      this.basicDetailsObj.Baccrual = "false";
      this.basicDetailsObj.Bcash = "false";
      this.basicDetailsObj.Bamcash = "true";
    }
  }
  WeAvgChange(event) {
    // this.basicDetailsObj.ASet="";
    if (event.currentTarget.checked == true) {
      this.basicDetailsObj.Bweighavg = "true";
      this.basicDetailsObj.Bweighavgn = "false";
    } else {
      this.basicDetailsObj.Bweighavg = "false";
      this.basicDetailsObj.Bweighavgn = "true";
    }
  }
  InvChange(event) {
    // this.basicDetailsObj.ACapcity="";
    if (event.currentTarget.checked == true) {
      this.basicDetailsObj.Bmarkval = "true";
      this.basicDetailsObj.Bmarkvaln = "false";
    } else {
      this.basicDetailsObj.Bmarkval = "false";
      this.basicDetailsObj.Bmarkvaln = "true";
    }
  }
  DownloadFormFormat() {
    this.returnsService
      .getForm3Download(this.basicDetailsObj.Fbnum)
      .subscribe((data: any) => {
        FileSaver.saveAs(data, "FormFormat.pdf");
      });
  }
  //purna end
  ngOnInit(): void {
    //Added by sowjanya
    this.activatedRoute.params.subscribe((params) => {
      console.log("params", params);
      this.FbGuid = params["fbGuid"] || "";
      this.Euser = params["euser"] || "";
      if (this.FbGuid && this.Euser) {
        this.GetForm3Details();
      }
    });

    if (localStorage.getItem("lang") === "ar") {
      this.lang = form3constants.langz.arb.form3;
      this.direction = form3constants.langz.arb.dir;
    } else {
      this.lang = form3constants.langz.eng.form3;
      this.direction = form3constants.langz.eng.dir;
    }
    this.GetUserDetails();
    //ended by sowjanya
  }

  //Added by sowjanya
  AddIncome() {
    return this.fb.group({
      ContractingParty: ["", Validators.required],
      ContractingSubject: ["", Validators.required],
      ContractDate: ["", Validators.required],
      ContractDuration: ["0"],
      OriginalValueofContract: [0.0, [Validators.required, Validators.min(0)]],
      Adjustmenttocontract: [0.0, [Validators.required, Validators.min(0)]],
      valueofWorkPreviousYr: [0.0, [Validators.required, Validators.min(0)]],
      valueofWorkCurrentYr: [0.0, [Validators.required, Validators.min(0)]],
      ValueofRemainingwork: [0.0],
    });
  }
  // AddMainactivityIncomesSet()
  // {
  //   return this.fb.group({
  //     "Description":[null,Validators.required],
  //     "Amount":[0.00,[Validators.required,Validators.min(0)]]
  //   });
  // }
  AddtotalOtherIncome() {
    return this.fb.group({
      Description: ["", Validators.required],
      Amount: [0.0, [Validators.required, Validators.min(0)]],
    });
  }
  AddDirectExpensesIncome() {
    return this.fb.group({
      Description: ["", Validators.required],
      Amount: [0.0, [Validators.required, Validators.min(0)]],
    });
  }

  AddOtherExpensesIncome() {
    return this.fb.group({
      Description: ["", Validators.required],
      Amount: [0.0, [Validators.required, Validators.min(0)]],
    });
  }
  get income30101(): FormArray {
    return this.income30101Form.get("income30101") as FormArray;
  }
  get income30102(): FormArray {
    return this.income30102Form.get("income30102") as FormArray;
  }
  get income30203(): FormArray {
    return this.income30203Form.get("income30203") as FormArray;
  }
  get income30299(): FormArray {
    return this.income30299Form.get("income30299") as FormArray;
  }
  GetUserDetails() {
    this.vatService.getVatData().subscribe((res) => {
      console.log("resdata", res["d"]);
      this.userObject = res["d"];
      console.log("this.userObject", this.userObject);
      console.log("this.Taxpayerz", this.userObject.Taxpayerz);
    });
  }

  GetForm3Details() {
    this.returnsService
      .GetForm3Details(this.Euser, this.FbGuid)
      .subscribe((data) => {
        this.basicDetailsObj = data["d"];
        console.log("basicDetailsObj", this.basicDetailsObj);
        //purna start
        if (this.basicDetailsObj.AAgree == "1") {
          this.CorrectFlag = true;
        } else {
          this.CorrectFlag = false;
        }
        this.IsFormDisable = false;
        this.Sch4_401 = this.basicDetailsObj.Sch4_401;
        this.Sch4_401.ALdRatio = "0";
        this.clearFormArray(this.AGB2);
        for (
          let i = 0;
          i < this.basicDetailsObj.Sch1_499Set["results"].length;
          i++
        ) {
          this.AddRowAGB2();
          if (this.basicDetailsObj.AAdjustAttach == "1") {
            this.AGB2Form.patchValue({ Schedule: true });
          } else {
            this.AGB2Form.patchValue({ Schedule: false });
          }
          this.AGB2.controls[i].patchValue({
            Description: this.basicDetailsObj.Sch1_499Set["results"][i][
              "Description"
            ],
          });
          this.AGB2.controls[i].patchValue({
            Amount: this.basicDetailsObj.Sch1_499Set["results"][i]["Amount"],
          });
        }
        this.clearFormArray(this.AGB3);
        for (
          let i = 0;
          i < this.basicDetailsObj.Sch1_502Set["results"].length;
          i++
        ) {
          this.AddRowAGB3();
          if (this.basicDetailsObj.AProfitLossAttach == "1") {
            this.AGB3Form.patchValue({ Schedule: true });
          } else {
            this.AGB3Form.patchValue({ Schedule: false });
          }
          this.AGB3.controls[i].patchValue({
            Tin: this.basicDetailsObj.Sch1_502Set["results"][i]["Tin"],
          });
          this.AGB3.controls[i].patchValue({
            Name: this.basicDetailsObj.Sch1_502Set["results"][i]["Name"],
          });
          this.AGB3.controls[i].patchValue({
            Amount: this.basicDetailsObj.Sch1_502Set["results"][i]["Amount"],
          });
        }
        if (this.basicDetailsObj.AConsumptionAttach == "1") {
          this.DepreciationIsApplicable = true;
        } else {
          this.DepreciationIsApplicable = false;
        }
        //this.Sch4_401 = this.basicDetailsObj.Sch4_401;
        //console.log("sch_20401", this.Sch_20401);
        this.calCellTotalAGB2();
        this.calCellTotalAGB3();
        this.calDepreciationA();
        this.calDepreciationB();
        this.calDepreciationC();
        this.calDepreciationD();
        this.calDepreciationE();
        this.calDepreciationF();

        this.calAdjustmentsTab();
        //purna end
        //sowjanya start
        this.periodStartDate = moment(
          new Date(
            +this.basicDetailsObj.AFromDt.replace(")", "")
              .toString()
              .replace("/Date(", "")
              .toString()
              .replace("/", "")
          )
        ).format("DD/MM/YYYY");
        this.periodEndDate = moment(
          new Date(
            +this.basicDetailsObj.AToDate.replace(")", "")
              .toString()
              .replace("/Date(", "")
              .toString()
              .replace("/", "")
          )
        ).format("DD/MM/YYYY");
        this.clearFormArray(this.income30101);
        for (
          let i = 0;
          i < this.basicDetailsObj.Sch0_101Set["results"].length;
          i++
        ) {
          this.AddRowIncomeRow1();
          if (this.basicDetailsObj.AMainActAttach == "1") {
            this.income30101Form.patchValue({ Schedule: true });
          } else {
            this.income30101Form.patchValue({ Schedule: false });
          }
          this.income30101.controls[i].patchValue({
            ContractingParty: this.basicDetailsObj.Sch0_101Set["results"][i][
              "CParty"
            ],
          });
          this.income30101.controls[i].patchValue({
            ContractingSubject: this.basicDetailsObj.Sch0_101Set["results"][i][
              "CSubject"
            ],
          });
          this.income30101.controls[i].patchValue({
            ContractDate:
              this.basicDetailsObj.Sch0_101Set["results"][i]["ContractDt"] !=
              null
                ? moment(
                    new Date(
                      +this.basicDetailsObj.Sch0_101Set["results"][i][
                        "ContractDt"
                      ]
                        .replace(")", "")
                        .toString()
                        .replace("/Date(", "")
                        .toString()
                        .replace("/", "")
                    )
                  ).format("YYYY-MM-DD")
                : moment(new Date()).format("YYYY-MM-DD"),
          });
          this.income30101.controls[i].patchValue({
            ContractDuration: this.basicDetailsObj.Sch0_101Set["results"][i][
              "CDuration"
            ],
          });
          this.income30101.controls[i].patchValue({
            OriginalValueofContract:
              this.basicDetailsObj.Sch0_101Set["results"][i]["COrgVal"] || 0.0,
          });
          this.income30101.controls[i].patchValue({
            Adjustmenttocontract:
              this.basicDetailsObj.Sch0_101Set["results"][i]["CAdjustVal"] ||
              0.0,
          });
          this.income30101.controls[i].patchValue({
            valueofWorkPreviousYr:
              this.basicDetailsObj.Sch0_101Set["results"][i]["PrevWorkVal"] ||
              0.0,
          });
          this.income30101.controls[i].patchValue({
            valueofWorkCurrentYr:
              this.basicDetailsObj.Sch0_101Set["results"][i]["CurWorkVal"] ||
              0.0,
          });
          this.income30101.controls[i].patchValue({
            ValueofRemainingwork:
              this.basicDetailsObj.Sch0_101Set["results"][i]["RemWorkVal"] ||
              0.0,
          });
          this.TotalIncomemainActivityCalculation(i);
        }

        this.clearFormArray(this.income30102);
        for (
          let i = 0;
          i < this.basicDetailsObj.Sch1_102Set["results"].length;
          i++
        ) {
          this.AddRowTotalIncomeRow2();
          if (this.basicDetailsObj.ATotalOtherAttach == "1") {
            this.income30102Form.patchValue({ Schedule: true });
          } else {
            this.income30102Form.patchValue({ Schedule: false });
          }
          this.income30102.controls[i].patchValue({
            Description: this.basicDetailsObj.Sch1_102Set["results"][i][
              "Description"
            ],
          });
          this.income30102.controls[i].patchValue({
            Amount: this.basicDetailsObj.Sch1_102Set["results"][i]["Amount"],
          });
        }

        this.clearFormArray(this.income30203);
        for (
          let i = 0;
          i < this.basicDetailsObj.Sch1_203Set["results"].length;
          i++
        ) {
          this.AddRowIncomeRow3();
          if (this.basicDetailsObj.ADirectExpAttach == "1") {
            this.income30203Form.patchValue({ Schedule: true });
          } else {
            this.income30203Form.patchValue({ Schedule: false });
          }
          this.income30203.controls[i].patchValue({
            Description: this.basicDetailsObj.Sch1_203Set["results"][i][
              "Description"
            ],
          });
          this.income30203.controls[i].patchValue({
            Amount: this.basicDetailsObj.Sch1_203Set["results"][i]["Amount"],
          });
        }

        this.clearFormArray(this.income30299);
        for (
          let i = 0;
          i < this.basicDetailsObj.Sch1_299Set["results"].length;
          i++
        ) {
          this.AddRowIncomeRow4();
          if (this.basicDetailsObj.AOtherExpAttach == "1") {
            this.income30299Form.patchValue({ Schedule: true });
          } else {
            this.income30299Form.patchValue({ Schedule: false });
          }
          this.income30299.controls[i].patchValue({
            Description: this.basicDetailsObj.Sch1_299Set["results"][i][
              "Description"
            ],
          });
          this.income30299.controls[i].patchValue({
            Amount: this.basicDetailsObj.Sch1_299Set["results"][i]["Amount"],
          });
        }

        this.TotalotheIncomeCalculation();
        this.TotalDirectExpensesCalculation();
        this.TotalotherExpensesCalculation();
        //sowjanya end
      });
  }
  AddRowIncomeRow1() {
    let type = this.AddIncome();
    this.income30101.push(type);
  }
  AddMultipleIncomeMainActivityForms() {
    for (let i = 0; i < this.NoOfAddedForms; i++) {
      this.AddRowIncomeRow1();
    }
    jQuery("#addMultipleFormsModalIncomeMainActivity").modal("hide");
    this.addPopup();
  }
  AddRowTotalIncomeRow2() {
    let type = this.AddtotalOtherIncome();
    this.income30102.push(type);
  }
  AddMultipleOtherIncomeForms() {
    for (let i = 0; i < this.NoOfAddedForms; i++) {
      this.AddRowTotalIncomeRow2();
    }
    jQuery("#addMultipleFormsModalOtherIncome").modal("hide");
    this.addPopup();
  }
  AddRowIncomeRow3() {
    let type = this.AddDirectExpensesIncome();
    this.income30203.push(type);
  }

  AddMultipleDirectExpenseIncomeForms() {
    for (let i = 0; i < this.NoOfAddedForms; i++) {
      this.AddRowIncomeRow3();
    }
    jQuery("#addMultipleFormsModalDirectExpenseIncome").modal("hide");
    this.addPopup();
  }
  AddRowIncomeRow4() {
    let type = this.AddOtherExpensesIncome();
    this.income30299.push(type);
  }
  AddMultipleOtherExpenseIncomeForms() {
    for (let i = 0; i < this.NoOfAddedForms; i++) {
      this.AddRowIncomeRow4();
    }
    jQuery("#addMultipleFormsModalOtherExpenseIncome").modal("hide");
    this.addPopup();
  }
  DeleteIncome1(pi) {
    const control = this.income30101Form.get("income30101") as FormArray;
    control.removeAt(pi);
    if (pi > 0) {
      this.TotalIncomemainActivityCalculation(pi - 1);
    } else {
      this.AddRowIncomeRow1();
      this.TotalIncomemainActivityCalculation(0);
    }
  }
  DeleteIncome2(pi) {
    const control = this.income30102Form.get("income30102") as FormArray;
    control.removeAt(pi);
    this.TotalotheIncomeCalculation();
  }
  DeleteIncome3(pi) {
    const control = this.income30203Form.get("income30203") as FormArray;
    control.removeAt(pi);
    this.TotalDirectExpensesCalculation();
  }
  DeleteIncome4(pi) {
    const control = this.income30299Form.get("income30299") as FormArray;
    control.removeAt(pi);
    this.TotalotherExpensesCalculation();
  }
  ClearIncome1() {
    this.clearFormArray(this.income30101);
    for (
      let i = 0;
      i < this.basicDetailsObj.Sch0_101Set["results"].length;
      i++
    ) {
      this.AddRowIncomeRow1();
      if (this.basicDetailsObj.Sch0_101Set["results"][0]["CParty"] != "") {
        this.income30101Form.patchValue({ Schedule: true });
      } else {
        this.income30101Form.patchValue({ Schedule: false });
      }
      this.income30101.controls[i].patchValue({
        ContractingParty: this.basicDetailsObj.Sch0_101Set["results"][i][
          "CParty"
        ],
      });
      this.income30101.controls[i].patchValue({
        ContractingSubject: this.basicDetailsObj.Sch0_101Set["results"][i][
          "CSubject"
        ],
      });
      this.income30101.controls[i].patchValue({
        ContractDate:
          this.basicDetailsObj.Sch0_101Set["results"][i]["ContractDt"] != null
            ? moment(
                new Date(
                  +this.basicDetailsObj.Sch0_101Set["results"][i]["ContractDt"]
                    .replace(")", "")
                    .toString()
                    .replace("/Date(", "")
                    .toString()
                    .replace("/", "")
                )
              ).format("YYYY-MM-DD")
            : moment(new Date()).format("YYYY-MM-DD"),
      });
      this.income30101.controls[i].patchValue({
        ContractDuration: this.basicDetailsObj.Sch0_101Set["results"][i][
          "CDuration"
        ],
      });
      this.income30101.controls[i].patchValue({
        OriginalValueofContract:
          this.basicDetailsObj.Sch0_101Set["results"][i]["COrgVal"] || 0.0,
      });
      this.income30101.controls[i].patchValue({
        Adjustmenttocontract:
          this.basicDetailsObj.Sch0_101Set["results"][i]["CAdjustVal"] || 0.0,
      });
      this.income30101.controls[i].patchValue({
        valueofWorkPreviousYr:
          this.basicDetailsObj.Sch0_101Set["results"][i]["PrevWorkVal"] || 0.0,
      });
      this.income30101.controls[i].patchValue({
        valueofWorkCurrentYr:
          this.basicDetailsObj.Sch0_101Set["results"][i]["CurWorkVal"] || 0.0,
      });
      this.income30101.controls[i].patchValue({
        ValueofRemainingwork:
          this.basicDetailsObj.Sch0_101Set["results"][i]["RemWorkVal"] || 0.0,
      });
      this.TotalIncomemainActivityCalculation(i);
    }
    jQuery("#incomeMainActivity").modal("hide");
    this.clsePopup();
  }
  ClearIncome2() {
    this.clearFormArray(this.income30102);
    for (
      let i = 0;
      i < this.basicDetailsObj.Sch1_102Set["results"].length;
      i++
    ) {
      this.AddRowTotalIncomeRow2();
      if (this.basicDetailsObj.Sch1_102Set["results"][0]["Description"] != "") {
        this.income30102Form.patchValue({ Schedule: true });
      } else {
        this.income30102Form.patchValue({ Schedule: false });
      }
      this.income30102.controls[i].patchValue({
        Description: this.basicDetailsObj.Sch1_102Set["results"][i][
          "Description"
        ],
      });
      this.income30102.controls[i].patchValue({
        Amount: this.basicDetailsObj.Sch1_102Set["results"][i]["Amount"],
      });
    }
    this.TotalotheIncomeCalculation();
    jQuery("#total-other-income").modal("hide");
    this.clsePopup();
  }
  ClearIncome3() {
    this.clearFormArray(this.income30203);
    for (
      let i = 0;
      i < this.basicDetailsObj.Sch1_203Set["results"].length;
      i++
    ) {
      this.AddRowIncomeRow3();
      if (this.basicDetailsObj.Sch1_203Set["results"][0]["Description"] != "") {
        this.income30203Form.patchValue({ Schedule: true });
      } else {
        this.income30203Form.patchValue({ Schedule: false });
      }
      this.income30203.controls[i].patchValue({
        Description: this.basicDetailsObj.Sch1_203Set["results"][i][
          "Description"
        ],
      });
      this.income30203.controls[i].patchValue({
        Amount: this.basicDetailsObj.Sch1_203Set["results"][i]["Amount"],
      });
    }
    jQuery("#provisions1").modal("hide");
    this.TotalDirectExpensesCalculation();
    this.clsePopup();
  }
  ClearIncome4() {
    this.clearFormArray(this.income30299);
    for (
      let i = 0;
      i < this.basicDetailsObj.Sch1_299Set["results"].length;
      i++
    ) {
      this.AddRowIncomeRow4();
      if (this.basicDetailsObj.Sch1_299Set["results"][0]["Description"] != "") {
        this.income30299Form.patchValue({ Schedule: true });
      } else {
        this.income30299Form.patchValue({ Schedule: false });
      }
      this.income30299.controls[i].patchValue({
        Description: this.basicDetailsObj.Sch1_299Set["results"][i][
          "Description"
        ],
      });
      this.income30299.controls[i].patchValue({
        Amount: this.basicDetailsObj.Sch1_299Set["results"][i]["Amount"],
      });
      this.income30299.controls[i].patchValue({
        FormGuid: this.basicDetailsObj.Sch1_299Set["results"][0]["FormGuid"],
      });
    }
    jQuery("#provisions2").modal("hide");
    this.TotalotherExpensesCalculation();
    this.clsePopup();
  }
  remaingAmount: any = 0.0;

  TotalIncomemainActivityCalculation(index) {
    this.income30101Form.value.TotalOriginalValueOfContract = 0.0;
    this.income30101Form.value.TotalAdjustmentToTheContract = 0.0;
    this.income30101Form.value.TotalValueOfPreviousYears = 0.0;
    this.income30101Form.value.TotalValueOfCurrentYear = 0.0;
    this.income30101Form.value.TotalValueOfRemainingWork = 0.0;
    if (
      this.income30101.controls[index].value.OriginalValueofContract == "" ||
      this.income30101.controls[index].value.OriginalValueofContract ==
        undefined
    ) {
      this.income30101.controls[index].patchValue({
        OriginalValueofContract: "0.00",
      });
    } else {
      if (
        this.income30101.controls[
          index
        ].value.OriginalValueofContract.toString().indexOf(".") > -1
      ) {
        this.income30101.controls[index].patchValue({
          OriginalValueofContract: this.income30101.controls[
            index
          ].value.OriginalValueofContract.slice(
            0,
            this.income30101.controls[
              index
            ].value.OriginalValueofContract.indexOf(".") + 3
          ),
        });
      }
      this.income30101.controls[index].patchValue({
        OriginalValueofContract: (+this.income30101.controls[index].value
          .OriginalValueofContract).toFixed(2),
      });
    }
    if (
      this.income30101.controls[index].value.Adjustmenttocontract == "" ||
      this.income30101.controls[index].value.Adjustmenttocontract == undefined
    ) {
      this.income30101.controls[index].patchValue({
        Adjustmenttocontract: "0.00",
      });
    } else {
      if (
        this.income30101.controls[
          index
        ].value.Adjustmenttocontract.toString().indexOf(".") > -1
      ) {
        this.income30101.controls[index].patchValue({
          Adjustmenttocontract: this.income30101.controls[
            index
          ].value.Adjustmenttocontract.slice(
            0,
            this.income30101.controls[index].value.Adjustmenttocontract.indexOf(
              "."
            ) + 3
          ),
        });
      }
      this.income30101.controls[index].patchValue({
        Adjustmenttocontract: (+this.income30101.controls[index].value
          .Adjustmenttocontract).toFixed(2),
      });
    }
    if (
      this.income30101.controls[index].value.valueofWorkPreviousYr == "" ||
      this.income30101.controls[index].value.valueofWorkPreviousYr == undefined
    ) {
      this.income30101.controls[index].patchValue({
        valueofWorkPreviousYr: "0.00",
      });
    } else {
      if (
        this.income30101.controls[index].value.valueofWorkPreviousYr
          .toString()
          .indexOf(".") > -1
      ) {
        this.income30101.controls[index].patchValue({
          valueofWorkPreviousYr: this.income30101.controls[
            index
          ].value.valueofWorkPreviousYr.slice(
            0,
            this.income30101.controls[
              index
            ].value.valueofWorkPreviousYr.indexOf(".") + 3
          ),
        });
      }
      this.income30101.controls[index].patchValue({
        valueofWorkPreviousYr: (+this.income30101.controls[index].value
          .valueofWorkPreviousYr).toFixed(2),
      });
    }
    if (
      this.income30101.controls[index].value.valueofWorkCurrentYr == "" ||
      this.income30101.controls[index].value.valueofWorkCurrentYr == undefined
    ) {
      this.income30101.controls[index].patchValue({
        valueofWorkCurrentYr: "0.00",
      });
    } else {
      if (
        this.income30101.controls[index].value.valueofWorkCurrentYr
          .toString()
          .indexOf(".") > -1
      ) {
        this.income30101.controls[index].patchValue({
          valueofWorkCurrentYr: this.income30101.controls[
            index
          ].value.valueofWorkCurrentYr.slice(
            0,
            this.income30101.controls[index].value.valueofWorkCurrentYr.indexOf(
              "."
            ) + 3
          ),
        });
      }
      this.income30101.controls[index].patchValue({
        valueofWorkCurrentYr: (+this.income30101.controls[index].value
          .valueofWorkCurrentYr).toFixed(2),
      });
    }
    let c5 = parseFloat(
      this.income30101.controls[index].value.OriginalValueofContract
    );
    let c6 = parseFloat(
      this.income30101.controls[index].value.Adjustmenttocontract
    );
    let c7 = parseFloat(
      this.income30101.controls[index].value.valueofWorkPreviousYr
    );
    let c8 = parseFloat(
      this.income30101.controls[index].value.valueofWorkCurrentYr
    );
    this.remaingAmount = 0;
    this.remaingAmount = c5 + c6 - c7 - c8;
    console.log(" this.remaingAmount", this.remaingAmount);
    this.OriginalValueContractAmount = "0.00";
    this.AdjustmentAmount = "0.00";
    this.PreviousYearAmount = "0.00";
    this.CurrentYearAmount = "0.00";
    this.RemainingAmount = "0.00";
    this.income30101.controls[index].patchValue({
      ValueofRemainingwork: (+this.remaingAmount).toFixed(2) || "0.00",
    });
    for (let i = 0; i < this.income30101.controls.length; i++) {
      this.OriginalValueContractAmount = (
        parseFloat(this.OriginalValueContractAmount) +
        parseFloat(this.income30101.controls[i].value.OriginalValueofContract)
      ).toFixed(2);
      this.AdjustmentAmount = (
        parseFloat(this.AdjustmentAmount) +
        parseFloat(this.income30101.controls[i].value.Adjustmenttocontract)
      ).toFixed(2);
      this.PreviousYearAmount = (
        parseFloat(this.PreviousYearAmount) +
        parseFloat(this.income30101.controls[i].value.valueofWorkPreviousYr)
      ).toFixed(2);
      this.CurrentYearAmount = (
        parseFloat(this.CurrentYearAmount) +
        parseFloat(this.income30101.controls[i].value.valueofWorkCurrentYr)
      ).toFixed(2);
      this.RemainingAmount = (
        parseFloat(this.RemainingAmount) +
        parseFloat(this.income30101.controls[i].value.ValueofRemainingwork)
      ).toFixed(2);
    }

    this.income30101Form.patchValue({
      OriginalValueofContract: parseFloat(
        this.OriginalValueContractAmount.toString()
      ).toFixed(2),
    });
    this.income30101Form.patchValue({
      Adjustmenttocontract: parseFloat(
        this.AdjustmentAmount.toString()
      ).toFixed(2),
    });
    this.income30101Form.patchValue({
      valueofWorkPreviousYr: parseFloat(
        this.PreviousYearAmount.toString()
      ).toFixed(2),
    });
    this.income30101Form.patchValue({
      valueofWorkCurrentYr: parseFloat(
        this.CurrentYearAmount.toString()
      ).toFixed(2),
    });
    this.income30101Form.patchValue({
      ValueofRemainingwork: parseFloat(this.RemainingAmount.toString()).toFixed(
        2
      ),
    });
    //this.income30101.controls[index].patchValue({ "ValueofRemainingwork": (+ this.RemainingAmount).toFixed(2) || "0.00" });
  }
  TotalotheIncomeCalculation() {
    //this.basicDetailsObj.ARevOthAct = "0.00";
    this.totalincome2 = 0;
    for (let i = 0; i < this.income30102.controls.length; i++) {
      if (
        this.income30102.controls[i].value.Amount == "" ||
        this.income30102.controls[i].value.Amount == null ||
        this.income30102.controls[i].value.Amount == undefined ||
        this.income30102.controls[i].value.Amount == "undefined"
      ) {
        this.income30102.controls[i].patchValue({ Amount: "0.00" });
      } else {
        if (
          this.income30102.controls[i].value.Amount.toString().indexOf(".") > -1
        ) {
          this.income30102.controls[i].patchValue({
            Amount: this.income30102.controls[i].value.Amount.slice(
              0,
              this.income30102.controls[i].value.Amount.indexOf(".") + 3
            ),
          });
        }
        this.income30102.controls[i].patchValue({
          Amount: (+this.income30102.controls[i].value.Amount).toFixed(2),
        });
      }
      this.totalincome2 =
        this.totalincome2 +
        parseFloat(this.income30102.controls[i].value.Amount);
    }
    //this.basicDetailsObj.ARevOthAct = this.totalincome2.toFixed(2);
  }
  TotalDirectExpensesCalculation() {
    //this.basicDetailsObj.ADirectExp = "0.00";
    this.totalincome3 = 0;
    for (let i = 0; i < this.income30203.controls.length; i++) {
      if (
        this.income30203.controls[i].value.Amount == "" ||
        this.income30203.controls[i].value.Amount == null ||
        this.income30203.controls[i].value.Amount == undefined ||
        this.income30203.controls[i].value.Amount == "undefined"
      ) {
        this.income30203.controls[i].patchValue({ Amount: "0.00" });
      } else {
        if (
          this.income30203.controls[i].value.Amount.toString().indexOf(".") > -1
        ) {
          this.income30203.controls[i].patchValue({
            Amount: this.income30203.controls[i].value.Amount.slice(
              0,
              this.income30203.controls[i].value.Amount.indexOf(".") + 3
            ),
          });
        }
        this.income30203.controls[i].patchValue({
          Amount: (+this.income30203.controls[i].value.Amount).toFixed(2),
        });
      }
      this.totalincome3 =
        this.totalincome3 +
        parseFloat(this.income30203.controls[i].value.Amount);
    }
    //this.basicDetailsObj.ADirectExp = this.totalincome3.toFixed(2);
  }
  TotalotherExpensesCalculation() {
    //this.basicDetailsObj.AOtherExp = "0.00";
    this.totalincome4 = 0;
    for (let i = 0; i < this.income30299.controls.length; i++) {
      if (
        this.income30299.controls[i].value.Amount == "" ||
        this.income30299.controls[i].value.Amount == null ||
        this.income30299.controls[i].value.Amount == undefined ||
        this.income30299.controls[i].value.Amount == "undefined"
      ) {
        this.income30299.controls[i].patchValue({ Amount: "0.00" });
      } else {
        if (
          this.income30299.controls[i].value.Amount.toString().indexOf(".") > -1
        ) {
          this.income30299.controls[i].patchValue({
            Amount: this.income30299.controls[i].value.Amount.slice(
              0,
              this.income30299.controls[i].value.Amount.indexOf(".") + 3
            ),
          });
        }
        this.income30299.controls[i].patchValue({
          Amount: (+this.income30299.controls[i].value.Amount).toFixed(2),
        });
      }
      this.totalincome4 =
        this.totalincome4 +
        parseFloat(this.income30299.controls[i].value.Amount);
    }
    //this.basicDetailsObj.AOtherExp = this.totalincome4.toFixed(2);
  }

  Income30101Change(event) {
    if (event.currentTarget.checked == true) {
      this.income30101Form.patchValue({ Schedule: true });
      if (this.income30101.controls.length == 0) {
        this.AddRowIncomeRow1();
      }
      jQuery("#incomeMainActivity").modal("show");
      //this.taxPayerDetails. = "X";
    } else {
      jQuery("#incomeMainActivity").modal("hide");
      this.income30101Form.patchValue({ Schedule: false });
      this.clearFormArray(this.income30101);
      this.AddRowIncomeRow1();
      this.TotalIncomemainActivityCalculation(0);
      this.basicDetailsObj.ARevMainAct = "0.00";
      this.calCoverForm();
      this.basicDetailsObj.AMainActAttach = "2";
      this.basicDetailsObj.ARevMainAct = "0.00";
      this.SaveIncomefromMainActivity();
    }
  }
  Income30102Change(event) {
    if (event.currentTarget.checked == true) {
      this.income30102Form.patchValue({ Schedule: true });
      if (this.income30102.controls.length == 0) {
        this.AddRowTotalIncomeRow2();
      }
      jQuery("#total-other-income").modal("show");
    } else {
      jQuery("#total-other-income").modal("hide");
      this.income30102Form.patchValue({ Schedule: false });
      this.clearFormArray(this.income30102);
      this.AddRowTotalIncomeRow2();
      this.TotalotheIncomeCalculation();
      this.basicDetailsObj.ARevOthAct = "0.00";
      this.TotalotheIncomeCalculation();
      this.calCoverForm();
      this.basicDetailsObj.ATotalOtherAttach = "2";
      this.basicDetailsObj.ARevOthAct = "0.00";
      this.SaveIncome30102();
    }
  }
  Income30203FormChange(event) {
    if (event.currentTarget.checked == true) {
      this.income30203Form.patchValue({ Schedule: true });
      if (this.income30203.controls.length == 0) {
        this.AddRowIncomeRow3();
      }
      jQuery("#provisions1").modal("show");
    } else {
      jQuery("#provisions1").modal("hide");
      this.income30203Form.patchValue({ Schedule: false });
      this.clearFormArray(this.income30203);
      this.AddRowIncomeRow3();
      this.TotalDirectExpensesCalculation();
      this.basicDetailsObj.ADirectExp = "0.00";
      this.TotalDirectExpensesCalculation();
      this.basicDetailsObj.ADirectExpAttach = "2";
      this.basicDetailsObj.ADirectExp = "0.00";
      this.calCoverForm();
      this.SaveIncome30203();
    }
  }
  Income30299FormChange(event) {
    if (event.currentTarget.checked == true) {
      this.income30299Form.patchValue({ Schedule: true });
      if (this.income30299.controls.length == 0) {
        this.AddRowIncomeRow4();
      }
      jQuery("#provisions2").modal("show");
    } else {
      jQuery("#provisions2").modal("hide");
      this.income30299Form.patchValue({ Schedule: false });
      this.clearFormArray(this.income30299);
      this.AddRowIncomeRow4();
      this.TotalotherExpensesCalculation();
      this.basicDetailsObj.AOtherExp = "0.00";
      this.TotalotherExpensesCalculation();
      this.calCoverForm();
      this.basicDetailsObj.AOtherExpAttach = "2";
      this.basicDetailsObj.AOtherExp = "0.00";
      this.SaveIncome30299();
    }
  }
  SaveIncomefromMainActivity() {
    this.basicDetailsObj.ARevMainAct = this.CurrentYearAmount;
    let FormGuid = this.basicDetailsObj.Sch0_101Set["results"][0]["FormGuid"];
    this.basicDetailsObj.Sch0_101Set["results"] = [];
    for (let i = 0; i < this.income30101.controls.length; i++) {
      console.log("cdate", this.income30101.controls[i].value.ContractDate);
      this.basicDetailsObj.Sch0_101Set["results"].push({});
      this.basicDetailsObj.Sch0_101Set["results"][i]["LineNo"] = i + 1;
      this.basicDetailsObj.Sch0_101Set["results"][i]["FormGuid"] = FormGuid;
      this.basicDetailsObj.Sch0_101Set["results"][i]["RankingOrder"] = "99";
      this.basicDetailsObj.Sch0_101Set["results"][i][
        "CParty"
      ] = this.income30101.controls[i].value.ContractingParty;
      this.basicDetailsObj.Sch0_101Set["results"][i][
        "CSubject"
      ] = this.income30101.controls[i].value.ContractingSubject;
      this.basicDetailsObj.Sch0_101Set["results"][i]["ContractDt"] = this
        .income30101.controls[i].value.ContractDate
        ? "/Date(" +
            new Date(
              this.income30101.controls[i].value.ContractDate
            ).getTime() +
            ")/" || null
        : null;
      this.basicDetailsObj.Sch0_101Set["results"][i]["CDuration"] = this
        .income30101.controls[i].value.ContractDuration
        ? this.income30101.controls[i].value.ContractDuration
        : "0";
      this.basicDetailsObj.Sch0_101Set["results"][i][
        "COrgVal"
      ] = this.income30101.controls[i].value.OriginalValueofContract;
      this.basicDetailsObj.Sch0_101Set["results"][i][
        "CAdjustVal"
      ] = this.income30101.controls[i].value.Adjustmenttocontract;
      this.basicDetailsObj.Sch0_101Set["results"][i][
        "PrevWorkVal"
      ] = this.income30101.controls[i].value.valueofWorkPreviousYr;
      this.basicDetailsObj.Sch0_101Set["results"][i][
        "CurWorkVal"
      ] = this.income30101.controls[i].value.valueofWorkCurrentYr;
      this.basicDetailsObj.Sch0_101Set["results"][i][
        "RemWorkVal"
      ] = this.income30101.controls[i].value.ValueofRemainingwork;
    }
    this.income30101Form.patchValue({ Schedule: true });
    this.basicDetailsObj.AMainActAttach = "1";
    jQuery("#incomeMainActivity").modal("hide");
    this.calCoverForm();
    this.clsePopup();
  }
  SaveIncome30102() {
    this.basicDetailsObj.ARevOthAct = this.totalincome2.toFixed(2);
    let FormGuid = this.basicDetailsObj.Sch1_102Set["results"][0]["FormGuid"];
    this.basicDetailsObj.Sch1_102Set["results"] = [];
    for (let i = 0; i < this.income30102.controls.length; i++) {
      this.basicDetailsObj.Sch1_102Set["results"].push({});
      this.basicDetailsObj.Sch1_102Set["results"][i]["LineNo"] = i + 1;
      this.basicDetailsObj.Sch1_102Set["results"][i]["FormGuid"] = FormGuid;
      this.basicDetailsObj.Sch1_102Set["results"][i]["RankingOrder"] = "99";
      this.basicDetailsObj.Sch1_102Set["results"][i][
        "Description"
      ] = this.income30102.controls[i].value.Description;
      this.basicDetailsObj.Sch1_102Set["results"][i][
        "Amount"
      ] = this.income30102.controls[i].value.Amount;
    }
    this.income30102Form.patchValue({ Schedule: true });
    this.basicDetailsObj.ATotalOtherAttach = "1";
    jQuery("#total-other-income").modal("hide");
    this.calCoverForm();
    this.clsePopup();
  }
  SaveIncome30203() {
    this.basicDetailsObj.ADirectExp = this.totalincome3.toFixed(2);
    let FormGuid = this.basicDetailsObj.Sch1_203Set["results"][0]["FormGuid"];
    this.basicDetailsObj.Sch1_203Set["results"] = [];
    for (let i = 0; i < this.income30203.controls.length; i++) {
      this.basicDetailsObj.Sch1_203Set["results"].push({});
      this.basicDetailsObj.Sch1_203Set["results"][i]["LineNo"] = i + 1;
      this.basicDetailsObj.Sch1_203Set["results"][i]["FormGuid"] = FormGuid;
      this.basicDetailsObj.Sch1_203Set["results"][i]["RankingOrder"] = "99";
      this.basicDetailsObj.Sch1_203Set["results"][i][
        "Description"
      ] = this.income30203.controls[i].value.Description;
      this.basicDetailsObj.Sch1_203Set["results"][i][
        "Amount"
      ] = this.income30203.controls[i].value.Amount;
    }
    this.income30203Form.patchValue({ Schedule: true });
    this.basicDetailsObj.ADirectExpAttach = "1";
    jQuery("#provisions1").modal("hide");
    this.calCoverForm();
    this.clsePopup();
  }
  SaveIncome30299() {
    this.basicDetailsObj.AOtherExp = this.totalincome4.toFixed(2);
    let formGuid = this.basicDetailsObj.Sch1_299Set["results"][0]["FormGuid"];
    this.basicDetailsObj.Sch1_299Set["results"] = [];
    for (let i = 0; i < this.income30299.controls.length; i++) {
      this.basicDetailsObj.Sch1_299Set["results"].push({});
      this.basicDetailsObj.Sch1_299Set["results"][i]["FormGuid"] = formGuid;
      this.basicDetailsObj.Sch1_299Set["results"][i]["RankingOrder"] = "99";
      this.basicDetailsObj.Sch1_299Set["results"][i]["LineNo"] = i + 1;
      this.basicDetailsObj.Sch1_299Set["results"][i][
        "Description"
      ] = this.income30299.controls[i].value.Description;
      this.basicDetailsObj.Sch1_299Set["results"][i][
        "Amount"
      ] = this.income30299.controls[i].value.Amount;
    }
    this.income30299Form.patchValue({ Schedule: true });
    this.basicDetailsObj.AOtherExpAttach = "1";
    jQuery("#provisions2").modal("hide");
    this.calCoverForm();
    this.clsePopup();
  }

  calCoverForm() {
    // this.TotalIncome30100 =
    if (
      this.basicDetailsObj.ARevMainAct == "" ||
      this.basicDetailsObj.ARevMainAct == undefined
    ) {
      this.basicDetailsObj.ARevMainAct = "0.00";
    } else {
      if (this.basicDetailsObj.ARevMainAct.toString().indexOf(".") > -1) {
        this.basicDetailsObj.ARevMainAct = this.basicDetailsObj.ARevMainAct.slice(
          0,
          this.basicDetailsObj.ARevMainAct.indexOf(".") + 3
        );
      }
      this.basicDetailsObj.ARevMainAct = (+this.basicDetailsObj
        .ARevMainAct).toFixed(2);
    }
    if (
      this.basicDetailsObj.ARevOthAct == "" ||
      this.basicDetailsObj.ARevOthAct == undefined
    ) {
      this.basicDetailsObj.ARevOthAct = "0.00";
    } else {
      if (this.basicDetailsObj.ARevOthAct.toString().indexOf(".") > -1) {
        this.basicDetailsObj.ARevOthAct = this.basicDetailsObj.ARevOthAct.slice(
          0,
          this.basicDetailsObj.ARevOthAct.indexOf(".") + 3
        );
      }
      this.basicDetailsObj.ARevOthAct = (+this.basicDetailsObj
        .ARevOthAct).toFixed(2);
    }
    if (
      this.basicDetailsObj.AConsumption == "" ||
      this.basicDetailsObj.AConsumption == undefined
    ) {
      this.basicDetailsObj.AConsumption = "0.00";
    } else {
      if (this.basicDetailsObj.AConsumption.toString().indexOf(".") > -1) {
        this.basicDetailsObj.AConsumption = this.basicDetailsObj.AConsumption.slice(
          0,
          this.basicDetailsObj.AConsumption.indexOf(".") + 3
        );
      }
      this.basicDetailsObj.AConsumption = (+this.basicDetailsObj
        .AConsumption).toFixed(2);
    }
    if (
      this.basicDetailsObj.ASalary == "" ||
      this.basicDetailsObj.ASalary == undefined
    ) {
      this.basicDetailsObj.ASalary = "0.00";
    } else {
      if (this.basicDetailsObj.ASalary.toString().indexOf(".") > -1) {
        this.basicDetailsObj.ASalary = this.basicDetailsObj.ASalary.slice(
          0,
          this.basicDetailsObj.ASalary.indexOf(".") + 3
        );
      }
      this.basicDetailsObj.ASalary = (+this.basicDetailsObj.ASalary).toFixed(2);
    }
    this.basicDetailsObj.ARevTotal = (
      parseFloat(this.basicDetailsObj.ARevMainAct) +
      parseFloat(this.basicDetailsObj.ARevOthAct)
    ).toFixed(2);
    this.basicDetailsObj.AExpense = (
      parseFloat(this.basicDetailsObj.ASalary) +
      parseFloat(this.basicDetailsObj.AConsumption) +
      parseFloat(this.basicDetailsObj.ADirectExp) +
      parseFloat(this.basicDetailsObj.AOtherExp)
    ).toFixed(2);
    this.basicDetailsObj.ANetProfitLossRatio = (
      parseFloat(this.basicDetailsObj.ARevTotal) -
      parseFloat(this.basicDetailsObj.AExpense)
    ).toFixed(2);
  }
  declareClick: boolean = false;

  declareChange(event) {
    if (event.target.checked) {
      this.declareClick = true;
    } else {
      this.declareClick = false;
    }
  }
  submitObj: any = [];
  sadadDetails: any = [];
  downloadInvoiceObj: any = [];
  onRefresh() {
    if (this.sadadDetails.length == 0) {
      this.generateSadadNumber(this.basicDetailsObj.Fbnum);
    }
  }
  generateSadadNumber(fbnum) {
    this.returnsService.generateSadadNumber(fbnum).subscribe((data) => {
      this.sadadDetails.Sopbel = data["d"]["results"][0]["Sopbel"];
      console.log("sadadDetails.Sopbel", this.sadadDetails.Sopbel);
    });
  }

  DownloadAck() {
    this.returnsService
      .DownloadInvoiceForm3(this.basicDetailsObj.Fbnum)
      .subscribe((data: any) => {
        FileSaver.saveAs(data, "Acknowledgement.pdf");
        console.log("download invoice", data);
        this.downloadInvoiceObj = data;
      });
  }
  homeBack() {
    this.router.navigate(["mains/returns/search"]);
    //mains/returns/zakatcit
  }

  //ended by sowjanya
}
// -l
