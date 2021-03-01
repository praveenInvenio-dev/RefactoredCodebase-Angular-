import { Component, OnInit, ViewChild } from "@angular/core";
import { FormGroup, FormBuilder, Validators, FormArray } from "@angular/forms";
import { Options } from "ng5-slider";
import { constants } from "src/app/constants/constants.model";
import { AppService } from "src/app/app.service";
import { VatServiceService } from "src/app/services/vat-service.service";
import { DatePipe } from "@angular/common";
import { DateAdapter } from "@angular/material/core";
import { JDNConvertibleCalendar } from "jdnconvertiblecalendar";
import { VATConstants } from "src/app/constants/VATConstants";
import { DomSanitizer } from "@angular/platform-browser";
import { NotifierService } from "angular-notifier";
import { TooltipConstants } from "src/app/constants/tooltip";
import * as FileSaver from "file-saver";
import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";
import { CommonValidation } from "src/app/constants/commonValidations";
import { CalendarComponent } from "src/app/constants/calendar.component";
import { Router } from "@angular/router";

declare var $: any;
@Component({
  selector: "app-new-vat-registration",
  templateUrl: "./new-vat-registration.component.html",
  styleUrls: ["./new-vat-registration.component.css"],
})
export class NewVatRegistrationComponent implements OnInit {
  @ViewChild("content") content: any;

  formz: FormGroup;
  menu;
  headerComponent = CalendarComponent;
  iban: any;
  files: any = [];
  ibnList = [];
  ibnErr1: boolean;
  newIban = [];
  ibn;
  vatSales1;
  vatSales2;
  rejDate: any;

  show: boolean = false;
  vatFormGroup: FormGroup;
  isEditable = false;
  value: number = 5;
  questionSet = VATConstants.QUESTIONSSet;
  contactSet = VATConstants.CONTACT_PERSONSet;
  contact2Set = VATConstants.CONTACTDTSet;
  vatEligibility;
  vatEligibilityText;
  vatErr;
  newDate = new Date();

  radio1 = "1";
  radio2 = "1";
  radio3 = "1";
  name = "";
  no = "";
  date = new Date().toDateString();
  id1 = "";
  dob1: any;

  lang;
  direction;
  options: Options = {
    showTicksValues: true,
    stepsArray: [
      { value: 1, legend: "Less" },
      { value: 2, legend: "187,500 SAR" },
      { value: 3, legend: "375,000 SAR" },
      { value: 4, legend: "1,000,000 SAR" },
      { value: 5, legend: "40,000,000 SAR" },
      { value: 6, legend: "Greater" },
    ],
  };

  optionActive = 1;
  defaultValue: number = 1;
  showOne: boolean = false;
  showTwo: boolean = false;
  //direction = "ltr";
  title = "Register VAT";
  submitted: boolean;
  htmlStr: any;
  vatObject: Object;
  vatObject1: Object;

  dob;

  vatSecondFormGroup: FormGroup;
  vatThirdFormGroup: FormGroup;
  vatFourthFormGroup: FormGroup;

  submitted2: boolean;
  submitted3: boolean;
  submitted4: boolean;

  myFiles: string[] = [];
  sMsg: string = "";
  attachList: any;
  vatFifthFormGroup: FormGroup;
  submitted5: boolean;
  showRange: boolean;
  showRange1: boolean;
  valTab = 1;
  valTab1 = 1;

  valTxt: string;
  valTxt1: string;
  impOrExp;
  impOrExpValue;
  impOrExpErr: boolean;

  returnId: any;
  ibanErr;
  numErr: boolean = false;
  // iBanList = [];
  showIban: boolean;
  tool1 = TooltipConstants.vatTooltip[0].tool1;
  tinErr: boolean = false;
  tinMsg: string;
  idErr: boolean = false;
  idErr1: boolean = false;
  idMsg: string;
  tinDisbaled: boolean = true;
  qErr1: boolean = false;
  qErr2: boolean = false;
  qMsg: string;
  checkErr: boolean = false;
  checkMsg: string;
  hname: string;
  showModalBox: boolean = false;
  resText: any;
  resText1: any;
  checkErr1: boolean = false;
  fileNames: any = [];
  byTin: boolean;
  currentTab: any;
  dobErr: boolean = false;
  dobMsg: string;
  iddErr: boolean = false;
  vatStDt;
  startDate: any;
  startDate1: any;
  enddate: JDNConvertibleCalendar;
  pattern = "^[0-9]*$";
  mobPattern = "^(009665)[0-9]*$";
  idnumber: any;
  pattern2 = "^[a-zA-Z\u0600-\u06FF ][sa-zA-Z\u0600-\u06FF ]*$";
  emailPattern = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$";
  alt: boolean;
  agr: boolean = false;
  skipFRS: boolean = false;
  dateErr: boolean;
  showDel: boolean;
  bankLogo: any;
  ibanLength: number = 0;
  ibnErr2: boolean;
  ibnErrMsg2: any;
  disableAddButton: boolean;
  disableContinue: boolean;
  ibansa;
  //  number[]=[0,1,2];
  // minDate: Date;
  // maxDate = new Date(2021, 0, 1);
  processSteps: any = [{ id: 1, label: "1" }, { id: 2, label: "2" }, { id: 3, label: "3" }, { id: 4, label: "4" }, { id: 5, label: "5" }, { id: 6, label: "6" }];
  processStepsArb: any = [{ id: 1, label: "١" }, { id: 2, label: "٢" }, { id: 3, label: "٣" }, { id: 4, label: "٤" }, { id: 5, label: "٥" }, { id: 6, label: "٦" }];
  ibnErr21: boolean = false;
  constructor(
    private _formBuilder: FormBuilder,
    public appSrv: AppService,
    public vatService: VatServiceService,
    public datePipe: DatePipe,
    private _dateAdapter: DateAdapter<JDNConvertibleCalendar>,
    public sanitizer: DomSanitizer,
    public notifierService: NotifierService,
    public commonValid: CommonValidation,
    private router: Router
  ) { }
  dat: any;
  minDate = new Date(2000, 0, 1);
  maxDate = {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: new Date().getDate(),
  };
  ngOnInit() {
    this.formz = this._formBuilder.group({
      ibn: [""],
    });

    console.log("test", this.maxDate, new Date().getMonth());
    this.hname = localStorage.getItem("name");
    this.date = this.datePipe.transform(this.date, "dd/MM/yyyy");
    this.optionActive = 1;
    this.minDate = new Date("2015-03-25");
    this.vatFormGroup = this._formBuilder.group({
      veStartDate: [this.dat, Validators.required],
      bankAcc: [0, Validators.required],
      ibn: ["", Validators.pattern("^[a-zA-Z0-9]*$")],
    });
    this.vatSecondFormGroup = this._formBuilder.group({
      qrange1: ["", Validators.required],
      qrange2: ["", Validators.required],
    });

    this.vatThirdFormGroup = this._formBuilder.group({
      docType: [""],

      doc: this._formBuilder.array([this.createAttachment()]),
    });

    this.vatFourthFormGroup = this._formBuilder.group({
      dob: [this.maxDate],
      gPart: [""],
      type: ["", Validators.required],
      idNumber: [
        { value: "", disabled: true },
        [
          Validators.required,
          Validators.minLength(7),
          Validators.pattern(this.pattern),
        ],
      ],
      name: [
        { value: "", disabled: true },
        [Validators.required, Validators.pattern(this.pattern2)],
      ],
      lname: [
        { value: "", disabled: true },
        [Validators.required, Validators.pattern(this.pattern2)],
      ],
      mobile: [
        { value: "", disabled: true },
        [
          Validators.required,
          Validators.maxLength(15),
          ,
          Validators.pattern(this.mobPattern),
        ],
      ],
      email: [
        { value: "", disabled: true },
        [Validators.required, Validators.pattern(this.emailPattern)],
      ],
    });

    this.vatFifthFormGroup = this._formBuilder.group({
      DecidTy: ["", Validators.required],
      DecidNo: [
        { value: "", disabled: true },
        [
          Validators.required,
          Validators.minLength(7),
          Validators.pattern(this.pattern),
        ],
      ],
      Decname: ["", [Validators.required, Validators.pattern(this.pattern2)]],
      DecDob: [this.maxDate, Validators.required],
    });

    if (localStorage.getItem("lang") === "ar") {
      this.lang = constants.langz.arb.vat;
      this.direction = constants.langz.arb.dir;
      this.vatErr = constants.langz.arb.vatError;
      this.menu = VATConstants.menuVATArb;
      this.vatEligibility = VATConstants.vatEligibilityArb;
      this.ibansa = "AS";
      this.processSteps = this.processStepsArb;
    } else {
      this.lang = constants.langz.eng.vat;
      this.direction = constants.langz.eng.dir;
      this.vatErr = constants.langz.eng.vatError;
      this.menu = VATConstants.menuVATEng;
      this.vatEligibility = VATConstants.vatEligibilityEng;
      this.ibansa = "SA"
    }

    this.getVatData();
    this.getList();
    // this.getdatz();

    console.log("as", this.vatSecondFormGroup);

    this.vatSales1 = this.lang.c4.t9;
    this.vatSales2 = this.lang.c4.t9;

    this.appSrv.data1.subscribe(
      (res) => {
        console.log("test1", res);
        this.startDate = this.commonValid.dateFormate(
          this.commonValid.toJulianDate(new Date("2018-01-01")),
          res
        );

        this.startDate1 = this.commonValid.dateFormate(
          this.commonValid.toJulianDate(new Date("1900-01-01")),
          res
        );
        this.enddate = this.commonValid.dateFormate(
          this.commonValid.toJulianDate(new Date()),
          res
        );
        this.vatFormGroup.controls["veStartDate"].setErrors(null);
        this.vatFormGroup.controls.veStartDate.setValidators(
          Validators.required
        );
      },
      (err) => {
        this.notifierService.notify(
          "error",
          err.error.error.innererror.errordetails[0].message
        );
      }
    );

    this.vatFourthFormGroup.controls["gPart"].valueChanges.subscribe((q) => {
      if (q == "") {
        this.vatFourthFormGroup.controls["dob"].setValue("");
        this.vatFourthFormGroup.controls["email"].setValue("");
        this.vatFourthFormGroup.controls["idNumber"].setValue("");
        this.vatFourthFormGroup.controls["lname"].setValue("");
        this.vatFourthFormGroup.controls["mobile"].setValue("");
        this.vatFourthFormGroup.controls["name"].setValue("");
        this.vatFourthFormGroup.controls["type"].setValue("");
        this.vatFourthFormGroup.controls["type"].enable();
      }
    });
  }

