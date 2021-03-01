import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators, FormArray } from "@angular/forms";
import { VATConstants } from "src/app/constants/VATConstants";
import { CalendarComponent } from "src/app/constants/calendar.component";
import { ExciseServiceService } from "src/app/services/excise-service.service";
import { NotifierService } from "angular-notifier";
import { constants } from "src/app/constants/constants.model";
import { CommonValidation } from "src/app/constants/commonValidations";
import { VatServiceService } from "src/app/services/vat-service.service";
import { AppService } from "src/app/app.service";
import * as FileSaver from "file-saver";
import { Router } from "@angular/router";
import { ExciseConstants } from "src/app/constants/ExciseConstants";
import { DomSanitizer } from "@angular/platform-browser";
declare var $: any;
@Component({
  selector: "app-new-excise-registration",
  templateUrl: "./new-excise-registration.component.html",
  styleUrls: ["./new-excise-registration.component.css"],
})
export class NewExciseRegistrationComponent implements OnInit {
  headerComponent = CalendarComponent;
  formz: FormGroup;

  immageurl = "assets/image/1-st.svg";
  exciseFormGroup: FormGroup;
  submitted2: boolean;
  files: any = [];
  optionSlected = 1;
  menu: any;
  sub = false;
  goodsTypeList: any;
  crdSet: any;
  gPart;
  exciseFormGroup3: FormGroup;
  submitted3: boolean;
  id1: string;
  idErr1: boolean;
  idMsg: any;
  vatErr;
  dob1: String = "";
  dobErr: boolean;
  dobMsg: any;
  inputReadonly = true;
  tinErr: boolean;
  iddErr: boolean;
  enddate: any;
  flags = true;
  tWar;
  ibn;
  numErr: boolean = true;
  ibanErr: string;

  newDate = new Date();
  myFiles = [];
  fileNames = [];
  returnId: any;
  iban: any;
  ibnList = [];
  newIban = [];
  goodsTypeList1 = [];
  crdDType = [];
  exType = "";
  ibnErr1: boolean;
  exTypeErr: boolean;
  gTypeErr: boolean;
  postResponse: any;
  fileURL: string;
  show: boolean;
  exciseObj: any;
  agr: boolean = false;
  gftype = [];
  htmlStr: any;
  resText: any;
  resText1: any;
  crdObj = ExciseConstants.CRDTLSET[0];
  obj = ExciseConstants.GOODTYPESSet[0];
  crnErr: boolean;
  idnumber: any;
  crnErr1: boolean;
  pattern = "^[0-9]*$";
  pattern2 = "^[a-zA-Z\u0600-\u06FF ][sa-zA-Z\u0600-\u06FF ]*$";
  count = 0;
  crnErr2: boolean;
  CrNm: any;
  goodsTypeSet: any;
  ibanCode: any;
  lang: any;
  dir: string;
  bankLogo: any;
  ibnErr2: boolean;
  ibnErrMsg2: any;
  selectedCRNo: any;
  ibansa;
  ibnErr21: boolean = false;
  processSteps: any = [
    { id: 1, label: "1" },
    { id: 2, label: "2" },
    { id: 3, label: "3" },
    { id: 4, label: "4" },
    { id: 5, label: "5" },
  ];
  processStepsArb: any = [
    { id: 1, label: "١" },
    { id: 2, label: "٢" },
    { id: 3, label: "٣" },
    { id: 4, label: "٤" },
    { id: 5, label: "٥" },
  ];

