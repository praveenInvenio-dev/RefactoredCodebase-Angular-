import { Component, OnInit, Output } from "@angular/core";
import { Router } from "@angular/router";
import { VATConstants } from "src/app/constants/VATConstants";
import { constants } from "src/app/constants/constants.model";
import { TinDeregistrationService } from "src/app/services/tin-deregistration.service";
import { CommonValidation } from "src/app/constants/commonValidations";
import { CalendarComponent } from "src/app/constants/calendar.component";
import { AppService } from "src/app/app.service";
import { NotifierService } from "angular-notifier";
import { VatServiceService } from "src/app/services/vat-service.service";
import { element, EventEmitter } from "protractor";
import { permitDeregLabels } from "../permit-deregistration/permit-deregistration.constants";
import * as FileSaver from "file-saver";
import { AuthorizeConstants } from "src/app/constants/AuthorizationConstants";
import { SignupService } from "src/app/services/signup.service";
declare var $: any;
@Component({
  selector: "app-tin-deregistration",
  templateUrl: "./tin-deregistration.component.html",
  styleUrls: ["./tin-deregistration.component.css"],
})
export class TinDeregistrationComponent implements OnInit {
  //Variables
  headerComponent = CalendarComponent;

  tinDeregDto = new TinDeregDTO();
  menu: any;
  optionActive: number = 1;
  defaultValue: number = 1;
  showOne: boolean = false;
  showTwo: boolean = false;
  currentTab: any;
  lang: any;
  tin: string;
  reasonList: any;
  dir: string;
  reaList = [];
  reaList2 = [];
  outList = [];
  nameErr1: boolean = false;
  pMsg: string;
  idTypes = [];
  idErr: boolean = false;
  idMsg: any;
  IDErrz: any;
  nameErr2: boolean = false;
  fnMsg: string;
  nameErr3: boolean = false;
  gfMsg: string;
  faMsg: string;
  nameErr4: boolean = false;
  drMsg: string;
  nameErr5: any;
  codes: any;
  indErr: any;
  // cncode = "966";
  maxLength = 10;
  maxLength1 = 10;
  nameErr8: boolean = false;
  mbMsg: any;
  nameErr6: any;
  nsMsg: string;
  nameErr7: boolean = false;
  dsgMsg: string;
  activeOutlet = 0;
  files = [];
  myFiles = [];
  fileNames = [];
  tinDeregdata: any;
  nameErr9: boolean = false;
  tinMsg: any;
  tinValue: boolean = false;
  idValue: boolean = false;
  panelOpenState = false;
  panelOpenState1 = false;

  deregReasons = [
    {
      key: "1",
      text: "Closed",
      text1: "إغلاق",
    },
    {
      key: "3",
      text: "Transfer",
      text1: "نقل",
    },
  ];

  permitTypes = [
    {
      key: "BUP002",
      text: "CR Number",
      text1: "رقم السجل التجاري",
    },
    {
      key: "ZS0004",
      text: "License Number",
      text1: "رقم الرخصة",
    },
    {
      key: "ZS0007",
      text: "Contract",
      text1: "Contract",
    },
  ];

  vfromDate: string;
  dobValue: any;
  deregdateValue: string;
  returnId: any;
  outletData: any;
  activeOutlet1: any;
  permitSet = [];
  activeLicense = 0;
  showReason: boolean = false;
  tinErr = [];
  idsErr = [];
  idssErr = [];
  tinsErr = [];
  deregDateErr: boolean = false;
  derehMsg: string;
  deregDateErr1: boolean = false;
  idTypeErr: boolean = false;
  idTypeMsg: string;
  dobErr: boolean = false;
  dobMsg: string;
  fNameErr: boolean = false;
  fNameMsg: string;
  lNameMsg: string;
  lNameErr: boolean = false;
  idTypeErr1: boolean = false;
  dobErr1: boolean = false;
  idErr1: boolean = false;
  deregDateErr11: boolean = false;
  fNameErr1: boolean = false;
  lNameErr1: boolean = false;
  idTypeErr1Arr = [];
  deregDateErr11Arr = [];
  idErr1Arr = [];
  dobErr1Arr = [];
  lNameErr1Arr = [];
  fNameErr1Arr = [];

  idTypeErr2Arr = [];
  deregDateErr12Arr = [];
  idErr2Arr = [];
  dobErr2Arr = [];
  lNameErr2Arr = [];
  fNameErr2Arr = [];
  outletNumErr = [];
  attachArray = [];
  licenseAtt = false;
  fileList = [];
  filez = [];
  attchId = 0;
  transferAtch = false;
  name11Msg: string;
  nameErr11: boolean = false;
  nameErr12: boolean = false;
  nameErr13: boolean = false;
  name12Msg: string;
  name13Msg: string;
  errCounter = 0;
  deRegErr: boolean = false;
  derehMsg1 = "";
  deregErr11Arr = [];
  docType: string;
  show: boolean = false;
  name: any;
  no: any;
  ackDate: Date;
  crAtt: boolean;
  resText: any;
  res1: string;
  res2: number;
  apprv: string = "";
  rejx: string = "";
  tinDeregdata1: any;
  authErr: any;
  reaList22 = [];
  contrct: boolean;
  disableValue: boolean;
  disableErr = [];
  disableErr1 = [];
  FNameErr: boolean;
  FNameMsg: any;
  nameErr55: boolean;
  GNameErr: boolean;
  GNameMsg: any;
  nameErr555: boolean;
  FamNameErr: boolean;
  FamNameMsg: any;
  outletActiveNum = [];
  attchTile: any;
  nameErr133: boolean;
  name133Msg: any;
  displayErr: boolean;
  disableMsg: any;
  tinExist: boolean;
  tinType = 0;
  tinExists = [];
  tinExistss = [];

  constructor(
    private router: Router,
    public tinService: TinDeregistrationService,
    public commonVaidation: CommonValidation,
    public appSrv: AppService,
    public notifierService: NotifierService,
    public vatService: VatServiceService,
    public signupService: SignupService
  ) {}

  ngOnInit(): void {
    this.ackDate = new Date();

    if (localStorage.getItem("lang") === "ar") {
      this.dir = constants.langz.arb.dir;
      this.menu = VATConstants.tinDeregistrationArb;
      this.lang = constants.langz.arb.tinDereg;
      this.tin = localStorage.getItem("gpart");
      this.reaList = VATConstants.deregReasonsArb;
      this.reaList22 = VATConstants.deregReasons2;
      this.reaList2 = [];
      this.outList = VATConstants.deregReasons2Arb;
      this.idTypes = permitDeregLabels.langz.arb.idTypes;
      this.IDErrz = constants.langz.arb.vatError;
      this.indErr = constants.langz.arb.individual.indErr;
      this.authErr = AuthorizeConstants.langz.arb.authErrors;
    } else {
      this.dir = constants.langz.eng.dir;
      this.menu = VATConstants.tinDeregistrationEng;
      this.lang = constants.langz.eng.tinDereg;
      this.tin = localStorage.getItem("gpart");
      this.reaList = VATConstants.deregReasons;
      this.reaList22 = VATConstants.deregReasons2;
      this.reaList2 = [];
      this.outList = VATConstants.deregReasons2;
      this.idTypes = permitDeregLabels.langz.eng.idTypes;
      this.IDErrz = constants.langz.eng.vatError;
      this.indErr = constants.langz.eng.individual.indErr;
      this.authErr = AuthorizeConstants.langz.eng.authErrors;
    }

    this.optionActive = 1;

    for (var i = 0; i < 6; i++) {
      let obj = {
        at: [],
      };
      this.filez.push(obj);
    }
    //this.tinDeregDto.deregDate = null;
    this.appSrv.getPhoneCode().subscribe((res) => {
      this.codes = res["d"]["results"];
      this.codes.forEach((item) => {
        item["maxLength"] = 12 - item.Telefto.length;
      });
    });

    this.getReasons();
    this.getTinDeregData();

    for (var i = 0; i < 6; i++) {
      let obj = {
        name: "",
        size: 0,
      };
      this.files.push(obj);
    }
  }

  getReasons() {
    this.tinService.getReasons(this.tin).subscribe((res) => {
      this.reasonList = res["d"]["REASONSet"]["results"];
      this.reasonList.shift();
      let cnt = 0;
      this.reasonList.forEach((element) => {
        if (element.ReasonCd === "9") cnt++;
      });
      if (cnt > 0) this.reasonList.pop();
    });
  }

  getTinDeregData() {
    this.tinService.getDetails(1, this.tin, this.apprv, this.rejx).subscribe(
      (res) => {
        console.log("res", res);

        this.tinDeregdata = res["d"];

        if (
          this.tinDeregdata.ABpKind === "305A" ||
          this.tinDeregdata.ABpKind === "305B" ||
          this.tinDeregdata.ABpKind === "305C"
        ) {
          this.tinType = 1;
        }

        if (
          this.tinDeregdata.ABpKind === "304A" ||
          this.tinDeregdata.ABpKind === "304B" ||
          this.tinDeregdata.ABpKind === "304C"
        ) {
          this.tinType = 2;
        }

        this.tinDeregdata1 = res["d"];
        this.returnId = this.tinDeregdata["CaseGuid"];

        this.setTinData();
        if (
          this.tinDeregdata.Status === "IP011" ||
          this.tinDeregdata.Status === "E0018"
        )
          this.setDataAftRejection(this.tinDeregdata);
        if (this.tinDeregDto.outlet.length > 0) {
          this.outletNumErr = [];

          this.tinDeregDto.outlet.forEach((it1, i) => {
            let outletErr = {
              outletNo: 0,
              permitArr: [],
              permitList: [],
            };
            outletErr.outletNo = i;

            it1.permit.forEach((it2, j) => {
              console.log(j);
              for (var k = 0; k < 8; k++) {
                outletErr.permitList.push(false);
              }
              outletErr.permitArr.push(outletErr.permitList);
              outletErr.permitList = [];
            });
            this.outletNumErr.push(outletErr);
          });
        }
        this.filterDeregDate();
        console.log("this.outletNumErr", this.tinDeregDto, this.outletNumErr);
      },
      (err) => {
        if (err.error.error.innererror.errordetails[0].code === "ZD_DREG/112") {
          this.res1 = err.error.error.innererror.errordetails[0].message;
          this.res2 = 1;
          $("#attch1").modal("show");
        } else if (
          err.error.error.innererror.errordetails[0].code === "ZD_DREG/206"
        ) {
          if (this.dir !== "rtl") {
            this.res1 =
              "Dear Taxpayer, you have a Registration Change Application saved in draft mode, do you want to discard it and proceed for Deregistration Application?";
          } else {
            this.res1 =
              "عزيزي المكلف, يوجد لديك طلب تغيير تسجيل محفوظ كمسودة, هل تريد حذفه وإكمال طلب ايقاف التسجيل؟";
          }
          //this.res1 = err.error.error.innererror.errordetails[0].message;
          this.res2 = 2;
          $("#attch1").modal("show");
        } else {
          this.res1 = err.error.error.innererror.errordetails[0].message;
          this.res2 = 3;
          $("#attch1").modal("show");
        }
      }
    );
  }

  reloadApi() {
    if (this.res2 === 1) {
      this.apprv = "X";
      this.rejx = "";
    } else {
      this.apprv = "";
      this.rejx = "X";
    }
    this.getTinDeregData();
  }

  ackDownload() {
    this.vatService.getAckDownload(this.no).subscribe(
      (res: any) => {
        // console.log("res", res);
        let filename;
        if (this.dir === "rtl") {
          filename = "إعتراف";
        } else {
          filename = "acknowledgment";
        }
        FileSaver.saveAs(res, this.no + ".pdf");
      },
      (err) => {
        this.notifierService.notify(
          "error",
          err.error.error.innererror.errordetails[0].message
        );
      }
    );
  }

  goto() {
    this.router.navigate(["mains/zakat-deregister"]);
  }

  attachment() {
    let obj = {
      title: "",
      value: "",
    };

    if (this.tinDeregDto.reason === "2") {
      obj.title = this.lang.c3.t1;
      obj.value = "DR02";
    }

    if (this.tinDeregDto.reason === "8") {
      obj.title = this.lang.c3.t14;
      obj.value = "DR06";
    }

    if (this.tinDeregDto.reason === "3") {
      obj.title = this.lang.c3.t9;
      obj.value = "DR01";
    }

    if (this.tinDeregDto.reason === "4") {
      obj.title = this.lang.c3.t10;
      obj.value = "DR05";
    }

    if (this.tinDeregDto.reason === "1") {
      obj.title = this.lang.c3.t11;
      obj.value = "DR03";
      this.contrct = true;
    }

    if (this.tinDeregDto.reason === "7") {
      obj.title = this.lang.c3.t15;
      obj.value = "DR09";
    }

    if (this.tinDeregDto.reason === "5") {
      obj.title = this.lang.c3.t12;
      obj.value = "DR04";
    }

    this.attachArray = [];
    this.attachArray.push(obj);
    let cnt = 0;
    let cnt23 = 0;
    this.permitSet.forEach((ele) => {
      if (ele.APermitTypeTb === "ZS0004") cnt++;
      if (ele.APermitTypeTb === "BUP002") cnt23++;
    });
    if (cnt > 0) {
      this.licenseAtt = true;
    }
    if (cnt23 > 0) {
      this.crAtt = true;
    }
    let cntt = 0;
    this.tinDeregDto.outlet.forEach((item) => {
      if (item.deregReason === "3") {
        cntt++;
      }
      item.permit.forEach((ele) => {
        if (ele.deregReason === "3") {
          cntt++;
        }
      });
    });

    if (cntt > 0 || this.tinDeregDto.deregReason === "3") {
      this.transferAtch = true;
    }
    this.NextStep(3);
  }