  createAttachment() {
    return this._formBuilder.group({
      id: "",
      name: "",
      url: "",
      flag: false,
      did: "",
    });
  }

  addAttachment() {
    let control = <FormArray>this.vatThirdFormGroup.controls.doc;
    // this.disableAddButton = true;
    if (control.length < 5) {
      control.push(
        this._formBuilder.group({
          id: "",
          name: "",
          url: "",
          flag: false,
          did: "",
        })
      );
      this.disableAddButton = false;
    } else {
      this.disableAddButton = true;
    }

    // this.getVatData();
    console.log(control.length);
  }

  deleteAttachment(index) {
    //console.log("i", index);
    let control = <FormArray>this.vatThirdFormGroup.controls.doc;
    control.removeAt(index);
    this.files.splice(index, 1);
    this.myFiles.splice(index, 1);
  }

  getdatz() {
    this.vatService.getdatz().subscribe((res) => {
      console.log("et", res);
    });
  }

  get f() {
    return this.vatFormGroup.controls;
  }

  get f2() {
    return this.vatSecondFormGroup.controls;
  }

  get f3() {
    return this.vatThirdFormGroup.controls;
  }
  get f4() {
    return this.vatFourthFormGroup.controls;
  }
  get f5() {
    return this.vatFifthFormGroup.controls;
  }

  getList() {
    this.vatService.getList().subscribe(
      (res) => {
        this.attachList = res["d"]["ELGBL_DOCSet"]["results"];
        console.log("sdfsdaf", this.attachList);
        this.attachList.forEach((e) => {
          e.selected = false;
        });
      },
      (err) => {
        this.notifierService.notify(
          "error",
          err.error.error.innererror.errordetails[0].message
        );
      }
    );
  }

  getTermsAndCondition() {
    this.vatService.getVatTermsAndConditions1().subscribe(
      (res) => {
        $("#exampleModal").modal("show");
        console.log("hrml", res);
        this.htmlStr = res["d"]["Zterms"];
        console.log("hrml", this.htmlStr);
      },
      (err) => {
        this.notifierService.notify(
          "error",
          err.error.error.innererror.errordetails[0].message
        );
      }
    );
  }

