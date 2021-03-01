import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import * as moment from 'moment';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { VatServicesService } from '../vat-services.service';
import { vatgroupregistrationconstants } from "src/app/main/vat-services/vatgroup-registration-app/vatgroup-registrationconstants.model";
import { NotifierService } from 'angular-notifier';
import * as FileSaver from 'file-saver';

declare var $;
@Component({
  selector: 'app-vatgroup-registration-app',
  templateUrl: './vatgroup-registration-app.component.html',
  styleUrls: ['./vatgroup-registration-app.component.css']
})
export class VatgroupRegistrationAppComponent implements OnInit {
  @ViewChild('fileInput') myInputVariable: ElementRef;	

  @ViewChild('infoModal', { static: false }) infoModal: ElementRef;
  @ViewChild('viewMember', { static: false }) viewmember: ElementRef;
  @ViewChild('addMember1', { static: false }) addmember1: ElementRef;
  @ViewChild('addMember2', { static: false }) addmember2: ElementRef;
  @ViewChild('addMember3', { static: false }) addmember3: ElementRef;

  StringPattern = "^[a-zA-Z\u0600-\u06FF ][sa-zA-Z\u0600-\u06FF ]*$";
  NumberPattern = "^[0-9]*$";
  ContactNoPattern = "[5][0-9]{8}";

  VatGroupRegisterInstructionFormGroup: FormGroup = new FormGroup({});
  VatGroupRegisterMember1FormGroup: FormGroup = new FormGroup({});
  VatGroupRegisterMember3FormGroup: FormGroup = new FormGroup({});
  VatGroupRegisterFinancialInformationFormGroup: FormGroup = new FormGroup({});
  VatGroupRegisterAttachmentsFormGroup: FormGroup = new FormGroup({});
  VatGroupRegisterDeclarationFormGroup: FormGroup = new FormGroup({});
  declarationPopUpFormGroup:FormGroup=new FormGroup({});

  GPartz: any;
  Direction: string;
  Language: string;
  Step: any = 0;
  CurrentDate = new Date();
  LegalTypeList: any;
  ElgibleSupplieList: any;
  ElgiblePurchaseList: any;
  IdTypeList: any;
  IsImporter: string = '0';
  IsExporter: string = '0';
  ImportExportType: string;
  VatGroupRegisterVatGroupCardList: any;
  IsEligiblePurchase: string = '01';
  IsGrpEligiblePurchase: string = '01';
  VatGroupRegisterAttachmentSelectList: any;
  VatGroupRegisterAttachFiles: any[] = [];
  VatGroupRegisterIdTypeName: any;
  DraftList: any;
  VatGroupwholeData: any;
  DateList: any;
  VatGroupNewMemberData: any;
  LegalTypeNewuser: any;
  viewAddress: any;
  viewAccount: any;
  viewLicense: any;
  viewImEx: any;
  viewActnm: any;
  viewGpart: any;
  viewSupp: any;
  viewPur: any;
  viewLegalPer: any;
  TempValue: any;
  FinalTempVal: string = '01';
  SliTempval: string = 'Less than SAR 187,500';
  TempPopupValue: any;
  FinalTempPopupVal: string = '01';
  SliTempPopupval: string = 'Less than SAR 187,500';
  VatGroupRegisterwholeData: any;
  Keyvalueseletion: any;
  EligiblePurchaseName: string = 'Less than SAR 187,500';

  VatGroupAddMemberModel = new VatGroupAddMemberModel();
  VatGroupFinancialModel = new VatGroupFinancialModel();
  VatGroupDeclarationModel = new VatGroupDeclarationModel();
  viewfindate: any;
  vieweffectivedate: any;
  selectedOption: any;
  Newmembertin: any;
  application: any;
  isAttachmentType: boolean = false;
  editing: boolean = false;
  selectedlegaltype: any;
  lang: any;
  direction: string;
  LegalTypeNewuserList:any=[];
  IdType:any;
  isError:boolean=false;

