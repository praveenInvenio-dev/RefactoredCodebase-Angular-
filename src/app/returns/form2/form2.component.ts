import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ReturnsService } from '../returns.service';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import * as FileSaver from 'file-saver';
import { ThemeService } from 'ng2-charts';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

declare var jQuery: any;
@Component({
  selector: 'app-form2',
  templateUrl: './form2.component.html',
  styleUrls: ['./form2.component.css']
})
export class Form2Component implements OnInit {
  //Added by hema
  step: number = 1;
  AgreeX: boolean = false;
  IncomeFromMainActivityForm: FormGroup;
  ConsultingProfessionalFeesForm: FormGroup;
  OtherIncomeForm: FormGroup;
  DirectExpenseForm: FormGroup;
  taxPayerDetails: any;
  Euser: any;
  FbGuid: any;
  periodStartDate: any;
  periodEndDate: any;
  IDTypes: any[] = [];
  NoOfAddedForms: number = 1;
  //Ended by hema
  //Added by saraswathi
  ReservesAndProvisonsForm: FormGroup;
  Others20299Form: FormGroup;
  SubContractorsForm: FormGroup;

  //Ended by saraswathi
  //purna start 22-12
  DAP1Form: FormGroup;
  DAP2Form: FormGroup;
  DAP3Form: FormGroup;
  DAP4Form: FormGroup;
  totalD1: any = "0.00";
  totalD2: any = "0.00";
  totalD3: any = "0.00";
  totalD4: any = "0.00";
  //purna end 22-12

