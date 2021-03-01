import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import * as moment from 'moment';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { VatServicesService } from '../vat-services.service';
import { requestamendconstants } from "src/app/main/vat-services/request-amend-vatgroup/request-amendconstants.model";
import { NotifierService } from "angular-notifier";
import * as FileSaver from 'file-saver';
declare var $;
@Component({
  selector: 'app-request-amend-vatgroup',
  templateUrl: './request-amend-vatgroup.component.html',
  styleUrls: ['./request-amend-vatgroup.component.css']
})
export class RequestAmendVatgroupComponent implements OnInit {
  @ViewChild('fileInput') myInputVariable: ElementRef;
  @ViewChild('infoModal', { static: false }) infoModal: ElementRef;
  @ViewChild('viewMember', { static: false }) viewmember: ElementRef;
  @ViewChild('editMember', { static: false }) editMember: ElementRef;
  @ViewChild('addMember1', { static: false }) addmember1: ElementRef;
  @ViewChild('addMember2', { static: false }) addmember2: ElementRef;
  @ViewChild('addMember3', { static: false }) addmember3: ElementRef;
  @ViewChild('declarationPopup', { static: false }) declarationPopup: ElementRef;
  @ViewChild('delPopupModal', { static: false }) delPopupModal: ElementRef;


  StringPattern = "^[a-zA-Z\u0600-\u06FF ][sa-zA-Z\u0600-\u06FF ]*$";
  NumberPattern = "^[0-9]*$";
  ContactNoPattern = "[5][0-9]{8}";

