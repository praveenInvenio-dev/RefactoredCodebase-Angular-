import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { WarehouseService } from '../warehouse.service';
import { requestreactivationconstants } from "src/app/main/excise-services/warehouse/request-reactivation-warehouse/requestreactivationconstants.model";

declare var $;
@Component({
  selector: 'app-request-reactivation-warehouse',
  templateUrl: './request-reactivation-warehouse.component.html',
  styleUrls: ['./request-reactivation-warehouse.component.css']
})
export class RequestReactivationWarehouseComponent implements OnInit, AfterViewInit {

  @ViewChild('instructions', { static: false }) instructions: ElementRef;

  InstructionFormGroup: FormGroup = new FormGroup({});
  WarehouseDetailsFormGroup: FormGroup = new FormGroup({});
  RevocationDetailsFormGroup: FormGroup = new FormGroup({});

  GPartz: any;
  Direction: string;
  Language: string;
  Step: any = 1;
  CurrentDate = new Date();
  RevokeUIButtonSetDetails: any;
  RevokeWarehouseDetails: any;
  WarehouseInfoDetails: any;
  WarehouseList: any;
  UsagePurpose: any;
  Type1: boolean = false;
  Type2: boolean = false;
  Type3: boolean = false;
  Type4: boolean = false;
  Good1: string;
  Good2: string;
  Good3: string;
  Good4: string;
  RevokeType1: boolean = false;
  RevokeType2: boolean = false;
  RevokeType3: boolean = false;
  RevokeType4: boolean = false;
  RevokeValue1: string;
  RevokeValue2: string;
  RevokeValue3: string;
  RevokeValue4: string;
  RevokeName1: string;
  RevokeName2: string;
  RevokeName3: string;
  RevokeName4: string;
  RevocationReasonValue: any;
  lang:any;
  direction: string;
  WarehouseListErrorMsg: any;

  WarehouseInfoData = new WarehouseInfoModel();
  RevocationData = new RevocationModel();

  constructor(
    private router: Router,
    private warehouseService: WarehouseService
  ) {
    this.GPartz = localStorage.getItem('gpart');

    if (localStorage.getItem("lang") === "ar") {
      this.lang = requestreactivationconstants.langz.arb.requestreactivation;
      this.direction = requestreactivationconstants.langz.arb.dir;
      this.Direction = "rtl";
      this.Language = "A";
      this.Good1 = requestreactivationconstants.langz.arb.requestreactivation.step1.good1;
      this.Good2 = requestreactivationconstants.langz.arb.requestreactivation.step1.good2;
      this.Good3 = requestreactivationconstants.langz.arb.requestreactivation.step1.good3;
      this.Good4 = requestreactivationconstants.langz.arb.requestreactivation.step1.good4;
      this.RevokeName1 = requestreactivationconstants.langz.arb.requestreactivation.step4.revokeName1;
      this.RevokeName2 = requestreactivationconstants.langz.arb.requestreactivation.step4.revokeName2;
      this.RevokeName3 = requestreactivationconstants.langz.arb.requestreactivation.step4.revokeName3;
      this.RevokeName4 = requestreactivationconstants.langz.arb.requestreactivation.step4.revokeName4;
    } else {
      this.lang = requestreactivationconstants.langz.eng.requestreactivation;
      this.direction = requestreactivationconstants.langz.eng.dir;
      this.Direction = "ltl";
      this.Language = "E";
      this.Good1 = requestreactivationconstants.langz.eng.requestreactivation.step1.good1;
      this.Good2 = requestreactivationconstants.langz.eng.requestreactivation.step1.good2;
      this.Good3 = requestreactivationconstants.langz.eng.requestreactivation.step1.good3;
      this.Good4 = requestreactivationconstants.langz.eng.requestreactivation.step1.good4;
      this.RevokeName1 = requestreactivationconstants.langz.eng.requestreactivation.step4.revokeName1;
      this.RevokeName2 = requestreactivationconstants.langz.eng.requestreactivation.step4.revokeName2;
      this.RevokeName3 = requestreactivationconstants.langz.eng.requestreactivation.step4.revokeName3;
      this.RevokeName4 = requestreactivationconstants.langz.eng.requestreactivation.step4.revokeName4;
    }
  }

