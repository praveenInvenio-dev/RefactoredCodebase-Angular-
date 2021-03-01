import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import * as moment from 'moment';
import { ExciseTaxServicesService } from '../excise-tax-services.service';
import { excisetaxconstants } from "src/app/main/excise-tax-services/excise-tax-deregistration/excise-taxconstants.model";
import { NotifierService } from 'angular-notifier';
import { CalendarComponent } from "src/app/constants/calendar.component";
import { CommonValidation } from 'src/app/constants/commonValidations';
import { AppService } from 'src/app/app.service';

declare var $;
@Component({
  selector: 'app-excise-tax-deregistration',
  templateUrl: './excise-tax-deregistration.component.html',
  styleUrls: ['./excise-tax-deregistration.component.css']
})
export class ExciseTaxDeregistrationComponent implements OnInit {

  @ViewChild('instructions', { static: false }) instructions: ElementRef;

  InstructionFormGroup: FormGroup = new FormGroup({});
  TaxpayerFormGroup: FormGroup = new FormGroup({});
  ReasonFormGroup: FormGroup = new FormGroup({});
  DeclarationFormGroup: FormGroup = new FormGroup({});
  IdTypeOwnerShipFormgroup: FormGroup;
  headerComponent = CalendarComponent;

  enddate: any;
  id1: string;
  GPartz: any;
  Direction: string;
  Step: any = 1;
  Language: string;
  TaxPayerDetails: any;
  ReasonList: any;
  WarehouseList: any;
  Others: boolean = false;
  CurrentDate: any = new Date();
  IdTypeList: any;
  IdTypeName: any;
  IdType: any;
  ReasonName: any;
  ReasonValue: any;
  ReferenceNo: any;
  lang: any;
  direction: string;
  errorMessage: any;
  dob1: any;
  isdescrptnleng: boolean = false;
  isNationalValidNumber: boolean = false;
  isIqamaValidNumber: boolean = false;
  isNationalEnterValidNumber: boolean = false;
  isIqamaEnterValidNumber: boolean = false;

  StringPattern = "^[a-zA-Z\u0600-\u06FF ][sa-zA-Z\u0600-\u06FF ]*$";//"[a-zA-Z \s]*$";
  NumberPattern = "^[0-9]*$";
  ContactNoPattern = "[5][0-9]{8}";
  NationalIdPattern = "[1][0-9]{10}";
  IqamaPattern = "[2][0-9]{10}";
  TaxpayerData = new TaxpayerDetailsModel();
  ReasonData = new ReasonDetailsModel();
  DeclarationData = new DeclarationDetailsModel();
  AcknowledgementData = new AcknowledgementModel();
  approvalflag: boolean = false;
  agree: any = false;
  Dob: string = "";
  constructor(private router: Router,
    private exciseTaxService: ExciseTaxServicesService,
    public commonValidation: CommonValidation,
    public notifierService: NotifierService,
    public appSrv: AppService) {
    this.GPartz = localStorage.getItem('gpart');
    // if (localStorage.getItem("lang") === "ar") {
    //   this.Direction = "rtl";
    //   this.Language = "A";
    // } else {
    //   this.Direction = "ltr";
    //   this.Language = "E";
    // }

    if (localStorage.getItem("lang") === "ar") {
      this.lang = excisetaxconstants.langz.arb.excisetax;
      this.direction = excisetaxconstants.langz.arb.dir;
      this.Direction = "rtl";
      this.Language = "A";
    } else {
      this.lang = excisetaxconstants.langz.eng.excisetax;
      this.direction = excisetaxconstants.langz.eng.dir;
      this.Direction = "ltl";
      this.Language = "E";
    }
  }

