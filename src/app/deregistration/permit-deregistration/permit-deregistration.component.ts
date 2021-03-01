import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AppService } from "src/app/app.service";
import { constants } from "src/app/constants/constants.model";
import { permitDeregLabels } from "./permit-deregistration.constants";
import { TinDeregistrationService } from "src/app/services/tin-deregistration.service";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { CalendarComponent } from "src/app/constants/calendar.component";
import { FormArray } from "@angular/forms";
import { VatServiceService } from "src/app/services/vat-service.service";
import * as FileSaver from "file-saver";
import { NotifierService } from "angular-notifier";
import { CommonValidation } from "src/app/constants/commonValidations";
import { DatePipe } from "@angular/common";
import { DashboardService } from "src/app/services/dashboard-service";
import { environment } from "src/environments/environment";

declare var $: any;
@Component({
  selector: "app-permit-deregistration",
  templateUrl: "./permit-deregistration.component.html",
  styleUrls: ["./permit-deregistration.component.scss"],
})
export class PermitDeregistrationComponent implements OnInit {
  data: any;
  img: string;
  img1: string;
  dir: string;
  currentTab: any;
  tin: any;
  lang;
  baseUrl = environment.url;
  menu;
  optionActive = 1;
  show: boolean = false;
  attchForm: FormGroup;
  vatFormGroup1: FormGroup;
  headerComponent = CalendarComponent;
  files: any = [];
  storeFileDetails: any = {
    DR11: [],
    DR07: [],
    DR10: [],
    DR12: [],
  };
  myFiles: any = {
    DR11: [this.createAttachment1("DR11")],
    DR07: [this.createAttachment1("DR07")],
    DR10: [this.createAttachment1("DR10")],
    DR12: [this.createAttachment1("DR12")],
  };
  no: any;
  returnId: any;
  disableContinue: boolean;
  fileNames: any[];
  attchTypes: string[];
  ackDate: Date;
  requestObj: any;
  outlets: any;
  outletsSelected = [];
  activitiesSelected = [];
  submitted: boolean;
  outletSelectedFlag: boolean = false;
  permits: any = [];
  permitSelectedFlag: boolean;
  deregForm: FormGroup;
  resText: any;
  resText1: any;
  decfg: boolean;

  outletFormArray = this.fb.array([]);
  outletform: FormGroup;
  permitForm: FormGroup;
  activityOptions: any = [];
  tinErr: boolean;
  tinMsg: any;
  vatErr;
  indErr;
  idErr: boolean;
  selectedCalType: any;
  enddate: any;
  dob1: any;
  dobErr1: boolean;
  dateMsg: any;
  idTypes: { name: string; value: string }[];
  idMsg: any;
  id1: string;
  idErr1: boolean;
  decForm: FormGroup;
  mobPattern = "^(009665)[0-9]*$";
  decFg: boolean = false;
  submitted1: boolean;
  enableTrnsfrAttchmnt: boolean;
  enableLicenseAttchmnt: boolean;
  enableCRAttchmnt: boolean;
  enableCntrctAtachmnt: boolean;
  submitted3: boolean;
  name: any;
  refNo: any;
  selectedPermit: any;
  iddErr: boolean;
  dobErr: boolean;
  startDate1: any;
  dobMsg: any;
  tempFiles: any = [];
  attchIndex: any;
  modalTitle: string;
  prefillFlag: boolean;
  err206: boolean = false;
  err112: boolean = false;
  submitted2: boolean;
  previousUrl: string;
  dtVldtnFlag: boolean;
  dtVldtnFlag1: boolean;
  dobVldtnFlag: boolean;
  dobVldtnFlag1: boolean;

  constructor(
    public appSrv: AppService,
    private router: Router,
    private dashboardSrv: DashboardService,
    private tinService: TinDeregistrationService,
    private fb: FormBuilder,
    private vatService: VatServiceService,
    private notifierService: NotifierService,
    public commonValid: CommonValidation,
    private datePipe: DatePipe
  ) {}

  ngOnInit() {
    this.dashboardSrv.getDashboardData$().subscribe((data: any) => {
      // console.log("Dashboard Data :: ", data);
      this.data = data["d"];
    });
    this.appSrv.data1.subscribe(
      (res) => {
        console.log("test1", res);
        this.selectedCalType = res;
        this.enddate = this.commonValid.dateFormate(
          this.commonValid.toJulianDate1(new Date()),
          res
        );
        this.startDate1 = this.commonValid.dateFormate(
          this.commonValid.toJulianDate(new Date("1900-01-01")),
          res
        );
      },
      (err) => {
        this.notifierService.notify(
          "error",
          err.error.error.innererror.errordetails[0].message
        );
      }
    );

    this.ackDate = new Date();

    this.tin = localStorage.getItem("gpart");

    if (localStorage.getItem("lang") === "ar") {
      this.img = "assets/image/arrow-right.svg";
      this.img1 = "assets/image/circle-arrow-right-copy-18.svg";
      this.lang = permitDeregLabels.langz.arb;
      this.dir = permitDeregLabels.langz.arb.dir;
      this.menu = permitDeregLabels.langz.arb.menuArb;
      this.attchTypes = permitDeregLabels.langz.arb.attachTypes;
      this.vatErr = constants.langz.arb.vatError;
      this.indErr = constants.langz.arb.individual.indErr;
      this.idTypes = permitDeregLabels.langz.arb.idTypes;
    } else {
      this.img = "assets/image/arrow-left.svg";
      this.img1 = "assets/image/arrow-right.svg";
      this.lang = permitDeregLabels.langz.eng;
      this.dir = permitDeregLabels.langz.eng.dir;
      this.menu = permitDeregLabels.langz.eng.menuEng;
      this.attchTypes = permitDeregLabels.langz.eng.attachTypes;
      this.vatErr = constants.langz.eng.vatError;
      this.indErr = constants.langz.eng.individual.indErr;
      this.idTypes = permitDeregLabels.langz.eng.idTypes;
    }

    this.attchForm = this.fb.group({
      docType: [""],

      doc: this.fb.array([
        this.createAttachment(this.attchTypes[0], "DR11"),
        this.createAttachment(this.attchTypes[1], "DR07"),
        this.createAttachment(this.attchTypes[2], "DR10"),
        this.createAttachment(this.attchTypes[3], "DR12"),
      ]),
    });

    this.deregForm = this.fb.group({
      outletFormArray: this.fb.array([]),
    });

    this.decForm = this.fb.group({
      name: ["", Validators.required],
      cNo: [
        "",
        [
          Validators.required,
          Validators.pattern(this.mobPattern),
          Validators.minLength(14),
        ],
      ],
      desg: ["", Validators.required],
      decDt: [{ value: this.enddate, disabled: true }],
    });

    this.getDetails();
    this.getReasons();
  }

  get d() {
    return this.deregForm.controls;
  }

  get d1(): FormArray {
    return this.deregForm.get("outletFormArray") as FormArray;
  }

