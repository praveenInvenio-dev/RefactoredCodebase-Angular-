import { Component, OnInit } from '@angular/core';
import { form8constants } from "src/app/returns/form8/form8constants.model";
import { ActivatedRoute } from '@angular/router';
import { ReturnsService } from '../returns.service';
import { toHijri } from 'hijri-converter';
import * as moment from 'moment';
import { FormGroup, FormBuilder, FormArray, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { CommonValidation } from "src/app/constants/commonValidations";
import { CalendarComponent } from 'src/app/constants/calendar.component';

declare var jQuery;
@Component({
  selector: 'app-form8',
  templateUrl: './form8.component.html',
  styleUrls: ['./form8.component.css']
})
export class Form8Component implements OnInit {
  //purna start
  loginUser: any;
  lang: any;
  direction: string;
  fbGuid: number;
  eUser: number;
  fbNum: number;
  gPart: number;
  step: any = 1;
  taxPayerDetails: any;
  isFormDisable: boolean = false;
  total10100: any = "0.00";
  total10200: any = "0.00";
  total10400: any = "0.00";
  total10500: any = "0.00";
  form10204: FormGroup;
  form10205: FormGroup;
  form10206: FormGroup;
  form10207: FormGroup;
  form10506: FormGroup;
  form10508: FormGroup;
  form10511: FormGroup;
  form10807: FormGroup;
  form10809: FormGroup;
  form10814: FormGroup;
  form10815: FormGroup;
  form10822: FormGroup;
  noOfAddedForms: any = 10;
  total10204: any = "0.00";
  total10205: any = "0.00";
  total10506c1: any = "0.00";
  total10506c2: any = "0.00";
  total10506c3: any = "0.00";
  total10506c4: any = "0.00";
  total10506c5: any = "0.00";
  total10508c1: any = "0.00";
  total10508c2: any = "0.00";
  total10508c3: any = "0.00";
  total10508c4: any = "0.00";
  total10511: any = "0.00";
  total10807: any = "0.00";
  total10809c1: any = "0.00";
  total10809c2: any = "0.00";
  total10809c3: any = "0.00";
  total10809c4: any = "0.00";
  total10809c5: any = "0.00";
  total10814: any = "0.00";
  total10815: any = "0.00";
  total10822: any = "0.00";
  total10206c1: any = "0.00";
  total10206c2: any = "0.00";
  total10206c3: any = "0.00";
  total10206c4: any = "0.00";
  total10206c5: any = "0.00";
  total10206c6: any = "0.00";
  total10206c7: any = "0.00";
  total10206c8: any = "0.00";
  total10206c9: any = "0.00";
  total10206c10: any = "0.00";
  error110206: boolean = false;
  error110207: boolean = false;
  total10207c1: any = "0.00";
  total10207c2: any = "0.00";
  total10207c3: any = "0.00";
  total10207c4: any = "0.00";
  total10207c5: any = "0.00";
  total10207c6: any = "0.00";
  total10207c7: any = "0.00";
  total10207c8: any = "0.00";
  total10207c9: any = "0.00";
  total10207c10: any = "0.00";
  //purna end
  //hema start
  headerComponent = CalendarComponent;
  periodStartDate: any;
  periodEndDate: any;
  IncomeFromActivityForm10101: FormGroup;
  NoOfAddedForms: number = 10;
  InsuranceActivityForm10103: FormGroup;
  SubContractorsForm10544: FormGroup;
  IdType = [{
    "Key": "",
    "Text": ""
  },
  {
    "Key": "1",
    "Text": "CR No."
  },
  {
    "Key": "2",
    "Text": "TIN"
  },
  {
    "Key": "3",
    "Text": "FIN"
  }
  ];
  files: any;
  files1: any;
  //hema end
  constructor(private fb: FormBuilder, private returnsService: ReturnsService, private route: ActivatedRoute, private CommonValidation: CommonValidation) {
    //purna start     
    this.form10204 = this.fb.group({
      "Schedule": [false],
      "income10204": this.fb.array([]),
      "Totals": [0.00]
    });
    this.form10205 = this.fb.group({
      "Schedule": [false],
      "income10205": this.fb.array([]),
      "Totals": [0.00]
    });
    this.form10206 = this.fb.group({
      "Schedule": [false],
      "income10206": this.fb.array([]),
      "Totals": [0.00]
    });
    this.form10207 = this.fb.group({
      "Schedule": [false],
      "income10207": this.fb.array([]),
      "Totals": [0.00]
    });
    this.form10506 = this.fb.group({
      "Schedule": [false],
      "ce10506": this.fb.array([]),
      "Totals": [0.00]
    });
    this.form10508 = this.fb.group({
      "Schedule": [false],
      "ce10508": this.fb.array([]),
      "Totals": [0.00]
    });
    this.form10511 = this.fb.group({
      "Schedule": [false],
      "ce10511": this.fb.array([]),
      "Totals": [0.00]
    });
    this.form10807 = this.fb.group({
      "Schedule": [false],
      "income10807": this.fb.array([]),
      "Totals": [0.00]
    });
    this.form10809 = this.fb.group({
      "Schedule": [false],
      "ce10809": this.fb.array([]),
      "Totals": [0.00]
    });
    this.form10814 = this.fb.group({
      "Schedule": [false],
      "income10814": this.fb.array([]),
      "Totals": [0.00]
    });
    this.form10815 = this.fb.group({
      "Schedule": [false],
      "income10815": this.fb.array([]),
      "Totals": [0.00]
    });
    this.form10822 = this.fb.group({
      "Schedule": [false],
      "ce10822": this.fb.array([]),
      "Totals": [0.00]
    });
    //purna end
  }
  //purna start
  clearFormArray = (formArray: FormArray) => {
    while (formArray.length !== 0) {
      formArray.removeAt(0)
    }
  }
  get income10204(): FormArray {
    return this.form10204.get('income10204') as FormArray;
  }
  get income10205(): FormArray {
    return this.form10205.get('income10205') as FormArray;
  }
  get income10206(): FormArray {
    return this.form10206.get('income10206') as FormArray;
  }
  get income10207(): FormArray {
    return this.form10207.get('income10207') as FormArray;
  }
  get ce10506(): FormArray {
    return this.form10506.get('ce10506') as FormArray;
  }
  get ce10508(): FormArray {
    return this.form10508.get('ce10508') as FormArray;
  }
  get ce10511(): FormArray {
    return this.form10511.get('ce10511') as FormArray;
  }
  get income10807(): FormArray {
    return this.form10807.get('income10807') as FormArray;
  }
  get ce10809(): FormArray {
    return this.form10809.get('ce10809') as FormArray;
  }
  get income10814(): FormArray {
    return this.form10814.get('income10814') as FormArray;
  }
  get income10815(): FormArray {
    return this.form10815.get('income10815') as FormArray;
  }
  get ce10822(): FormArray {
    return this.form10822.get('ce10822') as FormArray;
  }
  income10204Change(event) {
    if (event.currentTarget.checked == true) {
      this.form10204.patchValue({ "Schedule": true });
      if (this.income10204.controls.length == 0) {
        this.addRowIncome10204();
      }
      jQuery("#gainlosses").modal('show');
    }
    else {
      jQuery("#gainlosses").modal('hide');
      this.clearFormArray(this.income10204);
      this.addRowIncome10204();
      this.calCellTotalIncome10204();
      this.saveIncome10204();
      this.form10204.patchValue({ "Schedule": false });
      this.taxPayerDetails.AGains = "0.00";
      this.taxPayerDetails.AGainsChk = "0";
    }
  }
  income10205Change(event) {
    if (event.currentTarget.checked == true) {
      this.form10205.patchValue({ "Schedule": true });
      if (this.income10205.controls.length == 0) {
        this.addRowIncome10205();
      }
      jQuery("#companyyprofit").modal('show');
    }
    else {
      jQuery("#companyyprofit").modal('hide');
      this.clearFormArray(this.income10205);
      this.addRowIncome10205();
      this.calCellTotalIncome10205();
      this.saveIncome10205();
      this.form10205.patchValue({ "Schedule": false });
      this.taxPayerDetails.ACompShareChk = "0";
      this.taxPayerDetails.ACompShare = "0.00";
    }
  }
  income10206Change(event) {
    if (event.currentTarget.checked == true) {
      this.form10206.patchValue({ "Schedule": true });
      if (this.income10206.controls.length == 0) {
        this.addRowIncome10206();
      }
      jQuery("#gainonsale").modal('show');
    }
    else {
      this.clearFormArray(this.income10204);
      this.addRowIncome10204();
      this.calCellTotalIncome10204();
      this.saveIncome10204();
      this.form10204.patchValue({ "Schedule": false });
      this.taxPayerDetails.AGains = "0.00";
      this.taxPayerDetails.AGainsChk = "0";
      jQuery("#gainonsale").modal('hide');
      this.clearFormArray(this.income10206);
      this.addRowIncome10206();
      this.calCellTotalIncome10206();
      this.saveIncome10206();
      this.form10206.patchValue({ "Schedule": false });
      this.taxPayerDetails.ADividends = "0.00";
      this.taxPayerDetails.ADividendsChk = "0";
    }
  }
  income10207Change(event) {
    if (event.currentTarget.checked == true) {
      this.form10207.patchValue({ "Schedule": true });
      if (this.income10207.controls.length == 0) {
        this.addRowIncome10207();
      }
      jQuery("#gainonsaleinsvt").modal('show');
    }
    else {
      this.clearFormArray(this.income10205);
      this.addRowIncome10205();
      this.calCellTotalIncome10205();
      this.saveIncome10205();
      this.form10205.patchValue({ "Schedule": false });
      this.taxPayerDetails.ACompShareChk = "0";
      this.taxPayerDetails.ACompShare = "0.00";
      jQuery("#gainonsaleinsvt").modal('hide');
      this.clearFormArray(this.income10207);
      this.addRowIncome10207();
      this.calCellTotalIncome10207();
      this.saveIncome10207();
      this.taxPayerDetails.ASaleGain = "0.00";
      this.taxPayerDetails.ASaleGainChk = "0";
      this.form10207.patchValue({ "Schedule": false });
    }
  }
  ce10506Change(event) {
    if (event.currentTarget.checked == true) {
      this.form10506.patchValue({ "Schedule": true });
      if (this.ce10506.controls.length == 0) {
        this.addRowCE10506();
      }
      jQuery("#rents10506").modal('show');
    }
    else {
      jQuery("#rents10506").modal('hide');
      this.clearFormArray(this.ce10506);
      this.addRowCE10506();
      this.calCellTotalCE10506();
      this.saveCE10506();
      this.form10506.patchValue({ "Schedule": false });
      this.taxPayerDetails.ARents10506 = "0.00";
      this.taxPayerDetails.ARents10506Chk = "0";
      this.taxPayerDetails.ARents10808 = "0.00";
      this.taxPayerDetails.ARents10808Chk = "0";
    }
  }
  ce10508Change(event) {
    if (event.currentTarget.checked == true) {
      this.form10508.patchValue({ "Schedule": true });
      if (this.ce10508.controls.length == 0) {
        this.addRowCE10508();
      }
      jQuery("#rentalmachinery10508").modal('show');
    }
    else {
      jQuery("#rentalmachinery10508").modal('hide');
      this.clearFormArray(this.ce10508);
      this.addRowCE10508();
      this.calCellTotalCE10508();
      this.saveCE10508();
      this.form10508.patchValue({ "Schedule": false });
      this.taxPayerDetails.AMachinery = "0.00";
      this.taxPayerDetails.AMachineryChk = "0";
    }
  }
  ce10511Change(event) {
    if (event.currentTarget.checked == true) {
      this.form10511.patchValue({ "Schedule": true });
      if (this.ce10511.controls.length == 0) {
        this.addRowCE10511();
      }
      jQuery("#otherdirect10511").modal('show');
    }
    else {
      jQuery("#otherdirect10511").modal('hide');
      this.clearFormArray(this.ce10511);
      this.addRowCE10511();
      this.calCellTotalCE10511();
      this.saveCE10511();
      this.form10511.patchValue({ "Schedule": false });
      this.taxPayerDetails.AOtherDirect = "0.00";
      this.taxPayerDetails.AOtherDirectChk = "0";
    }
  }
  income10807Change(event) {
    if (event.currentTarget.checked == true) {
      this.form10807.patchValue({ "Schedule": true });
      if (this.income10807.controls.length == 0) {
        this.addRowIncome10807();
      }
      jQuery("#techincal10807").modal('show');
    }
    else {
      jQuery("#techincal10807").modal('hide');
      this.clearFormArray(this.income10807);
      this.addRowIncome10807();
      this.calCellTotalIncome10807();
      this.saveIncome10807();
      this.form10807.patchValue({ "Schedule": false });
      this.taxPayerDetails.ATechnicalFees = "0.00";
      this.taxPayerDetails.ATechnicalFeesChk = "0";
    }
  }
  ce10809Change(event) {
    if (event.currentTarget.checked == true) {
      this.form10809.patchValue({ "Schedule": true });
      if (this.ce10809.controls.length == 0) {
        this.addRowCE10809();
      }
      jQuery("#provisions10809").modal('show');
    }
    else {
      jQuery("#provisions10809").modal('hide');
      this.clearFormArray(this.ce10809);
      this.addRowCE10809();
      this.calCellTotalCE10809();
      this.saveCE10809();
      this.form10809.patchValue({ "Schedule": false });
      this.taxPayerDetails.AProvisions = "0.00";
      this.taxPayerDetails.AProvisionsChk = "0";
    }
  }
  income10814Change(event) {
    if (event.currentTarget.checked == true) {
      this.form10814.patchValue({ "Schedule": true });
      if (this.income10814.controls.length == 0) {
        this.addRowIncome10814();
      }
      jQuery("#donations10814").modal('show');
    }
    else {
      jQuery("#donations10814").modal('hide');
      this.clearFormArray(this.income10814);
      this.addRowIncome10814();
      this.calCellTotalIncome10814();
      this.saveIncome10814();
      this.form10814.patchValue({ "Schedule": false });
      this.taxPayerDetails.ADonationsPaid = "0.00";
      this.taxPayerDetails.ADonationsPaid10814Chk = "0";
    }
  }
  income10815Change(event) {
    if (event.currentTarget.checked == true) {
      this.form10815.patchValue({ "Schedule": true });
      if (this.income10815.controls.length == 0) {
        this.addRowIncome10815();
      }
      jQuery("#taxesortechnical10815").modal('show');
    }
    else {
      jQuery("#taxesortechnical10815").modal('hide');
      this.clearFormArray(this.income10815);
      this.addRowIncome10815();
      this.calCellTotalIncome10815();
      this.saveIncome10815();
      this.form10815.patchValue({ "Schedule": false });
      this.taxPayerDetails.ATechnicalSupport = "0.00";
      this.taxPayerDetails.ATechnicalSupportChk = "0";
    }
  }
  ce10822Change(event) {
    if (event.currentTarget.checked == true) {
      this.form10822.patchValue({ "Schedule": true });
      if (this.ce10822.controls.length == 0) {
        this.addRowCE10822();
      }
      jQuery("#otherindirect10822").modal('show');
    }
    else {
      jQuery("#otherindirect10822").modal('hide');
      this.clearFormArray(this.ce10822);
      this.addRowCE10822();
      this.calCellTotalCE10822();
      this.saveCE10822();
      this.form10822.patchValue({ "Schedule": false });
      this.taxPayerDetails.AOtherIndirct = "0.00";
      this.taxPayerDetails.AOtherIndirctChk = "0";
    }
  }
  addRowIncome10204() {
    let type = this.form10204M();
    this.income10204.push(type);
  }
  addRowIncome10205() {
    let type = this.form10205M();
    this.income10205.push(type);
  }
  addRowIncome10206() {
    let type = this.form10206M();
    this.income10206.push(type);
  }
  addRowIncome10207() {
    let type = this.form10207M();
    this.income10207.push(type);
  }
  addRowCE10506() {
    let type = this.form10506M();
    this.ce10506.push(type);
  }
  addRowCE10508() {
    let type = this.form10508M();
    this.ce10508.push(type);
  }
  addRowCE10511() {
    let type = this.form10511M();
    this.ce10511.push(type);
  }
  addRowIncome10807() {
    let type = this.form10807M();
    this.income10807.push(type);
  }
  addRowCE10809() {
    let type = this.form10809M();
    this.ce10809.push(type);
  }
  addRowIncome10814() {
    let type = this.form10814M();
    this.income10814.push(type);
  }
  addRowIncome10815() {
    let type = this.form10815M();
    this.income10815.push(type);
  }
  addRowCE10822() {
    let type = this.form10822M();
    this.ce10822.push(type);
  }
  form10204M() {
    return this.fb.group({
      "CompanyNm": ["", [Validators.required, Validators.maxLength(30)]],
      "InvestmentTp": ["", [Validators.required]],
      "GainLosses": ["0.00", [Validators.required, Validators.min(0)]]
    });
  }
  form10205M() {
    return this.fb.group({
      "CompanyNm": ["", [Validators.required, Validators.maxLength(30)]],
      "InvestmentTp": ["", [Validators.required]],
      "GainLosses": ["0.00", [Validators.required, Validators.min(0)]]
    });
  }
  form10206M() {
    return this.fb.group({
      "CompNm": ["", [Validators.required, Validators.maxLength(30)]],
      "CompTp": ["", [Validators.required]],
      "BegBal": ["0.00", [Validators.required, Validators.min(0)]],
      "AdditionCost": ["0.00", [Validators.required, Validators.min(0)]],
      "ExclutionCost": ["0.00", [Validators.required, Validators.min(0)]],
      "Exhaustion": ["0.00", [Validators.required, Validators.min(0)]],
      "GainIncomestmt": ["0.00"],
      "GainProperty": ["0.00", [Validators.required, Validators.min(0)]],
      "EndBal": ["0.00"],
      "DeductTaxable": ["0.00", [Validators.required, Validators.min(0)]],
      "ExclutionSelling": ["0.00", [Validators.required, Validators.min(0)]],
      "ExclutionGain": ["0.00"],
    });
  }
  form10207M() {
    return this.fb.group({
      "CompNm": ["", [Validators.required, Validators.maxLength(30)]],
      "CompTp": ["", [Validators.required]],
      "OwnershipRatio": ["0", [Validators.required, ratioRangeValidator]],
      "BegBal": ["0.00", [Validators.required, Validators.min(0)]],
      "AdditionCost": ["0.00", [Validators.required, Validators.min(0)]],
      "ExclutionCost": ["0.00", [Validators.required, Validators.min(0)]],
      "CompShare": ["0.00"],
      "EarningDevidends": ["0.00", [Validators.required, Validators.min(0)]],
      "ProfitDevidends": ["0.00", [Validators.required, Validators.min(0)]],
      "EndBal": ["0.00"],
      "DeductTaxable": ["0.00", [Validators.required, Validators.min(0)]],
      "ExclutionSelling": ["0.00", [Validators.required, Validators.min(0)]],
      "ExclutionGain": ["0.00"],
    });
  }
  form10506M() {
    return this.fb.group({
      "DropDown": [""],
      "Crtinfin": ["", [Validators.maxLength(15)]],
      "ContractorNm": ["", [Validators.required, Validators.maxLength(150)]],
      "Addr": ["", [Validators.required, Validators.maxLength(150)]],
      "BegBal": ["0.00", [Validators.required, Validators.min(0)]],
      "DirectExp": ["0.00", [Validators.required, Validators.min(0)]],
      "IndirectExp": ["0.00", [Validators.required, Validators.min(0)]],
      "YearPaid": ["0.00", [Validators.required, Validators.min(0)]],
      "EndBal": ["0.00", [Validators.required, Validators.min(0)]]
    });
  }
  form10508M() {
    return this.fb.group({
      "DropDown": [""],
      "Crtinfin": ["", [Validators.maxLength(15)]],
      "ContractorNm": ["", [Validators.required, Validators.maxLength(150)]],
      "Addr": ["", [Validators.required, Validators.maxLength(150)]],
      "BegBal": ["0.00", [Validators.required, Validators.min(0)]],
      "ReceivableYr": ["0.00", [Validators.required, Validators.min(0)]],
      "YearPaid": ["0.00", [Validators.required, Validators.min(0)]],
      "EndBal": ["0.00", [Validators.required, Validators.min(0)]]
    });
  }
  form10511M() {
    return this.fb.group({
      "Stmt": ["", [Validators.required, Validators.maxLength(80)]],
      "Value": ["0.00", [Validators.required, Validators.min(0)]]
    });
  }
  form10807M() {
    return this.fb.group({
      "DropDown": [""],
      "Crtinfin": ["", [Validators.maxLength(15)]],
      "BeneficiaryNm": ["", [Validators.required, Validators.maxLength(150)]],
      "Addr": ["", [Validators.required, Validators.maxLength(150)]],
      "LocalForeigner": ["", [Validators.required]],
      "Amt": ["0.00", [Validators.required, Validators.min(0)]]
    });
  }
  form10809M() {
    return this.fb.group({
      "AllocatedNm": ["", [Validators.required, Validators.maxLength(30)]],
      "BegBal": ["0.00", [Validators.required, Validators.min(0)]],
      "MadeBal": ["0.00", [Validators.required, Validators.min(0)]],
      "UsedBal": ["0.00", [Validators.required, Validators.min(0)]],
      "Settlements": ["0.00", [Validators.required, Validators.min(0)]],
      "EndBal": ["0.00", [Validators.required, Validators.min(0)]]
    });
  }
  form10814M() {
    return this.fb.group({
      "DropDown": [""],
      "Crtinfin": ["", [Validators.maxLength(15)]],
      "BeneficiaryNm": ["", [Validators.required, Validators.maxLength(150)]],
      "Addr": ["", [Validators.required, Validators.maxLength(150)]],
      "PaidAmt": ["0.00", [Validators.required, Validators.min(0)]]
    });
  }
  form10815M() {
    return this.fb.group({
      "DropDown": [""],
      "Crtinfin": ["", [Validators.maxLength(15)]],
      "BeneficiaryNm": ["", [Validators.required, Validators.maxLength(150)]],
      "Addr": ["", [Validators.required, Validators.maxLength(150)]],
      "InternalExt": ["", [Validators.required]],
      "Amt": ["0.00", [Validators.required, Validators.min(0)]]
    });
  }
  form10822M() {
    return this.fb.group({
      "Stmt": ["", [Validators.required, Validators.maxLength(80)]],
      "Value": ["0.00", [Validators.required, Validators.min(0)]]
    });
  }
  deleteRowIncome10204(pi) {
    const control = this.form10204.get('income10204') as FormArray;
    control.removeAt(pi);
    if (pi == 0) {
      this.addRowIncome10204();
    }
    this.calCellTotalIncome10204();
  }
  deleteRowIncome10205(pi) {
    const control = this.form10204.get('income10205') as FormArray;
    control.removeAt(pi);
    if (pi == 0) {
      this.addRowIncome10205();
    }
    this.calCellTotalIncome10205();
  }
  deleteRowIncome10206(pi) {
    const control = this.form10206.get('income10206') as FormArray;
    control.removeAt(pi);
    if (pi == 0) {
      this.addRowIncome10206();
    }
    this.calCellTotalIncome10206();
  }
  deleteRowIncome10207(pi) {
    const control = this.form10207.get('income10207') as FormArray;
    control.removeAt(pi);
    if (pi == 0) {
      this.addRowIncome10207();
    }
    this.calCellTotalIncome10207();
  }
  deleteRowCE10506(pi) {
    const control = this.form10506.get('ce10506') as FormArray;
    control.removeAt(pi);
    if (pi == 0) {
      this.addRowCE10506();
    }
    this.calCellTotalCE10506();
  }
  deleteRowCE10508(pi) {
    const control = this.form10508.get('ce10508') as FormArray;
    control.removeAt(pi);
    if (pi == 0) {
      this.addRowCE10508();
    }
    this.calCellTotalCE10508();
  }
  deleteRowCE10511(pi) {
    const control = this.form10511.get('ce10511') as FormArray;
    control.removeAt(pi);
    if (pi == 0) {
      this.addRowCE10511();
    }
    this.calCellTotalCE10511();
  }
  deleteRowIncome10807(pi) {
    const control = this.form10807.get('income10807') as FormArray;
    control.removeAt(pi);
    if (pi == 0) {
      this.addRowIncome10807();
    }
    this.calCellTotalIncome10807();
  }
  deleteRowCE10809(pi) {
    const control = this.form10809.get('ce10809') as FormArray;
    control.removeAt(pi);
    if (pi == 0) {
      this.addRowCE10809();
    }
    this.calCellTotalCE10809();
  }
  deleteRowIncome10814(pi) {
    const control = this.form10814.get('income10814') as FormArray;
    control.removeAt(pi);
    if (pi == 0) {
      this.addRowIncome10814();
    }
    this.calCellTotalIncome10814();
  }
  deleteRowIncome10815(pi) {
    const control = this.form10815.get('income10815') as FormArray;
    control.removeAt(pi);
    if (pi == 0) {
      this.addRowIncome10815();
    }
    this.calCellTotalIncome10815();
  }
  deleteRowCE10822(pi) {
    const control = this.form10822.get('ce10822') as FormArray;
    control.removeAt(pi);
    if (pi == 0) {
      this.addRowCE10822();
    }
    this.calCellTotalCE10822();
  }
  addMultipleIncome10204() {
    for (let i = 0; i < this.noOfAddedForms; i++) {
      this.addRowIncome10204();
    }
    jQuery("#addMultipleForms10204").modal('hide');
    this.addPopup();
  }
  addMultipleIncome10205() {
    for (let i = 0; i < this.noOfAddedForms; i++) {
      this.addRowIncome10205();
    }
    jQuery("#addMultipleForms10205").modal('hide');
    this.addPopup();
  }
  addMultipleIncome10206() {
    for (let i = 0; i < this.noOfAddedForms; i++) {
      this.addRowIncome10206();
    }
    jQuery("#addMultipleForms10206").modal('hide');
    this.addPopup();
  }
  addMultipleIncome10207() {
    for (let i = 0; i < this.noOfAddedForms; i++) {
      this.addRowIncome10207();
    }
    jQuery("#addMultipleForms10207").modal('hide');
    this.addPopup();
  }
  addMultipleCE10506() {
    for (let i = 0; i < this.noOfAddedForms; i++) {
      this.addRowCE10506();
    }
    jQuery("#addMultipleForms10506").modal('hide');
    this.addPopup();
  }
  addMultipleCE10508() {
    for (let i = 0; i < this.noOfAddedForms; i++) {
      this.addRowCE10508();
    }
    jQuery("#addMultipleForms10508").modal('hide');
    this.addPopup();
  }
  addMultipleCE10511() {
    for (let i = 0; i < this.noOfAddedForms; i++) {
      this.addRowCE10511();
    }
    jQuery("#addMultipleForms10511").modal('hide');
    this.addPopup();
  }
  addMultipleIncome10807() {
    for (let i = 0; i < this.noOfAddedForms; i++) {
      this.addRowIncome10807();
    }
    jQuery("#addMultipleForms10807").modal('hide');
    this.addPopup();
  }
  addMultipleCE10809() {
    for (let i = 0; i < this.noOfAddedForms; i++) {
      this.addRowCE10809();
    }
    jQuery("#addMultipleForms10809").modal('hide');
    this.addPopup();
  }
  addMultipleIncome10814() {
    for (let i = 0; i < this.noOfAddedForms; i++) {
      this.addRowIncome10814();
    }
    jQuery("#addMultipleForms10814").modal('hide');
    this.addPopup();
  }
  addMultipleIncome10815() {
    for (let i = 0; i < this.noOfAddedForms; i++) {
      this.addRowIncome10815();
    }
    jQuery("#addMultipleForms10815").modal('hide');
    this.addPopup();
  }
  addMultipleCE10822() {
    for (let i = 0; i < this.noOfAddedForms; i++) {
      this.addRowCE10822();
    }
    jQuery("#addMultipleForms10822").modal('hide');
    this.addPopup();
  }
  clearIncome10204() {
    this.clearFormArray(this.income10204);
    if (this.taxPayerDetails.AGainsChk == '1') {
      this.form10204.patchValue({ "Schedule": true })
    }
    else {
      this.form10204.patchValue({ "Schedule": false })
    }
    for (let i = 0; i < this.taxPayerDetails.Sch_10204Set["results"].length; i++) {
      this.addRowIncome10204();
      this.income10204.controls[i].patchValue({ "CompanyNm": this.taxPayerDetails.Sch_10204Set["results"][i]["CompanyNm"] });
      this.income10204.controls[i].patchValue({ "GainLosses": this.taxPayerDetails.Sch_10204Set["results"][i]["GainLosses"] });
      this.income10204.controls[i].patchValue({ "InvestmentTp": this.taxPayerDetails.Sch_10204Set["results"][i]["InvestmentTp"] });
    }
    this.calCellTotalIncome10204();
    jQuery("#gainlosses").modal('hide');
    this.clsePopup();
  }
  clearIncome10205() {
    this.clearFormArray(this.income10205);
    if (this.taxPayerDetails.ACompShareChk == '1') {
      this.form10205.patchValue({ "Schedule": true })
    }
    else {
      this.form10205.patchValue({ "Schedule": false })
    }
    for (let i = 0; i < this.taxPayerDetails.Sch_10205Set["results"].length; i++) {
      this.addRowIncome10205();
      this.income10205.controls[i].patchValue({ "CompanyNm": this.taxPayerDetails.Sch_10205Set["results"][i]["CompanyNm"] });
      this.income10205.controls[i].patchValue({ "GainLosses": this.taxPayerDetails.Sch_10205Set["results"][i]["GainLosses"] });
      this.income10205.controls[i].patchValue({ "InvestmentTp": this.taxPayerDetails.Sch_10205Set["results"][i]["InvestmentTp"] });
    }
    this.calCellTotalIncome10205();
    jQuery("#companyyprofit").modal('hide');
    this.clsePopup();
  }
  clearIncome10206() {
    this.clearFormArray(this.income10206);
    if (this.taxPayerDetails.ADividendsChk == '1') {
      this.form10206.patchValue({ "Schedule": true })
    }
    else {
      this.form10206.patchValue({ "Schedule": false })
    }
    for (let i = 0; i < this.taxPayerDetails.Sch_10206Set["results"].length; i++) {
      this.addRowIncome10206();
      this.income10206.controls[i].patchValue({ "CompNm": this.taxPayerDetails.Sch_10206Set["results"][i]["CompNm"] });
      this.income10206.controls[i].patchValue({ "CompTp": this.taxPayerDetails.Sch_10206Set["results"][i]["CompTp"] });
      this.income10206.controls[i].patchValue({ "BegBal": this.taxPayerDetails.Sch_10206Set["results"][i]["BegBal"] });
      this.income10206.controls[i].patchValue({ "AdditionCost": this.taxPayerDetails.Sch_10206Set["results"][i]["AdditionCost"] });
      this.income10206.controls[i].patchValue({ "ExclutionCost": this.taxPayerDetails.Sch_10206Set["results"][i]["ExclutionCost"] });
      this.income10206.controls[i].patchValue({ "Exhaustion": this.taxPayerDetails.Sch_10206Set["results"][i]["Exhaustion"] }); this.income10206.controls[i].patchValue({ "CompanyNm": this.taxPayerDetails.Sch_10206Set["results"][i]["CompanyNm"] });
      this.income10206.controls[i].patchValue({ "GainIncomestmt": this.taxPayerDetails.Sch_10206Set["results"][i]["GainIncomestmt"] });
      this.income10206.controls[i].patchValue({ "GainProperty": this.taxPayerDetails.Sch_10206Set["results"][i]["GainProperty"] });
      this.income10206.controls[i].patchValue({ "EndBal": this.taxPayerDetails.Sch_10206Set["results"][i]["EndBal"] });
      this.income10206.controls[i].patchValue({ "DeductTaxable": this.taxPayerDetails.Sch_10206Set["results"][i]["DeductTaxable"] });
      this.income10206.controls[i].patchValue({ "ExclutionSelling": this.taxPayerDetails.Sch_10206Set["results"][i]["ExclutionSelling"] });
      this.income10206.controls[i].patchValue({ "ExclutionGain": this.taxPayerDetails.Sch_10206Set["results"][i]["ExclutionGain"] });
    }
    this.calCellTotalIncome10206();
    jQuery("#gainonsale").modal('hide');
    this.clsePopup();
  }
  clearIncome10207() {
    this.clearFormArray(this.income10207);
    if (this.taxPayerDetails.ASaleGainChk == '1') {
      this.form10207.patchValue({ "Schedule": true })
    }
    else {
      this.form10207.patchValue({ "Schedule": false })
    }
    for (let i = 0; i < this.taxPayerDetails.Sch_10207Set["results"].length; i++) {
      this.addRowIncome10207();
      this.income10207.controls[i].patchValue({ "CompNm": this.taxPayerDetails.Sch_10206Set["results"][i]["CompNm"] });
      this.income10207.controls[i].patchValue({ "CompTp": this.taxPayerDetails.Sch_10206Set["results"][i]["CompTp"] });
      this.income10207.controls[i].patchValue({ "OwnershipRatio": this.taxPayerDetails.Sch_10206Set["results"][i]["OwnershipRatio"] });
      this.income10207.controls[i].patchValue({ "BegBal": this.taxPayerDetails.Sch_10206Set["results"][i]["BegBal"] });
      this.income10207.controls[i].patchValue({ "AdditionCost": this.taxPayerDetails.Sch_10206Set["results"][i]["AdditionCost"] });
      this.income10207.controls[i].patchValue({ "ExclutionCost": this.taxPayerDetails.Sch_10206Set["results"][i]["ExclutionCost"] });
      this.income10207.controls[i].patchValue({ "CompShare": this.taxPayerDetails.Sch_10206Set["results"][i]["CompShare"] }); this.income10206.controls[i].patchValue({ "CompanyNm": this.taxPayerDetails.Sch_10206Set["results"][i]["CompanyNm"] });
      this.income10207.controls[i].patchValue({ "EarningDevidends": this.taxPayerDetails.Sch_10206Set["results"][i]["EarningDevidends"] });
      this.income10207.controls[i].patchValue({ "ProfitDevidends": this.taxPayerDetails.Sch_10206Set["results"][i]["ProfitDevidends"] });
      this.income10207.controls[i].patchValue({ "EndBal": this.taxPayerDetails.Sch_10206Set["results"][i]["EndBal"] });
      this.income10207.controls[i].patchValue({ "DeductTaxable": this.taxPayerDetails.Sch_10206Set["results"][i]["DeductTaxable"] });
      this.income10207.controls[i].patchValue({ "ExclutionSelling": this.taxPayerDetails.Sch_10206Set["results"][i]["ExclutionSelling"] });
      this.income10207.controls[i].patchValue({ "ExclutionGain": this.taxPayerDetails.Sch_10206Set["results"][i]["ExclutionGain"] });
    }
    this.calCellTotalIncome10207();
    jQuery("#gainonsaleinsvt").modal('hide');
    this.clsePopup();
  }
  clearCE10506() {
    this.clearFormArray(this.ce10506);
    if (this.taxPayerDetails.ARents10506Chk == '1') {
      this.form10506.patchValue({ "Schedule": true })
    }
    else {
      this.form10506.patchValue({ "Schedule": false })
    }
    for (let i = 0; i < this.taxPayerDetails.Sch_10506Set["results"].length; i++) {
      this.addRowCE10506();
      this.ce10506.controls[i].patchValue({ "DropDown": this.taxPayerDetails.Sch_10506Set["results"][i]["DropDown"] });
      this.ce10506.controls[i].patchValue({ "Crtinfin": this.taxPayerDetails.Sch_10506Set["results"][i]["Crtinfin"] });
      this.ce10506.controls[i].patchValue({ "ContractorNm": this.taxPayerDetails.Sch_10506Set["results"][i]["ContractorNm"] });
      this.ce10506.controls[i].patchValue({ "Addr": this.taxPayerDetails.Sch_10506Set["results"][i]["Addr"] });
      this.ce10506.controls[i].patchValue({ "BegBal": this.taxPayerDetails.Sch_10506Set["results"][i]["BegBal"] });
      this.ce10506.controls[i].patchValue({ "DirectExp": this.taxPayerDetails.Sch_10506Set["results"][i]["DirectExp"] });
      this.ce10506.controls[i].patchValue({ "IndirectExp": this.taxPayerDetails.Sch_10506Set["results"][i]["IndirectExp"] });
      this.ce10506.controls[i].patchValue({ "YearPaid": this.taxPayerDetails.Sch_10506Set["results"][i]["YearPaid"] });
      this.ce10506.controls[i].patchValue({ "EndBal": this.taxPayerDetails.Sch_10506Set["results"][i]["EndBal"] });
    }
    this.calCellTotalCE10506();
    jQuery("#rents10506").modal('hide');
    this.clsePopup();
  }
  clearCE10508() {
    this.clearFormArray(this.ce10508);
    if (this.taxPayerDetails.AMachineryChk == '1') {
      this.form10508.patchValue({ "Schedule": true })
    }
    else {
      this.form10508.patchValue({ "Schedule": false })
    }
    for (let i = 0; i < this.taxPayerDetails.Sch_10508Set["results"].length; i++) {
      this.addRowCE10508();
      this.ce10508.controls[i].patchValue({ "DropDown": this.taxPayerDetails.Sch_10508Set["results"][i]["DropDown"] });
      this.ce10508.controls[i].patchValue({ "Crtinfin": this.taxPayerDetails.Sch_10508Set["results"][i]["Crtinfin"] });
      this.ce10508.controls[i].patchValue({ "ContractorNm": this.taxPayerDetails.Sch_10508Set["results"][i]["ContractorNm"] });
      this.ce10508.controls[i].patchValue({ "Addr": this.taxPayerDetails.Sch_10508Set["results"][i]["Addr"] });
      this.ce10508.controls[i].patchValue({ "BegBal": this.taxPayerDetails.Sch_10508Set["results"][i]["BegBal"] });
      this.ce10508.controls[i].patchValue({ "ReceivableYr": this.taxPayerDetails.Sch_10508Set["results"][i]["ReceivableYr"] });
      this.ce10508.controls[i].patchValue({ "YearPaid": this.taxPayerDetails.Sch_10508Set["results"][i]["YearPaid"] });
      this.ce10508.controls[i].patchValue({ "EndBal": this.taxPayerDetails.Sch_10508Set["results"][i]["EndBal"] });
    }
    this.calCellTotalCE10508();
    jQuery("#rentalmachinery10508").modal('hide');
    this.clsePopup();
  }
  clearCE10511() {
    this.clearFormArray(this.ce10511);
    if (this.taxPayerDetails.AOtherDirectChk == '1') {
      this.form10511.patchValue({ "Schedule": true })
    }
    else {
      this.form10511.patchValue({ "Schedule": false })
    }
    for (let i = 0; i < this.taxPayerDetails.Sch_10510Set["results"].length; i++) {
      this.addRowCE10511();
      this.ce10511.controls[i].patchValue({ "Stmt": this.taxPayerDetails.Sch_10510Set["results"][i]["Stmt"] });
      this.ce10511.controls[i].patchValue({ "Value": this.taxPayerDetails.Sch_10510Set["results"][i]["Value"] });
    }
    this.calCellTotalCE10511();
    jQuery("#otherdirect10511").modal('hide');
    this.clsePopup();
  }
  clearIncome10807() {
    this.clearFormArray(this.income10807);
    if (this.taxPayerDetails.ATechnicalFeesChk == '1') {
      this.form10807.patchValue({ "Schedule": true })
    }
    else {
      this.form10807.patchValue({ "Schedule": false })
    }
    for (let i = 0; i < this.taxPayerDetails.Sch_10807Set["results"].length; i++) {
      this.addRowIncome10807();
      this.income10807.controls[i].patchValue({ "DropDown": this.taxPayerDetails.Sch_10807Set["results"][i]["DropDown"] });
      this.income10807.controls[i].patchValue({ "Crtinfin": this.taxPayerDetails.Sch_10807Set["results"][i]["Crtinfin"] });
      this.income10807.controls[i].patchValue({ "BeneficiaryNm": this.taxPayerDetails.Sch_10807Set["results"][i]["BeneficiaryNm"] });
      this.income10807.controls[i].patchValue({ "Addr": this.taxPayerDetails.Sch_10807Set["results"][i]["Addr"] });
      this.income10807.controls[i].patchValue({ "LocalForeigner": this.taxPayerDetails.Sch_10807Set["results"][i]["LocalForeigner"] });
      this.income10807.controls[i].patchValue({ "Amt": this.taxPayerDetails.Sch_10807Set["results"][i]["Amt"] });
    }
    this.calCellTotalIncome10807();
    jQuery("#techincal10807").modal('hide');
    this.clsePopup();
  }
  clearCE10809() {
    this.clearFormArray(this.ce10809);
    if (this.taxPayerDetails.AProvisionsChk == '1') {
      this.form10809.patchValue({ "Schedule": true })
    }
    else {
      this.form10809.patchValue({ "Schedule": false })
    }
    for (let i = 0; i < this.taxPayerDetails.Sch_10809Set["results"].length; i++) {
      this.addRowCE10809();
      this.ce10809.controls[i].patchValue({ "AllocatedNm": this.taxPayerDetails.Sch_10809Set["results"][i]["AllocatedNm"] });
      this.ce10809.controls[i].patchValue({ "BegBal": this.taxPayerDetails.Sch_10809Set["results"][i]["BegBal"] });
      this.ce10809.controls[i].patchValue({ "MadeBal": this.taxPayerDetails.Sch_10809Set["results"][i]["MadeBal"] });
      this.ce10809.controls[i].patchValue({ "UsedBal": this.taxPayerDetails.Sch_10809Set["results"][i]["UsedBal"] });
      this.ce10809.controls[i].patchValue({ "Settlements": this.taxPayerDetails.Sch_10809Set["results"][i]["Settlements"] });
      this.ce10809.controls[i].patchValue({ "EndBal": this.taxPayerDetails.Sch_10809Set["results"][i]["EndBal"] });
    }
    this.calCellTotalCE10809();
    jQuery("#provisions10809").modal('hide');
    this.clsePopup();
  }
  clearIncome10814() {
    this.clearFormArray(this.income10814);
    if (this.taxPayerDetails.ADonationsPaid10814Chk == '1') {
      this.form10814.patchValue({ "Schedule": true })
    }
    else {
      this.form10814.patchValue({ "Schedule": false })
    }
    for (let i = 0; i < this.taxPayerDetails.Sch_10814Set["results"].length; i++) {
      this.addRowIncome10814();
      this.income10814.controls[i].patchValue({ "DropDown": this.taxPayerDetails.Sch_10814Set["results"][i]["DropDown"] });
      this.income10814.controls[i].patchValue({ "Crtinfin": this.taxPayerDetails.Sch_10814Set["results"][i]["Crtinfin"] });
      this.income10814.controls[i].patchValue({ "BeneficiaryNm": this.taxPayerDetails.Sch_10814Set["results"][i]["BeneficiaryNm"] });
      this.income10814.controls[i].patchValue({ "Addr": this.taxPayerDetails.Sch_10814Set["results"][i]["Addr"] });
      this.income10814.controls[i].patchValue({ "PaidAmt": this.taxPayerDetails.Sch_10814Set["results"][i]["PaidAmt"] });
    }
    this.calCellTotalIncome10814();
    jQuery("#donations10814").modal('hide');
    this.clsePopup();
  }
  clearIncome10815() {
    this.clearFormArray(this.income10815);
    if (this.taxPayerDetails.ATechnicalSupportChk == '1') {
      this.form10815.patchValue({ "Schedule": true })
    }
    else {
      this.form10815.patchValue({ "Schedule": false })
    }
    for (let i = 0; i < this.taxPayerDetails.Sch_10815Set["results"].length; i++) {
      this.addRowIncome10815();
      this.income10815.controls[i].patchValue({ "DropDown": this.taxPayerDetails.Sch_10815Set["results"][i]["DropDown"] });
      this.income10815.controls[i].patchValue({ "Crtinfin": this.taxPayerDetails.Sch_10815Set["results"][i]["Crtinfin"] });
      this.income10815.controls[i].patchValue({ "BeneficiaryNm": this.taxPayerDetails.Sch_10815Set["results"][i]["BeneficiaryNm"] });
      this.income10815.controls[i].patchValue({ "Addr": this.taxPayerDetails.Sch_10815Set["results"][i]["Addr"] });
      this.income10815.controls[i].patchValue({ "InternalExt": this.taxPayerDetails.Sch_10815Set["results"][i]["InternalExt"] });
      this.income10815.controls[i].patchValue({ "Amt": this.taxPayerDetails.Sch_10815Set["results"][i]["Amt"] });
    }
    this.calCellTotalIncome10815();
    jQuery("#taxesortechnical10815").modal('hide');
    this.clsePopup();
  }
  clearCE10822() {
    this.clearFormArray(this.ce10822);
    if (this.taxPayerDetails.AOtherIndirctChk == '1') {
      this.form10822.patchValue({ "Schedule": true })
    }
    else {
      this.form10822.patchValue({ "Schedule": false })
    }
    for (let i = 0; i < this.taxPayerDetails.Sch_10822Set["results"].length; i++) {
      this.addRowCE10822();
      this.ce10822.controls[i].patchValue({ "Stmt": this.taxPayerDetails.Sch_10822Set["results"][i]["Stmt"] });
      this.ce10822.controls[i].patchValue({ "Value": this.taxPayerDetails.Sch_10822Set["results"][i]["Value"] });
    }
    this.calCellTotalCE10822();
    jQuery("#otherindirect10822").modal('hide');
    this.clsePopup();
  }
  calCellTotalIncome10206() {
    this.total10206c1 = "0.00";
    this.total10206c2 = "0.00";
    this.total10206c3 = "0.00";
    this.total10206c4 = "0.00";
    this.total10206c5 = "0.00";
    this.total10206c6 = "0.00";
    this.total10206c7 = "0.00";
    this.total10206c8 = "0.00";
    this.total10206c9 = "0.00";
    this.total10206c10 = "0.00";
    this.error110206 = false;
    for (let i = 0; i < this.income10206.controls.length; i++) {
      if (this.income10206.controls[i].value.BegBal == '' || this.income10206.controls[i].value.BegBal == null || this.income10206.controls[i].value.BegBal == undefined || this.income10206.controls[i].value.BegBal == 'undefined') {
        this.income10206.controls[i].patchValue({ "BegBal": "0.00" });
      }
      else {
        if (this.income10206.controls[i].value.BegBal.toString().indexOf('.') > -1) {
          this.income10206.controls[i].patchValue({ "BegBal": (this.income10206.controls[i].value.BegBal.slice(0, (this.income10206.controls[i].value.BegBal.indexOf(".")) + 3)) });
        }
        this.income10206.controls[i].patchValue({ "BegBal": (+this.income10206.controls[i].value.BegBal).toFixed(2) });
      }
      this.total10206c1 = (parseFloat(this.total10206c1) + parseFloat(this.income10206.controls[i].value.BegBal)).toFixed(2);

      if (this.income10206.controls[i].value.AdditionCost == '' || this.income10206.controls[i].value.AdditionCost == null || this.income10206.controls[i].value.AdditionCost == undefined || this.income10206.controls[i].value.AdditionCost == 'undefined') {
        this.income10206.controls[i].patchValue({ "AdditionCost": "0.00" });
      }
      else {
        if (this.income10206.controls[i].value.AdditionCost.toString().indexOf('.') > -1) {
          this.income10206.controls[i].patchValue({ "AdditionCost": (this.income10206.controls[i].value.AdditionCost.slice(0, (this.income10206.controls[i].value.AdditionCost.indexOf(".")) + 3)) });
        }
        this.income10206.controls[i].patchValue({ "AdditionCost": (+this.income10206.controls[i].value.AdditionCost).toFixed(2) });
      }
      this.total10206c2 = (parseFloat(this.total10206c2) + parseFloat(this.income10206.controls[i].value.AdditionCost)).toFixed(2);

      if (this.income10206.controls[i].value.ExclutionCost == '' || this.income10206.controls[i].value.ExclutionCost == null || this.income10206.controls[i].value.ExclutionCost == undefined || this.income10206.controls[i].value.ExclutionCost == 'undefined') {
        this.income10206.controls[i].patchValue({ "ExclutionCost": "0.00" });
      }
      else {
        if (this.income10206.controls[i].value.ExclutionCost.toString().indexOf('.') > -1) {
          this.income10206.controls[i].patchValue({ "ExclutionCost": (this.income10206.controls[i].value.ExclutionCost.slice(0, (this.income10206.controls[i].value.ExclutionCost.indexOf(".")) + 3)) });
        }
        this.income10206.controls[i].patchValue({ "ExclutionCost": (+this.income10206.controls[i].value.ExclutionCost).toFixed(2) });
      }
      this.total10206c3 = (parseFloat(this.total10206c3) + parseFloat(this.income10206.controls[i].value.ExclutionCost)).toFixed(2);

      if (this.income10206.controls[i].value.Exhaustion == '' || this.income10206.controls[i].value.Exhaustion == null || this.income10206.controls[i].value.Exhaustion == undefined || this.income10206.controls[i].value.Exhaustion == 'undefined') {
        this.income10206.controls[i].patchValue({ "Exhaustion": "0.00" });
      }
      else {
        if (this.income10206.controls[i].value.Exhaustion.toString().indexOf('.') > -1) {
          this.income10206.controls[i].patchValue({ "Exhaustion": (this.income10206.controls[i].value.Exhaustion.slice(0, (this.income10206.controls[i].value.Exhaustion.indexOf(".")) + 3)) });
        }
        this.income10206.controls[i].patchValue({ "Exhaustion": (+this.income10206.controls[i].value.Exhaustion).toFixed(2) });
      }
      this.total10206c4 = (parseFloat(this.total10206c4) + parseFloat(this.income10206.controls[i].value.Exhaustion)).toFixed(2);

      if (this.income10206.controls[i].value.GainIncomestmt == '' || this.income10206.controls[i].value.GainIncomestmt == null || this.income10206.controls[i].value.GainIncomestmt == undefined || this.income10206.controls[i].value.GainIncomestmt == 'undefined') {
        this.income10206.controls[i].patchValue({ "GainIncomestmt": "0.00" });
      }
      else {
        if (this.income10206.controls[i].value.GainIncomestmt.toString().indexOf('.') > -1) {
          this.income10206.controls[i].patchValue({ "GainIncomestmt": (this.income10206.controls[i].value.GainIncomestmt.slice(0, (this.income10206.controls[i].value.GainIncomestmt.indexOf(".")) + 3)) });
        }
        this.income10206.controls[i].patchValue({ "GainIncomestmt": (+this.income10206.controls[i].value.GainIncomestmt).toFixed(2) });
      }
      this.total10206c5 = (parseFloat(this.total10206c5) + parseFloat(this.income10206.controls[i].value.GainIncomestmt)).toFixed(2);

      if (this.income10206.controls[i].value.GainProperty == '' || this.income10206.controls[i].value.GainProperty == null || this.income10206.controls[i].value.GainProperty == undefined || this.income10206.controls[i].value.GainProperty == 'undefined') {
        this.income10206.controls[i].patchValue({ "GainProperty": "0.00" });
      }
      else {
        if (this.income10206.controls[i].value.GainProperty.toString().indexOf('.') > -1) {
          this.income10206.controls[i].patchValue({ "GainProperty": (this.income10206.controls[i].value.GainProperty.slice(0, (this.income10206.controls[i].value.GainProperty.indexOf(".")) + 3)) });
        }
        this.income10206.controls[i].patchValue({ "GainProperty": (+this.income10206.controls[i].value.GainProperty).toFixed(2) });
      }
      this.total10206c6 = (parseFloat(this.total10206c6) + parseFloat(this.income10206.controls[i].value.GainProperty)).toFixed(2);
      this.income10206.controls[i].patchValue({
        "EndBal": (parseFloat(this.income10206.controls[i].value.BegBal)
          +
          parseFloat(this.income10206.controls[i].value.AdditionCost)
          -
          parseFloat(this.income10206.controls[i].value.ExclutionCost)
          +
          parseFloat(this.income10206.controls[i].value.Exhaustion)
          +
          parseFloat(this.income10206.controls[i].value.GainIncomestmt)
          +
          parseFloat(this.income10206.controls[i].value.GainProperty)).toFixed(2)
      });
      if (this.income10206.controls[i].value.EndBal == '' || this.income10206.controls[i].value.EndBal == null || this.income10206.controls[i].value.EndBal == undefined || this.income10206.controls[i].value.EndBal == 'undefined') {
        this.income10206.controls[i].patchValue({ "EndBal": "0.00" });
      }
      else {
        if (this.income10206.controls[i].value.EndBal.toString().indexOf('.') > -1) {
          this.income10206.controls[i].patchValue({ "EndBal": (this.income10206.controls[i].value.EndBal.slice(0, (this.income10206.controls[i].value.EndBal.indexOf(".")) + 3)) });
        }
        this.income10206.controls[i].patchValue({ "EndBal": (+this.income10206.controls[i].value.EndBal).toFixed(2) });
        if (parseFloat(this.income10206.controls[i].value.EndBal) < 0) {
          this.income10206.controls[i].patchValue({ "EndBal": "0.00" });
        }
      }
      this.total10206c7 = (parseFloat(this.total10206c7) + parseFloat(this.income10206.controls[i].value.EndBal)).toFixed(2);

      if (this.income10206.controls[i].value.DeductTaxable == '' || this.income10206.controls[i].value.DeductTaxable == null || this.income10206.controls[i].value.DeductTaxable == undefined || this.income10206.controls[i].value.DeductTaxable == 'undefined') {
        this.income10206.controls[i].patchValue({ "DeductTaxable": "0.00" });
      }
      else {
        if (this.income10206.controls[i].value.DeductTaxable.toString().indexOf('.') > -1) {
          this.income10206.controls[i].patchValue({ "DeductTaxable": (this.income10206.controls[i].value.DeductTaxable.slice(0, (this.income10206.controls[i].value.DeductTaxable.indexOf(".")) + 3)) });
        }
        this.income10206.controls[i].patchValue({ "DeductTaxable": (+this.income10206.controls[i].value.DeductTaxable).toFixed(2) });
      }
      this.total10206c8 = (parseFloat(this.total10206c8) + parseFloat(this.income10206.controls[i].value.DeductTaxable)).toFixed(2);
      if (parseFloat(this.income10206.controls[i].value.DeductTaxable) > parseFloat(this.income10206.controls[i].value.EndBal)) {
        this.error110206 = true;
      }
      if (this.income10206.controls[i].value.ExclutionSelling == '' || this.income10206.controls[i].value.ExclutionSelling == null || this.income10206.controls[i].value.ExclutionSelling == undefined || this.income10206.controls[i].value.ExclutionSelling == 'undefined') {
        this.income10206.controls[i].patchValue({ "ExclutionSelling": "0.00" });
      }
      else {
        if (this.income10206.controls[i].value.ExclutionSelling.toString().indexOf('.') > -1) {
          this.income10206.controls[i].patchValue({ "ExclutionSelling": (this.income10206.controls[i].value.ExclutionSelling.slice(0, (this.income10206.controls[i].value.ExclutionSelling.indexOf(".")) + 3)) });
        }
        this.income10206.controls[i].patchValue({ "ExclutionSelling": (+this.income10206.controls[i].value.ExclutionSelling).toFixed(2) });
      }
      if (parseFloat(this.income10206.controls[i].value.ExclutionCost) <= 0) {
        this.income10206.controls[i].patchValue({ "ExclutionSelling": "0.00" });
      }
      this.total10206c9 = (parseFloat(this.total10206c9) + parseFloat(this.income10206.controls[i].value.ExclutionSelling)).toFixed(2);
      this.income10206.controls[i].patchValue({ "ExclutionGain": (parseFloat(this.income10206.controls[i].value.ExclutionSelling) - parseFloat(this.income10206.controls[i].value.ExclutionCost)).toFixed(2) });
      if (this.income10206.controls[i].value.ExclutionGain == '' || this.income10206.controls[i].value.ExclutionGain == null || this.income10206.controls[i].value.ExclutionGain == undefined || this.income10206.controls[i].value.ExclutionGain == 'undefined') {
        this.income10206.controls[i].patchValue({ "ExclutionGain": "0.00" });
      }
      else {
        if (this.income10206.controls[i].value.ExclutionGain.toString().indexOf('.') > -1) {
          this.income10206.controls[i].patchValue({ "ExclutionGain": (this.income10206.controls[i].value.ExclutionGain.slice(0, (this.income10206.controls[i].value.ExclutionGain.indexOf(".")) + 3)) });
        }
        this.income10206.controls[i].patchValue({ "ExclutionGain": (+this.income10206.controls[i].value.ExclutionGain).toFixed(2) });
      }
      this.total10206c10 = (parseFloat(this.total10206c10) + parseFloat(this.income10206.controls[i].value.ExclutionGain)).toFixed(2);
    }
  }
  calCellTotalIncome10207() {
    this.total10207c1 = "0.00";
    this.total10207c2 = "0.00";
    this.total10207c3 = "0.00";
    this.total10207c4 = "0.00";
    this.total10207c5 = "0.00";
    this.total10207c6 = "0.00";
    this.total10207c7 = "0.00";
    this.total10207c8 = "0.00";
    this.total10207c9 = "0.00";
    this.total10207c10 = "0.00";
    for (let i = 0; i < this.income10207.controls.length; i++) {
      if (this.income10207.controls[i].value.BegBal == '' || this.income10207.controls[i].value.BegBal == null || this.income10207.controls[i].value.BegBal == undefined || this.income10207.controls[i].value.BegBal == 'undefined') {
        this.income10207.controls[i].patchValue({ "BegBal": "0.00" });
      }
      else {
        if (this.income10207.controls[i].value.BegBal.toString().indexOf('.') > -1) {
          this.income10207.controls[i].patchValue({ "BegBal": (this.income10207.controls[i].value.BegBal.slice(0, (this.income10207.controls[i].value.BegBal.indexOf(".")) + 3)) });
        }
        this.income10207.controls[i].patchValue({ "BegBal": (+this.income10207.controls[i].value.BegBal).toFixed(2) });
      }
      this.total10207c1 = (parseFloat(this.total10207c1) + parseFloat(this.income10207.controls[i].value.BegBal)).toFixed(2);
      if (this.income10207.controls[i].value.OwnershipRatio == '' || this.income10207.controls[i].value.OwnershipRatio == null || this.income10207.controls[i].value.OwnershipRatio == undefined || this.income10207.controls[i].value.OwnershipRatio == 'undefined') {
        this.income10207.controls[i].patchValue({ "OwnershipRatio": "0" });
      }
      if (this.income10207.controls[i].value.AdditionCost == '' || this.income10207.controls[i].value.AdditionCost == null || this.income10207.controls[i].value.AdditionCost == undefined || this.income10207.controls[i].value.AdditionCost == 'undefined') {
        this.income10207.controls[i].patchValue({ "AdditionCost": "0.00" });
      }
      else {
        if (this.income10207.controls[i].value.AdditionCost.toString().indexOf('.') > -1) {
          this.income10207.controls[i].patchValue({ "AdditionCost": (this.income10207.controls[i].value.AdditionCost.slice(0, (this.income10207.controls[i].value.AdditionCost.indexOf(".")) + 3)) });
        }
        this.income10207.controls[i].patchValue({ "AdditionCost": (+this.income10207.controls[i].value.AdditionCost).toFixed(2) });
      }
      this.total10207c2 = (parseFloat(this.total10207c2) + parseFloat(this.income10207.controls[i].value.AdditionCost)).toFixed(2);

      if (this.income10207.controls[i].value.ExclutionCost == '' || this.income10207.controls[i].value.ExclutionCost == null || this.income10207.controls[i].value.ExclutionCost == undefined || this.income10207.controls[i].value.ExclutionCost == 'undefined') {
        this.income10207.controls[i].patchValue({ "ExclutionCost": "0.00" });
      }
      else {
        if (this.income10207.controls[i].value.ExclutionCost.toString().indexOf('.') > -1) {
          this.income10207.controls[i].patchValue({ "ExclutionCost": (this.income10207.controls[i].value.ExclutionCost.slice(0, (this.income10207.controls[i].value.ExclutionCost.indexOf(".")) + 3)) });
        }
        this.income10207.controls[i].patchValue({ "ExclutionCost": (+this.income10207.controls[i].value.ExclutionCost).toFixed(2) });
      }
      this.total10207c3 = (parseFloat(this.total10207c3) + parseFloat(this.income10207.controls[i].value.ExclutionCost)).toFixed(2);

      if (this.income10207.controls[i].value.CompShare == '' || this.income10207.controls[i].value.CompShare == null || this.income10207.controls[i].value.CompShare == undefined || this.income10207.controls[i].value.CompShare == 'undefined') {
        this.income10207.controls[i].patchValue({ "CompShare": "0.00" });
      }
      else {
        if (this.income10207.controls[i].value.CompShare.toString().indexOf('.') > -1) {
          this.income10207.controls[i].patchValue({ "CompShare": (this.income10207.controls[i].value.CompShare.slice(0, (this.income10207.controls[i].value.CompShare.indexOf(".")) + 3)) });
        }
        this.income10207.controls[i].patchValue({ "CompShare": (+this.income10207.controls[i].value.CompShare).toFixed(2) });
      }
      this.total10207c4 = (parseFloat(this.total10207c4) + parseFloat(this.income10207.controls[i].value.CompShare)).toFixed(2);

      if (this.income10207.controls[i].value.EarningDevidends == '' || this.income10207.controls[i].value.EarningDevidends == null || this.income10207.controls[i].value.EarningDevidends == undefined || this.income10207.controls[i].value.EarningDevidends == 'undefined') {
        this.income10207.controls[i].patchValue({ "EarningDevidends": "0.00" });
      }
      else {
        if (this.income10207.controls[i].value.EarningDevidends.toString().indexOf('.') > -1) {
          this.income10207.controls[i].patchValue({ "EarningDevidends": (this.income10207.controls[i].value.EarningDevidends.slice(0, (this.income10207.controls[i].value.EarningDevidends.indexOf(".")) + 3)) });
        }
        this.income10207.controls[i].patchValue({ "EarningDevidends": (+this.income10207.controls[i].value.EarningDevidends).toFixed(2) });
      }
      this.total10207c5 = (parseFloat(this.total10207c5) + parseFloat(this.income10207.controls[i].value.EarningDevidends)).toFixed(2);

      if (this.income10207.controls[i].value.ProfitDevidends == '' || this.income10207.controls[i].value.ProfitDevidends == null || this.income10207.controls[i].value.ProfitDevidends == undefined || this.income10207.controls[i].value.ProfitDevidends == 'undefined') {
        this.income10207.controls[i].patchValue({ "ProfitDevidends": "0.00" });
      }
      else {
        if (this.income10207.controls[i].value.ProfitDevidends.toString().indexOf('.') > -1) {
          this.income10207.controls[i].patchValue({ "ProfitDevidends": (this.income10207.controls[i].value.ProfitDevidends.slice(0, (this.income10207.controls[i].value.ProfitDevidends.indexOf(".")) + 3)) });
        }
        this.income10207.controls[i].patchValue({ "ProfitDevidends": (+this.income10207.controls[i].value.ProfitDevidends).toFixed(2) });
      }
      this.total10207c6 = (parseFloat(this.total10207c6) + parseFloat(this.income10207.controls[i].value.ProfitDevidends)).toFixed(2);
      this.income10207.controls[i].patchValue({
        "EndBal": (parseFloat(this.income10207.controls[i].value.BegBal)
          +
          parseFloat(this.income10207.controls[i].value.AdditionCost)
          -
          parseFloat(this.income10207.controls[i].value.ExclutionCost)
          +
          parseFloat(this.income10207.controls[i].value.CompShare)
          -
          parseFloat(this.income10207.controls[i].value.EarningDevidends)
          -
          parseFloat(this.income10207.controls[i].value.ProfitDevidends)).toFixed(2)
      });
      if (this.income10207.controls[i].value.EndBal == '' || this.income10207.controls[i].value.EndBal == null || this.income10207.controls[i].value.EndBal == undefined || this.income10207.controls[i].value.EndBal == 'undefined') {
        this.income10207.controls[i].patchValue({ "EndBal": "0.00" });
      }
      else {
        if (this.income10207.controls[i].value.EndBal.toString().indexOf('.') > -1) {
          this.income10207.controls[i].patchValue({ "EndBal": (this.income10207.controls[i].value.EndBal.slice(0, (this.income10207.controls[i].value.EndBal.indexOf(".")) + 3)) });
        }
        this.income10207.controls[i].patchValue({ "EndBal": (+this.income10207.controls[i].value.EndBal).toFixed(2) });
      }
      this.total10207c7 = (parseFloat(this.total10207c7) + parseFloat(this.income10207.controls[i].value.EndBal)).toFixed(2);

      if (this.income10207.controls[i].value.DeductTaxable == '' || this.income10207.controls[i].value.DeductTaxable == null || this.income10207.controls[i].value.DeductTaxable == undefined || this.income10207.controls[i].value.DeductTaxable == 'undefined') {
        this.income10207.controls[i].patchValue({ "DeductTaxable": "0.00" });
      }
      else {
        if (this.income10207.controls[i].value.DeductTaxable.toString().indexOf('.') > -1) {
          this.income10207.controls[i].patchValue({ "DeductTaxable": (this.income10207.controls[i].value.DeductTaxable.slice(0, (this.income10207.controls[i].value.DeductTaxable.indexOf(".")) + 3)) });
        }
        this.income10207.controls[i].patchValue({ "DeductTaxable": (+this.income10207.controls[i].value.DeductTaxable).toFixed(2) });
      }
      this.total10207c8 = (parseFloat(this.total10207c8) + parseFloat(this.income10207.controls[i].value.DeductTaxable)).toFixed(2);
      if (parseFloat(this.income10207.controls[i].value.ExclutionCost) <= 0) {
        this.income10207.controls[i].patchValue({ "ExclutionSelling": "0.00" });
      }
      if (this.income10207.controls[i].value.ExclutionSelling == '' || this.income10207.controls[i].value.ExclutionSelling == null || this.income10207.controls[i].value.ExclutionSelling == undefined || this.income10207.controls[i].value.ExclutionSelling == 'undefined') {
        this.income10207.controls[i].patchValue({ "ExclutionSelling": "0.00" });
      }
      else {
        if (this.income10207.controls[i].value.ExclutionSelling.toString().indexOf('.') > -1) {
          this.income10207.controls[i].patchValue({ "ExclutionSelling": (this.income10207.controls[i].value.ExclutionSelling.slice(0, (this.income10207.controls[i].value.ExclutionSelling.indexOf(".")) + 3)) });
        }
        this.income10207.controls[i].patchValue({ "ExclutionSelling": (+this.income10207.controls[i].value.ExclutionSelling).toFixed(2) });
      }
      this.total10207c9 = (parseFloat(this.total10207c9) + parseFloat(this.income10207.controls[i].value.ExclutionSelling)).toFixed(2);
      this.income10207.controls[i].patchValue({ "ExclutionGain": (parseFloat(this.income10207.controls[i].value.ExclutionSelling) - parseFloat(this.income10207.controls[i].value.ExclutionCost)).toFixed(2) });
      if (this.income10207.controls[i].value.ExclutionGain == '' || this.income10207.controls[i].value.ExclutionGain == null || this.income10207.controls[i].value.ExclutionGain == undefined || this.income10207.controls[i].value.ExclutionGain == 'undefined') {
        this.income10207.controls[i].patchValue({ "ExclutionGain": "0.00" });
      }
      else {
        if (this.income10207.controls[i].value.ExclutionGain.toString().indexOf('.') > -1) {
          this.income10207.controls[i].patchValue({ "ExclutionGain": (this.income10207.controls[i].value.ExclutionGain.slice(0, (this.income10207.controls[i].value.ExclutionGain.indexOf(".")) + 3)) });
        }
        this.income10207.controls[i].patchValue({ "ExclutionGain": (+this.income10207.controls[i].value.ExclutionGain).toFixed(2) });
      }
      this.total10207c10 = (parseFloat(this.total10207c10) + parseFloat(this.income10207.controls[i].value.ExclutionGain)).toFixed(2);
    }
  }
  calCellTotalIncome10205() {
    this.total10205 = "0.00";
    for (let i = 0; i < this.income10205.controls.length; i++) {
      if (this.income10205.controls[i].value.GainLosses == '' || this.income10205.controls[i].value.GainLosses == null || this.income10205.controls[i].value.GainLosses == undefined || this.income10205.controls[i].value.GainLosses == 'undefined') {
        this.income10205.controls[i].patchValue({ "GainLosses": "0.00" });
      }
      else {
        if (this.income10205.controls[i].value.GainLosses.toString().indexOf('.') > -1) {
          this.income10205.controls[i].patchValue({ "GainLosses": (this.income10205.controls[i].value.GainLosses.slice(0, (this.income10205.controls[i].value.GainLosses.indexOf(".")) + 3)) });
        }
        this.income10205.controls[i].patchValue({ "GainLosses": (+this.income10205.controls[i].value.GainLosses).toFixed(2) });
      }
      this.total10205 = (parseFloat(this.total10205) + parseFloat(this.income10205.controls[i].value.GainLosses)).toFixed(2);
    }
  }
  calCellTotalCE10506() {
    this.total10506c1 = "0.00";
    this.total10506c2 = "0.00";
    this.total10506c3 = "0.00";
    this.total10506c4 = "0.00";
    this.total10506c5 = "0.00";
    for (let i = 0; i < this.ce10506.controls.length; i++) {
      if (this.ce10506.controls[i].value.BegBal == '' || this.ce10506.controls[i].value.BegBal == null || this.ce10506.controls[i].value.BegBal == undefined || this.ce10506.controls[i].value.BegBal == 'undefined') {
        this.ce10506.controls[i].patchValue({ "BegBal": "0.00" });
      }
      else {
        if (this.ce10506.controls[i].value.BegBal.toString().indexOf('.') > -1) {
          this.ce10506.controls[i].patchValue({ "BegBal": (this.ce10506.controls[i].value.BegBal.slice(0, (this.ce10506.controls[i].value.BegBal.indexOf(".")) + 3)) });
        }
        this.ce10506.controls[i].patchValue({ "BegBal": (+this.ce10506.controls[i].value.BegBal).toFixed(2) });
      }
      this.total10506c1 = (parseFloat(this.total10506c1) + parseFloat(this.ce10506.controls[i].value.BegBal)).toFixed(2);
      if (this.ce10506.controls[i].value.DirectExp == '' || this.ce10506.controls[i].value.DirectExp == null || this.ce10506.controls[i].value.DirectExp == undefined || this.ce10506.controls[i].value.DirectExp == 'undefined') {
        this.ce10506.controls[i].patchValue({ "DirectExp": "0.00" });
      }
      else {
        if (this.ce10506.controls[i].value.DirectExp.toString().indexOf('.') > -1) {
          this.ce10506.controls[i].patchValue({ "DirectExp": (this.ce10506.controls[i].value.DirectExp.slice(0, (this.ce10506.controls[i].value.DirectExp.indexOf(".")) + 3)) });
        }
        this.ce10506.controls[i].patchValue({ "DirectExp": (+this.ce10506.controls[i].value.DirectExp).toFixed(2) });
      }
      this.total10506c2 = (parseFloat(this.total10506c2) + parseFloat(this.ce10506.controls[i].value.DirectExp)).toFixed(2);
      if (this.ce10506.controls[i].value.IndirectExp == '' || this.ce10506.controls[i].value.IndirectExp == null || this.ce10506.controls[i].value.IndirectExp == undefined || this.ce10506.controls[i].value.IndirectExp == 'undefined') {
        this.ce10506.controls[i].patchValue({ "IndirectExp": "0.00" });
      }
      else {
        if (this.ce10506.controls[i].value.IndirectExp.toString().indexOf('.') > -1) {
          this.ce10506.controls[i].patchValue({ "IndirectExp": (this.ce10506.controls[i].value.IndirectExp.slice(0, (this.ce10506.controls[i].value.IndirectExp.indexOf(".")) + 3)) });
        }
        this.ce10506.controls[i].patchValue({ "IndirectExp": (+this.ce10506.controls[i].value.IndirectExp).toFixed(2) });
      }
      this.total10506c3 = (parseFloat(this.total10506c3) + parseFloat(this.ce10506.controls[i].value.IndirectExp)).toFixed(2);
      if (this.ce10506.controls[i].value.YearPaid == '' || this.ce10506.controls[i].value.YearPaid == null || this.ce10506.controls[i].value.YearPaid == undefined || this.ce10506.controls[i].value.YearPaid == 'undefined') {
        this.ce10506.controls[i].patchValue({ "YearPaid": "0.00" });
      }
      else {
        if (this.ce10506.controls[i].value.YearPaid.toString().indexOf('.') > -1) {
          this.ce10506.controls[i].patchValue({ "YearPaid": (this.ce10506.controls[i].value.YearPaid.slice(0, (this.ce10506.controls[i].value.YearPaid.indexOf(".")) + 3)) });
        }
        this.ce10506.controls[i].patchValue({ "YearPaid": (+this.ce10506.controls[i].value.YearPaid).toFixed(2) });
      }
      this.total10506c4 = (parseFloat(this.total10506c4) + parseFloat(this.ce10506.controls[i].value.YearPaid)).toFixed(2);
      this.ce10506.controls[i].patchValue({ "EndBal": parseFloat(this.ce10506.controls[i].value.BegBal) + parseFloat(this.ce10506.controls[i].value.DirectExp) + parseFloat(this.ce10506.controls[i].value.IndirectExp) - parseFloat(this.ce10506.controls[i].value.YearPaid) });
      if (this.ce10506.controls[i].value.EndBal == '' || this.ce10506.controls[i].value.EndBal == null || this.ce10506.controls[i].value.EndBal == undefined || this.ce10506.controls[i].value.EndBal == 'undefined') {
        this.ce10506.controls[i].patchValue({ "EndBal": "0.00" });
      }
      else {
        if (this.ce10506.controls[i].value.EndBal.toString().indexOf('.') > -1) {
          this.ce10506.controls[i].patchValue({ "EndBal": (this.ce10506.controls[i].value.EndBal.slice(0, (this.ce10506.controls[i].value.EndBal.indexOf(".")) + 3)) });
        }
        this.ce10506.controls[i].patchValue({ "EndBal": (+this.ce10506.controls[i].value.EndBal).toFixed(2) });
      }
      this.total10506c5 = (parseFloat(this.total10506c5) + parseFloat(this.ce10506.controls[i].value.EndBal)).toFixed(2);
    }
  }
  calCellTotalCE10508() {
    this.total10508c1 = "0.00";
    this.total10508c2 = "0.00";
    this.total10508c3 = "0.00";
    this.total10508c4 = "0.00";
    for (let i = 0; i < this.ce10508.controls.length; i++) {
      if (this.ce10508.controls[i].value.BegBal == '' || this.ce10508.controls[i].value.BegBal == null || this.ce10508.controls[i].value.BegBal == undefined || this.ce10508.controls[i].value.BegBal == 'undefined') {
        this.ce10508.controls[i].patchValue({ "BegBal": "0.00" });
      }
      else {
        if (this.ce10508.controls[i].value.BegBal.toString().indexOf('.') > -1) {
          this.ce10508.controls[i].patchValue({ "BegBal": (this.ce10508.controls[i].value.BegBal.slice(0, (this.ce10508.controls[i].value.BegBal.indexOf(".")) + 3)) });
        }
        this.ce10508.controls[i].patchValue({ "BegBal": (+this.ce10508.controls[i].value.BegBal).toFixed(2) });
      }
      this.total10508c1 = (parseFloat(this.total10508c1) + parseFloat(this.ce10508.controls[i].value.BegBal)).toFixed(2);
      if (this.ce10508.controls[i].value.ReceivableYr == '' || this.ce10508.controls[i].value.ReceivableYr == null || this.ce10508.controls[i].value.ReceivableYr == undefined || this.ce10508.controls[i].value.ReceivableYr == 'undefined') {
        this.ce10508.controls[i].patchValue({ "ReceivableYr": "0.00" });
      }
      else {
        if (this.ce10508.controls[i].value.ReceivableYr.toString().indexOf('.') > -1) {
          this.ce10508.controls[i].patchValue({ "ReceivableYr": (this.ce10508.controls[i].value.ReceivableYr.slice(0, (this.ce10508.controls[i].value.ReceivableYr.indexOf(".")) + 3)) });
        }
        this.ce10508.controls[i].patchValue({ "ReceivableYr": (+this.ce10508.controls[i].value.ReceivableYr).toFixed(2) });
      }
      this.total10508c2 = (parseFloat(this.total10508c2) + parseFloat(this.ce10508.controls[i].value.ReceivableYr)).toFixed(2);
      if (this.ce10508.controls[i].value.YearPaid == '' || this.ce10508.controls[i].value.YearPaid == null || this.ce10508.controls[i].value.YearPaid == undefined || this.ce10508.controls[i].value.YearPaid == 'undefined') {
        this.ce10508.controls[i].patchValue({ "YearPaid": "0.00" });
      }
      else {
        if (this.ce10508.controls[i].value.YearPaid.toString().indexOf('.') > -1) {
          this.ce10508.controls[i].patchValue({ "YearPaid": (this.ce10508.controls[i].value.YearPaid.slice(0, (this.ce10508.controls[i].value.YearPaid.indexOf(".")) + 3)) });
        }
        this.ce10508.controls[i].patchValue({ "YearPaid": (+this.ce10508.controls[i].value.YearPaid).toFixed(2) });
      }
      this.total10508c3 = (parseFloat(this.total10508c3) + parseFloat(this.ce10508.controls[i].value.YearPaid)).toFixed(2);
      this.ce10508.controls[i].patchValue({ "EndBal": parseFloat(this.ce10508.controls[i].value.BegBal) + parseFloat(this.ce10508.controls[i].value.ReceivableYr) - parseFloat(this.ce10508.controls[i].value.YearPaid) });
      if (this.ce10508.controls[i].value.EndBal == '' || this.ce10508.controls[i].value.EndBal == null || this.ce10508.controls[i].value.EndBal == undefined || this.ce10508.controls[i].value.EndBal == 'undefined') {
        this.ce10508.controls[i].patchValue({ "EndBal": "0.00" });
      }
      else {
        if (this.ce10508.controls[i].value.EndBal.toString().indexOf('.') > -1) {
          this.ce10508.controls[i].patchValue({ "EndBal": (this.ce10508.controls[i].value.EndBal.slice(0, (this.ce10508.controls[i].value.EndBal.indexOf(".")) + 3)) });
        }
        this.ce10508.controls[i].patchValue({ "EndBal": (+this.ce10508.controls[i].value.EndBal).toFixed(2) });
      }
      this.total10508c4 = (parseFloat(this.total10508c4) + parseFloat(this.ce10508.controls[i].value.EndBal)).toFixed(2);
    }
  }
  calCellTotalCE10511() {
    this.total10511 = "0.00";
    for (let i = 0; i < this.ce10511.controls.length; i++) {
      if (this.ce10511.controls[i].value.Value == '' || this.ce10511.controls[i].value.Value == null || this.ce10511.controls[i].value.Value == undefined || this.ce10511.controls[i].value.Value == 'undefined') {
        this.ce10511.controls[i].patchValue({ "Value": "0.00" });
      }
      else {
        if (this.ce10511.controls[i].value.Value.toString().indexOf('.') > -1) {
          this.ce10511.controls[i].patchValue({ "Value": (this.ce10511.controls[i].value.Value.slice(0, (this.ce10511.controls[i].value.Value.indexOf(".")) + 3)) });
        }
        this.ce10511.controls[i].patchValue({ "Value": (+this.ce10511.controls[i].value.Value).toFixed(2) });
      }
      this.total10511 = (parseFloat(this.total10511) + parseFloat(this.ce10511.controls[i].value.Value)).toFixed(2);
    }
  }
  calCellTotalCE10809() {
    this.total10809c1 = "0.00";
    this.total10809c2 = "0.00";
    this.total10809c3 = "0.00";
    this.total10809c4 = "0.00";
    this.total10809c5 = "0.00";
    for (let i = 0; i < this.ce10809.controls.length; i++) {
      if (this.ce10809.controls[i].value.BegBal == '' || this.ce10809.controls[i].value.BegBal == null || this.ce10809.controls[i].value.BegBal == undefined || this.ce10809.controls[i].value.BegBal == 'undefined') {
        this.ce10809.controls[i].patchValue({ "BegBal": "0.00" });
      }
      else {
        if (this.ce10809.controls[i].value.BegBal.toString().indexOf('.') > -1) {
          this.ce10809.controls[i].patchValue({ "BegBal": (this.ce10809.controls[i].value.BegBal.slice(0, (this.ce10809.controls[i].value.BegBal.indexOf(".")) + 3)) });
        }
        this.ce10809.controls[i].patchValue({ "BegBal": (+this.ce10809.controls[i].value.BegBal).toFixed(2) });
      }
      this.total10809c1 = (parseFloat(this.total10809c1) + parseFloat(this.ce10809.controls[i].value.BegBal)).toFixed(2);

      if (this.ce10809.controls[i].value.MadeBal == '' || this.ce10809.controls[i].value.MadeBal == null || this.ce10809.controls[i].value.MadeBal == undefined || this.ce10809.controls[i].value.MadeBal == 'undefined') {
        this.ce10809.controls[i].patchValue({ "MadeBal": "0.00" });
      }
      else {
        if (this.ce10809.controls[i].value.MadeBal.toString().indexOf('.') > -1) {
          this.ce10809.controls[i].patchValue({ "MadeBal": (this.ce10809.controls[i].value.MadeBal.slice(0, (this.ce10809.controls[i].value.MadeBal.indexOf(".")) + 3)) });
        }
        this.ce10809.controls[i].patchValue({ "MadeBal": (+this.ce10809.controls[i].value.MadeBal).toFixed(2) });
      }
      this.total10809c2 = (parseFloat(this.total10809c2) + parseFloat(this.ce10809.controls[i].value.MadeBal)).toFixed(2);

      if (this.ce10809.controls[i].value.UsedBal == '' || this.ce10809.controls[i].value.UsedBal == null || this.ce10809.controls[i].value.UsedBal == undefined || this.ce10809.controls[i].value.UsedBal == 'undefined') {
        this.ce10809.controls[i].patchValue({ "UsedBal": "0.00" });
      }
      else {
        if (this.ce10809.controls[i].value.UsedBal.toString().indexOf('.') > -1) {
          this.ce10809.controls[i].patchValue({ "UsedBal": (this.ce10809.controls[i].value.UsedBal.slice(0, (this.ce10809.controls[i].value.UsedBal.indexOf(".")) + 3)) });
        }
        this.ce10809.controls[i].patchValue({ "UsedBal": (+this.ce10809.controls[i].value.UsedBal).toFixed(2) });
      }
      this.total10809c3 = (parseFloat(this.total10809c3) + parseFloat(this.ce10809.controls[i].value.UsedBal)).toFixed(2);

      if (this.ce10809.controls[i].value.Settlements == '' || this.ce10809.controls[i].value.Settlements == null || this.ce10809.controls[i].value.Settlements == undefined || this.ce10809.controls[i].value.Settlements == 'undefined') {
        this.ce10809.controls[i].patchValue({ "Settlements": "0.00" });
      }
      else {
        if (this.ce10809.controls[i].value.Settlements.toString().indexOf('.') > -1) {
          this.ce10809.controls[i].patchValue({ "Settlements": (this.ce10809.controls[i].value.Settlements.slice(0, (this.ce10809.controls[i].value.Settlements.indexOf(".")) + 3)) });
        }
        this.ce10809.controls[i].patchValue({ "Settlements": (+this.ce10809.controls[i].value.Settlements).toFixed(2) });
      }
      this.total10809c4 = (parseFloat(this.total10809c4) + parseFloat(this.ce10809.controls[i].value.Settlements)).toFixed(2);
      this.ce10809.controls[i].patchValue({ "EndBal": (parseFloat(this.ce10809.controls[i].value.BegBal) + parseFloat(this.ce10809.controls[i].value.MadeBal) + parseFloat(this.ce10809.controls[i].value.UsedBal) + parseFloat(this.ce10809.controls[i].value.Settlements)).toFixed(2) });
      if (this.ce10809.controls[i].value.EndBal == '' || this.ce10809.controls[i].value.EndBal == null || this.ce10809.controls[i].value.EndBal == undefined || this.ce10809.controls[i].value.EndBal == 'undefined') {
        this.ce10809.controls[i].patchValue({ "EndBal": "0.00" });
      }
      else {
        if (this.ce10809.controls[i].value.EndBal.toString().indexOf('.') > -1) {
          this.ce10809.controls[i].patchValue({ "EndBal": (this.ce10809.controls[i].value.EndBal.slice(0, (this.ce10809.controls[i].value.EndBal.indexOf(".")) + 3)) });
        }
        this.ce10809.controls[i].patchValue({ "EndBal": (+this.ce10809.controls[i].value.EndBal).toFixed(2) });
      }
      this.total10809c5 = (parseFloat(this.total10809c5) + parseFloat(this.ce10809.controls[i].value.EndBal)).toFixed(2);
    }
  }
  calCellTotalCE10822() {
    this.total10822 = "0.00";
    for (let i = 0; i < this.ce10822.controls.length; i++) {
      if (this.ce10822.controls[i].value.Value == '' || this.ce10822.controls[i].value.Value == null || this.ce10822.controls[i].value.Value == undefined || this.ce10822.controls[i].value.Value == 'undefined') {
        this.ce10822.controls[i].patchValue({ "Value": "0.00" });
      }
      else {
        if (this.ce10822.controls[i].value.Value.toString().indexOf('.') > -1) {
          this.ce10822.controls[i].patchValue({ "Value": (this.ce10822.controls[i].value.Value.slice(0, (this.ce10822.controls[i].value.Value.indexOf(".")) + 3)) });
        }
        this.ce10822.controls[i].patchValue({ "Value": (+this.ce10822.controls[i].value.Value).toFixed(2) });
      }
      this.total10822 = (parseFloat(this.total10822) + parseFloat(this.ce10822.controls[i].value.Value)).toFixed(2);
    }
  }
  addPopup() {
    jQuery('body').addClass('modalopen');
    this.noOfAddedForms = 10;
  }
  clsePopup() {
    jQuery('body').removeClass('modalopen');
  }
  globalNumberAllow14(event) {
    //console.log(event.target.value)
    var rgx = /^\d{0,14}(\.\d{0,2})?$/;
    //console.log(event.target.value);
    if (event.keyCode == 8) {
      return true;
    }
    else if (event.keyCode == 32) {
      event.preventDefault();
    }
    else if (!rgx.test((event.target.value).toString().replace(/,/g, ''))) {
      event.preventDefault();
    }
  }
  restrictFirstSpace(event, value) {
    if (event.which === 32 && !value.length) { event.preventDefault(); }
  }
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  calCellTotalIncome10204() {
    this.total10204 = "0.00";
    for (let i = 0; i < this.income10204.controls.length; i++) {
      if (this.income10204.controls[i].value.GainLosses == '' || this.income10204.controls[i].value.GainLosses == null || this.income10204.controls[i].value.GainLosses == undefined || this.income10204.controls[i].value.GainLosses == 'undefined') {
        this.income10204.controls[i].patchValue({ "GainLosses": "0.00" });
      }
      else {
        if (this.income10204.controls[i].value.GainLosses.toString().indexOf('.') > -1) {
          this.income10204.controls[i].patchValue({ "GainLosses": (this.income10204.controls[i].value.GainLosses.slice(0, (this.income10204.controls[i].value.GainLosses.indexOf(".")) + 3)) });
        }
        this.income10204.controls[i].patchValue({ "GainLosses": (+this.income10204.controls[i].value.GainLosses).toFixed(2) });
      }
      this.total10204 = (parseFloat(this.total10204) + parseFloat(this.income10204.controls[i].value.GainLosses)).toFixed(2);
    }
  }
  calCellTotalIncome10807() {
    this.total10807 = "0.00";
    for (let i = 0; i < this.income10807.controls.length; i++) {
      if (this.income10807.controls[i].value.Amt == '' || this.income10807.controls[i].value.Amt == null || this.income10807.controls[i].value.Amt == undefined || this.income10807.controls[i].value.Amt == 'undefined') {
        this.income10807.controls[i].patchValue({ "Amt": "0.00" });
      }
      else {
        if (this.income10807.controls[i].value.Amt.toString().indexOf('.') > -1) {
          this.income10807.controls[i].patchValue({ "Amt": (this.income10807.controls[i].value.Amt.slice(0, (this.income10807.controls[i].value.Amt.indexOf(".")) + 3)) });
        }
        this.income10807.controls[i].patchValue({ "Amt": (+this.income10807.controls[i].value.Amt).toFixed(2) });
      }
      this.total10807 = (parseFloat(this.total10807) + parseFloat(this.income10807.controls[i].value.Amt)).toFixed(2);
    }
  }
  calCellTotalIncome10814() {
    this.total10814 = "0.00";
    for (let i = 0; i < this.income10814.controls.length; i++) {
      if (this.income10814.controls[i].value.PaidAmt == '' || this.income10814.controls[i].value.PaidAmt == null || this.income10814.controls[i].value.PaidAmt == undefined || this.income10814.controls[i].value.PaidAmt == 'undefined') {
        this.income10814.controls[i].patchValue({ "PaidAmt": "0.00" });
      }
      else {
        if (this.income10814.controls[i].value.PaidAmt.toString().indexOf('.') > -1) {
          this.income10814.controls[i].patchValue({ "PaidAmt": (this.income10814.controls[i].value.PaidAmt.slice(0, (this.income10814.controls[i].value.PaidAmt.indexOf(".")) + 3)) });
        }
        this.income10814.controls[i].patchValue({ "PaidAmt": (+this.income10814.controls[i].value.PaidAmt).toFixed(2) });
      }
      this.total10814 = (parseFloat(this.total10814) + parseFloat(this.income10814.controls[i].value.PaidAmt)).toFixed(2);
    }
  }
  calCellTotalIncome10815() {
    this.total10815 = "0.00";
    for (let i = 0; i < this.income10815.controls.length; i++) {
      if (this.income10815.controls[i].value.Amt == '' || this.income10815.controls[i].value.Amt == null || this.income10815.controls[i].value.Amt == undefined || this.income10815.controls[i].value.Amt == 'undefined') {
        this.income10815.controls[i].patchValue({ "Amt": "0.00" });
      }
      else {
        if (this.income10815.controls[i].value.Amt.toString().indexOf('.') > -1) {
          this.income10815.controls[i].patchValue({ "Amt": (this.income10815.controls[i].value.Amt.slice(0, (this.income10815.controls[i].value.Amt.indexOf(".")) + 3)) });
        }
        this.income10815.controls[i].patchValue({ "Amt": (+this.income10815.controls[i].value.Amt).toFixed(2) });
      }
      this.total10815 = (parseFloat(this.total10815) + parseFloat(this.income10815.controls[i].value.Amt)).toFixed(2);
    }
  }
  saveIncome10204() {
    this.taxPayerDetails.AGains = (+this.total10204).toFixed(2);
    let FormGuid = this.taxPayerDetails.Sch_10204Set["results"][0]["FormGuid"];
    this.taxPayerDetails.Sch_10204Set["results"] = [];
    for (let i = 0; i < this.income10204.controls.length; i++) {
      this.taxPayerDetails.Sch_10204Set["results"].push({});
      this.taxPayerDetails.Sch_10204Set["results"][i]["LineNo"] = i + 1;
      this.taxPayerDetails.Sch_10204Set["results"][i]["FormGuid"] = FormGuid;
      this.taxPayerDetails.Sch_10204Set["results"][i]["RankingOrder"] = "99";
      this.taxPayerDetails.Sch_10204Set["results"][i]["Waers"] = "SAR";
      this.taxPayerDetails.Sch_10204Set["results"][i]["CompanyNm"] = this.income10204.controls[i].value.CompanyNm;
      this.taxPayerDetails.Sch_10204Set["results"][i]["InvestmentTp"] = this.income10204.controls[i].value.InvestmentTp;
      this.taxPayerDetails.Sch_10204Set["results"][i]["GainLosses"] = (+this.income10204.controls[i].value.GainLosses).toFixed(2);
      let newIndex = this.income10206.controls.length;
      this.addRowIncome10206();
      this.income10206.controls[newIndex].patchValue({ "CompNm": this.income10204.controls[i].value.CompanyNm });
      this.income10206.controls[newIndex].patchValue({ "CompTp": this.income10204.controls[i].value.InvestmentTp });
      this.income10206.controls[newIndex].patchValue({ "BegBal": "0.00" });
      this.income10206.controls[newIndex].patchValue({ "AdditionCost": "0.00" });
      this.income10206.controls[newIndex].patchValue({ "ExclutionCost": "0.00" });
      this.income10206.controls[newIndex].patchValue({ "Exhaustion": "0.00" });
      this.income10206.controls[newIndex].patchValue({ "GainIncomestmt": (+this.income10204.controls[i].value.GainLosses).toFixed(2) });
      this.income10206.controls[newIndex].patchValue({ "GainProperty": "0.00" });
      this.income10206.controls[newIndex].patchValue({ "EndBal": (+this.income10204.controls[i].value.GainLosses).toFixed(2) });
      this.income10206.controls[newIndex].patchValue({ "DeductTaxable": "0.00" });
      this.income10206.controls[newIndex].patchValue({ "ExclutionSelling": "0.00" });
      this.income10206.controls[newIndex].patchValue({ "ExclutionGain": "0.00" });
    }
    jQuery("#gainlosses").modal('hide');
    this.taxPayerDetails.AGainsChk = "1";
    this.taxPayerDetails.ADividendsChk = "1";
    this.form10206.patchValue({ "Schedule": true });
    this.calCellTotalIncome10206();
    this.calIncomeCoverForm();
    this.clsePopup();
  }
  saveIncome10205() {
    this.taxPayerDetails.ACompShare = (+this.total10205).toFixed(2);
    let FormGuid = this.taxPayerDetails.Sch_10205Set["results"][0]["FormGuid"];
    this.taxPayerDetails.Sch_10205Set["results"] = [];
    for (let i = 0; i < this.income10205.controls.length; i++) {
      this.taxPayerDetails.Sch_10205Set["results"].push({});
      this.taxPayerDetails.Sch_10205Set["results"][i]["LineNo"] = i + 1;
      this.taxPayerDetails.Sch_10205Set["results"][i]["FormGuid"] = FormGuid;
      this.taxPayerDetails.Sch_10205Set["results"][i]["RankingOrder"] = "99";
      this.taxPayerDetails.Sch_10205Set["results"][i]["Waers"] = "SAR";
      this.taxPayerDetails.Sch_10205Set["results"][i]["CompanyNm"] = this.income10205.controls[i].value.CompanyNm;
      this.taxPayerDetails.Sch_10205Set["results"][i]["InvestmentTp"] = this.income10205.controls[i].value.InvestmentTp;
      this.taxPayerDetails.Sch_10205Set["results"][i]["GainLosses"] = (+this.income10205.controls[i].value.GainLosses).toFixed(2);
      let newIndex = this.income10207.controls.length;
      this.addRowIncome10207();
      this.income10207.controls[newIndex].patchValue({ "OwnershipRatio": "0" });
      this.income10207.controls[newIndex].patchValue({ "CompNm": this.income10205.controls[i].value.CompanyNm });
      this.income10207.controls[newIndex].patchValue({ "CompTp": this.income10205.controls[i].value.InvestmentTp });
      this.income10207.controls[newIndex].patchValue({ "BegBal": "0.00" });
      this.income10207.controls[newIndex].patchValue({ "AdditionCost": "0.00" });
      this.income10207.controls[newIndex].patchValue({ "ExclutionCost": "0.00" });
      this.income10207.controls[newIndex].patchValue({ "CompShare": (+this.income10205.controls[i].value.GainLosses).toFixed(2) });
      this.income10207.controls[newIndex].patchValue({ "EarningDevidends": "0.00" });
      this.income10207.controls[newIndex].patchValue({ "ProfitDevidends": "0.00" });
      this.income10207.controls[newIndex].patchValue({ "EndBal": (+this.income10205.controls[i].value.GainLosses).toFixed(2) });
      this.income10207.controls[newIndex].patchValue({ "DeductTaxable": "0.00" });
      this.income10207.controls[newIndex].patchValue({ "ExclutionSelling": "0.00" });
      this.income10207.controls[newIndex].patchValue({ "ExclutionGain": "0.00" });
    }
    jQuery("#companyyprofit").modal('hide');
    this.taxPayerDetails.ACompShareChk = "1";
    this.taxPayerDetails.ASaleGainChk = "1";
    this.form10207.patchValue({ "Schedule": true });
    this.calCellTotalIncome10207();
    this.calIncomeCoverForm();
    this.clsePopup();
  }
  saveIncome10206() {
    this.taxPayerDetails.ADividends = (+this.total10206c10).toFixed(2);
    let FormGuid = this.taxPayerDetails.Sch_10206Set["results"][0]["FormGuid"];
    this.taxPayerDetails.Sch_10206Set["results"] = [];
    for (let i = 0; i < this.income10206.controls.length; i++) {
      this.taxPayerDetails.Sch_10206Set["results"].push({});
      this.taxPayerDetails.Sch_10206Set["results"][i]["LineNo"] = i + 1;
      this.taxPayerDetails.Sch_10206Set["results"][i]["FormGuid"] = FormGuid;
      this.taxPayerDetails.Sch_10206Set["results"][i]["RankingOrder"] = "99";
      this.taxPayerDetails.Sch_10206Set["results"][i]["Waers"] = "SAR";
      this.taxPayerDetails.Sch_10206Set["results"][i]["CompNm"] = this.income10206.controls[i].value.CompNm;
      this.taxPayerDetails.Sch_10206Set["results"][i]["CompTp"] = this.income10206.controls[i].value.CompTp;
      this.taxPayerDetails.Sch_10206Set["results"][i]["BegBal"] = (+this.income10206.controls[i].value.BegBal).toFixed(2);
      this.taxPayerDetails.Sch_10206Set["results"][i]["AdditionCost"] = (+this.income10206.controls[i].value.AdditionCost).toFixed(2);
      this.taxPayerDetails.Sch_10206Set["results"][i]["ExclutionCost"] = (+this.income10206.controls[i].value.ExclutionCost).toFixed(2);
      this.taxPayerDetails.Sch_10206Set["results"][i]["Exhaustion"] = (+this.income10206.controls[i].value.Exhaustion).toFixed(2);
      this.taxPayerDetails.Sch_10206Set["results"][i]["GainIncomestmt"] = (+this.income10206.controls[i].value.GainIncomestmt).toFixed(2);
      this.taxPayerDetails.Sch_10206Set["results"][i]["GainProperty"] = (+this.income10206.controls[i].value.GainProperty).toFixed(2);
      this.taxPayerDetails.Sch_10206Set["results"][i]["EndBal"] = (+this.income10206.controls[i].value.EndBal).toFixed(2);
      this.taxPayerDetails.Sch_10206Set["results"][i]["DeductTaxable"] = (+this.income10206.controls[i].value.DeductTaxable).toFixed(2);
      this.taxPayerDetails.Sch_10206Set["results"][i]["ExclutionSelling"] = (+this.income10206.controls[i].value.ExclutionSelling).toFixed(2);
      this.taxPayerDetails.Sch_10206Set["results"][i]["ExclutionGain"] = (+this.income10206.controls[i].value.ExclutionGain).toFixed(2);
    }
    jQuery("#gainonsale").modal('hide');
    this.taxPayerDetails.ADividendsChk = "1";
    this.calIncomeCoverForm();
    this.clsePopup();
  }
  saveIncome10207() {
    this.taxPayerDetails.ASaleGain = (+this.total10207c10).toFixed(2);
    let FormGuid = this.taxPayerDetails.Sch_10207Set["results"][0]["FormGuid"];
    this.taxPayerDetails.Sch_10207Set["results"] = [];
    for (let i = 0; i < this.income10207.controls.length; i++) {
      this.taxPayerDetails.Sch_10207Set["results"].push({});
      this.taxPayerDetails.Sch_10207Set["results"][i]["LineNo"] = i + 1;
      this.taxPayerDetails.Sch_10207Set["results"][i]["FormGuid"] = FormGuid;
      this.taxPayerDetails.Sch_10207Set["results"][i]["RankingOrder"] = "99";
      this.taxPayerDetails.Sch_10207Set["results"][i]["Waers"] = "SAR";
      this.taxPayerDetails.Sch_10207Set["results"][i]["CompNm"] = this.income10207.controls[i].value.CompNm;
      this.taxPayerDetails.Sch_10207Set["results"][i]["CompTp"] = this.income10207.controls[i].value.CompTp;
      this.taxPayerDetails.Sch_10207Set["results"][i]["OwnershipRatio"] = this.income10207.controls[i].value.OwnershipRatio;
      this.taxPayerDetails.Sch_10207Set["results"][i]["BegBal"] = (+this.income10207.controls[i].value.BegBal).toFixed(2);
      this.taxPayerDetails.Sch_10207Set["results"][i]["AdditionCost"] = (+this.income10207.controls[i].value.AdditionCost).toFixed(2);
      this.taxPayerDetails.Sch_10207Set["results"][i]["ExclutionCost"] = (+this.income10207.controls[i].value.ExclutionCost).toFixed(2);
      this.taxPayerDetails.Sch_10207Set["results"][i]["CompShare"] = (+this.income10207.controls[i].value.CompShare).toFixed(2);
      this.taxPayerDetails.Sch_10207Set["results"][i]["EarningDevidends"] = (+this.income10207.controls[i].value.EarningDevidends).toFixed(2);
      this.taxPayerDetails.Sch_10207Set["results"][i]["ProfitDevidends"] = (+this.income10207.controls[i].value.ProfitDevidends).toFixed(2);
      this.taxPayerDetails.Sch_10207Set["results"][i]["EndBal"] = (+this.income10207.controls[i].value.EndBal).toFixed(2);
      this.taxPayerDetails.Sch_10207Set["results"][i]["DeductTaxable"] = (+this.income10207.controls[i].value.DeductTaxable).toFixed(2);
      this.taxPayerDetails.Sch_10207Set["results"][i]["ExclutionSelling"] = (+this.income10207.controls[i].value.ExclutionSelling).toFixed(2);
      this.taxPayerDetails.Sch_10207Set["results"][i]["ExclutionGain"] = (+this.income10207.controls[i].value.ExclutionGain).toFixed(2);
    }
    jQuery("#gainonsaleinsvt").modal('hide');
    this.taxPayerDetails.ASaleGainChk = "1";
    this.calIncomeCoverForm();
    this.clsePopup();
  }
  saveCE10506() {
    this.taxPayerDetails.ARents10506 = (+this.total10506c2).toFixed(2);
    this.taxPayerDetails.ARents10808 = (+this.total10506c3).toFixed(2);
    let FormGuid = this.taxPayerDetails.Sch_10506Set["results"][0]["FormGuid"];
    this.taxPayerDetails.Sch_10506Set["results"] = [];
    for (let i = 0; i < this.ce10506.controls.length; i++) {
      this.taxPayerDetails.Sch_10506Set["results"].push({});
      this.taxPayerDetails.Sch_10506Set["results"][i]["LineNo"] = i + 1;
      this.taxPayerDetails.Sch_10506Set["results"][i]["FormGuid"] = FormGuid;
      this.taxPayerDetails.Sch_10506Set["results"][i]["RankingOrder"] = "99";
      this.taxPayerDetails.Sch_10506Set["results"][i]["Waers"] = "SAR";
      this.taxPayerDetails.Sch_10506Set["results"][i]["DropDown"] = this.ce10506.controls[i].value.DropDown;
      this.taxPayerDetails.Sch_10506Set["results"][i]["Crtinfin"] = this.ce10506.controls[i].value.Crtinfin;
      this.taxPayerDetails.Sch_10506Set["results"][i]["ContractorNm"] = this.ce10506.controls[i].value.ContractorNm;
      this.taxPayerDetails.Sch_10506Set["results"][i]["Addr"] = this.ce10506.controls[i].value.Addr;
      this.taxPayerDetails.Sch_10506Set["results"][i]["BegBal"] = this.ce10506.controls[i].value.BegBal;
      this.taxPayerDetails.Sch_10506Set["results"][i]["DirectExp"] = this.ce10506.controls[i].value.DirectExp;
      this.taxPayerDetails.Sch_10506Set["results"][i]["IndirectExp"] = this.ce10506.controls[i].value.IndirectExp;
      this.taxPayerDetails.Sch_10506Set["results"][i]["YearPaid"] = this.ce10506.controls[i].value.YearPaid;
      this.taxPayerDetails.Sch_10506Set["results"][i]["EndBal"] = this.ce10506.controls[i].value.EndBal;
    }
    jQuery("#rents10506").modal('hide');
    this.taxPayerDetails.ARents10506Chk = "1";
    this.taxPayerDetails.ARents10808Chk = "1";
    this.calCECoverForm();
    this.clsePopup();
  }
  saveCE10508() {
    this.taxPayerDetails.AMachinery = (+this.total10508c4).toFixed(2);
    let FormGuid = this.taxPayerDetails.Sch_10508Set["results"][0]["FormGuid"];
    this.taxPayerDetails.Sch_10508Set["results"] = [];
    for (let i = 0; i < this.ce10508.controls.length; i++) {
      this.taxPayerDetails.Sch_10508Set["results"].push({});
      this.taxPayerDetails.Sch_10508Set["results"][i]["LineNo"] = i + 1;
      this.taxPayerDetails.Sch_10508Set["results"][i]["FormGuid"] = FormGuid;
      this.taxPayerDetails.Sch_10508Set["results"][i]["RankingOrder"] = "99";
      this.taxPayerDetails.Sch_10508Set["results"][i]["Waers"] = "SAR";
      this.taxPayerDetails.Sch_10508Set["results"][i]["DropDown"] = this.ce10508.controls[i].value.DropDown;
      this.taxPayerDetails.Sch_10508Set["results"][i]["Crtinfin"] = this.ce10508.controls[i].value.Crtinfin;
      this.taxPayerDetails.Sch_10508Set["results"][i]["ContractorNm"] = this.ce10508.controls[i].value.ContractorNm;
      this.taxPayerDetails.Sch_10508Set["results"][i]["Addr"] = this.ce10508.controls[i].value.Addr;
      this.taxPayerDetails.Sch_10508Set["results"][i]["BegBal"] = this.ce10508.controls[i].value.BegBal;
      this.taxPayerDetails.Sch_10508Set["results"][i]["ReceivableYr"] = this.ce10508.controls[i].value.ReceivableYr;
      this.taxPayerDetails.Sch_10508Set["results"][i]["YearPaid"] = this.ce10508.controls[i].value.YearPaid;
      this.taxPayerDetails.Sch_10508Set["results"][i]["EndBal"] = this.ce10508.controls[i].value.EndBal;
    }
    jQuery("#rentalmachinery10508").modal('hide');
    this.taxPayerDetails.AMachineryChk = "1";
    this.calCECoverForm();
    this.clsePopup();
  }
  saveCE10511() {
    this.taxPayerDetails.AOtherDirect = (+this.total10511).toFixed(2);
    let FormGuid = this.taxPayerDetails.Sch_10510Set["results"][0]["FormGuid"];
    this.taxPayerDetails.Sch_10510Set["results"] = [];
    for (let i = 0; i < this.ce10511.controls.length; i++) {
      this.taxPayerDetails.Sch_10510Set["results"].push({});
      this.taxPayerDetails.Sch_10510Set["results"][i]["LineNo"] = i + 1;
      this.taxPayerDetails.Sch_10510Set["results"][i]["FormGuid"] = FormGuid;
      this.taxPayerDetails.Sch_10510Set["results"][i]["RankingOrder"] = "99";
      this.taxPayerDetails.Sch_10510Set["results"][i]["Waers"] = "SAR";
      this.taxPayerDetails.Sch_10510Set["results"][i]["Stmt"] = this.ce10511.controls[i].value.Stmt;
      this.taxPayerDetails.Sch_10510Set["results"][i]["Value"] = (+this.ce10511.controls[i].value.Value).toFixed(2);
    }
    jQuery("#otherdirect10511").modal('hide');
    this.taxPayerDetails.AOtherDirectChk = "1";
    this.calCECoverForm();
    this.clsePopup();
  }
  saveIncome10807() {
    this.taxPayerDetails.ATechnicalFees = (+this.total10807).toFixed(2);
    let FormGuid = this.taxPayerDetails.Sch_10807Set["results"][0]["FormGuid"];
    this.taxPayerDetails.Sch_10807Set["results"] = [];
    for (let i = 0; i < this.income10807.controls.length; i++) {
      this.taxPayerDetails.Sch_10807Set["results"].push({});
      this.taxPayerDetails.Sch_10807Set["results"][i]["LineNo"] = i + 1;
      this.taxPayerDetails.Sch_10807Set["results"][i]["FormGuid"] = FormGuid;
      this.taxPayerDetails.Sch_10807Set["results"][i]["RankingOrder"] = "99";
      this.taxPayerDetails.Sch_10807Set["results"][i]["Waers"] = "SAR";
      this.taxPayerDetails.Sch_10807Set["results"][i]["DropDown"] = this.income10807.controls[i].value.DropDown;
      this.taxPayerDetails.Sch_10807Set["results"][i]["Crtinfin"] = this.income10807.controls[i].value.Crtinfin;
      this.taxPayerDetails.Sch_10807Set["results"][i]["BeneficiaryNm"] = this.income10807.controls[i].value.BeneficiaryNm;
      this.taxPayerDetails.Sch_10807Set["results"][i]["Addr"] = this.income10807.controls[i].value.Addr;
      this.taxPayerDetails.Sch_10807Set["results"][i]["LocalForeigner"] = this.income10807.controls[i].value.LocalForeigner;
      this.taxPayerDetails.Sch_10807Set["results"][i]["Amt"] = (+this.income10807.controls[i].value.Amt).toFixed(2);
    }
    jQuery("#techincal10807").modal('hide');
    this.taxPayerDetails.ATechnicalFeesChk = "1";
    this.cal5CoverForm();
    this.clsePopup();
  }
  saveCE10809() {
    this.taxPayerDetails.AProvisions = (+this.total10809c2).toFixed(2);
    let FormGuid = this.taxPayerDetails.Sch_10809Set["results"][0]["FormGuid"];
    this.taxPayerDetails.Sch_10809Set["results"] = [];
    for (let i = 0; i < this.ce10809.controls.length; i++) {
      this.taxPayerDetails.Sch_10809Set["results"].push({});
      this.taxPayerDetails.Sch_10809Set["results"][i]["LineNo"] = i + 1;
      this.taxPayerDetails.Sch_10809Set["results"][i]["FormGuid"] = FormGuid;
      this.taxPayerDetails.Sch_10809Set["results"][i]["RankingOrder"] = "99";
      this.taxPayerDetails.Sch_10809Set["results"][i]["Waers"] = "SAR";
      this.taxPayerDetails.Sch_10809Set["results"][i]["AllocatedNm"] = this.ce10809.controls[i].value.AllocatedNm;
      this.taxPayerDetails.Sch_10809Set["results"][i]["BegBal"] = (+this.ce10809.controls[i].value.BegBal).toFixed(2);
      this.taxPayerDetails.Sch_10809Set["results"][i]["MadeBal"] = (+this.ce10809.controls[i].value.MadeBal).toFixed(2);
      this.taxPayerDetails.Sch_10809Set["results"][i]["UsedBal"] = (+this.ce10809.controls[i].value.UsedBal).toFixed(2);
      this.taxPayerDetails.Sch_10809Set["results"][i]["Settlements"] = (+this.ce10809.controls[i].value.Settlements).toFixed(2);
      this.taxPayerDetails.Sch_10809Set["results"][i]["EndBal"] = (+this.ce10809.controls[i].value.EndBal).toFixed(2);
    }
    jQuery("#provisions10809").modal('hide');
    this.taxPayerDetails.AProvisionsChk = "1";
    this.cal5CoverForm();
    this.clsePopup();
  }
  saveIncome10814() {
    this.taxPayerDetails.ADonationsPaid = (+this.total10814).toFixed(2);
    let FormGuid = this.taxPayerDetails.Sch_10814Set["results"][0]["FormGuid"];
    this.taxPayerDetails.Sch_10814Set["results"] = [];
    for (let i = 0; i < this.income10814.controls.length; i++) {
      this.taxPayerDetails.Sch_10814Set["results"].push({});
      this.taxPayerDetails.Sch_10814Set["results"][i]["LineNo"] = i + 1;
      this.taxPayerDetails.Sch_10814Set["results"][i]["FormGuid"] = FormGuid;
      this.taxPayerDetails.Sch_10814Set["results"][i]["RankingOrder"] = "99";
      this.taxPayerDetails.Sch_10814Set["results"][i]["Waers"] = "SAR";
      this.taxPayerDetails.Sch_10814Set["results"][i]["DropDown"] = this.income10814.controls[i].value.DropDown;
      this.taxPayerDetails.Sch_10814Set["results"][i]["Crtinfin"] = this.income10814.controls[i].value.Crtinfin;
      this.taxPayerDetails.Sch_10814Set["results"][i]["BeneficiaryNm"] = this.income10814.controls[i].value.BeneficiaryNm;
      this.taxPayerDetails.Sch_10814Set["results"][i]["Addr"] = this.income10814.controls[i].value.Addr;
      this.taxPayerDetails.Sch_10814Set["results"][i]["PaidAmt"] = (+this.income10814.controls[i].value.PaidAmt).toFixed(2);
    }
    jQuery("#donations10814").modal('hide');
    this.taxPayerDetails.ADonationsPaid10814Chk = "1";
    this.cal5CoverForm();
    this.clsePopup();
  }
  saveIncome10815() {
    this.taxPayerDetails.ATechnicalSupport = (+this.total10815).toFixed(2);
    let FormGuid = this.taxPayerDetails.Sch_10815Set["results"][0]["FormGuid"];
    this.taxPayerDetails.Sch_10815Set["results"] = [];
    for (let i = 0; i < this.income10815.controls.length; i++) {
      this.taxPayerDetails.Sch_10815Set["results"].push({});
      this.taxPayerDetails.Sch_10815Set["results"][i]["LineNo"] = i + 1;
      this.taxPayerDetails.Sch_10815Set["results"][i]["FormGuid"] = FormGuid;
      this.taxPayerDetails.Sch_10815Set["results"][i]["RankingOrder"] = "99";
      this.taxPayerDetails.Sch_10815Set["results"][i]["Waers"] = "SAR";
      this.taxPayerDetails.Sch_10815Set["results"][i]["DropDown"] = this.income10815.controls[i].value.DropDown;
      this.taxPayerDetails.Sch_10815Set["results"][i]["Crtinfin"] = this.income10815.controls[i].value.Crtinfin;
      this.taxPayerDetails.Sch_10815Set["results"][i]["BeneficiaryNm"] = this.income10815.controls[i].value.BeneficiaryNm;
      this.taxPayerDetails.Sch_10815Set["results"][i]["Addr"] = this.income10815.controls[i].value.Addr;
      this.taxPayerDetails.Sch_10815Set["results"][i]["InternalExt"] = this.income10815.controls[i].value.InternalExt;
      this.taxPayerDetails.Sch_10815Set["results"][i]["Amt"] = (+this.income10815.controls[i].value.Amt).toFixed(2);
    }
    jQuery("#taxesortechnical10815").modal('hide');
    this.taxPayerDetails.ATechnicalSupportChk = "1";
    this.cal5CoverForm();
    this.clsePopup();
  }
  saveCE10822() {
    this.taxPayerDetails.AOtherIndirct = (+this.calCellTotalCE10822).toFixed(2);
    let FormGuid = this.taxPayerDetails.Sch_10822Set["results"][0]["FormGuid"];
    this.taxPayerDetails.Sch_10822Set["results"] = [];
    for (let i = 0; i < this.ce10822.controls.length; i++) {
      this.taxPayerDetails.Sch_10822Set["results"].push({});
      this.taxPayerDetails.Sch_10822Set["results"][i]["LineNo"] = i + 1;
      this.taxPayerDetails.Sch_10822Set["results"][i]["FormGuid"] = FormGuid;
      this.taxPayerDetails.Sch_10822Set["results"][i]["RankingOrder"] = "99";
      this.taxPayerDetails.Sch_10822Set["results"][i]["Waers"] = "SAR";
      this.taxPayerDetails.Sch_10822Set["results"][i]["Stmt"] = this.ce10822.controls[i].value.Stmt;
      this.taxPayerDetails.Sch_10822Set["results"][i]["Value"] = (+this.ce10822.controls[i].value.Value).toFixed(2);
    }
    jQuery("#otherindirect10822").modal('hide');
    this.taxPayerDetails.AOtherIndirctChk = "1";
    this.cal5CoverForm();
    this.clsePopup();
  }
  IdNumberValidation506(pi) {
    if (this.ce10506.controls[pi].value.Crtinfin != '' && this.ce10506.controls[pi].value.DropDown != '' && this.ce10506.controls[pi].value.Crtinfin.length >= 10) {
      let fin = "";
      let tin = "";
      let crno = "";
      if (this.ce10506.controls[pi].value.DropDown == "1") {
        crno = this.ce10506.controls[pi].value.Crtinfin;
        fin = "";
        tin = "";
      }
      else if (this.ce10506.controls[pi].value.DropDown == "2") {
        crno = "";
        fin = "";
        tin = this.ce10506.controls[pi].value.Crtinfin;
      }
      else {
        crno = "";
        fin = this.ce10506.controls[pi].value.Crtinfin;
        tin = "";
      }
      this.returnsService.validateIDnumbersForm8(crno, tin, fin, this.ce10506.controls[pi].value.DropDown == '1' ? '05' : '', this.loginUser).subscribe((data: any) => {
        //console.log(data);
        this.ce10506.controls[pi].patchValue({ 'Addr': data["d"]["Street1"] });
        this.ce10506.controls[pi].patchValue({ 'ContractorNm': data["d"]["FullName"] });
      });
    }
  }
  IdNumberValidation508(pi) {
    if (this.ce10508.controls[pi].value.Crtinfin != '' && this.ce10508.controls[pi].value.DropDown != '' && this.ce10508.controls[pi].value.Crtinfin.length >= 10) {
      let fin = "";
      let tin = "";
      let crno = "";
      if (this.ce10508.controls[pi].value.DropDown == "1") {
        crno = this.ce10508.controls[pi].value.Crtinfin;
        fin = "";
        tin = "";
      }
      else if (this.ce10508.controls[pi].value.DropDown == "2") {
        crno = "";
        fin = "";
        tin = this.ce10508.controls[pi].value.Crtinfin;
      }
      else {
        crno = "";
        fin = this.ce10508.controls[pi].value.Crtinfin;
        tin = "";
      }
      this.returnsService.validateIDnumbersForm8(crno, tin, fin, this.ce10508.controls[pi].value.DropDown == '1' ? '05' : '', this.loginUser).subscribe((data: any) => {
        //console.log(data);
        this.ce10508.controls[pi].patchValue({ 'Addr': data["d"]["Street1"] });
        this.ce10508.controls[pi].patchValue({ 'ContractorNm': data["d"]["FullName"] });
      });
    }
  }
  IdNumberValidation807(pi) {
    if (this.income10807.controls[pi].value.Crtinfin != '' && this.income10807.controls[pi].value.DropDown != '' && this.income10807.controls[pi].value.Crtinfin.length >= 10) {
      let fin = "";
      let tin = "";
      let crno = "";
      if (this.income10807.controls[pi].value.DropDown == "1") {
        crno = this.income10807.controls[pi].value.Crtinfin;
        fin = "";
        tin = "";
      }
      else if (this.income10807.controls[pi].value.DropDown == "2") {
        crno = "";
        fin = "";
        tin = this.income10807.controls[pi].value.Crtinfin;
      }
      else {
        crno = "";
        fin = this.income10807.controls[pi].value.Crtinfin;
        tin = "";
      }
      this.returnsService.validateIDnumbersForm8(crno, tin, fin, this.income10807.controls[pi].value.DropDown == '1' ? '05' : '', this.loginUser).subscribe((data: any) => {
        //console.log(data);
        this.income10807.controls[pi].patchValue({ 'Addr': data["d"]["Street1"] });
        this.income10807.controls[pi].patchValue({ 'BeneficiaryNm': data["d"]["FullName"] });
      });
    }
  }
  IdNumberValidation814(pi) {
    if (this.income10814.controls[pi].value.Crtinfin != '' && this.income10814.controls[pi].value.DropDown != '' && this.income10814.controls[pi].value.Crtinfin.length >= 10) {
      let fin = "";
      let tin = "";
      let crno = "";
      if (this.income10814.controls[pi].value.DropDown == "1") {
        crno = this.income10814.controls[pi].value.Crtinfin;
        fin = "";
        tin = "";
      }
      else if (this.income10814.controls[pi].value.DropDown == "2") {
        crno = "";
        fin = "";
        tin = this.income10814.controls[pi].value.Crtinfin;
      }
      else {
        crno = "";
        fin = this.income10814.controls[pi].value.Crtinfin;
        tin = "";
      }
      this.returnsService.validateIDnumbersForm8(crno, tin, fin, this.income10814.controls[pi].value.DropDown == '1' ? '05' : '', this.loginUser).subscribe((data: any) => {
        //console.log(data);
        this.income10814.controls[pi].patchValue({ 'Addr': data["d"]["Street1"] });
        this.income10814.controls[pi].patchValue({ 'BeneficiaryNm': data["d"]["FullName"] });
      });
    }
  }
  IdNumberValidation815(pi) {
    if (this.income10815.controls[pi].value.Crtinfin != '' && this.income10815.controls[pi].value.DropDown != '' && this.income10815.controls[pi].value.Crtinfin.length >= 10) {
      let fin = "";
      let tin = "";
      let crno = "";
      if (this.income10815.controls[pi].value.DropDown == "1") {
        crno = this.income10815.controls[pi].value.Crtinfin;
        fin = "";
        tin = "";
      }
      else if (this.income10815.controls[pi].value.DropDown == "2") {
        crno = "";
        fin = "";
        tin = this.income10815.controls[pi].value.Crtinfin;
      }
      else {
        crno = "";
        fin = this.income10815.controls[pi].value.Crtinfin;
        tin = "";
      }
      this.returnsService.validateIDnumbersForm8(crno, tin, fin, this.income10815.controls[pi].value.DropDown == '1' ? '05' : '', this.loginUser).subscribe((data: any) => {
        //console.log(data);
        this.income10815.controls[pi].patchValue({ 'Addr': data["d"]["Street1"] });
        this.income10815.controls[pi].patchValue({ 'BeneficiaryNm': data["d"]["FullName"] });
      });
    }
  }
  GetUserDetails() {
    this.returnsService.getUserDetails().subscribe((data: any) => {
      this.loginUser = data["d"]["Gpartz"];
    });
  }
  cal5CoverForm() {
    if (this.taxPayerDetails.AIndirectWages == '' || this.taxPayerDetails.AIndirectWages == null || this.taxPayerDetails.AIndirectWages == undefined || this.taxPayerDetails.AIndirectWages == 'undefined') {
      this.taxPayerDetails.AIndirectWages = "0.00";
    }
    else {
      if (this.taxPayerDetails.AIndirectWages.toString().indexOf('.') > -1) {
        this.taxPayerDetails.AIndirectWages = (this.taxPayerDetails.AIndirectWages.slice(0, (this.taxPayerDetails.AIndirectWages.indexOf(".")) + 3));
      }
      this.taxPayerDetails.AIndirectWages = (+this.taxPayerDetails.AIndirectWages).toFixed(2);
    }
    if (this.taxPayerDetails.APension == '' || this.taxPayerDetails.APension == null || this.taxPayerDetails.APension == undefined || this.taxPayerDetails.APension == 'undefined') {
      this.taxPayerDetails.APension = "0.00";
    }
    else {
      if (this.taxPayerDetails.APension.toString().indexOf('.') > -1) {
        this.taxPayerDetails.APension = (this.taxPayerDetails.APension.slice(0, (this.taxPayerDetails.APension.indexOf(".")) + 3));
      }
      this.taxPayerDetails.APension = (+this.taxPayerDetails.APension).toFixed(2);
    }
    if (this.taxPayerDetails.AInsuranceSaudi == '' || this.taxPayerDetails.AInsuranceSaudi == null || this.taxPayerDetails.AInsuranceSaudi == undefined || this.taxPayerDetails.AInsuranceSaudi == 'undefined') {
      this.taxPayerDetails.AInsuranceSaudi = "0.00";
    }
    else {
      if (this.taxPayerDetails.AInsuranceSaudi.toString().indexOf('.') > -1) {
        this.taxPayerDetails.AInsuranceSaudi = (this.taxPayerDetails.AInsuranceSaudi.slice(0, (this.taxPayerDetails.AInsuranceSaudi.indexOf(".")) + 3));
      }
      this.taxPayerDetails.AInsuranceSaudi = (+this.taxPayerDetails.AInsuranceSaudi).toFixed(2);
    }
    if (this.taxPayerDetails.AInsurForeigners == '' || this.taxPayerDetails.AInsurForeigners == null || this.taxPayerDetails.AInsurForeigners == undefined || this.taxPayerDetails.AInsurForeigners == 'undefined') {
      this.taxPayerDetails.AInsurForeigners = "0.00";
    }
    else {
      if (this.taxPayerDetails.AInsurForeigners.toString().indexOf('.') > -1) {
        this.taxPayerDetails.AInsurForeigners = (this.taxPayerDetails.AInsurForeigners.slice(0, (this.taxPayerDetails.AInsurForeigners.indexOf(".")) + 3));
      }
      this.taxPayerDetails.AInsurForeigners = (+this.taxPayerDetails.AInsurForeigners).toFixed(2);
    }
    if (this.taxPayerDetails.ABookConsumption == '' || this.taxPayerDetails.ABookConsumption == null || this.taxPayerDetails.ABookConsumption == undefined || this.taxPayerDetails.ABookConsumption == 'undefined') {
      this.taxPayerDetails.ABookConsumption = "0.00";
    }
    else {
      if (this.taxPayerDetails.ABookConsumption.toString().indexOf('.') > -1) {
        this.taxPayerDetails.ABookConsumption = (this.taxPayerDetails.ABookConsumption.slice(0, (this.taxPayerDetails.ABookConsumption.indexOf(".")) + 3));
      }
      this.taxPayerDetails.ABookConsumption = (+this.taxPayerDetails.ABookConsumption).toFixed(2);
    }
    if (this.taxPayerDetails.AInsuranceExpenses == '' || this.taxPayerDetails.AInsuranceExpenses == null || this.taxPayerDetails.AInsuranceExpenses == undefined || this.taxPayerDetails.AInsuranceExpenses == 'undefined') {
      this.taxPayerDetails.AInsuranceExpenses = "0.00";
    }
    else {
      if (this.taxPayerDetails.AInsuranceExpenses.toString().indexOf('.') > -1) {
        this.taxPayerDetails.AInsuranceExpenses = (this.taxPayerDetails.AInsuranceExpenses.slice(0, (this.taxPayerDetails.AInsuranceExpenses.indexOf(".")) + 3));
      }
      this.taxPayerDetails.AInsuranceExpenses = (+this.taxPayerDetails.AInsuranceExpenses).toFixed(2);
    }
    if (this.taxPayerDetails.ATechnicalFees == '' || this.taxPayerDetails.ATechnicalFees == null || this.taxPayerDetails.ATechnicalFees == undefined || this.taxPayerDetails.ATechnicalFees == 'undefined') {
      this.taxPayerDetails.ATechnicalFees = "0.00";
    }
    else {
      if (this.taxPayerDetails.ATechnicalFees.toString().indexOf('.') > -1) {
        this.taxPayerDetails.ATechnicalFees = (this.taxPayerDetails.ATechnicalFees.slice(0, (this.taxPayerDetails.ATechnicalFees.indexOf(".")) + 3));
      }
      this.taxPayerDetails.ATechnicalFees = (+this.taxPayerDetails.ATechnicalFees).toFixed(2);
    }
    if (this.taxPayerDetails.ARents10808 == '' || this.taxPayerDetails.ARents10808 == null || this.taxPayerDetails.ARents10808 == undefined || this.taxPayerDetails.ARents10808 == 'undefined') {
      this.taxPayerDetails.ARents10808 = "0.00";
    }
    else {
      if (this.taxPayerDetails.ARents10808.toString().indexOf('.') > -1) {
        this.taxPayerDetails.ARents10808 = (this.taxPayerDetails.ARents10808.slice(0, (this.taxPayerDetails.ARents10808.indexOf(".")) + 3));
      }
      this.taxPayerDetails.ARents10808 = (+this.taxPayerDetails.ARents10808).toFixed(2);
    }
    if (this.taxPayerDetails.AProvisions == '' || this.taxPayerDetails.AProvisions == null || this.taxPayerDetails.AProvisions == undefined || this.taxPayerDetails.AProvisions == 'undefined') {
      this.taxPayerDetails.AProvisions = "0.00";
    }
    else {
      if (this.taxPayerDetails.AProvisions.toString().indexOf('.') > -1) {
        this.taxPayerDetails.AProvisions = (this.taxPayerDetails.AProvisions.slice(0, (this.taxPayerDetails.AProvisions.indexOf(".")) + 3));
      }
      this.taxPayerDetails.AProvisions = (+this.taxPayerDetails.AProvisions).toFixed(2);
    }
    if (this.taxPayerDetails.AExpensesMaincenter == '' || this.taxPayerDetails.AExpensesMaincenter == null || this.taxPayerDetails.AExpensesMaincenter == undefined || this.taxPayerDetails.AExpensesMaincenter == 'undefined') {
      this.taxPayerDetails.AExpensesMaincenter = "0.00";
    }
    else {
      if (this.taxPayerDetails.AExpensesMaincenter.toString().indexOf('.') > -1) {
        this.taxPayerDetails.AExpensesMaincenter = (this.taxPayerDetails.AExpensesMaincenter.slice(0, (this.taxPayerDetails.AExpensesMaincenter.indexOf(".")) + 3));
      }
      this.taxPayerDetails.AExpensesMaincenter = (+this.taxPayerDetails.AExpensesMaincenter).toFixed(2);
    }
    if (this.taxPayerDetails.AAgentCommission == '' || this.taxPayerDetails.AAgentCommission == null || this.taxPayerDetails.AAgentCommission == undefined || this.taxPayerDetails.AAgentCommission == 'undefined') {
      this.taxPayerDetails.AAgentCommission = "0.00";
    }
    else {
      if (this.taxPayerDetails.AAgentCommission.toString().indexOf('.') > -1) {
        this.taxPayerDetails.AAgentCommission = (this.taxPayerDetails.AAgentCommission.slice(0, (this.taxPayerDetails.AAgentCommission.indexOf(".")) + 3));
      }
      this.taxPayerDetails.AAgentCommission = (+this.taxPayerDetails.AAgentCommission).toFixed(2);
    }
    if (this.taxPayerDetails.ALoansReturns10812 == '' || this.taxPayerDetails.ALoansReturns10812 == null || this.taxPayerDetails.ALoansReturns10812 == undefined || this.taxPayerDetails.ALoansReturns10812 == 'undefined') {
      this.taxPayerDetails.ALoansReturns10812 = "0.00";
    }
    else {
      if (this.taxPayerDetails.ALoansReturns10812.toString().indexOf('.') > -1) {
        this.taxPayerDetails.ALoansReturns10812 = (this.taxPayerDetails.ALoansReturns10812.slice(0, (this.taxPayerDetails.ALoansReturns10812.indexOf(".")) + 3));
      }
      this.taxPayerDetails.ALoansReturns10812 = (+this.taxPayerDetails.ALoansReturns10812).toFixed(2);
    }
    if (this.taxPayerDetails.AMeals == '' || this.taxPayerDetails.AMeals == null || this.taxPayerDetails.AMeals == undefined || this.taxPayerDetails.AMeals == 'undefined') {
      this.taxPayerDetails.AMeals = "0.00";
    }
    else {
      if (this.taxPayerDetails.AMeals.toString().indexOf('.') > -1) {
        this.taxPayerDetails.AMeals = (this.taxPayerDetails.AMeals.slice(0, (this.taxPayerDetails.AMeals.indexOf(".")) + 3));
      }
      this.taxPayerDetails.AMeals = (+this.taxPayerDetails.AMeals).toFixed(2);
    }
    if (this.taxPayerDetails.ADonationsPaid == '' || this.taxPayerDetails.ADonationsPaid == null || this.taxPayerDetails.ADonationsPaid == undefined || this.taxPayerDetails.ADonationsPaid == 'undefined') {
      this.taxPayerDetails.ADonationsPaid = "0.00";
    }
    else {
      if (this.taxPayerDetails.ADonationsPaid.toString().indexOf('.') > -1) {
        this.taxPayerDetails.ADonationsPaid = (this.taxPayerDetails.ADonationsPaid.slice(0, (this.taxPayerDetails.ADonationsPaid.indexOf(".")) + 3));
      }
      this.taxPayerDetails.ADonationsPaid = (+this.taxPayerDetails.ADonationsPaid).toFixed(2);
    }
    if (this.taxPayerDetails.ATechnicalSupport == '' || this.taxPayerDetails.ATechnicalSupport == null || this.taxPayerDetails.ATechnicalSupport == undefined || this.taxPayerDetails.ATechnicalSupport == 'undefined') {
      this.taxPayerDetails.ATechnicalSupport = "0.00";
    }
    else {
      if (this.taxPayerDetails.ATechnicalSupport.toString().indexOf('.') > -1) {
        this.taxPayerDetails.ATechnicalSupport = (this.taxPayerDetails.ATechnicalSupport.slice(0, (this.taxPayerDetails.ATechnicalSupport.indexOf(".")) + 3));
      }
      this.taxPayerDetails.ATechnicalSupport = (+this.taxPayerDetails.ATechnicalSupport).toFixed(2);
    }
    if (this.taxPayerDetails.ARepairExpense == '' || this.taxPayerDetails.ARepairExpense == null || this.taxPayerDetails.ARepairExpense == undefined || this.taxPayerDetails.ARepairExpense == 'undefined') {
      this.taxPayerDetails.ARepairExpense = "0.00";
    }
    else {
      if (this.taxPayerDetails.ARepairExpense.toString().indexOf('.') > -1) {
        this.taxPayerDetails.ARepairExpense = (this.taxPayerDetails.ARepairExpense.slice(0, (this.taxPayerDetails.ARepairExpense.indexOf(".")) + 3));
      }
      this.taxPayerDetails.ARepairExpense = (+this.taxPayerDetails.ARepairExpense).toFixed(2);
    }
    if (this.taxPayerDetails.AResearch == '' || this.taxPayerDetails.AResearch == null || this.taxPayerDetails.AResearch == undefined || this.taxPayerDetails.AResearch == 'undefined') {
      this.taxPayerDetails.AResearch = "0.00";
    }
    else {
      if (this.taxPayerDetails.AResearch.toString().indexOf('.') > -1) {
        this.taxPayerDetails.AResearch = (this.taxPayerDetails.AResearch.slice(0, (this.taxPayerDetails.AResearch.indexOf(".")) + 3));
      }
      this.taxPayerDetails.AResearch = (+this.taxPayerDetails.AResearch).toFixed(2);
    }
    if (this.taxPayerDetails.ABadDebts == '' || this.taxPayerDetails.ABadDebts == null || this.taxPayerDetails.ABadDebts == undefined || this.taxPayerDetails.ABadDebts == 'undefined') {
      this.taxPayerDetails.ABadDebts = "0.00";
    }
    else {
      if (this.taxPayerDetails.ABadDebts.toString().indexOf('.') > -1) {
        this.taxPayerDetails.ABadDebts = (this.taxPayerDetails.ABadDebts.slice(0, (this.taxPayerDetails.ABadDebts.indexOf(".")) + 3));
      }
      this.taxPayerDetails.ABadDebts = (+this.taxPayerDetails.ABadDebts).toFixed(2);
    }
    if (this.taxPayerDetails.AIntangibleAssets == '' || this.taxPayerDetails.AIntangibleAssets == null || this.taxPayerDetails.AIntangibleAssets == undefined || this.taxPayerDetails.AIntangibleAssets == 'undefined') {
      this.taxPayerDetails.AIntangibleAssets = "0.00";
    }
    else {
      if (this.taxPayerDetails.AIntangibleAssets.toString().indexOf('.') > -1) {
        this.taxPayerDetails.AIntangibleAssets = (this.taxPayerDetails.AIntangibleAssets.slice(0, (this.taxPayerDetails.AIntangibleAssets.indexOf(".")) + 3));
      }
      this.taxPayerDetails.AIntangibleAssets = (+this.taxPayerDetails.AIntangibleAssets).toFixed(2);
    }
    if (this.taxPayerDetails.ASchoolFees == '' || this.taxPayerDetails.ASchoolFees == null || this.taxPayerDetails.ASchoolFees == undefined || this.taxPayerDetails.ASchoolFees == 'undefined') {
      this.taxPayerDetails.ASchoolFees = "0.00";
    }
    else {
      if (this.taxPayerDetails.ASchoolFees.toString().indexOf('.') > -1) {
        this.taxPayerDetails.ASchoolFees = (this.taxPayerDetails.ASchoolFees.slice(0, (this.taxPayerDetails.ASchoolFees.indexOf(".")) + 3));
      }
      this.taxPayerDetails.ASchoolFees = (+this.taxPayerDetails.ASchoolFees).toFixed(2);
    }
    if (this.taxPayerDetails.Aadvertising == '' || this.taxPayerDetails.Aadvertising == null || this.taxPayerDetails.Aadvertising == undefined || this.taxPayerDetails.Aadvertising == 'undefined') {
      this.taxPayerDetails.Aadvertising = "0.00";
    }
    else {
      if (this.taxPayerDetails.Aadvertising.toString().indexOf('.') > -1) {
        this.taxPayerDetails.Aadvertising = (this.taxPayerDetails.Aadvertising.slice(0, (this.taxPayerDetails.Aadvertising.indexOf(".")) + 3));
      }
      this.taxPayerDetails.Aadvertising = (+this.taxPayerDetails.Aadvertising).toFixed(2);
    }
    if (this.taxPayerDetails.AOtherIndirct == '' || this.taxPayerDetails.AOtherIndirct == null || this.taxPayerDetails.AOtherIndirct == undefined || this.taxPayerDetails.AOtherIndirct == 'undefined') {
      this.taxPayerDetails.AOtherIndirct = "0.00";
    }
    else {
      if (this.taxPayerDetails.AOtherIndirct.toString().indexOf('.') > -1) {
        this.taxPayerDetails.AOtherIndirct = (this.taxPayerDetails.AOtherIndirct.slice(0, (this.taxPayerDetails.AOtherIndirct.indexOf(".")) + 3));
      }
      this.taxPayerDetails.AOtherIndirct = (+this.taxPayerDetails.AOtherIndirct).toFixed(2);
    }
    this.taxPayerDetails.AMarketingOff = (
      parseFloat(this.taxPayerDetails.AIndirectWages) + parseFloat(this.taxPayerDetails.APension) +
      parseFloat(this.taxPayerDetails.AInsuranceSaudi) + parseFloat(this.taxPayerDetails.AInsurForeigners) +
      parseFloat(this.taxPayerDetails.ABookConsumption) + parseFloat(this.taxPayerDetails.AInsuranceExpenses) +
      parseFloat(this.taxPayerDetails.ATechnicalFees) + parseFloat(this.taxPayerDetails.ARents10808) +
      parseFloat(this.taxPayerDetails.AProvisions) + parseFloat(this.taxPayerDetails.AExpensesMaincenter) +
      parseFloat(this.taxPayerDetails.AAgentCommission) + parseFloat(this.taxPayerDetails.ALoansReturns10812) +
      parseFloat(this.taxPayerDetails.AMeals) + parseFloat(this.taxPayerDetails.ADonationsPaid) +
      parseFloat(this.taxPayerDetails.ATechnicalSupport) + parseFloat(this.taxPayerDetails.ARepairExpense) +
      parseFloat(this.taxPayerDetails.AResearch) + parseFloat(this.taxPayerDetails.ABadDebts) +
      parseFloat(this.taxPayerDetails.AIntangibleAssets) + parseFloat(this.taxPayerDetails.ASchoolFees) +
      parseFloat(this.taxPayerDetails.Aadvertising) + parseFloat(this.taxPayerDetails.AOtherIndirct) 
    ).toFixed(2);
    this.taxPayerDetails.ANetBooklossOff = (parseFloat(this.taxPayerDetails.ADedeuctedProfitOff)-parseFloat(this.taxPayerDetails.AMarketingOff)).toFixed(2);
  }
  calCECoverForm() {
    this.total10400 = "0.00";
    this.total10500 = "0.00";
    if (this.taxPayerDetails.AGoods == '' || this.taxPayerDetails.AGoods == null || this.taxPayerDetails.AGoods == undefined || this.taxPayerDetails.AGoods == 'undefined') {
      this.taxPayerDetails.AGoods = "0.00";
    }
    else {
      if (this.taxPayerDetails.AGoods.toString().indexOf('.') > -1) {
        this.taxPayerDetails.AGoods = (this.taxPayerDetails.AGoods.slice(0, (this.taxPayerDetails.AGoods.indexOf(".")) + 3));
      }
      this.taxPayerDetails.AGoods = (+this.taxPayerDetails.AGoods).toFixed(2);
    }
    if (this.taxPayerDetails.APurchasesOutside == '' || this.taxPayerDetails.APurchasesOutside == null || this.taxPayerDetails.APurchasesOutside == undefined || this.taxPayerDetails.APurchasesOutside == 'undefined') {
      this.taxPayerDetails.APurchasesOutside = "0.00";
    }
    else {
      if (this.taxPayerDetails.APurchasesOutside.toString().indexOf('.') > -1) {
        this.taxPayerDetails.APurchasesOutside = (this.taxPayerDetails.APurchasesOutside.slice(0, (this.taxPayerDetails.APurchasesOutside.indexOf(".")) + 3));
      }
      this.taxPayerDetails.APurchasesOutside = (+this.taxPayerDetails.APurchasesOutside).toFixed(2);
    }
    if (this.taxPayerDetails.APurchasesInside == '' || this.taxPayerDetails.APurchasesInside == null || this.taxPayerDetails.APurchasesInside == undefined || this.taxPayerDetails.APurchasesInside == 'undefined') {
      this.taxPayerDetails.APurchasesInside = "0.00";
    }
    else {
      if (this.taxPayerDetails.APurchasesInside.toString().indexOf('.') > -1) {
        this.taxPayerDetails.APurchasesInside = (this.taxPayerDetails.APurchasesInside.slice(0, (this.taxPayerDetails.APurchasesInside.indexOf(".")) + 3));
      }
      this.taxPayerDetails.APurchasesInside = (+this.taxPayerDetails.APurchasesInside).toFixed(2);
    }
    if (this.taxPayerDetails.AGoodsLastperiod == '' || this.taxPayerDetails.AGoodsLastperiod == null || this.taxPayerDetails.AGoodsLastperiod == undefined || this.taxPayerDetails.AGoodsLastperiod == 'undefined') {
      this.taxPayerDetails.AGoodsLastperiod = "0.00";
    }
    else {
      if (this.taxPayerDetails.AGoodsLastperiod.toString().indexOf('.') > -1) {
        this.taxPayerDetails.AGoodsLastperiod = (this.taxPayerDetails.AGoodsLastperiod.slice(0, (this.taxPayerDetails.AGoodsLastperiod.indexOf(".")) + 3));
      }
      this.taxPayerDetails.AGoodsLastperiod = (+this.taxPayerDetails.AGoodsLastperiod).toFixed(2);
    }
    this.total10400 = (parseFloat(this.taxPayerDetails.AGoods) +
      parseFloat(this.taxPayerDetails.APurchasesOutside) +
      parseFloat(this.taxPayerDetails.APurchasesInside) -
      parseFloat(this.taxPayerDetails.AGoodsLastperiod)
    ).toFixed(2);
    this.taxPayerDetails.AGoodsSold = (+this.total10400).toFixed(2);
    if (this.taxPayerDetails.ATariffs == '' || this.taxPayerDetails.ATariffs == null || this.taxPayerDetails.ATariffs == undefined || this.taxPayerDetails.ATariffs == 'undefined') {
      this.taxPayerDetails.ATariffs = "0.00";
    }
    else {
      if (this.taxPayerDetails.ATariffs.toString().indexOf('.') > -1) {
        this.taxPayerDetails.ATariffs = (this.taxPayerDetails.ATariffs.slice(0, (this.taxPayerDetails.ATariffs.indexOf(".")) + 3));
      }
      this.taxPayerDetails.ATariffs = (+this.taxPayerDetails.ATariffs).toFixed(2);
    }
    if (this.taxPayerDetails.AShipping == '' || this.taxPayerDetails.AShipping == null || this.taxPayerDetails.AShipping == undefined || this.taxPayerDetails.AShipping == 'undefined') {
      this.taxPayerDetails.AShipping = "0.00";
    }
    else {
      if (this.taxPayerDetails.AShipping.toString().indexOf('.') > -1) {
        this.taxPayerDetails.AShipping = (this.taxPayerDetails.AShipping.slice(0, (this.taxPayerDetails.AShipping.indexOf(".")) + 3));
      }
      this.taxPayerDetails.AShipping = (+this.taxPayerDetails.AShipping).toFixed(2);
    }
    if (this.taxPayerDetails.ADirectWages == '' || this.taxPayerDetails.ADirectWages == null || this.taxPayerDetails.ADirectWages == undefined || this.taxPayerDetails.ADirectWages == 'undefined') {
      this.taxPayerDetails.ADirectWages = "0.00";
    }
    else {
      if (this.taxPayerDetails.ADirectWages.toString().indexOf('.') > -1) {
        this.taxPayerDetails.ADirectWages = (this.taxPayerDetails.ADirectWages.slice(0, (this.taxPayerDetails.ADirectWages.indexOf(".")) + 3));
      }
      this.taxPayerDetails.ADirectWages = (+this.taxPayerDetails.ADirectWages).toFixed(2);
    }
    if (this.taxPayerDetails.ASubcontractors == '' || this.taxPayerDetails.ASubcontractors == null || this.taxPayerDetails.ASubcontractors == undefined || this.taxPayerDetails.ASubcontractors == 'undefined') {
      this.taxPayerDetails.ASubcontractors = "0.00";
    }
    else {
      if (this.taxPayerDetails.ASubcontractors.toString().indexOf('.') > -1) {
        this.taxPayerDetails.ASubcontractors = (this.taxPayerDetails.ASubcontractors.slice(0, (this.taxPayerDetails.ASubcontractors.indexOf(".")) + 3));
      }
      this.taxPayerDetails.ASubcontractors = (+this.taxPayerDetails.ASubcontractors).toFixed(2);
    }
    if (this.taxPayerDetails.ABook == '' || this.taxPayerDetails.ABook == null || this.taxPayerDetails.ABook == undefined || this.taxPayerDetails.ABook == 'undefined') {
      this.taxPayerDetails.ABook = "0.00";
    }
    else {
      if (this.taxPayerDetails.ABook.toString().indexOf('.') > -1) {
        this.taxPayerDetails.ABook = (this.taxPayerDetails.ABook.slice(0, (this.taxPayerDetails.ABook.indexOf(".")) + 3));
      }
      this.taxPayerDetails.ABook = (+this.taxPayerDetails.ABook).toFixed(2);
    }
    if (this.taxPayerDetails.ARents10506 == '' || this.taxPayerDetails.ARents10506 == null || this.taxPayerDetails.ARents10506 == undefined || this.taxPayerDetails.ARents10506 == 'undefined') {
      this.taxPayerDetails.ARents10506 = "0.00";
    }
    else {
      if (this.taxPayerDetails.ARents10506.toString().indexOf('.') > -1) {
        this.taxPayerDetails.ARents10506 = (this.taxPayerDetails.ARents10506.slice(0, (this.taxPayerDetails.ARents10506.indexOf(".")) + 3));
      }
      this.taxPayerDetails.ARents10506 = (+this.taxPayerDetails.ARents10506).toFixed(2);
    }
    if (this.taxPayerDetails.ARepair == '' || this.taxPayerDetails.ARepair == null || this.taxPayerDetails.ARepair == undefined || this.taxPayerDetails.ARepair == 'undefined') {
      this.taxPayerDetails.ARepair = "0.00";
    }
    else {
      if (this.taxPayerDetails.ARepair.toString().indexOf('.') > -1) {
        this.taxPayerDetails.ARepair = (this.taxPayerDetails.ARepair.slice(0, (this.taxPayerDetails.ARepair.indexOf(".")) + 3));
      }
      this.taxPayerDetails.ARepair = (+this.taxPayerDetails.ARepair).toFixed(2);
    }
    if (this.taxPayerDetails.AMachinery == '' || this.taxPayerDetails.AMachinery == null || this.taxPayerDetails.AMachinery == undefined || this.taxPayerDetails.AMachinery == 'undefined') {
      this.taxPayerDetails.AMachinery = "0.00";
    }
    else {
      if (this.taxPayerDetails.AMachinery.toString().indexOf('.') > -1) {
        this.taxPayerDetails.AMachinery = (this.taxPayerDetails.AMachinery.slice(0, (this.taxPayerDetails.AMachinery.indexOf(".")) + 3));
      }
      this.taxPayerDetails.AMachinery = (+this.taxPayerDetails.AMachinery).toFixed(2);
    }
    if (this.taxPayerDetails.ALoansReturns == '' || this.taxPayerDetails.ALoansReturns == null || this.taxPayerDetails.ALoansReturns == undefined || this.taxPayerDetails.ALoansReturns == 'undefined') {
      this.taxPayerDetails.ALoansReturns = "0.00";
    }
    else {
      if (this.taxPayerDetails.ALoansReturns.toString().indexOf('.') > -1) {
        this.taxPayerDetails.ALoansReturns = (this.taxPayerDetails.ALoansReturns.slice(0, (this.taxPayerDetails.ALoansReturns.indexOf(".")) + 3));
      }
      this.taxPayerDetails.ALoansReturns = (+this.taxPayerDetails.ALoansReturns).toFixed(2);
    }
    if (this.taxPayerDetails.AOtherDirect == '' || this.taxPayerDetails.AOtherDirect == null || this.taxPayerDetails.AOtherDirect == undefined || this.taxPayerDetails.AOtherDirect == 'undefined') {
      this.taxPayerDetails.AOtherDirect = "0.00";
    }
    else {
      if (this.taxPayerDetails.AOtherDirect.toString().indexOf('.') > -1) {
        this.taxPayerDetails.AOtherDirect = (this.taxPayerDetails.AOtherDirect.slice(0, (this.taxPayerDetails.AOtherDirect.indexOf(".")) + 3));
      }
      this.taxPayerDetails.AOtherDirect = (+this.taxPayerDetails.AOtherDirect).toFixed(2);
    }
    this.total10500 = (parseFloat(this.taxPayerDetails.ATariffs) +
      parseFloat(this.taxPayerDetails.AShipping) +
      parseFloat(this.taxPayerDetails.ADirectWages) +
      parseFloat(this.taxPayerDetails.ASubcontractors) +
      parseFloat(this.taxPayerDetails.ABook) +
      parseFloat(this.taxPayerDetails.ARents10506) +
      parseFloat(this.taxPayerDetails.ARepair) +
      parseFloat(this.taxPayerDetails.AMachinery) +
      parseFloat(this.taxPayerDetails.ALoansReturns) +
      parseFloat(this.taxPayerDetails.AOtherDirect)
    ).toFixed(2);
    this.taxPayerDetails.ATotalDirect = (+this.total10500).toFixed(2);
    this.taxPayerDetails.ATotalBusinessOff = (parseFloat(this.total10400) + parseFloat(this.total10500)).toFixed(2);
    this.taxPayerDetails.ADedeuctedProfitOff = (parseFloat(this.taxPayerDetails.ATotalIncome) - parseFloat(this.taxPayerDetails.ATotalBusinessOff)).toFixed(2);
  }
  calIncomeCoverForm() {
    this.total10100 = "0.00";
    this.total10200 = "0.00";
    if (this.taxPayerDetails.AIncomeContract == '' || this.taxPayerDetails.AIncomeContract == null || this.taxPayerDetails.AIncomeContract == undefined || this.taxPayerDetails.AIncomeContract == 'undefined') {
      this.taxPayerDetails.AIncomeContract = "0.00";
    }
    else {
      if (this.taxPayerDetails.AIncomeContract.toString().indexOf('.') > -1) {
        this.taxPayerDetails.AIncomeContract = (this.taxPayerDetails.AIncomeContract.slice(0, (this.taxPayerDetails.AIncomeContract.indexOf(".")) + 3));
      }
      this.taxPayerDetails.AIncomeContract = (+this.taxPayerDetails.AIncomeContract).toFixed(2);
    }
    if (this.taxPayerDetails.AIncomeLease == '' || this.taxPayerDetails.AIncomeLease == null || this.taxPayerDetails.AIncomeLease == undefined || this.taxPayerDetails.AIncomeLease == 'undefined') {
      this.taxPayerDetails.AIncomeLease = "0.00";
    }
    else {
      if (this.taxPayerDetails.AIncomeLease.toString().indexOf('.') > -1) {
        this.taxPayerDetails.AIncomeLease = (this.taxPayerDetails.AIncomeLease.slice(0, (this.taxPayerDetails.AIncomeLease.indexOf(".")) + 3));
      }
      this.taxPayerDetails.AIncomeLease = (+this.taxPayerDetails.AIncomeLease).toFixed(2);
    }
    if (this.taxPayerDetails.AIncomeInsurance == '' || this.taxPayerDetails.AIncomeInsurance == null || this.taxPayerDetails.AIncomeInsurance == undefined || this.taxPayerDetails.AIncomeInsurance == 'undefined') {
      this.taxPayerDetails.AIncomeInsurance = "0.00";
    }
    else {
      if (this.taxPayerDetails.AIncomeInsurance.toString().indexOf('.') > -1) {
        this.taxPayerDetails.AIncomeInsurance = (this.taxPayerDetails.AIncomeInsurance.slice(0, (this.taxPayerDetails.AIncomeInsurance.indexOf(".")) + 3));
      }
      this.taxPayerDetails.AIncomeInsurance = (+this.taxPayerDetails.AIncomeInsurance).toFixed(2);
    }
    if (this.taxPayerDetails.AIncomeEstate == '' || this.taxPayerDetails.AIncomeEstate == null || this.taxPayerDetails.AIncomeEstate == undefined || this.taxPayerDetails.AIncomeEstate == 'undefined') {
      this.taxPayerDetails.AIncomeEstate = "0.00";
    }
    else {
      if (this.taxPayerDetails.AIncomeEstate.toString().indexOf('.') > -1) {
        this.taxPayerDetails.AIncomeEstate = (this.taxPayerDetails.AIncomeEstate.slice(0, (this.taxPayerDetails.AIncomeEstate.indexOf(".")) + 3));
      }
      this.taxPayerDetails.AIncomeEstate = (+this.taxPayerDetails.AIncomeEstate).toFixed(2);
    }
    if (this.taxPayerDetails.AIncomeBanking == '' || this.taxPayerDetails.AIncomeBanking == null || this.taxPayerDetails.AIncomeBanking == undefined || this.taxPayerDetails.AIncomeBanking == 'undefined') {
      this.taxPayerDetails.AIncomeBanking = "0.00";
    }
    else {
      if (this.taxPayerDetails.AIncomeBanking.toString().indexOf('.') > -1) {
        this.taxPayerDetails.AIncomeBanking = (this.taxPayerDetails.AIncomeBanking.slice(0, (this.taxPayerDetails.AIncomeBanking.indexOf(".")) + 3));
      }
      this.taxPayerDetails.AIncomeBanking = (+this.taxPayerDetails.AIncomeBanking).toFixed(2);
    }
    if (this.taxPayerDetails.AIncomeNatgas == '' || this.taxPayerDetails.AIncomeNatgas == null || this.taxPayerDetails.AIncomeNatgas == undefined || this.taxPayerDetails.AIncomeNatgas == 'undefined') {
      this.taxPayerDetails.AIncomeNatgas = "0.00";
    }
    else {
      if (this.taxPayerDetails.AIncomeNatgas.toString().indexOf('.') > -1) {
        this.taxPayerDetails.AIncomeNatgas = (this.taxPayerDetails.AIncomeNatgas.slice(0, (this.taxPayerDetails.AIncomeNatgas.indexOf(".")) + 3));
      }
      this.taxPayerDetails.AIncomeNatgas = (+this.taxPayerDetails.AIncomeNatgas).toFixed(2);
    }
    if (this.taxPayerDetails.AIncomeServices == '' || this.taxPayerDetails.AIncomeServices == null || this.taxPayerDetails.AIncomeServices == undefined || this.taxPayerDetails.AIncomeServices == 'undefined') {
      this.taxPayerDetails.AIncomeServices = "0.00";
    }
    else {
      if (this.taxPayerDetails.AIncomeServices.toString().indexOf('.') > -1) {
        this.taxPayerDetails.AIncomeServices = (this.taxPayerDetails.AIncomeServices.slice(0, (this.taxPayerDetails.AIncomeServices.indexOf(".")) + 3));
      }
      this.taxPayerDetails.AIncomeServices = (+this.taxPayerDetails.AIncomeServices).toFixed(2);
    }
    this.total10100 = (parseFloat(this.taxPayerDetails.AIncomeContract) +
      parseFloat(this.taxPayerDetails.AIncomeLease) +
      parseFloat(this.taxPayerDetails.AIncomeInsurance) +
      parseFloat(this.taxPayerDetails.AIncomeEstate) +
      parseFloat(this.taxPayerDetails.AIncomeBanking) +
      parseFloat(this.taxPayerDetails.AIncomeNatgas) +
      parseFloat(this.taxPayerDetails.AIncomeServices)
    ).toFixed(2);
    this.taxPayerDetails.AMainTotal = (+this.total10100).toFixed(2);
    if (this.taxPayerDetails.ACapitalGains == '' || this.taxPayerDetails.ACapitalGains == null || this.taxPayerDetails.ACapitalGains == undefined || this.taxPayerDetails.ACapitalGains == 'undefined') {
      this.taxPayerDetails.ACapitalGains = "0.00";
    }
    else {
      if (this.taxPayerDetails.ACapitalGains.toString().indexOf('.') > -1) {
        this.taxPayerDetails.ACapitalGains = (this.taxPayerDetails.ACapitalGains.slice(0, (this.taxPayerDetails.ACapitalGains.indexOf(".")) + 3));
      }
      this.taxPayerDetails.ACapitalGains = (+this.taxPayerDetails.ACapitalGains).toFixed(2);
    }
    if (this.taxPayerDetails.ACommissions == '' || this.taxPayerDetails.ACommissions == null || this.taxPayerDetails.ACommissions == undefined || this.taxPayerDetails.ACommissions == 'undefined') {
      this.taxPayerDetails.ACommissions = "0.00";
    }
    else {
      if (this.taxPayerDetails.ACommissions.toString().indexOf('.') > -1) {
        this.taxPayerDetails.ACommissions = (this.taxPayerDetails.ACommissions.slice(0, (this.taxPayerDetails.ACommissions.indexOf(".")) + 3));
      }
      this.taxPayerDetails.ACommissions = (+this.taxPayerDetails.ACommissions).toFixed(2);
    }
    if (this.taxPayerDetails.AReturnLoans == '' || this.taxPayerDetails.AReturnLoans == null || this.taxPayerDetails.AReturnLoans == undefined || this.taxPayerDetails.AReturnLoans == 'undefined') {
      this.taxPayerDetails.AReturnLoans = "0.00";
    }
    else {
      if (this.taxPayerDetails.AReturnLoans.toString().indexOf('.') > -1) {
        this.taxPayerDetails.AReturnLoans = (this.taxPayerDetails.AReturnLoans.slice(0, (this.taxPayerDetails.AReturnLoans.indexOf(".")) + 3));
      }
      this.taxPayerDetails.AReturnLoans = (+this.taxPayerDetails.AReturnLoans).toFixed(2);
    }
    if (this.taxPayerDetails.AGains == '' || this.taxPayerDetails.AGains == null || this.taxPayerDetails.AGains == undefined || this.taxPayerDetails.AGains == 'undefined') {
      this.taxPayerDetails.AGains = "0.00";
    }
    else {
      if (this.taxPayerDetails.AGains.toString().indexOf('.') > -1) {
        this.taxPayerDetails.AGains = (this.taxPayerDetails.AGains.slice(0, (this.taxPayerDetails.AGains.indexOf(".")) + 3));
      }
      this.taxPayerDetails.AGains = (+this.taxPayerDetails.AGains).toFixed(2);
    }
    if (this.taxPayerDetails.ACompShare == '' || this.taxPayerDetails.ACompShare == null || this.taxPayerDetails.ACompShare == undefined || this.taxPayerDetails.ACompShare == 'undefined') {
      this.taxPayerDetails.ACompShare = "0.00";
    }
    else {
      if (this.taxPayerDetails.ACompShare.toString().indexOf('.') > -1) {
        this.taxPayerDetails.ACompShare = (this.taxPayerDetails.ACompShare.slice(0, (this.taxPayerDetails.ACompShare.indexOf(".")) + 3));
      }
      this.taxPayerDetails.ACompShare = (+this.taxPayerDetails.ACompShare).toFixed(2);
    }
    if (this.taxPayerDetails.ADividends == '' || this.taxPayerDetails.ADividends == null || this.taxPayerDetails.ADividends == undefined || this.taxPayerDetails.ADividends == 'undefined') {
      this.taxPayerDetails.ADividends = "0.00";
    }
    else {
      if (this.taxPayerDetails.ADividends.toString().indexOf('.') > -1) {
        this.taxPayerDetails.ADividends = (this.taxPayerDetails.ADividends.slice(0, (this.taxPayerDetails.ADividends.indexOf(".")) + 3));
      }
      this.taxPayerDetails.ADividends = (+this.taxPayerDetails.ADividends).toFixed(2);
    }
    if (this.taxPayerDetails.ASaleGain == '' || this.taxPayerDetails.ASaleGain == null || this.taxPayerDetails.ASaleGain == undefined || this.taxPayerDetails.ASaleGain == 'undefined') {
      this.taxPayerDetails.ASaleGain = "0.00";
    }
    else {
      if (this.taxPayerDetails.ASaleGain.toString().indexOf('.') > -1) {
        this.taxPayerDetails.ASaleGain = (this.taxPayerDetails.ASaleGain.slice(0, (this.taxPayerDetails.ASaleGain.indexOf(".")) + 3));
      }
      this.taxPayerDetails.ASaleGain = (+this.taxPayerDetails.ASaleGain).toFixed(2);
    }
    if (this.taxPayerDetails.ARefundable == '' || this.taxPayerDetails.ARefundable == null || this.taxPayerDetails.ARefundable == undefined || this.taxPayerDetails.ARefundable == 'undefined') {
      this.taxPayerDetails.ARefundable = "0.00";
    }
    else {
      if (this.taxPayerDetails.ARefundable.toString().indexOf('.') > -1) {
        this.taxPayerDetails.ARefundable = (this.taxPayerDetails.ARefundable.slice(0, (this.taxPayerDetails.ARefundable.indexOf(".")) + 3));
      }
      this.taxPayerDetails.ARefundable = (+this.taxPayerDetails.ARefundable).toFixed(2);
    }
    if (this.taxPayerDetails.ACompensation == '' || this.taxPayerDetails.ACompensation == null || this.taxPayerDetails.ACompensation == undefined || this.taxPayerDetails.ACompensation == 'undefined') {
      this.taxPayerDetails.ACompensation = "0.00";
    }
    else {
      if (this.taxPayerDetails.ACompensation.toString().indexOf('.') > -1) {
        this.taxPayerDetails.ACompensation = (this.taxPayerDetails.ACompensation.slice(0, (this.taxPayerDetails.ACompensation.indexOf(".")) + 3));
      }
      this.taxPayerDetails.ACompensation = (+this.taxPayerDetails.ACompensation).toFixed(2);
    }
    if (this.taxPayerDetails.AFranchise == '' || this.taxPayerDetails.AFranchise == null || this.taxPayerDetails.AFranchise == undefined || this.taxPayerDetails.AFranchise == 'undefined') {
      this.taxPayerDetails.AFranchise = "0.00";
    }
    else {
      if (this.taxPayerDetails.AFranchise.toString().indexOf('.') > -1) {
        this.taxPayerDetails.AFranchise = (this.taxPayerDetails.AFranchise.slice(0, (this.taxPayerDetails.AFranchise.indexOf(".")) + 3));
      }
      this.taxPayerDetails.AFranchise = (+this.taxPayerDetails.AFranchise).toFixed(2);
    }
    if (this.taxPayerDetails.ARents == '' || this.taxPayerDetails.ARents == null || this.taxPayerDetails.ARents == undefined || this.taxPayerDetails.ARents == 'undefined') {
      this.taxPayerDetails.ARents = "0.00";
    }
    else {
      if (this.taxPayerDetails.ARents.toString().indexOf('.') > -1) {
        this.taxPayerDetails.ARents = (this.taxPayerDetails.ARents.slice(0, (this.taxPayerDetails.ARents.indexOf(".")) + 3));
      }
      this.taxPayerDetails.ARents = (+this.taxPayerDetails.ARents).toFixed(2);
    }
    if (this.taxPayerDetails.AOtherincome10212 == '' || this.taxPayerDetails.AOtherincome10212 == null || this.taxPayerDetails.AOtherincome10212 == undefined || this.taxPayerDetails.AOtherincome10212 == 'undefined') {
      this.taxPayerDetails.AOtherincome10212 = "0.00";
    }
    else {
      if (this.taxPayerDetails.AOtherincome10212.toString().indexOf('.') > -1) {
        this.taxPayerDetails.AOtherincome10212 = (this.taxPayerDetails.AOtherincome10212.slice(0, (this.taxPayerDetails.AOtherincome10212.indexOf(".")) + 3));
      }
      this.taxPayerDetails.AOtherincome10212 = (+this.taxPayerDetails.AOtherincome10212).toFixed(2);
    }
    this.total10200 = (parseFloat(this.taxPayerDetails.ACapitalGains) +
      parseFloat(this.taxPayerDetails.ACommissions) +
      parseFloat(this.taxPayerDetails.AReturnLoans) +
      parseFloat(this.taxPayerDetails.AGains) +
      parseFloat(this.taxPayerDetails.ACompShare) +
      parseFloat(this.taxPayerDetails.ADividends) +
      parseFloat(this.taxPayerDetails.ASaleGain) +
      parseFloat(this.taxPayerDetails.ARefundable) +
      parseFloat(this.taxPayerDetails.ACompensation) +
      parseFloat(this.taxPayerDetails.AFranchise) +
      parseFloat(this.taxPayerDetails.ARents) +
      parseFloat(this.taxPayerDetails.AOtherincome10212)
    ).toFixed(2);
    this.taxPayerDetails.AOtherTotal = (+this.total10200).toFixed(2);
    this.taxPayerDetails.ATotalIncome = (parseFloat(this.total10100) + parseFloat(this.total10200)).toFixed(2);
  }
  //purna end
  //hema start
  GlobalNumberAllow1(event) {
    var rgx = /^\d{0,14}(\.\d{0,2})?$/;
    console.log(event.target.value);
    if (event.keyCode == 8) {
      return true;
    }
    else if (!rgx.test((event.target.value).toString().replace(/,/g, ''))) {
      return event.preventDefault();
    }

  }
  GlobalNumberAllow2(event) {
    var rgx = /^\d{0,12}(\.\d{0,2})?$/;
    console.log(event.target.value);
    if (event.keyCode == 8) {
      return true;
    }
    else if (!rgx.test((event.target.value).toString().replace(/,/g, ''))) {
      return event.preventDefault();
    }

  }
  Schedule10101Applicable(event) {
    if (event.target.checked) {
      this.IncomeFromActivityForm10101.patchValue({ 'Schedule': true });
      //this.Contract10101ActivitiesRow();
      jQuery("#incomefrmcontracting").modal('show');
    }
    else {
      jQuery("#switch02").prop('checked', false);
      //jQuery("#NotApplicableForm").modal('show');
    }
  }
  get Contract10101Activities(): FormArray {
    return this.IncomeFromActivityForm10101.get('Contract10101Activities') as FormArray;
  }
  DeleteContract10101Activitie(pi) {
    const control = this.IncomeFromActivityForm10101.get('Contract10101Activities') as FormArray;
    control.removeAt(pi);
    this.Contract10101ActivitiesTotalsCalculation();
  }
  Contract10101ActivitiesRow() {
    let type = this.AddContract10101Activitie();
    this.Contract10101Activities.push(type);
  }
  AddContract10101Activitie() {
    return this.fb.group({
      "ContractingParty": [null, Validators.required],
      "ContractDate": [null, [Validators.required]],
      "OriginalValueOFContract": ["0.00", [Validators.required, Validators.min(0), Validators.max(99999999999999.99)]],
      "AmendValue": ["0.00", [Validators.required, Validators.min(0), Validators.max(99999999999999.99)]],
      "ContractValueAfterAmend": ["0.00", Validators.required],
      "ActualCostIncurredDate": ["0.00", [Validators.required, Validators.min(0), Validators.max(99999999999999.99)]],
      "EstimatedCostOfContract": ["0.00", [Validators.required, Validators.min(0), Validators.max(99999999999999.99)]],
      "RevOccurIncDate": ["0.00", Validators.required],
      "RevOccPrevYears": ["0.00", [Validators.required, Validators.min(0), Validators.max(99999999999999.99)]],
      "RevDuringYear": ["0.00", Validators.required],
      "CalendarType": ['G', Validators.required]
    });
  }
  AddMultipleContract10101Forms() {
    for (let i = 0; i < this.NoOfAddedForms; i++) {
      this.Contract10101ActivitiesRow();
    }
    this.NoOfAddedForms = 0;
    jQuery("#addMultipleForms10101Modal").modal('hide');
    jQuery('body').addClass('modalopen');
  }
  DateChange(pi) {
    moment.locale('en-Us');
    const control1 = this.Contract10101Activities.controls[pi];
    //console.log(control1.value.ContractDate)
    control1.patchValue({ 'ContractDate': control1.value.ContractDate });
    control1.patchValue({ 'CalendarType': control1.value.ContractDate["calendarName"] == "Gregorian" ? "G" : "H" });
    //console.log((moment(this.CommonValidation.changeDate2(control1.value.ContractDate), 'YYYY-MM-DD').diff(moment( this.periodStartDate?.hy +"/"+this.periodStartDate?.hm +"/"+this.periodStartDate?.hd, 'YYYY/MM/DD'), 'days')) , (moment(this.CommonValidation.changeDate2(control1.value.ContractDate), 'YYYY-MM-DD').diff(moment(this.periodEndDate, 'YYYY/MM/DD'), 'days')))
    if (this.taxPayerDetails ?.PeriodKeyz < 1900) {
      console.log(this.CommonValidation.changeDate4(this.CommonValidation.dateFormate(control1.value.ContractDate, "Islamic")))
      console.log(moment(this.periodStartDate ?.hd + "-" + this.periodStartDate ?.hm + "-" + this.periodStartDate ?.hy, 'YYYY-MM-DD'));
      console.log(moment(this.CommonValidation.changeDate4(this.CommonValidation.dateFormate(control1.value.ContractDate, "Islamic")), 'YYYY-MM-DD').diff(moment(this.periodStartDate ?.hy + "-" + this.periodStartDate ?.hm + "-" + this.periodStartDate ?.hd, 'YYYY-MM-DD'), "day"))
      console.log(moment(this.CommonValidation.changeDate4(this.CommonValidation.dateFormate(control1.value.ContractDate, "Islamic")), 'YYYY-MM-DD').diff(moment(this.periodEndDate ?.hy + "-" + this.periodEndDate ?.hm + "-" + this.periodEndDate ?.hd, 'YYYY-MM-DD'), "day"))

      if ((moment(this.CommonValidation.changeDate4(this.CommonValidation.dateFormate(control1.value.ContractDate, "Islamic")), 'YYYY-MM-DD').diff(moment(this.periodStartDate ?.hy + "-" + this.periodStartDate ?.hm + "-" + this.periodStartDate ?.hd, 'YYYY-MM-DD'), "day") <= 0) || (moment(this.CommonValidation.changeDate4(this.CommonValidation.dateFormate(control1.value.ContractDate, "Islamic")), 'YYYY-MM-DD').diff(moment(this.periodEndDate ?.hy + "-" + this.periodEndDate ?.hm + "-" + this.periodEndDate ?.hd, 'YYYY-MM-DD'), "day") >= 0)) {
        control1.patchValue({ 'ContractDate': '' });
      }
    }
    else {
      if ((moment(this.CommonValidation.changeDate2(control1.value.ContractDate), 'YYYY-MM-DD').diff(moment(this.periodStartDate, 'YYYY/MM/DD'), 'days') <= 0) || (moment(this.CommonValidation.changeDate2(control1.value.ContractDate), 'YYYY-MM-DD').diff(moment(this.periodEndDate, 'YYYY/MM/DD'), 'days') >= 0)) {
        control1.patchValue({ 'ContractDate': '' });
      }
    }

  }
  Contract10101ActivitiesTotalsCalculation() {
    let TotalOriginalValueContract = 0;
    let TotalAmendementsValue = 0;
    let TotalValueAfterAmendments = 0;
    let TotalActualCostIncurredDate = 0;
    let TotalEstimatedCostContract = 0;
    let TotalRevPerIncurrDate = 0;
    let TotalRevPerpreviousYears = 0;
    let TotalRevPerWorkDoneDuringYears = 0;
    for (let i = 0; i < this.Contract10101Activities.controls.length; i++) {
      this.Contract10101Activities.controls[i].patchValue({ 'ContractValueAfterAmend': parseFloat((((+this.Contract10101Activities.controls[i].value.OriginalValueOFContract) || 0) + ((+this.Contract10101Activities.controls[i].value.AmendValue) || 0)).toString()).toFixed(2) });
      let amount = 0
      amount = (+this.Contract10101Activities.controls[i].value.ContractValueAfterAmend) * (((+this.Contract10101Activities.controls[i].value.ActualCostIncurredDate) || 0) / ((+this.Contract10101Activities.controls[i].value.EstimatedCostOfContract) || 0))
      this.Contract10101Activities.controls[i].patchValue({ 'RevOccurIncDate': parseFloat(amount.toString()).toFixed(2) });
      this.Contract10101Activities.controls[i].patchValue({ 'RevDuringYear': parseFloat((((+this.Contract10101Activities.controls[i].value.RevOccurIncDate) || 0) - ((+this.Contract10101Activities.controls[i].value.RevOccPrevYears) || 0)).toString()).toFixed(2) });
      TotalOriginalValueContract = TotalOriginalValueContract + ((+this.Contract10101Activities.controls[i].value.OriginalValueOFContract) || 0);
      TotalAmendementsValue = TotalAmendementsValue + ((+this.Contract10101Activities.controls[i].value.AmendValue) || 0);
      TotalValueAfterAmendments = TotalValueAfterAmendments + ((+this.Contract10101Activities.controls[i].value.ContractValueAfterAmend) || 0);
      TotalActualCostIncurredDate = TotalActualCostIncurredDate + ((+this.Contract10101Activities.controls[i].value.ActualCostIncurredDate) || 0);
      TotalEstimatedCostContract = TotalEstimatedCostContract + ((+this.Contract10101Activities.controls[i].value.EstimatedCostOfContract) || 0);
      TotalRevPerIncurrDate = TotalRevPerIncurrDate + ((+this.Contract10101Activities.controls[i].value.RevOccurIncDate) || 0);
      TotalRevPerpreviousYears = TotalRevPerpreviousYears + ((+this.Contract10101Activities.controls[i].value.RevOccPrevYears) || 0);
      TotalRevPerWorkDoneDuringYears = TotalRevPerWorkDoneDuringYears + ((+this.Contract10101Activities.controls[i].value.RevDuringYear) || 0);
    }
    this.IncomeFromActivityForm10101.patchValue({
      "TotalOriginalValueContract": parseFloat(TotalOriginalValueContract.toString()).toFixed(2),
      "TotalAmendementsValue": parseFloat(TotalAmendementsValue.toString()).toFixed(2),
      "TotalValueAfterAmendments": parseFloat(TotalValueAfterAmendments.toString()).toFixed(2),
      "TotalActualCostIncurredDate": parseFloat(TotalActualCostIncurredDate.toString()).toFixed(2),
      "TotalEstimatedCostContract": parseFloat(TotalEstimatedCostContract.toString()).toFixed(2),
      "TotalRevPerIncurrDate": parseFloat(TotalRevPerIncurrDate.toString()).toFixed(2),
      "TotalRevPerDuringYears": parseFloat(TotalRevPerpreviousYears.toString()).toFixed(2),
      "TotalRevPerWorkDoneDuringYears": parseFloat(TotalRevPerWorkDoneDuringYears.toString()).toFixed(2),
    });
    this.taxPayerDetails.AIncomeContract = parseFloat(this.IncomeFromActivityForm10101.value.TotalRevPerIncurrDate).toFixed(2);

  }
  Validate10101Patterns(pi) {
    this.Contract10101Activities.controls[pi].patchValue({ 'OriginalValueOFContract': parseFloat(((+this.Contract10101Activities.controls[pi].value.OriginalValueOFContract) || 0).toString()).toFixed(2) });
    this.Contract10101Activities.controls[pi].patchValue({ 'AmendValue': parseFloat(((+this.Contract10101Activities.controls[pi].value.AmendValue) || 0).toString()).toFixed(2) });
    this.Contract10101Activities.controls[pi].patchValue({ 'ActualCostIncurredDate': parseFloat(((+this.Contract10101Activities.controls[pi].value.ActualCostIncurredDate) || 0).toString()).toFixed(2) });
    this.Contract10101Activities.controls[pi].patchValue({ 'EstimatedCostOfContract': parseFloat(((+this.Contract10101Activities.controls[pi].value.EstimatedCostOfContract) || 0).toString()).toFixed(2) });
    this.Contract10101Activities.controls[pi].patchValue({ 'RevOccPrevYears': parseFloat(((+this.Contract10101Activities.controls[pi].value.RevOccPrevYears) || 0).toString()).toFixed(2) });
    this.Contract10101ActivitiesTotalsCalculation();
  }
  Save10101Activites() {
    console.log(this.Contract10101Activities);
    this.taxPayerDetails.AIncomeContractChk = this.IncomeFromActivityForm10101.value.Schedule ? "1" : "0";
    let formGuid = this.taxPayerDetails.Sch_10101Set["results"][0]['FormGuid'];
    this.taxPayerDetails.Sch_10101Set["results"] = [];
    for (let i = 0; i < this.Contract10101Activities.controls.length; i++) {
      this.taxPayerDetails.Sch_10101Set["results"].push({});
      this.taxPayerDetails.Sch_10101Set["results"][i]['ContractParty'] = this.Contract10101Activities.controls[i]['ContractingParty'];
      this.taxPayerDetails.Sch_10101Set["results"][i]['OriginalVal'] = parseFloat(this.Contract10101Activities.controls[i]['OriginalValueOFContract'] || 0).toFixed(2);
      this.taxPayerDetails.Sch_10101Set["results"][i]['AmendVal'] = parseFloat(this.Contract10101Activities.controls[i]['AmendValue'] || 0).toFixed(2);
      this.taxPayerDetails.Sch_10101Set["results"][i]['ContractVal'] = parseFloat(this.Contract10101Activities.controls[i]['ContractValueAfterAmend'] || 0).toFixed(2);
      this.taxPayerDetails.Sch_10101Set["results"][i]['TotalCost'] = parseFloat(this.Contract10101Activities.controls[i]['ActualCostIncurredDate'] || 0).toFixed(2);
      this.taxPayerDetails.Sch_10101Set["results"][i]['EstimatedCost'] = parseFloat(this.Contract10101Activities.controls[i]['EstimatedCostOfContract'] || 0).toFixed(2);
      this.taxPayerDetails.Sch_10101Set["results"][i]['RevenueTilldt'] = parseFloat(this.Contract10101Activities.controls[i]['RevOccurIncDate'] || 0).toFixed(2);
      this.taxPayerDetails.Sch_10101Set["results"][i]['RevenuePrev'] = parseFloat(this.Contract10101Activities.controls[i]['RevOccPrevYears'] || 0).toFixed(2);
      this.taxPayerDetails.Sch_10101Set["results"][i]['RevenueWork'] = parseFloat(this.Contract10101Activities.controls[i]['RevDuringYear'] || 0).toFixed(2);
      this.taxPayerDetails.Sch_10101Set["results"][i]['ContractDtTp'] = this.Contract10101Activities.controls[i]['CalendarType'] || 'G';
      this.taxPayerDetails.Sch_10101Set["results"][i]['ContractDt'] = this.Contract10101Activities.controls[i].value.ContractDate ? "\/Date(" + new Date(this.CommonValidation.changeDate2(this.Contract10101Activities.controls[i].value.ContractDate)).getTime() + ")\/" : "\/Date(" + new Date().getTime() + ")\/";
      this.taxPayerDetails.Sch_10101Set["results"][i]['FormGuid'] = formGuid;
    }
    this.calIncomeCoverForm();
    this.taxPayerDetails.Savez = 'X';
    this.returnsService.postForm8AmendData(this.taxPayerDetails).subscribe(data => {
      console.log(data);
      this.taxPayerDetails = data["d"];
      jQuery("#incomefrmcontracting").modal("hide");
    });

  }
  //hema end
  ngOnInit(): void {
    this.GetUserDetails();
    if (localStorage.getItem("lang") === "ar") {
      this.lang = form8constants.langz.arb.form8;
      this.direction = form8constants.langz.arb.dir;
    } else {
      this.lang = form8constants.langz.eng.form8;
      this.direction = form8constants.langz.eng.dir;
    }
    this.route.params.subscribe((params) => {
      console.log("params", params);
      this.fbGuid = params["fbGuid"] || "";
      this.eUser = params["euser"] || "";
      this.fbNum = params["fbnum"] || "";
      this.gPart = JSON.parse(localStorage.getItem('gpart'));
      if (this.fbGuid && this.eUser) {
        this.getTaxpayerDetails();
        this.getForm11ACKDetails();
        this.getForm8AmendDetails();
      }
    });
    //hema start
    this.IncomeFromActivityForm10101 = this.fb.group({
      "Schedule": [false],
      "FillType": ['Manual'],
      "Contract10101Activities": this.fb.array([]),
      "TotalOriginalValueContract": [0.00],
      "TotalAmendementsValue": [0.00],
      "TotalValueAfterAmendments": [0.00],
      "TotalActualCostIncurredDate": [0.00],
      "TotalEstimatedCostContract": [0.00],
      "TotalRevPerIncurrDate": [0.00],
      "TotalRevPerDuringYears": [0.00],
      "TotalRevPerWorkDoneDuringYears": [0.00]
    });

    this.InsuranceActivityForm10103 = this.fb.group({
      "Schedule": [false],
      "totInsurancePremiumsEarnedPay": ["0.00", [Validators.required, Validators.min(0), Validators.max(999999999999.00)]],
      "canclInsurancePrem": ["0.00", [Validators.required, Validators.min(0), Validators.max(999999999999.00)]],
      "reInsPremLocEnti": ["0.00", [Validators.required, Validators.min(0), Validators.max(999999999999.00)]],
      "reInsPremExtEnti": ["0.00", [Validators.required, Validators.min(0), Validators.max(999999999999.00)]],
      "netPreEarnVest": ["0.00"],
      "resCompUnearnPremEOPY": ["0.00", [Validators.required, Validators.min(0), Validators.max(999999999999.00)]],
      "resCompDgrExtEOPY": ["0.00", [Validators.required, Validators.min(0), Validators.max(999999999999.00)]],
      "totResCompUnearnDgrEOPY": ["0.00"],
      "invstInc": ["0.00", [Validators.required, Validators.min(0), Validators.max(999999999999.00)]],
      "othIncome": ["0.00", [Validators.required, Validators.min(0), Validators.max(999999999999.00)]],
      "totIncFrmAct": ["0.00"]
    });
    this.SubContractorsForm10544 = this.fb.group({
      "Schedule": [false],
      "FillType": ['Manual'],
      "valWorkexecDurY": ["0.00"],
      "subContractors10544Activities": this.fb.array([])
    });
    //hema end
  }
  getTaxpayerDetails() {
    this.returnsService.getForm8TaxpayerDetails(this.fbGuid, this.eUser).subscribe((data) => {
      console.log("form8", data["d"])
      this.taxPayerDetails = data["d"];
      //hema start
      // console.log((moment(new Date(+(((this.taxPayerDetails.AFrom).toString().replace(')', '')).toString().replace('/Date(', '')).toString().replace('/', ''))).format('YYYY')), +(moment(new Date()).format('MM')), (+moment(new Date()).format('DD')))
      // console.log(this.taxPayerDetails.ACalendarTp,this.taxPayerDetails.PeriodKeyz < 1900)
      if (this.taxPayerDetails.ACalendarTp == "H" || this.taxPayerDetails.PeriodKeyz < 1900) {
        moment.locale('en-US');
        this.periodStartDate = (toHijri(+(moment(new Date(+(((this.taxPayerDetails.AFrom).toString().replace(')', '')).toString().replace('/Date(', '')).toString().replace('/', ''))).format('YYYY')), +(moment(new Date()).format('MM')), (+moment(new Date()).format('DD'))));
        this.periodEndDate = (toHijri(+(moment(new Date(+(((this.taxPayerDetails.ATo).toString().replace(')', '')).toString().replace('/Date(', '')).toString().replace('/', ''))).format('YYYY')), +(moment(new Date()).format('MM')), (+moment(new Date()).format('DD'))));
      }
      else {
        this.periodStartDate = moment(new Date(+(((this.taxPayerDetails.AFrom).toString().replace(')', '')).toString().replace('/Date(', '')).toString().replace('/', ''))).format('DD/MM/YYYY');
        this.periodEndDate = moment(new Date(+(((this.taxPayerDetails.ATo).toString().replace(')', '')).toString().replace('/Date(', '')).toString().replace('/', ''))).format('DD/MM/YYYY');
      }
      this.SetForms();
      console.log(this.periodEndDate, this.periodStartDate)


      for (let i = 0; i < data["d"]["AttDetSet"]["results"].length; i++) {
        if (data["d"]["AttDetSet"]["results"][i]["Dotyp"] == 'RT8A') {
          this.files.push(data["d"]["AttDetSet"]["results"][i])
        }
        else if (data["d"]["AttDetSet"]["results"][i]["Dotyp"] == 'RT8B') {
          this.files1.push(data["d"]["AttDetSet"]["results"][i])
        }
      }

      //hema end
      //purna start      
      if (this.taxPayerDetails.AGainsChk == '1') {
        this.form10204.patchValue({ "Schedule": true })
      }
      else {
        this.form10204.patchValue({ "Schedule": false })
      }
      this.clearFormArray(this.income10204);
      for (let i = 0; i < this.taxPayerDetails.Sch_10204Set["results"].length; i++) {
        this.addRowIncome10204();
        this.income10204.controls[i].patchValue({ "CompanyNm": this.taxPayerDetails.Sch_10204Set["results"][i]["CompanyNm"] });
        this.income10204.controls[i].patchValue({ "InvestmentTp": this.taxPayerDetails.Sch_10204Set["results"][i]["InvestmentTp"] });
        this.income10204.controls[i].patchValue({ "GainLosses": this.taxPayerDetails.Sch_10204Set["results"][i]["GainLosses"] });
      }
      this.calCellTotalIncome10204();
      if (this.taxPayerDetails.ACompShareChk == '1') {
        this.form10205.patchValue({ "Schedule": true })
      }
      else {
        this.form10205.patchValue({ "Schedule": false })
      }
      this.clearFormArray(this.income10205);
      for (let i = 0; i < this.taxPayerDetails.Sch_10205Set["results"].length; i++) {
        this.addRowIncome10205();
        this.income10205.controls[i].patchValue({ "CompanyNm": this.taxPayerDetails.Sch_10205Set["results"][i]["CompanyNm"] });
        this.income10205.controls[i].patchValue({ "InvestmentTp": this.taxPayerDetails.Sch_10205Set["results"][i]["InvestmentTp"] });
        this.income10205.controls[i].patchValue({ "GainLosses": this.taxPayerDetails.Sch_10205Set["results"][i]["GainLosses"] });
      }
      this.calCellTotalIncome10205();
      if (this.taxPayerDetails.ADividendsChk == '1') {
        this.form10206.patchValue({ "Schedule": true })
      }
      else {
        this.form10206.patchValue({ "Schedule": false })
      }
      this.clearFormArray(this.income10206);
      for (let i = 0; i < this.taxPayerDetails.Sch_10206Set["results"].length; i++) {
        this.addRowIncome10206();
        this.income10206.controls[i].patchValue({ "CompNm": this.taxPayerDetails.Sch_10206Set["results"][i]["CompNm"] });
        this.income10206.controls[i].patchValue({ "CompTp": this.taxPayerDetails.Sch_10206Set["results"][i]["CompTp"] });
        this.income10206.controls[i].patchValue({ "BegBal": this.taxPayerDetails.Sch_10206Set["results"][i]["BegBal"] });
        this.income10206.controls[i].patchValue({ "AdditionCost": this.taxPayerDetails.Sch_10206Set["results"][i]["AdditionCost"] });
        this.income10206.controls[i].patchValue({ "ExclutionCost": this.taxPayerDetails.Sch_10206Set["results"][i]["ExclutionCost"] });
        this.income10206.controls[i].patchValue({ "Exhaustion": this.taxPayerDetails.Sch_10206Set["results"][i]["Exhaustion"] });
        this.income10206.controls[i].patchValue({ "GainIncomestmt": this.taxPayerDetails.Sch_10206Set["results"][i]["GainIncomestmt"] });
        this.income10206.controls[i].patchValue({ "GainProperty": this.taxPayerDetails.Sch_10206Set["results"][i]["GainProperty"] });
        this.income10206.controls[i].patchValue({ "EndBal": this.taxPayerDetails.Sch_10206Set["results"][i]["EndBal"] });
        this.income10206.controls[i].patchValue({ "DeductTaxable": this.taxPayerDetails.Sch_10206Set["results"][i]["DeductTaxable"] });
        this.income10206.controls[i].patchValue({ "ExclutionSelling": this.taxPayerDetails.Sch_10206Set["results"][i]["ExclutionSelling"] });
        this.income10206.controls[i].patchValue({ "ExclutionGain": this.taxPayerDetails.Sch_10206Set["results"][i]["ExclutionGain"] });
      }
      this.calCellTotalIncome10206();
      if (this.taxPayerDetails.ASaleGainChk == '1') {
        this.form10207.patchValue({ "Schedule": true })
      }
      else {
        this.form10207.patchValue({ "Schedule": false })
      }
      this.clearFormArray(this.income10207);
      for (let i = 0; i < this.taxPayerDetails.Sch_10207Set["results"].length; i++) {
        this.addRowIncome10207();
        this.income10207.controls[i].patchValue({ "OwnershipRatio": this.taxPayerDetails.Sch_10207Set["results"][i]["OwnershipRatio"] });
        this.income10207.controls[i].patchValue({ "CompNm": this.taxPayerDetails.Sch_10207Set["results"][i]["CompNm"] });
        this.income10207.controls[i].patchValue({ "CompTp": this.taxPayerDetails.Sch_10207Set["results"][i]["CompTp"] });
        this.income10207.controls[i].patchValue({ "BegBal": this.taxPayerDetails.Sch_10207Set["results"][i]["BegBal"] });
        this.income10207.controls[i].patchValue({ "AdditionCost": this.taxPayerDetails.Sch_10207Set["results"][i]["AdditionCost"] });
        this.income10207.controls[i].patchValue({ "ExclutionCost": this.taxPayerDetails.Sch_10207Set["results"][i]["ExclutionCost"] });
        this.income10207.controls[i].patchValue({ "CompShare": this.taxPayerDetails.Sch_10207Set["results"][i]["CompShare"] });
        this.income10207.controls[i].patchValue({ "EarningDevidends": this.taxPayerDetails.Sch_10207Set["results"][i]["EarningDevidends"] });
        this.income10207.controls[i].patchValue({ "ProfitDevidends": this.taxPayerDetails.Sch_10207Set["results"][i]["ProfitDevidends"] });
        this.income10207.controls[i].patchValue({ "EndBal": this.taxPayerDetails.Sch_10207Set["results"][i]["EndBal"] });
        this.income10207.controls[i].patchValue({ "DeductTaxable": this.taxPayerDetails.Sch_10207Set["results"][i]["DeductTaxable"] });
        this.income10207.controls[i].patchValue({ "ExclutionSelling": this.taxPayerDetails.Sch_10207Set["results"][i]["ExclutionSelling"] });
        this.income10207.controls[i].patchValue({ "ExclutionGain": this.taxPayerDetails.Sch_10207Set["results"][i]["ExclutionGain"] });
      }
      this.calCellTotalIncome10207();
      if (this.taxPayerDetails.ARents10506Chk == '1') {
        this.form10506.patchValue({ "Schedule": true })
      }
      else {
        this.form10506.patchValue({ "Schedule": false })
      }
      this.clearFormArray(this.ce10506);
      for (let i = 0; i < this.taxPayerDetails.Sch_10506Set["results"].length; i++) {
        this.addRowCE10508();
        this.ce10506.controls[i].patchValue({ "DropDown": this.taxPayerDetails.Sch_10506Set["results"][i]["DropDown"] });
        this.ce10506.controls[i].patchValue({ "Crtinfin": this.taxPayerDetails.Sch_10506Set["results"][i]["Crtinfin"] });
        this.ce10506.controls[i].patchValue({ "ContractorNm": this.taxPayerDetails.Sch_10506Set["results"][i]["ContractorNm"] });
        this.ce10506.controls[i].patchValue({ "Addr": this.taxPayerDetails.Sch_10506Set["results"][i]["Addr"] });
        this.ce10506.controls[i].patchValue({ "BegBal": this.taxPayerDetails.Sch_10506Set["results"][i]["BegBal"] });
        this.ce10506.controls[i].patchValue({ "DirectExp": this.taxPayerDetails.Sch_10506Set["results"][i]["DirectExp"] });
        this.ce10506.controls[i].patchValue({ "IndirectExp": this.taxPayerDetails.Sch_10506Set["results"][i]["IndirectExp"] });
        this.ce10506.controls[i].patchValue({ "YearPaid": this.taxPayerDetails.Sch_10506Set["results"][i]["YearPaid"] });
        this.ce10506.controls[i].patchValue({ "EndBal": this.taxPayerDetails.Sch_10506Set["results"][i]["EndBal"] });
      }
      this.calCellTotalCE10506();
      if (this.taxPayerDetails.AMachineryChk == '1') {
        this.form10508.patchValue({ "Schedule": true })
      }
      else {
        this.form10508.patchValue({ "Schedule": false })
      }
      this.clearFormArray(this.ce10508);
      for (let i = 0; i < this.taxPayerDetails.Sch_10508Set["results"].length; i++) {
        this.addRowCE10508();
        this.ce10508.controls[i].patchValue({ "DropDown": this.taxPayerDetails.Sch_10508Set["results"][i]["DropDown"] });
        this.ce10508.controls[i].patchValue({ "Crtinfin": this.taxPayerDetails.Sch_10508Set["results"][i]["Crtinfin"] });
        this.ce10508.controls[i].patchValue({ "ContractorNm": this.taxPayerDetails.Sch_10508Set["results"][i]["ContractorNm"] });
        this.ce10508.controls[i].patchValue({ "Addr": this.taxPayerDetails.Sch_10508Set["results"][i]["Addr"] });
        this.ce10508.controls[i].patchValue({ "BegBal": this.taxPayerDetails.Sch_10508Set["results"][i]["BegBal"] });
        this.ce10508.controls[i].patchValue({ "ReceivableYr": this.taxPayerDetails.Sch_10508Set["results"][i]["ReceivableYr"] });
        this.ce10508.controls[i].patchValue({ "YearPaid": this.taxPayerDetails.Sch_10508Set["results"][i]["YearPaid"] });
        this.ce10508.controls[i].patchValue({ "EndBal": this.taxPayerDetails.Sch_10508Set["results"][i]["EndBal"] });
      }
      this.calCellTotalCE10508();
      if (this.taxPayerDetails.AOtherDirectChk == '1') {
        this.form10511.patchValue({ "Schedule": true })
      }
      else {
        this.form10511.patchValue({ "Schedule": false })
      }
      this.clearFormArray(this.ce10511);
      for (let i = 0; i < this.taxPayerDetails.Sch_10510Set["results"].length; i++) {
        this.addRowCE10511();
        this.ce10511.controls[i].patchValue({ "Stmt": this.taxPayerDetails.Sch_10510Set["results"][i]["Stmt"] });
        this.ce10511.controls[i].patchValue({ "Value": this.taxPayerDetails.Sch_10510Set["results"][i]["Value"] });
      }
      this.calCellTotalCE10511();
      if (this.taxPayerDetails.ATechnicalFeesChk == '1') {
        this.form10807.patchValue({ "Schedule": true })
      }
      else {
        this.form10807.patchValue({ "Schedule": false })
      }
      this.clearFormArray(this.income10807);
      for (let i = 0; i < this.taxPayerDetails.Sch_10807Set["results"].length; i++) {
        this.addRowIncome10807();
        this.income10807.controls[i].patchValue({ "DropDown": this.taxPayerDetails.Sch_10807Set["results"][i]["DropDown"] });
        this.income10807.controls[i].patchValue({ "Crtinfin": this.taxPayerDetails.Sch_10807Set["results"][i]["Crtinfin"] });
        this.income10807.controls[i].patchValue({ "BeneficiaryNm": this.taxPayerDetails.Sch_10807Set["results"][i]["BeneficiaryNm"] });
        this.income10807.controls[i].patchValue({ "Addr": this.taxPayerDetails.Sch_10807Set["results"][i]["Addr"] });
        this.income10807.controls[i].patchValue({ "LocalForeigner": this.taxPayerDetails.Sch_10807Set["results"][i]["LocalForeigner"] });
        this.income10807.controls[i].patchValue({ "Amt": this.taxPayerDetails.Sch_10807Set["results"][i]["Amt"] });
      }
      this.calCellTotalIncome10807();
      if (this.taxPayerDetails.AProvisionsChk == '1') {
        this.form10809.patchValue({ "Schedule": true })
      }
      else {
        this.form10809.patchValue({ "Schedule": false })
      }
      this.clearFormArray(this.ce10809);
      for (let i = 0; i < this.taxPayerDetails.Sch_10809Set["results"].length; i++) {
        this.addRowCE10809();
        this.ce10809.controls[i].patchValue({ "AllocatedNm": this.taxPayerDetails.Sch_10809Set["results"][i]["AllocatedNm"] });
        this.ce10809.controls[i].patchValue({ "BegBal": this.taxPayerDetails.Sch_10809Set["results"][i]["BegBal"] });
        this.ce10809.controls[i].patchValue({ "MadeBal": this.taxPayerDetails.Sch_10809Set["results"][i]["MadeBal"] });
        this.ce10809.controls[i].patchValue({ "UsedBal": this.taxPayerDetails.Sch_10809Set["results"][i]["UsedBal"] });
        this.ce10809.controls[i].patchValue({ "Settlements": this.taxPayerDetails.Sch_10809Set["results"][i]["Settlements"] });
        this.ce10809.controls[i].patchValue({ "EndBal": this.taxPayerDetails.Sch_10809Set["results"][i]["EndBal"] });
      }
      this.calCellTotalCE10809();
      if (this.taxPayerDetails.ADonationsPaid10814Chk == '1') {
        this.form10814.patchValue({ "Schedule": true })
      }
      else {
        this.form10814.patchValue({ "Schedule": false })
      }
      this.clearFormArray(this.income10814);
      for (let i = 0; i < this.taxPayerDetails.Sch_10814Set["results"].length; i++) {
        this.addRowIncome10814();
        this.income10814.controls[i].patchValue({ "DropDown": this.taxPayerDetails.Sch_10814Set["results"][i]["DropDown"] });
        this.income10814.controls[i].patchValue({ "Crtinfin": this.taxPayerDetails.Sch_10814Set["results"][i]["Crtinfin"] });
        this.income10814.controls[i].patchValue({ "BeneficiaryNm": this.taxPayerDetails.Sch_10814Set["results"][i]["BeneficiaryNm"] });
        this.income10814.controls[i].patchValue({ "Addr": this.taxPayerDetails.Sch_10814Set["results"][i]["Addr"] });
        this.income10814.controls[i].patchValue({ "PaidAmt": this.taxPayerDetails.Sch_10814Set["results"][i]["PaidAmt"] });
      }
      this.calCellTotalIncome10814();
      if (this.taxPayerDetails.ATechnicalSupportChk == '1') {
        this.form10815.patchValue({ "Schedule": true })
      }
      else {
        this.form10815.patchValue({ "Schedule": false })
      }
      this.clearFormArray(this.income10815);
      for (let i = 0; i < this.taxPayerDetails.Sch_10815Set["results"].length; i++) {
        this.addRowIncome10815();
        this.income10815.controls[i].patchValue({ "DropDown": this.taxPayerDetails.Sch_10815Set["results"][i]["DropDown"] });
        this.income10815.controls[i].patchValue({ "Crtinfin": this.taxPayerDetails.Sch_10815Set["results"][i]["Crtinfin"] });
        this.income10815.controls[i].patchValue({ "BeneficiaryNm": this.taxPayerDetails.Sch_10815Set["results"][i]["BeneficiaryNm"] });
        this.income10815.controls[i].patchValue({ "Addr": this.taxPayerDetails.Sch_10815Set["results"][i]["Addr"] });
        this.income10815.controls[i].patchValue({ "InternalExt": this.taxPayerDetails.Sch_10815Set["results"][i]["InternalExt"] });
        this.income10815.controls[i].patchValue({ "Amt": this.taxPayerDetails.Sch_10815Set["results"][i]["Amt"] });
      }
      this.calCellTotalIncome10815();
      if (this.taxPayerDetails.AOtherIndirctChk == '1') {
        this.form10822.patchValue({ "Schedule": true })
      }
      else {
        this.form10822.patchValue({ "Schedule": false })
      }
      this.clearFormArray(this.ce10822);
      for (let i = 0; i < this.taxPayerDetails.Sch_10822Set["results"].length; i++) {
        this.addRowCE10822();
        this.ce10822.controls[i].patchValue({ "Stmt": this.taxPayerDetails.Sch_10822Set["results"][i]["Stmt"] });
        this.ce10822.controls[i].patchValue({ "Value": this.taxPayerDetails.Sch_10822Set["results"][i]["Value"] });
      }
      this.calCellTotalCE10822();
      //purna end
    })
  }
  getForm11ACKDetails() {
    this.returnsService.getForm8ACKDetails(this.fbNum).subscribe((data) => {
      console.log("form8ack", data["d"])
    })
  }
  getForm8AmendDetails() {
    this.returnsService.getForm8AmendDetails(this.fbNum).subscribe((data) => {
      console.log("form8amend", data["d"])
    })
  }
  saveForm8() {
    this.returnsService.postForm8AmendData(this.taxPayerDetails).subscribe(data => {
      console.log(data);
      this.taxPayerDetails = data["d"];

    });
  }
  getForm8AmendReturnService(pFlag) {
    this.returnsService.getForm8AmendReturnService(this.fbNum, pFlag).subscribe((data) => {
      console.log("form8amdreturn", data["d"])
    })
  }
  // validateIDnumbersForm8(ivTin, ivFbtyp, ivPartner) {
  //   ivFbtyp="ITZC";
  //   ivPartner=this.loginUser;
  //   this.returnsService.validateIDnumbersForm8(ivTin, ivFbtyp, ivPartner).subscribe((data) => {
  //     console.log("form8valid", data["d"])
  //   })
  // }
  getPartnerCalculatedDetailsForm8(partner, regId, periodKey, netItax, iFixedType, ivSaudishare, ivNonsaudishare) {
    this.returnsService.getPartnerCalculatedDetailsForm8(partner, regId, periodKey, netItax, iFixedType, ivSaudishare, ivNonsaudishare).subscribe((data) => {
      console.log("form8patcalc", data["d"])
    })
  }
  getSimulateINSTCalculatedDetailsForm8(taxpayer, fbtyp, periodKey, regId, fbNum, interestAmt, penaltyAmt, revenueAmt) {
    this.returnsService.getSimulateINSTCalculatedDetailsForm8(taxpayer, fbtyp, periodKey, regId, fbNum, interestAmt, penaltyAmt, revenueAmt).subscribe((data) => {
      console.log("form8simucalc", data["d"])
    })
  }
  getZakatCalculatedDetailsForm8(vtRef, persl, zakatAmt, pnlAmt) {
    this.returnsService.getZakatCalculatedDetailsForm8(vtRef, persl, zakatAmt, pnlAmt).subscribe((data) => {
      console.log("form8zakatcalc", data["d"])
    })
  }
  //hema start  
  SetForms() {
    this.IncomeFromActivityForm10101.patchValue({ 'Schedule': this.taxPayerDetails.AIncomeContractChk == '1' ? true : false });
    this.clearFormArray(this.Contract10101Activities);
    for (let i = 0; i < this.taxPayerDetails.Sch_10101Set["results"].length; i++) {
      this.Contract10101ActivitiesRow();
      this.Contract10101Activities.controls[i].patchValue({ 'ContractingParty': this.taxPayerDetails.Sch_10101Set["results"][i]['ContractParty'] });
      this.Contract10101Activities.controls[i].patchValue({ 'OriginalValueOFContract': parseFloat(this.taxPayerDetails.Sch_10101Set["results"][i]['OriginalVal']).toFixed(2) });
      this.Contract10101Activities.controls[i].patchValue({ 'AmendValue': parseFloat(this.taxPayerDetails.Sch_10101Set["results"][i]['AmendVal']).toFixed(2) });
      this.Contract10101Activities.controls[i].patchValue({ 'ContractValueAfterAmend': parseFloat(this.taxPayerDetails.Sch_10101Set["results"][i]['ContractVal']).toFixed(2) });
      this.Contract10101Activities.controls[i].patchValue({ 'ActualCostIncurredDate': parseFloat(this.taxPayerDetails.Sch_10101Set["results"][i]['TotalCost']).toFixed(2) });
      this.Contract10101Activities.controls[i].patchValue({ 'EstimatedCostOfContract': parseFloat(this.taxPayerDetails.Sch_10101Set["results"][i]['EstimatedCost']).toFixed(2) });
      this.Contract10101Activities.controls[i].patchValue({ 'RevOccurIncDate': parseFloat(this.taxPayerDetails.Sch_10101Set["results"][i]['RevenueTilldt']).toFixed(2) });
      this.Contract10101Activities.controls[i].patchValue({ 'RevOccPrevYears': parseFloat(this.taxPayerDetails.Sch_10101Set["results"][i]['RevenuePrev']).toFixed(2) });
      this.Contract10101Activities.controls[i].patchValue({ 'RevDuringYear': parseFloat(this.taxPayerDetails.Sch_10101Set["results"][i]['RevenueWork']).toFixed(2) });
      this.Contract10101Activities.controls[i].patchValue({ 'CalendarType': this.taxPayerDetails.Sch_10101Set["results"][i]['ContractDtTp'] });

      moment.locale('en-Us');
      if (this.taxPayerDetails.Sch_10101Set["results"][i]['ContractDt'] != null) {
        let date;
        if (this.taxPayerDetails.Sch_10101Set["results"][i]['ContractDtTp'] == "G") {
          date = moment(new Date(+(((this.taxPayerDetails.Sch_10101Set["results"][i]['ContractDt']).toString().replace(')', '')).toString().replace('/Date(', '')).toString().replace('/', ''))).format('YYYY-MM-DD');
          console.log(date);
          date = this.CommonValidation.toJulianDate1(new Date(date));
        }
        else if (this.taxPayerDetails.Sch_10101Set["results"][i]['ContractDtTp'] == "H") {
          date = moment(new Date(+(((this.taxPayerDetails.Sch_10101Set["results"][i]['ContractDt']).toString().replace(')', '')).toString().replace('/Date(', '')).toString().replace('/', ''))).format('YYYY-MM-DD');
          date = this.CommonValidation.toJulianDate1(new Date(date));
          date = this.CommonValidation.dateFormate(date, "Islamic");
        }
        this.Contract10101Activities.controls[i].patchValue({ 'ContractDate': date });

      }
    }

    this.InsuranceActivityForm10103.patchValue({ 'Schedule': this.taxPayerDetails.AIncomeInsuranceChk == '1' ? true : false });

    this.InsuranceActivityForm10103.patchValue({ 'totInsurancePremiumsEarnedPay': this.taxPayerDetails.Sch_10103.ATotalInsurancePremium });
    this.InsuranceActivityForm10103.patchValue({ 'canclInsurancePrem': this.taxPayerDetails.Sch_10103.ACancelInsurance });
    this.InsuranceActivityForm10103.patchValue({ 'reInsPremLocEnti': this.taxPayerDetails.Sch_10103.AReinsuranceLocal });
    this.InsuranceActivityForm10103.patchValue({ 'reInsPremExtEnti': this.taxPayerDetails.Sch_10103.AReinsuranceExternal });
    this.InsuranceActivityForm10103.patchValue({ 'resCompUnearnPremEOPY': this.taxPayerDetails.Sch_10103.AUnearnedPremium });
    this.InsuranceActivityForm10103.patchValue({ 'resCompDgrExtEOPY': this.taxPayerDetails.Sch_10103.ADangersPremium });
    this.InsuranceActivityForm10103.patchValue({ 'invstInc': this.taxPayerDetails.Sch_10103.AInvestIncome });
    this.InsuranceActivityForm10103.patchValue({ 'othIncome': this.taxPayerDetails.Sch_10103.AOtherIncome2 });
    this.InsuranceActivityForm10103.patchValue({ 'netPreEarnVest': this.taxPayerDetails.Sch_10103.ANetPremium });
    this.InsuranceActivityForm10103.patchValue({ 'totResCompUnearnDgrEOPY': this.taxPayerDetails.Sch_10103.ATotalUnearnedDanger });
    this.InsuranceActivityForm10103.patchValue({ 'totIncFrmAct': this.taxPayerDetails.Sch_10103.ATotalIncome2 });

    this.SubContractorsForm10544.patchValue({ 'Schedule': this.taxPayerDetails.ASubcontractorsChk == '1' ? true : false });
    this.clearFormArray(this.subContractors10544Activities);
    for (let i = 0; i < this.taxPayerDetails.Sch_10504Set["results"].length; i++) {
      this.SubContract10544ActivitiesRow();
      this.subContractors10544Activities.controls[i].patchValue({ 'IdType': this.taxPayerDetails.Sch_10504Set["results"][i]['DropDown'] });
      this.subContractors10544Activities.controls[i].patchValue({ 'IdNumber': this.taxPayerDetails.Sch_10504Set["results"][i]['Crtinfin'] });
      this.subContractors10544Activities.controls[i].patchValue({ 'ContractorName': this.taxPayerDetails.Sch_10504Set["results"][i]['ContractorNm'] });
      this.subContractors10544Activities.controls[i].patchValue({ 'Address': this.taxPayerDetails.Sch_10504Set["results"][i]['Addr'] });
      this.subContractors10544Activities.controls[i].patchValue({ 'ValueOfWork': this.taxPayerDetails.Sch_10504Set["results"][i]['ValWrkYr'] });
      this.SubContract10544ActivitiesTotalsCalculation();

    }

  }
  Schedule10103Applicable(event) {
    if (event.target.checked) {
      this.InsuranceActivityForm10103.patchValue({ 'Schedule': true });
      jQuery("#insurancefrmcontracting").modal('show');
    }
    else {
      jQuery("#switch01").prop('checked', false);
    }
  }

  Validate10103Patterns() {
    this.InsuranceActivityForm10103.patchValue({ 'totInsurancePremiumsEarnedPay': parseFloat(((+this.InsuranceActivityForm10103.value.totInsurancePremiumsEarnedPay) || 0).toString()).toFixed(2) });
    this.InsuranceActivityForm10103.patchValue({ 'canclInsurancePrem': parseFloat(((+this.InsuranceActivityForm10103.value.canclInsurancePrem) || 0).toString()).toFixed(2) });
    this.InsuranceActivityForm10103.patchValue({ 'reInsPremLocEnti': parseFloat(((+this.InsuranceActivityForm10103.value.reInsPremLocEnti) || 0).toString()).toFixed(2) });
    this.InsuranceActivityForm10103.patchValue({ 'reInsPremExtEnti': parseFloat(((+this.InsuranceActivityForm10103.value.reInsPremExtEnti) || 0).toString()).toFixed(2) });
    this.InsuranceActivityForm10103.patchValue({ 'resCompUnearnPremEOPY': parseFloat(((+this.InsuranceActivityForm10103.value.resCompUnearnPremEOPY) || 0).toString()).toFixed(2) });
    this.InsuranceActivityForm10103.patchValue({ 'resCompDgrExtEOPY': parseFloat(((+this.InsuranceActivityForm10103.value.resCompDgrExtEOPY) || 0).toString()).toFixed(2) });
    this.InsuranceActivityForm10103.patchValue({ 'invstInc': parseFloat(((+this.InsuranceActivityForm10103.value.invstInc) || 0).toString()).toFixed(2) });
    this.InsuranceActivityForm10103.patchValue({ 'othIncome': parseFloat(((+this.InsuranceActivityForm10103.value.othIncome) || 0).toString()).toFixed(2) });
    this.CalculateInsuranceActivity10103();
  }
  CalculateInsuranceActivity10103() {
    let netPreEarnVest = ((+this.InsuranceActivityForm10103.value.totInsurancePremiumsEarnedPay) || 0) - ((+this.InsuranceActivityForm10103.value.canclInsurancePrem) || 0) - ((+this.InsuranceActivityForm10103.value.reInsPremLocEnti) || 0) - ((+this.InsuranceActivityForm10103.value.reInsPremExtEnti) || 0);
    this.InsuranceActivityForm10103.patchValue({ 'netPreEarnVest': parseFloat(netPreEarnVest.toString()).toFixed(2) });
    let totResCompUnearnDgrEOPY = ((+this.InsuranceActivityForm10103.value.resCompUnearnPremEOPY) || 0) + ((+this.InsuranceActivityForm10103.value.resCompDgrExtEOPY) || 0);
    this.InsuranceActivityForm10103.patchValue({ 'totResCompUnearnDgrEOPY': parseFloat(totResCompUnearnDgrEOPY.toString()).toFixed(2) });
    let totIncFrmAct = ((+netPreEarnVest) || 0) + ((+totResCompUnearnDgrEOPY) || 0) + ((+this.InsuranceActivityForm10103.value.invstInc) || 0) + ((+this.InsuranceActivityForm10103.value.othIncome) || 0);
    this.InsuranceActivityForm10103.patchValue({ 'totIncFrmAct': parseFloat(totIncFrmAct.toString()).toFixed(2) });
    this.taxPayerDetails.AIncomeInsurance = this.InsuranceActivityForm10103.value.totIncFrmAct;

  }
  Save101013Activites() {
    this.taxPayerDetails.AIncomeInsuranceChk = this.InsuranceActivityForm10103.value.Schedule ? "1" : "0";
    this.taxPayerDetails.Sch_10103.ATotalInsurancePremium = this.InsuranceActivityForm10103.value.totInsurancePremiumsEarnedPay;
    this.InsuranceActivityForm10103.value.canclInsurancePrem = this.taxPayerDetails.Sch_10103.ACancelInsurance;
    this.InsuranceActivityForm10103.value.reInsPremLocEnti = this.taxPayerDetails.Sch_10103.AReinsuranceLocal;
    this.InsuranceActivityForm10103.value.reInsPremExtEnti = this.taxPayerDetails.Sch_10103.AReinsuranceExternal;
    this.InsuranceActivityForm10103.value.resCompUnearnPremEOPY = this.taxPayerDetails.Sch_10103.AUnearnedPremium;
    this.InsuranceActivityForm10103.value.resCompDgrExtEOPY = this.taxPayerDetails.Sch_10103.ADangersPremium;
    this.InsuranceActivityForm10103.value.invstInc = this.taxPayerDetails.Sch_10103.AInvestIncome;
    this.InsuranceActivityForm10103.value.othIncome = this.taxPayerDetails.Sch_10103.AOtherIncome2;
    this.InsuranceActivityForm10103.value.netPreEarnVest = this.taxPayerDetails.Sch_10103.ANetPremium;
    this.InsuranceActivityForm10103.value.totResCompUnearnDgrEOPY = this.taxPayerDetails.Sch_10103.ATotalUnearnedDanger;
    this.InsuranceActivityForm10103.value.totIncFrmAct = this.taxPayerDetails.Sch_10103.ATotalIncome2;
    this.calIncomeCoverForm();
    this.taxPayerDetails.Savez = 'X';
    this.returnsService.postForm8AmendData(this.taxPayerDetails).subscribe(data => {
      console.log(data);
      this.taxPayerDetails = data["d"];
      jQuery("#insurancefrmcontracting").modal("hide");
    });
  }
  Schedule10544Applicable(event) {
    if (event.target.checked) {
      this.SubContractorsForm10544.patchValue({ 'Schedule': true });
      jQuery("#10504subcontractors").modal('show');
    }
    else {
      jQuery("#switch07").prop('checked', false);
    }
  }


  get subContractors10544Activities(): FormArray {
    return this.SubContractorsForm10544.get('subContractors10544Activities') as FormArray;
  }
  DeleteSubContract10544Activitie(pi) {
    const control = this.SubContractorsForm10544.get('subContractors10544Activities') as FormArray;
    control.removeAt(pi);
    this.SubContract10544ActivitiesTotalsCalculation();
  }
  SubContract10544ActivitiesRow() {
    let type = this.AddContract10544Activitie();
    this.subContractors10544Activities.push(type);
  }
  AddContract10544Activitie() {
    return this.fb.group({
      "IdType": [null, Validators.required],
      "IdNumber": [null, [Validators.required]],
      "ContractorName": [null, [Validators.required, Validators.max(150)]],
      "Address": [null, [Validators.required, Validators.max(150)]],
      "ValueOfWork": ["0.00", [Validators.required, Validators.min(0), Validators.max(99999999999999.99)]]
    });
  }

  IdTypeChange(event, pi) {
    if (event.target.value == '1' || event.target.value == '2') {
      this.subContractors10544Activities.controls[pi].get('IdNumber').setValidators([Validators.max(10)]);
    }
    else if (event.target.value == '3') {
      this.subContractors10544Activities.controls[pi].get('IdNumber').setValidators([Validators.max(15)]);
    }
    else {
      this.subContractors10544Activities.controls[pi].get('IdNumber').clearValidators();
    }
  }
  AddMultipleContract10544Forms() {
    for (let i = 0; i < this.NoOfAddedForms; i++) {
      this.SubContract10544ActivitiesRow();
    }
    this.NoOfAddedForms = 0;
    jQuery("#addMultipleForms10544Modal").modal('hide');
    jQuery('body').addClass('modalopen');
  }

  SubContract10544ActivitiesTotalsCalculation() {
    let amount = 0;
    for (let i = 0; i < this.subContractors10544Activities.controls.length; i++) {
      this.subContractors10544Activities.controls[i].patchValue({ 'ValueOfWork': parseFloat(this.subContractors10544Activities.controls[i].value.ValueOfWork || 0).toFixed(2) });
      amount = amount + ((+this.subContractors10544Activities.controls[i].value.ValueOfWork) || 0);
    }
    this.SubContractorsForm10544.patchValue({ 'valWorkexecDurY': parseFloat(amount.toString()).toFixed(2) });
  }

  Save10544Activites() {
    this.taxPayerDetails.ASubcontractorsChk = this.SubContractorsForm10544.value.Schedule ? "1" : "0";
    let formGuid = this.taxPayerDetails.Sch_10504Set["results"][0]['FormGuid'];
    this.taxPayerDetails.Sch_10504Set["results"] = [];
    for (let i = 0; i < this.subContractors10544Activities.controls.length; i++) {
      this.taxPayerDetails.Sch_10504Set["results"].push({});
      this.taxPayerDetails.Sch_10504Set["results"][i]['DropDown'] = this.subContractors10544Activities.controls[i]['IdType'];
      this.taxPayerDetails.Sch_10504Set["results"][i]['Crtinfin'] = this.subContractors10544Activities.controls[i]['IdNumber'];
      this.taxPayerDetails.Sch_10504Set["results"][i]['ContractorNm'] = parseFloat(this.subContractors10544Activities.controls[i]['ContractorName']).toFixed(2);
      this.taxPayerDetails.Sch_10504Set["results"][i]['Addr'] = parseFloat(this.subContractors10544Activities.controls[i]['Address'] || 0).toFixed(2);
      this.taxPayerDetails.Sch_10504Set["results"][i]['ValWrkYr'] = parseFloat(this.subContractors10544Activities.controls[i]['ValueOfWork'] || 0).toFixed(2);
      this.taxPayerDetails.Sch_10504Set["results"][i]['FormGuid'] = formGuid;

    }
    this.calCECoverForm();
    this.taxPayerDetails.Savez = 'X';
    this.returnsService.postForm8AmendData(this.taxPayerDetails).subscribe(data => {
      console.log(data);
      this.taxPayerDetails = data["d"];
      jQuery("#10504subcontractors").modal("hide");
    });
  }
  IdNumberValidation(pi) {
    this.returnsService.validateIDnumbersForm8v1(this.subContractors10544Activities.controls[pi].value.IdNumber, this.subContractors10544Activities.controls[pi].value.IdType == '1' ? '05' : '', this.loginUser).subscribe((data: any) => {
      console.log(data);
      this.subContractors10544Activities.controls[pi].patchValue({ 'Address': data["d"]["Street1"] });
      this.subContractors10544Activities.controls[pi].patchValue({ 'ContractorName': data["d"]["FullName"] });

    });
  }
  Fileupload10804(event, dotype) {
    console.log(event);
    const frmData = new FormData();
    let filename;
    filename = event.target.files[0]["name"];
    let fileSize = Math.round((event.target.files[0]["size"] / 1024));

    frmData.append("fileUpload", event.target.files[0]);
    console.log(filename, this.taxPayerDetails.ReturnId, frmData, dotype);
    this.returnsService.SaveForm8Attachments(filename, this.taxPayerDetails.CaseGuid, frmData, dotype).subscribe((data) => {
      console.log(data);

      if (dotype == 'RT8A') {
        this.files = [];
        this.files.push(data["d"]);
      }
      else if (dotype == 'RT8B') {
        this.files1 = [];
        this.files1.push(data["d"]);
      }

    });
  }
  //hema end
}
function ratioRangeValidator(control: AbstractControl): { [key: string]: boolean } | null {

  if (control.value !== undefined && ((control.value > 0 && control.value < 20) || control.value > 100)) {
    return { 'ratioRange': true };
  }
  return null;
}