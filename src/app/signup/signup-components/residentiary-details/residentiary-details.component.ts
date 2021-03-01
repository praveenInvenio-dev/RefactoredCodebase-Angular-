import { OnInit, HostListener, Component, ViewEncapsulation, EventEmitter, Input, Output } from "@angular/core";
import { FormGroup, FormBuilder, FormArray, Validators, FormControl } from "@angular/forms";
import { NotifierService } from "angular-notifier";
import * as moment from "moment";
import { Subscription } from "rxjs";
import { AppService } from "src/app/app.service";
import { CalendarComponent } from "src/app/constants/calendar.component";
import { CommonValidation } from "src/app/constants/commonValidations";
import { SignupService } from "src/app/services/signup.service";
import { naturalGasConstants } from "../../others/natural-gas/natural-gas.constants";
declare var jQuery: any;

@Component({
  selector: 'signup-residentiary-details',
  templateUrl: './residentiary-details.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./residentiary-details.component.css'],
})

export class ResidentiaryDetailsComponent implements OnInit {

  @Input("direction") dir: string;
  @Input("tin") TIN: string;
  @Input("tpType") tpType: string;
  @Output()
  completed: EventEmitter<string> = new EventEmitter<string>();
  lang;
  direction;
  innerWidth: number;
  headerComponent = CalendarComponent;
  panelOpenState: boolean = false;
  enableResendButton: boolean;
  resend: boolean;
  retryCount: number = 1;
  CaseGuid: any;
  applicationNo: any;
  companyName: any;
  applicationSubmissionDate = new Date().toDateString();
  maxDate = moment([2020 + 1, 11, 31]);//new Date(new Date().setFullYear(2021));
  selectedLanguage: string;
  branches: any;
  legalEntityTypes: any;
  legalEntityOptions: any;
  label: any;
  showTin: boolean = false;
  showRepBranch: boolean = false;
  @HostListener("window:resize", ["$event"])
  onResize(event) {
    this.innerWidth = window.innerWidth;
    //console.log("soze", this.innerWidth);
  }
  resDetailsForm: FormGroup;

  @Output() onResDetailsChange: EventEmitter<any> = new EventEmitter<any>();
  registrationObj: any = null;
  @Input() set regSet(registrationObj: any) {
    this.registrationObj = registrationObj;
  }
  MCI_RESIDENTIARY_DETAILS: any = null;
  @Input() set mciResidentiaryDetails(mciResidentiaryDetails: any) {
    //console.log("Input mciResidentiaryDetails",this.resDetailsForm);
    this.MCI_RESIDENTIARY_DETAILS = mciResidentiaryDetails || null;
    if (this.MCI_RESIDENTIARY_DETAILS) {
      this.resDetailsForm.patchValue({ "Augrp": this.MCI_RESIDENTIARY_DETAILS.Augrp || "" });
      this.resDetailsForm.get("Augrp").disable();
      this.resDetailsForm.get("Augrp").clearValidators();
      this.resDetailsForm.get("Augrp").updateValueAndValidity();
    } else {
      this.resDetailsForm.get("Augrp").enable();
      this.resDetailsForm.get("Augrp").setValidators(Validators.required);
      this.resDetailsForm.get("Augrp").updateValueAndValidity();
    }
  }
  constructor(private fb: FormBuilder, public commonValid: CommonValidation, public notifierService: NotifierService, public appSrv: AppService, public signupService: SignupService) {
    //console.log("constructor");
    this.resDetailsForm = this.getResidentiayDetailsForm();
  }