  getDetails() {
    this.tinService.getDetails(3, this.tin).subscribe(
      (res) => {
        // console.log("res", res);
        this.requestObj = res["d"];
        this.returnId = res["d"]["CaseGuid"];
        this.outlets = res["d"]["OutletSet"]["results"];
        this.outlets.forEach((element) => {
          element["flag"] = false;
        });
        this.outlets.filter((e) => {
          if (e.AOutletToDeregTb == "1") {
            e.flag = true;
            this.outletSelectedFlag = true;
          }
        });
        // this.prefillData();
        // console.log("Outlets :: ", this.outlets);
      },
      (err) => {
        $("#aftsubmit").modal("show");
        if (err.error.error.innererror.errordetails[0].code.includes("206")) {
          this.err206 = true;
          this.resText = this.lang.errs.err206;
          return;
        } else if (
          err.error.error.innererror.errordetails[0].code.includes("112")
        ) {
          this.err112 = true;
          this.resText = this.lang.errs.err112;
          return;
        }
        this.resText = err.error.error.innererror.errordetails[0].message;
        this.resText1 = err.error.error.innererror.errordetails[1].message;
        this.notifierService.notify(
          "error",
          err.error.error.innererror.errordetails[0].message
        );
      }
    );
  }

  getReasons() {
    this.tinService.getReasons(this.tin).subscribe((res) => {
      // console.log("res", res);
    });
  }

  NextStep(id) {
    this.currentTab = id;
    this.optionActive = id;
  }

  back() {
    if (this.optionActive > 1) {
      this.optionActive--;
    } else {
      window.history.back();
    }
  }

  selectedOutlet(i) {
    // console.log("Selected", i);
    this.outletSelectedFlag = false;
    this.outlets[i].flag = !this.outlets[i].flag;
    for (var j in this.outlets) {
      if (this.outlets[j].flag) {
        this.outletSelectedFlag = true;
        return;
      }
    }
  }

  selectedLicense(outletForm, slctdPermit) {
    console.log(outletForm, slctdPermit);
    outletForm.patchValue({
      mainActivitySelected: false,
    });

    slctdPermit.patchValue({
      isSelected: !slctdPermit.getRawValue().isSelected,
    });
    let slctdPermits = outletForm
      .getRawValue()
      .permitsArr.filter((p) => p.isSelected);
    if (slctdPermits.length == outletForm.getRawValue().permitsArr.length) {
      this.notifierService.notify("error", this.lang.errs.allPrmtsErr);
      outletForm.get("permitsArr")["controls"].forEach((permitCtrl) => {
        permitCtrl.patchValue({ isSelected: false });
      });
      outletForm.get("permitsArr")["controls"].forEach((element) => {
        element.patchValue({
          deregDate: null,
          deregReason: "",
          tin: "",
          idType: "",
          idNum: "",
          name: "",
          fName: "",
          gfName: "",
          familyName: "",
          dob: null,
        });
        element.get("deregDate").setErrors(null);
        element.get("deregReason").setErrors(null);
        element.markAsPristine();
        element.markAsUntouched();
        element.updateValueAndValidity();
      });
      outletForm.patchValue({
        slctPrmtMnActvty: "",
        slctMnActvty: "",
        mainActivitySelected: false,
      });
      outletForm.get("slctPrmtMnActvty").setErrors(null);
      outletForm.get("slctMnActvty").setErrors(null);
      outletForm.markAsPristine();
      outletForm.markAsUntouched();
      outletForm.updateValueAndValidity();
      // outletForm.controls.slctMnActvty
      // outletForm.get('permitsArr').markAsPristine();
      // outletForm.get('permitsArr').markAsUntouched();
      // outletForm.get('permitsArr').updateValueAndValidity();
      return true;
    }

    if (slctdPermit.getRawValue().isSelected) {
      slctdPermit.get("deregDate").setValidators(Validators.required);
      slctdPermit.get("deregReason").setValidators(Validators.required);
    } else {
      this.clearForm(slctdPermit);
      slctdPermit.get("deregDate").setValidators(null);
      slctdPermit.get("deregReason").setValidators(null);
      slctdPermit.get("deregDate").setErrors(null);
      slctdPermit.get("deregReason").setErrors(null);
      slctdPermit.patchValue({
        deregDate: null,
        deregReason: "",
      });
      // slctdPermit.clearValidators();
    }

    if (
      slctdPermit.getRawValue().APermitMainActFlagTb == "1" &&
      slctdPermit.getRawValue().isSelected
    ) {
      outletForm.patchValue({
        mainActivitySelected: true,
      });
      outletForm.controls.slctPrmtMnActvty.setValidators(Validators.required);
      outletForm.controls.slctMnActvty.setValidators(Validators.required);
      outletForm.updateValueAndValidity();
    } else {
      outletForm.patchValue({
        mainActivitySelected: false,
        slctPrmtMnActvty: "",
        slctMnActvty: "",
      });
      outletForm.get("slctPrmtMnActvty").setErrors(null);
      outletForm.get("slctMnActvty").setErrors(null);
      outletForm.updateValueAndValidity();
    }

    for (var i in outletForm.get("permitsArr").value) {
      if (outletForm.get("permitsArr").value[i].isSelected) {
        outletForm.patchValue({
          activitySelected: true,
        });
        return;
      } else {
        outletForm.patchValue({
          activitySelected: "",
        });
      }
    }
  }

  onSubmit() {
    // $("#attch").modal("show");
    const ctrl = <FormArray>this.deregForm.get("outletFormArray");
    // ctrl.patchValue([]);
    ctrl.clear();
    this.submitted = true;
    if (!this.outletSelectedFlag) {
      return;
    }
    this.outletsSelected = this.outlets.filter((i) => i.flag);

    this.outletsSelected.forEach((outlet) => {
      this.outletform = this.getoutletForm();
      this.outletform.patchValue(outlet);
      let permits = this.getFilteredPermits(outlet.AOutletNoTb);
      const control = <FormArray>this.outletform.get("permitsArr");
      permits.forEach((permitObj) => {
        this.permitForm = this.getpermitform();
        this.permitForm.patchValue(permitObj);
        control.push(this.permitForm);
      });
      ctrl.push(this.outletform);
      if (
        this.requestObj["PermitSet"]["results"].filter(
          (e) => e.APermitDregRsnTb !== ""
        ).length > 0
      ) {
        this.rejectedFlow(permits, this.outletform);
      }
    });
    this.permits = this.permitsToShow();
    this.NextStep(2);
  }

  onSubmit1() {
    console.log(this.deregForm.getRawValue());
    console.log(this.requestObj);
    this.submitted1 = true;
    if (
      this.deregForm.invalid ||
      this.dtVldtnFlag ||
      this.dtVldtnFlag1 ||
      this.dobVldtnFlag
    ) {
      return;
    }
    console.log(this.requestObj["PermitSet"]["results"]);
    this.makeAttchmntsMandatory();
    this.NextStep(3);
  }