  ngOnInit() {
    this.getWarehouseDetails();
    this.stepsChecking();
  }

  stepsChecking() {
    switch (this.Step) {
      case 1:
        this.instructionFormControls();
        this.warehouseDetails();
        break;
      case 2:
        
        break;
      case 3:
        this.revocationDetailsInfo();
        break;
      case 4:
        
        break;
      case 5:
        
        break;
      default:
        break;
    }

    return this.Step;
  }
  
  getWarehouseDetails() {
    this.warehouseService.revocationUISet(this.GPartz, this.Language).subscribe(data => {
      if (data) {
        console.log('ui', data["d"]);
        this.RevokeUIButtonSetDetails = data["d"];
      }
    }, (error) => {
      console.log('err', error);
    });

    this.warehouseService.revocationView(this.GPartz, this.Language).subscribe(data => {
      if (data) {
        console.log('rsv', data["d"]);
        this.RevokeWarehouseDetails = data["d"];
        this.WarehouseList = data["d"].WHLISTSet.results;
      }
    }, (error) => {
      console.log('err', error);
    });
  }

  /* Step 1 Screen Info Starts */
  instructionFormControls() {
    this.ngAfterViewInit();
    this.InstructionFormGroup.addControl('agree', new FormControl(false, [Validators.required]));
    $('#instructions').modal('show');
  }

  termsAndConditionsOfInstructionAcceptance() {
    $('#instructions').modal('hide');
  }

  warehouseDetails() {
    this.WarehouseDetailsFormGroup = new FormGroup({
      licenseRevoked: new FormControl('', [Validators.required]),
      suspensionReason: new FormControl('')
    });
  }

  warehouseInfoModelData() {
    const InstructionFormValues = this.InstructionFormGroup.value;
    const WarehouseInfoFormValues = this.WarehouseDetailsFormGroup.value;
    let Terms = this.agreeBooleanValueCheck(InstructionFormValues.agree);
    this.WarehouseInfoData.Agreeflg = Terms;
    this.WarehouseInfoData.LeasedRevoke = WarehouseInfoFormValues.licenseRevoked;
    this.WarehouseInfoData.SuspensionReason = WarehouseInfoFormValues.suspensionReason !== undefined ? WarehouseInfoFormValues.suspensionReason : this.WarehouseInfoData.SuspensionReason;
    return this.WarehouseInfoData;
  }

  continueFirstScreen() {
    this.warehouseInfoModelData();
    this.step2();
  }
  /* Step 1 Screen Info End */

  /* Step 2 Screen Info Starts */
  continueSecondScreen() {
    this.step3();
  }
  /* Step 2 Screen Info End */

  /* Step 3 Screen Info Starts */
  revocationDetailsInfo() {
    if(this.RevocationData && this.RevocationData.Reason !== undefined || this.RevocationData.EffectiveDate !== undefined) {
      let SetEffectiveDate = new Date(this.RevocationData.EffectiveDate);
      this.RevocationDetailsFormGroup.controls['reasons'].setValue(this.RevocationData.Reason);
      this.RevocationDetailsFormGroup.controls['effectiveDate'].setValue(SetEffectiveDate);
    }
    else {
      this.RevocationDetailsFormGroup = new FormGroup({
        reasons: new FormControl(''),
        effectiveDate: new FormControl(this.CurrentDate, [Validators.required]),
      });
    }
  }

  revocationModelData() {
    const RevocationFormValues = this.RevocationDetailsFormGroup.value;
    let effectiveDate;
    if(RevocationFormValues.effectiveDate.calendarStart !== undefined) {
      let day = RevocationFormValues.effectiveDate.calendarStart.day;
      let month = RevocationFormValues.effectiveDate.calendarStart.month;
      let year = RevocationFormValues.effectiveDate.calendarStart.year;
      day = day < 10 ? `0${day}` : day;
      month = month < 10 ? `0${month}` : month;
      effectiveDate = `${year}-${month}-${day}T00:00:00`;
    }
    else {
      effectiveDate = RevocationFormValues.effectiveDate.toISOString().slice(0, 19);
    }
    if(RevocationFormValues.reasons.length == 0) {
      this.RevocationData.Reason = RevocationFormValues.reasons !== undefined && RevocationFormValues.reasons !== null && RevocationFormValues.reasons !== "" ? RevocationFormValues.reasons.split('\n') : '';
    }
    else {
      this.RevocationData.Reason = RevocationFormValues.reasons;
    }
    this.RevocationData.EffectiveDate = effectiveDate;
    this.RevocationData.DisplayEffectiveDate = new Date(effectiveDate);
    return this.RevocationData;
  }