  ngOnInit(): void {
    //console.log("ngOnInit mciResidentiaryDetails");
    if (localStorage.getItem("lang") === "ar") {
      this.lang = naturalGasConstants.langz.arb.consortium;
      this.label = Constants.lang.arb;
      this.direction = Constants.lang.arb.dir;
      this.selectedLanguage = "ar";
    } else {
      this.lang = naturalGasConstants.langz.eng.consortium;
      this.direction = Constants.lang.eng.dir;
      this.label = Constants.lang.eng;
      this.selectedLanguage = "en";
    }

    this.resDetailsForm = this.fb.group({
      tin: [""],
      Augrp: ["", Validators.required], // Reporting Branch
      resStatus: ["", Validators.required], // Resident or Non-resident
      Orgresidence: [""], // Select option between Resident & Non-Resident
      Orgforresident: [""], // legal Entity for Resident
      Orgnonresident: [""], // legal Entity for Non-Resident
      attchmnt: this.fb.array([]),
      resAttchmnt: [""],
      compType: ["", Validators.required],
      Orgforresidentoptions: [""], // legal Entity Options for Resident (Capital & Personal)
      Orgresidentprofessional: [""], // legal Entity Options for Resident (Professional)
      Orgnonresidentoptions: [""], // legal Entity Options for Non-Resident (Permanent Establishment)
      Orgnonresidentactivity: [""], // legal Entity Options for Non-Resident (Other Taxable income from sources within the KSA)
      Topmgatt:[""]//attachment
    });
    //console.log(this.resDetailsForm);

    if (this.tpType == '1') {
      this.showRepBranch = true;
    }

    if (this.tpType == '2' || this.tpType == '3' || !this.showRepBranch) {
      this.resDetailsForm.get('Augrp').setValue('111');
      this.resDetailsForm.get('Augrp').disable()
    }

    if (this.tpType == '3') {
      this.resDetailsForm.get('resStatus').setValue('1');
    }

    this.resDetailsForm.get('resStatus').valueChanges.subscribe(i => {
      this.legalEntityOptions = [];
      this.resDetailsForm.patchValue({
        Orgresidence: "",
        Orgforresident: "",
        compType: "",
        Orgforresidentoptions: "",
        Orgresidentprofessional: "",
        Orgnonresident: "",
        Orgnonresidentoptions: "",
        Orgnonresidentactivity: "",
      }, { emitEvent: false });

      if (i == '1') {
        if (this.registrationObj?.Atype === '1') {
          this.resDetailsForm.get('compType').setErrors(null);
          this.resDetailsForm.get('compType').clearValidators();
        }
        this.resDetailsForm.get('Orgresidence').setValidators(Validators.required);
        this.resDetailsForm.get('Orgforresident').setValidators(Validators.required);

        this.resDetailsForm.get('Orgnonresident').setErrors(null);
        this.resDetailsForm.get('Orgnonresident').clearValidators();
      } else {
        this.resDetailsForm.get('Orgnonresident').setValidators(Validators.required);

        this.resDetailsForm.get('Orgresidence').setErrors(null);
        this.resDetailsForm.get('Orgforresident').setErrors(null);
        this.resDetailsForm.get('Orgresidence').clearValidators();
        this.resDetailsForm.get('Orgforresident').clearValidators();
      }

      this.resDetailsForm.updateValueAndValidity()
    });

    this.resDetailsForm.get('Orgforresident').valueChanges.subscribe(i => {
      if (i == '1') {
        this.legalEntityOptions = Constants.legalEntityForCapital;
      }
      if (i == '2') {
        this.legalEntityOptions = Constants.legalEntityForPersonal;
      }
      if (i == '3') {
        this.legalEntityOptions = Constants.legalEntityForProfessional;
      }
      this.legalEntityOptions = [];
      this.resDetailsForm.patchValue({
        Orgnonresident: "",
        Orgnonresidentoptions: "",
        Orgnonresidentactivity: "",
        compType: "",
        Orgforresidentoptions: "",
      }, { emitEvent: false });
    });

    this.resDetailsForm.get('Orgresidence').valueChanges.subscribe(i => {
      if (i == '2') {
        this.resDetailsForm.get('resAttchmnt').setValidators(Validators.required);
      } else { this.resDetailsForm.get('resAttchmnt').setErrors(null); }
      this.resDetailsForm.patchValue({
        Orgnonresident: "",
        Orgnonresidentoptions: "",
        Orgnonresidentactivity: "",
        compType: "",
        Orgforresidentoptions: "",
        Orgforresident: ""
      }, { emitEvent: false });
      this.resDetailsForm.updateValueAndValidity();
    });

    this.resDetailsForm.get('Orgnonresident').valueChanges.subscribe(i => {
      if (i == '1') {
        this.legalEntityOptions = Constants.legalEntityForPermanentEstablishment;
      }
      if (i == '2') {
        this.legalEntityOptions = Constants.legalEntityForNonEstablishment;
      }
      this.resDetailsForm.patchValue({
        compType: "",
        Orgforresidentoptions: "",
        Orgforresident: ""
      }, { emitEvent: false });
    });

    this.getBranchList();
    //console.log("Residentiary Details Component :: ", this.tpType);
    if (this.tpType != '1') { // TBD while API Integration
      this.resDetailsForm.get('Augrp').setErrors(null);
      this.resDetailsForm.get('Augrp').disable();
      this.resDetailsForm.get('tin').disable();
    } else {
      this.resDetailsForm.get('Augrp').setValidators(Validators.required);
      this.resDetailsForm.get('Augrp').enable();
      this.resDetailsForm.get('tin').enable();
    }
    this.resDetailsForm.updateValueAndValidity();

    if ((this.TIN != '' && this.tpType == '1') || (this.TIN != '' && this.tpType == '2')) {
      this.showTin = true;
    }

  }