  setTinData() {
    let resason = this.tinDeregDto.reason;
    let activeOption = this.tinDeregDto.activeOutlet;
    this.tinDeregDto = new TinDeregDTO();
    this.tinDeregDto.reason = resason;
    this.tinDeregDto.activeOutlet = activeOption;
    this.permitSet = this.tinDeregdata["PermitSet"].results;
    if (this.tinDeregdata["PermitSet"].results.length > 0) {
      this.tinDeregDto.pNumber = this.tinDeregdata["PermitSet"].results[0][
        "APermitNoTb"
      ];
      this.tinDeregDto.pType = this.tinDeregdata["PermitSet"].results[0][
        "APermitTypeTb"
      ];
      let dd = new Date(
        this.tinDeregdata["PermitSet"].results[0]["APermitValfrDtHTb"]
      );
      if (
        this.tinDeregdata["PermitSet"].results[0]["APermitValfrDtTb"] !== null
      ) {
        let d = this.commonVaidation.getDateFormated(
          this.tinDeregdata["PermitSet"].results[0]["APermitValfrDtTb"]
        );

        if (dd.getFullYear() < 1900) {
          d.setDate(d.getDate() + 1);
          this.vfromDate = this.commonVaidation.getArabicFormat(dd);
          this.tinDeregDto.vFrom = this.commonVaidation.dateFormate(
            this.commonVaidation.toJulianDate1(new Date(d)),
            "Islamic"
          );
        } else {
          // d.setDate(d.getDate() + 1);
          this.vfromDate = this.commonVaidation.getEnglishFormat(d);
          this.tinDeregDto.vFrom = this.commonVaidation.toJulianDate1(
            new Date(d)
          );
        }
      }

      console.log(this.vfromDate);
    }

    this.outletData = this.tinDeregdata["OutletSet"].results;
    this.tinDeregDto.outlet = [];

    if (this.tinDeregdata["OutletSet"].results.length > 0) {
      this.tinDeregDto.outletNum = this.tinDeregdata["OutletSet"].results[0][
        "AOutletNoTb"
      ];
      this.tinDeregDto.crNum = this.tinDeregdata["OutletSet"].results[0][
        "AOutletIdentificationNoTb"
      ];
      this.tinDeregDto.crName = this.tinDeregdata["OutletSet"].results[0][
        "AOutletNameTb"
      ];
      this.tinDeregDto.address = this.tinDeregdata["OutletSet"].results[0][
        "AOutletCompAddr"
      ];
      // this.tinDeregDto.deregReason = this.tinDeregdata["OutletSet"].results[0][
      //   "APermitDregRsnTb"
      // ];
      // this.tinDeregDto.deregDate = new Date(
      //   this.tinDeregdata["OutletSet"].results[0]["APermitEffDtHTb"]
      // );
    }

    for (var i = 0; i < this.tinDeregdata["OutletSet"].results.length; i++) {
      this.tinDeregDto.outlet.push(new OutletDto());
    }

    this.tinDeregdata["OutletSet"].results.forEach((element) => {
      this.tinDeregDto.outlet.forEach((item) => {
        item["outletname"] = element.AOutletNoTb;
      });
    });

    for (var i = 0; i < this.tinDeregdata["OutletSet"].results.length; i++) {
      let cnt = 0;

      for (var j = 0; j < this.permitSet.length; j++) {
        if (
          this.permitSet[j].APermitOutletnoTb ===
          this.tinDeregdata["OutletSet"].results[i]["AOutletNoTb"]
        ) {
          cnt++;
        }
      }

      this.tinDeregDto.outlet[i]["permitCount"] = cnt;
      this.tinDeregDto.outlet[i]["outletNum"] = this.tinDeregdata[
        "OutletSet"
      ].results[i]["AOutletNoTb"];
      this.tinDeregDto.outlet[i]["address"] = this.tinDeregdata[
        "OutletSet"
      ].results[i]["AOutletCompAddr"];
      this.tinDeregDto.outlet[i].permit = [];
      for (var k = 0; k < cnt; k++) {
        this.tinDeregDto.outlet[i].permit.push(new PermitDto());
      }
      let permitx = this.permitSet.filter(
        (x) =>
          x.APermitOutletnoTb ===
          this.tinDeregdata["OutletSet"].results[i]["AOutletNoTb"]
      );
      console.log("permit", permitx);
      for (var p = 0; p < permitx.length; p++) {
        this.tinDeregDto.outlet[i].permit[p].pType = permitx[p].APermitTypeTb;
        this.tinDeregDto.outlet[i].permit[p].pNumber = permitx[p].APermitNoTb;
        let dd = new Date(permitx[p]["APermitValfrDtHTb"]);

        if (permitx[p]["APermitValfrDtTb"] !== null) {
          let d = this.commonVaidation.getDateFormated(
            permitx[p]["APermitValfrDtTb"]
          );

          if (dd.getFullYear() < 1900) {
            d.setDate(d.getDate());
            this.vfromDate = this.commonVaidation.getArabicFormat(dd);
            this.tinDeregDto.outlet[i].permit[
              p
            ].vFrom = this.commonVaidation.dateFormate(
              this.commonVaidation.toJulianDate1(new Date(d)),
              "Islamic"
            );
          } else {
            // d.setDate(d.getDate() + 1);
            this.vfromDate = this.commonVaidation.getEnglishFormat(d);
            this.tinDeregDto.outlet[i].permit[
              p
            ].vFrom = this.commonVaidation.toJulianDate1(new Date(d));
          }
        }

        this.disableErr = [];
        for (var k = 0; k < this.tinDeregDto.outlet.length; k++) {
          let obj = {
            idtype: false,
            gf: false,
            famn: false,
            fn: false,
          };
          this.disableErr.push(obj);
        }
        this.disableErr1 = [];
        for (var k = 0; k < this.tinDeregDto.outlet[i].permit.length; k++) {
          let obj = {
            idtype: false,
            gf: false,
            famn: false,
            fn: false,
          };
          this.disableErr1.push(obj);
        }
      }
    }
  }

  resetPermits() {
    let permitx = this.permitSet.filter(
      (x) =>
        x.APermitOutletnoTb ===
        this.tinDeregdata["OutletSet"].results[i]["AOutletNoTb"]
    );
    for (var i = 0; i < this.tinDeregdata["OutletSet"].results.length; i++) {
      for (var p = 0; p < permitx.length; p++) {
        this.tinDeregDto.outlet[i].permit[p].pType = permitx[p].APermitTypeTb;
        this.tinDeregDto.outlet[i].permit[p].pNumber = permitx[p].APermitNoTb;
        let dd = new Date(permitx[p]["APermitValfrDtHTb"]);
        let d = this.commonVaidation.getDateFormated(
          permitx[p]["APermitValfrDtTb"]
        );

        if (dd.getFullYear() < 1900) {
          d.setDate(d.getDate());
          this.vfromDate = this.commonVaidation.getArabicFormat(dd);
          this.tinDeregDto.outlet[i].permit[
            p
          ].vFrom = this.commonVaidation.dateFormate(
            this.commonVaidation.toJulianDate1(new Date(d)),
            "Islamic"
          );
        } else {
          // d.setDate(d.getDate() + 1);
          this.vfromDate = this.commonVaidation.getEnglishFormat(d);
          this.tinDeregDto.outlet[i].permit[
            p
          ].vFrom = this.commonVaidation.toJulianDate1(new Date(d));
        }
      }
    }
  }

  getUserByTin(val, id, i, j) {
    console.log(
      this.idTypeErr1Arr,
      this.idsErr,
      this.dobErr1Arr,
      this.fNameErr1Arr,
      this.lNameErr1Arr
    );
    if (val.tin == "") {
      this.nameErr9 = false;
      // this.tinMsg = 'BS'
      return;
    }
    if (val.tin !== "") {
      this.tinExist = true;
      if (id === 2) this.tinExists[i] = true;
      if (id === 3) this.tinExistss[j] = true;
    } else {
      this.tinExist = false;
      if (id === 2) this.tinExists[i] = false;
      if (id === 3) this.tinExistss[j] = true;
    }

    if (localStorage.getItem("gpart") == val.tin) {
      this.nameErr9 = true;
      this.tinMsg = this.lang.err.e6;
      return;
    }

    let first = val.tin.substr(0, 1);
    if (!this.commonVaidation.isNumber(val.tin)) {
      this.nameErr9 = true;
      this.tinMsg = this.authErr.tinError4;
    } else if (first !== "3") {
      this.nameErr9 = true;
      this.tinMsg = this.lang.err.e21;
    } else {
      if (val.tin.length === 10) {
        this.nameErr9 = false;
        this.vatService.getUserByTin(val.tin).subscribe(
          (res) => {
            this.tinValue = true;
            console.log("bytin", res["d"]);
            let data = res["d"];
            let proceed = false;

            if (this.tinType === 1) {
              if (
                res["d"]["Bpkind"] === "305A" ||
                res["d"]["Bpkind"] === "305B" ||
                res["d"]["Bpkind"] === "305C"
              ) {
                proceed = true;
              } else {
                proceed = false;
                this.nameErr9 = true;
                this.tinMsg = this.lang.err.govErr;
                return;
              }
            }

            if (this.tinType === 2) {
              if (
                res["d"]["Bpkind"] === "304A" ||
                res["d"]["Bpkind"] === "304B" ||
                res["d"]["Bpkind"] === "304C"
              ) {
                proceed = true;
              } else {
                proceed = false;
                this.nameErr9 = true;
                this.tinMsg = this.lang.err.conErr;
                if (id === 1) this.tinDeregDto.tin = "";
                if (id === 2) this.tinDeregDto.outlet[i].tin = "";
                if (id === 3) this.tinDeregDto.outlet[i].permit[j].tin = "";
                return;
              }
            }

            if (!proceed) {
              let d;
              if (data["Birthdt"] !== null)
                d = this.commonVaidation.getDateFormated(data["Birthdt"]);
              if (id === 1) {
                this.tinDeregDto.idType = data["Idtype"];
                this.tinDeregDto.idNumber = data["Idnum"];
                this.tinDeregDto.name = data["Name1"];
                this.tinDeregDto.surname = data["Name2"];
                if (this.tinDeregDto.idType !== "ZS0005") {
                  this.tinDeregDto.fName = data["FatherName"];
                  this.tinDeregDto.gfName = data["GrandfatherName"];
                  this.tinDeregDto.famName = data["FamilyName"];
                  if (d.getFullYear() < 1900) {
                    this.tinDeregDto.dob = this.commonVaidation.dateFormate(
                      this.commonVaidation.toJulianDate1(new Date(d)),
                      "Islamic"
                    );
                  } else {
                    this.tinDeregDto.dob = this.commonVaidation.toJulianDate1(
                      new Date(d)
                    );
                  }
                }
                this.reset1();
              }
              if (id === 2) {
                this.tinDeregDto.outlet[i].idType = data["Idtype"];
                this.tinDeregDto.outlet[i].idNumber = data["Idnum"];
                this.tinDeregDto.outlet[i].name = data["Name1"];
                this.tinDeregDto.outlet[i].surname = data["Name2"];

                if (this.tinDeregDto.outlet[i].idType !== "ZS0005") {
                  this.tinDeregDto.outlet[i].fName = data["FatherName"];
                  this.tinDeregDto.outlet[i].gfName = data["GrandfatherName"];

                  this.tinDeregDto.outlet[i].famName = data["FamilyName"];
                  //d.setDate(d.getDate());
                  if (d.getFullYear() < 1900) {
                    this.tinDeregDto.outlet[
                      i
                    ].dob = this.commonVaidation.dateFormate(
                      this.commonVaidation.toJulianDate1(new Date(d)),
                      "Islamic"
                    );
                  } else {
                    this.tinDeregDto.outlet[
                      i
                    ].dob = this.commonVaidation.toJulianDate1(new Date(d));
                  }
                }
                this.reset2(i);
              }
              if (id === 3) {
                this.tinDeregDto.outlet[i].permit[j].idType = data["Idtype"];
                this.tinDeregDto.outlet[i].permit[j].idNumber = data["Idnum"];
                this.tinDeregDto.outlet[i].permit[j].surname = data["Name2"];
                this.tinDeregDto.outlet[i].permit[j].name = data["Name1"];
                if (this.tinDeregDto.outlet[i].permit[j].idType !== "ZS0005") {
                  this.tinDeregDto.outlet[i].permit[j].fName =
                    data["FatherName"];
                  this.tinDeregDto.outlet[i].permit[j].gfName =
                    data["GrandfatherName"];

                  this.tinDeregDto.outlet[i].permit[j].famName =
                    data["FamilyName"];

                  //d.setDate(d.getDate());
                  if (d.getFullYear() < 1900) {
                    this.tinDeregDto.outlet[i].permit[
                      j
                    ].dob = this.commonVaidation.dateFormate(
                      this.commonVaidation.toJulianDate1(new Date(d)),
                      "Islamic"
                    );
                  } else {
                    this.tinDeregDto.outlet[i].permit[
                      j
                    ].dob = this.commonVaidation.toJulianDate1(new Date(d));
                  }
                }
                this.reset3(i, j);
              }
            }
          },
          (err) => {
            this.notifierService.notify(
              "error",
              err.error.error.innererror.errordetails[0].message
            );
          }
        );
      } else {
        this.nameErr9 = true;
        this.tinMsg = this.lang.err.e22;
      }
    }

    if (id === 2) {
      this.tinErr[i] = this.nameErr9;
    }
    if (id === 3) {
      this.outletNumErr[i].permitArr[j][6] = this.nameErr9;
    }
  }

  getUserValidated(value, ids, i, j) {
    let id = "ZS0015";
    let d;
    let currentdate = "";
    let obj3 = {
      type: value.idType,
      idNumber: value.idNumber,
    };
    if (value.dob !== null) {
      d = value.dob["calendarStart"];
      if (d.day < 10) {
        d.day = d.day;
      }
      if (d.month < 10) {
        d.month = d.month;
      }
      let day = "";
      let mnth = "";
      if (d.day < 10) day = "0" + d.day;
      else day = d.day;
      if (d.month < 10) mnth = "0" + d.month;
      else mnth = d.month;
      currentdate = d.year + "" + mnth + "" + day;
    }
    this.vatService.getUserValidation(obj3, currentdate).subscribe(
      (res) => {
        console.log("res[]", res["d"]);
        let data = res["d"];

        if (ids === 2) {
          this.tinDeregDto.outlet[i].tin = data["Tin"];
          this.tinDeregDto.outlet[i].surname = data["Name2"];
          this.tinDeregDto.outlet[i].name = data["Name1"];
          if (this.tinDeregDto.outlet[i].idType !== "ZS0005") {
            this.tinDeregDto.outlet[i].famName = data["FamilyName"];
            this.tinDeregDto.outlet[i].fName = data["FatherName"];
            this.tinDeregDto.outlet[i].gfName = data["GrandfatherName"];
          }
          this.reset2(i);
        }
        if (ids === 3) {
          this.tinDeregDto.outlet[i].permit[j].tin = data["Tin"];
          this.tinDeregDto.outlet[i].permit[j].name = data["Name1"];
          this.tinDeregDto.outlet[i].permit[j].surname = data["Name2"];

          if (this.tinDeregDto.outlet[i].permit[j].idType !== "ZS0005") {
            this.tinDeregDto.outlet[i].permit[j].fName = data["FatherName"];
            this.tinDeregDto.outlet[i].permit[j].gfName =
              data["GrandfatherName"];
            this.tinDeregDto.outlet[i].permit[j].famName = data["FamilyName"];
          }
          this.reset3(i, j);
        }
        if (ids === 1) {
          this.idValue = true;
          this.tinDeregDto.tin = data["Tin"];
          this.tinDeregDto.name = data["Name1"];
          this.tinDeregDto.surname = data["Name2"];

          if (this.tinDeregDto.idType !== "ZS0005") {
            this.tinDeregDto.fName = data["FatherName"];
            this.tinDeregDto.gfName = data["GrandfatherName"];
            this.tinDeregDto.famName = data["FamilyName"];
          }
          this.reset1();
        }
      },
      (err) => {
        console.log(err.error);
        if (ids === 1) {
          this.tinDeregDto.idNumber = "";
          this.tinDeregDto.dob = null;
        }
        if (ids === 2) {
          this.tinDeregDto.outlet[i].idNumber = "";
          this.tinDeregDto.outlet[i].dob = null;
        }
        if (ids === 3) {
          this.tinDeregDto.outlet[i].permit[j].idNumber = "";
          this.tinDeregDto.outlet[i].permit[j].dob = null;
        }
        this.notifierService.notify(
          "error",
          err.error.error.innererror.errordetails[0].message
        );
      }
    );
  }

