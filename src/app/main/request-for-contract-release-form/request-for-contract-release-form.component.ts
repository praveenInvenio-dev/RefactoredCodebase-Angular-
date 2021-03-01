import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { CalendarComponent } from "src/app/constants/calendar.component";
import { constants } from "src/app/constants/constants.model";
import * as FileSaver from "file-saver";
import { Router } from "@angular/router";

import { RequestForContractReleaseFormService } from "src/app/services/request-for-contract-release-form.service";
import { AppService } from "src/app/app.service";
import { CommonValidation } from "src/app/constants/commonValidations";
import { NotifierService } from "angular-notifier";
import { DatePipe } from "@angular/common";
import * as moment from "moment";
import { RequestForContractRelease } from "src/app/constants/RequestForContractRelease";
import { LoaderService } from "../../loader/loader.service";
import { environment } from "src/environments/environment";
import { toGregorian } from "hijri-converter";

declare var $: any;
let maxLength = 132;
@Component({
  selector: "app-request-for-contract-release-form",
  templateUrl: "./request-for-contract-release-form.component.html",
  styleUrls: ["./request-for-contract-release-form.component.css"],
})
export class RequestForContractReleaseFormComponent implements OnInit {
  baseUrl = environment.url;

  optionSlected = 0;
  sub: boolean = false;
  tin: any;
  contractType: any;
  button0Disabled: boolean = true;
  validAmountMsg1: any;
  validAmountMsg2: any;
  count: number;
  Eusers: any;
  optionActive = 0;
  headerComponent = CalendarComponent;
  dir;
  viewListView = false;
  balanceError: boolean = false;
  fbgUid: any;
  fbType: any;
  enableFileUpload1: boolean = false;
  enableFileUpload2: boolean = false;
  maxDate: any;
  zNotesSet = [];
  lang: string = "";
  img1: string = "";
  img2: string = "";
  ViewOnly: boolean = false;
  AcountFromDate: any;
  AcountToDate: any;
  rfcrDetailSet: any;
  contractTypeList: any;
  certificatesAttachments: any = [];
  certificatesAttachments2: any = [];
  Euser: string = "";
  Zuser: any;
  contractTypeText: any;
  searchKeyword: any = null;
  dtype: any;
  rfcr: any;
  page1: any;
  page2: any;
  page3: any;
  page4: any;
  page5: any;
  langZ: any;
  page6: any;
  page7: any;
  page8: any;
  filterModal: any;
  formType: string = "";
  dateErr: boolean = false;
  filterfromdate: any;
  filtertoDate: any;
  hiddenElement: boolean = false;
  tools: any;
  img3: string = "";
  img4: string = "";
  ataxProfitPer: number;
  zakatProfitPer: number;
  rfrcError: any;
  ListSet: any;
  filteredList: any;
  formGuiId: any;
  caseGuiId: any;
  branch: any;
  periodKey: any;
  isFormValid: boolean = true;
  isFormErrors: boolean = false;
  limitError: boolean = false;
  ContactRequestRFormGroup2: FormGroup;
  ContactRequestRFormGroup3: FormGroup;
  ContactRequestRFormGroup4: FormGroup;
  ContactRequestRFormGroup5: FormGroup;
  ContactRequestRModel: FormGroup;
  ContactRequestRSummary: FormGroup;
  form1Submitted: boolean = false;
  form2Submitted: boolean = false;
  form3Submitted: boolean = false;
  form4Submitted: boolean = false;
  form5Submitted: boolean = false;
  checkboxDisable: boolean = false;
  AContNmMsg: string = "";
  AContNoMsg: string = "";
  AtypeMsg: string = "";
  AContDtMsg: string = "";
  AContEndDtMsg: string = "";
  AcontDtErr: boolean = false;
  AcontEndErr: boolean = false;
  ATotalAmtMsg: string = "";
  AReqAmtMsg: string = "";
  attachment1Err: boolean = false;
  attachment2Err: boolean = false;
  file1Msg: string = "";
  file2Msg: string = "";
  FullNameMsg: string = "";
  DesMsg: string = "";
  attachMsg: string = "";
  Status: any;
  Fbnum: any;
  Fbnumz: any;
  contractReleaseErrors: any;
  AContProfit: number;
  AZakatProfit: number;
  ADueTax: number;
  ADueZakat: number;
  ATaxProfi: number;
  zakatDue: number;
  reqAmount: number;
  contractT: number;
  ADueTot: number;
  calendarType: any;