  continueThirdScreen() {
    this.revocationModelData();
    this.step4();
  }
  /* Step 3 Screen Info End */

  /* Step 4 Screen Info Starts */
  summaryDetailsInfo() {
    let addressSetObj;
    if(this.WarehouseInfoDetails && this.WarehouseInfoDetails.addressSet !== undefined) {
      addressSetObj = {
        BuildingNo: this.WarehouseInfoDetails.addressSet.results[0].BuildingNo,
        City: this.WarehouseInfoDetails.addressSet.results[0].City,
        Quarter: this.WarehouseInfoDetails.addressSet.results[0].Quarter,
        Street: this.WarehouseInfoDetails.addressSet.results[0].Street,
        PostalCd: this.WarehouseInfoDetails.addressSet.results[0].PostalCd
      }
    }
    else {
      addressSetObj = {}
    }
    this.RevocationReasonValue = this.revocReasonTextareaResult();
    this.RevokeWarehouseDetails.Operationz = "01";
    this.RevokeWarehouseDetails.TcFg = this.WarehouseInfoData.Agreeflg;
    this.RevokeWarehouseDetails.NonfileFg = this.WarehouseInfoDetails !== undefined ? this.WarehouseInfoDetails.NonfileFg : '0';
    this.RevokeWarehouseDetails.NonpayFg = this.WarehouseInfoDetails !== undefined ? this.WarehouseInfoDetails.NonpayFg : '0';
    this.RevokeWarehouseDetails.NoobligFg = this.WarehouseInfoDetails !== undefined ? this.WarehouseInfoDetails.NoobligFg : '0';
    this.RevokeWarehouseDetails.SuspOthers = this.WarehouseInfoDetails !== undefined ? this.WarehouseInfoDetails.SuspOthers : '0';
    this.RevokeWarehouseDetails.Whno = this.WarehouseInfoDetails !== undefined ? this.WarehouseInfoDetails.Whno : '';
    this.RevokeWarehouseDetails.EffSuspDt = this.WarehouseInfoDetails !== undefined ? this.WarehouseInfoDetails.EffSuspDt : null;
    this.RevokeWarehouseDetails.StartDt = this.WarehouseInfoDetails !== undefined ? this.WarehouseInfoDetails.StartDt : null;
    this.RevokeWarehouseDetails.EndDt = this.WarehouseInfoDetails !== undefined ? this.WarehouseInfoDetails.EndDt : null;
    this.RevokeWarehouseDetails.addressSet = [];
    this.RevokeWarehouseDetails.addressSet.push(addressSetObj);
    // this.RevokeWarehouseDetails.addressSet.results[0].BuildingNo = this.WarehouseInfoDetails.addressSet.results[0].BuildingNo;
    // this.RevokeWarehouseDetails.addressSet.results[0].City = this.WarehouseInfoDetails.addressSet.results[0].City;
    // this.RevokeWarehouseDetails.addressSet.results[0].Quarter = this.WarehouseInfoDetails.addressSet.results[0].Quarter;
    // this.RevokeWarehouseDetails.addressSet.results[0].Street = this.WarehouseInfoDetails.addressSet.results[0].Street;
    // this.RevokeWarehouseDetails.addressSet.results[0].PostalCd = this.WarehouseInfoDetails.addressSet.results[0].PostalCd;
    this.RevokeWarehouseDetails.RetfileFg = this.RevokeValue1;
    this.RevokeWarehouseDetails.EtpayFg = this.RevokeValue2;
    this.RevokeWarehouseDetails.ObligFg = this.RevokeValue3;
    this.RevokeWarehouseDetails.Others = this.RevokeValue4;
    this.RevokeWarehouseDetails.NOTESSet = this.RevocationReasonValue !== {} ? this.RevocationReasonValue : [];
    this.RevokeWarehouseDetails.EffRevokeDt = this.RevocationData.EffectiveDate;
    delete this.RevokeWarehouseDetails.__metadata;
  }