  getCompanyValidated(val, id, i, j) {
    if (val !== "") {
      let obj = {
        type: "ZS0005",
        idNumber: val,
      };

      this.signupService.getCompanyValidation(obj).subscribe(
        (res) => {
          console.log("res", res);
          // if (
          //   res["d"]["Bpkind"] === "305A" ||
          //   res["d"]["Bpkind"] === "305B" ||
          //   res["d"]["Bpkind"] === "305C" ||
          //   res["d"]["Bpkind"] === "4" ||
          //   res["d"]["Bpkind"] === ""
          // ) {
          //   if (id === 1) {
          //     this.tinDeregDto.tin = res["d"]["Tin"];
          //     this.tinDeregDto.name = res["d"]["Name1"];
          //     this.tinDeregDto.surname = res["d"]["Name2"];
          //   }
          //   if (id === 2) {
          //     this.tinDeregDto.outlet[i].tin = res["d"]["Tin"];
          //     this.tinDeregDto.outlet[i].name = res["d"]["Name1"];
          //     this.tinDeregDto.outlet[i].surname = res["d"]["Name2"];
          //   }
          //   if (id === 3) {
          //     this.tinDeregDto.outlet[i].permit[j].tin = res["d"]["Tin"];
          //     this.tinDeregDto.outlet[i].permit[j].name = res["d"]["Name1"];
          //     this.tinDeregDto.outlet[i].permit[j].surname = res["d"]["Name2"];
          //   }
          // } else {
          //   let errormsg = "";
          //   this.dir !== "rtl"
          //     ? (errormsg = "Entered ID doesn't match entity type")
          //     : (errormsg = "الرقم المدخل لا يطابق نوع الكيان");
          //   this.notifierService.notify("error", errormsg);
          //   this.tinDeregDto.idNumber = "";
          //   //this.cidErr = true;
          // }
          if (id === 1) {
            this.tinDeregDto.tin = res["d"]["Tin"];
            this.tinDeregDto.name = res["d"]["Name1"];
            this.tinDeregDto.surname = res["d"]["Name2"];
          }
          if (id === 2) {
            this.tinDeregDto.outlet[i].tin = res["d"]["Tin"];
            this.tinDeregDto.outlet[i].name = res["d"]["Name1"];
            this.tinDeregDto.outlet[i].surname = res["d"]["Name2"];
          }
          if (id === 3) {
            this.tinDeregDto.outlet[i].permit[j].tin = res["d"]["Tin"];
            this.tinDeregDto.outlet[i].permit[j].name = res["d"]["Name1"];
            this.tinDeregDto.outlet[i].permit[j].surname = res["d"]["Name2"];
          }
        },
        (err) => {
          //this.cidErr = true;
          //this.governmentDTO.cId = "";
          // if (
          //   err.error.error.innererror?.errordetails[0].code === "ZD_ZREG/304"
          // ) {
          //   this.governmentDTO.cId = "";
          // }
          // if (
          //   err.error.error.innererror?.errordetails[0].code === "ZD_PUSR/069"
          // ) {
          //   this.tinExist = true;
          // } else {
          //   this.tinExist = false;
          // }
          if (id === 1) {
            this.tinDeregDto.idNumber = "";
          }
          if (id === 2) {
            this.tinDeregDto.outlet[i].idNumber = "";
          }
          if (id === 3) {
            this.tinDeregDto.outlet[i].permit[j].idNumber = "";
          }
          this.notifierService.notify(
            "error",
            err.error.error.innererror?.errordetails[0].message
          );
          console.log(err.error);
        }
      );
    }
  }

  NextStep(id) {
    this.currentTab = id;
    this.optionActive = id;
  }

  Back() {
    if (this.optionActive > 1) {
      this.optionActive--;
    } else {
      // this.router.navigate(["mains/zakat-deregister"]);
      window.history.back();
    }
  }

  selectedReason(val, i) {
    this.nameErr13 = false;
    console.log(val, this.outList);
    this.activeOutlet = parseInt(i);
    this.tinDeregDto.activeOutlet = val.name;

    this.reaList.forEach((ele) => {
      ele.name === val.name ? (ele.flag = true) : (ele.flag = false);
    });
  }

  selectMainReasons() {
    // if (this.tinDeregDto.reason === "6") {
    //   this.reaList = this.reaList.filter(
    //     (x) => x.ReasonCd === this.tinDeregDto.reason
    //   );
    // } else {
    //   this.reaList  = VATConstants.deregReasons;
    // }
  }

  selectedReason2(val, i, j) {
    console.log(this.tinDeregDto.outlet, i);

    // if (this.tinDeregDto.outlet[i].activeOutletNum !== 0)
    // this.outletActiveNum.push(j+1)
    if (
      this.outletActiveNum[i] !==
      this.tinDeregDto.outlet[i].activeOutletNum + 1
    ) {
      this.setdata(i);
    }

    this.tinDeregDto.outlet[i].activeOutletNum = j + 1;
    this.outletActiveNum.push(this.tinDeregDto.outlet[i].activeOutletNum);

    let length = this.tinDeregDto.outlet[i].reasonList.length;
    this.tinDeregDto.outlet[i].reasonList = [];
    let vals = [];
    for (var ii = 0; ii < length; ii++) {
      let obj = {
        name: "",
        name1: "",
        flag: false,
      };
      if (val.name === this.reaList22[ii].name) {
        obj.name = this.reaList22[ii].name;
        obj.name1 = this.reaList22[ii].name1;
        obj.flag = true;
      } else {
        obj.name = this.reaList22[ii].name;
        obj.name1 = this.reaList22[ii].name1;
        obj.flag = false;
      }

      vals.push(obj);
      // this.tinDeregDto.outlet[i].reasonList[ii].name === val.name
      //   ? (this.tinDeregDto.outlet[i].reasonList[ii].flag = true)
      //   : (this.tinDeregDto.outlet[i].reasonList[ii].flag = false);
    }

    this.tinDeregDto.outlet[i].reasonList = vals;
    console.log(this.tinDeregDto.outlet[i].reasonList);
    // this.tinDeregDto.outlet[i].reasonList.map((res) => {
    //   res.flag = false;
    //   // if (res.name === val.name) {
    //   //   res.flag = true;
    //   // } else {
    //   //   res.flag = false;
    //   // }
    // });
    //this.tinDeregDto.outlet[0].reasonList[1].flag = true;

    // let newArray = [...this.tinDeregDto.outlet[i].reasonList];
    // // this.activeOutlet1 = i + 1;
    // // this.tinDeregDto.outlet[i].activeOutlet = val.name;
    // newArray.forEach((ele) => {
    //   ele.name === val.name ? (ele.flag = true) : (ele.flag = false);
    // });

    // this.tinDeregDto.outlet[i].reasonList = [];
    // this.tinDeregDto.outlet[i].reasonList = newArray;
  }

  selectReason3(i) {
    this.activeLicense = i;
  }

  onsubmit22() {
    if (!this.tinDeregDto.flag1) {
      this.displayErr = true;
      this.disableMsg = this.lang.err.e10;
    } else {
      this.attachment();
    }
  }

  resetCheck() {
    if (!this.tinDeregDto.flag2) this.nameErr11 = false;

    if (!this.tinDeregDto.flag1) this.displayErr = false;
  }

  resetReason() {
    if (this.tinDeregDto.reason !== "") this.nameErr133 = false;
    this.showReason = true;
    this.activeOutlet = 0;
    if (this.dir === "rtl") this.reaList = VATConstants.deregReasonsArb;
    else this.reaList = VATConstants.deregReasons;

    if (
      this.tinDeregDto.reason === "6" ||
      this.tinDeregDto.reason === "5" ||
      this.tinDeregDto.reason === "1" ||
      this.tinDeregDto.reason === "7"
    ) {
      this.reaList = this.reaList.filter((x) => x.id === "2");
    } else if (this.tinDeregDto.reason === "8") {
      this.reaList = this.reaList.filter((x) => x.id === "1");
    }
    this.reaList.forEach((res) => {
      res.flag = false;
    });
  }

  resetdata() {
    this.setTinData();
    this.resetErr();
  }

  resetdata1() {
    this.setTinData();
    this.resetErr();
  }

  setdata(i) {
    this.tinDeregDto.outlet[i].deregDate = null;
    this.tinDeregDto.outlet[i].deregReason = "";
    this.tinDeregDto.outlet[i].idType = "";
    this.tinDeregDto.outlet[i].idNumber = "";
    this.tinDeregDto.outlet[i].dob = null;
    this.tinDeregDto.outlet[i].name = "";
    this.tinDeregDto.outlet[i].surname = "";
    this.tinDeregDto.outlet[i].fName = "";
    this.tinDeregDto.outlet[i].gfName = "";
    this.tinDeregDto.outlet[i].famName = "";
    this.tinDeregDto.outlet[i].tin = "";

    // this.tinDeregDto.outlet[i].permit.forEach
    let permitx = this.permitSet.filter(
      (x) =>
        x.APermitOutletnoTb ===
        this.tinDeregdata["OutletSet"].results[i]["AOutletNoTb"]
    );

    for (var p = 0; p < permitx.length; p++) {
      this.tinDeregDto.outlet[i].permit[p].pType = permitx[p].APermitTypeTb;
      this.tinDeregDto.outlet[i].permit[p].pNumber = permitx[p].APermitNoTb;
      this.tinDeregDto.outlet[i].permit[p].deregDate = null;
      this.tinDeregDto.outlet[i].permit[p].deregReason = "";
      this.tinDeregDto.outlet[i].permit[p].idType = "";
      this.tinDeregDto.outlet[i].permit[p].idNumber = "";
      this.tinDeregDto.outlet[i].permit[p].dob = null;
      this.tinDeregDto.outlet[i].permit[p].name = "";
      this.tinDeregDto.outlet[i].permit[p].surname = "";
      this.tinDeregDto.outlet[i].permit[p].fName = "";
      this.tinDeregDto.outlet[i].permit[p].gfName = "";
      this.tinDeregDto.outlet[i].permit[p].famName = "";
      this.tinDeregDto.outlet[i].permit[p].tin = "";

      let dd = new Date(permitx[p]["APermitValfrDtHTb"]);

      if (permitx[p]["APermitValfrDtTb"] !== null) {
        let d = this.commonVaidation.getDateFormated(
          permitx[p]["APermitValfrDtTb"]
        );

        if (dd.getFullYear() < 1900) {
          d.setDate(d.getDate());
          this.vfromDate = this.commonVaidation.getArabicFormat(dd);
          this.tinDeregDto.outlet[i].permit[
            p
          ].vFrom = this.commonVaidation.dateFormate(
            this.commonVaidation.toJulianDate1(new Date(d)),
            "Islamic"
          );
        } else {
          // d.setDate(d.getDate() + 1);
          this.vfromDate = this.commonVaidation.getEnglishFormat(d);
          this.tinDeregDto.outlet[i].permit[
            p
          ].vFrom = this.commonVaidation.toJulianDate1(new Date(d));
        }
      }

      this.disableErr = [];
      for (var k = 0; k < this.tinDeregDto.outlet.length; k++) {
        let obj = {
          idtype: false,
          gf: false,
          famn: false,
          fn: false,
        };
        this.disableErr.push(obj);
      }
      this.disableErr1 = [];
      for (var k = 0; k < this.tinDeregDto.outlet[i].permit.length; k++) {
        let obj = {
          idtype: false,
          gf: false,
          famn: false,
          fn: false,
        };
        this.disableErr1.push(obj);
      }
    }
  }

  resetPermitData() {
    this.tinDeregDto.outlet.forEach((ele) => {});
  }

  resetErr() {
    this.deregDateErr11Arr = [];
    this.deregDateErr11Arr = [];
    this.idTypeErr1Arr = [];
    this.idErr1Arr = [];
    this.dobErr1Arr = [];
    this.lNameErr1Arr = [];
    this.fNameErr1Arr = [];
    this.deregDateErr = false;
    this.nameErr5 = false;
    this.deregDateErr1 = false;
    this.deregDateErr1 = false;
    this.idTypeErr = false;
    this.idErr = false;
    this.dobErr = false;
    this.lNameErr = false;
    this.fNameErr = false;
    this.outletNumErr.forEach((i) => {
      i.permitArr.forEach((j) => {
        j = false;
      });
    });
    console.log(this.outletNumErr);
  }

  reset1() {
    this.idTypeErr = false;
    this.idErr = false;
    this.dobErr = false;
    this.lNameErr = false;
    this.fNameErr = false;
  }

  reset2(i) {
    console.log(
      this.idTypeErr1Arr,
      this.idsErr,
      this.dobErr1Arr,
      this.fNameErr1Arr,
      this.lNameErr1Arr
    );

    this.idTypeErr1Arr[i] = false;
    this.idsErr[i] = false;
    this.dobErr1Arr[i] = false;
    // this.idTypeErr1Arr[i] = [];
    // this.idErr1Arr[i] = [];
    // this.dobErr1Arr[i] = [];
    // this.lNameErr1Arr[i] = [];
    // this.fNameErr1Arr[i] = [];
  }

  reset3(i, j) {
    this.outletNumErr[i].permitArr[j] = false;
    // this.outletNumErr.forEach((i) => {
    //   i.permitArr.forEach((j) => {
    //     j = false;
    //   });
    // });
  }

  getMaxLength(val) {
    this.maxLength = val;
    if (this.tinDeregDto.MobileNo.length < this.maxLength) {
    } else this.tinDeregDto.MobileNo = "";
  }