  onSubmit2() {
    this.submitted2 = true;
    if (this.attchForm.invalid) {
      this.notifierService.notify("error", this.lang.errs.attchReq);
      return;
    }
    console.log(this.myFiles);
    // if(this.requestObj.ADeclarationChkbox == '1'){
    //   this.decForm.patchValue({
    //     desg: this.requestObj.ADecDesig,
    //     name: this.requestObj.ADecName,
    //     cNo: this.requestObj.ADecTelNo
    //   })
    // }
    this.NextStep(4);
  }

  onSubmit3() {
    this.submitted3 = true;
    if (this.decForm.invalid || !this.decFg) return;
    this.requestObj.ADecDesig = this.decForm.getRawValue().desg;
    this.requestObj.ADecName = this.decForm.getRawValue().name;
    this.requestObj.ADecTelNo = this.decForm.getRawValue().cNo;
    this.requestObj.ADeclarationChkbox = "1";
    this.requestObj.ADecDate = "/Date(" + new Date().getTime() + ")/";
    this.requestObj.ADecDateC = "G";
    this.requestObj.ADecDateH = this.transformDate(new Date().getTime());
    this.requestObj.ASubmissionDate = "/Date(" + new Date().getTime() + ")/";
    this.requestObj.ASubmissionDateC = "G";
    this.requestObj.ASubmissionDateH = this.transformDate(new Date().getTime());

    this.NextStep(5);
  }

  onSubmit4() {
    this.mapPermits();
    this.requestObj.Submitz = "X";
    this.enableLicenseAttchmnt
      ? (this.requestObj.ADocumnt8 = "1")
      : (this.requestObj.ADocumnt8 = "");
    this.enableTrnsfrAttchmnt
      ? (this.requestObj.ADocumnt9 = "1")
      : (this.requestObj.ADocumnt9 = "");
    this.enableCRAttchmnt
      ? (this.requestObj.ADocumnt13 = "1")
      : (this.requestObj.ADocumnt13 = "");
    this.enableCntrctAtachmnt
      ? (this.requestObj.ADocumnt14 = "1")
      : (this.requestObj.ADocumnt14 = "");
    this.requestObj.ADegister = "3";

    console.log("Final Obj :: ", this.requestObj);
    this.tinService.postDetails(this.requestObj).subscribe(
      (res) => {
        console.log(res);
        this.name = res["d"]["ATaxpayerName"];
        this.refNo = res["d"]["Fbnum"];
        this.show = true;
      },
      (err) => {
        this.notifierService.notify(
          "error",
          err.error.error.innererror.errordetails[0].message
        );
      }
    );
  }

  createAttachment(label, docType) {
    return this.fb.group({
      docName: label,
      docType: docType,
      id: "",
      name: "",
      url: "",
      flag: false,
      did: "",
      isRequired: false,
    });
  }

  createAttachment1(docType) {
    return {
      Dotyp: docType,
      Flag: false,
    };
  }

  deleteAttachment(index, docTyp) {
    //console.log("i", index);
    let control = <FormArray>this.attchForm.controls.doc;
    // control.removeAt(index);
    // this.files.splice(index, 1);
    this.myFiles[docTyp].splice(index, 1);
    if (this.myFiles[docTyp].length == 1 && !this.myFiles[docTyp].Flag) {
      control.controls[this.attchIndex].patchValue({
        flag: false,
        did: "",
      });
    }
  }

  getFileDetails(e, id, docType) {
    let temp;
    if (!e.target) {
      temp = e;
    } else temp = e.target.files;
    const parseExt = temp[0]["name"].split(".");
    const fileExt = parseExt[parseExt.length - 1].toLowerCase();

    if (
      fileExt !== "doc" &&
      fileExt !== "docx" &&
      fileExt !== "jpeg" &&
      fileExt !== "jpg" &&
      fileExt !== "pdf" &&
      fileExt !== "xls" &&
      fileExt !== "xlsx"
    ) {
      this.notifierService.notify("error", this.lang.errs.fileType);
      return;
    }
    //console.log (e.target.files);
    for (var i = 0; i < temp.length; i++) {
      if (temp[i].size > 0 && temp[i].size < 1048576) {
        temp[i]["docType"] = docType;
        this.myFiles[docType].pop();
        this.myFiles[docType].push(temp[i]);
      } else {
        this.notifierService.notify(
          "error",
          temp[i].size == 0
            ? this.lang.errs.fileError1
            : this.lang.errs.fileError
        );
        return;
      }
    }

    this.uploadFiles(temp[0], id, docType);
    // console.log(this.myFiles);
    this.fileNames = [];
    for (var i = 0; i < this.myFiles[docType].length; i++) {
      let n = this.myFiles[docType][i]["name"];
      this.fileNames.push(n);
    }
    let control = <FormArray>this.attchForm.controls.doc;
    // console.log(control.controls[id]["controls"]);
  }

  uploadFile(event, i) {
    for (let index = 0; index < event.length; index++) {
      const element = event[index];
      // console.log(element);
      let obj = {
        name: element.name,
        size: (element.size / 1024 / 1024).toFixed(2),
      };
      let extn = obj["name"].substr(obj["name"].indexOf(".") + 1);
      if (parseInt(obj.size) <= 5) {
        this.files[i] = obj;
      }
    }
  }

  deleteAttachments(index) {
    this.files.splice(index, 1);
  }

  uploadFiles(file, idd, docType) {
    let control = <FormArray>this.attchForm.controls.doc;
    const frmData = new FormData();
    let filename;
    // for (var i = 0; i < this.myFiles.length; i++) {
    filename = file["name"];
    frmData.append("fileUpload", file);
    // }
    const parseExt = filename.split(".");
    const fileExt = parseExt[parseExt.length - 1].toLowerCase();

    if (
      fileExt !== "doc" &&
      fileExt !== "docx" &&
      fileExt !== "jpeg" &&
      fileExt !== "jpg" &&
      fileExt !== "pdf" &&
      fileExt !== "xls" &&
      fileExt !== "xlsx"
    ) {
      this.notifierService.notify("error", this.lang.errs.fileType);
      return;
    }
    if (file.size > 1048576) {
      this.notifierService.notify("error", this.lang.errs.fileError);
      return;
    }
    // console.log("res", filename, this.myFiles);
    this.tinService
      .postAttachment(this.returnId, docType, filename, frmData)
      .subscribe(
        (res) => {
          // console.log("upload", res);
          control.controls[idd]["controls"].name.setValue(filename);
          control.controls[idd]["controls"].flag.setValue(true);
          control.controls[idd]["controls"].url.setValue(res["d"]["DocUrl"]);
          control.controls[idd]["controls"].did.setValue(res["d"]["Doguid"]);
          control.controls[idd].value.id;
          // this.notifierService.notify(
          //   "success",
          //   this.lang.successMsg
          // );
          res["d"]["Dotyp"] = docType;
          res["d"]["Flag"] = true;
          let l = this.myFiles[docType].length - 1;
          let c = {
            ...res["d"],
            lastModified: this.myFiles[docType][l].lastModified,
            lastModifiedDate: this.myFiles[docType][l].lastModifiedDate,
            size: this.myFiles[docType][l].size,
            did: res["d"]["Doguid"],
            DocUrl: res["d"]["DocUrl"],
          };
          this.storeFileDetails[docType].push(c);
          this.myFiles[docType].pop();
          this.myFiles[docType].push(c);
          if (this.myFiles[docType].length <= 5) {
            this.myFiles[docType].push(this.createAttachment1(docType));
          }
        },
        (err) => {
          this.notifierService.notify(
            "error",
            err.error.error.innererror.errordetails[0].message
          );
          this.disableContinue = true;
        }
      );
  }