  constructor(
    private _formBuilder: FormBuilder,
    public notifierService: NotifierService,
    public commonValid: CommonValidation,
    public appSrv: AppService,
    public datePipe: DatePipe,
    private router: Router,
    private contractReleaseRequestService: RequestForContractReleaseFormService,
    public loaderService: LoaderService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.tin = localStorage.getItem("gpart");

    if (localStorage.getItem("lang") === "ar") {
      this.rfcr = RequestForContractRelease.langz.arb;

      this.page1 = RequestForContractRelease.langz.arb.screen1;
      this.page2 = RequestForContractRelease.langz.arb.screen2;
      this.page3 = RequestForContractRelease.langz.arb.screen3;
      this.page4 = RequestForContractRelease.langz.arb.screen4;
      this.page5 = RequestForContractRelease.langz.arb.screen5;
      this.page6 = RequestForContractRelease.langz.arb.screen6;
      this.page7 = RequestForContractRelease.langz.arb.screen7;
      this.page8 = RequestForContractRelease.langz.arb.screen8;
      this.filterModal = RequestForContractRelease.langz.arb.filterModal;

      this.contractReleaseErrors =
        RequestForContractRelease.langz.arb.RFCRErrors;
      this.contractTypeList =
        RequestForContractRelease.langz.arb.contractType["ContType"];

      this.lang = "AR";
      this.langZ = "A";
      this.tools = RequestForContractRelease.langz.arb.TooltipConstants;

      moment.locale("ar");
      this.dir = constants.langz.arb.dir;
      this.rfrcError = RequestForContractRelease.langz.arb.RFCRErrors;
    } else {
      this.rfcr = RequestForContractRelease.langz.eng;
      this.page1 = RequestForContractRelease.langz.eng.screen1;
      this.page2 = RequestForContractRelease.langz.eng.screen2;
      this.page3 = RequestForContractRelease.langz.eng.screen3;
      this.page4 = RequestForContractRelease.langz.eng.screen4;
      this.page5 = RequestForContractRelease.langz.eng.screen5;
      this.page6 = RequestForContractRelease.langz.eng.screen6;
      this.page7 = RequestForContractRelease.langz.eng.screen7;
      this.page8 = RequestForContractRelease.langz.eng.screen8;
      this.filterModal = RequestForContractRelease.langz.eng.filterModal;
      this.contractTypeList =
        RequestForContractRelease.langz.eng.contractType["ContType"];
      this.contractReleaseErrors =
        RequestForContractRelease.langz.eng.RFCRErrors;
      this.lang = "EN";
      this.langZ = "E";
      this.tools = RequestForContractRelease.langz.eng.TooltipConstants;
      this.dir = constants.langz.eng.dir;
      moment.locale("en");
    }
    this.img1 = "assets/image/table (1).svg";
    this.img2 = "assets/image/cards (1).svg";
    this.img3 = "assets/image/search.png";
    this.img4 = "assets/image/filter.svg";

    this.resetForm();
    this.resetSummary();
    this.count = -1;
    this.appSrv.data1.subscribe((res) => {
      this.dtype = res;
      if (this.dtype == "Gregorian") {
        this.calendarType = "G";
      } else {
        this.calendarType = "H";
      }
      this.maxDate = this.commonValid.dateFormate(
        this.commonValid.toJulianDate(new Date()),
        res
      );
    });

    this.getContractReleaseForms();
  }
  back() {
    if (this.optionActive == 0) {
      this.router.navigate(["/mains/tax"]);
    } else {
      if (this.ViewOnly == true) {
        this.optionActive = 0;
      } else {
        this.optionActive--;
      }
    }
  }
  contractReleaseHome() {
    this.optionActive = 0;
  }
  async getContractReleaseForms() {
    await this.contractReleaseRequestService
      .getEUSERDetails(localStorage.getItem("gpart"))
      .subscribe(
        (res) => {
          this.Eusers = res["d"];
          this.getFbguid(this.Eusers);
        },
        (err) => {
          this.notifierService.notify(
            "error",
            err.error.error.innererror.errordetails[0].message
          );
        }
      );
  }
  async getFbguid(euser) {
    await this.contractReleaseRequestService.getFbguidDetails(euser).subscribe(
      (res) => {
        this.fbgUid = res["d"].Fbguid;
        this.Euser = res["d"].Euser;
        this.Zuser = res["d"].Zuser;
        this.getContractReleaseFormsData();
        //return res;
      },
      (err) => {
        this.notifierService.notify(
          "error",
          err.error.error.innererror.errordetails[0].message
        );
      }
    );
  }

  getContractReleaseFormsData() {
    this.contractReleaseRequestService
      .getContractReleaseRequests(this.fbgUid, this.Euser, this.Zuser)
      .subscribe(
        (res) => {
          this.ListSet = res["d"]["ListSet"]["results"];
          this.filteredList = this.ListSet;
          this.count = this.filteredList.length - 1;

          this.getUserData();
        },
        (err) => {
          this.notifierService.notify(
            "error",
            err.error.error.innererror.errordetails[0].message
          );
        }
      );
  }
  getContractByReqNum(event, item) {
    event.preventDefault();
    event.stopPropagation();
    this.contractReleaseRequestService
      .getContractReleaseAppOpenStep1(
        item["Fbnum"],
        item["Fbsta"],
        item["Fbtyp"]
      )
      .subscribe(
        (res) => {
          this.fbgUid = res["d"].Fbguid;
          this.fbType = res["d"].Fbtyp;
          this.Fbnum = res["d"].Fbnum;
          this.contractReleaseRequestService
            .getContractReleaseAppOpenStep2(item["Fbnum"])
            .subscribe(
              (res) => {
                this.rfcrDetailSet = res["d"];
                this.resetSummary();
                this.setSummaryData("view");
              },
              (err) => {
                this.notifierService.notify(
                  "error",
                  err.error.error.innererror.errordetails[0].message
                );
              }
            );
        },
        (err) => {
          this.notifierService.notify(
            "error",
            err.error.error.innererror.errordetails[0].message
          );
        }
      );
  }
  getUserData() {
    this.contractReleaseRequestService
      .getOnCreateContractReleaseApp(localStorage.getItem("gpart"))
      .subscribe(
        (res) => {
          this.formGuiId = res["d"]["FormGuid"];
          this.caseGuiId = res["d"]["CaseGuid"];
          this.branch = res["d"]["ABranch"];
          this.periodKey = res["d"]["PeriodKey"];
          this.ataxProfitPer = parseFloat(res["d"]["ATaxProfi"]);
          this.zakatProfitPer = parseFloat(res["d"]["AZakatProfit"]);
        },
        (err) => {
          this.notifierService.notify(
            "error",
            err.error.error.innererror.errordetails[0].message
          );
        }
      );
  }
  onAddREquest() {
    this.addUserModal();
  }
  onSubmit() {
    this.form1Submitted = true;
    if (this.ContactRequestRFormGroup2.valid) {
      this.validateDate();
      let fromCalendarValue = this.ContactRequestRFormGroup2.value.AContDt[
        "calendarStart"
      ];
      let toCalendarValue = this.ContactRequestRFormGroup2.value.AContEndDt[
        "calendarStart"
      ];
      this.AcountFromDate = moment(
        new Date(
          fromCalendarValue.year,
          fromCalendarValue.month - 1,
          fromCalendarValue.day
        )
      ).format("YYYY-MM-DD");
      this.AcountToDate = moment(
        new Date(
          toCalendarValue.year,
          toCalendarValue.month - 1,
          toCalendarValue.day
        )
      ).format("YYYY-MM-DD");
      if (
        parseFloat(this.ContactRequestRFormGroup2.controls.AReqAmt.value) >
        parseFloat(this.ContactRequestRFormGroup2.controls.ATotalAmt.value)
      ) {
        this.isFormValid = false;
        this.isFormErrors = true;
        this.limitError = true;
        this.validAmountMsg2 = this.contractReleaseErrors.AReqAmt2Msg;
        this.optionActive = 1;
      } else {
        this.optionActive = 2;
      }
    }
  }