  constructor(
    private _formBuilder: FormBuilder,
    private exciseService: ExciseServiceService,
    public notifierService: NotifierService,
    public commonValid: CommonValidation,
    public vatService: VatServiceService,
    public appSrv: AppService,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.formz = this._formBuilder.group({
      ibn: [""],
    });

    if (localStorage.getItem("lang") === "ar") {
      this.lang = constants.langz.arb.newExcise;
      this.dir = constants.langz.arb.dir;
      this.menu = ExciseConstants.menuExciseArb;
      this.vatErr = constants.langz.arb.vatError;
      this.ibansa = "AS";
      this.processSteps = this.processStepsArb;
    } else {
      this.lang = constants.langz.eng.newExcise;
      this.dir = constants.langz.eng.dir;
      this.menu = ExciseConstants.menuExciseEng;
      this.vatErr = constants.langz.eng.vatError;
      this.ibansa = "SA";
    }

    this.appSrv.data1.subscribe((res) => {
      this.enddate = this.commonValid.dateFormate(
        this.commonValid.toJulianDate(new Date()),
        res
      );
    });
    console.log();
    this.gPart = localStorage.getItem("gpart");
    this.exciseFormGroup = this._formBuilder.group({
      doc: this._formBuilder.array([this.createAttachment()]),
      acc: this._formBuilder.array([]),
    });

    this.exciseFormGroup3 = this._formBuilder.group({
      Type: ["", Validators.required],
      Idnumber: [
        "",
        [
          Validators.required,
          Validators.minLength(7),
          Validators.pattern(this.pattern),
        ],
      ],
      Owner: ["", [Validators.required, Validators.pattern(this.pattern2)]],
      Decname: ["", [Validators.required, Validators.pattern(this.pattern2)]],
      Decdate: [this.enddate, Validators.required],
      AgrFg: [false],
      Decfg: [false],
    });
    this.getBtnSet();
    this.getETData();
    // this.vatErr = constants.langz.eng.vatError;
    this.crdDType.push(Object.assign({ ...this.crdObj }));
    this.exciseFormGroup3.get("Idnumber").disable();
  }

  GccClick() {
    this.exciseFormGroup3.get("Idnumber").enable();
    this.exciseFormGroup3.controls["Idnumber"].setValue("");
  }

  change() {
    console.log("change");
  }

  mapcrn(item, ii) {
    this.selectedCRNo = item.CrNo;
    let control = <FormArray>this.exciseFormGroup.controls.doc;
    let val = control.value;
    let ind = [];
    for (var i = 0; i < val.length; i++) {
      for (var j = 0; j < this.crdSet.length; j++) {
        if (this.crdSet[j].CrNo === val[i].id) {
          ind.push(j);
          this.CrNm = this.crdSet[j].CrNm;
        }
      }
    }

    this.crdSet.forEach((element) => {
      element.flag = false;
    });

    ind.forEach((element) => {
      this.crnErr = false;
      this.crnErr1 = false;
      this.crdSet[element].flag = true;
    });
    // console.log("test ", item.CrNo, item.CrNm, i, this.crdDType);
    // if (!this.crdSet[i].flag) this.crdSet[i].flag = true;
    //  {
    //   this.crdSet.forEach((element) => {
    //     element.CrNo === item.CrNo
    //       ? (element.flag = true)
    //       : (element.flag = false);
    //     if (element.flag) this.crnErr = false;
    //   });
    //   // console.log("this.crdDType[i]['CrNm']",this.crdDType[i]["CrNm"])
    //   // this.crdDType[i]["CrNm"] = item.CrNm;
    //   // this.crdDType[i]["CrNo"] = item.CrNo;
    //   // console.log(this.crdDType);
    // }
  }

  onSubmit() {
    console.log("submit", this.exciseFormGroup, this.crdDType);
  }

  onSubmitx() {
    this.submitted3 = true;
    this.validateID();
    if (
      this.exciseFormGroup3.invalid ||
      this.idErr1 ||
      this.dobErr ||
      this.iddErr
    ) {
      return;
    }
    this.next();
  }

  onSubmitf(testForm) {
    console.log("TF:", testForm.value);
    if (testForm.value.sd !== null && testForm.value.sd !== undefined) {
      testForm.resetForm(testForm.value);
    }
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
    let control = <FormArray>this.exciseFormGroup.controls.doc;
    control.push(
      this._formBuilder.group({
        id: "",
        name: "",
        url: "",
        flag: false,
        did: "",
      })
    );
    this.crdDType.push(Object.assign({ ...this.crdObj }));
    this.count++;
    console.log("test", control.value);
  }

  createAcc() {
    return this._formBuilder.group({
      id: "",
      name: "",
      flag: false,
    });
  }