  onSubmit1() {
    console.log("sds", this.tinDeregDto);
    this.errCounter = 0;
    if (this.tinDeregDto.reason === "") {
      this.nameErr133 = true;
      this.name133Msg = this.lang.err.e12;
    } else {
      if (this.activeOutlet === 0) {
        this.nameErr13 = true;
        this.name13Msg = this.lang.err.e12;
      } else {
        this.nameErr13 = false;
        if (this.activeOutlet !== 1) {
          if (this.activeOutlet === 2) {
            this.tinDeregDto.deregReason = "3";

            if (this.tinDeregDto.deregDate === null) {
              this.deregDateErr1 = true;
              this.derehMsg = this.lang.err.e2;
            } else {
              this.deregDateErr1 = false;
            }

            if (this.tinExist) {
            } else {
              if (this.tinDeregDto.idType === "") {
                this.idTypeErr = true;
                this.idTypeMsg = this.lang.err.e16;
              } else {
                this.idTypeErr = false;
              }

              if (
                this.tinDeregDto.dob === null &&
                this.tinDeregDto.idType != "ZS0005"
              ) {
                this.dobErr = true;
                this.dobMsg = this.lang.err.e15;
              } else {
                this.dobErr = false;
              }
              if (this.tinDeregDto.idNumber === "") {
                this.idErr = true;
                this.idMsg = this.lang.err.e17;
              } else {
                this.idErr = false;
              }

              if (this.tinDeregDto.idType === "ZS0003") {
                if (this.tinDeregDto.name === "") {
                  this.fNameErr = true;
                  this.fNameMsg = this.lang.err.e13;
                } else {
                  this.fNameErr = false;
                }
                if (this.tinDeregDto.surname === "") {
                  this.lNameErr = true;
                  this.lNameMsg = this.lang.err.e14;
                } else {
                  this.lNameErr = false;
                }
              }

              if (this.tinDeregDto.idType !== "ZS0005")
                this.getdateErr(this.tinDeregDto.deregDate, 1, 0, 0);
              this.IDtypeValidation1(this.tinDeregDto, 1, 0, 0);
            }

            // let cnt = 0;
            // this.disableErr.forEach((item) => {
            //   if (item.idtype) cnt++;
            //   if (item.fn) cnt++;
            //   if (item.gf) cnt++;
            //   if (item.famn) cnt++;
            // });

            // if (this.deregDateErr1 || cnt > 0) {
            // } else {
            //   this.NextStep(2);
            // }

            if (
              this.idTypeErr ||
              this.deregDateErr1 ||
              this.idErr ||
              this.dobErr ||
              this.lNameErr ||
              this.fNameErr ||
              this.FNameErr ||
              this.GNameErr ||
              this.FamNameErr
            ) {
            } else {
              if (
                this.tinDeregDto.deregReason === "3" &&
                this.tinDeregDto.dob !== null &&
                !this.tinExist
              ) {
                let d = new Date(
                  this.commonVaidation.changeDate2(this.tinDeregDto.dob)
                );
                d.getFullYear() > 1900
                  ? (this.tinDeregDto.dobValue = this.commonVaidation.getEnglishFormat(
                      this.commonVaidation.changeDate2(this.tinDeregDto.dob)
                    ))
                  : (this.tinDeregDto.dobValue = this.commonVaidation.getArabicFormat(
                      this.commonVaidation.changeDate2(this.tinDeregDto.dob)
                    ));
              }

              let dr = new Date(
                this.commonVaidation.changeDate2(this.tinDeregDto.deregDate)
              );
              dr.getFullYear() > 1900
                ? (this.tinDeregDto.deregDateValue = this.commonVaidation.getEnglishFormat(
                    this.commonVaidation.changeDate2(this.tinDeregDto.deregDate)
                  ))
                : (this.tinDeregDto.deregDateValue = this.commonVaidation.getArabicFormat(
                    this.commonVaidation.changeDate2(this.tinDeregDto.deregDate)
                  ));

              this.tinDeregDto.outlet.forEach((ele) => {
                ele.deregDateValue = this.tinDeregDto.deregDateValue;
                ele.deregReason = this.tinDeregDto.deregReason;
                ele.deregDate = this.tinDeregDto.deregDate;
                ele.dob = this.tinDeregDto.dob;
                ele.dobValue = this.tinDeregDto.dobValue;
                ele.idNumber = this.tinDeregDto.idNumber;
                ele.idType = this.tinDeregDto.idType;
                ele.famName = this.tinDeregDto.famName;
                ele.gfName = this.tinDeregDto.gfName;
                ele.tin = this.tinDeregDto.tin;
                ele.fName = this.tinDeregDto.fName;
                ele.name = this.tinDeregDto.name;

                ele.permit.forEach((item) => {
                  item.deregDateValue = this.tinDeregDto.deregDateValue;
                  item.deregReason = this.tinDeregDto.deregReason;
                  item.dob = this.tinDeregDto.dob;
                  item.dobValue = this.tinDeregDto.dobValue;
                  item.idNumber = this.tinDeregDto.idNumber;
                  item.idType = this.tinDeregDto.idType;
                  item.deregDate = this.tinDeregDto.deregDate;
                  item.tin = this.tinDeregDto.tin;
                  item.name = this.tinDeregDto.name;
                  item.surname = this.tinDeregDto.surname;
                  item.fName = this.tinDeregDto.fName;
                  item.gfName = this.tinDeregDto.gfName;
                  item.famName = this.tinDeregDto.famName;
                });
              });

              this.NextStep(2);
            }
          } else {
            this.outletNumErr = [];
            console.log("this.tinDeregDto", this.tinDeregDto);
            this.tinDeregDto.outlet.forEach((ele, j) => {
              if (ele.activeOutletNum !== 1) {
                if (ele.activeOutletNum === 2) {
                  let outletErr = {
                    outletNo: j,
                    permitArr: [],
                    permitList: [
                      false,
                      false,
                      false,
                      false,
                      false,
                      false,
                      false,
                      false,
                    ],
                  };

                  ele.deregReason = "3";
                  if (ele.deregDate === null) {
                    this.deregDateErr11 = true;
                    this.derehMsg = this.lang.err.e2;
                  } else {
                    this.deregDateErr11 = false;
                  }
                  if (this.tinExists[j]) {
                    if (ele.idType === "") {
                      this.idTypeErr1 = true;
                      this.idTypeMsg = this.lang.err.e16;
                    } else {
                      this.idTypeErr1 = false;
                    }
                    if (ele.idType !== "ZS0005") {
                      if (ele.dob === null) {
                        this.dobErr1 = true;
                        this.dobMsg = this.lang.err.e15;
                      } else {
                        this.dobErr1 = false;
                      }
                    }

                    if (ele.idNumber === "") {
                      this.idErr1 = true;
                      this.idMsg = this.lang.err.e17;
                    } else {
                      this.idErr1 = false;
                    }

                    if (ele.idType === "ZS0003") {
                      if (ele.name === "") {
                        this.fNameErr1 = true;
                        this.fNameMsg = this.lang.err.e13;
                      } else {
                        this.fNameErr1 = false;
                      }
                      if (ele.surname === "") {
                        this.lNameErr1 = true;
                        this.lNameMsg = this.lang.err.e14;
                      } else {
                        this.lNameErr1 = false;
                      }
                    }
                  }

                  if (
                    this.idTypeErr1 ||
                    this.deregDateErr11 ||
                    this.idErr1 ||
                    this.dobErr1 ||
                    this.lNameErr1 ||
                    this.fNameErr1
                  ) {
                    this.errCounter++;
                    this.idTypeErr1Arr[j] = this.idTypeErr1;
                    this.deregDateErr11Arr[j] = this.deregDateErr11;
                    this.idErr1Arr[j] = this.idErr1;
                    this.dobErr1Arr[j] = this.dobErr1;
                    this.lNameErr1Arr[j] = this.lNameErr1;
                    this.fNameErr1Arr[j] = this.fNameErr1;
                  } else {
                    this.idTypeErr1Arr[j] = this.idTypeErr1;
                    this.deregDateErr11Arr[j] = this.deregDateErr11;
                    this.idErr1Arr[j] = this.idErr1;
                    this.dobErr1Arr[j] = this.dobErr1;
                    this.lNameErr1Arr[j] = this.lNameErr1;
                    this.fNameErr1Arr[j] = this.fNameErr1;
                    //this.NextStep(2);
                    let dr = new Date(
                      this.commonVaidation.changeDate2(ele.deregDate)
                    );

                    dr.getFullYear() > 1900
                      ? (ele.deregDateValue = this.commonVaidation.getEnglishFormat(
                          this.commonVaidation.changeDate2(ele.deregDate)
                        ))
                      : (ele.deregDateValue = this.commonVaidation.getArabicFormat(
                          this.commonVaidation.changeDate2(ele.deregDate)
                        ));
                    if (ele.idType === "ZS0005") {
                      ele.dobValue = "";
                    } else {
                      let d = new Date(
                        this.commonVaidation.changeDate2(ele.dob)
                      );
                      d.getFullYear() > 1900
                        ? (ele.dobValue = this.commonVaidation.getEnglishFormat(
                            this.commonVaidation.changeDate2(ele.dob)
                          ))
                        : (ele.dobValue = this.commonVaidation.getArabicFormat(
                            this.commonVaidation.changeDate2(ele.dob)
                          ));
                    }
                  }

                  ele.permit.forEach((eles, i) => {
                    eles.deregDateValue = ele.deregDateValue;
                    eles.deregDate = ele.deregDate;
                    eles.dob = ele.dob;
                    eles.deregReason = ele.deregReason;
                    eles.dobValue = ele.dobValue;
                    eles.idNumber = ele.idNumber;
                    eles.idType = ele.idType;
                    eles.name = ele.name;
                    eles.tin = ele.tin;
                    eles.fName = ele.fName;
                    eles.surname = ele.surname;
                    eles.gfName = ele.gfName;
                    eles.famName = ele.famName;
                    outletErr.outletNo = i;
                    outletErr.permitArr.push(outletErr.permitList);
                  });

                  this.outletNumErr.push(outletErr);
                } else {
                  let outletErr = {
                    outletNo: 0,
                    permitArr: [],
                    permitList: [],
                  };

                  ele.permit.forEach((eles, i) => {
                    if (eles.deregReason === "") {
                      this.deRegErr = true;
                      this.derehMsg1 = this.lang.err.e23;
                    } else {
                      this.deRegErr = false;
                    }

                    if (eles.deregReason === "3") {
                      if (eles.idType === "") {
                        this.idTypeErr1 = true;
                        this.idTypeMsg = this.lang.err.e16;
                      } else {
                        this.idTypeErr1 = false;
                      }

                      if (eles.idType !== "ZS0005") {
                        if (eles.dob === null) {
                          this.dobErr1 = true;
                          this.dobMsg = this.lang.err.e15;
                        } else {
                          this.dobErr1 = false;
                        }
                      }

                      if (eles.idNumber === "") {
                        this.idErr1 = true;
                        this.idMsg = this.lang.err.e17;
                      } else {
                        this.idErr1 = false;
                      }

                      if (eles.idType === "ZS0003") {
                        if (eles.name === "") {
                          this.fNameErr1 = true;
                          this.fNameMsg = this.lang.err.e13;
                        } else {
                          this.fNameErr1 = false;
                        }
                        if (eles.surname === "") {
                          this.lNameErr1 = true;
                          this.lNameMsg = this.lang.err.e14;
                        } else {
                          this.lNameErr1 = false;
                        }
                      }
                    }

                    if (eles.deregDate === null) {
                      this.deregDateErr11 = true;
                      this.derehMsg = this.lang.err.e2;
                    } else {
                      this.deregDateErr11 = false;
                    }

                    if (
                      this.idTypeErr1 ||
                      this.deregDateErr11 ||
                      this.idErr1 ||
                      this.dobErr1 ||
                      this.lNameErr1 ||
                      this.fNameErr1 ||
                      this.deRegErr
                    ) {
                      outletErr.outletNo = i;
                      this.idTypeErr2Arr[i] = this.idTypeErr1;
                      this.deregDateErr12Arr[i] = this.deregDateErr11;
                      this.idErr2Arr[i] = this.idErr1;
                      this.dobErr2Arr[i] = this.dobErr1;
                      this.lNameErr2Arr[i] = this.lNameErr1;
                      this.fNameErr2Arr[i] = this.fNameErr1;
                      this.deregErr11Arr[i] = this.deRegErr;

                      outletErr.permitList.push(this.deregDateErr12Arr[i]);
                      outletErr.permitList.push(this.idTypeErr2Arr[i]);
                      outletErr.permitList.push(this.idErr2Arr[i]);
                      outletErr.permitList.push(this.dobErr2Arr[i]);
                      outletErr.permitList.push(this.lNameErr2Arr[i]);
                      outletErr.permitList.push(this.fNameErr2Arr[i]);
                      outletErr.permitList.push(false);
                      outletErr.permitList.push(this.deregErr11Arr[i]);
                    } else {
                      outletErr.outletNo = i;
                      this.idTypeErr2Arr[i] = this.idTypeErr1;
                      this.deregDateErr12Arr[i] = this.deregDateErr11;
                      this.idErr2Arr[i] = this.idErr1;
                      this.dobErr2Arr[i] = this.dobErr1;
                      this.lNameErr2Arr[i] = this.lNameErr1;
                      this.fNameErr2Arr[i] = this.fNameErr1;
                      this.deregErr11Arr[i] = this.deRegErr;
                      outletErr.permitList.push(this.deregDateErr12Arr[i]);
                      outletErr.permitList.push(this.idTypeErr2Arr[i]);
                      outletErr.permitList.push(this.idErr2Arr[i]);
                      outletErr.permitList.push(this.dobErr2Arr[i]);
                      outletErr.permitList.push(this.lNameErr2Arr[i]);
                      outletErr.permitList.push(this.fNameErr2Arr[i]);
                      outletErr.permitList.push(false);
                      outletErr.permitList.push(this.deregErr11Arr[i]);
                      let dr = new Date(
                        this.commonVaidation.changeDate2(eles.deregDate)
                      );
                      dr.getFullYear() > 1900
                        ? (eles.deregDateValue = this.commonVaidation.getEnglishFormat(
                            this.commonVaidation.changeDate2(eles.deregDate)
                          ))
                        : (eles.deregDateValue = this.commonVaidation.getArabicFormat(
                            this.commonVaidation.changeDate2(eles.deregDate)
                          ));
                      if (eles.deregReason === "3") {
                        if (eles.idType === "ZS0005") {
                          eles.dobValue = "";
                          eles.dob = null;
                        } else {
                          let d = new Date(
                            this.commonVaidation.changeDate2(eles.dob)
                          );
                          d.getFullYear() > 1900
                            ? (eles.dobValue = this.commonVaidation.getEnglishFormat(
                                this.commonVaidation.changeDate2(eles.dob)
                              ))
                            : (eles.dobValue = this.commonVaidation.getArabicFormat(
                                this.commonVaidation.changeDate2(eles.dob)
                              ));
                        }
                      }

                      // this.NextStep(2)
                    }
                    outletErr.permitArr.push(outletErr.permitList);
                    outletErr.permitList = [];
                  });

                  //this.outletNumErr.push(outletErr);
                  //this.NextStep(2)
                  let temp = Object.assign({}, outletErr);
                  this.outletNumErr.push(temp);
                  console.log("this.outletNumErr", this.outletNumErr);
                }
              } else {
                let outletErr = {
                  outletNo: j,
                  permitArr: [],
                  permitList: [
                    false,
                    false,
                    false,
                    false,
                    false,
                    false,
                    false,
                    false,
                  ],
                };

                if (ele.deregDate === null) {
                  this.deregDateErr11 = true;
                  this.derehMsg = this.lang.err.e2;
                } else {
                  this.deregDateErr11 = false;
                }
                if (this.deregDateErr1) {
                  this.errCounter++;
                  this.deregDateErr11Arr[j] = this.deregDateErr11;
                } else {
                  //this.NextStep(2)
                  this.deregDateErr11Arr[j] = this.deregDateErr11;
                  let dr = new Date(
                    this.commonVaidation.changeDate2(ele.deregDate)
                  );
                  dr.getFullYear() > 1900
                    ? (ele.deregDateValue = this.commonVaidation.getEnglishFormat(
                        this.commonVaidation.changeDate2(ele.deregDate)
                      ))
                    : (ele.deregDateValue = this.commonVaidation.getArabicFormat(
                        this.commonVaidation.changeDate2(ele.deregDate)
                      ));

                  ele.permit.forEach((eles, i) => {
                    outletErr.outletNo = i;
                    eles.deregDateValue = ele.deregDateValue;
                    eles.deregReason = "1";
                    eles.deregDate = ele.deregDate;
                    eles.name = ele.name;
                    eles.tin = ele.tin;
                    eles.fName = ele.fName;
                    eles.surname = ele.surname;
                    eles.gfName = ele.gfName;
                    eles.famName = ele.famName;
                    outletErr.permitArr.push(outletErr.permitList);
                  });
                  this.outletNumErr.push(outletErr);

                  //this.NextStep(2);
                }
              }
            });
            //this.NextStep(2);
          }
        } else {
          if (this.tinDeregDto.deregDate === null) {
            this.deregDateErr = true;
            this.derehMsg = this.lang.err.e2;
          } else {
            //this.deregDateErr = false;
            let dr = new Date(
              this.commonVaidation.changeDate2(this.tinDeregDto.deregDate)
            );
            dr.getFullYear() > 1900
              ? (this.tinDeregDto.deregDateValue = this.commonVaidation.getEnglishFormat(
                  this.commonVaidation.changeDate2(this.tinDeregDto.deregDate)
                ))
              : (this.tinDeregDto.deregDateValue = this.commonVaidation.getArabicFormat(
                  this.commonVaidation.changeDate2(this.tinDeregDto.deregDate)
                ));

            this.tinDeregDto.outlet.forEach((ele) => {
              ele.deregDateValue = this.tinDeregDto.deregDateValue;
              ele.deregReason = this.tinDeregDto.deregReason;
              ele.deregDate = this.tinDeregDto.deregDate;
              ele.permit.forEach((item) => {
                item.deregDateValue = this.tinDeregDto.deregDateValue;
                item.deregReason = "1";
                item.deregDate = this.tinDeregDto.deregDate;
                item.name = this.tinDeregDto.name;
                item.tin = this.tinDeregDto.tin;
                item.fName = this.tinDeregDto.fName;
                item.surname = this.tinDeregDto.surname;
                item.gfName = this.tinDeregDto.gfName;
                item.famName = this.tinDeregDto.famName;
              });
            });
            this.getdateErr(this.tinDeregDto.deregDate, 1, 0, 0);
            //this.IDtypeValidation1(this.tinDeregDto, 1, 0, 0);
            if (
              this.deregDateErr ||
              this.FNameErr ||
              this.FamNameErr ||
              this.GNameErr ||
              this.idErr
            ) {
            } else {
              this.NextStep(2);
            }
          }
        }
      }

      console.log("test", this.outletNumErr);
      this.tinDeregDto.outlet.forEach((res, i) => {
        res.deregDate != null && res.idType !== "ZS0005"
          ? this.getdateErr(res.deregDate, 2, i, 0)
          : "";
        if (res.activeOutletNum === 2 && res.deregReason === "3") {
          this.IDtypeValidation1(res, 2, i, 0);
        }
        res.permit.forEach((item, j) => {
          // this.getdateErr(item.deregDate, 3, i, j);
          if (res.activeOutletNum === 3 && item.deregReason === "3") {
            this.IDtypeValidation1(item, 3, i, j);
          }
          let dr = new Date(this.commonVaidation.changeDate2(item.vFrom));
          dr.getFullYear() > 1900
            ? (item.vfromDateValue = this.commonVaidation.getEnglishFormat(
                this.commonVaidation.changeDate2(item.vFrom)
              ))
            : (item.vfromDateValue = this.commonVaidation.getArabicFormat(
                this.commonVaidation.changeDate2(item.vFrom)
              ));
        });
      });

      console.log("this.tinDeregDto.", this.tinDeregDto);
      if (this.activeOutlet === 1) {
      }

      if (this.activeOutlet === 3) {
        let cnt = 0;
        this.outletNumErr.forEach((i) => {
          i.permitArr.forEach((j) => {
            j.forEach((element) => {
              console.log(element);
              if (element) {
                cnt++;
              }
            });
          });
        });

        let cnts = [];
        this.tinDeregDto.outlet.forEach((ele, i) => {
          if (ele.activeOutletNum === 0) {
            cnts.push(i);
          }
        });

        let cnt1 = 0;
        this.disableErr1.forEach((item) => {
          //if (item.idtype) cnt1++;
          if (item.fn) cnt1++;
          if (item.gf) cnt1++;
          if (item.famn) cnt1++;
        });

        let cnt12 = 0;
        this.disableErr.forEach((item) => {
          //if (item.idtype) cnt1++;
          if (item.fn) cnt1++;
          if (item.gf) cnt1++;
          if (item.famn) cnt1++;
        });

        let c1 = 0;

        this.idsErr.forEach((item) => {
          if (item) c1++;
        });

        if (cnts.length > 0) {
          this.notifierService.notify("error", this.lang.err.e1);
        } else {
          if (
            cnt === 0 &&
            this.errCounter === 0 &&
            cnt1 === 0 &&
            cnt12 === 0 &&
            c1 === 0
          ) {
            this.NextStep(2);
          }
        }
      }

      console.log("this.outletNumErr", this.outletNumErr);
    }
  }