  //Sunil
  isMemberAdd:boolean=true;
  selectedDeleteMemberIndex:number=-1;
  selectedEditMemberIndex:number=-1;
  showlegalTypeValidation:boolean=false;
  disableFinancialblock:boolean =false;
  representativeLegalPID:any;
  legalTypeValidationForRepresent:boolean =false;
  selectedMemberVatSupply:string;
  selectedMemberVatPurchase:string;
  statusZ:any;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private vatServices: VatServicesService,
    private notifierService: NotifierService
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
      this.lang = vatgroupregistrationconstants.langz.arb.vatgroupregistration;
      this.direction = vatgroupregistrationconstants.langz.arb.dir;
      this.Direction = "rtl";
      this.Language = "A";
    } else {
      this.lang = vatgroupregistrationconstants.langz.eng.vatgroupregistration;
      this.direction = vatgroupregistrationconstants.langz.eng.dir;
      this.Direction = "ltl";
      this.Language = "E";
    }
  }

  ngOnInit() {
    this.getLegalTypeList();
    this.getEligibleSupplies();
    this.getEligiblePurchases();
    this.getIdTypeListDetails();
    this.vatGroupImportOrExportValueChange();
    this.IntialDataFetchingDetails();
    // this.mainDataFetchingDetails();
    //this.vatGroupRegistrationDetails();
    this.stepsChecking();
    this.declarationPopUpFormGroup=this.formBuilder.group({
      "idNumberForPopup":[null,[Validators.required, Validators.pattern(this.NumberPattern), Validators.minLength(8), Validators.maxLength(15)]],
      "dateForPopup":[null,Validators.required]
    });
  }

  stepsChecking() {
    switch (this.Step) {
      case 1:
        this.vatGroupRegisterMemberRegisteredDetails();
        break;
      case 2:
        this.vatGroupRegisterFinancialInfoFormControls();
        break;
      case 3:
        this.vatGroupRegisterAttachmentFormControls();
        break;
      case 4:
        this.vatGroupRegisterDeclarationFormControls();
        break;
      case 5:
        this.vatGroupRegisterSummaryDetails();
        break;
      case 6:
        this.vatGroupRegisterAcknowledgementDetails();
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

  onIdTypeSelection(value) {
    this.VatGroupRegisterDeclarationFormGroup.controls['idNumber'].setValue("")
    this.VatGroupRegisterDeclarationFormGroup.controls['personName'].setValue("")

    
    this.selectedOption = value;
    for (let i = 0; i < this.IdTypeList.length; i++) {
      if (value == this.IdTypeList[i].idKey) {
        this.Keyvalueseletion = this.IdTypeList[i].idKey;
        this.VatGroupRegisterIdTypeName = this.IdTypeList[i].idText;
      }
      if(value!='ZS0003' && value!='')
      {
        this.isError= false;
        this.declarationPopUpFormGroup.reset();
        $('#declarationPopup').modal('show');
      }
    }
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
      this.VatGroupRegisterMember1FormGroup.addControl('otherText',new FormControl('',[Validators.required]));
    }
    else
    {
      this.VatGroupRegisterMember1FormGroup.removeControl('otherText');
    }
  }
  onTinChange(value) {
    console.log("value",value.length);
    if (value.trim().length > 0) {
      this.Newmembertin = value;
      if(this.VatGroupRegisterVatGroupCardList.filter(x=>x.Gpart == value).length == 0){
      // setTimeout(() => {
      this.vatServices.getAddMemberetailsByTin(value, this.GPartz).subscribe(data => {
        if (data) {
          console.log('NewMember-data', data["d"]);
          this.VatGroupNewMemberData = data["d"];

          this.selectedMemberVatSupply = this.VatGroupNewMemberData['VatSupply'];
          this.selectedMemberVatPurchase =  this.VatGroupNewMemberData['VatPuchase'];

          let addSet = this.VatGroupNewMemberData.BuildingNo + ' ' + this.VatGroupNewMemberData.Street + ' ' + this.VatGroupNewMemberData.Quarter + ' ' + this.VatGroupNewMemberData.RegionDesc + ' ' + this.VatGroupNewMemberData.City + ' ' + this.VatGroupNewMemberData.PostalCd;
          //let addSet = this.VatGroupNewMemberData.BuildingNo !== "" && this.VatGroupNewMemberData.Street !== "" && this.VatGroupNewMemberData.Quarter !== "" && this.VatGroupNewMemberData.RegionDesc !== "" && this.VatGroupNewMemberData.City !== "" && this.VatGroupNewMemberData.PostalCd !== "" ? `${this.VatGroupNewMemberData.BuildingNo} ${this.VatGroupNewMemberData.Street} ${this.VatGroupNewMemberData.Quarter} ${this.VatGroupNewMemberData.RegionDesc} ${this.VatGroupNewMemberData.City} ${this.VatGroupNewMemberData.PostalCd}` : '';
          this.VatGroupRegisterMember1FormGroup.controls['address'].setValue(addSet);
          this.VatGroupRegisterMember1FormGroup.controls['address'].disable();
          this.VatGroupRegisterMember1FormGroup.controls['license'].setValue(this.VatGroupNewMemberData.LicenseCrno);
          this.VatGroupRegisterMember1FormGroup.controls['license'].disable();
          this.VatGroupRegisterMember1FormGroup.controls['vatAccount'].setValue(this.VatGroupNewMemberData.Account);
          this.VatGroupRegisterMember1FormGroup.controls['vatAccount'].disable();

          this.VatGroupRegisterMember3FormGroup.patchValue({'suppliesResult':((+this.VatGroupNewMemberData.VatSupply)*10).toString()});
          this.TempPopupValue=this.VatGroupNewMemberData.VatSupply;
          if (this.TempPopupValue == "01") {           
            this.SliTempPopupval =  this.Language == "E" ?'Less than SAR 187,500':'أكثر من 187,500 حتى 375,000 ريال سعودي';
          } else if (this.TempPopupValue == "02") {
            this.SliTempPopupval =  this.Language == "E" ? 'Between SAR 187,500 and SAR 375,000':'أكثر من 187,500 حتى 375,000 ريال سعودي';
          } else if (this.TempPopupValue == "03") {
            this.SliTempPopupval =  this.Language == "E" ? 'Between SAR 375,000 and SAR 1,000,000': "أكثر من 375,000 حتى 1,000,000 ريال سعودي";
          } else if (this.TempPopupValue == "04") {            
            this.SliTempPopupval =  this.Language == "E" ? 'Between SAR 1,000,000 and SAR 40,000,000': "أكثر من 1,000,000 حتى 40,000,000 ريال سعودي";
          } else if (this.TempPopupValue = "05") {
            this.SliTempPopupval =  this.Language == "E" ? 'Greater than SAR 40,000,000': "أكثر من 40,000,000 ريال سعودي";
          }

          // for (let k = 0; k < this.LegalTypeList.length; k++) {
          //   if (this.VatGroupNewMemberData.PersonTp == this.LegalTypeList.type[k].Key) {
          //     this.LegalTypeNewuser = this.LegalTypeList.type[k].Text;
          //   }
          // }
          // this.VatGroupRegisterMember1FormGroup.controls['LegalPerson'].setValue(this.LegalTypeNewuser);
        }
        
      }, (error) => {
        this.notifierService.hideOldest();
        var errorString = "";
        this.addNewMemberVatGroupRegister1FormControls();
        errorString = error.error.error.innererror.errordetails[0].message
        // if (error.error.error.innererror.errordetails.length >= 2) {
        //   for (var i = 0; i < error.error.error.innererror.errordetails.length - 1; i++) {
        //     errorString = errorString + error.error.error.innererror.errordetails[i].message
        //   }
        // }
        // else {
        //   this.addNewMemberVatGroupRegister1FormControls();
        //   errorString = error.error.error.innererror.errordetails[0].message
        // }
        this.notifierService.notify(
          "error",
          errorString
        );
        console.log('error', error);
      });
     }
     else{
      this.addNewMemberVatGroupRegister1FormControls();
      this.notifierService.notify(
        "error",
        this.lang.step1.popup1.dupTin
      );
     }
      // }, 500);
    }
  }
  onIdNoChange(value) {
    if (value !== "") {

      let d = this.VatGroupRegisterDeclarationFormGroup.value.date['calendarStart'];

      if(d){
      let ValidateIdNo;
      const IdType = this.VatGroupRegisterDeclarationFormGroup.value.idType;
      if (d.day < 10 && d.day.toString().length == 1) {
        d.day = "0" + d.day;
      }
      if (d.month < 10 && d.month.toString().length == 1) {
        d.month = "0" + d.month;
      }
      let currentdate = "" + d.year + d.month + d.day;
        let obj = {
          type: this.VatGroupRegisterDeclarationFormGroup.value.idType,
          idNumber: this.VatGroupRegisterDeclarationFormGroup.value.idNumber,
        };
        setTimeout(() => {
          this.vatServices.getUserValidation(obj, currentdate).subscribe(data => {
            if (data) {
              ValidateIdNo = data["d"];
                this.VatGroupRegisterDeclarationFormGroup.controls['idNumber'].setValue(ValidateIdNo["Idnum"]);
                let tempContactpersonName="";
                if(ValidateIdNo.Name1 != "" || ValidateIdNo.Name2 != "" || ValidateIdNo.FullName != "")
                {
                  tempContactpersonName = ValidateIdNo.FullName ? ValidateIdNo.FullName : ValidateIdNo.Name1 + ValidateIdNo.Name2;
                  this.VatGroupRegisterDeclarationFormGroup.controls['personName'].disable();
                }
                else{
                  this.VatGroupRegisterDeclarationFormGroup.controls['personName'].enable();
                  this.VatGroupRegisterDeclarationFormGroup.controls['personName'].setValue('');
                }
                this.VatGroupRegisterDeclarationFormGroup.controls['personName'].setValue(tempContactpersonName);
              }
              else {
                this.VatGroupRegisterDeclarationFormGroup.controls['idNumber'].setValue(ValidateIdNo["Idnum"]);
                this.VatGroupRegisterDeclarationFormGroup.controls['personName'].setValue('');
              }
            }, (error) => {
            this.isError = true;
            this.VatGroupRegisterDeclarationFormGroup.controls['personName'].setValue('');
          });
        }, 500);
    }
    }
    else {
      this.VatGroupRegisterDeclarationFormGroup.controls['personName'].setValue('');
    }
  }

  mainDataFetchingDetails() {
    this.vatServices.getCreateRequestFormData(this.GPartz, this.Language).subscribe(data => {
      if (data) {
        console.log('Vatgrp-list-data', data["d"]);
        this.VatGroupRegisterwholeData = data["d"];
        this.statusZ = this.VatGroupRegisterwholeData['Statusz'];
        this.VatGroupRegisterVatGroupCardList = data["d"].TABLESet.results;
        // console.log((+this.VatGroupRegisterwholeData.AggreSupply)*10);
        // console.log("supp",(+this.VatGroupRegisterwholeData.AggreSupply));
        // let amount=(+this.VatGroupRegisterwholeData.AggreSupply)*10;
        // this.VatGroupRegisterFinancialInformationFormGroup.patchValue({'supplie':((+this.VatGroupRegisterwholeData.AggreSupply)*10)});
        // console.log("supplie1",this.VatGroupRegisterFinancialInformationFormGroup);
        // console.log("supplie",this.VatGroupRegisterFinancialInformationFormGroup.value.supplie);
        for (let j = 0; j < this.LegalTypeList.length; j++) {
          for (let k = 0; k < this.VatGroupRegisterVatGroupCardList.length; k++) {
            if (this.VatGroupRegisterVatGroupCardList[k].PersonTp == this.LegalTypeList[j].Key) {

              this.LegalTypeNewuser = this.LegalTypeList[j].Text;
              this.LegalTypeNewuserList.push(this.LegalTypeList[j].Text);
            }
          }
        }
        this.representativeLegalPID = this.VatGroupRegisterVatGroupCardList[0].PersonTp;

        this.step1();
      }
    }, (error) => {
      this.notifierService.hideOldest();
      var errorString = "";
      errorString = error.error.error.innererror.errordetails[0].message
      this.notifierService.notify(
        "error",
        errorString
      );
    });
  }
  vatLessthanOrGreaterthanChange(value) {
    this.IsEligiblePurchase = value;
    
    this.VatGroupNewMemberData.VatPuchase = value;
    console.log("VatPuchase", this.VatGroupNewMemberData.VatPuchase);

  }
  vatGrpLessthanOrGreaterthanChange(value) {
    this.IsGrpEligiblePurchase = value;

    this.VatGroupRegisterwholeData.AggrePurchase = value;

    this.ElgiblePurchaseList.forEach(element => {
      if (value == element.Key) {
        this.EligiblePurchaseName = element.Text;
      }
    });
  }
  vatGroupImportOrExportValueChange() {
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

  vatGroupImportOrExportTypeChange(value, type) {
    console.log("value",value);
    console.log("type",type);

    if (type == 'both') {
      this.VatGroupNewMemberData.Importer = '1';
      this.VatGroupNewMemberData.Exporter = '1'
      this.IsImporter = value;
      this.IsExporter = value;
      this.ImportExportType = type;
    }
    else if (type == 'none') {
      this.VatGroupNewMemberData.Importer = '0';
      this.VatGroupNewMemberData.Exporter = '0'
      this.IsImporter = value;
      this.IsExporter = value;
      this.ImportExportType = type;
    }
    else if (type == 'exporter') {
      this.VatGroupNewMemberData.Importer = '0';
      this.VatGroupNewMemberData.Exporter = '1'
      this.IsImporter = '0';
      this.IsExporter = value;
      this.ImportExportType = type;
    }
    else {
      this.VatGroupNewMemberData.Importer = '1';
      this.VatGroupNewMemberData.Exporter = '0'
      this.IsImporter = value;
      this.IsExporter = '0';
      this.ImportExportType = type;
    }
  }

  /* Api calls starts here */
  IntialDataFetchingDetails() {
    this.vatServices.getVatGroupWholeData(this.GPartz, this.Language).subscribe(data => {
      if (data) {
        console.log('Existed-data', data["d"]);
        this.VatGroupwholeData = data["d"];
        this.DraftList =  data["d"].ASSLISTSet.results ? data["d"].ASSLISTSet.results.filter(x=>x.Fbtyp == 'VTGR') :[];
      }
    }, (error) => {
      console.log('err', error);
    });
    return this.VatGroupwholeData;
  }

  onChangeGetDate() {
    if (this.VatGroupRegisterwholeData !== undefined) {
      // setTimeout(() => {
      const operations = this.VatGroupRegisterwholeData.Operationz;
      this.vatServices.getCreateRequestFormData(this.GPartz, this.Language,).subscribe(data => {
        if (data) {
          console.log('GetDateInfo', data["d"]);
          this.DateList = data["d"].EFFDATESet.results;
          //this.VatGroupRegisterAttachmentSelectList = data["d"].ELGBL_DOCSet.results;
        }
      }, (error) => {
        console.log('err', error);
      });
      this.vatServices.requestCreateVRUIHDRSET_VAT_Group(this.GPartz, this.Language,  this.statusZ).subscribe(data => {
        if (data) {
          console.log('vg-attachment-list', data["d"]);
          // this.VatGroupRegisterAttachmentSelectList = data["d"].ELGBL_DOCSet.results;
          this.VatGroupRegisterAttachmentSelectList = data["d"].ELGBL_DOCSet.results;
        }
      }, (error) => {
        console.log('err', error);
      });
      // }, 500);
    }
  }
  /* Api calls ends here */
  ContinueStartScreen() {
    this.mainDataFetchingDetails();
    // this.step1();
  }
  /* Step 1 starts here */
  vatGroupRegisterMemberRegisteredDetails() {
    //this.mainDataFetchingDetails();
    this.instructionsVatGroupRegisterFormControls();
    setTimeout(() => {
      this.infoModal.nativeElement.click();
      $('#infoModal').modal('show');
    }, 1000);
    this.addNewMemberVatGroupRegister1FormControls();
    this.addNewMemberVatGroupRegister3FormControls();
  }

  termsAndConditionsOfInstructionAcceptance() {
    $('#infoModal').modal('hide');
  }
  ClosewithoutConfirm() {
    this.Step = 0;
  }
  addMember() {
    this.isMemberAdd =true;
    this.selectedlegaltype ='';
    //this.legalTypeValidationForRepresent = false;
    this.showlegalTypeValidation = false;
    this.addNewMemberVatGroupRegister1FormControls();
    // this.VatGroupRegisterMember1FormGroup.controls['tin'].valueChanges.pipe(debounceTime(500), distinctUntilChanged()).subscribe(data => {
    //   if (data !== "") {
    //     this.vatServices.getAddMemberetailsByTin(this.GPartz, data).subscribe((data) => {
    //       if (data) {           
    //         console.log('new-mem', data);
    //       }
    //     })
    //   }
    // });
    $('#addMember1').modal('show');
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
      this.viewImEx = "None of the above";
    }
    $('#viewMember').modal('show');

  }

  viewMemberContinue() {
    $('#viewMember').modal('hide');
  }

  addMember1Continue() {
    $('#addMember1').modal('hide');
    $('#addMember2').modal('show');

    console.log("VatGroupNewMemberData",this.VatGroupNewMemberData)
  }

  addMember2Continue() {
    $('#addMember2').modal('hide');
    $('#addMember3').modal('show');
    console.log("VatGroupNewMemberData",this.VatGroupNewMemberData)

  }

  addMember3Continue() {
    this.disableFinancialblock = false;
    this.VatGroupNewMemberData.PersonTp=this.VatGroupRegisterMember1FormGroup.value.legalPerson;
    this.VatGroupNewMemberData.legalPerson=this.VatGroupRegisterMember1FormGroup.value.legalPerson;
    this.VatGroupNewMemberData.otherText=this.VatGroupRegisterMember1FormGroup.value.otherText;
    this.LegalTypeNewuserList.push(this.LegalTypeList.filter(x=>x.Key == this.VatGroupRegisterMember1FormGroup.value.legalPerson).map(y=>y.Text)[0]);
    this.VatGroupRegisterVatGroupCardList.push(this.VatGroupNewMemberData);
    console.log(" this.VatGroupRegisterVatGroupCardList", this.VatGroupRegisterVatGroupCardList);
    if(this.VatGroupRegisterVatGroupCardList.filter(y=>y.VatSupply == "05").length)
    {
      this.VatGroupRegisterFinancialInformationFormGroup.patchValue({'supplie':50});
      this.TempValue="05";
      if (this.TempValue == "01") {           
        this.SliTempval = this.Language == "E" ? 'Less than SAR 187,500':'أكثر من 187,500 حتى 375,000 ريال سعودي';
      } else if (this.TempValue == "02") {
        this.SliTempval = this.Language == "E" ? 'Between SAR 187,500 and SAR 375,000':'أكثر من 187,500 حتى 375,000 ريال سعودي';
      } else if (this.TempValue == "03") {
        this.SliTempval = this.Language == "E" ? 'Between SAR 375,000 and SAR 1,000,000': "أكثر من 375,000 حتى 1,000,000 ريال سعودي";
      } else if (this.TempValue == "04") {            
        this.SliTempval = this.Language == "E" ? 'Between SAR 1,000,000 and SAR 40,000,000': "أكثر من 1,000,000 حتى 40,000,000 ريال سعودي";
      } else if (this.TempValue = "05") {
        this.SliTempval = this.Language == "E" ? 'Greater than SAR 40,000,000': "أكثر من 40,000,000 ريال سعودي";
      }
      this.disableFinancialblock = true;
    }
    $('#addMember3').modal('hide');
  }


  ContinueFirstScreen() {
        this.step2();
        if(this.VatGroupRegisterVatGroupCardList.filter(y=>y.VatSupply == "05").length)
        {
          this.TempValue="05";
          if (this.TempValue == "01") {           
            this.SliTempval = this.Language == "E" ? 'Less than SAR 187,500':'أكثر من 187,500 حتى 375,000 ريال سعودي';
          } else if (this.TempValue == "02") {
            this.SliTempval = this.Language == "E" ? 'Between SAR 187,500 and SAR 375,000':'أكثر من 187,500 حتى 375,000 ريال سعودي';
          } else if (this.TempValue == "03") {
            this.SliTempval = this.Language == "E" ? 'Between SAR 375,000 and SAR 1,000,000': "أكثر من 375,000 حتى 1,000,000 ريال سعودي";
          } else if (this.TempValue == "04") {            
            this.SliTempval = this.Language == "E" ? 'Between SAR 1,000,000 and SAR 40,000,000': "أكثر من 1,000,000 حتى 40,000,000 ريال سعودي";
          } else if (this.TempValue = "05") {
            this.SliTempval = this.Language == "E" ? 'Greater than SAR 40,000,000': "أكثر من 40,000,000 ريال سعودي";
          }
          this.VatGroupRegisterFinancialInformationFormGroup.patchValue({'supplie':((+5)*10)});
          this.VatGroupRegisterwholeData.AggreSupply = "05"
          this.disableFinancialblock = true;
        }
  }
  /* Step 1 ends here */

  /* Step 2 starts here */
  FinancialData() {
    const VatGroupFinancial = this.VatGroupRegisterFinancialInformationFormGroup.value;
    this.VatGroupFinancialModel.EligibleSupplie = this.SliTempval;
    this.VatGroupFinancialModel.EligiblePurchase = this.IsGrpEligiblePurchase;
    this.VatGroupFinancialModel.EffectiveDate = VatGroupFinancial.effectiveDate;
    for (let q = 0; q < this.DateList.length; q++) {
      if (VatGroupFinancial.effectiveDate == this.DateList[q].Persl) {
        this.vieweffectivedate = this.DateList[q];
      }
    }
    return this.VatGroupFinancialModel;
  }
  vatGroupRegisterFinancialInfoFormControls() {
    this.VatGroupRegisterFinancialInformationFormGroup = new FormGroup({
      effectiveDate: new FormControl(this.VatGroupFinancialModel.EffectiveDate, [Validators.required]),
      supplie:new FormControl('')
    });
    this.VatGroupRegisterFinancialInformationFormGroup.patchValue({'supplie':((+this.VatGroupRegisterwholeData.AggreSupply)*10)});
  }
  editStep2() {
    this.Step = 2;
    this.VatGroupRegisterFinancialInformationFormGroup = new FormGroup({
      effectiveDate: new FormControl(this.VatGroupFinancialModel.EffectiveDate, [Validators.required]),
      supplie:new FormControl('')
      // effectiveDate: new FormControl(this.VatGroupFinancialModel.EffectiveDate, [Validators.required])
      // effectiveDate: new FormControl(this.VatGroupFinancialModel.EffectiveDate, [Validators.required])
    });
    this.VatGroupRegisterFinancialInformationFormGroup.patchValue({'supplie':((+this.VatGroupRegisterwholeData.AggreSupply)*10)});
  }
  onInputChange(value: any) {
    const val = value.source._value;

    console.log("val",val);
    console.log("value",value);
    
    if (val >= 10) {
      if (Math.round(val / 10) == 1) {
        this.TempValue = "01";
        this.SliTempval = this.Language == "E" ?'Less than SAR 187,500':'أكثر من 187,500 حتى 375,000 ريال سعودي';
      } else if (Math.round(val / 10) == 2) {
        this.TempValue = "02";
        this.SliTempval = this.Language == "E" ?'Between SAR 187,500 and SAR 375,000':'أكثر من 187,500 حتى 375,000 ريال سعودي';
      } else if (Math.round(val / 10) == 3) {
        this.TempValue = "03";
        this.SliTempval = this.Language == "E" ?'Between SAR 375,000 and SAR 1,000,000': "أكثر من 375,000 حتى 1,000,000 ريال سعودي";
      } else if (Math.round(val / 10) == 4) {
        this.TempValue = "04";
        this.SliTempval = this.Language == "E" ?'Between SAR 1,000,000 and SAR 40,000,000': "أكثر من 1,000,000 حتى 40,000,000 ريال سعودي";
      } else if (Math.round(val / 10) == 5) {
        this.TempValue = "05";
        this.SliTempval = this.Language == "E" ?'Greater than SAR 40,000,000': "أكثر من 40,000,000 ريال سعودي";
      }
    }
    this.FinalTempVal = this.TempValue;
    // let count=0;
    // for(let i=0;i<this.VatGroupRegisterVatGroupCardList.length;i++)
    // {
    //   if((+this.VatGroupRegisterVatGroupCardList[i].PersonTp )==5)
    //   {
    //     count++;
    //   }
    // }
    // if(count>=1)
    // {
    //   if(+this.TempValue<5)
    //   {
    //     $("#ErrorModal1").modal('show');
    //     setTimeout(() => {
    //       $("#ErrorModal1").modal('hide');
    //     }, 10000);
    //   }
    // }
    return this.SliTempval;
  }
  onInputChangePopup(value: any) {
    const valpop = value.source._value;
    if (valpop >= 10) {
      if (Math.round(valpop / 10) == 1) {
        this.TempPopupValue = "01";
        this.SliTempPopupval = this.Language == "E" ? 'Less than SAR 187,500':'أكثر من 187,500 حتى 375,000 ريال سعودي';
      } else if (Math.round(valpop / 10) == 2) {
        this.TempPopupValue = "02";
        this.SliTempPopupval = this.Language == "E" ? 'Between SAR 187,500 and SAR 375,000':'أكثر من 187,500 حتى 375,000 ريال سعودي';
      } else if (Math.round(valpop / 10) == 3) {
        this.TempPopupValue = "03";
        this.SliTempPopupval = this.Language == "E" ? 'Between SAR 375,000 and SAR 1,000,000': "أكثر من 375,000 حتى 1,000,000 ريال سعودي";
      } else if (Math.round(valpop / 10) == 4) {
        this.TempPopupValue = "04";
        this.SliTempPopupval = this.Language == "E" ? 'Between SAR 1,000,000 and SAR 40,000,000': "أكثر من 1,000,000 حتى 40,000,000 ريال سعودي";
      } else if (Math.round(valpop / 10) == 5) {
        this.TempPopupValue = "05";
        this.SliTempPopupval = this.Language == "E" ? 'Greater than SAR 40,000,000': "أكثر من 40,000,000 ريال سعودي";
      }
    }
    this.FinalTempPopupVal = this.TempPopupValue;
    this.VatGroupNewMemberData.VatSupply = this.TempPopupValue;
    return this.SliTempPopupval;
  }
  ContinueSecondScreen() {
    const objFina = this.FinancialData();
    console.log('VG-Financial', objFina);
    this.step3();
  }
  /* Step 2 ends here */

  /* Step 3 starts here */
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
    //  let utype = localStorage.getItem('tpType')? localStorage.getItem('tpType'):"TP";
    //  console.log("del",this.VatGroupRegisterAttachFiles[i]);
     
    //   if(this.VatGroupRegisterAttachFiles[i].length > 0)
    //   {
    //     this.VatGroupRegisterAttachFiles[i].forEach(element => {
    //         this.vatServices.deleteAttachment(element.docType,element.Doguid,utype).subscribe(data => {
    //     if (data) {
    //       console.log('final-submit', data["d"]);
    //       this.application = data["d"].Fbnumz;
    //     }
    //   });
    //     });
    //   }
    }
  }

  deleteVatGroupRegisterAttachment(j, i) {
    //singedelete
     let utype = localStorage.getItem('tpType')? localStorage.getItem('tpType'):"TP";
      if(this.VatGroupRegisterAttachFiles[i].length)
      {
        if(this.VatGroupRegisterAttachFiles[i][j])
            this.vatServices.deleteAttachment(this.VatGroupRegisterAttachFiles[i][j].docType,this.VatGroupRegisterAttachFiles[i][j].Doguid,utype).subscribe(data => {
        if (data) {
          console.log('final-submit', data["d"]);
          this.application = data["d"].Fbnumz;
        }
        });
      }
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
        if (obj.type.toLowerCase() == 'doc' || obj.type.toLowerCase() == 'docx' || obj.type.toLowerCase() == 'xlsx' || obj.type.toLowerCase() == 'xls' || obj.type.toLowerCase() == 'pdf' || obj.type.toLowerCase() == 'jpg') {
          if ( element.size <= 5242880) {
            if (!this.VatGroupRegisterAttachFiles[k]) {
              
              let fileName;
              let docType;

              fileName = `${obj.name}.${obj.type}`;
              docType = obj.docType;

              const frmData = new FormData();
              frmData.append("fileUpload", event);
              this.vatServices.postAttachmentDetails(this.VatGroupRegisterwholeData.ReturnIdz, docType, fileName, frmData).subscribe((data: any) => {
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
    this.vatServices.postAttachmentDetails(this.VatGroupRegisterwholeData.ReturnIdz, docType, fileName, frmData).subscribe(data => {
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

  // setVatGroupRegisterAttachments() {
  //   this.Step = 3;
  // }
  editStep3() {
    this.Step = 3;
    this.editing = true;
  }
  ContinueThirdScreen() {
    if (this.editing = true) {
      this.VatGroupRegisterDeclarationFormGroup = new FormGroup({
        idType: new FormControl(this.VatGroupDeclarationModel.IdType, [Validators.required]),
        idNumber: new FormControl(this.VatGroupDeclarationModel.IdNumber, [Validators.required, Validators.pattern(this.NumberPattern), Validators.minLength(8), Validators.maxLength(15)]),
        date: new FormControl(this.CurrentDate),
        personName: new FormControl(this.VatGroupDeclarationModel.contactName, [Validators.required, Validators.pattern(this.StringPattern)])
      });
    }
    this.step4();
  }
  /* Step 3 ends here */

  /* Step 4 starts here */
  DeclarationData() {
    const VatGroupDeclaration = this.VatGroupRegisterDeclarationFormGroup.getRawValue();
    this.VatGroupDeclarationModel.IdType = VatGroupDeclaration.idType;
    this.VatGroupDeclarationModel.IdNumber = VatGroupDeclaration.idNumber;
    this.VatGroupDeclarationModel.contactName = VatGroupDeclaration.personName;
    this.VatGroupDeclarationModel.Date = VatGroupDeclaration.date;
    console.log("VatGroupDeclaration",VatGroupDeclaration);
    console.log("Fasfdsfsdf",moment(VatGroupDeclaration.date).format("YYYY-MM-DDT00:00:00"));
    
    this.VatGroupDeclarationModel.Agree = VatGroupDeclaration.agree;
    return this.VatGroupDeclarationModel;
  }
  vatGroupRegisterDeclarationFormControls() {
    this.VatGroupRegisterDeclarationFormGroup = new FormGroup({
      idType: new FormControl('', [Validators.required]),
      idNumber: new FormControl('', [Validators.required, Validators.pattern(this.NumberPattern), Validators.minLength(8), Validators.maxLength(15)]),
      date: new FormControl(this.CurrentDate),
      personName: new FormControl('', [Validators.required, Validators.pattern(this.StringPattern)])
    });
  }
  editStep4() {
    this.Step = 4;
    this.VatGroupRegisterDeclarationFormGroup = new FormGroup({
      idType: new FormControl(this.VatGroupDeclarationModel.IdType, [Validators.required]),
      idNumber: new FormControl(this.VatGroupDeclarationModel.IdNumber, [Validators.required, Validators.pattern(this.NumberPattern), Validators.minLength(8), Validators.maxLength(15)]),
      date: new FormControl(this.CurrentDate),
      personName: new FormControl(this.VatGroupDeclarationModel.contactName, [Validators.required, Validators.pattern(this.StringPattern)])
    });
  }

  ContinueFourthScreen() {
    const objdec = this.DeclarationData();
    console.log('VG-declaration', objdec);
    this.step5();
  }
  /* Step 4 ends here */

  /* Step 5 starts here */
  vatGroupRegisterSummaryDetails() {

  }
  tableSetjsonObject() {
let tempArray=[];

this.VatGroupRegisterVatGroupCardList.forEach(element => {
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
    "VatPuchase": element.VatPuchase,
    "VatSupply": element.VatSupply});
});
    // var tableObject = {
    //   "Actnm": this.VatGroupNewMemberData.Actnm,
    //   "Account": this.VatGroupNewMemberData.Account,
    //   "AdditionalNo": "",
    //   "Addrnumber": "",
    //   "AggrePurchase": "",
    //   "AggreSupply": "",
    //   "Articleatt": false,
    //   "Bothatt": false,
    //   "BuildingNo": this.VatGroupNewMemberData.BuildingNo,
    //   "City": this.VatGroupNewMemberData.City,
    //   "DataVersion": "00000",
    //   "Exporter": this.IsExporter,
    //   "ExporterFg": true,
    //   "FormGuid": "",
    //   "Gpart": this.Newmembertin,
    //   "Importer": this.IsImporter,
    //   "ImporterFg": true,
    //   "LicenseCrno": this.VatGroupNewMemberData.LicenseCrno,
    //   "Mandt": "",
    //   "Memoatt": false,
    //   "Otheratt": false,
    //   "OtherTp": "",
    //   "PersonTp": this.selectedlegaltype,
    //   "PostalCd": this.VatGroupNewMemberData.PostalCd,
    //   "PurchaseFg": true,
    //   "Quarter": this.VatGroupNewMemberData.Quarter,
    //   "RegDt": null,
    //   "Region": "",
    //   "RegionDesc": this.VatGroupNewMemberData.RegionDesc,
    //   "Srcidentify": "0001",
    //   "Street": this.VatGroupNewMemberData.Street,
    //   "SupplyFg": true,
    //   "TpDescr": "",
    //   "VatPuchase": this.IsEligiblePurchase,
    //   "VatSupply": this.FinalTempPopupVal
    // }
    return tempArray;
  }


  tableArray: any[] = [];
  summary() {
    this.VatGroupRegisterwholeData.AgrFg = "1";
    this.tableArray.push(this.tableSetjsonObject());
    this.VatGroupRegisterwholeData.TABLESet =this.tableSetjsonObject();
    //this.VatGroupRegisterwholeData.AggreSupply = this.FinalTempVal;
    //this.VatGroupRegisterwholeData.AggrePurchase = this.VatGroupFinancialModel.EligiblePurchase;
    //this.VatGroupRegisterwholeData.Persl = this.VatGroupFinancialModel.EffectiveDate;
   // console.log("this.VatGroupFinancialModel.EffectiveDate",this.VatGroupFinancialModel.EffectiveDate);
    this.VatGroupRegisterwholeData.AggreSupply;
    this.VatGroupRegisterwholeData.AggrePurchase
    //this.VatGroupRegisterwholeData.DmsTp="";
    this.VatGroupRegisterwholeData.Decfg = "1";
    this.VatGroupRegisterwholeData.DecidTy = this.VatGroupDeclarationModel.IdType;
    this.VatGroupRegisterwholeData.DecidNo = this.VatGroupDeclarationModel.IdNumber;
    this.VatGroupRegisterwholeData.Decname = this.VatGroupDeclarationModel.contactName;
    this.VatGroupRegisterwholeData.UserTypz = "TP"
    this.VatGroupRegisterwholeData.Persl  = this.vieweffectivedate.Persl  ? this.vieweffectivedate.Persl :"" ;
    this.VatGroupRegisterwholeData.RegDt  = this.vieweffectivedate.Abrzu  ? this.vieweffectivedate.Abrzu :null ;
    this.VatGroupRegisterwholeData.Txt50  = this.vieweffectivedate.Txt50  ? this.vieweffectivedate.Txt50 :"" ;

  }
  ContinueFifthScreen() {
    //const obj9 = this.summary();
    //console.log('summary', obj9);
    this.summary();
    this.VatGroupRegisterwholeData.Operationz = '01';
    console.log('VatGroupwhole-data-save', this.VatGroupRegisterwholeData);
    this.vatServices.saveVatGroupData(this.VatGroupRegisterwholeData).subscribe(data => {
      if (data) {
        console.log('final-submit', data["d"]);
        this.step6();
        this.application = data["d"].Fbnumz;
      }
    });
  }
  /* Step 5 ends here */
  ContinueDashboardScreen() {
    this.IntialDataFetchingDetails();
    this.Step = 0;
  }
  /* Step 6 starts here */
  vatGroupRegisterAcknowledgementDetails() {

  }
  /* Step 6 ends here */

  AddNewMemberData() {
    const VatGroupInstructions = this.VatGroupRegisterInstructionFormGroup.value;
    const VatGroupAddMember1 = this.VatGroupRegisterMember1FormGroup.value;
    const VatGroupAddMember3 = this.VatGroupRegisterMember3FormGroup.value;

    this.VatGroupAddMemberModel.Agree = VatGroupInstructions.agree;
    this.VatGroupAddMemberModel.Tin = VatGroupAddMember1.tin;
    this.VatGroupAddMemberModel.Address = VatGroupAddMember1.address;
    this.VatGroupAddMemberModel.license = VatGroupAddMember1.license;
    this.VatGroupAddMemberModel.VatAccount = VatGroupAddMember1.vatAccount;
    this.VatGroupAddMemberModel.LegalPerson = this.VatGroupNewMemberData.PersonTp;
    this.VatGroupAddMemberModel.Supplies = VatGroupAddMember3.supplies;
    this.VatGroupAddMemberModel.Purchases = VatGroupAddMember3.purchases;

    return this.VatGroupAddMemberModel;
  }
  editStep1() {
    this.VatGroupRegisterInstructionFormGroup = new FormGroup({
      agree: new FormControl(this.VatGroupAddMemberModel.Agree, [Validators.required])
    });
    this.VatGroupRegisterMember1FormGroup = new FormGroup({
      tin: new FormControl(this.VatGroupAddMemberModel.Tin, [Validators.required, Validators.pattern(this.NumberPattern), Validators.minLength(10), Validators.maxLength(10)]),
      address: new FormControl(this.VatGroupAddMemberModel.Address, [Validators.required]),
      license: new FormControl(this.VatGroupAddMemberModel.license, [Validators.required]),
      vatAccount: new FormControl(this.VatGroupAddMemberModel.VatAccount, [Validators.required]),
      legalPerson: new FormControl(this.VatGroupAddMemberModel.LegalPerson, [Validators.required])
    });
    this.VatGroupRegisterMember3FormGroup = new FormGroup({
      supplies: new FormControl(this.VatGroupAddMemberModel.Supplies, [Validators.required]),
      purchases: new FormControl(this.VatGroupAddMemberModel.Purchases, [Validators.required]),
      suppliesResult:new FormControl('')
    });
  }
  instructionsVatGroupRegisterFormControls() {
    this.VatGroupRegisterInstructionFormGroup = new FormGroup({
      agree: new FormControl('', [Validators.required])
    });
  }
  addNewMemberVatGroupRegister1FormControls() {
    this.VatGroupRegisterMember1FormGroup = new FormGroup({
      tin: new FormControl('', [Validators.required, Validators.pattern(this.NumberPattern), Validators.minLength(10), Validators.maxLength(10)]),
      address: new FormControl('', [Validators.required]),
      license: new FormControl('', [Validators.required]),
      vatAccount: new FormControl('', [Validators.required]),
      legalPerson: new FormControl('', [Validators.required])
    });
  }

  addNewMemberVatGroupRegister3FormControls() {
    this.VatGroupRegisterMember3FormGroup = new FormGroup({
      supplies: new FormControl('', [Validators.required]),
      purchases: new FormControl('', [Validators.required]),
      suppliesResult:new FormControl('')
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
  step1() {
    this.Step = 1;
    this.stepsChecking();
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
    //this.stepsChecking();
  }

  step5() {
    this.Step = 5;
    this.stepsChecking();
  }

  step6() {
    this.Step = 6;
    this.stepsChecking();
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

  ValidateIdNumber() {
    this.isError = false;
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
        type: this.VatGroupRegisterDeclarationFormGroup.value.idType,
        idNumber: this.declarationPopUpFormGroup.value.idNumberForPopup,
      };
      setTimeout(() => {
        this.vatServices.getUserValidation(obj, currentdate).subscribe(data => {
          if (data) {
            ValidateIdNo = data["d"];
              this.VatGroupRegisterDeclarationFormGroup.controls['idNumber'].setValue(ValidateIdNo["Idnum"]);
              let tempContactpersonName="";
              if(ValidateIdNo.Name1 != "" || ValidateIdNo.Name2 != "" || ValidateIdNo.FullName != "")
              {
                tempContactpersonName = ValidateIdNo.FullName ? ValidateIdNo.FullName : ValidateIdNo.Name1 + ValidateIdNo.Name2;
                this.VatGroupRegisterDeclarationFormGroup.controls['personName'].disable();
              }
              else{
                this.VatGroupRegisterDeclarationFormGroup.controls['personName'].enable();
                this.VatGroupRegisterDeclarationFormGroup.controls['personName'].setValue('');
              }
              this.VatGroupRegisterDeclarationFormGroup.controls['personName'].setValue(tempContactpersonName);
            }
            else {
              this.VatGroupRegisterDeclarationFormGroup.controls['idNumber'].setValue(ValidateIdNo["Idnum"]);
            }
            $("#declarationPopup").modal('hide');
          }, (error) => {
          this.isError = true;
          this.VatGroupRegisterDeclarationFormGroup.controls['personName'].setValue('');
        });
      }, 500);
    }
    else {
      this.VatGroupRegisterDeclarationFormGroup.controls['personName'].setValue('');
    }
  }

  //SUNIL
  editMember3(editMember, i) {
    this.VatGroupRegisterMember1FormGroup.reset();
    let tempmemberObj = editMember;
console.log("tempmemberObj",tempmemberObj);

    this.selectedEditMemberIndex = i;
    this.isMemberAdd = false;
    this.vatServices.getAddMemberetailsByTin(editMember.Gpart, this.GPartz).subscribe(data => {
      if (data) {
        console.log('NewMember-data', data["d"]);
        this.VatGroupNewMemberData = data["d"];
        this.selectedMemberVatSupply = this.VatGroupNewMemberData['VatSupply'];
        this.selectedMemberVatPurchase =  this.VatGroupNewMemberData['VatPuchase'];
        let addSet = this.VatGroupNewMemberData.BuildingNo + ' ' + this.VatGroupNewMemberData.Street + ' ' + this.VatGroupNewMemberData.Quarter + ' ' + this.VatGroupNewMemberData.RegionDesc + ' ' + this.VatGroupNewMemberData.City + ' ' + this.VatGroupNewMemberData.PostalCd;
        //let addSet = this.VatGroupNewMemberData.BuildingNo !== "" && this.VatGroupNewMemberData.Street !== "" && this.VatGroupNewMemberData.Quarter !== "" && this.VatGroupNewMemberData.RegionDesc !== "" && this.VatGroupNewMemberData.City !== "" && this.VatGroupNewMemberData.PostalCd !== "" ? `${this.VatGroupNewMemberData.BuildingNo} ${this.VatGroupNewMemberData.Street} ${this.VatGroupNewMemberData.Quarter} ${this.VatGroupNewMemberData.RegionDesc} ${this.VatGroupNewMemberData.City} ${this.VatGroupNewMemberData.PostalCd}` : '';
        this.VatGroupRegisterMember1FormGroup.controls['tin'].setValue(this.VatGroupNewMemberData['Gpart']);
        this.VatGroupRegisterMember1FormGroup.controls['address'].setValue(addSet);
        this.VatGroupRegisterMember1FormGroup.controls['address'].disable();
        this.VatGroupRegisterMember1FormGroup.controls['license'].setValue(this.VatGroupNewMemberData.LicenseCrno);
        this.VatGroupRegisterMember1FormGroup.controls['license'].disable();
        this.VatGroupRegisterMember1FormGroup.controls['vatAccount'].setValue(this.VatGroupNewMemberData.Account);
        this.VatGroupRegisterMember1FormGroup.controls['vatAccount'].disable();

        this.VatGroupRegisterMember3FormGroup.patchValue({'suppliesResult':((+this.VatGroupNewMemberData.VatSupply)*10).toString()});
        this.TempPopupValue=this.VatGroupNewMemberData.VatSupply;

        // if (this.TempPopupValue == "01") {           
        //   this.SliTempPopupval = 'Less than SAR 187,500';
        // } else if (this.TempPopupValue == "02") {
        //   this.SliTempPopupval = 'Between SAR 187,500 and SAR 375,000';
        // } else if (this.TempPopupValue == "03") {
        //   this.SliTempPopupval = 'Between SAR 375,000 and SAR 1,000,000';
        // } else if (this.TempPopupValue == "04") {            
        //   this.SliTempPopupval = 'Between SAR 1,000,000 and SAR 40,000,000';
        // } else if (this.TempPopupValue = "05") {
        //   this.SliTempPopupval = 'Greater than SAR 40,000,000';
        // }

        if (this.TempPopupValue == "01") {  
          this.SliTempPopupval = this.Language == "E" ? 'Less than SAR 187,500':'أكثر من 187,500 حتى 375,000 ريال سعودي';
        } else if (this.TempPopupValue == "02") {
          this.SliTempPopupval = this.Language == "E" ? 'Between SAR 187,500 and SAR 375,000':'أكثر من 187,500 حتى 375,000 ريال سعودي';
        } else if (this.TempPopupValue == "03") {
          this.SliTempPopupval = this.Language == "E" ? 'Between SAR 375,000 and SAR 1,000,000': "أكثر من 375,000 حتى 1,000,000 ريال سعودي";
        } else if (this.TempPopupValue == "04") { 
          this.SliTempPopupval = this.Language == "E" ? 'Between SAR 1,000,000 and SAR 40,000,000': "أكثر من 1,000,000 حتى 40,000,000 ريال سعودي";
        } else if (this.TempPopupValue = "05") {
          this.SliTempPopupval = this.Language == "E" ? 'Greater than SAR 40,000,000': "أكثر من 40,000,000 ريال سعودي";
        }

        if(this.selectedMemberVatSupply == '' && this.selectedMemberVatPurchase == '' )
        {
          this.VatGroupNewMemberData.Importer = tempmemberObj.Importer;
          this.VatGroupNewMemberData.Exporter = tempmemberObj.Exporter;
          this.VatGroupNewMemberData.Exporter = tempmemberObj.Exporter;
          this.VatGroupNewMemberData.Exporter = tempmemberObj.Exporter;
          this.VatGroupRegisterMember3FormGroup.patchValue({'suppliesResult':((+tempmemberObj.VatSupply)*10).toString()});
          this.VatGroupNewMemberData.VatPuchase = tempmemberObj.VatPuchase
        }
      }
      
    }, (error) => {
      this.notifierService.hideOldest();
      var errorString = "";
      this.addNewMemberVatGroupRegister1FormControls();
      if (error.error.error.innererror.errordetails.length >= 2) {
        for (var i = 0; i < error.error.error.innererror.errordetails.length - 1; i++) {
          errorString = errorString + error.error.error.innererror.errordetails[i].message
        }
      }
      else {
        this.addNewMemberVatGroupRegister1FormControls();
        errorString = error.error.error.innererror.errordetails[0].message
      }
      this.notifierService.notify(
        "error",
        errorString
      );
      console.log('error', error);
    });

    this.onLegalTypeSelection(editMember.PersonTp);
    if (editMember.PersonTp.toString() == '30') {
      this.VatGroupRegisterMember1FormGroup.controls['otherText'].setValue(editMember.otherText);
      if (editMember.otherText == '') {
        this.VatGroupRegisterMember1FormGroup.addControl('otherText', new FormControl('', [Validators.required]));
      }
    }
    else {
      this.VatGroupRegisterMember1FormGroup.removeControl('otherText');
    }
    this.VatGroupRegisterMember1FormGroup.controls['legalPerson'].reset();
    this.VatGroupRegisterMember1FormGroup.value.legalPerson = editMember.PersonTp;
    this.VatGroupRegisterMember1FormGroup.controls['legalPerson'].setValue(editMember.PersonTp);
    $('#addMember1').modal('show');
    this.selectedMemberVatSupply ='';
    this.selectedMemberVatPurchase='';
  }
  SaveMemberContinue() {
    this.VatGroupRegisterVatGroupCardList[this.selectedEditMemberIndex].PersonTp = this.VatGroupRegisterMember1FormGroup.value.legalPerson;
    this.VatGroupRegisterVatGroupCardList[this.selectedEditMemberIndex].legalPerson = this.VatGroupRegisterMember1FormGroup.value.legalPerson;
    this.VatGroupRegisterVatGroupCardList[this.selectedEditMemberIndex].otherText = this.VatGroupRegisterMember1FormGroup.value.otherText;
    this.LegalTypeNewuserList[this.selectedEditMemberIndex] = this.LegalTypeList.filter(x => x.Key == this.VatGroupRegisterMember1FormGroup.value.legalPerson).map(y => y.Text);
    $('#addMember1').modal('hide');
    $('#addMember3').modal('hide');
  }
  deleteMember(index) {
    $("#DeleteMemberConfirmation").modal('show');
    this.selectedDeleteMemberIndex = index;
  }
  cancelDeletemember() {
    $("#DeleteMemberConfirmation").modal('hide');
    this.selectedDeleteMemberIndex = -1;
  }
  confirmDeletemember() {
    this.LegalTypeNewuserList.splice(this.selectedDeleteMemberIndex,1);
    this.VatGroupRegisterVatGroupCardList.splice(this.selectedDeleteMemberIndex,1);
    $("#DeleteMemberConfirmation").modal('hide');
    this.selectedDeleteMemberIndex = -1;
  }
  downloadFile(url)
  {
    window.open(url,"_blank")
  }
  representlegalTypeChange(value)
  {
    if(value.toString()=='01' || value.toString()=='05')
    {
      this.VatGroupRegisterVatGroupCardList[0].PersonTp = value;
      this.legalTypeValidationForRepresent = false;
    }
    else{
      this.legalTypeValidationForRepresent = true;
    }
  }
  backtostep2Addmember()
  {
    $('#addMember3').modal('hide');
    $('#addMember2').modal('show');
  }
  backtostep1Addmember()
  {
    $('#addMember2').modal('hide');
    $('#addMember1').modal('show');
  }
  closedeclarepop(){
    this.VatGroupRegisterDeclarationFormGroup.reset();
    this.VatGroupRegisterDeclarationFormGroup = new FormGroup({
      idType: new FormControl('', [Validators.required]),
      idNumber: new FormControl('', [Validators.required, Validators.pattern(this.NumberPattern), Validators.minLength(8), Validators.maxLength(15)]),
      date: new FormControl(this.CurrentDate),
      personName: new FormControl('', [Validators.required, Validators.pattern(this.StringPattern)])
    });
  }

  downloadAck()
  {
    this.vatServices.downloadfilledform(this.application).subscribe((data: any) => {
      FileSaver.saveAs(data, "Acknowledgement.pdf");
    }, (error) => {
      console.log('err-2', error);
    });
    
  }
}
export class VatGroupAddMemberModel {
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
export class VatGroupFinancialModel {
  EligibleSupplie: string;
  EligiblePurchase: string;
  EffectiveDate: string;
}
export class VatGroupDeclarationModel {
  IdType: string;
  IdNumber: string;
  Date: string;
  contactName: string;
  Agree: boolean;
}
