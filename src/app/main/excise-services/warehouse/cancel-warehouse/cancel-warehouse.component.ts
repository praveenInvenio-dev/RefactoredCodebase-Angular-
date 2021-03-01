import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, MaxLengthValidator, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import * as moment from 'moment';
import { CommonValidation } from 'src/app/constants/commonValidations';
import { cancelwarehouseconstants } from "src/app/main/excise-services/warehouse/cancel-warehouse/cancelwarehouseconstants.model";
import { WarehouseService } from '../warehouse.service';
import { NotifierService } from "angular-notifier";
import * as FileSaver from 'file-saver';
import { AppService } from "src/app/app.service";
import { CalendarComponent } from "src/app/constants/calendar.component";

declare var $;
declare var jQuery: any;

@Component({
  selector: 'app-cancel-warehouse',
  templateUrl: './cancel-warehouse.component.html',
  styleUrls: ['./cancel-warehouse.component.css']
})
export class CancelWarehouseComponent implements OnInit, AfterViewInit {

  @ViewChild('confirm', { static: false }) confirm: ElementRef;
  @ViewChild('proceed', { static: false }) proceed: ElementRef;
  @ViewChild('instructions', { static: false }) instructions: ElementRef;

  InstructionFormGroup: FormGroup = new FormGroup({});
  WarehouseInformationFormGroup: FormGroup = new FormGroup({});
  DeclarationFormGroup: FormGroup = new FormGroup({});
  IdTypeOwnerShipFormgroup: FormGroup;
  headerComponent = CalendarComponent;
  StringPattern = "^[a-zA-Z\u0600-\u06FF ][sa-zA-Z\u0600-\u06FF ]*$";
  NumberPattern = "^[0-9]*$";
  ContactNoPattern = "[5][0-9]{8}";
  id1: string;
  enddate: any;
  FBNumber: any = '';
  GPartz: any;
  Direction: string;
  Language: string;
  Step: any = 1;
  CurrentDate = new Date();
  WholeData: any;
  WarehouseButtonList: any;
  WarehouseListData: any;
  WarehouseWholeData: any;
  WarehouseName: string;
  IdTypeList: any;
  IdTypeName: string;
  ReasonValue: any;
  lang: any;
  direction: string;
  WarehouseData = new WarehouseDetailsModel();
  DeclarationData = new DeclarationDetailsModel();
  warehouseNo: any = '';
  Warehousenumber: any = '';
  ExpiryDate: any;
  Disableflag: boolean;
  WarehouseNo: string = '';
  Gdsfl: boolean;
  Rtsfl: boolean;
  Duefl: boolean;
  dob1: any;
  errorMessage: any;
  ConfirmationFlag: boolean;
  WhSubmitFlag: any = '';
  Msg: any;


  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private warehouseService: WarehouseService,
    public commonValidation: CommonValidation,
    public notifierService: NotifierService,
    public appSrv: AppService,
  ) {
    this.GPartz = localStorage.getItem('gpart');

    if (localStorage.getItem("lang") === "ar") {
      this.lang = cancelwarehouseconstants.langz.arb.cancelwarehouse;
      this.direction = cancelwarehouseconstants.langz.arb.dir;
      this.Direction = "rtl";
      this.Language = "A";
    } else {
      this.lang = cancelwarehouseconstants.langz.eng.cancelwarehouse;
      this.direction = cancelwarehouseconstants.langz.eng.dir;
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
    this.stepsChecking();
    this.getDeclarationDetails();
    this.IdTypeOwnerShipFormgroup = new FormGroup({
      Idnumber: new FormControl('', [Validators.required, Validators.pattern(this.NumberPattern), Validators.minLength(8), Validators.maxLength(16)]),
      Dob: new FormControl('', [Validators.required]),
    });
    this.DeclarationFormGroup = new FormGroup({
      contactName: new FormControl('', [Validators.required, Validators.pattern(this.StringPattern), Validators.maxLength(40)]),
      designation: new FormControl('', [Validators.required, Validators.pattern(this.StringPattern), Validators.maxLength(40)]),
      idType: new FormControl('', [Validators.required]),
      idNumber: new FormControl('', [Validators.required, Validators.pattern(this.NumberPattern), Validators.minLength(7), Validators.maxLength(15)]),
      date: new FormControl(this.CurrentDate),
      agree: new FormControl(false, [Validators.required])
    });
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
      this.warehouseService.getUserValidation(obj, currentdate).subscribe(
        (res) => {
          this.IdTypeOwnerShipFormgroup.patchValue({
            Idnumber: '',
            Dob: ''
          });
          this.DeclarationFormGroup.patchValue({
            idNumber: res["d"]["Idnum"]
          });
          $("#idWHDeclarationValidation").modal("hide");
        },
        (err) => {
          this.errorMessage = '';
          $("#errormodel").modal("show");
          this.errorMessage = err.error.error.innererror.errordetails[0].message;
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
  }
  stepsChecking() {
    switch (this.Step) {
      case 1:
        this.getWarehouseDetails();
        break;
      case 2:
        this.instructionFormControls();
        this.warehoueInformationFormControls();
        break;
      case 3:

        break;
      case 4:

        break;
      case 5:

        break;
      case 6:

        break;
      default:
        break;
    }
    return this.Step;
  }
  getSaveDraftdetails() {
    this.WarehouseInformationFormGroup.patchValue({
      reason: this.WholeData.NOTESSet.results[0].Strline != undefined ? this.WholeData.NOTESSet.results[0].Strline : ''
    })
    // if (this.WholeData.Decdt != null) {
    //   moment.locale('en-Us');
    //   if (this.WholeData.Decdt !== undefined && this.WholeData.Decdt !== "" && this.WholeData.Decdt !== null) {
    //     if (this.WholeData.Decdt.includes('/Date')) {

    //       this.ExpiryDate = moment(new Date(+(((this.WholeData.Decdt).toString().replace(')', '')).toString().replace('/Date(', '')).toString().replace('/', ''))).format('YYYY-MM-DD');
    //       if (this.Language === 'E') {
    //         this.ExpiryDate = this.commonValidation.toJulianDate1(new Date(this.ExpiryDate));
    //       }
    //       else {
    //         this.ExpiryDate = this.commonValidation.toJulianDate1(new Date(this.ExpiryDate));
    //         this.ExpiryDate = (this.commonValidation.dateFormate(this.ExpiryDate, "Islamic"))
    //       }
    //     }
    //     else {
    //       this.ExpiryDate = this.datePickerValue(this.WholeData.Decdt);
    //     }
    //   }
    // }
    this.DeclarationFormGroup.patchValue({
      agree: this.WholeData.Decfg == '1' ? true : false,
      idType: this.WholeData.Type,
      idNumber: this.WholeData.Idnumber,
      designation: this.WholeData.Decdg,
      contactName: this.WholeData.Decnm
    });
    this.Duefl = this.WholeData.Duefl == '1' ? true : false;
    this.Gdsfl = this.WholeData.Gdsfl == '1' ? true : false;
    this.Rtsfl = this.WholeData.Rtsfl == '1' ? true : false;
    this.InstructionFormGroup.patchValue({
      agree: this.WholeData.Tncfl == '1' ? true : false
    })
    this.onIdTypeSelection1(this.WholeData.Type);
  }
  getWarehouseNoData(value) {
    this.warehouseService.validateWarehouseNo(this.GPartz, this.Language, value, this.FBNumber).subscribe(data => {
      if (data) {
        console.log('warehouse-no-data', data["d"]);
        this.WholeData = data["d"];
        if (this.Step == 1) {
          this.Step = 2;
        }
        // else {
        this.WarehouseInformationFormGroup.controls['finNo'].setValue(this.WholeData.Fin);
        this.WarehouseInformationFormGroup.controls['bussinessName'].setValue(this.WholeData.Actnm);
        const expiryDate = this.WholeData.Expdt !== null ? this.WholeData.Expdt : this.CurrentDate;
        this.WholeData.Whnm = this.WarehouseName;
        console.log('exp', expiryDate);
        this.WarehouseInformationFormGroup.controls['selectWarehouse'].setValue(value);
        this.WholeData.Whno = value;
        if (this.WholeData.Expdt != null) {
          moment.locale('en-Us');
          if (this.WholeData.Expdt !== undefined && this.WholeData.Expdt !== "" && this.WholeData.Expdt !== null) {
            if (this.WholeData.Expdt.includes('/Date')) {

              this.ExpiryDate = moment(new Date(+(((this.WholeData.Expdt).toString().replace(')', '')).toString().replace('/Date(', '')).toString().replace('/', ''))).format('YYYY-MM-DD');
              if (this.Language === 'E') {
                this.ExpiryDate = this.commonValidation.toJulianDate1(new Date(this.ExpiryDate));
              }
              else {
                this.ExpiryDate = this.commonValidation.toJulianDate1(new Date(this.ExpiryDate));
                this.ExpiryDate = (this.commonValidation.dateFormate(this.ExpiryDate, "Islamic"))
              }
            }
            else {
              this.ExpiryDate = this.datePickerValue(this.WholeData.Expdt);
            }

          }
          // if (this.Language === 'E') {
          //   this.ExpiryDate = this.commonValidation.toJulianDate1(new Date(this.WholeData.Expdt));
          // }
          // else {
          //   this.ExpiryDate = this.commonValidation.toJulianDate1(new Date(this.WholeData.Expdt));
          //   this.ExpiryDate = (this.commonValidation.dateFormate(this.WholeData.Expdt, "Islamic"))
          //   //  hiring = this.commonValidation.getArabicFormat(new Date(hiring));
          // }
        }
        this.WarehouseInformationFormGroup.controls['expiryDate'].setValue(this.ExpiryDate);
        //}
        this.getSaveDraftdetails();
        this.getWholeData1(this.WholeData.Statusz);
      }
    }, (err) => {
      this.notifierService.notify(
        "error",
        err.error.error.innererror.errordetails[0].message
      );
    });
  }

  /* Step - 1 Info Starts */
  getWholeData1(status) {
    this.warehouseService.getWholeData1(this.GPartz, this.Language, this.FBNumber, status).subscribe(data => {
      if (data) {
        console.log('button-list-data', data["d"]);
        this.WarehouseButtonList = data["d"].UI_BTNSet.results;
        if (data["d"]["EditFgz"] == 'T') {
          this.ConfirmationFlag = true;
        }
        else {
          this.ConfirmationFlag = false;
        }
      }
    }, (error) => {
      console.log('err', error);
    });
  }
  getWarehouseDetails() {
    this.warehouseService.getWholeData(this.GPartz, this.Language).subscribe(data => {
      if (data) {
        console.log('button-list-data', data["d"]);
        this.WarehouseButtonList = data["d"].UI_BTNSet.results;
      }
    }, (error) => {
      console.log('err', error);
    });

    this.warehouseService.getWarehouseList(this.GPartz, this.Language).subscribe(data => {
      if (data) {
        console.log('draft-data', data["d"]);
        this.WarehouseWholeData = data["d"].DRAFT_WHLISTSet.results;

        moment.locale('en-Us');
        this.WarehouseWholeData.forEach(element => {
          element.Actdt = moment(new Date(+(((element.Actdt).toString().replace(')', '')).toString().replace('/Date(', '')).toString().replace('/', ''))).format('DD/MM/YYYY');
        });
        this.WarehouseListData = data["d"].ACT_WHLISTSet.results;
      }
    }, (error) => {
      console.log('err', error);
    });
  }

  draftRadioSelected(i, event) {
    //$('#proceed').modal('hide');
    let warehouseNo;
    this.WarehouseWholeData.forEach(element => {
      element.flag = false
    });
    if (event.currentTarget.checked) {
      for (let h = 0; h < this.WarehouseWholeData.length; h++) {
        if (i == h) {
          this.warehouseNo = this.WarehouseWholeData[h].Whno;
          this.WarehouseWholeData[h].flag = true;
          this.Disableflag = !this.Disableflag;
          this.WarehouseListData.push({
            Whno: this.WarehouseWholeData[h].Whno,
            Whnm: this.WarehouseWholeData[h].Whnm
          });
          this.WarehouseName = this.WarehouseWholeData[h].Whnm;
          this.FBNumber = this.WarehouseWholeData[h].Fbnum;
        }
      }
    }
    else {
      this.WarehouseListData = this.WarehouseListData.filter(x => x.Whno != this.WarehouseWholeData[i].Whno)
      this.warehouseNo = '';
    }
    let flagcount = this.WarehouseWholeData.filter(x => x.flag == true);
    if (flagcount.length > 0) {
      this.Disableflag = true;
    }
    else {
      this.WarehouseNo = '';
      this.ExpiryDate = '';
      this.Disableflag = undefined;
    }
    // else if (this.Warehousenumber != undefined && this.Warehousenumber != null && this.Warehousenumber != '') {
    //   this.Disableflag = true;
    // }
    // else {
    //   this.Disableflag = undefined;
    // }
  }
  ConfirmModel() {
    if (this.WhSubmitFlag != 'X') {
      this.instructionFormControls();
      this.warehoueInformationFormControls();
      let successmsg;
      if (this.warehouseNo !== undefined && this.warehouseNo != null && this.warehouseNo != '') {
        this.getWarehouseNoData(this.warehouseNo);
        this.WarehouseInformationFormGroup.patchValue({
          selectWarehouse: this.warehouseNo,
          expiryDate: this.ExpiryDate
        });
        console
        $('#proceed').modal('hide');

      }
      else if (this.Warehousenumber != undefined && this.Warehousenumber != null && this.Warehousenumber != '') {
        this.getWarehouseNoData(this.Warehousenumber);
        this.WarehouseInformationFormGroup.patchValue({
          selectWarehouse: this.Warehousenumber,
          expiryDate: this.ExpiryDate
        });
        $('#proceed').modal('hide');
        this.Step = 2;
        this.ngAfterViewInit();
        $('#instructions').modal('show');
      }
      else {
        if (this.Language == 'A') {
          successmsg = "الرجاء ادخال رقم المستودع المراد الغاءه";
        }
        else {
          successmsg = "Please enter a Warehouse number for cancellation";
        }
        this.notifierService.notify(
          "error",
          successmsg
        );
      }
    } else {
      $("#errormodel").modal("show");
      this.errorMessage = this.Msg;
    }
  }
  /* Step - 1 Info Ends */

  /* Step - 2 Info Starts */
  instructionFormControls() {
    //this.ngAfterViewInit();
    this.InstructionFormGroup.addControl('agree', new FormControl(false, [Validators.required]));
    //$('#instructions').modal('show');
  }

  termsAndConditionsOfInstructionAcceptance() {
    $('#instructions').modal('hide');
  }

  warehoueInformationFormControls() {
    this.WarehouseInformationFormGroup.addControl('finNo', new FormControl(''));
    this.WarehouseInformationFormGroup.addControl('bussinessName', new FormControl(''));
    this.WarehouseInformationFormGroup.addControl('selectWarehouse', new FormControl('', [Validators.required]));
    this.WarehouseInformationFormGroup.addControl('expiryDate', new FormControl(this.CurrentDate));
    this.WarehouseInformationFormGroup.addControl('reason', new FormControl('', [Validators.required, Validators.maxLength(132)]));
  }

  setWarehoueInformationFormControls() {
    let Terms1 = this.agreeStringValueCheck(this.WarehouseData.Agreeflg);
    let RsValue = this.WarehouseData.Reason !== undefined ? this.WarehouseData.Reason.join("\n") : '';
    this.InstructionFormGroup.addControl('agree', new FormControl(Terms1, [Validators.required]));
    this.WarehouseInformationFormGroup.addControl('finNo', new FormControl(this.WarehouseData.Fin));
    this.WarehouseInformationFormGroup.addControl('bussinessName', new FormControl(this.WarehouseData.Bussiness));
    this.WarehouseInformationFormGroup.addControl('selectWarehouse', new FormControl(this.WarehouseData.SelectWarehouse, [Validators.required]));
    this.WarehouseInformationFormGroup.addControl('expiryDate', new FormControl(this.WarehouseData.ExpiryDate));
    this.WarehouseInformationFormGroup.addControl('reason', new FormControl(RsValue, [Validators.required]));
    this.Step = 2;
  }

  onWarehouseSelection(value) {
    for (let i = 0; i < this.WarehouseListData.length; i++) {
      if (value == this.WarehouseListData[i].Whno) {
        this.WarehouseName = this.WarehouseListData[i].Whnm;
        this.WhSubmitFlag = this.WarehouseListData[i].Flag;
        this.Msg = this.WarehouseListData[i].Msg;
        let expirydate;
        moment.locale('en-Us');
        if (this.WarehouseListData[i].Expdt !== undefined && this.WarehouseListData[i].Expdt !== "" && this.WarehouseListData[i].Expdt !== null) {
          if (this.WarehouseListData[i].Expdt.includes('/Date')) {

            expirydate = moment(new Date(+(((this.WarehouseListData[i].Expdt).toString().replace(')', '')).toString().replace('/Date(', '')).toString().replace('/', ''))).format('YYYY-MM-DD');
            if (this.Language === 'E') {
              expirydate = this.commonValidation.toJulianDate1(new Date(expirydate));
            }
            else {
              expirydate = this.commonValidation.toJulianDate1(new Date(expirydate));
              expirydate = (this.commonValidation.dateFormate(expirydate, "Islamic"))
            }
          }
          else {
            expirydate = this.datePickerValue(this.WarehouseListData[i].Expdt);
          }

        } else {
          expirydate = this.CurrentDate.toISOString().slice(0, 19);
        }
        this.ExpiryDate = expirydate;
        this.Disableflag = false;
      }
    }
    this.Warehousenumber = value;
    this.WarehouseWholeData.forEach(element => {
      element.flag = false
    });
    if (value == '') {
      this.Disableflag = undefined;
      this.WhSubmitFlag = '';
    }
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
  warehouseDetails() {
    const InstructionFormValues = this.InstructionFormGroup.value;
    const WarehouseFormValues = this.WarehouseInformationFormGroup.value;
    let Terms1 = this.agreeBooleanValueCheck(InstructionFormValues.agree);
    this.WarehouseData.Agreeflg = Terms1;
    this.WarehouseData.Fin = WarehouseFormValues.finNo;
    this.WarehouseData.Bussiness = WarehouseFormValues.bussinessName;
    this.WarehouseData.SelectWarehouse = WarehouseFormValues.selectWarehouse;
    let expirydate;
    if (WarehouseFormValues.expiryDate !== undefined && WarehouseFormValues.expiryDate !== "" && WarehouseFormValues.expiryDate !== null) {
      if (WarehouseFormValues.expiryDate.calendarEnd != undefined) {
        expirydate = this.datePickerValue(WarehouseFormValues.expiryDate);
      }
      else if (WarehouseFormValues.expiryDate.includes('/Date')) {
        expirydate = new Date(+WarehouseFormValues.expiryDate.substr(6, 13)).toISOString().slice(0, 19);
      }
      else {
        expirydate = WarehouseFormValues.expiryDate;
      }
    } else {
      expirydate = this.CurrentDate.toISOString().slice(0, 19);
    }
    this.WarehouseData.ExpiryDate = expirydate;
    this.WarehouseData.Reason = WarehouseFormValues.reason !== undefined ? WarehouseFormValues.reason.split('\n') : '';
    this.ReasonValue = this.reasonTextareaResult();
    return this.WarehouseData;
  }

  continueSecondScreen() {
    const objData = this.warehouseDetails();
    console.log('sc1', objData);
    this.step3();
  }
  continueSixthScreen() {
    this.step4();
    this.WholeData.Gdsfl = this.Gdsfl == true ? '1' : '0';
    this.WholeData.Rtsfl = this.Rtsfl == true ? '1' : '0';
    this.WholeData.Duefl = this.Duefl == true ? '1' : '0';
    console.log("test", this.Gdsfl, this.Rtsfl, this.Duefl)
  }
  AcknowledgementMethod() {
    let fnumb = '0' + this.WholeData.Fbnumz;
    this.warehouseService.downloadfilledform(fnumb).subscribe((data: any) => {

      FileSaver.saveAs(data, "acknowledgement.pdf");

    }, (error) => {
      console.log('err-2', error);
    });
  }
  saveWarehouseDetails() {
    this.warehouseDetails();
    this.WholeData.Operationz = '05';
    this.WholeData.Tncfl = this.WarehouseData.Agreeflg;
    this.WholeData.Fin = this.WarehouseData.Fin;
    this.WholeData.Actnm = this.WarehouseData.Bussiness;
    this.WholeData.Whno = this.WarehouseData.SelectWarehouse;
    this.WholeData.Whnm = this.WarehouseName;
    this.WholeData.Expdt = this.WarehouseData.ExpiryDate;
    this.WholeData.NOTESSet["results"] = this.ReasonValue;
    this.WholeData.UserTypz = "TP";
    //this.WholeData.Rtsfl = "0";
    this.WholeData.StepNumberz = "1";
    // call service to save details as draft and redirect to next page.
    this.warehouseService.saveWarehouseDetails(this.WholeData).subscribe(data => {
      if (data) {
        this.errorMessage = '';
        $("#errormodel").modal("show");
        if (this.Language == 'A') {
          this.errorMessage = "تم حفظ نموذج رخصة مستودع بنجاح";
        }
        else {
          this.errorMessage = "Warehouse Cancellation Form Saved successfully";
        }
      }
    });
  }
  /* Step - 2 Info Ends */

  /* Step - 3 Info Starts */
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
    //this.declarationFormControls();
  }

  declarationFormControls() {
    this.DeclarationFormGroup.addControl('contactName', new FormControl('', [Validators.required, Validators.pattern(this.StringPattern), Validators.maxLength(40)]));
    this.DeclarationFormGroup.addControl('designation', new FormControl('', [Validators.required, Validators.pattern(this.StringPattern), Validators.maxLength(40)]));
    this.DeclarationFormGroup.addControl('idType', new FormControl('', [Validators.required]));
    this.DeclarationFormGroup.addControl('idNumber', new FormControl('', [Validators.required, Validators.pattern(this.NumberPattern), Validators.minLength(7), Validators.maxLength(15)]));
    this.DeclarationFormGroup.addControl('date', new FormControl(this.CurrentDate));
    this.DeclarationFormGroup.addControl('agree', new FormControl(false, [Validators.required]));
  }

  setDeclarationFormControls() {
    let Terms2 = this.agreeStringValueCheck(this.DeclarationData.Agree);
    this.DeclarationFormGroup.addControl('contactName', new FormControl(this.DeclarationData.Name, [Validators.required]));
    this.DeclarationFormGroup.addControl('designation', new FormControl(this.DeclarationData.Designation, [Validators.required]));
    this.DeclarationFormGroup.addControl('idType', new FormControl(this.DeclarationData.IdType, [Validators.required]));
    this.DeclarationFormGroup.addControl('idNumber', new FormControl(this.DeclarationData.IdNo, [Validators.required]));
    this.DeclarationFormGroup.addControl('date', new FormControl(this.DeclarationData.Date));
    this.DeclarationFormGroup.addControl('agree', new FormControl(Terms2, [Validators.required]));
    this.Step = 3;
  }
  onIdTypeSelection1(value) {
    for (let i = 0; i < this.IdTypeList.length; i++) {
      if (value == this.IdTypeList[i].Key) {
        this.IdTypeName = this.IdTypeList[i].Text;
      }
    }
  }
  onIdTypeSelection(value) {
    for (let i = 0; i < this.IdTypeList.length; i++) {
      if (value == this.IdTypeList[i].Key) {
        this.IdTypeName = this.IdTypeList[i].Text;
      }
    }
    if (this.DeclarationFormGroup.value.idType == "ZS0001" || this.DeclarationFormGroup.value.idType == "ZS0002") {
      $("#idWHDeclarationValidation").modal("show");
    }
    else {
      this.DeclarationFormGroup.value.idNumber = '';
    }
  }

  onIdNoChange(value) {
    const IdType = this.DeclarationFormGroup.value.idType;
    const currentDateFormat = this.CurrentDate.toISOString().slice(0, 10);
    const formatSplit = currentDateFormat.split("-");
    const todayDate = `${formatSplit[0]}${formatSplit[1]}${formatSplit[2]}`;
    setTimeout(() => {
      this.warehouseService.validateIdNo(IdType, value, todayDate).subscribe(data => {
        if (data) {
          console.log('validate-id-no', data["d"]);
        }
      }, (error) => {
        console.log('err', error);
      });
    }, 500);
  }

  declarationDetails() {
    const FormValues = this.DeclarationFormGroup.value;
    let Terms2 = this.agreeBooleanValueCheck(FormValues.agree);
    this.DeclarationData.IdType = FormValues.idType;
    this.DeclarationData.IdNo = FormValues.idNumber;
    this.DeclarationData.Date = FormValues.date.toISOString().slice(0, 19);
    this.DeclarationData.Name = FormValues.contactName;
    this.DeclarationData.Designation = FormValues.designation;
    this.DeclarationData.Agree = Terms2;
    return this.DeclarationData;
  }

  continueThirdScreen() {
    const objData = this.declarationDetails();
    console.log('sc2', objData);
    if (this.ConfirmationFlag == true) {
      this.step6();
    } else {
      this.step4();
    }
  }

  saveDeclarationDetails() {
    this.warehouseDetails();
    this.WholeData.Tncfl = this.WarehouseData.Agreeflg;
    this.WholeData.Fin = this.WarehouseData.Fin;
    this.WholeData.Actnm = this.WarehouseData.Bussiness;
    this.WholeData.Whno = this.WarehouseData.SelectWarehouse;
    this.WholeData.Whnm = this.WarehouseName;
    this.WholeData.Expdt = this.WarehouseData.ExpiryDate;
    this.WholeData.NOTESSet["results"] = this.ReasonValue;
    this.declarationDetails();
    this.WholeData.Operationz = '05';
    this.WholeData.Decfg = this.DeclarationData.Agree;
    this.WholeData.Decnm = this.DeclarationData.Name;
    this.WholeData.Type = this.DeclarationData.IdType;
    this.WholeData.Idnumber = this.DeclarationData.IdNo;
    this.WholeData.Decdt = this.DeclarationData.Date;
    this.WholeData.Decdg = this.DeclarationData.Designation;
    this.WholeData.UserTypz = "TP";
    // this.WholeData.Rtsfl = "0";
    this.WholeData.StepNumberz = "2";
    // call service to save details as draft and redirect to next page.
    this.warehouseService.saveWarehouseDetails(this.WholeData).subscribe(data => {
      if (data) {
        this.errorMessage = '';
        $("#errormodel").modal("show");
        if (this.Language == 'A') {
          this.errorMessage = "تم حفظ نموذج رخصة مستودع بنجاح";
        }
        else {
          this.errorMessage = "Warehouse Cancellation Form Saved successfully";
        }
      }
    });
  }
  /* Step - 3 Info Ends */

  /* Step - 4 Info Starts */
  summaryDetails() {
    this.WholeData.Tncfl = this.WarehouseData.Agreeflg;
    this.WholeData.Fin = this.WarehouseData.Fin;
    this.WholeData.Actnm = this.WarehouseData.Bussiness;
    this.WholeData.Whno = this.WarehouseData.SelectWarehouse;
    this.WholeData.Whnm = this.WarehouseName;
    this.WholeData.Expdt = this.WarehouseData.ExpiryDate;
    this.WholeData.NOTESSet["results"] = this.ReasonValue;
    this.WholeData.Decfg = this.DeclarationData.Agree;
    this.WholeData.Decnm = this.DeclarationData.Name;
    this.WholeData.Type = this.DeclarationData.IdType;
    this.WholeData.Idnumber = this.DeclarationData.IdNo;
    this.WholeData.Decdt = this.DeclarationData.Date;
    this.WholeData.Decdg = this.DeclarationData.Designation;
    this.WholeData.UserTypz = "TP";
    //this.WholeData.Rtsfl = "0";
    this.WholeData.StepNumberz = "3";
    return this.WholeData;
  }

  continueFourthScreen() {
    if (this.ConfirmationFlag == true) {
      this.WholeData.Operationz = '07';

    }
    else {
      this.WholeData.Operationz = '01';
    }
    this.summaryDetails();
    console.log('save', this.WholeData);
    this.warehouseService.saveWarehouseDetails(this.WholeData).subscribe(data => {
      if (data) {
        this.WholeData = data["d"];
        this.Step = 13;
      }
    },
      (err) => {
        this.errorMessage = '';
        $("#errormodel").modal("show");
        for (let i = 0; i < err.error.error.innererror.errordetails.length - 1; i++) {
          this.errorMessage = this.errorMessage + " " + err.error.error.innererror.errordetails[i].message
        }
        //this.errorMessage = err.error.error.innererror.errordetails[0].message;
      });
  }

  saveSummaryDetails() {
    this.WholeData.Operationz = '05';
    this.summaryDetails();
    // call service to save details as draft and redirect to next page.
    this.warehouseService.saveWarehouseDetails(this.WholeData).subscribe(data => {
      if (data) {
        this.errorMessage = '';
        $("#errormodel").modal("show");
        if (this.Language == 'A') {
          this.errorMessage = "تم حفظ نموذج رخصة مستودع بنجاح";
        }
        else {
          this.errorMessage = "Warehouse Cancellation Form Saved successfully";
        }
      }
    },
      (err) => {
        this.errorMessage = '';
        $("#errormodel").modal("show");
        this.errorMessage = err.error.error.innererror.errordetails[0].message;
      });
  }
  /* Step - 4 Info Ends */

  /* Step - 5 Info Starts */
  redirectToBack() {
    this.router.navigate(['/mains/tax']);
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

  newCancelWarehouse() {
    $('#confirm').modal('hide');
    this.step2();
  }

  existingCancelWarehouse() {
    //  $('#confirm').modal('hide');
    $('#proceed').modal('show');
  }

  back2() {
    this.Step = 2;
  }

  back3() {
    if (this.ConfirmationFlag == true) {
      this.Step = 6;
    } else {
      this.step3();
    }
  }

  back4() {
    this.Step = 4;
  }
  back6() {
    this.Step = 3;
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
  step6() {
    this.Step = 6;
    this.stepsChecking();
  }
  reasonTextareaResult() {
    this.WholeData.NOTESSet.results = [];
    if (this.WarehouseData.Reason.length > 0) {
      for (let n = 0; n < this.WarehouseData.Reason.length; n++) {
        const reasonObject = {
          AttByz: "TP",
          ByGpartz: this.GPartz,
          ByPusrz: "",
          DataVersionz: "",
          ElemNo: 0,
          Erfdtz: this.CurrentDate.toISOString().slice(0, 19),
          Erftmz: "PT10H05M39S",
          Erfusrz: this.GPartz,
          Lineno: 0,
          Namez: "",
          Noteno: "",
          Notenoz: `00${n}`,
          Rcodez: "CNEW_RESON",
          Refnamez: "",
          Sect: "",
          Strdt: this.CurrentDate.toISOString().slice(0, 10),
          Strline: this.WarehouseData.Reason[n],
          Strtime: this.CurrentDate.toISOString().slice(11, 19),
          Tdformat: "",
          Tdline: "",
          XInvoicez: "",
          XObsoletez: ""
        }
        this.WholeData.NOTESSet.results.push(reasonObject);
      }
      return this.WholeData.NOTESSet.results;
    }
    else {
      this.WholeData.NOTESSet.results = [];
      return this.WholeData.NOTESSet.results;
    }
  }

  ngAfterViewInit() {
    if (this.Step == 1) {
      setTimeout(() => {
        this.proceed.nativeElement.click();
      }, 1000);
    }
    if (this.Step == 2) {
      setTimeout(() => {
        this.instructions.nativeElement.click();
      }, 1000)
    }
  }

}

export class WarehouseDetailsModel {
  Agreeflg: boolean;
  Fin: string;
  Bussiness: string;
  SelectWarehouse: string;
  ExpiryDate: string;
  Reason: any;
}

export class DeclarationDetailsModel {
  Name: string;
  Designation: string;
  IdType: string;
  IdNo: number;
  Date: string;
  Agree: boolean;
}