  downloadAttachment(value) {
    // console.log("att", value);
    this.vatService.downloadAttachment(value.url).subscribe(
      (res: any) => {
        // console.log("res", res);
        FileSaver.saveAs(res, value.name);
      },
      (err) => {
        this.notifierService.notify(
          "error",
          err.error.error.innererror.errordetails[0].message
        );
      }
    );
  }

  ackDownload() {
    this.vatService.getAckDownload(this.refNo).subscribe(
      (res: any) => {
        // console.log("res", res);
        FileSaver.saveAs(res, "acknowledgment.pdf");
      },
      (err) => {
        this.notifierService.notify(
          "error",
          err.error.error.innererror.errordetails[0].message
        );
      }
    );
  }

  deleteAttachmentFromSer(val1, val2) {
    this.vatService.deleteAttachment(val1, val2).subscribe((res) => {
      // console.log("delere", res);
    });
  }

  formatDate(date) {
    return new Date(+date);
  }

  permitsToShow() {
    let arr = this.requestObj["PermitSet"]["results"];
    let temp;
    let temp1 = [];
    for (var i in this.outletsSelected) {
      temp = arr.filter(
        (ele) => ele.APermitOutletnoTb == this.outletsSelected[i].AOutletNoTb
      );
      temp.forEach((element) => {
        element["flag"] = false;
        temp1.push(element);
      });
    }
    return temp1;
  }

  getFilteredPermits(val) {
    return this.requestObj["PermitSet"]["results"].filter(
      (i) => i.APermitOutletnoTb == val
    );
  }

  deleteForm(index) {
    this.d1.removeAt(index);
  }

  setValidators(permit) {
    permit.get("deregDate").setValidators(Validators.required);
    permit.get("deregReason").setValidators(Validators.required);
    permit.get("tin").enable();
    permit.get("idType").enable();
    permit.get("idNum").enable();
    permit.get("dob").enable();
    permit.get("dob").setValidators(Validators.required);
    permit.get("tin").setValidators(Validators.required);
    permit.get("idType").setValidators(Validators.required);
    permit.get("idNum").setValidators(Validators.required);
    permit.get("tin").setErrors({ required: true });
    permit.get("idType").setErrors({ required: true });
    permit.get("idNum").setErrors({ required: true });
    permit.get("dob").setErrors({ required: true });
    permit.updateValueAndValidity();
  }

  clearValidators(permit) {
    permit.get("deregReason").clearValidators();
    permit.get("tin").clearValidators();
    permit.get("idType").clearValidators();
    permit.get("idNum").clearValidators();
    permit.get("dob").clearValidators();
    permit.get("dob").setErrors(null);
    permit.markAsPristine();
    permit.markAsUntouched();
    permit.updateValueAndValidity();
  }

  getoutletForm() {
    let outlet = this.fb.group({
      AOutletNoTb: "",
      AOutletCompAddr: "",
      AOutletMainFlagTb: "",
      AOutletNameTb: "",
      mainActivitySelected: [false],
      activitySelected: ["", Validators.required],
      slctPrmtMnActvty: "",
      slctMnActvty: "",
      slctMnActvtyTxt: "",
      permitsArr: this.fb.array([]),
    });
    return outlet;
  }

  getpermitform() {
    let permit = this.fb.group({
      APermitTypeTb: "",
      APermitNoTb: "",
      APermitValfrDtTb: "",
      isSelected: false,
      APermitMainActFlagTb: "",
      deregDate: null,
      deregReason: "",
      tin: { value: "", disabled: true },
      idType: { value: "", disabled: true },
      idNum: { value: "", disabled: true },
      name: { value: "", disabled: true },
      fName: { value: "", disabled: true },
      gfName: { value: "", disabled: true },
      familyName: { value: "", disabled: true },
      dob: { value: null, disabled: true },
    });
    return permit;
  }

  fetchActivity(outletForm, permit) {
    this.activityOptions = [];
    this.tinService
      .getActivity({
        outnm: outletForm.getRawValue().AOutletNoTb,
        type: permit.APermitTypeTb,
        idNum: permit.APermitNoTb,
      })
      .subscribe((res) => {
        this.activityOptions = res["d"]["ZDD_ACTIVITY_TBLSet"]["results"];
        outletForm.patchValue({
          slctMnActvtyTxt: this.activityOptions[0].Text,
        });
      });
  }

  selectedReason(val, permit) {
    if (val == "3") {
      this.setValidators(permit);
      // permit.updateValueAndValidity();
    } else {
      this.clearValidators(permit);
      permit.patchValue({
        tin: "",
        idNum: "",
        idType: "",
        name: "",
        fName: "",
        gfName: "",
        familyName: "",
        dob: null,
      });
      // permit.disable();
      // permit.get('deregReason').clearValidators();
      permit.get("tin").disable();
      permit.get("idType").disable();
      permit.get("idNum").disable();
      permit.get("dob").disable();
      permit.get("deregDate").setValidators(Validators.required);
      console.log(this.deregForm);
    }
  }

  clearForm(permit) {
    permit.patchValue({
      deregDate: null,
      deregReason: "",
      tin: "",
      idType: "",
      idNum: "",
      name: "",
      fName: "",
      gfName: "",
      familyName: "",
      dob: null,
    });
  }

  getdateErr(d) {
    if (!d) {
      return;
    }
    let dateObj = new Date();
    console.log(dateObj.toLocaleDateString("ar-EG"));
    dateObj.setDate(dateObj.getDate() - 1);
    if (
      new Date(
        d["calendarStart"].year +
          "-" +
          d["calendarStart"].month +
          "-" +
          d["calendarStart"].day
      ) > dateObj
    ) {
      this.dobErr1 = true;
      this.dateMsg = this.indErr.e21;
    } else {
      this.dobErr1 = false;
      this.dateMsg = "";
    }
  }