  onSubmit2() {
    this.form2Submitted = true;
    this.attachment1Err = false;
    this.attachment2Err = false;

    if (
      this.certificatesAttachments.length == 0 ||
      this.certificatesAttachments2.length == 0
    ) {
      if (this.certificatesAttachments.length == 0) {
        this.attachment1Err = true;
      }
      if (this.certificatesAttachments2.length == 0) {
        this.attachment2Err = true;
      }
    } else {
      this.optionActive = 3;
    }
  }
  onSubmit3() {
    this.optionActive = 4;
  }
  onSubmit4() {
    this.form5Submitted = true;
    if (this.ContactRequestRFormGroup5.valid) {
      this.optionActive = 5;
      this.setSummaryData("create");
    } else {
      this.optionActive = 4;
    }
  }
  onSubmitRequest() {
    let ADoc1 = "0";
    let ADoc2 = "0";
    let ADoc3 = "0";
    let startDtInSecs;
    let endDateInSecs;
    let fromCal;
    let toCal;
    let changedStartDate;
    let changedEndDate;
    let accountNumD = this.ContactRequestRFormGroup2.controls.AContNo.value
      ? this.ContactRequestRFormGroup2.controls.AContNo.value
      : "";
    let ATotalAmtD = this.ContactRequestRFormGroup2.controls.ATotalAmt.value
      ? this.ContactRequestRFormGroup2.controls.ATotalAmt.value
      : "0.00";
    let AReqAmtD = this.ContactRequestRFormGroup2.controls.AReqAmt.value
      ? this.ContactRequestRFormGroup2.controls.AReqAmt.value
      : "0.00";
    let AZakatProfitD = this.ContactRequestRFormGroup2.controls.AZakatProfit
      .value
      ? this.ContactRequestRFormGroup2.controls.AZakatProfit.value.toString()
      : "0.00";
    let ATaxProfiD = this.ContactRequestRFormGroup2.controls.ATaxProfi.value
      ? this.ContactRequestRFormGroup2.controls.ATaxProfi.value.toString()
      : "0.00";
    let contractTD = this.ContactRequestRFormGroup2.controls.AContProfitPer
      .value
      ? this.ContactRequestRFormGroup2.value.AContProfitPer.toString()
      : "0.00";
    let AContProfitD = this.ContactRequestRFormGroup2.controls.AContProfit.value
      ? this.ContactRequestRFormGroup2.controls.AContProfit.value.toString()
      : "0.00";
    let ADueTaxD = this.ContactRequestRFormGroup2.controls.ADueTax.value
      ? this.ContactRequestRFormGroup2.controls.ADueTax.value.toString()
      : "0.00";
    let ADueZakatD = this.ContactRequestRFormGroup2.controls.ADueZakat.value
      ? this.ContactRequestRFormGroup2.controls.ADueZakat.value.toString()
      : "0.00";

    let ADueTotD = this.ContactRequestRFormGroup2.controls.ADueTot.value
      ? this.ContactRequestRFormGroup2.controls.ADueTot.value.toString()
      : "0.00";
    let ataxProfitPercentage = this.ataxProfitPer
      ? this.ataxProfitPer.toString()
      : "0.0";
    let zakatProfitPercentage = this.zakatProfitPer
      ? this.zakatProfitPer.toString()
      : "0.0";

    this.appSrv.data1.subscribe((res) => {
      this.dtype = res;
      if (this.dtype == "Gregorian") {
        this.calendarType = "G";
      } else {
        this.calendarType = "H";
      }
    });
    if (
      this.ContactRequestRFormGroup2.value.AContDt["calendarStart"] == null ||
      this.ContactRequestRFormGroup2.value.AContDt["calendarStart"] == ""
    ) {
      startDtInSecs = null;
    } else {
      changedStartDate = this.commonValid.changeDate(
        this.ContactRequestRFormGroup2.value.AContDt["calendarStart"]
      );
      fromCal = this.ContactRequestRFormGroup2.value.AContDt["calendarStart"];
      startDtInSecs = moment(
        new Date(fromCal.year, fromCal.month - 1, fromCal.day)
      ).format("YYYY/MM/DD"); // this.abrzo = moment(date2 ).format("YYYY-MM-DD[T]HH:mm:ss");
    }
    if (
      this.ContactRequestRFormGroup2.value.AContEndDt["calendarStart"] ==
        null ||
      this.ContactRequestRFormGroup2.value.AContEndDt["calendarStart"] == ""
    ) {
      endDateInSecs = null;
    } else {
      changedEndDate = this.commonValid.changeDate(
        this.ContactRequestRFormGroup2.value.AContEndDt["calendarStart"]
      );
      toCal = this.ContactRequestRFormGroup2.value.AContEndDt["calendarStart"];
      endDateInSecs = moment(
        new Date(toCal.year, toCal.month - 1, toCal.day)
      ).format("YYYY/MM/DD");
    }
    if (this.certificatesAttachments.length > 0) {
      ADoc2 = "1";
    }
    if (this.certificatesAttachments2.length > 0) {
      ADoc3 = "1";
    }
    let currentDate = moment(new Date()).valueOf();
    let curDate2 = new Date();

    var curTime =
      "PT" +
      curDate2.getHours() +
      "H" +
      curDate2.getMinutes() +
      "M" +
      curDate2.getSeconds() +
      "S";
    let baseUrlStr = this.baseUrl;
    let body = {
      AContNm: this.ContactRequestRFormGroup2.controls.AContNm.value,
      AContNo: accountNumD,
      AType: this.contractType["Key"],
      AReqAmt: AReqAmtD,
      ATaxProfi: ataxProfitPercentage,
      ATaxProfitPer: ATaxProfiD,
      AContProfitPer: contractTD,
      ATotalAmt: ATotalAmtD,
      AContProfit: AContProfitD,
      AComments: this.ContactRequestRFormGroup4.controls.Acomments.value,
      ATpNm: localStorage.getItem("name"),
      AZakatProfit: zakatProfitPercentage,
      AZakatProfitPer: AZakatProfitD,
      ADueTax: ADueTaxD,
      ADueTot: ADueTotD,
      ADueZakat: ADueZakatD,
      Taxpayerz: localStorage.getItem("gpart"),
      RegIdz: "",
      UserTin: "",
      Auditorz: "",
      PeriodKeyz: "",
      ABranch: this.branch,
      CaseGuid: this.caseGuiId,
      FormGuid: this.formGuiId,
      Fbnumz: "",
      PeriodKey: this.periodKey,
      ACalTp: this.calendarType,
      AContDtFg: this.calendarType,
      AContEndDtFg: this.calendarType,
      CurrDatumz: null,
      APeriodFrom: null,
      APeriodTo: null,
      AContDt: changedStartDate, //if no date null
      AContEndDt: changedEndDate,
      AContEndDtCh: endDateInSecs,
      AContDt1: startDtInSecs,
      znotesSet: this.zNotesSet,
      AReceiveDt: `/Date(${currentDate})/`,
      AAgreeTm: curTime,
      ADoc1: "0",
      ADoc2: ADoc2,
      ADoc3: ADoc3,
      Langz: this.langZ,
    };
    let lCtr = 0;
    let tCtr = 0;
    const el = this.ContactRequestRFormGroup4.controls.tdline.value;
    var aCommLine = el.split("\n");
    var cntLine = aCommLine.length;
    if (cntLine == 1) {
      if (aCommLine[0] == "" || aCommLine[0] == null) cntLine = 0;
    }
    for (let oCtr = 1; oCtr <= cntLine; oCtr++) {
      lCtr = oCtr - 1;
      tCtr = tCtr + 1;
      const noteObj = {
        __metadata: {
          id:
            baseUrlStr +
            "sap/opu/odata/SAP/Z_TP_NOTES_TP11_SRV/znotesSet('" +
            tCtr +
            "')",
          uri:
            baseUrlStr +
            "sap/opu/odata/SAP/Z_TP_NOTES_TP11_SRV/znotesSet('" +
            tCtr +
            "')",
          type: "Z_TP_NOTES_TP11_SRV.znotes",
        },
        Notenoz: "001",
        Refnamez: "",
        XInvoicez: "",
        XObsoletez: "",
        Rcodez: "TP11_NOTE",
        Erfusrz: "",
        Erfdtz: null,
        Erftmz: null,
        AttByz: "TP",
        Noteno: "001",
        Lineno: tCtr,
        ElemNo: 0,
        Tdformat: "",
        Tdline: aCommLine[lCtr],
      };
      this.zNotesSet.push(noteObj);
    }
    body["Savez"] = "X";
    body["Submitz"] = "X";
    this.submitRequest(body);
  }