  //Added by Phani
  Others20499Form: FormGroup;
  Others20699Form: FormGroup;
  totalA1: number = 0;
  totalA2: number = 0;
  DepreciationIsApplicable: boolean = false;
  Accrual:any="";
  Cash: any = "";
  AmendedCash: any = "";
  WeightedMethod: boolean = false;
  MarketMethod: boolean = false;
  ArabicBooks: boolean = false;
  ErrorMsg:boolean=false;
  Sch_20401: any = [];
  Sch_20401Temp = {
    AAdditionalCost: "0.00",
    AAmtBookDepr: "0.00",
    AAmtTaxDepr: "0.00",
    ACompensationAsset: "0.00",
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
    ATot4excess: "0.00",
    ATot50comp: "0.00",
    ATot50cost: "0.00",
    ATotAssetAmount: "0.00",
    ATotCostcurrYr: "0.00",
    ATotCostprevYr: "0.00",
    ATotDeprAmt: "0.00",
    ATotGrbal: "0.00",
    ATotRatio: "000",
    ATotRestval: "0.00",
    ATotRestvalCurr1: "0.00",
    ATotRestvalCurr2: "0.00",
    ATotTcompCurr: "0.00",
    ATotTcompPrev: "0.00",
    CoverFld: "",
    FormGuid: "C4346B23F48E1EE5B3E4F7493F1D1E0B",
    LegacyDocNo: "",
    SeqNo: "000001",
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
  //Ended by Phani
  
  readOnlyMode:boolean=true;
  Betrh:any;
  notApplicableAction:string="";
  url:any;

  constructor(private fb: FormBuilder, private retService: ReturnsService, private activatedRoute: ActivatedRoute,public sanitizer: DomSanitizer) {
    
    //Added by hema
    //Ended by hema
    //Added by saraswathi    
    //Ended by saraswathi
    //purna start 22-12
    this.DAP1Form = this.fb.group({
      "Schedule": [false],
      "DAP1": this.fb.array([]),
      "Totals": [0.00]
    });
    this.DAP2Form = this.fb.group({
      "Schedule": [false],
      "DAP2": this.fb.array([]),
      "Totals": [0.00]
    });
    this.DAP3Form = this.fb.group({
      "Schedule": [false],
      "DAP3": this.fb.array([]),
      "Totals": [0.00]
    });
    this.DAP4Form = this.fb.group({
      "Schedule": [false],
      "DAP4": this.fb.array([]),
      "Totals": [0.00]
    });
    //purna end 22-12
  }

  ngOnInit(): void {

    //Added by hema
    this.activatedRoute.params.subscribe((params) => {
      console.log("params", params);
      this.FbGuid = params["fbGuid"] || "";
      this.Euser = params["euser"] || "";
      if (this.FbGuid && this.Euser) {
        this.GetForm2Details();
      }
    });
    this.IncomeFromMainActivityForm = this.fb.group({
      'Schedule': [false],
      'Total': [0.00],
      'Incomes': this.fb.array([]),
      'TotalOriginalValueOfContract': [0.00],
      'TotalAdjustmentToTheContract': [0.00],
      'TotalValueOfPreviousYears': [0.00],
      'TotalValueOfCurrentYear': [0.00],
      'TotalValueOfRemainingWork': [0.00]
    });
    this.ConsultingProfessionalFeesForm = this.fb.group({
      'Schedule': [false],
      'Total': [0.00],
      'ProfessionalFeesSet': this.fb.array([])
    });
    this.OtherIncomeForm = this.fb.group({
      "Schedule": [false],
      "otherIncomesSet": this.fb.array([]),
      "Totals": [0.00]
    });
    this.DirectExpenseForm = this.fb.group({
      "Schedule": [false],
      "directExpenseSet": this.fb.array([]),
      "Totals": [0.00]
    });
    //Ended by hema
    //Added by saraswathi
    this.ReservesAndProvisonsForm = this.fb.group({
      'Schedule': [false],
      'ReservesProvisionsSet': this.fb.array([]),
      'TotalBalanceatthebeginningoftheyear': [0.00],
      'TotalFormDuringtheyear': [0.00],
      'TotalUsedDuringtheyear': [0.00],
      'TotalBalance': [0.00]
    });
    this.Others20299Form = this.fb.group({
      'Schedule': [false],
      'Total': [0.00],
      'Others20299Set': this.fb.array([])
      // 'TotalAmount':[0.00]     	
    });
    this.SubContractorsForm = this.fb.group({
      "Schedule": [false],
      "SubContractorSet": this.fb.array([]),
      "Total": [0.00]
    });
    //Ended by saraswathi

    //Added by Phani
    this.Others20499Form = this.fb.group({
      'Schedule': [false],
      'Others20499Set': this.fb.array([]),
      'Total': [0.00]
    });
    this.Others20699Form = this.fb.group({
      'Schedule': [false],
      'Others20699Set': this.fb.array([]),
      'Total': [0.00]
    });
    //Ended by Phani
  }

  //Added by hema
  AddIncome() {
    return this.fb.group({
      "ContractingParty": [null, Validators.required],
      "ContractingSubject": [null, Validators.required],
      "ContractDate": [null, Validators.required],
      "ContractDuration": [0],
      "OriginalValueOfContract": [0.00, [Validators.required, Validators.min(0),Validators.max(99999999999999.99)]],
      "AdjustmentToTheContract": [0.00, [Validators.required, Validators.min(0)]],
      "ValueOfPreviousYears": [0.00, [Validators.required, Validators.min(0)]],
      "ValueOfCurrentYear": [0.00, [Validators.required, Validators.min(0)]],
      "ValueOfRemainingWork": [0.00]
    });
  }
  AddProfessionalFee() {
    return this.fb.group({
      "IDType": [null, Validators.required],
      "Number": [null, Validators.required],
      "BenName": [null, Validators.required],
      "Address": [null, Validators.required],
      "NatureService": [null, Validators.required],
      "Amount": [0.00, [Validators.required, Validators.min(0)]]
      // "Amount":[0.00]
    });
  }
  AddotherIncomesSet() {
    return this.fb.group({
      "Description": [null, Validators.required],
      "Amount": [0.00, [Validators.required, Validators.min(0),Validators.max(999999999999.99)]]
    });
  }
  AdddirectExpenseSet() {
    return this.fb.group({
      "Description": [null, Validators.required],
      "Amount": [0.00, [Validators.required, Validators.min(0),Validators.max(999999999999.99)]]
    });
  }
  get Incomes(): FormArray {
    return this.IncomeFromMainActivityForm.get('Incomes') as FormArray;
  }
  get ProfessionalFeesSet(): FormArray {
    return this.ConsultingProfessionalFeesForm.get('ProfessionalFeesSet') as FormArray;
  }
  get otherIncomesSet(): FormArray {
    return this.OtherIncomeForm.get('otherIncomesSet') as FormArray;
  }
  get directExpenseSet(): FormArray {
    return this.DirectExpenseForm.get('directExpenseSet') as FormArray;
  }
  DeleteIncome(pi) {
    const control = this.IncomeFromMainActivityForm.get('Incomes') as FormArray;
    control.removeAt(pi);
    this.TotalIncomeCalculation();
  }
  DeleteFee(pi) {
    const control = this.ConsultingProfessionalFeesForm.get('ProfessionalFeesSet') as FormArray;
    control.removeAt(pi);
    this.TotalFeeCalculation();
  }
  DeleteOtherIncome(pi) {
    const control = this.OtherIncomeForm.get('otherIncomesSet') as FormArray;
    control.removeAt(pi);
    this.TotalOtherIncomeCalculation();
  }
  DeleteDirectExpense(pi) {
    const control = this.DirectExpenseForm.get('directExpenseSet') as FormArray;
    control.removeAt(pi);
    this.TotalDirectExpenseCalculation();
  }
  AddIncomeRow() {
    let type = this.AddIncome();
    this.Incomes.push(type);
  }
  AddProfessionalFeeRow() {
    let type = this.AddProfessionalFee();
    this.ProfessionalFeesSet.push(type);
  }
  AddOtherIncomeRow() {
    let type = this.AddotherIncomesSet();
    this.otherIncomesSet.push(type);
  }
  AddDirectExpenseRow() {
    let type = this.AdddirectExpenseSet();
    this.directExpenseSet.push(type);
  }
  RemainingValueCalculation(pi) {
    if (this.Incomes.controls[pi].value.OriginalValueOfContract != undefined && this.Incomes.controls[pi].value.AdjustmentToTheContract != undefined && this.Incomes.controls[pi].value.ValueOfPreviousYears != undefined && this.Incomes.controls[pi].value.ValueOfCurrentYear != undefined) {
      this.Incomes.controls[pi].patchValue({ 'ValueOfRemainingWork': parseFloat(((+this.Incomes.controls[pi].value.OriginalValueOfContract) + (+this.Incomes.controls[pi].value.AdjustmentToTheContract) - (+this.Incomes.controls[pi].value.ValueOfPreviousYears) - (+this.Incomes.controls[pi].value.ValueOfCurrentYear)).toString()).toFixed(2) });
    }
    this.TotalIncomeCalculation();
  }
  TotalIncomeCalculation() {
    this.IncomeFromMainActivityForm.value.TotalOriginalValueOfContract = 0.00;
    this.IncomeFromMainActivityForm.value.TotalAdjustmentToTheContract = 0.00;
    this.IncomeFromMainActivityForm.value.TotalValueOfPreviousYears = 0.00;
    this.IncomeFromMainActivityForm.value.TotalValueOfCurrentYear = 0.00;
    this.IncomeFromMainActivityForm.value.TotalValueOfRemainingWork = 0.00;
    let OriginalValueContractAmount = 0.00;
    let AdjustmentAmount = 0.00;
    let PreviousYearAmount = 0.00;
    let CurrentYearAmount = 0.00;
    let RemainingAmount = 0.00
    for (let i = 0; i < this.Incomes.controls.length; i++) {
      OriginalValueContractAmount = OriginalValueContractAmount + (+this.Incomes.controls[i].value.OriginalValueOfContract);
      AdjustmentAmount = AdjustmentAmount + (+this.Incomes.controls[i].value.AdjustmentToTheContract);
      PreviousYearAmount = PreviousYearAmount + (+this.Incomes.controls[i].value.ValueOfPreviousYears);
      CurrentYearAmount = CurrentYearAmount + (+this.Incomes.controls[i].value.ValueOfCurrentYear);
      RemainingAmount = RemainingAmount + (+this.Incomes.controls[i].value.ValueOfRemainingWork);
    }
    this.IncomeFromMainActivityForm.patchValue({ 'TotalOriginalValueOfContract': parseFloat(OriginalValueContractAmount.toString()).toFixed(2) });
    this.IncomeFromMainActivityForm.patchValue({ 'TotalAdjustmentToTheContract': parseFloat(AdjustmentAmount.toString()).toFixed(2) });
    this.IncomeFromMainActivityForm.patchValue({ 'TotalValueOfPreviousYears': parseFloat(PreviousYearAmount.toString()).toFixed(2) });
    this.IncomeFromMainActivityForm.patchValue({ 'TotalValueOfCurrentYear': parseFloat(CurrentYearAmount.toString()).toFixed(2) });
    this.IncomeFromMainActivityForm.patchValue({ 'TotalValueOfRemainingWork': parseFloat(RemainingAmount.toString()).toFixed(2) });
  }
  TotalFeeCalculation() {
    this.ConsultingProfessionalFeesForm.value.Total = 0.00;
    let amount = 0;
    for (let i = 0; i < this.ProfessionalFeesSet.controls.length; i++) {
      amount = amount + (+this.ProfessionalFeesSet.controls[i].value.Amount);
    }
    this.ConsultingProfessionalFeesForm.patchValue({ 'Total': parseFloat(amount.toString()).toFixed(2) });
  }
  TotalOtherIncomeCalculation() {
    this.OtherIncomeForm.value.Totals = 0.00;
    let amount = 0;
    for (let i = 0; i < this.otherIncomesSet.controls.length; i++) {
      amount = amount + (+this.otherIncomesSet.controls[i].value.Amount);
    }
    this.OtherIncomeForm.patchValue({ 'Totals': parseFloat(amount.toString()).toFixed(2) });
    this.taxPayerDetails.ARevOthAct=parseFloat(this.OtherIncomeForm.value.Totals.toString()).toFixed(2);    
  }
  TotalDirectExpenseCalculation() {
    this.DirectExpenseForm.value.Totals = 0.00;
    let amount = 0;
    for (let i = 0; i < this.directExpenseSet.controls.length; i++) {
      amount = amount + (+this.directExpenseSet.controls[i].value.Amount);
    }
    this.DirectExpenseForm.patchValue({ 'Totals': parseFloat(amount.toString()).toFixed(2) });
  }
  GetForm2Details() {
    this.readOnlyMode=false;
    this.retService.GetForm2Details(this.Euser, this.FbGuid).subscribe((data: any) => {
      console.log("hi", data);
      this.taxPayerDetails = data["d"];
      this.AgreeX = (this.taxPayerDetails.AAgree == "") ? false:true;
      moment.locale('en-US');
      this.periodStartDate = moment(new Date(+(((this.taxPayerDetails.AFrom.replace(')', '')).toString().replace('/Date(', '')).toString().replace('/', '')))).format('DD/MM/YYYY');
      this.periodEndDate = moment(new Date(+(((this.taxPayerDetails.ATo.replace(')', '')).toString().replace('/Date(', '')).toString().replace('/', '')))).format('DD/MM/YYYY');
      this.GetIdTypes();
      console.log("date",((this.taxPayerDetails.ARevOthActChk=="1") || ((this.taxPayerDetails.InChannel=="300") && ((+this.taxPayerDetails.ARevOthAct)>0))))
      this.IncomeFromMainActivityForm.patchValue({'Schedule':(this.taxPayerDetails.ARevMainActChk=="1" || (this.taxPayerDetails.InChannel=="300" && (+this.taxPayerDetails.ARevMainAct)>0))?true:false});
      this.OtherIncomeForm.patchValue({'Schedule':((this.taxPayerDetails.ARevOthActChk=="1") || ((this.taxPayerDetails.InChannel=="300") && ((+this.taxPayerDetails.ARevOthAct)>0)))?true:false});
      this.DirectExpenseForm.patchValue({'Schedule':(this.taxPayerDetails.ADirectExpChk=="1" || (this.taxPayerDetails.InChannel=="300" && (+this.taxPayerDetails.ADirectExp)>0))?true:false});
      this.SubContractorsForm.patchValue({'Schedule':(this.taxPayerDetails.ASubcontractorsChk=="1" || (this.taxPayerDetails.InChannel=="300" && (+this.taxPayerDetails.ASubcontractors)>0))?true:false});
      this.ConsultingProfessionalFeesForm.patchValue({'Schedule':(this.taxPayerDetails.AFeesChk=="1" || (this.taxPayerDetails.InChannel=="300" && (+this.taxPayerDetails.AFees)>0))?true:false});
      this.ReservesAndProvisonsForm.patchValue({'Schedule':(this.taxPayerDetails.AProvResChk=="1" || (this.taxPayerDetails.InChannel=="300" && (+this.taxPayerDetails.AProvRes)>0))?true:false});
      this.Others20299Form.patchValue({'Schedule':(this.taxPayerDetails.AOtherExpChk=="1" || (this.taxPayerDetails.InChannel=="300" && (+this.taxPayerDetails.AOtherExp)>0))?true:false});
      this.DepreciationIsApplicable=(this.taxPayerDetails.AConsumptionChk=="1" || (this.taxPayerDetails.InChannel=="300" && (+this.taxPayerDetails.ADiffConsumption)>0))?true:false;
      this.Others20499Form.patchValue({'Schedule':(this.taxPayerDetails.AOtherAdjustChk=="1" || (this.taxPayerDetails.InChannel=="300" && (+this.taxPayerDetails.AOtherAdjust)>0))?true:false});
      this.Others20699Form.patchValue({'Schedule':(this.taxPayerDetails.AOtherContainerChk=="1" || (this.taxPayerDetails.InChannel=="300" && (+this.taxPayerDetails.AOtherContainer)>0))?true:false});
      this.DAP1Form.patchValue({'Schedule':(this.taxPayerDetails.ANetFixAssetChk=="1" || (this.taxPayerDetails.InChannel=="300" && (+this.taxPayerDetails.ANetFixAsset)>0))?true:false});
      this.DAP2Form.patchValue({'Schedule':(this.taxPayerDetails.AInvestmentChk=="1" || (this.taxPayerDetails.InChannel=="300" && (+this.taxPayerDetails.AInvestment)>0))?true:false});
      this.DAP3Form.patchValue({'Schedule':(this.taxPayerDetails.AEstExpenseChk=="1" || (this.taxPayerDetails.InChannel=="300" && (+this.taxPayerDetails.AEstExpense)>0))?true:false});
      this.DAP4Form.patchValue({'Schedule':(this.taxPayerDetails.AOtherInvstChk=="1" || (this.taxPayerDetails.InChannel=="300" && (+this.taxPayerDetails.AOtherInvst)>0))?true:false});
      
      this.Accrual=this.taxPayerDetails.Baccrual=="true"?"Accrual":"";
      this.Cash=this.taxPayerDetails.Bcash=="true"?"Cash":"";
      this.AmendedCash=this.taxPayerDetails.Bamcash=="true"?"Amended Cash":"";
      this.WeightedMethod=this.taxPayerDetails.Bweighavg=="true"?true:false;
      this.MarketMethod=this.taxPayerDetails.Bmarkval=="true"?true:false;
      this.ArabicBooks=this.taxPayerDetails.Bbooks=="true"?true:false;
      //purna start 22-12
      //this.taxPayerDetails. == "X" ? this.DAP1Form.patchValue({ "Schedule": true }) : this.zcD4Form.patchValue({ "Schedule": false });

      this.clearFormArray(this.DAP1);
      for (let i = 0; i < this.taxPayerDetails.Sch_20701Set["results"].length; i++) {
        this.AddRowD1();
        this.DAP1.controls[i].patchValue({ "Description": this.taxPayerDetails.Sch_20701Set["results"][i]["Description"] });
        this.DAP1.controls[i].patchValue({ "Amount": this.taxPayerDetails.Sch_20701Set["results"][i]["Amount"] });
      }
      this.clearFormArray(this.DAP2);
      for (let i = 0; i < this.taxPayerDetails.Sch_20702Set["results"].length; i++) {
        this.AddRowD2();
        this.DAP2.controls[i].patchValue({ "Description": this.taxPayerDetails.Sch_20702Set["results"][i]["Description"] });
        this.DAP2.controls[i].patchValue({ "Amount": this.taxPayerDetails.Sch_20702Set["results"][i]["Amount"] });
      }
      this.clearFormArray(this.DAP3);
      for (let i = 0; i < this.taxPayerDetails.Sch_20704Set["results"].length; i++) {
        this.AddRowD3();
        this.DAP3.controls[i].patchValue({ "Description": this.taxPayerDetails.Sch_20704Set["results"][i]["Description"] });
        this.DAP3.controls[i].patchValue({ "Amount": this.taxPayerDetails.Sch_20704Set["results"][i]["Amount"] });
      }
      this.clearFormArray(this.DAP4);
      for (let i = 0; i < this.taxPayerDetails.Sch_20799Set["results"].length; i++) {
        this.AddRowD4();
        this.DAP4.controls[i].patchValue({ "Description": this.taxPayerDetails.Sch_20799Set["results"][i]["Description"] });
        this.DAP4.controls[i].patchValue({ "Amount": this.taxPayerDetails.Sch_20799Set["results"][i]["Amount"] });
      }
      this.calCellTotalD1();
      this.calCellTotalD2();
      this.calCellTotalD3();
      this.calCellTotalD4();
      //purna end 22-12


      //hema starts
      this.clearFormArray(this.Incomes);
      moment.locale('en-Us');
      for (let i = 0; i < this.taxPayerDetails.Sch_20101Set["results"].length; i++) {
       // console.log(moment(new Date(+(((this.taxPayerDetails.Sch_20101Set["results"][i]["ContractDt"].replace(')', '')).toString().replace('/Date(', '')).toString().replace('/', '')))).format('YYYY-MM-DD'));
        this.AddIncomeRow();
        this.Incomes.controls[i].patchValue({ "ContractingParty": this.taxPayerDetails.Sch_20101Set["results"][i]["CParty"] });
        this.Incomes.controls[i].patchValue({ "ContractingSubject": this.taxPayerDetails.Sch_20101Set["results"][i]["CSubject"] });
        this.Incomes.controls[i].patchValue({ "ContractDate": this.taxPayerDetails.Sch_20101Set["results"][i]["ContractDt"] != null ? moment(new Date(+(((this.taxPayerDetails.Sch_20101Set["results"][i]["ContractDt"].replace(')', '')).toString().replace('/Date(', '')).toString().replace('/', '')))).format('YYYY-MM-DD') : moment(new Date()).format('YYYY-MM-DD') });
        this.Incomes.controls[i].patchValue({ "ContractDuration": this.taxPayerDetails.Sch_20101Set["results"][i]["CDuration"] });
        this.Incomes.controls[i].patchValue({ "OriginalValueOfContract": this.taxPayerDetails.Sch_20101Set["results"][i]["COrgVal"] });
        this.Incomes.controls[i].patchValue({ "AdjustmentToTheContract": this.taxPayerDetails.Sch_20101Set["results"][i]["CAdjustVal"] });
        this.Incomes.controls[i].patchValue({ "ValueOfPreviousYears": this.taxPayerDetails.Sch_20101Set["results"][i]["PrevWorkVal"] });
        this.Incomes.controls[i].patchValue({ "ValueOfCurrentYear": this.taxPayerDetails.Sch_20101Set["results"][i]["CurWorkVal"] });
        this.Incomes.controls[i].patchValue({ "ValueOfRemainingWork": this.taxPayerDetails.Sch_20101Set["results"][i]["RemWorkVal"] });
      }
      console.log(this.Incomes);

      this.clearFormArray(this.ProfessionalFeesSet);
      for (let i = 0; i < this.taxPayerDetails.Sch_20208Set["results"].length; i++) {
        this.AddProfessionalFeeRow();
        this.ProfessionalFeesSet.controls[i].patchValue({ "IDType": this.taxPayerDetails.Sch_20208Set["results"][i]["DropDown"] });
        this.ProfessionalFeesSet.controls[i].patchValue({ "Number": this.taxPayerDetails.Sch_20208Set["results"][i]["Crtinfin"] });
        this.ProfessionalFeesSet.controls[i].patchValue({ "BenName": this.taxPayerDetails.Sch_20208Set["results"][i]["BeneficiaryNm"] });
        this.ProfessionalFeesSet.controls[i].patchValue({ "Address": this.taxPayerDetails.Sch_20208Set["results"][i]["Addr"] });
        this.ProfessionalFeesSet.controls[i].patchValue({ "NatureService": this.taxPayerDetails.Sch_20208Set["results"][i]["ServiceTp"] });
        this.ProfessionalFeesSet.controls[i].patchValue({ "Amount": this.taxPayerDetails.Sch_20208Set["results"][i]["Amount"] });
      }
      console.log("get",this.ProfessionalFeesSet.controls);

      this.clearFormArray(this.otherIncomesSet);
      for (let i = 0; i < this.taxPayerDetails.Sch_20102Set["results"].length; i++) {
        this.AddOtherIncomeRow();
        this.otherIncomesSet.controls[i].patchValue({ "Description": this.taxPayerDetails.Sch_20102Set["results"][i]["Description"] });
        this.otherIncomesSet.controls[i].patchValue({ "Amount": this.taxPayerDetails.Sch_20102Set["results"][i]["Amount"] });
      }

      console.log(this.otherIncomesSet);

      this.clearFormArray(this.directExpenseSet);
      for (let i = 0; i < this.taxPayerDetails.Sch_20204Set["results"].length; i++) {
        this.AddDirectExpenseRow();
        this.directExpenseSet.controls[i].patchValue({ "Description": this.taxPayerDetails.Sch_20204Set["results"][i]["Description"] });
        this.directExpenseSet.controls[i].patchValue({ "Amount": this.taxPayerDetails.Sch_20204Set["results"][i]["Amount"] });
      }

      this.TotalIncomeCalculation();
      this.TotalFeeCalculation();
      this.TotalOtherIncomeCalculation();
      this.TotalDirectExpenseCalculation();
      //hema ends

      // Saraswathi Start
      this.clearFormArray(this.Others20299Set);
      for (let i = 0; i < this.taxPayerDetails.Sch_20299Set["results"].length; i++) {
        this.AddOthers20299Row();
        this.Others20299Set.controls[i].patchValue({ "Description": this.taxPayerDetails.Sch_20299Set["results"][i]["Description"] });
        this.Others20299Set.controls[i].patchValue({ "Amount": this.taxPayerDetails.Sch_20299Set["results"][i]["Amount"] });
      }

      this.clearFormArray(this.SubContractorSet);
      for (let i = 0; i < this.taxPayerDetails.Sch_20206Set["results"].length; i++) {
        this.AddSubContractorRow();
        this.SubContractorSet.controls[i].patchValue({ "IDType": this.taxPayerDetails.Sch_20206Set["results"][i]["DropDown"] });
        this.SubContractorSet.controls[i].patchValue({ "Number": this.taxPayerDetails.Sch_20206Set["results"][i]["Crtinfin"] });
        this.SubContractorSet.controls[i].patchValue({ "SubContractorName": this.taxPayerDetails.Sch_20206Set["results"][i]["SubcntrNm"] });
        this.SubContractorSet.controls[i].patchValue({ "Address": this.taxPayerDetails.Sch_20206Set["results"][i]["Addr"] });
        this.SubContractorSet.controls[i].patchValue({ "ValueofContract": this.taxPayerDetails.Sch_20206Set["results"][i]["ContractValue"] });
        this.SubContractorSet.controls[i].patchValue({ "ValueOfWorkExecuted": this.taxPayerDetails.Sch_20206Set["results"][i]["ValWrkYr"] });
      }

      this.clearFormArray(this.ReservesProvisionsSet);
      console.log("this.taxPayerDetails.Sch_20209Set['results']",this.taxPayerDetails.Sch_20209Set["results"])
      for (let i = 0; i < this.taxPayerDetails.Sch_20209Set["results"].length; i++) {
        this.AddReservesRow();
        this.ReservesProvisionsSet.controls[i].patchValue({ "TypesofProvision": this.taxPayerDetails.Sch_20209Set["results"][i]["ProviTp"] });
        this.ReservesProvisionsSet.controls[i].patchValue({ "BalanceattheBeginning": this.taxPayerDetails.Sch_20209Set["results"][i]["BegBal"] });
        this.ReservesProvisionsSet.controls[i].patchValue({ "FormedDuringtheyear": this.taxPayerDetails.Sch_20209Set["results"][i]["FormYr"] });
        this.ReservesProvisionsSet.controls[i].patchValue({ "UsedDuringtheyear": this.taxPayerDetails.Sch_20209Set["results"][i]["UsedYr"] });
        this.ReservesProvisionsSet.controls[i].patchValue({ "Balance": this.taxPayerDetails.Sch_20209Set["results"][i]["Bal"] });
      }

      this.TotalOthers20299Calculation();
      this.TotalSubContractorCalculation();
      this.TotalReservesAndProvisions();
      // Saraswathi End

      //Phani starts
      this.clearFormArray(this.Others20499Set);
      for (let i = 0; i < this.taxPayerDetails.Sch_20499Set["results"].length; i++) {
        this.AddOthers20499();
        this.Others20499Set.controls[i].patchValue({
          "Description": this.taxPayerDetails.Sch_20499Set["results"][i]["Description"],
          "Amount": this.taxPayerDetails.Sch_20499Set["results"][i]["Amount"]
        });
      }
      this.calTotalA1();

      this.clearFormArray(this.Others20699Set);
      for (let i = 0; i < this.taxPayerDetails.Sch_20699Set["results"].length; i++) {
        this.AddOthers20699();
        this.Others20699Set.controls[i].patchValue({
          "Description": this.taxPayerDetails.Sch_20699Set["results"][i]["Description"],
          "Amount": this.taxPayerDetails.Sch_20699Set["results"][i]["Amount"]
        });
      }
      this.calTotalA2();

      this.Sch_20401 = this.taxPayerDetails.Sch_20401;
      //console.log("sch_20401", this.Sch_20401);
      this.calDepreciationA();
      this.calDepreciationB();
      this.calDepreciationC();
      this.calDepreciationD();
      this.calDepreciationE();
      this.calDepreciationF();

      this.calAdjustmentsTab();

      //Phani ends


      this.getZakatCalculatedAmount(this.taxPayerDetails.RegIdz,this.taxPayerDetails.PeriodKeyz,this.taxPayerDetails.AZakat);
     
    });
  }
  GetIdTypes() {
    this.retService.GetIdTypes().subscribe((data: any) => {
      console.log(data);
      this.IDTypes = data['Sch_206'];
      console.log("this.IDTypes", this.IDTypes);
    });
  }
  AddMultipleIncomeForms() {
    for (let i = 0; i < this.NoOfAddedForms; i++) {
      this.AddIncomeRow();
    }
    this.NoOfAddedForms = 0;
    jQuery("#addMultipleFormsModal20101").modal('hide');
    jQuery('body').addClass('modalopen');
  }
  AddMultipleOtherIncomeForms() {
    for (let i = 0; i < this.NoOfAddedForms; i++) {
      this.AddOtherIncomeRow();
    }
    this.NoOfAddedForms = 0;
    jQuery("#addMultipleOtherIncomeFormsModal").modal('hide');
    jQuery('body').addClass('modalopen');
  }

  AddMultipleDirectExpenseForms() {
    for (let i = 0; i < this.NoOfAddedForms; i++) {
      this.AddDirectExpenseRow();
    }
    this.NoOfAddedForms = 0;
    jQuery("#addMultipleDirectExpenseFormsModal").modal('hide');
    jQuery('body').addClass('modalopen');
  }

  AddMultipleProfessionalFeesForms() {
    for (let i = 0; i < this.NoOfAddedForms; i++) {
      this.AddProfessionalFeeRow();
    }
    this.NoOfAddedForms = 0;
    jQuery("#addMultipleProfessionalFeeFormsModal").modal('hide');
    jQuery('body').addClass('modalopen');
  }

  addPopup() {
    jQuery('body').addClass('modalopen');
  }
  clsePopup(){
    this.GetForm2Details();
    jQuery('body').removeClass('modalopen');
  }
  CalculateTotals() {
    this.taxPayerDetails.ARevInventory=parseFloat(((+this.taxPayerDetails.ARevInventory) || 0).toString()).toFixed(2);
    this.taxPayerDetails.ARevTotal = parseFloat(((+this.taxPayerDetails.ARevInventory) + (+this.taxPayerDetails.ARevOthAct) + (+this.taxPayerDetails.ARevMainAct)).toString()).toFixed(2);
    this.taxPayerDetails.AExpTotat = parseFloat(((+this.taxPayerDetails.ABegininv) + (+this.taxPayerDetails.APurchaseAbroad) + (+this.taxPayerDetails.APurchaseInside) + (+this.taxPayerDetails.ADirectExp) + (+this.taxPayerDetails.ASalary) + (+this.taxPayerDetails.ASubcontractors) + (+this.taxPayerDetails.AConsumption) + (+this.taxPayerDetails.AFees) + (+this.taxPayerDetails.AProvRes) + (+this.taxPayerDetails.AOtherExp)).toString()).toFixed(2);
    this.taxPayerDetails.ANetProfit = parseFloat(((+this.taxPayerDetails.ARevTotal) - (+this.taxPayerDetails.AExpTotat)).toString()).toFixed(2);
    console.log(this.taxPayerDetails.ARevInventory);
    this.SaveForm2();
  }

  ValidateForm() {
    this.taxPayerDetails.ABegininv = this.taxPayerDetails.ABegininv == '' ? 0 : this.taxPayerDetails.ABegininv;
    this.taxPayerDetails.ABegininv = parseFloat(this.taxPayerDetails.ABegininv).toFixed(2);
    this.taxPayerDetails.APurchaseAbroad = this.taxPayerDetails.APurchaseAbroad == '' ? 0 : this.taxPayerDetails.APurchaseAbroad;
    this.taxPayerDetails.APurchaseAbroad = parseFloat(this.taxPayerDetails.APurchaseAbroad.toString()).toFixed(2);
    this.taxPayerDetails.APurchaseInside = this.taxPayerDetails.APurchaseInside == '' ? 0 : this.taxPayerDetails.APurchaseInside;
    this.taxPayerDetails.APurchaseInside = parseFloat(this.taxPayerDetails.APurchaseInside).toFixed(2);
    this.taxPayerDetails.ASalary = this.taxPayerDetails.ASalary == '' ? 0 : this.taxPayerDetails.ASalary;
    this.taxPayerDetails.ASalary = parseFloat(this.taxPayerDetails.ASalary).toFixed(2);
    this.taxPayerDetails.AConsumption = this.taxPayerDetails.AConsumption == '' ? 0 : this.taxPayerDetails.AConsumption;
    this.taxPayerDetails.AConsumption = parseFloat(this.taxPayerDetails.AConsumption).toFixed(2);

    console.log("taxPayerDetails123", this.taxPayerDetails)

    this.CalculateTotals();
  }
  //Ended by hema
  //Added by saraswathi
  AddReservesAndPervisions() {
    return this.fb.group({
      "TypesofProvision": [null, Validators.required],
      "BalanceattheBeginning": [0.00, [Validators.required, Validators.min(0)]],
      "FormedDuringtheyear": [0.00, [Validators.required, Validators.min(0)]],
      "UsedDuringtheyear": [0.00, [Validators.required, Validators.min(0)]],
      "Balance": [0.00]

    });
  }
  get ReservesProvisionsSet(): FormArray {
    return this.ReservesAndProvisonsForm.get('ReservesProvisionsSet') as FormArray;
  }

  AddOthers20299() {
    return this.fb.group({
      "Description": [null, Validators.required],
      "Amount": [0.00, [Validators.required, Validators.min(0),Validators.max(99999999999999.99)]]
    });
  }
  get Others20299Set(): FormArray {
    return this.Others20299Form.get('Others20299Set') as FormArray;
  }

  AddReservesRow() {
    let type = this.AddReservesAndPervisions();
    this.ReservesProvisionsSet.push(type);
    console.log("ReservesProvisionsSet123", this.ReservesProvisionsSet)
  }
  AddMultipleReservesForms() {

    for (let i = 0; i < this.NoOfAddedForms; i++) {
      this.AddReservesRow();
    }
    this.NoOfAddedForms = 0;
    jQuery("#addMultipleFormsModal").modal('hide');
    jQuery('body').addClass('modalopen');
  }

  DeleteReservesProvision(pi) {
    const control = this.ReservesAndProvisonsForm.get('ReservesProvisionsSet') as FormArray;
    control.removeAt(pi);
    this.TotalReservesAndProvisions();
  }
  TotalReservesAndProvisionCalulation(pi) {
    if (this.ReservesProvisionsSet.controls[pi].value.BalanceattheBeginning != undefined &&
      this.ReservesProvisionsSet.controls[pi].value.FormedDuringtheyear != undefined &&
      this.ReservesProvisionsSet.controls[pi].value.UsedDuringtheyear != undefined) {
      this.ReservesProvisionsSet.controls[pi].patchValue({
        'Balance':
          parseFloat(((+this.ReservesProvisionsSet.controls[pi].value.BalanceattheBeginning) +
            (+this.ReservesProvisionsSet.controls[pi].value.FormedDuringtheyear) -
            (+this.ReservesProvisionsSet.controls[pi].value.UsedDuringtheyear)).toString()).toFixed(2)
      });
    }
    this.TotalReservesAndProvisions();
  }
  TotalReservesAndProvisions() {
    this.ReservesAndProvisonsForm.value.TotalBalanceatthebeginningoftheyear = 0.00;
    this.ReservesAndProvisonsForm.value.TotalFormDuringtheyear = 0.00;
    this.ReservesAndProvisonsForm.value.TotalUsedDuringtheyear = 0.00;
    this.ReservesAndProvisonsForm.value.TotalBalance = 0.00;
    let BeginningAmount = 0.00;
    let FormedAmount = 0.00;
    let UsedAmount = 0.00;
    let BalanceAmount = 0.00;

    for (let i = 0; i < this.ReservesProvisionsSet.controls.length; i++) {
      BeginningAmount = BeginningAmount + (+this.ReservesProvisionsSet.controls[i].value.BalanceattheBeginning);
      FormedAmount = FormedAmount + (+this.ReservesProvisionsSet.controls[i].value.FormedDuringtheyear);
      UsedAmount = UsedAmount + (+this.ReservesProvisionsSet.controls[i].value.UsedDuringtheyear);
      BalanceAmount = BalanceAmount + (+this.ReservesProvisionsSet.controls[i].value.Balance);

    }
    this.ReservesAndProvisonsForm.patchValue({ 'TotalBalanceatthebeginningoftheyear': parseFloat(BeginningAmount.toString()).toFixed(2) });
    this.ReservesAndProvisonsForm.patchValue({ 'TotalFormDuringtheyear': parseFloat(FormedAmount.toString()).toFixed(2) });
    this.ReservesAndProvisonsForm.patchValue({ 'TotalUsedDuringtheyear': parseFloat(UsedAmount.toString()).toFixed(2) });
    this.ReservesAndProvisonsForm.patchValue({ 'TotalBalance': parseFloat(BalanceAmount.toString()).toFixed(2) });
    console.log("ReservesAndProvisonsForm345", this.ReservesAndProvisonsForm)
  }

  AddOthers20299Row() {
    let type = this.AddOthers20299();
    this.Others20299Set.push(type);
    console.log("Others20299Set123", this.Others20299Set)
    console.log("Others20299Form123", this.Others20299Form)
  }

  SaveReserves20209() {
    this.taxPayerDetails.AProvRes = this.ReservesAndProvisonsForm.value.TotalBalance;
    this.calAdjustmentsTab();
    let FormGuid=this.taxPayerDetails.Sch_20209Set["results"][0]["FormGuid"];
    let RankingOrder=this.taxPayerDetails.Sch_20209Set["results"][0]["RankingOrder"];
    this.taxPayerDetails.Sch_20209Set["results"] = [];
    console.log(this.ReservesProvisionsSet.controls);
    for (let i = 0; i < this.ReservesProvisionsSet.controls.length; i++) {
      this.taxPayerDetails.Sch_20209Set["results"].push({});
      this.taxPayerDetails.Sch_20209Set["results"][i]["ProviTp"] = this.ReservesProvisionsSet.controls[i].value.TypesofProvision;
      this.taxPayerDetails.Sch_20209Set["results"][i]["BegBal"] = this.ReservesProvisionsSet.controls[i].value.BalanceattheBeginning;
      this.taxPayerDetails.Sch_20209Set["results"][i]["FormYr"] = this.ReservesProvisionsSet.controls[i].value.FormedDuringtheyear;
      this.taxPayerDetails.Sch_20209Set["results"][i]["UsedYr"] = this.ReservesProvisionsSet.controls[i].value.UsedDuringtheyear;
      this.taxPayerDetails.Sch_20209Set["results"][i]["Bal"] = this.ReservesProvisionsSet.controls[i].value.Balance;
      this.taxPayerDetails.Sch_20209Set["results"][i]["FormGuid"] = FormGuid;
      this.taxPayerDetails.Sch_20209Set["results"][i]["RankingOrder"] = RankingOrder;
    }    
    this.CalculateTotals();
    jQuery("#res-provison").modal('hide');
  }

  Reserves20209Applicable(event) {
    if (event.currentTarget.checked == true) {
      this.ReservesAndProvisonsForm.patchValue({ "Schedule": true });
      if (this.ReservesProvisionsSet.controls.length == 0) {
        this.AddReservesRow();
      }
      jQuery("#res-provison").modal('show');
    }
    else {
      // jQuery("#res-provison").modal('hide');
      // this.ReservesAndProvisonsForm.patchValue({ "Schedule": false });
      // this.clearFormArray(this.ReservesProvisionsSet);
      // this.taxPayerDetails.AProvRes = "0.00";
      // this.taxPayerDetails.AProvision = "0.00";
      // this.calAdjustmentsTab();
      // this.CalculateTotals();
      this.notApplicableAction="20209";
      jQuery("#NotApplicableForm").modal('show');
    }
  }

  AddMultipleOthers20299Forms() {
    for (let i = 0; i < this.NoOfAddedForms; i++) {
      this.AddOthers20299Row();
    }
    this.NoOfAddedForms = 0;
    jQuery("#addMultipleFormsModal20299").modal('hide');
    jQuery('body').addClass('modalopen');
  }

  TotalOthers20299Calculation() {
    this.Others20299Form.value.Total = 0.00;
    let amount = 0;
    for (let i = 0; i < this.Others20299Set.controls.length; i++) {
      amount = amount + (+this.Others20299Set.controls[i].value.Amount);
    }
    this.Others20299Form.patchValue({ 'Total': parseFloat(amount.toString()).toFixed(2) });
  }

  SaveOthers20299() {
    this.taxPayerDetails.AOtherExp = this.Others20299Form.value.Total;
    let FormGuid=this.taxPayerDetails.Sch_20299Set["results"][0]["FormGuid"];
    let RankingOrder=this.taxPayerDetails.Sch_20299Set["results"][0]["RankingOrder"];
    this.taxPayerDetails.Sch_20299Set["results"] = [];    
    for (let i = 0; i < this.Others20299Set.controls.length; i++) {
      this.taxPayerDetails.Sch_20299Set["results"].push({});
      this.taxPayerDetails.Sch_20299Set["results"][i]["LineNo"] = i + 1;
      this.taxPayerDetails.Sch_20299Set["results"][i]["Description"] = this.Others20299Set.controls[i].value.Description;
      this.taxPayerDetails.Sch_20299Set["results"][i]["Amount"] = this.Others20299Set.controls[i].value.Amount;
      this.taxPayerDetails.Sch_20299Set["results"][i]["FormGuid"] = FormGuid;
      this.taxPayerDetails.Sch_20299Set["results"][i]["RankingOrder"] = RankingOrder;
    }
    this.CalculateTotals();
    jQuery("#others").modal('hide');
  }

  Other20299Applicable(event) {
    if (event.currentTarget.checked == true) {
      this.Others20299Form.patchValue({ "Schedule": true });
      if (this.Others20299Set.controls.length == 0) {
        this.AddOthers20299Row();
      }
      jQuery("#others").modal('show');

    }
    else {
      // jQuery("#others").modal('hide');
      // this.Others20299Form.patchValue({ "Schedule": false });
      // this.clearFormArray(this.Others20299Set);
      // this.taxPayerDetails.AOtherExp = "0.00";
      // this.CalculateTotals();
      this.notApplicableAction="20299";
      jQuery("#NotApplicableForm").modal('show');
    }
  }
  DeleteOther20299(pi) {
    const control = this.Others20299Form.get('Others20299Set') as FormArray;
    control.removeAt(pi);
    this.TotalOthers20299Calculation();

  }

  AddSubContractors() {
    return this.fb.group({
      "IDType": [null, Validators.required],
      "Number": [null, Validators.required],
      "SubContractorName": [null, Validators.required],
      "Address": [null, Validators.required],
      "ValueofContract": [0.00, [Validators.required, Validators.min(0)]],
      "ValueOfWorkExecuted": [0.00]
    });
  }

  get SubContractorSet(): FormArray {
    return this.SubContractorsForm.get('SubContractorSet') as FormArray;
  }
  TotalSubContractorCalculation() {
    this.SubContractorsForm.value.Total = 0.00;
    let amount = 0;
    for (let i = 0; i < this.SubContractorSet.controls.length; i++) {
      amount = amount + (+this.SubContractorSet.controls[i].value.ValueOfWorkExecuted);
    }
    this.SubContractorsForm.patchValue({ 'Total': parseFloat(amount.toString()).toFixed(2) });
  }
  AddSubContractorRow() {
    let type = this.AddSubContractors();
    this.SubContractorSet.push(type);
    console.log("SubContractorSet123", this.SubContractorSet)
    console.log("SubContractorsForm123", this.SubContractorsForm)
  }
  AddMultipleSubContractorForms() {
    for (let i = 0; i < this.NoOfAddedForms; i++) {
      this.AddSubContractorRow();
    }
    this.NoOfAddedForms = 0;
    jQuery("#addMultipleFormsModal20206").modal('hide');
    jQuery('body').addClass('modalopen');

  }

  SaveSubContractor20206() {
    this.taxPayerDetails.ASubcontractors = this.SubContractorsForm.value.Total;
    let FormGuid=this.taxPayerDetails.Sch_20206Set["results"][0]["FormGuid"];
    let RankingOrder=this.taxPayerDetails.Sch_20206Set["results"][0]["RankingOrder"];
    this.taxPayerDetails.Sch_20206Set["results"] = [];
    for (let i = 0; i < this.SubContractorSet.controls.length; i++) {
      this.taxPayerDetails.Sch_20206Set["results"].push({});
      this.taxPayerDetails.Sch_20206Set["results"][i]["DropDown"] = this.SubContractorSet.controls[i].value.IDType;
      this.taxPayerDetails.Sch_20206Set["results"][i]["Crtinfin"] = this.SubContractorSet.controls[i].value.Number;
      this.taxPayerDetails.Sch_20206Set["results"][i]["SubcntrNm"] = this.SubContractorSet.controls[i].value.SubContractorName;
      this.taxPayerDetails.Sch_20206Set["results"][i]["Addr"] = this.SubContractorSet.controls[i].value.Address;
      this.taxPayerDetails.Sch_20206Set["results"][i]["ContractValue"] = this.SubContractorSet.controls[i].value.ValueofContract;
      this.taxPayerDetails.Sch_20206Set["results"][i]["ValWrkYr"] = this.SubContractorSet.controls[i].value.ValueOfWorkExecuted;
      this.taxPayerDetails.Sch_20206Set["results"][i]["FormGuid"] = FormGuid;
      this.taxPayerDetails.Sch_20206Set["results"][i]["RankingOrder"] = RankingOrder;
    }
    jQuery("#sub-contractors").modal('hide');
    this.CalculateTotals();
  }

  SubContractor20206Applicable(event) {
    if (event.currentTarget.checked == true) {
      this.SubContractorsForm.patchValue({ "Schedule": true });
      if (this.SubContractorSet.controls.length == 0) {
        this.AddSubContractorRow();
      }
      jQuery("#sub-contractors").modal('show');

    }
    else {
      // jQuery("#sub-contractors").modal('hide');
      // this.SubContractorsForm.patchValue({ "Schedule": false });
      // this.clearFormArray(this.SubContractorSet);
      // this.taxPayerDetails.ASubcontractors = "0.00";
      // this.CalculateTotals();
      this.notApplicableAction="20206";
      jQuery("#NotApplicableForm").modal('show');
    }
  }

  DeleteSubContractor(pi) {
    const control = this.SubContractorsForm.get('SubContractorSet') as FormArray;
    control.removeAt(pi);
    this.TotalSubContractorCalculation();
  }

  SaveOtherIncome20102() {
    this.taxPayerDetails.ARevOthAct = this.OtherIncomeForm.value.Totals;
    let formGuid=this.taxPayerDetails.Sch_20102Set["results"][0]["FormGuid"];
    let RankingOrder=this.taxPayerDetails.Sch_20102Set["results"][0]["RankingOrder"];
    this.taxPayerDetails.Sch_20102Set["results"] = [];
    for (let i = 0; i < this.otherIncomesSet.controls.length; i++) {
      console.log(this.otherIncomesSet.controls[i].value.Description);
      this.taxPayerDetails.Sch_20102Set["results"].push({});
      this.taxPayerDetails.Sch_20102Set["results"][i]["LineNo"] = i + 1;
      this.taxPayerDetails.Sch_20102Set["results"][i]["Description"] = this.otherIncomesSet.controls[i].value.Description;
      this.taxPayerDetails.Sch_20102Set["results"][i]["Amount"] = this.otherIncomesSet.controls[i].value.Amount;
      this.taxPayerDetails.Sch_20102Set["results"][i]["FormGuid"]=formGuid;
      this.taxPayerDetails.Sch_20102Set["results"][i]["RankingOrder"]=RankingOrder;
    }
    console.log(this.taxPayerDetails.Sch_20102Set["results"])
    jQuery("#OthersIncome").modal('hide');
    this.CalculateTotals();
  }

  OtherIncome20102Applicable(event) {
    if (event.currentTarget.checked == true) {
      this.taxPayerDetails.ARevOthActChk=="1"
      this.OtherIncomeForm.patchValue({ "Schedule": true });
      if (this.otherIncomesSet.controls.length == 0) {
        this.AddOtherIncomeRow();
      }
      jQuery("#OthersIncome").modal('show');

    }
    else {
      // this.taxPayerDetails.ARevOthActChk=="2";
      // jQuery("#OthersIncome").modal('hide');
      // this.OtherIncomeForm.patchValue({ "Schedule": false });
      // this.clearFormArray(this.otherIncomesSet);
      // this.taxPayerDetails.ARevOthAct = "0.00";
      // this.CalculateTotals();
      this.notApplicableAction="20102";
      jQuery("#NotApplicableForm").modal('show');
    }
  }


  SaveDirectExpense20204() {
    this.taxPayerDetails.ADirectExp = this.DirectExpenseForm.value.Totals;
    let FormGuid=this.taxPayerDetails.Sch_20204Set["results"][0]["FormGuid"];
    let RankingOrder=this.taxPayerDetails.Sch_20204Set["results"][0]["RankingOrder"];
    this.taxPayerDetails.Sch_20204Set["results"] = [];
    for (let i = 0; i < this.directExpenseSet.controls.length; i++) {
      this.taxPayerDetails.Sch_20204Set["results"].push({});
      this.taxPayerDetails.Sch_20204Set["results"][i]["LineNo"] = i + 1;
      this.taxPayerDetails.Sch_20204Set["results"][i]["Description"] = this.directExpenseSet.controls[i].value.Description;
      this.taxPayerDetails.Sch_20204Set["results"][i]["Amount"] = this.directExpenseSet.controls[i].value.Amount;
      this.taxPayerDetails.Sch_20204Set["results"][i]["FormGuid"] = FormGuid;
      this.taxPayerDetails.Sch_20204Set["results"][i]["RankingOrder"] = RankingOrder;
    }
    this.CalculateTotals();
    jQuery("#directExpenses").modal('hide');
  }

  DirectExpense20204Applicable(event) {
    if (event.currentTarget.checked == true) {
      this.DirectExpenseForm.patchValue({ "Schedule": true });
      if (this.directExpenseSet.controls.length == 0) {
        this.AddDirectExpenseRow();
      }
      jQuery("#directExpenses").modal('show');

    }
    else {
      // jQuery("#directExpenses").modal('hide');
      // this.DirectExpenseForm.patchValue({ "Schedule": false });
      // this.clearFormArray(this.directExpenseSet);
      // this.taxPayerDetails.ADirectExp = "0.00";
      // this.CalculateTotals();
      this.notApplicableAction="20204";
      jQuery("#NotApplicableForm").modal('show');
    }
  }


  SaveIncomeFromMain20101() {
    this.taxPayerDetails.ARevMainAct = this.IncomeFromMainActivityForm.value.TotalValueOfRemainingWork;
    let FormGuid=this.taxPayerDetails.Sch_20101Set["results"][0]["FormGuid"];
    let RankingOrder=this.taxPayerDetails.Sch_20101Set["results"][0]["RankingOrder"];
    this.taxPayerDetails.Sch_20101Set["results"] = [];
    for (let i = 0; i < this.Incomes.controls.length; i++) {
      this.taxPayerDetails.Sch_20101Set["results"].push({});
      this.taxPayerDetails.Sch_20101Set["results"][i]["CParty"] = this.Incomes.controls[i].value.ContractingParty;
      this.taxPayerDetails.Sch_20101Set["results"][i]["CSubject"] = this.Incomes.controls[i].value.ContractingSubject;
      this.taxPayerDetails.Sch_20101Set["results"][i]["ContractDt"] = "\/Date(" + new Date(this.Incomes.controls[i].value.ContractDate).getTime() + ")\/";//this.Incomes.controls[i].value.ContractDate;
      this.taxPayerDetails.Sch_20101Set["results"][i]["CDuration"] = this.Incomes.controls[i].value.ContractDuration;
      this.taxPayerDetails.Sch_20101Set["results"][i]["COrgVal"] = this.Incomes.controls[i].value.OriginalValueOfContract;
      this.taxPayerDetails.Sch_20101Set["results"][i]["CAdjustVal"] = this.Incomes.controls[i].value.AdjustmentToTheContract;
      this.taxPayerDetails.Sch_20101Set["results"][i]["PrevWorkVal"] = this.Incomes.controls[i].value.ValueOfPreviousYears;
      this.taxPayerDetails.Sch_20101Set["results"][i]["CurWorkVal"] = this.Incomes.controls[i].value.ValueOfCurrentYear;
      this.taxPayerDetails.Sch_20101Set["results"][i]["RemWorkVal"] = this.Incomes.controls[i].value.ValueOfRemainingWork;
      this.taxPayerDetails.Sch_20101Set["results"][i]["FormGuid"] = FormGuid;
      this.taxPayerDetails.Sch_20101Set["results"][i]["RankingOrder"] = RankingOrder;
    }
    console.log(this.taxPayerDetails);
    this.SaveForm2();
    jQuery("#income").modal('hide');
  }

  IncomeFromMain20101Applicable(event) {
    if (event.currentTarget.checked == true) {
      this.IncomeFromMainActivityForm.patchValue({ "Schedule": true });
      if (this.Incomes.controls.length == 0) {
        this.AddIncomeRow();
      }
      jQuery("#income").modal('show');

    }
    else {
      // jQuery("#income").modal('hide');
      // this.IncomeFromMainActivityForm.patchValue({ "Schedule": false });
      // this.clearFormArray(this.Incomes);
      // this.taxPayerDetails.ARevMainAct = "0.00";
      // this.CalculateTotals();
      this.notApplicableAction="20101";
      jQuery("#NotApplicableForm").modal('show');
    }
  }

  SaveConsultingFees20208() {
    this.taxPayerDetails.AFees = this.ConsultingProfessionalFeesForm.value.Total;
    let FormGuid=this.taxPayerDetails.Sch_20208Set["results"][0]["FormGuid"];
    let RankingOrder=this.taxPayerDetails.Sch_20208Set["results"][0]["RankingOrder"];
    this.taxPayerDetails.Sch_20208Set["results"] = [];
    console.log(this.ProfessionalFeesSet);
    for (let i = 0; i < this.ProfessionalFeesSet.controls.length; i++) {
      this.taxPayerDetails.Sch_20208Set["results"].push({});
      this.taxPayerDetails.Sch_20208Set["results"][i]["LineNo"] = i+1;
      this.taxPayerDetails.Sch_20208Set["results"][i]["DropDown"] = this.ProfessionalFeesSet.controls[i].value.IDType;
      this.taxPayerDetails.Sch_20208Set["results"][i]["Crtinfin"] = this.ProfessionalFeesSet.controls[i].value.Number;
      this.taxPayerDetails.Sch_20208Set["results"][i]["BeneficiaryNm"] =this.ProfessionalFeesSet.controls[i].value.BenName;
      this.taxPayerDetails.Sch_20208Set["results"][i]["Addr"] =this.ProfessionalFeesSet.controls[i].value.Address;
      this.taxPayerDetails.Sch_20208Set["results"][i]["ServiceTp"] = this.ProfessionalFeesSet.controls[i].value.NatureService;
      this.taxPayerDetails.Sch_20208Set["results"][i]["Amount"] = this.ProfessionalFeesSet.controls[i].value.Amount;
      this.taxPayerDetails.Sch_20208Set["results"][i]["FormGuid"] = FormGuid;
      this.taxPayerDetails.Sch_20208Set["results"][i]["RankingOrder"] = RankingOrder;
      this.taxPayerDetails.Sch_20208Set["results"][i]["DataVersion"] = "00001";
    }   
    console.log(this.ProfessionalFeesSet.controls);
    this.SaveForm2();
    jQuery("#consulting").modal('hide');
  }

  ConsultingFees20208Applicable(event) {
    if (event.currentTarget.checked == true) {
      this.ConsultingProfessionalFeesForm.patchValue({ "Schedule": true });
      if (this.ProfessionalFeesSet.controls.length == 0) {
        this.AddSubContractorRow();
      }
      jQuery("#consulting").modal('show');

    }
    else {
      // jQuery("#consulting").modal('hide');
      // this.ConsultingProfessionalFeesForm.patchValue({ "Schedule": false });
      // this.clearFormArray(this.ProfessionalFeesSet);
      // this.taxPayerDetails.AFees = "0.00";
      // this.CalculateTotals();
      this.notApplicableAction="20208";
      jQuery("#NotApplicableForm").modal('show');
    }
  }
  //Ended by saraswathi
  //purna start 22-12
  //purna start 22-12
  get DAP1(): FormArray {
    return this.DAP1Form.get('DAP1') as FormArray;
  }
  get DAP2(): FormArray {
    return this.DAP2Form.get('DAP2') as FormArray;
  }
  get DAP3(): FormArray {
    return this.DAP3Form.get('DAP3') as FormArray;
  }
  get DAP4(): FormArray {
    return this.DAP4Form.get('DAP4') as FormArray;
  }
  //purna end 22-12
  DAPS1(event) {
    if (event.currentTarget.checked == true) {
      this.DAP1Form.patchValue({ "Schedule": true });
      if (this.DAP1.controls.length == 0) {
        this.AddRowD1();
      }
      jQuery("#Deduction1").modal('show');
      //this.taxPayerDetails. = "X";
    }
    else {
      // jQuery("#Deduction1").modal('hide');
      // this.DAP1Form.patchValue({ "Schedule": false });
      // this.clearFormArray(this.DAP1);
      // this.calCellTotalD1();
      // this.caldeduction();
      // //this.taxPayerDetails. = ""; 
      this.notApplicableAction="20701";
      jQuery("#NotApplicableForm").modal('show');      

    }
  }
  DAPS2(event) {
    if (event.currentTarget.checked == true) {
      this.DAP2Form.patchValue({ "Schedule": true });
      if (this.DAP2.controls.length == 0) {
        this.AddRowD2();
      }
      jQuery("#Deduction2").modal('show');
      //this.taxPayerDetails. = "X";
    }
    else {
      // jQuery("#Deduction2").modal('hide');
      // this.DAP2Form.patchValue({ "Schedule": false });
      // this.clearFormArray(this.DAP2);
      // this.calCellTotalD2();
      // this.caldeduction();
      // //this.taxPayerDetails. = "";      
      this.notApplicableAction="20702";
      jQuery("#NotApplicableForm").modal('show');
    }
  }
  DAPS3(event) {
    if (event.currentTarget.checked == true) {
      this.DAP3Form.patchValue({ "Schedule": true });
      if (this.DAP3.controls.length == 0) {
        this.AddRowD3();
      }
      jQuery("#Deduction3").modal('show');
      //this.taxPayerDetails. = "X";
    }
    else {
      // jQuery("#Deduction3").modal('hide');
      // this.DAP3Form.patchValue({ "Schedule": false });
      // this.clearFormArray(this.DAP3);
      // this.calCellTotalD3();
      // this.caldeduction();
      // //this.taxPayerDetails. = "";    
      this.notApplicableAction="20704";
      jQuery("#NotApplicableForm").modal('show');   
    }
  }
  DAPS4(event) {
    if (event.currentTarget.checked == true) {
      this.DAP4Form.patchValue({ "Schedule": true });
      if (this.DAP4.controls.length == 0) {
        this.AddRowD4();
      }
      jQuery("#Deduction4").modal('show');
      //this.taxPayerDetails. = "X";
    }
    else {
      // jQuery("#Deduction4").modal('hide');
      // this.DAP4Form.patchValue({ "Schedule": false });
      // this.clearFormArray(this.DAP4);
      // this.calCellTotalD4();
      // this.caldeduction();
      // //this.taxPayerDetails. = "";    
      this.notApplicableAction="20799";
      jQuery("#NotApplicableForm").modal('show'); 
    }
  }
  DeleteRowD1(pi) {
    const control = this.DAP1Form.get('DAP1') as FormArray;
    control.removeAt(pi);
    if (pi == 0) {
      this.AddRowD1();
    }
    this.calCellTotalD1();
    this.caldeduction();
  }
  DeleteRowD2(pi) {
    const control = this.DAP2Form.get('DAP2') as FormArray;
    control.removeAt(pi);
    if (pi == 0) {
      this.AddRowD2();
    }
    this.calCellTotalD2();
    this.caldeduction();
  }
  DeleteRowD3(pi) {
    const control = this.DAP3Form.get('DAP3') as FormArray;
    control.removeAt(pi);
    if (pi == 0) {
      this.AddRowD3();
    }
    this.calCellTotalD3();
    this.caldeduction();
  }
  DeleteRowD4(pi) {
    const control = this.DAP4Form.get('DAP4') as FormArray;
    control.removeAt(pi);
    if (pi == 0) {
      this.AddRowD4();
    }
    this.calCellTotalD4();
    this.caldeduction();
  }
  AddRowD1() {
    let type = this.DAP1FormM();
    this.DAP1.push(type);
  }
  AddRowD2() {
    let type = this.DAP2FormM();
    this.DAP2.push(type);
  }
  AddRowD3() {
    let type = this.DAP3FormM();
    this.DAP3.push(type);
  }
  AddRowD4() {
    let type = this.DAP4FormM();
    this.DAP4.push(type);
  }
  DAP1FormM() {
    return this.fb.group({
      "Description": ["", [Validators.required, Validators.maxLength(200)]],
      "Amount": ["0.00", [Validators.required, Validators.min(0),Validators.max(99999999999999.99)]]
    });
  }
  DAP2FormM() {
    return this.fb.group({
      "Description": ["", [Validators.required, Validators.maxLength(200)]],
      "Amount": ["0.00", [Validators.required, Validators.min(0),Validators.max(99999999999999.99)]]
    });
  }
  DAP3FormM() {
    return this.fb.group({
      "Description": ["", [Validators.required, Validators.maxLength(200)]],
      "Amount": ["0.00", [Validators.required, Validators.min(0),Validators.max(99999999999999.99)]]
    });
  }
  DAP4FormM() {
    return this.fb.group({
      "Description": ["", [Validators.required, Validators.maxLength(200)]],
      "Amount": ["0.00", [Validators.required, Validators.min(0),Validators.max(99999999999999.99)]]
    });
  }
  ClearD1() {
    jQuery("#Deduction1").modal('hide');
  }
  ClearD2() {
    jQuery("#Deduction2").modal('hide');
  }
  ClearD3() {
    jQuery("#Deduction3").modal('hide');
  }
  ClearD4() {
    jQuery("#Deduction4").modal('hide');
  }
  calCellTotalD1() {
    this.taxPayerDetails.ANetFixAsset = "0.00";
    this.totalD1 = 0;
    for (let i = 0; i < this.DAP1.controls.length; i++) {
      if (this.DAP1.controls[i].value.Amount == '' || this.DAP1.controls[i].value.Amount == null || this.DAP1.controls[i].value.Amount == undefined || this.DAP1.controls[i].value.Amount == 'undefined') {
        this.DAP1.controls[i].value.Amount = "0.00";
      }
      else {
        this.DAP1.controls[i].value.Amount = (+this.DAP1.controls[i].value.Amount).toFixed(2);
      }
      this.totalD1 = this.totalD1 + parseFloat(this.DAP1.controls[i].value.Amount);
    }
    this.taxPayerDetails.ANetFixAsset = this.totalD1.toFixed(2);
  }
  calCellTotalD2() {
    this.taxPayerDetails.AInvestment = "0.00";
    this.totalD2 = 0;
    for (let i = 0; i < this.DAP2.controls.length; i++) {
      if (this.DAP2.controls[i].value.Amount == '' || this.DAP2.controls[i].value.Amount == null || this.DAP2.controls[i].value.Amount == undefined || this.DAP2.controls[i].value.Amount == 'undefined') {
        this.DAP2.controls[i].value.Amount = "0.00";
      }
      else {
        this.DAP2.controls[i].value.Amount = (+this.DAP2.controls[i].value.Amount).toFixed(2);
      }
      this.totalD2 = this.totalD2 + parseFloat(this.DAP2.controls[i].value.Amount);
    }
    this.taxPayerDetails.AInvestment = this.totalD2.toFixed(2);
  }
  calCellTotalD3() {
    this.taxPayerDetails.AEstExpense = "0.00";
    this.totalD3 = 0;
    for (let i = 0; i < this.DAP3.controls.length; i++) {
      if (this.DAP3.controls[i].value.Amount == '' || this.DAP3.controls[i].value.Amount == null || this.DAP3.controls[i].value.Amount == undefined || this.DAP3.controls[i].value.Amount == 'undefined') {
        this.DAP3.controls[i].value.Amount = "0.00";
      }
      else {
        this.DAP3.controls[i].value.Amount = (+this.DAP3.controls[i].value.Amount).toFixed(2);
      }
      this.totalD3 = this.totalD3 + parseFloat(this.DAP3.controls[i].value.Amount);
    }
    this.taxPayerDetails.AEstExpense = this.totalD3.toFixed(2);
  }
  calCellTotalD4() {
    this.taxPayerDetails.AOtherInvst = "0.00";
    this.totalD4 = 0;
    for (let i = 0; i < this.DAP4.controls.length; i++) {
      if (this.DAP4.controls[i].value.Amount == '' || this.DAP4.controls[i].value.Amount == null || this.DAP4.controls[i].value.Amount == undefined || this.DAP4.controls[i].value.Amount == 'undefined') {
        this.DAP4.controls[i].value.Amount = "0.00";
      }
      else {
        this.DAP4.controls[i].value.Amount = (+this.DAP4.controls[i].value.Amount).toFixed(2);
      }
      this.totalD4 = this.totalD4 + parseFloat(this.DAP4.controls[i].value.Amount);
    }
    this.taxPayerDetails.AOtherInvst = this.totalD4.toFixed(2);
  }
  SaveD1() {
    this.taxPayerDetails.ANetFixAsset = this.totalD1.toFixed(2);
    // this.taxPayerDetails. = "X";
    let FormGuid=this.taxPayerDetails.Sch_20701Set["results"][0]["FormGuid"];
    let RankingOrder=this.taxPayerDetails.Sch_20701Set["results"][0]["RankingOrder"];
    this.taxPayerDetails.Sch_20701Set["results"] = [];
    for (let i = 0; i < this.DAP1.controls.length; i++) {
      this.taxPayerDetails.Sch_20701Set["results"].push({});
      this.taxPayerDetails.Sch_20701Set["results"][i]["LineNo"] = i + 1;
      this.taxPayerDetails.Sch_20701Set["results"][i]["Description"] = this.DAP1.controls[i].value.Description;
      this.taxPayerDetails.Sch_20701Set["results"][i]["Amount"] = this.DAP1.controls[i].value.Amount;
      this.taxPayerDetails.Sch_20701Set["results"][i]["FormGuid"] = FormGuid;
      this.taxPayerDetails.Sch_20701Set["results"][i]["RankingOrder"] = RankingOrder;
    }
    jQuery("#Deduction1").modal('hide');
    this.caldeduction();
  }
  SaveD2() {
    this.taxPayerDetails.AInvestment = this.totalD2.toFixed(2);
    // this.taxPayerDetails. = "X";
    let FormGuid=this.taxPayerDetails.Sch_20702Set["results"][0]["FormGuid"];
    let RankingOrder=this.taxPayerDetails.Sch_20702Set["results"][0]["RankingOrder"];
    this.taxPayerDetails.Sch_20702Set["results"] = [];
    for (let i = 0; i < this.DAP2.controls.length; i++) {
      this.taxPayerDetails.Sch_20702Set["results"].push({});
      this.taxPayerDetails.Sch_20702Set["results"][i]["LineNo"] = i + 1;
      this.taxPayerDetails.Sch_20702Set["results"][i]["Description"] = this.DAP2.controls[i].value.Description;
      this.taxPayerDetails.Sch_20702Set["results"][i]["Amount"] = this.DAP2.controls[i].value.Amount;
      this.taxPayerDetails.Sch_20702Set["results"][i]["FormGuid"] = FormGuid;
      this.taxPayerDetails.Sch_20702Set["results"][i]["RankingOrder"] = RankingOrder;
    }
    jQuery("#Deduction2").modal('hide');
    this.caldeduction();
  }
  SaveD3() {
    this.taxPayerDetails.AEstExpense = this.totalD3.toFixed(2);
    // this.taxPayerDetails. = "X";
    let FormGuid=this.taxPayerDetails.Sch_20704Set["results"][0]["FormGuid"];
    let RankingOrder=this.taxPayerDetails.Sch_20704Set["results"][0]["RankingOrder"];
    this.taxPayerDetails.Sch_20704Set["results"] = [];
    for (let i = 0; i < this.DAP3.controls.length; i++) {
      this.taxPayerDetails.Sch_20704Set["results"].push({});
      this.taxPayerDetails.Sch_20704Set["results"][i]["LineNo"] = i + 1;
      this.taxPayerDetails.Sch_20704Set["results"][i]["Description"] = this.DAP3.controls[i].value.Description;
      this.taxPayerDetails.Sch_20704Set["results"][i]["Amount"] = this.DAP3.controls[i].value.Amount;
      this.taxPayerDetails.Sch_20704Set["results"][i]["FormGuid"] = FormGuid;
      this.taxPayerDetails.Sch_20704Set["results"][i]["RankingOrder"] = RankingOrder;
    }
    jQuery("#Deduction3").modal('hide');
    this.caldeduction();
  }
  SaveD4() {
    this.taxPayerDetails.AOtherInvst = this.totalD4.toFixed(2);
    // this.taxPayerDetails. = "X";
    let FormGuid=this.taxPayerDetails.Sch_20799Set["results"][0]["FormGuid"];
    let RankingOrder=this.taxPayerDetails.Sch_20799Set["results"][0]["RankingOrder"];
    this.taxPayerDetails.Sch_20799Set["results"] = [];
    for (let i = 0; i < this.DAP4.controls.length; i++) {
      this.taxPayerDetails.Sch_20799Set["results"].push({});
      this.taxPayerDetails.Sch_20799Set["results"][i]["LineNo"] = i + 1;
      this.taxPayerDetails.Sch_20799Set["results"][i]["Description"] = this.DAP4.controls[i].value.Description;
      this.taxPayerDetails.Sch_20799Set["results"][i]["Amount"] = this.DAP4.controls[i].value.Amount;
      this.taxPayerDetails.Sch_20799Set["results"][i]["FormGuid"] = FormGuid;
      this.taxPayerDetails.Sch_20799Set["results"][i]["RankingOrder"] = RankingOrder;
    }
    jQuery("#Deduction4").modal('hide');
    this.caldeduction();
  }
  clearFormArray = (formArray: FormArray) => {
    while (formArray.length !== 0) {
      formArray.removeAt(0)
    }
  }
  caldeduction() {
    this.calAdjustmentsTab();
    console.log(this.taxPayerDetails.AVesselTaxTotal);
    console.log(this.taxPayerDetails.ADeductTotal);
      if (this.taxPayerDetails.ALossStage == undefined || this.taxPayerDetails.ALossStage == "undefined" || this.taxPayerDetails.ALossStage == null || this.taxPayerDetails.ALossStage == '') {
        this.taxPayerDetails.ALossStage = "0.00";
      }
      else {
        this.taxPayerDetails.ALossStage = (+this.taxPayerDetails.ALossStage).toFixed(2);
      }
      this.taxPayerDetails.ADeductTotal = (parseFloat(this.taxPayerDetails.ANetFixAsset) + parseFloat(this.taxPayerDetails.AInvestment)
        + parseFloat(this.taxPayerDetails.ALossStage) + parseFloat(this.taxPayerDetails.AEstExpense) + parseFloat(this.taxPayerDetails.AOtherInvst)).toFixed(2);
      this.taxPayerDetails.ANetContainer = (parseFloat(this.taxPayerDetails.AVesselTaxTotal) - parseFloat(this.taxPayerDetails.ADeductTotal)).toFixed(2);
      console.log(this.taxPayerDetails.ANetContainer)
      if (parseFloat(this.taxPayerDetails.ANetContainer) < 0) {
        this.taxPayerDetails.ANetContainer = "0.00";
        this.taxPayerDetails.AZakat = "0.00";
        this.taxPayerDetails.ADiffPayable = "0.00";
      }
      else {
        this.taxPayerDetails.AZakat = ((parseFloat(this.taxPayerDetails.ANetContainer) * 0.025)).toFixed(2);
        this.taxPayerDetails.ADiffPayable = this.taxPayerDetails.AZakat;
      }
      this.SaveForm2();
   
  }
  // GlobalNumberAllow(event) {
  //   var rgx = /^[0-9]*\.?[0-9]*$/;
  //   return rgx.test(event.target.value);
  // }
  AddMultipleD1() {
    for (let i = 0; i < this.NoOfAddedForms; i++) {
      this.AddRowD1();
    }
    jQuery("#addMultipleD1").modal('hide');
    this.NoOfAddedForms = 0;
  }
  AddMultipleD2() {
    for (let i = 0; i < this.NoOfAddedForms; i++) {
      this.AddRowD2();
    }
    jQuery("#addMultipleD2").modal('hide');
    this.NoOfAddedForms = 0;
  }
  AddMultipleD3() {
    for (let i = 0; i < this.NoOfAddedForms; i++) {
      this.AddRowD3();
    }
    jQuery("#addMultipleD3").modal('hide');
    this.NoOfAddedForms = 0;
  }
  AddMultipleD4() {
    for (let i = 0; i < this.NoOfAddedForms; i++) {
      this.AddRowD4();
    }
    jQuery("#addMultipleD4").modal('hide');
    this.NoOfAddedForms = 0;
  }
  //purna end 22-12

  //Added by Phani
  GlobalNumberAllow(event) {
    var rgx = /^\d{0,12}(\.\d{0,2})?$/;
    if (event.keyCode == 8) {
      return true;
    }
    else if (!rgx.test((event.target.value).toString().replace(/,/g, ''))) {
      event.preventDefault();
    }
  }
  GlobalNumberAllow3(event)
  {    
    var rgx = /^[-]?\d{0,14}(\.\d{0,2})?$/;
    if (event.keyCode == 8) {
      return true;
    }
    else if (!rgx.test((event.target.value).toString().replace(/,/g, ''))) {
      return event.preventDefault();
    }
  }

  IDChange(flag, index) {
    if (flag == "ConProFeeIDChange") {
      this.ProfessionalFeesSet.controls[index].patchValue({
        "Number": "",
        "BenName": "",
        "Address": ""
      });
      if(this.ProfessionalFeesSet.controls[index].value.IDType==""){
        this.ProfessionalFeesSet.controls[index].get('Number').disable();
        this.ProfessionalFeesSet.controls[index].get('BenName').enable();
        this.ProfessionalFeesSet.controls[index].get('Address').enable();
      }else{
        this.ProfessionalFeesSet.controls[index].get('Number').enable();
        // this.ProfessionalFeesSet.controls[index].get('BenName').disable();
        // this.ProfessionalFeesSet.controls[index].get('Address').disable();
      }
    } else if (flag == "SubContIDChange") {
      this.SubContractorSet.controls[index].patchValue({
        "Number": "",
        "SubContractorName": "",
        "Address": ""
      });
      if(this.SubContractorSet.controls[index].value.IDType==""){
        this.SubContractorSet.controls[index].get('Number').disable();
        this.SubContractorSet.controls[index].get('SubContractorName').enable();
        this.SubContractorSet.controls[index].get('Address').enable();
      }else{
        this.SubContractorSet.controls[index].get('Number').enable();
        // this.SubContractorSet.controls[index].get('SubContractorName').disable();
        // this.SubContractorSet.controls[index].get('Address').disable();
      }
    }
    this.ErrorMsg =false;
  }

  GetCrTinFinData(CrTinFin, IDvalue, index, flag) {
    this.retService.GetCrTinFin(CrTinFin, IDvalue).subscribe((data) => {
      console.log("TinFinCr :", data);
      if (flag == "ConProFeeNo") {
        this.ProfessionalFeesSet.controls[index].patchValue({"Address": data["d"].Address});
        this.ProfessionalFeesSet.controls[index].patchValue({"BenName": data["d"].FullName});
      } else if (flag == "SubContNo") {
        this.SubContractorSet.controls[index].patchValue({"SubContractorName": data["d"].FullName});
        this.SubContractorSet.controls[index].patchValue({"Address": data["d"].Address});
      }
      console.log(this.ProfessionalFeesSet.controls[index].value.BenName)
    }, err =>{
       this.ErrorMsg = IDvalue=="1"?true:false;
    });
    
  }

  get Others20499Set(): FormArray {
    return this.Others20499Form.get('Others20499Set') as FormArray;
  }
  get Others20699Set(): FormArray {
    return this.Others20699Form.get('Others20699Set') as FormArray;
  }
  Others20499() {
    return this.fb.group({
      "Description": ["", [Validators.required, Validators.maxLength(200)]],
      "Amount": ['0.00', [Validators.required, Validators.min(0),Validators.max(999999999999.99)]]
    });
  }
  Others20699() {
    return this.fb.group({
      "Description": ["", [Validators.required, Validators.maxLength(200)]],
      "Amount": ["0.00", [Validators.required, Validators.min(0),Validators.max(999999999999.99)]]
    });
  }
  Others20499Applicable(event) {
    if (event.currentTarget.checked) {
      this.Others20499Form.patchValue({ 'Schedule': true });
      if (this.Others20499Set.length == 0) { this.AddOthers20499(); }
      jQuery("#others20499").modal('show');
    }
    else {
      // this.Others20499Form.patchValue({ 'Schedule': false });
      // this.clearFormArray(this.Others20499Set);
      // this.calTotalA1();
      // this.calAdjustmentsTab();
      // jQuery("#others20499").modal('hide');
      this.notApplicableAction="20499";
      jQuery("#NotApplicableForm").modal('show');
    }
  }
  Others20699Applicable(event) {
    if (event.currentTarget.checked) {
      this.Others20699Form.patchValue({ 'Schedule': true });
      if (this.Others20699Set.length == 0) { this.AddOthers20699(); }
      jQuery("#others20699").modal('show');
    }
    else {
      // this.Others20499Form.patchValue({ 'Schedule': false });
      // this.clearFormArray(this.Others20699Set);
      // this.calTotalA2();
      // this.calAdjustmentsTab();
      // jQuery("#others20699").modal('hide');
      this.notApplicableAction="20699";
      jQuery("#NotApplicableForm").modal('show');
    }
  }
  DepreciationApplicable(event) {
    if (event.currentTarget.checked) {
      this.DepreciationIsApplicable = true;
      jQuery("#depreciation").modal('show');
    }
    else {
      // this.DepreciationIsApplicable = false;
      // this.Sch_20401 = this.Sch_20401Temp;
      // this.calDepreciationA();
      // this.calDepreciationB();
      // this.calDepreciationC();
      // this.calDepreciationD();
      // this.calDepreciationE();
      // this.calDepreciationF();
      // this.taxPayerDetails.ADiffConsumption = "0.00";
      // jQuery("#depreciation").modal('hide');
      this.notApplicableAction="20401";
      jQuery("#NotApplicableForm").modal('show');
    }
  }
  AddOthers20499() {
    let type = this.Others20499();
    this.Others20499Set.push(type);
  }
  AddOthers20699() {
    let type = this.Others20699();
    this.Others20699Set.push(type);
  }
  DeleteOthers20499(pi) {
    this.Others20499Set.removeAt(pi);
    this.calTotalA1();
    this.calAdjustmentsTab();
    if (this.Others20499Set.length == 0) {
      this.AddOthers20499();
    }
  }
  DeleteOthers20699(pi) {
    this.Others20699Set.removeAt(pi);
    this.calTotalA2();
    this.calAdjustmentsTab();
    if (this.Others20699Set.length == 0) {
      this.AddOthers20699();
    }
  }

  addMultipleOthers20499() {
    for (let i = 0; i < this.NoOfAddedForms; i++) {
      this.AddOthers20499();
    }
    this.NoOfAddedForms = 1;
    jQuery("#addMultiple20499Others").modal('hide');
    jQuery('body').addClass('modalopen');
  }
  addMultipleOthers20699() {
    for (let i = 0; i < this.NoOfAddedForms; i++) {
      this.AddOthers20699();
    }
    this.NoOfAddedForms = 1;
    jQuery("#addMultiple20699Others").modal('hide');
    jQuery('body').addClass('modalopen');
  }
  calTotalA1() {
    this.taxPayerDetails.AOtherAdjust = "0.00";
    this.totalA1 = 0;
    for (let i = 0; i < this.Others20499Set.controls.length; i++) {
      this.Others20499Set.controls[i].patchValue({ "Amount": (+this.Others20499Set.controls[i].value.Amount).toFixed(2) });
      this.totalA1 = this.totalA1 + parseFloat(this.Others20499Set.controls[i].value.Amount);
    }
    this.taxPayerDetails.AOtherAdjust = this.totalA1.toFixed(2);
    this.SaveForm2();
  }
  calTotalA2() {
    this.taxPayerDetails.AOtherContainer = "0.00";
    this.totalA2 = 0;
    for (let i = 0; i < this.Others20699Set.controls.length; i++) {
      this.Others20699Set.controls[i].patchValue({ "Amount": (+this.Others20699Set.controls[i].value.Amount).toFixed(2) });
      this.totalA2 = this.totalA2 + parseFloat(this.Others20699Set.controls[i].value.Amount);
    }
    this.taxPayerDetails.AOtherContainer = this.totalA2.toFixed(2);
    this.SaveForm2();
  }

  calDepreciationA() {
    this.Sch_20401.ALdGrbal = (+this.Sch_20401.ALdGrbal).toFixed(2) || "0.00";
    this.Sch_20401.ALdCostprevYr = (+this.Sch_20401.ALdCostprevYr).toFixed(2) || "0.00";
    this.Sch_20401.ALdCostcurrYr = (+this.Sch_20401.ALdCostcurrYr).toFixed(2) || "0.00";
    this.Sch_20401.ALdTcompPrev = (+this.Sch_20401.ALdTcompPrev).toFixed(2) || "0.00";
    this.Sch_20401.ALdTcomp = (+this.Sch_20401.ALdTcomp).toFixed(2) || "0.00";
    this.Sch_20401.AMaintainGrvlLd = (+this.Sch_20401.AMaintainGrvlLd).toFixed(2) || "0.00";
    this.Sch_20401.AMaintainGrvlGr1 = (+this.Sch_20401.AMaintainGrvlGr1).toFixed(2) || "0.00";

    //Lands (A) calculation
    this.Sch_20401.ALd50cost = ((parseFloat(this.Sch_20401.ALdCostprevYr) + parseFloat(this.Sch_20401.ALdCostcurrYr)) * 0.5).toFixed(2);
    this.Sch_20401.ALd50comp = ((parseFloat(this.Sch_20401.ALdTcompPrev) + parseFloat(this.Sch_20401.ALdTcomp)) * 0.5).toFixed(2);
    this.Sch_20401.ALdRestval = (parseFloat(this.Sch_20401.ALdGrbal) + parseFloat(this.Sch_20401.ALd50cost) - parseFloat(this.Sch_20401.ALd50comp)).toFixed(2);
    this.Sch_20401.ALdDeprAmt = (parseFloat(this.Sch_20401.ALdRestval) * (parseFloat(this.Sch_20401.ALdRatio) / 100)).toFixed(2);
    this.Sch_20401.ALdRestvalCurr1 = (parseFloat(this.Sch_20401.ALdRestval) - parseFloat(this.Sch_20401.ALdDeprAmt)).toFixed(2);
    this.Sch_20401.ALd4excess = parseFloat(this.Sch_20401.AMaintainGrvlLd) > (parseFloat(this.Sch_20401.ALdRestvalCurr1) * 0.04) ? (parseFloat(this.Sch_20401.AMaintainGrvlLd) - (parseFloat(this.Sch_20401.ALdRestvalCurr1) * 0.04)).toFixed(2) : "0.00";
    this.Sch_20401.ALdRestvalCurr2 = (parseFloat(this.Sch_20401.ALdRestvalCurr1) + parseFloat(this.Sch_20401.AMaintainGrvlLd)).toFixed(2);

    this.calTotalDepreciation();
  }

  calDepreciationB() {
    this.Sch_20401.AGr1Grbal = (+this.Sch_20401.AGr1Grbal).toFixed(2) || "0.00";
    this.Sch_20401.AGr1CostprevYr = (+this.Sch_20401.AGr1CostprevYr).toFixed(2) || "0.00";
    this.Sch_20401.AGr1CostcurrYr = (+this.Sch_20401.AGr1CostcurrYr).toFixed(2) || "0.00";
    this.Sch_20401.AGr1TcompPrev = (+this.Sch_20401.AGr1TcompPrev).toFixed(2) || "0.00";
    this.Sch_20401.AGr1TcompCurr = (+this.Sch_20401.AGr1TcompCurr).toFixed(2) || "0.00";
    this.Sch_20401.AMaintainGrvlGr2 = (+this.Sch_20401.AMaintainGrvlGr2).toFixed(2) || "0.00";

    //First(B): Calculation
    this.Sch_20401.AGr150cost = ((parseFloat(this.Sch_20401.AGr1CostprevYr) + parseFloat(this.Sch_20401.AGr1CostcurrYr)) * 0.5).toFixed(2);
    this.Sch_20401.AGr150comp = ((parseFloat(this.Sch_20401.AGr1TcompPrev) + parseFloat(this.Sch_20401.AGr1TcompCurr)) * 0.5).toFixed(2);
    this.Sch_20401.AGr1Restval = (parseFloat(this.Sch_20401.AGr1Grbal) + parseFloat(this.Sch_20401.AGr150cost) - parseFloat(this.Sch_20401.AGr150comp)).toFixed(2);
    this.Sch_20401.AGr1DeprAmt = (parseFloat(this.Sch_20401.AGr1Restval) * (parseFloat(this.Sch_20401.AGr1Ratio) / 100)).toFixed(2);
    this.Sch_20401.AGr1RestvalCurr1 = (parseFloat(this.Sch_20401.AGr1Restval) - parseFloat(this.Sch_20401.AGr1DeprAmt)).toFixed(2);
    this.Sch_20401.AGr14excess = parseFloat(this.Sch_20401.AMaintainGrvlGr1) > (parseFloat(this.Sch_20401.AGr1RestvalCurr1) * 0.04) ? (parseFloat(this.Sch_20401.AMaintainGrvlGr1) - (parseFloat(this.Sch_20401.AGr1RestvalCurr1) * 0.04)).toFixed(2) : "0.00";
    this.Sch_20401.AGr1RestvalCurr2 = (parseFloat(this.Sch_20401.AGr1RestvalCurr1) + parseFloat(this.Sch_20401.AMaintainGrvlGr1)).toFixed(2);

    this.calTotalDepreciation();
  }

  calDepreciationC() {
    this.Sch_20401.AGr2Grbal = (+this.Sch_20401.AGr2Grbal).toFixed(2) || "0.00";
    this.Sch_20401.AGr2CostprevYr = (+this.Sch_20401.AGr2CostprevYr).toFixed(2) || "0.00";
    this.Sch_20401.AGr2CostcurrYr = (+this.Sch_20401.AGr2CostcurrYr).toFixed(2) || "0.00";
    this.Sch_20401.AGr2TcompPrev = (+this.Sch_20401.AGr2TcompPrev).toFixed(2) || "0.00";
    this.Sch_20401.AGr2TcompCurr = (+this.Sch_20401.AGr2TcompCurr).toFixed(2) || "0.00";

    // Second(C): Calculation
    this.Sch_20401.AGr250cost = ((parseFloat(this.Sch_20401.AGr2CostprevYr) + parseFloat(this.Sch_20401.AGr2CostcurrYr)) * 0.5).toFixed(2);
    this.Sch_20401.AGr250comp = ((parseFloat(this.Sch_20401.AGr2TcompPrev) + parseFloat(this.Sch_20401.AGr2TcompCurr)) * 0.5).toFixed(2);
    this.Sch_20401.AGr2Restval = (parseFloat(this.Sch_20401.AGr2Grbal) + parseFloat(this.Sch_20401.AGr250cost) - parseFloat(this.Sch_20401.AGr250comp)).toFixed(2);
    this.Sch_20401.AGr2DepAmt = (parseFloat(this.Sch_20401.AGr2Restval) * (parseFloat(this.Sch_20401.AGr2Ratio) / 100)).toFixed(2);
    this.Sch_20401.AGr2RestvalCurr1 = (parseFloat(this.Sch_20401.AGr2Restval) - parseFloat(this.Sch_20401.AGr2DepAmt)).toFixed(2);
    this.Sch_20401.AGr24excess = parseFloat(this.Sch_20401.AMaintainGrvlGr2) > (parseFloat(this.Sch_20401.AGr2RestvalCurr1) * 0.04) ? (parseFloat(this.Sch_20401.AMaintainGrvlGr2) - (parseFloat(this.Sch_20401.AGr2RestvalCurr1) * 0.04)).toFixed(2) : "0.00";
    this.Sch_20401.AGr2RestvalCurr2 = (parseFloat(this.Sch_20401.AGr2RestvalCurr1) + parseFloat(this.Sch_20401.AMaintainGrvlGr2)).toFixed(2);

    this.calTotalDepreciation();
  }

  calDepreciationD() {
    this.Sch_20401.AGr3Grbal = (+this.Sch_20401.AGr3Grbal).toFixed(2) || "0.00";
    this.Sch_20401.AGr3CostprevYr = (+this.Sch_20401.AGr3CostprevYr).toFixed(2) || "0.00";
    this.Sch_20401.AGr3CostcurrYr = (+this.Sch_20401.AGr3CostcurrYr).toFixed(2) || "0.00";
    this.Sch_20401.AGr3TcompPrev = (+this.Sch_20401.AGr3TcompPrev).toFixed(2) || "0.00";
    this.Sch_20401.AGr3TcompCurr = (+this.Sch_20401.AGr3TcompCurr).toFixed(2) || "0.00";
    this.Sch_20401.AMaintainGrvlGr3 = (+this.Sch_20401.AMaintainGrvlGr3).toFixed(2) || "0.00";

    //Third(D): Calculation
    this.Sch_20401.AGr350cost = ((parseFloat(this.Sch_20401.AGr3CostprevYr) + parseFloat(this.Sch_20401.AGr3CostcurrYr)) * 0.5).toFixed(2);
    this.Sch_20401.AGr350comp = ((parseFloat(this.Sch_20401.AGr3TcompPrev) + parseFloat(this.Sch_20401.AGr3TcompCurr)) * 0.5).toFixed(2);
    this.Sch_20401.AGr3Restval = (parseFloat(this.Sch_20401.AGr3Grbal) + parseFloat(this.Sch_20401.AGr350cost) - parseFloat(this.Sch_20401.AGr350comp)).toFixed(2);
    this.Sch_20401.AGr3DeprAmt = (parseFloat(this.Sch_20401.AGr3Restval) * (parseFloat(this.Sch_20401.AGr3Ratio) / 100)).toFixed(2);
    this.Sch_20401.AGr3RestvalCurr1 = (parseFloat(this.Sch_20401.AGr3Restval) - parseFloat(this.Sch_20401.AGr3DeprAmt)).toFixed(2);
    this.Sch_20401.AGr34excess = parseFloat(this.Sch_20401.AMaintainGrvlGr3) > (parseFloat(this.Sch_20401.AGr3RestvalCurr1) * 0.04) ? (parseFloat(this.Sch_20401.AMaintainGrvlGr3) - (parseFloat(this.Sch_20401.AGr3RestvalCurr1) * 0.04)).toFixed(2) : "0.00";
    this.Sch_20401.AGr3RestvalCurr2 = (parseFloat(this.Sch_20401.AGr3RestvalCurr1) + parseFloat(this.Sch_20401.AMaintainGrvlGr3)).toFixed(2);

    this.calTotalDepreciation();
  }

  calDepreciationE() {
    this.Sch_20401.AGr4Grbal = (+this.Sch_20401.AGr4Grbal).toFixed(2) || "0.00";
    this.Sch_20401.AGr4CostprevYr = (+this.Sch_20401.AGr4CostprevYr).toFixed(2) || "0.00";
    this.Sch_20401.AGr4CostcurrYr = (+this.Sch_20401.AGr4CostcurrYr).toFixed(2) || "0.00";
    this.Sch_20401.AGr4TcompPrev = (+this.Sch_20401.AGr4TcompPrev).toFixed(2) || "0.00";
    this.Sch_20401.AGr4TcompCurr = (+this.Sch_20401.AGr4TcompCurr).toFixed(2) || "0.00";
    this.Sch_20401.AMaintainGrvlGr4 = (+this.Sch_20401.AMaintainGrvlGr4).toFixed(2) || "0.00";

    //Fourth(E): Calculation
    this.Sch_20401.AGr450cost = ((parseFloat(this.Sch_20401.AGr4CostprevYr) + parseFloat(this.Sch_20401.AGr4CostcurrYr)) * 0.5).toFixed(2);
    this.Sch_20401.AGr450comp = ((parseFloat(this.Sch_20401.AGr4TcompPrev) + parseFloat(this.Sch_20401.AGr4TcompCurr)) * 0.5).toFixed(2);
    this.Sch_20401.AGr4Restval = (parseFloat(this.Sch_20401.AGr4Grbal) + parseFloat(this.Sch_20401.AGr450cost) - parseFloat(this.Sch_20401.AGr450comp)).toFixed(2);
    this.Sch_20401.AGr4DepAmt = (parseFloat(this.Sch_20401.AGr4Restval) * (parseFloat(this.Sch_20401.AGr4Ratio) / 100)).toFixed(2);
    this.Sch_20401.AGr4RestvalCurr1 = (parseFloat(this.Sch_20401.AGr4Restval) - parseFloat(this.Sch_20401.AGr4DepAmt)).toFixed(2);
    this.Sch_20401.AGr44excess = parseFloat(this.Sch_20401.AMaintainGrvlGr4) > (parseFloat(this.Sch_20401.AGr4RestvalCurr1) * 0.04) ? (parseFloat(this.Sch_20401.AMaintainGrvlGr4) - (parseFloat(this.Sch_20401.AGr4RestvalCurr1) * 0.04)).toFixed(2) : "0.00";
    this.Sch_20401.AGr4RestvalCurr2 = (parseFloat(this.Sch_20401.AGr4RestvalCurr1) + parseFloat(this.Sch_20401.AMaintainGrvlGr4)).toFixed(2);

    this.calTotalDepreciation();
  }

  calDepreciationF() {
    this.Sch_20401.AGr5Grbal = (+this.Sch_20401.AGr5Grbal).toFixed(2) || "0.00";
    this.Sch_20401.AGr5CostprevYr = (+this.Sch_20401.AGr5CostprevYr).toFixed(2) || "0.00";
    this.Sch_20401.AGr5CostcurrYr = (+this.Sch_20401.AGr5CostcurrYr).toFixed(2) || "0.00";
    this.Sch_20401.AGr5TcompPrev = (+this.Sch_20401.AGr5TcompPrev).toFixed(2) || "0.00";
    this.Sch_20401.AGr5TcompCurr = (+this.Sch_20401.AGr5TcompCurr).toFixed(2) || "0.00";
    this.Sch_20401.AMaintainGrvlGr5 = (+this.Sch_20401.AMaintainGrvlGr5).toFixed(2) || "0.00";

    //Fifth(F): Calculation
    this.Sch_20401.AGr550cost = ((parseFloat(this.Sch_20401.AGr5CostprevYr) + parseFloat(this.Sch_20401.AGr5CostcurrYr)) * 0.5).toFixed(2);
    this.Sch_20401.AGr550comp = ((parseFloat(this.Sch_20401.AGr5TcompPrev) + parseFloat(this.Sch_20401.AGr5TcompCurr)) * 0.5).toFixed(2);
    this.Sch_20401.AGr5Restval = (parseFloat(this.Sch_20401.AGr5Grbal) + parseFloat(this.Sch_20401.AGr550cost) - parseFloat(this.Sch_20401.AGr550comp)).toFixed(2);
    this.Sch_20401.AGr5DeprAmt = (parseFloat(this.Sch_20401.AGr5Restval) * (parseFloat(this.Sch_20401.AGr5Ratio) / 100)).toFixed(2);
    this.Sch_20401.AGr5RestvalCurr1 = (parseFloat(this.Sch_20401.AGr5Restval) - parseFloat(this.Sch_20401.AGr5DeprAmt)).toFixed(2);
    this.Sch_20401.AGr54excess = parseFloat(this.Sch_20401.AMaintainGrvlGr5) > (parseFloat(this.Sch_20401.AGr5RestvalCurr1) * 0.04) ? (parseFloat(this.Sch_20401.AMaintainGrvlGr5) - (parseFloat(this.Sch_20401.AGr5RestvalCurr1) * 0.04)).toFixed(2) : "0.00";
    this.Sch_20401.AGr5RestvalCurr2 = (parseFloat(this.Sch_20401.AGr5RestvalCurr1) + parseFloat(this.Sch_20401.AMaintainGrvlGr5)).toFixed(2);

    this.calTotalDepreciation();
  }

  calTotalDepreciation() {
    this.Total1 = (parseFloat(this.Sch_20401.ALdGrbal) + parseFloat(this.Sch_20401.AGr1Grbal) + parseFloat(this.Sch_20401.AGr2Grbal) + parseFloat(this.Sch_20401.AGr3Grbal) + parseFloat(this.Sch_20401.AGr4Grbal) + parseFloat(this.Sch_20401.AGr5Grbal)).toFixed(2);
    this.Total2 = (parseFloat(this.Sch_20401.ALdCostprevYr) + parseFloat(this.Sch_20401.AGr1CostprevYr) + parseFloat(this.Sch_20401.AGr2CostprevYr) + parseFloat(this.Sch_20401.AGr3CostprevYr) + parseFloat(this.Sch_20401.AGr4CostprevYr) + parseFloat(this.Sch_20401.AGr5CostprevYr)).toFixed(2);
    this.Total3 = (parseFloat(this.Sch_20401.ALdCostcurrYr) + parseFloat(this.Sch_20401.AGr1CostcurrYr) + parseFloat(this.Sch_20401.AGr2CostcurrYr) + parseFloat(this.Sch_20401.AGr3CostcurrYr) + parseFloat(this.Sch_20401.AGr4CostcurrYr) + parseFloat(this.Sch_20401.AGr5CostcurrYr)).toFixed(2);
    this.Total4 = (parseFloat(this.Sch_20401.ALd50cost) + parseFloat(this.Sch_20401.AGr150cost) + parseFloat(this.Sch_20401.AGr250cost) + parseFloat(this.Sch_20401.AGr350cost) + parseFloat(this.Sch_20401.AGr450cost) + parseFloat(this.Sch_20401.AGr550cost)).toFixed(2);
    this.Total5 = (parseFloat(this.Sch_20401.ALdTcompPrev) + parseFloat(this.Sch_20401.AGr1TcompPrev) + parseFloat(this.Sch_20401.AGr2TcompPrev) + parseFloat(this.Sch_20401.AGr3TcompPrev) + parseFloat(this.Sch_20401.AGr4TcompPrev) + parseFloat(this.Sch_20401.AGr5TcompPrev)).toFixed(2);
    this.Total6 = (parseFloat(this.Sch_20401.ALdTcomp) + parseFloat(this.Sch_20401.AGr1TcompCurr) + parseFloat(this.Sch_20401.AGr2TcompCurr) + parseFloat(this.Sch_20401.AGr3TcompCurr) + parseFloat(this.Sch_20401.AGr4TcompCurr) + parseFloat(this.Sch_20401.AGr5TcompCurr)).toFixed(2);
    this.Total7 = (parseFloat(this.Sch_20401.ALd50comp) + parseFloat(this.Sch_20401.AGr150comp) + parseFloat(this.Sch_20401.AGr250comp) + parseFloat(this.Sch_20401.AGr350comp) + parseFloat(this.Sch_20401.AGr450comp) + parseFloat(this.Sch_20401.AGr550comp)).toFixed(2);
    this.Total8 = (parseFloat(this.Sch_20401.ALdRestval) + parseFloat(this.Sch_20401.AGr1Restval) + parseFloat(this.Sch_20401.AGr2Restval) + parseFloat(this.Sch_20401.AGr3Restval) + parseFloat(this.Sch_20401.AGr4Restval) + parseFloat(this.Sch_20401.AGr5Restval)).toFixed(2);
    this.Total10 = (parseFloat(this.Sch_20401.ALdDeprAmt) + parseFloat(this.Sch_20401.AGr1DeprAmt) + parseFloat(this.Sch_20401.AGr2DepAmt) + parseFloat(this.Sch_20401.AGr3DeprAmt) + parseFloat(this.Sch_20401.AGr4DepAmt) + parseFloat(this.Sch_20401.AGr5DeprAmt)).toFixed(2);
    this.Total11 = (parseFloat(this.Sch_20401.ALdRestvalCurr1) + parseFloat(this.Sch_20401.AGr1RestvalCurr1) + parseFloat(this.Sch_20401.AGr2RestvalCurr1) + parseFloat(this.Sch_20401.AGr3RestvalCurr1) + parseFloat(this.Sch_20401.AGr4RestvalCurr1) + parseFloat(this.Sch_20401.AGr5RestvalCurr1)).toFixed(2);
    this.Total12 = (parseFloat(this.Sch_20401.AMaintainGrvlLd) + parseFloat(this.Sch_20401.AMaintainGrvlGr1) + parseFloat(this.Sch_20401.AMaintainGrvlGr2) + parseFloat(this.Sch_20401.AMaintainGrvlGr3) + parseFloat(this.Sch_20401.AMaintainGrvlGr4) + parseFloat(this.Sch_20401.AMaintainGrvlGr5)).toFixed(2);
    this.Total13 = (parseFloat(this.Sch_20401.ALd4excess) + parseFloat(this.Sch_20401.AGr14excess) + parseFloat(this.Sch_20401.AGr24excess) + parseFloat(this.Sch_20401.AGr34excess) + parseFloat(this.Sch_20401.AGr44excess) + parseFloat(this.Sch_20401.AGr54excess)).toFixed(2);
    this.Total14 = (parseFloat(this.Sch_20401.ALdRestvalCurr2) + parseFloat(this.Sch_20401.AGr1RestvalCurr2) + parseFloat(this.Sch_20401.AGr2RestvalCurr2) + parseFloat(this.Sch_20401.AGr3RestvalCurr2) + parseFloat(this.Sch_20401.AGr4RestvalCurr2) + parseFloat(this.Sch_20401.AGr5RestvalCurr2)).toFixed(2);

    this.Sch_20401.AAmtTaxDepr = this.Total10;
    this.Sch_20401.AAmtBookDepr = this.taxPayerDetails.AConsumption;
    this.Sch_20401.ANetAssetDiff = (parseFloat(this.Sch_20401.AAmtBookDepr) - parseFloat(this.Sch_20401.AAmtTaxDepr)).toFixed(2);
    this.Sch_20401.AAdditionalCost = ((parseFloat(this.Total3) - parseFloat(this.Sch_20401.ALdCostcurrYr)) * 0.5).toFixed(2);
    this.Sch_20401.ACompensationAsset = ((parseFloat(this.Total5) - parseFloat(this.Sch_20401.ALdTcompPrev)) * 0.5).toFixed(2);
    this.Sch_20401.ATotAssetAmount = (parseFloat(this.Total14) + (parseFloat(this.Sch_20401.AAdditionalCost) - parseFloat(this.Sch_20401.ACompensationAsset))).toFixed(2);
  }

  SaveA1() {
    this.taxPayerDetails.AOtherAdjust = this.totalA1.toFixed(2);
    let FormGuid=this.taxPayerDetails.Sch_20499Set["results"][0]["FormGuid"];
    let RankingOrder=this.taxPayerDetails.Sch_20499Set["results"][0]["RankingOrder"];
    this.taxPayerDetails.Sch_20499Set["results"] = [];
    for (let i = 0; i < this.Others20499Set.controls.length; i++) {
      this.taxPayerDetails.Sch_20499Set["results"].push({});
      this.taxPayerDetails.Sch_20499Set["results"][i]["LineNo"] = i + 1;
      this.taxPayerDetails.Sch_20499Set["results"][i]["Description"] = this.Others20499Set.controls[i].value.Description;
      this.taxPayerDetails.Sch_20499Set["results"][i]["Amount"] = this.Others20499Set.controls[i].value.Amount;
      this.taxPayerDetails.Sch_20499Set["results"][i]["FormGuid"] = FormGuid;
      this.taxPayerDetails.Sch_20499Set["results"][i]["RankingOrder"] = RankingOrder;
    }
    jQuery("#others20499").modal('hide');
    this.calAdjustmentsTab();
    this.calTotalA1();
  }
  SaveA2() {
    this.taxPayerDetails.AOtherContainer = this.totalA2.toFixed(2);
    let FormGuid=this.taxPayerDetails.Sch_20699Set["results"][0]["FormGuid"];
    let RankingOrder=this.taxPayerDetails.Sch_20699Set["results"][0]["RankingOrder"];
    this.taxPayerDetails.Sch_20699Set["results"] = [];
    for (let i = 0; i < this.Others20699Set.controls.length; i++) {
      this.taxPayerDetails.Sch_20699Set["results"].push({});
      this.taxPayerDetails.Sch_20699Set["results"][i]["LineNo"] = i + 1;
      this.taxPayerDetails.Sch_20699Set["results"][i]["Description"] = this.Others20699Set.controls[i].value.Description;
      this.taxPayerDetails.Sch_20699Set["results"][i]["Amount"] = this.Others20699Set.controls[i].value.Amount;
      this.taxPayerDetails.Sch_20699Set["results"][i]["FormGuid"] = FormGuid;
      this.taxPayerDetails.Sch_20699Set["results"][i]["RankingOrder"] = RankingOrder;
    }
    jQuery("#others20699").modal('hide');
    this.calAdjustmentsTab();
    this.calTotalA2();
  }
  SaveDepreciation() {
    this.taxPayerDetails.ADiffConsumption = this.Sch_20401.ANetAssetDiff;
    this.taxPayerDetails.Sch_20401 = this.Sch_20401;
    jQuery("#depreciation").modal('hide');
    this.calAdjustmentsTab();
  }

  calAdjustmentsTab() {
    this.CalculateTotals();
    this.taxPayerDetails.ACapital = (+this.taxPayerDetails.ACapital).toFixed(2) || "0.00";
    this.taxPayerDetails.ARetainEarn = (+this.taxPayerDetails.ARetainEarn).toFixed(2) || "0.00";
    this.taxPayerDetails.AReserve = (+this.taxPayerDetails.AReserve).toFixed(2) || "0.00";
    this.taxPayerDetails.ALoan = (+this.taxPayerDetails.ALoan).toFixed(2) || "0.00";
    this.taxPayerDetails.ACreditor = (+this.taxPayerDetails.ACreditor).toFixed(2) || "0.00";

    this.taxPayerDetails.AProvResChrg = this.taxPayerDetails.AProvRes;
    this.taxPayerDetails.AAdjustTotal = (parseFloat(this.taxPayerDetails.ADiffConsumption) + parseFloat(this.taxPayerDetails.AProvResChrg) + parseFloat(this.taxPayerDetails.AOtherAdjust)).toFixed(2);
    this.taxPayerDetails.ANetAdjustRes = (parseFloat(this.taxPayerDetails.ANetProfit) + parseFloat(this.taxPayerDetails.AAdjustTotal)).toFixed(2);
    //(20604 Reserves) Reserves and Provisions(Balance at the Beginning of the year	Col 2- Used During the year	col 4)
    this.taxPayerDetails.AProvision = (this.ReservesAndProvisonsForm.value.TotalBalanceatthebeginningoftheyear - this.ReservesAndProvisonsForm.value.TotalUsedDuringtheyear).toFixed(2);
    this.taxPayerDetails.AVesselTaxTotal = (parseFloat(this.taxPayerDetails.ACapital) + parseFloat(this.taxPayerDetails.ARetainEarn) + parseFloat(this.taxPayerDetails.AProvision) + parseFloat(this.taxPayerDetails.AReserve) + parseFloat(this.taxPayerDetails.ALoan) + parseFloat(this.taxPayerDetails.ACreditor) + parseFloat(this.taxPayerDetails.AOtherContainer) + parseFloat(this.taxPayerDetails.ANetAdjustRes)).toFixed(2);
    console.log(this.taxPayerDetails.AVesselTaxTotal);
  }

  BasisUsed(event) {
    if (event.target.value == "Accrual") {
      this.taxPayerDetails.Baccrual = "true";
      this.Accrual = "Accrual";
    } else {
      this.taxPayerDetails.Baccrual = "false";
      this.Accrual = "";
    }
    if (event.target.value == "Cash") {
      this.taxPayerDetails.Bcash = "true";
      this.Cash = "Cash";
    } else {
      this.taxPayerDetails.Bcash = "false";
      this.Cash = "";
    }
    if (event.target.value == "Amended Cash") {
      this.taxPayerDetails.Bamcash = "true";
      this.AmendedCash = "Amended Cash";
    } else {
      this.taxPayerDetails.Bamcash = "false";
      this.AmendedCash = "";
    }
  }

  WeightedApplicable(event) {
    if (event.target.checked) {
      this.WeightedMethod = true;
      this.taxPayerDetails.Bweighavg = "true";
      this.taxPayerDetails.Bweighavgn = "false";
      
    } else {
      this.WeightedMethod = false;
      this.taxPayerDetails.Bweighavg = "false";
      this.taxPayerDetails.Bweighavgn = "true";
      this.taxPayerDetails.AWeightedSet="";
    }
    // AWeightedSet if no
  }

  MarketApplicable(event) {
    if (event.target.checked) {
      this.MarketMethod = true;
      this.taxPayerDetails.Bmarkval = "true";
      this.taxPayerDetails.Bmarkvaln = "false";
    } else {
      this.MarketMethod = false;
      this.taxPayerDetails.Bmarkval = "false";
      this.taxPayerDetails.Bmarkvaln = "true";
      this.taxPayerDetails.AMarketcstSet="";
    }
    // AMarketcstSet if no
  }
  ArabicApplicable(event) {
    if (event.target.checked) {
      this.ArabicBooks = true;
      this.taxPayerDetails.Bbooks = "true";
      this.taxPayerDetails.Bbooksn = "false";
    } else {
      this.ArabicBooks = false;
      this.taxPayerDetails.Bbooks = "false";
      this.taxPayerDetails.Bbooksn = "true";
    }
  }
  //Ended by Phani

  getZakatCalculatedAmount(regIdz,periodkey,zakatamt)
  {
    this.retService.geZakatCalculatedAmount(regIdz,periodkey,zakatamt).subscribe(data=>{
      this.Betrh=data["d"]["ZakatAmt"];
    });
  }
  DownloadAcknowledgement()
  {
    this.retService.DownloadInvoiceForm3(this.taxPayerDetails.Fbnumz).subscribe((data:any) => {
      FileSaver.saveAs(data, "Form2Acknowledgement.pdf");
  })
  }
  DownloadForm()
  {
    this.url= this.sanitizer.bypassSecurityTrustResourceUrl( environment.url + "sap/opu/odata/SAP/Z_GET_COVER_FORM_SRV/cover_formSet(Fbnum='"+this.taxPayerDetails.Fbnumz+"')/$value");
    // this.retService.onDownloadForm(this.taxPayerDetails.Fbnumz).subscribe((data: any) => {
    //   FileSaver.saveAs(data, "Form2Form.pdf");
    // })
  }
  ValidateForms()
  {
    for(let pi=0;pi<this.Incomes.controls.length;pi++)
    {
      this.Incomes.controls[pi].patchValue({'OriginalValueOfContract':parseFloat(this.Incomes.controls[pi].value.OriginalValueOfContract).toFixed(2)});
      this.Incomes.controls[pi].patchValue({'AdjustmentToTheContract':parseFloat(this.Incomes.controls[pi].value.AdjustmentToTheContract).toFixed(2)});
      this.Incomes.controls[pi].patchValue({'ValueOfPreviousYears':parseFloat(this.Incomes.controls[pi].value.ValueOfPreviousYears).toFixed(2)});
      this.Incomes.controls[pi].patchValue({'ValueOfCurrentYear':parseFloat(this.Incomes.controls[pi].value.ValueOfCurrentYear).toFixed(2)});
    }
    for(let pi=0;pi<this.otherIncomesSet.controls.length;pi++)
    {
      this.otherIncomesSet.controls[pi].patchValue({'Amount':parseFloat(this.otherIncomesSet.controls[pi].value.Amount).toFixed(2)});
    }
    for(let pi=0;pi<this.directExpenseSet.controls.length;pi++)
    {
      this.directExpenseSet.controls[pi].patchValue({'Amount':parseFloat(this.directExpenseSet.controls[pi].value.Amount).toFixed(2)});
    }
    for(let pi=0;pi<this.SubContractorSet.controls.length;pi++)
    {
      this.SubContractorSet.controls[pi].patchValue({'ValueOfWorkExecuted':parseFloat(this.SubContractorSet.controls[pi].value.ValueOfWorkExecuted).toFixed(2)});
    }
    for(let pi=0;pi<this.ProfessionalFeesSet.controls.length;pi++)
    {
      this.ProfessionalFeesSet.controls[pi].patchValue({'Amount':parseFloat(this.ProfessionalFeesSet.controls[pi].value.Amount).toFixed(2)});
    }
    for(let pi=0;pi<this.Others20299Set.controls.length;pi++)
    {
      this.Others20299Set.controls[pi].patchValue({'Amount':parseFloat(this.Others20299Set.controls[pi].value.Amount).toFixed(2)});
    }    
    for(let pi=0;pi<this.DAP1.controls.length;pi++)
    {
      this.DAP1.controls[pi].patchValue({'Amount':parseFloat(this.DAP1.controls[pi].value.Amount).toFixed(2)});
    } 
    for(let pi=0;pi<this.DAP2.controls.length;pi++)
    {
      this.DAP2.controls[pi].patchValue({'Amount':parseFloat(this.DAP2.controls[pi].value.Amount).toFixed(2)});
    } 
    for(let pi=0;pi<this.DAP3.controls.length;pi++)
    {
      this.DAP3.controls[pi].patchValue({'Amount':parseFloat(this.DAP3.controls[pi].value.Amount).toFixed(2)});
    } 
    for(let pi=0;pi<this.DAP4.controls.length;pi++)
    {
      this.DAP4.controls[pi].patchValue({'Amount':parseFloat(this.DAP4.controls[pi].value.Amount).toFixed(2)});
    } 
    for(let pi=0;pi<this.ReservesProvisionsSet.controls.length;pi++)
    {
      this.ReservesProvisionsSet.controls[pi].patchValue({'BalanceattheBeginning':parseFloat(this.ReservesProvisionsSet.controls[pi].value.BalanceattheBeginning).toFixed(2)});
      this.ReservesProvisionsSet.controls[pi].patchValue({'FormedDuringtheyear':parseFloat(this.ReservesProvisionsSet.controls[pi].value.FormedDuringtheyear).toFixed(2)});
      this.ReservesProvisionsSet.controls[pi].patchValue({'UsedDuringtheyear':parseFloat(this.ReservesProvisionsSet.controls[pi].value.UsedDuringtheyear).toFixed(2)});
    }   
  }
  SaveForm2()
  {
    this.taxPayerDetails.ARevOthActChk=this.OtherIncomeForm.value.Schedule?"1":"2";
    this.taxPayerDetails.ANetFixAssetChk=this.DAP1Form.value.Schedule?"1":"2";
    this.taxPayerDetails.AInvestmentChk=this.DAP2Form.value.Schedule?"1":"2";
    this.taxPayerDetails.AEstExpenseChk=this.DAP3Form.value.Schedule?"1":"2";
    this.taxPayerDetails.AOtherInvstChk=this.DAP4Form.value.Schedule?"1":"2";
    this.taxPayerDetails.AOtherAdjustChk=this.Others20499Form.value.Schedule?"1":"2";
    this.taxPayerDetails.AOtherContainerChk=this.Others20699Form.value.Schedule?"1":"2";    
    this.taxPayerDetails.Savez="X";
    this.retService.SaveForm2(this.taxPayerDetails).subscribe((data)=>{
      console.log(data);
      this.taxPayerDetails=data["d"];      
      this.getZakatCalculatedAmount(this.taxPayerDetails.RegIdz,this.taxPayerDetails.PeriodKeyz,this.taxPayerDetails.AZakat);
    });
  }
  NotApplicableApply(value)
  {    
    if(this.notApplicableAction=="20101")
    {   
      if(value)
      {
        this.IncomeFromMainActivityForm.patchValue({'Schedule':false});
        this.clearFormArray(this.Incomes);   
        this.AddIncomeRow();
        this.TotalIncomeCalculation();
        this.CalculateTotals();
        this.taxPayerDetails.ARevMainAct = this.IncomeFromMainActivityForm.value.TotalValueOfRemainingWork;
        this.taxPayerDetails.Sch_20101Set["results"]=[];
        this.SaveForm2();
        jQuery('#switch20101').prop('checked',false);
        jQuery("#NotApplicableForm").modal('hide');
      }
      else
      {
        this.IncomeFromMainActivityForm.patchValue({'Schedule':true});
        jQuery('#switch20101').prop('checked',true);
      }
      
    }
    else if(this.notApplicableAction=="20102")
    {   
      if(value)
      {
        this.OtherIncomeForm.patchValue({'Schedule':false});
        this.clearFormArray(this.otherIncomesSet);
        this.AddOtherIncomeRow();
        this.TotalOtherIncomeCalculation();
        this.taxPayerDetails.ARevOthAct = parseFloat(this.OtherIncomeForm.value.Totals.toString()).toFixed(2);    
        this.taxPayerDetails.Sch_20102Set["results"]=[];
        this.SaveForm2();
        jQuery('#switch20102').prop('checked',false);
        jQuery("#NotApplicableForm").modal('hide');
      }
      else
      {
        this.OtherIncomeForm.patchValue({'Schedule':true});
        jQuery('#switch20102').prop('checked',true);
      }
      
    }
    else if(this.notApplicableAction=="20204")
    {   
      if(value)
      {
        this.DirectExpenseForm.patchValue({'Schedule':false});
        this.clearFormArray(this.directExpenseSet);
        this.AddDirectExpenseRow();
        this.TotalDirectExpenseCalculation();
        this.taxPayerDetails.ADirectExp =parseFloat(this.DirectExpenseForm.value.Totals).toFixed(2); 
        this.taxPayerDetails.Sch_20204Set["results"]=[];
        this.SaveForm2();
        jQuery('#switch20204').prop('checked',false);
        jQuery("#NotApplicableForm").modal('hide');
      }
      else
      {
        this.DirectExpenseForm.patchValue({'Schedule':true});
        jQuery('#switch20204').prop('checked',true);
      }
      
    }
    else if(this.notApplicableAction=="20206")
    {   
      if(value)
      {
        this.SubContractorsForm.patchValue({'Schedule':false});
        this.clearFormArray(this.SubContractorSet);
        this.AddSubContractorRow();
        this.TotalSubContractorCalculation();
        this.taxPayerDetails.ASubcontractors = this.SubContractorsForm.value.Total;
        this.taxPayerDetails.Sch_20206Set["results"]=[];
        this.SaveForm2();
        jQuery('#switch20206').prop('checked',false);
        jQuery("#NotApplicableForm").modal('hide');
      }
      else
      {
        this.SubContractorsForm.patchValue({'Schedule':true});
        jQuery('#switch20206').prop('checked',true);
      }
    }
    else if(this.notApplicableAction=="20208")
    {   
      if(value)
      {
        this.ConsultingProfessionalFeesForm.patchValue({'Schedule':false});
        this.clearFormArray(this.ProfessionalFeesSet);
        this.AddProfessionalFeeRow();
        this.TotalFeeCalculation();
        this.taxPayerDetails.AFees =parseFloat(this.ConsultingProfessionalFeesForm.value.Total).toFixed(2); 
        this.taxPayerDetails.Sch_20208Set["results"]=[];
        this.SaveForm2();
        jQuery('#switch20208').prop('checked',false);
        jQuery("#NotApplicableForm").modal('hide');
      }
      else
      {
        this.ConsultingProfessionalFeesForm.patchValue({'Schedule':true});
        jQuery('#switch20208').prop('checked',true);
      }
    }
    else if(this.notApplicableAction=="20209")
    {   
      if(value)
      {
        this.ReservesAndProvisonsForm.patchValue({'Schedule':false});
        this.clearFormArray(this.ReservesProvisionsSet);
        this.AddReservesRow();
        this.TotalReservesAndProvisions();
        this.taxPayerDetails.AProvRes = this.ReservesAndProvisonsForm.value.TotalBalance;
        this.taxPayerDetails.Sch_20209Set["results"]=[];
        this.SaveForm2();
        jQuery('#switch20209').prop('checked',false);
        jQuery("#NotApplicableForm").modal('hide');
      }
      else
      {
        this.ReservesAndProvisonsForm.patchValue({'Schedule':true});
        jQuery('#switch20209').prop('checked',true);
      }
    }
    else if(this.notApplicableAction=="20299")
    {   
      if(value)
      {
        this.Others20299Form.patchValue({'Schedule':false});
        this.clearFormArray(this.Others20299Set);
        this.AddOthers20299();
        this.TotalOthers20299Calculation();
        this.taxPayerDetails.AOtherExp =parseFloat(this.Others20299Form.value.Total).toFixed(2); 
        this.taxPayerDetails.Sch_20299Set["results"]=[];
        this.SaveForm2();
        jQuery('#switch20299').prop('checked',false);
        jQuery("#NotApplicableForm").modal('hide');
      }
      else
      {
        this.Others20299Form.patchValue({'Schedule':true});
        jQuery('#switch20299').prop('checked',true);
      }
    }
    else if(this.notApplicableAction=="20401")
    {   
      if(value)
      {
        this.DepreciationIsApplicable = false;
        this.Sch_20401 = this.Sch_20401Temp;
        this.calDepreciationA();
        this.calDepreciationB();
        this.calDepreciationC();
        this.calDepreciationD();
        this.calDepreciationE();
        this.calDepreciationF();
        this.taxPayerDetails.ADiffConsumption = "0.00";
        jQuery("#depreciation").modal('hide');
        this.SaveForm2();
        jQuery('#switchDD01').prop('checked',false);
        jQuery("#NotApplicableForm").modal('hide');
      }
      else
      {
        this.DepreciationIsApplicable = true;
        jQuery('#switchDD01').prop('checked',true);
      }
    }

    else if(this.notApplicableAction=="20499")
    {   
      if(value)
      {
        this.Others20499Form.patchValue({'Schedule':false});
        this.clearFormArray(this.Others20499Set);
        this.AddOthers20499();
        this.calTotalA1();
        this.taxPayerDetails.Sch_20499Set["results"]=[];
        console.log(this.taxPayerDetails.AOtherAdjust);
        this.SaveForm2();
        jQuery('#switchA202').prop('checked',false);
        jQuery("#NotApplicableForm").modal('hide');
      }
      else
      {
        this.Others20499Form.patchValue({'Schedule':true});
        jQuery('#switchA202').prop('checked',true);
      }
    }
    else if(this.notApplicableAction=="20699")
    {   
      if(value)
      {
        this.Others20699Form.patchValue({'Schedule':false});
        this.clearFormArray(this.Others20699Set);
        this.AddOthers20699();
        this.calTotalA2();
        this.taxPayerDetails.AOtherContainer = this.totalA2.toFixed(2);
        this.taxPayerDetails.Sch_20699Set["results"]=[];
        this.SaveForm2();
        jQuery('#switchA301').prop('checked',false);
        jQuery("#NotApplicableForm").modal('hide');
      }
      else
      {
        this.Others20699Form.patchValue({'Schedule':true});
        jQuery('#switchA301').prop('checked',true);
      }
    }
    else if(this.notApplicableAction=="20701")
    {   
      if(value)
      {
        this.DAP1Form.patchValue({'Schedule':false});
        this.clearFormArray(this.DAP1);
        this.AddRowD1();
        this.calCellTotalD1();
        this.taxPayerDetails.ANetFixAsset = this.totalD1.toFixed(2);
        this.taxPayerDetails.Sch_20701Set["results"]=[];
        this.SaveForm2();
        jQuery('#switchDAP1').prop('checked',false);
        jQuery("#NotApplicableForm").modal('hide');
      }
      else
      {
        this.DAP1Form.patchValue({'Schedule':true});
        jQuery('#switchDAP1').prop('checked',true);
      }
    }
    else if(this.notApplicableAction=="20702")
    {   
      if(value)
      {
        this.DAP2Form.patchValue({'Schedule':false});
        this.clearFormArray(this.DAP2);
        this.AddRowD2();
        this.calCellTotalD2();
        this.taxPayerDetails.AInvestment = this.totalD2.toFixed(2);
        this.taxPayerDetails.Sch_20702Set["results"]=[];
        this.SaveForm2();
        jQuery('#switchDAP2').prop('checked',false);
        jQuery("#NotApplicableForm").modal('hide');
      }
      else
      {
        this.DAP2Form.patchValue({'Schedule':true});
        jQuery('#switchDAP2').prop('checked',true);
      }
    }
    else if(this.notApplicableAction=="20704")
    {   
      if(value)
      {
        this.DAP3Form.patchValue({'Schedule':false});
        this.clearFormArray(this.DAP3);
        this.AddRowD3();
        this.calCellTotalD3();
        this.taxPayerDetails.AEstExpense = this.totalD3.toFixed(2);
        this.taxPayerDetails.Sch_20704Set["results"]=[];
        this.SaveForm2();
        jQuery('#switchDAP3').prop('checked',false);
        jQuery("#NotApplicableForm").modal('hide');
      }
      else
      {
        this.DAP3Form.patchValue({'Schedule':true});
        jQuery('#switchDAP3').prop('checked',true);
      }
    }
    else if(this.notApplicableAction=="20799")
    {   
      if(value)
      {
        this.DAP4Form.patchValue({'Schedule':false});
        this.clearFormArray(this.DAP4);
        this.AddRowD4();
        this.calCellTotalD4();
        this.taxPayerDetails.AOtherInvst = this.totalD4.toFixed(2);
        this.taxPayerDetails.Sch_20799Set["results"]=[];
        this.SaveForm2();
        jQuery('#switchDAP4').prop('checked',false);
        jQuery("#NotApplicableForm").modal('hide');
      }
      else
      {
        this.DAP4Form.patchValue({'Schedule':true});
        jQuery('#switchDAP4').prop('checked',true);
      }
    }
  }
  ContractDateChange(pi)
  {
    if((new Date(this.Incomes.controls[pi].value.ContractDate).getTime())>(+(((this.taxPayerDetails.ATo.replace(')', '')).toString().replace('/Date(', '')).toString().replace('/', ''))))
    {
      this.Incomes.controls[pi].patchValue({'ContractDate':''})
    }
  }
  GlobalNumberAllow2(event) {
    console.log(event.target.value)
    // var rgx = /^[0-9]*\.?[0-9]*$/;
    var rgx = /^\d{0,255}?$/;
    console.log(event.target.value);
    if (event.keyCode == 8 || event.keyCode == 190 || event.keyCode == 39) {
      if(!event.target.value.length)
      {
        return event.preventDefault();
      }
      else{
        if(rgx.test((event.target.value).toString().replace(/,/g, '')))
        {
          return true;
        }  
        else
        {
          return event.preventDefault();
        }      
      }      
    }
    else if ((event.keyCode < 48 || event.keyCode > 57) ) {
      return event.preventDefault();
    }
    
  }

}