  continueFourthScreen() {
    this.summaryDetailsInfo();
    console.log('save', this.RevokeWarehouseDetails);
    this.warehouseService.saveRevocationDataSet(this.RevokeWarehouseDetails).subscribe(data => {
      if(data) {
        console.log('final-submit', data["d"]);
        this.step5();
      }
    });
  }
  /* Step 4 Screen Info End */

  /* Step 5 Screen Info Starts */
  
  /* Step 5 Screen Info End */

  wareHouseChange(value) {
    for (let i = 0; i < this.WarehouseList.length; i++) {
      if (value == this.WarehouseList[i].Whno) {
        this.UsagePurpose = this.WarehouseList[i].Whfnm;
      }
    }

    this.warehouseService.revocationListSet(value).subscribe(data => {
      if (data) {
        console.log('rsv-who', data["d"]);
        this.WarehouseInfoDetails = data["d"];
        this.onWarehouseSuspension(this.WarehouseInfoDetails);
        this.WarehouseInfoDetails.EffSuspDt = this.WarehouseInfoDetails.EffSuspDt !== undefined && this.WarehouseInfoDetails.EffSuspDt !== null && this.WarehouseInfoDetails.EffSuspDt !== "InvalidDate" ? new Date(+this.WarehouseInfoDetails.EffSuspDt.substr(6, 13)).toISOString().slice(0, 19) : this.CurrentDate.toISOString().slice(0, 19);
        this.WarehouseInfoDetails.StartDt = this.WarehouseInfoDetails.StartDt !== undefined && this.WarehouseInfoDetails.StartDt !== null && this.WarehouseInfoDetails.StartDt !== "InvalidDate" ? new Date(+this.WarehouseInfoDetails.StartDt.substr(6, 13)).toISOString().slice(0, 19) : this.CurrentDate.toISOString().slice(0, 19);
        this.WarehouseInfoDetails.EndDt = this.WarehouseInfoDetails.EndDt !== undefined && this.WarehouseInfoDetails.EndDt !== null && this.WarehouseInfoDetails.EndDt !== "InvalidDate" ? new Date(+this.WarehouseInfoDetails.EndDt.substr(6, 13)).toISOString().slice(0, 19) : this.CurrentDate.toISOString().slice(0, 19);
        this.WarehouseInfoDetails.NonfileFg = this.WarehouseInfoDetails.NonfileFg !== undefined ? this.WarehouseInfoDetails.NonfileFg : '';
        if(this.WarehouseInfoDetails.SuspOthers == '1') {
          this.suspensionReasonTextareaResult();
        }
      }
    }, (error) => {
      console.log('err', error);
      this.WarehouseListErrorMsg = error.error.error.innererror.errordetails[0].message;
      this.WarehouseDetailsFormGroup.controls["licenseRevoked"].setErrors({ 'invalid': true });
    });
  }

  onRevokeSuspension(value) {
    if(value == 'ETRF') {
      this.RevokeType1 = true;
      this.RevokeValue1 = '1';
    }
    if(value == 'PETLP') {
      this.RevokeType2 = true;
      this.RevokeValue2 = '1';
    }
    if(value == 'AOM') {
      this.RevokeType3 = true;
      this.RevokeValue3 = '1';
    }
    if(value == 'Others') {
      this.RevokeType4 = true;
      this.RevokeValue4 = '1';
      this.RevocationDetailsFormGroup.controls['reasons'].setValidators([Validators.required]);
      this.RevocationDetailsFormGroup.controls['reasons'].updateValueAndValidity();
    }
  }