  ngOnInit() {
    this.appSrv.data1.subscribe((res) => {
      this.enddate = this.commonValidation.dateFormate(
        this.commonValidation.toJulianDate(new Date()),
        res
      );
    });
    this.DeclarationFormGroup = new FormGroup({
      contactName: new FormControl('', [Validators.required, Validators.pattern(this.StringPattern), Validators.maxLength(40)]),
      designation: new FormControl('', [Validators.required, Validators.pattern(this.StringPattern), Validators.maxLength(40)]),
      idType: new FormControl('', [Validators.required]),
      idNumber: new FormControl('', [Validators.required, Validators.pattern(this.NumberPattern), Validators.minLength(7), Validators.maxLength(15)]),
      date: new FormControl(this.CurrentDate),
      agree: new FormControl(false, [Validators.required])
    });
    this.getDeclarationDetails();
    this.stepsChecking();
    this.IdTypeOwnerShipFormgroup = new FormGroup({
      Idnumber: new FormControl('', [Validators.required, Validators.pattern(this.NumberPattern), Validators.maxLength(10)]),
      Dob: new FormControl(undefined, [Validators.required]),
    });
    this.ReasonFormGroup = new FormGroup({
      reason: new FormControl('', [Validators.required])
    });
  }
  back6() {
    this.Step = 3;
  }
  stepsChecking() {
    switch (this.Step) {
      case 1:
        this.instructionControls();
        this.taxPayerControls();
        this.getDeregisterDetails();
        break;
      case 2:
        this.reasonControls();
        break;
      case 3:
        this.declarationControls();
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


  getDeclarationDetails() {
    if (this.Language == 'A') {
      this.IdTypeList = {
        "idTyp": [
          {
            "Key": "",
            "Text": ""
          },
          {
            "Key": "ZS0001",
            "Text": "هوية وطنية"
          },
          {
            "Key": "ZS0002",
            "Text": "هوية مقيم"
          },
          {
            "Key": "ZS0003",
            "Text": "هوية خليجية"
          }
        ]
      }
    }
    else {
      this.IdTypeList = {
        "idTyp": [
          {
            "Key": "",
            "Text": ""
          },
          {
            "Key": "ZS0001",
            "Text": "National ID"
          },
          {
            "Key": "ZS0002",
            "Text": "Iqama ID"
          },
          {
            "Key": "ZS0003",
            "Text": "GCC ID"
          }
        ]
      }
    }
    this.IdTypeList = this.IdTypeList.idTyp;
  }

  /* Step - 1 Info Starts */
  instructionControls() {
    // this.ngAfterViewInit();
    this.InstructionFormGroup.addControl('agree', new FormControl(false, [Validators.required]));
    $('#instructions').modal('show');
  }

  termsAndConditionsOfInstructionAcceptance() {
    $('#instructions').modal('hide');
  }

  taxPayerControls() {
    this.TaxpayerFormGroup = new FormGroup({
      tinNumber: new FormControl(''),
      fullName: new FormControl(''),
      finNumber: new FormControl(''),
      legalName: new FormControl('')
    });
  }

  editStep1() {
    this.TaxpayerFormGroup.controls['tinNumber'].setValue(this.TaxPayerDetails.Gpart);
    this.TaxpayerFormGroup.controls['fullName'].setValue(this.TaxPayerDetails.TinNm);
    this.TaxpayerFormGroup.controls['finNumber'].setValue(this.TaxPayerDetails.Psobkey);
    this.TaxpayerFormGroup.controls['legalName'].setValue(this.TaxPayerDetails.CrNm);
    this.TaxpayerFormGroup.controls['tinNumber'].disable({ onlySelf: true });
    this.TaxpayerFormGroup.controls['fullName'].disable({ onlySelf: true });
    this.TaxpayerFormGroup.controls['finNumber'].disable({ onlySelf: true });
    this.TaxpayerFormGroup.controls['legalName'].disable({ onlySelf: true });
    this.Step = 1;
  }

  taxpayerDetails() {
    const InstructionFormValues = this.InstructionFormGroup.value;
    const TaxpayerFormValues = this.TaxpayerFormGroup.value;
    let Terms2 = this.agreeBooleanValueCheck(InstructionFormValues.agree);
    this.TaxpayerData.TinNumber = TaxpayerFormValues.tinNumber;
    this.TaxpayerData.FinNumber = TaxpayerFormValues.finNumber;
    this.TaxpayerData.FullName = TaxpayerFormValues.fullName;
    this.TaxpayerData.LegalName = TaxpayerFormValues.legalName;
    this.TaxpayerData.Agree = Terms2;
    return this.TaxpayerData;
  }

  getDeregisterDetails() {
    this.exciseTaxService.getTaxDerigisterUISet(this.GPartz, this.Language).subscribe(data => {
      if (data) {
        console.log('button-list-data', data["d"]);
        this.ReasonList = data["d"].UI_DD_RESNSet.results;
      }
    }, (error) => {
      console.log('err', error);
    });
    this.exciseTaxService.getTaxDegisterHDRSet(this.GPartz, this.Language).subscribe(data => {
      if (data) {
        console.log('whole-list-data', data["d"]);
        this.TaxPayerDetails = data["d"];
        this.WarehouseList = data["d"].WH_ITMSet.results;
        this.TaxpayerFormGroup.controls['tinNumber'].setValue(this.TaxPayerDetails.Gpart);
        this.TaxpayerFormGroup.controls['fullName'].setValue(this.TaxPayerDetails.TinNm);
        this.TaxpayerFormGroup.controls['finNumber'].setValue(this.TaxPayerDetails.Psobkey);
        this.TaxpayerFormGroup.controls['legalName'].setValue(this.TaxPayerDetails.CrNm);
        this.TaxpayerFormGroup.controls['tinNumber'].disable({ onlySelf: true });
        this.TaxpayerFormGroup.controls['fullName'].disable({ onlySelf: true });
        this.TaxpayerFormGroup.controls['finNumber'].disable({ onlySelf: true });
        this.TaxpayerFormGroup.controls['legalName'].disable({ onlySelf: true });
        if (this.TaxPayerDetails.Statusz == "E0023") {
          $('#instructions').modal('hide');
          this.Step = 4;
          this.approvalflag = true;
          this.TaxpayerData.Agree = this.TaxPayerDetails.Tpvl;
          this.ReasonData.Reason = this.TaxPayerDetails.DeregRsn;
          this.ReasonValue = this.TaxPayerDetails.NOTESSet["results"];
          this.ReasonFormGroup.patchValue({
            reason: this.TaxPayerDetails.DeregRsn
          });
          this.onReasonSelected(this.TaxPayerDetails.DeregRsn);
          this.reasonDetails();
          this.DeclarationData.Agree = this.TaxPayerDetails.Decfg;
          this.DeclarationData.Name = this.TaxPayerDetails.Decnm;
          this.DeclarationData.IdType = this.TaxPayerDetails.Type;
          this.DeclarationData.IdNo = this.TaxPayerDetails.Idnumber;
          this.DeclarationData.Date = this.CurrentDate;
          this.DeclarationData.Designation = this.TaxPayerDetails.Decdg;
          this.declarationControls();
          this.onIdTypeSelection1(this.TaxPayerDetails.Type);
        }
        else if (this.TaxPayerDetails.Statusz == "E0040") {
          $('#instructions').modal('hide');
          this.Step = 4;
          this.approvalflag = false;
          this.ReasonFormGroup.patchValue({
            reason: this.TaxPayerDetails.DeregRsn
          });
          this.onReasonSelected(this.TaxPayerDetails.DeregRsn);
          this.reasonDetails();
          this.TaxpayerData.Agree = this.TaxPayerDetails.Tpvl;
          this.ReasonData.Reason = this.TaxPayerDetails.DeregRsn;
          this.ReasonValue = this.TaxPayerDetails.NOTESSet["results"]
          this.DeclarationData.Agree = this.TaxPayerDetails.Decfg;
          this.DeclarationData.Name = this.TaxPayerDetails.Decnm;
          this.DeclarationData.IdType = this.TaxPayerDetails.Type;
          this.DeclarationData.IdNo = this.TaxPayerDetails.Idnumber;
          this.DeclarationData.Date = this.CurrentDate;
          this.DeclarationData.Designation = this.TaxPayerDetails.Decdg;
          this.declarationControls();
          this.onIdTypeSelection1(this.TaxPayerDetails.Type);
        }
      }
    }, (err) => {
      this.errorMessage = '';
      $("#processmodel").modal("show");
      $('#instructions').modal('hide');
      for (let i = 0; i < err.error.error.innererror.errordetails.length - 1; i++) {
        this.errorMessage = this.errorMessage + " " + err.error.error.innererror.errordetails[i].message
      }
    });


  }

  onReasonSelected(value) {
    if (value == "04") {
      this.Others = true;
      this.ReasonFormGroup.addControl('otherOption', new FormControl('', [Validators.required]));
    }
    else {
      this.Others = false;
      this.ReasonFormGroup.removeControl('otherOption');
    }
    for (let i = 0; i < this.ReasonList.length; i++) {
      if (value == this.ReasonList[i].Reason) {
        this.ReasonName = this.ReasonList[i].Text;
      }
    }
  }

  continueFirstScreen() {
    const obj1 = this.taxpayerDetails();
    console.log('obj1', obj1);
    this.step2();
  }
  /* Step - 1 Info Ends */

  /* Step - 2 Info Starts */
  reasonControls() {
    if (this.ReasonData && this.ReasonData.Reason !== undefined) {
      this.ReasonFormGroup.controls['reason'].setValue(this.ReasonData.Reason);
      if (this.Others == true) {
        this.ReasonFormGroup.controls['otherOption'].setValue(this.ReasonData.Others);
      }
    }
    else {
      this.ReasonFormGroup = new FormGroup({
        reason: new FormControl('', [Validators.required])
      });
    }
  }

  editStep2() {
    this.Step = 2;
  }

  reasonDetails() {
    const ReasonFormValues = this.ReasonFormGroup.value;
    this.ReasonData.Reason = ReasonFormValues.reason;
    if (ReasonFormValues.otherOption && ReasonFormValues.otherOption.length == 0) {
      this.ReasonData.Others = ReasonFormValues.otherOption !== undefined && ReasonFormValues.otherOption !== "" ? ReasonFormValues.otherOption.split('\n') : '';
    }
    else {
      this.ReasonData.Others = ReasonFormValues.otherOption;
    }
    this.ReasonValue = this.reasonTextareaResult();
    return this.ReasonData;
  }

  continueSecondScreen() {
    const obj2 = this.reasonDetails();
    console.log('obj2', obj2);
    this.step3();
  }
  /* Step - 2 Info Ends */

  /* Step - 3 Info Starts */
  declarationControls() {
    if (this.DeclarationData && this.DeclarationData.Name !== undefined) {
      let Terms2 = this.agreeStringValueCheck(this.DeclarationData.Agree);
      this.DeclarationFormGroup.controls['contactName'].setValue(this.DeclarationData.Name);
      this.DeclarationFormGroup.controls['designation'].setValue(this.DeclarationData.Designation);
      this.DeclarationFormGroup.controls['idType'].setValue(this.DeclarationData.IdType);
      this.DeclarationFormGroup.controls['idNumber'].setValue(this.DeclarationData.IdNo);
      this.DeclarationFormGroup.controls['date'].setValue(this.DeclarationData.Date);
      this.DeclarationFormGroup.controls['agree'].setValue(Terms2);
    }
    else {
      this.DeclarationFormGroup = new FormGroup({
        contactName: new FormControl('', [Validators.required, Validators.pattern(this.StringPattern)]),
        designation: new FormControl('', [Validators.required, Validators.pattern(this.StringPattern), Validators.maxLength(40)]),
        idType: new FormControl('', [Validators.required]),
        idNumber: new FormControl('', [Validators.required, Validators.pattern(this.NumberPattern), Validators.minLength(8), Validators.maxLength(15)]),
        date: new FormControl(this.CurrentDate),
        agree: new FormControl(false, [Validators.required])
      });
    }
  }

  editStep3() {
    // let Terms2 = this.agreeStringValueCheck(this.DeclarationData.Agree);
    // this.DeclarationFormGroup.controls['contactName'].setValue(this.DeclarationData.Name);
    // this.DeclarationFormGroup.controls['designation'].setValue(this.DeclarationData.Designation);
    // this.DeclarationFormGroup.controls['idType'].setValue(this.DeclarationData.IdType);
    // this.DeclarationFormGroup.controls['idNumber'].setValue(this.DeclarationData.IdNo);
    // this.DeclarationFormGroup.controls['date'].setValue(this.DeclarationData.Date);
    // this.DeclarationFormGroup.controls['agree'].setValue(Terms2);
    this.Step = 3;
  }

  declarationDetails() {
    const DeclarationFormValues = this.DeclarationFormGroup.getRawValue();
    let Terms2 = this.agreeBooleanValueCheck(DeclarationFormValues.agree);
    this.DeclarationData.IdType = DeclarationFormValues.idType;
    this.DeclarationData.IdNo = DeclarationFormValues.idNumber;
    this.DeclarationData.Date = moment(DeclarationFormValues.date).format("YYYY-MM-DDT00:00:00");
    this.DeclarationData.Name = DeclarationFormValues.contactName;
    this.DeclarationData.Designation = DeclarationFormValues.designation;
    this.DeclarationData.Agree = Terms2;
    return this.DeclarationData;
  }

  onIdTypeSelection(value) {
    this.isNationalValidNumber = false;
    this.isIqamaValidNumber = false;
    this.isNationalEnterValidNumber = false;
    this.isIqamaEnterValidNumber = false;
    this.IdType = value;
    for (let i = 0; i < this.IdTypeList.length; i++) {
      if (value == this.IdTypeList[i].Key) {
        this.IdTypeName = this.IdTypeList[i].Text;
      }
    }
    if (this.DeclarationFormGroup.value.idType == "ZS0001" || this.DeclarationFormGroup.value.idType == "ZS0002") {
      $("#idDegisterExciseTax").modal("show");
    }
    else {
      this.DeclarationFormGroup.patchValue({
        idNumber: ''
      })
    }
  }
  onIdTypeSelection1(value) {

    this.IdType = value;
    for (let i = 0; i < this.IdTypeList.length; i++) {
      if (value == this.IdTypeList[i].Key) {
        this.IdTypeName = this.IdTypeList[i].Text;
      }
    }

  }
  onIdNoChange(value) {
    if (value !== "" && value !== undefined && value !== null) {
      const todayDate = moment(this.CurrentDate).format('YYYYMMDD');
      setTimeout(() => {
        this.exciseTaxService.getTaxDerigisterIDType(this.IdType, value, todayDate).subscribe(data => {
          if (data) {
            console.log('validate-id-no', data["d"]);
          }
        }, (error) => {
          console.log('err', error);
        });
      }, 500);
    }
  }

  continueThirdScreen() {
    const obj3 = this.declarationDetails();
    console.log('obj3', obj3);
    this.step4();
  }
  /* Step - 3 Info Ends */

  /* Step - 4 Info Starts */
  summaryDetails() {
    this.TaxPayerDetails.Tpvl = this.TaxpayerData.Agree;
    this.TaxPayerDetails.DeregRsn = this.ReasonData.Reason;
    this.TaxPayerDetails.NOTESSet["results"] = this.ReasonValue;
    this.TaxPayerDetails.Decfg = this.DeclarationData.Agree;
    this.TaxPayerDetails.Decnm = this.DeclarationData.Name;
    this.TaxPayerDetails.Type = this.DeclarationData.IdType;
    this.TaxPayerDetails.Idnumber = this.DeclarationData.IdNo;
    this.TaxPayerDetails.Decdt = this.CurrentDate.toISOString().slice(0, 19);
    this.TaxPayerDetails.Decdg = this.DeclarationData.Designation;
    return this.TaxPayerDetails;
  }

  continueFourthScreen() {
    this.TaxPayerDetails.Operationz = '01';
    const obj4 = this.summaryDetails();
    if (this.TaxPayerDetails.Statusz == "E0023") {
      this.TaxPayerDetails.DecFgTpConf = '1';
      this.TaxPayerDetails.Operationz = '07';
      this.TaxPayerDetails.UserTypz = "TP";
    }
    console.log('obj4', obj4);
    this.exciseTaxService.saveDerigisterDetails(this.TaxPayerDetails).subscribe(data => {
      if (data) {
        console.log('final-submit', data["d"]);
        this.ReferenceNo = data["d"].Fbnumz;
        this.acknowledgementDetails();
        this.step5();
      }
    }, (err) => {
      this.errorMessage = '';
      $("#errormodel1").modal("show");
      //for (let i = 0; i < err.error.error.innererror.errordetails.length - 1; i++) {
      // this.errorMessage = this.errorMessage + " " + err.error.error.innererror.errordetails[i].message
      //}
      this.errorMessage = err.error.error.innererror.errordetails[0].message
    });
  }
  /* Step - 4 Info Ends */

  /* Step - 5 Info Starts */
  acknowledgementDetails() {
    this.AcknowledgementData.Name = this.DeclarationData.Name;
    this.AcknowledgementData.ReferenceNumber = this.ReferenceNo;
    this.AcknowledgementData.Date = this.DeclarationData.Date;
  }
  /* Step - 5 Info Ends */

  agreeBooleanValueCheck(value) {
    let agree;
    if (value == true) {
      agree = "1";
    }
    else {
      agree = "0";
    }
    return agree;
  }

  agreeStringValueCheck(value) {
    let agree;
    if (value == "1") {
      agree = true;
    }
    else {
      agree = false;
    }
    return agree;
  }

  reasonTextareaResult() {
    moment.locale('en-Us');
    this.TaxPayerDetails.NOTESSet.results = [];
    if (this.ReasonData.Others && this.ReasonData.Others.length > 0) {
      for (let n = 0; n < this.ReasonData.Others.length; n++) {
        const reasonObject = {
          AttByz: "TP",
          ByGpartz: this.GPartz,
          ByPusrz: "",
          DataVersionz: "",
          ElemNo: 0,
          Erfdtz: moment(this.CurrentDate).format("YYYY-MM-DDT00:00:00"),
          Erftmz: "PT13H09M02S",
          Erfusrz: this.GPartz,
          Lineno: 0,
          Namez: "",
          Noteno: "",
          Notenoz: `00${n}`,
          Rcodez: "DGEX_RSN",
          Refnamez: "",
          Sect: "",
          Strdt: moment(this.CurrentDate).format("YYYY/MM/DD"),
          Strline: this.ReasonData.Others[n],
          Strtime: moment(this.CurrentDate).format("00:00:00"),
          Tdformat: "",
          Tdline: "",
          XInvoicez: "",
          XObsoletez: ""
        }
        this.TaxPayerDetails.NOTESSet.results.push(reasonObject);
      }
      return this.TaxPayerDetails.NOTESSet.results;
    }
    else {
      this.TaxPayerDetails.NOTESSet.results = [];
      return this.TaxPayerDetails.NOTESSet.results;
    }
  }

  // ngAfterViewInit() {
  //   if (this.Step == 1) {
  //     setTimeout(() => {
  //       this.instructions.nativeElement.click();
  //     }, 1000)
  //   }
  // }

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


  datePickerValue(value) {
    if (value !== undefined && value !== null && value !== "") {
      let day = value.calendarStart.day;
      if (value.calendarStart.day < 10) {
        day = '0' + value.calendarStart.day;
      }
      let month = value.calendarStart.month;
      if (value.calendarStart.month < 10) {
        month = '0' + value.calendarStart.month;
      }
      let year = value.calendarStart.year;
      const convertedDate = `${year}-${month}-${day}T00:00:00`;
      return convertedDate;
    } else {
      return null;
    }
  }
  //To allow numbers only in inputs


  NumberAllow(event) {

    let charCode = (event.which) ? event.which : event.keyCode;
    if ((charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123) || (charCode == 32)) {
      return false;
    }
  }

  validateWHDeclarationIdz() {
    if (this.DeclarationFormGroup.value.idType !== "ZS0003") {
      //if (!this.idErr1 && this.dob1) {
      let d = this.IdTypeOwnerShipFormgroup.value.Dob["calendarStart"];
      console.log("sdsd", this.dob1);
      if (d.day < 10 && d.day.toString().length == 1) {
        d.day = "0" + d.day;
      }
      if (d.month < 10 && d.month.toString().length == 1) {
        d.month = "0" + d.month;
      }
      let currentdate = "" + d.year + d.month + d.day;

      let obj = {
        type: this.DeclarationFormGroup.value.idType,
        idNumber: this.IdTypeOwnerShipFormgroup.value.Idnumber,
      };
      this.exciseTaxService.getUserValidation(obj, currentdate).subscribe(
        (res) => {
          this.IdTypeOwnerShipFormgroup.patchValue({
            Idnumber: '',
            Dob: undefined
          });
          this.DeclarationFormGroup.patchValue({
            idNumber: res["d"]["Idnum"]
          });
          $("#idDegisterExciseTax").modal("hide");
        },
        (err) => {
          this.errorMessage = '';
          // if (this.DeclarationFormGroup.value.idType == 'ZS0001') {
          //   this.isNationalValidNumber = true;
          // }
          // if (this.DeclarationFormGroup.value.idType == 'ZS0002') {
          //   this.isIqamaEnterValidNumber = true;
          // }
          $("#errormodel").modal("show");
          for (let i = 0; i < err.error.error.innererror.errordetails.length - 1; i++) {
            this.errorMessage = this.errorMessage + " " + err.error.error.innererror.errordetails[i].message
          }
        }
      );
    }

    //}
  }
  clearPopup() {
    this.IdTypeOwnerShipFormgroup.patchValue({
      Idnumber: '',
      Dob: ''
    });
    this.DeclarationFormGroup.patchValue({
      idNumber: ''
    })
  }
  isNumberValid() {

    let value = this.IdTypeOwnerShipFormgroup.value.Idnumber[0];

    if (value !== "" && value !== undefined) {
      if (this.DeclarationFormGroup.value.idType == "ZS0001") {
        if (value == "1") {
          this.isNationalEnterValidNumber = false;

        } else {
          this.isNationalEnterValidNumber = true;

        }
      }
      if (this.DeclarationFormGroup.value.idType == "ZS0002") {
        if (value == "2") {
          this.isIqamaEnterValidNumber = false;
        } else {
          this.isIqamaEnterValidNumber = true;
        }
      }

    } else {
      this.isNationalEnterValidNumber = false;
      this.isIqamaEnterValidNumber = false;
    }
  }
  isdescrptnlengValid() {
    let value = this.DeclarationFormGroup.value.designation;
    let len = this.DeclarationFormGroup.value.designation.length;
    if (value !== "" && value !== undefined) {
      if (len <= 40) {
        this.isdescrptnleng = false;
      }
      else {
        this.isdescrptnleng = true;
      }
    } else {

      this.isdescrptnleng = false;
    }
  }


}

export class TaxpayerDetailsModel {
  TinNumber: number;
  FullName: string;
  FinNumber: string;
  LegalName: number;
  Agree: boolean;
}

export class ReasonDetailsModel {
  Reason: string;
  Others: any;
}

export class DeclarationDetailsModel {
  Name: string;
  Designation: string;
  IdType: string;
  IdNo: number;
  Date: string;
  Agree: boolean;
}

export class AcknowledgementModel {
  Name: string;
  ReferenceNumber: any;
  Date: string;
}
