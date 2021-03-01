import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import * as moment from 'moment-hijri';
import { CalendarComponent } from 'src/app/constants/calendar.component';
import { IdSet } from 'src/app/dto/establishment/id-set';
import { SignupService } from 'src/app/services/signup.service';
import { fdConstants } from './financial-details.constants';

@Component({
  selector: 'financial-details',
  templateUrl: './financial-details.component.html',
  styleUrls: ['./financial-details.component.css']
})
export class FinancialDetailsComponent implements OnInit {
  @Input() mainStepperControl: any;
  labels: any = {};
  financialDdays: any;
  financialMonths: any;
  @Input() financialDetails: FormGroup;
  commencementDate: any = new Date().getTime();;
  @Input() set commDate(commencementDate: number) {
    //console.log("commDate updated", commencementDate);
    this.commencementDate = commencementDate;
    this.onFinancialDetailsChange();
  }
  registrationObj: any = null;
  @Input() set regSet(registrationObj: any) {
    this.registrationObj = registrationObj;
  }
  headerComponent = CalendarComponent;
  direction: string = "ltr";
  @Output() onFinancialInfoChange: EventEmitter<any> = new EventEmitter<any>();


  MCI_FINANCIAL_DETAILS: any = null;
  @Input() set mciFinancialDetails(mciFinancialDetails: any) {

    this.MCI_FINANCIAL_DETAILS = !isNull(mciFinancialDetails) ? mciFinancialDetails : null;

    if (this.MCI_FINANCIAL_DETAILS) {

      this.financialDetails.patchValue({
        "calendarType": this.MCI_FINANCIAL_DETAILS.Caltp || "H",
        "endOfFinancialMonth": this.MCI_FINANCIAL_DETAILS.Fdmonth || "",
        "endOfFinancialDay": this.MCI_FINANCIAL_DETAILS.Fdday || ""

      });

      this.financialDetails.get("endOfFinancialMonth").disable();
      this.financialDetails.get("endOfFinancialMonth").clearValidators();
      this.financialDetails.get("endOfFinancialMonth").updateValueAndValidity();

      this.financialDetails.get("endOfFinancialDay").disable();
      this.financialDetails.get("endOfFinancialDay").clearValidators();
      this.financialDetails.get("endOfFinancialDay").updateValueAndValidity();

      this.onFinancialDetailsChange();

    } else {

      this.financialDetails.get("endOfFinancialDay").enable();
      this.financialDetails.get("endOfFinancialDay").setValidators(Validators.required);
      this.financialDetails.get("endOfFinancialDay").updateValueAndValidity();

      this.financialDetails.get("endOfFinancialMonth").enable();
      this.financialDetails.get("endOfFinancialMonth").setValidators(Validators.required);
      this.financialDetails.get("endOfFinancialMonth").updateValueAndValidity();

    }

  }



  constructor(private signupService: SignupService, private _formBuilder: FormBuilder) {
    this.financialDetails = this.getFinancialDetailsForm();
  }

  ngOnInit(): void {
    if (localStorage.getItem("lang") === "ar") {
      this.labels = fdConstants.langz.arb.financialDetails;
      this.direction = fdConstants.langz.arb.dir;
    } else {
      this.labels = fdConstants.langz.eng.financialDetails;
      this.direction = fdConstants.langz.eng.dir;
    }

    this.financialDdays = this.labels.days;
    this.financialMonths = this.labels.months;

    this.onFinancialDetailsChange();
  }

  getFinancialDetailsForm() {
    let financialDetails = this._formBuilder.group({
      accounting: ['A'],
      calendarType: ['H'],
      hijriSelected: [true],
      gregorianSelected: [true],
      tinNumber: [null],
      tanNumber: [null],
      capitalRegistrationDate: [null],
      capitalAmount: [null],
      endOfFinancialDay: [null, Validators.required],
      endOfFinancialMonth: [null, Validators.required],
      commencementDate: [{ value: '', disabled: true }],
      taxableDate: [{ value: '', disabled: true }],
      taxableDateTime: ['']
    });
    return financialDetails;
  }

  hideDay(day) {
    let month = +this.financialDetails.getRawValue().endOfFinancialMonth || 1;
    let Months_31 = [1, 3, 5, 7, 8, 10, 12];
    if (Months_31.indexOf(month) != -1) {
      return false;
    } else if (month == 2 && +day > 28 && day != 'LD') {
      return true;
    } else if (day && +day > 29 && day != 'LD') {
      return true;
    }
  }

  onFinancialCalendarChange(calendarType) {
    this.financialDetails.get('calendarType').setValue(calendarType);
    this.onFinancialDetailsChange();
  }