  onWarehouseSuspension(value) {
    if(value.NonfileFg) {
      this.Type1 = value.NonfileFg == '1' ? true : false;
    }
    if(value.NonpayFg) {
      this.Type2 = value.NonpayFg == '1' ? true : false;
    }
    if(value.NoobligFg) {
      this.Type3 = value.NoobligFg == '1' ? true : false;
    }
    if(value.SuspOthers) {
      this.Type4 = value.SuspOthers == '1' ? true : false;
    }
  }

  revocReasonTextareaResult() {
    if(this.RevokeWarehouseDetails.NOTESSet.results.length > 0) {
      this.RevokeWarehouseDetails.NOTESSet.results.forEach((element, index) => {
        if(element.Rcodez == "ETWR_RVOK") {
          this.RevokeWarehouseDetails.NOTESSet.results.splice(index, 1);
        }
      });
    }
    if(this.RevocationData.Reason.length > 0) {
      for(let n=0; n<this.RevocationData.Reason.length; n++) {
        const reasonObject = {
          AttByz: "TP",
          ByGpartz: this.GPartz,
          ByPusrz: "",
          DataVersionz: "",
          ElemNo: 0,
          Erfdtz: this.CurrentDate.toISOString().slice(0, 19),
          Erftmz: "PT11H14M08S",
          Erfusrz: this.GPartz,
          Lineno: 0,
          Namez: "",
          Noteno: "",
          Notenoz: `00${n}`,
          Rcodez: "ETWR_RVOK",
          Refnamez: "",
          Sect: "",
          Strdt: "",
          Strline: this.RevocationData.Reason[n],
          Strtime: "",
          Tdformat: "",
          Tdline: "",
          XInvoicez: "",
          XObsoletez: ""
        }
        this.RevokeWarehouseDetails.NOTESSet.results.push(reasonObject);
      }
      return this.RevokeWarehouseDetails.NOTESSet.results;
    }
  }

  suspensionReasonTextareaResult() {
    let SuspensionReasonData;
    let SuspensionList = [];
    if(this.WarehouseInfoDetails.NOTESSet.results.length > 0) {
      for(let n=0; n<this.WarehouseInfoDetails.NOTESSet.results.length; n++) {
        if(this.WarehouseInfoDetails.NOTESSet.results[n].Rcodez == "SUSP_NOTES") {
          SuspensionList.push(this.WarehouseInfoDetails.NOTESSet.results[n].Strline);
        }
      }
      SuspensionReasonData = SuspensionList.length > 0 ? SuspensionList.join("\n") : '';
      this.WarehouseDetailsFormGroup.controls['suspensionReason'].setValue(SuspensionReasonData);
      this.WarehouseDetailsFormGroup.controls['suspensionReason'].disable({ onlySelf: true });
    }
    else {
      this.WarehouseDetailsFormGroup.controls['suspensionReason'].setValue('');
      this.WarehouseDetailsFormGroup.controls['suspensionReason'].disable({ onlySelf: true });
    }
  }

  agreeBooleanValueCheck(value) {
    let agree;
    if(value == true) {
      agree = "1";
    }
    else {
      agree = "0";
    }
    return agree;
  }

  agreeStringValueCheck(value) {
    let agree;
    if(value == "1") {
      agree = true;
    }
    else {
      agree = false;
    }
    return agree;
  }

  ngAfterViewInit() {
    if(this.Step == 1) {
      setTimeout(() => {
        this.instructions.nativeElement.click();
      }, 1000)
    }
  }

  redirectToBack() {
    this.router.navigate(['/mains/tax']);
  }
  
  back1() {
    this.Step = 1;
  }

  back2() {
    this.Step = 2;
  }

  back3() {
    this.Step = 3;
  }

  back4() {
    this.Step = 4;
  }

  step2() {
    this.Step = 2;
    this.stepsChecking();
  }

  step3() {
    this.Step = 3;
    this.stepsChecking();
  }

  step4() {
    this.Step = 4;
    this.stepsChecking();
  }

  step5() {
    this.Step = 5;
    this.stepsChecking();
  }

}

export class WarehouseInfoModel {
  Agreeflg: boolean;
  LeasedRevoke: string;
  SuspensionReason: any;
}

export class RevocationModel {
  Reason: any;
  EffectiveDate: string;
  DisplayEffectiveDate: any;
}