  deregDateChange(val) {}

  getdateErr(val, id, i, j) {
    let dateObj = new Date();
    dateObj.setDate(dateObj.getDate());
    if (
      +new Date(
        val["calendarStart"].year +
          "-" +
          val["calendarStart"].month +
          "-" +
          val["calendarStart"].day
      ) > +dateObj
    ) {
      if (id === 1) {
        if (this.activeOutlet == 2) this.deregDateErr1 = true;
        else this.deregDateErr = true;
        this.derehMsg = this.lang.err.e3;
      }
      if (id === 2) {
        this.deregDateErr11Arr[i] = true;
        this.derehMsg = this.lang.err.e3;
      }
      if (id === 3) {
        this.outletNumErr[i].permitArr[j][0] = true;
        this.derehMsg = this.lang.err.e3;
      }
    } else {
      let flag = this.fileterTinDeregDates(
        id,
        this.tinDeregDto.outlet[i],
        this.tinDeregDto.outlet[i].permit[j],
        val
      );
      if (flag) {
        if (id === 1) {
          if (this.activeOutlet == 2) this.deregDateErr1 = true;
          else this.deregDateErr = true;
          this.derehMsg = this.lang.err.e26;
        }
        if (id === 2) {
          this.deregDateErr11Arr[i] = true;
          this.derehMsg = this.lang.err.e26;
        }
        if (id === 3) {
          this.outletNumErr[i].permitArr[j][0] = true;
          this.derehMsg = this.lang.err.e26;
        }
      } else {
        if (id === 1) {
          if (this.activeOutlet == 2) this.deregDateErr1 = false;
          else this.deregDateErr = false;
        }
        if (id === 2) this.deregDateErr11Arr[i] = false;
        if (id === 3) this.outletNumErr[i].permitArr[j][0] = false;
      }

      let dob;
      if (id === 1) dob = this.tinDeregDto.dob;
      if (id === 2) dob = this.tinDeregDto.outlet[i].dob;
      if (id === 3) dob = this.tinDeregDto.outlet[i].permit[j].dob;
      if (dob !== null) {
        this.deregDateDobValidation(val, dob, id, i, j);
      }
      console.log("this.outletNumErr[i].permitArr", this.outletNumErr[i]);
    }
  }

  filterDeregDate() {
    let minDate = [];
    var max;
    this.permitSet.forEach((item) => {
      console.log(new Date(item.APermitValfrDtHTb));
      let d = this.commonVaidation.getDateFormated(item.APermitValfrDtTb);
      minDate.push(d);
    });
    console.log("test", minDate);
    if (minDate.length > 1) {
      max = minDate[0];
      for (var i = 0; i < minDate.length; i++) {
        if (minDate[i] > max) {
          max = minDate[i];
        }
      }
    } else {
      max = minDate[0];
    }
    return max;
  }

  filterDeregDate2(val) {
    let minDate = [];
    var max;
    this.permitSet.forEach((item) => {
      console.log(new Date(item.APermitValfrDtHTb));
      if (item.APermitOutletnoTb === val.outletNum) {
        let d = this.commonVaidation.getDateFormated(item.APermitValfrDtTb);
        minDate.push(d);
      }
    });
    console.log("test", minDate);
    if (minDate.length > 1) {
      max = minDate[0];
      for (var i = 0; i < minDate.length; i++) {
        if (minDate[i] > max) {
          max = minDate[i];
        }
      }
    } else {
      max = minDate[0];
    }
    return max;
  }

  fileterTinDeregDates(id, val, val1, val2) {
    let maxDate;
    if (id === 1) {
      maxDate = this.filterDeregDate();
    }
    if (id === 2) {
      maxDate = this.filterDeregDate2(val);
    }
    if (id === 3) {
      this.permitSet.forEach((item) => {
        if (item.APermitNoTb === val1.pNumber) {
          let d = this.commonVaidation.getDateFormated(item.APermitValfrDtTb);
          maxDate = d;
        }
      });
    }

    if (
      new Date(
        val2["calendarStart"].year +
          "-" +
          val2["calendarStart"].month +
          "-" +
          val2["calendarStart"].day
      ) > maxDate
    ) {
      return false;
    } else {
      return true;
    }
  }

  deregDateDobValidation(val, val2, id, i, j) {
    let flg = this.commonVaidation.validateDate(val, val2);
    if (flg) {
      if (id === 1) {
        this.tinDeregDto.deregDate = null;
        if (this.activeOutlet == 2) this.deregDateErr1 = true;
        else this.deregDateErr = true;
        this.derehMsg = this.lang.err.e27;
      }
      if (id === 2) {
        this.tinDeregDto.outlet[i].deregDate = null;
        this.deregDateErr11Arr[i] = true;
        this.derehMsg = this.lang.err.e27;
      }
      if (id === 3) {
        this.tinDeregDto.outlet[i].permit[j].deregDate = null;
        this.outletNumErr[i].permitArr[j][0] = true;
        this.derehMsg = this.lang.err.e27;
      }
    }
  }

  getdobErr(val, id, i, j) {
    let val1;
    if (id === 1) val1 = this.tinDeregDto.deregDate;
    if (id === 2) val1 = this.tinDeregDto.outlet[i].deregDate;
    if (id === 3) val1 = this.tinDeregDto.outlet[i].permit[j].deregDate;

    if (val.idType === "") {
      if (id === 1) {
        this.idTypeErr = true;
        this.idTypeMsg = this.lang.err.e16;
      }
      if (id === 2) {
        this.idTypeErr1Arr[i] = true;
        this.idTypeMsg = this.lang.err.e16;
      }
      if (id === 3) {
        this.outletNumErr[i].permitArr[j][1] = true;
        this.idTypeMsg = this.lang.err.e16;
      }
    } else {
      if (id === 1) this.idTypeErr = false;
      if (id === 2) this.idTypeErr1Arr[i] = false;
      if (id === 3) this.outletNumErr[i].permitArr[j][1] = false;
    }
    if (val.idNumber === "") {
      if (id === 1) {
        this.idErr = true;
        this.idMsg = this.lang.err.e17;
      }
      if (id === 2) {
        this.idsErr[i] = true;
        this.idMsg = this.lang.err.e17;
      }
      if (id === 3) {
        this.outletNumErr[i].permitArr[j][2] = true;
        this.idMsg = this.lang.err.e17;
      }
    }

    let dateObj = new Date();
    dateObj.setDate(dateObj.getDate());
    if (
      new Date(
        val.dob["calendarStart"].year +
          "-" +
          val.dob["calendarStart"].month +
          "-" +
          val.dob["calendarStart"].day
      ) > dateObj
    ) {
      if (id === 1) {
        if (this.activeOutlet == 2) this.dobErr = true;
        else this.dobErr = true;
        this.dobMsg = this.lang.err.e8;
      }
      if (id === 2) {
        this.dobErr1Arr[i] = true;
        this.dobMsg = this.lang.err.e8;
      }
      if (id === 3) {
        this.outletNumErr[i].permitArr[j][3] = true;
        this.dobMsg = this.lang.err.e8;
      }
    } else {
      if (val1 !== null) this.deregDateDobValidation(val1, val.dob, id, i, j);
      if (id === 1) {
        if (this.activeOutlet == 2) this.dobErr = false;
        else this.dobErr = false;

        if (this.dobErr || this.idErr || this.idTypeErr) {
        } else this.getUserValidated(val, id, i, j);
      }
      if (id === 2) {
        this.dobErr1Arr[i] = false;
        if (this.dobErr1Arr[i] || this.idsErr[i] || this.idTypeErr1Arr[i]) {
        } else this.getUserValidated(val, id, i, j);
      }
      if (id === 3) {
        this.outletNumErr[i].permitArr[j][3] = false;
        if (
          this.outletNumErr[i].permitArr[j][1] ||
          this.outletNumErr[i].permitArr[j][2] ||
          this.outletNumErr[i].permitArr[j][3]
        ) {
        } else this.getUserValidated(val, id, i, j);
      }
      console.log("this.outletNumErr[i].permitArr", this.outletNumErr[i]);
    }
    // if (val.idType !== "ZS0003") {

    // } else {
    //   if (val1 !== null) this.deregDateDobValidation(val1, val.dob, id, i, j);
    // }
  }