  onFinancialDetailsChange(source = '') {

    const financialDetailsForm = <FormGroup>this.financialDetails;
    let updatedFDDetails = financialDetailsForm.getRawValue();

    let accMethod = updatedFDDetails.accounting;
    let calendarType = updatedFDDetails.calendarType;

    if (accMethod == 'A') {

      if (!this.MCI_FINANCIAL_DETAILS) {
        financialDetailsForm.get('endOfFinancialDay').enable();
        financialDetailsForm.get('endOfFinancialMonth').enable();
      }

      if (source == 'month') {
        financialDetailsForm.get('endOfFinancialDay').reset();
        financialDetailsForm.get('taxableDate').reset();
      }
      //console.log("onFinancialDetailsChange", financialDetailsForm.value, financialDetailsForm.getRawValue());
      if (financialDetailsForm.getRawValue().endOfFinancialDay && financialDetailsForm.getRawValue().endOfFinancialMonth) {
        let tbDateReqObj = {
          ACaltype: calendarType,
          // ADateComm: "/Date(" + new Date(this.getCommencementDate()).getTime() + ")/", // "/Date(1606265085000)/",
          ADateComm: "/Date(" + this.commencementDate + ")/",
          AMonth: financialDetailsForm.getRawValue().endOfFinancialMonth,
          EIslmedate: (financialDetailsForm.getRawValue().endOfFinancialDay == "LD") ? "32" : financialDetailsForm.getRawValue().endOfFinancialDay
        };
        this.updateTaxableDate(tbDateReqObj);
      }

    } else if (accMethod == 'E') {

      financialDetailsForm.get('endOfFinancialDay').disable();
      financialDetailsForm.get('endOfFinancialMonth').disable();
      let tbDateReqObj = {
        ACaltype: calendarType,
        // ADateComm: "/Date(" + new Date(this.getCommencementDate()).getTime() + ")/", // "/Date(1606265085000)/",
        ADateComm: "/Date(" + this.commencementDate + ")/",
        AMonth: "",
        EIslmedate: ""
      };
      this.updateTaxableDate(tbDateReqObj);
    }

    moment.locale('en-US');
    let commncDate = "";
    if (calendarType == 'H') {
      commncDate = moment(new Date(this.commencementDate)).format('iDD/iMM/iYYYY');
    } else {
      commncDate = moment(new Date(this.commencementDate)).format('DD/MM/YYYY');
    }


    this.financialDetails.patchValue({
      "commencementDate": commncDate
    });
  }
  updateTaxableDate(tbDateReqObj) {
    const financialDetailsForm = <FormGroup>this.financialDetails;
    let accMethod = financialDetailsForm.getRawValue().accounting;


    this.signupService.getFiscalDate(tbDateReqObj).subscribe((response: any) => {

      //console.log(response);

      if (accMethod == 'A') {
        //EIsldate
        let year = response["d"].EIsldate.substr(0, 4);
        let month = response["d"].EIsldate.substr(4, 2);
        let date = response["d"].EIsldate.substr(6, 2);
        let taxableDate = date + "/" + month + "/" + year;
        let jsDate = year + "-" + month + "-" + date;

        moment.locale('en-US');
        if (tbDateReqObj.ACaltype == 'H') {
          taxableDate = moment(new Date(jsDate)).format('iDD/iMM/iYYYY');
        } else {
          taxableDate = moment(new Date(jsDate)).format('DD/MM/YYYY');
        }


        this.financialDetails.patchValue({
          //endOfFinancialDay: (response["d"].EIslmedate == "32" || response["d"].EIslmedate == "31") ? "LD" : response["d"].EIslmedate,
          //endOfFinancialMonth: response["d"].AMonth,
          taxableDate: taxableDate,
          taxableDateTime: new Date(jsDate).getTime()
        });
        this.saveFinancialDetails();
      } else if (accMethod == 'E') {

        if (!tbDateReqObj.AMonth) {

          let year = response["d"].ACommDate.substr(0, 4);
          let month = response["d"].ACommDate.substr(4, 2);
          let imnth = Number(month);
          let date = response["d"].ACommDate.substr(6, 2);
          let iddate = Number(date);
          // ((imnth - 1) < 10) ? "0" + (imnth - 1) : (imnth - 1).toString()
          tbDateReqObj.AMonth = (imnth == 1) ? "12" : month;
          tbDateReqObj.EIslmedate = (iddate == 1) ? "32" : date;
          this.updateTaxableDate(tbDateReqObj);

        } else {
          let year = response["d"].EIsldate.substr(0, 4);
          let month = response["d"].EIsldate.substr(4, 2);
          let imnth = Number(month);
          let date = response["d"].EIsldate.substr(6, 2);
          let taxableDate = date + "/" + month + "/" + year;
          let jsDate = year + "-" + month + "-" + date;
          let fdDay = "";
          moment.locale('en-US');
          if (tbDateReqObj.ACaltype == 'H') {
            taxableDate = moment(new Date(jsDate)).format('iDD/iMM/iYYYY');
            let tmpdate = taxableDate.split("/")[0];
            fdDay = Number(tmpdate) >= 29 ? "LD" : tmpdate;
          } else {
            taxableDate = moment(new Date(jsDate)).format('DD/MM/YYYY');
            if (imnth == 2) {
              // fdDay = Number(response["d"].EIslmedate) >= 29 ? "LD" : response["d"].EIslmedate;
              fdDay = Number(date) >= 29 ? "LD" : date;

            } else {
              // fdDay = (response["d"].EIslmedate == "32" || response["d"].EIslmedate == "31") ? "LD" : response["d"].EIslmedate;
              fdDay = Number(date) > 30 ? "LD" : date;
            }
          }

          financialDetailsForm.patchValue({
            endOfFinancialDay: fdDay,
            endOfFinancialMonth: response["d"].AMonth,
            taxableDate: taxableDate,
            taxableDateTime: new Date(jsDate).getTime()
          });
          this.saveFinancialDetails();
        }
      }
    });
  }

