import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { ConsolidatedAccountsService } from '../consolidated-accounts.service';
import * as jsPDF from 'jspdf';
import { CalendarComponent } from 'src/app/constants/calendar.component';
import { cancelconsolidatedconstants } from "src/app/main/consolidated-accounts/cancel-consolidated-accounts/cancelconsolidatedconstants.model";
import { NotifierService } from 'angular-notifier';
import { AppService } from 'src/app/app.service';
declare var $;
@Component({
  selector: 'app-cancel-consolidated-accounts',
  templateUrl: './cancel-consolidated-accounts.component.html',
  styleUrls: ['./cancel-consolidated-accounts.component.css']
})
export class CancelConsolidatedAccountsComponent implements OnInit, AfterViewInit {

  @ViewChild('instructions', { static: false }) instructions: ElementRef;
  @ViewChild('htmlData', { static: false }) htmlData: ElementRef;

  InstructionFormGroup: FormGroup = new FormGroup({});
  ParentHoldingCompanyFormGroup: FormGroup = new FormGroup({});
  ParentAttachmentFormGroup: FormGroup = new FormGroup({});
  ChildHoldingCompanyFormGroup: FormGroup = new FormGroup({});
  ChildAttachmentFormGroup: FormGroup = new FormGroup({});
  DeclarationFormGroup: FormGroup = new FormGroup({});

  StringPattern = "^[a-zA-Z\u0600-\u06FF ][sa-zA-Z\u0600-\u06FF ]*$";
  NumberPattern = "^[0-9]*$";
  ContactNoPattern = "[5][0-9]{8}";
  headerComponent = CalendarComponent;

  GPartz: any;
  Direction: string;
  Language: string;
  Step: any = 1;
  ParentFiles: any = [];
  ChildFiles: any = [];
  SwitchOptionValue: boolean = false;
  CurrentDate = new Date();
  CCAListData: any;
  WholeData: any;
  ChildCompanies: any;
  ReferenceNo: any;
  Status: any;
  lang: any;
  direction: string;
  attachmentDataSetList: any[] = [];

  ParentFilesizeError: boolean = false;
  ChildFilesizeError: boolean = false;
  agree: boolean = false;