  checkGcc(id, i, j) {
    this.tinValue = false;
    this.maxLength1 = 10;
    if (id === 1) {
      if (this.tinDeregDto.idType === "ZS0003" && !this.tinValue) {
        this.maxLength1 = 15;
        this.disableValue = true;
      } else {
        this.disableValue = false;
      }

      this.tinDeregDto.idNumber = "";
      this.tinDeregDto.dob = null;
      this.idTypeErr = false;
      this.tinDeregDto.name = "";
      this.tinDeregDto.surname = "";
      this.tinDeregDto.fName = "";
      this.tinDeregDto.gfName = "";
      this.tinDeregDto.famName = "";
      this.tinDeregDto.tin = "";
    }
    if (id === 2) {
      if (this.tinDeregDto.outlet[i].idType === "ZS0003" && !this.tinValue) {
        this.maxLength1 = 15;
        this.disableValue = true;
      } else {
        this.disableValue = false;
      }

      if (this.disableValue) this.disableErr[i].idtype = true;

      this.tinDeregDto.outlet[i].idNumber = "";
      this.tinDeregDto.outlet[i].dob = null;
      this.idTypeErr1Arr[i] = false;
      this.tinDeregDto.outlet[i].name = "";
      this.tinDeregDto.outlet[i].surname = "";
      this.tinDeregDto.outlet[i].fName = "";
      this.tinDeregDto.outlet[i].gfName = "";
      this.tinDeregDto.outlet[i].famName = "";
      this.tinDeregDto.outlet[i].tin = "";
    }
    if (id === 3) {
      if (
        this.tinDeregDto.outlet[i].permit[j].idType === "ZS0003" &&
        !this.tinValue
      ) {
        this.maxLength1 = 15;
        this.disableValue = true;
      } else {
        this.disableValue = false;
      }

      if (this.disableValue) this.disableErr1[i].idtype = true;

      this.tinDeregDto.outlet[i].permit[j].idNumber = "";
      this.tinDeregDto.outlet[i].permit[j].dob = null;
      this.outletNumErr[i].permitArr[j][1] = false;
      this.tinDeregDto.outlet[i].permit[j].name = "";
      this.tinDeregDto.outlet[i].permit[j].surname = "";
      this.tinDeregDto.outlet[i].permit[j].fName = "";
      this.tinDeregDto.outlet[i].permit[j].gfName = "";
      this.tinDeregDto.outlet[i].permit[j].famName = "";
      this.tinDeregDto.outlet[i].permit[j].tin = "";
    }
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

  IDtypeValidation1(val, id, i, j) {
    if (val.idType === "ZS0003") {
      if (this.commonVaidation.isNumber(val.idNumber)) {
        if (val.idNumber.length < 7 || val.idNumber.length > 15) {
          if (id === 1) this.idErr = true;
          if (id === 2) this.idsErr[i] = true;
          if (id === 3) this.outletNumErr[i].permitArr[j][2] = true;

          this.idMsg = this.IDErrz.e19;
        } else {
          if (id === 1) this.idErr = false;
          if (id === 2) this.idsErr[i] = false;
          if (id === 3) this.outletNumErr[i].permitArr[j][2] = false;
        }
      } else {
        if (id === 1) this.idErr = true;
        if (id === 2) this.idsErr[i] = true;
        if (id === 3) this.outletNumErr[i].permitArr[j][2] = true;
        this.idMsg = this.IDErrz.e20;
      }
    } else {
      let obj = {
        flag: false,
        msg: "",
      };

      if (val.idType === "" || val.idNumber === "") {
        obj.flag = true;
        obj.msg = this.lang.err.e17;
      } else {
        obj = this.commonVaidation.IDtypeValidation(val.idType, val.idNumber);
      }

      this.idMsg = obj.msg;
      if (id === 1) this.idErr = obj.flag;
      if (id === 2) this.idsErr[i] = obj.flag;
      if (id === 3) this.outletNumErr[i].permitArr[j][2] = obj.flag;
      // if (!obj.flag) {
      //   this.getUserValidated(val, id, i, j);
      // }
      if (val.idType === "ZS0005" && !obj.flag) {
        this.getCompanyValidated(val.idNumber, id, i, j);
      }
    }
  }

  getFileDetails(e) {
    //console.log (e.target.files);
    for (var i = 0; i < e.target.files.length; i++) {
      if (e.target.files[i].size < 1048576) {
        this.myFiles.push(e.target.files[i]);
      }
    }

    // this.uploadFiles(e.target.files[0]);
    console.log(this.myFiles);
    this.fileNames = [];
    //this.vatSecondFormGroup.controls["doc"].setValue([]);
    for (var i = 0; i < this.myFiles.length; i++) {
      console.log(this.myFiles[i]["name"]);
      let n = this.myFiles[i]["name"];
      // this.vatSecondFormGroup.controls["doc"][i]["name"].setValue(n);
      this.fileNames.push(n);
    }
  }

  uploadFiles(file, id, index) {
    //let control = <FormArray>this.vatThirdFormGroup.controls.doc;
    const frmData = new FormData();
    let filename;
    // for (var i = 0; i < this.myFiles.length; i++) {
    filename = file["name"];
    let fileNameStr = new String(filename);
    if (fileNameStr.length > 95) {
      this.notifierService.notify("error", this.lang.err.fileNameError);
      return;
    }
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
      this.notifierService.notify("error", this.lang.err.fileType);
      return;
    }
    if (file.size > 1048576) {
      //   this.notifierService.notify("error", this.lang.err.fileError);
      return;
    }
    console.log("res", filename, this.myFiles);
    this.vatService
      .attachmentSubmit(this.returnId, this.docType, filename, file)
      .subscribe(
        (res) => {
          console.log("resupload", res);
        },
        (err) => {
          this.notifierService.notify(
            "error",
            err.error.error.innererror.errordetails[0].message
          );
          this.deleteAttachments(id, index);
        }
      );
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
    //       // this.notifierService.notify(
    //       //   "success",
    //       //   this.lang.successMsg
    //       // );
    //       for (var i in this.vatThirdFormGroup.controls.doc.value) {
    //         if (
    //           this.vatThirdFormGroup.controls.doc.value[i]["id"] != "" &&
    //           this.vatThirdFormGroup.controls.doc.value[i]["name"] == ""
    //         ) {
    //           this.disableContinue = true;
    //           break;
    //         } else {
    //           this.disableContinue = false;
    //         }
    //       }
    //     },
    //     (err) => {
    //       this.notifierService.notify(
    //         "error",
    //         err.error.error.innererror.errordetails[0].message
    //       );
    //       this.disableContinue = true;
    //     }
    //   );
  }

  checkDocTyp() {
    this.notifierService.notify("error", this.lang.errorMsgs.selAttch);
  }

  // uploadFile(event) {
  //   for (let index = 0; index < event.length; index++) {
  //     const element = event[index];
  //     console.log(element);
  //     let obj = {
  //       name: element.name,
  //       size: (element.size / 1024 / 1024).toFixed(2),
  //     };
  //     let extn = obj["name"].substr(obj["name"].indexOf(".") + 1);
  //     if (parseInt(obj.size) <= 5) {
  //       this.files[0] = obj;
  //     }
  //   }
  // }