  getResidentiayDetailsForm() {
    let resDetailsForm = this.fb.group({
      tin: [""],
      Augrp: ["", Validators.required], // Reporting Branch
      resStatus: ["", Validators.required], // Resident or Non-resident
      Orgresidence: [""], // Select option between Resident & Non-Resident
      Orgforresident: [""], // legal Entity for Resident
      Orgnonresident: [""], // legal Entity for Non-Resident
      attchmnt: this.fb.array([]),
      resAttchmnt: [""],
      compType: ["", Validators.required],
      Orgforresidentoptions: [""], // legal Entity Options for Resident (Capital & Personal)
      Orgresidentprofessional: [""], // legal Entity Options for Resident (Professional)
      Orgnonresidentoptions: [""], // legal Entity Options for Non-Resident (Permanent Establishment)
      Orgnonresidentactivity: [""], // legal Entity Options for Non-Resident (Other Taxable income from sources within the KSA)
    });
    return resDetailsForm;
  }

  getBranchList() {
    this.appSrv.getBranchList().subscribe(res => {
      //console.log(res);
      this.branches = res['d']['results'];
      //console.log(this.branches);
    });
  }

  typeOfLegalEntityChange(event, str) {
    this.legalEntityOptions = [];
    if (str == 'R') {
      //console.log(event, this.resDetailsForm.get('Orgforresident').value)
      let id = this.resDetailsForm.get('Orgforresident').value;
      if (id == '1') {
        this.legalEntityOptions = Constants.legalEntityForCapital;
      }
      if (id == '2') {
        this.legalEntityOptions = Constants.legalEntityForPersonal;
      }
      if (id == '3') {
        this.legalEntityOptions = Constants.legalEntityForProfessional;
      }
    }

    if (str == 'NR') {
      //console.log(event, this.resDetailsForm.get('Orgnonresident').value)
      let id = this.resDetailsForm.get('Orgnonresident').value;
      if (id == '1') {
        this.legalEntityOptions = Constants.legalEntityForPermanentEstablishment;
      }
      if (id == '2') {
        this.legalEntityOptions = Constants.legalEntityForNonEstablishment;
      }
    }

  }