  AmendInstructionFormGroup: FormGroup = new FormGroup({});
  AmendMember1FormGroup: FormGroup = new FormGroup({});
  AmendMember3FormGroup: FormGroup = new FormGroup({});
  AmendFinancialInformationFormGroup: FormGroup = new FormGroup({});
  VatGroupRegisterAttachmentsFormGroup: FormGroup = new FormGroup({});
  AmendDeclarationFormGroup: FormGroup = new FormGroup({});
  declarationPopUpFormGroup: FormGroup = new FormGroup({});
  GPartz: any;
  Direction: string;
  Language: string;
  Step: any = 1;
  CurrentDate = new Date();
  LegalTypeList: any;
  ElgibleSupplieList: any;
  ElgiblePurchaseList: any;
  IdTypeList: any;
  VATGroupRegisterType: string;
  IsImporter: string = '0';
  IsExporter: string = '0';
  ImportExportType: string;
  AmendVatGroupCardList: any;
  IsEligiblePurchase: string = '01';  
  AmendIdTypeName: any;
  reqOneMemGroupData: any;
  AmendNewMemberData: any;
  ViewNewTinNo: any;
  LegalPersonName: any;
  TempPopupValue: string;
  SliTempPopupval: string;
  FinalTempPopupVal: string;
  TempValue: string;
  SliTempval: string;
  FinalTempVal: string = "Less than SAR 187,500";
  IsGrpEligiblePurchase: any;
  EligiblePurchaseName: any = "Less than SAR 187,500";
  DateList: any;
  viewLegalPer: any;
  viewImEx: string;
  viewPur: any;
  viewSupp: any;
  viewAccount: any;
  viewLicense: any;
  viewAddress: string;
  viewGpart: any;
  viewActnm: any;
  vieweffectivedate: any;
  AmendWholeData: any;
  TableArray: any[] = [];
  submitted = false;
  lang: any;
  direction: string;
  IdType: any;
  isError = false;
  AmendAddMemberModel = new AmendAddMemberModel();
  AmendFinancialModel = new AmendFinancialModel();
  AmendDeclarationModel = new AmendDeclarationModel();
  sliderValue: any;
  memberSubmit: boolean = false;
  memObj: any;
  isShowNewAmend: boolean = false;
  LegalTypeNewuserList: any = [];
  reqAmendVatGroupCardList: any;
  selectedlegaltype: any;
  type: any;
  delGrpIndex: any;
  errMsg: any;
  Newmembertin: any;
  representativeLegalPID: any;
  isMemberAdd:boolean=true;
  selectedEditMemberIndex:any;
  legalTypeValidationForRepresent: boolean = false;
  disableFinancialblock:boolean=false;
  showlegalTypeValidation:boolean=false;
  VatGroupRegisterAttachFiles:any=[];
  VatGroupRegisterAttachmentSelectList: any;
  application:any;
  selectedMemberVatSupply:string;
  selectedMemberVatPurchase:string;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private vatServices: VatServicesService,
    public notifierService: NotifierService
  ) {
    this.GPartz = localStorage.getItem('gpart');
    // if (localStorage.getItem("lang") === "ar") {
    //   this.Direction = "rtl";
    //   this.Language = "A";
    // } else {
    //   this.Direction = "ltr";
    //   this.Language = "E";
    // }

    if (localStorage.getItem("lang") === "ar") {
      this.lang = requestamendconstants.langz.arb.requestamend;
      this.direction = requestamendconstants.langz.arb.dir;
      this.Direction = "rtl";
      this.Language = "A";
    } else {
      this.lang = requestamendconstants.langz.eng.requestamend;
      this.direction = requestamendconstants.langz.eng.dir;
      this.Direction = "ltl";
      this.Language = "E";
    }
  }

  ngOnInit() {
    this.getLegalTypeList();
    this.getEligibleSupplies();
    this.getEligiblePurchases();
    this.getIdTypeListDetails();
    this.amendImportOrExportValueChange();
    this.ContinueFirstScreen();
    // this.mainDataFetchingDetails(); 
    this.vatGroupRegistrationDetails();
    this.stepsChecking();
  }

  stepsChecking() {
    switch (this.Step) {
      case 1: 
        this.vatGroupRegistrationDetails();
        break;
      case 2:
        this.amendMemberRegisteredDetails();
        this.amendFinancialInfoFormControls();
        break;
      case 3:
       // this.amendFinancialInfoFormControls();
        break;
      case 4:
        this.vatGroupRegisterAttachmentFormControls();
        break;
      case 5:
        this.amendDeclarationFormControls();
        break;
      case 6:
        this.amendSummaryDetails();
        break;
      case 7:
        this.amendAcknowledgementDetails();
        break;
      default:
        break;
    }

    return this.Step;
  }

  getLegalTypeList() {
    if (this.Language == 'A') {
      this.LegalTypeList = {
        "type":
          [
            {
              "Key": "00",
              "Text": ""
            },
            {
              "Key": "01",
              "Text": "ممثل مجموعة مع تحكم مشترك"
            },
            {
              "Key": "05",
              "Text": "ممثل مجموعة بدون تحكم مشترك"
            },
            {
              "Key": "10",
              "Text": "50% أو اكثر من ملكية رأس المال المشتركة"
            },
            {
              "Key": "15",
              "Text": "50%  أو أكثر من حقوق التصويت المشتركة"
            },
            {
              "Key": "20",
              "Text": "50%  أو أكثر من ملكية القيمة المشتركة"
            },
            {
              "Key": "25",
              "Text": "عضو المجموعة مع السيطرة المشتركة"
            },
            {
              "Key": "30",
              "Text": "أخرى "
            }
          ]
      }
    }
    else {
      this.LegalTypeList = {
        "type":
          [
            {
              "Key": "00",
              "Text": ""
            },
            {
              "Key": "01",
              "Text": "Group Representative with common control"
            },
            {
              "Key": "05",
              "Text": "Group Representative without common control"
            },
            {
              "Key": "10",
              "Text": "50% or more common capital ownership"
            },
            {
              "Key": "15",
              "Text": "50% or more common voting rights"
            },
            {
              "Key": "20",
              "Text": "50% or more common value ownership"
            },
            {
              "Key": "25",
              "Text": "Group member with common control"
            },
            {
              "Key": "30",
              "Text": "Others"
            }
          ]
      }
    }
    this.LegalTypeList = this.LegalTypeList.type;
  }

  getEligibleSupplies() {
    if (this.Language == 'A') {
      this.ElgibleSupplieList = {
        "type":
          [
            {
              "Key": "00",
              "Text": ""
            },
            {
              "Key": "01",
              "Text": "أقل من 187,500 ريال سعودي"
            },
            {
              "Key": "02",
              "Text": "أكثر من 187,500 حتى 375,000 ريال سعودي"
            },
            {
              "Key": "03",
              "Text": "أكثر من 375,000 حتى 1,000,000 ريال سعودي"
            },
            {
              "Key": "04",
              "Text": "أكثر من 1,000,000 حتى 40,000,000 ريال سعودي"
            },
            {
              "Key": "05",
              "Text": "أكثر من 40,000,000 ريال سعودي"
            }
          ]
      }
    }
    else {
      this.ElgibleSupplieList = {
        "type":
          [
            {
              "Key": "00",
              "Text": ""
            },
            {
              "Key": "01",
              "Text": "Less than SAR 187,500"
            },
            {
              "Key": "02",
              "Text": "Between SAR 187,500 and SAR 375,000"
            },
            {
              "Key": "03",
              "Text": "Between SAR 375,000 and SAR 1,000,000"
            },
            {
              "Key": "04",
              "Text": "Between SAR 1,000,000 and SAR 40,000,000"
            },
            {
              "Key": "05",
              "Text": "Greater than SAR 40,000,000"
            }
          ]
      }
    }
    this.ElgibleSupplieList = this.ElgibleSupplieList.type;
  }

  getEligiblePurchases() {
    if (this.Language == 'A') {
      this.ElgiblePurchaseList = {
        "type":
          [
            {
              "Key": "00",
              "Text": ""
            },
            {
              "Key": "01",
              "Text": "أقل من 187,500 ريال سعودي"
            },
            {
              "Key": "02",
              "Text": "أكثر من 187,500 ريال سعودي"
            }
          ]
      }
    }
    else {
      this.ElgiblePurchaseList = {
        "type":
          [
            {
              "Key": "00",
              "Text": ""
            },
            {
              "Key": "01",
              "Text": "Less than SAR 187,500"
            },
            {
              "Key": "02",
              "Text": "Greater than SAR 187,500"
            }
          ]
      }
    }
    this.ElgiblePurchaseList = this.ElgiblePurchaseList.type;
  }

  getIdTypeListDetails() {
    if (this.Language == 'A') {
      this.IdTypeList = {
        "idTyp":
          [
            {
              "idKey": "",
              "idText": ""
            },
            {
              "idKey": "ZS0001",
              "idText": "هوية وطنية"
            },
            {
              "idKey": "ZS0002",
              "idText": "هوية مقيم"
            },
            {
              "idKey": "ZS0003",
              "idText": "هوية خليجية"
            }
          ]
      }
    }
    else {
      this.IdTypeList = {
        "idTyp":
          [
            {
              "idKey": "",
              "idText": ""
            },
            {
              "idKey": "ZS0001",
              "idText": "National ID"
            },
            {
              "idKey": "ZS0002",
              "idText": "Iqama ID"
            },
            {
              "idKey": "ZS0003",
              "idText": "GCC ID"
            }
          ]
      }
    }
    this.IdTypeList = this.IdTypeList.idTyp;
  }
  closePopClick() {
    this.Step = 2;
  }
  selectedOption:any;
  Keyvalueseletion;any;
  amendIdTypeName:any;
  onIdTypeSelection(value) { 
    this.AmendDeclarationFormGroup.controls['idNumber'].setValue("");
    this.AmendDeclarationFormGroup.controls['personName'].setValue("");
    this.selectedOption = value;
    for (let i = 0; i < this.IdTypeList.length; i++) {
      if (value == this.IdTypeList[i].idKey) {
        this.Keyvalueseletion = this.IdTypeList[i].idKey;
        this.amendIdTypeName = this.IdTypeList[i].idText;
      }
      if(value!='ZS0003' && value!='')
      {
        this.declarationPopUpFormGroup.reset();
        $('#declarationPopup').modal('show');
      }
    }
  }

  onTinChange(value) {
    if (value !== "") {
      this.Newmembertin = value;
      this.vatServices.requestOneMemberGroup(value, this.GPartz).subscribe(data => {
        if (data) {
          console.log('NewMember-data', data["d"]);
          this.AmendNewMemberData = data["d"];
          console.log('getData',this.AmendNewMemberData);
          let addSet =this.AmendNewMemberData.BuildingNo + ' ' + this.AmendNewMemberData.Street + ' ' + this.AmendNewMemberData.Quarter + ' ' + this.AmendNewMemberData.RegionDesc + ' ' + this.AmendNewMemberData.City + ' ' + this.AmendNewMemberData.PostalCd;
         // let addSet = this.AmendNewMemberData.BuildingNo !== "" && this.AmendNewMemberData.Street !== "" && this.AmendNewMemberData.Quarter !== "" && this.AmendNewMemberData.RegionDesc !== "" && this.AmendNewMemberData.City !== "" && this.AmendNewMemberData.PostalCd !== "" ? `${this.AmendNewMemberData.BuildingNo} ${this.AmendNewMemberData.Street} ${this.AmendNewMemberData.Quarter} ${this.AmendNewMemberData.RegionDesc} ${this.AmendNewMemberData.City} ${this.AmendNewMemberData.PostalCd}` : '';
          this.AmendMember1FormGroup.controls['address'].setValue(addSet);
          this.AmendMember1FormGroup.controls['address'].disable();
          this.AmendMember1FormGroup.controls['license'].setValue(this.AmendNewMemberData.LicenseCrno);
          this.AmendMember1FormGroup.controls['license'].disable();
          this.AmendMember1FormGroup.controls['vatAccount'].setValue(this.AmendNewMemberData.Account);
          this.AmendMember1FormGroup.controls['vatAccount'].disable();
          if (this.AmendNewMemberData.Account != "") {
            this.AmendMember1FormGroup.controls['vatAccount'].setValue(`${this.AmendNewMemberData.Account}`);
            this.AmendMember1FormGroup.controls['vatAccount'].disable({ onlySelf: true });
          } else {
            this.AmendMember1FormGroup.controls['vatAccount'].setValue('');
            this.AmendMember1FormGroup.controls['vatAccount'].enable({ onlySelf: true });
          }
          this.AmendMember3FormGroup.patchValue({ 'suppliesResult': ((+this.AmendNewMemberData.VatSupply) * 10).toString() });
          this.TempPopupValue = this.AmendNewMemberData.VatSupply;
          if (this.TempPopupValue == "01") {
            this.SliTempPopupval = 'Less than SAR 187,500';
          } else if (this.TempPopupValue == "02") {
            this.SliTempPopupval = 'Between SAR 187,500 and SAR 375,000';
          } else if (this.TempPopupValue == "03") {
            this.SliTempPopupval = 'Between SAR 375,000 and SAR 1,000,000';
          } else if (this.TempPopupValue == "04") {
            this.SliTempPopupval = 'Between SAR 1,000,000 and SAR 40,000,000';
          } else if (this.TempPopupValue = "05") {
            this.SliTempPopupval = 'Greater than SAR 40,000,000';
          }
        
        }
      }, (error) => {
        this.notifierService.hideOldest();
        var errorString = "";
        this.addNewMemberAmend1FormControls();
          errorString = error.error.error.innererror.errordetails[0].message
        this.notifierService.notify(
          "error",
          errorString
        );
        console.log('error', error);
      });
    }
   console.log("AmendMember1FormGroup",this.AmendMember1FormGroup)
  }
    onLegalTypeSelection(val) {
      this.showlegalTypeValidation = false;
      this.selectedlegaltype = val;
      if(this.selectedlegaltype.toString()=='01' || this.selectedlegaltype.toString()=='05')
      {
        this.showlegalTypeValidation = true;
      }
      if(this.selectedlegaltype.toString()=='30')
      {
        this.AmendMember1FormGroup.addControl('otherText',new FormControl('',[Validators.required]));
      }
      else
      {
        this.AmendMember1FormGroup.removeControl('otherText');
      }
  }
  reqAmendImportOrExportTypeChange(value, type) {
    if (type == 'both') {
      this.IsImporter = value;
      this.IsExporter = value;
      this.ImportExportType = type;
    }
    else if (type == 'none') {
      this.IsImporter = value;
      this.IsExporter = value;
      this.ImportExportType = type;
    }
    else if (type == 'exporter') {
      this.IsImporter = '0';
      this.IsExporter = value;
      this.ImportExportType = type;
    }
    else {
      this.IsImporter = value;
      this.IsExporter = '0';
      this.ImportExportType = type;
    }
  }
  onIdNoChange(value) {
    if (value !== "") {

      let d = this.AmendDeclarationFormGroup.value.date['calendarStart'];

      if(d){
      let ValidateIdNo;
      const IdType = this.AmendDeclarationFormGroup.value.idType;
      if (d.day < 10 && d.day.toString().length == 1) {
        d.day = "0" + d.day;
      }
      if (d.month < 10 && d.month.toString().length == 1) {
        d.month = "0" + d.month;
      }
      let currentdate = "" + d.year + d.month + d.day;
        let obj = {
          type: this.AmendDeclarationFormGroup.value.idType,
          idNumber: this.AmendDeclarationFormGroup.value.idNumber,
        };
        setTimeout(() => {
          this.vatServices.getUserValidation(obj, currentdate).subscribe(data => {
            if (data) {
              ValidateIdNo = data["d"];
                this.AmendDeclarationFormGroup.controls['idNumber'].setValue(ValidateIdNo["Idnum"]);
                let tempContactpersonName="";
                if(ValidateIdNo.Name1 != "" || ValidateIdNo.Name2 != "" || ValidateIdNo.FullName != "")
                {
                  tempContactpersonName = ValidateIdNo.FullName ? ValidateIdNo.FullName : ValidateIdNo.Name1 + ValidateIdNo.Name2;
                  this.AmendDeclarationFormGroup.controls['personName'].disable();
                }
                else{
                  this.AmendDeclarationFormGroup.controls['personName'].enable();
                  this.AmendDeclarationFormGroup.controls['personName'].setValue('');
                }
                this.AmendDeclarationFormGroup.controls['personName'].setValue(tempContactpersonName);
              }
              else {
                this.AmendDeclarationFormGroup.controls['idNumber'].setValue(ValidateIdNo["Idnum"]);
                this.AmendDeclarationFormGroup.controls['personName'].setValue('');
              }
            }, (error) => {
            this.isError = true;
            this.AmendDeclarationFormGroup.controls['personName'].setValue('');
          });
        }, 500);
    }
    }
    else {
      this.declarationPopUpFormGroup.controls['personName'].setValue('');
    }
  }


  ValidateIdNumber() {
    if (this.IdType !== "") {
      let d = this.declarationPopUpFormGroup.value.dateForPopup["calendarStart"];
      if (d.day < 10 && d.day.toString().length == 1) {
        d.day = "0" + d.day;
      }
      if (d.month < 10 && d.month.toString().length == 1) {
        d.month = "0" + d.month;
      }
      let currentdate = "" + d.year + d.month + d.day;
      
      let ValidateIdNo;
      let obj = {
        type: this.AmendDeclarationFormGroup.value.idType,
        idNumber: this.declarationPopUpFormGroup.value.idNumberForPopup,
      };
      setTimeout(() => {
        this.vatServices.getUserValidation(obj, currentdate).subscribe(data => {
          if (data) {
            ValidateIdNo = data["d"];
              this.AmendDeclarationFormGroup.controls['idNumber'].setValue(ValidateIdNo["Idnum"]);
              let tempContactpersonName="";
              if(ValidateIdNo.Name1 != "" || ValidateIdNo.Name2 != "" || ValidateIdNo.FullName != "")
              {
                tempContactpersonName = ValidateIdNo.FullName ? ValidateIdNo.FullName : ValidateIdNo.Name1 + ValidateIdNo.Name2;
                this.AmendDeclarationFormGroup.controls['personName'].disable();
              }
              else{
                this.AmendDeclarationFormGroup.controls['personName'].enable();
                this.AmendDeclarationFormGroup.controls['personName'].setValue('');
              }
              this.AmendDeclarationFormGroup.controls['personName'].setValue(tempContactpersonName);
            }
            else {
              this.AmendDeclarationFormGroup.controls['idNumber'].setValue(ValidateIdNo["Idnum"]);
            }
            $("#declarationPopup").modal('hide');
          }, (error) => {
          this.isError = true;
          this.AmendDeclarationFormGroup.controls['personName'].setValue('');
        });
      }, 500);
    }
    else {
      this.AmendDeclarationFormGroup.controls['personName'].setValue('');
    }
  }

  representlegalTypeChange(value) {
    if (value.toString() == '01' || value.toString() == '05') {
      this.reqAmendVatGroupCardList[0].PersonTp = value;
      this.legalTypeValidationForRepresent = false;
    }
    else {
      this.legalTypeValidationForRepresent = true;
    }
  }
  Close() {
    $('#declarationPopup').modal('hide');
  }
  onInputChangePopup(value: any) {
    const valpop = value.source._value;
    if (valpop >= 10) {
      if (Math.round(valpop / 10) == 1) {
        this.TempPopupValue = "01";
        this.SliTempPopupval = 'Less than SAR 187,500';
      } else if (Math.round(valpop / 10) == 2) {
        this.TempPopupValue = "02";
        this.SliTempPopupval = 'Between SAR 187,500 and SAR 375,000';
      } else if (Math.round(valpop / 10) == 3) {
        this.TempPopupValue = "03";
        this.SliTempPopupval = 'Between SAR 375,000 and SAR 1,000,000';
      } else if (Math.round(valpop / 10) == 4) {
        this.TempPopupValue = "04";
        this.SliTempPopupval = 'Between SAR 1,000,000 and SAR 40,000,000';
      } else if (Math.round(valpop / 10) == 5) {
        this.TempPopupValue = "05";
        this.SliTempPopupval = 'Greater than SAR 40,000,000';
      }
    }
    this.FinalTempPopupVal = this.TempPopupValue;
    this.AmendNewMemberData.VatSupply = this.TempPopupValue;
    return this.SliTempPopupval;
  }

  onInputChange(value: any) {
    const val = value.source._value;
    this.sliderValue = value.source._value;
    if (val >= 10) {
      if (Math.round(val / 10) == 1) {
        this.TempValue = "01";
        this.SliTempval = 'Less than SAR 187,500';
      } else if (Math.round(val / 10) == 2) {
        this.TempValue = "02";
        this.SliTempval = 'Between SAR 187,500 and SAR 375,000';
      } else if (Math.round(val / 10) == 3) {
        this.TempValue = "03";
        this.SliTempval = 'Between SAR 375,000 and SAR 1,000,000';
      } else if (Math.round(val / 10) == 4) {
        this.TempValue = "04";
        this.SliTempval = 'Between SAR 1,000,000 and SAR 40,000,000';
      } else if (Math.round(val / 10) == 5) {
        this.TempValue = "05";
        this.SliTempval = 'Greater than SAR 40,000,000';
      }
    }
    this.FinalTempVal = this.TempValue;
    return this.SliTempval;
  }
  vatpurchase:any;
  amendLessthanOrGreaterthanChange(value) {
    this.vatpurchase=value;
    this.IsGrpEligiblePurchase = value; 
    this.AmendWholeData.VatPuchase= value;
    this.ElgiblePurchaseList.forEach(element => {
      if (value == element.Key) {
        this.EligiblePurchaseName = element.Text;
      }
    });
  }

  onChangeGetDate() {
    setTimeout(() => {
      this.vatServices.requestCreateVRNHSET(this.GPartz, this.Language).subscribe(data => {
        if (data) {
          console.log('GetDateInfo', data["d"]);
          this.DateList = data["d"].EFFDATESet.results;
        }
      }, (error) => {
        console.log('err', error);
      });
    }, 500);
  }

  viewMemClick(val: any) {
    this.viewActnm = val.Actnm;
    this.viewGpart = val.Gpart;
    this.viewAddress = val.BuildingNo + ' ' + val.Street + ' ' + val.Quarter + ' ' + val.RegionDesc + ' ' + val.City + ' ' + val.PostalCd;
    this.viewLicense = val.LicenseCrno;
    this.viewAccount = val.Account;

    for (let x = 0; x < this.ElgibleSupplieList.length; x++) {
      if (val.VatSupply == this.ElgibleSupplieList[x].Key) {
        this.viewSupp = this.ElgibleSupplieList[x].Text;
      }
    }
    for (let i = 0; i < this.ElgiblePurchaseList.length; i++) {
      if (val.VatPuchase == this.ElgiblePurchaseList[i].Key) {
        this.viewPur = this.ElgiblePurchaseList[i].Text;
      }
    }
    for (let w = 0; w < this.LegalTypeList.length; w++) {
      if (val.PersonTp == this.LegalTypeList[w].Key) {
        this.viewLegalPer = this.LegalTypeList[w].Text;
      }
    }

    if (val.Exporter == "1" && val.Importer == "0") {
      this.viewImEx = "Exporter";
    }
    else if (val.Exporter == "0" && val.Importer == "1") {
      this.viewImEx = "Importer";
    }
    else if (val.Exporter == "1" && val.Importer == "1") {
      this.viewImEx = "Exporter & Importer";
    }
    else {
      this.viewImEx = "Non of the above";
    }
    $('#viewMember').modal('show');

  }

  mainDataFetchingDetails() {
    this.vatServices.requestCreateVRNHSET(this.GPartz, this.Language).subscribe(data => {
      if (data) {
        console.log('amend-list-data', data["d"]);
        this.AmendWholeData = data["d"];
        this.reqAmendVatGroupCardList = data["d"].TABLESet.results;

        // for (let k = 0; k < this.AmendVatGroupCardList.length; k++) {
        //   let legalType = this.LegalTypeList.filter(tt => tt.Key == this.AmendVatGroupCardList[k].PersonTp);
        //   if (legalType.length > 0) {
        //     this.AmendVatGroupCardList[k]['PersonType'] = legalType[0].Text;
        //     this.LegalPersonName = legalType[0].Text;
        //     this.LegalTypeNewuserList.push(legalType[0].Text);
        //   } else {
        //     this.AmendVatGroupCardList[k]['PersonType'] = "";
        //   }
        // }
        for (let j = 0; j < this.LegalTypeList.length; j++) {
          for (let k = 0; k < this.reqAmendVatGroupCardList.length; k++) {
            if (this.reqAmendVatGroupCardList[k].PersonTp == this.LegalTypeList[j].Key) {
              this.LegalPersonName = this.LegalTypeList[j].Text;
              this.LegalTypeNewuserList.push(this.LegalTypeList[j].Text);
            }
          }
        }

        this.representativeLegalPID = this.reqAmendVatGroupCardList[0].PersonTp;
        console.log('amend-list-data1', this.reqAmendVatGroupCardList);
      } else {
        console.log('error');
      }
    }, (error) => {
      console.log('err', error);
    });
  }
  
  downloadFile(url)
  {
    window.open(url,"_blank")
  }
  amendRegisterTypeChange(value) {
    this.VATGroupRegisterType = value;
  }

  amendImportOrExportValueChange() {
    if (this.IsImporter == '1' && this.IsExporter == '1') {
      this.ImportExportType = 'both';
    }
    else if (this.IsImporter == '0' && this.IsExporter == '0') {
      this.ImportExportType = 'none';
    }
    else if (this.IsExporter == '1' || this.IsExporter == '0') {
      this.ImportExportType = 'exporter';
    }
    else {
      this.ImportExportType = 'importer';
    }
  }

  amendImportOrExportTypeChange(value, type) {
    if (type == 'both') {
      this.IsImporter = value;
      this.IsExporter = value;
      this.ImportExportType = type;
    }
    else if (type == 'none') {
      this.IsImporter = value;
      this.IsExporter = value;
      this.ImportExportType = type;
    }
    else if (type == 'exporter') {
      this.IsImporter = '0';
      this.IsExporter = value;
      this.ImportExportType = type;
    }
    else {
      this.IsImporter = value;
      this.IsExporter = '0';
      this.ImportExportType = type;
    }
  }

  /* Step 1 starts here */
  vatGroupRegistrationDetails() {
    this.vatServices.requestCreateVRUIHDRSET(this.GPartz, this.Language).subscribe(data => {
      if (data) {
        console.log('amend-ui-data', data["d"]);
      //  this.AmendAttachmentSelectList = data["d"].ELGBL_DOCSet.results;
      this.VatGroupRegisterAttachmentSelectList = data["d"].ELGBL_DOCSet.results.filter(item => (item.Txt50 != "Both Documents")); 
      }
    }, (error) => {
      console.log('err', error);
    });
  }

  ContinueFirstScreen() {
    this.mainDataFetchingDetails();
    this.step2();
   
  }
  /* Step 1 ends here */

  /* Step 2 starts here */
  amendMemberRegisteredDetails() {
    this.instructionsAmendFormControls();
    setTimeout(() => {
      this.infoModal.nativeElement.click();
      $('#infoModal').modal('show');
    }, 1000);
    this.addNewMemberAmend1FormControls();
    this.addNewMemberAmend3FormControls();
  }

  termsAndConditionsOfInstructionAcceptance() {
    $('#infoModal').modal('hide');
  }

  addMember() {
    this.isMemberAdd = true;
    this.showlegalTypeValidation = false;
    this.AmendMember1FormGroup.controls['address'].disable({ onlySelf: true });
    this.AmendMember1FormGroup.controls['license'].disable({ onlySelf: true });
    this.AmendMember1FormGroup.controls['vatAccount'].disable({ onlySelf: true });
    this.AmendMember1FormGroup.reset();
    this.addNewMemberAmend1FormControls();
    $('#addMember1').modal('show');
  }
  editMemberDetails(editMember, i) {  
    let tempmemberObj = editMember;
    console.log("editMember",editMember);
    this.selectedEditMemberIndex = i;
    this.isMemberAdd = false; 
    this.vatServices.requestOneMemberGroup(editMember.Gpart, this.GPartz).subscribe(data => {
      if (data) {
        console.log('NewMember-data', data["d"]);
        this.AmendNewMemberData = data["d"];
        this.selectedMemberVatSupply = this.AmendNewMemberData['VatSupply'];
        this.selectedMemberVatPurchase =  this.AmendNewMemberData['VatPuchase'];
        console.log(this.AmendNewMemberData);
        let addSet = this.AmendNewMemberData.BuildingNo + ' ' + this.AmendNewMemberData.Street + ' ' + this.AmendNewMemberData.Quarter + ' ' + this.AmendNewMemberData.RegionDesc + ' ' + this.AmendNewMemberData.City + ' ' + this.AmendNewMemberData.PostalCd;
       // let addSet = this.AmendNewMemberData.BuildingNo !== "" && this.AmendNewMemberData.Street !== "" && this.AmendNewMemberData.Quarter !== "" && this.AmendNewMemberData.RegionDesc !== "" && this.AmendNewMemberData.City !== "" && this.AmendNewMemberData.PostalCd !== "" ? `${this.AmendNewMemberData.BuildingNo} ${this.AmendNewMemberData.Street} ${this.AmendNewMemberData.Quarter} ${this.AmendNewMemberData.RegionDesc} ${this.AmendNewMemberData.City} ${this.AmendNewMemberData.PostalCd}` : '';
        this.AmendMember1FormGroup.controls['address'].setValue(addSet);
        this.AmendMember1FormGroup.controls['address'].disable();
        this.AmendMember1FormGroup.controls['license'].setValue(this.AmendNewMemberData.LicenseCrno);
        this.AmendMember1FormGroup.controls['license'].disable();
        this.AmendMember1FormGroup.controls['vatAccount'].setValue(this.AmendNewMemberData.Account);
        this.AmendMember1FormGroup.controls['vatAccount'].disable();
        if (this.AmendNewMemberData.Account != "") {
          this.AmendMember1FormGroup.controls['vatAccount'].setValue(`${this.AmendNewMemberData.Account}`);
          this.AmendMember1FormGroup.controls['vatAccount'].disable({ onlySelf: true });
        } else {
          this.AmendMember1FormGroup.controls['vatAccount'].setValue('');
          this.AmendMember1FormGroup.controls['vatAccount'].enable({ onlySelf: true });
        }
        this.AmendMember3FormGroup.patchValue({ 'suppliesResult': ((+this.AmendNewMemberData.VatSupply) * 10).toString() });
        this.TempPopupValue = this.AmendNewMemberData.VatSupply;
        if (this.TempPopupValue == "01") {
          this.SliTempPopupval = 'Less than SAR 187,500';
        } else if (this.TempPopupValue == "02") {
          this.SliTempPopupval = 'Between SAR 187,500 and SAR 375,000';
        } else if (this.TempPopupValue == "03") {
          this.SliTempPopupval = 'Between SAR 375,000 and SAR 1,000,000';
        } else if (this.TempPopupValue == "04") {
          this.SliTempPopupval = 'Between SAR 1,000,000 and SAR 40,000,000';
        } else if (this.TempPopupValue = "05") {
          this.SliTempPopupval = 'Greater than SAR 40,000,000';
        }

        if(this.selectedMemberVatSupply == '' && this.selectedMemberVatPurchase == '' )
        {
          this.AmendNewMemberData.Importer = tempmemberObj.Importer;
          this.AmendNewMemberData.Exporter = tempmemberObj.Exporter;
          this.AmendNewMemberData.Exporter = tempmemberObj.Exporter;
          this.AmendNewMemberData.Exporter = tempmemberObj.Exporter;
          this.AmendMember3FormGroup.patchValue({'suppliesResult':((+tempmemberObj.VatSupply)*10).toString()});
          this.AmendNewMemberData.VatPuchase = tempmemberObj.VatPuchase;
        }
        
      }
    }, (error) => {
      this.notifierService.hideOldest();
      var errorString = "";
      this.addNewMemberAmend1FormControls();
      if (error.error.error.innererror.errordetails.length >= 2) {
        for (var i = 0; i < error.error.error.innererror.errordetails.length - 1; i++) {
          errorString = errorString + error.error.error.innererror.errordetails[i].message
        }
      }
      else {
        this.addNewMemberAmend1FormControls();
        errorString = error.error.error.innererror.errordetails[0].message
      }
      this.notifierService.notify(
        "error",
        errorString
      );
      console.log('error', error);
    });
    this.onLegalTypeSelection(editMember.PersonTp);
    if (editMember.PersonTp == '30') {
      this.AmendMember1FormGroup.controls['otherText'].setValue(editMember.otherText);
      if (editMember.otherText == '') {
        this.AmendMember1FormGroup.addControl('otherText', new FormControl('', [Validators.required]));
      }
    }
    else {
      this.AmendMember1FormGroup.removeControl('otherText');
    }
    this.AmendMember1FormGroup.controls['legalPerson'].reset();
    this.AmendMember1FormGroup.value.legalPerson = editMember.PersonTp;
    this.AmendMember1FormGroup.controls['legalPerson'].setValue(editMember.PersonTp);
    $('#addMember1').modal('show');
  }
  SaveMemberContinue() {
    this.reqAmendVatGroupCardList[this.selectedEditMemberIndex].PersonTp = this.AmendMember1FormGroup.value.legalPerson;
    this.reqAmendVatGroupCardList[this.selectedEditMemberIndex].legalPerson = this.AmendMember1FormGroup.value.legalPerson;
    this.reqAmendVatGroupCardList[this.selectedEditMemberIndex].otherText = this.AmendMember1FormGroup.value.otherText;
    this.LegalTypeNewuserList[this.selectedEditMemberIndex] = this.LegalTypeList.filter(x => x.Key == this.AmendMember1FormGroup.value.legalPerson).map(y => y.Text);
    $('#addMember1').modal('hide');
    $('#addMember3').modal('hide');
  }
  deleteAmend(index) {
    this.delGrpIndex = index;
    if (this.reqAmendVatGroupCardList.length == 2) {
      this.notifierService.notify(
        "warning",
        `${this.lang.step2.DelPopupModal.t4}`
      );
    } else {
      $('#delPopupModal').modal('show');
    }

  }
  delOk() {
    this.reqAmendVatGroupCardList.splice(this.delGrpIndex, 1);
    $('#delPopupModal').modal('hide');
  }
  delCancel() {
    $('#delPopupModal').modal('hide');
  }
  datePickerValue(value) {
    if (value !== undefined && value !== null && value !== "") {
      let day = value.calendarStart.day;
      let month = value.calendarStart.month;
      let year = value.calendarStart.year;
      day = day < 10 ? `0${day}` : day;
      month = month < 10 ? `0${month}` : month;
      const convertedDate = `${year}-${month}-${day}T00:00:00`;
      return convertedDate;
    } else {
      return null;
    }
  }
  addMember1Continue() {
    $('#addMember1').modal('hide');
    $('#addMember2').modal('show');
  }

  addMember2Continue() {
    $('#addMember2').modal('hide');
    $('#addMember3').modal('show');
  }

  addMember3Continue() {
    this.disableFinancialblock = false;
    this.AmendNewMemberData['isNew'] = true;
    this.AmendNewMemberData.PersonTp=this.AmendMember1FormGroup.value.legalPerson;
    this.AmendNewMemberData.legalPerson=this.AmendMember1FormGroup.value.legalPerson;
    this.AmendNewMemberData.otherText=this.AmendMember1FormGroup.value.otherText;
    this.LegalTypeNewuserList.push(this.LegalTypeList.filter(x=>x.Key == this.AmendMember1FormGroup.value.legalPerson).map(y=>y.Text)[0]);
    this.reqAmendVatGroupCardList.push(this.AmendNewMemberData);
    console.log("AmendNewMemberData",this.AmendNewMemberData);
    console.log("card-lsit",this.reqAmendVatGroupCardList);
    console.log(this.reqAmendVatGroupCardList);
    if(this.reqAmendVatGroupCardList.filter(y=>y.VatSupply == "05").length)
    {
      this.AmendMember3FormGroup.patchValue({'supplie':50});
      this.TempValue="05";
      if (this.TempValue == "01") {           
        this.SliTempval = 'Less than SAR 187,500';
      } else if (this.TempValue == "02") {
        this.SliTempval = 'Between SAR 187,500 and SAR 375,000';
      } else if (this.TempValue == "03") {
        this.SliTempval = 'Between SAR 375,000 and SAR 1,000,000';
      } else if (this.TempValue == "04") {            
        this.SliTempval = 'Between SAR 1,000,000 and SAR 40,000,000';
      } else if (this.TempValue = "05") {
        this.SliTempval = 'Greater than SAR 40,000,000';
      }
      this.disableFinancialblock = true;
      console.log("reqAmendVatGroupCardList",this.reqAmendVatGroupCardList);
    }
    $('#addMember3').modal('hide');
  }

  editStep2() {
    this.AmendInstructionFormGroup = new FormGroup({
      agree: new FormControl(this.AmendAddMemberModel.Agree, [Validators.required])
    });
    this.AmendMember1FormGroup = new FormGroup({
      tin: new FormControl(this.AmendAddMemberModel.Tin, [Validators.required, Validators.pattern(this.NumberPattern), Validators.minLength(10), Validators.maxLength(10)]),
      address: new FormControl(this.AmendAddMemberModel.Address, [Validators.required]),
      license: new FormControl(this.AmendAddMemberModel.license, [Validators.required]),
      vatAccount: new FormControl(this.AmendAddMemberModel.VatAccount, [Validators.required, Validators.pattern(this.NumberPattern), Validators.minLength(10), Validators.maxLength(10)]),
      legalPerson: new FormControl(this.AmendAddMemberModel.LegalPerson, [Validators.required])
    });
    this.AmendMember3FormGroup = new FormGroup({
      suppliesResult: new FormControl(this.AmendAddMemberModel.Supplies, [Validators.required]),
      purchases: new FormControl(this.AmendAddMemberModel.Purchases, [Validators.required])
    });
  }

  secondModelData() {
    const VatGroupInstructions = this.AmendInstructionFormGroup.value;
    const VatGroupAddMember1 = this.AmendMember1FormGroup.value;
    const VatGroupAddMember3 = this.AmendMember3FormGroup.value;

    this.AmendAddMemberModel.Agree = VatGroupInstructions.agree;
    this.AmendAddMemberModel.Tin = VatGroupAddMember1.tin;
    this.AmendAddMemberModel.Address = VatGroupAddMember1.address;
    this.AmendAddMemberModel.license = VatGroupAddMember1.license;
    this.AmendAddMemberModel.VatAccount = VatGroupAddMember1.vatAccount;
    this.AmendAddMemberModel.LegalPerson = VatGroupAddMember1.legalPerson;
    this.AmendAddMemberModel.Supplies = VatGroupAddMember3.supplies;
    this.AmendAddMemberModel.Purchases = VatGroupAddMember3.purchases;

    return this.AmendAddMemberModel;
  }

  ContinueSecondScreen() {
    const obj2 = this.secondModelData();
    console.log('amend-initial', obj2);
    this.step3();
    if(this.reqAmendVatGroupCardList.filter(y=>y.VatSupply == "05").length)
        {
          this.TempValue="05";
          if (this.TempValue == "01") {           
            this.SliTempval = 'Less than SAR 187,500';
          } else if (this.TempValue == "02") {
            this.SliTempval = 'Between SAR 187,500 and SAR 375,000';
          } else if (this.TempValue == "03") {
            this.SliTempval = 'Between SAR 375,000 and SAR 1,000,000';
          } else if (this.TempValue == "04") {            
            this.SliTempval = 'Between SAR 1,000,000 and SAR 40,000,000';
          } else if (this.TempValue = "05") {
            this.SliTempval = 'Greater than SAR 40,000,000';
          }
          this.AmendFinancialInformationFormGroup.patchValue({'supplie':((+5)*10)});
          this.AmendWholeData.AggreSupply = "05"
          this.disableFinancialblock = true;
        }
  }
  /* Step 2 ends here */

  /* Step 3 starts here */

  amendFinancialInfoFormControls() {
    this.AmendFinancialInformationFormGroup = new FormGroup({
      effectiveDate: new FormControl('', [Validators.required]),
      supplie:new FormControl('')
    });
  }
  effDate: any;
  editStep3() {
    for (let q = 0; q < this.DateList.length; q++) {
      if (this.AmendFinancialModel.EffectiveDate == this.DateList[q].Persl) {
        this.effDate = this.DateList[q].Persl;
      }
    }
    this.AmendFinancialInformationFormGroup.controls['effectiveDate'].setValue(this.effDate);
    this.Step = 3;
  }

  thirdModelData() {
    const VatGroupFinancial = this.AmendFinancialInformationFormGroup.value;
    this.AmendFinancialModel.EligibleSupplie = this.SliTempval;
    this.AmendFinancialModel.EligiblePurchase = this.IsGrpEligiblePurchase;
    this.AmendFinancialModel.EffectiveDate = VatGroupFinancial.effectiveDate;
    for (let q = 0; q < this.DateList.length; q++) {
      if (VatGroupFinancial.effectiveDate == this.DateList[q].Persl) {
        this.vieweffectivedate = this.DateList[q];
      }
    }
    return this.AmendFinancialModel;
  }

  ContinueThirdScreen() {
    const obj3 = this.thirdModelData();
    console.log('amend-financial', obj3);
    this.step4();
  }
  /* Step 3 ends here */

  /* Step 4 starts here */
   vatGroupRegisterAttachmentFormControls() {
    if (this.VatGroupRegisterAttachFiles.length > 0) {
      let attachFiles = this.VatGroupRegisterAttachmentsFormGroup.get("attachControls") as FormArray
      for (let i = 0; i > this.VatGroupRegisterAttachFiles.length; i++) {
        attachFiles.controls['i'].controls['attachmentType'].setValue(this.VatGroupRegisterAttachFiles[i][0].docType);
      }
      console.log('attachRow', attachFiles);
    }
    else {
      this.VatGroupRegisterAttachmentsFormGroup = this.formBuilder.group({
        attachControls: this.formBuilder.array([])
      });
    }

    if (this.vatGroupRegisterAttachRowControls().length == 0) {
      this.vatGroupRegisterAddAttachmentRow();
    }
  }

  vatGroupRegisterAttachRowControls(): FormArray {
    return this.VatGroupRegisterAttachmentsFormGroup.get("attachControls") as FormArray
  }

  vatGroupRegisterAddAttachmentRow() {
    this.vatGroupRegisterAttachRowControls().push(this.createVatGroupRegisterAttachmentFormControls());
    console.log(this.vatGroupRegisterAttachRowControls());
  }

  createVatGroupRegisterAttachmentFormControls(): FormGroup {
    return this.formBuilder.group({
      attachmentType: this.formBuilder.control('', [Validators.required])
    });
  }

  deleteVatGroupRegisterAttachmentRow(i) {
    let control = <FormArray>this.VatGroupRegisterAttachmentsFormGroup.controls.attachControls;
    if (this.vatGroupRegisterAttachRowControls().length > 1) {
      control.removeAt(i);
      this.VatGroupRegisterAttachFiles.splice(i, 1);
    }
  }

  deleteVatGroupRegisterAttachment(j, i) {
    this.VatGroupRegisterAttachFiles[i].splice(j, 1);
  }


  uploadVatGroupRegisterFile(event, k) {
    let AttachType = this.vatGroupRegisterAttachRowControls().at(k).value.attachmentType;
    let AttachTypeName;
    for (let b = 0; b < this.VatGroupRegisterAttachmentSelectList.length; b++) {
      if (AttachType == this.VatGroupRegisterAttachmentSelectList[b].DmsTp) {
        AttachTypeName = this.VatGroupRegisterAttachmentSelectList[b].Txt50;
      }
    }
    var obj = { name: '', size: 0, type: '', docType: '', attachTypeName: '', url: '', did: '',DocUrl:'',Doguid:'' };
    for (let i = 0; i < event.length; i++) {
      const element = event[i];
      obj.name = element.name.split(".")[0];
      obj.size = element.size;
      obj.type = element.name.split(".")[1];
      obj.docType = AttachType;
      obj.attachTypeName = AttachTypeName;
      if (obj.name != '' && obj.type != '' && obj.docType != '' && obj.attachTypeName != '') {
        if (obj.type.toLowerCase() == 'doc' || obj.type.toLowerCase() == 'docx' || obj.type.toLowerCase() == 'xlsx' || obj.type.toLowerCase() == 'xls' || obj.type.toLowerCase() == 'pdf' || obj.type.toLowerCase() == 'jpg' || obj.type.toLowerCase() == 'jpeg'|| obj.type.toLowerCase() == 'png') {
          if ( element.size <= 5242880) {
            if (!this.VatGroupRegisterAttachFiles[k]) {
              
              let fileName;
              let docType;

              fileName = `${obj.name}.${obj.type}`;
              docType = obj.docType;

              const frmData = new FormData();
              frmData.append("fileUpload", event);
              this.vatServices.postAttachmentDetails(this.AmendWholeData.ReturnIdz, docType, fileName, frmData).subscribe((data: any) => {
               obj.DocUrl= data["d"]['DocUrl'];
               obj.Doguid= data["d"]['Doguid'];
                this.VatGroupRegisterAttachFiles.push([obj]);
              console.log('AttachFiles', this.VatGroupRegisterAttachFiles);

                this.myInputVariable.nativeElement.value = '';
              },
                err => {
                this.myInputVariable.nativeElement.value = '';
                  console.error(err);
                  this.notifierService.notify(
                    "error",
                    err.error.error.innererror.errordetails[0].message
                  );
                });
            }
            else {
              this.myInputVariable.nativeElement.value = '';
              this.VatGroupRegisterAttachFiles[k].push(obj);
            }
          }
          else {
            this.myInputVariable.nativeElement.value = '';
            $("#errorInstructions").modal("show");
          }
        }
        else {
          this.myInputVariable.nativeElement.value = '';
          $("#errorInstructions").modal("show");
        }

      }
    }
    //   }
    // }
    // this.myInputVariable.nativeElement.value = '';
  }


  uploadVatGroupRegisterFiles() {
    const frmData = new FormData();
    let fileName;
    let docType;
    for (var i = 0; i < this.VatGroupRegisterAttachFiles.length; i++) {
      fileName = `${this.VatGroupRegisterAttachFiles[i][0]["name"]}.${this.VatGroupRegisterAttachFiles[i][0]["type"]}`;
      docType = this.VatGroupRegisterAttachFiles[i][0]["docType"];
      frmData.append("fileUpload", this.VatGroupRegisterAttachFiles[i][0]);
    }
    console.log("res", fileName);
    this.vatServices.postAttachmentDetails(this.AmendWholeData.ReturnIdz, docType, fileName, frmData).subscribe(data => {
      if (data) {
        console.log('attch-data', data["d"]);
        for (let h = 0; h < this.VatGroupRegisterAttachFiles.length; h++) {
          if (this.VatGroupRegisterAttachFiles[h][0].url == '') {
            this.VatGroupRegisterAttachFiles[h][0].url = data["d"]["DocUrl"];
            this.VatGroupRegisterAttachFiles[h][0].did = data["d"]["Doguid"];
          }
        }
      }
    });
  }
  AttachmentTypeChange(i,event)
  { 
    let count=0;   
    for(let i=0;i<this.VatGroupRegisterAttachmentsFormGroup.get('attachControls')['controls'].length;i++)
    {
      if(this.VatGroupRegisterAttachmentsFormGroup.get('attachControls')['controls'][i].value.attachmentType==event.target.value)
      {
        count++;
      }
    }
    
    console.log("count",count);
    if(count==2)
    {
      this.VatGroupRegisterAttachmentsFormGroup.get('attachControls')['controls'][i].patchValue({'attachmentType':null});
    }
  }




      

   

  editStep4() {
    this.Step = 4;
  }

  ContinueFourthScreen() {
    this.step5();
  }
  /* Step 4 ends here */

  /* Step 5 starts here */
  amendDeclarationFormControls() {
    if (this.AmendDeclarationModel && this.AmendDeclarationModel.IdType !== undefined) {
      this.AmendDeclarationFormGroup.controls['idType'].setValue(this.AmendDeclarationModel.IdType);
      this.AmendDeclarationFormGroup.controls['idNumber'].setValue(this.AmendDeclarationModel.IdNumber);
      this.AmendDeclarationFormGroup.controls['date'].setValue(this.AmendDeclarationModel.Date);
      this.AmendDeclarationFormGroup.controls['personName'].setValue(this.AmendDeclarationModel.contactName);

    } else {
      this.AmendDeclarationFormGroup = new FormGroup({
        idType: new FormControl('', [Validators.required]),
        idNumber: new FormControl('', [Validators.required, Validators.pattern(this.NumberPattern), Validators.minLength(8), Validators.maxLength(15)]),
        date: new FormControl(this.CurrentDate),
        personName: new FormControl('', [Validators.required, Validators.pattern(this.StringPattern)])
      });
    }
    this.declarationPopUpFormGroup = new FormGroup({
      idNumberForPopup: new FormControl('', [Validators.required]),
      dateForPopup: new FormControl(this.CurrentDate, [Validators.required])
    });
  }

  editStep5() {
    this.AmendDeclarationFormGroup.controls['idType'].setValue(this.AmendDeclarationModel.IdType);
    this.AmendDeclarationFormGroup.controls['idNumber'].setValue(this.AmendDeclarationModel.IdNumber);
    this.AmendDeclarationFormGroup.controls['date'].setValue(this.CurrentDate);
    this.AmendDeclarationFormGroup.controls['personName'].setValue(this.AmendDeclarationModel.contactName);
    this.Step = 5;
  }

  fifthModelData() {
    const VatGroupDeclaration = this.AmendDeclarationFormGroup.getRawValue();
    this.AmendDeclarationModel.IdType = VatGroupDeclaration.idType;
    this.AmendDeclarationModel.IdNumber = VatGroupDeclaration.idNumber;
    this.AmendDeclarationModel.contactName = VatGroupDeclaration.personName;
    this.AmendDeclarationModel.Date = moment(VatGroupDeclaration.date).format("YYYY-MM-DDT00:00:00");
    this.AmendDeclarationModel.Date = VatGroupDeclaration.date.leaseDate !== undefined && VatGroupDeclaration.date !== null && VatGroupDeclaration.date !== "" && VatGroupDeclaration.date !== "Invalid date" ? this.datePickerValue(VatGroupDeclaration.date) : this.CurrentDate.toISOString().slice(0, 19);
    this.AmendDeclarationModel.Agree = VatGroupDeclaration.agree;
    return this.AmendDeclarationModel;
  }

  ContinueFifthScreen() {
    const obj5 = this.fifthModelData();
    console.log('amend-declaration', obj5);
    this.step6();
  }
  /* Step 5 ends here */

  /* Step 6 starts here */
  tableSetjsonObject() {
    let tempArray=[];
    
    this.reqAmendVatGroupCardList.forEach(element => {
      this.vatpurchase=element.VatPuchase;
      tempArray.push({
        "Actnm": element.Actnm,
        "Account": element.Account,
        "AdditionalNo": "",
        "Addrnumber": "",
        "AggrePurchase": "",
        "AggreSupply": "",
        "Articleatt": false,
        "Bothatt": false,
        "BuildingNo": element.BuildingNo,
        "City": element.City,
        "DataVersion": "00000",
        "Exporter": element.Exporter,
        "ExporterFg": true,
        "FormGuid": "",
        "Gpart": element.Gpart,
        "Importer": element.Importer,
        "ImporterFg": true,
        "LicenseCrno": element.LicenseCrno,
        "Mandt": "",
        "Memoatt": false,
        "Otheratt": false,
        "OtherTp": element.otherText ? element.otherText:"",
        "PersonTp": element.PersonTp,
        "PostalCd": element.PostalCd,
        "PurchaseFg": true,
        "Quarter": element.Quarter,
        "RegDt": null,
        "Region": "",
        "RegionDesc": element.RegionDesc,
        "Srcidentify": "0001",
        "Street": element.Street,
        "SupplyFg": true,
        "TpDescr": "",
        "Tpstat": element?.Tpstat,
        "VatPuchase": element.VatPuchase,
        "VatSupply": element.VatSupply});
    });
        return tempArray;
  } 
  amendSummaryDetails() { 
    this.AmendWholeData.AgrFg = "1";
    this.AmendWholeData.TABLESet = this.tableSetjsonObject(); 
    this.AmendWholeData.VatSupply = this.TempValue;
   this.AmendWholeData.VatPuchase = this.vatpurchase;
  //  this.AmendWholeData.Persl = this.AmendFinancialModel.EffectiveDate;
    //this.AmendWholeData.DmsTp="";
    this.AmendWholeData.AggreSupply;
    this.AmendWholeData.AggrePurchase;
    this.AmendWholeData.Decfg = "1";
    this.AmendWholeData.DecidTy = this.AmendDeclarationModel.IdType;
    this.AmendWholeData.DecidNo = this.AmendDeclarationModel.IdNumber;
    this.AmendWholeData.Decname = this.AmendDeclarationModel.contactName;
    this.AmendWholeData.UserTypz = "TP"
    this.AmendWholeData.Persl  = this.vieweffectivedate.Persl  ? this.vieweffectivedate.Persl :"" ;
    this.AmendWholeData.RegDt  = this.vieweffectivedate.Abrzu  ? this.vieweffectivedate.Abrzu :null ;
    this.AmendWholeData.Txt50  = this.vieweffectivedate.Txt50  ? this.vieweffectivedate.Txt50 :"" ; 
    return this.AmendWholeData;
  }

  ContinueSixthScreen() {
    // const obj6 = this.amendSummaryDetails();
    // console.log('amend-summary', obj6);
    this.amendSummaryDetails();
    this.AmendWholeData.Operationz = '01';
    console.log('amend-whole-data-save', this.AmendWholeData);
    this.vatServices.saveVatAmendRegisterDetails(this.AmendWholeData).subscribe(data => {
      if (data) {
        console.log('final-submit', data["d"]);
        this.application = data["d"].Fbnumz;
        this.step7();
      }
    });

  }
  /* Step 6 ends here */

  /* Step 7 starts here */
  downloadAck()
  {
    this.vatServices.downloadfilledform(this.application).subscribe((data: any) => {
      FileSaver.saveAs(data, "Acknowledgement.pdf");
    }, (error) => {
      console.log('err-2', error);
    }); 
  }
  ContinueDashboardScreen() {
    this.mainDataFetchingDetails();
    this.Step = 1;
  }
  amendAcknowledgementDetails() {

  }
  /* Step 7 ends here */

  instructionsAmendFormControls() {
    this.AmendInstructionFormGroup = new FormGroup({
      agree: new FormControl('', [Validators.required])
    });
  }

  addNewMemberAmend1FormControls() {
    this.AmendMember1FormGroup = new FormGroup({
      tin: new FormControl('', [Validators.required, Validators.pattern(this.NumberPattern), Validators.minLength(10), Validators.maxLength(10)]),
      address: new FormControl('', [Validators.required]),
      license: new FormControl('', [Validators.required]),
      vatAccount: new FormControl('', [Validators.required, Validators.pattern(this.NumberPattern), Validators.minLength(10), Validators.maxLength(10)]),
      legalPerson: new FormControl('', [Validators.required])
    });
  }

  addNewMemberAmend3FormControls() {
    this.AmendMember3FormGroup = new FormGroup({
      suppliesResult: new FormControl('', [Validators.required]),
      purchases: new FormControl('', [Validators.required])
    });
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

  back5() {
    this.Step = 5;
  }

  back6() {
    this.Step = 6;
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

  step7() {
    this.Step = 7;
    this.stepsChecking();
  }

}

export class AmendAddMemberModel {
  Agree: boolean;
  Tin: string;
  Address: string;
  license: string;
  VatAccount: string;
  Importer: string;
  Exporter: string;
  LegalPerson: string;
  Supplies: string;
  Purchases: string;
}
export class AmendFinancialModel {
  EligibleSupplie: string;
  EligiblePurchase: string;
  EffectiveDate: string;
}
export class AmendDeclarationModel {
  IdType: string;
  IdNumber: string;
  Date: string;
  contactName: string;
  Agree: boolean;
}