  submitRequest(body) {
    this.contractReleaseRequestService
      .addContractReleaseRequest(body)
      .subscribe(
        (res) => {
          this.notifierService.notify("success", this.page8.subtitle);
          this.Fbnumz = res["d"]["Fbnumz"];
          this.Fbnum = res["d"]["Fbnum"];
          this.Status = res["d"]["Status"];
          this.sub = true;
        },
        (err) => {
          this.notifierService.notify(
            "error",
            err.error.error.innererror.errordetails[0].message
          );
        }
      );
  }
  validateDate() {
    this.AcontDtErr = false;
    this.AcontEndErr = false;
    if (this.ContactRequestRFormGroup2.value.AContDt["calendarStart"] == null) {
      this.isFormValid = false;
      this.isFormErrors = true;
      return;
    }
    if (
      this.ContactRequestRFormGroup2.value.AContEndDt["calendarStart"] == null
    ) {
      this.isFormValid = false;
      this.isFormErrors = true;
      return;
    }
    this.calendarType = this.ContactRequestRFormGroup2.value.AContEndDt.calendarName;
    this.AContEndDtMsg = "";
    this.AcontEndErr = false;
    let fromCal, toCal;
    let startDtInSecs, endDateInSecs;
    if (this.calendarType === "G") {
      fromCal = this.ContactRequestRFormGroup2.value.AContDt["calendarStart"];
      toCal = this.ContactRequestRFormGroup2.value.AContEndDt["calendarStart"];
      startDtInSecs = moment(
        new Date(fromCal.year, fromCal.month - 1, fromCal.day)
      ).valueOf();
      endDateInSecs = moment(
        new Date(toCal.year, toCal.month - 1, toCal.day)
      ).valueOf();
    } else {
      let tempToGregCal, tempFromGreg;
      tempFromGreg = this.ContactRequestRFormGroup2.value.AContDt[
        "calendarStart"
      ];
      tempToGregCal = this.ContactRequestRFormGroup2.value.AContEndDt[
        "calendarStart"
      ];
      fromCal = toGregorian(
        tempFromGreg.year,
        tempFromGreg.month,
        tempFromGreg.day
      );
      toCal = toGregorian(
        tempToGregCal.year,
        tempToGregCal.month,
        tempToGregCal.day
      );
      startDtInSecs = moment(
        new Date(fromCal.gy, fromCal.gm - 1, fromCal.gd)
      ).valueOf();
      endDateInSecs = moment(
        new Date(toCal.gy, toCal.gm - 1, toCal.gd)
      ).valueOf();
    }
    if (startDtInSecs > endDateInSecs) {
      this.isFormValid = false;
      this.isFormErrors = true;
      this.AcontEndErr = true;
      this.AContEndDtMsg = this.contractReleaseErrors.AContEndD2tMsg;
    }
  }