  submit() {
    console.log(this.resDetailsForm);
    this.validateAllFormFields(this.resDetailsForm);

    let saveRDFormObj = this.resDetailsForm.getRawValue();

    if (this.resDetailsForm.invalid) return;

    if (this.resDetailsForm.valid) {

      if (saveRDFormObj.resStatus == '2') {
        //this.resDetailsForm.get('Orgresidence').setValue('3');
        if (saveRDFormObj.Orgnonresident == '1') {
          this.resDetailsForm.get('Orgnonresidentoptions').patchValue(saveRDFormObj.compType);
        } else {
          this.resDetailsForm.get('Orgnonresidentactivity').patchValue(saveRDFormObj.compType);
        }
      } else {
        if (saveRDFormObj.Orgresidence == '1' || saveRDFormObj.Orgresidence == '2') {
          if (saveRDFormObj.Orgforresident != '3') {
            this.resDetailsForm.get('Orgforresidentoptions').patchValue(saveRDFormObj.compType);
          } else {
            this.resDetailsForm.get('Orgresidentprofessional').patchValue(saveRDFormObj.compType);
          }
        }
      }

      if(this.getAttachmentsCount(this.selectedAttachmentObj.uniqueDocTypeRef)>0){
        this.resDetailsForm.get('Topmgatt').setValue("X");
      }else{
        this.resDetailsForm.get('Topmgatt').setValue("");
      }
      console.log(this.resDetailsForm.getRawValue().Topmgatt);
      
      console.log(this.resDetailsForm.getRawValue().Augrp);
      this.resDetailsForm.updateValueAndValidity();
      console.log(saveRDFormObj);

      this.onResDetailsChange.emit({
        Augrp: !this.resDetailsForm.getRawValue().Augrp ? "" : this.resDetailsForm.getRawValue().Augrp, // Reporting Branch
        Orgresidence: saveRDFormObj.resStatus == '2' ? '3' : saveRDFormObj.Orgresidence, // Select option between Resident & Non-Resident
        Orgforresident: saveRDFormObj.Orgforresident, // legal Entity for Resident
        Orgnonresident: saveRDFormObj.Orgnonresident, // legal Entity for Non-Resident
        Orgforresidentoptions: saveRDFormObj.Orgforresidentoptions, // legal Entity Options for Resident (Capital & Personal)
        Orgresidentprofessional: saveRDFormObj.Orgresidentprofessional, // legal Entity Options for Resident (Professional)
        Orgnonresidentoptions: saveRDFormObj.Orgnonresidentoptions, // legal Entity Options for Non-Resident (Permanent Establishment)
        Orgnonresidentactivity: saveRDFormObj.Orgnonresidentactivity,
        Tpresidence: (saveRDFormObj.resStatus == '2') ? "3" : "1",
        Topmgatt:this.resDetailsForm.getRawValue().Topmgatt?this.resDetailsForm.getRawValue().Topmgatt:"" 
      });
    }
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

  //////////////////// Attachments Code Starts Here///////////////////////////////////////////////////

  public showAttachments: boolean = false;
  public brModalScrollPos: number = 0;
  public shModalScrollPos: number = 0;
  public selectedAttachmentObj = {
    ReturnIdx: null,
    fileObject: null,
    Dotyp: null,
    action: null,
    idNumber: null,
    formControlObj: null,
    displayLabel: null,
    atttchedFilesCount: 0,
    OutletRef: null,
    FileExtn: null,
    uniqueDocTypeRef: null
  };
  getUniqueDocTypeRef(source = '', Dotyp, idType: any = '', idNumber: any = '') {

    //BR-000-RG01-CR1-123456
    //BR-000-RG02-LN1-123456
    //BR-000-RG02-LN2-123456
    //BR-000-RG08-CN1-123456
    //SH-001-RG09-ID1-1123456

    let uniqueDocTypeRef = "";
    // if (source == 'BR') {
    //   uniqueDocTypeRef = source + "-" + this.branchDetailsForm.get("branchDetails").value.branchNo;
    // } else if (source == 'SH') {
    //   uniqueDocTypeRef = source + "-" + this.shareHolderDetailsForm.get("shareHolderDetails").value.shNo;
    // }
    uniqueDocTypeRef = uniqueDocTypeRef + "-" + Dotyp + "-" + idType;
    if (idNumber) {
      uniqueDocTypeRef = uniqueDocTypeRef + "-" + idNumber;
    }

    //console.log("uniqueDocTypeRef", uniqueDocTypeRef);

    return uniqueDocTypeRef || "";

  }

  onClickFileControl(Dotyp, action = '', idNumber = '', control: any = null, displayLabel = '', idType = '') {

    // this.showAttachments = true;
    let uniqueDocTypeRef = this.getUniqueDocTypeRef(action, Dotyp, idType, idNumber);
    this.selectedAttachmentObj = {
      ReturnIdx:this.registrationObj.ReturnIdx,
      fileObject: null,
      Dotyp: Dotyp,
      action: action,
      idNumber: idNumber,
      formControlObj: control,
      displayLabel: displayLabel,
      atttchedFilesCount: this.getAttachmentsCount(uniqueDocTypeRef),
      OutletRef: "",
      FileExtn: null,
      uniqueDocTypeRef: uniqueDocTypeRef
    };

    //console.log("onClickFileControl", this.selectedAttachmentObj);

    // this.brModalScrollPos = jQuery('#addBranchDetailsModal').scrollTop();
    // this.shModalScrollPos = jQuery('#addShareholderDetailsModal').scrollTop();
    // jQuery('#addBranchDetailsModal').scrollTop(0);
    // jQuery('#addShareholderDetailsModal').scrollTop(0);

    jQuery("#attachmentsModal").modal('show');
  }
  onFileDrop(files) {
    //console.log("onFileDrop", files);
    this.selectedAttachmentObj.fileObject = files['0'];
    this.selectedAttachmentObj.FileExtn = this.getFileExtenstion(files['0']);
    this.addAttachment(this.selectedAttachmentObj);
  }
  onFileSelect(event) {
    this.selectedAttachmentObj.fileObject = event.target.files[0];
    this.selectedAttachmentObj.FileExtn = this.getFileExtenstion(event.target.files[0]);
    //console.log("onFileSelect", this.selectedAttachmentObj);
    this.addAttachment(this.selectedAttachmentObj);
  }

  //file: File = null, Dotyp: string = '', ReturnIdx: string = '', OutletRef: string = '', control: FormControl = null
  addAttachment(selectedAttachmentObj) {

    let file = selectedAttachmentObj.fileObject;
    const fileExt = selectedAttachmentObj.FileExtn; //this.getFileExtenstion(file);
    if (!file) {
      return true;
    } else if (fileExt !== 'doc' && fileExt !== 'docx' && fileExt !== 'jpeg' && fileExt !== 'jpg' && fileExt !== 'pdf' && fileExt !== 'xls' && fileExt !== 'xlsx') {
      this.notifierService.notify('error', this.label.fileTypeError);
      return true;
    } else if (file && file.size == 0) {
      this.notifierService.notify("error", this.label.minFileSizeError);
      return true;
    } else if (file && file.size > 10485760) {
      this.notifierService.notify("error", this.label.fileSizeError);
      return true;
    }

    //console.log("addAttachment", this.selectedAttachmentObj);

    const formDataObj = new FormData();
    formDataObj.append("fileUpload", file);
    this.signupService.attachmentSubmit(selectedAttachmentObj.ReturnIdx, selectedAttachmentObj.Dotyp, file["name"] || '', formDataObj, selectedAttachmentObj.OutletRef).subscribe((response) => {

      response['d']['Dotyp'] = selectedAttachmentObj.Dotyp;
      response["d"]["OutletRef"] = selectedAttachmentObj.OutletRef;
      response["d"]["FileExtn"] = selectedAttachmentObj.FileExtn;
      response["d"]["uniqueDocTypeRef"] = selectedAttachmentObj.uniqueDocTypeRef;
      let fileFormObj = this.getFileForm();
      fileFormObj.patchValue(response["d"]);
      const attachmentsList = <FormArray>this.resDetailsForm.get("attchmnt");
      attachmentsList.push(fileFormObj);
      //console.log("attachmentsList", attachmentsList);
      selectedAttachmentObj.formControlObj.setValue(file["name"]);
      this.selectedAttachmentObj.atttchedFilesCount = this.getAttachmentsCount(selectedAttachmentObj.uniqueDocTypeRef);
      console.log(this.selectedAttachmentObj,(this.resDetailsForm.get('attchmnt').value)[0].Filename);
      
    }, (err) => {
      this.notifierService.notify(
        "error",
        err.error.error.innererror.errordetails[0].message
      );
    });
  }

  getFileExtenstion(file) {
    const parseExt = file["name"].split(".");
    const FileExtn = parseExt[parseExt.length - 1].toLowerCase();
    return FileExtn || "";
  }
  deleteAttachment(Dotyp, Doguid) {
    this.signupService.deleteAttachment(Dotyp, Doguid).subscribe((res) => {
      const control = <FormArray>this.resDetailsForm.get("attchmnt");
      // //console.log("delere", res);
      var brIndex = control.value.findIndex(attachmentObj => attachmentObj.Doguid == Doguid);
      control.removeAt(brIndex);
      this.selectedAttachmentObj.atttchedFilesCount = this.getAttachmentsCount(this.selectedAttachmentObj.uniqueDocTypeRef);
      if (this.selectedAttachmentObj.atttchedFilesCount == 0) {
        this.selectedAttachmentObj.formControlObj.reset();
      }
    });
  }

  getAttachmentsCount(uniqueDocTypeRef) {
    let attachmentsList = this.resDetailsForm.get("attchmnt").value;
    let attchmentsCount = attachmentsList.filter((attachment) => {
      if (attachment.uniqueDocTypeRef == uniqueDocTypeRef) {
        return true;
      }
    }).length;
    return attchmentsCount;
  }
  closeAttachments(id) {
    ////console.log(this.brModalScrollPos, this.shModalScrollPos);
    this.showAttachments = false;
    // setTimeout(() => {
    //   jQuery('#addBranchDetailsModal').scrollTop(this.brModalScrollPos);
    //   jQuery('#addShareholderDetailsModal').scrollTop(this.shModalScrollPos);
    // }, 10);
    this.closeModal(id);
  }

  getFileForm() {
    let fileForm = this.fb.group({
      "__metadata": this.fb.group({
        "id": [''],
        "uri": [''],
        "type": [''],
        "content_type": [''],
        "media_src": ['']
      }),
      "ZfileSize": [''],
      "Dotyp": [''],
      "OutletRef": [''],
      "RetGuid": [''],
      "SchGuid": [''],
      "Srno": [0],
      "AttBy": [''],
      "Doguid": [''],
      "Filename": [''],
      "Mimetype": [''],
      "DocUrl": [''],
      "Flag": [''],
      "FileExtn": [""],
      "uniqueDocTypeRef": ['']
    });
    return fileForm;
  }

  closeModal(id) {
    jQuery("#" + id).modal('hide');
  }
  ///////////////////////////////////////////////////////////////////////////////////////////////

}

export const Constants = {
  lang: {
    eng: {
      dir: "ltr",
      heading: "Residentiary details",
      heading1: "Company Information",
      tin: "TIN",
      repBranch: "Reporting Branch",
      resStats: "What is your Residency Statues?",
      resStats1: "What is your Residency Statues?",
      resident: "Resident",
      nonResident: "Non-Resident",
      option1: "Does all income derived from KSA",
      option2: "Is top management of company in KSA",
      attachment: "Attachment",
      legalEntity: "Type of legal entity",
      capital: "Capital",
      personal: "Personal",
      prof: "Professional",
      permComp: "Permanent Company",
      nonPermComp: "Non-Permanent Company",
      permEstb: "Permanent  Establishment",
      nonpermEstb: "Non-Permanent Establishment",
      err1: "Select any one",
      err2: "Please add attachment",
      err3: "Please Select Reporting Branch",
      fileSizeError: "File size should be less than 10 MB",
      fileTypeError: "Choose only file with extension DOC, DOCX, XLS, XLSX, PDF, JPG",
      minFileSizeError: "File Name,Doc Type,Ret.Guid and File Content can not be blank in action N",
      residencyType: "Residency Type"
    },
    arb: {
      dir: "rtl",
      heading: "حالة الإقامة",
      heading1: "معلومات الشركة",
      tin: "الرقم المميز",
      repBranch: "فرع الهيئة الرئيسي",
      resStats: "حالة الإقامة ؟",
      resStats1: "ماهي حالة 'وضع' إقامتك؟",
      resident: "مقيم",
      nonResident: "غير مقيم",
      option1: "جميع الدخل محصل في المملكة العربية السعودية",
      option2: "الإدارة العليا في المملكة العربية السعودية",
      attachment: "المرفقات",
      legalEntity: "نوع الكيان القانوني ",
      capital: "رأس مال",
      personal: "شخصي",
      prof: "مهني",
      permComp: "شركة دائمة",
      nonPermComp: "شركة غير دائمة",
      permEstb: "منشأة دائمة",
      nonpermEstb: "منشأة غير دائمة",
      err1: "الرجاء تحديد اختيار",
      err2: "الرجاء رفع المرفقات",
      err3: " الرجاء إختيار  فرع الزكاة التابع له ",
      fileSizeError: "يجب ان يكون حجم الملف المرفق اقل من 10 ميجا",
      fileTypeError: "الرجاء إختيار ملف من الإمتدادات التالية فقط DOC, DOCX, XLS, XLSX, PDF, JPG",
      minFileSizeError: "عذراً، لا يمكن أن يكون اسم الملف، نوع الملف، ومحتوى الملف فارغاً للنشر",
      residencyType: "نوع الاقامة"
    }
  },
  legalEntityForResident: [
    { id: '1', nameEng: "Capital", nameArb: "أموال" },
    { id: '2', nameEng: "Personal", nameArb: "أشخاص" },
    { id: '3', nameEng: "Professional", nameArb: "شركة مهن حرة" },
  ],
  legalEntityForNonResident: [
    { id: '1', nameEng: "Permanent Company", nameArb: "شركة دائمة" },
    { id: '2', nameEng: "Non-Permanent Company", nameArb: "شركة غير دائمة" }
  ],
  legalEntityForCapital: [
    { id: '1', nameEng: 'Public Joint Company', nameArb: "شركة مساهمة" },
    { id: '2', nameEng: 'Limited Liability Company', nameArb: "شركة ذات مسئولية محدودة" },
    { id: '3', nameEng: 'Company Limited by Shares', nameArb: "شركة توصية بالأسهم" },
    { id: '7', nameEng: 'Company with variable Capital', nameArb: "شركة ذات رأس المال القابل للتغيير" },
    { id: '8', nameEng: 'Co-operative Company', nameArb: "جمعيات تعاونية" }
  ],
  legalEntityForPersonal: [
    { id: '4', nameEng: 'Solidarity Company', nameArb: "شركة تضامن" },
    { id: '5', nameEng: 'Joint Venture', nameArb: "شركة محاصة" },
    { id: '6', nameEng: 'Limited Partnership in Shares', nameArb: "شركة توصية بسيط" },
  ],
  legalEntityForProfessional: [
    { id: 'P1', nameEng: 'Profession of Translation', nameArb: "مهن حرة للترجمة" },
    { id: 'P2', nameEng: 'Profession of Engineering', nameArb: "مهن حرة للهندسة" },
    { id: 'P3', nameEng: 'Profession of Legal Consultation', nameArb: "مهن حرة للمساحة" },
    { id: 'P4', nameEng: 'Profession of Survey', nameArb: "مهن حرة الاستشارات القانونية" },
    { id: 'P5', nameEng: 'Profession of Physical Consultation', nameArb: "مهن حرة للإحصاء" },
    { id: 'P6', nameEng: 'Profession of Zakat and Tax Services', nameArb: "مهن حرة لخدمات الزكاة و الضرائب" },
    { id: 'P7', nameEng: 'Auditor', nameArb: "مهن حرة استشارات فيزيائية" }
  ],
  legalEntityForPermanentEstablishment: [
    { id: '1', nameEng: 'A branch of non-Resident Company', nameArb: "مواقع الإنشاء, ومرافق التجميع وممارسة الأعمال الإشرافية المتعلقة بها." },
    { id: '2', nameEng: 'Construction sites', nameArb: "التركيبات والمواقع المستخدمة في أعمال المسح للموارد الطبيعية, ومعدات الحفر, والسفن المستخدمة في مسح الموارد الطبيعية, وممارسة الأعمال الإشرافية المتعلقة بها." },
    { id: '3', nameEng: 'Installation', nameArb: "قاعدة ثابتة يمارس منها الشخص الطبيعي غير المقيم نشاطة." },
    { id: '4', nameEng: 'A fixed base', nameArb: "فرع شركة غير مقيمة مصرح لها بمزاولة الأعمال بالمملكة." },
    { id: '5', nameEng: 'A Non-Resident Partner', nameArb: "يعد الشريك غير المقيم في شركة أشخاص مقيمة مالكاً لمنشأة دائمة بالمملكة على شكل حصة في شركة الاشخاص." }
  ],
  legalEntityForNonEstablishment: [
    { id: 'O1', nameEng: 'Derived from an activity which occurs in KSA', nameArb: "مشتقة من النشاط في المملكة العربية السعودية" },
    { id: 'O2', nameEng: 'Derived from immovable property located in the Kingdom', nameArb: "مشتقة من الممتلكات غير المنقولة الواقعة في المملكة العربية السعودية" },
    { id: 'O3', nameEng: 'Derived from the disposal of shares or a partnership in a resident company', nameArb: "مشتقة من بيع اسهم او شراكة مع شركة مقيمة" },
    { id: 'O4', nameEng: 'Derived from lease of movable properties used in the Kingdom', nameArb: "مشتقة من تأجير الممتلكات المتحركة المستخدمة في المملكة العربية السعودية" },
    { id: 'O5', nameEng: 'Derived from the sale or license for use of industrial or intellectual properties used in the Kingdom.', nameArb: "مشتقة من بيع او ترخيص يستخدم في القطاع الصناعي او حقوق الملكية الفكرية في المملكة العربية السعودية" },
    { id: 'O6', nameEng: 'Dividends, management or directors\' fees paid by a resident company.', nameArb: "أرباح الأسهم أو أتعاب الإدارة والمديرين التي تدفعها شركة مقيمة." },
    { id: 'O7', nameEng: 'Amounts paid against services rendered to the company\'s head office or to an affiliated company.', nameArb: "مبالغ مقابل خدمات تدفعها شركة مقيمة إلى مركزها الرئيسي أو إلى شركة مرتبطة بها." },
    { id: 'O8', nameEng: 'Amounts paid by a resident against services performed in whole or in part in the Kingdom.', nameArb: "مبالغ يدفعها ممقيم مقابل خدمات تمت بالكامل أو جزئياً في المملكة." },
    { id: 'O9', nameEng: 'Amounts for exploitation of a natural resource in the Kingdom.', nameArb: "مبالغ في التنقيب عن مصادر طبيعية في المملكة العربية السعودية" },
  ],
}