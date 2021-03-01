import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { VatServicesService } from '../vat-services.service';
import { changeregistrationconstants } from "src/app/main/vat-services/change-registration/change-registrationconstants.model";
import { NotifierService } from "angular-notifier";

declare var $;
@Component({
  selector: 'app-change-registration',
  templateUrl: './change-registration.component.html',
  styleUrls: ['./change-registration.component.css']
})
export class ChangeRegistrationComponent implements OnInit, AfterViewInit {

  @ViewChild('infoModal', { static: false }) infoModal: ElementRef;

  InstructionFormGroup: FormGroup = new FormGroup({});
  ChangeAddressFormGroup: FormGroup = new FormGroup({});
  ChangeContactPersonFormGroup: FormGroup = new FormGroup({});
  ChangeAttachmentFormGroup: FormGroup = new FormGroup({});
  ChangeDeclarationFormGroup: FormGroup = new FormGroup({});

  GPartz: any;
  Direction: string;
  Language: string;
  Step: any = 1;
  CurrentDate = new Date();
  IdTypeList: any;
  FrequencyList: any;
  AttachmentTypeList: any;
  DisplayMainData: any;
  ElegibleCategoryDataSet: any;
  ElegibleCategory: any;
  ChangeAttachFiles: any[] = [];
  EligibleCategoryData: any;
  WholeData: any;
  ProvinceSet: any;
  CitySet: any;
  VTCPSet: any;
  EpCode: any;
  lang: any;
  direction: string;
  ContactIdTypeName: any;
  DeclarationIdTypeName: any;
  AddressProvinceName: any;
  ContactProvinceName: any;
  AddressPeriodicityName: any;
  ContactDOB: any;
  DeclarationDate: any;
  ReturnId: any;
  ErrorMsg: boolean = false;
  IsNewPersonalDetails: boolean = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private changeVatService: VatServicesService,
    private notifierService: NotifierService,
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
      this.lang = changeregistrationconstants.langz.arb.changeregistration;
      this.direction = changeregistrationconstants.langz.arb.dir;
      this.Direction = "rtl";
      this.Language = "A";
    } else {
      this.lang = changeregistrationconstants.langz.eng.changeregistration;
      this.direction = changeregistrationconstants.langz.eng.dir;
      this.Direction = "ltl";
      this.Language = "E";
    }

    this.InstructionFormGroup = new FormGroup({
      agree: new FormControl(false, [Validators.required])
    });

    this.ChangeAddressFormGroup = new FormGroup({
      buildingNo: new FormControl('', [Validators.required]),
      streetName: new FormControl('', [Validators.required]),
      province: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      quarter: new FormControl('', [Validators.required]),
      postalCode: new FormControl('', [Validators.required]),
      purchase: new FormControl('', [Validators.required]),
      landline: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      mobile: new FormControl('', [Validators.required]),
      iban: new FormControl('', [Validators.required]),
      frequency: new FormControl('', [Validators.required]),
      decFlag: new FormControl(false, [Validators.required])
    });

    this.ChangeContactPersonFormGroup = new FormGroup({
      contactIdType: new FormControl('', [Validators.required]),
      contactIdNumber: new FormControl('', [Validators.required]),
      contactDOB: new FormControl('', [Validators.required]),
      contactFirstName: new FormControl('', [Validators.required]),
      contactLastName: new FormControl('', [Validators.required]),
      contactBuildNo: new FormControl('', [Validators.required]),
      contactStreet: new FormControl('', [Validators.required]),
      contactProvince: new FormControl('', [Validators.required]),
      contactCity: new FormControl('', [Validators.required]),
      contactQuarter: new FormControl('', [Validators.required]),
      contactPostalCode: new FormControl('', [Validators.required]),
      contactLandline: new FormControl('', [Validators.required]),
      contactMobile: new FormControl('', [Validators.required]),
      contactJobTitle: new FormControl('', [Validators.required]),
      contactEmail: new FormControl('', [Validators.required])
    });

    this.ChangeDeclarationFormGroup = new FormGroup({
      decIdType: new FormControl('', [Validators.required]),
      decIdNumber: new FormControl('', [Validators.required]),
      decName: new FormControl('', [Validators.required]),
      decDate: new FormControl('', [Validators.required]),
      decFlag1: new FormControl('', [Validators.required]),
      decFlag2: new FormControl('', [Validators.required])
    });
  }

  ngOnInit() {
    this.getAllAPICallsList();
    this.getDefaultAllListSet();
    this.instructionFormControls();
  }

  stepsChecking() {
    switch (this.Step) {
      case 1:
        break;
      case 2:
        this.getAddressControls();
        break;
      case 3:
        break;
      case 4:
        this.getContactPersonControls();
        break;
      case 5:
        this.getDeclarationControls();
        break;
      case 6:
        this.getSummaryDetails();
        break;
      case 7:
        this.getAcknowledgement();
        break;
      default:
        break;
    }

    return this.Step;
  }

  getDefaultAllListSet() {
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

      this.FrequencyList = {
        "frequency": [
          {
            "Key": "",
            "Text": ""
          },
          {
            "Key": "QU",
            "Text": "Quarterly refund application"
          },
          {
            "Key": "AN",
            "Text": "Yearly refund application"
          }
        ]
      }

      this.AttachmentTypeList = {
        "type": [
          {
            "Key": "",
            "Text": ""
          },
          {
            "Key": "EP25",
            "Text": "Copy of ID"
          },
          {
            "Key": "EP27",
            "Text": "Copy of employment contract or proof of employment at the Elegible entity"
          },
          {
            "Key": "EP28",
            "Text": "Others"
          }
        ]
      }
    }
    this.IdTypeList = this.IdTypeList.idTyp;
    this.FrequencyList = this.FrequencyList.frequency;
    this.AttachmentTypeList = this.AttachmentTypeList.type;
  }

  instructionFormControls() {
    $('#infoModal').modal('show');
  }

  termsAndConditionsOfInstructionAcceptance() {
    $('#infoModal').modal('hide');
  }

  getAddressControls() {
    this.ChangeAddressFormGroup.controls['buildingNo'].setValue(this.WholeData.Building);
    this.ChangeAddressFormGroup.controls['streetName'].setValue(this.WholeData.Street);
    this.ChangeAddressFormGroup.controls['province'].setValue(this.WholeData.Region);
    this.ChangeAddressFormGroup.controls['city'].setValue(this.WholeData.City1);
    this.ChangeAddressFormGroup.controls['quarter'].setValue(this.WholeData.Quarter);
    this.ChangeAddressFormGroup.controls['postalCode'].setValue(this.WholeData.PostCode1);
    this.ChangeAddressFormGroup.controls['purchase'].setValue(this.WholeData.Betrh);
    this.ChangeAddressFormGroup.controls['landline'].setValue(this.WholeData.TelNumber);
    this.ChangeAddressFormGroup.controls['email'].setValue(this.WholeData.Email);
    this.ChangeAddressFormGroup.controls['mobile'].setValue(this.WholeData.Mobile);
    this.ChangeAddressFormGroup.controls['iban'].setValue(this.WholeData.Iban);
    this.ChangeAddressFormGroup.controls['frequency'].setValue(this.WholeData.Periodicity);
    this.ChangeAddressFormGroup.controls['decFlag'].setValue(this.agreeStringValueCheck(this.WholeData.Confirmfg));
  }
  
  getContactPersonControls() {
    this.ChangeContactPersonFormGroup.controls['contactIdType'].setValue(this.VTCPSet.Type);
    this.ChangeContactPersonFormGroup.controls['contactIdNumber'].setValue(this.VTCPSet.Idnumber);
    this.ChangeContactPersonFormGroup.controls['contactDOB'].setValue(this.VTCPSet.Birthdt !== undefined ? new Date(+this.VTCPSet.Birthdt) : this.CurrentDate);
    this.ChangeContactPersonFormGroup.controls['contactFirstName'].setValue(this.VTCPSet.Firstnm);
    this.ChangeContactPersonFormGroup.controls['contactLastName'].setValue(this.VTCPSet.Lastnm);
    this.ChangeContactPersonFormGroup.controls['contactBuildNo'].setValue(this.VTCPSet.Building);
    this.ChangeContactPersonFormGroup.controls['contactStreet'].setValue(this.VTCPSet.Street);
    this.ChangeContactPersonFormGroup.controls['contactProvince'].setValue(this.VTCPSet.Region);
    this.ChangeContactPersonFormGroup.controls['contactCity'].setValue(this.VTCPSet.City1);
    this.ChangeContactPersonFormGroup.controls['contactQuarter'].setValue(this.VTCPSet.Quarter);
    this.ChangeContactPersonFormGroup.controls['contactPostalCode'].setValue(this.VTCPSet.PostCode1);
    this.ChangeContactPersonFormGroup.controls['contactLandline'].setValue(this.VTCPSet.TelNumber);
    this.ChangeContactPersonFormGroup.controls['contactMobile'].setValue(this.VTCPSet.Mobile);
    this.ChangeContactPersonFormGroup.controls['contactJobTitle'].setValue(this.VTCPSet.Designation);
    this.ChangeContactPersonFormGroup.controls['contactEmail'].setValue(this.VTCPSet.Email);
  }

  getNewContactPersonControls() {
    this.ChangeContactPersonFormGroup.controls['contactIdType'].setValue('');
    this.ChangeContactPersonFormGroup.controls['contactIdNumber'].setValue('');
    this.ChangeContactPersonFormGroup.controls['contactDOB'].setValue('');
    this.ChangeContactPersonFormGroup.controls['contactFirstName'].setValue('');
    this.ChangeContactPersonFormGroup.controls['contactLastName'].setValue('');
    this.ChangeContactPersonFormGroup.controls['contactBuildNo'].setValue('');
    this.ChangeContactPersonFormGroup.controls['contactStreet'].setValue('');
    this.ChangeContactPersonFormGroup.controls['contactProvince'].setValue('');
    this.ChangeContactPersonFormGroup.controls['contactCity'].setValue('');
    this.ChangeContactPersonFormGroup.controls['contactQuarter'].setValue('');
    this.ChangeContactPersonFormGroup.controls['contactPostalCode'].setValue('');
    this.ChangeContactPersonFormGroup.controls['contactLandline'].setValue('');
    this.ChangeContactPersonFormGroup.controls['contactMobile'].setValue('');
    this.ChangeContactPersonFormGroup.controls['contactJobTitle'].setValue('');
    this.ChangeContactPersonFormGroup.controls['contactEmail'].setValue('');
  }
  
  getDeclarationControls() {
    this.ChangeDeclarationFormGroup.controls['decIdType'].setValue(this.WholeData.Type);
    this.ChangeDeclarationFormGroup.controls['decIdNumber'].setValue(this.WholeData.IdnumberDec);
    this.ChangeDeclarationFormGroup.controls['decName'].setValue(this.WholeData.Name);
    this.ChangeDeclarationFormGroup.controls['decDate'].setValue(this.WholeData.Decdob !== null ? new Date(+this.WholeData.Decdob) : this.CurrentDate);
    this.ChangeDeclarationFormGroup.controls['decFlag1'].setValue(this.agreeStringValueCheck(this.WholeData.Decfg));
    this.ChangeDeclarationFormGroup.controls['decFlag2'].setValue(this.agreeStringValueCheck(this.WholeData.Decfg1));
  }

  changePersonalDetails(value) {
    $('#addNew').modal('hide');
    this.IsNewPersonalDetails = value;
    this.getNewContactPersonControls();
  }

  close(value) {
    $('#addNew').modal('hide');
    this.IsNewPersonalDetails = value;
    this.getContactPersonControls();
  }

  deleteAttachment(j) {
    this.ChangeAttachFiles.splice(j, 1);
  }

  uploadFile(event) {
    var obj = { name: '', size: 0, type: '', docType: '', attachTypeName: '',  url: '', did: '' };
    for (let i = 0; i < event.length; i++) {
      const element = event[i];
      obj.name = element.name.split(".")[0];
      obj.size = element.size / 10000;
      obj.type = element.name.split(".")[1];
      obj.docType = 'EP29';
    }
    this.ChangeAttachFiles.push(obj);
    console.log ('AttachFiles', this.ChangeAttachFiles);
    this.uploadFiles();
  }

  uploadFiles() {
    const frmData = new FormData();
    let fileName;
    let docType;
    for (var i = 0; i < this.ChangeAttachFiles.length; i++) {
      fileName = `${this.ChangeAttachFiles[i]["name"]}.${this.ChangeAttachFiles[i]["type"]}`;
      docType = this.ChangeAttachFiles[i]["docType"];
      frmData.append("fileUpload", this.ChangeAttachFiles[i]);
    }
    console.log("res", fileName, this.ChangeAttachFiles);
    this.changeVatService.getVatChangeAttachSave(this.ReturnId, docType, fileName, frmData).subscribe(data => {
      if(data) {
        console.log('attch-data', data["d"]);
        for(let h=0; h<this.ChangeAttachFiles.length; h++) {
          if(this.ChangeAttachFiles[h].url == '') {
            this.ChangeAttachFiles[h].url = data["d"]["DocUrl"];
            this.ChangeAttachFiles[h].did = data["d"]["Doguid"];
          }
        }
      }
    }, (error) => {
      console.log('attch-error', error);
    });
  }
  
  getSummaryDetails() {
    const entityAddress = this.ChangeAddressFormGroup.getRawValue();
    const contactPerson = this.ChangeContactPersonFormGroup.getRawValue();
    const declaration = this.ChangeDeclarationFormGroup.getRawValue();
    for(let i=0; i<this.IdTypeList.length; i++) {
      if(contactPerson.contactIdType == this.IdTypeList[i].Key) {
        this.ContactIdTypeName = this.IdTypeList[i].Text;
      }
      if(declaration.decIdType == this.IdTypeList[i].Key) {
        this.DeclarationIdTypeName = this.IdTypeList[i].Text;
      }
    }
    for(let j=0; j<this.ProvinceSet.length; j++) {
      if(entityAddress.province == this.ProvinceSet[j].Bland) {
        this.AddressProvinceName = this.ProvinceSet[j].Bezei;
      }
      if(contactPerson.contactProvince == this.ProvinceSet[j].Bland) {
        this.ContactProvinceName = this.ProvinceSet[j].Bezei;
      }
    }
    for(let k=0; k<this.FrequencyList.length; k++) {
      if(entityAddress.frequency == this.FrequencyList[k].Key) {
        this.AddressPeriodicityName = this.FrequencyList[k].Text;
      }
    }
    this.ContactDOB = contactPerson.contactDOB !== undefined && contactPerson.contactDOB !== null && contactPerson.contactDOB !== '' && contactPerson.contactDOB !== 'Invalid Date' ? new Date(`${this.datePickerValue(contactPerson.contactDOB)}`) : this.CurrentDate;
    this.DeclarationDate = declaration.decDate !== undefined && declaration.decDate !== null && declaration.decDate !== '' && declaration.decDate !== 'Invalid Date' ? declaration.decDate : this.CurrentDate;
    this.WholeData.Building = entityAddress.buildingNo;
    this.WholeData.Street = entityAddress.streetName;
    this.WholeData.Region = entityAddress.province;
    this.WholeData.City1 = entityAddress.city;
    this.WholeData.Quarter = entityAddress.quarter;
    this.WholeData.PostCode1 = entityAddress.postalCode;
    this.WholeData.Betrh = entityAddress.purchase;
    this.WholeData.TelNumber = entityAddress.landline;
    this.WholeData.Email = entityAddress.email;
    this.WholeData.Mobile = entityAddress.mobile;
    this.WholeData.Iban = entityAddress.iban;
    this.WholeData.Periodicity = entityAddress.frequency;
    this.WholeData.Confirmfg = this.agreeBooleanValueCheck(entityAddress.decFlag);
    this.WholeData.VTCPSet.results[0].Building = contactPerson.contactBuildNo;
    this.WholeData.VTCPSet.results[0].Street = contactPerson.contactStreet;
    this.WholeData.VTCPSet.results[0].Region = contactPerson.contactProvince;
    this.WholeData.VTCPSet.results[0].City1 = contactPerson.contactCity;
    this.WholeData.VTCPSet.results[0].Quarter = contactPerson.contactQuarter;
    this.WholeData.VTCPSet.results[0].PostCode1 = contactPerson.contactPostalCode;
    this.WholeData.VTCPSet.results[0].Designation = contactPerson.contactJobTitle;
    this.WholeData.VTCPSet.results[0].TelNumber = contactPerson.contactLandline;
    this.WholeData.VTCPSet.results[0].Email = contactPerson.contactEmail;
    this.WholeData.VTCPSet.results[0].Mobile = contactPerson.contactMobile;
    this.WholeData.VTCPSet.results[0].Type = contactPerson.contactIdType;
    this.WholeData.VTCPSet.results[0].Idnumber = contactPerson.contactIdNumber;
    this.WholeData.VTCPSet.results[0].Birthdt = contactPerson.contactDOB !== undefined && contactPerson.contactDOB !== null && contactPerson.contactDOB !== '' && contactPerson.contactDOB !== "Invalid Date" ? this.datePickerValue(contactPerson.contactDOB) : this.CurrentDate.toISOString().slice(0, 16);
    this.WholeData.VTCPSet.results[0].Firstnm = contactPerson.contactFirstName;
    this.WholeData.VTCPSet.results[0].Lastnm = contactPerson.contactLastName;
    this.WholeData.Type = declaration.decIdType;
    this.WholeData.IdnumberDec = declaration.decIdNumber;
    this.WholeData.Name = declaration.decName;
    this.WholeData.Decdob = declaration.decDate !== undefined && declaration.decDate !== null && declaration.decDate !== '' && declaration.decDate !== "Invalid Date" ? declaration.decDate.toISOString().slice(0, 16) : this.CurrentDate.toISOString().slice(0, 16);
    this.WholeData.Decfg = this.agreeBooleanValueCheck(declaration.decFlag1);
    this.WholeData.Decfg1 = this.agreeBooleanValueCheck(declaration.decFlag2);
    this.WholeData.UserTypz = "TP";
    return this.WholeData;
  }
  
  getAcknowledgement() {

  }

  datePickerValue(value) {
    if (value !== undefined && value !== null && value !== "") {
      if(value.calendarStart !== undefined) {
        let day = value.calendarStart.day;
        day = value.calendarStart.day < 10 ? "0" + value.calendarStart.day : value.calendarStart.day;
        let month = value.calendarStart.month;
        month = value.calendarStart.month < 10 ? "0" + value.calendarStart.month : value.calendarStart.month;
        let year = value.calendarStart.year;
        const convertedDate = `${year}-${month}-${day}T00:00:00`;
        return convertedDate;
      }
      else {
        return value;
      }
    } else {
      return null;
    }
  }

  continueFirstScreen() {
    this.step2();
  }

  continueSecondScreen() {
    const obj2 = this.ChangeAddressFormGroup.getRawValue();
    console.log('obj2', obj2);
    this.step3();
  }

  continueThirdScreen() {
    const obj3 = this.ChangeAttachFiles;
    console.log('obj3', obj3);
    this.step4();
  }

  continueFourthScreen() {
    const obj4 = this.ChangeContactPersonFormGroup.getRawValue();
    console.log('obj4', obj4);
    this.step5();
  }

  continueFifthScreen() {
    const obj5 = this.ChangeDeclarationFormGroup.getRawValue();
    console.log('obj5', obj5);
    this.step6();
  }

  continueSixthScreen() {
    const obj6 = this.getSummaryDetails();
    console.log('obj6', obj6);
    this.WholeData.Operationz = '01';
    this.changeVatService.getVatChangeSave(this.WholeData).subscribe(data => {
      if(data) {
        console.log('save-data', data["d"]);
        this.step7();
      }
    }, (error) => {
      console.log('save-error', error);
    });
  }

  getAllAPICallsList() {
    this.changeVatService.getVatChangeUHVTEPSRVData(this.GPartz, this.Language).subscribe((data) => {
      console.log('second-get-data', data["d"]);
      this.ElegibleCategoryDataSet = data["d"].ELG_CATESet.results;
      this.ProvinceSet = data["d"].PROVINCESet.results;
      this.CitySet = data["d"].CITYSet.results;
    }, (error) => {
      console.log('second-get-error', error);
    });

    this.changeVatService.getVatChangeUHSUPTSRVData(this.Language).subscribe((data) => {
      console.log('third-get-data', data["d"]);
    }, (error) => {
      console.log('third-get-error', error);
    });

    this.changeVatService.getVatChangeZDPSRVData(this.GPartz, this.Language).subscribe((data) => {
      console.log('first-get-data', data["d"]);
      this.ReturnId = data["d"].ReturnId;
      this.WholeData = data["d"];
      this.VTCPSet = data["d"].VTCPSet.results[0];
      this.EpCode = data["d"] !== undefined ? data["d"].EpCode : null;
      this.ElegibleCategory = this.ElegibleCategoryDataSet !== undefined && this.EpCode !== null ? this.ElegibleCategoryDataSet.filter(x => x.EpCode == this.EpCode) : null;
      this.ElegibleCategory = this.ElegibleCategory !== null ? this.ElegibleCategory[0].DepDescr : null;
    }, (error) => {
      console.log('first-get-error', error);
      this.ErrorMsg = true;
      this.notifierService.notify("error", error.error.error.innererror.errordetails[0].message);
      setTimeout(() => {
        this.router.navigate(['/mains/tax']);
      }, 5000);
    });
  }

  agreeBooleanValueCheck(value) {
    let agree;
    if (value == true) {
      agree = "X";
    }
    else {
      agree = "";
    }
    return agree;
  }

  agreeStringValueCheck(value) {
    let agree;
    if (value == "X") {
      agree = true;
    }
    else {
      agree = false;
    }
    return agree;
  }

  ngAfterViewInit() {
    setTimeout(() => {
      if(this.ErrorMsg == false) {
        if (this.DisplayMainData !== undefined) {
          this.InstructionFormGroup.controls['agree'].setValue(this.agreeStringValueCheck(this.DisplayMainData.AgrFg));
        }
        this.infoModal.nativeElement.click();
      }
    }, 5000);
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