  getUserByTin() {
    this.byTin = true;
    this.vatService
      .getUserByTin(this.vatFourthFormGroup.get("gPart").value)
      .subscribe(
        (res) => {
          this.idErr = false;
          console.log("Tinres", res, this.vatFourthFormGroup);
          // if(res["d"]["Name1"] !== ''){
          this.vatFourthFormGroup.controls["name"].setValue(res["d"]["Name1"]);
          this.vatFourthFormGroup.controls["name"].disable();
          // }
          // if(res["d"]["Name2"] !== ''){
          this.vatFourthFormGroup.controls["lname"].setValue(res["d"]["Name2"]);
          this.vatFourthFormGroup.controls["lname"].disable();
          // }
          // if(res["d"]["Mobile"] !== ''){
          this.vatFourthFormGroup.controls["mobile"].setValue(
            res["d"]["Mobile"]
          );
          this.vatFourthFormGroup.controls["mobile"].disable();
          // }
          // if(res["d"]["Email"] !== ''){
          this.vatFourthFormGroup.controls["email"].setValue(res["d"]["Email"]);
          this.vatFourthFormGroup.controls["email"].disable();
          // }

          this.vatFourthFormGroup.clearValidators();
          this.vatFourthFormGroup.disable();
          this.vatFourthFormGroup.controls["gPart"].enable();
          this.vatFourthFormGroup.controls["type"].enable();

          this.vatFourthFormGroup.controls["idNumber"].setValue(
            res["d"]["Idnum"]
          );
          this.vatFourthFormGroup.controls["type"].setValue(res["d"]["Idtype"]);
          let d = new Date(res["d"]["Birthdt10"]);
          this.vatFourthFormGroup.controls["dob"].setValue({
            year: d.getFullYear(),
            month: d.getMonth() + 1,
            day: d.getDate(),
          });
          console.log("1016446294", this.vatSecondFormGroup.value);

          console.log("1016446294", this.vatSecondFormGroup.value);
          // this.notifierService.notify("success", "Valid Tin");
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
    this.vatService.getAckDownload(this.no).subscribe(
      (res: any) => {
        console.log("res", res);
        FileSaver.saveAs(res, "vat.pdf");
      },
      (err) => {
        this.notifierService.notify(
          "error",
          err.error.error.innererror.errordetails[0].message
        );
      }
    );
  }

  validateibn(value) {
    if (value != "") {
      this.ibnErr2 = false;
    }

    console.log("vat", value.length, this.formz.controls["ibn"].value);

    value = value.replace(/\s/g, '')
    value = value.replace(/\|/g, "")
    let first = value.substr(0, 2);
    let last = "";

    first === "SA" ? last = value.substr(2, 24) : last = value.substr(0, 22)
    console.log("vat", last);
    // this.submitted = true;
    let obj = this.commonValid.validateibn2(last);
    if (obj.flag) {
      this.numErr = true;
      this.ibanErr = obj.msg;
    } else {
      // this.validateIbanz(value);
      this.numErr = false;
      this.iban = "SA" + last;
    }
  }

  validateIbanz(value) {
    value = this.iban
    if (value == "") {
      this.ibnErr2 = true;
      this.ibnErrMsg2 = this.lang.errorMsgs.e6;
      return;
    }
    this.numErr = false;
    this.vatService.getIBNValidation(value.replace(/\s/g, "")).subscribe(
      (res) => {
        this.ibnErr21 = false;
        $("#ibanValidation").modal("hide");
        this.ibnErr1 = false;
        // this.notifierService.notify("success", this.lang.errorMsgs.validIban);
        console.log("resadas", res);
        this.iban = res["d"]["Iban"];
        let lastFiveChars;
        if (localStorage.getItem("lang") === "en") {
          lastFiveChars = "...." + this.iban.substr(-4);
        } else {
          lastFiveChars = this.iban.substr(-4) + "....";
        }
        let bankCode = this.iban.substr(4, 2);
        this.vatService.getBankLogo(bankCode).subscribe(
          (res) => {
            let img =
              "data:image/svg+xml;base64," + res["d"]["results"][0]["LogoBid"];
            this.bankLogo = this.transform(img);
            let name = res["d"]["results"][0]["Descr"];
            let iBANDisplayNumber = "";
            iBANDisplayNumber = this.iban.substr(0, 4) + " " + this.iban.substr(4, 5) + "...." + this.iban.substr(-4);
            console.log("iBANDisplayNumber", iBANDisplayNumber);
            let obj = {
              iBANDisplayNumber: iBANDisplayNumber,
              id: lastFiveChars,
              ibn: this.iban,
              flag: true,
              name: name,
              img: this.transform(img),
              del: true,
            };
            this.ibnList.push(obj);
            for (var i = 0; i < this.ibnList.length; i++) {
              i === this.ibnList.length - 1
                ? (this.ibnList[i].flag = true)
                : (this.ibnList[i].flag = false);
            }
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
        this.ibnErr21 = true;
        //this.ibnErrMsg2 =  err.error.error.innererror.errordetails[0].message;
        this.notifierService.notify(
          "error",
          err.error.error.innererror.errordetails[0].message
        );
        console.log(err);
      }
    );
  }

  getFileDetails(e, id) {
    console.log("getfledetails", e);

    for (var i = 0; i < e.length; i++) {
      if (e[i].size < 5242880) {
        this.myFiles.push(e[i]);
      }
    }

    this.uploadFiles(e[0], id);
    console.log(this.myFiles);
    this.fileNames = [];
    //this.vatSecondFormGroup.controls["doc"].setValue([]);
    for (var i = 0; i < this.myFiles.length; i++) {
      console.log(this.myFiles[i]["name"]);
      let n = this.myFiles[i]["name"];
      // this.vatSecondFormGroup.controls["doc"][i]["name"].setValue(n);
      this.fileNames.push(n);
    }
    let control = <FormArray>this.vatThirdFormGroup.controls.doc;
    console.log(control.controls[id]["controls"]);
  }

  uploadFile(event, i) {
    console.log("event", event)
    for (let index = 0; index < event.length; index++) {
      const element = event[index];
      console.log(element);
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

  uploadFiles(file, idd) {
    let control = <FormArray>this.vatThirdFormGroup.controls.doc;
    const frmData = new FormData();
    let filename;
    // for (var i = 0; i < this.myFiles.length; i++) {
    filename = file["name"];
    frmData.append("fileUpload", file);
    // }
    const parseExt = filename.split(".");
    const fileExt = parseExt[parseExt.length - 1].toLowerCase();

    if (fileExt !== 'doc' && fileExt !== 'docx' && fileExt !== 'jpeg' && fileExt !== 'jpg' && fileExt !== 'pdf' && fileExt !== 'xls' && fileExt !== 'xlsx') {
      this.notifierService.notify('error', this.lang.errorMsgs.fileType);
      return;
    }
    if (file.size > 5242880) {
      this.notifierService.notify("error", this.lang.errorMsgs.fileError);
      return;
    }
    console.log("res", filename, this.myFiles);
    this.vatService
      .attachmentSubmit(
        this.returnId,
        control.controls[idd].value.id,
        filename,
        file
      )
      .subscribe(
        (res) => {
          console.log("upload", res);
          control.controls[idd]["controls"].name.setValue(filename);
          control.controls[idd]["controls"].flag.setValue(true);
          control.controls[idd]["controls"].url.setValue(res["d"]["DocUrl"]);
          control.controls[idd]["controls"].did.setValue(res["d"]["Doguid"]);
          //control.controls[idd].value.id
          // this.notifierService.notify(
          //   "success",
          //   this.lang.successMsg
          // );
          for (var i in this.vatThirdFormGroup.controls.doc.value) {
            if (
              this.vatThirdFormGroup.controls.doc.value[i]["id"] != "" &&
              this.vatThirdFormGroup.controls.doc.value[i]["name"] == ""
            ) {
              this.disableContinue = true;
              break;
            } else {
              this.disableContinue = false;
            }
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
    console.log("att", value);
    this.vatService.downloadAttachment(value.url).subscribe(
      (res: any) => {
        console.log("res", res);
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

  onSubmit() {
    if (this.ibnList.length > 0) {
      this.newIban = [];
      for (var i in this.ibnList) {
        if (this.ibnList[i].flag) {
          let obj = {
            iBANDisplayNumber: this.ibnList[i].iBANDisplayNumber,
            id: this.ibnList[i].id,
            iban: this.ibnList[i].ibn,
            name: this.ibnList[i].name,
          };
          this.newIban.push(obj);
          this.ibnErr1 = false;
          break;
        } else {
          // this.ibnErr1 = true;
        }
      }
      // } else {
      //   this.ibnErr1 = true;
    }

    if (this.vatFormGroup.value.veStartDate === null) {
      this.dateErr = true;
    } else {
      this.dateErr = false;
    }

    if (this.impOrExp) {
      this.impOrExpErr = false;
    } else {
      this.impOrExpErr = true;
    }

    this.submitted = true;
    // stop here if form is invalid
    // if (this.vatFormGroup.invalid || this.ibnErr1 || this.impOrExpErr) {
    if (this.vatFormGroup.invalid || this.impOrExpErr) {
      return;
    }
    this.setVatObjValues1();
    this.NextStep(2);
  }

  setVatObjValues1() {
    //First Screen
    let d = this.vatFormGroup.value.veStartDate;
    if (d.calendarEnd.day < 10 && d.calendarEnd.day.toString().length == 1) {
      d.calendarEnd.day = "0" + d.calendarEnd.day;
    }
    if (
      d.calendarEnd.month < 10 &&
      d.calendarEnd.month.toString().length == 1
    ) {
      d.calendarEnd.month = "0" + d.calendarEnd.month;
    }

    let currentdate =
      d.calendarEnd.year +
      "-" +
      d.calendarEnd.month +
      "-" +
      d.calendarEnd.day +
      "T00:00:00";
    this.vatStDt = currentdate;
    console.log(this.vatFormGroup.value.veStartDate, currentdate);

    this.vatObject["d"]["CrStdt"] = currentdate;

    this.vatObject["d"]["VatDt"] = this.vatStDt;
    this.vatObject["d"]["VatTaxDt"] = this.vatStDt;

    this.ibnList.forEach((item) => {
      if (item.flag) this.vatObject["d"]["OptIban"] = item.ibn;
    });
    // this.vatObject["d"]["OptIban"] = this.vatFormGroup.value.ibn;

    if (this.impOrExp === "1") {
      this.vatObject["d"]["ImFg"] = "1";
      this.vatObject["d"]["ExFg"] = "0";
      this.impOrExpValue = this.lang.c1.t3;
    } else if (this.impOrExp === "2") {
      this.vatObject["d"]["ImFg"] = "0";
      this.vatObject["d"]["ExFg"] = "1";
      this.impOrExpValue = this.lang.c1.t4;
    } else if (this.impOrExp === "3") {
      this.vatObject["d"]["ImFg"] = "1";
      this.vatObject["d"]["ExFg"] = "1";
      this.impOrExpValue = this.lang.c1.t5;
    } else {
      this.vatObject["d"]["ImFg"] = "0";
      this.vatObject["d"]["ExFg"] = "0";
      this.impOrExpValue = this.lang.c1.t6;
    }
  }

  onSubmit2() {
    this.submitted2 = true;

    if (this.vatSecondFormGroup.value.qrange1 === "") {
      this.qErr1 = true;
      this.qMsg = this.vatErr.e11;
    } else {
      this.qErr1 = false;
    }
    if (this.vatSecondFormGroup.value.qrange2 === "") {
      this.qErr2 = true;
      this.qMsg = this.vatErr.e11;
    } else {
      this.qErr1 = false;
    }

    if (this.valTab === 1) {
      this.qMsg = this.vatErr.e11;
    }
    if (this.valTab1 === 1) {
      this.qMsg = this.vatErr.e11;
    }
    // stop here if form is invalid
    if (
      this.vatSecondFormGroup.invalid ||
      this.valTab === 1 ||
      this.valTab1 === 1
    ) {
      return;
    }
    this.NextStep(3);
    if (this.vatObject1["RegTy"] == "N") {
      this.disableContinue = true;
    } else {
      this.disableContinue = false;
    }
  }

  vatSalesText1(val) {
    if (val.value !== "") {
      this.vatObject1["QUESTIONSSet"]["results"].forEach((e, i) => {
        if (i <= 4) {
          e.QoptAns = "0";
        }
      });
      this.vatObject1["QUESTIONSSet"]["results"][val.value - 1].QoptAns = "1";
      this.vatObject1["Operationz"] = "16";
      this.vatService.getVatElegibilityType(this.vatObject1).subscribe(
        (res) => {
          console.log("res", res["d"]["RegTy"]);
          this.checkVatEligibilty(res["d"]["RegTy"]);
        },
        (err) => {
          this.notifierService.notify(
            "error",
            err.error.error.innererror.errordetails[0].message
          );
        }
      );
      this.vatSales1 = this.vatObject1["QUESTIONSSet"]["results"][
        val.value - 1
      ].QoptTxt;
    }
  }

  vatSalesText2(val) {
    if (val.value !== "") {
      this.vatObject1["QUESTIONSSet"]["results"].forEach((e, i) => {
        if (i >= 5 && i <= 9) {
          e.QoptAns = "0";
        }
      });
      this.vatObject1["QUESTIONSSet"]["results"][val.value + 4].QoptAns = "1";
      this.vatObject1["Operationz"] = "16";
      this.vatService.getVatElegibilityType(this.vatObject1).subscribe(
        (res) => {
          console.log("res", res["d"]["RegTy"]);
          this.checkVatEligibilty(res["d"]["RegTy"]);
        },
        (err) => {
          this.notifierService.notify(
            "error",
            err.error.error.innererror.errordetails[0].message
          );
        }
      );
      this.vatSales2 = this.vatObject1["QUESTIONSSet"]["results"][
        val.value + 4
      ].QoptTxt;
    }
  }

  onSubmit3() {
    this.submitted3 = true;
    // stop here if form is invalid
    if (this.vatThirdFormGroup.invalid) {
      return;
    }
    if (this.vatObject1["RegTy"] === "N") {
      if (
        this.vatThirdFormGroup.controls.doc.value.length > 0 &&
        this.vatThirdFormGroup.controls.doc.value[0]["id"] == ""
      ) {
        this.disableContinue = true;
        return;
      }
      if (this.vatThirdFormGroup.controls.doc.value.length == 0) {
        this.disableContinue = true;
        return;
      }
      // for(var i in this.vatThirdFormGroup.controls.doc.value){
      //   if(this.vatThirdFormGroup.controls.doc.value[i]["id"] == "")
      // }
    }
    this.NextStep(4);
  }

  onSubmit4() {
    this.submitted4 = true;
    this.skipFRS = false;
    if (this.vatFourthFormGroup.invalid) {
      return;
    }
    this.contactSet[0].Type = this.vatFourthFormGroup.getRawValue().type;
    this.contactSet[0].Idnumber = this.vatFourthFormGroup.getRawValue().idNumber;
    this.contactSet[0].Firstnm = this.vatFourthFormGroup.getRawValue().name;
    this.contactSet[0].Lastnm = this.vatFourthFormGroup.getRawValue().lname;
    this.contactSet[0].Gpart = this.vatFourthFormGroup.getRawValue().gPart;
    this.contact2Set[0].MobNumber = this.vatFourthFormGroup.getRawValue().mobile;
    this.contact2Set[0].SmtpAddr = this.vatFourthFormGroup.getRawValue().email;
    this.NextStep(5);
  }

  onSubmit5() {
    this.submitted5 = true;
    let addIbanFlag = false;
    if (this.newIban.length > 0) {
      if (this.vatObject["d"]["IBANSet"]["results"].length > 0) {
        for (var i in this.vatObject["d"]["IBANSet"]["results"]) {
          if (
            this.vatObject["d"]["IBANSet"]["results"][i].Iban ===
            this.newIban[0]["iban"]
          ) {
            addIbanFlag = true;
            break;
          } else {
            addIbanFlag = false;
          }
        }
      }

      if (!addIbanFlag) {
        let len = this.vatObject["d"]["IBANSet"]["results"].length;
        if (len < 9) {
          len = "000" + (len + 1);
        }
        if (len >= 9) {
          len = "00" + (len + 1);
        }
        let obj = VATConstants.IBANSet[0];
        (obj.Partner = this.vatObject["d"]["Gpartz"]),
          (obj.Bkvid = len),
          (obj.Iban = this.newIban[0]["iban"]);
        this.vatObject["d"]["IBANSet"]["results"].push(obj);
      }
    }

    // stop here if form is invalid
    if (this.vatFifthFormGroup.invalid || this.idErr1 || this.checkErr1) {
      return;
    }
    if (this.vatFifthFormGroup.value.DecidNo === "") {
      this.iddErr = true;
      this.idMsg = this.vatErr.e5;
    }

    console.log("DecidNo", this.vatFifthFormGroup.value);
    console.log("resdata", this.vatObject);

    // Second Section
    if (this.vatFifthFormGroup.value.DecidTy !== "ZS0003") {
      let d1 = this.dob1;
      if (d1.day < 10) {
        d1.day = "0" + d1.day;
      }
      if (d1.month < 10) {
        d1.month = "0" + d1.month;
      }
      let currentdate2 =
        d1.calendarStart.year +
        "-" +
        d1.calendarStart.month +
        "-" +
        d1.calendarStart.day +
        "T00:00:00";
      //let currentdate2 = "2020-07-01T00:00:00";

      this.contactSet[0].Dobdt = currentdate2;
    } else {
      this.iddErr = false;
    }

    this.vatObject["d"]["CONTACT_PERSONSet"]["results"] = this.contactSet;
    this.vatObject["d"]["CONTACTDTSet"]["results"] = this.contact2Set;

    // End

    //Fifth Section
    this.vatObject["d"][
      "DecidTy"
    ] = this.vatFifthFormGroup.getRawValue().DecidTy;
    this.vatObject["d"][
      "DecidNo"
    ] = this.vatFifthFormGroup.getRawValue().DecidNo;
    this.vatObject["d"][
      "Decname"
    ] = this.vatFifthFormGroup.getRawValue().Decname;
    this.dob = this.vatFifthFormGroup.getRawValue().DecDob;
    this.dob =
      this.dob.year + "-" + this.dob.month + "-" + this.dob.day + "T00:00:00";

    this.vatObject["d"]["ExAttch"] = "1";
    this.vatObject["d"]["ImAttch"] = "1";

    // let d2 = this.dob1;
    // if (d2.day < 10) {
    //   d2.day = "0" + d1.day;
    // }
    // if (d2.month < 10) {
    //   d2.month = "0" + d2.month;
    // }
    // let currentdate3 = d2.calendarStart.year + "-" + d2.calendarStart.month + "-" + d2.calendarStart.day + "T00:00:00";
    this.vatObject["d"]["Decdate"] = this.dob;
    //End

    this.vatObject["d"]["Operationz"] = "01";
    console.log("this.vatObject", this.vatObject);
    this.vatObject["d"]["ELGBL_DOCSet"]["results"] = [];
    for (var i in this.vatThirdFormGroup.controls.doc.value) {
      for (var j in this.attachList) {
        let obj = {
          __metadata: {
            id:
              "HTTPS://SAPGATEWAYQA.GAZT.GOV.SA/sap/opu/odata/SAP/ZDP_VAT_NW_RG_SRV/ELGBL_DOCSet(0)",
            uri:
              "HTTPS://SAPGATEWAYQA.GAZT.GOV.SA/sap/opu/odata/SAP/ZDP_VAT_NW_RG_SRV/ELGBL_DOCSet(0)",
            type: "ZDP_VAT_NW_RG_SRV.ELGBL_DOC",
          },
          FormGuid: "",
          DataVersion: "",
          Mandt: "",
          LineNo: 0,
          RankingOrder: "",
          Fbtyp: "",
          TxnTp: "CRE_RGVT",
          DmsTp: "",
          DmsTxt: "",
        };
        if (
          this.vatThirdFormGroup.controls.doc.value[i]["id"] ==
          this.attachList[j]["DmsTp"] &&
          this.vatThirdFormGroup.controls.doc.value[i]["id"] !== ""
        ) {
          obj["DmsTp"] = this.attachList[j]["DmsTp"];
          obj["DmsTxt"] = this.attachList[j]["Txt50"];
          obj["__metadata"]["id"] =
            "HTTPS://SAPGATEWAYQA.GAZT.GOV.SA/sap/opu/odata/SAP/ZDP_VAT_NW_RG_SRV/ELGBL_DOCSet(" +
            i +
            ")";
          obj["__metadata"]["uri"] =
            "HTTPS://SAPGATEWAYQA.GAZT.GOV.SA/sap/opu/odata/SAP/ZDP_VAT_NW_RG_SRV/ELGBL_DOCSet(" +
            i +
            ")";
          this.vatObject["d"]["ELGBL_DOCSet"]["results"].push(obj);
        }
      }
    }

    if (this.checkErr || this.checkErr1 || this.iddErr) {
    } else {
      this.NextStep(6);
    }
  }
  onSubmit6() {
    this.submitVAT();
  }

  getUserValidation() {
    this.dat = this.vatFourthFormGroup.value.dob;
    if (this.byTin) {
    } else {
      let d = this.vatFourthFormGroup.value.dob;
      if (d.day < 10 && d.day.toString().length == 1) {
        d.day = "0" + d.day;
      }
      if (d.month < 10 && d.month.toString().length == 1) {
        d.month = "0" + d.month;
      }
      let currentdate = "" + d.year + d.month + d.day;

      if (!this.idErr) {
        this.vatService
          .getUserValidation(this.vatFourthFormGroup.value, currentdate)
          .subscribe(
            (res) => {
              this.tinErr = false;
              console.log("res", res);
              this.vatFourthFormGroup.controls["gPart"].setValue(
                res["d"]["Tin"]
              );
              this.vatFourthFormGroup.controls["name"].setValue(
                res["d"]["Name1"]
              );
              this.vatFourthFormGroup.controls["lname"].setValue(
                res["d"]["Name2"]
              );
              this.vatFourthFormGroup.controls["mobile"].setValue(
                res["d"]["Mobile"]
              );
              this.vatFourthFormGroup.controls["email"].setValue(
                res["d"]["Email"]
              );
              this.vatFourthFormGroup.controls["dob"].setValue({
                year: this.dat.year,
                month: this.dat.month,
                day: this.dat.day,
              });

              this.vatFourthFormGroup.get("gPart").disable();
              this.vatFourthFormGroup.get("name").disable();
              this.vatFourthFormGroup.get("lname").disable();
              this.vatFourthFormGroup.get("mobile").disable();
              this.vatFourthFormGroup.get("email").disable();
              // this.notifierService.notify("success", this.lang.errorMsgs.e5);
            },
            (err) => {
              console.log();
              this.notifierService.notify(
                "error",
                err.error.innererror.errordetails[0].message
              );
            }
          );
      }
    }
  }

  getclickedrange(id) {
    if (id === 10) {
      this.valTab1 = 2;
      this.showRange = true;
      this.vatObject1["QUESTIONSSet"]["results"][id].QoptAns = "1";
      this.vatObject1["QUESTIONSSet"]["results"][id + 1].QoptAns = "0";
      this.valTxt1 = this.vatObject1["QUESTIONSSet"]["results"][id].QoptTxt;
    } else if (id === 11) {
      this.valTab1 = 3;
      this.showRange = false;
      this.vatObject1["QUESTIONSSet"]["results"][id - 1].QoptAns = "0";
      this.vatObject1["QUESTIONSSet"]["results"][id].QoptAns = "1";
      this.valTxt1 = this.vatObject1["QUESTIONSSet"]["results"][id].QoptTxt;
    } else if (id === 12) {
      this.valTab = 2;
      this.showRange1 = true;
      this.vatObject1["QUESTIONSSet"]["results"][id].QoptAns = "1";
      this.vatObject1["QUESTIONSSet"]["results"][id + 1].QoptAns = "0";
      this.valTxt = this.vatObject1["QUESTIONSSet"]["results"][id].QoptTxt;
    } else {
      this.valTab = 3;
      this.showRange1 = false;
      this.vatObject1["QUESTIONSSet"]["results"][id - 1].QoptAns = "0";
      this.vatObject1["QUESTIONSSet"]["results"][id].QoptAns = "1";
      this.valTxt = this.vatObject1["QUESTIONSSet"]["results"][id].QoptTxt;
    }
    this.vatObject1["Operationz"] = "16";
    this.vatService.getVatElegibilityType(this.vatObject1).subscribe(
      (res) => {
        console.log("res", res["d"]["RegTy"]);
        this.checkVatEligibilty(res["d"]["RegTy"]);
      },
      (err) => {
        this.notifierService.notify(
          "error",
          err.error.error.innererror.errordetails[0].message
        );
      }
    );
  }



  submitVAT() {
    this.vatObject["d"]["Decfg"] = "1";
    this.vatObject["d"]["AgrFg"] = "1";
    this.vatObject["d"]["VatDt"] = this.vatStDt;
    this.vatObject["d"]["VatTaxDt"] = this.vatStDt;
    console.log("this.vatObject ->", JSON.stringify(this.vatObject));
    this.vatService.submitVat(this.vatObject).subscribe(
      (res) => {
        console.log("res", res);
        // this.notifierService.notify(
        //   "success",
        //   "Successfully Done with VAT Registration"
        // );
        this.show = true;
        this.name = res["d"]["CrNm"];
        this.no = res["d"]["Fbnumz"];
      },
      (err) => {
        // this.show = true;//must delete
        this.notifierService.notify(
          "error",
          err.error.error.innererror.errordetails[0].message
        );
      }
    );
  }

  onReset() {
    this.submitted = false;
    this.vatFormGroup.reset();
  }

  getVatData() {
    this.vatService.getVatData().subscribe(
      (res) => {
        this.showModalBox = false;
        console.log("resdata", res);
        this.vatObject = res;
        this.vatObject1 = res["d"];
        if (res["d"]["IBANSet"]["results"].length > 0) {
          let ibnList = res["d"]["IBANSet"]["results"];
          ibnList.forEach((i) => {
            if (i.Iban !== "") {
              let lastFiveChars;
              if (localStorage.getItem("lang") === "en") {
                lastFiveChars = "...." + i.Iban.substr(-4);
              } else {
                lastFiveChars = i.Iban.substr(-4) + "....";
              }
              let bankCode = i.Iban.substr(4, 2);

              this.vatService.getBankLogo(bankCode).subscribe(
                (res) => {
                  let img =
                    "data:image/svg+xml;base64," +
                    res["d"]["results"][0]["LogoBid"];
                  let name = res["d"]["results"][0]["Descr"];
                  let obj = {
                    id: lastFiveChars,
                    ibn: i.Iban,
                    flag: false,
                    name: name,
                    img: this.transform(img),
                  };
                  this.ibnList.push(obj);
                  this.ibanLength = this.ibnList.length;
                },
                (err) => {
                  this.notifierService.notify(
                    "error",
                    err.error.error.innererror.errordetails[0].message
                  );
                }
              );
            }
          });
        }

        if (res["d"]["Statusz"] === "E0018") this.setdata(this.vatObject["d"]);

        this.returnId = this.vatObject["d"]["ReturnIdz"];
        console.log("resdata", this.vatObject, this.returnId);
      },
      (err) => {
        $("#aftsubmit").modal("show");
        this.showModalBox = true;
        this.resText = err.error.error.innererror.errordetails[0].message;
        this.resText1 = err.error.error.innererror.errordetails[1].message;
        // this.notifierService.notify(
        //   "error",
        //   err.error.error.innererror.errordetails[0].message
        // );
      }
    );
  }
  setdata(value) {
    console.log("value", value);
    this.setFirstForm(value);
    this.setSecondForm(value);
    this.setThirdForm(value);
    this.setFourthForm(value);
    this.setFifthForm(value);
  }

  setFirstForm(value) {
    this.rejDate = this.commonValid.getDateFormated(value["CrStdt"]);
    let dob;
    if (
      value["CONTACT_PERSONSet"]["results"][0]["Dobdt"] !== null &&
      value["CONTACT_PERSONSet"]["results"][0]["Dobdt"] !== ""
    ) {
      dob = this.commonValid.getDateFormated(
        value["CONTACT_PERSONSet"]["results"][0]["Dobdt"]
      );
    }

    this.appSrv.data1.subscribe((res) => {
      this.rejDate = this.commonValid.dateFormate(
        this.commonValid.toJulianDate(this.rejDate),
        res
      );
      if (dob !== undefined) {
        this.dob1 = this.commonValid.dateFormate(
          this.commonValid.toJulianDate(dob),
          res
        );
      }
    });
    let selectOp = "0";

    if (value["ImFg"] === "1") selectOp = "1";

    if (value["ExFg"] === "1") selectOp = "2";

    if (value["ImFg"] === "1" && value["ExFg"] === "1") selectOp = "3";

    if (value["ImFg"] === "0" && value["ExFg"] === "0") selectOp = "4";

    this.impOrExp = selectOp;

    // if (value["OptIban"] !== "") {
    //   let dataz = {
    //     id: this.ibnList.length,
    //     data: value["OptIban"],
    //   };
    //   this.ibnList.push(dataz);
    // }

    // this.validateIbanz(value["OptIban"]);
    if (value["IBANSet"]["results"].length > 0) {
      let ibnList = value["IBANSet"]["results"];
      ibnList.forEach((i) => {
        if (i.Iban !== "") {
          let lastFiveChars;
          if (localStorage.getItem("lang") === "en") {
            lastFiveChars = "...." + i.Iban.substr(-4);
          } else {
            lastFiveChars = i.Iban.substr(-4) + "....";
          }
          let bankCode = i.Iban.substr(4, 2);

          this.vatService.getBankLogo(bankCode).subscribe(
            (res) => {
              let img =
                "data:image/svg+xml;base64," +
                res["d"]["results"][0]["LogoBid"];
              this.bankLogo = this.transform(img);
              let name = res["d"]["results"][0]["Descr"];
              let obj = {
                id: lastFiveChars,
                ibn: i.Iban,
                flag: false,
                name: name,
                img: this.transform(img),
                del: true,
              };
              if (obj.ibn === value["OptIban"]) {
                obj.flag = true;
              }
              this.ibnList.push(obj);
              this.ibanLength = this.ibnList.length;
            },
            (err) => {
              this.notifierService.notify(
                "error",
                err.error.error.innererror.errordetails[0].message
              );
            }
          );
        }
      });
    } else {
      if (value["OptIban"] !== "") {
        let lastFiveChars;
        if (localStorage.getItem("lang") === "en") {
          lastFiveChars = "...." + value["OptIban"].substr(-4);
        } else {
          lastFiveChars = value["OptIban"].substr(-4) + "....";
        }
        let bankCode = value["OptIban"].substr(4, 2);

        this.vatService.getBankLogo(bankCode).subscribe(
          (res) => {
            let img =
              "data:image/svg+xml;base64," + res["d"]["results"][0]["LogoBid"];
            let name = res["d"]["results"][0]["Descr"];
            this.bankLogo = this.transform(img);
            let obj = {
              id: lastFiveChars,
              ibn: value["OptIban"],
              flag: true,
              name: name,
              img: this.transform(img),
              del: true,
            };
            this.ibnList.push(obj);
            this.ibanLength = this.ibnList.length;
          },
          (err) => {
            this.notifierService.notify(
              "error",
              err.error.error.innererror.errordetails[0].message
            );
          }
        );
      }
    }

    this.vatFormGroup = this._formBuilder.group({
      veStartDate: this.rejDate,
      impOrExp: selectOp,
      bankAcc: value["OptIban"],
      ibn: value["OptIban"],
    });
  }

  setSecondForm(value) {
    this.contactSet = [];
    this.contact2Set = [];

    //this.vatSecondFormGroup.controls["doc"][i]['name'].setValue(n)
    this.contactSet.push(value["CONTACT_PERSONSet"]["results"][0]);
    this.contact2Set.push(value["CONTACTDTSet"]["results"][0]);
    // let d = this.getDateFormated(this.contactSet[0].Dobdt);
    console.log("test", value["QUESTIONSSet"]["results"]);
    let qSet = value["QUESTIONSSet"]["results"];
    let qObj = {
      q1: 0,
      q2: 0,
      q3: 0,
      q4: 0,
    };
    for (var i = 0; i < qSet.length; i++) {
      if (qSet[i].QoptAns === "1" && i < 5) {
        qObj.q1 = i + 1;
        this.vatSales1 = qSet[i].QoptTxt;
      }
      if (qSet[i].QoptAns === "1" && i >= 5 && i < 10) {
        qObj.q2 = i - 4;
        this.vatSales2 = qSet[i].QoptTxt;
      }
      if (qSet[i].QoptAns === "1" && i >= 10 && i < 12) {
        if (i === 10) {
          this.valTab1 = 2;
          this.showRange = true;
          this.valTxt1 = qSet[i].QoptTxt;
          // this.backgroundImg2 = this.sanitizer.bypassSecurityTrustStyle(
          //   "url('assets/images/4@2x.png')"
          // );
        } else if (i === 11) {
          this.valTab1 = 3;
          this.showRange = false;
          this.valTxt1 = qSet[i].QoptTxt;
          // this.backgroundImg2 = this.sanitizer.bypassSecurityTrustStyle(
          //   "url('assets/images/4@2x.png')"
          // );
        }
      }
      if (qSet[i].QoptAns === "1" && i >= 12 && i < 14) {
        if (i === 12) {
          this.valTab = 2;
          this.showRange1 = true;
          this.valTxt = qSet[i].QoptTxt;
          // this.backgroundImg1 = this.sanitizer.bypassSecurityTrustStyle(
          //   "url('assets/images/4@2x.png')"
          // );
        } else if (i === 13) {
          this.valTab = 3;
          this.showRange1 = false;
          this.valTxt1 = qSet[i].QoptTxt;
          // this.backgroundImg1 = this.sanitizer.bypassSecurityTrustStyle(
          //   "url('assets/images/4@2x.png')"
          // );
        }
      }
    }
    console.log("sadas", qObj);
    this.vatSecondFormGroup = this._formBuilder.group({
      qrange1: qObj.q1,
      qrange2: qObj.q2,
    });
    this.checkVatEligibilty(value["RegTy"]);
  }

  setThirdForm(value) {
    this.vatThirdFormGroup = this._formBuilder.group({
      docType: "",
      doc: this._formBuilder.array([]),
    });
    this.setAttachment(value["ATTDETSet"]["results"]);
  }
  setFourthForm(value) {
    this.contactSet = [];
    this.contact2Set = [];

    //this.vatSecondFormGroup.controls["doc"][i]['name'].setValue(n)
    this.contactSet.push(value["CONTACT_PERSONSet"]["results"][0]);
    this.contact2Set.push(value["CONTACTDTSet"]["results"][0]);
    let d;
    let d1;
    if (this.contactSet[0].Dobdt !== null && this.contactSet[0].Dobdt !== "") {
      d = this.getDateFormated(this.contactSet[0].Dobdt);
      d1 = {
        year: d.getFullYear(),
        month: d.getMonth() + 1,
        day: d.getDate(),
      };
    } else {
      d1 = "";
    }

    console.log("test", value["QUESTIONSSet"]["results"]);

    this.vatFourthFormGroup = this._formBuilder.group({
      gPart: [this.contactSet[0].Gpart],
      type: [this.contactSet[0].Type, Validators.required],
      idNumber: [
        this.contactSet[0].Idnumber,
        [
          Validators.required,
          Validators.minLength(7),
          Validators.pattern(this.pattern),
        ],
      ],
      dob: d1,
      name: [
        this.contactSet[0].Firstnm,
        [Validators.required, Validators.pattern(this.pattern2)],
      ],
      lname: [
        this.contactSet[0].Lastnm,
        [Validators.required, Validators.pattern(this.pattern2)],
      ],
      mobile: [
        this.contact2Set[0].MobNumber,
        [
          Validators.required,
          Validators.maxLength(15),
          ,
          Validators.pattern(this.mobPattern),
        ],
      ],
      email: [
        this.contact2Set[0].SmtpAddr,
        [Validators.required, Validators.pattern(this.emailPattern)],
      ],
    });

    this.vatFourthFormGroup.controls["name"].disable();
    this.vatFourthFormGroup.controls["lname"].disable();
    this.vatFourthFormGroup.controls["mobile"].disable();
    this.vatFourthFormGroup.controls["email"].disable();
    this.vatFourthFormGroup.controls["idNumber"].disable();
  }

  setAttachment(value) {
    let control = <FormArray>this.vatThirdFormGroup.controls.doc;
    for (var i = 0; i < value.length; i++) {
      if (value[i].Dotyp !== "ZVT1" && value[i].Dotyp !== "ZVT2") {
        control.push(
          this._formBuilder.group({
            id: value[i].Dotyp,
            name: value[i].Filename,
            url: value[i].DocUrl,
            flag: true,
            did: value[i].Doguid,
          })
        );
        this.attachList.filter((e) => {
          if (value[i].Dotyp === e.DmsTp) {
            e.selected = true;
          }
        });
        this.files.push({ name: value[i].Filename, size: "" });
      }
    }
    if (this.files.length == 0) {
      control.push(
        this._formBuilder.group({
          id: "",
          name: "",
          url: "",
          flag: false,
          did: "",
        })
      );
    }
    console.log(control.value);
  }

  setFifthForm(value) {
    let cObj = {
      q1: false,
      q2: false,
    };

    //let d = this.getDateFormated(value["Decdate"]);
    let d = new Date();
    this.vatFifthFormGroup = this._formBuilder.group({
      DecidTy: [value["DecidTy"], Validators.required],
      DecidNo: [
        value["DecidNo"],
        [
          Validators.required,
          Validators.minLength(7),
          Validators.pattern(this.pattern),
        ],
      ],
      Decname: [
        value["Decname"],
        [Validators.required, Validators.pattern(this.pattern2)],
      ],
      DecDob: [this.maxDate, Validators.required],
    });
  }

  getDateFormated(value) {
    let val = value.substring(value.indexOf("(") + 1);
    val = val.substring(0, val.indexOf(")"));
    return new Date(parseInt(val));
  }

  // getSelected() {
  //   console.log(' $("#aftsubmit").modal("show");');

  //   $("#aftSelect").modal("show");
  // }

  resetvat() {
    this.id1 = "";
    this.dob1 = undefined;
    this.vatFifthFormGroup.controls["DecidNo"].setValue("");
  }

  resetvat1() {
    this.id1 = "";
    this.dob1 = undefined;
    this.vatFourthFormGroup.controls["idNumber"].setValue("");
  }

  getSelected() {
    this.resetvat();
    // this.flags = true;
    this.vatFifthFormGroup.get("DecidNo").disable();
    this.alt = false;
    $("#aftSelect").modal("show");
  }

  getSelected1() {
    this.resetvat1();
    // this.flags = true;
    this.vatFourthFormGroup.controls["dob"].setValidators(Validators.required);
    this.alt = true;
    this.vatFourthFormGroup.get("idNumber").disable();
    this.vatFourthFormGroup.get("name").disable();
    this.vatFourthFormGroup.get("lname").disable();
    this.vatFourthFormGroup.get("mobile").disable();
    this.vatFourthFormGroup.get("email").disable();
    $("#aftSelect1").modal("show");
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

  validateID2(testForm) {
    if (this.vatFourthFormGroup.value.type !== "ZS0003") {
      this.validateID1();
      if (
        this.dob1 === undefined ||
        this.dob1 === null ||
        testForm.form.status === "INVALID"
      ) {
        //this.idErr1 = false;
        this.dobErr = true;
        this.dobMsg = this.vatErr.e6;
      } else {
        this.dobErr = false;
        this.dobMsg = "";
        console.log("test");
      }
      if (!this.idErr1 && !this.dobErr && this.dob1) {
        let d = this.dob1["calendarStart"];
        console.log("sdsd", this.dob1);
        if (d.day < 10 && d.day.toString().length == 1) {
          d.day = "0" + d.day;
        }
        if (d.month < 10 && d.month.toString().length == 1) {
          d.month = "0" + d.month;
        }
        let currentdate = "" + d.year + d.month + d.day;

        let obj = {
          type: this.vatFourthFormGroup.value.type,
          idNumber: this.id1,
        };
        this.vatService.getUserValidation(obj, currentdate).subscribe(
          (res) => {
            this.tinErr = false;
            console.log("res", res);
            this.iddErr = false;
            this.idnumber = res["d"]["Idnum"];
            this.vatFourthFormGroup.controls["idNumber"].setValue(
              res["d"]["Idnum"]
            );
            this.vatFourthFormGroup.controls["name"].setValue(
              res["d"]["Name1"]
            );
            this.vatFourthFormGroup.controls["gPart"].setValue(res["d"]["Tin"]);
            this.vatFourthFormGroup.controls["mobile"].setValue(
              res["d"]["Mobile"]
            );
            this.vatFourthFormGroup.controls["email"].setValue(
              res["d"]["Email"]
            );
            this.vatFourthFormGroup.controls["idNumber"].disable();
            // this.vatFourthFormGroup.controls["type"].disable();
            this.tinValidation(res["d"]["Tin"]);
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

  GccClick() {
    this.vatFifthFormGroup.get("DecidNo").enable();
    this.vatFifthFormGroup.controls["DecidNo"].setValue("");
  }

  GccClick1() {
    // this.vatFourthFormGroup.reset(this.vatFourthFormGroup.value);
    // this.vatFourthFormGroup.controls["gPart"].setValue("", { emitEvent: false });
    this.vatFourthFormGroup.controls["dob"].clearValidators();
    this.vatFourthFormGroup.enable();
    // this.vatFourthFormGroup.get("idNumber").enable();
    // this.vatFourthFormGroup.controls["idNumber"].setValue("");
    this.vatFourthFormGroup.patchValue(
      {
        gPart: "",
        dob: "",
        idNumber: "",
        name: "",
        mobile: "",
        email: "",
        lname: "",
        type: "ZS0003",
      },
      { emitEvent: false }
    );
  }

  validateID() {
    if (this.id1 === "") {
      this.idErr1 = true;
      this.idMsg = this.vatErr.e5;
    } else if (this.vatFifthFormGroup.value.DecidTy !== "ZS0003") {
      this.IDtypeValidation1(this.vatFifthFormGroup.value.DecidTy, this.id1);
    }
  }

  validateID1() {
    if (this.id1 === "") {
      this.idErr1 = true;
      this.idMsg = this.vatErr.e5;
    } else if (this.vatFourthFormGroup.value.type !== "ZS0003") {
      this.IDtypeValidation1(this.vatFourthFormGroup.value.type, this.id1);
    } else {
      this.iddErr = false;
      this.dobErr = false;
    }
  }

  validateIDz(testForm) {
    if (this.vatFifthFormGroup.value.DecidTy !== "ZS0003") {
      this.validateID();
      if (
        this.dob1 === undefined ||
        this.dob1 === null ||
        testForm.form.status === "INVALID"
      ) {
        //this.idErr1 = false;
        this.dobErr = true;
        this.dobMsg = this.vatErr.e6;
      } else {
        this.dobErr = false;
        this.dobMsg = "";
        console.log("test");
      }
      if (!this.idErr1 && !this.dobErr && this.dob1) {
        let d = this.dob1["calendarStart"];
        console.log("sdsd", this.dob1);
        if (d.day < 10 && d.day.toString().length == 1) {
          d.day = "0" + d.day;
        }
        if (d.month < 10 && d.month.toString().length == 1) {
          d.month = "0" + d.month;
        }
        let currentdate = "" + d.year + d.month + d.day;

        let obj = {
          type: this.vatFifthFormGroup.value.DecidTy,
          idNumber: this.id1,
        };
        this.vatService.getUserValidation(obj, currentdate).subscribe(
          (res) => {
            this.tinErr = false;
            console.log("res", res);
            this.iddErr = false;
            this.idnumber = res["d"]["Idnum"];
            this.vatFifthFormGroup.get("DecidNo").setValue(res["d"]["Idnum"]);
            // this.vatFifthFormGroup.get("Decname").setValue(
            //   res["d"]["Name1"]
            // );
            this.vatFifthFormGroup.controls["Decname"].patchValue("");
            this.vatFifthFormGroup.controls["Decname"].enable();

            if (res["d"]["Name1"] != "" || res["d"]["Name2"] != "") {
              this.vatFifthFormGroup.controls["Decname"].patchValue(
                res["d"]["Name1"] + " " + res["d"]["Name2"]
              );
              this.vatFifthFormGroup.controls["Decname"].disable();
            }
            this.vatFifthFormGroup.controls["DecidNo"].disable();
            $("#aftSelect").modal("hide");

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

  deleteAttachmentFromSer(val1, val2) {
    this.vatService.deleteAttachment(val1, val2).subscribe((res) => {
      console.log("delere", res);
      this.attachList.filter((e) => {
        if (e["DmsTp"] == val1) {
          e.selected = false;
        }
      });
    });
  }

  NextStep(id) {
    this.currentTab = id;
    this.optionActive = id;
    if (this.optionActive === 1) {
      this.showOne = false;
      this.showTwo = false;
      this.defaultValue = 1;
    } else {
      if (this.optionActive === 2) {
        this.showOne = true;
      }
      if (this.optionActive === 3) {
        this.showTwo = true;
      }
      this.defaultCss(id);
    }
  }

  defaultCss(id) {
    this.defaultValue += id;
  }

  submit() {
    this.submitVAT();
  }

  tinValidation(value) {
    if (localStorage.getItem('gpart') == value) {
      this.tinErr = true;
      this.tinMsg = this.vatErr.e22;
      return
    }
    let first = value.substr(0, 1);
    if (first !== "3") {
      this.tinErr = true;
      this.tinMsg = this.vatErr.e12;
    } else {
      if (value.length === 10) {
        this.tinErr = false;
        this.getUserByTin();
      } else {
        this.tinErr = true;
        this.tinMsg = this.vatErr.e13;
      }
    }
    console.log("tin");
  }

  IDtypeValidation() {
    let obj = this.commonValid.IDtypeValidation(
      this.vatSecondFormGroup.value.type,
      this.vatSecondFormGroup.value.idNumber
    );
    this.idErr = obj.flag;
    this.idMsg = obj.msg;
  }

  IDtypeValidation1(type, idNum) {
    let obj = this.commonValid.IDtypeValidation(type, idNum);
    this.idErr1 = obj.flag;
    this.idMsg = obj.msg;
  }

  reset() {
    this.idErr1 = false;
    this.dobErr = false;
  }
  back() {
    if (this.optionActive > 1) {
      this.optionActive--;
    } else {
      this.router.navigate(["mains/tax"]);
    }
  }

  getImpExp(value) {
    this.impOrExp = value;
  }

  deleteIban(index) {
    this.ibnList.splice(index, 1);
  }

  selectedIban(j) {
    console.log(j, this.ibnList);
    this.ibnList.forEach((i) => (i.flag = false));
    this.ibnList[j].flag = true;
    this.bankLogo = this.ibnList[j].img;
  }
  checkVatEligibilty(val) {
    this.vatEligibilityText = this.vatEligibility[val];
    this.vatObject1["RegTy"] = val;
  }

  resetIban() {
    this.ibn = "";
    this.ibanErr = "";
    this.ibnErrMsg2 = "";
    this.formz.controls['ibn'].setValue("")
    this.numErr = true;
    if (this.ibnList.length < this.ibanLength + 1) {
      $("#ibanValidation").modal("show");
    }
  }

  transform(val) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(val);
  }

  checkDocTyp() {
    this.notifierService.notify("error", this.lang.errorMsgs.selAttch);
  }

  showAttchmnt() {
    if (this.vatThirdFormGroup.controls.doc.value.length > 0) {
      for (var i in this.vatThirdFormGroup.controls.doc.value) {
        if (this.vatThirdFormGroup.controls.doc.value[i].flag) {
          return true;
        }
      }
    }
  }

  check() {
    // if( this.vatObject["d"]["Statusz"] === "E0018") {
    if (this.vatFourthFormGroup.getRawValue().gPart === "") {
      this.vatFourthFormGroup.controls["dob"].setValue("");
      this.vatFourthFormGroup.controls["email"].setValue("");
      this.vatFourthFormGroup.controls["idNumber"].setValue("");
      this.vatFourthFormGroup.controls["lname"].setValue("");
      this.vatFourthFormGroup.controls["mobile"].setValue("");
      this.vatFourthFormGroup.controls["name"].setValue("");
      this.vatFourthFormGroup.controls["type"].setValue("");
      this.vatFourthFormGroup.controls["type"].enable();
    }
    // }
  }

  disableSelectedDocType(item, index) {
    // this.attachList[index].selected = true;
    this.attachList.filter((e1) => (e1.selected = false));

    for (var i in this.vatThirdFormGroup.controls.doc.value) {
      for (var j in this.attachList) {
        if (
          this.vatThirdFormGroup.controls.doc.value[i]["id"] ===
          this.attachList[j]["DmsTp"]
        ) {
          this.attachList[j]["selected"] = true;
        }
        // if (this.attachList[j]["DmsTp"] == "" && this.vatObject1["RegTy"] == 'N' && ) {
        //   this.disableContinue = true;
        // }
        if (this.attachList[j]["DmsTp"] == "") {
          this.attachList[j]["selected"] = false;
        }
      }
    }

    for (var i in this.vatThirdFormGroup.controls.doc.value) {
      if (
        this.vatThirdFormGroup.controls.doc.value[i]["id"] != "" &&
        this.vatThirdFormGroup.controls.doc.value[i]["name"] == ""
      ) {
        this.disableContinue = true;
        break;
      } else {
        this.disableContinue = false;
      }
    }

    if (this.vatObject1["RegTy"] === "N") {
      if (
        this.vatThirdFormGroup.controls.doc.value.length > 0 &&
        this.vatThirdFormGroup.controls.doc.value[0]["id"] == ""
      ) {
        this.disableContinue = true;
      }
    }
  }

  checkDisable() {
    return this.ibnList.length > this.ibanLength;
  }

  restrictAlphabets(e) {
    var x = e.which || e.keycode;
    if (x >= 48 && x <= 57) return true;
    else return false;
  }

  getGCCValidation(val) {
    console.log(val);
    if (val.length >= 7) {
      let obj = {
        type: "ZS0003",
        idNumber: val,
      };
      this.vatService.getUserValidation(obj, "").subscribe(
        (res) => {
          console.log(res);
          if (res["d"]["Name1"] != "") {
            this.vatFourthFormGroup.controls["name"].patchValue(
              res["d"]["Name1"]
            );
            this.vatFourthFormGroup.controls["name"].disable();
          }
          if (res["d"]["Name2"] != "") {
            this.vatFourthFormGroup.controls["lname"].patchValue(
              res["d"]["Name2"]
            );
            this.vatFourthFormGroup.controls["lname"].disable();
          }
          if (res["d"]["Mobile"] != "") {
            this.vatFourthFormGroup.controls["mobile"].patchValue(
              res["d"]["Mobile"]
            );
            this.vatFourthFormGroup.controls["mobile"].disable();
          }
          if (res["d"]["Email"] != "") {
            this.vatFourthFormGroup.controls["email"].patchValue(
              res["d"]["Email"]
            );
            this.vatFourthFormGroup.controls["email"].disable();
          }
          if (res["d"]["Tin"] != "") {
            this.vatFourthFormGroup.controls["gPart"].patchValue(
              res["d"]["Tin"],
              { emitEvent: false }
            );
            // this.vatFourthFormGroup.controls["gPart"].disable();
          }
          //this.vatFormThirdGroup.get("Decname").disable();
          // this.notifierService.notify("success", this.lang.errorMsgs.e5);
        },
        (err) => {
          console.log();
          this.notifierService.notify(
            "error",
            err.error.error.innererror.errordetails[0].message
          );
        }
      );
    }
  }

  backto(id) {
    this.appSrv.updatedDataSelection9(id);
    this.router.navigate(["/mains/tax"]);
  }

  getGCCValidation1(val) {
    if (this.vatFifthFormGroup.value.DecidTy === "ZS0003") {
      console.log(val);
      if (val.length >= 7) {
        let obj = {
          type: "ZS0003",
          idNumber: val,
        };
        this.vatService.getUserValidation(obj, "").subscribe(
          (res) => {
            console.log(res);
            this.vatFifthFormGroup.controls["Decname"].patchValue("");
            this.vatFifthFormGroup.controls["Decname"].enable();
            if (res["d"]["Name1"] != "" || res["d"]["Name2"] != "") {
              this.vatFifthFormGroup.controls["Decname"].patchValue(
                res["d"]["Name1"] + " " + res["d"]["Name2"]
              );
              this.vatFifthFormGroup.controls["Decname"].disable();
            }

            //this.vatFormThirdGroup.get("Decname").disable();
            // this.notifierService.notify("success", this.lang.errorMsgs.e5);
          },
          (err) => {
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


  resetErrors() {
    this.ibanErr = "";
    this.ibnErrMsg2 = "";
    this.formz.controls['ibn'].setValue("")
  }
}