  uploadFile(event, id) {
    if (this.filez[id].at.length >= 5) {
      this.notifierService.notify("error", this.lang.err.fileNum);
      return;
    } else {
      const element = event[0];
      const parseExt = element.name.split(".");
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
        this.notifierService.notify("error", this.lang.err.fileType);
        return;
      }
      if (element.size > 1048576) {
        this.notifierService.notify("error", this.lang.err.fileError);
        return;
      }

      if (element.size <= 0) {
        this.notifierService.notify("error", this.lang.err.fileType2);
        return;
      }

      for (let index = 0; index < event.length; index++) {
        const element = event[index];
        console.log(element);
        this.files[id].name = element.name;
        this.files[id].size = element.size / 1000000;
      }

      let obj = {
        id: 0,
        filenames: {},
      };
      obj.id = id;
      obj.filenames = this.files[id];
      this.fileList.push(obj);
      this.saveAttchement(id, this.files[id].name, this.files[id].size);
      let index = this.filez[id].at.length - 1;
      this.uploadFiles(event[0], id, index);
      // this.filez[id] = this.fileList;
      // console.log("this.fileList", this.fileList, this.filez);
    }
  }

  openAttchment(id, name) {
    if (id === 3 && this.tinDeregDto.reason === "1") {
      this.attchTile = this.lang.c3.t15;
    } else {
      this.attchTile = name;
    }

    this.attchId = id;
    if (id === 2 && this.transferAtch) {
      this.docType = "DR07";
      $("#attch").modal("show");
    }

    if (id === 4 && this.licenseAtt) {
      this.docType = "DR11";
      $("#attch").modal("show");
    }

    if (id === 1 && this.crAtt) {
      this.docType = "DR10";
      $("#attch").modal("show");
    }

    if (id === 3 && this.contrct) {
      this.docType = "DR09";
      $("#attch").modal("show");
    }

    if (id === 0) {
      this.docType = this.attachArray[0].value;
      $("#attch").modal("show");
    }
  }

  saveAttchement(id, name, size, url?) {
    let obj = {
      id: 0,
      name: "",
      size: "",
      url: "",
    };
    obj.id = 0;
    obj.name = name;
    obj.size = size;
    obj.url = url;
    this.filez[id].at.push(obj);
  }

  deleteAttachments(id, index) {
    this.filez[id].at.splice(index, 1);

    console.log(this.filez[id].at.length);
    if (this.filez[id].at.length === 0) {
      this.files[id].name = "";
      this.files[id].size = 0;
    } else {
      this.files[id].name = this.filez[id].at[
        this.filez[id].at.length - 1
      ].name;
    }
  }

  ValidateValues(id, val, n, i, j) {
    if (n === 1) {
      if (val.name.toString() !== "") {
        let a = this.commonVaidation.isArabic(val.name);
        a ? (this.nameErr1 = false) : (this.nameErr1 = true);
        if (this.nameErr1) {
          if (id === 1) {
            this.fNameErr = true;
            this.fNameMsg = this.lang.err.e7;
          }
          if (id === 2) {
            this.fNameErr1Arr[i] = true;
            this.fNameMsg = this.lang.err.e7;
          }
          if (id === 3) {
            this.outletNumErr[i].permitArr[j][4] = true;
            this.fNameMsg = this.lang.err.e7;
          }
        } else {
          if (id === 1) this.fNameErr = false;
          if (id === 2) this.fNameErr1Arr[i] = false;
          if (id === 3) this.outletNumErr[i].permitArr[j][4] = false;
        }
      }
    }

    if (n === 2) {
      if (val.surname.toString() !== "") {
        let a = this.commonVaidation.isArabic(val.surname);
        a ? (this.nameErr2 = false) : (this.nameErr2 = true);
        if (this.nameErr2) {
          if (id === 1) {
            this.lNameErr = true;
            this.lNameMsg = this.lang.err.e7;
          }
          if (id === 2) {
            this.lNameErr1Arr[i] = true;
            this.lNameMsg = this.lang.err.e7;
          }
          if (id === 3) {
            this.outletNumErr[i].permitArr[j][5] = true;
            this.lNameMsg = this.lang.err.e7;
          }
        } else {
          if (id === 1) this.lNameErr = false;
          if (id === 2) this.lNameErr1Arr[i] = false;
          if (id === 3) this.outletNumErr[i].permitArr[j][5] = false;
        }
      }
    }

    if (n === 3) {
      if (val.fName.toString() !== "") {
        let a = this.commonVaidation.isArabic(val.fName);
        a ? (this.nameErr5 = false) : (this.nameErr5 = true);
        if (this.nameErr5) {
          if (id === 1) {
            this.FNameErr = true;
            this.FNameMsg = this.lang.err.e7;
          }
          if (id === 2) {
            this.disableErr[i].fn = true;
            this.FNameMsg = this.lang.err.e7;
          }
          if (id === 3) {
            this.disableErr1[i].fn = true;
            this.FNameMsg = this.lang.err.e7;
          }
        } else {
          if (id === 1) this.FNameErr = false;
          if (id === 2) this.disableErr[i].fn = false;
          if (id === 3) this.disableErr1[i].fn = false;
        }
      }
    }

    if (n === 4) {
      if (val.gfName.toString() !== "") {
        let a = this.commonVaidation.isArabic(val.gfName);
        a ? (this.nameErr55 = false) : (this.nameErr55 = true);
        if (this.nameErr55) {
          if (id === 1) {
            this.GNameErr = true;
            this.GNameMsg = this.lang.err.e7;
          }
          if (id === 2) {
            this.disableErr[i].gf = true;
            this.GNameMsg = this.lang.err.e7;
          }
          if (id === 3) {
            this.disableErr1[i].gf = true;
            this.GNameMsg = this.lang.err.e7;
          }
        } else {
          if (id === 1) this.GNameErr = false;
          if (id === 2) this.disableErr[i].gf = false;
          if (id === 3) this.disableErr1[i].gf = false;
        }
      }
    }

    if (n === 5) {
      if (val.famName.toString() !== "") {
        let a = this.commonVaidation.isArabic(val.famName);
        a ? (this.nameErr555 = false) : (this.nameErr555 = true);
        if (this.nameErr555) {
          if (id === 1) {
            this.FamNameErr = true;
            this.FamNameMsg = this.lang.err.e7;
          }
          if (id === 2) {
            this.disableErr[i].famn = true;
            this.FamNameMsg = this.lang.err.e7;
          }
          if (id === 3) {
            this.disableErr1[i].famn = true;
            this.FamNameMsg = this.lang.err.e7;
          }
        } else {
          if (id === 1) this.FamNameErr = false;
          if (id === 2) this.disableErr[i].famn = false;
          if (id === 3) this.disableErr1[i].famn = false;
        }
      }
    }
  }

  validate(val, n) {
    if (n === 6) {
      if (val.names.toString() !== "") {
        let a = this.commonVaidation.isArabic(val.names);
        // let b = this.commonVaidation.isArabic(val.names);
        a ? (this.nameErr6 = false) : (this.nameErr6 = true);
        // b ? (this.nameErr6 = true) : (this.nameErr6 = false);
        if (this.nameErr6) this.nsMsg = this.lang.err.e7;
      }
    }
    if (n === 7) {
      if (val.designation.toString() !== "") {
        let a = this.commonVaidation.isArabic(val.designation);
        a ? (this.nameErr7 = false) : (this.nameErr7 = true);
        if (this.nameErr7) this.dsgMsg = this.lang.err.e7;
      }
    }

    // if (n === 8) {
    //   if (val.MobileNo !== "") {
    //     let n = val.MobileNo.substring(0, 1);

    //     if (n === "0") {
    //       this.nameErr8 = true;
    //       this.mbMsg = this.indErr.e22;
    //     }
    //     if (n !== "5") {
    //       this.nameErr8 = true;
    //       this.mbMsg = this.lang.err.mobStart;
    //     } else {
    //       if (val.MobileNo.length !== 9) {
    //         this.nameErr8 = true;
    //         this.mbMsg = this.lang.err.moblen;
    //       } else {
    //         let a = this.commonVaidation.isNumber(val.MobileNo.toString());
    //         a ? (this.nameErr8 = false) : (this.nameErr8 = true);
    //         if (this.nameErr8) {
    //           this.mbMsg = this.indErr.e3;
    //           val.MobileNo = "";
    //         } else {
    //           this.nameErr8 = false;
    //         }
    //       }
    //     }
    //   }
    // }

    if (n === 8) {
      if (val.MobileNo !== "") {
        let n = val.MobileNo.substring(0, 6);
        if (n !== "009665") {
          this.nameErr8 = true;
          this.mbMsg = this.lang.err.mobStart;
          return;
        } else {
          let a = this.commonVaidation.isNumber(val.MobileNo.toString());
          a ? (this.nameErr8 = false) : (this.nameErr8 = true);
          if (this.nameErr8) {
            this.mbMsg = this.indErr.e3;
            val.MobileNo = "";
            return;
          } else if (val.MobileNo.toString().length !== 14) {
            this.nameErr8 = true;
            this.mbMsg = this.lang.err.moblen;
            return;
          } else {
            this.nameErr8 = false;
          }
        }
      }
    }

    if (n === 9) {
      let first = val.tin.substr(0, 1);
      if (first !== "3") {
        this.nameErr9 = true;
        this.tinMsg = "error";
      } else {
        if (val.tin.length === 10) {
          this.nameErr9 = false;
        } else {
          this.nameErr9 = true;
          this.tinMsg = "error";
        }
      }
    }
  }

  onSubmit4() {
    let x = false;
    let x1 = false;
    let x2 = false;
    let x3 = false;
    let x4 = false;
    if (this.filez[0].at.length > 0) {
      if (this.licenseAtt) {
        if (this.filez[4].at.length > 0) {
          x1 = false;
        } else {
          x1 = true;
        }
      }
      if (this.contrct) {
        if (this.filez[3].at.length > 0) {
          x2 = false;
        } else {
          x2 = true;
        }
      }

      if (this.crAtt) {
        if (this.filez[1].at.length > 0) {
          x3 = false;
        } else {
          x3 = true;
        }
      }
      if (this.transferAtch) {
        if (this.filez[2].at.length > 0) {
          x4 = false;
        } else {
          x4 = true;
        }
      }
    } else {
      x = true;
    }
    if (x1 || x2 || x3 || x4) {
      x = true;
    }
    if (x) {
      this.notifierService.notify("error", this.lang.err.fileErr);
    } else {
      this.NextStep(4);
    }
  }

  onSubmit5() {
    if (this.tinDeregDto.names === "") {
      this.nameErr6 = true;
      this.nsMsg = this.lang.err.e18;
    }
    if (this.tinDeregDto.MobileNo === "") {
      this.nameErr8 = true;
      this.mbMsg = this.lang.err.e19;
    }
    if (this.tinDeregDto.designation === "") {
      this.nameErr7 = true;
      this.dsgMsg = this.lang.err.e20;
    }
    if (!this.tinDeregDto.flag2) {
      this.nameErr11 = true;
      this.name11Msg = this.lang.err.e10;
    } else {
      this.nameErr11 = false;
    }

    if (
      this.nameErr6 ||
      this.nameErr8 ||
      this.nameErr7 ||
      !this.tinDeregDto.flag2
    ) {
    } else {
      this.NextStep(5);
    }
  }

  setDataAftRejection(data) {
    if (this.tinDeregdata.AttDetSet.results.length > 0) {
      this.setAttachment(this.tinDeregdata.AttDetSet.results);
    }
    this.tinDeregDto.reason = data.ADregReason;
    this.resetReason();
    this.activeOutlet = parseInt(data.ADregOpt);
    //this.tinDeregDto.deregDate =

    let adreg = this.reaList.filter(
      (x) => x.id === this.activeOutlet.toString()
    );
    adreg = adreg[0];
    this.selectedReason(adreg, this.activeOutlet);
    console.log("adreg", adreg);

    this.tinDeregDto.names = data.ADecName;
    this.tinDeregDto.designation = data.ADecDesig;
    this.tinDeregDto.MobileNo = data.ADecTelNo;
    this.tinDeregDto.flag1 = true;
    this.tinDeregDto.flag2 = true;
    this.tinDeregDto.falg3 = true;

    if (this.activeOutlet === 1 || this.activeOutlet === 2) {
      let d = this.commonVaidation.getDateFormated(data.AEffectiveDt);
      if (d.getFullYear() < 1900) {
        d.setDate(d.getDate() + 1);
        this.tinDeregDto.deregDate = this.commonVaidation.dateFormate(
          this.commonVaidation.toJulianDate1(new Date(d)),
          "Islamic"
        );
      } else {
        this.tinDeregDto.deregDate = this.commonVaidation.toJulianDate1(
          new Date(d)
        );
      }
    }

    if (this.activeOutlet === 2) {
      this.tinDeregDto.deregReason = data.ADregReason;
      this.tinDeregDto.tin = data.ATin;
      this.tinDeregDto.idType = data.AIdType;
      this.tinDeregDto.idNumber = data.AIdNo;
      this.tinDeregDto.name = data.ANm1;
      this.tinDeregDto.surname = data.ANm2;
      if (data.AIdType !== "ZS0005") {
        this.tinDeregDto.fName = data.ANm3;
        this.tinDeregDto.gfName = data.ANm4;
        this.tinDeregDto.famName = data.ANm5;

        let d = this.getDateFormat(data);
        if (d.getFullYear() < 1900) {
          d.setDate(d.getDate() + 1);
          this.tinDeregDto.dob = this.commonVaidation.dateFormate(
            this.commonVaidation.toJulianDate1(new Date(d)),
            "Islamic"
          );
        } else {
          this.tinDeregDto.dob = this.commonVaidation.toJulianDate1(
            new Date(d)
          );
        }
      }
    }

    if (this.activeOutlet === 3) {
      for (var i = 0; i < this.tinDeregdata.OutletSet.results.length; i++) {
        if (this.tinDeregdata.OutletSet.results[i].AOutletDregOptTb !== "") {
          this.tinDeregDto.outlet[i].activeOutletNum = parseInt(
            this.tinDeregdata.OutletSet.results[i].AOutletDregOptTb
          );
        } else {
          if (this.tinDeregdata.OutletSet.results[i].AOutletEffDtTb !== null) {
            this.tinDeregDto.outlet[i].activeOutletNum = 1;
          }
          if (
            this.tinDeregdata.OutletSet.results[i].AOutletEffDtTb !== null &&
            this.tinDeregdata.OutletSet.results[i].AOutletDobTb !== null
          ) {
            this.tinDeregDto.outlet[i].activeOutletNum = 2;
          }

          if (
            this.tinDeregdata.OutletSet.results[i].AOutletEffDtTb === null &&
            this.tinDeregdata.OutletSet.results[i].AOutletDobTb === null
          ) {
            this.tinDeregDto.outlet[i].activeOutletNum = 3;
          }
        }

        let adreg = this.tinDeregDto.outlet[i].reasonList[
          this.tinDeregDto.outlet[i].activeOutletNum - 1
        ];
        console.log(adreg);
        this.selectedReason2(
          adreg,
          i,
          this.tinDeregDto.outlet[i].activeOutletNum - 1
        );

        if (
          this.tinDeregDto.outlet[i].activeOutletNum === 1 ||
          this.tinDeregDto.outlet[i].activeOutletNum === 2
        ) {
          let d = this.commonVaidation.getDateFormated(
            data.OutletSet.results[i].AOutletEffDtTb
          );

          if (d.getFullYear() < 1900) {
            d.setDate(d.getDate() + 1);
            this.tinDeregDto.outlet[
              i
            ].deregDate = this.commonVaidation.dateFormate(
              this.commonVaidation.toJulianDate1(new Date(d)),
              "Islamic"
            );
          } else {
            this.tinDeregDto.outlet[
              i
            ].deregDate = this.commonVaidation.toJulianDate1(new Date(d));
          }
        }

        if (this.tinDeregDto.outlet[i].activeOutletNum === 2) {
          this.setOutletData(data.OutletSet.results[i], i);
        }

        if (this.tinDeregDto.outlet[i].activeOutletNum === 3) {
          this.setPermitData(data.PermitSet.results, i);
        }
      }
    }
  }

  setPermitData(data, i) {
    console.log(data, i);
    for (var j = 0; j < this.tinDeregDto.outlet[i].permit.length; j++) {
      for (var k = 0; k < data.length; k++) {
        if (
          this.tinDeregDto.outlet[i].permit[j].pNumber === data[k].APermitNoTb
        ) {
          let d = this.commonVaidation.getDateFormated(data[k].APermitEffDtTb);

          if (d.getFullYear() < 1900) {
            d.setDate(d.getDate() + 1);
            this.tinDeregDto.outlet[i].permit[
              j
            ].deregDate = this.commonVaidation.dateFormate(
              this.commonVaidation.toJulianDate1(new Date(d)),
              "Islamic"
            );
          } else {
            this.tinDeregDto.outlet[i].permit[
              j
            ].deregDate = this.commonVaidation.toJulianDate1(new Date(d));
          }

          this.tinDeregDto.outlet[i].permit[j].deregReason =
            data[k].APermitDregRsnTb;

          if (data[k].APermitDregRsnTb === "3") {
            this.tinDeregDto.outlet[i].permit[j].tin =
              data[k].APermitTransTinTb;
            this.tinDeregDto.outlet[i].permit[j].idType =
              data[k].APermitIdTypeTb;
            this.tinDeregDto.outlet[i].permit[j].idNumber =
              data[k].APermitIdNoTb;
            this.tinDeregDto.outlet[i].permit[j].name = data[k].APermitNm1Tb;
            this.tinDeregDto.outlet[i].permit[j].surname = data[k].APermitNm2Tb;

            if (this.tinDeregDto.outlet[i].permit[j].idType !== "ZS0005") {
              this.tinDeregDto.outlet[i].permit[j].fName = data[k].APermitNm5Tb;
              this.tinDeregDto.outlet[i].permit[j].gfName =
                data[k].APermitNm6Tb;
              this.tinDeregDto.outlet[i].permit[j].famName =
                data[k].APermitNm7Tb;

              let d = this.commonVaidation.getDateFormated(
                data[k].APermitDobTb
              );
              if (d.getFullYear() < 1900) {
                d.setDate(d.getDate() + 1);
                this.tinDeregDto.outlet[i].permit[
                  j
                ].dob = this.commonVaidation.dateFormate(
                  this.commonVaidation.toJulianDate1(new Date(d)),
                  "Islamic"
                );
              } else {
                this.tinDeregDto.outlet[i].permit[
                  j
                ].dob = this.commonVaidation.toJulianDate1(new Date(d));
              }
            }
          }
        }
      }
    }
  }

  setOutletData(data, i) {
    if (data.AOutletIdTypeTb !== "ZS0005") {
      let d = this.commonVaidation.getDateFormated(data.AOutletDobTb);
      if (d.getFullYear() < 1900) {
        d.setDate(d.getDate() + 1);
        this.tinDeregDto.outlet[i].dob = this.commonVaidation.dateFormate(
          this.commonVaidation.toJulianDate1(new Date(d)),
          "Islamic"
        );
      } else {
        this.tinDeregDto.outlet[i].dob = this.commonVaidation.toJulianDate1(
          new Date(d)
        );
      }
      this.tinDeregDto.outlet[i].fName = data.AOutletNm5Tb;
      this.tinDeregDto.outlet[i].gfName = data.AOutletNm6Tb;
      this.tinDeregDto.outlet[i].famName = data.AOutletNm7Tb;
    }

    this.tinDeregDto.outlet[i].tin = data.AOutletTransTinTb;
    this.tinDeregDto.outlet[i].idType = data.AOutletIdTypeTb;
    this.tinDeregDto.outlet[i].idNumber = data.AOutletIdNoTb;
    this.tinDeregDto.outlet[i].name = data.AOutletNm1Tb;
    this.tinDeregDto.outlet[i].surname = data.AOutletNm2Tb;
  }

  getDateFormat(data) {
    let d;
    let sym = data.ADobH.substr(4, 1);
    if (sym !== "/") {
      let year = data.ADobH.substr(0, 4);
      let day = data.ADobH.substr(4, 2);
      let mnth = data.ADobH.substr(6, 2);
      console.log(year, day, mnth);
      d = new Date(year + "-" + mnth + "-" + day);
    } else {
      let value = data.ADobH;
      let year = value.substr(0, 4);
      value = value.substring(value.indexOf("/") + 1);
      let mnth = value.substr(0, 2);
      value = value.substring(value.indexOf("/") + 1);
      let day = value.substr(0, 2);
      d = new Date(year + "-" + mnth + "-" + day);
    }
    return d;
  }

  setAttachment(data) {
    let file1 = data.filter(
      (x) =>
        x.Dotyp === "DR02" ||
        x.Dotyp === "DR06" ||
        x.Dotyp === "DR01" ||
        x.Dotyp === "DR05" ||
        x.Dotyp === "DR03" ||
        x.Dotyp === "DR09" ||
        x.Dotyp === "DR04"
    );

    let file2 = data.filter((x) => x.Dotyp === "DR07");

    let file3 = data.filter((x) => x.Dotyp === "DR11");

    let file4 = data.filter((x) => x.Dotyp === "DR10");

    let file5 = data.filter((x) => x.Dotyp === "DR09");

    console.log(file1);
    console.log(file2);
    console.log(file3);
    console.log(file4);
    console.log(file5);

    if (file1.length > 0) {
      file1.forEach((element) => {
        this.files[0].name = element.Filename;
        this.files[0].size = 0;
        this.saveAttchement(
          0,
          this.files[0].name,
          this.files[0].size,
          element.DocUrl
        );
      });
    }

    if (file2.length > 0) {
      file2.forEach((element) => {
        this.files[2].name = element.Filename;
        this.files[2].size = 0;
        this.saveAttchement(
          2,
          this.files[2].name,
          this.files[2].size,
          element.DocUrl
        );
      });
    }

    if (file3.length > 0) {
      file3.forEach((element) => {
        this.files[4].name = element.Filename;
        this.files[4].size = 0;
        this.saveAttchement(
          4,
          this.files[4].name,
          this.files[4].size,
          element.DocUrl
        );
      });
    }

    if (file4.length > 0) {
      file4.forEach((element) => {
        this.files[1].name = element.Filename;
        this.files[1].size = 0;
        this.saveAttchement(
          1,
          this.files[1].name,
          this.files[1].size,
          element.DocUrl
        );
      });
    }

    if (this.contrct) {
      if (file5.length > 0) {
        file5.forEach((element) => {
          this.files[3].name = element.Filename;
          this.files[3].size = 0;
          this.saveAttchement(
            3,
            this.files[3].name,
            this.files[3].size,
            element.DocUrl
          );
        });
      }
    }

    console.log(this.filez);
    console.log(this.files);
  }

  opendowload(url) {
    var a = document.createElement("a");
    a.href = url;
    a.click();
    //window.open(url)
    console.log("url", url);
  }

  submitFinal() {
    let obj1 = {
      day: new Date().getDate(),
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
    };
    this.tinDeregdata = null;
    this.tinDeregdata = this.tinDeregdata1;
    this.tinDeregdata.PermitSet = this.removeResults(
      this.tinDeregdata.PermitSet
    );
    this.tinDeregdata.OutletSet = this.removeResults(
      this.tinDeregdata.OutletSet
    );
    this.tinDeregdata.Off_notesSet = this.removeResults(
      this.tinDeregdata.Off_notesSet
    );
    this.tinDeregdata.Permit_TableSet = this.removeResults(
      this.tinDeregdata.Permit_TableSet
    );
    this.tinDeregdata.returnSet = this.removeResults(
      this.tinDeregdata.returnSet
    );

    this.tinDeregdata.AttDetSet = this.removeResults(
      this.tinDeregdata.AttDetSet
    );

    this.tinDeregdata.ADregOpt = this.activeOutlet.toString();
    // this.tinDeregdata.AEffectiveDt = this.commonVaidation.changeDate(
    //   this.tinDeregDto.deregDate["calendarStart"]
    // );

    if (
      this.tinDeregdata.ADregOpt === "1" ||
      this.tinDeregdata.ADregOpt === "2"
    ) {
      this.tinDeregDto.deregDate["calendarName"] === "Gregorian"
        ? (this.tinDeregdata.AEffectiveDtC = "H")
        : (this.tinDeregdata.AEffectiveDtC = "H");

      this.tinDeregdata.AEffectiveDt = this.commonVaidation.changedate(
        this.tinDeregDto.deregDate["calendarStart"]
      );

      this.tinDeregdata.AEffectiveDtH = this.commonVaidation.changedates(
        this.tinDeregDto.deregDate["calendarStart"]
      );
      // this.tinDeregdata.AEffectiveDtH="20201222";
      // this.tinDeregdata.AEffectiveDtC="H";
      // this.tinDeregdata.AEffectiveDt="2020-12-22T04:45:03.000Z";
      if (this.tinDeregDto.deregReason === "3") {
        if (this.tinDeregDto.idType !== "ZS0005") {
          if (this.tinExist && this.tinDeregDto.dob === null) {
            this.tinDeregdata.ADobH = "";
            this.tinDeregdata.ADobC = "";
          } else {
            this.tinDeregdata.ADobH = this.commonVaidation.changedates(
              this.tinDeregDto.dob["calendarStart"]
            );
            this.tinDeregdata.ADobC = "H";
          }
        }
        // this.tinDeregdata.ADob= this.commonVaidation.changeDate(
        //   this.tinDeregDto.dob["calendarStart"]
        // );
        this.tinDeregdata.ANm1 = this.tinDeregDto.name;
        this.tinDeregdata.ANm2 = this.tinDeregDto.surname;
        this.tinDeregdata.ANm5 = this.tinDeregDto.fName;
        this.tinDeregdata.ANm6 = this.tinDeregDto.gfName;
        this.tinDeregdata.ANm7 = this.tinDeregDto.famName;
        this.tinDeregdata.AIdType = this.tinDeregDto.idType;
        this.tinDeregdata.AIdNo = this.tinDeregDto.idNumber;
      }
    }

    this.tinDeregdata.ADregReason = this.tinDeregDto.reason;

    this.tinDeregdata.ADecName = this.tinDeregDto.names;
    this.tinDeregdata.ADecTelNo = this.tinDeregDto.MobileNo;
    this.tinDeregdata.ADecDesig = this.tinDeregDto.designation;
    this.tinDeregdata.ADeclarationChkbox = "1";
    this.tinDeregdata.ADegister = "1";
    this.tinDeregdata.AStep = 4;
    this.tinDeregdata.ADecDate = this.commonVaidation.changedate(obj1);
    this.tinDeregdata.ASubmissionDate = this.commonVaidation.changedate(obj1);
    obj1.year < 1900
      ? (this.tinDeregdata.ADecDateC = "H")
      : (this.tinDeregdata.ADecDateC = "G");

    this.tinDeregdata.Submitz = "X";
    this.tinDeregdata.Savez = "";

    if (this.tinDeregDto.reason === "2") {
      this.tinDeregdata.ADocumnt2 = "1";
      //this.tinDeregdata.ADocumnt1 = "1";
    }

    if (this.tinDeregDto.reason === "8") {
      this.tinDeregdata.ADocumnt6 = "1";
      //this.tinDeregdata.ADocumnt1 = "1";
    }

    if (this.tinDeregDto.reason === "3") {
      this.tinDeregdata.ADocumnt1 = "1";
    }

    if (this.tinDeregDto.reason === "4") {
      this.tinDeregdata.ADocumnt10 = "1";
    }

    if (this.tinDeregDto.reason === "6") {
      this.tinDeregdata.ADocumnt1 = "1";
    }

    if (this.tinDeregDto.reason === "1") {
      this.tinDeregdata.ADocumnt3 = "1";
    }

    if (this.tinDeregDto.reason === "5") {
      this.tinDeregdata.ADocumnt4 = "1";
    }

    if (this.contrct) {
      this.tinDeregdata.ADocumnt7 = "1";
    }

    if (this.licenseAtt) {
      this.tinDeregdata.ADocumnt8 = "1";
    }

    if (this.crAtt) {
      this.tinDeregdata.ADocumnt13 = "1";
    }

    if (this.transferAtch) {
      this.tinDeregdata.ADocumnt9 = "1";
    }

    let permits = [];
    this.tinDeregDto.outlet.forEach((res) => {
      res.permit.forEach((ele) => {
        permits.push(ele);
      });
    });

    for (var i = 0; i < this.tinDeregDto.outlet.length; i++) {
      this.tinDeregdata.OutletSet[i].AOutletDregOptTb = this.tinDeregDto.outlet[
        i
      ].activeOutletNum.toString();

      if (
        this.tinDeregDto.outlet[i].activeOutletNum === 2 ||
        this.tinDeregDto.outlet[i].activeOutletNum === 1
      ) {
        this.tinDeregdata.OutletSet[
          i
        ].AOutletEffDtTb = this.commonVaidation.changedate(
          this.tinDeregDto.outlet[i].deregDate["calendarStart"]
        );
        this.tinDeregdata.OutletSet[
          i
        ].AOutletEffDtHTb = this.commonVaidation.changedates(
          this.tinDeregDto.outlet[i].deregDate["calendarStart"]
        );
        this.tinDeregdata.OutletSet[i].AOutletEffDtCTb = "H";
      }

      if (this.tinDeregDto.outlet[i].activeOutletNum === 2) {
        this.tinDeregdata.OutletSet[
          i
        ].AOutletMobileNoTb = this.tinDeregDto.MobileNo;
        this.tinDeregdata.OutletSet[
          i
        ].AOutletTransTinTb = this.tinDeregDto.outlet[i].tin;

        if (this.tinDeregDto.outlet[i].deregReason === "3") {
          this.tinDeregdata.OutletSet[
            i
          ].AOutletIdTypeTb = this.tinDeregDto.outlet[i].idType;
          this.tinDeregdata.OutletSet[
            i
          ].AOutletIdNoTb = this.tinDeregDto.outlet[i].idNumber;
          this.tinDeregdata.OutletSet[i].AOutletNm1Tb = this.tinDeregDto.outlet[
            i
          ].name;
          this.tinDeregdata.OutletSet[i].AOutletNm2Tb = this.tinDeregDto.outlet[
            i
          ].surname;
          this.tinDeregdata.OutletSet[i].AOutletNm3Tb = this.tinDeregDto.outlet[
            i
          ].name;
          this.tinDeregdata.OutletSet[i].AOutletNm4Tb = this.tinDeregDto.outlet[
            i
          ].surname;
          this.tinDeregdata.OutletSet[i].AOutletNm5Tb = this.tinDeregDto.outlet[
            i
          ].fName;
          this.tinDeregdata.OutletSet[i].AOutletNm6Tb = this.tinDeregDto.outlet[
            i
          ].gfName;
          this.tinDeregdata.OutletSet[i].AOutletNm7Tb = this.tinDeregDto.outlet[
            i
          ].famName;

          if (this.tinDeregDto.idType !== "ZS0005") {
            this.tinDeregdata.OutletSet[
              i
            ].AOutletDobTb = this.commonVaidation.changedate(
              this.tinDeregDto.outlet[i].dob["calendarStart"]
            );
            this.tinDeregdata.OutletSet[
              i
            ].AOutletDobHTb = this.commonVaidation.changedates(
              this.tinDeregDto.outlet[i].dob["calendarStart"]
            );
            this.tinDeregdata.OutletSet[i].AOutletDobCTb = "H";
          }
        }
      }
    }

    for (var i = 0; i < permits.length; i++) {
      this.tinDeregdata.PermitSet[i].APermitTypTxt =
        this.tinDeregdata.PermitSet[i].APermitTypeTb == "BUP002"
          ? "C/R Number"
          : "Licence Number";

      console.log(permits[i].deregDate);
      permits[i].deregDate["calendarName"] === "Gregorian"
        ? (this.tinDeregdata.PermitSet[i].APermitEffDtCTb = "H")
        : (this.tinDeregdata.PermitSet[i].APermitEffDtCTb = "H");

      this.tinDeregdata.PermitSet[
        i
      ].APermitEffDtTb = this.commonVaidation.changedate(
        permits[i].deregDate["calendarStart"]
      );
      this.tinDeregdata.PermitSet[
        i
      ].APermitEffDtHTb = this.commonVaidation.changedates(
        permits[i].deregDate["calendarStart"]
      );

      if (permits[i].deregReason === "3") {
        this.tinDeregdata.PermitSet[i].APermitDregRsnTb =
          permits[i].deregReason;
        this.tinDeregdata.PermitSet[i].APermitTransTinTb = permits[i].tin;
        this.tinDeregdata.PermitSet[i].APermitIdTypeTb = permits[i].idType;
        this.tinDeregdata.PermitSet[i].APermitIdNoTb = permits[i].idNumber;
        this.tinDeregdata.PermitSet[i].APermitNm1Tb = permits[i].name;
        this.tinDeregdata.PermitSet[i].APermitNm2Tb = permits[i].surname;
        this.tinDeregdata.PermitSet[i].APermitNm3Tb = permits[i].name;
        this.tinDeregdata.PermitSet[i].APermitNm4Tb = permits[i].surname;
        this.tinDeregdata.PermitSet[i].APermitNm5Tb = permits[i].fName;
        this.tinDeregdata.PermitSet[i].APermitNm6Tb = permits[i].gfName;
        this.tinDeregdata.PermitSet[i].APermitNm7Tb = permits[i].famName;

        if (permits[i].idType !== "ZS0005") {
          if (permits[i].dob === null) {
            this.tinDeregdata.PermitSet[i].APermitDobCTb = "";
            this.tinDeregdata.PermitSet[i].APermitDobTb = null;

            this.tinDeregdata.PermitSet[i].APermitDobHTb = "";
          } else {
            permits[i].dob["calendarName"] === "Gregorian"
              ? (this.tinDeregdata.PermitSet[i].APermitDobCTb = "H")
              : (this.tinDeregdata.PermitSet[i].APermitDobCTb = "H");

            this.tinDeregdata.PermitSet[
              i
            ].APermitDobTb = this.commonVaidation.changedate(
              permits[i].dob["calendarStart"]
            );

            this.tinDeregdata.PermitSet[
              i
            ].APermitDobHTb = this.commonVaidation.changedates(
              permits[i].dob["calendarStart"]
            );
          }
        }
      } else {
        this.tinDeregdata.PermitSet[i].APermitDregRsnTb = "1";
      }
    }

    this.tinService.postDetails(this.tinDeregdata).subscribe(
      (res) => {
        this.show = true;
        this.name = res["d"]["ATaxpayerName"];
        this.no = res["d"]["Fbnum"];
        console.log("data", res);
      },
      (err) => {
        if (err.error.error.innererror.errordetails.length === 0) {
          this.notifierService.notify("error", "Backend Api Error");
        } else {
          this.notifierService.notify(
            "error",
            err.error.error.innererror.errordetails[0].message
          );

          $("#aftsubmit").modal("show");
          this.resText = err.error.error.innererror.errordetails[0].message;
          this.resText = err.error.error.innererror.errordetails[1].message;
        }
      }
    );
  }

  removeResults(obj) {
    let a = [];
    obj["results"].filter((i) => a.push(i));
    obj = [];
    obj = a;
    return obj;
  }
}