  deleteAttachment(index) {
    let control = <FormArray>this.exciseFormGroup.controls.doc;
    if (control.length === 1) {
      this.crnErr1 = true;
    } else {
      this.count--;
      this.crnErr1 = false;

      let valuez = control.value[index];
      console.log(control.value[index], valuez);
      console.log(this.crdDType, valuez.id);
      //let ind;

      // for (var i = 0; i < this.crdDType.length; i++) {
      //   if (this.crdDType[i].CrNo === valuez.id) {
      //     ind = i;
      //   }
      // }
      // this.crdDType.splice(ind, 1);
      // console.log(this.crdDType);

      // this.crdSet.forEach((element) => {
      //   if (element.CrNo === valuez.id) {
      //     element.flag = false;
      //   } else {
      //     element.flag = true;
      //   }
      // });
      // this.crdSet = this.crdSet;

      control.removeAt(index);
      let control2 = <FormArray>this.exciseFormGroup.controls.doc;
      let val = control2.value;
      let ind = [];
      for (var i = 0; i < val.length; i++) {
        for (var j = 0; j < this.crdSet.length; j++) {
          if (this.crdSet[j].CrNo === val[i].id) {
            ind.push(j);
          }
        }
      }

      this.crdSet.forEach((element) => {
        element.flag = false;
      });

      ind.forEach((element) => {
        this.crdSet[element].flag = true;
      });
      let cnt = 0;
      for (var i = 0; i < val.length; i++) {
        if (val[i].id === "") {
          cnt++;
          this.crnErr = true;
        }
      }
      if (cnt === 0) {
        this.crnErr = false;
      }
    }
  }

  addACC() {
    let control = <FormArray>this.exciseFormGroup.controls.acc;
    control.push(
      this._formBuilder.group({
        id: "",
        name: "Al Rajhi Bank",
        flag: true,
      })
    );
    console.log(control);
  }

  deleteAcc(index) {
    let control = <FormArray>this.exciseFormGroup.controls.acc;
    control.removeAt(index);
  }

  uploadFile(event) {
    for (let index = 0; index < event.length; index++) {
      const element = event[index];
      console.log(element);
      let obj = {
        name: element.name,
        size: element.size / 10000,
      };
      this.files.push(obj);
    }
  }

  deleteAttachments(index) {
    this.files.splice(index, 1);
  }

  get f3() {
    return this.exciseFormGroup3.controls;
  }

  next() {
    if (this.optionSlected < 4) this.optionSlected++;
    else this.sub = true;
    console.log(this.optionSlected);
  }
  back() {
    if (this.optionSlected > 1) this.optionSlected--;
    else {
      this.router.navigate(["mains/tax"]);
    }
  }

  getBtnSet() {
    this.exciseService.getBtnSet(this.gPart).subscribe(
      (res) => {
        this.goodsTypeList = res["d"]["GDTYPESet"]["results"];
        //this.crdDType = res["d"]["crddSet"]["results"];
        this.goodsTypeList.forEach((item) => {
          item["selected"] = false;
        });
        this.crdSet = res["d"]["crddSet"]["results"];
        this.crdSet.forEach((element) => {
          element["flag"] = false;
        });
        console.log("goodsTypeList", this.goodsTypeList);
        console.log("crdSet", this.crdSet);
      },
      (err) => {
        this.notifierService.notify(
          "error",
          err.error.error.innererror.errordetails[0].message
        );
      }
    );
  }

  getETData() {
    this.exciseService.getETData(this.gPart).subscribe(
      (res) => {
        console.log(res);
        this.exciseObj = res["d"];
        this.returnId = res["d"]["ReturnIdz"];
        if (res["d"]["Statusz"] === "E0018") this.setData(this.exciseObj);
      },
      (err) => {
        $("#aftsubmit").modal("show");
        //this.showModalBox = true;
        this.resText = err.error.error.innererror.errordetails[0].message;
        this.resText1 = err.error.error.innererror.errordetails[1].message;
      }
    );
  }

  validateID() {
    if (this.id1 === "" && this.exciseFormGroup3.value.Idnumber === "") {
      this.idErr1 = true;
      this.idMsg = this.vatErr.e5;
    } else if (this.exciseFormGroup3.value.Type !== "ZS0003") {
      this.IDtypeValidation1(this.id1);
    } else {
      this.idErr1 = false;
      this.dobErr = false;
      this.iddErr = false;
    }
  }