  tinValidation(value, permitForm) {
    if (value == "") {
      permitForm.patchValue({
        idType: "",
        idNum: "",
        name: "",
        fName: "",
        gfName: "",
        familyName: "",
        dob: null,
      });
      permitForm.get("idType").enable();
      permitForm.get("idNum").enable();
      permitForm.get("dob").enable();
      return;
    }
    if (localStorage.getItem("gpart") == value) {
      this.tinErr = true;
      this.tinMsg = this.lang.errs.sameTinErr;
      return;
    }
    let first = value.substr(0, 1);
    if (first !== "3") {
      this.tinErr = true;
      this.tinMsg = this.vatErr.e12;
    } else {
      if (value.length === 10) {
        this.tinErr = false;
        this.getUserByTin(value, permitForm);
      } else {
        this.tinErr = true;
        this.tinMsg = this.vatErr.e13;
      }
    }
    console.log("tin");
  }

  getUserByTin(value, permitForm) {
    this.vatService.getUserByTin(value).subscribe(
      (res) => {
        this.clearValidators(permitForm);
        this.idErr = false;
        console.log("Tinres", res);
        permitForm.controls["name"].setValue(res["d"]["Name1"]);
        permitForm.controls["name"].disable();
        permitForm.controls["fName"].setValue(res["d"]["FatherName"]);
        permitForm.controls["fName"].disable();
        permitForm.controls["gfName"].setValue(res["d"]["GrandfatherName"]);
        permitForm.controls["gfName"].disable();
        permitForm.controls["familyName"].setValue(res["d"]["Name2"]);
        permitForm.controls["familyName"].disable();
        permitForm.controls["idType"].setValue(res["d"]["Idtype"]);
        // permitForm.controls["idType"].disable();
        permitForm.controls["idNum"].setValue(res["d"]["Idnum"]);
        // permitForm.controls["idNum"].disable();

        if (res["d"]["Birthdt"] !== "" && res["d"]["Birthdt"] !== null) {
          let issueDt = +res["d"]["Birthdt"].substring(
            6,
            res["d"]["Birthdt"].length - 2
          );
          permitForm.controls["dob"].patchValue(
            this.commonValid.toJulianDate1(new Date(issueDt))
          );
          if (this.selectedCalType != "Gregorian") {
            // TO Change Date Based on Cal Type --- TBD
            permitForm
              .get("dob")
              .patchValue(
                this.commonValid.dateFormate(permitForm.value.dob, "Islamic")
              );
            this.getdateErr(permitForm.value.dob);
          }
          // permitForm.get('dob').disable();
        } else {
          permitForm.get("dob").disable();
        }
      },
      (err) => {
        this.notifierService.notify(
          "error",
          err.error.error.innererror.errordetails[0].message
        );
      }
    );
  }

  onChange(val, permitForm) {
    console.log(val);
    permitForm.patchValue({
      tin: "",
      idNum: "",
      name: "",
      fName: "",
      gfName: "",
      familyName: "",
      dob: null,
    });
    permitForm.get("dob").enable();
    this.setValidators(permitForm);
    this.selectedPermit = permitForm;
    if (val == "ZS0001" || val == "ZS0002") {
      // $("#aftSelect1").modal("show");
    }
    this.tinErr = false;
    permitForm.get("idType").setErrors(null);
    permitForm.get("idType").clearValidators();
    permitForm.get("idType").updateValueAndValidity();
  }

  IDtypeValidation(type, val, permitForm) {
    if (type === "ZS0003") {
      if (this.commonValid.isNumber(val)) {
        if (val.length < 7 || val.length > 15) {
          this.idErr = true;
          this.idMsg = this.vatErr.e19;
        } else {
          this.idErr = false;
          this.getUserValidation(type, val, permitForm);
        }
      } else {
        this.idErr = true;
        this.idMsg = this.vatErr.e20;
      }
    } else {
      let obj = {
        flag: false,
        msg: "",
      };
      obj = this.commonValid.IDtypeValidation(type, val);
      this.idErr = obj.flag;
      this.idMsg = obj.msg;
      if (this.idErr) {
        return;
      } else {
        if (type === "ZS0001" || type === "ZS0002") {
          return;
        }
        this.getUserValidation(type, val, permitForm);
      }
    }
  }

  getUserValidation(type, id, permitForm) {
    let obj3 = {
      type: type,
      idNumber: id,
    };

    this.vatService.getUserValidation(obj3, "").subscribe(
      (res) => {
        this.setValidators(permitForm);
        this.fillContactDetailsForm(res, permitForm);
      },
      (err) => {
        console.log(err.error);
        this.notifierService.notify(
          "error",
          err.error.error.innererror.errordetails[0].message
        );
      }
    );
  }

  fillContactDetailsForm(res, permitForm) {
    if (res["d"]["Name1"] !== "") {
      permitForm.controls["name"].patchValue(res["d"]["Name1"]);
      permitForm.controls["name"].disable();
    } else {
      permitForm.controls["name"].enable();
      permitForm.controls["name"].setValidators(Validators.required);
    }

    if (res["d"]["FatherName"] !== "") {
      permitForm.controls["fName"].patchValue(res["d"]["FatherName"]);
      permitForm.controls["fName"].disable();
    }

    if (res["d"]["GrandfatherName"] !== "") {
      permitForm.controls["gfName"].patchValue(res["d"]["GrandfatherName"]);
      permitForm.controls["gfName"].disable();
    }

    if (res["d"]["Name2"] !== "") {
      permitForm.controls["familyName"].patchValue(res["d"]["Name2"]);
      permitForm.controls["familyName"].disable();
    } else {
      permitForm.controls["familyName"].enable();
      permitForm.controls["familyName"].setValidators(Validators.required);
    }

    permitForm.controls["idNum"].patchValue(res["d"]["Idnum"]);

    permitForm.controls["idType"].setValue(res["d"]["Idtype"]);
    if (res["d"]["Birthdt"] !== "" && res["d"]["Birthdt"] !== null) {
      let issueDt = +res["d"]["Birthdt"].substring(
        6,
        res["d"]["Birthdt"].length - 2
      );
      permitForm.controls["dob"].patchValue(
        this.commonValid.toJulianDate1(new Date(issueDt))
      );
      if (this.selectedCalType != "Gregorian") {
        // TO Change Date Based on Cal Type --- TBD
        permitForm
          .get("dob")
          .patchValue(
            this.commonValid.dateFormate(permitForm.value.dob, "Islamic")
          );
        this.getdateErr(permitForm.value.dob);
      }
      // permitForm.get('dob').disable();
    } else {
      // permitForm.controls["dob"].enable();
      permitForm.controls["dob"].setValidators(Validators.required);
    }

    if (res["d"]["Tin"] != "") {
      permitForm.controls["tin"].patchValue(res["d"]["Tin"]);
      this.getUserByTin(res["d"]["Tin"], permitForm);
    }
    if (res["d"]["Idtype"] == "ZS0003") {
      permitForm.controls["fName"].enable();
      permitForm.controls["gfName"].enable();
    }
    if (res["d"]["Idtype"] == "ZS0005") {
      permitForm.controls["dob"].disable();
      permitForm.controls["dob"].setErrors(null);
    }
    permitForm.updateValueAndValidity();
  }