  isPdf(fileName) {
    const parseExt = fileName.split(".");
    const fileExt = parseExt[parseExt.length - 1].toLowerCase();
    return fileExt.toLowerCase() === "pdf";
  }

  uploadFiles(files, attType) {
    var self = this;
    const formData = new FormData();
    let filename;
    for (var i = 0; i < 1; i++) {
      filename = files[i]["name"];
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
        this.notifierService.notify("error", this.page1["invalidFormat"]);
        return false;
      }
      if (files[i]["size"] > 10485760) {
        this.notifierService.notify("error", this.page1["filesizeMessage"]);
        return false;
      }
      if (attType === "N11A") {
        const fileIndex = this.certificatesAttachments.findIndex(
          (file) => filename === file["Filename"]
        );
        if (fileIndex > -1) {
          this.notifierService.notify("error", this.page1["fileAlreayExists"]);
          return false;
        }
      } else if (attType === "N11B") {
        const fileIndex = this.certificatesAttachments2.findIndex(
          (file) => filename === file["Filename"]
        );
        if (fileIndex > -1) {
          this.notifierService.notify("error", this.page1["fileAlreayExists"]);
          return false;
        }
      }
      formData.append("fileUpload", files[i]);
    }
    this.contractReleaseRequestService
      .attachmentSubmit(formData, attType, filename, this.caseGuiId)
      .subscribe(
        (res) => {
          self.appendFile(res["d"], attType);
          if (attType === "N11A") {
            self.enableFileUpload1 = true;
            self.attachment1Err = false;
          } else {
            self.enableFileUpload2 = true;
            self.attachment2Err = false;
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

  appendFile(file, attType) {
    if (attType === "N11A") {
      this.certificatesAttachments.push(file);
    } else if (attType === "N11B") {
      this.certificatesAttachments2.push(file);
    }
  }

  deleteAttachment(attType, doguid, index) {
    var self = this;
    this.contractReleaseRequestService
      .deleteAttachment(attType, doguid)
      .subscribe(
        (res) => {
          self.removeFile(attType, index);
          if (attType == "N11A") {
            self.enableFileUpload1 = false;
          } else {
            self.enableFileUpload2 = false;
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

  removeFile(attType, index) {
    if (attType === "N11A") {
      this.certificatesAttachments.splice(index, 1);
    } else if (attType === "N11B") {
      this.certificatesAttachments2.splice(index, 1);
    }
  }
  onTaxType(event) {
    let item = this.contractTypeList.find((elem) => elem["Key"] == event.value);
    this.contractType = item;
    this.ContactRequestRFormGroup2.controls["AContProfitPer"].setValue(
      item.Pert
    );
    this.contractTypeText = item.Text;
    this.onCalculateDues();
  }

  resetValidation() {
    this.form1Submitted = false;
    this.form2Submitted = false;
    this.form3Submitted = false;
    this.form4Submitted = false;
    this.form5Submitted = false;
  }

  step(stepNo) {
    this.optionActive = stepNo;
  }

  getModal(cardType) {
    if (cardType === "RFCRFID") {
      $("#RFCRFID").modal("show");
      this.resetForm();
    }
    if (cardType === "filter") {
      $("#filter").modal("show");
    }
  }
  resetForm() {
    this.ContactRequestRModel = this._formBuilder.group({
      createCheck: [
        { value: "", disabled: this.checkboxDisable },
        Validators.required,
      ],
    });
    this.ContactRequestRFormGroup2 = this._formBuilder.group({
      AContNm: ["", Validators.required],
      AContNo: ["", Validators.required],
      Atype: ["", Validators.required],
      AContDt: [null, Validators.required],
      AContEndDt: [null, Validators.required],
      ATotalAmt: ["", [Validators.required, Validators.min(0.01)]],
      AReqAmt: ["", [Validators.required, Validators.min(0.01)]],
      AContProfitPer: ["0.00"],
      AContProfit: ["0.0"],
      AZakatProfit: ["0.00"],
      ATaxProfi: ["0.00"],
      ADueZakat: ["0.00"],
      ADueTax: ["0.00"],
      ADueTot: ["0.00"],
    });
    this.ContactRequestRFormGroup3 = this._formBuilder.group({
      docType: [""],
      doc: this._formBuilder.array([]),
      supportingDocName: [""],
    });
    this.ContactRequestRFormGroup4 = this._formBuilder.group({
      Acomments: [""],
      tdline: ["", Validators.maxLength(1006)],
    });
    this.ContactRequestRFormGroup5 = this._formBuilder.group({
      fullName: ["", Validators.required],
      designation: ["", Validators.required],
    });
    this.ContactRequestRModel.controls.createCheck.setValue(false);
    this.checkboxDisable = false;
    this.button0Disabled = true;
    this.ViewOnly = false;
    this.certificatesAttachments = [];
    this.certificatesAttachments2 = [];
    this.enableFileUpload1 = false;
    this.enableFileUpload2 = false;
    this.resetValidation();
  }
  resetSummary() {
    this.ContactRequestRSummary = this._formBuilder.group({
      summaryAContNm: [""],
      summaryAContNo: [""],
      summaryType: [""],
      summaryAContFromdate: [""],
      summaryAContEndDt: [""],
      summaryAReqAmt: [""],
      summaryATotalAmt: [""],
      summaryADueTot: [""],
      summaryAcomments: [""],
      summarytdline: [""],
      summaryfullName: [""],
      summarydesignation: [""],
    });
  }
  closeModal(cardType) {
    if (cardType === "RFCRFID") {
      $("#RFCRFID").modal("toggle");
    }
    if (cardType === "filter") {
      $("#filter").modal("toggle");
    }
  }
  changeView(viewType) {
    if (viewType === "grid") {
      this.viewListView = false;
    } else {
      this.viewListView = true;
    }
    this.viewListView
      ? ((this.img1 = "assets/image/table.svg"),
        (this.img2 = "assets/image/cards-gray.svg"))
      : ((this.img1 = "assets/image/table (1).svg"),
        (this.img2 = "assets/image/cards (1).svg"));
  }
  onClickFilterIcon() {
    $("#filter").modal("show");
  }
  addUserModal() {
    $("#RFCRFID").modal("show");
    this.resetForm();
  }
  chanangeDateAdapter(origin: "from" | "to", datePicker) {
    datePicker.close();
    let fromCalendarValue = this.ContactRequestRFormGroup2.controls.AContDt
      .value;
    let toCalendarValue = this.ContactRequestRFormGroup2.controls.AContEndDt
      .value;
    if (
      !this.ContactRequestRFormGroup2.value.AContDt ||
      !this.ContactRequestRFormGroup2.value.AContEndDt
    ) {
      return;
    }
    let fromCalendarName = this.ContactRequestRFormGroup2.value.AContDt
      .calendarName;
    let toCalendarName = this.ContactRequestRFormGroup2.value.AContEndDt
      .calendarName;
    if (fromCalendarName === toCalendarName) {
      return;
    }
    if (origin === "to") {
      if (this.ContactRequestRFormGroup2.controls.AContDt.value !== null) {
        fromCalendarValue = this.commonValid.dateFormate(
          fromCalendarValue,
          toCalendarName
        );
        this.ContactRequestRFormGroup2.controls["AContDt"].setValue(
          fromCalendarValue
        );
        this.AcountFromDate = moment(
          new Date(
            fromCalendarValue.year,
            fromCalendarValue.month - 1,
            fromCalendarValue.day
          )
        ).format("YYYY-MM-DD");
      }
    }
    if (origin === "from") {
      if (this.ContactRequestRFormGroup2.controls.AContEndDt.value != null) {
        toCalendarValue = this.commonValid.dateFormate(
          toCalendarValue,
          fromCalendarName
        );
        this.ContactRequestRFormGroup2.controls["AContEndDt"].setValue(
          toCalendarValue
        );
        this.AcountToDate = moment(
          new Date(
            toCalendarValue.year,
            toCalendarValue.month - 1,
            toCalendarValue.day
          )
        ).format("YYYY-MM-DD");
      }
    }
  }
  next() {
    if (this.optionActive < 5) this.optionActive++;
    else this.sub = true;
  }
  ckeckBoxClick() {
    if (this.ContactRequestRModel.controls.createCheck.value === true) {
      this.button0Disabled = false;
    } else {
      this.button0Disabled = true;
    }
  }
  createRequest() {
    if (this.ContactRequestRModel.controls.createCheck.value === true) {
      this.optionActive = 1;
      $("#RFCRFID").modal("hide");
      this.checkboxDisable = true;
    }
  }
  getContactRequests() {
    this.optionActive = 0;
    window.location.reload();
    this.sub = false;
  }
  getStyle(status) {
    this.hiddenElement = false;
    let className: string;
    switch (status) {
      case "IP014":
      case "IP018":
      case "IP017":
        className = "Approved";
        break;
      case "IP015":
      case "IP021":
      case "IP016":
      case "IP011":
        className = "Pending";
        break;
      case "IP019":
        className = "Rejected";
        break;
      case "IP020":
        className = "Hidden";
        this.hiddenElement = true;
        break;
      default:
        className = "Pending";
        break;
    }
    return className;
  }
  printConfirmmation() {
    this.contractReleaseRequestService.getConfirmation(this.Fbnum).subscribe(
      (res: any) => {
        FileSaver.saveAs(res, this.Fbnum + ".pdf");
      },
      (err) => {
        this.notifierService.notify(
          "error",
          err.error.error.innererror.errordetails[0].message
        );
      }
    );
  }
  downloadAcknoledgement() {
    this.contractReleaseRequestService.printAttachment(this.Fbnum).subscribe(
      (res: any) => {
        FileSaver.saveAs(res, this.Fbnum + ".pdf");
      },
      (err) => {
        this.notifierService.notify(
          "error",
          err.error.error.innererror.errordetails[0].message
        );
      }
    );
  }

  onCalculateDues() {
    this.limitError = false;
    if (
      parseFloat(this.ContactRequestRFormGroup2.controls.AReqAmt.value) >
      parseFloat(this.ContactRequestRFormGroup2.controls.ATotalAmt.value)
    ) {
      this.isFormErrors = true;
      this.limitError = true;
      this.validAmountMsg2 = this.contractReleaseErrors.AReqAmt2Msg;
    } else {
      let zakatDue;
      this.reqAmount = parseFloat(this.ContactRequestRFormGroup2.value.AReqAmt);
      this.contractT = this.ContactRequestRFormGroup2.value.AContProfitPer;
      this.AContProfit = parseFloat(
        ((this.reqAmount * this.contractT) / 100).toFixed(2)
      );
      this.AZakatProfit = parseFloat(
        ((this.AContProfit * this.zakatProfitPer) / 100).toFixed(2)
      );
      this.ATaxProfi = parseFloat(
        ((this.AContProfit * this.ataxProfitPer) / 100).toFixed(2)
      );
      this.ADueTax = parseFloat(((this.ATaxProfi * 20) / 100).toFixed(2));
      zakatDue = parseFloat(((this.AZakatProfit * 25) / 1000).toFixed(2));
      this.ADueZakat = parseFloat(((this.AZakatProfit * 25) / 1000).toFixed(2));
      this.ADueTot = this.ADueTax + zakatDue;
      this.ContactRequestRFormGroup2.controls["ADueZakat"].setValue(zakatDue);
      this.ContactRequestRFormGroup2.controls["AContProfit"].setValue(
        this.AContProfit
      );
      this.ContactRequestRFormGroup2.controls["AZakatProfit"].setValue(
        this.AZakatProfit
      );
      this.ContactRequestRFormGroup2.controls["ATaxProfi"].setValue(
        this.ATaxProfi
      );
      this.ContactRequestRFormGroup2.controls["ADueTax"].setValue(this.ADueTax);
      this.ContactRequestRFormGroup2.controls["ADueZakat"].setValue(
        this.ADueZakat
      );

      this.ContactRequestRFormGroup2.controls["ADueTot"].setValue(this.ADueTot);
    }
  }
  setSummaryData(origin: "create" | "view") {
    if (origin == "create") {
      this.ViewOnly = false;

      this.ContactRequestRSummary.controls["summaryAContNm"].setValue(
        this.ContactRequestRFormGroup2.controls.AContNm.value
      );
      this.ContactRequestRSummary.controls["summaryAContNo"].setValue(
        this.ContactRequestRFormGroup2.controls.AContNo.value
      );
      this.ContactRequestRSummary.controls["summaryType"].setValue(
        this.contractTypeText
      );
      this.ContactRequestRSummary.controls["summaryAContFromdate"].setValue(
        moment(this.AcountFromDate).locale("en").format("YYYY-MM-DD")
      );
      this.ContactRequestRSummary.controls["summaryAContEndDt"].setValue(
        moment(this.AcountToDate).locale("en").format("YYYY-MM-DD")
      );
      this.ContactRequestRSummary.controls["summaryAReqAmt"].setValue(
        this.ContactRequestRFormGroup2.controls.AReqAmt.value
      );
      this.ContactRequestRSummary.controls["summaryATotalAmt"].setValue(
        this.ContactRequestRFormGroup2.controls.ATotalAmt.value
      );
      this.ContactRequestRSummary.controls["summaryADueTot"].setValue(
        this.ContactRequestRFormGroup2.controls.ADueTot.value
      );
      this.ContactRequestRSummary.controls["summaryAcomments"].setValue(
        this.ContactRequestRFormGroup4.controls.Acomments.value
      );
      this.ContactRequestRSummary.controls["summarytdline"].setValue(
        this.ContactRequestRFormGroup4.controls.tdline.value
      );
      this.ContactRequestRSummary.controls["summaryfullName"].setValue(
        this.ContactRequestRFormGroup5.controls.fullName.value
      );
      this.ContactRequestRSummary.controls["summarydesignation"].setValue(
        this.ContactRequestRFormGroup5.controls.designation.value
      );
      this.cd.detectChanges();
    } else {
      this.ViewOnly = true;
      this.contractType = this.contractTypeList.find(
        (elem) => elem["Key"] == this.rfcrDetailSet["AType"]
      );
      this.contractTypeText = this.contractType ? this.contractType.Text : "";
      this.ContactRequestRSummary.controls["summaryAContNm"].setValue(
        this.rfcrDetailSet["AContNm"]
      );
      this.ContactRequestRSummary.controls["summaryAContNo"].setValue(
        this.rfcrDetailSet["AContNo"]
      );
      this.ContactRequestRSummary.controls["summaryType"].setValue(
        this.contractTypeText
      );
      for (let file of this.rfcrDetailSet["AttDetSet"]["results"]) {
        if (file.Dotyp == "N11A") {
          this.certificatesAttachments[0] = file;
        } else if (file.Dotyp == "N11B") {
          this.certificatesAttachments2[0] = file;
        }
      }

      let notesSet = this.rfcrDetailSet["znotesSet"]["results"];
      let lines = [];
      for (let item of notesSet) {
        lines.push(item["Tdline"]);
      }
      this.ContactRequestRSummary.controls["summarytdline"].setValue(
        lines.join("\n")
      );
      let actDate1 = this.getDateFormated(this.rfcrDetailSet["AContDt"]);
      let actDate2 = this.getDateFormated(this.rfcrDetailSet["AContEndDt"]);
      const Cdate1 = this.getLocaleString(actDate1);
      const Cdate2 = this.getLocaleString(actDate2);
      this.ContactRequestRSummary.controls["summaryAContFromdate"].setValue(
        Cdate1
      );
      this.ContactRequestRSummary.controls["summaryAContEndDt"].setValue(
        Cdate2
      );
      this.ContactRequestRSummary.controls["summaryAReqAmt"].setValue(
        this.rfcrDetailSet["AReqAmt"]
      );
      this.ContactRequestRSummary.controls["summaryATotalAmt"].setValue(
        this.rfcrDetailSet["ATotalAmt"]
      );
      this.ContactRequestRSummary.controls["summaryADueTot"].setValue(
        this.rfcrDetailSet["ADueTot"]
      );
      this.ContactRequestRSummary.controls["summaryAcomments"].setValue(
        this.rfcrDetailSet["AComments"]
      );
      this.cd.detectChanges();
      this.optionActive = 5;
    }
  }
  public showLoader(): void {
    this.loaderService.show();
  }
  public hideLoader(): void {
    this.loaderService.hide();
  }
  filterItem(event) {
    event.preventDefault();
    event.stopPropagation();
    if (!this.searchKeyword) {
      this.filteredList = this.ListSet;
    } else {
      const filtersSimple = this.searchKeyword.toLowerCase();
      this.filteredList = Object.assign([], this.ListSet).filter(
        (item) =>
          item["Fbnum"].indexOf(filtersSimple) > -1 ||
          item["StatText"].toString().toLowerCase().indexOf(filtersSimple) >
            -1 ||
          item["CrdtText"].toString().toLowerCase().indexOf(filtersSimple) > -1
      );
    }
    this.count = this.filteredList.length - 1;
  }

  onInputChange() {
    let text = this.ContactRequestRFormGroup4.controls["tdline"].value;
    var lines = text.split(/(\r\n|\n|\r)/gm);
    for (var i = 0; i < lines.length; i++) {
      if (lines[i].length > maxLength) {
        lines[i] = lines[i].substring(0, maxLength) + "\n";
      }
    }
    this.ContactRequestRFormGroup4.controls["tdline"].setValue(lines.join(""));
  }
  spaceValidator = (event: any) => {
    let value = /^[0-9]*$/.test(event.target.value);
    if (!value) {
      event.target.value = event.target.value.slice(0, -1);
    }
  };
  spaceValidator2 = (event: any) => {
    this.limitError = false;
    if (
      parseFloat(this.ContactRequestRFormGroup2.controls.AReqAmt.value) >
      parseFloat(this.ContactRequestRFormGroup2.controls.ATotalAmt.value)
    ) {
      this.isFormErrors = true;
      this.limitError = true;
      this.validAmountMsg2 = this.contractReleaseErrors.AReqAmt2Msg;
    }
  };
  validateNumbers() {
    if (this.ContactRequestRFormGroup2.controls.AReqAmt.value) {
      this.ContactRequestRFormGroup2.controls.AReqAmt.setValue(
        parseFloat(
          this.ContactRequestRFormGroup2.controls.AReqAmt.value
        ).toFixed(2)
      );
    }
    if (this.ContactRequestRFormGroup2.controls.ATotalAmt.value) {
      this.ContactRequestRFormGroup2.controls.ATotalAmt.setValue(
        parseFloat(
          this.ContactRequestRFormGroup2.controls.ATotalAmt.value
        ).toFixed(2)
      );
    }
  }

  redirect() {
    window.location.reload();
  }
  ngOnDestroy() {
    this.searchKeyword = null;
  }
  getDateFormated(value) {
    let val = value.substring(value.indexOf("(") + 1);
    val = val.substring(0, val.indexOf(")"));
    return new Date(parseInt(val));
  }
  getLocaleString(data) {
    if (data !== null && data !== undefined) {
      moment.locale("en");
      return moment(new Date(data)).format("YYYY-MM-DD");
    } else {
      return "";
    }
  }
  allowAlphabets(e) {
    var x = e.which || e.keycode;
    var theEvent = e || window.event;
    var key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode(key);
    var regex;
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
}