  validateIDz() {
    if (this.exciseFormGroup3.value.Type !== "ZS0003") {
      this.validateID();
      if (this.dob1 === undefined || this.dob1 === null) {
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
          type: this.exciseFormGroup3.value.Type,
          idNumber: this.id1,
        };
        this.vatService.getUserValidation(obj, currentdate).subscribe(
          (res) => {
            this.tinErr = false;
            console.log("res", res);
            this.iddErr = false;
            this.idnumber = res["d"]["Idnum"];
            this.exciseFormGroup3.controls["Idnumber"].setValue(
              res["d"]["Idnum"]
            );
            //this.exciseFormGroup3.controls["Decname"].setValue(res["d"]["Name1"]);
            this.exciseFormGroup3.get("Idnumber").disable();
            $("#idValidation").modal("hide");

            //this.vatFormThirdGroup.get("Decname").disable();
            // this.notifierService.notify("success", this.lang.errorMsgs.e14);
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

  getSelected() {
    this.resetvat();
    this.flags = true;
    this.exciseFormGroup3.get("Idnumber").disable();
    $("#idValidation").modal("show");
  }

  close() {
    $("#idValidation").modal("hide");
  }

  IDtypeValidation1(idNum) {
    let obj = {
      flag: false,
      msg: "",
    };
    obj = this.commonValid.IDtypeValidation(
      this.exciseFormGroup3.value.Type,
      idNum
    );
    this.idErr1 = obj.flag;
    this.idMsg = obj.msg;
  }

  validateibn(value) {
    if (value != "") {
      this.ibnErr2 = false;
    }

    console.log("vat", value.length, this.formz.controls["ibn"].value);

    value = value.replace(/\s/g, "");
    value = value.replace(/\|/g, "");
    let first = value.substr(0, 2);
    let last = "";

    first === "SA"
      ? (last = value.substr(2, 24))
      : (last = value.substr(0, 22));
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
    value = this.iban;
    if (value == "") {
      this.ibnErr2 = true;
      this.ibnErrMsg2 = this.vatErr.e21;
    } else {
      this.vatService.getIBNValidation(value.replace(/\s/g, "")).subscribe(
        (res) => {
          this.ibnErr21 = false;
          $("#ibanValidation").modal("hide");
          this.ibnErr1 = false;
          // this.notifierService.notify("success", this.lang.validIban);
          console.log("resadas", res);
          this.iban = res["d"]["Iban"];
          let lastFiveChars = "...." + this.iban.substr(-4);
          let bankCode = this.iban.substr(4, 2);
          this.exciseService.getBankLogo(bankCode).subscribe(
            (res) => {
              let img =
                "data:image/svg+xml;base64," +
                res["d"]["results"][0]["LogoBid"];
              this.bankLogo = this.transform(img);
              let name = res["d"]["results"][0]["Descr"];
              let obj = {
                id: lastFiveChars,
                ibn: this.iban,
                flag: true,
                name: name,
                img: this.transform(img),
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
  }

  getType(flag, id) {
    flag
      ? (this.goodsTypeList[id].selected = false)
      : (this.goodsTypeList[id].selected = true);
    this.goodsTypeList.forEach((element) => {
      if (element.selected) this.gTypeErr = false;
    });
  }
  checkEType() {
    this.exTypeErr = false;
  }
  getTWar(flag) {
    flag ? (this.tWar = false) : (this.tWar = true);
  }

  getFileDetails(e, id) {
    console.log(e);

    for (var i = 0; i < e.length; i++) {
      this.myFiles.push(e[i]);
    }

    this.uploadFiles(id);
    console.log(this.myFiles);
    this.fileNames = [];
    //this.vatSecondFormGroup.controls["doc"].setValue([]);
    for (var i = 0; i < this.myFiles.length; i++) {
      console.log(this.myFiles[i]["name"]);
      let n = this.myFiles[i]["name"];
      // this.vatSecondFormGroup.controls["doc"][i]["name"].setValue(n);
      this.fileNames.push(n);
    }
    let control = <FormArray>this.exciseFormGroup.controls.doc;
    console.log(control.controls[id]["controls"]);
  }

  uploadFiles(idd) {
    let control = <FormArray>this.exciseFormGroup.controls.doc;
    const frmData = new FormData();
    let filename;
    for (var i = 0; i < this.myFiles.length; i++) {
      filename = this.myFiles[i]["name"];
      frmData.append("fileUpload", this.myFiles[i]);
    }
    console.log("res", filename, this.myFiles);
    // this.vatService
    //   .attachmentSubmit(
    //     this.returnId,
    //     control.controls[idd].value.id,
    //     filename,
    //     frmData
    //   )
    //   .subscribe(
    //     (res) => {
    //       console.log("upload", res);
    //       control.controls[idd]["controls"].name.setValue(filename);
    //       control.controls[idd]["controls"].flag.setValue(true);
    //       control.controls[idd]["controls"].url.setValue(res["d"]["DocUrl"]);
    //       control.controls[idd]["controls"].did.setValue(res["d"]["Doguid"]);
    //       //control.controls[idd].value.id
    //       this.notifierService.notify(
    //         "success",
    //         "Successfully uploaded the file"
    //       );
    //     },
    //     (err) => {
    //       this.notifierService.notify(
    //         "error",
    //         err.error.innererror.errordetails[0].message
    //       );
    //     }
    //   );
    this.vatService
      .attachmentSubmit(this.returnId, "ZE01", filename, frmData)
      .subscribe(
        (res) => {
          console.log("res");
          control.controls[idd]["controls"].name.setValue(filename);
          control.controls[idd]["controls"].flag.setValue(true);
          control.controls[idd]["controls"].url.setValue(res["d"]["DocUrl"]);
          control.controls[idd]["controls"].did.setValue(res["d"]["Doguid"]);
          console.log("sdas", control.controls[idd]);
          // this.notifierService.notify(
          //   "success",
          //   "Successfully uploaded the file"
          // );
        },
        (err) => {
          this.notifierService.notify("error", "Error while uploading file");
        }
      );
  }

  deleteFile(ind) {
    // this.dynamicRow[ind].upload = false;
    this.myFiles.splice(ind, 1);
  }

  deleteAttachmentFromSer(val1, val2) {
    this.vatService.deleteAttachment("ZE01", val2).subscribe((res) => {
      console.log("delere", res);
    });
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

  sub1() {
    console.log("the", this.crdDType);

    let control = <FormArray>this.exciseFormGroup.controls.doc;
    let val = control.value;
    let ind = [];
    let cnt = 0;
    for (var i = 0; i < val.length; i++) {
      if (val[i].id === "") {
        cnt++;
        this.crnErr = true;
      }
    }
    if (cnt === 0) {
      this.crnErr = false;
    }

    // this.crdSet.forEach((element) => {
    //   if (element.flag) this.crnErr = false;
    // });

    if (this.ibnList.length > 0) {
      this.ibnList.forEach((i) => {
        if (i.flag) {
          let obj = {
            id: i.id,
            iban: i.ibn,
            name: i.name,
          };
          this.newIban.push(obj);
        }
      });
      this.ibanCode = this.ibnList[0].ibn.substring(0, 9);
      this.ibnErr1 = false;
    } else {
      this.ibnErr1 = true;
    }

    if (this.ibnErr1 || this.crnErr) {
    } else {
      this.next();
    }
  }

  sub2() {
    if (this.exType === "") {
      this.exTypeErr = true;
    } else {
      this.exTypeErr = false;
    }

    this.goodsTypeList1 = [];
    this.gTypeErr = true;
    this.goodsTypeList.forEach((e) => {
      if (e.selected) {
        this.gTypeErr = false;
        this.goodsTypeList1.push(e);
      }
    });

    if (this.exTypeErr || this.gTypeErr) {
    } else {
      this.next();
    }
  }

  sub3() {
    let obj1 = {
      day: new Date().getDate(),
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
    };
    console.log("ress", this.exciseObj);
    this.ibnList.forEach((item) => {
      if (item.flag) this.exciseObj["Iban"] = item.ibn;
    });

    this.exciseObj["Type"] = this.exciseFormGroup3.value.Type;
    if (this.exciseFormGroup3.value.Type === "ZS0003")
      this.exciseObj["Idnumber"] = this.exciseFormGroup3.value.Idnumber;
    else this.exciseObj["Idnumber"] = this.idnumber;
    this.exciseObj["Decname"] = this.exciseFormGroup3.value.Decname;
    this.exciseObj["Decdesignation"] = this.exciseFormGroup3.value.Owner;
    this.exciseObj["Decdate"] = this.commonValid.changeDate(obj1);
    this.exciseObj["ExcActvt"] = this.exType;
    // this.exciseObj["AgrFg"] = "1";
    let data = [];
    for (var j = 0; j < this.goodsTypeList1.length; j++) {
      let obj = {
        __metadata: {
          id:
            "https://sapgatewayqa.gazt.gov.sa/sap/opu/odata/SAP/ZDP_ERNW_SRV/GOODTYPESSet(GdtyDelimitDtC='',LineNo=0)",
          uri:
            "https://sapgatewayqa.gazt.gov.sa/sap/opu/odata/SAP/ZDP_ERNW_SRV/GOODTYPESSet(GdtyDelimitDtC='',LineNo=0)",
          type: "ZDP_ERNW_SRV.GOODTYPES",
        },
        GdtyDelimitDt: null,
        GdtyDelimitFg: "0",
        GdtyDelimitDtC: "H",
        Mandt: "",
        FormGuid: "",
        GdtyChgFg: "",
        DataVersion: "00000",
        LineNo: 0,
        RankingOrder: "00",
        GoodsTyp: this.goodsTypeList1[j]["GoodsTyp"],
        GoodsTxt: this.goodsTypeList1[j]["GoodsTxt"],
      };
      // if (
      //   this.exciseObj["GOODTYPESSet"]["results"][i]["GoodsTyp"] ===
      //   this.goodsTypeList1[j]["GoodsTyp"]
      // ) {
      //   this.exciseObj["GOODTYPESSet"]["results"][i]["LineNo"] = 0;

      // }
      data.push(obj);
      console.log(this.gftype, data);
    }

    this.gftype = data;
    console.log(this.gftype, data);

    let data2 = [];
    this.crdSet.forEach((element) => {
      if (element.flag) {
        let obj = {
          CrActFg: "",
          CrChgFg: "",
          CrDeliFg: "0",
          CrFrmDt: null,
          CrFrmDtC: "G",
          CrNm: element.CrNm,
          CrNo: element.CrNo,
          DataVersion: "",
          FormGuid: "",
          LineNo: 0,
          RankingOrder: "",
        };
        data2.push(obj);
      }
    });
    this.exciseObj["CRDTLSet"]["results"] = data2;

    if (this.agr) {
      this.exciseObj["Decfg"] = "1";
    }

    this.tWar
      ? (this.exciseObj["ExcWhFlg"] = "1")
      : (this.exciseObj["ExcWhFlg"] = "0");
    console.log("value", this.exciseObj, this.goodsTypeList);
    this.submitExciseData();
  }

  getTermsAndCondition() {
    this.vatService.getVatTermsAndConditions().subscribe(
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

  resetvat() {
    this.id1 = "";
    this.dob1 = undefined;
    this.exciseFormGroup3.controls["Idnumber"].setValue("");
  }

  resetIban() {
    this.ibn = "";
    this.numErr = true;
    this.ibanErr = "";
    this.ibnErrMsg2 = "";
    this.formz.controls["ibn"].setValue("");
  }
  submitExciseData() {
    this.exciseObj["GOODTYPESSet"]["results"] = this.gftype;

    //this.exciseObj["CRDTLSet"]["results"] = this.crdDType;
    this.exciseObj["Operationz"] = "01";
    console.log("cxcxcx", this.exciseObj);
    this.exciseService.submitExciseData(this.exciseObj).subscribe(
      (data) => {
        console.log(":: POST Response :: ", data);
        this.sub = true;
        this.postResponse = data["d"];
        // this.fileURL =
        //   this.baseUrl +
        //   "sap/opu/odata/SAP/Z_GET_ACK_LETTER_SRV/Ack_letterSet(Fbnum='" +
        //   this.postResponse["Fbnumz"] +
        //   "')/$value";
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
  deleteIban() {
    this.ibnList.pop();
  }

  setData(value) {
    this.exType = value["ExcActvt"];
    this.exciseObj["ExcWhFlg"] === "1"
      ? (this.tWar = true)
      : (this.tWar = false);
    this.exciseFormGroup = this._formBuilder.group({
      doc: this._formBuilder.array([]),
      acc: this._formBuilder.array([]),
    });

    let cObj = {
      q1: false,
      q2: false,
    };
    if (value["AgrFg"] === "1") {
      cObj.q1 = true;
    }
    if (value["Decfg"] === "1") {
      cObj.q2 = true;
    }
    let idname = "";
    if (value["Type"] === "ZS0001") {
      idname = "National ID";
      this.flags = true;
    }
    if (value["Type"] === "ZS0002") {
      idname = "Iqama ID";
      this.flags = true;
    }
    if (value["Type"] === "ZS0003") {
      idname = "GCC ID";
      this.flags = false;
    }

    let d = this.commonValid.getDateFormated(value["Decdate"]);
    console.log("date");
    this.exciseFormGroup3 = this._formBuilder.group({
      Type: [value["Type"], Validators.required],
      Idnumber: [
        value["Idnumber"],
        [
          Validators.required,
          Validators.minLength(7),
          Validators.pattern(this.pattern),
        ],
      ],
      Owner: [
        value["Decdesignation"],
        [Validators.required, Validators.pattern(this.pattern2)],
      ],
      Decname: [
        value["Decname"],
        [Validators.required, Validators.pattern(this.pattern2)],
      ],
      Decdate: [this.enddate, Validators.required],
      AgrFg: cObj.q1,
      Decfg: cObj.q2,
    });
    this.goodsTypeSet = this.exciseObj["GOODTYPESSet"]["results"];
    this.goodsTypeList.filter((item) => {
      this.goodsTypeSet.forEach((type) => {
        if (item["GoodsTyp"] === type["GoodsTyp"]) {
          item["selected"] = true;
        }
      });
    });
    this.setIban(value["Iban"]);
    this.setAttachment(value["CRDTLSet"]["results"]);
    this.mapcrn("", "");
  }

  setAttachment(value) {
    let control = <FormArray>this.exciseFormGroup.controls.doc;
    for (var i = 0; i < value.length; i++) {
      control.push(
        this._formBuilder.group({
          id: value[i].CrNo,
          name: "",
          url: "",
          flag: true,
          did: "",
        })
      );
    }
    console.log("crd", control.value);
  }

  setIban(value) {
    this.iban = value;
    let lastFiveChars = "...." + this.iban.substr(-4);
    let bankCode = this.iban.substr(4, 2);

    this.exciseService.getBankLogo(bankCode).subscribe(
      (res) => {
        let img =
          "data:image/svg+xml;base64," + res["d"]["results"][0]["LogoBid"];
        let name = res["d"]["results"][0]["Descr"];
        let obj = {
          id: lastFiveChars,
          ibn: this.iban,
          flag: true,
          name: name,
          img: this.transform(img),
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
  }

  transform(val) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(val);
  }
  resetIDErrors() {
    this.idErr1 = false;
    this.idMsg = "";
    this.dobErr = false;
    this.dobMsg = "";
  }
  resetErrors() {
    this.ibanErr = "";
    this.ibnErrMsg2 = "";
  }
  validateDecname(val) {
    if (val.value !== "" && this.pattern2.match(val.value) !== null) {
      this.exciseFormGroup3.controls.Decname.errors.pattern = true;
    } else {
      this.exciseFormGroup3.controls.Decname.errors.pattern = false;
    }
  }
  validateDecDesig(val) {
    if (val.value !== "" && this.pattern2.match(val.value) !== null) {
      this.exciseFormGroup3.controls.Owner.errors.pattern = true;
    } else {
      this.exciseFormGroup3.controls.Owner.errors.pattern = false;
    }
  }

  backto(id) {
    this.appSrv.updatedDataSelection9(id);
    this.router.navigate(["/mains/tax"]);
  }
}