export class TinDeregDTO {
  outlet: OutletDto[] = [new OutletDto()];
  reason: string = "";
  activeOutlet: any;
  pType: string;
  pNumber: string;
  vFrom: any;
  deregDate = null;
  deregReason: string = "";
  tin: string;
  idType: string = "";
  idNumber: string = "";
  name: string = "";
  fName: string = "";
  gfName: string = "";
  famName: string = "";
  surname: string = "";
  dob = null;
  MobileNo: string = "";
  date = new Date();
  designation: string = "";
  names: string = "";
  outletNum: string;
  crNum: string;
  address: string;
  actFlag: boolean = false;
  crName: string;
  dobValue: string;
  deregDateValue: string;
  flag1 = false;
  flag2 = false;
  falg3 = false;
}

export class OutletDto {
  activeOutletNum: number = 0;
  reasonList = VATConstants.deregReasons2;
  permit: PermitDto[] = [new PermitDto()];
  activeOutlet: string;
  pType: string;
  pNumber: string;
  vFrom: any;
  deregDate = null;
  deregReason: string = "";
  tin: string;
  idType: string = "";
  idNumber: string = "";
  name: string = "";
  fName: string = "";
  gfName: string = "";
  famName: string = "";
  surname: string = "";
  dob = null;
  MobileNo: string;
  date = new Date();
  designation: string;
  names: string;
  outletNum: string;
  crNum: string;
  address: string;
  actFlag: boolean = false;
  crName: string;
  dobValue: string;
  deregDateValue: string;
}

export class PermitDto {
  pType: string;
  pNumber: string;
  vFrom: any;
  deregDate = null;
  deregReason: string = "";
  tin: string;
  idType: string = "";
  idNumber: string = "";
  name: string = "";
  fName: string = "";
  gfName: string = "";
  famName: string = "";
  surname: string = "";
  dob = null;
  MobileNo: string;
  date = new Date();
  designation: string;
  names: string;
  outletNum: string;
  crNum: string;
  address: string;
  actFlag: boolean = false;
  crName: string;
  flag: boolean = false;
  dobValue: string;
  deregDateValue: string;
  vfromDateValue: string;
}