  mapPermits() {
    let permitSet = this.requestObj["PermitSet"]["results"];
    let outletSet = this.requestObj["OutletSet"]["results"];
    let slctdPrmts = this.deregForm.getRawValue().outletFormArray;

    for (var i in permitSet) {
      for (var j in slctdPrmts) {
        if (permitSet[i].APermitOutletnoTb == slctdPrmts[j].AOutletNoTb) {
          for (var k in slctdPrmts[j].permitsArr) {
            if (
              slctdPrmts[j].permitsArr[k].APermitNoTb ==
                permitSet[i].APermitNoTb &&
              slctdPrmts[j].permitsArr[k].deregReason !== ""
            ) {
              permitSet[i].APermitDregRsnTb =
                slctdPrmts[j].permitsArr[k].deregReason;
              permitSet[i].APermitTypTxt =
                permitSet[i].APermitTypeTb == "BUP002"
                  ? this.lang.crNum
                  : permitSet[i].APermitTypeTb == "ZS0007"
                  ? this.lang.contractNum
                  : this.lang.licensNum;

              permitSet[i].APermitEffDtCTb =
                this.selectedCalType == "Gregorian" ? "G" : "H";
              permitSet[i].APermitEffDtTb = this.commonValid.changeDate1(
                slctdPrmts[j].permitsArr[k].deregDate
              );
              permitSet[i].APermitEffDtHTb = this.transformDate(
                new Date(
                  +permitSet[i].APermitEffDtTb.substring(
                    6,
                    permitSet[i].APermitEffDtTb.length - 2
                  )
                )
              );

              if (slctdPrmts[j].mainActivitySelected) {
                permitSet[i].APermitNewMainNoIdTb =
                  slctdPrmts[j].slctPrmtMnActvty;
                permitSet[i].APermitMainnoTb = slctdPrmts[j].slctPrmtMnActvty;
                permitSet[i].APermitMainActNoTb = slctdPrmts[j].slctMnActvty;
              }

              if (permitSet[i].APermitDregRsnTb == "3") {
                permitSet[i].APermitTransTinTb =
                  slctdPrmts[j].permitsArr[k].tin;
                permitSet[i].APermitIdTypeTb =
                  slctdPrmts[j].permitsArr[k].idType;
                permitSet[i].APermitIdNoTb = slctdPrmts[j].permitsArr[k].idNum;
                permitSet[i].APermitNm1Tb = slctdPrmts[j].permitsArr[k].name;

                permitSet[i].APermitNm5Tb = slctdPrmts[j].permitsArr[k].fName;
                permitSet[i].APermitNm4Tb =
                  slctdPrmts[j].permitsArr[k].familyName;
                permitSet[i].APermitNm6Tb = slctdPrmts[j].permitsArr[k].gfName;
                permitSet[i].APermitDobCTb =
                  this.selectedCalType == "Gregorian" ? "G" : "H";
                permitSet[i].APermitDobTb =
                  slctdPrmts[j].permitsArr[k].dob !== null
                    ? this.commonValid.changeDate1(
                        slctdPrmts[j].permitsArr[k].dob
                      )
                    : null;
                permitSet[i].APermitDobHTb =
                  permitSet[i].APermitDobTb != null
                    ? this.transformDate(
                        new Date(
                          +permitSet[i].APermitDobTb.substring(
                            6,
                            permitSet[i].APermitDobTb.length - 2
                          )
                        )
                      )
                    : "";
              }

              outletSet.filter((e) => {
                if (e.AOutletNoTb === slctdPrmts[j].AOutletNoTb) {
                  e.AOutletToDeregTb = "1";
                }
              });
            }
          }
        }
      }
    }

    permitSet.filter((e) => delete e.flag);
    outletSet.filter((e) => delete e.flag);
  }

  transformDate(date) {
    return this.datePipe.transform(date, "yyyyMMdd");
  }

  makeAttchmntsMandatory() {
    let slctdPrmts = this.deregForm.getRawValue().outletFormArray;
    let temp = [];

    for (var i in slctdPrmts) {
      slctdPrmts[i].permitsArr.filter((e) => {
        if (e.deregReason !== "") temp.push(e);
      });
    }

    if (temp.length > 0) {
      this.enableLicenseAttchmnt =
        temp.filter((e) => e.APermitTypeTb == "ZS0004").length > 0
          ? true
          : false;
      this.enableCRAttchmnt =
        temp.filter((e) => e.APermitTypeTb == "BUP002").length > 0
          ? true
          : false;
      this.enableCntrctAtachmnt =
        temp.filter((e) => e.APermitTypeTb == "ZS0007").length > 0
          ? true
          : false;
      this.enableTrnsfrAttchmnt =
        temp.filter((e) => e.deregReason == "3").length > 0 ? true : false;
    }

    let ctrl = <FormArray>this.attchForm.get("doc");
    this.enableLicenseAttchmnt
      ? ctrl.controls[0].patchValue({ isRequired: true })
      : ctrl.controls[0].patchValue({ isRequired: false });
    this.enableTrnsfrAttchmnt
      ? ctrl.controls[1].patchValue({ isRequired: true })
      : ctrl.controls[1].patchValue({ isRequired: false });
    this.enableCRAttchmnt
      ? ctrl.controls[2].patchValue({ isRequired: true })
      : ctrl.controls[2].patchValue({ isRequired: false });
    this.enableCntrctAtachmnt
      ? ctrl.controls[3].patchValue({ isRequired: true })
      : ctrl.controls[3].patchValue({ isRequired: false });

    this.enableLicenseAttchmnt
      ? ctrl.controls[0].get("did").setValidators(Validators.required)
      : ctrl.controls[0].get("did").clearValidators();
    this.enableTrnsfrAttchmnt
      ? ctrl.controls[1].get("did").setValidators(Validators.required)
      : ctrl.controls[1].get("did").clearValidators();
    this.enableCRAttchmnt
      ? ctrl.controls[2].get("did").setValidators(Validators.required)
      : ctrl.controls[2].get("did").clearValidators();
    this.enableCntrctAtachmnt
      ? ctrl.controls[3].get("did").setValidators(Validators.required)
      : ctrl.controls[3].get("did").clearValidators();
    ctrl.updateValueAndValidity();
  }

  getFormattedDate(date) {
    if (date == null || date == "" || date == undefined) return;
    let dt = this.commonValid.changeDate1(date);
    return new Date(+dt.substring(6, dt.length - 2));
  }

  goto() {
    this.router.navigate(["mains/zakat-deregister"]);
  }

  getMinDate(date) {
    let d = +date.substring(6, date.length - 2);
    return this.commonValid.toJulianDate1(new Date(d));
  }

  getChangedDate(date) {
    let d = this.getMinDate(date);
    return this.commonValid.dateFormate(d, this.selectedCalType);
  }