  submit() {
    //console.log("FD submit");
    this.validateAllFormFields(this.financialDetails);
    this.onFinancialInfoChange.emit(this.financialDetails.getRawValue());
  }

  validateAllFormFields(formGroup: FormGroup) {         //{1}
    Object.keys(formGroup.controls).forEach(field => {  //{2}
      const control = formGroup.get(field);             //{3}
      if (control instanceof FormControl) {             //{4}
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {        //{5}
        this.validateAllFormFields(control);            //{6}
      }
    });
  }
  markAllControlsAsPristine(formGroup: FormGroup) {         //{1}
    Object.keys(formGroup.controls).forEach(field => {  //{2}
      const control = formGroup.get(field);             //{3}
      if (control instanceof FormControl) {             //{4}
        control.markAsPristine();
        control.markAsUntouched();
        //control.updateValueAndValidity();        
      } else if (control instanceof FormGroup) {        //{5}
        this.markAllControlsAsPristine(control);            //{6}
      }
    });
  }
  saveFinancialDetails() {
    //console.log("saveFinancialDetails");
    let saveFDObj = this.financialDetails.getRawValue();

    this.registrationObj.Operationx = "05";
    this.registrationObj.StepNumberx = "04";

    this.registrationObj["Accmethod"] = saveFDObj.accounting;
    this.registrationObj["Caltp"] = saveFDObj.calendarType;
    this.registrationObj["Fdcalender"] = saveFDObj.calendarType == "H" ? "2" : "1";
    this.registrationObj["Fdenddt"] = "\/Date(" + saveFDObj.taxableDateTime + ")\/";
    this.registrationObj["Fdday"] = saveFDObj.endOfFinancialDay || "";
    this.registrationObj["Fdmonth"] = saveFDObj.endOfFinancialMonth || "";
    this.registrationObj['Capamt'] = "0.000"; //(saveFDObj.capitalAmount) ? parseFloat(saveFDObj.capitalAmount).toFixed(2).toString() : "0.00";
    this.registrationObj['Capregdt'] = null;

    this.registrationObj.Nreg_OutletSet = [];
    this.registrationObj.Nreg_ActivitySet = [];
    this.registrationObj.Nreg_ShareholderSet = [];
    this.registrationObj.Nreg_AddressSet = [];
    this.registrationObj.Nreg_CpersonSet = [];
    this.registrationObj.Nreg_ContactSet = [];
    this.registrationObj.Nreg_IdSet = [];

    this.registrationObj["Nreg_BtnSet"] = [];
    this.registrationObj["off_notesSet"] = [];
    this.registrationObj["AttDetSet"] = []; // this.removeResults(this.requestObj1["AttDetSet"]);
    this.registrationObj["Nreg_MSGSet"] = [];
    this.registrationObj["Nreg_FormEdit"] = {};
    delete this.registrationObj["__metadata"];

    if (saveFDObj.tinNumber) this.registrationObj["Nreg_IdSet"].push(this.mapTinTan("ZS0010", saveFDObj.tinNumber));
    if (saveFDObj.tanNumber) this.registrationObj["Nreg_IdSet"].push(this.mapTinTan("ZS0011", saveFDObj.tanNumber));

    this.signupService.postNewRegSet(this.registrationObj).subscribe((response: any) => {
      this.registrationObj = response["d"];
      this.onFinancialInfoChange.emit(saveFDObj);
    }, (err) => {
      this.onFinancialInfoChange.emit(saveFDObj);
    });
  }

  mapTinTan(type, val) {
    var obj = new IdSet();
    obj.Type = type;
    obj.Idnumber = val;
    obj.Srcidentify = "C000"; // Derive dynamically based on Outlet length
    return obj;
  }

}

export function isNull(value) {
  return value !== null && typeof value === 'object' && !Object.getPrototypeOf(value);
}