  ReleaseData = new ReleaseDetailsModel();
  AttachmentData = new AttachmentDetailsModel();
  DeclarationData = new DeclarationDetailsModel();
  AcknowledgementData = new AcknowledgementDetailsModel();
  isValidNumber:boolean=false;
  isBellowNine:boolean=false;
  isStartFiveBellowNine:boolean=false;
  errMSg: any;
  count: number;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private cancelService: ConsolidatedAccountsService,
    private notifierService: NotifierService,
    public appServ: AppService
  ) {
    this.GPartz = localStorage.getItem('gpart');

    if (localStorage.getItem("lang") === "ar") {
      this.lang = cancelconsolidatedconstants.langz.arb.cancelconsolidated;
      this.direction = cancelconsolidatedconstants.langz.arb.dir;
      this.Direction = "rtl";
      this.Language = "A";
    } else {
      this.lang = cancelconsolidatedconstants.langz.eng.cancelconsolidated;
      this.direction = cancelconsolidatedconstants.langz.eng.dir;
      this.Direction = "ltl";
      this.Language = "E";
    }
  }

  ngOnInit() {
    this.stepsChecking();
  }

  stepsChecking() {
    switch (this.Step) {
      case 1:
        this.allCCADetails();
        break;
      case 2:
        this.instructionFormControls();
        break;
      case 3:
        this.parentFormControls();
        this.childFormControls();
        break;
      case 4:
        this.declarationFormControls();
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

  createRequest() {
    this.cancelService.getWholeDetails(this.GPartz).subscribe((data) => {
      if (data["d"]) {
        console.log('data', data["d"]);
        this.WholeData = data["d"];
        this.ChildCompanies = data["d"].zhcd_childSet.results;
        this.Status = data["d"].Status;
        this.Step = 2;
        this.stepsChecking();
      }
    }, (error) => {
      console.log('err', error);
      this.errMSg = error["error"]["error"]["innererror"]["errordetails"][0]["message"];
      $("#ErrorModal").modal('show');
      this.Step = 1;
      this.stepsChecking();
    });
  }
  /* Step - 1 Info Starts */
  allCCADetails() {
    this.cancelService.getCCADetailsList(this.Language, this.GPartz).subscribe((data) => {
      if (data["d"]) {
        console.log('data', data["d"].ListSet.results);
        this.CCAListData = data["d"].ListSet.results;
      }
    }, (error) => {
      console.log('err', error);
    });
  }
  /* Step - 1 Info Ends */

  /* Step - 2 Info Starts */
  instructionFormControls() {
    this.ngAfterViewInit();
    this.InstructionFormGroup.addControl('agree', new FormControl(false, [Validators.required]));
    $('#instructions').modal('show');
  }

  termsAndConditionsOfInstructionAcceptance() {
    $('#instructions').modal('hide');
  }

  releaseDetails() {
    const FormValues = this.InstructionFormGroup.value;
    this.ReleaseData.Agree = FormValues.agree;
    this.ReleaseData.AHoldingCompany = this.WholeData.AHoldingCompany;
    this.ReleaseData.ATaxpayerType = this.WholeData.ATaxpayerType;
    this.ReleaseData.ATaxpayer = this.WholeData.ATaxpayer;
    this.ReleaseData.AAuthGroupsTexts = this.WholeData.AAuthGroupsTexts;
    this.ReleaseData.AAddress = this.WholeData.AAddress;
    this.ReleaseData.AAFinancialYear = this.WholeData.AFinancialYear;
    return this.ReleaseData;
  }

  continueFirstScreen() {
    const objData = this.releaseDetails();
    console.log('sc1', objData);
    this.step3();
  }

  // saveReleaseDetails() {
  //   this.releaseDetails();
  //   this.WholeData.AHoldingCompany = this.ReleaseData.AHoldingCompany;
  //   this.WholeData.ATaxpayerType = this.ReleaseData.ATaxpayerType;
  //   this.WholeData.ATaxpayer = this.ReleaseData.ATaxpayer;
  //   this.WholeData.AAuthGroupsTexts = this.ReleaseData.AAuthGroupsTexts;
  //   this.WholeData.AAddress = this.ReleaseData.AAddress;
  //   this.WholeData.AFinancialYear = this.ReleaseData.AAFinancialYear;
  //   this.WholeData.Savez = "X";
  //   // call service to save details as draft and redirect to next page. 
  //   this.cancelService.saveCancelConsolidatedDetails(this.WholeData).subscribe(data => {
  //     if(data) {
  //       console.log('release-save', data["d"]);
  //     }
  //   });
  // }
  /* Step - 2 Info Ends */

  /* Step - 3 Info Starts */
  parentFormControls() {
    this.ParentHoldingCompanyFormGroup = this.formBuilder.group({
      financialYear: this.formBuilder.control(this.WholeData.AFinancialYear, [Validators.required, Validators.pattern(this.NumberPattern), Validators.maxLength(4)]),
      document: this.formBuilder.array([this.createAttachment()])
    });
  }

  childFormControls() {
    this.ChildHoldingCompanyFormGroup = this.formBuilder.group({
      childControls: this.formBuilder.array([])
    });
    this.childControls();
    this.addChildControls();
  }

  setAttachmentControls() {
    this.parentFormControls();
    this.ChildHoldingCompanyFormGroup = this.formBuilder.group({
      childControls: this.formBuilder.array([])
    });
    this.childControls();
    for (let i = 0; i < this.ChildCompanies.length; i++) {
      var controls = this.formBuilder.group({
        date: this.formBuilder.control(this.ChildCompanies[i].ARatificationDateHTb),
        document: this.formBuilder.array([this.createAttachment()]),
        ARowSelectTb: this.formBuilder.control(false),
      });
      this.childControls().push(controls);
    }
    this.Step = 3;
  }

  childControls(): FormArray {
    return this.ChildHoldingCompanyFormGroup.get("childControls") as FormArray
  }

  childAttachments(index: number): FormArray {
    return this.childControls().at(index).get("document") as FormArray
  }

  addChildControls() {
    for (let i = 0; i < this.ChildCompanies.length; i++) {
      var controls = this.formBuilder.group({
        date: this.formBuilder.control(''),
        document: this.formBuilder.array([this.createAttachment()]),
        ARowSelectTb: this.formBuilder.control(false)
      });
      this.childControls().push(controls);
      this.ChildFiles.push([]);
    }
  }

  addChildAttchments(index: number) {
    this.childAttachments(index).push(this.createAttachment());
  }

  createAttachment(): FormGroup {
    return this.formBuilder.group({
      name: "",
      type: "",
      size: "",
      url: "",
      did: ""
    });
  }

  deleteAttachment(index) {
    let control = <FormArray>this.ParentHoldingCompanyFormGroup.controls.document;
    control.removeAt(index);
    this.ParentFiles.splice(index, 1);
    if (this.ParentFiles.length == 0) {
      this.parentFormControls();
    }
    console.log('deleteMain', this.ParentFiles);
  }

  deleteChildAttachments(mainIndex, childIndex) {
    this.ChildFiles[mainIndex].splice(childIndex, 1);
    console.log('deleteChild', this.ChildFiles);
  }

  uploadFile(event, k, type) {
    var obj = { name: '', size: 0, type: '' };
    for (let index = 0; index < event.length; index++) {
      const element = event[index];
      obj.name = element.name.split(".")[0],
        obj.size = element.size / 1000000,
        obj.type = element.name.split(".")[1]
    }
    if (type == 'parent' && obj.type !== 'png' && obj.type !== 'mp4' && obj.type !== 'mp3' && obj.type !== 'svg') {
      if (obj.size > 0 && obj.size <= 1) {
        this.ParentFiles.push(obj);
        console.log('ParentFiles', this.ParentFiles);
        this.uploadFiles(k, type);
        this.ParentFilesizeError = false;
      }
      else {
        this.ParentFilesizeError = true;
      }
    }
    else if (type == 'child' && obj.type !== 'png' && obj.type !== 'mp4' && obj.type !== 'mp3' && obj.type !== 'svg') {
      if (obj.size > 0 && obj.size <= 1) {
        this.ChildFilesizeError = false;
        for (let j = 0; j <= this.ChildFiles.length; j++) {
          if (j == k) {
            if (!this.ChildFiles[k]) {
              this.ChildFiles.push([obj]);
            }
            else {
              this.ChildFiles[k].push(obj);
            }
          }
        }
        console.log('ChildFiles', this.ChildFiles);
        this.uploadFiles(k, type);
      }
      else {
        this.ChildFilesizeError = true;
      }
    }
    else if (type == 'parent') {
      if (obj.type == 'png' || obj.type == 'mp4' || obj.type == 'mp3' || obj.type == 'svg') {
        this.notifierService.notify("warning", `${this.lang.nav.fileformatsupportmsg}`);
      }
    }
    else if (type == 'child') {
      if (obj.type == 'png' || obj.type == 'mp4' || obj.type == 'mp3' || obj.type == 'svg') {
        this.notifierService.notify("warning", `${this.lang.nav.fileformatsupportmsg}`);
      }
    }
  }

  uploadFiles(j, type) {
    const frmData = new FormData();
    let filename;
    let filetype;
    let filesize;
    let docType;
    let control;
    let fileControl;
    if (type == "parent") {
      for (var i = 0; i < this.ParentFiles.length; i++) {
        filename = this.ParentFiles[i]["name"];
        filetype = this.ParentFiles[i]["type"];
        filesize = this.ParentFiles[i]["size"];
        fileControl = `${this.ParentFiles[i]["name"]}.${this.ParentFiles[i]["type"]}`;
        frmData.append("fileUpload", this.ParentFiles[i]);
        docType = "RG24";
      }
      control = <FormArray>this.ParentHoldingCompanyFormGroup.controls.document;
    }
    else {
      for (var i = 0; i < this.ChildFiles.length; i++) {
        if (i == j) {
          if (this.ChildFiles[i].length >= 0) {
            for (let h = 0; h < this.ChildFiles[i].length; h++) {
              filename = this.ChildFiles[i][h]["name"];
              filetype = this.ChildFiles[i][h]["type"];
              filesize = this.ChildFiles[i][h]["size"];
              fileControl = `${this.ChildFiles[i][h]["name"]}.${this.ChildFiles[i][h]["type"]}`;
              frmData.append("fileUpload", this.ChildFiles[i][h]);
              docType = "RG25";
            }
          }
        }
      }
      control = this.childControls();
    }
    this.cancelService.postAttachmentDetails(fileControl, frmData, j + 1, docType, this.WholeData.CaseGuid).subscribe(data => {
      if (data) {
        if (type == "parent") {
          if (control._parent.controls.document.value[0].name == '') {
            control._parent.controls.document.value[0].name = filename;
            control._parent.controls.document.value[0].type = filetype;
            control._parent.controls.document.value[0].size = filesize;
            control._parent.controls.document.value[0].url = data["d"]["DocUrl"];
            control._parent.controls.document.value[0].did = data["d"]["Doguid"];
          }
          else {
            let attachobj = {
              name: filename,
              type: filetype,
              size: filesize,
              url: data["d"]["DocUrl"],
              did: data["d"]["Doguid"]
            }
            control._parent.controls.document.value.push(attachobj);
          }
        }
        else {
          for (let i = 0; i < control.length; i++) {
            if (i == j) {
              if (control.controls[i].value.document[0].name == '') {
                control.controls[i].value.document[0].name = filename;
                control.controls[i].value.document[0].type = filetype;
                control.controls[i].value.document[0].size = filesize;
                control.controls[i].value.document[0].url = data["d"]["DocUrl"];
                control.controls[i].value.document[0].did = data["d"]["Doguid"];
              }
              else {
                let attachobj = {
                  name: filename,
                  type: filetype,
                  size: filesize,
                  url: data["d"]["DocUrl"],
                  did: data["d"]["Doguid"]
                }
                control.controls[i].value.document.push(attachobj);
              }
            }
          }
        }
        console.log('controls', control);
      }
    });
  }

  childCompanyDetails() {
    this.attachmentDataSetList = [];
    let control = this.ChildHoldingCompanyFormGroup.controls['childControls'] as FormArray;
    let datePickerValue;
    let calendarType;
    for (let i = 0; i < this.ChildCompanies.length; i++) {
      if (control.controls[i].value.date !== '') {
        let day = control.controls[i].value.date.calendarStart.day;
        let month = control.controls[i].value.date.calendarStart.month;
        let year = control.controls[i].value.date.calendarStart.year;
        day = day < 10 ? `0${day}` : day;
        month = month < 10 ? `0${month}` : month;
        const calendarDate = `${year}-${month}-${day}`;
        datePickerValue = calendarDate;
        calendarType = control.controls[i].value.date.calendarName == "Islamic" ? 'H' : 'G';
      }
      else {
        datePickerValue = this.CurrentDate.toISOString().slice(0, 10);
        calendarType = 'G';
      }
      const ChildDetailsData = new ChildHoldingCompanyModel();
      ChildDetailsData.ATaxpayerTb = this.ChildCompanies[i].ATaxpayerTb;
      ChildDetailsData.AChildCompanyTb = this.ChildCompanies[i].AChildCompanyTb;
      ChildDetailsData.ATpTypDesc = this.ChildCompanies[i].ATpTypDesc;
      ChildDetailsData.ACalTypTb = calendarType;
      ChildDetailsData.ARatificationDateHTb = datePickerValue;
      ChildDetailsData.APercentageTb = this.ChildCompanies[i].APercentageTb;
      this.attachmentDataSetList.push(ChildDetailsData);
    }
    return this.attachmentDataSetList;
  }

  attachmentDetails() {
    const ParentFormData = this.ParentHoldingCompanyFormGroup.value;
    this.AttachmentData.AFinancialYear = ParentFormData.financialYear;
    this.AttachmentData.zhcd_childSet = this.childCompanyDetails();
    return this.AttachmentData;
  }

  continueSecondScreen() {
    const objData = this.attachmentDetails();
    let control = this.ChildHoldingCompanyFormGroup.controls['childControls'] as FormArray;
    this.count = 0;
    for (let i = 0; i < control.controls.length; i++) {
      if (!control.controls[i].valid) {
        this.count++;
      }
      if (control.controls[i].value.ARowSelectTb && this.ChildFiles[i].length <= 0) {
        this.count++;
      }
    }

    console.log("count", this.count);
    if (this.count == 0) {
      console.log('sc2', objData);
      this.step4();
    }
  }

  saveAttachmentDetails() {
    this.attachmentDetails();
    this.WholeData.AFinancialYear = this.AttachmentData.AFinancialYear;
    for (let i = 0; i < this.ChildCompanies.length; i++) {
      this.WholeData.zhcd_childSet["results"][i].ATaxpayerTb = this.AttachmentData.zhcd_childSet[i].ATaxpayerTb;
      this.WholeData.zhcd_childSet["results"][i].AChildCompanyTb = this.AttachmentData.zhcd_childSet[i].AChildCompanyTb;
      this.WholeData.zhcd_childSet["results"][i].ATpTypDesc = this.AttachmentData.zhcd_childSet[i].ATpTypDesc;
      this.WholeData.zhcd_childSet["results"][i].ACalTypTb = this.AttachmentData.zhcd_childSet[i].ACalTypTb;
      this.WholeData.zhcd_childSet["results"][i].ARatificationDateHTb = this.AttachmentData.zhcd_childSet[i].ARatificationDateHTb;
      this.WholeData.zhcd_childSet["results"][i].APercentageTb = this.AttachmentData.zhcd_childSet[i].APercentageTb;
      this.WholeData.zhcd_childSet["results"][i].ARowSelectTb = `${i + 1}`;
    }
    this.WholeData.Savez = "X";
    // call service to save details as draft and redirect to next page.
    this.cancelService.saveCancelConsolidatedDetails(this.WholeData).subscribe(data => {
      if (data) {
        this.notifierService.notify("success", `${this.lang.step3.t12}`);
        this.allCCADetails();
        console.log('attachments-save', data["d"]);
      }
    });

  }
  /* Step - 3 Info Ends */

  /* Step - 4 Info Starts */
  declarationFormControls() {
    this.DeclarationFormGroup.addControl('name', new FormControl('', [Validators.required, Validators.pattern(this.StringPattern)]));
    this.DeclarationFormGroup.addControl('contactNumber', new FormControl('', [Validators.required, Validators.pattern(this.ContactNoPattern), Validators.minLength(9), Validators.maxLength(9)]));
    this.DeclarationFormGroup.addControl('designation', new FormControl('', [Validators.required, Validators.pattern(this.StringPattern)]));
    this.DeclarationFormGroup.addControl('date', new FormControl(this.CurrentDate));
    this.DeclarationFormGroup.addControl('agree', new FormControl(false, [Validators.required]));
    this.declarationCheckboxValue();
  }

  setDeclarationControls() {
    let TermsAndConditionsSetValue = this.agreeStringValueCheck(this.DeclarationData.AAgree);
    this.DeclarationFormGroup.addControl('name', new FormControl(this.DeclarationData.ADecName, [Validators.required, Validators.pattern(this.StringPattern)]));
    this.DeclarationFormGroup.addControl('contactNumber', new FormControl(this.DeclarationData.ADecContact, [Validators.required, Validators.pattern(this.ContactNoPattern), Validators.minLength(9), Validators.maxLength(9)]));
    this.DeclarationFormGroup.addControl('designation', new FormControl(this.DeclarationData.ADecJobTitle, [Validators.required, Validators.pattern(this.StringPattern)]));
    this.DeclarationFormGroup.addControl('date', new FormControl(this.DeclarationData.Date));
    this.DeclarationFormGroup.addControl('agree', new FormControl(TermsAndConditionsSetValue, [Validators.required]));
    this.declarationCheckboxValue();
    this.Step = 4;
  }

  declarationDetails() {
    const FormValues = this.DeclarationFormGroup.getRawValue();
    let TermsAndConditionsCheckedValue = this.agreeBooleanValueCheck(FormValues.agree);
    this.DeclarationData.ADecName = FormValues.name;
    this.DeclarationData.ADecContact = FormValues.contactNumber;
    this.DeclarationData.ADecJobTitle = FormValues.designation;
    this.DeclarationData.Date = FormValues.date;
    this.DeclarationData.AAgree = TermsAndConditionsCheckedValue;
    return this.DeclarationData;
  }

  continueThirdScreen() {
    const objData = this.declarationDetails();
    console.log('sc3', objData);
    this.step5();
  }

  saveDeclarationDetails() {
    this.declarationDetails();
    this.WholeData.ADecName = this.DeclarationData.ADecName;
    this.WholeData.ADecContact = this.DeclarationData.ADecContact;
    this.WholeData.ADecJobTitle = this.DeclarationData.ADecJobTitle;
    this.WholeData.AAgree = this.DeclarationData.AAgree;
    this.WholeData.Savez = "X";
    // call service to save details as draft and redirect to next page. 
    this.cancelService.saveCancelConsolidatedDetails(this.WholeData).subscribe(data => {
      if (data) {
        this.notifierService.notify("success", `${this.lang.step4.t14}`);
        this.allCCADetails();
        console.log('declaration-save', data["d"]);
      }
    });
  }
  /* Step - 4 Info Ends */

  /* Step - 5 Info Starts */
  summaryDetails() {
    for (let i = 0; i < this.ChildCompanies.length; i++) {
      this.WholeData.zhcd_childSet["results"][i].ATaxpayerTb = this.AttachmentData.zhcd_childSet[i].ATaxpayerTb;
      this.WholeData.zhcd_childSet["results"][i].AChildCompanyTb = this.AttachmentData.zhcd_childSet[i].AChildCompanyTb;
      this.WholeData.zhcd_childSet["results"][i].ATpTypDesc = this.AttachmentData.zhcd_childSet[i].ATpTypDesc;
      this.WholeData.zhcd_childSet["results"][i].ACalTypTb = this.AttachmentData.zhcd_childSet[i].ACalTypTb;
      this.WholeData.zhcd_childSet["results"][i].ARatificationDateHTb = this.AttachmentData.zhcd_childSet[i].ARatificationDateHTb;
      this.WholeData.zhcd_childSet["results"][i].APercentageTb = this.AttachmentData.zhcd_childSet[i].APercentageTb;
      this.WholeData.zhcd_childSet["results"][i].ARowSelectTb = `${i + 1}`;
    }
    this.WholeData.AHoldingCompany = this.ReleaseData.AHoldingCompany;
    this.WholeData.ATaxpayerType = this.ReleaseData.ATaxpayerType;
    this.WholeData.ATaxpayer = this.ReleaseData.ATaxpayer;
    this.WholeData.AAuthGroupsTexts = this.ReleaseData.AAuthGroupsTexts;
    this.WholeData.AAddress = this.ReleaseData.AAddress;
    this.WholeData.AFinancialYear = this.ReleaseData.AAFinancialYear;
    this.WholeData.AFinancialYear = this.AttachmentData.AFinancialYear;
    this.WholeData.ADecName = this.DeclarationData.ADecName;
    this.WholeData.ADecContact = this.DeclarationData.ADecContact;
    this.WholeData.ADecJobTitle = this.DeclarationData.ADecJobTitle;
    this.WholeData.AAgree = this.DeclarationData.AAgree;
    return this.WholeData;
  }

  continueFourthScreen() {
    this.WholeData.Savez = "X";
    this.WholeData.Submitz = "X";
    this.summaryDetails();
    console.log('save', this.WholeData);
    this.cancelService.saveCancelConsolidatedDetails(this.WholeData).subscribe(data => {
      if (data) {
        console.log('final-submit', data["d"]);
        this.ReferenceNo = data["d"].Fbnumz;
        this.acknowledgementDetails();
        this.step6();
      }
    });
  }

  saveSummaryDetails() {
    this.WholeData.Savez = "X";
    this.WholeData.Submitz = "X";
    this.summaryDetails();
    // call service to save details as draft and redirect to next page.
    this.cancelService.saveCancelConsolidatedDetails(this.WholeData).subscribe(data => {
      if (data) {
        console.log('final-save', data["d"]);
        this.ReferenceNo = data["d"].Fbnumz;
        this.acknowledgementDetails();
      }
    });
  }
  /* Step - 5 Info Ends */

  /* Step - 6 Info Starts */
  acknowledgementDetails() {
    this.AcknowledgementData.Name = this.DeclarationData.ADecName;
    this.AcknowledgementData.ReferenceNumber = this.ReferenceNo;
    this.AcknowledgementData.Date = this.DeclarationData.Date;
  }

  downloadDoc() {
    // var doc = new jsPDF();
    // let content = this.htmlData.nativeElement;
    // doc.fromHTML(content.innerHTML, 50, 50, {
    //   'width': 200
    // },
    // function (bla) { doc.save('demoPDFDoc.pdf'); }, 0);
    this.router.navigate(['mains/tax']);
  }
  /* Step - 6 Info Ends */

  agreeBooleanValueCheck(value) {
    let agree;
    if (value == true) {
      agree = "X";
    }
    else {
      agree = "Y";
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

  declarationCheckboxValue() {
    if (this.Status !== undefined && this.Status == "E0001" || this.Status == "IP017") {
      this.DeclarationFormGroup.controls['agree'].setValue(true);
      this.DeclarationFormGroup.controls['agree'].disable({ onlySelf: true });
    }
  }
  cancelConsolidateStep2() {
    this.router.navigateByUrl("/mains/tax");
    this.appServ.cancelConsolidateStep2.next(true);
    this.appServ.cancelConsolidateStep3.next(false);

  }
  cancelConsolidateStep3() {
    this.router.navigateByUrl("/mains/tax");
    this.appServ.cancelConsolidateStep2.next(false);
    this.appServ.cancelConsolidateStep3.next(true);

  }
  cancelConsolidateStep1() {
    this.appServ.cancelConsolidateStep2.next(false);
    this.appServ.cancelConsolidateStep3.next(false);
    this.router.navigateByUrl("/mains/tax");
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
  switchChange(val, index) {
    console.log(val.target.checked);
    console.log(this.childControls)
    let control = this.ChildHoldingCompanyFormGroup.controls['childControls'] as FormArray;
    control.controls[index].patchValue({ 'ARowSelectTb': val.target.checked });
    if (val.target.checked) {
      control.controls[index].get('date').setValidators([Validators.required]);
    }
    else {
      control.controls[index].get('date').clearValidators();
    }

  }
  ngAfterViewInit() {
    if (this.Step == 2) {
      setTimeout(() => {
        this.InstructionFormGroup.controls['agree'].setValue(false);
        // if(this.Status !== undefined && this.Status == "E0001" || this.Status == "IP017") {
        //   this.InstructionFormGroup.controls['agree'].setValue(true);
        // }
        this.instructions.nativeElement.click();
      }, 1000)
    }
  }
  
isNumberKey(event) {
  let charCode = (event.which) ? event.which : event.keyCode;
  if ((charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123) || (charCode == 32)) {
    return false;
  }
}; 
isNumberValid() {
  let value = this.DeclarationFormGroup.value.contactNumber[0]; 
  let len=this.DeclarationFormGroup.value.contactNumber.length;
  if (value !== "" && value !== undefined) {
    if (value == "5") {
      this.isValidNumber = false;
    }     
    else {
      this.isValidNumber = true;
    }
    if(len == 9){
      this.isStartFiveBellowNine=false;
    }
    else{
      this.isStartFiveBellowNine=true;
    }
  } else {
    this.isValidNumber = false;
    this.isStartFiveBellowNine=false;
  } 
}

}

export class ReleaseDetailsModel {
  Agree: boolean;
  AHoldingCompany: string;
  ATaxpayerType: string;
  ATaxpayer: number;
  AAuthGroupsTexts: string;
  AAddress: string;
  AAFinancialYear: string;
}

export class AttachmentDetailsModel {
  AFinancialYear: number;
  zhcd_childSet: Array<ChildHoldingCompanyModel>
}

export class ChildHoldingCompanyModel {
  ATaxpayerTb: number;
  AChildCompanyTb: string;
  ATpTypDesc: string;
  ACalTypTb: string;
  ARatificationDateHTb: string;
  APercentageTb: number;
}

export class DeclarationDetailsModel {
  ADecName: string;
  ADecContact: number;
  ADecJobTitle: string;
  Date: string;
  AAgree: boolean;
}

export class AcknowledgementDetailsModel {
  Name: string;
  ReferenceNumber: number;
  Date: string;
}