  validateID1() {
    // if (this.id1 == "" || !this.id1) {
    //   this.idErr1 = true;
    //   this.idMsg = this.vatErr.e5;
    // } else
    if (
      this.selectedPermit.value.idType !== "ZS0003" &&
      this.selectedPermit.value.idType !== "ZS0005"
    ) {
      this.IDtypeValidation(
        this.selectedPermit.value.idType,
        this.id1,
        this.selectedPermit
      );
    }
    // else {
    //   this.iddErr = false;
    //   this.dobErr = false;
    // }
  }

  IDtypeValidation1(type, idNum) {
    let obj = this.commonValid.IDtypeValidation(type, idNum);
    this.idErr1 = obj.flag;
    this.idMsg = obj.msg;
  }

  onSubmitf(testForm) {
    console.log("TF:", testForm.value);
    if (
      testForm.value.sd !== null &&
      testForm.value.sd !== undefined &&
      testForm.form.status !== "INVALID"
    ) {
      testForm.resetForm(testForm.value);
    }
  }

  validateID2() {
    if (
      this.selectedPermit.value.idType !== "ZS0003" &&
      this.selectedPermit.value.idType !== "ZS0005"
    ) {
      //this.validateID1();
      // if (
      //   this.dob1 === undefined ||
      //   this.dob1 === null ||
      //   testForm.form.status === "INVALID"
      // ) {
      //   //this.idErr1 = false;
      //   this.dobErr = true;
      //   this.dobMsg = this.vatErr.e6;
      // } else {
      //   this.dobErr = false;
      //   this.dobMsg = "";
      //   console.log("test");
      // }
      // if (!this.idErr1 && !this.dobErr && this.dob1) {
      if (!this.dobVldtnFlag) {
        let d = this.selectedPermit.value.dob["calendarStart"];
        console.log("sdsd", this.dob1);
        if (d.day < 10 && d.day.toString().length == 1) {
          d.day = "0" + d.day;
        }
        if (d.month < 10 && d.month.toString().length == 1) {
          d.month = "0" + d.month;
        }
        let currentdate = "" + d.year + d.month + d.day;

        let obj = {
          type: this.selectedPermit.value.idType,
          idNumber: this.selectedPermit.value.idNum,
        };
        this.vatService.getUserValidation(obj, currentdate).subscribe(
          (res) => {
            this.tinErr = false;
            console.log("res", res);
            this.iddErr = false;
            // this.selectedPermit.controls["idNum"].setValue(
            //   res["d"]["Idnum"]
            // );
            // this.selectedPermit.controls["name"].setValue(
            //   res["d"]["Name1"]
            // );
            // this.selectedPermit.controls["tin"].setValue(res["d"]["Tin"]);
            this.fillContactDetailsForm(res, this.selectedPermit);
            // this.getUserByTin(res["d"]["Tin"]);
            $("#aftSelect1").modal("hide");

            //this.vatFormThirdGroup.get("Decname").disable();
            // this.notifierService.notify("success", this.lang.errorMsgs.e5);
          },
          (err) => {
            this.iddErr = true;
            console.log();
            this.notifierService.notify(
              "error",
              err.error.error.innererror.errordetails[0].message
            );
          }
        );
      }
    }
  }

  reset() {
    this.idErr1 = false;
    this.dobErr = false;
  }

  getSubActivities(permits) {
    console.log(permits);
    return permits.filter(
      (e) => e.APermitMainActFlagTb != "1" && !e.isSelected
    );
  }

  getTitle(docType) {
    if (docType == "DR11") {
      return this.attchTypes[0];
    }
    if (docType == "DR07") {
      return this.attchTypes[1];
    }
    if (docType == "DR10") {
      return this.attchTypes[2];
    }
    if (docType == "DR12") {
      return this.attchTypes[3];
    }
  }

  openAttachModal(docType, index) {
    this.tempFiles = this.myFiles[docType];
    this.attchIndex = index;
    this.modalTitle = this.getTitle(docType);
    $("#attch").modal("show");
  }

  restrictAlphabets(e) {
    var x = e.which || e.keycode;
    if (x >= 48 && x <= 57) return true;
    else return false;
  }

  restrictAlphabetss(e) {
    var x = e.which || e.keycode;
    if ((x >= 48 && x <= 57) || x == 45) return true;
    else return false;
  }

  allowAlphabets(e) {
    var x = e.which || e.keycode;
    var theEvent = e || window.event;
    var key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode(key);
    var regex;
    // regex = /[دجحخ هعغفقثصضذطكمنتالبيسشظزوةىلارؤءئإلإلأأ؟آلآ]|\.|\s/;
    regex = /^[a-zA-Z\u0600-\u06FF ][\sa-zA-Z\u0600-\u06FF ]*$/;
    if (
      (x >= 65 && x <= 90) ||
      x == 32 ||
      (x >= 97 && x <= 122) ||
      regex.test(key)
    )
      return true;
    else return false;
  }

  cancelDraft() {
    let approve = "";
    let reject = "";
    if (this.err206) reject = "X";
    if (this.err112) approve = "X";
    this.tinService.getDetails(3, this.tin, approve, reject).subscribe(
      (res) => {
        // console.log("res", res);
        this.requestObj = res["d"];
        this.returnId = res["d"]["CaseGuid"];
        this.outlets = res["d"]["OutletSet"]["results"];
        this.outlets.forEach((element) => {
          element["flag"] = false;
        });
        $("#aftsubmit").modal("hide");
        // this.prefillData();
        // console.log("Outlets :: ", this.outlets);
      },
      (err) => {
        // $("#aftsubmit").modal("show");
        // if(err.error.error.innererror.errordetails[0].code.includes('206')){
        //   this.err206 = true;
        // } else if(err.error.error.innererror.errordetails[0].code.includes('112')){
        //   this.err112 = true;
        // }
        this.resText = err.error.error.innererror.errordetails[0].message;
        this.resText1 = err.error.error.innererror.errordetails[1].message;
        this.notifierService.notify(
          "error",
          err.error.error.innererror.errordetails[0].message
        );
      }
    );
  }

  showSeparator() {
    if (
      ((this.myFiles["DR11"].length > 0 && this.myFiles["DR11"][0].Flag) ||
        (this.myFiles["DR07"].length > 0 && this.myFiles["DR07"][0].Flag)) &&
      ((this.myFiles["DR10"].length > 0 && this.myFiles["DR10"][0].Flag) ||
        (this.myFiles["DR12"].length > 0 && this.myFiles["DR12"][0].Flag))
    ) {
      return true;
    } else return false;
  }

  getIdTypeName(val) {
    return this.idTypes.filter((e) => e.value == val)[0].name;
  }

  prefillData() {
    let permits = this.requestObj["PermitSet"]["results"].filter(
      (i) => i.APermitDregRsnTb != ""
    );
    if (permits.length > 0) this.prefillFlag = true;
    for (var i in this.outlets) {
      for (var j in permits) {
        if (this.outlets[i].AOutletNoTb == permits[j].APermitOutletnoTb) {
          this.outlets[i].flag = true;
          this.outletSelectedFlag = true;
        }
      }
    }
  }

  compareDates(dregDt, vldFrmDt) {
    console.log(dregDt);
    let vldDt = this.commonValid.toJulianDate1(new Date(+vldFrmDt));
    let today = this.commonValid.toJulianDate1(new Date());
    if (dregDt["jdnStart"] < vldDt["jdnStart"]) {
      this.dtVldtnFlag = true;
      return;
    } else if (dregDt["jdnStart"] > today["jdnStart"]) {
      this.dtVldtnFlag1 = true;
      return;
    } else {
      this.dtVldtnFlag = false;
      this.dtVldtnFlag1 = false;
    }
  }

  compareDates1(dregDt, dob, vldFrm) {
    vldFrm = this.commonValid.toJulianDate1(
      new Date(+vldFrm.substring(6, vldFrm.length - 2))
    );
    let today = this.commonValid.toJulianDate1(new Date());
    if (
      dregDt == null ||
      dob == null ||
      dregDt == undefined ||
      dob == undefined
    ) {
      return;
    }
    if (
      dob["jdnStart"] > dregDt["jdnStart"] ||
      dob["jdnStart"] == dregDt["jdnStart"]
    ) {
      this.dobVldtnFlag = true;
    } else if (dob["jdnStart"] > today["jdnStart"]) {
      this.dobVldtnFlag1 = true;
    } else {
      this.dobVldtnFlag = false;
    }
  }

  rejectedFlow(permits, ctrl) {
    console.log(permits);
    console.log(ctrl);
    permits.filter((p) => {
      ctrl.get("permitsArr")["controls"].filter((c) => {
        if (p.APermitNoTb == c.getRawValue().APermitNoTb) {
          if (p.APermitDregRsnTb !== "") {
            ctrl.patchValue({
              activitySelected: true,
            });
          }
          if (p.APermitDregRsnTb !== "" && p.APermitMainActFlagTb == "1") {
            this.tinService
              .getActivity({
                outnm: p.AOutletNoTb,
                type: p.APermitTypeTb,
                idNum: p.APermitNoTb,
              })
              .subscribe((res) => {
                this.activityOptions =
                  res["d"]["ZDD_ACTIVITY_TBLSet"]["results"];
              });
            ctrl.patchValue({
              mainActivitySelected: true,
              slctPrmtMnActvty: p.APermitNewMainNoIdTb,
              slctMnActvty: p.APermitMainActNoTb,
              slctMnActvtyTxt: this.activityOptions[0].Text,
              activitySelected: true,
            });
          }
          if (p.APermitDregRsnTb == "1") {
            c.patchValue({
              APermitValfrDtTb: p.APermitValfrDtTb,
              isSelected: true,
              APermitMainActFlagTb: p.APermitMainActFlagTb,
              deregDate: this.commonValid.toJulianDate1(
                this.formatDate(
                  p.APermitEffDtTb.substring(6, p.APermitEffDtTb.length - 2)
                )
              ),
              deregReason: p.APermitDregRsnTb,
              tin: "",
              idType: "",
              idNum: "",
              name: "",
              fName: "",
              gfName: "",
              familyName: "",
              dob: null,
            });
          }
          if (p.APermitDregRsnTb == "3") {
            c.patchValue({
              APermitValfrDtTb: p.APermitValfrDtTb,
              isSelected: true,
              APermitMainActFlagTb: p.APermitMainActFlagTb,
              deregDate: this.commonValid.toJulianDate1(
                this.formatDate(
                  p.APermitEffDtTb.substring(6, p.APermitEffDtTb.length - 2)
                )
              ),
              deregReason: p.APermitDregRsnTb,
              tin: p.APermitTransTinTb,
              idType: p.APermitIdTypeTb,
              idNum: p.APermitIdNoTb,
              name: p.APermitNm1Tb,
              fName: p.APermitNm5Tb,
              gfName: p.APermitNm6Tb,
              familyName: p.APermitNm4Tb,
              dob: this.commonValid.toJulianDate1(
                this.formatDate(
                  p.APermitDobTb.substring(6, p.APermitDobTb.length - 2)
                )
              ),
            });
          }
        }
      });
    });
    // Declaration Part
    this.decForm.patchValue({
      desg: this.requestObj.ADecDesig,
      name: this.requestObj.ADecName,
      cNo: this.requestObj.ADecTelNo,
    });
    this.decFg = this.requestObj.ADeclarationChkbox == "1" ? true : false;
    // ATTACHMENT PART
    let attch = JSON.parse(
      JSON.stringify(this.requestObj["AttDetSet"]["results"])
    );
    let attchCtrl = <FormArray>this.attchForm.controls.doc;
    attch.filter((e) => {
      e.Flag = true;
      e.lastModifiedDate = this.formatDate(
        e.Erfdt.substring(6, e.Erfdt.length - 2)
      );
      if (e.Dotyp == "DR11") {
        this.myFiles["DR11"].unshift(e);
        attchCtrl.controls[0]["controls"].name.setValue(e.Filename);
        attchCtrl.controls[0]["controls"].flag.setValue(true);
        attchCtrl.controls[0]["controls"].url.setValue(e["DocUrl"]);
        attchCtrl.controls[0]["controls"].did.setValue(e["Doguid"]);
      }
      if (e.Dotyp == "DR07") {
        this.myFiles["DR07"].unshift(e);
        attchCtrl.controls[1]["controls"].name.setValue(e.Filename);
        attchCtrl.controls[1]["controls"].flag.setValue(true);
        attchCtrl.controls[1]["controls"].url.setValue(e["DocUrl"]);
        attchCtrl.controls[1]["controls"].did.setValue(e["Doguid"]);
      }
      if (e.Dotyp == "DR10") {
        this.myFiles["DR10"].unshift(e);
        attchCtrl.controls[2]["controls"].name.setValue(e.Filename);
        attchCtrl.controls[2]["controls"].flag.setValue(true);
        attchCtrl.controls[2]["controls"].url.setValue(e["DocUrl"]);
        attchCtrl.controls[2]["controls"].did.setValue(e["Doguid"]);
      }
      if (e.Dotyp == "DR12") {
        this.myFiles["DR12"].unshift(e);
        attchCtrl.controls[3]["controls"].name.setValue(e.Filename);
        attchCtrl.controls[3]["controls"].flag.setValue(true);
        attchCtrl.controls[3]["controls"].url.setValue(e["DocUrl"]);
        attchCtrl.controls[3]["controls"].did.setValue(e["Doguid"]);
      }
    });
  }

  isEnglish(text) {
    var eng = /^[a-zA-Z]/;
    return eng.test(text);
  }

  clearAllvalidations(formGroup: FormGroup) {
    //{1}
    Object.keys(formGroup.controls).forEach((field) => {
      //{2}
      const control = formGroup.get(field); //{3}
      if (control instanceof FormControl) {
        //{4}
        control.setErrors(null);
        control.clearValidators();
      } else if (control instanceof FormGroup) {
        //{5}
        this.clearAllvalidations(control); //{6}
      }
    });
  }
}
